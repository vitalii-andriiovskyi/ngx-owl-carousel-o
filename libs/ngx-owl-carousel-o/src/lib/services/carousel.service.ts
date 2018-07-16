import { Injectable } from '@angular/core';

import { CustomEventsService } from '../services/custom-events.service';
import { CarouselSlideDirective } from '../carousel/carousel.module';
import { SliderModel } from '../carousel/slider.model';

export class States {
  current: {};
  tags: {
    [key: string]: string[];
  };
}

/**
 * Enumeration for types.
 * @public
 * @readonly
 * @enum {String}
 */
export enum Type {
	Event = 'event',
	State = 'state'
};

/**
 * Enumeration for width.
 * @public
 * @readonly
 * @enum {String}
 */
export enum Width {
	Default = 'default',
	Inner = 'inner',
	Outer = 'outer'
};

@Injectable({
  providedIn: 'root'
})
export class CarouselService {
  /**
   * Current settings for the carousel.
   */
  settings: any = {
		items: 0
	};

	// properties, which must be changed in views;
	transform: string;
	transition: string;
	// carousel width
	_width: number;
	stageWidth: number | string;
	stagePaddingL: number | string;
	stagePaddingR: number | string;
	// width of item
	itemsData: SliderModel[];


	/**
	 * All real items.
	 */
	protected _items: CarouselSlideDirective[] = []; // is equal to this.slides

	/**
   * array with width of every slide.
   */
  _widths: any[] = [];

	/**
   * Currently suppressed events to prevent them from beeing retriggered.
   */
	protected _supress: any = {};

  /**
   * References to the running plugins of this carousel.
   */
	protected _plugins: any = {};

	/**
   * Absolute current position.
   */
	protected _current: number | null = null;

	/**
   * All cloned items.
   */
	protected _clones: any[] = [];

  /**
   * Merge values of all items.
   * @todo Maybe this could be part of a plugin.
   */
	readonly _mergers: any[] = [];

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
		// responsiveBaseElement: window, delete

		fallbackEasing: 'swing',

		info: false,

		// nestedItemSelector: false, delete

