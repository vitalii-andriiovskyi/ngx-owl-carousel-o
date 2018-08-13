/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { OwlCarouselOConfig, OwlOptionsMockedTypes } from '../carousel/owl-carousel-o-config';
/**
 * Current state information and their tags.
 */
export class States {
}
if (false) {
    /** @type {?} */
    States.prototype.current;
    /** @type {?} */
    States.prototype.tags;
}
/** @enum {string} */
const Type = {
    Event: 'event',
    State: 'state',
};
export { Type };
;
/** @enum {string} */
const Width = {
    Default: 'default',
    Inner: 'inner',
    Outer: 'outer',
};
export { Width };
;
/**
 * Model for coords of .owl-stage
 */
export class Coords {
}
if (false) {
    /** @type {?} */
    Coords.prototype.x;
    /** @type {?} */
    Coords.prototype.y;
}
/**
 * Model for all current data of carousel
 */
export class CarouselCurrentData {
}
if (false) {
    /** @type {?} */
    CarouselCurrentData.prototype.owlDOMData;
    /** @type {?} */
    CarouselCurrentData.prototype.stageData;
    /** @type {?} */
    CarouselCurrentData.prototype.slidesData;
    /** @type {?} */
    CarouselCurrentData.prototype.navData;
    /** @type {?} */
    CarouselCurrentData.prototype.dotsData;
}
export class CarouselService {
    constructor() {
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
        this._items = [];
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
         * \@todo Maybe this could be part of a plugin.
         */
        this._mergers = [];
        /**
         * Animation speed in milliseconds.
         */
        this._speed = null;
        /**
         * Coordinates of all items in pixel.
         * \@todo The name of this member is missleading.
         */
        this._coordinates = [];
        /**
         * Current breakpoint.
         * \@todo Real media queries would be nice.
         */
        this._breakpoint = null;
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
                    /** @type {?} */
                    const margin = this.settings.margin || '';
                    /** @type {?} */
                    const grid = !this.settings.autoWidth;
                    /** @type {?} */
                    const rtl = this.settings.rtl;
                    /** @type {?} */
                    const css = {
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
                    /** @type {?} */
                    const width = +(this.width() / this.settings.items).toFixed(3) - this.settings.margin;
                    /** @type {?} */
                    const grid = !this.settings.autoWidth;
                    /** @type {?} */
                    const widths = [];
                    /** @type {?} */
                    let merge = null;
                    /** @type {?} */
                    let iterator = this._items.length;
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
                    /** @type {?} */
                    const clones = [];
                    /** @type {?} */
                    const items = this._items;
                    /** @type {?} */
                    const settings = this.settings;
                    /** @type {?} */
                    const 
                    // TODO: Should be computed from number of min width items in stage
                    view = Math.max(settings.items * 2, 4);
                    /** @type {?} */
                    const size = Math.ceil(items.length / 2) * 2;
                    /** @type {?} */
                    let append = [];
                    /** @type {?} */
                    let prepend = [];
                    /** @type {?} */
                    let repeat = settings.loop && items.length ? settings.rewind ? view : Math.max(view, size) : 0;
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
                filter: ['width', 'items', 'settings'],
                run: () => {
                    /** @type {?} */
                    const rtl = this.settings.rtl ? 1 : -1;
                    /** @type {?} */
                    const size = this._clones.length + this._items.length;
                    /** @type {?} */
                    const coordinates = [];
                    /** @type {?} */
                    let iterator = -1;
                    /** @type {?} */
                    let previous = 0;
                    /** @type {?} */
                    let current = 0;
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
                    /** @type {?} */
                    const padding = this.settings.stagePadding;
                    /** @type {?} */
                    const coordinates = this._coordinates;
                    /** @type {?} */
                    const css = {
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
                    /** @type {?} */
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
                    /** @type {?} */
                    const rtl = this.settings.rtl ? 1 : -1;
                    /** @type {?} */
                    const padding = this.settings.stagePadding * 2;
                    /** @type {?} */
                    const matches = [];
                    /** @type {?} */
                    let begin;
                    /** @type {?} */
                    let end;
                    /** @type {?} */
                    let inner;
                    /** @type {?} */
                    let outer;
                    /** @type {?} */
                    let i;
                    /** @type {?} */
                    let n;
                    begin = this.coordinates(this.current());
                    if (typeof begin === 'number') {
                        begin += padding;
                    }
                    else {
                        begin = 0;
                    }
                    end = begin + this.width() * rtl;
                    if (rtl === -1 && this.settings.center) {
                        /** @type {?} */
                        const result = this._coordinates.filter(element => {
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
    }
    /**
     * @return {?}
     */
    get invalidated() {
        return this._invalidated;
    }
    /**
     * @return {?}
     */
    get states() {
        return this._states;
    }
    /**
     * Makes _viewSettingsShipper$ Subject become Observable
     * @return {?} Observable of _viewSettingsShipper$ Subject
     */
    getViewCurSettings() {
        return this._viewSettingsShipper$.asObservable();
    }
    /**
     * Makes _initializedCarousel$ Subject become Observable
     * @return {?} Observable of _initializedCarousel$ Subject
     */
    getInitializedState() {
        return this._initializedCarousel$.asObservable();
    }
    /**
     * Makes _changeSettingsCarousel$ Subject become Observable
     * @return {?} Observable of _changeSettingsCarousel$ Subject
     */
    getChangeState() {
        return this._changeSettingsCarousel$.asObservable();
    }
    /**
     * Makes _changedSettingsCarousel$ Subject become Observable
     * @return {?} Observable of _changedSettingsCarousel$ Subject
     */
    getChangedState() {
        return this._changedSettingsCarousel$.asObservable();
    }
    /**
     * Makes _translatedCarousel$ Subject become Observable
     * @return {?} Observable of _translatedCarousel$ Subject
     */
    getTranslatedState() {
        return this._translatedCarousel$.asObservable();
    }
    /**
     * Makes _resizeCarousel$ Subject become Observable
     * @return {?} Observable of _resizeCarousel$ Subject
     */
    getResizeState() {
        return this._resizeCarousel$.asObservable();
    }
    /**
     * Makes _resizedCarousel$ Subject become Observable
     * @return {?} Observable of _resizedCarousel$ Subject
     */
    getResizedState() {
        return this._resizedCarousel$.asObservable();
    }
    /**
     * Makes _refreshCarousel$ Subject become Observable
     * @return {?} Observable of _refreshCarousel$ Subject
     */
    getRefreshState() {
        return this._refreshCarousel$.asObservable();
    }
    /**
     * Makes _refreshedCarousel$ Subject become Observable
     * @return {?} Observable of _refreshedCarousel$ Subject
     */
    getRefreshedState() {
        return this._refreshedCarousel$.asObservable();
    }
    /**
     * Setups custom options expanding default options
     * @param {?} options custom options
     * @return {?}
     */
    setOptions(options) {
        /** @type {?} */
        const configOptions = new OwlCarouselOConfig();
        /** @type {?} */
        const checkedOptions = this._validateOptions(options, configOptions);
        this._options = Object.assign({}, configOptions, checkedOptions);
    }
    /**
     * Checks whether user's option are set properly. Cheking is based on typings;
     * @param {?} options options set by user
     * @param {?} configOptions default options
     * @return {?} checked and modified (if it's needed) user's options
     *
     * Notes:
     * 	- if user set option with wrong type, it'll be written in console
     */
    _validateOptions(options, configOptions) {
        /** @type {?} */
        const checkedOptions = Object.assign({}, options);
        /** @type {?} */
        const mockedTypes = new OwlOptionsMockedTypes();
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
                else if (mockedTypes[key] === 'string[]') {
                    if (Array.isArray(checkedOptions[key])) {
                        /** @type {?} */
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
        /**
         * @param {?} type
         * @param {?} key
         * @return {?}
         */
        function setRightOption(type, key) {
            console.log(`options.${key} must be type of ${type}; ${key}=${options[key]} skipped to defaults: ${key}=${configOptions[key]}`);
            return configOptions[key];
        }
        return checkedOptions;
    }
    /**
     * Checks option items set by user and if it bigger than number of slides then returns number of slides
     * @param {?} items option items set by user
     * @return {?} right number of items
     */
    _validateItems(items) {
        /** @type {?} */
        let result;
        if (items >= this._items.length) {
            result = this._items.length;
            console.log('option \'items\' in your options is bigger than number of slides; This option is updated to current number of slides and navigation got disabled');
        }
        else {
            result = items;
        }
        return result;
    }
    /**
     * Set current width of carousel
     * @param {?} width width of carousel Window
     * @return {?}
     */
    setCarouselWidth(width) {
        this._width = width;
    }
    /**
     * Setups the current settings.
     * \@todo Remove responsive classes. Why should adaptive designs be brought into IE8?
     * \@todo Support for media queries by using `matchMedia` would be nice.
     * @param {?} carouselWidth width of carousel
     * @param {?} slides array of slides
     * @param {?} options options set by user
     * @return {?}
     */
    setup(carouselWidth, slides, options) {
        this.setCarouselWidth(carouselWidth);
        this.setItems(slides);
        this._defineSlidesData();
        this.setOptions(options);
        this.settings = Object.assign({}, this._options);
        this.setViewportItemsN();
        this._trigger('change', { property: { name: 'settings', value: this.settings } });
        this.invalidate('settings'); // must be call of this function;
        this._trigger('changed', { property: { name: 'settings', value: this.settings } });
    }
    /**
     * Set number of items for current viewport
     * @return {?}
     */
    setViewportItemsN() {
        /** @type {?} */
        const viewport = this._width;
        /** @type {?} */
        const overwrites = this._options.responsive;
        /** @type {?} */
        let match = -1;
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
        this.settings = Object.assign({}, this.settings, { items: this._validateItems(overwrites[match].items) });
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
     * @param {?} slides array of CarouselSlideDirective
     * @return {?}
     */
    initialize(slides) {
        this.enter('initializing');
        // this.trigger('initialize');
        this.owlDOMData.rtl = this.settings.rtl;
        slides.forEach(item => {
            /** @type {?} */
            const mergeN = this.settings.merge ? item.dataMerge : 1;
            this._mergers.push(mergeN);
        });
        this.reset(this._isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0);
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
     * @return {?}
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
     * @return {?}
     */
    _optionsLogic() {
        if (this.settings.autoWidth) {
            this.settings.stagePadding = 0;
            this.settings.merge = false;
        }
    }
    /**
     * Updates the view
     * @return {?}
     */
    update() {
        /** @type {?} */
        let i = 0;
        /** @type {?} */
        const n = this._pipe.length;
        /** @type {?} */
        const filter = item => this._invalidated[item];
        /** @type {?} */
        const cache = {};
        while (i < n) {
            /** @type {?} */
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
     * @param {?=} dimension
     * @return {?} The width of the view in pixel.
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
     * @return {?}
     */
    refresh() {
        this.enter('refreshing');
        this._trigger('refresh');
        this._defineSlidesData();
        this.setViewportItemsN();
        this._optionsLogic();
        // this.$element.addClass(this.options.refreshClass);
        this.update();
        // this.$element.removeClass(this.options.refreshClass);
        this.leave('refreshing');
        this._trigger('refreshed');
    }
    /**
     * Checks window `resize` event.
     * @param {?} curWidth width of .owl-carousel
     * @return {?}
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
     * \@todo Horizontal swipe threshold as option
     * \@todo #261
     * @param {?} event - The event arguments.
     * @return {?} stage - object with 'x' and 'y' coordinates of .owl-stage
     */
    prepareDragging(event) {
        /** @type {?} */
        let stage = null;
        /** @type {?} */
        let transformArr;
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
     * Defines new coords for .owl-stage while dragging it
     * \@todo #261
     * @param {?} event the event arguments.
     * @param {?} dragData initial data got after starting dragging
     * @return {?} coords or false
     */
    defineNewCoordsDrag(event, dragData) {
        /** @type {?} */
        let minimum = null;
        /** @type {?} */
        let maximum = null;
        /** @type {?} */
        let pull = null;
        /** @type {?} */
        const delta = this.difference(dragData.pointer, this.pointer(event));
        /** @type {?} */
        const stage = this.difference(dragData.stage.start, delta);
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
     * \@todo #261
     * \@todo Threshold for click event
     * @param {?} event the event arguments.
     * @param {?} dragObj the object with dragging settings and states
     * @param {?} clickAttacher function which attaches click handler to slide or its children elements in order to prevent event bubling
     * @return {?}
     */
    finishDragging(event, dragObj, clickAttacher) {
        /** @type {?} */
        const delta = this.difference(dragObj.pointer, this.pointer(event));
        /** @type {?} */
        const stage = dragObj.stage.current;
        /** @type {?} */
        const direction = delta.x > +this.settings.rtl ? 'left' : 'right';
        /** @type {?} */
        let currentSlideI;
        /** @type {?} */
        let current;
        /** @type {?} */
        let newCurrent;
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
    }
    /**
     * Gets absolute position of the closest item for a coordinate.
     * \@todo Setting `freeDrag` makes `closest` not reusable. See #165.
     * @param {?} coordinate The coordinate in pixel.
     * @param {?} direction The direction to check for the closest item. Ether `left` or `right`.
     * @return {?} The absolute position of the closest item.
     */
    closest(coordinate, direction) {
        /** @type {?} */
        const pull = 30;
        /** @type {?} */
        const width = this.width();
        /** @type {?} */
        let coordinates = /** @type {?} */ (this.coordinates());
        /** @type {?} */
        let position = -1;
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
     * \@todo #270
     * @param {?} coordinate The coordinate in pixels.
     * @return {?}
     */
    animate(coordinate) {
        /** @type {?} */
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
     * @param {?} state The state to check.
     * @return {?} The flag which indicates if the carousel is busy.
     */
    is(state) {
        return this._states.current[state] && this._states.current[state] > 0;
    }
    ;
    /**
     * Sets the absolute position of the current item.
     * @param {?=} position The new absolute position or nothing to leave it unchanged.
     * @return {?} The absolute position of the current item.
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
            /** @type {?} */
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
     * @param {?} part The part to invalidate.
     * @return {?} The invalidated parts.
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
     * @param {?} position the absolute position of the new item.
     * @return {?}
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
     * @param {?} position The absolute or relative position to normalize.
     * @param {?=} relative Whether the given position is relative or not.
     * @return {?} The normalized position.
     */
    normalize(position, relative) {
        /** @type {?} */
        const n = this._items.length;
        /** @type {?} */
        const m = relative ? 0 : this._clones.length;
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
     * @param {?} position The absolute position to convert.
     * @return {?} The converted position.
     */
    relative(position) {
        position -= this._clones.length / 2;
        return this.normalize(position, true);
    }
    /**
     * Gets the maximum position for the current item.
     * @param {?=} relative Whether to return an absolute position or a relative position.
     * @return {?} number of maximum position
     */
    maximum(relative = false) {
        /** @type {?} */
        const settings = this.settings;
        /** @type {?} */
        let maximum = this._coordinates.length;
        /** @type {?} */
        let iterator;
        /** @type {?} */
        let reciprocalItemsWidth;
        /** @type {?} */
        let elementWidth;
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
     * @param {?=} relative Whether to return an absolute position or a relative position.
     * @return {?} number of minimum position
     */
    minimum(relative = false) {
        return relative ? 0 : this._clones.length / 2;
    }
    /**
     * Gets an item at the specified relative position.
     * @param {?=} position The relative position of the item.
     * @return {?} The item at the given position or all items if no position was given.
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
     * @param {?} position The relative position of the item.
     * @return {?} The item at the given position or all items if no position was given.
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
     * @param {?=} position The relative position of the item.
     * @return {?} The absolute positions of clones for the item or all if no position was given.
     */
    clones(position) {
        /** @type {?} */
        const odd = this._clones.length / 2;
        /** @type {?} */
        const even = odd + this._items.length;
        /** @type {?} */
        const map = index => index % 2 === 0 ? even + index / 2 : odd - (index + 1) / 2;
        if (position === undefined) {
            return this._clones.map((v, i) => map(i));
        }
        return this._clones.map((v, i) => v === position ? map(i) : null);
    }
    /**
     * Sets the current animation speed.
     * @param {?=} speed The animation speed in milliseconds or nothing to leave it unchanged.
     * @return {?} The current animation speed in milliseconds.
     */
    speed(speed) {
        if (speed !== undefined) {
            this._speed = speed;
        }
        return this._speed;
    }
    /**
     * Gets the coordinate of an item.
     * \@todo The name of this method is missleanding.
     * @param {?=} position The absolute position of the item within `minimum()` and `maximum()`.
     * @return {?} The coordinate of the item in pixel or all coordinates.
     */
    coordinates(position) {
        /** @type {?} */
        let multiplier = 1;
        /** @type {?} */
        let newPosition = position - 1;
        /** @type {?} */
        let coordinate;
        /** @type {?} */
        let result;
        if (position === undefined) {
            result = this._coordinates.map((item, index) => {
                return /** @type {?} */ (this.coordinates(index));
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
     * @param {?} from The absolute position of the start item.
     * @param {?} to The absolute position of the target item.
     * @param {?=} factor [factor=undefined] - The time factor in milliseconds.
     * @return {?} The time in milliseconds for the translation.
     */
    _duration(from, to, factor) {
        if (factor === 0) {
            return 0;
        }
        return Math.min(Math.max(Math.abs(to - from), 1), 6) * Math.abs((+factor || this.settings.smartSpeed));
    }
    /**
     * Slides to the specified item.
     * @param {?} position The position of the item.
     * @param {?} speed The time in milliseconds for the transition.
     * @return {?}
     */
    to(position, speed) {
        /** @type {?} */
        let current = this.current();
        /** @type {?} */
        let revert = null;
        /** @type {?} */
        let distance = position - this.relative(current);
        /** @type {?} */
        let maximum = this.maximum();
        /** @type {?} */
        const direction = +(distance > 0) - +(distance < 0);
        /** @type {?} */
        const items = this._items.length;
        /** @type {?} */
        const minimum = this.minimum();
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
        }, 0);
    }
    /**
     * Slides to the next item.
     * @param {?} speed The time in milliseconds for the transition.
     * @return {?}
     */
    next(speed) {
        speed = speed || false;
        this.to(this.relative(this.current()) + 1, speed);
    }
    /**
     * Slides to the previous item.
     * @param {?} speed The time in milliseconds for the transition.
     * @return {?}
     */
    prev(speed) {
        speed = speed || false;
        this.to(this.relative(this.current()) - 1, speed);
    }
    /**
     * Handles the end of an animation.
     * @param {?=} event - The event arguments.
     * @return {?}
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
     * @return {?} - The width in pixel.
     */
    _viewport() {
        /** @type {?} */
        let width;
        if (this._width) {
            width = this._width;
        }
        else {
            console.warn('Can not detect viewport width.');
        }
        return width;
    }
    /**
     * Sets _items
     * @param {?} content The list of slides put into CarouselSlideDirectives.
     * @return {?}
     */
    setItems(content) {
        this._items = content;
    }
    /**
     * Sets slidesData using this._items
     * @return {?}
     */
    _defineSlidesData() {
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
     * Operators to calculate right-to-left and left-to-right.
     * @param {?} a - The left side operand.
     * @param {?} o - The operator.
     * @param {?} b - The right side operand.
     * @return {?} true/false meaning right-to-left or left-to-right
     */
    _op(a, o, b) {
        /** @type {?} */
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
     * \@todo Remove `status`, `relatedTarget` should be used instead.
     * @param {?} name The event name.
     * @param {?=} data The event data.
     * @param {?=} namespace The event namespace.
     * @param {?=} state The state which is associated with the event.
     * @param {?=} enter Indicates if the call enters the specified state or not.
     * @return {?}
     */
    _trigger(name, data, namespace, state, enter) {
        switch (name) {
            case 'initialized':
                this._initializedCarousel$.next(name);
                break;
            case 'translated':
                this._translatedCarousel$.next(name);
                break;
            case 'change':
                this._changedSettingsCarousel$.next(data);
                break;
            case 'changed':
                this._changedSettingsCarousel$.next(data);
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
            default:
                break;
        }
    }
    /**
     * Enters a state.
     * @param {?} name - The state name.
     * @return {?}
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
     * @param {?} name - The state name.
     * @return {?}
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
     * @param {?} object - The event or state to register.
     * @return {?}
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
     * @param {?} events The events to suppress.
     * @return {?}
     */
    _suppress(events) {
        events.forEach(event => {
            this._supress[event] = true;
        });
    }
    /**
     * Releases suppressed events.
     * @param {?} events The events to release.
     * @return {?}
     */
    _release(events) {
        events.forEach(event => {
            delete this._supress[event];
        });
    }
    /**
     * Gets unified pointer coordinates from event.
     * \@todo #261
     * @param {?} event The `mousedown` or `touchstart` event.
     * @return {?} Object Coords which contains `x` and `y` coordinates of current pointer position.
     */
    pointer(event) {
        /** @type {?} */
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
     * @param {?} number The input to be tested
     * @return {?} An indication if the input is a Number or can be coerced to a Number
     */
    _isNumeric(number) {
        return !isNaN(parseFloat(number));
    }
    /**
     * Determines whether value is number or boolean type
     * @param {?} value The input to be tested
     * @return {?} An indication if the input is a Number or can be coerced to a Number, or Boolean
     */
    _isNumberOrBoolean(value) {
        return this._isNumeric(value) || typeof value === 'boolean';
    }
    /**
     * Determines whether value is number or string type
     * @param {?} value The input to be tested
     * @return {?} An indication if the input is a Number or can be coerced to a Number, or String
     */
    _isNumberOrString(value) {
        return this._isNumeric(value) || typeof value === 'string';
    }
    /**
     * Gets the difference of two vectors.
     * \@todo #261
     * @param {?} first The first vector.
     * @param {?} second
     * @return {?} The difference.
     */
    difference(first, second) {
        return {
            x: first.x - second.x,
            y: first.y - second.y
        };
    }
}
CarouselService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
CarouselService.ctorParameters = () => [];
if (false) {
    /**
     * Subject for passing data needed for managing View
     * @type {?}
     */
    CarouselService.prototype._viewSettingsShipper$;
    /**
     * Subject for notification when the carousel got initializes
     * @type {?}
     */
    CarouselService.prototype._initializedCarousel$;
    /**
     * Subject for notification when the carousel's settings start changinf
     * @type {?}
     */
    CarouselService.prototype._changeSettingsCarousel$;
    /**
     * Subject for notification when the carousel's settings have changed
     * @type {?}
     */
    CarouselService.prototype._changedSettingsCarousel$;
    /**
     * Subject for notification when the carousel stopped translating or moving
     * @type {?}
     */
    CarouselService.prototype._translatedCarousel$;
    /**
     * Subject for notification when the carousel's rebuilding caused by 'resize' event starts
     * @type {?}
     */
    CarouselService.prototype._resizeCarousel$;
    /**
     * Subject for notification  when the carousel's rebuilding caused by 'resize' event is ended
     * @type {?}
     */
    CarouselService.prototype._resizedCarousel$;
    /**
     * Subject for notification when the refresh of carousel starts
     * @type {?}
     */
    CarouselService.prototype._refreshCarousel$;
    /**
     * Subject for notification when the refresh of carousel is ended
     * @type {?}
     */
    CarouselService.prototype._refreshedCarousel$;
    /**
     * Current settings for the carousel.
     * @type {?}
     */
    CarouselService.prototype.settings;
    /**
     * Initial data for setting classes to element .owl-carousel
     * @type {?}
     */
    CarouselService.prototype.owlDOMData;
    /**
     * Initial data of .owl-stage
     * @type {?}
     */
    CarouselService.prototype.stageData;
    /**
     *  Data of every slide
     * @type {?}
     */
    CarouselService.prototype.slidesData;
    /**
     * Data of navigation block
     * @type {?}
     */
    CarouselService.prototype.navData;
    /**
     * Data of dots block
     * @type {?}
     */
    CarouselService.prototype.dotsData;
    /**
     * Carousel width
     * @type {?}
     */
    CarouselService.prototype._width;
    /**
     * All real items.
     * @type {?}
     */
    CarouselService.prototype._items;
    /**
     * Array with width of every slide.
     * @type {?}
     */
    CarouselService.prototype._widths;
    /**
     * Currently suppressed events to prevent them from beeing retriggered.
     * @type {?}
     */
    CarouselService.prototype._supress;
    /**
     * References to the running plugins of this carousel.
     * @type {?}
     */
    CarouselService.prototype._plugins;
    /**
     * Absolute current position.
     * @type {?}
     */
    CarouselService.prototype._current;
    /**
     * All cloned items.
     * @type {?}
     */
    CarouselService.prototype._clones;
    /**
     * Merge values of all items.
     * \@todo Maybe this could be part of a plugin.
     * @type {?}
     */
    CarouselService.prototype._mergers;
    /**
     * Animation speed in milliseconds.
     * @type {?}
     */
    CarouselService.prototype._speed;
    /**
     * Coordinates of all items in pixel.
     * \@todo The name of this member is missleading.
     * @type {?}
     */
    CarouselService.prototype._coordinates;
    /**
     * Current breakpoint.
     * \@todo Real media queries would be nice.
     * @type {?}
     */
    CarouselService.prototype._breakpoint;
    /**
     * Current options set by the caller including defaults.
     * @type {?}
     */
    CarouselService.prototype._options;
    /**
     * Invalidated parts within the update process.
     * @type {?}
     */
    CarouselService.prototype._invalidated;
    /**
     * Current state information and their tags.
     * @type {?}
     */
    CarouselService.prototype._states;
    /**
     * Ordered list of workers for the update process.
     * @type {?}
     */
    CarouselService.prototype._pipe;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vd2wtY2Fyb3VzZWwtby8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9jYXJvdXNlbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFLQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSTNDLE9BQU8sRUFBRSxPQUFPLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLHFCQUFxQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7Ozs7QUFROUYsTUFBTTtDQUtMOzs7Ozs7Ozs7SUFPQSxPQUFRLE9BQU87SUFDZixPQUFRLE9BQU87OztBQUNmLENBQUM7OztJQU9ELFNBQVUsU0FBUztJQUNuQixPQUFRLE9BQU87SUFDZixPQUFRLE9BQU87OztBQUNmLENBQUM7Ozs7QUFLRixNQUFNO0NBR0w7Ozs7Ozs7Ozs7QUFLRCxNQUFNO0NBTUw7Ozs7Ozs7Ozs7Ozs7QUFHRCxNQUFNO0lBMFpMOzs7O3FDQXRaZ0MsSUFBSSxPQUFPLEVBQXVCOzs7O3FDQUlsQyxJQUFJLE9BQU8sRUFBVTs7Ozt3Q0FLbEIsSUFBSSxPQUFPLEVBQU87Ozs7eUNBS2pCLElBQUksT0FBTyxFQUFPOzs7O29DQUl2QixJQUFJLE9BQU8sRUFBVTs7OztnQ0FJekIsSUFBSSxPQUFPLEVBQVU7Ozs7aUNBSXBCLElBQUksT0FBTyxFQUFVOzs7O2lDQUlyQixJQUFJLE9BQU8sRUFBVTs7OzttQ0FJbkIsSUFBSSxPQUFPLEVBQVU7Ozs7d0JBSzNCO1lBQ3ZCLEtBQUssRUFBRSxDQUFDO1NBQ1I7Ozs7MEJBS3dCO1lBQ3hCLEdBQUcsRUFBRSxLQUFLO1lBQ1YsWUFBWSxFQUFFLEtBQUs7WUFDbkIsV0FBVyxFQUFFLEtBQUs7WUFDbEIsUUFBUSxFQUFFLEtBQUs7WUFDZixTQUFTLEVBQUUsS0FBSztZQUNoQixlQUFlLEVBQUUsS0FBSztZQUN0QixNQUFN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LENBQUM7O3dCQUN4QyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRTs0QkFDakQsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7eUJBQzFFLENBQUMsQ0FBQzt3QkFDSCxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztxQkFDMUQ7b0JBRUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO3dCQUNyRCxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ3JILEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sR0FBRyxHQUFHLENBQUMsQ0FBQzt3QkFFN0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQzsrQkFDNUQsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNoRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3lCQUNqQjtxQkFDTjtvQkFFRCxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTt3QkFDL0IsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7d0JBQ3JCLE1BQU0sQ0FBQyxLQUFLLENBQUM7cUJBQ2IsQ0FBQyxDQUFDO29CQUNILE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7d0JBQ3RCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztxQkFDcEMsQ0FBQyxDQUFDO29CQUVDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzt3QkFDOUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7NEJBQy9CLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDOzRCQUNyQixNQUFNLENBQUMsS0FBSyxDQUFDO3lCQUNiLENBQUMsQ0FBQzt3QkFDSCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7cUJBQzFDO2lCQUNGO2FBQ0Y7U0FDRjtLQUVlOzs7O0lBOVBoQixJQUFJLFdBQVc7UUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztLQUMxQjs7OztJQWNELElBQUksTUFBTTtRQUNSLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0tBQ3RCOzs7OztJQWtQRCxrQkFBa0I7UUFDakIsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztLQUNqRDs7Ozs7SUFNRCxtQkFBbUI7UUFDbEIsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQTtLQUNoRDs7Ozs7SUFNRCxjQUFjO1FBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztLQUNwRDs7Ozs7SUFNRCxlQUFlO1FBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztLQUNyRDs7Ozs7SUFNRCxrQkFBa0I7UUFDakIsTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztLQUNoRDs7Ozs7SUFNRCxjQUFjO1FBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztLQUM1Qzs7Ozs7SUFNRCxlQUFlO1FBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztLQUM3Qzs7Ozs7SUFNRCxlQUFlO1FBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztLQUM3Qzs7Ozs7SUFNRCxpQkFBaUI7UUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztLQUMvQzs7Ozs7O0lBTUQsVUFBVSxDQUFDLE9BQW1COztRQUM3QixNQUFNLGFBQWEsR0FBZSxJQUFJLGtCQUFrQixFQUFFLENBQUM7O1FBQzNELE1BQU0sY0FBYyxHQUFlLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDakYsSUFBSSxDQUFDLFFBQVEscUJBQVEsYUFBYSxFQUFLLGNBQWMsQ0FBQyxDQUFDO0tBQ3ZEOzs7Ozs7Ozs7O0lBV08sZ0JBQWdCLENBQUMsT0FBbUIsRUFBRSxhQUF5Qjs7UUFDdEUsTUFBTSxjQUFjLHFCQUFvQixPQUFPLEVBQUU7O1FBQ2pELE1BQU0sV0FBVyxHQUFHLElBQUkscUJBQXFCLEVBQUUsQ0FBQztRQUVoRCxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLEVBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOztnQkFHeEMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQ25DLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMxQyxjQUFjLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQzNDLGNBQWMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQ3ZHO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNQLGNBQWMsQ0FBQyxHQUFHLENBQUMsR0FBRyxjQUFjLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO3FCQUM1RDtpQkFDRDtnQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVMsSUFBSSxPQUFPLGNBQWMsQ0FBQyxHQUFHLENBQUMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO29CQUN2RixjQUFjLENBQUMsR0FBRyxDQUFDLEdBQUcsY0FBYyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztpQkFDNUQ7Z0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsS0FBSyxnQkFBZ0IsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ25HLGNBQWMsQ0FBQyxHQUFHLENBQUMsR0FBRyxjQUFjLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2lCQUM1RDtnQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLGVBQWUsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2pHLGNBQWMsQ0FBQyxHQUFHLENBQUMsR0FBRyxjQUFjLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2lCQUM1RDtnQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7b0JBQzVDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzt3QkFDeEMsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDO3dCQUNyQixjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFOzRCQUNyQyxRQUFRLEdBQUcsT0FBTyxPQUFPLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQzt5QkFDdEQsQ0FBQyxDQUFDO3dCQUNILEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs0QkFBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEdBQUcsY0FBYyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQTt5QkFBRTt3QkFBQSxDQUFDO3FCQUMvRTtvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDUCxjQUFjLENBQUMsR0FBRyxDQUFDLEdBQUcsY0FBYyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztxQkFDNUQ7aUJBQ0Q7YUFDRDtTQUNEOzs7Ozs7UUFFRCx3QkFBd0IsSUFBWSxFQUFFLEdBQVE7WUFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsb0JBQW9CLElBQUksS0FBSyxHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsR0FBRyxJQUFJLGFBQWEsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDaEksTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUMxQjtRQUVELE1BQU0sQ0FBQyxjQUFjLENBQUM7Ozs7Ozs7SUFRZixjQUFjLENBQUMsS0FBYTs7UUFDbkMsSUFBSSxNQUFNLENBQVM7UUFDbkIsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNqQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUU7WUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrSkFBa0osQ0FBQyxDQUFDO1NBQ2hLO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDUCxNQUFNLEdBQUcsS0FBSyxDQUFDO1NBQ2Y7UUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDOzs7Ozs7O0lBT2YsZ0JBQWdCLENBQUMsS0FBYTtRQUM3QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztLQUNwQjs7Ozs7Ozs7OztJQVVBLEtBQUssQ0FBQyxhQUFxQixFQUFFLE1BQWdDLEVBQUUsT0FBbUI7UUFDbEYsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUV6QixJQUFJLENBQUMsUUFBUSxxQkFBUSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFcEMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFFekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2xGLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQ25GOzs7OztJQUtELGlCQUFpQjs7UUFDaEIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FDVzs7UUFEdkMsTUFDQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUM7O1FBQ3ZDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRWYsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDckMsTUFBTSxDQUFDO1NBQ1A7UUFFRCxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQzlCLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxRQUFRLElBQUksQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDdEMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDcEI7YUFDRDtTQUNEO1FBRUQsSUFBSSxDQUFDLFFBQVEscUJBQVEsSUFBSSxDQUFDLFFBQVEsSUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUMsQ0FBQzs7OztRQUl6RixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUNwQyxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUV6QixJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQzVCOzs7Ozs7SUFNQSxVQUFVLENBQUMsTUFBZ0M7UUFDM0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQzs7UUFHM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7UUFFeEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTs7WUFDckIsTUFBTSxNQUFNLEdBQVcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUMzQixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTNGLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRWYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO1FBQzFELElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO1FBRTFELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUVuQixJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7S0FDN0I7SUFBQSxDQUFDOzs7OztJQUtGLFdBQVc7UUFDVixJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDO1lBQy9CLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtZQUMzQixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDekIsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO1lBQzNCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztZQUNyQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7U0FDdkIsQ0FBQyxDQUFDO0tBQ0g7Ozs7O0lBTVEsYUFBYTtRQUNyQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztTQUM1Qjs7Ozs7O0lBTUQsTUFBTTs7UUFDSixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7O1FBQ1YsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBRWpCOztRQUZWLE1BQ0UsTUFBTSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FDaEM7O1FBRlYsTUFFRCxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBRVYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7O1lBQ2IsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3pELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxJQUFJLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekQsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDdEI7WUFDRCxDQUFDLEVBQUUsQ0FBQztTQUNQO1FBRUQsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRWpCLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBRXZCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNyQjtLQUNGOzs7Ozs7SUFPRCxLQUFLLENBQUMsU0FBaUI7UUFDdkIsU0FBUyxHQUFHLFNBQVMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDO1FBQ3ZDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDbkIsS0FBSyxLQUFLLENBQUMsS0FBSyxDQUFDO1lBQ2pCLEtBQUssS0FBSyxDQUFDLEtBQUs7Z0JBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDcEI7Z0JBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1NBQzVFO0tBQ0Q7Ozs7O0lBS0EsT0FBTztRQUNQLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUV6QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7O1FBSXJCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7UUFJZCxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7S0FDMUI7Ozs7OztJQU1ELFFBQVEsQ0FBQyxRQUFnQjtRQUN6QixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN6QixNQUFNLENBQUMsS0FBSyxDQUFDO1NBQ2I7UUFFRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQzs7Ozs7UUFNdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXpCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUVmLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUN6Qjs7Ozs7Ozs7SUFTQSxlQUFlLENBQUMsS0FBVTs7UUFDMUIsSUFBSSxLQUFLLEdBQVcsSUFBSSxDQUNDOztRQUR6QixJQUNFLFlBQVksQ0FBVzs7Ozs7OztRQVN6QixZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLHlCQUF5QixFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4RixLQUFLLEdBQUc7WUFDTixDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ25CLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7U0FDcEIsQ0FBQztRQUVKLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDMUI7UUFFRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1NBQy9CO1FBRUgsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNkLE1BQU0sQ0FBQyxLQUFLLENBQUM7S0FDYjs7Ozs7Ozs7SUFTQSxtQkFBbUIsQ0FBQyxLQUFVLEVBQUUsUUFBYTs7UUFDN0MsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUVOOztRQUZaLElBQ0EsT0FBTyxHQUFHLElBQUksQ0FDRjs7UUFGWixJQUVBLElBQUksR0FBRyxJQUFJLENBQUM7O1FBQ1osTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FDZDs7UUFEdEQsTUFDQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV0RCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDYjtRQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN4QixPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUMzQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUM7WUFDMUQsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLE9BQU8sR0FBRyxPQUFPLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxPQUFPLENBQUM7U0FDMUU7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNQLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUNsRyxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDbEcsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JELEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsT0FBTyxHQUFHLElBQUksQ0FBQyxFQUFFLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQztTQUN0RTtRQUVELE1BQU0sQ0FBQyxLQUFLLENBQUM7S0FDYjs7Ozs7Ozs7OztJQVVBLGNBQWMsQ0FBQyxLQUFVLEVBQUUsT0FBWSxFQUFFLGFBQXlCOztRQUNsRSxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUVMOztRQUY5RCxNQUNNLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FDMkI7O1FBRjlELE1BRUUsU0FBUyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7O1FBQzlELElBQUksYUFBYSxDQUE4Qzs7UUFBL0QsSUFBMkIsT0FBTyxDQUE2Qjs7UUFBL0QsSUFBNEMsVUFBVSxDQUFTO1FBRTNELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5RCxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN4RSxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNyRixPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3JCLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUVoRixFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDNUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDNUIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ2Q7WUFFRyxPQUFPLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztZQUU5QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQzVFLGFBQWEsRUFBRSxDQUFDO2FBQ1o7U0FDRjtRQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekIsTUFBTSxDQUFDO1NBQ1I7UUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQzFCOzs7Ozs7OztJQVNELE9BQU8sQ0FBQyxVQUFrQixFQUFFLFNBQWlCOztRQUM3QyxNQUFNLElBQUksR0FBRyxFQUFFLENBQ087O1FBRHRCLE1BQ0MsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7UUFDdEIsSUFBSSxXQUFXLHFCQUFhLElBQUksQ0FBQyxXQUFXLEVBQWMsRUFDM0M7O1FBRGYsSUFDQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFZixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDMUIsV0FBVyxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3BDLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNoQixJQUFJLElBQUksUUFBUSxDQUFDO2lCQUNqQjtnQkFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO2FBQ1osQ0FBQyxDQUFBO1NBQ0Y7Ozs7Ozs7UUFTQSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUU3QyxFQUFFLENBQUMsQ0FBQyxTQUFTLEtBQUssTUFBTSxJQUFJLFVBQVUsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxJQUFJLFVBQVUsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDdEcsUUFBUSxHQUFHLENBQUMsQ0FBQzs7O2FBR2I7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxLQUFLLE9BQU8sSUFBSSxVQUFVLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLElBQUksVUFBVSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDOUgsUUFBUSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDakI7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzttQkFDaEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0UsUUFBUSxHQUFHLFNBQVMsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM1QztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLEtBQUssSUFBSSxJQUFJLFVBQVUsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxJQUFJLFVBQVUsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDM0csUUFBUSxHQUFHLENBQUMsQ0FBQzthQUNiO1lBRUQsRUFBRSxDQUFDLENBQUMsUUFBUSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFBQyxLQUFLLENBQUE7YUFBRTtZQUFBLENBQUM7U0FDL0I7O1FBR0YsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7O1lBRXpCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRSxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVELFFBQVEsR0FBRyxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ3ZDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRSxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25FLFFBQVEsR0FBRyxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ3ZDO1NBQ0Q7UUFFRCxNQUFNLENBQUMsUUFBUSxDQUFDO0tBQ2Y7Ozs7Ozs7SUFPRCxPQUFPLENBQUMsVUFBNkI7O1FBQ3JDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFakMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQ3ZCO1FBRUQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNiLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUMzQjtRQUVELElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLGNBQWMsR0FBRyxVQUFVLEdBQUcsYUFBYSxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQzs7S0FHdkQ7Ozs7OztJQU9ELEVBQUUsQ0FBQyxLQUFhO1FBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDckU7SUFBQSxDQUFDOzs7Ozs7SUFPRixPQUFPLENBQUMsUUFBaUI7UUFDekIsRUFBRSxDQUFDLENBQUMsUUFBUSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDckI7UUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlCLE1BQU0sQ0FBQyxTQUFTLENBQUM7U0FDakI7UUFFRCxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVwQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7O1lBQ2hDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDOzs7O1lBTTNGLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1lBRXpCLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ25GO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7S0FDcEI7Ozs7OztJQU9ELFVBQVUsQ0FBQyxJQUFZO1FBQ3ZCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDL0IsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUFFO1NBQzdDO1FBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3JDO0lBQUEsQ0FBQzs7Ozs7O0lBTUYsS0FBSyxDQUFDLFFBQWdCO1FBQ3RCLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXBDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQzVCLE1BQU0sQ0FBQztTQUNQO1FBRUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFFekIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFFLFdBQVcsRUFBRSxZQUFZLENBQUUsQ0FBQyxDQUFDO1FBRTlDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBRXpDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBRSxXQUFXLEVBQUUsWUFBWSxDQUFFLENBQUMsQ0FBQztLQUM3Qzs7Ozs7OztJQVFBLFNBQVMsQ0FBQyxRQUFnQixFQUFFLFFBQWtCOztRQUM5QyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FDYzs7UUFEMUMsTUFDRyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBRTFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QyxRQUFRLEdBQUcsU0FBUyxDQUFDO1NBQ3JCO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksUUFBUSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlDLFFBQVEsR0FBRyxDQUFDLENBQUMsUUFBUSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDcEQ7UUFFRCxNQUFNLENBQUMsUUFBUSxDQUFDO0tBQ2Y7Ozs7OztJQU9ELFFBQVEsQ0FBQyxRQUFnQjtRQUN6QixRQUFRLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUN0Qzs7Ozs7O0lBT0EsT0FBTyxDQUFDLFdBQW9CLEtBQUs7O1FBQ2pDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7O1FBQy9CLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUd4Qjs7UUFIZCxJQUNDLFFBQVEsQ0FFSzs7UUFIZCxJQUVDLG9CQUFvQixDQUNQOztRQUhkLElBR0MsWUFBWSxDQUFDO1FBRWQsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDbkIsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7U0FDM0Q7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNqRCxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDOUIsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUN6RCxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUMzQixPQUFPLFFBQVEsRUFBRSxFQUFFLENBQUM7O2dCQUVuQixvQkFBb0IsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO2dCQUNoRixFQUFFLENBQUMsQ0FBQyxvQkFBb0IsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDO29CQUN6QyxLQUFLLENBQUM7aUJBQ047YUFDRDtZQUNELE9BQU8sR0FBRyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1NBQ3ZCO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzVCLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7U0FDakM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNQLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDO1NBQzlDO1FBRUQsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNkLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7U0FDbkM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDM0I7Ozs7OztJQU9ELE9BQU8sQ0FBQyxXQUFvQixLQUFLO1FBQ2pDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0tBQzlDOzs7Ozs7SUFPQSxLQUFLLENBQUMsUUFBaUI7UUFDdkIsRUFBRSxDQUFDLENBQUMsUUFBUSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDM0I7UUFFRCxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDMUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0tBQzlCOzs7Ozs7SUFPRCxPQUFPLENBQUMsUUFBZ0I7UUFDeEIsRUFBRSxDQUFDLENBQUMsUUFBUSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDN0I7UUFFRCxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDMUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDOUI7Ozs7OztJQU9ELE1BQU0sQ0FBQyxRQUFpQjs7UUFDeEIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUV3Qzs7UUFGM0UsTUFDQyxJQUFJLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUMyQzs7UUFGM0UsTUFFQyxHQUFHLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFM0UsRUFBRSxDQUFDLENBQUMsUUFBUSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDMUM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2xFOzs7Ozs7SUFPQSxLQUFLLENBQUMsS0FBYztRQUNwQixFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztTQUNwQjtRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0tBQ25COzs7Ozs7O0lBUUEsV0FBVyxDQUFDLFFBQWlCOztRQUM3QixJQUFJLFVBQVUsR0FBRyxDQUFDLENBR0E7O1FBSGxCLElBQ0MsV0FBVyxHQUFHLFFBQVEsR0FBRyxDQUFDLENBRVQ7O1FBSGxCLElBRUMsVUFBVSxDQUNPOztRQUhsQixJQUdDLE1BQU0sQ0FBVztRQUVsQixFQUFFLENBQUMsQ0FBQyxRQUFRLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUM1QixNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQzlDLE1BQU0sbUJBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQVcsRUFBQzthQUN6QyxDQUFDLENBQUM7WUFDSCxNQUFNLENBQUMsTUFBTSxDQUFDO1NBQ2Q7UUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDMUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLFdBQVcsR0FBRyxRQUFRLEdBQUcsQ0FBQyxDQUFDO2FBQzNCO1lBRUQsVUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDekMsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsVUFBVSxDQUFDO1NBQ25HO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDUCxVQUFVLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDakQ7UUFFRCxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUVuQyxNQUFNLENBQUMsVUFBVSxDQUFDO0tBQ2pCOzs7Ozs7OztJQVNPLFNBQVMsQ0FBQyxJQUFZLEVBQUUsRUFBVSxFQUFFLE1BQXlCO1FBQ3JFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDVDtRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7SUFRdkcsRUFBRSxDQUFDLFFBQWdCLEVBQUUsS0FBdUI7O1FBQzVDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FHRjs7UUFIMUIsSUFDQyxNQUFNLEdBQUcsSUFBSSxDQUVZOztRQUgxQixJQUVDLFFBQVEsR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FDbkI7O1FBSDFCLElBR0MsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzs7UUFDMUIsTUFBTSxTQUFTLEdBQUcsQ0FBQyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUV6Qjs7UUFGMUIsTUFDQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQ0Q7O1FBRjFCLE1BRUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUUxQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDeEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3RCxRQUFRLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQzthQUNuQztZQUVELFFBQVEsR0FBRyxPQUFPLEdBQUcsUUFBUSxDQUFDO1lBQzlCLE1BQU0sR0FBRyxDQUFDLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxHQUFHLEtBQUssR0FBRyxLQUFLLENBQUMsR0FBRyxLQUFLLEdBQUcsT0FBTyxDQUFDO1lBRWxFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxRQUFRLElBQUksTUFBTSxHQUFHLFFBQVEsSUFBSSxPQUFPLElBQUksTUFBTSxHQUFHLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsRixPQUFPLEdBQUcsTUFBTSxHQUFHLFFBQVEsQ0FBQztnQkFDNUIsUUFBUSxHQUFHLE1BQU0sQ0FBQztnQkFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDcEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ25CO1NBQ0Q7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLE9BQU8sSUFBSSxDQUFDLENBQUM7WUFDYixRQUFRLEdBQUcsQ0FBQyxRQUFRLEdBQUcsT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLE9BQU8sQ0FBQztTQUNwRDtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1AsUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7U0FDMUQ7UUFFRCxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2YsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNyRCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRXZCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNkLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FFTjs7Ozs7O0lBTUEsSUFBSSxDQUFDLEtBQXVCO1FBQzVCLEtBQUssR0FBRyxLQUFLLElBQUksS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDbEQ7Ozs7OztJQU1BLElBQUksQ0FBQyxLQUF1QjtRQUM1QixLQUFLLEdBQUcsS0FBSyxJQUFJLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQ2xEOzs7Ozs7SUFNQSxlQUFlLENBQUMsS0FBVzs7UUFFM0IsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7Ozs7OztZQU96QixNQUFNLENBQUMsS0FBSyxDQUFDO1NBQ2I7UUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDNUI7Ozs7O0lBTVEsU0FBUzs7UUFDakIsSUFBSSxLQUFLLENBQUM7UUFDVixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNqQixLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUNwQjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1AsT0FBTyxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1NBQy9DO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQzs7Ozs7OztJQU9iLFFBQVEsQ0FBQyxPQUFpQztRQUMxQyxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQztLQUN0Qjs7Ozs7SUFLTyxpQkFBaUI7UUFDeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN6QyxNQUFNLENBQUM7Z0JBQ04sRUFBRSxFQUFFLEdBQUcsS0FBSyxDQUFDLEVBQUUsRUFBRTtnQkFDakIsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNO2dCQUNwQixTQUFTLEVBQUUsS0FBSyxDQUFDLFNBQVM7Z0JBQzFCLEtBQUssRUFBRSxDQUFDO2dCQUNSLE1BQU0sRUFBRSxLQUFLO2FBQ2IsQ0FBQztTQUNGLENBQUMsQ0FBQzs7Ozs7Ozs7O0lBVUssR0FBRyxDQUFDLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUzs7UUFDM0MsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7UUFDOUIsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNYLEtBQUssR0FBRztnQkFDUCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVCLEtBQUssR0FBRztnQkFDUCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVCLEtBQUssSUFBSTtnQkFDUixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlCLEtBQUssSUFBSTtnQkFDUixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlCO2dCQUNDLEtBQUssQ0FBQztTQUNQOzs7Ozs7Ozs7Ozs7SUFZTyxRQUFRLENBQUMsSUFBWSxFQUFFLElBQVUsRUFBRSxTQUFrQixFQUFFLEtBQWMsRUFBRSxLQUFlO1FBQzlGLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDZCxLQUFLLGFBQWE7Z0JBQ2pCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3RDLEtBQUssQ0FBQztZQUNQLEtBQUssWUFBWTtnQkFDaEIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDckMsS0FBSyxDQUFDO1lBQ1AsS0FBSyxRQUFRO2dCQUNaLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzFDLEtBQUssQ0FBQztZQUNQLEtBQUssU0FBUztnQkFDYixJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMxQyxLQUFLLENBQUM7WUFDUCxLQUFLLFFBQVE7Z0JBQ1osSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDakMsS0FBSyxDQUFDO1lBQ1AsS0FBSyxTQUFTO2dCQUNiLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xDLEtBQUssQ0FBQztZQUNQLEtBQUssU0FBUztnQkFDYixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNsQyxLQUFLLENBQUM7WUFDUCxLQUFLLFdBQVc7Z0JBQ2YsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDcEMsS0FBSyxDQUFDO1lBQ1A7Z0JBQ0MsS0FBSyxDQUFDO1NBQ1A7Ozs7Ozs7SUFRRCxLQUFLLENBQUMsSUFBWTtRQUNoQixDQUFFLElBQUksQ0FBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUNuRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUN0RCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDcEM7WUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO1NBQ2hDLENBQUMsQ0FBQztLQUNKO0lBQUEsQ0FBQzs7Ozs7O0lBTUgsS0FBSyxDQUFDLElBQVk7UUFDZixDQUFFLElBQUksQ0FBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUNuRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQzthQUNuQztTQUNGLENBQUMsQ0FBQTtLQUNIO0lBQUEsQ0FBQzs7Ozs7O0lBTUYsUUFBUSxDQUFDLE1BQVc7UUFDcEIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNoQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO2FBQzdDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ1AsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3BGO1lBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2pGLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN6RCxDQUFDLENBQUM7U0FDSDtLQUNEOzs7Ozs7SUFNUSxTQUFTLENBQUMsTUFBZ0I7UUFDbEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQztTQUM1QixDQUFDLENBQUM7Ozs7Ozs7SUFPSyxRQUFRLENBQUMsTUFBZ0I7UUFDakMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN0QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDNUIsQ0FBQyxDQUFDOzs7Ozs7OztJQVNKLE9BQU8sQ0FBQyxLQUFVOztRQUNqQixNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDO1FBRXBDLEtBQUssR0FBRyxLQUFLLENBQUMsYUFBYSxJQUFJLEtBQUssSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDO1FBRXJELEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDOUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGNBQWMsSUFBSSxLQUFLLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3ZFLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUVsQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNqQixNQUFNLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7WUFDdkIsTUFBTSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO1NBQ3ZCO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDUCxNQUFNLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7WUFDekIsTUFBTSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQ3pCO1FBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQztLQUNiOzs7Ozs7SUFPTyxVQUFVLENBQUMsTUFBVztRQUM5QixNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7SUFRM0Isa0JBQWtCLENBQUMsS0FBdUI7UUFDakQsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksT0FBTyxLQUFLLEtBQUssU0FBUyxDQUFDOzs7Ozs7O0lBUXJELGlCQUFpQixDQUFDLEtBQXNCO1FBQy9DLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQzs7Ozs7Ozs7O0lBVTNELFVBQVUsQ0FBQyxLQUFhLEVBQUUsTUFBYztRQUN4QyxNQUFNLENBQUM7WUFDTixDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQztZQUNyQixDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQztTQUNyQixDQUFDO0tBQ0Y7OztZQXovQ0QsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBTdGFnZURhdGEgfSBmcm9tICcuLi9tb2RlbHMvc3RhZ2UtZGF0YS5tb2RlbCc7XHJcblxyXG5pbXBvcnQgeyBPd2xET01EYXRhIH0gZnJvbSAnLi4vbW9kZWxzL293bERPTS1kYXRhLm1vZGVsJztcclxuXHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IENhcm91c2VsU2xpZGVEaXJlY3RpdmUgfSBmcm9tICcuLi9jYXJvdXNlbC9jYXJvdXNlbC5tb2R1bGUnO1xyXG5pbXBvcnQgeyBTbGlkZXJNb2RlbCB9IGZyb20gJy4uL21vZGVscy9zbGlkZXIubW9kZWwnO1xyXG5pbXBvcnQgeyBTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IE93bENhcm91c2VsT0NvbmZpZywgT3dsT3B0aW9uc01vY2tlZFR5cGVzIH0gZnJvbSAnLi4vY2Fyb3VzZWwvb3dsLWNhcm91c2VsLW8tY29uZmlnJztcclxuaW1wb3J0IHsgT3dsT3B0aW9ucyB9IGZyb20gJy4uL21vZGVscy9vd2wtb3B0aW9ucy5tb2RlbCc7XHJcblxyXG5pbXBvcnQgeyBOYXZEYXRhLCBEb3RzRGF0YSB9IGZyb20gJy4uL21vZGVscy9uYXZpZ2F0aW9uLWRhdGEubW9kZWxzJztcclxuXHJcbi8qKlxyXG4gKiBDdXJyZW50IHN0YXRlIGluZm9ybWF0aW9uIGFuZCB0aGVpciB0YWdzLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFN0YXRlcyB7XHJcbiAgY3VycmVudDoge307XHJcbiAgdGFnczoge1xyXG4gICAgW2tleTogc3RyaW5nXTogc3RyaW5nW107XHJcbiAgfTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEVudW1lcmF0aW9uIGZvciB0eXBlcy5cclxuICogQGVudW0ge1N0cmluZ31cclxuICovXHJcbmV4cG9ydCBlbnVtIFR5cGUge1xyXG5cdEV2ZW50ID0gJ2V2ZW50JyxcclxuXHRTdGF0ZSA9ICdzdGF0ZSdcclxufTtcclxuXHJcbi8qKlxyXG4gKiBFbnVtZXJhdGlvbiBmb3Igd2lkdGguXHJcbiAqIEBlbnVtIHtTdHJpbmd9XHJcbiAqL1xyXG5leHBvcnQgZW51bSBXaWR0aCB7XHJcblx0RGVmYXVsdCA9ICdkZWZhdWx0JyxcclxuXHRJbm5lciA9ICdpbm5lcicsXHJcblx0T3V0ZXIgPSAnb3V0ZXInXHJcbn07XHJcblxyXG4vKipcclxuICogTW9kZWwgZm9yIGNvb3JkcyBvZiAub3dsLXN0YWdlXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ29vcmRzIHtcclxuXHR4OiBudW1iZXI7XHJcblx0eTogbnVtYmVyO1xyXG59XHJcblxyXG4vKipcclxuICogTW9kZWwgZm9yIGFsbCBjdXJyZW50IGRhdGEgb2YgY2Fyb3VzZWxcclxuICovXHJcbmV4cG9ydCBjbGFzcyBDYXJvdXNlbEN1cnJlbnREYXRhIHtcclxuXHRvd2xET01EYXRhOiBPd2xET01EYXRhO1xyXG5cdHN0YWdlRGF0YTogU3RhZ2VEYXRhO1xyXG5cdHNsaWRlc0RhdGE6IFNsaWRlck1vZGVsW107XHJcblx0bmF2RGF0YTogTmF2RGF0YTtcclxuXHRkb3RzRGF0YTogRG90c0RhdGE7XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIENhcm91c2VsU2VydmljZSB7XHJcblx0LyoqXHJcbiAgICogU3ViamVjdCBmb3IgcGFzc2luZyBkYXRhIG5lZWRlZCBmb3IgbWFuYWdpbmcgVmlld1xyXG4gICAqL1xyXG5cdHByaXZhdGUgX3ZpZXdTZXR0aW5nc1NoaXBwZXIkID0gbmV3IFN1YmplY3Q8Q2Fyb3VzZWxDdXJyZW50RGF0YT4oKTtcclxuXHQvKipcclxuICAgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gd2hlbiB0aGUgY2Fyb3VzZWwgZ290IGluaXRpYWxpemVzXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfaW5pdGlhbGl6ZWRDYXJvdXNlbCQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XHJcblxyXG5cdC8qKlxyXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSBjYXJvdXNlbCdzIHNldHRpbmdzIHN0YXJ0IGNoYW5naW5mXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfY2hhbmdlU2V0dGluZ3NDYXJvdXNlbCQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XHJcblxyXG5cdC8qKlxyXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSBjYXJvdXNlbCdzIHNldHRpbmdzIGhhdmUgY2hhbmdlZFxyXG4gICAqL1xyXG5cdHByaXZhdGUgX2NoYW5nZWRTZXR0aW5nc0Nhcm91c2VsJCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcclxuXHQvKipcclxuICAgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gd2hlbiB0aGUgY2Fyb3VzZWwgc3RvcHBlZCB0cmFuc2xhdGluZyBvciBtb3ZpbmdcclxuICAgKi9cclxuXHRwcml2YXRlIF90cmFuc2xhdGVkQ2Fyb3VzZWwkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xyXG5cdC8qKlxyXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSBjYXJvdXNlbCdzIHJlYnVpbGRpbmcgY2F1c2VkIGJ5ICdyZXNpemUnIGV2ZW50IHN0YXJ0c1xyXG4gICAqL1xyXG5cdHByaXZhdGUgX3Jlc2l6ZUNhcm91c2VsJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcclxuXHQvKipcclxuICAgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gIHdoZW4gdGhlIGNhcm91c2VsJ3MgcmVidWlsZGluZyBjYXVzZWQgYnkgJ3Jlc2l6ZScgZXZlbnQgaXMgZW5kZWRcclxuICAgKi9cclxuXHRwcml2YXRlIF9yZXNpemVkQ2Fyb3VzZWwkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xyXG5cdC8qKlxyXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSByZWZyZXNoIG9mIGNhcm91c2VsIHN0YXJ0c1xyXG4gICAqL1xyXG5cdHByaXZhdGUgX3JlZnJlc2hDYXJvdXNlbCQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XHJcblx0LyoqXHJcbiAgICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uIHdoZW4gdGhlIHJlZnJlc2ggb2YgY2Fyb3VzZWwgaXMgZW5kZWRcclxuICAgKi9cclxuXHRwcml2YXRlIF9yZWZyZXNoZWRDYXJvdXNlbCQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEN1cnJlbnQgc2V0dGluZ3MgZm9yIHRoZSBjYXJvdXNlbC5cclxuICAgKi9cclxuICBzZXR0aW5nczogT3dsT3B0aW9ucyA9IHtcclxuXHRcdGl0ZW1zOiAwXHJcblx0fTtcclxuXHJcblx0LyoqXHJcbiAgICogSW5pdGlhbCBkYXRhIGZvciBzZXR0aW5nIGNsYXNzZXMgdG8gZWxlbWVudCAub3dsLWNhcm91c2VsXHJcbiAgICovXHJcblx0b3dsRE9NRGF0YTogT3dsRE9NRGF0YSA9IHtcclxuXHRcdHJ0bDogZmFsc2UsXHJcblx0XHRpc1Jlc3BvbnNpdmU6IGZhbHNlLFxyXG5cdFx0aXNSZWZyZXNoZWQ6IGZhbHNlLFxyXG5cdFx0aXNMb2FkZWQ6IGZhbHNlLFxyXG5cdFx0aXNMb2FkaW5nOiBmYWxzZSxcclxuXHRcdGlzTW91c2VEcmFnYWJsZTogZmFsc2UsXHJcblx0XHRpc0dyYWI6IGZhbHNlLFxyXG5cdFx0aXNUb3VjaERyYWdhYmxlOiBmYWxzZVxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG4gICAqIEluaXRpYWwgZGF0YSBvZiAub3dsLXN0YWdlXHJcbiAgICovXHJcblx0c3RhZ2VEYXRhOiBTdGFnZURhdGEgPSB7XHJcblx0XHR0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgwcHgsMHB4LDBweCknLFxyXG5cdFx0dHJhbnNpdGlvbjogJzBzJyxcclxuXHRcdHdpZHRoOiAwLFxyXG5cdFx0cGFkZGluZ0w6IDAsXHJcblx0XHRwYWRkaW5nUjogMFxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqICBEYXRhIG9mIGV2ZXJ5IHNsaWRlXHJcblx0ICovXHJcblx0c2xpZGVzRGF0YTogU2xpZGVyTW9kZWxbXTtcclxuXHJcblx0LyoqXHJcblx0ICogRGF0YSBvZiBuYXZpZ2F0aW9uIGJsb2NrXHJcblx0ICovXHJcblx0bmF2RGF0YTogTmF2RGF0YTtcclxuXHJcblx0LyoqXHJcblx0ICogRGF0YSBvZiBkb3RzIGJsb2NrXHJcblx0ICovXHJcblx0ZG90c0RhdGE6IERvdHNEYXRhO1xyXG5cclxuXHQvKipcclxuXHQgKiBDYXJvdXNlbCB3aWR0aFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgX3dpZHRoOiBudW1iZXI7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFsbCByZWFsIGl0ZW1zLlxyXG5cdCAqL1xyXG5cdHByaXZhdGUgX2l0ZW1zOiBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlW10gPSBbXTsgLy8gaXMgZXF1YWwgdG8gdGhpcy5zbGlkZXNcclxuXHJcblx0LyoqXHJcbiAgICogQXJyYXkgd2l0aCB3aWR0aCBvZiBldmVyeSBzbGlkZS5cclxuICAgKi9cclxuICBwcml2YXRlIF93aWR0aHM6IGFueVtdID0gW107XHJcblxyXG5cdC8qKlxyXG4gICAqIEN1cnJlbnRseSBzdXBwcmVzc2VkIGV2ZW50cyB0byBwcmV2ZW50IHRoZW0gZnJvbSBiZWVpbmcgcmV0cmlnZ2VyZWQuXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfc3VwcmVzczogYW55ID0ge307XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlZmVyZW5jZXMgdG8gdGhlIHJ1bm5pbmcgcGx1Z2lucyBvZiB0aGlzIGNhcm91c2VsLlxyXG4gICAqL1xyXG5cdHByaXZhdGUgX3BsdWdpbnM6IGFueSA9IHt9O1xyXG5cclxuXHQvKipcclxuICAgKiBBYnNvbHV0ZSBjdXJyZW50IHBvc2l0aW9uLlxyXG4gICAqL1xyXG5cdHByaXZhdGUgX2N1cnJlbnQ6IG51bWJlciB8IG51bGwgPSBudWxsO1xyXG5cclxuXHQvKipcclxuICAgKiBBbGwgY2xvbmVkIGl0ZW1zLlxyXG4gICAqL1xyXG5cdHByaXZhdGUgX2Nsb25lczogYW55W10gPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogTWVyZ2UgdmFsdWVzIG9mIGFsbCBpdGVtcy5cclxuICAgKiBAdG9kbyBNYXliZSB0aGlzIGNvdWxkIGJlIHBhcnQgb2YgYSBwbHVnaW4uXHJcbiAgICovXHJcblx0cmVhZG9ubHkgX21lcmdlcnM6IGFueVtdID0gW107XHJcblxyXG5cdC8qKlxyXG4gICAqIEFuaW1hdGlvbiBzcGVlZCBpbiBtaWxsaXNlY29uZHMuXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfc3BlZWQ6IG51bWJlciB8IG51bGwgPSBudWxsO1xyXG5cclxuXHQvKipcclxuICAgKiBDb29yZGluYXRlcyBvZiBhbGwgaXRlbXMgaW4gcGl4ZWwuXHJcbiAgICogQHRvZG8gVGhlIG5hbWUgb2YgdGhpcyBtZW1iZXIgaXMgbWlzc2xlYWRpbmcuXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfY29vcmRpbmF0ZXM6IG51bWJlcltdID0gW107XHJcblxyXG5cdC8qKlxyXG4gICAqIEN1cnJlbnQgYnJlYWtwb2ludC5cclxuICAgKiBAdG9kbyBSZWFsIG1lZGlhIHF1ZXJpZXMgd291bGQgYmUgbmljZS5cclxuICAgKi9cclxuICBwcml2YXRlIF9icmVha3BvaW50OiBhbnkgPSBudWxsO1xyXG5cclxuXHQvKipcclxuXHQgKiBDdXJyZW50IG9wdGlvbnMgc2V0IGJ5IHRoZSBjYWxsZXIgaW5jbHVkaW5nIGRlZmF1bHRzLlxyXG5cdCAqL1xyXG5cdF9vcHRpb25zOiBPd2xPcHRpb25zID0ge307XHJcblxyXG4gIC8qKlxyXG4gICAqIEludmFsaWRhdGVkIHBhcnRzIHdpdGhpbiB0aGUgdXBkYXRlIHByb2Nlc3MuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfaW52YWxpZGF0ZWQ6IGFueSA9IHt9O1xyXG5cclxuICAvLyBJcyBuZWVkZWQgZm9yIHRlc3RzXHJcbiAgZ2V0IGludmFsaWRhdGVkKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2ludmFsaWRhdGVkO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBDdXJyZW50IHN0YXRlIGluZm9ybWF0aW9uIGFuZCB0aGVpciB0YWdzLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3N0YXRlczogU3RhdGVzID0ge1xyXG4gICAgY3VycmVudDoge30sXHJcbiAgICB0YWdzOiB7XHJcbiAgICAgIGluaXRpYWxpemluZzogWydidXN5J10sXHJcbiAgICAgIGFuaW1hdGluZzogWydidXN5J10sXHJcbiAgICAgIGRyYWdnaW5nOiBbJ2ludGVyYWN0aW5nJ11cclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvLyBpcyBuZWVkZWQgZm9yIHRlc3RzXHJcbiAgZ2V0IHN0YXRlcygpIHtcclxuICAgIHJldHVybiB0aGlzLl9zdGF0ZXM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuIFx0ICogT3JkZXJlZCBsaXN0IG9mIHdvcmtlcnMgZm9yIHRoZSB1cGRhdGUgcHJvY2Vzcy5cclxuICAgKi9cclxuICBwcml2YXRlIF9waXBlOiBhbnlbXSA9IFtcclxuICAgIC8vIHtcclxuICAgIC8vICAgZmlsdGVyOiBbJ3dpZHRoJywgJ3NldHRpbmdzJ10sXHJcbiAgICAvLyAgIHJ1bjogKCkgPT4ge1xyXG4gICAgLy8gICAgIHRoaXMuX3dpZHRoID0gdGhpcy5jYXJvdXNlbFdpbmRvd1dpZHRoO1xyXG4gICAgLy8gICB9XHJcbiAgICAvLyB9LFxyXG4gICAge1xyXG4gICAgICBmaWx0ZXI6IFsnd2lkdGgnLCAnaXRlbXMnLCAnc2V0dGluZ3MnXSxcclxuICAgICAgcnVuOiBjYWNoZSA9PiB7XHJcbiAgICAgICAgY2FjaGUuY3VycmVudCA9IHRoaXMuX2l0ZW1zICYmIHRoaXMuX2l0ZW1zW3RoaXMucmVsYXRpdmUodGhpcy5fY3VycmVudCldLmlkO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy8ge1xyXG4gICAgLy8gICBmaWx0ZXI6IFsnaXRlbXMnLCAnc2V0dGluZ3MnXSxcclxuICAgIC8vICAgcnVuOiBmdW5jdGlvbigpIHtcclxuICAgIC8vICAgICAvLyB0aGlzLiRzdGFnZS5jaGlsZHJlbignLmNsb25lZCcpLnJlbW92ZSgpO1xyXG4gICAgLy8gICB9XHJcblx0XHQvLyB9LFxyXG5cdFx0IHtcclxuICAgICAgZmlsdGVyOiBbICd3aWR0aCcsICdpdGVtcycsICdzZXR0aW5ncycgXSxcclxuICAgICAgcnVuOiAoY2FjaGUpID0+IHtcclxuICAgICAgICBjb25zdCBtYXJnaW4gPSB0aGlzLnNldHRpbmdzLm1hcmdpbiB8fCAnJyxcclxuICAgICAgICAgIGdyaWQgPSAhdGhpcy5zZXR0aW5ncy5hdXRvV2lkdGgsXHJcbiAgICAgICAgICBydGwgPSB0aGlzLnNldHRpbmdzLnJ0bCxcclxuICAgICAgICAgIGNzcyA9IHtcclxuICAgICAgICAgICAgJ21hcmdpbi1sZWZ0JzogcnRsID8gbWFyZ2luIDogJycsXHJcbiAgICAgICAgICAgICdtYXJnaW4tcmlnaHQnOiBydGwgPyAnJyA6IG1hcmdpblxyXG4gICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYoIWdyaWQpIHtcclxuXHRcdFx0XHRcdHRoaXMuc2xpZGVzRGF0YS5mb3JFYWNoKHNsaWRlID0+IHtcclxuXHRcdFx0XHRcdFx0c2xpZGUubWFyZ2luTCA9IGNzc1snbWFyZ2luLWxlZnQnXTtcclxuXHRcdFx0XHRcdFx0c2xpZGUubWFyZ2luUiA9IGNzc1snbWFyZ2luLXJpZ2h0J107XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9XHJcblxyXG4gICAgICAgIGNhY2hlLmNzcyA9IGNzcztcclxuICAgICAgfVxyXG4gICAgfSwge1xyXG4gICAgICBmaWx0ZXI6IFsgJ3dpZHRoJywgJ2l0ZW1zJywgJ3NldHRpbmdzJyBdLFxyXG4gICAgICBydW46IChjYWNoZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHdpZHRoOiBhbnkgPSArKHRoaXMud2lkdGgoKSAvIHRoaXMuc2V0dGluZ3MuaXRlbXMpLnRvRml4ZWQoMykgLSB0aGlzLnNldHRpbmdzLm1hcmdpbixcclxuICAgICAgICAgIGdyaWQgPSAhdGhpcy5zZXR0aW5ncy5hdXRvV2lkdGgsXHJcbiAgICAgICAgICB3aWR0aHMgPSBbXTtcclxuXHRcdFx0XHRsZXQgbWVyZ2UgPSBudWxsLFxyXG5cdFx0XHRcdFx0XHRpdGVyYXRvciA9IHRoaXMuX2l0ZW1zLmxlbmd0aDtcclxuXHJcbiAgICAgICAgY2FjaGUuaXRlbXMgPSB7XHJcbiAgICAgICAgICBtZXJnZTogZmFsc2UsXHJcbiAgICAgICAgICB3aWR0aDogd2lkdGhcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB3aGlsZSAoaXRlcmF0b3ItLSkge1xyXG4gICAgICAgICAgbWVyZ2UgPSB0aGlzLl9tZXJnZXJzW2l0ZXJhdG9yXTtcclxuICAgICAgICAgIG1lcmdlID0gdGhpcy5zZXR0aW5ncy5tZXJnZUZpdCAmJiBNYXRoLm1pbihtZXJnZSwgdGhpcy5zZXR0aW5ncy5pdGVtcykgfHwgbWVyZ2U7XHJcbiAgICAgICAgICBjYWNoZS5pdGVtcy5tZXJnZSA9IG1lcmdlID4gMSB8fCBjYWNoZS5pdGVtcy5tZXJnZTtcclxuXHJcbiAgICAgICAgICB3aWR0aHNbaXRlcmF0b3JdID0gIWdyaWQgPyB0aGlzLl9pdGVtc1tpdGVyYXRvcl0ud2lkdGggPyB0aGlzLl9pdGVtc1tpdGVyYXRvcl0ud2lkdGggOiB3aWR0aCA6IHdpZHRoICogbWVyZ2U7XHJcbiAgICAgICAgfVxyXG5cclxuXHRcdFx0XHR0aGlzLl93aWR0aHMgPSB3aWR0aHM7XHJcblxyXG5cdFx0XHRcdHRoaXMuc2xpZGVzRGF0YS5mb3JFYWNoKChzbGlkZSwgaSkgPT4ge1xyXG5cdFx0XHRcdFx0c2xpZGUud2lkdGggPSB0aGlzLl93aWR0aHNbaV07XHJcblx0XHRcdFx0XHRzbGlkZS5tYXJnaW5SID0gY2FjaGUuY3NzWydtYXJnaW4tcmlnaHQnXTtcclxuXHRcdFx0XHRcdHNsaWRlLm1hcmdpbkwgPSBjYWNoZS5jc3NbJ21hcmdpbi1sZWZ0J107XHJcblx0XHRcdFx0fSk7XHJcbiAgICAgIH1cclxuICAgIH0sIHtcclxuICAgICAgZmlsdGVyOiBbICdpdGVtcycsICdzZXR0aW5ncycgXSxcclxuICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgY2xvbmVzOiBhbnlbXSA9IFtdLFxyXG4gICAgICAgICAgaXRlbXM6IENhcm91c2VsU2xpZGVEaXJlY3RpdmVbXSA9IHRoaXMuX2l0ZW1zLFxyXG4gICAgICAgICAgc2V0dGluZ3M6IGFueSA9IHRoaXMuc2V0dGluZ3MsXHJcbiAgICAgICAgICAvLyBUT0RPOiBTaG91bGQgYmUgY29tcHV0ZWQgZnJvbSBudW1iZXIgb2YgbWluIHdpZHRoIGl0ZW1zIGluIHN0YWdlXHJcbiAgICAgICAgICB2aWV3ID0gTWF0aC5tYXgoc2V0dGluZ3MuaXRlbXMgKiAyLCA0KSxcclxuICAgICAgICAgIHNpemUgPSBNYXRoLmNlaWwoaXRlbXMubGVuZ3RoIC8gMikgKiAyO1xyXG5cdFx0XHRcdGxldCAgYXBwZW5kOiBhbnlbXSA9IFtdLFxyXG4gICAgICAgICAgcHJlcGVuZDogYW55W10gPSBbXSxcclxuXHRcdFx0XHRcdHJlcGVhdCA9IHNldHRpbmdzLmxvb3AgJiYgaXRlbXMubGVuZ3RoID8gc2V0dGluZ3MucmV3aW5kID8gdmlldyA6IE1hdGgubWF4KHZpZXcsIHNpemUpIDogMDtcclxuXHJcbiAgICAgICAgcmVwZWF0IC89IDI7XHJcblxyXG4gICAgICAgIHdoaWxlIChyZXBlYXQtLSkge1xyXG4gICAgICAgICAgLy8gU3dpdGNoIHRvIG9ubHkgdXNpbmcgYXBwZW5kZWQgY2xvbmVzXHJcbiAgICAgICAgICBjbG9uZXMucHVzaCh0aGlzLm5vcm1hbGl6ZShjbG9uZXMubGVuZ3RoIC8gMiwgdHJ1ZSkpO1xyXG4gICAgICAgICAgYXBwZW5kLnB1c2goeyAuLi50aGlzLnNsaWRlc0RhdGFbY2xvbmVzW2Nsb25lcy5sZW5ndGggLSAxXV19KTtcclxuXHRcdFx0XHRcdGNsb25lcy5wdXNoKHRoaXMubm9ybWFsaXplKGl0ZW1zLmxlbmd0aCAtIDEgLSAoY2xvbmVzLmxlbmd0aCAtIDEpIC8gMiwgdHJ1ZSkpO1xyXG5cdFx0XHRcdFx0cHJlcGVuZC51bnNoaWZ0KHsgLi4udGhpcy5zbGlkZXNEYXRhW2Nsb25lc1tjbG9uZXMubGVuZ3RoIC0gMV1dfSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHRcdFx0XHR0aGlzLl9jbG9uZXMgPSBjbG9uZXM7XHJcblxyXG5cdFx0XHRcdGFwcGVuZCA9IGFwcGVuZC5tYXAoc2xpZGUgPT4ge1xyXG5cdFx0XHRcdFx0c2xpZGUuaWQgPSBgY2xvbmVkLSR7c2xpZGUuaWR9YDtcclxuXHRcdFx0XHRcdHNsaWRlLmFjdGl2ZSA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0c2xpZGUuY2xvbmVkID0gdHJ1ZTtcclxuXHRcdFx0XHRcdHJldHVybiBzbGlkZTtcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0cHJlcGVuZCA9IHByZXBlbmQubWFwKHNsaWRlID0+IHtcclxuXHRcdFx0XHRcdHNsaWRlLmlkID0gYGNsb25lZC0ke3NsaWRlLmlkfWA7XHJcblx0XHRcdFx0XHRzbGlkZS5hY3RpdmUgPSBmYWxzZTtcclxuXHRcdFx0XHRcdHNsaWRlLmNsb25lZCA9IHRydWU7XHJcblx0XHRcdFx0XHRyZXR1cm4gc2xpZGU7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdHRoaXMuc2xpZGVzRGF0YSA9IHByZXBlbmQuY29uY2F0KHRoaXMuc2xpZGVzRGF0YSkuY29uY2F0KGFwcGVuZCk7XHJcbiAgICAgIH1cclxuICAgIH0sIHtcclxuICAgICAgZmlsdGVyOiBbICd3aWR0aCcsICdpdGVtcycsICdzZXR0aW5ncycgXSxcclxuICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcnRsID0gdGhpcy5zZXR0aW5ncy5ydGwgPyAxIDogLTEsXHJcbiAgICAgICAgICBzaXplID0gdGhpcy5fY2xvbmVzLmxlbmd0aCArIHRoaXMuX2l0ZW1zLmxlbmd0aCxcclxuICAgICAgICAgIGNvb3JkaW5hdGVzID0gW107XHJcbiAgICAgICAgbGV0IGl0ZXJhdG9yID0gLTEsXHJcbiAgICAgICAgICBwcmV2aW91cyA9IDAsXHJcbiAgICAgICAgICBjdXJyZW50ID0gMDtcclxuXHJcbiAgICAgICAgd2hpbGUgKCsraXRlcmF0b3IgPCBzaXplKSB7XHJcbiAgICAgICAgICBwcmV2aW91cyA9IGNvb3JkaW5hdGVzW2l0ZXJhdG9yIC0gMV0gfHwgMDtcclxuICAgICAgICAgIGN1cnJlbnQgPSB0aGlzLl93aWR0aHNbdGhpcy5yZWxhdGl2ZShpdGVyYXRvcildICsgdGhpcy5zZXR0aW5ncy5tYXJnaW47XHJcbiAgICAgICAgICBjb29yZGluYXRlcy5wdXNoKHByZXZpb3VzICsgY3VycmVudCAqIHJ0bCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9jb29yZGluYXRlcyA9IGNvb3JkaW5hdGVzO1xyXG4gICAgICB9XHJcbiAgICB9LCB7XHJcbiAgICAgIGZpbHRlcjogWyAnd2lkdGgnLCAnaXRlbXMnLCAnc2V0dGluZ3MnIF0sXHJcbiAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHBhZGRpbmcgPSB0aGlzLnNldHRpbmdzLnN0YWdlUGFkZGluZyxcclxuICAgICAgICAgIGNvb3JkaW5hdGVzID0gdGhpcy5fY29vcmRpbmF0ZXMsXHJcbiAgICAgICAgICBjc3MgPSB7XHJcbiAgICAgICAgICAgICd3aWR0aCc6IE1hdGguY2VpbChNYXRoLmFicyhjb29yZGluYXRlc1tjb29yZGluYXRlcy5sZW5ndGggLSAxXSkpICsgcGFkZGluZyAqIDIsXHJcbiAgICAgICAgICAgICdwYWRkaW5nLWxlZnQnOiBwYWRkaW5nIHx8ICcnLFxyXG4gICAgICAgICAgICAncGFkZGluZy1yaWdodCc6IHBhZGRpbmcgfHwgJydcclxuXHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdHRoaXMuc3RhZ2VEYXRhLndpZHRoID0gY3NzLndpZHRoOyAvLyB1c2UgdGhpcyBwcm9wZXJ0eSBpbiAqbmdJZiBkaXJlY3RpdmUgZm9yIC5vd2wtc3RhZ2UgZWxlbWVudFxyXG5cdFx0XHRcdHRoaXMuc3RhZ2VEYXRhLnBhZGRpbmdMID0gY3NzWydwYWRkaW5nLWxlZnQnXTtcclxuXHRcdFx0XHR0aGlzLnN0YWdlRGF0YS5wYWRkaW5nUiA9IGNzc1sncGFkZGluZy1yaWdodCddO1xyXG4gICAgICB9XHJcbiAgICB9LCB7XHJcbiAgICAvLyAgIGZpbHRlcjogWyAnd2lkdGgnLCAnaXRlbXMnLCAnc2V0dGluZ3MnIF0sXHJcbiAgICAvLyAgIHJ1bjogY2FjaGUgPT4ge1xyXG5cdFx0Ly8gXHRcdC8vIHRoaXMgbWV0aG9kIHNldHMgdGhlIHdpZHRoIGZvciBldmVyeSBzbGlkZSwgYnV0IEkgc2V0IGl0IGluIGRpZmZlcmVudCB3YXkgZWFybGllclxyXG5cdFx0Ly8gXHRcdGNvbnN0IGdyaWQgPSAhdGhpcy5zZXR0aW5ncy5hdXRvV2lkdGgsXHJcblx0XHQvLyBcdFx0aXRlbXMgPSB0aGlzLiRzdGFnZS5jaGlsZHJlbigpOyAvLyB1c2UgdGhpcy5zbGlkZXNEYXRhXHJcbiAgICAvLyAgICAgbGV0IGl0ZXJhdG9yID0gdGhpcy5fY29vcmRpbmF0ZXMubGVuZ3RoO1xyXG5cclxuICAgIC8vICAgICBpZiAoZ3JpZCAmJiBjYWNoZS5pdGVtcy5tZXJnZSkge1xyXG4gICAgLy8gICAgICAgd2hpbGUgKGl0ZXJhdG9yLS0pIHtcclxuICAgIC8vICAgICAgICAgY2FjaGUuY3NzLndpZHRoID0gdGhpcy5fd2lkdGhzW3RoaXMucmVsYXRpdmUoaXRlcmF0b3IpXTtcclxuICAgIC8vICAgICAgICAgaXRlbXMuZXEoaXRlcmF0b3IpLmNzcyhjYWNoZS5jc3MpO1xyXG4gICAgLy8gICAgICAgfVxyXG4gICAgLy8gICAgIH0gZWxzZSBpZiAoZ3JpZCkge1xyXG4gICAgLy8gICAgICAgY2FjaGUuY3NzLndpZHRoID0gY2FjaGUuaXRlbXMud2lkdGg7XHJcbiAgICAvLyAgICAgICBpdGVtcy5jc3MoY2FjaGUuY3NzKTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgIH1cclxuICAgIC8vIH0sIHtcclxuICAgIC8vICAgZmlsdGVyOiBbICdpdGVtcycgXSxcclxuICAgIC8vICAgcnVuOiBmdW5jdGlvbigpIHtcclxuICAgIC8vICAgICB0aGlzLl9jb29yZGluYXRlcy5sZW5ndGggPCAxICYmIHRoaXMuJHN0YWdlLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAvLyAgIH1cclxuICAgIC8vIH0sIHtcclxuICAgICAgZmlsdGVyOiBbICd3aWR0aCcsICdpdGVtcycsICdzZXR0aW5ncycgXSxcclxuICAgICAgcnVuOiBjYWNoZSA9PiB7XHJcbiAgICAgICAgbGV0IGN1cnJlbnQgPSBjYWNoZS5jdXJyZW50ID8gdGhpcy5zbGlkZXNEYXRhLmZpbmRJbmRleChzbGlkZSA9PiBzbGlkZS5pZCA9PT0gY2FjaGUuY3VycmVudCkgOiAwO1xyXG4gICAgICAgXHRjdXJyZW50ID0gTWF0aC5tYXgodGhpcy5taW5pbXVtKCksIE1hdGgubWluKHRoaXMubWF4aW11bSgpLCBjdXJyZW50KSk7XHJcbiAgICAgICAgdGhpcy5yZXNldChjdXJyZW50KTtcclxuICAgICAgfVxyXG4gICAgfSwge1xyXG4gICAgICBmaWx0ZXI6IFsgJ3Bvc2l0aW9uJyBdLFxyXG4gICAgICBydW46ICgpID0+IHtcclxuICAgICAgICB0aGlzLmFuaW1hdGUodGhpcy5jb29yZGluYXRlcyh0aGlzLl9jdXJyZW50KSk7XHJcbiAgICAgIH1cclxuICAgIH0sIHtcclxuICAgICAgZmlsdGVyOiBbICd3aWR0aCcsICdwb3NpdGlvbicsICdpdGVtcycsICdzZXR0aW5ncycgXSxcclxuICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcnRsID0gdGhpcy5zZXR0aW5ncy5ydGwgPyAxIDogLTEsXHJcblx0XHRcdFx0XHRwYWRkaW5nID0gdGhpcy5zZXR0aW5ncy5zdGFnZVBhZGRpbmcgKiAyLFxyXG5cdFx0XHRcdFx0bWF0Y2hlcyA9IFtdO1xyXG5cdFx0XHRcdGxldCBiZWdpbiwgZW5kLCBpbm5lciwgb3V0ZXIsIGksIG47XHJcblxyXG5cdFx0XHRcdGJlZ2luID0gdGhpcy5jb29yZGluYXRlcyh0aGlzLmN1cnJlbnQoKSk7XHJcblx0XHRcdFx0aWYgKHR5cGVvZiBiZWdpbiA9PT0gJ251bWJlcicgKSB7XHJcblx0XHRcdFx0XHRiZWdpbiArPSBwYWRkaW5nO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRiZWdpbiA9IDA7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRlbmQgPSBiZWdpbiArIHRoaXMud2lkdGgoKSAqIHJ0bDtcclxuXHJcblx0XHRcdFx0aWYgKHJ0bCA9PT0gLTEgJiYgdGhpcy5zZXR0aW5ncy5jZW50ZXIpIHtcclxuXHRcdFx0XHRcdGNvbnN0IHJlc3VsdCA9XHR0aGlzLl9jb29yZGluYXRlcy5maWx0ZXIoZWxlbWVudCA9PiB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLnNldHRpbmdzLml0ZW1zICUgMiA9PT0gMSA/IGVsZW1lbnQgPj0gYmVnaW4gOiBlbGVtZW50ID4gYmVnaW47XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdGJlZ2luID0gcmVzdWx0Lmxlbmd0aCA/IHJlc3VsdFtyZXN1bHQubGVuZ3RoIC0gMV0gOiBiZWdpbjtcclxuXHRcdFx0XHR9XHJcblxyXG4gICAgICAgIGZvciAoaSA9IDAsIG4gPSB0aGlzLl9jb29yZGluYXRlcy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgIGlubmVyID0gdGhpcy5zZXR0aW5ncy5ydGwgPyBNYXRoLmNlaWwodGhpcy5fY29vcmRpbmF0ZXNbaSAtIDFdIHx8IDApIDogTWF0aC5jZWlsKHRoaXMuX2Nvb3JkaW5hdGVzW2kgLSAxXSB8fCAwKTtcclxuXHRcdFx0XHRcdG91dGVyID0gTWF0aC5jZWlsKE1hdGguYWJzKHRoaXMuX2Nvb3JkaW5hdGVzW2ldKSArIHBhZGRpbmcgKiBydGwpO1xyXG5cclxuICAgICAgICAgIGlmICgodGhpcy5fb3AoaW5uZXIsICc8PScsIGJlZ2luKSAmJiAodGhpcy5fb3AoaW5uZXIsICc+JywgZW5kKSkpXHJcbiAgICAgICAgICAgIHx8ICh0aGlzLl9vcChvdXRlciwgJzwnLCBiZWdpbikgJiYgdGhpcy5fb3Aob3V0ZXIsICc+JywgZW5kKSkpIHtcclxuICAgICAgICAgICAgbWF0Y2hlcy5wdXNoKGkpO1xyXG4gICAgICAgICAgfVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dGhpcy5zbGlkZXNEYXRhLmZvckVhY2goc2xpZGUgPT4ge1xyXG5cdFx0XHRcdFx0c2xpZGUuYWN0aXZlID0gZmFsc2U7XHJcblx0XHRcdFx0XHRyZXR1cm4gc2xpZGU7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0bWF0Y2hlcy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy5zbGlkZXNEYXRhW2l0ZW1dLmFjdGl2ZSA9IHRydWU7XHJcblx0XHRcdFx0fSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmNlbnRlcikge1xyXG5cdFx0XHRcdFx0dGhpcy5zbGlkZXNEYXRhLmZvckVhY2goc2xpZGUgPT4ge1xyXG5cdFx0XHRcdFx0XHRzbGlkZS5jZW50ZXIgPSBmYWxzZTtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHNsaWRlO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR0aGlzLnNsaWRlc0RhdGFbdGhpcy5jdXJyZW50KCldLmNlbnRlciA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgXTtcclxuXHJcblx0Y29uc3RydWN0b3IoKSB7IH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgX3ZpZXdTZXR0aW5nc1NoaXBwZXIkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcclxuXHQgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIF92aWV3U2V0dGluZ3NTaGlwcGVyJCBTdWJqZWN0XHJcblx0ICovXHJcblx0Z2V0Vmlld0N1clNldHRpbmdzKCk6IE9ic2VydmFibGU8Q2Fyb3VzZWxDdXJyZW50RGF0YT4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3ZpZXdTZXR0aW5nc1NoaXBwZXIkLmFzT2JzZXJ2YWJsZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgX2luaXRpYWxpemVkQ2Fyb3VzZWwkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcclxuXHQgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIF9pbml0aWFsaXplZENhcm91c2VsJCBTdWJqZWN0XHJcblx0ICovXHJcblx0Z2V0SW5pdGlhbGl6ZWRTdGF0ZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2luaXRpYWxpemVkQ2Fyb3VzZWwkLmFzT2JzZXJ2YWJsZSgpXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBfY2hhbmdlU2V0dGluZ3NDYXJvdXNlbCQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxyXG5cdCAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX2NoYW5nZVNldHRpbmdzQ2Fyb3VzZWwkIFN1YmplY3RcclxuXHQgKi9cclxuXHRnZXRDaGFuZ2VTdGF0ZSgpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2NoYW5nZVNldHRpbmdzQ2Fyb3VzZWwkLmFzT2JzZXJ2YWJsZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgX2NoYW5nZWRTZXR0aW5nc0Nhcm91c2VsJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXHJcblx0ICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfY2hhbmdlZFNldHRpbmdzQ2Fyb3VzZWwkIFN1YmplY3RcclxuXHQgKi9cclxuXHRnZXRDaGFuZ2VkU3RhdGUoKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuXHRcdHJldHVybiB0aGlzLl9jaGFuZ2VkU2V0dGluZ3NDYXJvdXNlbCQuYXNPYnNlcnZhYmxlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBfdHJhbnNsYXRlZENhcm91c2VsJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXHJcblx0ICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfdHJhbnNsYXRlZENhcm91c2VsJCBTdWJqZWN0XHJcblx0ICovXHJcblx0Z2V0VHJhbnNsYXRlZFN0YXRlKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XHJcblx0XHRyZXR1cm4gdGhpcy5fdHJhbnNsYXRlZENhcm91c2VsJC5hc09ic2VydmFibGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIF9yZXNpemVDYXJvdXNlbCQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxyXG5cdCAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX3Jlc2l6ZUNhcm91c2VsJCBTdWJqZWN0XHJcblx0ICovXHJcblx0Z2V0UmVzaXplU3RhdGUoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcclxuXHRcdHJldHVybiB0aGlzLl9yZXNpemVDYXJvdXNlbCQuYXNPYnNlcnZhYmxlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBfcmVzaXplZENhcm91c2VsJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXHJcblx0ICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfcmVzaXplZENhcm91c2VsJCBTdWJqZWN0XHJcblx0ICovXHJcblx0Z2V0UmVzaXplZFN0YXRlKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XHJcblx0XHRyZXR1cm4gdGhpcy5fcmVzaXplZENhcm91c2VsJC5hc09ic2VydmFibGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIF9yZWZyZXNoQ2Fyb3VzZWwkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcclxuXHQgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIF9yZWZyZXNoQ2Fyb3VzZWwkIFN1YmplY3RcclxuXHQgKi9cclxuXHRnZXRSZWZyZXNoU3RhdGUoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcclxuXHRcdHJldHVybiB0aGlzLl9yZWZyZXNoQ2Fyb3VzZWwkLmFzT2JzZXJ2YWJsZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgX3JlZnJlc2hlZENhcm91c2VsJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXHJcblx0ICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfcmVmcmVzaGVkQ2Fyb3VzZWwkIFN1YmplY3RcclxuXHQgKi9cclxuXHRnZXRSZWZyZXNoZWRTdGF0ZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3JlZnJlc2hlZENhcm91c2VsJC5hc09ic2VydmFibGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHVwcyBjdXN0b20gb3B0aW9ucyBleHBhbmRpbmcgZGVmYXVsdCBvcHRpb25zXHJcblx0ICogQHBhcmFtIG9wdGlvbnMgY3VzdG9tIG9wdGlvbnNcclxuXHQgKi9cclxuXHRzZXRPcHRpb25zKG9wdGlvbnM6IE93bE9wdGlvbnMpIHtcclxuXHRcdGNvbnN0IGNvbmZpZ09wdGlvbnM6IE93bE9wdGlvbnMgPSBuZXcgT3dsQ2Fyb3VzZWxPQ29uZmlnKCk7XHJcblx0XHRjb25zdCBjaGVja2VkT3B0aW9uczogT3dsT3B0aW9ucyA9IHRoaXMuX3ZhbGlkYXRlT3B0aW9ucyhvcHRpb25zLCBjb25maWdPcHRpb25zKTtcclxuXHRcdHRoaXMuX29wdGlvbnMgPSB7IC4uLmNvbmZpZ09wdGlvbnMsIC4uLmNoZWNrZWRPcHRpb25zfTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyB3aGV0aGVyIHVzZXIncyBvcHRpb24gYXJlIHNldCBwcm9wZXJseS4gQ2hla2luZyBpcyBiYXNlZCBvbiB0eXBpbmdzO1xyXG5cdCAqIEBwYXJhbSBvcHRpb25zIG9wdGlvbnMgc2V0IGJ5IHVzZXJcclxuXHQgKiBAcGFyYW0gY29uZmlnT3B0aW9ucyBkZWZhdWx0IG9wdGlvbnNcclxuXHQgKiBAcmV0dXJucyBjaGVja2VkIGFuZCBtb2RpZmllZCAoaWYgaXQncyBuZWVkZWQpIHVzZXIncyBvcHRpb25zXHJcblx0ICpcclxuXHQgKiBOb3RlczpcclxuXHQgKiBcdC0gaWYgdXNlciBzZXQgb3B0aW9uIHdpdGggd3JvbmcgdHlwZSwgaXQnbGwgYmUgd3JpdHRlbiBpbiBjb25zb2xlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBfdmFsaWRhdGVPcHRpb25zKG9wdGlvbnM6IE93bE9wdGlvbnMsIGNvbmZpZ09wdGlvbnM6IE93bE9wdGlvbnMpOiBPd2xPcHRpb25zIHtcclxuXHRcdGNvbnN0IGNoZWNrZWRPcHRpb25zOiBPd2xPcHRpb25zID0geyAuLi5vcHRpb25zfTtcclxuXHRcdGNvbnN0IG1vY2tlZFR5cGVzID0gbmV3IE93bE9wdGlvbnNNb2NrZWRUeXBlcygpO1xyXG5cclxuXHRcdGZvciAoY29uc3Qga2V5IGluIGNoZWNrZWRPcHRpb25zKSB7XHJcblx0XHRcdGlmIChjaGVja2VkT3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcblxyXG5cdFx0XHRcdC8vIGNvbmRpdGlvbiBjb3VsZCBiZSBzaG9ydGVuZWQgYnV0IGl0IGdldHMgaGFyZGVyIGZvciB1bmRlcnN0YW5kaW5nXHJcblx0XHRcdFx0aWYgKG1vY2tlZFR5cGVzW2tleV0gPT09ICdudW1iZXInKSB7XHJcblx0XHRcdFx0XHRpZiAodGhpcy5faXNOdW1lcmljKGNoZWNrZWRPcHRpb25zW2tleV0pKSB7XHJcblx0XHRcdFx0XHRcdGNoZWNrZWRPcHRpb25zW2tleV0gPSArY2hlY2tlZE9wdGlvbnNba2V5XTtcclxuXHRcdFx0XHRcdFx0Y2hlY2tlZE9wdGlvbnNba2V5XSA9IGtleSA9PT0gJ2l0ZW1zJyA/IHRoaXMuX3ZhbGlkYXRlSXRlbXMoY2hlY2tlZE9wdGlvbnNba2V5XSkgOiBjaGVja2VkT3B0aW9uc1trZXldO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0Y2hlY2tlZE9wdGlvbnNba2V5XSA9IHNldFJpZ2h0T3B0aW9uKG1vY2tlZFR5cGVzW2tleV0sIGtleSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSBlbHNlIGlmIChtb2NrZWRUeXBlc1trZXldID09PSAnYm9vbGVhbicgJiYgdHlwZW9mIGNoZWNrZWRPcHRpb25zW2tleV0gIT09ICdib29sZWFuJykge1xyXG5cdFx0XHRcdFx0Y2hlY2tlZE9wdGlvbnNba2V5XSA9IHNldFJpZ2h0T3B0aW9uKG1vY2tlZFR5cGVzW2tleV0sIGtleSk7XHJcblx0XHRcdFx0fSBlbHNlIGlmIChtb2NrZWRUeXBlc1trZXldID09PSAnbnVtYmVyfGJvb2xlYW4nICYmICF0aGlzLl9pc051bWJlck9yQm9vbGVhbihjaGVja2VkT3B0aW9uc1trZXldKSkge1xyXG5cdFx0XHRcdFx0Y2hlY2tlZE9wdGlvbnNba2V5XSA9IHNldFJpZ2h0T3B0aW9uKG1vY2tlZFR5cGVzW2tleV0sIGtleSk7XHJcblx0XHRcdFx0fSBlbHNlIGlmIChtb2NrZWRUeXBlc1trZXldID09PSAnbnVtYmVyfHN0cmluZycgJiYgIXRoaXMuX2lzTnVtYmVyT3JTdHJpbmcoY2hlY2tlZE9wdGlvbnNba2V5XSkpIHtcclxuXHRcdFx0XHRcdGNoZWNrZWRPcHRpb25zW2tleV0gPSBzZXRSaWdodE9wdGlvbihtb2NrZWRUeXBlc1trZXldLCBrZXkpO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAobW9ja2VkVHlwZXNba2V5XSA9PT0gJ3N0cmluZ1tdJykge1xyXG5cdFx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoY2hlY2tlZE9wdGlvbnNba2V5XSkpIHtcclxuXHRcdFx0XHRcdFx0bGV0IGlzU3RyaW5nID0gZmFsc2U7XHJcblx0XHRcdFx0XHRcdGNoZWNrZWRPcHRpb25zW2tleV0uZm9yRWFjaChlbGVtZW50ID0+IHtcclxuXHRcdFx0XHRcdFx0XHRpc1N0cmluZyA9IHR5cGVvZiBlbGVtZW50ID09PSAnc3RyaW5nJyA/IHRydWUgOiBmYWxzZTtcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdGlmICghaXNTdHJpbmcpIHsgY2hlY2tlZE9wdGlvbnNba2V5XSA9IHNldFJpZ2h0T3B0aW9uKG1vY2tlZFR5cGVzW2tleV0sIGtleSkgfTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGNoZWNrZWRPcHRpb25zW2tleV0gPSBzZXRSaWdodE9wdGlvbihtb2NrZWRUeXBlc1trZXldLCBrZXkpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIHNldFJpZ2h0T3B0aW9uKHR5cGU6IHN0cmluZywga2V5OiBhbnkpOiBhbnkge1xyXG5cdFx0XHRjb25zb2xlLmxvZyhgb3B0aW9ucy4ke2tleX0gbXVzdCBiZSB0eXBlIG9mICR7dHlwZX07ICR7a2V5fT0ke29wdGlvbnNba2V5XX0gc2tpcHBlZCB0byBkZWZhdWx0czogJHtrZXl9PSR7Y29uZmlnT3B0aW9uc1trZXldfWApO1xyXG5cdFx0XHRyZXR1cm4gY29uZmlnT3B0aW9uc1trZXldO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBjaGVja2VkT3B0aW9ucztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBvcHRpb24gaXRlbXMgc2V0IGJ5IHVzZXIgYW5kIGlmIGl0IGJpZ2dlciB0aGFuIG51bWJlciBvZiBzbGlkZXMgdGhlbiByZXR1cm5zIG51bWJlciBvZiBzbGlkZXNcclxuXHQgKiBAcGFyYW0gaXRlbXMgb3B0aW9uIGl0ZW1zIHNldCBieSB1c2VyXHJcblx0ICogQHJldHVybnMgcmlnaHQgbnVtYmVyIG9mIGl0ZW1zXHJcblx0ICovXHJcblx0cHJpdmF0ZSBfdmFsaWRhdGVJdGVtcyhpdGVtczogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdGxldCByZXN1bHQ6IG51bWJlcjtcclxuXHRcdGlmIChpdGVtcyA+PSB0aGlzLl9pdGVtcy5sZW5ndGgpIHtcclxuXHRcdFx0cmVzdWx0ID0gdGhpcy5faXRlbXMubGVuZ3RoIDtcclxuXHRcdFx0Y29uc29sZS5sb2coJ29wdGlvbiBcXCdpdGVtc1xcJyBpbiB5b3VyIG9wdGlvbnMgaXMgYmlnZ2VyIHRoYW4gbnVtYmVyIG9mIHNsaWRlczsgVGhpcyBvcHRpb24gaXMgdXBkYXRlZCB0byBjdXJyZW50IG51bWJlciBvZiBzbGlkZXMgYW5kIG5hdmlnYXRpb24gZ290IGRpc2FibGVkJyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXN1bHQgPSBpdGVtcztcclxuXHRcdH1cclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXQgY3VycmVudCB3aWR0aCBvZiBjYXJvdXNlbFxyXG5cdCAqIEBwYXJhbSB3aWR0aCB3aWR0aCBvZiBjYXJvdXNlbCBXaW5kb3dcclxuXHQgKi9cclxuXHRzZXRDYXJvdXNlbFdpZHRoKHdpZHRoOiBudW1iZXIpIHtcclxuXHRcdHRoaXMuX3dpZHRoID0gd2lkdGg7XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBTZXR1cHMgdGhlIGN1cnJlbnQgc2V0dGluZ3MuXHJcblx0ICogQHRvZG8gUmVtb3ZlIHJlc3BvbnNpdmUgY2xhc3Nlcy4gV2h5IHNob3VsZCBhZGFwdGl2ZSBkZXNpZ25zIGJlIGJyb3VnaHQgaW50byBJRTg/XHJcblx0ICogQHRvZG8gU3VwcG9ydCBmb3IgbWVkaWEgcXVlcmllcyBieSB1c2luZyBgbWF0Y2hNZWRpYWAgd291bGQgYmUgbmljZS5cclxuXHQgKiBAcGFyYW0gY2Fyb3VzZWxXaWR0aCB3aWR0aCBvZiBjYXJvdXNlbFxyXG5cdCAqIEBwYXJhbSBzbGlkZXMgYXJyYXkgb2Ygc2xpZGVzXHJcblx0ICogQHBhcmFtIG9wdGlvbnMgb3B0aW9ucyBzZXQgYnkgdXNlclxyXG5cdCAqL1xyXG4gIHNldHVwKGNhcm91c2VsV2lkdGg6IG51bWJlciwgc2xpZGVzOiBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlW10sIG9wdGlvbnM6IE93bE9wdGlvbnMpIHtcclxuXHRcdHRoaXMuc2V0Q2Fyb3VzZWxXaWR0aChjYXJvdXNlbFdpZHRoKTtcclxuXHRcdHRoaXMuc2V0SXRlbXMoc2xpZGVzKTtcclxuXHRcdHRoaXMuX2RlZmluZVNsaWRlc0RhdGEoKTtcclxuXHRcdHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0geyAuLi50aGlzLl9vcHRpb25zfTtcclxuXHJcblx0XHR0aGlzLnNldFZpZXdwb3J0SXRlbXNOKCk7XHJcblxyXG5cdFx0dGhpcy5fdHJpZ2dlcignY2hhbmdlJywgeyBwcm9wZXJ0eTogeyBuYW1lOiAnc2V0dGluZ3MnLCB2YWx1ZTogdGhpcy5zZXR0aW5ncyB9IH0pO1xyXG5cdFx0dGhpcy5pbnZhbGlkYXRlKCdzZXR0aW5ncycpOyAvLyBtdXN0IGJlIGNhbGwgb2YgdGhpcyBmdW5jdGlvbjtcclxuXHRcdHRoaXMuX3RyaWdnZXIoJ2NoYW5nZWQnLCB7IHByb3BlcnR5OiB7IG5hbWU6ICdzZXR0aW5ncycsIHZhbHVlOiB0aGlzLnNldHRpbmdzIH0gfSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXQgbnVtYmVyIG9mIGl0ZW1zIGZvciBjdXJyZW50IHZpZXdwb3J0XHJcblx0ICovXHJcblx0c2V0Vmlld3BvcnRJdGVtc04oKSB7XHJcblx0XHRjb25zdCB2aWV3cG9ydCA9IHRoaXMuX3dpZHRoLFxyXG5cdFx0XHRvdmVyd3JpdGVzID0gdGhpcy5fb3B0aW9ucy5yZXNwb25zaXZlO1xyXG5cdFx0bGV0XHRtYXRjaCA9IC0xO1xyXG5cclxuXHRcdGlmICghT2JqZWN0LmtleXMob3ZlcndyaXRlcykubGVuZ3RoKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRmb3IgKGNvbnN0IGtleSBpbiBvdmVyd3JpdGVzKSB7XHJcblx0XHRcdGlmIChvdmVyd3JpdGVzLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuXHRcdFx0XHRpZiAoK2tleSA8PSB2aWV3cG9ydCAmJiAra2V5ID4gbWF0Y2gpIHtcclxuXHRcdFx0XHRcdG1hdGNoID0gTnVtYmVyKGtleSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IHsgLi4udGhpcy5zZXR0aW5ncywgaXRlbXM6IHRoaXMuX3ZhbGlkYXRlSXRlbXMob3ZlcndyaXRlc1ttYXRjaF0uaXRlbXMpfTtcclxuXHRcdC8vIGlmICh0eXBlb2YgdGhpcy5zZXR0aW5ncy5zdGFnZVBhZGRpbmcgPT09ICdmdW5jdGlvbicpIHtcclxuXHRcdC8vIFx0dGhpcy5zZXR0aW5ncy5zdGFnZVBhZGRpbmcgPSB0aGlzLnNldHRpbmdzLnN0YWdlUGFkZGluZygpO1xyXG5cdFx0Ly8gfVxyXG5cdFx0ZGVsZXRlIHRoaXMuc2V0dGluZ3MucmVzcG9uc2l2ZTtcclxuXHRcdHRoaXMub3dsRE9NRGF0YS5pc1Jlc3BvbnNpdmUgPSB0cnVlO1xyXG5cdFx0dGhpcy5fYnJlYWtwb2ludCA9IG1hdGNoO1xyXG5cclxuXHRcdHRoaXMuaW52YWxpZGF0ZSgnc2V0dGluZ3MnKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluaXRpYWxpemVzIHRoZSBjYXJvdXNlbC5cclxuXHQgKiBAcGFyYW0gc2xpZGVzIGFycmF5IG9mIENhcm91c2VsU2xpZGVEaXJlY3RpdmVcclxuXHQgKi9cclxuICBpbml0aWFsaXplKHNsaWRlczogQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZVtdKSB7XHJcblx0XHR0aGlzLmVudGVyKCdpbml0aWFsaXppbmcnKTtcclxuXHRcdC8vIHRoaXMudHJpZ2dlcignaW5pdGlhbGl6ZScpO1xyXG5cclxuXHRcdHRoaXMub3dsRE9NRGF0YS5ydGwgPSB0aGlzLnNldHRpbmdzLnJ0bDtcclxuXHJcblx0XHRzbGlkZXMuZm9yRWFjaChpdGVtID0+IHtcclxuXHRcdFx0Y29uc3QgbWVyZ2VOOiBudW1iZXIgPSB0aGlzLnNldHRpbmdzLm1lcmdlID8gaXRlbS5kYXRhTWVyZ2UgOiAxO1xyXG5cdFx0XHR0aGlzLl9tZXJnZXJzLnB1c2gobWVyZ2VOKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHRoaXMucmVzZXQodGhpcy5faXNOdW1lcmljKHRoaXMuc2V0dGluZ3Muc3RhcnRQb3NpdGlvbikgPyB0aGlzLnNldHRpbmdzLnN0YXJ0UG9zaXRpb24gOiAwKTtcclxuXHJcblx0XHR0aGlzLmludmFsaWRhdGUoJ2l0ZW1zJyk7XHJcblx0XHR0aGlzLnJlZnJlc2goKTtcclxuXHJcblx0XHR0aGlzLm93bERPTURhdGEuaXNMb2FkZWQgPSB0cnVlO1xyXG5cdFx0dGhpcy5vd2xET01EYXRhLmlzTW91c2VEcmFnYWJsZSA9IHRoaXMuc2V0dGluZ3MubW91c2VEcmFnO1xyXG5cdFx0dGhpcy5vd2xET01EYXRhLmlzVG91Y2hEcmFnYWJsZSA9IHRoaXMuc2V0dGluZ3MudG91Y2hEcmFnO1xyXG5cclxuXHRcdHRoaXMuc2VuZENoYW5nZXMoKTtcclxuXHJcblx0XHR0aGlzLmxlYXZlKCdpbml0aWFsaXppbmcnKTtcclxuXHRcdHRoaXMuX3RyaWdnZXIoJ2luaXRpYWxpemVkJyk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogU2VuZHMgYWxsIGRhdGEgbmVlZGVkIGZvciBWaWV3XHJcblx0ICovXHJcblx0c2VuZENoYW5nZXMoKSB7XHJcblx0XHR0aGlzLl92aWV3U2V0dGluZ3NTaGlwcGVyJC5uZXh0KHtcclxuXHRcdFx0b3dsRE9NRGF0YTogdGhpcy5vd2xET01EYXRhLFxyXG5cdFx0XHRzdGFnZURhdGE6IHRoaXMuc3RhZ2VEYXRhLFxyXG5cdFx0XHRzbGlkZXNEYXRhOiB0aGlzLnNsaWRlc0RhdGEsXHJcblx0XHRcdG5hdkRhdGE6IHRoaXMubmF2RGF0YSxcclxuXHRcdFx0ZG90c0RhdGE6IHRoaXMuZG90c0RhdGFcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblxyXG4gIC8qKlxyXG5cdCAqIFVwZGF0ZXMgb3B0aW9uIGxvZ2ljIGlmIG5lY2Vzc2VyeVxyXG5cdCAqL1xyXG4gIHByaXZhdGUgX29wdGlvbnNMb2dpYygpIHtcclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLmF1dG9XaWR0aCkge1xyXG5cdFx0XHR0aGlzLnNldHRpbmdzLnN0YWdlUGFkZGluZyA9IDA7XHJcblx0XHRcdHRoaXMuc2V0dGluZ3MubWVyZ2UgPSBmYWxzZTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZXMgdGhlIHZpZXdcclxuICAgKi9cclxuICB1cGRhdGUoKSB7XHJcbiAgICBsZXQgaSA9IDA7XHJcbiAgICBjb25zdCBuID0gdGhpcy5fcGlwZS5sZW5ndGgsXHJcbiAgICAgIGZpbHRlciA9IGl0ZW0gPT4gdGhpcy5faW52YWxpZGF0ZWRbaXRlbV0sXHJcblx0XHRcdGNhY2hlID0ge307XHJcblxyXG4gICAgd2hpbGUgKGkgPCBuKSB7XHJcbiAgICAgIGNvbnN0IGZpbHRlcmVkUGlwZSA9IHRoaXMuX3BpcGVbaV0uZmlsdGVyLmZpbHRlcihmaWx0ZXIpO1xyXG4gICAgICBpZiAodGhpcy5faW52YWxpZGF0ZWQuYWxsIHx8IGZpbHRlcmVkUGlwZS5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0dGhpcy5fcGlwZVtpXS5ydW4oY2FjaGUpO1xyXG4gICAgICB9XHJcbiAgICAgIGkrKztcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNlbmRDaGFuZ2VzKCk7XHJcblxyXG4gICAgdGhpcy5faW52YWxpZGF0ZWQgPSB7fTtcclxuXHJcbiAgICBpZiAoIXRoaXMuaXMoJ3ZhbGlkJykpIHtcclxuICAgICAgdGhpcy5lbnRlcigndmFsaWQnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEdldHMgdGhlIHdpZHRoIG9mIHRoZSB2aWV3LlxyXG5cdCAqIEBwYXJhbSBbZGltZW5zaW9uPVdpZHRoLkRlZmF1bHRdIFRoZSBkaW1lbnNpb24gdG8gcmV0dXJuXHJcblx0ICogQHJldHVybnMgVGhlIHdpZHRoIG9mIHRoZSB2aWV3IGluIHBpeGVsLlxyXG5cdCAqL1xyXG4gIHdpZHRoKGRpbWVuc2lvbj86IFdpZHRoKTogbnVtYmVyIHtcclxuXHRcdGRpbWVuc2lvbiA9IGRpbWVuc2lvbiB8fCBXaWR0aC5EZWZhdWx0O1xyXG5cdFx0c3dpdGNoIChkaW1lbnNpb24pIHtcclxuXHRcdFx0Y2FzZSBXaWR0aC5Jbm5lcjpcclxuXHRcdFx0Y2FzZSBXaWR0aC5PdXRlcjpcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5fd2lkdGg7XHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuX3dpZHRoIC0gdGhpcy5zZXR0aW5ncy5zdGFnZVBhZGRpbmcgKiAyICsgdGhpcy5zZXR0aW5ncy5tYXJnaW47XHJcblx0XHR9XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBSZWZyZXNoZXMgdGhlIGNhcm91c2VsIHByaW1hcmlseSBmb3IgYWRhcHRpdmUgcHVycG9zZXMuXHJcblx0ICovXHJcbiAgcmVmcmVzaCgpIHtcclxuXHRcdHRoaXMuZW50ZXIoJ3JlZnJlc2hpbmcnKTtcclxuXHRcdHRoaXMuX3RyaWdnZXIoJ3JlZnJlc2gnKTtcclxuXHRcdHRoaXMuX2RlZmluZVNsaWRlc0RhdGEoKTtcclxuXHRcdHRoaXMuc2V0Vmlld3BvcnRJdGVtc04oKTtcclxuXHJcblx0XHR0aGlzLl9vcHRpb25zTG9naWMoKTtcclxuXHJcblx0XHQvLyB0aGlzLiRlbGVtZW50LmFkZENsYXNzKHRoaXMub3B0aW9ucy5yZWZyZXNoQ2xhc3MpO1xyXG5cclxuXHRcdHRoaXMudXBkYXRlKCk7XHJcblxyXG5cdFx0Ly8gdGhpcy4kZWxlbWVudC5yZW1vdmVDbGFzcyh0aGlzLm9wdGlvbnMucmVmcmVzaENsYXNzKTtcclxuXHJcblx0XHR0aGlzLmxlYXZlKCdyZWZyZXNoaW5nJyk7XHJcblx0XHR0aGlzLl90cmlnZ2VyKCdyZWZyZXNoZWQnKTtcclxuXHQgfVxyXG5cclxuICAvKipcclxuXHQgKiBDaGVja3Mgd2luZG93IGByZXNpemVgIGV2ZW50LlxyXG5cdCAqIEBwYXJhbSBjdXJXaWR0aCB3aWR0aCBvZiAub3dsLWNhcm91c2VsXHJcblx0ICovXHJcbiAgb25SZXNpemUoY3VyV2lkdGg6IG51bWJlcikge1xyXG5cdFx0aWYgKCF0aGlzLl9pdGVtcy5sZW5ndGgpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0Q2Fyb3VzZWxXaWR0aChjdXJXaWR0aCk7XHJcblxyXG5cdFx0dGhpcy5lbnRlcigncmVzaXppbmcnKTtcclxuXHJcblx0XHQvLyBpZiAodGhpcy50cmlnZ2VyKCdyZXNpemUnKS5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xyXG5cdFx0Ly8gXHR0aGlzLmxlYXZlKCdyZXNpemluZycpO1xyXG5cdFx0Ly8gXHRyZXR1cm4gZmFsc2U7XHJcblx0XHQvLyB9XHJcblx0XHR0aGlzLl90cmlnZ2VyKCdyZXNpemUnKTtcclxuXHRcdHRoaXMuaW52YWxpZGF0ZSgnd2lkdGgnKTtcclxuXHJcblx0XHR0aGlzLnJlZnJlc2goKTtcclxuXHJcblx0XHR0aGlzLmxlYXZlKCdyZXNpemluZycpO1xyXG5cdFx0dGhpcy5fdHJpZ2dlcigncmVzaXplZCcpO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogUHJlcGFyZXMgZGF0YSBmb3IgZHJhZ2dpbmcgY2Fyb3VzZWwuIEl0IHN0YXJ0cyBhZnRlciBmaXJpbmcgYHRvdWNoc3RhcnRgIGFuZCBgbW91c2Vkb3duYCBldmVudHMuXHJcblx0ICogQHRvZG8gSG9yaXpvbnRhbCBzd2lwZSB0aHJlc2hvbGQgYXMgb3B0aW9uXHJcblx0ICogQHRvZG8gIzI2MVxyXG5cdCAqIEBwYXJhbSBldmVudCAtIFRoZSBldmVudCBhcmd1bWVudHMuXHJcblx0ICogQHJldHVybnMgc3RhZ2UgLSBvYmplY3Qgd2l0aCAneCcgYW5kICd5JyBjb29yZGluYXRlcyBvZiAub3dsLXN0YWdlXHJcblx0ICovXHJcbiAgcHJlcGFyZURyYWdnaW5nKGV2ZW50OiBhbnkpOiBDb29yZHMge1xyXG5cdFx0bGV0IHN0YWdlOiBDb29yZHMgPSBudWxsLFxyXG5cdFx0XHRcdHRyYW5zZm9ybUFycjogc3RyaW5nW107XHJcblxyXG5cdFx0Ly8gY291bGQgYmUgNSBjb21tZW50ZWQgbGluZXMgYmVsb3c7IEhvd2V2ZXIgdGhlcmUncyBzdGFnZSB0cmFuc2Zvcm0gaW4gc3RhZ2VEYXRhIGFuZCBpbiB1cGRhdGVzIGFmdGVyIGVhY2ggbW92ZSBvZiBzdGFnZVxyXG4gICAgLy8gc3RhZ2UgPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCkudHJhbnNmb3JtLnJlcGxhY2UoLy4qXFwofFxcKXwgL2csICcnKS5zcGxpdCgnLCcpO1xyXG4gICAgLy8gc3RhZ2UgPSB7XHJcbiAgICAvLyAgIHg6IHN0YWdlW3N0YWdlLmxlbmd0aCA9PT0gMTYgPyAxMiA6IDRdLFxyXG4gICAgLy8gICB5OiBzdGFnZVtzdGFnZS5sZW5ndGggPT09IDE2ID8gMTMgOiA1XVxyXG5cdFx0Ly8gfTtcclxuXHJcblx0XHR0cmFuc2Zvcm1BcnIgPSB0aGlzLnN0YWdlRGF0YS50cmFuc2Zvcm0ucmVwbGFjZSgvLipcXCh8XFwpfCB8W14sLVxcZF1cXHd8XFwpL2csICcnKS5zcGxpdCgnLCcpO1xyXG4gICAgc3RhZ2UgPSB7XHJcbiAgICAgIHg6ICt0cmFuc2Zvcm1BcnJbMF0sXHJcbiAgICAgIHk6ICt0cmFuc2Zvcm1BcnJbMV1cclxuICAgIH07XHJcblxyXG5cdFx0aWYgKHRoaXMuaXMoJ2FuaW1hdGluZycpKSB7XHJcblx0XHRcdHRoaXMuaW52YWxpZGF0ZSgncG9zaXRpb24nKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ21vdXNlZG93bicpIHtcclxuICAgICAgdGhpcy5vd2xET01EYXRhLmlzR3JhYiA9IHRydWU7XHJcbiAgICB9XHJcblxyXG5cdFx0dGhpcy5zcGVlZCgwKTtcclxuXHRcdHJldHVybiBzdGFnZTtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIERlZmluZXMgbmV3IGNvb3JkcyBmb3IgLm93bC1zdGFnZSB3aGlsZSBkcmFnZ2luZyBpdFxyXG5cdCAqIEB0b2RvICMyNjFcclxuXHQgKiBAcGFyYW0gZXZlbnQgdGhlIGV2ZW50IGFyZ3VtZW50cy5cclxuXHQgKiBAcGFyYW0gZHJhZ0RhdGEgaW5pdGlhbCBkYXRhIGdvdCBhZnRlciBzdGFydGluZyBkcmFnZ2luZ1xyXG5cdCAqIEByZXR1cm5zIGNvb3JkcyBvciBmYWxzZVxyXG5cdCAqL1xyXG4gIGRlZmluZU5ld0Nvb3Jkc0RyYWcoZXZlbnQ6IGFueSwgZHJhZ0RhdGE6IGFueSk6IGJvb2xlYW4gfCBDb29yZHMge1xyXG5cdFx0bGV0IG1pbmltdW0gPSBudWxsLFxyXG5cdFx0bWF4aW11bSA9IG51bGwsXHJcblx0XHRwdWxsID0gbnVsbDtcclxuXHRcdGNvbnN0XHRkZWx0YSA9IHRoaXMuZGlmZmVyZW5jZShkcmFnRGF0YS5wb2ludGVyLCB0aGlzLnBvaW50ZXIoZXZlbnQpKSxcclxuXHRcdFx0c3RhZ2UgPSB0aGlzLmRpZmZlcmVuY2UoZHJhZ0RhdGEuc3RhZ2Uuc3RhcnQsIGRlbHRhKTtcclxuXHJcblx0XHRpZiAoIXRoaXMuaXMoJ2RyYWdnaW5nJykpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLmxvb3ApIHtcclxuXHRcdFx0bWluaW11bSA9IHRoaXMuY29vcmRpbmF0ZXModGhpcy5taW5pbXVtKCkpO1xyXG5cdFx0XHRtYXhpbXVtID0gK3RoaXMuY29vcmRpbmF0ZXModGhpcy5tYXhpbXVtKCkgKyAxKSAtIG1pbmltdW07XHJcblx0XHRcdHN0YWdlLnggPSAoKChzdGFnZS54IC0gbWluaW11bSkgJSBtYXhpbXVtICsgbWF4aW11bSkgJSBtYXhpbXVtKSArIG1pbmltdW07XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRtaW5pbXVtID0gdGhpcy5zZXR0aW5ncy5ydGwgPyB0aGlzLmNvb3JkaW5hdGVzKHRoaXMubWF4aW11bSgpKSA6IHRoaXMuY29vcmRpbmF0ZXModGhpcy5taW5pbXVtKCkpO1xyXG5cdFx0XHRtYXhpbXVtID0gdGhpcy5zZXR0aW5ncy5ydGwgPyB0aGlzLmNvb3JkaW5hdGVzKHRoaXMubWluaW11bSgpKSA6IHRoaXMuY29vcmRpbmF0ZXModGhpcy5tYXhpbXVtKCkpO1xyXG5cdFx0XHRwdWxsID0gdGhpcy5zZXR0aW5ncy5wdWxsRHJhZyA/IC0xICogZGVsdGEueCAvIDUgOiAwO1xyXG5cdFx0XHRzdGFnZS54ID0gTWF0aC5tYXgoTWF0aC5taW4oc3RhZ2UueCwgbWluaW11bSArIHB1bGwpLCBtYXhpbXVtICsgcHVsbCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHN0YWdlO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogRmluaXNoZXMgZHJhZ2dpbmcgb2YgY2Fyb3VzZWwgd2hlbiBgdG91Y2hlbmRgIGFuZCBgbW91c2V1cGAgZXZlbnRzIGZpcmUuXHJcblx0ICogQHRvZG8gIzI2MVxyXG5cdCAqIEB0b2RvIFRocmVzaG9sZCBmb3IgY2xpY2sgZXZlbnRcclxuXHQgKiBAcGFyYW0gZXZlbnQgdGhlIGV2ZW50IGFyZ3VtZW50cy5cclxuXHQgKiBAcGFyYW0gZHJhZ09iaiB0aGUgb2JqZWN0IHdpdGggZHJhZ2dpbmcgc2V0dGluZ3MgYW5kIHN0YXRlc1xyXG5cdCAqIEBwYXJhbSBjbGlja0F0dGFjaGVyIGZ1bmN0aW9uIHdoaWNoIGF0dGFjaGVzIGNsaWNrIGhhbmRsZXIgdG8gc2xpZGUgb3IgaXRzIGNoaWxkcmVuIGVsZW1lbnRzIGluIG9yZGVyIHRvIHByZXZlbnQgZXZlbnQgYnVibGluZ1xyXG5cdCAqL1xyXG4gIGZpbmlzaERyYWdnaW5nKGV2ZW50OiBhbnksIGRyYWdPYmo6IGFueSwgY2xpY2tBdHRhY2hlcjogKCkgPT4gdm9pZCkge1xyXG5cdFx0Y29uc3QgZGVsdGEgPSB0aGlzLmRpZmZlcmVuY2UoZHJhZ09iai5wb2ludGVyLCB0aGlzLnBvaW50ZXIoZXZlbnQpKSxcclxuICAgICAgICBzdGFnZSA9IGRyYWdPYmouc3RhZ2UuY3VycmVudCxcclxuXHRcdFx0XHRkaXJlY3Rpb24gPSBkZWx0YS54ID4gK3RoaXMuc2V0dGluZ3MucnRsID8gJ2xlZnQnIDogJ3JpZ2h0JztcclxuXHRcdGxldCBjdXJyZW50U2xpZGVJOiBudW1iZXIsIGN1cnJlbnQ6IG51bWJlciwgbmV3Q3VycmVudDogbnVtYmVyO1xyXG5cclxuICAgICAgaWYgKGRlbHRhLnggIT09IDAgJiYgdGhpcy5pcygnZHJhZ2dpbmcnKSB8fCAhdGhpcy5pcygndmFsaWQnKSkge1xyXG4gICAgICAgIHRoaXMuc3BlZWQoK3RoaXMuc2V0dGluZ3MuZHJhZ0VuZFNwZWVkIHx8IHRoaXMuc2V0dGluZ3Muc21hcnRTcGVlZCk7XHJcblx0XHRcdFx0Y3VycmVudFNsaWRlSSA9IHRoaXMuY2xvc2VzdChzdGFnZS54LCBkZWx0YS54ICE9PSAwID8gZGlyZWN0aW9uIDogZHJhZ09iai5kaXJlY3Rpb24pO1xyXG5cdFx0XHRcdGN1cnJlbnQgPSB0aGlzLmN1cnJlbnQoKTtcclxuICAgICAgICBuZXdDdXJyZW50ID0gdGhpcy5jdXJyZW50KGN1cnJlbnRTbGlkZUkgPT09IC0xID8gdW5kZWZpbmVkIDogY3VycmVudFNsaWRlSSk7XHJcblxyXG5cdFx0XHRcdGlmIChjdXJyZW50ICE9PSBuZXdDdXJyZW50KSB7XHJcblx0XHRcdFx0XHR0aGlzLmludmFsaWRhdGUoJ3Bvc2l0aW9uJyk7XHJcblx0XHRcdFx0XHR0aGlzLnVwZGF0ZSgpO1xyXG5cdFx0XHRcdH1cclxuXHJcbiAgICAgICAgZHJhZ09iai5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XHJcblxyXG4gICAgICAgIGlmIChNYXRoLmFicyhkZWx0YS54KSA+IDMgfHwgbmV3IERhdGUoKS5nZXRUaW1lKCkgLSBkcmFnT2JqLnRpbWUgPiAzMDApIHtcclxuXHRcdFx0XHRcdGNsaWNrQXR0YWNoZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCF0aGlzLmlzKCdkcmFnZ2luZycpKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMubGVhdmUoJ2RyYWdnaW5nJyk7XHJcblx0IH1cclxuXHJcbiAgLyoqXHJcblx0ICogR2V0cyBhYnNvbHV0ZSBwb3NpdGlvbiBvZiB0aGUgY2xvc2VzdCBpdGVtIGZvciBhIGNvb3JkaW5hdGUuXHJcblx0ICogQHRvZG8gU2V0dGluZyBgZnJlZURyYWdgIG1ha2VzIGBjbG9zZXN0YCBub3QgcmV1c2FibGUuIFNlZSAjMTY1LlxyXG5cdCAqIEBwYXJhbSBjb29yZGluYXRlIFRoZSBjb29yZGluYXRlIGluIHBpeGVsLlxyXG5cdCAqIEBwYXJhbSBkaXJlY3Rpb24gVGhlIGRpcmVjdGlvbiB0byBjaGVjayBmb3IgdGhlIGNsb3Nlc3QgaXRlbS4gRXRoZXIgYGxlZnRgIG9yIGByaWdodGAuXHJcblx0ICogQHJldHVybnMgVGhlIGFic29sdXRlIHBvc2l0aW9uIG9mIHRoZSBjbG9zZXN0IGl0ZW0uXHJcblx0ICovXHJcbiAgY2xvc2VzdChjb29yZGluYXRlOiBudW1iZXIsIGRpcmVjdGlvbjogc3RyaW5nKTogbnVtYmVyIHtcclxuXHRcdGNvbnN0IHB1bGwgPSAzMCxcclxuXHRcdFx0d2lkdGggPSB0aGlzLndpZHRoKCk7XHJcblx0XHRsZXRcdGNvb3JkaW5hdGVzOiBudW1iZXJbXSA9IHRoaXMuY29vcmRpbmF0ZXMoKSBhcyBudW1iZXJbXSxcclxuXHRcdCBwb3NpdGlvbiA9IC0xO1xyXG5cclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLmNlbnRlcikge1xyXG5cdFx0XHRjb29yZGluYXRlcyA9IGNvb3JkaW5hdGVzLm1hcChpdGVtID0+IHtcclxuXHRcdFx0XHRpZiAoaXRlbSA9PT0gMCkge1xyXG5cdFx0XHRcdFx0aXRlbSArPSAwLjAwMDAwMTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIGl0ZW07XHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gb3B0aW9uICdmcmVlRHJhZycgZG9lc24ndCBoYXZlIHJlYWxpemF0aW9uIGFuZCB1c2luZyBpdCBoZXJlIGNyZWF0ZXMgcHJvYmxlbTpcclxuXHRcdC8vIHZhcmlhYmxlICdwb3NpdGlvbicgc3RheXMgdW5jaGFuZ2VkIChpdCBlcXVhbHMgLTEgYXQgdGhlIGJlZ2dpbmcpIGFuZCB0aHVzIG1ldGhvZCByZXR1cm5zIC0xXHJcblx0XHQvLyBSZXR1cm5pbmcgdmFsdWUgaXMgY29uc3VtZWQgYnkgbWV0aG9kIGN1cnJlbnQoKSwgd2hpY2ggdGFraW5nIC0xIGFzIGFyZ3VtZW50IGNhbGN1bGF0ZXMgdGhlIGluZGV4IG9mIG5ldyBjdXJyZW50IHNsaWRlXHJcblx0XHQvLyBJbiBjYXNlIG9mIGhhdmluZyA1IHNsaWRlcyBhbnMgJ2xvb3A9ZmFsc2U7IGNhbGxpbmcgJ2N1cnJlbnQoLTEpJyBzZXRzIHByb3BzICdfY3VycmVudCcgYXMgNC4gSnVzdCBsYXN0IHNsaWRlIHJlbWFpbnMgdmlzaWJsZSBpbnN0ZWFkIG9mIDMgbGFzdCBzbGlkZXMuXHJcblxyXG5cdFx0Ly8gaWYgKCF0aGlzLnNldHRpbmdzLmZyZWVEcmFnKSB7XHJcblx0XHRcdC8vIGNoZWNrIGNsb3Nlc3QgaXRlbVxyXG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGNvb3JkaW5hdGVzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG5cdFx0XHRcdGlmIChkaXJlY3Rpb24gPT09ICdsZWZ0JyAmJiBjb29yZGluYXRlID4gY29vcmRpbmF0ZXNbaV0gLSBwdWxsICYmIGNvb3JkaW5hdGUgPCBjb29yZGluYXRlc1tpXSArIHB1bGwpIHtcclxuXHRcdFx0XHRcdHBvc2l0aW9uID0gaTtcclxuXHRcdFx0XHQvLyBvbiBhIHJpZ2h0IHB1bGwsIGNoZWNrIG9uIHByZXZpb3VzIGluZGV4XHJcblx0XHRcdFx0Ly8gdG8gZG8gc28sIHN1YnRyYWN0IHdpZHRoIGZyb20gdmFsdWUgYW5kIHNldCBwb3NpdGlvbiA9IGluZGV4ICsgMVxyXG5cdFx0XHRcdH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSAncmlnaHQnICYmIGNvb3JkaW5hdGUgPiBjb29yZGluYXRlc1tpXSAtIHdpZHRoIC0gcHVsbCAmJiBjb29yZGluYXRlIDwgY29vcmRpbmF0ZXNbaV0gLSB3aWR0aCArIHB1bGwpIHtcclxuXHRcdFx0XHRcdHBvc2l0aW9uID0gaSArIDE7XHJcblx0XHRcdFx0fSBlbHNlIGlmICh0aGlzLl9vcChjb29yZGluYXRlLCAnPCcsIGNvb3JkaW5hdGVzW2ldKVxyXG5cdFx0XHRcdFx0JiYgdGhpcy5fb3AoY29vcmRpbmF0ZSwgJz4nLCBjb29yZGluYXRlc1tpICsgMV0gfHwgY29vcmRpbmF0ZXNbaV0gLSB3aWR0aCkpIHtcclxuXHRcdFx0XHRcdHBvc2l0aW9uID0gZGlyZWN0aW9uID09PSAnbGVmdCcgPyBpICsgMSA6IGk7XHJcblx0XHRcdFx0fSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IG51bGwgJiYgY29vcmRpbmF0ZSA+IGNvb3JkaW5hdGVzW2ldIC0gcHVsbCAmJiBjb29yZGluYXRlIDwgY29vcmRpbmF0ZXNbaV0gKyBwdWxsKSB7XHJcblx0XHRcdFx0XHRwb3NpdGlvbiA9IGk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAocG9zaXRpb24gIT09IC0xKSB7IGJyZWFrIH07XHJcblx0XHRcdH1cclxuXHRcdC8vIH1cclxuXHJcblx0XHRpZiAoIXRoaXMuc2V0dGluZ3MubG9vcCkge1xyXG5cdFx0XHQvLyBub24gbG9vcCBib3VuZHJpZXNcclxuXHRcdFx0aWYgKHRoaXMuX29wKGNvb3JkaW5hdGUsICc+JywgY29vcmRpbmF0ZXNbdGhpcy5taW5pbXVtKCldKSkge1xyXG5cdFx0XHRcdHBvc2l0aW9uID0gY29vcmRpbmF0ZSA9IHRoaXMubWluaW11bSgpO1xyXG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMuX29wKGNvb3JkaW5hdGUsICc8JywgY29vcmRpbmF0ZXNbdGhpcy5tYXhpbXVtKCldKSkge1xyXG5cdFx0XHRcdHBvc2l0aW9uID0gY29vcmRpbmF0ZSA9IHRoaXMubWF4aW11bSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHBvc2l0aW9uO1xyXG5cdCB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEFuaW1hdGVzIHRoZSBzdGFnZS5cclxuXHQgKiBAdG9kbyAjMjcwXHJcblx0ICogQHBhcmFtIGNvb3JkaW5hdGUgVGhlIGNvb3JkaW5hdGUgaW4gcGl4ZWxzLlxyXG5cdCAqL1xyXG4gIGFuaW1hdGUoY29vcmRpbmF0ZTogbnVtYmVyIHwgbnVtYmVyW10pIHtcclxuXHRcdGNvbnN0IGFuaW1hdGUgPSB0aGlzLnNwZWVkKCkgPiAwO1xyXG5cclxuXHRcdGlmICh0aGlzLmlzKCdhbmltYXRpbmcnKSkge1xyXG5cdFx0XHR0aGlzLm9uVHJhbnNpdGlvbkVuZCgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChhbmltYXRlKSB7XHJcblx0XHRcdHRoaXMuZW50ZXIoJ2FuaW1hdGluZycpO1xyXG5cdFx0XHR0aGlzLl90cmlnZ2VyKCd0cmFuc2xhdGUnKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnN0YWdlRGF0YS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlM2QoJyArIGNvb3JkaW5hdGUgKyAncHgsMHB4LDBweCknO1xyXG5cdFx0dGhpcy5zdGFnZURhdGEudHJhbnNpdGlvbiA9ICh0aGlzLnNwZWVkKCkgLyAxMDAwKSArICdzJztcclxuXHJcblx0XHQvLyBhbHNvIHRoZXJlIHdhcyB0cmFuc2l0aW9uIGJ5IG1lYW5zIG9mIEpRdWVyeS5hbmltYXRlIG9yIGNzcy1jaGFuZ2luZyBwcm9wZXJ0eSBsZWZ0XHJcblx0IH1cclxuXHJcbiAgLyoqXHJcblx0ICogQ2hlY2tzIHdoZXRoZXIgdGhlIGNhcm91c2VsIGlzIGluIGEgc3BlY2lmaWMgc3RhdGUgb3Igbm90LlxyXG5cdCAqIEBwYXJhbSBzdGF0ZSBUaGUgc3RhdGUgdG8gY2hlY2suXHJcblx0ICogQHJldHVybnMgVGhlIGZsYWcgd2hpY2ggaW5kaWNhdGVzIGlmIHRoZSBjYXJvdXNlbCBpcyBidXN5LlxyXG5cdCAqL1xyXG4gIGlzKHN0YXRlOiBzdHJpbmcpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiB0aGlzLl9zdGF0ZXMuY3VycmVudFtzdGF0ZV0gJiYgdGhpcy5fc3RhdGVzLmN1cnJlbnRbc3RhdGVdID4gMDtcclxuICB9O1xyXG5cclxuICAvKipcclxuXHQgKiBTZXRzIHRoZSBhYnNvbHV0ZSBwb3NpdGlvbiBvZiB0aGUgY3VycmVudCBpdGVtLlxyXG5cdCAqIEBwYXJhbSBwb3NpdGlvbiBUaGUgbmV3IGFic29sdXRlIHBvc2l0aW9uIG9yIG5vdGhpbmcgdG8gbGVhdmUgaXQgdW5jaGFuZ2VkLlxyXG5cdCAqIEByZXR1cm5zIFRoZSBhYnNvbHV0ZSBwb3NpdGlvbiBvZiB0aGUgY3VycmVudCBpdGVtLlxyXG5cdCAqL1xyXG4gIGN1cnJlbnQocG9zaXRpb24/OiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0aWYgKHBvc2l0aW9uID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuX2N1cnJlbnQ7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuX2l0ZW1zLmxlbmd0aCA9PT0gMCkge1xyXG5cdFx0XHRyZXR1cm4gdW5kZWZpbmVkO1xyXG5cdFx0fVxyXG5cclxuXHRcdHBvc2l0aW9uID0gdGhpcy5ub3JtYWxpemUocG9zaXRpb24pO1xyXG5cclxuXHRcdGlmICh0aGlzLl9jdXJyZW50ICE9PSBwb3NpdGlvbikge1xyXG5cdFx0XHRjb25zdCBldmVudCA9IHRoaXMuX3RyaWdnZXIoJ2NoYW5nZScsIHsgcHJvcGVydHk6IHsgbmFtZTogJ3Bvc2l0aW9uJywgdmFsdWU6IHBvc2l0aW9uIH0gfSk7XHJcblxyXG5cdFx0XHQvLyBpZiAoZXZlbnQuZGF0YSAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdC8vIFx0cG9zaXRpb24gPSB0aGlzLm5vcm1hbGl6ZShldmVudC5kYXRhKTtcclxuXHRcdFx0Ly8gfVxyXG5cclxuXHRcdFx0dGhpcy5fY3VycmVudCA9IHBvc2l0aW9uO1xyXG5cclxuXHRcdFx0dGhpcy5pbnZhbGlkYXRlKCdwb3NpdGlvbicpO1xyXG5cdFx0XHR0aGlzLl90cmlnZ2VyKCdjaGFuZ2VkJywgeyBwcm9wZXJ0eTogeyBuYW1lOiAncG9zaXRpb24nLCB2YWx1ZTogdGhpcy5fY3VycmVudCB9IH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzLl9jdXJyZW50O1xyXG5cdCB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEludmFsaWRhdGVzIHRoZSBnaXZlbiBwYXJ0IG9mIHRoZSB1cGRhdGUgcm91dGluZS5cclxuXHQgKiBAcGFyYW0gcGFydCBUaGUgcGFydCB0byBpbnZhbGlkYXRlLlxyXG5cdCAqIEByZXR1cm5zIFRoZSBpbnZhbGlkYXRlZCBwYXJ0cy5cclxuXHQgKi9cclxuICBpbnZhbGlkYXRlKHBhcnQ6IHN0cmluZyk6IHN0cmluZ1tdIHtcclxuXHRcdGlmICh0eXBlb2YgcGFydCA9PT0gJ3N0cmluZycpIHtcclxuXHRcdFx0dGhpcy5faW52YWxpZGF0ZWRbcGFydF0gPSB0cnVlO1xyXG5cdFx0XHRpZih0aGlzLmlzKCd2YWxpZCcpKSB7IHRoaXMubGVhdmUoJ3ZhbGlkJyk7IH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBPYmplY3Qua2V5cyh0aGlzLl9pbnZhbGlkYXRlZCk7XHJcbiAgfTtcclxuXHJcblx0LyoqXHJcblx0ICogUmVzZXRzIHRoZSBhYnNvbHV0ZSBwb3NpdGlvbiBvZiB0aGUgY3VycmVudCBpdGVtLlxyXG5cdCAqIEBwYXJhbSBwb3NpdGlvbiB0aGUgYWJzb2x1dGUgcG9zaXRpb24gb2YgdGhlIG5ldyBpdGVtLlxyXG5cdCAqL1xyXG4gIHJlc2V0KHBvc2l0aW9uOiBudW1iZXIpIHtcclxuXHRcdHBvc2l0aW9uID0gdGhpcy5ub3JtYWxpemUocG9zaXRpb24pO1xyXG5cclxuXHRcdGlmIChwb3NpdGlvbiA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl9zcGVlZCA9IDA7XHJcblx0XHR0aGlzLl9jdXJyZW50ID0gcG9zaXRpb247XHJcblxyXG5cdFx0dGhpcy5fc3VwcHJlc3MoWyAndHJhbnNsYXRlJywgJ3RyYW5zbGF0ZWQnIF0pO1xyXG5cclxuXHRcdHRoaXMuYW5pbWF0ZSh0aGlzLmNvb3JkaW5hdGVzKHBvc2l0aW9uKSk7XHJcblxyXG5cdFx0dGhpcy5fcmVsZWFzZShbICd0cmFuc2xhdGUnLCAndHJhbnNsYXRlZCcgXSk7XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBOb3JtYWxpemVzIGFuIGFic29sdXRlIG9yIGEgcmVsYXRpdmUgcG9zaXRpb24gb2YgYW4gaXRlbS5cclxuXHQgKiBAcGFyYW0gcG9zaXRpb24gVGhlIGFic29sdXRlIG9yIHJlbGF0aXZlIHBvc2l0aW9uIHRvIG5vcm1hbGl6ZS5cclxuXHQgKiBAcGFyYW0gcmVsYXRpdmUgV2hldGhlciB0aGUgZ2l2ZW4gcG9zaXRpb24gaXMgcmVsYXRpdmUgb3Igbm90LlxyXG5cdCAqIEByZXR1cm5zIFRoZSBub3JtYWxpemVkIHBvc2l0aW9uLlxyXG5cdCAqL1xyXG4gIG5vcm1hbGl6ZShwb3NpdGlvbjogbnVtYmVyLCByZWxhdGl2ZT86IGJvb2xlYW4pOiBudW1iZXIge1xyXG5cdFx0Y29uc3QgbiA9IHRoaXMuX2l0ZW1zLmxlbmd0aCxcclxuXHRcdFx0XHRcdG0gPSByZWxhdGl2ZSA/IDAgOiB0aGlzLl9jbG9uZXMubGVuZ3RoO1xyXG5cclxuXHRcdGlmICghdGhpcy5faXNOdW1lcmljKHBvc2l0aW9uKSB8fCBuIDwgMSkge1xyXG5cdFx0XHRwb3NpdGlvbiA9IHVuZGVmaW5lZDtcclxuXHRcdH0gZWxzZSBpZiAocG9zaXRpb24gPCAwIHx8IHBvc2l0aW9uID49IG4gKyBtKSB7XHJcblx0XHRcdHBvc2l0aW9uID0gKChwb3NpdGlvbiAtIG0gLyAyKSAlIG4gKyBuKSAlIG4gKyBtIC8gMjtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcG9zaXRpb247XHJcblx0IH1cclxuXHJcbiAgLyoqXHJcblx0ICogQ29udmVydHMgYW4gYWJzb2x1dGUgcG9zaXRpb24gb2YgYW4gaXRlbSBpbnRvIGEgcmVsYXRpdmUgb25lLlxyXG5cdCAqIEBwYXJhbSBwb3NpdGlvbiBUaGUgYWJzb2x1dGUgcG9zaXRpb24gdG8gY29udmVydC5cclxuXHQgKiBAcmV0dXJucyBUaGUgY29udmVydGVkIHBvc2l0aW9uLlxyXG5cdCAqL1xyXG4gIHJlbGF0aXZlKHBvc2l0aW9uOiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0cG9zaXRpb24gLT0gdGhpcy5fY2xvbmVzLmxlbmd0aCAvIDI7XHJcblx0XHRyZXR1cm4gdGhpcy5ub3JtYWxpemUocG9zaXRpb24sIHRydWUpO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogR2V0cyB0aGUgbWF4aW11bSBwb3NpdGlvbiBmb3IgdGhlIGN1cnJlbnQgaXRlbS5cclxuXHQgKiBAcGFyYW0gcmVsYXRpdmUgV2hldGhlciB0byByZXR1cm4gYW4gYWJzb2x1dGUgcG9zaXRpb24gb3IgYSByZWxhdGl2ZSBwb3NpdGlvbi5cclxuXHQgKiBAcmV0dXJucyBudW1iZXIgb2YgbWF4aW11bSBwb3NpdGlvblxyXG5cdCAqL1xyXG4gIG1heGltdW0ocmVsYXRpdmU6IGJvb2xlYW4gPSBmYWxzZSk6IG51bWJlciB7XHJcblx0XHRjb25zdCBzZXR0aW5ncyA9IHRoaXMuc2V0dGluZ3M7XHJcblx0XHRsZXRcdG1heGltdW0gPSB0aGlzLl9jb29yZGluYXRlcy5sZW5ndGgsXHJcblx0XHRcdGl0ZXJhdG9yLFxyXG5cdFx0XHRyZWNpcHJvY2FsSXRlbXNXaWR0aCxcclxuXHRcdFx0ZWxlbWVudFdpZHRoO1xyXG5cclxuXHRcdGlmIChzZXR0aW5ncy5sb29wKSB7XHJcblx0XHRcdG1heGltdW0gPSB0aGlzLl9jbG9uZXMubGVuZ3RoIC8gMiArIHRoaXMuX2l0ZW1zLmxlbmd0aCAtIDE7XHJcblx0XHR9IGVsc2UgaWYgKHNldHRpbmdzLmF1dG9XaWR0aCB8fCBzZXR0aW5ncy5tZXJnZSkge1xyXG5cdFx0XHRpdGVyYXRvciA9IHRoaXMuX2l0ZW1zLmxlbmd0aDtcclxuXHRcdFx0cmVjaXByb2NhbEl0ZW1zV2lkdGggPSB0aGlzLnNsaWRlc0RhdGFbLS1pdGVyYXRvcl0ud2lkdGg7XHJcblx0XHRcdGVsZW1lbnRXaWR0aCA9IHRoaXMuX3dpZHRoO1xyXG5cdFx0XHR3aGlsZSAoaXRlcmF0b3ItLSkge1xyXG5cdFx0XHRcdC8vIGl0IGNvdWxkIGJlIHVzZSB0aGlzLl9pdGVtcyBpbnN0ZWFkIG9mIHRoaXMuc2xpZGVzRGF0YTtcclxuXHRcdFx0XHRyZWNpcHJvY2FsSXRlbXNXaWR0aCArPSArdGhpcy5zbGlkZXNEYXRhW2l0ZXJhdG9yXS53aWR0aCArIHRoaXMuc2V0dGluZ3MubWFyZ2luO1xyXG5cdFx0XHRcdGlmIChyZWNpcHJvY2FsSXRlbXNXaWR0aCA+IGVsZW1lbnRXaWR0aCkge1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdG1heGltdW0gPSBpdGVyYXRvciArIDE7XHJcblx0XHR9IGVsc2UgaWYgKHNldHRpbmdzLmNlbnRlcikge1xyXG5cdFx0XHRtYXhpbXVtID0gdGhpcy5faXRlbXMubGVuZ3RoIC0gMTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdG1heGltdW0gPSB0aGlzLl9pdGVtcy5sZW5ndGggLSBzZXR0aW5ncy5pdGVtcztcclxuXHRcdH1cclxuXHJcblx0XHRpZiAocmVsYXRpdmUpIHtcclxuXHRcdFx0bWF4aW11bSAtPSB0aGlzLl9jbG9uZXMubGVuZ3RoIC8gMjtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gTWF0aC5tYXgobWF4aW11bSwgMCk7XHJcblx0IH1cclxuXHJcbiAgLyoqXHJcblx0ICogR2V0cyB0aGUgbWluaW11bSBwb3NpdGlvbiBmb3IgdGhlIGN1cnJlbnQgaXRlbS5cclxuXHQgKiBAcGFyYW0gcmVsYXRpdmUgV2hldGhlciB0byByZXR1cm4gYW4gYWJzb2x1dGUgcG9zaXRpb24gb3IgYSByZWxhdGl2ZSBwb3NpdGlvbi5cclxuXHQgKiBAcmV0dXJucyBudW1iZXIgb2YgbWluaW11bSBwb3NpdGlvblxyXG5cdCAqL1xyXG4gIG1pbmltdW0ocmVsYXRpdmU6IGJvb2xlYW4gPSBmYWxzZSk6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gcmVsYXRpdmUgPyAwIDogdGhpcy5fY2xvbmVzLmxlbmd0aCAvIDI7XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBHZXRzIGFuIGl0ZW0gYXQgdGhlIHNwZWNpZmllZCByZWxhdGl2ZSBwb3NpdGlvbi5cclxuXHQgKiBAcGFyYW0gcG9zaXRpb24gVGhlIHJlbGF0aXZlIHBvc2l0aW9uIG9mIHRoZSBpdGVtLlxyXG5cdCAqIEByZXR1cm5zIFRoZSBpdGVtIGF0IHRoZSBnaXZlbiBwb3NpdGlvbiBvciBhbGwgaXRlbXMgaWYgbm8gcG9zaXRpb24gd2FzIGdpdmVuLlxyXG5cdCAqL1xyXG4gIGl0ZW1zKHBvc2l0aW9uPzogbnVtYmVyKTogQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZVtdIHtcclxuXHRcdGlmIChwb3NpdGlvbiA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLl9pdGVtcy5zbGljZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHBvc2l0aW9uID0gdGhpcy5ub3JtYWxpemUocG9zaXRpb24sIHRydWUpO1xyXG5cdFx0cmV0dXJuIFt0aGlzLl9pdGVtc1twb3NpdGlvbl1dO1xyXG5cdCB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEdldHMgYW4gaXRlbSBhdCB0aGUgc3BlY2lmaWVkIHJlbGF0aXZlIHBvc2l0aW9uLlxyXG5cdCAqIEBwYXJhbSBwb3NpdGlvbiBUaGUgcmVsYXRpdmUgcG9zaXRpb24gb2YgdGhlIGl0ZW0uXHJcblx0ICogQHJldHVybnMgVGhlIGl0ZW0gYXQgdGhlIGdpdmVuIHBvc2l0aW9uIG9yIGFsbCBpdGVtcyBpZiBubyBwb3NpdGlvbiB3YXMgZ2l2ZW4uXHJcblx0ICovXHJcbiAgbWVyZ2Vycyhwb3NpdGlvbjogbnVtYmVyKTogbnVtYmVyIHwgbnVtYmVyW10ge1xyXG5cdFx0aWYgKHBvc2l0aW9uID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuX21lcmdlcnMuc2xpY2UoKTtcclxuXHRcdH1cclxuXHJcblx0XHRwb3NpdGlvbiA9IHRoaXMubm9ybWFsaXplKHBvc2l0aW9uLCB0cnVlKTtcclxuXHRcdHJldHVybiB0aGlzLl9tZXJnZXJzW3Bvc2l0aW9uXTtcclxuXHQgfVxyXG5cclxuICAvKipcclxuXHQgKiBHZXRzIHRoZSBhYnNvbHV0ZSBwb3NpdGlvbnMgb2YgY2xvbmVzIGZvciBhbiBpdGVtLlxyXG5cdCAqIEBwYXJhbSBwb3NpdGlvbiBUaGUgcmVsYXRpdmUgcG9zaXRpb24gb2YgdGhlIGl0ZW0uXHJcblx0ICogQHJldHVybnMgVGhlIGFic29sdXRlIHBvc2l0aW9ucyBvZiBjbG9uZXMgZm9yIHRoZSBpdGVtIG9yIGFsbCBpZiBubyBwb3NpdGlvbiB3YXMgZ2l2ZW4uXHJcblx0ICovXHJcbiAgY2xvbmVzKHBvc2l0aW9uPzogbnVtYmVyKTogbnVtYmVyW10ge1xyXG5cdFx0Y29uc3Qgb2RkID0gdGhpcy5fY2xvbmVzLmxlbmd0aCAvIDIsXHJcblx0XHRcdGV2ZW4gPSBvZGQgKyB0aGlzLl9pdGVtcy5sZW5ndGgsXHJcblx0XHRcdG1hcCA9IGluZGV4ID0+IGluZGV4ICUgMiA9PT0gMCA/IGV2ZW4gKyBpbmRleCAvIDIgOiBvZGQgLSAoaW5kZXggKyAxKSAvIDI7XHJcblxyXG5cdFx0aWYgKHBvc2l0aW9uID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuX2Nsb25lcy5tYXAoKHYsIGkpID0+IG1hcChpKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX2Nsb25lcy5tYXAoKHYsIGkpID0+IHYgPT09IHBvc2l0aW9uID8gbWFwKGkpIDogbnVsbCk7XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBTZXRzIHRoZSBjdXJyZW50IGFuaW1hdGlvbiBzcGVlZC5cclxuXHQgKiBAcGFyYW0gc3BlZWQgVGhlIGFuaW1hdGlvbiBzcGVlZCBpbiBtaWxsaXNlY29uZHMgb3Igbm90aGluZyB0byBsZWF2ZSBpdCB1bmNoYW5nZWQuXHJcblx0ICogQHJldHVybnMgVGhlIGN1cnJlbnQgYW5pbWF0aW9uIHNwZWVkIGluIG1pbGxpc2Vjb25kcy5cclxuXHQgKi9cclxuICBzcGVlZChzcGVlZD86IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRpZiAoc3BlZWQgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHR0aGlzLl9zcGVlZCA9IHNwZWVkO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzLl9zcGVlZDtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEdldHMgdGhlIGNvb3JkaW5hdGUgb2YgYW4gaXRlbS5cclxuXHQgKiBAdG9kbyBUaGUgbmFtZSBvZiB0aGlzIG1ldGhvZCBpcyBtaXNzbGVhbmRpbmcuXHJcblx0ICogQHBhcmFtIHBvc2l0aW9uIFRoZSBhYnNvbHV0ZSBwb3NpdGlvbiBvZiB0aGUgaXRlbSB3aXRoaW4gYG1pbmltdW0oKWAgYW5kIGBtYXhpbXVtKClgLlxyXG5cdCAqIEByZXR1cm5zIFRoZSBjb29yZGluYXRlIG9mIHRoZSBpdGVtIGluIHBpeGVsIG9yIGFsbCBjb29yZGluYXRlcy5cclxuXHQgKi9cclxuICBjb29yZGluYXRlcyhwb3NpdGlvbj86IG51bWJlcik6IG51bWJlciB8IG51bWJlcltdIHtcclxuXHRcdGxldCBtdWx0aXBsaWVyID0gMSxcclxuXHRcdFx0bmV3UG9zaXRpb24gPSBwb3NpdGlvbiAtIDEsXHJcblx0XHRcdGNvb3JkaW5hdGUsXHJcblx0XHRcdHJlc3VsdDogbnVtYmVyW107XHJcblxyXG5cdFx0aWYgKHBvc2l0aW9uID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0cmVzdWx0ID0gdGhpcy5fY29vcmRpbmF0ZXMubWFwKChpdGVtLCBpbmRleCkgPT4ge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLmNvb3JkaW5hdGVzKGluZGV4KSBhcyBudW1iZXI7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLmNlbnRlcikge1xyXG5cdFx0XHRpZiAodGhpcy5zZXR0aW5ncy5ydGwpIHtcclxuXHRcdFx0XHRtdWx0aXBsaWVyID0gLTE7XHJcblx0XHRcdFx0bmV3UG9zaXRpb24gPSBwb3NpdGlvbiArIDE7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGNvb3JkaW5hdGUgPSB0aGlzLl9jb29yZGluYXRlc1twb3NpdGlvbl07XHJcblx0XHRcdGNvb3JkaW5hdGUgKz0gKHRoaXMud2lkdGgoKSAtIGNvb3JkaW5hdGUgKyAodGhpcy5fY29vcmRpbmF0ZXNbbmV3UG9zaXRpb25dIHx8IDApKSAvIDIgKiBtdWx0aXBsaWVyO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y29vcmRpbmF0ZSA9IHRoaXMuX2Nvb3JkaW5hdGVzW25ld1Bvc2l0aW9uXSB8fCAwO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNvb3JkaW5hdGUgPSBNYXRoLmNlaWwoY29vcmRpbmF0ZSk7XHJcblxyXG5cdFx0cmV0dXJuIGNvb3JkaW5hdGU7XHJcblx0IH1cclxuXHJcbiAgLyoqXHJcblx0ICogQ2FsY3VsYXRlcyB0aGUgc3BlZWQgZm9yIGEgdHJhbnNsYXRpb24uXHJcblx0ICogQHBhcmFtIGZyb20gVGhlIGFic29sdXRlIHBvc2l0aW9uIG9mIHRoZSBzdGFydCBpdGVtLlxyXG5cdCAqIEBwYXJhbSB0byBUaGUgYWJzb2x1dGUgcG9zaXRpb24gb2YgdGhlIHRhcmdldCBpdGVtLlxyXG5cdCAqIEBwYXJhbSBmYWN0b3IgW2ZhY3Rvcj11bmRlZmluZWRdIC0gVGhlIHRpbWUgZmFjdG9yIGluIG1pbGxpc2Vjb25kcy5cclxuXHQgKiBAcmV0dXJucyBUaGUgdGltZSBpbiBtaWxsaXNlY29uZHMgZm9yIHRoZSB0cmFuc2xhdGlvbi5cclxuXHQgKi9cclxuICBwcml2YXRlIF9kdXJhdGlvbihmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIsIGZhY3Rvcj86IG51bWJlciB8IGJvb2xlYW4pOiBudW1iZXIge1xyXG5cdFx0aWYgKGZhY3RvciA9PT0gMCkge1xyXG5cdFx0XHRyZXR1cm4gMDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgoTWF0aC5hYnModG8gLSBmcm9tKSwgMSksIDYpICogTWF0aC5hYnMoKCtmYWN0b3IgfHwgdGhpcy5zZXR0aW5ncy5zbWFydFNwZWVkKSk7XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBTbGlkZXMgdG8gdGhlIHNwZWNpZmllZCBpdGVtLlxyXG5cdCAqIEBwYXJhbSBwb3NpdGlvbiBUaGUgcG9zaXRpb24gb2YgdGhlIGl0ZW0uXHJcblx0ICogQHBhcmFtIHNwZWVkIFRoZSB0aW1lIGluIG1pbGxpc2Vjb25kcyBmb3IgdGhlIHRyYW5zaXRpb24uXHJcblx0ICovXHJcbiAgdG8ocG9zaXRpb246IG51bWJlciwgc3BlZWQ6IG51bWJlciB8IGJvb2xlYW4pIHtcclxuXHRcdGxldCBjdXJyZW50ID0gdGhpcy5jdXJyZW50KCksXHJcblx0XHRcdHJldmVydCA9IG51bGwsXHJcblx0XHRcdGRpc3RhbmNlID0gcG9zaXRpb24gLSB0aGlzLnJlbGF0aXZlKGN1cnJlbnQpLFxyXG5cdFx0XHRtYXhpbXVtID0gdGhpcy5tYXhpbXVtKCk7XHJcblx0XHRjb25zdFx0ZGlyZWN0aW9uID0gKyhkaXN0YW5jZSA+IDApIC0gKyhkaXN0YW5jZSA8IDApLFxyXG5cdFx0XHRpdGVtcyA9IHRoaXMuX2l0ZW1zLmxlbmd0aCxcclxuXHRcdFx0bWluaW11bSA9IHRoaXMubWluaW11bSgpO1xyXG5cclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLmxvb3ApIHtcclxuXHRcdFx0aWYgKCF0aGlzLnNldHRpbmdzLnJld2luZCAmJiBNYXRoLmFicyhkaXN0YW5jZSkgPiBpdGVtcyAvIDIpIHtcclxuXHRcdFx0XHRkaXN0YW5jZSArPSBkaXJlY3Rpb24gKiAtMSAqIGl0ZW1zO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRwb3NpdGlvbiA9IGN1cnJlbnQgKyBkaXN0YW5jZTtcclxuXHRcdFx0cmV2ZXJ0ID0gKChwb3NpdGlvbiAtIG1pbmltdW0pICUgaXRlbXMgKyBpdGVtcykgJSBpdGVtcyArIG1pbmltdW07XHJcblxyXG5cdFx0XHRpZiAocmV2ZXJ0ICE9PSBwb3NpdGlvbiAmJiByZXZlcnQgLSBkaXN0YW5jZSA8PSBtYXhpbXVtICYmIHJldmVydCAtIGRpc3RhbmNlID4gMCkge1xyXG5cdFx0XHRcdGN1cnJlbnQgPSByZXZlcnQgLSBkaXN0YW5jZTtcclxuXHRcdFx0XHRwb3NpdGlvbiA9IHJldmVydDtcclxuXHRcdFx0XHR0aGlzLnJlc2V0KGN1cnJlbnQpO1xyXG5cdFx0XHRcdHRoaXMuc2VuZENoYW5nZXMoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIGlmICh0aGlzLnNldHRpbmdzLnJld2luZCkge1xyXG5cdFx0XHRtYXhpbXVtICs9IDE7XHJcblx0XHRcdHBvc2l0aW9uID0gKHBvc2l0aW9uICUgbWF4aW11bSArIG1heGltdW0pICUgbWF4aW11bTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHBvc2l0aW9uID0gTWF0aC5tYXgobWluaW11bSwgTWF0aC5taW4obWF4aW11bSwgcG9zaXRpb24pKTtcclxuXHRcdH1cclxuXHJcblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0dGhpcy5zcGVlZCh0aGlzLl9kdXJhdGlvbihjdXJyZW50LCBwb3NpdGlvbiwgc3BlZWQpKTtcclxuXHRcdFx0dGhpcy5jdXJyZW50KHBvc2l0aW9uKTtcclxuXHJcblx0XHRcdHRoaXMudXBkYXRlKCk7XHJcblx0XHR9LCAwKTtcclxuXHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBTbGlkZXMgdG8gdGhlIG5leHQgaXRlbS5cclxuXHQgKiBAcGFyYW0gc3BlZWQgVGhlIHRpbWUgaW4gbWlsbGlzZWNvbmRzIGZvciB0aGUgdHJhbnNpdGlvbi5cclxuXHQgKi9cclxuICBuZXh0KHNwZWVkOiBudW1iZXIgfCBib29sZWFuKSB7XHJcblx0XHRzcGVlZCA9IHNwZWVkIHx8IGZhbHNlO1xyXG5cdFx0dGhpcy50byh0aGlzLnJlbGF0aXZlKHRoaXMuY3VycmVudCgpKSArIDEsIHNwZWVkKTtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIFNsaWRlcyB0byB0aGUgcHJldmlvdXMgaXRlbS5cclxuXHQgKiBAcGFyYW0gc3BlZWQgVGhlIHRpbWUgaW4gbWlsbGlzZWNvbmRzIGZvciB0aGUgdHJhbnNpdGlvbi5cclxuXHQgKi9cclxuICBwcmV2KHNwZWVkOiBudW1iZXIgfCBib29sZWFuKSB7XHJcblx0XHRzcGVlZCA9IHNwZWVkIHx8IGZhbHNlO1xyXG5cdFx0dGhpcy50byh0aGlzLnJlbGF0aXZlKHRoaXMuY3VycmVudCgpKSAtIDEsIHNwZWVkKTtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEhhbmRsZXMgdGhlIGVuZCBvZiBhbiBhbmltYXRpb24uXHJcblx0ICogQHBhcmFtIGV2ZW50IC0gVGhlIGV2ZW50IGFyZ3VtZW50cy5cclxuXHQgKi9cclxuICBvblRyYW5zaXRpb25FbmQoZXZlbnQ/OiBhbnkpIHtcclxuXHRcdC8vIGlmIGNzczIgYW5pbWF0aW9uIHRoZW4gZXZlbnQgb2JqZWN0IGlzIHVuZGVmaW5lZFxyXG5cdFx0aWYgKGV2ZW50ICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0Ly8gZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG5cdFx0XHQvLyAvLyBDYXRjaCBvbmx5IG93bC1zdGFnZSB0cmFuc2l0aW9uRW5kIGV2ZW50XHJcblx0XHRcdC8vIGlmICgoZXZlbnQudGFyZ2V0IHx8IGV2ZW50LnNyY0VsZW1lbnQgfHwgZXZlbnQub3JpZ2luYWxUYXJnZXQpICE9PSB0aGlzLiRzdGFnZS5nZXQoMClcdCkge1xyXG5cdFx0XHQvLyBcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0Ly8gfVxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0XHR0aGlzLmxlYXZlKCdhbmltYXRpbmcnKTtcclxuXHRcdHRoaXMuX3RyaWdnZXIoJ3RyYW5zbGF0ZWQnKTtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEdldHMgdmlld3BvcnQgd2lkdGguXHJcblx0ICogQHJldHVybnMgLSBUaGUgd2lkdGggaW4gcGl4ZWwuXHJcblx0ICovXHJcbiAgcHJpdmF0ZSBfdmlld3BvcnQoKTogbnVtYmVyIHtcclxuXHRcdGxldCB3aWR0aDtcclxuXHRcdGlmICh0aGlzLl93aWR0aCkge1xyXG5cdFx0XHR3aWR0aCA9IHRoaXMuX3dpZHRoO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y29uc29sZS53YXJuKCdDYW4gbm90IGRldGVjdCB2aWV3cG9ydCB3aWR0aC4nKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB3aWR0aDtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIFNldHMgX2l0ZW1zXHJcblx0ICogQHBhcmFtIGNvbnRlbnQgVGhlIGxpc3Qgb2Ygc2xpZGVzIHB1dCBpbnRvIENhcm91c2VsU2xpZGVEaXJlY3RpdmVzLlxyXG5cdCAqL1xyXG4gIHNldEl0ZW1zKGNvbnRlbnQ6IENhcm91c2VsU2xpZGVEaXJlY3RpdmVbXSkge1xyXG5cdFx0dGhpcy5faXRlbXMgPSBjb250ZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyBzbGlkZXNEYXRhIHVzaW5nIHRoaXMuX2l0ZW1zXHJcblx0ICovXHJcblx0cHJpdmF0ZSBfZGVmaW5lU2xpZGVzRGF0YSgpIHtcclxuXHRcdHRoaXMuc2xpZGVzRGF0YSA9IHRoaXMuX2l0ZW1zLm1hcChzbGlkZSA9PiB7XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0aWQ6IGAke3NsaWRlLmlkfWAsXHJcblx0XHRcdFx0YWN0aXZlOiBmYWxzZSxcclxuXHRcdFx0XHR0cGxSZWY6IHNsaWRlLnRwbFJlZixcclxuXHRcdFx0XHRkYXRhTWVyZ2U6IHNsaWRlLmRhdGFNZXJnZSxcclxuXHRcdFx0XHR3aWR0aDogMCxcclxuXHRcdFx0XHRjbG9uZWQ6IGZhbHNlXHJcblx0XHRcdH07XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIE9wZXJhdG9ycyB0byBjYWxjdWxhdGUgcmlnaHQtdG8tbGVmdCBhbmQgbGVmdC10by1yaWdodC5cclxuXHQgKiBAcGFyYW0gYSAtIFRoZSBsZWZ0IHNpZGUgb3BlcmFuZC5cclxuXHQgKiBAcGFyYW0gbyAtIFRoZSBvcGVyYXRvci5cclxuXHQgKiBAcGFyYW0gYiAtIFRoZSByaWdodCBzaWRlIG9wZXJhbmQuXHJcblx0ICogQHJldHVybnMgdHJ1ZS9mYWxzZSBtZWFuaW5nIHJpZ2h0LXRvLWxlZnQgb3IgbGVmdC10by1yaWdodFxyXG5cdCAqL1xyXG4gIHByaXZhdGUgX29wKGE6IG51bWJlciwgbzogc3RyaW5nLCBiOiBudW1iZXIpOiBib29sZWFuIHtcclxuXHRcdGNvbnN0IHJ0bCA9IHRoaXMuc2V0dGluZ3MucnRsO1xyXG5cdFx0c3dpdGNoIChvKSB7XHJcblx0XHRcdGNhc2UgJzwnOlxyXG5cdFx0XHRcdHJldHVybiBydGwgPyBhID4gYiA6IGEgPCBiO1xyXG5cdFx0XHRjYXNlICc+JzpcclxuXHRcdFx0XHRyZXR1cm4gcnRsID8gYSA8IGIgOiBhID4gYjtcclxuXHRcdFx0Y2FzZSAnPj0nOlxyXG5cdFx0XHRcdHJldHVybiBydGwgPyBhIDw9IGIgOiBhID49IGI7XHJcblx0XHRcdGNhc2UgJzw9JzpcclxuXHRcdFx0XHRyZXR1cm4gcnRsID8gYSA+PSBiIDogYSA8PSBiO1xyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogVHJpZ2dlcnMgYSBwdWJsaWMgZXZlbnQuXHJcblx0ICogQHRvZG8gUmVtb3ZlIGBzdGF0dXNgLCBgcmVsYXRlZFRhcmdldGAgc2hvdWxkIGJlIHVzZWQgaW5zdGVhZC5cclxuXHQgKiBAcGFyYW0gbmFtZSBUaGUgZXZlbnQgbmFtZS5cclxuXHQgKiBAcGFyYW0gZGF0YSBUaGUgZXZlbnQgZGF0YS5cclxuXHQgKiBAcGFyYW0gbmFtZXNwYWNlIFRoZSBldmVudCBuYW1lc3BhY2UuXHJcblx0ICogQHBhcmFtIHN0YXRlIFRoZSBzdGF0ZSB3aGljaCBpcyBhc3NvY2lhdGVkIHdpdGggdGhlIGV2ZW50LlxyXG5cdCAqIEBwYXJhbSBlbnRlciBJbmRpY2F0ZXMgaWYgdGhlIGNhbGwgZW50ZXJzIHRoZSBzcGVjaWZpZWQgc3RhdGUgb3Igbm90LlxyXG5cdCAqL1xyXG4gIHByaXZhdGUgX3RyaWdnZXIobmFtZTogc3RyaW5nLCBkYXRhPzogYW55LCBuYW1lc3BhY2U/OiBzdHJpbmcsIHN0YXRlPzogc3RyaW5nLCBlbnRlcj86IGJvb2xlYW4pIHtcclxuXHRcdHN3aXRjaCAobmFtZSkge1xyXG5cdFx0XHRjYXNlICdpbml0aWFsaXplZCc6XHJcblx0XHRcdFx0dGhpcy5faW5pdGlhbGl6ZWRDYXJvdXNlbCQubmV4dChuYW1lKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAndHJhbnNsYXRlZCc6XHJcblx0XHRcdFx0dGhpcy5fdHJhbnNsYXRlZENhcm91c2VsJC5uZXh0KG5hbWUpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdjaGFuZ2UnOlxyXG5cdFx0XHRcdHRoaXMuX2NoYW5nZWRTZXR0aW5nc0Nhcm91c2VsJC5uZXh0KGRhdGEpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdjaGFuZ2VkJzpcclxuXHRcdFx0XHR0aGlzLl9jaGFuZ2VkU2V0dGluZ3NDYXJvdXNlbCQubmV4dChkYXRhKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAncmVzaXplJzpcclxuXHRcdFx0XHR0aGlzLl9yZXNpemVDYXJvdXNlbCQubmV4dChuYW1lKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAncmVzaXplZCc6XHJcblx0XHRcdFx0dGhpcy5fcmVzaXplZENhcm91c2VsJC5uZXh0KG5hbWUpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdyZWZyZXNoJzpcclxuXHRcdFx0XHR0aGlzLl9yZWZyZXNoQ2Fyb3VzZWwkLm5leHQobmFtZSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ3JlZnJlc2hlZCc6XHJcblx0XHRcdFx0dGhpcy5fcmVmcmVzaGVkQ2Fyb3VzZWwkLm5leHQobmFtZSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRW50ZXJzIGEgc3RhdGUuXHJcblx0ICogQHBhcmFtIG5hbWUgLSBUaGUgc3RhdGUgbmFtZS5cclxuXHQgKi9cclxuICBlbnRlcihuYW1lOiBzdHJpbmcpIHtcclxuICAgIFsgbmFtZSBdLmNvbmNhdCh0aGlzLl9zdGF0ZXMudGFnc1tuYW1lXSB8fCBbXSkuZm9yRWFjaCgoc3RhdGVOYW1lKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLl9zdGF0ZXMuY3VycmVudFtzdGF0ZU5hbWVdID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHR0aGlzLl9zdGF0ZXMuY3VycmVudFtzdGF0ZU5hbWVdID0gMDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5fc3RhdGVzLmN1cnJlbnRbc3RhdGVOYW1lXSsrO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcblx0ICogTGVhdmVzIGEgc3RhdGUuXHJcblx0ICogQHBhcmFtIG5hbWUgLSBUaGUgc3RhdGUgbmFtZS5cclxuXHQgKi9cclxuXHRsZWF2ZShuYW1lOiBzdHJpbmcpIHtcclxuICAgIFsgbmFtZSBdLmNvbmNhdCh0aGlzLl9zdGF0ZXMudGFnc1tuYW1lXSB8fCBbXSkuZm9yRWFjaCgoc3RhdGVOYW1lKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLl9zdGF0ZXMuY3VycmVudFtzdGF0ZU5hbWVdID09PSAwIHx8ICEhdGhpcy5fc3RhdGVzLmN1cnJlbnRbc3RhdGVOYW1lXSkge1xyXG4gICAgICAgIHRoaXMuX3N0YXRlcy5jdXJyZW50W3N0YXRlTmFtZV0tLTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9O1xyXG5cclxuICAvKipcclxuXHQgKiBSZWdpc3RlcnMgYW4gZXZlbnQgb3Igc3RhdGUuXHJcblx0ICogQHBhcmFtIG9iamVjdCAtIFRoZSBldmVudCBvciBzdGF0ZSB0byByZWdpc3Rlci5cclxuXHQgKi9cclxuICByZWdpc3RlcihvYmplY3Q6IGFueSkge1xyXG5cdFx0aWYgKG9iamVjdC50eXBlID09PSBUeXBlLlN0YXRlKSB7XHJcblx0XHRcdGlmICghdGhpcy5fc3RhdGVzLnRhZ3Nbb2JqZWN0Lm5hbWVdKSB7XHJcblx0XHRcdFx0dGhpcy5fc3RhdGVzLnRhZ3Nbb2JqZWN0Lm5hbWVdID0gb2JqZWN0LnRhZ3M7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5fc3RhdGVzLnRhZ3Nbb2JqZWN0Lm5hbWVdID0gdGhpcy5fc3RhdGVzLnRhZ3Nbb2JqZWN0Lm5hbWVdLmNvbmNhdChvYmplY3QudGFncyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuX3N0YXRlcy50YWdzW29iamVjdC5uYW1lXSA9IHRoaXMuX3N0YXRlcy50YWdzW29iamVjdC5uYW1lXS5maWx0ZXIoKHRhZywgaSkgPT4ge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLl9zdGF0ZXMudGFnc1tvYmplY3QubmFtZV0uaW5kZXhPZih0YWcpID09PSBpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIFN1cHByZXNzZXMgZXZlbnRzLlxyXG5cdCAqIEBwYXJhbSBldmVudHMgVGhlIGV2ZW50cyB0byBzdXBwcmVzcy5cclxuXHQgKi9cclxuICBwcml2YXRlIF9zdXBwcmVzcyhldmVudHM6IHN0cmluZ1tdKSB7XHJcblx0XHRldmVudHMuZm9yRWFjaChldmVudCA9PiB7XHJcblx0XHRcdHRoaXMuX3N1cHJlc3NbZXZlbnRdID0gdHJ1ZTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogUmVsZWFzZXMgc3VwcHJlc3NlZCBldmVudHMuXHJcblx0ICogQHBhcmFtIGV2ZW50cyBUaGUgZXZlbnRzIHRvIHJlbGVhc2UuXHJcblx0ICovXHJcbiAgcHJpdmF0ZSBfcmVsZWFzZShldmVudHM6IHN0cmluZ1tdKSB7XHJcblx0XHRldmVudHMuZm9yRWFjaChldmVudCA9PiB7XHJcblx0XHRcdGRlbGV0ZSB0aGlzLl9zdXByZXNzW2V2ZW50XTtcclxuXHRcdH0pO1xyXG5cdCB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEdldHMgdW5pZmllZCBwb2ludGVyIGNvb3JkaW5hdGVzIGZyb20gZXZlbnQuXHJcblx0ICogQHRvZG8gIzI2MVxyXG5cdCAqIEBwYXJhbSBldmVudCBUaGUgYG1vdXNlZG93bmAgb3IgYHRvdWNoc3RhcnRgIGV2ZW50LlxyXG5cdCAqIEByZXR1cm5zIE9iamVjdCBDb29yZHMgd2hpY2ggY29udGFpbnMgYHhgIGFuZCBgeWAgY29vcmRpbmF0ZXMgb2YgY3VycmVudCBwb2ludGVyIHBvc2l0aW9uLlxyXG5cdCAqL1xyXG5cdHBvaW50ZXIoZXZlbnQ6IGFueSk6IENvb3JkcyB7XHJcblx0XHRjb25zdCByZXN1bHQgPSB7IHg6IG51bGwsIHk6IG51bGwgfTtcclxuXHJcblx0XHRldmVudCA9IGV2ZW50Lm9yaWdpbmFsRXZlbnQgfHwgZXZlbnQgfHwgd2luZG93LmV2ZW50O1xyXG5cclxuXHRcdGV2ZW50ID0gZXZlbnQudG91Y2hlcyAmJiBldmVudC50b3VjaGVzLmxlbmd0aCA/XHJcblx0XHRcdGV2ZW50LnRvdWNoZXNbMF0gOiBldmVudC5jaGFuZ2VkVG91Y2hlcyAmJiBldmVudC5jaGFuZ2VkVG91Y2hlcy5sZW5ndGggP1xyXG5cdFx0XHRcdGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdIDogZXZlbnQ7XHJcblxyXG5cdFx0aWYgKGV2ZW50LnBhZ2VYKSB7XHJcblx0XHRcdHJlc3VsdC54ID0gZXZlbnQucGFnZVg7XHJcblx0XHRcdHJlc3VsdC55ID0gZXZlbnQucGFnZVk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXN1bHQueCA9IGV2ZW50LmNsaWVudFg7XHJcblx0XHRcdHJlc3VsdC55ID0gZXZlbnQuY2xpZW50WTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdCB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIERldGVybWluZXMgaWYgdGhlIGlucHV0IGlzIGEgTnVtYmVyIG9yIHNvbWV0aGluZyB0aGF0IGNhbiBiZSBjb2VyY2VkIHRvIGEgTnVtYmVyXHJcblx0ICogQHBhcmFtIG51bWJlciBUaGUgaW5wdXQgdG8gYmUgdGVzdGVkXHJcblx0ICogQHJldHVybnMgQW4gaW5kaWNhdGlvbiBpZiB0aGUgaW5wdXQgaXMgYSBOdW1iZXIgb3IgY2FuIGJlIGNvZXJjZWQgdG8gYSBOdW1iZXJcclxuXHQgKi9cclxuICBwcml2YXRlIF9pc051bWVyaWMobnVtYmVyOiBhbnkpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiAhaXNOYU4ocGFyc2VGbG9hdChudW1iZXIpKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERldGVybWluZXMgd2hldGhlciB2YWx1ZSBpcyBudW1iZXIgb3IgYm9vbGVhbiB0eXBlXHJcblx0ICogQHBhcmFtIHZhbHVlIFRoZSBpbnB1dCB0byBiZSB0ZXN0ZWRcclxuXHQgKiBAcmV0dXJucyBBbiBpbmRpY2F0aW9uIGlmIHRoZSBpbnB1dCBpcyBhIE51bWJlciBvciBjYW4gYmUgY29lcmNlZCB0byBhIE51bWJlciwgb3IgQm9vbGVhblxyXG5cdCAqL1xyXG5cdHByaXZhdGUgX2lzTnVtYmVyT3JCb29sZWFuKHZhbHVlOiBudW1iZXIgfCBib29sZWFuKTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gdGhpcy5faXNOdW1lcmljKHZhbHVlKSB8fCB0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERldGVybWluZXMgd2hldGhlciB2YWx1ZSBpcyBudW1iZXIgb3Igc3RyaW5nIHR5cGVcclxuXHQgKiBAcGFyYW0gdmFsdWUgVGhlIGlucHV0IHRvIGJlIHRlc3RlZFxyXG5cdCAqIEByZXR1cm5zIEFuIGluZGljYXRpb24gaWYgdGhlIGlucHV0IGlzIGEgTnVtYmVyIG9yIGNhbiBiZSBjb2VyY2VkIHRvIGEgTnVtYmVyLCBvciBTdHJpbmdcclxuXHQgKi9cclxuXHRwcml2YXRlIF9pc051bWJlck9yU3RyaW5nKHZhbHVlOiBudW1iZXIgfCBzdHJpbmcpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiB0aGlzLl9pc051bWVyaWModmFsdWUpIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZyc7XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBHZXRzIHRoZSBkaWZmZXJlbmNlIG9mIHR3byB2ZWN0b3JzLlxyXG5cdCAqIEB0b2RvICMyNjFcclxuXHQgKiBAcGFyYW0gZmlyc3QgVGhlIGZpcnN0IHZlY3Rvci5cclxuXHQgKiBAcGFyYW0gc2Vjb25kLSBUaGUgc2Vjb25kIHZlY3Rvci5cclxuXHQgKiBAcmV0dXJucyBUaGUgZGlmZmVyZW5jZS5cclxuXHQgKi9cclxuICBkaWZmZXJlbmNlKGZpcnN0OiBDb29yZHMsIHNlY29uZDogQ29vcmRzKTogQ29vcmRzIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHg6IGZpcnN0LnggLSBzZWNvbmQueCxcclxuXHRcdFx0eTogZmlyc3QueSAtIHNlY29uZC55XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcbn1cclxuIl19