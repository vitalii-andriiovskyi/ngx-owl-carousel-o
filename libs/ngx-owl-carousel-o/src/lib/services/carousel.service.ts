
import { Injectable } from '@angular/core';

import { CustomEventsService } from './custom-events.service';
import { CarouselSlideDirective } from '../carousel/carousel.module';
import { SliderModel } from '../models/slider.model';
import { Subject, Observable } from 'rxjs';
import { OwlCarouselOConfig, OwlOptionsMockedTypes } from '../carousel/owl-carousel-o-config';
import { OwlOptions } from '../models/owl-options.model';

import { NavData, DotsData } from '../models/navigation-data.models';
export class States {
  current: {};
  tags: {
    [key: string]: string[];
  };
}

/**
 * Enumeration for types.
 * @public
 * @enum {String}
 */
export enum Type {
	Event = 'event',
	State = 'state'
};

/**
 * Enumeration for width.
 * @public
 * @enum {String}
 */
export enum Width {
	Default = 'default',
	Inner = 'inner',
	Outer = 'outer'
};

/**
 * data model for managing classes of .owl-carousel DOM element
 */
export class OwlDOMData {
	/**
	 * is needed for setting class .owl-rtl
	 */
	rtl: boolean;

	/**
	 * is needed for setting class .owl-responsive
	 */
	isResponsive: boolean;

	/**
	 * is needed for setting class .owl-refreshed
	 */
	isRefreshed: boolean;

	/**
	 * is needed for setting class .owl-loaded
	*/
	isLoaded: boolean;

	/**
	 * is needed for setting class .owl-loading
	 */
	isLoading: boolean;

	/**
	 * is needed for setting class .owl-drag
	 */
	isDragable: boolean;

	/**
	 * is needed for setting class .owl-grab
	 */
	isGrab: boolean;
}

/**
 * data model for managing classes of .owl-stage DOM element
 */
export class StageData {
	/**
	 * determines css-rule transform
	 */
	transform: string;
	/**
	 *  determines css-rule transition
   */
	transition: string;
	/**
	 *  determines css-rule width
   */
	width: number | string;
	/**
	 *  determines css-rule padding-left
   */
	paddingL: number | string;
	/**
	 *  determines css-rule padding-right
   */
	paddingR: number | string;
}

/**
 * model for all current data of carousel
 */
export class CarouselCurrentData {
	owlDOMData: OwlDOMData;
	stageData: StageData;
	slidesData: SliderModel[];
	navData: NavData;
	dotsData: DotsData;
}

@Injectable({
  providedIn: 'root'
})
export class CarouselService {

	private _viewSettingsShipper$ = new Subject<CarouselCurrentData>();
	private _initializedCarousel$ = new Subject<string>();
	private _changedSettingsCarousel$ = new Subject<string>();
	private _translatedCarousel$ = new Subject<string>();
	/**
   * observable catching moment when carousel starts rebuilding after firing resize event
   */
	private _resizeCarousel$ = new Subject<string>();
	/**
   * observable catching moment when carousel ends rebuilding after firing resize event
   */
	private _resizedCarousel$ = new Subject<string>();

  /**
   * Current settings for the carousel.
   */
  settings: OwlOptions = {
		items: 0
	};

	/**
   * data containing true/false for setting classes to element .owl-carousel
   */
	owlDOMData: OwlDOMData = {
		rtl: false,
		isResponsive: false,
		isRefreshed: false,
		isLoaded: false,
		isLoading: false,
		isDragable: false,
		isGrab: false
	};

	/**
   * data of owl-stage
   */
	stageData: StageData = {
		transform: 'translate3d(0px,0px,0px)',
		transition: '0s',
		width: 0,
		paddingL: 0,
		paddingR: 0
	};

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
	 * carousel width
	 */
	private _width: number;

	/**
	 * All real items.
	 */
	private _items: CarouselSlideDirective[] = []; // is equal to this.slides

	/**
   * array with width of every slide.
   */
  private _widths: any[] = [];

	/**
   * Currently suppressed events to prevent them from beeing retriggered.
   */
	private _supress: any = {};

  /**
   * References to the running plugins of this carousel.
   */
	private _plugins: any = {};

	/**
   * Absolute current position.
   */
	private _current: number | null = null;

	/**
   * All cloned items.
   */
	private _clones: any[] = [];

  /**
   * Merge values of all items.
   * @todo Maybe this could be part of a plugin.
   */
	readonly _mergers: any[] = [];

	/**
   * Animation speed in milliseconds.
   */
	private _speed: number | null = null;

	/**
   * Coordinates of all items in pixel.
   * @todo The name of this member is missleading.
   */
	private _coordinates: any[] = [];

	/**
   * Current breakpoint.
   * @todo Real media queries would be nice.
   */
  private _breakpoint: any = null;

	/**
	 * Current options set by the caller including defaults.
	 */
	_options: OwlOptions = {};

  /**
   * Invalidated parts within the update process.
   */
  private _invalidated: any = {};

