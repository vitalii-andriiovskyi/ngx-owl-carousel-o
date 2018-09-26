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
     * Makes _translateCarousel$ Subject become Observable
     * @return {?} Observable of _translateCarousel$ Subject
     */
    getTranslateState() {
        return this._translateCarousel$.asObservable();
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
     * Makes _dragCarousel$ Subject become Observable
     * @return {?} Observable of _dragCarousel$ Subject
     */
    getDragState() {
        return this._dragCarousel$.asObservable();
    }
    /**
     * Makes _draggedCarousel$ Subject become Observable
     * @return {?} Observable of _draggedCarousel$ Subject
     */
    getDraggedState() {
        return this._draggedCarousel$.asObservable();
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
                else if (mockedTypes[key] === 'string|boolean' && !this._isStringOrBoolean(checkedOptions[key])) {
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
        this.slidesData.forEach(slide => slide.classes = this.setCurSlideClasses(slide));
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
     * Enters into a 'dragging' state
     * @return {?}
     */
    enterDragging() {
        this.enter('dragging');
        this._trigger('drag');
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
        this._trigger('dragged');
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
        return this._clones.map((v, i) => v === position ? map(i) : null).filter(item => item);
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
        /** @type {?} */
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
     * @param {?} slide Slide of carousel
     * @return {?} object with names of css-classes which are keys and true/false values
     */
    setCurSlideClasses(slide) {
        /** @type {?} */
        const currentClasses = {
            'active': slide.isActive,
            'center': slide.isCentered,
            'cloned': slide.isCloned,
            'animated': slide.isAnimated,
            'owl-animated-in': slide.isDefAnimatedIn,
            'owl-animated-out': slide.isDefAnimatedOut
        };
        if (this.settings.animateIn) {
            currentClasses[/** @type {?} */ (this.settings.animateIn)] = slide.isCustomAnimatedIn;
        }
        if (this.settings.animateOut) {
            currentClasses[/** @type {?} */ (this.settings.animateOut)] = slide.isCustomAnimatedOut;
        }
        return currentClasses;
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
     * Determines whether value is number or string type
     * @param {?} value The input to be tested
     * @return {?} An indication if the input is a Number or can be coerced to a Number, or String
     */
    _isStringOrBoolean(value) {
        return typeof value === 'string' || typeof value === 'boolean';
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
     * Subject for notification when the carousel starts translating or moving
     * @type {?}
     */
    CarouselService.prototype._translateCarousel$;
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
     * Subject for notification when the dragging of carousel starts
     * @type {?}
     */
    CarouselService.prototype._dragCarousel$;
    /**
     * Subject for notification when the dragging of carousel is ended
     * @type {?}
     */
    CarouselService.prototype._draggedCarousel$;
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
     * Prefix for id of cloned slides
     * @type {?}
     */
    CarouselService.prototype.clonedIdPrefix;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vd2wtY2Fyb3VzZWwtby8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9jYXJvdXNlbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFLQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSTNDLE9BQU8sRUFBRSxPQUFPLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLHFCQUFxQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7Ozs7QUFROUYsTUFBTTtDQUtMOzs7Ozs7Ozs7SUFPQSxPQUFRLE9BQU87SUFDZixPQUFRLE9BQU87OztBQUNmLENBQUM7OztJQU9ELFNBQVUsU0FBUztJQUNuQixPQUFRLE9BQU87SUFDZixPQUFRLE9BQU87OztBQUNmLENBQUM7Ozs7QUFLRixNQUFNO0NBR0w7Ozs7Ozs7Ozs7QUFLRCxNQUFNO0NBTUw7Ozs7Ozs7Ozs7Ozs7QUFHRCxNQUFNO0lBMmFMOzs7O3FDQXZhZ0MsSUFBSSxPQUFPLEVBQXVCOzs7O3FDQUlsQyxJQUFJLE9BQU8sRUFBVTs7Ozt3Q0FLbEIsSUFBSSxPQUFPLEVBQU87Ozs7eUNBS2pCLElBQUksT0FBTyxFQUFPOzs7O21DQUl4QixJQUFJLE9BQU8sRUFBVTs7OztvQ0FJcEIsSUFBSSxPQUFPLEVBQVU7Ozs7Z0NBSXpCLElBQUksT0FBTyxFQUFVOzs7O2lDQUlwQixJQUFJLE9BQU8sRUFBVTs7OztpQ0FJckIsSUFBSSxPQUFPLEVBQVU7Ozs7bUNBSW5CLElBQUksT0FBTyxFQUFVOzs7OzhCQUkxQixJQUFJLE9BQU8sRUFBVTs7OztpQ0FJbEIsSUFBSSxPQUFPLEVBQVU7Ozs7d0JBS3pCO1lBQ3ZCLEtBQUssRUFBRSxDQUFDO1NBQ1I7Ozs7MEJBS3dCO1lBQ3hCLEdBQUcsRUFBRSxLQUFLO1lBQ1YsWUFBWSxFQUFFLEtBQUs7WUFDbkIsV0FBVyxFQUFFLEtB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QUcsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxHQUFHLENBQUM7b0JBRWpDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7O3dCQUN4QyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRTs0QkFDakQsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7eUJBQzFFLENBQUMsQ0FBQzt3QkFDSCxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztxQkFDMUQ7b0JBRUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO3dCQUNyRCxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDdEQsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxHQUFHLEdBQUcsQ0FBQyxDQUFDO3dCQUU3RCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FB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QkFBa0IsQ0FBQyxLQUF1QjtRQUNqRCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxPQUFPLEtBQUssS0FBSyxTQUFTLENBQUM7Ozs7Ozs7SUFRckQsaUJBQWlCLENBQUMsS0FBc0I7UUFDL0MsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDOzs7Ozs7O0lBUXBELGtCQUFrQixDQUFDLEtBQXNCO1FBQ2hELE1BQU0sQ0FBQyxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksT0FBTyxLQUFLLEtBQUssU0FBUyxDQUFDOzs7Ozs7Ozs7SUFVL0QsVUFBVSxDQUFDLEtBQWEsRUFBRSxNQUFjO1FBQ3hDLE1BQU0sQ0FBQztZQUNOLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDO1lBQ3JCLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDO1NBQ3JCLENBQUM7S0FDRjs7O1lBN21ERCxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IFN0YWdlRGF0YSB9IGZyb20gJy4uL21vZGVscy9zdGFnZS1kYXRhLm1vZGVsJztcclxuXHJcbmltcG9ydCB7IE93bERPTURhdGEgfSBmcm9tICcuLi9tb2RlbHMvb3dsRE9NLWRhdGEubW9kZWwnO1xyXG5cclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZSB9IGZyb20gJy4uL2Nhcm91c2VsL2Nhcm91c2VsLm1vZHVsZSc7XHJcbmltcG9ydCB7IFNsaWRlTW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvc2xpZGUubW9kZWwnO1xyXG5pbXBvcnQgeyBTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IE93bENhcm91c2VsT0NvbmZpZywgT3dsT3B0aW9uc01vY2tlZFR5cGVzIH0gZnJvbSAnLi4vY2Fyb3VzZWwvb3dsLWNhcm91c2VsLW8tY29uZmlnJztcclxuaW1wb3J0IHsgT3dsT3B0aW9ucyB9IGZyb20gJy4uL21vZGVscy9vd2wtb3B0aW9ucy5tb2RlbCc7XHJcblxyXG5pbXBvcnQgeyBOYXZEYXRhLCBEb3RzRGF0YSB9IGZyb20gJy4uL21vZGVscy9uYXZpZ2F0aW9uLWRhdGEubW9kZWxzJztcclxuXHJcbi8qKlxyXG4gKiBDdXJyZW50IHN0YXRlIGluZm9ybWF0aW9uIGFuZCB0aGVpciB0YWdzLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFN0YXRlcyB7XHJcbiAgY3VycmVudDoge307XHJcbiAgdGFnczoge1xyXG4gICAgW2tleTogc3RyaW5nXTogc3RyaW5nW107XHJcbiAgfTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEVudW1lcmF0aW9uIGZvciB0eXBlcy5cclxuICogQGVudW0ge1N0cmluZ31cclxuICovXHJcbmV4cG9ydCBlbnVtIFR5cGUge1xyXG5cdEV2ZW50ID0gJ2V2ZW50JyxcclxuXHRTdGF0ZSA9ICdzdGF0ZSdcclxufTtcclxuXHJcbi8qKlxyXG4gKiBFbnVtZXJhdGlvbiBmb3Igd2lkdGguXHJcbiAqIEBlbnVtIHtTdHJpbmd9XHJcbiAqL1xyXG5leHBvcnQgZW51bSBXaWR0aCB7XHJcblx0RGVmYXVsdCA9ICdkZWZhdWx0JyxcclxuXHRJbm5lciA9ICdpbm5lcicsXHJcblx0T3V0ZXIgPSAnb3V0ZXInXHJcbn07XHJcblxyXG4vKipcclxuICogTW9kZWwgZm9yIGNvb3JkcyBvZiAub3dsLXN0YWdlXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ29vcmRzIHtcclxuXHR4OiBudW1iZXI7XHJcblx0eTogbnVtYmVyO1xyXG59XHJcblxyXG4vKipcclxuICogTW9kZWwgZm9yIGFsbCBjdXJyZW50IGRhdGEgb2YgY2Fyb3VzZWxcclxuICovXHJcbmV4cG9ydCBjbGFzcyBDYXJvdXNlbEN1cnJlbnREYXRhIHtcclxuXHRvd2xET01EYXRhOiBPd2xET01EYXRhO1xyXG5cdHN0YWdlRGF0YTogU3RhZ2VEYXRhO1xyXG5cdHNsaWRlc0RhdGE6IFNsaWRlTW9kZWxbXTtcclxuXHRuYXZEYXRhOiBOYXZEYXRhO1xyXG5cdGRvdHNEYXRhOiBEb3RzRGF0YTtcclxufVxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQ2Fyb3VzZWxTZXJ2aWNlIHtcclxuXHQvKipcclxuICAgKiBTdWJqZWN0IGZvciBwYXNzaW5nIGRhdGEgbmVlZGVkIGZvciBtYW5hZ2luZyBWaWV3XHJcbiAgICovXHJcblx0cHJpdmF0ZSBfdmlld1NldHRpbmdzU2hpcHBlciQgPSBuZXcgU3ViamVjdDxDYXJvdXNlbEN1cnJlbnREYXRhPigpO1xyXG5cdC8qKlxyXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSBjYXJvdXNlbCBnb3QgaW5pdGlhbGl6ZXNcclxuICAgKi9cclxuXHRwcml2YXRlIF9pbml0aWFsaXplZENhcm91c2VsJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcclxuXHJcblx0LyoqXHJcbiAgICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uIHdoZW4gdGhlIGNhcm91c2VsJ3Mgc2V0dGluZ3Mgc3RhcnQgY2hhbmdpbmZcclxuICAgKi9cclxuXHRwcml2YXRlIF9jaGFuZ2VTZXR0aW5nc0Nhcm91c2VsJCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcclxuXHJcblx0LyoqXHJcbiAgICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uIHdoZW4gdGhlIGNhcm91c2VsJ3Mgc2V0dGluZ3MgaGF2ZSBjaGFuZ2VkXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfY2hhbmdlZFNldHRpbmdzQ2Fyb3VzZWwkID0gbmV3IFN1YmplY3Q8YW55PigpO1xyXG5cdC8qKlxyXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSBjYXJvdXNlbCBzdGFydHMgdHJhbnNsYXRpbmcgb3IgbW92aW5nXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfdHJhbnNsYXRlQ2Fyb3VzZWwkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xyXG5cdC8qKlxyXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSBjYXJvdXNlbCBzdG9wcGVkIHRyYW5zbGF0aW5nIG9yIG1vdmluZ1xyXG4gICAqL1xyXG5cdHByaXZhdGUgX3RyYW5zbGF0ZWRDYXJvdXNlbCQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XHJcblx0LyoqXHJcbiAgICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uIHdoZW4gdGhlIGNhcm91c2VsJ3MgcmVidWlsZGluZyBjYXVzZWQgYnkgJ3Jlc2l6ZScgZXZlbnQgc3RhcnRzXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfcmVzaXplQ2Fyb3VzZWwkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xyXG5cdC8qKlxyXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiAgd2hlbiB0aGUgY2Fyb3VzZWwncyByZWJ1aWxkaW5nIGNhdXNlZCBieSAncmVzaXplJyBldmVudCBpcyBlbmRlZFxyXG4gICAqL1xyXG5cdHByaXZhdGUgX3Jlc2l6ZWRDYXJvdXNlbCQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XHJcblx0LyoqXHJcbiAgICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uIHdoZW4gdGhlIHJlZnJlc2ggb2YgY2Fyb3VzZWwgc3RhcnRzXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfcmVmcmVzaENhcm91c2VsJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcclxuXHQvKipcclxuICAgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gd2hlbiB0aGUgcmVmcmVzaCBvZiBjYXJvdXNlbCBpcyBlbmRlZFxyXG4gICAqL1xyXG5cdHByaXZhdGUgX3JlZnJlc2hlZENhcm91c2VsJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcclxuXHQvKipcclxuICAgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gd2hlbiB0aGUgZHJhZ2dpbmcgb2YgY2Fyb3VzZWwgc3RhcnRzXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfZHJhZ0Nhcm91c2VsJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcclxuXHQvKipcclxuICAgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gd2hlbiB0aGUgZHJhZ2dpbmcgb2YgY2Fyb3VzZWwgaXMgZW5kZWRcclxuICAgKi9cclxuXHRwcml2YXRlIF9kcmFnZ2VkQ2Fyb3VzZWwkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xyXG5cclxuICAvKipcclxuICAgKiBDdXJyZW50IHNldHRpbmdzIGZvciB0aGUgY2Fyb3VzZWwuXHJcbiAgICovXHJcbiAgc2V0dGluZ3M6IE93bE9wdGlvbnMgPSB7XHJcblx0XHRpdGVtczogMFxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG4gICAqIEluaXRpYWwgZGF0YSBmb3Igc2V0dGluZyBjbGFzc2VzIHRvIGVsZW1lbnQgLm93bC1jYXJvdXNlbFxyXG4gICAqL1xyXG5cdG93bERPTURhdGE6IE93bERPTURhdGEgPSB7XHJcblx0XHRydGw6IGZhbHNlLFxyXG5cdFx0aXNSZXNwb25zaXZlOiBmYWxzZSxcclxuXHRcdGlzUmVmcmVzaGVkOiBmYWxzZSxcclxuXHRcdGlzTG9hZGVkOiBmYWxzZSxcclxuXHRcdGlzTG9hZGluZzogZmFsc2UsXHJcblx0XHRpc01vdXNlRHJhZ2FibGU6IGZhbHNlLFxyXG5cdFx0aXNHcmFiOiBmYWxzZSxcclxuXHRcdGlzVG91Y2hEcmFnYWJsZTogZmFsc2VcclxuXHR9O1xyXG5cclxuXHQvKipcclxuICAgKiBJbml0aWFsIGRhdGEgb2YgLm93bC1zdGFnZVxyXG4gICAqL1xyXG5cdHN0YWdlRGF0YTogU3RhZ2VEYXRhID0ge1xyXG5cdFx0dHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoMHB4LDBweCwwcHgpJyxcclxuXHRcdHRyYW5zaXRpb246ICcwcycsXHJcblx0XHR3aWR0aDogMCxcclxuXHRcdHBhZGRpbmdMOiAwLFxyXG5cdFx0cGFkZGluZ1I6IDBcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiAgRGF0YSBvZiBldmVyeSBzbGlkZVxyXG5cdCAqL1xyXG5cdHNsaWRlc0RhdGE6IFNsaWRlTW9kZWxbXTtcclxuXHJcblx0LyoqXHJcblx0ICogRGF0YSBvZiBuYXZpZ2F0aW9uIGJsb2NrXHJcblx0ICovXHJcblx0bmF2RGF0YTogTmF2RGF0YTtcclxuXHJcblx0LyoqXHJcblx0ICogRGF0YSBvZiBkb3RzIGJsb2NrXHJcblx0ICovXHJcblx0ZG90c0RhdGE6IERvdHNEYXRhO1xyXG5cclxuXHQvKipcclxuXHQgKiBDYXJvdXNlbCB3aWR0aFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgX3dpZHRoOiBudW1iZXI7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFsbCByZWFsIGl0ZW1zLlxyXG5cdCAqL1xyXG5cdHByaXZhdGUgX2l0ZW1zOiBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlW10gPSBbXTsgLy8gaXMgZXF1YWwgdG8gdGhpcy5zbGlkZXNcclxuXHJcblx0LyoqXHJcbiAgICogQXJyYXkgd2l0aCB3aWR0aCBvZiBldmVyeSBzbGlkZS5cclxuICAgKi9cclxuICBwcml2YXRlIF93aWR0aHM6IGFueVtdID0gW107XHJcblxyXG5cdC8qKlxyXG4gICAqIEN1cnJlbnRseSBzdXBwcmVzc2VkIGV2ZW50cyB0byBwcmV2ZW50IHRoZW0gZnJvbSBiZWVpbmcgcmV0cmlnZ2VyZWQuXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfc3VwcmVzczogYW55ID0ge307XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlZmVyZW5jZXMgdG8gdGhlIHJ1bm5pbmcgcGx1Z2lucyBvZiB0aGlzIGNhcm91c2VsLlxyXG4gICAqL1xyXG5cdHByaXZhdGUgX3BsdWdpbnM6IGFueSA9IHt9O1xyXG5cclxuXHQvKipcclxuICAgKiBBYnNvbHV0ZSBjdXJyZW50IHBvc2l0aW9uLlxyXG4gICAqL1xyXG5cdHByaXZhdGUgX2N1cnJlbnQ6IG51bWJlciB8IG51bGwgPSBudWxsO1xyXG5cclxuXHQvKipcclxuICAgKiBBbGwgY2xvbmVkIGl0ZW1zLlxyXG4gICAqL1xyXG5cdHByaXZhdGUgX2Nsb25lczogYW55W10gPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogTWVyZ2UgdmFsdWVzIG9mIGFsbCBpdGVtcy5cclxuICAgKiBAdG9kbyBNYXliZSB0aGlzIGNvdWxkIGJlIHBhcnQgb2YgYSBwbHVnaW4uXHJcbiAgICovXHJcblx0cmVhZG9ubHkgX21lcmdlcnM6IGFueVtdID0gW107XHJcblxyXG5cdC8qKlxyXG4gICAqIEFuaW1hdGlvbiBzcGVlZCBpbiBtaWxsaXNlY29uZHMuXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfc3BlZWQ6IG51bWJlciB8IG51bGwgPSBudWxsO1xyXG5cclxuXHQvKipcclxuICAgKiBDb29yZGluYXRlcyBvZiBhbGwgaXRlbXMgaW4gcGl4ZWwuXHJcbiAgICogQHRvZG8gVGhlIG5hbWUgb2YgdGhpcyBtZW1iZXIgaXMgbWlzc2xlYWRpbmcuXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfY29vcmRpbmF0ZXM6IG51bWJlcltdID0gW107XHJcblxyXG5cdC8qKlxyXG4gICAqIEN1cnJlbnQgYnJlYWtwb2ludC5cclxuICAgKiBAdG9kbyBSZWFsIG1lZGlhIHF1ZXJpZXMgd291bGQgYmUgbmljZS5cclxuICAgKi9cclxuXHRwcml2YXRlIF9icmVha3BvaW50OiBhbnkgPSBudWxsO1xyXG5cclxuXHQvKipcclxuXHQgKiBQcmVmaXggZm9yIGlkIG9mIGNsb25lZCBzbGlkZXNcclxuXHQgKi9cclxuXHRjbG9uZWRJZFByZWZpeCA9ICdjbG9uZWQtJztcclxuXHJcblx0LyoqXHJcblx0ICogQ3VycmVudCBvcHRpb25zIHNldCBieSB0aGUgY2FsbGVyIGluY2x1ZGluZyBkZWZhdWx0cy5cclxuXHQgKi9cclxuXHRfb3B0aW9uczogT3dsT3B0aW9ucyA9IHt9O1xyXG5cclxuICAvKipcclxuICAgKiBJbnZhbGlkYXRlZCBwYXJ0cyB3aXRoaW4gdGhlIHVwZGF0ZSBwcm9jZXNzLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2ludmFsaWRhdGVkOiBhbnkgPSB7fTtcclxuXHJcbiAgLy8gSXMgbmVlZGVkIGZvciB0ZXN0c1xyXG4gIGdldCBpbnZhbGlkYXRlZCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9pbnZhbGlkYXRlZDtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogQ3VycmVudCBzdGF0ZSBpbmZvcm1hdGlvbiBhbmQgdGhlaXIgdGFncy5cclxuICAgKi9cclxuICBwcml2YXRlIF9zdGF0ZXM6IFN0YXRlcyA9IHtcclxuICAgIGN1cnJlbnQ6IHt9LFxyXG4gICAgdGFnczoge1xyXG4gICAgICBpbml0aWFsaXppbmc6IFsnYnVzeSddLFxyXG4gICAgICBhbmltYXRpbmc6IFsnYnVzeSddLFxyXG4gICAgICBkcmFnZ2luZzogWydpbnRlcmFjdGluZyddXHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLy8gaXMgbmVlZGVkIGZvciB0ZXN0c1xyXG4gIGdldCBzdGF0ZXMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fc3RhdGVzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcbiBcdCAqIE9yZGVyZWQgbGlzdCBvZiB3b3JrZXJzIGZvciB0aGUgdXBkYXRlIHByb2Nlc3MuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfcGlwZTogYW55W10gPSBbXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgIGZpbHRlcjogWyd3aWR0aCcsICdzZXR0aW5ncyddLFxyXG4gICAgLy8gICBydW46ICgpID0+IHtcclxuICAgIC8vICAgICB0aGlzLl93aWR0aCA9IHRoaXMuY2Fyb3VzZWxXaW5kb3dXaWR0aDtcclxuICAgIC8vICAgfVxyXG4gICAgLy8gfSxcclxuICAgIHtcclxuICAgICAgZmlsdGVyOiBbJ3dpZHRoJywgJ2l0ZW1zJywgJ3NldHRpbmdzJ10sXHJcbiAgICAgIHJ1bjogY2FjaGUgPT4ge1xyXG4gICAgICAgIGNhY2hlLmN1cnJlbnQgPSB0aGlzLl9pdGVtcyAmJiB0aGlzLl9pdGVtc1t0aGlzLnJlbGF0aXZlKHRoaXMuX2N1cnJlbnQpXS5pZDtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vIHtcclxuICAgIC8vICAgZmlsdGVyOiBbJ2l0ZW1zJywgJ3NldHRpbmdzJ10sXHJcbiAgICAvLyAgIHJ1bjogZnVuY3Rpb24oKSB7XHJcbiAgICAvLyAgICAgLy8gdGhpcy4kc3RhZ2UuY2hpbGRyZW4oJy5jbG9uZWQnKS5yZW1vdmUoKTtcclxuICAgIC8vICAgfVxyXG5cdFx0Ly8gfSxcclxuXHRcdCB7XHJcbiAgICAgIGZpbHRlcjogWyAnd2lkdGgnLCAnaXRlbXMnLCAnc2V0dGluZ3MnIF0sXHJcbiAgICAgIHJ1bjogKGNhY2hlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbWFyZ2luID0gdGhpcy5zZXR0aW5ncy5tYXJnaW4gfHwgJycsXHJcbiAgICAgICAgICBncmlkID0gIXRoaXMuc2V0dGluZ3MuYXV0b1dpZHRoLFxyXG4gICAgICAgICAgcnRsID0gdGhpcy5zZXR0aW5ncy5ydGwsXHJcbiAgICAgICAgICBjc3MgPSB7XHJcbiAgICAgICAgICAgICdtYXJnaW4tbGVmdCc6IHJ0bCA/IG1hcmdpbiA6ICcnLFxyXG4gICAgICAgICAgICAnbWFyZ2luLXJpZ2h0JzogcnRsID8gJycgOiBtYXJnaW5cclxuICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmKCFncmlkKSB7XHJcblx0XHRcdFx0XHR0aGlzLnNsaWRlc0RhdGEuZm9yRWFjaChzbGlkZSA9PiB7XHJcblx0XHRcdFx0XHRcdHNsaWRlLm1hcmdpbkwgPSBjc3NbJ21hcmdpbi1sZWZ0J107XHJcblx0XHRcdFx0XHRcdHNsaWRlLm1hcmdpblIgPSBjc3NbJ21hcmdpbi1yaWdodCddO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fVxyXG5cclxuICAgICAgICBjYWNoZS5jc3MgPSBjc3M7XHJcbiAgICAgIH1cclxuICAgIH0sIHtcclxuICAgICAgZmlsdGVyOiBbICd3aWR0aCcsICdpdGVtcycsICdzZXR0aW5ncycgXSxcclxuICAgICAgcnVuOiAoY2FjaGUpID0+IHtcclxuICAgICAgICBjb25zdCB3aWR0aDogYW55ID0gKyh0aGlzLndpZHRoKCkgLyB0aGlzLnNldHRpbmdzLml0ZW1zKS50b0ZpeGVkKDMpIC0gdGhpcy5zZXR0aW5ncy5tYXJnaW4sXHJcbiAgICAgICAgICBncmlkID0gIXRoaXMuc2V0dGluZ3MuYXV0b1dpZHRoLFxyXG4gICAgICAgICAgd2lkdGhzID0gW107XHJcblx0XHRcdFx0bGV0IG1lcmdlID0gbnVsbCxcclxuXHRcdFx0XHRcdFx0aXRlcmF0b3IgPSB0aGlzLl9pdGVtcy5sZW5ndGg7XHJcblxyXG4gICAgICAgIGNhY2hlLml0ZW1zID0ge1xyXG4gICAgICAgICAgbWVyZ2U6IGZhbHNlLFxyXG4gICAgICAgICAgd2lkdGg6IHdpZHRoXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgd2hpbGUgKGl0ZXJhdG9yLS0pIHtcclxuICAgICAgICAgIG1lcmdlID0gdGhpcy5fbWVyZ2Vyc1tpdGVyYXRvcl07XHJcbiAgICAgICAgICBtZXJnZSA9IHRoaXMuc2V0dGluZ3MubWVyZ2VGaXQgJiYgTWF0aC5taW4obWVyZ2UsIHRoaXMuc2V0dGluZ3MuaXRlbXMpIHx8IG1lcmdlO1xyXG4gICAgICAgICAgY2FjaGUuaXRlbXMubWVyZ2UgPSBtZXJnZSA+IDEgfHwgY2FjaGUuaXRlbXMubWVyZ2U7XHJcblxyXG4gICAgICAgICAgd2lkdGhzW2l0ZXJhdG9yXSA9ICFncmlkID8gdGhpcy5faXRlbXNbaXRlcmF0b3JdLndpZHRoID8gdGhpcy5faXRlbXNbaXRlcmF0b3JdLndpZHRoIDogd2lkdGggOiB3aWR0aCAqIG1lcmdlO1xyXG4gICAgICAgIH1cclxuXHJcblx0XHRcdFx0dGhpcy5fd2lkdGhzID0gd2lkdGhzO1xyXG5cclxuXHRcdFx0XHR0aGlzLnNsaWRlc0RhdGEuZm9yRWFjaCgoc2xpZGUsIGkpID0+IHtcclxuXHRcdFx0XHRcdHNsaWRlLndpZHRoID0gdGhpcy5fd2lkdGhzW2ldO1xyXG5cdFx0XHRcdFx0c2xpZGUubWFyZ2luUiA9IGNhY2hlLmNzc1snbWFyZ2luLXJpZ2h0J107XHJcblx0XHRcdFx0XHRzbGlkZS5tYXJnaW5MID0gY2FjaGUuY3NzWydtYXJnaW4tbGVmdCddO1xyXG5cdFx0XHRcdH0pO1xyXG4gICAgICB9XHJcbiAgICB9LCB7XHJcbiAgICAgIGZpbHRlcjogWyAnaXRlbXMnLCAnc2V0dGluZ3MnIF0sXHJcbiAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNsb25lczogYW55W10gPSBbXSxcclxuICAgICAgICAgIGl0ZW1zOiBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlW10gPSB0aGlzLl9pdGVtcyxcclxuICAgICAgICAgIHNldHRpbmdzOiBhbnkgPSB0aGlzLnNldHRpbmdzLFxyXG4gICAgICAgICAgLy8gVE9ETzogU2hvdWxkIGJlIGNvbXB1dGVkIGZyb20gbnVtYmVyIG9mIG1pbiB3aWR0aCBpdGVtcyBpbiBzdGFnZVxyXG4gICAgICAgICAgdmlldyA9IE1hdGgubWF4KHNldHRpbmdzLml0ZW1zICogMiwgNCksXHJcbiAgICAgICAgICBzaXplID0gTWF0aC5jZWlsKGl0ZW1zLmxlbmd0aCAvIDIpICogMjtcclxuXHRcdFx0XHRsZXQgIGFwcGVuZDogYW55W10gPSBbXSxcclxuICAgICAgICAgIHByZXBlbmQ6IGFueVtdID0gW10sXHJcblx0XHRcdFx0XHRyZXBlYXQgPSBzZXR0aW5ncy5sb29wICYmIGl0ZW1zLmxlbmd0aCA/IHNldHRpbmdzLnJld2luZCA/IHZpZXcgOiBNYXRoLm1heCh2aWV3LCBzaXplKSA6IDA7XHJcblxyXG4gICAgICAgIHJlcGVhdCAvPSAyO1xyXG5cclxuICAgICAgICB3aGlsZSAocmVwZWF0LS0pIHtcclxuICAgICAgICAgIC8vIFN3aXRjaCB0byBvbmx5IHVzaW5nIGFwcGVuZGVkIGNsb25lc1xyXG4gICAgICAgICAgY2xvbmVzLnB1c2godGhpcy5ub3JtYWxpemUoY2xvbmVzLmxlbmd0aCAvIDIsIHRydWUpKTtcclxuICAgICAgICAgIGFwcGVuZC5wdXNoKHsgLi4udGhpcy5zbGlkZXNEYXRhW2Nsb25lc1tjbG9uZXMubGVuZ3RoIC0gMV1dfSk7XHJcblx0XHRcdFx0XHRjbG9uZXMucHVzaCh0aGlzLm5vcm1hbGl6ZShpdGVtcy5sZW5ndGggLSAxIC0gKGNsb25lcy5sZW5ndGggLSAxKSAvIDIsIHRydWUpKTtcclxuXHRcdFx0XHRcdHByZXBlbmQudW5zaGlmdCh7IC4uLnRoaXMuc2xpZGVzRGF0YVtjbG9uZXNbY2xvbmVzLmxlbmd0aCAtIDFdXX0pO1xyXG4gICAgICAgIH1cclxuXHJcblx0XHRcdFx0dGhpcy5fY2xvbmVzID0gY2xvbmVzO1xyXG5cclxuXHRcdFx0XHRhcHBlbmQgPSBhcHBlbmQubWFwKHNsaWRlID0+IHtcclxuXHRcdFx0XHRcdHNsaWRlLmlkID0gYCR7dGhpcy5jbG9uZWRJZFByZWZpeH0ke3NsaWRlLmlkfWA7XHJcblx0XHRcdFx0XHRzbGlkZS5pc0FjdGl2ZSA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0c2xpZGUuaXNDbG9uZWQgPSB0cnVlO1xyXG5cdFx0XHRcdFx0cmV0dXJuIHNsaWRlO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRwcmVwZW5kID0gcHJlcGVuZC5tYXAoc2xpZGUgPT4ge1xyXG5cdFx0XHRcdFx0c2xpZGUuaWQgPSBgJHt0aGlzLmNsb25lZElkUHJlZml4fSR7c2xpZGUuaWR9YDtcclxuXHRcdFx0XHRcdHNsaWRlLmlzQWN0aXZlID0gZmFsc2U7XHJcblx0XHRcdFx0XHRzbGlkZS5pc0Nsb25lZCA9IHRydWU7XHJcblx0XHRcdFx0XHRyZXR1cm4gc2xpZGU7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdHRoaXMuc2xpZGVzRGF0YSA9IHByZXBlbmQuY29uY2F0KHRoaXMuc2xpZGVzRGF0YSkuY29uY2F0KGFwcGVuZCk7XHJcbiAgICAgIH1cclxuICAgIH0sIHtcclxuICAgICAgZmlsdGVyOiBbICd3aWR0aCcsICdpdGVtcycsICdzZXR0aW5ncycgXSxcclxuICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcnRsID0gdGhpcy5zZXR0aW5ncy5ydGwgPyAxIDogLTEsXHJcbiAgICAgICAgICBzaXplID0gdGhpcy5fY2xvbmVzLmxlbmd0aCArIHRoaXMuX2l0ZW1zLmxlbmd0aCxcclxuICAgICAgICAgIGNvb3JkaW5hdGVzID0gW107XHJcbiAgICAgICAgbGV0IGl0ZXJhdG9yID0gLTEsXHJcbiAgICAgICAgICBwcmV2aW91cyA9IDAsXHJcbiAgICAgICAgICBjdXJyZW50ID0gMDtcclxuXHJcbiAgICAgICAgd2hpbGUgKCsraXRlcmF0b3IgPCBzaXplKSB7XHJcbiAgICAgICAgICBwcmV2aW91cyA9IGNvb3JkaW5hdGVzW2l0ZXJhdG9yIC0gMV0gfHwgMDtcclxuICAgICAgICAgIGN1cnJlbnQgPSB0aGlzLl93aWR0aHNbdGhpcy5yZWxhdGl2ZShpdGVyYXRvcildICsgdGhpcy5zZXR0aW5ncy5tYXJnaW47XHJcbiAgICAgICAgICBjb29yZGluYXRlcy5wdXNoKHByZXZpb3VzICsgY3VycmVudCAqIHJ0bCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9jb29yZGluYXRlcyA9IGNvb3JkaW5hdGVzO1xyXG4gICAgICB9XHJcbiAgICB9LCB7XHJcbiAgICAgIGZpbHRlcjogWyAnd2lkdGgnLCAnaXRlbXMnLCAnc2V0dGluZ3MnIF0sXHJcbiAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHBhZGRpbmcgPSB0aGlzLnNldHRpbmdzLnN0YWdlUGFkZGluZyxcclxuICAgICAgICAgIGNvb3JkaW5hdGVzID0gdGhpcy5fY29vcmRpbmF0ZXMsXHJcbiAgICAgICAgICBjc3MgPSB7XHJcbiAgICAgICAgICAgICd3aWR0aCc6IE1hdGguY2VpbChNYXRoLmFicyhjb29yZGluYXRlc1tjb29yZGluYXRlcy5sZW5ndGggLSAxXSkpICsgcGFkZGluZyAqIDIsXHJcbiAgICAgICAgICAgICdwYWRkaW5nLWxlZnQnOiBwYWRkaW5nIHx8ICcnLFxyXG4gICAgICAgICAgICAncGFkZGluZy1yaWdodCc6IHBhZGRpbmcgfHwgJydcclxuXHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdHRoaXMuc3RhZ2VEYXRhLndpZHRoID0gY3NzLndpZHRoOyAvLyB1c2UgdGhpcyBwcm9wZXJ0eSBpbiAqbmdJZiBkaXJlY3RpdmUgZm9yIC5vd2wtc3RhZ2UgZWxlbWVudFxyXG5cdFx0XHRcdHRoaXMuc3RhZ2VEYXRhLnBhZGRpbmdMID0gY3NzWydwYWRkaW5nLWxlZnQnXTtcclxuXHRcdFx0XHR0aGlzLnN0YWdlRGF0YS5wYWRkaW5nUiA9IGNzc1sncGFkZGluZy1yaWdodCddO1xyXG4gICAgICB9XHJcbiAgICB9LCB7XHJcbiAgICAvLyAgIGZpbHRlcjogWyAnd2lkdGgnLCAnaXRlbXMnLCAnc2V0dGluZ3MnIF0sXHJcbiAgICAvLyAgIHJ1bjogY2FjaGUgPT4ge1xyXG5cdFx0Ly8gXHRcdC8vIHRoaXMgbWV0aG9kIHNldHMgdGhlIHdpZHRoIGZvciBldmVyeSBzbGlkZSwgYnV0IEkgc2V0IGl0IGluIGRpZmZlcmVudCB3YXkgZWFybGllclxyXG5cdFx0Ly8gXHRcdGNvbnN0IGdyaWQgPSAhdGhpcy5zZXR0aW5ncy5hdXRvV2lkdGgsXHJcblx0XHQvLyBcdFx0aXRlbXMgPSB0aGlzLiRzdGFnZS5jaGlsZHJlbigpOyAvLyB1c2UgdGhpcy5zbGlkZXNEYXRhXHJcbiAgICAvLyAgICAgbGV0IGl0ZXJhdG9yID0gdGhpcy5fY29vcmRpbmF0ZXMubGVuZ3RoO1xyXG5cclxuICAgIC8vICAgICBpZiAoZ3JpZCAmJiBjYWNoZS5pdGVtcy5tZXJnZSkge1xyXG4gICAgLy8gICAgICAgd2hpbGUgKGl0ZXJhdG9yLS0pIHtcclxuICAgIC8vICAgICAgICAgY2FjaGUuY3NzLndpZHRoID0gdGhpcy5fd2lkdGhzW3RoaXMucmVsYXRpdmUoaXRlcmF0b3IpXTtcclxuICAgIC8vICAgICAgICAgaXRlbXMuZXEoaXRlcmF0b3IpLmNzcyhjYWNoZS5jc3MpO1xyXG4gICAgLy8gICAgICAgfVxyXG4gICAgLy8gICAgIH0gZWxzZSBpZiAoZ3JpZCkge1xyXG4gICAgLy8gICAgICAgY2FjaGUuY3NzLndpZHRoID0gY2FjaGUuaXRlbXMud2lkdGg7XHJcbiAgICAvLyAgICAgICBpdGVtcy5jc3MoY2FjaGUuY3NzKTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgIH1cclxuICAgIC8vIH0sIHtcclxuICAgIC8vICAgZmlsdGVyOiBbICdpdGVtcycgXSxcclxuICAgIC8vICAgcnVuOiBmdW5jdGlvbigpIHtcclxuICAgIC8vICAgICB0aGlzLl9jb29yZGluYXRlcy5sZW5ndGggPCAxICYmIHRoaXMuJHN0YWdlLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAvLyAgIH1cclxuICAgIC8vIH0sIHtcclxuICAgICAgZmlsdGVyOiBbICd3aWR0aCcsICdpdGVtcycsICdzZXR0aW5ncycgXSxcclxuICAgICAgcnVuOiBjYWNoZSA9PiB7XHJcbiAgICAgICAgbGV0IGN1cnJlbnQgPSBjYWNoZS5jdXJyZW50ID8gdGhpcy5zbGlkZXNEYXRhLmZpbmRJbmRleChzbGlkZSA9PiBzbGlkZS5pZCA9PT0gY2FjaGUuY3VycmVudCkgOiAwO1xyXG4gICAgICAgXHRjdXJyZW50ID0gTWF0aC5tYXgodGhpcy5taW5pbXVtKCksIE1hdGgubWluKHRoaXMubWF4aW11bSgpLCBjdXJyZW50KSk7XHJcbiAgICAgICAgdGhpcy5yZXNldChjdXJyZW50KTtcclxuICAgICAgfVxyXG4gICAgfSwge1xyXG4gICAgICBmaWx0ZXI6IFsgJ3Bvc2l0aW9uJyBdLFxyXG4gICAgICBydW46ICgpID0+IHtcclxuICAgICAgICB0aGlzLmFuaW1hdGUodGhpcy5jb29yZGluYXRlcyh0aGlzLl9jdXJyZW50KSk7XHJcbiAgICAgIH1cclxuICAgIH0sIHtcclxuICAgICAgZmlsdGVyOiBbICd3aWR0aCcsICdwb3NpdGlvbicsICdpdGVtcycsICdzZXR0aW5ncycgXSxcclxuICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcnRsID0gdGhpcy5zZXR0aW5ncy5ydGwgPyAxIDogLTEsXHJcblx0XHRcdFx0XHRwYWRkaW5nID0gdGhpcy5zZXR0aW5ncy5zdGFnZVBhZGRpbmcgKiAyLFxyXG5cdFx0XHRcdFx0bWF0Y2hlcyA9IFtdO1xyXG5cdFx0XHRcdGxldCBiZWdpbiwgZW5kLCBpbm5lciwgb3V0ZXIsIGksIG47XHJcblxyXG5cdFx0XHRcdGJlZ2luID0gdGhpcy5jb29yZGluYXRlcyh0aGlzLmN1cnJlbnQoKSk7XHJcblx0XHRcdFx0aWYgKHR5cGVvZiBiZWdpbiA9PT0gJ251bWJlcicgKSB7XHJcblx0XHRcdFx0XHRiZWdpbiArPSBwYWRkaW5nO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRiZWdpbiA9IDA7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRlbmQgPSBiZWdpbiArIHRoaXMud2lkdGgoKSAqIHJ0bDtcclxuXHJcblx0XHRcdFx0aWYgKHJ0bCA9PT0gLTEgJiYgdGhpcy5zZXR0aW5ncy5jZW50ZXIpIHtcclxuXHRcdFx0XHRcdGNvbnN0IHJlc3VsdCA9XHR0aGlzLl9jb29yZGluYXRlcy5maWx0ZXIoZWxlbWVudCA9PiB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLnNldHRpbmdzLml0ZW1zICUgMiA9PT0gMSA/IGVsZW1lbnQgPj0gYmVnaW4gOiBlbGVtZW50ID4gYmVnaW47XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdGJlZ2luID0gcmVzdWx0Lmxlbmd0aCA/IHJlc3VsdFtyZXN1bHQubGVuZ3RoIC0gMV0gOiBiZWdpbjtcclxuXHRcdFx0XHR9XHJcblxyXG4gICAgICAgIGZvciAoaSA9IDAsIG4gPSB0aGlzLl9jb29yZGluYXRlcy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgIGlubmVyID0gTWF0aC5jZWlsKHRoaXMuX2Nvb3JkaW5hdGVzW2kgLSAxXSB8fCAwKTtcclxuXHRcdFx0XHRcdG91dGVyID0gTWF0aC5jZWlsKE1hdGguYWJzKHRoaXMuX2Nvb3JkaW5hdGVzW2ldKSArIHBhZGRpbmcgKiBydGwpO1xyXG5cclxuICAgICAgICAgIGlmICgodGhpcy5fb3AoaW5uZXIsICc8PScsIGJlZ2luKSAmJiAodGhpcy5fb3AoaW5uZXIsICc+JywgZW5kKSkpXHJcbiAgICAgICAgICAgIHx8ICh0aGlzLl9vcChvdXRlciwgJzwnLCBiZWdpbikgJiYgdGhpcy5fb3Aob3V0ZXIsICc+JywgZW5kKSkpIHtcclxuICAgICAgICAgICAgbWF0Y2hlcy5wdXNoKGkpO1xyXG4gICAgICAgICAgfVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dGhpcy5zbGlkZXNEYXRhLmZvckVhY2goc2xpZGUgPT4ge1xyXG5cdFx0XHRcdFx0c2xpZGUuaXNBY3RpdmUgPSBmYWxzZTtcclxuXHRcdFx0XHRcdHJldHVybiBzbGlkZTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRtYXRjaGVzLmZvckVhY2goaXRlbSA9PiB7XHJcblx0XHRcdFx0XHR0aGlzLnNsaWRlc0RhdGFbaXRlbV0uaXNBY3RpdmUgPSB0cnVlO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5jZW50ZXIpIHtcclxuXHRcdFx0XHRcdHRoaXMuc2xpZGVzRGF0YS5mb3JFYWNoKHNsaWRlID0+IHtcclxuXHRcdFx0XHRcdFx0c2xpZGUuaXNDZW50ZXJlZCA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gc2xpZGU7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdHRoaXMuc2xpZGVzRGF0YVt0aGlzLmN1cnJlbnQoKV0uaXNDZW50ZXJlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgXTtcclxuXHJcblx0Y29uc3RydWN0b3IoKSB7IH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgX3ZpZXdTZXR0aW5nc1NoaXBwZXIkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcclxuXHQgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIF92aWV3U2V0dGluZ3NTaGlwcGVyJCBTdWJqZWN0XHJcblx0ICovXHJcblx0Z2V0Vmlld0N1clNldHRpbmdzKCk6IE9ic2VydmFibGU8Q2Fyb3VzZWxDdXJyZW50RGF0YT4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3ZpZXdTZXR0aW5nc1NoaXBwZXIkLmFzT2JzZXJ2YWJsZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgX2luaXRpYWxpemVkQ2Fyb3VzZWwkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcclxuXHQgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIF9pbml0aWFsaXplZENhcm91c2VsJCBTdWJqZWN0XHJcblx0ICovXHJcblx0Z2V0SW5pdGlhbGl6ZWRTdGF0ZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2luaXRpYWxpemVkQ2Fyb3VzZWwkLmFzT2JzZXJ2YWJsZSgpXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBfY2hhbmdlU2V0dGluZ3NDYXJvdXNlbCQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxyXG5cdCAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX2NoYW5nZVNldHRpbmdzQ2Fyb3VzZWwkIFN1YmplY3RcclxuXHQgKi9cclxuXHRnZXRDaGFuZ2VTdGF0ZSgpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2NoYW5nZVNldHRpbmdzQ2Fyb3VzZWwkLmFzT2JzZXJ2YWJsZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgX2NoYW5nZWRTZXR0aW5nc0Nhcm91c2VsJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXHJcblx0ICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfY2hhbmdlZFNldHRpbmdzQ2Fyb3VzZWwkIFN1YmplY3RcclxuXHQgKi9cclxuXHRnZXRDaGFuZ2VkU3RhdGUoKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuXHRcdHJldHVybiB0aGlzLl9jaGFuZ2VkU2V0dGluZ3NDYXJvdXNlbCQuYXNPYnNlcnZhYmxlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBfdHJhbnNsYXRlQ2Fyb3VzZWwkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcclxuXHQgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIF90cmFuc2xhdGVDYXJvdXNlbCQgU3ViamVjdFxyXG5cdCAqL1xyXG5cdGdldFRyYW5zbGF0ZVN0YXRlKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XHJcblx0XHRyZXR1cm4gdGhpcy5fdHJhbnNsYXRlQ2Fyb3VzZWwkLmFzT2JzZXJ2YWJsZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgX3RyYW5zbGF0ZWRDYXJvdXNlbCQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxyXG5cdCAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX3RyYW5zbGF0ZWRDYXJvdXNlbCQgU3ViamVjdFxyXG5cdCAqL1xyXG5cdGdldFRyYW5zbGF0ZWRTdGF0ZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3RyYW5zbGF0ZWRDYXJvdXNlbCQuYXNPYnNlcnZhYmxlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBfcmVzaXplQ2Fyb3VzZWwkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcclxuXHQgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIF9yZXNpemVDYXJvdXNlbCQgU3ViamVjdFxyXG5cdCAqL1xyXG5cdGdldFJlc2l6ZVN0YXRlKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XHJcblx0XHRyZXR1cm4gdGhpcy5fcmVzaXplQ2Fyb3VzZWwkLmFzT2JzZXJ2YWJsZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgX3Jlc2l6ZWRDYXJvdXNlbCQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxyXG5cdCAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX3Jlc2l6ZWRDYXJvdXNlbCQgU3ViamVjdFxyXG5cdCAqL1xyXG5cdGdldFJlc2l6ZWRTdGF0ZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3Jlc2l6ZWRDYXJvdXNlbCQuYXNPYnNlcnZhYmxlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBfcmVmcmVzaENhcm91c2VsJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXHJcblx0ICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfcmVmcmVzaENhcm91c2VsJCBTdWJqZWN0XHJcblx0ICovXHJcblx0Z2V0UmVmcmVzaFN0YXRlKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XHJcblx0XHRyZXR1cm4gdGhpcy5fcmVmcmVzaENhcm91c2VsJC5hc09ic2VydmFibGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIF9yZWZyZXNoZWRDYXJvdXNlbCQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxyXG5cdCAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX3JlZnJlc2hlZENhcm91c2VsJCBTdWJqZWN0XHJcblx0ICovXHJcblx0Z2V0UmVmcmVzaGVkU3RhdGUoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcclxuXHRcdHJldHVybiB0aGlzLl9yZWZyZXNoZWRDYXJvdXNlbCQuYXNPYnNlcnZhYmxlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBfZHJhZ0Nhcm91c2VsJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXHJcblx0ICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfZHJhZ0Nhcm91c2VsJCBTdWJqZWN0XHJcblx0ICovXHJcblx0Z2V0RHJhZ1N0YXRlKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XHJcblx0XHRyZXR1cm4gdGhpcy5fZHJhZ0Nhcm91c2VsJC5hc09ic2VydmFibGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIF9kcmFnZ2VkQ2Fyb3VzZWwkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcclxuXHQgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIF9kcmFnZ2VkQ2Fyb3VzZWwkIFN1YmplY3RcclxuXHQgKi9cclxuXHRnZXREcmFnZ2VkU3RhdGUoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcclxuXHRcdHJldHVybiB0aGlzLl9kcmFnZ2VkQ2Fyb3VzZWwkLmFzT2JzZXJ2YWJsZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0dXBzIGN1c3RvbSBvcHRpb25zIGV4cGFuZGluZyBkZWZhdWx0IG9wdGlvbnNcclxuXHQgKiBAcGFyYW0gb3B0aW9ucyBjdXN0b20gb3B0aW9uc1xyXG5cdCAqL1xyXG5cdHNldE9wdGlvbnMob3B0aW9uczogT3dsT3B0aW9ucykge1xyXG5cdFx0Y29uc3QgY29uZmlnT3B0aW9uczogT3dsT3B0aW9ucyA9IG5ldyBPd2xDYXJvdXNlbE9Db25maWcoKTtcclxuXHRcdGNvbnN0IGNoZWNrZWRPcHRpb25zOiBPd2xPcHRpb25zID0gdGhpcy5fdmFsaWRhdGVPcHRpb25zKG9wdGlvbnMsIGNvbmZpZ09wdGlvbnMpO1xyXG5cdFx0dGhpcy5fb3B0aW9ucyA9IHsgLi4uY29uZmlnT3B0aW9ucywgLi4uY2hlY2tlZE9wdGlvbnN9O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIHdoZXRoZXIgdXNlcidzIG9wdGlvbiBhcmUgc2V0IHByb3Blcmx5LiBDaGVraW5nIGlzIGJhc2VkIG9uIHR5cGluZ3M7XHJcblx0ICogQHBhcmFtIG9wdGlvbnMgb3B0aW9ucyBzZXQgYnkgdXNlclxyXG5cdCAqIEBwYXJhbSBjb25maWdPcHRpb25zIGRlZmF1bHQgb3B0aW9uc1xyXG5cdCAqIEByZXR1cm5zIGNoZWNrZWQgYW5kIG1vZGlmaWVkIChpZiBpdCdzIG5lZWRlZCkgdXNlcidzIG9wdGlvbnNcclxuXHQgKlxyXG5cdCAqIE5vdGVzOlxyXG5cdCAqIFx0LSBpZiB1c2VyIHNldCBvcHRpb24gd2l0aCB3cm9uZyB0eXBlLCBpdCdsbCBiZSB3cml0dGVuIGluIGNvbnNvbGVcclxuXHQgKi9cclxuXHRwcml2YXRlIF92YWxpZGF0ZU9wdGlvbnMob3B0aW9uczogT3dsT3B0aW9ucywgY29uZmlnT3B0aW9uczogT3dsT3B0aW9ucyk6IE93bE9wdGlvbnMge1xyXG5cdFx0Y29uc3QgY2hlY2tlZE9wdGlvbnM6IE93bE9wdGlvbnMgPSB7IC4uLm9wdGlvbnN9O1xyXG5cdFx0Y29uc3QgbW9ja2VkVHlwZXMgPSBuZXcgT3dsT3B0aW9uc01vY2tlZFR5cGVzKCk7XHJcblxyXG5cdFx0Zm9yIChjb25zdCBrZXkgaW4gY2hlY2tlZE9wdGlvbnMpIHtcclxuXHRcdFx0aWYgKGNoZWNrZWRPcHRpb25zLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuXHJcblx0XHRcdFx0Ly8gY29uZGl0aW9uIGNvdWxkIGJlIHNob3J0ZW5lZCBidXQgaXQgZ2V0cyBoYXJkZXIgZm9yIHVuZGVyc3RhbmRpbmdcclxuXHRcdFx0XHRpZiAobW9ja2VkVHlwZXNba2V5XSA9PT0gJ251bWJlcicpIHtcclxuXHRcdFx0XHRcdGlmICh0aGlzLl9pc051bWVyaWMoY2hlY2tlZE9wdGlvbnNba2V5XSkpIHtcclxuXHRcdFx0XHRcdFx0Y2hlY2tlZE9wdGlvbnNba2V5XSA9ICtjaGVja2VkT3B0aW9uc1trZXldO1xyXG5cdFx0XHRcdFx0XHRjaGVja2VkT3B0aW9uc1trZXldID0ga2V5ID09PSAnaXRlbXMnID8gdGhpcy5fdmFsaWRhdGVJdGVtcyhjaGVja2VkT3B0aW9uc1trZXldKSA6IGNoZWNrZWRPcHRpb25zW2tleV07XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRjaGVja2VkT3B0aW9uc1trZXldID0gc2V0UmlnaHRPcHRpb24obW9ja2VkVHlwZXNba2V5XSwga2V5KTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9IGVsc2UgaWYgKG1vY2tlZFR5cGVzW2tleV0gPT09ICdib29sZWFuJyAmJiB0eXBlb2YgY2hlY2tlZE9wdGlvbnNba2V5XSAhPT0gJ2Jvb2xlYW4nKSB7XHJcblx0XHRcdFx0XHRjaGVja2VkT3B0aW9uc1trZXldID0gc2V0UmlnaHRPcHRpb24obW9ja2VkVHlwZXNba2V5XSwga2V5KTtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKG1vY2tlZFR5cGVzW2tleV0gPT09ICdudW1iZXJ8Ym9vbGVhbicgJiYgIXRoaXMuX2lzTnVtYmVyT3JCb29sZWFuKGNoZWNrZWRPcHRpb25zW2tleV0pKSB7XHJcblx0XHRcdFx0XHRjaGVja2VkT3B0aW9uc1trZXldID0gc2V0UmlnaHRPcHRpb24obW9ja2VkVHlwZXNba2V5XSwga2V5KTtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKG1vY2tlZFR5cGVzW2tleV0gPT09ICdudW1iZXJ8c3RyaW5nJyAmJiAhdGhpcy5faXNOdW1iZXJPclN0cmluZyhjaGVja2VkT3B0aW9uc1trZXldKSkge1xyXG5cdFx0XHRcdFx0Y2hlY2tlZE9wdGlvbnNba2V5XSA9IHNldFJpZ2h0T3B0aW9uKG1vY2tlZFR5cGVzW2tleV0sIGtleSk7XHJcblx0XHRcdFx0fSBlbHNlIGlmIChtb2NrZWRUeXBlc1trZXldID09PSAnc3RyaW5nfGJvb2xlYW4nICYmICF0aGlzLl9pc1N0cmluZ09yQm9vbGVhbihjaGVja2VkT3B0aW9uc1trZXldKSkge1xyXG5cdFx0XHRcdFx0Y2hlY2tlZE9wdGlvbnNba2V5XSA9IHNldFJpZ2h0T3B0aW9uKG1vY2tlZFR5cGVzW2tleV0sIGtleSk7XHJcblx0XHRcdFx0fSBlbHNlIGlmIChtb2NrZWRUeXBlc1trZXldID09PSAnc3RyaW5nW10nKSB7XHJcblx0XHRcdFx0XHRpZiAoQXJyYXkuaXNBcnJheShjaGVja2VkT3B0aW9uc1trZXldKSkge1xyXG5cdFx0XHRcdFx0XHRsZXQgaXNTdHJpbmcgPSBmYWxzZTtcclxuXHRcdFx0XHRcdFx0Y2hlY2tlZE9wdGlvbnNba2V5XS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdGlzU3RyaW5nID0gdHlwZW9mIGVsZW1lbnQgPT09ICdzdHJpbmcnID8gdHJ1ZSA6IGZhbHNlO1xyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0aWYgKCFpc1N0cmluZykgeyBjaGVja2VkT3B0aW9uc1trZXldID0gc2V0UmlnaHRPcHRpb24obW9ja2VkVHlwZXNba2V5XSwga2V5KSB9O1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0Y2hlY2tlZE9wdGlvbnNba2V5XSA9IHNldFJpZ2h0T3B0aW9uKG1vY2tlZFR5cGVzW2tleV0sIGtleSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gc2V0UmlnaHRPcHRpb24odHlwZTogc3RyaW5nLCBrZXk6IGFueSk6IGFueSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKGBvcHRpb25zLiR7a2V5fSBtdXN0IGJlIHR5cGUgb2YgJHt0eXBlfTsgJHtrZXl9PSR7b3B0aW9uc1trZXldfSBza2lwcGVkIHRvIGRlZmF1bHRzOiAke2tleX09JHtjb25maWdPcHRpb25zW2tleV19YCk7XHJcblx0XHRcdHJldHVybiBjb25maWdPcHRpb25zW2tleV07XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGNoZWNrZWRPcHRpb25zO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIG9wdGlvbiBpdGVtcyBzZXQgYnkgdXNlciBhbmQgaWYgaXQgYmlnZ2VyIHRoYW4gbnVtYmVyIG9mIHNsaWRlcyB0aGVuIHJldHVybnMgbnVtYmVyIG9mIHNsaWRlc1xyXG5cdCAqIEBwYXJhbSBpdGVtcyBvcHRpb24gaXRlbXMgc2V0IGJ5IHVzZXJcclxuXHQgKiBAcmV0dXJucyByaWdodCBudW1iZXIgb2YgaXRlbXNcclxuXHQgKi9cclxuXHRwcml2YXRlIF92YWxpZGF0ZUl0ZW1zKGl0ZW1zOiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0bGV0IHJlc3VsdDogbnVtYmVyO1xyXG5cdFx0aWYgKGl0ZW1zID49IHRoaXMuX2l0ZW1zLmxlbmd0aCkge1xyXG5cdFx0XHRyZXN1bHQgPSB0aGlzLl9pdGVtcy5sZW5ndGggO1xyXG5cdFx0XHRjb25zb2xlLmxvZygnb3B0aW9uIFxcJ2l0ZW1zXFwnIGluIHlvdXIgb3B0aW9ucyBpcyBiaWdnZXIgdGhhbiBudW1iZXIgb2Ygc2xpZGVzOyBUaGlzIG9wdGlvbiBpcyB1cGRhdGVkIHRvIGN1cnJlbnQgbnVtYmVyIG9mIHNsaWRlcyBhbmQgbmF2aWdhdGlvbiBnb3QgZGlzYWJsZWQnKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJlc3VsdCA9IGl0ZW1zO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldCBjdXJyZW50IHdpZHRoIG9mIGNhcm91c2VsXHJcblx0ICogQHBhcmFtIHdpZHRoIHdpZHRoIG9mIGNhcm91c2VsIFdpbmRvd1xyXG5cdCAqL1xyXG5cdHNldENhcm91c2VsV2lkdGgod2lkdGg6IG51bWJlcikge1xyXG5cdFx0dGhpcy5fd2lkdGggPSB3aWR0aDtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIFNldHVwcyB0aGUgY3VycmVudCBzZXR0aW5ncy5cclxuXHQgKiBAdG9kbyBSZW1vdmUgcmVzcG9uc2l2ZSBjbGFzc2VzLiBXaHkgc2hvdWxkIGFkYXB0aXZlIGRlc2lnbnMgYmUgYnJvdWdodCBpbnRvIElFOD9cclxuXHQgKiBAdG9kbyBTdXBwb3J0IGZvciBtZWRpYSBxdWVyaWVzIGJ5IHVzaW5nIGBtYXRjaE1lZGlhYCB3b3VsZCBiZSBuaWNlLlxyXG5cdCAqIEBwYXJhbSBjYXJvdXNlbFdpZHRoIHdpZHRoIG9mIGNhcm91c2VsXHJcblx0ICogQHBhcmFtIHNsaWRlcyBhcnJheSBvZiBzbGlkZXNcclxuXHQgKiBAcGFyYW0gb3B0aW9ucyBvcHRpb25zIHNldCBieSB1c2VyXHJcblx0ICovXHJcbiAgc2V0dXAoY2Fyb3VzZWxXaWR0aDogbnVtYmVyLCBzbGlkZXM6IENhcm91c2VsU2xpZGVEaXJlY3RpdmVbXSwgb3B0aW9uczogT3dsT3B0aW9ucykge1xyXG5cdFx0dGhpcy5zZXRDYXJvdXNlbFdpZHRoKGNhcm91c2VsV2lkdGgpO1xyXG5cdFx0dGhpcy5zZXRJdGVtcyhzbGlkZXMpO1xyXG5cdFx0dGhpcy5fZGVmaW5lU2xpZGVzRGF0YSgpO1xyXG5cdFx0dGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSB7IC4uLnRoaXMuX29wdGlvbnN9O1xyXG5cclxuXHRcdHRoaXMuc2V0Vmlld3BvcnRJdGVtc04oKTtcclxuXHJcblx0XHR0aGlzLl90cmlnZ2VyKCdjaGFuZ2UnLCB7IHByb3BlcnR5OiB7IG5hbWU6ICdzZXR0aW5ncycsIHZhbHVlOiB0aGlzLnNldHRpbmdzIH0gfSk7XHJcblx0XHR0aGlzLmludmFsaWRhdGUoJ3NldHRpbmdzJyk7IC8vIG11c3QgYmUgY2FsbCBvZiB0aGlzIGZ1bmN0aW9uO1xyXG5cdFx0dGhpcy5fdHJpZ2dlcignY2hhbmdlZCcsIHsgcHJvcGVydHk6IHsgbmFtZTogJ3NldHRpbmdzJywgdmFsdWU6IHRoaXMuc2V0dGluZ3MgfSB9KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldCBudW1iZXIgb2YgaXRlbXMgZm9yIGN1cnJlbnQgdmlld3BvcnRcclxuXHQgKi9cclxuXHRzZXRWaWV3cG9ydEl0ZW1zTigpIHtcclxuXHRcdGNvbnN0IHZpZXdwb3J0ID0gdGhpcy5fd2lkdGgsXHJcblx0XHRcdG92ZXJ3cml0ZXMgPSB0aGlzLl9vcHRpb25zLnJlc3BvbnNpdmU7XHJcblx0XHRsZXRcdG1hdGNoID0gLTE7XHJcblxyXG5cdFx0aWYgKCFPYmplY3Qua2V5cyhvdmVyd3JpdGVzKS5sZW5ndGgpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghdmlld3BvcnQpIHtcclxuXHRcdFx0dGhpcy5zZXR0aW5ncy5pdGVtcyA9IDE7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRmb3IgKGNvbnN0IGtleSBpbiBvdmVyd3JpdGVzKSB7XHJcblx0XHRcdGlmIChvdmVyd3JpdGVzLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuXHRcdFx0XHRpZiAoK2tleSA8PSB2aWV3cG9ydCAmJiAra2V5ID4gbWF0Y2gpIHtcclxuXHRcdFx0XHRcdG1hdGNoID0gTnVtYmVyKGtleSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IHsgLi4udGhpcy5zZXR0aW5ncywgaXRlbXM6IHRoaXMuX3ZhbGlkYXRlSXRlbXMob3ZlcndyaXRlc1ttYXRjaF0uaXRlbXMpfTtcclxuXHRcdC8vIGlmICh0eXBlb2YgdGhpcy5zZXR0aW5ncy5zdGFnZVBhZGRpbmcgPT09ICdmdW5jdGlvbicpIHtcclxuXHRcdC8vIFx0dGhpcy5zZXR0aW5ncy5zdGFnZVBhZGRpbmcgPSB0aGlzLnNldHRpbmdzLnN0YWdlUGFkZGluZygpO1xyXG5cdFx0Ly8gfVxyXG5cdFx0ZGVsZXRlIHRoaXMuc2V0dGluZ3MucmVzcG9uc2l2ZTtcclxuXHRcdHRoaXMub3dsRE9NRGF0YS5pc1Jlc3BvbnNpdmUgPSB0cnVlO1xyXG5cdFx0dGhpcy5fYnJlYWtwb2ludCA9IG1hdGNoO1xyXG5cclxuXHRcdHRoaXMuaW52YWxpZGF0ZSgnc2V0dGluZ3MnKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluaXRpYWxpemVzIHRoZSBjYXJvdXNlbC5cclxuXHQgKiBAcGFyYW0gc2xpZGVzIGFycmF5IG9mIENhcm91c2VsU2xpZGVEaXJlY3RpdmVcclxuXHQgKi9cclxuICBpbml0aWFsaXplKHNsaWRlczogQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZVtdKSB7XHJcblx0XHR0aGlzLmVudGVyKCdpbml0aWFsaXppbmcnKTtcclxuXHRcdC8vIHRoaXMudHJpZ2dlcignaW5pdGlhbGl6ZScpO1xyXG5cclxuXHRcdHRoaXMub3dsRE9NRGF0YS5ydGwgPSB0aGlzLnNldHRpbmdzLnJ0bDtcclxuXHJcblx0XHRzbGlkZXMuZm9yRWFjaChpdGVtID0+IHtcclxuXHRcdFx0Y29uc3QgbWVyZ2VOOiBudW1iZXIgPSB0aGlzLnNldHRpbmdzLm1lcmdlID8gaXRlbS5kYXRhTWVyZ2UgOiAxO1xyXG5cdFx0XHR0aGlzLl9tZXJnZXJzLnB1c2gobWVyZ2VOKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHRoaXMucmVzZXQodGhpcy5faXNOdW1lcmljKHRoaXMuc2V0dGluZ3Muc3RhcnRQb3NpdGlvbikgPyArdGhpcy5zZXR0aW5ncy5zdGFydFBvc2l0aW9uIDogMCk7XHJcblxyXG5cdFx0dGhpcy5pbnZhbGlkYXRlKCdpdGVtcycpO1xyXG5cdFx0dGhpcy5yZWZyZXNoKCk7XHJcblxyXG5cdFx0dGhpcy5vd2xET01EYXRhLmlzTG9hZGVkID0gdHJ1ZTtcclxuXHRcdHRoaXMub3dsRE9NRGF0YS5pc01vdXNlRHJhZ2FibGUgPSB0aGlzLnNldHRpbmdzLm1vdXNlRHJhZztcclxuXHRcdHRoaXMub3dsRE9NRGF0YS5pc1RvdWNoRHJhZ2FibGUgPSB0aGlzLnNldHRpbmdzLnRvdWNoRHJhZztcclxuXHJcblx0XHR0aGlzLnNlbmRDaGFuZ2VzKCk7XHJcblxyXG5cdFx0dGhpcy5sZWF2ZSgnaW5pdGlhbGl6aW5nJyk7XHJcblx0XHR0aGlzLl90cmlnZ2VyKCdpbml0aWFsaXplZCcpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNlbmRzIGFsbCBkYXRhIG5lZWRlZCBmb3IgVmlld1xyXG5cdCAqL1xyXG5cdHNlbmRDaGFuZ2VzKCkge1xyXG5cdFx0dGhpcy5fdmlld1NldHRpbmdzU2hpcHBlciQubmV4dCh7XHJcblx0XHRcdG93bERPTURhdGE6IHRoaXMub3dsRE9NRGF0YSxcclxuXHRcdFx0c3RhZ2VEYXRhOiB0aGlzLnN0YWdlRGF0YSxcclxuXHRcdFx0c2xpZGVzRGF0YTogdGhpcy5zbGlkZXNEYXRhLFxyXG5cdFx0XHRuYXZEYXRhOiB0aGlzLm5hdkRhdGEsXHJcblx0XHRcdGRvdHNEYXRhOiB0aGlzLmRvdHNEYXRhXHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cclxuICAvKipcclxuXHQgKiBVcGRhdGVzIG9wdGlvbiBsb2dpYyBpZiBuZWNlc3NlcnlcclxuXHQgKi9cclxuICBwcml2YXRlIF9vcHRpb25zTG9naWMoKSB7XHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5hdXRvV2lkdGgpIHtcclxuXHRcdFx0dGhpcy5zZXR0aW5ncy5zdGFnZVBhZGRpbmcgPSAwO1xyXG5cdFx0XHR0aGlzLnNldHRpbmdzLm1lcmdlID0gZmFsc2U7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGVzIHRoZSB2aWV3XHJcbiAgICovXHJcbiAgdXBkYXRlKCkge1xyXG4gICAgbGV0IGkgPSAwO1xyXG4gICAgY29uc3QgbiA9IHRoaXMuX3BpcGUubGVuZ3RoLFxyXG4gICAgICBmaWx0ZXIgPSBpdGVtID0+IHRoaXMuX2ludmFsaWRhdGVkW2l0ZW1dLFxyXG5cdFx0XHRjYWNoZSA9IHt9O1xyXG5cclxuICAgIHdoaWxlIChpIDwgbikge1xyXG4gICAgICBjb25zdCBmaWx0ZXJlZFBpcGUgPSB0aGlzLl9waXBlW2ldLmZpbHRlci5maWx0ZXIoZmlsdGVyKTtcclxuICAgICAgaWYgKHRoaXMuX2ludmFsaWRhdGVkLmFsbCB8fCBmaWx0ZXJlZFBpcGUubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdHRoaXMuX3BpcGVbaV0ucnVuKGNhY2hlKTtcclxuICAgICAgfVxyXG4gICAgICBpKys7XHJcblx0XHR9XHJcblx0XHR0aGlzLnNsaWRlc0RhdGEuZm9yRWFjaChzbGlkZSA9PiBzbGlkZS5jbGFzc2VzID0gdGhpcy5zZXRDdXJTbGlkZUNsYXNzZXMoc2xpZGUpKTtcclxuXHRcdHRoaXMuc2VuZENoYW5nZXMoKTtcclxuXHJcbiAgICB0aGlzLl9pbnZhbGlkYXRlZCA9IHt9O1xyXG5cclxuICAgIGlmICghdGhpcy5pcygndmFsaWQnKSkge1xyXG4gICAgICB0aGlzLmVudGVyKCd2YWxpZCcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcblx0ICogR2V0cyB0aGUgd2lkdGggb2YgdGhlIHZpZXcuXHJcblx0ICogQHBhcmFtIFtkaW1lbnNpb249V2lkdGguRGVmYXVsdF0gVGhlIGRpbWVuc2lvbiB0byByZXR1cm5cclxuXHQgKiBAcmV0dXJucyBUaGUgd2lkdGggb2YgdGhlIHZpZXcgaW4gcGl4ZWwuXHJcblx0ICovXHJcbiAgd2lkdGgoZGltZW5zaW9uPzogV2lkdGgpOiBudW1iZXIge1xyXG5cdFx0ZGltZW5zaW9uID0gZGltZW5zaW9uIHx8IFdpZHRoLkRlZmF1bHQ7XHJcblx0XHRzd2l0Y2ggKGRpbWVuc2lvbikge1xyXG5cdFx0XHRjYXNlIFdpZHRoLklubmVyOlxyXG5cdFx0XHRjYXNlIFdpZHRoLk91dGVyOlxyXG5cdFx0XHRcdHJldHVybiB0aGlzLl93aWR0aDtcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5fd2lkdGggLSB0aGlzLnNldHRpbmdzLnN0YWdlUGFkZGluZyAqIDIgKyB0aGlzLnNldHRpbmdzLm1hcmdpbjtcclxuXHRcdH1cclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIFJlZnJlc2hlcyB0aGUgY2Fyb3VzZWwgcHJpbWFyaWx5IGZvciBhZGFwdGl2ZSBwdXJwb3Nlcy5cclxuXHQgKi9cclxuICByZWZyZXNoKCkge1xyXG5cdFx0dGhpcy5lbnRlcigncmVmcmVzaGluZycpO1xyXG5cdFx0dGhpcy5fdHJpZ2dlcigncmVmcmVzaCcpO1xyXG5cdFx0dGhpcy5fZGVmaW5lU2xpZGVzRGF0YSgpO1xyXG5cdFx0dGhpcy5zZXRWaWV3cG9ydEl0ZW1zTigpO1xyXG5cclxuXHRcdHRoaXMuX29wdGlvbnNMb2dpYygpO1xyXG5cclxuXHRcdC8vIHRoaXMuJGVsZW1lbnQuYWRkQ2xhc3ModGhpcy5vcHRpb25zLnJlZnJlc2hDbGFzcyk7XHJcblxyXG5cdFx0dGhpcy51cGRhdGUoKTtcclxuXHJcblx0XHQvLyB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKHRoaXMub3B0aW9ucy5yZWZyZXNoQ2xhc3MpO1xyXG5cclxuXHRcdHRoaXMubGVhdmUoJ3JlZnJlc2hpbmcnKTtcclxuXHRcdHRoaXMuX3RyaWdnZXIoJ3JlZnJlc2hlZCcpO1xyXG5cdCB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIENoZWNrcyB3aW5kb3cgYHJlc2l6ZWAgZXZlbnQuXHJcblx0ICogQHBhcmFtIGN1cldpZHRoIHdpZHRoIG9mIC5vd2wtY2Fyb3VzZWxcclxuXHQgKi9cclxuICBvblJlc2l6ZShjdXJXaWR0aDogbnVtYmVyKSB7XHJcblx0XHRpZiAoIXRoaXMuX2l0ZW1zLmxlbmd0aCkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXRDYXJvdXNlbFdpZHRoKGN1cldpZHRoKTtcclxuXHJcblx0XHR0aGlzLmVudGVyKCdyZXNpemluZycpO1xyXG5cclxuXHRcdC8vIGlmICh0aGlzLnRyaWdnZXIoJ3Jlc2l6ZScpLmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XHJcblx0XHQvLyBcdHRoaXMubGVhdmUoJ3Jlc2l6aW5nJyk7XHJcblx0XHQvLyBcdHJldHVybiBmYWxzZTtcclxuXHRcdC8vIH1cclxuXHRcdHRoaXMuX3RyaWdnZXIoJ3Jlc2l6ZScpO1xyXG5cdFx0dGhpcy5pbnZhbGlkYXRlKCd3aWR0aCcpO1xyXG5cclxuXHRcdHRoaXMucmVmcmVzaCgpO1xyXG5cclxuXHRcdHRoaXMubGVhdmUoJ3Jlc2l6aW5nJyk7XHJcblx0XHR0aGlzLl90cmlnZ2VyKCdyZXNpemVkJyk7XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBQcmVwYXJlcyBkYXRhIGZvciBkcmFnZ2luZyBjYXJvdXNlbC4gSXQgc3RhcnRzIGFmdGVyIGZpcmluZyBgdG91Y2hzdGFydGAgYW5kIGBtb3VzZWRvd25gIGV2ZW50cy5cclxuXHQgKiBAdG9kbyBIb3Jpem9udGFsIHN3aXBlIHRocmVzaG9sZCBhcyBvcHRpb25cclxuXHQgKiBAdG9kbyAjMjYxXHJcblx0ICogQHBhcmFtIGV2ZW50IC0gVGhlIGV2ZW50IGFyZ3VtZW50cy5cclxuXHQgKiBAcmV0dXJucyBzdGFnZSAtIG9iamVjdCB3aXRoICd4JyBhbmQgJ3knIGNvb3JkaW5hdGVzIG9mIC5vd2wtc3RhZ2VcclxuXHQgKi9cclxuICBwcmVwYXJlRHJhZ2dpbmcoZXZlbnQ6IGFueSk6IENvb3JkcyB7XHJcblx0XHRsZXQgc3RhZ2U6IENvb3JkcyA9IG51bGwsXHJcblx0XHRcdFx0dHJhbnNmb3JtQXJyOiBzdHJpbmdbXTtcclxuXHJcblx0XHQvLyBjb3VsZCBiZSA1IGNvbW1lbnRlZCBsaW5lcyBiZWxvdzsgSG93ZXZlciB0aGVyZSdzIHN0YWdlIHRyYW5zZm9ybSBpbiBzdGFnZURhdGEgYW5kIGluIHVwZGF0ZXMgYWZ0ZXIgZWFjaCBtb3ZlIG9mIHN0YWdlXHJcbiAgICAvLyBzdGFnZSA9IGdldENvbXB1dGVkU3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50KS50cmFuc2Zvcm0ucmVwbGFjZSgvLipcXCh8XFwpfCAvZywgJycpLnNwbGl0KCcsJyk7XHJcbiAgICAvLyBzdGFnZSA9IHtcclxuICAgIC8vICAgeDogc3RhZ2Vbc3RhZ2UubGVuZ3RoID09PSAxNiA/IDEyIDogNF0sXHJcbiAgICAvLyAgIHk6IHN0YWdlW3N0YWdlLmxlbmd0aCA9PT0gMTYgPyAxMyA6IDVdXHJcblx0XHQvLyB9O1xyXG5cclxuXHRcdHRyYW5zZm9ybUFyciA9IHRoaXMuc3RhZ2VEYXRhLnRyYW5zZm9ybS5yZXBsYWNlKC8uKlxcKHxcXCl8IHxbXiwtXFxkXVxcd3xcXCkvZywgJycpLnNwbGl0KCcsJyk7XHJcbiAgICBzdGFnZSA9IHtcclxuICAgICAgeDogK3RyYW5zZm9ybUFyclswXSxcclxuICAgICAgeTogK3RyYW5zZm9ybUFyclsxXVxyXG4gICAgfTtcclxuXHJcblx0XHRpZiAodGhpcy5pcygnYW5pbWF0aW5nJykpIHtcclxuXHRcdFx0dGhpcy5pbnZhbGlkYXRlKCdwb3NpdGlvbicpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChldmVudC50eXBlID09PSAnbW91c2Vkb3duJykge1xyXG4gICAgICB0aGlzLm93bERPTURhdGEuaXNHcmFiID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcblx0XHR0aGlzLnNwZWVkKDApO1xyXG5cdFx0cmV0dXJuIHN0YWdlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRW50ZXJzIGludG8gYSAnZHJhZ2dpbmcnIHN0YXRlXHJcblx0ICovXHJcblx0ZW50ZXJEcmFnZ2luZygpIHtcclxuXHRcdHRoaXMuZW50ZXIoJ2RyYWdnaW5nJyk7XHJcbiAgICB0aGlzLl90cmlnZ2VyKCdkcmFnJyk7XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBEZWZpbmVzIG5ldyBjb29yZHMgZm9yIC5vd2wtc3RhZ2Ugd2hpbGUgZHJhZ2dpbmcgaXRcclxuXHQgKiBAdG9kbyAjMjYxXHJcblx0ICogQHBhcmFtIGV2ZW50IHRoZSBldmVudCBhcmd1bWVudHMuXHJcblx0ICogQHBhcmFtIGRyYWdEYXRhIGluaXRpYWwgZGF0YSBnb3QgYWZ0ZXIgc3RhcnRpbmcgZHJhZ2dpbmdcclxuXHQgKiBAcmV0dXJucyBjb29yZHMgb3IgZmFsc2VcclxuXHQgKi9cclxuICBkZWZpbmVOZXdDb29yZHNEcmFnKGV2ZW50OiBhbnksIGRyYWdEYXRhOiBhbnkpOiBib29sZWFuIHwgQ29vcmRzIHtcclxuXHRcdGxldCBtaW5pbXVtID0gbnVsbCxcclxuXHRcdG1heGltdW0gPSBudWxsLFxyXG5cdFx0cHVsbCA9IG51bGw7XHJcblx0XHRjb25zdFx0ZGVsdGEgPSB0aGlzLmRpZmZlcmVuY2UoZHJhZ0RhdGEucG9pbnRlciwgdGhpcy5wb2ludGVyKGV2ZW50KSksXHJcblx0XHRcdHN0YWdlID0gdGhpcy5kaWZmZXJlbmNlKGRyYWdEYXRhLnN0YWdlLnN0YXJ0LCBkZWx0YSk7XHJcblxyXG5cdFx0aWYgKCF0aGlzLmlzKCdkcmFnZ2luZycpKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5sb29wKSB7XHJcblx0XHRcdG1pbmltdW0gPSB0aGlzLmNvb3JkaW5hdGVzKHRoaXMubWluaW11bSgpKTtcclxuXHRcdFx0bWF4aW11bSA9ICt0aGlzLmNvb3JkaW5hdGVzKHRoaXMubWF4aW11bSgpICsgMSkgLSBtaW5pbXVtO1xyXG5cdFx0XHRzdGFnZS54ID0gKCgoc3RhZ2UueCAtIG1pbmltdW0pICUgbWF4aW11bSArIG1heGltdW0pICUgbWF4aW11bSkgKyBtaW5pbXVtO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bWluaW11bSA9IHRoaXMuc2V0dGluZ3MucnRsID8gdGhpcy5jb29yZGluYXRlcyh0aGlzLm1heGltdW0oKSkgOiB0aGlzLmNvb3JkaW5hdGVzKHRoaXMubWluaW11bSgpKTtcclxuXHRcdFx0bWF4aW11bSA9IHRoaXMuc2V0dGluZ3MucnRsID8gdGhpcy5jb29yZGluYXRlcyh0aGlzLm1pbmltdW0oKSkgOiB0aGlzLmNvb3JkaW5hdGVzKHRoaXMubWF4aW11bSgpKTtcclxuXHRcdFx0cHVsbCA9IHRoaXMuc2V0dGluZ3MucHVsbERyYWcgPyAtMSAqIGRlbHRhLnggLyA1IDogMDtcclxuXHRcdFx0c3RhZ2UueCA9IE1hdGgubWF4KE1hdGgubWluKHN0YWdlLngsIG1pbmltdW0gKyBwdWxsKSwgbWF4aW11bSArIHB1bGwpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBzdGFnZTtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEZpbmlzaGVzIGRyYWdnaW5nIG9mIGNhcm91c2VsIHdoZW4gYHRvdWNoZW5kYCBhbmQgYG1vdXNldXBgIGV2ZW50cyBmaXJlLlxyXG5cdCAqIEB0b2RvICMyNjFcclxuXHQgKiBAdG9kbyBUaHJlc2hvbGQgZm9yIGNsaWNrIGV2ZW50XHJcblx0ICogQHBhcmFtIGV2ZW50IHRoZSBldmVudCBhcmd1bWVudHMuXHJcblx0ICogQHBhcmFtIGRyYWdPYmogdGhlIG9iamVjdCB3aXRoIGRyYWdnaW5nIHNldHRpbmdzIGFuZCBzdGF0ZXNcclxuXHQgKiBAcGFyYW0gY2xpY2tBdHRhY2hlciBmdW5jdGlvbiB3aGljaCBhdHRhY2hlcyBjbGljayBoYW5kbGVyIHRvIHNsaWRlIG9yIGl0cyBjaGlsZHJlbiBlbGVtZW50cyBpbiBvcmRlciB0byBwcmV2ZW50IGV2ZW50IGJ1YmxpbmdcclxuXHQgKi9cclxuICBmaW5pc2hEcmFnZ2luZyhldmVudDogYW55LCBkcmFnT2JqOiBhbnksIGNsaWNrQXR0YWNoZXI6ICgpID0+IHZvaWQpIHtcclxuXHRcdGNvbnN0IGRlbHRhID0gdGhpcy5kaWZmZXJlbmNlKGRyYWdPYmoucG9pbnRlciwgdGhpcy5wb2ludGVyKGV2ZW50KSksXHJcbiAgICAgICAgc3RhZ2UgPSBkcmFnT2JqLnN0YWdlLmN1cnJlbnQsXHJcblx0XHRcdFx0ZGlyZWN0aW9uID0gZGVsdGEueCA+ICt0aGlzLnNldHRpbmdzLnJ0bCA/ICdsZWZ0JyA6ICdyaWdodCc7XHJcblx0XHRsZXQgY3VycmVudFNsaWRlSTogbnVtYmVyLCBjdXJyZW50OiBudW1iZXIsIG5ld0N1cnJlbnQ6IG51bWJlcjtcclxuXHJcbiAgICAgIGlmIChkZWx0YS54ICE9PSAwICYmIHRoaXMuaXMoJ2RyYWdnaW5nJykgfHwgIXRoaXMuaXMoJ3ZhbGlkJykpIHtcclxuICAgICAgICB0aGlzLnNwZWVkKCt0aGlzLnNldHRpbmdzLmRyYWdFbmRTcGVlZCB8fCB0aGlzLnNldHRpbmdzLnNtYXJ0U3BlZWQpO1xyXG5cdFx0XHRcdGN1cnJlbnRTbGlkZUkgPSB0aGlzLmNsb3Nlc3Qoc3RhZ2UueCwgZGVsdGEueCAhPT0gMCA/IGRpcmVjdGlvbiA6IGRyYWdPYmouZGlyZWN0aW9uKTtcclxuXHRcdFx0XHRjdXJyZW50ID0gdGhpcy5jdXJyZW50KCk7XHJcbiAgICAgICAgbmV3Q3VycmVudCA9IHRoaXMuY3VycmVudChjdXJyZW50U2xpZGVJID09PSAtMSA/IHVuZGVmaW5lZCA6IGN1cnJlbnRTbGlkZUkpO1xyXG5cclxuXHRcdFx0XHRpZiAoY3VycmVudCAhPT0gbmV3Q3VycmVudCkge1xyXG5cdFx0XHRcdFx0dGhpcy5pbnZhbGlkYXRlKCdwb3NpdGlvbicpO1xyXG5cdFx0XHRcdFx0dGhpcy51cGRhdGUoKTtcclxuXHRcdFx0XHR9XHJcblxyXG4gICAgICAgIGRyYWdPYmouZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xyXG5cclxuICAgICAgICBpZiAoTWF0aC5hYnMoZGVsdGEueCkgPiAzIHx8IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gZHJhZ09iai50aW1lID4gMzAwKSB7XHJcblx0XHRcdFx0XHRjbGlja0F0dGFjaGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmICghdGhpcy5pcygnZHJhZ2dpbmcnKSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cdFx0XHR0aGlzLmxlYXZlKCdkcmFnZ2luZycpO1xyXG5cdFx0XHR0aGlzLl90cmlnZ2VyKCdkcmFnZ2VkJylcclxuXHQgfVxyXG5cclxuICAvKipcclxuXHQgKiBHZXRzIGFic29sdXRlIHBvc2l0aW9uIG9mIHRoZSBjbG9zZXN0IGl0ZW0gZm9yIGEgY29vcmRpbmF0ZS5cclxuXHQgKiBAdG9kbyBTZXR0aW5nIGBmcmVlRHJhZ2AgbWFrZXMgYGNsb3Nlc3RgIG5vdCByZXVzYWJsZS4gU2VlICMxNjUuXHJcblx0ICogQHBhcmFtIGNvb3JkaW5hdGUgVGhlIGNvb3JkaW5hdGUgaW4gcGl4ZWwuXHJcblx0ICogQHBhcmFtIGRpcmVjdGlvbiBUaGUgZGlyZWN0aW9uIHRvIGNoZWNrIGZvciB0aGUgY2xvc2VzdCBpdGVtLiBFdGhlciBgbGVmdGAgb3IgYHJpZ2h0YC5cclxuXHQgKiBAcmV0dXJucyBUaGUgYWJzb2x1dGUgcG9zaXRpb24gb2YgdGhlIGNsb3Nlc3QgaXRlbS5cclxuXHQgKi9cclxuICBjbG9zZXN0KGNvb3JkaW5hdGU6IG51bWJlciwgZGlyZWN0aW9uOiBzdHJpbmcpOiBudW1iZXIge1xyXG5cdFx0Y29uc3QgcHVsbCA9IDMwLFxyXG5cdFx0XHR3aWR0aCA9IHRoaXMud2lkdGgoKTtcclxuXHRcdGxldFx0Y29vcmRpbmF0ZXM6IG51bWJlcltdID0gdGhpcy5jb29yZGluYXRlcygpIGFzIG51bWJlcltdLFxyXG5cdFx0IHBvc2l0aW9uID0gLTE7XHJcblxyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3MuY2VudGVyKSB7XHJcblx0XHRcdGNvb3JkaW5hdGVzID0gY29vcmRpbmF0ZXMubWFwKGl0ZW0gPT4ge1xyXG5cdFx0XHRcdGlmIChpdGVtID09PSAwKSB7XHJcblx0XHRcdFx0XHRpdGVtICs9IDAuMDAwMDAxO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gaXRlbTtcclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHJcblx0XHQvLyBvcHRpb24gJ2ZyZWVEcmFnJyBkb2Vzbid0IGhhdmUgcmVhbGl6YXRpb24gYW5kIHVzaW5nIGl0IGhlcmUgY3JlYXRlcyBwcm9ibGVtOlxyXG5cdFx0Ly8gdmFyaWFibGUgJ3Bvc2l0aW9uJyBzdGF5cyB1bmNoYW5nZWQgKGl0IGVxdWFscyAtMSBhdCB0aGUgYmVnZ2luZykgYW5kIHRodXMgbWV0aG9kIHJldHVybnMgLTFcclxuXHRcdC8vIFJldHVybmluZyB2YWx1ZSBpcyBjb25zdW1lZCBieSBtZXRob2QgY3VycmVudCgpLCB3aGljaCB0YWtpbmcgLTEgYXMgYXJndW1lbnQgY2FsY3VsYXRlcyB0aGUgaW5kZXggb2YgbmV3IGN1cnJlbnQgc2xpZGVcclxuXHRcdC8vIEluIGNhc2Ugb2YgaGF2aW5nIDUgc2xpZGVzIGFucyAnbG9vcD1mYWxzZTsgY2FsbGluZyAnY3VycmVudCgtMSknIHNldHMgcHJvcHMgJ19jdXJyZW50JyBhcyA0LiBKdXN0IGxhc3Qgc2xpZGUgcmVtYWlucyB2aXNpYmxlIGluc3RlYWQgb2YgMyBsYXN0IHNsaWRlcy5cclxuXHJcblx0XHQvLyBpZiAoIXRoaXMuc2V0dGluZ3MuZnJlZURyYWcpIHtcclxuXHRcdFx0Ly8gY2hlY2sgY2xvc2VzdCBpdGVtXHJcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgY29vcmRpbmF0ZXMubGVuZ3RoOyBpKyspIHtcclxuXHJcblx0XHRcdFx0aWYgKGRpcmVjdGlvbiA9PT0gJ2xlZnQnICYmIGNvb3JkaW5hdGUgPiBjb29yZGluYXRlc1tpXSAtIHB1bGwgJiYgY29vcmRpbmF0ZSA8IGNvb3JkaW5hdGVzW2ldICsgcHVsbCkge1xyXG5cdFx0XHRcdFx0cG9zaXRpb24gPSBpO1xyXG5cdFx0XHRcdC8vIG9uIGEgcmlnaHQgcHVsbCwgY2hlY2sgb24gcHJldmlvdXMgaW5kZXhcclxuXHRcdFx0XHQvLyB0byBkbyBzbywgc3VidHJhY3Qgd2lkdGggZnJvbSB2YWx1ZSBhbmQgc2V0IHBvc2l0aW9uID0gaW5kZXggKyAxXHJcblx0XHRcdFx0fSBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICdyaWdodCcgJiYgY29vcmRpbmF0ZSA+IGNvb3JkaW5hdGVzW2ldIC0gd2lkdGggLSBwdWxsICYmIGNvb3JkaW5hdGUgPCBjb29yZGluYXRlc1tpXSAtIHdpZHRoICsgcHVsbCkge1xyXG5cdFx0XHRcdFx0cG9zaXRpb24gPSBpICsgMTtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKHRoaXMuX29wKGNvb3JkaW5hdGUsICc8JywgY29vcmRpbmF0ZXNbaV0pXHJcblx0XHRcdFx0XHQmJiB0aGlzLl9vcChjb29yZGluYXRlLCAnPicsIGNvb3JkaW5hdGVzW2kgKyAxXSB8fCBjb29yZGluYXRlc1tpXSAtIHdpZHRoKSkge1xyXG5cdFx0XHRcdFx0cG9zaXRpb24gPSBkaXJlY3Rpb24gPT09ICdsZWZ0JyA/IGkgKyAxIDogaTtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gbnVsbCAmJiBjb29yZGluYXRlID4gY29vcmRpbmF0ZXNbaV0gLSBwdWxsICYmIGNvb3JkaW5hdGUgPCBjb29yZGluYXRlc1tpXSArIHB1bGwpIHtcclxuXHRcdFx0XHRcdHBvc2l0aW9uID0gaTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChwb3NpdGlvbiAhPT0gLTEpIHsgYnJlYWsgfTtcclxuXHRcdFx0fVxyXG5cdFx0Ly8gfVxyXG5cclxuXHRcdGlmICghdGhpcy5zZXR0aW5ncy5sb29wKSB7XHJcblx0XHRcdC8vIG5vbiBsb29wIGJvdW5kcmllc1xyXG5cdFx0XHRpZiAodGhpcy5fb3AoY29vcmRpbmF0ZSwgJz4nLCBjb29yZGluYXRlc1t0aGlzLm1pbmltdW0oKV0pKSB7XHJcblx0XHRcdFx0cG9zaXRpb24gPSBjb29yZGluYXRlID0gdGhpcy5taW5pbXVtKCk7XHJcblx0XHRcdH0gZWxzZSBpZiAodGhpcy5fb3AoY29vcmRpbmF0ZSwgJzwnLCBjb29yZGluYXRlc1t0aGlzLm1heGltdW0oKV0pKSB7XHJcblx0XHRcdFx0cG9zaXRpb24gPSBjb29yZGluYXRlID0gdGhpcy5tYXhpbXVtKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcG9zaXRpb247XHJcblx0IH1cclxuXHJcbiAgLyoqXHJcblx0ICogQW5pbWF0ZXMgdGhlIHN0YWdlLlxyXG5cdCAqIEB0b2RvICMyNzBcclxuXHQgKiBAcGFyYW0gY29vcmRpbmF0ZSBUaGUgY29vcmRpbmF0ZSBpbiBwaXhlbHMuXHJcblx0ICovXHJcbiAgYW5pbWF0ZShjb29yZGluYXRlOiBudW1iZXIgfCBudW1iZXJbXSkge1xyXG5cdFx0Y29uc3QgYW5pbWF0ZSA9IHRoaXMuc3BlZWQoKSA+IDA7XHJcblxyXG5cdFx0aWYgKHRoaXMuaXMoJ2FuaW1hdGluZycpKSB7XHJcblx0XHRcdHRoaXMub25UcmFuc2l0aW9uRW5kKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGFuaW1hdGUpIHtcclxuXHRcdFx0dGhpcy5lbnRlcignYW5pbWF0aW5nJyk7XHJcblx0XHRcdHRoaXMuX3RyaWdnZXIoJ3RyYW5zbGF0ZScpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc3RhZ2VEYXRhLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgnICsgY29vcmRpbmF0ZSArICdweCwwcHgsMHB4KSc7XHJcblx0XHR0aGlzLnN0YWdlRGF0YS50cmFuc2l0aW9uID0gKHRoaXMuc3BlZWQoKSAvIDEwMDApICsgJ3MnO1xyXG5cclxuXHRcdC8vIGFsc28gdGhlcmUgd2FzIHRyYW5zaXRpb24gYnkgbWVhbnMgb2YgSlF1ZXJ5LmFuaW1hdGUgb3IgY3NzLWNoYW5naW5nIHByb3BlcnR5IGxlZnRcclxuXHQgfVxyXG5cclxuICAvKipcclxuXHQgKiBDaGVja3Mgd2hldGhlciB0aGUgY2Fyb3VzZWwgaXMgaW4gYSBzcGVjaWZpYyBzdGF0ZSBvciBub3QuXHJcblx0ICogQHBhcmFtIHN0YXRlIFRoZSBzdGF0ZSB0byBjaGVjay5cclxuXHQgKiBAcmV0dXJucyBUaGUgZmxhZyB3aGljaCBpbmRpY2F0ZXMgaWYgdGhlIGNhcm91c2VsIGlzIGJ1c3kuXHJcblx0ICovXHJcbiAgaXMoc3RhdGU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3N0YXRlcy5jdXJyZW50W3N0YXRlXSAmJiB0aGlzLl9zdGF0ZXMuY3VycmVudFtzdGF0ZV0gPiAwO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG5cdCAqIFNldHMgdGhlIGFic29sdXRlIHBvc2l0aW9uIG9mIHRoZSBjdXJyZW50IGl0ZW0uXHJcblx0ICogQHBhcmFtIHBvc2l0aW9uIFRoZSBuZXcgYWJzb2x1dGUgcG9zaXRpb24gb3Igbm90aGluZyB0byBsZWF2ZSBpdCB1bmNoYW5nZWQuXHJcblx0ICogQHJldHVybnMgVGhlIGFic29sdXRlIHBvc2l0aW9uIG9mIHRoZSBjdXJyZW50IGl0ZW0uXHJcblx0ICovXHJcbiAgY3VycmVudChwb3NpdGlvbj86IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRpZiAocG9zaXRpb24gPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5fY3VycmVudDtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5faXRlbXMubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdHJldHVybiB1bmRlZmluZWQ7XHJcblx0XHR9XHJcblxyXG5cdFx0cG9zaXRpb24gPSB0aGlzLm5vcm1hbGl6ZShwb3NpdGlvbik7XHJcblxyXG5cdFx0aWYgKHRoaXMuX2N1cnJlbnQgIT09IHBvc2l0aW9uKSB7XHJcblx0XHRcdGNvbnN0IGV2ZW50ID0gdGhpcy5fdHJpZ2dlcignY2hhbmdlJywgeyBwcm9wZXJ0eTogeyBuYW1lOiAncG9zaXRpb24nLCB2YWx1ZTogcG9zaXRpb24gfSB9KTtcclxuXHJcblx0XHRcdC8vIGlmIChldmVudC5kYXRhICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0Ly8gXHRwb3NpdGlvbiA9IHRoaXMubm9ybWFsaXplKGV2ZW50LmRhdGEpO1xyXG5cdFx0XHQvLyB9XHJcblxyXG5cdFx0XHR0aGlzLl9jdXJyZW50ID0gcG9zaXRpb247XHJcblxyXG5cdFx0XHR0aGlzLmludmFsaWRhdGUoJ3Bvc2l0aW9uJyk7XHJcblx0XHRcdHRoaXMuX3RyaWdnZXIoJ2NoYW5nZWQnLCB7IHByb3BlcnR5OiB7IG5hbWU6ICdwb3NpdGlvbicsIHZhbHVlOiB0aGlzLl9jdXJyZW50IH0gfSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX2N1cnJlbnQ7XHJcblx0IH1cclxuXHJcbiAgLyoqXHJcblx0ICogSW52YWxpZGF0ZXMgdGhlIGdpdmVuIHBhcnQgb2YgdGhlIHVwZGF0ZSByb3V0aW5lLlxyXG5cdCAqIEBwYXJhbSBwYXJ0IFRoZSBwYXJ0IHRvIGludmFsaWRhdGUuXHJcblx0ICogQHJldHVybnMgVGhlIGludmFsaWRhdGVkIHBhcnRzLlxyXG5cdCAqL1xyXG4gIGludmFsaWRhdGUocGFydDogc3RyaW5nKTogc3RyaW5nW10ge1xyXG5cdFx0aWYgKHR5cGVvZiBwYXJ0ID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aGlzLl9pbnZhbGlkYXRlZFtwYXJ0XSA9IHRydWU7XHJcblx0XHRcdGlmKHRoaXMuaXMoJ3ZhbGlkJykpIHsgdGhpcy5sZWF2ZSgndmFsaWQnKTsgfVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuX2ludmFsaWRhdGVkKTtcclxuICB9O1xyXG5cclxuXHQvKipcclxuXHQgKiBSZXNldHMgdGhlIGFic29sdXRlIHBvc2l0aW9uIG9mIHRoZSBjdXJyZW50IGl0ZW0uXHJcblx0ICogQHBhcmFtIHBvc2l0aW9uIHRoZSBhYnNvbHV0ZSBwb3NpdGlvbiBvZiB0aGUgbmV3IGl0ZW0uXHJcblx0ICovXHJcbiAgcmVzZXQocG9zaXRpb246IG51bWJlcikge1xyXG5cdFx0cG9zaXRpb24gPSB0aGlzLm5vcm1hbGl6ZShwb3NpdGlvbik7XHJcblxyXG5cdFx0aWYgKHBvc2l0aW9uID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX3NwZWVkID0gMDtcclxuXHRcdHRoaXMuX2N1cnJlbnQgPSBwb3NpdGlvbjtcclxuXHJcblx0XHR0aGlzLl9zdXBwcmVzcyhbICd0cmFuc2xhdGUnLCAndHJhbnNsYXRlZCcgXSk7XHJcblxyXG5cdFx0dGhpcy5hbmltYXRlKHRoaXMuY29vcmRpbmF0ZXMocG9zaXRpb24pKTtcclxuXHJcblx0XHR0aGlzLl9yZWxlYXNlKFsgJ3RyYW5zbGF0ZScsICd0cmFuc2xhdGVkJyBdKTtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIE5vcm1hbGl6ZXMgYW4gYWJzb2x1dGUgb3IgYSByZWxhdGl2ZSBwb3NpdGlvbiBvZiBhbiBpdGVtLlxyXG5cdCAqIEBwYXJhbSBwb3NpdGlvbiBUaGUgYWJzb2x1dGUgb3IgcmVsYXRpdmUgcG9zaXRpb24gdG8gbm9ybWFsaXplLlxyXG5cdCAqIEBwYXJhbSByZWxhdGl2ZSBXaGV0aGVyIHRoZSBnaXZlbiBwb3NpdGlvbiBpcyByZWxhdGl2ZSBvciBub3QuXHJcblx0ICogQHJldHVybnMgVGhlIG5vcm1hbGl6ZWQgcG9zaXRpb24uXHJcblx0ICovXHJcbiAgbm9ybWFsaXplKHBvc2l0aW9uOiBudW1iZXIsIHJlbGF0aXZlPzogYm9vbGVhbik6IG51bWJlciB7XHJcblx0XHRjb25zdCBuID0gdGhpcy5faXRlbXMubGVuZ3RoLFxyXG5cdFx0XHRcdFx0bSA9IHJlbGF0aXZlID8gMCA6IHRoaXMuX2Nsb25lcy5sZW5ndGg7XHJcblxyXG5cdFx0aWYgKCF0aGlzLl9pc051bWVyaWMocG9zaXRpb24pIHx8IG4gPCAxKSB7XHJcblx0XHRcdHBvc2l0aW9uID0gdW5kZWZpbmVkO1xyXG5cdFx0fSBlbHNlIGlmIChwb3NpdGlvbiA8IDAgfHwgcG9zaXRpb24gPj0gbiArIG0pIHtcclxuXHRcdFx0cG9zaXRpb24gPSAoKHBvc2l0aW9uIC0gbSAvIDIpICUgbiArIG4pICUgbiArIG0gLyAyO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBwb3NpdGlvbjtcclxuXHQgfVxyXG5cclxuICAvKipcclxuXHQgKiBDb252ZXJ0cyBhbiBhYnNvbHV0ZSBwb3NpdGlvbiBvZiBhbiBpdGVtIGludG8gYSByZWxhdGl2ZSBvbmUuXHJcblx0ICogQHBhcmFtIHBvc2l0aW9uIFRoZSBhYnNvbHV0ZSBwb3NpdGlvbiB0byBjb252ZXJ0LlxyXG5cdCAqIEByZXR1cm5zIFRoZSBjb252ZXJ0ZWQgcG9zaXRpb24uXHJcblx0ICovXHJcbiAgcmVsYXRpdmUocG9zaXRpb246IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRwb3NpdGlvbiAtPSB0aGlzLl9jbG9uZXMubGVuZ3RoIC8gMjtcclxuXHRcdHJldHVybiB0aGlzLm5vcm1hbGl6ZShwb3NpdGlvbiwgdHJ1ZSk7XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBHZXRzIHRoZSBtYXhpbXVtIHBvc2l0aW9uIGZvciB0aGUgY3VycmVudCBpdGVtLlxyXG5cdCAqIEBwYXJhbSByZWxhdGl2ZSBXaGV0aGVyIHRvIHJldHVybiBhbiBhYnNvbHV0ZSBwb3NpdGlvbiBvciBhIHJlbGF0aXZlIHBvc2l0aW9uLlxyXG5cdCAqIEByZXR1cm5zIG51bWJlciBvZiBtYXhpbXVtIHBvc2l0aW9uXHJcblx0ICovXHJcbiAgbWF4aW11bShyZWxhdGl2ZTogYm9vbGVhbiA9IGZhbHNlKTogbnVtYmVyIHtcclxuXHRcdGNvbnN0IHNldHRpbmdzID0gdGhpcy5zZXR0aW5ncztcclxuXHRcdGxldFx0bWF4aW11bSA9IHRoaXMuX2Nvb3JkaW5hdGVzLmxlbmd0aCxcclxuXHRcdFx0aXRlcmF0b3IsXHJcblx0XHRcdHJlY2lwcm9jYWxJdGVtc1dpZHRoLFxyXG5cdFx0XHRlbGVtZW50V2lkdGg7XHJcblxyXG5cdFx0aWYgKHNldHRpbmdzLmxvb3ApIHtcclxuXHRcdFx0bWF4aW11bSA9IHRoaXMuX2Nsb25lcy5sZW5ndGggLyAyICsgdGhpcy5faXRlbXMubGVuZ3RoIC0gMTtcclxuXHRcdH0gZWxzZSBpZiAoc2V0dGluZ3MuYXV0b1dpZHRoIHx8IHNldHRpbmdzLm1lcmdlKSB7XHJcblx0XHRcdGl0ZXJhdG9yID0gdGhpcy5faXRlbXMubGVuZ3RoO1xyXG5cdFx0XHRyZWNpcHJvY2FsSXRlbXNXaWR0aCA9IHRoaXMuc2xpZGVzRGF0YVstLWl0ZXJhdG9yXS53aWR0aDtcclxuXHRcdFx0ZWxlbWVudFdpZHRoID0gdGhpcy5fd2lkdGg7XHJcblx0XHRcdHdoaWxlIChpdGVyYXRvci0tKSB7XHJcblx0XHRcdFx0Ly8gaXQgY291bGQgYmUgdXNlIHRoaXMuX2l0ZW1zIGluc3RlYWQgb2YgdGhpcy5zbGlkZXNEYXRhO1xyXG5cdFx0XHRcdHJlY2lwcm9jYWxJdGVtc1dpZHRoICs9ICt0aGlzLnNsaWRlc0RhdGFbaXRlcmF0b3JdLndpZHRoICsgdGhpcy5zZXR0aW5ncy5tYXJnaW47XHJcblx0XHRcdFx0aWYgKHJlY2lwcm9jYWxJdGVtc1dpZHRoID4gZWxlbWVudFdpZHRoKSB7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0bWF4aW11bSA9IGl0ZXJhdG9yICsgMTtcclxuXHRcdH0gZWxzZSBpZiAoc2V0dGluZ3MuY2VudGVyKSB7XHJcblx0XHRcdG1heGltdW0gPSB0aGlzLl9pdGVtcy5sZW5ndGggLSAxO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bWF4aW11bSA9IHRoaXMuX2l0ZW1zLmxlbmd0aCAtIHNldHRpbmdzLml0ZW1zO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChyZWxhdGl2ZSkge1xyXG5cdFx0XHRtYXhpbXVtIC09IHRoaXMuX2Nsb25lcy5sZW5ndGggLyAyO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBNYXRoLm1heChtYXhpbXVtLCAwKTtcclxuXHQgfVxyXG5cclxuICAvKipcclxuXHQgKiBHZXRzIHRoZSBtaW5pbXVtIHBvc2l0aW9uIGZvciB0aGUgY3VycmVudCBpdGVtLlxyXG5cdCAqIEBwYXJhbSByZWxhdGl2ZSBXaGV0aGVyIHRvIHJldHVybiBhbiBhYnNvbHV0ZSBwb3NpdGlvbiBvciBhIHJlbGF0aXZlIHBvc2l0aW9uLlxyXG5cdCAqIEByZXR1cm5zIG51bWJlciBvZiBtaW5pbXVtIHBvc2l0aW9uXHJcblx0ICovXHJcbiAgbWluaW11bShyZWxhdGl2ZTogYm9vbGVhbiA9IGZhbHNlKTogbnVtYmVyIHtcclxuXHRcdHJldHVybiByZWxhdGl2ZSA/IDAgOiB0aGlzLl9jbG9uZXMubGVuZ3RoIC8gMjtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEdldHMgYW4gaXRlbSBhdCB0aGUgc3BlY2lmaWVkIHJlbGF0aXZlIHBvc2l0aW9uLlxyXG5cdCAqIEBwYXJhbSBwb3NpdGlvbiBUaGUgcmVsYXRpdmUgcG9zaXRpb24gb2YgdGhlIGl0ZW0uXHJcblx0ICogQHJldHVybnMgVGhlIGl0ZW0gYXQgdGhlIGdpdmVuIHBvc2l0aW9uIG9yIGFsbCBpdGVtcyBpZiBubyBwb3NpdGlvbiB3YXMgZ2l2ZW4uXHJcblx0ICovXHJcbiAgaXRlbXMocG9zaXRpb24/OiBudW1iZXIpOiBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlW10ge1xyXG5cdFx0aWYgKHBvc2l0aW9uID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuX2l0ZW1zLnNsaWNlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cG9zaXRpb24gPSB0aGlzLm5vcm1hbGl6ZShwb3NpdGlvbiwgdHJ1ZSk7XHJcblx0XHRyZXR1cm4gW3RoaXMuX2l0ZW1zW3Bvc2l0aW9uXV07XHJcblx0IH1cclxuXHJcbiAgLyoqXHJcblx0ICogR2V0cyBhbiBpdGVtIGF0IHRoZSBzcGVjaWZpZWQgcmVsYXRpdmUgcG9zaXRpb24uXHJcblx0ICogQHBhcmFtIHBvc2l0aW9uIFRoZSByZWxhdGl2ZSBwb3NpdGlvbiBvZiB0aGUgaXRlbS5cclxuXHQgKiBAcmV0dXJucyBUaGUgaXRlbSBhdCB0aGUgZ2l2ZW4gcG9zaXRpb24gb3IgYWxsIGl0ZW1zIGlmIG5vIHBvc2l0aW9uIHdhcyBnaXZlbi5cclxuXHQgKi9cclxuICBtZXJnZXJzKHBvc2l0aW9uOiBudW1iZXIpOiBudW1iZXIgfCBudW1iZXJbXSB7XHJcblx0XHRpZiAocG9zaXRpb24gPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5fbWVyZ2Vycy5zbGljZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHBvc2l0aW9uID0gdGhpcy5ub3JtYWxpemUocG9zaXRpb24sIHRydWUpO1xyXG5cdFx0cmV0dXJuIHRoaXMuX21lcmdlcnNbcG9zaXRpb25dO1xyXG5cdCB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEdldHMgdGhlIGFic29sdXRlIHBvc2l0aW9ucyBvZiBjbG9uZXMgZm9yIGFuIGl0ZW0uXHJcblx0ICogQHBhcmFtIHBvc2l0aW9uIFRoZSByZWxhdGl2ZSBwb3NpdGlvbiBvZiB0aGUgaXRlbS5cclxuXHQgKiBAcmV0dXJucyBUaGUgYWJzb2x1dGUgcG9zaXRpb25zIG9mIGNsb25lcyBmb3IgdGhlIGl0ZW0gb3IgYWxsIGlmIG5vIHBvc2l0aW9uIHdhcyBnaXZlbi5cclxuXHQgKi9cclxuICBjbG9uZXMocG9zaXRpb24/OiBudW1iZXIpOiBudW1iZXJbXSB7XHJcblx0XHRjb25zdCBvZGQgPSB0aGlzLl9jbG9uZXMubGVuZ3RoIC8gMixcclxuXHRcdFx0ZXZlbiA9IG9kZCArIHRoaXMuX2l0ZW1zLmxlbmd0aCxcclxuXHRcdFx0bWFwID0gaW5kZXggPT4gaW5kZXggJSAyID09PSAwID8gZXZlbiArIGluZGV4IC8gMiA6IG9kZCAtIChpbmRleCArIDEpIC8gMjtcclxuXHJcblx0XHRpZiAocG9zaXRpb24gPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5fY2xvbmVzLm1hcCgodiwgaSkgPT4gbWFwKGkpKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fY2xvbmVzLm1hcCgodiwgaSkgPT4gdiA9PT0gcG9zaXRpb24gPyBtYXAoaSkgOiBudWxsKS5maWx0ZXIoaXRlbSA9PiBpdGVtKTtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIFNldHMgdGhlIGN1cnJlbnQgYW5pbWF0aW9uIHNwZWVkLlxyXG5cdCAqIEBwYXJhbSBzcGVlZCBUaGUgYW5pbWF0aW9uIHNwZWVkIGluIG1pbGxpc2Vjb25kcyBvciBub3RoaW5nIHRvIGxlYXZlIGl0IHVuY2hhbmdlZC5cclxuXHQgKiBAcmV0dXJucyBUaGUgY3VycmVudCBhbmltYXRpb24gc3BlZWQgaW4gbWlsbGlzZWNvbmRzLlxyXG5cdCAqL1xyXG4gIHNwZWVkKHNwZWVkPzogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdGlmIChzcGVlZCAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHRoaXMuX3NwZWVkID0gc3BlZWQ7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX3NwZWVkO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogR2V0cyB0aGUgY29vcmRpbmF0ZSBvZiBhbiBpdGVtLlxyXG5cdCAqIEB0b2RvIFRoZSBuYW1lIG9mIHRoaXMgbWV0aG9kIGlzIG1pc3NsZWFuZGluZy5cclxuXHQgKiBAcGFyYW0gcG9zaXRpb24gVGhlIGFic29sdXRlIHBvc2l0aW9uIG9mIHRoZSBpdGVtIHdpdGhpbiBgbWluaW11bSgpYCBhbmQgYG1heGltdW0oKWAuXHJcblx0ICogQHJldHVybnMgVGhlIGNvb3JkaW5hdGUgb2YgdGhlIGl0ZW0gaW4gcGl4ZWwgb3IgYWxsIGNvb3JkaW5hdGVzLlxyXG5cdCAqL1xyXG4gIGNvb3JkaW5hdGVzKHBvc2l0aW9uPzogbnVtYmVyKTogbnVtYmVyIHwgbnVtYmVyW10ge1xyXG5cdFx0bGV0IG11bHRpcGxpZXIgPSAxLFxyXG5cdFx0XHRuZXdQb3NpdGlvbiA9IHBvc2l0aW9uIC0gMSxcclxuXHRcdFx0Y29vcmRpbmF0ZSxcclxuXHRcdFx0cmVzdWx0OiBudW1iZXJbXTtcclxuXHJcblx0XHRpZiAocG9zaXRpb24gPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXN1bHQgPSB0aGlzLl9jb29yZGluYXRlcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuY29vcmRpbmF0ZXMoaW5kZXgpIGFzIG51bWJlcjtcclxuXHRcdFx0fSk7XHJcblx0XHRcdHJldHVybiByZXN1bHQ7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3MuY2VudGVyKSB7XHJcblx0XHRcdGlmICh0aGlzLnNldHRpbmdzLnJ0bCkge1xyXG5cdFx0XHRcdG11bHRpcGxpZXIgPSAtMTtcclxuXHRcdFx0XHRuZXdQb3NpdGlvbiA9IHBvc2l0aW9uICsgMTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Y29vcmRpbmF0ZSA9IHRoaXMuX2Nvb3JkaW5hdGVzW3Bvc2l0aW9uXTtcclxuXHRcdFx0Y29vcmRpbmF0ZSArPSAodGhpcy53aWR0aCgpIC0gY29vcmRpbmF0ZSArICh0aGlzLl9jb29yZGluYXRlc1tuZXdQb3NpdGlvbl0gfHwgMCkpIC8gMiAqIG11bHRpcGxpZXI7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjb29yZGluYXRlID0gdGhpcy5fY29vcmRpbmF0ZXNbbmV3UG9zaXRpb25dIHx8IDA7XHJcblx0XHR9XHJcblxyXG5cdFx0Y29vcmRpbmF0ZSA9IE1hdGguY2VpbChjb29yZGluYXRlKTtcclxuXHJcblx0XHRyZXR1cm4gY29vcmRpbmF0ZTtcclxuXHQgfVxyXG5cclxuICAvKipcclxuXHQgKiBDYWxjdWxhdGVzIHRoZSBzcGVlZCBmb3IgYSB0cmFuc2xhdGlvbi5cclxuXHQgKiBAcGFyYW0gZnJvbSBUaGUgYWJzb2x1dGUgcG9zaXRpb24gb2YgdGhlIHN0YXJ0IGl0ZW0uXHJcblx0ICogQHBhcmFtIHRvIFRoZSBhYnNvbHV0ZSBwb3NpdGlvbiBvZiB0aGUgdGFyZ2V0IGl0ZW0uXHJcblx0ICogQHBhcmFtIGZhY3RvciBbZmFjdG9yPXVuZGVmaW5lZF0gLSBUaGUgdGltZSBmYWN0b3IgaW4gbWlsbGlzZWNvbmRzLlxyXG5cdCAqIEByZXR1cm5zIFRoZSB0aW1lIGluIG1pbGxpc2Vjb25kcyBmb3IgdGhlIHRyYW5zbGF0aW9uLlxyXG5cdCAqL1xyXG4gIHByaXZhdGUgX2R1cmF0aW9uKGZyb206IG51bWJlciwgdG86IG51bWJlciwgZmFjdG9yPzogbnVtYmVyIHwgYm9vbGVhbik6IG51bWJlciB7XHJcblx0XHRpZiAoZmFjdG9yID09PSAwKSB7XHJcblx0XHRcdHJldHVybiAwO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBNYXRoLm1pbihNYXRoLm1heChNYXRoLmFicyh0byAtIGZyb20pLCAxKSwgNikgKiBNYXRoLmFicygoK2ZhY3RvciB8fCB0aGlzLnNldHRpbmdzLnNtYXJ0U3BlZWQpKTtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIFNsaWRlcyB0byB0aGUgc3BlY2lmaWVkIGl0ZW0uXHJcblx0ICogQHBhcmFtIHBvc2l0aW9uIFRoZSBwb3NpdGlvbiBvZiB0aGUgaXRlbS5cclxuXHQgKiBAcGFyYW0gc3BlZWQgVGhlIHRpbWUgaW4gbWlsbGlzZWNvbmRzIGZvciB0aGUgdHJhbnNpdGlvbi5cclxuXHQgKi9cclxuICB0byhwb3NpdGlvbjogbnVtYmVyLCBzcGVlZDogbnVtYmVyIHwgYm9vbGVhbikge1xyXG5cdFx0bGV0IGN1cnJlbnQgPSB0aGlzLmN1cnJlbnQoKSxcclxuXHRcdFx0cmV2ZXJ0ID0gbnVsbCxcclxuXHRcdFx0ZGlzdGFuY2UgPSBwb3NpdGlvbiAtIHRoaXMucmVsYXRpdmUoY3VycmVudCksXHJcblx0XHRcdG1heGltdW0gPSB0aGlzLm1heGltdW0oKTtcclxuXHRcdGNvbnN0XHRkaXJlY3Rpb24gPSArKGRpc3RhbmNlID4gMCkgLSArKGRpc3RhbmNlIDwgMCksXHJcblx0XHRcdGl0ZW1zID0gdGhpcy5faXRlbXMubGVuZ3RoLFxyXG5cdFx0XHRtaW5pbXVtID0gdGhpcy5taW5pbXVtKCk7XHJcblxyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3MubG9vcCkge1xyXG5cdFx0XHRpZiAoIXRoaXMuc2V0dGluZ3MucmV3aW5kICYmIE1hdGguYWJzKGRpc3RhbmNlKSA+IGl0ZW1zIC8gMikge1xyXG5cdFx0XHRcdGRpc3RhbmNlICs9IGRpcmVjdGlvbiAqIC0xICogaXRlbXM7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHBvc2l0aW9uID0gY3VycmVudCArIGRpc3RhbmNlO1xyXG5cdFx0XHRyZXZlcnQgPSAoKHBvc2l0aW9uIC0gbWluaW11bSkgJSBpdGVtcyArIGl0ZW1zKSAlIGl0ZW1zICsgbWluaW11bTtcclxuXHJcblx0XHRcdGlmIChyZXZlcnQgIT09IHBvc2l0aW9uICYmIHJldmVydCAtIGRpc3RhbmNlIDw9IG1heGltdW0gJiYgcmV2ZXJ0IC0gZGlzdGFuY2UgPiAwKSB7XHJcblx0XHRcdFx0Y3VycmVudCA9IHJldmVydCAtIGRpc3RhbmNlO1xyXG5cdFx0XHRcdHBvc2l0aW9uID0gcmV2ZXJ0O1xyXG5cdFx0XHRcdHRoaXMucmVzZXQoY3VycmVudCk7XHJcblx0XHRcdFx0dGhpcy5zZW5kQ2hhbmdlcygpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2UgaWYgKHRoaXMuc2V0dGluZ3MucmV3aW5kKSB7XHJcblx0XHRcdG1heGltdW0gKz0gMTtcclxuXHRcdFx0cG9zaXRpb24gPSAocG9zaXRpb24gJSBtYXhpbXVtICsgbWF4aW11bSkgJSBtYXhpbXVtO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cG9zaXRpb24gPSBNYXRoLm1heChtaW5pbXVtLCBNYXRoLm1pbihtYXhpbXVtLCBwb3NpdGlvbikpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHR0aGlzLnNwZWVkKHRoaXMuX2R1cmF0aW9uKGN1cnJlbnQsIHBvc2l0aW9uLCBzcGVlZCkpO1xyXG5cdFx0XHR0aGlzLmN1cnJlbnQocG9zaXRpb24pO1xyXG5cclxuXHRcdFx0dGhpcy51cGRhdGUoKTtcclxuXHRcdH0sIDApO1xyXG5cclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIFNsaWRlcyB0byB0aGUgbmV4dCBpdGVtLlxyXG5cdCAqIEBwYXJhbSBzcGVlZCBUaGUgdGltZSBpbiBtaWxsaXNlY29uZHMgZm9yIHRoZSB0cmFuc2l0aW9uLlxyXG5cdCAqL1xyXG4gIG5leHQoc3BlZWQ6IG51bWJlciB8IGJvb2xlYW4pIHtcclxuXHRcdHNwZWVkID0gc3BlZWQgfHwgZmFsc2U7XHJcblx0XHR0aGlzLnRvKHRoaXMucmVsYXRpdmUodGhpcy5jdXJyZW50KCkpICsgMSwgc3BlZWQpO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogU2xpZGVzIHRvIHRoZSBwcmV2aW91cyBpdGVtLlxyXG5cdCAqIEBwYXJhbSBzcGVlZCBUaGUgdGltZSBpbiBtaWxsaXNlY29uZHMgZm9yIHRoZSB0cmFuc2l0aW9uLlxyXG5cdCAqL1xyXG4gIHByZXYoc3BlZWQ6IG51bWJlciB8IGJvb2xlYW4pIHtcclxuXHRcdHNwZWVkID0gc3BlZWQgfHwgZmFsc2U7XHJcblx0XHR0aGlzLnRvKHRoaXMucmVsYXRpdmUodGhpcy5jdXJyZW50KCkpIC0gMSwgc3BlZWQpO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogSGFuZGxlcyB0aGUgZW5kIG9mIGFuIGFuaW1hdGlvbi5cclxuXHQgKiBAcGFyYW0gZXZlbnQgLSBUaGUgZXZlbnQgYXJndW1lbnRzLlxyXG5cdCAqL1xyXG4gIG9uVHJhbnNpdGlvbkVuZChldmVudD86IGFueSkge1xyXG5cdFx0Ly8gaWYgY3NzMiBhbmltYXRpb24gdGhlbiBldmVudCBvYmplY3QgaXMgdW5kZWZpbmVkXHJcblx0XHRpZiAoZXZlbnQgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHQvLyBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcblx0XHRcdC8vIC8vIENhdGNoIG9ubHkgb3dsLXN0YWdlIHRyYW5zaXRpb25FbmQgZXZlbnRcclxuXHRcdFx0Ly8gaWYgKChldmVudC50YXJnZXQgfHwgZXZlbnQuc3JjRWxlbWVudCB8fCBldmVudC5vcmlnaW5hbFRhcmdldCkgIT09IHRoaXMuJHN0YWdlLmdldCgwKVx0KSB7XHJcblx0XHRcdC8vIFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHQvLyB9XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHRcdHRoaXMubGVhdmUoJ2FuaW1hdGluZycpO1xyXG5cdFx0dGhpcy5fdHJpZ2dlcigndHJhbnNsYXRlZCcpO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogR2V0cyB2aWV3cG9ydCB3aWR0aC5cclxuXHQgKiBAcmV0dXJucyAtIFRoZSB3aWR0aCBpbiBwaXhlbC5cclxuXHQgKi9cclxuICBwcml2YXRlIF92aWV3cG9ydCgpOiBudW1iZXIge1xyXG5cdFx0bGV0IHdpZHRoO1xyXG5cdFx0aWYgKHRoaXMuX3dpZHRoKSB7XHJcblx0XHRcdHdpZHRoID0gdGhpcy5fd2lkdGg7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjb25zb2xlLndhcm4oJ0NhbiBub3QgZGV0ZWN0IHZpZXdwb3J0IHdpZHRoLicpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHdpZHRoO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogU2V0cyBfaXRlbXNcclxuXHQgKiBAcGFyYW0gY29udGVudCBUaGUgbGlzdCBvZiBzbGlkZXMgcHV0IGludG8gQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZXMuXHJcblx0ICovXHJcbiAgc2V0SXRlbXMoY29udGVudDogQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZVtdKSB7XHJcblx0XHR0aGlzLl9pdGVtcyA9IGNvbnRlbnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHNsaWRlc0RhdGEgdXNpbmcgdGhpcy5faXRlbXNcclxuXHQgKi9cclxuXHRwcml2YXRlIF9kZWZpbmVTbGlkZXNEYXRhKCkge1xyXG5cdFx0Ly8gTWF5YmUgY3JlYXRpbmcgYW5kIHVzaW5nIGxvYWRNYXAgd291bGQgYmUgYmV0dGVyIGluIExhenlMb2FkU2VydmljZS5cclxuXHRcdC8vIEhvdmV3ZXIgaW4gdGhhdCBjYXNlIHdoZW4gJ3Jlc2l6ZScgZXZlbnQgZmlyZXMsIHByb3AgJ2xvYWQnIG9mIGFsbCBzbGlkZXMgd2lsbCBnZXQgJ2ZhbHNlJyBhbmQgc3VjaCBzdGF0ZSBvZiBwcm9wIHdpbGwgYmUgc2VlbiBieSBWaWV3IGR1cmluZyBpdHMgdXBkYXRpbmcuIEFjY29yZGluZ2x5IHRoZSBjb2RlIHdpbGwgcmVtb3ZlIHNsaWRlcydzIGNvbnRlbnQgZnJvbSBET00gZXZlbiBpZiBpdCB3YXMgbG9hZGVkIGJlZm9yZS5cclxuXHRcdC8vIFRodXMgaXQgd291bGQgYmUgbmVlZGVkIHRvIGFkZCB0aGF0IGNvbnRlbnQgaW50byBET00gYWdhaW4uXHJcblx0XHQvLyBJbiBvcmRlciB0byBhdm9pZCBhZGRpdGlvbmFsIHJlbW92aW5nL2FkZGluZyBsb2FkZWQgc2xpZGVzJ3MgY29udGVudCB3ZSB1c2UgbG9hZE1hcCBoZXJlIGFuZCBzZXQgcmVzdG9yZSBzdGF0ZSBvZiBwcm9wICdsb2FkJyBiZWZvcmUgdGhlIFZpZXcgd2lsbCBnZXQgaXQuXHJcblx0XHRsZXQgbG9hZE1hcDogTWFwPHN0cmluZywgYm9vbGVhbj47XHJcblxyXG5cdFx0aWYgKHRoaXMuc2xpZGVzRGF0YSAmJiB0aGlzLnNsaWRlc0RhdGEubGVuZ3RoKSB7XHJcblx0XHRcdGxvYWRNYXAgPSBuZXcgTWFwKCk7XHJcblx0XHRcdHRoaXMuc2xpZGVzRGF0YS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG5cdFx0XHRcdGlmIChpdGVtLmxvYWQpIHtcclxuXHRcdFx0XHRcdGxvYWRNYXAuc2V0KGl0ZW0uaWQsIGl0ZW0ubG9hZCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2xpZGVzRGF0YSA9IHRoaXMuX2l0ZW1zLm1hcChzbGlkZSA9PiB7XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0aWQ6IGAke3NsaWRlLmlkfWAsXHJcblx0XHRcdFx0aXNBY3RpdmU6IGZhbHNlLFxyXG5cdFx0XHRcdHRwbFJlZjogc2xpZGUudHBsUmVmLFxyXG5cdFx0XHRcdGRhdGFNZXJnZTogc2xpZGUuZGF0YU1lcmdlLFxyXG5cdFx0XHRcdHdpZHRoOiAwLFxyXG5cdFx0XHRcdGlzQ2xvbmVkOiBmYWxzZSxcclxuXHRcdFx0XHRsb2FkOiBsb2FkTWFwID8gbG9hZE1hcC5nZXQoc2xpZGUuaWQpIDogZmFsc2UsXHJcblx0XHRcdFx0aGFzaEZyYWdtZW50OiBzbGlkZS5kYXRhSGFzaFxyXG5cdFx0XHR9O1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIGN1cnJlbnQgY2xhc3NlcyBmb3Igc2xpZGVcclxuXHQgKiBAcGFyYW0gc2xpZGUgU2xpZGUgb2YgY2Fyb3VzZWxcclxuXHQgKiBAcmV0dXJucyBvYmplY3Qgd2l0aCBuYW1lcyBvZiBjc3MtY2xhc3NlcyB3aGljaCBhcmUga2V5cyBhbmQgdHJ1ZS9mYWxzZSB2YWx1ZXNcclxuXHQgKi9cclxuXHRzZXRDdXJTbGlkZUNsYXNzZXMoc2xpZGU6IFNsaWRlTW9kZWwpOiB7W2tleTogc3RyaW5nXTogYm9vbGVhbn0ge1xyXG5cdFx0Ly8gQ1NTIGNsYXNzZXM6IGFkZGVkL3JlbW92ZWQgcGVyIGN1cnJlbnQgc3RhdGUgb2YgY29tcG9uZW50IHByb3BlcnRpZXNcclxuXHRcdGNvbnN0IGN1cnJlbnRDbGFzc2VzOiB7W2tleTogc3RyaW5nXTogYm9vbGVhbn0gPSAge1xyXG5cdFx0XHQnYWN0aXZlJzogc2xpZGUuaXNBY3RpdmUsXHJcblx0XHRcdCdjZW50ZXInOiBzbGlkZS5pc0NlbnRlcmVkLFxyXG5cdFx0XHQnY2xvbmVkJzogc2xpZGUuaXNDbG9uZWQsXHJcblx0XHRcdCdhbmltYXRlZCc6IHNsaWRlLmlzQW5pbWF0ZWQsXHJcblx0XHRcdCdvd2wtYW5pbWF0ZWQtaW4nOiBzbGlkZS5pc0RlZkFuaW1hdGVkSW4sXHJcblx0XHRcdCdvd2wtYW5pbWF0ZWQtb3V0Jzogc2xpZGUuaXNEZWZBbmltYXRlZE91dFxyXG5cdFx0fTtcclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLmFuaW1hdGVJbikge1xyXG5cdFx0XHRjdXJyZW50Q2xhc3Nlc1t0aGlzLnNldHRpbmdzLmFuaW1hdGVJbiBhcyBzdHJpbmddID0gc2xpZGUuaXNDdXN0b21BbmltYXRlZEluO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3MuYW5pbWF0ZU91dCkge1xyXG5cdFx0XHRjdXJyZW50Q2xhc3Nlc1t0aGlzLnNldHRpbmdzLmFuaW1hdGVPdXQgYXMgc3RyaW5nXSA9IHNsaWRlLmlzQ3VzdG9tQW5pbWF0ZWRPdXQ7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gY3VycmVudENsYXNzZXM7XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBPcGVyYXRvcnMgdG8gY2FsY3VsYXRlIHJpZ2h0LXRvLWxlZnQgYW5kIGxlZnQtdG8tcmlnaHQuXHJcblx0ICogQHBhcmFtIGEgLSBUaGUgbGVmdCBzaWRlIG9wZXJhbmQuXHJcblx0ICogQHBhcmFtIG8gLSBUaGUgb3BlcmF0b3IuXHJcblx0ICogQHBhcmFtIGIgLSBUaGUgcmlnaHQgc2lkZSBvcGVyYW5kLlxyXG5cdCAqIEByZXR1cm5zIHRydWUvZmFsc2UgbWVhbmluZyByaWdodC10by1sZWZ0IG9yIGxlZnQtdG8tcmlnaHRcclxuXHQgKi9cclxuICBwcml2YXRlIF9vcChhOiBudW1iZXIsIG86IHN0cmluZywgYjogbnVtYmVyKTogYm9vbGVhbiB7XHJcblx0XHRjb25zdCBydGwgPSB0aGlzLnNldHRpbmdzLnJ0bDtcclxuXHRcdHN3aXRjaCAobykge1xyXG5cdFx0XHRjYXNlICc8JzpcclxuXHRcdFx0XHRyZXR1cm4gcnRsID8gYSA+IGIgOiBhIDwgYjtcclxuXHRcdFx0Y2FzZSAnPic6XHJcblx0XHRcdFx0cmV0dXJuIHJ0bCA/IGEgPCBiIDogYSA+IGI7XHJcblx0XHRcdGNhc2UgJz49JzpcclxuXHRcdFx0XHRyZXR1cm4gcnRsID8gYSA8PSBiIDogYSA+PSBiO1xyXG5cdFx0XHRjYXNlICc8PSc6XHJcblx0XHRcdFx0cmV0dXJuIHJ0bCA/IGEgPj0gYiA6IGEgPD0gYjtcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIFRyaWdnZXJzIGEgcHVibGljIGV2ZW50LlxyXG5cdCAqIEB0b2RvIFJlbW92ZSBgc3RhdHVzYCwgYHJlbGF0ZWRUYXJnZXRgIHNob3VsZCBiZSB1c2VkIGluc3RlYWQuXHJcblx0ICogQHBhcmFtIG5hbWUgVGhlIGV2ZW50IG5hbWUuXHJcblx0ICogQHBhcmFtIGRhdGEgVGhlIGV2ZW50IGRhdGEuXHJcblx0ICogQHBhcmFtIG5hbWVzcGFjZSBUaGUgZXZlbnQgbmFtZXNwYWNlLlxyXG5cdCAqIEBwYXJhbSBzdGF0ZSBUaGUgc3RhdGUgd2hpY2ggaXMgYXNzb2NpYXRlZCB3aXRoIHRoZSBldmVudC5cclxuXHQgKiBAcGFyYW0gZW50ZXIgSW5kaWNhdGVzIGlmIHRoZSBjYWxsIGVudGVycyB0aGUgc3BlY2lmaWVkIHN0YXRlIG9yIG5vdC5cclxuXHQgKi9cclxuICBwcml2YXRlIF90cmlnZ2VyKG5hbWU6IHN0cmluZywgZGF0YT86IGFueSwgbmFtZXNwYWNlPzogc3RyaW5nLCBzdGF0ZT86IHN0cmluZywgZW50ZXI/OiBib29sZWFuKSB7XHJcblx0XHRzd2l0Y2ggKG5hbWUpIHtcclxuXHRcdFx0Y2FzZSAnaW5pdGlhbGl6ZWQnOlxyXG5cdFx0XHRcdHRoaXMuX2luaXRpYWxpemVkQ2Fyb3VzZWwkLm5leHQobmFtZSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ2NoYW5nZSc6XHJcblx0XHRcdFx0dGhpcy5fY2hhbmdlU2V0dGluZ3NDYXJvdXNlbCQubmV4dChkYXRhKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnY2hhbmdlZCc6XHJcblx0XHRcdFx0dGhpcy5fY2hhbmdlZFNldHRpbmdzQ2Fyb3VzZWwkLm5leHQoZGF0YSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ2RyYWcnOlxyXG5cdFx0XHRcdHRoaXMuX2RyYWdDYXJvdXNlbCQubmV4dChuYW1lKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnZHJhZ2dlZCc6XHJcblx0XHRcdFx0dGhpcy5fZHJhZ2dlZENhcm91c2VsJC5uZXh0KG5hbWUpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdyZXNpemUnOlxyXG5cdFx0XHRcdHRoaXMuX3Jlc2l6ZUNhcm91c2VsJC5uZXh0KG5hbWUpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdyZXNpemVkJzpcclxuXHRcdFx0XHR0aGlzLl9yZXNpemVkQ2Fyb3VzZWwkLm5leHQobmFtZSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ3JlZnJlc2gnOlxyXG5cdFx0XHRcdHRoaXMuX3JlZnJlc2hDYXJvdXNlbCQubmV4dChuYW1lKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAncmVmcmVzaGVkJzpcclxuXHRcdFx0XHR0aGlzLl9yZWZyZXNoZWRDYXJvdXNlbCQubmV4dChuYW1lKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAndHJhbnNsYXRlJzpcclxuXHRcdFx0XHR0aGlzLl90cmFuc2xhdGVDYXJvdXNlbCQubmV4dChuYW1lKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAndHJhbnNsYXRlZCc6XHJcblx0XHRcdFx0dGhpcy5fdHJhbnNsYXRlZENhcm91c2VsJC5uZXh0KG5hbWUpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEVudGVycyBhIHN0YXRlLlxyXG5cdCAqIEBwYXJhbSBuYW1lIC0gVGhlIHN0YXRlIG5hbWUuXHJcblx0ICovXHJcbiAgZW50ZXIobmFtZTogc3RyaW5nKSB7XHJcbiAgICBbIG5hbWUgXS5jb25jYXQodGhpcy5fc3RhdGVzLnRhZ3NbbmFtZV0gfHwgW10pLmZvckVhY2goKHN0YXRlTmFtZSkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5fc3RhdGVzLmN1cnJlbnRbc3RhdGVOYW1lXSA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0dGhpcy5fc3RhdGVzLmN1cnJlbnRbc3RhdGVOYW1lXSA9IDA7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuX3N0YXRlcy5jdXJyZW50W3N0YXRlTmFtZV0rKztcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG5cdCAqIExlYXZlcyBhIHN0YXRlLlxyXG5cdCAqIEBwYXJhbSBuYW1lIC0gVGhlIHN0YXRlIG5hbWUuXHJcblx0ICovXHJcblx0bGVhdmUobmFtZTogc3RyaW5nKSB7XHJcbiAgICBbIG5hbWUgXS5jb25jYXQodGhpcy5fc3RhdGVzLnRhZ3NbbmFtZV0gfHwgW10pLmZvckVhY2goKHN0YXRlTmFtZSkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5fc3RhdGVzLmN1cnJlbnRbc3RhdGVOYW1lXSA9PT0gMCB8fCAhIXRoaXMuX3N0YXRlcy5jdXJyZW50W3N0YXRlTmFtZV0pIHtcclxuICAgICAgICB0aGlzLl9zdGF0ZXMuY3VycmVudFtzdGF0ZU5hbWVdLS07XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcblx0ICogUmVnaXN0ZXJzIGFuIGV2ZW50IG9yIHN0YXRlLlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgLSBUaGUgZXZlbnQgb3Igc3RhdGUgdG8gcmVnaXN0ZXIuXHJcblx0ICovXHJcbiAgcmVnaXN0ZXIob2JqZWN0OiBhbnkpIHtcclxuXHRcdGlmIChvYmplY3QudHlwZSA9PT0gVHlwZS5TdGF0ZSkge1xyXG5cdFx0XHRpZiAoIXRoaXMuX3N0YXRlcy50YWdzW29iamVjdC5uYW1lXSkge1xyXG5cdFx0XHRcdHRoaXMuX3N0YXRlcy50YWdzW29iamVjdC5uYW1lXSA9IG9iamVjdC50YWdzO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuX3N0YXRlcy50YWdzW29iamVjdC5uYW1lXSA9IHRoaXMuX3N0YXRlcy50YWdzW29iamVjdC5uYW1lXS5jb25jYXQob2JqZWN0LnRhZ3MpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLl9zdGF0ZXMudGFnc1tvYmplY3QubmFtZV0gPSB0aGlzLl9zdGF0ZXMudGFnc1tvYmplY3QubmFtZV0uZmlsdGVyKCh0YWcsIGkpID0+IHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5fc3RhdGVzLnRhZ3Nbb2JqZWN0Lm5hbWVdLmluZGV4T2YodGFnKSA9PT0gaTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBTdXBwcmVzc2VzIGV2ZW50cy5cclxuXHQgKiBAcGFyYW0gZXZlbnRzIFRoZSBldmVudHMgdG8gc3VwcHJlc3MuXHJcblx0ICovXHJcbiAgcHJpdmF0ZSBfc3VwcHJlc3MoZXZlbnRzOiBzdHJpbmdbXSkge1xyXG5cdFx0ZXZlbnRzLmZvckVhY2goZXZlbnQgPT4ge1xyXG5cdFx0XHR0aGlzLl9zdXByZXNzW2V2ZW50XSA9IHRydWU7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIFJlbGVhc2VzIHN1cHByZXNzZWQgZXZlbnRzLlxyXG5cdCAqIEBwYXJhbSBldmVudHMgVGhlIGV2ZW50cyB0byByZWxlYXNlLlxyXG5cdCAqL1xyXG4gIHByaXZhdGUgX3JlbGVhc2UoZXZlbnRzOiBzdHJpbmdbXSkge1xyXG5cdFx0ZXZlbnRzLmZvckVhY2goZXZlbnQgPT4ge1xyXG5cdFx0XHRkZWxldGUgdGhpcy5fc3VwcmVzc1tldmVudF07XHJcblx0XHR9KTtcclxuXHQgfVxyXG5cclxuICAvKipcclxuXHQgKiBHZXRzIHVuaWZpZWQgcG9pbnRlciBjb29yZGluYXRlcyBmcm9tIGV2ZW50LlxyXG5cdCAqIEB0b2RvICMyNjFcclxuXHQgKiBAcGFyYW0gZXZlbnQgVGhlIGBtb3VzZWRvd25gIG9yIGB0b3VjaHN0YXJ0YCBldmVudC5cclxuXHQgKiBAcmV0dXJucyBPYmplY3QgQ29vcmRzIHdoaWNoIGNvbnRhaW5zIGB4YCBhbmQgYHlgIGNvb3JkaW5hdGVzIG9mIGN1cnJlbnQgcG9pbnRlciBwb3NpdGlvbi5cclxuXHQgKi9cclxuXHRwb2ludGVyKGV2ZW50OiBhbnkpOiBDb29yZHMge1xyXG5cdFx0Y29uc3QgcmVzdWx0ID0geyB4OiBudWxsLCB5OiBudWxsIH07XHJcblxyXG5cdFx0ZXZlbnQgPSBldmVudC5vcmlnaW5hbEV2ZW50IHx8IGV2ZW50IHx8IHdpbmRvdy5ldmVudDtcclxuXHJcblx0XHRldmVudCA9IGV2ZW50LnRvdWNoZXMgJiYgZXZlbnQudG91Y2hlcy5sZW5ndGggP1xyXG5cdFx0XHRldmVudC50b3VjaGVzWzBdIDogZXZlbnQuY2hhbmdlZFRvdWNoZXMgJiYgZXZlbnQuY2hhbmdlZFRvdWNoZXMubGVuZ3RoID9cclxuXHRcdFx0XHRldmVudC5jaGFuZ2VkVG91Y2hlc1swXSA6IGV2ZW50O1xyXG5cclxuXHRcdGlmIChldmVudC5wYWdlWCkge1xyXG5cdFx0XHRyZXN1bHQueCA9IGV2ZW50LnBhZ2VYO1xyXG5cdFx0XHRyZXN1bHQueSA9IGV2ZW50LnBhZ2VZO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmVzdWx0LnggPSBldmVudC5jbGllbnRYO1xyXG5cdFx0XHRyZXN1bHQueSA9IGV2ZW50LmNsaWVudFk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHQgfVxyXG5cclxuICAvKipcclxuXHQgKiBEZXRlcm1pbmVzIGlmIHRoZSBpbnB1dCBpcyBhIE51bWJlciBvciBzb21ldGhpbmcgdGhhdCBjYW4gYmUgY29lcmNlZCB0byBhIE51bWJlclxyXG5cdCAqIEBwYXJhbSBudW1iZXIgVGhlIGlucHV0IHRvIGJlIHRlc3RlZFxyXG5cdCAqIEByZXR1cm5zIEFuIGluZGljYXRpb24gaWYgdGhlIGlucHV0IGlzIGEgTnVtYmVyIG9yIGNhbiBiZSBjb2VyY2VkIHRvIGEgTnVtYmVyXHJcblx0ICovXHJcbiAgcHJpdmF0ZSBfaXNOdW1lcmljKG51bWJlcjogYW55KTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQobnVtYmVyKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdmFsdWUgaXMgbnVtYmVyIG9yIGJvb2xlYW4gdHlwZVxyXG5cdCAqIEBwYXJhbSB2YWx1ZSBUaGUgaW5wdXQgdG8gYmUgdGVzdGVkXHJcblx0ICogQHJldHVybnMgQW4gaW5kaWNhdGlvbiBpZiB0aGUgaW5wdXQgaXMgYSBOdW1iZXIgb3IgY2FuIGJlIGNvZXJjZWQgdG8gYSBOdW1iZXIsIG9yIEJvb2xlYW5cclxuXHQgKi9cclxuXHRwcml2YXRlIF9pc051bWJlck9yQm9vbGVhbih2YWx1ZTogbnVtYmVyIHwgYm9vbGVhbik6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2lzTnVtZXJpYyh2YWx1ZSkgfHwgdHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbic7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdmFsdWUgaXMgbnVtYmVyIG9yIHN0cmluZyB0eXBlXHJcblx0ICogQHBhcmFtIHZhbHVlIFRoZSBpbnB1dCB0byBiZSB0ZXN0ZWRcclxuXHQgKiBAcmV0dXJucyBBbiBpbmRpY2F0aW9uIGlmIHRoZSBpbnB1dCBpcyBhIE51bWJlciBvciBjYW4gYmUgY29lcmNlZCB0byBhIE51bWJlciwgb3IgU3RyaW5nXHJcblx0ICovXHJcblx0cHJpdmF0ZSBfaXNOdW1iZXJPclN0cmluZyh2YWx1ZTogbnVtYmVyIHwgc3RyaW5nKTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gdGhpcy5faXNOdW1lcmljKHZhbHVlKSB8fCB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRGV0ZXJtaW5lcyB3aGV0aGVyIHZhbHVlIGlzIG51bWJlciBvciBzdHJpbmcgdHlwZVxyXG5cdCAqIEBwYXJhbSB2YWx1ZSBUaGUgaW5wdXQgdG8gYmUgdGVzdGVkXHJcblx0ICogQHJldHVybnMgQW4gaW5kaWNhdGlvbiBpZiB0aGUgaW5wdXQgaXMgYSBOdW1iZXIgb3IgY2FuIGJlIGNvZXJjZWQgdG8gYSBOdW1iZXIsIG9yIFN0cmluZ1xyXG5cdCAqL1xyXG5cdHByaXZhdGUgX2lzU3RyaW5nT3JCb29sZWFuKHZhbHVlOiBudW1iZXIgfCBzdHJpbmcpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogR2V0cyB0aGUgZGlmZmVyZW5jZSBvZiB0d28gdmVjdG9ycy5cclxuXHQgKiBAdG9kbyAjMjYxXHJcblx0ICogQHBhcmFtIGZpcnN0IFRoZSBmaXJzdCB2ZWN0b3IuXHJcblx0ICogQHBhcmFtIHNlY29uZC0gVGhlIHNlY29uZCB2ZWN0b3IuXHJcblx0ICogQHJldHVybnMgVGhlIGRpZmZlcmVuY2UuXHJcblx0ICovXHJcbiAgZGlmZmVyZW5jZShmaXJzdDogQ29vcmRzLCBzZWNvbmQ6IENvb3Jkcyk6IENvb3JkcyB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHR4OiBmaXJzdC54IC0gc2Vjb25kLngsXHJcblx0XHRcdHk6IGZpcnN0LnkgLSBzZWNvbmQueVxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG59XHJcbiJdfQ==