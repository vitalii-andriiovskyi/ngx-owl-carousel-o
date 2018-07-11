import { Injectable } from '@angular/core';

import { CustomEventsService } from '../services/custom-events.service';
import { CarouselSlideDirective } from '../carousel/carousel.module';

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
  settings: any = null;

	defaults = [];

	// properties, which must be changed in views;
	transform: string;
	transition: string;
	_width: number;

	/**
	 * All real items.
	 */
	protected _items: any[] = []; // use this.slides

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

  constructor(private customEventsCreator: CustomEventsService) { }

  /**
	 * Setups the current settings.
	 * @todo Remove responsive classes. Why should adaptive designs be brought into IE8?
	 * @todo Support for media queries by using `matchMedia` would be nice.
	 * @public
	 */
  setup() { }

  /**
	 * Updates option logic if necessery.
	 * @protected
	 */
  optionsLogic() { }

  /**
	 * Prepares an item before add.
	 * @todo Rename event parameter `content` to `item`.
	 * @protected
	 * @returns {jQuery|HTMLElement} - The item container.
	 */
  prepare(item) { }

  /**
   * Updates the view.
   * @param workers - list of functions: workers
   */
  update(workers: any[]) {
    let i = 0;
    const n = workers.length,
      filter = item => this._invalidated[item],
      cache = {};

    while (i < n) {
      const filteredPipe = workers[i].filter.filter(filter);
      if (this._invalidated.all || filteredPipe.length > 0) {
        workers[i].run(cache);
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
  refresh() { }

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
	 * @param {Number} position - The absolute position to convert.
	 * @returns {Number} - The converted position.
	 */
  relative(position) { }

  /**
	 * Gets the maximum position for the current item.
	 * @public
	 * @param {Boolean} [relative=false] - Whether to return an absolute position or a relative position.
	 * @returns {Number}
	 */
  maximum(relative) { }

  /**
	 * Gets the minimum position for the current item.
	 * @public
	 * @param {Boolean} [relative=false] - Whether to return an absolute position or a relative position.
	 * @returns {Number}
	 */
  minimum(relative) { }

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
	 * @return {Number} - The width in pixel.
	 */
  viewport() { }

  /**
	 * Replaces the current content.
	 * @public
	 * @param content - The new content.
	 */
  setItems(content: CarouselSlideDirective[]) {
		this._items = content;

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
	 * @param {Number} [a] - The left side operand.
	 * @param {String} [o] - The operator.
	 * @param {Number} [b] - The right side operand.
	 */
  op(a, o, b) { }

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