  // is needed for tests
  get invalidated() {
    return this._invalidated;
  }
  /**
   * Current state information and their tags.
   * @type ff {Object}
   */
  private _states: States = {
    current: {},
    tags: {
      initializing: ['busy'],
      animating: ['busy'],
      dragging: ['interacting']
    }
  };

  // is needed for tests
  get states() {
    return this._states;
	}

	 /**
   * Ordered list of workers for the update process.
   */
  private _pipe: any[] = [
    // {
    //   filter: ['width', 'settings'],
    //   run: () => {
    //     this._width = this.carouselWindowWidth;
    //   }
    // },
    {
      filter: ['width', 'items', 'settings'],
      run: cache => {
        cache.current = this._items && this._items[this.relative(this._current)].id;
      }
    },
    // {
    //   filter: ['items', 'settings'],
    //   run: function() {
    //     // this.$stage.children('.cloned').remove();
    //   }
		// },
		 {
      filter: [ 'width', 'items', 'settings' ],
      run: (cache) => {
        const margin = this.settings.margin || '',
          grid = !this.settings.autoWidth,
          rtl = this.settings.rtl,
          css = {
            'margin-left': rtl ? margin : '',
            'margin-right': rtl ? '' : margin
          };

        if(!grid) {
					this.slidesData.forEach(slide => {
						slide.marginL = css['margin-left'];
						slide.marginR = css['margin-right'];
					});
				}

        cache.css = css;
      }
    }, {
      filter: [ 'width', 'items', 'settings' ],
      run: (cache) => {
        const width: any = +(this.width() / this.settings.items).toFixed(3) - this.settings.margin,
          grid = !this.settings.autoWidth,
          widths = [];
				let merge = null,
						iterator = this._items.length;

        cache.items = {
          merge: false,
          width: width
        };

        while (iterator--) {
          merge = this._mergers[iterator];
          merge = this.settings.mergeFit && Math.min(merge, this.settings.items) || merge;
          cache.items.merge = merge > 1 || cache.items.merge;

          widths[iterator] = !grid ? this._items[iterator].width ? this._items[iterator].width : width : width * merge;
        }

				this._widths = widths;

				this.slidesData.forEach((slide, i) => {
					slide.width = this._widths[i];
					slide.marginR = cache.css['margin-right'];
					slide.marginL = cache.css['margin-left'];
				});
      }
    }, {
      filter: [ 'items', 'settings' ],
      run: () => {
        const clones: any[] = [],
          items: CarouselSlideDirective[] = this._items,
          settings: any = this.settings,
          // TODO: Should be computed from number of min width items in stage
          view = Math.max(settings.items * 2, 4),
          size = Math.ceil(items.length / 2) * 2;
				let  append: any[] = [],
          prepend: any[] = [],
					repeat = settings.loop && items.length ? settings.rewind ? view : Math.max(view, size) : 0;

        repeat /= 2;

        while (repeat--) {
          // Switch to only using appended clones
          clones.push(this.normalize(clones.length / 2, true));
          append.push({ ...this.slidesData[clones[clones.length - 1]]});
					clones.push(this.normalize(items.length - 1 - (clones.length - 1) / 2, true));
					prepend.unshift({ ...this.slidesData[clones[clones.length - 1]]});
        }

				this._clones = clones;

				append = append.map(slide => {
					slide.id = `cloned-${slide.id}`;
					slide.active = false;
					slide.cloned = true;
					return slide;
				});

				prepend = prepend.map(slide => {
					slide.id = `cloned-${slide.id}`;
					slide.active = false;
					slide.cloned = true;
					return slide;
				});

				this.slidesData = prepend.concat(this.slidesData).concat(append);
      }
    }, {
      filter: [ 'width', 'items', 'settings' ],
      run: () => {
        const rtl = this.settings.rtl ? 1 : -1,
          size = this._clones.length + this._items.length,
          coordinates = [];
        let iterator = -1,
          previous = 0,
          current = 0;

        while (++iterator < size) {
          previous = coordinates[iterator - 1] || 0;
          current = this._widths[this.relative(iterator)] + this.settings.margin;
          coordinates.push(previous + current * rtl);
        }

        this._coordinates = coordinates;
      }
    }, {
      filter: [ 'width', 'items', 'settings' ],
      run: () => {
        const padding = this.settings.stagePadding,
          coordinates = this._coordinates,
          css = {
            'width': Math.ceil(Math.abs(coordinates[coordinates.length - 1])) + padding * 2,
            'padding-left': padding || '',
            'padding-right': padding || ''
					};

				this.stageData.width = css.width; // use this property in *ngIf directive for .owl-stage element
				this.stageData.paddingL = css['padding-left'];
				this.stageData.paddingR = css['padding-right'];
      }
    }, {
    //   filter: [ 'width', 'items', 'settings' ],
    //   run: cache => {
		// 		// this method sets the width for every slide, but I set it in different way earlier
		// 		const grid = !this.settings.autoWidth,
		// 		items = this.$stage.children(); // use this.slidesData
    //     let iterator = this._coordinates.length;

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
      filter: [ 'width', 'items', 'settings' ],
      run: cache => {
        let current = cache.current ? this.slidesData.findIndex(slide => slide.id === cache.current) : 0;
       	current = Math.max(this.minimum(), Math.min(this.maximum(), current));
        this.reset(current);
      }
    }, {
      filter: [ 'position' ],
      run: () => {
        this.animate(this.coordinates(this._current));
      }
    }, {
      filter: [ 'width', 'position', 'items', 'settings' ],
      run: () => {
        const rtl = this.settings.rtl ? 1 : -1,
					padding = this.settings.stagePadding * 2,
					matches = [];
				let begin, end, inner, outer, i, n;

				begin = this.coordinates(this.current());
				if (typeof begin === 'number' ) {
					begin += padding;
				} else {
					begin = 0;
				}

				end = begin + this.width() * rtl;

				if (rtl === -1 && this.settings.center) {
					const result =	this._coordinates.filter(element => {
						return this.settings.items % 2 === 1 ? element >= begin : element > begin;
					});
					begin = result.length ? result[result.length - 1] : begin;
				}

        for (i = 0, n = this._coordinates.length; i < n; i++) {
          inner = this.settings.rtl ? Math.ceil(this._coordinates[i - 1] || 0) : Math.ceil(this._coordinates[i - 1] || 0);
					outer = Math.ceil(Math.abs(this._coordinates[i]) + padding * rtl);

          if ((this._op(inner, '<=', begin) && (this._op(inner, '>', end)))
            || (this._op(outer, '<', begin) && this._op(outer, '>', end))) {
            matches.push(i);
          }
				}

				this.slidesData.forEach(slide => {
					slide.active = false;
					return slide;
				});
				matches.forEach(item => {
					this.slidesData[item].active = true;
				});

        if (this.settings.center) {
					this.slidesData.forEach(slide => {
						slide.center = false;
						return slide;
					});
					this.slidesData[this.current()].center = true;
        }
      }
    }
  ];

