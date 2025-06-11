import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  HostListener,
  Inject,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  ChangeDetectorRef,
  Signal,
  ContentChildren,
  QueryList,
  AfterContentInit,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

import { Subscription, Observable, merge, of, from } from 'rxjs';

import { ResizeService } from '../services/resize.service';
import { tap, delay, filter, switchMap, first, map, skip, take, toArray, pairwise } from 'rxjs/operators';
import { CarouselService, CarouselCurrentData } from '../services/carousel.service';
import { StageData } from "../models/stage-data.model";
import { OwlDOMData } from "../models/owlDOM-data.model";
import { SlideModel } from '../models/slide.model';
import { OwlOptions } from '../models/owl-options.model';
import { NavData, DotsData } from '../models/navigation-data.models';
import { NavigationService } from '../services/navigation.service';
import { AutoplayService } from '../services/autoplay.service';
import { LazyLoadService } from '../services/lazyload.service';
import { AnimateService } from '../services/animate.service';
import { AutoHeightService } from '../services/autoheight.service';
import { HashService } from '../services/hash.service';
import { OwlLogger } from '../services/logger.service';
import { DOCUMENT } from '../services/document-ref.service';
import { CarouselSlideDirective } from './carousel-slide.directive';
import { SlidesOutputData } from '../models/SlidesOutputData';

