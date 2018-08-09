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
  Inject,
  AfterContentInit,
  EventEmitter
} from '@angular/core';

import { Subscription, Observable, merge } from 'rxjs';

import { ResizeService } from '../services/resize.service';
import { WINDOW } from '../services/window-ref.service';
import { tap, delay, filter } from 'rxjs/operators';
import { CustomEventsService } from '../services/custom-events.service';
import { CarouselService, StageData, OwlDOMData, CarouselCurrentData } from '../services/carousel.service';
import { SliderModel } from '../models/slider.model';
import { OwlOptions } from '../models/owl-options.model';
import { NavData, DotsData } from '../models/navigation-data.models';
import { NavigationService } from '../services/navigation.service';

let nextId = 0;

@Directive({ selector: 'ng-template[carouselSlide]' })
export class CarouselSlideDirective {
  /**
   * Unique slide identifier. Must be unique for the entire document for proper accessibility support.
   * Will be auto-generated if not provided.
   */
  @Input() id = `owl-slide-${nextId++}`;

  /**
   * defines how much widths of common slide will current slide have
   * e.g. if _mergeData=2, the slide will twice wider then slides with _mergeData=1
   */
  private _dataMerge = 1;
  @Input()
  set dataMerge(data: number) {
    this._dataMerge = this.isNumeric(data) ? data : 1;
  };
  get dataMerge(): number { return this._dataMerge }

  /**
   * width of slide
   */
  @Input() width = 0;

  /**
   * inner content of dot for certain slide; can be html-markup
   */
  @Input() dotContent = '';

  constructor(public tplRef: TemplateRef<any>) {}

  isNumeric(number: any): boolean {
		return !isNaN(parseFloat(number));
	}
}

/**
 * data which will be passed out after ending of transition of carousel
 */
export class SlidesOutputData {
  startPosition?: number;
  slides?: SliderModel[];
};

@Component({
  selector: 'owl-carousel-o',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent
  implements OnInit, AfterContentChecked, AfterContentInit, OnDestroy {
  @ContentChildren(CarouselSlideDirective)
  slides: QueryList<CarouselSlideDirective>;

  @Output() translated = new EventEmitter<SlidesOutputData>();

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
   * data of owl-stage
   */
	stageData: StageData;

	/**
	 *  data of every slide
	 */
  slidesData: SliderModel[];

  /**
	 * data of navigation block
	 */
	navData: NavData;

	/**
	 * data of dots block
	 */
  dotsData: DotsData;

  /**
   * data, wich are passed out of carousel after ending of transioning of carousel
   */
  slidesOutputData: SlidesOutputData;

  /**
   * shows whether carousel is loaded of not.
   */
  carouselLoaded = false;

  /**
   * User's options
   */
  @Input() options: OwlOptions;

  /**
   * observable for getting current View Settings
   */
  private _viewCurSettings$: Observable<CarouselCurrentData>;

  /**
   * observable for catching the end of transition of carousel
   */
  private _translatedCarousel$: Observable<string>;

  /**
   * observable for merging all Observables and creating one subscription
   */
  private _carouselMerge$: Observable<CarouselCurrentData | string>;

  constructor(
    private el: ElementRef,
    private resizeService: ResizeService,
    @Inject(WINDOW) private winRef: Window,
    private customEventsCreator: CustomEventsService,
    private carouselService: CarouselService,
    private navigationService: NavigationService
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
        // console.log(this.stageData);
      })
    );

    this._translatedCarousel$ = this.carouselService.getTranslatedState().pipe(
      tap(() => {
        this.gatherTranslatedData();
        this.translated.emit(this.slidesOutputData);
        this.slidesOutputData = {};
      })
    );

    this._carouselMerge$ = merge(this._viewCurSettings$, this._translatedCarousel$);
    this._allObservSubscription = this._carouselMerge$.subscribe(() => {});
  }

  /**
   * init subscription to resize event and attaches handler for this event
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
   * gathers and prepares data intended for passing to the user by means of firing event translatedCarousel
   */
  gatherTranslatedData() {
    let startPosition: number;
    const activeSlides: SliderModel[] = this.slidesData
      .filter(slide => slide.active === true)
      .map(slide => {
        const id = slide.id.indexOf('cloned-') >= 0 ? slide.id.slice(7) : slide.id;
        return {
          id: id,
          width: slide.width,
          marginL: slide.marginL,
          marginR: slide.marginR,
          center: slide.center
        }
      });
    startPosition = this.slides.toArray().findIndex(slide => slide.id === activeSlides[0].id);
    this.slidesOutputData = {
      startPosition: startPosition,
      slides: activeSlides
    }
  }

}