	constructor(private customEventsCreator: CustomEventsService) { }

	/**
	 * returns all needed data for showing carousel
	 */
	getViewCurSettings(): Observable<CarouselCurrentData> {
		return this._viewSettingsShipper$.asObservable();
	}

	getInitializedState(): Observable<string> {
		return this._initializedCarousel$.asObservable()
	}

	getChangedState(): Observable<string> {
		return this._changedSettingsCarousel$.asObservable();
	}

	getTranslatedState(): Observable<string> {
		return this._translatedCarousel$.asObservable();
	}

	/**
	 * makes _resizeCarousel$ Subject become Observable
	 * @returns Observable of _resizeCarousel$ Subject
	 */
	getResizeState(): Observable<string> {
		return this._resizeCarousel$.asObservable();
	}

	/**
	 * makes _resizedCarousel$ Subject become Observable
	 * @returns Observable of _resizedCarousel$ Subject
	 */
	getResizedState(): Observable<string> {
		return this._resizedCarousel$.asObservable();
	}

	/**
	 * Setups custom options expanding default options
	 * @param options custom options
	 */
	setOptions(options: OwlOptions) {
		const configOptions: OwlOptions = new OwlCarouselOConfig();
		const checkedOptions: OwlOptions = this._validateOptions(options, configOptions);
		this._options = { ...configOptions, ...checkedOptions};
	}

	/**
	 * checks whether user's option are set properly. Cheking is based on typings;
	 * @param options options set by user
	 * @param configOptions default options
	 */
	private _validateOptions(options: OwlOptions, configOptions: OwlOptions): OwlOptions {
		const checkedOptions: OwlOptions = { ...options};
		const mockedTypes = new OwlOptionsMockedTypes();

		for (const key in checkedOptions) {
			if (checkedOptions.hasOwnProperty(key)) {

				// condition could be shortened but it gets harder for understanding
				if (mockedTypes[key] === 'number') {
					if (this._isNumeric(checkedOptions[key])) {
						checkedOptions[key] = +checkedOptions[key];
						checkedOptions[key] = key === 'items' ? this._validateItems(checkedOptions[key]) : checkedOptions[key];
					} else {
						checkedOptions[key] = setRightOption(mockedTypes[key], key);
					}
				} else if (mockedTypes[key] === 'boolean' && typeof checkedOptions[key] !== 'boolean') {
					checkedOptions[key] = setRightOption(mockedTypes[key], key);
				} else if (mockedTypes[key] === 'number|boolean' && !this._isNumberOrBoolean(checkedOptions[key])) {
					checkedOptions[key] = setRightOption(mockedTypes[key], key);
				} else if (mockedTypes[key] === 'number|string' && !this._isNumberOrString(checkedOptions[key])) {
					checkedOptions[key] = setRightOption(mockedTypes[key], key);
				} else if (mockedTypes[key] === 'string[]') {
					if (Array.isArray(checkedOptions[key])) {
						let isString = false;
						checkedOptions[key].forEach(element => {
							isString = typeof element === 'string' ? true : false;
						});
						if (!isString) { checkedOptions[key] = setRightOption(mockedTypes[key], key) };
					} else {
						checkedOptions[key] = setRightOption(mockedTypes[key], key);
					}
				}
			}
		}

		function setRightOption(type: string, key: any): any {
			console.log(`options.${key} must be type of ${type}; ${key}=${options[key]} skipped to defaults: ${key}=${configOptions[key]}`);
			return configOptions[key];
		}

		return checkedOptions;
	}

