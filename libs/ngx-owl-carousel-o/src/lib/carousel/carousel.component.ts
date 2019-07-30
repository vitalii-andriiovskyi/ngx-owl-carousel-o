import {
  Component,
  OnInit,
  AfterContentChecked,
  OnDestroy,
  Input,
  Output,
  Directive,
  QueryList,
  ContentChildren,
  TemplateRef,
  ElementRef,
  AfterContentInit,
  EventEmitter,
  HostListener,
  Inject
} from '@angular/core';

import { Subscription, Observable, merge, of, from } from 'rxjs';

import { ResizeService } from '../services/resize.service';
import { tap, delay, filter, switchMap, first, map, skip, take, toArray } from 'rxjs/operators';
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

let nextId = 0;

@Directive({ selector: 'ng-template[carouselSlide]' })
export class CarouselSlideDirective {
  /**
   * Unique slide identifier. Must be unique for the entire document for proper accessibility support.
   * Will be auto-generated if not provided.
   */
  @Input() id = `owl-slide-${nextId++}`;

  /**
   * Defines how much widths of common slide will current slide have
   * e.g. if _mergeData=2, the slide will twice wider then slides with _mergeData=1
   */
  private _dataMerge = 1;
  @Input()
  set dataMerge(data: number) {
    this._dataMerge = this.isNumeric(data) ? data : 1;
  };
  get dataMerge(): number { return this._dataMerge }

  /**
   * Width of slide
   */
  @Input() width = 0;

  /**
   * Inner content of dot for certain slide; can be html-markup
   */
  @Input() dotContent = '';

  /**
   * Hash (fragment) of url which corresponds to certain slide
   */
  @Input() dataHash = '';

  constructor(public tplRef: TemplateRef<any>) {}

  /**
	 * Determines if the input is a Number or something that can be coerced to a Number
	 * @param - The input to be tested
	 * @returns - An indication if the input is a Number or can be coerced to a Number
	 */
  isNumeric(number: any): boolean {
		return !isNaN(parseFloat(number));
	}
}

/**
 * Data which will be passed out after ending of transition of carousel
 */
export class SlidesOutputData {
  startPosition?: number;
  slides?: SlideModel[];
};