		refreshClass: 'owl-refresh',
    loadedClass: 'owl-loaded',
    isLoadedClass: false,
    loadingClass: 'owl-loading',
    isLoadingClass: false,
		// loadingClass: 'owl-loading',
		rtlClass: 'owl-rtl',
		// responsiveClass: 'owl-responsive', delete
		dragClass: 'owl-drag',
		itemClass: 'owl-item',
		grabClass: 'owl-grab'
	};

	/**
		 * Current options set by the caller including defaults.
		 * @public
		 */
	options: any = {};

  /**
   * Invalidated parts within the update process.
   */
  protected _invalidated: any = {};

  // is needed for tests
  get invalidated() {
    return this._invalidated;
  }
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

  // is needed for tests
  get states() {
    return this._states;
	}

	 /**
   * Ordered list of workers for the update process.
   */
  protected _pipe: any[] = [
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
					this.itemsData.forEach(slide => {
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

				this.itemsData.forEach((slide, i) => {
					slide.width = this._width[i];
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
          append.push(Object.assign({}, this.itemsData[clones[clones.length - 1]]));
					clones.push(this.normalize(items.length - 1 - (clones.length - 1) / 2, true));
					prepend.unshift(Object.assign({}, this.itemsData[clones[clones.length - 1]]));
        }

				this._clones = clones;

				append = append.map(slide => {
					slide.id = `cloned-${slide.id}`;
					slide.active = false;
					return slide;
				});

				prepend = prepend.map(slide => {
					slide.id = `cloned-${slide.id}`;
					slide.active = false;
					return slide;
				});

				this.itemsData = prepend.concat(this.itemsData).concat(append);
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

				this.stageWidth = css.width; // use this property in *ngIf directive for .owl-stage element
				this.stagePaddingL = css['padding-left'];
				this.stagePaddingR = css['padding-right'];
      }
    }, {
    //   filter: [ 'width', 'items', 'settings' ],
    //   run: cache => {
		// 		// this method sets the width for every slide, but I set it in different way earlier
		// 		const grid = !this.settings.autoWidth,
		// 		items = this.$stage.children(); // use this.itemsData
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
      run: function(cache) {
        cache.current = cache.current ? this.itemsData.findIndex(slide => slide.id === cache.current) : 0;
        cache.current = Math.max(this.minimum(), Math.min(this.maximum(), cache.current));
        this.reset(cache.current);
      }
    }, {
      filter: [ 'position' ],
      run: function() {
        this.animate(this.coordinates(this._current));
      }
    }, {
      filter: [ 'width', 'position', 'items', 'settings' ],
      run: function() {
        const rtl = this.settings.rtl ? 1 : -1,
          padding = this.settings.stagePadding * 2,
          begin = this.coordinates(this.current()) + padding,
          end = begin + this.width() * rtl, matches = [];
          let inner, outer, i, n;

        for (i = 0, n = this._coordinates.length; i < n; i++) {
          inner = this._coordinates[i - 1] || 0;
          outer = Math.abs(this._coordinates[i]) + padding * rtl;

          if ((this.op(inner, '<=', begin) && (this.op(inner, '>', end)))
            || (this.op(outer, '<', begin) && this.op(outer, '>', end))) {
            matches.push(i);
          }
				}

				this.itemsData.forEach(slide => {
					slide.active = false;
					return slide;
				});
				matches.forEach(item => {
					this.itemsData[item].active = true;
				});

        if (this.settings.center) {
					this.itemsData.forEach(slide => {
						slide.center = false;
						return slide;
					});
					this.itemsData[this.current()].center = true;
        }
      }
    }
  ];

  constructor(private customEventsCreator: CustomEventsService) { }

	/**
	 * Setups custom options expanding default options
	 * @param options custom options
	 */
	setOptions(options: any) {
		this.options.assign({}, this.defaults, options);
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
	 * @public
	 */
  setup() {
		const viewport = this._width,
			overwrites = this.options.responsive;
		let	match = -1,
			settings = null;

		if (!overwrites) {
			settings = Object.assign({}, this.options);
		} else {
			for (const key in overwrites) {
				if (overwrites.hasOwnProperty(key)) {
					if (+key <= viewport && +key > match) {
						match = Number(key);
					}
				}
			}

			settings = Object.assign({}, this.options, overwrites[match]);
			if (typeof settings.stagePadding === 'function') {
				settings.stagePadding = settings.stagePadding();
			}
			delete settings.responsive;

		}

		// trigger can be deleted
		// this.trigger('change', { property: { name: 'settings', value: settings } });
		this._breakpoint = match;
		this.settings = settings;
		this.invalidate('settings');
		// this.trigger('changed', { property: { name: 'settings', value: this.settings } });
	 }

  /**
	 * Updates option logic if necessery.
	 */
  private _optionsLogic() {
		if (this.settings.autoWidth) {
			this.settings.stagePadding = false;
			this.settings.merge = false;
		}
	}

  /**
	 * Prepares an item before add.
	 * @todo Rename event parameter `content` to `item`.
	 * @protected
	 * @returns {jQuery|HTMLElement} - The item container.
	 */
  prepare(item) { }

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

		this.setup();

		this._optionsLogic();

		// this.$element.addClass(this.options.refreshClass);

		this.update();

		// this.$element.removeClass(this.options.refreshClass);

		this.leave('refreshing');
		// this.trigger('refreshed');
	 }

  /**
	 * Checks window `resize` event.
	 * @protected
	 */
	onThrottledResize() { }

  /**
	 * Checks window `resize` event.
	 * @protected
	 */
  onResize() { }

  /**
	 * Registers event handlers.
	 * @todo Check `msPointerEnabled`
	 * @todo #261
	 * @protected
	 */
  registerEventHandlers() { }

  /**
	 * Handles `touchstart` and `mousedown` events.
	 * @todo Horizontal swipe threshold as option
	 * @todo #261
	 * @protected
	 * @param {Event} event - The event arguments.
	 */
  onDragStart(event) { }

  /**
	 * Handles the `touchmove` and `mousemove` events.
	 * @todo #261
	 * @protected
	 * @param {Event} event - The event arguments.
	 */
  onDragMove(event) { }

  /**
	 * Handles the `touchend` and `mouseup` events.
	 * @todo #261
	 * @todo Threshold for click event
	 * @protected
	 * @param {Event} event - The event arguments.
	 */
  onDragEnd(event) { }

  	/**
	 * Gets absolute position of the closest item for a coordinate.
	 * @todo Setting `freeDrag` makes `closest` not reusable. See #165.
	 * @protected
	 * @param {Number} coordinate - The coordinate in pixel.
	 * @param {String} direction - The direction to check for the closest item. Ether `left` or `right`.
	 * @return {Number} - The absolute position of the closest item.
	 */
  closest(coordinate, direction) { }

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
			this.trigger('translate');
		}

		this.transform = 'translate3d(' + coordinate + 'px,0px,0px)';
		this.transition = (this.speed() / 1000) + 's';

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
			const event = this.trigger('change', { property: { name: 'position', value: position } });

			if (event.data !== undefined) {
				position = this.normalize(event.data);
			}

			this._current = position;

			this.invalidate('position');

			this.trigger('changed', { property: { name: 'position', value: this._current } });
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

		this.suppress([ 'translate', 'translated' ]);

		this.animate(this.coordinates(position));

		this.release([ 'translate', 'translated' ]);
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

		if (!this.isNumeric(position) || n < 1) {
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
			reciprocalItemsWidth = this.itemsData[--iterator].width;
			elementWidth = this.setCarouselWidth;
			while (iterator--) {
				// it could be use this._items instead of this.itemsData;
				reciprocalItemsWidth += this.itemsData[iterator].width + this.settings.margin;
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
	 * @param {Number} [position] - The relative position of the item.
	 * @return {jQuery|Array.<jQuery>} - The item at the given position or all items if no position was given.
	 */
  items(position) { }

  /**
	 * Gets an item at the specified relative position.
	 * @public
	 * @param {Number} [position] - The relative position of the item.
	 * @return {jQuery|Array.<jQuery>} - The item at the given position or all items if no position was given.
	 */
  mergers(position) { }

  /**
	 * Gets the absolute positions of clones for an item.
	 * @public
	 * @param {Number} [position] - The relative position of the item.
	 * @returns {Array.<Number>} - The absolute positions of clones for the item or all if no position was given.
	 */
  clones(position) { }

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
	 * @protected
	 * @param {Number} from - The absolute position of the start item.
	 * @param {Number} to - The absolute position of the target item.
	 * @param {Number} [factor=undefined] - The time factor in milliseconds.
	 * @returns {Number} - The time in milliseconds for the translation.
	 */
  duration(from, to, factor) { }

  	/**
	 * Slides to the specified item.
	 * @public
	 * @param {Number} position - The position of the item.
	 * @param {Number} [speed] - The time in milliseconds for the transition.
	 */
  to(position, speed) { }

  /**
	 * Slides to the next item.
	 * @public
	 * @param {Number} [speed] - The time in milliseconds for the transition.
	 */
  next(speed) { }

  /**
	 * Slides to the previous item.
	 * @public
	 * @param {Number} [speed] - The time in milliseconds for the transition.
	 */
  prev(speed) { }

  /**
	 * Handles the end of an animation.
	 * @protected
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
		this.trigger('translated');
	}

  /**
	 * Gets viewport width.
	 * @protected
	 * @return - The width in pixel.
	 */
  viewport(): number {
		let width;
		if (this._width) {
			width = this._width;
		} else {
			console.warn('Can not detect viewport width.');
		}
		return width;
	}

  /**
	 * Replaces the current content.
	 * @public
	 * @param content - The new content.
	 */
  setItems(content: CarouselSlideDirective[]) {
		this._items = content;
		// there must be set active to true for current slides
		this.itemsData = this._items.map(slide => {
			return {
				id: `${slide.id}`,
				active: false,
				tplRef: slide.tplRef,
				dataMerge: slide.dataMerge
			}
		});

		// content.filter(function() {
		// 	return this.nodeType === 1;
		// }).each($.proxy(function(index, item) {
		// 	item = this.prepare(item);
		// 	this.$stage.append(item);
		// 	this._items.push(item);
		// 	this._mergers.push(item.find('[data-merge]').addBack('[data-merge]').attr('data-merge') * 1 || 1);
		// }, this));
		content.forEach(item => this._mergers.push(item.dataMerge || 1));

		this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0);

		this.invalidate('items');
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
	 * @protected
	 */
	preloadAutoWidthImages(images) { }

  /**
	 * Destroys the carousel.
	 * @public
	 */
  destroy() { }

  /**
	 * Operators to calculate right-to-left and left-to-right.
	 * @protected
	 * @param [a] - The left side operand.
	 * @param [o] - The operator.
	 * @param [b] - The right side operand.
	 * @returns true/false meaning right-to-left or left-to-right
	 */
  protected op(a: number, o: string, b: number): boolean {
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
	 * @protected
	 * @param {HTMLElement} element - The event source.
	 * @param {String} event - The event name.
	 * @param {Function} listener - The event handler to attach.
	 * @param {Boolean} capture - Wether the event should be handled at the capturing phase or not.
	 */
  on(element, event, listener, capture) { }

  /**
	 * Detaches from an internal event.
	 * @protected
	 * @param {HTMLElement} element - The event source.
	 * @param {String} event - The event name.
	 * @param {Function} listener - The attached event handler to detach.
	 * @param {Boolean} capture - Wether the attached event handler was registered as a capturing listener or not.
	 */
  off(element, event, listener, capture) { }

  /**
	 * Triggers a public event.
	 * @todo Remove `status`, `relatedTarget` should be used instead.
	 * @protected
	 * @param name - The event name.
	 * @param [data=null] - The event data.
	 * @param [namespace=carousel] - The event namespace.
	 * @param [state] - The state which is associated with the event.
	 * @param [enter=false] - Indicates if the call enters the specified state or not.
	 * @returns return {Event} - The event arguments.
	 */
  trigger(name: string, data?: any, namespace?: string, state?: string, enter?: boolean): any {
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
	 * @protected
	 * @param events - The events to suppress.
	 */
  suppress(events: string[]) {
		events.forEach(event => {
			this._supress[event] = true;
		});
	}

  /**
	 * Releases suppressed events.
	 * @protected
	 * @param events - The events to release.
	 */
  release(events: string[]) {
		events.forEach(event => {
			delete this._supress[event];
		});
	 }

  /**
	 * Gets unified pointer coordinates from event.
	 * @todo #261
	 * @protected
	 * @param {Event} - The `mousedown` or `touchstart` event.
	 * @returns {Object} - Contains `x` and `y` coordinates of current pointer position.
	 */
  pointer(event) { }

  	/**
	 * Determines if the input is a Number or something that can be coerced to a Number
	 * @protected
	 * @param - {Number|String|Object|Array|Boolean|RegExp|Function|Symbol} - The input to be tested
	 * @returns - An indication if the input is a Number or can be coerced to a Number
	 */
  isNumeric(number: any): boolean {
		return !isNaN(parseFloat(number));
	}

  	/**
	 * Gets the difference of two vectors.
	 * @todo #261
	 * @protected
	 * @param {Object} - The first vector.
	 * @param {Object} - The second vector.
	 * @returns {Object} - The difference.
	 */
  difference(first, second) { }

}