	/**
	 * checks option items set by user and if it bigger than number of slides then returns number of slides
	 * @param items option items set by user
	 * @returns right number of items
	 */
	private _validateItems(items: number): number {
		let result: number;
		if (items >= this._items.length) {
			result = this._items.length ;
			console.log('option \'items\' in your options is bigger than number of slides; This option is updated to current number of slides and navigation got disabled');
		} else {
			result = items;
		}
		return result;
	}

	/**
	 * set current width of carousel
	 * @param width width of carousel Window
	 */
	setCarouselWidth(width: number) {
		this._width = width;
	}

  /**
	 * Setups the current settings.
	 * @todo Remove responsive classes. Why should adaptive designs be brought into IE8?
	 * @todo Support for media queries by using `matchMedia` would be nice.
	 * @param carouselWidth width of carousel
	 * @param slides array of slides
	 * @param options options set by user
	 * @public
	 */
  setup(carouselWidth: number, slides: CarouselSlideDirective[], options: OwlOptions) {
		this.setCarouselWidth(carouselWidth);
		this.setItems(slides);
		this._defineSlidesData();
		this.setOptions(options);

		this.settings = { ...this._options};

		this.setViewportItemsN();

		// trigger can be deleted
		// this.trigger('change', { property: { name: 'settings', value: settings } });
		this.invalidate('settings'); // must be call of this function;
		// this.trigger('changed', { property: { name: 'settings', value: this.settings } });
	}

	/**
	 * set number of items for current viewport
	 */
	setViewportItemsN() {
		const viewport = this._width,
			overwrites = this._options.responsive;
		let	match = -1;

		if (!Object.keys(overwrites).length) {
			return;
		}

		for (const key in overwrites) {
			if (overwrites.hasOwnProperty(key)) {
				if (+key <= viewport && +key > match) {
					match = Number(key);
				}
			}
		}

		this.settings = { ...this.settings, items: this._validateItems(overwrites[match].items)};
		// if (typeof this.settings.stagePadding === 'function') {
		// 	this.settings.stagePadding = this.settings.stagePadding();
		// }
		delete this.settings.responsive;
		this.owlDOMData.isResponsive = true;
		this._breakpoint = match;

		this.invalidate('settings');
	}

	/**
	 * Initializes the carousel.
	 */
  initialize(slides: CarouselSlideDirective[]) {
		this.enter('initializing');
		// this.trigger('initialize');

		this.owlDOMData.rtl = this.settings.rtl;

		slides.forEach(item => {
			const mergeN: number = this.settings.merge ? item.dataMerge : 1;
			this._mergers.push(mergeN);
		});

		this.reset(this._isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0);

		this.invalidate('items');
		this.refresh();

		this.owlDOMData.isLoaded = true;
		this.sendChanges();
		// register event handlers
		this._registerEventHandlers();
		this._initializedCarousel$.next('initialized');

		this.leave('initializing');
		// this.trigger('initialized');
	};

	/**
	 * Sends all data needed for View.
	 */
	sendChanges() {
		this._viewSettingsShipper$.next({
			owlDOMData: this.owlDOMData,
			stageData: this.stageData,
			slidesData: this.slidesData,
			navData: this.navData,
			dotsData: this.dotsData
		});
	}


  /**
	 * Updates option logic if necessery.
	 */
  private _optionsLogic() {
		if (this.settings.autoWidth) {
			this.settings.stagePadding = 0;
			this.settings.merge = false;
		}
	}

  /**
   * Updates the view.
   * @param - list of functions: workers
   */
  update() {
    let i = 0;
    const n = this._pipe.length,
      filter = item => this._invalidated[item],
			cache = {};

    while (i < n) {
      const filteredPipe = this._pipe[i].filter.filter(filter);
      if (this._invalidated.all || filteredPipe.length > 0) {
				this._pipe[i].run(cache);
      }
      i++;
		}

		this.sendChanges();

    this._invalidated = {};

    if (!this.is('valid')) {
      this.enter('valid');
    }
  }

  /**
	 * Gets the width of the view.
	 * @public
	 * @param [dimension=Width.Default] - The dimension to return.
	 * @returns - The width of the view in pixel.
	 */
  width(dimension?: Width): number {
		dimension = dimension || Width.Default;
		switch (dimension) {
			case Width.Inner:
			case Width.Outer:
				return this._width;
			default:
				return this._width - this.settings.stagePadding * 2 + this.settings.margin;
		}
	}

  /**
	 * Refreshes the carousel primarily for adaptive purposes.
	 * @public
	 */
  refresh() {
		this.enter('refreshing');
		// this.trigger('refresh');
		this._defineSlidesData();
		this.setViewportItemsN();

		this._optionsLogic();

		// this.$element.addClass(this.options.refreshClass);

		this.update();

		// this.$element.removeClass(this.options.refreshClass);

		this.leave('refreshing');
		// this.trigger('refreshed');
	 }

