import { EventManager } from '@angular/platform-browser';
import { Subject, merge } from 'rxjs';
import { Injectable, InjectionToken, PLATFORM_ID, Inject, Component, Input, Output, Directive, ContentChildren, TemplateRef, ElementRef, EventEmitter, NgZone, HostListener, Renderer2, Attribute, HostBinding, isDevMode, NgModule } from '@angular/core';
import { __extends, __assign } from 'tslib';
import { tap, filter, skip, delay, switchMap, first } from 'rxjs/operators';
import { isPlatformBrowser, LocationStrategy, CommonModule } from '@angular/common';
import { ActivatedRoute, Router, NavigationEnd, RouterModule } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var ResizeService = /** @class */ (function () {
    function ResizeService(eventManager) {
        this.eventManager = eventManager;
        this.resizeSubject = new Subject();
        this.eventManager.addGlobalEventListener('window', 'resize', this.onResize.bind(this));
        this.eventManager.addGlobalEventListener('window', 'onload', this.onLoaded.bind(this));
    }
    Object.defineProperty(ResizeService.prototype, "onResize$", {
        /**
         * Makes resizeSubject become Observable
         * @returns Observable of resizeSubject
         */
        get: /**
         * Makes resizeSubject become Observable
         * @return {?} Observable of resizeSubject
         */
        function () {
            return this.resizeSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Handler of 'resize' event. Passes data throw resizeSubject
     * @param event Event Object of 'resize' event
     */
    /**
     * Handler of 'resize' event. Passes data throw resizeSubject
     * @param {?} event Event Object of 'resize' event
     * @return {?}
     */
    ResizeService.prototype.onResize = /**
     * Handler of 'resize' event. Passes data throw resizeSubject
     * @param {?} event Event Object of 'resize' event
     * @return {?}
     */
    function (event) {
        this.resizeSubject.next((/** @type {?} */ (event.target)));
    };
    /**
     * Handler of 'onload' event. Defines the width of window
     * @param event Event Object of 'onload' event
     */
    /**
     * Handler of 'onload' event. Defines the width of window
     * @param {?} event Event Object of 'onload' event
     * @return {?}
     */
    ResizeService.prototype.onLoaded = /**
     * Handler of 'onload' event. Defines the width of window
     * @param {?} event Event Object of 'onload' event
     * @return {?}
     */
    function (event) {
        this.windowWidth = (/** @type {?} */ (event.target));
    };
    ResizeService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ResizeService.ctorParameters = function () { return [
        { type: EventManager }
    ]; };
    return ResizeService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 * Defaults value of options
 */
var /**
 * Defaults value of options
 */
OwlCarouselOConfig = /** @class */ (function () {
    function OwlCarouselOConfig() {
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
        this.slideBy = 1; // stage moves on 1 width of slide; if slideBy = 2, stage moves on 2 widths of slide
        // stage moves on 1 width of slide; if slideBy = 2, stage moves on 2 widths of slide
        this.dots = true;
        this.dotsEach = false;
        this.dotsData = false;
        this.dotsSpeed = false;
        // defaults to Autoplay
        this.autoplay = false;
        this.autoplayTimeout = 5000;
        this.autoplayHoverPause = false;
        this.autoplaySpeed = false;
        // defaults to LazyLoading
        this.lazyLoad = false;
        this.lazyLoadEager = 0;
        // defaults to Animate
        this.animateOut = false;
        this.animateIn = false;
        // defaults to AutoHeight
        this.autoHeight = false;
        // defaults to Hash
        this.URLhashListener = false;
    }
    return OwlCarouselOConfig;
}());
/**
 * we can't read types from OwlOptions in javascript because of props have undefined value and types of those props are used for validating inputs
 * class below is copy of OwlOptions but its all props have string value showing certain type;
 * this is class is being used just in method _validateOptions() of CarouselService;
 */
var /**
 * we can't read types from OwlOptions in javascript because of props have undefined value and types of those props are used for validating inputs
 * class below is copy of OwlOptions but its all props have string value showing certain type;
 * this is class is being used just in method _validateOptions() of CarouselService;
 */
OwlOptionsMockedTypes = /** @class */ (function () {
    function OwlOptionsMockedTypes() {
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
        this.startPosition = 'number|string';
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
        this.slideBy = 'number|string'; // stage moves on 1 width of slide; if slideBy = 2, stage moves on 2 widths of slide
        // stage moves on 1 width of slide; if slideBy = 2, stage moves on 2 widths of slide
        this.dots = 'boolean';
        this.dotsEach = 'number|boolean';
        this.dotsData = 'boolean';
        this.dotsSpeed = 'number|boolean';
        // defaults to Autoplay
        this.autoplay = 'boolean';
        this.autoplayTimeout = 'number';
        this.autoplayHoverPause = 'boolean';
        this.autoplaySpeed = 'number|boolean';
        // defaults to LazyLoading
        this.lazyLoad = 'boolean';
        this.lazyLoadEager = 'number';
        // defaults to Animate
        this.animateOut = 'string|boolean';
        this.animateIn = 'string|boolean';
        // defaults to AutoHeight
        this.autoHeight = 'boolean';
        // defaults to Hash
        this.URLhashListener = "boolean";
    }
    return OwlOptionsMockedTypes;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/** @enum {string} */
var Type = {
    Event: 'event',
    State: 'state',
};
/** @enum {string} */
var Width = {
    Default: 'default',
    Inner: 'inner',
    Outer: 'outer',
};
var CarouselService = /** @class */ (function () {
    function CarouselService() {
        var _this = this;
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
        // is equal to this.slides
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
                run: function (cache) {
                    cache.current = _this._items && _this._items[_this.relative(_this._current)].id;
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
                run: function (cache) {
                    /** @type {?} */
                    var margin = _this.settings.margin || '';
                    /** @type {?} */
                    var grid = !_this.settings.autoWidth;
                    /** @type {?} */
                    var rtl = _this.settings.rtl;
                    /** @type {?} */
                    var css = {
                        'margin-left': rtl ? margin : '',
                        'margin-right': rtl ? '' : margin
                    };
                    if (!grid) {
                        _this.slidesData.forEach(function (slide) {
                            slide.marginL = css['margin-left'];
                            slide.marginR = css['margin-right'];
                        });
                    }
                    cache.css = css;
                }
            }, {
                filter: ['width', 'items', 'settings'],
                run: function (cache) {
                    /** @type {?} */
                    var width = +(_this.width() / _this.settings.items).toFixed(3) - _this.settings.margin;
                    /** @type {?} */
                    var grid = !_this.settings.autoWidth;
                    /** @type {?} */
                    var widths = [];
                    /** @type {?} */
                    var merge$$1 = null;
                    /** @type {?} */
                    var iterator = _this._items.length;
                    cache.items = {
                        merge: false,
                        width: width
                    };
                    while (iterator--) {
                        merge$$1 = _this._mergers[iterator];
                        merge$$1 = _this.settings.mergeFit && Math.min(merge$$1, _this.settings.items) || merge$$1;
                        cache.items.merge = merge$$1 > 1 || cache.items.merge;
                        widths[iterator] = !grid ? _this._items[iterator].width ? _this._items[iterator].width : width : width * merge$$1;
                    }
                    _this._widths = widths;
                    _this.slidesData.forEach(function (slide, i) {
                        slide.width = _this._widths[i];
                        slide.marginR = cache.css['margin-right'];
                        slide.marginL = cache.css['margin-left'];
                    });
                }
            }, {
                filter: ['items', 'settings'],
                run: function () {
                    /** @type {?} */
                    var clones = [];
                    /** @type {?} */
                    var items = _this._items;
                    /** @type {?} */
                    var settings = _this.settings;
                    /** @type {?} */
                    var 
                    // TODO: Should be computed from number of min width items in stage
                    view = Math.max(settings.items * 2, 4);
                    /** @type {?} */
                    var size = Math.ceil(items.length / 2) * 2;
                    /** @type {?} */
                    var append = [];
                    /** @type {?} */
                    var prepend = [];
                    /** @type {?} */
                    var repeat = settings.loop && items.length ? settings.rewind ? view : Math.max(view, size) : 0;
                    repeat /= 2;
                    while (repeat--) {
                        // Switch to only using appended clones
                        clones.push(_this.normalize(clones.length / 2, true));
                        append.push(__assign({}, _this.slidesData[clones[clones.length - 1]]));
                        clones.push(_this.normalize(items.length - 1 - (clones.length - 1) / 2, true));
                        prepend.unshift(__assign({}, _this.slidesData[clones[clones.length - 1]]));
                    }
                    _this._clones = clones;
                    append = append.map(function (slide) {
                        slide.id = "" + _this.clonedIdPrefix + slide.id;
                        slide.isActive = false;
                        slide.isCloned = true;
                        return slide;
                    });
                    prepend = prepend.map(function (slide) {
                        slide.id = "" + _this.clonedIdPrefix + slide.id;
                        slide.isActive = false;
                        slide.isCloned = true;
                        return slide;
                    });
                    _this.slidesData = prepend.concat(_this.slidesData).concat(append);
                }
            }, {
                filter: ['width', 'items', 'settings'],
                run: function () {
                    /** @type {?} */
                    var rtl = _this.settings.rtl ? 1 : -1;
                    /** @type {?} */
                    var size = _this._clones.length + _this._items.length;
                    /** @type {?} */
                    var coordinates = [];
                    /** @type {?} */
                    var iterator = -1;
                    /** @type {?} */
                    var previous = 0;
                    /** @type {?} */
                    var current = 0;
                    while (++iterator < size) {
                        previous = coordinates[iterator - 1] || 0;
                        current = _this._widths[_this.relative(iterator)] + _this.settings.margin;
                        coordinates.push(previous + current * rtl);
                    }
                    _this._coordinates = coordinates;
                }
            }, {
                filter: ['width', 'items', 'settings'],
                run: function () {
                    /** @type {?} */
                    var padding = _this.settings.stagePadding;
                    /** @type {?} */
                    var coordinates = _this._coordinates;
                    /** @type {?} */
                    var css = {
                        'width': Math.ceil(Math.abs(coordinates[coordinates.length - 1])) + padding * 2,
                        'padding-left': padding || '',
                        'padding-right': padding || ''
                    };
                    _this.stageData.width = css.width; // use this property in *ngIf directive for .owl-stage element
                    _this.stageData.paddingL = css['padding-left'];
                    _this.stageData.paddingR = css['padding-right'];
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
                run: function (cache) {
                    /** @type {?} */
                    var current = cache.current ? _this.slidesData.findIndex(function (slide) { return slide.id === cache.current; }) : 0;
                    current = Math.max(_this.minimum(), Math.min(_this.maximum(), current));
                    _this.reset(current);
                }
            }, {
                filter: ['position'],
                run: function () {
                    _this.animate(_this.coordinates(_this._current));
                }
            }, {
                filter: ['width', 'position', 'items', 'settings'],
                run: function () {
                    /** @type {?} */
                    var rtl = _this.settings.rtl ? 1 : -1;
                    /** @type {?} */
                    var padding = _this.settings.stagePadding * 2;
                    /** @type {?} */
                    var matches = [];
                    /** @type {?} */
                    var begin;
                    /** @type {?} */
                    var end;
                    /** @type {?} */
                    var inner;
                    /** @type {?} */
                    var outer;
                    /** @type {?} */
                    var i;
                    /** @type {?} */
                    var n;
                    begin = _this.coordinates(_this.current());
                    if (typeof begin === 'number') {
                        begin += padding;
                    }
                    else {
                        begin = 0;
                    }
                    end = begin + _this.width() * rtl;
                    if (rtl === -1 && _this.settings.center) {
                        /** @type {?} */
                        var result = _this._coordinates.filter(function (element) {
                            return _this.settings.items % 2 === 1 ? element >= begin : element > begin;
                        });
                        begin = result.length ? result[result.length - 1] : begin;
                    }
                    for (i = 0, n = _this._coordinates.length; i < n; i++) {
                        inner = Math.ceil(_this._coordinates[i - 1] || 0);
                        outer = Math.ceil(Math.abs(_this._coordinates[i]) + padding * rtl);
                        if ((_this._op(inner, '<=', begin) && (_this._op(inner, '>', end)))
                            || (_this._op(outer, '<', begin) && _this._op(outer, '>', end))) {
                            matches.push(i);
                        }
                    }
                    _this.slidesData.forEach(function (slide) {
                        slide.isActive = false;
                        return slide;
                    });
                    matches.forEach(function (item) {
                        _this.slidesData[item].isActive = true;
                    });
                    if (_this.settings.center) {
                        _this.slidesData.forEach(function (slide) {
                            slide.isCentered = false;
                            return slide;
                        });
                        _this.slidesData[_this.current()].isCentered = true;
                    }
                }
            }
        ];
    }
    Object.defineProperty(CarouselService.prototype, "invalidated", {
        // Is needed for tests
        get: 
        // Is needed for tests
        /**
         * @return {?}
         */
        function () {
            return this._invalidated;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CarouselService.prototype, "states", {
        // is needed for tests
        get: 
        // is needed for tests
        /**
         * @return {?}
         */
        function () {
            return this._states;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Makes _viewSettingsShipper$ Subject become Observable
     * @returns Observable of _viewSettingsShipper$ Subject
     */
    /**
     * Makes _viewSettingsShipper$ Subject become Observable
     * @return {?} Observable of _viewSettingsShipper$ Subject
     */
    CarouselService.prototype.getViewCurSettings = /**
     * Makes _viewSettingsShipper$ Subject become Observable
     * @return {?} Observable of _viewSettingsShipper$ Subject
     */
    function () {
        return this._viewSettingsShipper$.asObservable();
    };
    /**
     * Makes _initializedCarousel$ Subject become Observable
     * @returns Observable of _initializedCarousel$ Subject
     */
    /**
     * Makes _initializedCarousel$ Subject become Observable
     * @return {?} Observable of _initializedCarousel$ Subject
     */
    CarouselService.prototype.getInitializedState = /**
     * Makes _initializedCarousel$ Subject become Observable
     * @return {?} Observable of _initializedCarousel$ Subject
     */
    function () {
        return this._initializedCarousel$.asObservable();
    };
    /**
     * Makes _changeSettingsCarousel$ Subject become Observable
     * @returns Observable of _changeSettingsCarousel$ Subject
     */
    /**
     * Makes _changeSettingsCarousel$ Subject become Observable
     * @return {?} Observable of _changeSettingsCarousel$ Subject
     */
    CarouselService.prototype.getChangeState = /**
     * Makes _changeSettingsCarousel$ Subject become Observable
     * @return {?} Observable of _changeSettingsCarousel$ Subject
     */
    function () {
        return this._changeSettingsCarousel$.asObservable();
    };
    /**
     * Makes _changedSettingsCarousel$ Subject become Observable
     * @returns Observable of _changedSettingsCarousel$ Subject
     */
    /**
     * Makes _changedSettingsCarousel$ Subject become Observable
     * @return {?} Observable of _changedSettingsCarousel$ Subject
     */
    CarouselService.prototype.getChangedState = /**
     * Makes _changedSettingsCarousel$ Subject become Observable
     * @return {?} Observable of _changedSettingsCarousel$ Subject
     */
    function () {
        return this._changedSettingsCarousel$.asObservable();
    };
    /**
     * Makes _translateCarousel$ Subject become Observable
     * @returns Observable of _translateCarousel$ Subject
     */
    /**
     * Makes _translateCarousel$ Subject become Observable
     * @return {?} Observable of _translateCarousel$ Subject
     */
    CarouselService.prototype.getTranslateState = /**
     * Makes _translateCarousel$ Subject become Observable
     * @return {?} Observable of _translateCarousel$ Subject
     */
    function () {
        return this._translateCarousel$.asObservable();
    };
    /**
     * Makes _translatedCarousel$ Subject become Observable
     * @returns Observable of _translatedCarousel$ Subject
     */
    /**
     * Makes _translatedCarousel$ Subject become Observable
     * @return {?} Observable of _translatedCarousel$ Subject
     */
    CarouselService.prototype.getTranslatedState = /**
     * Makes _translatedCarousel$ Subject become Observable
     * @return {?} Observable of _translatedCarousel$ Subject
     */
    function () {
        return this._translatedCarousel$.asObservable();
    };
    /**
     * Makes _resizeCarousel$ Subject become Observable
     * @returns Observable of _resizeCarousel$ Subject
     */
    /**
     * Makes _resizeCarousel$ Subject become Observable
     * @return {?} Observable of _resizeCarousel$ Subject
     */
    CarouselService.prototype.getResizeState = /**
     * Makes _resizeCarousel$ Subject become Observable
     * @return {?} Observable of _resizeCarousel$ Subject
     */
    function () {
        return this._resizeCarousel$.asObservable();
    };
    /**
     * Makes _resizedCarousel$ Subject become Observable
     * @returns Observable of _resizedCarousel$ Subject
     */
    /**
     * Makes _resizedCarousel$ Subject become Observable
     * @return {?} Observable of _resizedCarousel$ Subject
     */
    CarouselService.prototype.getResizedState = /**
     * Makes _resizedCarousel$ Subject become Observable
     * @return {?} Observable of _resizedCarousel$ Subject
     */
    function () {
        return this._resizedCarousel$.asObservable();
    };
    /**
     * Makes _refreshCarousel$ Subject become Observable
     * @returns Observable of _refreshCarousel$ Subject
     */
    /**
     * Makes _refreshCarousel$ Subject become Observable
     * @return {?} Observable of _refreshCarousel$ Subject
     */
    CarouselService.prototype.getRefreshState = /**
     * Makes _refreshCarousel$ Subject become Observable
     * @return {?} Observable of _refreshCarousel$ Subject
     */
    function () {
        return this._refreshCarousel$.asObservable();
    };
    /**
     * Makes _refreshedCarousel$ Subject become Observable
     * @returns Observable of _refreshedCarousel$ Subject
     */
    /**
     * Makes _refreshedCarousel$ Subject become Observable
     * @return {?} Observable of _refreshedCarousel$ Subject
     */
    CarouselService.prototype.getRefreshedState = /**
     * Makes _refreshedCarousel$ Subject become Observable
     * @return {?} Observable of _refreshedCarousel$ Subject
     */
    function () {
        return this._refreshedCarousel$.asObservable();
    };
    /**
     * Makes _dragCarousel$ Subject become Observable
     * @returns Observable of _dragCarousel$ Subject
     */
    /**
     * Makes _dragCarousel$ Subject become Observable
     * @return {?} Observable of _dragCarousel$ Subject
     */
    CarouselService.prototype.getDragState = /**
     * Makes _dragCarousel$ Subject become Observable
     * @return {?} Observable of _dragCarousel$ Subject
     */
    function () {
        return this._dragCarousel$.asObservable();
    };
    /**
     * Makes _draggedCarousel$ Subject become Observable
     * @returns Observable of _draggedCarousel$ Subject
     */
    /**
     * Makes _draggedCarousel$ Subject become Observable
     * @return {?} Observable of _draggedCarousel$ Subject
     */
    CarouselService.prototype.getDraggedState = /**
     * Makes _draggedCarousel$ Subject become Observable
     * @return {?} Observable of _draggedCarousel$ Subject
     */
    function () {
        return this._draggedCarousel$.asObservable();
    };
    /**
     * Setups custom options expanding default options
     * @param options custom options
     */
    /**
     * Setups custom options expanding default options
     * @param {?} options custom options
     * @return {?}
     */
    CarouselService.prototype.setOptions = /**
     * Setups custom options expanding default options
     * @param {?} options custom options
     * @return {?}
     */
    function (options) {
        /** @type {?} */
        var configOptions = new OwlCarouselOConfig();
        /** @type {?} */
        var checkedOptions = this._validateOptions(options, configOptions);
        this._options = __assign({}, configOptions, checkedOptions);
    };
    /**
     * Checks whether user's option are set properly. Cheking is based on typings;
     * @param options options set by user
     * @param configOptions default options
     * @returns checked and modified (if it's needed) user's options
     *
     * Notes:
     * 	- if user set option with wrong type, it'll be written in console
     */
    /**
     * Checks whether user's option are set properly. Cheking is based on typings;
     * @param {?} options options set by user
     * @param {?} configOptions default options
     * @return {?} checked and modified (if it's needed) user's options
     *
     * Notes:
     * 	- if user set option with wrong type, it'll be written in console
     */
    CarouselService.prototype._validateOptions = /**
     * Checks whether user's option are set properly. Cheking is based on typings;
     * @param {?} options options set by user
     * @param {?} configOptions default options
     * @return {?} checked and modified (if it's needed) user's options
     *
     * Notes:
     * 	- if user set option with wrong type, it'll be written in console
     */
    function (options, configOptions) {
        /** @type {?} */
        var checkedOptions = __assign({}, options);
        /** @type {?} */
        var mockedTypes = new OwlOptionsMockedTypes();
        var _loop_1 = function (key) {
            if (checkedOptions.hasOwnProperty(key)) {
                // condition could be shortened but it gets harder for understanding
                if (mockedTypes[key] === 'number') {
                    if (this_1._isNumeric(checkedOptions[key])) {
                        checkedOptions[key] = +checkedOptions[key];
                        checkedOptions[key] = key === 'items' ? this_1._validateItems(checkedOptions[key]) : checkedOptions[key];
                    }
                    else {
                        checkedOptions[key] = setRightOption(mockedTypes[key], key);
                    }
                }
                else if (mockedTypes[key] === 'boolean' && typeof checkedOptions[key] !== 'boolean') {
                    checkedOptions[key] = setRightOption(mockedTypes[key], key);
                }
                else if (mockedTypes[key] === 'number|boolean' && !this_1._isNumberOrBoolean(checkedOptions[key])) {
                    checkedOptions[key] = setRightOption(mockedTypes[key], key);
                }
                else if (mockedTypes[key] === 'number|string' && !this_1._isNumberOrString(checkedOptions[key])) {
                    checkedOptions[key] = setRightOption(mockedTypes[key], key);
                }
                else if (mockedTypes[key] === 'string|boolean' && !this_1._isStringOrBoolean(checkedOptions[key])) {
                    checkedOptions[key] = setRightOption(mockedTypes[key], key);
                }
                else if (mockedTypes[key] === 'string[]') {
                    if (Array.isArray(checkedOptions[key])) {
                        /** @type {?} */
                        var isString_1 = false;
                        checkedOptions[key].forEach(function (element) {
                            isString_1 = typeof element === 'string' ? true : false;
                        });
                        if (!isString_1) {
                            checkedOptions[key] = setRightOption(mockedTypes[key], key);
                        }
                    }
                    else {
                        checkedOptions[key] = setRightOption(mockedTypes[key], key);
                    }
                }
            }
        };
        var this_1 = this;
        for (var key in checkedOptions) {
            _loop_1(key);
        }
        /**
         * @param {?} type
         * @param {?} key
         * @return {?}
         */
        function setRightOption(type, key) {
            console.log("options." + key + " must be type of " + type + "; " + key + "=" + options[key] + " skipped to defaults: " + key + "=" + configOptions[key]);
            return configOptions[key];
        }
        return checkedOptions;
    };
    /**
     * Checks option items set by user and if it bigger than number of slides then returns number of slides
     * @param items option items set by user
     * @returns right number of items
     */
    /**
     * Checks option items set by user and if it bigger than number of slides then returns number of slides
     * @param {?} items option items set by user
     * @return {?} right number of items
     */
    CarouselService.prototype._validateItems = /**
     * Checks option items set by user and if it bigger than number of slides then returns number of slides
     * @param {?} items option items set by user
     * @return {?} right number of items
     */
    function (items) {
        /** @type {?} */
        var result;
        if (items > this._items.length) {
            result = this._items.length;
            console.log('The option \'items\' in your options is bigger than the number of slides. This option is updated to the current number of slides and the navigation got disabled');
        }
        else {
            if (items === this._items.length && (this.settings.dots || this.settings.nav)) {
                console.log('Option \'items\' in your options is equal to the number of slides. So the navigation got disabled');
            }
            result = items;
        }
        return result;
    };
    /**
     * Set current width of carousel
     * @param width width of carousel Window
     */
    /**
     * Set current width of carousel
     * @param {?} width width of carousel Window
     * @return {?}
     */
    CarouselService.prototype.setCarouselWidth = /**
     * Set current width of carousel
     * @param {?} width width of carousel Window
     * @return {?}
     */
    function (width) {
        this._width = width;
    };
    /**
       * Setups the current settings.
       * @todo Remove responsive classes. Why should adaptive designs be brought into IE8?
       * @todo Support for media queries by using `matchMedia` would be nice.
       * @param carouselWidth width of carousel
       * @param slides array of slides
       * @param options options set by user
       */
    /**
     * Setups the current settings.
     * \@todo Remove responsive classes. Why should adaptive designs be brought into IE8? / Support for media queries by using `matchMedia` would be nice.
     * @param {?} carouselWidth width of carousel
     * @param {?} slides array of slides
     * @param {?} options options set by user
     * @return {?}
     */
    CarouselService.prototype.setup = /**
     * Setups the current settings.
     * \@todo Remove responsive classes. Why should adaptive designs be brought into IE8? / Support for media queries by using `matchMedia` would be nice.
     * @param {?} carouselWidth width of carousel
     * @param {?} slides array of slides
     * @param {?} options options set by user
     * @return {?}
     */
    function (carouselWidth, slides, options) {
        this.setCarouselWidth(carouselWidth);
        this.setItems(slides);
        this._defineSlidesData();
        this.setOptions(options);
        this.settings = __assign({}, this._options);
        this.setViewportItemsN();
        this._trigger('change', { property: { name: 'settings', value: this.settings } });
        this.invalidate('settings'); // must be call of this function;
        this._trigger('changed', { property: { name: 'settings', value: this.settings } });
    };
    /**
     * Set number of items for current viewport
     */
    /**
     * Set number of items for current viewport
     * @return {?}
     */
    CarouselService.prototype.setViewportItemsN = /**
     * Set number of items for current viewport
     * @return {?}
     */
    function () {
        /** @type {?} */
        var viewport = this._width;
        /** @type {?} */
        var overwrites = this._options.responsive;
        /** @type {?} */
        var match = -1;
        if (!Object.keys(overwrites).length) {
            return;
        }
        if (!viewport) {
            this.settings.items = 1;
            return;
        }
        for (var key in overwrites) {
            if (overwrites.hasOwnProperty(key)) {
                if (+key <= viewport && +key > match) {
                    match = Number(key);
                }
            }
        }
        this.settings = __assign({}, this.settings, { items: this._validateItems(overwrites[match].items) });
        // if (typeof this.settings.stagePadding === 'function') {
        // 	this.settings.stagePadding = this.settings.stagePadding();
        // }
        delete this.settings.responsive;
        this.owlDOMData.isResponsive = true;
        this._breakpoint = match;
        this.invalidate('settings');
    };
    /**
     * Initializes the carousel.
     * @param slides array of CarouselSlideDirective
     */
    /**
     * Initializes the carousel.
     * @param {?} slides array of CarouselSlideDirective
     * @return {?}
     */
    CarouselService.prototype.initialize = /**
     * Initializes the carousel.
     * @param {?} slides array of CarouselSlideDirective
     * @return {?}
     */
    function (slides) {
        var _this = this;
        this.enter('initializing');
        // this.trigger('initialize');
        this.owlDOMData.rtl = this.settings.rtl;
        slides.forEach(function (item) {
            /** @type {?} */
            var mergeN = _this.settings.merge ? item.dataMerge : 1;
            _this._mergers.push(mergeN);
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
    };
    /**
     * Sends all data needed for View
     */
    /**
     * Sends all data needed for View
     * @return {?}
     */
    CarouselService.prototype.sendChanges = /**
     * Sends all data needed for View
     * @return {?}
     */
    function () {
        this._viewSettingsShipper$.next({
            owlDOMData: this.owlDOMData,
            stageData: this.stageData,
            slidesData: this.slidesData,
            navData: this.navData,
            dotsData: this.dotsData
        });
    };
    /**
       * Updates option logic if necessery
       */
    /**
     * Updates option logic if necessery
     * @return {?}
     */
    CarouselService.prototype._optionsLogic = /**
     * Updates option logic if necessery
     * @return {?}
     */
    function () {
        if (this.settings.autoWidth) {
            this.settings.stagePadding = 0;
            this.settings.merge = false;
        }
    };
    /**
     * Updates the view
     */
    /**
     * Updates the view
     * @return {?}
     */
    CarouselService.prototype.update = /**
     * Updates the view
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var i = 0;
        /** @type {?} */
        var n = this._pipe.length;
        /** @type {?} */
        var filter$$1 = function (item) { return _this._invalidated[item]; };
        /** @type {?} */
        var cache = {};
        while (i < n) {
            /** @type {?} */
            var filteredPipe = this._pipe[i].filter.filter(filter$$1);
            if (this._invalidated.all || filteredPipe.length > 0) {
                this._pipe[i].run(cache);
            }
            i++;
        }
        this.slidesData.forEach(function (slide) { return slide.classes = _this.setCurSlideClasses(slide); });
        this.sendChanges();
        this._invalidated = {};
        if (!this.is('valid')) {
            this.enter('valid');
        }
    };
    /**
       * Gets the width of the view.
       * @param [dimension=Width.Default] The dimension to return
       * @returns The width of the view in pixel.
       */
    /**
     * Gets the width of the view.
     * @param {?=} dimension
     * @return {?} The width of the view in pixel.
     */
    CarouselService.prototype.width = /**
     * Gets the width of the view.
     * @param {?=} dimension
     * @return {?} The width of the view in pixel.
     */
    function (dimension) {
        dimension = dimension || Width.Default;
        switch (dimension) {
            case Width.Inner:
            case Width.Outer:
                return this._width;
            default:
                return this._width - this.settings.stagePadding * 2 + this.settings.margin;
        }
    };
    /**
       * Refreshes the carousel primarily for adaptive purposes.
       */
    /**
     * Refreshes the carousel primarily for adaptive purposes.
     * @return {?}
     */
    CarouselService.prototype.refresh = /**
     * Refreshes the carousel primarily for adaptive purposes.
     * @return {?}
     */
    function () {
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
    };
    /**
       * Checks window `resize` event.
       * @param curWidth width of .owl-carousel
       */
    /**
     * Checks window `resize` event.
     * @param {?} curWidth width of .owl-carousel
     * @return {?}
     */
    CarouselService.prototype.onResize = /**
     * Checks window `resize` event.
     * @param {?} curWidth width of .owl-carousel
     * @return {?}
     */
    function (curWidth) {
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
    };
    /**
       * Prepares data for dragging carousel. It starts after firing `touchstart` and `mousedown` events.
       * @todo Horizontal swipe threshold as option
       * @todo #261
       * @param event - The event arguments.
       * @returns stage - object with 'x' and 'y' coordinates of .owl-stage
       */
    /**
     * Prepares data for dragging carousel. It starts after firing `touchstart` and `mousedown` events.
     * \@todo Horizontal swipe threshold as option / #261
     * @param {?} event - The event arguments.
     * @return {?} stage - object with 'x' and 'y' coordinates of .owl-stage
     */
    CarouselService.prototype.prepareDragging = /**
     * Prepares data for dragging carousel. It starts after firing `touchstart` and `mousedown` events.
     * \@todo Horizontal swipe threshold as option / #261
     * @param {?} event - The event arguments.
     * @return {?} stage - object with 'x' and 'y' coordinates of .owl-stage
     */
    function (event) {
        /** @type {?} */
        var stage = null;
        /** @type {?} */
        var transformArr;
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
    };
    /**
     * Enters into a 'dragging' state
     */
    /**
     * Enters into a 'dragging' state
     * @return {?}
     */
    CarouselService.prototype.enterDragging = /**
     * Enters into a 'dragging' state
     * @return {?}
     */
    function () {
        this.enter('dragging');
        this._trigger('drag');
    };
    /**
       * Defines new coords for .owl-stage while dragging it
       * @todo #261
       * @param event the event arguments.
       * @param dragData initial data got after starting dragging
       * @returns coords or false
       */
    /**
     * Defines new coords for .owl-stage while dragging it
     * \@todo #261
     * @param {?} event the event arguments.
     * @param {?} dragData initial data got after starting dragging
     * @return {?} coords or false
     */
    CarouselService.prototype.defineNewCoordsDrag = /**
     * Defines new coords for .owl-stage while dragging it
     * \@todo #261
     * @param {?} event the event arguments.
     * @param {?} dragData initial data got after starting dragging
     * @return {?} coords or false
     */
    function (event, dragData) {
        /** @type {?} */
        var minimum = null;
        /** @type {?} */
        var maximum = null;
        /** @type {?} */
        var pull = null;
        /** @type {?} */
        var delta = this.difference(dragData.pointer, this.pointer(event));
        /** @type {?} */
        var stage = this.difference(dragData.stage.start, delta);
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
    };
    /**
       * Finishes dragging of carousel when `touchend` and `mouseup` events fire.
       * @todo #261
       * @todo Threshold for click event
       * @param event the event arguments.
       * @param dragObj the object with dragging settings and states
       * @param clickAttacher function which attaches click handler to slide or its children elements in order to prevent event bubling
       */
    /**
     * Finishes dragging of carousel when `touchend` and `mouseup` events fire.
     * \@todo #261 / Threshold for click event
     * @param {?} event the event arguments.
     * @param {?} dragObj the object with dragging settings and states
     * @param {?} clickAttacher function which attaches click handler to slide or its children elements in order to prevent event bubling
     * @return {?}
     */
    CarouselService.prototype.finishDragging = /**
     * Finishes dragging of carousel when `touchend` and `mouseup` events fire.
     * \@todo #261 / Threshold for click event
     * @param {?} event the event arguments.
     * @param {?} dragObj the object with dragging settings and states
     * @param {?} clickAttacher function which attaches click handler to slide or its children elements in order to prevent event bubling
     * @return {?}
     */
    function (event, dragObj, clickAttacher) {
        /** @type {?} */
        var delta = this.difference(dragObj.pointer, this.pointer(event));
        /** @type {?} */
        var stage = dragObj.stage.current;
        /** @type {?} */
        var direction = delta.x > +this.settings.rtl ? 'left' : 'right';
        /** @type {?} */
        var currentSlideI;
        /** @type {?} */
        var current;
        /** @type {?} */
        var newCurrent;
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
    };
    /**
       * Gets absolute position of the closest item for a coordinate.
       * @todo Setting `freeDrag` makes `closest` not reusable. See #165.
       * @param coordinate The coordinate in pixel.
       * @param direction The direction to check for the closest item. Ether `left` or `right`.
       * @returns The absolute position of the closest item.
       */
    /**
     * Gets absolute position of the closest item for a coordinate.
     * \@todo Setting `freeDrag` makes `closest` not reusable. See #165.
     * @param {?} coordinate The coordinate in pixel.
     * @param {?} direction The direction to check for the closest item. Ether `left` or `right`.
     * @return {?} The absolute position of the closest item.
     */
    CarouselService.prototype.closest = /**
     * Gets absolute position of the closest item for a coordinate.
     * \@todo Setting `freeDrag` makes `closest` not reusable. See #165.
     * @param {?} coordinate The coordinate in pixel.
     * @param {?} direction The direction to check for the closest item. Ether `left` or `right`.
     * @return {?} The absolute position of the closest item.
     */
    function (coordinate, direction) {
        /** @type {?} */
        var pull = 30;
        /** @type {?} */
        var width = this.width();
        /** @type {?} */
        var coordinates = (/** @type {?} */ (this.coordinates()));
        /** @type {?} */
        var position = -1;
        if (this.settings.center) {
            coordinates = coordinates.map(function (item) {
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
        for (var i = 0; i < coordinates.length; i++) {
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
    };
    /**
       * Animates the stage.
       * @todo #270
       * @param coordinate The coordinate in pixels.
       */
    /**
     * Animates the stage.
     * \@todo #270
     * @param {?} coordinate The coordinate in pixels.
     * @return {?}
     */
    CarouselService.prototype.animate = /**
     * Animates the stage.
     * \@todo #270
     * @param {?} coordinate The coordinate in pixels.
     * @return {?}
     */
    function (coordinate) {
        /** @type {?} */
        var animate$$1 = this.speed() > 0;
        if (this.is('animating')) {
            this.onTransitionEnd();
        }
        if (animate$$1) {
            this.enter('animating');
            this._trigger('translate');
        }
        this.stageData.transform = 'translate3d(' + coordinate + 'px,0px,0px)';
        this.stageData.transition = (this.speed() / 1000) + 's';
        // also there was transition by means of JQuery.animate or css-changing property left
    };
    /**
       * Checks whether the carousel is in a specific state or not.
       * @param state The state to check.
       * @returns The flag which indicates if the carousel is busy.
       */
    /**
     * Checks whether the carousel is in a specific state or not.
     * @param {?} state The state to check.
     * @return {?} The flag which indicates if the carousel is busy.
     */
    CarouselService.prototype.is = /**
     * Checks whether the carousel is in a specific state or not.
     * @param {?} state The state to check.
     * @return {?} The flag which indicates if the carousel is busy.
     */
    function (state$$1) {
        return this._states.current[state$$1] && this._states.current[state$$1] > 0;
    };
    /**
       * Sets the absolute position of the current item.
       * @param position The new absolute position or nothing to leave it unchanged.
       * @returns The absolute position of the current item.
       */
    /**
     * Sets the absolute position of the current item.
     * @param {?=} position The new absolute position or nothing to leave it unchanged.
     * @return {?} The absolute position of the current item.
     */
    CarouselService.prototype.current = /**
     * Sets the absolute position of the current item.
     * @param {?=} position The new absolute position or nothing to leave it unchanged.
     * @return {?} The absolute position of the current item.
     */
    function (position) {
        if (position === undefined) {
            return this._current;
        }
        if (this._items.length === 0) {
            return undefined;
        }
        position = this.normalize(position);
        if (this._current !== position) {
            /** @type {?} */
            var event_1 = this._trigger('change', { property: { name: 'position', value: position } });
            // if (event.data !== undefined) {
            // 	position = this.normalize(event.data);
            // }
            this._current = position;
            this.invalidate('position');
            this._trigger('changed', { property: { name: 'position', value: this._current } });
        }
        return this._current;
    };
    /**
       * Invalidates the given part of the update routine.
       * @param part The part to invalidate.
       * @returns The invalidated parts.
       */
    /**
     * Invalidates the given part of the update routine.
     * @param {?} part The part to invalidate.
     * @return {?} The invalidated parts.
     */
    CarouselService.prototype.invalidate = /**
     * Invalidates the given part of the update routine.
     * @param {?} part The part to invalidate.
     * @return {?} The invalidated parts.
     */
    function (part) {
        if (typeof part === 'string') {
            this._invalidated[part] = true;
            if (this.is('valid')) {
                this.leave('valid');
            }
        }
        return Object.keys(this._invalidated);
    };
    /**
     * Resets the absolute position of the current item.
     * @param position the absolute position of the new item.
     */
    /**
     * Resets the absolute position of the current item.
     * @param {?} position the absolute position of the new item.
     * @return {?}
     */
    CarouselService.prototype.reset = /**
     * Resets the absolute position of the current item.
     * @param {?} position the absolute position of the new item.
     * @return {?}
     */
    function (position) {
        position = this.normalize(position);
        if (position === undefined) {
            return;
        }
        this._speed = 0;
        this._current = position;
        this._suppress(['translate', 'translated']);
        this.animate(this.coordinates(position));
        this._release(['translate', 'translated']);
    };
    /**
       * Normalizes an absolute or a relative position of an item.
       * @param position The absolute or relative position to normalize.
       * @param relative Whether the given position is relative or not.
       * @returns The normalized position.
       */
    /**
     * Normalizes an absolute or a relative position of an item.
     * @param {?} position The absolute or relative position to normalize.
     * @param {?=} relative Whether the given position is relative or not.
     * @return {?} The normalized position.
     */
    CarouselService.prototype.normalize = /**
     * Normalizes an absolute or a relative position of an item.
     * @param {?} position The absolute or relative position to normalize.
     * @param {?=} relative Whether the given position is relative or not.
     * @return {?} The normalized position.
     */
    function (position, relative) {
        /** @type {?} */
        var n = this._items.length;
        /** @type {?} */
        var m = relative ? 0 : this._clones.length;
        if (!this._isNumeric(position) || n < 1) {
            position = undefined;
        }
        else if (position < 0 || position >= n + m) {
            position = ((position - m / 2) % n + n) % n + m / 2;
        }
        return position;
    };
    /**
       * Converts an absolute position of an item into a relative one.
       * @param position The absolute position to convert.
       * @returns The converted position.
       */
    /**
     * Converts an absolute position of an item into a relative one.
     * @param {?} position The absolute position to convert.
     * @return {?} The converted position.
     */
    CarouselService.prototype.relative = /**
     * Converts an absolute position of an item into a relative one.
     * @param {?} position The absolute position to convert.
     * @return {?} The converted position.
     */
    function (position) {
        position -= this._clones.length / 2;
        return this.normalize(position, true);
    };
    /**
       * Gets the maximum position for the current item.
       * @param relative Whether to return an absolute position or a relative position.
       * @returns number of maximum position
       */
    /**
     * Gets the maximum position for the current item.
     * @param {?=} relative Whether to return an absolute position or a relative position.
     * @return {?} number of maximum position
     */
    CarouselService.prototype.maximum = /**
     * Gets the maximum position for the current item.
     * @param {?=} relative Whether to return an absolute position or a relative position.
     * @return {?} number of maximum position
     */
    function (relative) {
        if (relative === void 0) { relative = false; }
        /** @type {?} */
        var settings = this.settings;
        /** @type {?} */
        var maximum = this._coordinates.length;
        /** @type {?} */
        var iterator;
        /** @type {?} */
        var reciprocalItemsWidth;
        /** @type {?} */
        var elementWidth;
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
    };
    /**
       * Gets the minimum position for the current item.
       * @param relative Whether to return an absolute position or a relative position.
       * @returns number of minimum position
       */
    /**
     * Gets the minimum position for the current item.
     * @param {?=} relative Whether to return an absolute position or a relative position.
     * @return {?} number of minimum position
     */
    CarouselService.prototype.minimum = /**
     * Gets the minimum position for the current item.
     * @param {?=} relative Whether to return an absolute position or a relative position.
     * @return {?} number of minimum position
     */
    function (relative) {
        if (relative === void 0) { relative = false; }
        return relative ? 0 : this._clones.length / 2;
    };
    /**
       * Gets an item at the specified relative position.
       * @param position The relative position of the item.
       * @returns The item at the given position or all items if no position was given.
       */
    /**
     * Gets an item at the specified relative position.
     * @param {?=} position The relative position of the item.
     * @return {?} The item at the given position or all items if no position was given.
     */
    CarouselService.prototype.items = /**
     * Gets an item at the specified relative position.
     * @param {?=} position The relative position of the item.
     * @return {?} The item at the given position or all items if no position was given.
     */
    function (position) {
        if (position === undefined) {
            return this._items.slice();
        }
        position = this.normalize(position, true);
        return [this._items[position]];
    };
    /**
       * Gets an item at the specified relative position.
       * @param position The relative position of the item.
       * @returns The item at the given position or all items if no position was given.
       */
    /**
     * Gets an item at the specified relative position.
     * @param {?} position The relative position of the item.
     * @return {?} The item at the given position or all items if no position was given.
     */
    CarouselService.prototype.mergers = /**
     * Gets an item at the specified relative position.
     * @param {?} position The relative position of the item.
     * @return {?} The item at the given position or all items if no position was given.
     */
    function (position) {
        if (position === undefined) {
            return this._mergers.slice();
        }
        position = this.normalize(position, true);
        return this._mergers[position];
    };
    /**
       * Gets the absolute positions of clones for an item.
       * @param position The relative position of the item.
       * @returns The absolute positions of clones for the item or all if no position was given.
       */
    /**
     * Gets the absolute positions of clones for an item.
     * @param {?=} position The relative position of the item.
     * @return {?} The absolute positions of clones for the item or all if no position was given.
     */
    CarouselService.prototype.clones = /**
     * Gets the absolute positions of clones for an item.
     * @param {?=} position The relative position of the item.
     * @return {?} The absolute positions of clones for the item or all if no position was given.
     */
    function (position) {
        /** @type {?} */
        var odd = this._clones.length / 2;
        /** @type {?} */
        var even = odd + this._items.length;
        /** @type {?} */
        var map = function (index) { return index % 2 === 0 ? even + index / 2 : odd - (index + 1) / 2; };
        if (position === undefined) {
            return this._clones.map(function (v, i) { return map(i); });
        }
        return this._clones.map(function (v, i) { return v === position ? map(i) : null; }).filter(function (item) { return item; });
    };
    /**
       * Sets the current animation speed.
       * @param speed The animation speed in milliseconds or nothing to leave it unchanged.
       * @returns The current animation speed in milliseconds.
       */
    /**
     * Sets the current animation speed.
     * @param {?=} speed The animation speed in milliseconds or nothing to leave it unchanged.
     * @return {?} The current animation speed in milliseconds.
     */
    CarouselService.prototype.speed = /**
     * Sets the current animation speed.
     * @param {?=} speed The animation speed in milliseconds or nothing to leave it unchanged.
     * @return {?} The current animation speed in milliseconds.
     */
    function (speed) {
        if (speed !== undefined) {
            this._speed = speed;
        }
        return this._speed;
    };
    /**
       * Gets the coordinate of an item.
       * @todo The name of this method is missleanding.
       * @param position The absolute position of the item within `minimum()` and `maximum()`.
       * @returns The coordinate of the item in pixel or all coordinates.
       */
    /**
     * Gets the coordinate of an item.
     * \@todo The name of this method is missleanding.
     * @param {?=} position The absolute position of the item within `minimum()` and `maximum()`.
     * @return {?} The coordinate of the item in pixel or all coordinates.
     */
    CarouselService.prototype.coordinates = /**
     * Gets the coordinate of an item.
     * \@todo The name of this method is missleanding.
     * @param {?=} position The absolute position of the item within `minimum()` and `maximum()`.
     * @return {?} The coordinate of the item in pixel or all coordinates.
     */
    function (position) {
        var _this = this;
        /** @type {?} */
        var multiplier = 1;
        /** @type {?} */
        var newPosition = position - 1;
        /** @type {?} */
        var coordinate;
        /** @type {?} */
        var result;
        if (position === undefined) {
            result = this._coordinates.map(function (item, index) {
                return (/** @type {?} */ (_this.coordinates(index)));
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
    };
    /**
       * Calculates the speed for a translation.
       * @param from The absolute position of the start item.
       * @param to The absolute position of the target item.
       * @param factor [factor=undefined] - The time factor in milliseconds.
       * @returns The time in milliseconds for the translation.
       */
    /**
     * Calculates the speed for a translation.
     * @param {?} from The absolute position of the start item.
     * @param {?} to The absolute position of the target item.
     * @param {?=} factor [factor=undefined] - The time factor in milliseconds.
     * @return {?} The time in milliseconds for the translation.
     */
    CarouselService.prototype._duration = /**
     * Calculates the speed for a translation.
     * @param {?} from The absolute position of the start item.
     * @param {?} to The absolute position of the target item.
     * @param {?=} factor [factor=undefined] - The time factor in milliseconds.
     * @return {?} The time in milliseconds for the translation.
     */
    function (from, to, factor) {
        if (factor === 0) {
            return 0;
        }
        return Math.min(Math.max(Math.abs(to - from), 1), 6) * Math.abs((+factor || this.settings.smartSpeed));
    };
    /**
       * Slides to the specified item.
       * @param position The position of the item.
       * @param speed The time in milliseconds for the transition.
       */
    /**
     * Slides to the specified item.
     * @param {?} position The position of the item.
     * @param {?} speed The time in milliseconds for the transition.
     * @return {?}
     */
    CarouselService.prototype.to = /**
     * Slides to the specified item.
     * @param {?} position The position of the item.
     * @param {?} speed The time in milliseconds for the transition.
     * @return {?}
     */
    function (position, speed) {
        var _this = this;
        /** @type {?} */
        var current = this.current();
        /** @type {?} */
        var revert = null;
        /** @type {?} */
        var distance = position - this.relative(current);
        /** @type {?} */
        var maximum = this.maximum();
        /** @type {?} */
        var direction = +(distance > 0) - +(distance < 0);
        /** @type {?} */
        var items = this._items.length;
        /** @type {?} */
        var minimum = this.minimum();
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
        setTimeout(function () {
            _this.speed(_this._duration(current, position, speed));
            _this.current(position);
            _this.update();
        }, 0);
    };
    /**
       * Slides to the next item.
       * @param speed The time in milliseconds for the transition.
       */
    /**
     * Slides to the next item.
     * @param {?} speed The time in milliseconds for the transition.
     * @return {?}
     */
    CarouselService.prototype.next = /**
     * Slides to the next item.
     * @param {?} speed The time in milliseconds for the transition.
     * @return {?}
     */
    function (speed) {
        speed = speed || false;
        this.to(this.relative(this.current()) + 1, speed);
    };
    /**
       * Slides to the previous item.
       * @param speed The time in milliseconds for the transition.
       */
    /**
     * Slides to the previous item.
     * @param {?} speed The time in milliseconds for the transition.
     * @return {?}
     */
    CarouselService.prototype.prev = /**
     * Slides to the previous item.
     * @param {?} speed The time in milliseconds for the transition.
     * @return {?}
     */
    function (speed) {
        speed = speed || false;
        this.to(this.relative(this.current()) - 1, speed);
    };
    /**
       * Handles the end of an animation.
       * @param event - The event arguments.
       */
    /**
     * Handles the end of an animation.
     * @param {?=} event - The event arguments.
     * @return {?}
     */
    CarouselService.prototype.onTransitionEnd = /**
     * Handles the end of an animation.
     * @param {?=} event - The event arguments.
     * @return {?}
     */
    function (event) {
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
    };
    /**
       * Gets viewport width.
       * @returns - The width in pixel.
       */
    /**
     * Gets viewport width.
     * @return {?} - The width in pixel.
     */
    CarouselService.prototype._viewport = /**
     * Gets viewport width.
     * @return {?} - The width in pixel.
     */
    function () {
        /** @type {?} */
        var width;
        if (this._width) {
            width = this._width;
        }
        else {
            console.warn('Can not detect viewport width.');
        }
        return width;
    };
    /**
       * Sets _items
       * @param content The list of slides put into CarouselSlideDirectives.
       */
    /**
     * Sets _items
     * @param {?} content The list of slides put into CarouselSlideDirectives.
     * @return {?}
     */
    CarouselService.prototype.setItems = /**
     * Sets _items
     * @param {?} content The list of slides put into CarouselSlideDirectives.
     * @return {?}
     */
    function (content) {
        this._items = content;
    };
    /**
     * Sets slidesData using this._items
     */
    /**
     * Sets slidesData using this._items
     * @return {?}
     */
    CarouselService.prototype._defineSlidesData = /**
     * Sets slidesData using this._items
     * @return {?}
     */
    function () {
        // Maybe creating and using loadMap would be better in LazyLoadService.
        // Hovewer in that case when 'resize' event fires, prop 'load' of all slides will get 'false' and such state of prop will be seen by View during its updating. Accordingly the code will remove slides's content from DOM even if it was loaded before.
        // Thus it would be needed to add that content into DOM again.
        // In order to avoid additional removing/adding loaded slides's content we use loadMap here and set restore state of prop 'load' before the View will get it.
        /** @type {?} */
        var loadMap;
        if (this.slidesData && this.slidesData.length) {
            loadMap = new Map();
            this.slidesData.forEach(function (item) {
                if (item.load) {
                    loadMap.set(item.id, item.load);
                }
            });
        }
        this.slidesData = this._items.map(function (slide) {
            return {
                id: "" + slide.id,
                isActive: false,
                tplRef: slide.tplRef,
                dataMerge: slide.dataMerge,
                width: 0,
                isCloned: false,
                load: loadMap ? loadMap.get(slide.id) : false,
                hashFragment: slide.dataHash
            };
        });
    };
    /**
     * Sets current classes for slide
     * @param slide Slide of carousel
     * @returns object with names of css-classes which are keys and true/false values
     */
    /**
     * Sets current classes for slide
     * @param {?} slide Slide of carousel
     * @return {?} object with names of css-classes which are keys and true/false values
     */
    CarouselService.prototype.setCurSlideClasses = /**
     * Sets current classes for slide
     * @param {?} slide Slide of carousel
     * @return {?} object with names of css-classes which are keys and true/false values
     */
    function (slide) {
        // CSS classes: added/removed per current state of component properties
        /** @type {?} */
        var currentClasses = {
            'active': slide.isActive,
            'center': slide.isCentered,
            'cloned': slide.isCloned,
            'animated': slide.isAnimated,
            'owl-animated-in': slide.isDefAnimatedIn,
            'owl-animated-out': slide.isDefAnimatedOut
        };
        if (this.settings.animateIn) {
            currentClasses[(/** @type {?} */ (this.settings.animateIn))] = slide.isCustomAnimatedIn;
        }
        if (this.settings.animateOut) {
            currentClasses[(/** @type {?} */ (this.settings.animateOut))] = slide.isCustomAnimatedOut;
        }
        return currentClasses;
    };
    /**
       * Operators to calculate right-to-left and left-to-right.
       * @param a - The left side operand.
       * @param o - The operator.
       * @param b - The right side operand.
       * @returns true/false meaning right-to-left or left-to-right
       */
    /**
     * Operators to calculate right-to-left and left-to-right.
     * @param {?} a - The left side operand.
     * @param {?} o - The operator.
     * @param {?} b - The right side operand.
     * @return {?} true/false meaning right-to-left or left-to-right
     */
    CarouselService.prototype._op = /**
     * Operators to calculate right-to-left and left-to-right.
     * @param {?} a - The left side operand.
     * @param {?} o - The operator.
     * @param {?} b - The right side operand.
     * @return {?} true/false meaning right-to-left or left-to-right
     */
    function (a, o, b) {
        /** @type {?} */
        var rtl = this.settings.rtl;
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
    };
    /**
       * Triggers a public event.
       * @todo Remove `status`, `relatedTarget` should be used instead.
       * @param name The event name.
       * @param data The event data.
       * @param namespace The event namespace.
       * @param state The state which is associated with the event.
       * @param enter Indicates if the call enters the specified state or not.
       */
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
    CarouselService.prototype._trigger = /**
     * Triggers a public event.
     * \@todo Remove `status`, `relatedTarget` should be used instead.
     * @param {?} name The event name.
     * @param {?=} data The event data.
     * @param {?=} namespace The event namespace.
     * @param {?=} state The state which is associated with the event.
     * @param {?=} enter Indicates if the call enters the specified state or not.
     * @return {?}
     */
    function (name, data, namespace, state$$1, enter) {
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
    };
    /**
     * Enters a state.
     * @param name - The state name.
     */
    /**
     * Enters a state.
     * @param {?} name - The state name.
     * @return {?}
     */
    CarouselService.prototype.enter = /**
     * Enters a state.
     * @param {?} name - The state name.
     * @return {?}
     */
    function (name) {
        var _this = this;
        [name].concat(this._states.tags[name] || []).forEach(function (stateName) {
            if (_this._states.current[stateName] === undefined) {
                _this._states.current[stateName] = 0;
            }
            _this._states.current[stateName]++;
        });
    };
    /**
       * Leaves a state.
       * @param name - The state name.
       */
    /**
     * Leaves a state.
     * @param {?} name - The state name.
     * @return {?}
     */
    CarouselService.prototype.leave = /**
     * Leaves a state.
     * @param {?} name - The state name.
     * @return {?}
     */
    function (name) {
        var _this = this;
        [name].concat(this._states.tags[name] || []).forEach(function (stateName) {
            if (_this._states.current[stateName] === 0 || !!_this._states.current[stateName]) {
                _this._states.current[stateName]--;
            }
        });
    };
    /**
       * Registers an event or state.
       * @param object - The event or state to register.
       */
    /**
     * Registers an event or state.
     * @param {?} object - The event or state to register.
     * @return {?}
     */
    CarouselService.prototype.register = /**
     * Registers an event or state.
     * @param {?} object - The event or state to register.
     * @return {?}
     */
    function (object) {
        var _this = this;
        if (object.type === Type.State) {
            if (!this._states.tags[object.name]) {
                this._states.tags[object.name] = object.tags;
            }
            else {
                this._states.tags[object.name] = this._states.tags[object.name].concat(object.tags);
            }
            this._states.tags[object.name] = this._states.tags[object.name].filter(function (tag, i) {
                return _this._states.tags[object.name].indexOf(tag) === i;
            });
        }
    };
    /**
       * Suppresses events.
       * @param events The events to suppress.
       */
    /**
     * Suppresses events.
     * @param {?} events The events to suppress.
     * @return {?}
     */
    CarouselService.prototype._suppress = /**
     * Suppresses events.
     * @param {?} events The events to suppress.
     * @return {?}
     */
    function (events) {
        var _this = this;
        events.forEach(function (event) {
            _this._supress[event] = true;
        });
    };
    /**
       * Releases suppressed events.
       * @param events The events to release.
       */
    /**
     * Releases suppressed events.
     * @param {?} events The events to release.
     * @return {?}
     */
    CarouselService.prototype._release = /**
     * Releases suppressed events.
     * @param {?} events The events to release.
     * @return {?}
     */
    function (events) {
        var _this = this;
        events.forEach(function (event) {
            delete _this._supress[event];
        });
    };
    /**
       * Gets unified pointer coordinates from event.
       * @todo #261
       * @param event The `mousedown` or `touchstart` event.
       * @returns Object Coords which contains `x` and `y` coordinates of current pointer position.
       */
    /**
     * Gets unified pointer coordinates from event.
     * \@todo #261
     * @param {?} event The `mousedown` or `touchstart` event.
     * @return {?} Object Coords which contains `x` and `y` coordinates of current pointer position.
     */
    CarouselService.prototype.pointer = /**
     * Gets unified pointer coordinates from event.
     * \@todo #261
     * @param {?} event The `mousedown` or `touchstart` event.
     * @return {?} Object Coords which contains `x` and `y` coordinates of current pointer position.
     */
    function (event) {
        /** @type {?} */
        var result = { x: null, y: null };
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
    };
    /**
       * Determines if the input is a Number or something that can be coerced to a Number
       * @param number The input to be tested
       * @returns An indication if the input is a Number or can be coerced to a Number
       */
    /**
     * Determines if the input is a Number or something that can be coerced to a Number
     * @param {?} number The input to be tested
     * @return {?} An indication if the input is a Number or can be coerced to a Number
     */
    CarouselService.prototype._isNumeric = /**
     * Determines if the input is a Number or something that can be coerced to a Number
     * @param {?} number The input to be tested
     * @return {?} An indication if the input is a Number or can be coerced to a Number
     */
    function (number) {
        return !isNaN(parseFloat(number));
    };
    /**
     * Determines whether value is number or boolean type
     * @param value The input to be tested
     * @returns An indication if the input is a Number or can be coerced to a Number, or Boolean
     */
    /**
     * Determines whether value is number or boolean type
     * @param {?} value The input to be tested
     * @return {?} An indication if the input is a Number or can be coerced to a Number, or Boolean
     */
    CarouselService.prototype._isNumberOrBoolean = /**
     * Determines whether value is number or boolean type
     * @param {?} value The input to be tested
     * @return {?} An indication if the input is a Number or can be coerced to a Number, or Boolean
     */
    function (value) {
        return this._isNumeric(value) || typeof value === 'boolean';
    };
    /**
     * Determines whether value is number or string type
     * @param value The input to be tested
     * @returns An indication if the input is a Number or can be coerced to a Number, or String
     */
    /**
     * Determines whether value is number or string type
     * @param {?} value The input to be tested
     * @return {?} An indication if the input is a Number or can be coerced to a Number, or String
     */
    CarouselService.prototype._isNumberOrString = /**
     * Determines whether value is number or string type
     * @param {?} value The input to be tested
     * @return {?} An indication if the input is a Number or can be coerced to a Number, or String
     */
    function (value) {
        return this._isNumeric(value) || typeof value === 'string';
    };
    /**
     * Determines whether value is number or string type
     * @param value The input to be tested
     * @returns An indication if the input is a Number or can be coerced to a Number, or String
     */
    /**
     * Determines whether value is number or string type
     * @param {?} value The input to be tested
     * @return {?} An indication if the input is a Number or can be coerced to a Number, or String
     */
    CarouselService.prototype._isStringOrBoolean = /**
     * Determines whether value is number or string type
     * @param {?} value The input to be tested
     * @return {?} An indication if the input is a Number or can be coerced to a Number, or String
     */
    function (value) {
        return typeof value === 'string' || typeof value === 'boolean';
    };
    /**
       * Gets the difference of two vectors.
       * @todo #261
       * @param first The first vector.
       * @param second- The second vector.
       * @returns The difference.
       */
    /**
     * Gets the difference of two vectors.
     * \@todo #261
     * @param {?} first The first vector.
     * @param {?} second
     * @return {?} The difference.
     */
    CarouselService.prototype.difference = /**
     * Gets the difference of two vectors.
     * \@todo #261
     * @param {?} first The first vector.
     * @param {?} second
     * @return {?} The difference.
     */
    function (first$$1, second) {
        return {
            x: first$$1.x - second.x,
            y: first$$1.y - second.y
        };
    };
    CarouselService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    CarouselService.ctorParameters = function () { return []; };
    return CarouselService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var NavigationService = /** @class */ (function () {
    function NavigationService(carouselService) {
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
     * @return {?}
     */
    NavigationService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.navSubscription.unsubscribe();
    };
    /**
     * Defines Observables which service must observe
     */
    /**
     * Defines Observables which service must observe
     * @return {?}
     */
    NavigationService.prototype.spyDataStreams = /**
     * Defines Observables which service must observe
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var initializedCarousel$ = this.carouselService.getInitializedState().pipe(tap(function (state$$1) {
            _this.initialize();
            _this._updateNavPages();
            _this.draw();
            _this.update();
            _this.carouselService.sendChanges();
        }));
        // mostly changes in carouselService and carousel at all causes carouselService.to(). It moves stage right-left by its code and calling needed functions
        // Thus this method by calling carouselService.current(position) notifies about changes
        /** @type {?} */
        var changedSettings$ = this.carouselService.getChangedState().pipe(filter(function (data) { return data.property.name === 'position'; }), tap(function (data) {
            _this.update();
            // should be the call of the function written at the end of comment
            // but the method carouselServive.to() has setTimeout(f, 0) which contains carouselServive.update() which calls sendChanges() method.
            // carouselService.navData and carouselService.dotsData update earlier than carouselServive.update() gets called
            // updates of carouselService.navData and carouselService.dotsData are being happening withing carouselService.current(position) method which calls next() of _changedSettingsCarousel$
            // carouselService.current(position) is being calling earlier than carouselServive.update();
            // this.carouselService.sendChanges();
        }));
        /** @type {?} */
        var refreshedCarousel$ = this.carouselService.getRefreshedState().pipe(tap(function () {
            _this._updateNavPages();
            _this.draw();
            _this.update();
            _this.carouselService.sendChanges();
        }));
        /** @type {?} */
        var navMerge$ = merge(initializedCarousel$, changedSettings$, refreshedCarousel$);
        this.navSubscription = navMerge$.subscribe(function () { });
    };
    /**
       * Initializes the layout of the plugin and extends the carousel.
       */
    /**
     * Initializes the layout of the plugin and extends the carousel.
     * @return {?}
     */
    NavigationService.prototype.initialize = /**
     * Initializes the layout of the plugin and extends the carousel.
     * @return {?}
     */
    function () {
        this._navData.disabled = true;
        this._navData.prev.htmlText = this.carouselService.settings.navText[0];
        this._navData.next.htmlText = this.carouselService.settings.navText[1];
        this._dotsData.disabled = true;
        this.carouselService.navData = this._navData;
        this.carouselService.dotsData = this._dotsData;
    };
    /**
     * Calculates internal states and updates prop _pages
     */
    /**
     * Calculates internal states and updates prop _pages
     * @return {?}
     */
    NavigationService.prototype._updateNavPages = /**
     * Calculates internal states and updates prop _pages
     * @return {?}
     */
    function () {
        /** @type {?} */
        var i;
        /** @type {?} */
        var j;
        /** @type {?} */
        var k;
        /** @type {?} */
        var lower = this.carouselService.clones().length / 2;
        /** @type {?} */
        var upper = lower + this.carouselService.items().length;
        /** @type {?} */
        var maximum = this.carouselService.maximum(true);
        /** @type {?} */
        var pages = [];
        /** @type {?} */
        var settings = this.carouselService.settings;
        /** @type {?} */
        var size = settings.center || settings.autoWidth || settings.dotsData
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
                j += (/** @type {?} */ (this.carouselService.mergers(this.carouselService.relative(i))));
            }
        }
        this._pages = pages;
    };
    /**
       * Draws the user interface.
       * @todo The option `dotsData` wont work.
       */
    /**
     * Draws the user interface.
     * \@todo The option `dotsData` wont work.
     * @return {?}
     */
    NavigationService.prototype.draw = /**
     * Draws the user interface.
     * \@todo The option `dotsData` wont work.
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var difference;
        /** @type {?} */
        var settings = this.carouselService.settings;
        /** @type {?} */
        var items = this.carouselService.items();
        /** @type {?} */
        var disabled = items.length <= settings.items;
        this._navData.disabled = !settings.nav || disabled;
        this._dotsData.disabled = !settings.dots || disabled;
        if (settings.dots) {
            difference = this._pages.length - this._dotsData.dots.length;
            if (settings.dotsData && difference !== 0) {
                this._dotsData.dots = [];
                items.forEach(function (item) {
                    _this._dotsData.dots.push({
                        active: false,
                        id: "dot-" + item.id,
                        innerContent: item.dotContent,
                        showInnerContent: true
                    });
                });
            }
            else if (difference > 0) {
                /** @type {?} */
                var startI = this._dotsData.dots.length > 0 ? this._dotsData.dots.length : 0;
                for (var i = 0; i < difference; i++) {
                    this._dotsData.dots.push({
                        active: false,
                        id: "dot-" + (i + startI),
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
    };
    /**
     * Updates navigation buttons's and dots's states
     */
    /**
     * Updates navigation buttons's and dots's states
     * @return {?}
     */
    NavigationService.prototype.update = /**
     * Updates navigation buttons's and dots's states
     * @return {?}
     */
    function () {
        this._updateNavButtons();
        this._updateDots();
    };
    /**
     * Changes state of nav buttons (disabled, enabled)
     */
    /**
     * Changes state of nav buttons (disabled, enabled)
     * @return {?}
     */
    NavigationService.prototype._updateNavButtons = /**
     * Changes state of nav buttons (disabled, enabled)
     * @return {?}
     */
    function () {
        /** @type {?} */
        var settings = this.carouselService.settings;
        /** @type {?} */
        var loop = settings.loop || settings.rewind;
        /** @type {?} */
        var index = this.carouselService.relative(this.carouselService.current());
        if (settings.nav) {
            this._navData.prev.disabled = !loop && index <= this.carouselService.minimum(true);
            this._navData.next.disabled = !loop && index >= this.carouselService.maximum(true);
        }
        this.carouselService.navData = this._navData;
    };
    /**
     * Changes active dot if page becomes changed
     */
    /**
     * Changes active dot if page becomes changed
     * @return {?}
     */
    NavigationService.prototype._updateDots = /**
     * Changes active dot if page becomes changed
     * @return {?}
     */
    function () {
        /** @type {?} */
        var curActiveDotI;
        this._dotsData.dots.forEach(function (item) {
            if (item.active === true) {
                item.active = false;
            }
        });
        curActiveDotI = this._current();
        if (this._dotsData.dots.length) {
            this._dotsData.dots[curActiveDotI].active = true;
        }
        this.carouselService.dotsData = this._dotsData;
    };
    /**
       * Gets the current page position of the carousel.
       * @returns the current page position of the carousel
       */
    /**
     * Gets the current page position of the carousel.
     * @return {?} the current page position of the carousel
     */
    NavigationService.prototype._current = /**
     * Gets the current page position of the carousel.
     * @return {?} the current page position of the carousel
     */
    function () {
        /** @type {?} */
        var current = this.carouselService.relative(this.carouselService.current());
        /** @type {?} */
        var finalCurrent;
        /** @type {?} */
        var pages = this._pages.filter(function (page, index) {
            return page.start <= current && page.end >= current;
        }).pop();
        finalCurrent = this._pages.findIndex(function (page) {
            return page.start === pages.start && page.end === pages.end;
        });
        return finalCurrent;
    };
    /**
       * Gets the current succesor/predecessor position.
     * @param sussessor position of slide
       * @returns the current succesor/predecessor position
       */
    /**
     * Gets the current succesor/predecessor position.
     * @param {?} successor
     * @return {?} the current succesor/predecessor position
     */
    NavigationService.prototype._getPosition = /**
     * Gets the current succesor/predecessor position.
     * @param {?} successor
     * @return {?} the current succesor/predecessor position
     */
    function (successor) {
        /** @type {?} */
        var position;
        /** @type {?} */
        var length;
        /** @type {?} */
        var settings = this.carouselService.settings;
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
    };
    /**
       * Slides to the next item or page.
       * @param speed The time in milliseconds for the transition.
       */
    /**
     * Slides to the next item or page.
     * @param {?} speed The time in milliseconds for the transition.
     * @return {?}
     */
    NavigationService.prototype.next = /**
     * Slides to the next item or page.
     * @param {?} speed The time in milliseconds for the transition.
     * @return {?}
     */
    function (speed) {
        this.carouselService.to(this._getPosition(true), speed);
    };
    /**
     * Slides to the previous item or page.
     * @param speed The time in milliseconds for the transition.
     */
    /**
     * Slides to the previous item or page.
     * @param {?} speed The time in milliseconds for the transition.
     * @return {?}
     */
    NavigationService.prototype.prev = /**
     * Slides to the previous item or page.
     * @param {?} speed The time in milliseconds for the transition.
     * @return {?}
     */
    function (speed) {
        this.carouselService.to(this._getPosition(false), speed);
    };
    /**
     * Slides to the specified item or page.
     * @param position - The position of the item or page.
     * @param speed - The time in milliseconds for the transition.
     * @param standard - Whether to use the standard behaviour or not. Default meaning false
     */
    /**
     * Slides to the specified item or page.
     * @param {?} position - The position of the item or page.
     * @param {?} speed - The time in milliseconds for the transition.
     * @param {?=} standard - Whether to use the standard behaviour or not. Default meaning false
     * @return {?}
     */
    NavigationService.prototype.to = /**
     * Slides to the specified item or page.
     * @param {?} position - The position of the item or page.
     * @param {?} speed - The time in milliseconds for the transition.
     * @param {?=} standard - Whether to use the standard behaviour or not. Default meaning false
     * @return {?}
     */
    function (position, speed, standard) {
        /** @type {?} */
        var length;
        if (!standard && this._pages.length) {
            length = this._pages.length;
            this.carouselService.to(this._pages[((position % length) + length) % length].start, speed);
        }
        else {
            this.carouselService.to(position, speed);
        }
    };
    /**
     * Moves carousel after user's clicking on any dots
     */
    /**
     * Moves carousel after user's clicking on any dots
     * @param {?} dotId
     * @return {?}
     */
    NavigationService.prototype.moveByDot = /**
     * Moves carousel after user's clicking on any dots
     * @param {?} dotId
     * @return {?}
     */
    function (dotId) {
        /** @type {?} */
        var index = this._dotsData.dots.findIndex(function (dot) { return dotId === dot.id; });
        this.to(index, this.carouselService.settings.dotsSpeed);
    };
    /**
     * rewinds carousel to slide with needed id
     * @param id id of slide
     */
    /**
     * rewinds carousel to slide with needed id
     * @param {?} id id of slide
     * @return {?}
     */
    NavigationService.prototype.toSlideById = /**
     * rewinds carousel to slide with needed id
     * @param {?} id id of slide
     * @return {?}
     */
    function (id) {
        /** @type {?} */
        var position = this.carouselService.slidesData.findIndex(function (slide) { return slide.id === id && slide.isCloned === false; });
        if (position === -1 || position === this.carouselService.current()) {
            return;
        }
        this.carouselService.to(this.carouselService.relative(position), false);
    };
    NavigationService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    NavigationService.ctorParameters = function () { return [
        { type: CarouselService }
    ]; };
    return NavigationService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 * Create a new injection token for injecting the window into a component.
 * @type {?}
 */
var WINDOW = new InjectionToken('WindowToken');
/**
 * Define abstract class for obtaining reference to the global window object.
 * @abstract
 */
var  /**
 * Define abstract class for obtaining reference to the global window object.
 * @abstract
 */
WindowRef = /** @class */ (function () {
    function WindowRef() {
    }
    Object.defineProperty(WindowRef.prototype, "nativeWindow", {
        get: /**
         * @return {?}
         */
        function () {
            throw new Error('Not implemented.');
        },
        enumerable: true,
        configurable: true
    });
    return WindowRef;
}());
/**
 * Define class that implements the abstract class and returns the native window object.
 */
var  /**
 * Define class that implements the abstract class and returns the native window object.
 */
BrowserWindowRef = /** @class */ (function (_super) {
    __extends(BrowserWindowRef, _super);
    function BrowserWindowRef() {
        return _super.call(this) || this;
    }
    Object.defineProperty(BrowserWindowRef.prototype, "nativeWindow", {
        /**
         * @returns window object
         */
        get: /**
         * @return {?} window object
         */
        function () {
            return window;
        },
        enumerable: true,
        configurable: true
    });
    return BrowserWindowRef;
}(WindowRef));
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
/**
 * Create a injectable provider for the WindowRef token that uses the BrowserWindowRef class.
 * @type {?}
 */
var browserWindowProvider = {
    provide: WindowRef,
    useClass: BrowserWindowRef
};
/**
 * Create an injectable provider that uses the windowFactory function for returning the native window object.
 * @type {?}
 */
var windowProvider = {
    provide: WINDOW,
    useFactory: windowFactory,
    deps: [WindowRef, PLATFORM_ID]
};
/**
 * Create an array of providers.
 * @type {?}
 */
var WINDOW_PROVIDERS = [browserWindowProvider, windowProvider];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 * Create a new injection token for injecting the Document into a component.
 * @type {?}
 */
var DOCUMENT = new InjectionToken('DocumentToken');
/**
 * Define abstract class for obtaining reference to the global Document object.
 * @abstract
 */
var  /**
 * Define abstract class for obtaining reference to the global Document object.
 * @abstract
 */
DocumentRef = /** @class */ (function () {
    function DocumentRef() {
    }
    Object.defineProperty(DocumentRef.prototype, "nativeDocument", {
        get: /**
         * @return {?}
         */
        function () {
            throw new Error('Not implemented.');
        },
        enumerable: true,
        configurable: true
    });
    return DocumentRef;
}());
/**
 * Define class that implements the abstract class and returns the native Document object.
 */
var  /**
 * Define class that implements the abstract class and returns the native Document object.
 */
BrowserDocumentRef = /** @class */ (function (_super) {
    __extends(BrowserDocumentRef, _super);
    function BrowserDocumentRef() {
        return _super.call(this) || this;
    }
    Object.defineProperty(BrowserDocumentRef.prototype, "nativeDocument", {
        /**
         * @returns Document object
         */
        get: /**
         * @return {?} Document object
         */
        function () {
            return document;
        },
        enumerable: true,
        configurable: true
    });
    return BrowserDocumentRef;
}(DocumentRef));
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
/**
 * Create a injectable provider for the DocumentRef token that uses the BrowserDocumentRef class.
 * @type {?}
 */
var browserDocumentProvider = {
    provide: DocumentRef,
    useClass: BrowserDocumentRef
};
/**
 * Create an injectable provider that uses the DocumentFactory function for returning the native Document object.
 * @type {?}
 */
var documentProvider = {
    provide: DOCUMENT,
    useFactory: documentFactory,
    deps: [DocumentRef, PLATFORM_ID]
};
/**
 * Create an array of providers.
 * @type {?}
 */
var DOCUMENT_PROVIDERS = [browserDocumentProvider, documentProvider];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var AutoplayService = /** @class */ (function () {
    function AutoplayService(carouselService, winRef, docRef) {
        this.carouselService = carouselService;
        /**
         * The autoplay timeout.
         */
        this._timeout = null;
        /**
         * Indicates whenever the autoplay is paused.
         */
        this._paused = false;
        this.winRef = (/** @type {?} */ (winRef));
        this.docRef = (/** @type {?} */ (docRef));
        this.spyDataStreams();
    }
    /**
     * @return {?}
     */
    AutoplayService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.autoplaySubscription.unsubscribe();
    };
    /**
     * Defines Observables which service must observe
     */
    /**
     * Defines Observables which service must observe
     * @return {?}
     */
    AutoplayService.prototype.spyDataStreams = /**
     * Defines Observables which service must observe
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var initializedCarousel$ = this.carouselService.getInitializedState().pipe(tap(function () {
            if (_this.carouselService.settings.autoplay) {
                _this.play();
            }
        }));
        /** @type {?} */
        var changedSettings$ = this.carouselService.getChangedState().pipe(tap(function (data) {
            _this._handleChangeObservable(data);
        }));
        // original Autoplay Plugin has listeners on play.owl.core and stop.owl.core events.
        // They are triggered by Video Plugin
        /** @type {?} */
        var autoplayMerge$ = merge(initializedCarousel$, changedSettings$);
        this.autoplaySubscription = autoplayMerge$.subscribe(function () { });
    };
    /**
       * Starts the autoplay.
       * @param timeout The interval before the next animation starts.
       * @param speed The animation speed for the animations.
       */
    /**
     * Starts the autoplay.
     * @param {?=} timeout The interval before the next animation starts.
     * @param {?=} speed The animation speed for the animations.
     * @return {?}
     */
    AutoplayService.prototype.play = /**
     * Starts the autoplay.
     * @param {?=} timeout The interval before the next animation starts.
     * @param {?=} speed The animation speed for the animations.
     * @return {?}
     */
    function (timeout, speed) {
        if (this._paused) {
            this._paused = false;
            this._setAutoPlayInterval();
        }
        if (this.carouselService.is('rotating')) {
            return;
        }
        this.carouselService.enter('rotating');
        this._setAutoPlayInterval();
    };
    /**
       * Gets a new timeout
       * @param timeout - The interval before the next animation starts.
       * @param speed - The animation speed for the animations.
       * @return
       */
    /**
     * Gets a new timeout
     * @param {?=} timeout - The interval before the next animation starts.
     * @param {?=} speed - The animation speed for the animations.
     * @return {?}
     */
    AutoplayService.prototype._getNextTimeout = /**
     * Gets a new timeout
     * @param {?=} timeout - The interval before the next animation starts.
     * @param {?=} speed - The animation speed for the animations.
     * @return {?}
     */
    function (timeout, speed) {
        var _this = this;
        if (this._timeout) {
            this.winRef.clearTimeout(this._timeout);
        }
        return this.winRef.setTimeout(function () {
            if (_this._paused || _this.carouselService.is('busy') || _this.carouselService.is('interacting') || _this.docRef.hidden) {
                return;
            }
            _this.carouselService.next(speed || _this.carouselService.settings.autoplaySpeed);
        }, timeout || this.carouselService.settings.autoplayTimeout);
    };
    /**
       * Sets autoplay in motion.
       */
    /**
     * Sets autoplay in motion.
     * @return {?}
     */
    AutoplayService.prototype._setAutoPlayInterval = /**
     * Sets autoplay in motion.
     * @return {?}
     */
    function () {
        this._timeout = this._getNextTimeout();
    };
    /**
     * Stops the autoplay.
     */
    /**
     * Stops the autoplay.
     * @return {?}
     */
    AutoplayService.prototype.stop = /**
     * Stops the autoplay.
     * @return {?}
     */
    function () {
        if (!this.carouselService.is('rotating')) {
            return;
        }
        this.winRef.clearTimeout(this._timeout);
        this.carouselService.leave('rotating');
    };
    /**
       * Stops the autoplay.
       */
    /**
     * Stops the autoplay.
     * @return {?}
     */
    AutoplayService.prototype.pause = /**
     * Stops the autoplay.
     * @return {?}
     */
    function () {
        if (!this.carouselService.is('rotating')) {
            return;
        }
        this._paused = true;
    };
    /**
     * Manages by autoplaying according to data passed by _changedSettingsCarousel$ Obsarvable
     * @param data object with current position of carousel and type of change
     */
    /**
     * Manages by autoplaying according to data passed by _changedSettingsCarousel$ Obsarvable
     * @param {?} data object with current position of carousel and type of change
     * @return {?}
     */
    AutoplayService.prototype._handleChangeObservable = /**
     * Manages by autoplaying according to data passed by _changedSettingsCarousel$ Obsarvable
     * @param {?} data object with current position of carousel and type of change
     * @return {?}
     */
    function (data) {
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
    };
    /**
     * Starts pausing
     */
    /**
     * Starts pausing
     * @return {?}
     */
    AutoplayService.prototype.startPausing = /**
     * Starts pausing
     * @return {?}
     */
    function () {
        if (this.carouselService.settings.autoplayHoverPause && this.carouselService.is('rotating')) {
            this.pause();
        }
    };
    /**
     * Starts playing after mouse leaves carousel
     */
    /**
     * Starts playing after mouse leaves carousel
     * @return {?}
     */
    AutoplayService.prototype.startPlayingMouseLeave = /**
     * Starts playing after mouse leaves carousel
     * @return {?}
     */
    function () {
        if (this.carouselService.settings.autoplayHoverPause && this.carouselService.is('rotating')) {
            this.pause();
        }
    };
    /**
     * Starts playing after touch ends
     */
    /**
     * Starts playing after touch ends
     * @return {?}
     */
    AutoplayService.prototype.startPlayingTouchEnd = /**
     * Starts playing after touch ends
     * @return {?}
     */
    function () {
        if (this.carouselService.settings.autoplayHoverPause && this.carouselService.is('rotating')) {
            this.pause();
        }
    };
    AutoplayService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    AutoplayService.ctorParameters = function () { return [
        { type: CarouselService },
        { type: undefined, decorators: [{ type: Inject, args: [WINDOW,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    return AutoplayService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var LazyLoadService = /** @class */ (function () {
    function LazyLoadService(carouselService) {
        this.carouselService = carouselService;
        this.spyDataStreams();
    }
    /**
     * @return {?}
     */
    LazyLoadService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.lazyLoadSubscription.unsubscribe();
    };
    /**
     * Defines Observables which service must observe
     */
    /**
     * Defines Observables which service must observe
     * @return {?}
     */
    LazyLoadService.prototype.spyDataStreams = /**
     * Defines Observables which service must observe
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var initializedCarousel$ = this.carouselService.getInitializedState().pipe(tap(function () {
            /** @type {?} */
            var isLazyLoad = _this.carouselService.settings && !_this.carouselService.settings.lazyLoad;
            _this.carouselService.slidesData.forEach(function (item) { return item.load = isLazyLoad ? true : false; });
        }));
        /** @type {?} */
        var changeSettings$ = this.carouselService.getChangeState();
        /** @type {?} */
        var resizedCarousel$ = this.carouselService.getResizedState();
        /** @type {?} */
        var lazyLoadMerge$ = merge(initializedCarousel$, changeSettings$, resizedCarousel$).pipe(tap(function (data) { return _this._defineLazyLoadSlides(data); }));
        this.lazyLoadSubscription = lazyLoadMerge$.subscribe(function () { });
    };
    /**
     * @param {?} data
     * @return {?}
     */
    LazyLoadService.prototype._defineLazyLoadSlides = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        if (!this.carouselService.settings || !this.carouselService.settings.lazyLoad) {
            return;
        }
        if ((data.property && data.property.name === 'position') || data === 'initialized' || data === "resized") {
            /** @type {?} */
            var settings = this.carouselService.settings;
            /** @type {?} */
            var clones = this.carouselService.clones().length;
            /** @type {?} */
            var n = (settings.center && Math.ceil(settings.items / 2) || settings.items);
            /** @type {?} */
            var i = ((settings.center && n * -1) || 0);
            /** @type {?} */
            var position = (data.property && data.property.value !== undefined ? data.property.value : this.carouselService.current()) + i;
            // load = $.proxy(function(i, v) { this.load(v) }, this);
            //TODO: Need documentation for this new option
            if (settings.lazyLoadEager > 0) {
                n += settings.lazyLoadEager;
                // If the carousel is looping also preload images that are to the "left"
                if (settings.loop) {
                    position -= settings.lazyLoadEager;
                    n++;
                }
            }
            while (i++ < n) {
                this._load(clones / 2 + this.carouselService.relative(position));
                if (clones) {
                    this.carouselService.clones(this.carouselService.relative(position)).forEach(function (value) { return _this._load(value); });
                }
                position++;
            }
        }
    };
    /**
       * Loads all resources of an item at the specified position.
       * @param position - The absolute position of the item.
       */
    /**
     * Loads all resources of an item at the specified position.
     * @param {?} position - The absolute position of the item.
     * @return {?}
     */
    LazyLoadService.prototype._load = /**
     * Loads all resources of an item at the specified position.
     * @param {?} position - The absolute position of the item.
     * @return {?}
     */
    function (position) {
        if (this.carouselService.slidesData[position].load) {
            return;
        }
        this.carouselService.slidesData[position].load = true;
    };
    LazyLoadService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    LazyLoadService.ctorParameters = function () { return [
        { type: CarouselService }
    ]; };
    return LazyLoadService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var AnimateService = /** @class */ (function () {
    function AnimateService(carouselService) {
        this.carouselService = carouselService;
        /**
         * s
         */
        this.swapping = true;
        /**
         * active slide before translating
         */
        this.previous = undefined;
        /**
         * new active slide after translating
         */
        this.next = undefined;
        this.spyDataStreams();
    }
    /**
     * @return {?}
     */
    AnimateService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.animateSubscription.unsubscribe();
    };
    /**
     * Defines Observables which service must observe
     */
    /**
     * Defines Observables which service must observe
     * @return {?}
     */
    AnimateService.prototype.spyDataStreams = /**
     * Defines Observables which service must observe
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var changeSettings$ = this.carouselService.getChangeState().pipe(tap(function (data) {
            if (data.property.name === 'position') {
                _this.previous = _this.carouselService.current();
                _this.next = data.property.value;
            }
        }));
        /** @type {?} */
        var dragCarousel$ = this.carouselService.getDragState();
        /** @type {?} */
        var draggedCarousel$ = this.carouselService.getDraggedState();
        /** @type {?} */
        var translatedCarousel$ = this.carouselService.getTranslatedState();
        /** @type {?} */
        var dragTranslatedMerge$ = merge(dragCarousel$, draggedCarousel$, translatedCarousel$).pipe(tap(function (data) { return _this.swapping = data === 'translated'; }));
        /** @type {?} */
        var translateCarousel$ = this.carouselService.getTranslateState().pipe(tap(function (data) {
            if (_this.swapping && (_this.carouselService._options.animateOut || _this.carouselService._options.animateIn)) {
                _this._swap();
            }
        }));
        /** @type {?} */
        var animateMerge$ = merge(changeSettings$, translateCarousel$, dragTranslatedMerge$).pipe();
        this.animateSubscription = animateMerge$.subscribe(function () { });
    };
    /**
       * Toggles the animation classes whenever an translations starts.
       * @returns
       */
    /**
     * Toggles the animation classes whenever an translations starts.
     * @return {?}
     */
    AnimateService.prototype._swap = /**
     * Toggles the animation classes whenever an translations starts.
     * @return {?}
     */
    function () {
        if (this.carouselService.settings.items !== 1) {
            return;
        }
        // if (!$.support.animation || !$.support.transition) {
        // 	return;
        // }
        this.carouselService.speed(0);
        /** @type {?} */
        var left;
        /** @type {?} */
        var previous = this.carouselService.slidesData[this.previous];
        /** @type {?} */
        var next = this.carouselService.slidesData[this.next];
        /** @type {?} */
        var incoming = this.carouselService.settings.animateIn;
        /** @type {?} */
        var outgoing = this.carouselService.settings.animateOut;
        if (this.carouselService.current() === this.previous) {
            return;
        }
        if (outgoing) {
            left = +this.carouselService.coordinates(this.previous) - +this.carouselService.coordinates(this.next);
            this.carouselService.slidesData.forEach(function (slide) {
                if (slide.id === previous.id) {
                    slide.left = left + "px";
                    slide.isAnimated = true;
                    slide.isDefAnimatedOut = true;
                    slide.isCustomAnimatedOut = true;
                }
            });
        }
        if (incoming) {
            this.carouselService.slidesData.forEach(function (slide) {
                if (slide.id === next.id) {
                    slide.isAnimated = true;
                    slide.isDefAnimatedIn = true;
                    slide.isCustomAnimatedIn = true;
                }
            });
        }
    };
    /**
     * Handles the end of 'animationend' event
     * @param id Id of slides
     */
    /**
     * Handles the end of 'animationend' event
     * @param {?} id Id of slides
     * @return {?}
     */
    AnimateService.prototype.clear = /**
     * Handles the end of 'animationend' event
     * @param {?} id Id of slides
     * @return {?}
     */
    function (id) {
        var _this = this;
        this.carouselService.slidesData.forEach(function (slide) {
            if (slide.id === id) {
                slide.left = '';
                slide.isAnimated = false;
                slide.isDefAnimatedOut = false;
                slide.isCustomAnimatedOut = false;
                slide.isDefAnimatedIn = false;
                slide.isCustomAnimatedIn = false;
                slide.classes = _this.carouselService.setCurSlideClasses(slide);
            }
        });
        this.carouselService.onTransitionEnd();
    };
    AnimateService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    AnimateService.ctorParameters = function () { return [
        { type: CarouselService }
    ]; };
    return AnimateService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var AutoHeightService = /** @class */ (function () {
    function AutoHeightService(carouselService) {
        this.carouselService = carouselService;
        this.spyDataStreams();
    }
    /**
     * @return {?}
     */
    AutoHeightService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.autoHeightSubscription.unsubscribe();
    };
    /**
     * Defines Observables which service must observe
     */
    /**
     * Defines Observables which service must observe
     * @return {?}
     */
    AutoHeightService.prototype.spyDataStreams = /**
     * Defines Observables which service must observe
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var initializedCarousel$ = this.carouselService.getInitializedState().pipe(tap(function (data) {
            if (_this.carouselService.settings.autoHeight) {
                _this.update();
            }
            else {
                _this.carouselService.slidesData.forEach(function (slide) { return slide.heightState = 'full'; });
            }
        }));
        /** @type {?} */
        var changedSettings$ = this.carouselService.getChangedState().pipe(tap(function (data) {
            if (_this.carouselService.settings.autoHeight && data.property.name === 'position') {
                _this.update();
            }
        }));
        /** @type {?} */
        var refreshedCarousel$ = this.carouselService.getRefreshedState().pipe(tap(function (data) {
            if (_this.carouselService.settings.autoHeight) {
                _this.update();
            }
        }));
        /** @type {?} */
        var autoHeight$ = merge(initializedCarousel$, changedSettings$, refreshedCarousel$);
        this.autoHeightSubscription = autoHeight$.subscribe(function () { });
    };
    /**
     * Updates the prop 'heightState' of slides
     */
    /**
     * Updates the prop 'heightState' of slides
     * @return {?}
     */
    AutoHeightService.prototype.update = /**
     * Updates the prop 'heightState' of slides
     * @return {?}
     */
    function () {
        /** @type {?} */
        var items = this.carouselService.settings.items;
        /** @type {?} */
        var start = this.carouselService.current();
        /** @type {?} */
        var end = start + items;
        if (this.carouselService.settings.center) {
            start = items % 2 === 1 ? start - (items - 1) / 2 : start - items / 2;
            end = items % 2 === 1 ? start + items : start + items + 1;
        }
        this.carouselService.slidesData.forEach(function (slide, i) {
            slide.heightState = (i >= start && i < end) ? 'full' : 'nulled';
        });
    };
    AutoHeightService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    AutoHeightService.ctorParameters = function () { return [
        { type: CarouselService }
    ]; };
    return AutoHeightService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var HashService = /** @class */ (function () {
    function HashService(carouselService, route, router) {
        this.carouselService = carouselService;
        this.route = route;
        this.router = router;
        this.spyDataStreams();
    }
    /**
     * @return {?}
     */
    HashService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.hashSubscription.unsubscribe();
    };
    /**
     * Defines Observables which service must observe
     */
    /**
     * Defines Observables which service must observe
     * @return {?}
     */
    HashService.prototype.spyDataStreams = /**
     * Defines Observables which service must observe
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var initializedCarousel$ = this.carouselService.getInitializedState().pipe(tap(function () { return _this.listenToRoute(); }));
        /** @type {?} */
        var changedSettings$ = this.carouselService.getChangedState().pipe(tap(function (data) {
            if (_this.carouselService.settings.URLhashListener && data.property.name === 'position') {
                /** @type {?} */
                var newCurSlide = _this.carouselService.current();
                /** @type {?} */
                var newCurFragment = _this.carouselService.slidesData[newCurSlide].hashFragment;
                if (!newCurFragment || newCurFragment === _this.currentHashFragment) {
                    return;
                }
                _this.router.navigate(['./'], { fragment: newCurFragment, relativeTo: _this.route });
            }
        }));
        /** @type {?} */
        var hashFragment$ = merge(initializedCarousel$, changedSettings$);
        this.hashSubscription = hashFragment$.subscribe(function () { });
    };
    /**
     * rewinds carousel to slide which has the same hashFragment as fragment of current url
     * @param fragment fragment of url
     */
    /**
     * rewinds carousel to slide which has the same hashFragment as fragment of current url
     * @param {?} fragment fragment of url
     * @return {?}
     */
    HashService.prototype.rewind = /**
     * rewinds carousel to slide which has the same hashFragment as fragment of current url
     * @param {?} fragment fragment of url
     * @return {?}
     */
    function (fragment) {
        /** @type {?} */
        var position = this.carouselService.slidesData.findIndex(function (slide) { return slide.hashFragment === fragment && slide.isCloned === false; });
        if (position === -1 || position === this.carouselService.current()) {
            return;
        }
        this.carouselService.to(this.carouselService.relative(position), false);
    };
    /**
     * Initiate listening to ActivatedRoute.fragment
     */
    /**
     * Initiate listening to ActivatedRoute.fragment
     * @return {?}
     */
    HashService.prototype.listenToRoute = /**
     * Initiate listening to ActivatedRoute.fragment
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var count = this.carouselService.settings.startPosition === 'URLHash' ? 0 : 2;
        this.route.fragment.pipe(skip(count))
            .subscribe(function (fragment) {
            _this.currentHashFragment = fragment;
            _this.rewind(fragment);
        });
    };
    HashService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    HashService.ctorParameters = function () { return [
        { type: CarouselService },
        { type: ActivatedRoute },
        { type: Router }
    ]; };
    return HashService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/** @type {?} */
var nextId = 0;
var CarouselSlideDirective = /** @class */ (function () {
    function CarouselSlideDirective(tplRef) {
        this.tplRef = tplRef;
        /**
         * Unique slide identifier. Must be unique for the entire document for proper accessibility support.
         * Will be auto-generated if not provided.
         */
        this.id = "owl-slide-" + nextId++;
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
        /**
         * Hash (fragment) of url which corresponds to certain slide
         */
        this.dataHash = '';
    }
    Object.defineProperty(CarouselSlideDirective.prototype, "dataMerge", {
        get: /**
         * @return {?}
         */
        function () { return this._dataMerge; },
        set: /**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            this._dataMerge = this.isNumeric(data) ? data : 1;
        },
        enumerable: true,
        configurable: true
    });
    /**
       * Determines if the input is a Number or something that can be coerced to a Number
       * @param - The input to be tested
       * @returns - An indication if the input is a Number or can be coerced to a Number
       */
    /**
     * Determines if the input is a Number or something that can be coerced to a Number
     * @param {?} number
     * @return {?} - An indication if the input is a Number or can be coerced to a Number
     */
    CarouselSlideDirective.prototype.isNumeric = /**
     * Determines if the input is a Number or something that can be coerced to a Number
     * @param {?} number
     * @return {?} - An indication if the input is a Number or can be coerced to a Number
     */
    function (number) {
        return !isNaN(parseFloat(number));
    };
    CarouselSlideDirective.decorators = [
        { type: Directive, args: [{ selector: 'ng-template[carouselSlide]' },] }
    ];
    /** @nocollapse */
    CarouselSlideDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    CarouselSlideDirective.propDecorators = {
        id: [{ type: Input }],
        dataMerge: [{ type: Input }],
        width: [{ type: Input }],
        dotContent: [{ type: Input }],
        dataHash: [{ type: Input }]
    };
    return CarouselSlideDirective;
}());
/**
 * Data which will be passed out after ending of transition of carousel
 */
var  /**
 * Data which will be passed out after ending of transition of carousel
 */
SlidesOutputData = /** @class */ (function () {
    function SlidesOutputData() {
    }
    return SlidesOutputData;
}());
var CarouselComponent = /** @class */ (function () {
    function CarouselComponent(el, resizeService, carouselService, navigationService, autoplayService, lazyLoadService, animateService, autoHeightService, hashService) {
        this.el = el;
        this.resizeService = resizeService;
        this.carouselService = carouselService;
        this.navigationService = navigationService;
        this.autoplayService = autoplayService;
        this.lazyLoadService = lazyLoadService;
        this.animateService = animateService;
        this.autoHeightService = autoHeightService;
        this.hashService = hashService;
        this.translated = new EventEmitter();
        this.dragging = new EventEmitter();
        /**
         * Shows whether carousel is loaded of not.
         */
        this.carouselLoaded = false;
    }
    /**
     * @return {?}
     */
    CarouselComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.spyDataStreams();
        this.carouselWindowWidth = this.el.nativeElement.querySelector('.owl-carousel').clientWidth;
    };
    /**
     * @return {?}
     */
    CarouselComponent.prototype.ngAfterContentChecked = /**
     * @return {?}
     */
    function () {
    };
    // ngAfterContentChecked() END
    // ngAfterContentChecked() END
    /**
     * @return {?}
     */
    CarouselComponent.prototype.ngAfterContentInit = 
    // ngAfterContentChecked() END
    /**
     * @return {?}
     */
    function () {
        if (this.slides.toArray().length) {
            this.carouselService.setup(this.carouselWindowWidth, this.slides.toArray(), this.options);
            this.carouselService.initialize(this.slides.toArray());
            this._winResizeWatcher();
        }
        else {
            console.log("There's no slides to show. So carousel didn't get rendered");
        }
    };
    /**
     * @return {?}
     */
    CarouselComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.resizeSubscription) {
            this.resizeSubscription.unsubscribe();
        }
        this._allObservSubscription.unsubscribe();
    };
    /**
     * Joins the observable login in one place: sets values to some observables, merges this observables and
     * subcribes to merge func
     */
    /**
     * Joins the observable login in one place: sets values to some observables, merges this observables and
     * subcribes to merge func
     * @return {?}
     */
    CarouselComponent.prototype.spyDataStreams = /**
     * Joins the observable login in one place: sets values to some observables, merges this observables and
     * subcribes to merge func
     * @return {?}
     */
    function () {
        var _this = this;
        this._viewCurSettings$ = this.carouselService.getViewCurSettings().pipe(tap(function (data) {
            _this.owlDOMData = data.owlDOMData;
            _this.stageData = data.stageData;
            _this.slidesData = data.slidesData;
            if (!_this.carouselLoaded) {
                _this.carouselLoaded = true;
            }
            _this.navData = data.navData;
            _this.dotsData = data.dotsData;
        }));
        this._translatedCarousel$ = this.carouselService.getTranslatedState().pipe(tap(function () {
            _this.gatherTranslatedData();
            _this.translated.emit(_this.slidesOutputData);
            _this.slidesOutputData = {};
        }));
        this._draggingCarousel$ = this.carouselService.getDragState().pipe(tap(function () {
            _this.dragging.emit(true);
        }), switchMap(function () { return _this.carouselService.getTranslatedState().pipe(first(), tap(function () {
            _this.dragging.emit(false);
        })); }));
        this._carouselMerge$ = merge(this._viewCurSettings$, this._translatedCarousel$, this._draggingCarousel$);
        this._allObservSubscription = this._carouselMerge$.subscribe(function () { });
    };
    /**
     * Init subscription to resize event and attaches handler for this event
     */
    /**
     * Init subscription to resize event and attaches handler for this event
     * @return {?}
     */
    CarouselComponent.prototype._winResizeWatcher = /**
     * Init subscription to resize event and attaches handler for this event
     * @return {?}
     */
    function () {
        var _this = this;
        if (Object.keys(this.carouselService._options.responsive).length) {
            this.resizeSubscription = this.resizeService.onResize$
                .pipe(filter(function () { return _this.carouselWindowWidth !== _this.el.nativeElement.querySelector('.owl-carousel').clientWidth; }), delay(this.carouselService.settings.responsiveRefreshRate))
                .subscribe(function () {
                _this.carouselService.onResize(_this.el.nativeElement.querySelector('.owl-carousel').clientWidth);
                _this.carouselWindowWidth = _this.el.nativeElement.querySelector('.owl-carousel').clientWidth;
            });
        }
    };
    /**
     * Handler for transitioend event
     */
    /**
     * Handler for transitioend event
     * @return {?}
     */
    CarouselComponent.prototype.onTransitionEnd = /**
     * Handler for transitioend event
     * @return {?}
     */
    function () {
        this.carouselService.onTransitionEnd();
    };
    /**
     * Handler for click event, attached to next button
     */
    /**
     * Handler for click event, attached to next button
     * @return {?}
     */
    CarouselComponent.prototype.next = /**
     * Handler for click event, attached to next button
     * @return {?}
     */
    function () {
        this.navigationService.next(this.carouselService.settings.navSpeed);
    };
    /**
     * Handler for click event, attached to prev button
     */
    /**
     * Handler for click event, attached to prev button
     * @return {?}
     */
    CarouselComponent.prototype.prev = /**
     * Handler for click event, attached to prev button
     * @return {?}
     */
    function () {
        this.navigationService.prev(this.carouselService.settings.navSpeed);
    };
    /**
     * Handler for click event, attached to dots
     */
    /**
     * Handler for click event, attached to dots
     * @param {?} dotId
     * @return {?}
     */
    CarouselComponent.prototype.moveByDot = /**
     * Handler for click event, attached to dots
     * @param {?} dotId
     * @return {?}
     */
    function (dotId) {
        this.navigationService.moveByDot(dotId);
    };
    /**
     * rewinds carousel to slide with needed id
     * @param id fragment of url
     */
    /**
     * rewinds carousel to slide with needed id
     * @param {?} id fragment of url
     * @return {?}
     */
    CarouselComponent.prototype.to = /**
     * rewinds carousel to slide with needed id
     * @param {?} id fragment of url
     * @return {?}
     */
    function (id) {
        this.navigationService.toSlideById(id);
    };
    /**
     * Gathers and prepares data intended for passing to the user by means of firing event translatedCarousel
     */
    /**
     * Gathers and prepares data intended for passing to the user by means of firing event translatedCarousel
     * @return {?}
     */
    CarouselComponent.prototype.gatherTranslatedData = /**
     * Gathers and prepares data intended for passing to the user by means of firing event translatedCarousel
     * @return {?}
     */
    function () {
        /** @type {?} */
        var startPosition;
        /** @type {?} */
        var clonedIdPrefix = this.carouselService.clonedIdPrefix;
        /** @type {?} */
        var activeSlides = this.slidesData
            .filter(function (slide) { return slide.isActive === true; })
            .map(function (slide) {
            /** @type {?} */
            var id = slide.id.indexOf(clonedIdPrefix) >= 0 ? slide.id.slice(clonedIdPrefix.length) : slide.id;
            return {
                id: id,
                width: slide.width,
                marginL: slide.marginL,
                marginR: slide.marginR,
                center: slide.isCentered
            };
        });
        startPosition = this.carouselService.relative(this.carouselService.current());
        this.slidesOutputData = {
            startPosition: startPosition,
            slides: activeSlides
        };
    };
    /**
     * Starts pausing
     */
    /**
     * Starts pausing
     * @return {?}
     */
    CarouselComponent.prototype.startPausing = /**
     * Starts pausing
     * @return {?}
     */
    function () {
        this.autoplayService.startPausing();
    };
    /**
     * Starts playing after mouse leaves carousel
     */
    /**
     * Starts playing after mouse leaves carousel
     * @return {?}
     */
    CarouselComponent.prototype.startPlayML = /**
     * Starts playing after mouse leaves carousel
     * @return {?}
     */
    function () {
        this.autoplayService.startPlayingMouseLeave();
    };
    /**
     * Starts playing after touch ends
     */
    /**
     * Starts playing after touch ends
     * @return {?}
     */
    CarouselComponent.prototype.startPlayTE = /**
     * Starts playing after touch ends
     * @return {?}
     */
    function () {
        this.autoplayService.startPlayingTouchEnd();
    };
    CarouselComponent.decorators = [
        { type: Component, args: [{
                    selector: 'owl-carousel-o',
                    template: "\n    <div class=\"owl-carousel owl-theme\" #owlCarousel\n      [ngClass]=\"{'owl-rtl': owlDOMData?.rtl,\n                  'owl-loaded': owlDOMData?.isLoaded,\n                  'owl-responsive': owlDOMData?.isResponsive,\n                  'owl-drag': owlDOMData?.isMouseDragable,\n                  'owl-grab': owlDOMData?.isGrab}\"\n      (mouseover)=\"startPausing()\"\n      (mouseleave)=\"startPlayML()\"\n      (touchstart)=\"startPausing()\"\n      (touchend)=\"startPlayTE()\">\n\n      <div *ngIf=\"carouselLoaded\" class=\"owl-stage-outer\">\n        <owl-stage [owlDraggable]=\"{'isMouseDragable': owlDOMData?.isMouseDragable, 'isTouchDragable': owlDOMData?.isTouchDragable}\"\n                    [stageData]=\"stageData\"\n                    [slidesData]=\"slidesData\"></owl-stage>\n      </div> <!-- /.owl-stage-outer -->\n      <ng-container *ngIf=\"slides.toArray().length\">\n        <div class=\"owl-nav\" [ngClass]=\"{'disabled': navData?.disabled}\">\n          <div class=\"owl-prev\" [ngClass]=\"{'disabled': navData?.prev?.disabled}\" (click)=\"prev()\" [innerHTML]=\"navData?.prev?.htmlText\"></div>\n          <div class=\"owl-next\" [ngClass]=\"{'disabled': navData?.next?.disabled}\" (click)=\"next()\" [innerHTML]=\"navData?.next?.htmlText\"></div>\n        </div> <!-- /.owl-nav -->\n        <div class=\"owl-dots\" [ngClass]=\"{'disabled': dotsData?.disabled}\">\n          <div *ngFor=\"let dot of dotsData?.dots\" class=\"owl-dot\" [ngClass]=\"{'active': dot.active, 'owl-dot-text': dot.showInnerContent}\" (click)=\"moveByDot(dot.id)\">\n            <span [innerHTML]=\"dot.innerContent\"></span>\n          </div>\n        </div> <!-- /.owl-dots -->\n      </ng-container>\n    </div> <!-- /.owl-carousel owl-loaded -->\n  ",
                    providers: [
                        NavigationService,
                        AutoplayService,
                        CarouselService,
                        LazyLoadService,
                        AnimateService,
                        AutoHeightService,
                        HashService
                    ],
                    styles: [".owl-theme { display: block; }"]
                }] }
    ];
    /** @nocollapse */
    CarouselComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ResizeService },
        { type: CarouselService },
        { type: NavigationService },
        { type: AutoplayService },
        { type: LazyLoadService },
        { type: AnimateService },
        { type: AutoHeightService },
        { type: HashService }
    ]; };
    CarouselComponent.propDecorators = {
        slides: [{ type: ContentChildren, args: [CarouselSlideDirective,] }],
        translated: [{ type: Output }],
        dragging: [{ type: Output }],
        options: [{ type: Input }]
    };
    return CarouselComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var StageComponent = /** @class */ (function () {
    function StageComponent(zone, el, renderer, carouselService, animateService) {
        var _this = this;
        this.zone = zone;
        this.el = el;
        this.renderer = renderer;
        this.carouselService = carouselService;
        this.animateService = animateService;
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
        this.bindOneMouseTouchMove = function (ev) {
            _this._oneMouseTouchMove(ev);
        };
        /**
         * Passes this to _onDragMove();
         */
        this.bindOnDragMove = function (ev) {
            _this._onDragMove(ev);
        };
        /**
         * Passes this to _onDragMove();
         */
        this.bindOnDragEnd = function (ev) {
            // this.zone.run(() => {
            _this._onDragEnd(ev);
            // });
        };
        /**
         * Attaches handler for 'click' event on any element in .owl-stage in order to prevent dragging when moving of cursor is less than 3px
         */
        this._oneClickHandler = function () {
            _this.listenerOneClick = _this.renderer.listen(_this._drag.target, 'click', function () { return false; });
            _this.listenerOneClick();
        };
    }
    /**
     * @param {?} event
     * @return {?}
     */
    StageComponent.prototype.onMouseDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.owlDraggable.isMouseDragable) {
            this._onDragStart(event);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    StageComponent.prototype.onTouchStart = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.owlDraggable.isTouchDragable) {
            this._onDragStart(event);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    StageComponent.prototype.onTouchCancel = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this._onDragEnd(event);
    };
    /**
     * @return {?}
     */
    StageComponent.prototype.onDragStart = /**
     * @return {?}
     */
    function () {
        if (this.owlDraggable.isMouseDragable) {
            return false;
        }
    };
    /**
     * @return {?}
     */
    StageComponent.prototype.onSelectStart = /**
     * @return {?}
     */
    function () {
        if (this.owlDraggable.isMouseDragable) {
            return false;
        }
    };
    /**
     * @return {?}
     */
    StageComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._oneMoveSubsription = this._oneDragMove$
            .pipe(first())
            .subscribe(function () {
            _this._sendChanges();
        });
    };
    /**
     * @return {?}
     */
    StageComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._oneMoveSubsription.unsubscribe();
    };
    /**
       * Handles `touchstart` and `mousedown` events.
       * @todo Horizontal swipe threshold as option
       * @todo #261
       * @param event - The event arguments.
       */
    /**
     * Handles `touchstart` and `mousedown` events.
     * \@todo Horizontal swipe threshold as option / #261
     * @param {?} event - The event arguments.
     * @return {?}
     */
    StageComponent.prototype._onDragStart = /**
     * Handles `touchstart` and `mousedown` events.
     * \@todo Horizontal swipe threshold as option / #261
     * @param {?} event - The event arguments.
     * @return {?}
     */
    function (event) {
        var _this = this;
        /** @type {?} */
        var stage = null;
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
        this.zone.runOutsideAngular(function () {
            _this.listenerOneMouseMove = _this.renderer.listen(document, 'mousemove', _this.bindOneMouseTouchMove);
            _this.listenerOneTouchMove = _this.renderer.listen(document, 'touchmove', _this.bindOneMouseTouchMove);
        });
    };
    /**
     * Attaches listeners to `touchmove` and `mousemove` events; initiates updating carousel after starting dragging
     * @param event event objech of mouse or touch event
     */
    /**
     * Attaches listeners to `touchmove` and `mousemove` events; initiates updating carousel after starting dragging
     * @param {?} event event objech of mouse or touch event
     * @return {?}
     */
    StageComponent.prototype._oneMouseTouchMove = /**
     * Attaches listeners to `touchmove` and `mousemove` events; initiates updating carousel after starting dragging
     * @param {?} event event objech of mouse or touch event
     * @return {?}
     */
    function (event) {
        if (!this._drag.active)
            return false;
        /** @type {?} */
        var delta = this._difference(this._drag.pointer, this._pointer(event));
        if (this.listenerATag) {
            this.listenerATag();
        }
        this.listenerOneMouseMove();
        this.listenerOneTouchMove();
        if (Math.abs(delta.x) < Math.abs(delta.y) && this._is('valid')) {
            this._drag.active = false;
            return;
        }
        this._drag.moving = true;
        this.blockClickAnchorInDragging(event);
        this.listenerMouseMove = this.renderer.listen(document, 'mousemove', this.bindOnDragMove);
        this.listenerTouchMove = this.renderer.listen(document, 'touchmove', this.bindOnDragMove);
        event.preventDefault();
        this._enterDragging();
        this._oneDragMove$.next(event);
        // this._sendChanges();
    };
    /**
     * Attaches handler to HTMLAnchorElement for preventing click while carousel is being dragged
     * @param event event object
     */
    /**
     * Attaches handler to HTMLAnchorElement for preventing click while carousel is being dragged
     * @param {?} event event object
     * @return {?}
     */
    StageComponent.prototype.blockClickAnchorInDragging = /**
     * Attaches handler to HTMLAnchorElement for preventing click while carousel is being dragged
     * @param {?} event event object
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var target = event.target;
        while (target && !(target instanceof HTMLAnchorElement)) {
            target = target.parentElement;
        }
        if (target instanceof HTMLAnchorElement) {
            this.listenerATag = this.renderer.listen(target, 'click', function () { return false; });
        }
    };
    /**
     * Handles the `touchmove` and `mousemove` events.
     * @todo #261
     * @param event - The event arguments.
     */
    /**
     * Handles the `touchmove` and `mousemove` events.
     * \@todo #261
     * @param {?} event - The event arguments.
     * @return {?}
     */
    StageComponent.prototype._onDragMove = /**
     * Handles the `touchmove` and `mousemove` events.
     * \@todo #261
     * @param {?} event - The event arguments.
     * @return {?}
     */
    function (event) {
        if (!this._drag.active)
            return false;
        /** @type {?} */
        var stage;
        /** @type {?} */
        var stageOrExit = this.carouselService.defineNewCoordsDrag(event, this._drag);
        if (stageOrExit === false) {
            return;
        }
        stage = (/** @type {?} */ (stageOrExit));
        event.preventDefault();
        this._drag.stage.current = stage;
        this._animate(stage.x - this._drag.stage.start.x);
    };
    /**
     * Moves .owl-stage left-right
     * @param coordinate coordinate to be set to .owl-stage
     */
    /**
     * Moves .owl-stage left-right
     * @param {?} coordinate coordinate to be set to .owl-stage
     * @return {?}
     */
    StageComponent.prototype._animate = /**
     * Moves .owl-stage left-right
     * @param {?} coordinate coordinate to be set to .owl-stage
     * @return {?}
     */
    function (coordinate) {
        this.renderer.setStyle(this.el.nativeElement.children[0], 'transform', "translate3d(" + coordinate + "px,0px,0px");
        this.renderer.setStyle(this.el.nativeElement.children[0], 'transition', '0s');
    };
    /**
       * Handles the `touchend` and `mouseup` events.
       * @todo #261
       * @todo Threshold for click event
       * @param event - The event arguments.
       */
    /**
     * Handles the `touchend` and `mouseup` events.
     * \@todo #261 / Threshold for click event
     * @param {?} event - The event arguments.
     * @return {?}
     */
    StageComponent.prototype._onDragEnd = /**
     * Handles the `touchend` and `mouseup` events.
     * \@todo #261 / Threshold for click event
     * @param {?} event - The event arguments.
     * @return {?}
     */
    function (event) {
        this.carouselService.owlDOMData.isGrab = false;
        if (this._drag.moving) {
            this.renderer.setStyle(this.el.nativeElement.children[0], 'transform', "");
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
    };
    /**
       * Prepares data for dragging carousel. It starts after firing `touchstart` and `mousedown` events.
       * @param event - The event arguments.
       * @returns stage - object with 'x' and 'y' coordinates of .owl-stage
       */
    /**
     * Prepares data for dragging carousel. It starts after firing `touchstart` and `mousedown` events.
     * @param {?} event - The event arguments.
     * @return {?} stage - object with 'x' and 'y' coordinates of .owl-stage
     */
    StageComponent.prototype._prepareDragging = /**
     * Prepares data for dragging carousel. It starts after firing `touchstart` and `mousedown` events.
     * @param {?} event - The event arguments.
     * @return {?} stage - object with 'x' and 'y' coordinates of .owl-stage
     */
    function (event) {
        return this.carouselService.prepareDragging(event);
    };
    /**
     * Finishes dragging
     * @param event object event of 'mouseUp' of 'touchend' events
     */
    /**
     * Finishes dragging
     * @param {?} event object event of 'mouseUp' of 'touchend' events
     * @return {?}
     */
    StageComponent.prototype._finishDragging = /**
     * Finishes dragging
     * @param {?} event object event of 'mouseUp' of 'touchend' events
     * @return {?}
     */
    function (event) {
        this.carouselService.finishDragging(event, this._drag, this._oneClickHandler);
    };
    /**
       * Gets unified pointer coordinates from event.
       * @param event The `mousedown` or `touchstart` event.
       * @returns Contains `x` and `y` coordinates of current pointer position.
       */
    /**
     * Gets unified pointer coordinates from event.
     * @param {?} event The `mousedown` or `touchstart` event.
     * @return {?} Contains `x` and `y` coordinates of current pointer position.
     */
    StageComponent.prototype._pointer = /**
     * Gets unified pointer coordinates from event.
     * @param {?} event The `mousedown` or `touchstart` event.
     * @return {?} Contains `x` and `y` coordinates of current pointer position.
     */
    function (event) {
        return this.carouselService.pointer(event);
    };
    /**
       * Gets the difference of two vectors.
       * @param first The first vector.
       * @param second- The second vector.
       * @returns The difference.
       */
    /**
     * Gets the difference of two vectors.
     * @param {?} firstC
     * @param {?} second
     * @return {?} The difference.
     */
    StageComponent.prototype._difference = /**
     * Gets the difference of two vectors.
     * @param {?} firstC
     * @param {?} second
     * @return {?} The difference.
     */
    function (firstC, second) {
        return this.carouselService.difference(firstC, second);
    };
    /**
       * Checks whether the carousel is in a specific state or not.
       * @param specificState The state to check.
       * @returns The flag which indicates if the carousel is busy.
       */
    /**
     * Checks whether the carousel is in a specific state or not.
     * @param {?} specificState The state to check.
     * @return {?} The flag which indicates if the carousel is busy.
     */
    StageComponent.prototype._is = /**
     * Checks whether the carousel is in a specific state or not.
     * @param {?} specificState The state to check.
     * @return {?} The flag which indicates if the carousel is busy.
     */
    function (specificState) {
        return this.carouselService.is(specificState);
    };
    /**
    * Enters a state.
    * @param name The state name.
    */
    /**
     * Enters a state.
     * @param {?} name The state name.
     * @return {?}
     */
    StageComponent.prototype._enter = /**
     * Enters a state.
     * @param {?} name The state name.
     * @return {?}
     */
    function (name) {
        this.carouselService.enter(name);
    };
    /**
       * Sends all data needed for View.
       */
    /**
     * Sends all data needed for View.
     * @return {?}
     */
    StageComponent.prototype._sendChanges = /**
     * Sends all data needed for View.
     * @return {?}
     */
    function () {
        this.carouselService.sendChanges();
    };
    /**
     * Handler for transitioend event
     */
    /**
     * Handler for transitioend event
     * @return {?}
     */
    StageComponent.prototype.onTransitionEnd = /**
     * Handler for transitioend event
     * @return {?}
     */
    function () {
        this.carouselService.onTransitionEnd();
    };
    /**
       * Enters into a 'dragging' state
       */
    /**
     * Enters into a 'dragging' state
     * @return {?}
     */
    StageComponent.prototype._enterDragging = /**
     * Enters into a 'dragging' state
     * @return {?}
     */
    function () {
        this.carouselService.enterDragging();
    };
    /**
     * Handles the end of 'animationend' event
     * @param id Id of slides
     */
    /**
     * Handles the end of 'animationend' event
     * @param {?} id Id of slides
     * @return {?}
     */
    StageComponent.prototype.clear = /**
     * Handles the end of 'animationend' event
     * @param {?} id Id of slides
     * @return {?}
     */
    function (id) {
        this.animateService.clear(id);
    };
    StageComponent.decorators = [
        { type: Component, args: [{
                    selector: 'owl-stage',
                    template: "\n    <div>\n      <div class=\"owl-stage\" [ngStyle]=\"{'width': stageData.width + 'px',\n                                        'transform': stageData.transform,\n                                        'transition': stageData.transition,\n                                        'padding-left': stageData.paddingL + 'px',\n                                        'padding-right': stageData.paddingR + 'px' }\"\n          (transitionend)=\"onTransitionEnd()\">\n        <ng-container *ngFor=\"let slide of slidesData; let i = index\">\n          <div class=\"owl-item\" [ngClass]=\"slide.classes\"\n                                [ngStyle]=\"{'width': slide.width + 'px',\n                                            'margin-left': slide.marginL + 'px',\n                                            'margin-right': slide.marginR + 'px',\n                                            'left': slide.left}\"\n                                (animationend)=\"clear(slide.id)\"\n                                [@autoHeight]=\"slide.heightState\">\n            <ng-template *ngIf=\"slide.load\" [ngTemplateOutlet]=\"slide.tplRef\"></ng-template>\n          </div><!-- /.owl-item -->\n        </ng-container>\n      </div><!-- /.owl-stage -->\n    </div>\n  ",
                    animations: [
                        trigger('autoHeight', [
                            state('nulled', style({ height: 0 })),
                            state('full', style({ height: '*' })),
                            transition('full => nulled', [
                                // style({height: '*'}),
                                animate('700ms 350ms')
                            ]),
                            transition('nulled => full', [
                                // style({height: 0}),
                                animate(350)
                            ]),
                        ])
                    ]
                }] }
    ];
    /** @nocollapse */
    StageComponent.ctorParameters = function () { return [
        { type: NgZone },
        { type: ElementRef },
        { type: Renderer2 },
        { type: CarouselService },
        { type: AnimateService }
    ]; };
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
    return StageComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var OwlRouterLinkDirective = /** @class */ (function () {
    function OwlRouterLinkDirective(router, route, tabIndex, renderer, el) {
        this.router = router;
        this.route = route;
        this.stopLink = false;
        this.commands = [];
        if (tabIndex == null) {
            renderer.setAttribute(el.nativeElement, 'tabindex', '0');
        }
    }
    Object.defineProperty(OwlRouterLinkDirective.prototype, "owlRouterLink", {
        set: /**
         * @param {?} commands
         * @return {?}
         */
        function (commands) {
            if (commands != null) {
                this.commands = Array.isArray(commands) ? commands : [commands];
            }
            else {
                this.commands = [];
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlRouterLinkDirective.prototype, "preserveQueryParams", {
        /**
         * @deprecated 4.0.0 use `queryParamsHandling` instead.
         */
        set: /**
         * @deprecated 4.0.0 use `queryParamsHandling` instead.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (isDevMode() && (/** @type {?} */ (console)) && (/** @type {?} */ (console.warn))) {
                console.warn('preserveQueryParams is deprecated!, use queryParamsHandling instead.');
            }
            this.preserve = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    OwlRouterLinkDirective.prototype.onClick = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var extras = {
            skipLocationChange: attrBoolValue(this.skipLocationChange),
            replaceUrl: attrBoolValue(this.replaceUrl),
        };
        if (this.stopLink) {
            return false;
        }
        this.router.navigateByUrl(this.urlTree, extras);
        return true;
    };
    Object.defineProperty(OwlRouterLinkDirective.prototype, "urlTree", {
        get: /**
         * @return {?}
         */
        function () {
            return this.router.createUrlTree(this.commands, {
                relativeTo: this.route,
                queryParams: this.queryParams,
                fragment: this.fragment,
                preserveQueryParams: attrBoolValue(this.preserve),
                queryParamsHandling: this.queryParamsHandling,
                preserveFragment: attrBoolValue(this.preserveFragment),
            });
        },
        enumerable: true,
        configurable: true
    });
    OwlRouterLinkDirective.decorators = [
        { type: Directive, args: [{ selector: ':not(a)[owlRouterLink]' },] }
    ];
    /** @nocollapse */
    OwlRouterLinkDirective.ctorParameters = function () { return [
        { type: Router },
        { type: ActivatedRoute },
        { type: String, decorators: [{ type: Attribute, args: ['tabindex',] }] },
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    OwlRouterLinkDirective.propDecorators = {
        queryParams: [{ type: Input }],
        fragment: [{ type: Input }],
        queryParamsHandling: [{ type: Input }],
        preserveFragment: [{ type: Input }],
        skipLocationChange: [{ type: Input }],
        replaceUrl: [{ type: Input }],
        stopLink: [{ type: Input }],
        owlRouterLink: [{ type: Input }],
        preserveQueryParams: [{ type: Input }],
        onClick: [{ type: HostListener, args: ['click',] }]
    };
    return OwlRouterLinkDirective;
}());
/**
 * \@description
 *
 * Lets you link to specific routes in your app.
 *
 * See `RouterLink` for more information.
 *
 * \@ngModule RouterModule
 *
 * \@publicApi
 */
var OwlRouterLinkWithHrefDirective = /** @class */ (function () {
    function OwlRouterLinkWithHrefDirective(router, route, locationStrategy) {
        var _this = this;
        this.router = router;
        this.route = route;
        this.locationStrategy = locationStrategy;
        this.stopLink = false;
        this.commands = [];
        this.subscription = router.events.subscribe(function (s) {
            if (s instanceof NavigationEnd) {
                _this.updateTargetUrlAndHref();
            }
        });
    }
    Object.defineProperty(OwlRouterLinkWithHrefDirective.prototype, "owlRouterLink", {
        set: /**
         * @param {?} commands
         * @return {?}
         */
        function (commands) {
            if (commands != null) {
                this.commands = Array.isArray(commands) ? commands : [commands];
            }
            else {
                this.commands = [];
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlRouterLinkWithHrefDirective.prototype, "preserveQueryParams", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (isDevMode() && (/** @type {?} */ (console)) && (/** @type {?} */ (console.warn))) {
                console.warn('preserveQueryParams is deprecated, use queryParamsHandling instead.');
            }
            this.preserve = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} changes
     * @return {?}
     */
    OwlRouterLinkWithHrefDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) { this.updateTargetUrlAndHref(); };
    /**
     * @return {?}
     */
    OwlRouterLinkWithHrefDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () { this.subscription.unsubscribe(); };
    /**
     * @param {?} button
     * @param {?} ctrlKey
     * @param {?} metaKey
     * @param {?} shiftKey
     * @return {?}
     */
    OwlRouterLinkWithHrefDirective.prototype.onClick = /**
     * @param {?} button
     * @param {?} ctrlKey
     * @param {?} metaKey
     * @param {?} shiftKey
     * @return {?}
     */
    function (button, ctrlKey, metaKey, shiftKey) {
        if (button !== 0 || ctrlKey || metaKey || shiftKey) {
            return true;
        }
        if (typeof this.target === 'string' && this.target !== '_self') {
            return true;
        }
        if (this.stopLink) {
            return false;
        }
        /** @type {?} */
        var extras = {
            skipLocationChange: attrBoolValue(this.skipLocationChange),
            replaceUrl: attrBoolValue(this.replaceUrl),
        };
        this.router.navigateByUrl(this.urlTree, extras);
        return false;
    };
    /**
     * @return {?}
     */
    OwlRouterLinkWithHrefDirective.prototype.updateTargetUrlAndHref = /**
     * @return {?}
     */
    function () {
        this.href = this.locationStrategy.prepareExternalUrl(this.router.serializeUrl(this.urlTree));
    };
    Object.defineProperty(OwlRouterLinkWithHrefDirective.prototype, "urlTree", {
        get: /**
         * @return {?}
         */
        function () {
            return this.router.createUrlTree(this.commands, {
                relativeTo: this.route,
                queryParams: this.queryParams,
                fragment: this.fragment,
                preserveQueryParams: attrBoolValue(this.preserve),
                queryParamsHandling: this.queryParamsHandling,
                preserveFragment: attrBoolValue(this.preserveFragment),
            });
        },
        enumerable: true,
        configurable: true
    });
    OwlRouterLinkWithHrefDirective.decorators = [
        { type: Directive, args: [{ selector: 'a[owlRouterLink]' },] }
    ];
    /** @nocollapse */
    OwlRouterLinkWithHrefDirective.ctorParameters = function () { return [
        { type: Router },
        { type: ActivatedRoute },
        { type: LocationStrategy }
    ]; };
    OwlRouterLinkWithHrefDirective.propDecorators = {
        target: [{ type: HostBinding, args: ['attr.target',] }, { type: Input }],
        queryParams: [{ type: Input }],
        fragment: [{ type: Input }],
        queryParamsHandling: [{ type: Input }],
        preserveFragment: [{ type: Input }],
        skipLocationChange: [{ type: Input }],
        replaceUrl: [{ type: Input }],
        stopLink: [{ type: Input }],
        href: [{ type: HostBinding }],
        owlRouterLink: [{ type: Input }],
        preserveQueryParams: [{ type: Input }],
        onClick: [{ type: HostListener, args: ['click', ['$event.button', '$event.ctrlKey', '$event.metaKey', '$event.shiftKey'],] }]
    };
    return OwlRouterLinkWithHrefDirective;
}());
/**
 * @param {?} s
 * @return {?}
 */
function attrBoolValue(s) {
    return s === '' || !!s;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/** @type {?} */
var routes = [];
var CarouselModule = /** @class */ (function () {
    function CarouselModule() {
    }
    CarouselModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        // BrowserAnimationsModule, // there's an issue with this import while using lazy loading of module consuming this library. I don't remove it because it could be needed during future enhancement of this lib.
                        RouterModule.forChild(routes)
                    ],
                    declarations: [CarouselComponent, CarouselSlideDirective, StageComponent, OwlRouterLinkDirective, OwlRouterLinkWithHrefDirective],
                    exports: [CarouselComponent, CarouselSlideDirective, OwlRouterLinkDirective, OwlRouterLinkWithHrefDirective],
                    providers: [WINDOW_PROVIDERS, ResizeService, DOCUMENT_PROVIDERS]
                },] }
    ];
    return CarouselModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

export { CarouselModule, CarouselComponent, CarouselSlideDirective, SlidesOutputData, OwlRouterLinkDirective, OwlRouterLinkWithHrefDirective, StageComponent as ɵw, AnimateService as ɵs, AutoHeightService as ɵt, AutoplayService as ɵc, CarouselService as ɵb, BrowserDocumentRef as ɵm, DOCUMENT as ɵk, DOCUMENT_PROVIDERS as ɵq, DocumentRef as ɵl, browserDocumentProvider as ɵo, documentFactory as ɵn, documentProvider as ɵp, HashService as ɵu, LazyLoadService as ɵr, NavigationService as ɵa, ResizeService as ɵv, BrowserWindowRef as ɵf, WINDOW as ɵd, WINDOW_PROVIDERS as ɵj, WindowRef as ɵe, browserWindowProvider as ɵh, windowFactory as ɵg, windowProvider as ɵi };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW93bC1jYXJvdXNlbC1vLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vbGliL3NlcnZpY2VzL3Jlc2l6ZS5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vbGliL2Nhcm91c2VsL293bC1jYXJvdXNlbC1vLWNvbmZpZy50cyIsIm5nOi8vbmd4LW93bC1jYXJvdXNlbC1vL2xpYi9zZXJ2aWNlcy9jYXJvdXNlbC5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vbGliL3NlcnZpY2VzL25hdmlnYXRpb24uc2VydmljZS50cyIsIm5nOi8vbmd4LW93bC1jYXJvdXNlbC1vL2xpYi9zZXJ2aWNlcy93aW5kb3ctcmVmLnNlcnZpY2UudHMiLCJuZzovL25neC1vd2wtY2Fyb3VzZWwtby9saWIvc2VydmljZXMvZG9jdW1lbnQtcmVmLnNlcnZpY2UudHMiLCJuZzovL25neC1vd2wtY2Fyb3VzZWwtby9saWIvc2VydmljZXMvYXV0b3BsYXkuc2VydmljZS50cyIsIm5nOi8vbmd4LW93bC1jYXJvdXNlbC1vL2xpYi9zZXJ2aWNlcy9sYXp5bG9hZC5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vbGliL3NlcnZpY2VzL2FuaW1hdGUuc2VydmljZS50cyIsIm5nOi8vbmd4LW93bC1jYXJvdXNlbC1vL2xpYi9zZXJ2aWNlcy9hdXRvaGVpZ2h0LnNlcnZpY2UudHMiLCJuZzovL25neC1vd2wtY2Fyb3VzZWwtby9saWIvc2VydmljZXMvaGFzaC5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vbGliL2Nhcm91c2VsL2Nhcm91c2VsLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LW93bC1jYXJvdXNlbC1vL2xpYi9jYXJvdXNlbC9zdGFnZS9zdGFnZS5jb21wb25lbnQudHMiLCJuZzovL25neC1vd2wtY2Fyb3VzZWwtby9saWIvY2Fyb3VzZWwvb3dsLXJvdXRlci1saW5rLmRpcmVjdGl2ZS50cyIsIm5nOi8vbmd4LW93bC1jYXJvdXNlbC1vL2xpYi9jYXJvdXNlbC9jYXJvdXNlbC5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnRNYW5hZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgUmVzaXplU2VydmljZSB7XHJcbiAgLyoqXHJcbiAgICogV2lkdGggb2Ygd2luZG93XHJcbiAgICovXHJcbiAgcHVibGljIHdpbmRvd1dpZHRoOiBhbnk7XHJcblxyXG4gIC8qKlxyXG4gICAqIE1ha2VzIHJlc2l6ZVN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcclxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIHJlc2l6ZVN1YmplY3RcclxuICAgKi9cclxuICBnZXQgb25SZXNpemUkKCk6IE9ic2VydmFibGU8V2luZG93PiB7XHJcbiAgICByZXR1cm4gdGhpcy5yZXNpemVTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3ViamVjdCBvZiAncmVzaXplJyBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVzaXplU3ViamVjdDogU3ViamVjdDxXaW5kb3c+O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGV2ZW50TWFuYWdlcjogRXZlbnRNYW5hZ2VyKSB7XHJcbiAgICB0aGlzLnJlc2l6ZVN1YmplY3QgPSBuZXcgU3ViamVjdCgpO1xyXG4gICAgdGhpcy5ldmVudE1hbmFnZXIuYWRkR2xvYmFsRXZlbnRMaXN0ZW5lcihcclxuICAgICAgJ3dpbmRvdycsXHJcbiAgICAgICdyZXNpemUnLFxyXG4gICAgICB0aGlzLm9uUmVzaXplLmJpbmQodGhpcylcclxuICAgICk7XHJcbiAgICB0aGlzLmV2ZW50TWFuYWdlci5hZGRHbG9iYWxFdmVudExpc3RlbmVyKFxyXG4gICAgICAnd2luZG93JyxcclxuICAgICAgJ29ubG9hZCcsXHJcbiAgICAgIHRoaXMub25Mb2FkZWQuYmluZCh0aGlzKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhbmRsZXIgb2YgJ3Jlc2l6ZScgZXZlbnQuIFBhc3NlcyBkYXRhIHRocm93IHJlc2l6ZVN1YmplY3RcclxuICAgKiBAcGFyYW0gZXZlbnQgRXZlbnQgT2JqZWN0IG9mICdyZXNpemUnIGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvblJlc2l6ZShldmVudDogVUlFdmVudCkge1xyXG4gICAgdGhpcy5yZXNpemVTdWJqZWN0Lm5leHQoPFdpbmRvdz5ldmVudC50YXJnZXQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlciBvZiAnb25sb2FkJyBldmVudC4gRGVmaW5lcyB0aGUgd2lkdGggb2Ygd2luZG93XHJcbiAgICogQHBhcmFtIGV2ZW50IEV2ZW50IE9iamVjdCBvZiAnb25sb2FkJyBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25Mb2FkZWQoZXZlbnQ6IFVJRXZlbnQpIHtcclxuICAgIHRoaXMud2luZG93V2lkdGggPSA8V2luZG93PmV2ZW50LnRhcmdldDtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgT3dsT3B0aW9ucyB9IGZyb20gXCIuLi9tb2RlbHMvb3dsLW9wdGlvbnMubW9kZWxcIjtcclxuXHJcbi8qKlxyXG4gKiBEZWZhdWx0cyB2YWx1ZSBvZiBvcHRpb25zXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgT3dsQ2Fyb3VzZWxPQ29uZmlnIGltcGxlbWVudHMgT3dsT3B0aW9ucyB7XHJcbiAgaXRlbXMgPSAzO1xyXG4gIGxvb3AgPSBmYWxzZTtcclxuICBjZW50ZXIgPSBmYWxzZTtcclxuICByZXdpbmQgPSBmYWxzZTtcclxuXHJcbiAgbW91c2VEcmFnID0gdHJ1ZTtcclxuICB0b3VjaERyYWcgPSB0cnVlO1xyXG4gIHB1bGxEcmFnID0gdHJ1ZTtcclxuICBmcmVlRHJhZyA9IGZhbHNlO1xyXG5cclxuICBtYXJnaW4gPSAwO1xyXG4gIHN0YWdlUGFkZGluZyA9IDA7XHJcblxyXG4gIG1lcmdlID0gZmFsc2U7XHJcbiAgbWVyZ2VGaXQgPSB0cnVlO1xyXG4gIGF1dG9XaWR0aCA9IGZhbHNlO1xyXG5cclxuICBzdGFydFBvc2l0aW9uID0gMDtcclxuICBydGwgPSBmYWxzZTtcclxuXHJcbiAgc21hcnRTcGVlZCA9IDI1MDtcclxuICBmbHVpZFNwZWVkID0gZmFsc2U7XHJcbiAgZHJhZ0VuZFNwZWVkID0gZmFsc2U7XHJcblxyXG4gIHJlc3BvbnNpdmUgPSB7fTtcclxuICByZXNwb25zaXZlUmVmcmVzaFJhdGUgPSAyMDA7XHJcblxyXG4gIC8vIGRlZmF1bHRzIHRvIE5hdmlnYXRpb25cclxuICBuYXYgPSBmYWxzZTtcclxuICBuYXZUZXh0ID0gWyAncHJldicsICduZXh0JyBdO1xyXG4gIG5hdlNwZWVkID0gZmFsc2U7XHJcbiAgc2xpZGVCeSA9IDE7IC8vIHN0YWdlIG1vdmVzIG9uIDEgd2lkdGggb2Ygc2xpZGU7IGlmIHNsaWRlQnkgPSAyLCBzdGFnZSBtb3ZlcyBvbiAyIHdpZHRocyBvZiBzbGlkZVxyXG4gIGRvdHMgPSB0cnVlO1xyXG4gIGRvdHNFYWNoID0gZmFsc2U7XHJcbiAgZG90c0RhdGEgPSBmYWxzZTtcclxuICBkb3RzU3BlZWQgPSBmYWxzZTtcclxuXHJcbiAgLy8gZGVmYXVsdHMgdG8gQXV0b3BsYXlcclxuICBhdXRvcGxheSA9IGZhbHNlO1xyXG4gIGF1dG9wbGF5VGltZW91dCA9IDUwMDA7XHJcbiAgYXV0b3BsYXlIb3ZlclBhdXNlID0gZmFsc2U7XHJcbiAgYXV0b3BsYXlTcGVlZCA9IGZhbHNlO1xyXG5cclxuICAvLyBkZWZhdWx0cyB0byBMYXp5TG9hZGluZ1xyXG4gIGxhenlMb2FkID0gZmFsc2U7XHJcbiAgbGF6eUxvYWRFYWdlciA9IDA7XHJcblxyXG4gIC8vIGRlZmF1bHRzIHRvIEFuaW1hdGVcclxuICBhbmltYXRlT3V0ID0gZmFsc2U7XHJcbiAgYW5pbWF0ZUluID0gZmFsc2U7XHJcblxyXG4gIC8vIGRlZmF1bHRzIHRvIEF1dG9IZWlnaHRcclxuICBhdXRvSGVpZ2h0ID0gZmFsc2U7XHJcblxyXG4gIC8vIGRlZmF1bHRzIHRvIEhhc2hcclxuICBVUkxoYXNoTGlzdGVuZXIgPSBmYWxzZTtcclxuICBjb25zdHJ1Y3RvcigpIHsgfVxyXG59XHJcblxyXG4vKipcclxuICogd2UgY2FuJ3QgcmVhZCB0eXBlcyBmcm9tIE93bE9wdGlvbnMgaW4gamF2YXNjcmlwdCBiZWNhdXNlIG9mIHByb3BzIGhhdmUgdW5kZWZpbmVkIHZhbHVlIGFuZCB0eXBlcyBvZiB0aG9zZSBwcm9wcyBhcmUgdXNlZCBmb3IgdmFsaWRhdGluZyBpbnB1dHNcclxuICogY2xhc3MgYmVsb3cgaXMgY29weSBvZiBPd2xPcHRpb25zIGJ1dCBpdHMgYWxsIHByb3BzIGhhdmUgc3RyaW5nIHZhbHVlIHNob3dpbmcgY2VydGFpbiB0eXBlO1xyXG4gKiB0aGlzIGlzIGNsYXNzIGlzIGJlaW5nIHVzZWQganVzdCBpbiBtZXRob2QgX3ZhbGlkYXRlT3B0aW9ucygpIG9mIENhcm91c2VsU2VydmljZTtcclxuICovXHJcbmV4cG9ydCBjbGFzcyBPd2xPcHRpb25zTW9ja2VkVHlwZXMge1xyXG4gIGl0ZW1zID0gJ251bWJlcic7XHJcbiAgbG9vcCA9ICdib29sZWFuJztcclxuICBjZW50ZXIgPSAnYm9vbGVhbic7XHJcbiAgcmV3aW5kID0gJ2Jvb2xlYW4nO1xyXG5cclxuICBtb3VzZURyYWcgPSAnYm9vbGVhbic7XHJcbiAgdG91Y2hEcmFnID0gJ2Jvb2xlYW4nO1xyXG4gIHB1bGxEcmFnID0gJ2Jvb2xlYW4nO1xyXG4gIGZyZWVEcmFnID0gJ2Jvb2xlYW4nO1xyXG5cclxuICBtYXJnaW4gPSAnbnVtYmVyJztcclxuICBzdGFnZVBhZGRpbmcgPSAnbnVtYmVyJztcclxuXHJcbiAgbWVyZ2UgPSAnYm9vbGVhbic7XHJcbiAgbWVyZ2VGaXQgPSAnYm9vbGVhbic7XHJcbiAgYXV0b1dpZHRoID0gJ2Jvb2xlYW4nO1xyXG5cclxuICBzdGFydFBvc2l0aW9uID0gJ251bWJlcnxzdHJpbmcnO1xyXG4gIHJ0bCA9ICdib29sZWFuJztcclxuXHJcbiAgc21hcnRTcGVlZCA9ICdudW1iZXInO1xyXG4gIGZsdWlkU3BlZWQgPSAnYm9vbGVhbic7XHJcbiAgZHJhZ0VuZFNwZWVkID0gJ251bWJlcnxib29sZWFuJztcclxuXHJcbiAgcmVzcG9uc2l2ZSA9IHt9O1xyXG4gIHJlc3BvbnNpdmVSZWZyZXNoUmF0ZSA9ICdudW1iZXInO1xyXG5cclxuICAvLyBkZWZhdWx0cyB0byBOYXZpZ2F0aW9uXHJcbiAgbmF2ID0gJ2Jvb2xlYW4nO1xyXG4gIG5hdlRleHQgPSAnc3RyaW5nW10nO1xyXG4gIG5hdlNwZWVkID0gJ251bWJlcnxib29sZWFuJztcclxuICBzbGlkZUJ5ID0gJ251bWJlcnxzdHJpbmcnOyAvLyBzdGFnZSBtb3ZlcyBvbiAxIHdpZHRoIG9mIHNsaWRlOyBpZiBzbGlkZUJ5ID0gMiwgc3RhZ2UgbW92ZXMgb24gMiB3aWR0aHMgb2Ygc2xpZGVcclxuICBkb3RzID0gJ2Jvb2xlYW4nO1xyXG4gIGRvdHNFYWNoID0gJ251bWJlcnxib29sZWFuJztcclxuICBkb3RzRGF0YSA9ICdib29sZWFuJztcclxuICBkb3RzU3BlZWQgPSAnbnVtYmVyfGJvb2xlYW4nO1xyXG5cclxuICAvLyBkZWZhdWx0cyB0byBBdXRvcGxheVxyXG4gIGF1dG9wbGF5ID0gJ2Jvb2xlYW4nO1xyXG4gIGF1dG9wbGF5VGltZW91dCA9ICdudW1iZXInO1xyXG4gIGF1dG9wbGF5SG92ZXJQYXVzZSA9ICdib29sZWFuJztcclxuICBhdXRvcGxheVNwZWVkID0gJ251bWJlcnxib29sZWFuJztcclxuXHJcbiAgLy8gZGVmYXVsdHMgdG8gTGF6eUxvYWRpbmdcclxuICBsYXp5TG9hZCA9ICdib29sZWFuJztcclxuICBsYXp5TG9hZEVhZ2VyID0gJ251bWJlcic7XHJcblxyXG4gIC8vIGRlZmF1bHRzIHRvIEFuaW1hdGVcclxuICBhbmltYXRlT3V0ID0gJ3N0cmluZ3xib29sZWFuJztcclxuICBhbmltYXRlSW4gPSAnc3RyaW5nfGJvb2xlYW4nO1xyXG5cclxuICAvLyBkZWZhdWx0cyB0byBBdXRvSGVpZ2h0XHJcbiAgYXV0b0hlaWdodCA9ICdib29sZWFuJztcclxuXHJcbiAgLy8gZGVmYXVsdHMgdG8gSGFzaFxyXG4gIFVSTGhhc2hMaXN0ZW5lciA9IFwiYm9vbGVhblwiO1xyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcbn0iLCJcclxuaW1wb3J0IHsgU3RhZ2VEYXRhIH0gZnJvbSAnLi4vbW9kZWxzL3N0YWdlLWRhdGEubW9kZWwnO1xyXG5cclxuaW1wb3J0IHsgT3dsRE9NRGF0YSB9IGZyb20gJy4uL21vZGVscy9vd2xET00tZGF0YS5tb2RlbCc7XHJcblxyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlIH0gZnJvbSAnLi4vY2Fyb3VzZWwvY2Fyb3VzZWwubW9kdWxlJztcclxuaW1wb3J0IHsgU2xpZGVNb2RlbCB9IGZyb20gJy4uL21vZGVscy9zbGlkZS5tb2RlbCc7XHJcbmltcG9ydCB7IFN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgT3dsQ2Fyb3VzZWxPQ29uZmlnLCBPd2xPcHRpb25zTW9ja2VkVHlwZXMgfSBmcm9tICcuLi9jYXJvdXNlbC9vd2wtY2Fyb3VzZWwtby1jb25maWcnO1xyXG5pbXBvcnQgeyBPd2xPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWxzL293bC1vcHRpb25zLm1vZGVsJztcclxuXHJcbmltcG9ydCB7IE5hdkRhdGEsIERvdHNEYXRhIH0gZnJvbSAnLi4vbW9kZWxzL25hdmlnYXRpb24tZGF0YS5tb2RlbHMnO1xyXG5cclxuLyoqXHJcbiAqIEN1cnJlbnQgc3RhdGUgaW5mb3JtYXRpb24gYW5kIHRoZWlyIHRhZ3MuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU3RhdGVzIHtcclxuICBjdXJyZW50OiB7fTtcclxuICB0YWdzOiB7XHJcbiAgICBba2V5OiBzdHJpbmddOiBzdHJpbmdbXTtcclxuICB9O1xyXG59XHJcblxyXG4vKipcclxuICogRW51bWVyYXRpb24gZm9yIHR5cGVzLlxyXG4gKiBAZW51bSB7U3RyaW5nfVxyXG4gKi9cclxuZXhwb3J0IGVudW0gVHlwZSB7XHJcblx0RXZlbnQgPSAnZXZlbnQnLFxyXG5cdFN0YXRlID0gJ3N0YXRlJ1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEVudW1lcmF0aW9uIGZvciB3aWR0aC5cclxuICogQGVudW0ge1N0cmluZ31cclxuICovXHJcbmV4cG9ydCBlbnVtIFdpZHRoIHtcclxuXHREZWZhdWx0ID0gJ2RlZmF1bHQnLFxyXG5cdElubmVyID0gJ2lubmVyJyxcclxuXHRPdXRlciA9ICdvdXRlcidcclxufTtcclxuXHJcbi8qKlxyXG4gKiBNb2RlbCBmb3IgY29vcmRzIG9mIC5vd2wtc3RhZ2VcclxuICovXHJcbmV4cG9ydCBjbGFzcyBDb29yZHMge1xyXG5cdHg6IG51bWJlcjtcclxuXHR5OiBudW1iZXI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBNb2RlbCBmb3IgYWxsIGN1cnJlbnQgZGF0YSBvZiBjYXJvdXNlbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENhcm91c2VsQ3VycmVudERhdGEge1xyXG5cdG93bERPTURhdGE6IE93bERPTURhdGE7XHJcblx0c3RhZ2VEYXRhOiBTdGFnZURhdGE7XHJcblx0c2xpZGVzRGF0YTogU2xpZGVNb2RlbFtdO1xyXG5cdG5hdkRhdGE6IE5hdkRhdGE7XHJcblx0ZG90c0RhdGE6IERvdHNEYXRhO1xyXG59XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBDYXJvdXNlbFNlcnZpY2Uge1xyXG5cdC8qKlxyXG4gICAqIFN1YmplY3QgZm9yIHBhc3NpbmcgZGF0YSBuZWVkZWQgZm9yIG1hbmFnaW5nIFZpZXdcclxuICAgKi9cclxuXHRwcml2YXRlIF92aWV3U2V0dGluZ3NTaGlwcGVyJCA9IG5ldyBTdWJqZWN0PENhcm91c2VsQ3VycmVudERhdGE+KCk7XHJcblx0LyoqXHJcbiAgICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uIHdoZW4gdGhlIGNhcm91c2VsIGdvdCBpbml0aWFsaXplc1xyXG4gICAqL1xyXG5cdHByaXZhdGUgX2luaXRpYWxpemVkQ2Fyb3VzZWwkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xyXG5cclxuXHQvKipcclxuICAgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gd2hlbiB0aGUgY2Fyb3VzZWwncyBzZXR0aW5ncyBzdGFydCBjaGFuZ2luZlxyXG4gICAqL1xyXG5cdHByaXZhdGUgX2NoYW5nZVNldHRpbmdzQ2Fyb3VzZWwkID0gbmV3IFN1YmplY3Q8YW55PigpO1xyXG5cclxuXHQvKipcclxuICAgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gd2hlbiB0aGUgY2Fyb3VzZWwncyBzZXR0aW5ncyBoYXZlIGNoYW5nZWRcclxuICAgKi9cclxuXHRwcml2YXRlIF9jaGFuZ2VkU2V0dGluZ3NDYXJvdXNlbCQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XHJcblx0LyoqXHJcbiAgICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uIHdoZW4gdGhlIGNhcm91c2VsIHN0YXJ0cyB0cmFuc2xhdGluZyBvciBtb3ZpbmdcclxuICAgKi9cclxuXHRwcml2YXRlIF90cmFuc2xhdGVDYXJvdXNlbCQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XHJcblx0LyoqXHJcbiAgICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uIHdoZW4gdGhlIGNhcm91c2VsIHN0b3BwZWQgdHJhbnNsYXRpbmcgb3IgbW92aW5nXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfdHJhbnNsYXRlZENhcm91c2VsJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcclxuXHQvKipcclxuICAgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gd2hlbiB0aGUgY2Fyb3VzZWwncyByZWJ1aWxkaW5nIGNhdXNlZCBieSAncmVzaXplJyBldmVudCBzdGFydHNcclxuICAgKi9cclxuXHRwcml2YXRlIF9yZXNpemVDYXJvdXNlbCQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XHJcblx0LyoqXHJcbiAgICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uICB3aGVuIHRoZSBjYXJvdXNlbCdzIHJlYnVpbGRpbmcgY2F1c2VkIGJ5ICdyZXNpemUnIGV2ZW50IGlzIGVuZGVkXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfcmVzaXplZENhcm91c2VsJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcclxuXHQvKipcclxuICAgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gd2hlbiB0aGUgcmVmcmVzaCBvZiBjYXJvdXNlbCBzdGFydHNcclxuICAgKi9cclxuXHRwcml2YXRlIF9yZWZyZXNoQ2Fyb3VzZWwkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xyXG5cdC8qKlxyXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSByZWZyZXNoIG9mIGNhcm91c2VsIGlzIGVuZGVkXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfcmVmcmVzaGVkQ2Fyb3VzZWwkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xyXG5cdC8qKlxyXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSBkcmFnZ2luZyBvZiBjYXJvdXNlbCBzdGFydHNcclxuICAgKi9cclxuXHRwcml2YXRlIF9kcmFnQ2Fyb3VzZWwkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xyXG5cdC8qKlxyXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSBkcmFnZ2luZyBvZiBjYXJvdXNlbCBpcyBlbmRlZFxyXG4gICAqL1xyXG5cdHByaXZhdGUgX2RyYWdnZWRDYXJvdXNlbCQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEN1cnJlbnQgc2V0dGluZ3MgZm9yIHRoZSBjYXJvdXNlbC5cclxuICAgKi9cclxuICBzZXR0aW5nczogT3dsT3B0aW9ucyA9IHtcclxuXHRcdGl0ZW1zOiAwXHJcblx0fTtcclxuXHJcblx0LyoqXHJcbiAgICogSW5pdGlhbCBkYXRhIGZvciBzZXR0aW5nIGNsYXNzZXMgdG8gZWxlbWVudCAub3dsLWNhcm91c2VsXHJcbiAgICovXHJcblx0b3dsRE9NRGF0YTogT3dsRE9NRGF0YSA9IHtcclxuXHRcdHJ0bDogZmFsc2UsXHJcblx0XHRpc1Jlc3BvbnNpdmU6IGZhbHNlLFxyXG5cdFx0aXNSZWZyZXNoZWQ6IGZhbHNlLFxyXG5cdFx0aXNMb2FkZWQ6IGZhbHNlLFxyXG5cdFx0aXNMb2FkaW5nOiBmYWxzZSxcclxuXHRcdGlzTW91c2VEcmFnYWJsZTogZmFsc2UsXHJcblx0XHRpc0dyYWI6IGZhbHNlLFxyXG5cdFx0aXNUb3VjaERyYWdhYmxlOiBmYWxzZVxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG4gICAqIEluaXRpYWwgZGF0YSBvZiAub3dsLXN0YWdlXHJcbiAgICovXHJcblx0c3RhZ2VEYXRhOiBTdGFnZURhdGEgPSB7XHJcblx0XHR0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgwcHgsMHB4LDBweCknLFxyXG5cdFx0dHJhbnNpdGlvbjogJzBzJyxcclxuXHRcdHdpZHRoOiAwLFxyXG5cdFx0cGFkZGluZ0w6IDAsXHJcblx0XHRwYWRkaW5nUjogMFxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqICBEYXRhIG9mIGV2ZXJ5IHNsaWRlXHJcblx0ICovXHJcblx0c2xpZGVzRGF0YTogU2xpZGVNb2RlbFtdO1xyXG5cclxuXHQvKipcclxuXHQgKiBEYXRhIG9mIG5hdmlnYXRpb24gYmxvY2tcclxuXHQgKi9cclxuXHRuYXZEYXRhOiBOYXZEYXRhO1xyXG5cclxuXHQvKipcclxuXHQgKiBEYXRhIG9mIGRvdHMgYmxvY2tcclxuXHQgKi9cclxuXHRkb3RzRGF0YTogRG90c0RhdGE7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENhcm91c2VsIHdpZHRoXHJcblx0ICovXHJcblx0cHJpdmF0ZSBfd2lkdGg6IG51bWJlcjtcclxuXHJcblx0LyoqXHJcblx0ICogQWxsIHJlYWwgaXRlbXMuXHJcblx0ICovXHJcblx0cHJpdmF0ZSBfaXRlbXM6IENhcm91c2VsU2xpZGVEaXJlY3RpdmVbXSA9IFtdOyAvLyBpcyBlcXVhbCB0byB0aGlzLnNsaWRlc1xyXG5cclxuXHQvKipcclxuICAgKiBBcnJheSB3aXRoIHdpZHRoIG9mIGV2ZXJ5IHNsaWRlLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3dpZHRoczogYW55W10gPSBbXTtcclxuXHJcblx0LyoqXHJcbiAgICogQ3VycmVudGx5IHN1cHByZXNzZWQgZXZlbnRzIHRvIHByZXZlbnQgdGhlbSBmcm9tIGJlZWluZyByZXRyaWdnZXJlZC5cclxuICAgKi9cclxuXHRwcml2YXRlIF9zdXByZXNzOiBhbnkgPSB7fTtcclxuXHJcbiAgLyoqXHJcbiAgICogUmVmZXJlbmNlcyB0byB0aGUgcnVubmluZyBwbHVnaW5zIG9mIHRoaXMgY2Fyb3VzZWwuXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfcGx1Z2luczogYW55ID0ge307XHJcblxyXG5cdC8qKlxyXG4gICAqIEFic29sdXRlIGN1cnJlbnQgcG9zaXRpb24uXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfY3VycmVudDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XHJcblxyXG5cdC8qKlxyXG4gICAqIEFsbCBjbG9uZWQgaXRlbXMuXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfY2xvbmVzOiBhbnlbXSA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiBNZXJnZSB2YWx1ZXMgb2YgYWxsIGl0ZW1zLlxyXG4gICAqIEB0b2RvIE1heWJlIHRoaXMgY291bGQgYmUgcGFydCBvZiBhIHBsdWdpbi5cclxuICAgKi9cclxuXHRyZWFkb25seSBfbWVyZ2VyczogYW55W10gPSBbXTtcclxuXHJcblx0LyoqXHJcbiAgICogQW5pbWF0aW9uIHNwZWVkIGluIG1pbGxpc2Vjb25kcy5cclxuICAgKi9cclxuXHRwcml2YXRlIF9zcGVlZDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XHJcblxyXG5cdC8qKlxyXG4gICAqIENvb3JkaW5hdGVzIG9mIGFsbCBpdGVtcyBpbiBwaXhlbC5cclxuICAgKiBAdG9kbyBUaGUgbmFtZSBvZiB0aGlzIG1lbWJlciBpcyBtaXNzbGVhZGluZy5cclxuICAgKi9cclxuXHRwcml2YXRlIF9jb29yZGluYXRlczogbnVtYmVyW10gPSBbXTtcclxuXHJcblx0LyoqXHJcbiAgICogQ3VycmVudCBicmVha3BvaW50LlxyXG4gICAqIEB0b2RvIFJlYWwgbWVkaWEgcXVlcmllcyB3b3VsZCBiZSBuaWNlLlxyXG4gICAqL1xyXG5cdHByaXZhdGUgX2JyZWFrcG9pbnQ6IGFueSA9IG51bGw7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFByZWZpeCBmb3IgaWQgb2YgY2xvbmVkIHNsaWRlc1xyXG5cdCAqL1xyXG5cdGNsb25lZElkUHJlZml4ID0gJ2Nsb25lZC0nO1xyXG5cclxuXHQvKipcclxuXHQgKiBDdXJyZW50IG9wdGlvbnMgc2V0IGJ5IHRoZSBjYWxsZXIgaW5jbHVkaW5nIGRlZmF1bHRzLlxyXG5cdCAqL1xyXG5cdF9vcHRpb25zOiBPd2xPcHRpb25zID0ge307XHJcblxyXG4gIC8qKlxyXG4gICAqIEludmFsaWRhdGVkIHBhcnRzIHdpdGhpbiB0aGUgdXBkYXRlIHByb2Nlc3MuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfaW52YWxpZGF0ZWQ6IGFueSA9IHt9O1xyXG5cclxuICAvLyBJcyBuZWVkZWQgZm9yIHRlc3RzXHJcbiAgZ2V0IGludmFsaWRhdGVkKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2ludmFsaWRhdGVkO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBDdXJyZW50IHN0YXRlIGluZm9ybWF0aW9uIGFuZCB0aGVpciB0YWdzLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3N0YXRlczogU3RhdGVzID0ge1xyXG4gICAgY3VycmVudDoge30sXHJcbiAgICB0YWdzOiB7XHJcbiAgICAgIGluaXRpYWxpemluZzogWydidXN5J10sXHJcbiAgICAgIGFuaW1hdGluZzogWydidXN5J10sXHJcbiAgICAgIGRyYWdnaW5nOiBbJ2ludGVyYWN0aW5nJ11cclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvLyBpcyBuZWVkZWQgZm9yIHRlc3RzXHJcbiAgZ2V0IHN0YXRlcygpIHtcclxuICAgIHJldHVybiB0aGlzLl9zdGF0ZXM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuIFx0ICogT3JkZXJlZCBsaXN0IG9mIHdvcmtlcnMgZm9yIHRoZSB1cGRhdGUgcHJvY2Vzcy5cclxuICAgKi9cclxuICBwcml2YXRlIF9waXBlOiBhbnlbXSA9IFtcclxuICAgIC8vIHtcclxuICAgIC8vICAgZmlsdGVyOiBbJ3dpZHRoJywgJ3NldHRpbmdzJ10sXHJcbiAgICAvLyAgIHJ1bjogKCkgPT4ge1xyXG4gICAgLy8gICAgIHRoaXMuX3dpZHRoID0gdGhpcy5jYXJvdXNlbFdpbmRvd1dpZHRoO1xyXG4gICAgLy8gICB9XHJcbiAgICAvLyB9LFxyXG4gICAge1xyXG4gICAgICBmaWx0ZXI6IFsnd2lkdGgnLCAnaXRlbXMnLCAnc2V0dGluZ3MnXSxcclxuICAgICAgcnVuOiBjYWNoZSA9PiB7XHJcbiAgICAgICAgY2FjaGUuY3VycmVudCA9IHRoaXMuX2l0ZW1zICYmIHRoaXMuX2l0ZW1zW3RoaXMucmVsYXRpdmUodGhpcy5fY3VycmVudCldLmlkO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy8ge1xyXG4gICAgLy8gICBmaWx0ZXI6IFsnaXRlbXMnLCAnc2V0dGluZ3MnXSxcclxuICAgIC8vICAgcnVuOiBmdW5jdGlvbigpIHtcclxuICAgIC8vICAgICAvLyB0aGlzLiRzdGFnZS5jaGlsZHJlbignLmNsb25lZCcpLnJlbW92ZSgpO1xyXG4gICAgLy8gICB9XHJcblx0XHQvLyB9LFxyXG5cdFx0IHtcclxuICAgICAgZmlsdGVyOiBbICd3aWR0aCcsICdpdGVtcycsICdzZXR0aW5ncycgXSxcclxuICAgICAgcnVuOiAoY2FjaGUpID0+IHtcclxuICAgICAgICBjb25zdCBtYXJnaW4gPSB0aGlzLnNldHRpbmdzLm1hcmdpbiB8fCAnJyxcclxuICAgICAgICAgIGdyaWQgPSAhdGhpcy5zZXR0aW5ncy5hdXRvV2lkdGgsXHJcbiAgICAgICAgICBydGwgPSB0aGlzLnNldHRpbmdzLnJ0bCxcclxuICAgICAgICAgIGNzcyA9IHtcclxuICAgICAgICAgICAgJ21hcmdpbi1sZWZ0JzogcnRsID8gbWFyZ2luIDogJycsXHJcbiAgICAgICAgICAgICdtYXJnaW4tcmlnaHQnOiBydGwgPyAnJyA6IG1hcmdpblxyXG4gICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYoIWdyaWQpIHtcclxuXHRcdFx0XHRcdHRoaXMuc2xpZGVzRGF0YS5mb3JFYWNoKHNsaWRlID0+IHtcclxuXHRcdFx0XHRcdFx0c2xpZGUubWFyZ2luTCA9IGNzc1snbWFyZ2luLWxlZnQnXTtcclxuXHRcdFx0XHRcdFx0c2xpZGUubWFyZ2luUiA9IGNzc1snbWFyZ2luLXJpZ2h0J107XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9XHJcblxyXG4gICAgICAgIGNhY2hlLmNzcyA9IGNzcztcclxuICAgICAgfVxyXG4gICAgfSwge1xyXG4gICAgICBmaWx0ZXI6IFsgJ3dpZHRoJywgJ2l0ZW1zJywgJ3NldHRpbmdzJyBdLFxyXG4gICAgICBydW46IChjYWNoZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHdpZHRoOiBhbnkgPSArKHRoaXMud2lkdGgoKSAvIHRoaXMuc2V0dGluZ3MuaXRlbXMpLnRvRml4ZWQoMykgLSB0aGlzLnNldHRpbmdzLm1hcmdpbixcclxuICAgICAgICAgIGdyaWQgPSAhdGhpcy5zZXR0aW5ncy5hdXRvV2lkdGgsXHJcbiAgICAgICAgICB3aWR0aHMgPSBbXTtcclxuXHRcdFx0XHRsZXQgbWVyZ2UgPSBudWxsLFxyXG5cdFx0XHRcdFx0XHRpdGVyYXRvciA9IHRoaXMuX2l0ZW1zLmxlbmd0aDtcclxuXHJcbiAgICAgICAgY2FjaGUuaXRlbXMgPSB7XHJcbiAgICAgICAgICBtZXJnZTogZmFsc2UsXHJcbiAgICAgICAgICB3aWR0aDogd2lkdGhcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB3aGlsZSAoaXRlcmF0b3ItLSkge1xyXG4gICAgICAgICAgbWVyZ2UgPSB0aGlzLl9tZXJnZXJzW2l0ZXJhdG9yXTtcclxuICAgICAgICAgIG1lcmdlID0gdGhpcy5zZXR0aW5ncy5tZXJnZUZpdCAmJiBNYXRoLm1pbihtZXJnZSwgdGhpcy5zZXR0aW5ncy5pdGVtcykgfHwgbWVyZ2U7XHJcbiAgICAgICAgICBjYWNoZS5pdGVtcy5tZXJnZSA9IG1lcmdlID4gMSB8fCBjYWNoZS5pdGVtcy5tZXJnZTtcclxuXHJcbiAgICAgICAgICB3aWR0aHNbaXRlcmF0b3JdID0gIWdyaWQgPyB0aGlzLl9pdGVtc1tpdGVyYXRvcl0ud2lkdGggPyB0aGlzLl9pdGVtc1tpdGVyYXRvcl0ud2lkdGggOiB3aWR0aCA6IHdpZHRoICogbWVyZ2U7XHJcbiAgICAgICAgfVxyXG5cclxuXHRcdFx0XHR0aGlzLl93aWR0aHMgPSB3aWR0aHM7XHJcblxyXG5cdFx0XHRcdHRoaXMuc2xpZGVzRGF0YS5mb3JFYWNoKChzbGlkZSwgaSkgPT4ge1xyXG5cdFx0XHRcdFx0c2xpZGUud2lkdGggPSB0aGlzLl93aWR0aHNbaV07XHJcblx0XHRcdFx0XHRzbGlkZS5tYXJnaW5SID0gY2FjaGUuY3NzWydtYXJnaW4tcmlnaHQnXTtcclxuXHRcdFx0XHRcdHNsaWRlLm1hcmdpbkwgPSBjYWNoZS5jc3NbJ21hcmdpbi1sZWZ0J107XHJcblx0XHRcdFx0fSk7XHJcbiAgICAgIH1cclxuICAgIH0sIHtcclxuICAgICAgZmlsdGVyOiBbICdpdGVtcycsICdzZXR0aW5ncycgXSxcclxuICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgY2xvbmVzOiBhbnlbXSA9IFtdLFxyXG4gICAgICAgICAgaXRlbXM6IENhcm91c2VsU2xpZGVEaXJlY3RpdmVbXSA9IHRoaXMuX2l0ZW1zLFxyXG4gICAgICAgICAgc2V0dGluZ3M6IGFueSA9IHRoaXMuc2V0dGluZ3MsXHJcbiAgICAgICAgICAvLyBUT0RPOiBTaG91bGQgYmUgY29tcHV0ZWQgZnJvbSBudW1iZXIgb2YgbWluIHdpZHRoIGl0ZW1zIGluIHN0YWdlXHJcbiAgICAgICAgICB2aWV3ID0gTWF0aC5tYXgoc2V0dGluZ3MuaXRlbXMgKiAyLCA0KSxcclxuICAgICAgICAgIHNpemUgPSBNYXRoLmNlaWwoaXRlbXMubGVuZ3RoIC8gMikgKiAyO1xyXG5cdFx0XHRcdGxldCAgYXBwZW5kOiBhbnlbXSA9IFtdLFxyXG4gICAgICAgICAgcHJlcGVuZDogYW55W10gPSBbXSxcclxuXHRcdFx0XHRcdHJlcGVhdCA9IHNldHRpbmdzLmxvb3AgJiYgaXRlbXMubGVuZ3RoID8gc2V0dGluZ3MucmV3aW5kID8gdmlldyA6IE1hdGgubWF4KHZpZXcsIHNpemUpIDogMDtcclxuXHJcbiAgICAgICAgcmVwZWF0IC89IDI7XHJcblxyXG4gICAgICAgIHdoaWxlIChyZXBlYXQtLSkge1xyXG4gICAgICAgICAgLy8gU3dpdGNoIHRvIG9ubHkgdXNpbmcgYXBwZW5kZWQgY2xvbmVzXHJcbiAgICAgICAgICBjbG9uZXMucHVzaCh0aGlzLm5vcm1hbGl6ZShjbG9uZXMubGVuZ3RoIC8gMiwgdHJ1ZSkpO1xyXG4gICAgICAgICAgYXBwZW5kLnB1c2goeyAuLi50aGlzLnNsaWRlc0RhdGFbY2xvbmVzW2Nsb25lcy5sZW5ndGggLSAxXV19KTtcclxuXHRcdFx0XHRcdGNsb25lcy5wdXNoKHRoaXMubm9ybWFsaXplKGl0ZW1zLmxlbmd0aCAtIDEgLSAoY2xvbmVzLmxlbmd0aCAtIDEpIC8gMiwgdHJ1ZSkpO1xyXG5cdFx0XHRcdFx0cHJlcGVuZC51bnNoaWZ0KHsgLi4udGhpcy5zbGlkZXNEYXRhW2Nsb25lc1tjbG9uZXMubGVuZ3RoIC0gMV1dfSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHRcdFx0XHR0aGlzLl9jbG9uZXMgPSBjbG9uZXM7XHJcblxyXG5cdFx0XHRcdGFwcGVuZCA9IGFwcGVuZC5tYXAoc2xpZGUgPT4ge1xyXG5cdFx0XHRcdFx0c2xpZGUuaWQgPSBgJHt0aGlzLmNsb25lZElkUHJlZml4fSR7c2xpZGUuaWR9YDtcclxuXHRcdFx0XHRcdHNsaWRlLmlzQWN0aXZlID0gZmFsc2U7XHJcblx0XHRcdFx0XHRzbGlkZS5pc0Nsb25lZCA9IHRydWU7XHJcblx0XHRcdFx0XHRyZXR1cm4gc2xpZGU7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdHByZXBlbmQgPSBwcmVwZW5kLm1hcChzbGlkZSA9PiB7XHJcblx0XHRcdFx0XHRzbGlkZS5pZCA9IGAke3RoaXMuY2xvbmVkSWRQcmVmaXh9JHtzbGlkZS5pZH1gO1xyXG5cdFx0XHRcdFx0c2xpZGUuaXNBY3RpdmUgPSBmYWxzZTtcclxuXHRcdFx0XHRcdHNsaWRlLmlzQ2xvbmVkID0gdHJ1ZTtcclxuXHRcdFx0XHRcdHJldHVybiBzbGlkZTtcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0dGhpcy5zbGlkZXNEYXRhID0gcHJlcGVuZC5jb25jYXQodGhpcy5zbGlkZXNEYXRhKS5jb25jYXQoYXBwZW5kKTtcclxuICAgICAgfVxyXG4gICAgfSwge1xyXG4gICAgICBmaWx0ZXI6IFsgJ3dpZHRoJywgJ2l0ZW1zJywgJ3NldHRpbmdzJyBdLFxyXG4gICAgICBydW46ICgpID0+IHtcclxuICAgICAgICBjb25zdCBydGwgPSB0aGlzLnNldHRpbmdzLnJ0bCA/IDEgOiAtMSxcclxuICAgICAgICAgIHNpemUgPSB0aGlzLl9jbG9uZXMubGVuZ3RoICsgdGhpcy5faXRlbXMubGVuZ3RoLFxyXG4gICAgICAgICAgY29vcmRpbmF0ZXMgPSBbXTtcclxuICAgICAgICBsZXQgaXRlcmF0b3IgPSAtMSxcclxuICAgICAgICAgIHByZXZpb3VzID0gMCxcclxuICAgICAgICAgIGN1cnJlbnQgPSAwO1xyXG5cclxuICAgICAgICB3aGlsZSAoKytpdGVyYXRvciA8IHNpemUpIHtcclxuICAgICAgICAgIHByZXZpb3VzID0gY29vcmRpbmF0ZXNbaXRlcmF0b3IgLSAxXSB8fCAwO1xyXG4gICAgICAgICAgY3VycmVudCA9IHRoaXMuX3dpZHRoc1t0aGlzLnJlbGF0aXZlKGl0ZXJhdG9yKV0gKyB0aGlzLnNldHRpbmdzLm1hcmdpbjtcclxuICAgICAgICAgIGNvb3JkaW5hdGVzLnB1c2gocHJldmlvdXMgKyBjdXJyZW50ICogcnRsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2Nvb3JkaW5hdGVzID0gY29vcmRpbmF0ZXM7XHJcbiAgICAgIH1cclxuICAgIH0sIHtcclxuICAgICAgZmlsdGVyOiBbICd3aWR0aCcsICdpdGVtcycsICdzZXR0aW5ncycgXSxcclxuICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcGFkZGluZyA9IHRoaXMuc2V0dGluZ3Muc3RhZ2VQYWRkaW5nLFxyXG4gICAgICAgICAgY29vcmRpbmF0ZXMgPSB0aGlzLl9jb29yZGluYXRlcyxcclxuICAgICAgICAgIGNzcyA9IHtcclxuICAgICAgICAgICAgJ3dpZHRoJzogTWF0aC5jZWlsKE1hdGguYWJzKGNvb3JkaW5hdGVzW2Nvb3JkaW5hdGVzLmxlbmd0aCAtIDFdKSkgKyBwYWRkaW5nICogMixcclxuICAgICAgICAgICAgJ3BhZGRpbmctbGVmdCc6IHBhZGRpbmcgfHwgJycsXHJcbiAgICAgICAgICAgICdwYWRkaW5nLXJpZ2h0JzogcGFkZGluZyB8fCAnJ1xyXG5cdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0dGhpcy5zdGFnZURhdGEud2lkdGggPSBjc3Mud2lkdGg7IC8vIHVzZSB0aGlzIHByb3BlcnR5IGluICpuZ0lmIGRpcmVjdGl2ZSBmb3IgLm93bC1zdGFnZSBlbGVtZW50XHJcblx0XHRcdFx0dGhpcy5zdGFnZURhdGEucGFkZGluZ0wgPSBjc3NbJ3BhZGRpbmctbGVmdCddO1xyXG5cdFx0XHRcdHRoaXMuc3RhZ2VEYXRhLnBhZGRpbmdSID0gY3NzWydwYWRkaW5nLXJpZ2h0J107XHJcbiAgICAgIH1cclxuICAgIH0sIHtcclxuICAgIC8vICAgZmlsdGVyOiBbICd3aWR0aCcsICdpdGVtcycsICdzZXR0aW5ncycgXSxcclxuICAgIC8vICAgcnVuOiBjYWNoZSA9PiB7XHJcblx0XHQvLyBcdFx0Ly8gdGhpcyBtZXRob2Qgc2V0cyB0aGUgd2lkdGggZm9yIGV2ZXJ5IHNsaWRlLCBidXQgSSBzZXQgaXQgaW4gZGlmZmVyZW50IHdheSBlYXJsaWVyXHJcblx0XHQvLyBcdFx0Y29uc3QgZ3JpZCA9ICF0aGlzLnNldHRpbmdzLmF1dG9XaWR0aCxcclxuXHRcdC8vIFx0XHRpdGVtcyA9IHRoaXMuJHN0YWdlLmNoaWxkcmVuKCk7IC8vIHVzZSB0aGlzLnNsaWRlc0RhdGFcclxuICAgIC8vICAgICBsZXQgaXRlcmF0b3IgPSB0aGlzLl9jb29yZGluYXRlcy5sZW5ndGg7XHJcblxyXG4gICAgLy8gICAgIGlmIChncmlkICYmIGNhY2hlLml0ZW1zLm1lcmdlKSB7XHJcbiAgICAvLyAgICAgICB3aGlsZSAoaXRlcmF0b3ItLSkge1xyXG4gICAgLy8gICAgICAgICBjYWNoZS5jc3Mud2lkdGggPSB0aGlzLl93aWR0aHNbdGhpcy5yZWxhdGl2ZShpdGVyYXRvcildO1xyXG4gICAgLy8gICAgICAgICBpdGVtcy5lcShpdGVyYXRvcikuY3NzKGNhY2hlLmNzcyk7XHJcbiAgICAvLyAgICAgICB9XHJcbiAgICAvLyAgICAgfSBlbHNlIGlmIChncmlkKSB7XHJcbiAgICAvLyAgICAgICBjYWNoZS5jc3Mud2lkdGggPSBjYWNoZS5pdGVtcy53aWR0aDtcclxuICAgIC8vICAgICAgIGl0ZW1zLmNzcyhjYWNoZS5jc3MpO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgfVxyXG4gICAgLy8gfSwge1xyXG4gICAgLy8gICBmaWx0ZXI6IFsgJ2l0ZW1zJyBdLFxyXG4gICAgLy8gICBydW46IGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gICAgIHRoaXMuX2Nvb3JkaW5hdGVzLmxlbmd0aCA8IDEgJiYgdGhpcy4kc3RhZ2UucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgIC8vICAgfVxyXG4gICAgLy8gfSwge1xyXG4gICAgICBmaWx0ZXI6IFsgJ3dpZHRoJywgJ2l0ZW1zJywgJ3NldHRpbmdzJyBdLFxyXG4gICAgICBydW46IGNhY2hlID0+IHtcclxuICAgICAgICBsZXQgY3VycmVudCA9IGNhY2hlLmN1cnJlbnQgPyB0aGlzLnNsaWRlc0RhdGEuZmluZEluZGV4KHNsaWRlID0+IHNsaWRlLmlkID09PSBjYWNoZS5jdXJyZW50KSA6IDA7XHJcbiAgICAgICBcdGN1cnJlbnQgPSBNYXRoLm1heCh0aGlzLm1pbmltdW0oKSwgTWF0aC5taW4odGhpcy5tYXhpbXVtKCksIGN1cnJlbnQpKTtcclxuICAgICAgICB0aGlzLnJlc2V0KGN1cnJlbnQpO1xyXG4gICAgICB9XHJcbiAgICB9LCB7XHJcbiAgICAgIGZpbHRlcjogWyAncG9zaXRpb24nIF0sXHJcbiAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuYW5pbWF0ZSh0aGlzLmNvb3JkaW5hdGVzKHRoaXMuX2N1cnJlbnQpKTtcclxuICAgICAgfVxyXG4gICAgfSwge1xyXG4gICAgICBmaWx0ZXI6IFsgJ3dpZHRoJywgJ3Bvc2l0aW9uJywgJ2l0ZW1zJywgJ3NldHRpbmdzJyBdLFxyXG4gICAgICBydW46ICgpID0+IHtcclxuICAgICAgICBjb25zdCBydGwgPSB0aGlzLnNldHRpbmdzLnJ0bCA/IDEgOiAtMSxcclxuXHRcdFx0XHRcdHBhZGRpbmcgPSB0aGlzLnNldHRpbmdzLnN0YWdlUGFkZGluZyAqIDIsXHJcblx0XHRcdFx0XHRtYXRjaGVzID0gW107XHJcblx0XHRcdFx0bGV0IGJlZ2luLCBlbmQsIGlubmVyLCBvdXRlciwgaSwgbjtcclxuXHJcblx0XHRcdFx0YmVnaW4gPSB0aGlzLmNvb3JkaW5hdGVzKHRoaXMuY3VycmVudCgpKTtcclxuXHRcdFx0XHRpZiAodHlwZW9mIGJlZ2luID09PSAnbnVtYmVyJyApIHtcclxuXHRcdFx0XHRcdGJlZ2luICs9IHBhZGRpbmc7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGJlZ2luID0gMDtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGVuZCA9IGJlZ2luICsgdGhpcy53aWR0aCgpICogcnRsO1xyXG5cclxuXHRcdFx0XHRpZiAocnRsID09PSAtMSAmJiB0aGlzLnNldHRpbmdzLmNlbnRlcikge1xyXG5cdFx0XHRcdFx0Y29uc3QgcmVzdWx0ID1cdHRoaXMuX2Nvb3JkaW5hdGVzLmZpbHRlcihlbGVtZW50ID0+IHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuc2V0dGluZ3MuaXRlbXMgJSAyID09PSAxID8gZWxlbWVudCA+PSBiZWdpbiA6IGVsZW1lbnQgPiBiZWdpbjtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0YmVnaW4gPSByZXN1bHQubGVuZ3RoID8gcmVzdWx0W3Jlc3VsdC5sZW5ndGggLSAxXSA6IGJlZ2luO1xyXG5cdFx0XHRcdH1cclxuXHJcbiAgICAgICAgZm9yIChpID0gMCwgbiA9IHRoaXMuX2Nvb3JkaW5hdGVzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgaW5uZXIgPSBNYXRoLmNlaWwodGhpcy5fY29vcmRpbmF0ZXNbaSAtIDFdIHx8IDApO1xyXG5cdFx0XHRcdFx0b3V0ZXIgPSBNYXRoLmNlaWwoTWF0aC5hYnModGhpcy5fY29vcmRpbmF0ZXNbaV0pICsgcGFkZGluZyAqIHJ0bCk7XHJcblxyXG4gICAgICAgICAgaWYgKCh0aGlzLl9vcChpbm5lciwgJzw9JywgYmVnaW4pICYmICh0aGlzLl9vcChpbm5lciwgJz4nLCBlbmQpKSlcclxuICAgICAgICAgICAgfHwgKHRoaXMuX29wKG91dGVyLCAnPCcsIGJlZ2luKSAmJiB0aGlzLl9vcChvdXRlciwgJz4nLCBlbmQpKSkge1xyXG4gICAgICAgICAgICBtYXRjaGVzLnB1c2goaSk7XHJcbiAgICAgICAgICB9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR0aGlzLnNsaWRlc0RhdGEuZm9yRWFjaChzbGlkZSA9PiB7XHJcblx0XHRcdFx0XHRzbGlkZS5pc0FjdGl2ZSA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0cmV0dXJuIHNsaWRlO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdG1hdGNoZXMuZm9yRWFjaChpdGVtID0+IHtcclxuXHRcdFx0XHRcdHRoaXMuc2xpZGVzRGF0YVtpdGVtXS5pc0FjdGl2ZSA9IHRydWU7XHJcblx0XHRcdFx0fSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmNlbnRlcikge1xyXG5cdFx0XHRcdFx0dGhpcy5zbGlkZXNEYXRhLmZvckVhY2goc2xpZGUgPT4ge1xyXG5cdFx0XHRcdFx0XHRzbGlkZS5pc0NlbnRlcmVkID0gZmFsc2U7XHJcblx0XHRcdFx0XHRcdHJldHVybiBzbGlkZTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0dGhpcy5zbGlkZXNEYXRhW3RoaXMuY3VycmVudCgpXS5pc0NlbnRlcmVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICBdO1xyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBfdmlld1NldHRpbmdzU2hpcHBlciQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxyXG5cdCAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX3ZpZXdTZXR0aW5nc1NoaXBwZXIkIFN1YmplY3RcclxuXHQgKi9cclxuXHRnZXRWaWV3Q3VyU2V0dGluZ3MoKTogT2JzZXJ2YWJsZTxDYXJvdXNlbEN1cnJlbnREYXRhPiB7XHJcblx0XHRyZXR1cm4gdGhpcy5fdmlld1NldHRpbmdzU2hpcHBlciQuYXNPYnNlcnZhYmxlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBfaW5pdGlhbGl6ZWRDYXJvdXNlbCQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxyXG5cdCAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX2luaXRpYWxpemVkQ2Fyb3VzZWwkIFN1YmplY3RcclxuXHQgKi9cclxuXHRnZXRJbml0aWFsaXplZFN0YXRlKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XHJcblx0XHRyZXR1cm4gdGhpcy5faW5pdGlhbGl6ZWRDYXJvdXNlbCQuYXNPYnNlcnZhYmxlKClcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIF9jaGFuZ2VTZXR0aW5nc0Nhcm91c2VsJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXHJcblx0ICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfY2hhbmdlU2V0dGluZ3NDYXJvdXNlbCQgU3ViamVjdFxyXG5cdCAqL1xyXG5cdGdldENoYW5nZVN0YXRlKCk6IE9ic2VydmFibGU8YW55PiB7XHJcblx0XHRyZXR1cm4gdGhpcy5fY2hhbmdlU2V0dGluZ3NDYXJvdXNlbCQuYXNPYnNlcnZhYmxlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBfY2hhbmdlZFNldHRpbmdzQ2Fyb3VzZWwkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcclxuXHQgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIF9jaGFuZ2VkU2V0dGluZ3NDYXJvdXNlbCQgU3ViamVjdFxyXG5cdCAqL1xyXG5cdGdldENoYW5nZWRTdGF0ZSgpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2NoYW5nZWRTZXR0aW5nc0Nhcm91c2VsJC5hc09ic2VydmFibGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIF90cmFuc2xhdGVDYXJvdXNlbCQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxyXG5cdCAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX3RyYW5zbGF0ZUNhcm91c2VsJCBTdWJqZWN0XHJcblx0ICovXHJcblx0Z2V0VHJhbnNsYXRlU3RhdGUoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcclxuXHRcdHJldHVybiB0aGlzLl90cmFuc2xhdGVDYXJvdXNlbCQuYXNPYnNlcnZhYmxlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBfdHJhbnNsYXRlZENhcm91c2VsJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXHJcblx0ICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfdHJhbnNsYXRlZENhcm91c2VsJCBTdWJqZWN0XHJcblx0ICovXHJcblx0Z2V0VHJhbnNsYXRlZFN0YXRlKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XHJcblx0XHRyZXR1cm4gdGhpcy5fdHJhbnNsYXRlZENhcm91c2VsJC5hc09ic2VydmFibGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIF9yZXNpemVDYXJvdXNlbCQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxyXG5cdCAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX3Jlc2l6ZUNhcm91c2VsJCBTdWJqZWN0XHJcblx0ICovXHJcblx0Z2V0UmVzaXplU3RhdGUoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcclxuXHRcdHJldHVybiB0aGlzLl9yZXNpemVDYXJvdXNlbCQuYXNPYnNlcnZhYmxlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBfcmVzaXplZENhcm91c2VsJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXHJcblx0ICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfcmVzaXplZENhcm91c2VsJCBTdWJqZWN0XHJcblx0ICovXHJcblx0Z2V0UmVzaXplZFN0YXRlKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XHJcblx0XHRyZXR1cm4gdGhpcy5fcmVzaXplZENhcm91c2VsJC5hc09ic2VydmFibGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIF9yZWZyZXNoQ2Fyb3VzZWwkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcclxuXHQgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIF9yZWZyZXNoQ2Fyb3VzZWwkIFN1YmplY3RcclxuXHQgKi9cclxuXHRnZXRSZWZyZXNoU3RhdGUoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcclxuXHRcdHJldHVybiB0aGlzLl9yZWZyZXNoQ2Fyb3VzZWwkLmFzT2JzZXJ2YWJsZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgX3JlZnJlc2hlZENhcm91c2VsJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXHJcblx0ICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfcmVmcmVzaGVkQ2Fyb3VzZWwkIFN1YmplY3RcclxuXHQgKi9cclxuXHRnZXRSZWZyZXNoZWRTdGF0ZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3JlZnJlc2hlZENhcm91c2VsJC5hc09ic2VydmFibGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIF9kcmFnQ2Fyb3VzZWwkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcclxuXHQgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIF9kcmFnQ2Fyb3VzZWwkIFN1YmplY3RcclxuXHQgKi9cclxuXHRnZXREcmFnU3RhdGUoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcclxuXHRcdHJldHVybiB0aGlzLl9kcmFnQ2Fyb3VzZWwkLmFzT2JzZXJ2YWJsZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgX2RyYWdnZWRDYXJvdXNlbCQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxyXG5cdCAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX2RyYWdnZWRDYXJvdXNlbCQgU3ViamVjdFxyXG5cdCAqL1xyXG5cdGdldERyYWdnZWRTdGF0ZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2RyYWdnZWRDYXJvdXNlbCQuYXNPYnNlcnZhYmxlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXR1cHMgY3VzdG9tIG9wdGlvbnMgZXhwYW5kaW5nIGRlZmF1bHQgb3B0aW9uc1xyXG5cdCAqIEBwYXJhbSBvcHRpb25zIGN1c3RvbSBvcHRpb25zXHJcblx0ICovXHJcblx0c2V0T3B0aW9ucyhvcHRpb25zOiBPd2xPcHRpb25zKSB7XHJcblx0XHRjb25zdCBjb25maWdPcHRpb25zOiBPd2xPcHRpb25zID0gbmV3IE93bENhcm91c2VsT0NvbmZpZygpO1xyXG5cdFx0Y29uc3QgY2hlY2tlZE9wdGlvbnM6IE93bE9wdGlvbnMgPSB0aGlzLl92YWxpZGF0ZU9wdGlvbnMob3B0aW9ucywgY29uZmlnT3B0aW9ucyk7XHJcblx0XHR0aGlzLl9vcHRpb25zID0geyAuLi5jb25maWdPcHRpb25zLCAuLi5jaGVja2VkT3B0aW9uc307XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3Mgd2hldGhlciB1c2VyJ3Mgb3B0aW9uIGFyZSBzZXQgcHJvcGVybHkuIENoZWtpbmcgaXMgYmFzZWQgb24gdHlwaW5ncztcclxuXHQgKiBAcGFyYW0gb3B0aW9ucyBvcHRpb25zIHNldCBieSB1c2VyXHJcblx0ICogQHBhcmFtIGNvbmZpZ09wdGlvbnMgZGVmYXVsdCBvcHRpb25zXHJcblx0ICogQHJldHVybnMgY2hlY2tlZCBhbmQgbW9kaWZpZWQgKGlmIGl0J3MgbmVlZGVkKSB1c2VyJ3Mgb3B0aW9uc1xyXG5cdCAqXHJcblx0ICogTm90ZXM6XHJcblx0ICogXHQtIGlmIHVzZXIgc2V0IG9wdGlvbiB3aXRoIHdyb25nIHR5cGUsIGl0J2xsIGJlIHdyaXR0ZW4gaW4gY29uc29sZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgX3ZhbGlkYXRlT3B0aW9ucyhvcHRpb25zOiBPd2xPcHRpb25zLCBjb25maWdPcHRpb25zOiBPd2xPcHRpb25zKTogT3dsT3B0aW9ucyB7XHJcblx0XHRjb25zdCBjaGVja2VkT3B0aW9uczogT3dsT3B0aW9ucyA9IHsgLi4ub3B0aW9uc307XHJcblx0XHRjb25zdCBtb2NrZWRUeXBlcyA9IG5ldyBPd2xPcHRpb25zTW9ja2VkVHlwZXMoKTtcclxuXHJcblx0XHRmb3IgKGNvbnN0IGtleSBpbiBjaGVja2VkT3B0aW9ucykge1xyXG5cdFx0XHRpZiAoY2hlY2tlZE9wdGlvbnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG5cclxuXHRcdFx0XHQvLyBjb25kaXRpb24gY291bGQgYmUgc2hvcnRlbmVkIGJ1dCBpdCBnZXRzIGhhcmRlciBmb3IgdW5kZXJzdGFuZGluZ1xyXG5cdFx0XHRcdGlmIChtb2NrZWRUeXBlc1trZXldID09PSAnbnVtYmVyJykge1xyXG5cdFx0XHRcdFx0aWYgKHRoaXMuX2lzTnVtZXJpYyhjaGVja2VkT3B0aW9uc1trZXldKSkge1xyXG5cdFx0XHRcdFx0XHRjaGVja2VkT3B0aW9uc1trZXldID0gK2NoZWNrZWRPcHRpb25zW2tleV07XHJcblx0XHRcdFx0XHRcdGNoZWNrZWRPcHRpb25zW2tleV0gPSBrZXkgPT09ICdpdGVtcycgPyB0aGlzLl92YWxpZGF0ZUl0ZW1zKGNoZWNrZWRPcHRpb25zW2tleV0pIDogY2hlY2tlZE9wdGlvbnNba2V5XTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGNoZWNrZWRPcHRpb25zW2tleV0gPSBzZXRSaWdodE9wdGlvbihtb2NrZWRUeXBlc1trZXldLCBrZXkpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gZWxzZSBpZiAobW9ja2VkVHlwZXNba2V5XSA9PT0gJ2Jvb2xlYW4nICYmIHR5cGVvZiBjaGVja2VkT3B0aW9uc1trZXldICE9PSAnYm9vbGVhbicpIHtcclxuXHRcdFx0XHRcdGNoZWNrZWRPcHRpb25zW2tleV0gPSBzZXRSaWdodE9wdGlvbihtb2NrZWRUeXBlc1trZXldLCBrZXkpO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAobW9ja2VkVHlwZXNba2V5XSA9PT0gJ251bWJlcnxib29sZWFuJyAmJiAhdGhpcy5faXNOdW1iZXJPckJvb2xlYW4oY2hlY2tlZE9wdGlvbnNba2V5XSkpIHtcclxuXHRcdFx0XHRcdGNoZWNrZWRPcHRpb25zW2tleV0gPSBzZXRSaWdodE9wdGlvbihtb2NrZWRUeXBlc1trZXldLCBrZXkpO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAobW9ja2VkVHlwZXNba2V5XSA9PT0gJ251bWJlcnxzdHJpbmcnICYmICF0aGlzLl9pc051bWJlck9yU3RyaW5nKGNoZWNrZWRPcHRpb25zW2tleV0pKSB7XHJcblx0XHRcdFx0XHRjaGVja2VkT3B0aW9uc1trZXldID0gc2V0UmlnaHRPcHRpb24obW9ja2VkVHlwZXNba2V5XSwga2V5KTtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKG1vY2tlZFR5cGVzW2tleV0gPT09ICdzdHJpbmd8Ym9vbGVhbicgJiYgIXRoaXMuX2lzU3RyaW5nT3JCb29sZWFuKGNoZWNrZWRPcHRpb25zW2tleV0pKSB7XHJcblx0XHRcdFx0XHRjaGVja2VkT3B0aW9uc1trZXldID0gc2V0UmlnaHRPcHRpb24obW9ja2VkVHlwZXNba2V5XSwga2V5KTtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKG1vY2tlZFR5cGVzW2tleV0gPT09ICdzdHJpbmdbXScpIHtcclxuXHRcdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KGNoZWNrZWRPcHRpb25zW2tleV0pKSB7XHJcblx0XHRcdFx0XHRcdGxldCBpc1N0cmluZyA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRjaGVja2VkT3B0aW9uc1trZXldLmZvckVhY2goZWxlbWVudCA9PiB7XHJcblx0XHRcdFx0XHRcdFx0aXNTdHJpbmcgPSB0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycgPyB0cnVlIDogZmFsc2U7XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRpZiAoIWlzU3RyaW5nKSB7IGNoZWNrZWRPcHRpb25zW2tleV0gPSBzZXRSaWdodE9wdGlvbihtb2NrZWRUeXBlc1trZXldLCBrZXkpIH07XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRjaGVja2VkT3B0aW9uc1trZXldID0gc2V0UmlnaHRPcHRpb24obW9ja2VkVHlwZXNba2V5XSwga2V5KTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBzZXRSaWdodE9wdGlvbih0eXBlOiBzdHJpbmcsIGtleTogYW55KTogYW55IHtcclxuXHRcdFx0Y29uc29sZS5sb2coYG9wdGlvbnMuJHtrZXl9IG11c3QgYmUgdHlwZSBvZiAke3R5cGV9OyAke2tleX09JHtvcHRpb25zW2tleV19IHNraXBwZWQgdG8gZGVmYXVsdHM6ICR7a2V5fT0ke2NvbmZpZ09wdGlvbnNba2V5XX1gKTtcclxuXHRcdFx0cmV0dXJuIGNvbmZpZ09wdGlvbnNba2V5XTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gY2hlY2tlZE9wdGlvbnM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3Mgb3B0aW9uIGl0ZW1zIHNldCBieSB1c2VyIGFuZCBpZiBpdCBiaWdnZXIgdGhhbiBudW1iZXIgb2Ygc2xpZGVzIHRoZW4gcmV0dXJucyBudW1iZXIgb2Ygc2xpZGVzXHJcblx0ICogQHBhcmFtIGl0ZW1zIG9wdGlvbiBpdGVtcyBzZXQgYnkgdXNlclxyXG5cdCAqIEByZXR1cm5zIHJpZ2h0IG51bWJlciBvZiBpdGVtc1xyXG5cdCAqL1xyXG5cdHByaXZhdGUgX3ZhbGlkYXRlSXRlbXMoaXRlbXM6IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRsZXQgcmVzdWx0OiBudW1iZXI7XHJcblx0XHRpZiAoaXRlbXMgPiB0aGlzLl9pdGVtcy5sZW5ndGgpIHtcclxuXHRcdFx0cmVzdWx0ID0gdGhpcy5faXRlbXMubGVuZ3RoO1xyXG5cdFx0XHRjb25zb2xlLmxvZygnVGhlIG9wdGlvbiBcXCdpdGVtc1xcJyBpbiB5b3VyIG9wdGlvbnMgaXMgYmlnZ2VyIHRoYW4gdGhlIG51bWJlciBvZiBzbGlkZXMuIFRoaXMgb3B0aW9uIGlzIHVwZGF0ZWQgdG8gdGhlIGN1cnJlbnQgbnVtYmVyIG9mIHNsaWRlcyBhbmQgdGhlIG5hdmlnYXRpb24gZ290IGRpc2FibGVkJyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRpZiAoaXRlbXMgPT09IHRoaXMuX2l0ZW1zLmxlbmd0aCAmJiAodGhpcy5zZXR0aW5ncy5kb3RzIHx8IHRoaXMuc2V0dGluZ3MubmF2KSkge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdPcHRpb24gXFwnaXRlbXNcXCcgaW4geW91ciBvcHRpb25zIGlzIGVxdWFsIHRvIHRoZSBudW1iZXIgb2Ygc2xpZGVzLiBTbyB0aGUgbmF2aWdhdGlvbiBnb3QgZGlzYWJsZWQnKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXN1bHQgPSBpdGVtcztcclxuXHRcdH1cclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXQgY3VycmVudCB3aWR0aCBvZiBjYXJvdXNlbFxyXG5cdCAqIEBwYXJhbSB3aWR0aCB3aWR0aCBvZiBjYXJvdXNlbCBXaW5kb3dcclxuXHQgKi9cclxuXHRzZXRDYXJvdXNlbFdpZHRoKHdpZHRoOiBudW1iZXIpIHtcclxuXHRcdHRoaXMuX3dpZHRoID0gd2lkdGg7XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBTZXR1cHMgdGhlIGN1cnJlbnQgc2V0dGluZ3MuXHJcblx0ICogQHRvZG8gUmVtb3ZlIHJlc3BvbnNpdmUgY2xhc3Nlcy4gV2h5IHNob3VsZCBhZGFwdGl2ZSBkZXNpZ25zIGJlIGJyb3VnaHQgaW50byBJRTg/XHJcblx0ICogQHRvZG8gU3VwcG9ydCBmb3IgbWVkaWEgcXVlcmllcyBieSB1c2luZyBgbWF0Y2hNZWRpYWAgd291bGQgYmUgbmljZS5cclxuXHQgKiBAcGFyYW0gY2Fyb3VzZWxXaWR0aCB3aWR0aCBvZiBjYXJvdXNlbFxyXG5cdCAqIEBwYXJhbSBzbGlkZXMgYXJyYXkgb2Ygc2xpZGVzXHJcblx0ICogQHBhcmFtIG9wdGlvbnMgb3B0aW9ucyBzZXQgYnkgdXNlclxyXG5cdCAqL1xyXG4gIHNldHVwKGNhcm91c2VsV2lkdGg6IG51bWJlciwgc2xpZGVzOiBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlW10sIG9wdGlvbnM6IE93bE9wdGlvbnMpIHtcclxuXHRcdHRoaXMuc2V0Q2Fyb3VzZWxXaWR0aChjYXJvdXNlbFdpZHRoKTtcclxuXHRcdHRoaXMuc2V0SXRlbXMoc2xpZGVzKTtcclxuXHRcdHRoaXMuX2RlZmluZVNsaWRlc0RhdGEoKTtcclxuXHRcdHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0geyAuLi50aGlzLl9vcHRpb25zfTtcclxuXHJcblx0XHR0aGlzLnNldFZpZXdwb3J0SXRlbXNOKCk7XHJcblxyXG5cdFx0dGhpcy5fdHJpZ2dlcignY2hhbmdlJywgeyBwcm9wZXJ0eTogeyBuYW1lOiAnc2V0dGluZ3MnLCB2YWx1ZTogdGhpcy5zZXR0aW5ncyB9IH0pO1xyXG5cdFx0dGhpcy5pbnZhbGlkYXRlKCdzZXR0aW5ncycpOyAvLyBtdXN0IGJlIGNhbGwgb2YgdGhpcyBmdW5jdGlvbjtcclxuXHRcdHRoaXMuX3RyaWdnZXIoJ2NoYW5nZWQnLCB7IHByb3BlcnR5OiB7IG5hbWU6ICdzZXR0aW5ncycsIHZhbHVlOiB0aGlzLnNldHRpbmdzIH0gfSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXQgbnVtYmVyIG9mIGl0ZW1zIGZvciBjdXJyZW50IHZpZXdwb3J0XHJcblx0ICovXHJcblx0c2V0Vmlld3BvcnRJdGVtc04oKSB7XHJcblx0XHRjb25zdCB2aWV3cG9ydCA9IHRoaXMuX3dpZHRoLFxyXG5cdFx0XHRvdmVyd3JpdGVzID0gdGhpcy5fb3B0aW9ucy5yZXNwb25zaXZlO1xyXG5cdFx0bGV0XHRtYXRjaCA9IC0xO1xyXG5cclxuXHRcdGlmICghT2JqZWN0LmtleXMob3ZlcndyaXRlcykubGVuZ3RoKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIXZpZXdwb3J0KSB7XHJcblx0XHRcdHRoaXMuc2V0dGluZ3MuaXRlbXMgPSAxO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yIChjb25zdCBrZXkgaW4gb3ZlcndyaXRlcykge1xyXG5cdFx0XHRpZiAob3ZlcndyaXRlcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcblx0XHRcdFx0aWYgKCtrZXkgPD0gdmlld3BvcnQgJiYgK2tleSA+IG1hdGNoKSB7XHJcblx0XHRcdFx0XHRtYXRjaCA9IE51bWJlcihrZXkpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSB7IC4uLnRoaXMuc2V0dGluZ3MsIGl0ZW1zOiB0aGlzLl92YWxpZGF0ZUl0ZW1zKG92ZXJ3cml0ZXNbbWF0Y2hdLml0ZW1zKX07XHJcblx0XHQvLyBpZiAodHlwZW9mIHRoaXMuc2V0dGluZ3Muc3RhZ2VQYWRkaW5nID09PSAnZnVuY3Rpb24nKSB7XHJcblx0XHQvLyBcdHRoaXMuc2V0dGluZ3Muc3RhZ2VQYWRkaW5nID0gdGhpcy5zZXR0aW5ncy5zdGFnZVBhZGRpbmcoKTtcclxuXHRcdC8vIH1cclxuXHRcdGRlbGV0ZSB0aGlzLnNldHRpbmdzLnJlc3BvbnNpdmU7XHJcblx0XHR0aGlzLm93bERPTURhdGEuaXNSZXNwb25zaXZlID0gdHJ1ZTtcclxuXHRcdHRoaXMuX2JyZWFrcG9pbnQgPSBtYXRjaDtcclxuXHJcblx0XHR0aGlzLmludmFsaWRhdGUoJ3NldHRpbmdzJyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJbml0aWFsaXplcyB0aGUgY2Fyb3VzZWwuXHJcblx0ICogQHBhcmFtIHNsaWRlcyBhcnJheSBvZiBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlXHJcblx0ICovXHJcbiAgaW5pdGlhbGl6ZShzbGlkZXM6IENhcm91c2VsU2xpZGVEaXJlY3RpdmVbXSkge1xyXG5cdFx0dGhpcy5lbnRlcignaW5pdGlhbGl6aW5nJyk7XHJcblx0XHQvLyB0aGlzLnRyaWdnZXIoJ2luaXRpYWxpemUnKTtcclxuXHJcblx0XHR0aGlzLm93bERPTURhdGEucnRsID0gdGhpcy5zZXR0aW5ncy5ydGw7XHJcblxyXG5cdFx0c2xpZGVzLmZvckVhY2goaXRlbSA9PiB7XHJcblx0XHRcdGNvbnN0IG1lcmdlTjogbnVtYmVyID0gdGhpcy5zZXR0aW5ncy5tZXJnZSA/IGl0ZW0uZGF0YU1lcmdlIDogMTtcclxuXHRcdFx0dGhpcy5fbWVyZ2Vycy5wdXNoKG1lcmdlTik7XHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLnJlc2V0KHRoaXMuX2lzTnVtZXJpYyh0aGlzLnNldHRpbmdzLnN0YXJ0UG9zaXRpb24pID8gK3RoaXMuc2V0dGluZ3Muc3RhcnRQb3NpdGlvbiA6IDApO1xyXG5cclxuXHRcdHRoaXMuaW52YWxpZGF0ZSgnaXRlbXMnKTtcclxuXHRcdHRoaXMucmVmcmVzaCgpO1xyXG5cclxuXHRcdHRoaXMub3dsRE9NRGF0YS5pc0xvYWRlZCA9IHRydWU7XHJcblx0XHR0aGlzLm93bERPTURhdGEuaXNNb3VzZURyYWdhYmxlID0gdGhpcy5zZXR0aW5ncy5tb3VzZURyYWc7XHJcblx0XHR0aGlzLm93bERPTURhdGEuaXNUb3VjaERyYWdhYmxlID0gdGhpcy5zZXR0aW5ncy50b3VjaERyYWc7XHJcblxyXG5cdFx0dGhpcy5zZW5kQ2hhbmdlcygpO1xyXG5cclxuXHRcdHRoaXMubGVhdmUoJ2luaXRpYWxpemluZycpO1xyXG5cdFx0dGhpcy5fdHJpZ2dlcignaW5pdGlhbGl6ZWQnKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBTZW5kcyBhbGwgZGF0YSBuZWVkZWQgZm9yIFZpZXdcclxuXHQgKi9cclxuXHRzZW5kQ2hhbmdlcygpIHtcclxuXHRcdHRoaXMuX3ZpZXdTZXR0aW5nc1NoaXBwZXIkLm5leHQoe1xyXG5cdFx0XHRvd2xET01EYXRhOiB0aGlzLm93bERPTURhdGEsXHJcblx0XHRcdHN0YWdlRGF0YTogdGhpcy5zdGFnZURhdGEsXHJcblx0XHRcdHNsaWRlc0RhdGE6IHRoaXMuc2xpZGVzRGF0YSxcclxuXHRcdFx0bmF2RGF0YTogdGhpcy5uYXZEYXRhLFxyXG5cdFx0XHRkb3RzRGF0YTogdGhpcy5kb3RzRGF0YVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHJcbiAgLyoqXHJcblx0ICogVXBkYXRlcyBvcHRpb24gbG9naWMgaWYgbmVjZXNzZXJ5XHJcblx0ICovXHJcbiAgcHJpdmF0ZSBfb3B0aW9uc0xvZ2ljKCkge1xyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3MuYXV0b1dpZHRoKSB7XHJcblx0XHRcdHRoaXMuc2V0dGluZ3Muc3RhZ2VQYWRkaW5nID0gMDtcclxuXHRcdFx0dGhpcy5zZXR0aW5ncy5tZXJnZSA9IGZhbHNlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlcyB0aGUgdmlld1xyXG4gICAqL1xyXG4gIHVwZGF0ZSgpIHtcclxuICAgIGxldCBpID0gMDtcclxuICAgIGNvbnN0IG4gPSB0aGlzLl9waXBlLmxlbmd0aCxcclxuICAgICAgZmlsdGVyID0gaXRlbSA9PiB0aGlzLl9pbnZhbGlkYXRlZFtpdGVtXSxcclxuXHRcdFx0Y2FjaGUgPSB7fTtcclxuXHJcbiAgICB3aGlsZSAoaSA8IG4pIHtcclxuICAgICAgY29uc3QgZmlsdGVyZWRQaXBlID0gdGhpcy5fcGlwZVtpXS5maWx0ZXIuZmlsdGVyKGZpbHRlcik7XHJcbiAgICAgIGlmICh0aGlzLl9pbnZhbGlkYXRlZC5hbGwgfHwgZmlsdGVyZWRQaXBlLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHR0aGlzLl9waXBlW2ldLnJ1bihjYWNoZSk7XHJcbiAgICAgIH1cclxuICAgICAgaSsrO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5zbGlkZXNEYXRhLmZvckVhY2goc2xpZGUgPT4gc2xpZGUuY2xhc3NlcyA9IHRoaXMuc2V0Q3VyU2xpZGVDbGFzc2VzKHNsaWRlKSk7XHJcblx0XHR0aGlzLnNlbmRDaGFuZ2VzKCk7XHJcblxyXG4gICAgdGhpcy5faW52YWxpZGF0ZWQgPSB7fTtcclxuXHJcbiAgICBpZiAoIXRoaXMuaXMoJ3ZhbGlkJykpIHtcclxuICAgICAgdGhpcy5lbnRlcigndmFsaWQnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEdldHMgdGhlIHdpZHRoIG9mIHRoZSB2aWV3LlxyXG5cdCAqIEBwYXJhbSBbZGltZW5zaW9uPVdpZHRoLkRlZmF1bHRdIFRoZSBkaW1lbnNpb24gdG8gcmV0dXJuXHJcblx0ICogQHJldHVybnMgVGhlIHdpZHRoIG9mIHRoZSB2aWV3IGluIHBpeGVsLlxyXG5cdCAqL1xyXG4gIHdpZHRoKGRpbWVuc2lvbj86IFdpZHRoKTogbnVtYmVyIHtcclxuXHRcdGRpbWVuc2lvbiA9IGRpbWVuc2lvbiB8fCBXaWR0aC5EZWZhdWx0O1xyXG5cdFx0c3dpdGNoIChkaW1lbnNpb24pIHtcclxuXHRcdFx0Y2FzZSBXaWR0aC5Jbm5lcjpcclxuXHRcdFx0Y2FzZSBXaWR0aC5PdXRlcjpcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5fd2lkdGg7XHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuX3dpZHRoIC0gdGhpcy5zZXR0aW5ncy5zdGFnZVBhZGRpbmcgKiAyICsgdGhpcy5zZXR0aW5ncy5tYXJnaW47XHJcblx0XHR9XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBSZWZyZXNoZXMgdGhlIGNhcm91c2VsIHByaW1hcmlseSBmb3IgYWRhcHRpdmUgcHVycG9zZXMuXHJcblx0ICovXHJcbiAgcmVmcmVzaCgpIHtcclxuXHRcdHRoaXMuZW50ZXIoJ3JlZnJlc2hpbmcnKTtcclxuXHRcdHRoaXMuX3RyaWdnZXIoJ3JlZnJlc2gnKTtcclxuXHRcdHRoaXMuX2RlZmluZVNsaWRlc0RhdGEoKTtcclxuXHRcdHRoaXMuc2V0Vmlld3BvcnRJdGVtc04oKTtcclxuXHJcblx0XHR0aGlzLl9vcHRpb25zTG9naWMoKTtcclxuXHJcblx0XHQvLyB0aGlzLiRlbGVtZW50LmFkZENsYXNzKHRoaXMub3B0aW9ucy5yZWZyZXNoQ2xhc3MpO1xyXG5cclxuXHRcdHRoaXMudXBkYXRlKCk7XHJcblxyXG5cdFx0Ly8gdGhpcy4kZWxlbWVudC5yZW1vdmVDbGFzcyh0aGlzLm9wdGlvbnMucmVmcmVzaENsYXNzKTtcclxuXHJcblx0XHR0aGlzLmxlYXZlKCdyZWZyZXNoaW5nJyk7XHJcblx0XHR0aGlzLl90cmlnZ2VyKCdyZWZyZXNoZWQnKTtcclxuXHQgfVxyXG5cclxuICAvKipcclxuXHQgKiBDaGVja3Mgd2luZG93IGByZXNpemVgIGV2ZW50LlxyXG5cdCAqIEBwYXJhbSBjdXJXaWR0aCB3aWR0aCBvZiAub3dsLWNhcm91c2VsXHJcblx0ICovXHJcbiAgb25SZXNpemUoY3VyV2lkdGg6IG51bWJlcikge1xyXG5cdFx0aWYgKCF0aGlzLl9pdGVtcy5sZW5ndGgpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0Q2Fyb3VzZWxXaWR0aChjdXJXaWR0aCk7XHJcblxyXG5cdFx0dGhpcy5lbnRlcigncmVzaXppbmcnKTtcclxuXHJcblx0XHQvLyBpZiAodGhpcy50cmlnZ2VyKCdyZXNpemUnKS5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xyXG5cdFx0Ly8gXHR0aGlzLmxlYXZlKCdyZXNpemluZycpO1xyXG5cdFx0Ly8gXHRyZXR1cm4gZmFsc2U7XHJcblx0XHQvLyB9XHJcblx0XHR0aGlzLl90cmlnZ2VyKCdyZXNpemUnKTtcclxuXHRcdHRoaXMuaW52YWxpZGF0ZSgnd2lkdGgnKTtcclxuXHJcblx0XHR0aGlzLnJlZnJlc2goKTtcclxuXHJcblx0XHR0aGlzLmxlYXZlKCdyZXNpemluZycpO1xyXG5cdFx0dGhpcy5fdHJpZ2dlcigncmVzaXplZCcpO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogUHJlcGFyZXMgZGF0YSBmb3IgZHJhZ2dpbmcgY2Fyb3VzZWwuIEl0IHN0YXJ0cyBhZnRlciBmaXJpbmcgYHRvdWNoc3RhcnRgIGFuZCBgbW91c2Vkb3duYCBldmVudHMuXHJcblx0ICogQHRvZG8gSG9yaXpvbnRhbCBzd2lwZSB0aHJlc2hvbGQgYXMgb3B0aW9uXHJcblx0ICogQHRvZG8gIzI2MVxyXG5cdCAqIEBwYXJhbSBldmVudCAtIFRoZSBldmVudCBhcmd1bWVudHMuXHJcblx0ICogQHJldHVybnMgc3RhZ2UgLSBvYmplY3Qgd2l0aCAneCcgYW5kICd5JyBjb29yZGluYXRlcyBvZiAub3dsLXN0YWdlXHJcblx0ICovXHJcbiAgcHJlcGFyZURyYWdnaW5nKGV2ZW50OiBhbnkpOiBDb29yZHMge1xyXG5cdFx0bGV0IHN0YWdlOiBDb29yZHMgPSBudWxsLFxyXG5cdFx0XHRcdHRyYW5zZm9ybUFycjogc3RyaW5nW107XHJcblxyXG5cdFx0Ly8gY291bGQgYmUgNSBjb21tZW50ZWQgbGluZXMgYmVsb3c7IEhvd2V2ZXIgdGhlcmUncyBzdGFnZSB0cmFuc2Zvcm0gaW4gc3RhZ2VEYXRhIGFuZCBpbiB1cGRhdGVzIGFmdGVyIGVhY2ggbW92ZSBvZiBzdGFnZVxyXG4gICAgLy8gc3RhZ2UgPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCkudHJhbnNmb3JtLnJlcGxhY2UoLy4qXFwofFxcKXwgL2csICcnKS5zcGxpdCgnLCcpO1xyXG4gICAgLy8gc3RhZ2UgPSB7XHJcbiAgICAvLyAgIHg6IHN0YWdlW3N0YWdlLmxlbmd0aCA9PT0gMTYgPyAxMiA6IDRdLFxyXG4gICAgLy8gICB5OiBzdGFnZVtzdGFnZS5sZW5ndGggPT09IDE2ID8gMTMgOiA1XVxyXG5cdFx0Ly8gfTtcclxuXHJcblx0XHR0cmFuc2Zvcm1BcnIgPSB0aGlzLnN0YWdlRGF0YS50cmFuc2Zvcm0ucmVwbGFjZSgvLipcXCh8XFwpfCB8W14sLVxcZF1cXHd8XFwpL2csICcnKS5zcGxpdCgnLCcpO1xyXG4gICAgc3RhZ2UgPSB7XHJcbiAgICAgIHg6ICt0cmFuc2Zvcm1BcnJbMF0sXHJcbiAgICAgIHk6ICt0cmFuc2Zvcm1BcnJbMV1cclxuICAgIH07XHJcblxyXG5cdFx0aWYgKHRoaXMuaXMoJ2FuaW1hdGluZycpKSB7XHJcblx0XHRcdHRoaXMuaW52YWxpZGF0ZSgncG9zaXRpb24nKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ21vdXNlZG93bicpIHtcclxuICAgICAgdGhpcy5vd2xET01EYXRhLmlzR3JhYiA9IHRydWU7XHJcbiAgICB9XHJcblxyXG5cdFx0dGhpcy5zcGVlZCgwKTtcclxuXHRcdHJldHVybiBzdGFnZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEVudGVycyBpbnRvIGEgJ2RyYWdnaW5nJyBzdGF0ZVxyXG5cdCAqL1xyXG5cdGVudGVyRHJhZ2dpbmcoKSB7XHJcblx0XHR0aGlzLmVudGVyKCdkcmFnZ2luZycpO1xyXG4gICAgdGhpcy5fdHJpZ2dlcignZHJhZycpO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogRGVmaW5lcyBuZXcgY29vcmRzIGZvciAub3dsLXN0YWdlIHdoaWxlIGRyYWdnaW5nIGl0XHJcblx0ICogQHRvZG8gIzI2MVxyXG5cdCAqIEBwYXJhbSBldmVudCB0aGUgZXZlbnQgYXJndW1lbnRzLlxyXG5cdCAqIEBwYXJhbSBkcmFnRGF0YSBpbml0aWFsIGRhdGEgZ290IGFmdGVyIHN0YXJ0aW5nIGRyYWdnaW5nXHJcblx0ICogQHJldHVybnMgY29vcmRzIG9yIGZhbHNlXHJcblx0ICovXHJcbiAgZGVmaW5lTmV3Q29vcmRzRHJhZyhldmVudDogYW55LCBkcmFnRGF0YTogYW55KTogYm9vbGVhbiB8IENvb3JkcyB7XHJcblx0XHRsZXQgbWluaW11bSA9IG51bGwsXHJcblx0XHRtYXhpbXVtID0gbnVsbCxcclxuXHRcdHB1bGwgPSBudWxsO1xyXG5cdFx0Y29uc3RcdGRlbHRhID0gdGhpcy5kaWZmZXJlbmNlKGRyYWdEYXRhLnBvaW50ZXIsIHRoaXMucG9pbnRlcihldmVudCkpLFxyXG5cdFx0XHRzdGFnZSA9IHRoaXMuZGlmZmVyZW5jZShkcmFnRGF0YS5zdGFnZS5zdGFydCwgZGVsdGEpO1xyXG5cclxuXHRcdGlmICghdGhpcy5pcygnZHJhZ2dpbmcnKSkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3MubG9vcCkge1xyXG5cdFx0XHRtaW5pbXVtID0gdGhpcy5jb29yZGluYXRlcyh0aGlzLm1pbmltdW0oKSk7XHJcblx0XHRcdG1heGltdW0gPSArdGhpcy5jb29yZGluYXRlcyh0aGlzLm1heGltdW0oKSArIDEpIC0gbWluaW11bTtcclxuXHRcdFx0c3RhZ2UueCA9ICgoKHN0YWdlLnggLSBtaW5pbXVtKSAlIG1heGltdW0gKyBtYXhpbXVtKSAlIG1heGltdW0pICsgbWluaW11bTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdG1pbmltdW0gPSB0aGlzLnNldHRpbmdzLnJ0bCA/IHRoaXMuY29vcmRpbmF0ZXModGhpcy5tYXhpbXVtKCkpIDogdGhpcy5jb29yZGluYXRlcyh0aGlzLm1pbmltdW0oKSk7XHJcblx0XHRcdG1heGltdW0gPSB0aGlzLnNldHRpbmdzLnJ0bCA/IHRoaXMuY29vcmRpbmF0ZXModGhpcy5taW5pbXVtKCkpIDogdGhpcy5jb29yZGluYXRlcyh0aGlzLm1heGltdW0oKSk7XHJcblx0XHRcdHB1bGwgPSB0aGlzLnNldHRpbmdzLnB1bGxEcmFnID8gLTEgKiBkZWx0YS54IC8gNSA6IDA7XHJcblx0XHRcdHN0YWdlLnggPSBNYXRoLm1heChNYXRoLm1pbihzdGFnZS54LCBtaW5pbXVtICsgcHVsbCksIG1heGltdW0gKyBwdWxsKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gc3RhZ2U7XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBGaW5pc2hlcyBkcmFnZ2luZyBvZiBjYXJvdXNlbCB3aGVuIGB0b3VjaGVuZGAgYW5kIGBtb3VzZXVwYCBldmVudHMgZmlyZS5cclxuXHQgKiBAdG9kbyAjMjYxXHJcblx0ICogQHRvZG8gVGhyZXNob2xkIGZvciBjbGljayBldmVudFxyXG5cdCAqIEBwYXJhbSBldmVudCB0aGUgZXZlbnQgYXJndW1lbnRzLlxyXG5cdCAqIEBwYXJhbSBkcmFnT2JqIHRoZSBvYmplY3Qgd2l0aCBkcmFnZ2luZyBzZXR0aW5ncyBhbmQgc3RhdGVzXHJcblx0ICogQHBhcmFtIGNsaWNrQXR0YWNoZXIgZnVuY3Rpb24gd2hpY2ggYXR0YWNoZXMgY2xpY2sgaGFuZGxlciB0byBzbGlkZSBvciBpdHMgY2hpbGRyZW4gZWxlbWVudHMgaW4gb3JkZXIgdG8gcHJldmVudCBldmVudCBidWJsaW5nXHJcblx0ICovXHJcbiAgZmluaXNoRHJhZ2dpbmcoZXZlbnQ6IGFueSwgZHJhZ09iajogYW55LCBjbGlja0F0dGFjaGVyOiAoKSA9PiB2b2lkKSB7XHJcblx0XHRjb25zdCBkZWx0YSA9IHRoaXMuZGlmZmVyZW5jZShkcmFnT2JqLnBvaW50ZXIsIHRoaXMucG9pbnRlcihldmVudCkpLFxyXG4gICAgICAgIHN0YWdlID0gZHJhZ09iai5zdGFnZS5jdXJyZW50LFxyXG5cdFx0XHRcdGRpcmVjdGlvbiA9IGRlbHRhLnggPiArdGhpcy5zZXR0aW5ncy5ydGwgPyAnbGVmdCcgOiAncmlnaHQnO1xyXG5cdFx0bGV0IGN1cnJlbnRTbGlkZUk6IG51bWJlciwgY3VycmVudDogbnVtYmVyLCBuZXdDdXJyZW50OiBudW1iZXI7XHJcblxyXG4gICAgICBpZiAoZGVsdGEueCAhPT0gMCAmJiB0aGlzLmlzKCdkcmFnZ2luZycpIHx8ICF0aGlzLmlzKCd2YWxpZCcpKSB7XHJcbiAgICAgICAgdGhpcy5zcGVlZCgrdGhpcy5zZXR0aW5ncy5kcmFnRW5kU3BlZWQgfHwgdGhpcy5zZXR0aW5ncy5zbWFydFNwZWVkKTtcclxuXHRcdFx0XHRjdXJyZW50U2xpZGVJID0gdGhpcy5jbG9zZXN0KHN0YWdlLngsIGRlbHRhLnggIT09IDAgPyBkaXJlY3Rpb24gOiBkcmFnT2JqLmRpcmVjdGlvbik7XHJcblx0XHRcdFx0Y3VycmVudCA9IHRoaXMuY3VycmVudCgpO1xyXG4gICAgICAgIG5ld0N1cnJlbnQgPSB0aGlzLmN1cnJlbnQoY3VycmVudFNsaWRlSSA9PT0gLTEgPyB1bmRlZmluZWQgOiBjdXJyZW50U2xpZGVJKTtcclxuXHJcblx0XHRcdFx0aWYgKGN1cnJlbnQgIT09IG5ld0N1cnJlbnQpIHtcclxuXHRcdFx0XHRcdHRoaXMuaW52YWxpZGF0ZSgncG9zaXRpb24nKTtcclxuXHRcdFx0XHRcdHRoaXMudXBkYXRlKCk7XHJcblx0XHRcdFx0fVxyXG5cclxuICAgICAgICBkcmFnT2JqLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcclxuXHJcbiAgICAgICAgaWYgKE1hdGguYWJzKGRlbHRhLngpID4gMyB8fCBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIGRyYWdPYmoudGltZSA+IDMwMCkge1xyXG5cdFx0XHRcdFx0Y2xpY2tBdHRhY2hlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAoIXRoaXMuaXMoJ2RyYWdnaW5nJykpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHRcdFx0dGhpcy5sZWF2ZSgnZHJhZ2dpbmcnKTtcclxuXHRcdFx0dGhpcy5fdHJpZ2dlcignZHJhZ2dlZCcpXHJcblx0IH1cclxuXHJcbiAgLyoqXHJcblx0ICogR2V0cyBhYnNvbHV0ZSBwb3NpdGlvbiBvZiB0aGUgY2xvc2VzdCBpdGVtIGZvciBhIGNvb3JkaW5hdGUuXHJcblx0ICogQHRvZG8gU2V0dGluZyBgZnJlZURyYWdgIG1ha2VzIGBjbG9zZXN0YCBub3QgcmV1c2FibGUuIFNlZSAjMTY1LlxyXG5cdCAqIEBwYXJhbSBjb29yZGluYXRlIFRoZSBjb29yZGluYXRlIGluIHBpeGVsLlxyXG5cdCAqIEBwYXJhbSBkaXJlY3Rpb24gVGhlIGRpcmVjdGlvbiB0byBjaGVjayBmb3IgdGhlIGNsb3Nlc3QgaXRlbS4gRXRoZXIgYGxlZnRgIG9yIGByaWdodGAuXHJcblx0ICogQHJldHVybnMgVGhlIGFic29sdXRlIHBvc2l0aW9uIG9mIHRoZSBjbG9zZXN0IGl0ZW0uXHJcblx0ICovXHJcbiAgY2xvc2VzdChjb29yZGluYXRlOiBudW1iZXIsIGRpcmVjdGlvbjogc3RyaW5nKTogbnVtYmVyIHtcclxuXHRcdGNvbnN0IHB1bGwgPSAzMCxcclxuXHRcdFx0d2lkdGggPSB0aGlzLndpZHRoKCk7XHJcblx0XHRsZXRcdGNvb3JkaW5hdGVzOiBudW1iZXJbXSA9IHRoaXMuY29vcmRpbmF0ZXMoKSBhcyBudW1iZXJbXSxcclxuXHRcdCBwb3NpdGlvbiA9IC0xO1xyXG5cclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLmNlbnRlcikge1xyXG5cdFx0XHRjb29yZGluYXRlcyA9IGNvb3JkaW5hdGVzLm1hcChpdGVtID0+IHtcclxuXHRcdFx0XHRpZiAoaXRlbSA9PT0gMCkge1xyXG5cdFx0XHRcdFx0aXRlbSArPSAwLjAwMDAwMTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIGl0ZW07XHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gb3B0aW9uICdmcmVlRHJhZycgZG9lc24ndCBoYXZlIHJlYWxpemF0aW9uIGFuZCB1c2luZyBpdCBoZXJlIGNyZWF0ZXMgcHJvYmxlbTpcclxuXHRcdC8vIHZhcmlhYmxlICdwb3NpdGlvbicgc3RheXMgdW5jaGFuZ2VkIChpdCBlcXVhbHMgLTEgYXQgdGhlIGJlZ2dpbmcpIGFuZCB0aHVzIG1ldGhvZCByZXR1cm5zIC0xXHJcblx0XHQvLyBSZXR1cm5pbmcgdmFsdWUgaXMgY29uc3VtZWQgYnkgbWV0aG9kIGN1cnJlbnQoKSwgd2hpY2ggdGFraW5nIC0xIGFzIGFyZ3VtZW50IGNhbGN1bGF0ZXMgdGhlIGluZGV4IG9mIG5ldyBjdXJyZW50IHNsaWRlXHJcblx0XHQvLyBJbiBjYXNlIG9mIGhhdmluZyA1IHNsaWRlcyBhbnMgJ2xvb3A9ZmFsc2U7IGNhbGxpbmcgJ2N1cnJlbnQoLTEpJyBzZXRzIHByb3BzICdfY3VycmVudCcgYXMgNC4gSnVzdCBsYXN0IHNsaWRlIHJlbWFpbnMgdmlzaWJsZSBpbnN0ZWFkIG9mIDMgbGFzdCBzbGlkZXMuXHJcblxyXG5cdFx0Ly8gaWYgKCF0aGlzLnNldHRpbmdzLmZyZWVEcmFnKSB7XHJcblx0XHRcdC8vIGNoZWNrIGNsb3Nlc3QgaXRlbVxyXG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGNvb3JkaW5hdGVzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG5cdFx0XHRcdGlmIChkaXJlY3Rpb24gPT09ICdsZWZ0JyAmJiBjb29yZGluYXRlID4gY29vcmRpbmF0ZXNbaV0gLSBwdWxsICYmIGNvb3JkaW5hdGUgPCBjb29yZGluYXRlc1tpXSArIHB1bGwpIHtcclxuXHRcdFx0XHRcdHBvc2l0aW9uID0gaTtcclxuXHRcdFx0XHQvLyBvbiBhIHJpZ2h0IHB1bGwsIGNoZWNrIG9uIHByZXZpb3VzIGluZGV4XHJcblx0XHRcdFx0Ly8gdG8gZG8gc28sIHN1YnRyYWN0IHdpZHRoIGZyb20gdmFsdWUgYW5kIHNldCBwb3NpdGlvbiA9IGluZGV4ICsgMVxyXG5cdFx0XHRcdH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSAncmlnaHQnICYmIGNvb3JkaW5hdGUgPiBjb29yZGluYXRlc1tpXSAtIHdpZHRoIC0gcHVsbCAmJiBjb29yZGluYXRlIDwgY29vcmRpbmF0ZXNbaV0gLSB3aWR0aCArIHB1bGwpIHtcclxuXHRcdFx0XHRcdHBvc2l0aW9uID0gaSArIDE7XHJcblx0XHRcdFx0fSBlbHNlIGlmICh0aGlzLl9vcChjb29yZGluYXRlLCAnPCcsIGNvb3JkaW5hdGVzW2ldKVxyXG5cdFx0XHRcdFx0JiYgdGhpcy5fb3AoY29vcmRpbmF0ZSwgJz4nLCBjb29yZGluYXRlc1tpICsgMV0gfHwgY29vcmRpbmF0ZXNbaV0gLSB3aWR0aCkpIHtcclxuXHRcdFx0XHRcdHBvc2l0aW9uID0gZGlyZWN0aW9uID09PSAnbGVmdCcgPyBpICsgMSA6IGk7XHJcblx0XHRcdFx0fSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IG51bGwgJiYgY29vcmRpbmF0ZSA+IGNvb3JkaW5hdGVzW2ldIC0gcHVsbCAmJiBjb29yZGluYXRlIDwgY29vcmRpbmF0ZXNbaV0gKyBwdWxsKSB7XHJcblx0XHRcdFx0XHRwb3NpdGlvbiA9IGk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAocG9zaXRpb24gIT09IC0xKSB7IGJyZWFrIH07XHJcblx0XHRcdH1cclxuXHRcdC8vIH1cclxuXHJcblx0XHRpZiAoIXRoaXMuc2V0dGluZ3MubG9vcCkge1xyXG5cdFx0XHQvLyBub24gbG9vcCBib3VuZHJpZXNcclxuXHRcdFx0aWYgKHRoaXMuX29wKGNvb3JkaW5hdGUsICc+JywgY29vcmRpbmF0ZXNbdGhpcy5taW5pbXVtKCldKSkge1xyXG5cdFx0XHRcdHBvc2l0aW9uID0gY29vcmRpbmF0ZSA9IHRoaXMubWluaW11bSgpO1xyXG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMuX29wKGNvb3JkaW5hdGUsICc8JywgY29vcmRpbmF0ZXNbdGhpcy5tYXhpbXVtKCldKSkge1xyXG5cdFx0XHRcdHBvc2l0aW9uID0gY29vcmRpbmF0ZSA9IHRoaXMubWF4aW11bSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHBvc2l0aW9uO1xyXG5cdCB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEFuaW1hdGVzIHRoZSBzdGFnZS5cclxuXHQgKiBAdG9kbyAjMjcwXHJcblx0ICogQHBhcmFtIGNvb3JkaW5hdGUgVGhlIGNvb3JkaW5hdGUgaW4gcGl4ZWxzLlxyXG5cdCAqL1xyXG4gIGFuaW1hdGUoY29vcmRpbmF0ZTogbnVtYmVyIHwgbnVtYmVyW10pIHtcclxuXHRcdGNvbnN0IGFuaW1hdGUgPSB0aGlzLnNwZWVkKCkgPiAwO1xyXG5cclxuXHRcdGlmICh0aGlzLmlzKCdhbmltYXRpbmcnKSkge1xyXG5cdFx0XHR0aGlzLm9uVHJhbnNpdGlvbkVuZCgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChhbmltYXRlKSB7XHJcblx0XHRcdHRoaXMuZW50ZXIoJ2FuaW1hdGluZycpO1xyXG5cdFx0XHR0aGlzLl90cmlnZ2VyKCd0cmFuc2xhdGUnKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnN0YWdlRGF0YS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlM2QoJyArIGNvb3JkaW5hdGUgKyAncHgsMHB4LDBweCknO1xyXG5cdFx0dGhpcy5zdGFnZURhdGEudHJhbnNpdGlvbiA9ICh0aGlzLnNwZWVkKCkgLyAxMDAwKSArICdzJztcclxuXHJcblx0XHQvLyBhbHNvIHRoZXJlIHdhcyB0cmFuc2l0aW9uIGJ5IG1lYW5zIG9mIEpRdWVyeS5hbmltYXRlIG9yIGNzcy1jaGFuZ2luZyBwcm9wZXJ0eSBsZWZ0XHJcblx0IH1cclxuXHJcbiAgLyoqXHJcblx0ICogQ2hlY2tzIHdoZXRoZXIgdGhlIGNhcm91c2VsIGlzIGluIGEgc3BlY2lmaWMgc3RhdGUgb3Igbm90LlxyXG5cdCAqIEBwYXJhbSBzdGF0ZSBUaGUgc3RhdGUgdG8gY2hlY2suXHJcblx0ICogQHJldHVybnMgVGhlIGZsYWcgd2hpY2ggaW5kaWNhdGVzIGlmIHRoZSBjYXJvdXNlbCBpcyBidXN5LlxyXG5cdCAqL1xyXG4gIGlzKHN0YXRlOiBzdHJpbmcpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiB0aGlzLl9zdGF0ZXMuY3VycmVudFtzdGF0ZV0gJiYgdGhpcy5fc3RhdGVzLmN1cnJlbnRbc3RhdGVdID4gMDtcclxuICB9O1xyXG5cclxuICAvKipcclxuXHQgKiBTZXRzIHRoZSBhYnNvbHV0ZSBwb3NpdGlvbiBvZiB0aGUgY3VycmVudCBpdGVtLlxyXG5cdCAqIEBwYXJhbSBwb3NpdGlvbiBUaGUgbmV3IGFic29sdXRlIHBvc2l0aW9uIG9yIG5vdGhpbmcgdG8gbGVhdmUgaXQgdW5jaGFuZ2VkLlxyXG5cdCAqIEByZXR1cm5zIFRoZSBhYnNvbHV0ZSBwb3NpdGlvbiBvZiB0aGUgY3VycmVudCBpdGVtLlxyXG5cdCAqL1xyXG4gIGN1cnJlbnQocG9zaXRpb24/OiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0aWYgKHBvc2l0aW9uID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuX2N1cnJlbnQ7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuX2l0ZW1zLmxlbmd0aCA9PT0gMCkge1xyXG5cdFx0XHRyZXR1cm4gdW5kZWZpbmVkO1xyXG5cdFx0fVxyXG5cclxuXHRcdHBvc2l0aW9uID0gdGhpcy5ub3JtYWxpemUocG9zaXRpb24pO1xyXG5cclxuXHRcdGlmICh0aGlzLl9jdXJyZW50ICE9PSBwb3NpdGlvbikge1xyXG5cdFx0XHRjb25zdCBldmVudCA9IHRoaXMuX3RyaWdnZXIoJ2NoYW5nZScsIHsgcHJvcGVydHk6IHsgbmFtZTogJ3Bvc2l0aW9uJywgdmFsdWU6IHBvc2l0aW9uIH0gfSk7XHJcblxyXG5cdFx0XHQvLyBpZiAoZXZlbnQuZGF0YSAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdC8vIFx0cG9zaXRpb24gPSB0aGlzLm5vcm1hbGl6ZShldmVudC5kYXRhKTtcclxuXHRcdFx0Ly8gfVxyXG5cclxuXHRcdFx0dGhpcy5fY3VycmVudCA9IHBvc2l0aW9uO1xyXG5cclxuXHRcdFx0dGhpcy5pbnZhbGlkYXRlKCdwb3NpdGlvbicpO1xyXG5cdFx0XHR0aGlzLl90cmlnZ2VyKCdjaGFuZ2VkJywgeyBwcm9wZXJ0eTogeyBuYW1lOiAncG9zaXRpb24nLCB2YWx1ZTogdGhpcy5fY3VycmVudCB9IH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzLl9jdXJyZW50O1xyXG5cdCB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEludmFsaWRhdGVzIHRoZSBnaXZlbiBwYXJ0IG9mIHRoZSB1cGRhdGUgcm91dGluZS5cclxuXHQgKiBAcGFyYW0gcGFydCBUaGUgcGFydCB0byBpbnZhbGlkYXRlLlxyXG5cdCAqIEByZXR1cm5zIFRoZSBpbnZhbGlkYXRlZCBwYXJ0cy5cclxuXHQgKi9cclxuICBpbnZhbGlkYXRlKHBhcnQ6IHN0cmluZyk6IHN0cmluZ1tdIHtcclxuXHRcdGlmICh0eXBlb2YgcGFydCA9PT0gJ3N0cmluZycpIHtcclxuXHRcdFx0dGhpcy5faW52YWxpZGF0ZWRbcGFydF0gPSB0cnVlO1xyXG5cdFx0XHRpZih0aGlzLmlzKCd2YWxpZCcpKSB7IHRoaXMubGVhdmUoJ3ZhbGlkJyk7IH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBPYmplY3Qua2V5cyh0aGlzLl9pbnZhbGlkYXRlZCk7XHJcbiAgfTtcclxuXHJcblx0LyoqXHJcblx0ICogUmVzZXRzIHRoZSBhYnNvbHV0ZSBwb3NpdGlvbiBvZiB0aGUgY3VycmVudCBpdGVtLlxyXG5cdCAqIEBwYXJhbSBwb3NpdGlvbiB0aGUgYWJzb2x1dGUgcG9zaXRpb24gb2YgdGhlIG5ldyBpdGVtLlxyXG5cdCAqL1xyXG4gIHJlc2V0KHBvc2l0aW9uOiBudW1iZXIpIHtcclxuXHRcdHBvc2l0aW9uID0gdGhpcy5ub3JtYWxpemUocG9zaXRpb24pO1xyXG5cclxuXHRcdGlmIChwb3NpdGlvbiA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl9zcGVlZCA9IDA7XHJcblx0XHR0aGlzLl9jdXJyZW50ID0gcG9zaXRpb247XHJcblxyXG5cdFx0dGhpcy5fc3VwcHJlc3MoWyAndHJhbnNsYXRlJywgJ3RyYW5zbGF0ZWQnIF0pO1xyXG5cclxuXHRcdHRoaXMuYW5pbWF0ZSh0aGlzLmNvb3JkaW5hdGVzKHBvc2l0aW9uKSk7XHJcblxyXG5cdFx0dGhpcy5fcmVsZWFzZShbICd0cmFuc2xhdGUnLCAndHJhbnNsYXRlZCcgXSk7XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBOb3JtYWxpemVzIGFuIGFic29sdXRlIG9yIGEgcmVsYXRpdmUgcG9zaXRpb24gb2YgYW4gaXRlbS5cclxuXHQgKiBAcGFyYW0gcG9zaXRpb24gVGhlIGFic29sdXRlIG9yIHJlbGF0aXZlIHBvc2l0aW9uIHRvIG5vcm1hbGl6ZS5cclxuXHQgKiBAcGFyYW0gcmVsYXRpdmUgV2hldGhlciB0aGUgZ2l2ZW4gcG9zaXRpb24gaXMgcmVsYXRpdmUgb3Igbm90LlxyXG5cdCAqIEByZXR1cm5zIFRoZSBub3JtYWxpemVkIHBvc2l0aW9uLlxyXG5cdCAqL1xyXG4gIG5vcm1hbGl6ZShwb3NpdGlvbjogbnVtYmVyLCByZWxhdGl2ZT86IGJvb2xlYW4pOiBudW1iZXIge1xyXG5cdFx0Y29uc3QgbiA9IHRoaXMuX2l0ZW1zLmxlbmd0aCxcclxuXHRcdFx0XHRcdG0gPSByZWxhdGl2ZSA/IDAgOiB0aGlzLl9jbG9uZXMubGVuZ3RoO1xyXG5cclxuXHRcdGlmICghdGhpcy5faXNOdW1lcmljKHBvc2l0aW9uKSB8fCBuIDwgMSkge1xyXG5cdFx0XHRwb3NpdGlvbiA9IHVuZGVmaW5lZDtcclxuXHRcdH0gZWxzZSBpZiAocG9zaXRpb24gPCAwIHx8IHBvc2l0aW9uID49IG4gKyBtKSB7XHJcblx0XHRcdHBvc2l0aW9uID0gKChwb3NpdGlvbiAtIG0gLyAyKSAlIG4gKyBuKSAlIG4gKyBtIC8gMjtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcG9zaXRpb247XHJcblx0IH1cclxuXHJcbiAgLyoqXHJcblx0ICogQ29udmVydHMgYW4gYWJzb2x1dGUgcG9zaXRpb24gb2YgYW4gaXRlbSBpbnRvIGEgcmVsYXRpdmUgb25lLlxyXG5cdCAqIEBwYXJhbSBwb3NpdGlvbiBUaGUgYWJzb2x1dGUgcG9zaXRpb24gdG8gY29udmVydC5cclxuXHQgKiBAcmV0dXJucyBUaGUgY29udmVydGVkIHBvc2l0aW9uLlxyXG5cdCAqL1xyXG4gIHJlbGF0aXZlKHBvc2l0aW9uOiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0cG9zaXRpb24gLT0gdGhpcy5fY2xvbmVzLmxlbmd0aCAvIDI7XHJcblx0XHRyZXR1cm4gdGhpcy5ub3JtYWxpemUocG9zaXRpb24sIHRydWUpO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogR2V0cyB0aGUgbWF4aW11bSBwb3NpdGlvbiBmb3IgdGhlIGN1cnJlbnQgaXRlbS5cclxuXHQgKiBAcGFyYW0gcmVsYXRpdmUgV2hldGhlciB0byByZXR1cm4gYW4gYWJzb2x1dGUgcG9zaXRpb24gb3IgYSByZWxhdGl2ZSBwb3NpdGlvbi5cclxuXHQgKiBAcmV0dXJucyBudW1iZXIgb2YgbWF4aW11bSBwb3NpdGlvblxyXG5cdCAqL1xyXG4gIG1heGltdW0ocmVsYXRpdmU6IGJvb2xlYW4gPSBmYWxzZSk6IG51bWJlciB7XHJcblx0XHRjb25zdCBzZXR0aW5ncyA9IHRoaXMuc2V0dGluZ3M7XHJcblx0XHRsZXRcdG1heGltdW0gPSB0aGlzLl9jb29yZGluYXRlcy5sZW5ndGgsXHJcblx0XHRcdGl0ZXJhdG9yLFxyXG5cdFx0XHRyZWNpcHJvY2FsSXRlbXNXaWR0aCxcclxuXHRcdFx0ZWxlbWVudFdpZHRoO1xyXG5cclxuXHRcdGlmIChzZXR0aW5ncy5sb29wKSB7XHJcblx0XHRcdG1heGltdW0gPSB0aGlzLl9jbG9uZXMubGVuZ3RoIC8gMiArIHRoaXMuX2l0ZW1zLmxlbmd0aCAtIDE7XHJcblx0XHR9IGVsc2UgaWYgKHNldHRpbmdzLmF1dG9XaWR0aCB8fCBzZXR0aW5ncy5tZXJnZSkge1xyXG5cdFx0XHRpdGVyYXRvciA9IHRoaXMuX2l0ZW1zLmxlbmd0aDtcclxuXHRcdFx0cmVjaXByb2NhbEl0ZW1zV2lkdGggPSB0aGlzLnNsaWRlc0RhdGFbLS1pdGVyYXRvcl0ud2lkdGg7XHJcblx0XHRcdGVsZW1lbnRXaWR0aCA9IHRoaXMuX3dpZHRoO1xyXG5cdFx0XHR3aGlsZSAoaXRlcmF0b3ItLSkge1xyXG5cdFx0XHRcdC8vIGl0IGNvdWxkIGJlIHVzZSB0aGlzLl9pdGVtcyBpbnN0ZWFkIG9mIHRoaXMuc2xpZGVzRGF0YTtcclxuXHRcdFx0XHRyZWNpcHJvY2FsSXRlbXNXaWR0aCArPSArdGhpcy5zbGlkZXNEYXRhW2l0ZXJhdG9yXS53aWR0aCArIHRoaXMuc2V0dGluZ3MubWFyZ2luO1xyXG5cdFx0XHRcdGlmIChyZWNpcHJvY2FsSXRlbXNXaWR0aCA+IGVsZW1lbnRXaWR0aCkge1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdG1heGltdW0gPSBpdGVyYXRvciArIDE7XHJcblx0XHR9IGVsc2UgaWYgKHNldHRpbmdzLmNlbnRlcikge1xyXG5cdFx0XHRtYXhpbXVtID0gdGhpcy5faXRlbXMubGVuZ3RoIC0gMTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdG1heGltdW0gPSB0aGlzLl9pdGVtcy5sZW5ndGggLSBzZXR0aW5ncy5pdGVtcztcclxuXHRcdH1cclxuXHJcblx0XHRpZiAocmVsYXRpdmUpIHtcclxuXHRcdFx0bWF4aW11bSAtPSB0aGlzLl9jbG9uZXMubGVuZ3RoIC8gMjtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gTWF0aC5tYXgobWF4aW11bSwgMCk7XHJcblx0IH1cclxuXHJcbiAgLyoqXHJcblx0ICogR2V0cyB0aGUgbWluaW11bSBwb3NpdGlvbiBmb3IgdGhlIGN1cnJlbnQgaXRlbS5cclxuXHQgKiBAcGFyYW0gcmVsYXRpdmUgV2hldGhlciB0byByZXR1cm4gYW4gYWJzb2x1dGUgcG9zaXRpb24gb3IgYSByZWxhdGl2ZSBwb3NpdGlvbi5cclxuXHQgKiBAcmV0dXJucyBudW1iZXIgb2YgbWluaW11bSBwb3NpdGlvblxyXG5cdCAqL1xyXG4gIG1pbmltdW0ocmVsYXRpdmU6IGJvb2xlYW4gPSBmYWxzZSk6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gcmVsYXRpdmUgPyAwIDogdGhpcy5fY2xvbmVzLmxlbmd0aCAvIDI7XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBHZXRzIGFuIGl0ZW0gYXQgdGhlIHNwZWNpZmllZCByZWxhdGl2ZSBwb3NpdGlvbi5cclxuXHQgKiBAcGFyYW0gcG9zaXRpb24gVGhlIHJlbGF0aXZlIHBvc2l0aW9uIG9mIHRoZSBpdGVtLlxyXG5cdCAqIEByZXR1cm5zIFRoZSBpdGVtIGF0IHRoZSBnaXZlbiBwb3NpdGlvbiBvciBhbGwgaXRlbXMgaWYgbm8gcG9zaXRpb24gd2FzIGdpdmVuLlxyXG5cdCAqL1xyXG4gIGl0ZW1zKHBvc2l0aW9uPzogbnVtYmVyKTogQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZVtdIHtcclxuXHRcdGlmIChwb3NpdGlvbiA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLl9pdGVtcy5zbGljZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHBvc2l0aW9uID0gdGhpcy5ub3JtYWxpemUocG9zaXRpb24sIHRydWUpO1xyXG5cdFx0cmV0dXJuIFt0aGlzLl9pdGVtc1twb3NpdGlvbl1dO1xyXG5cdCB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEdldHMgYW4gaXRlbSBhdCB0aGUgc3BlY2lmaWVkIHJlbGF0aXZlIHBvc2l0aW9uLlxyXG5cdCAqIEBwYXJhbSBwb3NpdGlvbiBUaGUgcmVsYXRpdmUgcG9zaXRpb24gb2YgdGhlIGl0ZW0uXHJcblx0ICogQHJldHVybnMgVGhlIGl0ZW0gYXQgdGhlIGdpdmVuIHBvc2l0aW9uIG9yIGFsbCBpdGVtcyBpZiBubyBwb3NpdGlvbiB3YXMgZ2l2ZW4uXHJcblx0ICovXHJcbiAgbWVyZ2Vycyhwb3NpdGlvbjogbnVtYmVyKTogbnVtYmVyIHwgbnVtYmVyW10ge1xyXG5cdFx0aWYgKHBvc2l0aW9uID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuX21lcmdlcnMuc2xpY2UoKTtcclxuXHRcdH1cclxuXHJcblx0XHRwb3NpdGlvbiA9IHRoaXMubm9ybWFsaXplKHBvc2l0aW9uLCB0cnVlKTtcclxuXHRcdHJldHVybiB0aGlzLl9tZXJnZXJzW3Bvc2l0aW9uXTtcclxuXHQgfVxyXG5cclxuICAvKipcclxuXHQgKiBHZXRzIHRoZSBhYnNvbHV0ZSBwb3NpdGlvbnMgb2YgY2xvbmVzIGZvciBhbiBpdGVtLlxyXG5cdCAqIEBwYXJhbSBwb3NpdGlvbiBUaGUgcmVsYXRpdmUgcG9zaXRpb24gb2YgdGhlIGl0ZW0uXHJcblx0ICogQHJldHVybnMgVGhlIGFic29sdXRlIHBvc2l0aW9ucyBvZiBjbG9uZXMgZm9yIHRoZSBpdGVtIG9yIGFsbCBpZiBubyBwb3NpdGlvbiB3YXMgZ2l2ZW4uXHJcblx0ICovXHJcbiAgY2xvbmVzKHBvc2l0aW9uPzogbnVtYmVyKTogbnVtYmVyW10ge1xyXG5cdFx0Y29uc3Qgb2RkID0gdGhpcy5fY2xvbmVzLmxlbmd0aCAvIDIsXHJcblx0XHRcdGV2ZW4gPSBvZGQgKyB0aGlzLl9pdGVtcy5sZW5ndGgsXHJcblx0XHRcdG1hcCA9IGluZGV4ID0+IGluZGV4ICUgMiA9PT0gMCA/IGV2ZW4gKyBpbmRleCAvIDIgOiBvZGQgLSAoaW5kZXggKyAxKSAvIDI7XHJcblxyXG5cdFx0aWYgKHBvc2l0aW9uID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuX2Nsb25lcy5tYXAoKHYsIGkpID0+IG1hcChpKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX2Nsb25lcy5tYXAoKHYsIGkpID0+IHYgPT09IHBvc2l0aW9uID8gbWFwKGkpIDogbnVsbCkuZmlsdGVyKGl0ZW0gPT4gaXRlbSk7XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBTZXRzIHRoZSBjdXJyZW50IGFuaW1hdGlvbiBzcGVlZC5cclxuXHQgKiBAcGFyYW0gc3BlZWQgVGhlIGFuaW1hdGlvbiBzcGVlZCBpbiBtaWxsaXNlY29uZHMgb3Igbm90aGluZyB0byBsZWF2ZSBpdCB1bmNoYW5nZWQuXHJcblx0ICogQHJldHVybnMgVGhlIGN1cnJlbnQgYW5pbWF0aW9uIHNwZWVkIGluIG1pbGxpc2Vjb25kcy5cclxuXHQgKi9cclxuICBzcGVlZChzcGVlZD86IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRpZiAoc3BlZWQgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHR0aGlzLl9zcGVlZCA9IHNwZWVkO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzLl9zcGVlZDtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEdldHMgdGhlIGNvb3JkaW5hdGUgb2YgYW4gaXRlbS5cclxuXHQgKiBAdG9kbyBUaGUgbmFtZSBvZiB0aGlzIG1ldGhvZCBpcyBtaXNzbGVhbmRpbmcuXHJcblx0ICogQHBhcmFtIHBvc2l0aW9uIFRoZSBhYnNvbHV0ZSBwb3NpdGlvbiBvZiB0aGUgaXRlbSB3aXRoaW4gYG1pbmltdW0oKWAgYW5kIGBtYXhpbXVtKClgLlxyXG5cdCAqIEByZXR1cm5zIFRoZSBjb29yZGluYXRlIG9mIHRoZSBpdGVtIGluIHBpeGVsIG9yIGFsbCBjb29yZGluYXRlcy5cclxuXHQgKi9cclxuICBjb29yZGluYXRlcyhwb3NpdGlvbj86IG51bWJlcik6IG51bWJlciB8IG51bWJlcltdIHtcclxuXHRcdGxldCBtdWx0aXBsaWVyID0gMSxcclxuXHRcdFx0bmV3UG9zaXRpb24gPSBwb3NpdGlvbiAtIDEsXHJcblx0XHRcdGNvb3JkaW5hdGUsXHJcblx0XHRcdHJlc3VsdDogbnVtYmVyW107XHJcblxyXG5cdFx0aWYgKHBvc2l0aW9uID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0cmVzdWx0ID0gdGhpcy5fY29vcmRpbmF0ZXMubWFwKChpdGVtLCBpbmRleCkgPT4ge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLmNvb3JkaW5hdGVzKGluZGV4KSBhcyBudW1iZXI7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLmNlbnRlcikge1xyXG5cdFx0XHRpZiAodGhpcy5zZXR0aW5ncy5ydGwpIHtcclxuXHRcdFx0XHRtdWx0aXBsaWVyID0gLTE7XHJcblx0XHRcdFx0bmV3UG9zaXRpb24gPSBwb3NpdGlvbiArIDE7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGNvb3JkaW5hdGUgPSB0aGlzLl9jb29yZGluYXRlc1twb3NpdGlvbl07XHJcblx0XHRcdGNvb3JkaW5hdGUgKz0gKHRoaXMud2lkdGgoKSAtIGNvb3JkaW5hdGUgKyAodGhpcy5fY29vcmRpbmF0ZXNbbmV3UG9zaXRpb25dIHx8IDApKSAvIDIgKiBtdWx0aXBsaWVyO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y29vcmRpbmF0ZSA9IHRoaXMuX2Nvb3JkaW5hdGVzW25ld1Bvc2l0aW9uXSB8fCAwO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNvb3JkaW5hdGUgPSBNYXRoLmNlaWwoY29vcmRpbmF0ZSk7XHJcblxyXG5cdFx0cmV0dXJuIGNvb3JkaW5hdGU7XHJcblx0IH1cclxuXHJcbiAgLyoqXHJcblx0ICogQ2FsY3VsYXRlcyB0aGUgc3BlZWQgZm9yIGEgdHJhbnNsYXRpb24uXHJcblx0ICogQHBhcmFtIGZyb20gVGhlIGFic29sdXRlIHBvc2l0aW9uIG9mIHRoZSBzdGFydCBpdGVtLlxyXG5cdCAqIEBwYXJhbSB0byBUaGUgYWJzb2x1dGUgcG9zaXRpb24gb2YgdGhlIHRhcmdldCBpdGVtLlxyXG5cdCAqIEBwYXJhbSBmYWN0b3IgW2ZhY3Rvcj11bmRlZmluZWRdIC0gVGhlIHRpbWUgZmFjdG9yIGluIG1pbGxpc2Vjb25kcy5cclxuXHQgKiBAcmV0dXJucyBUaGUgdGltZSBpbiBtaWxsaXNlY29uZHMgZm9yIHRoZSB0cmFuc2xhdGlvbi5cclxuXHQgKi9cclxuICBwcml2YXRlIF9kdXJhdGlvbihmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIsIGZhY3Rvcj86IG51bWJlciB8IGJvb2xlYW4pOiBudW1iZXIge1xyXG5cdFx0aWYgKGZhY3RvciA9PT0gMCkge1xyXG5cdFx0XHRyZXR1cm4gMDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgoTWF0aC5hYnModG8gLSBmcm9tKSwgMSksIDYpICogTWF0aC5hYnMoKCtmYWN0b3IgfHwgdGhpcy5zZXR0aW5ncy5zbWFydFNwZWVkKSk7XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBTbGlkZXMgdG8gdGhlIHNwZWNpZmllZCBpdGVtLlxyXG5cdCAqIEBwYXJhbSBwb3NpdGlvbiBUaGUgcG9zaXRpb24gb2YgdGhlIGl0ZW0uXHJcblx0ICogQHBhcmFtIHNwZWVkIFRoZSB0aW1lIGluIG1pbGxpc2Vjb25kcyBmb3IgdGhlIHRyYW5zaXRpb24uXHJcblx0ICovXHJcbiAgdG8ocG9zaXRpb246IG51bWJlciwgc3BlZWQ6IG51bWJlciB8IGJvb2xlYW4pIHtcclxuXHRcdGxldCBjdXJyZW50ID0gdGhpcy5jdXJyZW50KCksXHJcblx0XHRcdHJldmVydCA9IG51bGwsXHJcblx0XHRcdGRpc3RhbmNlID0gcG9zaXRpb24gLSB0aGlzLnJlbGF0aXZlKGN1cnJlbnQpLFxyXG5cdFx0XHRtYXhpbXVtID0gdGhpcy5tYXhpbXVtKCk7XHJcblx0XHRjb25zdFx0ZGlyZWN0aW9uID0gKyhkaXN0YW5jZSA+IDApIC0gKyhkaXN0YW5jZSA8IDApLFxyXG5cdFx0XHRpdGVtcyA9IHRoaXMuX2l0ZW1zLmxlbmd0aCxcclxuXHRcdFx0bWluaW11bSA9IHRoaXMubWluaW11bSgpO1xyXG5cclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLmxvb3ApIHtcclxuXHRcdFx0aWYgKCF0aGlzLnNldHRpbmdzLnJld2luZCAmJiBNYXRoLmFicyhkaXN0YW5jZSkgPiBpdGVtcyAvIDIpIHtcclxuXHRcdFx0XHRkaXN0YW5jZSArPSBkaXJlY3Rpb24gKiAtMSAqIGl0ZW1zO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRwb3NpdGlvbiA9IGN1cnJlbnQgKyBkaXN0YW5jZTtcclxuXHRcdFx0cmV2ZXJ0ID0gKChwb3NpdGlvbiAtIG1pbmltdW0pICUgaXRlbXMgKyBpdGVtcykgJSBpdGVtcyArIG1pbmltdW07XHJcblxyXG5cdFx0XHRpZiAocmV2ZXJ0ICE9PSBwb3NpdGlvbiAmJiByZXZlcnQgLSBkaXN0YW5jZSA8PSBtYXhpbXVtICYmIHJldmVydCAtIGRpc3RhbmNlID4gMCkge1xyXG5cdFx0XHRcdGN1cnJlbnQgPSByZXZlcnQgLSBkaXN0YW5jZTtcclxuXHRcdFx0XHRwb3NpdGlvbiA9IHJldmVydDtcclxuXHRcdFx0XHR0aGlzLnJlc2V0KGN1cnJlbnQpO1xyXG5cdFx0XHRcdHRoaXMuc2VuZENoYW5nZXMoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIGlmICh0aGlzLnNldHRpbmdzLnJld2luZCkge1xyXG5cdFx0XHRtYXhpbXVtICs9IDE7XHJcblx0XHRcdHBvc2l0aW9uID0gKHBvc2l0aW9uICUgbWF4aW11bSArIG1heGltdW0pICUgbWF4aW11bTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHBvc2l0aW9uID0gTWF0aC5tYXgobWluaW11bSwgTWF0aC5taW4obWF4aW11bSwgcG9zaXRpb24pKTtcclxuXHRcdH1cclxuXHJcblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0dGhpcy5zcGVlZCh0aGlzLl9kdXJhdGlvbihjdXJyZW50LCBwb3NpdGlvbiwgc3BlZWQpKTtcclxuXHRcdFx0dGhpcy5jdXJyZW50KHBvc2l0aW9uKTtcclxuXHJcblx0XHRcdHRoaXMudXBkYXRlKCk7XHJcblx0XHR9LCAwKTtcclxuXHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBTbGlkZXMgdG8gdGhlIG5leHQgaXRlbS5cclxuXHQgKiBAcGFyYW0gc3BlZWQgVGhlIHRpbWUgaW4gbWlsbGlzZWNvbmRzIGZvciB0aGUgdHJhbnNpdGlvbi5cclxuXHQgKi9cclxuICBuZXh0KHNwZWVkOiBudW1iZXIgfCBib29sZWFuKSB7XHJcblx0XHRzcGVlZCA9IHNwZWVkIHx8IGZhbHNlO1xyXG5cdFx0dGhpcy50byh0aGlzLnJlbGF0aXZlKHRoaXMuY3VycmVudCgpKSArIDEsIHNwZWVkKTtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIFNsaWRlcyB0byB0aGUgcHJldmlvdXMgaXRlbS5cclxuXHQgKiBAcGFyYW0gc3BlZWQgVGhlIHRpbWUgaW4gbWlsbGlzZWNvbmRzIGZvciB0aGUgdHJhbnNpdGlvbi5cclxuXHQgKi9cclxuICBwcmV2KHNwZWVkOiBudW1iZXIgfCBib29sZWFuKSB7XHJcblx0XHRzcGVlZCA9IHNwZWVkIHx8IGZhbHNlO1xyXG5cdFx0dGhpcy50byh0aGlzLnJlbGF0aXZlKHRoaXMuY3VycmVudCgpKSAtIDEsIHNwZWVkKTtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEhhbmRsZXMgdGhlIGVuZCBvZiBhbiBhbmltYXRpb24uXHJcblx0ICogQHBhcmFtIGV2ZW50IC0gVGhlIGV2ZW50IGFyZ3VtZW50cy5cclxuXHQgKi9cclxuICBvblRyYW5zaXRpb25FbmQoZXZlbnQ/OiBhbnkpIHtcclxuXHRcdC8vIGlmIGNzczIgYW5pbWF0aW9uIHRoZW4gZXZlbnQgb2JqZWN0IGlzIHVuZGVmaW5lZFxyXG5cdFx0aWYgKGV2ZW50ICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0Ly8gZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG5cdFx0XHQvLyAvLyBDYXRjaCBvbmx5IG93bC1zdGFnZSB0cmFuc2l0aW9uRW5kIGV2ZW50XHJcblx0XHRcdC8vIGlmICgoZXZlbnQudGFyZ2V0IHx8IGV2ZW50LnNyY0VsZW1lbnQgfHwgZXZlbnQub3JpZ2luYWxUYXJnZXQpICE9PSB0aGlzLiRzdGFnZS5nZXQoMClcdCkge1xyXG5cdFx0XHQvLyBcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0Ly8gfVxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0XHR0aGlzLmxlYXZlKCdhbmltYXRpbmcnKTtcclxuXHRcdHRoaXMuX3RyaWdnZXIoJ3RyYW5zbGF0ZWQnKTtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEdldHMgdmlld3BvcnQgd2lkdGguXHJcblx0ICogQHJldHVybnMgLSBUaGUgd2lkdGggaW4gcGl4ZWwuXHJcblx0ICovXHJcbiAgcHJpdmF0ZSBfdmlld3BvcnQoKTogbnVtYmVyIHtcclxuXHRcdGxldCB3aWR0aDtcclxuXHRcdGlmICh0aGlzLl93aWR0aCkge1xyXG5cdFx0XHR3aWR0aCA9IHRoaXMuX3dpZHRoO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y29uc29sZS53YXJuKCdDYW4gbm90IGRldGVjdCB2aWV3cG9ydCB3aWR0aC4nKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB3aWR0aDtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIFNldHMgX2l0ZW1zXHJcblx0ICogQHBhcmFtIGNvbnRlbnQgVGhlIGxpc3Qgb2Ygc2xpZGVzIHB1dCBpbnRvIENhcm91c2VsU2xpZGVEaXJlY3RpdmVzLlxyXG5cdCAqL1xyXG4gIHNldEl0ZW1zKGNvbnRlbnQ6IENhcm91c2VsU2xpZGVEaXJlY3RpdmVbXSkge1xyXG5cdFx0dGhpcy5faXRlbXMgPSBjb250ZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyBzbGlkZXNEYXRhIHVzaW5nIHRoaXMuX2l0ZW1zXHJcblx0ICovXHJcblx0cHJpdmF0ZSBfZGVmaW5lU2xpZGVzRGF0YSgpIHtcclxuXHRcdC8vIE1heWJlIGNyZWF0aW5nIGFuZCB1c2luZyBsb2FkTWFwIHdvdWxkIGJlIGJldHRlciBpbiBMYXp5TG9hZFNlcnZpY2UuXHJcblx0XHQvLyBIb3Zld2VyIGluIHRoYXQgY2FzZSB3aGVuICdyZXNpemUnIGV2ZW50IGZpcmVzLCBwcm9wICdsb2FkJyBvZiBhbGwgc2xpZGVzIHdpbGwgZ2V0ICdmYWxzZScgYW5kIHN1Y2ggc3RhdGUgb2YgcHJvcCB3aWxsIGJlIHNlZW4gYnkgVmlldyBkdXJpbmcgaXRzIHVwZGF0aW5nLiBBY2NvcmRpbmdseSB0aGUgY29kZSB3aWxsIHJlbW92ZSBzbGlkZXMncyBjb250ZW50IGZyb20gRE9NIGV2ZW4gaWYgaXQgd2FzIGxvYWRlZCBiZWZvcmUuXHJcblx0XHQvLyBUaHVzIGl0IHdvdWxkIGJlIG5lZWRlZCB0byBhZGQgdGhhdCBjb250ZW50IGludG8gRE9NIGFnYWluLlxyXG5cdFx0Ly8gSW4gb3JkZXIgdG8gYXZvaWQgYWRkaXRpb25hbCByZW1vdmluZy9hZGRpbmcgbG9hZGVkIHNsaWRlcydzIGNvbnRlbnQgd2UgdXNlIGxvYWRNYXAgaGVyZSBhbmQgc2V0IHJlc3RvcmUgc3RhdGUgb2YgcHJvcCAnbG9hZCcgYmVmb3JlIHRoZSBWaWV3IHdpbGwgZ2V0IGl0LlxyXG5cdFx0bGV0IGxvYWRNYXA6IE1hcDxzdHJpbmcsIGJvb2xlYW4+O1xyXG5cclxuXHRcdGlmICh0aGlzLnNsaWRlc0RhdGEgJiYgdGhpcy5zbGlkZXNEYXRhLmxlbmd0aCkge1xyXG5cdFx0XHRsb2FkTWFwID0gbmV3IE1hcCgpO1xyXG5cdFx0XHR0aGlzLnNsaWRlc0RhdGEuZm9yRWFjaChpdGVtID0+IHtcclxuXHRcdFx0XHRpZiAoaXRlbS5sb2FkKSB7XHJcblx0XHRcdFx0XHRsb2FkTWFwLnNldChpdGVtLmlkLCBpdGVtLmxvYWQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNsaWRlc0RhdGEgPSB0aGlzLl9pdGVtcy5tYXAoc2xpZGUgPT4ge1xyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdGlkOiBgJHtzbGlkZS5pZH1gLFxyXG5cdFx0XHRcdGlzQWN0aXZlOiBmYWxzZSxcclxuXHRcdFx0XHR0cGxSZWY6IHNsaWRlLnRwbFJlZixcclxuXHRcdFx0XHRkYXRhTWVyZ2U6IHNsaWRlLmRhdGFNZXJnZSxcclxuXHRcdFx0XHR3aWR0aDogMCxcclxuXHRcdFx0XHRpc0Nsb25lZDogZmFsc2UsXHJcblx0XHRcdFx0bG9hZDogbG9hZE1hcCA/IGxvYWRNYXAuZ2V0KHNsaWRlLmlkKSA6IGZhbHNlLFxyXG5cdFx0XHRcdGhhc2hGcmFnbWVudDogc2xpZGUuZGF0YUhhc2hcclxuXHRcdFx0fTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyBjdXJyZW50IGNsYXNzZXMgZm9yIHNsaWRlXHJcblx0ICogQHBhcmFtIHNsaWRlIFNsaWRlIG9mIGNhcm91c2VsXHJcblx0ICogQHJldHVybnMgb2JqZWN0IHdpdGggbmFtZXMgb2YgY3NzLWNsYXNzZXMgd2hpY2ggYXJlIGtleXMgYW5kIHRydWUvZmFsc2UgdmFsdWVzXHJcblx0ICovXHJcblx0c2V0Q3VyU2xpZGVDbGFzc2VzKHNsaWRlOiBTbGlkZU1vZGVsKToge1trZXk6IHN0cmluZ106IGJvb2xlYW59IHtcclxuXHRcdC8vIENTUyBjbGFzc2VzOiBhZGRlZC9yZW1vdmVkIHBlciBjdXJyZW50IHN0YXRlIG9mIGNvbXBvbmVudCBwcm9wZXJ0aWVzXHJcblx0XHRjb25zdCBjdXJyZW50Q2xhc3Nlczoge1trZXk6IHN0cmluZ106IGJvb2xlYW59ID0gIHtcclxuXHRcdFx0J2FjdGl2ZSc6IHNsaWRlLmlzQWN0aXZlLFxyXG5cdFx0XHQnY2VudGVyJzogc2xpZGUuaXNDZW50ZXJlZCxcclxuXHRcdFx0J2Nsb25lZCc6IHNsaWRlLmlzQ2xvbmVkLFxyXG5cdFx0XHQnYW5pbWF0ZWQnOiBzbGlkZS5pc0FuaW1hdGVkLFxyXG5cdFx0XHQnb3dsLWFuaW1hdGVkLWluJzogc2xpZGUuaXNEZWZBbmltYXRlZEluLFxyXG5cdFx0XHQnb3dsLWFuaW1hdGVkLW91dCc6IHNsaWRlLmlzRGVmQW5pbWF0ZWRPdXRcclxuXHRcdH07XHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5hbmltYXRlSW4pIHtcclxuXHRcdFx0Y3VycmVudENsYXNzZXNbdGhpcy5zZXR0aW5ncy5hbmltYXRlSW4gYXMgc3RyaW5nXSA9IHNsaWRlLmlzQ3VzdG9tQW5pbWF0ZWRJbjtcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLmFuaW1hdGVPdXQpIHtcclxuXHRcdFx0Y3VycmVudENsYXNzZXNbdGhpcy5zZXR0aW5ncy5hbmltYXRlT3V0IGFzIHN0cmluZ10gPSBzbGlkZS5pc0N1c3RvbUFuaW1hdGVkT3V0O1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGN1cnJlbnRDbGFzc2VzO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogT3BlcmF0b3JzIHRvIGNhbGN1bGF0ZSByaWdodC10by1sZWZ0IGFuZCBsZWZ0LXRvLXJpZ2h0LlxyXG5cdCAqIEBwYXJhbSBhIC0gVGhlIGxlZnQgc2lkZSBvcGVyYW5kLlxyXG5cdCAqIEBwYXJhbSBvIC0gVGhlIG9wZXJhdG9yLlxyXG5cdCAqIEBwYXJhbSBiIC0gVGhlIHJpZ2h0IHNpZGUgb3BlcmFuZC5cclxuXHQgKiBAcmV0dXJucyB0cnVlL2ZhbHNlIG1lYW5pbmcgcmlnaHQtdG8tbGVmdCBvciBsZWZ0LXRvLXJpZ2h0XHJcblx0ICovXHJcbiAgcHJpdmF0ZSBfb3AoYTogbnVtYmVyLCBvOiBzdHJpbmcsIGI6IG51bWJlcik6IGJvb2xlYW4ge1xyXG5cdFx0Y29uc3QgcnRsID0gdGhpcy5zZXR0aW5ncy5ydGw7XHJcblx0XHRzd2l0Y2ggKG8pIHtcclxuXHRcdFx0Y2FzZSAnPCc6XHJcblx0XHRcdFx0cmV0dXJuIHJ0bCA/IGEgPiBiIDogYSA8IGI7XHJcblx0XHRcdGNhc2UgJz4nOlxyXG5cdFx0XHRcdHJldHVybiBydGwgPyBhIDwgYiA6IGEgPiBiO1xyXG5cdFx0XHRjYXNlICc+PSc6XHJcblx0XHRcdFx0cmV0dXJuIHJ0bCA/IGEgPD0gYiA6IGEgPj0gYjtcclxuXHRcdFx0Y2FzZSAnPD0nOlxyXG5cdFx0XHRcdHJldHVybiBydGwgPyBhID49IGIgOiBhIDw9IGI7XHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBUcmlnZ2VycyBhIHB1YmxpYyBldmVudC5cclxuXHQgKiBAdG9kbyBSZW1vdmUgYHN0YXR1c2AsIGByZWxhdGVkVGFyZ2V0YCBzaG91bGQgYmUgdXNlZCBpbnN0ZWFkLlxyXG5cdCAqIEBwYXJhbSBuYW1lIFRoZSBldmVudCBuYW1lLlxyXG5cdCAqIEBwYXJhbSBkYXRhIFRoZSBldmVudCBkYXRhLlxyXG5cdCAqIEBwYXJhbSBuYW1lc3BhY2UgVGhlIGV2ZW50IG5hbWVzcGFjZS5cclxuXHQgKiBAcGFyYW0gc3RhdGUgVGhlIHN0YXRlIHdoaWNoIGlzIGFzc29jaWF0ZWQgd2l0aCB0aGUgZXZlbnQuXHJcblx0ICogQHBhcmFtIGVudGVyIEluZGljYXRlcyBpZiB0aGUgY2FsbCBlbnRlcnMgdGhlIHNwZWNpZmllZCBzdGF0ZSBvciBub3QuXHJcblx0ICovXHJcbiAgcHJpdmF0ZSBfdHJpZ2dlcihuYW1lOiBzdHJpbmcsIGRhdGE/OiBhbnksIG5hbWVzcGFjZT86IHN0cmluZywgc3RhdGU/OiBzdHJpbmcsIGVudGVyPzogYm9vbGVhbikge1xyXG5cdFx0c3dpdGNoIChuYW1lKSB7XHJcblx0XHRcdGNhc2UgJ2luaXRpYWxpemVkJzpcclxuXHRcdFx0XHR0aGlzLl9pbml0aWFsaXplZENhcm91c2VsJC5uZXh0KG5hbWUpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdjaGFuZ2UnOlxyXG5cdFx0XHRcdHRoaXMuX2NoYW5nZVNldHRpbmdzQ2Fyb3VzZWwkLm5leHQoZGF0YSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ2NoYW5nZWQnOlxyXG5cdFx0XHRcdHRoaXMuX2NoYW5nZWRTZXR0aW5nc0Nhcm91c2VsJC5uZXh0KGRhdGEpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdkcmFnJzpcclxuXHRcdFx0XHR0aGlzLl9kcmFnQ2Fyb3VzZWwkLm5leHQobmFtZSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ2RyYWdnZWQnOlxyXG5cdFx0XHRcdHRoaXMuX2RyYWdnZWRDYXJvdXNlbCQubmV4dChuYW1lKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAncmVzaXplJzpcclxuXHRcdFx0XHR0aGlzLl9yZXNpemVDYXJvdXNlbCQubmV4dChuYW1lKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAncmVzaXplZCc6XHJcblx0XHRcdFx0dGhpcy5fcmVzaXplZENhcm91c2VsJC5uZXh0KG5hbWUpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdyZWZyZXNoJzpcclxuXHRcdFx0XHR0aGlzLl9yZWZyZXNoQ2Fyb3VzZWwkLm5leHQobmFtZSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ3JlZnJlc2hlZCc6XHJcblx0XHRcdFx0dGhpcy5fcmVmcmVzaGVkQ2Fyb3VzZWwkLm5leHQobmFtZSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ3RyYW5zbGF0ZSc6XHJcblx0XHRcdFx0dGhpcy5fdHJhbnNsYXRlQ2Fyb3VzZWwkLm5leHQobmFtZSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ3RyYW5zbGF0ZWQnOlxyXG5cdFx0XHRcdHRoaXMuX3RyYW5zbGF0ZWRDYXJvdXNlbCQubmV4dChuYW1lKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBFbnRlcnMgYSBzdGF0ZS5cclxuXHQgKiBAcGFyYW0gbmFtZSAtIFRoZSBzdGF0ZSBuYW1lLlxyXG5cdCAqL1xyXG4gIGVudGVyKG5hbWU6IHN0cmluZykge1xyXG4gICAgWyBuYW1lIF0uY29uY2F0KHRoaXMuX3N0YXRlcy50YWdzW25hbWVdIHx8IFtdKS5mb3JFYWNoKChzdGF0ZU5hbWUpID0+IHtcclxuICAgICAgaWYgKHRoaXMuX3N0YXRlcy5jdXJyZW50W3N0YXRlTmFtZV0gPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdHRoaXMuX3N0YXRlcy5jdXJyZW50W3N0YXRlTmFtZV0gPSAwO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLl9zdGF0ZXMuY3VycmVudFtzdGF0ZU5hbWVdKys7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICAvKipcclxuXHQgKiBMZWF2ZXMgYSBzdGF0ZS5cclxuXHQgKiBAcGFyYW0gbmFtZSAtIFRoZSBzdGF0ZSBuYW1lLlxyXG5cdCAqL1xyXG5cdGxlYXZlKG5hbWU6IHN0cmluZykge1xyXG4gICAgWyBuYW1lIF0uY29uY2F0KHRoaXMuX3N0YXRlcy50YWdzW25hbWVdIHx8IFtdKS5mb3JFYWNoKChzdGF0ZU5hbWUpID0+IHtcclxuICAgICAgaWYgKHRoaXMuX3N0YXRlcy5jdXJyZW50W3N0YXRlTmFtZV0gPT09IDAgfHwgISF0aGlzLl9zdGF0ZXMuY3VycmVudFtzdGF0ZU5hbWVdKSB7XHJcbiAgICAgICAgdGhpcy5fc3RhdGVzLmN1cnJlbnRbc3RhdGVOYW1lXS0tO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH07XHJcblxyXG4gIC8qKlxyXG5cdCAqIFJlZ2lzdGVycyBhbiBldmVudCBvciBzdGF0ZS5cclxuXHQgKiBAcGFyYW0gb2JqZWN0IC0gVGhlIGV2ZW50IG9yIHN0YXRlIHRvIHJlZ2lzdGVyLlxyXG5cdCAqL1xyXG4gIHJlZ2lzdGVyKG9iamVjdDogYW55KSB7XHJcblx0XHRpZiAob2JqZWN0LnR5cGUgPT09IFR5cGUuU3RhdGUpIHtcclxuXHRcdFx0aWYgKCF0aGlzLl9zdGF0ZXMudGFnc1tvYmplY3QubmFtZV0pIHtcclxuXHRcdFx0XHR0aGlzLl9zdGF0ZXMudGFnc1tvYmplY3QubmFtZV0gPSBvYmplY3QudGFncztcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLl9zdGF0ZXMudGFnc1tvYmplY3QubmFtZV0gPSB0aGlzLl9zdGF0ZXMudGFnc1tvYmplY3QubmFtZV0uY29uY2F0KG9iamVjdC50YWdzKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5fc3RhdGVzLnRhZ3Nbb2JqZWN0Lm5hbWVdID0gdGhpcy5fc3RhdGVzLnRhZ3Nbb2JqZWN0Lm5hbWVdLmZpbHRlcigodGFnLCBpKSA9PiB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuX3N0YXRlcy50YWdzW29iamVjdC5uYW1lXS5pbmRleE9mKHRhZykgPT09IGk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogU3VwcHJlc3NlcyBldmVudHMuXHJcblx0ICogQHBhcmFtIGV2ZW50cyBUaGUgZXZlbnRzIHRvIHN1cHByZXNzLlxyXG5cdCAqL1xyXG4gIHByaXZhdGUgX3N1cHByZXNzKGV2ZW50czogc3RyaW5nW10pIHtcclxuXHRcdGV2ZW50cy5mb3JFYWNoKGV2ZW50ID0+IHtcclxuXHRcdFx0dGhpcy5fc3VwcmVzc1tldmVudF0gPSB0cnVlO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBSZWxlYXNlcyBzdXBwcmVzc2VkIGV2ZW50cy5cclxuXHQgKiBAcGFyYW0gZXZlbnRzIFRoZSBldmVudHMgdG8gcmVsZWFzZS5cclxuXHQgKi9cclxuICBwcml2YXRlIF9yZWxlYXNlKGV2ZW50czogc3RyaW5nW10pIHtcclxuXHRcdGV2ZW50cy5mb3JFYWNoKGV2ZW50ID0+IHtcclxuXHRcdFx0ZGVsZXRlIHRoaXMuX3N1cHJlc3NbZXZlbnRdO1xyXG5cdFx0fSk7XHJcblx0IH1cclxuXHJcbiAgLyoqXHJcblx0ICogR2V0cyB1bmlmaWVkIHBvaW50ZXIgY29vcmRpbmF0ZXMgZnJvbSBldmVudC5cclxuXHQgKiBAdG9kbyAjMjYxXHJcblx0ICogQHBhcmFtIGV2ZW50IFRoZSBgbW91c2Vkb3duYCBvciBgdG91Y2hzdGFydGAgZXZlbnQuXHJcblx0ICogQHJldHVybnMgT2JqZWN0IENvb3JkcyB3aGljaCBjb250YWlucyBgeGAgYW5kIGB5YCBjb29yZGluYXRlcyBvZiBjdXJyZW50IHBvaW50ZXIgcG9zaXRpb24uXHJcblx0ICovXHJcblx0cG9pbnRlcihldmVudDogYW55KTogQ29vcmRzIHtcclxuXHRcdGNvbnN0IHJlc3VsdCA9IHsgeDogbnVsbCwgeTogbnVsbCB9O1xyXG5cclxuXHRcdGV2ZW50ID0gZXZlbnQub3JpZ2luYWxFdmVudCB8fCBldmVudCB8fCB3aW5kb3cuZXZlbnQ7XHJcblxyXG5cdFx0ZXZlbnQgPSBldmVudC50b3VjaGVzICYmIGV2ZW50LnRvdWNoZXMubGVuZ3RoID9cclxuXHRcdFx0ZXZlbnQudG91Y2hlc1swXSA6IGV2ZW50LmNoYW5nZWRUb3VjaGVzICYmIGV2ZW50LmNoYW5nZWRUb3VjaGVzLmxlbmd0aCA/XHJcblx0XHRcdFx0ZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0gOiBldmVudDtcclxuXHJcblx0XHRpZiAoZXZlbnQucGFnZVgpIHtcclxuXHRcdFx0cmVzdWx0LnggPSBldmVudC5wYWdlWDtcclxuXHRcdFx0cmVzdWx0LnkgPSBldmVudC5wYWdlWTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJlc3VsdC54ID0gZXZlbnQuY2xpZW50WDtcclxuXHRcdFx0cmVzdWx0LnkgPSBldmVudC5jbGllbnRZO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0IH1cclxuXHJcbiAgLyoqXHJcblx0ICogRGV0ZXJtaW5lcyBpZiB0aGUgaW5wdXQgaXMgYSBOdW1iZXIgb3Igc29tZXRoaW5nIHRoYXQgY2FuIGJlIGNvZXJjZWQgdG8gYSBOdW1iZXJcclxuXHQgKiBAcGFyYW0gbnVtYmVyIFRoZSBpbnB1dCB0byBiZSB0ZXN0ZWRcclxuXHQgKiBAcmV0dXJucyBBbiBpbmRpY2F0aW9uIGlmIHRoZSBpbnB1dCBpcyBhIE51bWJlciBvciBjYW4gYmUgY29lcmNlZCB0byBhIE51bWJlclxyXG5cdCAqL1xyXG4gIHByaXZhdGUgX2lzTnVtZXJpYyhudW1iZXI6IGFueSk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuICFpc05hTihwYXJzZUZsb2F0KG51bWJlcikpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRGV0ZXJtaW5lcyB3aGV0aGVyIHZhbHVlIGlzIG51bWJlciBvciBib29sZWFuIHR5cGVcclxuXHQgKiBAcGFyYW0gdmFsdWUgVGhlIGlucHV0IHRvIGJlIHRlc3RlZFxyXG5cdCAqIEByZXR1cm5zIEFuIGluZGljYXRpb24gaWYgdGhlIGlucHV0IGlzIGEgTnVtYmVyIG9yIGNhbiBiZSBjb2VyY2VkIHRvIGEgTnVtYmVyLCBvciBCb29sZWFuXHJcblx0ICovXHJcblx0cHJpdmF0ZSBfaXNOdW1iZXJPckJvb2xlYW4odmFsdWU6IG51bWJlciB8IGJvb2xlYW4pOiBib29sZWFuIHtcclxuXHRcdHJldHVybiB0aGlzLl9pc051bWVyaWModmFsdWUpIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRGV0ZXJtaW5lcyB3aGV0aGVyIHZhbHVlIGlzIG51bWJlciBvciBzdHJpbmcgdHlwZVxyXG5cdCAqIEBwYXJhbSB2YWx1ZSBUaGUgaW5wdXQgdG8gYmUgdGVzdGVkXHJcblx0ICogQHJldHVybnMgQW4gaW5kaWNhdGlvbiBpZiB0aGUgaW5wdXQgaXMgYSBOdW1iZXIgb3IgY2FuIGJlIGNvZXJjZWQgdG8gYSBOdW1iZXIsIG9yIFN0cmluZ1xyXG5cdCAqL1xyXG5cdHByaXZhdGUgX2lzTnVtYmVyT3JTdHJpbmcodmFsdWU6IG51bWJlciB8IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2lzTnVtZXJpYyh2YWx1ZSkgfHwgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERldGVybWluZXMgd2hldGhlciB2YWx1ZSBpcyBudW1iZXIgb3Igc3RyaW5nIHR5cGVcclxuXHQgKiBAcGFyYW0gdmFsdWUgVGhlIGlucHV0IHRvIGJlIHRlc3RlZFxyXG5cdCAqIEByZXR1cm5zIEFuIGluZGljYXRpb24gaWYgdGhlIGlucHV0IGlzIGEgTnVtYmVyIG9yIGNhbiBiZSBjb2VyY2VkIHRvIGEgTnVtYmVyLCBvciBTdHJpbmdcclxuXHQgKi9cclxuXHRwcml2YXRlIF9pc1N0cmluZ09yQm9vbGVhbih2YWx1ZTogbnVtYmVyIHwgc3RyaW5nKTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJztcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEdldHMgdGhlIGRpZmZlcmVuY2Ugb2YgdHdvIHZlY3RvcnMuXHJcblx0ICogQHRvZG8gIzI2MVxyXG5cdCAqIEBwYXJhbSBmaXJzdCBUaGUgZmlyc3QgdmVjdG9yLlxyXG5cdCAqIEBwYXJhbSBzZWNvbmQtIFRoZSBzZWNvbmQgdmVjdG9yLlxyXG5cdCAqIEByZXR1cm5zIFRoZSBkaWZmZXJlbmNlLlxyXG5cdCAqL1xyXG4gIGRpZmZlcmVuY2UoZmlyc3Q6IENvb3Jkcywgc2Vjb25kOiBDb29yZHMpOiBDb29yZHMge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0eDogZmlyc3QueCAtIHNlY29uZC54LFxyXG5cdFx0XHR5OiBmaXJzdC55IC0gc2Vjb25kLnlcclxuXHRcdH07XHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTmF2RGF0YSwgRG90c0RhdGEgfSBmcm9tICcuLi9tb2RlbHMvbmF2aWdhdGlvbi1kYXRhLm1vZGVscyc7XHJcbmltcG9ydCB7IENhcm91c2VsU2xpZGVEaXJlY3RpdmUgfSBmcm9tICcuLi9jYXJvdXNlbC9jYXJvdXNlbC5tb2R1bGUnO1xyXG5pbXBvcnQgeyBDYXJvdXNlbFNlcnZpY2UgfSBmcm9tICcuL2Nhcm91c2VsLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIE9ic2VydmFibGUsIG1lcmdlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IHRhcCwgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBPd2xPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWxzL293bC1vcHRpb25zLm1vZGVsJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE5hdmlnYXRpb25TZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcclxuICAvKipcclxuICAgKiBTdWJzY3Jpb3B0aW9uIHRvIG1lcmdlIE9ic2VydmFibGUgIGZyb20gQ2Fyb3VzZWxTZXJ2aWNlXHJcbiAgICovXHJcbiAgbmF2U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBwbHVnaW4gaXMgaW5pdGlhbGl6ZWQgb3Igbm90LlxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBfaW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGN1cnJlbnQgcGFnaW5nIGluZGV4ZXMuXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIF9wYWdlczogYW55W10gPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogRGF0YSBmb3IgbmF2aWdhdGlvbiBlbGVtZW50cyBvZiB0aGUgdXNlciBpbnRlcmZhY2UuXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIF9uYXZEYXRhOiBOYXZEYXRhID0ge1xyXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgcHJldjoge1xyXG4gICAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICAgIGh0bWxUZXh0OiAnJ1xyXG4gICAgfSxcclxuICAgIG5leHQ6IHtcclxuICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgICBodG1sVGV4dDogJydcclxuICAgIH0sXHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogRGF0YSBmb3IgZG90IGVsZW1lbnRzIG9mIHRoZSB1c2VyIGludGVyZmFjZS5cclxuICAgKi9cclxuICBwcm90ZWN0ZWQgX2RvdHNEYXRhOiBEb3RzRGF0YSA9IHtcclxuICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgIGRvdHM6IFtdXHJcbiAgfTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjYXJvdXNlbFNlcnZpY2U6IENhcm91c2VsU2VydmljZSkge1xyXG4gICAgdGhpcy5zcHlEYXRhU3RyZWFtcygpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLm5hdlN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVmaW5lcyBPYnNlcnZhYmxlcyB3aGljaCBzZXJ2aWNlIG11c3Qgb2JzZXJ2ZVxyXG4gICAqL1xyXG4gIHNweURhdGFTdHJlYW1zKCkge1xyXG4gICAgY29uc3QgaW5pdGlhbGl6ZWRDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldEluaXRpYWxpemVkU3RhdGUoKS5waXBlKFxyXG4gICAgICB0YXAoc3RhdGUgPT4ge1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZU5hdlBhZ2VzKCk7XHJcbiAgICAgICAgdGhpcy5kcmF3KCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgICB0aGlzLmNhcm91c2VsU2VydmljZS5zZW5kQ2hhbmdlcygpO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBtb3N0bHkgY2hhbmdlcyBpbiBjYXJvdXNlbFNlcnZpY2UgYW5kIGNhcm91c2VsIGF0IGFsbCBjYXVzZXMgY2Fyb3VzZWxTZXJ2aWNlLnRvKCkuIEl0IG1vdmVzIHN0YWdlIHJpZ2h0LWxlZnQgYnkgaXRzIGNvZGUgYW5kIGNhbGxpbmcgbmVlZGVkIGZ1bmN0aW9uc1xyXG4gICAgLy8gVGh1cyB0aGlzIG1ldGhvZCBieSBjYWxsaW5nIGNhcm91c2VsU2VydmljZS5jdXJyZW50KHBvc2l0aW9uKSBub3RpZmllcyBhYm91dCBjaGFuZ2VzXHJcbiAgICBjb25zdCBjaGFuZ2VkU2V0dGluZ3MkOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRDaGFuZ2VkU3RhdGUoKS5waXBlKFxyXG4gICAgICBmaWx0ZXIoZGF0YSA9PiBkYXRhLnByb3BlcnR5Lm5hbWUgPT09ICdwb3NpdGlvbicpLFxyXG4gICAgICB0YXAoZGF0YSA9PiB7XHJcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgICAvLyBzaG91bGQgYmUgdGhlIGNhbGwgb2YgdGhlIGZ1bmN0aW9uIHdyaXR0ZW4gYXQgdGhlIGVuZCBvZiBjb21tZW50XHJcbiAgICAgICAgLy8gYnV0IHRoZSBtZXRob2QgY2Fyb3VzZWxTZXJ2aXZlLnRvKCkgaGFzIHNldFRpbWVvdXQoZiwgMCkgd2hpY2ggY29udGFpbnMgY2Fyb3VzZWxTZXJ2aXZlLnVwZGF0ZSgpIHdoaWNoIGNhbGxzIHNlbmRDaGFuZ2VzKCkgbWV0aG9kLlxyXG4gICAgICAgIC8vIGNhcm91c2VsU2VydmljZS5uYXZEYXRhIGFuZCBjYXJvdXNlbFNlcnZpY2UuZG90c0RhdGEgdXBkYXRlIGVhcmxpZXIgdGhhbiBjYXJvdXNlbFNlcnZpdmUudXBkYXRlKCkgZ2V0cyBjYWxsZWRcclxuICAgICAgICAvLyB1cGRhdGVzIG9mIGNhcm91c2VsU2VydmljZS5uYXZEYXRhIGFuZCBjYXJvdXNlbFNlcnZpY2UuZG90c0RhdGEgYXJlIGJlaW5nIGhhcHBlbmluZyB3aXRoaW5nIGNhcm91c2VsU2VydmljZS5jdXJyZW50KHBvc2l0aW9uKSBtZXRob2Qgd2hpY2ggY2FsbHMgbmV4dCgpIG9mIF9jaGFuZ2VkU2V0dGluZ3NDYXJvdXNlbCRcclxuICAgICAgICAvLyBjYXJvdXNlbFNlcnZpY2UuY3VycmVudChwb3NpdGlvbikgaXMgYmVpbmcgY2FsbGluZyBlYXJsaWVyIHRoYW4gY2Fyb3VzZWxTZXJ2aXZlLnVwZGF0ZSgpO1xyXG4gICAgICAgIC8vIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNlbmRDaGFuZ2VzKCk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IHJlZnJlc2hlZENhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0UmVmcmVzaGVkU3RhdGUoKS5waXBlKFxyXG4gICAgICB0YXAoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZU5hdlBhZ2VzKCk7XHJcbiAgICAgICAgdGhpcy5kcmF3KCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgICB0aGlzLmNhcm91c2VsU2VydmljZS5zZW5kQ2hhbmdlcygpO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBuYXZNZXJnZSQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IG1lcmdlKGluaXRpYWxpemVkQ2Fyb3VzZWwkLCBjaGFuZ2VkU2V0dGluZ3MkLCByZWZyZXNoZWRDYXJvdXNlbCQpO1xyXG4gICAgdGhpcy5uYXZTdWJzY3JpcHRpb24gPSBuYXZNZXJnZSQuc3Vic2NyaWJlKFxyXG4gICAgICAoKSA9PiB7fVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEluaXRpYWxpemVzIHRoZSBsYXlvdXQgb2YgdGhlIHBsdWdpbiBhbmQgZXh0ZW5kcyB0aGUgY2Fyb3VzZWwuXHJcblx0ICovXHJcblx0aW5pdGlhbGl6ZSgpIHtcclxuICAgIHRoaXMuX25hdkRhdGEuZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5fbmF2RGF0YS5wcmV2Lmh0bWxUZXh0ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MubmF2VGV4dFswXTtcclxuICAgIHRoaXMuX25hdkRhdGEubmV4dC5odG1sVGV4dCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLm5hdlRleHRbMV07XHJcblxyXG4gICAgdGhpcy5fZG90c0RhdGEuZGlzYWJsZWQgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm5hdkRhdGEgPSB0aGlzLl9uYXZEYXRhO1xyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UuZG90c0RhdGEgPSB0aGlzLl9kb3RzRGF0YTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbGN1bGF0ZXMgaW50ZXJuYWwgc3RhdGVzIGFuZCB1cGRhdGVzIHByb3AgX3BhZ2VzXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfdXBkYXRlTmF2UGFnZXMoKSB7XHJcblx0XHRsZXQgaTogbnVtYmVyLCBqOiBudW1iZXIsIGs6IG51bWJlcjtcclxuXHRcdGNvbnN0IGxvd2VyOiBudW1iZXIgPSB0aGlzLmNhcm91c2VsU2VydmljZS5jbG9uZXMoKS5sZW5ndGggLyAyLFxyXG4gICAgICB1cHBlcjogbnVtYmVyID0gbG93ZXIgKyB0aGlzLmNhcm91c2VsU2VydmljZS5pdGVtcygpLmxlbmd0aCxcclxuICAgICAgbWF4aW11bTogbnVtYmVyID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UubWF4aW11bSh0cnVlKSxcclxuICAgICAgcGFnZXM6IGFueVtdID0gW10sXHJcbiAgICAgIHNldHRpbmdzOiBPd2xPcHRpb25zID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3M7XHJcbiAgICAgbGV0IHNpemUgPSBzZXR0aW5ncy5jZW50ZXIgfHwgc2V0dGluZ3MuYXV0b1dpZHRoIHx8IHNldHRpbmdzLmRvdHNEYXRhXHJcbiAgICAgICAgPyAxIDogc2V0dGluZ3MuZG90c0VhY2ggfHwgc2V0dGluZ3MuaXRlbXM7XHJcbiAgICAgIHNpemUgPSArc2l6ZTtcclxuXHRcdGlmIChzZXR0aW5ncy5zbGlkZUJ5ICE9PSAncGFnZScpIHtcclxuXHRcdFx0c2V0dGluZ3Muc2xpZGVCeSA9IE1hdGgubWluKCtzZXR0aW5ncy5zbGlkZUJ5LCBzZXR0aW5ncy5pdGVtcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHNldHRpbmdzLmRvdHMgfHwgc2V0dGluZ3Muc2xpZGVCeSA9PT0gJ3BhZ2UnKSB7XHJcblxyXG5cdFx0XHRmb3IgKGkgPSBsb3dlciwgaiA9IDAsIGsgPSAwOyBpIDwgdXBwZXI7IGkrKykge1xyXG5cdFx0XHRcdGlmIChqID49IHNpemUgfHwgaiA9PT0gMCkge1xyXG5cdFx0XHRcdFx0cGFnZXMucHVzaCh7XHJcblx0XHRcdFx0XHRcdHN0YXJ0OiBNYXRoLm1pbihtYXhpbXVtLCBpIC0gbG93ZXIpLFxyXG5cdFx0XHRcdFx0XHRlbmQ6IGkgLSBsb3dlciArIHNpemUgLSAxXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdGlmIChNYXRoLm1pbihtYXhpbXVtLCBpIC0gbG93ZXIpID09PSBtYXhpbXVtKSB7XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0aiA9IDAsICsraztcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aiArPSB0aGlzLmNhcm91c2VsU2VydmljZS5tZXJnZXJzKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnJlbGF0aXZlKGkpKSBhcyBudW1iZXI7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHRoaXMuX3BhZ2VzID0gcGFnZXM7XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBEcmF3cyB0aGUgdXNlciBpbnRlcmZhY2UuXHJcblx0ICogQHRvZG8gVGhlIG9wdGlvbiBgZG90c0RhdGFgIHdvbnQgd29yay5cclxuXHQgKi9cclxuICBkcmF3KCkge1xyXG5cdFx0bGV0IGRpZmZlcmVuY2U6IG51bWJlcjtcclxuICAgIGNvbnN0XHRzZXR0aW5nczogT3dsT3B0aW9ucyA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLFxyXG4gICAgICBpdGVtczogQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZVtdID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuaXRlbXMoKSxcclxuICAgICAgZGlzYWJsZWQgPSBpdGVtcy5sZW5ndGggPD0gc2V0dGluZ3MuaXRlbXM7XHJcblxyXG5cdFx0dGhpcy5fbmF2RGF0YS5kaXNhYmxlZCA9ICFzZXR0aW5ncy5uYXYgfHwgZGlzYWJsZWQ7XHJcblx0XHR0aGlzLl9kb3RzRGF0YS5kaXNhYmxlZCA9ICFzZXR0aW5ncy5kb3RzIHx8IGRpc2FibGVkO1xyXG5cclxuXHRcdGlmIChzZXR0aW5ncy5kb3RzKSB7XHJcblx0XHRcdGRpZmZlcmVuY2UgPSB0aGlzLl9wYWdlcy5sZW5ndGggLSB0aGlzLl9kb3RzRGF0YS5kb3RzLmxlbmd0aDtcclxuXHJcblx0XHRcdGlmIChzZXR0aW5ncy5kb3RzRGF0YSAmJiBkaWZmZXJlbmNlICE9PSAwKSB7XHJcbiAgICAgICAgdGhpcy5fZG90c0RhdGEuZG90cyA9IFtdO1xyXG4gICAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICB0aGlzLl9kb3RzRGF0YS5kb3RzLnB1c2goe1xyXG4gICAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxyXG4gICAgICAgICAgICBpZDogYGRvdC0ke2l0ZW0uaWR9YCxcclxuICAgICAgICAgICAgaW5uZXJDb250ZW50OiBpdGVtLmRvdENvbnRlbnQsXHJcbiAgICAgICAgICAgIHNob3dJbm5lckNvbnRlbnQ6IHRydWVcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cdFx0XHR9IGVsc2UgaWYgKGRpZmZlcmVuY2UgPiAwKSB7XHJcbiAgICAgICAgY29uc3Qgc3RhcnRJOiBudW1iZXIgPSB0aGlzLl9kb3RzRGF0YS5kb3RzLmxlbmd0aCA+IDAgPyB0aGlzLl9kb3RzRGF0YS5kb3RzLmxlbmd0aCA6IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaWZmZXJlbmNlOyBpKyspIHtcclxuICAgICAgICAgIHRoaXMuX2RvdHNEYXRhLmRvdHMucHVzaCh7XHJcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGlkOiBgZG90LSR7aSArIHN0YXJ0SX1gLFxyXG4gICAgICAgICAgICBzaG93SW5uZXJDb250ZW50OiBmYWxzZVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cdFx0XHR9IGVsc2UgaWYgKGRpZmZlcmVuY2UgPCAwKSB7XHJcbiAgICAgICAgdGhpcy5fZG90c0RhdGEuZG90cy5zcGxpY2UoZGlmZmVyZW5jZSwgTWF0aC5hYnMoZGlmZmVyZW5jZSkpXHJcblx0XHRcdH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5uYXZEYXRhID0gdGhpcy5fbmF2RGF0YTtcclxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmRvdHNEYXRhID0gdGhpcy5fZG90c0RhdGE7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlcyBuYXZpZ2F0aW9uIGJ1dHRvbnMncyBhbmQgZG90cydzIHN0YXRlc1xyXG4gICAqL1xyXG4gIHVwZGF0ZSgpIHtcclxuICAgIHRoaXMuX3VwZGF0ZU5hdkJ1dHRvbnMoKTtcclxuICAgIHRoaXMuX3VwZGF0ZURvdHMoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoYW5nZXMgc3RhdGUgb2YgbmF2IGJ1dHRvbnMgKGRpc2FibGVkLCBlbmFibGVkKVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3VwZGF0ZU5hdkJ1dHRvbnMoKSB7XHJcbiAgICBjb25zdFx0c2V0dGluZ3M6IE93bE9wdGlvbnMgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncyxcclxuICAgICAgbG9vcDogYm9vbGVhbiA9IHNldHRpbmdzLmxvb3AgfHwgc2V0dGluZ3MucmV3aW5kLFxyXG4gICAgICBpbmRleDogbnVtYmVyID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UucmVsYXRpdmUodGhpcy5jYXJvdXNlbFNlcnZpY2UuY3VycmVudCgpKTtcclxuXHJcbiAgICBpZiAoc2V0dGluZ3MubmF2KSB7XHJcbiAgICAgIHRoaXMuX25hdkRhdGEucHJldi5kaXNhYmxlZCA9ICFsb29wICYmIGluZGV4IDw9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm1pbmltdW0odHJ1ZSk7XHJcblx0XHRcdHRoaXMuX25hdkRhdGEubmV4dC5kaXNhYmxlZCA9ICFsb29wICYmIGluZGV4ID49IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm1heGltdW0odHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UubmF2RGF0YSA9IHRoaXMuX25hdkRhdGE7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGFuZ2VzIGFjdGl2ZSBkb3QgaWYgcGFnZSBiZWNvbWVzIGNoYW5nZWRcclxuICAgKi9cclxuICBwcml2YXRlIF91cGRhdGVEb3RzKCkge1xyXG4gICAgbGV0IGN1ckFjdGl2ZURvdEk6IG51bWJlcjtcclxuICAgIHRoaXMuX2RvdHNEYXRhLmRvdHMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgaWYgKGl0ZW0uYWN0aXZlID09PSB0cnVlKSB7XHJcbiAgICAgICAgaXRlbS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICBjdXJBY3RpdmVEb3RJID0gdGhpcy5fY3VycmVudCgpO1xyXG4gICAgaWYgKHRoaXMuX2RvdHNEYXRhLmRvdHMubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMuX2RvdHNEYXRhLmRvdHNbY3VyQWN0aXZlRG90SV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmRvdHNEYXRhID0gdGhpcy5fZG90c0RhdGE7XHJcbiAgfVxyXG5cclxuICAvKipcclxuXHQgKiBHZXRzIHRoZSBjdXJyZW50IHBhZ2UgcG9zaXRpb24gb2YgdGhlIGNhcm91c2VsLlxyXG5cdCAqIEByZXR1cm5zIHRoZSBjdXJyZW50IHBhZ2UgcG9zaXRpb24gb2YgdGhlIGNhcm91c2VsXHJcblx0ICovXHJcblx0cHJpdmF0ZSBfY3VycmVudCgpOiBhbnkge1xyXG4gICAgY29uc3QgY3VycmVudDogbnVtYmVyID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UucmVsYXRpdmUodGhpcy5jYXJvdXNlbFNlcnZpY2UuY3VycmVudCgpKTtcclxuICAgIGxldCBmaW5hbEN1cnJlbnQ6IG51bWJlcjtcclxuICAgIGNvbnN0IHBhZ2VzOiBhbnkgPSB0aGlzLl9wYWdlcy5maWx0ZXIoKHBhZ2UsIGluZGV4KSA9PiB7XHJcbiAgICAgIHJldHVybiBwYWdlLnN0YXJ0IDw9IGN1cnJlbnQgJiYgcGFnZS5lbmQgPj0gY3VycmVudDtcclxuICAgIH0pLnBvcCgpO1xyXG5cclxuICAgIGZpbmFsQ3VycmVudCA9IHRoaXMuX3BhZ2VzLmZpbmRJbmRleChwYWdlID0+IHtcclxuICAgICAgcmV0dXJuIHBhZ2Uuc3RhcnQgPT09IHBhZ2VzLnN0YXJ0ICYmIHBhZ2UuZW5kID09PSBwYWdlcy5lbmQ7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gZmluYWxDdXJyZW50O1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG5cdCAqIEdldHMgdGhlIGN1cnJlbnQgc3VjY2Vzb3IvcHJlZGVjZXNzb3IgcG9zaXRpb24uXHJcbiAgICogQHBhcmFtIHN1c3Nlc3NvciBwb3NpdGlvbiBvZiBzbGlkZVxyXG5cdCAqIEByZXR1cm5zIHRoZSBjdXJyZW50IHN1Y2Nlc29yL3ByZWRlY2Vzc29yIHBvc2l0aW9uXHJcblx0ICovXHJcblx0cHJpdmF0ZSBfZ2V0UG9zaXRpb24oc3VjY2Vzc29yOiBudW1iZXIgfCBib29sZWFuKTogbnVtYmVyIHtcclxuXHRcdGxldCBwb3NpdGlvbjogbnVtYmVyLCBsZW5ndGg6IG51bWJlcjtcclxuXHRcdGNvbnN0XHRzZXR0aW5nczogT3dsT3B0aW9ucyA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzO1xyXG5cclxuXHRcdGlmIChzZXR0aW5ncy5zbGlkZUJ5ID09PSAncGFnZScpIHtcclxuXHRcdFx0cG9zaXRpb24gPSB0aGlzLl9jdXJyZW50KCk7XHJcblx0XHRcdGxlbmd0aCA9IHRoaXMuX3BhZ2VzLmxlbmd0aDtcclxuXHRcdFx0c3VjY2Vzc29yID8gKytwb3NpdGlvbiA6IC0tcG9zaXRpb247XHJcblx0XHRcdHBvc2l0aW9uID0gdGhpcy5fcGFnZXNbKChwb3NpdGlvbiAlIGxlbmd0aCkgKyBsZW5ndGgpICUgbGVuZ3RoXS5zdGFydDtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHBvc2l0aW9uID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UucmVsYXRpdmUodGhpcy5jYXJvdXNlbFNlcnZpY2UuY3VycmVudCgpKTtcclxuXHRcdFx0bGVuZ3RoID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuaXRlbXMoKS5sZW5ndGg7XHJcblx0XHRcdHN1Y2Nlc3NvciA/IHBvc2l0aW9uICs9ICtzZXR0aW5ncy5zbGlkZUJ5IDogcG9zaXRpb24gLT0gK3NldHRpbmdzLnNsaWRlQnk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHBvc2l0aW9uO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG5cdCAqIFNsaWRlcyB0byB0aGUgbmV4dCBpdGVtIG9yIHBhZ2UuXHJcblx0ICogQHBhcmFtIHNwZWVkIFRoZSB0aW1lIGluIG1pbGxpc2Vjb25kcyBmb3IgdGhlIHRyYW5zaXRpb24uXHJcblx0ICovXHJcblx0bmV4dChzcGVlZDogbnVtYmVyIHwgYm9vbGVhbikge1xyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UudG8odGhpcy5fZ2V0UG9zaXRpb24odHJ1ZSksIHNwZWVkKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBTbGlkZXMgdG8gdGhlIHByZXZpb3VzIGl0ZW0gb3IgcGFnZS5cclxuXHQgKiBAcGFyYW0gc3BlZWQgVGhlIHRpbWUgaW4gbWlsbGlzZWNvbmRzIGZvciB0aGUgdHJhbnNpdGlvbi5cclxuXHQgKi9cclxuXHRwcmV2KHNwZWVkOiBudW1iZXIgfCBib29sZWFuKSB7XHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS50byh0aGlzLl9nZXRQb3NpdGlvbihmYWxzZSksIHNwZWVkKTtcclxuICB9O1xyXG5cclxuIFx0LyoqXHJcblx0ICogU2xpZGVzIHRvIHRoZSBzcGVjaWZpZWQgaXRlbSBvciBwYWdlLlxyXG5cdCAqIEBwYXJhbSBwb3NpdGlvbiAtIFRoZSBwb3NpdGlvbiBvZiB0aGUgaXRlbSBvciBwYWdlLlxyXG5cdCAqIEBwYXJhbSBzcGVlZCAtIFRoZSB0aW1lIGluIG1pbGxpc2Vjb25kcyBmb3IgdGhlIHRyYW5zaXRpb24uXHJcblx0ICogQHBhcmFtIHN0YW5kYXJkIC0gV2hldGhlciB0byB1c2UgdGhlIHN0YW5kYXJkIGJlaGF2aW91ciBvciBub3QuIERlZmF1bHQgbWVhbmluZyBmYWxzZVxyXG5cdCAqL1xyXG5cdHRvKHBvc2l0aW9uOiBudW1iZXIsIHNwZWVkOiBudW1iZXIgfCBib29sZWFuLCBzdGFuZGFyZD86IGJvb2xlYW4pIHtcclxuXHRcdGxldCBsZW5ndGg6IG51bWJlcjtcclxuXHRcdGlmICghc3RhbmRhcmQgJiYgdGhpcy5fcGFnZXMubGVuZ3RoKSB7XHJcbiAgICAgIGxlbmd0aCA9IHRoaXMuX3BhZ2VzLmxlbmd0aDtcclxuICAgICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UudG8odGhpcy5fcGFnZXNbKChwb3NpdGlvbiAlIGxlbmd0aCkgKyBsZW5ndGgpICUgbGVuZ3RoXS5zdGFydCwgc3BlZWQpO1xyXG5cdFx0fSBlbHNlIHtcclxuICAgICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UudG8ocG9zaXRpb24sIHNwZWVkKTtcclxuXHRcdH1cclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBNb3ZlcyBjYXJvdXNlbCBhZnRlciB1c2VyJ3MgY2xpY2tpbmcgb24gYW55IGRvdHNcclxuICAgKi9cclxuICBtb3ZlQnlEb3QoZG90SWQ6IHN0cmluZykge1xyXG4gICAgY29uc3QgaW5kZXg6IG51bWJlciA9IHRoaXMuX2RvdHNEYXRhLmRvdHMuZmluZEluZGV4KGRvdCA9PiBkb3RJZCA9PT0gZG90LmlkKTtcclxuICAgIHRoaXMudG8oaW5kZXgsIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmRvdHNTcGVlZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiByZXdpbmRzIGNhcm91c2VsIHRvIHNsaWRlIHdpdGggbmVlZGVkIGlkXHJcbiAgICogQHBhcmFtIGlkIGlkIG9mIHNsaWRlXHJcbiAgICovXHJcbiAgdG9TbGlkZUJ5SWQoaWQ6IHN0cmluZykge1xyXG4gICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLmNhcm91c2VsU2VydmljZS5zbGlkZXNEYXRhLmZpbmRJbmRleChzbGlkZSA9PiBzbGlkZS5pZCA9PT0gaWQgJiYgc2xpZGUuaXNDbG9uZWQgPT09IGZhbHNlKTtcclxuXHJcbiAgICBpZiAocG9zaXRpb24gPT09IC0xIHx8IHBvc2l0aW9uID09PSB0aGlzLmNhcm91c2VsU2VydmljZS5jdXJyZW50KCkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuXHRcdHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnRvKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnJlbGF0aXZlKHBvc2l0aW9uKSwgZmFsc2UpO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiLy8gaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG4vLyBmdW5jdGlvbiBfd2luZG93KCk6IGFueSB7XHJcbi8vICAgIC8vIHJldHVybiB0aGUgZ2xvYmFsIG5hdGl2ZSBicm93c2VyIHdpbmRvdyBvYmplY3RcclxuLy8gICAgcmV0dXJuIHdpbmRvdztcclxuLy8gfVxyXG4vLyBASW5qZWN0YWJsZSgpXHJcbi8vIGV4cG9ydCBjbGFzcyBXaW5kb3dSZWZTZXJ2aWNlIHtcclxuLy8gICAgZ2V0IG5hdGl2ZVdpbmRvdygpOiBhbnkge1xyXG4vLyAgICAgICByZXR1cm4gX3dpbmRvdygpO1xyXG4vLyAgICB9XHJcbi8vIH1cclxuXHJcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtcclxuICBDbGFzc1Byb3ZpZGVyLFxyXG4gIEZhY3RvcnlQcm92aWRlcixcclxuICBJbmplY3Rpb25Ub2tlbixcclxuICBQTEFURk9STV9JRFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhIG5ldyBpbmplY3Rpb24gdG9rZW4gZm9yIGluamVjdGluZyB0aGUgd2luZG93IGludG8gYSBjb21wb25lbnQuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgV0lORE9XID0gbmV3IEluamVjdGlvblRva2VuKCdXaW5kb3dUb2tlbicpO1xyXG5cclxuLyoqXHJcbiAqIERlZmluZSBhYnN0cmFjdCBjbGFzcyBmb3Igb2J0YWluaW5nIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIHdpbmRvdyBvYmplY3QuXHJcbiAqL1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgV2luZG93UmVmIHtcclxuICBnZXQgbmF0aXZlV2luZG93KCk6IFdpbmRvdyB8IE9iamVjdCB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZC4nKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEZWZpbmUgY2xhc3MgdGhhdCBpbXBsZW1lbnRzIHRoZSBhYnN0cmFjdCBjbGFzcyBhbmQgcmV0dXJucyB0aGUgbmF0aXZlIHdpbmRvdyBvYmplY3QuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQnJvd3NlcldpbmRvd1JlZiBleHRlbmRzIFdpbmRvd1JlZiB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHJldHVybnMgd2luZG93IG9iamVjdFxyXG4gICAqL1xyXG4gIGdldCBuYXRpdmVXaW5kb3coKTogV2luZG93IHwgT2JqZWN0IHtcclxuICAgIHJldHVybiB3aW5kb3c7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGFuIGZhY3RvcnkgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBuYXRpdmUgd2luZG93IG9iamVjdC5cclxuICogQHBhcmFtIGJyb3dzZXJXaW5kb3dSZWYgTmF0aXZlIHdpbmRvdyBvYmplY3RcclxuICogQHBhcmFtIHBsYXRmb3JtSWQgaWQgb2YgcGxhdGZvcm1cclxuICogQHJldHVybnMgdHlwZSBvZiBwbGF0Zm9ybSBvZiBlbXB0eSBvYmplY3RcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB3aW5kb3dGYWN0b3J5KFxyXG4gIGJyb3dzZXJXaW5kb3dSZWY6IEJyb3dzZXJXaW5kb3dSZWYsXHJcbiAgcGxhdGZvcm1JZDogT2JqZWN0XHJcbik6IFdpbmRvdyB8IE9iamVjdCB7XHJcbiAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHBsYXRmb3JtSWQpKSB7XHJcbiAgICByZXR1cm4gYnJvd3NlcldpbmRvd1JlZi5uYXRpdmVXaW5kb3c7XHJcbiAgfVxyXG4gIHJldHVybiBuZXcgT2JqZWN0KCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYSBpbmplY3RhYmxlIHByb3ZpZGVyIGZvciB0aGUgV2luZG93UmVmIHRva2VuIHRoYXQgdXNlcyB0aGUgQnJvd3NlcldpbmRvd1JlZiBjbGFzcy5cclxuICovXHJcbmV4cG9ydCBjb25zdCBicm93c2VyV2luZG93UHJvdmlkZXI6IENsYXNzUHJvdmlkZXIgPSB7XHJcbiAgcHJvdmlkZTogV2luZG93UmVmLFxyXG4gIHVzZUNsYXNzOiBCcm93c2VyV2luZG93UmVmXHJcbn07XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGFuIGluamVjdGFibGUgcHJvdmlkZXIgdGhhdCB1c2VzIHRoZSB3aW5kb3dGYWN0b3J5IGZ1bmN0aW9uIGZvciByZXR1cm5pbmcgdGhlIG5hdGl2ZSB3aW5kb3cgb2JqZWN0LlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHdpbmRvd1Byb3ZpZGVyOiBGYWN0b3J5UHJvdmlkZXIgPSB7XHJcbiAgcHJvdmlkZTogV0lORE9XLFxyXG4gIHVzZUZhY3Rvcnk6IHdpbmRvd0ZhY3RvcnksXHJcbiAgZGVwczogW1dpbmRvd1JlZiwgUExBVEZPUk1fSURdXHJcbn07XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGFuIGFycmF5IG9mIHByb3ZpZGVycy5cclxuICovXHJcbmV4cG9ydCBjb25zdCBXSU5ET1dfUFJPVklERVJTID0gW2Jyb3dzZXJXaW5kb3dQcm92aWRlciwgd2luZG93UHJvdmlkZXJdO1xyXG4iLCJpbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7XHJcbiAgQ2xhc3NQcm92aWRlcixcclxuICBGYWN0b3J5UHJvdmlkZXIsXHJcbiAgSW5qZWN0aW9uVG9rZW4sXHJcbiAgUExBVEZPUk1fSUQsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGEgbmV3IGluamVjdGlvbiB0b2tlbiBmb3IgaW5qZWN0aW5nIHRoZSBEb2N1bWVudCBpbnRvIGEgY29tcG9uZW50LlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IERPQ1VNRU5UID0gbmV3IEluamVjdGlvblRva2VuPERvY3VtZW50PignRG9jdW1lbnRUb2tlbicpO1xyXG4vKipcclxuICogRGVmaW5lIGFic3RyYWN0IGNsYXNzIGZvciBvYnRhaW5pbmcgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgRG9jdW1lbnQgb2JqZWN0LlxyXG4gKi9cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIERvY3VtZW50UmVmIHtcclxuICBnZXQgbmF0aXZlRG9jdW1lbnQoKTogRG9jdW1lbnQgfCBPYmplY3Qge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQuJyk7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogRGVmaW5lIGNsYXNzIHRoYXQgaW1wbGVtZW50cyB0aGUgYWJzdHJhY3QgY2xhc3MgYW5kIHJldHVybnMgdGhlIG5hdGl2ZSBEb2N1bWVudCBvYmplY3QuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQnJvd3NlckRvY3VtZW50UmVmIGV4dGVuZHMgRG9jdW1lbnRSZWYge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEByZXR1cm5zIERvY3VtZW50IG9iamVjdFxyXG4gICAqL1xyXG4gIGdldCBuYXRpdmVEb2N1bWVudCgpOiBEb2N1bWVudCB8IE9iamVjdCB7XHJcbiAgICByZXR1cm4gZG9jdW1lbnQ7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGFuIGZhY3RvcnkgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBuYXRpdmUgRG9jdW1lbnQgb2JqZWN0LlxyXG4gKiBAcGFyYW0gYnJvd3NlckRvY3VtZW50UmVmIE5hdGl2ZSBEb2N1bWVudCBvYmplY3RcclxuICogQHBhcmFtIHBsYXRmb3JtSWQgaWQgb2YgcGxhdGZvcm1cclxuICogQHJldHVybnMgdHlwZSBvZiBwbGF0Zm9ybSBvZiBlbXB0eSBvYmplY3RcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBkb2N1bWVudEZhY3RvcnkoXHJcbiAgYnJvd3NlckRvY3VtZW50UmVmOiBCcm93c2VyRG9jdW1lbnRSZWYsXHJcbiAgcGxhdGZvcm1JZDogT2JqZWN0XHJcbik6IERvY3VtZW50IHwgT2JqZWN0IHtcclxuICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIocGxhdGZvcm1JZCkpIHtcclxuICAgIHJldHVybiBicm93c2VyRG9jdW1lbnRSZWYubmF0aXZlRG9jdW1lbnQ7XHJcbiAgfVxyXG4gIHJldHVybiBuZXcgT2JqZWN0KCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYSBpbmplY3RhYmxlIHByb3ZpZGVyIGZvciB0aGUgRG9jdW1lbnRSZWYgdG9rZW4gdGhhdCB1c2VzIHRoZSBCcm93c2VyRG9jdW1lbnRSZWYgY2xhc3MuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgYnJvd3NlckRvY3VtZW50UHJvdmlkZXI6IENsYXNzUHJvdmlkZXIgPSB7XHJcbiAgcHJvdmlkZTogRG9jdW1lbnRSZWYsXHJcbiAgdXNlQ2xhc3M6IEJyb3dzZXJEb2N1bWVudFJlZlxyXG59O1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhbiBpbmplY3RhYmxlIHByb3ZpZGVyIHRoYXQgdXNlcyB0aGUgRG9jdW1lbnRGYWN0b3J5IGZ1bmN0aW9uIGZvciByZXR1cm5pbmcgdGhlIG5hdGl2ZSBEb2N1bWVudCBvYmplY3QuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZG9jdW1lbnRQcm92aWRlcjogRmFjdG9yeVByb3ZpZGVyID0ge1xyXG4gIHByb3ZpZGU6IERPQ1VNRU5ULFxyXG4gIHVzZUZhY3Rvcnk6IGRvY3VtZW50RmFjdG9yeSxcclxuICBkZXBzOiBbRG9jdW1lbnRSZWYsIFBMQVRGT1JNX0lEXVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhbiBhcnJheSBvZiBwcm92aWRlcnMuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgRE9DVU1FTlRfUFJPVklERVJTID0gW2Jyb3dzZXJEb2N1bWVudFByb3ZpZGVyLCBkb2N1bWVudFByb3ZpZGVyXTtcclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBPYnNlcnZhYmxlLCBtZXJnZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBDYXJvdXNlbFNlcnZpY2UgfSBmcm9tICcuL2Nhcm91c2VsLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IFdJTkRPVyB9IGZyb20gJy4vd2luZG93LXJlZi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICcuL2RvY3VtZW50LXJlZi5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEF1dG9wbGF5U2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveXtcclxuICAvKipcclxuICAgKiBTdWJzY3Jpb3B0aW9uIHRvIG1lcmdlIE9ic2VydmFibGVzIGZyb20gQ2Fyb3VzZWxTZXJ2aWNlXHJcbiAgICovXHJcbiAgYXV0b3BsYXlTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGF1dG9wbGF5IHRpbWVvdXQuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfdGltZW91dDogbnVtYmVyID0gbnVsbDtcclxuXHJcbiAgLyoqXHJcbiAgICogSW5kaWNhdGVzIHdoZW5ldmVyIHRoZSBhdXRvcGxheSBpcyBwYXVzZWQuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfcGF1c2VkID0gZmFsc2U7XHJcblxyXG4gIHByaXZhdGUgd2luUmVmOiBXaW5kb3c7XHJcbiAgcHJpdmF0ZSBkb2NSZWY6IERvY3VtZW50O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhcm91c2VsU2VydmljZTogQ2Fyb3VzZWxTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgIEBJbmplY3QoV0lORE9XKSB3aW5SZWY6IGFueSxcclxuICAgICAgICAgICAgICBASW5qZWN0KERPQ1VNRU5UKSBkb2NSZWY6IGFueSxcclxuICApIHtcclxuICAgIHRoaXMud2luUmVmID0gd2luUmVmIGFzIFdpbmRvdztcclxuICAgIHRoaXMuZG9jUmVmID0gZG9jUmVmIGFzIERvY3VtZW50O1xyXG4gICAgdGhpcy5zcHlEYXRhU3RyZWFtcygpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmF1dG9wbGF5U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZWZpbmVzIE9ic2VydmFibGVzIHdoaWNoIHNlcnZpY2UgbXVzdCBvYnNlcnZlXHJcbiAgICovXHJcbiAgc3B5RGF0YVN0cmVhbXMoKSB7XHJcbiAgICBjb25zdCBpbml0aWFsaXplZENhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0SW5pdGlhbGl6ZWRTdGF0ZSgpLnBpcGUoXHJcbiAgICAgIHRhcCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9wbGF5KSB7XHJcblx0XHRcdFx0XHR0aGlzLnBsYXkoKTtcclxuXHRcdFx0XHR9XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IGNoYW5nZWRTZXR0aW5ncyQ6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldENoYW5nZWRTdGF0ZSgpLnBpcGUoXHJcbiAgICAgIHRhcChkYXRhID0+IHtcclxuICAgICAgICB0aGlzLl9oYW5kbGVDaGFuZ2VPYnNlcnZhYmxlKGRhdGEpO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBvcmlnaW5hbCBBdXRvcGxheSBQbHVnaW4gaGFzIGxpc3RlbmVycyBvbiBwbGF5Lm93bC5jb3JlIGFuZCBzdG9wLm93bC5jb3JlIGV2ZW50cy5cclxuICAgIC8vIFRoZXkgYXJlIHRyaWdnZXJlZCBieSBWaWRlbyBQbHVnaW5cclxuXHJcbiAgICBjb25zdCBhdXRvcGxheU1lcmdlJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gbWVyZ2UoaW5pdGlhbGl6ZWRDYXJvdXNlbCQsIGNoYW5nZWRTZXR0aW5ncyQpO1xyXG4gICAgdGhpcy5hdXRvcGxheVN1YnNjcmlwdGlvbiA9IGF1dG9wbGF5TWVyZ2UkLnN1YnNjcmliZShcclxuICAgICAgKCkgPT4ge31cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuXHQgKiBTdGFydHMgdGhlIGF1dG9wbGF5LlxyXG5cdCAqIEBwYXJhbSB0aW1lb3V0IFRoZSBpbnRlcnZhbCBiZWZvcmUgdGhlIG5leHQgYW5pbWF0aW9uIHN0YXJ0cy5cclxuXHQgKiBAcGFyYW0gc3BlZWQgVGhlIGFuaW1hdGlvbiBzcGVlZCBmb3IgdGhlIGFuaW1hdGlvbnMuXHJcblx0ICovXHJcblx0cGxheSh0aW1lb3V0PzogbnVtYmVyLCBzcGVlZD86IG51bWJlcikge1xyXG4gICAgaWYgKHRoaXMuX3BhdXNlZCkge1xyXG5cdFx0XHR0aGlzLl9wYXVzZWQgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy5fc2V0QXV0b1BsYXlJbnRlcnZhbCgpO1xyXG4gICAgfVxyXG5cclxuXHRcdGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5pcygncm90YXRpbmcnKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5jYXJvdXNlbFNlcnZpY2UuZW50ZXIoJ3JvdGF0aW5nJyk7XHJcblxyXG5cdFx0dGhpcy5fc2V0QXV0b1BsYXlJbnRlcnZhbCgpO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG5cdCAqIEdldHMgYSBuZXcgdGltZW91dFxyXG5cdCAqIEBwYXJhbSB0aW1lb3V0IC0gVGhlIGludGVydmFsIGJlZm9yZSB0aGUgbmV4dCBhbmltYXRpb24gc3RhcnRzLlxyXG5cdCAqIEBwYXJhbSBzcGVlZCAtIFRoZSBhbmltYXRpb24gc3BlZWQgZm9yIHRoZSBhbmltYXRpb25zLlxyXG5cdCAqIEByZXR1cm5cclxuXHQgKi9cclxuXHRwcml2YXRlIF9nZXROZXh0VGltZW91dCh0aW1lb3V0PzogbnVtYmVyLCBzcGVlZD86IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRpZiAoIHRoaXMuX3RpbWVvdXQgKSB7XHJcblx0XHRcdHRoaXMud2luUmVmLmNsZWFyVGltZW91dCh0aGlzLl90aW1lb3V0KTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzLndpblJlZi5zZXRUaW1lb3V0KCgpID0+e1xyXG4gICAgICBpZiAodGhpcy5fcGF1c2VkIHx8IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmlzKCdidXN5JykgfHwgdGhpcy5jYXJvdXNlbFNlcnZpY2UuaXMoJ2ludGVyYWN0aW5nJykgfHwgdGhpcy5kb2NSZWYuaGlkZGVuKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm5leHQoc3BlZWQgfHwgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b3BsYXlTcGVlZCk7XHJcbiAgICB9LCB0aW1lb3V0IHx8IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9wbGF5VGltZW91dCk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcblx0ICogU2V0cyBhdXRvcGxheSBpbiBtb3Rpb24uXHJcblx0ICovXHJcblx0cHJpdmF0ZSBfc2V0QXV0b1BsYXlJbnRlcnZhbCgpIHtcclxuXHRcdHRoaXMuX3RpbWVvdXQgPSB0aGlzLl9nZXROZXh0VGltZW91dCgpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFN0b3BzIHRoZSBhdXRvcGxheS5cclxuXHQgKi9cclxuXHRzdG9wKCkge1xyXG5cdFx0aWYgKCF0aGlzLmNhcm91c2VsU2VydmljZS5pcygncm90YXRpbmcnKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy53aW5SZWYuY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVvdXQpO1xyXG5cdFx0dGhpcy5jYXJvdXNlbFNlcnZpY2UubGVhdmUoJ3JvdGF0aW5nJyk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcblx0ICogU3RvcHMgdGhlIGF1dG9wbGF5LlxyXG5cdCAqL1xyXG5cdHBhdXNlKCkge1xyXG5cdFx0aWYgKCF0aGlzLmNhcm91c2VsU2VydmljZS5pcygncm90YXRpbmcnKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5fcGF1c2VkID0gdHJ1ZTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBNYW5hZ2VzIGJ5IGF1dG9wbGF5aW5nIGFjY29yZGluZyB0byBkYXRhIHBhc3NlZCBieSBfY2hhbmdlZFNldHRpbmdzQ2Fyb3VzZWwkIE9ic2FydmFibGVcclxuICAgKiBAcGFyYW0gZGF0YSBvYmplY3Qgd2l0aCBjdXJyZW50IHBvc2l0aW9uIG9mIGNhcm91c2VsIGFuZCB0eXBlIG9mIGNoYW5nZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2hhbmRsZUNoYW5nZU9ic2VydmFibGUoZGF0YSkge1xyXG4gICAgaWYgKGRhdGEucHJvcGVydHkubmFtZSA9PT0gJ3NldHRpbmdzJykge1xyXG4gICAgICBpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b3BsYXkpIHtcclxuICAgICAgICB0aGlzLnBsYXkoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnN0b3AoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChkYXRhLnByb3BlcnR5Lm5hbWUgPT09ICdwb3NpdGlvbicpIHtcclxuICAgICAgLy9jb25zb2xlLmxvZygncGxheT8nLCBlKTtcclxuICAgICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9wbGF5KSB7XHJcbiAgICAgICAgdGhpcy5fc2V0QXV0b1BsYXlJbnRlcnZhbCgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdGFydHMgcGF1c2luZ1xyXG4gICAqL1xyXG4gIHN0YXJ0UGF1c2luZygpIHtcclxuICAgIGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hdXRvcGxheUhvdmVyUGF1c2UgJiYgdGhpcy5jYXJvdXNlbFNlcnZpY2UuaXMoJ3JvdGF0aW5nJykpIHtcclxuICAgICAgdGhpcy5wYXVzZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnRzIHBsYXlpbmcgYWZ0ZXIgbW91c2UgbGVhdmVzIGNhcm91c2VsXHJcbiAgICovXHJcbiAgc3RhcnRQbGF5aW5nTW91c2VMZWF2ZSgpIHtcclxuICAgIGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hdXRvcGxheUhvdmVyUGF1c2UgJiYgdGhpcy5jYXJvdXNlbFNlcnZpY2UuaXMoJ3JvdGF0aW5nJykpIHtcclxuICAgICAgdGhpcy5wYXVzZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnRzIHBsYXlpbmcgYWZ0ZXIgdG91Y2ggZW5kc1xyXG4gICAqL1xyXG4gIHN0YXJ0UGxheWluZ1RvdWNoRW5kKCkge1xyXG4gICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9wbGF5SG92ZXJQYXVzZSAmJiB0aGlzLmNhcm91c2VsU2VydmljZS5pcygncm90YXRpbmcnKSkge1xyXG4gICAgICB0aGlzLnBhdXNlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIE9ic2VydmFibGUsIG1lcmdlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IENhcm91c2VsU2VydmljZSB9IGZyb20gJy4vY2Fyb3VzZWwuc2VydmljZSc7XHJcbmltcG9ydCB7IHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIExhenlMb2FkU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaW9wdGlvbiB0byBtZXJnZSBPYnNlcnZhYmxlICBmcm9tIENhcm91c2VsU2VydmljZVxyXG4gICAqL1xyXG4gIGxhenlMb2FkU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2Fyb3VzZWxTZXJ2aWNlOiBDYXJvdXNlbFNlcnZpY2UpIHtcclxuICAgIHRoaXMuc3B5RGF0YVN0cmVhbXMoKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5sYXp5TG9hZFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVmaW5lcyBPYnNlcnZhYmxlcyB3aGljaCBzZXJ2aWNlIG11c3Qgb2JzZXJ2ZVxyXG4gICAqL1xyXG4gIHNweURhdGFTdHJlYW1zKCkge1xyXG4gICAgY29uc3QgaW5pdGlhbGl6ZWRDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldEluaXRpYWxpemVkU3RhdGUoKS5waXBlKFxyXG4gICAgICB0YXAoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGlzTGF6eUxvYWQgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncyAmJiAhdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MubGF6eUxvYWQ7XHJcbiAgICAgICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2xpZGVzRGF0YS5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5sb2FkID0gaXNMYXp5TG9hZCA/IHRydWUgOiBmYWxzZSk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IGNoYW5nZVNldHRpbmdzJDogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0Q2hhbmdlU3RhdGUoKTtcclxuXHJcbiAgICBjb25zdCByZXNpemVkQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRSZXNpemVkU3RhdGUoKTtcclxuXHJcblxyXG4gICAgY29uc3QgbGF6eUxvYWRNZXJnZSQ6IE9ic2VydmFibGU8c3RyaW5nIHwgYW55PiA9IG1lcmdlKGluaXRpYWxpemVkQ2Fyb3VzZWwkLCBjaGFuZ2VTZXR0aW5ncyQsIHJlc2l6ZWRDYXJvdXNlbCQpLnBpcGUoXHJcbiAgICAgIHRhcChkYXRhID0+IHRoaXMuX2RlZmluZUxhenlMb2FkU2xpZGVzKGRhdGEpKSxcclxuICAgICAgLy8gdGFwKCgpID0+IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNlbmRDaGFuZ2VzKCkpXHJcbiAgICApO1xyXG4gICAgdGhpcy5sYXp5TG9hZFN1YnNjcmlwdGlvbiA9IGxhenlMb2FkTWVyZ2UkLnN1YnNjcmliZShcclxuICAgICAgKCkgPT4ge31cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9kZWZpbmVMYXp5TG9hZFNsaWRlcyhkYXRhOiBhbnkpIHtcclxuICAgIGlmICghdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MgfHwgIXRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmxhenlMb2FkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoKGRhdGEucHJvcGVydHkgJiYgZGF0YS5wcm9wZXJ0eS5uYW1lID09PSAncG9zaXRpb24nKSB8fCBkYXRhID09PSAnaW5pdGlhbGl6ZWQnIHx8IGRhdGEgPT09IFwicmVzaXplZFwiKSB7XHJcbiAgICAgIGNvbnN0IHNldHRpbmdzID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MsXHJcbiAgICAgICAgICAgIGNsb25lcyA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmNsb25lcygpLmxlbmd0aDtcclxuICAgICAgbGV0IG4gPSAoc2V0dGluZ3MuY2VudGVyICYmIE1hdGguY2VpbChzZXR0aW5ncy5pdGVtcyAvIDIpIHx8IHNldHRpbmdzLml0ZW1zKSxcclxuICAgICAgICAgIGkgPSAoKHNldHRpbmdzLmNlbnRlciAmJiBuICogLTEpIHx8IDApLFxyXG4gICAgICAgICAgcG9zaXRpb24gPSAoZGF0YS5wcm9wZXJ0eSAmJiBkYXRhLnByb3BlcnR5LnZhbHVlICE9PSB1bmRlZmluZWQgPyBkYXRhLnByb3BlcnR5LnZhbHVlIDogdGhpcy5jYXJvdXNlbFNlcnZpY2UuY3VycmVudCgpKSArIGk7XHJcbiAgICAgICAgLy8gbG9hZCA9ICQucHJveHkoZnVuY3Rpb24oaSwgdikgeyB0aGlzLmxvYWQodikgfSwgdGhpcyk7XHJcbiAgICAgIC8vVE9ETzogTmVlZCBkb2N1bWVudGF0aW9uIGZvciB0aGlzIG5ldyBvcHRpb25cclxuICAgICAgaWYgKHNldHRpbmdzLmxhenlMb2FkRWFnZXIgPiAwKSB7XHJcbiAgICAgICAgbiArPSBzZXR0aW5ncy5sYXp5TG9hZEVhZ2VyO1xyXG4gICAgICAgIC8vIElmIHRoZSBjYXJvdXNlbCBpcyBsb29waW5nIGFsc28gcHJlbG9hZCBpbWFnZXMgdGhhdCBhcmUgdG8gdGhlIFwibGVmdFwiXHJcbiAgICAgICAgaWYgKHNldHRpbmdzLmxvb3ApIHtcclxuICAgICAgICAgIHBvc2l0aW9uIC09IHNldHRpbmdzLmxhenlMb2FkRWFnZXI7XHJcbiAgICAgICAgICBuKys7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICB3aGlsZSAoaSsrIDwgbikge1xyXG4gICAgICAgIHRoaXMuX2xvYWQoY2xvbmVzIC8gMiArIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnJlbGF0aXZlKHBvc2l0aW9uKSk7XHJcbiAgICAgICAgaWYgKGNsb25lcykge1xyXG4gICAgICAgICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UuY2xvbmVzKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnJlbGF0aXZlKHBvc2l0aW9uKSkuZm9yRWFjaCh2YWx1ZSA9PiB0aGlzLl9sb2FkKHZhbHVlKSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBwb3NpdGlvbisrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuXHQgKiBMb2FkcyBhbGwgcmVzb3VyY2VzIG9mIGFuIGl0ZW0gYXQgdGhlIHNwZWNpZmllZCBwb3NpdGlvbi5cclxuXHQgKiBAcGFyYW0gcG9zaXRpb24gLSBUaGUgYWJzb2x1dGUgcG9zaXRpb24gb2YgdGhlIGl0ZW0uXHJcblx0ICovXHJcbiAgcHJpdmF0ZSBfbG9hZChwb3NpdGlvbjogbnVtYmVyKSB7XHJcbiAgICBpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2xpZGVzRGF0YVtwb3NpdGlvbl0ubG9hZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2xpZGVzRGF0YVtwb3NpdGlvbl0ubG9hZCA9IHRydWU7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIE9ic2VydmFibGUsIG1lcmdlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IENhcm91c2VsU2VydmljZSB9IGZyb20gJy4vY2Fyb3VzZWwuc2VydmljZSc7XHJcbmltcG9ydCB7IHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEFuaW1hdGVTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95e1xyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlvcHRpb24gdG8gbWVyZ2UgT2JzZXJ2YWJsZSAgZnJvbSBDYXJvdXNlbFNlcnZpY2VcclxuICAgKi9cclxuICBhbmltYXRlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIHNcclxuICAgKi9cclxuICBzd2FwcGluZyA9IHRydWU7XHJcblxyXG4gIC8qKlxyXG4gICAqIGFjdGl2ZSBzbGlkZSBiZWZvcmUgdHJhbnNsYXRpbmdcclxuICAgKi9cclxuICBwcmV2aW91cyA9IHVuZGVmaW5lZDtcclxuXHJcbiAgLyoqXHJcbiAgICogbmV3IGFjdGl2ZSBzbGlkZSBhZnRlciB0cmFuc2xhdGluZ1xyXG4gICAqL1xyXG4gIG5leHQgPSB1bmRlZmluZWQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2Fyb3VzZWxTZXJ2aWNlOiBDYXJvdXNlbFNlcnZpY2UpIHtcclxuICAgIHRoaXMuc3B5RGF0YVN0cmVhbXMoKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5hbmltYXRlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZWZpbmVzIE9ic2VydmFibGVzIHdoaWNoIHNlcnZpY2UgbXVzdCBvYnNlcnZlXHJcbiAgICovXHJcbiAgc3B5RGF0YVN0cmVhbXMoKSB7XHJcbiAgICBjb25zdCBjaGFuZ2VTZXR0aW5ncyQ6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldENoYW5nZVN0YXRlKCkucGlwZShcclxuICAgICAgdGFwKGRhdGEgPT4ge1xyXG4gICAgICAgIGlmIChkYXRhLnByb3BlcnR5Lm5hbWUgPT09ICdwb3NpdGlvbicpIHtcclxuXHRcdFx0XHRcdHRoaXMucHJldmlvdXMgPSB0aGlzLmNhcm91c2VsU2VydmljZS5jdXJyZW50KCk7XHJcblx0XHRcdFx0XHR0aGlzLm5leHQgPSBkYXRhLnByb3BlcnR5LnZhbHVlO1xyXG5cdFx0XHRcdH1cclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgZHJhZ0Nhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0RHJhZ1N0YXRlKCk7XHJcbiAgICBjb25zdCBkcmFnZ2VkQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXREcmFnZ2VkU3RhdGUoKTtcclxuICAgIGNvbnN0IHRyYW5zbGF0ZWRDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldFRyYW5zbGF0ZWRTdGF0ZSgpO1xyXG5cclxuICAgIGNvbnN0IGRyYWdUcmFuc2xhdGVkTWVyZ2UkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSBtZXJnZShkcmFnQ2Fyb3VzZWwkLCBkcmFnZ2VkQ2Fyb3VzZWwkLCB0cmFuc2xhdGVkQ2Fyb3VzZWwkKS5waXBlKFxyXG4gICAgICB0YXAoZGF0YSA9PiB0aGlzLnN3YXBwaW5nID0gZGF0YSA9PT0gJ3RyYW5zbGF0ZWQnKVxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCB0cmFuc2xhdGVDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldFRyYW5zbGF0ZVN0YXRlKCkucGlwZShcclxuICAgICAgdGFwKGRhdGEgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLnN3YXBwaW5nICYmICh0aGlzLmNhcm91c2VsU2VydmljZS5fb3B0aW9ucy5hbmltYXRlT3V0IHx8IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLl9vcHRpb25zLmFuaW1hdGVJbikpIHtcclxuICAgICAgICAgIHRoaXMuX3N3YXAoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IGFuaW1hdGVNZXJnZSQ6IE9ic2VydmFibGU8c3RyaW5nIHwgYW55PiA9IG1lcmdlKGNoYW5nZVNldHRpbmdzJCwgdHJhbnNsYXRlQ2Fyb3VzZWwkLCBkcmFnVHJhbnNsYXRlZE1lcmdlJCkucGlwZSgpO1xyXG4gICAgdGhpcy5hbmltYXRlU3Vic2NyaXB0aW9uID0gYW5pbWF0ZU1lcmdlJC5zdWJzY3JpYmUoXHJcbiAgICAgICgpID0+IHt9XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcblx0ICogVG9nZ2xlcyB0aGUgYW5pbWF0aW9uIGNsYXNzZXMgd2hlbmV2ZXIgYW4gdHJhbnNsYXRpb25zIHN0YXJ0cy5cclxuXHQgKiBAcmV0dXJuc1xyXG5cdCAqL1xyXG5cdHByaXZhdGUgX3N3YXAoKTogYm9vbGVhbiB7XHJcblxyXG5cdFx0aWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLml0ZW1zICE9PSAxKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBpZiAoISQuc3VwcG9ydC5hbmltYXRpb24gfHwgISQuc3VwcG9ydC50cmFuc2l0aW9uKSB7XHJcblx0XHQvLyBcdHJldHVybjtcclxuXHRcdC8vIH1cclxuXHJcblx0XHR0aGlzLmNhcm91c2VsU2VydmljZS5zcGVlZCgwKTtcclxuXHJcblx0XHRsZXQgbGVmdDtcclxuXHRcdGNvbnN0XHRwcmV2aW91cyA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNsaWRlc0RhdGFbdGhpcy5wcmV2aW91c10sXHJcblx0XHRcdG5leHQgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zbGlkZXNEYXRhW3RoaXMubmV4dF0sXHJcblx0XHRcdGluY29taW5nID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYW5pbWF0ZUluLFxyXG5cdFx0XHRvdXRnb2luZyA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmFuaW1hdGVPdXQ7XHJcblxyXG5cdFx0aWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmN1cnJlbnQoKSA9PT0gdGhpcy5wcmV2aW91cykge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKG91dGdvaW5nKSB7XHJcblx0XHRcdGxlZnQgPSArdGhpcy5jYXJvdXNlbFNlcnZpY2UuY29vcmRpbmF0ZXModGhpcy5wcmV2aW91cykgLSArdGhpcy5jYXJvdXNlbFNlcnZpY2UuY29vcmRpbmF0ZXModGhpcy5uZXh0KTtcclxuICAgICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2xpZGVzRGF0YS5mb3JFYWNoKHNsaWRlID0+IHtcclxuICAgICAgICBpZiAoc2xpZGUuaWQgPT09IHByZXZpb3VzLmlkKSB7XHJcbiAgICAgICAgICBzbGlkZS5sZWZ0ID0gYCR7bGVmdH1weGA7XHJcbiAgICAgICAgICBzbGlkZS5pc0FuaW1hdGVkID0gdHJ1ZTtcclxuICAgICAgICAgIHNsaWRlLmlzRGVmQW5pbWF0ZWRPdXQgPSB0cnVlO1xyXG4gICAgICAgICAgc2xpZGUuaXNDdXN0b21BbmltYXRlZE91dCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoaW5jb21pbmcpIHtcclxuICAgICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2xpZGVzRGF0YS5mb3JFYWNoKHNsaWRlID0+IHtcclxuICAgICAgICBpZiAoc2xpZGUuaWQgPT09IG5leHQuaWQpIHtcclxuICAgICAgICAgIHNsaWRlLmlzQW5pbWF0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgc2xpZGUuaXNEZWZBbmltYXRlZEluID0gdHJ1ZTtcclxuICAgICAgICAgIHNsaWRlLmlzQ3VzdG9tQW5pbWF0ZWRJbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGVzIHRoZSBlbmQgb2YgJ2FuaW1hdGlvbmVuZCcgZXZlbnRcclxuICAgKiBAcGFyYW0gaWQgSWQgb2Ygc2xpZGVzXHJcbiAgICovXHJcbiAgY2xlYXIoaWQpIHtcclxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNsaWRlc0RhdGEuZm9yRWFjaChzbGlkZSA9PiB7XHJcbiAgICAgIGlmIChzbGlkZS5pZCA9PT0gaWQpIHtcclxuICAgICAgICBzbGlkZS5sZWZ0ID0gJyc7XHJcbiAgICAgICAgc2xpZGUuaXNBbmltYXRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHNsaWRlLmlzRGVmQW5pbWF0ZWRPdXQgPSBmYWxzZTtcclxuICAgICAgICBzbGlkZS5pc0N1c3RvbUFuaW1hdGVkT3V0ID0gZmFsc2U7XHJcbiAgICAgICAgc2xpZGUuaXNEZWZBbmltYXRlZEluID0gZmFsc2U7XHJcbiAgICAgICAgc2xpZGUuaXNDdXN0b21BbmltYXRlZEluID0gZmFsc2U7XHJcbiAgICAgICAgc2xpZGUuY2xhc3NlcyA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldEN1clNsaWRlQ2xhc3NlcyhzbGlkZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uub25UcmFuc2l0aW9uRW5kKCk7XHJcblx0fTtcclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBPYnNlcnZhYmxlLCBtZXJnZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBDYXJvdXNlbFNlcnZpY2UgfSBmcm9tICcuL2Nhcm91c2VsLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBBdXRvSGVpZ2h0U2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveXtcclxuICAvKipcclxuICAgKiBTdWJzY3Jpb3B0aW9uIHRvIG1lcmdlIE9ic2VydmFibGUgIGZyb20gQ2Fyb3VzZWxTZXJ2aWNlXHJcbiAgICovXHJcbiAgYXV0b0hlaWdodFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2Fyb3VzZWxTZXJ2aWNlOiBDYXJvdXNlbFNlcnZpY2UpIHtcclxuICAgIHRoaXMuc3B5RGF0YVN0cmVhbXMoKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5hdXRvSGVpZ2h0U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIERlZmluZXMgT2JzZXJ2YWJsZXMgd2hpY2ggc2VydmljZSBtdXN0IG9ic2VydmVcclxuICAgKi9cclxuICBzcHlEYXRhU3RyZWFtcygpIHtcclxuICAgIGNvbnN0IGluaXRpYWxpemVkQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRJbml0aWFsaXplZFN0YXRlKCkucGlwZShcclxuICAgICAgdGFwKGRhdGEgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hdXRvSGVpZ2h0KSB7XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmNhcm91c2VsU2VydmljZS5zbGlkZXNEYXRhLmZvckVhY2goc2xpZGUgPT4gc2xpZGUuaGVpZ2h0U3RhdGUgPSAnZnVsbCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgY2hhbmdlZFNldHRpbmdzJDogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0Q2hhbmdlZFN0YXRlKCkucGlwZShcclxuICAgICAgdGFwKGRhdGEgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hdXRvSGVpZ2h0ICYmIGRhdGEucHJvcGVydHkubmFtZSA9PT0gJ3Bvc2l0aW9uJyl7XHJcblx0XHRcdFx0XHR0aGlzLnVwZGF0ZSgpO1xyXG5cdFx0XHRcdH1cclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgcmVmcmVzaGVkQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRSZWZyZXNoZWRTdGF0ZSgpLnBpcGUoXHJcbiAgICAgIHRhcChkYXRhID0+IHtcclxuICAgICAgICBpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b0hlaWdodCkge1xyXG4gICAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IGF1dG9IZWlnaHQkOiBPYnNlcnZhYmxlPHN0cmluZyB8IGFueT4gPSBtZXJnZShpbml0aWFsaXplZENhcm91c2VsJCwgY2hhbmdlZFNldHRpbmdzJCwgcmVmcmVzaGVkQ2Fyb3VzZWwkKTtcclxuICAgIHRoaXMuYXV0b0hlaWdodFN1YnNjcmlwdGlvbiA9IGF1dG9IZWlnaHQkLnN1YnNjcmliZShcclxuICAgICAgKCkgPT4ge31cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGVzIHRoZSBwcm9wICdoZWlnaHRTdGF0ZScgb2Ygc2xpZGVzXHJcbiAgICovXHJcbiAgdXBkYXRlKCkge1xyXG4gICAgY29uc3QgaXRlbXMgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5pdGVtc1xyXG4gICAgbGV0IHN0YXJ0ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuY3VycmVudCgpLFxyXG4gICAgICAgIGVuZCA9IHN0YXJ0ICsgaXRlbXM7XHJcblxyXG4gICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmNlbnRlcikge1xyXG4gICAgICBzdGFydCA9IGl0ZW1zICUgMiA9PT0gMSA/IHN0YXJ0IC0gKGl0ZW1zIC0gMSkgLyAyIDogc3RhcnQgLSBpdGVtcyAvIDI7XHJcbiAgICAgIGVuZCA9IGl0ZW1zICUgMiA9PT0gMSA/IHN0YXJ0ICsgaXRlbXMgOiBzdGFydCArIGl0ZW1zICsgMTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5zbGlkZXNEYXRhLmZvckVhY2goKHNsaWRlLCBpKSA9PiB7XHJcbiAgICAgIHNsaWRlLmhlaWdodFN0YXRlID0gKGkgPj0gc3RhcnQgJiYgaSA8IGVuZCkgPyAnZnVsbCcgOiAnbnVsbGVkJztcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIE9ic2VydmFibGUsIG1lcmdlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IENhcm91c2VsU2VydmljZSB9IGZyb20gJy4vY2Fyb3VzZWwuc2VydmljZSc7XHJcbmltcG9ydCB7IHRhcCwgc2tpcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBIYXNoU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaXB0aW9uIHRvIG1lcmdlIE9ic2VydmFibGUgZnJvbSBDYXJvdXNlbFNlcnZpY2VcclxuICAgKi9cclxuICBoYXNoU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIEN1cnJlbnQgdXJsIGZyYWdtZW50IChoYXNoKVxyXG4gICAqL1xyXG4gIGN1cnJlbnRIYXNoRnJhZ21lbnQ6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjYXJvdXNlbFNlcnZpY2U6IENhcm91c2VsU2VydmljZSxcclxuICAgICAgICAgICAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgICAgICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7XHJcbiAgICB0aGlzLnNweURhdGFTdHJlYW1zKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuaGFzaFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVmaW5lcyBPYnNlcnZhYmxlcyB3aGljaCBzZXJ2aWNlIG11c3Qgb2JzZXJ2ZVxyXG4gICAqL1xyXG4gIHNweURhdGFTdHJlYW1zKCkge1xyXG4gICAgY29uc3QgaW5pdGlhbGl6ZWRDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldEluaXRpYWxpemVkU3RhdGUoKS5waXBlKFxyXG4gICAgICB0YXAoKCkgPT4gdGhpcy5saXN0ZW5Ub1JvdXRlKCkgKVxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBjaGFuZ2VkU2V0dGluZ3MkOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRDaGFuZ2VkU3RhdGUoKS5waXBlKFxyXG4gICAgICB0YXAoZGF0YSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLlVSTGhhc2hMaXN0ZW5lciAmJiBkYXRhLnByb3BlcnR5Lm5hbWUgPT09ICdwb3NpdGlvbicpIHtcclxuICAgICAgICAgIGNvbnN0IG5ld0N1clNsaWRlID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuY3VycmVudCgpO1xyXG4gICAgICAgICAgY29uc3QgbmV3Q3VyRnJhZ21lbnQgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zbGlkZXNEYXRhW25ld0N1clNsaWRlXS5oYXNoRnJhZ21lbnQ7XHJcblxyXG4gICAgICAgICAgaWYgKCFuZXdDdXJGcmFnbWVudCB8fCBuZXdDdXJGcmFnbWVudCA9PT0gdGhpcy5jdXJyZW50SGFzaEZyYWdtZW50KSB7XHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLi8nXSwge2ZyYWdtZW50OiBuZXdDdXJGcmFnbWVudCwgcmVsYXRpdmVUbzogdGhpcy5yb3V0ZX0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgaGFzaEZyYWdtZW50JDogT2JzZXJ2YWJsZTxzdHJpbmcgfCBhbnk+ID0gbWVyZ2UoaW5pdGlhbGl6ZWRDYXJvdXNlbCQsIGNoYW5nZWRTZXR0aW5ncyQpO1xyXG4gICAgdGhpcy5oYXNoU3Vic2NyaXB0aW9uID0gaGFzaEZyYWdtZW50JC5zdWJzY3JpYmUoXHJcbiAgICAgICgpID0+IHt9XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogcmV3aW5kcyBjYXJvdXNlbCB0byBzbGlkZSB3aGljaCBoYXMgdGhlIHNhbWUgaGFzaEZyYWdtZW50IGFzIGZyYWdtZW50IG9mIGN1cnJlbnQgdXJsXHJcbiAgICogQHBhcmFtIGZyYWdtZW50IGZyYWdtZW50IG9mIHVybFxyXG4gICAqL1xyXG4gIHJld2luZChmcmFnbWVudDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNsaWRlc0RhdGEuZmluZEluZGV4KHNsaWRlID0+IHNsaWRlLmhhc2hGcmFnbWVudCA9PT0gZnJhZ21lbnQgJiYgc2xpZGUuaXNDbG9uZWQgPT09IGZhbHNlKTtcclxuXHJcbiAgICBpZiAocG9zaXRpb24gPT09IC0xIHx8IHBvc2l0aW9uID09PSB0aGlzLmNhcm91c2VsU2VydmljZS5jdXJyZW50KCkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuXHRcdHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnRvKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnJlbGF0aXZlKHBvc2l0aW9uKSwgZmFsc2UpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdGlhdGUgbGlzdGVuaW5nIHRvIEFjdGl2YXRlZFJvdXRlLmZyYWdtZW50XHJcbiAgICovXHJcbiAgbGlzdGVuVG9Sb3V0ZSgpIHtcclxuICAgIGNvbnN0IGNvdW50ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3Muc3RhcnRQb3NpdGlvbiA9PT0gJ1VSTEhhc2gnID8gMCA6IDI7XHJcbiAgICB0aGlzLnJvdXRlLmZyYWdtZW50LnBpcGUoXHJcbiAgICAgICAgc2tpcChjb3VudClcclxuICAgICAgKVxyXG4gICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgIGZyYWdtZW50ID0+IHtcclxuICAgICAgICAgIHRoaXMuY3VycmVudEhhc2hGcmFnbWVudCA9IGZyYWdtZW50O1xyXG4gICAgICAgICAgdGhpcy5yZXdpbmQoZnJhZ21lbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgKVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBPbkluaXQsXHJcbiAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIERpcmVjdGl2ZSxcclxuICBRdWVyeUxpc3QsXHJcbiAgQ29udGVudENoaWxkcmVuLFxyXG4gIFRlbXBsYXRlUmVmLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgQWZ0ZXJDb250ZW50SW5pdCxcclxuICBFdmVudEVtaXR0ZXJcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgT2JzZXJ2YWJsZSwgbWVyZ2UgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IFJlc2l6ZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9yZXNpemUuc2VydmljZSc7XHJcbmltcG9ydCB7IHRhcCwgZGVsYXksIGZpbHRlciwgc3dpdGNoTWFwLCBmaXJzdCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgQ2Fyb3VzZWxTZXJ2aWNlLCBDYXJvdXNlbEN1cnJlbnREYXRhIH0gZnJvbSAnLi4vc2VydmljZXMvY2Fyb3VzZWwuc2VydmljZSc7XHJcbmltcG9ydCB7IFN0YWdlRGF0YSB9IGZyb20gXCIuLi9tb2RlbHMvc3RhZ2UtZGF0YS5tb2RlbFwiO1xyXG5pbXBvcnQgeyBPd2xET01EYXRhIH0gZnJvbSBcIi4uL21vZGVscy9vd2xET00tZGF0YS5tb2RlbFwiO1xyXG5pbXBvcnQgeyBTbGlkZU1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL3NsaWRlLm1vZGVsJztcclxuaW1wb3J0IHsgT3dsT3B0aW9ucyB9IGZyb20gJy4uL21vZGVscy9vd2wtb3B0aW9ucy5tb2RlbCc7XHJcbmltcG9ydCB7IE5hdkRhdGEsIERvdHNEYXRhIH0gZnJvbSAnLi4vbW9kZWxzL25hdmlnYXRpb24tZGF0YS5tb2RlbHMnO1xyXG5pbXBvcnQgeyBOYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25hdmlnYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IEF1dG9wbGF5U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2F1dG9wbGF5LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBMYXp5TG9hZFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9sYXp5bG9hZC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQW5pbWF0ZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9hbmltYXRlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBdXRvSGVpZ2h0U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2F1dG9oZWlnaHQuc2VydmljZSc7XHJcbmltcG9ydCB7IEhhc2hTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvaGFzaC5zZXJ2aWNlJztcclxuXHJcbmxldCBuZXh0SWQgPSAwO1xyXG5cclxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnbmctdGVtcGxhdGVbY2Fyb3VzZWxTbGlkZV0nIH0pXHJcbmV4cG9ydCBjbGFzcyBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlIHtcclxuICAvKipcclxuICAgKiBVbmlxdWUgc2xpZGUgaWRlbnRpZmllci4gTXVzdCBiZSB1bmlxdWUgZm9yIHRoZSBlbnRpcmUgZG9jdW1lbnQgZm9yIHByb3BlciBhY2Nlc3NpYmlsaXR5IHN1cHBvcnQuXHJcbiAgICogV2lsbCBiZSBhdXRvLWdlbmVyYXRlZCBpZiBub3QgcHJvdmlkZWQuXHJcbiAgICovXHJcbiAgQElucHV0KCkgaWQgPSBgb3dsLXNsaWRlLSR7bmV4dElkKyt9YDtcclxuXHJcbiAgLyoqXHJcbiAgICogRGVmaW5lcyBob3cgbXVjaCB3aWR0aHMgb2YgY29tbW9uIHNsaWRlIHdpbGwgY3VycmVudCBzbGlkZSBoYXZlXHJcbiAgICogZS5nLiBpZiBfbWVyZ2VEYXRhPTIsIHRoZSBzbGlkZSB3aWxsIHR3aWNlIHdpZGVyIHRoZW4gc2xpZGVzIHdpdGggX21lcmdlRGF0YT0xXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZGF0YU1lcmdlID0gMTtcclxuICBASW5wdXQoKVxyXG4gIHNldCBkYXRhTWVyZ2UoZGF0YTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLl9kYXRhTWVyZ2UgPSB0aGlzLmlzTnVtZXJpYyhkYXRhKSA/IGRhdGEgOiAxO1xyXG4gIH07XHJcbiAgZ2V0IGRhdGFNZXJnZSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fZGF0YU1lcmdlIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2lkdGggb2Ygc2xpZGVcclxuICAgKi9cclxuICBASW5wdXQoKSB3aWR0aCA9IDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIElubmVyIGNvbnRlbnQgb2YgZG90IGZvciBjZXJ0YWluIHNsaWRlOyBjYW4gYmUgaHRtbC1tYXJrdXBcclxuICAgKi9cclxuICBASW5wdXQoKSBkb3RDb250ZW50ID0gJyc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhc2ggKGZyYWdtZW50KSBvZiB1cmwgd2hpY2ggY29ycmVzcG9uZHMgdG8gY2VydGFpbiBzbGlkZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRhdGFIYXNoID0gJyc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0cGxSZWY6IFRlbXBsYXRlUmVmPGFueT4pIHt9XHJcblxyXG4gIC8qKlxyXG5cdCAqIERldGVybWluZXMgaWYgdGhlIGlucHV0IGlzIGEgTnVtYmVyIG9yIHNvbWV0aGluZyB0aGF0IGNhbiBiZSBjb2VyY2VkIHRvIGEgTnVtYmVyXHJcblx0ICogQHBhcmFtIC0gVGhlIGlucHV0IHRvIGJlIHRlc3RlZFxyXG5cdCAqIEByZXR1cm5zIC0gQW4gaW5kaWNhdGlvbiBpZiB0aGUgaW5wdXQgaXMgYSBOdW1iZXIgb3IgY2FuIGJlIGNvZXJjZWQgdG8gYSBOdW1iZXJcclxuXHQgKi9cclxuICBpc051bWVyaWMobnVtYmVyOiBhbnkpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiAhaXNOYU4ocGFyc2VGbG9hdChudW1iZXIpKTtcclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEYXRhIHdoaWNoIHdpbGwgYmUgcGFzc2VkIG91dCBhZnRlciBlbmRpbmcgb2YgdHJhbnNpdGlvbiBvZiBjYXJvdXNlbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNsaWRlc091dHB1dERhdGEge1xyXG4gIHN0YXJ0UG9zaXRpb24/OiBudW1iZXI7XHJcbiAgc2xpZGVzPzogU2xpZGVNb2RlbFtdO1xyXG59O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdvd2wtY2Fyb3VzZWwtbycsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgY2xhc3M9XCJvd2wtY2Fyb3VzZWwgb3dsLXRoZW1lXCIgI293bENhcm91c2VsXHJcbiAgICAgIFtuZ0NsYXNzXT1cInsnb3dsLXJ0bCc6IG93bERPTURhdGE/LnJ0bCxcclxuICAgICAgICAgICAgICAgICAgJ293bC1sb2FkZWQnOiBvd2xET01EYXRhPy5pc0xvYWRlZCxcclxuICAgICAgICAgICAgICAgICAgJ293bC1yZXNwb25zaXZlJzogb3dsRE9NRGF0YT8uaXNSZXNwb25zaXZlLFxyXG4gICAgICAgICAgICAgICAgICAnb3dsLWRyYWcnOiBvd2xET01EYXRhPy5pc01vdXNlRHJhZ2FibGUsXHJcbiAgICAgICAgICAgICAgICAgICdvd2wtZ3JhYic6IG93bERPTURhdGE/LmlzR3JhYn1cIlxyXG4gICAgICAobW91c2VvdmVyKT1cInN0YXJ0UGF1c2luZygpXCJcclxuICAgICAgKG1vdXNlbGVhdmUpPVwic3RhcnRQbGF5TUwoKVwiXHJcbiAgICAgICh0b3VjaHN0YXJ0KT1cInN0YXJ0UGF1c2luZygpXCJcclxuICAgICAgKHRvdWNoZW5kKT1cInN0YXJ0UGxheVRFKClcIj5cclxuXHJcbiAgICAgIDxkaXYgKm5nSWY9XCJjYXJvdXNlbExvYWRlZFwiIGNsYXNzPVwib3dsLXN0YWdlLW91dGVyXCI+XHJcbiAgICAgICAgPG93bC1zdGFnZSBbb3dsRHJhZ2dhYmxlXT1cInsnaXNNb3VzZURyYWdhYmxlJzogb3dsRE9NRGF0YT8uaXNNb3VzZURyYWdhYmxlLCAnaXNUb3VjaERyYWdhYmxlJzogb3dsRE9NRGF0YT8uaXNUb3VjaERyYWdhYmxlfVwiXHJcbiAgICAgICAgICAgICAgICAgICAgW3N0YWdlRGF0YV09XCJzdGFnZURhdGFcIlxyXG4gICAgICAgICAgICAgICAgICAgIFtzbGlkZXNEYXRhXT1cInNsaWRlc0RhdGFcIj48L293bC1zdGFnZT5cclxuICAgICAgPC9kaXY+IDwhLS0gLy5vd2wtc3RhZ2Utb3V0ZXIgLS0+XHJcbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJzbGlkZXMudG9BcnJheSgpLmxlbmd0aFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJvd2wtbmF2XCIgW25nQ2xhc3NdPVwieydkaXNhYmxlZCc6IG5hdkRhdGE/LmRpc2FibGVkfVwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm93bC1wcmV2XCIgW25nQ2xhc3NdPVwieydkaXNhYmxlZCc6IG5hdkRhdGE/LnByZXY/LmRpc2FibGVkfVwiIChjbGljayk9XCJwcmV2KClcIiBbaW5uZXJIVE1MXT1cIm5hdkRhdGE/LnByZXY/Lmh0bWxUZXh0XCI+PC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwib3dsLW5leHRcIiBbbmdDbGFzc109XCJ7J2Rpc2FibGVkJzogbmF2RGF0YT8ubmV4dD8uZGlzYWJsZWR9XCIgKGNsaWNrKT1cIm5leHQoKVwiIFtpbm5lckhUTUxdPVwibmF2RGF0YT8ubmV4dD8uaHRtbFRleHRcIj48L2Rpdj5cclxuICAgICAgICA8L2Rpdj4gPCEtLSAvLm93bC1uYXYgLS0+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm93bC1kb3RzXCIgW25nQ2xhc3NdPVwieydkaXNhYmxlZCc6IGRvdHNEYXRhPy5kaXNhYmxlZH1cIj5cclxuICAgICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGRvdCBvZiBkb3RzRGF0YT8uZG90c1wiIGNsYXNzPVwib3dsLWRvdFwiIFtuZ0NsYXNzXT1cInsnYWN0aXZlJzogZG90LmFjdGl2ZSwgJ293bC1kb3QtdGV4dCc6IGRvdC5zaG93SW5uZXJDb250ZW50fVwiIChjbGljayk9XCJtb3ZlQnlEb3QoZG90LmlkKVwiPlxyXG4gICAgICAgICAgICA8c3BhbiBbaW5uZXJIVE1MXT1cImRvdC5pbm5lckNvbnRlbnRcIj48L3NwYW4+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj4gPCEtLSAvLm93bC1kb3RzIC0tPlxyXG4gICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgIDwvZGl2PiA8IS0tIC8ub3dsLWNhcm91c2VsIG93bC1sb2FkZWQgLS0+XHJcbiAgYCxcclxuICBzdHlsZXM6IFtgLm93bC10aGVtZSB7IGRpc3BsYXk6IGJsb2NrOyB9YF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBOYXZpZ2F0aW9uU2VydmljZSxcclxuICAgIEF1dG9wbGF5U2VydmljZSxcclxuICAgIENhcm91c2VsU2VydmljZSxcclxuICAgIExhenlMb2FkU2VydmljZSxcclxuICAgIEFuaW1hdGVTZXJ2aWNlLFxyXG4gICAgQXV0b0hlaWdodFNlcnZpY2UsXHJcbiAgICBIYXNoU2VydmljZVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIENhcm91c2VsQ29tcG9uZW50XHJcbiAgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudENoZWNrZWQsIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XHJcbiAgQENvbnRlbnRDaGlsZHJlbihDYXJvdXNlbFNsaWRlRGlyZWN0aXZlKVxyXG4gIHNsaWRlczogUXVlcnlMaXN0PENhcm91c2VsU2xpZGVEaXJlY3RpdmU+O1xyXG5cclxuICBAT3V0cHV0KCkgdHJhbnNsYXRlZCA9IG5ldyBFdmVudEVtaXR0ZXI8U2xpZGVzT3V0cHV0RGF0YT4oKTtcclxuICBAT3V0cHV0KCkgZHJhZ2dpbmcgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdpZHRoIG9mIGNhcm91c2VsIHdpbmRvdyAodGFnIHdpdGggY2xhc3MgLm93bC1jYXJvdXNlbCksIGluIHdpY2ggd2UgY2FuIHNlZSBtb3Zpbmcgc2xpZGVyc1xyXG4gICAqL1xyXG4gIGNhcm91c2VsV2luZG93V2lkdGg6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaXB0aW9uIHRvICdyZXNpemUnIGV2ZW50XHJcbiAgICovXHJcbiAgcmVzaXplU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlwdGlvbiBtZXJnZSBPYnNlcnZhYmxlLCB3aGljaCBtZXJnZXMgYWxsIE9ic2VydmFibGVzIGluIHRoZSBjb21wb25lbnQgZXhjZXB0ICdyZXNpemUnIE9ic2VydmFibGVcclxuICAgKi9cclxuICBwcml2YXRlIF9hbGxPYnNlcnZTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ3VycmVudCBzZXR0aW5ncyBmb3IgdGhlIGNhcm91c2VsLlxyXG4gICAqL1xyXG4gIG93bERPTURhdGE6IE93bERPTURhdGE7XHJcblxyXG4gIC8qKlxyXG4gICAqIERhdGEgb2Ygb3dsLXN0YWdlXHJcbiAgICovXHJcblx0c3RhZ2VEYXRhOiBTdGFnZURhdGE7XHJcblxyXG5cdC8qKlxyXG5cdCAqICBEYXRhIG9mIGV2ZXJ5IHNsaWRlXHJcblx0ICovXHJcbiAgc2xpZGVzRGF0YTogU2xpZGVNb2RlbFtdO1xyXG5cclxuICAvKipcclxuXHQgKiBEYXRhIG9mIG5hdmlnYXRpb24gYmxvY2tcclxuXHQgKi9cclxuXHRuYXZEYXRhOiBOYXZEYXRhO1xyXG5cclxuXHQvKipcclxuXHQgKiBEYXRhIG9mIGRvdHMgYmxvY2tcclxuXHQgKi9cclxuICBkb3RzRGF0YTogRG90c0RhdGE7XHJcblxyXG4gIC8qKlxyXG4gICAqIERhdGEsIHdpY2ggYXJlIHBhc3NlZCBvdXQgb2YgY2Fyb3VzZWwgYWZ0ZXIgZW5kaW5nIG9mIHRyYW5zaW9uaW5nIG9mIGNhcm91c2VsXHJcbiAgICovXHJcbiAgc2xpZGVzT3V0cHV0RGF0YTogU2xpZGVzT3V0cHV0RGF0YTtcclxuXHJcbiAgLyoqXHJcbiAgICogU2hvd3Mgd2hldGhlciBjYXJvdXNlbCBpcyBsb2FkZWQgb2Ygbm90LlxyXG4gICAqL1xyXG4gIGNhcm91c2VsTG9hZGVkID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZXIncyBvcHRpb25zXHJcbiAgICovXHJcbiAgQElucHV0KCkgb3B0aW9uczogT3dsT3B0aW9ucztcclxuXHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2YWJsZSBmb3IgZ2V0dGluZyBjdXJyZW50IFZpZXcgU2V0dGluZ3NcclxuICAgKi9cclxuICBwcml2YXRlIF92aWV3Q3VyU2V0dGluZ3MkOiBPYnNlcnZhYmxlPENhcm91c2VsQ3VycmVudERhdGE+O1xyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZhYmxlIGZvciBjYXRjaGluZyB0aGUgZW5kIG9mIHRyYW5zaXRpb24gb2YgY2Fyb3VzZWxcclxuICAgKi9cclxuICBwcml2YXRlIF90cmFuc2xhdGVkQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz47XHJcblxyXG4gIC8qKlxyXG4gICAqIE9ic2VydmFibGUgZm9yIGNhdGNoaW5nIHRoZSBzdGFydCBvZiBkcmFnZ2luZyBvZiB0aGUgY2Fyb3VzZWxcclxuICAgKi9cclxuICBwcml2YXRlIF9kcmFnZ2luZ0Nhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+O1xyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZhYmxlIGZvciBtZXJnaW5nIGFsbCBPYnNlcnZhYmxlcyBhbmQgY3JlYXRpbmcgb25lIHN1YnNjcmlwdGlvblxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2Nhcm91c2VsTWVyZ2UkOiBPYnNlcnZhYmxlPENhcm91c2VsQ3VycmVudERhdGEgfCBzdHJpbmc+O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXHJcbiAgICBwcml2YXRlIHJlc2l6ZVNlcnZpY2U6IFJlc2l6ZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNhcm91c2VsU2VydmljZTogQ2Fyb3VzZWxTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBuYXZpZ2F0aW9uU2VydmljZTogTmF2aWdhdGlvblNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGF1dG9wbGF5U2VydmljZTogQXV0b3BsYXlTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBsYXp5TG9hZFNlcnZpY2U6IExhenlMb2FkU2VydmljZSxcclxuICAgIHByaXZhdGUgYW5pbWF0ZVNlcnZpY2U6IEFuaW1hdGVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBhdXRvSGVpZ2h0U2VydmljZTogQXV0b0hlaWdodFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGhhc2hTZXJ2aWNlOiBIYXNoU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnNweURhdGFTdHJlYW1zKCk7XHJcblxyXG4gICAgdGhpcy5jYXJvdXNlbFdpbmRvd1dpZHRoID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgICcub3dsLWNhcm91c2VsJ1xyXG4gICAgKS5jbGllbnRXaWR0aDtcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcclxuICB9XHJcbiAgLy8gbmdBZnRlckNvbnRlbnRDaGVja2VkKCkgRU5EXHJcblxyXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcclxuICAgIGlmICh0aGlzLnNsaWRlcy50b0FycmF5KCkubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHVwKHRoaXMuY2Fyb3VzZWxXaW5kb3dXaWR0aCwgdGhpcy5zbGlkZXMudG9BcnJheSgpLCB0aGlzLm9wdGlvbnMpO1xyXG4gICAgICB0aGlzLmNhcm91c2VsU2VydmljZS5pbml0aWFsaXplKHRoaXMuc2xpZGVzLnRvQXJyYXkoKSk7XHJcblxyXG4gICAgICB0aGlzLl93aW5SZXNpemVXYXRjaGVyKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhgVGhlcmUncyBubyBzbGlkZXMgdG8gc2hvdy4gU28gY2Fyb3VzZWwgZGlkbid0IGdldCByZW5kZXJlZGApO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgaWYgKHRoaXMucmVzaXplU3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgIHRoaXMucmVzaXplU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fYWxsT2JzZXJ2U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBKb2lucyB0aGUgb2JzZXJ2YWJsZSBsb2dpbiBpbiBvbmUgcGxhY2U6IHNldHMgdmFsdWVzIHRvIHNvbWUgb2JzZXJ2YWJsZXMsIG1lcmdlcyB0aGlzIG9ic2VydmFibGVzIGFuZFxyXG4gICAqIHN1YmNyaWJlcyB0byBtZXJnZSBmdW5jXHJcbiAgICovXHJcbiAgc3B5RGF0YVN0cmVhbXMoKSB7XHJcbiAgICB0aGlzLl92aWV3Q3VyU2V0dGluZ3MkID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0Vmlld0N1clNldHRpbmdzKCkucGlwZShcclxuICAgICAgdGFwKGRhdGEgPT4ge1xyXG4gICAgICAgIHRoaXMub3dsRE9NRGF0YSA9IGRhdGEub3dsRE9NRGF0YTtcclxuICAgICAgICB0aGlzLnN0YWdlRGF0YSA9IGRhdGEuc3RhZ2VEYXRhO1xyXG4gICAgICAgIHRoaXMuc2xpZGVzRGF0YSA9IGRhdGEuc2xpZGVzRGF0YTtcclxuICAgICAgICBpZiAoIXRoaXMuY2Fyb3VzZWxMb2FkZWQpIHtcclxuICAgICAgICAgIHRoaXMuY2Fyb3VzZWxMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5hdkRhdGEgPSBkYXRhLm5hdkRhdGE7XHJcbiAgICAgICAgdGhpcy5kb3RzRGF0YSA9IGRhdGEuZG90c0RhdGE7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuX3RyYW5zbGF0ZWRDYXJvdXNlbCQgPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRUcmFuc2xhdGVkU3RhdGUoKS5waXBlKFxyXG4gICAgICB0YXAoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZ2F0aGVyVHJhbnNsYXRlZERhdGEoKTtcclxuICAgICAgICB0aGlzLnRyYW5zbGF0ZWQuZW1pdCh0aGlzLnNsaWRlc091dHB1dERhdGEpO1xyXG4gICAgICAgIHRoaXMuc2xpZGVzT3V0cHV0RGF0YSA9IHt9O1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLl9kcmFnZ2luZ0Nhcm91c2VsJCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldERyYWdTdGF0ZSgpLnBpcGUoXHJcbiAgICAgIHRhcCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5kcmFnZ2luZy5lbWl0KHRydWUpO1xyXG4gICAgICB9KSxcclxuICAgICAgc3dpdGNoTWFwKFxyXG4gICAgICAgICgpID0+IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldFRyYW5zbGF0ZWRTdGF0ZSgpLnBpcGUoXHJcbiAgICAgICAgICBmaXJzdCgpLFxyXG4gICAgICAgICAgdGFwKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5kcmFnZ2luZy5lbWl0KGZhbHNlKTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgKVxyXG4gICAgICApXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuX2Nhcm91c2VsTWVyZ2UkID0gbWVyZ2UodGhpcy5fdmlld0N1clNldHRpbmdzJCwgdGhpcy5fdHJhbnNsYXRlZENhcm91c2VsJCwgdGhpcy5fZHJhZ2dpbmdDYXJvdXNlbCQpO1xyXG4gICAgdGhpcy5fYWxsT2JzZXJ2U3Vic2NyaXB0aW9uID0gdGhpcy5fY2Fyb3VzZWxNZXJnZSQuc3Vic2NyaWJlKCgpID0+IHt9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXQgc3Vic2NyaXB0aW9uIHRvIHJlc2l6ZSBldmVudCBhbmQgYXR0YWNoZXMgaGFuZGxlciBmb3IgdGhpcyBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3dpblJlc2l6ZVdhdGNoZXIoKSB7XHJcbiAgICBpZiAoT2JqZWN0LmtleXModGhpcy5jYXJvdXNlbFNlcnZpY2UuX29wdGlvbnMucmVzcG9uc2l2ZSkubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMucmVzaXplU3Vic2NyaXB0aW9uID0gdGhpcy5yZXNpemVTZXJ2aWNlLm9uUmVzaXplJFxyXG4gICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgZmlsdGVyKCgpID0+IHRoaXMuY2Fyb3VzZWxXaW5kb3dXaWR0aCAhPT0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vd2wtY2Fyb3VzZWwnKS5jbGllbnRXaWR0aCksXHJcbiAgICAgICAgICBkZWxheSh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5yZXNwb25zaXZlUmVmcmVzaFJhdGUpXHJcbiAgICAgICAgKVxyXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uub25SZXNpemUodGhpcy5lbC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vd2wtY2Fyb3VzZWwnKS5jbGllbnRXaWR0aCk7XHJcbiAgICAgICAgICB0aGlzLmNhcm91c2VsV2luZG93V2lkdGggPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLm93bC1jYXJvdXNlbCcpLmNsaWVudFdpZHRoO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlciBmb3IgdHJhbnNpdGlvZW5kIGV2ZW50XHJcbiAgICovXHJcbiAgb25UcmFuc2l0aW9uRW5kKCkge1xyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uub25UcmFuc2l0aW9uRW5kKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGVyIGZvciBjbGljayBldmVudCwgYXR0YWNoZWQgdG8gbmV4dCBidXR0b25cclxuICAgKi9cclxuICBuZXh0KCkge1xyXG4gICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5uZXh0KHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLm5hdlNwZWVkKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhbmRsZXIgZm9yIGNsaWNrIGV2ZW50LCBhdHRhY2hlZCB0byBwcmV2IGJ1dHRvblxyXG4gICAqL1xyXG4gIHByZXYoKSB7XHJcbiAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLnByZXYodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MubmF2U3BlZWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlciBmb3IgY2xpY2sgZXZlbnQsIGF0dGFjaGVkIHRvIGRvdHNcclxuICAgKi9cclxuICBtb3ZlQnlEb3QoZG90SWQ6IHN0cmluZykge1xyXG4gICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5tb3ZlQnlEb3QoZG90SWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogcmV3aW5kcyBjYXJvdXNlbCB0byBzbGlkZSB3aXRoIG5lZWRlZCBpZFxyXG4gICAqIEBwYXJhbSBpZCBmcmFnbWVudCBvZiB1cmxcclxuICAgKi9cclxuICB0byhpZDogc3RyaW5nKSB7XHJcbiAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLnRvU2xpZGVCeUlkKGlkKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdhdGhlcnMgYW5kIHByZXBhcmVzIGRhdGEgaW50ZW5kZWQgZm9yIHBhc3NpbmcgdG8gdGhlIHVzZXIgYnkgbWVhbnMgb2YgZmlyaW5nIGV2ZW50IHRyYW5zbGF0ZWRDYXJvdXNlbFxyXG4gICAqL1xyXG4gIGdhdGhlclRyYW5zbGF0ZWREYXRhKCkge1xyXG4gICAgbGV0IHN0YXJ0UG9zaXRpb246IG51bWJlcjtcclxuICAgIGNvbnN0IGNsb25lZElkUHJlZml4ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuY2xvbmVkSWRQcmVmaXg7XHJcbiAgICBjb25zdCBhY3RpdmVTbGlkZXM6IFNsaWRlTW9kZWxbXSA9IHRoaXMuc2xpZGVzRGF0YVxyXG4gICAgICAuZmlsdGVyKHNsaWRlID0+IHNsaWRlLmlzQWN0aXZlID09PSB0cnVlKVxyXG4gICAgICAubWFwKHNsaWRlID0+IHtcclxuICAgICAgICBjb25zdCBpZCA9IHNsaWRlLmlkLmluZGV4T2YoY2xvbmVkSWRQcmVmaXgpID49IDAgPyBzbGlkZS5pZC5zbGljZShjbG9uZWRJZFByZWZpeC5sZW5ndGgpIDogc2xpZGUuaWQ7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIGlkOiBpZCxcclxuICAgICAgICAgIHdpZHRoOiBzbGlkZS53aWR0aCxcclxuICAgICAgICAgIG1hcmdpbkw6IHNsaWRlLm1hcmdpbkwsXHJcbiAgICAgICAgICBtYXJnaW5SOiBzbGlkZS5tYXJnaW5SLFxyXG4gICAgICAgICAgY2VudGVyOiBzbGlkZS5pc0NlbnRlcmVkXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIHN0YXJ0UG9zaXRpb24gPSB0aGlzLmNhcm91c2VsU2VydmljZS5yZWxhdGl2ZSh0aGlzLmNhcm91c2VsU2VydmljZS5jdXJyZW50KCkpO1xyXG4gICAgdGhpcy5zbGlkZXNPdXRwdXREYXRhID0ge1xyXG4gICAgICBzdGFydFBvc2l0aW9uOiBzdGFydFBvc2l0aW9uLFxyXG4gICAgICBzbGlkZXM6IGFjdGl2ZVNsaWRlc1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnRzIHBhdXNpbmdcclxuICAgKi9cclxuICBzdGFydFBhdXNpbmcoKSB7XHJcbiAgICB0aGlzLmF1dG9wbGF5U2VydmljZS5zdGFydFBhdXNpbmcoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0YXJ0cyBwbGF5aW5nIGFmdGVyIG1vdXNlIGxlYXZlcyBjYXJvdXNlbFxyXG4gICAqL1xyXG4gIHN0YXJ0UGxheU1MKCkge1xyXG4gICAgdGhpcy5hdXRvcGxheVNlcnZpY2Uuc3RhcnRQbGF5aW5nTW91c2VMZWF2ZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnRzIHBsYXlpbmcgYWZ0ZXIgdG91Y2ggZW5kc1xyXG4gICAqL1xyXG4gIHN0YXJ0UGxheVRFKCkge1xyXG4gICAgdGhpcy5hdXRvcGxheVNlcnZpY2Uuc3RhcnRQbGF5aW5nVG91Y2hFbmQoKTtcclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgTmdab25lLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIFJlbmRlcmVyMiwgT25Jbml0LCBPbkRlc3Ryb3ksIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENhcm91c2VsU2VydmljZSwgQ29vcmRzIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvY2Fyb3VzZWwuc2VydmljZSc7XHJcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBmaXJzdCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgU3RhZ2VEYXRhIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3N0YWdlLWRhdGEubW9kZWwnO1xyXG5pbXBvcnQgeyBTbGlkZU1vZGVsIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3NsaWRlLm1vZGVsJztcclxuaW1wb3J0IHsgQW5pbWF0ZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hbmltYXRlLnNlcnZpY2UnO1xyXG5pbXBvcnQge1xyXG4gIHRyaWdnZXIsXHJcbiAgc3RhdGUsXHJcbiAgc3R5bGUsXHJcbiAgYW5pbWF0ZSxcclxuICB0cmFuc2l0aW9uXHJcbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnb3dsLXN0YWdlJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cIm93bC1zdGFnZVwiIFtuZ1N0eWxlXT1cInsnd2lkdGgnOiBzdGFnZURhdGEud2lkdGggKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3RyYW5zZm9ybSc6IHN0YWdlRGF0YS50cmFuc2Zvcm0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndHJhbnNpdGlvbic6IHN0YWdlRGF0YS50cmFuc2l0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3BhZGRpbmctbGVmdCc6IHN0YWdlRGF0YS5wYWRkaW5nTCArICdweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncGFkZGluZy1yaWdodCc6IHN0YWdlRGF0YS5wYWRkaW5nUiArICdweCcgfVwiXHJcbiAgICAgICAgICAodHJhbnNpdGlvbmVuZCk9XCJvblRyYW5zaXRpb25FbmQoKVwiPlxyXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IHNsaWRlIG9mIHNsaWRlc0RhdGE7IGxldCBpID0gaW5kZXhcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJvd2wtaXRlbVwiIFtuZ0NsYXNzXT1cInNsaWRlLmNsYXNzZXNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cInsnd2lkdGgnOiBzbGlkZS53aWR0aCArICdweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ21hcmdpbi1sZWZ0Jzogc2xpZGUubWFyZ2luTCArICdweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ21hcmdpbi1yaWdodCc6IHNsaWRlLm1hcmdpblIgKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdsZWZ0Jzogc2xpZGUubGVmdH1cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChhbmltYXRpb25lbmQpPVwiY2xlYXIoc2xpZGUuaWQpXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbQGF1dG9IZWlnaHRdPVwic2xpZGUuaGVpZ2h0U3RhdGVcIj5cclxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ0lmPVwic2xpZGUubG9hZFwiIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInNsaWRlLnRwbFJlZlwiPjwvbmctdGVtcGxhdGU+XHJcbiAgICAgICAgICA8L2Rpdj48IS0tIC8ub3dsLWl0ZW0gLS0+XHJcbiAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgIDwvZGl2PjwhLS0gLy5vd2wtc3RhZ2UgLS0+XHJcbiAgICA8L2Rpdj5cclxuICBgLFxyXG4gIGFuaW1hdGlvbnM6IFtcclxuICAgIHRyaWdnZXIoJ2F1dG9IZWlnaHQnLCBbXHJcbiAgICAgIHN0YXRlKCdudWxsZWQnLCBzdHlsZSh7aGVpZ2h0OiAwfSkpLFxyXG4gICAgICBzdGF0ZSgnZnVsbCcsIHN0eWxlKHtoZWlnaHQ6ICcqJ30pKSxcclxuICAgICAgdHJhbnNpdGlvbignZnVsbCA9PiBudWxsZWQnLCBbXHJcbiAgICAgICAgLy8gc3R5bGUoe2hlaWdodDogJyonfSksXHJcbiAgICAgICAgYW5pbWF0ZSgnNzAwbXMgMzUwbXMnKVxyXG4gICAgICBdKSxcclxuICAgICAgdHJhbnNpdGlvbignbnVsbGVkID0+IGZ1bGwnLCBbXHJcbiAgICAgICAgLy8gc3R5bGUoe2hlaWdodDogMH0pLFxyXG4gICAgICAgIGFuaW1hdGUoMzUwKVxyXG4gICAgICBdKSxcclxuICAgIF0pXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU3RhZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgLyoqXHJcbiAgICogT2JqZWN0IHdpdGggc2V0dGluZ3Mgd2hpY2ggbWFrZSBjYXJvdXNlbCBkcmFnZ2FibGUgYnkgdG91Y2ggb3IgbW91c2VcclxuICAgKi9cclxuICBASW5wdXQoKSBvd2xEcmFnZ2FibGU6IHtcclxuICAgIGlzTW91c2VEcmFnYWJsZTogYm9vbGVhbixcclxuICAgIGlzVG91Y2hEcmFnYWJsZTogYm9vbGVhblxyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIERhdGEgb2Ygb3dsLXN0YWdlXHJcbiAgICovXHJcbiAgQElucHV0KCkgc3RhZ2VEYXRhOiBTdGFnZURhdGE7XHJcblxyXG5cdC8qKlxyXG5cdCAqICBEYXRhIG9mIGV2ZXJ5IHNsaWRlXHJcblx0ICovXHJcbiAgQElucHV0KCkgc2xpZGVzRGF0YTogU2xpZGVNb2RlbFtdO1xyXG5cclxuICAvKipcclxuICAgKiBGdW5jdGlvbiB3aWNoIHdpbGwgYmUgcmV0dXJuZWQgYWZ0ZXIgYXR0YWNoaW5nIGxpc3RlbmVyIHRvICdtb3VzZW1vdmUnIGV2ZW50XHJcbiAgICovXHJcbiAgbGlzdGVuZXJNb3VzZU1vdmU6ICgpID0+IHZvaWQ7XHJcbiAgLyoqXHJcbiAgICogRnVuY3Rpb24gd2ljaCB3aWxsIGJlIHJldHVybmVkIGFmdGVyIGF0dGFjaGluZyBsaXN0ZW5lciB0byAndG91Y2htb3ZlJyBldmVudFxyXG4gICAqL1xyXG4gIGxpc3RlbmVyVG91Y2hNb3ZlOiAoKSA9PiB2b2lkO1xyXG4gIC8qKlxyXG4gICAqIEZ1bmN0aW9uIHdpY2ggd2lsbCBiZSByZXR1cm5lZCBhZnRlciBhdHRhY2hpbmcgbGlzdGVuZXIgdG8gJ21vdXNlbW92ZScgZXZlbnRcclxuICAgKi9cclxuICBsaXN0ZW5lck9uZU1vdXNlTW92ZTogKCkgPT4gdm9pZDtcclxuICAvKipcclxuICAgKiBGdW5jdGlvbiB3aWNoIHdpbGwgYmUgcmV0dXJuZWQgYWZ0ZXIgYXR0YWNoaW5nIGxpc3RlbmVyIHRvICd0b3VjaG1vdmUnIGV2ZW50XHJcbiAgICovXHJcbiAgbGlzdGVuZXJPbmVUb3VjaE1vdmU6ICgpID0+IHZvaWQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIEZ1bmN0aW9uIHdpY2ggd2lsbCBiZSByZXR1cm5lZCBhZnRlciBhdHRhY2hpbmcgbGlzdGVuZXIgdG8gJ21vdXNldXAnIGV2ZW50XHJcbiAgICovXHJcbiAgbGlzdGVuZXJNb3VzZVVwOiAoKSA9PiB2b2lkO1xyXG4gIC8qKlxyXG4gICAqIEZ1bmN0aW9uIHdpY2ggd2lsbCBiZSByZXR1cm5lZCBhZnRlciBhdHRhY2hpbmcgbGlzdGVuZXIgdG8gJ3RvdWNoZW5kJyBldmVudFxyXG4gICAqL1xyXG4gIGxpc3RlbmVyVG91Y2hFbmQ6ICgpID0+IHZvaWQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIEZ1bmN0aW9uIHdpY2ggd2lsbCBiZSByZXR1cm5lZCBhZnRlciBhdHRhY2hpbmcgbGlzdGVuZXIgdG8gJ2NsaWNrJyBldmVudFxyXG4gICAqL1xyXG4gIGxpc3RlbmVyT25lQ2xpY2s6ICgpID0+IHZvaWQ7XHJcblxyXG4gIGxpc3RlbmVyQVRhZzogKCkgPT4gdm9pZDtcclxuXHJcbiAgLyoqXHJcbiAgICogT2JqZWN0IHdpdGggZGF0YSBuZWVkZWQgZm9yIGRyYWdnaW5nXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZHJhZzogYW55ID0ge1xyXG4gICAgdGltZTogbnVsbCxcclxuICAgIHRhcmdldDogbnVsbCxcclxuICAgIHBvaW50ZXI6IG51bGwsXHJcbiAgICBzdGFnZToge1xyXG4gICAgICBzdGFydDogbnVsbCxcclxuICAgICAgY3VycmVudDogbnVsbFxyXG4gICAgfSxcclxuICAgIGRpcmVjdGlvbjogbnVsbCxcclxuICAgIGFjdGl2ZTogZmFsc2UsXHJcbiAgICBtb3Zpbmc6IGZhbHNlXHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uIHdoZW4gdGhlIGNhcm91c2VsJ3MgcmVidWlsZGluZyBjYXVzZWQgYnkgcmVzaXplIGV2ZW50IHN0YXJ0c1xyXG4gICAqL1xyXG4gIHByaXZhdGUgX29uZURyYWdNb3ZlJCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2N0aXB0aW9uIHRvIF9vbmVEcmFnTW92ZSQgU3ViamVjdFxyXG4gICAqL1xyXG4gIHByaXZhdGUgX29uZU1vdmVTdWJzcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHpvbmU6IE5nWm9uZSxcclxuICAgICAgICAgICAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICAgICAgICAgICAgICBwcml2YXRlIGNhcm91c2VsU2VydmljZTogQ2Fyb3VzZWxTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgYW5pbWF0ZVNlcnZpY2U6IEFuaW1hdGVTZXJ2aWNlKSB7IH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignbW91c2Vkb3duJywgWyckZXZlbnQnXSkgb25Nb3VzZURvd24oZXZlbnQpIHtcclxuICAgIGlmICh0aGlzLm93bERyYWdnYWJsZS5pc01vdXNlRHJhZ2FibGUpIHtcclxuICAgICAgdGhpcy5fb25EcmFnU3RhcnQoZXZlbnQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcigndG91Y2hzdGFydCcsIFsnJGV2ZW50J10pIG9uVG91Y2hTdGFydChldmVudCkge1xyXG4gICAgaWYgKHRoaXMub3dsRHJhZ2dhYmxlLmlzVG91Y2hEcmFnYWJsZSkge1xyXG4gICAgICB0aGlzLl9vbkRyYWdTdGFydChldmVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIFsnJGV2ZW50J10pIG9uVG91Y2hDYW5jZWwoZXZlbnQpIHtcclxuICAgIHRoaXMuX29uRHJhZ0VuZChldmVudCk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdkcmFnc3RhcnQnKSBvbkRyYWdTdGFydCgpIHtcclxuICAgIGlmICh0aGlzLm93bERyYWdnYWJsZS5pc01vdXNlRHJhZ2FibGUpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignc2VsZWN0c3RhcnQnKSBvblNlbGVjdFN0YXJ0KCkge1xyXG4gICAgaWYgKHRoaXMub3dsRHJhZ2dhYmxlLmlzTW91c2VEcmFnYWJsZSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuX29uZU1vdmVTdWJzcmlwdGlvbiA9IHRoaXMuX29uZURyYWdNb3ZlJFxyXG4gICAgICAucGlwZShmaXJzdCgpKVxyXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICB0aGlzLl9zZW5kQ2hhbmdlcygpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5fb25lTW92ZVN1YnNyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQYXNzZXMgdGhpcyB0byBfb25lTW91c2VUb3VjaE1vdmUoKTtcclxuICAgKi9cclxuICBiaW5kT25lTW91c2VUb3VjaE1vdmUgPSAoZXYpID0+IHtcclxuICAgIHRoaXMuX29uZU1vdXNlVG91Y2hNb3ZlKGV2KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFBhc3NlcyB0aGlzIHRvIF9vbkRyYWdNb3ZlKCk7XHJcbiAgICovXHJcbiAgYmluZE9uRHJhZ01vdmUgPSAoZXYpID0+IHtcclxuICAgIHRoaXMuX29uRHJhZ01vdmUoZXYpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUGFzc2VzIHRoaXMgdG8gX29uRHJhZ01vdmUoKTtcclxuICAgKi9cclxuICBiaW5kT25EcmFnRW5kID0gKGV2KSA9PiB7XHJcbiAgICAvLyB0aGlzLnpvbmUucnVuKCgpID0+IHtcclxuICAgICAgdGhpcy5fb25EcmFnRW5kKGV2KTtcclxuICAgIC8vIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcblx0ICogSGFuZGxlcyBgdG91Y2hzdGFydGAgYW5kIGBtb3VzZWRvd25gIGV2ZW50cy5cclxuXHQgKiBAdG9kbyBIb3Jpem9udGFsIHN3aXBlIHRocmVzaG9sZCBhcyBvcHRpb25cclxuXHQgKiBAdG9kbyAjMjYxXHJcblx0ICogQHBhcmFtIGV2ZW50IC0gVGhlIGV2ZW50IGFyZ3VtZW50cy5cclxuXHQgKi9cclxuXHRwcml2YXRlIF9vbkRyYWdTdGFydChldmVudCk6IGFueSB7XHJcblx0XHRsZXQgc3RhZ2U6IENvb3JkcyA9IG51bGw7XHJcblxyXG5cdFx0aWYgKGV2ZW50LndoaWNoID09PSAzKSB7XHJcblx0XHRcdHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBzdGFnZSA9IHRoaXMuX3ByZXBhcmVEcmFnZ2luZyhldmVudCk7XHJcblxyXG5cdFx0dGhpcy5fZHJhZy50aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcblx0XHR0aGlzLl9kcmFnLnRhcmdldCA9IGV2ZW50LnRhcmdldDtcclxuXHRcdHRoaXMuX2RyYWcuc3RhZ2Uuc3RhcnQgPSBzdGFnZTtcclxuXHRcdHRoaXMuX2RyYWcuc3RhZ2UuY3VycmVudCA9IHN0YWdlO1xyXG4gICAgdGhpcy5fZHJhZy5wb2ludGVyID0gdGhpcy5fcG9pbnRlcihldmVudCk7XHJcbiAgICB0aGlzLl9kcmFnLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5saXN0ZW5lck1vdXNlVXAgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbihkb2N1bWVudCwgJ21vdXNldXAnLCB0aGlzLmJpbmRPbkRyYWdFbmQpO1xyXG4gICAgdGhpcy5saXN0ZW5lclRvdWNoRW5kID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oZG9jdW1lbnQsICd0b3VjaGVuZCcsIHRoaXMuYmluZE9uRHJhZ0VuZCk7XHJcblxyXG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgdGhpcy5saXN0ZW5lck9uZU1vdXNlTW92ZSA9IHRoaXMucmVuZGVyZXIubGlzdGVuKGRvY3VtZW50LCAnbW91c2Vtb3ZlJywgdGhpcy5iaW5kT25lTW91c2VUb3VjaE1vdmUpO1xyXG4gICAgICB0aGlzLmxpc3RlbmVyT25lVG91Y2hNb3ZlID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oZG9jdW1lbnQsICd0b3VjaG1vdmUnLCB0aGlzLmJpbmRPbmVNb3VzZVRvdWNoTW92ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBdHRhY2hlcyBsaXN0ZW5lcnMgdG8gYHRvdWNobW92ZWAgYW5kIGBtb3VzZW1vdmVgIGV2ZW50czsgaW5pdGlhdGVzIHVwZGF0aW5nIGNhcm91c2VsIGFmdGVyIHN0YXJ0aW5nIGRyYWdnaW5nXHJcbiAgICogQHBhcmFtIGV2ZW50IGV2ZW50IG9iamVjaCBvZiBtb3VzZSBvciB0b3VjaCBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgX29uZU1vdXNlVG91Y2hNb3ZlKGV2ZW50KSB7XHJcbiAgICBpZiAoIXRoaXMuX2RyYWcuYWN0aXZlKSByZXR1cm4gZmFsc2U7XHJcbiAgICBjb25zdCBkZWx0YSA9IHRoaXMuX2RpZmZlcmVuY2UodGhpcy5fZHJhZy5wb2ludGVyLCB0aGlzLl9wb2ludGVyKGV2ZW50KSk7XHJcbiAgICBpZiAodGhpcy5saXN0ZW5lckFUYWcpIHtcclxuICAgICAgdGhpcy5saXN0ZW5lckFUYWcoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmxpc3RlbmVyT25lTW91c2VNb3ZlKCk7XHJcbiAgICB0aGlzLmxpc3RlbmVyT25lVG91Y2hNb3ZlKCk7XHJcblxyXG4gICAgaWYgKE1hdGguYWJzKGRlbHRhLngpIDwgTWF0aC5hYnMoZGVsdGEueSkgJiYgdGhpcy5faXMoJ3ZhbGlkJykpIHtcclxuICAgICAgdGhpcy5fZHJhZy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fZHJhZy5tb3ZpbmcgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuYmxvY2tDbGlja0FuY2hvckluRHJhZ2dpbmcoZXZlbnQpO1xyXG5cclxuICAgIHRoaXMubGlzdGVuZXJNb3VzZU1vdmUgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbihkb2N1bWVudCwgJ21vdXNlbW92ZScsIHRoaXMuYmluZE9uRHJhZ01vdmUpO1xyXG4gICAgdGhpcy5saXN0ZW5lclRvdWNoTW92ZSA9IHRoaXMucmVuZGVyZXIubGlzdGVuKGRvY3VtZW50LCAndG91Y2htb3ZlJywgdGhpcy5iaW5kT25EcmFnTW92ZSk7XHJcblxyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICB0aGlzLl9lbnRlckRyYWdnaW5nKCk7XHJcbiAgICB0aGlzLl9vbmVEcmFnTW92ZSQubmV4dChldmVudCk7XHJcbiAgICAvLyB0aGlzLl9zZW5kQ2hhbmdlcygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQXR0YWNoZXMgaGFuZGxlciB0byBIVE1MQW5jaG9yRWxlbWVudCBmb3IgcHJldmVudGluZyBjbGljayB3aGlsZSBjYXJvdXNlbCBpcyBiZWluZyBkcmFnZ2VkXHJcbiAgICogQHBhcmFtIGV2ZW50IGV2ZW50IG9iamVjdFxyXG4gICAqL1xyXG4gIHByaXZhdGUgYmxvY2tDbGlja0FuY2hvckluRHJhZ2dpbmcoZXZlbnQ6IGFueSkge1xyXG4gICAgbGV0IHRhcmdldDogSFRNTEVsZW1lbnQgfCBudWxsID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgd2hpbGUgKHRhcmdldCAmJiAhKHRhcmdldCBpbnN0YW5jZW9mIEhUTUxBbmNob3JFbGVtZW50KSkge1xyXG4gICAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50RWxlbWVudDtcclxuICAgIH1cclxuICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBIVE1MQW5jaG9yRWxlbWVudCkge1xyXG4gICAgICB0aGlzLmxpc3RlbmVyQVRhZyA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRhcmdldCwgJ2NsaWNrJywgKCkgPT4gZmFsc2UpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgXHQvKipcclxuXHQgKiBIYW5kbGVzIHRoZSBgdG91Y2htb3ZlYCBhbmQgYG1vdXNlbW92ZWAgZXZlbnRzLlxyXG5cdCAqIEB0b2RvICMyNjFcclxuXHQgKiBAcGFyYW0gZXZlbnQgLSBUaGUgZXZlbnQgYXJndW1lbnRzLlxyXG5cdCAqL1xyXG5cdHByaXZhdGUgX29uRHJhZ01vdmUoZXZlbnQpIHtcclxuICAgIGlmICghdGhpcy5fZHJhZy5hY3RpdmUpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICBsZXQgc3RhZ2U6IENvb3JkcztcclxuICAgIGNvbnN0IHN0YWdlT3JFeGl0OiBib29sZWFuIHwgQ29vcmRzID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZGVmaW5lTmV3Q29vcmRzRHJhZyhldmVudCwgdGhpcy5fZHJhZyk7XHJcblxyXG4gICAgaWYgKHN0YWdlT3JFeGl0ID09PSBmYWxzZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBzdGFnZSA9IHN0YWdlT3JFeGl0IGFzIENvb3JkcztcclxuXHJcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIHRoaXMuX2RyYWcuc3RhZ2UuY3VycmVudCA9IHN0YWdlO1xyXG5cdFx0dGhpcy5fYW5pbWF0ZShzdGFnZS54IC0gdGhpcy5fZHJhZy5zdGFnZS5zdGFydC54KTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBNb3ZlcyAub3dsLXN0YWdlIGxlZnQtcmlnaHRcclxuICAgKiBAcGFyYW0gY29vcmRpbmF0ZSBjb29yZGluYXRlIHRvIGJlIHNldCB0byAub3dsLXN0YWdlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfYW5pbWF0ZShjb29yZGluYXRlOiBudW1iZXIpIHtcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdLCAndHJhbnNmb3JtJywgYHRyYW5zbGF0ZTNkKCR7Y29vcmRpbmF0ZX1weCwwcHgsMHB4YCk7XHJcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXSwgJ3RyYW5zaXRpb24nLCAnMHMnKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEhhbmRsZXMgdGhlIGB0b3VjaGVuZGAgYW5kIGBtb3VzZXVwYCBldmVudHMuXHJcblx0ICogQHRvZG8gIzI2MVxyXG5cdCAqIEB0b2RvIFRocmVzaG9sZCBmb3IgY2xpY2sgZXZlbnRcclxuXHQgKiBAcGFyYW0gZXZlbnQgLSBUaGUgZXZlbnQgYXJndW1lbnRzLlxyXG5cdCAqL1xyXG5cdHByaXZhdGUgX29uRHJhZ0VuZChldmVudCkge1xyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uub3dsRE9NRGF0YS5pc0dyYWIgPSBmYWxzZTtcclxuXHJcbiAgICBpZiAodGhpcy5fZHJhZy5tb3ZpbmcpIHtcclxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0sICd0cmFuc2Zvcm0nLCBgYCk7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdLCAndHJhbnNpdGlvbicsIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNwZWVkKCt0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5kcmFnRW5kU3BlZWQgfHwgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3Muc21hcnRTcGVlZCkvMTAwMCArJ3MnKTtcclxuXHJcbiAgICAgIHRoaXMuX2ZpbmlzaERyYWdnaW5nKGV2ZW50KTtcclxuICAgICAgdGhpcy5saXN0ZW5lck1vdXNlTW92ZSgpO1xyXG4gICAgICB0aGlzLmxpc3RlbmVyVG91Y2hNb3ZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fZHJhZyA9IHtcclxuICAgICAgdGltZTogbnVsbCxcclxuICAgICAgdGFyZ2V0OiBudWxsLFxyXG4gICAgICBwb2ludGVyOiBudWxsLFxyXG4gICAgICBzdGFnZToge1xyXG4gICAgICAgIHN0YXJ0OiBudWxsLFxyXG4gICAgICAgIGN1cnJlbnQ6IG51bGxcclxuICAgICAgfSxcclxuICAgICAgZGlyZWN0aW9uOiBudWxsLFxyXG4gICAgICBhY3RpdmU6IGZhbHNlLFxyXG4gICAgICBtb3Zpbmc6IGZhbHNlXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnRyaWdnZXIoJ2RyYWdnZWQnKTtcclxuICAgIHRoaXMubGlzdGVuZXJNb3VzZVVwKCk7XHJcbiAgICB0aGlzLmxpc3RlbmVyVG91Y2hFbmQoKTtcclxuICB9O1xyXG5cclxuICAvKipcclxuXHQgKiBQcmVwYXJlcyBkYXRhIGZvciBkcmFnZ2luZyBjYXJvdXNlbC4gSXQgc3RhcnRzIGFmdGVyIGZpcmluZyBgdG91Y2hzdGFydGAgYW5kIGBtb3VzZWRvd25gIGV2ZW50cy5cclxuXHQgKiBAcGFyYW0gZXZlbnQgLSBUaGUgZXZlbnQgYXJndW1lbnRzLlxyXG5cdCAqIEByZXR1cm5zIHN0YWdlIC0gb2JqZWN0IHdpdGggJ3gnIGFuZCAneScgY29vcmRpbmF0ZXMgb2YgLm93bC1zdGFnZVxyXG5cdCAqL1xyXG4gIHByaXZhdGUgX3ByZXBhcmVEcmFnZ2luZyhldmVudDogYW55KTogQ29vcmRzIHtcclxuICAgIHJldHVybiB0aGlzLmNhcm91c2VsU2VydmljZS5wcmVwYXJlRHJhZ2dpbmcoZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQXR0YWNoZXMgaGFuZGxlciBmb3IgJ2NsaWNrJyBldmVudCBvbiBhbnkgZWxlbWVudCBpbiAub3dsLXN0YWdlIGluIG9yZGVyIHRvIHByZXZlbnQgZHJhZ2dpbmcgd2hlbiBtb3Zpbmcgb2YgY3Vyc29yIGlzIGxlc3MgdGhhbiAzcHhcclxuICAgKi9cclxuICBwcml2YXRlIF9vbmVDbGlja0hhbmRsZXIgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmxpc3RlbmVyT25lQ2xpY2sgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLl9kcmFnLnRhcmdldCwgJ2NsaWNrJywgKCkgPT4gZmFsc2UpXHJcbiAgICB0aGlzLmxpc3RlbmVyT25lQ2xpY2soKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZpbmlzaGVzIGRyYWdnaW5nXHJcbiAgICogQHBhcmFtIGV2ZW50IG9iamVjdCBldmVudCBvZiAnbW91c2VVcCcgb2YgJ3RvdWNoZW5kJyBldmVudHNcclxuICAgKi9cclxuICBwcml2YXRlIF9maW5pc2hEcmFnZ2luZyhldmVudDogYW55KSB7XHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5maW5pc2hEcmFnZ2luZyhldmVudCwgdGhpcy5fZHJhZywgdGhpcy5fb25lQ2xpY2tIYW5kbGVyKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEdldHMgdW5pZmllZCBwb2ludGVyIGNvb3JkaW5hdGVzIGZyb20gZXZlbnQuXHJcblx0ICogQHBhcmFtIGV2ZW50IFRoZSBgbW91c2Vkb3duYCBvciBgdG91Y2hzdGFydGAgZXZlbnQuXHJcblx0ICogQHJldHVybnMgQ29udGFpbnMgYHhgIGFuZCBgeWAgY29vcmRpbmF0ZXMgb2YgY3VycmVudCBwb2ludGVyIHBvc2l0aW9uLlxyXG5cdCAqL1xyXG4gIHByaXZhdGUgX3BvaW50ZXIoZXZlbnQ6IGFueSk6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy5jYXJvdXNlbFNlcnZpY2UucG9pbnRlcihldmVudCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuXHQgKiBHZXRzIHRoZSBkaWZmZXJlbmNlIG9mIHR3byB2ZWN0b3JzLlxyXG5cdCAqIEBwYXJhbSBmaXJzdCBUaGUgZmlyc3QgdmVjdG9yLlxyXG5cdCAqIEBwYXJhbSBzZWNvbmQtIFRoZSBzZWNvbmQgdmVjdG9yLlxyXG5cdCAqIEByZXR1cm5zIFRoZSBkaWZmZXJlbmNlLlxyXG5cdCAqL1xyXG4gIHByaXZhdGUgX2RpZmZlcmVuY2UoZmlyc3RDOiBDb29yZHMsIHNlY29uZDogQ29vcmRzKTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLmNhcm91c2VsU2VydmljZS5kaWZmZXJlbmNlKGZpcnN0Qywgc2Vjb25kKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIENoZWNrcyB3aGV0aGVyIHRoZSBjYXJvdXNlbCBpcyBpbiBhIHNwZWNpZmljIHN0YXRlIG9yIG5vdC5cclxuXHQgKiBAcGFyYW0gc3BlY2lmaWNTdGF0ZSBUaGUgc3RhdGUgdG8gY2hlY2suXHJcblx0ICogQHJldHVybnMgVGhlIGZsYWcgd2hpY2ggaW5kaWNhdGVzIGlmIHRoZSBjYXJvdXNlbCBpcyBidXN5LlxyXG5cdCAqL1xyXG4gIHByaXZhdGUgX2lzKHNwZWNpZmljU3RhdGU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmlzKHNwZWNpZmljU3RhdGUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBFbnRlcnMgYSBzdGF0ZS5cclxuICAqIEBwYXJhbSBuYW1lIFRoZSBzdGF0ZSBuYW1lLlxyXG4gICovXHJcbiAgcHJpdmF0ZSBfZW50ZXIobmFtZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5lbnRlcihuYW1lKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIFNlbmRzIGFsbCBkYXRhIG5lZWRlZCBmb3IgVmlldy5cclxuXHQgKi9cclxuICBwcml2YXRlIF9zZW5kQ2hhbmdlcygpIHtcclxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNlbmRDaGFuZ2VzKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGVyIGZvciB0cmFuc2l0aW9lbmQgZXZlbnRcclxuICAgKi9cclxuICBvblRyYW5zaXRpb25FbmQoKSB7XHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5vblRyYW5zaXRpb25FbmQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEVudGVycyBpbnRvIGEgJ2RyYWdnaW5nJyBzdGF0ZVxyXG5cdCAqL1xyXG4gIHByaXZhdGUgX2VudGVyRHJhZ2dpbmcoKSB7XHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5lbnRlckRyYWdnaW5nKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGVzIHRoZSBlbmQgb2YgJ2FuaW1hdGlvbmVuZCcgZXZlbnRcclxuICAgKiBAcGFyYW0gaWQgSWQgb2Ygc2xpZGVzXHJcbiAgICovXHJcbiAgY2xlYXIoaWQpIHtcclxuICAgIHRoaXMuYW5pbWF0ZVNlcnZpY2UuY2xlYXIoaWQpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge0xvY2F0aW9uU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7QXR0cmlidXRlLCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgUmVuZGVyZXIyLCBpc0Rldk1vZGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQge05hdmlnYXRpb25FbmQsIFJvdXRlckV2ZW50LCBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlLCBVcmxUcmVlfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5cclxuZXhwb3J0IHR5cGUgUXVlcnlQYXJhbXNIYW5kbGluZyA9ICdtZXJnZScgfCAncHJlc2VydmUnIHwgJyc7XHJcblxyXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJzpub3QoYSlbb3dsUm91dGVyTGlua10nfSlcclxuZXhwb3J0IGNsYXNzIE93bFJvdXRlckxpbmtEaXJlY3RpdmUge1xyXG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxyXG4gIEBJbnB1dCgpIHF1ZXJ5UGFyYW1zICE6IHtbazogc3RyaW5nXTogYW55fTtcclxuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cclxuICBASW5wdXQoKSBmcmFnbWVudCAhOiBzdHJpbmc7XHJcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXHJcbiAgQElucHV0KCkgcXVlcnlQYXJhbXNIYW5kbGluZyAhOiBRdWVyeVBhcmFtc0hhbmRsaW5nO1xyXG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxyXG4gIEBJbnB1dCgpIHByZXNlcnZlRnJhZ21lbnQgITogYm9vbGVhbjtcclxuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cclxuICBASW5wdXQoKSBza2lwTG9jYXRpb25DaGFuZ2UgITogYm9vbGVhbjtcclxuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cclxuICBASW5wdXQoKSByZXBsYWNlVXJsICE6IGJvb2xlYW47XHJcblxyXG4gIEBJbnB1dCgpIHN0b3BMaW5rID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBjb21tYW5kczogYW55W10gPSBbXTtcclxuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cclxuICBwcml2YXRlIHByZXNlcnZlICE6IGJvb2xlYW47XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgICAgQEF0dHJpYnV0ZSgndGFiaW5kZXgnKSB0YWJJbmRleDogc3RyaW5nLCByZW5kZXJlcjogUmVuZGVyZXIyLCBlbDogRWxlbWVudFJlZikge1xyXG4gICAgaWYgKHRhYkluZGV4ID09IG51bGwpIHtcclxuICAgICAgcmVuZGVyZXIuc2V0QXR0cmlidXRlKGVsLm5hdGl2ZUVsZW1lbnQsICd0YWJpbmRleCcsICcwJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCBvd2xSb3V0ZXJMaW5rKGNvbW1hbmRzOiBhbnlbXXxzdHJpbmcpIHtcclxuICAgIGlmIChjb21tYW5kcyAhPSBudWxsKSB7XHJcbiAgICAgIHRoaXMuY29tbWFuZHMgPSBBcnJheS5pc0FycmF5KGNvbW1hbmRzKSA/IGNvbW1hbmRzIDogW2NvbW1hbmRzXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY29tbWFuZHMgPSBbXTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBkZXByZWNhdGVkIDQuMC4wIHVzZSBgcXVlcnlQYXJhbXNIYW5kbGluZ2AgaW5zdGVhZC5cclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIHNldCBwcmVzZXJ2ZVF1ZXJ5UGFyYW1zKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICBpZiAoaXNEZXZNb2RlKCkgJiYgPGFueT5jb25zb2xlICYmIDxhbnk+Y29uc29sZS53YXJuKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybigncHJlc2VydmVRdWVyeVBhcmFtcyBpcyBkZXByZWNhdGVkISwgdXNlIHF1ZXJ5UGFyYW1zSGFuZGxpbmcgaW5zdGVhZC4nKTtcclxuICAgIH1cclxuICAgIHRoaXMucHJlc2VydmUgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcclxuICBvbkNsaWNrKCk6IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgZXh0cmFzID0ge1xyXG4gICAgICBza2lwTG9jYXRpb25DaGFuZ2U6IGF0dHJCb29sVmFsdWUodGhpcy5za2lwTG9jYXRpb25DaGFuZ2UpLFxyXG4gICAgICByZXBsYWNlVXJsOiBhdHRyQm9vbFZhbHVlKHRoaXMucmVwbGFjZVVybCksXHJcbiAgICB9O1xyXG4gICAgaWYgKHRoaXMuc3RvcExpbmspIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGVCeVVybCh0aGlzLnVybFRyZWUsIGV4dHJhcyk7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGdldCB1cmxUcmVlKCk6IFVybFRyZWUge1xyXG4gICAgcmV0dXJuIHRoaXMucm91dGVyLmNyZWF0ZVVybFRyZWUodGhpcy5jb21tYW5kcywge1xyXG4gICAgICByZWxhdGl2ZVRvOiB0aGlzLnJvdXRlLFxyXG4gICAgICBxdWVyeVBhcmFtczogdGhpcy5xdWVyeVBhcmFtcyxcclxuICAgICAgZnJhZ21lbnQ6IHRoaXMuZnJhZ21lbnQsXHJcbiAgICAgIHByZXNlcnZlUXVlcnlQYXJhbXM6IGF0dHJCb29sVmFsdWUodGhpcy5wcmVzZXJ2ZSksXHJcbiAgICAgIHF1ZXJ5UGFyYW1zSGFuZGxpbmc6IHRoaXMucXVlcnlQYXJhbXNIYW5kbGluZyxcclxuICAgICAgcHJlc2VydmVGcmFnbWVudDogYXR0ckJvb2xWYWx1ZSh0aGlzLnByZXNlcnZlRnJhZ21lbnQpLFxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogQGRlc2NyaXB0aW9uXHJcbiAqXHJcbiAqIExldHMgeW91IGxpbmsgdG8gc3BlY2lmaWMgcm91dGVzIGluIHlvdXIgYXBwLlxyXG4gKlxyXG4gKiBTZWUgYFJvdXRlckxpbmtgIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAbmdNb2R1bGUgUm91dGVyTW9kdWxlXHJcbiAqXHJcbiAqIEBwdWJsaWNBcGlcclxuICovXHJcbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnYVtvd2xSb3V0ZXJMaW5rXSd9KVxyXG5leHBvcnQgY2xhc3MgT3dsUm91dGVyTGlua1dpdGhIcmVmRGlyZWN0aXZlIGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xyXG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxyXG4gIEBIb3N0QmluZGluZygnYXR0ci50YXJnZXQnKSBASW5wdXQoKSB0YXJnZXQgITogc3RyaW5nO1xyXG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxyXG4gIEBJbnB1dCgpIHF1ZXJ5UGFyYW1zICE6IHtbazogc3RyaW5nXTogYW55fTtcclxuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cclxuICBASW5wdXQoKSBmcmFnbWVudCAhOiBzdHJpbmc7XHJcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXHJcbiAgQElucHV0KCkgcXVlcnlQYXJhbXNIYW5kbGluZyAhOiBRdWVyeVBhcmFtc0hhbmRsaW5nO1xyXG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxyXG4gIEBJbnB1dCgpIHByZXNlcnZlRnJhZ21lbnQgITogYm9vbGVhbjtcclxuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cclxuICBASW5wdXQoKSBza2lwTG9jYXRpb25DaGFuZ2UgITogYm9vbGVhbjtcclxuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cclxuICBASW5wdXQoKSByZXBsYWNlVXJsICE6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgc3RvcExpbmsgPSBmYWxzZTtcclxuXHJcbiAgcHJpdmF0ZSBjb21tYW5kczogYW55W10gPSBbXTtcclxuICBwcml2YXRlIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxyXG4gIHByaXZhdGUgcHJlc2VydmUgITogYm9vbGVhbjtcclxuXHJcbiAgLy8gdGhlIHVybCBkaXNwbGF5ZWQgb24gdGhlIGFuY2hvciBlbGVtZW50LlxyXG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxyXG4gIEBIb3N0QmluZGluZygpIGhyZWYgITogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICAgIHByaXZhdGUgbG9jYXRpb25TdHJhdGVneTogTG9jYXRpb25TdHJhdGVneSkge1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb24gPSByb3V0ZXIuZXZlbnRzLnN1YnNjcmliZSgoczogUm91dGVyRXZlbnQpID0+IHtcclxuICAgICAgaWYgKHMgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVUYXJnZXRVcmxBbmRIcmVmKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgb3dsUm91dGVyTGluayhjb21tYW5kczogYW55W118c3RyaW5nKSB7XHJcbiAgICBpZiAoY29tbWFuZHMgIT0gbnVsbCkge1xyXG4gICAgICB0aGlzLmNvbW1hbmRzID0gQXJyYXkuaXNBcnJheShjb21tYW5kcykgPyBjb21tYW5kcyA6IFtjb21tYW5kc107XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmNvbW1hbmRzID0gW107XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCBwcmVzZXJ2ZVF1ZXJ5UGFyYW1zKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICBpZiAoaXNEZXZNb2RlKCkgJiYgPGFueT5jb25zb2xlICYmIDxhbnk+Y29uc29sZS53YXJuKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybigncHJlc2VydmVRdWVyeVBhcmFtcyBpcyBkZXByZWNhdGVkLCB1c2UgcXVlcnlQYXJhbXNIYW5kbGluZyBpbnN0ZWFkLicpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5wcmVzZXJ2ZSA9IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczoge30pOiBhbnkgeyB0aGlzLnVwZGF0ZVRhcmdldFVybEFuZEhyZWYoKTsgfVxyXG4gIG5nT25EZXN0cm95KCk6IGFueSB7IHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7IH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudC5idXR0b24nLCAnJGV2ZW50LmN0cmxLZXknLCAnJGV2ZW50Lm1ldGFLZXknLCAnJGV2ZW50LnNoaWZ0S2V5J10pXHJcbiAgb25DbGljayhidXR0b246IG51bWJlciwgY3RybEtleTogYm9vbGVhbiwgbWV0YUtleTogYm9vbGVhbiwgc2hpZnRLZXk6IGJvb2xlYW4pOiBib29sZWFuIHtcclxuICAgIGlmIChidXR0b24gIT09IDAgfHwgY3RybEtleSB8fCBtZXRhS2V5IHx8IHNoaWZ0S2V5KSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0eXBlb2YgdGhpcy50YXJnZXQgPT09ICdzdHJpbmcnICYmIHRoaXMudGFyZ2V0ICE9PSAnX3NlbGYnKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnN0b3BMaW5rKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBleHRyYXMgPSB7XHJcbiAgICAgIHNraXBMb2NhdGlvbkNoYW5nZTogYXR0ckJvb2xWYWx1ZSh0aGlzLnNraXBMb2NhdGlvbkNoYW5nZSksXHJcbiAgICAgIHJlcGxhY2VVcmw6IGF0dHJCb29sVmFsdWUodGhpcy5yZXBsYWNlVXJsKSxcclxuICAgIH07XHJcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKHRoaXMudXJsVHJlZSwgZXh0cmFzKTtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdXBkYXRlVGFyZ2V0VXJsQW5kSHJlZigpOiB2b2lkIHtcclxuICAgIHRoaXMuaHJlZiA9IHRoaXMubG9jYXRpb25TdHJhdGVneS5wcmVwYXJlRXh0ZXJuYWxVcmwodGhpcy5yb3V0ZXIuc2VyaWFsaXplVXJsKHRoaXMudXJsVHJlZSkpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHVybFRyZWUoKTogVXJsVHJlZSB7XHJcbiAgICByZXR1cm4gdGhpcy5yb3V0ZXIuY3JlYXRlVXJsVHJlZSh0aGlzLmNvbW1hbmRzLCB7XHJcbiAgICAgIHJlbGF0aXZlVG86IHRoaXMucm91dGUsXHJcbiAgICAgIHF1ZXJ5UGFyYW1zOiB0aGlzLnF1ZXJ5UGFyYW1zLFxyXG4gICAgICBmcmFnbWVudDogdGhpcy5mcmFnbWVudCxcclxuICAgICAgcHJlc2VydmVRdWVyeVBhcmFtczogYXR0ckJvb2xWYWx1ZSh0aGlzLnByZXNlcnZlKSxcclxuICAgICAgcXVlcnlQYXJhbXNIYW5kbGluZzogdGhpcy5xdWVyeVBhcmFtc0hhbmRsaW5nLFxyXG4gICAgICBwcmVzZXJ2ZUZyYWdtZW50OiBhdHRyQm9vbFZhbHVlKHRoaXMucHJlc2VydmVGcmFnbWVudCksXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGF0dHJCb29sVmFsdWUoczogYW55KTogYm9vbGVhbiB7XHJcbiAgcmV0dXJuIHMgPT09ICcnIHx8ICEhcztcclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge1xyXG4gIENhcm91c2VsQ29tcG9uZW50LFxyXG4gIENhcm91c2VsU2xpZGVEaXJlY3RpdmVcclxufSBmcm9tICcuL2Nhcm91c2VsLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFdJTkRPV19QUk9WSURFUlMgfSBmcm9tICcuLi9zZXJ2aWNlcy93aW5kb3ctcmVmLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBSZXNpemVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvcmVzaXplLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBET0NVTUVOVF9QUk9WSURFUlMgfSBmcm9tICcuLi9zZXJ2aWNlcy9kb2N1bWVudC1yZWYuc2VydmljZSc7XHJcbmltcG9ydCB7IFN0YWdlQ29tcG9uZW50IH0gZnJvbSAnLi9zdGFnZS9zdGFnZS5jb21wb25lbnQnO1xyXG4vLyBpbXBvcnQgeyBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XHJcbmV4cG9ydCB7XHJcbiAgQ2Fyb3VzZWxDb21wb25lbnQsXHJcbiAgQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZSxcclxuICBTbGlkZXNPdXRwdXREYXRhXHJcbn0gZnJvbSAnLi9jYXJvdXNlbC5jb21wb25lbnQnO1xyXG5cclxuaW1wb3J0IHsgUm91dGVyTW9kdWxlLCBSb3V0ZXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBPd2xSb3V0ZXJMaW5rRGlyZWN0aXZlLCBPd2xSb3V0ZXJMaW5rV2l0aEhyZWZEaXJlY3RpdmUgfSBmcm9tICcuL293bC1yb3V0ZXItbGluay5kaXJlY3RpdmUnO1xyXG5leHBvcnQgeyBPd2xSb3V0ZXJMaW5rRGlyZWN0aXZlLCBPd2xSb3V0ZXJMaW5rV2l0aEhyZWZEaXJlY3RpdmUgfSBmcm9tICcuL293bC1yb3V0ZXItbGluay5kaXJlY3RpdmUnO1xyXG5cclxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXTtcclxuXHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIC8vIEJyb3dzZXJBbmltYXRpb25zTW9kdWxlLCAvLyB0aGVyZSdzIGFuIGlzc3VlIHdpdGggdGhpcyBpbXBvcnQgd2hpbGUgdXNpbmcgbGF6eSBsb2FkaW5nIG9mIG1vZHVsZSBjb25zdW1pbmcgdGhpcyBsaWJyYXJ5LiBJIGRvbid0IHJlbW92ZSBpdCBiZWNhdXNlIGl0IGNvdWxkIGJlIG5lZWRlZCBkdXJpbmcgZnV0dXJlIGVuaGFuY2VtZW50IG9mIHRoaXMgbGliLlxyXG4gICAgUm91dGVyTW9kdWxlLmZvckNoaWxkKHJvdXRlcyldLFxyXG4gIGRlY2xhcmF0aW9uczogW0Nhcm91c2VsQ29tcG9uZW50LCBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlLCBTdGFnZUNvbXBvbmVudCwgT3dsUm91dGVyTGlua0RpcmVjdGl2ZSwgT3dsUm91dGVyTGlua1dpdGhIcmVmRGlyZWN0aXZlXSxcclxuICBleHBvcnRzOiBbQ2Fyb3VzZWxDb21wb25lbnQsIENhcm91c2VsU2xpZGVEaXJlY3RpdmUsIE93bFJvdXRlckxpbmtEaXJlY3RpdmUsIE93bFJvdXRlckxpbmtXaXRoSHJlZkRpcmVjdGl2ZV0sXHJcbiAgcHJvdmlkZXJzOiBbV0lORE9XX1BST1ZJREVSUywgUmVzaXplU2VydmljZSwgRE9DVU1FTlRfUFJPVklERVJTXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2Fyb3VzZWxNb2R1bGUge31cclxuIl0sIm5hbWVzIjpbIm1lcmdlIiwiZmlsdGVyIiwiYW5pbWF0ZSIsInN0YXRlIiwiZmlyc3QiLCJ0c2xpYl8xLl9fZXh0ZW5kcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0lBd0JFLHVCQUFvQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUM1QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxzQkFBc0IsQ0FDdEMsUUFBUSxFQUNSLFFBQVEsRUFDUixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDekIsQ0FBQztRQUNGLElBQUksQ0FBQyxZQUFZLENBQUMsc0JBQXNCLENBQ3RDLFFBQVEsRUFDUixRQUFRLEVBQ1IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ3pCLENBQUM7S0FDSDtJQXJCRCxzQkFBSSxvQ0FBUzs7Ozs7Ozs7O1FBQWI7WUFDRSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDMUM7OztPQUFBOzs7Ozs7Ozs7O0lBeUJPLGdDQUFROzs7OztJQUFoQixVQUFpQixLQUFjO1FBQzdCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxvQkFBUyxLQUFLLENBQUMsTUFBTSxHQUFDLENBQUM7S0FDL0M7Ozs7Ozs7Ozs7SUFNTyxnQ0FBUTs7Ozs7SUFBaEIsVUFBaUIsS0FBYztRQUM3QixJQUFJLENBQUMsV0FBVyxzQkFBVyxLQUFLLENBQUMsTUFBTSxFQUFBLENBQUM7S0FDekM7O2dCQWhERixVQUFVOzs7O2dCQUpGLFlBQVk7O0lBcURyQixvQkFBQztDQWpERDs7Ozs7Ozs7O0FDQ0E7Ozs7SUF5REU7UUF4REEsVUFBSyxHQUFHLENBQUMsQ0FBQztRQUNWLFNBQUksR0FBRyxLQUFLLENBQUM7UUFDYixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2YsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUVmLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFDakIsY0FBUyxHQUFHLElBQUksQ0FBQztRQUNqQixhQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFFakIsV0FBTSxHQUFHLENBQUMsQ0FBQztRQUNYLGlCQUFZLEdBQUcsQ0FBQyxDQUFDO1FBRWpCLFVBQUssR0FBRyxLQUFLLENBQUM7UUFDZCxhQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFFbEIsa0JBQWEsR0FBRyxDQUFDLENBQUM7UUFDbEIsUUFBRyxHQUFHLEtBQUssQ0FBQztRQUVaLGVBQVUsR0FBRyxHQUFHLENBQUM7UUFDakIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUVyQixlQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLDBCQUFxQixHQUFHLEdBQUcsQ0FBQzs7UUFHNUIsUUFBRyxHQUFHLEtBQUssQ0FBQztRQUNaLFlBQU8sR0FBRyxDQUFFLE1BQU0sRUFBRSxNQUFNLENBQUUsQ0FBQztRQUM3QixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLFlBQU8sR0FBRyxDQUFDLENBQUM7O1FBQ1osU0FBSSxHQUFHLElBQUksQ0FBQztRQUNaLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixjQUFTLEdBQUcsS0FBSyxDQUFDOztRQUdsQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLG9CQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLHVCQUFrQixHQUFHLEtBQUssQ0FBQztRQUMzQixrQkFBYSxHQUFHLEtBQUssQ0FBQzs7UUFHdEIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixrQkFBYSxHQUFHLENBQUMsQ0FBQzs7UUFHbEIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixjQUFTLEdBQUcsS0FBSyxDQUFDOztRQUdsQixlQUFVLEdBQUcsS0FBSyxDQUFDOztRQUduQixvQkFBZSxHQUFHLEtBQUssQ0FBQztLQUNQO0lBQ25CLHlCQUFDO0NBQUEsSUFBQTs7Ozs7O0FBT0Q7Ozs7OztJQXlERTtRQXhEQSxVQUFLLEdBQUcsUUFBUSxDQUFDO1FBQ2pCLFNBQUksR0FBRyxTQUFTLENBQUM7UUFDakIsV0FBTSxHQUFHLFNBQVMsQ0FBQztRQUNuQixXQUFNLEdBQUcsU0FBUyxDQUFDO1FBRW5CLGNBQVMsR0FBRyxTQUFTLENBQUM7UUFDdEIsY0FBUyxHQUFHLFNBQVMsQ0FBQztRQUN0QixhQUFRLEdBQUcsU0FBUyxDQUFDO1FBQ3JCLGFBQVEsR0FBRyxTQUFTLENBQUM7UUFFckIsV0FBTSxHQUFHLFFBQVEsQ0FBQztRQUNsQixpQkFBWSxHQUFHLFFBQVEsQ0FBQztRQUV4QixVQUFLLEdBQUcsU0FBUyxDQUFDO1FBQ2xCLGFBQVEsR0FBRyxTQUFTLENBQUM7UUFDckIsY0FBUyxHQUFHLFNBQVMsQ0FBQztRQUV0QixrQkFBYSxHQUFHLGVBQWUsQ0FBQztRQUNoQyxRQUFHLEdBQUcsU0FBUyxDQUFDO1FBRWhCLGVBQVUsR0FBRyxRQUFRLENBQUM7UUFDdEIsZUFBVSxHQUFHLFNBQVMsQ0FBQztRQUN2QixpQkFBWSxHQUFHLGdCQUFnQixDQUFDO1FBRWhDLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFDaEIsMEJBQXFCLEdBQUcsUUFBUSxDQUFDOztRQUdqQyxRQUFHLEdBQUcsU0FBUyxDQUFDO1FBQ2hCLFlBQU8sR0FBRyxVQUFVLENBQUM7UUFDckIsYUFBUSxHQUFHLGdCQUFnQixDQUFDO1FBQzVCLFlBQU8sR0FBRyxlQUFlLENBQUM7O1FBQzFCLFNBQUksR0FBRyxTQUFTLENBQUM7UUFDakIsYUFBUSxHQUFHLGdCQUFnQixDQUFDO1FBQzVCLGFBQVEsR0FBRyxTQUFTLENBQUM7UUFDckIsY0FBUyxHQUFHLGdCQUFnQixDQUFDOztRQUc3QixhQUFRLEdBQUcsU0FBUyxDQUFDO1FBQ3JCLG9CQUFlLEdBQUcsUUFBUSxDQUFDO1FBQzNCLHVCQUFrQixHQUFHLFNBQVMsQ0FBQztRQUMvQixrQkFBYSxHQUFHLGdCQUFnQixDQUFDOztRQUdqQyxhQUFRLEdBQUcsU0FBUyxDQUFDO1FBQ3JCLGtCQUFhLEdBQUcsUUFBUSxDQUFDOztRQUd6QixlQUFVLEdBQUcsZ0JBQWdCLENBQUM7UUFDOUIsY0FBUyxHQUFHLGdCQUFnQixDQUFDOztRQUc3QixlQUFVLEdBQUcsU0FBUyxDQUFDOztRQUd2QixvQkFBZSxHQUFHLFNBQVMsQ0FBQztLQUNYO0lBQ25CLDRCQUFDO0NBQUEsSUFBQTs7Ozs7Ozs7SUNsR0EsT0FBUSxPQUFPO0lBQ2YsT0FBUSxPQUFPOzs7O0lBUWYsU0FBVSxTQUFTO0lBQ25CLE9BQVEsT0FBTztJQUNmLE9BQVEsT0FBTzs7O0lBa2NmO1FBQUEsaUJBQWlCOzs7O1FBdmFULDBCQUFxQixHQUFHLElBQUksT0FBTyxFQUF1QixDQUFDOzs7O1FBSTNELDBCQUFxQixHQUFHLElBQUksT0FBTyxFQUFVLENBQUM7Ozs7UUFLOUMsNkJBQXdCLEdBQUcsSUFBSSxPQUFPLEVBQU8sQ0FBQzs7OztRQUs5Qyw4QkFBeUIsR0FBRyxJQUFJLE9BQU8sRUFBTyxDQUFDOzs7O1FBSS9DLHdCQUFtQixHQUFHLElBQUksT0FBTyxFQUFVLENBQUM7Ozs7UUFJNUMseUJBQW9CLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQzs7OztRQUk3QyxxQkFBZ0IsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFDOzs7O1FBSXpDLHNCQUFpQixHQUFHLElBQUksT0FBTyxFQUFVLENBQUM7Ozs7UUFJMUMsc0JBQWlCLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQzs7OztRQUkxQyx3QkFBbUIsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFDOzs7O1FBSTVDLG1CQUFjLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQzs7OztRQUl2QyxzQkFBaUIsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFDOzs7O1FBS2pELGFBQVEsR0FBZTtZQUN2QixLQUFLLEVBQUUsQ0FBQztTQUNSLENBQUM7Ozs7UUFLRixlQUFVLEdBQWU7WUFDeEIsR0FBRyxFQUFFLEtBQUs7WUFDVixZQUFZLEVBQUUsS0FBSztZQUNuQixXQUFXLEVBQUUsS0FBSztZQUNsQixRQUFRLEVBQUUsS0FBSztZQUNmLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLGVBQWUsRUFBRSxLQUFLO1lBQ3RCLE1BQU0sRUFBRSxLQUFLO1lBQ2IsZUFBZSxFQUFFLEtBQUs7U0FDdEIsQ0FBQzs7OztRQUtGLGNBQVMsR0FBYztZQUN0QixTQUFTLEVBQUUsMEJBQTBCO1lBQ3JDLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLEtBQUssRUFBRSxDQUFDO1lBQ1IsUUFBUSxFQUFFLENBQUM7WUFDWCxRQUFRLEVBQUUsQ0FBQztTQUNYLENBQUM7Ozs7UUF5Qk0sV0FBTSxHQUE2QixFQUFFLENBQUM7Ozs7O1FBS3JDLFlBQU8sR0FBVSxFQUFFLENBQUM7Ozs7UUFLckIsYUFBUSxHQUFRLEVBQUUsQ0FBQzs7OztRQUtuQixhQUFRLEdBQVEsRUFBRSxDQUFDOzs7O1FBS25CLGFBQVEsR0FBa0IsSUFBSSxDQUFDOzs7O1FBSy9CLFlBQU8sR0FBVSxFQUFFLENBQUM7Ozs7O1FBTW5CLGFBQVEsR0FBVSxFQUFFLENBQUM7Ozs7UUFLdEIsV0FBTSxHQUFrQixJQUFJLENBQUM7Ozs7O1FBTTdCLGlCQUFZLEdBQWEsRUFBRSxDQUFDOzs7OztRQU01QixnQkFBVyxHQUFRLElBQUksQ0FBQzs7OztRQUtoQyxtQkFBYyxHQUFHLFNBQVMsQ0FBQzs7OztRQUszQixhQUFRLEdBQWUsRUFBRSxDQUFDOzs7O1FBS2pCLGlCQUFZLEdBQVEsRUFBRSxDQUFDOzs7O1FBU3ZCLFlBQU8sR0FBVztZQUN4QixPQUFPLEVBQUUsRUFBRTtZQUNYLElBQUksRUFBRTtnQkFDSixZQUFZLEVBQUUsQ0FBQyxNQUFNLENBQUM7Z0JBQ3RCLFNBQVMsRUFBRSxDQUFDLE1BQU0sQ0FBQztnQkFDbkIsUUFBUSxFQUFFLENBQUMsYUFBYSxDQUFDO2FBQzFCO1NBQ0YsQ0FBQzs7OztRQVVNLFVBQUssR0FBVTs7Ozs7OztZQU9yQjtnQkFDRSxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBQztnQkFDdEMsR0FBRyxFQUFFLFVBQUEsS0FBSztvQkFDUixLQUFLLENBQUMsT0FBTyxHQUFHLEtBQUksQ0FBQyxNQUFNLElBQUksS0FBSSxDQUFDLE1BQU0sQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztpQkFDN0U7YUFDRjs7Ozs7OztZQU9GO2dCQUNHLE1BQU0sRUFBRSxDQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsVUFBVSxDQUFFO2dCQUN4QyxHQUFHLEVBQUUsVUFBQyxLQUFLOzt3QkFDSCxNQUFNLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksRUFBRTs7d0JBQ3ZDLElBQUksR0FBRyxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsU0FBUzs7d0JBQy9CLEdBQUcsR0FBRyxLQUFJLENBQUMsUUFBUSxDQUFDLEdBQUc7O3dCQUN2QixHQUFHLEdBQUc7d0JBQ0osYUFBYSxFQUFFLEdBQUcsR0FBRyxNQUFNLEdBQUcsRUFBRTt3QkFDaEMsY0FBYyxFQUFFLEdBQUcsR0FBRyxFQUFFLEdBQUcsTUFBTTtxQkFDbEM7b0JBRUgsSUFBRyxDQUFDLElBQUksRUFBRTt3QkFDYixLQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUs7NEJBQzVCLEtBQUssQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDOzRCQUNuQyxLQUFLLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQzt5QkFDcEMsQ0FBQyxDQUFDO3FCQUNIO29CQUVHLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO2lCQUNqQjthQUNGLEVBQUU7Z0JBQ0QsTUFBTSxFQUFFLENBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxVQUFVLENBQUU7Z0JBQ3hDLEdBQUcsRUFBRSxVQUFDLEtBQUs7O3dCQUNILEtBQUssR0FBUSxDQUFDLENBQUMsS0FBSSxDQUFDLEtBQUssRUFBRSxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFJLENBQUMsUUFBUSxDQUFDLE1BQU07O3dCQUN4RixJQUFJLEdBQUcsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLFNBQVM7O3dCQUMvQixNQUFNLEdBQUcsRUFBRTs7d0JBQ2JBLFFBQUssR0FBRyxJQUFJOzt3QkFDZCxRQUFRLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNO29CQUUzQixLQUFLLENBQUMsS0FBSyxHQUFHO3dCQUNaLEtBQUssRUFBRSxLQUFLO3dCQUNaLEtBQUssRUFBRSxLQUFLO3FCQUNiLENBQUM7b0JBRUYsT0FBTyxRQUFRLEVBQUUsRUFBRTt3QkFDakJBLFFBQUssR0FBRyxLQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUNoQ0EsUUFBSyxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUNBLFFBQUssRUFBRSxLQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJQSxRQUFLLENBQUM7d0JBQ2hGLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHQSxRQUFLLEdBQUcsQ0FBQyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO3dCQUVuRCxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxHQUFHLEtBQUssR0FBR0EsUUFBSyxDQUFDO3FCQUM5RztvQkFFTCxLQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztvQkFFdEIsS0FBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLLEVBQUUsQ0FBQzt3QkFDaEMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM5QixLQUFLLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7d0JBQzFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztxQkFDekMsQ0FBQyxDQUFDO2lCQUNBO2FBQ0YsRUFBRTtnQkFDRCxNQUFNLEVBQUUsQ0FBRSxPQUFPLEVBQUUsVUFBVSxDQUFFO2dCQUMvQixHQUFHLEVBQUU7O3dCQUNHLE1BQU0sR0FBVSxFQUFFOzt3QkFDdEIsS0FBSyxHQUE2QixLQUFJLENBQUMsTUFBTTs7d0JBQzdDLFFBQVEsR0FBUSxLQUFJLENBQUMsUUFBUTs7OztvQkFFN0IsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDOzt3QkFDdEMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDOzt3QkFDdkMsTUFBTSxHQUFVLEVBQUU7O3dCQUNqQixPQUFPLEdBQVUsRUFBRTs7d0JBQ3hCLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQztvQkFFdkYsTUFBTSxJQUFJLENBQUMsQ0FBQztvQkFFWixPQUFPLE1BQU0sRUFBRSxFQUFFOzt3QkFFZixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDckQsTUFBTSxDQUFDLElBQUksY0FBTSxLQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQzt3QkFDbkUsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQzlFLE9BQU8sQ0FBQyxPQUFPLGNBQU0sS0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7cUJBQzlEO29CQUVMLEtBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO29CQUV0QixNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFBLEtBQUs7d0JBQ3hCLEtBQUssQ0FBQyxFQUFFLEdBQUcsS0FBRyxLQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQyxFQUFJLENBQUM7d0JBQy9DLEtBQUssQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO3dCQUN2QixLQUFLLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQzt3QkFDdEIsT0FBTyxLQUFLLENBQUM7cUJBQ2IsQ0FBQyxDQUFDO29CQUVILE9BQU8sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUEsS0FBSzt3QkFDMUIsS0FBSyxDQUFDLEVBQUUsR0FBRyxLQUFHLEtBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDLEVBQUksQ0FBQzt3QkFDL0MsS0FBSyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7d0JBQ3ZCLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO3dCQUN0QixPQUFPLEtBQUssQ0FBQztxQkFDYixDQUFDLENBQUM7b0JBRUgsS0FBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQzlEO2FBQ0YsRUFBRTtnQkFDRCxNQUFNLEVBQUUsQ0FBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBRTtnQkFDeEMsR0FBRyxFQUFFOzt3QkFDRyxHQUFHLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7d0JBQ3BDLElBQUksR0FBRyxLQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLE1BQU07O3dCQUMvQyxXQUFXLEdBQUcsRUFBRTs7d0JBQ2QsUUFBUSxHQUFHLENBQUMsQ0FBQzs7d0JBQ2YsUUFBUSxHQUFHLENBQUM7O3dCQUNaLE9BQU8sR0FBRyxDQUFDO29CQUViLE9BQU8sRUFBRSxRQUFRLEdBQUcsSUFBSSxFQUFFO3dCQUN4QixRQUFRLEdBQUcsV0FBVyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQzFDLE9BQU8sR0FBRyxLQUFJLENBQUMsT0FBTyxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxLQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQzt3QkFDdkUsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxHQUFHLEdBQUcsQ0FBQyxDQUFDO3FCQUM1QztvQkFFRCxLQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQztpQkFDakM7YUFDRixFQUFFO2dCQUNELE1BQU0sRUFBRSxDQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsVUFBVSxDQUFFO2dCQUN4QyxHQUFHLEVBQUU7O3dCQUNHLE9BQU8sR0FBRyxLQUFJLENBQUMsUUFBUSxDQUFDLFlBQVk7O3dCQUN4QyxXQUFXLEdBQUcsS0FBSSxDQUFDLFlBQVk7O3dCQUMvQixHQUFHLEdBQUc7d0JBQ0osT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxHQUFHLENBQUM7d0JBQy9FLGNBQWMsRUFBRSxPQUFPLElBQUksRUFBRTt3QkFDN0IsZUFBZSxFQUFFLE9BQU8sSUFBSSxFQUFFO3FCQUNwQztvQkFFRixLQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO29CQUNqQyxLQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7b0JBQzlDLEtBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztpQkFDNUM7YUFDRixFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnQkF3QkQsTUFBTSxFQUFFLENBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxVQUFVLENBQUU7Z0JBQ3hDLEdBQUcsRUFBRSxVQUFBLEtBQUs7O3dCQUNKLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxHQUFHLEtBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLEVBQUUsS0FBSyxLQUFLLENBQUMsT0FBTyxHQUFBLENBQUMsR0FBRyxDQUFDO29CQUNoRyxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFDdEUsS0FBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDckI7YUFDRixFQUFFO2dCQUNELE1BQU0sRUFBRSxDQUFFLFVBQVUsQ0FBRTtnQkFDdEIsR0FBRyxFQUFFO29CQUNILEtBQUksQ0FBQyxPQUFPLENBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztpQkFDL0M7YUFDRixFQUFFO2dCQUNELE1BQU0sRUFBRSxDQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBRTtnQkFDcEQsR0FBRyxFQUFFOzt3QkFDRyxHQUFHLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7d0JBQ3pDLE9BQU8sR0FBRyxLQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksR0FBRyxDQUFDOzt3QkFDeEMsT0FBTyxHQUFHLEVBQUU7O3dCQUNULEtBQUs7O3dCQUFFLEdBQUc7O3dCQUFFLEtBQUs7O3dCQUFFLEtBQUs7O3dCQUFFLENBQUM7O3dCQUFFLENBQUM7b0JBRWxDLEtBQUssR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDLEtBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO29CQUN6QyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRzt3QkFDL0IsS0FBSyxJQUFJLE9BQU8sQ0FBQztxQkFDakI7eUJBQU07d0JBQ04sS0FBSyxHQUFHLENBQUMsQ0FBQztxQkFDVjtvQkFFRCxHQUFHLEdBQUcsS0FBSyxHQUFHLEtBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxHQUFHLENBQUM7b0JBRWpDLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxJQUFJLEtBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFOzs0QkFDakMsTUFBTSxHQUFHLEtBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFVBQUEsT0FBTzs0QkFDOUMsT0FBTyxLQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sSUFBSSxLQUFLLEdBQUcsT0FBTyxHQUFHLEtBQUssQ0FBQzt5QkFDMUUsQ0FBQzt3QkFDRixLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7cUJBQzFEO29CQUVHLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTt3QkFDcEQsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ3RELEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sR0FBRyxHQUFHLENBQUMsQ0FBQzt3QkFFN0QsSUFBSSxDQUFDLEtBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsS0FBSyxLQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0NBQzFELEtBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsSUFBSSxLQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRTs0QkFDL0QsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDakI7cUJBQ047b0JBRUQsS0FBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLO3dCQUM1QixLQUFLLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQzt3QkFDdkIsT0FBTyxLQUFLLENBQUM7cUJBQ2IsQ0FBQyxDQUFDO29CQUNILE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO3dCQUNuQixLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7cUJBQ3RDLENBQUMsQ0FBQztvQkFFQyxJQUFJLEtBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO3dCQUM3QixLQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUs7NEJBQzVCLEtBQUssQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDOzRCQUN6QixPQUFPLEtBQUssQ0FBQzt5QkFDYixDQUFDLENBQUM7d0JBQ0gsS0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO3FCQUM5QztpQkFDRjthQUNGO1NBQ0YsQ0FBQztLQUVjO0lBOVBoQixzQkFBSSx3Q0FBVzs7Ozs7OztRQUFmO1lBQ0UsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO1NBQzFCOzs7T0FBQTtJQWNELHNCQUFJLG1DQUFNOzs7Ozs7O1FBQVY7WUFDRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7U0FDdEI7OztPQUFBOzs7Ozs7Ozs7SUFrUEQsNENBQWtCOzs7O0lBQWxCO1FBQ0MsT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUMsWUFBWSxFQUFFLENBQUM7S0FDakQ7Ozs7Ozs7OztJQU1ELDZDQUFtQjs7OztJQUFuQjtRQUNDLE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDLFlBQVksRUFBRSxDQUFBO0tBQ2hEOzs7Ozs7Ozs7SUFNRCx3Q0FBYzs7OztJQUFkO1FBQ0MsT0FBTyxJQUFJLENBQUMsd0JBQXdCLENBQUMsWUFBWSxFQUFFLENBQUM7S0FDcEQ7Ozs7Ozs7OztJQU1ELHlDQUFlOzs7O0lBQWY7UUFDQyxPQUFPLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztLQUNyRDs7Ozs7Ozs7O0lBTUQsMkNBQWlCOzs7O0lBQWpCO1FBQ0MsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsWUFBWSxFQUFFLENBQUM7S0FDL0M7Ozs7Ozs7OztJQU1ELDRDQUFrQjs7OztJQUFsQjtRQUNDLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLFlBQVksRUFBRSxDQUFDO0tBQ2hEOzs7Ozs7Ozs7SUFNRCx3Q0FBYzs7OztJQUFkO1FBQ0MsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLENBQUM7S0FDNUM7Ozs7Ozs7OztJQU1ELHlDQUFlOzs7O0lBQWY7UUFDQyxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztLQUM3Qzs7Ozs7Ozs7O0lBTUQseUNBQWU7Ozs7SUFBZjtRQUNDLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDO0tBQzdDOzs7Ozs7Ozs7SUFNRCwyQ0FBaUI7Ozs7SUFBakI7UUFDQyxPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztLQUMvQzs7Ozs7Ozs7O0lBTUQsc0NBQVk7Ozs7SUFBWjtRQUNDLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztLQUMxQzs7Ozs7Ozs7O0lBTUQseUNBQWU7Ozs7SUFBZjtRQUNDLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDO0tBQzdDOzs7Ozs7Ozs7O0lBTUQsb0NBQVU7Ozs7O0lBQVYsVUFBVyxPQUFtQjs7WUFDdkIsYUFBYSxHQUFlLElBQUksa0JBQWtCLEVBQUU7O1lBQ3BELGNBQWMsR0FBZSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQztRQUNoRixJQUFJLENBQUMsUUFBUSxnQkFBUSxhQUFhLEVBQUssY0FBYyxDQUFDLENBQUM7S0FDdkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFXTywwQ0FBZ0I7Ozs7Ozs7OztJQUF4QixVQUF5QixPQUFtQixFQUFFLGFBQXlCOztZQUNoRSxjQUFjLGdCQUFvQixPQUFPLENBQUM7O1lBQzFDLFdBQVcsR0FBRyxJQUFJLHFCQUFxQixFQUFFO2dDQUVwQyxHQUFHO1lBQ2IsSUFBSSxjQUFjLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFOztnQkFHdkMsSUFBSSxXQUFXLENBQUMsR0FBRyxDQUFDLEtBQUssUUFBUSxFQUFFO29CQUNsQyxJQUFJLE9BQUssVUFBVSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO3dCQUN6QyxjQUFjLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQzNDLGNBQWMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEtBQUssT0FBTyxHQUFHLE9BQUssY0FBYyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFDdkc7eUJBQU07d0JBQ04sY0FBYyxDQUFDLEdBQUcsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7cUJBQzVEO2lCQUNEO3FCQUFNLElBQUksV0FBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVMsSUFBSSxPQUFPLGNBQWMsQ0FBQyxHQUFHLENBQUMsS0FBSyxTQUFTLEVBQUU7b0JBQ3RGLGNBQWMsQ0FBQyxHQUFHLENBQUMsR0FBRyxjQUFjLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2lCQUM1RDtxQkFBTSxJQUFJLFdBQVcsQ0FBQyxHQUFHLENBQUMsS0FBSyxnQkFBZ0IsSUFBSSxDQUFDLE9BQUssa0JBQWtCLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7b0JBQ2xHLGNBQWMsQ0FBQyxHQUFHLENBQUMsR0FBRyxjQUFjLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2lCQUM1RDtxQkFBTSxJQUFJLFdBQVcsQ0FBQyxHQUFHLENBQUMsS0FBSyxlQUFlLElBQUksQ0FBQyxPQUFLLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO29CQUNoRyxjQUFjLENBQUMsR0FBRyxDQUFDLEdBQUcsY0FBYyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztpQkFDNUQ7cUJBQU0sSUFBSSxXQUFXLENBQUMsR0FBRyxDQUFDLEtBQUssZ0JBQWdCLElBQUksQ0FBQyxPQUFLLGtCQUFrQixDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO29CQUNsRyxjQUFjLENBQUMsR0FBRyxDQUFDLEdBQUcsY0FBYyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztpQkFDNUQ7cUJBQU0sSUFBSSxXQUFXLENBQUMsR0FBRyxDQUFDLEtBQUssVUFBVSxFQUFFO29CQUMzQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7OzRCQUNuQyxVQUFRLEdBQUcsS0FBSzt3QkFDcEIsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLE9BQU87NEJBQ2xDLFVBQVEsR0FBRyxPQUFPLE9BQU8sS0FBSyxRQUFRLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQzt5QkFDdEQsQ0FBQyxDQUFDO3dCQUNILElBQUksQ0FBQyxVQUFRLEVBQUU7NEJBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUE7eUJBQUU7cUJBQzlFO3lCQUFNO3dCQUNOLGNBQWMsQ0FBQyxHQUFHLENBQUMsR0FBRyxjQUFjLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO3FCQUM1RDtpQkFDRDthQUNEO1NBQ0Q7O1FBL0JELEtBQUssSUFBTSxHQUFHLElBQUksY0FBYztvQkFBckIsR0FBRztTQStCYjs7Ozs7O1FBRUQsU0FBUyxjQUFjLENBQUMsSUFBWSxFQUFFLEdBQVE7WUFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFXLEdBQUcseUJBQW9CLElBQUksVUFBSyxHQUFHLFNBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBeUIsR0FBRyxTQUFJLGFBQWEsQ0FBQyxHQUFHLENBQUcsQ0FBQyxDQUFDO1lBQ2hJLE9BQU8sYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzFCO1FBRUQsT0FBTyxjQUFjLENBQUM7S0FDdEI7Ozs7Ozs7Ozs7O0lBT08sd0NBQWM7Ozs7O0lBQXRCLFVBQXVCLEtBQWE7O1lBQy9CLE1BQWM7UUFDbEIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7WUFDL0IsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0tBQWtLLENBQUMsQ0FBQztTQUNoTDthQUFNO1lBQ04sSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDOUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtR0FBbUcsQ0FBQyxDQUFDO2FBQ2pIO1lBQ0QsTUFBTSxHQUFHLEtBQUssQ0FBQztTQUNmO1FBQ0QsT0FBTyxNQUFNLENBQUM7S0FDZDs7Ozs7Ozs7OztJQU1ELDBDQUFnQjs7Ozs7SUFBaEIsVUFBaUIsS0FBYTtRQUM3QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztLQUNwQjs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFVQSwrQkFBSzs7Ozs7Ozs7SUFBTCxVQUFNLGFBQXFCLEVBQUUsTUFBZ0MsRUFBRSxPQUFtQjtRQUNsRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXpCLElBQUksQ0FBQyxRQUFRLGdCQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVwQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUV6QixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDbEYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDbkY7Ozs7Ozs7O0lBS0QsMkNBQWlCOzs7O0lBQWpCOztZQUNPLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTTs7WUFDM0IsVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVTs7WUFDbEMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUVkLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sRUFBRTtZQUNwQyxPQUFPO1NBQ1A7UUFFRCxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ3hCLE9BQU87U0FDUDtRQUVELEtBQUssSUFBTSxHQUFHLElBQUksVUFBVSxFQUFFO1lBQzdCLElBQUksVUFBVSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDbkMsSUFBSSxDQUFDLEdBQUcsSUFBSSxRQUFRLElBQUksQ0FBQyxHQUFHLEdBQUcsS0FBSyxFQUFFO29CQUNyQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNwQjthQUNEO1NBQ0Q7UUFFRCxJQUFJLENBQUMsUUFBUSxnQkFBUSxJQUFJLENBQUMsUUFBUSxJQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBQyxDQUFDOzs7O1FBSXpGLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUM7UUFDaEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBRXpCLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDNUI7Ozs7Ozs7Ozs7SUFNQSxvQ0FBVTs7Ozs7SUFBVixVQUFXLE1BQWdDO1FBQTNDLGlCQXdCQTtRQXZCQSxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDOztRQUczQixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztRQUV4QyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTs7Z0JBQ1osTUFBTSxHQUFXLEtBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQztZQUMvRCxLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUMzQixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRTVGLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRWYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO1FBQzFELElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO1FBRTFELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUVuQixJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7S0FDN0I7Ozs7Ozs7O0lBS0QscUNBQVc7Ozs7SUFBWDtRQUNDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUM7WUFDL0IsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO1lBQzNCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztZQUN6QixVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVU7WUFDM0IsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3JCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtTQUN2QixDQUFDLENBQUM7S0FDSDs7Ozs7Ozs7SUFNUSx1Q0FBYTs7OztJQUFyQjtRQUNBLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUU7WUFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztTQUM1QjtLQUNEOzs7Ozs7OztJQUtBLGdDQUFNOzs7O0lBQU47UUFBQSxpQkFxQkM7O1lBcEJLLENBQUMsR0FBRyxDQUFDOztZQUNILENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU07O1lBQ3pCQyxTQUFNLEdBQUcsVUFBQSxJQUFJLElBQUksT0FBQSxLQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFBOztZQUMzQyxLQUFLLEdBQUcsRUFBRTtRQUVULE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTs7Z0JBQ04sWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQ0EsU0FBTSxDQUFDO1lBQ3hELElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLElBQUksWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ3hELElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3RCO1lBQ0QsQ0FBQyxFQUFFLENBQUM7U0FDUDtRQUNELElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLE9BQU8sR0FBRyxLQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLEdBQUEsQ0FBQyxDQUFDO1FBQ2pGLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUVqQixJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUV2QixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNyQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3JCO0tBQ0Y7Ozs7Ozs7Ozs7O0lBT0QsK0JBQUs7Ozs7O0lBQUwsVUFBTSxTQUFpQjtRQUN2QixTQUFTLEdBQUcsU0FBUyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDdkMsUUFBUSxTQUFTO1lBQ2hCLEtBQUssS0FBSyxDQUFDLEtBQUssQ0FBQztZQUNqQixLQUFLLEtBQUssQ0FBQyxLQUFLO2dCQUNmLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUNwQjtnQkFDQyxPQUFPLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1NBQzVFO0tBQ0Q7Ozs7Ozs7O0lBS0EsaUNBQU87Ozs7SUFBUDtRQUNBLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUV6QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7O1FBSXJCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7UUFJZCxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7S0FDMUI7Ozs7Ozs7Ozs7SUFNRCxrQ0FBUTs7Ozs7SUFBUixVQUFTLFFBQWdCO1FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtZQUN4QixPQUFPLEtBQUssQ0FBQztTQUNiO1FBRUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRWhDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7Ozs7O1FBTXZCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUV6QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFZixJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDekI7Ozs7Ozs7Ozs7Ozs7O0lBU0EseUNBQWU7Ozs7OztJQUFmLFVBQWdCLEtBQVU7O1lBQ3RCLEtBQUssR0FBVyxJQUFJOztZQUN0QixZQUFzQjs7Ozs7OztRQVN4QixZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLHlCQUF5QixFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4RixLQUFLLEdBQUc7WUFDTixDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ25CLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7U0FDcEIsQ0FBQztRQUVKLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUN6QixJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzFCO1FBRUQsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLFdBQVcsRUFBRTtZQUM5QixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FDL0I7UUFFSCxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2QsT0FBTyxLQUFLLENBQUM7S0FDYjs7Ozs7Ozs7SUFLRCx1Q0FBYTs7OztJQUFiO1FBQ0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ3hCOzs7Ozs7Ozs7Ozs7Ozs7SUFTQSw2Q0FBbUI7Ozs7Ozs7SUFBbkIsVUFBb0IsS0FBVSxFQUFFLFFBQWE7O1lBQ3pDLE9BQU8sR0FBRyxJQUFJOztZQUNsQixPQUFPLEdBQUcsSUFBSTs7WUFDZCxJQUFJLEdBQUcsSUFBSTs7WUFDTCxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7O1lBQ25FLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQztRQUVyRCxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN6QixPQUFPLEtBQUssQ0FBQztTQUNiO1FBRUQsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRTtZQUN2QixPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUMzQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUM7WUFDMUQsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLE9BQU8sSUFBSSxPQUFPLEdBQUcsT0FBTyxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUM7U0FDMUU7YUFBTTtZQUNOLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDbEcsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUNsRyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3JELEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsT0FBTyxHQUFHLElBQUksQ0FBQyxFQUFFLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQztTQUN0RTtRQUVELE9BQU8sS0FBSyxDQUFDO0tBQ2I7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBVUEsd0NBQWM7Ozs7Ozs7O0lBQWQsVUFBZSxLQUFVLEVBQUUsT0FBWSxFQUFFLGFBQXlCOztZQUM1RCxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7O1lBQzdELEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU87O1lBQ2pDLFNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsTUFBTSxHQUFHLE9BQU87O1lBQ3pELGFBQXFCOztZQUFFLE9BQWU7O1lBQUUsVUFBa0I7UUFFMUQsSUFBSSxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUM3RCxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN4RSxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLFNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDckYsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNyQixVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEtBQUssQ0FBQyxDQUFDLEdBQUcsU0FBUyxHQUFHLGFBQWEsQ0FBQyxDQUFDO1lBRWhGLElBQUksT0FBTyxLQUFLLFVBQVUsRUFBRTtnQkFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDNUIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ2Q7WUFFRyxPQUFPLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztZQUU5QixJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLEdBQUcsR0FBRyxFQUFFO2dCQUMzRSxhQUFhLEVBQUUsQ0FBQzthQUNaO1NBQ0Y7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN4QixPQUFPO1NBQ1I7UUFDSixJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUE7S0FDeEI7Ozs7Ozs7Ozs7Ozs7OztJQVNELGlDQUFPOzs7Ozs7O0lBQVAsVUFBUSxVQUFrQixFQUFFLFNBQWlCOztZQUN2QyxJQUFJLEdBQUcsRUFBRTs7WUFDZCxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRTs7WUFDakIsV0FBVyxzQkFBYSxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQVk7O1lBQ3pELFFBQVEsR0FBRyxDQUFDLENBQUM7UUFFZCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO1lBQ3pCLFdBQVcsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLFVBQUEsSUFBSTtnQkFDakMsSUFBSSxJQUFJLEtBQUssQ0FBQyxFQUFFO29CQUNmLElBQUksSUFBSSxRQUFRLENBQUM7aUJBQ2pCO2dCQUNELE9BQU8sSUFBSSxDQUFDO2FBQ1osQ0FBQyxDQUFBO1NBQ0Y7Ozs7Ozs7UUFTQSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUU1QyxJQUFJLFNBQVMsS0FBSyxNQUFNLElBQUksVUFBVSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLElBQUksVUFBVSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEVBQUU7Z0JBQ3JHLFFBQVEsR0FBRyxDQUFDLENBQUM7OzthQUdiO2lCQUFNLElBQUksU0FBUyxLQUFLLE9BQU8sSUFBSSxVQUFVLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLElBQUksVUFBVSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxFQUFFO2dCQUM3SCxRQUFRLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNqQjtpQkFBTSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7bUJBQ2hELElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRSxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsRUFBRTtnQkFDNUUsUUFBUSxHQUFHLFNBQVMsS0FBSyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDNUM7aUJBQU0sSUFBSSxTQUFTLEtBQUssSUFBSSxJQUFJLFVBQVUsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxJQUFJLFVBQVUsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFO2dCQUMxRyxRQUFRLEdBQUcsQ0FBQyxDQUFDO2FBQ2I7WUFFRCxJQUFJLFFBQVEsS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFBRSxNQUFLO2FBQUU7U0FDOUI7O1FBR0YsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFOztZQUV4QixJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRSxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRTtnQkFDM0QsUUFBUSxHQUFHLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDdkM7aUJBQU0sSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxHQUFHLEVBQUUsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUU7Z0JBQ2xFLFFBQVEsR0FBRyxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ3ZDO1NBQ0Q7UUFFRCxPQUFPLFFBQVEsQ0FBQztLQUNmOzs7Ozs7Ozs7Ozs7SUFPRCxpQ0FBTzs7Ozs7O0lBQVAsVUFBUSxVQUE2Qjs7WUFDL0JDLFVBQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQztRQUVoQyxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDekIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQ3ZCO1FBRUQsSUFBSUEsVUFBTyxFQUFFO1lBQ1osSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQzNCO1FBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsY0FBYyxHQUFHLFVBQVUsR0FBRyxhQUFhLENBQUM7UUFDdkUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsSUFBSSxJQUFJLEdBQUcsQ0FBQzs7S0FHdkQ7Ozs7Ozs7Ozs7O0lBT0QsNEJBQUU7Ozs7O0lBQUYsVUFBR0MsUUFBYTtRQUNoQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDQSxRQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQ0EsUUFBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3JFOzs7Ozs7Ozs7OztJQU9ELGlDQUFPOzs7OztJQUFQLFVBQVEsUUFBaUI7UUFDekIsSUFBSSxRQUFRLEtBQUssU0FBUyxFQUFFO1lBQzNCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUNyQjtRQUVELElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQzdCLE9BQU8sU0FBUyxDQUFDO1NBQ2pCO1FBRUQsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFcEMsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLFFBQVEsRUFBRTs7Z0JBQ3pCLE9BQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUM7Ozs7WUFNMUYsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7WUFFekIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDbkY7UUFFRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7S0FDcEI7Ozs7Ozs7Ozs7O0lBT0Qsb0NBQVU7Ozs7O0lBQVYsVUFBVyxJQUFZO1FBQ3ZCLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO1lBQzdCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQy9CLElBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQUU7U0FDN0M7UUFDRCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3JDOzs7Ozs7Ozs7O0lBTUQsK0JBQUs7Ozs7O0lBQUwsVUFBTSxRQUFnQjtRQUN0QixRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVwQyxJQUFJLFFBQVEsS0FBSyxTQUFTLEVBQUU7WUFDM0IsT0FBTztTQUNQO1FBRUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFFekIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFFLFdBQVcsRUFBRSxZQUFZLENBQUUsQ0FBQyxDQUFDO1FBRTlDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBRXpDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBRSxXQUFXLEVBQUUsWUFBWSxDQUFFLENBQUMsQ0FBQztLQUM3Qzs7Ozs7Ozs7Ozs7OztJQVFBLG1DQUFTOzs7Ozs7SUFBVCxVQUFVLFFBQWdCLEVBQUUsUUFBa0I7O1lBQ3hDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU07O1lBQ3pCLENBQUMsR0FBRyxRQUFRLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTTtRQUV6QyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3hDLFFBQVEsR0FBRyxTQUFTLENBQUM7U0FDckI7YUFBTSxJQUFJLFFBQVEsR0FBRyxDQUFDLElBQUksUUFBUSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDN0MsUUFBUSxHQUFHLENBQUMsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3BEO1FBRUQsT0FBTyxRQUFRLENBQUM7S0FDZjs7Ozs7Ozs7Ozs7SUFPRCxrQ0FBUTs7Ozs7SUFBUixVQUFTLFFBQWdCO1FBQ3pCLFFBQVEsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDcEMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUN0Qzs7Ozs7Ozs7Ozs7SUFPQSxpQ0FBTzs7Ozs7SUFBUCxVQUFRLFFBQXlCO1FBQXpCLHlCQUFBLEVBQUEsZ0JBQXlCOztZQUMzQixRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVE7O1lBQzFCLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU07O1lBQ3JDLFFBQVE7O1lBQ1Isb0JBQW9COztZQUNwQixZQUFZO1FBRWIsSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFO1lBQ2xCLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1NBQzNEO2FBQU0sSUFBSSxRQUFRLENBQUMsU0FBUyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUU7WUFDaEQsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQzlCLG9CQUFvQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDekQsWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDM0IsT0FBTyxRQUFRLEVBQUUsRUFBRTs7Z0JBRWxCLG9CQUFvQixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7Z0JBQ2hGLElBQUksb0JBQW9CLEdBQUcsWUFBWSxFQUFFO29CQUN4QyxNQUFNO2lCQUNOO2FBQ0Q7WUFDRCxPQUFPLEdBQUcsUUFBUSxHQUFHLENBQUMsQ0FBQztTQUN2QjthQUFNLElBQUksUUFBUSxDQUFDLE1BQU0sRUFBRTtZQUMzQixPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1NBQ2pDO2FBQU07WUFDTixPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQztTQUM5QztRQUVELElBQUksUUFBUSxFQUFFO1lBQ2IsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztTQUNuQztRQUVELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDM0I7Ozs7Ozs7Ozs7O0lBT0QsaUNBQU87Ozs7O0lBQVAsVUFBUSxRQUF5QjtRQUF6Qix5QkFBQSxFQUFBLGdCQUF5QjtRQUNqQyxPQUFPLFFBQVEsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0tBQzlDOzs7Ozs7Ozs7OztJQU9BLCtCQUFLOzs7OztJQUFMLFVBQU0sUUFBaUI7UUFDdkIsSUFBSSxRQUFRLEtBQUssU0FBUyxFQUFFO1lBQzNCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUMzQjtRQUVELFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMxQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0tBQzlCOzs7Ozs7Ozs7OztJQU9ELGlDQUFPOzs7OztJQUFQLFVBQVEsUUFBZ0I7UUFDeEIsSUFBSSxRQUFRLEtBQUssU0FBUyxFQUFFO1lBQzNCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUM3QjtRQUVELFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMxQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDOUI7Ozs7Ozs7Ozs7O0lBT0QsZ0NBQU07Ozs7O0lBQU4sVUFBTyxRQUFpQjs7WUFDbEIsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUM7O1lBQ2xDLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNOztZQUMvQixHQUFHLEdBQUcsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLEdBQUcsS0FBSyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBQTtRQUUxRSxJQUFJLFFBQVEsS0FBSyxTQUFTLEVBQUU7WUFDM0IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQUMsRUFBRSxDQUFDLElBQUssT0FBQSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUEsQ0FBQyxDQUFDO1NBQzFDO1FBRUQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQUMsRUFBRSxDQUFDLElBQUssT0FBQSxDQUFDLEtBQUssUUFBUSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksR0FBQSxDQUFDLENBQUM7S0FDdkY7Ozs7Ozs7Ozs7O0lBT0EsK0JBQUs7Ozs7O0lBQUwsVUFBTSxLQUFjO1FBQ3BCLElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtZQUN4QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztTQUNwQjtRQUVELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztLQUNuQjs7Ozs7Ozs7Ozs7OztJQVFBLHFDQUFXOzs7Ozs7SUFBWCxVQUFZLFFBQWlCO1FBQTdCLGlCQTRCQzs7WUEzQkcsVUFBVSxHQUFHLENBQUM7O1lBQ2pCLFdBQVcsR0FBRyxRQUFRLEdBQUcsQ0FBQzs7WUFDMUIsVUFBVTs7WUFDVixNQUFnQjtRQUVqQixJQUFJLFFBQVEsS0FBSyxTQUFTLEVBQUU7WUFDM0IsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFVBQUMsSUFBSSxFQUFFLEtBQUs7Z0JBQzFDLDBCQUFPLEtBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQVc7YUFDekMsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxNQUFNLENBQUM7U0FDZDtRQUVELElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDekIsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRTtnQkFDdEIsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixXQUFXLEdBQUcsUUFBUSxHQUFHLENBQUMsQ0FBQzthQUMzQjtZQUVELFVBQVUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3pDLFVBQVUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxVQUFVLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsVUFBVSxDQUFDO1NBQ25HO2FBQU07WUFDTixVQUFVLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDakQ7UUFFRCxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUVuQyxPQUFPLFVBQVUsQ0FBQztLQUNqQjs7Ozs7Ozs7Ozs7Ozs7O0lBU08sbUNBQVM7Ozs7Ozs7SUFBakIsVUFBa0IsSUFBWSxFQUFFLEVBQVUsRUFBRSxNQUF5QjtRQUNyRSxJQUFJLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDakIsT0FBTyxDQUFDLENBQUM7U0FDVDtRQUVELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQztLQUN2Rzs7Ozs7Ozs7Ozs7O0lBT0EsNEJBQUU7Ozs7OztJQUFGLFVBQUcsUUFBZ0IsRUFBRSxLQUF1QjtRQUE1QyxpQkFxQ0E7O1lBcENJLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFOztZQUMzQixNQUFNLEdBQUcsSUFBSTs7WUFDYixRQUFRLEdBQUcsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDOztZQUM1QyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRTs7WUFDbkIsU0FBUyxHQUFHLEVBQUUsUUFBUSxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsUUFBUSxHQUFHLENBQUMsQ0FBQzs7WUFDbEQsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTTs7WUFDMUIsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUU7UUFFekIsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRTtZQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxFQUFFO2dCQUM1RCxRQUFRLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQzthQUNuQztZQUVELFFBQVEsR0FBRyxPQUFPLEdBQUcsUUFBUSxDQUFDO1lBQzlCLE1BQU0sR0FBRyxDQUFDLENBQUMsUUFBUSxHQUFHLE9BQU8sSUFBSSxLQUFLLEdBQUcsS0FBSyxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUM7WUFFbEUsSUFBSSxNQUFNLEtBQUssUUFBUSxJQUFJLE1BQU0sR0FBRyxRQUFRLElBQUksT0FBTyxJQUFJLE1BQU0sR0FBRyxRQUFRLEdBQUcsQ0FBQyxFQUFFO2dCQUNqRixPQUFPLEdBQUcsTUFBTSxHQUFHLFFBQVEsQ0FBQztnQkFDNUIsUUFBUSxHQUFHLE1BQU0sQ0FBQztnQkFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDcEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ25CO1NBQ0Q7YUFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO1lBQ2hDLE9BQU8sSUFBSSxDQUFDLENBQUM7WUFDYixRQUFRLEdBQUcsQ0FBQyxRQUFRLEdBQUcsT0FBTyxHQUFHLE9BQU8sSUFBSSxPQUFPLENBQUM7U0FDcEQ7YUFBTTtZQUNOLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO1NBQzFEO1FBRUQsVUFBVSxDQUFDO1lBQ1YsS0FBSSxDQUFDLEtBQUssQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNyRCxLQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRXZCLEtBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNkLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FFTjs7Ozs7Ozs7OztJQU1BLDhCQUFJOzs7OztJQUFKLFVBQUssS0FBdUI7UUFDNUIsS0FBSyxHQUFHLEtBQUssSUFBSSxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUNsRDs7Ozs7Ozs7OztJQU1BLDhCQUFJOzs7OztJQUFKLFVBQUssS0FBdUI7UUFDNUIsS0FBSyxHQUFHLEtBQUssSUFBSSxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUNsRDs7Ozs7Ozs7OztJQU1BLHlDQUFlOzs7OztJQUFmLFVBQWdCLEtBQVc7O1FBRTNCLElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTs7Ozs7O1lBT3hCLE9BQU8sS0FBSyxDQUFDO1NBQ2I7UUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDNUI7Ozs7Ozs7OztJQU1RLG1DQUFTOzs7O0lBQWpCOztZQUNJLEtBQUs7UUFDVCxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDaEIsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDcEI7YUFBTTtZQUNOLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztTQUMvQztRQUNELE9BQU8sS0FBSyxDQUFDO0tBQ2I7Ozs7Ozs7Ozs7SUFNQSxrQ0FBUTs7Ozs7SUFBUixVQUFTLE9BQWlDO1FBQzFDLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDO0tBQ3RCOzs7Ozs7OztJQUtPLDJDQUFpQjs7OztJQUF6Qjs7Ozs7O1lBS0ssT0FBNkI7UUFFakMsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFO1lBQzlDLE9BQU8sR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtnQkFDM0IsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO29CQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ2hDO2FBQ0QsQ0FBQyxDQUFBO1NBQ0Y7UUFFRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUEsS0FBSztZQUN0QyxPQUFPO2dCQUNOLEVBQUUsRUFBRSxLQUFHLEtBQUssQ0FBQyxFQUFJO2dCQUNqQixRQUFRLEVBQUUsS0FBSztnQkFDZixNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU07Z0JBQ3BCLFNBQVMsRUFBRSxLQUFLLENBQUMsU0FBUztnQkFDMUIsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsUUFBUSxFQUFFLEtBQUs7Z0JBQ2YsSUFBSSxFQUFFLE9BQU8sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLO2dCQUM3QyxZQUFZLEVBQUUsS0FBSyxDQUFDLFFBQVE7YUFDNUIsQ0FBQztTQUNGLENBQUMsQ0FBQztLQUNIOzs7Ozs7Ozs7OztJQU9ELDRDQUFrQjs7Ozs7SUFBbEIsVUFBbUIsS0FBaUI7OztZQUU3QixjQUFjLEdBQThCO1lBQ2pELFFBQVEsRUFBRSxLQUFLLENBQUMsUUFBUTtZQUN4QixRQUFRLEVBQUUsS0FBSyxDQUFDLFVBQVU7WUFDMUIsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRO1lBQ3hCLFVBQVUsRUFBRSxLQUFLLENBQUMsVUFBVTtZQUM1QixpQkFBaUIsRUFBRSxLQUFLLENBQUMsZUFBZTtZQUN4QyxrQkFBa0IsRUFBRSxLQUFLLENBQUMsZ0JBQWdCO1NBQzFDO1FBQ0QsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRTtZQUM1QixjQUFjLG9CQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFXLEdBQUcsS0FBSyxDQUFDLGtCQUFrQixDQUFDO1NBQzdFO1FBQ0QsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRTtZQUM3QixjQUFjLG9CQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxHQUFXLEdBQUcsS0FBSyxDQUFDLG1CQUFtQixDQUFDO1NBQy9FO1FBQ0QsT0FBTyxjQUFjLENBQUM7S0FDdEI7Ozs7Ozs7Ozs7Ozs7OztJQVNRLDZCQUFHOzs7Ozs7O0lBQVgsVUFBWSxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVM7O1lBQ3JDLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUc7UUFDN0IsUUFBUSxDQUFDO1lBQ1IsS0FBSyxHQUFHO2dCQUNQLE9BQU8sR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM1QixLQUFLLEdBQUc7Z0JBQ1AsT0FBTyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVCLEtBQUssSUFBSTtnQkFDUixPQUFPLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUIsS0FBSyxJQUFJO2dCQUNSLE9BQU8sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QjtnQkFDQyxNQUFNO1NBQ1A7S0FDRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFXUSxrQ0FBUTs7Ozs7Ozs7OztJQUFoQixVQUFpQixJQUFZLEVBQUUsSUFBVSxFQUFFLFNBQWtCLEVBQUVBLFFBQWMsRUFBRSxLQUFlO1FBQzlGLFFBQVEsSUFBSTtZQUNYLEtBQUssYUFBYTtnQkFDakIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdEMsTUFBTTtZQUNQLEtBQUssUUFBUTtnQkFDWixJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN6QyxNQUFNO1lBQ1AsS0FBSyxTQUFTO2dCQUNiLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzFDLE1BQU07WUFDUCxLQUFLLE1BQU07Z0JBQ1YsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQy9CLE1BQU07WUFDUCxLQUFLLFNBQVM7Z0JBQ2IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbEMsTUFBTTtZQUNQLEtBQUssUUFBUTtnQkFDWixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNqQyxNQUFNO1lBQ1AsS0FBSyxTQUFTO2dCQUNiLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xDLE1BQU07WUFDUCxLQUFLLFNBQVM7Z0JBQ2IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbEMsTUFBTTtZQUNQLEtBQUssV0FBVztnQkFDZixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNwQyxNQUFNO1lBQ1AsS0FBSyxXQUFXO2dCQUNmLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3BDLE1BQU07WUFDUCxLQUFLLFlBQVk7Z0JBQ2hCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3JDLE1BQU07WUFDUDtnQkFDQyxNQUFNO1NBQ1A7S0FFRDs7Ozs7Ozs7OztJQU1BLCtCQUFLOzs7OztJQUFMLFVBQU0sSUFBWTtRQUFsQixpQkFRQztRQVBDLENBQUUsSUFBSSxDQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLFNBQVM7WUFDL0QsSUFBSSxLQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxTQUFTLEVBQUU7Z0JBQ3JELEtBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNwQztZQUVELEtBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7U0FDaEMsQ0FBQyxDQUFDO0tBQ0o7Ozs7Ozs7Ozs7SUFNRiwrQkFBSzs7Ozs7SUFBTCxVQUFNLElBQVk7UUFBbEIsaUJBTUU7UUFMQyxDQUFFLElBQUksQ0FBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxTQUFTO1lBQy9ELElBQUksS0FBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDOUUsS0FBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQzthQUNuQztTQUNGLENBQUMsQ0FBQTtLQUNIOzs7Ozs7Ozs7O0lBTUQsa0NBQVE7Ozs7O0lBQVIsVUFBUyxNQUFXO1FBQXBCLGlCQVlBO1FBWEEsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDcEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7YUFDN0M7aUJBQU07Z0JBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3BGO1lBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQyxHQUFHLEVBQUUsQ0FBQztnQkFDN0UsT0FBTyxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN6RCxDQUFDLENBQUM7U0FDSDtLQUNEOzs7Ozs7Ozs7O0lBTVEsbUNBQVM7Ozs7O0lBQWpCLFVBQWtCLE1BQWdCO1FBQWxDLGlCQUlBO1FBSEEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUs7WUFDbkIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUM7U0FDNUIsQ0FBQyxDQUFDO0tBQ0g7Ozs7Ozs7Ozs7SUFNUSxrQ0FBUTs7Ozs7SUFBaEIsVUFBaUIsTUFBZ0I7UUFBakMsaUJBSUM7UUFIRCxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSztZQUNuQixPQUFPLEtBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDNUIsQ0FBQyxDQUFDO0tBQ0Y7Ozs7Ozs7Ozs7Ozs7SUFRRixpQ0FBTzs7Ozs7O0lBQVAsVUFBUSxLQUFVOztZQUNYLE1BQU0sR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRTtRQUVuQyxLQUFLLEdBQUcsS0FBSyxDQUFDLGFBQWEsSUFBSSxLQUFLLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQztRQUVyRCxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU07WUFDNUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsY0FBYyxJQUFJLEtBQUssQ0FBQyxjQUFjLENBQUMsTUFBTTtZQUNyRSxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUVsQyxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUU7WUFDaEIsTUFBTSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztTQUN2QjthQUFNO1lBQ04sTUFBTSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO1lBQ3pCLE1BQU0sQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztTQUN6QjtRQUVELE9BQU8sTUFBTSxDQUFDO0tBQ2I7Ozs7Ozs7Ozs7O0lBT08sb0NBQVU7Ozs7O0lBQWxCLFVBQW1CLE1BQVc7UUFDOUIsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztLQUNsQzs7Ozs7Ozs7Ozs7SUFPTyw0Q0FBa0I7Ozs7O0lBQTFCLFVBQTJCLEtBQXVCO1FBQ2pELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxPQUFPLEtBQUssS0FBSyxTQUFTLENBQUM7S0FDNUQ7Ozs7Ozs7Ozs7O0lBT08sMkNBQWlCOzs7OztJQUF6QixVQUEwQixLQUFzQjtRQUMvQyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDO0tBQzNEOzs7Ozs7Ozs7OztJQU9PLDRDQUFrQjs7Ozs7SUFBMUIsVUFBMkIsS0FBc0I7UUFDaEQsT0FBTyxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksT0FBTyxLQUFLLEtBQUssU0FBUyxDQUFDO0tBQy9EOzs7Ozs7Ozs7Ozs7Ozs7SUFTQSxvQ0FBVTs7Ozs7OztJQUFWLFVBQVdDLFFBQWEsRUFBRSxNQUFjO1FBQ3hDLE9BQU87WUFDTixDQUFDLEVBQUVBLFFBQUssQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUM7WUFDckIsQ0FBQyxFQUFFQSxRQUFLLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDO1NBQ3JCLENBQUM7S0FDRjs7Z0JBaG5ERCxVQUFVOzs7O0lBa25EWCxzQkFBQztDQWxuREQ7Ozs7Ozs7Ozs7O0FDL0RBO0lBZ0RFLDJCQUFvQixlQUFnQztRQUFoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7Ozs7UUE5QjFDLGlCQUFZLEdBQUcsS0FBSyxDQUFDOzs7O1FBS3JCLFdBQU0sR0FBVSxFQUFFLENBQUM7Ozs7UUFLbkIsYUFBUSxHQUFZO1lBQzVCLFFBQVEsRUFBRSxLQUFLO1lBQ2YsSUFBSSxFQUFFO2dCQUNKLFFBQVEsRUFBRSxLQUFLO2dCQUNmLFFBQVEsRUFBRSxFQUFFO2FBQ2I7WUFDRCxJQUFJLEVBQUU7Z0JBQ0osUUFBUSxFQUFFLEtBQUs7Z0JBQ2YsUUFBUSxFQUFFLEVBQUU7YUFDYjtTQUNGLENBQUM7Ozs7UUFLUSxjQUFTLEdBQWE7WUFDOUIsUUFBUSxFQUFFLEtBQUs7WUFDZixJQUFJLEVBQUUsRUFBRTtTQUNULENBQUM7UUFHQSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7S0FDdkI7Ozs7SUFFRCx1Q0FBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3BDOzs7Ozs7OztJQUtELDBDQUFjOzs7O0lBQWQ7UUFBQSxpQkF1Q0M7O1lBdENPLG9CQUFvQixHQUF1QixJQUFJLENBQUMsZUFBZSxDQUFDLG1CQUFtQixFQUFFLENBQUMsSUFBSSxDQUM5RixHQUFHLENBQUMsVUFBQUQsUUFBSztZQUNQLEtBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNsQixLQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDdkIsS0FBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ1osS0FBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2QsS0FBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNwQyxDQUFDLENBQ0g7Ozs7WUFJSyxnQkFBZ0IsR0FBb0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxJQUFJLENBQ25GLE1BQU0sQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLFVBQVUsR0FBQSxDQUFDLEVBQ2pELEdBQUcsQ0FBQyxVQUFBLElBQUk7WUFDTixLQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7U0FPZixDQUFDLENBQ0g7O1lBRUssa0JBQWtCLEdBQXVCLElBQUksQ0FBQyxlQUFlLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxJQUFJLENBQzFGLEdBQUcsQ0FBQztZQUNGLEtBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN2QixLQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDWixLQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDZCxLQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3BDLENBQUMsQ0FDSDs7WUFFSyxTQUFTLEdBQXVCLEtBQUssQ0FBQyxvQkFBb0IsRUFBRSxnQkFBZ0IsRUFBRSxrQkFBa0IsQ0FBQztRQUN2RyxJQUFJLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQ3hDLGVBQVEsQ0FDVCxDQUFDO0tBQ0g7Ozs7Ozs7O0lBS0Ysc0NBQVU7Ozs7SUFBVjtRQUNHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUM5QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFdkUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBRS9CLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDN0MsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztLQUNoRDs7Ozs7Ozs7SUFLTSwyQ0FBZTs7OztJQUF2Qjs7WUFDSyxDQUFTOztZQUFFLENBQVM7O1lBQUUsQ0FBUzs7WUFDN0IsS0FBSyxHQUFXLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUM7O1lBQzFELEtBQUssR0FBVyxLQUFLLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxNQUFNOztZQUMzRCxPQUFPLEdBQVcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDOztZQUNwRCxLQUFLLEdBQVUsRUFBRTs7WUFDakIsUUFBUSxHQUFlLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUTs7WUFDakQsSUFBSSxHQUFHLFFBQVEsQ0FBQyxNQUFNLElBQUksUUFBUSxDQUFDLFNBQVMsSUFBSSxRQUFRLENBQUMsUUFBUTtjQUNoRSxDQUFDLEdBQUcsUUFBUSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsS0FBSztRQUMzQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFDakIsSUFBSSxRQUFRLENBQUMsT0FBTyxLQUFLLE1BQU0sRUFBRTtZQUNoQyxRQUFRLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMvRDtRQUVELElBQUksUUFBUSxDQUFDLElBQUksSUFBSSxRQUFRLENBQUMsT0FBTyxLQUFLLE1BQU0sRUFBRTtZQUVqRCxLQUFLLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzdDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUN6QixLQUFLLENBQUMsSUFBSSxDQUFDO3dCQUNWLEtBQUssRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDO3dCQUNuQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLEdBQUcsQ0FBQztxQkFDekIsQ0FBQyxDQUFDO29CQUNILElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxLQUFLLE9BQU8sRUFBRTt3QkFDN0MsTUFBTTtxQkFDTjtvQkFDRCxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2lCQUNYO2dCQUNELENBQUMsdUJBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBVSxDQUFDO2FBQzlFO1NBQ0Q7UUFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztLQUNwQjs7Ozs7Ozs7OztJQU1BLGdDQUFJOzs7OztJQUFKO1FBQUEsaUJBc0NDOztZQXJDRyxVQUFrQjs7WUFDZCxRQUFRLEdBQWUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFROztZQUN4RCxLQUFLLEdBQTZCLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFOztZQUM5RCxRQUFRLEdBQUcsS0FBSyxDQUFDLE1BQU0sSUFBSSxRQUFRLENBQUMsS0FBSztRQUU3QyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksUUFBUSxDQUFDO1FBQ25ELElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxRQUFRLENBQUM7UUFFckQsSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFO1lBQ2xCLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7WUFFN0QsSUFBSSxRQUFRLENBQUMsUUFBUSxJQUFJLFVBQVUsS0FBSyxDQUFDLEVBQUU7Z0JBQ3RDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztnQkFDekIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7b0JBQ2hCLEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzt3QkFDdkIsTUFBTSxFQUFFLEtBQUs7d0JBQ2IsRUFBRSxFQUFFLFNBQU8sSUFBSSxDQUFDLEVBQUk7d0JBQ3BCLFlBQVksRUFBRSxJQUFJLENBQUMsVUFBVTt3QkFDN0IsZ0JBQWdCLEVBQUUsSUFBSTtxQkFDdkIsQ0FBQyxDQUFDO2lCQUNKLENBQUMsQ0FBQzthQUNQO2lCQUFNLElBQUksVUFBVSxHQUFHLENBQUMsRUFBRTs7b0JBQ2hCLE1BQU0sR0FBVyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDO2dCQUN0RixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUNuQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7d0JBQ3ZCLE1BQU0sRUFBRSxLQUFLO3dCQUNiLEVBQUUsRUFBRSxVQUFPLENBQUMsR0FBRyxNQUFNLENBQUU7d0JBQ3ZCLGdCQUFnQixFQUFFLEtBQUs7cUJBQ3hCLENBQUMsQ0FBQztpQkFDSjthQUNMO2lCQUFNLElBQUksVUFBVSxHQUFHLENBQUMsRUFBRTtnQkFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUE7YUFDaEU7U0FDQztRQUVELElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDN0MsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztLQUNoRDs7Ozs7Ozs7SUFLRCxrQ0FBTTs7OztJQUFOO1FBQ0UsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3BCOzs7Ozs7OztJQUtPLDZDQUFpQjs7OztJQUF6Qjs7WUFDUSxRQUFRLEdBQWUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFROztZQUN4RCxJQUFJLEdBQVksUUFBUSxDQUFDLElBQUksSUFBSSxRQUFRLENBQUMsTUFBTTs7WUFDaEQsS0FBSyxHQUFXLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFL0UsSUFBSSxRQUFRLENBQUMsR0FBRyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNqRjtRQUVELElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7S0FDOUM7Ozs7Ozs7O0lBS08sdUNBQVc7Ozs7SUFBbkI7O1lBQ00sYUFBcUI7UUFDekIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtZQUM5QixJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxFQUFFO2dCQUN4QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQzthQUNyQjtTQUNGLENBQUMsQ0FBQTtRQUVGLGFBQWEsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDOUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztTQUNsRDtRQUNELElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7S0FDaEQ7Ozs7Ozs7OztJQU1NLG9DQUFROzs7O0lBQWhCOztZQUNTLE9BQU8sR0FBVyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxDQUFDOztZQUNqRixZQUFvQjs7WUFDbEIsS0FBSyxHQUFRLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQUMsSUFBSSxFQUFFLEtBQUs7WUFDaEQsT0FBTyxJQUFJLENBQUMsS0FBSyxJQUFJLE9BQU8sSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLE9BQU8sQ0FBQztTQUNyRCxDQUFDLENBQUMsR0FBRyxFQUFFO1FBRVIsWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSTtZQUN2QyxPQUFPLElBQUksQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxLQUFLLEtBQUssQ0FBQyxHQUFHLENBQUM7U0FDN0QsQ0FBQyxDQUFDO1FBRUgsT0FBTyxZQUFZLENBQUM7S0FDckI7Ozs7Ozs7Ozs7O0lBT00sd0NBQVk7Ozs7O0lBQXBCLFVBQXFCLFNBQTJCOztZQUMzQyxRQUFnQjs7WUFBRSxNQUFjOztZQUM5QixRQUFRLEdBQWUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRO1FBRTFELElBQUksUUFBUSxDQUFDLE9BQU8sS0FBSyxNQUFNLEVBQUU7WUFDaEMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUMzQixNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDNUIsU0FBUyxHQUFHLEVBQUUsUUFBUSxHQUFHLEVBQUUsUUFBUSxDQUFDO1lBQ3BDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsTUFBTSxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUM7U0FDdEU7YUFBTTtZQUNOLFFBQVEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDekUsTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLENBQUMsTUFBTSxDQUFDO1lBQzdDLFNBQVMsR0FBRyxRQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLFFBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7U0FDMUU7UUFFRCxPQUFPLFFBQVEsQ0FBQztLQUNmOzs7Ozs7Ozs7O0lBTUYsZ0NBQUk7Ozs7O0lBQUosVUFBSyxLQUF1QjtRQUN6QixJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQzFEOzs7Ozs7Ozs7O0lBTUQsZ0NBQUk7Ozs7O0lBQUosVUFBSyxLQUF1QjtRQUN6QixJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQzFEOzs7Ozs7Ozs7Ozs7OztJQVFGLDhCQUFFOzs7Ozs7O0lBQUYsVUFBRyxRQUFnQixFQUFFLEtBQXVCLEVBQUUsUUFBa0I7O1lBQzNELE1BQWM7UUFDbEIsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtZQUNqQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDNUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxHQUFHLE1BQU0sSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQzlGO2FBQU07WUFDSCxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDNUM7S0FDQTs7Ozs7Ozs7O0lBS0QscUNBQVM7Ozs7O0lBQVQsVUFBVSxLQUFhOztZQUNmLEtBQUssR0FBVyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxLQUFLLEtBQUssR0FBRyxDQUFDLEVBQUUsR0FBQSxDQUFDO1FBQzVFLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQ3pEOzs7Ozs7Ozs7O0lBTUQsdUNBQVc7Ozs7O0lBQVgsVUFBWSxFQUFVOztZQUNkLFFBQVEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxLQUFLLENBQUMsUUFBUSxLQUFLLEtBQUssR0FBQSxDQUFDO1FBRWhILElBQUksUUFBUSxLQUFLLENBQUMsQ0FBQyxJQUFJLFFBQVEsS0FBSyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ2xFLE9BQU87U0FDUjtRQUVILElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQ3ZFOztnQkFqVUYsVUFBVTs7OztnQkFMRixlQUFlOztJQXdVeEIsd0JBQUM7Q0FuVUQ7Ozs7Ozs7Ozs7QUNlQSxJQUFhLE1BQU0sR0FBRyxJQUFJLGNBQWMsQ0FBQyxhQUFhLENBQUM7Ozs7O0FBS3ZEOzs7OztJQUFBO0tBSUM7SUFIQyxzQkFBSSxtQ0FBWTs7OztRQUFoQjtZQUNFLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztTQUNyQzs7O09BQUE7SUFDSCxnQkFBQztDQUFBLElBQUE7Ozs7QUFLRDs7OztJQUFzQ0Usb0NBQVM7SUFDN0M7ZUFDRSxpQkFBTztLQUNSO0lBS0Qsc0JBQUksMENBQVk7Ozs7Ozs7UUFBaEI7WUFDRSxPQUFPLE1BQU0sQ0FBQztTQUNmOzs7T0FBQTtJQUNILHVCQUFDO0NBWEQsQ0FBc0MsU0FBUyxHQVc5Qzs7Ozs7OztBQVFELFNBQWdCLGFBQWEsQ0FDM0IsZ0JBQWtDLEVBQ2xDLFVBQWtCO0lBRWxCLElBQUksaUJBQWlCLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDakMsT0FBTyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUM7S0FDdEM7SUFDRCxPQUFPLElBQUksTUFBTSxFQUFFLENBQUM7Q0FDckI7Ozs7O0FBS0QsSUFBYSxxQkFBcUIsR0FBa0I7SUFDbEQsT0FBTyxFQUFFLFNBQVM7SUFDbEIsUUFBUSxFQUFFLGdCQUFnQjtDQUMzQjs7Ozs7QUFLRCxJQUFhLGNBQWMsR0FBb0I7SUFDN0MsT0FBTyxFQUFFLE1BQU07SUFDZixVQUFVLEVBQUUsYUFBYTtJQUN6QixJQUFJLEVBQUUsQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDO0NBQy9COzs7OztBQUtELElBQWEsZ0JBQWdCLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxjQUFjLENBQUM7Ozs7Ozs7Ozs7QUMzRXZFLElBQWEsUUFBUSxHQUFHLElBQUksY0FBYyxDQUFXLGVBQWUsQ0FBQzs7Ozs7QUFJckU7Ozs7O0lBQUE7S0FJQztJQUhDLHNCQUFJLHVDQUFjOzs7O1FBQWxCO1lBQ0UsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1NBQ3JDOzs7T0FBQTtJQUNILGtCQUFDO0NBQUEsSUFBQTs7OztBQUtEOzs7O0lBQXdDQSxzQ0FBVztJQUNqRDtlQUNFLGlCQUFPO0tBQ1I7SUFLRCxzQkFBSSw4Q0FBYzs7Ozs7OztRQUFsQjtZQUNFLE9BQU8sUUFBUSxDQUFDO1NBQ2pCOzs7T0FBQTtJQUNILHlCQUFDO0NBWEQsQ0FBd0MsV0FBVyxHQVdsRDs7Ozs7OztBQVFELFNBQWdCLGVBQWUsQ0FDN0Isa0JBQXNDLEVBQ3RDLFVBQWtCO0lBRWxCLElBQUksaUJBQWlCLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDakMsT0FBTyxrQkFBa0IsQ0FBQyxjQUFjLENBQUM7S0FDMUM7SUFDRCxPQUFPLElBQUksTUFBTSxFQUFFLENBQUM7Q0FDckI7Ozs7O0FBS0QsSUFBYSx1QkFBdUIsR0FBa0I7SUFDcEQsT0FBTyxFQUFFLFdBQVc7SUFDcEIsUUFBUSxFQUFFLGtCQUFrQjtDQUM3Qjs7Ozs7QUFLRCxJQUFhLGdCQUFnQixHQUFvQjtJQUMvQyxPQUFPLEVBQUUsUUFBUTtJQUNqQixVQUFVLEVBQUUsZUFBZTtJQUMzQixJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDO0NBQ2pDOzs7OztBQUtELElBQWEsa0JBQWtCLEdBQUcsQ0FBQyx1QkFBdUIsRUFBRSxnQkFBZ0IsQ0FBQzs7Ozs7O0FDekU3RTtJQTJCRSx5QkFBb0IsZUFBZ0MsRUFDeEIsTUFBVyxFQUNULE1BQVc7UUFGckIsb0JBQWUsR0FBZixlQUFlLENBQWlCOzs7O1FBVjVDLGFBQVEsR0FBVyxJQUFJLENBQUM7Ozs7UUFLeEIsWUFBTyxHQUFHLEtBQUssQ0FBQztRQVN0QixJQUFJLENBQUMsTUFBTSxzQkFBRyxNQUFNLEVBQVUsQ0FBQztRQUMvQixJQUFJLENBQUMsTUFBTSxzQkFBRyxNQUFNLEVBQVksQ0FBQztRQUNqQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7S0FDdkI7Ozs7SUFFRCxxQ0FBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDekM7Ozs7Ozs7O0lBS0Qsd0NBQWM7Ozs7SUFBZDtRQUFBLGlCQXNCQzs7WUFyQk8sb0JBQW9CLEdBQXVCLElBQUksQ0FBQyxlQUFlLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxJQUFJLENBQzlGLEdBQUcsQ0FBQztZQUNGLElBQUksS0FBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFO2dCQUMvQyxLQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDWjtTQUNFLENBQUMsQ0FDSDs7WUFFSyxnQkFBZ0IsR0FBb0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxJQUFJLENBQ25GLEdBQUcsQ0FBQyxVQUFBLElBQUk7WUFDTixLQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDcEMsQ0FBQyxDQUNIOzs7O1lBS0ssY0FBYyxHQUF1QixLQUFLLENBQUMsb0JBQW9CLEVBQUUsZ0JBQWdCLENBQUM7UUFDeEYsSUFBSSxDQUFDLG9CQUFvQixHQUFHLGNBQWMsQ0FBQyxTQUFTLENBQ2xELGVBQVEsQ0FDVCxDQUFDO0tBQ0g7Ozs7Ozs7Ozs7OztJQU9GLDhCQUFJOzs7Ozs7SUFBSixVQUFLLE9BQWdCLEVBQUUsS0FBYztRQUNsQyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDckIsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7U0FDMUI7UUFFSCxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3hDLE9BQU87U0FDUDtRQUVELElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRXZDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0tBQzNCOzs7Ozs7Ozs7Ozs7O0lBUU0seUNBQWU7Ozs7OztJQUF2QixVQUF3QixPQUFnQixFQUFFLEtBQWM7UUFBeEQsaUJBVUU7UUFURCxJQUFLLElBQUksQ0FBQyxRQUFRLEVBQUc7WUFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3hDO1FBQ0QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztZQUMxQixJQUFJLEtBQUksQ0FBQyxPQUFPLElBQUksS0FBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksS0FBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7Z0JBQ3ZILE9BQU87YUFDUDtZQUNELEtBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxLQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUM5RSxFQUFFLE9BQU8sSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQztLQUM5RDs7Ozs7Ozs7SUFLTSw4Q0FBb0I7Ozs7SUFBNUI7UUFDQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztLQUN2Qzs7Ozs7Ozs7SUFLRCw4QkFBSTs7OztJQUFKO1FBQ0MsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3pDLE9BQU87U0FDUDtRQUVELElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUN0Qzs7Ozs7Ozs7SUFLRiwrQkFBSzs7OztJQUFMO1FBQ0MsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3pDLE9BQU87U0FDUDtRQUVELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0tBQ25COzs7Ozs7Ozs7O0lBTU8saURBQXVCOzs7OztJQUEvQixVQUFnQyxJQUFJO1FBQ2xDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssVUFBVSxFQUFFO1lBQ3JDLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFO2dCQUMxQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDYjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDYjtTQUNGO2FBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxVQUFVLEVBQUU7O1lBRTVDLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFO2dCQUMxQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQzthQUM3QjtTQUNGO0tBQ0Y7Ozs7Ozs7O0lBS0Qsc0NBQVk7Ozs7SUFBWjtRQUNFLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsa0JBQWtCLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDM0YsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2Q7S0FDRjs7Ozs7Ozs7SUFLRCxnREFBc0I7Ozs7SUFBdEI7UUFDRSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLGtCQUFrQixJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQzNGLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNkO0tBQ0Y7Ozs7Ozs7O0lBS0QsOENBQW9COzs7O0lBQXBCO1FBQ0UsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUMzRixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDZDtLQUNGOztnQkE1S0YsVUFBVTs7OztnQkFMRixlQUFlO2dEQTBCVCxNQUFNLFNBQUMsTUFBTTtnREFDYixNQUFNLFNBQUMsUUFBUTs7SUF1SjlCLHNCQUFDO0NBN0tEOzs7Ozs7QUNQQTtJQVlFLHlCQUFvQixlQUFnQztRQUFoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDbEQsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0tBQ3ZCOzs7O0lBRUQscUNBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3pDOzs7Ozs7OztJQUtELHdDQUFjOzs7O0lBQWQ7UUFBQSxpQkFvQkM7O1lBbkJPLG9CQUFvQixHQUF1QixJQUFJLENBQUMsZUFBZSxDQUFDLG1CQUFtQixFQUFFLENBQUMsSUFBSSxDQUM5RixHQUFHLENBQUM7O2dCQUNJLFVBQVUsR0FBRyxLQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsSUFBSSxDQUFDLEtBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLFFBQVE7WUFDM0YsS0FBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLEdBQUcsSUFBSSxHQUFHLEtBQUssR0FBQSxDQUFDLENBQUM7U0FDeEYsQ0FBQyxDQUNIOztZQUVLLGVBQWUsR0FBb0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLEVBQUU7O1lBRXhFLGdCQUFnQixHQUF1QixJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsRUFBRTs7WUFHN0UsY0FBYyxHQUE2QixLQUFLLENBQUMsb0JBQW9CLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixDQUFDLENBQUMsSUFBSSxDQUNsSCxHQUFHLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxLQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLEdBQUEsQ0FBQyxDQUU5QztRQUNELElBQUksQ0FBQyxvQkFBb0IsR0FBRyxjQUFjLENBQUMsU0FBUyxDQUNsRCxlQUFRLENBQ1QsQ0FBQztLQUNIOzs7OztJQUVPLCtDQUFxQjs7OztJQUE3QixVQUE4QixJQUFTO1FBQXZDLGlCQStCQztRQTlCQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUU7WUFDN0UsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssVUFBVSxLQUFLLElBQUksS0FBSyxhQUFhLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTs7Z0JBQ2xHLFFBQVEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVE7O2dCQUN4QyxNQUFNLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxNQUFNOztnQkFDL0MsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUM7O2dCQUN4RSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7O2dCQUN0QyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxLQUFLLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUM7OztZQUc5SCxJQUFJLFFBQVEsQ0FBQyxhQUFhLEdBQUcsQ0FBQyxFQUFFO2dCQUM5QixDQUFDLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQzs7Z0JBRTVCLElBQUksUUFBUSxDQUFDLElBQUksRUFBRTtvQkFDakIsUUFBUSxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUM7b0JBQ25DLENBQUMsRUFBRSxDQUFDO2lCQUNMO2FBQ0Y7WUFFRCxPQUFPLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRTtnQkFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDakUsSUFBSSxNQUFNLEVBQUU7b0JBQ1YsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFBLENBQUMsQ0FBQztpQkFFMUc7Z0JBQ0QsUUFBUSxFQUFFLENBQUM7YUFDWjtTQUNGO0tBQ0Y7Ozs7Ozs7Ozs7SUFNTywrQkFBSzs7Ozs7SUFBYixVQUFjLFFBQWdCO1FBQzVCLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxFQUFFO1lBQ2xELE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7S0FDdkQ7O2dCQW5GRixVQUFVOzs7O2dCQUhGLGVBQWU7O0lBdUZ4QixzQkFBQztDQXBGRDs7Ozs7O0FDTEE7SUEyQkUsd0JBQW9CLGVBQWdDO1FBQWhDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjs7OztRQVpwRCxhQUFRLEdBQUcsSUFBSSxDQUFDOzs7O1FBS2hCLGFBQVEsR0FBRyxTQUFTLENBQUM7Ozs7UUFLckIsU0FBSSxHQUFHLFNBQVMsQ0FBQztRQUdmLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUN2Qjs7OztJQUVELG9DQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUN4Qzs7Ozs7Ozs7SUFLRCx1Q0FBYzs7OztJQUFkO1FBQUEsaUJBOEJDOztZQTdCTyxlQUFlLEdBQW9CLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxFQUFFLENBQUMsSUFBSSxDQUNqRixHQUFHLENBQUMsVUFBQSxJQUFJO1lBQ04sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxVQUFVLEVBQUU7Z0JBQzFDLEtBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDL0MsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQzthQUNoQztTQUNFLENBQUMsQ0FDSDs7WUFFSyxhQUFhLEdBQXVCLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFOztZQUN2RSxnQkFBZ0IsR0FBdUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLEVBQUU7O1lBQzdFLG1CQUFtQixHQUF1QixJQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQixFQUFFOztZQUVuRixvQkFBb0IsR0FBdUIsS0FBSyxDQUFDLGFBQWEsRUFBRSxnQkFBZ0IsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDLElBQUksQ0FDL0csR0FBRyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLEtBQUssWUFBWSxHQUFBLENBQUMsQ0FDbkQ7O1lBRUssa0JBQWtCLEdBQXVCLElBQUksQ0FBQyxlQUFlLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxJQUFJLENBQzFGLEdBQUcsQ0FBQyxVQUFBLElBQUk7WUFDTixJQUFJLEtBQUksQ0FBQyxRQUFRLEtBQUssS0FBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsVUFBVSxJQUFJLEtBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUMxRyxLQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDZDtTQUNGLENBQUMsQ0FDSDs7WUFFSyxhQUFhLEdBQTZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsa0JBQWtCLEVBQUUsb0JBQW9CLENBQUMsQ0FBQyxJQUFJLEVBQUU7UUFDdkgsSUFBSSxDQUFDLG1CQUFtQixHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQ2hELGVBQVEsQ0FDVCxDQUFDO0tBQ0g7Ozs7Ozs7OztJQU1NLDhCQUFLOzs7O0lBQWI7UUFFQyxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLEtBQUssS0FBSyxDQUFDLEVBQUU7WUFDOUMsT0FBTztTQUNQOzs7O1FBTUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7O1lBRTFCLElBQUk7O1lBQ0YsUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7O1lBQzlELElBQUksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDOztZQUNqRCxRQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsU0FBUzs7WUFDbEQsUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLFVBQVU7UUFFcEQsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxLQUFLLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDckQsT0FBTztTQUNQO1FBRUQsSUFBSSxRQUFRLEVBQUU7WUFDYixJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSztnQkFDM0MsSUFBSSxLQUFLLENBQUMsRUFBRSxLQUFLLFFBQVEsQ0FBQyxFQUFFLEVBQUU7b0JBQzVCLEtBQUssQ0FBQyxJQUFJLEdBQU0sSUFBSSxPQUFJLENBQUM7b0JBQ3pCLEtBQUssQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUN4QixLQUFLLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO29CQUM5QixLQUFLLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO2lCQUNsQzthQUNGLENBQUMsQ0FBQztTQUNOO1FBRUQsSUFBSSxRQUFRLEVBQUU7WUFDVixJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLO2dCQUMzQyxJQUFJLEtBQUssQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLEVBQUUsRUFBRTtvQkFDeEIsS0FBSyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQ3hCLEtBQUssQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO29CQUM3QixLQUFLLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO2lCQUNqQzthQUNGLENBQUMsQ0FBQztTQUNOO0tBQ0Q7Ozs7Ozs7Ozs7SUFNQSw4QkFBSzs7Ozs7SUFBTCxVQUFNLEVBQUU7UUFBUixpQkFhQTtRQVpFLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUs7WUFDM0MsSUFBSSxLQUFLLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFDbkIsS0FBSyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7Z0JBQ2hCLEtBQUssQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO2dCQUN6QixLQUFLLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO2dCQUMvQixLQUFLLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO2dCQUNsQyxLQUFLLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztnQkFDOUIsS0FBSyxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztnQkFDakMsS0FBSyxDQUFDLE9BQU8sR0FBRyxLQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2hFO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLEVBQUUsQ0FBQztLQUN6Qzs7Z0JBbklELFVBQVU7Ozs7Z0JBSEYsZUFBZTs7SUF1SXhCLHFCQUFDO0NBcElEOzs7Ozs7QUNMQTtJQVdFLDJCQUFvQixlQUFnQztRQUFoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDbEQsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0tBQ3ZCOzs7O0lBRUQsdUNBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQzNDOzs7Ozs7OztJQUlELDBDQUFjOzs7O0lBQWQ7UUFBQSxpQkErQkM7O1lBOUJPLG9CQUFvQixHQUF1QixJQUFJLENBQUMsZUFBZSxDQUFDLG1CQUFtQixFQUFFLENBQUMsSUFBSSxDQUM5RixHQUFHLENBQUMsVUFBQSxJQUFJO1lBQ04sSUFBSSxLQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUU7Z0JBQzVDLEtBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUNmO2lCQUFNO2dCQUNMLEtBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxXQUFXLEdBQUcsTUFBTSxHQUFBLENBQUMsQ0FBQzthQUM5RTtTQUNGLENBQUMsQ0FDSDs7WUFFSyxnQkFBZ0IsR0FBb0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxJQUFJLENBQ25GLEdBQUcsQ0FBQyxVQUFBLElBQUk7WUFDTixJQUFJLEtBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxVQUFVLEVBQUM7Z0JBQ3JGLEtBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUNkO1NBQ0UsQ0FBQyxDQUNIOztZQUVLLGtCQUFrQixHQUF1QixJQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQixFQUFFLENBQUMsSUFBSSxDQUMxRixHQUFHLENBQUMsVUFBQSxJQUFJO1lBQ04sSUFBSSxLQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUU7Z0JBQzVDLEtBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUNmO1NBQ0YsQ0FBQyxDQUNIOztZQUVLLFdBQVcsR0FBNkIsS0FBSyxDQUFDLG9CQUFvQixFQUFFLGdCQUFnQixFQUFFLGtCQUFrQixDQUFDO1FBQy9HLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUNqRCxlQUFRLENBQ1QsQ0FBQztLQUNIOzs7Ozs7OztJQUtELGtDQUFNOzs7O0lBQU47O1lBQ1EsS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLEtBQUs7O1lBQzdDLEtBQUssR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRTs7WUFDdEMsR0FBRyxHQUFHLEtBQUssR0FBRyxLQUFLO1FBRXZCLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO1lBQ3hDLEtBQUssR0FBRyxLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQztZQUN0RSxHQUFHLEdBQUcsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxHQUFHLEtBQUssR0FBRyxLQUFLLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQztTQUMzRDtRQUVELElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQUssRUFBRSxDQUFDO1lBQy9DLEtBQUssQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQztTQUNqRSxDQUFDLENBQUM7S0FDSjs7Z0JBakVGLFVBQVU7Ozs7Z0JBSEYsZUFBZTs7SUF1RXhCLHdCQUFDO0NBcEVEOzs7Ozs7QUNMQTtJQWtCRSxxQkFBb0IsZUFBZ0MsRUFDaEMsS0FBcUIsRUFDckIsTUFBYztRQUZkLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2hDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUN2Qjs7OztJQUVELGlDQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNyQzs7Ozs7Ozs7SUFLRCxvQ0FBYzs7OztJQUFkO1FBQUEsaUJBdUJDOztZQXRCTyxvQkFBb0IsR0FBdUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLElBQUksQ0FDOUYsR0FBRyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsYUFBYSxFQUFFLEdBQUEsQ0FBRSxDQUNqQzs7WUFFSyxnQkFBZ0IsR0FBb0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxJQUFJLENBQ25GLEdBQUcsQ0FBQyxVQUFBLElBQUk7WUFDTixJQUFJLEtBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLGVBQWUsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxVQUFVLEVBQUU7O29CQUNoRixXQUFXLEdBQUcsS0FBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUU7O29CQUM1QyxjQUFjLEdBQUcsS0FBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsWUFBWTtnQkFFaEYsSUFBSSxDQUFDLGNBQWMsSUFBSSxjQUFjLEtBQUssS0FBSSxDQUFDLG1CQUFtQixFQUFFO29CQUN4RSxPQUFPO2lCQUNGO2dCQUNELEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBQyxRQUFRLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxLQUFJLENBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQzthQUNsRjtTQUNGLENBQUMsQ0FDSDs7WUFFSyxhQUFhLEdBQTZCLEtBQUssQ0FBQyxvQkFBb0IsRUFBRSxnQkFBZ0IsQ0FBQztRQUM3RixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsYUFBYSxDQUFDLFNBQVMsQ0FDN0MsZUFBUSxDQUNULENBQUM7S0FDSDs7Ozs7Ozs7OztJQU1ELDRCQUFNOzs7OztJQUFOLFVBQU8sUUFBZ0I7O1lBQ2YsUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxZQUFZLEtBQUssUUFBUSxJQUFJLEtBQUssQ0FBQyxRQUFRLEtBQUssS0FBSyxHQUFBLENBQUM7UUFFaEksSUFBSSxRQUFRLEtBQUssQ0FBQyxDQUFDLElBQUksUUFBUSxLQUFLLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDbEUsT0FBTztTQUNSO1FBRUgsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDdkU7Ozs7Ozs7O0lBS0QsbUNBQWE7Ozs7SUFBYjtRQUFBLGlCQVdDOztZQVZPLEtBQUssR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEtBQUssU0FBUyxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQy9FLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDcEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUNaO2FBQ0EsU0FBUyxDQUNSLFVBQUEsUUFBUTtZQUNOLEtBQUksQ0FBQyxtQkFBbUIsR0FBRyxRQUFRLENBQUM7WUFDcEMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN2QixDQUNGLENBQUE7S0FDSjs7Z0JBOUVGLFVBQVU7Ozs7Z0JBSkYsZUFBZTtnQkFFZixjQUFjO2dCQUFFLE1BQU07O0lBaUYvQixrQkFBQztDQS9FRDs7Ozs7O0FDTkE7SUFpQ0ksTUFBTSxHQUFHLENBQUM7QUFFZDtJQWtDRSxnQ0FBbUIsTUFBd0I7UUFBeEIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7Ozs7O1FBNUJsQyxPQUFFLEdBQUcsZUFBYSxNQUFNLEVBQUksQ0FBQzs7Ozs7UUFNOUIsZUFBVSxHQUFHLENBQUMsQ0FBQzs7OztRQVVkLFVBQUssR0FBRyxDQUFDLENBQUM7Ozs7UUFLVixlQUFVLEdBQUcsRUFBRSxDQUFDOzs7O1FBS2hCLGFBQVEsR0FBRyxFQUFFLENBQUM7S0FFd0I7SUFyQi9DLHNCQUNJLDZDQUFTOzs7O1FBR2IsY0FBMEIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFBLEVBQUU7Ozs7O1FBSmxELFVBQ2MsSUFBWTtZQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQztTQUNuRDs7O09BQUE7Ozs7Ozs7Ozs7O0lBeUJELDBDQUFTOzs7OztJQUFULFVBQVUsTUFBVztRQUNyQixPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0tBQ2xDOztnQkEzQ0QsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLDRCQUE0QixFQUFFOzs7O2dCQXpCbkQsV0FBVzs7O3FCQStCVixLQUFLOzRCQU9MLEtBQUs7d0JBU0wsS0FBSzs2QkFLTCxLQUFLOzJCQUtMLEtBQUs7O0lBWVIsNkJBQUM7Q0E1Q0QsSUE0Q0M7Ozs7QUFLRDs7OztJQUFBO0tBR0M7SUFBRCx1QkFBQztDQUFBLElBQUE7O0lBZ0lDLDJCQUNVLEVBQWMsRUFDZCxhQUE0QixFQUM1QixlQUFnQyxFQUNoQyxpQkFBb0MsRUFDcEMsZUFBZ0MsRUFDaEMsZUFBZ0MsRUFDaEMsY0FBOEIsRUFDOUIsaUJBQW9DLEVBQ3BDLFdBQXdCO1FBUnhCLE9BQUUsR0FBRixFQUFFLENBQVk7UUFDZCxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBdkZ4QixlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQW9CLENBQUM7UUFDbEQsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7Ozs7UUFrRGpELG1CQUFjLEdBQUcsS0FBSyxDQUFDO0tBcUNuQjs7OztJQUVKLG9DQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUV0QixJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUM1RCxlQUFlLENBQ2hCLENBQUMsV0FBVyxDQUFDO0tBQ2Y7Ozs7SUFFRCxpREFBcUI7OztJQUFyQjtLQUNDOzs7Ozs7SUFHRCw4Q0FBa0I7Ozs7O0lBQWxCO1FBQ0UsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRTtZQUNoQyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDMUYsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBRXZELElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1NBQzFCO2FBQU07WUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLDREQUE0RCxDQUFDLENBQUM7U0FDM0U7S0FFRjs7OztJQUVELHVDQUFXOzs7SUFBWDtRQUNFLElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQzNCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN2QztRQUVELElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUMzQzs7Ozs7Ozs7OztJQU1ELDBDQUFjOzs7OztJQUFkO1FBQUEsaUJBc0NDO1FBckNDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQixFQUFFLENBQUMsSUFBSSxDQUNyRSxHQUFHLENBQUMsVUFBQSxJQUFJO1lBQ04sS0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQ2xDLEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUNoQyxLQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDbEMsSUFBSSxDQUFDLEtBQUksQ0FBQyxjQUFjLEVBQUU7Z0JBQ3hCLEtBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO2FBQzVCO1lBQ0QsS0FBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQzVCLEtBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUMvQixDQUFDLENBQ0gsQ0FBQztRQUVGLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQixFQUFFLENBQUMsSUFBSSxDQUN4RSxHQUFHLENBQUM7WUFDRixLQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztZQUM1QixLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUM1QyxLQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO1NBQzVCLENBQUMsQ0FDSCxDQUFDO1FBRUYsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUNoRSxHQUFHLENBQUM7WUFDRixLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMxQixDQUFDLEVBQ0YsU0FBUyxDQUNQLGNBQU0sT0FBQSxLQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQixFQUFFLENBQUMsSUFBSSxDQUNsRCxLQUFLLEVBQUUsRUFDUCxHQUFHLENBQUM7WUFDRixLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMzQixDQUFDLENBQ0gsR0FBQSxDQUNGLENBQ0YsQ0FBQztRQUVGLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDekcsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLGVBQVEsQ0FBQyxDQUFDO0tBQ3hFOzs7Ozs7OztJQUtPLDZDQUFpQjs7OztJQUF6QjtRQUFBLGlCQVlDO1FBWEMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sRUFBRTtZQUNoRSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTO2lCQUNuRCxJQUFJLENBQ0gsTUFBTSxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsbUJBQW1CLEtBQUssS0FBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFdBQVcsR0FBQSxDQUFDLEVBQzNHLEtBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxDQUMzRDtpQkFDQSxTQUFTLENBQUM7Z0JBQ1QsS0FBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUNoRyxLQUFJLENBQUMsbUJBQW1CLEdBQUcsS0FBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFdBQVcsQ0FBQzthQUM3RixDQUFDLENBQUM7U0FDTjtLQUNGOzs7Ozs7OztJQUtELDJDQUFlOzs7O0lBQWY7UUFDRSxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsRUFBRSxDQUFDO0tBQ3hDOzs7Ozs7OztJQUtELGdDQUFJOzs7O0lBQUo7UUFDRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ3JFOzs7Ozs7OztJQUtELGdDQUFJOzs7O0lBQUo7UUFDRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ3JFOzs7Ozs7Ozs7SUFLRCxxQ0FBUzs7Ozs7SUFBVCxVQUFVLEtBQWE7UUFDckIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUN6Qzs7Ozs7Ozs7OztJQU1ELDhCQUFFOzs7OztJQUFGLFVBQUcsRUFBVTtRQUNYLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDeEM7Ozs7Ozs7O0lBS0QsZ0RBQW9COzs7O0lBQXBCOztZQUNNLGFBQXFCOztZQUNuQixjQUFjLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjOztZQUNwRCxZQUFZLEdBQWlCLElBQUksQ0FBQyxVQUFVO2FBQy9DLE1BQU0sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxRQUFRLEtBQUssSUFBSSxHQUFBLENBQUM7YUFDeEMsR0FBRyxDQUFDLFVBQUEsS0FBSzs7Z0JBQ0YsRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLEVBQUU7WUFDbkcsT0FBTztnQkFDTCxFQUFFLEVBQUUsRUFBRTtnQkFDTixLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUs7Z0JBQ2xCLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTztnQkFDdEIsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPO2dCQUN0QixNQUFNLEVBQUUsS0FBSyxDQUFDLFVBQVU7YUFDekIsQ0FBQTtTQUNGLENBQUM7UUFDSixhQUFhLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQzlFLElBQUksQ0FBQyxnQkFBZ0IsR0FBRztZQUN0QixhQUFhLEVBQUUsYUFBYTtZQUM1QixNQUFNLEVBQUUsWUFBWTtTQUNyQixDQUFBO0tBQ0Y7Ozs7Ozs7O0lBS0Qsd0NBQVk7Ozs7SUFBWjtRQUNFLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFLENBQUM7S0FDckM7Ozs7Ozs7O0lBS0QsdUNBQVc7Ozs7SUFBWDtRQUNFLElBQUksQ0FBQyxlQUFlLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztLQUMvQzs7Ozs7Ozs7SUFLRCx1Q0FBVzs7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLGVBQWUsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0tBQzdDOztnQkF2VEYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFFBQVEsRUFBRSxtdURBNkJUO29CQUVELFNBQVMsRUFBRTt3QkFDVCxpQkFBaUI7d0JBQ2pCLGVBQWU7d0JBQ2YsZUFBZTt3QkFDZixlQUFlO3dCQUNmLGNBQWM7d0JBQ2QsaUJBQWlCO3dCQUNqQixXQUFXO3FCQUNaOzZCQVRRLGdDQUFnQztpQkFVMUM7Ozs7Z0JBeEhDLFVBQVU7Z0JBT0gsYUFBYTtnQkFFYixlQUFlO2dCQU1mLGlCQUFpQjtnQkFDakIsZUFBZTtnQkFDZixlQUFlO2dCQUNmLGNBQWM7Z0JBQ2QsaUJBQWlCO2dCQUNqQixXQUFXOzs7eUJBdUdqQixlQUFlLFNBQUMsc0JBQXNCOzZCQUd0QyxNQUFNOzJCQUNOLE1BQU07MEJBdUROLEtBQUs7O0lBaU5SLHdCQUFDO0NBelREOzs7Ozs7Ozs7OztBQ3pGQTtJQW1JRSx3QkFBb0IsSUFBWSxFQUNaLEVBQWMsRUFDZCxRQUFtQixFQUNuQixlQUFnQyxFQUNoQyxjQUE4QjtRQUpsRCxpQkFJdUQ7UUFKbkMsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNaLE9BQUUsR0FBRixFQUFFLENBQVk7UUFDZCxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7Ozs7UUEzQjFDLFVBQUssR0FBUTtZQUNuQixJQUFJLEVBQUUsSUFBSTtZQUNWLE1BQU0sRUFBRSxJQUFJO1lBQ1osT0FBTyxFQUFFLElBQUk7WUFDYixLQUFLLEVBQUU7Z0JBQ0wsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsT0FBTyxFQUFFLElBQUk7YUFDZDtZQUNELFNBQVMsRUFBRSxJQUFJO1lBQ2YsTUFBTSxFQUFFLEtBQUs7WUFDYixNQUFNLEVBQUUsS0FBSztTQUNkLENBQUM7Ozs7UUFLTSxrQkFBYSxHQUFHLElBQUksT0FBTyxFQUFPLENBQUM7Ozs7UUF3RDNDLDBCQUFxQixHQUFHLFVBQUMsRUFBRTtZQUN6QixLQUFJLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDN0IsQ0FBQTs7OztRQUtELG1CQUFjLEdBQUcsVUFBQyxFQUFFO1lBQ2xCLEtBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDdEIsQ0FBQTs7OztRQUtELGtCQUFhLEdBQUcsVUFBQyxFQUFFOztZQUVmLEtBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7O1NBRXZCLENBQUE7Ozs7UUErSk8scUJBQWdCLEdBQUc7WUFDekIsS0FBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxjQUFNLE9BQUEsS0FBSyxHQUFBLENBQUMsQ0FBQTtZQUNyRixLQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztTQUN6QixDQUFBO0tBak9zRDs7Ozs7SUFFaEIsb0NBQVc7Ozs7SUFBbEQsVUFBbUQsS0FBSztRQUN0RCxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUFFO1lBQ3JDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDMUI7S0FDRjs7Ozs7SUFFdUMscUNBQVk7Ozs7SUFBcEQsVUFBcUQsS0FBSztRQUN4RCxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUFFO1lBQ3JDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDMUI7S0FDRjs7Ozs7SUFFd0Msc0NBQWE7Ozs7SUFBdEQsVUFBdUQsS0FBSztRQUMxRCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3hCOzs7O0lBRTBCLG9DQUFXOzs7SUFBdEM7UUFDRSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUFFO1lBQ3JDLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7S0FDRjs7OztJQUU0QixzQ0FBYTs7O0lBQTFDO1FBQ0UsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsRUFBRTtZQUNyQyxPQUFPLEtBQUssQ0FBQztTQUNkO0tBQ0Y7Ozs7SUFFRCxpQ0FBUTs7O0lBQVI7UUFBQSxpQkFNQztRQUxDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsYUFBYTthQUMxQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDYixTQUFTLENBQUM7WUFDVCxLQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDckIsQ0FBQyxDQUFDO0tBQ047Ozs7SUFFRCxvQ0FBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDeEM7Ozs7Ozs7Ozs7Ozs7SUErQk0scUNBQVk7Ozs7OztJQUFwQixVQUFxQixLQUFLO1FBQTFCLGlCQXdCRTs7WUF2QkcsS0FBSyxHQUFXLElBQUk7UUFFeEIsSUFBSSxLQUFLLENBQUMsS0FBSyxLQUFLLENBQUMsRUFBRTtZQUN0QixPQUFPO1NBQ0w7UUFFRCxLQUFLLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXZDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUNqQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQy9CLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFFekIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNyRixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFdkYsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztZQUMxQixLQUFJLENBQUMsb0JBQW9CLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRSxLQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUNwRyxLQUFJLENBQUMsb0JBQW9CLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRSxLQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztTQUNyRyxDQUFDLENBQUM7S0FFSjs7Ozs7Ozs7OztJQU1PLDJDQUFrQjs7Ozs7SUFBMUIsVUFBMkIsS0FBSztRQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNO1lBQUUsT0FBTyxLQUFLLENBQUM7O1lBQy9CLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEUsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUNyQjtRQUVELElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBRTVCLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUM5RCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDMUIsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBRXpCLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV2QyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDMUYsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRTFGLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUV2QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7O0tBRWhDOzs7Ozs7Ozs7O0lBTU8sbURBQTBCOzs7OztJQUFsQyxVQUFtQyxLQUFVOztZQUN2QyxNQUFNLEdBQXVCLEtBQUssQ0FBQyxNQUFNO1FBQzdDLE9BQU8sTUFBTSxJQUFJLEVBQUUsTUFBTSxZQUFZLGlCQUFpQixDQUFDLEVBQUU7WUFDdkQsTUFBTSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUM7U0FDL0I7UUFDRCxJQUFJLE1BQU0sWUFBWSxpQkFBaUIsRUFBRTtZQUN2QyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsY0FBTSxPQUFBLEtBQUssR0FBQSxDQUFDLENBQUM7U0FDeEU7S0FDRjs7Ozs7Ozs7Ozs7O0lBT00sb0NBQVc7Ozs7OztJQUFuQixVQUFvQixLQUFLO1FBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU07WUFBRSxPQUFPLEtBQUssQ0FBQzs7WUFFakMsS0FBYTs7WUFDWCxXQUFXLEdBQXFCLElBQUksQ0FBQyxlQUFlLENBQUMsbUJBQW1CLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUM7UUFFakcsSUFBSSxXQUFXLEtBQUssS0FBSyxFQUFFO1lBQ3pCLE9BQU87U0FDUjtRQUNELEtBQUssc0JBQUcsV0FBVyxFQUFVLENBQUM7UUFFaEMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXJCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNqRDs7Ozs7Ozs7OztJQU1PLGlDQUFROzs7OztJQUFoQixVQUFpQixVQUFrQjtRQUNqQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsV0FBVyxFQUFFLGlCQUFlLFVBQVUsZUFBWSxDQUFDLENBQUM7UUFDOUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztLQUMvRTs7Ozs7Ozs7Ozs7OztJQVFNLG1DQUFVOzs7Ozs7SUFBbEIsVUFBbUIsS0FBSztRQUNyQixJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBRS9DLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUMzRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFDLElBQUksR0FBRSxHQUFHLENBQUMsQ0FBQztZQUV2TSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1NBQzFCO1FBRUQsSUFBSSxDQUFDLEtBQUssR0FBRztZQUNYLElBQUksRUFBRSxJQUFJO1lBQ1YsTUFBTSxFQUFFLElBQUk7WUFDWixPQUFPLEVBQUUsSUFBSTtZQUNiLEtBQUssRUFBRTtnQkFDTCxLQUFLLEVBQUUsSUFBSTtnQkFDWCxPQUFPLEVBQUUsSUFBSTthQUNkO1lBQ0QsU0FBUyxFQUFFLElBQUk7WUFDZixNQUFNLEVBQUUsS0FBSztZQUNiLE1BQU0sRUFBRSxLQUFLO1NBQ2QsQ0FBQzs7UUFHRixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7S0FDekI7Ozs7Ozs7Ozs7O0lBT08seUNBQWdCOzs7OztJQUF4QixVQUF5QixLQUFVO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDcEQ7Ozs7Ozs7Ozs7SUFjTyx3Q0FBZTs7Ozs7SUFBdkIsVUFBd0IsS0FBVTtRQUNoQyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztLQUMvRTs7Ozs7Ozs7Ozs7SUFPTyxpQ0FBUTs7Ozs7SUFBaEIsVUFBaUIsS0FBVTtRQUN6QixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzVDOzs7Ozs7Ozs7Ozs7O0lBUU8sb0NBQVc7Ozs7OztJQUFuQixVQUFvQixNQUFjLEVBQUUsTUFBYztRQUNoRCxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztLQUN4RDs7Ozs7Ozs7Ozs7SUFPTyw0QkFBRzs7Ozs7SUFBWCxVQUFZLGFBQXFCO1FBQy9CLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUM7S0FDL0M7Ozs7Ozs7Ozs7SUFNTywrQkFBTTs7Ozs7SUFBZCxVQUFlLElBQVk7UUFDekIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDbEM7Ozs7Ozs7O0lBS08scUNBQVk7Ozs7SUFBcEI7UUFDRSxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3BDOzs7Ozs7OztJQUtELHdDQUFlOzs7O0lBQWY7UUFDRSxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsRUFBRSxDQUFDO0tBQ3hDOzs7Ozs7OztJQUtPLHVDQUFjOzs7O0lBQXRCO1FBQ0UsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztLQUN0Qzs7Ozs7Ozs7OztJQU1ELDhCQUFLOzs7OztJQUFMLFVBQU0sRUFBRTtRQUNOLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQy9COztnQkFuYUYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxXQUFXO29CQUNyQixRQUFRLEVBQUUseXVDQXFCVDtvQkFDRCxVQUFVLEVBQUU7d0JBQ1YsT0FBTyxDQUFDLFlBQVksRUFBRTs0QkFDcEIsS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsRUFBQyxNQUFNLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQzs0QkFDbkMsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsRUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFDLENBQUMsQ0FBQzs0QkFDbkMsVUFBVSxDQUFDLGdCQUFnQixFQUFFOztnQ0FFM0IsT0FBTyxDQUFDLGFBQWEsQ0FBQzs2QkFDdkIsQ0FBQzs0QkFDRixVQUFVLENBQUMsZ0JBQWdCLEVBQUU7O2dDQUUzQixPQUFPLENBQUMsR0FBRyxDQUFDOzZCQUNiLENBQUM7eUJBQ0gsQ0FBQztxQkFDSDtpQkFDRjs7OztnQkFwRG1CLE1BQU07Z0JBQUUsVUFBVTtnQkFBZ0IsU0FBUztnQkFDdEQsZUFBZTtnQkFLZixjQUFjOzs7K0JBbURwQixLQUFLOzRCQVFMLEtBQUs7NkJBS0wsS0FBSzs4QkFtRUwsWUFBWSxTQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQzsrQkFNcEMsWUFBWSxTQUFDLFlBQVksRUFBRSxDQUFDLFFBQVEsQ0FBQztnQ0FNckMsWUFBWSxTQUFDLGFBQWEsRUFBRSxDQUFDLFFBQVEsQ0FBQzs4QkFJdEMsWUFBWSxTQUFDLFdBQVc7Z0NBTXhCLFlBQVksU0FBQyxhQUFhOztJQW1SN0IscUJBQUM7Q0FwYUQ7Ozs7OztBQ2RBO0lBNEJFLGdDQUNZLE1BQWMsRUFBVSxLQUFxQixFQUM5QixRQUFnQixFQUFFLFFBQW1CLEVBQUUsRUFBYztRQURwRSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFOaEQsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNsQixhQUFRLEdBQVUsRUFBRSxDQUFDO1FBTzNCLElBQUksUUFBUSxJQUFJLElBQUksRUFBRTtZQUNwQixRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQzFEO0tBQ0Y7SUFFRCxzQkFDSSxpREFBYTs7Ozs7UUFEakIsVUFDa0IsUUFBc0I7WUFDdEMsSUFBSSxRQUFRLElBQUksSUFBSSxFQUFFO2dCQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsUUFBUSxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDakU7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7YUFDcEI7U0FDRjs7O09BQUE7SUFLRCxzQkFDSSx1REFBbUI7Ozs7Ozs7OztRQUR2QixVQUN3QixLQUFjO1lBQ3BDLElBQUksU0FBUyxFQUFFLHVCQUFTLE9BQU8sRUFBQSx1QkFBUyxPQUFPLENBQUMsSUFBSSxFQUFBLEVBQUU7Z0JBQ3BELE9BQU8sQ0FBQyxJQUFJLENBQUMsc0VBQXNFLENBQUMsQ0FBQzthQUN0RjtZQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1NBQ3ZCOzs7T0FBQTs7OztJQUdELHdDQUFPOzs7SUFEUDs7WUFFUSxNQUFNLEdBQUc7WUFDYixrQkFBa0IsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1lBQzFELFVBQVUsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztTQUMzQztRQUNELElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNoRCxPQUFPLElBQUksQ0FBQztLQUNiO0lBRUQsc0JBQUksMkNBQU87Ozs7UUFBWDtZQUNFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDOUMsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLO2dCQUN0QixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7Z0JBQzdCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtnQkFDdkIsbUJBQW1CLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQ2pELG1CQUFtQixFQUFFLElBQUksQ0FBQyxtQkFBbUI7Z0JBQzdDLGdCQUFnQixFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7YUFDdkQsQ0FBQyxDQUFDO1NBQ0o7OztPQUFBOztnQkF0RUYsU0FBUyxTQUFDLEVBQUMsUUFBUSxFQUFFLHdCQUF3QixFQUFDOzs7O2dCQUpYLE1BQU07Z0JBQUUsY0FBYzs2Q0EwQm5ELFNBQVMsU0FBQyxVQUFVO2dCQTdCdUUsU0FBUztnQkFBN0UsVUFBVTs7OzhCQVVyQyxLQUFLOzJCQUVMLEtBQUs7c0NBRUwsS0FBSzttQ0FFTCxLQUFLO3FDQUVMLEtBQUs7NkJBRUwsS0FBSzsyQkFFTCxLQUFLO2dDQWFMLEtBQUs7c0NBWUwsS0FBSzswQkFRTCxZQUFZLFNBQUMsT0FBTzs7SUF1QnZCLDZCQUFDO0NBdkVELElBdUVDOzs7Ozs7Ozs7Ozs7QUFhRDtJQTJCRSx3Q0FDWSxNQUFjLEVBQVUsS0FBcUIsRUFDN0MsZ0JBQWtDO1FBRjlDLGlCQVFDO1FBUFcsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQzdDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFickMsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUVsQixhQUFRLEdBQVUsRUFBRSxDQUFDO1FBWTNCLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBQyxDQUFjO1lBQ3pELElBQUksQ0FBQyxZQUFZLGFBQWEsRUFBRTtnQkFDOUIsS0FBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7YUFDL0I7U0FDRixDQUFDLENBQUM7S0FDSjtJQUVELHNCQUNJLHlEQUFhOzs7OztRQURqQixVQUNrQixRQUFzQjtZQUN0QyxJQUFJLFFBQVEsSUFBSSxJQUFJLEVBQUU7Z0JBQ3BCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxRQUFRLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNqRTtpQkFBTTtnQkFDTCxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQzthQUNwQjtTQUNGOzs7T0FBQTtJQUVELHNCQUNJLCtEQUFtQjs7Ozs7UUFEdkIsVUFDd0IsS0FBYztZQUNwQyxJQUFJLFNBQVMsRUFBRSx1QkFBUyxPQUFPLEVBQUEsdUJBQVMsT0FBTyxDQUFDLElBQUksRUFBQSxFQUFFO2dCQUNwRCxPQUFPLENBQUMsSUFBSSxDQUFDLHFFQUFxRSxDQUFDLENBQUM7YUFDckY7WUFDRCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztTQUN2Qjs7O09BQUE7Ozs7O0lBRUQsb0RBQVc7Ozs7SUFBWCxVQUFZLE9BQVcsSUFBUyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxFQUFFOzs7O0lBQ2hFLG9EQUFXOzs7SUFBWCxjQUFxQixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUU7Ozs7Ozs7O0lBR3ZELGdEQUFPOzs7Ozs7O0lBRFAsVUFDUSxNQUFjLEVBQUUsT0FBZ0IsRUFBRSxPQUFnQixFQUFFLFFBQWlCO1FBQzNFLElBQUksTUFBTSxLQUFLLENBQUMsSUFBSSxPQUFPLElBQUksT0FBTyxJQUFJLFFBQVEsRUFBRTtZQUNsRCxPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsSUFBSSxPQUFPLElBQUksQ0FBQyxNQUFNLEtBQUssUUFBUSxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssT0FBTyxFQUFFO1lBQzlELE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsT0FBTyxLQUFLLENBQUM7U0FDZDs7WUFFSyxNQUFNLEdBQUc7WUFDYixrQkFBa0IsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1lBQzFELFVBQVUsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztTQUMzQztRQUNELElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDaEQsT0FBTyxLQUFLLENBQUM7S0FDZDs7OztJQUVPLCtEQUFzQjs7O0lBQTlCO1FBQ0UsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7S0FDOUY7SUFFRCxzQkFBSSxtREFBTzs7OztRQUFYO1lBQ0UsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUM5QyxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUs7Z0JBQ3RCLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztnQkFDN0IsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO2dCQUN2QixtQkFBbUIsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDakQsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLG1CQUFtQjtnQkFDN0MsZ0JBQWdCLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQzthQUN2RCxDQUFDLENBQUM7U0FDSjs7O09BQUE7O2dCQTVGRixTQUFTLFNBQUMsRUFBQyxRQUFRLEVBQUUsa0JBQWtCLEVBQUM7Ozs7Z0JBeEZMLE1BQU07Z0JBQUUsY0FBYztnQkFKbEQsZ0JBQWdCOzs7eUJBK0ZyQixXQUFXLFNBQUMsYUFBYSxjQUFHLEtBQUs7OEJBRWpDLEtBQUs7MkJBRUwsS0FBSztzQ0FFTCxLQUFLO21DQUVMLEtBQUs7cUNBRUwsS0FBSzs2QkFFTCxLQUFLOzJCQUNMLEtBQUs7dUJBU0wsV0FBVztnQ0FZWCxLQUFLO3NDQVNMLEtBQUs7MEJBV0wsWUFBWSxTQUFDLE9BQU8sRUFBRSxDQUFDLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUIsQ0FBQzs7SUFvQ2pHLHFDQUFDO0NBN0ZELElBNkZDOzs7OztBQUVELFNBQVMsYUFBYSxDQUFDLENBQU07SUFDM0IsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDeEI7Ozs7OztBQzdMRDtJQXFCTSxNQUFNLEdBQVcsRUFBRTtBQUd6QjtJQUFBO0tBUzhCOztnQkFUN0IsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZOzt3QkFFWixZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztxQkFBQztvQkFDaEMsWUFBWSxFQUFFLENBQUMsaUJBQWlCLEVBQUUsc0JBQXNCLEVBQUUsY0FBYyxFQUFFLHNCQUFzQixFQUFFLDhCQUE4QixDQUFDO29CQUNqSSxPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxzQkFBc0IsRUFBRSxzQkFBc0IsRUFBRSw4QkFBOEIsQ0FBQztvQkFDNUcsU0FBUyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsYUFBYSxFQUFFLGtCQUFrQixDQUFDO2lCQUNqRTs7SUFDNEIscUJBQUM7Q0FUOUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=