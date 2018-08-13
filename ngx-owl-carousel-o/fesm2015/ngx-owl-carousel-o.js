import { EventManager } from '@angular/platform-browser';
import { Subject, merge } from 'rxjs';
import { Injectable, InjectionToken, PLATFORM_ID, Inject, Component, Input, Output, Directive, ContentChildren, TemplateRef, ElementRef, EventEmitter, NgZone, HostListener, Renderer2, NgModule } from '@angular/core';
import { tap, filter, delay, first } from 'rxjs/operators';
import { isPlatformBrowser, CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ResizeService {
    /**
     * @param {?} eventManager
     */
    constructor(eventManager) {
        this.eventManager = eventManager;
        this.resizeSubject = new Subject();
        this.eventManager.addGlobalEventListener('window', 'resize', this.onResize.bind(this));
        this.eventManager.addGlobalEventListener('window', 'onload', this.onLoaded.bind(this));
    }
    /**
     * Makes resizeSubject become Observable
     * @return {?} Observable of resizeSubject
     */
    get onResize$() {
        return this.resizeSubject.asObservable();
    }
    /**
     * Handler of 'resize' event. Passes data throw resizeSubject
     * @param {?} event Event Object of 'resize' event
     * @return {?}
     */
    onResize(event) {
        this.resizeSubject.next(/** @type {?} */ (event.target));
    }
    /**
     * Handler of 'onload' event. Defines the width of window
     * @param {?} event Event Object of 'onload' event
     * @return {?}
     */
    onLoaded(event) {
        this.windowWidth = /** @type {?} */ (event.target);
    }
}
ResizeService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ResizeService.ctorParameters = () => [
    { type: EventManager }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class OwlCarouselOConfig {
    constructor() {
        this.items = 3;
        this.loop = false;
        this.center = false;
        this.rewind = false;
        this.mouseDrag = true;
        this.touchDrag = true;
        this.pullDrag = true;
        this.freeDrag = false;
        this.margin = 0;
        this.stagePadding = 0;
        this.merge = false;
        this.mergeFit = true;
        this.autoWidth = false;
        this.startPosition = 0;
        this.rtl = false;
        this.smartSpeed = 250;
        this.fluidSpeed = false;
        this.dragEndSpeed = false;
        this.responsive = {};
        this.responsiveRefreshRate = 200;
        // defaults to Navigation
        this.nav = false;
        this.navText = ['prev', 'next'];
        this.navSpeed = false;
        this.slideBy = 1;
        this.dots = true;
        this.dotsEach = false;
        this.dotsData = false;
        this.dotsSpeed = false;
    }
}
class OwlOptionsMockedTypes {
    constructor() {
        this.items = 'number';
        this.loop = 'boolean';
        this.center = 'boolean';
        this.rewind = 'boolean';
        this.mouseDrag = 'boolean';
        this.touchDrag = 'boolean';
        this.pullDrag = 'boolean';
        this.freeDrag = 'boolean';
        this.margin = 'number';
        this.stagePadding = 'number';
        this.merge = 'boolean';
        this.mergeFit = 'boolean';
        this.autoWidth = 'boolean';
        this.startPosition = 'number';
        this.rtl = 'boolean';
        this.smartSpeed = 'number';
        this.fluidSpeed = 'boolean';
        this.dragEndSpeed = 'number|boolean';
        this.responsive = {};
        this.responsiveRefreshRate = 'number';
        // defaults to Navigation
        this.nav = 'boolean';
        this.navText = 'string[]';
        this.navSpeed = 'number|boolean';
        this.slideBy = 'number|string';
        this.dots = 'boolean';
        this.dotsEach = 'number|boolean';
        this.dotsData = 'boolean';
        this.dotsSpeed = 'number|boolean';
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @enum {string} */
const Type = {
    Event: 'event',
    State: 'state',
};
/** @enum {string} */
const Width = {
    Default: 'default',
    Inner: 'inner',
    Outer: 'outer',
};
class CarouselService {
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
                    let merge$$1 = null;
                    /** @type {?} */
                    let iterator = this._items.length;
                    cache.items = {
                        merge: false,
                        width: width
                    };
                    while (iterator--) {
                        merge$$1 = this._mergers[iterator];
                        merge$$1 = this.settings.mergeFit && Math.min(merge$$1, this.settings.items) || merge$$1;
                        cache.items.merge = merge$$1 > 1 || cache.items.merge;
                        widths[iterator] = !grid ? this._items[iterator].width ? this._items[iterator].width : width : width * merge$$1;
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
        const filter$$1 = item => this._invalidated[item];
        /** @type {?} */
        const cache = {};
        while (i < n) {
            /** @type {?} */
            const filteredPipe = this._pipe[i].filter.filter(filter$$1);
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
    difference(first$$1, second) {
        return {
            x: first$$1.x - second.x,
            y: first$$1.y - second.y
        };
    }
}
CarouselService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
CarouselService.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NavigationService {
    /**
     * @param {?} carouselService
     */
    constructor(carouselService) {
        this.carouselService = carouselService;
        /**
         * Indicates whether the plugin is initialized or not.
         */
        this._initialized = false;
        /**
         * The current paging indexes.
         */
        this._pages = [];
        /**
         * Data for navigation elements of the user interface.
         */
        this._navData = {
            disabled: false,
            prev: {
                disabled: false,
                htmlText: ''
            },
            next: {
                disabled: false,
                htmlText: ''
            },
        };
        /**
         * Data for dot elements of the user interface.
         */
        this._dotsData = {
            disabled: false,
            dots: []
        };
        this.spyDataStreams();
    }
    /**
     * Defines Observables which service must observe
     * @return {?}
     */
    spyDataStreams() {
        /** @type {?} */
        const initializedCarousel$ = this.carouselService.getInitializedState().pipe(tap(state => {
            this.initialize();
            this._updateNavPages();
            this.draw();
            this.update();
            this.carouselService.sendChanges();
        }));
        /** @type {?} */
        const changedSettings$ = this.carouselService.getChangedState().pipe(filter(data => data.property.name === 'position'), tap(data => {
            this.update();
            // should be the call of the function written at the end of comment
            // but the method carouselServive.to() has setTimeout(f, 0) which contains carouselServive.update() which calls sendChanges() method.
            // carouselService.navData and carouselService.dotsData update earlier than carouselServive.update() gets called
            // updates of carouselService.navData and carouselService.dotsData are being happening withing carouselService.current(position) method which calls next() of _changedSettingsCarousel$
            // carouselService.current(position) is being calling earlier than carouselServive.update();
            // this.carouselService.sendChanges();
        }));
        /** @type {?} */
        const refreshedCarousel$ = this.carouselService.getRefreshedState().pipe(tap(() => {
            this._updateNavPages();
            this.draw();
            this.update();
            this.carouselService.sendChanges();
        }));
        /** @type {?} */
        const navMerge$ = merge(initializedCarousel$, changedSettings$, refreshedCarousel$);
        this.navSubscription = navMerge$.subscribe(() => { });
    }
    /**
     * Initializes the layout of the plugin and extends the carousel.
     * @return {?}
     */
    initialize() {
        this._navData.disabled = true;
        this._navData.prev.htmlText = this.carouselService.settings.navText[0];
        this._navData.next.htmlText = this.carouselService.settings.navText[1];
        this._dotsData.disabled = true;
        this.carouselService.navData = this._navData;
        this.carouselService.dotsData = this._dotsData;
    }
    /**
     * Calculates internal states and updates prop _pages
     * @return {?}
     */
    _updateNavPages() {
        /** @type {?} */
        let i;
        /** @type {?} */
        let j;
        /** @type {?} */
        let k;
        /** @type {?} */
        const lower = this.carouselService.clones().length / 2;
        /** @type {?} */
        const upper = lower + this.carouselService.items().length;
        /** @type {?} */
        const maximum = this.carouselService.maximum(true);
        /** @type {?} */
        const pages = [];
        /** @type {?} */
        const settings = this.carouselService.settings;
        /** @type {?} */
        let size = settings.center || settings.autoWidth || settings.dotsData
            ? 1 : settings.dotsEach || settings.items;
        size = +size;
        if (settings.slideBy !== 'page') {
            settings.slideBy = Math.min(+settings.slideBy, settings.items);
        }
        if (settings.dots || settings.slideBy === 'page') {
            for (i = lower, j = 0, k = 0; i < upper; i++) {
                if (j >= size || j === 0) {
                    pages.push({
                        start: Math.min(maximum, i - lower),
                        end: i - lower + size - 1
                    });
                    if (Math.min(maximum, i - lower) === maximum) {
                        break;
                    }
                    j = 0, ++k;
                }
                j += /** @type {?} */ (this.carouselService.mergers(this.carouselService.relative(i)));
            }
        }
        this._pages = pages;
    }
    /**
     * Draws the user interface.
     * \@todo The option `dotsData` wont work.
     * @return {?}
     */
    draw() {
        /** @type {?} */
        let difference;
        /** @type {?} */
        const settings = this.carouselService.settings;
        /** @type {?} */
        const items = this.carouselService.items();
        /** @type {?} */
        const disabled = items.length <= settings.items;
        this._navData.disabled = !settings.nav || disabled;
        this._dotsData.disabled = !settings.dots || disabled;
        if (settings.dots) {
            difference = this._pages.length - this._dotsData.dots.length;
            if (settings.dotsData && difference !== 0) {
                this._dotsData.dots = [];
                items.forEach(item => {
                    this._dotsData.dots.push({
                        active: false,
                        id: `dot-${item.id}`,
                        innerContent: item.dotContent,
                        showInnerContent: true
                    });
                });
            }
            else if (difference > 0) {
                /** @type {?} */
                const startI = this._dotsData.dots.length > 0 ? this._dotsData.dots.length : 0;
                for (let i = 0; i < difference; i++) {
                    this._dotsData.dots.push({
                        active: false,
                        id: `dot-${i + startI}`,
                        showInnerContent: false
                    });
                }
            }
            else if (difference < 0) {
                this._dotsData.dots.splice(difference, Math.abs(difference));
            }
        }
        this.carouselService.navData = this._navData;
        this.carouselService.dotsData = this._dotsData;
    }
    ;
    /**
     * Updates navigation buttons's and dots's states
     * @return {?}
     */
    update() {
        this._updateNavButtons();
        this._updateDots();
    }
    /**
     * Changes state of nav buttons (disabled, enabled)
     * @return {?}
     */
    _updateNavButtons() {
        /** @type {?} */
        const settings = this.carouselService.settings;
        /** @type {?} */
        const loop = settings.loop || settings.rewind;
        /** @type {?} */
        const index = this.carouselService.relative(this.carouselService.current());
        if (settings.nav) {
            this._navData.prev.disabled = !loop && index <= this.carouselService.minimum(true);
            this._navData.next.disabled = !loop && index >= this.carouselService.maximum(true);
        }
        this.carouselService.navData = this._navData;
    }
    /**
     * Changes active dot if page becomes changed
     * @return {?}
     */
    _updateDots() {
        /** @type {?} */
        let curActiveDotI;
        this._dotsData.dots.forEach(item => {
            if (item.active === true) {
                item.active = false;
            }
        });
        curActiveDotI = this._current();
        if (this._dotsData.dots.length) {
            this._dotsData.dots[curActiveDotI].active = true;
        }
        this.carouselService.dotsData = this._dotsData;
    }
    /**
     * Gets the current page position of the carousel.
     * @return {?} the current page position of the carousel
     */
    _current() {
        /** @type {?} */
        const current = this.carouselService.relative(this.carouselService.current());
        /** @type {?} */
        let finalCurrent;
        /** @type {?} */
        const pages = this._pages.filter((page, index) => {
            return page.start <= current && page.end >= current;
        }).pop();
        finalCurrent = this._pages.findIndex(page => {
            return page.start === pages.start && page.end === pages.end;
        });
        return finalCurrent;
    }
    ;
    /**
     * Gets the current succesor/predecessor position.
     * @param {?} successor
     * @return {?} the current succesor/predecessor position
     */
    _getPosition(successor) {
        /** @type {?} */
        let position;
        /** @type {?} */
        let length;
        /** @type {?} */
        const settings = this.carouselService.settings;
        if (settings.slideBy === 'page') {
            position = this._current();
            length = this._pages.length;
            successor ? ++position : --position;
            position = this._pages[((position % length) + length) % length].start;
        }
        else {
            position = this.carouselService.relative(this.carouselService.current());
            length = this.carouselService.items().length;
            successor ? position += +settings.slideBy : position -= +settings.slideBy;
        }
        return position;
    }
    ;
    /**
     * Slides to the next item or page.
     * @param {?} speed The time in milliseconds for the transition.
     * @return {?}
     */
    next(speed) {
        this.carouselService.to(this._getPosition(true), speed);
    }
    ;
    /**
     * Slides to the previous item or page.
     * @param {?} speed The time in milliseconds for the transition.
     * @return {?}
     */
    prev(speed) {
        this.carouselService.to(this._getPosition(false), speed);
    }
    ;
    /**
     * Slides to the specified item or page.
     * @param {?} position - The position of the item or page.
     * @param {?} speed - The time in milliseconds for the transition.
     * @param {?=} standard - Whether to use the standard behaviour or not. Default meaning false
     * @return {?}
     */
    to(position, speed, standard) {
        /** @type {?} */
        let length;
        if (!standard && this._pages.length) {
            length = this._pages.length;
            this.carouselService.to(this._pages[((position % length) + length) % length].start, speed);
        }
        else {
            this.carouselService.to(position, speed);
        }
    }
    ;
    /**
     * Moves carousel after user's clicking on any dots
     * @param {?} dotId
     * @return {?}
     */
    moveByDot(dotId) {
        /** @type {?} */
        const index = this._dotsData.dots.findIndex(dot => dotId === dot.id);
        this.to(index, this.carouselService.settings.dotsSpeed);
    }
}
NavigationService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
NavigationService.ctorParameters = () => [
    { type: CarouselService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** *
 * Create a new injection token for injecting the window into a component.
  @type {?} */
const WINDOW = new InjectionToken('WindowToken');
/**
 * Define abstract class for obtaining reference to the global window object.
 * @abstract
 */
class WindowRef {
    /**
     * @return {?}
     */
    get nativeWindow() {
        throw new Error('Not implemented.');
    }
}
/**
 * Define class that implements the abstract class and returns the native window object.
 */
class BrowserWindowRef extends WindowRef {
    constructor() {
        super();
    }
    /**
     * @return {?} window object
     */
    get nativeWindow() {
        return window;
    }
}
/**
 * Create an factory function that returns the native window object.
 * @param {?} browserWindowRef Native window object
 * @param {?} platformId id of platform
 * @return {?} type of platform of empty object
 */
function windowFactory(browserWindowRef, platformId) {
    if (isPlatformBrowser(platformId)) {
        return browserWindowRef.nativeWindow;
    }
    return new Object();
}
/** *
 * Create a injectable provider for the WindowRef token that uses the BrowserWindowRef class.
  @type {?} */
const browserWindowProvider = {
    provide: WindowRef,
    useClass: BrowserWindowRef
};
/** *
 * Create an injectable provider that uses the windowFactory function for returning the native window object.
  @type {?} */
const windowProvider = {
    provide: WINDOW,
    useFactory: windowFactory,
    deps: [WindowRef, PLATFORM_ID]
};
/** *
 * Create an array of providers.
  @type {?} */
const WINDOW_PROVIDERS = [browserWindowProvider, windowProvider];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** *
 * Create a new injection token for injecting the Document into a component.
  @type {?} */
const DOCUMENT = new InjectionToken('DocumentToken');
/**
 * Define abstract class for obtaining reference to the global Document object.
 * @abstract
 */
class DocumentRef {
    /**
     * @return {?}
     */
    get nativeDocument() {
        throw new Error('Not implemented.');
    }
}
/**
 * Define class that implements the abstract class and returns the native Document object.
 */
class BrowserDocumentRef extends DocumentRef {
    constructor() {
        super();
    }
    /**
     * @return {?} Document object
     */
    get nativeDocument() {
        return document;
    }
}
/**
 * Create an factory function that returns the native Document object.
 * @param {?} browserDocumentRef Native Document object
 * @param {?} platformId id of platform
 * @return {?} type of platform of empty object
 */
function documentFactory(browserDocumentRef, platformId) {
    if (isPlatformBrowser(platformId)) {
        return browserDocumentRef.nativeDocument;
    }
    return new Object();
}
/** *
 * Create a injectable provider for the DocumentRef token that uses the BrowserDocumentRef class.
  @type {?} */
const browserDocumentProvider = {
    provide: DocumentRef,
    useClass: BrowserDocumentRef
};
/** *
 * Create an injectable provider that uses the DocumentFactory function for returning the native Document object.
  @type {?} */
const documentProvider = {
    provide: DOCUMENT,
    useFactory: documentFactory,
    deps: [DocumentRef, PLATFORM_ID]
};
/** *
 * Create an array of providers.
  @type {?} */
const DOCUMENT_PROVIDERS = [browserDocumentProvider, documentProvider];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class AutoplayService {
    /**
     * @param {?} carouselService
     * @param {?} winRef
     * @param {?} docRef
     */
    constructor(carouselService, winRef, docRef) {
        this.carouselService = carouselService;
        /**
         * The autoplay timeout.
         */
        this._timeout = null;
        /**
         * Indicates whenever the autoplay is paused.
         */
        this._paused = false;
        this.winRef = /** @type {?} */ (winRef);
        this.docRef = /** @type {?} */ (docRef);
        this.spyDataStreams();
    }
    /**
     * Defines Observables which service must observe
     * @return {?}
     */
    spyDataStreams() {
        /** @type {?} */
        const initializedCarousel$ = this.carouselService.getInitializedState().pipe(tap(() => {
            if (this.carouselService.settings.autoplay) {
                this.play();
            }
        }));
        /** @type {?} */
        const changedSettings$ = this.carouselService.getChangedState().pipe(tap(data => {
            this._handleChangeObservable(data);
        }));
        /** @type {?} */
        const autoplayMerge$ = merge(initializedCarousel$, changedSettings$);
        this.autoplaySubscription = autoplayMerge$.subscribe(() => { });
    }
    /**
     * Starts the autoplay.
     * @param {?=} timeout The interval before the next animation starts.
     * @param {?=} speed The animation speed for the animations.
     * @return {?}
     */
    play(timeout, speed) {
        if (this._paused) {
            this._paused = false;
            this._setAutoPlayInterval();
        }
        if (this.carouselService.is('rotating')) {
            return;
        }
        this.carouselService.enter('rotating');
        this._setAutoPlayInterval();
    }
    ;
    /**
     * Gets a new timeout
     * @param {?=} timeout - The interval before the next animation starts.
     * @param {?=} speed - The animation speed for the animations.
     * @return {?}
     */
    _getNextTimeout(timeout, speed) {
        if (this._timeout) {
            this.winRef.clearTimeout(this._timeout);
        }
        return this.winRef.setTimeout(() => {
            if (this._paused || this.carouselService.is('busy') || this.carouselService.is('interacting') || this.docRef.hidden) {
                return;
            }
            this.carouselService.next(speed || this.carouselService.settings.autoplaySpeed);
        }, timeout || this.carouselService.settings.autoplayTimeout);
    }
    ;
    /**
     * Sets autoplay in motion.
     * @return {?}
     */
    _setAutoPlayInterval() {
        this._timeout = this._getNextTimeout();
    }
    ;
    /**
     * Stops the autoplay.
     * @return {?}
     */
    stop() {
        if (!this.carouselService.is('rotating')) {
            return;
        }
        this.winRef.clearTimeout(this._timeout);
        this.carouselService.leave('rotating');
    }
    ;
    /**
     * Stops the autoplay.
     * @return {?}
     */
    pause() {
        if (!this.carouselService.is('rotating')) {
            return;
        }
        this._paused = true;
    }
    ;
    /**
     * Manages by autoplaying according to data passed by _changedSettingsCarousel$ Obsarvable
     * @param {?} data object with current position of carousel and type of change
     * @return {?}
     */
    _handleChangeObservable(data) {
        if (data.property.name === 'settings') {
            if (this.carouselService.settings.autoplay) {
                this.play();
            }
            else {
                this.stop();
            }
        }
        else if (data.property.name === 'position') {
            //console.log('play?', e);
            if (this.carouselService.settings.autoplay) {
                this._setAutoPlayInterval();
            }
        }
    }
    /**
     * Starts pausing
     * @return {?}
     */
    startPausing() {
        if (this.carouselService.settings.autoplayHoverPause && this.carouselService.is('rotating')) {
            this.pause();
        }
    }
    /**
     * Starts playing after mouse leaves carousel
     * @return {?}
     */
    startPlayingMouseLeave() {
        if (this.carouselService.settings.autoplayHoverPause && this.carouselService.is('rotating')) {
            this.pause();
        }
    }
    /**
     * Starts playing after touch ends
     * @return {?}
     */
    startPlayingTouchEnd() {
        if (this.carouselService.settings.autoplayHoverPause && this.carouselService.is('rotating')) {
            this.pause();
        }
    }
}
AutoplayService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
AutoplayService.ctorParameters = () => [
    { type: CarouselService },
    { type: undefined, decorators: [{ type: Inject, args: [WINDOW,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
let nextId = 0;
class CarouselSlideDirective {
    /**
     * @param {?} tplRef
     */
    constructor(tplRef) {
        this.tplRef = tplRef;
        /**
         * Unique slide identifier. Must be unique for the entire document for proper accessibility support.
         * Will be auto-generated if not provided.
         */
        this.id = `owl-slide-${nextId++}`;
        /**
         * Defines how much widths of common slide will current slide have
         * e.g. if _mergeData=2, the slide will twice wider then slides with _mergeData=1
         */
        this._dataMerge = 1;
        /**
         * Width of slide
         */
        this.width = 0;
        /**
         * Inner content of dot for certain slide; can be html-markup
         */
        this.dotContent = '';
    }
    /**
     * @param {?} data
     * @return {?}
     */
    set dataMerge(data) {
        this._dataMerge = this.isNumeric(data) ? data : 1;
    }
    ;
    /**
     * @return {?}
     */
    get dataMerge() { return this._dataMerge; }
    /**
     * Determines if the input is a Number or something that can be coerced to a Number
     * @param {?} number
     * @return {?} - An indication if the input is a Number or can be coerced to a Number
     */
    isNumeric(number) {
        return !isNaN(parseFloat(number));
    }
}
CarouselSlideDirective.decorators = [
    { type: Directive, args: [{ selector: 'ng-template[carouselSlide]' },] }
];
/** @nocollapse */
CarouselSlideDirective.ctorParameters = () => [
    { type: TemplateRef }
];
CarouselSlideDirective.propDecorators = {
    id: [{ type: Input }],
    dataMerge: [{ type: Input }],
    width: [{ type: Input }],
    dotContent: [{ type: Input }]
};
/**
 * Data which will be passed out after ending of transition of carousel
 */
class SlidesOutputData {
}
class CarouselComponent {
    /**
     * @param {?} el
     * @param {?} resizeService
     * @param {?} carouselService
     * @param {?} navigationService
     * @param {?} autoplayService
     */
    constructor(el, resizeService, carouselService, navigationService, autoplayService) {
        this.el = el;
        this.resizeService = resizeService;
        this.carouselService = carouselService;
        this.navigationService = navigationService;
        this.autoplayService = autoplayService;
        this.translated = new EventEmitter();
        /**
         * Shows whether carousel is loaded of not.
         */
        this.carouselLoaded = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.spyDataStreams();
        this.carouselWindowWidth = this.el.nativeElement.querySelector('.owl-carousel').clientWidth;
    }
    /**
     * @return {?}
     */
    ngAfterContentChecked() {
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.carouselService.setup(this.carouselWindowWidth, this.slides.toArray(), this.options);
        this.carouselService.initialize(this.slides.toArray());
        this._winResizeWatcher();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.resizeSubscription) {
            this.resizeSubscription.unsubscribe();
        }
        this._allObservSubscription.unsubscribe();
    }
    /**
     * Joins the observable login in one place: sets values to some observables, merges this observables and
     * subcribes to merge func
     * @return {?}
     */
    spyDataStreams() {
        this._viewCurSettings$ = this.carouselService.getViewCurSettings().pipe(tap(data => {
            this.owlDOMData = data.owlDOMData;
            this.stageData = data.stageData;
            this.slidesData = data.slidesData;
            if (!this.carouselLoaded) {
                this.carouselLoaded = true;
            }
            this.navData = data.navData;
            this.dotsData = data.dotsData;
        }));
        this._translatedCarousel$ = this.carouselService.getTranslatedState().pipe(tap(() => {
            this.gatherTranslatedData();
            this.translated.emit(this.slidesOutputData);
            this.slidesOutputData = {};
        }));
        this._carouselMerge$ = merge(this._viewCurSettings$, this._translatedCarousel$);
        this._allObservSubscription = this._carouselMerge$.subscribe(() => { });
    }
    /**
     * Init subscription to resize event and attaches handler for this event
     * @return {?}
     */
    _winResizeWatcher() {
        if (Object.keys(this.carouselService._options.responsive).length) {
            this.resizeSubscription = this.resizeService.onResize$
                .pipe(filter(() => this.carouselWindowWidth !== this.el.nativeElement.querySelector('.owl-carousel').clientWidth), delay(this.carouselService.settings.responsiveRefreshRate))
                .subscribe(() => {
                this.carouselService.onResize(this.el.nativeElement.querySelector('.owl-carousel').clientWidth);
                this.carouselWindowWidth = this.el.nativeElement.querySelector('.owl-carousel').clientWidth;
            });
        }
    }
    /**
     * Handler for transitioend event
     * @return {?}
     */
    onTransitionEnd() {
        this.carouselService.onTransitionEnd();
    }
    /**
     * Handler for click event, attached to next button
     * @return {?}
     */
    next() {
        this.navigationService.next(this.carouselService.settings.navSpeed);
    }
    /**
     * Handler for click event, attached to prev button
     * @return {?}
     */
    prev() {
        this.navigationService.prev(this.carouselService.settings.navSpeed);
    }
    /**
     * Handler for click event, attached to dots
     * @param {?} dotId
     * @return {?}
     */
    moveByDot(dotId) {
        this.navigationService.moveByDot(dotId);
    }
    /**
     * Gathers and prepares data intended for passing to the user by means of firing event translatedCarousel
     * @return {?}
     */
    gatherTranslatedData() {
        /** @type {?} */
        let startPosition;
        /** @type {?} */
        const activeSlides = this.slidesData
            .filter(slide => slide.active === true)
            .map(slide => {
            /** @type {?} */
            const id = slide.id.indexOf('cloned-') >= 0 ? slide.id.slice(7) : slide.id;
            return {
                id: id,
                width: slide.width,
                marginL: slide.marginL,
                marginR: slide.marginR,
                center: slide.center
            };
        });
        startPosition = this.slides.toArray().findIndex(slide => slide.id === activeSlides[0].id);
        this.slidesOutputData = {
            startPosition: startPosition,
            slides: activeSlides
        };
    }
    /**
     * Starts pausing
     * @return {?}
     */
    startPausing() {
        this.autoplayService.startPausing();
    }
    /**
     * Starts playing after mouse leaves carousel
     * @return {?}
     */
    startPlayML() {
        this.autoplayService.startPlayingMouseLeave();
    }
    /**
     * Starts playing after touch ends
     * @return {?}
     */
    startPlayTE() {
        this.autoplayService.startPlayingTouchEnd();
    }
}
CarouselComponent.decorators = [
    { type: Component, args: [{
                selector: 'owl-carousel-o',
                template: `
    <div class="owl-carousel owl-theme" #owlCarousel
      [ngClass]="{'owl-rtl': owlDOMData?.rtl,
                  'owl-loaded': owlDOMData?.isLoaded,
                  'owl-responsive': owlDOMData?.isResponsive,
                  'owl-drag': owlDOMData?.isMouseDragable,
                  'owl-grab': owlDOMData?.isGrab}"
      (mouseover)="startPausing()"
      (mouseleave)="startPlayML()"
      (touchstart)="startPausing()"
      (touchend)="startPlayTE()">

      <div *ngIf="carouselLoaded" class="owl-stage-outer">
        <owl-stage [owlDraggable]="{'isMouseDragable': owlDOMData?.isMouseDragable, 'isTouchDragable': owlDOMData?.isTouchDragable}"
                    [stageData]="stageData"
                    [slidesData]="slidesData"></owl-stage>
      </div> <!-- /.owl-stage-outer -->
      <div class="owl-nav" [ngClass]="{'disabled': navData?.disabled}">
        <div class="owl-prev" [ngClass]="{'disabled': navData?.prev?.disabled}" (click)="prev()" [innerHTML]="navData?.prev?.htmlText"></div>
        <div class="owl-next" [ngClass]="{'disabled': navData?.next?.disabled}" (click)="next()" [innerHTML]="navData?.next?.htmlText"></div>
      </div> <!-- /.owl-nav -->
      <div class="owl-dots" [ngClass]="{'disabled': dotsData?.disabled}">
        <div *ngFor="let dot of dotsData?.dots" class="owl-dot" [ngClass]="{'active': dot.active, 'owl-dot-text': dot.showInnerContent}" (click)="moveByDot(dot.id)">
          <span [innerHTML]="dot.innerContent"></span>
        </div>
      </div> <!-- /.owl-dots -->
    </div> <!-- /.owl-carousel owl-loaded -->
  `,
                providers: [NavigationService, AutoplayService, CarouselService],
                styles: [`.owl-theme { display: block; }`]
            }] }
];
/** @nocollapse */
CarouselComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ResizeService },
    { type: CarouselService },
    { type: NavigationService },
    { type: AutoplayService }
];
CarouselComponent.propDecorators = {
    slides: [{ type: ContentChildren, args: [CarouselSlideDirective,] }],
    translated: [{ type: Output }],
    options: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class StageComponent {
    /**
     * @param {?} zone
     * @param {?} el
     * @param {?} renderer
     * @param {?} carouselService
     */
    constructor(zone, el, renderer, carouselService) {
        this.zone = zone;
        this.el = el;
        this.renderer = renderer;
        this.carouselService = carouselService;
        /**
         * Object with data needed for dragging
         */
        this._drag = {
            time: null,
            target: null,
            pointer: null,
            stage: {
                start: null,
                current: null
            },
            direction: null,
            active: false,
            moving: false
        };
        /**
         * Subject for notification when the carousel's rebuilding caused by resize event starts
         */
        this._oneDragMove$ = new Subject();
        /**
         * Passes this to _oneMouseTouchMove();
         */
        this.bindOneMouseTouchMove = (ev) => {
            this._oneMouseTouchMove(ev);
        };
        /**
         * Passes this to _onDragMove();
         */
        this.bindOnDragMove = (ev) => {
            this._onDragMove(ev);
        };
        /**
         * Passes this to _onDragMove();
         */
        this.bindOnDragEnd = (ev) => {
            // this.zone.run(() => {
            this._onDragEnd(ev);
            // });
        };
        /**
         * Attaches handler for 'click' event on any element in .owl-stage in order to prevent dragging when moving of cursor is less than 3px
         */
        this._oneClickHandler = () => {
            this.listenerOneClick = this.renderer.listen(this._drag.target, 'click', () => false);
            this.listenerOneClick();
        };
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onMouseDown(event) {
        if (this.owlDraggable.isMouseDragable) {
            this._onDragStart(event);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onTouchStart(event) {
        if (this.owlDraggable.isTouchDragable) {
            this._onDragStart(event);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onTouchCancel(event) {
        this._onDragEnd(event);
    }
    /**
     * @return {?}
     */
    onDragStart() {
        if (this.owlDraggable.isMouseDragable) {
            return false;
        }
    }
    /**
     * @return {?}
     */
    onSelectStart() {
        if (this.owlDraggable.isMouseDragable) {
            return false;
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._oneMoveSubsription = this._oneDragMove$
            .pipe(first())
            .subscribe(() => {
            this._sendChanges();
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._oneMoveSubsription.unsubscribe();
    }
    /**
     * Handles `touchstart` and `mousedown` events.
     * \@todo Horizontal swipe threshold as option
     * \@todo #261
     * @param {?} event - The event arguments.
     * @return {?}
     */
    _onDragStart(event) {
        /** @type {?} */
        let stage = null;
        if (event.which === 3) {
            return;
        }
        stage = this._prepareDragging(event);
        this._drag.time = new Date().getTime();
        this._drag.target = event.target;
        this._drag.stage.start = stage;
        this._drag.stage.current = stage;
        this._drag.pointer = this._pointer(event);
        this._drag.active = true;
        this.listenerMouseUp = this.renderer.listen(document, 'mouseup', this.bindOnDragEnd);
        this.listenerTouchEnd = this.renderer.listen(document, 'touchend', this.bindOnDragEnd);
        this.zone.runOutsideAngular(() => {
            this.listenerOneMouseMove = this.renderer.listen(document, 'mousemove', this.bindOneMouseTouchMove);
            this.listenerOneTouchMove = this.renderer.listen(document, 'touchmove', this.bindOneMouseTouchMove);
        });
    }
    /**
     * Attaches listeners to `touchmove` and `mousemove` events; initiates updating carousel after starting dragging
     * @param {?} event event objech of mouse or touch event
     * @return {?}
     */
    _oneMouseTouchMove(event) {
        if (!this._drag.active)
            return false;
        /** @type {?} */
        const delta = this._difference(this._drag.pointer, this._pointer(event));
        this.listenerOneMouseMove();
        this.listenerOneTouchMove();
        if (Math.abs(delta.x) < Math.abs(delta.y) && this._is('valid')) {
            this._drag.active = false;
            return;
        }
        this._drag.moving = true;
        this.listenerMouseMove = this.renderer.listen(document, 'mousemove', this.bindOnDragMove);
        this.listenerTouchMove = this.renderer.listen(document, 'touchmove', this.bindOnDragMove);
        event.preventDefault();
        this._enter('dragging');
        // this.carouselService._trigger('drag');
        this._oneDragMove$.next(event);
        // this._sendChanges();
    }
    /**
     * Handles the `touchmove` and `mousemove` events.
     * \@todo #261
     * @param {?} event - The event arguments.
     * @return {?}
     */
    _onDragMove(event) {
        if (!this._drag.active)
            return false;
        /** @type {?} */
        let stage;
        /** @type {?} */
        const stageOrExit = this.carouselService.defineNewCoordsDrag(event, this._drag);
        if (stageOrExit === false) {
            return;
        }
        stage = /** @type {?} */ (stageOrExit);
        event.preventDefault();
        this._drag.stage.current = stage;
        this._animate(stage.x - this._drag.stage.start.x);
    }
    ;
    /**
     * Moves .owl-stage left-right
     * @param {?} coordinate coordinate to be set to .owl-stage
     * @return {?}
     */
    _animate(coordinate) {
        this.renderer.setStyle(this.el.nativeElement.children[0], 'transform', `translate3d(${coordinate}px,0px,0px`);
        this.renderer.setStyle(this.el.nativeElement.children[0], 'transition', '0s');
    }
    /**
     * Handles the `touchend` and `mouseup` events.
     * \@todo #261
     * \@todo Threshold for click event
     * @param {?} event - The event arguments.
     * @return {?}
     */
    _onDragEnd(event) {
        this.carouselService.owlDOMData.isGrab = false;
        if (this._drag.moving) {
            this.renderer.setStyle(this.el.nativeElement.children[0], 'transform', ``);
            this.renderer.setStyle(this.el.nativeElement.children[0], 'transition', this.carouselService.speed(+this.carouselService.settings.dragEndSpeed || this.carouselService.settings.smartSpeed) / 1000 + 's');
            this._finishDragging(event);
            this.listenerMouseMove();
            this.listenerTouchMove();
        }
        this._drag = {
            time: null,
            target: null,
            pointer: null,
            stage: {
                start: null,
                current: null
            },
            direction: null,
            active: false,
            moving: false
        };
        // this.carouselService.trigger('dragged');
        this.listenerMouseUp();
        this.listenerTouchEnd();
    }
    ;
    /**
     * Prepares data for dragging carousel. It starts after firing `touchstart` and `mousedown` events.
     * @param {?} event - The event arguments.
     * @return {?} stage - object with 'x' and 'y' coordinates of .owl-stage
     */
    _prepareDragging(event) {
        return this.carouselService.prepareDragging(event);
    }
    /**
     * Finishes dragging
     * @param {?} event object event of 'mouseUp' of 'touchend' events
     * @return {?}
     */
    _finishDragging(event) {
        this.carouselService.finishDragging(event, this._drag, this._oneClickHandler);
    }
    /**
     * Gets unified pointer coordinates from event.
     * @param {?} event The `mousedown` or `touchstart` event.
     * @return {?} Contains `x` and `y` coordinates of current pointer position.
     */
    _pointer(event) {
        return this.carouselService.pointer(event);
    }
    /**
     * Gets the difference of two vectors.
     * @param {?} firstC
     * @param {?} second
     * @return {?} The difference.
     */
    _difference(firstC, second) {
        return this.carouselService.difference(firstC, second);
    }
    /**
     * Checks whether the carousel is in a specific state or not.
     * @param {?} state The state to check.
     * @return {?} The flag which indicates if the carousel is busy.
     */
    _is(state) {
        return this.carouselService.is(state);
    }
    /**
     * Enters a state.
     * @param {?} name The state name.
     * @return {?}
     */
    _enter(name) {
        this.carouselService.enter(name);
    }
    /**
     * Sends all data needed for View.
     * @return {?}
     */
    _sendChanges() {
        this.carouselService.sendChanges();
    }
    /**
     * Handler for transitioend event
     * @return {?}
     */
    onTransitionEnd() {
        this.carouselService.onTransitionEnd();
    }
}
StageComponent.decorators = [
    { type: Component, args: [{
                selector: 'owl-stage',
                template: `
    <div>
      <div class="owl-stage" [ngStyle]="{'width': stageData.width + 'px',
                                        'transform': stageData.transform,
                                        'transition': stageData.transition,
                                        'padding-left': stageData.paddingL + 'px',
                                        'padding-right': stageData.paddingR + 'px' }"
          (transitionend)="onTransitionEnd()">
        <ng-container *ngFor="let slide of slidesData; let i = index">
          <div class="owl-item" [ngClass]="{'active': slide.active, 
                                            'center': slide.center,
                                            'cloned': slide.cloned}" 
                                [ngStyle]="{'width': slide.width + 'px',
                                            'margin-left': slide.marginL + 'px',
                                            'margin-right': slide.marginR + 'px'}">
            <ng-template [ngTemplateOutlet]="slide.tplRef"></ng-template>
          </div><!-- /.owl-item -->
        </ng-container>
      </div><!-- /.owl-stage -->
    </div>
  `
            }] }
];
/** @nocollapse */
StageComponent.ctorParameters = () => [
    { type: NgZone },
    { type: ElementRef },
    { type: Renderer2 },
    { type: CarouselService }
];
StageComponent.propDecorators = {
    owlDraggable: [{ type: Input }],
    stageData: [{ type: Input }],
    slidesData: [{ type: Input }],
    onMouseDown: [{ type: HostListener, args: ['mousedown', ['$event'],] }],
    onTouchStart: [{ type: HostListener, args: ['touchstart', ['$event'],] }],
    onTouchCancel: [{ type: HostListener, args: ['touchcancel', ['$event'],] }],
    onDragStart: [{ type: HostListener, args: ['dragstart',] }],
    onSelectStart: [{ type: HostListener, args: ['selectstart',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class CarouselModule {
}
CarouselModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [CarouselComponent, CarouselSlideDirective, StageComponent],
                exports: [CarouselComponent, CarouselSlideDirective],
                providers: [WINDOW_PROVIDERS, ResizeService, DOCUMENT_PROVIDERS]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { CarouselModule, CarouselComponent, CarouselSlideDirective, SlidesOutputData, StageComponent as ɵs, AutoplayService as ɵc, CarouselService as ɵb, BrowserDocumentRef as ɵm, DOCUMENT as ɵk, DOCUMENT_PROVIDERS as ɵq, DocumentRef as ɵl, browserDocumentProvider as ɵo, documentFactory as ɵn, documentProvider as ɵp, NavigationService as ɵa, ResizeService as ɵr, BrowserWindowRef as ɵf, WINDOW as ɵd, WINDOW_PROVIDERS as ɵj, WindowRef as ɵe, browserWindowProvider as ɵh, windowFactory as ɵg, windowProvider as ɵi };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW93bC1jYXJvdXNlbC1vLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vbGliL3NlcnZpY2VzL3Jlc2l6ZS5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vbGliL2Nhcm91c2VsL293bC1jYXJvdXNlbC1vLWNvbmZpZy50cyIsIm5nOi8vbmd4LW93bC1jYXJvdXNlbC1vL2xpYi9zZXJ2aWNlcy9jYXJvdXNlbC5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vbGliL3NlcnZpY2VzL25hdmlnYXRpb24uc2VydmljZS50cyIsIm5nOi8vbmd4LW93bC1jYXJvdXNlbC1vL2xpYi9zZXJ2aWNlcy93aW5kb3ctcmVmLnNlcnZpY2UudHMiLCJuZzovL25neC1vd2wtY2Fyb3VzZWwtby9saWIvc2VydmljZXMvZG9jdW1lbnQtcmVmLnNlcnZpY2UudHMiLCJuZzovL25neC1vd2wtY2Fyb3VzZWwtby9saWIvc2VydmljZXMvYXV0b3BsYXkuc2VydmljZS50cyIsIm5nOi8vbmd4LW93bC1jYXJvdXNlbC1vL2xpYi9jYXJvdXNlbC9jYXJvdXNlbC5jb21wb25lbnQudHMiLCJuZzovL25neC1vd2wtY2Fyb3VzZWwtby9saWIvY2Fyb3VzZWwvc3RhZ2Uvc3RhZ2UuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vbGliL2Nhcm91c2VsL2Nhcm91c2VsLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudE1hbmFnZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBSZXNpemVTZXJ2aWNlIHtcclxuICAvKipcclxuICAgKiBXaWR0aCBvZiB3aW5kb3dcclxuICAgKi9cclxuICBwdWJsaWMgd2luZG93V2lkdGg6IGFueTtcclxuXHJcbiAgLyoqXHJcbiAgICogTWFrZXMgcmVzaXplU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxyXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgcmVzaXplU3ViamVjdFxyXG4gICAqL1xyXG4gIGdldCBvblJlc2l6ZSQoKTogT2JzZXJ2YWJsZTxXaW5kb3c+IHtcclxuICAgIHJldHVybiB0aGlzLnJlc2l6ZVN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdWJqZWN0IG9mICdyZXNpemUnIGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSByZXNpemVTdWJqZWN0OiBTdWJqZWN0PFdpbmRvdz47XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZXZlbnRNYW5hZ2VyOiBFdmVudE1hbmFnZXIpIHtcclxuICAgIHRoaXMucmVzaXplU3ViamVjdCA9IG5ldyBTdWJqZWN0KCk7XHJcbiAgICB0aGlzLmV2ZW50TWFuYWdlci5hZGRHbG9iYWxFdmVudExpc3RlbmVyKFxyXG4gICAgICAnd2luZG93JyxcclxuICAgICAgJ3Jlc2l6ZScsXHJcbiAgICAgIHRoaXMub25SZXNpemUuYmluZCh0aGlzKVxyXG4gICAgKTtcclxuICAgIHRoaXMuZXZlbnRNYW5hZ2VyLmFkZEdsb2JhbEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgICd3aW5kb3cnLFxyXG4gICAgICAnb25sb2FkJyxcclxuICAgICAgdGhpcy5vbkxvYWRlZC5iaW5kKHRoaXMpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlciBvZiAncmVzaXplJyBldmVudC4gUGFzc2VzIGRhdGEgdGhyb3cgcmVzaXplU3ViamVjdFxyXG4gICAqIEBwYXJhbSBldmVudCBFdmVudCBPYmplY3Qgb2YgJ3Jlc2l6ZScgZXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIG9uUmVzaXplKGV2ZW50OiBVSUV2ZW50KSB7XHJcbiAgICB0aGlzLnJlc2l6ZVN1YmplY3QubmV4dCg8V2luZG93PmV2ZW50LnRhcmdldCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGVyIG9mICdvbmxvYWQnIGV2ZW50LiBEZWZpbmVzIHRoZSB3aWR0aCBvZiB3aW5kb3dcclxuICAgKiBAcGFyYW0gZXZlbnQgRXZlbnQgT2JqZWN0IG9mICdvbmxvYWQnIGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbkxvYWRlZChldmVudDogVUlFdmVudCkge1xyXG4gICAgdGhpcy53aW5kb3dXaWR0aCA9IDxXaW5kb3c+ZXZlbnQudGFyZ2V0O1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBPd2xPcHRpb25zIH0gZnJvbSBcIi4uL21vZGVscy9vd2wtb3B0aW9ucy5tb2RlbFwiO1xuXG5leHBvcnQgY2xhc3MgT3dsQ2Fyb3VzZWxPQ29uZmlnIGltcGxlbWVudHMgT3dsT3B0aW9ucyB7XG4gIGl0ZW1zID0gMztcbiAgbG9vcCA9IGZhbHNlO1xuICBjZW50ZXIgPSBmYWxzZTtcbiAgcmV3aW5kID0gZmFsc2U7XG5cbiAgbW91c2VEcmFnID0gdHJ1ZTtcbiAgdG91Y2hEcmFnID0gdHJ1ZTtcbiAgcHVsbERyYWcgPSB0cnVlO1xuICBmcmVlRHJhZyA9IGZhbHNlO1xuXG4gIG1hcmdpbiA9IDA7XG4gIHN0YWdlUGFkZGluZyA9IDA7XG5cbiAgbWVyZ2UgPSBmYWxzZTtcbiAgbWVyZ2VGaXQgPSB0cnVlO1xuICBhdXRvV2lkdGggPSBmYWxzZTtcblxuICBzdGFydFBvc2l0aW9uID0gMDtcbiAgcnRsID0gZmFsc2U7XG5cbiAgc21hcnRTcGVlZCA9IDI1MDtcbiAgZmx1aWRTcGVlZCA9IGZhbHNlO1xuICBkcmFnRW5kU3BlZWQgPSBmYWxzZTtcblxuICByZXNwb25zaXZlID0ge307XG4gIHJlc3BvbnNpdmVSZWZyZXNoUmF0ZSA9IDIwMDtcblxuICAvLyBkZWZhdWx0cyB0byBOYXZpZ2F0aW9uXG4gIG5hdiA9IGZhbHNlO1xuICBuYXZUZXh0ID0gWyAncHJldicsICduZXh0JyBdO1xuICBuYXZTcGVlZCA9IGZhbHNlO1xuICBzbGlkZUJ5ID0gMTsgLy8gc3RhZ2UgbW92ZXMgb24gMSB3aWR0aCBvZiBzbGlkZTsgaWYgc2xpZGVCeSA9IDIsIHN0YWdlIG1vdmVzIG9uIDIgd2lkdGhzIG9mIHNsaWRlXG4gIGRvdHMgPSB0cnVlO1xuICBkb3RzRWFjaCA9IGZhbHNlO1xuICBkb3RzRGF0YSA9IGZhbHNlO1xuICBkb3RzU3BlZWQgPSBmYWxzZTtcblxuICAvLyBkZWZhdWx0cyB0byBBdXRvcGxheVxuICBhdXRvcGxheTogZmFsc2U7XG4gIGF1dG9wbGF5VGltZW91dDogNTAwMDtcbiAgYXV0b3BsYXlIb3ZlclBhdXNlOiBmYWxzZTtcbiAgYXV0b3BsYXlTcGVlZDogZmFsc2U7XG4gIGNvbnN0cnVjdG9yKCkgeyB9XG59XG5cbi8vIGFsdGhvdWdoIHdlIGNhbid0IHJlYWQgdHlwZXMgZnJvbSBPd2xPcHRpb25zIGluIGphdmFzY3JpcHQgYXMgcHJvcHMgaGF2ZSB2YWx1ZSB1bmRlZmluZWQgYW5kIHR5cGVzIGFyZSB1c2VkIGZvciB2YWxpZGF0aW5nIGlucHV0c1xuLy8gY2xhc3MgYmVsb3cgaXMgY29weSBvZiBPd2xPcHRpb25zIGJ1dCBpdHMgYWxsIHByb3BzIGhhdmUgc3RyaW5nIHZhbHVlIHNob3dpbmcgY2VydGFpbiB0eXBlO1xuLy8gdGhpcyBpcyBjbGFzcyBpcyBiZWluZyB1c2VkIGp1c3QgaW4gbWV0aG9kIF92YWxpZGF0ZU9wdGlvbnMgb2YgQ2Fyb3VzZWxTZXJ2aWNlO1xuZXhwb3J0IGNsYXNzIE93bE9wdGlvbnNNb2NrZWRUeXBlcyB7XG4gIGl0ZW1zID0gJ251bWJlcic7XG4gIGxvb3AgPSAnYm9vbGVhbic7XG4gIGNlbnRlciA9ICdib29sZWFuJztcbiAgcmV3aW5kID0gJ2Jvb2xlYW4nO1xuXG4gIG1vdXNlRHJhZyA9ICdib29sZWFuJztcbiAgdG91Y2hEcmFnID0gJ2Jvb2xlYW4nO1xuICBwdWxsRHJhZyA9ICdib29sZWFuJztcbiAgZnJlZURyYWcgPSAnYm9vbGVhbic7XG5cbiAgbWFyZ2luID0gJ251bWJlcic7XG4gIHN0YWdlUGFkZGluZyA9ICdudW1iZXInO1xuXG4gIG1lcmdlID0gJ2Jvb2xlYW4nO1xuICBtZXJnZUZpdCA9ICdib29sZWFuJztcbiAgYXV0b1dpZHRoID0gJ2Jvb2xlYW4nO1xuXG4gIHN0YXJ0UG9zaXRpb24gPSAnbnVtYmVyJztcbiAgcnRsID0gJ2Jvb2xlYW4nO1xuXG4gIHNtYXJ0U3BlZWQgPSAnbnVtYmVyJztcbiAgZmx1aWRTcGVlZCA9ICdib29sZWFuJztcbiAgZHJhZ0VuZFNwZWVkID0gJ251bWJlcnxib29sZWFuJztcblxuICByZXNwb25zaXZlID0ge307XG4gIHJlc3BvbnNpdmVSZWZyZXNoUmF0ZSA9ICdudW1iZXInO1xuXG4gIC8vIGRlZmF1bHRzIHRvIE5hdmlnYXRpb25cbiAgbmF2ID0gJ2Jvb2xlYW4nO1xuICBuYXZUZXh0ID0gJ3N0cmluZ1tdJztcbiAgbmF2U3BlZWQgPSAnbnVtYmVyfGJvb2xlYW4nO1xuICBzbGlkZUJ5ID0gJ251bWJlcnxzdHJpbmcnOyAvLyBzdGFnZSBtb3ZlcyBvbiAxIHdpZHRoIG9mIHNsaWRlOyBpZiBzbGlkZUJ5ID0gMiwgc3RhZ2UgbW92ZXMgb24gMiB3aWR0aHMgb2Ygc2xpZGVcbiAgZG90cyA9ICdib29sZWFuJztcbiAgZG90c0VhY2ggPSAnbnVtYmVyfGJvb2xlYW4nO1xuICBkb3RzRGF0YSA9ICdib29sZWFuJztcbiAgZG90c1NwZWVkID0gJ251bWJlcnxib29sZWFuJztcblxuICAvLyBkZWZhdWx0cyB0byBBdXRvcGxheVxuICBhdXRvcGxheTogJ2Jvb2xlYW4nO1xuICBhdXRvcGxheVRpbWVvdXQ6ICdudW1iZXInO1xuICBhdXRvcGxheUhvdmVyUGF1c2U6ICdib29sZWFuJztcbiAgYXV0b3BsYXlTcGVlZDogJ251bWJlcnxib29sZWFuJztcbiAgY29uc3RydWN0b3IoKSB7IH1cbn0iLCJcclxuaW1wb3J0IHsgU3RhZ2VEYXRhIH0gZnJvbSAnLi4vbW9kZWxzL3N0YWdlLWRhdGEubW9kZWwnO1xyXG5cclxuaW1wb3J0IHsgT3dsRE9NRGF0YSB9IGZyb20gJy4uL21vZGVscy9vd2xET00tZGF0YS5tb2RlbCc7XHJcblxyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlIH0gZnJvbSAnLi4vY2Fyb3VzZWwvY2Fyb3VzZWwubW9kdWxlJztcclxuaW1wb3J0IHsgU2xpZGVyTW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvc2xpZGVyLm1vZGVsJztcclxuaW1wb3J0IHsgU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBPd2xDYXJvdXNlbE9Db25maWcsIE93bE9wdGlvbnNNb2NrZWRUeXBlcyB9IGZyb20gJy4uL2Nhcm91c2VsL293bC1jYXJvdXNlbC1vLWNvbmZpZyc7XHJcbmltcG9ydCB7IE93bE9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbHMvb3dsLW9wdGlvbnMubW9kZWwnO1xyXG5cclxuaW1wb3J0IHsgTmF2RGF0YSwgRG90c0RhdGEgfSBmcm9tICcuLi9tb2RlbHMvbmF2aWdhdGlvbi1kYXRhLm1vZGVscyc7XHJcblxyXG4vKipcclxuICogQ3VycmVudCBzdGF0ZSBpbmZvcm1hdGlvbiBhbmQgdGhlaXIgdGFncy5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBTdGF0ZXMge1xyXG4gIGN1cnJlbnQ6IHt9O1xyXG4gIHRhZ3M6IHtcclxuICAgIFtrZXk6IHN0cmluZ106IHN0cmluZ1tdO1xyXG4gIH07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFbnVtZXJhdGlvbiBmb3IgdHlwZXMuXHJcbiAqIEBlbnVtIHtTdHJpbmd9XHJcbiAqL1xyXG5leHBvcnQgZW51bSBUeXBlIHtcclxuXHRFdmVudCA9ICdldmVudCcsXHJcblx0U3RhdGUgPSAnc3RhdGUnXHJcbn07XHJcblxyXG4vKipcclxuICogRW51bWVyYXRpb24gZm9yIHdpZHRoLlxyXG4gKiBAZW51bSB7U3RyaW5nfVxyXG4gKi9cclxuZXhwb3J0IGVudW0gV2lkdGgge1xyXG5cdERlZmF1bHQgPSAnZGVmYXVsdCcsXHJcblx0SW5uZXIgPSAnaW5uZXInLFxyXG5cdE91dGVyID0gJ291dGVyJ1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIE1vZGVsIGZvciBjb29yZHMgb2YgLm93bC1zdGFnZVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENvb3JkcyB7XHJcblx0eDogbnVtYmVyO1xyXG5cdHk6IG51bWJlcjtcclxufVxyXG5cclxuLyoqXHJcbiAqIE1vZGVsIGZvciBhbGwgY3VycmVudCBkYXRhIG9mIGNhcm91c2VsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ2Fyb3VzZWxDdXJyZW50RGF0YSB7XHJcblx0b3dsRE9NRGF0YTogT3dsRE9NRGF0YTtcclxuXHRzdGFnZURhdGE6IFN0YWdlRGF0YTtcclxuXHRzbGlkZXNEYXRhOiBTbGlkZXJNb2RlbFtdO1xyXG5cdG5hdkRhdGE6IE5hdkRhdGE7XHJcblx0ZG90c0RhdGE6IERvdHNEYXRhO1xyXG59XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBDYXJvdXNlbFNlcnZpY2Uge1xyXG5cdC8qKlxyXG4gICAqIFN1YmplY3QgZm9yIHBhc3NpbmcgZGF0YSBuZWVkZWQgZm9yIG1hbmFnaW5nIFZpZXdcclxuICAgKi9cclxuXHRwcml2YXRlIF92aWV3U2V0dGluZ3NTaGlwcGVyJCA9IG5ldyBTdWJqZWN0PENhcm91c2VsQ3VycmVudERhdGE+KCk7XHJcblx0LyoqXHJcbiAgICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uIHdoZW4gdGhlIGNhcm91c2VsIGdvdCBpbml0aWFsaXplc1xyXG4gICAqL1xyXG5cdHByaXZhdGUgX2luaXRpYWxpemVkQ2Fyb3VzZWwkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xyXG5cclxuXHQvKipcclxuICAgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gd2hlbiB0aGUgY2Fyb3VzZWwncyBzZXR0aW5ncyBzdGFydCBjaGFuZ2luZlxyXG4gICAqL1xyXG5cdHByaXZhdGUgX2NoYW5nZVNldHRpbmdzQ2Fyb3VzZWwkID0gbmV3IFN1YmplY3Q8YW55PigpO1xyXG5cclxuXHQvKipcclxuICAgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gd2hlbiB0aGUgY2Fyb3VzZWwncyBzZXR0aW5ncyBoYXZlIGNoYW5nZWRcclxuICAgKi9cclxuXHRwcml2YXRlIF9jaGFuZ2VkU2V0dGluZ3NDYXJvdXNlbCQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XHJcblx0LyoqXHJcbiAgICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uIHdoZW4gdGhlIGNhcm91c2VsIHN0b3BwZWQgdHJhbnNsYXRpbmcgb3IgbW92aW5nXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfdHJhbnNsYXRlZENhcm91c2VsJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcclxuXHQvKipcclxuICAgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gd2hlbiB0aGUgY2Fyb3VzZWwncyByZWJ1aWxkaW5nIGNhdXNlZCBieSAncmVzaXplJyBldmVudCBzdGFydHNcclxuICAgKi9cclxuXHRwcml2YXRlIF9yZXNpemVDYXJvdXNlbCQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XHJcblx0LyoqXHJcbiAgICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uICB3aGVuIHRoZSBjYXJvdXNlbCdzIHJlYnVpbGRpbmcgY2F1c2VkIGJ5ICdyZXNpemUnIGV2ZW50IGlzIGVuZGVkXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfcmVzaXplZENhcm91c2VsJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcclxuXHQvKipcclxuICAgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gd2hlbiB0aGUgcmVmcmVzaCBvZiBjYXJvdXNlbCBzdGFydHNcclxuICAgKi9cclxuXHRwcml2YXRlIF9yZWZyZXNoQ2Fyb3VzZWwkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xyXG5cdC8qKlxyXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSByZWZyZXNoIG9mIGNhcm91c2VsIGlzIGVuZGVkXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfcmVmcmVzaGVkQ2Fyb3VzZWwkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xyXG5cclxuICAvKipcclxuICAgKiBDdXJyZW50IHNldHRpbmdzIGZvciB0aGUgY2Fyb3VzZWwuXHJcbiAgICovXHJcbiAgc2V0dGluZ3M6IE93bE9wdGlvbnMgPSB7XHJcblx0XHRpdGVtczogMFxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG4gICAqIEluaXRpYWwgZGF0YSBmb3Igc2V0dGluZyBjbGFzc2VzIHRvIGVsZW1lbnQgLm93bC1jYXJvdXNlbFxyXG4gICAqL1xyXG5cdG93bERPTURhdGE6IE93bERPTURhdGEgPSB7XHJcblx0XHRydGw6IGZhbHNlLFxyXG5cdFx0aXNSZXNwb25zaXZlOiBmYWxzZSxcclxuXHRcdGlzUmVmcmVzaGVkOiBmYWxzZSxcclxuXHRcdGlzTG9hZGVkOiBmYWxzZSxcclxuXHRcdGlzTG9hZGluZzogZmFsc2UsXHJcblx0XHRpc01vdXNlRHJhZ2FibGU6IGZhbHNlLFxyXG5cdFx0aXNHcmFiOiBmYWxzZSxcclxuXHRcdGlzVG91Y2hEcmFnYWJsZTogZmFsc2VcclxuXHR9O1xyXG5cclxuXHQvKipcclxuICAgKiBJbml0aWFsIGRhdGEgb2YgLm93bC1zdGFnZVxyXG4gICAqL1xyXG5cdHN0YWdlRGF0YTogU3RhZ2VEYXRhID0ge1xyXG5cdFx0dHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoMHB4LDBweCwwcHgpJyxcclxuXHRcdHRyYW5zaXRpb246ICcwcycsXHJcblx0XHR3aWR0aDogMCxcclxuXHRcdHBhZGRpbmdMOiAwLFxyXG5cdFx0cGFkZGluZ1I6IDBcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiAgRGF0YSBvZiBldmVyeSBzbGlkZVxyXG5cdCAqL1xyXG5cdHNsaWRlc0RhdGE6IFNsaWRlck1vZGVsW107XHJcblxyXG5cdC8qKlxyXG5cdCAqIERhdGEgb2YgbmF2aWdhdGlvbiBibG9ja1xyXG5cdCAqL1xyXG5cdG5hdkRhdGE6IE5hdkRhdGE7XHJcblxyXG5cdC8qKlxyXG5cdCAqIERhdGEgb2YgZG90cyBibG9ja1xyXG5cdCAqL1xyXG5cdGRvdHNEYXRhOiBEb3RzRGF0YTtcclxuXHJcblx0LyoqXHJcblx0ICogQ2Fyb3VzZWwgd2lkdGhcclxuXHQgKi9cclxuXHRwcml2YXRlIF93aWR0aDogbnVtYmVyO1xyXG5cclxuXHQvKipcclxuXHQgKiBBbGwgcmVhbCBpdGVtcy5cclxuXHQgKi9cclxuXHRwcml2YXRlIF9pdGVtczogQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZVtdID0gW107IC8vIGlzIGVxdWFsIHRvIHRoaXMuc2xpZGVzXHJcblxyXG5cdC8qKlxyXG4gICAqIEFycmF5IHdpdGggd2lkdGggb2YgZXZlcnkgc2xpZGUuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfd2lkdGhzOiBhbnlbXSA9IFtdO1xyXG5cclxuXHQvKipcclxuICAgKiBDdXJyZW50bHkgc3VwcHJlc3NlZCBldmVudHMgdG8gcHJldmVudCB0aGVtIGZyb20gYmVlaW5nIHJldHJpZ2dlcmVkLlxyXG4gICAqL1xyXG5cdHByaXZhdGUgX3N1cHJlc3M6IGFueSA9IHt9O1xyXG5cclxuICAvKipcclxuICAgKiBSZWZlcmVuY2VzIHRvIHRoZSBydW5uaW5nIHBsdWdpbnMgb2YgdGhpcyBjYXJvdXNlbC5cclxuICAgKi9cclxuXHRwcml2YXRlIF9wbHVnaW5zOiBhbnkgPSB7fTtcclxuXHJcblx0LyoqXHJcbiAgICogQWJzb2x1dGUgY3VycmVudCBwb3NpdGlvbi5cclxuICAgKi9cclxuXHRwcml2YXRlIF9jdXJyZW50OiBudW1iZXIgfCBudWxsID0gbnVsbDtcclxuXHJcblx0LyoqXHJcbiAgICogQWxsIGNsb25lZCBpdGVtcy5cclxuICAgKi9cclxuXHRwcml2YXRlIF9jbG9uZXM6IGFueVtdID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIE1lcmdlIHZhbHVlcyBvZiBhbGwgaXRlbXMuXHJcbiAgICogQHRvZG8gTWF5YmUgdGhpcyBjb3VsZCBiZSBwYXJ0IG9mIGEgcGx1Z2luLlxyXG4gICAqL1xyXG5cdHJlYWRvbmx5IF9tZXJnZXJzOiBhbnlbXSA9IFtdO1xyXG5cclxuXHQvKipcclxuICAgKiBBbmltYXRpb24gc3BlZWQgaW4gbWlsbGlzZWNvbmRzLlxyXG4gICAqL1xyXG5cdHByaXZhdGUgX3NwZWVkOiBudW1iZXIgfCBudWxsID0gbnVsbDtcclxuXHJcblx0LyoqXHJcbiAgICogQ29vcmRpbmF0ZXMgb2YgYWxsIGl0ZW1zIGluIHBpeGVsLlxyXG4gICAqIEB0b2RvIFRoZSBuYW1lIG9mIHRoaXMgbWVtYmVyIGlzIG1pc3NsZWFkaW5nLlxyXG4gICAqL1xyXG5cdHByaXZhdGUgX2Nvb3JkaW5hdGVzOiBudW1iZXJbXSA9IFtdO1xyXG5cclxuXHQvKipcclxuICAgKiBDdXJyZW50IGJyZWFrcG9pbnQuXHJcbiAgICogQHRvZG8gUmVhbCBtZWRpYSBxdWVyaWVzIHdvdWxkIGJlIG5pY2UuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfYnJlYWtwb2ludDogYW55ID0gbnVsbDtcclxuXHJcblx0LyoqXHJcblx0ICogQ3VycmVudCBvcHRpb25zIHNldCBieSB0aGUgY2FsbGVyIGluY2x1ZGluZyBkZWZhdWx0cy5cclxuXHQgKi9cclxuXHRfb3B0aW9uczogT3dsT3B0aW9ucyA9IHt9O1xyXG5cclxuICAvKipcclxuICAgKiBJbnZhbGlkYXRlZCBwYXJ0cyB3aXRoaW4gdGhlIHVwZGF0ZSBwcm9jZXNzLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2ludmFsaWRhdGVkOiBhbnkgPSB7fTtcclxuXHJcbiAgLy8gSXMgbmVlZGVkIGZvciB0ZXN0c1xyXG4gIGdldCBpbnZhbGlkYXRlZCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9pbnZhbGlkYXRlZDtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogQ3VycmVudCBzdGF0ZSBpbmZvcm1hdGlvbiBhbmQgdGhlaXIgdGFncy5cclxuICAgKi9cclxuICBwcml2YXRlIF9zdGF0ZXM6IFN0YXRlcyA9IHtcclxuICAgIGN1cnJlbnQ6IHt9LFxyXG4gICAgdGFnczoge1xyXG4gICAgICBpbml0aWFsaXppbmc6IFsnYnVzeSddLFxyXG4gICAgICBhbmltYXRpbmc6IFsnYnVzeSddLFxyXG4gICAgICBkcmFnZ2luZzogWydpbnRlcmFjdGluZyddXHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLy8gaXMgbmVlZGVkIGZvciB0ZXN0c1xyXG4gIGdldCBzdGF0ZXMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fc3RhdGVzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcbiBcdCAqIE9yZGVyZWQgbGlzdCBvZiB3b3JrZXJzIGZvciB0aGUgdXBkYXRlIHByb2Nlc3MuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfcGlwZTogYW55W10gPSBbXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgIGZpbHRlcjogWyd3aWR0aCcsICdzZXR0aW5ncyddLFxyXG4gICAgLy8gICBydW46ICgpID0+IHtcclxuICAgIC8vICAgICB0aGlzLl93aWR0aCA9IHRoaXMuY2Fyb3VzZWxXaW5kb3dXaWR0aDtcclxuICAgIC8vICAgfVxyXG4gICAgLy8gfSxcclxuICAgIHtcclxuICAgICAgZmlsdGVyOiBbJ3dpZHRoJywgJ2l0ZW1zJywgJ3NldHRpbmdzJ10sXHJcbiAgICAgIHJ1bjogY2FjaGUgPT4ge1xyXG4gICAgICAgIGNhY2hlLmN1cnJlbnQgPSB0aGlzLl9pdGVtcyAmJiB0aGlzLl9pdGVtc1t0aGlzLnJlbGF0aXZlKHRoaXMuX2N1cnJlbnQpXS5pZDtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vIHtcclxuICAgIC8vICAgZmlsdGVyOiBbJ2l0ZW1zJywgJ3NldHRpbmdzJ10sXHJcbiAgICAvLyAgIHJ1bjogZnVuY3Rpb24oKSB7XHJcbiAgICAvLyAgICAgLy8gdGhpcy4kc3RhZ2UuY2hpbGRyZW4oJy5jbG9uZWQnKS5yZW1vdmUoKTtcclxuICAgIC8vICAgfVxyXG5cdFx0Ly8gfSxcclxuXHRcdCB7XHJcbiAgICAgIGZpbHRlcjogWyAnd2lkdGgnLCAnaXRlbXMnLCAnc2V0dGluZ3MnIF0sXHJcbiAgICAgIHJ1bjogKGNhY2hlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbWFyZ2luID0gdGhpcy5zZXR0aW5ncy5tYXJnaW4gfHwgJycsXHJcbiAgICAgICAgICBncmlkID0gIXRoaXMuc2V0dGluZ3MuYXV0b1dpZHRoLFxyXG4gICAgICAgICAgcnRsID0gdGhpcy5zZXR0aW5ncy5ydGwsXHJcbiAgICAgICAgICBjc3MgPSB7XHJcbiAgICAgICAgICAgICdtYXJnaW4tbGVmdCc6IHJ0bCA/IG1hcmdpbiA6ICcnLFxyXG4gICAgICAgICAgICAnbWFyZ2luLXJpZ2h0JzogcnRsID8gJycgOiBtYXJnaW5cclxuICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmKCFncmlkKSB7XHJcblx0XHRcdFx0XHR0aGlzLnNsaWRlc0RhdGEuZm9yRWFjaChzbGlkZSA9PiB7XHJcblx0XHRcdFx0XHRcdHNsaWRlLm1hcmdpbkwgPSBjc3NbJ21hcmdpbi1sZWZ0J107XHJcblx0XHRcdFx0XHRcdHNsaWRlLm1hcmdpblIgPSBjc3NbJ21hcmdpbi1yaWdodCddO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fVxyXG5cclxuICAgICAgICBjYWNoZS5jc3MgPSBjc3M7XHJcbiAgICAgIH1cclxuICAgIH0sIHtcclxuICAgICAgZmlsdGVyOiBbICd3aWR0aCcsICdpdGVtcycsICdzZXR0aW5ncycgXSxcclxuICAgICAgcnVuOiAoY2FjaGUpID0+IHtcclxuICAgICAgICBjb25zdCB3aWR0aDogYW55ID0gKyh0aGlzLndpZHRoKCkgLyB0aGlzLnNldHRpbmdzLml0ZW1zKS50b0ZpeGVkKDMpIC0gdGhpcy5zZXR0aW5ncy5tYXJnaW4sXHJcbiAgICAgICAgICBncmlkID0gIXRoaXMuc2V0dGluZ3MuYXV0b1dpZHRoLFxyXG4gICAgICAgICAgd2lkdGhzID0gW107XHJcblx0XHRcdFx0bGV0IG1lcmdlID0gbnVsbCxcclxuXHRcdFx0XHRcdFx0aXRlcmF0b3IgPSB0aGlzLl9pdGVtcy5sZW5ndGg7XHJcblxyXG4gICAgICAgIGNhY2hlLml0ZW1zID0ge1xyXG4gICAgICAgICAgbWVyZ2U6IGZhbHNlLFxyXG4gICAgICAgICAgd2lkdGg6IHdpZHRoXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgd2hpbGUgKGl0ZXJhdG9yLS0pIHtcclxuICAgICAgICAgIG1lcmdlID0gdGhpcy5fbWVyZ2Vyc1tpdGVyYXRvcl07XHJcbiAgICAgICAgICBtZXJnZSA9IHRoaXMuc2V0dGluZ3MubWVyZ2VGaXQgJiYgTWF0aC5taW4obWVyZ2UsIHRoaXMuc2V0dGluZ3MuaXRlbXMpIHx8IG1lcmdlO1xyXG4gICAgICAgICAgY2FjaGUuaXRlbXMubWVyZ2UgPSBtZXJnZSA+IDEgfHwgY2FjaGUuaXRlbXMubWVyZ2U7XHJcblxyXG4gICAgICAgICAgd2lkdGhzW2l0ZXJhdG9yXSA9ICFncmlkID8gdGhpcy5faXRlbXNbaXRlcmF0b3JdLndpZHRoID8gdGhpcy5faXRlbXNbaXRlcmF0b3JdLndpZHRoIDogd2lkdGggOiB3aWR0aCAqIG1lcmdlO1xyXG4gICAgICAgIH1cclxuXHJcblx0XHRcdFx0dGhpcy5fd2lkdGhzID0gd2lkdGhzO1xyXG5cclxuXHRcdFx0XHR0aGlzLnNsaWRlc0RhdGEuZm9yRWFjaCgoc2xpZGUsIGkpID0+IHtcclxuXHRcdFx0XHRcdHNsaWRlLndpZHRoID0gdGhpcy5fd2lkdGhzW2ldO1xyXG5cdFx0XHRcdFx0c2xpZGUubWFyZ2luUiA9IGNhY2hlLmNzc1snbWFyZ2luLXJpZ2h0J107XHJcblx0XHRcdFx0XHRzbGlkZS5tYXJnaW5MID0gY2FjaGUuY3NzWydtYXJnaW4tbGVmdCddO1xyXG5cdFx0XHRcdH0pO1xyXG4gICAgICB9XHJcbiAgICB9LCB7XHJcbiAgICAgIGZpbHRlcjogWyAnaXRlbXMnLCAnc2V0dGluZ3MnIF0sXHJcbiAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNsb25lczogYW55W10gPSBbXSxcclxuICAgICAgICAgIGl0ZW1zOiBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlW10gPSB0aGlzLl9pdGVtcyxcclxuICAgICAgICAgIHNldHRpbmdzOiBhbnkgPSB0aGlzLnNldHRpbmdzLFxyXG4gICAgICAgICAgLy8gVE9ETzogU2hvdWxkIGJlIGNvbXB1dGVkIGZyb20gbnVtYmVyIG9mIG1pbiB3aWR0aCBpdGVtcyBpbiBzdGFnZVxyXG4gICAgICAgICAgdmlldyA9IE1hdGgubWF4KHNldHRpbmdzLml0ZW1zICogMiwgNCksXHJcbiAgICAgICAgICBzaXplID0gTWF0aC5jZWlsKGl0ZW1zLmxlbmd0aCAvIDIpICogMjtcclxuXHRcdFx0XHRsZXQgIGFwcGVuZDogYW55W10gPSBbXSxcclxuICAgICAgICAgIHByZXBlbmQ6IGFueVtdID0gW10sXHJcblx0XHRcdFx0XHRyZXBlYXQgPSBzZXR0aW5ncy5sb29wICYmIGl0ZW1zLmxlbmd0aCA/IHNldHRpbmdzLnJld2luZCA/IHZpZXcgOiBNYXRoLm1heCh2aWV3LCBzaXplKSA6IDA7XHJcblxyXG4gICAgICAgIHJlcGVhdCAvPSAyO1xyXG5cclxuICAgICAgICB3aGlsZSAocmVwZWF0LS0pIHtcclxuICAgICAgICAgIC8vIFN3aXRjaCB0byBvbmx5IHVzaW5nIGFwcGVuZGVkIGNsb25lc1xyXG4gICAgICAgICAgY2xvbmVzLnB1c2godGhpcy5ub3JtYWxpemUoY2xvbmVzLmxlbmd0aCAvIDIsIHRydWUpKTtcclxuICAgICAgICAgIGFwcGVuZC5wdXNoKHsgLi4udGhpcy5zbGlkZXNEYXRhW2Nsb25lc1tjbG9uZXMubGVuZ3RoIC0gMV1dfSk7XHJcblx0XHRcdFx0XHRjbG9uZXMucHVzaCh0aGlzLm5vcm1hbGl6ZShpdGVtcy5sZW5ndGggLSAxIC0gKGNsb25lcy5sZW5ndGggLSAxKSAvIDIsIHRydWUpKTtcclxuXHRcdFx0XHRcdHByZXBlbmQudW5zaGlmdCh7IC4uLnRoaXMuc2xpZGVzRGF0YVtjbG9uZXNbY2xvbmVzLmxlbmd0aCAtIDFdXX0pO1xyXG4gICAgICAgIH1cclxuXHJcblx0XHRcdFx0dGhpcy5fY2xvbmVzID0gY2xvbmVzO1xyXG5cclxuXHRcdFx0XHRhcHBlbmQgPSBhcHBlbmQubWFwKHNsaWRlID0+IHtcclxuXHRcdFx0XHRcdHNsaWRlLmlkID0gYGNsb25lZC0ke3NsaWRlLmlkfWA7XHJcblx0XHRcdFx0XHRzbGlkZS5hY3RpdmUgPSBmYWxzZTtcclxuXHRcdFx0XHRcdHNsaWRlLmNsb25lZCA9IHRydWU7XHJcblx0XHRcdFx0XHRyZXR1cm4gc2xpZGU7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdHByZXBlbmQgPSBwcmVwZW5kLm1hcChzbGlkZSA9PiB7XHJcblx0XHRcdFx0XHRzbGlkZS5pZCA9IGBjbG9uZWQtJHtzbGlkZS5pZH1gO1xyXG5cdFx0XHRcdFx0c2xpZGUuYWN0aXZlID0gZmFsc2U7XHJcblx0XHRcdFx0XHRzbGlkZS5jbG9uZWQgPSB0cnVlO1xyXG5cdFx0XHRcdFx0cmV0dXJuIHNsaWRlO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHR0aGlzLnNsaWRlc0RhdGEgPSBwcmVwZW5kLmNvbmNhdCh0aGlzLnNsaWRlc0RhdGEpLmNvbmNhdChhcHBlbmQpO1xyXG4gICAgICB9XHJcbiAgICB9LCB7XHJcbiAgICAgIGZpbHRlcjogWyAnd2lkdGgnLCAnaXRlbXMnLCAnc2V0dGluZ3MnIF0sXHJcbiAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJ0bCA9IHRoaXMuc2V0dGluZ3MucnRsID8gMSA6IC0xLFxyXG4gICAgICAgICAgc2l6ZSA9IHRoaXMuX2Nsb25lcy5sZW5ndGggKyB0aGlzLl9pdGVtcy5sZW5ndGgsXHJcbiAgICAgICAgICBjb29yZGluYXRlcyA9IFtdO1xyXG4gICAgICAgIGxldCBpdGVyYXRvciA9IC0xLFxyXG4gICAgICAgICAgcHJldmlvdXMgPSAwLFxyXG4gICAgICAgICAgY3VycmVudCA9IDA7XHJcblxyXG4gICAgICAgIHdoaWxlICgrK2l0ZXJhdG9yIDwgc2l6ZSkge1xyXG4gICAgICAgICAgcHJldmlvdXMgPSBjb29yZGluYXRlc1tpdGVyYXRvciAtIDFdIHx8IDA7XHJcbiAgICAgICAgICBjdXJyZW50ID0gdGhpcy5fd2lkdGhzW3RoaXMucmVsYXRpdmUoaXRlcmF0b3IpXSArIHRoaXMuc2V0dGluZ3MubWFyZ2luO1xyXG4gICAgICAgICAgY29vcmRpbmF0ZXMucHVzaChwcmV2aW91cyArIGN1cnJlbnQgKiBydGwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fY29vcmRpbmF0ZXMgPSBjb29yZGluYXRlcztcclxuICAgICAgfVxyXG4gICAgfSwge1xyXG4gICAgICBmaWx0ZXI6IFsgJ3dpZHRoJywgJ2l0ZW1zJywgJ3NldHRpbmdzJyBdLFxyXG4gICAgICBydW46ICgpID0+IHtcclxuICAgICAgICBjb25zdCBwYWRkaW5nID0gdGhpcy5zZXR0aW5ncy5zdGFnZVBhZGRpbmcsXHJcbiAgICAgICAgICBjb29yZGluYXRlcyA9IHRoaXMuX2Nvb3JkaW5hdGVzLFxyXG4gICAgICAgICAgY3NzID0ge1xyXG4gICAgICAgICAgICAnd2lkdGgnOiBNYXRoLmNlaWwoTWF0aC5hYnMoY29vcmRpbmF0ZXNbY29vcmRpbmF0ZXMubGVuZ3RoIC0gMV0pKSArIHBhZGRpbmcgKiAyLFxyXG4gICAgICAgICAgICAncGFkZGluZy1sZWZ0JzogcGFkZGluZyB8fCAnJyxcclxuICAgICAgICAgICAgJ3BhZGRpbmctcmlnaHQnOiBwYWRkaW5nIHx8ICcnXHJcblx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHR0aGlzLnN0YWdlRGF0YS53aWR0aCA9IGNzcy53aWR0aDsgLy8gdXNlIHRoaXMgcHJvcGVydHkgaW4gKm5nSWYgZGlyZWN0aXZlIGZvciAub3dsLXN0YWdlIGVsZW1lbnRcclxuXHRcdFx0XHR0aGlzLnN0YWdlRGF0YS5wYWRkaW5nTCA9IGNzc1sncGFkZGluZy1sZWZ0J107XHJcblx0XHRcdFx0dGhpcy5zdGFnZURhdGEucGFkZGluZ1IgPSBjc3NbJ3BhZGRpbmctcmlnaHQnXTtcclxuICAgICAgfVxyXG4gICAgfSwge1xyXG4gICAgLy8gICBmaWx0ZXI6IFsgJ3dpZHRoJywgJ2l0ZW1zJywgJ3NldHRpbmdzJyBdLFxyXG4gICAgLy8gICBydW46IGNhY2hlID0+IHtcclxuXHRcdC8vIFx0XHQvLyB0aGlzIG1ldGhvZCBzZXRzIHRoZSB3aWR0aCBmb3IgZXZlcnkgc2xpZGUsIGJ1dCBJIHNldCBpdCBpbiBkaWZmZXJlbnQgd2F5IGVhcmxpZXJcclxuXHRcdC8vIFx0XHRjb25zdCBncmlkID0gIXRoaXMuc2V0dGluZ3MuYXV0b1dpZHRoLFxyXG5cdFx0Ly8gXHRcdGl0ZW1zID0gdGhpcy4kc3RhZ2UuY2hpbGRyZW4oKTsgLy8gdXNlIHRoaXMuc2xpZGVzRGF0YVxyXG4gICAgLy8gICAgIGxldCBpdGVyYXRvciA9IHRoaXMuX2Nvb3JkaW5hdGVzLmxlbmd0aDtcclxuXHJcbiAgICAvLyAgICAgaWYgKGdyaWQgJiYgY2FjaGUuaXRlbXMubWVyZ2UpIHtcclxuICAgIC8vICAgICAgIHdoaWxlIChpdGVyYXRvci0tKSB7XHJcbiAgICAvLyAgICAgICAgIGNhY2hlLmNzcy53aWR0aCA9IHRoaXMuX3dpZHRoc1t0aGlzLnJlbGF0aXZlKGl0ZXJhdG9yKV07XHJcbiAgICAvLyAgICAgICAgIGl0ZW1zLmVxKGl0ZXJhdG9yKS5jc3MoY2FjaGUuY3NzKTtcclxuICAgIC8vICAgICAgIH1cclxuICAgIC8vICAgICB9IGVsc2UgaWYgKGdyaWQpIHtcclxuICAgIC8vICAgICAgIGNhY2hlLmNzcy53aWR0aCA9IGNhY2hlLml0ZW1zLndpZHRoO1xyXG4gICAgLy8gICAgICAgaXRlbXMuY3NzKGNhY2hlLmNzcyk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICB9XHJcbiAgICAvLyB9LCB7XHJcbiAgICAvLyAgIGZpbHRlcjogWyAnaXRlbXMnIF0sXHJcbiAgICAvLyAgIHJ1bjogZnVuY3Rpb24oKSB7XHJcbiAgICAvLyAgICAgdGhpcy5fY29vcmRpbmF0ZXMubGVuZ3RoIDwgMSAmJiB0aGlzLiRzdGFnZS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgLy8gICB9XHJcbiAgICAvLyB9LCB7XHJcbiAgICAgIGZpbHRlcjogWyAnd2lkdGgnLCAnaXRlbXMnLCAnc2V0dGluZ3MnIF0sXHJcbiAgICAgIHJ1bjogY2FjaGUgPT4ge1xyXG4gICAgICAgIGxldCBjdXJyZW50ID0gY2FjaGUuY3VycmVudCA/IHRoaXMuc2xpZGVzRGF0YS5maW5kSW5kZXgoc2xpZGUgPT4gc2xpZGUuaWQgPT09IGNhY2hlLmN1cnJlbnQpIDogMDtcclxuICAgICAgIFx0Y3VycmVudCA9IE1hdGgubWF4KHRoaXMubWluaW11bSgpLCBNYXRoLm1pbih0aGlzLm1heGltdW0oKSwgY3VycmVudCkpO1xyXG4gICAgICAgIHRoaXMucmVzZXQoY3VycmVudCk7XHJcbiAgICAgIH1cclxuICAgIH0sIHtcclxuICAgICAgZmlsdGVyOiBbICdwb3NpdGlvbicgXSxcclxuICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5hbmltYXRlKHRoaXMuY29vcmRpbmF0ZXModGhpcy5fY3VycmVudCkpO1xyXG4gICAgICB9XHJcbiAgICB9LCB7XHJcbiAgICAgIGZpbHRlcjogWyAnd2lkdGgnLCAncG9zaXRpb24nLCAnaXRlbXMnLCAnc2V0dGluZ3MnIF0sXHJcbiAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJ0bCA9IHRoaXMuc2V0dGluZ3MucnRsID8gMSA6IC0xLFxyXG5cdFx0XHRcdFx0cGFkZGluZyA9IHRoaXMuc2V0dGluZ3Muc3RhZ2VQYWRkaW5nICogMixcclxuXHRcdFx0XHRcdG1hdGNoZXMgPSBbXTtcclxuXHRcdFx0XHRsZXQgYmVnaW4sIGVuZCwgaW5uZXIsIG91dGVyLCBpLCBuO1xyXG5cclxuXHRcdFx0XHRiZWdpbiA9IHRoaXMuY29vcmRpbmF0ZXModGhpcy5jdXJyZW50KCkpO1xyXG5cdFx0XHRcdGlmICh0eXBlb2YgYmVnaW4gPT09ICdudW1iZXInICkge1xyXG5cdFx0XHRcdFx0YmVnaW4gKz0gcGFkZGluZztcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0YmVnaW4gPSAwO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0ZW5kID0gYmVnaW4gKyB0aGlzLndpZHRoKCkgKiBydGw7XHJcblxyXG5cdFx0XHRcdGlmIChydGwgPT09IC0xICYmIHRoaXMuc2V0dGluZ3MuY2VudGVyKSB7XHJcblx0XHRcdFx0XHRjb25zdCByZXN1bHQgPVx0dGhpcy5fY29vcmRpbmF0ZXMuZmlsdGVyKGVsZW1lbnQgPT4ge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5zZXR0aW5ncy5pdGVtcyAlIDIgPT09IDEgPyBlbGVtZW50ID49IGJlZ2luIDogZWxlbWVudCA+IGJlZ2luO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRiZWdpbiA9IHJlc3VsdC5sZW5ndGggPyByZXN1bHRbcmVzdWx0Lmxlbmd0aCAtIDFdIDogYmVnaW47XHJcblx0XHRcdFx0fVxyXG5cclxuICAgICAgICBmb3IgKGkgPSAwLCBuID0gdGhpcy5fY29vcmRpbmF0ZXMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICBpbm5lciA9IHRoaXMuc2V0dGluZ3MucnRsID8gTWF0aC5jZWlsKHRoaXMuX2Nvb3JkaW5hdGVzW2kgLSAxXSB8fCAwKSA6IE1hdGguY2VpbCh0aGlzLl9jb29yZGluYXRlc1tpIC0gMV0gfHwgMCk7XHJcblx0XHRcdFx0XHRvdXRlciA9IE1hdGguY2VpbChNYXRoLmFicyh0aGlzLl9jb29yZGluYXRlc1tpXSkgKyBwYWRkaW5nICogcnRsKTtcclxuXHJcbiAgICAgICAgICBpZiAoKHRoaXMuX29wKGlubmVyLCAnPD0nLCBiZWdpbikgJiYgKHRoaXMuX29wKGlubmVyLCAnPicsIGVuZCkpKVxyXG4gICAgICAgICAgICB8fCAodGhpcy5fb3Aob3V0ZXIsICc8JywgYmVnaW4pICYmIHRoaXMuX29wKG91dGVyLCAnPicsIGVuZCkpKSB7XHJcbiAgICAgICAgICAgIG1hdGNoZXMucHVzaChpKTtcclxuICAgICAgICAgIH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHRoaXMuc2xpZGVzRGF0YS5mb3JFYWNoKHNsaWRlID0+IHtcclxuXHRcdFx0XHRcdHNsaWRlLmFjdGl2ZSA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0cmV0dXJuIHNsaWRlO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdG1hdGNoZXMuZm9yRWFjaChpdGVtID0+IHtcclxuXHRcdFx0XHRcdHRoaXMuc2xpZGVzRGF0YVtpdGVtXS5hY3RpdmUgPSB0cnVlO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5jZW50ZXIpIHtcclxuXHRcdFx0XHRcdHRoaXMuc2xpZGVzRGF0YS5mb3JFYWNoKHNsaWRlID0+IHtcclxuXHRcdFx0XHRcdFx0c2xpZGUuY2VudGVyID0gZmFsc2U7XHJcblx0XHRcdFx0XHRcdHJldHVybiBzbGlkZTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0dGhpcy5zbGlkZXNEYXRhW3RoaXMuY3VycmVudCgpXS5jZW50ZXIgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIF07XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIF92aWV3U2V0dGluZ3NTaGlwcGVyJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXHJcblx0ICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfdmlld1NldHRpbmdzU2hpcHBlciQgU3ViamVjdFxyXG5cdCAqL1xyXG5cdGdldFZpZXdDdXJTZXR0aW5ncygpOiBPYnNlcnZhYmxlPENhcm91c2VsQ3VycmVudERhdGE+IHtcclxuXHRcdHJldHVybiB0aGlzLl92aWV3U2V0dGluZ3NTaGlwcGVyJC5hc09ic2VydmFibGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIF9pbml0aWFsaXplZENhcm91c2VsJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXHJcblx0ICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfaW5pdGlhbGl6ZWRDYXJvdXNlbCQgU3ViamVjdFxyXG5cdCAqL1xyXG5cdGdldEluaXRpYWxpemVkU3RhdGUoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcclxuXHRcdHJldHVybiB0aGlzLl9pbml0aWFsaXplZENhcm91c2VsJC5hc09ic2VydmFibGUoKVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgX2NoYW5nZVNldHRpbmdzQ2Fyb3VzZWwkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcclxuXHQgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIF9jaGFuZ2VTZXR0aW5nc0Nhcm91c2VsJCBTdWJqZWN0XHJcblx0ICovXHJcblx0Z2V0Q2hhbmdlU3RhdGUoKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuXHRcdHJldHVybiB0aGlzLl9jaGFuZ2VTZXR0aW5nc0Nhcm91c2VsJC5hc09ic2VydmFibGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIF9jaGFuZ2VkU2V0dGluZ3NDYXJvdXNlbCQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxyXG5cdCAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX2NoYW5nZWRTZXR0aW5nc0Nhcm91c2VsJCBTdWJqZWN0XHJcblx0ICovXHJcblx0Z2V0Q2hhbmdlZFN0YXRlKCk6IE9ic2VydmFibGU8YW55PiB7XHJcblx0XHRyZXR1cm4gdGhpcy5fY2hhbmdlZFNldHRpbmdzQ2Fyb3VzZWwkLmFzT2JzZXJ2YWJsZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgX3RyYW5zbGF0ZWRDYXJvdXNlbCQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxyXG5cdCAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX3RyYW5zbGF0ZWRDYXJvdXNlbCQgU3ViamVjdFxyXG5cdCAqL1xyXG5cdGdldFRyYW5zbGF0ZWRTdGF0ZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3RyYW5zbGF0ZWRDYXJvdXNlbCQuYXNPYnNlcnZhYmxlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBfcmVzaXplQ2Fyb3VzZWwkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcclxuXHQgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIF9yZXNpemVDYXJvdXNlbCQgU3ViamVjdFxyXG5cdCAqL1xyXG5cdGdldFJlc2l6ZVN0YXRlKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XHJcblx0XHRyZXR1cm4gdGhpcy5fcmVzaXplQ2Fyb3VzZWwkLmFzT2JzZXJ2YWJsZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgX3Jlc2l6ZWRDYXJvdXNlbCQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxyXG5cdCAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX3Jlc2l6ZWRDYXJvdXNlbCQgU3ViamVjdFxyXG5cdCAqL1xyXG5cdGdldFJlc2l6ZWRTdGF0ZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3Jlc2l6ZWRDYXJvdXNlbCQuYXNPYnNlcnZhYmxlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBfcmVmcmVzaENhcm91c2VsJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXHJcblx0ICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfcmVmcmVzaENhcm91c2VsJCBTdWJqZWN0XHJcblx0ICovXHJcblx0Z2V0UmVmcmVzaFN0YXRlKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XHJcblx0XHRyZXR1cm4gdGhpcy5fcmVmcmVzaENhcm91c2VsJC5hc09ic2VydmFibGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIF9yZWZyZXNoZWRDYXJvdXNlbCQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxyXG5cdCAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX3JlZnJlc2hlZENhcm91c2VsJCBTdWJqZWN0XHJcblx0ICovXHJcblx0Z2V0UmVmcmVzaGVkU3RhdGUoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcclxuXHRcdHJldHVybiB0aGlzLl9yZWZyZXNoZWRDYXJvdXNlbCQuYXNPYnNlcnZhYmxlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXR1cHMgY3VzdG9tIG9wdGlvbnMgZXhwYW5kaW5nIGRlZmF1bHQgb3B0aW9uc1xyXG5cdCAqIEBwYXJhbSBvcHRpb25zIGN1c3RvbSBvcHRpb25zXHJcblx0ICovXHJcblx0c2V0T3B0aW9ucyhvcHRpb25zOiBPd2xPcHRpb25zKSB7XHJcblx0XHRjb25zdCBjb25maWdPcHRpb25zOiBPd2xPcHRpb25zID0gbmV3IE93bENhcm91c2VsT0NvbmZpZygpO1xyXG5cdFx0Y29uc3QgY2hlY2tlZE9wdGlvbnM6IE93bE9wdGlvbnMgPSB0aGlzLl92YWxpZGF0ZU9wdGlvbnMob3B0aW9ucywgY29uZmlnT3B0aW9ucyk7XHJcblx0XHR0aGlzLl9vcHRpb25zID0geyAuLi5jb25maWdPcHRpb25zLCAuLi5jaGVja2VkT3B0aW9uc307XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3Mgd2hldGhlciB1c2VyJ3Mgb3B0aW9uIGFyZSBzZXQgcHJvcGVybHkuIENoZWtpbmcgaXMgYmFzZWQgb24gdHlwaW5ncztcclxuXHQgKiBAcGFyYW0gb3B0aW9ucyBvcHRpb25zIHNldCBieSB1c2VyXHJcblx0ICogQHBhcmFtIGNvbmZpZ09wdGlvbnMgZGVmYXVsdCBvcHRpb25zXHJcblx0ICogQHJldHVybnMgY2hlY2tlZCBhbmQgbW9kaWZpZWQgKGlmIGl0J3MgbmVlZGVkKSB1c2VyJ3Mgb3B0aW9uc1xyXG5cdCAqXHJcblx0ICogTm90ZXM6XHJcblx0ICogXHQtIGlmIHVzZXIgc2V0IG9wdGlvbiB3aXRoIHdyb25nIHR5cGUsIGl0J2xsIGJlIHdyaXR0ZW4gaW4gY29uc29sZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgX3ZhbGlkYXRlT3B0aW9ucyhvcHRpb25zOiBPd2xPcHRpb25zLCBjb25maWdPcHRpb25zOiBPd2xPcHRpb25zKTogT3dsT3B0aW9ucyB7XHJcblx0XHRjb25zdCBjaGVja2VkT3B0aW9uczogT3dsT3B0aW9ucyA9IHsgLi4ub3B0aW9uc307XHJcblx0XHRjb25zdCBtb2NrZWRUeXBlcyA9IG5ldyBPd2xPcHRpb25zTW9ja2VkVHlwZXMoKTtcclxuXHJcblx0XHRmb3IgKGNvbnN0IGtleSBpbiBjaGVja2VkT3B0aW9ucykge1xyXG5cdFx0XHRpZiAoY2hlY2tlZE9wdGlvbnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG5cclxuXHRcdFx0XHQvLyBjb25kaXRpb24gY291bGQgYmUgc2hvcnRlbmVkIGJ1dCBpdCBnZXRzIGhhcmRlciBmb3IgdW5kZXJzdGFuZGluZ1xyXG5cdFx0XHRcdGlmIChtb2NrZWRUeXBlc1trZXldID09PSAnbnVtYmVyJykge1xyXG5cdFx0XHRcdFx0aWYgKHRoaXMuX2lzTnVtZXJpYyhjaGVja2VkT3B0aW9uc1trZXldKSkge1xyXG5cdFx0XHRcdFx0XHRjaGVja2VkT3B0aW9uc1trZXldID0gK2NoZWNrZWRPcHRpb25zW2tleV07XHJcblx0XHRcdFx0XHRcdGNoZWNrZWRPcHRpb25zW2tleV0gPSBrZXkgPT09ICdpdGVtcycgPyB0aGlzLl92YWxpZGF0ZUl0ZW1zKGNoZWNrZWRPcHRpb25zW2tleV0pIDogY2hlY2tlZE9wdGlvbnNba2V5XTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGNoZWNrZWRPcHRpb25zW2tleV0gPSBzZXRSaWdodE9wdGlvbihtb2NrZWRUeXBlc1trZXldLCBrZXkpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gZWxzZSBpZiAobW9ja2VkVHlwZXNba2V5XSA9PT0gJ2Jvb2xlYW4nICYmIHR5cGVvZiBjaGVja2VkT3B0aW9uc1trZXldICE9PSAnYm9vbGVhbicpIHtcclxuXHRcdFx0XHRcdGNoZWNrZWRPcHRpb25zW2tleV0gPSBzZXRSaWdodE9wdGlvbihtb2NrZWRUeXBlc1trZXldLCBrZXkpO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAobW9ja2VkVHlwZXNba2V5XSA9PT0gJ251bWJlcnxib29sZWFuJyAmJiAhdGhpcy5faXNOdW1iZXJPckJvb2xlYW4oY2hlY2tlZE9wdGlvbnNba2V5XSkpIHtcclxuXHRcdFx0XHRcdGNoZWNrZWRPcHRpb25zW2tleV0gPSBzZXRSaWdodE9wdGlvbihtb2NrZWRUeXBlc1trZXldLCBrZXkpO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAobW9ja2VkVHlwZXNba2V5XSA9PT0gJ251bWJlcnxzdHJpbmcnICYmICF0aGlzLl9pc051bWJlck9yU3RyaW5nKGNoZWNrZWRPcHRpb25zW2tleV0pKSB7XHJcblx0XHRcdFx0XHRjaGVja2VkT3B0aW9uc1trZXldID0gc2V0UmlnaHRPcHRpb24obW9ja2VkVHlwZXNba2V5XSwga2V5KTtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKG1vY2tlZFR5cGVzW2tleV0gPT09ICdzdHJpbmdbXScpIHtcclxuXHRcdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KGNoZWNrZWRPcHRpb25zW2tleV0pKSB7XHJcblx0XHRcdFx0XHRcdGxldCBpc1N0cmluZyA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRjaGVja2VkT3B0aW9uc1trZXldLmZvckVhY2goZWxlbWVudCA9PiB7XHJcblx0XHRcdFx0XHRcdFx0aXNTdHJpbmcgPSB0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycgPyB0cnVlIDogZmFsc2U7XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRpZiAoIWlzU3RyaW5nKSB7IGNoZWNrZWRPcHRpb25zW2tleV0gPSBzZXRSaWdodE9wdGlvbihtb2NrZWRUeXBlc1trZXldLCBrZXkpIH07XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRjaGVja2VkT3B0aW9uc1trZXldID0gc2V0UmlnaHRPcHRpb24obW9ja2VkVHlwZXNba2V5XSwga2V5KTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBzZXRSaWdodE9wdGlvbih0eXBlOiBzdHJpbmcsIGtleTogYW55KTogYW55IHtcclxuXHRcdFx0Y29uc29sZS5sb2coYG9wdGlvbnMuJHtrZXl9IG11c3QgYmUgdHlwZSBvZiAke3R5cGV9OyAke2tleX09JHtvcHRpb25zW2tleV19IHNraXBwZWQgdG8gZGVmYXVsdHM6ICR7a2V5fT0ke2NvbmZpZ09wdGlvbnNba2V5XX1gKTtcclxuXHRcdFx0cmV0dXJuIGNvbmZpZ09wdGlvbnNba2V5XTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gY2hlY2tlZE9wdGlvbnM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3Mgb3B0aW9uIGl0ZW1zIHNldCBieSB1c2VyIGFuZCBpZiBpdCBiaWdnZXIgdGhhbiBudW1iZXIgb2Ygc2xpZGVzIHRoZW4gcmV0dXJucyBudW1iZXIgb2Ygc2xpZGVzXHJcblx0ICogQHBhcmFtIGl0ZW1zIG9wdGlvbiBpdGVtcyBzZXQgYnkgdXNlclxyXG5cdCAqIEByZXR1cm5zIHJpZ2h0IG51bWJlciBvZiBpdGVtc1xyXG5cdCAqL1xyXG5cdHByaXZhdGUgX3ZhbGlkYXRlSXRlbXMoaXRlbXM6IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRsZXQgcmVzdWx0OiBudW1iZXI7XHJcblx0XHRpZiAoaXRlbXMgPj0gdGhpcy5faXRlbXMubGVuZ3RoKSB7XHJcblx0XHRcdHJlc3VsdCA9IHRoaXMuX2l0ZW1zLmxlbmd0aCA7XHJcblx0XHRcdGNvbnNvbGUubG9nKCdvcHRpb24gXFwnaXRlbXNcXCcgaW4geW91ciBvcHRpb25zIGlzIGJpZ2dlciB0aGFuIG51bWJlciBvZiBzbGlkZXM7IFRoaXMgb3B0aW9uIGlzIHVwZGF0ZWQgdG8gY3VycmVudCBudW1iZXIgb2Ygc2xpZGVzIGFuZCBuYXZpZ2F0aW9uIGdvdCBkaXNhYmxlZCcpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmVzdWx0ID0gaXRlbXM7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0IGN1cnJlbnQgd2lkdGggb2YgY2Fyb3VzZWxcclxuXHQgKiBAcGFyYW0gd2lkdGggd2lkdGggb2YgY2Fyb3VzZWwgV2luZG93XHJcblx0ICovXHJcblx0c2V0Q2Fyb3VzZWxXaWR0aCh3aWR0aDogbnVtYmVyKSB7XHJcblx0XHR0aGlzLl93aWR0aCA9IHdpZHRoO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogU2V0dXBzIHRoZSBjdXJyZW50IHNldHRpbmdzLlxyXG5cdCAqIEB0b2RvIFJlbW92ZSByZXNwb25zaXZlIGNsYXNzZXMuIFdoeSBzaG91bGQgYWRhcHRpdmUgZGVzaWducyBiZSBicm91Z2h0IGludG8gSUU4P1xyXG5cdCAqIEB0b2RvIFN1cHBvcnQgZm9yIG1lZGlhIHF1ZXJpZXMgYnkgdXNpbmcgYG1hdGNoTWVkaWFgIHdvdWxkIGJlIG5pY2UuXHJcblx0ICogQHBhcmFtIGNhcm91c2VsV2lkdGggd2lkdGggb2YgY2Fyb3VzZWxcclxuXHQgKiBAcGFyYW0gc2xpZGVzIGFycmF5IG9mIHNsaWRlc1xyXG5cdCAqIEBwYXJhbSBvcHRpb25zIG9wdGlvbnMgc2V0IGJ5IHVzZXJcclxuXHQgKi9cclxuICBzZXR1cChjYXJvdXNlbFdpZHRoOiBudW1iZXIsIHNsaWRlczogQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZVtdLCBvcHRpb25zOiBPd2xPcHRpb25zKSB7XHJcblx0XHR0aGlzLnNldENhcm91c2VsV2lkdGgoY2Fyb3VzZWxXaWR0aCk7XHJcblx0XHR0aGlzLnNldEl0ZW1zKHNsaWRlcyk7XHJcblx0XHR0aGlzLl9kZWZpbmVTbGlkZXNEYXRhKCk7XHJcblx0XHR0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XHJcblxyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IHsgLi4udGhpcy5fb3B0aW9uc307XHJcblxyXG5cdFx0dGhpcy5zZXRWaWV3cG9ydEl0ZW1zTigpO1xyXG5cclxuXHRcdHRoaXMuX3RyaWdnZXIoJ2NoYW5nZScsIHsgcHJvcGVydHk6IHsgbmFtZTogJ3NldHRpbmdzJywgdmFsdWU6IHRoaXMuc2V0dGluZ3MgfSB9KTtcclxuXHRcdHRoaXMuaW52YWxpZGF0ZSgnc2V0dGluZ3MnKTsgLy8gbXVzdCBiZSBjYWxsIG9mIHRoaXMgZnVuY3Rpb247XHJcblx0XHR0aGlzLl90cmlnZ2VyKCdjaGFuZ2VkJywgeyBwcm9wZXJ0eTogeyBuYW1lOiAnc2V0dGluZ3MnLCB2YWx1ZTogdGhpcy5zZXR0aW5ncyB9IH0pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0IG51bWJlciBvZiBpdGVtcyBmb3IgY3VycmVudCB2aWV3cG9ydFxyXG5cdCAqL1xyXG5cdHNldFZpZXdwb3J0SXRlbXNOKCkge1xyXG5cdFx0Y29uc3Qgdmlld3BvcnQgPSB0aGlzLl93aWR0aCxcclxuXHRcdFx0b3ZlcndyaXRlcyA9IHRoaXMuX29wdGlvbnMucmVzcG9uc2l2ZTtcclxuXHRcdGxldFx0bWF0Y2ggPSAtMTtcclxuXHJcblx0XHRpZiAoIU9iamVjdC5rZXlzKG92ZXJ3cml0ZXMpLmxlbmd0aCkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yIChjb25zdCBrZXkgaW4gb3ZlcndyaXRlcykge1xyXG5cdFx0XHRpZiAob3ZlcndyaXRlcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcblx0XHRcdFx0aWYgKCtrZXkgPD0gdmlld3BvcnQgJiYgK2tleSA+IG1hdGNoKSB7XHJcblx0XHRcdFx0XHRtYXRjaCA9IE51bWJlcihrZXkpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSB7IC4uLnRoaXMuc2V0dGluZ3MsIGl0ZW1zOiB0aGlzLl92YWxpZGF0ZUl0ZW1zKG92ZXJ3cml0ZXNbbWF0Y2hdLml0ZW1zKX07XHJcblx0XHQvLyBpZiAodHlwZW9mIHRoaXMuc2V0dGluZ3Muc3RhZ2VQYWRkaW5nID09PSAnZnVuY3Rpb24nKSB7XHJcblx0XHQvLyBcdHRoaXMuc2V0dGluZ3Muc3RhZ2VQYWRkaW5nID0gdGhpcy5zZXR0aW5ncy5zdGFnZVBhZGRpbmcoKTtcclxuXHRcdC8vIH1cclxuXHRcdGRlbGV0ZSB0aGlzLnNldHRpbmdzLnJlc3BvbnNpdmU7XHJcblx0XHR0aGlzLm93bERPTURhdGEuaXNSZXNwb25zaXZlID0gdHJ1ZTtcclxuXHRcdHRoaXMuX2JyZWFrcG9pbnQgPSBtYXRjaDtcclxuXHJcblx0XHR0aGlzLmludmFsaWRhdGUoJ3NldHRpbmdzJyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJbml0aWFsaXplcyB0aGUgY2Fyb3VzZWwuXHJcblx0ICogQHBhcmFtIHNsaWRlcyBhcnJheSBvZiBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlXHJcblx0ICovXHJcbiAgaW5pdGlhbGl6ZShzbGlkZXM6IENhcm91c2VsU2xpZGVEaXJlY3RpdmVbXSkge1xyXG5cdFx0dGhpcy5lbnRlcignaW5pdGlhbGl6aW5nJyk7XHJcblx0XHQvLyB0aGlzLnRyaWdnZXIoJ2luaXRpYWxpemUnKTtcclxuXHJcblx0XHR0aGlzLm93bERPTURhdGEucnRsID0gdGhpcy5zZXR0aW5ncy5ydGw7XHJcblxyXG5cdFx0c2xpZGVzLmZvckVhY2goaXRlbSA9PiB7XHJcblx0XHRcdGNvbnN0IG1lcmdlTjogbnVtYmVyID0gdGhpcy5zZXR0aW5ncy5tZXJnZSA/IGl0ZW0uZGF0YU1lcmdlIDogMTtcclxuXHRcdFx0dGhpcy5fbWVyZ2Vycy5wdXNoKG1lcmdlTik7XHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLnJlc2V0KHRoaXMuX2lzTnVtZXJpYyh0aGlzLnNldHRpbmdzLnN0YXJ0UG9zaXRpb24pID8gdGhpcy5zZXR0aW5ncy5zdGFydFBvc2l0aW9uIDogMCk7XHJcblxyXG5cdFx0dGhpcy5pbnZhbGlkYXRlKCdpdGVtcycpO1xyXG5cdFx0dGhpcy5yZWZyZXNoKCk7XHJcblxyXG5cdFx0dGhpcy5vd2xET01EYXRhLmlzTG9hZGVkID0gdHJ1ZTtcclxuXHRcdHRoaXMub3dsRE9NRGF0YS5pc01vdXNlRHJhZ2FibGUgPSB0aGlzLnNldHRpbmdzLm1vdXNlRHJhZztcclxuXHRcdHRoaXMub3dsRE9NRGF0YS5pc1RvdWNoRHJhZ2FibGUgPSB0aGlzLnNldHRpbmdzLnRvdWNoRHJhZztcclxuXHJcblx0XHR0aGlzLnNlbmRDaGFuZ2VzKCk7XHJcblxyXG5cdFx0dGhpcy5sZWF2ZSgnaW5pdGlhbGl6aW5nJyk7XHJcblx0XHR0aGlzLl90cmlnZ2VyKCdpbml0aWFsaXplZCcpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNlbmRzIGFsbCBkYXRhIG5lZWRlZCBmb3IgVmlld1xyXG5cdCAqL1xyXG5cdHNlbmRDaGFuZ2VzKCkge1xyXG5cdFx0dGhpcy5fdmlld1NldHRpbmdzU2hpcHBlciQubmV4dCh7XHJcblx0XHRcdG93bERPTURhdGE6IHRoaXMub3dsRE9NRGF0YSxcclxuXHRcdFx0c3RhZ2VEYXRhOiB0aGlzLnN0YWdlRGF0YSxcclxuXHRcdFx0c2xpZGVzRGF0YTogdGhpcy5zbGlkZXNEYXRhLFxyXG5cdFx0XHRuYXZEYXRhOiB0aGlzLm5hdkRhdGEsXHJcblx0XHRcdGRvdHNEYXRhOiB0aGlzLmRvdHNEYXRhXHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cclxuICAvKipcclxuXHQgKiBVcGRhdGVzIG9wdGlvbiBsb2dpYyBpZiBuZWNlc3NlcnlcclxuXHQgKi9cclxuICBwcml2YXRlIF9vcHRpb25zTG9naWMoKSB7XHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5hdXRvV2lkdGgpIHtcclxuXHRcdFx0dGhpcy5zZXR0aW5ncy5zdGFnZVBhZGRpbmcgPSAwO1xyXG5cdFx0XHR0aGlzLnNldHRpbmdzLm1lcmdlID0gZmFsc2U7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGVzIHRoZSB2aWV3XHJcbiAgICovXHJcbiAgdXBkYXRlKCkge1xyXG4gICAgbGV0IGkgPSAwO1xyXG4gICAgY29uc3QgbiA9IHRoaXMuX3BpcGUubGVuZ3RoLFxyXG4gICAgICBmaWx0ZXIgPSBpdGVtID0+IHRoaXMuX2ludmFsaWRhdGVkW2l0ZW1dLFxyXG5cdFx0XHRjYWNoZSA9IHt9O1xyXG5cclxuICAgIHdoaWxlIChpIDwgbikge1xyXG4gICAgICBjb25zdCBmaWx0ZXJlZFBpcGUgPSB0aGlzLl9waXBlW2ldLmZpbHRlci5maWx0ZXIoZmlsdGVyKTtcclxuICAgICAgaWYgKHRoaXMuX2ludmFsaWRhdGVkLmFsbCB8fCBmaWx0ZXJlZFBpcGUubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdHRoaXMuX3BpcGVbaV0ucnVuKGNhY2hlKTtcclxuICAgICAgfVxyXG4gICAgICBpKys7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZW5kQ2hhbmdlcygpO1xyXG5cclxuICAgIHRoaXMuX2ludmFsaWRhdGVkID0ge307XHJcblxyXG4gICAgaWYgKCF0aGlzLmlzKCd2YWxpZCcpKSB7XHJcbiAgICAgIHRoaXMuZW50ZXIoJ3ZhbGlkJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuXHQgKiBHZXRzIHRoZSB3aWR0aCBvZiB0aGUgdmlldy5cclxuXHQgKiBAcGFyYW0gW2RpbWVuc2lvbj1XaWR0aC5EZWZhdWx0XSBUaGUgZGltZW5zaW9uIHRvIHJldHVyblxyXG5cdCAqIEByZXR1cm5zIFRoZSB3aWR0aCBvZiB0aGUgdmlldyBpbiBwaXhlbC5cclxuXHQgKi9cclxuICB3aWR0aChkaW1lbnNpb24/OiBXaWR0aCk6IG51bWJlciB7XHJcblx0XHRkaW1lbnNpb24gPSBkaW1lbnNpb24gfHwgV2lkdGguRGVmYXVsdDtcclxuXHRcdHN3aXRjaCAoZGltZW5zaW9uKSB7XHJcblx0XHRcdGNhc2UgV2lkdGguSW5uZXI6XHJcblx0XHRcdGNhc2UgV2lkdGguT3V0ZXI6XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuX3dpZHRoO1xyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdHJldHVybiB0aGlzLl93aWR0aCAtIHRoaXMuc2V0dGluZ3Muc3RhZ2VQYWRkaW5nICogMiArIHRoaXMuc2V0dGluZ3MubWFyZ2luO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogUmVmcmVzaGVzIHRoZSBjYXJvdXNlbCBwcmltYXJpbHkgZm9yIGFkYXB0aXZlIHB1cnBvc2VzLlxyXG5cdCAqL1xyXG4gIHJlZnJlc2goKSB7XHJcblx0XHR0aGlzLmVudGVyKCdyZWZyZXNoaW5nJyk7XHJcblx0XHR0aGlzLl90cmlnZ2VyKCdyZWZyZXNoJyk7XHJcblx0XHR0aGlzLl9kZWZpbmVTbGlkZXNEYXRhKCk7XHJcblx0XHR0aGlzLnNldFZpZXdwb3J0SXRlbXNOKCk7XHJcblxyXG5cdFx0dGhpcy5fb3B0aW9uc0xvZ2ljKCk7XHJcblxyXG5cdFx0Ly8gdGhpcy4kZWxlbWVudC5hZGRDbGFzcyh0aGlzLm9wdGlvbnMucmVmcmVzaENsYXNzKTtcclxuXHJcblx0XHR0aGlzLnVwZGF0ZSgpO1xyXG5cclxuXHRcdC8vIHRoaXMuJGVsZW1lbnQucmVtb3ZlQ2xhc3ModGhpcy5vcHRpb25zLnJlZnJlc2hDbGFzcyk7XHJcblxyXG5cdFx0dGhpcy5sZWF2ZSgncmVmcmVzaGluZycpO1xyXG5cdFx0dGhpcy5fdHJpZ2dlcigncmVmcmVzaGVkJyk7XHJcblx0IH1cclxuXHJcbiAgLyoqXHJcblx0ICogQ2hlY2tzIHdpbmRvdyBgcmVzaXplYCBldmVudC5cclxuXHQgKiBAcGFyYW0gY3VyV2lkdGggd2lkdGggb2YgLm93bC1jYXJvdXNlbFxyXG5cdCAqL1xyXG4gIG9uUmVzaXplKGN1cldpZHRoOiBudW1iZXIpIHtcclxuXHRcdGlmICghdGhpcy5faXRlbXMubGVuZ3RoKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldENhcm91c2VsV2lkdGgoY3VyV2lkdGgpO1xyXG5cclxuXHRcdHRoaXMuZW50ZXIoJ3Jlc2l6aW5nJyk7XHJcblxyXG5cdFx0Ly8gaWYgKHRoaXMudHJpZ2dlcigncmVzaXplJykuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcclxuXHRcdC8vIFx0dGhpcy5sZWF2ZSgncmVzaXppbmcnKTtcclxuXHRcdC8vIFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0Ly8gfVxyXG5cdFx0dGhpcy5fdHJpZ2dlcigncmVzaXplJyk7XHJcblx0XHR0aGlzLmludmFsaWRhdGUoJ3dpZHRoJyk7XHJcblxyXG5cdFx0dGhpcy5yZWZyZXNoKCk7XHJcblxyXG5cdFx0dGhpcy5sZWF2ZSgncmVzaXppbmcnKTtcclxuXHRcdHRoaXMuX3RyaWdnZXIoJ3Jlc2l6ZWQnKTtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIFByZXBhcmVzIGRhdGEgZm9yIGRyYWdnaW5nIGNhcm91c2VsLiBJdCBzdGFydHMgYWZ0ZXIgZmlyaW5nIGB0b3VjaHN0YXJ0YCBhbmQgYG1vdXNlZG93bmAgZXZlbnRzLlxyXG5cdCAqIEB0b2RvIEhvcml6b250YWwgc3dpcGUgdGhyZXNob2xkIGFzIG9wdGlvblxyXG5cdCAqIEB0b2RvICMyNjFcclxuXHQgKiBAcGFyYW0gZXZlbnQgLSBUaGUgZXZlbnQgYXJndW1lbnRzLlxyXG5cdCAqIEByZXR1cm5zIHN0YWdlIC0gb2JqZWN0IHdpdGggJ3gnIGFuZCAneScgY29vcmRpbmF0ZXMgb2YgLm93bC1zdGFnZVxyXG5cdCAqL1xyXG4gIHByZXBhcmVEcmFnZ2luZyhldmVudDogYW55KTogQ29vcmRzIHtcclxuXHRcdGxldCBzdGFnZTogQ29vcmRzID0gbnVsbCxcclxuXHRcdFx0XHR0cmFuc2Zvcm1BcnI6IHN0cmluZ1tdO1xyXG5cclxuXHRcdC8vIGNvdWxkIGJlIDUgY29tbWVudGVkIGxpbmVzIGJlbG93OyBIb3dldmVyIHRoZXJlJ3Mgc3RhZ2UgdHJhbnNmb3JtIGluIHN0YWdlRGF0YSBhbmQgaW4gdXBkYXRlcyBhZnRlciBlYWNoIG1vdmUgb2Ygc3RhZ2VcclxuICAgIC8vIHN0YWdlID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpLnRyYW5zZm9ybS5yZXBsYWNlKC8uKlxcKHxcXCl8IC9nLCAnJykuc3BsaXQoJywnKTtcclxuICAgIC8vIHN0YWdlID0ge1xyXG4gICAgLy8gICB4OiBzdGFnZVtzdGFnZS5sZW5ndGggPT09IDE2ID8gMTIgOiA0XSxcclxuICAgIC8vICAgeTogc3RhZ2Vbc3RhZ2UubGVuZ3RoID09PSAxNiA/IDEzIDogNV1cclxuXHRcdC8vIH07XHJcblxyXG5cdFx0dHJhbnNmb3JtQXJyID0gdGhpcy5zdGFnZURhdGEudHJhbnNmb3JtLnJlcGxhY2UoLy4qXFwofFxcKXwgfFteLC1cXGRdXFx3fFxcKS9nLCAnJykuc3BsaXQoJywnKTtcclxuICAgIHN0YWdlID0ge1xyXG4gICAgICB4OiArdHJhbnNmb3JtQXJyWzBdLFxyXG4gICAgICB5OiArdHJhbnNmb3JtQXJyWzFdXHJcbiAgICB9O1xyXG5cclxuXHRcdGlmICh0aGlzLmlzKCdhbmltYXRpbmcnKSkge1xyXG5cdFx0XHR0aGlzLmludmFsaWRhdGUoJ3Bvc2l0aW9uJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGV2ZW50LnR5cGUgPT09ICdtb3VzZWRvd24nKSB7XHJcbiAgICAgIHRoaXMub3dsRE9NRGF0YS5pc0dyYWIgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuXHRcdHRoaXMuc3BlZWQoMCk7XHJcblx0XHRyZXR1cm4gc3RhZ2U7XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBEZWZpbmVzIG5ldyBjb29yZHMgZm9yIC5vd2wtc3RhZ2Ugd2hpbGUgZHJhZ2dpbmcgaXRcclxuXHQgKiBAdG9kbyAjMjYxXHJcblx0ICogQHBhcmFtIGV2ZW50IHRoZSBldmVudCBhcmd1bWVudHMuXHJcblx0ICogQHBhcmFtIGRyYWdEYXRhIGluaXRpYWwgZGF0YSBnb3QgYWZ0ZXIgc3RhcnRpbmcgZHJhZ2dpbmdcclxuXHQgKiBAcmV0dXJucyBjb29yZHMgb3IgZmFsc2VcclxuXHQgKi9cclxuICBkZWZpbmVOZXdDb29yZHNEcmFnKGV2ZW50OiBhbnksIGRyYWdEYXRhOiBhbnkpOiBib29sZWFuIHwgQ29vcmRzIHtcclxuXHRcdGxldCBtaW5pbXVtID0gbnVsbCxcclxuXHRcdG1heGltdW0gPSBudWxsLFxyXG5cdFx0cHVsbCA9IG51bGw7XHJcblx0XHRjb25zdFx0ZGVsdGEgPSB0aGlzLmRpZmZlcmVuY2UoZHJhZ0RhdGEucG9pbnRlciwgdGhpcy5wb2ludGVyKGV2ZW50KSksXHJcblx0XHRcdHN0YWdlID0gdGhpcy5kaWZmZXJlbmNlKGRyYWdEYXRhLnN0YWdlLnN0YXJ0LCBkZWx0YSk7XHJcblxyXG5cdFx0aWYgKCF0aGlzLmlzKCdkcmFnZ2luZycpKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5sb29wKSB7XHJcblx0XHRcdG1pbmltdW0gPSB0aGlzLmNvb3JkaW5hdGVzKHRoaXMubWluaW11bSgpKTtcclxuXHRcdFx0bWF4aW11bSA9ICt0aGlzLmNvb3JkaW5hdGVzKHRoaXMubWF4aW11bSgpICsgMSkgLSBtaW5pbXVtO1xyXG5cdFx0XHRzdGFnZS54ID0gKCgoc3RhZ2UueCAtIG1pbmltdW0pICUgbWF4aW11bSArIG1heGltdW0pICUgbWF4aW11bSkgKyBtaW5pbXVtO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bWluaW11bSA9IHRoaXMuc2V0dGluZ3MucnRsID8gdGhpcy5jb29yZGluYXRlcyh0aGlzLm1heGltdW0oKSkgOiB0aGlzLmNvb3JkaW5hdGVzKHRoaXMubWluaW11bSgpKTtcclxuXHRcdFx0bWF4aW11bSA9IHRoaXMuc2V0dGluZ3MucnRsID8gdGhpcy5jb29yZGluYXRlcyh0aGlzLm1pbmltdW0oKSkgOiB0aGlzLmNvb3JkaW5hdGVzKHRoaXMubWF4aW11bSgpKTtcclxuXHRcdFx0cHVsbCA9IHRoaXMuc2V0dGluZ3MucHVsbERyYWcgPyAtMSAqIGRlbHRhLnggLyA1IDogMDtcclxuXHRcdFx0c3RhZ2UueCA9IE1hdGgubWF4KE1hdGgubWluKHN0YWdlLngsIG1pbmltdW0gKyBwdWxsKSwgbWF4aW11bSArIHB1bGwpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBzdGFnZTtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEZpbmlzaGVzIGRyYWdnaW5nIG9mIGNhcm91c2VsIHdoZW4gYHRvdWNoZW5kYCBhbmQgYG1vdXNldXBgIGV2ZW50cyBmaXJlLlxyXG5cdCAqIEB0b2RvICMyNjFcclxuXHQgKiBAdG9kbyBUaHJlc2hvbGQgZm9yIGNsaWNrIGV2ZW50XHJcblx0ICogQHBhcmFtIGV2ZW50IHRoZSBldmVudCBhcmd1bWVudHMuXHJcblx0ICogQHBhcmFtIGRyYWdPYmogdGhlIG9iamVjdCB3aXRoIGRyYWdnaW5nIHNldHRpbmdzIGFuZCBzdGF0ZXNcclxuXHQgKiBAcGFyYW0gY2xpY2tBdHRhY2hlciBmdW5jdGlvbiB3aGljaCBhdHRhY2hlcyBjbGljayBoYW5kbGVyIHRvIHNsaWRlIG9yIGl0cyBjaGlsZHJlbiBlbGVtZW50cyBpbiBvcmRlciB0byBwcmV2ZW50IGV2ZW50IGJ1YmxpbmdcclxuXHQgKi9cclxuICBmaW5pc2hEcmFnZ2luZyhldmVudDogYW55LCBkcmFnT2JqOiBhbnksIGNsaWNrQXR0YWNoZXI6ICgpID0+IHZvaWQpIHtcclxuXHRcdGNvbnN0IGRlbHRhID0gdGhpcy5kaWZmZXJlbmNlKGRyYWdPYmoucG9pbnRlciwgdGhpcy5wb2ludGVyKGV2ZW50KSksXHJcbiAgICAgICAgc3RhZ2UgPSBkcmFnT2JqLnN0YWdlLmN1cnJlbnQsXHJcblx0XHRcdFx0ZGlyZWN0aW9uID0gZGVsdGEueCA+ICt0aGlzLnNldHRpbmdzLnJ0bCA/ICdsZWZ0JyA6ICdyaWdodCc7XHJcblx0XHRsZXQgY3VycmVudFNsaWRlSTogbnVtYmVyLCBjdXJyZW50OiBudW1iZXIsIG5ld0N1cnJlbnQ6IG51bWJlcjtcclxuXHJcbiAgICAgIGlmIChkZWx0YS54ICE9PSAwICYmIHRoaXMuaXMoJ2RyYWdnaW5nJykgfHwgIXRoaXMuaXMoJ3ZhbGlkJykpIHtcclxuICAgICAgICB0aGlzLnNwZWVkKCt0aGlzLnNldHRpbmdzLmRyYWdFbmRTcGVlZCB8fCB0aGlzLnNldHRpbmdzLnNtYXJ0U3BlZWQpO1xyXG5cdFx0XHRcdGN1cnJlbnRTbGlkZUkgPSB0aGlzLmNsb3Nlc3Qoc3RhZ2UueCwgZGVsdGEueCAhPT0gMCA/IGRpcmVjdGlvbiA6IGRyYWdPYmouZGlyZWN0aW9uKTtcclxuXHRcdFx0XHRjdXJyZW50ID0gdGhpcy5jdXJyZW50KCk7XHJcbiAgICAgICAgbmV3Q3VycmVudCA9IHRoaXMuY3VycmVudChjdXJyZW50U2xpZGVJID09PSAtMSA/IHVuZGVmaW5lZCA6IGN1cnJlbnRTbGlkZUkpO1xyXG5cclxuXHRcdFx0XHRpZiAoY3VycmVudCAhPT0gbmV3Q3VycmVudCkge1xyXG5cdFx0XHRcdFx0dGhpcy5pbnZhbGlkYXRlKCdwb3NpdGlvbicpO1xyXG5cdFx0XHRcdFx0dGhpcy51cGRhdGUoKTtcclxuXHRcdFx0XHR9XHJcblxyXG4gICAgICAgIGRyYWdPYmouZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xyXG5cclxuICAgICAgICBpZiAoTWF0aC5hYnMoZGVsdGEueCkgPiAzIHx8IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gZHJhZ09iai50aW1lID4gMzAwKSB7XHJcblx0XHRcdFx0XHRjbGlja0F0dGFjaGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmICghdGhpcy5pcygnZHJhZ2dpbmcnKSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmxlYXZlKCdkcmFnZ2luZycpO1xyXG5cdCB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEdldHMgYWJzb2x1dGUgcG9zaXRpb24gb2YgdGhlIGNsb3Nlc3QgaXRlbSBmb3IgYSBjb29yZGluYXRlLlxyXG5cdCAqIEB0b2RvIFNldHRpbmcgYGZyZWVEcmFnYCBtYWtlcyBgY2xvc2VzdGAgbm90IHJldXNhYmxlLiBTZWUgIzE2NS5cclxuXHQgKiBAcGFyYW0gY29vcmRpbmF0ZSBUaGUgY29vcmRpbmF0ZSBpbiBwaXhlbC5cclxuXHQgKiBAcGFyYW0gZGlyZWN0aW9uIFRoZSBkaXJlY3Rpb24gdG8gY2hlY2sgZm9yIHRoZSBjbG9zZXN0IGl0ZW0uIEV0aGVyIGBsZWZ0YCBvciBgcmlnaHRgLlxyXG5cdCAqIEByZXR1cm5zIFRoZSBhYnNvbHV0ZSBwb3NpdGlvbiBvZiB0aGUgY2xvc2VzdCBpdGVtLlxyXG5cdCAqL1xyXG4gIGNsb3Nlc3QoY29vcmRpbmF0ZTogbnVtYmVyLCBkaXJlY3Rpb246IHN0cmluZyk6IG51bWJlciB7XHJcblx0XHRjb25zdCBwdWxsID0gMzAsXHJcblx0XHRcdHdpZHRoID0gdGhpcy53aWR0aCgpO1xyXG5cdFx0bGV0XHRjb29yZGluYXRlczogbnVtYmVyW10gPSB0aGlzLmNvb3JkaW5hdGVzKCkgYXMgbnVtYmVyW10sXHJcblx0XHQgcG9zaXRpb24gPSAtMTtcclxuXHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5jZW50ZXIpIHtcclxuXHRcdFx0Y29vcmRpbmF0ZXMgPSBjb29yZGluYXRlcy5tYXAoaXRlbSA9PiB7XHJcblx0XHRcdFx0aWYgKGl0ZW0gPT09IDApIHtcclxuXHRcdFx0XHRcdGl0ZW0gKz0gMC4wMDAwMDE7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiBpdGVtO1xyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIG9wdGlvbiAnZnJlZURyYWcnIGRvZXNuJ3QgaGF2ZSByZWFsaXphdGlvbiBhbmQgdXNpbmcgaXQgaGVyZSBjcmVhdGVzIHByb2JsZW06XHJcblx0XHQvLyB2YXJpYWJsZSAncG9zaXRpb24nIHN0YXlzIHVuY2hhbmdlZCAoaXQgZXF1YWxzIC0xIGF0IHRoZSBiZWdnaW5nKSBhbmQgdGh1cyBtZXRob2QgcmV0dXJucyAtMVxyXG5cdFx0Ly8gUmV0dXJuaW5nIHZhbHVlIGlzIGNvbnN1bWVkIGJ5IG1ldGhvZCBjdXJyZW50KCksIHdoaWNoIHRha2luZyAtMSBhcyBhcmd1bWVudCBjYWxjdWxhdGVzIHRoZSBpbmRleCBvZiBuZXcgY3VycmVudCBzbGlkZVxyXG5cdFx0Ly8gSW4gY2FzZSBvZiBoYXZpbmcgNSBzbGlkZXMgYW5zICdsb29wPWZhbHNlOyBjYWxsaW5nICdjdXJyZW50KC0xKScgc2V0cyBwcm9wcyAnX2N1cnJlbnQnIGFzIDQuIEp1c3QgbGFzdCBzbGlkZSByZW1haW5zIHZpc2libGUgaW5zdGVhZCBvZiAzIGxhc3Qgc2xpZGVzLlxyXG5cclxuXHRcdC8vIGlmICghdGhpcy5zZXR0aW5ncy5mcmVlRHJhZykge1xyXG5cdFx0XHQvLyBjaGVjayBjbG9zZXN0IGl0ZW1cclxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBjb29yZGluYXRlcy5sZW5ndGg7IGkrKykge1xyXG5cclxuXHRcdFx0XHRpZiAoZGlyZWN0aW9uID09PSAnbGVmdCcgJiYgY29vcmRpbmF0ZSA+IGNvb3JkaW5hdGVzW2ldIC0gcHVsbCAmJiBjb29yZGluYXRlIDwgY29vcmRpbmF0ZXNbaV0gKyBwdWxsKSB7XHJcblx0XHRcdFx0XHRwb3NpdGlvbiA9IGk7XHJcblx0XHRcdFx0Ly8gb24gYSByaWdodCBwdWxsLCBjaGVjayBvbiBwcmV2aW91cyBpbmRleFxyXG5cdFx0XHRcdC8vIHRvIGRvIHNvLCBzdWJ0cmFjdCB3aWR0aCBmcm9tIHZhbHVlIGFuZCBzZXQgcG9zaXRpb24gPSBpbmRleCArIDFcclxuXHRcdFx0XHR9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ3JpZ2h0JyAmJiBjb29yZGluYXRlID4gY29vcmRpbmF0ZXNbaV0gLSB3aWR0aCAtIHB1bGwgJiYgY29vcmRpbmF0ZSA8IGNvb3JkaW5hdGVzW2ldIC0gd2lkdGggKyBwdWxsKSB7XHJcblx0XHRcdFx0XHRwb3NpdGlvbiA9IGkgKyAxO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAodGhpcy5fb3AoY29vcmRpbmF0ZSwgJzwnLCBjb29yZGluYXRlc1tpXSlcclxuXHRcdFx0XHRcdCYmIHRoaXMuX29wKGNvb3JkaW5hdGUsICc+JywgY29vcmRpbmF0ZXNbaSArIDFdIHx8IGNvb3JkaW5hdGVzW2ldIC0gd2lkdGgpKSB7XHJcblx0XHRcdFx0XHRwb3NpdGlvbiA9IGRpcmVjdGlvbiA9PT0gJ2xlZnQnID8gaSArIDEgOiBpO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBudWxsICYmIGNvb3JkaW5hdGUgPiBjb29yZGluYXRlc1tpXSAtIHB1bGwgJiYgY29vcmRpbmF0ZSA8IGNvb3JkaW5hdGVzW2ldICsgcHVsbCkge1xyXG5cdFx0XHRcdFx0cG9zaXRpb24gPSBpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKHBvc2l0aW9uICE9PSAtMSkgeyBicmVhayB9O1xyXG5cdFx0XHR9XHJcblx0XHQvLyB9XHJcblxyXG5cdFx0aWYgKCF0aGlzLnNldHRpbmdzLmxvb3ApIHtcclxuXHRcdFx0Ly8gbm9uIGxvb3AgYm91bmRyaWVzXHJcblx0XHRcdGlmICh0aGlzLl9vcChjb29yZGluYXRlLCAnPicsIGNvb3JkaW5hdGVzW3RoaXMubWluaW11bSgpXSkpIHtcclxuXHRcdFx0XHRwb3NpdGlvbiA9IGNvb3JkaW5hdGUgPSB0aGlzLm1pbmltdW0oKTtcclxuXHRcdFx0fSBlbHNlIGlmICh0aGlzLl9vcChjb29yZGluYXRlLCAnPCcsIGNvb3JkaW5hdGVzW3RoaXMubWF4aW11bSgpXSkpIHtcclxuXHRcdFx0XHRwb3NpdGlvbiA9IGNvb3JkaW5hdGUgPSB0aGlzLm1heGltdW0oKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBwb3NpdGlvbjtcclxuXHQgfVxyXG5cclxuICAvKipcclxuXHQgKiBBbmltYXRlcyB0aGUgc3RhZ2UuXHJcblx0ICogQHRvZG8gIzI3MFxyXG5cdCAqIEBwYXJhbSBjb29yZGluYXRlIFRoZSBjb29yZGluYXRlIGluIHBpeGVscy5cclxuXHQgKi9cclxuICBhbmltYXRlKGNvb3JkaW5hdGU6IG51bWJlciB8IG51bWJlcltdKSB7XHJcblx0XHRjb25zdCBhbmltYXRlID0gdGhpcy5zcGVlZCgpID4gMDtcclxuXHJcblx0XHRpZiAodGhpcy5pcygnYW5pbWF0aW5nJykpIHtcclxuXHRcdFx0dGhpcy5vblRyYW5zaXRpb25FbmQoKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoYW5pbWF0ZSkge1xyXG5cdFx0XHR0aGlzLmVudGVyKCdhbmltYXRpbmcnKTtcclxuXHRcdFx0dGhpcy5fdHJpZ2dlcigndHJhbnNsYXRlJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zdGFnZURhdGEudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZTNkKCcgKyBjb29yZGluYXRlICsgJ3B4LDBweCwwcHgpJztcclxuXHRcdHRoaXMuc3RhZ2VEYXRhLnRyYW5zaXRpb24gPSAodGhpcy5zcGVlZCgpIC8gMTAwMCkgKyAncyc7XHJcblxyXG5cdFx0Ly8gYWxzbyB0aGVyZSB3YXMgdHJhbnNpdGlvbiBieSBtZWFucyBvZiBKUXVlcnkuYW5pbWF0ZSBvciBjc3MtY2hhbmdpbmcgcHJvcGVydHkgbGVmdFxyXG5cdCB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIENoZWNrcyB3aGV0aGVyIHRoZSBjYXJvdXNlbCBpcyBpbiBhIHNwZWNpZmljIHN0YXRlIG9yIG5vdC5cclxuXHQgKiBAcGFyYW0gc3RhdGUgVGhlIHN0YXRlIHRvIGNoZWNrLlxyXG5cdCAqIEByZXR1cm5zIFRoZSBmbGFnIHdoaWNoIGluZGljYXRlcyBpZiB0aGUgY2Fyb3VzZWwgaXMgYnVzeS5cclxuXHQgKi9cclxuICBpcyhzdGF0ZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gdGhpcy5fc3RhdGVzLmN1cnJlbnRbc3RhdGVdICYmIHRoaXMuX3N0YXRlcy5jdXJyZW50W3N0YXRlXSA+IDA7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcblx0ICogU2V0cyB0aGUgYWJzb2x1dGUgcG9zaXRpb24gb2YgdGhlIGN1cnJlbnQgaXRlbS5cclxuXHQgKiBAcGFyYW0gcG9zaXRpb24gVGhlIG5ldyBhYnNvbHV0ZSBwb3NpdGlvbiBvciBub3RoaW5nIHRvIGxlYXZlIGl0IHVuY2hhbmdlZC5cclxuXHQgKiBAcmV0dXJucyBUaGUgYWJzb2x1dGUgcG9zaXRpb24gb2YgdGhlIGN1cnJlbnQgaXRlbS5cclxuXHQgKi9cclxuICBjdXJyZW50KHBvc2l0aW9uPzogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdGlmIChwb3NpdGlvbiA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLl9jdXJyZW50O1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLl9pdGVtcy5sZW5ndGggPT09IDApIHtcclxuXHRcdFx0cmV0dXJuIHVuZGVmaW5lZDtcclxuXHRcdH1cclxuXHJcblx0XHRwb3NpdGlvbiA9IHRoaXMubm9ybWFsaXplKHBvc2l0aW9uKTtcclxuXHJcblx0XHRpZiAodGhpcy5fY3VycmVudCAhPT0gcG9zaXRpb24pIHtcclxuXHRcdFx0Y29uc3QgZXZlbnQgPSB0aGlzLl90cmlnZ2VyKCdjaGFuZ2UnLCB7IHByb3BlcnR5OiB7IG5hbWU6ICdwb3NpdGlvbicsIHZhbHVlOiBwb3NpdGlvbiB9IH0pO1xyXG5cclxuXHRcdFx0Ly8gaWYgKGV2ZW50LmRhdGEgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHQvLyBcdHBvc2l0aW9uID0gdGhpcy5ub3JtYWxpemUoZXZlbnQuZGF0YSk7XHJcblx0XHRcdC8vIH1cclxuXHJcblx0XHRcdHRoaXMuX2N1cnJlbnQgPSBwb3NpdGlvbjtcclxuXHJcblx0XHRcdHRoaXMuaW52YWxpZGF0ZSgncG9zaXRpb24nKTtcclxuXHRcdFx0dGhpcy5fdHJpZ2dlcignY2hhbmdlZCcsIHsgcHJvcGVydHk6IHsgbmFtZTogJ3Bvc2l0aW9uJywgdmFsdWU6IHRoaXMuX2N1cnJlbnQgfSB9KTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fY3VycmVudDtcclxuXHQgfVxyXG5cclxuICAvKipcclxuXHQgKiBJbnZhbGlkYXRlcyB0aGUgZ2l2ZW4gcGFydCBvZiB0aGUgdXBkYXRlIHJvdXRpbmUuXHJcblx0ICogQHBhcmFtIHBhcnQgVGhlIHBhcnQgdG8gaW52YWxpZGF0ZS5cclxuXHQgKiBAcmV0dXJucyBUaGUgaW52YWxpZGF0ZWQgcGFydHMuXHJcblx0ICovXHJcbiAgaW52YWxpZGF0ZShwYXJ0OiBzdHJpbmcpOiBzdHJpbmdbXSB7XHJcblx0XHRpZiAodHlwZW9mIHBhcnQgPT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdHRoaXMuX2ludmFsaWRhdGVkW3BhcnRdID0gdHJ1ZTtcclxuXHRcdFx0aWYodGhpcy5pcygndmFsaWQnKSkgeyB0aGlzLmxlYXZlKCd2YWxpZCcpOyB9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gT2JqZWN0LmtleXModGhpcy5faW52YWxpZGF0ZWQpO1xyXG4gIH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlc2V0cyB0aGUgYWJzb2x1dGUgcG9zaXRpb24gb2YgdGhlIGN1cnJlbnQgaXRlbS5cclxuXHQgKiBAcGFyYW0gcG9zaXRpb24gdGhlIGFic29sdXRlIHBvc2l0aW9uIG9mIHRoZSBuZXcgaXRlbS5cclxuXHQgKi9cclxuICByZXNldChwb3NpdGlvbjogbnVtYmVyKSB7XHJcblx0XHRwb3NpdGlvbiA9IHRoaXMubm9ybWFsaXplKHBvc2l0aW9uKTtcclxuXHJcblx0XHRpZiAocG9zaXRpb24gPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5fc3BlZWQgPSAwO1xyXG5cdFx0dGhpcy5fY3VycmVudCA9IHBvc2l0aW9uO1xyXG5cclxuXHRcdHRoaXMuX3N1cHByZXNzKFsgJ3RyYW5zbGF0ZScsICd0cmFuc2xhdGVkJyBdKTtcclxuXHJcblx0XHR0aGlzLmFuaW1hdGUodGhpcy5jb29yZGluYXRlcyhwb3NpdGlvbikpO1xyXG5cclxuXHRcdHRoaXMuX3JlbGVhc2UoWyAndHJhbnNsYXRlJywgJ3RyYW5zbGF0ZWQnIF0pO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogTm9ybWFsaXplcyBhbiBhYnNvbHV0ZSBvciBhIHJlbGF0aXZlIHBvc2l0aW9uIG9mIGFuIGl0ZW0uXHJcblx0ICogQHBhcmFtIHBvc2l0aW9uIFRoZSBhYnNvbHV0ZSBvciByZWxhdGl2ZSBwb3NpdGlvbiB0byBub3JtYWxpemUuXHJcblx0ICogQHBhcmFtIHJlbGF0aXZlIFdoZXRoZXIgdGhlIGdpdmVuIHBvc2l0aW9uIGlzIHJlbGF0aXZlIG9yIG5vdC5cclxuXHQgKiBAcmV0dXJucyBUaGUgbm9ybWFsaXplZCBwb3NpdGlvbi5cclxuXHQgKi9cclxuICBub3JtYWxpemUocG9zaXRpb246IG51bWJlciwgcmVsYXRpdmU/OiBib29sZWFuKTogbnVtYmVyIHtcclxuXHRcdGNvbnN0IG4gPSB0aGlzLl9pdGVtcy5sZW5ndGgsXHJcblx0XHRcdFx0XHRtID0gcmVsYXRpdmUgPyAwIDogdGhpcy5fY2xvbmVzLmxlbmd0aDtcclxuXHJcblx0XHRpZiAoIXRoaXMuX2lzTnVtZXJpYyhwb3NpdGlvbikgfHwgbiA8IDEpIHtcclxuXHRcdFx0cG9zaXRpb24gPSB1bmRlZmluZWQ7XHJcblx0XHR9IGVsc2UgaWYgKHBvc2l0aW9uIDwgMCB8fCBwb3NpdGlvbiA+PSBuICsgbSkge1xyXG5cdFx0XHRwb3NpdGlvbiA9ICgocG9zaXRpb24gLSBtIC8gMikgJSBuICsgbikgJSBuICsgbSAvIDI7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHBvc2l0aW9uO1xyXG5cdCB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIENvbnZlcnRzIGFuIGFic29sdXRlIHBvc2l0aW9uIG9mIGFuIGl0ZW0gaW50byBhIHJlbGF0aXZlIG9uZS5cclxuXHQgKiBAcGFyYW0gcG9zaXRpb24gVGhlIGFic29sdXRlIHBvc2l0aW9uIHRvIGNvbnZlcnQuXHJcblx0ICogQHJldHVybnMgVGhlIGNvbnZlcnRlZCBwb3NpdGlvbi5cclxuXHQgKi9cclxuICByZWxhdGl2ZShwb3NpdGlvbjogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdHBvc2l0aW9uIC09IHRoaXMuX2Nsb25lcy5sZW5ndGggLyAyO1xyXG5cdFx0cmV0dXJuIHRoaXMubm9ybWFsaXplKHBvc2l0aW9uLCB0cnVlKTtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEdldHMgdGhlIG1heGltdW0gcG9zaXRpb24gZm9yIHRoZSBjdXJyZW50IGl0ZW0uXHJcblx0ICogQHBhcmFtIHJlbGF0aXZlIFdoZXRoZXIgdG8gcmV0dXJuIGFuIGFic29sdXRlIHBvc2l0aW9uIG9yIGEgcmVsYXRpdmUgcG9zaXRpb24uXHJcblx0ICogQHJldHVybnMgbnVtYmVyIG9mIG1heGltdW0gcG9zaXRpb25cclxuXHQgKi9cclxuICBtYXhpbXVtKHJlbGF0aXZlOiBib29sZWFuID0gZmFsc2UpOiBudW1iZXIge1xyXG5cdFx0Y29uc3Qgc2V0dGluZ3MgPSB0aGlzLnNldHRpbmdzO1xyXG5cdFx0bGV0XHRtYXhpbXVtID0gdGhpcy5fY29vcmRpbmF0ZXMubGVuZ3RoLFxyXG5cdFx0XHRpdGVyYXRvcixcclxuXHRcdFx0cmVjaXByb2NhbEl0ZW1zV2lkdGgsXHJcblx0XHRcdGVsZW1lbnRXaWR0aDtcclxuXHJcblx0XHRpZiAoc2V0dGluZ3MubG9vcCkge1xyXG5cdFx0XHRtYXhpbXVtID0gdGhpcy5fY2xvbmVzLmxlbmd0aCAvIDIgKyB0aGlzLl9pdGVtcy5sZW5ndGggLSAxO1xyXG5cdFx0fSBlbHNlIGlmIChzZXR0aW5ncy5hdXRvV2lkdGggfHwgc2V0dGluZ3MubWVyZ2UpIHtcclxuXHRcdFx0aXRlcmF0b3IgPSB0aGlzLl9pdGVtcy5sZW5ndGg7XHJcblx0XHRcdHJlY2lwcm9jYWxJdGVtc1dpZHRoID0gdGhpcy5zbGlkZXNEYXRhWy0taXRlcmF0b3JdLndpZHRoO1xyXG5cdFx0XHRlbGVtZW50V2lkdGggPSB0aGlzLl93aWR0aDtcclxuXHRcdFx0d2hpbGUgKGl0ZXJhdG9yLS0pIHtcclxuXHRcdFx0XHQvLyBpdCBjb3VsZCBiZSB1c2UgdGhpcy5faXRlbXMgaW5zdGVhZCBvZiB0aGlzLnNsaWRlc0RhdGE7XHJcblx0XHRcdFx0cmVjaXByb2NhbEl0ZW1zV2lkdGggKz0gK3RoaXMuc2xpZGVzRGF0YVtpdGVyYXRvcl0ud2lkdGggKyB0aGlzLnNldHRpbmdzLm1hcmdpbjtcclxuXHRcdFx0XHRpZiAocmVjaXByb2NhbEl0ZW1zV2lkdGggPiBlbGVtZW50V2lkdGgpIHtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRtYXhpbXVtID0gaXRlcmF0b3IgKyAxO1xyXG5cdFx0fSBlbHNlIGlmIChzZXR0aW5ncy5jZW50ZXIpIHtcclxuXHRcdFx0bWF4aW11bSA9IHRoaXMuX2l0ZW1zLmxlbmd0aCAtIDE7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRtYXhpbXVtID0gdGhpcy5faXRlbXMubGVuZ3RoIC0gc2V0dGluZ3MuaXRlbXM7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHJlbGF0aXZlKSB7XHJcblx0XHRcdG1heGltdW0gLT0gdGhpcy5fY2xvbmVzLmxlbmd0aCAvIDI7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIE1hdGgubWF4KG1heGltdW0sIDApO1xyXG5cdCB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEdldHMgdGhlIG1pbmltdW0gcG9zaXRpb24gZm9yIHRoZSBjdXJyZW50IGl0ZW0uXHJcblx0ICogQHBhcmFtIHJlbGF0aXZlIFdoZXRoZXIgdG8gcmV0dXJuIGFuIGFic29sdXRlIHBvc2l0aW9uIG9yIGEgcmVsYXRpdmUgcG9zaXRpb24uXHJcblx0ICogQHJldHVybnMgbnVtYmVyIG9mIG1pbmltdW0gcG9zaXRpb25cclxuXHQgKi9cclxuICBtaW5pbXVtKHJlbGF0aXZlOiBib29sZWFuID0gZmFsc2UpOiBudW1iZXIge1xyXG5cdFx0cmV0dXJuIHJlbGF0aXZlID8gMCA6IHRoaXMuX2Nsb25lcy5sZW5ndGggLyAyO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogR2V0cyBhbiBpdGVtIGF0IHRoZSBzcGVjaWZpZWQgcmVsYXRpdmUgcG9zaXRpb24uXHJcblx0ICogQHBhcmFtIHBvc2l0aW9uIFRoZSByZWxhdGl2ZSBwb3NpdGlvbiBvZiB0aGUgaXRlbS5cclxuXHQgKiBAcmV0dXJucyBUaGUgaXRlbSBhdCB0aGUgZ2l2ZW4gcG9zaXRpb24gb3IgYWxsIGl0ZW1zIGlmIG5vIHBvc2l0aW9uIHdhcyBnaXZlbi5cclxuXHQgKi9cclxuICBpdGVtcyhwb3NpdGlvbj86IG51bWJlcik6IENhcm91c2VsU2xpZGVEaXJlY3RpdmVbXSB7XHJcblx0XHRpZiAocG9zaXRpb24gPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5faXRlbXMuc2xpY2UoKTtcclxuXHRcdH1cclxuXHJcblx0XHRwb3NpdGlvbiA9IHRoaXMubm9ybWFsaXplKHBvc2l0aW9uLCB0cnVlKTtcclxuXHRcdHJldHVybiBbdGhpcy5faXRlbXNbcG9zaXRpb25dXTtcclxuXHQgfVxyXG5cclxuICAvKipcclxuXHQgKiBHZXRzIGFuIGl0ZW0gYXQgdGhlIHNwZWNpZmllZCByZWxhdGl2ZSBwb3NpdGlvbi5cclxuXHQgKiBAcGFyYW0gcG9zaXRpb24gVGhlIHJlbGF0aXZlIHBvc2l0aW9uIG9mIHRoZSBpdGVtLlxyXG5cdCAqIEByZXR1cm5zIFRoZSBpdGVtIGF0IHRoZSBnaXZlbiBwb3NpdGlvbiBvciBhbGwgaXRlbXMgaWYgbm8gcG9zaXRpb24gd2FzIGdpdmVuLlxyXG5cdCAqL1xyXG4gIG1lcmdlcnMocG9zaXRpb246IG51bWJlcik6IG51bWJlciB8IG51bWJlcltdIHtcclxuXHRcdGlmIChwb3NpdGlvbiA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLl9tZXJnZXJzLnNsaWNlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cG9zaXRpb24gPSB0aGlzLm5vcm1hbGl6ZShwb3NpdGlvbiwgdHJ1ZSk7XHJcblx0XHRyZXR1cm4gdGhpcy5fbWVyZ2Vyc1twb3NpdGlvbl07XHJcblx0IH1cclxuXHJcbiAgLyoqXHJcblx0ICogR2V0cyB0aGUgYWJzb2x1dGUgcG9zaXRpb25zIG9mIGNsb25lcyBmb3IgYW4gaXRlbS5cclxuXHQgKiBAcGFyYW0gcG9zaXRpb24gVGhlIHJlbGF0aXZlIHBvc2l0aW9uIG9mIHRoZSBpdGVtLlxyXG5cdCAqIEByZXR1cm5zIFRoZSBhYnNvbHV0ZSBwb3NpdGlvbnMgb2YgY2xvbmVzIGZvciB0aGUgaXRlbSBvciBhbGwgaWYgbm8gcG9zaXRpb24gd2FzIGdpdmVuLlxyXG5cdCAqL1xyXG4gIGNsb25lcyhwb3NpdGlvbj86IG51bWJlcik6IG51bWJlcltdIHtcclxuXHRcdGNvbnN0IG9kZCA9IHRoaXMuX2Nsb25lcy5sZW5ndGggLyAyLFxyXG5cdFx0XHRldmVuID0gb2RkICsgdGhpcy5faXRlbXMubGVuZ3RoLFxyXG5cdFx0XHRtYXAgPSBpbmRleCA9PiBpbmRleCAlIDIgPT09IDAgPyBldmVuICsgaW5kZXggLyAyIDogb2RkIC0gKGluZGV4ICsgMSkgLyAyO1xyXG5cclxuXHRcdGlmIChwb3NpdGlvbiA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLl9jbG9uZXMubWFwKCh2LCBpKSA9PiBtYXAoaSkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzLl9jbG9uZXMubWFwKCh2LCBpKSA9PiB2ID09PSBwb3NpdGlvbiA/IG1hcChpKSA6IG51bGwpO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogU2V0cyB0aGUgY3VycmVudCBhbmltYXRpb24gc3BlZWQuXHJcblx0ICogQHBhcmFtIHNwZWVkIFRoZSBhbmltYXRpb24gc3BlZWQgaW4gbWlsbGlzZWNvbmRzIG9yIG5vdGhpbmcgdG8gbGVhdmUgaXQgdW5jaGFuZ2VkLlxyXG5cdCAqIEByZXR1cm5zIFRoZSBjdXJyZW50IGFuaW1hdGlvbiBzcGVlZCBpbiBtaWxsaXNlY29uZHMuXHJcblx0ICovXHJcbiAgc3BlZWQoc3BlZWQ/OiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0aWYgKHNwZWVkICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0dGhpcy5fc3BlZWQgPSBzcGVlZDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fc3BlZWQ7XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBHZXRzIHRoZSBjb29yZGluYXRlIG9mIGFuIGl0ZW0uXHJcblx0ICogQHRvZG8gVGhlIG5hbWUgb2YgdGhpcyBtZXRob2QgaXMgbWlzc2xlYW5kaW5nLlxyXG5cdCAqIEBwYXJhbSBwb3NpdGlvbiBUaGUgYWJzb2x1dGUgcG9zaXRpb24gb2YgdGhlIGl0ZW0gd2l0aGluIGBtaW5pbXVtKClgIGFuZCBgbWF4aW11bSgpYC5cclxuXHQgKiBAcmV0dXJucyBUaGUgY29vcmRpbmF0ZSBvZiB0aGUgaXRlbSBpbiBwaXhlbCBvciBhbGwgY29vcmRpbmF0ZXMuXHJcblx0ICovXHJcbiAgY29vcmRpbmF0ZXMocG9zaXRpb24/OiBudW1iZXIpOiBudW1iZXIgfCBudW1iZXJbXSB7XHJcblx0XHRsZXQgbXVsdGlwbGllciA9IDEsXHJcblx0XHRcdG5ld1Bvc2l0aW9uID0gcG9zaXRpb24gLSAxLFxyXG5cdFx0XHRjb29yZGluYXRlLFxyXG5cdFx0XHRyZXN1bHQ6IG51bWJlcltdO1xyXG5cclxuXHRcdGlmIChwb3NpdGlvbiA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHJlc3VsdCA9IHRoaXMuX2Nvb3JkaW5hdGVzLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5jb29yZGluYXRlcyhpbmRleCkgYXMgbnVtYmVyO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5jZW50ZXIpIHtcclxuXHRcdFx0aWYgKHRoaXMuc2V0dGluZ3MucnRsKSB7XHJcblx0XHRcdFx0bXVsdGlwbGllciA9IC0xO1xyXG5cdFx0XHRcdG5ld1Bvc2l0aW9uID0gcG9zaXRpb24gKyAxO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRjb29yZGluYXRlID0gdGhpcy5fY29vcmRpbmF0ZXNbcG9zaXRpb25dO1xyXG5cdFx0XHRjb29yZGluYXRlICs9ICh0aGlzLndpZHRoKCkgLSBjb29yZGluYXRlICsgKHRoaXMuX2Nvb3JkaW5hdGVzW25ld1Bvc2l0aW9uXSB8fCAwKSkgLyAyICogbXVsdGlwbGllcjtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNvb3JkaW5hdGUgPSB0aGlzLl9jb29yZGluYXRlc1tuZXdQb3NpdGlvbl0gfHwgMDtcclxuXHRcdH1cclxuXHJcblx0XHRjb29yZGluYXRlID0gTWF0aC5jZWlsKGNvb3JkaW5hdGUpO1xyXG5cclxuXHRcdHJldHVybiBjb29yZGluYXRlO1xyXG5cdCB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIENhbGN1bGF0ZXMgdGhlIHNwZWVkIGZvciBhIHRyYW5zbGF0aW9uLlxyXG5cdCAqIEBwYXJhbSBmcm9tIFRoZSBhYnNvbHV0ZSBwb3NpdGlvbiBvZiB0aGUgc3RhcnQgaXRlbS5cclxuXHQgKiBAcGFyYW0gdG8gVGhlIGFic29sdXRlIHBvc2l0aW9uIG9mIHRoZSB0YXJnZXQgaXRlbS5cclxuXHQgKiBAcGFyYW0gZmFjdG9yIFtmYWN0b3I9dW5kZWZpbmVkXSAtIFRoZSB0aW1lIGZhY3RvciBpbiBtaWxsaXNlY29uZHMuXHJcblx0ICogQHJldHVybnMgVGhlIHRpbWUgaW4gbWlsbGlzZWNvbmRzIGZvciB0aGUgdHJhbnNsYXRpb24uXHJcblx0ICovXHJcbiAgcHJpdmF0ZSBfZHVyYXRpb24oZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyLCBmYWN0b3I/OiBudW1iZXIgfCBib29sZWFuKTogbnVtYmVyIHtcclxuXHRcdGlmIChmYWN0b3IgPT09IDApIHtcclxuXHRcdFx0cmV0dXJuIDA7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIE1hdGgubWluKE1hdGgubWF4KE1hdGguYWJzKHRvIC0gZnJvbSksIDEpLCA2KSAqIE1hdGguYWJzKCgrZmFjdG9yIHx8IHRoaXMuc2V0dGluZ3Muc21hcnRTcGVlZCkpO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogU2xpZGVzIHRvIHRoZSBzcGVjaWZpZWQgaXRlbS5cclxuXHQgKiBAcGFyYW0gcG9zaXRpb24gVGhlIHBvc2l0aW9uIG9mIHRoZSBpdGVtLlxyXG5cdCAqIEBwYXJhbSBzcGVlZCBUaGUgdGltZSBpbiBtaWxsaXNlY29uZHMgZm9yIHRoZSB0cmFuc2l0aW9uLlxyXG5cdCAqL1xyXG4gIHRvKHBvc2l0aW9uOiBudW1iZXIsIHNwZWVkOiBudW1iZXIgfCBib29sZWFuKSB7XHJcblx0XHRsZXQgY3VycmVudCA9IHRoaXMuY3VycmVudCgpLFxyXG5cdFx0XHRyZXZlcnQgPSBudWxsLFxyXG5cdFx0XHRkaXN0YW5jZSA9IHBvc2l0aW9uIC0gdGhpcy5yZWxhdGl2ZShjdXJyZW50KSxcclxuXHRcdFx0bWF4aW11bSA9IHRoaXMubWF4aW11bSgpO1xyXG5cdFx0Y29uc3RcdGRpcmVjdGlvbiA9ICsoZGlzdGFuY2UgPiAwKSAtICsoZGlzdGFuY2UgPCAwKSxcclxuXHRcdFx0aXRlbXMgPSB0aGlzLl9pdGVtcy5sZW5ndGgsXHJcblx0XHRcdG1pbmltdW0gPSB0aGlzLm1pbmltdW0oKTtcclxuXHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5sb29wKSB7XHJcblx0XHRcdGlmICghdGhpcy5zZXR0aW5ncy5yZXdpbmQgJiYgTWF0aC5hYnMoZGlzdGFuY2UpID4gaXRlbXMgLyAyKSB7XHJcblx0XHRcdFx0ZGlzdGFuY2UgKz0gZGlyZWN0aW9uICogLTEgKiBpdGVtcztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cG9zaXRpb24gPSBjdXJyZW50ICsgZGlzdGFuY2U7XHJcblx0XHRcdHJldmVydCA9ICgocG9zaXRpb24gLSBtaW5pbXVtKSAlIGl0ZW1zICsgaXRlbXMpICUgaXRlbXMgKyBtaW5pbXVtO1xyXG5cclxuXHRcdFx0aWYgKHJldmVydCAhPT0gcG9zaXRpb24gJiYgcmV2ZXJ0IC0gZGlzdGFuY2UgPD0gbWF4aW11bSAmJiByZXZlcnQgLSBkaXN0YW5jZSA+IDApIHtcclxuXHRcdFx0XHRjdXJyZW50ID0gcmV2ZXJ0IC0gZGlzdGFuY2U7XHJcblx0XHRcdFx0cG9zaXRpb24gPSByZXZlcnQ7XHJcblx0XHRcdFx0dGhpcy5yZXNldChjdXJyZW50KTtcclxuXHRcdFx0XHR0aGlzLnNlbmRDaGFuZ2VzKCk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSBpZiAodGhpcy5zZXR0aW5ncy5yZXdpbmQpIHtcclxuXHRcdFx0bWF4aW11bSArPSAxO1xyXG5cdFx0XHRwb3NpdGlvbiA9IChwb3NpdGlvbiAlIG1heGltdW0gKyBtYXhpbXVtKSAlIG1heGltdW07XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRwb3NpdGlvbiA9IE1hdGgubWF4KG1pbmltdW0sIE1hdGgubWluKG1heGltdW0sIHBvc2l0aW9uKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdHRoaXMuc3BlZWQodGhpcy5fZHVyYXRpb24oY3VycmVudCwgcG9zaXRpb24sIHNwZWVkKSk7XHJcblx0XHRcdHRoaXMuY3VycmVudChwb3NpdGlvbik7XHJcblxyXG5cdFx0XHR0aGlzLnVwZGF0ZSgpO1xyXG5cdFx0fSwgMCk7XHJcblxyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogU2xpZGVzIHRvIHRoZSBuZXh0IGl0ZW0uXHJcblx0ICogQHBhcmFtIHNwZWVkIFRoZSB0aW1lIGluIG1pbGxpc2Vjb25kcyBmb3IgdGhlIHRyYW5zaXRpb24uXHJcblx0ICovXHJcbiAgbmV4dChzcGVlZDogbnVtYmVyIHwgYm9vbGVhbikge1xyXG5cdFx0c3BlZWQgPSBzcGVlZCB8fCBmYWxzZTtcclxuXHRcdHRoaXMudG8odGhpcy5yZWxhdGl2ZSh0aGlzLmN1cnJlbnQoKSkgKyAxLCBzcGVlZCk7XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBTbGlkZXMgdG8gdGhlIHByZXZpb3VzIGl0ZW0uXHJcblx0ICogQHBhcmFtIHNwZWVkIFRoZSB0aW1lIGluIG1pbGxpc2Vjb25kcyBmb3IgdGhlIHRyYW5zaXRpb24uXHJcblx0ICovXHJcbiAgcHJldihzcGVlZDogbnVtYmVyIHwgYm9vbGVhbikge1xyXG5cdFx0c3BlZWQgPSBzcGVlZCB8fCBmYWxzZTtcclxuXHRcdHRoaXMudG8odGhpcy5yZWxhdGl2ZSh0aGlzLmN1cnJlbnQoKSkgLSAxLCBzcGVlZCk7XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBIYW5kbGVzIHRoZSBlbmQgb2YgYW4gYW5pbWF0aW9uLlxyXG5cdCAqIEBwYXJhbSBldmVudCAtIFRoZSBldmVudCBhcmd1bWVudHMuXHJcblx0ICovXHJcbiAgb25UcmFuc2l0aW9uRW5kKGV2ZW50PzogYW55KSB7XHJcblx0XHQvLyBpZiBjc3MyIGFuaW1hdGlvbiB0aGVuIGV2ZW50IG9iamVjdCBpcyB1bmRlZmluZWRcclxuXHRcdGlmIChldmVudCAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdC8vIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuXHRcdFx0Ly8gLy8gQ2F0Y2ggb25seSBvd2wtc3RhZ2UgdHJhbnNpdGlvbkVuZCBldmVudFxyXG5cdFx0XHQvLyBpZiAoKGV2ZW50LnRhcmdldCB8fCBldmVudC5zcmNFbGVtZW50IHx8IGV2ZW50Lm9yaWdpbmFsVGFyZ2V0KSAhPT0gdGhpcy4kc3RhZ2UuZ2V0KDApXHQpIHtcclxuXHRcdFx0Ly8gXHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdC8vIH1cclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5sZWF2ZSgnYW5pbWF0aW5nJyk7XHJcblx0XHR0aGlzLl90cmlnZ2VyKCd0cmFuc2xhdGVkJyk7XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBHZXRzIHZpZXdwb3J0IHdpZHRoLlxyXG5cdCAqIEByZXR1cm5zIC0gVGhlIHdpZHRoIGluIHBpeGVsLlxyXG5cdCAqL1xyXG4gIHByaXZhdGUgX3ZpZXdwb3J0KCk6IG51bWJlciB7XHJcblx0XHRsZXQgd2lkdGg7XHJcblx0XHRpZiAodGhpcy5fd2lkdGgpIHtcclxuXHRcdFx0d2lkdGggPSB0aGlzLl93aWR0aDtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNvbnNvbGUud2FybignQ2FuIG5vdCBkZXRlY3Qgdmlld3BvcnQgd2lkdGguJyk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gd2lkdGg7XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBTZXRzIF9pdGVtc1xyXG5cdCAqIEBwYXJhbSBjb250ZW50IFRoZSBsaXN0IG9mIHNsaWRlcyBwdXQgaW50byBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlcy5cclxuXHQgKi9cclxuICBzZXRJdGVtcyhjb250ZW50OiBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlW10pIHtcclxuXHRcdHRoaXMuX2l0ZW1zID0gY29udGVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgc2xpZGVzRGF0YSB1c2luZyB0aGlzLl9pdGVtc1xyXG5cdCAqL1xyXG5cdHByaXZhdGUgX2RlZmluZVNsaWRlc0RhdGEoKSB7XHJcblx0XHR0aGlzLnNsaWRlc0RhdGEgPSB0aGlzLl9pdGVtcy5tYXAoc2xpZGUgPT4ge1xyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdGlkOiBgJHtzbGlkZS5pZH1gLFxyXG5cdFx0XHRcdGFjdGl2ZTogZmFsc2UsXHJcblx0XHRcdFx0dHBsUmVmOiBzbGlkZS50cGxSZWYsXHJcblx0XHRcdFx0ZGF0YU1lcmdlOiBzbGlkZS5kYXRhTWVyZ2UsXHJcblx0XHRcdFx0d2lkdGg6IDAsXHJcblx0XHRcdFx0Y2xvbmVkOiBmYWxzZVxyXG5cdFx0XHR9O1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBPcGVyYXRvcnMgdG8gY2FsY3VsYXRlIHJpZ2h0LXRvLWxlZnQgYW5kIGxlZnQtdG8tcmlnaHQuXHJcblx0ICogQHBhcmFtIGEgLSBUaGUgbGVmdCBzaWRlIG9wZXJhbmQuXHJcblx0ICogQHBhcmFtIG8gLSBUaGUgb3BlcmF0b3IuXHJcblx0ICogQHBhcmFtIGIgLSBUaGUgcmlnaHQgc2lkZSBvcGVyYW5kLlxyXG5cdCAqIEByZXR1cm5zIHRydWUvZmFsc2UgbWVhbmluZyByaWdodC10by1sZWZ0IG9yIGxlZnQtdG8tcmlnaHRcclxuXHQgKi9cclxuICBwcml2YXRlIF9vcChhOiBudW1iZXIsIG86IHN0cmluZywgYjogbnVtYmVyKTogYm9vbGVhbiB7XHJcblx0XHRjb25zdCBydGwgPSB0aGlzLnNldHRpbmdzLnJ0bDtcclxuXHRcdHN3aXRjaCAobykge1xyXG5cdFx0XHRjYXNlICc8JzpcclxuXHRcdFx0XHRyZXR1cm4gcnRsID8gYSA+IGIgOiBhIDwgYjtcclxuXHRcdFx0Y2FzZSAnPic6XHJcblx0XHRcdFx0cmV0dXJuIHJ0bCA/IGEgPCBiIDogYSA+IGI7XHJcblx0XHRcdGNhc2UgJz49JzpcclxuXHRcdFx0XHRyZXR1cm4gcnRsID8gYSA8PSBiIDogYSA+PSBiO1xyXG5cdFx0XHRjYXNlICc8PSc6XHJcblx0XHRcdFx0cmV0dXJuIHJ0bCA/IGEgPj0gYiA6IGEgPD0gYjtcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIFRyaWdnZXJzIGEgcHVibGljIGV2ZW50LlxyXG5cdCAqIEB0b2RvIFJlbW92ZSBgc3RhdHVzYCwgYHJlbGF0ZWRUYXJnZXRgIHNob3VsZCBiZSB1c2VkIGluc3RlYWQuXHJcblx0ICogQHBhcmFtIG5hbWUgVGhlIGV2ZW50IG5hbWUuXHJcblx0ICogQHBhcmFtIGRhdGEgVGhlIGV2ZW50IGRhdGEuXHJcblx0ICogQHBhcmFtIG5hbWVzcGFjZSBUaGUgZXZlbnQgbmFtZXNwYWNlLlxyXG5cdCAqIEBwYXJhbSBzdGF0ZSBUaGUgc3RhdGUgd2hpY2ggaXMgYXNzb2NpYXRlZCB3aXRoIHRoZSBldmVudC5cclxuXHQgKiBAcGFyYW0gZW50ZXIgSW5kaWNhdGVzIGlmIHRoZSBjYWxsIGVudGVycyB0aGUgc3BlY2lmaWVkIHN0YXRlIG9yIG5vdC5cclxuXHQgKi9cclxuICBwcml2YXRlIF90cmlnZ2VyKG5hbWU6IHN0cmluZywgZGF0YT86IGFueSwgbmFtZXNwYWNlPzogc3RyaW5nLCBzdGF0ZT86IHN0cmluZywgZW50ZXI/OiBib29sZWFuKSB7XHJcblx0XHRzd2l0Y2ggKG5hbWUpIHtcclxuXHRcdFx0Y2FzZSAnaW5pdGlhbGl6ZWQnOlxyXG5cdFx0XHRcdHRoaXMuX2luaXRpYWxpemVkQ2Fyb3VzZWwkLm5leHQobmFtZSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ3RyYW5zbGF0ZWQnOlxyXG5cdFx0XHRcdHRoaXMuX3RyYW5zbGF0ZWRDYXJvdXNlbCQubmV4dChuYW1lKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnY2hhbmdlJzpcclxuXHRcdFx0XHR0aGlzLl9jaGFuZ2VkU2V0dGluZ3NDYXJvdXNlbCQubmV4dChkYXRhKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnY2hhbmdlZCc6XHJcblx0XHRcdFx0dGhpcy5fY2hhbmdlZFNldHRpbmdzQ2Fyb3VzZWwkLm5leHQoZGF0YSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ3Jlc2l6ZSc6XHJcblx0XHRcdFx0dGhpcy5fcmVzaXplQ2Fyb3VzZWwkLm5leHQobmFtZSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ3Jlc2l6ZWQnOlxyXG5cdFx0XHRcdHRoaXMuX3Jlc2l6ZWRDYXJvdXNlbCQubmV4dChuYW1lKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAncmVmcmVzaCc6XHJcblx0XHRcdFx0dGhpcy5fcmVmcmVzaENhcm91c2VsJC5uZXh0KG5hbWUpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdyZWZyZXNoZWQnOlxyXG5cdFx0XHRcdHRoaXMuX3JlZnJlc2hlZENhcm91c2VsJC5uZXh0KG5hbWUpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEVudGVycyBhIHN0YXRlLlxyXG5cdCAqIEBwYXJhbSBuYW1lIC0gVGhlIHN0YXRlIG5hbWUuXHJcblx0ICovXHJcbiAgZW50ZXIobmFtZTogc3RyaW5nKSB7XHJcbiAgICBbIG5hbWUgXS5jb25jYXQodGhpcy5fc3RhdGVzLnRhZ3NbbmFtZV0gfHwgW10pLmZvckVhY2goKHN0YXRlTmFtZSkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5fc3RhdGVzLmN1cnJlbnRbc3RhdGVOYW1lXSA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0dGhpcy5fc3RhdGVzLmN1cnJlbnRbc3RhdGVOYW1lXSA9IDA7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuX3N0YXRlcy5jdXJyZW50W3N0YXRlTmFtZV0rKztcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG5cdCAqIExlYXZlcyBhIHN0YXRlLlxyXG5cdCAqIEBwYXJhbSBuYW1lIC0gVGhlIHN0YXRlIG5hbWUuXHJcblx0ICovXHJcblx0bGVhdmUobmFtZTogc3RyaW5nKSB7XHJcbiAgICBbIG5hbWUgXS5jb25jYXQodGhpcy5fc3RhdGVzLnRhZ3NbbmFtZV0gfHwgW10pLmZvckVhY2goKHN0YXRlTmFtZSkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5fc3RhdGVzLmN1cnJlbnRbc3RhdGVOYW1lXSA9PT0gMCB8fCAhIXRoaXMuX3N0YXRlcy5jdXJyZW50W3N0YXRlTmFtZV0pIHtcclxuICAgICAgICB0aGlzLl9zdGF0ZXMuY3VycmVudFtzdGF0ZU5hbWVdLS07XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcblx0ICogUmVnaXN0ZXJzIGFuIGV2ZW50IG9yIHN0YXRlLlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgLSBUaGUgZXZlbnQgb3Igc3RhdGUgdG8gcmVnaXN0ZXIuXHJcblx0ICovXHJcbiAgcmVnaXN0ZXIob2JqZWN0OiBhbnkpIHtcclxuXHRcdGlmIChvYmplY3QudHlwZSA9PT0gVHlwZS5TdGF0ZSkge1xyXG5cdFx0XHRpZiAoIXRoaXMuX3N0YXRlcy50YWdzW29iamVjdC5uYW1lXSkge1xyXG5cdFx0XHRcdHRoaXMuX3N0YXRlcy50YWdzW29iamVjdC5uYW1lXSA9IG9iamVjdC50YWdzO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuX3N0YXRlcy50YWdzW29iamVjdC5uYW1lXSA9IHRoaXMuX3N0YXRlcy50YWdzW29iamVjdC5uYW1lXS5jb25jYXQob2JqZWN0LnRhZ3MpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLl9zdGF0ZXMudGFnc1tvYmplY3QubmFtZV0gPSB0aGlzLl9zdGF0ZXMudGFnc1tvYmplY3QubmFtZV0uZmlsdGVyKCh0YWcsIGkpID0+IHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5fc3RhdGVzLnRhZ3Nbb2JqZWN0Lm5hbWVdLmluZGV4T2YodGFnKSA9PT0gaTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBTdXBwcmVzc2VzIGV2ZW50cy5cclxuXHQgKiBAcGFyYW0gZXZlbnRzIFRoZSBldmVudHMgdG8gc3VwcHJlc3MuXHJcblx0ICovXHJcbiAgcHJpdmF0ZSBfc3VwcHJlc3MoZXZlbnRzOiBzdHJpbmdbXSkge1xyXG5cdFx0ZXZlbnRzLmZvckVhY2goZXZlbnQgPT4ge1xyXG5cdFx0XHR0aGlzLl9zdXByZXNzW2V2ZW50XSA9IHRydWU7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIFJlbGVhc2VzIHN1cHByZXNzZWQgZXZlbnRzLlxyXG5cdCAqIEBwYXJhbSBldmVudHMgVGhlIGV2ZW50cyB0byByZWxlYXNlLlxyXG5cdCAqL1xyXG4gIHByaXZhdGUgX3JlbGVhc2UoZXZlbnRzOiBzdHJpbmdbXSkge1xyXG5cdFx0ZXZlbnRzLmZvckVhY2goZXZlbnQgPT4ge1xyXG5cdFx0XHRkZWxldGUgdGhpcy5fc3VwcmVzc1tldmVudF07XHJcblx0XHR9KTtcclxuXHQgfVxyXG5cclxuICAvKipcclxuXHQgKiBHZXRzIHVuaWZpZWQgcG9pbnRlciBjb29yZGluYXRlcyBmcm9tIGV2ZW50LlxyXG5cdCAqIEB0b2RvICMyNjFcclxuXHQgKiBAcGFyYW0gZXZlbnQgVGhlIGBtb3VzZWRvd25gIG9yIGB0b3VjaHN0YXJ0YCBldmVudC5cclxuXHQgKiBAcmV0dXJucyBPYmplY3QgQ29vcmRzIHdoaWNoIGNvbnRhaW5zIGB4YCBhbmQgYHlgIGNvb3JkaW5hdGVzIG9mIGN1cnJlbnQgcG9pbnRlciBwb3NpdGlvbi5cclxuXHQgKi9cclxuXHRwb2ludGVyKGV2ZW50OiBhbnkpOiBDb29yZHMge1xyXG5cdFx0Y29uc3QgcmVzdWx0ID0geyB4OiBudWxsLCB5OiBudWxsIH07XHJcblxyXG5cdFx0ZXZlbnQgPSBldmVudC5vcmlnaW5hbEV2ZW50IHx8IGV2ZW50IHx8IHdpbmRvdy5ldmVudDtcclxuXHJcblx0XHRldmVudCA9IGV2ZW50LnRvdWNoZXMgJiYgZXZlbnQudG91Y2hlcy5sZW5ndGggP1xyXG5cdFx0XHRldmVudC50b3VjaGVzWzBdIDogZXZlbnQuY2hhbmdlZFRvdWNoZXMgJiYgZXZlbnQuY2hhbmdlZFRvdWNoZXMubGVuZ3RoID9cclxuXHRcdFx0XHRldmVudC5jaGFuZ2VkVG91Y2hlc1swXSA6IGV2ZW50O1xyXG5cclxuXHRcdGlmIChldmVudC5wYWdlWCkge1xyXG5cdFx0XHRyZXN1bHQueCA9IGV2ZW50LnBhZ2VYO1xyXG5cdFx0XHRyZXN1bHQueSA9IGV2ZW50LnBhZ2VZO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmVzdWx0LnggPSBldmVudC5jbGllbnRYO1xyXG5cdFx0XHRyZXN1bHQueSA9IGV2ZW50LmNsaWVudFk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHQgfVxyXG5cclxuICAvKipcclxuXHQgKiBEZXRlcm1pbmVzIGlmIHRoZSBpbnB1dCBpcyBhIE51bWJlciBvciBzb21ldGhpbmcgdGhhdCBjYW4gYmUgY29lcmNlZCB0byBhIE51bWJlclxyXG5cdCAqIEBwYXJhbSBudW1iZXIgVGhlIGlucHV0IHRvIGJlIHRlc3RlZFxyXG5cdCAqIEByZXR1cm5zIEFuIGluZGljYXRpb24gaWYgdGhlIGlucHV0IGlzIGEgTnVtYmVyIG9yIGNhbiBiZSBjb2VyY2VkIHRvIGEgTnVtYmVyXHJcblx0ICovXHJcbiAgcHJpdmF0ZSBfaXNOdW1lcmljKG51bWJlcjogYW55KTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQobnVtYmVyKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdmFsdWUgaXMgbnVtYmVyIG9yIGJvb2xlYW4gdHlwZVxyXG5cdCAqIEBwYXJhbSB2YWx1ZSBUaGUgaW5wdXQgdG8gYmUgdGVzdGVkXHJcblx0ICogQHJldHVybnMgQW4gaW5kaWNhdGlvbiBpZiB0aGUgaW5wdXQgaXMgYSBOdW1iZXIgb3IgY2FuIGJlIGNvZXJjZWQgdG8gYSBOdW1iZXIsIG9yIEJvb2xlYW5cclxuXHQgKi9cclxuXHRwcml2YXRlIF9pc051bWJlck9yQm9vbGVhbih2YWx1ZTogbnVtYmVyIHwgYm9vbGVhbik6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2lzTnVtZXJpYyh2YWx1ZSkgfHwgdHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbic7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdmFsdWUgaXMgbnVtYmVyIG9yIHN0cmluZyB0eXBlXHJcblx0ICogQHBhcmFtIHZhbHVlIFRoZSBpbnB1dCB0byBiZSB0ZXN0ZWRcclxuXHQgKiBAcmV0dXJucyBBbiBpbmRpY2F0aW9uIGlmIHRoZSBpbnB1dCBpcyBhIE51bWJlciBvciBjYW4gYmUgY29lcmNlZCB0byBhIE51bWJlciwgb3IgU3RyaW5nXHJcblx0ICovXHJcblx0cHJpdmF0ZSBfaXNOdW1iZXJPclN0cmluZyh2YWx1ZTogbnVtYmVyIHwgc3RyaW5nKTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gdGhpcy5faXNOdW1lcmljKHZhbHVlKSB8fCB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogR2V0cyB0aGUgZGlmZmVyZW5jZSBvZiB0d28gdmVjdG9ycy5cclxuXHQgKiBAdG9kbyAjMjYxXHJcblx0ICogQHBhcmFtIGZpcnN0IFRoZSBmaXJzdCB2ZWN0b3IuXHJcblx0ICogQHBhcmFtIHNlY29uZC0gVGhlIHNlY29uZCB2ZWN0b3IuXHJcblx0ICogQHJldHVybnMgVGhlIGRpZmZlcmVuY2UuXHJcblx0ICovXHJcbiAgZGlmZmVyZW5jZShmaXJzdDogQ29vcmRzLCBzZWNvbmQ6IENvb3Jkcyk6IENvb3JkcyB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHR4OiBmaXJzdC54IC0gc2Vjb25kLngsXHJcblx0XHRcdHk6IGZpcnN0LnkgLSBzZWNvbmQueVxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTmF2RGF0YSwgRG90c0RhdGEgfSBmcm9tICcuLi9tb2RlbHMvbmF2aWdhdGlvbi1kYXRhLm1vZGVscyc7XHJcbmltcG9ydCB7IENhcm91c2VsU2xpZGVEaXJlY3RpdmUgfSBmcm9tICcuLi9jYXJvdXNlbC9jYXJvdXNlbC5tb2R1bGUnO1xyXG5pbXBvcnQgeyBDYXJvdXNlbFNlcnZpY2UgfSBmcm9tICcuL2Nhcm91c2VsLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIE9ic2VydmFibGUsIG1lcmdlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IHRhcCwgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBPd2xPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWxzL293bC1vcHRpb25zLm1vZGVsJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE5hdmlnYXRpb25TZXJ2aWNlIHtcclxuICAvKipcclxuICAgKiBTdWJzY3Jpb3B0aW9uIHRvIG1lcmdlIE9ic2VydmFibGUgIGZyb20gQ2Fyb3VzZWxTZXJ2aWNlXHJcbiAgICovXHJcbiAgbmF2U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBwbHVnaW4gaXMgaW5pdGlhbGl6ZWQgb3Igbm90LlxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBfaW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGN1cnJlbnQgcGFnaW5nIGluZGV4ZXMuXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIF9wYWdlczogYW55W10gPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogRGF0YSBmb3IgbmF2aWdhdGlvbiBlbGVtZW50cyBvZiB0aGUgdXNlciBpbnRlcmZhY2UuXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIF9uYXZEYXRhOiBOYXZEYXRhID0ge1xyXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgcHJldjoge1xyXG4gICAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICAgIGh0bWxUZXh0OiAnJ1xyXG4gICAgfSxcclxuICAgIG5leHQ6IHtcclxuICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgICBodG1sVGV4dDogJydcclxuICAgIH0sXHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogRGF0YSBmb3IgZG90IGVsZW1lbnRzIG9mIHRoZSB1c2VyIGludGVyZmFjZS5cclxuICAgKi9cclxuICBwcm90ZWN0ZWQgX2RvdHNEYXRhOiBEb3RzRGF0YSA9IHtcclxuICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgIGRvdHM6IFtdXHJcbiAgfTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjYXJvdXNlbFNlcnZpY2U6IENhcm91c2VsU2VydmljZSkge1xyXG4gICAgdGhpcy5zcHlEYXRhU3RyZWFtcygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVmaW5lcyBPYnNlcnZhYmxlcyB3aGljaCBzZXJ2aWNlIG11c3Qgb2JzZXJ2ZVxyXG4gICAqL1xyXG4gIHNweURhdGFTdHJlYW1zKCkge1xyXG4gICAgY29uc3QgaW5pdGlhbGl6ZWRDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldEluaXRpYWxpemVkU3RhdGUoKS5waXBlKFxyXG4gICAgICB0YXAoc3RhdGUgPT4ge1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZU5hdlBhZ2VzKCk7XHJcbiAgICAgICAgdGhpcy5kcmF3KCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgICB0aGlzLmNhcm91c2VsU2VydmljZS5zZW5kQ2hhbmdlcygpO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBtb3N0bHkgY2hhbmdlcyBpbiBjYXJvdXNlbFNlcnZpY2UgYW5kIGNhcm91c2VsIGF0IGFsbCBjYXVzZXMgY2Fyb3VzZWxTZXJ2aWNlLnRvKCkuIEl0IG1vdmVzIHN0YWdlIHJpZ2h0LWxlZnQgYnkgaXRzIGNvZGUgYW5kIGNhbGxpbmcgbmVlZGVkIGZ1bmN0aW9uc1xyXG4gICAgLy8gVGh1cyB0aGlzIG1ldGhvZCBieSBjYWxsaW5nIGNhcm91c2VsU2VydmljZS5jdXJyZW50KHBvc2l0aW9uKSBub3RpZmllcyBhYm91dCBjaGFuZ2VzXHJcbiAgICBjb25zdCBjaGFuZ2VkU2V0dGluZ3MkOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRDaGFuZ2VkU3RhdGUoKS5waXBlKFxyXG4gICAgICBmaWx0ZXIoZGF0YSA9PiBkYXRhLnByb3BlcnR5Lm5hbWUgPT09ICdwb3NpdGlvbicpLFxyXG4gICAgICB0YXAoZGF0YSA9PiB7XHJcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgICAvLyBzaG91bGQgYmUgdGhlIGNhbGwgb2YgdGhlIGZ1bmN0aW9uIHdyaXR0ZW4gYXQgdGhlIGVuZCBvZiBjb21tZW50XHJcbiAgICAgICAgLy8gYnV0IHRoZSBtZXRob2QgY2Fyb3VzZWxTZXJ2aXZlLnRvKCkgaGFzIHNldFRpbWVvdXQoZiwgMCkgd2hpY2ggY29udGFpbnMgY2Fyb3VzZWxTZXJ2aXZlLnVwZGF0ZSgpIHdoaWNoIGNhbGxzIHNlbmRDaGFuZ2VzKCkgbWV0aG9kLlxyXG4gICAgICAgIC8vIGNhcm91c2VsU2VydmljZS5uYXZEYXRhIGFuZCBjYXJvdXNlbFNlcnZpY2UuZG90c0RhdGEgdXBkYXRlIGVhcmxpZXIgdGhhbiBjYXJvdXNlbFNlcnZpdmUudXBkYXRlKCkgZ2V0cyBjYWxsZWRcclxuICAgICAgICAvLyB1cGRhdGVzIG9mIGNhcm91c2VsU2VydmljZS5uYXZEYXRhIGFuZCBjYXJvdXNlbFNlcnZpY2UuZG90c0RhdGEgYXJlIGJlaW5nIGhhcHBlbmluZyB3aXRoaW5nIGNhcm91c2VsU2VydmljZS5jdXJyZW50KHBvc2l0aW9uKSBtZXRob2Qgd2hpY2ggY2FsbHMgbmV4dCgpIG9mIF9jaGFuZ2VkU2V0dGluZ3NDYXJvdXNlbCRcclxuICAgICAgICAvLyBjYXJvdXNlbFNlcnZpY2UuY3VycmVudChwb3NpdGlvbikgaXMgYmVpbmcgY2FsbGluZyBlYXJsaWVyIHRoYW4gY2Fyb3VzZWxTZXJ2aXZlLnVwZGF0ZSgpO1xyXG4gICAgICAgIC8vIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNlbmRDaGFuZ2VzKCk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IHJlZnJlc2hlZENhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0UmVmcmVzaGVkU3RhdGUoKS5waXBlKFxyXG4gICAgICB0YXAoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZU5hdlBhZ2VzKCk7XHJcbiAgICAgICAgdGhpcy5kcmF3KCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgICB0aGlzLmNhcm91c2VsU2VydmljZS5zZW5kQ2hhbmdlcygpO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBuYXZNZXJnZSQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IG1lcmdlKGluaXRpYWxpemVkQ2Fyb3VzZWwkLCBjaGFuZ2VkU2V0dGluZ3MkLCByZWZyZXNoZWRDYXJvdXNlbCQpO1xyXG4gICAgdGhpcy5uYXZTdWJzY3JpcHRpb24gPSBuYXZNZXJnZSQuc3Vic2NyaWJlKFxyXG4gICAgICAoKSA9PiB7fVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEluaXRpYWxpemVzIHRoZSBsYXlvdXQgb2YgdGhlIHBsdWdpbiBhbmQgZXh0ZW5kcyB0aGUgY2Fyb3VzZWwuXHJcblx0ICovXHJcblx0aW5pdGlhbGl6ZSgpIHtcclxuICAgIHRoaXMuX25hdkRhdGEuZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5fbmF2RGF0YS5wcmV2Lmh0bWxUZXh0ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MubmF2VGV4dFswXTtcclxuICAgIHRoaXMuX25hdkRhdGEubmV4dC5odG1sVGV4dCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLm5hdlRleHRbMV07XHJcblxyXG4gICAgdGhpcy5fZG90c0RhdGEuZGlzYWJsZWQgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm5hdkRhdGEgPSB0aGlzLl9uYXZEYXRhO1xyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UuZG90c0RhdGEgPSB0aGlzLl9kb3RzRGF0YTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbGN1bGF0ZXMgaW50ZXJuYWwgc3RhdGVzIGFuZCB1cGRhdGVzIHByb3AgX3BhZ2VzXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfdXBkYXRlTmF2UGFnZXMoKSB7XHJcblx0XHRsZXQgaTogbnVtYmVyLCBqOiBudW1iZXIsIGs6IG51bWJlcjtcclxuXHRcdGNvbnN0IGxvd2VyOiBudW1iZXIgPSB0aGlzLmNhcm91c2VsU2VydmljZS5jbG9uZXMoKS5sZW5ndGggLyAyLFxyXG4gICAgICB1cHBlcjogbnVtYmVyID0gbG93ZXIgKyB0aGlzLmNhcm91c2VsU2VydmljZS5pdGVtcygpLmxlbmd0aCxcclxuICAgICAgbWF4aW11bTogbnVtYmVyID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UubWF4aW11bSh0cnVlKSxcclxuICAgICAgcGFnZXM6IGFueVtdID0gW10sXHJcbiAgICAgIHNldHRpbmdzOiBPd2xPcHRpb25zID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3M7XHJcbiAgICAgbGV0IHNpemUgPSBzZXR0aW5ncy5jZW50ZXIgfHwgc2V0dGluZ3MuYXV0b1dpZHRoIHx8IHNldHRpbmdzLmRvdHNEYXRhXHJcbiAgICAgICAgPyAxIDogc2V0dGluZ3MuZG90c0VhY2ggfHwgc2V0dGluZ3MuaXRlbXM7XHJcbiAgICAgIHNpemUgPSArc2l6ZTtcclxuXHRcdGlmIChzZXR0aW5ncy5zbGlkZUJ5ICE9PSAncGFnZScpIHtcclxuXHRcdFx0c2V0dGluZ3Muc2xpZGVCeSA9IE1hdGgubWluKCtzZXR0aW5ncy5zbGlkZUJ5LCBzZXR0aW5ncy5pdGVtcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHNldHRpbmdzLmRvdHMgfHwgc2V0dGluZ3Muc2xpZGVCeSA9PT0gJ3BhZ2UnKSB7XHJcblxyXG5cdFx0XHRmb3IgKGkgPSBsb3dlciwgaiA9IDAsIGsgPSAwOyBpIDwgdXBwZXI7IGkrKykge1xyXG5cdFx0XHRcdGlmIChqID49IHNpemUgfHwgaiA9PT0gMCkge1xyXG5cdFx0XHRcdFx0cGFnZXMucHVzaCh7XHJcblx0XHRcdFx0XHRcdHN0YXJ0OiBNYXRoLm1pbihtYXhpbXVtLCBpIC0gbG93ZXIpLFxyXG5cdFx0XHRcdFx0XHRlbmQ6IGkgLSBsb3dlciArIHNpemUgLSAxXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdGlmIChNYXRoLm1pbihtYXhpbXVtLCBpIC0gbG93ZXIpID09PSBtYXhpbXVtKSB7XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0aiA9IDAsICsraztcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aiArPSB0aGlzLmNhcm91c2VsU2VydmljZS5tZXJnZXJzKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnJlbGF0aXZlKGkpKSBhcyBudW1iZXI7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHRoaXMuX3BhZ2VzID0gcGFnZXM7XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBEcmF3cyB0aGUgdXNlciBpbnRlcmZhY2UuXHJcblx0ICogQHRvZG8gVGhlIG9wdGlvbiBgZG90c0RhdGFgIHdvbnQgd29yay5cclxuXHQgKi9cclxuICBkcmF3KCkge1xyXG5cdFx0bGV0IGRpZmZlcmVuY2U6IG51bWJlcjtcclxuICAgIGNvbnN0XHRzZXR0aW5nczogT3dsT3B0aW9ucyA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLFxyXG4gICAgICBpdGVtczogQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZVtdID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuaXRlbXMoKSxcclxuICAgICAgZGlzYWJsZWQgPSBpdGVtcy5sZW5ndGggPD0gc2V0dGluZ3MuaXRlbXM7XHJcblxyXG5cdFx0dGhpcy5fbmF2RGF0YS5kaXNhYmxlZCA9ICFzZXR0aW5ncy5uYXYgfHwgZGlzYWJsZWQ7XHJcblx0XHR0aGlzLl9kb3RzRGF0YS5kaXNhYmxlZCA9ICFzZXR0aW5ncy5kb3RzIHx8IGRpc2FibGVkO1xyXG5cclxuXHRcdGlmIChzZXR0aW5ncy5kb3RzKSB7XHJcblx0XHRcdGRpZmZlcmVuY2UgPSB0aGlzLl9wYWdlcy5sZW5ndGggLSB0aGlzLl9kb3RzRGF0YS5kb3RzLmxlbmd0aDtcclxuXHJcblx0XHRcdGlmIChzZXR0aW5ncy5kb3RzRGF0YSAmJiBkaWZmZXJlbmNlICE9PSAwKSB7XHJcbiAgICAgICAgdGhpcy5fZG90c0RhdGEuZG90cyA9IFtdO1xyXG4gICAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICB0aGlzLl9kb3RzRGF0YS5kb3RzLnB1c2goe1xyXG4gICAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxyXG4gICAgICAgICAgICBpZDogYGRvdC0ke2l0ZW0uaWR9YCxcclxuICAgICAgICAgICAgaW5uZXJDb250ZW50OiBpdGVtLmRvdENvbnRlbnQsXHJcbiAgICAgICAgICAgIHNob3dJbm5lckNvbnRlbnQ6IHRydWVcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cdFx0XHR9IGVsc2UgaWYgKGRpZmZlcmVuY2UgPiAwKSB7XHJcbiAgICAgICAgY29uc3Qgc3RhcnRJOiBudW1iZXIgPSB0aGlzLl9kb3RzRGF0YS5kb3RzLmxlbmd0aCA+IDAgPyB0aGlzLl9kb3RzRGF0YS5kb3RzLmxlbmd0aCA6IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaWZmZXJlbmNlOyBpKyspIHtcclxuICAgICAgICAgIHRoaXMuX2RvdHNEYXRhLmRvdHMucHVzaCh7XHJcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGlkOiBgZG90LSR7aSArIHN0YXJ0SX1gLFxyXG4gICAgICAgICAgICBzaG93SW5uZXJDb250ZW50OiBmYWxzZVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cdFx0XHR9IGVsc2UgaWYgKGRpZmZlcmVuY2UgPCAwKSB7XHJcbiAgICAgICAgdGhpcy5fZG90c0RhdGEuZG90cy5zcGxpY2UoZGlmZmVyZW5jZSwgTWF0aC5hYnMoZGlmZmVyZW5jZSkpXHJcblx0XHRcdH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5uYXZEYXRhID0gdGhpcy5fbmF2RGF0YTtcclxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmRvdHNEYXRhID0gdGhpcy5fZG90c0RhdGE7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlcyBuYXZpZ2F0aW9uIGJ1dHRvbnMncyBhbmQgZG90cydzIHN0YXRlc1xyXG4gICAqL1xyXG4gIHVwZGF0ZSgpIHtcclxuICAgIHRoaXMuX3VwZGF0ZU5hdkJ1dHRvbnMoKTtcclxuICAgIHRoaXMuX3VwZGF0ZURvdHMoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoYW5nZXMgc3RhdGUgb2YgbmF2IGJ1dHRvbnMgKGRpc2FibGVkLCBlbmFibGVkKVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3VwZGF0ZU5hdkJ1dHRvbnMoKSB7XHJcbiAgICBjb25zdFx0c2V0dGluZ3M6IE93bE9wdGlvbnMgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncyxcclxuICAgICAgbG9vcDogYm9vbGVhbiA9IHNldHRpbmdzLmxvb3AgfHwgc2V0dGluZ3MucmV3aW5kLFxyXG4gICAgICBpbmRleDogbnVtYmVyID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UucmVsYXRpdmUodGhpcy5jYXJvdXNlbFNlcnZpY2UuY3VycmVudCgpKTtcclxuXHJcbiAgICBpZiAoc2V0dGluZ3MubmF2KSB7XHJcbiAgICAgIHRoaXMuX25hdkRhdGEucHJldi5kaXNhYmxlZCA9ICFsb29wICYmIGluZGV4IDw9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm1pbmltdW0odHJ1ZSk7XHJcblx0XHRcdHRoaXMuX25hdkRhdGEubmV4dC5kaXNhYmxlZCA9ICFsb29wICYmIGluZGV4ID49IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm1heGltdW0odHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UubmF2RGF0YSA9IHRoaXMuX25hdkRhdGE7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGFuZ2VzIGFjdGl2ZSBkb3QgaWYgcGFnZSBiZWNvbWVzIGNoYW5nZWRcclxuICAgKi9cclxuICBwcml2YXRlIF91cGRhdGVEb3RzKCkge1xyXG4gICAgbGV0IGN1ckFjdGl2ZURvdEk6IG51bWJlcjtcclxuICAgIHRoaXMuX2RvdHNEYXRhLmRvdHMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgaWYgKGl0ZW0uYWN0aXZlID09PSB0cnVlKSB7XHJcbiAgICAgICAgaXRlbS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICBjdXJBY3RpdmVEb3RJID0gdGhpcy5fY3VycmVudCgpO1xyXG4gICAgaWYgKHRoaXMuX2RvdHNEYXRhLmRvdHMubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMuX2RvdHNEYXRhLmRvdHNbY3VyQWN0aXZlRG90SV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmRvdHNEYXRhID0gdGhpcy5fZG90c0RhdGE7XHJcbiAgfVxyXG5cclxuICAvKipcclxuXHQgKiBHZXRzIHRoZSBjdXJyZW50IHBhZ2UgcG9zaXRpb24gb2YgdGhlIGNhcm91c2VsLlxyXG5cdCAqIEByZXR1cm5zIHRoZSBjdXJyZW50IHBhZ2UgcG9zaXRpb24gb2YgdGhlIGNhcm91c2VsXHJcblx0ICovXHJcblx0cHJpdmF0ZSBfY3VycmVudCgpOiBhbnkge1xyXG4gICAgY29uc3QgY3VycmVudDogbnVtYmVyID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UucmVsYXRpdmUodGhpcy5jYXJvdXNlbFNlcnZpY2UuY3VycmVudCgpKTtcclxuICAgIGxldCBmaW5hbEN1cnJlbnQ6IG51bWJlcjtcclxuICAgIGNvbnN0IHBhZ2VzOiBhbnkgPSB0aGlzLl9wYWdlcy5maWx0ZXIoKHBhZ2UsIGluZGV4KSA9PiB7XHJcbiAgICAgIHJldHVybiBwYWdlLnN0YXJ0IDw9IGN1cnJlbnQgJiYgcGFnZS5lbmQgPj0gY3VycmVudDtcclxuICAgIH0pLnBvcCgpO1xyXG5cclxuICAgIGZpbmFsQ3VycmVudCA9IHRoaXMuX3BhZ2VzLmZpbmRJbmRleChwYWdlID0+IHtcclxuICAgICAgcmV0dXJuIHBhZ2Uuc3RhcnQgPT09IHBhZ2VzLnN0YXJ0ICYmIHBhZ2UuZW5kID09PSBwYWdlcy5lbmQ7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gZmluYWxDdXJyZW50O1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG5cdCAqIEdldHMgdGhlIGN1cnJlbnQgc3VjY2Vzb3IvcHJlZGVjZXNzb3IgcG9zaXRpb24uXHJcbiAgICogQHBhcmFtIHN1c3Nlc3NvciBwb3NpdGlvbiBvZiBzbGlkZVxyXG5cdCAqIEByZXR1cm5zIHRoZSBjdXJyZW50IHN1Y2Nlc29yL3ByZWRlY2Vzc29yIHBvc2l0aW9uXHJcblx0ICovXHJcblx0cHJpdmF0ZSBfZ2V0UG9zaXRpb24oc3VjY2Vzc29yOiBudW1iZXIgfCBib29sZWFuKTogbnVtYmVyIHtcclxuXHRcdGxldCBwb3NpdGlvbjogbnVtYmVyLCBsZW5ndGg6IG51bWJlcjtcclxuXHRcdGNvbnN0XHRzZXR0aW5nczogT3dsT3B0aW9ucyA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzO1xyXG5cclxuXHRcdGlmIChzZXR0aW5ncy5zbGlkZUJ5ID09PSAncGFnZScpIHtcclxuXHRcdFx0cG9zaXRpb24gPSB0aGlzLl9jdXJyZW50KCk7XHJcblx0XHRcdGxlbmd0aCA9IHRoaXMuX3BhZ2VzLmxlbmd0aDtcclxuXHRcdFx0c3VjY2Vzc29yID8gKytwb3NpdGlvbiA6IC0tcG9zaXRpb247XHJcblx0XHRcdHBvc2l0aW9uID0gdGhpcy5fcGFnZXNbKChwb3NpdGlvbiAlIGxlbmd0aCkgKyBsZW5ndGgpICUgbGVuZ3RoXS5zdGFydDtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHBvc2l0aW9uID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UucmVsYXRpdmUodGhpcy5jYXJvdXNlbFNlcnZpY2UuY3VycmVudCgpKTtcclxuXHRcdFx0bGVuZ3RoID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuaXRlbXMoKS5sZW5ndGg7XHJcblx0XHRcdHN1Y2Nlc3NvciA/IHBvc2l0aW9uICs9ICtzZXR0aW5ncy5zbGlkZUJ5IDogcG9zaXRpb24gLT0gK3NldHRpbmdzLnNsaWRlQnk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHBvc2l0aW9uO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG5cdCAqIFNsaWRlcyB0byB0aGUgbmV4dCBpdGVtIG9yIHBhZ2UuXHJcblx0ICogQHBhcmFtIHNwZWVkIFRoZSB0aW1lIGluIG1pbGxpc2Vjb25kcyBmb3IgdGhlIHRyYW5zaXRpb24uXHJcblx0ICovXHJcblx0bmV4dChzcGVlZDogbnVtYmVyIHwgYm9vbGVhbikge1xyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UudG8odGhpcy5fZ2V0UG9zaXRpb24odHJ1ZSksIHNwZWVkKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBTbGlkZXMgdG8gdGhlIHByZXZpb3VzIGl0ZW0gb3IgcGFnZS5cclxuXHQgKiBAcGFyYW0gc3BlZWQgVGhlIHRpbWUgaW4gbWlsbGlzZWNvbmRzIGZvciB0aGUgdHJhbnNpdGlvbi5cclxuXHQgKi9cclxuXHRwcmV2KHNwZWVkOiBudW1iZXIgfCBib29sZWFuKSB7XHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS50byh0aGlzLl9nZXRQb3NpdGlvbihmYWxzZSksIHNwZWVkKTtcclxuICB9O1xyXG5cclxuIFx0LyoqXHJcblx0ICogU2xpZGVzIHRvIHRoZSBzcGVjaWZpZWQgaXRlbSBvciBwYWdlLlxyXG5cdCAqIEBwYXJhbSBwb3NpdGlvbiAtIFRoZSBwb3NpdGlvbiBvZiB0aGUgaXRlbSBvciBwYWdlLlxyXG5cdCAqIEBwYXJhbSBzcGVlZCAtIFRoZSB0aW1lIGluIG1pbGxpc2Vjb25kcyBmb3IgdGhlIHRyYW5zaXRpb24uXHJcblx0ICogQHBhcmFtIHN0YW5kYXJkIC0gV2hldGhlciB0byB1c2UgdGhlIHN0YW5kYXJkIGJlaGF2aW91ciBvciBub3QuIERlZmF1bHQgbWVhbmluZyBmYWxzZVxyXG5cdCAqL1xyXG5cdHRvKHBvc2l0aW9uOiBudW1iZXIsIHNwZWVkOiBudW1iZXIgfCBib29sZWFuLCBzdGFuZGFyZD86IGJvb2xlYW4pIHtcclxuXHRcdGxldCBsZW5ndGg6IG51bWJlcjtcclxuXHRcdGlmICghc3RhbmRhcmQgJiYgdGhpcy5fcGFnZXMubGVuZ3RoKSB7XHJcbiAgICAgIGxlbmd0aCA9IHRoaXMuX3BhZ2VzLmxlbmd0aDtcclxuICAgICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UudG8odGhpcy5fcGFnZXNbKChwb3NpdGlvbiAlIGxlbmd0aCkgKyBsZW5ndGgpICUgbGVuZ3RoXS5zdGFydCwgc3BlZWQpO1xyXG5cdFx0fSBlbHNlIHtcclxuICAgICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UudG8ocG9zaXRpb24sIHNwZWVkKTtcclxuXHRcdH1cclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBNb3ZlcyBjYXJvdXNlbCBhZnRlciB1c2VyJ3MgY2xpY2tpbmcgb24gYW55IGRvdHNcclxuICAgKi9cclxuICBtb3ZlQnlEb3QoZG90SWQ6IHN0cmluZykge1xyXG4gICAgY29uc3QgaW5kZXg6IG51bWJlciA9IHRoaXMuX2RvdHNEYXRhLmRvdHMuZmluZEluZGV4KGRvdCA9PiBkb3RJZCA9PT0gZG90LmlkKTtcclxuICAgIHRoaXMudG8oaW5kZXgsIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmRvdHNTcGVlZCk7XHJcbiAgfVxyXG5cclxufVxyXG4iLCIvLyBpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbi8vIGZ1bmN0aW9uIF93aW5kb3coKTogYW55IHtcclxuLy8gICAgLy8gcmV0dXJuIHRoZSBnbG9iYWwgbmF0aXZlIGJyb3dzZXIgd2luZG93IG9iamVjdFxyXG4vLyAgICByZXR1cm4gd2luZG93O1xyXG4vLyB9XHJcbi8vIEBJbmplY3RhYmxlKClcclxuLy8gZXhwb3J0IGNsYXNzIFdpbmRvd1JlZlNlcnZpY2Uge1xyXG4vLyAgICBnZXQgbmF0aXZlV2luZG93KCk6IGFueSB7XHJcbi8vICAgICAgIHJldHVybiBfd2luZG93KCk7XHJcbi8vICAgIH1cclxuLy8gfVxyXG5cclxuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge1xyXG4gIENsYXNzUHJvdmlkZXIsXHJcbiAgRmFjdG9yeVByb3ZpZGVyLFxyXG4gIEluamVjdGlvblRva2VuLFxyXG4gIFBMQVRGT1JNX0lEXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGEgbmV3IGluamVjdGlvbiB0b2tlbiBmb3IgaW5qZWN0aW5nIHRoZSB3aW5kb3cgaW50byBhIGNvbXBvbmVudC5cclxuICovXHJcbmV4cG9ydCBjb25zdCBXSU5ET1cgPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ1dpbmRvd1Rva2VuJyk7XHJcblxyXG4vKipcclxuICogRGVmaW5lIGFic3RyYWN0IGNsYXNzIGZvciBvYnRhaW5pbmcgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgd2luZG93IG9iamVjdC5cclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBXaW5kb3dSZWYge1xyXG4gIGdldCBuYXRpdmVXaW5kb3coKTogV2luZG93IHwgT2JqZWN0IHtcclxuICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkLicpO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIERlZmluZSBjbGFzcyB0aGF0IGltcGxlbWVudHMgdGhlIGFic3RyYWN0IGNsYXNzIGFuZCByZXR1cm5zIHRoZSBuYXRpdmUgd2luZG93IG9iamVjdC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBCcm93c2VyV2luZG93UmVmIGV4dGVuZHMgV2luZG93UmVmIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcmV0dXJucyB3aW5kb3cgb2JqZWN0XHJcbiAgICovXHJcbiAgZ2V0IG5hdGl2ZVdpbmRvdygpOiBXaW5kb3cgfCBPYmplY3Qge1xyXG4gICAgcmV0dXJuIHdpbmRvdztcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYW4gZmFjdG9yeSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIG5hdGl2ZSB3aW5kb3cgb2JqZWN0LlxyXG4gKiBAcGFyYW0gYnJvd3NlcldpbmRvd1JlZiBOYXRpdmUgd2luZG93IG9iamVjdFxyXG4gKiBAcGFyYW0gcGxhdGZvcm1JZCBpZCBvZiBwbGF0Zm9ybVxyXG4gKiBAcmV0dXJucyB0eXBlIG9mIHBsYXRmb3JtIG9mIGVtcHR5IG9iamVjdFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHdpbmRvd0ZhY3RvcnkoXHJcbiAgYnJvd3NlcldpbmRvd1JlZjogQnJvd3NlcldpbmRvd1JlZixcclxuICBwbGF0Zm9ybUlkOiBPYmplY3RcclxuKTogV2luZG93IHwgT2JqZWN0IHtcclxuICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIocGxhdGZvcm1JZCkpIHtcclxuICAgIHJldHVybiBicm93c2VyV2luZG93UmVmLm5hdGl2ZVdpbmRvdztcclxuICB9XHJcbiAgcmV0dXJuIG5ldyBPYmplY3QoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhIGluamVjdGFibGUgcHJvdmlkZXIgZm9yIHRoZSBXaW5kb3dSZWYgdG9rZW4gdGhhdCB1c2VzIHRoZSBCcm93c2VyV2luZG93UmVmIGNsYXNzLlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGJyb3dzZXJXaW5kb3dQcm92aWRlcjogQ2xhc3NQcm92aWRlciA9IHtcclxuICBwcm92aWRlOiBXaW5kb3dSZWYsXHJcbiAgdXNlQ2xhc3M6IEJyb3dzZXJXaW5kb3dSZWZcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYW4gaW5qZWN0YWJsZSBwcm92aWRlciB0aGF0IHVzZXMgdGhlIHdpbmRvd0ZhY3RvcnkgZnVuY3Rpb24gZm9yIHJldHVybmluZyB0aGUgbmF0aXZlIHdpbmRvdyBvYmplY3QuXHJcbiAqL1xyXG5leHBvcnQgY29uc3Qgd2luZG93UHJvdmlkZXI6IEZhY3RvcnlQcm92aWRlciA9IHtcclxuICBwcm92aWRlOiBXSU5ET1csXHJcbiAgdXNlRmFjdG9yeTogd2luZG93RmFjdG9yeSxcclxuICBkZXBzOiBbV2luZG93UmVmLCBQTEFURk9STV9JRF1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYW4gYXJyYXkgb2YgcHJvdmlkZXJzLlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IFdJTkRPV19QUk9WSURFUlMgPSBbYnJvd3NlcldpbmRvd1Byb3ZpZGVyLCB3aW5kb3dQcm92aWRlcl07XHJcbiIsImltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtcclxuICBDbGFzc1Byb3ZpZGVyLFxyXG4gIEZhY3RvcnlQcm92aWRlcixcclxuICBJbmplY3Rpb25Ub2tlbixcclxuICBQTEFURk9STV9JRCxcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYSBuZXcgaW5qZWN0aW9uIHRva2VuIGZvciBpbmplY3RpbmcgdGhlIERvY3VtZW50IGludG8gYSBjb21wb25lbnQuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgRE9DVU1FTlQgPSBuZXcgSW5qZWN0aW9uVG9rZW48RG9jdW1lbnQ+KCdEb2N1bWVudFRva2VuJyk7XHJcbi8qKlxyXG4gKiBEZWZpbmUgYWJzdHJhY3QgY2xhc3MgZm9yIG9idGFpbmluZyByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBEb2N1bWVudCBvYmplY3QuXHJcbiAqL1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRG9jdW1lbnRSZWYge1xyXG4gIGdldCBuYXRpdmVEb2N1bWVudCgpOiBEb2N1bWVudCB8IE9iamVjdCB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZC4nKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEZWZpbmUgY2xhc3MgdGhhdCBpbXBsZW1lbnRzIHRoZSBhYnN0cmFjdCBjbGFzcyBhbmQgcmV0dXJucyB0aGUgbmF0aXZlIERvY3VtZW50IG9iamVjdC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBCcm93c2VyRG9jdW1lbnRSZWYgZXh0ZW5kcyBEb2N1bWVudFJlZiB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHJldHVybnMgRG9jdW1lbnQgb2JqZWN0XHJcbiAgICovXHJcbiAgZ2V0IG5hdGl2ZURvY3VtZW50KCk6IERvY3VtZW50IHwgT2JqZWN0IHtcclxuICAgIHJldHVybiBkb2N1bWVudDtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYW4gZmFjdG9yeSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIG5hdGl2ZSBEb2N1bWVudCBvYmplY3QuXHJcbiAqIEBwYXJhbSBicm93c2VyRG9jdW1lbnRSZWYgTmF0aXZlIERvY3VtZW50IG9iamVjdFxyXG4gKiBAcGFyYW0gcGxhdGZvcm1JZCBpZCBvZiBwbGF0Zm9ybVxyXG4gKiBAcmV0dXJucyB0eXBlIG9mIHBsYXRmb3JtIG9mIGVtcHR5IG9iamVjdFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGRvY3VtZW50RmFjdG9yeShcclxuICBicm93c2VyRG9jdW1lbnRSZWY6IEJyb3dzZXJEb2N1bWVudFJlZixcclxuICBwbGF0Zm9ybUlkOiBPYmplY3RcclxuKTogRG9jdW1lbnQgfCBPYmplY3Qge1xyXG4gIGlmIChpc1BsYXRmb3JtQnJvd3NlcihwbGF0Zm9ybUlkKSkge1xyXG4gICAgcmV0dXJuIGJyb3dzZXJEb2N1bWVudFJlZi5uYXRpdmVEb2N1bWVudDtcclxuICB9XHJcbiAgcmV0dXJuIG5ldyBPYmplY3QoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhIGluamVjdGFibGUgcHJvdmlkZXIgZm9yIHRoZSBEb2N1bWVudFJlZiB0b2tlbiB0aGF0IHVzZXMgdGhlIEJyb3dzZXJEb2N1bWVudFJlZiBjbGFzcy5cclxuICovXHJcbmV4cG9ydCBjb25zdCBicm93c2VyRG9jdW1lbnRQcm92aWRlcjogQ2xhc3NQcm92aWRlciA9IHtcclxuICBwcm92aWRlOiBEb2N1bWVudFJlZixcclxuICB1c2VDbGFzczogQnJvd3NlckRvY3VtZW50UmVmXHJcbn07XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGFuIGluamVjdGFibGUgcHJvdmlkZXIgdGhhdCB1c2VzIHRoZSBEb2N1bWVudEZhY3RvcnkgZnVuY3Rpb24gZm9yIHJldHVybmluZyB0aGUgbmF0aXZlIERvY3VtZW50IG9iamVjdC5cclxuICovXHJcbmV4cG9ydCBjb25zdCBkb2N1bWVudFByb3ZpZGVyOiBGYWN0b3J5UHJvdmlkZXIgPSB7XHJcbiAgcHJvdmlkZTogRE9DVU1FTlQsXHJcbiAgdXNlRmFjdG9yeTogZG9jdW1lbnRGYWN0b3J5LFxyXG4gIGRlcHM6IFtEb2N1bWVudFJlZiwgUExBVEZPUk1fSURdXHJcbn07XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGFuIGFycmF5IG9mIHByb3ZpZGVycy5cclxuICovXHJcbmV4cG9ydCBjb25zdCBET0NVTUVOVF9QUk9WSURFUlMgPSBbYnJvd3NlckRvY3VtZW50UHJvdmlkZXIsIGRvY3VtZW50UHJvdmlkZXJdO1xyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBPYnNlcnZhYmxlLCBtZXJnZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBDYXJvdXNlbFNlcnZpY2UgfSBmcm9tICcuL2Nhcm91c2VsLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IFdJTkRPVyB9IGZyb20gJy4vd2luZG93LXJlZi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICcuL2RvY3VtZW50LXJlZi5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEF1dG9wbGF5U2VydmljZSB7XHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaW9wdGlvbiB0byBtZXJnZSBPYnNlcnZhYmxlcyBmcm9tIENhcm91c2VsU2VydmljZVxyXG4gICAqL1xyXG4gIGF1dG9wbGF5U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBhdXRvcGxheSB0aW1lb3V0LlxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3RpbWVvdXQ6IG51bWJlciA9IG51bGw7XHJcblxyXG4gIC8qKlxyXG4gICAqIEluZGljYXRlcyB3aGVuZXZlciB0aGUgYXV0b3BsYXkgaXMgcGF1c2VkLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3BhdXNlZCA9IGZhbHNlO1xyXG5cclxuICBwcml2YXRlIHdpblJlZjogV2luZG93O1xyXG4gIHByaXZhdGUgZG9jUmVmOiBEb2N1bWVudDtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjYXJvdXNlbFNlcnZpY2U6IENhcm91c2VsU2VydmljZSxcclxuICAgICAgICAgICAgICBASW5qZWN0KFdJTkRPVykgd2luUmVmOiBhbnksXHJcbiAgICAgICAgICAgICAgQEluamVjdChET0NVTUVOVCkgZG9jUmVmOiBhbnksXHJcbiAgKSB7XHJcbiAgICB0aGlzLndpblJlZiA9IHdpblJlZiBhcyBXaW5kb3c7XHJcbiAgICB0aGlzLmRvY1JlZiA9IGRvY1JlZiBhcyBEb2N1bWVudDtcclxuICAgIHRoaXMuc3B5RGF0YVN0cmVhbXMoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlZmluZXMgT2JzZXJ2YWJsZXMgd2hpY2ggc2VydmljZSBtdXN0IG9ic2VydmVcclxuICAgKi9cclxuICBzcHlEYXRhU3RyZWFtcygpIHtcclxuICAgIGNvbnN0IGluaXRpYWxpemVkQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRJbml0aWFsaXplZFN0YXRlKCkucGlwZShcclxuICAgICAgdGFwKCgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b3BsYXkpIHtcclxuXHRcdFx0XHRcdHRoaXMucGxheSgpO1xyXG5cdFx0XHRcdH1cclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgY2hhbmdlZFNldHRpbmdzJDogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0Q2hhbmdlZFN0YXRlKCkucGlwZShcclxuICAgICAgdGFwKGRhdGEgPT4ge1xyXG4gICAgICAgIHRoaXMuX2hhbmRsZUNoYW5nZU9ic2VydmFibGUoZGF0YSk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIC8vIG9yaWdpbmFsIEF1dG9wbGF5IFBsdWdpbiBoYXMgbGlzdGVuZXJzIG9uIHBsYXkub3dsLmNvcmUgYW5kIHN0b3Aub3dsLmNvcmUgZXZlbnRzLlxyXG4gICAgLy8gVGhleSBhcmUgdHJpZ2dlcmVkIGJ5IFZpZGVvIFBsdWdpblxyXG5cclxuICAgIGNvbnN0IGF1dG9wbGF5TWVyZ2UkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSBtZXJnZShpbml0aWFsaXplZENhcm91c2VsJCwgY2hhbmdlZFNldHRpbmdzJCk7XHJcbiAgICB0aGlzLmF1dG9wbGF5U3Vic2NyaXB0aW9uID0gYXV0b3BsYXlNZXJnZSQuc3Vic2NyaWJlKFxyXG4gICAgICAoKSA9PiB7fVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIFN0YXJ0cyB0aGUgYXV0b3BsYXkuXHJcblx0ICogQHBhcmFtIHRpbWVvdXQgVGhlIGludGVydmFsIGJlZm9yZSB0aGUgbmV4dCBhbmltYXRpb24gc3RhcnRzLlxyXG5cdCAqIEBwYXJhbSBzcGVlZCBUaGUgYW5pbWF0aW9uIHNwZWVkIGZvciB0aGUgYW5pbWF0aW9ucy5cclxuXHQgKi9cclxuXHRwbGF5KHRpbWVvdXQ/OiBudW1iZXIsIHNwZWVkPzogbnVtYmVyKSB7XHJcbiAgICBpZiAodGhpcy5fcGF1c2VkKSB7XHJcblx0XHRcdHRoaXMuX3BhdXNlZCA9IGZhbHNlO1xyXG5cdFx0XHR0aGlzLl9zZXRBdXRvUGxheUludGVydmFsKCk7XHJcbiAgICB9XHJcblxyXG5cdFx0aWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmlzKCdyb3RhdGluZycpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmNhcm91c2VsU2VydmljZS5lbnRlcigncm90YXRpbmcnKTtcclxuXHJcblx0XHR0aGlzLl9zZXRBdXRvUGxheUludGVydmFsKCk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcblx0ICogR2V0cyBhIG5ldyB0aW1lb3V0XHJcblx0ICogQHBhcmFtIHRpbWVvdXQgLSBUaGUgaW50ZXJ2YWwgYmVmb3JlIHRoZSBuZXh0IGFuaW1hdGlvbiBzdGFydHMuXHJcblx0ICogQHBhcmFtIHNwZWVkIC0gVGhlIGFuaW1hdGlvbiBzcGVlZCBmb3IgdGhlIGFuaW1hdGlvbnMuXHJcblx0ICogQHJldHVyblxyXG5cdCAqL1xyXG5cdHByaXZhdGUgX2dldE5leHRUaW1lb3V0KHRpbWVvdXQ/OiBudW1iZXIsIHNwZWVkPzogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdGlmICggdGhpcy5fdGltZW91dCApIHtcclxuXHRcdFx0dGhpcy53aW5SZWYuY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVvdXQpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXMud2luUmVmLnNldFRpbWVvdXQoKCkgPT57XHJcbiAgICAgIGlmICh0aGlzLl9wYXVzZWQgfHwgdGhpcy5jYXJvdXNlbFNlcnZpY2UuaXMoJ2J1c3knKSB8fCB0aGlzLmNhcm91c2VsU2VydmljZS5pcygnaW50ZXJhY3RpbmcnKSB8fCB0aGlzLmRvY1JlZi5oaWRkZW4pIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5jYXJvdXNlbFNlcnZpY2UubmV4dChzcGVlZCB8fCB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hdXRvcGxheVNwZWVkKTtcclxuICAgIH0sIHRpbWVvdXQgfHwgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b3BsYXlUaW1lb3V0KTtcclxuICB9O1xyXG5cclxuICAvKipcclxuXHQgKiBTZXRzIGF1dG9wbGF5IGluIG1vdGlvbi5cclxuXHQgKi9cclxuXHRwcml2YXRlIF9zZXRBdXRvUGxheUludGVydmFsKCkge1xyXG5cdFx0dGhpcy5fdGltZW91dCA9IHRoaXMuX2dldE5leHRUaW1lb3V0KCk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogU3RvcHMgdGhlIGF1dG9wbGF5LlxyXG5cdCAqL1xyXG5cdHN0b3AoKSB7XHJcblx0XHRpZiAoIXRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmlzKCdyb3RhdGluZycpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLndpblJlZi5jbGVhclRpbWVvdXQodGhpcy5fdGltZW91dCk7XHJcblx0XHR0aGlzLmNhcm91c2VsU2VydmljZS5sZWF2ZSgncm90YXRpbmcnKTtcclxuICB9O1xyXG5cclxuICAvKipcclxuXHQgKiBTdG9wcyB0aGUgYXV0b3BsYXkuXHJcblx0ICovXHJcblx0cGF1c2UoKSB7XHJcblx0XHRpZiAoIXRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmlzKCdyb3RhdGluZycpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl9wYXVzZWQgPSB0cnVlO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIE1hbmFnZXMgYnkgYXV0b3BsYXlpbmcgYWNjb3JkaW5nIHRvIGRhdGEgcGFzc2VkIGJ5IF9jaGFuZ2VkU2V0dGluZ3NDYXJvdXNlbCQgT2JzYXJ2YWJsZVxyXG4gICAqIEBwYXJhbSBkYXRhIG9iamVjdCB3aXRoIGN1cnJlbnQgcG9zaXRpb24gb2YgY2Fyb3VzZWwgYW5kIHR5cGUgb2YgY2hhbmdlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfaGFuZGxlQ2hhbmdlT2JzZXJ2YWJsZShkYXRhKSB7XHJcbiAgICBpZiAoZGF0YS5wcm9wZXJ0eS5uYW1lID09PSAnc2V0dGluZ3MnKSB7XHJcbiAgICAgIGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hdXRvcGxheSkge1xyXG4gICAgICAgIHRoaXMucGxheSgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuc3RvcCgpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEucHJvcGVydHkubmFtZSA9PT0gJ3Bvc2l0aW9uJykge1xyXG4gICAgICAvL2NvbnNvbGUubG9nKCdwbGF5PycsIGUpO1xyXG4gICAgICBpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b3BsYXkpIHtcclxuICAgICAgICB0aGlzLl9zZXRBdXRvUGxheUludGVydmFsKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0YXJ0cyBwYXVzaW5nXHJcbiAgICovXHJcbiAgc3RhcnRQYXVzaW5nKCkge1xyXG4gICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9wbGF5SG92ZXJQYXVzZSAmJiB0aGlzLmNhcm91c2VsU2VydmljZS5pcygncm90YXRpbmcnKSkge1xyXG4gICAgICB0aGlzLnBhdXNlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdGFydHMgcGxheWluZyBhZnRlciBtb3VzZSBsZWF2ZXMgY2Fyb3VzZWxcclxuICAgKi9cclxuICBzdGFydFBsYXlpbmdNb3VzZUxlYXZlKCkge1xyXG4gICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9wbGF5SG92ZXJQYXVzZSAmJiB0aGlzLmNhcm91c2VsU2VydmljZS5pcygncm90YXRpbmcnKSkge1xyXG4gICAgICB0aGlzLnBhdXNlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdGFydHMgcGxheWluZyBhZnRlciB0b3VjaCBlbmRzXHJcbiAgICovXHJcbiAgc3RhcnRQbGF5aW5nVG91Y2hFbmQoKSB7XHJcbiAgICBpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b3BsYXlIb3ZlclBhdXNlICYmIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmlzKCdyb3RhdGluZycpKSB7XHJcbiAgICAgIHRoaXMucGF1c2UoKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgT25Jbml0LFxyXG4gIEFmdGVyQ29udGVudENoZWNrZWQsXHJcbiAgT25EZXN0cm95LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBEaXJlY3RpdmUsXHJcbiAgUXVlcnlMaXN0LFxyXG4gIENvbnRlbnRDaGlsZHJlbixcclxuICBUZW1wbGF0ZVJlZixcclxuICBFbGVtZW50UmVmLFxyXG4gIEluamVjdCxcclxuICBBZnRlckNvbnRlbnRJbml0LFxyXG4gIEV2ZW50RW1pdHRlclxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBPYnNlcnZhYmxlLCBtZXJnZSB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgUmVzaXplU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3Jlc2l6ZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgV0lORE9XIH0gZnJvbSAnLi4vc2VydmljZXMvd2luZG93LXJlZi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgdGFwLCBkZWxheSwgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBDYXJvdXNlbFNlcnZpY2UsIENhcm91c2VsQ3VycmVudERhdGEgfSBmcm9tICcuLi9zZXJ2aWNlcy9jYXJvdXNlbC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3RhZ2VEYXRhIH0gZnJvbSBcIi4uL21vZGVscy9zdGFnZS1kYXRhLm1vZGVsXCI7XHJcbmltcG9ydCB7IE93bERPTURhdGEgfSBmcm9tIFwiLi4vbW9kZWxzL293bERPTS1kYXRhLm1vZGVsXCI7XHJcbmltcG9ydCB7IFNsaWRlck1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL3NsaWRlci5tb2RlbCc7XHJcbmltcG9ydCB7IE93bE9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbHMvb3dsLW9wdGlvbnMubW9kZWwnO1xyXG5pbXBvcnQgeyBOYXZEYXRhLCBEb3RzRGF0YSB9IGZyb20gJy4uL21vZGVscy9uYXZpZ2F0aW9uLWRhdGEubW9kZWxzJztcclxuaW1wb3J0IHsgTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uYXZpZ2F0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBdXRvcGxheVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9hdXRvcGxheS5zZXJ2aWNlJztcclxuXHJcbmxldCBuZXh0SWQgPSAwO1xyXG5cclxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnbmctdGVtcGxhdGVbY2Fyb3VzZWxTbGlkZV0nIH0pXHJcbmV4cG9ydCBjbGFzcyBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlIHtcclxuICAvKipcclxuICAgKiBVbmlxdWUgc2xpZGUgaWRlbnRpZmllci4gTXVzdCBiZSB1bmlxdWUgZm9yIHRoZSBlbnRpcmUgZG9jdW1lbnQgZm9yIHByb3BlciBhY2Nlc3NpYmlsaXR5IHN1cHBvcnQuXHJcbiAgICogV2lsbCBiZSBhdXRvLWdlbmVyYXRlZCBpZiBub3QgcHJvdmlkZWQuXHJcbiAgICovXHJcbiAgQElucHV0KCkgaWQgPSBgb3dsLXNsaWRlLSR7bmV4dElkKyt9YDtcclxuXHJcbiAgLyoqXHJcbiAgICogRGVmaW5lcyBob3cgbXVjaCB3aWR0aHMgb2YgY29tbW9uIHNsaWRlIHdpbGwgY3VycmVudCBzbGlkZSBoYXZlXHJcbiAgICogZS5nLiBpZiBfbWVyZ2VEYXRhPTIsIHRoZSBzbGlkZSB3aWxsIHR3aWNlIHdpZGVyIHRoZW4gc2xpZGVzIHdpdGggX21lcmdlRGF0YT0xXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZGF0YU1lcmdlID0gMTtcclxuICBASW5wdXQoKVxyXG4gIHNldCBkYXRhTWVyZ2UoZGF0YTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLl9kYXRhTWVyZ2UgPSB0aGlzLmlzTnVtZXJpYyhkYXRhKSA/IGRhdGEgOiAxO1xyXG4gIH07XHJcbiAgZ2V0IGRhdGFNZXJnZSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fZGF0YU1lcmdlIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2lkdGggb2Ygc2xpZGVcclxuICAgKi9cclxuICBASW5wdXQoKSB3aWR0aCA9IDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIElubmVyIGNvbnRlbnQgb2YgZG90IGZvciBjZXJ0YWluIHNsaWRlOyBjYW4gYmUgaHRtbC1tYXJrdXBcclxuICAgKi9cclxuICBASW5wdXQoKSBkb3RDb250ZW50ID0gJyc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0cGxSZWY6IFRlbXBsYXRlUmVmPGFueT4pIHt9XHJcblxyXG4gIC8qKlxyXG5cdCAqIERldGVybWluZXMgaWYgdGhlIGlucHV0IGlzIGEgTnVtYmVyIG9yIHNvbWV0aGluZyB0aGF0IGNhbiBiZSBjb2VyY2VkIHRvIGEgTnVtYmVyXHJcblx0ICogQHBhcmFtIC0gVGhlIGlucHV0IHRvIGJlIHRlc3RlZFxyXG5cdCAqIEByZXR1cm5zIC0gQW4gaW5kaWNhdGlvbiBpZiB0aGUgaW5wdXQgaXMgYSBOdW1iZXIgb3IgY2FuIGJlIGNvZXJjZWQgdG8gYSBOdW1iZXJcclxuXHQgKi9cclxuICBpc051bWVyaWMobnVtYmVyOiBhbnkpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiAhaXNOYU4ocGFyc2VGbG9hdChudW1iZXIpKTtcclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEYXRhIHdoaWNoIHdpbGwgYmUgcGFzc2VkIG91dCBhZnRlciBlbmRpbmcgb2YgdHJhbnNpdGlvbiBvZiBjYXJvdXNlbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNsaWRlc091dHB1dERhdGEge1xyXG4gIHN0YXJ0UG9zaXRpb24/OiBudW1iZXI7XHJcbiAgc2xpZGVzPzogU2xpZGVyTW9kZWxbXTtcclxufTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnb3dsLWNhcm91c2VsLW8nLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2IGNsYXNzPVwib3dsLWNhcm91c2VsIG93bC10aGVtZVwiICNvd2xDYXJvdXNlbFxyXG4gICAgICBbbmdDbGFzc109XCJ7J293bC1ydGwnOiBvd2xET01EYXRhPy5ydGwsXHJcbiAgICAgICAgICAgICAgICAgICdvd2wtbG9hZGVkJzogb3dsRE9NRGF0YT8uaXNMb2FkZWQsXHJcbiAgICAgICAgICAgICAgICAgICdvd2wtcmVzcG9uc2l2ZSc6IG93bERPTURhdGE/LmlzUmVzcG9uc2l2ZSxcclxuICAgICAgICAgICAgICAgICAgJ293bC1kcmFnJzogb3dsRE9NRGF0YT8uaXNNb3VzZURyYWdhYmxlLFxyXG4gICAgICAgICAgICAgICAgICAnb3dsLWdyYWInOiBvd2xET01EYXRhPy5pc0dyYWJ9XCJcclxuICAgICAgKG1vdXNlb3Zlcik9XCJzdGFydFBhdXNpbmcoKVwiXHJcbiAgICAgIChtb3VzZWxlYXZlKT1cInN0YXJ0UGxheU1MKClcIlxyXG4gICAgICAodG91Y2hzdGFydCk9XCJzdGFydFBhdXNpbmcoKVwiXHJcbiAgICAgICh0b3VjaGVuZCk9XCJzdGFydFBsYXlURSgpXCI+XHJcblxyXG4gICAgICA8ZGl2ICpuZ0lmPVwiY2Fyb3VzZWxMb2FkZWRcIiBjbGFzcz1cIm93bC1zdGFnZS1vdXRlclwiPlxyXG4gICAgICAgIDxvd2wtc3RhZ2UgW293bERyYWdnYWJsZV09XCJ7J2lzTW91c2VEcmFnYWJsZSc6IG93bERPTURhdGE/LmlzTW91c2VEcmFnYWJsZSwgJ2lzVG91Y2hEcmFnYWJsZSc6IG93bERPTURhdGE/LmlzVG91Y2hEcmFnYWJsZX1cIlxyXG4gICAgICAgICAgICAgICAgICAgIFtzdGFnZURhdGFdPVwic3RhZ2VEYXRhXCJcclxuICAgICAgICAgICAgICAgICAgICBbc2xpZGVzRGF0YV09XCJzbGlkZXNEYXRhXCI+PC9vd2wtc3RhZ2U+XHJcbiAgICAgIDwvZGl2PiA8IS0tIC8ub3dsLXN0YWdlLW91dGVyIC0tPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwib3dsLW5hdlwiIFtuZ0NsYXNzXT1cInsnZGlzYWJsZWQnOiBuYXZEYXRhPy5kaXNhYmxlZH1cIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwib3dsLXByZXZcIiBbbmdDbGFzc109XCJ7J2Rpc2FibGVkJzogbmF2RGF0YT8ucHJldj8uZGlzYWJsZWR9XCIgKGNsaWNrKT1cInByZXYoKVwiIFtpbm5lckhUTUxdPVwibmF2RGF0YT8ucHJldj8uaHRtbFRleHRcIj48L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwib3dsLW5leHRcIiBbbmdDbGFzc109XCJ7J2Rpc2FibGVkJzogbmF2RGF0YT8ubmV4dD8uZGlzYWJsZWR9XCIgKGNsaWNrKT1cIm5leHQoKVwiIFtpbm5lckhUTUxdPVwibmF2RGF0YT8ubmV4dD8uaHRtbFRleHRcIj48L2Rpdj5cclxuICAgICAgPC9kaXY+IDwhLS0gLy5vd2wtbmF2IC0tPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwib3dsLWRvdHNcIiBbbmdDbGFzc109XCJ7J2Rpc2FibGVkJzogZG90c0RhdGE/LmRpc2FibGVkfVwiPlxyXG4gICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGRvdCBvZiBkb3RzRGF0YT8uZG90c1wiIGNsYXNzPVwib3dsLWRvdFwiIFtuZ0NsYXNzXT1cInsnYWN0aXZlJzogZG90LmFjdGl2ZSwgJ293bC1kb3QtdGV4dCc6IGRvdC5zaG93SW5uZXJDb250ZW50fVwiIChjbGljayk9XCJtb3ZlQnlEb3QoZG90LmlkKVwiPlxyXG4gICAgICAgICAgPHNwYW4gW2lubmVySFRNTF09XCJkb3QuaW5uZXJDb250ZW50XCI+PC9zcGFuPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj4gPCEtLSAvLm93bC1kb3RzIC0tPlxyXG4gICAgPC9kaXY+IDwhLS0gLy5vd2wtY2Fyb3VzZWwgb3dsLWxvYWRlZCAtLT5cclxuICBgLFxyXG4gIHN0eWxlczogW2Aub3dsLXRoZW1lIHsgZGlzcGxheTogYmxvY2s7IH1gXSxcclxuICBwcm92aWRlcnM6IFsgTmF2aWdhdGlvblNlcnZpY2UsIEF1dG9wbGF5U2VydmljZSwgQ2Fyb3VzZWxTZXJ2aWNlIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIENhcm91c2VsQ29tcG9uZW50XHJcbiAgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudENoZWNrZWQsIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XHJcbiAgQENvbnRlbnRDaGlsZHJlbihDYXJvdXNlbFNsaWRlRGlyZWN0aXZlKVxyXG4gIHNsaWRlczogUXVlcnlMaXN0PENhcm91c2VsU2xpZGVEaXJlY3RpdmU+O1xyXG5cclxuICBAT3V0cHV0KCkgdHJhbnNsYXRlZCA9IG5ldyBFdmVudEVtaXR0ZXI8U2xpZGVzT3V0cHV0RGF0YT4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogV2lkdGggb2YgY2Fyb3VzZWwgd2luZG93ICh0YWcgd2l0aCBjbGFzcyAub3dsLWNhcm91c2VsKSwgaW4gd2ljaCB3ZSBjYW4gc2VlIG1vdmluZyBzbGlkZXJzXHJcbiAgICovXHJcbiAgY2Fyb3VzZWxXaW5kb3dXaWR0aDogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gdG8gJ3Jlc2l6ZScgZXZlbnRcclxuICAgKi9cclxuICByZXNpemVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaXB0aW9uIG1lcmdlIE9ic2VydmFibGUsIHdoaWNoIG1lcmdlcyBhbGwgT2JzZXJ2YWJsZXMgaW4gdGhlIGNvbXBvbmVudCBleGNlcHQgJ3Jlc2l6ZScgT2JzZXJ2YWJsZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2FsbE9ic2VydlN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBDdXJyZW50IHNldHRpbmdzIGZvciB0aGUgY2Fyb3VzZWwuXHJcbiAgICovXHJcbiAgb3dsRE9NRGF0YTogT3dsRE9NRGF0YTtcclxuXHJcbiAgLyoqXHJcbiAgICogRGF0YSBvZiBvd2wtc3RhZ2VcclxuICAgKi9cclxuXHRzdGFnZURhdGE6IFN0YWdlRGF0YTtcclxuXHJcblx0LyoqXHJcblx0ICogIERhdGEgb2YgZXZlcnkgc2xpZGVcclxuXHQgKi9cclxuICBzbGlkZXNEYXRhOiBTbGlkZXJNb2RlbFtdO1xyXG5cclxuICAvKipcclxuXHQgKiBEYXRhIG9mIG5hdmlnYXRpb24gYmxvY2tcclxuXHQgKi9cclxuXHRuYXZEYXRhOiBOYXZEYXRhO1xyXG5cclxuXHQvKipcclxuXHQgKiBEYXRhIG9mIGRvdHMgYmxvY2tcclxuXHQgKi9cclxuICBkb3RzRGF0YTogRG90c0RhdGE7XHJcblxyXG4gIC8qKlxyXG4gICAqIERhdGEsIHdpY2ggYXJlIHBhc3NlZCBvdXQgb2YgY2Fyb3VzZWwgYWZ0ZXIgZW5kaW5nIG9mIHRyYW5zaW9uaW5nIG9mIGNhcm91c2VsXHJcbiAgICovXHJcbiAgc2xpZGVzT3V0cHV0RGF0YTogU2xpZGVzT3V0cHV0RGF0YTtcclxuXHJcbiAgLyoqXHJcbiAgICogU2hvd3Mgd2hldGhlciBjYXJvdXNlbCBpcyBsb2FkZWQgb2Ygbm90LlxyXG4gICAqL1xyXG4gIGNhcm91c2VsTG9hZGVkID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZXIncyBvcHRpb25zXHJcbiAgICovXHJcbiAgQElucHV0KCkgb3B0aW9uczogT3dsT3B0aW9ucztcclxuXHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2YWJsZSBmb3IgZ2V0dGluZyBjdXJyZW50IFZpZXcgU2V0dGluZ3NcclxuICAgKi9cclxuICBwcml2YXRlIF92aWV3Q3VyU2V0dGluZ3MkOiBPYnNlcnZhYmxlPENhcm91c2VsQ3VycmVudERhdGE+O1xyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZhYmxlIGZvciBjYXRjaGluZyB0aGUgZW5kIG9mIHRyYW5zaXRpb24gb2YgY2Fyb3VzZWxcclxuICAgKi9cclxuICBwcml2YXRlIF90cmFuc2xhdGVkQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz47XHJcblxyXG4gIC8qKlxyXG4gICAqIE9ic2VydmFibGUgZm9yIG1lcmdpbmcgYWxsIE9ic2VydmFibGVzIGFuZCBjcmVhdGluZyBvbmUgc3Vic2NyaXB0aW9uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfY2Fyb3VzZWxNZXJnZSQ6IE9ic2VydmFibGU8Q2Fyb3VzZWxDdXJyZW50RGF0YSB8IHN0cmluZz47XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcclxuICAgIHByaXZhdGUgcmVzaXplU2VydmljZTogUmVzaXplU2VydmljZSxcclxuICAgIHByaXZhdGUgY2Fyb3VzZWxTZXJ2aWNlOiBDYXJvdXNlbFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIG5hdmlnYXRpb25TZXJ2aWNlOiBOYXZpZ2F0aW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgYXV0b3BsYXlTZXJ2aWNlOiBBdXRvcGxheVNlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5zcHlEYXRhU3RyZWFtcygpO1xyXG5cclxuICAgIHRoaXMuY2Fyb3VzZWxXaW5kb3dXaWR0aCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICAnLm93bC1jYXJvdXNlbCdcclxuICAgICkuY2xpZW50V2lkdGg7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XHJcbiAgfVxyXG4gIC8vIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIEVORFxyXG5cclxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR1cCh0aGlzLmNhcm91c2VsV2luZG93V2lkdGgsIHRoaXMuc2xpZGVzLnRvQXJyYXkoKSwgdGhpcy5vcHRpb25zKTtcclxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmluaXRpYWxpemUodGhpcy5zbGlkZXMudG9BcnJheSgpKTtcclxuXHJcbiAgICB0aGlzLl93aW5SZXNpemVXYXRjaGVyKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIGlmICh0aGlzLnJlc2l6ZVN1YnNjcmlwdGlvbikge1xyXG4gICAgICB0aGlzLnJlc2l6ZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2FsbE9ic2VydlN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSm9pbnMgdGhlIG9ic2VydmFibGUgbG9naW4gaW4gb25lIHBsYWNlOiBzZXRzIHZhbHVlcyB0byBzb21lIG9ic2VydmFibGVzLCBtZXJnZXMgdGhpcyBvYnNlcnZhYmxlcyBhbmRcclxuICAgKiBzdWJjcmliZXMgdG8gbWVyZ2UgZnVuY1xyXG4gICAqL1xyXG4gIHNweURhdGFTdHJlYW1zKCkge1xyXG4gICAgdGhpcy5fdmlld0N1clNldHRpbmdzJCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldFZpZXdDdXJTZXR0aW5ncygpLnBpcGUoXHJcbiAgICAgIHRhcChkYXRhID0+IHtcclxuICAgICAgICB0aGlzLm93bERPTURhdGEgPSBkYXRhLm93bERPTURhdGE7XHJcbiAgICAgICAgdGhpcy5zdGFnZURhdGEgPSBkYXRhLnN0YWdlRGF0YTtcclxuICAgICAgICB0aGlzLnNsaWRlc0RhdGEgPSBkYXRhLnNsaWRlc0RhdGE7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNhcm91c2VsTG9hZGVkKSB7XHJcbiAgICAgICAgICB0aGlzLmNhcm91c2VsTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5uYXZEYXRhID0gZGF0YS5uYXZEYXRhO1xyXG4gICAgICAgIHRoaXMuZG90c0RhdGEgPSBkYXRhLmRvdHNEYXRhO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLl90cmFuc2xhdGVkQ2Fyb3VzZWwkID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0VHJhbnNsYXRlZFN0YXRlKCkucGlwZShcclxuICAgICAgdGFwKCgpID0+IHtcclxuICAgICAgICB0aGlzLmdhdGhlclRyYW5zbGF0ZWREYXRhKCk7XHJcbiAgICAgICAgdGhpcy50cmFuc2xhdGVkLmVtaXQodGhpcy5zbGlkZXNPdXRwdXREYXRhKTtcclxuICAgICAgICB0aGlzLnNsaWRlc091dHB1dERhdGEgPSB7fTtcclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5fY2Fyb3VzZWxNZXJnZSQgPSBtZXJnZSh0aGlzLl92aWV3Q3VyU2V0dGluZ3MkLCB0aGlzLl90cmFuc2xhdGVkQ2Fyb3VzZWwkKTtcclxuICAgIHRoaXMuX2FsbE9ic2VydlN1YnNjcmlwdGlvbiA9IHRoaXMuX2Nhcm91c2VsTWVyZ2UkLnN1YnNjcmliZSgoKSA9PiB7fSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbml0IHN1YnNjcmlwdGlvbiB0byByZXNpemUgZXZlbnQgYW5kIGF0dGFjaGVzIGhhbmRsZXIgZm9yIHRoaXMgZXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIF93aW5SZXNpemVXYXRjaGVyKCkge1xyXG4gICAgaWYgKE9iamVjdC5rZXlzKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLl9vcHRpb25zLnJlc3BvbnNpdmUpLmxlbmd0aCkge1xyXG4gICAgICB0aGlzLnJlc2l6ZVN1YnNjcmlwdGlvbiA9IHRoaXMucmVzaXplU2VydmljZS5vblJlc2l6ZSRcclxuICAgICAgICAucGlwZShcclxuICAgICAgICAgIGZpbHRlcigoKSA9PiB0aGlzLmNhcm91c2VsV2luZG93V2lkdGggIT09IHRoaXMuZWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcub3dsLWNhcm91c2VsJykuY2xpZW50V2lkdGgpLFxyXG4gICAgICAgICAgZGVsYXkodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MucmVzcG9uc2l2ZVJlZnJlc2hSYXRlKVxyXG4gICAgICAgIClcclxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm9uUmVzaXplKHRoaXMuZWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcub3dsLWNhcm91c2VsJykuY2xpZW50V2lkdGgpO1xyXG4gICAgICAgICAgdGhpcy5jYXJvdXNlbFdpbmRvd1dpZHRoID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vd2wtY2Fyb3VzZWwnKS5jbGllbnRXaWR0aDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhbmRsZXIgZm9yIHRyYW5zaXRpb2VuZCBldmVudFxyXG4gICAqL1xyXG4gIG9uVHJhbnNpdGlvbkVuZCgpIHtcclxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm9uVHJhbnNpdGlvbkVuZCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlciBmb3IgY2xpY2sgZXZlbnQsIGF0dGFjaGVkIHRvIG5leHQgYnV0dG9uXHJcbiAgICovXHJcbiAgbmV4dCgpIHtcclxuICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UubmV4dCh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5uYXZTcGVlZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGVyIGZvciBjbGljayBldmVudCwgYXR0YWNoZWQgdG8gcHJldiBidXR0b25cclxuICAgKi9cclxuICBwcmV2KCkge1xyXG4gICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5wcmV2KHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLm5hdlNwZWVkKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhbmRsZXIgZm9yIGNsaWNrIGV2ZW50LCBhdHRhY2hlZCB0byBkb3RzXHJcbiAgICovXHJcbiAgbW92ZUJ5RG90KGRvdElkOiBzdHJpbmcpIHtcclxuICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UubW92ZUJ5RG90KGRvdElkKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdhdGhlcnMgYW5kIHByZXBhcmVzIGRhdGEgaW50ZW5kZWQgZm9yIHBhc3NpbmcgdG8gdGhlIHVzZXIgYnkgbWVhbnMgb2YgZmlyaW5nIGV2ZW50IHRyYW5zbGF0ZWRDYXJvdXNlbFxyXG4gICAqL1xyXG4gIGdhdGhlclRyYW5zbGF0ZWREYXRhKCkge1xyXG4gICAgbGV0IHN0YXJ0UG9zaXRpb246IG51bWJlcjtcclxuICAgIGNvbnN0IGFjdGl2ZVNsaWRlczogU2xpZGVyTW9kZWxbXSA9IHRoaXMuc2xpZGVzRGF0YVxyXG4gICAgICAuZmlsdGVyKHNsaWRlID0+IHNsaWRlLmFjdGl2ZSA9PT0gdHJ1ZSlcclxuICAgICAgLm1hcChzbGlkZSA9PiB7XHJcbiAgICAgICAgY29uc3QgaWQgPSBzbGlkZS5pZC5pbmRleE9mKCdjbG9uZWQtJykgPj0gMCA/IHNsaWRlLmlkLnNsaWNlKDcpIDogc2xpZGUuaWQ7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIGlkOiBpZCxcclxuICAgICAgICAgIHdpZHRoOiBzbGlkZS53aWR0aCxcclxuICAgICAgICAgIG1hcmdpbkw6IHNsaWRlLm1hcmdpbkwsXHJcbiAgICAgICAgICBtYXJnaW5SOiBzbGlkZS5tYXJnaW5SLFxyXG4gICAgICAgICAgY2VudGVyOiBzbGlkZS5jZW50ZXJcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgc3RhcnRQb3NpdGlvbiA9IHRoaXMuc2xpZGVzLnRvQXJyYXkoKS5maW5kSW5kZXgoc2xpZGUgPT4gc2xpZGUuaWQgPT09IGFjdGl2ZVNsaWRlc1swXS5pZCk7XHJcbiAgICB0aGlzLnNsaWRlc091dHB1dERhdGEgPSB7XHJcbiAgICAgIHN0YXJ0UG9zaXRpb246IHN0YXJ0UG9zaXRpb24sXHJcbiAgICAgIHNsaWRlczogYWN0aXZlU2xpZGVzXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdGFydHMgcGF1c2luZ1xyXG4gICAqL1xyXG4gIHN0YXJ0UGF1c2luZygpIHtcclxuICAgIHRoaXMuYXV0b3BsYXlTZXJ2aWNlLnN0YXJ0UGF1c2luZygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnRzIHBsYXlpbmcgYWZ0ZXIgbW91c2UgbGVhdmVzIGNhcm91c2VsXHJcbiAgICovXHJcbiAgc3RhcnRQbGF5TUwoKSB7XHJcbiAgICB0aGlzLmF1dG9wbGF5U2VydmljZS5zdGFydFBsYXlpbmdNb3VzZUxlYXZlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdGFydHMgcGxheWluZyBhZnRlciB0b3VjaCBlbmRzXHJcbiAgICovXHJcbiAgc3RhcnRQbGF5VEUoKSB7XHJcbiAgICB0aGlzLmF1dG9wbGF5U2VydmljZS5zdGFydFBsYXlpbmdUb3VjaEVuZCgpO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBOZ1pvbmUsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgUmVuZGVyZXIyLCBPbkluaXQsIE9uRGVzdHJveSwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ2Fyb3VzZWxTZXJ2aWNlLCBDb29yZHMgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jYXJvdXNlbC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGZpcnN0IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBTdGFnZURhdGEgfSBmcm9tICcuLi8uLi9tb2RlbHMvc3RhZ2UtZGF0YS5tb2RlbCc7XHJcbmltcG9ydCB7IFNsaWRlck1vZGVsIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3NsaWRlci5tb2RlbCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ293bC1zdGFnZScsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJvd2wtc3RhZ2VcIiBbbmdTdHlsZV09XCJ7J3dpZHRoJzogc3RhZ2VEYXRhLndpZHRoICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0cmFuc2Zvcm0nOiBzdGFnZURhdGEudHJhbnNmb3JtLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3RyYW5zaXRpb24nOiBzdGFnZURhdGEudHJhbnNpdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdwYWRkaW5nLWxlZnQnOiBzdGFnZURhdGEucGFkZGluZ0wgKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3BhZGRpbmctcmlnaHQnOiBzdGFnZURhdGEucGFkZGluZ1IgKyAncHgnIH1cIlxyXG4gICAgICAgICAgKHRyYW5zaXRpb25lbmQpPVwib25UcmFuc2l0aW9uRW5kKClcIj5cclxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBzbGlkZSBvZiBzbGlkZXNEYXRhOyBsZXQgaSA9IGluZGV4XCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwib3dsLWl0ZW1cIiBbbmdDbGFzc109XCJ7J2FjdGl2ZSc6IHNsaWRlLmFjdGl2ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2NlbnRlcic6IHNsaWRlLmNlbnRlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnY2xvbmVkJzogc2xpZGUuY2xvbmVkfVwiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cInsnd2lkdGgnOiBzbGlkZS53aWR0aCArICdweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ21hcmdpbi1sZWZ0Jzogc2xpZGUubWFyZ2luTCArICdweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ21hcmdpbi1yaWdodCc6IHNsaWRlLm1hcmdpblIgKyAncHgnfVwiPlxyXG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwic2xpZGUudHBsUmVmXCI+PC9uZy10ZW1wbGF0ZT5cclxuICAgICAgICAgIDwvZGl2PjwhLS0gLy5vd2wtaXRlbSAtLT5cclxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgPC9kaXY+PCEtLSAvLm93bC1zdGFnZSAtLT5cclxuICAgIDwvZGl2PlxyXG4gIGBcclxufSlcclxuZXhwb3J0IGNsYXNzIFN0YWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIC8qKlxyXG4gICAqIE9iamVjdCB3aXRoIHNldHRpbmdzIHdoaWNoIG1ha2UgY2Fyb3VzZWwgZHJhZ2dhYmxlIGJ5IHRvdWNoIG9yIG1vdXNlXHJcbiAgICovXHJcbiAgQElucHV0KCkgb3dsRHJhZ2dhYmxlOiB7XHJcbiAgICBpc01vdXNlRHJhZ2FibGU6IGJvb2xlYW4sXHJcbiAgICBpc1RvdWNoRHJhZ2FibGU6IGJvb2xlYW5cclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBEYXRhIG9mIG93bC1zdGFnZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHN0YWdlRGF0YTogU3RhZ2VEYXRhO1xyXG5cclxuXHQvKipcclxuXHQgKiAgRGF0YSBvZiBldmVyeSBzbGlkZVxyXG5cdCAqL1xyXG4gIEBJbnB1dCgpIHNsaWRlc0RhdGE6IFNsaWRlck1vZGVsW107XHJcblxyXG4gIC8qKlxyXG4gICAqIEZ1bmN0aW9uIHdpY2ggd2lsbCBiZSByZXR1cm5lZCBhZnRlciBhdHRhY2hpbmcgbGlzdGVuZXIgdG8gJ21vdXNlbW92ZScgZXZlbnRcclxuICAgKi9cclxuICBsaXN0ZW5lck1vdXNlTW92ZTogKCkgPT4gdm9pZDtcclxuICAvKipcclxuICAgKiBGdW5jdGlvbiB3aWNoIHdpbGwgYmUgcmV0dXJuZWQgYWZ0ZXIgYXR0YWNoaW5nIGxpc3RlbmVyIHRvICd0b3VjaG1vdmUnIGV2ZW50XHJcbiAgICovXHJcbiAgbGlzdGVuZXJUb3VjaE1vdmU6ICgpID0+IHZvaWQ7XHJcbiAgLyoqXHJcbiAgICogRnVuY3Rpb24gd2ljaCB3aWxsIGJlIHJldHVybmVkIGFmdGVyIGF0dGFjaGluZyBsaXN0ZW5lciB0byAnbW91c2Vtb3ZlJyBldmVudFxyXG4gICAqL1xyXG4gIGxpc3RlbmVyT25lTW91c2VNb3ZlOiAoKSA9PiB2b2lkO1xyXG4gIC8qKlxyXG4gICAqIEZ1bmN0aW9uIHdpY2ggd2lsbCBiZSByZXR1cm5lZCBhZnRlciBhdHRhY2hpbmcgbGlzdGVuZXIgdG8gJ3RvdWNobW92ZScgZXZlbnRcclxuICAgKi9cclxuICBsaXN0ZW5lck9uZVRvdWNoTW92ZTogKCkgPT4gdm9pZDtcclxuXHJcbiAgLyoqXHJcbiAgICogRnVuY3Rpb24gd2ljaCB3aWxsIGJlIHJldHVybmVkIGFmdGVyIGF0dGFjaGluZyBsaXN0ZW5lciB0byAnbW91c2V1cCcgZXZlbnRcclxuICAgKi9cclxuICBsaXN0ZW5lck1vdXNlVXA6ICgpID0+IHZvaWQ7XHJcbiAgLyoqXHJcbiAgICogRnVuY3Rpb24gd2ljaCB3aWxsIGJlIHJldHVybmVkIGFmdGVyIGF0dGFjaGluZyBsaXN0ZW5lciB0byAndG91Y2hlbmQnIGV2ZW50XHJcbiAgICovXHJcbiAgbGlzdGVuZXJUb3VjaEVuZDogKCkgPT4gdm9pZDtcclxuXHJcbiAgLyoqXHJcbiAgICogRnVuY3Rpb24gd2ljaCB3aWxsIGJlIHJldHVybmVkIGFmdGVyIGF0dGFjaGluZyBsaXN0ZW5lciB0byAnY2xpY2snIGV2ZW50XHJcbiAgICovXHJcbiAgbGlzdGVuZXJPbmVDbGljazogKCkgPT4gdm9pZDtcclxuXHJcbiAgLyoqXHJcbiAgICogT2JqZWN0IHdpdGggZGF0YSBuZWVkZWQgZm9yIGRyYWdnaW5nXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZHJhZzogYW55ID0ge1xyXG4gICAgdGltZTogbnVsbCxcclxuICAgIHRhcmdldDogbnVsbCxcclxuICAgIHBvaW50ZXI6IG51bGwsXHJcbiAgICBzdGFnZToge1xyXG4gICAgICBzdGFydDogbnVsbCxcclxuICAgICAgY3VycmVudDogbnVsbFxyXG4gICAgfSxcclxuICAgIGRpcmVjdGlvbjogbnVsbCxcclxuICAgIGFjdGl2ZTogZmFsc2UsXHJcbiAgICBtb3Zpbmc6IGZhbHNlXHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uIHdoZW4gdGhlIGNhcm91c2VsJ3MgcmVidWlsZGluZyBjYXVzZWQgYnkgcmVzaXplIGV2ZW50IHN0YXJ0c1xyXG4gICAqL1xyXG4gIHByaXZhdGUgX29uZURyYWdNb3ZlJCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2N0aXB0aW9uIHRvIF9vbmVEcmFnTW92ZSQgU3ViamVjdFxyXG4gICAqL1xyXG4gIHByaXZhdGUgX29uZU1vdmVTdWJzcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHpvbmU6IE5nWm9uZSxcclxuICAgICAgICAgICAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICAgICAgICAgICAgICBwcml2YXRlIGNhcm91c2VsU2VydmljZTogQ2Fyb3VzZWxTZXJ2aWNlKSB7IH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignbW91c2Vkb3duJywgWyckZXZlbnQnXSkgb25Nb3VzZURvd24oZXZlbnQpIHtcclxuICAgIGlmICh0aGlzLm93bERyYWdnYWJsZS5pc01vdXNlRHJhZ2FibGUpIHtcclxuICAgICAgdGhpcy5fb25EcmFnU3RhcnQoZXZlbnQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcigndG91Y2hzdGFydCcsIFsnJGV2ZW50J10pIG9uVG91Y2hTdGFydChldmVudCkge1xyXG4gICAgaWYgKHRoaXMub3dsRHJhZ2dhYmxlLmlzVG91Y2hEcmFnYWJsZSkge1xyXG4gICAgICB0aGlzLl9vbkRyYWdTdGFydChldmVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIFsnJGV2ZW50J10pIG9uVG91Y2hDYW5jZWwoZXZlbnQpIHtcclxuICAgIHRoaXMuX29uRHJhZ0VuZChldmVudCk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdkcmFnc3RhcnQnKSBvbkRyYWdTdGFydCgpIHtcclxuICAgIGlmICh0aGlzLm93bERyYWdnYWJsZS5pc01vdXNlRHJhZ2FibGUpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignc2VsZWN0c3RhcnQnKSBvblNlbGVjdFN0YXJ0KCkge1xyXG4gICAgaWYgKHRoaXMub3dsRHJhZ2dhYmxlLmlzTW91c2VEcmFnYWJsZSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuX29uZU1vdmVTdWJzcmlwdGlvbiA9IHRoaXMuX29uZURyYWdNb3ZlJFxyXG4gICAgICAucGlwZShmaXJzdCgpKVxyXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICB0aGlzLl9zZW5kQ2hhbmdlcygpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5fb25lTW92ZVN1YnNyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQYXNzZXMgdGhpcyB0byBfb25lTW91c2VUb3VjaE1vdmUoKTtcclxuICAgKi9cclxuICBiaW5kT25lTW91c2VUb3VjaE1vdmUgPSAoZXYpID0+IHtcclxuICAgIHRoaXMuX29uZU1vdXNlVG91Y2hNb3ZlKGV2KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFBhc3NlcyB0aGlzIHRvIF9vbkRyYWdNb3ZlKCk7XHJcbiAgICovXHJcbiAgYmluZE9uRHJhZ01vdmUgPSAoZXYpID0+IHtcclxuICAgIHRoaXMuX29uRHJhZ01vdmUoZXYpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUGFzc2VzIHRoaXMgdG8gX29uRHJhZ01vdmUoKTtcclxuICAgKi9cclxuICBiaW5kT25EcmFnRW5kID0gKGV2KSA9PiB7XHJcbiAgICAvLyB0aGlzLnpvbmUucnVuKCgpID0+IHtcclxuICAgICAgdGhpcy5fb25EcmFnRW5kKGV2KTtcclxuICAgIC8vIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcblx0ICogSGFuZGxlcyBgdG91Y2hzdGFydGAgYW5kIGBtb3VzZWRvd25gIGV2ZW50cy5cclxuXHQgKiBAdG9kbyBIb3Jpem9udGFsIHN3aXBlIHRocmVzaG9sZCBhcyBvcHRpb25cclxuXHQgKiBAdG9kbyAjMjYxXHJcblx0ICogQHBhcmFtIGV2ZW50IC0gVGhlIGV2ZW50IGFyZ3VtZW50cy5cclxuXHQgKi9cclxuXHRwcml2YXRlIF9vbkRyYWdTdGFydChldmVudCk6IGFueSB7XHJcblx0XHRsZXQgc3RhZ2U6IENvb3JkcyA9IG51bGw7XHJcblxyXG5cdFx0aWYgKGV2ZW50LndoaWNoID09PSAzKSB7XHJcblx0XHRcdHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBzdGFnZSA9IHRoaXMuX3ByZXBhcmVEcmFnZ2luZyhldmVudCk7XHJcblxyXG5cdFx0dGhpcy5fZHJhZy50aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcblx0XHR0aGlzLl9kcmFnLnRhcmdldCA9IGV2ZW50LnRhcmdldDtcclxuXHRcdHRoaXMuX2RyYWcuc3RhZ2Uuc3RhcnQgPSBzdGFnZTtcclxuXHRcdHRoaXMuX2RyYWcuc3RhZ2UuY3VycmVudCA9IHN0YWdlO1xyXG4gICAgdGhpcy5fZHJhZy5wb2ludGVyID0gdGhpcy5fcG9pbnRlcihldmVudCk7XHJcbiAgICB0aGlzLl9kcmFnLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5saXN0ZW5lck1vdXNlVXAgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbihkb2N1bWVudCwgJ21vdXNldXAnLCB0aGlzLmJpbmRPbkRyYWdFbmQpO1xyXG4gICAgdGhpcy5saXN0ZW5lclRvdWNoRW5kID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oZG9jdW1lbnQsICd0b3VjaGVuZCcsIHRoaXMuYmluZE9uRHJhZ0VuZCk7XHJcblxyXG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgdGhpcy5saXN0ZW5lck9uZU1vdXNlTW92ZSA9IHRoaXMucmVuZGVyZXIubGlzdGVuKGRvY3VtZW50LCAnbW91c2Vtb3ZlJywgdGhpcy5iaW5kT25lTW91c2VUb3VjaE1vdmUpO1xyXG4gICAgICB0aGlzLmxpc3RlbmVyT25lVG91Y2hNb3ZlID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oZG9jdW1lbnQsICd0b3VjaG1vdmUnLCB0aGlzLmJpbmRPbmVNb3VzZVRvdWNoTW92ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBdHRhY2hlcyBsaXN0ZW5lcnMgdG8gYHRvdWNobW92ZWAgYW5kIGBtb3VzZW1vdmVgIGV2ZW50czsgaW5pdGlhdGVzIHVwZGF0aW5nIGNhcm91c2VsIGFmdGVyIHN0YXJ0aW5nIGRyYWdnaW5nXHJcbiAgICogQHBhcmFtIGV2ZW50IGV2ZW50IG9iamVjaCBvZiBtb3VzZSBvciB0b3VjaCBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgX29uZU1vdXNlVG91Y2hNb3ZlKGV2ZW50KSB7XHJcbiAgICBpZiAoIXRoaXMuX2RyYWcuYWN0aXZlKSByZXR1cm4gZmFsc2U7XHJcbiAgICBjb25zdCBkZWx0YSA9IHRoaXMuX2RpZmZlcmVuY2UodGhpcy5fZHJhZy5wb2ludGVyLCB0aGlzLl9wb2ludGVyKGV2ZW50KSk7XHJcblxyXG4gICAgdGhpcy5saXN0ZW5lck9uZU1vdXNlTW92ZSgpO1xyXG4gICAgdGhpcy5saXN0ZW5lck9uZVRvdWNoTW92ZSgpO1xyXG5cclxuICAgIGlmIChNYXRoLmFicyhkZWx0YS54KSA8IE1hdGguYWJzKGRlbHRhLnkpICYmIHRoaXMuX2lzKCd2YWxpZCcpKSB7XHJcbiAgICAgIHRoaXMuX2RyYWcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuX2RyYWcubW92aW5nID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLmxpc3RlbmVyTW91c2VNb3ZlID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oZG9jdW1lbnQsICdtb3VzZW1vdmUnLCB0aGlzLmJpbmRPbkRyYWdNb3ZlKTtcclxuICAgIHRoaXMubGlzdGVuZXJUb3VjaE1vdmUgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbihkb2N1bWVudCwgJ3RvdWNobW92ZScsIHRoaXMuYmluZE9uRHJhZ01vdmUpO1xyXG5cclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgdGhpcy5fZW50ZXIoJ2RyYWdnaW5nJyk7XHJcbiAgICAvLyB0aGlzLmNhcm91c2VsU2VydmljZS5fdHJpZ2dlcignZHJhZycpO1xyXG4gICAgdGhpcy5fb25lRHJhZ01vdmUkLm5leHQoZXZlbnQpO1xyXG4gICAgLy8gdGhpcy5fc2VuZENoYW5nZXMoKTtcclxuICB9XHJcblxyXG4gIFx0LyoqXHJcblx0ICogSGFuZGxlcyB0aGUgYHRvdWNobW92ZWAgYW5kIGBtb3VzZW1vdmVgIGV2ZW50cy5cclxuXHQgKiBAdG9kbyAjMjYxXHJcblx0ICogQHBhcmFtIGV2ZW50IC0gVGhlIGV2ZW50IGFyZ3VtZW50cy5cclxuXHQgKi9cclxuXHRwcml2YXRlIF9vbkRyYWdNb3ZlKGV2ZW50KSB7XHJcbiAgICBpZiAoIXRoaXMuX2RyYWcuYWN0aXZlKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgbGV0IHN0YWdlOiBDb29yZHM7XHJcbiAgICBjb25zdCBzdGFnZU9yRXhpdDogYm9vbGVhbiB8IENvb3JkcyA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmRlZmluZU5ld0Nvb3Jkc0RyYWcoZXZlbnQsIHRoaXMuX2RyYWcpO1xyXG5cclxuICAgIGlmIChzdGFnZU9yRXhpdCA9PT0gZmFsc2UpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgc3RhZ2UgPSBzdGFnZU9yRXhpdCBhcyBDb29yZHM7XHJcblxyXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICB0aGlzLl9kcmFnLnN0YWdlLmN1cnJlbnQgPSBzdGFnZTtcclxuXHRcdHRoaXMuX2FuaW1hdGUoc3RhZ2UueCAtIHRoaXMuX2RyYWcuc3RhZ2Uuc3RhcnQueCk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogTW92ZXMgLm93bC1zdGFnZSBsZWZ0LXJpZ2h0XHJcbiAgICogQHBhcmFtIGNvb3JkaW5hdGUgY29vcmRpbmF0ZSB0byBiZSBzZXQgdG8gLm93bC1zdGFnZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2FuaW1hdGUoY29vcmRpbmF0ZTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXSwgJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGUzZCgke2Nvb3JkaW5hdGV9cHgsMHB4LDBweGApO1xyXG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0sICd0cmFuc2l0aW9uJywgJzBzJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuXHQgKiBIYW5kbGVzIHRoZSBgdG91Y2hlbmRgIGFuZCBgbW91c2V1cGAgZXZlbnRzLlxyXG5cdCAqIEB0b2RvICMyNjFcclxuXHQgKiBAdG9kbyBUaHJlc2hvbGQgZm9yIGNsaWNrIGV2ZW50XHJcblx0ICogQHBhcmFtIGV2ZW50IC0gVGhlIGV2ZW50IGFyZ3VtZW50cy5cclxuXHQgKi9cclxuXHRwcml2YXRlIF9vbkRyYWdFbmQoZXZlbnQpIHtcclxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm93bERPTURhdGEuaXNHcmFiID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKHRoaXMuX2RyYWcubW92aW5nKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdLCAndHJhbnNmb3JtJywgYGApO1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXSwgJ3RyYW5zaXRpb24nLCB0aGlzLmNhcm91c2VsU2VydmljZS5zcGVlZCgrdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuZHJhZ0VuZFNwZWVkIHx8IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLnNtYXJ0U3BlZWQpLzEwMDAgKydzJyk7XHJcblxyXG4gICAgICB0aGlzLl9maW5pc2hEcmFnZ2luZyhldmVudCk7XHJcbiAgICAgIHRoaXMubGlzdGVuZXJNb3VzZU1vdmUoKTtcclxuICAgICAgdGhpcy5saXN0ZW5lclRvdWNoTW92ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2RyYWcgPSB7XHJcbiAgICAgIHRpbWU6IG51bGwsXHJcbiAgICAgIHRhcmdldDogbnVsbCxcclxuICAgICAgcG9pbnRlcjogbnVsbCxcclxuICAgICAgc3RhZ2U6IHtcclxuICAgICAgICBzdGFydDogbnVsbCxcclxuICAgICAgICBjdXJyZW50OiBudWxsXHJcbiAgICAgIH0sXHJcbiAgICAgIGRpcmVjdGlvbjogbnVsbCxcclxuICAgICAgYWN0aXZlOiBmYWxzZSxcclxuICAgICAgbW92aW5nOiBmYWxzZVxyXG4gICAgfTtcclxuXHJcbiAgICAvLyB0aGlzLmNhcm91c2VsU2VydmljZS50cmlnZ2VyKCdkcmFnZ2VkJyk7XHJcbiAgICB0aGlzLmxpc3RlbmVyTW91c2VVcCgpO1xyXG4gICAgdGhpcy5saXN0ZW5lclRvdWNoRW5kKCk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcblx0ICogUHJlcGFyZXMgZGF0YSBmb3IgZHJhZ2dpbmcgY2Fyb3VzZWwuIEl0IHN0YXJ0cyBhZnRlciBmaXJpbmcgYHRvdWNoc3RhcnRgIGFuZCBgbW91c2Vkb3duYCBldmVudHMuXHJcblx0ICogQHBhcmFtIGV2ZW50IC0gVGhlIGV2ZW50IGFyZ3VtZW50cy5cclxuXHQgKiBAcmV0dXJucyBzdGFnZSAtIG9iamVjdCB3aXRoICd4JyBhbmQgJ3knIGNvb3JkaW5hdGVzIG9mIC5vd2wtc3RhZ2VcclxuXHQgKi9cclxuICBwcml2YXRlIF9wcmVwYXJlRHJhZ2dpbmcoZXZlbnQ6IGFueSk6IENvb3JkcyB7XHJcbiAgICByZXR1cm4gdGhpcy5jYXJvdXNlbFNlcnZpY2UucHJlcGFyZURyYWdnaW5nKGV2ZW50KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEF0dGFjaGVzIGhhbmRsZXIgZm9yICdjbGljaycgZXZlbnQgb24gYW55IGVsZW1lbnQgaW4gLm93bC1zdGFnZSBpbiBvcmRlciB0byBwcmV2ZW50IGRyYWdnaW5nIHdoZW4gbW92aW5nIG9mIGN1cnNvciBpcyBsZXNzIHRoYW4gM3B4XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfb25lQ2xpY2tIYW5kbGVyID0gKCkgPT4ge1xyXG4gICAgdGhpcy5saXN0ZW5lck9uZUNsaWNrID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5fZHJhZy50YXJnZXQsICdjbGljaycsICgpID0+IGZhbHNlKVxyXG4gICAgdGhpcy5saXN0ZW5lck9uZUNsaWNrKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGaW5pc2hlcyBkcmFnZ2luZ1xyXG4gICAqIEBwYXJhbSBldmVudCBvYmplY3QgZXZlbnQgb2YgJ21vdXNlVXAnIG9mICd0b3VjaGVuZCcgZXZlbnRzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZmluaXNoRHJhZ2dpbmcoZXZlbnQ6IGFueSkge1xyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UuZmluaXNoRHJhZ2dpbmcoZXZlbnQsIHRoaXMuX2RyYWcsIHRoaXMuX29uZUNsaWNrSGFuZGxlcik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuXHQgKiBHZXRzIHVuaWZpZWQgcG9pbnRlciBjb29yZGluYXRlcyBmcm9tIGV2ZW50LlxyXG5cdCAqIEBwYXJhbSBldmVudCBUaGUgYG1vdXNlZG93bmAgb3IgYHRvdWNoc3RhcnRgIGV2ZW50LlxyXG5cdCAqIEByZXR1cm5zIENvbnRhaW5zIGB4YCBhbmQgYHlgIGNvb3JkaW5hdGVzIG9mIGN1cnJlbnQgcG9pbnRlciBwb3NpdGlvbi5cclxuXHQgKi9cclxuICBwcml2YXRlIF9wb2ludGVyKGV2ZW50OiBhbnkpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnBvaW50ZXIoZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcblx0ICogR2V0cyB0aGUgZGlmZmVyZW5jZSBvZiB0d28gdmVjdG9ycy5cclxuXHQgKiBAcGFyYW0gZmlyc3QgVGhlIGZpcnN0IHZlY3Rvci5cclxuXHQgKiBAcGFyYW0gc2Vjb25kLSBUaGUgc2Vjb25kIHZlY3Rvci5cclxuXHQgKiBAcmV0dXJucyBUaGUgZGlmZmVyZW5jZS5cclxuXHQgKi9cclxuICBwcml2YXRlIF9kaWZmZXJlbmNlKGZpcnN0QzogQ29vcmRzLCBzZWNvbmQ6IENvb3Jkcyk6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZGlmZmVyZW5jZShmaXJzdEMsIHNlY29uZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuXHQgKiBDaGVja3Mgd2hldGhlciB0aGUgY2Fyb3VzZWwgaXMgaW4gYSBzcGVjaWZpYyBzdGF0ZSBvciBub3QuXHJcblx0ICogQHBhcmFtIHN0YXRlIFRoZSBzdGF0ZSB0byBjaGVjay5cclxuXHQgKiBAcmV0dXJucyBUaGUgZmxhZyB3aGljaCBpbmRpY2F0ZXMgaWYgdGhlIGNhcm91c2VsIGlzIGJ1c3kuXHJcblx0ICovXHJcbiAgcHJpdmF0ZSBfaXMoc3RhdGU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmlzKHN0YXRlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogRW50ZXJzIGEgc3RhdGUuXHJcbiAgKiBAcGFyYW0gbmFtZSBUaGUgc3RhdGUgbmFtZS5cclxuICAqL1xyXG4gIHByaXZhdGUgX2VudGVyKG5hbWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UuZW50ZXIobmFtZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuXHQgKiBTZW5kcyBhbGwgZGF0YSBuZWVkZWQgZm9yIFZpZXcuXHJcblx0ICovXHJcbiAgcHJpdmF0ZSBfc2VuZENoYW5nZXMoKSB7XHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5zZW5kQ2hhbmdlcygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlciBmb3IgdHJhbnNpdGlvZW5kIGV2ZW50XHJcbiAgICovXHJcbiAgb25UcmFuc2l0aW9uRW5kKCkge1xyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uub25UcmFuc2l0aW9uRW5kKCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7XHJcbiAgQ2Fyb3VzZWxDb21wb25lbnQsXHJcbiAgQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZVxyXG59IGZyb20gJy4vY2Fyb3VzZWwuY29tcG9uZW50JztcclxuaW1wb3J0IHsgV0lORE9XX1BST1ZJREVSUyB9IGZyb20gJy4uL3NlcnZpY2VzL3dpbmRvdy1yZWYuc2VydmljZSc7XHJcbmltcG9ydCB7IFJlc2l6ZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9yZXNpemUuc2VydmljZSc7XHJcbmltcG9ydCB7IERPQ1VNRU5UX1BST1ZJREVSUyB9IGZyb20gJy4uL3NlcnZpY2VzL2RvY3VtZW50LXJlZi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3RhZ2VDb21wb25lbnQgfSBmcm9tICcuL3N0YWdlL3N0YWdlLmNvbXBvbmVudCc7XHJcblxyXG5leHBvcnQge1xyXG4gIENhcm91c2VsQ29tcG9uZW50LFxyXG4gIENhcm91c2VsU2xpZGVEaXJlY3RpdmUsXHJcbiAgU2xpZGVzT3V0cHV0RGF0YVxyXG59IGZyb20gJy4vY2Fyb3VzZWwuY29tcG9uZW50JztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbQ2Fyb3VzZWxDb21wb25lbnQsIENhcm91c2VsU2xpZGVEaXJlY3RpdmUsIFN0YWdlQ29tcG9uZW50XSxcclxuICBleHBvcnRzOiBbQ2Fyb3VzZWxDb21wb25lbnQsIENhcm91c2VsU2xpZGVEaXJlY3RpdmVdLFxyXG4gIHByb3ZpZGVyczogW1dJTkRPV19QUk9WSURFUlMsIFJlc2l6ZVNlcnZpY2UsIERPQ1VNRU5UX1BST1ZJREVSU11cclxufSlcclxuZXhwb3J0IGNsYXNzIENhcm91c2VsTW9kdWxlIHt9XHJcbiJdLCJuYW1lcyI6WyJtZXJnZSIsImZpbHRlciIsImZpcnN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7SUF3QkUsWUFBb0IsWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDNUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQ25DLElBQUksQ0FBQyxZQUFZLENBQUMsc0JBQXNCLENBQ3RDLFFBQVEsRUFDUixRQUFR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