  /**
	 * Checks window `resize` event.
	 */
	private _onThrottledResize() { }

  /**
	 * Checks window `resize` event.
	 */
  onResize(curWidth: number) {
		if (!this._items.length) {
			return false;
		}

		this.setCarouselWidth(curWidth);

		this.enter('resizing');

		// if (this.trigger('resize').isDefaultPrevented()) {
		// 	this.leave('resizing');
		// 	return false;
		// }
		this._resizeCarousel$.next('resize');

		this.invalidate('width');

		this.refresh();

		this.leave('resizing');
		this._resizedCarousel$.next('resized');
	}

  /**
	 * Registers event handlers.
	 * @todo Check `msPointerEnabled`
	 * @todo #261
	 */
  private _registerEventHandlers() {
		// if ($.support.transition) {
		// 	console.log($.support.transition);
		// 	this.$stage.on($.support.transition.end + '.owl.core', $.proxy(this.onTransitionEnd, this));
		// }

		// if (this.settings.responsive !== false) {
		// 	this.on(window, 'resize', this._handlers.onThrottledResize);
		// }

		if (this.settings.mouseDrag) {
			this.owlDOMData.isDragable = true;
			// this.$element.addClass(this.options.dragClass);
			// this.$stage.on('mousedown.owl.core', $.proxy(this.onDragStart, this));
			// this.$stage.on('dragstart.owl.core selectstart.owl.core', function() { return false });
		}

		// if (this.settings.touchDrag){
		// 	this.$stage.on('touchstart.owl.core', $.proxy(this.onDragStart, this));
		// 	this.$stage.on('touchcancel.owl.core', $.proxy(this.onDragEnd, this));
		// }
	 }

  /**
	 * Handles `touchstart` and `mousedown` events.
	 * @todo Horizontal swipe threshold as option
	 * @todo #261
	 * @param {Event} event - The event arguments.
	 */
  private _onDragStart(event) { }

  /**
	 * Handles the `touchmove` and `mousemove` events.
	 * @todo #261
	 * @param {Event} event - The event arguments.
	 */
  private _onDragMove(event) { }

  /**
	 * Handles the `touchend` and `mouseup` events.
	 * @todo #261
	 * @todo Threshold for click event
	 * @param {Event} event - The event arguments.
	 */
  private _onDragEnd(event) { }

  	/**
	 * Gets absolute position of the closest item for a coordinate.
	 * @todo Setting `freeDrag` makes `closest` not reusable. See #165.
	 * @param {Number} coordinate - The coordinate in pixel.
	 * @param {String} direction - The direction to check for the closest item. Ether `left` or `right`.
	 * @return {Number} - The absolute position of the closest item.
	 */
  private _closest(coordinate, direction) { }

  /**
	 * Animates the stage.
	 * @todo #270
	 * @public
	 * @param coordinate - The coordinate in pixels.
	 */
  animate(coordinate: number | number[]) {
		const animate = this.speed() > 0;

		if (this.is('animating')) {
			this.onTransitionEnd();
		}

		if (animate) {
			this.enter('animating');
			this._trigger('translate');
		}

		this.stageData.transform = 'translate3d(' + coordinate + 'px,0px,0px)';
		this.stageData.transition = (this.speed() / 1000) + 's';

		// also there was transition by means of JQuery.animate or css-changing property left
	 }

  /**
	 * Checks whether the carousel is in a specific state or not.
	 * @param state - The state to check.
	 * @return} - The flag which indicates if the carousel is busy.
	 */
  is(state: string): boolean {
		return this._states.current[state] && this._states.current[state] > 0;
  };

  /**
	 * Sets the absolute position of the current item.
	 * @public
	 * @param {Number} [position] - The new absolute position or nothing to leave it unchanged.
	 * @returns {Number} - The absolute position of the current item.
	 */
  current(position?: number): number {
		if (position === undefined) {
			return this._current;
		}

		if (this._items.length === 0) {
			return undefined;
		}

		position = this.normalize(position);

		if (this._current !== position) {
			// const event = this._trigger('change', { property: { name: 'position', value: position } });

			// if (event.data !== undefined) {
			// 	position = this.normalize(event.data);
			// }

			this._current = position;

			this.invalidate('position');
			this._changedSettingsCarousel$.next('changed');
		}

		return this._current;
	 }

  /**
	 * Invalidates the given part of the update routine.
	 * @param [part] - The part to invalidate.
	 * @returns - The invalidated parts.
	 */
  invalidate(part: string): string[] {
		if (typeof part === 'string') {
			this._invalidated[part] = true;
			if(this.is('valid')) { this.leave('valid'); }
		}
		return Object.keys(this._invalidated);
  };

	/**
	 * Resets the absolute position of the current item.
	 * @public
	 * @param position - The absolute position of the new item.
	 */
  reset(position: number) {
		position = this.normalize(position);

		if (position === undefined) {
			return;
		}

		this._speed = 0;
		this._current = position;

		this._suppress([ 'translate', 'translated' ]);

		this.animate(this.coordinates(position));

		this._release([ 'translate', 'translated' ]);
	}

