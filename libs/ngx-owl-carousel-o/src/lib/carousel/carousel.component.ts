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
  EventEmitter
} from '@angular/core';

import { Subscription, Observable, merge } from 'rxjs';

import { ResizeService } from '../services/resize.service';
import { tap, delay, filter } from 'rxjs/operators';
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
      <div class="owl-nav" [ngClass]="{'disabled': navData?.disabled}">
        <div class="owl-prev" [ngClass]="{'disabled': navData?.prev?.disabled}" (click)="prev()" [innerHTML]="navData?.prev?.htmlText"></div>
        <div class="owl-next" [ngClass]="{'disabled': navData?.next?.disabled}" (click)="next()" [innerHTML]="navData?.next?.htmlText"></div>
      </div> <!-- /.owl-nav -->
      <div class="owl-dots" [ngClass]="{'disabled': dotsData?.disabled}">
        <div *ngFor="let dot of dotsData?.dots" class="owl-dot" [ngClass]="{'active': dot.active, 'owl-dot-text': dot.showInnerContent}" (click)="moveByDot(dot.id)">
          <span [innerHTML]="dot.innerContent"></span>
        </div>
      </div> <!-- /.owl-dots -->
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
  @Output() dragging = new EventEmitter<boolean>();

  /**
   * Width of carousel window (tag with class .owl-carousel), in wich we can see moving sliders
   */
  carouselWindowWidth: number;

  /**
   * Subscription to 'resize' event
   */
  resizeSubscription: Subscription;

  /**
   * Subscription merge Observable, which merges all Observables in the component except 'resize' Observable
   */
  private _allObservSubscription: Subscription;

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
  slidesData: SlideModel[];

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
   * Observable for merging all Observables and creating one subscription
   */
  private _carouselMerge$: Observable<CarouselCurrentData | string>;

  constructor(
    private el: ElementRef,
    private resizeService: ResizeService,
    private carouselService: CarouselService,
    private navigationService: NavigationService,
    private autoplayService: AutoplayService,
    private lazyLoadService: LazyLoadService,
    private animateService: AnimateService,
    private autoHeightService: AutoHeightService,
    private hashService: HashService
  ) {}

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
    this.carouselService.setup(this.carouselWindowWidth, this.slides.toArray(), this.options);
    this.carouselService.initialize(this.slides.toArray());

    this._winResizeWatcher();
  }

  ngOnDestroy() {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }

    this._allObservSubscription.unsubscribe();
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

    this._translatedCarousel$ = this.carouselService.getTranslatedState().pipe(
      tap(() => {
        this.gatherTranslatedData();
        this.translated.emit(this.slidesOutputData);
        this.slidesOutputData = {};
      })
    );

    this._draggingCarousel$ = this.carouselService.getDragState().pipe(
      tap(() => {
        this.dragging.emit(true);
      })
    )

    this._carouselMerge$ = merge(this._viewCurSettings$, this._translatedCarousel$, this._draggingCarousel$);
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
    this.navigationService.next(this.carouselService.settings.navSpeed);
  }

  /**
   * Handler for click event, attached to prev button
   */
  prev() {
    this.navigationService.prev(this.carouselService.settings.navSpeed);
  }

  /**
   * Handler for click event, attached to dots
   */
  moveByDot(dotId: string) {
    this.navigationService.moveByDot(dotId);
  }

  /**
   * rewinds carousel to slide with needed id
   * @param id fragment of url
   */
  to(id: string) {
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
