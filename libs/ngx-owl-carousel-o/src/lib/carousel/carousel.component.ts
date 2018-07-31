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
import { tap } from 'rxjs/operators';
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

class SlidersData {
  id: string;
  active: boolean;
  activeDot?: boolean;
  sequenceN?: number;

  constructor(
    id: string,
    active: boolean,
    sequenceN?: number,
    activeDot?: boolean
  ) {
    this.id = id;
    this.active = active;
    this.sequenceN = sequenceN || 0;
    this.activeDot = activeDot || false;
  }
}

class FirstActiveSlide {
  stage: string; // either 'first' or 'second'
  item: SlidersData;
  index: number;
}

/**
 * data which will be passed out after ending of transition of carousel
 */
export class SlidesOutputData {
  startPosition?: number;
  slides?: SliderModel[];
};

class ResolutionCarouselData {
  [resolution: string]: number;
}

class States {
  current: {};
  tags: {
    [key: string]: string[];
  };
}

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

  // number of visible sliders in carousel; it's needed for defining width of each slider
  private _slidersQuantity = 1;

  // width of carousel window (tag with class .surf-carousel-2-sliders-wrapper), in wich we can see moving sliders
  carouselWindowWidth: number;

  // width of each slider
  sliderWidth: number;

  // width of carousel stage;
  stageWidth: number;

  // info about id and active/inactive state of each slider in first stage
  slidersStageData: SlidersData[] = [];

  resizeSubscription: Subscription;
  private _allObservSubscription: Subscription;

  owlVisible: true;

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
	 * Default options for the carousel.
	 * @public
	 */
  defaults = {
		items: 3,
		loop: false,
		center: false,
		rewind: false,

		mouseDrag: true,
		touchDrag: true,
		pullDrag: true,
		freeDrag: false,

		margin: 0,
		stagePadding: 0,

		merge: false,
		mergeFit: true,
		autoWidth: false,

		startPosition: 0,
		rtl: false,

		smartSpeed: 250,
		fluidSpeed: false,
		dragEndSpeed: false,

		responsive: {},
		responsiveRefreshRate: 200,
		responsiveBaseElement: window,

		fallbackEasing: 'swing',

		info: false,

		nestedItemSelector: false,

		refreshClass: 'owl-refresh',
    loadedClass: 'owl-loaded',
    isLoadedClass: false,
    loadingClass: 'owl-loading',
    isLoadingClass: false,
		// loadingClass: 'owl-loading',
		rtlClass: 'owl-rtl',
		responsiveClass: 'owl-responsive',
		dragClass: 'owl-drag',
		itemClass: 'owl-item',
		grabClass: 'owl-grab'
	};

  /**
   * User's options
   */
  @Input() options: OwlOptions;

  // this.$element = $(element); use this.el.

  /**
   * Proxied event handlers.
   */
  protected _handlers: any = {};

  /**
   * Current width of the plugin element.
   */
  _width: number | null = null;

  // protected _items = []; use this.slides

  /**
   * All cloned items.
   */
  protected _clones: any[] = [];

  /**
   * Widths of all items.
   */
  _widths: any[] = [];

  /**
   * Current state information for the drag operation.
   * @todo #261
   */
  protected _drag: any = {
    time: null,
    target: null,
    pointer: null,
    stage: {
      start: null,
      current: null
    },
    direction: null
  };

  /**
   * Current state information and their tags.
   * @type ff {Object}
   */
  protected _states: States = {
    current: {},
    tags: {
      initializing: ['busy'],
      animating: ['busy'],
      dragging: ['interacting']
    }
  };

  /**
   * Visibility of carousel
   */
  isVisible = false;

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

    // this.options = Object.assign({}, this.defaults, this.options);

    // ['onResize', 'onThrottledResize'].forEach(handler => {
    //   this._handlers[handler] = this[handler];
    // });

    // all plugins have to be added manually
    // $.each(Owl.Plugins, $.proxy(function(key, plugin) {
    // 	this._plugins[key.charAt(0).toLowerCase() + key.slice(1)]
    // 		= new plugin(this);
    // }, this));

    // $.each(Owl.Workers, $.proxy(function(priority, worker) {
    // 	this._pipe.push({
    // 		'filter': worker.filter,
    // 		'run': $.proxy(worker.run, this)
    // 	});
    // }, this));

    // set quantity of sliders in initialization of component
    this.carouselWindowWidth = this.el.nativeElement.querySelector(
      '.owl-carousel'
    ).clientWidth;

    this.resizeSubscription = this.resizeService.onResize$
      .pipe(tap(() => {}))
      .subscribe(() => {});
  }

  ngAfterContentChecked() {
    // this.carouselService.setup();
    // this.initialize();
    // this.slides.toArray()
    // console.log(this.slides.toArray()[1].mergeData);
  }
  // ngAfterContentChecked() END

  ngAfterContentInit() {
    this.carouselService.setup(this.carouselWindowWidth, this.slides.toArray(), this.options);
    this.carouselService.initialize(this.slides.toArray());
  }

  ngOnDestroy() {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }

    this._allObservSubscription.unsubscribe();
  }

  // type checking
  isNumber(x: any): x is number {
    return typeof x === 'number';
  }

  isResolutionObj(x: any): x is ResolutionCarouselData {
    return typeof x === 'object';
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
        console.log(this.stageData);
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
