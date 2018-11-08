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
        if (items >= this._items.length) {
            result = this._items.length;
            console.log('option \'items\' in your options is bigger than number of slides; This option is updated to current number of slides and navigation got disabled');
        }
        else {
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
        this.carouselService.setup(this.carouselWindowWidth, this.slides.toArray(), this.options);
        this.carouselService.initialize(this.slides.toArray());
        this._winResizeWatcher();
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
                    template: "\n    <div class=\"owl-carousel owl-theme\" #owlCarousel\n      [ngClass]=\"{'owl-rtl': owlDOMData?.rtl,\n                  'owl-loaded': owlDOMData?.isLoaded,\n                  'owl-responsive': owlDOMData?.isResponsive,\n                  'owl-drag': owlDOMData?.isMouseDragable,\n                  'owl-grab': owlDOMData?.isGrab}\"\n      (mouseover)=\"startPausing()\"\n      (mouseleave)=\"startPlayML()\"\n      (touchstart)=\"startPausing()\"\n      (touchend)=\"startPlayTE()\">\n\n      <div *ngIf=\"carouselLoaded\" class=\"owl-stage-outer\">\n        <owl-stage [owlDraggable]=\"{'isMouseDragable': owlDOMData?.isMouseDragable, 'isTouchDragable': owlDOMData?.isTouchDragable}\"\n                    [stageData]=\"stageData\"\n                    [slidesData]=\"slidesData\"></owl-stage>\n      </div> <!-- /.owl-stage-outer -->\n      <div class=\"owl-nav\" [ngClass]=\"{'disabled': navData?.disabled}\">\n        <div class=\"owl-prev\" [ngClass]=\"{'disabled': navData?.prev?.disabled}\" (click)=\"prev()\" [innerHTML]=\"navData?.prev?.htmlText\"></div>\n        <div class=\"owl-next\" [ngClass]=\"{'disabled': navData?.next?.disabled}\" (click)=\"next()\" [innerHTML]=\"navData?.next?.htmlText\"></div>\n      </div> <!-- /.owl-nav -->\n      <div class=\"owl-dots\" [ngClass]=\"{'disabled': dotsData?.disabled}\">\n        <div *ngFor=\"let dot of dotsData?.dots\" class=\"owl-dot\" [ngClass]=\"{'active': dot.active, 'owl-dot-text': dot.showInnerContent}\" (click)=\"moveByDot(dot.id)\">\n          <span [innerHTML]=\"dot.innerContent\"></span>\n        </div>\n      </div> <!-- /.owl-dots -->\n    </div> <!-- /.owl-carousel owl-loaded -->\n  ",
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW93bC1jYXJvdXNlbC1vLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vbGliL3NlcnZpY2VzL3Jlc2l6ZS5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vbGliL2Nhcm91c2VsL293bC1jYXJvdXNlbC1vLWNvbmZpZy50cyIsIm5nOi8vbmd4LW93bC1jYXJvdXNlbC1vL2xpYi9zZXJ2aWNlcy9jYXJvdXNlbC5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vbGliL3NlcnZpY2VzL25hdmlnYXRpb24uc2VydmljZS50cyIsIm5nOi8vbmd4LW93bC1jYXJvdXNlbC1vL2xpYi9zZXJ2aWNlcy93aW5kb3ctcmVmLnNlcnZpY2UudHMiLCJuZzovL25neC1vd2wtY2Fyb3VzZWwtby9saWIvc2VydmljZXMvZG9jdW1lbnQtcmVmLnNlcnZpY2UudHMiLCJuZzovL25neC1vd2wtY2Fyb3VzZWwtby9saWIvc2VydmljZXMvYXV0b3BsYXkuc2VydmljZS50cyIsIm5nOi8vbmd4LW93bC1jYXJvdXNlbC1vL2xpYi9zZXJ2aWNlcy9sYXp5bG9hZC5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vbGliL3NlcnZpY2VzL2FuaW1hdGUuc2VydmljZS50cyIsIm5nOi8vbmd4LW93bC1jYXJvdXNlbC1vL2xpYi9zZXJ2aWNlcy9hdXRvaGVpZ2h0LnNlcnZpY2UudHMiLCJuZzovL25neC1vd2wtY2Fyb3VzZWwtby9saWIvc2VydmljZXMvaGFzaC5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vbGliL2Nhcm91c2VsL2Nhcm91c2VsLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LW93bC1jYXJvdXNlbC1vL2xpYi9jYXJvdXNlbC9zdGFnZS9zdGFnZS5jb21wb25lbnQudHMiLCJuZzovL25neC1vd2wtY2Fyb3VzZWwtby9saWIvY2Fyb3VzZWwvb3dsLXJvdXRlci1saW5rLmRpcmVjdGl2ZS50cyIsIm5nOi8vbmd4LW93bC1jYXJvdXNlbC1vL2xpYi9jYXJvdXNlbC9jYXJvdXNlbC5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnRNYW5hZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgUmVzaXplU2VydmljZSB7XHJcbiAgLyoqXHJcbiAgICogV2lkdGggb2Ygd2luZG93XHJcbiAgICovXHJcbiAgcHVibGljIHdpbmRvd1dpZHRoOiBhbnk7XHJcblxyXG4gIC8qKlxyXG4gICAqIE1ha2VzIHJlc2l6ZVN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcclxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIHJlc2l6ZVN1YmplY3RcclxuICAgKi9cclxuICBnZXQgb25SZXNpemUkKCk6IE9ic2VydmFibGU8V2luZG93PiB7XHJcbiAgICByZXR1cm4gdGhpcy5yZXNpemVTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3ViamVjdCBvZiAncmVzaXplJyBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVzaXplU3ViamVjdDogU3ViamVjdDxXaW5kb3c+O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGV2ZW50TWFuYWdlcjogRXZlbnRNYW5hZ2VyKSB7XHJcbiAgICB0aGlzLnJlc2l6ZVN1YmplY3QgPSBuZXcgU3ViamVjdCgpO1xyXG4gICAgdGhpcy5ldmVudE1hbmFnZXIuYWRkR2xvYmFsRXZlbnRMaXN0ZW5lcihcclxuICAgICAgJ3dpbmRvdycsXHJcbiAgICAgICdyZXNpemUnLFxyXG4gICAgICB0aGlzLm9uUmVzaXplLmJpbmQodGhpcylcclxuICAgICk7XHJcbiAgICB0aGlzLmV2ZW50TWFuYWdlci5hZGRHbG9iYWxFdmVudExpc3RlbmVyKFxyXG4gICAgICAnd2luZG93JyxcclxuICAgICAgJ29ubG9hZCcsXHJcbiAgICAgIHRoaXMub25Mb2FkZWQuYmluZCh0aGlzKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhbmRsZXIgb2YgJ3Jlc2l6ZScgZXZlbnQuIFBhc3NlcyBkYXRhIHRocm93IHJlc2l6ZVN1YmplY3RcclxuICAgKiBAcGFyYW0gZXZlbnQgRXZlbnQgT2JqZWN0IG9mICdyZXNpemUnIGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvblJlc2l6ZShldmVudDogVUlFdmVudCkge1xyXG4gICAgdGhpcy5yZXNpemVTdWJqZWN0Lm5leHQoPFdpbmRvdz5ldmVudC50YXJnZXQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlciBvZiAnb25sb2FkJyBldmVudC4gRGVmaW5lcyB0aGUgd2lkdGggb2Ygd2luZG93XHJcbiAgICogQHBhcmFtIGV2ZW50IEV2ZW50IE9iamVjdCBvZiAnb25sb2FkJyBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25Mb2FkZWQoZXZlbnQ6IFVJRXZlbnQpIHtcclxuICAgIHRoaXMud2luZG93V2lkdGggPSA8V2luZG93PmV2ZW50LnRhcmdldDtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgT3dsT3B0aW9ucyB9IGZyb20gXCIuLi9tb2RlbHMvb3dsLW9wdGlvbnMubW9kZWxcIjtcclxuXHJcbi8qKlxyXG4gKiBEZWZhdWx0cyB2YWx1ZSBvZiBvcHRpb25zXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgT3dsQ2Fyb3VzZWxPQ29uZmlnIGltcGxlbWVudHMgT3dsT3B0aW9ucyB7XHJcbiAgaXRlbXMgPSAzO1xyXG4gIGxvb3AgPSBmYWxzZTtcclxuICBjZW50ZXIgPSBmYWxzZTtcclxuICByZXdpbmQgPSBmYWxzZTtcclxuXHJcbiAgbW91c2VEcmFnID0gdHJ1ZTtcclxuICB0b3VjaERyYWcgPSB0cnVlO1xyXG4gIHB1bGxEcmFnID0gdHJ1ZTtcclxuICBmcmVlRHJhZyA9IGZhbHNlO1xyXG5cclxuICBtYXJnaW4gPSAwO1xyXG4gIHN0YWdlUGFkZGluZyA9IDA7XHJcblxyXG4gIG1lcmdlID0gZmFsc2U7XHJcbiAgbWVyZ2VGaXQgPSB0cnVlO1xyXG4gIGF1dG9XaWR0aCA9IGZhbHNlO1xyXG5cclxuICBzdGFydFBvc2l0aW9uID0gMDtcclxuICBydGwgPSBmYWxzZTtcclxuXHJcbiAgc21hcnRTcGVlZCA9IDI1MDtcclxuICBmbHVpZFNwZWVkID0gZmFsc2U7XHJcbiAgZHJhZ0VuZFNwZWVkID0gZmFsc2U7XHJcblxyXG4gIHJlc3BvbnNpdmUgPSB7fTtcclxuICByZXNwb25zaXZlUmVmcmVzaFJhdGUgPSAyMDA7XHJcblxyXG4gIC8vIGRlZmF1bHRzIHRvIE5hdmlnYXRpb25cclxuICBuYXYgPSBmYWxzZTtcclxuICBuYXZUZXh0ID0gWyAncHJldicsICduZXh0JyBdO1xyXG4gIG5hdlNwZWVkID0gZmFsc2U7XHJcbiAgc2xpZGVCeSA9IDE7IC8vIHN0YWdlIG1vdmVzIG9uIDEgd2lkdGggb2Ygc2xpZGU7IGlmIHNsaWRlQnkgPSAyLCBzdGFnZSBtb3ZlcyBvbiAyIHdpZHRocyBvZiBzbGlkZVxyXG4gIGRvdHMgPSB0cnVlO1xyXG4gIGRvdHNFYWNoID0gZmFsc2U7XHJcbiAgZG90c0RhdGEgPSBmYWxzZTtcclxuICBkb3RzU3BlZWQgPSBmYWxzZTtcclxuXHJcbiAgLy8gZGVmYXVsdHMgdG8gQXV0b3BsYXlcclxuICBhdXRvcGxheSA9IGZhbHNlO1xyXG4gIGF1dG9wbGF5VGltZW91dCA9IDUwMDA7XHJcbiAgYXV0b3BsYXlIb3ZlclBhdXNlID0gZmFsc2U7XHJcbiAgYXV0b3BsYXlTcGVlZCA9IGZhbHNlO1xyXG5cclxuICAvLyBkZWZhdWx0cyB0byBMYXp5TG9hZGluZ1xyXG4gIGxhenlMb2FkID0gZmFsc2U7XHJcbiAgbGF6eUxvYWRFYWdlciA9IDA7XHJcblxyXG4gIC8vIGRlZmF1bHRzIHRvIEFuaW1hdGVcclxuICBhbmltYXRlT3V0ID0gZmFsc2U7XHJcbiAgYW5pbWF0ZUluID0gZmFsc2U7XHJcblxyXG4gIC8vIGRlZmF1bHRzIHRvIEF1dG9IZWlnaHRcclxuICBhdXRvSGVpZ2h0ID0gZmFsc2U7XHJcblxyXG4gIC8vIGRlZmF1bHRzIHRvIEhhc2hcclxuICBVUkxoYXNoTGlzdGVuZXIgPSBmYWxzZTtcclxuICBjb25zdHJ1Y3RvcigpIHsgfVxyXG59XHJcblxyXG4vKipcclxuICogd2UgY2FuJ3QgcmVhZCB0eXBlcyBmcm9tIE93bE9wdGlvbnMgaW4gamF2YXNjcmlwdCBiZWNhdXNlIG9mIHByb3BzIGhhdmUgdW5kZWZpbmVkIHZhbHVlIGFuZCB0eXBlcyBvZiB0aG9zZSBwcm9wcyBhcmUgdXNlZCBmb3IgdmFsaWRhdGluZyBpbnB1dHNcclxuICogY2xhc3MgYmVsb3cgaXMgY29weSBvZiBPd2xPcHRpb25zIGJ1dCBpdHMgYWxsIHByb3BzIGhhdmUgc3RyaW5nIHZhbHVlIHNob3dpbmcgY2VydGFpbiB0eXBlO1xyXG4gKiB0aGlzIGlzIGNsYXNzIGlzIGJlaW5nIHVzZWQganVzdCBpbiBtZXRob2QgX3ZhbGlkYXRlT3B0aW9ucygpIG9mIENhcm91c2VsU2VydmljZTtcclxuICovXHJcbmV4cG9ydCBjbGFzcyBPd2xPcHRpb25zTW9ja2VkVHlwZXMge1xyXG4gIGl0ZW1zID0gJ251bWJlcic7XHJcbiAgbG9vcCA9ICdib29sZWFuJztcclxuICBjZW50ZXIgPSAnYm9vbGVhbic7XHJcbiAgcmV3aW5kID0gJ2Jvb2xlYW4nO1xyXG5cclxuICBtb3VzZURyYWcgPSAnYm9vbGVhbic7XHJcbiAgdG91Y2hEcmFnID0gJ2Jvb2xlYW4nO1xyXG4gIHB1bGxEcmFnID0gJ2Jvb2xlYW4nO1xyXG4gIGZyZWVEcmFnID0gJ2Jvb2xlYW4nO1xyXG5cclxuICBtYXJnaW4gPSAnbnVtYmVyJztcclxuICBzdGFnZVBhZGRpbmcgPSAnbnVtYmVyJztcclxuXHJcbiAgbWVyZ2UgPSAnYm9vbGVhbic7XHJcbiAgbWVyZ2VGaXQgPSAnYm9vbGVhbic7XHJcbiAgYXV0b1dpZHRoID0gJ2Jvb2xlYW4nO1xyXG5cclxuICBzdGFydFBvc2l0aW9uID0gJ251bWJlcnxzdHJpbmcnO1xyXG4gIHJ0bCA9ICdib29sZWFuJztcclxuXHJcbiAgc21hcnRTcGVlZCA9ICdudW1iZXInO1xyXG4gIGZsdWlkU3BlZWQgPSAnYm9vbGVhbic7XHJcbiAgZHJhZ0VuZFNwZWVkID0gJ251bWJlcnxib29sZWFuJztcclxuXHJcbiAgcmVzcG9uc2l2ZSA9IHt9O1xyXG4gIHJlc3BvbnNpdmVSZWZyZXNoUmF0ZSA9ICdudW1iZXInO1xyXG5cclxuICAvLyBkZWZhdWx0cyB0byBOYXZpZ2F0aW9uXHJcbiAgbmF2ID0gJ2Jvb2xlYW4nO1xyXG4gIG5hdlRleHQgPSAnc3RyaW5nW10nO1xyXG4gIG5hdlNwZWVkID0gJ251bWJlcnxib29sZWFuJztcclxuICBzbGlkZUJ5ID0gJ251bWJlcnxzdHJpbmcnOyAvLyBzdGFnZSBtb3ZlcyBvbiAxIHdpZHRoIG9mIHNsaWRlOyBpZiBzbGlkZUJ5ID0gMiwgc3RhZ2UgbW92ZXMgb24gMiB3aWR0aHMgb2Ygc2xpZGVcclxuICBkb3RzID0gJ2Jvb2xlYW4nO1xyXG4gIGRvdHNFYWNoID0gJ251bWJlcnxib29sZWFuJztcclxuICBkb3RzRGF0YSA9ICdib29sZWFuJztcclxuICBkb3RzU3BlZWQgPSAnbnVtYmVyfGJvb2xlYW4nO1xyXG5cclxuICAvLyBkZWZhdWx0cyB0byBBdXRvcGxheVxyXG4gIGF1dG9wbGF5ID0gJ2Jvb2xlYW4nO1xyXG4gIGF1dG9wbGF5VGltZW91dCA9ICdudW1iZXInO1xyXG4gIGF1dG9wbGF5SG92ZXJQYXVzZSA9ICdib29sZWFuJztcclxuICBhdXRvcGxheVNwZWVkID0gJ251bWJlcnxib29sZWFuJztcclxuXHJcbiAgLy8gZGVmYXVsdHMgdG8gTGF6eUxvYWRpbmdcclxuICBsYXp5TG9hZCA9ICdib29sZWFuJztcclxuICBsYXp5TG9hZEVhZ2VyID0gJ251bWJlcic7XHJcblxyXG4gIC8vIGRlZmF1bHRzIHRvIEFuaW1hdGVcclxuICBhbmltYXRlT3V0ID0gJ3N0cmluZ3xib29sZWFuJztcclxuICBhbmltYXRlSW4gPSAnc3RyaW5nfGJvb2xlYW4nO1xyXG5cclxuICAvLyBkZWZhdWx0cyB0byBBdXRvSGVpZ2h0XHJcbiAgYXV0b0hlaWdodCA9ICdib29sZWFuJztcclxuXHJcbiAgLy8gZGVmYXVsdHMgdG8gSGFzaFxyXG4gIFVSTGhhc2hMaXN0ZW5lciA9IFwiYm9vbGVhblwiO1xyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcbn0iLCJcclxuaW1wb3J0IHsgU3RhZ2VEYXRhIH0gZnJvbSAnLi4vbW9kZWxzL3N0YWdlLWRhdGEubW9kZWwnO1xyXG5cclxuaW1wb3J0IHsgT3dsRE9NRGF0YSB9IGZyb20gJy4uL21vZGVscy9vd2xET00tZGF0YS5tb2RlbCc7XHJcblxyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlIH0gZnJvbSAnLi4vY2Fyb3VzZWwvY2Fyb3VzZWwubW9kdWxlJztcclxuaW1wb3J0IHsgU2xpZGVNb2RlbCB9IGZyb20gJy4uL21vZGVscy9zbGlkZS5tb2RlbCc7XHJcbmltcG9ydCB7IFN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgT3dsQ2Fyb3VzZWxPQ29uZmlnLCBPd2xPcHRpb25zTW9ja2VkVHlwZXMgfSBmcm9tICcuLi9jYXJvdXNlbC9vd2wtY2Fyb3VzZWwtby1jb25maWcnO1xyXG5pbXBvcnQgeyBPd2xPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWxzL293bC1vcHRpb25zLm1vZGVsJztcclxuXHJcbmltcG9ydCB7IE5hdkRhdGEsIERvdHNEYXRhIH0gZnJvbSAnLi4vbW9kZWxzL25hdmlnYXRpb24tZGF0YS5tb2RlbHMnO1xyXG5cclxuLyoqXHJcbiAqIEN1cnJlbnQgc3RhdGUgaW5mb3JtYXRpb24gYW5kIHRoZWlyIHRhZ3MuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU3RhdGVzIHtcclxuICBjdXJyZW50OiB7fTtcclxuICB0YWdzOiB7XHJcbiAgICBba2V5OiBzdHJpbmddOiBzdHJpbmdbXTtcclxuICB9O1xyXG59XHJcblxyXG4vKipcclxuICogRW51bWVyYXRpb24gZm9yIHR5cGVzLlxyXG4gKiBAZW51bSB7U3RyaW5nfVxyXG4gKi9cclxuZXhwb3J0IGVudW0gVHlwZSB7XHJcblx0RXZlbnQgPSAnZXZlbnQnLFxyXG5cdFN0YXRlID0gJ3N0YXRlJ1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEVudW1lcmF0aW9uIGZvciB3aWR0aC5cclxuICogQGVudW0ge1N0cmluZ31cclxuICovXHJcbmV4cG9ydCBlbnVtIFdpZHRoIHtcclxuXHREZWZhdWx0ID0gJ2RlZmF1bHQnLFxyXG5cdElubmVyID0gJ2lubmVyJyxcclxuXHRPdXRlciA9ICdvdXRlcidcclxufTtcclxuXHJcbi8qKlxyXG4gKiBNb2RlbCBmb3IgY29vcmRzIG9mIC5vd2wtc3RhZ2VcclxuICovXHJcbmV4cG9ydCBjbGFzcyBDb29yZHMge1xyXG5cdHg6IG51bWJlcjtcclxuXHR5OiBudW1iZXI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBNb2RlbCBmb3IgYWxsIGN1cnJlbnQgZGF0YSBvZiBjYXJvdXNlbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENhcm91c2VsQ3VycmVudERhdGEge1xyXG5cdG93bERPTURhdGE6IE93bERPTURhdGE7XHJcblx0c3RhZ2VEYXRhOiBTdGFnZURhdGE7XHJcblx0c2xpZGVzRGF0YTogU2xpZGVNb2RlbFtdO1xyXG5cdG5hdkRhdGE6IE5hdkRhdGE7XHJcblx0ZG90c0RhdGE6IERvdHNEYXRhO1xyXG59XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBDYXJvdXNlbFNlcnZpY2Uge1xyXG5cdC8qKlxyXG4gICAqIFN1YmplY3QgZm9yIHBhc3NpbmcgZGF0YSBuZWVkZWQgZm9yIG1hbmFnaW5nIFZpZXdcclxuICAgKi9cclxuXHRwcml2YXRlIF92aWV3U2V0dGluZ3NTaGlwcGVyJCA9IG5ldyBTdWJqZWN0PENhcm91c2VsQ3VycmVudERhdGE+KCk7XHJcblx0LyoqXHJcbiAgICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uIHdoZW4gdGhlIGNhcm91c2VsIGdvdCBpbml0aWFsaXplc1xyXG4gICAqL1xyXG5cdHByaXZhdGUgX2luaXRpYWxpemVkQ2Fyb3VzZWwkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xyXG5cclxuXHQvKipcclxuICAgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gd2hlbiB0aGUgY2Fyb3VzZWwncyBzZXR0aW5ncyBzdGFydCBjaGFuZ2luZlxyXG4gICAqL1xyXG5cdHByaXZhdGUgX2NoYW5nZVNldHRpbmdzQ2Fyb3VzZWwkID0gbmV3IFN1YmplY3Q8YW55PigpO1xyXG5cclxuXHQvKipcclxuICAgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gd2hlbiB0aGUgY2Fyb3VzZWwncyBzZXR0aW5ncyBoYXZlIGNoYW5nZWRcclxuICAgKi9cclxuXHRwcml2YXRlIF9jaGFuZ2VkU2V0dGluZ3NDYXJvdXNlbCQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XHJcblx0LyoqXHJcbiAgICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uIHdoZW4gdGhlIGNhcm91c2VsIHN0YXJ0cyB0cmFuc2xhdGluZyBvciBtb3ZpbmdcclxuICAgKi9cclxuXHRwcml2YXRlIF90cmFuc2xhdGVDYXJvdXNlbCQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XHJcblx0LyoqXHJcbiAgICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uIHdoZW4gdGhlIGNhcm91c2VsIHN0b3BwZWQgdHJhbnNsYXRpbmcgb3IgbW92aW5nXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfdHJhbnNsYXRlZENhcm91c2VsJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcclxuXHQvKipcclxuICAgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gd2hlbiB0aGUgY2Fyb3VzZWwncyByZWJ1aWxkaW5nIGNhdXNlZCBieSAncmVzaXplJyBldmVudCBzdGFydHNcclxuICAgKi9cclxuXHRwcml2YXRlIF9yZXNpemVDYXJvdXNlbCQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XHJcblx0LyoqXHJcbiAgICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uICB3aGVuIHRoZSBjYXJvdXNlbCdzIHJlYnVpbGRpbmcgY2F1c2VkIGJ5ICdyZXNpemUnIGV2ZW50IGlzIGVuZGVkXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfcmVzaXplZENhcm91c2VsJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcclxuXHQvKipcclxuICAgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gd2hlbiB0aGUgcmVmcmVzaCBvZiBjYXJvdXNlbCBzdGFydHNcclxuICAgKi9cclxuXHRwcml2YXRlIF9yZWZyZXNoQ2Fyb3VzZWwkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xyXG5cdC8qKlxyXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSByZWZyZXNoIG9mIGNhcm91c2VsIGlzIGVuZGVkXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfcmVmcmVzaGVkQ2Fyb3VzZWwkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xyXG5cdC8qKlxyXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSBkcmFnZ2luZyBvZiBjYXJvdXNlbCBzdGFydHNcclxuICAgKi9cclxuXHRwcml2YXRlIF9kcmFnQ2Fyb3VzZWwkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xyXG5cdC8qKlxyXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSBkcmFnZ2luZyBvZiBjYXJvdXNlbCBpcyBlbmRlZFxyXG4gICAqL1xyXG5cdHByaXZhdGUgX2RyYWdnZWRDYXJvdXNlbCQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEN1cnJlbnQgc2V0dGluZ3MgZm9yIHRoZSBjYXJvdXNlbC5cclxuICAgKi9cclxuICBzZXR0aW5nczogT3dsT3B0aW9ucyA9IHtcclxuXHRcdGl0ZW1zOiAwXHJcblx0fTtcclxuXHJcblx0LyoqXHJcbiAgICogSW5pdGlhbCBkYXRhIGZvciBzZXR0aW5nIGNsYXNzZXMgdG8gZWxlbWVudCAub3dsLWNhcm91c2VsXHJcbiAgICovXHJcblx0b3dsRE9NRGF0YTogT3dsRE9NRGF0YSA9IHtcclxuXHRcdHJ0bDogZmFsc2UsXHJcblx0XHRpc1Jlc3BvbnNpdmU6IGZhbHNlLFxyXG5cdFx0aXNSZWZyZXNoZWQ6IGZhbHNlLFxyXG5cdFx0aXNMb2FkZWQ6IGZhbHNlLFxyXG5cdFx0aXNMb2FkaW5nOiBmYWxzZSxcclxuXHRcdGlzTW91c2VEcmFnYWJsZTogZmFsc2UsXHJcblx0XHRpc0dyYWI6IGZhbHNlLFxyXG5cdFx0aXNUb3VjaERyYWdhYmxlOiBmYWxzZVxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG4gICAqIEluaXRpYWwgZGF0YSBvZiAub3dsLXN0YWdlXHJcbiAgICovXHJcblx0c3RhZ2VEYXRhOiBTdGFnZURhdGEgPSB7XHJcblx0XHR0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgwcHgsMHB4LDBweCknLFxyXG5cdFx0dHJhbnNpdGlvbjogJzBzJyxcclxuXHRcdHdpZHRoOiAwLFxyXG5cdFx0cGFkZGluZ0w6IDAsXHJcblx0XHRwYWRkaW5nUjogMFxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqICBEYXRhIG9mIGV2ZXJ5IHNsaWRlXHJcblx0ICovXHJcblx0c2xpZGVzRGF0YTogU2xpZGVNb2RlbFtdO1xyXG5cclxuXHQvKipcclxuXHQgKiBEYXRhIG9mIG5hdmlnYXRpb24gYmxvY2tcclxuXHQgKi9cclxuXHRuYXZEYXRhOiBOYXZEYXRhO1xyXG5cclxuXHQvKipcclxuXHQgKiBEYXRhIG9mIGRvdHMgYmxvY2tcclxuXHQgKi9cclxuXHRkb3RzRGF0YTogRG90c0RhdGE7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENhcm91c2VsIHdpZHRoXHJcblx0ICovXHJcblx0cHJpdmF0ZSBfd2lkdGg6IG51bWJlcjtcclxuXHJcblx0LyoqXHJcblx0ICogQWxsIHJlYWwgaXRlbXMuXHJcblx0ICovXHJcblx0cHJpdmF0ZSBfaXRlbXM6IENhcm91c2VsU2xpZGVEaXJlY3RpdmVbXSA9IFtdOyAvLyBpcyBlcXVhbCB0byB0aGlzLnNsaWRlc1xyXG5cclxuXHQvKipcclxuICAgKiBBcnJheSB3aXRoIHdpZHRoIG9mIGV2ZXJ5IHNsaWRlLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3dpZHRoczogYW55W10gPSBbXTtcclxuXHJcblx0LyoqXHJcbiAgICogQ3VycmVudGx5IHN1cHByZXNzZWQgZXZlbnRzIHRvIHByZXZlbnQgdGhlbSBmcm9tIGJlZWluZyByZXRyaWdnZXJlZC5cclxuICAgKi9cclxuXHRwcml2YXRlIF9zdXByZXNzOiBhbnkgPSB7fTtcclxuXHJcbiAgLyoqXHJcbiAgICogUmVmZXJlbmNlcyB0byB0aGUgcnVubmluZyBwbHVnaW5zIG9mIHRoaXMgY2Fyb3VzZWwuXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfcGx1Z2luczogYW55ID0ge307XHJcblxyXG5cdC8qKlxyXG4gICAqIEFic29sdXRlIGN1cnJlbnQgcG9zaXRpb24uXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfY3VycmVudDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XHJcblxyXG5cdC8qKlxyXG4gICAqIEFsbCBjbG9uZWQgaXRlbXMuXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfY2xvbmVzOiBhbnlbXSA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiBNZXJnZSB2YWx1ZXMgb2YgYWxsIGl0ZW1zLlxyXG4gICAqIEB0b2RvIE1heWJlIHRoaXMgY291bGQgYmUgcGFydCBvZiBhIHBsdWdpbi5cclxuICAgKi9cclxuXHRyZWFkb25seSBfbWVyZ2VyczogYW55W10gPSBbXTtcclxuXHJcblx0LyoqXHJcbiAgICogQW5pbWF0aW9uIHNwZWVkIGluIG1pbGxpc2Vjb25kcy5cclxuICAgKi9cclxuXHRwcml2YXRlIF9zcGVlZDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XHJcblxyXG5cdC8qKlxyXG4gICAqIENvb3JkaW5hdGVzIG9mIGFsbCBpdGVtcyBpbiBwaXhlbC5cclxuICAgKiBAdG9kbyBUaGUgbmFtZSBvZiB0aGlzIG1lbWJlciBpcyBtaXNzbGVhZGluZy5cclxuICAgKi9cclxuXHRwcml2YXRlIF9jb29yZGluYXRlczogbnVtYmVyW10gPSBbXTtcclxuXHJcblx0LyoqXHJcbiAgICogQ3VycmVudCBicmVha3BvaW50LlxyXG4gICAqIEB0b2RvIFJlYWwgbWVkaWEgcXVlcmllcyB3b3VsZCBiZSBuaWNlLlxyXG4gICAqL1xyXG5cdHByaXZhdGUgX2JyZWFrcG9pbnQ6IGFueSA9IG51bGw7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFByZWZpeCBmb3IgaWQgb2YgY2xvbmVkIHNsaWRlc1xyXG5cdCAqL1xyXG5cdGNsb25lZElkUHJlZml4ID0gJ2Nsb25lZC0nO1xyXG5cclxuXHQvKipcclxuXHQgKiBDdXJyZW50IG9wdGlvbnMgc2V0IGJ5IHRoZSBjYWxsZXIgaW5jbHVkaW5nIGRlZmF1bHRzLlxyXG5cdCAqL1xyXG5cdF9vcHRpb25zOiBPd2xPcHRpb25zID0ge307XHJcblxyXG4gIC8qKlxyXG4gICAqIEludmFsaWRhdGVkIHBhcnRzIHdpdGhpbiB0aGUgdXBkYXRlIHByb2Nlc3MuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfaW52YWxpZGF0ZWQ6IGFueSA9IHt9O1xyXG5cclxuICAvLyBJcyBuZWVkZWQgZm9yIHRlc3RzXHJcbiAgZ2V0IGludmFsaWRhdGVkKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2ludmFsaWRhdGVkO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBDdXJyZW50IHN0YXRlIGluZm9ybWF0aW9uIGFuZCB0aGVpciB0YWdzLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3N0YXRlczogU3RhdGVzID0ge1xyXG4gICAgY3VycmVudDoge30sXHJcbiAgICB0YWdzOiB7XHJcbiAgICAgIGluaXRpYWxpemluZzogWydidXN5J10sXHJcbiAgICAgIGFuaW1hdGluZzogWydidXN5J10sXHJcbiAgICAgIGRyYWdnaW5nOiBbJ2ludGVyYWN0aW5nJ11cclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvLyBpcyBuZWVkZWQgZm9yIHRlc3RzXHJcbiAgZ2V0IHN0YXRlcygpIHtcclxuICAgIHJldHVybiB0aGlzLl9zdGF0ZXM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuIFx0ICogT3JkZXJlZCBsaXN0IG9mIHdvcmtlcnMgZm9yIHRoZSB1cGRhdGUgcHJvY2Vzcy5cclxuICAgKi9cclxuICBwcml2YXRlIF9waXBlOiBhbnlbXSA9IFtcclxuICAgIC8vIHtcclxuICAgIC8vICAgZmlsdGVyOiBbJ3dpZHRoJywgJ3NldHRpbmdzJ10sXHJcbiAgICAvLyAgIHJ1bjogKCkgPT4ge1xyXG4gICAgLy8gICAgIHRoaXMuX3dpZHRoID0gdGhpcy5jYXJvdXNlbFdpbmRvd1dpZHRoO1xyXG4gICAgLy8gICB9XHJcbiAgICAvLyB9LFxyXG4gICAge1xyXG4gICAgICBmaWx0ZXI6IFsnd2lkdGgnLCAnaXRlbXMnLCAnc2V0dGluZ3MnXSxcclxuICAgICAgcnVuOiBjYWNoZSA9PiB7XHJcbiAgICAgICAgY2FjaGUuY3VycmVudCA9IHRoaXMuX2l0ZW1zICYmIHRoaXMuX2l0ZW1zW3RoaXMucmVsYXRpdmUodGhpcy5fY3VycmVudCldLmlkO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy8ge1xyXG4gICAgLy8gICBmaWx0ZXI6IFsnaXRlbXMnLCAnc2V0dGluZ3MnXSxcclxuICAgIC8vICAgcnVuOiBmdW5jdGlvbigpIHtcclxuICAgIC8vICAgICAvLyB0aGlzLiRzdGFnZS5jaGlsZHJlbignLmNsb25lZCcpLnJlbW92ZSgpO1xyXG4gICAgLy8gICB9XHJcblx0XHQvLyB9LFxyXG5cdFx0IHtcclxuICAgICAgZmlsdGVyOiBbICd3aWR0aCcsICdpdGVtcycsICdzZXR0aW5ncycgXSxcclxuICAgICAgcnVuOiAoY2FjaGUpID0+IHtcclxuICAgICAgICBjb25zdCBtYXJnaW4gPSB0aGlzLnNldHRpbmdzLm1hcmdpbiB8fCAnJyxcclxuICAgICAgICAgIGdyaWQgPSAhdGhpcy5zZXR0aW5ncy5hdXRvV2lkdGgsXHJcbiAgICAgICAgICBydGwgPSB0aGlzLnNldHRpbmdzLnJ0bCxcclxuICAgICAgICAgIGNzcyA9IHtcclxuICAgICAgICAgICAgJ21hcmdpbi1sZWZ0JzogcnRsID8gbWFyZ2luIDogJycsXHJcbiAgICAgICAgICAgICdtYXJnaW4tcmlnaHQnOiBydGwgPyAnJyA6IG1hcmdpblxyXG4gICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYoIWdyaWQpIHtcclxuXHRcdFx0XHRcdHRoaXMuc2xpZGVzRGF0YS5mb3JFYWNoKHNsaWRlID0+IHtcclxuXHRcdFx0XHRcdFx0c2xpZGUubWFyZ2luTCA9IGNzc1snbWFyZ2luLWxlZnQnXTtcclxuXHRcdFx0XHRcdFx0c2xpZGUubWFyZ2luUiA9IGNzc1snbWFyZ2luLXJpZ2h0J107XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9XHJcblxyXG4gICAgICAgIGNhY2hlLmNzcyA9IGNzcztcclxuICAgICAgfVxyXG4gICAgfSwge1xyXG4gICAgICBmaWx0ZXI6IFsgJ3dpZHRoJywgJ2l0ZW1zJywgJ3NldHRpbmdzJyBdLFxyXG4gICAgICBydW46IChjYWNoZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHdpZHRoOiBhbnkgPSArKHRoaXMud2lkdGgoKSAvIHRoaXMuc2V0dGluZ3MuaXRlbXMpLnRvRml4ZWQoMykgLSB0aGlzLnNldHRpbmdzLm1hcmdpbixcclxuICAgICAgICAgIGdyaWQgPSAhdGhpcy5zZXR0aW5ncy5hdXRvV2lkdGgsXHJcbiAgICAgICAgICB3aWR0aHMgPSBbXTtcclxuXHRcdFx0XHRsZXQgbWVyZ2UgPSBudWxsLFxyXG5cdFx0XHRcdFx0XHRpdGVyYXRvciA9IHRoaXMuX2l0ZW1zLmxlbmd0aDtcclxuXHJcbiAgICAgICAgY2FjaGUuaXRlbXMgPSB7XHJcbiAgICAgICAgICBtZXJnZTogZmFsc2UsXHJcbiAgICAgICAgICB3aWR0aDogd2lkdGhcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB3aGlsZSAoaXRlcmF0b3ItLSkge1xyXG4gICAgICAgICAgbWVyZ2UgPSB0aGlzLl9tZXJnZXJzW2l0ZXJhdG9yXTtcclxuICAgICAgICAgIG1lcmdlID0gdGhpcy5zZXR0aW5ncy5tZXJnZUZpdCAmJiBNYXRoLm1pbihtZXJnZSwgdGhpcy5zZXR0aW5ncy5pdGVtcykgfHwgbWVyZ2U7XHJcbiAgICAgICAgICBjYWNoZS5pdGVtcy5tZXJnZSA9IG1lcmdlID4gMSB8fCBjYWNoZS5pdGVtcy5tZXJnZTtcclxuXHJcbiAgICAgICAgICB3aWR0aHNbaXRlcmF0b3JdID0gIWdyaWQgPyB0aGlzLl9pdGVtc1tpdGVyYXRvcl0ud2lkdGggPyB0aGlzLl9pdGVtc1tpdGVyYXRvcl0ud2lkdGggOiB3aWR0aCA6IHdpZHRoICogbWVyZ2U7XHJcbiAgICAgICAgfVxyXG5cclxuXHRcdFx0XHR0aGlzLl93aWR0aHMgPSB3aWR0aHM7XHJcblxyXG5cdFx0XHRcdHRoaXMuc2xpZGVzRGF0YS5mb3JFYWNoKChzbGlkZSwgaSkgPT4ge1xyXG5cdFx0XHRcdFx0c2xpZGUud2lkdGggPSB0aGlzLl93aWR0aHNbaV07XHJcblx0XHRcdFx0XHRzbGlkZS5tYXJnaW5SID0gY2FjaGUuY3NzWydtYXJnaW4tcmlnaHQnXTtcclxuXHRcdFx0XHRcdHNsaWRlLm1hcmdpbkwgPSBjYWNoZS5jc3NbJ21hcmdpbi1sZWZ0J107XHJcblx0XHRcdFx0fSk7XHJcbiAgICAgIH1cclxuICAgIH0sIHtcclxuICAgICAgZmlsdGVyOiBbICdpdGVtcycsICdzZXR0aW5ncycgXSxcclxuICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgY2xvbmVzOiBhbnlbXSA9IFtdLFxyXG4gICAgICAgICAgaXRlbXM6IENhcm91c2VsU2xpZGVEaXJlY3RpdmVbXSA9IHRoaXMuX2l0ZW1zLFxyXG4gICAgICAgICAgc2V0dGluZ3M6IGFueSA9IHRoaXMuc2V0dGluZ3MsXHJcbiAgICAgICAgICAvLyBUT0RPOiBTaG91bGQgYmUgY29tcHV0ZWQgZnJvbSBudW1iZXIgb2YgbWluIHdpZHRoIGl0ZW1zIGluIHN0YWdlXHJcbiAgICAgICAgICB2aWV3ID0gTWF0aC5tYXgoc2V0dGluZ3MuaXRlbXMgKiAyLCA0KSxcclxuICAgICAgICAgIHNpemUgPSBNYXRoLmNlaWwoaXRlbXMubGVuZ3RoIC8gMikgKiAyO1xyXG5cdFx0XHRcdGxldCAgYXBwZW5kOiBhbnlbXSA9IFtdLFxyXG4gICAgICAgICAgcHJlcGVuZDogYW55W10gPSBbXSxcclxuXHRcdFx0XHRcdHJlcGVhdCA9IHNldHRpbmdzLmxvb3AgJiYgaXRlbXMubGVuZ3RoID8gc2V0dGluZ3MucmV3aW5kID8gdmlldyA6IE1hdGgubWF4KHZpZXcsIHNpemUpIDogMDtcclxuXHJcbiAgICAgICAgcmVwZWF0IC89IDI7XHJcblxyXG4gICAgICAgIHdoaWxlIChyZXBlYXQtLSkge1xyXG4gICAgICAgICAgLy8gU3dpdGNoIHRvIG9ubHkgdXNpbmcgYXBwZW5kZWQgY2xvbmVzXHJcbiAgICAgICAgICBjbG9uZXMucHVzaCh0aGlzLm5vcm1hbGl6ZShjbG9uZXMubGVuZ3RoIC8gMiwgdHJ1ZSkpO1xyXG4gICAgICAgICAgYXBwZW5kLnB1c2goeyAuLi50aGlzLnNsaWRlc0RhdGFbY2xvbmVzW2Nsb25lcy5sZW5ndGggLSAxXV19KTtcclxuXHRcdFx0XHRcdGNsb25lcy5wdXNoKHRoaXMubm9ybWFsaXplKGl0ZW1zLmxlbmd0aCAtIDEgLSAoY2xvbmVzLmxlbmd0aCAtIDEpIC8gMiwgdHJ1ZSkpO1xyXG5cdFx0XHRcdFx0cHJlcGVuZC51bnNoaWZ0KHsgLi4udGhpcy5zbGlkZXNEYXRhW2Nsb25lc1tjbG9uZXMubGVuZ3RoIC0gMV1dfSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHRcdFx0XHR0aGlzLl9jbG9uZXMgPSBjbG9uZXM7XHJcblxyXG5cdFx0XHRcdGFwcGVuZCA9IGFwcGVuZC5tYXAoc2xpZGUgPT4ge1xyXG5cdFx0XHRcdFx0c2xpZGUuaWQgPSBgJHt0aGlzLmNsb25lZElkUHJlZml4fSR7c2xpZGUuaWR9YDtcclxuXHRcdFx0XHRcdHNsaWRlLmlzQWN0aXZlID0gZmFsc2U7XHJcblx0XHRcdFx0XHRzbGlkZS5pc0Nsb25lZCA9IHRydWU7XHJcblx0XHRcdFx0XHRyZXR1cm4gc2xpZGU7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdHByZXBlbmQgPSBwcmVwZW5kLm1hcChzbGlkZSA9PiB7XHJcblx0XHRcdFx0XHRzbGlkZS5pZCA9IGAke3RoaXMuY2xvbmVkSWRQcmVmaXh9JHtzbGlkZS5pZH1gO1xyXG5cdFx0XHRcdFx0c2xpZGUuaXNBY3RpdmUgPSBmYWxzZTtcclxuXHRcdFx0XHRcdHNsaWRlLmlzQ2xvbmVkID0gdHJ1ZTtcclxuXHRcdFx0XHRcdHJldHVybiBzbGlkZTtcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0dGhpcy5zbGlkZXNEYXRhID0gcHJlcGVuZC5jb25jYXQodGhpcy5zbGlkZXNEYXRhKS5jb25jYXQoYXBwZW5kKTtcclxuICAgICAgfVxyXG4gICAgfSwge1xyXG4gICAgICBmaWx0ZXI6IFsgJ3dpZHRoJywgJ2l0ZW1zJywgJ3NldHRpbmdzJyBdLFxyXG4gICAgICBydW46ICgpID0+IHtcclxuICAgICAgICBjb25zdCBydGwgPSB0aGlzLnNldHRpbmdzLnJ0bCA/IDEgOiAtMSxcclxuICAgICAgICAgIHNpemUgPSB0aGlzLl9jbG9uZXMubGVuZ3RoICsgdGhpcy5faXRlbXMubGVuZ3RoLFxyXG4gICAgICAgICAgY29vcmRpbmF0ZXMgPSBbXTtcclxuICAgICAgICBsZXQgaXRlcmF0b3IgPSAtMSxcclxuICAgICAgICAgIHByZXZpb3VzID0gMCxcclxuICAgICAgICAgIGN1cnJlbnQgPSAwO1xyXG5cclxuICAgICAgICB3aGlsZSAoKytpdGVyYXRvciA8IHNpemUpIHtcclxuICAgICAgICAgIHByZXZpb3VzID0gY29vcmRpbmF0ZXNbaXRlcmF0b3IgLSAxXSB8fCAwO1xyXG4gICAgICAgICAgY3VycmVudCA9IHRoaXMuX3dpZHRoc1t0aGlzLnJlbGF0aXZlKGl0ZXJhdG9yKV0gKyB0aGlzLnNldHRpbmdzLm1hcmdpbjtcclxuICAgICAgICAgIGNvb3JkaW5hdGVzLnB1c2gocHJldmlvdXMgKyBjdXJyZW50ICogcnRsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2Nvb3JkaW5hdGVzID0gY29vcmRpbmF0ZXM7XHJcbiAgICAgIH1cclxuICAgIH0sIHtcclxuICAgICAgZmlsdGVyOiBbICd3aWR0aCcsICdpdGVtcycsICdzZXR0aW5ncycgXSxcclxuICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcGFkZGluZyA9IHRoaXMuc2V0dGluZ3Muc3RhZ2VQYWRkaW5nLFxyXG4gICAgICAgICAgY29vcmRpbmF0ZXMgPSB0aGlzLl9jb29yZGluYXRlcyxcclxuICAgICAgICAgIGNzcyA9IHtcclxuICAgICAgICAgICAgJ3dpZHRoJzogTWF0aC5jZWlsKE1hdGguYWJzKGNvb3JkaW5hdGVzW2Nvb3JkaW5hdGVzLmxlbmd0aCAtIDFdKSkgKyBwYWRkaW5nICogMixcclxuICAgICAgICAgICAgJ3BhZGRpbmctbGVmdCc6IHBhZGRpbmcgfHwgJycsXHJcbiAgICAgICAgICAgICdwYWRkaW5nLXJpZ2h0JzogcGFkZGluZyB8fCAnJ1xyXG5cdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0dGhpcy5zdGFnZURhdGEud2lkdGggPSBjc3Mud2lkdGg7IC8vIHVzZSB0aGlzIHByb3BlcnR5IGluICpuZ0lmIGRpcmVjdGl2ZSBmb3IgLm93bC1zdGFnZSBlbGVtZW50XHJcblx0XHRcdFx0dGhpcy5zdGFnZURhdGEucGFkZGluZ0wgPSBjc3NbJ3BhZGRpbmctbGVmdCddO1xyXG5cdFx0XHRcdHRoaXMuc3RhZ2VEYXRhLnBhZGRpbmdSID0gY3NzWydwYWRkaW5nLXJpZ2h0J107XHJcbiAgICAgIH1cclxuICAgIH0sIHtcclxuICAgIC8vICAgZmlsdGVyOiBbICd3aWR0aCcsICdpdGVtcycsICdzZXR0aW5ncycgXSxcclxuICAgIC8vICAgcnVuOiBjYWNoZSA9PiB7XHJcblx0XHQvLyBcdFx0Ly8gdGhpcyBtZXRob2Qgc2V0cyB0aGUgd2lkdGggZm9yIGV2ZXJ5IHNsaWRlLCBidXQgSSBzZXQgaXQgaW4gZGlmZmVyZW50IHdheSBlYXJsaWVyXHJcblx0XHQvLyBcdFx0Y29uc3QgZ3JpZCA9ICF0aGlzLnNldHRpbmdzLmF1dG9XaWR0aCxcclxuXHRcdC8vIFx0XHRpdGVtcyA9IHRoaXMuJHN0YWdlLmNoaWxkcmVuKCk7IC8vIHVzZSB0aGlzLnNsaWRlc0RhdGFcclxuICAgIC8vICAgICBsZXQgaXRlcmF0b3IgPSB0aGlzLl9jb29yZGluYXRlcy5sZW5ndGg7XHJcblxyXG4gICAgLy8gICAgIGlmIChncmlkICYmIGNhY2hlLml0ZW1zLm1lcmdlKSB7XHJcbiAgICAvLyAgICAgICB3aGlsZSAoaXRlcmF0b3ItLSkge1xyXG4gICAgLy8gICAgICAgICBjYWNoZS5jc3Mud2lkdGggPSB0aGlzLl93aWR0aHNbdGhpcy5yZWxhdGl2ZShpdGVyYXRvcildO1xyXG4gICAgLy8gICAgICAgICBpdGVtcy5lcShpdGVyYXRvcikuY3NzKGNhY2hlLmNzcyk7XHJcbiAgICAvLyAgICAgICB9XHJcbiAgICAvLyAgICAgfSBlbHNlIGlmIChncmlkKSB7XHJcbiAgICAvLyAgICAgICBjYWNoZS5jc3Mud2lkdGggPSBjYWNoZS5pdGVtcy53aWR0aDtcclxuICAgIC8vICAgICAgIGl0ZW1zLmNzcyhjYWNoZS5jc3MpO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgfVxyXG4gICAgLy8gfSwge1xyXG4gICAgLy8gICBmaWx0ZXI6IFsgJ2l0ZW1zJyBdLFxyXG4gICAgLy8gICBydW46IGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gICAgIHRoaXMuX2Nvb3JkaW5hdGVzLmxlbmd0aCA8IDEgJiYgdGhpcy4kc3RhZ2UucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgIC8vICAgfVxyXG4gICAgLy8gfSwge1xyXG4gICAgICBmaWx0ZXI6IFsgJ3dpZHRoJywgJ2l0ZW1zJywgJ3NldHRpbmdzJyBdLFxyXG4gICAgICBydW46IGNhY2hlID0+IHtcclxuICAgICAgICBsZXQgY3VycmVudCA9IGNhY2hlLmN1cnJlbnQgPyB0aGlzLnNsaWRlc0RhdGEuZmluZEluZGV4KHNsaWRlID0+IHNsaWRlLmlkID09PSBjYWNoZS5jdXJyZW50KSA6IDA7XHJcbiAgICAgICBcdGN1cnJlbnQgPSBNYXRoLm1heCh0aGlzLm1pbmltdW0oKSwgTWF0aC5taW4odGhpcy5tYXhpbXVtKCksIGN1cnJlbnQpKTtcclxuICAgICAgICB0aGlzLnJlc2V0KGN1cnJlbnQpO1xyXG4gICAgICB9XHJcbiAgICB9LCB7XHJcbiAgICAgIGZpbHRlcjogWyAncG9zaXRpb24nIF0sXHJcbiAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuYW5pbWF0ZSh0aGlzLmNvb3JkaW5hdGVzKHRoaXMuX2N1cnJlbnQpKTtcclxuICAgICAgfVxyXG4gICAgfSwge1xyXG4gICAgICBmaWx0ZXI6IFsgJ3dpZHRoJywgJ3Bvc2l0aW9uJywgJ2l0ZW1zJywgJ3NldHRpbmdzJyBdLFxyXG4gICAgICBydW46ICgpID0+IHtcclxuICAgICAgICBjb25zdCBydGwgPSB0aGlzLnNldHRpbmdzLnJ0bCA/IDEgOiAtMSxcclxuXHRcdFx0XHRcdHBhZGRpbmcgPSB0aGlzLnNldHRpbmdzLnN0YWdlUGFkZGluZyAqIDIsXHJcblx0XHRcdFx0XHRtYXRjaGVzID0gW107XHJcblx0XHRcdFx0bGV0IGJlZ2luLCBlbmQsIGlubmVyLCBvdXRlciwgaSwgbjtcclxuXHJcblx0XHRcdFx0YmVnaW4gPSB0aGlzLmNvb3JkaW5hdGVzKHRoaXMuY3VycmVudCgpKTtcclxuXHRcdFx0XHRpZiAodHlwZW9mIGJlZ2luID09PSAnbnVtYmVyJyApIHtcclxuXHRcdFx0XHRcdGJlZ2luICs9IHBhZGRpbmc7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGJlZ2luID0gMDtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGVuZCA9IGJlZ2luICsgdGhpcy53aWR0aCgpICogcnRsO1xyXG5cclxuXHRcdFx0XHRpZiAocnRsID09PSAtMSAmJiB0aGlzLnNldHRpbmdzLmNlbnRlcikge1xyXG5cdFx0XHRcdFx0Y29uc3QgcmVzdWx0ID1cdHRoaXMuX2Nvb3JkaW5hdGVzLmZpbHRlcihlbGVtZW50ID0+IHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuc2V0dGluZ3MuaXRlbXMgJSAyID09PSAxID8gZWxlbWVudCA+PSBiZWdpbiA6IGVsZW1lbnQgPiBiZWdpbjtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0YmVnaW4gPSByZXN1bHQubGVuZ3RoID8gcmVzdWx0W3Jlc3VsdC5sZW5ndGggLSAxXSA6IGJlZ2luO1xyXG5cdFx0XHRcdH1cclxuXHJcbiAgICAgICAgZm9yIChpID0gMCwgbiA9IHRoaXMuX2Nvb3JkaW5hdGVzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgaW5uZXIgPSBNYXRoLmNlaWwodGhpcy5fY29vcmRpbmF0ZXNbaSAtIDFdIHx8IDApO1xyXG5cdFx0XHRcdFx0b3V0ZXIgPSBNYXRoLmNlaWwoTWF0aC5hYnModGhpcy5fY29vcmRpbmF0ZXNbaV0pICsgcGFkZGluZyAqIHJ0bCk7XHJcblxyXG4gICAgICAgICAgaWYgKCh0aGlzLl9vcChpbm5lciwgJzw9JywgYmVnaW4pICYmICh0aGlzLl9vcChpbm5lciwgJz4nLCBlbmQpKSlcclxuICAgICAgICAgICAgfHwgKHRoaXMuX29wKG91dGVyLCAnPCcsIGJlZ2luKSAmJiB0aGlzLl9vcChvdXRlciwgJz4nLCBlbmQpKSkge1xyXG4gICAgICAgICAgICBtYXRjaGVzLnB1c2goaSk7XHJcbiAgICAgICAgICB9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR0aGlzLnNsaWRlc0RhdGEuZm9yRWFjaChzbGlkZSA9PiB7XHJcblx0XHRcdFx0XHRzbGlkZS5pc0FjdGl2ZSA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0cmV0dXJuIHNsaWRlO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdG1hdGNoZXMuZm9yRWFjaChpdGVtID0+IHtcclxuXHRcdFx0XHRcdHRoaXMuc2xpZGVzRGF0YVtpdGVtXS5pc0FjdGl2ZSA9IHRydWU7XHJcblx0XHRcdFx0fSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmNlbnRlcikge1xyXG5cdFx0XHRcdFx0dGhpcy5zbGlkZXNEYXRhLmZvckVhY2goc2xpZGUgPT4ge1xyXG5cdFx0XHRcdFx0XHRzbGlkZS5pc0NlbnRlcmVkID0gZmFsc2U7XHJcblx0XHRcdFx0XHRcdHJldHVybiBzbGlkZTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0dGhpcy5zbGlkZXNEYXRhW3RoaXMuY3VycmVudCgpXS5pc0NlbnRlcmVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICBdO1xyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBfdmlld1NldHRpbmdzU2hpcHBlciQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxyXG5cdCAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX3ZpZXdTZXR0aW5nc1NoaXBwZXIkIFN1YmplY3RcclxuXHQgKi9cclxuXHRnZXRWaWV3Q3VyU2V0dGluZ3MoKTogT2JzZXJ2YWJsZTxDYXJvdXNlbEN1cnJlbnREYXRhPiB7XHJcblx0XHRyZXR1cm4gdGhpcy5fdmlld1NldHRpbmdzU2hpcHBlciQuYXNPYnNlcnZhYmxlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBfaW5pdGlhbGl6ZWRDYXJvdXNlbCQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxyXG5cdCAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX2luaXRpYWxpemVkQ2Fyb3VzZWwkIFN1YmplY3RcclxuXHQgKi9cclxuXHRnZXRJbml0aWFsaXplZFN0YXRlKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XHJcblx0XHRyZXR1cm4gdGhpcy5faW5pdGlhbGl6ZWRDYXJvdXNlbCQuYXNPYnNlcnZhYmxlKClcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIF9jaGFuZ2VTZXR0aW5nc0Nhcm91c2VsJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXHJcblx0ICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfY2hhbmdlU2V0dGluZ3NDYXJvdXNlbCQgU3ViamVjdFxyXG5cdCAqL1xyXG5cdGdldENoYW5nZVN0YXRlKCk6IE9ic2VydmFibGU8YW55PiB7XHJcblx0XHRyZXR1cm4gdGhpcy5fY2hhbmdlU2V0dGluZ3NDYXJvdXNlbCQuYXNPYnNlcnZhYmxlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBfY2hhbmdlZFNldHRpbmdzQ2Fyb3VzZWwkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcclxuXHQgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIF9jaGFuZ2VkU2V0dGluZ3NDYXJvdXNlbCQgU3ViamVjdFxyXG5cdCAqL1xyXG5cdGdldENoYW5nZWRTdGF0ZSgpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2NoYW5nZWRTZXR0aW5nc0Nhcm91c2VsJC5hc09ic2VydmFibGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIF90cmFuc2xhdGVDYXJvdXNlbCQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxyXG5cdCAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX3RyYW5zbGF0ZUNhcm91c2VsJCBTdWJqZWN0XHJcblx0ICovXHJcblx0Z2V0VHJhbnNsYXRlU3RhdGUoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcclxuXHRcdHJldHVybiB0aGlzLl90cmFuc2xhdGVDYXJvdXNlbCQuYXNPYnNlcnZhYmxlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBfdHJhbnNsYXRlZENhcm91c2VsJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXHJcblx0ICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfdHJhbnNsYXRlZENhcm91c2VsJCBTdWJqZWN0XHJcblx0ICovXHJcblx0Z2V0VHJhbnNsYXRlZFN0YXRlKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XHJcblx0XHRyZXR1cm4gdGhpcy5fdHJhbnNsYXRlZENhcm91c2VsJC5hc09ic2VydmFibGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIF9yZXNpemVDYXJvdXNlbCQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxyXG5cdCAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX3Jlc2l6ZUNhcm91c2VsJCBTdWJqZWN0XHJcblx0ICovXHJcblx0Z2V0UmVzaXplU3RhdGUoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcclxuXHRcdHJldHVybiB0aGlzLl9yZXNpemVDYXJvdXNlbCQuYXNPYnNlcnZhYmxlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBfcmVzaXplZENhcm91c2VsJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXHJcblx0ICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfcmVzaXplZENhcm91c2VsJCBTdWJqZWN0XHJcblx0ICovXHJcblx0Z2V0UmVzaXplZFN0YXRlKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XHJcblx0XHRyZXR1cm4gdGhpcy5fcmVzaXplZENhcm91c2VsJC5hc09ic2VydmFibGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIF9yZWZyZXNoQ2Fyb3VzZWwkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcclxuXHQgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIF9yZWZyZXNoQ2Fyb3VzZWwkIFN1YmplY3RcclxuXHQgKi9cclxuXHRnZXRSZWZyZXNoU3RhdGUoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcclxuXHRcdHJldHVybiB0aGlzLl9yZWZyZXNoQ2Fyb3VzZWwkLmFzT2JzZXJ2YWJsZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgX3JlZnJlc2hlZENhcm91c2VsJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXHJcblx0ICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfcmVmcmVzaGVkQ2Fyb3VzZWwkIFN1YmplY3RcclxuXHQgKi9cclxuXHRnZXRSZWZyZXNoZWRTdGF0ZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3JlZnJlc2hlZENhcm91c2VsJC5hc09ic2VydmFibGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIF9kcmFnQ2Fyb3VzZWwkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcclxuXHQgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIF9kcmFnQ2Fyb3VzZWwkIFN1YmplY3RcclxuXHQgKi9cclxuXHRnZXREcmFnU3RhdGUoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcclxuXHRcdHJldHVybiB0aGlzLl9kcmFnQ2Fyb3VzZWwkLmFzT2JzZXJ2YWJsZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgX2RyYWdnZWRDYXJvdXNlbCQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxyXG5cdCAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX2RyYWdnZWRDYXJvdXNlbCQgU3ViamVjdFxyXG5cdCAqL1xyXG5cdGdldERyYWdnZWRTdGF0ZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2RyYWdnZWRDYXJvdXNlbCQuYXNPYnNlcnZhYmxlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXR1cHMgY3VzdG9tIG9wdGlvbnMgZXhwYW5kaW5nIGRlZmF1bHQgb3B0aW9uc1xyXG5cdCAqIEBwYXJhbSBvcHRpb25zIGN1c3RvbSBvcHRpb25zXHJcblx0ICovXHJcblx0c2V0T3B0aW9ucyhvcHRpb25zOiBPd2xPcHRpb25zKSB7XHJcblx0XHRjb25zdCBjb25maWdPcHRpb25zOiBPd2xPcHRpb25zID0gbmV3IE93bENhcm91c2VsT0NvbmZpZygpO1xyXG5cdFx0Y29uc3QgY2hlY2tlZE9wdGlvbnM6IE93bE9wdGlvbnMgPSB0aGlzLl92YWxpZGF0ZU9wdGlvbnMob3B0aW9ucywgY29uZmlnT3B0aW9ucyk7XHJcblx0XHR0aGlzLl9vcHRpb25zID0geyAuLi5jb25maWdPcHRpb25zLCAuLi5jaGVja2VkT3B0aW9uc307XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3Mgd2hldGhlciB1c2VyJ3Mgb3B0aW9uIGFyZSBzZXQgcHJvcGVybHkuIENoZWtpbmcgaXMgYmFzZWQgb24gdHlwaW5ncztcclxuXHQgKiBAcGFyYW0gb3B0aW9ucyBvcHRpb25zIHNldCBieSB1c2VyXHJcblx0ICogQHBhcmFtIGNvbmZpZ09wdGlvbnMgZGVmYXVsdCBvcHRpb25zXHJcblx0ICogQHJldHVybnMgY2hlY2tlZCBhbmQgbW9kaWZpZWQgKGlmIGl0J3MgbmVlZGVkKSB1c2VyJ3Mgb3B0aW9uc1xyXG5cdCAqXHJcblx0ICogTm90ZXM6XHJcblx0ICogXHQtIGlmIHVzZXIgc2V0IG9wdGlvbiB3aXRoIHdyb25nIHR5cGUsIGl0J2xsIGJlIHdyaXR0ZW4gaW4gY29uc29sZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgX3ZhbGlkYXRlT3B0aW9ucyhvcHRpb25zOiBPd2xPcHRpb25zLCBjb25maWdPcHRpb25zOiBPd2xPcHRpb25zKTogT3dsT3B0aW9ucyB7XHJcblx0XHRjb25zdCBjaGVja2VkT3B0aW9uczogT3dsT3B0aW9ucyA9IHsgLi4ub3B0aW9uc307XHJcblx0XHRjb25zdCBtb2NrZWRUeXBlcyA9IG5ldyBPd2xPcHRpb25zTW9ja2VkVHlwZXMoKTtcclxuXHJcblx0XHRmb3IgKGNvbnN0IGtleSBpbiBjaGVja2VkT3B0aW9ucykge1xyXG5cdFx0XHRpZiAoY2hlY2tlZE9wdGlvbnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG5cclxuXHRcdFx0XHQvLyBjb25kaXRpb24gY291bGQgYmUgc2hvcnRlbmVkIGJ1dCBpdCBnZXRzIGhhcmRlciBmb3IgdW5kZXJzdGFuZGluZ1xyXG5cdFx0XHRcdGlmIChtb2NrZWRUeXBlc1trZXldID09PSAnbnVtYmVyJykge1xyXG5cdFx0XHRcdFx0aWYgKHRoaXMuX2lzTnVtZXJpYyhjaGVja2VkT3B0aW9uc1trZXldKSkge1xyXG5cdFx0XHRcdFx0XHRjaGVja2VkT3B0aW9uc1trZXldID0gK2NoZWNrZWRPcHRpb25zW2tleV07XHJcblx0XHRcdFx0XHRcdGNoZWNrZWRPcHRpb25zW2tleV0gPSBrZXkgPT09ICdpdGVtcycgPyB0aGlzLl92YWxpZGF0ZUl0ZW1zKGNoZWNrZWRPcHRpb25zW2tleV0pIDogY2hlY2tlZE9wdGlvbnNba2V5XTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGNoZWNrZWRPcHRpb25zW2tleV0gPSBzZXRSaWdodE9wdGlvbihtb2NrZWRUeXBlc1trZXldLCBrZXkpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gZWxzZSBpZiAobW9ja2VkVHlwZXNba2V5XSA9PT0gJ2Jvb2xlYW4nICYmIHR5cGVvZiBjaGVja2VkT3B0aW9uc1trZXldICE9PSAnYm9vbGVhbicpIHtcclxuXHRcdFx0XHRcdGNoZWNrZWRPcHRpb25zW2tleV0gPSBzZXRSaWdodE9wdGlvbihtb2NrZWRUeXBlc1trZXldLCBrZXkpO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAobW9ja2VkVHlwZXNba2V5XSA9PT0gJ251bWJlcnxib29sZWFuJyAmJiAhdGhpcy5faXNOdW1iZXJPckJvb2xlYW4oY2hlY2tlZE9wdGlvbnNba2V5XSkpIHtcclxuXHRcdFx0XHRcdGNoZWNrZWRPcHRpb25zW2tleV0gPSBzZXRSaWdodE9wdGlvbihtb2NrZWRUeXBlc1trZXldLCBrZXkpO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAobW9ja2VkVHlwZXNba2V5XSA9PT0gJ251bWJlcnxzdHJpbmcnICYmICF0aGlzLl9pc051bWJlck9yU3RyaW5nKGNoZWNrZWRPcHRpb25zW2tleV0pKSB7XHJcblx0XHRcdFx0XHRjaGVja2VkT3B0aW9uc1trZXldID0gc2V0UmlnaHRPcHRpb24obW9ja2VkVHlwZXNba2V5XSwga2V5KTtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKG1vY2tlZFR5cGVzW2tleV0gPT09ICdzdHJpbmd8Ym9vbGVhbicgJiYgIXRoaXMuX2lzU3RyaW5nT3JCb29sZWFuKGNoZWNrZWRPcHRpb25zW2tleV0pKSB7XHJcblx0XHRcdFx0XHRjaGVja2VkT3B0aW9uc1trZXldID0gc2V0UmlnaHRPcHRpb24obW9ja2VkVHlwZXNba2V5XSwga2V5KTtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKG1vY2tlZFR5cGVzW2tleV0gPT09ICdzdHJpbmdbXScpIHtcclxuXHRcdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KGNoZWNrZWRPcHRpb25zW2tleV0pKSB7XHJcblx0XHRcdFx0XHRcdGxldCBpc1N0cmluZyA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRjaGVja2VkT3B0aW9uc1trZXldLmZvckVhY2goZWxlbWVudCA9PiB7XHJcblx0XHRcdFx0XHRcdFx0aXNTdHJpbmcgPSB0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycgPyB0cnVlIDogZmFsc2U7XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRpZiAoIWlzU3RyaW5nKSB7IGNoZWNrZWRPcHRpb25zW2tleV0gPSBzZXRSaWdodE9wdGlvbihtb2NrZWRUeXBlc1trZXldLCBrZXkpIH07XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRjaGVja2VkT3B0aW9uc1trZXldID0gc2V0UmlnaHRPcHRpb24obW9ja2VkVHlwZXNba2V5XSwga2V5KTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBzZXRSaWdodE9wdGlvbih0eXBlOiBzdHJpbmcsIGtleTogYW55KTogYW55IHtcclxuXHRcdFx0Y29uc29sZS5sb2coYG9wdGlvbnMuJHtrZXl9IG11c3QgYmUgdHlwZSBvZiAke3R5cGV9OyAke2tleX09JHtvcHRpb25zW2tleV19IHNraXBwZWQgdG8gZGVmYXVsdHM6ICR7a2V5fT0ke2NvbmZpZ09wdGlvbnNba2V5XX1gKTtcclxuXHRcdFx0cmV0dXJuIGNvbmZpZ09wdGlvbnNba2V5XTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gY2hlY2tlZE9wdGlvbnM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3Mgb3B0aW9uIGl0ZW1zIHNldCBieSB1c2VyIGFuZCBpZiBpdCBiaWdnZXIgdGhhbiBudW1iZXIgb2Ygc2xpZGVzIHRoZW4gcmV0dXJucyBudW1iZXIgb2Ygc2xpZGVzXHJcblx0ICogQHBhcmFtIGl0ZW1zIG9wdGlvbiBpdGVtcyBzZXQgYnkgdXNlclxyXG5cdCAqIEByZXR1cm5zIHJpZ2h0IG51bWJlciBvZiBpdGVtc1xyXG5cdCAqL1xyXG5cdHByaXZhdGUgX3ZhbGlkYXRlSXRlbXMoaXRlbXM6IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRsZXQgcmVzdWx0OiBudW1iZXI7XHJcblx0XHRpZiAoaXRlbXMgPj0gdGhpcy5faXRlbXMubGVuZ3RoKSB7XHJcblx0XHRcdHJlc3VsdCA9IHRoaXMuX2l0ZW1zLmxlbmd0aCA7XHJcblx0XHRcdGNvbnNvbGUubG9nKCdvcHRpb24gXFwnaXRlbXNcXCcgaW4geW91ciBvcHRpb25zIGlzIGJpZ2dlciB0aGFuIG51bWJlciBvZiBzbGlkZXM7IFRoaXMgb3B0aW9uIGlzIHVwZGF0ZWQgdG8gY3VycmVudCBudW1iZXIgb2Ygc2xpZGVzIGFuZCBuYXZpZ2F0aW9uIGdvdCBkaXNhYmxlZCcpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmVzdWx0ID0gaXRlbXM7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0IGN1cnJlbnQgd2lkdGggb2YgY2Fyb3VzZWxcclxuXHQgKiBAcGFyYW0gd2lkdGggd2lkdGggb2YgY2Fyb3VzZWwgV2luZG93XHJcblx0ICovXHJcblx0c2V0Q2Fyb3VzZWxXaWR0aCh3aWR0aDogbnVtYmVyKSB7XHJcblx0XHR0aGlzLl93aWR0aCA9IHdpZHRoO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogU2V0dXBzIHRoZSBjdXJyZW50IHNldHRpbmdzLlxyXG5cdCAqIEB0b2RvIFJlbW92ZSByZXNwb25zaXZlIGNsYXNzZXMuIFdoeSBzaG91bGQgYWRhcHRpdmUgZGVzaWducyBiZSBicm91Z2h0IGludG8gSUU4P1xyXG5cdCAqIEB0b2RvIFN1cHBvcnQgZm9yIG1lZGlhIHF1ZXJpZXMgYnkgdXNpbmcgYG1hdGNoTWVkaWFgIHdvdWxkIGJlIG5pY2UuXHJcblx0ICogQHBhcmFtIGNhcm91c2VsV2lkdGggd2lkdGggb2YgY2Fyb3VzZWxcclxuXHQgKiBAcGFyYW0gc2xpZGVzIGFycmF5IG9mIHNsaWRlc1xyXG5cdCAqIEBwYXJhbSBvcHRpb25zIG9wdGlvbnMgc2V0IGJ5IHVzZXJcclxuXHQgKi9cclxuICBzZXR1cChjYXJvdXNlbFdpZHRoOiBudW1iZXIsIHNsaWRlczogQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZVtdLCBvcHRpb25zOiBPd2xPcHRpb25zKSB7XHJcblx0XHR0aGlzLnNldENhcm91c2VsV2lkdGgoY2Fyb3VzZWxXaWR0aCk7XHJcblx0XHR0aGlzLnNldEl0ZW1zKHNsaWRlcyk7XHJcblx0XHR0aGlzLl9kZWZpbmVTbGlkZXNEYXRhKCk7XHJcblx0XHR0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XHJcblxyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IHsgLi4udGhpcy5fb3B0aW9uc307XHJcblxyXG5cdFx0dGhpcy5zZXRWaWV3cG9ydEl0ZW1zTigpO1xyXG5cclxuXHRcdHRoaXMuX3RyaWdnZXIoJ2NoYW5nZScsIHsgcHJvcGVydHk6IHsgbmFtZTogJ3NldHRpbmdzJywgdmFsdWU6IHRoaXMuc2V0dGluZ3MgfSB9KTtcclxuXHRcdHRoaXMuaW52YWxpZGF0ZSgnc2V0dGluZ3MnKTsgLy8gbXVzdCBiZSBjYWxsIG9mIHRoaXMgZnVuY3Rpb247XHJcblx0XHR0aGlzLl90cmlnZ2VyKCdjaGFuZ2VkJywgeyBwcm9wZXJ0eTogeyBuYW1lOiAnc2V0dGluZ3MnLCB2YWx1ZTogdGhpcy5zZXR0aW5ncyB9IH0pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0IG51bWJlciBvZiBpdGVtcyBmb3IgY3VycmVudCB2aWV3cG9ydFxyXG5cdCAqL1xyXG5cdHNldFZpZXdwb3J0SXRlbXNOKCkge1xyXG5cdFx0Y29uc3Qgdmlld3BvcnQgPSB0aGlzLl93aWR0aCxcclxuXHRcdFx0b3ZlcndyaXRlcyA9IHRoaXMuX29wdGlvbnMucmVzcG9uc2l2ZTtcclxuXHRcdGxldFx0bWF0Y2ggPSAtMTtcclxuXHJcblx0XHRpZiAoIU9iamVjdC5rZXlzKG92ZXJ3cml0ZXMpLmxlbmd0aCkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCF2aWV3cG9ydCkge1xyXG5cdFx0XHR0aGlzLnNldHRpbmdzLml0ZW1zID0gMTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZvciAoY29uc3Qga2V5IGluIG92ZXJ3cml0ZXMpIHtcclxuXHRcdFx0aWYgKG92ZXJ3cml0ZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG5cdFx0XHRcdGlmICgra2V5IDw9IHZpZXdwb3J0ICYmICtrZXkgPiBtYXRjaCkge1xyXG5cdFx0XHRcdFx0bWF0Y2ggPSBOdW1iZXIoa2V5KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0geyAuLi50aGlzLnNldHRpbmdzLCBpdGVtczogdGhpcy5fdmFsaWRhdGVJdGVtcyhvdmVyd3JpdGVzW21hdGNoXS5pdGVtcyl9O1xyXG5cdFx0Ly8gaWYgKHR5cGVvZiB0aGlzLnNldHRpbmdzLnN0YWdlUGFkZGluZyA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0Ly8gXHR0aGlzLnNldHRpbmdzLnN0YWdlUGFkZGluZyA9IHRoaXMuc2V0dGluZ3Muc3RhZ2VQYWRkaW5nKCk7XHJcblx0XHQvLyB9XHJcblx0XHRkZWxldGUgdGhpcy5zZXR0aW5ncy5yZXNwb25zaXZlO1xyXG5cdFx0dGhpcy5vd2xET01EYXRhLmlzUmVzcG9uc2l2ZSA9IHRydWU7XHJcblx0XHR0aGlzLl9icmVha3BvaW50ID0gbWF0Y2g7XHJcblxyXG5cdFx0dGhpcy5pbnZhbGlkYXRlKCdzZXR0aW5ncycpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSW5pdGlhbGl6ZXMgdGhlIGNhcm91c2VsLlxyXG5cdCAqIEBwYXJhbSBzbGlkZXMgYXJyYXkgb2YgQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZVxyXG5cdCAqL1xyXG4gIGluaXRpYWxpemUoc2xpZGVzOiBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlW10pIHtcclxuXHRcdHRoaXMuZW50ZXIoJ2luaXRpYWxpemluZycpO1xyXG5cdFx0Ly8gdGhpcy50cmlnZ2VyKCdpbml0aWFsaXplJyk7XHJcblxyXG5cdFx0dGhpcy5vd2xET01EYXRhLnJ0bCA9IHRoaXMuc2V0dGluZ3MucnRsO1xyXG5cclxuXHRcdHNsaWRlcy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG5cdFx0XHRjb25zdCBtZXJnZU46IG51bWJlciA9IHRoaXMuc2V0dGluZ3MubWVyZ2UgPyBpdGVtLmRhdGFNZXJnZSA6IDE7XHJcblx0XHRcdHRoaXMuX21lcmdlcnMucHVzaChtZXJnZU4pO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGhpcy5yZXNldCh0aGlzLl9pc051bWVyaWModGhpcy5zZXR0aW5ncy5zdGFydFBvc2l0aW9uKSA/ICt0aGlzLnNldHRpbmdzLnN0YXJ0UG9zaXRpb24gOiAwKTtcclxuXHJcblx0XHR0aGlzLmludmFsaWRhdGUoJ2l0ZW1zJyk7XHJcblx0XHR0aGlzLnJlZnJlc2goKTtcclxuXHJcblx0XHR0aGlzLm93bERPTURhdGEuaXNMb2FkZWQgPSB0cnVlO1xyXG5cdFx0dGhpcy5vd2xET01EYXRhLmlzTW91c2VEcmFnYWJsZSA9IHRoaXMuc2V0dGluZ3MubW91c2VEcmFnO1xyXG5cdFx0dGhpcy5vd2xET01EYXRhLmlzVG91Y2hEcmFnYWJsZSA9IHRoaXMuc2V0dGluZ3MudG91Y2hEcmFnO1xyXG5cclxuXHRcdHRoaXMuc2VuZENoYW5nZXMoKTtcclxuXHJcblx0XHR0aGlzLmxlYXZlKCdpbml0aWFsaXppbmcnKTtcclxuXHRcdHRoaXMuX3RyaWdnZXIoJ2luaXRpYWxpemVkJyk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogU2VuZHMgYWxsIGRhdGEgbmVlZGVkIGZvciBWaWV3XHJcblx0ICovXHJcblx0c2VuZENoYW5nZXMoKSB7XHJcblx0XHR0aGlzLl92aWV3U2V0dGluZ3NTaGlwcGVyJC5uZXh0KHtcclxuXHRcdFx0b3dsRE9NRGF0YTogdGhpcy5vd2xET01EYXRhLFxyXG5cdFx0XHRzdGFnZURhdGE6IHRoaXMuc3RhZ2VEYXRhLFxyXG5cdFx0XHRzbGlkZXNEYXRhOiB0aGlzLnNsaWRlc0RhdGEsXHJcblx0XHRcdG5hdkRhdGE6IHRoaXMubmF2RGF0YSxcclxuXHRcdFx0ZG90c0RhdGE6IHRoaXMuZG90c0RhdGFcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblxyXG4gIC8qKlxyXG5cdCAqIFVwZGF0ZXMgb3B0aW9uIGxvZ2ljIGlmIG5lY2Vzc2VyeVxyXG5cdCAqL1xyXG4gIHByaXZhdGUgX29wdGlvbnNMb2dpYygpIHtcclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLmF1dG9XaWR0aCkge1xyXG5cdFx0XHR0aGlzLnNldHRpbmdzLnN0YWdlUGFkZGluZyA9IDA7XHJcblx0XHRcdHRoaXMuc2V0dGluZ3MubWVyZ2UgPSBmYWxzZTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZXMgdGhlIHZpZXdcclxuICAgKi9cclxuICB1cGRhdGUoKSB7XHJcbiAgICBsZXQgaSA9IDA7XHJcbiAgICBjb25zdCBuID0gdGhpcy5fcGlwZS5sZW5ndGgsXHJcbiAgICAgIGZpbHRlciA9IGl0ZW0gPT4gdGhpcy5faW52YWxpZGF0ZWRbaXRlbV0sXHJcblx0XHRcdGNhY2hlID0ge307XHJcblxyXG4gICAgd2hpbGUgKGkgPCBuKSB7XHJcbiAgICAgIGNvbnN0IGZpbHRlcmVkUGlwZSA9IHRoaXMuX3BpcGVbaV0uZmlsdGVyLmZpbHRlcihmaWx0ZXIpO1xyXG4gICAgICBpZiAodGhpcy5faW52YWxpZGF0ZWQuYWxsIHx8IGZpbHRlcmVkUGlwZS5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0dGhpcy5fcGlwZVtpXS5ydW4oY2FjaGUpO1xyXG4gICAgICB9XHJcbiAgICAgIGkrKztcclxuXHRcdH1cclxuXHRcdHRoaXMuc2xpZGVzRGF0YS5mb3JFYWNoKHNsaWRlID0+IHNsaWRlLmNsYXNzZXMgPSB0aGlzLnNldEN1clNsaWRlQ2xhc3NlcyhzbGlkZSkpO1xyXG5cdFx0dGhpcy5zZW5kQ2hhbmdlcygpO1xyXG5cclxuICAgIHRoaXMuX2ludmFsaWRhdGVkID0ge307XHJcblxyXG4gICAgaWYgKCF0aGlzLmlzKCd2YWxpZCcpKSB7XHJcbiAgICAgIHRoaXMuZW50ZXIoJ3ZhbGlkJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuXHQgKiBHZXRzIHRoZSB3aWR0aCBvZiB0aGUgdmlldy5cclxuXHQgKiBAcGFyYW0gW2RpbWVuc2lvbj1XaWR0aC5EZWZhdWx0XSBUaGUgZGltZW5zaW9uIHRvIHJldHVyblxyXG5cdCAqIEByZXR1cm5zIFRoZSB3aWR0aCBvZiB0aGUgdmlldyBpbiBwaXhlbC5cclxuXHQgKi9cclxuICB3aWR0aChkaW1lbnNpb24/OiBXaWR0aCk6IG51bWJlciB7XHJcblx0XHRkaW1lbnNpb24gPSBkaW1lbnNpb24gfHwgV2lkdGguRGVmYXVsdDtcclxuXHRcdHN3aXRjaCAoZGltZW5zaW9uKSB7XHJcblx0XHRcdGNhc2UgV2lkdGguSW5uZXI6XHJcblx0XHRcdGNhc2UgV2lkdGguT3V0ZXI6XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuX3dpZHRoO1xyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdHJldHVybiB0aGlzLl93aWR0aCAtIHRoaXMuc2V0dGluZ3Muc3RhZ2VQYWRkaW5nICogMiArIHRoaXMuc2V0dGluZ3MubWFyZ2luO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogUmVmcmVzaGVzIHRoZSBjYXJvdXNlbCBwcmltYXJpbHkgZm9yIGFkYXB0aXZlIHB1cnBvc2VzLlxyXG5cdCAqL1xyXG4gIHJlZnJlc2goKSB7XHJcblx0XHR0aGlzLmVudGVyKCdyZWZyZXNoaW5nJyk7XHJcblx0XHR0aGlzLl90cmlnZ2VyKCdyZWZyZXNoJyk7XHJcblx0XHR0aGlzLl9kZWZpbmVTbGlkZXNEYXRhKCk7XHJcblx0XHR0aGlzLnNldFZpZXdwb3J0SXRlbXNOKCk7XHJcblxyXG5cdFx0dGhpcy5fb3B0aW9uc0xvZ2ljKCk7XHJcblxyXG5cdFx0Ly8gdGhpcy4kZWxlbWVudC5hZGRDbGFzcyh0aGlzLm9wdGlvbnMucmVmcmVzaENsYXNzKTtcclxuXHJcblx0XHR0aGlzLnVwZGF0ZSgpO1xyXG5cclxuXHRcdC8vIHRoaXMuJGVsZW1lbnQucmVtb3ZlQ2xhc3ModGhpcy5vcHRpb25zLnJlZnJlc2hDbGFzcyk7XHJcblxyXG5cdFx0dGhpcy5sZWF2ZSgncmVmcmVzaGluZycpO1xyXG5cdFx0dGhpcy5fdHJpZ2dlcigncmVmcmVzaGVkJyk7XHJcblx0IH1cclxuXHJcbiAgLyoqXHJcblx0ICogQ2hlY2tzIHdpbmRvdyBgcmVzaXplYCBldmVudC5cclxuXHQgKiBAcGFyYW0gY3VyV2lkdGggd2lkdGggb2YgLm93bC1jYXJvdXNlbFxyXG5cdCAqL1xyXG4gIG9uUmVzaXplKGN1cldpZHRoOiBudW1iZXIpIHtcclxuXHRcdGlmICghdGhpcy5faXRlbXMubGVuZ3RoKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldENhcm91c2VsV2lkdGgoY3VyV2lkdGgpO1xyXG5cclxuXHRcdHRoaXMuZW50ZXIoJ3Jlc2l6aW5nJyk7XHJcblxyXG5cdFx0Ly8gaWYgKHRoaXMudHJpZ2dlcigncmVzaXplJykuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcclxuXHRcdC8vIFx0dGhpcy5sZWF2ZSgncmVzaXppbmcnKTtcclxuXHRcdC8vIFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0Ly8gfVxyXG5cdFx0dGhpcy5fdHJpZ2dlcigncmVzaXplJyk7XHJcblx0XHR0aGlzLmludmFsaWRhdGUoJ3dpZHRoJyk7XHJcblxyXG5cdFx0dGhpcy5yZWZyZXNoKCk7XHJcblxyXG5cdFx0dGhpcy5sZWF2ZSgncmVzaXppbmcnKTtcclxuXHRcdHRoaXMuX3RyaWdnZXIoJ3Jlc2l6ZWQnKTtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIFByZXBhcmVzIGRhdGEgZm9yIGRyYWdnaW5nIGNhcm91c2VsLiBJdCBzdGFydHMgYWZ0ZXIgZmlyaW5nIGB0b3VjaHN0YXJ0YCBhbmQgYG1vdXNlZG93bmAgZXZlbnRzLlxyXG5cdCAqIEB0b2RvIEhvcml6b250YWwgc3dpcGUgdGhyZXNob2xkIGFzIG9wdGlvblxyXG5cdCAqIEB0b2RvICMyNjFcclxuXHQgKiBAcGFyYW0gZXZlbnQgLSBUaGUgZXZlbnQgYXJndW1lbnRzLlxyXG5cdCAqIEByZXR1cm5zIHN0YWdlIC0gb2JqZWN0IHdpdGggJ3gnIGFuZCAneScgY29vcmRpbmF0ZXMgb2YgLm93bC1zdGFnZVxyXG5cdCAqL1xyXG4gIHByZXBhcmVEcmFnZ2luZyhldmVudDogYW55KTogQ29vcmRzIHtcclxuXHRcdGxldCBzdGFnZTogQ29vcmRzID0gbnVsbCxcclxuXHRcdFx0XHR0cmFuc2Zvcm1BcnI6IHN0cmluZ1tdO1xyXG5cclxuXHRcdC8vIGNvdWxkIGJlIDUgY29tbWVudGVkIGxpbmVzIGJlbG93OyBIb3dldmVyIHRoZXJlJ3Mgc3RhZ2UgdHJhbnNmb3JtIGluIHN0YWdlRGF0YSBhbmQgaW4gdXBkYXRlcyBhZnRlciBlYWNoIG1vdmUgb2Ygc3RhZ2VcclxuICAgIC8vIHN0YWdlID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpLnRyYW5zZm9ybS5yZXBsYWNlKC8uKlxcKHxcXCl8IC9nLCAnJykuc3BsaXQoJywnKTtcclxuICAgIC8vIHN0YWdlID0ge1xyXG4gICAgLy8gICB4OiBzdGFnZVtzdGFnZS5sZW5ndGggPT09IDE2ID8gMTIgOiA0XSxcclxuICAgIC8vICAgeTogc3RhZ2Vbc3RhZ2UubGVuZ3RoID09PSAxNiA/IDEzIDogNV1cclxuXHRcdC8vIH07XHJcblxyXG5cdFx0dHJhbnNmb3JtQXJyID0gdGhpcy5zdGFnZURhdGEudHJhbnNmb3JtLnJlcGxhY2UoLy4qXFwofFxcKXwgfFteLC1cXGRdXFx3fFxcKS9nLCAnJykuc3BsaXQoJywnKTtcclxuICAgIHN0YWdlID0ge1xyXG4gICAgICB4OiArdHJhbnNmb3JtQXJyWzBdLFxyXG4gICAgICB5OiArdHJhbnNmb3JtQXJyWzFdXHJcbiAgICB9O1xyXG5cclxuXHRcdGlmICh0aGlzLmlzKCdhbmltYXRpbmcnKSkge1xyXG5cdFx0XHR0aGlzLmludmFsaWRhdGUoJ3Bvc2l0aW9uJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGV2ZW50LnR5cGUgPT09ICdtb3VzZWRvd24nKSB7XHJcbiAgICAgIHRoaXMub3dsRE9NRGF0YS5pc0dyYWIgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuXHRcdHRoaXMuc3BlZWQoMCk7XHJcblx0XHRyZXR1cm4gc3RhZ2U7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBFbnRlcnMgaW50byBhICdkcmFnZ2luZycgc3RhdGVcclxuXHQgKi9cclxuXHRlbnRlckRyYWdnaW5nKCkge1xyXG5cdFx0dGhpcy5lbnRlcignZHJhZ2dpbmcnKTtcclxuICAgIHRoaXMuX3RyaWdnZXIoJ2RyYWcnKTtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIERlZmluZXMgbmV3IGNvb3JkcyBmb3IgLm93bC1zdGFnZSB3aGlsZSBkcmFnZ2luZyBpdFxyXG5cdCAqIEB0b2RvICMyNjFcclxuXHQgKiBAcGFyYW0gZXZlbnQgdGhlIGV2ZW50IGFyZ3VtZW50cy5cclxuXHQgKiBAcGFyYW0gZHJhZ0RhdGEgaW5pdGlhbCBkYXRhIGdvdCBhZnRlciBzdGFydGluZyBkcmFnZ2luZ1xyXG5cdCAqIEByZXR1cm5zIGNvb3JkcyBvciBmYWxzZVxyXG5cdCAqL1xyXG4gIGRlZmluZU5ld0Nvb3Jkc0RyYWcoZXZlbnQ6IGFueSwgZHJhZ0RhdGE6IGFueSk6IGJvb2xlYW4gfCBDb29yZHMge1xyXG5cdFx0bGV0IG1pbmltdW0gPSBudWxsLFxyXG5cdFx0bWF4aW11bSA9IG51bGwsXHJcblx0XHRwdWxsID0gbnVsbDtcclxuXHRcdGNvbnN0XHRkZWx0YSA9IHRoaXMuZGlmZmVyZW5jZShkcmFnRGF0YS5wb2ludGVyLCB0aGlzLnBvaW50ZXIoZXZlbnQpKSxcclxuXHRcdFx0c3RhZ2UgPSB0aGlzLmRpZmZlcmVuY2UoZHJhZ0RhdGEuc3RhZ2Uuc3RhcnQsIGRlbHRhKTtcclxuXHJcblx0XHRpZiAoIXRoaXMuaXMoJ2RyYWdnaW5nJykpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLmxvb3ApIHtcclxuXHRcdFx0bWluaW11bSA9IHRoaXMuY29vcmRpbmF0ZXModGhpcy5taW5pbXVtKCkpO1xyXG5cdFx0XHRtYXhpbXVtID0gK3RoaXMuY29vcmRpbmF0ZXModGhpcy5tYXhpbXVtKCkgKyAxKSAtIG1pbmltdW07XHJcblx0XHRcdHN0YWdlLnggPSAoKChzdGFnZS54IC0gbWluaW11bSkgJSBtYXhpbXVtICsgbWF4aW11bSkgJSBtYXhpbXVtKSArIG1pbmltdW07XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRtaW5pbXVtID0gdGhpcy5zZXR0aW5ncy5ydGwgPyB0aGlzLmNvb3JkaW5hdGVzKHRoaXMubWF4aW11bSgpKSA6IHRoaXMuY29vcmRpbmF0ZXModGhpcy5taW5pbXVtKCkpO1xyXG5cdFx0XHRtYXhpbXVtID0gdGhpcy5zZXR0aW5ncy5ydGwgPyB0aGlzLmNvb3JkaW5hdGVzKHRoaXMubWluaW11bSgpKSA6IHRoaXMuY29vcmRpbmF0ZXModGhpcy5tYXhpbXVtKCkpO1xyXG5cdFx0XHRwdWxsID0gdGhpcy5zZXR0aW5ncy5wdWxsRHJhZyA/IC0xICogZGVsdGEueCAvIDUgOiAwO1xyXG5cdFx0XHRzdGFnZS54ID0gTWF0aC5tYXgoTWF0aC5taW4oc3RhZ2UueCwgbWluaW11bSArIHB1bGwpLCBtYXhpbXVtICsgcHVsbCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHN0YWdlO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogRmluaXNoZXMgZHJhZ2dpbmcgb2YgY2Fyb3VzZWwgd2hlbiBgdG91Y2hlbmRgIGFuZCBgbW91c2V1cGAgZXZlbnRzIGZpcmUuXHJcblx0ICogQHRvZG8gIzI2MVxyXG5cdCAqIEB0b2RvIFRocmVzaG9sZCBmb3IgY2xpY2sgZXZlbnRcclxuXHQgKiBAcGFyYW0gZXZlbnQgdGhlIGV2ZW50IGFyZ3VtZW50cy5cclxuXHQgKiBAcGFyYW0gZHJhZ09iaiB0aGUgb2JqZWN0IHdpdGggZHJhZ2dpbmcgc2V0dGluZ3MgYW5kIHN0YXRlc1xyXG5cdCAqIEBwYXJhbSBjbGlja0F0dGFjaGVyIGZ1bmN0aW9uIHdoaWNoIGF0dGFjaGVzIGNsaWNrIGhhbmRsZXIgdG8gc2xpZGUgb3IgaXRzIGNoaWxkcmVuIGVsZW1lbnRzIGluIG9yZGVyIHRvIHByZXZlbnQgZXZlbnQgYnVibGluZ1xyXG5cdCAqL1xyXG4gIGZpbmlzaERyYWdnaW5nKGV2ZW50OiBhbnksIGRyYWdPYmo6IGFueSwgY2xpY2tBdHRhY2hlcjogKCkgPT4gdm9pZCkge1xyXG5cdFx0Y29uc3QgZGVsdGEgPSB0aGlzLmRpZmZlcmVuY2UoZHJhZ09iai5wb2ludGVyLCB0aGlzLnBvaW50ZXIoZXZlbnQpKSxcclxuICAgICAgICBzdGFnZSA9IGRyYWdPYmouc3RhZ2UuY3VycmVudCxcclxuXHRcdFx0XHRkaXJlY3Rpb24gPSBkZWx0YS54ID4gK3RoaXMuc2V0dGluZ3MucnRsID8gJ2xlZnQnIDogJ3JpZ2h0JztcclxuXHRcdGxldCBjdXJyZW50U2xpZGVJOiBudW1iZXIsIGN1cnJlbnQ6IG51bWJlciwgbmV3Q3VycmVudDogbnVtYmVyO1xyXG5cclxuICAgICAgaWYgKGRlbHRhLnggIT09IDAgJiYgdGhpcy5pcygnZHJhZ2dpbmcnKSB8fCAhdGhpcy5pcygndmFsaWQnKSkge1xyXG4gICAgICAgIHRoaXMuc3BlZWQoK3RoaXMuc2V0dGluZ3MuZHJhZ0VuZFNwZWVkIHx8IHRoaXMuc2V0dGluZ3Muc21hcnRTcGVlZCk7XHJcblx0XHRcdFx0Y3VycmVudFNsaWRlSSA9IHRoaXMuY2xvc2VzdChzdGFnZS54LCBkZWx0YS54ICE9PSAwID8gZGlyZWN0aW9uIDogZHJhZ09iai5kaXJlY3Rpb24pO1xyXG5cdFx0XHRcdGN1cnJlbnQgPSB0aGlzLmN1cnJlbnQoKTtcclxuICAgICAgICBuZXdDdXJyZW50ID0gdGhpcy5jdXJyZW50KGN1cnJlbnRTbGlkZUkgPT09IC0xID8gdW5kZWZpbmVkIDogY3VycmVudFNsaWRlSSk7XHJcblxyXG5cdFx0XHRcdGlmIChjdXJyZW50ICE9PSBuZXdDdXJyZW50KSB7XHJcblx0XHRcdFx0XHR0aGlzLmludmFsaWRhdGUoJ3Bvc2l0aW9uJyk7XHJcblx0XHRcdFx0XHR0aGlzLnVwZGF0ZSgpO1xyXG5cdFx0XHRcdH1cclxuXHJcbiAgICAgICAgZHJhZ09iai5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XHJcblxyXG4gICAgICAgIGlmIChNYXRoLmFicyhkZWx0YS54KSA+IDMgfHwgbmV3IERhdGUoKS5nZXRUaW1lKCkgLSBkcmFnT2JqLnRpbWUgPiAzMDApIHtcclxuXHRcdFx0XHRcdGNsaWNrQXR0YWNoZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCF0aGlzLmlzKCdkcmFnZ2luZycpKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblx0XHRcdHRoaXMubGVhdmUoJ2RyYWdnaW5nJyk7XHJcblx0XHRcdHRoaXMuX3RyaWdnZXIoJ2RyYWdnZWQnKVxyXG5cdCB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEdldHMgYWJzb2x1dGUgcG9zaXRpb24gb2YgdGhlIGNsb3Nlc3QgaXRlbSBmb3IgYSBjb29yZGluYXRlLlxyXG5cdCAqIEB0b2RvIFNldHRpbmcgYGZyZWVEcmFnYCBtYWtlcyBgY2xvc2VzdGAgbm90IHJldXNhYmxlLiBTZWUgIzE2NS5cclxuXHQgKiBAcGFyYW0gY29vcmRpbmF0ZSBUaGUgY29vcmRpbmF0ZSBpbiBwaXhlbC5cclxuXHQgKiBAcGFyYW0gZGlyZWN0aW9uIFRoZSBkaXJlY3Rpb24gdG8gY2hlY2sgZm9yIHRoZSBjbG9zZXN0IGl0ZW0uIEV0aGVyIGBsZWZ0YCBvciBgcmlnaHRgLlxyXG5cdCAqIEByZXR1cm5zIFRoZSBhYnNvbHV0ZSBwb3NpdGlvbiBvZiB0aGUgY2xvc2VzdCBpdGVtLlxyXG5cdCAqL1xyXG4gIGNsb3Nlc3QoY29vcmRpbmF0ZTogbnVtYmVyLCBkaXJlY3Rpb246IHN0cmluZyk6IG51bWJlciB7XHJcblx0XHRjb25zdCBwdWxsID0gMzAsXHJcblx0XHRcdHdpZHRoID0gdGhpcy53aWR0aCgpO1xyXG5cdFx0bGV0XHRjb29yZGluYXRlczogbnVtYmVyW10gPSB0aGlzLmNvb3JkaW5hdGVzKCkgYXMgbnVtYmVyW10sXHJcblx0XHQgcG9zaXRpb24gPSAtMTtcclxuXHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5jZW50ZXIpIHtcclxuXHRcdFx0Y29vcmRpbmF0ZXMgPSBjb29yZGluYXRlcy5tYXAoaXRlbSA9PiB7XHJcblx0XHRcdFx0aWYgKGl0ZW0gPT09IDApIHtcclxuXHRcdFx0XHRcdGl0ZW0gKz0gMC4wMDAwMDE7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiBpdGVtO1xyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIG9wdGlvbiAnZnJlZURyYWcnIGRvZXNuJ3QgaGF2ZSByZWFsaXphdGlvbiBhbmQgdXNpbmcgaXQgaGVyZSBjcmVhdGVzIHByb2JsZW06XHJcblx0XHQvLyB2YXJpYWJsZSAncG9zaXRpb24nIHN0YXlzIHVuY2hhbmdlZCAoaXQgZXF1YWxzIC0xIGF0IHRoZSBiZWdnaW5nKSBhbmQgdGh1cyBtZXRob2QgcmV0dXJucyAtMVxyXG5cdFx0Ly8gUmV0dXJuaW5nIHZhbHVlIGlzIGNvbnN1bWVkIGJ5IG1ldGhvZCBjdXJyZW50KCksIHdoaWNoIHRha2luZyAtMSBhcyBhcmd1bWVudCBjYWxjdWxhdGVzIHRoZSBpbmRleCBvZiBuZXcgY3VycmVudCBzbGlkZVxyXG5cdFx0Ly8gSW4gY2FzZSBvZiBoYXZpbmcgNSBzbGlkZXMgYW5zICdsb29wPWZhbHNlOyBjYWxsaW5nICdjdXJyZW50KC0xKScgc2V0cyBwcm9wcyAnX2N1cnJlbnQnIGFzIDQuIEp1c3QgbGFzdCBzbGlkZSByZW1haW5zIHZpc2libGUgaW5zdGVhZCBvZiAzIGxhc3Qgc2xpZGVzLlxyXG5cclxuXHRcdC8vIGlmICghdGhpcy5zZXR0aW5ncy5mcmVlRHJhZykge1xyXG5cdFx0XHQvLyBjaGVjayBjbG9zZXN0IGl0ZW1cclxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBjb29yZGluYXRlcy5sZW5ndGg7IGkrKykge1xyXG5cclxuXHRcdFx0XHRpZiAoZGlyZWN0aW9uID09PSAnbGVmdCcgJiYgY29vcmRpbmF0ZSA+IGNvb3JkaW5hdGVzW2ldIC0gcHVsbCAmJiBjb29yZGluYXRlIDwgY29vcmRpbmF0ZXNbaV0gKyBwdWxsKSB7XHJcblx0XHRcdFx0XHRwb3NpdGlvbiA9IGk7XHJcblx0XHRcdFx0Ly8gb24gYSByaWdodCBwdWxsLCBjaGVjayBvbiBwcmV2aW91cyBpbmRleFxyXG5cdFx0XHRcdC8vIHRvIGRvIHNvLCBzdWJ0cmFjdCB3aWR0aCBmcm9tIHZhbHVlIGFuZCBzZXQgcG9zaXRpb24gPSBpbmRleCArIDFcclxuXHRcdFx0XHR9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ3JpZ2h0JyAmJiBjb29yZGluYXRlID4gY29vcmRpbmF0ZXNbaV0gLSB3aWR0aCAtIHB1bGwgJiYgY29vcmRpbmF0ZSA8IGNvb3JkaW5hdGVzW2ldIC0gd2lkdGggKyBwdWxsKSB7XHJcblx0XHRcdFx0XHRwb3NpdGlvbiA9IGkgKyAxO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAodGhpcy5fb3AoY29vcmRpbmF0ZSwgJzwnLCBjb29yZGluYXRlc1tpXSlcclxuXHRcdFx0XHRcdCYmIHRoaXMuX29wKGNvb3JkaW5hdGUsICc+JywgY29vcmRpbmF0ZXNbaSArIDFdIHx8IGNvb3JkaW5hdGVzW2ldIC0gd2lkdGgpKSB7XHJcblx0XHRcdFx0XHRwb3NpdGlvbiA9IGRpcmVjdGlvbiA9PT0gJ2xlZnQnID8gaSArIDEgOiBpO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBudWxsICYmIGNvb3JkaW5hdGUgPiBjb29yZGluYXRlc1tpXSAtIHB1bGwgJiYgY29vcmRpbmF0ZSA8IGNvb3JkaW5hdGVzW2ldICsgcHVsbCkge1xyXG5cdFx0XHRcdFx0cG9zaXRpb24gPSBpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKHBvc2l0aW9uICE9PSAtMSkgeyBicmVhayB9O1xyXG5cdFx0XHR9XHJcblx0XHQvLyB9XHJcblxyXG5cdFx0aWYgKCF0aGlzLnNldHRpbmdzLmxvb3ApIHtcclxuXHRcdFx0Ly8gbm9uIGxvb3AgYm91bmRyaWVzXHJcblx0XHRcdGlmICh0aGlzLl9vcChjb29yZGluYXRlLCAnPicsIGNvb3JkaW5hdGVzW3RoaXMubWluaW11bSgpXSkpIHtcclxuXHRcdFx0XHRwb3NpdGlvbiA9IGNvb3JkaW5hdGUgPSB0aGlzLm1pbmltdW0oKTtcclxuXHRcdFx0fSBlbHNlIGlmICh0aGlzLl9vcChjb29yZGluYXRlLCAnPCcsIGNvb3JkaW5hdGVzW3RoaXMubWF4aW11bSgpXSkpIHtcclxuXHRcdFx0XHRwb3NpdGlvbiA9IGNvb3JkaW5hdGUgPSB0aGlzLm1heGltdW0oKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBwb3NpdGlvbjtcclxuXHQgfVxyXG5cclxuICAvKipcclxuXHQgKiBBbmltYXRlcyB0aGUgc3RhZ2UuXHJcblx0ICogQHRvZG8gIzI3MFxyXG5cdCAqIEBwYXJhbSBjb29yZGluYXRlIFRoZSBjb29yZGluYXRlIGluIHBpeGVscy5cclxuXHQgKi9cclxuICBhbmltYXRlKGNvb3JkaW5hdGU6IG51bWJlciB8IG51bWJlcltdKSB7XHJcblx0XHRjb25zdCBhbmltYXRlID0gdGhpcy5zcGVlZCgpID4gMDtcclxuXHJcblx0XHRpZiAodGhpcy5pcygnYW5pbWF0aW5nJykpIHtcclxuXHRcdFx0dGhpcy5vblRyYW5zaXRpb25FbmQoKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoYW5pbWF0ZSkge1xyXG5cdFx0XHR0aGlzLmVudGVyKCdhbmltYXRpbmcnKTtcclxuXHRcdFx0dGhpcy5fdHJpZ2dlcigndHJhbnNsYXRlJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zdGFnZURhdGEudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZTNkKCcgKyBjb29yZGluYXRlICsgJ3B4LDBweCwwcHgpJztcclxuXHRcdHRoaXMuc3RhZ2VEYXRhLnRyYW5zaXRpb24gPSAodGhpcy5zcGVlZCgpIC8gMTAwMCkgKyAncyc7XHJcblxyXG5cdFx0Ly8gYWxzbyB0aGVyZSB3YXMgdHJhbnNpdGlvbiBieSBtZWFucyBvZiBKUXVlcnkuYW5pbWF0ZSBvciBjc3MtY2hhbmdpbmcgcHJvcGVydHkgbGVmdFxyXG5cdCB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIENoZWNrcyB3aGV0aGVyIHRoZSBjYXJvdXNlbCBpcyBpbiBhIHNwZWNpZmljIHN0YXRlIG9yIG5vdC5cclxuXHQgKiBAcGFyYW0gc3RhdGUgVGhlIHN0YXRlIHRvIGNoZWNrLlxyXG5cdCAqIEByZXR1cm5zIFRoZSBmbGFnIHdoaWNoIGluZGljYXRlcyBpZiB0aGUgY2Fyb3VzZWwgaXMgYnVzeS5cclxuXHQgKi9cclxuICBpcyhzdGF0ZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gdGhpcy5fc3RhdGVzLmN1cnJlbnRbc3RhdGVdICYmIHRoaXMuX3N0YXRlcy5jdXJyZW50W3N0YXRlXSA+IDA7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcblx0ICogU2V0cyB0aGUgYWJzb2x1dGUgcG9zaXRpb24gb2YgdGhlIGN1cnJlbnQgaXRlbS5cclxuXHQgKiBAcGFyYW0gcG9zaXRpb24gVGhlIG5ldyBhYnNvbHV0ZSBwb3NpdGlvbiBvciBub3RoaW5nIHRvIGxlYXZlIGl0IHVuY2hhbmdlZC5cclxuXHQgKiBAcmV0dXJucyBUaGUgYWJzb2x1dGUgcG9zaXRpb24gb2YgdGhlIGN1cnJlbnQgaXRlbS5cclxuXHQgKi9cclxuICBjdXJyZW50KHBvc2l0aW9uPzogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdGlmIChwb3NpdGlvbiA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLl9jdXJyZW50O1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLl9pdGVtcy5sZW5ndGggPT09IDApIHtcclxuXHRcdFx0cmV0dXJuIHVuZGVmaW5lZDtcclxuXHRcdH1cclxuXHJcblx0XHRwb3NpdGlvbiA9IHRoaXMubm9ybWFsaXplKHBvc2l0aW9uKTtcclxuXHJcblx0XHRpZiAodGhpcy5fY3VycmVudCAhPT0gcG9zaXRpb24pIHtcclxuXHRcdFx0Y29uc3QgZXZlbnQgPSB0aGlzLl90cmlnZ2VyKCdjaGFuZ2UnLCB7IHByb3BlcnR5OiB7IG5hbWU6ICdwb3NpdGlvbicsIHZhbHVlOiBwb3NpdGlvbiB9IH0pO1xyXG5cclxuXHRcdFx0Ly8gaWYgKGV2ZW50LmRhdGEgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHQvLyBcdHBvc2l0aW9uID0gdGhpcy5ub3JtYWxpemUoZXZlbnQuZGF0YSk7XHJcblx0XHRcdC8vIH1cclxuXHJcblx0XHRcdHRoaXMuX2N1cnJlbnQgPSBwb3NpdGlvbjtcclxuXHJcblx0XHRcdHRoaXMuaW52YWxpZGF0ZSgncG9zaXRpb24nKTtcclxuXHRcdFx0dGhpcy5fdHJpZ2dlcignY2hhbmdlZCcsIHsgcHJvcGVydHk6IHsgbmFtZTogJ3Bvc2l0aW9uJywgdmFsdWU6IHRoaXMuX2N1cnJlbnQgfSB9KTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fY3VycmVudDtcclxuXHQgfVxyXG5cclxuICAvKipcclxuXHQgKiBJbnZhbGlkYXRlcyB0aGUgZ2l2ZW4gcGFydCBvZiB0aGUgdXBkYXRlIHJvdXRpbmUuXHJcblx0ICogQHBhcmFtIHBhcnQgVGhlIHBhcnQgdG8gaW52YWxpZGF0ZS5cclxuXHQgKiBAcmV0dXJucyBUaGUgaW52YWxpZGF0ZWQgcGFydHMuXHJcblx0ICovXHJcbiAgaW52YWxpZGF0ZShwYXJ0OiBzdHJpbmcpOiBzdHJpbmdbXSB7XHJcblx0XHRpZiAodHlwZW9mIHBhcnQgPT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdHRoaXMuX2ludmFsaWRhdGVkW3BhcnRdID0gdHJ1ZTtcclxuXHRcdFx0aWYodGhpcy5pcygndmFsaWQnKSkgeyB0aGlzLmxlYXZlKCd2YWxpZCcpOyB9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gT2JqZWN0LmtleXModGhpcy5faW52YWxpZGF0ZWQpO1xyXG4gIH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlc2V0cyB0aGUgYWJzb2x1dGUgcG9zaXRpb24gb2YgdGhlIGN1cnJlbnQgaXRlbS5cclxuXHQgKiBAcGFyYW0gcG9zaXRpb24gdGhlIGFic29sdXRlIHBvc2l0aW9uIG9mIHRoZSBuZXcgaXRlbS5cclxuXHQgKi9cclxuICByZXNldChwb3NpdGlvbjogbnVtYmVyKSB7XHJcblx0XHRwb3NpdGlvbiA9IHRoaXMubm9ybWFsaXplKHBvc2l0aW9uKTtcclxuXHJcblx0XHRpZiAocG9zaXRpb24gPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5fc3BlZWQgPSAwO1xyXG5cdFx0dGhpcy5fY3VycmVudCA9IHBvc2l0aW9uO1xyXG5cclxuXHRcdHRoaXMuX3N1cHByZXNzKFsgJ3RyYW5zbGF0ZScsICd0cmFuc2xhdGVkJyBdKTtcclxuXHJcblx0XHR0aGlzLmFuaW1hdGUodGhpcy5jb29yZGluYXRlcyhwb3NpdGlvbikpO1xyXG5cclxuXHRcdHRoaXMuX3JlbGVhc2UoWyAndHJhbnNsYXRlJywgJ3RyYW5zbGF0ZWQnIF0pO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogTm9ybWFsaXplcyBhbiBhYnNvbHV0ZSBvciBhIHJlbGF0aXZlIHBvc2l0aW9uIG9mIGFuIGl0ZW0uXHJcblx0ICogQHBhcmFtIHBvc2l0aW9uIFRoZSBhYnNvbHV0ZSBvciByZWxhdGl2ZSBwb3NpdGlvbiB0byBub3JtYWxpemUuXHJcblx0ICogQHBhcmFtIHJlbGF0aXZlIFdoZXRoZXIgdGhlIGdpdmVuIHBvc2l0aW9uIGlzIHJlbGF0aXZlIG9yIG5vdC5cclxuXHQgKiBAcmV0dXJucyBUaGUgbm9ybWFsaXplZCBwb3NpdGlvbi5cclxuXHQgKi9cclxuICBub3JtYWxpemUocG9zaXRpb246IG51bWJlciwgcmVsYXRpdmU/OiBib29sZWFuKTogbnVtYmVyIHtcclxuXHRcdGNvbnN0IG4gPSB0aGlzLl9pdGVtcy5sZW5ndGgsXHJcblx0XHRcdFx0XHRtID0gcmVsYXRpdmUgPyAwIDogdGhpcy5fY2xvbmVzLmxlbmd0aDtcclxuXHJcblx0XHRpZiAoIXRoaXMuX2lzTnVtZXJpYyhwb3NpdGlvbikgfHwgbiA8IDEpIHtcclxuXHRcdFx0cG9zaXRpb24gPSB1bmRlZmluZWQ7XHJcblx0XHR9IGVsc2UgaWYgKHBvc2l0aW9uIDwgMCB8fCBwb3NpdGlvbiA+PSBuICsgbSkge1xyXG5cdFx0XHRwb3NpdGlvbiA9ICgocG9zaXRpb24gLSBtIC8gMikgJSBuICsgbikgJSBuICsgbSAvIDI7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHBvc2l0aW9uO1xyXG5cdCB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIENvbnZlcnRzIGFuIGFic29sdXRlIHBvc2l0aW9uIG9mIGFuIGl0ZW0gaW50byBhIHJlbGF0aXZlIG9uZS5cclxuXHQgKiBAcGFyYW0gcG9zaXRpb24gVGhlIGFic29sdXRlIHBvc2l0aW9uIHRvIGNvbnZlcnQuXHJcblx0ICogQHJldHVybnMgVGhlIGNvbnZlcnRlZCBwb3NpdGlvbi5cclxuXHQgKi9cclxuICByZWxhdGl2ZShwb3NpdGlvbjogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdHBvc2l0aW9uIC09IHRoaXMuX2Nsb25lcy5sZW5ndGggLyAyO1xyXG5cdFx0cmV0dXJuIHRoaXMubm9ybWFsaXplKHBvc2l0aW9uLCB0cnVlKTtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEdldHMgdGhlIG1heGltdW0gcG9zaXRpb24gZm9yIHRoZSBjdXJyZW50IGl0ZW0uXHJcblx0ICogQHBhcmFtIHJlbGF0aXZlIFdoZXRoZXIgdG8gcmV0dXJuIGFuIGFic29sdXRlIHBvc2l0aW9uIG9yIGEgcmVsYXRpdmUgcG9zaXRpb24uXHJcblx0ICogQHJldHVybnMgbnVtYmVyIG9mIG1heGltdW0gcG9zaXRpb25cclxuXHQgKi9cclxuICBtYXhpbXVtKHJlbGF0aXZlOiBib29sZWFuID0gZmFsc2UpOiBudW1iZXIge1xyXG5cdFx0Y29uc3Qgc2V0dGluZ3MgPSB0aGlzLnNldHRpbmdzO1xyXG5cdFx0bGV0XHRtYXhpbXVtID0gdGhpcy5fY29vcmRpbmF0ZXMubGVuZ3RoLFxyXG5cdFx0XHRpdGVyYXRvcixcclxuXHRcdFx0cmVjaXByb2NhbEl0ZW1zV2lkdGgsXHJcblx0XHRcdGVsZW1lbnRXaWR0aDtcclxuXHJcblx0XHRpZiAoc2V0dGluZ3MubG9vcCkge1xyXG5cdFx0XHRtYXhpbXVtID0gdGhpcy5fY2xvbmVzLmxlbmd0aCAvIDIgKyB0aGlzLl9pdGVtcy5sZW5ndGggLSAxO1xyXG5cdFx0fSBlbHNlIGlmIChzZXR0aW5ncy5hdXRvV2lkdGggfHwgc2V0dGluZ3MubWVyZ2UpIHtcclxuXHRcdFx0aXRlcmF0b3IgPSB0aGlzLl9pdGVtcy5sZW5ndGg7XHJcblx0XHRcdHJlY2lwcm9jYWxJdGVtc1dpZHRoID0gdGhpcy5zbGlkZXNEYXRhWy0taXRlcmF0b3JdLndpZHRoO1xyXG5cdFx0XHRlbGVtZW50V2lkdGggPSB0aGlzLl93aWR0aDtcclxuXHRcdFx0d2hpbGUgKGl0ZXJhdG9yLS0pIHtcclxuXHRcdFx0XHQvLyBpdCBjb3VsZCBiZSB1c2UgdGhpcy5faXRlbXMgaW5zdGVhZCBvZiB0aGlzLnNsaWRlc0RhdGE7XHJcblx0XHRcdFx0cmVjaXByb2NhbEl0ZW1zV2lkdGggKz0gK3RoaXMuc2xpZGVzRGF0YVtpdGVyYXRvcl0ud2lkdGggKyB0aGlzLnNldHRpbmdzLm1hcmdpbjtcclxuXHRcdFx0XHRpZiAocmVjaXByb2NhbEl0ZW1zV2lkdGggPiBlbGVtZW50V2lkdGgpIHtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRtYXhpbXVtID0gaXRlcmF0b3IgKyAxO1xyXG5cdFx0fSBlbHNlIGlmIChzZXR0aW5ncy5jZW50ZXIpIHtcclxuXHRcdFx0bWF4aW11bSA9IHRoaXMuX2l0ZW1zLmxlbmd0aCAtIDE7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRtYXhpbXVtID0gdGhpcy5faXRlbXMubGVuZ3RoIC0gc2V0dGluZ3MuaXRlbXM7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHJlbGF0aXZlKSB7XHJcblx0XHRcdG1heGltdW0gLT0gdGhpcy5fY2xvbmVzLmxlbmd0aCAvIDI7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIE1hdGgubWF4KG1heGltdW0sIDApO1xyXG5cdCB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEdldHMgdGhlIG1pbmltdW0gcG9zaXRpb24gZm9yIHRoZSBjdXJyZW50IGl0ZW0uXHJcblx0ICogQHBhcmFtIHJlbGF0aXZlIFdoZXRoZXIgdG8gcmV0dXJuIGFuIGFic29sdXRlIHBvc2l0aW9uIG9yIGEgcmVsYXRpdmUgcG9zaXRpb24uXHJcblx0ICogQHJldHVybnMgbnVtYmVyIG9mIG1pbmltdW0gcG9zaXRpb25cclxuXHQgKi9cclxuICBtaW5pbXVtKHJlbGF0aXZlOiBib29sZWFuID0gZmFsc2UpOiBudW1iZXIge1xyXG5cdFx0cmV0dXJuIHJlbGF0aXZlID8gMCA6IHRoaXMuX2Nsb25lcy5sZW5ndGggLyAyO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogR2V0cyBhbiBpdGVtIGF0IHRoZSBzcGVjaWZpZWQgcmVsYXRpdmUgcG9zaXRpb24uXHJcblx0ICogQHBhcmFtIHBvc2l0aW9uIFRoZSByZWxhdGl2ZSBwb3NpdGlvbiBvZiB0aGUgaXRlbS5cclxuXHQgKiBAcmV0dXJucyBUaGUgaXRlbSBhdCB0aGUgZ2l2ZW4gcG9zaXRpb24gb3IgYWxsIGl0ZW1zIGlmIG5vIHBvc2l0aW9uIHdhcyBnaXZlbi5cclxuXHQgKi9cclxuICBpdGVtcyhwb3NpdGlvbj86IG51bWJlcik6IENhcm91c2VsU2xpZGVEaXJlY3RpdmVbXSB7XHJcblx0XHRpZiAocG9zaXRpb24gPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5faXRlbXMuc2xpY2UoKTtcclxuXHRcdH1cclxuXHJcblx0XHRwb3NpdGlvbiA9IHRoaXMubm9ybWFsaXplKHBvc2l0aW9uLCB0cnVlKTtcclxuXHRcdHJldHVybiBbdGhpcy5faXRlbXNbcG9zaXRpb25dXTtcclxuXHQgfVxyXG5cclxuICAvKipcclxuXHQgKiBHZXRzIGFuIGl0ZW0gYXQgdGhlIHNwZWNpZmllZCByZWxhdGl2ZSBwb3NpdGlvbi5cclxuXHQgKiBAcGFyYW0gcG9zaXRpb24gVGhlIHJlbGF0aXZlIHBvc2l0aW9uIG9mIHRoZSBpdGVtLlxyXG5cdCAqIEByZXR1cm5zIFRoZSBpdGVtIGF0IHRoZSBnaXZlbiBwb3NpdGlvbiBvciBhbGwgaXRlbXMgaWYgbm8gcG9zaXRpb24gd2FzIGdpdmVuLlxyXG5cdCAqL1xyXG4gIG1lcmdlcnMocG9zaXRpb246IG51bWJlcik6IG51bWJlciB8IG51bWJlcltdIHtcclxuXHRcdGlmIChwb3NpdGlvbiA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLl9tZXJnZXJzLnNsaWNlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cG9zaXRpb24gPSB0aGlzLm5vcm1hbGl6ZShwb3NpdGlvbiwgdHJ1ZSk7XHJcblx0XHRyZXR1cm4gdGhpcy5fbWVyZ2Vyc1twb3NpdGlvbl07XHJcblx0IH1cclxuXHJcbiAgLyoqXHJcblx0ICogR2V0cyB0aGUgYWJzb2x1dGUgcG9zaXRpb25zIG9mIGNsb25lcyBmb3IgYW4gaXRlbS5cclxuXHQgKiBAcGFyYW0gcG9zaXRpb24gVGhlIHJlbGF0aXZlIHBvc2l0aW9uIG9mIHRoZSBpdGVtLlxyXG5cdCAqIEByZXR1cm5zIFRoZSBhYnNvbHV0ZSBwb3NpdGlvbnMgb2YgY2xvbmVzIGZvciB0aGUgaXRlbSBvciBhbGwgaWYgbm8gcG9zaXRpb24gd2FzIGdpdmVuLlxyXG5cdCAqL1xyXG4gIGNsb25lcyhwb3NpdGlvbj86IG51bWJlcik6IG51bWJlcltdIHtcclxuXHRcdGNvbnN0IG9kZCA9IHRoaXMuX2Nsb25lcy5sZW5ndGggLyAyLFxyXG5cdFx0XHRldmVuID0gb2RkICsgdGhpcy5faXRlbXMubGVuZ3RoLFxyXG5cdFx0XHRtYXAgPSBpbmRleCA9PiBpbmRleCAlIDIgPT09IDAgPyBldmVuICsgaW5kZXggLyAyIDogb2RkIC0gKGluZGV4ICsgMSkgLyAyO1xyXG5cclxuXHRcdGlmIChwb3NpdGlvbiA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLl9jbG9uZXMubWFwKCh2LCBpKSA9PiBtYXAoaSkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzLl9jbG9uZXMubWFwKCh2LCBpKSA9PiB2ID09PSBwb3NpdGlvbiA/IG1hcChpKSA6IG51bGwpLmZpbHRlcihpdGVtID0+IGl0ZW0pO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogU2V0cyB0aGUgY3VycmVudCBhbmltYXRpb24gc3BlZWQuXHJcblx0ICogQHBhcmFtIHNwZWVkIFRoZSBhbmltYXRpb24gc3BlZWQgaW4gbWlsbGlzZWNvbmRzIG9yIG5vdGhpbmcgdG8gbGVhdmUgaXQgdW5jaGFuZ2VkLlxyXG5cdCAqIEByZXR1cm5zIFRoZSBjdXJyZW50IGFuaW1hdGlvbiBzcGVlZCBpbiBtaWxsaXNlY29uZHMuXHJcblx0ICovXHJcbiAgc3BlZWQoc3BlZWQ/OiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0aWYgKHNwZWVkICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0dGhpcy5fc3BlZWQgPSBzcGVlZDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fc3BlZWQ7XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBHZXRzIHRoZSBjb29yZGluYXRlIG9mIGFuIGl0ZW0uXHJcblx0ICogQHRvZG8gVGhlIG5hbWUgb2YgdGhpcyBtZXRob2QgaXMgbWlzc2xlYW5kaW5nLlxyXG5cdCAqIEBwYXJhbSBwb3NpdGlvbiBUaGUgYWJzb2x1dGUgcG9zaXRpb24gb2YgdGhlIGl0ZW0gd2l0aGluIGBtaW5pbXVtKClgIGFuZCBgbWF4aW11bSgpYC5cclxuXHQgKiBAcmV0dXJucyBUaGUgY29vcmRpbmF0ZSBvZiB0aGUgaXRlbSBpbiBwaXhlbCBvciBhbGwgY29vcmRpbmF0ZXMuXHJcblx0ICovXHJcbiAgY29vcmRpbmF0ZXMocG9zaXRpb24/OiBudW1iZXIpOiBudW1iZXIgfCBudW1iZXJbXSB7XHJcblx0XHRsZXQgbXVsdGlwbGllciA9IDEsXHJcblx0XHRcdG5ld1Bvc2l0aW9uID0gcG9zaXRpb24gLSAxLFxyXG5cdFx0XHRjb29yZGluYXRlLFxyXG5cdFx0XHRyZXN1bHQ6IG51bWJlcltdO1xyXG5cclxuXHRcdGlmIChwb3NpdGlvbiA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHJlc3VsdCA9IHRoaXMuX2Nvb3JkaW5hdGVzLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5jb29yZGluYXRlcyhpbmRleCkgYXMgbnVtYmVyO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5jZW50ZXIpIHtcclxuXHRcdFx0aWYgKHRoaXMuc2V0dGluZ3MucnRsKSB7XHJcblx0XHRcdFx0bXVsdGlwbGllciA9IC0xO1xyXG5cdFx0XHRcdG5ld1Bvc2l0aW9uID0gcG9zaXRpb24gKyAxO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRjb29yZGluYXRlID0gdGhpcy5fY29vcmRpbmF0ZXNbcG9zaXRpb25dO1xyXG5cdFx0XHRjb29yZGluYXRlICs9ICh0aGlzLndpZHRoKCkgLSBjb29yZGluYXRlICsgKHRoaXMuX2Nvb3JkaW5hdGVzW25ld1Bvc2l0aW9uXSB8fCAwKSkgLyAyICogbXVsdGlwbGllcjtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNvb3JkaW5hdGUgPSB0aGlzLl9jb29yZGluYXRlc1tuZXdQb3NpdGlvbl0gfHwgMDtcclxuXHRcdH1cclxuXHJcblx0XHRjb29yZGluYXRlID0gTWF0aC5jZWlsKGNvb3JkaW5hdGUpO1xyXG5cclxuXHRcdHJldHVybiBjb29yZGluYXRlO1xyXG5cdCB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIENhbGN1bGF0ZXMgdGhlIHNwZWVkIGZvciBhIHRyYW5zbGF0aW9uLlxyXG5cdCAqIEBwYXJhbSBmcm9tIFRoZSBhYnNvbHV0ZSBwb3NpdGlvbiBvZiB0aGUgc3RhcnQgaXRlbS5cclxuXHQgKiBAcGFyYW0gdG8gVGhlIGFic29sdXRlIHBvc2l0aW9uIG9mIHRoZSB0YXJnZXQgaXRlbS5cclxuXHQgKiBAcGFyYW0gZmFjdG9yIFtmYWN0b3I9dW5kZWZpbmVkXSAtIFRoZSB0aW1lIGZhY3RvciBpbiBtaWxsaXNlY29uZHMuXHJcblx0ICogQHJldHVybnMgVGhlIHRpbWUgaW4gbWlsbGlzZWNvbmRzIGZvciB0aGUgdHJhbnNsYXRpb24uXHJcblx0ICovXHJcbiAgcHJpdmF0ZSBfZHVyYXRpb24oZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyLCBmYWN0b3I/OiBudW1iZXIgfCBib29sZWFuKTogbnVtYmVyIHtcclxuXHRcdGlmIChmYWN0b3IgPT09IDApIHtcclxuXHRcdFx0cmV0dXJuIDA7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIE1hdGgubWluKE1hdGgubWF4KE1hdGguYWJzKHRvIC0gZnJvbSksIDEpLCA2KSAqIE1hdGguYWJzKCgrZmFjdG9yIHx8IHRoaXMuc2V0dGluZ3Muc21hcnRTcGVlZCkpO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogU2xpZGVzIHRvIHRoZSBzcGVjaWZpZWQgaXRlbS5cclxuXHQgKiBAcGFyYW0gcG9zaXRpb24gVGhlIHBvc2l0aW9uIG9mIHRoZSBpdGVtLlxyXG5cdCAqIEBwYXJhbSBzcGVlZCBUaGUgdGltZSBpbiBtaWxsaXNlY29uZHMgZm9yIHRoZSB0cmFuc2l0aW9uLlxyXG5cdCAqL1xyXG4gIHRvKHBvc2l0aW9uOiBudW1iZXIsIHNwZWVkOiBudW1iZXIgfCBib29sZWFuKSB7XHJcblx0XHRsZXQgY3VycmVudCA9IHRoaXMuY3VycmVudCgpLFxyXG5cdFx0XHRyZXZlcnQgPSBudWxsLFxyXG5cdFx0XHRkaXN0YW5jZSA9IHBvc2l0aW9uIC0gdGhpcy5yZWxhdGl2ZShjdXJyZW50KSxcclxuXHRcdFx0bWF4aW11bSA9IHRoaXMubWF4aW11bSgpO1xyXG5cdFx0Y29uc3RcdGRpcmVjdGlvbiA9ICsoZGlzdGFuY2UgPiAwKSAtICsoZGlzdGFuY2UgPCAwKSxcclxuXHRcdFx0aXRlbXMgPSB0aGlzLl9pdGVtcy5sZW5ndGgsXHJcblx0XHRcdG1pbmltdW0gPSB0aGlzLm1pbmltdW0oKTtcclxuXHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5sb29wKSB7XHJcblx0XHRcdGlmICghdGhpcy5zZXR0aW5ncy5yZXdpbmQgJiYgTWF0aC5hYnMoZGlzdGFuY2UpID4gaXRlbXMgLyAyKSB7XHJcblx0XHRcdFx0ZGlzdGFuY2UgKz0gZGlyZWN0aW9uICogLTEgKiBpdGVtcztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cG9zaXRpb24gPSBjdXJyZW50ICsgZGlzdGFuY2U7XHJcblx0XHRcdHJldmVydCA9ICgocG9zaXRpb24gLSBtaW5pbXVtKSAlIGl0ZW1zICsgaXRlbXMpICUgaXRlbXMgKyBtaW5pbXVtO1xyXG5cclxuXHRcdFx0aWYgKHJldmVydCAhPT0gcG9zaXRpb24gJiYgcmV2ZXJ0IC0gZGlzdGFuY2UgPD0gbWF4aW11bSAmJiByZXZlcnQgLSBkaXN0YW5jZSA+IDApIHtcclxuXHRcdFx0XHRjdXJyZW50ID0gcmV2ZXJ0IC0gZGlzdGFuY2U7XHJcblx0XHRcdFx0cG9zaXRpb24gPSByZXZlcnQ7XHJcblx0XHRcdFx0dGhpcy5yZXNldChjdXJyZW50KTtcclxuXHRcdFx0XHR0aGlzLnNlbmRDaGFuZ2VzKCk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSBpZiAodGhpcy5zZXR0aW5ncy5yZXdpbmQpIHtcclxuXHRcdFx0bWF4aW11bSArPSAxO1xyXG5cdFx0XHRwb3NpdGlvbiA9IChwb3NpdGlvbiAlIG1heGltdW0gKyBtYXhpbXVtKSAlIG1heGltdW07XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRwb3NpdGlvbiA9IE1hdGgubWF4KG1pbmltdW0sIE1hdGgubWluKG1heGltdW0sIHBvc2l0aW9uKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdHRoaXMuc3BlZWQodGhpcy5fZHVyYXRpb24oY3VycmVudCwgcG9zaXRpb24sIHNwZWVkKSk7XHJcblx0XHRcdHRoaXMuY3VycmVudChwb3NpdGlvbik7XHJcblxyXG5cdFx0XHR0aGlzLnVwZGF0ZSgpO1xyXG5cdFx0fSwgMCk7XHJcblxyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogU2xpZGVzIHRvIHRoZSBuZXh0IGl0ZW0uXHJcblx0ICogQHBhcmFtIHNwZWVkIFRoZSB0aW1lIGluIG1pbGxpc2Vjb25kcyBmb3IgdGhlIHRyYW5zaXRpb24uXHJcblx0ICovXHJcbiAgbmV4dChzcGVlZDogbnVtYmVyIHwgYm9vbGVhbikge1xyXG5cdFx0c3BlZWQgPSBzcGVlZCB8fCBmYWxzZTtcclxuXHRcdHRoaXMudG8odGhpcy5yZWxhdGl2ZSh0aGlzLmN1cnJlbnQoKSkgKyAxLCBzcGVlZCk7XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBTbGlkZXMgdG8gdGhlIHByZXZpb3VzIGl0ZW0uXHJcblx0ICogQHBhcmFtIHNwZWVkIFRoZSB0aW1lIGluIG1pbGxpc2Vjb25kcyBmb3IgdGhlIHRyYW5zaXRpb24uXHJcblx0ICovXHJcbiAgcHJldihzcGVlZDogbnVtYmVyIHwgYm9vbGVhbikge1xyXG5cdFx0c3BlZWQgPSBzcGVlZCB8fCBmYWxzZTtcclxuXHRcdHRoaXMudG8odGhpcy5yZWxhdGl2ZSh0aGlzLmN1cnJlbnQoKSkgLSAxLCBzcGVlZCk7XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBIYW5kbGVzIHRoZSBlbmQgb2YgYW4gYW5pbWF0aW9uLlxyXG5cdCAqIEBwYXJhbSBldmVudCAtIFRoZSBldmVudCBhcmd1bWVudHMuXHJcblx0ICovXHJcbiAgb25UcmFuc2l0aW9uRW5kKGV2ZW50PzogYW55KSB7XHJcblx0XHQvLyBpZiBjc3MyIGFuaW1hdGlvbiB0aGVuIGV2ZW50IG9iamVjdCBpcyB1bmRlZmluZWRcclxuXHRcdGlmIChldmVudCAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdC8vIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuXHRcdFx0Ly8gLy8gQ2F0Y2ggb25seSBvd2wtc3RhZ2UgdHJhbnNpdGlvbkVuZCBldmVudFxyXG5cdFx0XHQvLyBpZiAoKGV2ZW50LnRhcmdldCB8fCBldmVudC5zcmNFbGVtZW50IHx8IGV2ZW50Lm9yaWdpbmFsVGFyZ2V0KSAhPT0gdGhpcy4kc3RhZ2UuZ2V0KDApXHQpIHtcclxuXHRcdFx0Ly8gXHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdC8vIH1cclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5sZWF2ZSgnYW5pbWF0aW5nJyk7XHJcblx0XHR0aGlzLl90cmlnZ2VyKCd0cmFuc2xhdGVkJyk7XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBHZXRzIHZpZXdwb3J0IHdpZHRoLlxyXG5cdCAqIEByZXR1cm5zIC0gVGhlIHdpZHRoIGluIHBpeGVsLlxyXG5cdCAqL1xyXG4gIHByaXZhdGUgX3ZpZXdwb3J0KCk6IG51bWJlciB7XHJcblx0XHRsZXQgd2lkdGg7XHJcblx0XHRpZiAodGhpcy5fd2lkdGgpIHtcclxuXHRcdFx0d2lkdGggPSB0aGlzLl93aWR0aDtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNvbnNvbGUud2FybignQ2FuIG5vdCBkZXRlY3Qgdmlld3BvcnQgd2lkdGguJyk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gd2lkdGg7XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBTZXRzIF9pdGVtc1xyXG5cdCAqIEBwYXJhbSBjb250ZW50IFRoZSBsaXN0IG9mIHNsaWRlcyBwdXQgaW50byBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlcy5cclxuXHQgKi9cclxuICBzZXRJdGVtcyhjb250ZW50OiBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlW10pIHtcclxuXHRcdHRoaXMuX2l0ZW1zID0gY29udGVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgc2xpZGVzRGF0YSB1c2luZyB0aGlzLl9pdGVtc1xyXG5cdCAqL1xyXG5cdHByaXZhdGUgX2RlZmluZVNsaWRlc0RhdGEoKSB7XHJcblx0XHQvLyBNYXliZSBjcmVhdGluZyBhbmQgdXNpbmcgbG9hZE1hcCB3b3VsZCBiZSBiZXR0ZXIgaW4gTGF6eUxvYWRTZXJ2aWNlLlxyXG5cdFx0Ly8gSG92ZXdlciBpbiB0aGF0IGNhc2Ugd2hlbiAncmVzaXplJyBldmVudCBmaXJlcywgcHJvcCAnbG9hZCcgb2YgYWxsIHNsaWRlcyB3aWxsIGdldCAnZmFsc2UnIGFuZCBzdWNoIHN0YXRlIG9mIHByb3Agd2lsbCBiZSBzZWVuIGJ5IFZpZXcgZHVyaW5nIGl0cyB1cGRhdGluZy4gQWNjb3JkaW5nbHkgdGhlIGNvZGUgd2lsbCByZW1vdmUgc2xpZGVzJ3MgY29udGVudCBmcm9tIERPTSBldmVuIGlmIGl0IHdhcyBsb2FkZWQgYmVmb3JlLlxyXG5cdFx0Ly8gVGh1cyBpdCB3b3VsZCBiZSBuZWVkZWQgdG8gYWRkIHRoYXQgY29udGVudCBpbnRvIERPTSBhZ2Fpbi5cclxuXHRcdC8vIEluIG9yZGVyIHRvIGF2b2lkIGFkZGl0aW9uYWwgcmVtb3ZpbmcvYWRkaW5nIGxvYWRlZCBzbGlkZXMncyBjb250ZW50IHdlIHVzZSBsb2FkTWFwIGhlcmUgYW5kIHNldCByZXN0b3JlIHN0YXRlIG9mIHByb3AgJ2xvYWQnIGJlZm9yZSB0aGUgVmlldyB3aWxsIGdldCBpdC5cclxuXHRcdGxldCBsb2FkTWFwOiBNYXA8c3RyaW5nLCBib29sZWFuPjtcclxuXHJcblx0XHRpZiAodGhpcy5zbGlkZXNEYXRhICYmIHRoaXMuc2xpZGVzRGF0YS5sZW5ndGgpIHtcclxuXHRcdFx0bG9hZE1hcCA9IG5ldyBNYXAoKTtcclxuXHRcdFx0dGhpcy5zbGlkZXNEYXRhLmZvckVhY2goaXRlbSA9PiB7XHJcblx0XHRcdFx0aWYgKGl0ZW0ubG9hZCkge1xyXG5cdFx0XHRcdFx0bG9hZE1hcC5zZXQoaXRlbS5pZCwgaXRlbS5sb2FkKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zbGlkZXNEYXRhID0gdGhpcy5faXRlbXMubWFwKHNsaWRlID0+IHtcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRpZDogYCR7c2xpZGUuaWR9YCxcclxuXHRcdFx0XHRpc0FjdGl2ZTogZmFsc2UsXHJcblx0XHRcdFx0dHBsUmVmOiBzbGlkZS50cGxSZWYsXHJcblx0XHRcdFx0ZGF0YU1lcmdlOiBzbGlkZS5kYXRhTWVyZ2UsXHJcblx0XHRcdFx0d2lkdGg6IDAsXHJcblx0XHRcdFx0aXNDbG9uZWQ6IGZhbHNlLFxyXG5cdFx0XHRcdGxvYWQ6IGxvYWRNYXAgPyBsb2FkTWFwLmdldChzbGlkZS5pZCkgOiBmYWxzZSxcclxuXHRcdFx0XHRoYXNoRnJhZ21lbnQ6IHNsaWRlLmRhdGFIYXNoXHJcblx0XHRcdH07XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgY3VycmVudCBjbGFzc2VzIGZvciBzbGlkZVxyXG5cdCAqIEBwYXJhbSBzbGlkZSBTbGlkZSBvZiBjYXJvdXNlbFxyXG5cdCAqIEByZXR1cm5zIG9iamVjdCB3aXRoIG5hbWVzIG9mIGNzcy1jbGFzc2VzIHdoaWNoIGFyZSBrZXlzIGFuZCB0cnVlL2ZhbHNlIHZhbHVlc1xyXG5cdCAqL1xyXG5cdHNldEN1clNsaWRlQ2xhc3NlcyhzbGlkZTogU2xpZGVNb2RlbCk6IHtba2V5OiBzdHJpbmddOiBib29sZWFufSB7XHJcblx0XHQvLyBDU1MgY2xhc3NlczogYWRkZWQvcmVtb3ZlZCBwZXIgY3VycmVudCBzdGF0ZSBvZiBjb21wb25lbnQgcHJvcGVydGllc1xyXG5cdFx0Y29uc3QgY3VycmVudENsYXNzZXM6IHtba2V5OiBzdHJpbmddOiBib29sZWFufSA9ICB7XHJcblx0XHRcdCdhY3RpdmUnOiBzbGlkZS5pc0FjdGl2ZSxcclxuXHRcdFx0J2NlbnRlcic6IHNsaWRlLmlzQ2VudGVyZWQsXHJcblx0XHRcdCdjbG9uZWQnOiBzbGlkZS5pc0Nsb25lZCxcclxuXHRcdFx0J2FuaW1hdGVkJzogc2xpZGUuaXNBbmltYXRlZCxcclxuXHRcdFx0J293bC1hbmltYXRlZC1pbic6IHNsaWRlLmlzRGVmQW5pbWF0ZWRJbixcclxuXHRcdFx0J293bC1hbmltYXRlZC1vdXQnOiBzbGlkZS5pc0RlZkFuaW1hdGVkT3V0XHJcblx0XHR9O1xyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3MuYW5pbWF0ZUluKSB7XHJcblx0XHRcdGN1cnJlbnRDbGFzc2VzW3RoaXMuc2V0dGluZ3MuYW5pbWF0ZUluIGFzIHN0cmluZ10gPSBzbGlkZS5pc0N1c3RvbUFuaW1hdGVkSW47XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5hbmltYXRlT3V0KSB7XHJcblx0XHRcdGN1cnJlbnRDbGFzc2VzW3RoaXMuc2V0dGluZ3MuYW5pbWF0ZU91dCBhcyBzdHJpbmddID0gc2xpZGUuaXNDdXN0b21BbmltYXRlZE91dDtcclxuXHRcdH1cclxuXHRcdHJldHVybiBjdXJyZW50Q2xhc3NlcztcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIE9wZXJhdG9ycyB0byBjYWxjdWxhdGUgcmlnaHQtdG8tbGVmdCBhbmQgbGVmdC10by1yaWdodC5cclxuXHQgKiBAcGFyYW0gYSAtIFRoZSBsZWZ0IHNpZGUgb3BlcmFuZC5cclxuXHQgKiBAcGFyYW0gbyAtIFRoZSBvcGVyYXRvci5cclxuXHQgKiBAcGFyYW0gYiAtIFRoZSByaWdodCBzaWRlIG9wZXJhbmQuXHJcblx0ICogQHJldHVybnMgdHJ1ZS9mYWxzZSBtZWFuaW5nIHJpZ2h0LXRvLWxlZnQgb3IgbGVmdC10by1yaWdodFxyXG5cdCAqL1xyXG4gIHByaXZhdGUgX29wKGE6IG51bWJlciwgbzogc3RyaW5nLCBiOiBudW1iZXIpOiBib29sZWFuIHtcclxuXHRcdGNvbnN0IHJ0bCA9IHRoaXMuc2V0dGluZ3MucnRsO1xyXG5cdFx0c3dpdGNoIChvKSB7XHJcblx0XHRcdGNhc2UgJzwnOlxyXG5cdFx0XHRcdHJldHVybiBydGwgPyBhID4gYiA6IGEgPCBiO1xyXG5cdFx0XHRjYXNlICc+JzpcclxuXHRcdFx0XHRyZXR1cm4gcnRsID8gYSA8IGIgOiBhID4gYjtcclxuXHRcdFx0Y2FzZSAnPj0nOlxyXG5cdFx0XHRcdHJldHVybiBydGwgPyBhIDw9IGIgOiBhID49IGI7XHJcblx0XHRcdGNhc2UgJzw9JzpcclxuXHRcdFx0XHRyZXR1cm4gcnRsID8gYSA+PSBiIDogYSA8PSBiO1xyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogVHJpZ2dlcnMgYSBwdWJsaWMgZXZlbnQuXHJcblx0ICogQHRvZG8gUmVtb3ZlIGBzdGF0dXNgLCBgcmVsYXRlZFRhcmdldGAgc2hvdWxkIGJlIHVzZWQgaW5zdGVhZC5cclxuXHQgKiBAcGFyYW0gbmFtZSBUaGUgZXZlbnQgbmFtZS5cclxuXHQgKiBAcGFyYW0gZGF0YSBUaGUgZXZlbnQgZGF0YS5cclxuXHQgKiBAcGFyYW0gbmFtZXNwYWNlIFRoZSBldmVudCBuYW1lc3BhY2UuXHJcblx0ICogQHBhcmFtIHN0YXRlIFRoZSBzdGF0ZSB3aGljaCBpcyBhc3NvY2lhdGVkIHdpdGggdGhlIGV2ZW50LlxyXG5cdCAqIEBwYXJhbSBlbnRlciBJbmRpY2F0ZXMgaWYgdGhlIGNhbGwgZW50ZXJzIHRoZSBzcGVjaWZpZWQgc3RhdGUgb3Igbm90LlxyXG5cdCAqL1xyXG4gIHByaXZhdGUgX3RyaWdnZXIobmFtZTogc3RyaW5nLCBkYXRhPzogYW55LCBuYW1lc3BhY2U/OiBzdHJpbmcsIHN0YXRlPzogc3RyaW5nLCBlbnRlcj86IGJvb2xlYW4pIHtcclxuXHRcdHN3aXRjaCAobmFtZSkge1xyXG5cdFx0XHRjYXNlICdpbml0aWFsaXplZCc6XHJcblx0XHRcdFx0dGhpcy5faW5pdGlhbGl6ZWRDYXJvdXNlbCQubmV4dChuYW1lKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnY2hhbmdlJzpcclxuXHRcdFx0XHR0aGlzLl9jaGFuZ2VTZXR0aW5nc0Nhcm91c2VsJC5uZXh0KGRhdGEpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdjaGFuZ2VkJzpcclxuXHRcdFx0XHR0aGlzLl9jaGFuZ2VkU2V0dGluZ3NDYXJvdXNlbCQubmV4dChkYXRhKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnZHJhZyc6XHJcblx0XHRcdFx0dGhpcy5fZHJhZ0Nhcm91c2VsJC5uZXh0KG5hbWUpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdkcmFnZ2VkJzpcclxuXHRcdFx0XHR0aGlzLl9kcmFnZ2VkQ2Fyb3VzZWwkLm5leHQobmFtZSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ3Jlc2l6ZSc6XHJcblx0XHRcdFx0dGhpcy5fcmVzaXplQ2Fyb3VzZWwkLm5leHQobmFtZSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ3Jlc2l6ZWQnOlxyXG5cdFx0XHRcdHRoaXMuX3Jlc2l6ZWRDYXJvdXNlbCQubmV4dChuYW1lKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAncmVmcmVzaCc6XHJcblx0XHRcdFx0dGhpcy5fcmVmcmVzaENhcm91c2VsJC5uZXh0KG5hbWUpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdyZWZyZXNoZWQnOlxyXG5cdFx0XHRcdHRoaXMuX3JlZnJlc2hlZENhcm91c2VsJC5uZXh0KG5hbWUpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICd0cmFuc2xhdGUnOlxyXG5cdFx0XHRcdHRoaXMuX3RyYW5zbGF0ZUNhcm91c2VsJC5uZXh0KG5hbWUpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICd0cmFuc2xhdGVkJzpcclxuXHRcdFx0XHR0aGlzLl90cmFuc2xhdGVkQ2Fyb3VzZWwkLm5leHQobmFtZSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRW50ZXJzIGEgc3RhdGUuXHJcblx0ICogQHBhcmFtIG5hbWUgLSBUaGUgc3RhdGUgbmFtZS5cclxuXHQgKi9cclxuICBlbnRlcihuYW1lOiBzdHJpbmcpIHtcclxuICAgIFsgbmFtZSBdLmNvbmNhdCh0aGlzLl9zdGF0ZXMudGFnc1tuYW1lXSB8fCBbXSkuZm9yRWFjaCgoc3RhdGVOYW1lKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLl9zdGF0ZXMuY3VycmVudFtzdGF0ZU5hbWVdID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHR0aGlzLl9zdGF0ZXMuY3VycmVudFtzdGF0ZU5hbWVdID0gMDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5fc3RhdGVzLmN1cnJlbnRbc3RhdGVOYW1lXSsrO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcblx0ICogTGVhdmVzIGEgc3RhdGUuXHJcblx0ICogQHBhcmFtIG5hbWUgLSBUaGUgc3RhdGUgbmFtZS5cclxuXHQgKi9cclxuXHRsZWF2ZShuYW1lOiBzdHJpbmcpIHtcclxuICAgIFsgbmFtZSBdLmNvbmNhdCh0aGlzLl9zdGF0ZXMudGFnc1tuYW1lXSB8fCBbXSkuZm9yRWFjaCgoc3RhdGVOYW1lKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLl9zdGF0ZXMuY3VycmVudFtzdGF0ZU5hbWVdID09PSAwIHx8ICEhdGhpcy5fc3RhdGVzLmN1cnJlbnRbc3RhdGVOYW1lXSkge1xyXG4gICAgICAgIHRoaXMuX3N0YXRlcy5jdXJyZW50W3N0YXRlTmFtZV0tLTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9O1xyXG5cclxuICAvKipcclxuXHQgKiBSZWdpc3RlcnMgYW4gZXZlbnQgb3Igc3RhdGUuXHJcblx0ICogQHBhcmFtIG9iamVjdCAtIFRoZSBldmVudCBvciBzdGF0ZSB0byByZWdpc3Rlci5cclxuXHQgKi9cclxuICByZWdpc3RlcihvYmplY3Q6IGFueSkge1xyXG5cdFx0aWYgKG9iamVjdC50eXBlID09PSBUeXBlLlN0YXRlKSB7XHJcblx0XHRcdGlmICghdGhpcy5fc3RhdGVzLnRhZ3Nbb2JqZWN0Lm5hbWVdKSB7XHJcblx0XHRcdFx0dGhpcy5fc3RhdGVzLnRhZ3Nbb2JqZWN0Lm5hbWVdID0gb2JqZWN0LnRhZ3M7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5fc3RhdGVzLnRhZ3Nbb2JqZWN0Lm5hbWVdID0gdGhpcy5fc3RhdGVzLnRhZ3Nbb2JqZWN0Lm5hbWVdLmNvbmNhdChvYmplY3QudGFncyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuX3N0YXRlcy50YWdzW29iamVjdC5uYW1lXSA9IHRoaXMuX3N0YXRlcy50YWdzW29iamVjdC5uYW1lXS5maWx0ZXIoKHRhZywgaSkgPT4ge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLl9zdGF0ZXMudGFnc1tvYmplY3QubmFtZV0uaW5kZXhPZih0YWcpID09PSBpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIFN1cHByZXNzZXMgZXZlbnRzLlxyXG5cdCAqIEBwYXJhbSBldmVudHMgVGhlIGV2ZW50cyB0byBzdXBwcmVzcy5cclxuXHQgKi9cclxuICBwcml2YXRlIF9zdXBwcmVzcyhldmVudHM6IHN0cmluZ1tdKSB7XHJcblx0XHRldmVudHMuZm9yRWFjaChldmVudCA9PiB7XHJcblx0XHRcdHRoaXMuX3N1cHJlc3NbZXZlbnRdID0gdHJ1ZTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogUmVsZWFzZXMgc3VwcHJlc3NlZCBldmVudHMuXHJcblx0ICogQHBhcmFtIGV2ZW50cyBUaGUgZXZlbnRzIHRvIHJlbGVhc2UuXHJcblx0ICovXHJcbiAgcHJpdmF0ZSBfcmVsZWFzZShldmVudHM6IHN0cmluZ1tdKSB7XHJcblx0XHRldmVudHMuZm9yRWFjaChldmVudCA9PiB7XHJcblx0XHRcdGRlbGV0ZSB0aGlzLl9zdXByZXNzW2V2ZW50XTtcclxuXHRcdH0pO1xyXG5cdCB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEdldHMgdW5pZmllZCBwb2ludGVyIGNvb3JkaW5hdGVzIGZyb20gZXZlbnQuXHJcblx0ICogQHRvZG8gIzI2MVxyXG5cdCAqIEBwYXJhbSBldmVudCBUaGUgYG1vdXNlZG93bmAgb3IgYHRvdWNoc3RhcnRgIGV2ZW50LlxyXG5cdCAqIEByZXR1cm5zIE9iamVjdCBDb29yZHMgd2hpY2ggY29udGFpbnMgYHhgIGFuZCBgeWAgY29vcmRpbmF0ZXMgb2YgY3VycmVudCBwb2ludGVyIHBvc2l0aW9uLlxyXG5cdCAqL1xyXG5cdHBvaW50ZXIoZXZlbnQ6IGFueSk6IENvb3JkcyB7XHJcblx0XHRjb25zdCByZXN1bHQgPSB7IHg6IG51bGwsIHk6IG51bGwgfTtcclxuXHJcblx0XHRldmVudCA9IGV2ZW50Lm9yaWdpbmFsRXZlbnQgfHwgZXZlbnQgfHwgd2luZG93LmV2ZW50O1xyXG5cclxuXHRcdGV2ZW50ID0gZXZlbnQudG91Y2hlcyAmJiBldmVudC50b3VjaGVzLmxlbmd0aCA/XHJcblx0XHRcdGV2ZW50LnRvdWNoZXNbMF0gOiBldmVudC5jaGFuZ2VkVG91Y2hlcyAmJiBldmVudC5jaGFuZ2VkVG91Y2hlcy5sZW5ndGggP1xyXG5cdFx0XHRcdGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdIDogZXZlbnQ7XHJcblxyXG5cdFx0aWYgKGV2ZW50LnBhZ2VYKSB7XHJcblx0XHRcdHJlc3VsdC54ID0gZXZlbnQucGFnZVg7XHJcblx0XHRcdHJlc3VsdC55ID0gZXZlbnQucGFnZVk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXN1bHQueCA9IGV2ZW50LmNsaWVudFg7XHJcblx0XHRcdHJlc3VsdC55ID0gZXZlbnQuY2xpZW50WTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdCB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIERldGVybWluZXMgaWYgdGhlIGlucHV0IGlzIGEgTnVtYmVyIG9yIHNvbWV0aGluZyB0aGF0IGNhbiBiZSBjb2VyY2VkIHRvIGEgTnVtYmVyXHJcblx0ICogQHBhcmFtIG51bWJlciBUaGUgaW5wdXQgdG8gYmUgdGVzdGVkXHJcblx0ICogQHJldHVybnMgQW4gaW5kaWNhdGlvbiBpZiB0aGUgaW5wdXQgaXMgYSBOdW1iZXIgb3IgY2FuIGJlIGNvZXJjZWQgdG8gYSBOdW1iZXJcclxuXHQgKi9cclxuICBwcml2YXRlIF9pc051bWVyaWMobnVtYmVyOiBhbnkpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiAhaXNOYU4ocGFyc2VGbG9hdChudW1iZXIpKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERldGVybWluZXMgd2hldGhlciB2YWx1ZSBpcyBudW1iZXIgb3IgYm9vbGVhbiB0eXBlXHJcblx0ICogQHBhcmFtIHZhbHVlIFRoZSBpbnB1dCB0byBiZSB0ZXN0ZWRcclxuXHQgKiBAcmV0dXJucyBBbiBpbmRpY2F0aW9uIGlmIHRoZSBpbnB1dCBpcyBhIE51bWJlciBvciBjYW4gYmUgY29lcmNlZCB0byBhIE51bWJlciwgb3IgQm9vbGVhblxyXG5cdCAqL1xyXG5cdHByaXZhdGUgX2lzTnVtYmVyT3JCb29sZWFuKHZhbHVlOiBudW1iZXIgfCBib29sZWFuKTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gdGhpcy5faXNOdW1lcmljKHZhbHVlKSB8fCB0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERldGVybWluZXMgd2hldGhlciB2YWx1ZSBpcyBudW1iZXIgb3Igc3RyaW5nIHR5cGVcclxuXHQgKiBAcGFyYW0gdmFsdWUgVGhlIGlucHV0IHRvIGJlIHRlc3RlZFxyXG5cdCAqIEByZXR1cm5zIEFuIGluZGljYXRpb24gaWYgdGhlIGlucHV0IGlzIGEgTnVtYmVyIG9yIGNhbiBiZSBjb2VyY2VkIHRvIGEgTnVtYmVyLCBvciBTdHJpbmdcclxuXHQgKi9cclxuXHRwcml2YXRlIF9pc051bWJlck9yU3RyaW5nKHZhbHVlOiBudW1iZXIgfCBzdHJpbmcpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiB0aGlzLl9pc051bWVyaWModmFsdWUpIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZyc7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdmFsdWUgaXMgbnVtYmVyIG9yIHN0cmluZyB0eXBlXHJcblx0ICogQHBhcmFtIHZhbHVlIFRoZSBpbnB1dCB0byBiZSB0ZXN0ZWRcclxuXHQgKiBAcmV0dXJucyBBbiBpbmRpY2F0aW9uIGlmIHRoZSBpbnB1dCBpcyBhIE51bWJlciBvciBjYW4gYmUgY29lcmNlZCB0byBhIE51bWJlciwgb3IgU3RyaW5nXHJcblx0ICovXHJcblx0cHJpdmF0ZSBfaXNTdHJpbmdPckJvb2xlYW4odmFsdWU6IG51bWJlciB8IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbic7XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBHZXRzIHRoZSBkaWZmZXJlbmNlIG9mIHR3byB2ZWN0b3JzLlxyXG5cdCAqIEB0b2RvICMyNjFcclxuXHQgKiBAcGFyYW0gZmlyc3QgVGhlIGZpcnN0IHZlY3Rvci5cclxuXHQgKiBAcGFyYW0gc2Vjb25kLSBUaGUgc2Vjb25kIHZlY3Rvci5cclxuXHQgKiBAcmV0dXJucyBUaGUgZGlmZmVyZW5jZS5cclxuXHQgKi9cclxuICBkaWZmZXJlbmNlKGZpcnN0OiBDb29yZHMsIHNlY29uZDogQ29vcmRzKTogQ29vcmRzIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHg6IGZpcnN0LnggLSBzZWNvbmQueCxcclxuXHRcdFx0eTogZmlyc3QueSAtIHNlY29uZC55XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5hdkRhdGEsIERvdHNEYXRhIH0gZnJvbSAnLi4vbW9kZWxzL25hdmlnYXRpb24tZGF0YS5tb2RlbHMnO1xyXG5pbXBvcnQgeyBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlIH0gZnJvbSAnLi4vY2Fyb3VzZWwvY2Fyb3VzZWwubW9kdWxlJztcclxuaW1wb3J0IHsgQ2Fyb3VzZWxTZXJ2aWNlIH0gZnJvbSAnLi9jYXJvdXNlbC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBPYnNlcnZhYmxlLCBtZXJnZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyB0YXAsIGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgT3dsT3B0aW9ucyB9IGZyb20gJy4uL21vZGVscy9vd2wtb3B0aW9ucy5tb2RlbCc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBOYXZpZ2F0aW9uU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaW9wdGlvbiB0byBtZXJnZSBPYnNlcnZhYmxlICBmcm9tIENhcm91c2VsU2VydmljZVxyXG4gICAqL1xyXG4gIG5hdlN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgcGx1Z2luIGlzIGluaXRpYWxpemVkIG9yIG5vdC5cclxuICAgKi9cclxuICBwcm90ZWN0ZWQgX2luaXRpYWxpemVkID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjdXJyZW50IHBhZ2luZyBpbmRleGVzLlxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBfcGFnZXM6IGFueVtdID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIERhdGEgZm9yIG5hdmlnYXRpb24gZWxlbWVudHMgb2YgdGhlIHVzZXIgaW50ZXJmYWNlLlxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBfbmF2RGF0YTogTmF2RGF0YSA9IHtcclxuICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgIHByZXY6IHtcclxuICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgICBodG1sVGV4dDogJydcclxuICAgIH0sXHJcbiAgICBuZXh0OiB7XHJcbiAgICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgICAgaHRtbFRleHQ6ICcnXHJcbiAgICB9LFxyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIERhdGEgZm9yIGRvdCBlbGVtZW50cyBvZiB0aGUgdXNlciBpbnRlcmZhY2UuXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIF9kb3RzRGF0YTogRG90c0RhdGEgPSB7XHJcbiAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICBkb3RzOiBbXVxyXG4gIH07XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2Fyb3VzZWxTZXJ2aWNlOiBDYXJvdXNlbFNlcnZpY2UpIHtcclxuICAgIHRoaXMuc3B5RGF0YVN0cmVhbXMoKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5uYXZTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlZmluZXMgT2JzZXJ2YWJsZXMgd2hpY2ggc2VydmljZSBtdXN0IG9ic2VydmVcclxuICAgKi9cclxuICBzcHlEYXRhU3RyZWFtcygpIHtcclxuICAgIGNvbnN0IGluaXRpYWxpemVkQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRJbml0aWFsaXplZFN0YXRlKCkucGlwZShcclxuICAgICAgdGFwKHN0YXRlID0+IHtcclxuICAgICAgICB0aGlzLmluaXRpYWxpemUoKTtcclxuICAgICAgICB0aGlzLl91cGRhdGVOYXZQYWdlcygpO1xyXG4gICAgICAgIHRoaXMuZHJhdygpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICAgICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2VuZENoYW5nZXMoKTtcclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgLy8gbW9zdGx5IGNoYW5nZXMgaW4gY2Fyb3VzZWxTZXJ2aWNlIGFuZCBjYXJvdXNlbCBhdCBhbGwgY2F1c2VzIGNhcm91c2VsU2VydmljZS50bygpLiBJdCBtb3ZlcyBzdGFnZSByaWdodC1sZWZ0IGJ5IGl0cyBjb2RlIGFuZCBjYWxsaW5nIG5lZWRlZCBmdW5jdGlvbnNcclxuICAgIC8vIFRodXMgdGhpcyBtZXRob2QgYnkgY2FsbGluZyBjYXJvdXNlbFNlcnZpY2UuY3VycmVudChwb3NpdGlvbikgbm90aWZpZXMgYWJvdXQgY2hhbmdlc1xyXG4gICAgY29uc3QgY2hhbmdlZFNldHRpbmdzJDogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0Q2hhbmdlZFN0YXRlKCkucGlwZShcclxuICAgICAgZmlsdGVyKGRhdGEgPT4gZGF0YS5wcm9wZXJ0eS5uYW1lID09PSAncG9zaXRpb24nKSxcclxuICAgICAgdGFwKGRhdGEgPT4ge1xyXG4gICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICAgICAgLy8gc2hvdWxkIGJlIHRoZSBjYWxsIG9mIHRoZSBmdW5jdGlvbiB3cml0dGVuIGF0IHRoZSBlbmQgb2YgY29tbWVudFxyXG4gICAgICAgIC8vIGJ1dCB0aGUgbWV0aG9kIGNhcm91c2VsU2Vydml2ZS50bygpIGhhcyBzZXRUaW1lb3V0KGYsIDApIHdoaWNoIGNvbnRhaW5zIGNhcm91c2VsU2Vydml2ZS51cGRhdGUoKSB3aGljaCBjYWxscyBzZW5kQ2hhbmdlcygpIG1ldGhvZC5cclxuICAgICAgICAvLyBjYXJvdXNlbFNlcnZpY2UubmF2RGF0YSBhbmQgY2Fyb3VzZWxTZXJ2aWNlLmRvdHNEYXRhIHVwZGF0ZSBlYXJsaWVyIHRoYW4gY2Fyb3VzZWxTZXJ2aXZlLnVwZGF0ZSgpIGdldHMgY2FsbGVkXHJcbiAgICAgICAgLy8gdXBkYXRlcyBvZiBjYXJvdXNlbFNlcnZpY2UubmF2RGF0YSBhbmQgY2Fyb3VzZWxTZXJ2aWNlLmRvdHNEYXRhIGFyZSBiZWluZyBoYXBwZW5pbmcgd2l0aGluZyBjYXJvdXNlbFNlcnZpY2UuY3VycmVudChwb3NpdGlvbikgbWV0aG9kIHdoaWNoIGNhbGxzIG5leHQoKSBvZiBfY2hhbmdlZFNldHRpbmdzQ2Fyb3VzZWwkXHJcbiAgICAgICAgLy8gY2Fyb3VzZWxTZXJ2aWNlLmN1cnJlbnQocG9zaXRpb24pIGlzIGJlaW5nIGNhbGxpbmcgZWFybGllciB0aGFuIGNhcm91c2VsU2Vydml2ZS51cGRhdGUoKTtcclxuICAgICAgICAvLyB0aGlzLmNhcm91c2VsU2VydmljZS5zZW5kQ2hhbmdlcygpO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCByZWZyZXNoZWRDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldFJlZnJlc2hlZFN0YXRlKCkucGlwZShcclxuICAgICAgdGFwKCgpID0+IHtcclxuICAgICAgICB0aGlzLl91cGRhdGVOYXZQYWdlcygpO1xyXG4gICAgICAgIHRoaXMuZHJhdygpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICAgICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2VuZENoYW5nZXMoKTtcclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgbmF2TWVyZ2UkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSBtZXJnZShpbml0aWFsaXplZENhcm91c2VsJCwgY2hhbmdlZFNldHRpbmdzJCwgcmVmcmVzaGVkQ2Fyb3VzZWwkKTtcclxuICAgIHRoaXMubmF2U3Vic2NyaXB0aW9uID0gbmF2TWVyZ2UkLnN1YnNjcmliZShcclxuICAgICAgKCkgPT4ge31cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuXHQgKiBJbml0aWFsaXplcyB0aGUgbGF5b3V0IG9mIHRoZSBwbHVnaW4gYW5kIGV4dGVuZHMgdGhlIGNhcm91c2VsLlxyXG5cdCAqL1xyXG5cdGluaXRpYWxpemUoKSB7XHJcbiAgICB0aGlzLl9uYXZEYXRhLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgIHRoaXMuX25hdkRhdGEucHJldi5odG1sVGV4dCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLm5hdlRleHRbMF07XHJcbiAgICB0aGlzLl9uYXZEYXRhLm5leHQuaHRtbFRleHQgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5uYXZUZXh0WzFdO1xyXG5cclxuICAgIHRoaXMuX2RvdHNEYXRhLmRpc2FibGVkID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5uYXZEYXRhID0gdGhpcy5fbmF2RGF0YTtcclxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmRvdHNEYXRhID0gdGhpcy5fZG90c0RhdGE7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDYWxjdWxhdGVzIGludGVybmFsIHN0YXRlcyBhbmQgdXBkYXRlcyBwcm9wIF9wYWdlc1xyXG4gICAqL1xyXG5cdHByaXZhdGUgX3VwZGF0ZU5hdlBhZ2VzKCkge1xyXG5cdFx0bGV0IGk6IG51bWJlciwgajogbnVtYmVyLCBrOiBudW1iZXI7XHJcblx0XHRjb25zdCBsb3dlcjogbnVtYmVyID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuY2xvbmVzKCkubGVuZ3RoIC8gMixcclxuICAgICAgdXBwZXI6IG51bWJlciA9IGxvd2VyICsgdGhpcy5jYXJvdXNlbFNlcnZpY2UuaXRlbXMoKS5sZW5ndGgsXHJcbiAgICAgIG1heGltdW06IG51bWJlciA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm1heGltdW0odHJ1ZSksXHJcbiAgICAgIHBhZ2VzOiBhbnlbXSA9IFtdLFxyXG4gICAgICBzZXR0aW5nczogT3dsT3B0aW9ucyA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzO1xyXG4gICAgIGxldCBzaXplID0gc2V0dGluZ3MuY2VudGVyIHx8IHNldHRpbmdzLmF1dG9XaWR0aCB8fCBzZXR0aW5ncy5kb3RzRGF0YVxyXG4gICAgICAgID8gMSA6IHNldHRpbmdzLmRvdHNFYWNoIHx8IHNldHRpbmdzLml0ZW1zO1xyXG4gICAgICBzaXplID0gK3NpemU7XHJcblx0XHRpZiAoc2V0dGluZ3Muc2xpZGVCeSAhPT0gJ3BhZ2UnKSB7XHJcblx0XHRcdHNldHRpbmdzLnNsaWRlQnkgPSBNYXRoLm1pbigrc2V0dGluZ3Muc2xpZGVCeSwgc2V0dGluZ3MuaXRlbXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChzZXR0aW5ncy5kb3RzIHx8IHNldHRpbmdzLnNsaWRlQnkgPT09ICdwYWdlJykge1xyXG5cclxuXHRcdFx0Zm9yIChpID0gbG93ZXIsIGogPSAwLCBrID0gMDsgaSA8IHVwcGVyOyBpKyspIHtcclxuXHRcdFx0XHRpZiAoaiA+PSBzaXplIHx8IGogPT09IDApIHtcclxuXHRcdFx0XHRcdHBhZ2VzLnB1c2goe1xyXG5cdFx0XHRcdFx0XHRzdGFydDogTWF0aC5taW4obWF4aW11bSwgaSAtIGxvd2VyKSxcclxuXHRcdFx0XHRcdFx0ZW5kOiBpIC0gbG93ZXIgKyBzaXplIC0gMVxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRpZiAoTWF0aC5taW4obWF4aW11bSwgaSAtIGxvd2VyKSA9PT0gbWF4aW11bSkge1xyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGogPSAwLCArK2s7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGogKz0gdGhpcy5jYXJvdXNlbFNlcnZpY2UubWVyZ2Vycyh0aGlzLmNhcm91c2VsU2VydmljZS5yZWxhdGl2ZShpKSkgYXMgbnVtYmVyO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHR0aGlzLl9wYWdlcyA9IHBhZ2VzO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogRHJhd3MgdGhlIHVzZXIgaW50ZXJmYWNlLlxyXG5cdCAqIEB0b2RvIFRoZSBvcHRpb24gYGRvdHNEYXRhYCB3b250IHdvcmsuXHJcblx0ICovXHJcbiAgZHJhdygpIHtcclxuXHRcdGxldCBkaWZmZXJlbmNlOiBudW1iZXI7XHJcbiAgICBjb25zdFx0c2V0dGluZ3M6IE93bE9wdGlvbnMgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncyxcclxuICAgICAgaXRlbXM6IENhcm91c2VsU2xpZGVEaXJlY3RpdmVbXSA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLml0ZW1zKCksXHJcbiAgICAgIGRpc2FibGVkID0gaXRlbXMubGVuZ3RoIDw9IHNldHRpbmdzLml0ZW1zO1xyXG5cclxuXHRcdHRoaXMuX25hdkRhdGEuZGlzYWJsZWQgPSAhc2V0dGluZ3MubmF2IHx8IGRpc2FibGVkO1xyXG5cdFx0dGhpcy5fZG90c0RhdGEuZGlzYWJsZWQgPSAhc2V0dGluZ3MuZG90cyB8fCBkaXNhYmxlZDtcclxuXHJcblx0XHRpZiAoc2V0dGluZ3MuZG90cykge1xyXG5cdFx0XHRkaWZmZXJlbmNlID0gdGhpcy5fcGFnZXMubGVuZ3RoIC0gdGhpcy5fZG90c0RhdGEuZG90cy5sZW5ndGg7XHJcblxyXG5cdFx0XHRpZiAoc2V0dGluZ3MuZG90c0RhdGEgJiYgZGlmZmVyZW5jZSAhPT0gMCkge1xyXG4gICAgICAgIHRoaXMuX2RvdHNEYXRhLmRvdHMgPSBbXTtcclxuICAgICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgdGhpcy5fZG90c0RhdGEuZG90cy5wdXNoKHtcclxuICAgICAgICAgICAgYWN0aXZlOiBmYWxzZSxcclxuICAgICAgICAgICAgaWQ6IGBkb3QtJHtpdGVtLmlkfWAsXHJcbiAgICAgICAgICAgIGlubmVyQ29udGVudDogaXRlbS5kb3RDb250ZW50LFxyXG4gICAgICAgICAgICBzaG93SW5uZXJDb250ZW50OiB0cnVlXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHRcdFx0fSBlbHNlIGlmIChkaWZmZXJlbmNlID4gMCkge1xyXG4gICAgICAgIGNvbnN0IHN0YXJ0STogbnVtYmVyID0gdGhpcy5fZG90c0RhdGEuZG90cy5sZW5ndGggPiAwID8gdGhpcy5fZG90c0RhdGEuZG90cy5sZW5ndGggOiAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGlmZmVyZW5jZTsgaSsrKSB7XHJcbiAgICAgICAgICB0aGlzLl9kb3RzRGF0YS5kb3RzLnB1c2goe1xyXG4gICAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxyXG4gICAgICAgICAgICBpZDogYGRvdC0ke2kgKyBzdGFydEl9YCxcclxuICAgICAgICAgICAgc2hvd0lubmVyQ29udGVudDogZmFsc2VcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHRcdFx0fSBlbHNlIGlmIChkaWZmZXJlbmNlIDwgMCkge1xyXG4gICAgICAgIHRoaXMuX2RvdHNEYXRhLmRvdHMuc3BsaWNlKGRpZmZlcmVuY2UsIE1hdGguYWJzKGRpZmZlcmVuY2UpKVxyXG5cdFx0XHR9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UubmF2RGF0YSA9IHRoaXMuX25hdkRhdGE7XHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5kb3RzRGF0YSA9IHRoaXMuX2RvdHNEYXRhO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZXMgbmF2aWdhdGlvbiBidXR0b25zJ3MgYW5kIGRvdHMncyBzdGF0ZXNcclxuICAgKi9cclxuICB1cGRhdGUoKSB7XHJcbiAgICB0aGlzLl91cGRhdGVOYXZCdXR0b25zKCk7XHJcbiAgICB0aGlzLl91cGRhdGVEb3RzKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGFuZ2VzIHN0YXRlIG9mIG5hdiBidXR0b25zIChkaXNhYmxlZCwgZW5hYmxlZClcclxuICAgKi9cclxuICBwcml2YXRlIF91cGRhdGVOYXZCdXR0b25zKCkge1xyXG4gICAgY29uc3RcdHNldHRpbmdzOiBPd2xPcHRpb25zID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MsXHJcbiAgICAgIGxvb3A6IGJvb2xlYW4gPSBzZXR0aW5ncy5sb29wIHx8IHNldHRpbmdzLnJld2luZCxcclxuICAgICAgaW5kZXg6IG51bWJlciA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnJlbGF0aXZlKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmN1cnJlbnQoKSk7XHJcblxyXG4gICAgaWYgKHNldHRpbmdzLm5hdikge1xyXG4gICAgICB0aGlzLl9uYXZEYXRhLnByZXYuZGlzYWJsZWQgPSAhbG9vcCAmJiBpbmRleCA8PSB0aGlzLmNhcm91c2VsU2VydmljZS5taW5pbXVtKHRydWUpO1xyXG5cdFx0XHR0aGlzLl9uYXZEYXRhLm5leHQuZGlzYWJsZWQgPSAhbG9vcCAmJiBpbmRleCA+PSB0aGlzLmNhcm91c2VsU2VydmljZS5tYXhpbXVtKHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm5hdkRhdGEgPSB0aGlzLl9uYXZEYXRhO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hhbmdlcyBhY3RpdmUgZG90IGlmIHBhZ2UgYmVjb21lcyBjaGFuZ2VkXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfdXBkYXRlRG90cygpIHtcclxuICAgIGxldCBjdXJBY3RpdmVEb3RJOiBudW1iZXI7XHJcbiAgICB0aGlzLl9kb3RzRGF0YS5kb3RzLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgIGlmIChpdGVtLmFjdGl2ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIGl0ZW0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgY3VyQWN0aXZlRG90SSA9IHRoaXMuX2N1cnJlbnQoKTtcclxuICAgIGlmICh0aGlzLl9kb3RzRGF0YS5kb3RzLmxlbmd0aCkge1xyXG4gICAgICB0aGlzLl9kb3RzRGF0YS5kb3RzW2N1ckFjdGl2ZURvdEldLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5kb3RzRGF0YSA9IHRoaXMuX2RvdHNEYXRhO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcblx0ICogR2V0cyB0aGUgY3VycmVudCBwYWdlIHBvc2l0aW9uIG9mIHRoZSBjYXJvdXNlbC5cclxuXHQgKiBAcmV0dXJucyB0aGUgY3VycmVudCBwYWdlIHBvc2l0aW9uIG9mIHRoZSBjYXJvdXNlbFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgX2N1cnJlbnQoKTogYW55IHtcclxuICAgIGNvbnN0IGN1cnJlbnQ6IG51bWJlciA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnJlbGF0aXZlKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmN1cnJlbnQoKSk7XHJcbiAgICBsZXQgZmluYWxDdXJyZW50OiBudW1iZXI7XHJcbiAgICBjb25zdCBwYWdlczogYW55ID0gdGhpcy5fcGFnZXMuZmlsdGVyKChwYWdlLCBpbmRleCkgPT4ge1xyXG4gICAgICByZXR1cm4gcGFnZS5zdGFydCA8PSBjdXJyZW50ICYmIHBhZ2UuZW5kID49IGN1cnJlbnQ7XHJcbiAgICB9KS5wb3AoKTtcclxuXHJcbiAgICBmaW5hbEN1cnJlbnQgPSB0aGlzLl9wYWdlcy5maW5kSW5kZXgocGFnZSA9PiB7XHJcbiAgICAgIHJldHVybiBwYWdlLnN0YXJ0ID09PSBwYWdlcy5zdGFydCAmJiBwYWdlLmVuZCA9PT0gcGFnZXMuZW5kO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGZpbmFsQ3VycmVudDtcclxuICB9O1xyXG5cclxuICAvKipcclxuXHQgKiBHZXRzIHRoZSBjdXJyZW50IHN1Y2Nlc29yL3ByZWRlY2Vzc29yIHBvc2l0aW9uLlxyXG4gICAqIEBwYXJhbSBzdXNzZXNzb3IgcG9zaXRpb24gb2Ygc2xpZGVcclxuXHQgKiBAcmV0dXJucyB0aGUgY3VycmVudCBzdWNjZXNvci9wcmVkZWNlc3NvciBwb3NpdGlvblxyXG5cdCAqL1xyXG5cdHByaXZhdGUgX2dldFBvc2l0aW9uKHN1Y2Nlc3NvcjogbnVtYmVyIHwgYm9vbGVhbik6IG51bWJlciB7XHJcblx0XHRsZXQgcG9zaXRpb246IG51bWJlciwgbGVuZ3RoOiBudW1iZXI7XHJcblx0XHRjb25zdFx0c2V0dGluZ3M6IE93bE9wdGlvbnMgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncztcclxuXHJcblx0XHRpZiAoc2V0dGluZ3Muc2xpZGVCeSA9PT0gJ3BhZ2UnKSB7XHJcblx0XHRcdHBvc2l0aW9uID0gdGhpcy5fY3VycmVudCgpO1xyXG5cdFx0XHRsZW5ndGggPSB0aGlzLl9wYWdlcy5sZW5ndGg7XHJcblx0XHRcdHN1Y2Nlc3NvciA/ICsrcG9zaXRpb24gOiAtLXBvc2l0aW9uO1xyXG5cdFx0XHRwb3NpdGlvbiA9IHRoaXMuX3BhZ2VzWygocG9zaXRpb24gJSBsZW5ndGgpICsgbGVuZ3RoKSAlIGxlbmd0aF0uc3RhcnQ7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRwb3NpdGlvbiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnJlbGF0aXZlKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmN1cnJlbnQoKSk7XHJcblx0XHRcdGxlbmd0aCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLml0ZW1zKCkubGVuZ3RoO1xyXG5cdFx0XHRzdWNjZXNzb3IgPyBwb3NpdGlvbiArPSArc2V0dGluZ3Muc2xpZGVCeSA6IHBvc2l0aW9uIC09ICtzZXR0aW5ncy5zbGlkZUJ5O1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBwb3NpdGlvbjtcclxuICB9O1xyXG5cclxuICAvKipcclxuXHQgKiBTbGlkZXMgdG8gdGhlIG5leHQgaXRlbSBvciBwYWdlLlxyXG5cdCAqIEBwYXJhbSBzcGVlZCBUaGUgdGltZSBpbiBtaWxsaXNlY29uZHMgZm9yIHRoZSB0cmFuc2l0aW9uLlxyXG5cdCAqL1xyXG5cdG5leHQoc3BlZWQ6IG51bWJlciB8IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnRvKHRoaXMuX2dldFBvc2l0aW9uKHRydWUpLCBzcGVlZCk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogU2xpZGVzIHRvIHRoZSBwcmV2aW91cyBpdGVtIG9yIHBhZ2UuXHJcblx0ICogQHBhcmFtIHNwZWVkIFRoZSB0aW1lIGluIG1pbGxpc2Vjb25kcyBmb3IgdGhlIHRyYW5zaXRpb24uXHJcblx0ICovXHJcblx0cHJldihzcGVlZDogbnVtYmVyIHwgYm9vbGVhbikge1xyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UudG8odGhpcy5fZ2V0UG9zaXRpb24oZmFsc2UpLCBzcGVlZCk7XHJcbiAgfTtcclxuXHJcbiBcdC8qKlxyXG5cdCAqIFNsaWRlcyB0byB0aGUgc3BlY2lmaWVkIGl0ZW0gb3IgcGFnZS5cclxuXHQgKiBAcGFyYW0gcG9zaXRpb24gLSBUaGUgcG9zaXRpb24gb2YgdGhlIGl0ZW0gb3IgcGFnZS5cclxuXHQgKiBAcGFyYW0gc3BlZWQgLSBUaGUgdGltZSBpbiBtaWxsaXNlY29uZHMgZm9yIHRoZSB0cmFuc2l0aW9uLlxyXG5cdCAqIEBwYXJhbSBzdGFuZGFyZCAtIFdoZXRoZXIgdG8gdXNlIHRoZSBzdGFuZGFyZCBiZWhhdmlvdXIgb3Igbm90LiBEZWZhdWx0IG1lYW5pbmcgZmFsc2VcclxuXHQgKi9cclxuXHR0byhwb3NpdGlvbjogbnVtYmVyLCBzcGVlZDogbnVtYmVyIHwgYm9vbGVhbiwgc3RhbmRhcmQ/OiBib29sZWFuKSB7XHJcblx0XHRsZXQgbGVuZ3RoOiBudW1iZXI7XHJcblx0XHRpZiAoIXN0YW5kYXJkICYmIHRoaXMuX3BhZ2VzLmxlbmd0aCkge1xyXG4gICAgICBsZW5ndGggPSB0aGlzLl9wYWdlcy5sZW5ndGg7XHJcbiAgICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnRvKHRoaXMuX3BhZ2VzWygocG9zaXRpb24gJSBsZW5ndGgpICsgbGVuZ3RoKSAlIGxlbmd0aF0uc3RhcnQsIHNwZWVkKTtcclxuXHRcdH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnRvKHBvc2l0aW9uLCBzcGVlZCk7XHJcblx0XHR9XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogTW92ZXMgY2Fyb3VzZWwgYWZ0ZXIgdXNlcidzIGNsaWNraW5nIG9uIGFueSBkb3RzXHJcbiAgICovXHJcbiAgbW92ZUJ5RG90KGRvdElkOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IGluZGV4OiBudW1iZXIgPSB0aGlzLl9kb3RzRGF0YS5kb3RzLmZpbmRJbmRleChkb3QgPT4gZG90SWQgPT09IGRvdC5pZCk7XHJcbiAgICB0aGlzLnRvKGluZGV4LCB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5kb3RzU3BlZWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogcmV3aW5kcyBjYXJvdXNlbCB0byBzbGlkZSB3aXRoIG5lZWRlZCBpZFxyXG4gICAqIEBwYXJhbSBpZCBpZCBvZiBzbGlkZVxyXG4gICAqL1xyXG4gIHRvU2xpZGVCeUlkKGlkOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2xpZGVzRGF0YS5maW5kSW5kZXgoc2xpZGUgPT4gc2xpZGUuaWQgPT09IGlkICYmIHNsaWRlLmlzQ2xvbmVkID09PSBmYWxzZSk7XHJcblxyXG4gICAgaWYgKHBvc2l0aW9uID09PSAtMSB8fCBwb3NpdGlvbiA9PT0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuY3VycmVudCgpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcblx0XHR0aGlzLmNhcm91c2VsU2VydmljZS50byh0aGlzLmNhcm91c2VsU2VydmljZS5yZWxhdGl2ZShwb3NpdGlvbiksIGZhbHNlKTtcclxuICB9XHJcblxyXG59XHJcbiIsIi8vIGltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuLy8gZnVuY3Rpb24gX3dpbmRvdygpOiBhbnkge1xyXG4vLyAgICAvLyByZXR1cm4gdGhlIGdsb2JhbCBuYXRpdmUgYnJvd3NlciB3aW5kb3cgb2JqZWN0XHJcbi8vICAgIHJldHVybiB3aW5kb3c7XHJcbi8vIH1cclxuLy8gQEluamVjdGFibGUoKVxyXG4vLyBleHBvcnQgY2xhc3MgV2luZG93UmVmU2VydmljZSB7XHJcbi8vICAgIGdldCBuYXRpdmVXaW5kb3coKTogYW55IHtcclxuLy8gICAgICAgcmV0dXJuIF93aW5kb3coKTtcclxuLy8gICAgfVxyXG4vLyB9XHJcblxyXG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7XHJcbiAgQ2xhc3NQcm92aWRlcixcclxuICBGYWN0b3J5UHJvdmlkZXIsXHJcbiAgSW5qZWN0aW9uVG9rZW4sXHJcbiAgUExBVEZPUk1fSURcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYSBuZXcgaW5qZWN0aW9uIHRva2VuIGZvciBpbmplY3RpbmcgdGhlIHdpbmRvdyBpbnRvIGEgY29tcG9uZW50LlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IFdJTkRPVyA9IG5ldyBJbmplY3Rpb25Ub2tlbignV2luZG93VG9rZW4nKTtcclxuXHJcbi8qKlxyXG4gKiBEZWZpbmUgYWJzdHJhY3QgY2xhc3MgZm9yIG9idGFpbmluZyByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCB3aW5kb3cgb2JqZWN0LlxyXG4gKi9cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFdpbmRvd1JlZiB7XHJcbiAgZ2V0IG5hdGl2ZVdpbmRvdygpOiBXaW5kb3cgfCBPYmplY3Qge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQuJyk7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogRGVmaW5lIGNsYXNzIHRoYXQgaW1wbGVtZW50cyB0aGUgYWJzdHJhY3QgY2xhc3MgYW5kIHJldHVybnMgdGhlIG5hdGl2ZSB3aW5kb3cgb2JqZWN0LlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEJyb3dzZXJXaW5kb3dSZWYgZXh0ZW5kcyBXaW5kb3dSZWYge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEByZXR1cm5zIHdpbmRvdyBvYmplY3RcclxuICAgKi9cclxuICBnZXQgbmF0aXZlV2luZG93KCk6IFdpbmRvdyB8IE9iamVjdCB7XHJcbiAgICByZXR1cm4gd2luZG93O1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhbiBmYWN0b3J5IGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgbmF0aXZlIHdpbmRvdyBvYmplY3QuXHJcbiAqIEBwYXJhbSBicm93c2VyV2luZG93UmVmIE5hdGl2ZSB3aW5kb3cgb2JqZWN0XHJcbiAqIEBwYXJhbSBwbGF0Zm9ybUlkIGlkIG9mIHBsYXRmb3JtXHJcbiAqIEByZXR1cm5zIHR5cGUgb2YgcGxhdGZvcm0gb2YgZW1wdHkgb2JqZWN0XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gd2luZG93RmFjdG9yeShcclxuICBicm93c2VyV2luZG93UmVmOiBCcm93c2VyV2luZG93UmVmLFxyXG4gIHBsYXRmb3JtSWQ6IE9iamVjdFxyXG4pOiBXaW5kb3cgfCBPYmplY3Qge1xyXG4gIGlmIChpc1BsYXRmb3JtQnJvd3NlcihwbGF0Zm9ybUlkKSkge1xyXG4gICAgcmV0dXJuIGJyb3dzZXJXaW5kb3dSZWYubmF0aXZlV2luZG93O1xyXG4gIH1cclxuICByZXR1cm4gbmV3IE9iamVjdCgpO1xyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGEgaW5qZWN0YWJsZSBwcm92aWRlciBmb3IgdGhlIFdpbmRvd1JlZiB0b2tlbiB0aGF0IHVzZXMgdGhlIEJyb3dzZXJXaW5kb3dSZWYgY2xhc3MuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgYnJvd3NlcldpbmRvd1Byb3ZpZGVyOiBDbGFzc1Byb3ZpZGVyID0ge1xyXG4gIHByb3ZpZGU6IFdpbmRvd1JlZixcclxuICB1c2VDbGFzczogQnJvd3NlcldpbmRvd1JlZlxyXG59O1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhbiBpbmplY3RhYmxlIHByb3ZpZGVyIHRoYXQgdXNlcyB0aGUgd2luZG93RmFjdG9yeSBmdW5jdGlvbiBmb3IgcmV0dXJuaW5nIHRoZSBuYXRpdmUgd2luZG93IG9iamVjdC5cclxuICovXHJcbmV4cG9ydCBjb25zdCB3aW5kb3dQcm92aWRlcjogRmFjdG9yeVByb3ZpZGVyID0ge1xyXG4gIHByb3ZpZGU6IFdJTkRPVyxcclxuICB1c2VGYWN0b3J5OiB3aW5kb3dGYWN0b3J5LFxyXG4gIGRlcHM6IFtXaW5kb3dSZWYsIFBMQVRGT1JNX0lEXVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhbiBhcnJheSBvZiBwcm92aWRlcnMuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgV0lORE9XX1BST1ZJREVSUyA9IFticm93c2VyV2luZG93UHJvdmlkZXIsIHdpbmRvd1Byb3ZpZGVyXTtcclxuIiwiaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge1xyXG4gIENsYXNzUHJvdmlkZXIsXHJcbiAgRmFjdG9yeVByb3ZpZGVyLFxyXG4gIEluamVjdGlvblRva2VuLFxyXG4gIFBMQVRGT1JNX0lELFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhIG5ldyBpbmplY3Rpb24gdG9rZW4gZm9yIGluamVjdGluZyB0aGUgRG9jdW1lbnQgaW50byBhIGNvbXBvbmVudC5cclxuICovXHJcbmV4cG9ydCBjb25zdCBET0NVTUVOVCA9IG5ldyBJbmplY3Rpb25Ub2tlbjxEb2N1bWVudD4oJ0RvY3VtZW50VG9rZW4nKTtcclxuLyoqXHJcbiAqIERlZmluZSBhYnN0cmFjdCBjbGFzcyBmb3Igb2J0YWluaW5nIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIERvY3VtZW50IG9iamVjdC5cclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBEb2N1bWVudFJlZiB7XHJcbiAgZ2V0IG5hdGl2ZURvY3VtZW50KCk6IERvY3VtZW50IHwgT2JqZWN0IHtcclxuICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkLicpO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIERlZmluZSBjbGFzcyB0aGF0IGltcGxlbWVudHMgdGhlIGFic3RyYWN0IGNsYXNzIGFuZCByZXR1cm5zIHRoZSBuYXRpdmUgRG9jdW1lbnQgb2JqZWN0LlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEJyb3dzZXJEb2N1bWVudFJlZiBleHRlbmRzIERvY3VtZW50UmVmIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcmV0dXJucyBEb2N1bWVudCBvYmplY3RcclxuICAgKi9cclxuICBnZXQgbmF0aXZlRG9jdW1lbnQoKTogRG9jdW1lbnQgfCBPYmplY3Qge1xyXG4gICAgcmV0dXJuIGRvY3VtZW50O1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhbiBmYWN0b3J5IGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgbmF0aXZlIERvY3VtZW50IG9iamVjdC5cclxuICogQHBhcmFtIGJyb3dzZXJEb2N1bWVudFJlZiBOYXRpdmUgRG9jdW1lbnQgb2JqZWN0XHJcbiAqIEBwYXJhbSBwbGF0Zm9ybUlkIGlkIG9mIHBsYXRmb3JtXHJcbiAqIEByZXR1cm5zIHR5cGUgb2YgcGxhdGZvcm0gb2YgZW1wdHkgb2JqZWN0XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZG9jdW1lbnRGYWN0b3J5KFxyXG4gIGJyb3dzZXJEb2N1bWVudFJlZjogQnJvd3NlckRvY3VtZW50UmVmLFxyXG4gIHBsYXRmb3JtSWQ6IE9iamVjdFxyXG4pOiBEb2N1bWVudCB8IE9iamVjdCB7XHJcbiAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHBsYXRmb3JtSWQpKSB7XHJcbiAgICByZXR1cm4gYnJvd3NlckRvY3VtZW50UmVmLm5hdGl2ZURvY3VtZW50O1xyXG4gIH1cclxuICByZXR1cm4gbmV3IE9iamVjdCgpO1xyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGEgaW5qZWN0YWJsZSBwcm92aWRlciBmb3IgdGhlIERvY3VtZW50UmVmIHRva2VuIHRoYXQgdXNlcyB0aGUgQnJvd3NlckRvY3VtZW50UmVmIGNsYXNzLlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGJyb3dzZXJEb2N1bWVudFByb3ZpZGVyOiBDbGFzc1Byb3ZpZGVyID0ge1xyXG4gIHByb3ZpZGU6IERvY3VtZW50UmVmLFxyXG4gIHVzZUNsYXNzOiBCcm93c2VyRG9jdW1lbnRSZWZcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYW4gaW5qZWN0YWJsZSBwcm92aWRlciB0aGF0IHVzZXMgdGhlIERvY3VtZW50RmFjdG9yeSBmdW5jdGlvbiBmb3IgcmV0dXJuaW5nIHRoZSBuYXRpdmUgRG9jdW1lbnQgb2JqZWN0LlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGRvY3VtZW50UHJvdmlkZXI6IEZhY3RvcnlQcm92aWRlciA9IHtcclxuICBwcm92aWRlOiBET0NVTUVOVCxcclxuICB1c2VGYWN0b3J5OiBkb2N1bWVudEZhY3RvcnksXHJcbiAgZGVwczogW0RvY3VtZW50UmVmLCBQTEFURk9STV9JRF1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYW4gYXJyYXkgb2YgcHJvdmlkZXJzLlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IERPQ1VNRU5UX1BST1ZJREVSUyA9IFticm93c2VyRG9jdW1lbnRQcm92aWRlciwgZG9jdW1lbnRQcm92aWRlcl07XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgT2JzZXJ2YWJsZSwgbWVyZ2UgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgQ2Fyb3VzZWxTZXJ2aWNlIH0gZnJvbSAnLi9jYXJvdXNlbC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBXSU5ET1cgfSBmcm9tICcuL3dpbmRvdy1yZWYuc2VydmljZSc7XHJcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnLi9kb2N1bWVudC1yZWYuc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBBdXRvcGxheVNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3l7XHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaW9wdGlvbiB0byBtZXJnZSBPYnNlcnZhYmxlcyBmcm9tIENhcm91c2VsU2VydmljZVxyXG4gICAqL1xyXG4gIGF1dG9wbGF5U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBhdXRvcGxheSB0aW1lb3V0LlxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3RpbWVvdXQ6IG51bWJlciA9IG51bGw7XHJcblxyXG4gIC8qKlxyXG4gICAqIEluZGljYXRlcyB3aGVuZXZlciB0aGUgYXV0b3BsYXkgaXMgcGF1c2VkLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3BhdXNlZCA9IGZhbHNlO1xyXG5cclxuICBwcml2YXRlIHdpblJlZjogV2luZG93O1xyXG4gIHByaXZhdGUgZG9jUmVmOiBEb2N1bWVudDtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjYXJvdXNlbFNlcnZpY2U6IENhcm91c2VsU2VydmljZSxcclxuICAgICAgICAgICAgICBASW5qZWN0KFdJTkRPVykgd2luUmVmOiBhbnksXHJcbiAgICAgICAgICAgICAgQEluamVjdChET0NVTUVOVCkgZG9jUmVmOiBhbnksXHJcbiAgKSB7XHJcbiAgICB0aGlzLndpblJlZiA9IHdpblJlZiBhcyBXaW5kb3c7XHJcbiAgICB0aGlzLmRvY1JlZiA9IGRvY1JlZiBhcyBEb2N1bWVudDtcclxuICAgIHRoaXMuc3B5RGF0YVN0cmVhbXMoKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5hdXRvcGxheVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVmaW5lcyBPYnNlcnZhYmxlcyB3aGljaCBzZXJ2aWNlIG11c3Qgb2JzZXJ2ZVxyXG4gICAqL1xyXG4gIHNweURhdGFTdHJlYW1zKCkge1xyXG4gICAgY29uc3QgaW5pdGlhbGl6ZWRDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldEluaXRpYWxpemVkU3RhdGUoKS5waXBlKFxyXG4gICAgICB0YXAoKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hdXRvcGxheSkge1xyXG5cdFx0XHRcdFx0dGhpcy5wbGF5KCk7XHJcblx0XHRcdFx0fVxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBjaGFuZ2VkU2V0dGluZ3MkOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRDaGFuZ2VkU3RhdGUoKS5waXBlKFxyXG4gICAgICB0YXAoZGF0YSA9PiB7XHJcbiAgICAgICAgdGhpcy5faGFuZGxlQ2hhbmdlT2JzZXJ2YWJsZShkYXRhKTtcclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgLy8gb3JpZ2luYWwgQXV0b3BsYXkgUGx1Z2luIGhhcyBsaXN0ZW5lcnMgb24gcGxheS5vd2wuY29yZSBhbmQgc3RvcC5vd2wuY29yZSBldmVudHMuXHJcbiAgICAvLyBUaGV5IGFyZSB0cmlnZ2VyZWQgYnkgVmlkZW8gUGx1Z2luXHJcblxyXG4gICAgY29uc3QgYXV0b3BsYXlNZXJnZSQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IG1lcmdlKGluaXRpYWxpemVkQ2Fyb3VzZWwkLCBjaGFuZ2VkU2V0dGluZ3MkKTtcclxuICAgIHRoaXMuYXV0b3BsYXlTdWJzY3JpcHRpb24gPSBhdXRvcGxheU1lcmdlJC5zdWJzY3JpYmUoXHJcbiAgICAgICgpID0+IHt9XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcblx0ICogU3RhcnRzIHRoZSBhdXRvcGxheS5cclxuXHQgKiBAcGFyYW0gdGltZW91dCBUaGUgaW50ZXJ2YWwgYmVmb3JlIHRoZSBuZXh0IGFuaW1hdGlvbiBzdGFydHMuXHJcblx0ICogQHBhcmFtIHNwZWVkIFRoZSBhbmltYXRpb24gc3BlZWQgZm9yIHRoZSBhbmltYXRpb25zLlxyXG5cdCAqL1xyXG5cdHBsYXkodGltZW91dD86IG51bWJlciwgc3BlZWQ/OiBudW1iZXIpIHtcclxuICAgIGlmICh0aGlzLl9wYXVzZWQpIHtcclxuXHRcdFx0dGhpcy5fcGF1c2VkID0gZmFsc2U7XHJcblx0XHRcdHRoaXMuX3NldEF1dG9QbGF5SW50ZXJ2YWwoKTtcclxuICAgIH1cclxuXHJcblx0XHRpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2UuaXMoJ3JvdGF0aW5nJykpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmVudGVyKCdyb3RhdGluZycpO1xyXG5cclxuXHRcdHRoaXMuX3NldEF1dG9QbGF5SW50ZXJ2YWwoKTtcclxuICB9O1xyXG5cclxuICAvKipcclxuXHQgKiBHZXRzIGEgbmV3IHRpbWVvdXRcclxuXHQgKiBAcGFyYW0gdGltZW91dCAtIFRoZSBpbnRlcnZhbCBiZWZvcmUgdGhlIG5leHQgYW5pbWF0aW9uIHN0YXJ0cy5cclxuXHQgKiBAcGFyYW0gc3BlZWQgLSBUaGUgYW5pbWF0aW9uIHNwZWVkIGZvciB0aGUgYW5pbWF0aW9ucy5cclxuXHQgKiBAcmV0dXJuXHJcblx0ICovXHJcblx0cHJpdmF0ZSBfZ2V0TmV4dFRpbWVvdXQodGltZW91dD86IG51bWJlciwgc3BlZWQ/OiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0aWYgKCB0aGlzLl90aW1lb3V0ICkge1xyXG5cdFx0XHR0aGlzLndpblJlZi5jbGVhclRpbWVvdXQodGhpcy5fdGltZW91dCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcy53aW5SZWYuc2V0VGltZW91dCgoKSA9PntcclxuICAgICAgaWYgKHRoaXMuX3BhdXNlZCB8fCB0aGlzLmNhcm91c2VsU2VydmljZS5pcygnYnVzeScpIHx8IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmlzKCdpbnRlcmFjdGluZycpIHx8IHRoaXMuZG9jUmVmLmhpZGRlbikge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLmNhcm91c2VsU2VydmljZS5uZXh0KHNwZWVkIHx8IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9wbGF5U3BlZWQpO1xyXG4gICAgfSwgdGltZW91dCB8fCB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hdXRvcGxheVRpbWVvdXQpO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG5cdCAqIFNldHMgYXV0b3BsYXkgaW4gbW90aW9uLlxyXG5cdCAqL1xyXG5cdHByaXZhdGUgX3NldEF1dG9QbGF5SW50ZXJ2YWwoKSB7XHJcblx0XHR0aGlzLl90aW1lb3V0ID0gdGhpcy5fZ2V0TmV4dFRpbWVvdXQoKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBTdG9wcyB0aGUgYXV0b3BsYXkuXHJcblx0ICovXHJcblx0c3RvcCgpIHtcclxuXHRcdGlmICghdGhpcy5jYXJvdXNlbFNlcnZpY2UuaXMoJ3JvdGF0aW5nJykpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMud2luUmVmLmNsZWFyVGltZW91dCh0aGlzLl90aW1lb3V0KTtcclxuXHRcdHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmxlYXZlKCdyb3RhdGluZycpO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG5cdCAqIFN0b3BzIHRoZSBhdXRvcGxheS5cclxuXHQgKi9cclxuXHRwYXVzZSgpIHtcclxuXHRcdGlmICghdGhpcy5jYXJvdXNlbFNlcnZpY2UuaXMoJ3JvdGF0aW5nJykpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX3BhdXNlZCA9IHRydWU7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogTWFuYWdlcyBieSBhdXRvcGxheWluZyBhY2NvcmRpbmcgdG8gZGF0YSBwYXNzZWQgYnkgX2NoYW5nZWRTZXR0aW5nc0Nhcm91c2VsJCBPYnNhcnZhYmxlXHJcbiAgICogQHBhcmFtIGRhdGEgb2JqZWN0IHdpdGggY3VycmVudCBwb3NpdGlvbiBvZiBjYXJvdXNlbCBhbmQgdHlwZSBvZiBjaGFuZ2VcclxuICAgKi9cclxuICBwcml2YXRlIF9oYW5kbGVDaGFuZ2VPYnNlcnZhYmxlKGRhdGEpIHtcclxuICAgIGlmIChkYXRhLnByb3BlcnR5Lm5hbWUgPT09ICdzZXR0aW5ncycpIHtcclxuICAgICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9wbGF5KSB7XHJcbiAgICAgICAgdGhpcy5wbGF5KCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5zdG9wKCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoZGF0YS5wcm9wZXJ0eS5uYW1lID09PSAncG9zaXRpb24nKSB7XHJcbiAgICAgIC8vY29uc29sZS5sb2coJ3BsYXk/JywgZSk7XHJcbiAgICAgIGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hdXRvcGxheSkge1xyXG4gICAgICAgIHRoaXMuX3NldEF1dG9QbGF5SW50ZXJ2YWwoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnRzIHBhdXNpbmdcclxuICAgKi9cclxuICBzdGFydFBhdXNpbmcoKSB7XHJcbiAgICBpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b3BsYXlIb3ZlclBhdXNlICYmIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmlzKCdyb3RhdGluZycpKSB7XHJcbiAgICAgIHRoaXMucGF1c2UoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0YXJ0cyBwbGF5aW5nIGFmdGVyIG1vdXNlIGxlYXZlcyBjYXJvdXNlbFxyXG4gICAqL1xyXG4gIHN0YXJ0UGxheWluZ01vdXNlTGVhdmUoKSB7XHJcbiAgICBpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b3BsYXlIb3ZlclBhdXNlICYmIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmlzKCdyb3RhdGluZycpKSB7XHJcbiAgICAgIHRoaXMucGF1c2UoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0YXJ0cyBwbGF5aW5nIGFmdGVyIHRvdWNoIGVuZHNcclxuICAgKi9cclxuICBzdGFydFBsYXlpbmdUb3VjaEVuZCgpIHtcclxuICAgIGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hdXRvcGxheUhvdmVyUGF1c2UgJiYgdGhpcy5jYXJvdXNlbFNlcnZpY2UuaXMoJ3JvdGF0aW5nJykpIHtcclxuICAgICAgdGhpcy5wYXVzZSgpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBPYnNlcnZhYmxlLCBtZXJnZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBDYXJvdXNlbFNlcnZpY2UgfSBmcm9tICcuL2Nhcm91c2VsLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBMYXp5TG9hZFNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlvcHRpb24gdG8gbWVyZ2UgT2JzZXJ2YWJsZSAgZnJvbSBDYXJvdXNlbFNlcnZpY2VcclxuICAgKi9cclxuICBsYXp5TG9hZFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhcm91c2VsU2VydmljZTogQ2Fyb3VzZWxTZXJ2aWNlKSB7XHJcbiAgICB0aGlzLnNweURhdGFTdHJlYW1zKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMubGF6eUxvYWRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlZmluZXMgT2JzZXJ2YWJsZXMgd2hpY2ggc2VydmljZSBtdXN0IG9ic2VydmVcclxuICAgKi9cclxuICBzcHlEYXRhU3RyZWFtcygpIHtcclxuICAgIGNvbnN0IGluaXRpYWxpemVkQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRJbml0aWFsaXplZFN0YXRlKCkucGlwZShcclxuICAgICAgdGFwKCgpID0+IHtcclxuICAgICAgICBjb25zdCBpc0xhenlMb2FkID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MgJiYgIXRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmxhenlMb2FkO1xyXG4gICAgICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNsaWRlc0RhdGEuZm9yRWFjaChpdGVtID0+IGl0ZW0ubG9hZCA9IGlzTGF6eUxvYWQgPyB0cnVlIDogZmFsc2UpO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBjaGFuZ2VTZXR0aW5ncyQ6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldENoYW5nZVN0YXRlKCk7XHJcblxyXG4gICAgY29uc3QgcmVzaXplZENhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0UmVzaXplZFN0YXRlKCk7XHJcblxyXG5cclxuICAgIGNvbnN0IGxhenlMb2FkTWVyZ2UkOiBPYnNlcnZhYmxlPHN0cmluZyB8IGFueT4gPSBtZXJnZShpbml0aWFsaXplZENhcm91c2VsJCwgY2hhbmdlU2V0dGluZ3MkLCByZXNpemVkQ2Fyb3VzZWwkKS5waXBlKFxyXG4gICAgICB0YXAoZGF0YSA9PiB0aGlzLl9kZWZpbmVMYXp5TG9hZFNsaWRlcyhkYXRhKSksXHJcbiAgICAgIC8vIHRhcCgoKSA9PiB0aGlzLmNhcm91c2VsU2VydmljZS5zZW5kQ2hhbmdlcygpKVxyXG4gICAgKTtcclxuICAgIHRoaXMubGF6eUxvYWRTdWJzY3JpcHRpb24gPSBsYXp5TG9hZE1lcmdlJC5zdWJzY3JpYmUoXHJcbiAgICAgICgpID0+IHt9XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZGVmaW5lTGF6eUxvYWRTbGlkZXMoZGF0YTogYW55KSB7XHJcbiAgICBpZiAoIXRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzIHx8ICF0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5sYXp5TG9hZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKChkYXRhLnByb3BlcnR5ICYmIGRhdGEucHJvcGVydHkubmFtZSA9PT0gJ3Bvc2l0aW9uJykgfHwgZGF0YSA9PT0gJ2luaXRpYWxpemVkJyB8fCBkYXRhID09PSBcInJlc2l6ZWRcIikge1xyXG4gICAgICBjb25zdCBzZXR0aW5ncyA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLFxyXG4gICAgICAgICAgICBjbG9uZXMgPSB0aGlzLmNhcm91c2VsU2VydmljZS5jbG9uZXMoKS5sZW5ndGg7XHJcbiAgICAgIGxldCBuID0gKHNldHRpbmdzLmNlbnRlciAmJiBNYXRoLmNlaWwoc2V0dGluZ3MuaXRlbXMgLyAyKSB8fCBzZXR0aW5ncy5pdGVtcyksXHJcbiAgICAgICAgICBpID0gKChzZXR0aW5ncy5jZW50ZXIgJiYgbiAqIC0xKSB8fCAwKSxcclxuICAgICAgICAgIHBvc2l0aW9uID0gKGRhdGEucHJvcGVydHkgJiYgZGF0YS5wcm9wZXJ0eS52YWx1ZSAhPT0gdW5kZWZpbmVkID8gZGF0YS5wcm9wZXJ0eS52YWx1ZSA6IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmN1cnJlbnQoKSkgKyBpO1xyXG4gICAgICAgIC8vIGxvYWQgPSAkLnByb3h5KGZ1bmN0aW9uKGksIHYpIHsgdGhpcy5sb2FkKHYpIH0sIHRoaXMpO1xyXG4gICAgICAvL1RPRE86IE5lZWQgZG9jdW1lbnRhdGlvbiBmb3IgdGhpcyBuZXcgb3B0aW9uXHJcbiAgICAgIGlmIChzZXR0aW5ncy5sYXp5TG9hZEVhZ2VyID4gMCkge1xyXG4gICAgICAgIG4gKz0gc2V0dGluZ3MubGF6eUxvYWRFYWdlcjtcclxuICAgICAgICAvLyBJZiB0aGUgY2Fyb3VzZWwgaXMgbG9vcGluZyBhbHNvIHByZWxvYWQgaW1hZ2VzIHRoYXQgYXJlIHRvIHRoZSBcImxlZnRcIlxyXG4gICAgICAgIGlmIChzZXR0aW5ncy5sb29wKSB7XHJcbiAgICAgICAgICBwb3NpdGlvbiAtPSBzZXR0aW5ncy5sYXp5TG9hZEVhZ2VyO1xyXG4gICAgICAgICAgbisrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgd2hpbGUgKGkrKyA8IG4pIHtcclxuICAgICAgICB0aGlzLl9sb2FkKGNsb25lcyAvIDIgKyB0aGlzLmNhcm91c2VsU2VydmljZS5yZWxhdGl2ZShwb3NpdGlvbikpO1xyXG4gICAgICAgIGlmIChjbG9uZXMpIHtcclxuICAgICAgICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmNsb25lcyh0aGlzLmNhcm91c2VsU2VydmljZS5yZWxhdGl2ZShwb3NpdGlvbikpLmZvckVhY2godmFsdWUgPT4gdGhpcy5fbG9hZCh2YWx1ZSkpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgcG9zaXRpb24rKztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcblx0ICogTG9hZHMgYWxsIHJlc291cmNlcyBvZiBhbiBpdGVtIGF0IHRoZSBzcGVjaWZpZWQgcG9zaXRpb24uXHJcblx0ICogQHBhcmFtIHBvc2l0aW9uIC0gVGhlIGFic29sdXRlIHBvc2l0aW9uIG9mIHRoZSBpdGVtLlxyXG5cdCAqL1xyXG4gIHByaXZhdGUgX2xvYWQocG9zaXRpb246IG51bWJlcikge1xyXG4gICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNsaWRlc0RhdGFbcG9zaXRpb25dLmxvYWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNsaWRlc0RhdGFbcG9zaXRpb25dLmxvYWQgPSB0cnVlO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBPYnNlcnZhYmxlLCBtZXJnZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBDYXJvdXNlbFNlcnZpY2UgfSBmcm9tICcuL2Nhcm91c2VsLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBBbmltYXRlU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveXtcclxuICAvKipcclxuICAgKiBTdWJzY3Jpb3B0aW9uIHRvIG1lcmdlIE9ic2VydmFibGUgIGZyb20gQ2Fyb3VzZWxTZXJ2aWNlXHJcbiAgICovXHJcbiAgYW5pbWF0ZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBzXHJcbiAgICovXHJcbiAgc3dhcHBpbmcgPSB0cnVlO1xyXG5cclxuICAvKipcclxuICAgKiBhY3RpdmUgc2xpZGUgYmVmb3JlIHRyYW5zbGF0aW5nXHJcbiAgICovXHJcbiAgcHJldmlvdXMgPSB1bmRlZmluZWQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIG5ldyBhY3RpdmUgc2xpZGUgYWZ0ZXIgdHJhbnNsYXRpbmdcclxuICAgKi9cclxuICBuZXh0ID0gdW5kZWZpbmVkO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhcm91c2VsU2VydmljZTogQ2Fyb3VzZWxTZXJ2aWNlKSB7XHJcbiAgICB0aGlzLnNweURhdGFTdHJlYW1zKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuYW5pbWF0ZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVmaW5lcyBPYnNlcnZhYmxlcyB3aGljaCBzZXJ2aWNlIG11c3Qgb2JzZXJ2ZVxyXG4gICAqL1xyXG4gIHNweURhdGFTdHJlYW1zKCkge1xyXG4gICAgY29uc3QgY2hhbmdlU2V0dGluZ3MkOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRDaGFuZ2VTdGF0ZSgpLnBpcGUoXHJcbiAgICAgIHRhcChkYXRhID0+IHtcclxuICAgICAgICBpZiAoZGF0YS5wcm9wZXJ0eS5uYW1lID09PSAncG9zaXRpb24nKSB7XHJcblx0XHRcdFx0XHR0aGlzLnByZXZpb3VzID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuY3VycmVudCgpO1xyXG5cdFx0XHRcdFx0dGhpcy5uZXh0ID0gZGF0YS5wcm9wZXJ0eS52YWx1ZTtcclxuXHRcdFx0XHR9XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IGRyYWdDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldERyYWdTdGF0ZSgpO1xyXG4gICAgY29uc3QgZHJhZ2dlZENhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0RHJhZ2dlZFN0YXRlKCk7XHJcbiAgICBjb25zdCB0cmFuc2xhdGVkQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRUcmFuc2xhdGVkU3RhdGUoKTtcclxuXHJcbiAgICBjb25zdCBkcmFnVHJhbnNsYXRlZE1lcmdlJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gbWVyZ2UoZHJhZ0Nhcm91c2VsJCwgZHJhZ2dlZENhcm91c2VsJCwgdHJhbnNsYXRlZENhcm91c2VsJCkucGlwZShcclxuICAgICAgdGFwKGRhdGEgPT4gdGhpcy5zd2FwcGluZyA9IGRhdGEgPT09ICd0cmFuc2xhdGVkJylcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgdHJhbnNsYXRlQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRUcmFuc2xhdGVTdGF0ZSgpLnBpcGUoXHJcbiAgICAgIHRhcChkYXRhID0+IHtcclxuICAgICAgICBpZiAodGhpcy5zd2FwcGluZyAmJiAodGhpcy5jYXJvdXNlbFNlcnZpY2UuX29wdGlvbnMuYW5pbWF0ZU91dCB8fCB0aGlzLmNhcm91c2VsU2VydmljZS5fb3B0aW9ucy5hbmltYXRlSW4pKSB7XHJcbiAgICAgICAgICB0aGlzLl9zd2FwKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBhbmltYXRlTWVyZ2UkOiBPYnNlcnZhYmxlPHN0cmluZyB8IGFueT4gPSBtZXJnZShjaGFuZ2VTZXR0aW5ncyQsIHRyYW5zbGF0ZUNhcm91c2VsJCwgZHJhZ1RyYW5zbGF0ZWRNZXJnZSQpLnBpcGUoKTtcclxuICAgIHRoaXMuYW5pbWF0ZVN1YnNjcmlwdGlvbiA9IGFuaW1hdGVNZXJnZSQuc3Vic2NyaWJlKFxyXG4gICAgICAoKSA9PiB7fVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIFRvZ2dsZXMgdGhlIGFuaW1hdGlvbiBjbGFzc2VzIHdoZW5ldmVyIGFuIHRyYW5zbGF0aW9ucyBzdGFydHMuXHJcblx0ICogQHJldHVybnNcclxuXHQgKi9cclxuXHRwcml2YXRlIF9zd2FwKCk6IGJvb2xlYW4ge1xyXG5cclxuXHRcdGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5pdGVtcyAhPT0gMSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gaWYgKCEkLnN1cHBvcnQuYW5pbWF0aW9uIHx8ICEkLnN1cHBvcnQudHJhbnNpdGlvbikge1xyXG5cdFx0Ly8gXHRyZXR1cm47XHJcblx0XHQvLyB9XHJcblxyXG5cdFx0dGhpcy5jYXJvdXNlbFNlcnZpY2Uuc3BlZWQoMCk7XHJcblxyXG5cdFx0bGV0IGxlZnQ7XHJcblx0XHRjb25zdFx0cHJldmlvdXMgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zbGlkZXNEYXRhW3RoaXMucHJldmlvdXNdLFxyXG5cdFx0XHRuZXh0ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2xpZGVzRGF0YVt0aGlzLm5leHRdLFxyXG5cdFx0XHRpbmNvbWluZyA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmFuaW1hdGVJbixcclxuXHRcdFx0b3V0Z29pbmcgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hbmltYXRlT3V0O1xyXG5cclxuXHRcdGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5jdXJyZW50KCkgPT09IHRoaXMucHJldmlvdXMpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChvdXRnb2luZykge1xyXG5cdFx0XHRsZWZ0ID0gK3RoaXMuY2Fyb3VzZWxTZXJ2aWNlLmNvb3JkaW5hdGVzKHRoaXMucHJldmlvdXMpIC0gK3RoaXMuY2Fyb3VzZWxTZXJ2aWNlLmNvb3JkaW5hdGVzKHRoaXMubmV4dCk7XHJcbiAgICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNsaWRlc0RhdGEuZm9yRWFjaChzbGlkZSA9PiB7XHJcbiAgICAgICAgaWYgKHNsaWRlLmlkID09PSBwcmV2aW91cy5pZCkge1xyXG4gICAgICAgICAgc2xpZGUubGVmdCA9IGAke2xlZnR9cHhgO1xyXG4gICAgICAgICAgc2xpZGUuaXNBbmltYXRlZCA9IHRydWU7XHJcbiAgICAgICAgICBzbGlkZS5pc0RlZkFuaW1hdGVkT3V0ID0gdHJ1ZTtcclxuICAgICAgICAgIHNsaWRlLmlzQ3VzdG9tQW5pbWF0ZWRPdXQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGluY29taW5nKSB7XHJcbiAgICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNsaWRlc0RhdGEuZm9yRWFjaChzbGlkZSA9PiB7XHJcbiAgICAgICAgaWYgKHNsaWRlLmlkID09PSBuZXh0LmlkKSB7XHJcbiAgICAgICAgICBzbGlkZS5pc0FuaW1hdGVkID0gdHJ1ZTtcclxuICAgICAgICAgIHNsaWRlLmlzRGVmQW5pbWF0ZWRJbiA9IHRydWU7XHJcbiAgICAgICAgICBzbGlkZS5pc0N1c3RvbUFuaW1hdGVkSW4gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlcyB0aGUgZW5kIG9mICdhbmltYXRpb25lbmQnIGV2ZW50XHJcbiAgICogQHBhcmFtIGlkIElkIG9mIHNsaWRlc1xyXG4gICAqL1xyXG4gIGNsZWFyKGlkKSB7XHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5zbGlkZXNEYXRhLmZvckVhY2goc2xpZGUgPT4ge1xyXG4gICAgICBpZiAoc2xpZGUuaWQgPT09IGlkKSB7XHJcbiAgICAgICAgc2xpZGUubGVmdCA9ICcnO1xyXG4gICAgICAgIHNsaWRlLmlzQW5pbWF0ZWQgPSBmYWxzZTtcclxuICAgICAgICBzbGlkZS5pc0RlZkFuaW1hdGVkT3V0ID0gZmFsc2U7XHJcbiAgICAgICAgc2xpZGUuaXNDdXN0b21BbmltYXRlZE91dCA9IGZhbHNlO1xyXG4gICAgICAgIHNsaWRlLmlzRGVmQW5pbWF0ZWRJbiA9IGZhbHNlO1xyXG4gICAgICAgIHNsaWRlLmlzQ3VzdG9tQW5pbWF0ZWRJbiA9IGZhbHNlO1xyXG4gICAgICAgIHNsaWRlLmNsYXNzZXMgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zZXRDdXJTbGlkZUNsYXNzZXMoc2xpZGUpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm9uVHJhbnNpdGlvbkVuZCgpO1xyXG5cdH07XHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgT2JzZXJ2YWJsZSwgbWVyZ2UgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgQ2Fyb3VzZWxTZXJ2aWNlIH0gZnJvbSAnLi9jYXJvdXNlbC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQXV0b0hlaWdodFNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3l7XHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaW9wdGlvbiB0byBtZXJnZSBPYnNlcnZhYmxlICBmcm9tIENhcm91c2VsU2VydmljZVxyXG4gICAqL1xyXG4gIGF1dG9IZWlnaHRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhcm91c2VsU2VydmljZTogQ2Fyb3VzZWxTZXJ2aWNlKSB7XHJcbiAgICB0aGlzLnNweURhdGFTdHJlYW1zKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuYXV0b0hlaWdodFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBEZWZpbmVzIE9ic2VydmFibGVzIHdoaWNoIHNlcnZpY2UgbXVzdCBvYnNlcnZlXHJcbiAgICovXHJcbiAgc3B5RGF0YVN0cmVhbXMoKSB7XHJcbiAgICBjb25zdCBpbml0aWFsaXplZENhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0SW5pdGlhbGl6ZWRTdGF0ZSgpLnBpcGUoXHJcbiAgICAgIHRhcChkYXRhID0+IHtcclxuICAgICAgICBpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b0hlaWdodCkge1xyXG4gICAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2xpZGVzRGF0YS5mb3JFYWNoKHNsaWRlID0+IHNsaWRlLmhlaWdodFN0YXRlID0gJ2Z1bGwnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IGNoYW5nZWRTZXR0aW5ncyQ6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldENoYW5nZWRTdGF0ZSgpLnBpcGUoXHJcbiAgICAgIHRhcChkYXRhID0+IHtcclxuICAgICAgICBpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b0hlaWdodCAmJiBkYXRhLnByb3BlcnR5Lm5hbWUgPT09ICdwb3NpdGlvbicpe1xyXG5cdFx0XHRcdFx0dGhpcy51cGRhdGUoKTtcclxuXHRcdFx0XHR9XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IHJlZnJlc2hlZENhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0UmVmcmVzaGVkU3RhdGUoKS5waXBlKFxyXG4gICAgICB0YXAoZGF0YSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9IZWlnaHQpIHtcclxuICAgICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBhdXRvSGVpZ2h0JDogT2JzZXJ2YWJsZTxzdHJpbmcgfCBhbnk+ID0gbWVyZ2UoaW5pdGlhbGl6ZWRDYXJvdXNlbCQsIGNoYW5nZWRTZXR0aW5ncyQsIHJlZnJlc2hlZENhcm91c2VsJCk7XHJcbiAgICB0aGlzLmF1dG9IZWlnaHRTdWJzY3JpcHRpb24gPSBhdXRvSGVpZ2h0JC5zdWJzY3JpYmUoXHJcbiAgICAgICgpID0+IHt9XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlcyB0aGUgcHJvcCAnaGVpZ2h0U3RhdGUnIG9mIHNsaWRlc1xyXG4gICAqL1xyXG4gIHVwZGF0ZSgpIHtcclxuICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuaXRlbXNcclxuICAgIGxldCBzdGFydCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmN1cnJlbnQoKSxcclxuICAgICAgICBlbmQgPSBzdGFydCArIGl0ZW1zO1xyXG5cclxuICAgIGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5jZW50ZXIpIHtcclxuICAgICAgc3RhcnQgPSBpdGVtcyAlIDIgPT09IDEgPyBzdGFydCAtIChpdGVtcyAtIDEpIC8gMiA6IHN0YXJ0IC0gaXRlbXMgLyAyO1xyXG4gICAgICBlbmQgPSBpdGVtcyAlIDIgPT09IDEgPyBzdGFydCArIGl0ZW1zIDogc3RhcnQgKyBpdGVtcyArIDE7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2xpZGVzRGF0YS5mb3JFYWNoKChzbGlkZSwgaSkgPT4ge1xyXG4gICAgICBzbGlkZS5oZWlnaHRTdGF0ZSA9IChpID49IHN0YXJ0ICYmIGkgPCBlbmQpID8gJ2Z1bGwnIDogJ251bGxlZCc7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBPYnNlcnZhYmxlLCBtZXJnZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBDYXJvdXNlbFNlcnZpY2UgfSBmcm9tICcuL2Nhcm91c2VsLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyB0YXAsIHNraXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSGFzaFNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlwdGlvbiB0byBtZXJnZSBPYnNlcnZhYmxlIGZyb20gQ2Fyb3VzZWxTZXJ2aWNlXHJcbiAgICovXHJcbiAgaGFzaFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBDdXJyZW50IHVybCBmcmFnbWVudCAoaGFzaClcclxuICAgKi9cclxuICBjdXJyZW50SGFzaEZyYWdtZW50OiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2Fyb3VzZWxTZXJ2aWNlOiBDYXJvdXNlbFNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge1xyXG4gICAgdGhpcy5zcHlEYXRhU3RyZWFtcygpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmhhc2hTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlZmluZXMgT2JzZXJ2YWJsZXMgd2hpY2ggc2VydmljZSBtdXN0IG9ic2VydmVcclxuICAgKi9cclxuICBzcHlEYXRhU3RyZWFtcygpIHtcclxuICAgIGNvbnN0IGluaXRpYWxpemVkQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRJbml0aWFsaXplZFN0YXRlKCkucGlwZShcclxuICAgICAgdGFwKCgpID0+IHRoaXMubGlzdGVuVG9Sb3V0ZSgpIClcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgY2hhbmdlZFNldHRpbmdzJDogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0Q2hhbmdlZFN0YXRlKCkucGlwZShcclxuICAgICAgdGFwKGRhdGEgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5VUkxoYXNoTGlzdGVuZXIgJiYgZGF0YS5wcm9wZXJ0eS5uYW1lID09PSAncG9zaXRpb24nKSB7XHJcbiAgICAgICAgICBjb25zdCBuZXdDdXJTbGlkZSA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmN1cnJlbnQoKTtcclxuICAgICAgICAgIGNvbnN0IG5ld0N1ckZyYWdtZW50ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2xpZGVzRGF0YVtuZXdDdXJTbGlkZV0uaGFzaEZyYWdtZW50O1xyXG5cclxuICAgICAgICAgIGlmICghbmV3Q3VyRnJhZ21lbnQgfHwgbmV3Q3VyRnJhZ21lbnQgPT09IHRoaXMuY3VycmVudEhhc2hGcmFnbWVudCkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy4vJ10sIHtmcmFnbWVudDogbmV3Q3VyRnJhZ21lbnQsIHJlbGF0aXZlVG86IHRoaXMucm91dGV9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IGhhc2hGcmFnbWVudCQ6IE9ic2VydmFibGU8c3RyaW5nIHwgYW55PiA9IG1lcmdlKGluaXRpYWxpemVkQ2Fyb3VzZWwkLCBjaGFuZ2VkU2V0dGluZ3MkKTtcclxuICAgIHRoaXMuaGFzaFN1YnNjcmlwdGlvbiA9IGhhc2hGcmFnbWVudCQuc3Vic2NyaWJlKFxyXG4gICAgICAoKSA9PiB7fVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHJld2luZHMgY2Fyb3VzZWwgdG8gc2xpZGUgd2hpY2ggaGFzIHRoZSBzYW1lIGhhc2hGcmFnbWVudCBhcyBmcmFnbWVudCBvZiBjdXJyZW50IHVybFxyXG4gICAqIEBwYXJhbSBmcmFnbWVudCBmcmFnbWVudCBvZiB1cmxcclxuICAgKi9cclxuICByZXdpbmQoZnJhZ21lbnQ6IHN0cmluZykge1xyXG4gICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLmNhcm91c2VsU2VydmljZS5zbGlkZXNEYXRhLmZpbmRJbmRleChzbGlkZSA9PiBzbGlkZS5oYXNoRnJhZ21lbnQgPT09IGZyYWdtZW50ICYmIHNsaWRlLmlzQ2xvbmVkID09PSBmYWxzZSk7XHJcblxyXG4gICAgaWYgKHBvc2l0aW9uID09PSAtMSB8fCBwb3NpdGlvbiA9PT0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuY3VycmVudCgpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcblx0XHR0aGlzLmNhcm91c2VsU2VydmljZS50byh0aGlzLmNhcm91c2VsU2VydmljZS5yZWxhdGl2ZShwb3NpdGlvbiksIGZhbHNlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXRpYXRlIGxpc3RlbmluZyB0byBBY3RpdmF0ZWRSb3V0ZS5mcmFnbWVudFxyXG4gICAqL1xyXG4gIGxpc3RlblRvUm91dGUoKSB7XHJcbiAgICBjb25zdCBjb3VudCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLnN0YXJ0UG9zaXRpb24gPT09ICdVUkxIYXNoJyA/IDAgOiAyO1xyXG4gICAgdGhpcy5yb3V0ZS5mcmFnbWVudC5waXBlKFxyXG4gICAgICAgIHNraXAoY291bnQpXHJcbiAgICAgIClcclxuICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICBmcmFnbWVudCA9PiB7XHJcbiAgICAgICAgICB0aGlzLmN1cnJlbnRIYXNoRnJhZ21lbnQgPSBmcmFnbWVudDtcclxuICAgICAgICAgIHRoaXMucmV3aW5kKGZyYWdtZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgIClcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgT25Jbml0LFxyXG4gIEFmdGVyQ29udGVudENoZWNrZWQsXHJcbiAgT25EZXN0cm95LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBEaXJlY3RpdmUsXHJcbiAgUXVlcnlMaXN0LFxyXG4gIENvbnRlbnRDaGlsZHJlbixcclxuICBUZW1wbGF0ZVJlZixcclxuICBFbGVtZW50UmVmLFxyXG4gIEFmdGVyQ29udGVudEluaXQsXHJcbiAgRXZlbnRFbWl0dGVyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIE9ic2VydmFibGUsIG1lcmdlIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBSZXNpemVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvcmVzaXplLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyB0YXAsIGRlbGF5LCBmaWx0ZXIsIHN3aXRjaE1hcCwgZmlyc3QgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IENhcm91c2VsU2VydmljZSwgQ2Fyb3VzZWxDdXJyZW50RGF0YSB9IGZyb20gJy4uL3NlcnZpY2VzL2Nhcm91c2VsLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTdGFnZURhdGEgfSBmcm9tIFwiLi4vbW9kZWxzL3N0YWdlLWRhdGEubW9kZWxcIjtcclxuaW1wb3J0IHsgT3dsRE9NRGF0YSB9IGZyb20gXCIuLi9tb2RlbHMvb3dsRE9NLWRhdGEubW9kZWxcIjtcclxuaW1wb3J0IHsgU2xpZGVNb2RlbCB9IGZyb20gJy4uL21vZGVscy9zbGlkZS5tb2RlbCc7XHJcbmltcG9ydCB7IE93bE9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbHMvb3dsLW9wdGlvbnMubW9kZWwnO1xyXG5pbXBvcnQgeyBOYXZEYXRhLCBEb3RzRGF0YSB9IGZyb20gJy4uL21vZGVscy9uYXZpZ2F0aW9uLWRhdGEubW9kZWxzJztcclxuaW1wb3J0IHsgTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uYXZpZ2F0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBdXRvcGxheVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9hdXRvcGxheS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTGF6eUxvYWRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbGF6eWxvYWQuc2VydmljZSc7XHJcbmltcG9ydCB7IEFuaW1hdGVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvYW5pbWF0ZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQXV0b0hlaWdodFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9hdXRvaGVpZ2h0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBIYXNoU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2hhc2guc2VydmljZSc7XHJcblxyXG5sZXQgbmV4dElkID0gMDtcclxuXHJcbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ25nLXRlbXBsYXRlW2Nhcm91c2VsU2xpZGVdJyB9KVxyXG5leHBvcnQgY2xhc3MgQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZSB7XHJcbiAgLyoqXHJcbiAgICogVW5pcXVlIHNsaWRlIGlkZW50aWZpZXIuIE11c3QgYmUgdW5pcXVlIGZvciB0aGUgZW50aXJlIGRvY3VtZW50IGZvciBwcm9wZXIgYWNjZXNzaWJpbGl0eSBzdXBwb3J0LlxyXG4gICAqIFdpbGwgYmUgYXV0by1nZW5lcmF0ZWQgaWYgbm90IHByb3ZpZGVkLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGlkID0gYG93bC1zbGlkZS0ke25leHRJZCsrfWA7XHJcblxyXG4gIC8qKlxyXG4gICAqIERlZmluZXMgaG93IG11Y2ggd2lkdGhzIG9mIGNvbW1vbiBzbGlkZSB3aWxsIGN1cnJlbnQgc2xpZGUgaGF2ZVxyXG4gICAqIGUuZy4gaWYgX21lcmdlRGF0YT0yLCB0aGUgc2xpZGUgd2lsbCB0d2ljZSB3aWRlciB0aGVuIHNsaWRlcyB3aXRoIF9tZXJnZURhdGE9MVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2RhdGFNZXJnZSA9IDE7XHJcbiAgQElucHV0KClcclxuICBzZXQgZGF0YU1lcmdlKGRhdGE6IG51bWJlcikge1xyXG4gICAgdGhpcy5fZGF0YU1lcmdlID0gdGhpcy5pc051bWVyaWMoZGF0YSkgPyBkYXRhIDogMTtcclxuICB9O1xyXG4gIGdldCBkYXRhTWVyZ2UoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2RhdGFNZXJnZSB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdpZHRoIG9mIHNsaWRlXHJcbiAgICovXHJcbiAgQElucHV0KCkgd2lkdGggPSAwO1xyXG5cclxuICAvKipcclxuICAgKiBJbm5lciBjb250ZW50IG9mIGRvdCBmb3IgY2VydGFpbiBzbGlkZTsgY2FuIGJlIGh0bWwtbWFya3VwXHJcbiAgICovXHJcbiAgQElucHV0KCkgZG90Q29udGVudCA9ICcnO1xyXG5cclxuICAvKipcclxuICAgKiBIYXNoIChmcmFnbWVudCkgb2YgdXJsIHdoaWNoIGNvcnJlc3BvbmRzIHRvIGNlcnRhaW4gc2xpZGVcclxuICAgKi9cclxuICBASW5wdXQoKSBkYXRhSGFzaCA9ICcnO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdHBsUmVmOiBUZW1wbGF0ZVJlZjxhbnk+KSB7fVxyXG5cclxuICAvKipcclxuXHQgKiBEZXRlcm1pbmVzIGlmIHRoZSBpbnB1dCBpcyBhIE51bWJlciBvciBzb21ldGhpbmcgdGhhdCBjYW4gYmUgY29lcmNlZCB0byBhIE51bWJlclxyXG5cdCAqIEBwYXJhbSAtIFRoZSBpbnB1dCB0byBiZSB0ZXN0ZWRcclxuXHQgKiBAcmV0dXJucyAtIEFuIGluZGljYXRpb24gaWYgdGhlIGlucHV0IGlzIGEgTnVtYmVyIG9yIGNhbiBiZSBjb2VyY2VkIHRvIGEgTnVtYmVyXHJcblx0ICovXHJcbiAgaXNOdW1lcmljKG51bWJlcjogYW55KTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQobnVtYmVyKSk7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogRGF0YSB3aGljaCB3aWxsIGJlIHBhc3NlZCBvdXQgYWZ0ZXIgZW5kaW5nIG9mIHRyYW5zaXRpb24gb2YgY2Fyb3VzZWxcclxuICovXHJcbmV4cG9ydCBjbGFzcyBTbGlkZXNPdXRwdXREYXRhIHtcclxuICBzdGFydFBvc2l0aW9uPzogbnVtYmVyO1xyXG4gIHNsaWRlcz86IFNsaWRlTW9kZWxbXTtcclxufTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnb3dsLWNhcm91c2VsLW8nLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2IGNsYXNzPVwib3dsLWNhcm91c2VsIG93bC10aGVtZVwiICNvd2xDYXJvdXNlbFxyXG4gICAgICBbbmdDbGFzc109XCJ7J293bC1ydGwnOiBvd2xET01EYXRhPy5ydGwsXHJcbiAgICAgICAgICAgICAgICAgICdvd2wtbG9hZGVkJzogb3dsRE9NRGF0YT8uaXNMb2FkZWQsXHJcbiAgICAgICAgICAgICAgICAgICdvd2wtcmVzcG9uc2l2ZSc6IG93bERPTURhdGE/LmlzUmVzcG9uc2l2ZSxcclxuICAgICAgICAgICAgICAgICAgJ293bC1kcmFnJzogb3dsRE9NRGF0YT8uaXNNb3VzZURyYWdhYmxlLFxyXG4gICAgICAgICAgICAgICAgICAnb3dsLWdyYWInOiBvd2xET01EYXRhPy5pc0dyYWJ9XCJcclxuICAgICAgKG1vdXNlb3Zlcik9XCJzdGFydFBhdXNpbmcoKVwiXHJcbiAgICAgIChtb3VzZWxlYXZlKT1cInN0YXJ0UGxheU1MKClcIlxyXG4gICAgICAodG91Y2hzdGFydCk9XCJzdGFydFBhdXNpbmcoKVwiXHJcbiAgICAgICh0b3VjaGVuZCk9XCJzdGFydFBsYXlURSgpXCI+XHJcblxyXG4gICAgICA8ZGl2ICpuZ0lmPVwiY2Fyb3VzZWxMb2FkZWRcIiBjbGFzcz1cIm93bC1zdGFnZS1vdXRlclwiPlxyXG4gICAgICAgIDxvd2wtc3RhZ2UgW293bERyYWdnYWJsZV09XCJ7J2lzTW91c2VEcmFnYWJsZSc6IG93bERPTURhdGE/LmlzTW91c2VEcmFnYWJsZSwgJ2lzVG91Y2hEcmFnYWJsZSc6IG93bERPTURhdGE/LmlzVG91Y2hEcmFnYWJsZX1cIlxyXG4gICAgICAgICAgICAgICAgICAgIFtzdGFnZURhdGFdPVwic3RhZ2VEYXRhXCJcclxuICAgICAgICAgICAgICAgICAgICBbc2xpZGVzRGF0YV09XCJzbGlkZXNEYXRhXCI+PC9vd2wtc3RhZ2U+XHJcbiAgICAgIDwvZGl2PiA8IS0tIC8ub3dsLXN0YWdlLW91dGVyIC0tPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwib3dsLW5hdlwiIFtuZ0NsYXNzXT1cInsnZGlzYWJsZWQnOiBuYXZEYXRhPy5kaXNhYmxlZH1cIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwib3dsLXByZXZcIiBbbmdDbGFzc109XCJ7J2Rpc2FibGVkJzogbmF2RGF0YT8ucHJldj8uZGlzYWJsZWR9XCIgKGNsaWNrKT1cInByZXYoKVwiIFtpbm5lckhUTUxdPVwibmF2RGF0YT8ucHJldj8uaHRtbFRleHRcIj48L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwib3dsLW5leHRcIiBbbmdDbGFzc109XCJ7J2Rpc2FibGVkJzogbmF2RGF0YT8ubmV4dD8uZGlzYWJsZWR9XCIgKGNsaWNrKT1cIm5leHQoKVwiIFtpbm5lckhUTUxdPVwibmF2RGF0YT8ubmV4dD8uaHRtbFRleHRcIj48L2Rpdj5cclxuICAgICAgPC9kaXY+IDwhLS0gLy5vd2wtbmF2IC0tPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwib3dsLWRvdHNcIiBbbmdDbGFzc109XCJ7J2Rpc2FibGVkJzogZG90c0RhdGE/LmRpc2FibGVkfVwiPlxyXG4gICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGRvdCBvZiBkb3RzRGF0YT8uZG90c1wiIGNsYXNzPVwib3dsLWRvdFwiIFtuZ0NsYXNzXT1cInsnYWN0aXZlJzogZG90LmFjdGl2ZSwgJ293bC1kb3QtdGV4dCc6IGRvdC5zaG93SW5uZXJDb250ZW50fVwiIChjbGljayk9XCJtb3ZlQnlEb3QoZG90LmlkKVwiPlxyXG4gICAgICAgICAgPHNwYW4gW2lubmVySFRNTF09XCJkb3QuaW5uZXJDb250ZW50XCI+PC9zcGFuPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj4gPCEtLSAvLm93bC1kb3RzIC0tPlxyXG4gICAgPC9kaXY+IDwhLS0gLy5vd2wtY2Fyb3VzZWwgb3dsLWxvYWRlZCAtLT5cclxuICBgLFxyXG4gIHN0eWxlczogW2Aub3dsLXRoZW1lIHsgZGlzcGxheTogYmxvY2s7IH1gXSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIE5hdmlnYXRpb25TZXJ2aWNlLFxyXG4gICAgQXV0b3BsYXlTZXJ2aWNlLFxyXG4gICAgQ2Fyb3VzZWxTZXJ2aWNlLFxyXG4gICAgTGF6eUxvYWRTZXJ2aWNlLFxyXG4gICAgQW5pbWF0ZVNlcnZpY2UsXHJcbiAgICBBdXRvSGVpZ2h0U2VydmljZSxcclxuICAgIEhhc2hTZXJ2aWNlXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2Fyb3VzZWxDb21wb25lbnRcclxuICBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcclxuICBAQ29udGVudENoaWxkcmVuKENhcm91c2VsU2xpZGVEaXJlY3RpdmUpXHJcbiAgc2xpZGVzOiBRdWVyeUxpc3Q8Q2Fyb3VzZWxTbGlkZURpcmVjdGl2ZT47XHJcblxyXG4gIEBPdXRwdXQoKSB0cmFuc2xhdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxTbGlkZXNPdXRwdXREYXRhPigpO1xyXG4gIEBPdXRwdXQoKSBkcmFnZ2luZyA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogV2lkdGggb2YgY2Fyb3VzZWwgd2luZG93ICh0YWcgd2l0aCBjbGFzcyAub3dsLWNhcm91c2VsKSwgaW4gd2ljaCB3ZSBjYW4gc2VlIG1vdmluZyBzbGlkZXJzXHJcbiAgICovXHJcbiAgY2Fyb3VzZWxXaW5kb3dXaWR0aDogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gdG8gJ3Jlc2l6ZScgZXZlbnRcclxuICAgKi9cclxuICByZXNpemVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaXB0aW9uIG1lcmdlIE9ic2VydmFibGUsIHdoaWNoIG1lcmdlcyBhbGwgT2JzZXJ2YWJsZXMgaW4gdGhlIGNvbXBvbmVudCBleGNlcHQgJ3Jlc2l6ZScgT2JzZXJ2YWJsZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2FsbE9ic2VydlN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBDdXJyZW50IHNldHRpbmdzIGZvciB0aGUgY2Fyb3VzZWwuXHJcbiAgICovXHJcbiAgb3dsRE9NRGF0YTogT3dsRE9NRGF0YTtcclxuXHJcbiAgLyoqXHJcbiAgICogRGF0YSBvZiBvd2wtc3RhZ2VcclxuICAgKi9cclxuXHRzdGFnZURhdGE6IFN0YWdlRGF0YTtcclxuXHJcblx0LyoqXHJcblx0ICogIERhdGEgb2YgZXZlcnkgc2xpZGVcclxuXHQgKi9cclxuICBzbGlkZXNEYXRhOiBTbGlkZU1vZGVsW107XHJcblxyXG4gIC8qKlxyXG5cdCAqIERhdGEgb2YgbmF2aWdhdGlvbiBibG9ja1xyXG5cdCAqL1xyXG5cdG5hdkRhdGE6IE5hdkRhdGE7XHJcblxyXG5cdC8qKlxyXG5cdCAqIERhdGEgb2YgZG90cyBibG9ja1xyXG5cdCAqL1xyXG4gIGRvdHNEYXRhOiBEb3RzRGF0YTtcclxuXHJcbiAgLyoqXHJcbiAgICogRGF0YSwgd2ljaCBhcmUgcGFzc2VkIG91dCBvZiBjYXJvdXNlbCBhZnRlciBlbmRpbmcgb2YgdHJhbnNpb25pbmcgb2YgY2Fyb3VzZWxcclxuICAgKi9cclxuICBzbGlkZXNPdXRwdXREYXRhOiBTbGlkZXNPdXRwdXREYXRhO1xyXG5cclxuICAvKipcclxuICAgKiBTaG93cyB3aGV0aGVyIGNhcm91c2VsIGlzIGxvYWRlZCBvZiBub3QuXHJcbiAgICovXHJcbiAgY2Fyb3VzZWxMb2FkZWQgPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVXNlcidzIG9wdGlvbnNcclxuICAgKi9cclxuICBASW5wdXQoKSBvcHRpb25zOiBPd2xPcHRpb25zO1xyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZhYmxlIGZvciBnZXR0aW5nIGN1cnJlbnQgVmlldyBTZXR0aW5nc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgX3ZpZXdDdXJTZXR0aW5ncyQ6IE9ic2VydmFibGU8Q2Fyb3VzZWxDdXJyZW50RGF0YT47XHJcblxyXG4gIC8qKlxyXG4gICAqIE9ic2VydmFibGUgZm9yIGNhdGNoaW5nIHRoZSBlbmQgb2YgdHJhbnNpdGlvbiBvZiBjYXJvdXNlbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3RyYW5zbGF0ZWRDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPjtcclxuXHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2YWJsZSBmb3IgY2F0Y2hpbmcgdGhlIHN0YXJ0IG9mIGRyYWdnaW5nIG9mIHRoZSBjYXJvdXNlbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2RyYWdnaW5nQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz47XHJcblxyXG4gIC8qKlxyXG4gICAqIE9ic2VydmFibGUgZm9yIG1lcmdpbmcgYWxsIE9ic2VydmFibGVzIGFuZCBjcmVhdGluZyBvbmUgc3Vic2NyaXB0aW9uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfY2Fyb3VzZWxNZXJnZSQ6IE9ic2VydmFibGU8Q2Fyb3VzZWxDdXJyZW50RGF0YSB8IHN0cmluZz47XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcclxuICAgIHByaXZhdGUgcmVzaXplU2VydmljZTogUmVzaXplU2VydmljZSxcclxuICAgIHByaXZhdGUgY2Fyb3VzZWxTZXJ2aWNlOiBDYXJvdXNlbFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIG5hdmlnYXRpb25TZXJ2aWNlOiBOYXZpZ2F0aW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgYXV0b3BsYXlTZXJ2aWNlOiBBdXRvcGxheVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGxhenlMb2FkU2VydmljZTogTGF6eUxvYWRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBhbmltYXRlU2VydmljZTogQW5pbWF0ZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGF1dG9IZWlnaHRTZXJ2aWNlOiBBdXRvSGVpZ2h0U2VydmljZSxcclxuICAgIHByaXZhdGUgaGFzaFNlcnZpY2U6IEhhc2hTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuc3B5RGF0YVN0cmVhbXMoKTtcclxuXHJcbiAgICB0aGlzLmNhcm91c2VsV2luZG93V2lkdGggPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgJy5vd2wtY2Fyb3VzZWwnXHJcbiAgICApLmNsaWVudFdpZHRoO1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xyXG4gIH1cclxuICAvLyBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSBFTkRcclxuXHJcbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dXAodGhpcy5jYXJvdXNlbFdpbmRvd1dpZHRoLCB0aGlzLnNsaWRlcy50b0FycmF5KCksIHRoaXMub3B0aW9ucyk7XHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5pbml0aWFsaXplKHRoaXMuc2xpZGVzLnRvQXJyYXkoKSk7XHJcblxyXG4gICAgdGhpcy5fd2luUmVzaXplV2F0Y2hlcigpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICBpZiAodGhpcy5yZXNpemVTdWJzY3JpcHRpb24pIHtcclxuICAgICAgdGhpcy5yZXNpemVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9hbGxPYnNlcnZTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEpvaW5zIHRoZSBvYnNlcnZhYmxlIGxvZ2luIGluIG9uZSBwbGFjZTogc2V0cyB2YWx1ZXMgdG8gc29tZSBvYnNlcnZhYmxlcywgbWVyZ2VzIHRoaXMgb2JzZXJ2YWJsZXMgYW5kXHJcbiAgICogc3ViY3JpYmVzIHRvIG1lcmdlIGZ1bmNcclxuICAgKi9cclxuICBzcHlEYXRhU3RyZWFtcygpIHtcclxuICAgIHRoaXMuX3ZpZXdDdXJTZXR0aW5ncyQgPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRWaWV3Q3VyU2V0dGluZ3MoKS5waXBlKFxyXG4gICAgICB0YXAoZGF0YSA9PiB7XHJcbiAgICAgICAgdGhpcy5vd2xET01EYXRhID0gZGF0YS5vd2xET01EYXRhO1xyXG4gICAgICAgIHRoaXMuc3RhZ2VEYXRhID0gZGF0YS5zdGFnZURhdGE7XHJcbiAgICAgICAgdGhpcy5zbGlkZXNEYXRhID0gZGF0YS5zbGlkZXNEYXRhO1xyXG4gICAgICAgIGlmICghdGhpcy5jYXJvdXNlbExvYWRlZCkge1xyXG4gICAgICAgICAgdGhpcy5jYXJvdXNlbExvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubmF2RGF0YSA9IGRhdGEubmF2RGF0YTtcclxuICAgICAgICB0aGlzLmRvdHNEYXRhID0gZGF0YS5kb3RzRGF0YTtcclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5fdHJhbnNsYXRlZENhcm91c2VsJCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldFRyYW5zbGF0ZWRTdGF0ZSgpLnBpcGUoXHJcbiAgICAgIHRhcCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5nYXRoZXJUcmFuc2xhdGVkRGF0YSgpO1xyXG4gICAgICAgIHRoaXMudHJhbnNsYXRlZC5lbWl0KHRoaXMuc2xpZGVzT3V0cHV0RGF0YSk7XHJcbiAgICAgICAgdGhpcy5zbGlkZXNPdXRwdXREYXRhID0ge307XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuX2RyYWdnaW5nQ2Fyb3VzZWwkID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0RHJhZ1N0YXRlKCkucGlwZShcclxuICAgICAgdGFwKCgpID0+IHtcclxuICAgICAgICB0aGlzLmRyYWdnaW5nLmVtaXQodHJ1ZSk7XHJcbiAgICAgIH0pLFxyXG4gICAgICBzd2l0Y2hNYXAoXHJcbiAgICAgICAgKCkgPT4gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0VHJhbnNsYXRlZFN0YXRlKCkucGlwZShcclxuICAgICAgICAgIGZpcnN0KCksXHJcbiAgICAgICAgICB0YXAoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmRyYWdnaW5nLmVtaXQoZmFsc2UpO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICApXHJcbiAgICAgIClcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5fY2Fyb3VzZWxNZXJnZSQgPSBtZXJnZSh0aGlzLl92aWV3Q3VyU2V0dGluZ3MkLCB0aGlzLl90cmFuc2xhdGVkQ2Fyb3VzZWwkLCB0aGlzLl9kcmFnZ2luZ0Nhcm91c2VsJCk7XHJcbiAgICB0aGlzLl9hbGxPYnNlcnZTdWJzY3JpcHRpb24gPSB0aGlzLl9jYXJvdXNlbE1lcmdlJC5zdWJzY3JpYmUoKCkgPT4ge30pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdCBzdWJzY3JpcHRpb24gdG8gcmVzaXplIGV2ZW50IGFuZCBhdHRhY2hlcyBoYW5kbGVyIGZvciB0aGlzIGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfd2luUmVzaXplV2F0Y2hlcigpIHtcclxuICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLmNhcm91c2VsU2VydmljZS5fb3B0aW9ucy5yZXNwb25zaXZlKS5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5yZXNpemVTdWJzY3JpcHRpb24gPSB0aGlzLnJlc2l6ZVNlcnZpY2Uub25SZXNpemUkXHJcbiAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICBmaWx0ZXIoKCkgPT4gdGhpcy5jYXJvdXNlbFdpbmRvd1dpZHRoICE9PSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLm93bC1jYXJvdXNlbCcpLmNsaWVudFdpZHRoKSxcclxuICAgICAgICAgIGRlbGF5KHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLnJlc3BvbnNpdmVSZWZyZXNoUmF0ZSlcclxuICAgICAgICApXHJcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmNhcm91c2VsU2VydmljZS5vblJlc2l6ZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLm93bC1jYXJvdXNlbCcpLmNsaWVudFdpZHRoKTtcclxuICAgICAgICAgIHRoaXMuY2Fyb3VzZWxXaW5kb3dXaWR0aCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcub3dsLWNhcm91c2VsJykuY2xpZW50V2lkdGg7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGVyIGZvciB0cmFuc2l0aW9lbmQgZXZlbnRcclxuICAgKi9cclxuICBvblRyYW5zaXRpb25FbmQoKSB7XHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5vblRyYW5zaXRpb25FbmQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhbmRsZXIgZm9yIGNsaWNrIGV2ZW50LCBhdHRhY2hlZCB0byBuZXh0IGJ1dHRvblxyXG4gICAqL1xyXG4gIG5leHQoKSB7XHJcbiAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLm5leHQodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MubmF2U3BlZWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlciBmb3IgY2xpY2sgZXZlbnQsIGF0dGFjaGVkIHRvIHByZXYgYnV0dG9uXHJcbiAgICovXHJcbiAgcHJldigpIHtcclxuICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UucHJldih0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5uYXZTcGVlZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGVyIGZvciBjbGljayBldmVudCwgYXR0YWNoZWQgdG8gZG90c1xyXG4gICAqL1xyXG4gIG1vdmVCeURvdChkb3RJZDogc3RyaW5nKSB7XHJcbiAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLm1vdmVCeURvdChkb3RJZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiByZXdpbmRzIGNhcm91c2VsIHRvIHNsaWRlIHdpdGggbmVlZGVkIGlkXHJcbiAgICogQHBhcmFtIGlkIGZyYWdtZW50IG9mIHVybFxyXG4gICAqL1xyXG4gIHRvKGlkOiBzdHJpbmcpIHtcclxuICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UudG9TbGlkZUJ5SWQoaWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2F0aGVycyBhbmQgcHJlcGFyZXMgZGF0YSBpbnRlbmRlZCBmb3IgcGFzc2luZyB0byB0aGUgdXNlciBieSBtZWFucyBvZiBmaXJpbmcgZXZlbnQgdHJhbnNsYXRlZENhcm91c2VsXHJcbiAgICovXHJcbiAgZ2F0aGVyVHJhbnNsYXRlZERhdGEoKSB7XHJcbiAgICBsZXQgc3RhcnRQb3NpdGlvbjogbnVtYmVyO1xyXG4gICAgY29uc3QgY2xvbmVkSWRQcmVmaXggPSB0aGlzLmNhcm91c2VsU2VydmljZS5jbG9uZWRJZFByZWZpeDtcclxuICAgIGNvbnN0IGFjdGl2ZVNsaWRlczogU2xpZGVNb2RlbFtdID0gdGhpcy5zbGlkZXNEYXRhXHJcbiAgICAgIC5maWx0ZXIoc2xpZGUgPT4gc2xpZGUuaXNBY3RpdmUgPT09IHRydWUpXHJcbiAgICAgIC5tYXAoc2xpZGUgPT4ge1xyXG4gICAgICAgIGNvbnN0IGlkID0gc2xpZGUuaWQuaW5kZXhPZihjbG9uZWRJZFByZWZpeCkgPj0gMCA/IHNsaWRlLmlkLnNsaWNlKGNsb25lZElkUHJlZml4Lmxlbmd0aCkgOiBzbGlkZS5pZDtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgaWQ6IGlkLFxyXG4gICAgICAgICAgd2lkdGg6IHNsaWRlLndpZHRoLFxyXG4gICAgICAgICAgbWFyZ2luTDogc2xpZGUubWFyZ2luTCxcclxuICAgICAgICAgIG1hcmdpblI6IHNsaWRlLm1hcmdpblIsXHJcbiAgICAgICAgICBjZW50ZXI6IHNsaWRlLmlzQ2VudGVyZWRcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgc3RhcnRQb3NpdGlvbiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnJlbGF0aXZlKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmN1cnJlbnQoKSk7XHJcbiAgICB0aGlzLnNsaWRlc091dHB1dERhdGEgPSB7XHJcbiAgICAgIHN0YXJ0UG9zaXRpb246IHN0YXJ0UG9zaXRpb24sXHJcbiAgICAgIHNsaWRlczogYWN0aXZlU2xpZGVzXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdGFydHMgcGF1c2luZ1xyXG4gICAqL1xyXG4gIHN0YXJ0UGF1c2luZygpIHtcclxuICAgIHRoaXMuYXV0b3BsYXlTZXJ2aWNlLnN0YXJ0UGF1c2luZygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnRzIHBsYXlpbmcgYWZ0ZXIgbW91c2UgbGVhdmVzIGNhcm91c2VsXHJcbiAgICovXHJcbiAgc3RhcnRQbGF5TUwoKSB7XHJcbiAgICB0aGlzLmF1dG9wbGF5U2VydmljZS5zdGFydFBsYXlpbmdNb3VzZUxlYXZlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdGFydHMgcGxheWluZyBhZnRlciB0b3VjaCBlbmRzXHJcbiAgICovXHJcbiAgc3RhcnRQbGF5VEUoKSB7XHJcbiAgICB0aGlzLmF1dG9wbGF5U2VydmljZS5zdGFydFBsYXlpbmdUb3VjaEVuZCgpO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBOZ1pvbmUsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgUmVuZGVyZXIyLCBPbkluaXQsIE9uRGVzdHJveSwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ2Fyb3VzZWxTZXJ2aWNlLCBDb29yZHMgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jYXJvdXNlbC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGZpcnN0IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBTdGFnZURhdGEgfSBmcm9tICcuLi8uLi9tb2RlbHMvc3RhZ2UtZGF0YS5tb2RlbCc7XHJcbmltcG9ydCB7IFNsaWRlTW9kZWwgfSBmcm9tICcuLi8uLi9tb2RlbHMvc2xpZGUubW9kZWwnO1xyXG5pbXBvcnQgeyBBbmltYXRlU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FuaW1hdGUuc2VydmljZSc7XHJcbmltcG9ydCB7XHJcbiAgdHJpZ2dlcixcclxuICBzdGF0ZSxcclxuICBzdHlsZSxcclxuICBhbmltYXRlLFxyXG4gIHRyYW5zaXRpb25cclxufSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdvd2wtc3RhZ2UnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwib3dsLXN0YWdlXCIgW25nU3R5bGVdPVwieyd3aWR0aCc6IHN0YWdlRGF0YS53aWR0aCArICdweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndHJhbnNmb3JtJzogc3RhZ2VEYXRhLnRyYW5zZm9ybSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0cmFuc2l0aW9uJzogc3RhZ2VEYXRhLnRyYW5zaXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncGFkZGluZy1sZWZ0Jzogc3RhZ2VEYXRhLnBhZGRpbmdMICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdwYWRkaW5nLXJpZ2h0Jzogc3RhZ2VEYXRhLnBhZGRpbmdSICsgJ3B4JyB9XCJcclxuICAgICAgICAgICh0cmFuc2l0aW9uZW5kKT1cIm9uVHJhbnNpdGlvbkVuZCgpXCI+XHJcbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgc2xpZGUgb2Ygc2xpZGVzRGF0YTsgbGV0IGkgPSBpbmRleFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm93bC1pdGVtXCIgW25nQ2xhc3NdPVwic2xpZGUuY2xhc3Nlc1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nU3R5bGVdPVwieyd3aWR0aCc6IHNsaWRlLndpZHRoICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbWFyZ2luLWxlZnQnOiBzbGlkZS5tYXJnaW5MICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbWFyZ2luLXJpZ2h0Jzogc2xpZGUubWFyZ2luUiArICdweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2xlZnQnOiBzbGlkZS5sZWZ0fVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGFuaW1hdGlvbmVuZCk9XCJjbGVhcihzbGlkZS5pZClcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtAYXV0b0hlaWdodF09XCJzbGlkZS5oZWlnaHRTdGF0ZVwiPlxyXG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nSWY9XCJzbGlkZS5sb2FkXCIgW25nVGVtcGxhdGVPdXRsZXRdPVwic2xpZGUudHBsUmVmXCI+PC9uZy10ZW1wbGF0ZT5cclxuICAgICAgICAgIDwvZGl2PjwhLS0gLy5vd2wtaXRlbSAtLT5cclxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgPC9kaXY+PCEtLSAvLm93bC1zdGFnZSAtLT5cclxuICAgIDwvZGl2PlxyXG4gIGAsXHJcbiAgYW5pbWF0aW9uczogW1xyXG4gICAgdHJpZ2dlcignYXV0b0hlaWdodCcsIFtcclxuICAgICAgc3RhdGUoJ251bGxlZCcsIHN0eWxlKHtoZWlnaHQ6IDB9KSksXHJcbiAgICAgIHN0YXRlKCdmdWxsJywgc3R5bGUoe2hlaWdodDogJyonfSkpLFxyXG4gICAgICB0cmFuc2l0aW9uKCdmdWxsID0+IG51bGxlZCcsIFtcclxuICAgICAgICAvLyBzdHlsZSh7aGVpZ2h0OiAnKid9KSxcclxuICAgICAgICBhbmltYXRlKCc3MDBtcyAzNTBtcycpXHJcbiAgICAgIF0pLFxyXG4gICAgICB0cmFuc2l0aW9uKCdudWxsZWQgPT4gZnVsbCcsIFtcclxuICAgICAgICAvLyBzdHlsZSh7aGVpZ2h0OiAwfSksXHJcbiAgICAgICAgYW5pbWF0ZSgzNTApXHJcbiAgICAgIF0pLFxyXG4gICAgXSlcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTdGFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICAvKipcclxuICAgKiBPYmplY3Qgd2l0aCBzZXR0aW5ncyB3aGljaCBtYWtlIGNhcm91c2VsIGRyYWdnYWJsZSBieSB0b3VjaCBvciBtb3VzZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG93bERyYWdnYWJsZToge1xyXG4gICAgaXNNb3VzZURyYWdhYmxlOiBib29sZWFuLFxyXG4gICAgaXNUb3VjaERyYWdhYmxlOiBib29sZWFuXHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogRGF0YSBvZiBvd2wtc3RhZ2VcclxuICAgKi9cclxuICBASW5wdXQoKSBzdGFnZURhdGE6IFN0YWdlRGF0YTtcclxuXHJcblx0LyoqXHJcblx0ICogIERhdGEgb2YgZXZlcnkgc2xpZGVcclxuXHQgKi9cclxuICBASW5wdXQoKSBzbGlkZXNEYXRhOiBTbGlkZU1vZGVsW107XHJcblxyXG4gIC8qKlxyXG4gICAqIEZ1bmN0aW9uIHdpY2ggd2lsbCBiZSByZXR1cm5lZCBhZnRlciBhdHRhY2hpbmcgbGlzdGVuZXIgdG8gJ21vdXNlbW92ZScgZXZlbnRcclxuICAgKi9cclxuICBsaXN0ZW5lck1vdXNlTW92ZTogKCkgPT4gdm9pZDtcclxuICAvKipcclxuICAgKiBGdW5jdGlvbiB3aWNoIHdpbGwgYmUgcmV0dXJuZWQgYWZ0ZXIgYXR0YWNoaW5nIGxpc3RlbmVyIHRvICd0b3VjaG1vdmUnIGV2ZW50XHJcbiAgICovXHJcbiAgbGlzdGVuZXJUb3VjaE1vdmU6ICgpID0+IHZvaWQ7XHJcbiAgLyoqXHJcbiAgICogRnVuY3Rpb24gd2ljaCB3aWxsIGJlIHJldHVybmVkIGFmdGVyIGF0dGFjaGluZyBsaXN0ZW5lciB0byAnbW91c2Vtb3ZlJyBldmVudFxyXG4gICAqL1xyXG4gIGxpc3RlbmVyT25lTW91c2VNb3ZlOiAoKSA9PiB2b2lkO1xyXG4gIC8qKlxyXG4gICAqIEZ1bmN0aW9uIHdpY2ggd2lsbCBiZSByZXR1cm5lZCBhZnRlciBhdHRhY2hpbmcgbGlzdGVuZXIgdG8gJ3RvdWNobW92ZScgZXZlbnRcclxuICAgKi9cclxuICBsaXN0ZW5lck9uZVRvdWNoTW92ZTogKCkgPT4gdm9pZDtcclxuXHJcbiAgLyoqXHJcbiAgICogRnVuY3Rpb24gd2ljaCB3aWxsIGJlIHJldHVybmVkIGFmdGVyIGF0dGFjaGluZyBsaXN0ZW5lciB0byAnbW91c2V1cCcgZXZlbnRcclxuICAgKi9cclxuICBsaXN0ZW5lck1vdXNlVXA6ICgpID0+IHZvaWQ7XHJcbiAgLyoqXHJcbiAgICogRnVuY3Rpb24gd2ljaCB3aWxsIGJlIHJldHVybmVkIGFmdGVyIGF0dGFjaGluZyBsaXN0ZW5lciB0byAndG91Y2hlbmQnIGV2ZW50XHJcbiAgICovXHJcbiAgbGlzdGVuZXJUb3VjaEVuZDogKCkgPT4gdm9pZDtcclxuXHJcbiAgLyoqXHJcbiAgICogRnVuY3Rpb24gd2ljaCB3aWxsIGJlIHJldHVybmVkIGFmdGVyIGF0dGFjaGluZyBsaXN0ZW5lciB0byAnY2xpY2snIGV2ZW50XHJcbiAgICovXHJcbiAgbGlzdGVuZXJPbmVDbGljazogKCkgPT4gdm9pZDtcclxuXHJcbiAgbGlzdGVuZXJBVGFnOiAoKSA9PiB2b2lkO1xyXG5cclxuICAvKipcclxuICAgKiBPYmplY3Qgd2l0aCBkYXRhIG5lZWRlZCBmb3IgZHJhZ2dpbmdcclxuICAgKi9cclxuICBwcml2YXRlIF9kcmFnOiBhbnkgPSB7XHJcbiAgICB0aW1lOiBudWxsLFxyXG4gICAgdGFyZ2V0OiBudWxsLFxyXG4gICAgcG9pbnRlcjogbnVsbCxcclxuICAgIHN0YWdlOiB7XHJcbiAgICAgIHN0YXJ0OiBudWxsLFxyXG4gICAgICBjdXJyZW50OiBudWxsXHJcbiAgICB9LFxyXG4gICAgZGlyZWN0aW9uOiBudWxsLFxyXG4gICAgYWN0aXZlOiBmYWxzZSxcclxuICAgIG1vdmluZzogZmFsc2VcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gd2hlbiB0aGUgY2Fyb3VzZWwncyByZWJ1aWxkaW5nIGNhdXNlZCBieSByZXNpemUgZXZlbnQgc3RhcnRzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfb25lRHJhZ01vdmUkID0gbmV3IFN1YmplY3Q8YW55PigpO1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3RpcHRpb24gdG8gX29uZURyYWdNb3ZlJCBTdWJqZWN0XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfb25lTW92ZVN1YnNyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgem9uZTogTmdab25lLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgY2Fyb3VzZWxTZXJ2aWNlOiBDYXJvdXNlbFNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSBhbmltYXRlU2VydmljZTogQW5pbWF0ZVNlcnZpY2UpIHsgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdtb3VzZWRvd24nLCBbJyRldmVudCddKSBvbk1vdXNlRG93bihldmVudCkge1xyXG4gICAgaWYgKHRoaXMub3dsRHJhZ2dhYmxlLmlzTW91c2VEcmFnYWJsZSkge1xyXG4gICAgICB0aGlzLl9vbkRyYWdTdGFydChldmVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgWyckZXZlbnQnXSkgb25Ub3VjaFN0YXJ0KGV2ZW50KSB7XHJcbiAgICBpZiAodGhpcy5vd2xEcmFnZ2FibGUuaXNUb3VjaERyYWdhYmxlKSB7XHJcbiAgICAgIHRoaXMuX29uRHJhZ1N0YXJ0KGV2ZW50KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ3RvdWNoY2FuY2VsJywgWyckZXZlbnQnXSkgb25Ub3VjaENhbmNlbChldmVudCkge1xyXG4gICAgdGhpcy5fb25EcmFnRW5kKGV2ZW50KTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdzdGFydCcpIG9uRHJhZ1N0YXJ0KCkge1xyXG4gICAgaWYgKHRoaXMub3dsRHJhZ2dhYmxlLmlzTW91c2VEcmFnYWJsZSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdzZWxlY3RzdGFydCcpIG9uU2VsZWN0U3RhcnQoKSB7XHJcbiAgICBpZiAodGhpcy5vd2xEcmFnZ2FibGUuaXNNb3VzZURyYWdhYmxlKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5fb25lTW92ZVN1YnNyaXB0aW9uID0gdGhpcy5fb25lRHJhZ01vdmUkXHJcbiAgICAgIC5waXBlKGZpcnN0KCkpXHJcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuX3NlbmRDaGFuZ2VzKCk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLl9vbmVNb3ZlU3Vic3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFBhc3NlcyB0aGlzIHRvIF9vbmVNb3VzZVRvdWNoTW92ZSgpO1xyXG4gICAqL1xyXG4gIGJpbmRPbmVNb3VzZVRvdWNoTW92ZSA9IChldikgPT4ge1xyXG4gICAgdGhpcy5fb25lTW91c2VUb3VjaE1vdmUoZXYpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUGFzc2VzIHRoaXMgdG8gX29uRHJhZ01vdmUoKTtcclxuICAgKi9cclxuICBiaW5kT25EcmFnTW92ZSA9IChldikgPT4ge1xyXG4gICAgdGhpcy5fb25EcmFnTW92ZShldik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQYXNzZXMgdGhpcyB0byBfb25EcmFnTW92ZSgpO1xyXG4gICAqL1xyXG4gIGJpbmRPbkRyYWdFbmQgPSAoZXYpID0+IHtcclxuICAgIC8vIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICB0aGlzLl9vbkRyYWdFbmQoZXYpO1xyXG4gICAgLy8gfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuXHQgKiBIYW5kbGVzIGB0b3VjaHN0YXJ0YCBhbmQgYG1vdXNlZG93bmAgZXZlbnRzLlxyXG5cdCAqIEB0b2RvIEhvcml6b250YWwgc3dpcGUgdGhyZXNob2xkIGFzIG9wdGlvblxyXG5cdCAqIEB0b2RvICMyNjFcclxuXHQgKiBAcGFyYW0gZXZlbnQgLSBUaGUgZXZlbnQgYXJndW1lbnRzLlxyXG5cdCAqL1xyXG5cdHByaXZhdGUgX29uRHJhZ1N0YXJ0KGV2ZW50KTogYW55IHtcclxuXHRcdGxldCBzdGFnZTogQ29vcmRzID0gbnVsbDtcclxuXHJcblx0XHRpZiAoZXZlbnQud2hpY2ggPT09IDMpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YWdlID0gdGhpcy5fcHJlcGFyZURyYWdnaW5nKGV2ZW50KTtcclxuXHJcblx0XHR0aGlzLl9kcmFnLnRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuXHRcdHRoaXMuX2RyYWcudGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xyXG5cdFx0dGhpcy5fZHJhZy5zdGFnZS5zdGFydCA9IHN0YWdlO1xyXG5cdFx0dGhpcy5fZHJhZy5zdGFnZS5jdXJyZW50ID0gc3RhZ2U7XHJcbiAgICB0aGlzLl9kcmFnLnBvaW50ZXIgPSB0aGlzLl9wb2ludGVyKGV2ZW50KTtcclxuICAgIHRoaXMuX2RyYWcuYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLmxpc3RlbmVyTW91c2VVcCA9IHRoaXMucmVuZGVyZXIubGlzdGVuKGRvY3VtZW50LCAnbW91c2V1cCcsIHRoaXMuYmluZE9uRHJhZ0VuZCk7XHJcbiAgICB0aGlzLmxpc3RlbmVyVG91Y2hFbmQgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbihkb2N1bWVudCwgJ3RvdWNoZW5kJywgdGhpcy5iaW5kT25EcmFnRW5kKTtcclxuXHJcbiAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICB0aGlzLmxpc3RlbmVyT25lTW91c2VNb3ZlID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oZG9jdW1lbnQsICdtb3VzZW1vdmUnLCB0aGlzLmJpbmRPbmVNb3VzZVRvdWNoTW92ZSk7XHJcbiAgICAgIHRoaXMubGlzdGVuZXJPbmVUb3VjaE1vdmUgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbihkb2N1bWVudCwgJ3RvdWNobW92ZScsIHRoaXMuYmluZE9uZU1vdXNlVG91Y2hNb3ZlKTtcclxuICAgIH0pO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEF0dGFjaGVzIGxpc3RlbmVycyB0byBgdG91Y2htb3ZlYCBhbmQgYG1vdXNlbW92ZWAgZXZlbnRzOyBpbml0aWF0ZXMgdXBkYXRpbmcgY2Fyb3VzZWwgYWZ0ZXIgc3RhcnRpbmcgZHJhZ2dpbmdcclxuICAgKiBAcGFyYW0gZXZlbnQgZXZlbnQgb2JqZWNoIG9mIG1vdXNlIG9yIHRvdWNoIGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfb25lTW91c2VUb3VjaE1vdmUoZXZlbnQpIHtcclxuICAgIGlmICghdGhpcy5fZHJhZy5hY3RpdmUpIHJldHVybiBmYWxzZTtcclxuICAgIGNvbnN0IGRlbHRhID0gdGhpcy5fZGlmZmVyZW5jZSh0aGlzLl9kcmFnLnBvaW50ZXIsIHRoaXMuX3BvaW50ZXIoZXZlbnQpKTtcclxuICAgIGlmICh0aGlzLmxpc3RlbmVyQVRhZykge1xyXG4gICAgICB0aGlzLmxpc3RlbmVyQVRhZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubGlzdGVuZXJPbmVNb3VzZU1vdmUoKTtcclxuICAgIHRoaXMubGlzdGVuZXJPbmVUb3VjaE1vdmUoKTtcclxuXHJcbiAgICBpZiAoTWF0aC5hYnMoZGVsdGEueCkgPCBNYXRoLmFicyhkZWx0YS55KSAmJiB0aGlzLl9pcygndmFsaWQnKSkge1xyXG4gICAgICB0aGlzLl9kcmFnLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLl9kcmFnLm1vdmluZyA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5ibG9ja0NsaWNrQW5jaG9ySW5EcmFnZ2luZyhldmVudCk7XHJcblxyXG4gICAgdGhpcy5saXN0ZW5lck1vdXNlTW92ZSA9IHRoaXMucmVuZGVyZXIubGlzdGVuKGRvY3VtZW50LCAnbW91c2Vtb3ZlJywgdGhpcy5iaW5kT25EcmFnTW92ZSk7XHJcbiAgICB0aGlzLmxpc3RlbmVyVG91Y2hNb3ZlID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oZG9jdW1lbnQsICd0b3VjaG1vdmUnLCB0aGlzLmJpbmRPbkRyYWdNb3ZlKTtcclxuXHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIHRoaXMuX2VudGVyRHJhZ2dpbmcoKTtcclxuICAgIHRoaXMuX29uZURyYWdNb3ZlJC5uZXh0KGV2ZW50KTtcclxuICAgIC8vIHRoaXMuX3NlbmRDaGFuZ2VzKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBdHRhY2hlcyBoYW5kbGVyIHRvIEhUTUxBbmNob3JFbGVtZW50IGZvciBwcmV2ZW50aW5nIGNsaWNrIHdoaWxlIGNhcm91c2VsIGlzIGJlaW5nIGRyYWdnZWRcclxuICAgKiBAcGFyYW0gZXZlbnQgZXZlbnQgb2JqZWN0XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBibG9ja0NsaWNrQW5jaG9ySW5EcmFnZ2luZyhldmVudDogYW55KSB7XHJcbiAgICBsZXQgdGFyZ2V0OiBIVE1MRWxlbWVudCB8IG51bGwgPSBldmVudC50YXJnZXQ7XHJcbiAgICB3aGlsZSAodGFyZ2V0ICYmICEodGFyZ2V0IGluc3RhbmNlb2YgSFRNTEFuY2hvckVsZW1lbnQpKSB7XHJcbiAgICAgIHRhcmdldCA9IHRhcmdldC5wYXJlbnRFbGVtZW50O1xyXG4gICAgfVxyXG4gICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIEhUTUxBbmNob3JFbGVtZW50KSB7XHJcbiAgICAgIHRoaXMubGlzdGVuZXJBVGFnID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odGFyZ2V0LCAnY2xpY2snLCAoKSA9PiBmYWxzZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBcdC8qKlxyXG5cdCAqIEhhbmRsZXMgdGhlIGB0b3VjaG1vdmVgIGFuZCBgbW91c2Vtb3ZlYCBldmVudHMuXHJcblx0ICogQHRvZG8gIzI2MVxyXG5cdCAqIEBwYXJhbSBldmVudCAtIFRoZSBldmVudCBhcmd1bWVudHMuXHJcblx0ICovXHJcblx0cHJpdmF0ZSBfb25EcmFnTW92ZShldmVudCkge1xyXG4gICAgaWYgKCF0aGlzLl9kcmFnLmFjdGl2ZSkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgIGxldCBzdGFnZTogQ29vcmRzO1xyXG4gICAgY29uc3Qgc3RhZ2VPckV4aXQ6IGJvb2xlYW4gfCBDb29yZHMgPSB0aGlzLmNhcm91c2VsU2VydmljZS5kZWZpbmVOZXdDb29yZHNEcmFnKGV2ZW50LCB0aGlzLl9kcmFnKTtcclxuXHJcbiAgICBpZiAoc3RhZ2VPckV4aXQgPT09IGZhbHNlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHN0YWdlID0gc3RhZ2VPckV4aXQgYXMgQ29vcmRzO1xyXG5cclxuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgdGhpcy5fZHJhZy5zdGFnZS5jdXJyZW50ID0gc3RhZ2U7XHJcblx0XHR0aGlzLl9hbmltYXRlKHN0YWdlLnggLSB0aGlzLl9kcmFnLnN0YWdlLnN0YXJ0LngpO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIE1vdmVzIC5vd2wtc3RhZ2UgbGVmdC1yaWdodFxyXG4gICAqIEBwYXJhbSBjb29yZGluYXRlIGNvb3JkaW5hdGUgdG8gYmUgc2V0IHRvIC5vd2wtc3RhZ2VcclxuICAgKi9cclxuICBwcml2YXRlIF9hbmltYXRlKGNvb3JkaW5hdGU6IG51bWJlcikge1xyXG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0sICd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlM2QoJHtjb29yZGluYXRlfXB4LDBweCwwcHhgKTtcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdLCAndHJhbnNpdGlvbicsICcwcycpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcblx0ICogSGFuZGxlcyB0aGUgYHRvdWNoZW5kYCBhbmQgYG1vdXNldXBgIGV2ZW50cy5cclxuXHQgKiBAdG9kbyAjMjYxXHJcblx0ICogQHRvZG8gVGhyZXNob2xkIGZvciBjbGljayBldmVudFxyXG5cdCAqIEBwYXJhbSBldmVudCAtIFRoZSBldmVudCBhcmd1bWVudHMuXHJcblx0ICovXHJcblx0cHJpdmF0ZSBfb25EcmFnRW5kKGV2ZW50KSB7XHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5vd2xET01EYXRhLmlzR3JhYiA9IGZhbHNlO1xyXG5cclxuICAgIGlmICh0aGlzLl9kcmFnLm1vdmluZykge1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXSwgJ3RyYW5zZm9ybScsIGBgKTtcclxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0sICd0cmFuc2l0aW9uJywgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc3BlZWQoK3RoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmRyYWdFbmRTcGVlZCB8fCB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5zbWFydFNwZWVkKS8xMDAwICsncycpO1xyXG5cclxuICAgICAgdGhpcy5fZmluaXNoRHJhZ2dpbmcoZXZlbnQpO1xyXG4gICAgICB0aGlzLmxpc3RlbmVyTW91c2VNb3ZlKCk7XHJcbiAgICAgIHRoaXMubGlzdGVuZXJUb3VjaE1vdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9kcmFnID0ge1xyXG4gICAgICB0aW1lOiBudWxsLFxyXG4gICAgICB0YXJnZXQ6IG51bGwsXHJcbiAgICAgIHBvaW50ZXI6IG51bGwsXHJcbiAgICAgIHN0YWdlOiB7XHJcbiAgICAgICAgc3RhcnQ6IG51bGwsXHJcbiAgICAgICAgY3VycmVudDogbnVsbFxyXG4gICAgICB9LFxyXG4gICAgICBkaXJlY3Rpb246IG51bGwsXHJcbiAgICAgIGFjdGl2ZTogZmFsc2UsXHJcbiAgICAgIG1vdmluZzogZmFsc2VcclxuICAgIH07XHJcblxyXG4gICAgLy8gdGhpcy5jYXJvdXNlbFNlcnZpY2UudHJpZ2dlcignZHJhZ2dlZCcpO1xyXG4gICAgdGhpcy5saXN0ZW5lck1vdXNlVXAoKTtcclxuICAgIHRoaXMubGlzdGVuZXJUb3VjaEVuZCgpO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG5cdCAqIFByZXBhcmVzIGRhdGEgZm9yIGRyYWdnaW5nIGNhcm91c2VsLiBJdCBzdGFydHMgYWZ0ZXIgZmlyaW5nIGB0b3VjaHN0YXJ0YCBhbmQgYG1vdXNlZG93bmAgZXZlbnRzLlxyXG5cdCAqIEBwYXJhbSBldmVudCAtIFRoZSBldmVudCBhcmd1bWVudHMuXHJcblx0ICogQHJldHVybnMgc3RhZ2UgLSBvYmplY3Qgd2l0aCAneCcgYW5kICd5JyBjb29yZGluYXRlcyBvZiAub3dsLXN0YWdlXHJcblx0ICovXHJcbiAgcHJpdmF0ZSBfcHJlcGFyZURyYWdnaW5nKGV2ZW50OiBhbnkpOiBDb29yZHMge1xyXG4gICAgcmV0dXJuIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnByZXBhcmVEcmFnZ2luZyhldmVudCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBdHRhY2hlcyBoYW5kbGVyIGZvciAnY2xpY2snIGV2ZW50IG9uIGFueSBlbGVtZW50IGluIC5vd2wtc3RhZ2UgaW4gb3JkZXIgdG8gcHJldmVudCBkcmFnZ2luZyB3aGVuIG1vdmluZyBvZiBjdXJzb3IgaXMgbGVzcyB0aGFuIDNweFxyXG4gICAqL1xyXG4gIHByaXZhdGUgX29uZUNsaWNrSGFuZGxlciA9ICgpID0+IHtcclxuICAgIHRoaXMubGlzdGVuZXJPbmVDbGljayA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuX2RyYWcudGFyZ2V0LCAnY2xpY2snLCAoKSA9PiBmYWxzZSlcclxuICAgIHRoaXMubGlzdGVuZXJPbmVDbGljaygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRmluaXNoZXMgZHJhZ2dpbmdcclxuICAgKiBAcGFyYW0gZXZlbnQgb2JqZWN0IGV2ZW50IG9mICdtb3VzZVVwJyBvZiAndG91Y2hlbmQnIGV2ZW50c1xyXG4gICAqL1xyXG4gIHByaXZhdGUgX2ZpbmlzaERyYWdnaW5nKGV2ZW50OiBhbnkpIHtcclxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmZpbmlzaERyYWdnaW5nKGV2ZW50LCB0aGlzLl9kcmFnLCB0aGlzLl9vbmVDbGlja0hhbmRsZXIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcblx0ICogR2V0cyB1bmlmaWVkIHBvaW50ZXIgY29vcmRpbmF0ZXMgZnJvbSBldmVudC5cclxuXHQgKiBAcGFyYW0gZXZlbnQgVGhlIGBtb3VzZWRvd25gIG9yIGB0b3VjaHN0YXJ0YCBldmVudC5cclxuXHQgKiBAcmV0dXJucyBDb250YWlucyBgeGAgYW5kIGB5YCBjb29yZGluYXRlcyBvZiBjdXJyZW50IHBvaW50ZXIgcG9zaXRpb24uXHJcblx0ICovXHJcbiAgcHJpdmF0ZSBfcG9pbnRlcihldmVudDogYW55KTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLmNhcm91c2VsU2VydmljZS5wb2ludGVyKGV2ZW50KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEdldHMgdGhlIGRpZmZlcmVuY2Ugb2YgdHdvIHZlY3RvcnMuXHJcblx0ICogQHBhcmFtIGZpcnN0IFRoZSBmaXJzdCB2ZWN0b3IuXHJcblx0ICogQHBhcmFtIHNlY29uZC0gVGhlIHNlY29uZCB2ZWN0b3IuXHJcblx0ICogQHJldHVybnMgVGhlIGRpZmZlcmVuY2UuXHJcblx0ICovXHJcbiAgcHJpdmF0ZSBfZGlmZmVyZW5jZShmaXJzdEM6IENvb3Jkcywgc2Vjb25kOiBDb29yZHMpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmRpZmZlcmVuY2UoZmlyc3RDLCBzZWNvbmQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcblx0ICogQ2hlY2tzIHdoZXRoZXIgdGhlIGNhcm91c2VsIGlzIGluIGEgc3BlY2lmaWMgc3RhdGUgb3Igbm90LlxyXG5cdCAqIEBwYXJhbSBzcGVjaWZpY1N0YXRlIFRoZSBzdGF0ZSB0byBjaGVjay5cclxuXHQgKiBAcmV0dXJucyBUaGUgZmxhZyB3aGljaCBpbmRpY2F0ZXMgaWYgdGhlIGNhcm91c2VsIGlzIGJ1c3kuXHJcblx0ICovXHJcbiAgcHJpdmF0ZSBfaXMoc3BlY2lmaWNTdGF0ZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5jYXJvdXNlbFNlcnZpY2UuaXMoc3BlY2lmaWNTdGF0ZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIEVudGVycyBhIHN0YXRlLlxyXG4gICogQHBhcmFtIG5hbWUgVGhlIHN0YXRlIG5hbWUuXHJcbiAgKi9cclxuICBwcml2YXRlIF9lbnRlcihuYW1lOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmVudGVyKG5hbWUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcblx0ICogU2VuZHMgYWxsIGRhdGEgbmVlZGVkIGZvciBWaWV3LlxyXG5cdCAqL1xyXG4gIHByaXZhdGUgX3NlbmRDaGFuZ2VzKCkge1xyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2VuZENoYW5nZXMoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhbmRsZXIgZm9yIHRyYW5zaXRpb2VuZCBldmVudFxyXG4gICAqL1xyXG4gIG9uVHJhbnNpdGlvbkVuZCgpIHtcclxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm9uVHJhbnNpdGlvbkVuZCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcblx0ICogRW50ZXJzIGludG8gYSAnZHJhZ2dpbmcnIHN0YXRlXHJcblx0ICovXHJcbiAgcHJpdmF0ZSBfZW50ZXJEcmFnZ2luZygpIHtcclxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmVudGVyRHJhZ2dpbmcoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhbmRsZXMgdGhlIGVuZCBvZiAnYW5pbWF0aW9uZW5kJyBldmVudFxyXG4gICAqIEBwYXJhbSBpZCBJZCBvZiBzbGlkZXNcclxuICAgKi9cclxuICBjbGVhcihpZCkge1xyXG4gICAgdGhpcy5hbmltYXRlU2VydmljZS5jbGVhcihpZCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7TG9jYXRpb25TdHJhdGVneX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtBdHRyaWJ1dGUsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdEJpbmRpbmcsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBSZW5kZXJlcjIsIGlzRGV2TW9kZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7TmF2aWdhdGlvbkVuZCwgUm91dGVyRXZlbnQsIFJvdXRlciwgQWN0aXZhdGVkUm91dGUsIFVybFRyZWV9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG5leHBvcnQgdHlwZSBRdWVyeVBhcmFtc0hhbmRsaW5nID0gJ21lcmdlJyB8ICdwcmVzZXJ2ZScgfCAnJztcclxuXHJcbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnOm5vdChhKVtvd2xSb3V0ZXJMaW5rXSd9KVxyXG5leHBvcnQgY2xhc3MgT3dsUm91dGVyTGlua0RpcmVjdGl2ZSB7XHJcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXHJcbiAgQElucHV0KCkgcXVlcnlQYXJhbXMgIToge1trOiBzdHJpbmddOiBhbnl9O1xyXG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxyXG4gIEBJbnB1dCgpIGZyYWdtZW50ICE6IHN0cmluZztcclxuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cclxuICBASW5wdXQoKSBxdWVyeVBhcmFtc0hhbmRsaW5nICE6IFF1ZXJ5UGFyYW1zSGFuZGxpbmc7XHJcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXHJcbiAgQElucHV0KCkgcHJlc2VydmVGcmFnbWVudCAhOiBib29sZWFuO1xyXG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxyXG4gIEBJbnB1dCgpIHNraXBMb2NhdGlvbkNoYW5nZSAhOiBib29sZWFuO1xyXG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxyXG4gIEBJbnB1dCgpIHJlcGxhY2VVcmwgITogYm9vbGVhbjtcclxuXHJcbiAgQElucHV0KCkgc3RvcExpbmsgPSBmYWxzZTtcclxuICBwcml2YXRlIGNvbW1hbmRzOiBhbnlbXSA9IFtdO1xyXG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxyXG4gIHByaXZhdGUgcHJlc2VydmUgITogYm9vbGVhbjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG4gICAgICBAQXR0cmlidXRlKCd0YWJpbmRleCcpIHRhYkluZGV4OiBzdHJpbmcsIHJlbmRlcmVyOiBSZW5kZXJlcjIsIGVsOiBFbGVtZW50UmVmKSB7XHJcbiAgICBpZiAodGFiSW5kZXggPT0gbnVsbCkge1xyXG4gICAgICByZW5kZXJlci5zZXRBdHRyaWJ1dGUoZWwubmF0aXZlRWxlbWVudCwgJ3RhYmluZGV4JywgJzAnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IG93bFJvdXRlckxpbmsoY29tbWFuZHM6IGFueVtdfHN0cmluZykge1xyXG4gICAgaWYgKGNvbW1hbmRzICE9IG51bGwpIHtcclxuICAgICAgdGhpcy5jb21tYW5kcyA9IEFycmF5LmlzQXJyYXkoY29tbWFuZHMpID8gY29tbWFuZHMgOiBbY29tbWFuZHNdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jb21tYW5kcyA9IFtdO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGRlcHJlY2F0ZWQgNC4wLjAgdXNlIGBxdWVyeVBhcmFtc0hhbmRsaW5nYCBpbnN0ZWFkLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IHByZXNlcnZlUXVlcnlQYXJhbXModmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIGlmIChpc0Rldk1vZGUoKSAmJiA8YW55PmNvbnNvbGUgJiYgPGFueT5jb25zb2xlLndhcm4pIHtcclxuICAgICAgY29uc29sZS53YXJuKCdwcmVzZXJ2ZVF1ZXJ5UGFyYW1zIGlzIGRlcHJlY2F0ZWQhLCB1c2UgcXVlcnlQYXJhbXNIYW5kbGluZyBpbnN0ZWFkLicpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5wcmVzZXJ2ZSA9IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxyXG4gIG9uQ2xpY2soKTogYm9vbGVhbiB7XHJcbiAgICBjb25zdCBleHRyYXMgPSB7XHJcbiAgICAgIHNraXBMb2NhdGlvbkNoYW5nZTogYXR0ckJvb2xWYWx1ZSh0aGlzLnNraXBMb2NhdGlvbkNoYW5nZSksXHJcbiAgICAgIHJlcGxhY2VVcmw6IGF0dHJCb29sVmFsdWUodGhpcy5yZXBsYWNlVXJsKSxcclxuICAgIH07XHJcbiAgICBpZiAodGhpcy5zdG9wTGluaykge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKHRoaXMudXJsVHJlZSwgZXh0cmFzKTtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHVybFRyZWUoKTogVXJsVHJlZSB7XHJcbiAgICByZXR1cm4gdGhpcy5yb3V0ZXIuY3JlYXRlVXJsVHJlZSh0aGlzLmNvbW1hbmRzLCB7XHJcbiAgICAgIHJlbGF0aXZlVG86IHRoaXMucm91dGUsXHJcbiAgICAgIHF1ZXJ5UGFyYW1zOiB0aGlzLnF1ZXJ5UGFyYW1zLFxyXG4gICAgICBmcmFnbWVudDogdGhpcy5mcmFnbWVudCxcclxuICAgICAgcHJlc2VydmVRdWVyeVBhcmFtczogYXR0ckJvb2xWYWx1ZSh0aGlzLnByZXNlcnZlKSxcclxuICAgICAgcXVlcnlQYXJhbXNIYW5kbGluZzogdGhpcy5xdWVyeVBhcmFtc0hhbmRsaW5nLFxyXG4gICAgICBwcmVzZXJ2ZUZyYWdtZW50OiBhdHRyQm9vbFZhbHVlKHRoaXMucHJlc2VydmVGcmFnbWVudCksXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAZGVzY3JpcHRpb25cclxuICpcclxuICogTGV0cyB5b3UgbGluayB0byBzcGVjaWZpYyByb3V0ZXMgaW4geW91ciBhcHAuXHJcbiAqXHJcbiAqIFNlZSBgUm91dGVyTGlua2AgZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBuZ01vZHVsZSBSb3V0ZXJNb2R1bGVcclxuICpcclxuICogQHB1YmxpY0FwaVxyXG4gKi9cclxuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICdhW293bFJvdXRlckxpbmtdJ30pXHJcbmV4cG9ydCBjbGFzcyBPd2xSb3V0ZXJMaW5rV2l0aEhyZWZEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XHJcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXHJcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnRhcmdldCcpIEBJbnB1dCgpIHRhcmdldCAhOiBzdHJpbmc7XHJcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXHJcbiAgQElucHV0KCkgcXVlcnlQYXJhbXMgIToge1trOiBzdHJpbmddOiBhbnl9O1xyXG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxyXG4gIEBJbnB1dCgpIGZyYWdtZW50ICE6IHN0cmluZztcclxuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cclxuICBASW5wdXQoKSBxdWVyeVBhcmFtc0hhbmRsaW5nICE6IFF1ZXJ5UGFyYW1zSGFuZGxpbmc7XHJcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXHJcbiAgQElucHV0KCkgcHJlc2VydmVGcmFnbWVudCAhOiBib29sZWFuO1xyXG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxyXG4gIEBJbnB1dCgpIHNraXBMb2NhdGlvbkNoYW5nZSAhOiBib29sZWFuO1xyXG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxyXG4gIEBJbnB1dCgpIHJlcGxhY2VVcmwgITogYm9vbGVhbjtcclxuICBASW5wdXQoKSBzdG9wTGluayA9IGZhbHNlO1xyXG5cclxuICBwcml2YXRlIGNvbW1hbmRzOiBhbnlbXSA9IFtdO1xyXG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXHJcbiAgcHJpdmF0ZSBwcmVzZXJ2ZSAhOiBib29sZWFuO1xyXG5cclxuICAvLyB0aGUgdXJsIGRpc3BsYXllZCBvbiB0aGUgYW5jaG9yIGVsZW1lbnQuXHJcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXHJcbiAgQEhvc3RCaW5kaW5nKCkgaHJlZiAhOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgICAgcHJpdmF0ZSBsb2NhdGlvblN0cmF0ZWd5OiBMb2NhdGlvblN0cmF0ZWd5KSB7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHJvdXRlci5ldmVudHMuc3Vic2NyaWJlKChzOiBSb3V0ZXJFdmVudCkgPT4ge1xyXG4gICAgICBpZiAocyBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZVRhcmdldFVybEFuZEhyZWYoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCBvd2xSb3V0ZXJMaW5rKGNvbW1hbmRzOiBhbnlbXXxzdHJpbmcpIHtcclxuICAgIGlmIChjb21tYW5kcyAhPSBudWxsKSB7XHJcbiAgICAgIHRoaXMuY29tbWFuZHMgPSBBcnJheS5pc0FycmF5KGNvbW1hbmRzKSA/IGNvbW1hbmRzIDogW2NvbW1hbmRzXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY29tbWFuZHMgPSBbXTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IHByZXNlcnZlUXVlcnlQYXJhbXModmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIGlmIChpc0Rldk1vZGUoKSAmJiA8YW55PmNvbnNvbGUgJiYgPGFueT5jb25zb2xlLndhcm4pIHtcclxuICAgICAgY29uc29sZS53YXJuKCdwcmVzZXJ2ZVF1ZXJ5UGFyYW1zIGlzIGRlcHJlY2F0ZWQsIHVzZSBxdWVyeVBhcmFtc0hhbmRsaW5nIGluc3RlYWQuJyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnByZXNlcnZlID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7fSk6IGFueSB7IHRoaXMudXBkYXRlVGFyZ2V0VXJsQW5kSHJlZigpOyB9XHJcbiAgbmdPbkRlc3Ryb3koKTogYW55IHsgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTsgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50LmJ1dHRvbicsICckZXZlbnQuY3RybEtleScsICckZXZlbnQubWV0YUtleScsICckZXZlbnQuc2hpZnRLZXknXSlcclxuICBvbkNsaWNrKGJ1dHRvbjogbnVtYmVyLCBjdHJsS2V5OiBib29sZWFuLCBtZXRhS2V5OiBib29sZWFuLCBzaGlmdEtleTogYm9vbGVhbik6IGJvb2xlYW4ge1xyXG4gICAgaWYgKGJ1dHRvbiAhPT0gMCB8fCBjdHJsS2V5IHx8IG1ldGFLZXkgfHwgc2hpZnRLZXkpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHR5cGVvZiB0aGlzLnRhcmdldCA9PT0gJ3N0cmluZycgJiYgdGhpcy50YXJnZXQgIT09ICdfc2VsZicpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuc3RvcExpbmspIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGV4dHJhcyA9IHtcclxuICAgICAgc2tpcExvY2F0aW9uQ2hhbmdlOiBhdHRyQm9vbFZhbHVlKHRoaXMuc2tpcExvY2F0aW9uQ2hhbmdlKSxcclxuICAgICAgcmVwbGFjZVVybDogYXR0ckJvb2xWYWx1ZSh0aGlzLnJlcGxhY2VVcmwpLFxyXG4gICAgfTtcclxuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlQnlVcmwodGhpcy51cmxUcmVlLCBleHRyYXMpO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB1cGRhdGVUYXJnZXRVcmxBbmRIcmVmKCk6IHZvaWQge1xyXG4gICAgdGhpcy5ocmVmID0gdGhpcy5sb2NhdGlvblN0cmF0ZWd5LnByZXBhcmVFeHRlcm5hbFVybCh0aGlzLnJvdXRlci5zZXJpYWxpemVVcmwodGhpcy51cmxUcmVlKSk7XHJcbiAgfVxyXG5cclxuICBnZXQgdXJsVHJlZSgpOiBVcmxUcmVlIHtcclxuICAgIHJldHVybiB0aGlzLnJvdXRlci5jcmVhdGVVcmxUcmVlKHRoaXMuY29tbWFuZHMsIHtcclxuICAgICAgcmVsYXRpdmVUbzogdGhpcy5yb3V0ZSxcclxuICAgICAgcXVlcnlQYXJhbXM6IHRoaXMucXVlcnlQYXJhbXMsXHJcbiAgICAgIGZyYWdtZW50OiB0aGlzLmZyYWdtZW50LFxyXG4gICAgICBwcmVzZXJ2ZVF1ZXJ5UGFyYW1zOiBhdHRyQm9vbFZhbHVlKHRoaXMucHJlc2VydmUpLFxyXG4gICAgICBxdWVyeVBhcmFtc0hhbmRsaW5nOiB0aGlzLnF1ZXJ5UGFyYW1zSGFuZGxpbmcsXHJcbiAgICAgIHByZXNlcnZlRnJhZ21lbnQ6IGF0dHJCb29sVmFsdWUodGhpcy5wcmVzZXJ2ZUZyYWdtZW50KSxcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYXR0ckJvb2xWYWx1ZShzOiBhbnkpOiBib29sZWFuIHtcclxuICByZXR1cm4gcyA9PT0gJycgfHwgISFzO1xyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7XHJcbiAgQ2Fyb3VzZWxDb21wb25lbnQsXHJcbiAgQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZVxyXG59IGZyb20gJy4vY2Fyb3VzZWwuY29tcG9uZW50JztcclxuaW1wb3J0IHsgV0lORE9XX1BST1ZJREVSUyB9IGZyb20gJy4uL3NlcnZpY2VzL3dpbmRvdy1yZWYuc2VydmljZSc7XHJcbmltcG9ydCB7IFJlc2l6ZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9yZXNpemUuc2VydmljZSc7XHJcbmltcG9ydCB7IERPQ1VNRU5UX1BST1ZJREVSUyB9IGZyb20gJy4uL3NlcnZpY2VzL2RvY3VtZW50LXJlZi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3RhZ2VDb21wb25lbnQgfSBmcm9tICcuL3N0YWdlL3N0YWdlLmNvbXBvbmVudCc7XHJcbi8vIGltcG9ydCB7IEJyb3dzZXJBbmltYXRpb25zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcclxuZXhwb3J0IHtcclxuICBDYXJvdXNlbENvbXBvbmVudCxcclxuICBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlLFxyXG4gIFNsaWRlc091dHB1dERhdGFcclxufSBmcm9tICcuL2Nhcm91c2VsLmNvbXBvbmVudCc7XHJcblxyXG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUsIFJvdXRlcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IE93bFJvdXRlckxpbmtEaXJlY3RpdmUsIE93bFJvdXRlckxpbmtXaXRoSHJlZkRpcmVjdGl2ZSB9IGZyb20gJy4vb3dsLXJvdXRlci1saW5rLmRpcmVjdGl2ZSc7XHJcbmV4cG9ydCB7IE93bFJvdXRlckxpbmtEaXJlY3RpdmUsIE93bFJvdXRlckxpbmtXaXRoSHJlZkRpcmVjdGl2ZSB9IGZyb20gJy4vb3dsLXJvdXRlci1saW5rLmRpcmVjdGl2ZSc7XHJcblxyXG5jb25zdCByb3V0ZXM6IFJvdXRlcyA9IFtdO1xyXG5cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgLy8gQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUsIC8vIHRoZXJlJ3MgYW4gaXNzdWUgd2l0aCB0aGlzIGltcG9ydCB3aGlsZSB1c2luZyBsYXp5IGxvYWRpbmcgb2YgbW9kdWxlIGNvbnN1bWluZyB0aGlzIGxpYnJhcnkuIEkgZG9uJ3QgcmVtb3ZlIGl0IGJlY2F1c2UgaXQgY291bGQgYmUgbmVlZGVkIGR1cmluZyBmdXR1cmUgZW5oYW5jZW1lbnQgb2YgdGhpcyBsaWIuXHJcbiAgICBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQocm91dGVzKV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbQ2Fyb3VzZWxDb21wb25lbnQsIENhcm91c2VsU2xpZGVEaXJlY3RpdmUsIFN0YWdlQ29tcG9uZW50LCBPd2xSb3V0ZXJMaW5rRGlyZWN0aXZlLCBPd2xSb3V0ZXJMaW5rV2l0aEhyZWZEaXJlY3RpdmVdLFxyXG4gIGV4cG9ydHM6IFtDYXJvdXNlbENvbXBvbmVudCwgQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZSwgT3dsUm91dGVyTGlua0RpcmVjdGl2ZSwgT3dsUm91dGVyTGlua1dpdGhIcmVmRGlyZWN0aXZlXSxcclxuICBwcm92aWRlcnM6IFtXSU5ET1dfUFJPVklERVJTLCBSZXNpemVTZXJ2aWNlLCBET0NVTUVOVF9QUk9WSURFUlNdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDYXJvdXNlbE1vZHVsZSB7fVxyXG4iXSwibmFtZXMiOlsibWVyZ2UiLCJmaWx0ZXIiLCJhbmltYXRlIiwic3RhdGUiLCJmaXJzdCIsInRzbGliXzEuX19leHRlbmRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7SUF3QkUsdUJBQW9CLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzVDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsWUFBWSxDQUFDLHNCQUFzQixDQUN0QyxRQUFRLEVBQ1IsUUFBUSxFQUNSLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUN6QixDQUFDO1FBQ0YsSUFBSSxDQUFDLFlBQVksQ0FBQyxzQkFBc0IsQ0FDdEMsUUFBUSxFQUNSLFFBQVEsRUFDUixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDekIsQ0FBQztLQUNIO0lBckJELHNCQUFJLG9DQUFTOzs7Ozs7Ozs7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