  /**
	 * Normalizes an absolute or a relative position of an item.
	 * @public
	 * @param position - The absolute or relative position to normalize.
	 * @param [relative=false] - Whether the given position is relative or not.
	 * @returns Number - The normalized position.
	 */
  normalize(position: number, relative?: boolean): number {
		const n = this._items.length,
					m = relative ? 0 : this._clones.length;

		if (!this._isNumeric(position) || n < 1) {
			position = undefined;
		} else if (position < 0 || position >= n + m) {
			position = ((position - m / 2) % n + n) % n + m / 2;
		}

		return position;
	 }

  /**
	 * Converts an absolute position of an item into a relative one.
	 * @public
	 * @param position - The absolute position to convert.
	 * @returns - The converted position.
	 */
  relative(position: number): number {
		position -= this._clones.length / 2;
		return this.normalize(position, true);
	 }

  /**
	 * Gets the maximum position for the current item.
	 * @public
	 * @param [relative=false] - Whether to return an absolute position or a relative position.
	 * @returns number of maximum position
	 */
  maximum(relative: boolean = false): number {
		const settings = this.settings;
		let	maximum = this._coordinates.length,
			iterator,
			reciprocalItemsWidth,
			elementWidth;

		if (settings.loop) {
			maximum = this._clones.length / 2 + this._items.length - 1;
		} else if (settings.autoWidth || settings.merge) {
			iterator = this._items.length;
			reciprocalItemsWidth = this.slidesData[--iterator].width;
			elementWidth = this._width;
			while (iterator--) {
				// it could be use this._items instead of this.slidesData;
				reciprocalItemsWidth += +this.slidesData[iterator].width + this.settings.margin;
				if (reciprocalItemsWidth > elementWidth) {
					break;
				}
			}
			maximum = iterator + 1;
		} else if (settings.center) {
			maximum = this._items.length - 1;
		} else {
			maximum = this._items.length - settings.items;
		}

		if (relative) {
			maximum -= this._clones.length / 2;
		}

		return Math.max(maximum, 0);
	 }

  /**
	 * Gets the minimum position for the current item.
	 * @public
	 * @param [relative=false] - Whether to return an absolute position or a relative position.
	 * @returns number of minimum position
	 */
  minimum(relative: boolean = false): number {
		return relative ? 0 : this._clones.length / 2;
	}

  /**
	 * Gets an item at the specified relative position.
	 * @public
	 * @param [position] - The relative position of the item.
	 * @return - The item at the given position or all items if no position was given.
	 */
  items(position?: number): CarouselSlideDirective[] {
		if (position === undefined) {
			return this._items.slice();
		}

		position = this.normalize(position, true);
		return [this._items[position]];
	 }

  /**
	 * Gets an item at the specified relative position.
	 * @public
	 * @param [position] - The relative position of the item.
	 * @return - The item at the given position or all items if no position was given.
	 */
  mergers(position: number): number | number[] {
		if (position === undefined) {
			return this._mergers.slice();
		}

		position = this.normalize(position, true);
		return this._mergers[position];
	 }

  /**
	 * Gets the absolute positions of clones for an item.
	 * @public
	 * @param position - The relative position of the item.
	 * @returns The absolute positions of clones for the item or all if no position was given.
	 */
  clones(position?: number): number[] {
		const odd = this._clones.length / 2,
			even = odd + this._items.length,
			map = index => index % 2 === 0 ? even + index / 2 : odd - (index + 1) / 2;

		if (position === undefined) {
			return this._clones.map((v, i) => map(i));
		}

		return this._clones.map((v, i) => v === position ? map(i) : null);
	}

  /**
	 * Sets the current animation speed.
	 * @public
	 * @param {Number} [speed] - The animation speed in milliseconds or nothing to leave it unchanged.
	 * @returns {Number} - The current animation speed in milliseconds.
	 */
  speed(speed?: number): number {
		if (speed !== undefined) {
			this._speed = speed;
		}

		return this._speed;
	}

  /**
	 * Gets the coordinate of an item.
	 * @todo The name of this method is missleanding.
	 * @public
	 * @param position - The absolute position of the item within `minimum()` and `maximum()`.
	 * @returns - The coordinate of the item in pixel or all coordinates.
	 */
  coordinates(position: number): number | number[] {
		let multiplier = 1,
			newPosition = position - 1,
			coordinate,
			result: any;

		if (position === undefined) {
			result = this._coordinates.map((item, index) => {
				return this.coordinates(index);
			});
			return result;
		}

		if (this.settings.center) {
			if (this.settings.rtl) {
				multiplier = -1;
				newPosition = position + 1;
			}

			coordinate = this._coordinates[position];
			coordinate += (this.width() - coordinate + (this._coordinates[newPosition] || 0)) / 2 * multiplier;
		} else {
			coordinate = this._coordinates[newPosition] || 0;
		}

		coordinate = Math.ceil(coordinate);

		return coordinate;
	 }

