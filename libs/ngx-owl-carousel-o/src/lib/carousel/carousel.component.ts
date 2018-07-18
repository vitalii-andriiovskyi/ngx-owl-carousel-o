import {
  Component,
  OnInit,
  AfterContentChecked,
  OnDestroy,
  Input,
  Directive,
  QueryList,
  ContentChildren,
  TemplateRef,
  ElementRef,
  Inject,
  AfterContentInit
} from '@angular/core';

import { Subscription } from 'rxjs';

import { ResizeService } from '../services/resize.service';
import { WINDOW } from '../services/window-ref.service';
import { tap } from 'rxjs/operators';
import { CustomEventsService } from '../services/custom-events.service';
import { CarouselService, StageData, OwlDOMData } from '../services/carousel.service';
import { SliderModel } from './slider.model';

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
  private _dataMerge: number;
  @Input()
  set dataMerge(data: number) {
    this._dataMerge = this.isNumeric(data) ? data : 1;
  };
  get dataMerge(): number { return this._dataMerge }

  @Input() width = 0;

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
  curSettingsSubscr: Subscription;

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
  @Input() options: any;

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

  constructor(
    private el: ElementRef,
    private resizeService: ResizeService,
    @Inject(WINDOW) private winRef: Window,
    private customEventsCreator: CustomEventsService,
    private carouselService: CarouselService
  ) {}

  ngOnInit() {
    this.getCarouselCurrentSettings();

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
    this.carouselService.setCarouselWidth(this.carouselWindowWidth);
    this.carouselService.setOptions(this.options);
    this.carouselService.setup();
    this.carouselService.initialize(this.slides.toArray());
  }
  ngOnDestroy() {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }

    this.curSettingsSubscr.unsubscribe();
  }

  // type checking
  isNumber(x: any): x is number {
    return typeof x === 'number';
  }

  isResolutionObj(x: any): x is ResolutionCarouselData {
    return typeof x === 'object';
  }

  getCarouselCurrentSettings() {
    this.curSettingsSubscr = this.carouselService.getCarouselCurSettings().subscribe(data => {
      this.owlDOMData = data.owlDOMData;
      this.stageData = data.stageData;
      this.slidesData = data.slidesData;
      console.log(this.slidesData);
      if (!this.carouselLoaded) {
        this.carouselLoaded = true;
      }
    })
  }

  onTransitionEnd() {
    this.carouselService.onTransitionEnd();
  }

}
