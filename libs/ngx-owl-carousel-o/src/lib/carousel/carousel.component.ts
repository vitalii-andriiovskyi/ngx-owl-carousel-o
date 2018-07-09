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
  Inject
} from '@angular/core';

import { Subscription } from 'rxjs';

import { ResizeService } from '../services/resize.service';
import { WINDOW } from '../services/window-ref.service';
import { tap } from 'rxjs/operators';
import { CustomEventsService } from '../services/custom-events.service';
import { CarouselService } from '../services/carousel.service';

let nextId = 0;

@Directive({ selector: 'ng-template[carouselSlide]' })
export class CarouselSlideDirective {
  /**
   * Unique slide identifier. Must be unique for the entire document for proper accessibility support.
   * Will be auto-generated if not provided.
   */
  @Input() id = `ngb-slide-${nextId++}`;
  constructor(public tplRef: TemplateRef<any>) {}
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
  implements OnInit, AfterContentChecked, OnDestroy {
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

  owlVisible: true;

  /**
   * Current settings for the carousel.
   */
  settings: any = null;

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
   * Current options set by the caller including defaults.
   */
  @Input() options: any = this.defaults;

  // this.$element = $(element); use this.el.

  /**
   * Proxied event handlers.
   */
  protected _handlers: any = {};

  /**
   * References to the running plugins of this carousel.
   */
  protected _plugins: any = {};

  /**
   * Currently suppressed events to prevent them from beeing retriggered.
   */
  protected _supress: any = {};

  /**
   * Absolute current position.
   */
  protected _current: number | null = null;

  /**
   * Animation speed in milliseconds.
   */
  protected _speed: number | null = null;

  /**
   * Coordinates of all items in pixel.
   * @todo The name of this member is missleading.
   */
  protected _coordinates: any[] = [];

  /**
   * Current breakpoint.
   * @todo Real media queries would be nice.
   */
  protected _breakpoint: any = null;

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
   * Merge values of all items.
   * @todo Maybe this could be part of a plugin.
   */
  protected _mergers: any[] = [];

  /**
   * Widths of all items.
   */
  _widths: any[] = [];


  /**
   * Ordered list of workers for the update process.
   */
  protected _pipe: any[] = [
    {
      filter: ['width', 'settings'],
      run: () => {
        this._width = this.carouselWindowWidth;
      }
    },
    {
      filter: ['width', 'items', 'settings'],
      run: cache => {
        // **   cache.current = this.slides && this.slides.toArray()[this.relative(this._current)];
        // cache.current = this._items && this._items[this.relative(this._current)];
      }
    },
    {
      filter: ['items', 'settings'],
      run: function() {
        // this.$stage.children('.cloned').remove();
      }
    } //{
    //   filter: [ 'width', 'items', 'settings' ],
    //   run: function(cache) {
    //     var margin = this.settings.margin || '',
    //       grid = !this.settings.autoWidth,
    //       rtl = this.settings.rtl,
    //       css = {
    //         'width': 'auto',
    //         'margin-left': rtl ? margin : '',
    //         'margin-right': rtl ? '' : margin
    //       };

    //     !grid && this.$stage.children().css(css);

    //     cache.css = css;
    //   }
    // }, {
    //   filter: [ 'width', 'items', 'settings' ],
    //   run: function(cache) {
    //     var width = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
    //       merge = null,
    //       iterator = this._items.length,
    //       grid = !this.settings.autoWidth,
    //       widths = [];

    //     cache.items = {
    //       merge: false,
    //       width: width
    //     };

    //     while (iterator--) {
    //       merge = this._mergers[iterator];
    //       merge = this.settings.mergeFit && Math.min(merge, this.settings.items) || merge;

    //       cache.items.merge = merge > 1 || cache.items.merge;

    //       widths[iterator] = !grid ? this._items[iterator].width() : width * merge;
    //     }

    //     this._widths = widths;
    //   }
    // }, {
    //   filter: [ 'items', 'settings' ],
    //   run: function() {
    //     var clones = [],
    //       items = this._items,
    //       settings = this.settings,
    //       // TODO: Should be computed from number of min width items in stage
    //       view = Math.max(settings.items * 2, 4),
    //       size = Math.ceil(items.length / 2) * 2,
    //       repeat = settings.loop && items.length ? settings.rewind ? view : Math.max(view, size) : 0,
    //       append = '',
    //       prepend = '';

    //     repeat /= 2;

    //     while (repeat--) {
    //       // Switch to only using appended clones
    //       clones.push(this.normalize(clones.length / 2, true));
    //       append = append + items[clones[clones.length - 1]][0].outerHTML;
    //       clones.push(this.normalize(items.length - 1 - (clones.length - 1) / 2, true));
    //       prepend = items[clones[clones.length - 1]][0].outerHTML + prepend;
    //     }

    //     this._clones = clones;

    //     $(append).addClass('cloned').appendTo(this.$stage);
    //     $(prepend).addClass('cloned').prependTo(this.$stage);
    //   }
    // }, {
    //   filter: [ 'width', 'items', 'settings' ],
    //   run: function() {
    //     var rtl = this.settings.rtl ? 1 : -1,
    //       size = this._clones.length + this._items.length,
    //       iterator = -1,
    //       previous = 0,
    //       current = 0,
    //       coordinates = [];

    //     while (++iterator < size) {
    //       previous = coordinates[iterator - 1] || 0;
    //       current = this._widths[this.relative(iterator)] + this.settings.margin;
    //       coordinates.push(previous + current * rtl);
    //     }

    //     this._coordinates = coordinates;
    //   }
    // }, {
    //   filter: [ 'width', 'items', 'settings' ],
    //   run: function() {
    //     var padding = this.settings.stagePadding,
    //       coordinates = this._coordinates,
    //       css = {
    //         'width': Math.ceil(Math.abs(coordinates[coordinates.length - 1])) + padding * 2,
    //         'padding-left': padding || '',
    //         'padding-right': padding || ''
    //       };

    //     this.$stage.css(css);
    //   }
    // }, {
    //   filter: [ 'width', 'items', 'settings' ],
    //   run: function(cache) {
    //     var iterator = this._coordinates.length,
    //       grid = !this.settings.autoWidth,
    //       items = this.$stage.children();

    //     if (grid && cache.items.merge) {
    //       while (iterator--) {
    //         cache.css.width = this._widths[this.relative(iterator)];
    //         items.eq(iterator).css(cache.css);
    //       }
    //     } else if (grid) {
    //       cache.css.width = cache.items.width;
    //       items.css(cache.css);
    //     }
    //   }
    // }, {
    //   filter: [ 'items' ],
    //   run: function() {
    //     this._coordinates.length < 1 && this.$stage.removeAttr('style');
    //   }
    // }, {
    //   filter: [ 'width', 'items', 'settings' ],
    //   run: function(cache) {
    //     cache.current = cache.current ? this.$stage.children().index(cache.current) : 0;
    //     cache.current = Math.max(this.minimum(), Math.min(this.maximum(), cache.current));
    //     this.reset(cache.current);
    //   }
    // }, {
    //   filter: [ 'position' ],
    //   run: function() {
    //     this.animate(this.coordinates(this._current));
    //   }
    // }, {
    //   filter: [ 'width', 'position', 'items', 'settings' ],
    //   run: function() {
    //     var rtl = this.settings.rtl ? 1 : -1,
    //       padding = this.settings.stagePadding * 2,
    //       begin = this.coordinates(this.current()) + padding,
    //       end = begin + this.width() * rtl,
    //       inner, outer, matches = [], i, n;

    //     for (i = 0, n = this._coordinates.length; i < n; i++) {
    //       inner = this._coordinates[i - 1] || 0;
    //       outer = Math.abs(this._coordinates[i]) + padding * rtl;

    //       if ((this.op(inner, '<=', begin) && (this.op(inner, '>', end)))
    //         || (this.op(outer, '<', begin) && this.op(outer, '>', end))) {
    //         matches.push(i);
    //       }
    //     }

    //     this.$stage.children('.active').removeClass('active');
    //     this.$stage.children(':eq(' + matches.join('), :eq(') + ')').addClass('active');

    //     if (this.settings.center) {
    //       this.$stage.children('.center').removeClass('center');
    //       this.$stage.children().eq(this.current()).addClass('center');
    //     }
    //   }
    // }
  ];

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
    this.options = Object.assign({}, this.defaults, this.options);

    ['onResize', 'onThrottledResize'].forEach(handler => {
      this._handlers[handler] = this[handler];
    });

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
  }
  // ngAfterContentChecked() END

  ngOnDestroy() {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }

  /**
	 * Initializes the carousel.
	 * @protected
	 */
  initialize() {
		this.carouselService.enter('initializing');
		this.carouselService.trigger('initialize');

    this.options.isLoadingClass = true;
    this.isVisible = true;

		// check visibility
		if (this.isVisible) {
			// update view
			this.carouselService.refresh();
		} else {
			// invalidate width
			this.carouselService.invalidate('width');
    }

    this.options.isLoadingClass = false;
    this.options.isLoadedClass = true;

		// register event handlers
		this.carouselService.registerEventHandlers();

		this.carouselService.leave('initializing');
		this.carouselService.trigger('initialized');
  };

  // type checking
  isNumber(x: any): x is number {
    return typeof x === 'number';
  }

  isResolutionObj(x: any): x is ResolutionCarouselData {
    return typeof x === 'object';
  }

  update(workers: any[]) {
    this.carouselService.update(workers);
  }

}