@Component({
  selector: 'owl-carousel-o',
  template: `
    <div class="owl-carousel owl-theme" #owlCarousel
      [ngClass]="{'owl-rtl': owlDOMData?.rtl,
                  'owl-loaded': owlDOMData?.isLoaded,
                  'owl-responsive': owlDOMData?.isResponsive,
                  'owl-drag': owlDOMData?.isMouseDragable,
                  'owl-grab': owlDOMData?.isGrab}"
      (mouseover)="startPausing()"
      (mouseleave)="startPlayML()"
      (touchstart)="startPausing()"
      (touchend)="startPlayTE()">

      <div *ngIf="carouselLoaded" class="owl-stage-outer">
        <owl-stage [owlDraggable]="{'isMouseDragable': owlDOMData?.isMouseDragable, 'isTouchDragable': owlDOMData?.isTouchDragable}"
                    [stageData]="stageData"
                    [slidesData]="slidesData"></owl-stage>
      </div> <!-- /.owl-stage-outer -->
      <ng-container *ngIf="slides.toArray().length">
        <div class="owl-nav" [ngClass]="{'disabled': navData?.disabled}">
          <div class="owl-prev" [ngClass]="{'disabled': navData?.prev?.disabled}" (click)="prev()" [innerHTML]="navData?.prev?.htmlText"></div>
          <div class="owl-next" [ngClass]="{'disabled': navData?.next?.disabled}" (click)="next()" [innerHTML]="navData?.next?.htmlText"></div>
        </div> <!-- /.owl-nav -->
        <div class="owl-dots" [ngClass]="{'disabled': dotsData?.disabled}">
          <div *ngFor="let dot of dotsData?.dots" class="owl-dot" [ngClass]="{'active': dot.active, 'owl-dot-text': dot.showInnerContent}" (click)="moveByDot(dot.id)">
            <span [innerHTML]="dot.innerContent"></span>
          </div>
        </div> <!-- /.owl-dots -->
      </ng-container>
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
  ]
})
export class CarouselComponent
  implements OnInit, AfterContentChecked, AfterContentInit, OnDestroy {
  @ContentChildren(CarouselSlideDirective)
  slides: QueryList<CarouselSlideDirective>;

  @Output() translated = new EventEmitter<SlidesOutputData>();
  @Output() dragging = new EventEmitter<{dragging: boolean, data: SlidesOutputData}>();
  @Output() change = new EventEmitter<SlidesOutputData>();
  @Output() changed = new EventEmitter<SlidesOutputData>();
  @Output() initialized = new EventEmitter<SlidesOutputData>();

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
  owlDOMData: OwlDOMData;

  /**
   * Data of owl-stage
   */
	stageData: StageData;

	/**
	 *  Data of every slide
	 */
  slidesData: SlideModel[] = [];

  /**
	 * Data of navigation block
	 */
	navData: NavData;

	/**
	 * Data of dots block
	 */
  dotsData: DotsData;

  /**
   * Data, wich are passed out of carousel after ending of transioning of carousel
   */
  slidesOutputData: SlidesOutputData;

  /**
   * Shows whether carousel is loaded of not.
   */
  carouselLoaded = false;

  /**
   * User's options
   */
  @Input() options: OwlOptions;

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
    @Inject(DOCUMENT) docRef: any
  ) {
    this.docRef = docRef as Document;

  }

  @HostListener('document:visibilitychange', ['$event'])
  onVisibilityChange(ev: Event) {
    if (!this.carouselService.settings.autoplay) return;
    switch (this.docRef.visibilityState) {
      case 'visible':
        this.autoplayService.play();
        break;

      case 'hidden':
        this.autoplayService.stop();
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

  ngAfterContentChecked() {
  }
  // ngAfterContentChecked() END

  ngAfterContentInit() {
    if (this.slides.toArray().length) {
      this.carouselService.setup(this.carouselWindowWidth, this.slides.toArray(), this.options);
      this.carouselService.initialize(this.slides.toArray());

      this._winResizeWatcher();
    } else {
      this.logger.log(`There are no slides to show. So the carousel won't be rendered`);
    }

    this._slidesChangesSubscription = this.slides.changes.pipe(
      tap((slides) => {
        if (slides.toArray().length) {
          // this.carouselService.setItems(slides.toArray());
          this.carouselService.setup(this.carouselWindowWidth, slides.toArray(), this.options);
          this.carouselService.initialize(slides.toArray());
        } else {
          this.carouselLoaded = false;
          this.logger.log(`There are no slides to show. So the carousel won't be re-rendered`);
        }
      })
    ).subscribe(()=>{});

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
        this.owlDOMData = data.owlDOMData;
        this.stageData = data.stageData;
        this.slidesData = data.slidesData;
        if (!this.carouselLoaded) {
          this.carouselLoaded = true;
        }
        this.navData = data.navData;
        this.dotsData = data.dotsData;
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
          switchMap(() => from(this.slidesData)),
          skip(value.property.value),
          take(this.carouselService.settings.items),
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
        this.changed.emit(slidesData.slides.length ? slidesData : this.slidesOutputData);
        // console.log(this.slidesOutputData);
        // this.slidesOutputData = {};
      })
    );

    this._draggingCarousel$ = this.carouselService.getDragState().pipe(
      tap(() => {
        this.gatherTranslatedData();
        this.dragging.emit({dragging: true, data: this.slidesOutputData});
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
        this.dragging.emit({dragging: false, data: this.slidesOutputData});
      })
    );

    this._carouselMerge$ = merge(
      this._viewCurSettings$,
      this._translatedCarousel$,
      this._draggingCarousel$,
      this._changeCarousel$,
      this._changedCarousel$,
      this._initializedCarousel$
    );
    this._allObservSubscription = this._carouselMerge$.subscribe(() => {});
  }

  /**
   * Init subscription to resize event and attaches handler for this event
   */
  private _winResizeWatcher() {
    if (Object.keys(this.carouselService._options.responsive).length) {
      this.resizeSubscription = this.resizeService.onResize$
        .pipe(
          filter(() => this.carouselWindowWidth !== this.el.nativeElement.querySelector('.owl-carousel').clientWidth),
          delay(this.carouselService.settings.responsiveRefreshRate)
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
    if (!this.carouselLoaded) return;
    this.navigationService.next(this.carouselService.settings.navSpeed);
  }

  /**
   * Handler for click event, attached to prev button
   */
  prev() {
    if (!this.carouselLoaded) return;
    this.navigationService.prev(this.carouselService.settings.navSpeed);
  }

  /**
   * Handler for click event, attached to dots
   */
  moveByDot(dotId: string) {
    if (!this.carouselLoaded) return;
    this.navigationService.moveByDot(dotId);
  }

  /**
   * rewinds carousel to slide with needed id
   * @param id fragment of url
   */
  to(id: string) {
    // if (!this.carouselLoaded || ((this.navData && this.navData.disabled) && (this.dotsData && this.dotsData.disabled))) return;
    if (!this.carouselLoaded) return;
    this.navigationService.toSlideById(id);
  }

  /**
   * Gathers and prepares data intended for passing to the user by means of firing event translatedCarousel
   */
  gatherTranslatedData() {
    let startPosition: number;
    const clonedIdPrefix = this.carouselService.clonedIdPrefix;
    const activeSlides: SlideModel[] = this.slidesData
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
    startPosition = this.carouselService.relative(this.carouselService.current());
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

}