  /**
	 * Calculates the speed for a translation.
	 * @param from - The absolute position of the start item.
	 * @param to - The absolute position of the target item.
	 * @param factor [factor=undefined] - The time factor in milliseconds.
	 * @returns - The time in milliseconds for the translation.
	 */
  private _duration(from: number, to: number, factor?: number | boolean): number {
		if (factor === 0) {
			return 0;
		}

		return Math.min(Math.max(Math.abs(to - from), 1), 6) * Math.abs((+factor || this.settings.smartSpeed));
	}

  	/**
	 * Slides to the specified item.
	 * @public
	 * @param {Number} position - The position of the item.
	 * @param {Number} [speed] - The time in milliseconds for the transition.
	 */
  to(position: number, speed: number | boolean) {
		let current = this.current(),
			revert = null,
			distance = position - this.relative(current),
			maximum = this.maximum();
		const	direction = +(distance > 0) - +(distance < 0),
			items = this._items.length,
			minimum = this.minimum();

		if (this.settings.loop) {
			if (!this.settings.rewind && Math.abs(distance) > items / 2) {
				distance += direction * -1 * items;
			}

			position = current + distance;
			revert = ((position - minimum) % items + items) % items + minimum;

			if (revert !== position && revert - distance <= maximum && revert - distance > 0) {
				current = revert - distance;
				position = revert;
				this.reset(current);
				this.sendChanges();
			}
		} else if (this.settings.rewind) {
			maximum += 1;
			position = (position % maximum + maximum) % maximum;
		} else {
			position = Math.max(minimum, Math.min(maximum, position));
		}

		setTimeout(() => {
			this.speed(this._duration(current, position, speed));
			this.current(position);

			this.update();
		}, 0);

	}

  /**
	 * Slides to the next item.
	 * @public
	 * @param [speed] - The time in milliseconds for the transition.
	 */
  next(speed: number | boolean) {
		speed = speed || false;
		this.to(this.relative(this.current()) + 1, speed);
	}

  /**
	 * Slides to the previous item.
	 * @public
	 * @param [speed] - The time in milliseconds for the transition.
	 */
  prev(speed: number | boolean) {
		speed = speed || false;
		this.to(this.relative(this.current()) - 1, speed);
	}

  /**
	 * Handles the end of an animation.
	 * @param {Event} event - The event arguments.
	 */
  onTransitionEnd(event?: any) {
		// if css2 animation then event object is undefined
		if (event !== undefined) {
			// event.stopPropagation();

			// // Catch only owl-stage transitionEnd event
			// if ((event.target || event.srcElement || event.originalTarget) !== this.$stage.get(0)	) {
			// 	return false;
			// }
			return false;
		}
		this.leave('animating');
		this._translatedCarousel$.next('translated');
		// this._trigger('translated');
	}

  /**
	 * Gets viewport width.
	 * @return - The width in pixel.
	 */
  private _viewport(): number {
		let width;
		if (this._width) {
			width = this._width;
		} else {
			console.warn('Can not detect viewport width.');
		}
		return width;
	}

  /**
	 * sets _items
	 * @param content - The new content.
	 */
  setItems(content: CarouselSlideDirective[]) {
		this._items = content;
	}

	/**
	 * sets slidesData using this.items
	 */
	private _defineSlidesData() {
		this.slidesData = this._items.map(slide => {
			return {
				id: `${slide.id}`,
				active: false,
				tplRef: slide.tplRef,
				dataMerge: slide.dataMerge,
				width: 0,
				cloned: false
			};
		});
	}

  	/**
	 * Adds an item.
	 * @todo Use `item` instead of `content` for the event arguments.
	 * @public
	 * @param {HTMLElement|jQuery|String} content - The item content to add.
	 * @param {Number} [position] - The relative position at which to insert the item otherwise the item will be added to the end.
	 */
  add(content, position) { }

  /**
	 * Removes an item by its position.
	 * @todo Use `item` instead of `content` for the event arguments.
	 * @public
	 * @param {Number} position - The relative position of the item to remove.
	 */
  remove(position) { }

  /**
	 * Preloads images with auto width.
	 * @todo Replace by a more generic approach
	 * @private
	 */
	preloadAutoWidthImages(images) { }

  /**
	 * Destroys the carousel.
	 * @public
	 */
  destroy() { }

  /**
	 * Operators to calculate right-to-left and left-to-right.
	 * @param [a] - The left side operand.
	 * @param [o] - The operator.
	 * @param [b] - The right side operand.
	 * @returns true/false meaning right-to-left or left-to-right
	 */
  private _op(a: number, o: string, b: number): boolean {
		const rtl = this.settings.rtl;
		switch (o) {
			case '<':
				return rtl ? a > b : a < b;
			case '>':
				return rtl ? a < b : a > b;
			case '>=':
				return rtl ? a <= b : a >= b;
			case '<=':
				return rtl ? a >= b : a <= b;
			default:
				break;
		}
	}