@Component({
  selector: 'owl-carousel-o',
  template: `
    <div class="owl-carousel owl-theme" #owlCarousel
      [ngClass]="{'owl-rtl': owlDOMData()?.rtl,
                  'owl-loaded': owlDOMData()?.isLoaded,
                  'owl-responsive': owlDOMData()?.isResponsive,
                  'owl-drag': owlDOMData()?.isMouseDragable,
                  'owl-grab': owlDOMData()?.isGrab}"
      (mouseover)="startPausing()"
      (mouseleave)="startPlayML()"
      (touchstart)="startPausing()"
      (touchend)="startPlayTE()">

      @if(carouselLoaded()) {
        <div class="owl-stage-outer">
          <owl-stage [owlDraggable]="{
                        'isMouseDragable': owlDOMData()?.isMouseDragable, 
                        'isTouchDragable': owlDOMData()?.isTouchDragable
                      }"
                      [stageData]="stageData()"
                      [slidesData]="slidesData()"></owl-stage>
        </div> <!-- /.owl-stage-outer -->
      }

      @if(slides.toArray().length) {
          <div class="owl-nav" [ngClass]="{'disabled': navData()?.disabled}">
            <div class="owl-prev" [ngClass]="{'disabled': navData()?.prev?.disabled}" (click)="prev()" [innerHTML]="navData()?.prev?.htmlText"></div>
            <div class="owl-next" [ngClass]="{'disabled': navData()?.next?.disabled}" (click)="next()" [innerHTML]="navData()?.next?.htmlText"></div>
          </div> <!-- /.owl-nav -->
          <div class="owl-dots" [ngClass]="{'disabled': dotsData()?.disabled}">

            @for (dot of dotsData()?.dots; track dot.id) {
              <div  class="owl-dot" [ngClass]="{'active': dot.active, 'owl-dot-text': dot.showInnerContent}" (click)="moveByDot(dot.id)">
                <span [innerHTML]="dot.innerContent"></span>
              </div>
            }
            
          </div> <!-- /.owl-dots -->
      }
    </div> <!-- /.owl-carousel owl-loaded -->
  `,
  styles: [`.owl-theme { display: block; }`],
  providers: [
    NavigationService,
    AutoplayService,
    CarouselService,
    LazyLoadService,
    AnimateService,
    AutoHeightService,
    HashService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class CarouselComponent implements OnInit, OnDestroy, AfterContentInit {
  //  Cannot implement via contentChildren() because of inputs are a little bit late and I get default input values
  // in the case of converting slides to Observable and subscribing to it 
  // when using effect I get endless loop, because it also uses options() input and they fire one after another
  @ContentChildren(CarouselSlideDirective)
  slides: QueryList<CarouselSlideDirective>;

  translated = output<SlidesOutputData>();
  dragging = output<{ dragging: boolean, data: SlidesOutputData }>();
  change = output<SlidesOutputData>();
  changed = output<SlidesOutputData>();
  initialized = output<SlidesOutputData>();

  /**
   * Width of carousel window (tag with class .owl-carousel), in wich we can see moving sliders
   */
  carouselWindowWidth: number;

  /**
   * Subscription to 'resize' event
   */
  resizeSubscription: Subscription;

  /**
   * Subscription merge Observable, which merges all Observables in the component except 'resize' Observable and this.slides.changes()
   */
  private _allObservSubscription: Subscription;

  /**
   * Subscription to `this.slides.changes().
   * It could be included in 'this._allObservSubscription', but that subcription get created during the initializing of component
   * and 'this.slides' are undefined at that moment. So it's needed to wait for initialization of content.
   */
  private _slidesChangesSubscription: Subscription;

  /**
   * Current settings for the carousel.
   */
  private _owlDOMData = signal<OwlDOMData | null>(null);
  owlDOMData = this._owlDOMData.asReadonly();

  /**
   * Data of owl-stage
   */
  private _stageData = signal<StageData | null>(null);
  stageData = this._stageData.asReadonly();

  /**
   *  Data of every slide
   */
  private _slidesData = signal<SlideModel[]>([]);
  slidesData = this._slidesData.asReadonly();

  /**
   * Data of navigation block
   */
  private _navData = signal<NavData | null>(null);
  navData = this._navData.asReadonly();

  /**
   * Data of dots block
   */
  private _dotsData = signal<DotsData | null>(null);
  dotsData = this._dotsData.asReadonly();

  /**
   * Data, wich are passed out of carousel after ending of transioning of carousel
   */
  slidesOutputData: SlidesOutputData;

  /**
   * Shows whether carousel is loaded of not.
   */
  private _carouselLoaded = signal<boolean>(false);
  carouselLoaded = this._carouselLoaded.asReadonly();

  /**
   * User's options
   */
  options = input<OwlOptions>();
  /**
   * Observable for user's options
   * It is used to track changes of options and re-render carousel if needed
   */
  private _options$ = toObservable<OwlOptions>(this.options as Signal<OwlOptions>);
  /**
   * Previous options, used for checking whether options were changed
   */
  private _optionsPrevAndCur$: Observable<[OwlOptions, OwlOptions]>;

  /**
   * Observable for getting current View Settings
   */
  private _viewCurSettings$: Observable<CarouselCurrentData>;

  /**
   * Observable for catching the end of transition of carousel
   */
  private _translatedCarousel$: Observable<string>;

  /**
   * Observable for catching the start of dragging of the carousel
   */
  private _draggingCarousel$: Observable<string>;

  /**
   * Observable for catching the start of changing of the carousel
   */
  private _changeCarousel$: Observable<string>;

  /**
   * Observable for catching the moment when the data about slides changed, more exactly when the position changed.
   */
  private _changedCarousel$: Observable<any>;

  /**
   * Observable for catching the initialization of changing the carousel
   */
  private _initializedCarousel$: Observable<string>;

  /**
   * Observable for merging all Observables and creating one subscription
   */
  private _carouselMerge$: Observable<CarouselCurrentData | string>;
  private docRef: Document;

  constructor(
    private el: ElementRef,
    private resizeService: ResizeService,
    private carouselService: CarouselService,
    private navigationService: NavigationService,
    private autoplayService: AutoplayService,
    private lazyLoadService: LazyLoadService,
    private animateService: AnimateService,
    private autoHeightService: AutoHeightService,
    private hashService: HashService,
    private logger: OwlLogger,
    private changeDetectorRef: ChangeDetectorRef,
    @Inject(DOCUMENT) docRef: any
  ) {
    this.docRef = docRef as Document;

  }

  @HostListener('document:visibilitychange', ['$event'])
  onVisibilityChange(ev: any) {
    if (!this.carouselService.settings.autoplay) return;
    switch (this.docRef.visibilityState) {
      case 'visible':
        !this.autoplayService.isAutoplayStopped && this.autoplayService.play();
        break;

      case 'hidden':
        this.autoplayService.pause();
        break;

      default:
        break;
    }
  };


  ngOnInit() {
    this.spyDataStreams();

    this.carouselWindowWidth = this.el.nativeElement.querySelector(
      '.owl-carousel'
    ).clientWidth;
  }

  ngAfterContentInit() {
    if (this.slides.toArray().length) {
      this.carouselService.setup(this.carouselWindowWidth, this.slides.toArray(), this.options() as OwlOptions);
      this.carouselService.initialize(this.slides.toArray());

      this._winResizeWatcher();
    } else {
      this.logger.log(`There are no slides to show. So the carousel won't be rendered`);
    }

    this._slidesChangesSubscription = this.slides.changes.pipe(
      tap((slides) => {
        this.carouselService.setup(this.carouselWindowWidth, slides.toArray(), this.options() as OwlOptions);
        this.carouselService.initialize(slides.toArray());
        if (!slides.toArray().length) {
          this._carouselLoaded.set(false);
        }

        if (slides.toArray().length && !this.resizeSubscription) {
          this._winResizeWatcher();
        }
      })
    ).subscribe(() => { });

  }

  ngOnDestroy() {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }

    if (this._slidesChangesSubscription) {
      this._slidesChangesSubscription.unsubscribe();
    }

    if (this._allObservSubscription) {
      this._allObservSubscription.unsubscribe();
    }
  }

  /**
   * Joins the observable login in one place: sets values to some observables, merges this observables and
   * subcribes to merge func
   */
  spyDataStreams() {
    this._viewCurSettings$ = this.carouselService.getViewCurSettings().pipe(
      tap(data => {
        this._owlDOMData.set(data.owlDOMData);
        this._stageData.set(data.stageData);
        this._slidesData.set(data.slidesData);
        if (!this._carouselLoaded()) {
          this._carouselLoaded.set(true);
        }
        this._navData.set(data.navData);
        this._dotsData.set(data.dotsData);
        this.changeDetectorRef.markForCheck(); // despite the fact we have signals here, they work with some delay, so we need to trigger change detection manually
      })
    );

    this._initializedCarousel$ = this.carouselService.getInitializedState().pipe(
      tap(() => {
        this.gatherTranslatedData();
        this.initialized.emit(this.slidesOutputData);
        // this.slidesOutputData = {};
      })
    )

    this._translatedCarousel$ = this.carouselService.getTranslatedState().pipe(
      tap(() => {
        this.gatherTranslatedData();
        this.translated.emit(this.slidesOutputData);
        // this.slidesOutputData = {};
      })
    );

    this._changeCarousel$ = this.carouselService.getChangeState().pipe(
      tap(() => {
        this.gatherTranslatedData();
        this.change.emit(this.slidesOutputData);
        // this.slidesOutputData = {};
      })
    );

    this._changedCarousel$ = this.carouselService.getChangeState().pipe(
      switchMap(value => {
        const changedPosition: Observable<SlidesOutputData> = of(value).pipe(
          filter(() => value.property.name === 'position'),
          switchMap(() => from(this._slidesData())),
          skip(value.property.value),
          take(this.carouselService?.settings?.items || 0),
          map(slide => {
            const clonedIdPrefix = this.carouselService.clonedIdPrefix;
            const id = slide.id.indexOf(clonedIdPrefix) >= 0 ? slide.id.slice(clonedIdPrefix.length) : slide.id;
            return { ...slide, id: id, isActive: true };
          }),
          toArray(),
          map(slides => {
            return {
              slides: slides,
              startPosition: this.carouselService.relative(value.property.value)
            }
          })
        );

        // const changedSetting: Observable<SlidesOutputData> = of(value).pipe(
        //   filter(() => value.property.name === 'settings'),
        //   map(() => {
        //     return {
        //       slides: [],
        //       startPosition: this.carouselService.relative(value.property.value)
        //     }
        //   })
        // )
        return merge(changedPosition);
      }),
      tap(slidesData => {
        this.gatherTranslatedData();
        this.changed.emit(slidesData?.slides?.length ? slidesData : this.slidesOutputData);
        // console.log(this.slidesOutputData);
        // this.slidesOutputData = {};
      })
    );

    this._draggingCarousel$ = this.carouselService.getDragState().pipe(
      tap(() => {
        this.gatherTranslatedData();
        this.dragging.emit({ dragging: true, data: this.slidesOutputData });
      }),
      switchMap(
        () => this.carouselService.getDraggedState().pipe(
          map(() => !!this.carouselService.is('animating'))
        )
      ),
      switchMap(
        anim => {
          if (anim) {
            return this.carouselService.getTranslatedState().pipe(
              first(),
            );
          } else {
            return of('not animating');
          }
        }
      ),
      tap(() => {
        this.dragging.emit({ dragging: false, data: this.slidesOutputData });
      })
    );

    this._optionsPrevAndCur$ = this._options$.pipe(
      pairwise(),
      tap(([prev, cur]) => {
        const slides = this.slides.toArray();
        if (prev) {
          this.carouselService.setup(this.carouselWindowWidth, slides, cur);
          this.carouselService.initialize(slides);
        }

        if (prev && !slides.length) {
          this.logger.log(`There are no slides to show.`);
          this._carouselLoaded.set(false);
        }

        if (!prev) {
          this._carouselLoaded.set(false);
        }
      })
    );

    this._carouselMerge$ = merge(
      this._viewCurSettings$,
      this._translatedCarousel$,
      this._draggingCarousel$,
      this._changeCarousel$,
      this._changedCarousel$,
      this._initializedCarousel$,
      this._optionsPrevAndCur$
    );
    this._allObservSubscription = this._carouselMerge$.subscribe(() => { });
  }

  /**
   * Init subscription to resize event and attaches handler for this event
   */
  private _winResizeWatcher() {
    if (Object.keys(this.carouselService?._options?.responsive || {}).length) {
      this.resizeSubscription = this.resizeService.onResize$
        .pipe(
          filter(() => this.carouselWindowWidth !== this.el.nativeElement.querySelector('.owl-carousel').clientWidth),
          delay(this.carouselService.settings.responsiveRefreshRate || 200),
        )
        .subscribe(() => {
          this.carouselService.onResize(this.el.nativeElement.querySelector('.owl-carousel').clientWidth);
          this.carouselWindowWidth = this.el.nativeElement.querySelector('.owl-carousel').clientWidth;
        });
    }
  }

  /**
   * Handler for transitioend event
   */
  onTransitionEnd() {
    this.carouselService.onTransitionEnd();
  }

  /**
   * Handler for click event, attached to next button
   */
  next() {
    if (!this._carouselLoaded()) return;
    this.navigationService.next(this.carouselService.settings.navSpeed || false);
  }

  /**
   * Handler for click event, attached to prev button
   */
  prev() {
    if (!this._carouselLoaded()) return;
    this.navigationService.prev(this.carouselService.settings.navSpeed || false);
  }

  /**
   * Handler for click event, attached to dots
   */
  moveByDot(dotId: string) {
    if (!this._carouselLoaded()) return;
    this.navigationService.moveByDot(dotId);
  }

  /**
   * rewinds carousel to slide with needed id
   * @param id fragment of url
   */
  to(id: string) {
    // if (!this.carouselLoaded || ((this.navData && this.navData.disabled) && (this.dotsData && this.dotsData.disabled))) return;
    if (!this._carouselLoaded()) return;
    this.navigationService.toSlideById(id);
  }

  /**
   * Gathers and prepares data intended for passing to the user by means of firing event translatedCarousel
   */
  gatherTranslatedData() {
    let startPosition: number;
    const clonedIdPrefix = this.carouselService.clonedIdPrefix;
    const activeSlides: SlideModel[] = this._slidesData()
      .filter(slide => slide.isActive === true)
      .map(slide => {
        const id = slide.id.indexOf(clonedIdPrefix) >= 0 ? slide.id.slice(clonedIdPrefix.length) : slide.id;
        return {
          id: id,
          width: slide.width,
          marginL: slide.marginL,
          marginR: slide.marginR,
          center: slide.isCentered
        }
      });
    startPosition = this.carouselService.relative(this.carouselService.current() as number);
    this.slidesOutputData = {
      startPosition: startPosition,
      slides: activeSlides
    }
  }

  /**
   * Starts pausing
   */
  startPausing() {
    this.autoplayService.startPausing();
  }

  /**
   * Starts playing after mouse leaves carousel
   */
  startPlayML() {
    this.autoplayService.startPlayingMouseLeave();
  }

  /**
   * Starts playing after touch ends
   */
  startPlayTE() {
    this.autoplayService.startPlayingTouchEnd();
  }

  stopAutoplay() {
    this.autoplayService.isAutoplayStopped = true;
    this.autoplayService.stop();
  }

  startAutoplay() {
    this.autoplayService.isAutoplayStopped = false;
    this.autoplayService.play();
  }

}
