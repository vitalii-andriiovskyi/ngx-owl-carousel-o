import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { OwlCarouselOConfig, OwlOptionsMockedTypes } from '../carousel/owl-carousel-o-config';
import { OwlLogger } from './logger.service';
/**
 * Current state information and their tags.
 */
export class States {
}
/**
 * Enumeration for types.
 * @enum {String}
 */
export var Type;
(function (Type) {
    Type["Event"] = "event";
    Type["State"] = "state";
})(Type || (Type = {}));
;
/**
 * Enumeration for width.
 * @enum {String}
 */
export var Width;
(function (Width) {
    Width["Default"] = "default";
    Width["Inner"] = "inner";
    Width["Outer"] = "outer";
})(Width || (Width = {}));
;
/**
 * Model for coords of .owl-stage
 */
export class Coords {
}
/**
 * Model for all current data of carousel
 */
export class CarouselCurrentData {
}
export class CarouselService {
    constructor(logger) {
        this.logger = logger;
        /**
       * Subject for passing data needed for managing View
       */
        this._viewSettingsShipper$ = new Subject();
        /**
       * Subject for notification when the carousel got initializes
       */
        this._initializedCarousel$ = new Subject();
        /**
       * Subject for notification when the carousel's settings start changinf
       */
        this._changeSettingsCarousel$ = new Subject();
        /**
       * Subject for notification when the carousel's settings have changed
       */
        this._changedSettingsCarousel$ = new Subject();
        /**
       * Subject for notification when the carousel starts translating or moving
       */
        this._translateCarousel$ = new Subject();
        /**
       * Subject for notification when the carousel stopped translating or moving
       */
        this._translatedCarousel$ = new Subject();
        /**
       * Subject for notification when the carousel's rebuilding caused by 'resize' event starts
       */
        this._resizeCarousel$ = new Subject();
        /**
       * Subject for notification  when the carousel's rebuilding caused by 'resize' event is ended
       */
        this._resizedCarousel$ = new Subject();
        /**
       * Subject for notification when the refresh of carousel starts
       */
        this._refreshCarousel$ = new Subject();
        /**
       * Subject for notification when the refresh of carousel is ended
       */
        this._refreshedCarousel$ = new Subject();
        /**
       * Subject for notification when the dragging of carousel starts
       */
        this._dragCarousel$ = new Subject();
        /**
       * Subject for notification when the dragging of carousel is ended
       */
        this._draggedCarousel$ = new Subject();
        /**
         * Current settings for the carousel.
         */
        this.settings = {
            items: 0
        };
        /**
       * Initial data for setting classes to element .owl-carousel
       */
        this.owlDOMData = {
            rtl: false,
            isResponsive: false,
            isRefreshed: false,
            isLoaded: false,
            isLoading: false,
            isMouseDragable: false,
            isGrab: false,
            isTouchDragable: false
        };
        /**
       * Initial data of .owl-stage
       */
        this.stageData = {
            transform: 'translate3d(0px,0px,0px)',
            transition: '0s',
            width: 0,
            paddingL: 0,
            paddingR: 0
        };
        /**
         * All real items.
         */
        this._items = []; // is equal to this.slides
        /**
       * Array with width of every slide.
       */
        this._widths = [];
        /**
       * Currently suppressed events to prevent them from beeing retriggered.
       */
        this._supress = {};
        /**
         * References to the running plugins of this carousel.
         */
        this._plugins = {};
        /**
       * Absolute current position.
       */
        this._current = null;
        /**
       * All cloned items.
       */
        this._clones = [];
        /**
         * Merge values of all items.
         * @todo Maybe this could be part of a plugin.
         */
        this._mergers = [];
        /**
       * Animation speed in milliseconds.
       */
        this._speed = null;
        /**
       * Coordinates of all items in pixel.
       * @todo The name of this member is missleading.
       */
        this._coordinates = [];
        /**
       * Current breakpoint.
       * @todo Real media queries would be nice.
       */
        this._breakpoint = null;
        /**
         * Prefix for id of cloned slides
         */
        this.clonedIdPrefix = 'cloned-';
        /**
         * Current options set by the caller including defaults.
         */
        this._options = {};
        /**
         * Invalidated parts within the update process.
         */
        this._invalidated = {};
        /**
         * Current state information and their tags.
         */
        this._states = {
            current: {},
            tags: {
                initializing: ['busy'],
                animating: ['busy'],
                dragging: ['interacting']
            }
        };
        /**
         * Ordered list of workers for the update process.
       */
        this._pipe = [
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
                filter: ['width', 'items', 'settings'],
                run: (cache) => {
                    const margin = this.settings.margin || '', grid = !this.settings.autoWidth, rtl = this.settings.rtl, css = {
                        'margin-left': rtl ? margin : '',
                        'margin-right': rtl ? '' : margin
                    };
                    if (!grid) {
                        this.slidesData.forEach(slide => {
                            slide.marginL = css['margin-left'];
                            slide.marginR = css['margin-right'];
                        });
                    }
                    cache.css = css;
                }
            },
            {
                filter: ['width', 'items', 'settings'],
                run: (cache) => {
                    const width = +(this.width() / this.settings.items).toFixed(3) - this.settings.margin, grid = !this.settings.autoWidth, widths = [];
                    let merge = null, iterator = this._items.length;
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
                filter: ['items', 'settings'],
                run: () => {
                    const clones = [], items = this._items, settings = this.settings, 
                    // TODO: Should be computed from number of min width items in stage
                    view = Math.max(settings.items * 2, 4), size = Math.ceil(items.length / 2) * 2;
                    let append = [], prepend = [], repeat = settings.loop && items.length ? settings.rewind ? view : Math.max(view, size) : 0;
                    repeat /= 2;
                    while (repeat--) {
                        // Switch to only using appended clones
                        clones.push(this.normalize(clones.length / 2, true));
                        append.push(Object.assign({}, this.slidesData[clones[clones.length - 1]]));
                        clones.push(this.normalize(items.length - 1 - (clones.length - 1) / 2, true));
                        prepend.unshift(Object.assign({}, this.slidesData[clones[clones.length - 1]]));
                    }
                    this._clones = clones;
                    append = append.map(slide => {
                        slide.id = `${this.clonedIdPrefix}${slide.id}`;
                        slide.isActive = false;
                        slide.isCloned = true;
                        return slide;
                    });
                    prepend = prepend.map(slide => {
                        slide.id = `${this.clonedIdPrefix}${slide.id}`;
                        slide.isActive = false;
                        slide.isCloned = true;
                        return slide;
                    });
                    this.slidesData = prepend.concat(this.slidesData).concat(append);
                }
            },
            {
                filter: ['width', 'items', 'settings'],
                run: () => {
                    const rtl = this.settings.rtl ? 1 : -1, size = this._clones.length + this._items.length, coordinates = [];
                    let iterator = -1, previous = 0, current = 0;
                    while (++iterator < size) {
                        previous = coordinates[iterator - 1] || 0;
                        current = this._widths[this.relative(iterator)] + this.settings.margin;
                        coordinates.push(previous + current * rtl);
                    }
                    this._coordinates = coordinates;
                }
            }, {
                filter: ['width', 'items', 'settings'],
                run: () => {
                    const padding = this.settings.stagePadding, coordinates = this._coordinates, css = {
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
                filter: ['width', 'items', 'settings'],
                run: cache => {
                    let current = cache.current ? this.slidesData.findIndex(slide => slide.id === cache.current) : 0;
                    current = Math.max(this.minimum(), Math.min(this.maximum(), current));
                    this.reset(current);
                }
            }, {
                filter: ['position'],
                run: () => {
                    this.animate(this.coordinates(this._current));
                }
            }, {
                filter: ['width', 'position', 'items', 'settings'],
                run: () => {
                    const rtl = this.settings.rtl ? 1 : -1, padding = this.settings.stagePadding * 2, matches = [];
                    let begin, end, inner, outer, i, n;
                    begin = this.coordinates(this.current());
                    if (typeof begin === 'number') {
                        begin += padding;
                    }
                    else {
                        begin = 0;
                    }
                    end = begin + this.width() * rtl;
                    if (rtl === -1 && this.settings.center) {
                        const result = this._coordinates.filter(element => {
                            return this.settings.items % 2 === 1 ? element >= begin : element > begin;
                        });
                        begin = result.length ? result[result.length - 1] : begin;
                    }
                    for (i = 0, n = this._coordinates.length; i < n; i++) {
                        inner = Math.ceil(this._coordinates[i - 1] || 0);
                        outer = Math.ceil(Math.abs(this._coordinates[i]) + padding * rtl);
                        if ((this._op(inner, '<=', begin) && (this._op(inner, '>', end)))
                            || (this._op(outer, '<', begin) && this._op(outer, '>', end))) {
                            matches.push(i);
                        }
                    }
                    this.slidesData.forEach(slide => {
                        slide.isActive = false;
                        return slide;
                    });
                    matches.forEach(item => {
                        this.slidesData[item].isActive = true;
                    });
                    if (this.settings.center) {
                        this.slidesData.forEach(slide => {
                            slide.isCentered = false;
                            return slide;
                        });
                        this.slidesData[this.current()].isCentered = true;
                    }
                }
            }
        ];
    }
    // Is needed for tests
    get invalidated() {
        return this._invalidated;
    }
    // is needed for tests
    get states() {
        return this._states;
    }
    /**
     * Makes _viewSettingsShipper$ Subject become Observable
     * @returns Observable of _viewSettingsShipper$ Subject
     */
    getViewCurSettings() {
        return this._viewSettingsShipper$.asObservable();
    }
    /**
     * Makes _initializedCarousel$ Subject become Observable
     * @returns Observable of _initializedCarousel$ Subject
     */
    getInitializedState() {
        return this._initializedCarousel$.asObservable();
    }
    /**
     * Makes _changeSettingsCarousel$ Subject become Observable
     * @returns Observable of _changeSettingsCarousel$ Subject
     */
    getChangeState() {
        return this._changeSettingsCarousel$.asObservable();
    }
    /**
     * Makes _changedSettingsCarousel$ Subject become Observable
     * @returns Observable of _changedSettingsCarousel$ Subject
     */
    getChangedState() {
        return this._changedSettingsCarousel$.asObservable();
    }
    /**
     * Makes _translateCarousel$ Subject become Observable
     * @returns Observable of _translateCarousel$ Subject
     */
    getTranslateState() {
        return this._translateCarousel$.asObservable();
    }
    /**
     * Makes _translatedCarousel$ Subject become Observable
     * @returns Observable of _translatedCarousel$ Subject
     */
    getTranslatedState() {
        return this._translatedCarousel$.asObservable();
    }
    /**
     * Makes _resizeCarousel$ Subject become Observable
     * @returns Observable of _resizeCarousel$ Subject
     */
    getResizeState() {
        return this._resizeCarousel$.asObservable();
    }
    /**
     * Makes _resizedCarousel$ Subject become Observable
     * @returns Observable of _resizedCarousel$ Subject
     */
    getResizedState() {
        return this._resizedCarousel$.asObservable();
    }
    /**
     * Makes _refreshCarousel$ Subject become Observable
     * @returns Observable of _refreshCarousel$ Subject
     */
    getRefreshState() {
        return this._refreshCarousel$.asObservable();
    }
    /**
     * Makes _refreshedCarousel$ Subject become Observable
     * @returns Observable of _refreshedCarousel$ Subject
     */
    getRefreshedState() {
        return this._refreshedCarousel$.asObservable();
    }
    /**
     * Makes _dragCarousel$ Subject become Observable
     * @returns Observable of _dragCarousel$ Subject
     */
    getDragState() {
        return this._dragCarousel$.asObservable();
    }
    /**
     * Makes _draggedCarousel$ Subject become Observable
     * @returns Observable of _draggedCarousel$ Subject
     */
    getDraggedState() {
        return this._draggedCarousel$.asObservable();
    }
    /**
     * Setups custom options expanding default options
     * @param options custom options
     */
    setOptions(options) {
        const configOptions = new OwlCarouselOConfig();
        const checkedOptions = this._validateOptions(options, configOptions);
        this._options = Object.assign(Object.assign({}, configOptions), checkedOptions);
    }
    /**
     * Checks whether user's option are set properly. Cheking is based on typings;
     * @param options options set by user
     * @param configOptions default options
     * @returns checked and modified (if it's needed) user's options
     *
     * Notes:
     * 	- if user set option with wrong type, it'll be written in console
     */
    _validateOptions(options, configOptions) {
        const checkedOptions = Object.assign({}, options);
        const mockedTypes = new OwlOptionsMockedTypes();
        const setRightOption = (type, key) => {
            this.logger.log(`options.${key} must be type of ${type}; ${key}=${options[key]} skipped to defaults: ${key}=${configOptions[key]}`);
            return configOptions[key];
        };
        for (const key in checkedOptions) {
            if (checkedOptions.hasOwnProperty(key)) {
                // condition could be shortened but it gets harder for understanding
                if (mockedTypes[key] === 'number') {
                    if (this._isNumeric(checkedOptions[key])) {
                        checkedOptions[key] = +checkedOptions[key];
                        checkedOptions[key] = key === 'items' ? this._validateItems(checkedOptions[key], checkedOptions.skip_validateItems) : checkedOptions[key];
                    }
                    else {
                        checkedOptions[key] = setRightOption(mockedTypes[key], key);
                    }
                }
                else if (mockedTypes[key] === 'boolean' && typeof checkedOptions[key] !== 'boolean') {
                    checkedOptions[key] = setRightOption(mockedTypes[key], key);
                }
                else if (mockedTypes[key] === 'number|boolean' && !this._isNumberOrBoolean(checkedOptions[key])) {
                    checkedOptions[key] = setRightOption(mockedTypes[key], key);
                }
                else if (mockedTypes[key] === 'number|string' && !this._isNumberOrString(checkedOptions[key])) {
                    checkedOptions[key] = setRightOption(mockedTypes[key], key);
                }
                else if (mockedTypes[key] === 'string|boolean' && !this._isStringOrBoolean(checkedOptions[key])) {
                    checkedOptions[key] = setRightOption(mockedTypes[key], key);
                }
                else if (mockedTypes[key] === 'string[]') {
                    if (Array.isArray(checkedOptions[key])) {
                        let isString = false;
                        checkedOptions[key].forEach(element => {
                            isString = typeof element === 'string' ? true : false;
                        });
                        if (!isString) {
                            checkedOptions[key] = setRightOption(mockedTypes[key], key);
                        }
                        ;
                    }
                    else {
                        checkedOptions[key] = setRightOption(mockedTypes[key], key);
                    }
                }
            }
        }
        return checkedOptions;
    }
    /**
     * Checks the option `items` set by user and if it bigger than number of slides, the function returns number of slides
     * @param items option items set by user
     * @param skip_validateItems option `skip_validateItems` set by user
     * @returns right number of items
     */
    _validateItems(items, skip_validateItems) {
        let result = items;
        if (items > this._items.length) {
            if (skip_validateItems) {
                this.logger.log('The option \'items\' in your options is bigger than the number of slides. The navigation got disabled');
            }
            else {
                result = this._items.length;
                this.logger.log('The option \'items\' in your options is bigger than the number of slides. This option is updated to the current number of slides and the navigation got disabled');
            }
        }
        else {
            if (items === this._items.length && (this.settings.dots || this.settings.nav)) {
                this.logger.log('Option \'items\' in your options is equal to the number of slides. So the navigation got disabled');
            }
        }
        return result;
    }
    /**
     * Set current width of carousel
     * @param width width of carousel Window
     */
    setCarouselWidth(width) {
        this._width = width;
    }
    /**
       * Setups the current settings.
       * @todo Remove responsive classes. Why should adaptive designs be brought into IE8?
       * @todo Support for media queries by using `matchMedia` would be nice.
       * @param carouselWidth width of carousel
       * @param slides array of slides
       * @param options options set by user
       */
    setup(carouselWidth, slides, options) {
        this.setCarouselWidth(carouselWidth);
        this.setItems(slides);
        this._defineSlidesData();
        this.setOptions(options);
        this.settings = Object.assign({}, this._options);
        this.setOptionsForViewport();
        this._trigger('change', { property: { name: 'settings', value: this.settings } });
        this.invalidate('settings'); // must be call of this function;
        this._trigger('changed', { property: { name: 'settings', value: this.settings } });
    }
    /**
     * Set options for current viewport
     */
    setOptionsForViewport() {
        const viewport = this._width, overwrites = this._options.responsive;
        let match = -1;
        if (!Object.keys(overwrites).length) {
            return;
        }
        if (!viewport) {
            this.settings.items = 1;
            return;
        }
        for (const key in overwrites) {
            if (overwrites.hasOwnProperty(key)) {
                if (+key <= viewport && +key > match) {
                    match = Number(key);
                }
            }
        }
        this.settings = Object.assign(Object.assign(Object.assign({}, this._options), overwrites[match]), { items: (overwrites[match] && overwrites[match].items) ? this._validateItems(overwrites[match].items, this._options.skip_validateItems) : this._options.items });
        // if (typeof this.settings.stagePadding === 'function') {
        // 	this.settings.stagePadding = this.settings.stagePadding();
        // }
        delete this.settings.responsive;
        this.owlDOMData.isResponsive = true;
        this.owlDOMData.isMouseDragable = this.settings.mouseDrag;
        this.owlDOMData.isTouchDragable = this.settings.touchDrag;
        const mergers = [];
        this._items.forEach(item => {
            const mergeN = this.settings.merge ? item.dataMerge : 1;
            mergers.push(mergeN);
        });
        this._mergers = mergers;
        this._breakpoint = match;
        this.invalidate('settings');
    }
    /**
     * Initializes the carousel.
     * @param slides array of CarouselSlideDirective
     */
    initialize(slides) {
        this.enter('initializing');
        // this.trigger('initialize');
        this.owlDOMData.rtl = this.settings.rtl;
        if (this._mergers.length) {
            this._mergers = [];
        }
        slides.forEach(item => {
            const mergeN = this.settings.merge ? item.dataMerge : 1;
            this._mergers.push(mergeN);
        });
        this._clones = [];
        this.reset(this._isNumeric(this.settings.startPosition) ? +this.settings.startPosition : 0);
        this.invalidate('items');
        this.refresh();
        this.owlDOMData.isLoaded = true;
        this.owlDOMData.isMouseDragable = this.settings.mouseDrag;
        this.owlDOMData.isTouchDragable = this.settings.touchDrag;
        this.sendChanges();
        this.leave('initializing');
        this._trigger('initialized');
    }
    ;
    /**
     * Sends all data needed for View
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
       * Updates option logic if necessery
       */
    _optionsLogic() {
        if (this.settings.autoWidth) {
            this.settings.stagePadding = 0;
            this.settings.merge = false;
        }
    }
    /**
     * Updates the view
     */
    update() {
        let i = 0;
        const n = this._pipe.length, filter = item => this._invalidated[item], cache = {};
        while (i < n) {
            const filteredPipe = this._pipe[i].filter.filter(filter);
            if (this._invalidated.all || filteredPipe.length > 0) {
                this._pipe[i].run(cache);
            }
            i++;
        }
        this.slidesData.forEach(slide => slide.classes = this.setCurSlideClasses(slide));
        this.sendChanges();
        this._invalidated = {};
        if (!this.is('valid')) {
            this.enter('valid');
        }
    }
    /**
       * Gets the width of the view.
       * @param [dimension=Width.Default] The dimension to return
       * @returns The width of the view in pixel.
       */
    width(dimension) {
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
       */
    refresh() {
        this.enter('refreshing');
        this._trigger('refresh');
        this._defineSlidesData();
        this.setOptionsForViewport();
        this._optionsLogic();
        // this.$element.addClass(this.options.refreshClass);
        this.update();
        // this.$element.removeClass(this.options.refreshClass);
        this.leave('refreshing');
        this._trigger('refreshed');
    }
    /**
       * Checks window `resize` event.
       * @param curWidth width of .owl-carousel
       */
    onResize(curWidth) {
        if (!this._items.length) {
            return false;
        }
        this.setCarouselWidth(curWidth);
        this.enter('resizing');
        // if (this.trigger('resize').isDefaultPrevented()) {
        // 	this.leave('resizing');
        // 	return false;
        // }
        this._trigger('resize');
        this.invalidate('width');
        this.refresh();
        this.leave('resizing');
        this._trigger('resized');
    }
    /**
       * Prepares data for dragging carousel. It starts after firing `touchstart` and `mousedown` events.
       * @todo Horizontal swipe threshold as option
       * @todo #261
       * @param event - The event arguments.
       * @returns stage - object with 'x' and 'y' coordinates of .owl-stage
       */
    prepareDragging(event) {
        let stage = null, transformArr;
        // could be 5 commented lines below; However there's stage transform in stageData and in updates after each move of stage
        // stage = getComputedStyle(this.el.nativeElement).transform.replace(/.*\(|\)| /g, '').split(',');
        // stage = {
        //   x: stage[stage.length === 16 ? 12 : 4],
        //   y: stage[stage.length === 16 ? 13 : 5]
        // };
        transformArr = this.stageData.transform.replace(/.*\(|\)| |[^,-\d]\w|\)/g, '').split(',');
        stage = {
            x: +transformArr[0],
            y: +transformArr[1]
        };
        if (this.is('animating')) {
            this.invalidate('position');
        }
        if (event.type === 'mousedown') {
            this.owlDOMData.isGrab = true;
        }
        this.speed(0);
        return stage;
    }
    /**
     * Enters into a 'dragging' state
     */
    enterDragging() {
        this.enter('dragging');
        this._trigger('drag');
    }
    /**
       * Defines new coords for .owl-stage while dragging it
       * @todo #261
       * @param event the event arguments.
       * @param dragData initial data got after starting dragging
       * @returns coords or false
       */
    defineNewCoordsDrag(event, dragData) {
        let minimum = null, maximum = null, pull = null;
        const delta = this.difference(dragData.pointer, this.pointer(event)), stage = this.difference(dragData.stage.start, delta);
        if (!this.is('dragging')) {
            return false;
        }
        if (this.settings.loop) {
            minimum = this.coordinates(this.minimum());
            maximum = +this.coordinates(this.maximum() + 1) - minimum;
            stage.x = (((stage.x - minimum) % maximum + maximum) % maximum) + minimum;
        }
        else {
            minimum = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum());
            maximum = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum());
            pull = this.settings.pullDrag ? -1 * delta.x / 5 : 0;
            stage.x = Math.max(Math.min(stage.x, minimum + pull), maximum + pull);
        }
        return stage;
    }
    /**
       * Finishes dragging of carousel when `touchend` and `mouseup` events fire.
       * @todo #261
       * @todo Threshold for click event
       * @param event the event arguments.
       * @param dragObj the object with dragging settings and states
       * @param clickAttacher function which attaches click handler to slide or its children elements in order to prevent event bubling
       */
    finishDragging(event, dragObj, clickAttacher) {
        const directions = ['right', 'left'], delta = this.difference(dragObj.pointer, this.pointer(event)), stage = dragObj.stage.current, direction = directions[+(this.settings.rtl ? delta.x < +this.settings.rtl : delta.x > +this.settings.rtl)];
        let currentSlideI, current, newCurrent;
        if (delta.x !== 0 && this.is('dragging') || !this.is('valid')) {
            this.speed(+this.settings.dragEndSpeed || this.settings.smartSpeed);
            currentSlideI = this.closest(stage.x, delta.x !== 0 ? direction : dragObj.direction);
            current = this.current();
            newCurrent = this.current(currentSlideI === -1 ? undefined : currentSlideI);
            if (current !== newCurrent) {
                this.invalidate('position');
                this.update();
            }
            dragObj.direction = direction;
            if (Math.abs(delta.x) > 3 || new Date().getTime() - dragObj.time > 300) {
                clickAttacher();
            }
        }
        if (!this.is('dragging')) {
            return;
        }
        this.leave('dragging');
        this._trigger('dragged');
    }
    /**
       * Gets absolute position of the closest item for a coordinate.
       * @todo Setting `freeDrag` makes `closest` not reusable. See #165.
       * @param coordinate The coordinate in pixel.
       * @param direction The direction to check for the closest item. Ether `left` or `right`.
       * @returns The absolute position of the closest item.
       */
    closest(coordinate, direction) {
        const pull = 30, width = this.width();
        let coordinates = this.coordinates(), position = -1;
        if (this.settings.center) {
            coordinates = coordinates.map(item => {
                if (item === 0) {
                    item += 0.000001;
                }
                return item;
            });
        }
        // option 'freeDrag' doesn't have realization and using it here creates problem:
        // variable 'position' stays unchanged (it equals -1 at the begging) and thus method returns -1
        // Returning value is consumed by method current(), which taking -1 as argument calculates the index of new current slide
        // In case of having 5 slides ans 'loop=false; calling 'current(-1)' sets props '_current' as 4. Just last slide remains visible instead of 3 last slides.
        // if (!this.settings.freeDrag) {
        // check closest item
        for (let i = 0; i < coordinates.length; i++) {
            if (direction === 'left' && coordinate > coordinates[i] - pull && coordinate < coordinates[i] + pull) {
                position = i;
                // on a right pull, check on previous index
                // to do so, subtract width from value and set position = index + 1
            }
            else if (direction === 'right' && coordinate > coordinates[i] - width - pull && coordinate < coordinates[i] - width + pull) {
                position = i + 1;
            }
            else if (this._op(coordinate, '<', coordinates[i])
                && this._op(coordinate, '>', coordinates[i + 1] || coordinates[i] - width)) {
                position = direction === 'left' ? i + 1 : i;
            }
            else if (direction === null && coordinate > coordinates[i] - pull && coordinate < coordinates[i] + pull) {
                position = i;
            }
            if (position !== -1) {
                break;
            }
            ;
        }
        // }
        if (!this.settings.loop) {
            // non loop boundries
            if (this._op(coordinate, '>', coordinates[this.minimum()])) {
                position = coordinate = this.minimum();
            }
            else if (this._op(coordinate, '<', coordinates[this.maximum()])) {
                position = coordinate = this.maximum();
            }
        }
        return position;
    }
    /**
       * Animates the stage.
       * @todo #270
       * @param coordinate The coordinate in pixels.
       */
    animate(coordinate) {
        const animate = this.speed() > 0;
        if (this.is('animating')) {
            this.onTransitionEnd();
        }
        if (animate) {
            this.enter('animating');
            this._trigger('translate');
        }
        this.stageData.transform = 'translate3d(' + coordinate + 'px,0px,0px)';
        this.stageData.transition = (this.speed() / 1000) + 's' + (this.settings.slideTransition ? ' ' + this.settings.slideTransition : '');
        // also there was transition by means of JQuery.animate or css-changing property left
    }
    /**
       * Checks whether the carousel is in a specific state or not.
       * @param state The state to check.
       * @returns The flag which indicates if the carousel is busy.
       */
    is(state) {
        return this._states.current[state] && this._states.current[state] > 0;
    }
    ;
    /**
       * Sets the absolute position of the current item.
       * @param position The new absolute position or nothing to leave it unchanged.
       * @returns The absolute position of the current item.
       */
    current(position) {
        if (position === undefined) {
            return this._current;
        }
        if (this._items.length === 0) {
            return undefined;
        }
        position = this.normalize(position);
        if (this._current !== position) {
            const event = this._trigger('change', { property: { name: 'position', value: position } });
            // if (event.data !== undefined) {
            // 	position = this.normalize(event.data);
            // }
            this._current = position;
            this.invalidate('position');
            this._trigger('changed', { property: { name: 'position', value: this._current } });
        }
        return this._current;
    }
    /**
       * Invalidates the given part of the update routine.
       * @param part The part to invalidate.
       * @returns The invalidated parts.
       */
    invalidate(part) {
        if (typeof part === 'string') {
            this._invalidated[part] = true;
            if (this.is('valid')) {
                this.leave('valid');
            }
        }
        return Object.keys(this._invalidated);
    }
    ;
    /**
     * Resets the absolute position of the current item.
     * @param position the absolute position of the new item.
     */
    reset(position) {
        position = this.normalize(position);
        if (position === undefined) {
            return;
        }
        this._speed = 0;
        this._current = position;
        this._suppress(['translate', 'translated']);
        this.animate(this.coordinates(position));
        this._release(['translate', 'translated']);
    }
    /**
       * Normalizes an absolute or a relative position of an item.
       * @param position The absolute or relative position to normalize.
       * @param relative Whether the given position is relative or not.
       * @returns The normalized position.
       */
    normalize(position, relative) {
        const n = this._items.length, m = relative ? 0 : this._clones.length;
        if (!this._isNumeric(position) || n < 1) {
            position = undefined;
        }
        else if (position < 0 || position >= n + m) {
            position = ((position - m / 2) % n + n) % n + m / 2;
        }
        return position;
    }
    /**
       * Converts an absolute position of an item into a relative one.
       * @param position The absolute position to convert.
       * @returns The converted position.
       */
    relative(position) {
        position -= this._clones.length / 2;
        return this.normalize(position, true);
    }
    /**
       * Gets the maximum position for the current item.
       * @param relative Whether to return an absolute position or a relative position.
       * @returns number of maximum position
       */
    maximum(relative = false) {
        const settings = this.settings;
        let maximum = this._coordinates.length, iterator, reciprocalItemsWidth, elementWidth;
        if (settings.loop) {
            maximum = this._clones.length / 2 + this._items.length - 1;
        }
        else if (settings.autoWidth || settings.merge) {
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
        }
        else if (settings.center) {
            maximum = this._items.length - 1;
        }
        else {
            maximum = this._items.length - settings.items;
        }
        if (relative) {
            maximum -= this._clones.length / 2;
        }
        return Math.max(maximum, 0);
    }
    /**
       * Gets the minimum position for the current item.
       * @param relative Whether to return an absolute position or a relative position.
       * @returns number of minimum position
       */
    minimum(relative = false) {
        return relative ? 0 : this._clones.length / 2;
    }
    /**
       * Gets an item at the specified relative position.
       * @param position The relative position of the item.
       * @returns The item at the given position or all items if no position was given.
       */
    items(position) {
        if (position === undefined) {
            return this._items.slice();
        }
        position = this.normalize(position, true);
        return [this._items[position]];
    }
    /**
       * Gets an item at the specified relative position.
       * @param position The relative position of the item.
       * @returns The item at the given position or all items if no position was given.
       */
    mergers(position) {
        if (position === undefined) {
            return this._mergers.slice();
        }
        position = this.normalize(position, true);
        return this._mergers[position];
    }
    /**
       * Gets the absolute positions of clones for an item.
       * @param position The relative position of the item.
       * @returns The absolute positions of clones for the item or all if no position was given.
       */
    clones(position) {
        const odd = this._clones.length / 2, even = odd + this._items.length, map = index => index % 2 === 0 ? even + index / 2 : odd - (index + 1) / 2;
        if (position === undefined) {
            return this._clones.map((v, i) => map(i));
        }
        return this._clones.map((v, i) => v === position ? map(i) : null).filter(item => item);
    }
    /**
       * Sets the current animation speed.
       * @param speed The animation speed in milliseconds or nothing to leave it unchanged.
       * @returns The current animation speed in milliseconds.
       */
    speed(speed) {
        if (speed !== undefined) {
            this._speed = speed;
        }
        return this._speed;
    }
    /**
       * Gets the coordinate of an item.
       * @todo The name of this method is missleanding.
       * @param position The absolute position of the item within `minimum()` and `maximum()`.
       * @returns The coordinate of the item in pixel or all coordinates.
       */
    coordinates(position) {
        let multiplier = 1, newPosition = position - 1, coordinate, result;
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
        }
        else {
            coordinate = this._coordinates[newPosition] || 0;
        }
        coordinate = Math.ceil(coordinate);
        return coordinate;
    }
    /**
       * Calculates the speed for a translation.
       * @param from The absolute position of the start item.
       * @param to The absolute position of the target item.
       * @param factor [factor=undefined] - The time factor in milliseconds.
       * @returns The time in milliseconds for the translation.
       */
    _duration(from, to, factor) {
        if (factor === 0) {
            return 0;
        }
        return Math.min(Math.max(Math.abs(to - from), 1), 6) * Math.abs((+factor || this.settings.smartSpeed));
    }
    /**
       * Slides to the specified item.
       * @param position The position of the item.
       * @param speed The time in milliseconds for the transition.
       */
    to(position, speed) {
        let current = this.current(), revert = null, distance = position - this.relative(current), maximum = this.maximum(), delayForLoop = 0;
        const direction = +(distance > 0) - +(distance < 0), items = this._items.length, minimum = this.minimum();
        if (this.settings.loop) {
            if (!this.settings.rewind && Math.abs(distance) > items / 2) {
                distance += direction * -1 * items;
            }
            position = current + distance;
            revert = ((position - minimum) % items + items) % items + minimum;
            if (revert !== position && revert - distance <= maximum && revert - distance > 0) {
                current = revert - distance;
                position = revert;
                delayForLoop = 30;
                this.reset(current);
                this.sendChanges();
            }
        }
        else if (this.settings.rewind) {
            maximum += 1;
            position = (position % maximum + maximum) % maximum;
        }
        else {
            position = Math.max(minimum, Math.min(maximum, position));
        }
        setTimeout(() => {
            this.speed(this._duration(current, position, speed));
            this.current(position);
            this.update();
        }, delayForLoop);
    }
    /**
       * Slides to the next item.
       * @param speed The time in milliseconds for the transition.
       */
    next(speed) {
        speed = speed || false;
        this.to(this.relative(this.current()) + 1, speed);
    }
    /**
       * Slides to the previous item.
       * @param speed The time in milliseconds for the transition.
       */
    prev(speed) {
        speed = speed || false;
        this.to(this.relative(this.current()) - 1, speed);
    }
    /**
       * Handles the end of an animation.
       * @param event - The event arguments.
       */
    onTransitionEnd(event) {
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
        this._trigger('translated');
    }
    /**
       * Gets viewport width.
       * @returns - The width in pixel.
       */
    _viewport() {
        let width;
        if (this._width) {
            width = this._width;
        }
        else {
            this.logger.log('Can not detect viewport width.');
        }
        return width;
    }
    /**
       * Sets _items
       * @param content The list of slides put into CarouselSlideDirectives.
       */
    setItems(content) {
        this._items = content;
    }
    /**
     * Sets slidesData using this._items
     */
    _defineSlidesData() {
        // Maybe creating and using loadMap would be better in LazyLoadService.
        // Hovewer in that case when 'resize' event fires, prop 'load' of all slides will get 'false' and such state of prop will be seen by View during its updating. Accordingly the code will remove slides's content from DOM even if it was loaded before.
        // Thus it would be needed to add that content into DOM again.
        // In order to avoid additional removing/adding loaded slides's content we use loadMap here and set restore state of prop 'load' before the View will get it.
        let loadMap;
        if (this.slidesData && this.slidesData.length) {
            loadMap = new Map();
            this.slidesData.forEach(item => {
                if (item.load) {
                    loadMap.set(item.id, item.load);
                }
            });
        }
        this.slidesData = this._items.map(slide => {
            return {
                id: `${slide.id}`,
                isActive: false,
                tplRef: slide.tplRef,
                dataMerge: slide.dataMerge,
                width: 0,
                isCloned: false,
                load: loadMap ? loadMap.get(slide.id) : false,
                hashFragment: slide.dataHash
            };
        });
    }
    /**
     * Sets current classes for slide
     * @param slide Slide of carousel
     * @returns object with names of css-classes which are keys and true/false values
     */
    setCurSlideClasses(slide) {
        // CSS classes: added/removed per current state of component properties
        const currentClasses = {
            'active': slide.isActive,
            'center': slide.isCentered,
            'cloned': slide.isCloned,
            'animated': slide.isAnimated,
            'owl-animated-in': slide.isDefAnimatedIn,
            'owl-animated-out': slide.isDefAnimatedOut
        };
        if (this.settings.animateIn) {
            currentClasses[this.settings.animateIn] = slide.isCustomAnimatedIn;
        }
        if (this.settings.animateOut) {
            currentClasses[this.settings.animateOut] = slide.isCustomAnimatedOut;
        }
        return currentClasses;
    }
    /**
       * Operators to calculate right-to-left and left-to-right.
       * @param a - The left side operand.
       * @param o - The operator.
       * @param b - The right side operand.
       * @returns true/false meaning right-to-left or left-to-right
       */
    _op(a, o, b) {
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
       * Triggers a public event.
       * @todo Remove `status`, `relatedTarget` should be used instead.
       * @param name The event name.
       * @param data The event data.
       * @param namespace The event namespace.
       * @param state The state which is associated with the event.
       * @param enter Indicates if the call enters the specified state or not.
       */
    _trigger(name, data, namespace, state, enter) {
        switch (name) {
            case 'initialized':
                this._initializedCarousel$.next(name);
                break;
            case 'change':
                this._changeSettingsCarousel$.next(data);
                break;
            case 'changed':
                this._changedSettingsCarousel$.next(data);
                break;
            case 'drag':
                this._dragCarousel$.next(name);
                break;
            case 'dragged':
                this._draggedCarousel$.next(name);
                break;
            case 'resize':
                this._resizeCarousel$.next(name);
                break;
            case 'resized':
                this._resizedCarousel$.next(name);
                break;
            case 'refresh':
                this._refreshCarousel$.next(name);
                break;
            case 'refreshed':
                this._refreshedCarousel$.next(name);
                break;
            case 'translate':
                this._translateCarousel$.next(name);
                break;
            case 'translated':
                this._translatedCarousel$.next(name);
                break;
            default:
                break;
        }
    }
    /**
     * Enters a state.
     * @param name - The state name.
     */
    enter(name) {
        [name].concat(this._states.tags[name] || []).forEach((stateName) => {
            if (this._states.current[stateName] === undefined) {
                this._states.current[stateName] = 0;
            }
            this._states.current[stateName]++;
        });
    }
    ;
    /**
       * Leaves a state.
       * @param name - The state name.
       */
    leave(name) {
        [name].concat(this._states.tags[name] || []).forEach((stateName) => {
            if (this._states.current[stateName] === 0 || !!this._states.current[stateName]) {
                this._states.current[stateName]--;
            }
        });
    }
    ;
    /**
       * Registers an event or state.
       * @param object - The event or state to register.
       */
    register(object) {
        if (object.type === Type.State) {
            if (!this._states.tags[object.name]) {
                this._states.tags[object.name] = object.tags;
            }
            else {
                this._states.tags[object.name] = this._states.tags[object.name].concat(object.tags);
            }
            this._states.tags[object.name] = this._states.tags[object.name].filter((tag, i) => {
                return this._states.tags[object.name].indexOf(tag) === i;
            });
        }
    }
    /**
       * Suppresses events.
       * @param events The events to suppress.
       */
    _suppress(events) {
        events.forEach(event => {
            this._supress[event] = true;
        });
    }
    /**
       * Releases suppressed events.
       * @param events The events to release.
       */
    _release(events) {
        events.forEach(event => {
            delete this._supress[event];
        });
    }
    /**
       * Gets unified pointer coordinates from event.
       * @todo #261
       * @param event The `mousedown` or `touchstart` event.
       * @returns Object Coords which contains `x` and `y` coordinates of current pointer position.
       */
    pointer(event) {
        const result = { x: null, y: null };
        event = event.originalEvent || event || window.event;
        event = event.touches && event.touches.length ?
            event.touches[0] : event.changedTouches && event.changedTouches.length ?
            event.changedTouches[0] : event;
        if (event.pageX) {
            result.x = event.pageX;
            result.y = event.pageY;
        }
        else {
            result.x = event.clientX;
            result.y = event.clientY;
        }
        return result;
    }
    /**
       * Determines if the input is a Number or something that can be coerced to a Number
       * @param number The input to be tested
       * @returns An indication if the input is a Number or can be coerced to a Number
       */
    _isNumeric(number) {
        return !isNaN(parseFloat(number));
    }
    /**
     * Determines whether value is number or boolean type
     * @param value The input to be tested
     * @returns An indication if the input is a Number or can be coerced to a Number, or Boolean
     */
    _isNumberOrBoolean(value) {
        return this._isNumeric(value) || typeof value === 'boolean';
    }
    /**
     * Determines whether value is number or string type
     * @param value The input to be tested
     * @returns An indication if the input is a Number or can be coerced to a Number, or String
     */
    _isNumberOrString(value) {
        return this._isNumeric(value) || typeof value === 'string';
    }
    /**
     * Determines whether value is number or string type
     * @param value The input to be tested
     * @returns An indication if the input is a Number or can be coerced to a Number, or String
     */
    _isStringOrBoolean(value) {
        return typeof value === 'string' || typeof value === 'boolean';
    }
    /**
       * Gets the difference of two vectors.
       * @todo #261
       * @param first The first vector.
       * @param second The second vector.
       * @returns The difference.
       */
    difference(first, second) {
        if (null === first || null === second) {
            return {
                x: 0,
                y: 0,
            };
        }
        return {
            x: first.x - second.x,
            y: first.y - second.y
        };
    }
}
CarouselService.decorators = [
    { type: Injectable }
];
CarouselService.ctorParameters = () => [
    { type: OwlLogger }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi9saWJzL25neC1vd2wtY2Fyb3VzZWwtby9zcmMvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvY2Fyb3VzZWwuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFLQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSTNDLE9BQU8sRUFBRSxPQUFPLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLHFCQUFxQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFJOUYsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRTdDOztHQUVHO0FBQ0gsTUFBTSxPQUFPLE1BQU07Q0FLbEI7QUFFRDs7O0dBR0c7QUFDSCxNQUFNLENBQU4sSUFBWSxJQUdYO0FBSEQsV0FBWSxJQUFJO0lBQ2YsdUJBQWUsQ0FBQTtJQUNmLHVCQUFlLENBQUE7QUFDaEIsQ0FBQyxFQUhXLElBQUksS0FBSixJQUFJLFFBR2Y7QUFBQSxDQUFDO0FBRUY7OztHQUdHO0FBQ0gsTUFBTSxDQUFOLElBQVksS0FJWDtBQUpELFdBQVksS0FBSztJQUNoQiw0QkFBbUIsQ0FBQTtJQUNuQix3QkFBZSxDQUFBO0lBQ2Ysd0JBQWUsQ0FBQTtBQUNoQixDQUFDLEVBSlcsS0FBSyxLQUFMLEtBQUssUUFJaEI7QUFBQSxDQUFDO0FBRUY7O0dBRUc7QUFDSCxNQUFNLE9BQU8sTUFBTTtDQUdsQjtBQUVEOztHQUVHO0FBQ0gsTUFBTSxPQUFPLG1CQUFtQjtDQU0vQjtBQUdELE1BQU0sT0FBTyxlQUFlO0lBMmEzQixZQUFvQixNQUFpQjtRQUFqQixXQUFNLEdBQU4sTUFBTSxDQUFXO1FBMWFyQzs7U0FFSTtRQUNJLDBCQUFxQixHQUFHLElBQUksT0FBTyxFQUF1QixDQUFDO1FBQ25FOztTQUVJO1FBQ0ksMEJBQXFCLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FB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QUFHLE1BQU0sQ0FBQyxDQUFDO1NBQ3JCLENBQUM7SUFDSCxDQUFDOzs7WUE5b0RELFVBQVU7OztZQWxERixTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBTdGFnZURhdGEgfSBmcm9tICcuLi9tb2RlbHMvc3RhZ2UtZGF0YS5tb2RlbCc7XG5cbmltcG9ydCB7IE93bERPTURhdGEgfSBmcm9tICcuLi9tb2RlbHMvb3dsRE9NLWRhdGEubW9kZWwnO1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENhcm91c2VsU2xpZGVEaXJlY3RpdmUgfSBmcm9tICcuLi9jYXJvdXNlbC9jYXJvdXNlbC5tb2R1bGUnO1xuaW1wb3J0IHsgU2xpZGVNb2RlbCB9IGZyb20gJy4uL21vZGVscy9zbGlkZS5tb2RlbCc7XG5pbXBvcnQgeyBTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBPd2xDYXJvdXNlbE9Db25maWcsIE93bE9wdGlvbnNNb2NrZWRUeXBlcyB9IGZyb20gJy4uL2Nhcm91c2VsL293bC1jYXJvdXNlbC1vLWNvbmZpZyc7XG5pbXBvcnQgeyBPd2xPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWxzL293bC1vcHRpb25zLm1vZGVsJztcblxuaW1wb3J0IHsgTmF2RGF0YSwgRG90c0RhdGEgfSBmcm9tICcuLi9tb2RlbHMvbmF2aWdhdGlvbi1kYXRhLm1vZGVscyc7XG5pbXBvcnQgeyBPd2xMb2dnZXIgfSBmcm9tICcuL2xvZ2dlci5zZXJ2aWNlJztcblxuLyoqXG4gKiBDdXJyZW50IHN0YXRlIGluZm9ybWF0aW9uIGFuZCB0aGVpciB0YWdzLlxuICovXG5leHBvcnQgY2xhc3MgU3RhdGVzIHtcbiAgY3VycmVudDoge307XG4gIHRhZ3M6IHtcbiAgICBba2V5OiBzdHJpbmddOiBzdHJpbmdbXTtcbiAgfTtcbn1cblxuLyoqXG4gKiBFbnVtZXJhdGlvbiBmb3IgdHlwZXMuXG4gKiBAZW51bSB7U3RyaW5nfVxuICovXG5leHBvcnQgZW51bSBUeXBlIHtcblx0RXZlbnQgPSAnZXZlbnQnLFxuXHRTdGF0ZSA9ICdzdGF0ZSdcbn07XG5cbi8qKlxuICogRW51bWVyYXRpb24gZm9yIHdpZHRoLlxuICogQGVudW0ge1N0cmluZ31cbiAqL1xuZXhwb3J0IGVudW0gV2lkdGgge1xuXHREZWZhdWx0ID0gJ2RlZmF1bHQnLFxuXHRJbm5lciA9ICdpbm5lcicsXG5cdE91dGVyID0gJ291dGVyJ1xufTtcblxuLyoqXG4gKiBNb2RlbCBmb3IgY29vcmRzIG9mIC5vd2wtc3RhZ2VcbiAqL1xuZXhwb3J0IGNsYXNzIENvb3JkcyB7XG5cdHg6IG51bWJlcjtcblx0eTogbnVtYmVyO1xufVxuXG4vKipcbiAqIE1vZGVsIGZvciBhbGwgY3VycmVudCBkYXRhIG9mIGNhcm91c2VsXG4gKi9cbmV4cG9ydCBjbGFzcyBDYXJvdXNlbEN1cnJlbnREYXRhIHtcblx0b3dsRE9NRGF0YTogT3dsRE9NRGF0YTtcblx0c3RhZ2VEYXRhOiBTdGFnZURhdGE7XG5cdHNsaWRlc0RhdGE6IFNsaWRlTW9kZWxbXTtcblx0bmF2RGF0YTogTmF2RGF0YTtcblx0ZG90c0RhdGE6IERvdHNEYXRhO1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2Fyb3VzZWxTZXJ2aWNlIHtcblx0LyoqXG4gICAqIFN1YmplY3QgZm9yIHBhc3NpbmcgZGF0YSBuZWVkZWQgZm9yIG1hbmFnaW5nIFZpZXdcbiAgICovXG5cdHByaXZhdGUgX3ZpZXdTZXR0aW5nc1NoaXBwZXIkID0gbmV3IFN1YmplY3Q8Q2Fyb3VzZWxDdXJyZW50RGF0YT4oKTtcblx0LyoqXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSBjYXJvdXNlbCBnb3QgaW5pdGlhbGl6ZXNcbiAgICovXG5cdHByaXZhdGUgX2luaXRpYWxpemVkQ2Fyb3VzZWwkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuXG5cdC8qKlxuICAgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gd2hlbiB0aGUgY2Fyb3VzZWwncyBzZXR0aW5ncyBzdGFydCBjaGFuZ2luZlxuICAgKi9cblx0cHJpdmF0ZSBfY2hhbmdlU2V0dGluZ3NDYXJvdXNlbCQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cblx0LyoqXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSBjYXJvdXNlbCdzIHNldHRpbmdzIGhhdmUgY2hhbmdlZFxuICAgKi9cblx0cHJpdmF0ZSBfY2hhbmdlZFNldHRpbmdzQ2Fyb3VzZWwkID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXHQvKipcbiAgICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uIHdoZW4gdGhlIGNhcm91c2VsIHN0YXJ0cyB0cmFuc2xhdGluZyBvciBtb3ZpbmdcbiAgICovXG5cdHByaXZhdGUgX3RyYW5zbGF0ZUNhcm91c2VsJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcblx0LyoqXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSBjYXJvdXNlbCBzdG9wcGVkIHRyYW5zbGF0aW5nIG9yIG1vdmluZ1xuICAgKi9cblx0cHJpdmF0ZSBfdHJhbnNsYXRlZENhcm91c2VsJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcblx0LyoqXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSBjYXJvdXNlbCdzIHJlYnVpbGRpbmcgY2F1c2VkIGJ5ICdyZXNpemUnIGV2ZW50IHN0YXJ0c1xuICAgKi9cblx0cHJpdmF0ZSBfcmVzaXplQ2Fyb3VzZWwkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuXHQvKipcbiAgICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uICB3aGVuIHRoZSBjYXJvdXNlbCdzIHJlYnVpbGRpbmcgY2F1c2VkIGJ5ICdyZXNpemUnIGV2ZW50IGlzIGVuZGVkXG4gICAqL1xuXHRwcml2YXRlIF9yZXNpemVkQ2Fyb3VzZWwkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuXHQvKipcbiAgICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uIHdoZW4gdGhlIHJlZnJlc2ggb2YgY2Fyb3VzZWwgc3RhcnRzXG4gICAqL1xuXHRwcml2YXRlIF9yZWZyZXNoQ2Fyb3VzZWwkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuXHQvKipcbiAgICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uIHdoZW4gdGhlIHJlZnJlc2ggb2YgY2Fyb3VzZWwgaXMgZW5kZWRcbiAgICovXG5cdHByaXZhdGUgX3JlZnJlc2hlZENhcm91c2VsJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcblx0LyoqXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSBkcmFnZ2luZyBvZiBjYXJvdXNlbCBzdGFydHNcbiAgICovXG5cdHByaXZhdGUgX2RyYWdDYXJvdXNlbCQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG5cdC8qKlxuICAgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gd2hlbiB0aGUgZHJhZ2dpbmcgb2YgY2Fyb3VzZWwgaXMgZW5kZWRcbiAgICovXG5cdHByaXZhdGUgX2RyYWdnZWRDYXJvdXNlbCQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG5cbiAgLyoqXG4gICAqIEN1cnJlbnQgc2V0dGluZ3MgZm9yIHRoZSBjYXJvdXNlbC5cbiAgICovXG4gIHNldHRpbmdzOiBPd2xPcHRpb25zID0ge1xuXHRcdGl0ZW1zOiAwXG5cdH07XG5cblx0LyoqXG4gICAqIEluaXRpYWwgZGF0YSBmb3Igc2V0dGluZyBjbGFzc2VzIHRvIGVsZW1lbnQgLm93bC1jYXJvdXNlbFxuICAgKi9cblx0b3dsRE9NRGF0YTogT3dsRE9NRGF0YSA9IHtcblx0XHRydGw6IGZhbHNlLFxuXHRcdGlzUmVzcG9uc2l2ZTogZmFsc2UsXG5cdFx0aXNSZWZyZXNoZWQ6IGZhbHNlLFxuXHRcdGlzTG9hZGVkOiBmYWxzZSxcblx0XHRpc0xvYWRpbmc6IGZhbHNlLFxuXHRcdGlzTW91c2VEcmFnYWJsZTogZmFsc2UsXG5cdFx0aXNHcmFiOiBmYWxzZSxcblx0XHRpc1RvdWNoRHJhZ2FibGU6IGZhbHNlXG5cdH07XG5cblx0LyoqXG4gICAqIEluaXRpYWwgZGF0YSBvZiAub3dsLXN0YWdlXG4gICAqL1xuXHRzdGFnZURhdGE6IFN0YWdlRGF0YSA9IHtcblx0XHR0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgwcHgsMHB4LDBweCknLFxuXHRcdHRyYW5zaXRpb246ICcwcycsXG5cdFx0d2lkdGg6IDAsXG5cdFx0cGFkZGluZ0w6IDAsXG5cdFx0cGFkZGluZ1I6IDBcblx0fTtcblxuXHQvKipcblx0ICogIERhdGEgb2YgZXZlcnkgc2xpZGVcblx0ICovXG5cdHNsaWRlc0RhdGE6IFNsaWRlTW9kZWxbXTtcblxuXHQvKipcblx0ICogRGF0YSBvZiBuYXZpZ2F0aW9uIGJsb2NrXG5cdCAqL1xuXHRuYXZEYXRhOiBOYXZEYXRhO1xuXG5cdC8qKlxuXHQgKiBEYXRhIG9mIGRvdHMgYmxvY2tcblx0ICovXG5cdGRvdHNEYXRhOiBEb3RzRGF0YTtcblxuXHQvKipcblx0ICogQ2Fyb3VzZWwgd2lkdGhcblx0ICovXG5cdHByaXZhdGUgX3dpZHRoOiBudW1iZXI7XG5cblx0LyoqXG5cdCAqIEFsbCByZWFsIGl0ZW1zLlxuXHQgKi9cblx0cHJpdmF0ZSBfaXRlbXM6IENhcm91c2VsU2xpZGVEaXJlY3RpdmVbXSA9IFtdOyAvLyBpcyBlcXVhbCB0byB0aGlzLnNsaWRlc1xuXG5cdC8qKlxuICAgKiBBcnJheSB3aXRoIHdpZHRoIG9mIGV2ZXJ5IHNsaWRlLlxuICAgKi9cbiAgcHJpdmF0ZSBfd2lkdGhzOiBhbnlbXSA9IFtdO1xuXG5cdC8qKlxuICAgKiBDdXJyZW50bHkgc3VwcHJlc3NlZCBldmVudHMgdG8gcHJldmVudCB0aGVtIGZyb20gYmVlaW5nIHJldHJpZ2dlcmVkLlxuICAgKi9cblx0cHJpdmF0ZSBfc3VwcmVzczogYW55ID0ge307XG5cbiAgLyoqXG4gICAqIFJlZmVyZW5jZXMgdG8gdGhlIHJ1bm5pbmcgcGx1Z2lucyBvZiB0aGlzIGNhcm91c2VsLlxuICAgKi9cblx0cHJpdmF0ZSBfcGx1Z2luczogYW55ID0ge307XG5cblx0LyoqXG4gICAqIEFic29sdXRlIGN1cnJlbnQgcG9zaXRpb24uXG4gICAqL1xuXHRwcml2YXRlIF9jdXJyZW50OiBudW1iZXIgfCBudWxsID0gbnVsbDtcblxuXHQvKipcbiAgICogQWxsIGNsb25lZCBpdGVtcy5cbiAgICovXG5cdHByaXZhdGUgX2Nsb25lczogYW55W10gPSBbXTtcblxuICAvKipcbiAgICogTWVyZ2UgdmFsdWVzIG9mIGFsbCBpdGVtcy5cbiAgICogQHRvZG8gTWF5YmUgdGhpcyBjb3VsZCBiZSBwYXJ0IG9mIGEgcGx1Z2luLlxuICAgKi9cblx0cHJpdmF0ZSBfbWVyZ2VyczogYW55W10gPSBbXTtcblxuXHQvKipcbiAgICogQW5pbWF0aW9uIHNwZWVkIGluIG1pbGxpc2Vjb25kcy5cbiAgICovXG5cdHByaXZhdGUgX3NwZWVkOiBudW1iZXIgfCBudWxsID0gbnVsbDtcblxuXHQvKipcbiAgICogQ29vcmRpbmF0ZXMgb2YgYWxsIGl0ZW1zIGluIHBpeGVsLlxuICAgKiBAdG9kbyBUaGUgbmFtZSBvZiB0aGlzIG1lbWJlciBpcyBtaXNzbGVhZGluZy5cbiAgICovXG5cdHByaXZhdGUgX2Nvb3JkaW5hdGVzOiBudW1iZXJbXSA9IFtdO1xuXG5cdC8qKlxuICAgKiBDdXJyZW50IGJyZWFrcG9pbnQuXG4gICAqIEB0b2RvIFJlYWwgbWVkaWEgcXVlcmllcyB3b3VsZCBiZSBuaWNlLlxuICAgKi9cblx0cHJpdmF0ZSBfYnJlYWtwb2ludDogYW55ID0gbnVsbDtcblxuXHQvKipcblx0ICogUHJlZml4IGZvciBpZCBvZiBjbG9uZWQgc2xpZGVzXG5cdCAqL1xuXHRjbG9uZWRJZFByZWZpeCA9ICdjbG9uZWQtJztcblxuXHQvKipcblx0ICogQ3VycmVudCBvcHRpb25zIHNldCBieSB0aGUgY2FsbGVyIGluY2x1ZGluZyBkZWZhdWx0cy5cblx0ICovXG5cdF9vcHRpb25zOiBPd2xPcHRpb25zID0ge307XG5cbiAgLyoqXG4gICAqIEludmFsaWRhdGVkIHBhcnRzIHdpdGhpbiB0aGUgdXBkYXRlIHByb2Nlc3MuXG4gICAqL1xuICBwcml2YXRlIF9pbnZhbGlkYXRlZDogYW55ID0ge307XG5cbiAgLy8gSXMgbmVlZGVkIGZvciB0ZXN0c1xuICBnZXQgaW52YWxpZGF0ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ludmFsaWRhdGVkO1xuICB9XG4gIC8qKlxuICAgKiBDdXJyZW50IHN0YXRlIGluZm9ybWF0aW9uIGFuZCB0aGVpciB0YWdzLlxuICAgKi9cbiAgcHJpdmF0ZSBfc3RhdGVzOiBTdGF0ZXMgPSB7XG4gICAgY3VycmVudDoge30sXG4gICAgdGFnczoge1xuICAgICAgaW5pdGlhbGl6aW5nOiBbJ2J1c3knXSxcbiAgICAgIGFuaW1hdGluZzogWydidXN5J10sXG4gICAgICBkcmFnZ2luZzogWydpbnRlcmFjdGluZyddXG4gICAgfVxuICB9O1xuXG4gIC8vIGlzIG5lZWRlZCBmb3IgdGVzdHNcbiAgZ2V0IHN0YXRlcygpIHtcbiAgICByZXR1cm4gdGhpcy5fc3RhdGVzO1xuXHR9XG5cblx0LyoqXG4gXHQgKiBPcmRlcmVkIGxpc3Qgb2Ygd29ya2VycyBmb3IgdGhlIHVwZGF0ZSBwcm9jZXNzLlxuICAgKi9cbiAgcHJpdmF0ZSBfcGlwZTogYW55W10gPSBbXG4gICAgLy8ge1xuICAgIC8vICAgZmlsdGVyOiBbJ3dpZHRoJywgJ3NldHRpbmdzJ10sXG4gICAgLy8gICBydW46ICgpID0+IHtcbiAgICAvLyAgICAgdGhpcy5fd2lkdGggPSB0aGlzLmNhcm91c2VsV2luZG93V2lkdGg7XG4gICAgLy8gICB9XG4gICAgLy8gfSxcbiAgICB7XG4gICAgICBmaWx0ZXI6IFsnd2lkdGgnLCAnaXRlbXMnLCAnc2V0dGluZ3MnXSxcbiAgICAgIHJ1bjogY2FjaGUgPT4ge1xuICAgICAgICBjYWNoZS5jdXJyZW50ID0gdGhpcy5faXRlbXMgJiYgdGhpcy5faXRlbXNbdGhpcy5yZWxhdGl2ZSh0aGlzLl9jdXJyZW50KV0uaWQ7XG4gICAgICB9XG4gICAgfSxcbiAgICAvLyB7XG4gICAgLy8gICBmaWx0ZXI6IFsnaXRlbXMnLCAnc2V0dGluZ3MnXSxcbiAgICAvLyAgIHJ1bjogZnVuY3Rpb24oKSB7XG4gICAgLy8gICAgIC8vIHRoaXMuJHN0YWdlLmNoaWxkcmVuKCcuY2xvbmVkJykucmVtb3ZlKCk7XG4gICAgLy8gICB9XG5cdFx0Ly8gfSxcblx0XHQge1xuICAgICAgZmlsdGVyOiBbICd3aWR0aCcsICdpdGVtcycsICdzZXR0aW5ncycgXSxcbiAgICAgIHJ1bjogKGNhY2hlKSA9PiB7XG4gICAgICAgIGNvbnN0IG1hcmdpbiA9IHRoaXMuc2V0dGluZ3MubWFyZ2luIHx8ICcnLFxuICAgICAgICAgIGdyaWQgPSAhdGhpcy5zZXR0aW5ncy5hdXRvV2lkdGgsXG4gICAgICAgICAgcnRsID0gdGhpcy5zZXR0aW5ncy5ydGwsXG4gICAgICAgICAgY3NzID0ge1xuICAgICAgICAgICAgJ21hcmdpbi1sZWZ0JzogcnRsID8gbWFyZ2luIDogJycsXG4gICAgICAgICAgICAnbWFyZ2luLXJpZ2h0JzogcnRsID8gJycgOiBtYXJnaW5cbiAgICAgICAgICB9O1xuXG4gICAgICAgIGlmKCFncmlkKSB7XG5cdFx0XHRcdFx0dGhpcy5zbGlkZXNEYXRhLmZvckVhY2goc2xpZGUgPT4ge1xuXHRcdFx0XHRcdFx0c2xpZGUubWFyZ2luTCA9IGNzc1snbWFyZ2luLWxlZnQnXTtcblx0XHRcdFx0XHRcdHNsaWRlLm1hcmdpblIgPSBjc3NbJ21hcmdpbi1yaWdodCddO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cbiAgICAgICAgY2FjaGUuY3NzID0gY3NzO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGZpbHRlcjogWyAnd2lkdGgnLCAnaXRlbXMnLCAnc2V0dGluZ3MnIF0sXG4gICAgICBydW46IChjYWNoZSkgPT4ge1xuICAgICAgICBjb25zdCB3aWR0aDogYW55ID0gKyh0aGlzLndpZHRoKCkgLyB0aGlzLnNldHRpbmdzLml0ZW1zKS50b0ZpeGVkKDMpIC0gdGhpcy5zZXR0aW5ncy5tYXJnaW4sXG4gICAgICAgICAgZ3JpZCA9ICF0aGlzLnNldHRpbmdzLmF1dG9XaWR0aCxcbiAgICAgICAgICB3aWR0aHMgPSBbXTtcblx0XHRcdFx0bGV0IG1lcmdlID0gbnVsbCxcblx0XHRcdFx0XHRcdGl0ZXJhdG9yID0gdGhpcy5faXRlbXMubGVuZ3RoO1xuXG4gICAgICAgIGNhY2hlLml0ZW1zID0ge1xuICAgICAgICAgIG1lcmdlOiBmYWxzZSxcbiAgICAgICAgICB3aWR0aDogd2lkdGhcbiAgICAgICAgfTtcblxuICAgICAgICB3aGlsZSAoaXRlcmF0b3ItLSkge1xuICAgICAgICAgIG1lcmdlID0gdGhpcy5fbWVyZ2Vyc1tpdGVyYXRvcl07XG4gICAgICAgICAgbWVyZ2UgPSB0aGlzLnNldHRpbmdzLm1lcmdlRml0ICYmIE1hdGgubWluKG1lcmdlLCB0aGlzLnNldHRpbmdzLml0ZW1zKSB8fCBtZXJnZTtcbiAgICAgICAgICBjYWNoZS5pdGVtcy5tZXJnZSA9IG1lcmdlID4gMSB8fCBjYWNoZS5pdGVtcy5tZXJnZTtcblxuICAgICAgICAgIHdpZHRoc1tpdGVyYXRvcl0gPSAhZ3JpZCA/IHRoaXMuX2l0ZW1zW2l0ZXJhdG9yXS53aWR0aCA/IHRoaXMuX2l0ZW1zW2l0ZXJhdG9yXS53aWR0aCA6IHdpZHRoIDogd2lkdGggKiBtZXJnZTtcbiAgICAgICAgfVxuXG5cdFx0XHRcdHRoaXMuX3dpZHRocyA9IHdpZHRocztcblxuXHRcdFx0XHR0aGlzLnNsaWRlc0RhdGEuZm9yRWFjaCgoc2xpZGUsIGkpID0+IHtcblx0XHRcdFx0XHRzbGlkZS53aWR0aCA9IHRoaXMuX3dpZHRoc1tpXTtcblx0XHRcdFx0XHRzbGlkZS5tYXJnaW5SID0gY2FjaGUuY3NzWydtYXJnaW4tcmlnaHQnXTtcblx0XHRcdFx0XHRzbGlkZS5tYXJnaW5MID0gY2FjaGUuY3NzWydtYXJnaW4tbGVmdCddO1xuXHRcdFx0XHR9KTtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBmaWx0ZXI6IFsgJ2l0ZW1zJywgJ3NldHRpbmdzJyBdLFxuICAgICAgcnVuOiAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNsb25lczogYW55W10gPSBbXSxcbiAgICAgICAgICBpdGVtczogQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZVtdID0gdGhpcy5faXRlbXMsXG4gICAgICAgICAgc2V0dGluZ3M6IGFueSA9IHRoaXMuc2V0dGluZ3MsXG4gICAgICAgICAgLy8gVE9ETzogU2hvdWxkIGJlIGNvbXB1dGVkIGZyb20gbnVtYmVyIG9mIG1pbiB3aWR0aCBpdGVtcyBpbiBzdGFnZVxuICAgICAgICAgIHZpZXcgPSBNYXRoLm1heChzZXR0aW5ncy5pdGVtcyAqIDIsIDQpLFxuICAgICAgICAgIHNpemUgPSBNYXRoLmNlaWwoaXRlbXMubGVuZ3RoIC8gMikgKiAyO1xuXHRcdFx0XHRsZXQgIGFwcGVuZDogYW55W10gPSBbXSxcbiAgICAgICAgICBwcmVwZW5kOiBhbnlbXSA9IFtdLFxuXHRcdFx0XHRcdHJlcGVhdCA9IHNldHRpbmdzLmxvb3AgJiYgaXRlbXMubGVuZ3RoID8gc2V0dGluZ3MucmV3aW5kID8gdmlldyA6IE1hdGgubWF4KHZpZXcsIHNpemUpIDogMDtcblxuICAgICAgICByZXBlYXQgLz0gMjtcblxuICAgICAgICB3aGlsZSAocmVwZWF0LS0pIHtcbiAgICAgICAgICAvLyBTd2l0Y2ggdG8gb25seSB1c2luZyBhcHBlbmRlZCBjbG9uZXNcbiAgICAgICAgICBjbG9uZXMucHVzaCh0aGlzLm5vcm1hbGl6ZShjbG9uZXMubGVuZ3RoIC8gMiwgdHJ1ZSkpO1xuICAgICAgICAgIGFwcGVuZC5wdXNoKHsgLi4udGhpcy5zbGlkZXNEYXRhW2Nsb25lc1tjbG9uZXMubGVuZ3RoIC0gMV1dfSk7XG5cdFx0XHRcdFx0Y2xvbmVzLnB1c2godGhpcy5ub3JtYWxpemUoaXRlbXMubGVuZ3RoIC0gMSAtIChjbG9uZXMubGVuZ3RoIC0gMSkgLyAyLCB0cnVlKSk7XG5cdFx0XHRcdFx0cHJlcGVuZC51bnNoaWZ0KHsgLi4udGhpcy5zbGlkZXNEYXRhW2Nsb25lc1tjbG9uZXMubGVuZ3RoIC0gMV1dfSk7XG4gICAgICAgIH1cblxuXHRcdFx0XHR0aGlzLl9jbG9uZXMgPSBjbG9uZXM7XG5cblx0XHRcdFx0YXBwZW5kID0gYXBwZW5kLm1hcChzbGlkZSA9PiB7XG5cdFx0XHRcdFx0c2xpZGUuaWQgPSBgJHt0aGlzLmNsb25lZElkUHJlZml4fSR7c2xpZGUuaWR9YDtcblx0XHRcdFx0XHRzbGlkZS5pc0FjdGl2ZSA9IGZhbHNlO1xuXHRcdFx0XHRcdHNsaWRlLmlzQ2xvbmVkID0gdHJ1ZTtcblx0XHRcdFx0XHRyZXR1cm4gc2xpZGU7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHByZXBlbmQgPSBwcmVwZW5kLm1hcChzbGlkZSA9PiB7XG5cdFx0XHRcdFx0c2xpZGUuaWQgPSBgJHt0aGlzLmNsb25lZElkUHJlZml4fSR7c2xpZGUuaWR9YDtcblx0XHRcdFx0XHRzbGlkZS5pc0FjdGl2ZSA9IGZhbHNlO1xuXHRcdFx0XHRcdHNsaWRlLmlzQ2xvbmVkID0gdHJ1ZTtcblx0XHRcdFx0XHRyZXR1cm4gc2xpZGU7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHRoaXMuc2xpZGVzRGF0YSA9IHByZXBlbmQuY29uY2F0KHRoaXMuc2xpZGVzRGF0YSkuY29uY2F0KGFwcGVuZCk7XG4gICAgICB9XG4gICAgfSwge1xuICAgICAgZmlsdGVyOiBbICd3aWR0aCcsICdpdGVtcycsICdzZXR0aW5ncycgXSxcbiAgICAgIHJ1bjogKCkgPT4ge1xuICAgICAgICBjb25zdCBydGwgPSB0aGlzLnNldHRpbmdzLnJ0bCA/IDEgOiAtMSxcbiAgICAgICAgICBzaXplID0gdGhpcy5fY2xvbmVzLmxlbmd0aCArIHRoaXMuX2l0ZW1zLmxlbmd0aCxcbiAgICAgICAgICBjb29yZGluYXRlcyA9IFtdO1xuICAgICAgICBsZXQgaXRlcmF0b3IgPSAtMSxcbiAgICAgICAgICBwcmV2aW91cyA9IDAsXG4gICAgICAgICAgY3VycmVudCA9IDA7XG5cbiAgICAgICAgd2hpbGUgKCsraXRlcmF0b3IgPCBzaXplKSB7XG4gICAgICAgICAgcHJldmlvdXMgPSBjb29yZGluYXRlc1tpdGVyYXRvciAtIDFdIHx8IDA7XG4gICAgICAgICAgY3VycmVudCA9IHRoaXMuX3dpZHRoc1t0aGlzLnJlbGF0aXZlKGl0ZXJhdG9yKV0gKyB0aGlzLnNldHRpbmdzLm1hcmdpbjtcbiAgICAgICAgICBjb29yZGluYXRlcy5wdXNoKHByZXZpb3VzICsgY3VycmVudCAqIHJ0bCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jb29yZGluYXRlcyA9IGNvb3JkaW5hdGVzO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGZpbHRlcjogWyAnd2lkdGgnLCAnaXRlbXMnLCAnc2V0dGluZ3MnIF0sXG4gICAgICBydW46ICgpID0+IHtcbiAgICAgICAgY29uc3QgcGFkZGluZyA9IHRoaXMuc2V0dGluZ3Muc3RhZ2VQYWRkaW5nLFxuICAgICAgICAgIGNvb3JkaW5hdGVzID0gdGhpcy5fY29vcmRpbmF0ZXMsXG4gICAgICAgICAgY3NzID0ge1xuICAgICAgICAgICAgJ3dpZHRoJzogTWF0aC5jZWlsKE1hdGguYWJzKGNvb3JkaW5hdGVzW2Nvb3JkaW5hdGVzLmxlbmd0aCAtIDFdKSkgKyBwYWRkaW5nICogMixcbiAgICAgICAgICAgICdwYWRkaW5nLWxlZnQnOiBwYWRkaW5nIHx8ICcnLFxuICAgICAgICAgICAgJ3BhZGRpbmctcmlnaHQnOiBwYWRkaW5nIHx8ICcnXG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHR0aGlzLnN0YWdlRGF0YS53aWR0aCA9IGNzcy53aWR0aDsgLy8gdXNlIHRoaXMgcHJvcGVydHkgaW4gKm5nSWYgZGlyZWN0aXZlIGZvciAub3dsLXN0YWdlIGVsZW1lbnRcblx0XHRcdFx0dGhpcy5zdGFnZURhdGEucGFkZGluZ0wgPSBjc3NbJ3BhZGRpbmctbGVmdCddO1xuXHRcdFx0XHR0aGlzLnN0YWdlRGF0YS5wYWRkaW5nUiA9IGNzc1sncGFkZGluZy1yaWdodCddO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAvLyAgIGZpbHRlcjogWyAnd2lkdGgnLCAnaXRlbXMnLCAnc2V0dGluZ3MnIF0sXG4gICAgLy8gICBydW46IGNhY2hlID0+IHtcblx0XHQvLyBcdFx0Ly8gdGhpcyBtZXRob2Qgc2V0cyB0aGUgd2lkdGggZm9yIGV2ZXJ5IHNsaWRlLCBidXQgSSBzZXQgaXQgaW4gZGlmZmVyZW50IHdheSBlYXJsaWVyXG5cdFx0Ly8gXHRcdGNvbnN0IGdyaWQgPSAhdGhpcy5zZXR0aW5ncy5hdXRvV2lkdGgsXG5cdFx0Ly8gXHRcdGl0ZW1zID0gdGhpcy4kc3RhZ2UuY2hpbGRyZW4oKTsgLy8gdXNlIHRoaXMuc2xpZGVzRGF0YVxuICAgIC8vICAgICBsZXQgaXRlcmF0b3IgPSB0aGlzLl9jb29yZGluYXRlcy5sZW5ndGg7XG5cbiAgICAvLyAgICAgaWYgKGdyaWQgJiYgY2FjaGUuaXRlbXMubWVyZ2UpIHtcbiAgICAvLyAgICAgICB3aGlsZSAoaXRlcmF0b3ItLSkge1xuICAgIC8vICAgICAgICAgY2FjaGUuY3NzLndpZHRoID0gdGhpcy5fd2lkdGhzW3RoaXMucmVsYXRpdmUoaXRlcmF0b3IpXTtcbiAgICAvLyAgICAgICAgIGl0ZW1zLmVxKGl0ZXJhdG9yKS5jc3MoY2FjaGUuY3NzKTtcbiAgICAvLyAgICAgICB9XG4gICAgLy8gICAgIH0gZWxzZSBpZiAoZ3JpZCkge1xuICAgIC8vICAgICAgIGNhY2hlLmNzcy53aWR0aCA9IGNhY2hlLml0ZW1zLndpZHRoO1xuICAgIC8vICAgICAgIGl0ZW1zLmNzcyhjYWNoZS5jc3MpO1xuICAgIC8vICAgICB9XG4gICAgLy8gICB9XG4gICAgLy8gfSwge1xuICAgIC8vICAgZmlsdGVyOiBbICdpdGVtcycgXSxcbiAgICAvLyAgIHJ1bjogZnVuY3Rpb24oKSB7XG4gICAgLy8gICAgIHRoaXMuX2Nvb3JkaW5hdGVzLmxlbmd0aCA8IDEgJiYgdGhpcy4kc3RhZ2UucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAvLyAgIH1cbiAgICAvLyB9LCB7XG4gICAgICBmaWx0ZXI6IFsgJ3dpZHRoJywgJ2l0ZW1zJywgJ3NldHRpbmdzJyBdLFxuICAgICAgcnVuOiBjYWNoZSA9PiB7XG4gICAgICAgIGxldCBjdXJyZW50ID0gY2FjaGUuY3VycmVudCA/IHRoaXMuc2xpZGVzRGF0YS5maW5kSW5kZXgoc2xpZGUgPT4gc2xpZGUuaWQgPT09IGNhY2hlLmN1cnJlbnQpIDogMDtcbiAgICAgICBcdGN1cnJlbnQgPSBNYXRoLm1heCh0aGlzLm1pbmltdW0oKSwgTWF0aC5taW4odGhpcy5tYXhpbXVtKCksIGN1cnJlbnQpKTtcbiAgICAgICAgdGhpcy5yZXNldChjdXJyZW50KTtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBmaWx0ZXI6IFsgJ3Bvc2l0aW9uJyBdLFxuICAgICAgcnVuOiAoKSA9PiB7XG4gICAgICAgIHRoaXMuYW5pbWF0ZSh0aGlzLmNvb3JkaW5hdGVzKHRoaXMuX2N1cnJlbnQpKTtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBmaWx0ZXI6IFsgJ3dpZHRoJywgJ3Bvc2l0aW9uJywgJ2l0ZW1zJywgJ3NldHRpbmdzJyBdLFxuICAgICAgcnVuOiAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJ0bCA9IHRoaXMuc2V0dGluZ3MucnRsID8gMSA6IC0xLFxuXHRcdFx0XHRcdHBhZGRpbmcgPSB0aGlzLnNldHRpbmdzLnN0YWdlUGFkZGluZyAqIDIsXG5cdFx0XHRcdFx0bWF0Y2hlcyA9IFtdO1xuXHRcdFx0XHRsZXQgYmVnaW4sIGVuZCwgaW5uZXIsIG91dGVyLCBpLCBuO1xuXG5cdFx0XHRcdGJlZ2luID0gdGhpcy5jb29yZGluYXRlcyh0aGlzLmN1cnJlbnQoKSk7XG5cdFx0XHRcdGlmICh0eXBlb2YgYmVnaW4gPT09ICdudW1iZXInICkge1xuXHRcdFx0XHRcdGJlZ2luICs9IHBhZGRpbmc7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0YmVnaW4gPSAwO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZW5kID0gYmVnaW4gKyB0aGlzLndpZHRoKCkgKiBydGw7XG5cblx0XHRcdFx0aWYgKHJ0bCA9PT0gLTEgJiYgdGhpcy5zZXR0aW5ncy5jZW50ZXIpIHtcblx0XHRcdFx0XHRjb25zdCByZXN1bHQgPVx0dGhpcy5fY29vcmRpbmF0ZXMuZmlsdGVyKGVsZW1lbnQgPT4ge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuc2V0dGluZ3MuaXRlbXMgJSAyID09PSAxID8gZWxlbWVudCA+PSBiZWdpbiA6IGVsZW1lbnQgPiBiZWdpbjtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRiZWdpbiA9IHJlc3VsdC5sZW5ndGggPyByZXN1bHRbcmVzdWx0Lmxlbmd0aCAtIDFdIDogYmVnaW47XG5cdFx0XHRcdH1cblxuICAgICAgICBmb3IgKGkgPSAwLCBuID0gdGhpcy5fY29vcmRpbmF0ZXMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgaW5uZXIgPSBNYXRoLmNlaWwodGhpcy5fY29vcmRpbmF0ZXNbaSAtIDFdIHx8IDApO1xuXHRcdFx0XHRcdG91dGVyID0gTWF0aC5jZWlsKE1hdGguYWJzKHRoaXMuX2Nvb3JkaW5hdGVzW2ldKSArIHBhZGRpbmcgKiBydGwpO1xuXG4gICAgICAgICAgaWYgKCh0aGlzLl9vcChpbm5lciwgJzw9JywgYmVnaW4pICYmICh0aGlzLl9vcChpbm5lciwgJz4nLCBlbmQpKSlcbiAgICAgICAgICAgIHx8ICh0aGlzLl9vcChvdXRlciwgJzwnLCBiZWdpbikgJiYgdGhpcy5fb3Aob3V0ZXIsICc+JywgZW5kKSkpIHtcbiAgICAgICAgICAgIG1hdGNoZXMucHVzaChpKTtcbiAgICAgICAgICB9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLnNsaWRlc0RhdGEuZm9yRWFjaChzbGlkZSA9PiB7XG5cdFx0XHRcdFx0c2xpZGUuaXNBY3RpdmUgPSBmYWxzZTtcblx0XHRcdFx0XHRyZXR1cm4gc2xpZGU7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRtYXRjaGVzLmZvckVhY2goaXRlbSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5zbGlkZXNEYXRhW2l0ZW1dLmlzQWN0aXZlID0gdHJ1ZTtcblx0XHRcdFx0fSk7XG5cbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuY2VudGVyKSB7XG5cdFx0XHRcdFx0dGhpcy5zbGlkZXNEYXRhLmZvckVhY2goc2xpZGUgPT4ge1xuXHRcdFx0XHRcdFx0c2xpZGUuaXNDZW50ZXJlZCA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHNsaWRlO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHRoaXMuc2xpZGVzRGF0YVt0aGlzLmN1cnJlbnQoKV0uaXNDZW50ZXJlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIF07XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSBsb2dnZXI6IE93bExvZ2dlcikgeyB9XG5cblx0LyoqXG5cdCAqIE1ha2VzIF92aWV3U2V0dGluZ3NTaGlwcGVyJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXG5cdCAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX3ZpZXdTZXR0aW5nc1NoaXBwZXIkIFN1YmplY3Rcblx0ICovXG5cdGdldFZpZXdDdXJTZXR0aW5ncygpOiBPYnNlcnZhYmxlPENhcm91c2VsQ3VycmVudERhdGE+IHtcblx0XHRyZXR1cm4gdGhpcy5fdmlld1NldHRpbmdzU2hpcHBlciQuYXNPYnNlcnZhYmxlKCk7XG5cdH1cblxuXHQvKipcblx0ICogTWFrZXMgX2luaXRpYWxpemVkQ2Fyb3VzZWwkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcblx0ICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfaW5pdGlhbGl6ZWRDYXJvdXNlbCQgU3ViamVjdFxuXHQgKi9cblx0Z2V0SW5pdGlhbGl6ZWRTdGF0ZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuXHRcdHJldHVybiB0aGlzLl9pbml0aWFsaXplZENhcm91c2VsJC5hc09ic2VydmFibGUoKVxuXHR9XG5cblx0LyoqXG5cdCAqIE1ha2VzIF9jaGFuZ2VTZXR0aW5nc0Nhcm91c2VsJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXG5cdCAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX2NoYW5nZVNldHRpbmdzQ2Fyb3VzZWwkIFN1YmplY3Rcblx0ICovXG5cdGdldENoYW5nZVN0YXRlKCk6IE9ic2VydmFibGU8YW55PiB7XG5cdFx0cmV0dXJuIHRoaXMuX2NoYW5nZVNldHRpbmdzQ2Fyb3VzZWwkLmFzT2JzZXJ2YWJsZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIE1ha2VzIF9jaGFuZ2VkU2V0dGluZ3NDYXJvdXNlbCQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxuXHQgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIF9jaGFuZ2VkU2V0dGluZ3NDYXJvdXNlbCQgU3ViamVjdFxuXHQgKi9cblx0Z2V0Q2hhbmdlZFN0YXRlKCk6IE9ic2VydmFibGU8YW55PiB7XG5cdFx0cmV0dXJuIHRoaXMuX2NoYW5nZWRTZXR0aW5nc0Nhcm91c2VsJC5hc09ic2VydmFibGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBNYWtlcyBfdHJhbnNsYXRlQ2Fyb3VzZWwkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcblx0ICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfdHJhbnNsYXRlQ2Fyb3VzZWwkIFN1YmplY3Rcblx0ICovXG5cdGdldFRyYW5zbGF0ZVN0YXRlKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG5cdFx0cmV0dXJuIHRoaXMuX3RyYW5zbGF0ZUNhcm91c2VsJC5hc09ic2VydmFibGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBNYWtlcyBfdHJhbnNsYXRlZENhcm91c2VsJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXG5cdCAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX3RyYW5zbGF0ZWRDYXJvdXNlbCQgU3ViamVjdFxuXHQgKi9cblx0Z2V0VHJhbnNsYXRlZFN0YXRlKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG5cdFx0cmV0dXJuIHRoaXMuX3RyYW5zbGF0ZWRDYXJvdXNlbCQuYXNPYnNlcnZhYmxlKCk7XG5cdH1cblxuXHQvKipcblx0ICogTWFrZXMgX3Jlc2l6ZUNhcm91c2VsJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXG5cdCAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX3Jlc2l6ZUNhcm91c2VsJCBTdWJqZWN0XG5cdCAqL1xuXHRnZXRSZXNpemVTdGF0ZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuXHRcdHJldHVybiB0aGlzLl9yZXNpemVDYXJvdXNlbCQuYXNPYnNlcnZhYmxlKCk7XG5cdH1cblxuXHQvKipcblx0ICogTWFrZXMgX3Jlc2l6ZWRDYXJvdXNlbCQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxuXHQgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIF9yZXNpemVkQ2Fyb3VzZWwkIFN1YmplY3Rcblx0ICovXG5cdGdldFJlc2l6ZWRTdGF0ZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuXHRcdHJldHVybiB0aGlzLl9yZXNpemVkQ2Fyb3VzZWwkLmFzT2JzZXJ2YWJsZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIE1ha2VzIF9yZWZyZXNoQ2Fyb3VzZWwkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcblx0ICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfcmVmcmVzaENhcm91c2VsJCBTdWJqZWN0XG5cdCAqL1xuXHRnZXRSZWZyZXNoU3RhdGUoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcblx0XHRyZXR1cm4gdGhpcy5fcmVmcmVzaENhcm91c2VsJC5hc09ic2VydmFibGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBNYWtlcyBfcmVmcmVzaGVkQ2Fyb3VzZWwkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcblx0ICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfcmVmcmVzaGVkQ2Fyb3VzZWwkIFN1YmplY3Rcblx0ICovXG5cdGdldFJlZnJlc2hlZFN0YXRlKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG5cdFx0cmV0dXJuIHRoaXMuX3JlZnJlc2hlZENhcm91c2VsJC5hc09ic2VydmFibGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBNYWtlcyBfZHJhZ0Nhcm91c2VsJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXG5cdCAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX2RyYWdDYXJvdXNlbCQgU3ViamVjdFxuXHQgKi9cblx0Z2V0RHJhZ1N0YXRlKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG5cdFx0cmV0dXJuIHRoaXMuX2RyYWdDYXJvdXNlbCQuYXNPYnNlcnZhYmxlKCk7XG5cdH1cblxuXHQvKipcblx0ICogTWFrZXMgX2RyYWdnZWRDYXJvdXNlbCQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxuXHQgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIF9kcmFnZ2VkQ2Fyb3VzZWwkIFN1YmplY3Rcblx0ICovXG5cdGdldERyYWdnZWRTdGF0ZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuXHRcdHJldHVybiB0aGlzLl9kcmFnZ2VkQ2Fyb3VzZWwkLmFzT2JzZXJ2YWJsZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldHVwcyBjdXN0b20gb3B0aW9ucyBleHBhbmRpbmcgZGVmYXVsdCBvcHRpb25zXG5cdCAqIEBwYXJhbSBvcHRpb25zIGN1c3RvbSBvcHRpb25zXG5cdCAqL1xuXHRzZXRPcHRpb25zKG9wdGlvbnM6IE93bE9wdGlvbnMpIHtcblx0XHRjb25zdCBjb25maWdPcHRpb25zOiBPd2xPcHRpb25zID0gbmV3IE93bENhcm91c2VsT0NvbmZpZygpO1xuXHRcdGNvbnN0IGNoZWNrZWRPcHRpb25zOiBPd2xPcHRpb25zID0gdGhpcy5fdmFsaWRhdGVPcHRpb25zKG9wdGlvbnMsIGNvbmZpZ09wdGlvbnMpO1xuXHRcdHRoaXMuX29wdGlvbnMgPSB7IC4uLmNvbmZpZ09wdGlvbnMsIC4uLmNoZWNrZWRPcHRpb25zfTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDaGVja3Mgd2hldGhlciB1c2VyJ3Mgb3B0aW9uIGFyZSBzZXQgcHJvcGVybHkuIENoZWtpbmcgaXMgYmFzZWQgb24gdHlwaW5ncztcblx0ICogQHBhcmFtIG9wdGlvbnMgb3B0aW9ucyBzZXQgYnkgdXNlclxuXHQgKiBAcGFyYW0gY29uZmlnT3B0aW9ucyBkZWZhdWx0IG9wdGlvbnNcblx0ICogQHJldHVybnMgY2hlY2tlZCBhbmQgbW9kaWZpZWQgKGlmIGl0J3MgbmVlZGVkKSB1c2VyJ3Mgb3B0aW9uc1xuXHQgKlxuXHQgKiBOb3Rlczpcblx0ICogXHQtIGlmIHVzZXIgc2V0IG9wdGlvbiB3aXRoIHdyb25nIHR5cGUsIGl0J2xsIGJlIHdyaXR0ZW4gaW4gY29uc29sZVxuXHQgKi9cblx0cHJpdmF0ZSBfdmFsaWRhdGVPcHRpb25zKG9wdGlvbnM6IE93bE9wdGlvbnMsIGNvbmZpZ09wdGlvbnM6IE93bE9wdGlvbnMpOiBPd2xPcHRpb25zIHtcblx0XHRjb25zdCBjaGVja2VkT3B0aW9uczogT3dsT3B0aW9ucyA9IHsgLi4ub3B0aW9uc307XG5cdFx0Y29uc3QgbW9ja2VkVHlwZXMgPSBuZXcgT3dsT3B0aW9uc01vY2tlZFR5cGVzKCk7XG5cblx0XHRjb25zdCBzZXRSaWdodE9wdGlvbiA9ICh0eXBlOiBzdHJpbmcsIGtleTogYW55KTogT3dsT3B0aW9ucyA9PiB7XG5cdFx0XHR0aGlzLmxvZ2dlci5sb2coYG9wdGlvbnMuJHtrZXl9IG11c3QgYmUgdHlwZSBvZiAke3R5cGV9OyAke2tleX09JHtvcHRpb25zW2tleV19IHNraXBwZWQgdG8gZGVmYXVsdHM6ICR7a2V5fT0ke2NvbmZpZ09wdGlvbnNba2V5XX1gKTtcblx0XHRcdHJldHVybiBjb25maWdPcHRpb25zW2tleV07XG5cdFx0fTtcblxuXHRcdGZvciAoY29uc3Qga2V5IGluIGNoZWNrZWRPcHRpb25zKSB7XG5cdFx0XHRpZiAoY2hlY2tlZE9wdGlvbnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXG5cdFx0XHRcdC8vIGNvbmRpdGlvbiBjb3VsZCBiZSBzaG9ydGVuZWQgYnV0IGl0IGdldHMgaGFyZGVyIGZvciB1bmRlcnN0YW5kaW5nXG5cdFx0XHRcdGlmIChtb2NrZWRUeXBlc1trZXldID09PSAnbnVtYmVyJykge1xuXHRcdFx0XHRcdGlmICh0aGlzLl9pc051bWVyaWMoY2hlY2tlZE9wdGlvbnNba2V5XSkpIHtcblx0XHRcdFx0XHRcdGNoZWNrZWRPcHRpb25zW2tleV0gPSArY2hlY2tlZE9wdGlvbnNba2V5XTtcblx0XHRcdFx0XHRcdGNoZWNrZWRPcHRpb25zW2tleV0gPSBrZXkgPT09ICdpdGVtcycgPyB0aGlzLl92YWxpZGF0ZUl0ZW1zKGNoZWNrZWRPcHRpb25zW2tleV0sIGNoZWNrZWRPcHRpb25zLnNraXBfdmFsaWRhdGVJdGVtcykgOiBjaGVja2VkT3B0aW9uc1trZXldO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRjaGVja2VkT3B0aW9uc1trZXldID0gc2V0UmlnaHRPcHRpb24obW9ja2VkVHlwZXNba2V5XSwga2V5KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSBpZiAobW9ja2VkVHlwZXNba2V5XSA9PT0gJ2Jvb2xlYW4nICYmIHR5cGVvZiBjaGVja2VkT3B0aW9uc1trZXldICE9PSAnYm9vbGVhbicpIHtcblx0XHRcdFx0XHRjaGVja2VkT3B0aW9uc1trZXldID0gc2V0UmlnaHRPcHRpb24obW9ja2VkVHlwZXNba2V5XSwga2V5KTtcblx0XHRcdFx0fSBlbHNlIGlmIChtb2NrZWRUeXBlc1trZXldID09PSAnbnVtYmVyfGJvb2xlYW4nICYmICF0aGlzLl9pc051bWJlck9yQm9vbGVhbihjaGVja2VkT3B0aW9uc1trZXldKSkge1xuXHRcdFx0XHRcdGNoZWNrZWRPcHRpb25zW2tleV0gPSBzZXRSaWdodE9wdGlvbihtb2NrZWRUeXBlc1trZXldLCBrZXkpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKG1vY2tlZFR5cGVzW2tleV0gPT09ICdudW1iZXJ8c3RyaW5nJyAmJiAhdGhpcy5faXNOdW1iZXJPclN0cmluZyhjaGVja2VkT3B0aW9uc1trZXldKSkge1xuXHRcdFx0XHRcdGNoZWNrZWRPcHRpb25zW2tleV0gPSBzZXRSaWdodE9wdGlvbihtb2NrZWRUeXBlc1trZXldLCBrZXkpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKG1vY2tlZFR5cGVzW2tleV0gPT09ICdzdHJpbmd8Ym9vbGVhbicgJiYgIXRoaXMuX2lzU3RyaW5nT3JCb29sZWFuKGNoZWNrZWRPcHRpb25zW2tleV0pKSB7XG5cdFx0XHRcdFx0Y2hlY2tlZE9wdGlvbnNba2V5XSA9IHNldFJpZ2h0T3B0aW9uKG1vY2tlZFR5cGVzW2tleV0sIGtleSk7XG5cdFx0XHRcdH0gZWxzZSBpZiAobW9ja2VkVHlwZXNba2V5XSA9PT0gJ3N0cmluZ1tdJykge1xuXHRcdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KGNoZWNrZWRPcHRpb25zW2tleV0pKSB7XG5cdFx0XHRcdFx0XHRsZXQgaXNTdHJpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHRcdGNoZWNrZWRPcHRpb25zW2tleV0uZm9yRWFjaChlbGVtZW50ID0+IHtcblx0XHRcdFx0XHRcdFx0aXNTdHJpbmcgPSB0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycgPyB0cnVlIDogZmFsc2U7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdGlmICghaXNTdHJpbmcpIHsgY2hlY2tlZE9wdGlvbnNba2V5XSA9IHNldFJpZ2h0T3B0aW9uKG1vY2tlZFR5cGVzW2tleV0sIGtleSkgfTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Y2hlY2tlZE9wdGlvbnNba2V5XSA9IHNldFJpZ2h0T3B0aW9uKG1vY2tlZFR5cGVzW2tleV0sIGtleSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNoZWNrZWRPcHRpb25zO1xuXHR9XG5cblx0LyoqXG5cdCAqIENoZWNrcyB0aGUgb3B0aW9uIGBpdGVtc2Agc2V0IGJ5IHVzZXIgYW5kIGlmIGl0IGJpZ2dlciB0aGFuIG51bWJlciBvZiBzbGlkZXMsIHRoZSBmdW5jdGlvbiByZXR1cm5zIG51bWJlciBvZiBzbGlkZXNcblx0ICogQHBhcmFtIGl0ZW1zIG9wdGlvbiBpdGVtcyBzZXQgYnkgdXNlclxuXHQgKiBAcGFyYW0gc2tpcF92YWxpZGF0ZUl0ZW1zIG9wdGlvbiBgc2tpcF92YWxpZGF0ZUl0ZW1zYCBzZXQgYnkgdXNlclxuXHQgKiBAcmV0dXJucyByaWdodCBudW1iZXIgb2YgaXRlbXNcblx0ICovXG5cdHByaXZhdGUgX3ZhbGlkYXRlSXRlbXMoaXRlbXM6IG51bWJlciwgc2tpcF92YWxpZGF0ZUl0ZW1zOiBib29sZWFuKTogbnVtYmVyIHtcblx0XHRsZXQgcmVzdWx0OiBudW1iZXIgPSBpdGVtcztcblx0XHRpZiAoaXRlbXMgPiB0aGlzLl9pdGVtcy5sZW5ndGgpIHtcblx0XHRcdGlmIChza2lwX3ZhbGlkYXRlSXRlbXMpIHtcblx0XHRcdFx0dGhpcy5sb2dnZXIubG9nKCdUaGUgb3B0aW9uIFxcJ2l0ZW1zXFwnIGluIHlvdXIgb3B0aW9ucyBpcyBiaWdnZXIgdGhhbiB0aGUgbnVtYmVyIG9mIHNsaWRlcy4gVGhlIG5hdmlnYXRpb24gZ290IGRpc2FibGVkJyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXN1bHQgPSB0aGlzLl9pdGVtcy5sZW5ndGg7XG5cdFx0XHRcdHRoaXMubG9nZ2VyLmxvZygnVGhlIG9wdGlvbiBcXCdpdGVtc1xcJyBpbiB5b3VyIG9wdGlvbnMgaXMgYmlnZ2VyIHRoYW4gdGhlIG51bWJlciBvZiBzbGlkZXMuIFRoaXMgb3B0aW9uIGlzIHVwZGF0ZWQgdG8gdGhlIGN1cnJlbnQgbnVtYmVyIG9mIHNsaWRlcyBhbmQgdGhlIG5hdmlnYXRpb24gZ290IGRpc2FibGVkJyk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmIChpdGVtcyA9PT0gdGhpcy5faXRlbXMubGVuZ3RoICYmICh0aGlzLnNldHRpbmdzLmRvdHMgfHwgdGhpcy5zZXR0aW5ncy5uYXYpKSB7XG5cdFx0XHRcdHRoaXMubG9nZ2VyLmxvZygnT3B0aW9uIFxcJ2l0ZW1zXFwnIGluIHlvdXIgb3B0aW9ucyBpcyBlcXVhbCB0byB0aGUgbnVtYmVyIG9mIHNsaWRlcy4gU28gdGhlIG5hdmlnYXRpb24gZ290IGRpc2FibGVkJyk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHQvKipcblx0ICogU2V0IGN1cnJlbnQgd2lkdGggb2YgY2Fyb3VzZWxcblx0ICogQHBhcmFtIHdpZHRoIHdpZHRoIG9mIGNhcm91c2VsIFdpbmRvd1xuXHQgKi9cblx0c2V0Q2Fyb3VzZWxXaWR0aCh3aWR0aDogbnVtYmVyKSB7XG5cdFx0dGhpcy5fd2lkdGggPSB3aWR0aDtcblx0fVxuXG4gIC8qKlxuXHQgKiBTZXR1cHMgdGhlIGN1cnJlbnQgc2V0dGluZ3MuXG5cdCAqIEB0b2RvIFJlbW92ZSByZXNwb25zaXZlIGNsYXNzZXMuIFdoeSBzaG91bGQgYWRhcHRpdmUgZGVzaWducyBiZSBicm91Z2h0IGludG8gSUU4P1xuXHQgKiBAdG9kbyBTdXBwb3J0IGZvciBtZWRpYSBxdWVyaWVzIGJ5IHVzaW5nIGBtYXRjaE1lZGlhYCB3b3VsZCBiZSBuaWNlLlxuXHQgKiBAcGFyYW0gY2Fyb3VzZWxXaWR0aCB3aWR0aCBvZiBjYXJvdXNlbFxuXHQgKiBAcGFyYW0gc2xpZGVzIGFycmF5IG9mIHNsaWRlc1xuXHQgKiBAcGFyYW0gb3B0aW9ucyBvcHRpb25zIHNldCBieSB1c2VyXG5cdCAqL1xuICBzZXR1cChjYXJvdXNlbFdpZHRoOiBudW1iZXIsIHNsaWRlczogQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZVtdLCBvcHRpb25zOiBPd2xPcHRpb25zKSB7XG5cdFx0dGhpcy5zZXRDYXJvdXNlbFdpZHRoKGNhcm91c2VsV2lkdGgpO1xuXHRcdHRoaXMuc2V0SXRlbXMoc2xpZGVzKTtcblx0XHR0aGlzLl9kZWZpbmVTbGlkZXNEYXRhKCk7XG5cdFx0dGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuXG5cdFx0dGhpcy5zZXR0aW5ncyA9IHsgLi4udGhpcy5fb3B0aW9uc307XG5cblx0XHR0aGlzLnNldE9wdGlvbnNGb3JWaWV3cG9ydCgpO1xuXG5cdFx0dGhpcy5fdHJpZ2dlcignY2hhbmdlJywgeyBwcm9wZXJ0eTogeyBuYW1lOiAnc2V0dGluZ3MnLCB2YWx1ZTogdGhpcy5zZXR0aW5ncyB9IH0pO1xuXHRcdHRoaXMuaW52YWxpZGF0ZSgnc2V0dGluZ3MnKTsgLy8gbXVzdCBiZSBjYWxsIG9mIHRoaXMgZnVuY3Rpb247XG5cdFx0dGhpcy5fdHJpZ2dlcignY2hhbmdlZCcsIHsgcHJvcGVydHk6IHsgbmFtZTogJ3NldHRpbmdzJywgdmFsdWU6IHRoaXMuc2V0dGluZ3MgfSB9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgb3B0aW9ucyBmb3IgY3VycmVudCB2aWV3cG9ydFxuXHQgKi9cblx0c2V0T3B0aW9uc0ZvclZpZXdwb3J0KCkge1xuXHRcdGNvbnN0IHZpZXdwb3J0ID0gdGhpcy5fd2lkdGgsXG5cdFx0XHRvdmVyd3JpdGVzID0gdGhpcy5fb3B0aW9ucy5yZXNwb25zaXZlO1xuXHRcdGxldFx0bWF0Y2ggPSAtMTtcblxuXHRcdGlmICghT2JqZWN0LmtleXMob3ZlcndyaXRlcykubGVuZ3RoKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKCF2aWV3cG9ydCkge1xuXHRcdFx0dGhpcy5zZXR0aW5ncy5pdGVtcyA9IDE7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Zm9yIChjb25zdCBrZXkgaW4gb3ZlcndyaXRlcykge1xuXHRcdFx0aWYgKG92ZXJ3cml0ZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRpZiAoK2tleSA8PSB2aWV3cG9ydCAmJiAra2V5ID4gbWF0Y2gpIHtcblx0XHRcdFx0XHRtYXRjaCA9IE51bWJlcihrZXkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy5zZXR0aW5ncyA9IHsgLi4udGhpcy5fb3B0aW9ucywgLi4ub3ZlcndyaXRlc1ttYXRjaF0sIGl0ZW1zOiAob3ZlcndyaXRlc1ttYXRjaF0gJiYgb3ZlcndyaXRlc1ttYXRjaF0uaXRlbXMpID8gdGhpcy5fdmFsaWRhdGVJdGVtcyhvdmVyd3JpdGVzW21hdGNoXS5pdGVtcywgdGhpcy5fb3B0aW9ucy5za2lwX3ZhbGlkYXRlSXRlbXMpIDogdGhpcy5fb3B0aW9ucy5pdGVtc307XG5cdFx0Ly8gaWYgKHR5cGVvZiB0aGlzLnNldHRpbmdzLnN0YWdlUGFkZGluZyA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdC8vIFx0dGhpcy5zZXR0aW5ncy5zdGFnZVBhZGRpbmcgPSB0aGlzLnNldHRpbmdzLnN0YWdlUGFkZGluZygpO1xuXHRcdC8vIH1cblx0XHRkZWxldGUgdGhpcy5zZXR0aW5ncy5yZXNwb25zaXZlO1xuXHRcdHRoaXMub3dsRE9NRGF0YS5pc1Jlc3BvbnNpdmUgPSB0cnVlO1xuXHRcdHRoaXMub3dsRE9NRGF0YS5pc01vdXNlRHJhZ2FibGUgPSB0aGlzLnNldHRpbmdzLm1vdXNlRHJhZztcblx0XHR0aGlzLm93bERPTURhdGEuaXNUb3VjaERyYWdhYmxlID0gdGhpcy5zZXR0aW5ncy50b3VjaERyYWc7XG5cblx0XHRjb25zdCBtZXJnZXJzID0gW107XG5cdFx0dGhpcy5faXRlbXMuZm9yRWFjaChpdGVtID0+IHtcblx0XHRcdGNvbnN0IG1lcmdlTjogbnVtYmVyID0gdGhpcy5zZXR0aW5ncy5tZXJnZSA/IGl0ZW0uZGF0YU1lcmdlIDogMTtcblx0XHRcdG1lcmdlcnMucHVzaChtZXJnZU4pO1xuXHRcdH0pO1xuXHRcdHRoaXMuX21lcmdlcnMgPSBtZXJnZXJzO1xuXG5cdFx0dGhpcy5fYnJlYWtwb2ludCA9IG1hdGNoO1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlKCdzZXR0aW5ncycpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemVzIHRoZSBjYXJvdXNlbC5cblx0ICogQHBhcmFtIHNsaWRlcyBhcnJheSBvZiBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlXG5cdCAqL1xuICBpbml0aWFsaXplKHNsaWRlczogQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZVtdKSB7XG5cdFx0dGhpcy5lbnRlcignaW5pdGlhbGl6aW5nJyk7XG5cdFx0Ly8gdGhpcy50cmlnZ2VyKCdpbml0aWFsaXplJyk7XG5cblx0XHR0aGlzLm93bERPTURhdGEucnRsID0gdGhpcy5zZXR0aW5ncy5ydGw7XG5cblx0XHRpZiAodGhpcy5fbWVyZ2Vycy5sZW5ndGgpIHtcblx0XHRcdHRoaXMuX21lcmdlcnMgPSBbXTtcblx0XHR9XG5cblx0XHRzbGlkZXMuZm9yRWFjaChpdGVtID0+IHtcblx0XHRcdGNvbnN0IG1lcmdlTjogbnVtYmVyID0gdGhpcy5zZXR0aW5ncy5tZXJnZSA/IGl0ZW0uZGF0YU1lcmdlIDogMTtcblx0XHRcdHRoaXMuX21lcmdlcnMucHVzaChtZXJnZU4pO1xuXHRcdH0pO1xuXHRcdHRoaXMuX2Nsb25lcyA9IFtdO1xuXG5cdFx0dGhpcy5yZXNldCh0aGlzLl9pc051bWVyaWModGhpcy5zZXR0aW5ncy5zdGFydFBvc2l0aW9uKSA/ICt0aGlzLnNldHRpbmdzLnN0YXJ0UG9zaXRpb24gOiAwKTtcblxuXHRcdHRoaXMuaW52YWxpZGF0ZSgnaXRlbXMnKTtcblx0XHR0aGlzLnJlZnJlc2goKTtcblxuXHRcdHRoaXMub3dsRE9NRGF0YS5pc0xvYWRlZCA9IHRydWU7XG5cdFx0dGhpcy5vd2xET01EYXRhLmlzTW91c2VEcmFnYWJsZSA9IHRoaXMuc2V0dGluZ3MubW91c2VEcmFnO1xuXHRcdHRoaXMub3dsRE9NRGF0YS5pc1RvdWNoRHJhZ2FibGUgPSB0aGlzLnNldHRpbmdzLnRvdWNoRHJhZztcblxuXHRcdHRoaXMuc2VuZENoYW5nZXMoKTtcblxuXHRcdHRoaXMubGVhdmUoJ2luaXRpYWxpemluZycpO1xuXHRcdHRoaXMuX3RyaWdnZXIoJ2luaXRpYWxpemVkJyk7XG5cdH07XG5cblx0LyoqXG5cdCAqIFNlbmRzIGFsbCBkYXRhIG5lZWRlZCBmb3IgVmlld1xuXHQgKi9cblx0c2VuZENoYW5nZXMoKSB7XG5cdFx0dGhpcy5fdmlld1NldHRpbmdzU2hpcHBlciQubmV4dCh7XG5cdFx0XHRvd2xET01EYXRhOiB0aGlzLm93bERPTURhdGEsXG5cdFx0XHRzdGFnZURhdGE6IHRoaXMuc3RhZ2VEYXRhLFxuXHRcdFx0c2xpZGVzRGF0YTogdGhpcy5zbGlkZXNEYXRhLFxuXHRcdFx0bmF2RGF0YTogdGhpcy5uYXZEYXRhLFxuXHRcdFx0ZG90c0RhdGE6IHRoaXMuZG90c0RhdGFcblx0XHR9KTtcblx0fVxuXG5cbiAgLyoqXG5cdCAqIFVwZGF0ZXMgb3B0aW9uIGxvZ2ljIGlmIG5lY2Vzc2VyeVxuXHQgKi9cbiAgcHJpdmF0ZSBfb3B0aW9uc0xvZ2ljKCkge1xuXHRcdGlmICh0aGlzLnNldHRpbmdzLmF1dG9XaWR0aCkge1xuXHRcdFx0dGhpcy5zZXR0aW5ncy5zdGFnZVBhZGRpbmcgPSAwO1xuXHRcdFx0dGhpcy5zZXR0aW5ncy5tZXJnZSA9IGZhbHNlO1xuXHRcdH1cblx0fVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSB2aWV3XG4gICAqL1xuICB1cGRhdGUoKSB7XG4gICAgbGV0IGkgPSAwO1xuICAgIGNvbnN0IG4gPSB0aGlzLl9waXBlLmxlbmd0aCxcbiAgICAgIGZpbHRlciA9IGl0ZW0gPT4gdGhpcy5faW52YWxpZGF0ZWRbaXRlbV0sXG5cdFx0XHRjYWNoZSA9IHt9O1xuXG4gICAgd2hpbGUgKGkgPCBuKSB7XG4gICAgICBjb25zdCBmaWx0ZXJlZFBpcGUgPSB0aGlzLl9waXBlW2ldLmZpbHRlci5maWx0ZXIoZmlsdGVyKTtcbiAgICAgIGlmICh0aGlzLl9pbnZhbGlkYXRlZC5hbGwgfHwgZmlsdGVyZWRQaXBlLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0dGhpcy5fcGlwZVtpXS5ydW4oY2FjaGUpO1xuICAgICAgfVxuICAgICAgaSsrO1xuXHRcdH1cblx0XHR0aGlzLnNsaWRlc0RhdGEuZm9yRWFjaChzbGlkZSA9PiBzbGlkZS5jbGFzc2VzID0gdGhpcy5zZXRDdXJTbGlkZUNsYXNzZXMoc2xpZGUpKTtcblx0XHR0aGlzLnNlbmRDaGFuZ2VzKCk7XG5cbiAgICB0aGlzLl9pbnZhbGlkYXRlZCA9IHt9O1xuXG4gICAgaWYgKCF0aGlzLmlzKCd2YWxpZCcpKSB7XG4gICAgICB0aGlzLmVudGVyKCd2YWxpZCcpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuXHQgKiBHZXRzIHRoZSB3aWR0aCBvZiB0aGUgdmlldy5cblx0ICogQHBhcmFtIFtkaW1lbnNpb249V2lkdGguRGVmYXVsdF0gVGhlIGRpbWVuc2lvbiB0byByZXR1cm5cblx0ICogQHJldHVybnMgVGhlIHdpZHRoIG9mIHRoZSB2aWV3IGluIHBpeGVsLlxuXHQgKi9cbiAgd2lkdGgoZGltZW5zaW9uPzogV2lkdGgpOiBudW1iZXIge1xuXHRcdGRpbWVuc2lvbiA9IGRpbWVuc2lvbiB8fCBXaWR0aC5EZWZhdWx0O1xuXHRcdHN3aXRjaCAoZGltZW5zaW9uKSB7XG5cdFx0XHRjYXNlIFdpZHRoLklubmVyOlxuXHRcdFx0Y2FzZSBXaWR0aC5PdXRlcjpcblx0XHRcdFx0cmV0dXJuIHRoaXMuX3dpZHRoO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0cmV0dXJuIHRoaXMuX3dpZHRoIC0gdGhpcy5zZXR0aW5ncy5zdGFnZVBhZGRpbmcgKiAyICsgdGhpcy5zZXR0aW5ncy5tYXJnaW47XG5cdFx0fVxuXHR9XG5cbiAgLyoqXG5cdCAqIFJlZnJlc2hlcyB0aGUgY2Fyb3VzZWwgcHJpbWFyaWx5IGZvciBhZGFwdGl2ZSBwdXJwb3Nlcy5cblx0ICovXG4gIHJlZnJlc2goKSB7XG5cdFx0dGhpcy5lbnRlcigncmVmcmVzaGluZycpO1xuXHRcdHRoaXMuX3RyaWdnZXIoJ3JlZnJlc2gnKTtcblx0XHR0aGlzLl9kZWZpbmVTbGlkZXNEYXRhKCk7XG5cdFx0dGhpcy5zZXRPcHRpb25zRm9yVmlld3BvcnQoKTtcblxuXHRcdHRoaXMuX29wdGlvbnNMb2dpYygpO1xuXG5cdFx0Ly8gdGhpcy4kZWxlbWVudC5hZGRDbGFzcyh0aGlzLm9wdGlvbnMucmVmcmVzaENsYXNzKTtcblxuXHRcdHRoaXMudXBkYXRlKCk7XG5cblx0XHQvLyB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKHRoaXMub3B0aW9ucy5yZWZyZXNoQ2xhc3MpO1xuXG5cdFx0dGhpcy5sZWF2ZSgncmVmcmVzaGluZycpO1xuXHRcdHRoaXMuX3RyaWdnZXIoJ3JlZnJlc2hlZCcpO1xuXHQgfVxuXG4gIC8qKlxuXHQgKiBDaGVja3Mgd2luZG93IGByZXNpemVgIGV2ZW50LlxuXHQgKiBAcGFyYW0gY3VyV2lkdGggd2lkdGggb2YgLm93bC1jYXJvdXNlbFxuXHQgKi9cbiAgb25SZXNpemUoY3VyV2lkdGg6IG51bWJlcikge1xuXHRcdGlmICghdGhpcy5faXRlbXMubGVuZ3RoKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0dGhpcy5zZXRDYXJvdXNlbFdpZHRoKGN1cldpZHRoKTtcblxuXHRcdHRoaXMuZW50ZXIoJ3Jlc2l6aW5nJyk7XG5cblx0XHQvLyBpZiAodGhpcy50cmlnZ2VyKCdyZXNpemUnKS5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuXHRcdC8vIFx0dGhpcy5sZWF2ZSgncmVzaXppbmcnKTtcblx0XHQvLyBcdHJldHVybiBmYWxzZTtcblx0XHQvLyB9XG5cdFx0dGhpcy5fdHJpZ2dlcigncmVzaXplJyk7XG5cdFx0dGhpcy5pbnZhbGlkYXRlKCd3aWR0aCcpO1xuXG5cdFx0dGhpcy5yZWZyZXNoKCk7XG5cblx0XHR0aGlzLmxlYXZlKCdyZXNpemluZycpO1xuXHRcdHRoaXMuX3RyaWdnZXIoJ3Jlc2l6ZWQnKTtcblx0fVxuXG4gIC8qKlxuXHQgKiBQcmVwYXJlcyBkYXRhIGZvciBkcmFnZ2luZyBjYXJvdXNlbC4gSXQgc3RhcnRzIGFmdGVyIGZpcmluZyBgdG91Y2hzdGFydGAgYW5kIGBtb3VzZWRvd25gIGV2ZW50cy5cblx0ICogQHRvZG8gSG9yaXpvbnRhbCBzd2lwZSB0aHJlc2hvbGQgYXMgb3B0aW9uXG5cdCAqIEB0b2RvICMyNjFcblx0ICogQHBhcmFtIGV2ZW50IC0gVGhlIGV2ZW50IGFyZ3VtZW50cy5cblx0ICogQHJldHVybnMgc3RhZ2UgLSBvYmplY3Qgd2l0aCAneCcgYW5kICd5JyBjb29yZGluYXRlcyBvZiAub3dsLXN0YWdlXG5cdCAqL1xuICBwcmVwYXJlRHJhZ2dpbmcoZXZlbnQ6IGFueSk6IENvb3JkcyB7XG5cdFx0bGV0IHN0YWdlOiBDb29yZHMgPSBudWxsLFxuXHRcdFx0XHR0cmFuc2Zvcm1BcnI6IHN0cmluZ1tdO1xuXG5cdFx0Ly8gY291bGQgYmUgNSBjb21tZW50ZWQgbGluZXMgYmVsb3c7IEhvd2V2ZXIgdGhlcmUncyBzdGFnZSB0cmFuc2Zvcm0gaW4gc3RhZ2VEYXRhIGFuZCBpbiB1cGRhdGVzIGFmdGVyIGVhY2ggbW92ZSBvZiBzdGFnZVxuICAgIC8vIHN0YWdlID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpLnRyYW5zZm9ybS5yZXBsYWNlKC8uKlxcKHxcXCl8IC9nLCAnJykuc3BsaXQoJywnKTtcbiAgICAvLyBzdGFnZSA9IHtcbiAgICAvLyAgIHg6IHN0YWdlW3N0YWdlLmxlbmd0aCA9PT0gMTYgPyAxMiA6IDRdLFxuICAgIC8vICAgeTogc3RhZ2Vbc3RhZ2UubGVuZ3RoID09PSAxNiA/IDEzIDogNV1cblx0XHQvLyB9O1xuXG5cdFx0dHJhbnNmb3JtQXJyID0gdGhpcy5zdGFnZURhdGEudHJhbnNmb3JtLnJlcGxhY2UoLy4qXFwofFxcKXwgfFteLC1cXGRdXFx3fFxcKS9nLCAnJykuc3BsaXQoJywnKTtcbiAgICBzdGFnZSA9IHtcbiAgICAgIHg6ICt0cmFuc2Zvcm1BcnJbMF0sXG4gICAgICB5OiArdHJhbnNmb3JtQXJyWzFdXG4gICAgfTtcblxuXHRcdGlmICh0aGlzLmlzKCdhbmltYXRpbmcnKSkge1xuXHRcdFx0dGhpcy5pbnZhbGlkYXRlKCdwb3NpdGlvbicpO1xuICAgIH1cblxuICAgIGlmIChldmVudC50eXBlID09PSAnbW91c2Vkb3duJykge1xuICAgICAgdGhpcy5vd2xET01EYXRhLmlzR3JhYiA9IHRydWU7XG4gICAgfVxuXG5cdFx0dGhpcy5zcGVlZCgwKTtcblx0XHRyZXR1cm4gc3RhZ2U7XG5cdH1cblxuXHQvKipcblx0ICogRW50ZXJzIGludG8gYSAnZHJhZ2dpbmcnIHN0YXRlXG5cdCAqL1xuXHRlbnRlckRyYWdnaW5nKCkge1xuXHRcdHRoaXMuZW50ZXIoJ2RyYWdnaW5nJyk7XG4gICAgdGhpcy5fdHJpZ2dlcignZHJhZycpO1xuXHR9XG5cbiAgLyoqXG5cdCAqIERlZmluZXMgbmV3IGNvb3JkcyBmb3IgLm93bC1zdGFnZSB3aGlsZSBkcmFnZ2luZyBpdFxuXHQgKiBAdG9kbyAjMjYxXG5cdCAqIEBwYXJhbSBldmVudCB0aGUgZXZlbnQgYXJndW1lbnRzLlxuXHQgKiBAcGFyYW0gZHJhZ0RhdGEgaW5pdGlhbCBkYXRhIGdvdCBhZnRlciBzdGFydGluZyBkcmFnZ2luZ1xuXHQgKiBAcmV0dXJucyBjb29yZHMgb3IgZmFsc2Vcblx0ICovXG4gIGRlZmluZU5ld0Nvb3Jkc0RyYWcoZXZlbnQ6IGFueSwgZHJhZ0RhdGE6IGFueSk6IGJvb2xlYW4gfCBDb29yZHMge1xuXHRcdGxldCBtaW5pbXVtID0gbnVsbCxcblx0XHRtYXhpbXVtID0gbnVsbCxcblx0XHRwdWxsID0gbnVsbDtcblx0XHRjb25zdFx0ZGVsdGEgPSB0aGlzLmRpZmZlcmVuY2UoZHJhZ0RhdGEucG9pbnRlciwgdGhpcy5wb2ludGVyKGV2ZW50KSksXG5cdFx0XHRzdGFnZSA9IHRoaXMuZGlmZmVyZW5jZShkcmFnRGF0YS5zdGFnZS5zdGFydCwgZGVsdGEpO1xuXG5cdFx0aWYgKCF0aGlzLmlzKCdkcmFnZ2luZycpKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3MubG9vcCkge1xuXHRcdFx0bWluaW11bSA9IHRoaXMuY29vcmRpbmF0ZXModGhpcy5taW5pbXVtKCkpO1xuXHRcdFx0bWF4aW11bSA9ICt0aGlzLmNvb3JkaW5hdGVzKHRoaXMubWF4aW11bSgpICsgMSkgLSBtaW5pbXVtO1xuXHRcdFx0c3RhZ2UueCA9ICgoKHN0YWdlLnggLSBtaW5pbXVtKSAlIG1heGltdW0gKyBtYXhpbXVtKSAlIG1heGltdW0pICsgbWluaW11bTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bWluaW11bSA9IHRoaXMuc2V0dGluZ3MucnRsID8gdGhpcy5jb29yZGluYXRlcyh0aGlzLm1heGltdW0oKSkgOiB0aGlzLmNvb3JkaW5hdGVzKHRoaXMubWluaW11bSgpKTtcblx0XHRcdG1heGltdW0gPSB0aGlzLnNldHRpbmdzLnJ0bCA/IHRoaXMuY29vcmRpbmF0ZXModGhpcy5taW5pbXVtKCkpIDogdGhpcy5jb29yZGluYXRlcyh0aGlzLm1heGltdW0oKSk7XG5cdFx0XHRwdWxsID0gdGhpcy5zZXR0aW5ncy5wdWxsRHJhZyA/IC0xICogZGVsdGEueCAvIDUgOiAwO1xuXHRcdFx0c3RhZ2UueCA9IE1hdGgubWF4KE1hdGgubWluKHN0YWdlLngsIG1pbmltdW0gKyBwdWxsKSwgbWF4aW11bSArIHB1bGwpO1xuXHRcdH1cblxuXHRcdHJldHVybiBzdGFnZTtcblx0fVxuXG4gIC8qKlxuXHQgKiBGaW5pc2hlcyBkcmFnZ2luZyBvZiBjYXJvdXNlbCB3aGVuIGB0b3VjaGVuZGAgYW5kIGBtb3VzZXVwYCBldmVudHMgZmlyZS5cblx0ICogQHRvZG8gIzI2MVxuXHQgKiBAdG9kbyBUaHJlc2hvbGQgZm9yIGNsaWNrIGV2ZW50XG5cdCAqIEBwYXJhbSBldmVudCB0aGUgZXZlbnQgYXJndW1lbnRzLlxuXHQgKiBAcGFyYW0gZHJhZ09iaiB0aGUgb2JqZWN0IHdpdGggZHJhZ2dpbmcgc2V0dGluZ3MgYW5kIHN0YXRlc1xuXHQgKiBAcGFyYW0gY2xpY2tBdHRhY2hlciBmdW5jdGlvbiB3aGljaCBhdHRhY2hlcyBjbGljayBoYW5kbGVyIHRvIHNsaWRlIG9yIGl0cyBjaGlsZHJlbiBlbGVtZW50cyBpbiBvcmRlciB0byBwcmV2ZW50IGV2ZW50IGJ1Ymxpbmdcblx0ICovXG4gIGZpbmlzaERyYWdnaW5nKGV2ZW50OiBhbnksIGRyYWdPYmo6IGFueSwgY2xpY2tBdHRhY2hlcjogKCkgPT4gdm9pZCkge1xuXHRcdGNvbnN0IGRpcmVjdGlvbnMgPSBbJ3JpZ2h0JywgJ2xlZnQnXSxcblx0XHRcdFx0ZGVsdGEgPSB0aGlzLmRpZmZlcmVuY2UoZHJhZ09iai5wb2ludGVyLCB0aGlzLnBvaW50ZXIoZXZlbnQpKSxcbiAgICAgICAgc3RhZ2UgPSBkcmFnT2JqLnN0YWdlLmN1cnJlbnQsXG5cdFx0XHRcdGRpcmVjdGlvbiA9IGRpcmVjdGlvbnNbKyh0aGlzLnNldHRpbmdzLnJ0bCA/IGRlbHRhLnggPCArdGhpcy5zZXR0aW5ncy5ydGwgOiBkZWx0YS54ID4gK3RoaXMuc2V0dGluZ3MucnRsKV07XG5cdFx0bGV0IGN1cnJlbnRTbGlkZUk6IG51bWJlciwgY3VycmVudDogbnVtYmVyLCBuZXdDdXJyZW50OiBudW1iZXI7XG5cblx0XHRpZiAoZGVsdGEueCAhPT0gMCAmJiB0aGlzLmlzKCdkcmFnZ2luZycpIHx8ICF0aGlzLmlzKCd2YWxpZCcpKSB7XG4gICAgICAgIHRoaXMuc3BlZWQoK3RoaXMuc2V0dGluZ3MuZHJhZ0VuZFNwZWVkIHx8IHRoaXMuc2V0dGluZ3Muc21hcnRTcGVlZCk7XG5cdFx0XHRcdGN1cnJlbnRTbGlkZUkgPSB0aGlzLmNsb3Nlc3Qoc3RhZ2UueCwgZGVsdGEueCAhPT0gMCA/IGRpcmVjdGlvbiA6IGRyYWdPYmouZGlyZWN0aW9uKTtcblx0XHRcdFx0Y3VycmVudCA9IHRoaXMuY3VycmVudCgpO1xuICAgICAgICBuZXdDdXJyZW50ID0gdGhpcy5jdXJyZW50KGN1cnJlbnRTbGlkZUkgPT09IC0xID8gdW5kZWZpbmVkIDogY3VycmVudFNsaWRlSSk7XG5cblx0XHRcdFx0aWYgKGN1cnJlbnQgIT09IG5ld0N1cnJlbnQpIHtcblx0XHRcdFx0XHR0aGlzLmludmFsaWRhdGUoJ3Bvc2l0aW9uJyk7XG5cdFx0XHRcdFx0dGhpcy51cGRhdGUoKTtcblx0XHRcdFx0fVxuXG4gICAgICAgIGRyYWdPYmouZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuXG4gICAgICAgIGlmIChNYXRoLmFicyhkZWx0YS54KSA+IDMgfHwgbmV3IERhdGUoKS5nZXRUaW1lKCkgLSBkcmFnT2JqLnRpbWUgPiAzMDApIHtcblx0XHRcdFx0XHRjbGlja0F0dGFjaGVyKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5pcygnZHJhZ2dpbmcnKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cdFx0XHR0aGlzLmxlYXZlKCdkcmFnZ2luZycpO1xuXHRcdFx0dGhpcy5fdHJpZ2dlcignZHJhZ2dlZCcpXG5cdCB9XG5cbiAgLyoqXG5cdCAqIEdldHMgYWJzb2x1dGUgcG9zaXRpb24gb2YgdGhlIGNsb3Nlc3QgaXRlbSBmb3IgYSBjb29yZGluYXRlLlxuXHQgKiBAdG9kbyBTZXR0aW5nIGBmcmVlRHJhZ2AgbWFrZXMgYGNsb3Nlc3RgIG5vdCByZXVzYWJsZS4gU2VlICMxNjUuXG5cdCAqIEBwYXJhbSBjb29yZGluYXRlIFRoZSBjb29yZGluYXRlIGluIHBpeGVsLlxuXHQgKiBAcGFyYW0gZGlyZWN0aW9uIFRoZSBkaXJlY3Rpb24gdG8gY2hlY2sgZm9yIHRoZSBjbG9zZXN0IGl0ZW0uIEV0aGVyIGBsZWZ0YCBvciBgcmlnaHRgLlxuXHQgKiBAcmV0dXJucyBUaGUgYWJzb2x1dGUgcG9zaXRpb24gb2YgdGhlIGNsb3Nlc3QgaXRlbS5cblx0ICovXG4gIGNsb3Nlc3QoY29vcmRpbmF0ZTogbnVtYmVyLCBkaXJlY3Rpb246IHN0cmluZyk6IG51bWJlciB7XG5cdFx0Y29uc3QgcHVsbCA9IDMwLFxuXHRcdFx0d2lkdGggPSB0aGlzLndpZHRoKCk7XG5cdFx0bGV0XHRjb29yZGluYXRlczogbnVtYmVyW10gPSB0aGlzLmNvb3JkaW5hdGVzKCkgYXMgbnVtYmVyW10sXG5cdFx0IHBvc2l0aW9uID0gLTE7XG5cblx0XHRpZiAodGhpcy5zZXR0aW5ncy5jZW50ZXIpIHtcblx0XHRcdGNvb3JkaW5hdGVzID0gY29vcmRpbmF0ZXMubWFwKGl0ZW0gPT4ge1xuXHRcdFx0XHRpZiAoaXRlbSA9PT0gMCkge1xuXHRcdFx0XHRcdGl0ZW0gKz0gMC4wMDAwMDE7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGl0ZW07XG5cdFx0XHR9KVxuXHRcdH1cblxuXHRcdC8vIG9wdGlvbiAnZnJlZURyYWcnIGRvZXNuJ3QgaGF2ZSByZWFsaXphdGlvbiBhbmQgdXNpbmcgaXQgaGVyZSBjcmVhdGVzIHByb2JsZW06XG5cdFx0Ly8gdmFyaWFibGUgJ3Bvc2l0aW9uJyBzdGF5cyB1bmNoYW5nZWQgKGl0IGVxdWFscyAtMSBhdCB0aGUgYmVnZ2luZykgYW5kIHRodXMgbWV0aG9kIHJldHVybnMgLTFcblx0XHQvLyBSZXR1cm5pbmcgdmFsdWUgaXMgY29uc3VtZWQgYnkgbWV0aG9kIGN1cnJlbnQoKSwgd2hpY2ggdGFraW5nIC0xIGFzIGFyZ3VtZW50IGNhbGN1bGF0ZXMgdGhlIGluZGV4IG9mIG5ldyBjdXJyZW50IHNsaWRlXG5cdFx0Ly8gSW4gY2FzZSBvZiBoYXZpbmcgNSBzbGlkZXMgYW5zICdsb29wPWZhbHNlOyBjYWxsaW5nICdjdXJyZW50KC0xKScgc2V0cyBwcm9wcyAnX2N1cnJlbnQnIGFzIDQuIEp1c3QgbGFzdCBzbGlkZSByZW1haW5zIHZpc2libGUgaW5zdGVhZCBvZiAzIGxhc3Qgc2xpZGVzLlxuXG5cdFx0Ly8gaWYgKCF0aGlzLnNldHRpbmdzLmZyZWVEcmFnKSB7XG5cdFx0XHQvLyBjaGVjayBjbG9zZXN0IGl0ZW1cblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgY29vcmRpbmF0ZXMubGVuZ3RoOyBpKyspIHtcblxuXHRcdFx0XHRpZiAoZGlyZWN0aW9uID09PSAnbGVmdCcgJiYgY29vcmRpbmF0ZSA+IGNvb3JkaW5hdGVzW2ldIC0gcHVsbCAmJiBjb29yZGluYXRlIDwgY29vcmRpbmF0ZXNbaV0gKyBwdWxsKSB7XG5cdFx0XHRcdFx0cG9zaXRpb24gPSBpO1xuXHRcdFx0XHQvLyBvbiBhIHJpZ2h0IHB1bGwsIGNoZWNrIG9uIHByZXZpb3VzIGluZGV4XG5cdFx0XHRcdC8vIHRvIGRvIHNvLCBzdWJ0cmFjdCB3aWR0aCBmcm9tIHZhbHVlIGFuZCBzZXQgcG9zaXRpb24gPSBpbmRleCArIDFcblx0XHRcdFx0fSBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICdyaWdodCcgJiYgY29vcmRpbmF0ZSA+IGNvb3JkaW5hdGVzW2ldIC0gd2lkdGggLSBwdWxsICYmIGNvb3JkaW5hdGUgPCBjb29yZGluYXRlc1tpXSAtIHdpZHRoICsgcHVsbCkge1xuXHRcdFx0XHRcdHBvc2l0aW9uID0gaSArIDE7XG5cdFx0XHRcdH0gZWxzZSBpZiAodGhpcy5fb3AoY29vcmRpbmF0ZSwgJzwnLCBjb29yZGluYXRlc1tpXSlcblx0XHRcdFx0XHQmJiB0aGlzLl9vcChjb29yZGluYXRlLCAnPicsIGNvb3JkaW5hdGVzW2kgKyAxXSB8fCBjb29yZGluYXRlc1tpXSAtIHdpZHRoKSkge1xuXHRcdFx0XHRcdHBvc2l0aW9uID0gZGlyZWN0aW9uID09PSAnbGVmdCcgPyBpICsgMSA6IGk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBudWxsICYmIGNvb3JkaW5hdGUgPiBjb29yZGluYXRlc1tpXSAtIHB1bGwgJiYgY29vcmRpbmF0ZSA8IGNvb3JkaW5hdGVzW2ldICsgcHVsbCkge1xuXHRcdFx0XHRcdHBvc2l0aW9uID0gaTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChwb3NpdGlvbiAhPT0gLTEpIHsgYnJlYWsgfTtcblx0XHRcdH1cblx0XHQvLyB9XG5cblx0XHRpZiAoIXRoaXMuc2V0dGluZ3MubG9vcCkge1xuXHRcdFx0Ly8gbm9uIGxvb3AgYm91bmRyaWVzXG5cdFx0XHRpZiAodGhpcy5fb3AoY29vcmRpbmF0ZSwgJz4nLCBjb29yZGluYXRlc1t0aGlzLm1pbmltdW0oKV0pKSB7XG5cdFx0XHRcdHBvc2l0aW9uID0gY29vcmRpbmF0ZSA9IHRoaXMubWluaW11bSgpO1xuXHRcdFx0fSBlbHNlIGlmICh0aGlzLl9vcChjb29yZGluYXRlLCAnPCcsIGNvb3JkaW5hdGVzW3RoaXMubWF4aW11bSgpXSkpIHtcblx0XHRcdFx0cG9zaXRpb24gPSBjb29yZGluYXRlID0gdGhpcy5tYXhpbXVtKCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHBvc2l0aW9uO1xuXHQgfVxuXG4gIC8qKlxuXHQgKiBBbmltYXRlcyB0aGUgc3RhZ2UuXG5cdCAqIEB0b2RvICMyNzBcblx0ICogQHBhcmFtIGNvb3JkaW5hdGUgVGhlIGNvb3JkaW5hdGUgaW4gcGl4ZWxzLlxuXHQgKi9cbiAgYW5pbWF0ZShjb29yZGluYXRlOiBudW1iZXIgfCBudW1iZXJbXSkge1xuXHRcdGNvbnN0IGFuaW1hdGUgPSB0aGlzLnNwZWVkKCkgPiAwO1xuXG5cdFx0aWYgKHRoaXMuaXMoJ2FuaW1hdGluZycpKSB7XG5cdFx0XHR0aGlzLm9uVHJhbnNpdGlvbkVuZCgpO1xuXHRcdH1cblxuXHRcdGlmIChhbmltYXRlKSB7XG5cdFx0XHR0aGlzLmVudGVyKCdhbmltYXRpbmcnKTtcblx0XHRcdHRoaXMuX3RyaWdnZXIoJ3RyYW5zbGF0ZScpO1xuXHRcdH1cblxuXHRcdHRoaXMuc3RhZ2VEYXRhLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgnICsgY29vcmRpbmF0ZSArICdweCwwcHgsMHB4KSc7XG5cdFx0dGhpcy5zdGFnZURhdGEudHJhbnNpdGlvbiA9ICh0aGlzLnNwZWVkKCkgLyAxMDAwKSArICdzJyArIChcblx0XHRcdHRoaXMuc2V0dGluZ3Muc2xpZGVUcmFuc2l0aW9uID8gJyAnICsgdGhpcy5zZXR0aW5ncy5zbGlkZVRyYW5zaXRpb24gOiAnJ1xuXHRcdCk7XG5cblx0XHQvLyBhbHNvIHRoZXJlIHdhcyB0cmFuc2l0aW9uIGJ5IG1lYW5zIG9mIEpRdWVyeS5hbmltYXRlIG9yIGNzcy1jaGFuZ2luZyBwcm9wZXJ0eSBsZWZ0XG5cdCB9XG5cbiAgLyoqXG5cdCAqIENoZWNrcyB3aGV0aGVyIHRoZSBjYXJvdXNlbCBpcyBpbiBhIHNwZWNpZmljIHN0YXRlIG9yIG5vdC5cblx0ICogQHBhcmFtIHN0YXRlIFRoZSBzdGF0ZSB0byBjaGVjay5cblx0ICogQHJldHVybnMgVGhlIGZsYWcgd2hpY2ggaW5kaWNhdGVzIGlmIHRoZSBjYXJvdXNlbCBpcyBidXN5LlxuXHQgKi9cbiAgaXMoc3RhdGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuXHRcdHJldHVybiB0aGlzLl9zdGF0ZXMuY3VycmVudFtzdGF0ZV0gJiYgdGhpcy5fc3RhdGVzLmN1cnJlbnRbc3RhdGVdID4gMDtcbiAgfTtcblxuICAvKipcblx0ICogU2V0cyB0aGUgYWJzb2x1dGUgcG9zaXRpb24gb2YgdGhlIGN1cnJlbnQgaXRlbS5cblx0ICogQHBhcmFtIHBvc2l0aW9uIFRoZSBuZXcgYWJzb2x1dGUgcG9zaXRpb24gb3Igbm90aGluZyB0byBsZWF2ZSBpdCB1bmNoYW5nZWQuXG5cdCAqIEByZXR1cm5zIFRoZSBhYnNvbHV0ZSBwb3NpdGlvbiBvZiB0aGUgY3VycmVudCBpdGVtLlxuXHQgKi9cbiAgY3VycmVudChwb3NpdGlvbj86IG51bWJlcik6IG51bWJlciB7XG5cdFx0aWYgKHBvc2l0aW9uID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHJldHVybiB0aGlzLl9jdXJyZW50O1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLl9pdGVtcy5sZW5ndGggPT09IDApIHtcblx0XHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdFx0fVxuXG5cdFx0cG9zaXRpb24gPSB0aGlzLm5vcm1hbGl6ZShwb3NpdGlvbik7XG5cblx0XHRpZiAodGhpcy5fY3VycmVudCAhPT0gcG9zaXRpb24pIHtcblx0XHRcdGNvbnN0IGV2ZW50ID0gdGhpcy5fdHJpZ2dlcignY2hhbmdlJywgeyBwcm9wZXJ0eTogeyBuYW1lOiAncG9zaXRpb24nLCB2YWx1ZTogcG9zaXRpb24gfSB9KTtcblxuXHRcdFx0Ly8gaWYgKGV2ZW50LmRhdGEgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0Ly8gXHRwb3NpdGlvbiA9IHRoaXMubm9ybWFsaXplKGV2ZW50LmRhdGEpO1xuXHRcdFx0Ly8gfVxuXG5cdFx0XHR0aGlzLl9jdXJyZW50ID0gcG9zaXRpb247XG5cblx0XHRcdHRoaXMuaW52YWxpZGF0ZSgncG9zaXRpb24nKTtcblx0XHRcdHRoaXMuX3RyaWdnZXIoJ2NoYW5nZWQnLCB7IHByb3BlcnR5OiB7IG5hbWU6ICdwb3NpdGlvbicsIHZhbHVlOiB0aGlzLl9jdXJyZW50IH0gfSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMuX2N1cnJlbnQ7XG5cdCB9XG5cbiAgLyoqXG5cdCAqIEludmFsaWRhdGVzIHRoZSBnaXZlbiBwYXJ0IG9mIHRoZSB1cGRhdGUgcm91dGluZS5cblx0ICogQHBhcmFtIHBhcnQgVGhlIHBhcnQgdG8gaW52YWxpZGF0ZS5cblx0ICogQHJldHVybnMgVGhlIGludmFsaWRhdGVkIHBhcnRzLlxuXHQgKi9cbiAgaW52YWxpZGF0ZShwYXJ0OiBzdHJpbmcpOiBzdHJpbmdbXSB7XG5cdFx0aWYgKHR5cGVvZiBwYXJ0ID09PSAnc3RyaW5nJykge1xuXHRcdFx0dGhpcy5faW52YWxpZGF0ZWRbcGFydF0gPSB0cnVlO1xuXHRcdFx0aWYodGhpcy5pcygndmFsaWQnKSkgeyB0aGlzLmxlYXZlKCd2YWxpZCcpOyB9XG5cdFx0fVxuXHRcdHJldHVybiBPYmplY3Qua2V5cyh0aGlzLl9pbnZhbGlkYXRlZCk7XG4gIH07XG5cblx0LyoqXG5cdCAqIFJlc2V0cyB0aGUgYWJzb2x1dGUgcG9zaXRpb24gb2YgdGhlIGN1cnJlbnQgaXRlbS5cblx0ICogQHBhcmFtIHBvc2l0aW9uIHRoZSBhYnNvbHV0ZSBwb3NpdGlvbiBvZiB0aGUgbmV3IGl0ZW0uXG5cdCAqL1xuICByZXNldChwb3NpdGlvbjogbnVtYmVyKSB7XG5cdFx0cG9zaXRpb24gPSB0aGlzLm5vcm1hbGl6ZShwb3NpdGlvbik7XG5cblx0XHRpZiAocG9zaXRpb24gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHRoaXMuX3NwZWVkID0gMDtcblx0XHR0aGlzLl9jdXJyZW50ID0gcG9zaXRpb247XG5cblx0XHR0aGlzLl9zdXBwcmVzcyhbICd0cmFuc2xhdGUnLCAndHJhbnNsYXRlZCcgXSk7XG5cblx0XHR0aGlzLmFuaW1hdGUodGhpcy5jb29yZGluYXRlcyhwb3NpdGlvbikpO1xuXG5cdFx0dGhpcy5fcmVsZWFzZShbICd0cmFuc2xhdGUnLCAndHJhbnNsYXRlZCcgXSk7XG5cdH1cblxuICAvKipcblx0ICogTm9ybWFsaXplcyBhbiBhYnNvbHV0ZSBvciBhIHJlbGF0aXZlIHBvc2l0aW9uIG9mIGFuIGl0ZW0uXG5cdCAqIEBwYXJhbSBwb3NpdGlvbiBUaGUgYWJzb2x1dGUgb3IgcmVsYXRpdmUgcG9zaXRpb24gdG8gbm9ybWFsaXplLlxuXHQgKiBAcGFyYW0gcmVsYXRpdmUgV2hldGhlciB0aGUgZ2l2ZW4gcG9zaXRpb24gaXMgcmVsYXRpdmUgb3Igbm90LlxuXHQgKiBAcmV0dXJucyBUaGUgbm9ybWFsaXplZCBwb3NpdGlvbi5cblx0ICovXG4gIG5vcm1hbGl6ZShwb3NpdGlvbjogbnVtYmVyLCByZWxhdGl2ZT86IGJvb2xlYW4pOiBudW1iZXIge1xuXHRcdGNvbnN0IG4gPSB0aGlzLl9pdGVtcy5sZW5ndGgsXG5cdFx0XHRcdFx0bSA9IHJlbGF0aXZlID8gMCA6IHRoaXMuX2Nsb25lcy5sZW5ndGg7XG5cblx0XHRpZiAoIXRoaXMuX2lzTnVtZXJpYyhwb3NpdGlvbikgfHwgbiA8IDEpIHtcblx0XHRcdHBvc2l0aW9uID0gdW5kZWZpbmVkO1xuXHRcdH0gZWxzZSBpZiAocG9zaXRpb24gPCAwIHx8IHBvc2l0aW9uID49IG4gKyBtKSB7XG5cdFx0XHRwb3NpdGlvbiA9ICgocG9zaXRpb24gLSBtIC8gMikgJSBuICsgbikgJSBuICsgbSAvIDI7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHBvc2l0aW9uO1xuXHQgfVxuXG4gIC8qKlxuXHQgKiBDb252ZXJ0cyBhbiBhYnNvbHV0ZSBwb3NpdGlvbiBvZiBhbiBpdGVtIGludG8gYSByZWxhdGl2ZSBvbmUuXG5cdCAqIEBwYXJhbSBwb3NpdGlvbiBUaGUgYWJzb2x1dGUgcG9zaXRpb24gdG8gY29udmVydC5cblx0ICogQHJldHVybnMgVGhlIGNvbnZlcnRlZCBwb3NpdGlvbi5cblx0ICovXG4gIHJlbGF0aXZlKHBvc2l0aW9uOiBudW1iZXIpOiBudW1iZXIge1xuXHRcdHBvc2l0aW9uIC09IHRoaXMuX2Nsb25lcy5sZW5ndGggLyAyO1xuXHRcdHJldHVybiB0aGlzLm5vcm1hbGl6ZShwb3NpdGlvbiwgdHJ1ZSk7XG5cdH1cblxuICAvKipcblx0ICogR2V0cyB0aGUgbWF4aW11bSBwb3NpdGlvbiBmb3IgdGhlIGN1cnJlbnQgaXRlbS5cblx0ICogQHBhcmFtIHJlbGF0aXZlIFdoZXRoZXIgdG8gcmV0dXJuIGFuIGFic29sdXRlIHBvc2l0aW9uIG9yIGEgcmVsYXRpdmUgcG9zaXRpb24uXG5cdCAqIEByZXR1cm5zIG51bWJlciBvZiBtYXhpbXVtIHBvc2l0aW9uXG5cdCAqL1xuICBtYXhpbXVtKHJlbGF0aXZlOiBib29sZWFuID0gZmFsc2UpOiBudW1iZXIge1xuXHRcdGNvbnN0IHNldHRpbmdzID0gdGhpcy5zZXR0aW5ncztcblx0XHRsZXRcdG1heGltdW0gPSB0aGlzLl9jb29yZGluYXRlcy5sZW5ndGgsXG5cdFx0XHRpdGVyYXRvcixcblx0XHRcdHJlY2lwcm9jYWxJdGVtc1dpZHRoLFxuXHRcdFx0ZWxlbWVudFdpZHRoO1xuXG5cdFx0aWYgKHNldHRpbmdzLmxvb3ApIHtcblx0XHRcdG1heGltdW0gPSB0aGlzLl9jbG9uZXMubGVuZ3RoIC8gMiArIHRoaXMuX2l0ZW1zLmxlbmd0aCAtIDE7XG5cdFx0fSBlbHNlIGlmIChzZXR0aW5ncy5hdXRvV2lkdGggfHwgc2V0dGluZ3MubWVyZ2UpIHtcblx0XHRcdGl0ZXJhdG9yID0gdGhpcy5faXRlbXMubGVuZ3RoO1xuXHRcdFx0cmVjaXByb2NhbEl0ZW1zV2lkdGggPSB0aGlzLnNsaWRlc0RhdGFbLS1pdGVyYXRvcl0ud2lkdGg7XG5cdFx0XHRlbGVtZW50V2lkdGggPSB0aGlzLl93aWR0aDtcblx0XHRcdHdoaWxlIChpdGVyYXRvci0tKSB7XG5cdFx0XHRcdC8vIGl0IGNvdWxkIGJlIHVzZSB0aGlzLl9pdGVtcyBpbnN0ZWFkIG9mIHRoaXMuc2xpZGVzRGF0YTtcblx0XHRcdFx0cmVjaXByb2NhbEl0ZW1zV2lkdGggKz0gK3RoaXMuc2xpZGVzRGF0YVtpdGVyYXRvcl0ud2lkdGggKyB0aGlzLnNldHRpbmdzLm1hcmdpbjtcblx0XHRcdFx0aWYgKHJlY2lwcm9jYWxJdGVtc1dpZHRoID4gZWxlbWVudFdpZHRoKSB7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdG1heGltdW0gPSBpdGVyYXRvciArIDE7XG5cdFx0fSBlbHNlIGlmIChzZXR0aW5ncy5jZW50ZXIpIHtcblx0XHRcdG1heGltdW0gPSB0aGlzLl9pdGVtcy5sZW5ndGggLSAxO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRtYXhpbXVtID0gdGhpcy5faXRlbXMubGVuZ3RoIC0gc2V0dGluZ3MuaXRlbXM7XG5cdFx0fVxuXG5cdFx0aWYgKHJlbGF0aXZlKSB7XG5cdFx0XHRtYXhpbXVtIC09IHRoaXMuX2Nsb25lcy5sZW5ndGggLyAyO1xuXHRcdH1cblxuXHRcdHJldHVybiBNYXRoLm1heChtYXhpbXVtLCAwKTtcblx0IH1cblxuICAvKipcblx0ICogR2V0cyB0aGUgbWluaW11bSBwb3NpdGlvbiBmb3IgdGhlIGN1cnJlbnQgaXRlbS5cblx0ICogQHBhcmFtIHJlbGF0aXZlIFdoZXRoZXIgdG8gcmV0dXJuIGFuIGFic29sdXRlIHBvc2l0aW9uIG9yIGEgcmVsYXRpdmUgcG9zaXRpb24uXG5cdCAqIEByZXR1cm5zIG51bWJlciBvZiBtaW5pbXVtIHBvc2l0aW9uXG5cdCAqL1xuICBtaW5pbXVtKHJlbGF0aXZlOiBib29sZWFuID0gZmFsc2UpOiBudW1iZXIge1xuXHRcdHJldHVybiByZWxhdGl2ZSA/IDAgOiB0aGlzLl9jbG9uZXMubGVuZ3RoIC8gMjtcblx0fVxuXG4gIC8qKlxuXHQgKiBHZXRzIGFuIGl0ZW0gYXQgdGhlIHNwZWNpZmllZCByZWxhdGl2ZSBwb3NpdGlvbi5cblx0ICogQHBhcmFtIHBvc2l0aW9uIFRoZSByZWxhdGl2ZSBwb3NpdGlvbiBvZiB0aGUgaXRlbS5cblx0ICogQHJldHVybnMgVGhlIGl0ZW0gYXQgdGhlIGdpdmVuIHBvc2l0aW9uIG9yIGFsbCBpdGVtcyBpZiBubyBwb3NpdGlvbiB3YXMgZ2l2ZW4uXG5cdCAqL1xuICBpdGVtcyhwb3NpdGlvbj86IG51bWJlcik6IENhcm91c2VsU2xpZGVEaXJlY3RpdmVbXSB7XG5cdFx0aWYgKHBvc2l0aW9uID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHJldHVybiB0aGlzLl9pdGVtcy5zbGljZSgpO1xuXHRcdH1cblxuXHRcdHBvc2l0aW9uID0gdGhpcy5ub3JtYWxpemUocG9zaXRpb24sIHRydWUpO1xuXHRcdHJldHVybiBbdGhpcy5faXRlbXNbcG9zaXRpb25dXTtcblx0IH1cblxuICAvKipcblx0ICogR2V0cyBhbiBpdGVtIGF0IHRoZSBzcGVjaWZpZWQgcmVsYXRpdmUgcG9zaXRpb24uXG5cdCAqIEBwYXJhbSBwb3NpdGlvbiBUaGUgcmVsYXRpdmUgcG9zaXRpb24gb2YgdGhlIGl0ZW0uXG5cdCAqIEByZXR1cm5zIFRoZSBpdGVtIGF0IHRoZSBnaXZlbiBwb3NpdGlvbiBvciBhbGwgaXRlbXMgaWYgbm8gcG9zaXRpb24gd2FzIGdpdmVuLlxuXHQgKi9cbiAgbWVyZ2Vycyhwb3NpdGlvbjogbnVtYmVyKTogbnVtYmVyIHwgbnVtYmVyW10ge1xuXHRcdGlmIChwb3NpdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5fbWVyZ2Vycy5zbGljZSgpO1xuXHRcdH1cblxuXHRcdHBvc2l0aW9uID0gdGhpcy5ub3JtYWxpemUocG9zaXRpb24sIHRydWUpO1xuXHRcdHJldHVybiB0aGlzLl9tZXJnZXJzW3Bvc2l0aW9uXTtcblx0IH1cblxuICAvKipcblx0ICogR2V0cyB0aGUgYWJzb2x1dGUgcG9zaXRpb25zIG9mIGNsb25lcyBmb3IgYW4gaXRlbS5cblx0ICogQHBhcmFtIHBvc2l0aW9uIFRoZSByZWxhdGl2ZSBwb3NpdGlvbiBvZiB0aGUgaXRlbS5cblx0ICogQHJldHVybnMgVGhlIGFic29sdXRlIHBvc2l0aW9ucyBvZiBjbG9uZXMgZm9yIHRoZSBpdGVtIG9yIGFsbCBpZiBubyBwb3NpdGlvbiB3YXMgZ2l2ZW4uXG5cdCAqL1xuICBjbG9uZXMocG9zaXRpb24/OiBudW1iZXIpOiBudW1iZXJbXSB7XG5cdFx0Y29uc3Qgb2RkID0gdGhpcy5fY2xvbmVzLmxlbmd0aCAvIDIsXG5cdFx0XHRldmVuID0gb2RkICsgdGhpcy5faXRlbXMubGVuZ3RoLFxuXHRcdFx0bWFwID0gaW5kZXggPT4gaW5kZXggJSAyID09PSAwID8gZXZlbiArIGluZGV4IC8gMiA6IG9kZCAtIChpbmRleCArIDEpIC8gMjtcblxuXHRcdGlmIChwb3NpdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5fY2xvbmVzLm1hcCgodiwgaSkgPT4gbWFwKGkpKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5fY2xvbmVzLm1hcCgodiwgaSkgPT4gdiA9PT0gcG9zaXRpb24gPyBtYXAoaSkgOiBudWxsKS5maWx0ZXIoaXRlbSA9PiBpdGVtKTtcblx0fVxuXG4gIC8qKlxuXHQgKiBTZXRzIHRoZSBjdXJyZW50IGFuaW1hdGlvbiBzcGVlZC5cblx0ICogQHBhcmFtIHNwZWVkIFRoZSBhbmltYXRpb24gc3BlZWQgaW4gbWlsbGlzZWNvbmRzIG9yIG5vdGhpbmcgdG8gbGVhdmUgaXQgdW5jaGFuZ2VkLlxuXHQgKiBAcmV0dXJucyBUaGUgY3VycmVudCBhbmltYXRpb24gc3BlZWQgaW4gbWlsbGlzZWNvbmRzLlxuXHQgKi9cbiAgc3BlZWQoc3BlZWQ/OiBudW1iZXIpOiBudW1iZXIge1xuXHRcdGlmIChzcGVlZCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR0aGlzLl9zcGVlZCA9IHNwZWVkO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLl9zcGVlZDtcblx0fVxuXG4gIC8qKlxuXHQgKiBHZXRzIHRoZSBjb29yZGluYXRlIG9mIGFuIGl0ZW0uXG5cdCAqIEB0b2RvIFRoZSBuYW1lIG9mIHRoaXMgbWV0aG9kIGlzIG1pc3NsZWFuZGluZy5cblx0ICogQHBhcmFtIHBvc2l0aW9uIFRoZSBhYnNvbHV0ZSBwb3NpdGlvbiBvZiB0aGUgaXRlbSB3aXRoaW4gYG1pbmltdW0oKWAgYW5kIGBtYXhpbXVtKClgLlxuXHQgKiBAcmV0dXJucyBUaGUgY29vcmRpbmF0ZSBvZiB0aGUgaXRlbSBpbiBwaXhlbCBvciBhbGwgY29vcmRpbmF0ZXMuXG5cdCAqL1xuICBjb29yZGluYXRlcyhwb3NpdGlvbj86IG51bWJlcik6IG51bWJlciB8IG51bWJlcltdIHtcblx0XHRsZXQgbXVsdGlwbGllciA9IDEsXG5cdFx0XHRuZXdQb3NpdGlvbiA9IHBvc2l0aW9uIC0gMSxcblx0XHRcdGNvb3JkaW5hdGUsXG5cdFx0XHRyZXN1bHQ6IG51bWJlcltdO1xuXG5cdFx0aWYgKHBvc2l0aW9uID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHJlc3VsdCA9IHRoaXMuX2Nvb3JkaW5hdGVzLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuY29vcmRpbmF0ZXMoaW5kZXgpIGFzIG51bWJlcjtcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5zZXR0aW5ncy5jZW50ZXIpIHtcblx0XHRcdGlmICh0aGlzLnNldHRpbmdzLnJ0bCkge1xuXHRcdFx0XHRtdWx0aXBsaWVyID0gLTE7XG5cdFx0XHRcdG5ld1Bvc2l0aW9uID0gcG9zaXRpb24gKyAxO1xuXHRcdFx0fVxuXG5cdFx0XHRjb29yZGluYXRlID0gdGhpcy5fY29vcmRpbmF0ZXNbcG9zaXRpb25dO1xuXHRcdFx0Y29vcmRpbmF0ZSArPSAodGhpcy53aWR0aCgpIC0gY29vcmRpbmF0ZSArICh0aGlzLl9jb29yZGluYXRlc1tuZXdQb3NpdGlvbl0gfHwgMCkpIC8gMiAqIG11bHRpcGxpZXI7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvb3JkaW5hdGUgPSB0aGlzLl9jb29yZGluYXRlc1tuZXdQb3NpdGlvbl0gfHwgMDtcblx0XHR9XG5cblx0XHRjb29yZGluYXRlID0gTWF0aC5jZWlsKGNvb3JkaW5hdGUpO1xuXG5cdFx0cmV0dXJuIGNvb3JkaW5hdGU7XG5cdCB9XG5cbiAgLyoqXG5cdCAqIENhbGN1bGF0ZXMgdGhlIHNwZWVkIGZvciBhIHRyYW5zbGF0aW9uLlxuXHQgKiBAcGFyYW0gZnJvbSBUaGUgYWJzb2x1dGUgcG9zaXRpb24gb2YgdGhlIHN0YXJ0IGl0ZW0uXG5cdCAqIEBwYXJhbSB0byBUaGUgYWJzb2x1dGUgcG9zaXRpb24gb2YgdGhlIHRhcmdldCBpdGVtLlxuXHQgKiBAcGFyYW0gZmFjdG9yIFtmYWN0b3I9dW5kZWZpbmVkXSAtIFRoZSB0aW1lIGZhY3RvciBpbiBtaWxsaXNlY29uZHMuXG5cdCAqIEByZXR1cm5zIFRoZSB0aW1lIGluIG1pbGxpc2Vjb25kcyBmb3IgdGhlIHRyYW5zbGF0aW9uLlxuXHQgKi9cbiAgcHJpdmF0ZSBfZHVyYXRpb24oZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyLCBmYWN0b3I/OiBudW1iZXIgfCBib29sZWFuKTogbnVtYmVyIHtcblx0XHRpZiAoZmFjdG9yID09PSAwKSB7XG5cdFx0XHRyZXR1cm4gMDtcblx0XHR9XG5cblx0XHRyZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgoTWF0aC5hYnModG8gLSBmcm9tKSwgMSksIDYpICogTWF0aC5hYnMoKCtmYWN0b3IgfHwgdGhpcy5zZXR0aW5ncy5zbWFydFNwZWVkKSk7XG5cdH1cblxuICAvKipcblx0ICogU2xpZGVzIHRvIHRoZSBzcGVjaWZpZWQgaXRlbS5cblx0ICogQHBhcmFtIHBvc2l0aW9uIFRoZSBwb3NpdGlvbiBvZiB0aGUgaXRlbS5cblx0ICogQHBhcmFtIHNwZWVkIFRoZSB0aW1lIGluIG1pbGxpc2Vjb25kcyBmb3IgdGhlIHRyYW5zaXRpb24uXG5cdCAqL1xuICB0byhwb3NpdGlvbjogbnVtYmVyLCBzcGVlZDogbnVtYmVyIHwgYm9vbGVhbikge1xuXHRcdGxldCBjdXJyZW50ID0gdGhpcy5jdXJyZW50KCksXG5cdFx0XHRyZXZlcnQgPSBudWxsLFxuXHRcdFx0ZGlzdGFuY2UgPSBwb3NpdGlvbiAtIHRoaXMucmVsYXRpdmUoY3VycmVudCksXG5cdFx0XHRtYXhpbXVtID0gdGhpcy5tYXhpbXVtKCksXG5cdFx0XHRkZWxheUZvckxvb3AgPSAwO1xuXHRcdGNvbnN0XHRkaXJlY3Rpb24gPSArKGRpc3RhbmNlID4gMCkgLSArKGRpc3RhbmNlIDwgMCksXG5cdFx0XHRpdGVtcyA9IHRoaXMuX2l0ZW1zLmxlbmd0aCxcblx0XHRcdG1pbmltdW0gPSB0aGlzLm1pbmltdW0oKTtcblxuXHRcdGlmICh0aGlzLnNldHRpbmdzLmxvb3ApIHtcblx0XHRcdGlmICghdGhpcy5zZXR0aW5ncy5yZXdpbmQgJiYgTWF0aC5hYnMoZGlzdGFuY2UpID4gaXRlbXMgLyAyKSB7XG5cdFx0XHRcdGRpc3RhbmNlICs9IGRpcmVjdGlvbiAqIC0xICogaXRlbXM7XG5cdFx0XHR9XG5cblx0XHRcdHBvc2l0aW9uID0gY3VycmVudCArIGRpc3RhbmNlO1xuXHRcdFx0cmV2ZXJ0ID0gKChwb3NpdGlvbiAtIG1pbmltdW0pICUgaXRlbXMgKyBpdGVtcykgJSBpdGVtcyArIG1pbmltdW07XG5cblx0XHRcdGlmIChyZXZlcnQgIT09IHBvc2l0aW9uICYmIHJldmVydCAtIGRpc3RhbmNlIDw9IG1heGltdW0gJiYgcmV2ZXJ0IC0gZGlzdGFuY2UgPiAwKSB7XG5cdFx0XHRcdGN1cnJlbnQgPSByZXZlcnQgLSBkaXN0YW5jZTtcblx0XHRcdFx0cG9zaXRpb24gPSByZXZlcnQ7XG5cdFx0XHRcdGRlbGF5Rm9yTG9vcCA9IDMwO1xuXHRcdFx0XHR0aGlzLnJlc2V0KGN1cnJlbnQpO1xuXHRcdFx0XHR0aGlzLnNlbmRDaGFuZ2VzKCk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmICh0aGlzLnNldHRpbmdzLnJld2luZCkge1xuXHRcdFx0bWF4aW11bSArPSAxO1xuXHRcdFx0cG9zaXRpb24gPSAocG9zaXRpb24gJSBtYXhpbXVtICsgbWF4aW11bSkgJSBtYXhpbXVtO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRwb3NpdGlvbiA9IE1hdGgubWF4KG1pbmltdW0sIE1hdGgubWluKG1heGltdW0sIHBvc2l0aW9uKSk7XG5cdFx0fVxuXG5cdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHR0aGlzLnNwZWVkKHRoaXMuX2R1cmF0aW9uKGN1cnJlbnQsIHBvc2l0aW9uLCBzcGVlZCkpO1xuXHRcdFx0dGhpcy5jdXJyZW50KHBvc2l0aW9uKTtcblxuXHRcdFx0dGhpcy51cGRhdGUoKTtcblx0XHR9LCBkZWxheUZvckxvb3ApO1xuXG5cdH1cblxuICAvKipcblx0ICogU2xpZGVzIHRvIHRoZSBuZXh0IGl0ZW0uXG5cdCAqIEBwYXJhbSBzcGVlZCBUaGUgdGltZSBpbiBtaWxsaXNlY29uZHMgZm9yIHRoZSB0cmFuc2l0aW9uLlxuXHQgKi9cbiAgbmV4dChzcGVlZDogbnVtYmVyIHwgYm9vbGVhbikge1xuXHRcdHNwZWVkID0gc3BlZWQgfHwgZmFsc2U7XG5cdFx0dGhpcy50byh0aGlzLnJlbGF0aXZlKHRoaXMuY3VycmVudCgpKSArIDEsIHNwZWVkKTtcblx0fVxuXG4gIC8qKlxuXHQgKiBTbGlkZXMgdG8gdGhlIHByZXZpb3VzIGl0ZW0uXG5cdCAqIEBwYXJhbSBzcGVlZCBUaGUgdGltZSBpbiBtaWxsaXNlY29uZHMgZm9yIHRoZSB0cmFuc2l0aW9uLlxuXHQgKi9cbiAgcHJldihzcGVlZDogbnVtYmVyIHwgYm9vbGVhbikge1xuXHRcdHNwZWVkID0gc3BlZWQgfHwgZmFsc2U7XG5cdFx0dGhpcy50byh0aGlzLnJlbGF0aXZlKHRoaXMuY3VycmVudCgpKSAtIDEsIHNwZWVkKTtcblx0fVxuXG4gIC8qKlxuXHQgKiBIYW5kbGVzIHRoZSBlbmQgb2YgYW4gYW5pbWF0aW9uLlxuXHQgKiBAcGFyYW0gZXZlbnQgLSBUaGUgZXZlbnQgYXJndW1lbnRzLlxuXHQgKi9cbiAgb25UcmFuc2l0aW9uRW5kKGV2ZW50PzogYW55KSB7XG5cdFx0Ly8gaWYgY3NzMiBhbmltYXRpb24gdGhlbiBldmVudCBvYmplY3QgaXMgdW5kZWZpbmVkXG5cdFx0aWYgKGV2ZW50ICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdC8vIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0XHQvLyAvLyBDYXRjaCBvbmx5IG93bC1zdGFnZSB0cmFuc2l0aW9uRW5kIGV2ZW50XG5cdFx0XHQvLyBpZiAoKGV2ZW50LnRhcmdldCB8fCBldmVudC5zcmNFbGVtZW50IHx8IGV2ZW50Lm9yaWdpbmFsVGFyZ2V0KSAhPT0gdGhpcy4kc3RhZ2UuZ2V0KDApXHQpIHtcblx0XHRcdC8vIFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0Ly8gfVxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHR0aGlzLmxlYXZlKCdhbmltYXRpbmcnKTtcblx0XHR0aGlzLl90cmlnZ2VyKCd0cmFuc2xhdGVkJyk7XG5cdH1cblxuICAvKipcblx0ICogR2V0cyB2aWV3cG9ydCB3aWR0aC5cblx0ICogQHJldHVybnMgLSBUaGUgd2lkdGggaW4gcGl4ZWwuXG5cdCAqL1xuICBwcml2YXRlIF92aWV3cG9ydCgpOiBudW1iZXIge1xuXHRcdGxldCB3aWR0aDtcblx0XHRpZiAodGhpcy5fd2lkdGgpIHtcblx0XHRcdHdpZHRoID0gdGhpcy5fd2lkdGg7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMubG9nZ2VyLmxvZygnQ2FuIG5vdCBkZXRlY3Qgdmlld3BvcnQgd2lkdGguJyk7XG5cdFx0fVxuXHRcdHJldHVybiB3aWR0aDtcblx0fVxuXG4gIC8qKlxuXHQgKiBTZXRzIF9pdGVtc1xuXHQgKiBAcGFyYW0gY29udGVudCBUaGUgbGlzdCBvZiBzbGlkZXMgcHV0IGludG8gQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZXMuXG5cdCAqL1xuICBzZXRJdGVtcyhjb250ZW50OiBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlW10pIHtcblx0XHR0aGlzLl9pdGVtcyA9IGNvbnRlbnQ7XG5cdH1cblxuXHQvKipcblx0ICogU2V0cyBzbGlkZXNEYXRhIHVzaW5nIHRoaXMuX2l0ZW1zXG5cdCAqL1xuXHRwcml2YXRlIF9kZWZpbmVTbGlkZXNEYXRhKCkge1xuXHRcdC8vIE1heWJlIGNyZWF0aW5nIGFuZCB1c2luZyBsb2FkTWFwIHdvdWxkIGJlIGJldHRlciBpbiBMYXp5TG9hZFNlcnZpY2UuXG5cdFx0Ly8gSG92ZXdlciBpbiB0aGF0IGNhc2Ugd2hlbiAncmVzaXplJyBldmVudCBmaXJlcywgcHJvcCAnbG9hZCcgb2YgYWxsIHNsaWRlcyB3aWxsIGdldCAnZmFsc2UnIGFuZCBzdWNoIHN0YXRlIG9mIHByb3Agd2lsbCBiZSBzZWVuIGJ5IFZpZXcgZHVyaW5nIGl0cyB1cGRhdGluZy4gQWNjb3JkaW5nbHkgdGhlIGNvZGUgd2lsbCByZW1vdmUgc2xpZGVzJ3MgY29udGVudCBmcm9tIERPTSBldmVuIGlmIGl0IHdhcyBsb2FkZWQgYmVmb3JlLlxuXHRcdC8vIFRodXMgaXQgd291bGQgYmUgbmVlZGVkIHRvIGFkZCB0aGF0IGNvbnRlbnQgaW50byBET00gYWdhaW4uXG5cdFx0Ly8gSW4gb3JkZXIgdG8gYXZvaWQgYWRkaXRpb25hbCByZW1vdmluZy9hZGRpbmcgbG9hZGVkIHNsaWRlcydzIGNvbnRlbnQgd2UgdXNlIGxvYWRNYXAgaGVyZSBhbmQgc2V0IHJlc3RvcmUgc3RhdGUgb2YgcHJvcCAnbG9hZCcgYmVmb3JlIHRoZSBWaWV3IHdpbGwgZ2V0IGl0LlxuXHRcdGxldCBsb2FkTWFwOiBNYXA8c3RyaW5nLCBib29sZWFuPjtcblxuXHRcdGlmICh0aGlzLnNsaWRlc0RhdGEgJiYgdGhpcy5zbGlkZXNEYXRhLmxlbmd0aCkge1xuXHRcdFx0bG9hZE1hcCA9IG5ldyBNYXAoKTtcblx0XHRcdHRoaXMuc2xpZGVzRGF0YS5mb3JFYWNoKGl0ZW0gPT4ge1xuXHRcdFx0XHRpZiAoaXRlbS5sb2FkKSB7XG5cdFx0XHRcdFx0bG9hZE1hcC5zZXQoaXRlbS5pZCwgaXRlbS5sb2FkKTtcblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHR9XG5cblx0XHR0aGlzLnNsaWRlc0RhdGEgPSB0aGlzLl9pdGVtcy5tYXAoc2xpZGUgPT4ge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0aWQ6IGAke3NsaWRlLmlkfWAsXG5cdFx0XHRcdGlzQWN0aXZlOiBmYWxzZSxcblx0XHRcdFx0dHBsUmVmOiBzbGlkZS50cGxSZWYsXG5cdFx0XHRcdGRhdGFNZXJnZTogc2xpZGUuZGF0YU1lcmdlLFxuXHRcdFx0XHR3aWR0aDogMCxcblx0XHRcdFx0aXNDbG9uZWQ6IGZhbHNlLFxuXHRcdFx0XHRsb2FkOiBsb2FkTWFwID8gbG9hZE1hcC5nZXQoc2xpZGUuaWQpIDogZmFsc2UsXG5cdFx0XHRcdGhhc2hGcmFnbWVudDogc2xpZGUuZGF0YUhhc2hcblx0XHRcdH07XG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogU2V0cyBjdXJyZW50IGNsYXNzZXMgZm9yIHNsaWRlXG5cdCAqIEBwYXJhbSBzbGlkZSBTbGlkZSBvZiBjYXJvdXNlbFxuXHQgKiBAcmV0dXJucyBvYmplY3Qgd2l0aCBuYW1lcyBvZiBjc3MtY2xhc3NlcyB3aGljaCBhcmUga2V5cyBhbmQgdHJ1ZS9mYWxzZSB2YWx1ZXNcblx0ICovXG5cdHNldEN1clNsaWRlQ2xhc3NlcyhzbGlkZTogU2xpZGVNb2RlbCk6IHtba2V5OiBzdHJpbmddOiBib29sZWFufSB7XG5cdFx0Ly8gQ1NTIGNsYXNzZXM6IGFkZGVkL3JlbW92ZWQgcGVyIGN1cnJlbnQgc3RhdGUgb2YgY29tcG9uZW50IHByb3BlcnRpZXNcblx0XHRjb25zdCBjdXJyZW50Q2xhc3Nlczoge1trZXk6IHN0cmluZ106IGJvb2xlYW59ID0gIHtcblx0XHRcdCdhY3RpdmUnOiBzbGlkZS5pc0FjdGl2ZSxcblx0XHRcdCdjZW50ZXInOiBzbGlkZS5pc0NlbnRlcmVkLFxuXHRcdFx0J2Nsb25lZCc6IHNsaWRlLmlzQ2xvbmVkLFxuXHRcdFx0J2FuaW1hdGVkJzogc2xpZGUuaXNBbmltYXRlZCxcblx0XHRcdCdvd2wtYW5pbWF0ZWQtaW4nOiBzbGlkZS5pc0RlZkFuaW1hdGVkSW4sXG5cdFx0XHQnb3dsLWFuaW1hdGVkLW91dCc6IHNsaWRlLmlzRGVmQW5pbWF0ZWRPdXRcblx0XHR9O1xuXHRcdGlmICh0aGlzLnNldHRpbmdzLmFuaW1hdGVJbikge1xuXHRcdFx0Y3VycmVudENsYXNzZXNbdGhpcy5zZXR0aW5ncy5hbmltYXRlSW4gYXMgc3RyaW5nXSA9IHNsaWRlLmlzQ3VzdG9tQW5pbWF0ZWRJbjtcblx0XHR9XG5cdFx0aWYgKHRoaXMuc2V0dGluZ3MuYW5pbWF0ZU91dCkge1xuXHRcdFx0Y3VycmVudENsYXNzZXNbdGhpcy5zZXR0aW5ncy5hbmltYXRlT3V0IGFzIHN0cmluZ10gPSBzbGlkZS5pc0N1c3RvbUFuaW1hdGVkT3V0O1xuXHRcdH1cblx0XHRyZXR1cm4gY3VycmVudENsYXNzZXM7XG5cdH1cblxuICAvKipcblx0ICogT3BlcmF0b3JzIHRvIGNhbGN1bGF0ZSByaWdodC10by1sZWZ0IGFuZCBsZWZ0LXRvLXJpZ2h0LlxuXHQgKiBAcGFyYW0gYSAtIFRoZSBsZWZ0IHNpZGUgb3BlcmFuZC5cblx0ICogQHBhcmFtIG8gLSBUaGUgb3BlcmF0b3IuXG5cdCAqIEBwYXJhbSBiIC0gVGhlIHJpZ2h0IHNpZGUgb3BlcmFuZC5cblx0ICogQHJldHVybnMgdHJ1ZS9mYWxzZSBtZWFuaW5nIHJpZ2h0LXRvLWxlZnQgb3IgbGVmdC10by1yaWdodFxuXHQgKi9cbiAgcHJpdmF0ZSBfb3AoYTogbnVtYmVyLCBvOiBzdHJpbmcsIGI6IG51bWJlcik6IGJvb2xlYW4ge1xuXHRcdGNvbnN0IHJ0bCA9IHRoaXMuc2V0dGluZ3MucnRsO1xuXHRcdHN3aXRjaCAobykge1xuXHRcdFx0Y2FzZSAnPCc6XG5cdFx0XHRcdHJldHVybiBydGwgPyBhID4gYiA6IGEgPCBiO1xuXHRcdFx0Y2FzZSAnPic6XG5cdFx0XHRcdHJldHVybiBydGwgPyBhIDwgYiA6IGEgPiBiO1xuXHRcdFx0Y2FzZSAnPj0nOlxuXHRcdFx0XHRyZXR1cm4gcnRsID8gYSA8PSBiIDogYSA+PSBiO1xuXHRcdFx0Y2FzZSAnPD0nOlxuXHRcdFx0XHRyZXR1cm4gcnRsID8gYSA+PSBiIDogYSA8PSBiO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG5cbiAgLyoqXG5cdCAqIFRyaWdnZXJzIGEgcHVibGljIGV2ZW50LlxuXHQgKiBAdG9kbyBSZW1vdmUgYHN0YXR1c2AsIGByZWxhdGVkVGFyZ2V0YCBzaG91bGQgYmUgdXNlZCBpbnN0ZWFkLlxuXHQgKiBAcGFyYW0gbmFtZSBUaGUgZXZlbnQgbmFtZS5cblx0ICogQHBhcmFtIGRhdGEgVGhlIGV2ZW50IGRhdGEuXG5cdCAqIEBwYXJhbSBuYW1lc3BhY2UgVGhlIGV2ZW50IG5hbWVzcGFjZS5cblx0ICogQHBhcmFtIHN0YXRlIFRoZSBzdGF0ZSB3aGljaCBpcyBhc3NvY2lhdGVkIHdpdGggdGhlIGV2ZW50LlxuXHQgKiBAcGFyYW0gZW50ZXIgSW5kaWNhdGVzIGlmIHRoZSBjYWxsIGVudGVycyB0aGUgc3BlY2lmaWVkIHN0YXRlIG9yIG5vdC5cblx0ICovXG4gIHByaXZhdGUgX3RyaWdnZXIobmFtZTogc3RyaW5nLCBkYXRhPzogYW55LCBuYW1lc3BhY2U/OiBzdHJpbmcsIHN0YXRlPzogc3RyaW5nLCBlbnRlcj86IGJvb2xlYW4pIHtcblx0XHRzd2l0Y2ggKG5hbWUpIHtcblx0XHRcdGNhc2UgJ2luaXRpYWxpemVkJzpcblx0XHRcdFx0dGhpcy5faW5pdGlhbGl6ZWRDYXJvdXNlbCQubmV4dChuYW1lKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdjaGFuZ2UnOlxuXHRcdFx0XHR0aGlzLl9jaGFuZ2VTZXR0aW5nc0Nhcm91c2VsJC5uZXh0KGRhdGEpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ2NoYW5nZWQnOlxuXHRcdFx0XHR0aGlzLl9jaGFuZ2VkU2V0dGluZ3NDYXJvdXNlbCQubmV4dChkYXRhKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdkcmFnJzpcblx0XHRcdFx0dGhpcy5fZHJhZ0Nhcm91c2VsJC5uZXh0KG5hbWUpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ2RyYWdnZWQnOlxuXHRcdFx0XHR0aGlzLl9kcmFnZ2VkQ2Fyb3VzZWwkLm5leHQobmFtZSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAncmVzaXplJzpcblx0XHRcdFx0dGhpcy5fcmVzaXplQ2Fyb3VzZWwkLm5leHQobmFtZSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAncmVzaXplZCc6XG5cdFx0XHRcdHRoaXMuX3Jlc2l6ZWRDYXJvdXNlbCQubmV4dChuYW1lKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdyZWZyZXNoJzpcblx0XHRcdFx0dGhpcy5fcmVmcmVzaENhcm91c2VsJC5uZXh0KG5hbWUpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ3JlZnJlc2hlZCc6XG5cdFx0XHRcdHRoaXMuX3JlZnJlc2hlZENhcm91c2VsJC5uZXh0KG5hbWUpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ3RyYW5zbGF0ZSc6XG5cdFx0XHRcdHRoaXMuX3RyYW5zbGF0ZUNhcm91c2VsJC5uZXh0KG5hbWUpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ3RyYW5zbGF0ZWQnOlxuXHRcdFx0XHR0aGlzLl90cmFuc2xhdGVkQ2Fyb3VzZWwkLm5leHQobmFtZSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXG5cdH1cblxuXHQvKipcblx0ICogRW50ZXJzIGEgc3RhdGUuXG5cdCAqIEBwYXJhbSBuYW1lIC0gVGhlIHN0YXRlIG5hbWUuXG5cdCAqL1xuICBlbnRlcihuYW1lOiBzdHJpbmcpIHtcbiAgICBbIG5hbWUgXS5jb25jYXQodGhpcy5fc3RhdGVzLnRhZ3NbbmFtZV0gfHwgW10pLmZvckVhY2goKHN0YXRlTmFtZSkgPT4ge1xuICAgICAgaWYgKHRoaXMuX3N0YXRlcy5jdXJyZW50W3N0YXRlTmFtZV0gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHR0aGlzLl9zdGF0ZXMuY3VycmVudFtzdGF0ZU5hbWVdID0gMDtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5fc3RhdGVzLmN1cnJlbnRbc3RhdGVOYW1lXSsrO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuXHQgKiBMZWF2ZXMgYSBzdGF0ZS5cblx0ICogQHBhcmFtIG5hbWUgLSBUaGUgc3RhdGUgbmFtZS5cblx0ICovXG5cdGxlYXZlKG5hbWU6IHN0cmluZykge1xuICAgIFsgbmFtZSBdLmNvbmNhdCh0aGlzLl9zdGF0ZXMudGFnc1tuYW1lXSB8fCBbXSkuZm9yRWFjaCgoc3RhdGVOYW1lKSA9PiB7XG4gICAgICBpZiAodGhpcy5fc3RhdGVzLmN1cnJlbnRbc3RhdGVOYW1lXSA9PT0gMCB8fCAhIXRoaXMuX3N0YXRlcy5jdXJyZW50W3N0YXRlTmFtZV0pIHtcbiAgICAgICAgdGhpcy5fc3RhdGVzLmN1cnJlbnRbc3RhdGVOYW1lXS0tO1xuICAgICAgfVxuICAgIH0pXG4gIH07XG5cbiAgLyoqXG5cdCAqIFJlZ2lzdGVycyBhbiBldmVudCBvciBzdGF0ZS5cblx0ICogQHBhcmFtIG9iamVjdCAtIFRoZSBldmVudCBvciBzdGF0ZSB0byByZWdpc3Rlci5cblx0ICovXG4gIHJlZ2lzdGVyKG9iamVjdDogYW55KSB7XG5cdFx0aWYgKG9iamVjdC50eXBlID09PSBUeXBlLlN0YXRlKSB7XG5cdFx0XHRpZiAoIXRoaXMuX3N0YXRlcy50YWdzW29iamVjdC5uYW1lXSkge1xuXHRcdFx0XHR0aGlzLl9zdGF0ZXMudGFnc1tvYmplY3QubmFtZV0gPSBvYmplY3QudGFncztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuX3N0YXRlcy50YWdzW29iamVjdC5uYW1lXSA9IHRoaXMuX3N0YXRlcy50YWdzW29iamVjdC5uYW1lXS5jb25jYXQob2JqZWN0LnRhZ3MpO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLl9zdGF0ZXMudGFnc1tvYmplY3QubmFtZV0gPSB0aGlzLl9zdGF0ZXMudGFnc1tvYmplY3QubmFtZV0uZmlsdGVyKCh0YWcsIGkpID0+IHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuX3N0YXRlcy50YWdzW29iamVjdC5uYW1lXS5pbmRleE9mKHRhZykgPT09IGk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuICAvKipcblx0ICogU3VwcHJlc3NlcyBldmVudHMuXG5cdCAqIEBwYXJhbSBldmVudHMgVGhlIGV2ZW50cyB0byBzdXBwcmVzcy5cblx0ICovXG4gIHByaXZhdGUgX3N1cHByZXNzKGV2ZW50czogc3RyaW5nW10pIHtcblx0XHRldmVudHMuZm9yRWFjaChldmVudCA9PiB7XG5cdFx0XHR0aGlzLl9zdXByZXNzW2V2ZW50XSA9IHRydWU7XG5cdFx0fSk7XG5cdH1cblxuICAvKipcblx0ICogUmVsZWFzZXMgc3VwcHJlc3NlZCBldmVudHMuXG5cdCAqIEBwYXJhbSBldmVudHMgVGhlIGV2ZW50cyB0byByZWxlYXNlLlxuXHQgKi9cbiAgcHJpdmF0ZSBfcmVsZWFzZShldmVudHM6IHN0cmluZ1tdKSB7XG5cdFx0ZXZlbnRzLmZvckVhY2goZXZlbnQgPT4ge1xuXHRcdFx0ZGVsZXRlIHRoaXMuX3N1cHJlc3NbZXZlbnRdO1xuXHRcdH0pO1xuXHQgfVxuXG4gIC8qKlxuXHQgKiBHZXRzIHVuaWZpZWQgcG9pbnRlciBjb29yZGluYXRlcyBmcm9tIGV2ZW50LlxuXHQgKiBAdG9kbyAjMjYxXG5cdCAqIEBwYXJhbSBldmVudCBUaGUgYG1vdXNlZG93bmAgb3IgYHRvdWNoc3RhcnRgIGV2ZW50LlxuXHQgKiBAcmV0dXJucyBPYmplY3QgQ29vcmRzIHdoaWNoIGNvbnRhaW5zIGB4YCBhbmQgYHlgIGNvb3JkaW5hdGVzIG9mIGN1cnJlbnQgcG9pbnRlciBwb3NpdGlvbi5cblx0ICovXG5cdHBvaW50ZXIoZXZlbnQ6IGFueSk6IENvb3JkcyB7XG5cdFx0Y29uc3QgcmVzdWx0ID0geyB4OiBudWxsLCB5OiBudWxsIH07XG5cblx0XHRldmVudCA9IGV2ZW50Lm9yaWdpbmFsRXZlbnQgfHwgZXZlbnQgfHwgd2luZG93LmV2ZW50O1xuXG5cdFx0ZXZlbnQgPSBldmVudC50b3VjaGVzICYmIGV2ZW50LnRvdWNoZXMubGVuZ3RoID9cblx0XHRcdGV2ZW50LnRvdWNoZXNbMF0gOiBldmVudC5jaGFuZ2VkVG91Y2hlcyAmJiBldmVudC5jaGFuZ2VkVG91Y2hlcy5sZW5ndGggP1xuXHRcdFx0XHRldmVudC5jaGFuZ2VkVG91Y2hlc1swXSA6IGV2ZW50O1xuXG5cdFx0aWYgKGV2ZW50LnBhZ2VYKSB7XG5cdFx0XHRyZXN1bHQueCA9IGV2ZW50LnBhZ2VYO1xuXHRcdFx0cmVzdWx0LnkgPSBldmVudC5wYWdlWTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVzdWx0LnggPSBldmVudC5jbGllbnRYO1xuXHRcdFx0cmVzdWx0LnkgPSBldmVudC5jbGllbnRZO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdCB9XG5cbiAgLyoqXG5cdCAqIERldGVybWluZXMgaWYgdGhlIGlucHV0IGlzIGEgTnVtYmVyIG9yIHNvbWV0aGluZyB0aGF0IGNhbiBiZSBjb2VyY2VkIHRvIGEgTnVtYmVyXG5cdCAqIEBwYXJhbSBudW1iZXIgVGhlIGlucHV0IHRvIGJlIHRlc3RlZFxuXHQgKiBAcmV0dXJucyBBbiBpbmRpY2F0aW9uIGlmIHRoZSBpbnB1dCBpcyBhIE51bWJlciBvciBjYW4gYmUgY29lcmNlZCB0byBhIE51bWJlclxuXHQgKi9cbiAgcHJpdmF0ZSBfaXNOdW1lcmljKG51bWJlcjogYW55KTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuICFpc05hTihwYXJzZUZsb2F0KG51bWJlcikpO1xuXHR9XG5cblx0LyoqXG5cdCAqIERldGVybWluZXMgd2hldGhlciB2YWx1ZSBpcyBudW1iZXIgb3IgYm9vbGVhbiB0eXBlXG5cdCAqIEBwYXJhbSB2YWx1ZSBUaGUgaW5wdXQgdG8gYmUgdGVzdGVkXG5cdCAqIEByZXR1cm5zIEFuIGluZGljYXRpb24gaWYgdGhlIGlucHV0IGlzIGEgTnVtYmVyIG9yIGNhbiBiZSBjb2VyY2VkIHRvIGEgTnVtYmVyLCBvciBCb29sZWFuXG5cdCAqL1xuXHRwcml2YXRlIF9pc051bWJlck9yQm9vbGVhbih2YWx1ZTogbnVtYmVyIHwgYm9vbGVhbik6IGJvb2xlYW4ge1xuXHRcdHJldHVybiB0aGlzLl9pc051bWVyaWModmFsdWUpIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nO1xuXHR9XG5cblx0LyoqXG5cdCAqIERldGVybWluZXMgd2hldGhlciB2YWx1ZSBpcyBudW1iZXIgb3Igc3RyaW5nIHR5cGVcblx0ICogQHBhcmFtIHZhbHVlIFRoZSBpbnB1dCB0byBiZSB0ZXN0ZWRcblx0ICogQHJldHVybnMgQW4gaW5kaWNhdGlvbiBpZiB0aGUgaW5wdXQgaXMgYSBOdW1iZXIgb3IgY2FuIGJlIGNvZXJjZWQgdG8gYSBOdW1iZXIsIG9yIFN0cmluZ1xuXHQgKi9cblx0cHJpdmF0ZSBfaXNOdW1iZXJPclN0cmluZyh2YWx1ZTogbnVtYmVyIHwgc3RyaW5nKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuIHRoaXMuX2lzTnVtZXJpYyh2YWx1ZSkgfHwgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJztcblx0fVxuXG5cdC8qKlxuXHQgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdmFsdWUgaXMgbnVtYmVyIG9yIHN0cmluZyB0eXBlXG5cdCAqIEBwYXJhbSB2YWx1ZSBUaGUgaW5wdXQgdG8gYmUgdGVzdGVkXG5cdCAqIEByZXR1cm5zIEFuIGluZGljYXRpb24gaWYgdGhlIGlucHV0IGlzIGEgTnVtYmVyIG9yIGNhbiBiZSBjb2VyY2VkIHRvIGEgTnVtYmVyLCBvciBTdHJpbmdcblx0ICovXG5cdHByaXZhdGUgX2lzU3RyaW5nT3JCb29sZWFuKHZhbHVlOiBudW1iZXIgfCBzdHJpbmcpOiBib29sZWFuIHtcblx0XHRyZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJztcblx0fVxuXG4gIC8qKlxuXHQgKiBHZXRzIHRoZSBkaWZmZXJlbmNlIG9mIHR3byB2ZWN0b3JzLlxuXHQgKiBAdG9kbyAjMjYxXG5cdCAqIEBwYXJhbSBmaXJzdCBUaGUgZmlyc3QgdmVjdG9yLlxuXHQgKiBAcGFyYW0gc2Vjb25kIFRoZSBzZWNvbmQgdmVjdG9yLlxuXHQgKiBAcmV0dXJucyBUaGUgZGlmZmVyZW5jZS5cblx0ICovXG4gIGRpZmZlcmVuY2UoZmlyc3Q6IENvb3Jkcywgc2Vjb25kOiBDb29yZHMpOiBDb29yZHMge1xuXHRcdGlmIChudWxsID09PSBmaXJzdCB8fCBudWxsID09PSBzZWNvbmQpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHg6IDAsXG4gICAgICAgIHk6IDAsXG4gICAgICB9O1xuICAgIH1cblx0XHRyZXR1cm4ge1xuXHRcdFx0eDogZmlyc3QueCAtIHNlY29uZC54LFxuXHRcdFx0eTogZmlyc3QueSAtIHNlY29uZC55XG5cdFx0fTtcblx0fVxuXG59XG4iXX0=