  	/**
	 * Attaches to an internal event.
	 * @param {HTMLElement} element - The event source.
	 * @param {String} event - The event name.
	 * @param {Function} listener - The event handler to attach.
	 * @param {Boolean} capture - Wether the event should be handled at the capturing phase or not.
	 */
  private _on(element, event, listener, capture) { }

  /**
	 * Detaches from an internal event.
	 * @param {HTMLElement} element - The event source.
	 * @param {String} event - The event name.
	 * @param {Function} listener - The attached event handler to detach.
	 * @param {Boolean} capture - Wether the attached event handler was registered as a capturing listener or not.
	 */
  private _off(element, event, listener, capture) { }

  /**
	 * Triggers a public event.
	 * @todo Remove `status`, `relatedTarget` should be used instead.
	 * @param name - The event name.
	 * @param [data=null] - The event data.
	 * @param [namespace=carousel] - The event namespace.
	 * @param [state] - The state which is associated with the event.
	 * @param [enter=false] - Indicates if the call enters the specified state or not.
	 * @returns return {Event} - The event arguments.
	 */
  private _trigger(name: string, data?: any, namespace?: string, state?: string, enter?: boolean): any {
		const status = {
				item: { count: this._items.length, index: this.current() }
			},
			handler = [ 'on', name, namespace ]
				.filter(item => item)
				.map((item, i) => {
					item = item.toLowerCase();
					if (i !== 0) {
						item = item.charAt(0).toUpperCase() + item.slice(1);
					}
					return item;
				})
				.join(),
			event = {
				type: [ name, 'owl', namespace || 'carousel' ].join('.').toLowerCase(),
				// relatedTarget: this,
				status, // should be item: { count... }
				data // should be property: { name: 'settings', ... }
			};

		if (!this._supress[name]) {
			for (const key in this._plugins) {
				if (this._plugins.hasOwnProperty(key)) {
					const plugin = this._plugins[key];
					if (plugin.onTrigger) {
						plugin.onTrigger(event);
					}
				}
			}

			// this.register({ type: Owl.Type.Event, name: name });
			this.customEventsCreator.emit(event.type, event);

			if (this.settings && typeof this.settings[handler] === 'function') {
				this.settings[handler].call(this, event);
			}
		}

		return event;
	}

	/**
	 * Enters a state.
	 * @param name - The state name.
	 */
  enter(name: string) {
    [ name ].concat(this._states.tags[name] || []).forEach((stateName) => {
      if (this._states.current[stateName] === undefined) {
				this._states.current[stateName] = 0;
			}

			this._states.current[stateName]++;
    });
  };

  /**
	 * Leaves a state.
	 * @param name - The state name.
	 */
	leave(name: string) {
    [ name ].concat(this._states.tags[name] || []).forEach((stateName) => {
      if (this._states.current[stateName] === 0 || !!this._states.current[stateName]) {
        this._states.current[stateName]--;
      }
    })
  };

  /**
	 * Registers an event or state.
	 * @public
	 * @param object - The event or state to register.
	 */
  register(object: any) {
		if (object.type === Type.State) {
			if (!this._states.tags[object.name]) {
				this._states.tags[object.name] = object.tags;
			} else {
				this._states.tags[object.name] = this._states.tags[object.name].concat(object.tags);
			}

			this._states.tags[object.name] = this._states.tags[object.name].filter((tag, i) => {
				return this._states.tags[object.name].indexOf(tag) === i;
			});
		}
	}

  /**
	 * Suppresses events.
	 * @param events - The events to suppress.
	 */
  private _suppress(events: string[]) {
		events.forEach(event => {
			this._supress[event] = true;
		});
	}

  /**
	 * Releases suppressed events.
	 * @param events - The events to release.
	 */
  private _release(events: string[]) {
		events.forEach(event => {
			delete this._supress[event];
		});
	 }

  /**
	 * Gets unified pointer coordinates from event.
	 * @todo #261
	 * @param {Event} - The `mousedown` or `touchstart` event.
	 * @returns {Object} - Contains `x` and `y` coordinates of current pointer position.
	 */
  private _pointer(event) { }

  	/**
	 * Determines if the input is a Number or something that can be coerced to a Number
	 * @param - {Number|String|Object|Array|Boolean|RegExp|Function|Symbol} - The input to be tested
	 * @returns - An indication if the input is a Number or can be coerced to a Number
	 */
  private _isNumeric(number: any): boolean {
		return !isNaN(parseFloat(number));
	}

	/**
	 * Determines whether value is number or boolean type
	 * @param value The input to be tested
	 */
	private _isNumberOrBoolean(value: number | boolean): boolean {
		return this._isNumeric(value) || typeof value === 'boolean';
	}

	/**
	 * Determines whether value is number or string type
	 * @param value The input to be tested
	 */
	private _isNumberOrString(value: number | string): boolean {
		return this._isNumeric(value) || typeof value === 'string';
	}

  	/**
	 * Gets the difference of two vectors.
	 * @todo #261
	 * @param {Object} - The first vector.
	 * @param {Object} - The second vector.
	 * @returns {Object} - The difference.
	 */
  private _difference(first, second) { }

}
