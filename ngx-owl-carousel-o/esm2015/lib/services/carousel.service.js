import * as tslib_1 from "tslib";
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
let CarouselService = class CarouselService {
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
            }, {
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
            }, {
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
        this._options = Object.assign({}, configOptions, checkedOptions);
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
                        checkedOptions[key] = key === 'items' ? this._validateItems(checkedOptions[key]) : checkedOptions[key];
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
     * Checks option items set by user and if it bigger than number of slides then returns number of slides
     * @param items option items set by user
     * @returns right number of items
     */
    _validateItems(items) {
        let result;
        if (items > this._items.length) {
            result = this._items.length;
            this.logger.log('The option \'items\' in your options is bigger than the number of slides. This option is updated to the current number of slides and the navigation got disabled');
        }
        else {
            if (items === this._items.length && (this.settings.dots || this.settings.nav)) {
                this.logger.log('Option \'items\' in your options is equal to the number of slides. So the navigation got disabled');
            }
            result = items;
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
        this.settings = Object.assign({}, this._options, overwrites[match], { items: (overwrites[match] && overwrites[match].items) ? this._validateItems(overwrites[match].items) : this._options.items });
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
       * @param second- The second vector.
       * @returns The difference.
       */
    difference(first, second) {
        return {
            x: first.x - second.x,
            y: first.y - second.y
        };
    }
};
CarouselService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [OwlLogger])
], CarouselService);
export { CarouselService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vd2wtY2Fyb3VzZWwtby8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9jYXJvdXNlbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFLQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSTNDLE9BQU8sRUFBRSxPQUFPLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLHFCQUFxQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFJOUYsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRTdDOztHQUVHO0FBQ0gsTUFBTSxPQUFPLE1BQU07Q0FLbEI7QUFFRDs7O0dBR0c7QUFDSCxNQUFNLENBQU4sSUFBWSxJQUdYO0FBSEQsV0FBWSxJQUFJO0lBQ2YsdUJBQWUsQ0FBQTtJQUNmLHVCQUFlLENBQUE7QUFDaEIsQ0FBQyxFQUhXLElBQUksS0FBSixJQUFJLFFBR2Y7QUFBQSxDQUFDO0FBRUY7OztHQUdHO0FBQ0gsTUFBTSxDQUFOLElBQVksS0FJWDtBQUpELFdBQVksS0FBSztJQUNoQiw0QkFBbUIsQ0FBQTtJQUNuQix3QkFBZSxDQUFBO0lBQ2Ysd0JBQWUsQ0FBQTtBQUNoQixDQUFDLEVBSlcsS0FBSyxLQUFMLEtBQUssUUFJaEI7QUFBQSxDQUFDO0FBRUY7O0dBRUc7QUFDSCxNQUFNLE9BQU8sTUFBTTtDQUdsQjtBQUVEOztHQUVHO0FBQ0gsTUFBTSxPQUFPLG1CQUFtQjtDQU0vQjtBQUdELElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWU7SUEyYTNCLFlBQW9CLE1BQWlCO1FBQWpCLFdBQU0sR0FBTixNQUFNLENBQVc7UUExYXJDOztTQUVJO1FBQ0ksMEJBQXFCLEdBQUcsSUFBSSxPQUFPLEVBQXVCLENBQUM7UUFDbkU7O1NBRUk7UUFDSSwwQkFBcUIsR0FBRyxJQUFJLE9BQU8sRUFBVSxD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QUFLLENBQUMsT0FBTyxDQUFDO1NBQ3pCO1FBRUQsT0FBTyxNQUFNLENBQUM7SUFDZCxDQUFDO0lBRUQ7Ozs7U0FJRTtJQUNNLFVBQVUsQ0FBQyxNQUFXO1FBQzlCLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSyxrQkFBa0IsQ0FBQyxLQUF1QjtRQUNqRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksT0FBTyxLQUFLLEtBQUssU0FBUyxDQUFDO0lBQzdELENBQUM7SUFFRDs7OztPQUlHO0lBQ0ssaUJBQWlCLENBQUMsS0FBc0I7UUFDL0MsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQztJQUM1RCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLGtCQUFrQixDQUFDLEtBQXNCO1FBQ2hELE9BQU8sT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLE9BQU8sS0FBSyxLQUFLLFNBQVMsQ0FBQztJQUNoRSxDQUFDO0lBRUE7Ozs7OztTQU1FO0lBQ0YsVUFBVSxDQUFDLEtBQWEsRUFBRSxNQUFjO1FBQ3hDLE9BQU87WUFDTixDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQztZQUNyQixDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQztTQUNyQixDQUFDO0lBQ0gsQ0FBQztDQUVELENBQUE7QUFyb0RZLGVBQWU7SUFEM0IsVUFBVSxFQUFFOzZDQTRhZ0IsU0FBUztHQTNhekIsZUFBZSxDQXFvRDNCO1NBcm9EWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IFN0YWdlRGF0YSB9IGZyb20gJy4uL21vZGVscy9zdGFnZS1kYXRhLm1vZGVsJztcclxuXHJcbmltcG9ydCB7IE93bERPTURhdGEgfSBmcm9tICcuLi9tb2RlbHMvb3dsRE9NLWRhdGEubW9kZWwnO1xyXG5cclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZSB9IGZyb20gJy4uL2Nhcm91c2VsL2Nhcm91c2VsLm1vZHVsZSc7XHJcbmltcG9ydCB7IFNsaWRlTW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvc2xpZGUubW9kZWwnO1xyXG5pbXBvcnQgeyBTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IE93bENhcm91c2VsT0NvbmZpZywgT3dsT3B0aW9uc01vY2tlZFR5cGVzIH0gZnJvbSAnLi4vY2Fyb3VzZWwvb3dsLWNhcm91c2VsLW8tY29uZmlnJztcclxuaW1wb3J0IHsgT3dsT3B0aW9ucyB9IGZyb20gJy4uL21vZGVscy9vd2wtb3B0aW9ucy5tb2RlbCc7XHJcblxyXG5pbXBvcnQgeyBOYXZEYXRhLCBEb3RzRGF0YSB9IGZyb20gJy4uL21vZGVscy9uYXZpZ2F0aW9uLWRhdGEubW9kZWxzJztcclxuaW1wb3J0IHsgT3dsTG9nZ2VyIH0gZnJvbSAnLi9sb2dnZXIuc2VydmljZSc7XHJcblxyXG4vKipcclxuICogQ3VycmVudCBzdGF0ZSBpbmZvcm1hdGlvbiBhbmQgdGhlaXIgdGFncy5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBTdGF0ZXMge1xyXG4gIGN1cnJlbnQ6IHt9O1xyXG4gIHRhZ3M6IHtcclxuICAgIFtrZXk6IHN0cmluZ106IHN0cmluZ1tdO1xyXG4gIH07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFbnVtZXJhdGlvbiBmb3IgdHlwZXMuXHJcbiAqIEBlbnVtIHtTdHJpbmd9XHJcbiAqL1xyXG5leHBvcnQgZW51bSBUeXBlIHtcclxuXHRFdmVudCA9ICdldmVudCcsXHJcblx0U3RhdGUgPSAnc3RhdGUnXHJcbn07XHJcblxyXG4vKipcclxuICogRW51bWVyYXRpb24gZm9yIHdpZHRoLlxyXG4gKiBAZW51bSB7U3RyaW5nfVxyXG4gKi9cclxuZXhwb3J0IGVudW0gV2lkdGgge1xyXG5cdERlZmF1bHQgPSAnZGVmYXVsdCcsXHJcblx0SW5uZXIgPSAnaW5uZXInLFxyXG5cdE91dGVyID0gJ291dGVyJ1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIE1vZGVsIGZvciBjb29yZHMgb2YgLm93bC1zdGFnZVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENvb3JkcyB7XHJcblx0eDogbnVtYmVyO1xyXG5cdHk6IG51bWJlcjtcclxufVxyXG5cclxuLyoqXHJcbiAqIE1vZGVsIGZvciBhbGwgY3VycmVudCBkYXRhIG9mIGNhcm91c2VsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ2Fyb3VzZWxDdXJyZW50RGF0YSB7XHJcblx0b3dsRE9NRGF0YTogT3dsRE9NRGF0YTtcclxuXHRzdGFnZURhdGE6IFN0YWdlRGF0YTtcclxuXHRzbGlkZXNEYXRhOiBTbGlkZU1vZGVsW107XHJcblx0bmF2RGF0YTogTmF2RGF0YTtcclxuXHRkb3RzRGF0YTogRG90c0RhdGE7XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIENhcm91c2VsU2VydmljZSB7XHJcblx0LyoqXHJcbiAgICogU3ViamVjdCBmb3IgcGFzc2luZyBkYXRhIG5lZWRlZCBmb3IgbWFuYWdpbmcgVmlld1xyXG4gICAqL1xyXG5cdHByaXZhdGUgX3ZpZXdTZXR0aW5nc1NoaXBwZXIkID0gbmV3IFN1YmplY3Q8Q2Fyb3VzZWxDdXJyZW50RGF0YT4oKTtcclxuXHQvKipcclxuICAgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gd2hlbiB0aGUgY2Fyb3VzZWwgZ290IGluaXRpYWxpemVzXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfaW5pdGlhbGl6ZWRDYXJvdXNlbCQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XHJcblxyXG5cdC8qKlxyXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSBjYXJvdXNlbCdzIHNldHRpbmdzIHN0YXJ0IGNoYW5naW5mXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfY2hhbmdlU2V0dGluZ3NDYXJvdXNlbCQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XHJcblxyXG5cdC8qKlxyXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSBjYXJvdXNlbCdzIHNldHRpbmdzIGhhdmUgY2hhbmdlZFxyXG4gICAqL1xyXG5cdHByaXZhdGUgX2NoYW5nZWRTZXR0aW5nc0Nhcm91c2VsJCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcclxuXHQvKipcclxuICAgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gd2hlbiB0aGUgY2Fyb3VzZWwgc3RhcnRzIHRyYW5zbGF0aW5nIG9yIG1vdmluZ1xyXG4gICAqL1xyXG5cdHByaXZhdGUgX3RyYW5zbGF0ZUNhcm91c2VsJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcclxuXHQvKipcclxuICAgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gd2hlbiB0aGUgY2Fyb3VzZWwgc3RvcHBlZCB0cmFuc2xhdGluZyBvciBtb3ZpbmdcclxuICAgKi9cclxuXHRwcml2YXRlIF90cmFuc2xhdGVkQ2Fyb3VzZWwkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xyXG5cdC8qKlxyXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSBjYXJvdXNlbCdzIHJlYnVpbGRpbmcgY2F1c2VkIGJ5ICdyZXNpemUnIGV2ZW50IHN0YXJ0c1xyXG4gICAqL1xyXG5cdHByaXZhdGUgX3Jlc2l6ZUNhcm91c2VsJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcclxuXHQvKipcclxuICAgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gIHdoZW4gdGhlIGNhcm91c2VsJ3MgcmVidWlsZGluZyBjYXVzZWQgYnkgJ3Jlc2l6ZScgZXZlbnQgaXMgZW5kZWRcclxuICAgKi9cclxuXHRwcml2YXRlIF9yZXNpemVkQ2Fyb3VzZWwkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xyXG5cdC8qKlxyXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSByZWZyZXNoIG9mIGNhcm91c2VsIHN0YXJ0c1xyXG4gICAqL1xyXG5cdHByaXZhdGUgX3JlZnJlc2hDYXJvdXNlbCQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XHJcblx0LyoqXHJcbiAgICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uIHdoZW4gdGhlIHJlZnJlc2ggb2YgY2Fyb3VzZWwgaXMgZW5kZWRcclxuICAgKi9cclxuXHRwcml2YXRlIF9yZWZyZXNoZWRDYXJvdXNlbCQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XHJcblx0LyoqXHJcbiAgICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uIHdoZW4gdGhlIGRyYWdnaW5nIG9mIGNhcm91c2VsIHN0YXJ0c1xyXG4gICAqL1xyXG5cdHByaXZhdGUgX2RyYWdDYXJvdXNlbCQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XHJcblx0LyoqXHJcbiAgICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uIHdoZW4gdGhlIGRyYWdnaW5nIG9mIGNhcm91c2VsIGlzIGVuZGVkXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfZHJhZ2dlZENhcm91c2VsJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ3VycmVudCBzZXR0aW5ncyBmb3IgdGhlIGNhcm91c2VsLlxyXG4gICAqL1xyXG4gIHNldHRpbmdzOiBPd2xPcHRpb25zID0ge1xyXG5cdFx0aXRlbXM6IDBcclxuXHR9O1xyXG5cclxuXHQvKipcclxuICAgKiBJbml0aWFsIGRhdGEgZm9yIHNldHRpbmcgY2xhc3NlcyB0byBlbGVtZW50IC5vd2wtY2Fyb3VzZWxcclxuICAgKi9cclxuXHRvd2xET01EYXRhOiBPd2xET01EYXRhID0ge1xyXG5cdFx0cnRsOiBmYWxzZSxcclxuXHRcdGlzUmVzcG9uc2l2ZTogZmFsc2UsXHJcblx0XHRpc1JlZnJlc2hlZDogZmFsc2UsXHJcblx0XHRpc0xvYWRlZDogZmFsc2UsXHJcblx0XHRpc0xvYWRpbmc6IGZhbHNlLFxyXG5cdFx0aXNNb3VzZURyYWdhYmxlOiBmYWxzZSxcclxuXHRcdGlzR3JhYjogZmFsc2UsXHJcblx0XHRpc1RvdWNoRHJhZ2FibGU6IGZhbHNlXHJcblx0fTtcclxuXHJcblx0LyoqXHJcbiAgICogSW5pdGlhbCBkYXRhIG9mIC5vd2wtc3RhZ2VcclxuICAgKi9cclxuXHRzdGFnZURhdGE6IFN0YWdlRGF0YSA9IHtcclxuXHRcdHRyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKDBweCwwcHgsMHB4KScsXHJcblx0XHR0cmFuc2l0aW9uOiAnMHMnLFxyXG5cdFx0d2lkdGg6IDAsXHJcblx0XHRwYWRkaW5nTDogMCxcclxuXHRcdHBhZGRpbmdSOiAwXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogIERhdGEgb2YgZXZlcnkgc2xpZGVcclxuXHQgKi9cclxuXHRzbGlkZXNEYXRhOiBTbGlkZU1vZGVsW107XHJcblxyXG5cdC8qKlxyXG5cdCAqIERhdGEgb2YgbmF2aWdhdGlvbiBibG9ja1xyXG5cdCAqL1xyXG5cdG5hdkRhdGE6IE5hdkRhdGE7XHJcblxyXG5cdC8qKlxyXG5cdCAqIERhdGEgb2YgZG90cyBibG9ja1xyXG5cdCAqL1xyXG5cdGRvdHNEYXRhOiBEb3RzRGF0YTtcclxuXHJcblx0LyoqXHJcblx0ICogQ2Fyb3VzZWwgd2lkdGhcclxuXHQgKi9cclxuXHRwcml2YXRlIF93aWR0aDogbnVtYmVyO1xyXG5cclxuXHQvKipcclxuXHQgKiBBbGwgcmVhbCBpdGVtcy5cclxuXHQgKi9cclxuXHRwcml2YXRlIF9pdGVtczogQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZVtdID0gW107IC8vIGlzIGVxdWFsIHRvIHRoaXMuc2xpZGVzXHJcblxyXG5cdC8qKlxyXG4gICAqIEFycmF5IHdpdGggd2lkdGggb2YgZXZlcnkgc2xpZGUuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfd2lkdGhzOiBhbnlbXSA9IFtdO1xyXG5cclxuXHQvKipcclxuICAgKiBDdXJyZW50bHkgc3VwcHJlc3NlZCBldmVudHMgdG8gcHJldmVudCB0aGVtIGZyb20gYmVlaW5nIHJldHJpZ2dlcmVkLlxyXG4gICAqL1xyXG5cdHByaXZhdGUgX3N1cHJlc3M6IGFueSA9IHt9O1xyXG5cclxuICAvKipcclxuICAgKiBSZWZlcmVuY2VzIHRvIHRoZSBydW5uaW5nIHBsdWdpbnMgb2YgdGhpcyBjYXJvdXNlbC5cclxuICAgKi9cclxuXHRwcml2YXRlIF9wbHVnaW5zOiBhbnkgPSB7fTtcclxuXHJcblx0LyoqXHJcbiAgICogQWJzb2x1dGUgY3VycmVudCBwb3NpdGlvbi5cclxuICAgKi9cclxuXHRwcml2YXRlIF9jdXJyZW50OiBudW1iZXIgfCBudWxsID0gbnVsbDtcclxuXHJcblx0LyoqXHJcbiAgICogQWxsIGNsb25lZCBpdGVtcy5cclxuICAgKi9cclxuXHRwcml2YXRlIF9jbG9uZXM6IGFueVtdID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIE1lcmdlIHZhbHVlcyBvZiBhbGwgaXRlbXMuXHJcbiAgICogQHRvZG8gTWF5YmUgdGhpcyBjb3VsZCBiZSBwYXJ0IG9mIGEgcGx1Z2luLlxyXG4gICAqL1xyXG5cdHByaXZhdGUgX21lcmdlcnM6IGFueVtdID0gW107XHJcblxyXG5cdC8qKlxyXG4gICAqIEFuaW1hdGlvbiBzcGVlZCBpbiBtaWxsaXNlY29uZHMuXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfc3BlZWQ6IG51bWJlciB8IG51bGwgPSBudWxsO1xyXG5cclxuXHQvKipcclxuICAgKiBDb29yZGluYXRlcyBvZiBhbGwgaXRlbXMgaW4gcGl4ZWwuXHJcbiAgICogQHRvZG8gVGhlIG5hbWUgb2YgdGhpcyBtZW1iZXIgaXMgbWlzc2xlYWRpbmcuXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfY29vcmRpbmF0ZXM6IG51bWJlcltdID0gW107XHJcblxyXG5cdC8qKlxyXG4gICAqIEN1cnJlbnQgYnJlYWtwb2ludC5cclxuICAgKiBAdG9kbyBSZWFsIG1lZGlhIHF1ZXJpZXMgd291bGQgYmUgbmljZS5cclxuICAgKi9cclxuXHRwcml2YXRlIF9icmVha3BvaW50OiBhbnkgPSBudWxsO1xyXG5cclxuXHQvKipcclxuXHQgKiBQcmVmaXggZm9yIGlkIG9mIGNsb25lZCBzbGlkZXNcclxuXHQgKi9cclxuXHRjbG9uZWRJZFByZWZpeCA9ICdjbG9uZWQtJztcclxuXHJcblx0LyoqXHJcblx0ICogQ3VycmVudCBvcHRpb25zIHNldCBieSB0aGUgY2FsbGVyIGluY2x1ZGluZyBkZWZhdWx0cy5cclxuXHQgKi9cclxuXHRfb3B0aW9uczogT3dsT3B0aW9ucyA9IHt9O1xyXG5cclxuICAvKipcclxuICAgKiBJbnZhbGlkYXRlZCBwYXJ0cyB3aXRoaW4gdGhlIHVwZGF0ZSBwcm9jZXNzLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2ludmFsaWRhdGVkOiBhbnkgPSB7fTtcclxuXHJcbiAgLy8gSXMgbmVlZGVkIGZvciB0ZXN0c1xyXG4gIGdldCBpbnZhbGlkYXRlZCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9pbnZhbGlkYXRlZDtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogQ3VycmVudCBzdGF0ZSBpbmZvcm1hdGlvbiBhbmQgdGhlaXIgdGFncy5cclxuICAgKi9cclxuICBwcml2YXRlIF9zdGF0ZXM6IFN0YXRlcyA9IHtcclxuICAgIGN1cnJlbnQ6IHt9LFxyXG4gICAgdGFnczoge1xyXG4gICAgICBpbml0aWFsaXppbmc6IFsnYnVzeSddLFxyXG4gICAgICBhbmltYXRpbmc6IFsnYnVzeSddLFxyXG4gICAgICBkcmFnZ2luZzogWydpbnRlcmFjdGluZyddXHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLy8gaXMgbmVlZGVkIGZvciB0ZXN0c1xyXG4gIGdldCBzdGF0ZXMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fc3RhdGVzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcbiBcdCAqIE9yZGVyZWQgbGlzdCBvZiB3b3JrZXJzIGZvciB0aGUgdXBkYXRlIHByb2Nlc3MuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfcGlwZTogYW55W10gPSBbXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgIGZpbHRlcjogWyd3aWR0aCcsICdzZXR0aW5ncyddLFxyXG4gICAgLy8gICBydW46ICgpID0+IHtcclxuICAgIC8vICAgICB0aGlzLl93aWR0aCA9IHRoaXMuY2Fyb3VzZWxXaW5kb3dXaWR0aDtcclxuICAgIC8vICAgfVxyXG4gICAgLy8gfSxcclxuICAgIHtcclxuICAgICAgZmlsdGVyOiBbJ3dpZHRoJywgJ2l0ZW1zJywgJ3NldHRpbmdzJ10sXHJcbiAgICAgIHJ1bjogY2FjaGUgPT4ge1xyXG4gICAgICAgIGNhY2hlLmN1cnJlbnQgPSB0aGlzLl9pdGVtcyAmJiB0aGlzLl9pdGVtc1t0aGlzLnJlbGF0aXZlKHRoaXMuX2N1cnJlbnQpXS5pZDtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vIHtcclxuICAgIC8vICAgZmlsdGVyOiBbJ2l0ZW1zJywgJ3NldHRpbmdzJ10sXHJcbiAgICAvLyAgIHJ1bjogZnVuY3Rpb24oKSB7XHJcbiAgICAvLyAgICAgLy8gdGhpcy4kc3RhZ2UuY2hpbGRyZW4oJy5jbG9uZWQnKS5yZW1vdmUoKTtcclxuICAgIC8vICAgfVxyXG5cdFx0Ly8gfSxcclxuXHRcdCB7XHJcbiAgICAgIGZpbHRlcjogWyAnd2lkdGgnLCAnaXRlbXMnLCAnc2V0dGluZ3MnIF0sXHJcbiAgICAgIHJ1bjogKGNhY2hlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbWFyZ2luID0gdGhpcy5zZXR0aW5ncy5tYXJnaW4gfHwgJycsXHJcbiAgICAgICAgICBncmlkID0gIXRoaXMuc2V0dGluZ3MuYXV0b1dpZHRoLFxyXG4gICAgICAgICAgcnRsID0gdGhpcy5zZXR0aW5ncy5ydGwsXHJcbiAgICAgICAgICBjc3MgPSB7XHJcbiAgICAgICAgICAgICdtYXJnaW4tbGVmdCc6IHJ0bCA/IG1hcmdpbiA6ICcnLFxyXG4gICAgICAgICAgICAnbWFyZ2luLXJpZ2h0JzogcnRsID8gJycgOiBtYXJnaW5cclxuICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmKCFncmlkKSB7XHJcblx0XHRcdFx0XHR0aGlzLnNsaWRlc0RhdGEuZm9yRWFjaChzbGlkZSA9PiB7XHJcblx0XHRcdFx0XHRcdHNsaWRlLm1hcmdpbkwgPSBjc3NbJ21hcmdpbi1sZWZ0J107XHJcblx0XHRcdFx0XHRcdHNsaWRlLm1hcmdpblIgPSBjc3NbJ21hcmdpbi1yaWdodCddO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fVxyXG5cclxuICAgICAgICBjYWNoZS5jc3MgPSBjc3M7XHJcbiAgICAgIH1cclxuICAgIH0sIHtcclxuICAgICAgZmlsdGVyOiBbICd3aWR0aCcsICdpdGVtcycsICdzZXR0aW5ncycgXSxcclxuICAgICAgcnVuOiAoY2FjaGUpID0+IHtcclxuICAgICAgICBjb25zdCB3aWR0aDogYW55ID0gKyh0aGlzLndpZHRoKCkgLyB0aGlzLnNldHRpbmdzLml0ZW1zKS50b0ZpeGVkKDMpIC0gdGhpcy5zZXR0aW5ncy5tYXJnaW4sXHJcbiAgICAgICAgICBncmlkID0gIXRoaXMuc2V0dGluZ3MuYXV0b1dpZHRoLFxyXG4gICAgICAgICAgd2lkdGhzID0gW107XHJcblx0XHRcdFx0bGV0IG1lcmdlID0gbnVsbCxcclxuXHRcdFx0XHRcdFx0aXRlcmF0b3IgPSB0aGlzLl9pdGVtcy5sZW5ndGg7XHJcblxyXG4gICAgICAgIGNhY2hlLml0ZW1zID0ge1xyXG4gICAgICAgICAgbWVyZ2U6IGZhbHNlLFxyXG4gICAgICAgICAgd2lkdGg6IHdpZHRoXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgd2hpbGUgKGl0ZXJhdG9yLS0pIHtcclxuICAgICAgICAgIG1lcmdlID0gdGhpcy5fbWVyZ2Vyc1tpdGVyYXRvcl07XHJcbiAgICAgICAgICBtZXJnZSA9IHRoaXMuc2V0dGluZ3MubWVyZ2VGaXQgJiYgTWF0aC5taW4obWVyZ2UsIHRoaXMuc2V0dGluZ3MuaXRlbXMpIHx8IG1lcmdlO1xyXG4gICAgICAgICAgY2FjaGUuaXRlbXMubWVyZ2UgPSBtZXJnZSA+IDEgfHwgY2FjaGUuaXRlbXMubWVyZ2U7XHJcblxyXG4gICAgICAgICAgd2lkdGhzW2l0ZXJhdG9yXSA9ICFncmlkID8gdGhpcy5faXRlbXNbaXRlcmF0b3JdLndpZHRoID8gdGhpcy5faXRlbXNbaXRlcmF0b3JdLndpZHRoIDogd2lkdGggOiB3aWR0aCAqIG1lcmdlO1xyXG4gICAgICAgIH1cclxuXHJcblx0XHRcdFx0dGhpcy5fd2lkdGhzID0gd2lkdGhzO1xyXG5cclxuXHRcdFx0XHR0aGlzLnNsaWRlc0RhdGEuZm9yRWFjaCgoc2xpZGUsIGkpID0+IHtcclxuXHRcdFx0XHRcdHNsaWRlLndpZHRoID0gdGhpcy5fd2lkdGhzW2ldO1xyXG5cdFx0XHRcdFx0c2xpZGUubWFyZ2luUiA9IGNhY2hlLmNzc1snbWFyZ2luLXJpZ2h0J107XHJcblx0XHRcdFx0XHRzbGlkZS5tYXJnaW5MID0gY2FjaGUuY3NzWydtYXJnaW4tbGVmdCddO1xyXG5cdFx0XHRcdH0pO1xyXG4gICAgICB9XHJcbiAgICB9LCB7XHJcbiAgICAgIGZpbHRlcjogWyAnaXRlbXMnLCAnc2V0dGluZ3MnIF0sXHJcbiAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNsb25lczogYW55W10gPSBbXSxcclxuICAgICAgICAgIGl0ZW1zOiBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlW10gPSB0aGlzLl9pdGVtcyxcclxuICAgICAgICAgIHNldHRpbmdzOiBhbnkgPSB0aGlzLnNldHRpbmdzLFxyXG4gICAgICAgICAgLy8gVE9ETzogU2hvdWxkIGJlIGNvbXB1dGVkIGZyb20gbnVtYmVyIG9mIG1pbiB3aWR0aCBpdGVtcyBpbiBzdGFnZVxyXG4gICAgICAgICAgdmlldyA9IE1hdGgubWF4KHNldHRpbmdzLml0ZW1zICogMiwgNCksXHJcbiAgICAgICAgICBzaXplID0gTWF0aC5jZWlsKGl0ZW1zLmxlbmd0aCAvIDIpICogMjtcclxuXHRcdFx0XHRsZXQgIGFwcGVuZDogYW55W10gPSBbXSxcclxuICAgICAgICAgIHByZXBlbmQ6IGFueVtdID0gW10sXHJcblx0XHRcdFx0XHRyZXBlYXQgPSBzZXR0aW5ncy5sb29wICYmIGl0ZW1zLmxlbmd0aCA/IHNldHRpbmdzLnJld2luZCA/IHZpZXcgOiBNYXRoLm1heCh2aWV3LCBzaXplKSA6IDA7XHJcblxyXG4gICAgICAgIHJlcGVhdCAvPSAyO1xyXG5cclxuICAgICAgICB3aGlsZSAocmVwZWF0LS0pIHtcclxuICAgICAgICAgIC8vIFN3aXRjaCB0byBvbmx5IHVzaW5nIGFwcGVuZGVkIGNsb25lc1xyXG4gICAgICAgICAgY2xvbmVzLnB1c2godGhpcy5ub3JtYWxpemUoY2xvbmVzLmxlbmd0aCAvIDIsIHRydWUpKTtcclxuICAgICAgICAgIGFwcGVuZC5wdXNoKHsgLi4udGhpcy5zbGlkZXNEYXRhW2Nsb25lc1tjbG9uZXMubGVuZ3RoIC0gMV1dfSk7XHJcblx0XHRcdFx0XHRjbG9uZXMucHVzaCh0aGlzLm5vcm1hbGl6ZShpdGVtcy5sZW5ndGggLSAxIC0gKGNsb25lcy5sZW5ndGggLSAxKSAvIDIsIHRydWUpKTtcclxuXHRcdFx0XHRcdHByZXBlbmQudW5zaGlmdCh7IC4uLnRoaXMuc2xpZGVzRGF0YVtjbG9uZXNbY2xvbmVzLmxlbmd0aCAtIDFdXX0pO1xyXG4gICAgICAgIH1cclxuXHJcblx0XHRcdFx0dGhpcy5fY2xvbmVzID0gY2xvbmVzO1xyXG5cclxuXHRcdFx0XHRhcHBlbmQgPSBhcHBlbmQubWFwKHNsaWRlID0+IHtcclxuXHRcdFx0XHRcdHNsaWRlLmlkID0gYCR7dGhpcy5jbG9uZWRJZFByZWZpeH0ke3NsaWRlLmlkfWA7XHJcblx0XHRcdFx0XHRzbGlkZS5pc0FjdGl2ZSA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0c2xpZGUuaXNDbG9uZWQgPSB0cnVlO1xyXG5cdFx0XHRcdFx0cmV0dXJuIHNsaWRlO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRwcmVwZW5kID0gcHJlcGVuZC5tYXAoc2xpZGUgPT4ge1xyXG5cdFx0XHRcdFx0c2xpZGUuaWQgPSBgJHt0aGlzLmNsb25lZElkUHJlZml4fSR7c2xpZGUuaWR9YDtcclxuXHRcdFx0XHRcdHNsaWRlLmlzQWN0aXZlID0gZmFsc2U7XHJcblx0XHRcdFx0XHRzbGlkZS5pc0Nsb25lZCA9IHRydWU7XHJcblx0XHRcdFx0XHRyZXR1cm4gc2xpZGU7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdHRoaXMuc2xpZGVzRGF0YSA9IHByZXBlbmQuY29uY2F0KHRoaXMuc2xpZGVzRGF0YSkuY29uY2F0KGFwcGVuZCk7XHJcbiAgICAgIH1cclxuICAgIH0sIHtcclxuICAgICAgZmlsdGVyOiBbICd3aWR0aCcsICdpdGVtcycsICdzZXR0aW5ncycgXSxcclxuICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcnRsID0gdGhpcy5zZXR0aW5ncy5ydGwgPyAxIDogLTEsXHJcbiAgICAgICAgICBzaXplID0gdGhpcy5fY2xvbmVzLmxlbmd0aCArIHRoaXMuX2l0ZW1zLmxlbmd0aCxcclxuICAgICAgICAgIGNvb3JkaW5hdGVzID0gW107XHJcbiAgICAgICAgbGV0IGl0ZXJhdG9yID0gLTEsXHJcbiAgICAgICAgICBwcmV2aW91cyA9IDAsXHJcbiAgICAgICAgICBjdXJyZW50ID0gMDtcclxuXHJcbiAgICAgICAgd2hpbGUgKCsraXRlcmF0b3IgPCBzaXplKSB7XHJcbiAgICAgICAgICBwcmV2aW91cyA9IGNvb3JkaW5hdGVzW2l0ZXJhdG9yIC0gMV0gfHwgMDtcclxuICAgICAgICAgIGN1cnJlbnQgPSB0aGlzLl93aWR0aHNbdGhpcy5yZWxhdGl2ZShpdGVyYXRvcildICsgdGhpcy5zZXR0aW5ncy5tYXJnaW47XHJcbiAgICAgICAgICBjb29yZGluYXRlcy5wdXNoKHByZXZpb3VzICsgY3VycmVudCAqIHJ0bCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9jb29yZGluYXRlcyA9IGNvb3JkaW5hdGVzO1xyXG4gICAgICB9XHJcbiAgICB9LCB7XHJcbiAgICAgIGZpbHRlcjogWyAnd2lkdGgnLCAnaXRlbXMnLCAnc2V0dGluZ3MnIF0sXHJcbiAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHBhZGRpbmcgPSB0aGlzLnNldHRpbmdzLnN0YWdlUGFkZGluZyxcclxuICAgICAgICAgIGNvb3JkaW5hdGVzID0gdGhpcy5fY29vcmRpbmF0ZXMsXHJcbiAgICAgICAgICBjc3MgPSB7XHJcbiAgICAgICAgICAgICd3aWR0aCc6IE1hdGguY2VpbChNYXRoLmFicyhjb29yZGluYXRlc1tjb29yZGluYXRlcy5sZW5ndGggLSAxXSkpICsgcGFkZGluZyAqIDIsXHJcbiAgICAgICAgICAgICdwYWRkaW5nLWxlZnQnOiBwYWRkaW5nIHx8ICcnLFxyXG4gICAgICAgICAgICAncGFkZGluZy1yaWdodCc6IHBhZGRpbmcgfHwgJydcclxuXHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdHRoaXMuc3RhZ2VEYXRhLndpZHRoID0gY3NzLndpZHRoOyAvLyB1c2UgdGhpcyBwcm9wZXJ0eSBpbiAqbmdJZiBkaXJlY3RpdmUgZm9yIC5vd2wtc3RhZ2UgZWxlbWVudFxyXG5cdFx0XHRcdHRoaXMuc3RhZ2VEYXRhLnBhZGRpbmdMID0gY3NzWydwYWRkaW5nLWxlZnQnXTtcclxuXHRcdFx0XHR0aGlzLnN0YWdlRGF0YS5wYWRkaW5nUiA9IGNzc1sncGFkZGluZy1yaWdodCddO1xyXG4gICAgICB9XHJcbiAgICB9LCB7XHJcbiAgICAvLyAgIGZpbHRlcjogWyAnd2lkdGgnLCAnaXRlbXMnLCAnc2V0dGluZ3MnIF0sXHJcbiAgICAvLyAgIHJ1bjogY2FjaGUgPT4ge1xyXG5cdFx0Ly8gXHRcdC8vIHRoaXMgbWV0aG9kIHNldHMgdGhlIHdpZHRoIGZvciBldmVyeSBzbGlkZSwgYnV0IEkgc2V0IGl0IGluIGRpZmZlcmVudCB3YXkgZWFybGllclxyXG5cdFx0Ly8gXHRcdGNvbnN0IGdyaWQgPSAhdGhpcy5zZXR0aW5ncy5hdXRvV2lkdGgsXHJcblx0XHQvLyBcdFx0aXRlbXMgPSB0aGlzLiRzdGFnZS5jaGlsZHJlbigpOyAvLyB1c2UgdGhpcy5zbGlkZXNEYXRhXHJcbiAgICAvLyAgICAgbGV0IGl0ZXJhdG9yID0gdGhpcy5fY29vcmRpbmF0ZXMubGVuZ3RoO1xyXG5cclxuICAgIC8vICAgICBpZiAoZ3JpZCAmJiBjYWNoZS5pdGVtcy5tZXJnZSkge1xyXG4gICAgLy8gICAgICAgd2hpbGUgKGl0ZXJhdG9yLS0pIHtcclxuICAgIC8vICAgICAgICAgY2FjaGUuY3NzLndpZHRoID0gdGhpcy5fd2lkdGhzW3RoaXMucmVsYXRpdmUoaXRlcmF0b3IpXTtcclxuICAgIC8vICAgICAgICAgaXRlbXMuZXEoaXRlcmF0b3IpLmNzcyhjYWNoZS5jc3MpO1xyXG4gICAgLy8gICAgICAgfVxyXG4gICAgLy8gICAgIH0gZWxzZSBpZiAoZ3JpZCkge1xyXG4gICAgLy8gICAgICAgY2FjaGUuY3NzLndpZHRoID0gY2FjaGUuaXRlbXMud2lkdGg7XHJcbiAgICAvLyAgICAgICBpdGVtcy5jc3MoY2FjaGUuY3NzKTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgIH1cclxuICAgIC8vIH0sIHtcclxuICAgIC8vICAgZmlsdGVyOiBbICdpdGVtcycgXSxcclxuICAgIC8vICAgcnVuOiBmdW5jdGlvbigpIHtcclxuICAgIC8vICAgICB0aGlzLl9jb29yZGluYXRlcy5sZW5ndGggPCAxICYmIHRoaXMuJHN0YWdlLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAvLyAgIH1cclxuICAgIC8vIH0sIHtcclxuICAgICAgZmlsdGVyOiBbICd3aWR0aCcsICdpdGVtcycsICdzZXR0aW5ncycgXSxcclxuICAgICAgcnVuOiBjYWNoZSA9PiB7XHJcbiAgICAgICAgbGV0IGN1cnJlbnQgPSBjYWNoZS5jdXJyZW50ID8gdGhpcy5zbGlkZXNEYXRhLmZpbmRJbmRleChzbGlkZSA9PiBzbGlkZS5pZCA9PT0gY2FjaGUuY3VycmVudCkgOiAwO1xyXG4gICAgICAgXHRjdXJyZW50ID0gTWF0aC5tYXgodGhpcy5taW5pbXVtKCksIE1hdGgubWluKHRoaXMubWF4aW11bSgpLCBjdXJyZW50KSk7XHJcbiAgICAgICAgdGhpcy5yZXNldChjdXJyZW50KTtcclxuICAgICAgfVxyXG4gICAgfSwge1xyXG4gICAgICBmaWx0ZXI6IFsgJ3Bvc2l0aW9uJyBdLFxyXG4gICAgICBydW46ICgpID0+IHtcclxuICAgICAgICB0aGlzLmFuaW1hdGUodGhpcy5jb29yZGluYXRlcyh0aGlzLl9jdXJyZW50KSk7XHJcbiAgICAgIH1cclxuICAgIH0sIHtcclxuICAgICAgZmlsdGVyOiBbICd3aWR0aCcsICdwb3NpdGlvbicsICdpdGVtcycsICdzZXR0aW5ncycgXSxcclxuICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcnRsID0gdGhpcy5zZXR0aW5ncy5ydGwgPyAxIDogLTEsXHJcblx0XHRcdFx0XHRwYWRkaW5nID0gdGhpcy5zZXR0aW5ncy5zdGFnZVBhZGRpbmcgKiAyLFxyXG5cdFx0XHRcdFx0bWF0Y2hlcyA9IFtdO1xyXG5cdFx0XHRcdGxldCBiZWdpbiwgZW5kLCBpbm5lciwgb3V0ZXIsIGksIG47XHJcblxyXG5cdFx0XHRcdGJlZ2luID0gdGhpcy5jb29yZGluYXRlcyh0aGlzLmN1cnJlbnQoKSk7XHJcblx0XHRcdFx0aWYgKHR5cGVvZiBiZWdpbiA9PT0gJ251bWJlcicgKSB7XHJcblx0XHRcdFx0XHRiZWdpbiArPSBwYWRkaW5nO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRiZWdpbiA9IDA7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRlbmQgPSBiZWdpbiArIHRoaXMud2lkdGgoKSAqIHJ0bDtcclxuXHJcblx0XHRcdFx0aWYgKHJ0bCA9PT0gLTEgJiYgdGhpcy5zZXR0aW5ncy5jZW50ZXIpIHtcclxuXHRcdFx0XHRcdGNvbnN0IHJlc3VsdCA9XHR0aGlzLl9jb29yZGluYXRlcy5maWx0ZXIoZWxlbWVudCA9PiB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLnNldHRpbmdzLml0ZW1zICUgMiA9PT0gMSA/IGVsZW1lbnQgPj0gYmVnaW4gOiBlbGVtZW50ID4gYmVnaW47XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdGJlZ2luID0gcmVzdWx0Lmxlbmd0aCA/IHJlc3VsdFtyZXN1bHQubGVuZ3RoIC0gMV0gOiBiZWdpbjtcclxuXHRcdFx0XHR9XHJcblxyXG4gICAgICAgIGZvciAoaSA9IDAsIG4gPSB0aGlzLl9jb29yZGluYXRlcy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgIGlubmVyID0gTWF0aC5jZWlsKHRoaXMuX2Nvb3JkaW5hdGVzW2kgLSAxXSB8fCAwKTtcclxuXHRcdFx0XHRcdG91dGVyID0gTWF0aC5jZWlsKE1hdGguYWJzKHRoaXMuX2Nvb3JkaW5hdGVzW2ldKSArIHBhZGRpbmcgKiBydGwpO1xyXG5cclxuICAgICAgICAgIGlmICgodGhpcy5fb3AoaW5uZXIsICc8PScsIGJlZ2luKSAmJiAodGhpcy5fb3AoaW5uZXIsICc+JywgZW5kKSkpXHJcbiAgICAgICAgICAgIHx8ICh0aGlzLl9vcChvdXRlciwgJzwnLCBiZWdpbikgJiYgdGhpcy5fb3Aob3V0ZXIsICc+JywgZW5kKSkpIHtcclxuICAgICAgICAgICAgbWF0Y2hlcy5wdXNoKGkpO1xyXG4gICAgICAgICAgfVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dGhpcy5zbGlkZXNEYXRhLmZvckVhY2goc2xpZGUgPT4ge1xyXG5cdFx0XHRcdFx0c2xpZGUuaXNBY3RpdmUgPSBmYWxzZTtcclxuXHRcdFx0XHRcdHJldHVybiBzbGlkZTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRtYXRjaGVzLmZvckVhY2goaXRlbSA9PiB7XHJcblx0XHRcdFx0XHR0aGlzLnNsaWRlc0RhdGFbaXRlbV0uaXNBY3RpdmUgPSB0cnVlO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5jZW50ZXIpIHtcclxuXHRcdFx0XHRcdHRoaXMuc2xpZGVzRGF0YS5mb3JFYWNoKHNsaWRlID0+IHtcclxuXHRcdFx0XHRcdFx0c2xpZGUuaXNDZW50ZXJlZCA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gc2xpZGU7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdHRoaXMuc2xpZGVzRGF0YVt0aGlzLmN1cnJlbnQoKV0uaXNDZW50ZXJlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgXTtcclxuXHJcblx0Y29uc3RydWN0b3IocHJpdmF0ZSBsb2dnZXI6IE93bExvZ2dlcikgeyB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIF92aWV3U2V0dGluZ3NTaGlwcGVyJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXHJcblx0ICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfdmlld1NldHRpbmdzU2hpcHBlciQgU3ViamVjdFxyXG5cdCAqL1xyXG5cdGdldFZpZXdDdXJTZXR0aW5ncygpOiBPYnNlcnZhYmxlPENhcm91c2VsQ3VycmVudERhdGE+IHtcclxuXHRcdHJldHVybiB0aGlzLl92aWV3U2V0dGluZ3NTaGlwcGVyJC5hc09ic2VydmFibGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIF9pbml0aWFsaXplZENhcm91c2VsJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXHJcblx0ICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfaW5pdGlhbGl6ZWRDYXJvdXNlbCQgU3ViamVjdFxyXG5cdCAqL1xyXG5cdGdldEluaXRpYWxpemVkU3RhdGUoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcclxuXHRcdHJldHVybiB0aGlzLl9pbml0aWFsaXplZENhcm91c2VsJC5hc09ic2VydmFibGUoKVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgX2NoYW5nZVNldHRpbmdzQ2Fyb3VzZWwkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcclxuXHQgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIF9jaGFuZ2VTZXR0aW5nc0Nhcm91c2VsJCBTdWJqZWN0XHJcblx0ICovXHJcblx0Z2V0Q2hhbmdlU3RhdGUoKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuXHRcdHJldHVybiB0aGlzLl9jaGFuZ2VTZXR0aW5nc0Nhcm91c2VsJC5hc09ic2VydmFibGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIF9jaGFuZ2VkU2V0dGluZ3NDYXJvdXNlbCQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxyXG5cdCAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX2NoYW5nZWRTZXR0aW5nc0Nhcm91c2VsJCBTdWJqZWN0XHJcblx0ICovXHJcblx0Z2V0Q2hhbmdlZFN0YXRlKCk6IE9ic2VydmFibGU8YW55PiB7XHJcblx0XHRyZXR1cm4gdGhpcy5fY2hhbmdlZFNldHRpbmdzQ2Fyb3VzZWwkLmFzT2JzZXJ2YWJsZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgX3RyYW5zbGF0ZUNhcm91c2VsJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXHJcblx0ICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfdHJhbnNsYXRlQ2Fyb3VzZWwkIFN1YmplY3RcclxuXHQgKi9cclxuXHRnZXRUcmFuc2xhdGVTdGF0ZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3RyYW5zbGF0ZUNhcm91c2VsJC5hc09ic2VydmFibGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIF90cmFuc2xhdGVkQ2Fyb3VzZWwkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcclxuXHQgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIF90cmFuc2xhdGVkQ2Fyb3VzZWwkIFN1YmplY3RcclxuXHQgKi9cclxuXHRnZXRUcmFuc2xhdGVkU3RhdGUoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcclxuXHRcdHJldHVybiB0aGlzLl90cmFuc2xhdGVkQ2Fyb3VzZWwkLmFzT2JzZXJ2YWJsZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgX3Jlc2l6ZUNhcm91c2VsJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXHJcblx0ICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfcmVzaXplQ2Fyb3VzZWwkIFN1YmplY3RcclxuXHQgKi9cclxuXHRnZXRSZXNpemVTdGF0ZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3Jlc2l6ZUNhcm91c2VsJC5hc09ic2VydmFibGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIF9yZXNpemVkQ2Fyb3VzZWwkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcclxuXHQgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIF9yZXNpemVkQ2Fyb3VzZWwkIFN1YmplY3RcclxuXHQgKi9cclxuXHRnZXRSZXNpemVkU3RhdGUoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcclxuXHRcdHJldHVybiB0aGlzLl9yZXNpemVkQ2Fyb3VzZWwkLmFzT2JzZXJ2YWJsZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgX3JlZnJlc2hDYXJvdXNlbCQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxyXG5cdCAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX3JlZnJlc2hDYXJvdXNlbCQgU3ViamVjdFxyXG5cdCAqL1xyXG5cdGdldFJlZnJlc2hTdGF0ZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3JlZnJlc2hDYXJvdXNlbCQuYXNPYnNlcnZhYmxlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBfcmVmcmVzaGVkQ2Fyb3VzZWwkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcclxuXHQgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIF9yZWZyZXNoZWRDYXJvdXNlbCQgU3ViamVjdFxyXG5cdCAqL1xyXG5cdGdldFJlZnJlc2hlZFN0YXRlKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XHJcblx0XHRyZXR1cm4gdGhpcy5fcmVmcmVzaGVkQ2Fyb3VzZWwkLmFzT2JzZXJ2YWJsZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgX2RyYWdDYXJvdXNlbCQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxyXG5cdCAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX2RyYWdDYXJvdXNlbCQgU3ViamVjdFxyXG5cdCAqL1xyXG5cdGdldERyYWdTdGF0ZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2RyYWdDYXJvdXNlbCQuYXNPYnNlcnZhYmxlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBfZHJhZ2dlZENhcm91c2VsJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXHJcblx0ICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfZHJhZ2dlZENhcm91c2VsJCBTdWJqZWN0XHJcblx0ICovXHJcblx0Z2V0RHJhZ2dlZFN0YXRlKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XHJcblx0XHRyZXR1cm4gdGhpcy5fZHJhZ2dlZENhcm91c2VsJC5hc09ic2VydmFibGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHVwcyBjdXN0b20gb3B0aW9ucyBleHBhbmRpbmcgZGVmYXVsdCBvcHRpb25zXHJcblx0ICogQHBhcmFtIG9wdGlvbnMgY3VzdG9tIG9wdGlvbnNcclxuXHQgKi9cclxuXHRzZXRPcHRpb25zKG9wdGlvbnM6IE93bE9wdGlvbnMpIHtcclxuXHRcdGNvbnN0IGNvbmZpZ09wdGlvbnM6IE93bE9wdGlvbnMgPSBuZXcgT3dsQ2Fyb3VzZWxPQ29uZmlnKCk7XHJcblx0XHRjb25zdCBjaGVja2VkT3B0aW9uczogT3dsT3B0aW9ucyA9IHRoaXMuX3ZhbGlkYXRlT3B0aW9ucyhvcHRpb25zLCBjb25maWdPcHRpb25zKTtcclxuXHRcdHRoaXMuX29wdGlvbnMgPSB7IC4uLmNvbmZpZ09wdGlvbnMsIC4uLmNoZWNrZWRPcHRpb25zfTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyB3aGV0aGVyIHVzZXIncyBvcHRpb24gYXJlIHNldCBwcm9wZXJseS4gQ2hla2luZyBpcyBiYXNlZCBvbiB0eXBpbmdzO1xyXG5cdCAqIEBwYXJhbSBvcHRpb25zIG9wdGlvbnMgc2V0IGJ5IHVzZXJcclxuXHQgKiBAcGFyYW0gY29uZmlnT3B0aW9ucyBkZWZhdWx0IG9wdGlvbnNcclxuXHQgKiBAcmV0dXJucyBjaGVja2VkIGFuZCBtb2RpZmllZCAoaWYgaXQncyBuZWVkZWQpIHVzZXIncyBvcHRpb25zXHJcblx0ICpcclxuXHQgKiBOb3RlczpcclxuXHQgKiBcdC0gaWYgdXNlciBzZXQgb3B0aW9uIHdpdGggd3JvbmcgdHlwZSwgaXQnbGwgYmUgd3JpdHRlbiBpbiBjb25zb2xlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBfdmFsaWRhdGVPcHRpb25zKG9wdGlvbnM6IE93bE9wdGlvbnMsIGNvbmZpZ09wdGlvbnM6IE93bE9wdGlvbnMpOiBPd2xPcHRpb25zIHtcclxuXHRcdGNvbnN0IGNoZWNrZWRPcHRpb25zOiBPd2xPcHRpb25zID0geyAuLi5vcHRpb25zfTtcclxuXHRcdGNvbnN0IG1vY2tlZFR5cGVzID0gbmV3IE93bE9wdGlvbnNNb2NrZWRUeXBlcygpO1xyXG5cclxuXHRcdGNvbnN0IHNldFJpZ2h0T3B0aW9uID0gKHR5cGU6IHN0cmluZywga2V5OiBhbnkpOiBPd2xPcHRpb25zID0+IHtcclxuXHRcdFx0dGhpcy5sb2dnZXIubG9nKGBvcHRpb25zLiR7a2V5fSBtdXN0IGJlIHR5cGUgb2YgJHt0eXBlfTsgJHtrZXl9PSR7b3B0aW9uc1trZXldfSBza2lwcGVkIHRvIGRlZmF1bHRzOiAke2tleX09JHtjb25maWdPcHRpb25zW2tleV19YCk7XHJcblx0XHRcdHJldHVybiBjb25maWdPcHRpb25zW2tleV07XHJcblx0XHR9O1xyXG5cclxuXHRcdGZvciAoY29uc3Qga2V5IGluIGNoZWNrZWRPcHRpb25zKSB7XHJcblx0XHRcdGlmIChjaGVja2VkT3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcblxyXG5cdFx0XHRcdC8vIGNvbmRpdGlvbiBjb3VsZCBiZSBzaG9ydGVuZWQgYnV0IGl0IGdldHMgaGFyZGVyIGZvciB1bmRlcnN0YW5kaW5nXHJcblx0XHRcdFx0aWYgKG1vY2tlZFR5cGVzW2tleV0gPT09ICdudW1iZXInKSB7XHJcblx0XHRcdFx0XHRpZiAodGhpcy5faXNOdW1lcmljKGNoZWNrZWRPcHRpb25zW2tleV0pKSB7XHJcblx0XHRcdFx0XHRcdGNoZWNrZWRPcHRpb25zW2tleV0gPSArY2hlY2tlZE9wdGlvbnNba2V5XTtcclxuXHRcdFx0XHRcdFx0Y2hlY2tlZE9wdGlvbnNba2V5XSA9IGtleSA9PT0gJ2l0ZW1zJyA/IHRoaXMuX3ZhbGlkYXRlSXRlbXMoY2hlY2tlZE9wdGlvbnNba2V5XSkgOiBjaGVja2VkT3B0aW9uc1trZXldO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0Y2hlY2tlZE9wdGlvbnNba2V5XSA9IHNldFJpZ2h0T3B0aW9uKG1vY2tlZFR5cGVzW2tleV0sIGtleSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSBlbHNlIGlmIChtb2NrZWRUeXBlc1trZXldID09PSAnYm9vbGVhbicgJiYgdHlwZW9mIGNoZWNrZWRPcHRpb25zW2tleV0gIT09ICdib29sZWFuJykge1xyXG5cdFx0XHRcdFx0Y2hlY2tlZE9wdGlvbnNba2V5XSA9IHNldFJpZ2h0T3B0aW9uKG1vY2tlZFR5cGVzW2tleV0sIGtleSk7XHJcblx0XHRcdFx0fSBlbHNlIGlmIChtb2NrZWRUeXBlc1trZXldID09PSAnbnVtYmVyfGJvb2xlYW4nICYmICF0aGlzLl9pc051bWJlck9yQm9vbGVhbihjaGVja2VkT3B0aW9uc1trZXldKSkge1xyXG5cdFx0XHRcdFx0Y2hlY2tlZE9wdGlvbnNba2V5XSA9IHNldFJpZ2h0T3B0aW9uKG1vY2tlZFR5cGVzW2tleV0sIGtleSk7XHJcblx0XHRcdFx0fSBlbHNlIGlmIChtb2NrZWRUeXBlc1trZXldID09PSAnbnVtYmVyfHN0cmluZycgJiYgIXRoaXMuX2lzTnVtYmVyT3JTdHJpbmcoY2hlY2tlZE9wdGlvbnNba2V5XSkpIHtcclxuXHRcdFx0XHRcdGNoZWNrZWRPcHRpb25zW2tleV0gPSBzZXRSaWdodE9wdGlvbihtb2NrZWRUeXBlc1trZXldLCBrZXkpO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAobW9ja2VkVHlwZXNba2V5XSA9PT0gJ3N0cmluZ3xib29sZWFuJyAmJiAhdGhpcy5faXNTdHJpbmdPckJvb2xlYW4oY2hlY2tlZE9wdGlvbnNba2V5XSkpIHtcclxuXHRcdFx0XHRcdGNoZWNrZWRPcHRpb25zW2tleV0gPSBzZXRSaWdodE9wdGlvbihtb2NrZWRUeXBlc1trZXldLCBrZXkpO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAobW9ja2VkVHlwZXNba2V5XSA9PT0gJ3N0cmluZ1tdJykge1xyXG5cdFx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoY2hlY2tlZE9wdGlvbnNba2V5XSkpIHtcclxuXHRcdFx0XHRcdFx0bGV0IGlzU3RyaW5nID0gZmFsc2U7XHJcblx0XHRcdFx0XHRcdGNoZWNrZWRPcHRpb25zW2tleV0uZm9yRWFjaChlbGVtZW50ID0+IHtcclxuXHRcdFx0XHRcdFx0XHRpc1N0cmluZyA9IHR5cGVvZiBlbGVtZW50ID09PSAnc3RyaW5nJyA/IHRydWUgOiBmYWxzZTtcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdGlmICghaXNTdHJpbmcpIHsgY2hlY2tlZE9wdGlvbnNba2V5XSA9IHNldFJpZ2h0T3B0aW9uKG1vY2tlZFR5cGVzW2tleV0sIGtleSkgfTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGNoZWNrZWRPcHRpb25zW2tleV0gPSBzZXRSaWdodE9wdGlvbihtb2NrZWRUeXBlc1trZXldLCBrZXkpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBjaGVja2VkT3B0aW9ucztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBvcHRpb24gaXRlbXMgc2V0IGJ5IHVzZXIgYW5kIGlmIGl0IGJpZ2dlciB0aGFuIG51bWJlciBvZiBzbGlkZXMgdGhlbiByZXR1cm5zIG51bWJlciBvZiBzbGlkZXNcclxuXHQgKiBAcGFyYW0gaXRlbXMgb3B0aW9uIGl0ZW1zIHNldCBieSB1c2VyXHJcblx0ICogQHJldHVybnMgcmlnaHQgbnVtYmVyIG9mIGl0ZW1zXHJcblx0ICovXHJcblx0cHJpdmF0ZSBfdmFsaWRhdGVJdGVtcyhpdGVtczogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdGxldCByZXN1bHQ6IG51bWJlcjtcclxuXHRcdGlmIChpdGVtcyA+IHRoaXMuX2l0ZW1zLmxlbmd0aCkge1xyXG5cdFx0XHRyZXN1bHQgPSB0aGlzLl9pdGVtcy5sZW5ndGg7XHJcblx0XHRcdHRoaXMubG9nZ2VyLmxvZygnVGhlIG9wdGlvbiBcXCdpdGVtc1xcJyBpbiB5b3VyIG9wdGlvbnMgaXMgYmlnZ2VyIHRoYW4gdGhlIG51bWJlciBvZiBzbGlkZXMuIFRoaXMgb3B0aW9uIGlzIHVwZGF0ZWQgdG8gdGhlIGN1cnJlbnQgbnVtYmVyIG9mIHNsaWRlcyBhbmQgdGhlIG5hdmlnYXRpb24gZ290IGRpc2FibGVkJyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRpZiAoaXRlbXMgPT09IHRoaXMuX2l0ZW1zLmxlbmd0aCAmJiAodGhpcy5zZXR0aW5ncy5kb3RzIHx8IHRoaXMuc2V0dGluZ3MubmF2KSkge1xyXG5cdFx0XHRcdHRoaXMubG9nZ2VyLmxvZygnT3B0aW9uIFxcJ2l0ZW1zXFwnIGluIHlvdXIgb3B0aW9ucyBpcyBlcXVhbCB0byB0aGUgbnVtYmVyIG9mIHNsaWRlcy4gU28gdGhlIG5hdmlnYXRpb24gZ290IGRpc2FibGVkJyk7XHJcblx0XHRcdH1cclxuXHRcdFx0cmVzdWx0ID0gaXRlbXM7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0IGN1cnJlbnQgd2lkdGggb2YgY2Fyb3VzZWxcclxuXHQgKiBAcGFyYW0gd2lkdGggd2lkdGggb2YgY2Fyb3VzZWwgV2luZG93XHJcblx0ICovXHJcblx0c2V0Q2Fyb3VzZWxXaWR0aCh3aWR0aDogbnVtYmVyKSB7XHJcblx0XHR0aGlzLl93aWR0aCA9IHdpZHRoO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogU2V0dXBzIHRoZSBjdXJyZW50IHNldHRpbmdzLlxyXG5cdCAqIEB0b2RvIFJlbW92ZSByZXNwb25zaXZlIGNsYXNzZXMuIFdoeSBzaG91bGQgYWRhcHRpdmUgZGVzaWducyBiZSBicm91Z2h0IGludG8gSUU4P1xyXG5cdCAqIEB0b2RvIFN1cHBvcnQgZm9yIG1lZGlhIHF1ZXJpZXMgYnkgdXNpbmcgYG1hdGNoTWVkaWFgIHdvdWxkIGJlIG5pY2UuXHJcblx0ICogQHBhcmFtIGNhcm91c2VsV2lkdGggd2lkdGggb2YgY2Fyb3VzZWxcclxuXHQgKiBAcGFyYW0gc2xpZGVzIGFycmF5IG9mIHNsaWRlc1xyXG5cdCAqIEBwYXJhbSBvcHRpb25zIG9wdGlvbnMgc2V0IGJ5IHVzZXJcclxuXHQgKi9cclxuICBzZXR1cChjYXJvdXNlbFdpZHRoOiBudW1iZXIsIHNsaWRlczogQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZVtdLCBvcHRpb25zOiBPd2xPcHRpb25zKSB7XHJcblx0XHR0aGlzLnNldENhcm91c2VsV2lkdGgoY2Fyb3VzZWxXaWR0aCk7XHJcblx0XHR0aGlzLnNldEl0ZW1zKHNsaWRlcyk7XHJcblx0XHR0aGlzLl9kZWZpbmVTbGlkZXNEYXRhKCk7XHJcblx0XHR0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XHJcblxyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IHsgLi4udGhpcy5fb3B0aW9uc307XHJcblxyXG5cdFx0dGhpcy5zZXRPcHRpb25zRm9yVmlld3BvcnQoKTtcclxuXHJcblx0XHR0aGlzLl90cmlnZ2VyKCdjaGFuZ2UnLCB7IHByb3BlcnR5OiB7IG5hbWU6ICdzZXR0aW5ncycsIHZhbHVlOiB0aGlzLnNldHRpbmdzIH0gfSk7XHJcblx0XHR0aGlzLmludmFsaWRhdGUoJ3NldHRpbmdzJyk7IC8vIG11c3QgYmUgY2FsbCBvZiB0aGlzIGZ1bmN0aW9uO1xyXG5cdFx0dGhpcy5fdHJpZ2dlcignY2hhbmdlZCcsIHsgcHJvcGVydHk6IHsgbmFtZTogJ3NldHRpbmdzJywgdmFsdWU6IHRoaXMuc2V0dGluZ3MgfSB9KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldCBvcHRpb25zIGZvciBjdXJyZW50IHZpZXdwb3J0XHJcblx0ICovXHJcblx0c2V0T3B0aW9uc0ZvclZpZXdwb3J0KCkge1xyXG5cdFx0Y29uc3Qgdmlld3BvcnQgPSB0aGlzLl93aWR0aCxcclxuXHRcdFx0b3ZlcndyaXRlcyA9IHRoaXMuX29wdGlvbnMucmVzcG9uc2l2ZTtcclxuXHRcdGxldFx0bWF0Y2ggPSAtMTtcclxuXHJcblx0XHRpZiAoIU9iamVjdC5rZXlzKG92ZXJ3cml0ZXMpLmxlbmd0aCkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCF2aWV3cG9ydCkge1xyXG5cdFx0XHR0aGlzLnNldHRpbmdzLml0ZW1zID0gMTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZvciAoY29uc3Qga2V5IGluIG92ZXJ3cml0ZXMpIHtcclxuXHRcdFx0aWYgKG92ZXJ3cml0ZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG5cdFx0XHRcdGlmICgra2V5IDw9IHZpZXdwb3J0ICYmICtrZXkgPiBtYXRjaCkge1xyXG5cdFx0XHRcdFx0bWF0Y2ggPSBOdW1iZXIoa2V5KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0geyAuLi50aGlzLl9vcHRpb25zLCAuLi5vdmVyd3JpdGVzW21hdGNoXSwgaXRlbXM6IChvdmVyd3JpdGVzW21hdGNoXSAmJiBvdmVyd3JpdGVzW21hdGNoXS5pdGVtcykgPyB0aGlzLl92YWxpZGF0ZUl0ZW1zKG92ZXJ3cml0ZXNbbWF0Y2hdLml0ZW1zKSA6IHRoaXMuX29wdGlvbnMuaXRlbXN9O1xyXG5cdFx0Ly8gaWYgKHR5cGVvZiB0aGlzLnNldHRpbmdzLnN0YWdlUGFkZGluZyA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0Ly8gXHR0aGlzLnNldHRpbmdzLnN0YWdlUGFkZGluZyA9IHRoaXMuc2V0dGluZ3Muc3RhZ2VQYWRkaW5nKCk7XHJcblx0XHQvLyB9XHJcblx0XHRkZWxldGUgdGhpcy5zZXR0aW5ncy5yZXNwb25zaXZlO1xyXG5cdFx0dGhpcy5vd2xET01EYXRhLmlzUmVzcG9uc2l2ZSA9IHRydWU7XHJcblx0XHR0aGlzLm93bERPTURhdGEuaXNNb3VzZURyYWdhYmxlID0gdGhpcy5zZXR0aW5ncy5tb3VzZURyYWc7XHJcblx0XHR0aGlzLm93bERPTURhdGEuaXNUb3VjaERyYWdhYmxlID0gdGhpcy5zZXR0aW5ncy50b3VjaERyYWc7XHJcblxyXG5cdFx0Y29uc3QgbWVyZ2VycyA9IFtdO1xyXG5cdFx0dGhpcy5faXRlbXMuZm9yRWFjaChpdGVtID0+IHtcclxuXHRcdFx0Y29uc3QgbWVyZ2VOOiBudW1iZXIgPSB0aGlzLnNldHRpbmdzLm1lcmdlID8gaXRlbS5kYXRhTWVyZ2UgOiAxO1xyXG5cdFx0XHRtZXJnZXJzLnB1c2gobWVyZ2VOKTtcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy5fbWVyZ2VycyA9IG1lcmdlcnM7XHJcblxyXG5cdFx0dGhpcy5fYnJlYWtwb2ludCA9IG1hdGNoO1xyXG5cclxuXHRcdHRoaXMuaW52YWxpZGF0ZSgnc2V0dGluZ3MnKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluaXRpYWxpemVzIHRoZSBjYXJvdXNlbC5cclxuXHQgKiBAcGFyYW0gc2xpZGVzIGFycmF5IG9mIENhcm91c2VsU2xpZGVEaXJlY3RpdmVcclxuXHQgKi9cclxuICBpbml0aWFsaXplKHNsaWRlczogQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZVtdKSB7XHJcblx0XHR0aGlzLmVudGVyKCdpbml0aWFsaXppbmcnKTtcclxuXHRcdC8vIHRoaXMudHJpZ2dlcignaW5pdGlhbGl6ZScpO1xyXG5cclxuXHRcdHRoaXMub3dsRE9NRGF0YS5ydGwgPSB0aGlzLnNldHRpbmdzLnJ0bDtcclxuXHJcblx0XHRpZiAodGhpcy5fbWVyZ2Vycy5sZW5ndGgpIHtcclxuXHRcdFx0dGhpcy5fbWVyZ2VycyA9IFtdO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNsaWRlcy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG5cdFx0XHRjb25zdCBtZXJnZU46IG51bWJlciA9IHRoaXMuc2V0dGluZ3MubWVyZ2UgPyBpdGVtLmRhdGFNZXJnZSA6IDE7XHJcblx0XHRcdHRoaXMuX21lcmdlcnMucHVzaChtZXJnZU4pO1xyXG5cdFx0fSk7XHJcblx0XHR0aGlzLl9jbG9uZXMgPSBbXTtcclxuXHJcblx0XHR0aGlzLnJlc2V0KHRoaXMuX2lzTnVtZXJpYyh0aGlzLnNldHRpbmdzLnN0YXJ0UG9zaXRpb24pID8gK3RoaXMuc2V0dGluZ3Muc3RhcnRQb3NpdGlvbiA6IDApO1xyXG5cclxuXHRcdHRoaXMuaW52YWxpZGF0ZSgnaXRlbXMnKTtcclxuXHRcdHRoaXMucmVmcmVzaCgpO1xyXG5cclxuXHRcdHRoaXMub3dsRE9NRGF0YS5pc0xvYWRlZCA9IHRydWU7XHJcblx0XHR0aGlzLm93bERPTURhdGEuaXNNb3VzZURyYWdhYmxlID0gdGhpcy5zZXR0aW5ncy5tb3VzZURyYWc7XHJcblx0XHR0aGlzLm93bERPTURhdGEuaXNUb3VjaERyYWdhYmxlID0gdGhpcy5zZXR0aW5ncy50b3VjaERyYWc7XHJcblxyXG5cdFx0dGhpcy5zZW5kQ2hhbmdlcygpO1xyXG5cclxuXHRcdHRoaXMubGVhdmUoJ2luaXRpYWxpemluZycpO1xyXG5cdFx0dGhpcy5fdHJpZ2dlcignaW5pdGlhbGl6ZWQnKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBTZW5kcyBhbGwgZGF0YSBuZWVkZWQgZm9yIFZpZXdcclxuXHQgKi9cclxuXHRzZW5kQ2hhbmdlcygpIHtcclxuXHRcdHRoaXMuX3ZpZXdTZXR0aW5nc1NoaXBwZXIkLm5leHQoe1xyXG5cdFx0XHRvd2xET01EYXRhOiB0aGlzLm93bERPTURhdGEsXHJcblx0XHRcdHN0YWdlRGF0YTogdGhpcy5zdGFnZURhdGEsXHJcblx0XHRcdHNsaWRlc0RhdGE6IHRoaXMuc2xpZGVzRGF0YSxcclxuXHRcdFx0bmF2RGF0YTogdGhpcy5uYXZEYXRhLFxyXG5cdFx0XHRkb3RzRGF0YTogdGhpcy5kb3RzRGF0YVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHJcbiAgLyoqXHJcblx0ICogVXBkYXRlcyBvcHRpb24gbG9naWMgaWYgbmVjZXNzZXJ5XHJcblx0ICovXHJcbiAgcHJpdmF0ZSBfb3B0aW9uc0xvZ2ljKCkge1xyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3MuYXV0b1dpZHRoKSB7XHJcblx0XHRcdHRoaXMuc2V0dGluZ3Muc3RhZ2VQYWRkaW5nID0gMDtcclxuXHRcdFx0dGhpcy5zZXR0aW5ncy5tZXJnZSA9IGZhbHNlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlcyB0aGUgdmlld1xyXG4gICAqL1xyXG4gIHVwZGF0ZSgpIHtcclxuICAgIGxldCBpID0gMDtcclxuICAgIGNvbnN0IG4gPSB0aGlzLl9waXBlLmxlbmd0aCxcclxuICAgICAgZmlsdGVyID0gaXRlbSA9PiB0aGlzLl9pbnZhbGlkYXRlZFtpdGVtXSxcclxuXHRcdFx0Y2FjaGUgPSB7fTtcclxuXHJcbiAgICB3aGlsZSAoaSA8IG4pIHtcclxuICAgICAgY29uc3QgZmlsdGVyZWRQaXBlID0gdGhpcy5fcGlwZVtpXS5maWx0ZXIuZmlsdGVyKGZpbHRlcik7XHJcbiAgICAgIGlmICh0aGlzLl9pbnZhbGlkYXRlZC5hbGwgfHwgZmlsdGVyZWRQaXBlLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHR0aGlzLl9waXBlW2ldLnJ1bihjYWNoZSk7XHJcbiAgICAgIH1cclxuICAgICAgaSsrO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5zbGlkZXNEYXRhLmZvckVhY2goc2xpZGUgPT4gc2xpZGUuY2xhc3NlcyA9IHRoaXMuc2V0Q3VyU2xpZGVDbGFzc2VzKHNsaWRlKSk7XHJcblx0XHR0aGlzLnNlbmRDaGFuZ2VzKCk7XHJcblxyXG4gICAgdGhpcy5faW52YWxpZGF0ZWQgPSB7fTtcclxuXHJcbiAgICBpZiAoIXRoaXMuaXMoJ3ZhbGlkJykpIHtcclxuICAgICAgdGhpcy5lbnRlcigndmFsaWQnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEdldHMgdGhlIHdpZHRoIG9mIHRoZSB2aWV3LlxyXG5cdCAqIEBwYXJhbSBbZGltZW5zaW9uPVdpZHRoLkRlZmF1bHRdIFRoZSBkaW1lbnNpb24gdG8gcmV0dXJuXHJcblx0ICogQHJldHVybnMgVGhlIHdpZHRoIG9mIHRoZSB2aWV3IGluIHBpeGVsLlxyXG5cdCAqL1xyXG4gIHdpZHRoKGRpbWVuc2lvbj86IFdpZHRoKTogbnVtYmVyIHtcclxuXHRcdGRpbWVuc2lvbiA9IGRpbWVuc2lvbiB8fCBXaWR0aC5EZWZhdWx0O1xyXG5cdFx0c3dpdGNoIChkaW1lbnNpb24pIHtcclxuXHRcdFx0Y2FzZSBXaWR0aC5Jbm5lcjpcclxuXHRcdFx0Y2FzZSBXaWR0aC5PdXRlcjpcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5fd2lkdGg7XHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuX3dpZHRoIC0gdGhpcy5zZXR0aW5ncy5zdGFnZVBhZGRpbmcgKiAyICsgdGhpcy5zZXR0aW5ncy5tYXJnaW47XHJcblx0XHR9XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBSZWZyZXNoZXMgdGhlIGNhcm91c2VsIHByaW1hcmlseSBmb3IgYWRhcHRpdmUgcHVycG9zZXMuXHJcblx0ICovXHJcbiAgcmVmcmVzaCgpIHtcclxuXHRcdHRoaXMuZW50ZXIoJ3JlZnJlc2hpbmcnKTtcclxuXHRcdHRoaXMuX3RyaWdnZXIoJ3JlZnJlc2gnKTtcclxuXHRcdHRoaXMuX2RlZmluZVNsaWRlc0RhdGEoKTtcclxuXHRcdHRoaXMuc2V0T3B0aW9uc0ZvclZpZXdwb3J0KCk7XHJcblxyXG5cdFx0dGhpcy5fb3B0aW9uc0xvZ2ljKCk7XHJcblxyXG5cdFx0Ly8gdGhpcy4kZWxlbWVudC5hZGRDbGFzcyh0aGlzLm9wdGlvbnMucmVmcmVzaENsYXNzKTtcclxuXHJcblx0XHR0aGlzLnVwZGF0ZSgpO1xyXG5cclxuXHRcdC8vIHRoaXMuJGVsZW1lbnQucmVtb3ZlQ2xhc3ModGhpcy5vcHRpb25zLnJlZnJlc2hDbGFzcyk7XHJcblxyXG5cdFx0dGhpcy5sZWF2ZSgncmVmcmVzaGluZycpO1xyXG5cdFx0dGhpcy5fdHJpZ2dlcigncmVmcmVzaGVkJyk7XHJcblx0IH1cclxuXHJcbiAgLyoqXHJcblx0ICogQ2hlY2tzIHdpbmRvdyBgcmVzaXplYCBldmVudC5cclxuXHQgKiBAcGFyYW0gY3VyV2lkdGggd2lkdGggb2YgLm93bC1jYXJvdXNlbFxyXG5cdCAqL1xyXG4gIG9uUmVzaXplKGN1cldpZHRoOiBudW1iZXIpIHtcclxuXHRcdGlmICghdGhpcy5faXRlbXMubGVuZ3RoKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldENhcm91c2VsV2lkdGgoY3VyV2lkdGgpO1xyXG5cclxuXHRcdHRoaXMuZW50ZXIoJ3Jlc2l6aW5nJyk7XHJcblxyXG5cdFx0Ly8gaWYgKHRoaXMudHJpZ2dlcigncmVzaXplJykuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcclxuXHRcdC8vIFx0dGhpcy5sZWF2ZSgncmVzaXppbmcnKTtcclxuXHRcdC8vIFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0Ly8gfVxyXG5cdFx0dGhpcy5fdHJpZ2dlcigncmVzaXplJyk7XHJcblx0XHR0aGlzLmludmFsaWRhdGUoJ3dpZHRoJyk7XHJcblxyXG5cdFx0dGhpcy5yZWZyZXNoKCk7XHJcblxyXG5cdFx0dGhpcy5sZWF2ZSgncmVzaXppbmcnKTtcclxuXHRcdHRoaXMuX3RyaWdnZXIoJ3Jlc2l6ZWQnKTtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIFByZXBhcmVzIGRhdGEgZm9yIGRyYWdnaW5nIGNhcm91c2VsLiBJdCBzdGFydHMgYWZ0ZXIgZmlyaW5nIGB0b3VjaHN0YXJ0YCBhbmQgYG1vdXNlZG93bmAgZXZlbnRzLlxyXG5cdCAqIEB0b2RvIEhvcml6b250YWwgc3dpcGUgdGhyZXNob2xkIGFzIG9wdGlvblxyXG5cdCAqIEB0b2RvICMyNjFcclxuXHQgKiBAcGFyYW0gZXZlbnQgLSBUaGUgZXZlbnQgYXJndW1lbnRzLlxyXG5cdCAqIEByZXR1cm5zIHN0YWdlIC0gb2JqZWN0IHdpdGggJ3gnIGFuZCAneScgY29vcmRpbmF0ZXMgb2YgLm93bC1zdGFnZVxyXG5cdCAqL1xyXG4gIHByZXBhcmVEcmFnZ2luZyhldmVudDogYW55KTogQ29vcmRzIHtcclxuXHRcdGxldCBzdGFnZTogQ29vcmRzID0gbnVsbCxcclxuXHRcdFx0XHR0cmFuc2Zvcm1BcnI6IHN0cmluZ1tdO1xyXG5cclxuXHRcdC8vIGNvdWxkIGJlIDUgY29tbWVudGVkIGxpbmVzIGJlbG93OyBIb3dldmVyIHRoZXJlJ3Mgc3RhZ2UgdHJhbnNmb3JtIGluIHN0YWdlRGF0YSBhbmQgaW4gdXBkYXRlcyBhZnRlciBlYWNoIG1vdmUgb2Ygc3RhZ2VcclxuICAgIC8vIHN0YWdlID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpLnRyYW5zZm9ybS5yZXBsYWNlKC8uKlxcKHxcXCl8IC9nLCAnJykuc3BsaXQoJywnKTtcclxuICAgIC8vIHN0YWdlID0ge1xyXG4gICAgLy8gICB4OiBzdGFnZVtzdGFnZS5sZW5ndGggPT09IDE2ID8gMTIgOiA0XSxcclxuICAgIC8vICAgeTogc3RhZ2Vbc3RhZ2UubGVuZ3RoID09PSAxNiA/IDEzIDogNV1cclxuXHRcdC8vIH07XHJcblxyXG5cdFx0dHJhbnNmb3JtQXJyID0gdGhpcy5zdGFnZURhdGEudHJhbnNmb3JtLnJlcGxhY2UoLy4qXFwofFxcKXwgfFteLC1cXGRdXFx3fFxcKS9nLCAnJykuc3BsaXQoJywnKTtcclxuICAgIHN0YWdlID0ge1xyXG4gICAgICB4OiArdHJhbnNmb3JtQXJyWzBdLFxyXG4gICAgICB5OiArdHJhbnNmb3JtQXJyWzFdXHJcbiAgICB9O1xyXG5cclxuXHRcdGlmICh0aGlzLmlzKCdhbmltYXRpbmcnKSkge1xyXG5cdFx0XHR0aGlzLmludmFsaWRhdGUoJ3Bvc2l0aW9uJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGV2ZW50LnR5cGUgPT09ICdtb3VzZWRvd24nKSB7XHJcbiAgICAgIHRoaXMub3dsRE9NRGF0YS5pc0dyYWIgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuXHRcdHRoaXMuc3BlZWQoMCk7XHJcblx0XHRyZXR1cm4gc3RhZ2U7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBFbnRlcnMgaW50byBhICdkcmFnZ2luZycgc3RhdGVcclxuXHQgKi9cclxuXHRlbnRlckRyYWdnaW5nKCkge1xyXG5cdFx0dGhpcy5lbnRlcignZHJhZ2dpbmcnKTtcclxuICAgIHRoaXMuX3RyaWdnZXIoJ2RyYWcnKTtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIERlZmluZXMgbmV3IGNvb3JkcyBmb3IgLm93bC1zdGFnZSB3aGlsZSBkcmFnZ2luZyBpdFxyXG5cdCAqIEB0b2RvICMyNjFcclxuXHQgKiBAcGFyYW0gZXZlbnQgdGhlIGV2ZW50IGFyZ3VtZW50cy5cclxuXHQgKiBAcGFyYW0gZHJhZ0RhdGEgaW5pdGlhbCBkYXRhIGdvdCBhZnRlciBzdGFydGluZyBkcmFnZ2luZ1xyXG5cdCAqIEByZXR1cm5zIGNvb3JkcyBvciBmYWxzZVxyXG5cdCAqL1xyXG4gIGRlZmluZU5ld0Nvb3Jkc0RyYWcoZXZlbnQ6IGFueSwgZHJhZ0RhdGE6IGFueSk6IGJvb2xlYW4gfCBDb29yZHMge1xyXG5cdFx0bGV0IG1pbmltdW0gPSBudWxsLFxyXG5cdFx0bWF4aW11bSA9IG51bGwsXHJcblx0XHRwdWxsID0gbnVsbDtcclxuXHRcdGNvbnN0XHRkZWx0YSA9IHRoaXMuZGlmZmVyZW5jZShkcmFnRGF0YS5wb2ludGVyLCB0aGlzLnBvaW50ZXIoZXZlbnQpKSxcclxuXHRcdFx0c3RhZ2UgPSB0aGlzLmRpZmZlcmVuY2UoZHJhZ0RhdGEuc3RhZ2Uuc3RhcnQsIGRlbHRhKTtcclxuXHJcblx0XHRpZiAoIXRoaXMuaXMoJ2RyYWdnaW5nJykpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLmxvb3ApIHtcclxuXHRcdFx0bWluaW11bSA9IHRoaXMuY29vcmRpbmF0ZXModGhpcy5taW5pbXVtKCkpO1xyXG5cdFx0XHRtYXhpbXVtID0gK3RoaXMuY29vcmRpbmF0ZXModGhpcy5tYXhpbXVtKCkgKyAxKSAtIG1pbmltdW07XHJcblx0XHRcdHN0YWdlLnggPSAoKChzdGFnZS54IC0gbWluaW11bSkgJSBtYXhpbXVtICsgbWF4aW11bSkgJSBtYXhpbXVtKSArIG1pbmltdW07XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRtaW5pbXVtID0gdGhpcy5zZXR0aW5ncy5ydGwgPyB0aGlzLmNvb3JkaW5hdGVzKHRoaXMubWF4aW11bSgpKSA6IHRoaXMuY29vcmRpbmF0ZXModGhpcy5taW5pbXVtKCkpO1xyXG5cdFx0XHRtYXhpbXVtID0gdGhpcy5zZXR0aW5ncy5ydGwgPyB0aGlzLmNvb3JkaW5hdGVzKHRoaXMubWluaW11bSgpKSA6IHRoaXMuY29vcmRpbmF0ZXModGhpcy5tYXhpbXVtKCkpO1xyXG5cdFx0XHRwdWxsID0gdGhpcy5zZXR0aW5ncy5wdWxsRHJhZyA/IC0xICogZGVsdGEueCAvIDUgOiAwO1xyXG5cdFx0XHRzdGFnZS54ID0gTWF0aC5tYXgoTWF0aC5taW4oc3RhZ2UueCwgbWluaW11bSArIHB1bGwpLCBtYXhpbXVtICsgcHVsbCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHN0YWdlO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogRmluaXNoZXMgZHJhZ2dpbmcgb2YgY2Fyb3VzZWwgd2hlbiBgdG91Y2hlbmRgIGFuZCBgbW91c2V1cGAgZXZlbnRzIGZpcmUuXHJcblx0ICogQHRvZG8gIzI2MVxyXG5cdCAqIEB0b2RvIFRocmVzaG9sZCBmb3IgY2xpY2sgZXZlbnRcclxuXHQgKiBAcGFyYW0gZXZlbnQgdGhlIGV2ZW50IGFyZ3VtZW50cy5cclxuXHQgKiBAcGFyYW0gZHJhZ09iaiB0aGUgb2JqZWN0IHdpdGggZHJhZ2dpbmcgc2V0dGluZ3MgYW5kIHN0YXRlc1xyXG5cdCAqIEBwYXJhbSBjbGlja0F0dGFjaGVyIGZ1bmN0aW9uIHdoaWNoIGF0dGFjaGVzIGNsaWNrIGhhbmRsZXIgdG8gc2xpZGUgb3IgaXRzIGNoaWxkcmVuIGVsZW1lbnRzIGluIG9yZGVyIHRvIHByZXZlbnQgZXZlbnQgYnVibGluZ1xyXG5cdCAqL1xyXG4gIGZpbmlzaERyYWdnaW5nKGV2ZW50OiBhbnksIGRyYWdPYmo6IGFueSwgY2xpY2tBdHRhY2hlcjogKCkgPT4gdm9pZCkge1xyXG5cdFx0Y29uc3QgZGlyZWN0aW9ucyA9IFsncmlnaHQnLCAnbGVmdCddLFxyXG5cdFx0XHRcdGRlbHRhID0gdGhpcy5kaWZmZXJlbmNlKGRyYWdPYmoucG9pbnRlciwgdGhpcy5wb2ludGVyKGV2ZW50KSksXHJcbiAgICAgICAgc3RhZ2UgPSBkcmFnT2JqLnN0YWdlLmN1cnJlbnQsXHJcblx0XHRcdFx0ZGlyZWN0aW9uID0gZGlyZWN0aW9uc1srKHRoaXMuc2V0dGluZ3MucnRsID8gZGVsdGEueCA8ICt0aGlzLnNldHRpbmdzLnJ0bCA6IGRlbHRhLnggPiArdGhpcy5zZXR0aW5ncy5ydGwpXTtcclxuXHRcdGxldCBjdXJyZW50U2xpZGVJOiBudW1iZXIsIGN1cnJlbnQ6IG51bWJlciwgbmV3Q3VycmVudDogbnVtYmVyO1xyXG5cclxuXHRcdGlmIChkZWx0YS54ICE9PSAwICYmIHRoaXMuaXMoJ2RyYWdnaW5nJykgfHwgIXRoaXMuaXMoJ3ZhbGlkJykpIHtcclxuICAgICAgICB0aGlzLnNwZWVkKCt0aGlzLnNldHRpbmdzLmRyYWdFbmRTcGVlZCB8fCB0aGlzLnNldHRpbmdzLnNtYXJ0U3BlZWQpO1xyXG5cdFx0XHRcdGN1cnJlbnRTbGlkZUkgPSB0aGlzLmNsb3Nlc3Qoc3RhZ2UueCwgZGVsdGEueCAhPT0gMCA/IGRpcmVjdGlvbiA6IGRyYWdPYmouZGlyZWN0aW9uKTtcclxuXHRcdFx0XHRjdXJyZW50ID0gdGhpcy5jdXJyZW50KCk7XHJcbiAgICAgICAgbmV3Q3VycmVudCA9IHRoaXMuY3VycmVudChjdXJyZW50U2xpZGVJID09PSAtMSA/IHVuZGVmaW5lZCA6IGN1cnJlbnRTbGlkZUkpO1xyXG5cclxuXHRcdFx0XHRpZiAoY3VycmVudCAhPT0gbmV3Q3VycmVudCkge1xyXG5cdFx0XHRcdFx0dGhpcy5pbnZhbGlkYXRlKCdwb3NpdGlvbicpO1xyXG5cdFx0XHRcdFx0dGhpcy51cGRhdGUoKTtcclxuXHRcdFx0XHR9XHJcblxyXG4gICAgICAgIGRyYWdPYmouZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xyXG5cclxuICAgICAgICBpZiAoTWF0aC5hYnMoZGVsdGEueCkgPiAzIHx8IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gZHJhZ09iai50aW1lID4gMzAwKSB7XHJcblx0XHRcdFx0XHRjbGlja0F0dGFjaGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmICghdGhpcy5pcygnZHJhZ2dpbmcnKSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cdFx0XHR0aGlzLmxlYXZlKCdkcmFnZ2luZycpO1xyXG5cdFx0XHR0aGlzLl90cmlnZ2VyKCdkcmFnZ2VkJylcclxuXHQgfVxyXG5cclxuICAvKipcclxuXHQgKiBHZXRzIGFic29sdXRlIHBvc2l0aW9uIG9mIHRoZSBjbG9zZXN0IGl0ZW0gZm9yIGEgY29vcmRpbmF0ZS5cclxuXHQgKiBAdG9kbyBTZXR0aW5nIGBmcmVlRHJhZ2AgbWFrZXMgYGNsb3Nlc3RgIG5vdCByZXVzYWJsZS4gU2VlICMxNjUuXHJcblx0ICogQHBhcmFtIGNvb3JkaW5hdGUgVGhlIGNvb3JkaW5hdGUgaW4gcGl4ZWwuXHJcblx0ICogQHBhcmFtIGRpcmVjdGlvbiBUaGUgZGlyZWN0aW9uIHRvIGNoZWNrIGZvciB0aGUgY2xvc2VzdCBpdGVtLiBFdGhlciBgbGVmdGAgb3IgYHJpZ2h0YC5cclxuXHQgKiBAcmV0dXJucyBUaGUgYWJzb2x1dGUgcG9zaXRpb24gb2YgdGhlIGNsb3Nlc3QgaXRlbS5cclxuXHQgKi9cclxuICBjbG9zZXN0KGNvb3JkaW5hdGU6IG51bWJlciwgZGlyZWN0aW9uOiBzdHJpbmcpOiBudW1iZXIge1xyXG5cdFx0Y29uc3QgcHVsbCA9IDMwLFxyXG5cdFx0XHR3aWR0aCA9IHRoaXMud2lkdGgoKTtcclxuXHRcdGxldFx0Y29vcmRpbmF0ZXM6IG51bWJlcltdID0gdGhpcy5jb29yZGluYXRlcygpIGFzIG51bWJlcltdLFxyXG5cdFx0IHBvc2l0aW9uID0gLTE7XHJcblxyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3MuY2VudGVyKSB7XHJcblx0XHRcdGNvb3JkaW5hdGVzID0gY29vcmRpbmF0ZXMubWFwKGl0ZW0gPT4ge1xyXG5cdFx0XHRcdGlmIChpdGVtID09PSAwKSB7XHJcblx0XHRcdFx0XHRpdGVtICs9IDAuMDAwMDAxO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gaXRlbTtcclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHJcblx0XHQvLyBvcHRpb24gJ2ZyZWVEcmFnJyBkb2Vzbid0IGhhdmUgcmVhbGl6YXRpb24gYW5kIHVzaW5nIGl0IGhlcmUgY3JlYXRlcyBwcm9ibGVtOlxyXG5cdFx0Ly8gdmFyaWFibGUgJ3Bvc2l0aW9uJyBzdGF5cyB1bmNoYW5nZWQgKGl0IGVxdWFscyAtMSBhdCB0aGUgYmVnZ2luZykgYW5kIHRodXMgbWV0aG9kIHJldHVybnMgLTFcclxuXHRcdC8vIFJldHVybmluZyB2YWx1ZSBpcyBjb25zdW1lZCBieSBtZXRob2QgY3VycmVudCgpLCB3aGljaCB0YWtpbmcgLTEgYXMgYXJndW1lbnQgY2FsY3VsYXRlcyB0aGUgaW5kZXggb2YgbmV3IGN1cnJlbnQgc2xpZGVcclxuXHRcdC8vIEluIGNhc2Ugb2YgaGF2aW5nIDUgc2xpZGVzIGFucyAnbG9vcD1mYWxzZTsgY2FsbGluZyAnY3VycmVudCgtMSknIHNldHMgcHJvcHMgJ19jdXJyZW50JyBhcyA0LiBKdXN0IGxhc3Qgc2xpZGUgcmVtYWlucyB2aXNpYmxlIGluc3RlYWQgb2YgMyBsYXN0IHNsaWRlcy5cclxuXHJcblx0XHQvLyBpZiAoIXRoaXMuc2V0dGluZ3MuZnJlZURyYWcpIHtcclxuXHRcdFx0Ly8gY2hlY2sgY2xvc2VzdCBpdGVtXHJcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgY29vcmRpbmF0ZXMubGVuZ3RoOyBpKyspIHtcclxuXHJcblx0XHRcdFx0aWYgKGRpcmVjdGlvbiA9PT0gJ2xlZnQnICYmIGNvb3JkaW5hdGUgPiBjb29yZGluYXRlc1tpXSAtIHB1bGwgJiYgY29vcmRpbmF0ZSA8IGNvb3JkaW5hdGVzW2ldICsgcHVsbCkge1xyXG5cdFx0XHRcdFx0cG9zaXRpb24gPSBpO1xyXG5cdFx0XHRcdC8vIG9uIGEgcmlnaHQgcHVsbCwgY2hlY2sgb24gcHJldmlvdXMgaW5kZXhcclxuXHRcdFx0XHQvLyB0byBkbyBzbywgc3VidHJhY3Qgd2lkdGggZnJvbSB2YWx1ZSBhbmQgc2V0IHBvc2l0aW9uID0gaW5kZXggKyAxXHJcblx0XHRcdFx0fSBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICdyaWdodCcgJiYgY29vcmRpbmF0ZSA+IGNvb3JkaW5hdGVzW2ldIC0gd2lkdGggLSBwdWxsICYmIGNvb3JkaW5hdGUgPCBjb29yZGluYXRlc1tpXSAtIHdpZHRoICsgcHVsbCkge1xyXG5cdFx0XHRcdFx0cG9zaXRpb24gPSBpICsgMTtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKHRoaXMuX29wKGNvb3JkaW5hdGUsICc8JywgY29vcmRpbmF0ZXNbaV0pXHJcblx0XHRcdFx0XHQmJiB0aGlzLl9vcChjb29yZGluYXRlLCAnPicsIGNvb3JkaW5hdGVzW2kgKyAxXSB8fCBjb29yZGluYXRlc1tpXSAtIHdpZHRoKSkge1xyXG5cdFx0XHRcdFx0cG9zaXRpb24gPSBkaXJlY3Rpb24gPT09ICdsZWZ0JyA/IGkgKyAxIDogaTtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gbnVsbCAmJiBjb29yZGluYXRlID4gY29vcmRpbmF0ZXNbaV0gLSBwdWxsICYmIGNvb3JkaW5hdGUgPCBjb29yZGluYXRlc1tpXSArIHB1bGwpIHtcclxuXHRcdFx0XHRcdHBvc2l0aW9uID0gaTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChwb3NpdGlvbiAhPT0gLTEpIHsgYnJlYWsgfTtcclxuXHRcdFx0fVxyXG5cdFx0Ly8gfVxyXG5cclxuXHRcdGlmICghdGhpcy5zZXR0aW5ncy5sb29wKSB7XHJcblx0XHRcdC8vIG5vbiBsb29wIGJvdW5kcmllc1xyXG5cdFx0XHRpZiAodGhpcy5fb3AoY29vcmRpbmF0ZSwgJz4nLCBjb29yZGluYXRlc1t0aGlzLm1pbmltdW0oKV0pKSB7XHJcblx0XHRcdFx0cG9zaXRpb24gPSBjb29yZGluYXRlID0gdGhpcy5taW5pbXVtKCk7XHJcblx0XHRcdH0gZWxzZSBpZiAodGhpcy5fb3AoY29vcmRpbmF0ZSwgJzwnLCBjb29yZGluYXRlc1t0aGlzLm1heGltdW0oKV0pKSB7XHJcblx0XHRcdFx0cG9zaXRpb24gPSBjb29yZGluYXRlID0gdGhpcy5tYXhpbXVtKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcG9zaXRpb247XHJcblx0IH1cclxuXHJcbiAgLyoqXHJcblx0ICogQW5pbWF0ZXMgdGhlIHN0YWdlLlxyXG5cdCAqIEB0b2RvICMyNzBcclxuXHQgKiBAcGFyYW0gY29vcmRpbmF0ZSBUaGUgY29vcmRpbmF0ZSBpbiBwaXhlbHMuXHJcblx0ICovXHJcbiAgYW5pbWF0ZShjb29yZGluYXRlOiBudW1iZXIgfCBudW1iZXJbXSkge1xyXG5cdFx0Y29uc3QgYW5pbWF0ZSA9IHRoaXMuc3BlZWQoKSA+IDA7XHJcblxyXG5cdFx0aWYgKHRoaXMuaXMoJ2FuaW1hdGluZycpKSB7XHJcblx0XHRcdHRoaXMub25UcmFuc2l0aW9uRW5kKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGFuaW1hdGUpIHtcclxuXHRcdFx0dGhpcy5lbnRlcignYW5pbWF0aW5nJyk7XHJcblx0XHRcdHRoaXMuX3RyaWdnZXIoJ3RyYW5zbGF0ZScpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc3RhZ2VEYXRhLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgnICsgY29vcmRpbmF0ZSArICdweCwwcHgsMHB4KSc7XHJcblx0XHR0aGlzLnN0YWdlRGF0YS50cmFuc2l0aW9uID0gKHRoaXMuc3BlZWQoKSAvIDEwMDApICsgJ3MnICsgKFxyXG5cdFx0XHR0aGlzLnNldHRpbmdzLnNsaWRlVHJhbnNpdGlvbiA/ICcgJyArIHRoaXMuc2V0dGluZ3Muc2xpZGVUcmFuc2l0aW9uIDogJydcclxuXHRcdCk7XHJcblxyXG5cdFx0Ly8gYWxzbyB0aGVyZSB3YXMgdHJhbnNpdGlvbiBieSBtZWFucyBvZiBKUXVlcnkuYW5pbWF0ZSBvciBjc3MtY2hhbmdpbmcgcHJvcGVydHkgbGVmdFxyXG5cdCB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIENoZWNrcyB3aGV0aGVyIHRoZSBjYXJvdXNlbCBpcyBpbiBhIHNwZWNpZmljIHN0YXRlIG9yIG5vdC5cclxuXHQgKiBAcGFyYW0gc3RhdGUgVGhlIHN0YXRlIHRvIGNoZWNrLlxyXG5cdCAqIEByZXR1cm5zIFRoZSBmbGFnIHdoaWNoIGluZGljYXRlcyBpZiB0aGUgY2Fyb3VzZWwgaXMgYnVzeS5cclxuXHQgKi9cclxuICBpcyhzdGF0ZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gdGhpcy5fc3RhdGVzLmN1cnJlbnRbc3RhdGVdICYmIHRoaXMuX3N0YXRlcy5jdXJyZW50W3N0YXRlXSA+IDA7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcblx0ICogU2V0cyB0aGUgYWJzb2x1dGUgcG9zaXRpb24gb2YgdGhlIGN1cnJlbnQgaXRlbS5cclxuXHQgKiBAcGFyYW0gcG9zaXRpb24gVGhlIG5ldyBhYnNvbHV0ZSBwb3NpdGlvbiBvciBub3RoaW5nIHRvIGxlYXZlIGl0IHVuY2hhbmdlZC5cclxuXHQgKiBAcmV0dXJucyBUaGUgYWJzb2x1dGUgcG9zaXRpb24gb2YgdGhlIGN1cnJlbnQgaXRlbS5cclxuXHQgKi9cclxuICBjdXJyZW50KHBvc2l0aW9uPzogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdGlmIChwb3NpdGlvbiA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLl9jdXJyZW50O1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLl9pdGVtcy5sZW5ndGggPT09IDApIHtcclxuXHRcdFx0cmV0dXJuIHVuZGVmaW5lZDtcclxuXHRcdH1cclxuXHJcblx0XHRwb3NpdGlvbiA9IHRoaXMubm9ybWFsaXplKHBvc2l0aW9uKTtcclxuXHJcblx0XHRpZiAodGhpcy5fY3VycmVudCAhPT0gcG9zaXRpb24pIHtcclxuXHRcdFx0Y29uc3QgZXZlbnQgPSB0aGlzLl90cmlnZ2VyKCdjaGFuZ2UnLCB7IHByb3BlcnR5OiB7IG5hbWU6ICdwb3NpdGlvbicsIHZhbHVlOiBwb3NpdGlvbiB9IH0pO1xyXG5cclxuXHRcdFx0Ly8gaWYgKGV2ZW50LmRhdGEgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHQvLyBcdHBvc2l0aW9uID0gdGhpcy5ub3JtYWxpemUoZXZlbnQuZGF0YSk7XHJcblx0XHRcdC8vIH1cclxuXHJcblx0XHRcdHRoaXMuX2N1cnJlbnQgPSBwb3NpdGlvbjtcclxuXHJcblx0XHRcdHRoaXMuaW52YWxpZGF0ZSgncG9zaXRpb24nKTtcclxuXHRcdFx0dGhpcy5fdHJpZ2dlcignY2hhbmdlZCcsIHsgcHJvcGVydHk6IHsgbmFtZTogJ3Bvc2l0aW9uJywgdmFsdWU6IHRoaXMuX2N1cnJlbnQgfSB9KTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fY3VycmVudDtcclxuXHQgfVxyXG5cclxuICAvKipcclxuXHQgKiBJbnZhbGlkYXRlcyB0aGUgZ2l2ZW4gcGFydCBvZiB0aGUgdXBkYXRlIHJvdXRpbmUuXHJcblx0ICogQHBhcmFtIHBhcnQgVGhlIHBhcnQgdG8gaW52YWxpZGF0ZS5cclxuXHQgKiBAcmV0dXJucyBUaGUgaW52YWxpZGF0ZWQgcGFydHMuXHJcblx0ICovXHJcbiAgaW52YWxpZGF0ZShwYXJ0OiBzdHJpbmcpOiBzdHJpbmdbXSB7XHJcblx0XHRpZiAodHlwZW9mIHBhcnQgPT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdHRoaXMuX2ludmFsaWRhdGVkW3BhcnRdID0gdHJ1ZTtcclxuXHRcdFx0aWYodGhpcy5pcygndmFsaWQnKSkgeyB0aGlzLmxlYXZlKCd2YWxpZCcpOyB9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gT2JqZWN0LmtleXModGhpcy5faW52YWxpZGF0ZWQpO1xyXG4gIH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlc2V0cyB0aGUgYWJzb2x1dGUgcG9zaXRpb24gb2YgdGhlIGN1cnJlbnQgaXRlbS5cclxuXHQgKiBAcGFyYW0gcG9zaXRpb24gdGhlIGFic29sdXRlIHBvc2l0aW9uIG9mIHRoZSBuZXcgaXRlbS5cclxuXHQgKi9cclxuICByZXNldChwb3NpdGlvbjogbnVtYmVyKSB7XHJcblx0XHRwb3NpdGlvbiA9IHRoaXMubm9ybWFsaXplKHBvc2l0aW9uKTtcclxuXHJcblx0XHRpZiAocG9zaXRpb24gPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5fc3BlZWQgPSAwO1xyXG5cdFx0dGhpcy5fY3VycmVudCA9IHBvc2l0aW9uO1xyXG5cclxuXHRcdHRoaXMuX3N1cHByZXNzKFsgJ3RyYW5zbGF0ZScsICd0cmFuc2xhdGVkJyBdKTtcclxuXHJcblx0XHR0aGlzLmFuaW1hdGUodGhpcy5jb29yZGluYXRlcyhwb3NpdGlvbikpO1xyXG5cclxuXHRcdHRoaXMuX3JlbGVhc2UoWyAndHJhbnNsYXRlJywgJ3RyYW5zbGF0ZWQnIF0pO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogTm9ybWFsaXplcyBhbiBhYnNvbHV0ZSBvciBhIHJlbGF0aXZlIHBvc2l0aW9uIG9mIGFuIGl0ZW0uXHJcblx0ICogQHBhcmFtIHBvc2l0aW9uIFRoZSBhYnNvbHV0ZSBvciByZWxhdGl2ZSBwb3NpdGlvbiB0byBub3JtYWxpemUuXHJcblx0ICogQHBhcmFtIHJlbGF0aXZlIFdoZXRoZXIgdGhlIGdpdmVuIHBvc2l0aW9uIGlzIHJlbGF0aXZlIG9yIG5vdC5cclxuXHQgKiBAcmV0dXJucyBUaGUgbm9ybWFsaXplZCBwb3NpdGlvbi5cclxuXHQgKi9cclxuICBub3JtYWxpemUocG9zaXRpb246IG51bWJlciwgcmVsYXRpdmU/OiBib29sZWFuKTogbnVtYmVyIHtcclxuXHRcdGNvbnN0IG4gPSB0aGlzLl9pdGVtcy5sZW5ndGgsXHJcblx0XHRcdFx0XHRtID0gcmVsYXRpdmUgPyAwIDogdGhpcy5fY2xvbmVzLmxlbmd0aDtcclxuXHJcblx0XHRpZiAoIXRoaXMuX2lzTnVtZXJpYyhwb3NpdGlvbikgfHwgbiA8IDEpIHtcclxuXHRcdFx0cG9zaXRpb24gPSB1bmRlZmluZWQ7XHJcblx0XHR9IGVsc2UgaWYgKHBvc2l0aW9uIDwgMCB8fCBwb3NpdGlvbiA+PSBuICsgbSkge1xyXG5cdFx0XHRwb3NpdGlvbiA9ICgocG9zaXRpb24gLSBtIC8gMikgJSBuICsgbikgJSBuICsgbSAvIDI7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHBvc2l0aW9uO1xyXG5cdCB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIENvbnZlcnRzIGFuIGFic29sdXRlIHBvc2l0aW9uIG9mIGFuIGl0ZW0gaW50byBhIHJlbGF0aXZlIG9uZS5cclxuXHQgKiBAcGFyYW0gcG9zaXRpb24gVGhlIGFic29sdXRlIHBvc2l0aW9uIHRvIGNvbnZlcnQuXHJcblx0ICogQHJldHVybnMgVGhlIGNvbnZlcnRlZCBwb3NpdGlvbi5cclxuXHQgKi9cclxuICByZWxhdGl2ZShwb3NpdGlvbjogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdHBvc2l0aW9uIC09IHRoaXMuX2Nsb25lcy5sZW5ndGggLyAyO1xyXG5cdFx0cmV0dXJuIHRoaXMubm9ybWFsaXplKHBvc2l0aW9uLCB0cnVlKTtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEdldHMgdGhlIG1heGltdW0gcG9zaXRpb24gZm9yIHRoZSBjdXJyZW50IGl0ZW0uXHJcblx0ICogQHBhcmFtIHJlbGF0aXZlIFdoZXRoZXIgdG8gcmV0dXJuIGFuIGFic29sdXRlIHBvc2l0aW9uIG9yIGEgcmVsYXRpdmUgcG9zaXRpb24uXHJcblx0ICogQHJldHVybnMgbnVtYmVyIG9mIG1heGltdW0gcG9zaXRpb25cclxuXHQgKi9cclxuICBtYXhpbXVtKHJlbGF0aXZlOiBib29sZWFuID0gZmFsc2UpOiBudW1iZXIge1xyXG5cdFx0Y29uc3Qgc2V0dGluZ3MgPSB0aGlzLnNldHRpbmdzO1xyXG5cdFx0bGV0XHRtYXhpbXVtID0gdGhpcy5fY29vcmRpbmF0ZXMubGVuZ3RoLFxyXG5cdFx0XHRpdGVyYXRvcixcclxuXHRcdFx0cmVjaXByb2NhbEl0ZW1zV2lkdGgsXHJcblx0XHRcdGVsZW1lbnRXaWR0aDtcclxuXHJcblx0XHRpZiAoc2V0dGluZ3MubG9vcCkge1xyXG5cdFx0XHRtYXhpbXVtID0gdGhpcy5fY2xvbmVzLmxlbmd0aCAvIDIgKyB0aGlzLl9pdGVtcy5sZW5ndGggLSAxO1xyXG5cdFx0fSBlbHNlIGlmIChzZXR0aW5ncy5hdXRvV2lkdGggfHwgc2V0dGluZ3MubWVyZ2UpIHtcclxuXHRcdFx0aXRlcmF0b3IgPSB0aGlzLl9pdGVtcy5sZW5ndGg7XHJcblx0XHRcdHJlY2lwcm9jYWxJdGVtc1dpZHRoID0gdGhpcy5zbGlkZXNEYXRhWy0taXRlcmF0b3JdLndpZHRoO1xyXG5cdFx0XHRlbGVtZW50V2lkdGggPSB0aGlzLl93aWR0aDtcclxuXHRcdFx0d2hpbGUgKGl0ZXJhdG9yLS0pIHtcclxuXHRcdFx0XHQvLyBpdCBjb3VsZCBiZSB1c2UgdGhpcy5faXRlbXMgaW5zdGVhZCBvZiB0aGlzLnNsaWRlc0RhdGE7XHJcblx0XHRcdFx0cmVjaXByb2NhbEl0ZW1zV2lkdGggKz0gK3RoaXMuc2xpZGVzRGF0YVtpdGVyYXRvcl0ud2lkdGggKyB0aGlzLnNldHRpbmdzLm1hcmdpbjtcclxuXHRcdFx0XHRpZiAocmVjaXByb2NhbEl0ZW1zV2lkdGggPiBlbGVtZW50V2lkdGgpIHtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRtYXhpbXVtID0gaXRlcmF0b3IgKyAxO1xyXG5cdFx0fSBlbHNlIGlmIChzZXR0aW5ncy5jZW50ZXIpIHtcclxuXHRcdFx0bWF4aW11bSA9IHRoaXMuX2l0ZW1zLmxlbmd0aCAtIDE7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRtYXhpbXVtID0gdGhpcy5faXRlbXMubGVuZ3RoIC0gc2V0dGluZ3MuaXRlbXM7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHJlbGF0aXZlKSB7XHJcblx0XHRcdG1heGltdW0gLT0gdGhpcy5fY2xvbmVzLmxlbmd0aCAvIDI7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIE1hdGgubWF4KG1heGltdW0sIDApO1xyXG5cdCB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEdldHMgdGhlIG1pbmltdW0gcG9zaXRpb24gZm9yIHRoZSBjdXJyZW50IGl0ZW0uXHJcblx0ICogQHBhcmFtIHJlbGF0aXZlIFdoZXRoZXIgdG8gcmV0dXJuIGFuIGFic29sdXRlIHBvc2l0aW9uIG9yIGEgcmVsYXRpdmUgcG9zaXRpb24uXHJcblx0ICogQHJldHVybnMgbnVtYmVyIG9mIG1pbmltdW0gcG9zaXRpb25cclxuXHQgKi9cclxuICBtaW5pbXVtKHJlbGF0aXZlOiBib29sZWFuID0gZmFsc2UpOiBudW1iZXIge1xyXG5cdFx0cmV0dXJuIHJlbGF0aXZlID8gMCA6IHRoaXMuX2Nsb25lcy5sZW5ndGggLyAyO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogR2V0cyBhbiBpdGVtIGF0IHRoZSBzcGVjaWZpZWQgcmVsYXRpdmUgcG9zaXRpb24uXHJcblx0ICogQHBhcmFtIHBvc2l0aW9uIFRoZSByZWxhdGl2ZSBwb3NpdGlvbiBvZiB0aGUgaXRlbS5cclxuXHQgKiBAcmV0dXJucyBUaGUgaXRlbSBhdCB0aGUgZ2l2ZW4gcG9zaXRpb24gb3IgYWxsIGl0ZW1zIGlmIG5vIHBvc2l0aW9uIHdhcyBnaXZlbi5cclxuXHQgKi9cclxuICBpdGVtcyhwb3NpdGlvbj86IG51bWJlcik6IENhcm91c2VsU2xpZGVEaXJlY3RpdmVbXSB7XHJcblx0XHRpZiAocG9zaXRpb24gPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5faXRlbXMuc2xpY2UoKTtcclxuXHRcdH1cclxuXHJcblx0XHRwb3NpdGlvbiA9IHRoaXMubm9ybWFsaXplKHBvc2l0aW9uLCB0cnVlKTtcclxuXHRcdHJldHVybiBbdGhpcy5faXRlbXNbcG9zaXRpb25dXTtcclxuXHQgfVxyXG5cclxuICAvKipcclxuXHQgKiBHZXRzIGFuIGl0ZW0gYXQgdGhlIHNwZWNpZmllZCByZWxhdGl2ZSBwb3NpdGlvbi5cclxuXHQgKiBAcGFyYW0gcG9zaXRpb24gVGhlIHJlbGF0aXZlIHBvc2l0aW9uIG9mIHRoZSBpdGVtLlxyXG5cdCAqIEByZXR1cm5zIFRoZSBpdGVtIGF0IHRoZSBnaXZlbiBwb3NpdGlvbiBvciBhbGwgaXRlbXMgaWYgbm8gcG9zaXRpb24gd2FzIGdpdmVuLlxyXG5cdCAqL1xyXG4gIG1lcmdlcnMocG9zaXRpb246IG51bWJlcik6IG51bWJlciB8IG51bWJlcltdIHtcclxuXHRcdGlmIChwb3NpdGlvbiA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLl9tZXJnZXJzLnNsaWNlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cG9zaXRpb24gPSB0aGlzLm5vcm1hbGl6ZShwb3NpdGlvbiwgdHJ1ZSk7XHJcblx0XHRyZXR1cm4gdGhpcy5fbWVyZ2Vyc1twb3NpdGlvbl07XHJcblx0IH1cclxuXHJcbiAgLyoqXHJcblx0ICogR2V0cyB0aGUgYWJzb2x1dGUgcG9zaXRpb25zIG9mIGNsb25lcyBmb3IgYW4gaXRlbS5cclxuXHQgKiBAcGFyYW0gcG9zaXRpb24gVGhlIHJlbGF0aXZlIHBvc2l0aW9uIG9mIHRoZSBpdGVtLlxyXG5cdCAqIEByZXR1cm5zIFRoZSBhYnNvbHV0ZSBwb3NpdGlvbnMgb2YgY2xvbmVzIGZvciB0aGUgaXRlbSBvciBhbGwgaWYgbm8gcG9zaXRpb24gd2FzIGdpdmVuLlxyXG5cdCAqL1xyXG4gIGNsb25lcyhwb3NpdGlvbj86IG51bWJlcik6IG51bWJlcltdIHtcclxuXHRcdGNvbnN0IG9kZCA9IHRoaXMuX2Nsb25lcy5sZW5ndGggLyAyLFxyXG5cdFx0XHRldmVuID0gb2RkICsgdGhpcy5faXRlbXMubGVuZ3RoLFxyXG5cdFx0XHRtYXAgPSBpbmRleCA9PiBpbmRleCAlIDIgPT09IDAgPyBldmVuICsgaW5kZXggLyAyIDogb2RkIC0gKGluZGV4ICsgMSkgLyAyO1xyXG5cclxuXHRcdGlmIChwb3NpdGlvbiA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLl9jbG9uZXMubWFwKCh2LCBpKSA9PiBtYXAoaSkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzLl9jbG9uZXMubWFwKCh2LCBpKSA9PiB2ID09PSBwb3NpdGlvbiA/IG1hcChpKSA6IG51bGwpLmZpbHRlcihpdGVtID0+IGl0ZW0pO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogU2V0cyB0aGUgY3VycmVudCBhbmltYXRpb24gc3BlZWQuXHJcblx0ICogQHBhcmFtIHNwZWVkIFRoZSBhbmltYXRpb24gc3BlZWQgaW4gbWlsbGlzZWNvbmRzIG9yIG5vdGhpbmcgdG8gbGVhdmUgaXQgdW5jaGFuZ2VkLlxyXG5cdCAqIEByZXR1cm5zIFRoZSBjdXJyZW50IGFuaW1hdGlvbiBzcGVlZCBpbiBtaWxsaXNlY29uZHMuXHJcblx0ICovXHJcbiAgc3BlZWQoc3BlZWQ/OiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0aWYgKHNwZWVkICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0dGhpcy5fc3BlZWQgPSBzcGVlZDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fc3BlZWQ7XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBHZXRzIHRoZSBjb29yZGluYXRlIG9mIGFuIGl0ZW0uXHJcblx0ICogQHRvZG8gVGhlIG5hbWUgb2YgdGhpcyBtZXRob2QgaXMgbWlzc2xlYW5kaW5nLlxyXG5cdCAqIEBwYXJhbSBwb3NpdGlvbiBUaGUgYWJzb2x1dGUgcG9zaXRpb24gb2YgdGhlIGl0ZW0gd2l0aGluIGBtaW5pbXVtKClgIGFuZCBgbWF4aW11bSgpYC5cclxuXHQgKiBAcmV0dXJucyBUaGUgY29vcmRpbmF0ZSBvZiB0aGUgaXRlbSBpbiBwaXhlbCBvciBhbGwgY29vcmRpbmF0ZXMuXHJcblx0ICovXHJcbiAgY29vcmRpbmF0ZXMocG9zaXRpb24/OiBudW1iZXIpOiBudW1iZXIgfCBudW1iZXJbXSB7XHJcblx0XHRsZXQgbXVsdGlwbGllciA9IDEsXHJcblx0XHRcdG5ld1Bvc2l0aW9uID0gcG9zaXRpb24gLSAxLFxyXG5cdFx0XHRjb29yZGluYXRlLFxyXG5cdFx0XHRyZXN1bHQ6IG51bWJlcltdO1xyXG5cclxuXHRcdGlmIChwb3NpdGlvbiA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHJlc3VsdCA9IHRoaXMuX2Nvb3JkaW5hdGVzLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5jb29yZGluYXRlcyhpbmRleCkgYXMgbnVtYmVyO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5jZW50ZXIpIHtcclxuXHRcdFx0aWYgKHRoaXMuc2V0dGluZ3MucnRsKSB7XHJcblx0XHRcdFx0bXVsdGlwbGllciA9IC0xO1xyXG5cdFx0XHRcdG5ld1Bvc2l0aW9uID0gcG9zaXRpb24gKyAxO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRjb29yZGluYXRlID0gdGhpcy5fY29vcmRpbmF0ZXNbcG9zaXRpb25dO1xyXG5cdFx0XHRjb29yZGluYXRlICs9ICh0aGlzLndpZHRoKCkgLSBjb29yZGluYXRlICsgKHRoaXMuX2Nvb3JkaW5hdGVzW25ld1Bvc2l0aW9uXSB8fCAwKSkgLyAyICogbXVsdGlwbGllcjtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNvb3JkaW5hdGUgPSB0aGlzLl9jb29yZGluYXRlc1tuZXdQb3NpdGlvbl0gfHwgMDtcclxuXHRcdH1cclxuXHJcblx0XHRjb29yZGluYXRlID0gTWF0aC5jZWlsKGNvb3JkaW5hdGUpO1xyXG5cclxuXHRcdHJldHVybiBjb29yZGluYXRlO1xyXG5cdCB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIENhbGN1bGF0ZXMgdGhlIHNwZWVkIGZvciBhIHRyYW5zbGF0aW9uLlxyXG5cdCAqIEBwYXJhbSBmcm9tIFRoZSBhYnNvbHV0ZSBwb3NpdGlvbiBvZiB0aGUgc3RhcnQgaXRlbS5cclxuXHQgKiBAcGFyYW0gdG8gVGhlIGFic29sdXRlIHBvc2l0aW9uIG9mIHRoZSB0YXJnZXQgaXRlbS5cclxuXHQgKiBAcGFyYW0gZmFjdG9yIFtmYWN0b3I9dW5kZWZpbmVkXSAtIFRoZSB0aW1lIGZhY3RvciBpbiBtaWxsaXNlY29uZHMuXHJcblx0ICogQHJldHVybnMgVGhlIHRpbWUgaW4gbWlsbGlzZWNvbmRzIGZvciB0aGUgdHJhbnNsYXRpb24uXHJcblx0ICovXHJcbiAgcHJpdmF0ZSBfZHVyYXRpb24oZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyLCBmYWN0b3I/OiBudW1iZXIgfCBib29sZWFuKTogbnVtYmVyIHtcclxuXHRcdGlmIChmYWN0b3IgPT09IDApIHtcclxuXHRcdFx0cmV0dXJuIDA7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIE1hdGgubWluKE1hdGgubWF4KE1hdGguYWJzKHRvIC0gZnJvbSksIDEpLCA2KSAqIE1hdGguYWJzKCgrZmFjdG9yIHx8IHRoaXMuc2V0dGluZ3Muc21hcnRTcGVlZCkpO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogU2xpZGVzIHRvIHRoZSBzcGVjaWZpZWQgaXRlbS5cclxuXHQgKiBAcGFyYW0gcG9zaXRpb24gVGhlIHBvc2l0aW9uIG9mIHRoZSBpdGVtLlxyXG5cdCAqIEBwYXJhbSBzcGVlZCBUaGUgdGltZSBpbiBtaWxsaXNlY29uZHMgZm9yIHRoZSB0cmFuc2l0aW9uLlxyXG5cdCAqL1xyXG4gIHRvKHBvc2l0aW9uOiBudW1iZXIsIHNwZWVkOiBudW1iZXIgfCBib29sZWFuKSB7XHJcblx0XHRsZXQgY3VycmVudCA9IHRoaXMuY3VycmVudCgpLFxyXG5cdFx0XHRyZXZlcnQgPSBudWxsLFxyXG5cdFx0XHRkaXN0YW5jZSA9IHBvc2l0aW9uIC0gdGhpcy5yZWxhdGl2ZShjdXJyZW50KSxcclxuXHRcdFx0bWF4aW11bSA9IHRoaXMubWF4aW11bSgpLFxyXG5cdFx0XHRkZWxheUZvckxvb3AgPSAwO1xyXG5cdFx0Y29uc3RcdGRpcmVjdGlvbiA9ICsoZGlzdGFuY2UgPiAwKSAtICsoZGlzdGFuY2UgPCAwKSxcclxuXHRcdFx0aXRlbXMgPSB0aGlzLl9pdGVtcy5sZW5ndGgsXHJcblx0XHRcdG1pbmltdW0gPSB0aGlzLm1pbmltdW0oKTtcclxuXHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5sb29wKSB7XHJcblx0XHRcdGlmICghdGhpcy5zZXR0aW5ncy5yZXdpbmQgJiYgTWF0aC5hYnMoZGlzdGFuY2UpID4gaXRlbXMgLyAyKSB7XHJcblx0XHRcdFx0ZGlzdGFuY2UgKz0gZGlyZWN0aW9uICogLTEgKiBpdGVtcztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cG9zaXRpb24gPSBjdXJyZW50ICsgZGlzdGFuY2U7XHJcblx0XHRcdHJldmVydCA9ICgocG9zaXRpb24gLSBtaW5pbXVtKSAlIGl0ZW1zICsgaXRlbXMpICUgaXRlbXMgKyBtaW5pbXVtO1xyXG5cclxuXHRcdFx0aWYgKHJldmVydCAhPT0gcG9zaXRpb24gJiYgcmV2ZXJ0IC0gZGlzdGFuY2UgPD0gbWF4aW11bSAmJiByZXZlcnQgLSBkaXN0YW5jZSA+IDApIHtcclxuXHRcdFx0XHRjdXJyZW50ID0gcmV2ZXJ0IC0gZGlzdGFuY2U7XHJcblx0XHRcdFx0cG9zaXRpb24gPSByZXZlcnQ7XHJcblx0XHRcdFx0ZGVsYXlGb3JMb29wID0gMzA7XHJcblx0XHRcdFx0dGhpcy5yZXNldChjdXJyZW50KTtcclxuXHRcdFx0XHR0aGlzLnNlbmRDaGFuZ2VzKCk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSBpZiAodGhpcy5zZXR0aW5ncy5yZXdpbmQpIHtcclxuXHRcdFx0bWF4aW11bSArPSAxO1xyXG5cdFx0XHRwb3NpdGlvbiA9IChwb3NpdGlvbiAlIG1heGltdW0gKyBtYXhpbXVtKSAlIG1heGltdW07XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRwb3NpdGlvbiA9IE1hdGgubWF4KG1pbmltdW0sIE1hdGgubWluKG1heGltdW0sIHBvc2l0aW9uKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdHRoaXMuc3BlZWQodGhpcy5fZHVyYXRpb24oY3VycmVudCwgcG9zaXRpb24sIHNwZWVkKSk7XHJcblx0XHRcdHRoaXMuY3VycmVudChwb3NpdGlvbik7XHJcblxyXG5cdFx0XHR0aGlzLnVwZGF0ZSgpO1xyXG5cdFx0fSwgZGVsYXlGb3JMb29wKTtcclxuXHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBTbGlkZXMgdG8gdGhlIG5leHQgaXRlbS5cclxuXHQgKiBAcGFyYW0gc3BlZWQgVGhlIHRpbWUgaW4gbWlsbGlzZWNvbmRzIGZvciB0aGUgdHJhbnNpdGlvbi5cclxuXHQgKi9cclxuICBuZXh0KHNwZWVkOiBudW1iZXIgfCBib29sZWFuKSB7XHJcblx0XHRzcGVlZCA9IHNwZWVkIHx8IGZhbHNlO1xyXG5cdFx0dGhpcy50byh0aGlzLnJlbGF0aXZlKHRoaXMuY3VycmVudCgpKSArIDEsIHNwZWVkKTtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIFNsaWRlcyB0byB0aGUgcHJldmlvdXMgaXRlbS5cclxuXHQgKiBAcGFyYW0gc3BlZWQgVGhlIHRpbWUgaW4gbWlsbGlzZWNvbmRzIGZvciB0aGUgdHJhbnNpdGlvbi5cclxuXHQgKi9cclxuICBwcmV2KHNwZWVkOiBudW1iZXIgfCBib29sZWFuKSB7XHJcblx0XHRzcGVlZCA9IHNwZWVkIHx8IGZhbHNlO1xyXG5cdFx0dGhpcy50byh0aGlzLnJlbGF0aXZlKHRoaXMuY3VycmVudCgpKSAtIDEsIHNwZWVkKTtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEhhbmRsZXMgdGhlIGVuZCBvZiBhbiBhbmltYXRpb24uXHJcblx0ICogQHBhcmFtIGV2ZW50IC0gVGhlIGV2ZW50IGFyZ3VtZW50cy5cclxuXHQgKi9cclxuICBvblRyYW5zaXRpb25FbmQoZXZlbnQ/OiBhbnkpIHtcclxuXHRcdC8vIGlmIGNzczIgYW5pbWF0aW9uIHRoZW4gZXZlbnQgb2JqZWN0IGlzIHVuZGVmaW5lZFxyXG5cdFx0aWYgKGV2ZW50ICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0Ly8gZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG5cdFx0XHQvLyAvLyBDYXRjaCBvbmx5IG93bC1zdGFnZSB0cmFuc2l0aW9uRW5kIGV2ZW50XHJcblx0XHRcdC8vIGlmICgoZXZlbnQudGFyZ2V0IHx8IGV2ZW50LnNyY0VsZW1lbnQgfHwgZXZlbnQub3JpZ2luYWxUYXJnZXQpICE9PSB0aGlzLiRzdGFnZS5nZXQoMClcdCkge1xyXG5cdFx0XHQvLyBcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0Ly8gfVxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0XHR0aGlzLmxlYXZlKCdhbmltYXRpbmcnKTtcclxuXHRcdHRoaXMuX3RyaWdnZXIoJ3RyYW5zbGF0ZWQnKTtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEdldHMgdmlld3BvcnQgd2lkdGguXHJcblx0ICogQHJldHVybnMgLSBUaGUgd2lkdGggaW4gcGl4ZWwuXHJcblx0ICovXHJcbiAgcHJpdmF0ZSBfdmlld3BvcnQoKTogbnVtYmVyIHtcclxuXHRcdGxldCB3aWR0aDtcclxuXHRcdGlmICh0aGlzLl93aWR0aCkge1xyXG5cdFx0XHR3aWR0aCA9IHRoaXMuX3dpZHRoO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5sb2dnZXIubG9nKCdDYW4gbm90IGRldGVjdCB2aWV3cG9ydCB3aWR0aC4nKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB3aWR0aDtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIFNldHMgX2l0ZW1zXHJcblx0ICogQHBhcmFtIGNvbnRlbnQgVGhlIGxpc3Qgb2Ygc2xpZGVzIHB1dCBpbnRvIENhcm91c2VsU2xpZGVEaXJlY3RpdmVzLlxyXG5cdCAqL1xyXG4gIHNldEl0ZW1zKGNvbnRlbnQ6IENhcm91c2VsU2xpZGVEaXJlY3RpdmVbXSkge1xyXG5cdFx0dGhpcy5faXRlbXMgPSBjb250ZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyBzbGlkZXNEYXRhIHVzaW5nIHRoaXMuX2l0ZW1zXHJcblx0ICovXHJcblx0cHJpdmF0ZSBfZGVmaW5lU2xpZGVzRGF0YSgpIHtcclxuXHRcdC8vIE1heWJlIGNyZWF0aW5nIGFuZCB1c2luZyBsb2FkTWFwIHdvdWxkIGJlIGJldHRlciBpbiBMYXp5TG9hZFNlcnZpY2UuXHJcblx0XHQvLyBIb3Zld2VyIGluIHRoYXQgY2FzZSB3aGVuICdyZXNpemUnIGV2ZW50IGZpcmVzLCBwcm9wICdsb2FkJyBvZiBhbGwgc2xpZGVzIHdpbGwgZ2V0ICdmYWxzZScgYW5kIHN1Y2ggc3RhdGUgb2YgcHJvcCB3aWxsIGJlIHNlZW4gYnkgVmlldyBkdXJpbmcgaXRzIHVwZGF0aW5nLiBBY2NvcmRpbmdseSB0aGUgY29kZSB3aWxsIHJlbW92ZSBzbGlkZXMncyBjb250ZW50IGZyb20gRE9NIGV2ZW4gaWYgaXQgd2FzIGxvYWRlZCBiZWZvcmUuXHJcblx0XHQvLyBUaHVzIGl0IHdvdWxkIGJlIG5lZWRlZCB0byBhZGQgdGhhdCBjb250ZW50IGludG8gRE9NIGFnYWluLlxyXG5cdFx0Ly8gSW4gb3JkZXIgdG8gYXZvaWQgYWRkaXRpb25hbCByZW1vdmluZy9hZGRpbmcgbG9hZGVkIHNsaWRlcydzIGNvbnRlbnQgd2UgdXNlIGxvYWRNYXAgaGVyZSBhbmQgc2V0IHJlc3RvcmUgc3RhdGUgb2YgcHJvcCAnbG9hZCcgYmVmb3JlIHRoZSBWaWV3IHdpbGwgZ2V0IGl0LlxyXG5cdFx0bGV0IGxvYWRNYXA6IE1hcDxzdHJpbmcsIGJvb2xlYW4+O1xyXG5cclxuXHRcdGlmICh0aGlzLnNsaWRlc0RhdGEgJiYgdGhpcy5zbGlkZXNEYXRhLmxlbmd0aCkge1xyXG5cdFx0XHRsb2FkTWFwID0gbmV3IE1hcCgpO1xyXG5cdFx0XHR0aGlzLnNsaWRlc0RhdGEuZm9yRWFjaChpdGVtID0+IHtcclxuXHRcdFx0XHRpZiAoaXRlbS5sb2FkKSB7XHJcblx0XHRcdFx0XHRsb2FkTWFwLnNldChpdGVtLmlkLCBpdGVtLmxvYWQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNsaWRlc0RhdGEgPSB0aGlzLl9pdGVtcy5tYXAoc2xpZGUgPT4ge1xyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdGlkOiBgJHtzbGlkZS5pZH1gLFxyXG5cdFx0XHRcdGlzQWN0aXZlOiBmYWxzZSxcclxuXHRcdFx0XHR0cGxSZWY6IHNsaWRlLnRwbFJlZixcclxuXHRcdFx0XHRkYXRhTWVyZ2U6IHNsaWRlLmRhdGFNZXJnZSxcclxuXHRcdFx0XHR3aWR0aDogMCxcclxuXHRcdFx0XHRpc0Nsb25lZDogZmFsc2UsXHJcblx0XHRcdFx0bG9hZDogbG9hZE1hcCA/IGxvYWRNYXAuZ2V0KHNsaWRlLmlkKSA6IGZhbHNlLFxyXG5cdFx0XHRcdGhhc2hGcmFnbWVudDogc2xpZGUuZGF0YUhhc2hcclxuXHRcdFx0fTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyBjdXJyZW50IGNsYXNzZXMgZm9yIHNsaWRlXHJcblx0ICogQHBhcmFtIHNsaWRlIFNsaWRlIG9mIGNhcm91c2VsXHJcblx0ICogQHJldHVybnMgb2JqZWN0IHdpdGggbmFtZXMgb2YgY3NzLWNsYXNzZXMgd2hpY2ggYXJlIGtleXMgYW5kIHRydWUvZmFsc2UgdmFsdWVzXHJcblx0ICovXHJcblx0c2V0Q3VyU2xpZGVDbGFzc2VzKHNsaWRlOiBTbGlkZU1vZGVsKToge1trZXk6IHN0cmluZ106IGJvb2xlYW59IHtcclxuXHRcdC8vIENTUyBjbGFzc2VzOiBhZGRlZC9yZW1vdmVkIHBlciBjdXJyZW50IHN0YXRlIG9mIGNvbXBvbmVudCBwcm9wZXJ0aWVzXHJcblx0XHRjb25zdCBjdXJyZW50Q2xhc3Nlczoge1trZXk6IHN0cmluZ106IGJvb2xlYW59ID0gIHtcclxuXHRcdFx0J2FjdGl2ZSc6IHNsaWRlLmlzQWN0aXZlLFxyXG5cdFx0XHQnY2VudGVyJzogc2xpZGUuaXNDZW50ZXJlZCxcclxuXHRcdFx0J2Nsb25lZCc6IHNsaWRlLmlzQ2xvbmVkLFxyXG5cdFx0XHQnYW5pbWF0ZWQnOiBzbGlkZS5pc0FuaW1hdGVkLFxyXG5cdFx0XHQnb3dsLWFuaW1hdGVkLWluJzogc2xpZGUuaXNEZWZBbmltYXRlZEluLFxyXG5cdFx0XHQnb3dsLWFuaW1hdGVkLW91dCc6IHNsaWRlLmlzRGVmQW5pbWF0ZWRPdXRcclxuXHRcdH07XHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5hbmltYXRlSW4pIHtcclxuXHRcdFx0Y3VycmVudENsYXNzZXNbdGhpcy5zZXR0aW5ncy5hbmltYXRlSW4gYXMgc3RyaW5nXSA9IHNsaWRlLmlzQ3VzdG9tQW5pbWF0ZWRJbjtcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLmFuaW1hdGVPdXQpIHtcclxuXHRcdFx0Y3VycmVudENsYXNzZXNbdGhpcy5zZXR0aW5ncy5hbmltYXRlT3V0IGFzIHN0cmluZ10gPSBzbGlkZS5pc0N1c3RvbUFuaW1hdGVkT3V0O1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGN1cnJlbnRDbGFzc2VzO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogT3BlcmF0b3JzIHRvIGNhbGN1bGF0ZSByaWdodC10by1sZWZ0IGFuZCBsZWZ0LXRvLXJpZ2h0LlxyXG5cdCAqIEBwYXJhbSBhIC0gVGhlIGxlZnQgc2lkZSBvcGVyYW5kLlxyXG5cdCAqIEBwYXJhbSBvIC0gVGhlIG9wZXJhdG9yLlxyXG5cdCAqIEBwYXJhbSBiIC0gVGhlIHJpZ2h0IHNpZGUgb3BlcmFuZC5cclxuXHQgKiBAcmV0dXJucyB0cnVlL2ZhbHNlIG1lYW5pbmcgcmlnaHQtdG8tbGVmdCBvciBsZWZ0LXRvLXJpZ2h0XHJcblx0ICovXHJcbiAgcHJpdmF0ZSBfb3AoYTogbnVtYmVyLCBvOiBzdHJpbmcsIGI6IG51bWJlcik6IGJvb2xlYW4ge1xyXG5cdFx0Y29uc3QgcnRsID0gdGhpcy5zZXR0aW5ncy5ydGw7XHJcblx0XHRzd2l0Y2ggKG8pIHtcclxuXHRcdFx0Y2FzZSAnPCc6XHJcblx0XHRcdFx0cmV0dXJuIHJ0bCA/IGEgPiBiIDogYSA8IGI7XHJcblx0XHRcdGNhc2UgJz4nOlxyXG5cdFx0XHRcdHJldHVybiBydGwgPyBhIDwgYiA6IGEgPiBiO1xyXG5cdFx0XHRjYXNlICc+PSc6XHJcblx0XHRcdFx0cmV0dXJuIHJ0bCA/IGEgPD0gYiA6IGEgPj0gYjtcclxuXHRcdFx0Y2FzZSAnPD0nOlxyXG5cdFx0XHRcdHJldHVybiBydGwgPyBhID49IGIgOiBhIDw9IGI7XHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBUcmlnZ2VycyBhIHB1YmxpYyBldmVudC5cclxuXHQgKiBAdG9kbyBSZW1vdmUgYHN0YXR1c2AsIGByZWxhdGVkVGFyZ2V0YCBzaG91bGQgYmUgdXNlZCBpbnN0ZWFkLlxyXG5cdCAqIEBwYXJhbSBuYW1lIFRoZSBldmVudCBuYW1lLlxyXG5cdCAqIEBwYXJhbSBkYXRhIFRoZSBldmVudCBkYXRhLlxyXG5cdCAqIEBwYXJhbSBuYW1lc3BhY2UgVGhlIGV2ZW50IG5hbWVzcGFjZS5cclxuXHQgKiBAcGFyYW0gc3RhdGUgVGhlIHN0YXRlIHdoaWNoIGlzIGFzc29jaWF0ZWQgd2l0aCB0aGUgZXZlbnQuXHJcblx0ICogQHBhcmFtIGVudGVyIEluZGljYXRlcyBpZiB0aGUgY2FsbCBlbnRlcnMgdGhlIHNwZWNpZmllZCBzdGF0ZSBvciBub3QuXHJcblx0ICovXHJcbiAgcHJpdmF0ZSBfdHJpZ2dlcihuYW1lOiBzdHJpbmcsIGRhdGE/OiBhbnksIG5hbWVzcGFjZT86IHN0cmluZywgc3RhdGU/OiBzdHJpbmcsIGVudGVyPzogYm9vbGVhbikge1xyXG5cdFx0c3dpdGNoIChuYW1lKSB7XHJcblx0XHRcdGNhc2UgJ2luaXRpYWxpemVkJzpcclxuXHRcdFx0XHR0aGlzLl9pbml0aWFsaXplZENhcm91c2VsJC5uZXh0KG5hbWUpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdjaGFuZ2UnOlxyXG5cdFx0XHRcdHRoaXMuX2NoYW5nZVNldHRpbmdzQ2Fyb3VzZWwkLm5leHQoZGF0YSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ2NoYW5nZWQnOlxyXG5cdFx0XHRcdHRoaXMuX2NoYW5nZWRTZXR0aW5nc0Nhcm91c2VsJC5uZXh0KGRhdGEpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdkcmFnJzpcclxuXHRcdFx0XHR0aGlzLl9kcmFnQ2Fyb3VzZWwkLm5leHQobmFtZSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ2RyYWdnZWQnOlxyXG5cdFx0XHRcdHRoaXMuX2RyYWdnZWRDYXJvdXNlbCQubmV4dChuYW1lKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAncmVzaXplJzpcclxuXHRcdFx0XHR0aGlzLl9yZXNpemVDYXJvdXNlbCQubmV4dChuYW1lKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAncmVzaXplZCc6XHJcblx0XHRcdFx0dGhpcy5fcmVzaXplZENhcm91c2VsJC5uZXh0KG5hbWUpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdyZWZyZXNoJzpcclxuXHRcdFx0XHR0aGlzLl9yZWZyZXNoQ2Fyb3VzZWwkLm5leHQobmFtZSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ3JlZnJlc2hlZCc6XHJcblx0XHRcdFx0dGhpcy5fcmVmcmVzaGVkQ2Fyb3VzZWwkLm5leHQobmFtZSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ3RyYW5zbGF0ZSc6XHJcblx0XHRcdFx0dGhpcy5fdHJhbnNsYXRlQ2Fyb3VzZWwkLm5leHQobmFtZSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ3RyYW5zbGF0ZWQnOlxyXG5cdFx0XHRcdHRoaXMuX3RyYW5zbGF0ZWRDYXJvdXNlbCQubmV4dChuYW1lKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBFbnRlcnMgYSBzdGF0ZS5cclxuXHQgKiBAcGFyYW0gbmFtZSAtIFRoZSBzdGF0ZSBuYW1lLlxyXG5cdCAqL1xyXG4gIGVudGVyKG5hbWU6IHN0cmluZykge1xyXG4gICAgWyBuYW1lIF0uY29uY2F0KHRoaXMuX3N0YXRlcy50YWdzW25hbWVdIHx8IFtdKS5mb3JFYWNoKChzdGF0ZU5hbWUpID0+IHtcclxuICAgICAgaWYgKHRoaXMuX3N0YXRlcy5jdXJyZW50W3N0YXRlTmFtZV0gPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdHRoaXMuX3N0YXRlcy5jdXJyZW50W3N0YXRlTmFtZV0gPSAwO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLl9zdGF0ZXMuY3VycmVudFtzdGF0ZU5hbWVdKys7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICAvKipcclxuXHQgKiBMZWF2ZXMgYSBzdGF0ZS5cclxuXHQgKiBAcGFyYW0gbmFtZSAtIFRoZSBzdGF0ZSBuYW1lLlxyXG5cdCAqL1xyXG5cdGxlYXZlKG5hbWU6IHN0cmluZykge1xyXG4gICAgWyBuYW1lIF0uY29uY2F0KHRoaXMuX3N0YXRlcy50YWdzW25hbWVdIHx8IFtdKS5mb3JFYWNoKChzdGF0ZU5hbWUpID0+IHtcclxuICAgICAgaWYgKHRoaXMuX3N0YXRlcy5jdXJyZW50W3N0YXRlTmFtZV0gPT09IDAgfHwgISF0aGlzLl9zdGF0ZXMuY3VycmVudFtzdGF0ZU5hbWVdKSB7XHJcbiAgICAgICAgdGhpcy5fc3RhdGVzLmN1cnJlbnRbc3RhdGVOYW1lXS0tO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH07XHJcblxyXG4gIC8qKlxyXG5cdCAqIFJlZ2lzdGVycyBhbiBldmVudCBvciBzdGF0ZS5cclxuXHQgKiBAcGFyYW0gb2JqZWN0IC0gVGhlIGV2ZW50IG9yIHN0YXRlIHRvIHJlZ2lzdGVyLlxyXG5cdCAqL1xyXG4gIHJlZ2lzdGVyKG9iamVjdDogYW55KSB7XHJcblx0XHRpZiAob2JqZWN0LnR5cGUgPT09IFR5cGUuU3RhdGUpIHtcclxuXHRcdFx0aWYgKCF0aGlzLl9zdGF0ZXMudGFnc1tvYmplY3QubmFtZV0pIHtcclxuXHRcdFx0XHR0aGlzLl9zdGF0ZXMudGFnc1tvYmplY3QubmFtZV0gPSBvYmplY3QudGFncztcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLl9zdGF0ZXMudGFnc1tvYmplY3QubmFtZV0gPSB0aGlzLl9zdGF0ZXMudGFnc1tvYmplY3QubmFtZV0uY29uY2F0KG9iamVjdC50YWdzKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5fc3RhdGVzLnRhZ3Nbb2JqZWN0Lm5hbWVdID0gdGhpcy5fc3RhdGVzLnRhZ3Nbb2JqZWN0Lm5hbWVdLmZpbHRlcigodGFnLCBpKSA9PiB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuX3N0YXRlcy50YWdzW29iamVjdC5uYW1lXS5pbmRleE9mKHRhZykgPT09IGk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogU3VwcHJlc3NlcyBldmVudHMuXHJcblx0ICogQHBhcmFtIGV2ZW50cyBUaGUgZXZlbnRzIHRvIHN1cHByZXNzLlxyXG5cdCAqL1xyXG4gIHByaXZhdGUgX3N1cHByZXNzKGV2ZW50czogc3RyaW5nW10pIHtcclxuXHRcdGV2ZW50cy5mb3JFYWNoKGV2ZW50ID0+IHtcclxuXHRcdFx0dGhpcy5fc3VwcmVzc1tldmVudF0gPSB0cnVlO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBSZWxlYXNlcyBzdXBwcmVzc2VkIGV2ZW50cy5cclxuXHQgKiBAcGFyYW0gZXZlbnRzIFRoZSBldmVudHMgdG8gcmVsZWFzZS5cclxuXHQgKi9cclxuICBwcml2YXRlIF9yZWxlYXNlKGV2ZW50czogc3RyaW5nW10pIHtcclxuXHRcdGV2ZW50cy5mb3JFYWNoKGV2ZW50ID0+IHtcclxuXHRcdFx0ZGVsZXRlIHRoaXMuX3N1cHJlc3NbZXZlbnRdO1xyXG5cdFx0fSk7XHJcblx0IH1cclxuXHJcbiAgLyoqXHJcblx0ICogR2V0cyB1bmlmaWVkIHBvaW50ZXIgY29vcmRpbmF0ZXMgZnJvbSBldmVudC5cclxuXHQgKiBAdG9kbyAjMjYxXHJcblx0ICogQHBhcmFtIGV2ZW50IFRoZSBgbW91c2Vkb3duYCBvciBgdG91Y2hzdGFydGAgZXZlbnQuXHJcblx0ICogQHJldHVybnMgT2JqZWN0IENvb3JkcyB3aGljaCBjb250YWlucyBgeGAgYW5kIGB5YCBjb29yZGluYXRlcyBvZiBjdXJyZW50IHBvaW50ZXIgcG9zaXRpb24uXHJcblx0ICovXHJcblx0cG9pbnRlcihldmVudDogYW55KTogQ29vcmRzIHtcclxuXHRcdGNvbnN0IHJlc3VsdCA9IHsgeDogbnVsbCwgeTogbnVsbCB9O1xyXG5cclxuXHRcdGV2ZW50ID0gZXZlbnQub3JpZ2luYWxFdmVudCB8fCBldmVudCB8fCB3aW5kb3cuZXZlbnQ7XHJcblxyXG5cdFx0ZXZlbnQgPSBldmVudC50b3VjaGVzICYmIGV2ZW50LnRvdWNoZXMubGVuZ3RoID9cclxuXHRcdFx0ZXZlbnQudG91Y2hlc1swXSA6IGV2ZW50LmNoYW5nZWRUb3VjaGVzICYmIGV2ZW50LmNoYW5nZWRUb3VjaGVzLmxlbmd0aCA/XHJcblx0XHRcdFx0ZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0gOiBldmVudDtcclxuXHJcblx0XHRpZiAoZXZlbnQucGFnZVgpIHtcclxuXHRcdFx0cmVzdWx0LnggPSBldmVudC5wYWdlWDtcclxuXHRcdFx0cmVzdWx0LnkgPSBldmVudC5wYWdlWTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJlc3VsdC54ID0gZXZlbnQuY2xpZW50WDtcclxuXHRcdFx0cmVzdWx0LnkgPSBldmVudC5jbGllbnRZO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0IH1cclxuXHJcbiAgLyoqXHJcblx0ICogRGV0ZXJtaW5lcyBpZiB0aGUgaW5wdXQgaXMgYSBOdW1iZXIgb3Igc29tZXRoaW5nIHRoYXQgY2FuIGJlIGNvZXJjZWQgdG8gYSBOdW1iZXJcclxuXHQgKiBAcGFyYW0gbnVtYmVyIFRoZSBpbnB1dCB0byBiZSB0ZXN0ZWRcclxuXHQgKiBAcmV0dXJucyBBbiBpbmRpY2F0aW9uIGlmIHRoZSBpbnB1dCBpcyBhIE51bWJlciBvciBjYW4gYmUgY29lcmNlZCB0byBhIE51bWJlclxyXG5cdCAqL1xyXG4gIHByaXZhdGUgX2lzTnVtZXJpYyhudW1iZXI6IGFueSk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuICFpc05hTihwYXJzZUZsb2F0KG51bWJlcikpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRGV0ZXJtaW5lcyB3aGV0aGVyIHZhbHVlIGlzIG51bWJlciBvciBib29sZWFuIHR5cGVcclxuXHQgKiBAcGFyYW0gdmFsdWUgVGhlIGlucHV0IHRvIGJlIHRlc3RlZFxyXG5cdCAqIEByZXR1cm5zIEFuIGluZGljYXRpb24gaWYgdGhlIGlucHV0IGlzIGEgTnVtYmVyIG9yIGNhbiBiZSBjb2VyY2VkIHRvIGEgTnVtYmVyLCBvciBCb29sZWFuXHJcblx0ICovXHJcblx0cHJpdmF0ZSBfaXNOdW1iZXJPckJvb2xlYW4odmFsdWU6IG51bWJlciB8IGJvb2xlYW4pOiBib29sZWFuIHtcclxuXHRcdHJldHVybiB0aGlzLl9pc051bWVyaWModmFsdWUpIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRGV0ZXJtaW5lcyB3aGV0aGVyIHZhbHVlIGlzIG51bWJlciBvciBzdHJpbmcgdHlwZVxyXG5cdCAqIEBwYXJhbSB2YWx1ZSBUaGUgaW5wdXQgdG8gYmUgdGVzdGVkXHJcblx0ICogQHJldHVybnMgQW4gaW5kaWNhdGlvbiBpZiB0aGUgaW5wdXQgaXMgYSBOdW1iZXIgb3IgY2FuIGJlIGNvZXJjZWQgdG8gYSBOdW1iZXIsIG9yIFN0cmluZ1xyXG5cdCAqL1xyXG5cdHByaXZhdGUgX2lzTnVtYmVyT3JTdHJpbmcodmFsdWU6IG51bWJlciB8IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2lzTnVtZXJpYyh2YWx1ZSkgfHwgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERldGVybWluZXMgd2hldGhlciB2YWx1ZSBpcyBudW1iZXIgb3Igc3RyaW5nIHR5cGVcclxuXHQgKiBAcGFyYW0gdmFsdWUgVGhlIGlucHV0IHRvIGJlIHRlc3RlZFxyXG5cdCAqIEByZXR1cm5zIEFuIGluZGljYXRpb24gaWYgdGhlIGlucHV0IGlzIGEgTnVtYmVyIG9yIGNhbiBiZSBjb2VyY2VkIHRvIGEgTnVtYmVyLCBvciBTdHJpbmdcclxuXHQgKi9cclxuXHRwcml2YXRlIF9pc1N0cmluZ09yQm9vbGVhbih2YWx1ZTogbnVtYmVyIHwgc3RyaW5nKTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJztcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEdldHMgdGhlIGRpZmZlcmVuY2Ugb2YgdHdvIHZlY3RvcnMuXHJcblx0ICogQHRvZG8gIzI2MVxyXG5cdCAqIEBwYXJhbSBmaXJzdCBUaGUgZmlyc3QgdmVjdG9yLlxyXG5cdCAqIEBwYXJhbSBzZWNvbmQtIFRoZSBzZWNvbmQgdmVjdG9yLlxyXG5cdCAqIEByZXR1cm5zIFRoZSBkaWZmZXJlbmNlLlxyXG5cdCAqL1xyXG4gIGRpZmZlcmVuY2UoZmlyc3Q6IENvb3Jkcywgc2Vjb25kOiBDb29yZHMpOiBDb29yZHMge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0eDogZmlyc3QueCAtIHNlY29uZC54LFxyXG5cdFx0XHR5OiBmaXJzdC55IC0gc2Vjb25kLnlcclxuXHRcdH07XHJcblx0fVxyXG5cclxufVxyXG4iXX0=