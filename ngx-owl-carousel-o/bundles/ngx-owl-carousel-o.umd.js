(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/platform-browser'), require('rxjs'), require('@angular/core'), require('rxjs/operators'), require('@angular/common'), require('@angular/router'), require('@angular/animations')) :
    typeof define === 'function' && define.amd ? define('ngx-owl-carousel-o', ['exports', '@angular/platform-browser', 'rxjs', '@angular/core', 'rxjs/operators', '@angular/common', '@angular/router', '@angular/animations'], factory) :
    (factory((global['ngx-owl-carousel-o'] = {}),global.ng.platformBrowser,global.rxjs,global.ng.core,global.rxjs.operators,global.ng.common,global.ng.router,global.ng.animations));
}(this, (function (exports,platformBrowser,rxjs,core,operators,common,router,animations) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var ResizeService = /** @class */ (function () {
        function ResizeService(eventManager) {
            this.eventManager = eventManager;
            this.resizeSubject = new rxjs.Subject();
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
             */ function () {
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
                this.resizeSubject.next(( /** @type {?} */(event.target)));
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
                this.windowWidth = ( /** @type {?} */(event.target));
            };
        ResizeService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        ResizeService.ctorParameters = function () {
            return [
                { type: platformBrowser.EventManager }
            ];
        };
        return ResizeService;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    /**
     * Defaults value of options
     */
    var /**
     * Defaults value of options
     */ OwlCarouselOConfig = /** @class */ (function () {
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
     */ OwlOptionsMockedTypes = /** @class */ (function () {
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
    var OwlLogger = /** @class */ (function () {
        function OwlLogger(errorHandler) {
            this.errorHandler = errorHandler;
        }
        /**
         * @param {?} value
         * @param {...?} rest
         * @return {?}
         */
        OwlLogger.prototype.log = /**
         * @param {?} value
         * @param {...?} rest
         * @return {?}
         */
            function (value) {
                var rest = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    rest[_i - 1] = arguments[_i];
                }
                if (core.isDevMode()) {
                    console.log.apply(console, __spread([value], rest));
                }
            };
        /**
         * @param {?} error
         * @return {?}
         */
        OwlLogger.prototype.error = /**
         * @param {?} error
         * @return {?}
         */
            function (error) {
                this.errorHandler.handleError(error);
            };
        /**
         * @param {?} value
         * @param {...?} rest
         * @return {?}
         */
        OwlLogger.prototype.warn = /**
         * @param {?} value
         * @param {...?} rest
         * @return {?}
         */
            function (value) {
                var rest = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    rest[_i - 1] = arguments[_i];
                }
                console.warn.apply(console, __spread([value], rest));
            };
        OwlLogger.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        OwlLogger.ctorParameters = function () {
            return [
                { type: core.ErrorHandler }
            ];
        };
        return OwlLogger;
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
        function CarouselService(logger) {
            var _this = this;
            this.logger = logger;
            /**
             * Subject for passing data needed for managing View
             */
            this._viewSettingsShipper$ = new rxjs.Subject();
            /**
             * Subject for notification when the carousel got initializes
             */
            this._initializedCarousel$ = new rxjs.Subject();
            /**
             * Subject for notification when the carousel's settings start changinf
             */
            this._changeSettingsCarousel$ = new rxjs.Subject();
            /**
             * Subject for notification when the carousel's settings have changed
             */
            this._changedSettingsCarousel$ = new rxjs.Subject();
            /**
             * Subject for notification when the carousel starts translating or moving
             */
            this._translateCarousel$ = new rxjs.Subject();
            /**
             * Subject for notification when the carousel stopped translating or moving
             */
            this._translatedCarousel$ = new rxjs.Subject();
            /**
             * Subject for notification when the carousel's rebuilding caused by 'resize' event starts
             */
            this._resizeCarousel$ = new rxjs.Subject();
            /**
             * Subject for notification  when the carousel's rebuilding caused by 'resize' event is ended
             */
            this._resizedCarousel$ = new rxjs.Subject();
            /**
             * Subject for notification when the refresh of carousel starts
             */
            this._refreshCarousel$ = new rxjs.Subject();
            /**
             * Subject for notification when the refresh of carousel is ended
             */
            this._refreshedCarousel$ = new rxjs.Subject();
            /**
             * Subject for notification when the dragging of carousel starts
             */
            this._dragCarousel$ = new rxjs.Subject();
            /**
             * Subject for notification when the dragging of carousel is ended
             */
            this._draggedCarousel$ = new rxjs.Subject();
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
                        var merge = null;
                        /** @type {?} */
                        var iterator = _this._items.length;
                        cache.items = {
                            merge: false,
                            width: width
                        };
                        while (iterator--) {
                            merge = _this._mergers[iterator];
                            merge = _this.settings.mergeFit && Math.min(merge, _this.settings.items) || merge;
                            cache.items.merge = merge > 1 || cache.items.merge;
                            widths[iterator] = !grid ? _this._items[iterator].width ? _this._items[iterator].width : width : width * merge;
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
                var _this = this;
                /** @type {?} */
                var checkedOptions = __assign({}, options);
                /** @type {?} */
                var mockedTypes = new OwlOptionsMockedTypes();
                /** @type {?} */
                var setRightOption = function (type, key) {
                    _this.logger.log("options." + key + " must be type of " + type + "; " + key + "=" + options[key] + " skipped to defaults: " + key + "=" + configOptions[key]);
                    return configOptions[key];
                };
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
                    this.logger.log('The option \'items\' in your options is bigger than the number of slides. This option is updated to the current number of slides and the navigation got disabled');
                }
                else {
                    if (items === this._items.length && (this.settings.dots || this.settings.nav)) {
                        this.logger.log('Option \'items\' in your options is equal to the number of slides. So the navigation got disabled');
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
                var filter = function (item) { return _this._invalidated[item]; };
                /** @type {?} */
                var cache = {};
                while (i < n) {
                    /** @type {?} */
                    var filteredPipe = this._pipe[i].filter.filter(filter);
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
                var coordinates = ( /** @type {?} */(this.coordinates()));
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
                var animate = this.speed() > 0;
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
            function (state) {
                return this._states.current[state] && this._states.current[state] > 0;
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
                if (relative === void 0) {
                    relative = false;
                }
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
                if (relative === void 0) {
                    relative = false;
                }
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
                        return ( /** @type {?} */(_this.coordinates(index)));
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
                    this.logger.log('Can not detect viewport width.');
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
                    currentClasses[( /** @type {?} */(this.settings.animateIn))] = slide.isCustomAnimatedIn;
                }
                if (this.settings.animateOut) {
                    currentClasses[( /** @type {?} */(this.settings.animateOut))] = slide.isCustomAnimatedOut;
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
            function (name, data, namespace, state, enter) {
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
            function (first, second) {
                return {
                    x: first.x - second.x,
                    y: first.y - second.y
                };
            };
        CarouselService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        CarouselService.ctorParameters = function () {
            return [
                { type: OwlLogger }
            ];
        };
        return CarouselService;
    }());

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
                var initializedCarousel$ = this.carouselService.getInitializedState().pipe(operators.tap(function (state) {
                    _this.initialize();
                    _this._updateNavPages();
                    _this.draw();
                    _this.update();
                    _this.carouselService.sendChanges();
                }));
                // mostly changes in carouselService and carousel at all causes carouselService.to(). It moves stage right-left by its code and calling needed functions
                // Thus this method by calling carouselService.current(position) notifies about changes
                /** @type {?} */
                var changedSettings$ = this.carouselService.getChangedState().pipe(operators.filter(function (data) { return data.property.name === 'position'; }), operators.tap(function (data) {
                    _this.update();
                    // should be the call of the function written at the end of comment
                    // but the method carouselServive.to() has setTimeout(f, 0) which contains carouselServive.update() which calls sendChanges() method.
                    // carouselService.navData and carouselService.dotsData update earlier than carouselServive.update() gets called
                    // updates of carouselService.navData and carouselService.dotsData are being happening withing carouselService.current(position) method which calls next() of _changedSettingsCarousel$
                    // carouselService.current(position) is being calling earlier than carouselServive.update();
                    // this.carouselService.sendChanges();
                }));
                /** @type {?} */
                var refreshedCarousel$ = this.carouselService.getRefreshedState().pipe(operators.tap(function () {
                    _this._updateNavPages();
                    _this.draw();
                    _this.update();
                    _this.carouselService.sendChanges();
                }));
                /** @type {?} */
                var navMerge$ = rxjs.merge(initializedCarousel$, changedSettings$, refreshedCarousel$);
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
                        j += ( /** @type {?} */(this.carouselService.mergers(this.carouselService.relative(i))));
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
            { type: core.Injectable }
        ];
        /** @nocollapse */
        NavigationService.ctorParameters = function () {
            return [
                { type: CarouselService }
            ];
        };
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
    var WINDOW = new core.InjectionToken('WindowToken');
    /**
     * Define abstract class for obtaining reference to the global window object.
     * @abstract
     */
    var /**
     * Define abstract class for obtaining reference to the global window object.
     * @abstract
     */ WindowRef = /** @class */ (function () {
        function WindowRef() {
        }
        Object.defineProperty(WindowRef.prototype, "nativeWindow", {
            get: /**
             * @return {?}
             */ function () {
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
    var /**
     * Define class that implements the abstract class and returns the native window object.
     */ BrowserWindowRef = /** @class */ (function (_super) {
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
             */ function () {
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
        if (common.isPlatformBrowser(platformId)) {
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
        deps: [WindowRef, core.PLATFORM_ID]
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
    var DOCUMENT = new core.InjectionToken('DocumentToken');
    /**
     * Define abstract class for obtaining reference to the global Document object.
     * @abstract
     */
    var /**
     * Define abstract class for obtaining reference to the global Document object.
     * @abstract
     */ DocumentRef = /** @class */ (function () {
        function DocumentRef() {
        }
        Object.defineProperty(DocumentRef.prototype, "nativeDocument", {
            get: /**
             * @return {?}
             */ function () {
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
    var /**
     * Define class that implements the abstract class and returns the native Document object.
     */ BrowserDocumentRef = /** @class */ (function (_super) {
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
             */ function () {
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
        if (common.isPlatformBrowser(platformId)) {
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
        deps: [DocumentRef, core.PLATFORM_ID]
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
            this.winRef = ( /** @type {?} */(winRef));
            this.docRef = ( /** @type {?} */(docRef));
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
                var initializedCarousel$ = this.carouselService.getInitializedState().pipe(operators.tap(function () {
                    if (_this.carouselService.settings.autoplay) {
                        _this.play();
                    }
                }));
                /** @type {?} */
                var changedSettings$ = this.carouselService.getChangedState().pipe(operators.tap(function (data) {
                    _this._handleChangeObservable(data);
                }));
                // original Autoplay Plugin has listeners on play.owl.core and stop.owl.core events.
                // They are triggered by Video Plugin
                /** @type {?} */
                var autoplayMerge$ = rxjs.merge(initializedCarousel$, changedSettings$);
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
            { type: core.Injectable }
        ];
        /** @nocollapse */
        AutoplayService.ctorParameters = function () {
            return [
                { type: CarouselService },
                { type: undefined, decorators: [{ type: core.Inject, args: [WINDOW,] }] },
                { type: undefined, decorators: [{ type: core.Inject, args: [DOCUMENT,] }] }
            ];
        };
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
                var initializedCarousel$ = this.carouselService.getInitializedState().pipe(operators.tap(function () {
                    /** @type {?} */
                    var isLazyLoad = _this.carouselService.settings && !_this.carouselService.settings.lazyLoad;
                    _this.carouselService.slidesData.forEach(function (item) { return item.load = isLazyLoad ? true : false; });
                }));
                /** @type {?} */
                var changeSettings$ = this.carouselService.getChangeState();
                /** @type {?} */
                var resizedCarousel$ = this.carouselService.getResizedState();
                /** @type {?} */
                var lazyLoadMerge$ = rxjs.merge(initializedCarousel$, changeSettings$, resizedCarousel$).pipe(operators.tap(function (data) { return _this._defineLazyLoadSlides(data); }));
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
            { type: core.Injectable }
        ];
        /** @nocollapse */
        LazyLoadService.ctorParameters = function () {
            return [
                { type: CarouselService }
            ];
        };
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
                var changeSettings$ = this.carouselService.getChangeState().pipe(operators.tap(function (data) {
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
                var dragTranslatedMerge$ = rxjs.merge(dragCarousel$, draggedCarousel$, translatedCarousel$).pipe(operators.tap(function (data) { return _this.swapping = data === 'translated'; }));
                /** @type {?} */
                var translateCarousel$ = this.carouselService.getTranslateState().pipe(operators.tap(function (data) {
                    if (_this.swapping && (_this.carouselService._options.animateOut || _this.carouselService._options.animateIn)) {
                        _this._swap();
                    }
                }));
                /** @type {?} */
                var animateMerge$ = rxjs.merge(changeSettings$, translateCarousel$, dragTranslatedMerge$).pipe();
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
            { type: core.Injectable }
        ];
        /** @nocollapse */
        AnimateService.ctorParameters = function () {
            return [
                { type: CarouselService }
            ];
        };
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
                var initializedCarousel$ = this.carouselService.getInitializedState().pipe(operators.tap(function (data) {
                    if (_this.carouselService.settings.autoHeight) {
                        _this.update();
                    }
                    else {
                        _this.carouselService.slidesData.forEach(function (slide) { return slide.heightState = 'full'; });
                    }
                }));
                /** @type {?} */
                var changedSettings$ = this.carouselService.getChangedState().pipe(operators.tap(function (data) {
                    if (_this.carouselService.settings.autoHeight && data.property.name === 'position') {
                        _this.update();
                    }
                }));
                /** @type {?} */
                var refreshedCarousel$ = this.carouselService.getRefreshedState().pipe(operators.tap(function (data) {
                    if (_this.carouselService.settings.autoHeight) {
                        _this.update();
                    }
                }));
                /** @type {?} */
                var autoHeight$ = rxjs.merge(initializedCarousel$, changedSettings$, refreshedCarousel$);
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
            { type: core.Injectable }
        ];
        /** @nocollapse */
        AutoHeightService.ctorParameters = function () {
            return [
                { type: CarouselService }
            ];
        };
        return AutoHeightService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var HashService = /** @class */ (function () {
        function HashService(carouselService, route, router$$1) {
            this.carouselService = carouselService;
            this.route = route;
            this.router = router$$1;
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
                var initializedCarousel$ = this.carouselService.getInitializedState().pipe(operators.tap(function () { return _this.listenToRoute(); }));
                /** @type {?} */
                var changedSettings$ = this.carouselService.getChangedState().pipe(operators.tap(function (data) {
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
                var hashFragment$ = rxjs.merge(initializedCarousel$, changedSettings$);
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
                this.route.fragment.pipe(operators.skip(count))
                    .subscribe(function (fragment) {
                    _this.currentHashFragment = fragment;
                    _this.rewind(fragment);
                });
            };
        HashService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        HashService.ctorParameters = function () {
            return [
                { type: CarouselService },
                { type: router.ActivatedRoute },
                { type: router.Router }
            ];
        };
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
             */ function () { return this._dataMerge; },
            set: /**
             * @param {?} data
             * @return {?}
             */ function (data) {
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
            { type: core.Directive, args: [{ selector: 'ng-template[carouselSlide]' },] }
        ];
        /** @nocollapse */
        CarouselSlideDirective.ctorParameters = function () {
            return [
                { type: core.TemplateRef }
            ];
        };
        CarouselSlideDirective.propDecorators = {
            id: [{ type: core.Input }],
            dataMerge: [{ type: core.Input }],
            width: [{ type: core.Input }],
            dotContent: [{ type: core.Input }],
            dataHash: [{ type: core.Input }]
        };
        return CarouselSlideDirective;
    }());
    /**
     * Data which will be passed out after ending of transition of carousel
     */
    var /**
     * Data which will be passed out after ending of transition of carousel
     */ SlidesOutputData = /** @class */ (function () {
        function SlidesOutputData() {
        }
        return SlidesOutputData;
    }());
    var CarouselComponent = /** @class */ (function () {
        function CarouselComponent(el, resizeService, carouselService, navigationService, autoplayService, lazyLoadService, animateService, autoHeightService, hashService, logger) {
            this.el = el;
            this.resizeService = resizeService;
            this.carouselService = carouselService;
            this.navigationService = navigationService;
            this.autoplayService = autoplayService;
            this.lazyLoadService = lazyLoadService;
            this.animateService = animateService;
            this.autoHeightService = autoHeightService;
            this.hashService = hashService;
            this.logger = logger;
            this.translated = new core.EventEmitter();
            this.dragging = new core.EventEmitter();
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
                    this.logger.log("There's no slides to show. So carousel didn't get rendered");
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
                this._viewCurSettings$ = this.carouselService.getViewCurSettings().pipe(operators.tap(function (data) {
                    _this.owlDOMData = data.owlDOMData;
                    _this.stageData = data.stageData;
                    _this.slidesData = data.slidesData;
                    if (!_this.carouselLoaded) {
                        _this.carouselLoaded = true;
                    }
                    _this.navData = data.navData;
                    _this.dotsData = data.dotsData;
                }));
                this._translatedCarousel$ = this.carouselService.getTranslatedState().pipe(operators.tap(function () {
                    _this.gatherTranslatedData();
                    _this.translated.emit(_this.slidesOutputData);
                    _this.slidesOutputData = {};
                }));
                this._draggingCarousel$ = this.carouselService.getDragState().pipe(operators.tap(function () {
                    _this.dragging.emit(true);
                }), operators.switchMap(function () {
                    return _this.carouselService.getTranslatedState().pipe(operators.first(), operators.tap(function () {
                        _this.dragging.emit(false);
                    }));
                }));
                this._carouselMerge$ = rxjs.merge(this._viewCurSettings$, this._translatedCarousel$, this._draggingCarousel$);
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
                        .pipe(operators.filter(function () { return _this.carouselWindowWidth !== _this.el.nativeElement.querySelector('.owl-carousel').clientWidth; }), operators.delay(this.carouselService.settings.responsiveRefreshRate))
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
            { type: core.Component, args: [{
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
        CarouselComponent.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: ResizeService },
                { type: CarouselService },
                { type: NavigationService },
                { type: AutoplayService },
                { type: LazyLoadService },
                { type: AnimateService },
                { type: AutoHeightService },
                { type: HashService },
                { type: OwlLogger }
            ];
        };
        CarouselComponent.propDecorators = {
            slides: [{ type: core.ContentChildren, args: [CarouselSlideDirective,] }],
            translated: [{ type: core.Output }],
            dragging: [{ type: core.Output }],
            options: [{ type: core.Input }]
        };
        return CarouselComponent;
    }());

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
            this._oneDragMove$ = new rxjs.Subject();
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
                    .pipe(operators.first())
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
                stage = ( /** @type {?} */(stageOrExit));
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
            { type: core.Component, args: [{
                        selector: 'owl-stage',
                        template: "\n    <div>\n      <div class=\"owl-stage\" [ngStyle]=\"{'width': stageData.width + 'px',\n                                        'transform': stageData.transform,\n                                        'transition': stageData.transition,\n                                        'padding-left': stageData.paddingL + 'px',\n                                        'padding-right': stageData.paddingR + 'px' }\"\n          (transitionend)=\"onTransitionEnd()\">\n        <ng-container *ngFor=\"let slide of slidesData; let i = index\">\n          <div class=\"owl-item\" [ngClass]=\"slide.classes\"\n                                [ngStyle]=\"{'width': slide.width + 'px',\n                                            'margin-left': slide.marginL + 'px',\n                                            'margin-right': slide.marginR + 'px',\n                                            'left': slide.left}\"\n                                (animationend)=\"clear(slide.id)\"\n                                [@autoHeight]=\"slide.heightState\">\n            <ng-template *ngIf=\"slide.load\" [ngTemplateOutlet]=\"slide.tplRef\"></ng-template>\n          </div><!-- /.owl-item -->\n        </ng-container>\n      </div><!-- /.owl-stage -->\n    </div>\n  ",
                        animations: [
                            animations.trigger('autoHeight', [
                                animations.state('nulled', animations.style({ height: 0 })),
                                animations.state('full', animations.style({ height: '*' })),
                                animations.transition('full => nulled', [
                                    // style({height: '*'}),
                                    animations.animate('700ms 350ms')
                                ]),
                                animations.transition('nulled => full', [
                                    // style({height: 0}),
                                    animations.animate(350)
                                ]),
                            ])
                        ]
                    }] }
        ];
        /** @nocollapse */
        StageComponent.ctorParameters = function () {
            return [
                { type: core.NgZone },
                { type: core.ElementRef },
                { type: core.Renderer2 },
                { type: CarouselService },
                { type: AnimateService }
            ];
        };
        StageComponent.propDecorators = {
            owlDraggable: [{ type: core.Input }],
            stageData: [{ type: core.Input }],
            slidesData: [{ type: core.Input }],
            onMouseDown: [{ type: core.HostListener, args: ['mousedown', ['$event'],] }],
            onTouchStart: [{ type: core.HostListener, args: ['touchstart', ['$event'],] }],
            onTouchCancel: [{ type: core.HostListener, args: ['touchcancel', ['$event'],] }],
            onDragStart: [{ type: core.HostListener, args: ['dragstart',] }],
            onSelectStart: [{ type: core.HostListener, args: ['selectstart',] }]
        };
        return StageComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var OwlRouterLinkDirective = /** @class */ (function () {
        function OwlRouterLinkDirective(router$$1, route, tabIndex, renderer, el) {
            this.router = router$$1;
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
             */ function (commands) {
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
             */ function (value) {
                if (core.isDevMode() && ( /** @type {?} */(console)) && ( /** @type {?} */(console.warn))) {
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
             */ function () {
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
            { type: core.Directive, args: [{ selector: ':not(a)[owlRouterLink]' },] }
        ];
        /** @nocollapse */
        OwlRouterLinkDirective.ctorParameters = function () {
            return [
                { type: router.Router },
                { type: router.ActivatedRoute },
                { type: String, decorators: [{ type: core.Attribute, args: ['tabindex',] }] },
                { type: core.Renderer2 },
                { type: core.ElementRef }
            ];
        };
        OwlRouterLinkDirective.propDecorators = {
            queryParams: [{ type: core.Input }],
            fragment: [{ type: core.Input }],
            queryParamsHandling: [{ type: core.Input }],
            preserveFragment: [{ type: core.Input }],
            skipLocationChange: [{ type: core.Input }],
            replaceUrl: [{ type: core.Input }],
            stopLink: [{ type: core.Input }],
            owlRouterLink: [{ type: core.Input }],
            preserveQueryParams: [{ type: core.Input }],
            onClick: [{ type: core.HostListener, args: ['click',] }]
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
        function OwlRouterLinkWithHrefDirective(router$$1, route, locationStrategy) {
            var _this = this;
            this.router = router$$1;
            this.route = route;
            this.locationStrategy = locationStrategy;
            this.stopLink = false;
            this.commands = [];
            this.subscription = router$$1.events.subscribe(function (s) {
                if (s instanceof router.NavigationEnd) {
                    _this.updateTargetUrlAndHref();
                }
            });
        }
        Object.defineProperty(OwlRouterLinkWithHrefDirective.prototype, "owlRouterLink", {
            set: /**
             * @param {?} commands
             * @return {?}
             */ function (commands) {
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
             */ function (value) {
                if (core.isDevMode() && ( /** @type {?} */(console)) && ( /** @type {?} */(console.warn))) {
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
             */ function () {
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
            { type: core.Directive, args: [{ selector: 'a[owlRouterLink]' },] }
        ];
        /** @nocollapse */
        OwlRouterLinkWithHrefDirective.ctorParameters = function () {
            return [
                { type: router.Router },
                { type: router.ActivatedRoute },
                { type: common.LocationStrategy }
            ];
        };
        OwlRouterLinkWithHrefDirective.propDecorators = {
            target: [{ type: core.HostBinding, args: ['attr.target',] }, { type: core.Input }],
            queryParams: [{ type: core.Input }],
            fragment: [{ type: core.Input }],
            queryParamsHandling: [{ type: core.Input }],
            preserveFragment: [{ type: core.Input }],
            skipLocationChange: [{ type: core.Input }],
            replaceUrl: [{ type: core.Input }],
            stopLink: [{ type: core.Input }],
            href: [{ type: core.HostBinding }],
            owlRouterLink: [{ type: core.Input }],
            preserveQueryParams: [{ type: core.Input }],
            onClick: [{ type: core.HostListener, args: ['click', ['$event.button', '$event.ctrlKey', '$event.metaKey', '$event.shiftKey'],] }]
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
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            // BrowserAnimationsModule, // there's an issue with this import while using lazy loading of module consuming this library. I don't remove it because it could be needed during future enhancement of this lib.
                            router.RouterModule.forChild(routes)
                        ],
                        declarations: [CarouselComponent, CarouselSlideDirective, StageComponent, OwlRouterLinkDirective, OwlRouterLinkWithHrefDirective],
                        exports: [CarouselComponent, CarouselSlideDirective, OwlRouterLinkDirective, OwlRouterLinkWithHrefDirective],
                        providers: [WINDOW_PROVIDERS, ResizeService, DOCUMENT_PROVIDERS, OwlLogger]
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

    exports.CarouselModule = CarouselModule;
    exports.CarouselComponent = CarouselComponent;
    exports.CarouselSlideDirective = CarouselSlideDirective;
    exports.SlidesOutputData = SlidesOutputData;
    exports.OwlRouterLinkDirective = OwlRouterLinkDirective;
    exports.OwlRouterLinkWithHrefDirective = OwlRouterLinkWithHrefDirective;
    exports.ɵx = StageComponent;
    exports.ɵt = AnimateService;
    exports.ɵu = AutoHeightService;
    exports.ɵd = AutoplayService;
    exports.ɵb = CarouselService;
    exports.ɵn = BrowserDocumentRef;
    exports.ɵl = DOCUMENT;
    exports.ɵr = DOCUMENT_PROVIDERS;
    exports.ɵm = DocumentRef;
    exports.ɵp = browserDocumentProvider;
    exports.ɵo = documentFactory;
    exports.ɵq = documentProvider;
    exports.ɵv = HashService;
    exports.ɵs = LazyLoadService;
    exports.ɵc = OwlLogger;
    exports.ɵa = NavigationService;
    exports.ɵw = ResizeService;
    exports.ɵg = BrowserWindowRef;
    exports.ɵe = WINDOW;
    exports.ɵk = WINDOW_PROVIDERS;
    exports.ɵf = WindowRef;
    exports.ɵi = browserWindowProvider;
    exports.ɵh = windowFactory;
    exports.ɵj = windowProvider;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW93bC1jYXJvdXNlbC1vLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmd4LW93bC1jYXJvdXNlbC1vL2xpYi9zZXJ2aWNlcy9yZXNpemUuc2VydmljZS50cyIsIm5vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCJuZzovL25neC1vd2wtY2Fyb3VzZWwtby9saWIvY2Fyb3VzZWwvb3dsLWNhcm91c2VsLW8tY29uZmlnLnRzIiwibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vbGliL3NlcnZpY2VzL2xvZ2dlci5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vbGliL3NlcnZpY2VzL2Nhcm91c2VsLnNlcnZpY2UudHMiLCJuZzovL25neC1vd2wtY2Fyb3VzZWwtby9saWIvc2VydmljZXMvbmF2aWdhdGlvbi5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vbGliL3NlcnZpY2VzL3dpbmRvdy1yZWYuc2VydmljZS50cyIsIm5nOi8vbmd4LW93bC1jYXJvdXNlbC1vL2xpYi9zZXJ2aWNlcy9kb2N1bWVudC1yZWYuc2VydmljZS50cyIsIm5nOi8vbmd4LW93bC1jYXJvdXNlbC1vL2xpYi9zZXJ2aWNlcy9hdXRvcGxheS5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vbGliL3NlcnZpY2VzL2xhenlsb2FkLnNlcnZpY2UudHMiLCJuZzovL25neC1vd2wtY2Fyb3VzZWwtby9saWIvc2VydmljZXMvYW5pbWF0ZS5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vbGliL3NlcnZpY2VzL2F1dG9oZWlnaHQuc2VydmljZS50cyIsIm5nOi8vbmd4LW93bC1jYXJvdXNlbC1vL2xpYi9zZXJ2aWNlcy9oYXNoLnNlcnZpY2UudHMiLCJuZzovL25neC1vd2wtY2Fyb3VzZWwtby9saWIvY2Fyb3VzZWwvY2Fyb3VzZWwuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vbGliL2Nhcm91c2VsL3N0YWdlL3N0YWdlLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LW93bC1jYXJvdXNlbC1vL2xpYi9jYXJvdXNlbC9vd2wtcm91dGVyLWxpbmsuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vbGliL2Nhcm91c2VsL2Nhcm91c2VsLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudE1hbmFnZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBSZXNpemVTZXJ2aWNlIHtcclxuICAvKipcclxuICAgKiBXaWR0aCBvZiB3aW5kb3dcclxuICAgKi9cclxuICBwdWJsaWMgd2luZG93V2lkdGg6IGFueTtcclxuXHJcbiAgLyoqXHJcbiAgICogTWFrZXMgcmVzaXplU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxyXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgcmVzaXplU3ViamVjdFxyXG4gICAqL1xyXG4gIGdldCBvblJlc2l6ZSQoKTogT2JzZXJ2YWJsZTxXaW5kb3c+IHtcclxuICAgIHJldHVybiB0aGlzLnJlc2l6ZVN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdWJqZWN0IG9mICdyZXNpemUnIGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSByZXNpemVTdWJqZWN0OiBTdWJqZWN0PFdpbmRvdz47XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZXZlbnRNYW5hZ2VyOiBFdmVudE1hbmFnZXIpIHtcclxuICAgIHRoaXMucmVzaXplU3ViamVjdCA9IG5ldyBTdWJqZWN0KCk7XHJcbiAgICB0aGlzLmV2ZW50TWFuYWdlci5hZGRHbG9iYWxFdmVudExpc3RlbmVyKFxyXG4gICAgICAnd2luZG93JyxcclxuICAgICAgJ3Jlc2l6ZScsXHJcbiAgICAgIHRoaXMub25SZXNpemUuYmluZCh0aGlzKVxyXG4gICAgKTtcclxuICAgIHRoaXMuZXZlbnRNYW5hZ2VyLmFkZEdsb2JhbEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgICd3aW5kb3cnLFxyXG4gICAgICAnb25sb2FkJyxcclxuICAgICAgdGhpcy5vbkxvYWRlZC5iaW5kKHRoaXMpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlciBvZiAncmVzaXplJyBldmVudC4gUGFzc2VzIGRhdGEgdGhyb3cgcmVzaXplU3ViamVjdFxyXG4gICAqIEBwYXJhbSBldmVudCBFdmVudCBPYmplY3Qgb2YgJ3Jlc2l6ZScgZXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIG9uUmVzaXplKGV2ZW50OiBVSUV2ZW50KSB7XHJcbiAgICB0aGlzLnJlc2l6ZVN1YmplY3QubmV4dCg8V2luZG93PmV2ZW50LnRhcmdldCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGVyIG9mICdvbmxvYWQnIGV2ZW50LiBEZWZpbmVzIHRoZSB3aWR0aCBvZiB3aW5kb3dcclxuICAgKiBAcGFyYW0gZXZlbnQgRXZlbnQgT2JqZWN0IG9mICdvbmxvYWQnIGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbkxvYWRlZChldmVudDogVUlFdmVudCkge1xyXG4gICAgdGhpcy53aW5kb3dXaWR0aCA9IDxXaW5kb3c+ZXZlbnQudGFyZ2V0O1xyXG4gIH1cclxufVxyXG4iLCIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImltcG9ydCB7IE93bE9wdGlvbnMgfSBmcm9tIFwiLi4vbW9kZWxzL293bC1vcHRpb25zLm1vZGVsXCI7XHJcblxyXG4vKipcclxuICogRGVmYXVsdHMgdmFsdWUgb2Ygb3B0aW9uc1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE93bENhcm91c2VsT0NvbmZpZyBpbXBsZW1lbnRzIE93bE9wdGlvbnMge1xyXG4gIGl0ZW1zID0gMztcclxuICBsb29wID0gZmFsc2U7XHJcbiAgY2VudGVyID0gZmFsc2U7XHJcbiAgcmV3aW5kID0gZmFsc2U7XHJcblxyXG4gIG1vdXNlRHJhZyA9IHRydWU7XHJcbiAgdG91Y2hEcmFnID0gdHJ1ZTtcclxuICBwdWxsRHJhZyA9IHRydWU7XHJcbiAgZnJlZURyYWcgPSBmYWxzZTtcclxuXHJcbiAgbWFyZ2luID0gMDtcclxuICBzdGFnZVBhZGRpbmcgPSAwO1xyXG5cclxuICBtZXJnZSA9IGZhbHNlO1xyXG4gIG1lcmdlRml0ID0gdHJ1ZTtcclxuICBhdXRvV2lkdGggPSBmYWxzZTtcclxuXHJcbiAgc3RhcnRQb3NpdGlvbiA9IDA7XHJcbiAgcnRsID0gZmFsc2U7XHJcblxyXG4gIHNtYXJ0U3BlZWQgPSAyNTA7XHJcbiAgZmx1aWRTcGVlZCA9IGZhbHNlO1xyXG4gIGRyYWdFbmRTcGVlZCA9IGZhbHNlO1xyXG5cclxuICByZXNwb25zaXZlID0ge307XHJcbiAgcmVzcG9uc2l2ZVJlZnJlc2hSYXRlID0gMjAwO1xyXG5cclxuICAvLyBkZWZhdWx0cyB0byBOYXZpZ2F0aW9uXHJcbiAgbmF2ID0gZmFsc2U7XHJcbiAgbmF2VGV4dCA9IFsgJ3ByZXYnLCAnbmV4dCcgXTtcclxuICBuYXZTcGVlZCA9IGZhbHNlO1xyXG4gIHNsaWRlQnkgPSAxOyAvLyBzdGFnZSBtb3ZlcyBvbiAxIHdpZHRoIG9mIHNsaWRlOyBpZiBzbGlkZUJ5ID0gMiwgc3RhZ2UgbW92ZXMgb24gMiB3aWR0aHMgb2Ygc2xpZGVcclxuICBkb3RzID0gdHJ1ZTtcclxuICBkb3RzRWFjaCA9IGZhbHNlO1xyXG4gIGRvdHNEYXRhID0gZmFsc2U7XHJcbiAgZG90c1NwZWVkID0gZmFsc2U7XHJcblxyXG4gIC8vIGRlZmF1bHRzIHRvIEF1dG9wbGF5XHJcbiAgYXV0b3BsYXkgPSBmYWxzZTtcclxuICBhdXRvcGxheVRpbWVvdXQgPSA1MDAwO1xyXG4gIGF1dG9wbGF5SG92ZXJQYXVzZSA9IGZhbHNlO1xyXG4gIGF1dG9wbGF5U3BlZWQgPSBmYWxzZTtcclxuXHJcbiAgLy8gZGVmYXVsdHMgdG8gTGF6eUxvYWRpbmdcclxuICBsYXp5TG9hZCA9IGZhbHNlO1xyXG4gIGxhenlMb2FkRWFnZXIgPSAwO1xyXG5cclxuICAvLyBkZWZhdWx0cyB0byBBbmltYXRlXHJcbiAgYW5pbWF0ZU91dCA9IGZhbHNlO1xyXG4gIGFuaW1hdGVJbiA9IGZhbHNlO1xyXG5cclxuICAvLyBkZWZhdWx0cyB0byBBdXRvSGVpZ2h0XHJcbiAgYXV0b0hlaWdodCA9IGZhbHNlO1xyXG5cclxuICAvLyBkZWZhdWx0cyB0byBIYXNoXHJcbiAgVVJMaGFzaExpc3RlbmVyID0gZmFsc2U7XHJcbiAgY29uc3RydWN0b3IoKSB7IH1cclxufVxyXG5cclxuLyoqXHJcbiAqIHdlIGNhbid0IHJlYWQgdHlwZXMgZnJvbSBPd2xPcHRpb25zIGluIGphdmFzY3JpcHQgYmVjYXVzZSBvZiBwcm9wcyBoYXZlIHVuZGVmaW5lZCB2YWx1ZSBhbmQgdHlwZXMgb2YgdGhvc2UgcHJvcHMgYXJlIHVzZWQgZm9yIHZhbGlkYXRpbmcgaW5wdXRzXHJcbiAqIGNsYXNzIGJlbG93IGlzIGNvcHkgb2YgT3dsT3B0aW9ucyBidXQgaXRzIGFsbCBwcm9wcyBoYXZlIHN0cmluZyB2YWx1ZSBzaG93aW5nIGNlcnRhaW4gdHlwZTtcclxuICogdGhpcyBpcyBjbGFzcyBpcyBiZWluZyB1c2VkIGp1c3QgaW4gbWV0aG9kIF92YWxpZGF0ZU9wdGlvbnMoKSBvZiBDYXJvdXNlbFNlcnZpY2U7XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgT3dsT3B0aW9uc01vY2tlZFR5cGVzIHtcclxuICBpdGVtcyA9ICdudW1iZXInO1xyXG4gIGxvb3AgPSAnYm9vbGVhbic7XHJcbiAgY2VudGVyID0gJ2Jvb2xlYW4nO1xyXG4gIHJld2luZCA9ICdib29sZWFuJztcclxuXHJcbiAgbW91c2VEcmFnID0gJ2Jvb2xlYW4nO1xyXG4gIHRvdWNoRHJhZyA9ICdib29sZWFuJztcclxuICBwdWxsRHJhZyA9ICdib29sZWFuJztcclxuICBmcmVlRHJhZyA9ICdib29sZWFuJztcclxuXHJcbiAgbWFyZ2luID0gJ251bWJlcic7XHJcbiAgc3RhZ2VQYWRkaW5nID0gJ251bWJlcic7XHJcblxyXG4gIG1lcmdlID0gJ2Jvb2xlYW4nO1xyXG4gIG1lcmdlRml0ID0gJ2Jvb2xlYW4nO1xyXG4gIGF1dG9XaWR0aCA9ICdib29sZWFuJztcclxuXHJcbiAgc3RhcnRQb3NpdGlvbiA9ICdudW1iZXJ8c3RyaW5nJztcclxuICBydGwgPSAnYm9vbGVhbic7XHJcblxyXG4gIHNtYXJ0U3BlZWQgPSAnbnVtYmVyJztcclxuICBmbHVpZFNwZWVkID0gJ2Jvb2xlYW4nO1xyXG4gIGRyYWdFbmRTcGVlZCA9ICdudW1iZXJ8Ym9vbGVhbic7XHJcblxyXG4gIHJlc3BvbnNpdmUgPSB7fTtcclxuICByZXNwb25zaXZlUmVmcmVzaFJhdGUgPSAnbnVtYmVyJztcclxuXHJcbiAgLy8gZGVmYXVsdHMgdG8gTmF2aWdhdGlvblxyXG4gIG5hdiA9ICdib29sZWFuJztcclxuICBuYXZUZXh0ID0gJ3N0cmluZ1tdJztcclxuICBuYXZTcGVlZCA9ICdudW1iZXJ8Ym9vbGVhbic7XHJcbiAgc2xpZGVCeSA9ICdudW1iZXJ8c3RyaW5nJzsgLy8gc3RhZ2UgbW92ZXMgb24gMSB3aWR0aCBvZiBzbGlkZTsgaWYgc2xpZGVCeSA9IDIsIHN0YWdlIG1vdmVzIG9uIDIgd2lkdGhzIG9mIHNsaWRlXHJcbiAgZG90cyA9ICdib29sZWFuJztcclxuICBkb3RzRWFjaCA9ICdudW1iZXJ8Ym9vbGVhbic7XHJcbiAgZG90c0RhdGEgPSAnYm9vbGVhbic7XHJcbiAgZG90c1NwZWVkID0gJ251bWJlcnxib29sZWFuJztcclxuXHJcbiAgLy8gZGVmYXVsdHMgdG8gQXV0b3BsYXlcclxuICBhdXRvcGxheSA9ICdib29sZWFuJztcclxuICBhdXRvcGxheVRpbWVvdXQgPSAnbnVtYmVyJztcclxuICBhdXRvcGxheUhvdmVyUGF1c2UgPSAnYm9vbGVhbic7XHJcbiAgYXV0b3BsYXlTcGVlZCA9ICdudW1iZXJ8Ym9vbGVhbic7XHJcblxyXG4gIC8vIGRlZmF1bHRzIHRvIExhenlMb2FkaW5nXHJcbiAgbGF6eUxvYWQgPSAnYm9vbGVhbic7XHJcbiAgbGF6eUxvYWRFYWdlciA9ICdudW1iZXInO1xyXG5cclxuICAvLyBkZWZhdWx0cyB0byBBbmltYXRlXHJcbiAgYW5pbWF0ZU91dCA9ICdzdHJpbmd8Ym9vbGVhbic7XHJcbiAgYW5pbWF0ZUluID0gJ3N0cmluZ3xib29sZWFuJztcclxuXHJcbiAgLy8gZGVmYXVsdHMgdG8gQXV0b0hlaWdodFxyXG4gIGF1dG9IZWlnaHQgPSAnYm9vbGVhbic7XHJcblxyXG4gIC8vIGRlZmF1bHRzIHRvIEhhc2hcclxuICBVUkxoYXNoTGlzdGVuZXIgPSBcImJvb2xlYW5cIjtcclxuICBjb25zdHJ1Y3RvcigpIHsgfVxyXG59IiwiaW1wb3J0IHsgRXJyb3JIYW5kbGVyLCBJbmplY3RhYmxlLCBpc0Rldk1vZGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE93bExvZ2dlciB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlcnJvckhhbmRsZXI6IEVycm9ySGFuZGxlcikge31cblxuICBsb2codmFsdWU6IGFueSwgLi4ucmVzdDogYW55W10pIHtcbiAgICBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICAgIGNvbnNvbGUubG9nKHZhbHVlLCAuLi5yZXN0KTtcbiAgICB9XG4gIH1cblxuICBlcnJvcihlcnJvcjogRXJyb3IpIHtcbiAgICB0aGlzLmVycm9ySGFuZGxlci5oYW5kbGVFcnJvcihlcnJvcik7XG4gIH1cblxuICB3YXJuKHZhbHVlOiBhbnksIC4uLnJlc3Q6IGFueVtdKSB7XG4gICAgY29uc29sZS53YXJuKHZhbHVlLCAuLi5yZXN0KTtcbiAgfVxufVxuIiwiXHJcbmltcG9ydCB7IFN0YWdlRGF0YSB9IGZyb20gJy4uL21vZGVscy9zdGFnZS1kYXRhLm1vZGVsJztcclxuXHJcbmltcG9ydCB7IE93bERPTURhdGEgfSBmcm9tICcuLi9tb2RlbHMvb3dsRE9NLWRhdGEubW9kZWwnO1xyXG5cclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZSB9IGZyb20gJy4uL2Nhcm91c2VsL2Nhcm91c2VsLm1vZHVsZSc7XHJcbmltcG9ydCB7IFNsaWRlTW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvc2xpZGUubW9kZWwnO1xyXG5pbXBvcnQgeyBTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IE93bENhcm91c2VsT0NvbmZpZywgT3dsT3B0aW9uc01vY2tlZFR5cGVzIH0gZnJvbSAnLi4vY2Fyb3VzZWwvb3dsLWNhcm91c2VsLW8tY29uZmlnJztcclxuaW1wb3J0IHsgT3dsT3B0aW9ucyB9IGZyb20gJy4uL21vZGVscy9vd2wtb3B0aW9ucy5tb2RlbCc7XHJcblxyXG5pbXBvcnQgeyBOYXZEYXRhLCBEb3RzRGF0YSB9IGZyb20gJy4uL21vZGVscy9uYXZpZ2F0aW9uLWRhdGEubW9kZWxzJztcclxuaW1wb3J0IHsgT3dsTG9nZ2VyIH0gZnJvbSAnLi9sb2dnZXIuc2VydmljZSc7XHJcblxyXG4vKipcclxuICogQ3VycmVudCBzdGF0ZSBpbmZvcm1hdGlvbiBhbmQgdGhlaXIgdGFncy5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBTdGF0ZXMge1xyXG4gIGN1cnJlbnQ6IHt9O1xyXG4gIHRhZ3M6IHtcclxuICAgIFtrZXk6IHN0cmluZ106IHN0cmluZ1tdO1xyXG4gIH07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFbnVtZXJhdGlvbiBmb3IgdHlwZXMuXHJcbiAqIEBlbnVtIHtTdHJpbmd9XHJcbiAqL1xyXG5leHBvcnQgZW51bSBUeXBlIHtcclxuXHRFdmVudCA9ICdldmVudCcsXHJcblx0U3RhdGUgPSAnc3RhdGUnXHJcbn07XHJcblxyXG4vKipcclxuICogRW51bWVyYXRpb24gZm9yIHdpZHRoLlxyXG4gKiBAZW51bSB7U3RyaW5nfVxyXG4gKi9cclxuZXhwb3J0IGVudW0gV2lkdGgge1xyXG5cdERlZmF1bHQgPSAnZGVmYXVsdCcsXHJcblx0SW5uZXIgPSAnaW5uZXInLFxyXG5cdE91dGVyID0gJ291dGVyJ1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIE1vZGVsIGZvciBjb29yZHMgb2YgLm93bC1zdGFnZVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENvb3JkcyB7XHJcblx0eDogbnVtYmVyO1xyXG5cdHk6IG51bWJlcjtcclxufVxyXG5cclxuLyoqXHJcbiAqIE1vZGVsIGZvciBhbGwgY3VycmVudCBkYXRhIG9mIGNhcm91c2VsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ2Fyb3VzZWxDdXJyZW50RGF0YSB7XHJcblx0b3dsRE9NRGF0YTogT3dsRE9NRGF0YTtcclxuXHRzdGFnZURhdGE6IFN0YWdlRGF0YTtcclxuXHRzbGlkZXNEYXRhOiBTbGlkZU1vZGVsW107XHJcblx0bmF2RGF0YTogTmF2RGF0YTtcclxuXHRkb3RzRGF0YTogRG90c0RhdGE7XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIENhcm91c2VsU2VydmljZSB7XHJcblx0LyoqXHJcbiAgICogU3ViamVjdCBmb3IgcGFzc2luZyBkYXRhIG5lZWRlZCBmb3IgbWFuYWdpbmcgVmlld1xyXG4gICAqL1xyXG5cdHByaXZhdGUgX3ZpZXdTZXR0aW5nc1NoaXBwZXIkID0gbmV3IFN1YmplY3Q8Q2Fyb3VzZWxDdXJyZW50RGF0YT4oKTtcclxuXHQvKipcclxuICAgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gd2hlbiB0aGUgY2Fyb3VzZWwgZ290IGluaXRpYWxpemVzXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfaW5pdGlhbGl6ZWRDYXJvdXNlbCQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XHJcblxyXG5cdC8qKlxyXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSBjYXJvdXNlbCdzIHNldHRpbmdzIHN0YXJ0IGNoYW5naW5mXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfY2hhbmdlU2V0dGluZ3NDYXJvdXNlbCQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XHJcblxyXG5cdC8qKlxyXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSBjYXJvdXNlbCdzIHNldHRpbmdzIGhhdmUgY2hhbmdlZFxyXG4gICAqL1xyXG5cdHByaXZhdGUgX2NoYW5nZWRTZXR0aW5nc0Nhcm91c2VsJCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcclxuXHQvKipcclxuICAgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gd2hlbiB0aGUgY2Fyb3VzZWwgc3RhcnRzIHRyYW5zbGF0aW5nIG9yIG1vdmluZ1xyXG4gICAqL1xyXG5cdHByaXZhdGUgX3RyYW5zbGF0ZUNhcm91c2VsJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcclxuXHQvKipcclxuICAgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gd2hlbiB0aGUgY2Fyb3VzZWwgc3RvcHBlZCB0cmFuc2xhdGluZyBvciBtb3ZpbmdcclxuICAgKi9cclxuXHRwcml2YXRlIF90cmFuc2xhdGVkQ2Fyb3VzZWwkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xyXG5cdC8qKlxyXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSBjYXJvdXNlbCdzIHJlYnVpbGRpbmcgY2F1c2VkIGJ5ICdyZXNpemUnIGV2ZW50IHN0YXJ0c1xyXG4gICAqL1xyXG5cdHByaXZhdGUgX3Jlc2l6ZUNhcm91c2VsJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcclxuXHQvKipcclxuICAgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gIHdoZW4gdGhlIGNhcm91c2VsJ3MgcmVidWlsZGluZyBjYXVzZWQgYnkgJ3Jlc2l6ZScgZXZlbnQgaXMgZW5kZWRcclxuICAgKi9cclxuXHRwcml2YXRlIF9yZXNpemVkQ2Fyb3VzZWwkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xyXG5cdC8qKlxyXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSByZWZyZXNoIG9mIGNhcm91c2VsIHN0YXJ0c1xyXG4gICAqL1xyXG5cdHByaXZhdGUgX3JlZnJlc2hDYXJvdXNlbCQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XHJcblx0LyoqXHJcbiAgICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uIHdoZW4gdGhlIHJlZnJlc2ggb2YgY2Fyb3VzZWwgaXMgZW5kZWRcclxuICAgKi9cclxuXHRwcml2YXRlIF9yZWZyZXNoZWRDYXJvdXNlbCQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XHJcblx0LyoqXHJcbiAgICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uIHdoZW4gdGhlIGRyYWdnaW5nIG9mIGNhcm91c2VsIHN0YXJ0c1xyXG4gICAqL1xyXG5cdHByaXZhdGUgX2RyYWdDYXJvdXNlbCQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XHJcblx0LyoqXHJcbiAgICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uIHdoZW4gdGhlIGRyYWdnaW5nIG9mIGNhcm91c2VsIGlzIGVuZGVkXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfZHJhZ2dlZENhcm91c2VsJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ3VycmVudCBzZXR0aW5ncyBmb3IgdGhlIGNhcm91c2VsLlxyXG4gICAqL1xyXG4gIHNldHRpbmdzOiBPd2xPcHRpb25zID0ge1xyXG5cdFx0aXRlbXM6IDBcclxuXHR9O1xyXG5cclxuXHQvKipcclxuICAgKiBJbml0aWFsIGRhdGEgZm9yIHNldHRpbmcgY2xhc3NlcyB0byBlbGVtZW50IC5vd2wtY2Fyb3VzZWxcclxuICAgKi9cclxuXHRvd2xET01EYXRhOiBPd2xET01EYXRhID0ge1xyXG5cdFx0cnRsOiBmYWxzZSxcclxuXHRcdGlzUmVzcG9uc2l2ZTogZmFsc2UsXHJcblx0XHRpc1JlZnJlc2hlZDogZmFsc2UsXHJcblx0XHRpc0xvYWRlZDogZmFsc2UsXHJcblx0XHRpc0xvYWRpbmc6IGZhbHNlLFxyXG5cdFx0aXNNb3VzZURyYWdhYmxlOiBmYWxzZSxcclxuXHRcdGlzR3JhYjogZmFsc2UsXHJcblx0XHRpc1RvdWNoRHJhZ2FibGU6IGZhbHNlXHJcblx0fTtcclxuXHJcblx0LyoqXHJcbiAgICogSW5pdGlhbCBkYXRhIG9mIC5vd2wtc3RhZ2VcclxuICAgKi9cclxuXHRzdGFnZURhdGE6IFN0YWdlRGF0YSA9IHtcclxuXHRcdHRyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKDBweCwwcHgsMHB4KScsXHJcblx0XHR0cmFuc2l0aW9uOiAnMHMnLFxyXG5cdFx0d2lkdGg6IDAsXHJcblx0XHRwYWRkaW5nTDogMCxcclxuXHRcdHBhZGRpbmdSOiAwXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogIERhdGEgb2YgZXZlcnkgc2xpZGVcclxuXHQgKi9cclxuXHRzbGlkZXNEYXRhOiBTbGlkZU1vZGVsW107XHJcblxyXG5cdC8qKlxyXG5cdCAqIERhdGEgb2YgbmF2aWdhdGlvbiBibG9ja1xyXG5cdCAqL1xyXG5cdG5hdkRhdGE6IE5hdkRhdGE7XHJcblxyXG5cdC8qKlxyXG5cdCAqIERhdGEgb2YgZG90cyBibG9ja1xyXG5cdCAqL1xyXG5cdGRvdHNEYXRhOiBEb3RzRGF0YTtcclxuXHJcblx0LyoqXHJcblx0ICogQ2Fyb3VzZWwgd2lkdGhcclxuXHQgKi9cclxuXHRwcml2YXRlIF93aWR0aDogbnVtYmVyO1xyXG5cclxuXHQvKipcclxuXHQgKiBBbGwgcmVhbCBpdGVtcy5cclxuXHQgKi9cclxuXHRwcml2YXRlIF9pdGVtczogQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZVtdID0gW107IC8vIGlzIGVxdWFsIHRvIHRoaXMuc2xpZGVzXHJcblxyXG5cdC8qKlxyXG4gICAqIEFycmF5IHdpdGggd2lkdGggb2YgZXZlcnkgc2xpZGUuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfd2lkdGhzOiBhbnlbXSA9IFtdO1xyXG5cclxuXHQvKipcclxuICAgKiBDdXJyZW50bHkgc3VwcHJlc3NlZCBldmVudHMgdG8gcHJldmVudCB0aGVtIGZyb20gYmVlaW5nIHJldHJpZ2dlcmVkLlxyXG4gICAqL1xyXG5cdHByaXZhdGUgX3N1cHJlc3M6IGFueSA9IHt9O1xyXG5cclxuICAvKipcclxuICAgKiBSZWZlcmVuY2VzIHRvIHRoZSBydW5uaW5nIHBsdWdpbnMgb2YgdGhpcyBjYXJvdXNlbC5cclxuICAgKi9cclxuXHRwcml2YXRlIF9wbHVnaW5zOiBhbnkgPSB7fTtcclxuXHJcblx0LyoqXHJcbiAgICogQWJzb2x1dGUgY3VycmVudCBwb3NpdGlvbi5cclxuICAgKi9cclxuXHRwcml2YXRlIF9jdXJyZW50OiBudW1iZXIgfCBudWxsID0gbnVsbDtcclxuXHJcblx0LyoqXHJcbiAgICogQWxsIGNsb25lZCBpdGVtcy5cclxuICAgKi9cclxuXHRwcml2YXRlIF9jbG9uZXM6IGFueVtdID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIE1lcmdlIHZhbHVlcyBvZiBhbGwgaXRlbXMuXHJcbiAgICogQHRvZG8gTWF5YmUgdGhpcyBjb3VsZCBiZSBwYXJ0IG9mIGEgcGx1Z2luLlxyXG4gICAqL1xyXG5cdHJlYWRvbmx5IF9tZXJnZXJzOiBhbnlbXSA9IFtdO1xyXG5cclxuXHQvKipcclxuICAgKiBBbmltYXRpb24gc3BlZWQgaW4gbWlsbGlzZWNvbmRzLlxyXG4gICAqL1xyXG5cdHByaXZhdGUgX3NwZWVkOiBudW1iZXIgfCBudWxsID0gbnVsbDtcclxuXHJcblx0LyoqXHJcbiAgICogQ29vcmRpbmF0ZXMgb2YgYWxsIGl0ZW1zIGluIHBpeGVsLlxyXG4gICAqIEB0b2RvIFRoZSBuYW1lIG9mIHRoaXMgbWVtYmVyIGlzIG1pc3NsZWFkaW5nLlxyXG4gICAqL1xyXG5cdHByaXZhdGUgX2Nvb3JkaW5hdGVzOiBudW1iZXJbXSA9IFtdO1xyXG5cclxuXHQvKipcclxuICAgKiBDdXJyZW50IGJyZWFrcG9pbnQuXHJcbiAgICogQHRvZG8gUmVhbCBtZWRpYSBxdWVyaWVzIHdvdWxkIGJlIG5pY2UuXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfYnJlYWtwb2ludDogYW55ID0gbnVsbDtcclxuXHJcblx0LyoqXHJcblx0ICogUHJlZml4IGZvciBpZCBvZiBjbG9uZWQgc2xpZGVzXHJcblx0ICovXHJcblx0Y2xvbmVkSWRQcmVmaXggPSAnY2xvbmVkLSc7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEN1cnJlbnQgb3B0aW9ucyBzZXQgYnkgdGhlIGNhbGxlciBpbmNsdWRpbmcgZGVmYXVsdHMuXHJcblx0ICovXHJcblx0X29wdGlvbnM6IE93bE9wdGlvbnMgPSB7fTtcclxuXHJcbiAgLyoqXHJcbiAgICogSW52YWxpZGF0ZWQgcGFydHMgd2l0aGluIHRoZSB1cGRhdGUgcHJvY2Vzcy5cclxuICAgKi9cclxuICBwcml2YXRlIF9pbnZhbGlkYXRlZDogYW55ID0ge307XHJcblxyXG4gIC8vIElzIG5lZWRlZCBmb3IgdGVzdHNcclxuICBnZXQgaW52YWxpZGF0ZWQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5faW52YWxpZGF0ZWQ7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIEN1cnJlbnQgc3RhdGUgaW5mb3JtYXRpb24gYW5kIHRoZWlyIHRhZ3MuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfc3RhdGVzOiBTdGF0ZXMgPSB7XHJcbiAgICBjdXJyZW50OiB7fSxcclxuICAgIHRhZ3M6IHtcclxuICAgICAgaW5pdGlhbGl6aW5nOiBbJ2J1c3knXSxcclxuICAgICAgYW5pbWF0aW5nOiBbJ2J1c3knXSxcclxuICAgICAgZHJhZ2dpbmc6IFsnaW50ZXJhY3RpbmcnXVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8vIGlzIG5lZWRlZCBmb3IgdGVzdHNcclxuICBnZXQgc3RhdGVzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3N0YXRlcztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG4gXHQgKiBPcmRlcmVkIGxpc3Qgb2Ygd29ya2VycyBmb3IgdGhlIHVwZGF0ZSBwcm9jZXNzLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3BpcGU6IGFueVtdID0gW1xyXG4gICAgLy8ge1xyXG4gICAgLy8gICBmaWx0ZXI6IFsnd2lkdGgnLCAnc2V0dGluZ3MnXSxcclxuICAgIC8vICAgcnVuOiAoKSA9PiB7XHJcbiAgICAvLyAgICAgdGhpcy5fd2lkdGggPSB0aGlzLmNhcm91c2VsV2luZG93V2lkdGg7XHJcbiAgICAvLyAgIH1cclxuICAgIC8vIH0sXHJcbiAgICB7XHJcbiAgICAgIGZpbHRlcjogWyd3aWR0aCcsICdpdGVtcycsICdzZXR0aW5ncyddLFxyXG4gICAgICBydW46IGNhY2hlID0+IHtcclxuICAgICAgICBjYWNoZS5jdXJyZW50ID0gdGhpcy5faXRlbXMgJiYgdGhpcy5faXRlbXNbdGhpcy5yZWxhdGl2ZSh0aGlzLl9jdXJyZW50KV0uaWQ7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgIGZpbHRlcjogWydpdGVtcycsICdzZXR0aW5ncyddLFxyXG4gICAgLy8gICBydW46IGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gICAgIC8vIHRoaXMuJHN0YWdlLmNoaWxkcmVuKCcuY2xvbmVkJykucmVtb3ZlKCk7XHJcbiAgICAvLyAgIH1cclxuXHRcdC8vIH0sXHJcblx0XHQge1xyXG4gICAgICBmaWx0ZXI6IFsgJ3dpZHRoJywgJ2l0ZW1zJywgJ3NldHRpbmdzJyBdLFxyXG4gICAgICBydW46IChjYWNoZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG1hcmdpbiA9IHRoaXMuc2V0dGluZ3MubWFyZ2luIHx8ICcnLFxyXG4gICAgICAgICAgZ3JpZCA9ICF0aGlzLnNldHRpbmdzLmF1dG9XaWR0aCxcclxuICAgICAgICAgIHJ0bCA9IHRoaXMuc2V0dGluZ3MucnRsLFxyXG4gICAgICAgICAgY3NzID0ge1xyXG4gICAgICAgICAgICAnbWFyZ2luLWxlZnQnOiBydGwgPyBtYXJnaW4gOiAnJyxcclxuICAgICAgICAgICAgJ21hcmdpbi1yaWdodCc6IHJ0bCA/ICcnIDogbWFyZ2luXHJcbiAgICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZighZ3JpZCkge1xyXG5cdFx0XHRcdFx0dGhpcy5zbGlkZXNEYXRhLmZvckVhY2goc2xpZGUgPT4ge1xyXG5cdFx0XHRcdFx0XHRzbGlkZS5tYXJnaW5MID0gY3NzWydtYXJnaW4tbGVmdCddO1xyXG5cdFx0XHRcdFx0XHRzbGlkZS5tYXJnaW5SID0gY3NzWydtYXJnaW4tcmlnaHQnXTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH1cclxuXHJcbiAgICAgICAgY2FjaGUuY3NzID0gY3NzO1xyXG4gICAgICB9XHJcbiAgICB9LCB7XHJcbiAgICAgIGZpbHRlcjogWyAnd2lkdGgnLCAnaXRlbXMnLCAnc2V0dGluZ3MnIF0sXHJcbiAgICAgIHJ1bjogKGNhY2hlKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgd2lkdGg6IGFueSA9ICsodGhpcy53aWR0aCgpIC8gdGhpcy5zZXR0aW5ncy5pdGVtcykudG9GaXhlZCgzKSAtIHRoaXMuc2V0dGluZ3MubWFyZ2luLFxyXG4gICAgICAgICAgZ3JpZCA9ICF0aGlzLnNldHRpbmdzLmF1dG9XaWR0aCxcclxuICAgICAgICAgIHdpZHRocyA9IFtdO1xyXG5cdFx0XHRcdGxldCBtZXJnZSA9IG51bGwsXHJcblx0XHRcdFx0XHRcdGl0ZXJhdG9yID0gdGhpcy5faXRlbXMubGVuZ3RoO1xyXG5cclxuICAgICAgICBjYWNoZS5pdGVtcyA9IHtcclxuICAgICAgICAgIG1lcmdlOiBmYWxzZSxcclxuICAgICAgICAgIHdpZHRoOiB3aWR0aFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHdoaWxlIChpdGVyYXRvci0tKSB7XHJcbiAgICAgICAgICBtZXJnZSA9IHRoaXMuX21lcmdlcnNbaXRlcmF0b3JdO1xyXG4gICAgICAgICAgbWVyZ2UgPSB0aGlzLnNldHRpbmdzLm1lcmdlRml0ICYmIE1hdGgubWluKG1lcmdlLCB0aGlzLnNldHRpbmdzLml0ZW1zKSB8fCBtZXJnZTtcclxuICAgICAgICAgIGNhY2hlLml0ZW1zLm1lcmdlID0gbWVyZ2UgPiAxIHx8IGNhY2hlLml0ZW1zLm1lcmdlO1xyXG5cclxuICAgICAgICAgIHdpZHRoc1tpdGVyYXRvcl0gPSAhZ3JpZCA/IHRoaXMuX2l0ZW1zW2l0ZXJhdG9yXS53aWR0aCA/IHRoaXMuX2l0ZW1zW2l0ZXJhdG9yXS53aWR0aCA6IHdpZHRoIDogd2lkdGggKiBtZXJnZTtcclxuICAgICAgICB9XHJcblxyXG5cdFx0XHRcdHRoaXMuX3dpZHRocyA9IHdpZHRocztcclxuXHJcblx0XHRcdFx0dGhpcy5zbGlkZXNEYXRhLmZvckVhY2goKHNsaWRlLCBpKSA9PiB7XHJcblx0XHRcdFx0XHRzbGlkZS53aWR0aCA9IHRoaXMuX3dpZHRoc1tpXTtcclxuXHRcdFx0XHRcdHNsaWRlLm1hcmdpblIgPSBjYWNoZS5jc3NbJ21hcmdpbi1yaWdodCddO1xyXG5cdFx0XHRcdFx0c2xpZGUubWFyZ2luTCA9IGNhY2hlLmNzc1snbWFyZ2luLWxlZnQnXTtcclxuXHRcdFx0XHR9KTtcclxuICAgICAgfVxyXG4gICAgfSwge1xyXG4gICAgICBmaWx0ZXI6IFsgJ2l0ZW1zJywgJ3NldHRpbmdzJyBdLFxyXG4gICAgICBydW46ICgpID0+IHtcclxuICAgICAgICBjb25zdCBjbG9uZXM6IGFueVtdID0gW10sXHJcbiAgICAgICAgICBpdGVtczogQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZVtdID0gdGhpcy5faXRlbXMsXHJcbiAgICAgICAgICBzZXR0aW5nczogYW55ID0gdGhpcy5zZXR0aW5ncyxcclxuICAgICAgICAgIC8vIFRPRE86IFNob3VsZCBiZSBjb21wdXRlZCBmcm9tIG51bWJlciBvZiBtaW4gd2lkdGggaXRlbXMgaW4gc3RhZ2VcclxuICAgICAgICAgIHZpZXcgPSBNYXRoLm1heChzZXR0aW5ncy5pdGVtcyAqIDIsIDQpLFxyXG4gICAgICAgICAgc2l6ZSA9IE1hdGguY2VpbChpdGVtcy5sZW5ndGggLyAyKSAqIDI7XHJcblx0XHRcdFx0bGV0ICBhcHBlbmQ6IGFueVtdID0gW10sXHJcbiAgICAgICAgICBwcmVwZW5kOiBhbnlbXSA9IFtdLFxyXG5cdFx0XHRcdFx0cmVwZWF0ID0gc2V0dGluZ3MubG9vcCAmJiBpdGVtcy5sZW5ndGggPyBzZXR0aW5ncy5yZXdpbmQgPyB2aWV3IDogTWF0aC5tYXgodmlldywgc2l6ZSkgOiAwO1xyXG5cclxuICAgICAgICByZXBlYXQgLz0gMjtcclxuXHJcbiAgICAgICAgd2hpbGUgKHJlcGVhdC0tKSB7XHJcbiAgICAgICAgICAvLyBTd2l0Y2ggdG8gb25seSB1c2luZyBhcHBlbmRlZCBjbG9uZXNcclxuICAgICAgICAgIGNsb25lcy5wdXNoKHRoaXMubm9ybWFsaXplKGNsb25lcy5sZW5ndGggLyAyLCB0cnVlKSk7XHJcbiAgICAgICAgICBhcHBlbmQucHVzaCh7IC4uLnRoaXMuc2xpZGVzRGF0YVtjbG9uZXNbY2xvbmVzLmxlbmd0aCAtIDFdXX0pO1xyXG5cdFx0XHRcdFx0Y2xvbmVzLnB1c2godGhpcy5ub3JtYWxpemUoaXRlbXMubGVuZ3RoIC0gMSAtIChjbG9uZXMubGVuZ3RoIC0gMSkgLyAyLCB0cnVlKSk7XHJcblx0XHRcdFx0XHRwcmVwZW5kLnVuc2hpZnQoeyAuLi50aGlzLnNsaWRlc0RhdGFbY2xvbmVzW2Nsb25lcy5sZW5ndGggLSAxXV19KTtcclxuICAgICAgICB9XHJcblxyXG5cdFx0XHRcdHRoaXMuX2Nsb25lcyA9IGNsb25lcztcclxuXHJcblx0XHRcdFx0YXBwZW5kID0gYXBwZW5kLm1hcChzbGlkZSA9PiB7XHJcblx0XHRcdFx0XHRzbGlkZS5pZCA9IGAke3RoaXMuY2xvbmVkSWRQcmVmaXh9JHtzbGlkZS5pZH1gO1xyXG5cdFx0XHRcdFx0c2xpZGUuaXNBY3RpdmUgPSBmYWxzZTtcclxuXHRcdFx0XHRcdHNsaWRlLmlzQ2xvbmVkID0gdHJ1ZTtcclxuXHRcdFx0XHRcdHJldHVybiBzbGlkZTtcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0cHJlcGVuZCA9IHByZXBlbmQubWFwKHNsaWRlID0+IHtcclxuXHRcdFx0XHRcdHNsaWRlLmlkID0gYCR7dGhpcy5jbG9uZWRJZFByZWZpeH0ke3NsaWRlLmlkfWA7XHJcblx0XHRcdFx0XHRzbGlkZS5pc0FjdGl2ZSA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0c2xpZGUuaXNDbG9uZWQgPSB0cnVlO1xyXG5cdFx0XHRcdFx0cmV0dXJuIHNsaWRlO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHR0aGlzLnNsaWRlc0RhdGEgPSBwcmVwZW5kLmNvbmNhdCh0aGlzLnNsaWRlc0RhdGEpLmNvbmNhdChhcHBlbmQpO1xyXG4gICAgICB9XHJcbiAgICB9LCB7XHJcbiAgICAgIGZpbHRlcjogWyAnd2lkdGgnLCAnaXRlbXMnLCAnc2V0dGluZ3MnIF0sXHJcbiAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJ0bCA9IHRoaXMuc2V0dGluZ3MucnRsID8gMSA6IC0xLFxyXG4gICAgICAgICAgc2l6ZSA9IHRoaXMuX2Nsb25lcy5sZW5ndGggKyB0aGlzLl9pdGVtcy5sZW5ndGgsXHJcbiAgICAgICAgICBjb29yZGluYXRlcyA9IFtdO1xyXG4gICAgICAgIGxldCBpdGVyYXRvciA9IC0xLFxyXG4gICAgICAgICAgcHJldmlvdXMgPSAwLFxyXG4gICAgICAgICAgY3VycmVudCA9IDA7XHJcblxyXG4gICAgICAgIHdoaWxlICgrK2l0ZXJhdG9yIDwgc2l6ZSkge1xyXG4gICAgICAgICAgcHJldmlvdXMgPSBjb29yZGluYXRlc1tpdGVyYXRvciAtIDFdIHx8IDA7XHJcbiAgICAgICAgICBjdXJyZW50ID0gdGhpcy5fd2lkdGhzW3RoaXMucmVsYXRpdmUoaXRlcmF0b3IpXSArIHRoaXMuc2V0dGluZ3MubWFyZ2luO1xyXG4gICAgICAgICAgY29vcmRpbmF0ZXMucHVzaChwcmV2aW91cyArIGN1cnJlbnQgKiBydGwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fY29vcmRpbmF0ZXMgPSBjb29yZGluYXRlcztcclxuICAgICAgfVxyXG4gICAgfSwge1xyXG4gICAgICBmaWx0ZXI6IFsgJ3dpZHRoJywgJ2l0ZW1zJywgJ3NldHRpbmdzJyBdLFxyXG4gICAgICBydW46ICgpID0+IHtcclxuICAgICAgICBjb25zdCBwYWRkaW5nID0gdGhpcy5zZXR0aW5ncy5zdGFnZVBhZGRpbmcsXHJcbiAgICAgICAgICBjb29yZGluYXRlcyA9IHRoaXMuX2Nvb3JkaW5hdGVzLFxyXG4gICAgICAgICAgY3NzID0ge1xyXG4gICAgICAgICAgICAnd2lkdGgnOiBNYXRoLmNlaWwoTWF0aC5hYnMoY29vcmRpbmF0ZXNbY29vcmRpbmF0ZXMubGVuZ3RoIC0gMV0pKSArIHBhZGRpbmcgKiAyLFxyXG4gICAgICAgICAgICAncGFkZGluZy1sZWZ0JzogcGFkZGluZyB8fCAnJyxcclxuICAgICAgICAgICAgJ3BhZGRpbmctcmlnaHQnOiBwYWRkaW5nIHx8ICcnXHJcblx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHR0aGlzLnN0YWdlRGF0YS53aWR0aCA9IGNzcy53aWR0aDsgLy8gdXNlIHRoaXMgcHJvcGVydHkgaW4gKm5nSWYgZGlyZWN0aXZlIGZvciAub3dsLXN0YWdlIGVsZW1lbnRcclxuXHRcdFx0XHR0aGlzLnN0YWdlRGF0YS5wYWRkaW5nTCA9IGNzc1sncGFkZGluZy1sZWZ0J107XHJcblx0XHRcdFx0dGhpcy5zdGFnZURhdGEucGFkZGluZ1IgPSBjc3NbJ3BhZGRpbmctcmlnaHQnXTtcclxuICAgICAgfVxyXG4gICAgfSwge1xyXG4gICAgLy8gICBmaWx0ZXI6IFsgJ3dpZHRoJywgJ2l0ZW1zJywgJ3NldHRpbmdzJyBdLFxyXG4gICAgLy8gICBydW46IGNhY2hlID0+IHtcclxuXHRcdC8vIFx0XHQvLyB0aGlzIG1ldGhvZCBzZXRzIHRoZSB3aWR0aCBmb3IgZXZlcnkgc2xpZGUsIGJ1dCBJIHNldCBpdCBpbiBkaWZmZXJlbnQgd2F5IGVhcmxpZXJcclxuXHRcdC8vIFx0XHRjb25zdCBncmlkID0gIXRoaXMuc2V0dGluZ3MuYXV0b1dpZHRoLFxyXG5cdFx0Ly8gXHRcdGl0ZW1zID0gdGhpcy4kc3RhZ2UuY2hpbGRyZW4oKTsgLy8gdXNlIHRoaXMuc2xpZGVzRGF0YVxyXG4gICAgLy8gICAgIGxldCBpdGVyYXRvciA9IHRoaXMuX2Nvb3JkaW5hdGVzLmxlbmd0aDtcclxuXHJcbiAgICAvLyAgICAgaWYgKGdyaWQgJiYgY2FjaGUuaXRlbXMubWVyZ2UpIHtcclxuICAgIC8vICAgICAgIHdoaWxlIChpdGVyYXRvci0tKSB7XHJcbiAgICAvLyAgICAgICAgIGNhY2hlLmNzcy53aWR0aCA9IHRoaXMuX3dpZHRoc1t0aGlzLnJlbGF0aXZlKGl0ZXJhdG9yKV07XHJcbiAgICAvLyAgICAgICAgIGl0ZW1zLmVxKGl0ZXJhdG9yKS5jc3MoY2FjaGUuY3NzKTtcclxuICAgIC8vICAgICAgIH1cclxuICAgIC8vICAgICB9IGVsc2UgaWYgKGdyaWQpIHtcclxuICAgIC8vICAgICAgIGNhY2hlLmNzcy53aWR0aCA9IGNhY2hlLml0ZW1zLndpZHRoO1xyXG4gICAgLy8gICAgICAgaXRlbXMuY3NzKGNhY2hlLmNzcyk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICB9XHJcbiAgICAvLyB9LCB7XHJcbiAgICAvLyAgIGZpbHRlcjogWyAnaXRlbXMnIF0sXHJcbiAgICAvLyAgIHJ1bjogZnVuY3Rpb24oKSB7XHJcbiAgICAvLyAgICAgdGhpcy5fY29vcmRpbmF0ZXMubGVuZ3RoIDwgMSAmJiB0aGlzLiRzdGFnZS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgLy8gICB9XHJcbiAgICAvLyB9LCB7XHJcbiAgICAgIGZpbHRlcjogWyAnd2lkdGgnLCAnaXRlbXMnLCAnc2V0dGluZ3MnIF0sXHJcbiAgICAgIHJ1bjogY2FjaGUgPT4ge1xyXG4gICAgICAgIGxldCBjdXJyZW50ID0gY2FjaGUuY3VycmVudCA/IHRoaXMuc2xpZGVzRGF0YS5maW5kSW5kZXgoc2xpZGUgPT4gc2xpZGUuaWQgPT09IGNhY2hlLmN1cnJlbnQpIDogMDtcclxuICAgICAgIFx0Y3VycmVudCA9IE1hdGgubWF4KHRoaXMubWluaW11bSgpLCBNYXRoLm1pbih0aGlzLm1heGltdW0oKSwgY3VycmVudCkpO1xyXG4gICAgICAgIHRoaXMucmVzZXQoY3VycmVudCk7XHJcbiAgICAgIH1cclxuICAgIH0sIHtcclxuICAgICAgZmlsdGVyOiBbICdwb3NpdGlvbicgXSxcclxuICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5hbmltYXRlKHRoaXMuY29vcmRpbmF0ZXModGhpcy5fY3VycmVudCkpO1xyXG4gICAgICB9XHJcbiAgICB9LCB7XHJcbiAgICAgIGZpbHRlcjogWyAnd2lkdGgnLCAncG9zaXRpb24nLCAnaXRlbXMnLCAnc2V0dGluZ3MnIF0sXHJcbiAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJ0bCA9IHRoaXMuc2V0dGluZ3MucnRsID8gMSA6IC0xLFxyXG5cdFx0XHRcdFx0cGFkZGluZyA9IHRoaXMuc2V0dGluZ3Muc3RhZ2VQYWRkaW5nICogMixcclxuXHRcdFx0XHRcdG1hdGNoZXMgPSBbXTtcclxuXHRcdFx0XHRsZXQgYmVnaW4sIGVuZCwgaW5uZXIsIG91dGVyLCBpLCBuO1xyXG5cclxuXHRcdFx0XHRiZWdpbiA9IHRoaXMuY29vcmRpbmF0ZXModGhpcy5jdXJyZW50KCkpO1xyXG5cdFx0XHRcdGlmICh0eXBlb2YgYmVnaW4gPT09ICdudW1iZXInICkge1xyXG5cdFx0XHRcdFx0YmVnaW4gKz0gcGFkZGluZztcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0YmVnaW4gPSAwO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0ZW5kID0gYmVnaW4gKyB0aGlzLndpZHRoKCkgKiBydGw7XHJcblxyXG5cdFx0XHRcdGlmIChydGwgPT09IC0xICYmIHRoaXMuc2V0dGluZ3MuY2VudGVyKSB7XHJcblx0XHRcdFx0XHRjb25zdCByZXN1bHQgPVx0dGhpcy5fY29vcmRpbmF0ZXMuZmlsdGVyKGVsZW1lbnQgPT4ge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5zZXR0aW5ncy5pdGVtcyAlIDIgPT09IDEgPyBlbGVtZW50ID49IGJlZ2luIDogZWxlbWVudCA+IGJlZ2luO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRiZWdpbiA9IHJlc3VsdC5sZW5ndGggPyByZXN1bHRbcmVzdWx0Lmxlbmd0aCAtIDFdIDogYmVnaW47XHJcblx0XHRcdFx0fVxyXG5cclxuICAgICAgICBmb3IgKGkgPSAwLCBuID0gdGhpcy5fY29vcmRpbmF0ZXMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICBpbm5lciA9IE1hdGguY2VpbCh0aGlzLl9jb29yZGluYXRlc1tpIC0gMV0gfHwgMCk7XHJcblx0XHRcdFx0XHRvdXRlciA9IE1hdGguY2VpbChNYXRoLmFicyh0aGlzLl9jb29yZGluYXRlc1tpXSkgKyBwYWRkaW5nICogcnRsKTtcclxuXHJcbiAgICAgICAgICBpZiAoKHRoaXMuX29wKGlubmVyLCAnPD0nLCBiZWdpbikgJiYgKHRoaXMuX29wKGlubmVyLCAnPicsIGVuZCkpKVxyXG4gICAgICAgICAgICB8fCAodGhpcy5fb3Aob3V0ZXIsICc8JywgYmVnaW4pICYmIHRoaXMuX29wKG91dGVyLCAnPicsIGVuZCkpKSB7XHJcbiAgICAgICAgICAgIG1hdGNoZXMucHVzaChpKTtcclxuICAgICAgICAgIH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHRoaXMuc2xpZGVzRGF0YS5mb3JFYWNoKHNsaWRlID0+IHtcclxuXHRcdFx0XHRcdHNsaWRlLmlzQWN0aXZlID0gZmFsc2U7XHJcblx0XHRcdFx0XHRyZXR1cm4gc2xpZGU7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0bWF0Y2hlcy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy5zbGlkZXNEYXRhW2l0ZW1dLmlzQWN0aXZlID0gdHJ1ZTtcclxuXHRcdFx0XHR9KTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuY2VudGVyKSB7XHJcblx0XHRcdFx0XHR0aGlzLnNsaWRlc0RhdGEuZm9yRWFjaChzbGlkZSA9PiB7XHJcblx0XHRcdFx0XHRcdHNsaWRlLmlzQ2VudGVyZWQgPSBmYWxzZTtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHNsaWRlO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR0aGlzLnNsaWRlc0RhdGFbdGhpcy5jdXJyZW50KCldLmlzQ2VudGVyZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIF07XHJcblxyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgbG9nZ2VyOiBPd2xMb2dnZXIpIHsgfVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBfdmlld1NldHRpbmdzU2hpcHBlciQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxyXG5cdCAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX3ZpZXdTZXR0aW5nc1NoaXBwZXIkIFN1YmplY3RcclxuXHQgKi9cclxuXHRnZXRWaWV3Q3VyU2V0dGluZ3MoKTogT2JzZXJ2YWJsZTxDYXJvdXNlbEN1cnJlbnREYXRhPiB7XHJcblx0XHRyZXR1cm4gdGhpcy5fdmlld1NldHRpbmdzU2hpcHBlciQuYXNPYnNlcnZhYmxlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBfaW5pdGlhbGl6ZWRDYXJvdXNlbCQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxyXG5cdCAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX2luaXRpYWxpemVkQ2Fyb3VzZWwkIFN1YmplY3RcclxuXHQgKi9cclxuXHRnZXRJbml0aWFsaXplZFN0YXRlKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XHJcblx0XHRyZXR1cm4gdGhpcy5faW5pdGlhbGl6ZWRDYXJvdXNlbCQuYXNPYnNlcnZhYmxlKClcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIF9jaGFuZ2VTZXR0aW5nc0Nhcm91c2VsJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXHJcblx0ICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfY2hhbmdlU2V0dGluZ3NDYXJvdXNlbCQgU3ViamVjdFxyXG5cdCAqL1xyXG5cdGdldENoYW5nZVN0YXRlKCk6IE9ic2VydmFibGU8YW55PiB7XHJcblx0XHRyZXR1cm4gdGhpcy5fY2hhbmdlU2V0dGluZ3NDYXJvdXNlbCQuYXNPYnNlcnZhYmxlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBfY2hhbmdlZFNldHRpbmdzQ2Fyb3VzZWwkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcclxuXHQgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIF9jaGFuZ2VkU2V0dGluZ3NDYXJvdXNlbCQgU3ViamVjdFxyXG5cdCAqL1xyXG5cdGdldENoYW5nZWRTdGF0ZSgpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2NoYW5nZWRTZXR0aW5nc0Nhcm91c2VsJC5hc09ic2VydmFibGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIF90cmFuc2xhdGVDYXJvdXNlbCQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxyXG5cdCAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX3RyYW5zbGF0ZUNhcm91c2VsJCBTdWJqZWN0XHJcblx0ICovXHJcblx0Z2V0VHJhbnNsYXRlU3RhdGUoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcclxuXHRcdHJldHVybiB0aGlzLl90cmFuc2xhdGVDYXJvdXNlbCQuYXNPYnNlcnZhYmxlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBfdHJhbnNsYXRlZENhcm91c2VsJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXHJcblx0ICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfdHJhbnNsYXRlZENhcm91c2VsJCBTdWJqZWN0XHJcblx0ICovXHJcblx0Z2V0VHJhbnNsYXRlZFN0YXRlKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XHJcblx0XHRyZXR1cm4gdGhpcy5fdHJhbnNsYXRlZENhcm91c2VsJC5hc09ic2VydmFibGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIF9yZXNpemVDYXJvdXNlbCQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxyXG5cdCAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX3Jlc2l6ZUNhcm91c2VsJCBTdWJqZWN0XHJcblx0ICovXHJcblx0Z2V0UmVzaXplU3RhdGUoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcclxuXHRcdHJldHVybiB0aGlzLl9yZXNpemVDYXJvdXNlbCQuYXNPYnNlcnZhYmxlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBfcmVzaXplZENhcm91c2VsJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXHJcblx0ICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfcmVzaXplZENhcm91c2VsJCBTdWJqZWN0XHJcblx0ICovXHJcblx0Z2V0UmVzaXplZFN0YXRlKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XHJcblx0XHRyZXR1cm4gdGhpcy5fcmVzaXplZENhcm91c2VsJC5hc09ic2VydmFibGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIF9yZWZyZXNoQ2Fyb3VzZWwkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcclxuXHQgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIF9yZWZyZXNoQ2Fyb3VzZWwkIFN1YmplY3RcclxuXHQgKi9cclxuXHRnZXRSZWZyZXNoU3RhdGUoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcclxuXHRcdHJldHVybiB0aGlzLl9yZWZyZXNoQ2Fyb3VzZWwkLmFzT2JzZXJ2YWJsZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgX3JlZnJlc2hlZENhcm91c2VsJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXHJcblx0ICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfcmVmcmVzaGVkQ2Fyb3VzZWwkIFN1YmplY3RcclxuXHQgKi9cclxuXHRnZXRSZWZyZXNoZWRTdGF0ZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3JlZnJlc2hlZENhcm91c2VsJC5hc09ic2VydmFibGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIF9kcmFnQ2Fyb3VzZWwkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcclxuXHQgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIF9kcmFnQ2Fyb3VzZWwkIFN1YmplY3RcclxuXHQgKi9cclxuXHRnZXREcmFnU3RhdGUoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcclxuXHRcdHJldHVybiB0aGlzLl9kcmFnQ2Fyb3VzZWwkLmFzT2JzZXJ2YWJsZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgX2RyYWdnZWRDYXJvdXNlbCQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxyXG5cdCAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX2RyYWdnZWRDYXJvdXNlbCQgU3ViamVjdFxyXG5cdCAqL1xyXG5cdGdldERyYWdnZWRTdGF0ZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2RyYWdnZWRDYXJvdXNlbCQuYXNPYnNlcnZhYmxlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXR1cHMgY3VzdG9tIG9wdGlvbnMgZXhwYW5kaW5nIGRlZmF1bHQgb3B0aW9uc1xyXG5cdCAqIEBwYXJhbSBvcHRpb25zIGN1c3RvbSBvcHRpb25zXHJcblx0ICovXHJcblx0c2V0T3B0aW9ucyhvcHRpb25zOiBPd2xPcHRpb25zKSB7XHJcblx0XHRjb25zdCBjb25maWdPcHRpb25zOiBPd2xPcHRpb25zID0gbmV3IE93bENhcm91c2VsT0NvbmZpZygpO1xyXG5cdFx0Y29uc3QgY2hlY2tlZE9wdGlvbnM6IE93bE9wdGlvbnMgPSB0aGlzLl92YWxpZGF0ZU9wdGlvbnMob3B0aW9ucywgY29uZmlnT3B0aW9ucyk7XHJcblx0XHR0aGlzLl9vcHRpb25zID0geyAuLi5jb25maWdPcHRpb25zLCAuLi5jaGVja2VkT3B0aW9uc307XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3Mgd2hldGhlciB1c2VyJ3Mgb3B0aW9uIGFyZSBzZXQgcHJvcGVybHkuIENoZWtpbmcgaXMgYmFzZWQgb24gdHlwaW5ncztcclxuXHQgKiBAcGFyYW0gb3B0aW9ucyBvcHRpb25zIHNldCBieSB1c2VyXHJcblx0ICogQHBhcmFtIGNvbmZpZ09wdGlvbnMgZGVmYXVsdCBvcHRpb25zXHJcblx0ICogQHJldHVybnMgY2hlY2tlZCBhbmQgbW9kaWZpZWQgKGlmIGl0J3MgbmVlZGVkKSB1c2VyJ3Mgb3B0aW9uc1xyXG5cdCAqXHJcblx0ICogTm90ZXM6XHJcblx0ICogXHQtIGlmIHVzZXIgc2V0IG9wdGlvbiB3aXRoIHdyb25nIHR5cGUsIGl0J2xsIGJlIHdyaXR0ZW4gaW4gY29uc29sZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgX3ZhbGlkYXRlT3B0aW9ucyhvcHRpb25zOiBPd2xPcHRpb25zLCBjb25maWdPcHRpb25zOiBPd2xPcHRpb25zKTogT3dsT3B0aW9ucyB7XHJcblx0XHRjb25zdCBjaGVja2VkT3B0aW9uczogT3dsT3B0aW9ucyA9IHsgLi4ub3B0aW9uc307XHJcblx0XHRjb25zdCBtb2NrZWRUeXBlcyA9IG5ldyBPd2xPcHRpb25zTW9ja2VkVHlwZXMoKTtcclxuXHJcblx0XHRjb25zdCBzZXRSaWdodE9wdGlvbiA9ICh0eXBlOiBzdHJpbmcsIGtleTogYW55KTogT3dsT3B0aW9ucyA9PiB7XHJcblx0XHRcdHRoaXMubG9nZ2VyLmxvZyhgb3B0aW9ucy4ke2tleX0gbXVzdCBiZSB0eXBlIG9mICR7dHlwZX07ICR7a2V5fT0ke29wdGlvbnNba2V5XX0gc2tpcHBlZCB0byBkZWZhdWx0czogJHtrZXl9PSR7Y29uZmlnT3B0aW9uc1trZXldfWApO1xyXG5cdFx0XHRyZXR1cm4gY29uZmlnT3B0aW9uc1trZXldO1xyXG5cdFx0fTtcclxuXHJcblx0XHRmb3IgKGNvbnN0IGtleSBpbiBjaGVja2VkT3B0aW9ucykge1xyXG5cdFx0XHRpZiAoY2hlY2tlZE9wdGlvbnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG5cclxuXHRcdFx0XHQvLyBjb25kaXRpb24gY291bGQgYmUgc2hvcnRlbmVkIGJ1dCBpdCBnZXRzIGhhcmRlciBmb3IgdW5kZXJzdGFuZGluZ1xyXG5cdFx0XHRcdGlmIChtb2NrZWRUeXBlc1trZXldID09PSAnbnVtYmVyJykge1xyXG5cdFx0XHRcdFx0aWYgKHRoaXMuX2lzTnVtZXJpYyhjaGVja2VkT3B0aW9uc1trZXldKSkge1xyXG5cdFx0XHRcdFx0XHRjaGVja2VkT3B0aW9uc1trZXldID0gK2NoZWNrZWRPcHRpb25zW2tleV07XHJcblx0XHRcdFx0XHRcdGNoZWNrZWRPcHRpb25zW2tleV0gPSBrZXkgPT09ICdpdGVtcycgPyB0aGlzLl92YWxpZGF0ZUl0ZW1zKGNoZWNrZWRPcHRpb25zW2tleV0pIDogY2hlY2tlZE9wdGlvbnNba2V5XTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGNoZWNrZWRPcHRpb25zW2tleV0gPSBzZXRSaWdodE9wdGlvbihtb2NrZWRUeXBlc1trZXldLCBrZXkpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gZWxzZSBpZiAobW9ja2VkVHlwZXNba2V5XSA9PT0gJ2Jvb2xlYW4nICYmIHR5cGVvZiBjaGVja2VkT3B0aW9uc1trZXldICE9PSAnYm9vbGVhbicpIHtcclxuXHRcdFx0XHRcdGNoZWNrZWRPcHRpb25zW2tleV0gPSBzZXRSaWdodE9wdGlvbihtb2NrZWRUeXBlc1trZXldLCBrZXkpO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAobW9ja2VkVHlwZXNba2V5XSA9PT0gJ251bWJlcnxib29sZWFuJyAmJiAhdGhpcy5faXNOdW1iZXJPckJvb2xlYW4oY2hlY2tlZE9wdGlvbnNba2V5XSkpIHtcclxuXHRcdFx0XHRcdGNoZWNrZWRPcHRpb25zW2tleV0gPSBzZXRSaWdodE9wdGlvbihtb2NrZWRUeXBlc1trZXldLCBrZXkpO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAobW9ja2VkVHlwZXNba2V5XSA9PT0gJ251bWJlcnxzdHJpbmcnICYmICF0aGlzLl9pc051bWJlck9yU3RyaW5nKGNoZWNrZWRPcHRpb25zW2tleV0pKSB7XHJcblx0XHRcdFx0XHRjaGVja2VkT3B0aW9uc1trZXldID0gc2V0UmlnaHRPcHRpb24obW9ja2VkVHlwZXNba2V5XSwga2V5KTtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKG1vY2tlZFR5cGVzW2tleV0gPT09ICdzdHJpbmd8Ym9vbGVhbicgJiYgIXRoaXMuX2lzU3RyaW5nT3JCb29sZWFuKGNoZWNrZWRPcHRpb25zW2tleV0pKSB7XHJcblx0XHRcdFx0XHRjaGVja2VkT3B0aW9uc1trZXldID0gc2V0UmlnaHRPcHRpb24obW9ja2VkVHlwZXNba2V5XSwga2V5KTtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKG1vY2tlZFR5cGVzW2tleV0gPT09ICdzdHJpbmdbXScpIHtcclxuXHRcdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KGNoZWNrZWRPcHRpb25zW2tleV0pKSB7XHJcblx0XHRcdFx0XHRcdGxldCBpc1N0cmluZyA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRjaGVja2VkT3B0aW9uc1trZXldLmZvckVhY2goZWxlbWVudCA9PiB7XHJcblx0XHRcdFx0XHRcdFx0aXNTdHJpbmcgPSB0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycgPyB0cnVlIDogZmFsc2U7XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRpZiAoIWlzU3RyaW5nKSB7IGNoZWNrZWRPcHRpb25zW2tleV0gPSBzZXRSaWdodE9wdGlvbihtb2NrZWRUeXBlc1trZXldLCBrZXkpIH07XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRjaGVja2VkT3B0aW9uc1trZXldID0gc2V0UmlnaHRPcHRpb24obW9ja2VkVHlwZXNba2V5XSwga2V5KTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gY2hlY2tlZE9wdGlvbnM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3Mgb3B0aW9uIGl0ZW1zIHNldCBieSB1c2VyIGFuZCBpZiBpdCBiaWdnZXIgdGhhbiBudW1iZXIgb2Ygc2xpZGVzIHRoZW4gcmV0dXJucyBudW1iZXIgb2Ygc2xpZGVzXHJcblx0ICogQHBhcmFtIGl0ZW1zIG9wdGlvbiBpdGVtcyBzZXQgYnkgdXNlclxyXG5cdCAqIEByZXR1cm5zIHJpZ2h0IG51bWJlciBvZiBpdGVtc1xyXG5cdCAqL1xyXG5cdHByaXZhdGUgX3ZhbGlkYXRlSXRlbXMoaXRlbXM6IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRsZXQgcmVzdWx0OiBudW1iZXI7XHJcblx0XHRpZiAoaXRlbXMgPiB0aGlzLl9pdGVtcy5sZW5ndGgpIHtcclxuXHRcdFx0cmVzdWx0ID0gdGhpcy5faXRlbXMubGVuZ3RoO1xyXG5cdFx0XHR0aGlzLmxvZ2dlci5sb2coJ1RoZSBvcHRpb24gXFwnaXRlbXNcXCcgaW4geW91ciBvcHRpb25zIGlzIGJpZ2dlciB0aGFuIHRoZSBudW1iZXIgb2Ygc2xpZGVzLiBUaGlzIG9wdGlvbiBpcyB1cGRhdGVkIHRvIHRoZSBjdXJyZW50IG51bWJlciBvZiBzbGlkZXMgYW5kIHRoZSBuYXZpZ2F0aW9uIGdvdCBkaXNhYmxlZCcpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aWYgKGl0ZW1zID09PSB0aGlzLl9pdGVtcy5sZW5ndGggJiYgKHRoaXMuc2V0dGluZ3MuZG90cyB8fCB0aGlzLnNldHRpbmdzLm5hdikpIHtcclxuXHRcdFx0XHR0aGlzLmxvZ2dlci5sb2coJ09wdGlvbiBcXCdpdGVtc1xcJyBpbiB5b3VyIG9wdGlvbnMgaXMgZXF1YWwgdG8gdGhlIG51bWJlciBvZiBzbGlkZXMuIFNvIHRoZSBuYXZpZ2F0aW9uIGdvdCBkaXNhYmxlZCcpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJlc3VsdCA9IGl0ZW1zO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldCBjdXJyZW50IHdpZHRoIG9mIGNhcm91c2VsXHJcblx0ICogQHBhcmFtIHdpZHRoIHdpZHRoIG9mIGNhcm91c2VsIFdpbmRvd1xyXG5cdCAqL1xyXG5cdHNldENhcm91c2VsV2lkdGgod2lkdGg6IG51bWJlcikge1xyXG5cdFx0dGhpcy5fd2lkdGggPSB3aWR0aDtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIFNldHVwcyB0aGUgY3VycmVudCBzZXR0aW5ncy5cclxuXHQgKiBAdG9kbyBSZW1vdmUgcmVzcG9uc2l2ZSBjbGFzc2VzLiBXaHkgc2hvdWxkIGFkYXB0aXZlIGRlc2lnbnMgYmUgYnJvdWdodCBpbnRvIElFOD9cclxuXHQgKiBAdG9kbyBTdXBwb3J0IGZvciBtZWRpYSBxdWVyaWVzIGJ5IHVzaW5nIGBtYXRjaE1lZGlhYCB3b3VsZCBiZSBuaWNlLlxyXG5cdCAqIEBwYXJhbSBjYXJvdXNlbFdpZHRoIHdpZHRoIG9mIGNhcm91c2VsXHJcblx0ICogQHBhcmFtIHNsaWRlcyBhcnJheSBvZiBzbGlkZXNcclxuXHQgKiBAcGFyYW0gb3B0aW9ucyBvcHRpb25zIHNldCBieSB1c2VyXHJcblx0ICovXHJcbiAgc2V0dXAoY2Fyb3VzZWxXaWR0aDogbnVtYmVyLCBzbGlkZXM6IENhcm91c2VsU2xpZGVEaXJlY3RpdmVbXSwgb3B0aW9uczogT3dsT3B0aW9ucykge1xyXG5cdFx0dGhpcy5zZXRDYXJvdXNlbFdpZHRoKGNhcm91c2VsV2lkdGgpO1xyXG5cdFx0dGhpcy5zZXRJdGVtcyhzbGlkZXMpO1xyXG5cdFx0dGhpcy5fZGVmaW5lU2xpZGVzRGF0YSgpO1xyXG5cdFx0dGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSB7IC4uLnRoaXMuX29wdGlvbnN9O1xyXG5cclxuXHRcdHRoaXMuc2V0Vmlld3BvcnRJdGVtc04oKTtcclxuXHJcblx0XHR0aGlzLl90cmlnZ2VyKCdjaGFuZ2UnLCB7IHByb3BlcnR5OiB7IG5hbWU6ICdzZXR0aW5ncycsIHZhbHVlOiB0aGlzLnNldHRpbmdzIH0gfSk7XHJcblx0XHR0aGlzLmludmFsaWRhdGUoJ3NldHRpbmdzJyk7IC8vIG11c3QgYmUgY2FsbCBvZiB0aGlzIGZ1bmN0aW9uO1xyXG5cdFx0dGhpcy5fdHJpZ2dlcignY2hhbmdlZCcsIHsgcHJvcGVydHk6IHsgbmFtZTogJ3NldHRpbmdzJywgdmFsdWU6IHRoaXMuc2V0dGluZ3MgfSB9KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldCBudW1iZXIgb2YgaXRlbXMgZm9yIGN1cnJlbnQgdmlld3BvcnRcclxuXHQgKi9cclxuXHRzZXRWaWV3cG9ydEl0ZW1zTigpIHtcclxuXHRcdGNvbnN0IHZpZXdwb3J0ID0gdGhpcy5fd2lkdGgsXHJcblx0XHRcdG92ZXJ3cml0ZXMgPSB0aGlzLl9vcHRpb25zLnJlc3BvbnNpdmU7XHJcblx0XHRsZXRcdG1hdGNoID0gLTE7XHJcblxyXG5cdFx0aWYgKCFPYmplY3Qua2V5cyhvdmVyd3JpdGVzKS5sZW5ndGgpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghdmlld3BvcnQpIHtcclxuXHRcdFx0dGhpcy5zZXR0aW5ncy5pdGVtcyA9IDE7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRmb3IgKGNvbnN0IGtleSBpbiBvdmVyd3JpdGVzKSB7XHJcblx0XHRcdGlmIChvdmVyd3JpdGVzLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuXHRcdFx0XHRpZiAoK2tleSA8PSB2aWV3cG9ydCAmJiAra2V5ID4gbWF0Y2gpIHtcclxuXHRcdFx0XHRcdG1hdGNoID0gTnVtYmVyKGtleSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IHsgLi4udGhpcy5zZXR0aW5ncywgaXRlbXM6IHRoaXMuX3ZhbGlkYXRlSXRlbXMob3ZlcndyaXRlc1ttYXRjaF0uaXRlbXMpfTtcclxuXHRcdC8vIGlmICh0eXBlb2YgdGhpcy5zZXR0aW5ncy5zdGFnZVBhZGRpbmcgPT09ICdmdW5jdGlvbicpIHtcclxuXHRcdC8vIFx0dGhpcy5zZXR0aW5ncy5zdGFnZVBhZGRpbmcgPSB0aGlzLnNldHRpbmdzLnN0YWdlUGFkZGluZygpO1xyXG5cdFx0Ly8gfVxyXG5cdFx0ZGVsZXRlIHRoaXMuc2V0dGluZ3MucmVzcG9uc2l2ZTtcclxuXHRcdHRoaXMub3dsRE9NRGF0YS5pc1Jlc3BvbnNpdmUgPSB0cnVlO1xyXG5cdFx0dGhpcy5fYnJlYWtwb2ludCA9IG1hdGNoO1xyXG5cclxuXHRcdHRoaXMuaW52YWxpZGF0ZSgnc2V0dGluZ3MnKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluaXRpYWxpemVzIHRoZSBjYXJvdXNlbC5cclxuXHQgKiBAcGFyYW0gc2xpZGVzIGFycmF5IG9mIENhcm91c2VsU2xpZGVEaXJlY3RpdmVcclxuXHQgKi9cclxuICBpbml0aWFsaXplKHNsaWRlczogQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZVtdKSB7XHJcblx0XHR0aGlzLmVudGVyKCdpbml0aWFsaXppbmcnKTtcclxuXHRcdC8vIHRoaXMudHJpZ2dlcignaW5pdGlhbGl6ZScpO1xyXG5cclxuXHRcdHRoaXMub3dsRE9NRGF0YS5ydGwgPSB0aGlzLnNldHRpbmdzLnJ0bDtcclxuXHJcblx0XHRzbGlkZXMuZm9yRWFjaChpdGVtID0+IHtcclxuXHRcdFx0Y29uc3QgbWVyZ2VOOiBudW1iZXIgPSB0aGlzLnNldHRpbmdzLm1lcmdlID8gaXRlbS5kYXRhTWVyZ2UgOiAxO1xyXG5cdFx0XHR0aGlzLl9tZXJnZXJzLnB1c2gobWVyZ2VOKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHRoaXMucmVzZXQodGhpcy5faXNOdW1lcmljKHRoaXMuc2V0dGluZ3Muc3RhcnRQb3NpdGlvbikgPyArdGhpcy5zZXR0aW5ncy5zdGFydFBvc2l0aW9uIDogMCk7XHJcblxyXG5cdFx0dGhpcy5pbnZhbGlkYXRlKCdpdGVtcycpO1xyXG5cdFx0dGhpcy5yZWZyZXNoKCk7XHJcblxyXG5cdFx0dGhpcy5vd2xET01EYXRhLmlzTG9hZGVkID0gdHJ1ZTtcclxuXHRcdHRoaXMub3dsRE9NRGF0YS5pc01vdXNlRHJhZ2FibGUgPSB0aGlzLnNldHRpbmdzLm1vdXNlRHJhZztcclxuXHRcdHRoaXMub3dsRE9NRGF0YS5pc1RvdWNoRHJhZ2FibGUgPSB0aGlzLnNldHRpbmdzLnRvdWNoRHJhZztcclxuXHJcblx0XHR0aGlzLnNlbmRDaGFuZ2VzKCk7XHJcblxyXG5cdFx0dGhpcy5sZWF2ZSgnaW5pdGlhbGl6aW5nJyk7XHJcblx0XHR0aGlzLl90cmlnZ2VyKCdpbml0aWFsaXplZCcpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNlbmRzIGFsbCBkYXRhIG5lZWRlZCBmb3IgVmlld1xyXG5cdCAqL1xyXG5cdHNlbmRDaGFuZ2VzKCkge1xyXG5cdFx0dGhpcy5fdmlld1NldHRpbmdzU2hpcHBlciQubmV4dCh7XHJcblx0XHRcdG93bERPTURhdGE6IHRoaXMub3dsRE9NRGF0YSxcclxuXHRcdFx0c3RhZ2VEYXRhOiB0aGlzLnN0YWdlRGF0YSxcclxuXHRcdFx0c2xpZGVzRGF0YTogdGhpcy5zbGlkZXNEYXRhLFxyXG5cdFx0XHRuYXZEYXRhOiB0aGlzLm5hdkRhdGEsXHJcblx0XHRcdGRvdHNEYXRhOiB0aGlzLmRvdHNEYXRhXHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cclxuICAvKipcclxuXHQgKiBVcGRhdGVzIG9wdGlvbiBsb2dpYyBpZiBuZWNlc3NlcnlcclxuXHQgKi9cclxuICBwcml2YXRlIF9vcHRpb25zTG9naWMoKSB7XHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5hdXRvV2lkdGgpIHtcclxuXHRcdFx0dGhpcy5zZXR0aW5ncy5zdGFnZVBhZGRpbmcgPSAwO1xyXG5cdFx0XHR0aGlzLnNldHRpbmdzLm1lcmdlID0gZmFsc2U7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGVzIHRoZSB2aWV3XHJcbiAgICovXHJcbiAgdXBkYXRlKCkge1xyXG4gICAgbGV0IGkgPSAwO1xyXG4gICAgY29uc3QgbiA9IHRoaXMuX3BpcGUubGVuZ3RoLFxyXG4gICAgICBmaWx0ZXIgPSBpdGVtID0+IHRoaXMuX2ludmFsaWRhdGVkW2l0ZW1dLFxyXG5cdFx0XHRjYWNoZSA9IHt9O1xyXG5cclxuICAgIHdoaWxlIChpIDwgbikge1xyXG4gICAgICBjb25zdCBmaWx0ZXJlZFBpcGUgPSB0aGlzLl9waXBlW2ldLmZpbHRlci5maWx0ZXIoZmlsdGVyKTtcclxuICAgICAgaWYgKHRoaXMuX2ludmFsaWRhdGVkLmFsbCB8fCBmaWx0ZXJlZFBpcGUubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdHRoaXMuX3BpcGVbaV0ucnVuKGNhY2hlKTtcclxuICAgICAgfVxyXG4gICAgICBpKys7XHJcblx0XHR9XHJcblx0XHR0aGlzLnNsaWRlc0RhdGEuZm9yRWFjaChzbGlkZSA9PiBzbGlkZS5jbGFzc2VzID0gdGhpcy5zZXRDdXJTbGlkZUNsYXNzZXMoc2xpZGUpKTtcclxuXHRcdHRoaXMuc2VuZENoYW5nZXMoKTtcclxuXHJcbiAgICB0aGlzLl9pbnZhbGlkYXRlZCA9IHt9O1xyXG5cclxuICAgIGlmICghdGhpcy5pcygndmFsaWQnKSkge1xyXG4gICAgICB0aGlzLmVudGVyKCd2YWxpZCcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcblx0ICogR2V0cyB0aGUgd2lkdGggb2YgdGhlIHZpZXcuXHJcblx0ICogQHBhcmFtIFtkaW1lbnNpb249V2lkdGguRGVmYXVsdF0gVGhlIGRpbWVuc2lvbiB0byByZXR1cm5cclxuXHQgKiBAcmV0dXJucyBUaGUgd2lkdGggb2YgdGhlIHZpZXcgaW4gcGl4ZWwuXHJcblx0ICovXHJcbiAgd2lkdGgoZGltZW5zaW9uPzogV2lkdGgpOiBudW1iZXIge1xyXG5cdFx0ZGltZW5zaW9uID0gZGltZW5zaW9uIHx8IFdpZHRoLkRlZmF1bHQ7XHJcblx0XHRzd2l0Y2ggKGRpbWVuc2lvbikge1xyXG5cdFx0XHRjYXNlIFdpZHRoLklubmVyOlxyXG5cdFx0XHRjYXNlIFdpZHRoLk91dGVyOlxyXG5cdFx0XHRcdHJldHVybiB0aGlzLl93aWR0aDtcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5fd2lkdGggLSB0aGlzLnNldHRpbmdzLnN0YWdlUGFkZGluZyAqIDIgKyB0aGlzLnNldHRpbmdzLm1hcmdpbjtcclxuXHRcdH1cclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIFJlZnJlc2hlcyB0aGUgY2Fyb3VzZWwgcHJpbWFyaWx5IGZvciBhZGFwdGl2ZSBwdXJwb3Nlcy5cclxuXHQgKi9cclxuICByZWZyZXNoKCkge1xyXG5cdFx0dGhpcy5lbnRlcigncmVmcmVzaGluZycpO1xyXG5cdFx0dGhpcy5fdHJpZ2dlcigncmVmcmVzaCcpO1xyXG5cdFx0dGhpcy5fZGVmaW5lU2xpZGVzRGF0YSgpO1xyXG5cdFx0dGhpcy5zZXRWaWV3cG9ydEl0ZW1zTigpO1xyXG5cclxuXHRcdHRoaXMuX29wdGlvbnNMb2dpYygpO1xyXG5cclxuXHRcdC8vIHRoaXMuJGVsZW1lbnQuYWRkQ2xhc3ModGhpcy5vcHRpb25zLnJlZnJlc2hDbGFzcyk7XHJcblxyXG5cdFx0dGhpcy51cGRhdGUoKTtcclxuXHJcblx0XHQvLyB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKHRoaXMub3B0aW9ucy5yZWZyZXNoQ2xhc3MpO1xyXG5cclxuXHRcdHRoaXMubGVhdmUoJ3JlZnJlc2hpbmcnKTtcclxuXHRcdHRoaXMuX3RyaWdnZXIoJ3JlZnJlc2hlZCcpO1xyXG5cdCB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIENoZWNrcyB3aW5kb3cgYHJlc2l6ZWAgZXZlbnQuXHJcblx0ICogQHBhcmFtIGN1cldpZHRoIHdpZHRoIG9mIC5vd2wtY2Fyb3VzZWxcclxuXHQgKi9cclxuICBvblJlc2l6ZShjdXJXaWR0aDogbnVtYmVyKSB7XHJcblx0XHRpZiAoIXRoaXMuX2l0ZW1zLmxlbmd0aCkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXRDYXJvdXNlbFdpZHRoKGN1cldpZHRoKTtcclxuXHJcblx0XHR0aGlzLmVudGVyKCdyZXNpemluZycpO1xyXG5cclxuXHRcdC8vIGlmICh0aGlzLnRyaWdnZXIoJ3Jlc2l6ZScpLmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XHJcblx0XHQvLyBcdHRoaXMubGVhdmUoJ3Jlc2l6aW5nJyk7XHJcblx0XHQvLyBcdHJldHVybiBmYWxzZTtcclxuXHRcdC8vIH1cclxuXHRcdHRoaXMuX3RyaWdnZXIoJ3Jlc2l6ZScpO1xyXG5cdFx0dGhpcy5pbnZhbGlkYXRlKCd3aWR0aCcpO1xyXG5cclxuXHRcdHRoaXMucmVmcmVzaCgpO1xyXG5cclxuXHRcdHRoaXMubGVhdmUoJ3Jlc2l6aW5nJyk7XHJcblx0XHR0aGlzLl90cmlnZ2VyKCdyZXNpemVkJyk7XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBQcmVwYXJlcyBkYXRhIGZvciBkcmFnZ2luZyBjYXJvdXNlbC4gSXQgc3RhcnRzIGFmdGVyIGZpcmluZyBgdG91Y2hzdGFydGAgYW5kIGBtb3VzZWRvd25gIGV2ZW50cy5cclxuXHQgKiBAdG9kbyBIb3Jpem9udGFsIHN3aXBlIHRocmVzaG9sZCBhcyBvcHRpb25cclxuXHQgKiBAdG9kbyAjMjYxXHJcblx0ICogQHBhcmFtIGV2ZW50IC0gVGhlIGV2ZW50IGFyZ3VtZW50cy5cclxuXHQgKiBAcmV0dXJucyBzdGFnZSAtIG9iamVjdCB3aXRoICd4JyBhbmQgJ3knIGNvb3JkaW5hdGVzIG9mIC5vd2wtc3RhZ2VcclxuXHQgKi9cclxuICBwcmVwYXJlRHJhZ2dpbmcoZXZlbnQ6IGFueSk6IENvb3JkcyB7XHJcblx0XHRsZXQgc3RhZ2U6IENvb3JkcyA9IG51bGwsXHJcblx0XHRcdFx0dHJhbnNmb3JtQXJyOiBzdHJpbmdbXTtcclxuXHJcblx0XHQvLyBjb3VsZCBiZSA1IGNvbW1lbnRlZCBsaW5lcyBiZWxvdzsgSG93ZXZlciB0aGVyZSdzIHN0YWdlIHRyYW5zZm9ybSBpbiBzdGFnZURhdGEgYW5kIGluIHVwZGF0ZXMgYWZ0ZXIgZWFjaCBtb3ZlIG9mIHN0YWdlXHJcbiAgICAvLyBzdGFnZSA9IGdldENvbXB1dGVkU3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50KS50cmFuc2Zvcm0ucmVwbGFjZSgvLipcXCh8XFwpfCAvZywgJycpLnNwbGl0KCcsJyk7XHJcbiAgICAvLyBzdGFnZSA9IHtcclxuICAgIC8vICAgeDogc3RhZ2Vbc3RhZ2UubGVuZ3RoID09PSAxNiA/IDEyIDogNF0sXHJcbiAgICAvLyAgIHk6IHN0YWdlW3N0YWdlLmxlbmd0aCA9PT0gMTYgPyAxMyA6IDVdXHJcblx0XHQvLyB9O1xyXG5cclxuXHRcdHRyYW5zZm9ybUFyciA9IHRoaXMuc3RhZ2VEYXRhLnRyYW5zZm9ybS5yZXBsYWNlKC8uKlxcKHxcXCl8IHxbXiwtXFxkXVxcd3xcXCkvZywgJycpLnNwbGl0KCcsJyk7XHJcbiAgICBzdGFnZSA9IHtcclxuICAgICAgeDogK3RyYW5zZm9ybUFyclswXSxcclxuICAgICAgeTogK3RyYW5zZm9ybUFyclsxXVxyXG4gICAgfTtcclxuXHJcblx0XHRpZiAodGhpcy5pcygnYW5pbWF0aW5nJykpIHtcclxuXHRcdFx0dGhpcy5pbnZhbGlkYXRlKCdwb3NpdGlvbicpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChldmVudC50eXBlID09PSAnbW91c2Vkb3duJykge1xyXG4gICAgICB0aGlzLm93bERPTURhdGEuaXNHcmFiID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcblx0XHR0aGlzLnNwZWVkKDApO1xyXG5cdFx0cmV0dXJuIHN0YWdlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRW50ZXJzIGludG8gYSAnZHJhZ2dpbmcnIHN0YXRlXHJcblx0ICovXHJcblx0ZW50ZXJEcmFnZ2luZygpIHtcclxuXHRcdHRoaXMuZW50ZXIoJ2RyYWdnaW5nJyk7XHJcbiAgICB0aGlzLl90cmlnZ2VyKCdkcmFnJyk7XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBEZWZpbmVzIG5ldyBjb29yZHMgZm9yIC5vd2wtc3RhZ2Ugd2hpbGUgZHJhZ2dpbmcgaXRcclxuXHQgKiBAdG9kbyAjMjYxXHJcblx0ICogQHBhcmFtIGV2ZW50IHRoZSBldmVudCBhcmd1bWVudHMuXHJcblx0ICogQHBhcmFtIGRyYWdEYXRhIGluaXRpYWwgZGF0YSBnb3QgYWZ0ZXIgc3RhcnRpbmcgZHJhZ2dpbmdcclxuXHQgKiBAcmV0dXJucyBjb29yZHMgb3IgZmFsc2VcclxuXHQgKi9cclxuICBkZWZpbmVOZXdDb29yZHNEcmFnKGV2ZW50OiBhbnksIGRyYWdEYXRhOiBhbnkpOiBib29sZWFuIHwgQ29vcmRzIHtcclxuXHRcdGxldCBtaW5pbXVtID0gbnVsbCxcclxuXHRcdG1heGltdW0gPSBudWxsLFxyXG5cdFx0cHVsbCA9IG51bGw7XHJcblx0XHRjb25zdFx0ZGVsdGEgPSB0aGlzLmRpZmZlcmVuY2UoZHJhZ0RhdGEucG9pbnRlciwgdGhpcy5wb2ludGVyKGV2ZW50KSksXHJcblx0XHRcdHN0YWdlID0gdGhpcy5kaWZmZXJlbmNlKGRyYWdEYXRhLnN0YWdlLnN0YXJ0LCBkZWx0YSk7XHJcblxyXG5cdFx0aWYgKCF0aGlzLmlzKCdkcmFnZ2luZycpKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5sb29wKSB7XHJcblx0XHRcdG1pbmltdW0gPSB0aGlzLmNvb3JkaW5hdGVzKHRoaXMubWluaW11bSgpKTtcclxuXHRcdFx0bWF4aW11bSA9ICt0aGlzLmNvb3JkaW5hdGVzKHRoaXMubWF4aW11bSgpICsgMSkgLSBtaW5pbXVtO1xyXG5cdFx0XHRzdGFnZS54ID0gKCgoc3RhZ2UueCAtIG1pbmltdW0pICUgbWF4aW11bSArIG1heGltdW0pICUgbWF4aW11bSkgKyBtaW5pbXVtO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bWluaW11bSA9IHRoaXMuc2V0dGluZ3MucnRsID8gdGhpcy5jb29yZGluYXRlcyh0aGlzLm1heGltdW0oKSkgOiB0aGlzLmNvb3JkaW5hdGVzKHRoaXMubWluaW11bSgpKTtcclxuXHRcdFx0bWF4aW11bSA9IHRoaXMuc2V0dGluZ3MucnRsID8gdGhpcy5jb29yZGluYXRlcyh0aGlzLm1pbmltdW0oKSkgOiB0aGlzLmNvb3JkaW5hdGVzKHRoaXMubWF4aW11bSgpKTtcclxuXHRcdFx0cHVsbCA9IHRoaXMuc2V0dGluZ3MucHVsbERyYWcgPyAtMSAqIGRlbHRhLnggLyA1IDogMDtcclxuXHRcdFx0c3RhZ2UueCA9IE1hdGgubWF4KE1hdGgubWluKHN0YWdlLngsIG1pbmltdW0gKyBwdWxsKSwgbWF4aW11bSArIHB1bGwpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBzdGFnZTtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEZpbmlzaGVzIGRyYWdnaW5nIG9mIGNhcm91c2VsIHdoZW4gYHRvdWNoZW5kYCBhbmQgYG1vdXNldXBgIGV2ZW50cyBmaXJlLlxyXG5cdCAqIEB0b2RvICMyNjFcclxuXHQgKiBAdG9kbyBUaHJlc2hvbGQgZm9yIGNsaWNrIGV2ZW50XHJcblx0ICogQHBhcmFtIGV2ZW50IHRoZSBldmVudCBhcmd1bWVudHMuXHJcblx0ICogQHBhcmFtIGRyYWdPYmogdGhlIG9iamVjdCB3aXRoIGRyYWdnaW5nIHNldHRpbmdzIGFuZCBzdGF0ZXNcclxuXHQgKiBAcGFyYW0gY2xpY2tBdHRhY2hlciBmdW5jdGlvbiB3aGljaCBhdHRhY2hlcyBjbGljayBoYW5kbGVyIHRvIHNsaWRlIG9yIGl0cyBjaGlsZHJlbiBlbGVtZW50cyBpbiBvcmRlciB0byBwcmV2ZW50IGV2ZW50IGJ1YmxpbmdcclxuXHQgKi9cclxuICBmaW5pc2hEcmFnZ2luZyhldmVudDogYW55LCBkcmFnT2JqOiBhbnksIGNsaWNrQXR0YWNoZXI6ICgpID0+IHZvaWQpIHtcclxuXHRcdGNvbnN0IGRlbHRhID0gdGhpcy5kaWZmZXJlbmNlKGRyYWdPYmoucG9pbnRlciwgdGhpcy5wb2ludGVyKGV2ZW50KSksXHJcbiAgICAgICAgc3RhZ2UgPSBkcmFnT2JqLnN0YWdlLmN1cnJlbnQsXHJcblx0XHRcdFx0ZGlyZWN0aW9uID0gZGVsdGEueCA+ICt0aGlzLnNldHRpbmdzLnJ0bCA/ICdsZWZ0JyA6ICdyaWdodCc7XHJcblx0XHRsZXQgY3VycmVudFNsaWRlSTogbnVtYmVyLCBjdXJyZW50OiBudW1iZXIsIG5ld0N1cnJlbnQ6IG51bWJlcjtcclxuXHJcbiAgICAgIGlmIChkZWx0YS54ICE9PSAwICYmIHRoaXMuaXMoJ2RyYWdnaW5nJykgfHwgIXRoaXMuaXMoJ3ZhbGlkJykpIHtcclxuICAgICAgICB0aGlzLnNwZWVkKCt0aGlzLnNldHRpbmdzLmRyYWdFbmRTcGVlZCB8fCB0aGlzLnNldHRpbmdzLnNtYXJ0U3BlZWQpO1xyXG5cdFx0XHRcdGN1cnJlbnRTbGlkZUkgPSB0aGlzLmNsb3Nlc3Qoc3RhZ2UueCwgZGVsdGEueCAhPT0gMCA/IGRpcmVjdGlvbiA6IGRyYWdPYmouZGlyZWN0aW9uKTtcclxuXHRcdFx0XHRjdXJyZW50ID0gdGhpcy5jdXJyZW50KCk7XHJcbiAgICAgICAgbmV3Q3VycmVudCA9IHRoaXMuY3VycmVudChjdXJyZW50U2xpZGVJID09PSAtMSA/IHVuZGVmaW5lZCA6IGN1cnJlbnRTbGlkZUkpO1xyXG5cclxuXHRcdFx0XHRpZiAoY3VycmVudCAhPT0gbmV3Q3VycmVudCkge1xyXG5cdFx0XHRcdFx0dGhpcy5pbnZhbGlkYXRlKCdwb3NpdGlvbicpO1xyXG5cdFx0XHRcdFx0dGhpcy51cGRhdGUoKTtcclxuXHRcdFx0XHR9XHJcblxyXG4gICAgICAgIGRyYWdPYmouZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xyXG5cclxuICAgICAgICBpZiAoTWF0aC5hYnMoZGVsdGEueCkgPiAzIHx8IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gZHJhZ09iai50aW1lID4gMzAwKSB7XHJcblx0XHRcdFx0XHRjbGlja0F0dGFjaGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmICghdGhpcy5pcygnZHJhZ2dpbmcnKSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cdFx0XHR0aGlzLmxlYXZlKCdkcmFnZ2luZycpO1xyXG5cdFx0XHR0aGlzLl90cmlnZ2VyKCdkcmFnZ2VkJylcclxuXHQgfVxyXG5cclxuICAvKipcclxuXHQgKiBHZXRzIGFic29sdXRlIHBvc2l0aW9uIG9mIHRoZSBjbG9zZXN0IGl0ZW0gZm9yIGEgY29vcmRpbmF0ZS5cclxuXHQgKiBAdG9kbyBTZXR0aW5nIGBmcmVlRHJhZ2AgbWFrZXMgYGNsb3Nlc3RgIG5vdCByZXVzYWJsZS4gU2VlICMxNjUuXHJcblx0ICogQHBhcmFtIGNvb3JkaW5hdGUgVGhlIGNvb3JkaW5hdGUgaW4gcGl4ZWwuXHJcblx0ICogQHBhcmFtIGRpcmVjdGlvbiBUaGUgZGlyZWN0aW9uIHRvIGNoZWNrIGZvciB0aGUgY2xvc2VzdCBpdGVtLiBFdGhlciBgbGVmdGAgb3IgYHJpZ2h0YC5cclxuXHQgKiBAcmV0dXJucyBUaGUgYWJzb2x1dGUgcG9zaXRpb24gb2YgdGhlIGNsb3Nlc3QgaXRlbS5cclxuXHQgKi9cclxuICBjbG9zZXN0KGNvb3JkaW5hdGU6IG51bWJlciwgZGlyZWN0aW9uOiBzdHJpbmcpOiBudW1iZXIge1xyXG5cdFx0Y29uc3QgcHVsbCA9IDMwLFxyXG5cdFx0XHR3aWR0aCA9IHRoaXMud2lkdGgoKTtcclxuXHRcdGxldFx0Y29vcmRpbmF0ZXM6IG51bWJlcltdID0gdGhpcy5jb29yZGluYXRlcygpIGFzIG51bWJlcltdLFxyXG5cdFx0IHBvc2l0aW9uID0gLTE7XHJcblxyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3MuY2VudGVyKSB7XHJcblx0XHRcdGNvb3JkaW5hdGVzID0gY29vcmRpbmF0ZXMubWFwKGl0ZW0gPT4ge1xyXG5cdFx0XHRcdGlmIChpdGVtID09PSAwKSB7XHJcblx0XHRcdFx0XHRpdGVtICs9IDAuMDAwMDAxO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gaXRlbTtcclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHJcblx0XHQvLyBvcHRpb24gJ2ZyZWVEcmFnJyBkb2Vzbid0IGhhdmUgcmVhbGl6YXRpb24gYW5kIHVzaW5nIGl0IGhlcmUgY3JlYXRlcyBwcm9ibGVtOlxyXG5cdFx0Ly8gdmFyaWFibGUgJ3Bvc2l0aW9uJyBzdGF5cyB1bmNoYW5nZWQgKGl0IGVxdWFscyAtMSBhdCB0aGUgYmVnZ2luZykgYW5kIHRodXMgbWV0aG9kIHJldHVybnMgLTFcclxuXHRcdC8vIFJldHVybmluZyB2YWx1ZSBpcyBjb25zdW1lZCBieSBtZXRob2QgY3VycmVudCgpLCB3aGljaCB0YWtpbmcgLTEgYXMgYXJndW1lbnQgY2FsY3VsYXRlcyB0aGUgaW5kZXggb2YgbmV3IGN1cnJlbnQgc2xpZGVcclxuXHRcdC8vIEluIGNhc2Ugb2YgaGF2aW5nIDUgc2xpZGVzIGFucyAnbG9vcD1mYWxzZTsgY2FsbGluZyAnY3VycmVudCgtMSknIHNldHMgcHJvcHMgJ19jdXJyZW50JyBhcyA0LiBKdXN0IGxhc3Qgc2xpZGUgcmVtYWlucyB2aXNpYmxlIGluc3RlYWQgb2YgMyBsYXN0IHNsaWRlcy5cclxuXHJcblx0XHQvLyBpZiAoIXRoaXMuc2V0dGluZ3MuZnJlZURyYWcpIHtcclxuXHRcdFx0Ly8gY2hlY2sgY2xvc2VzdCBpdGVtXHJcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgY29vcmRpbmF0ZXMubGVuZ3RoOyBpKyspIHtcclxuXHJcblx0XHRcdFx0aWYgKGRpcmVjdGlvbiA9PT0gJ2xlZnQnICYmIGNvb3JkaW5hdGUgPiBjb29yZGluYXRlc1tpXSAtIHB1bGwgJiYgY29vcmRpbmF0ZSA8IGNvb3JkaW5hdGVzW2ldICsgcHVsbCkge1xyXG5cdFx0XHRcdFx0cG9zaXRpb24gPSBpO1xyXG5cdFx0XHRcdC8vIG9uIGEgcmlnaHQgcHVsbCwgY2hlY2sgb24gcHJldmlvdXMgaW5kZXhcclxuXHRcdFx0XHQvLyB0byBkbyBzbywgc3VidHJhY3Qgd2lkdGggZnJvbSB2YWx1ZSBhbmQgc2V0IHBvc2l0aW9uID0gaW5kZXggKyAxXHJcblx0XHRcdFx0fSBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICdyaWdodCcgJiYgY29vcmRpbmF0ZSA+IGNvb3JkaW5hdGVzW2ldIC0gd2lkdGggLSBwdWxsICYmIGNvb3JkaW5hdGUgPCBjb29yZGluYXRlc1tpXSAtIHdpZHRoICsgcHVsbCkge1xyXG5cdFx0XHRcdFx0cG9zaXRpb24gPSBpICsgMTtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKHRoaXMuX29wKGNvb3JkaW5hdGUsICc8JywgY29vcmRpbmF0ZXNbaV0pXHJcblx0XHRcdFx0XHQmJiB0aGlzLl9vcChjb29yZGluYXRlLCAnPicsIGNvb3JkaW5hdGVzW2kgKyAxXSB8fCBjb29yZGluYXRlc1tpXSAtIHdpZHRoKSkge1xyXG5cdFx0XHRcdFx0cG9zaXRpb24gPSBkaXJlY3Rpb24gPT09ICdsZWZ0JyA/IGkgKyAxIDogaTtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gbnVsbCAmJiBjb29yZGluYXRlID4gY29vcmRpbmF0ZXNbaV0gLSBwdWxsICYmIGNvb3JkaW5hdGUgPCBjb29yZGluYXRlc1tpXSArIHB1bGwpIHtcclxuXHRcdFx0XHRcdHBvc2l0aW9uID0gaTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChwb3NpdGlvbiAhPT0gLTEpIHsgYnJlYWsgfTtcclxuXHRcdFx0fVxyXG5cdFx0Ly8gfVxyXG5cclxuXHRcdGlmICghdGhpcy5zZXR0aW5ncy5sb29wKSB7XHJcblx0XHRcdC8vIG5vbiBsb29wIGJvdW5kcmllc1xyXG5cdFx0XHRpZiAodGhpcy5fb3AoY29vcmRpbmF0ZSwgJz4nLCBjb29yZGluYXRlc1t0aGlzLm1pbmltdW0oKV0pKSB7XHJcblx0XHRcdFx0cG9zaXRpb24gPSBjb29yZGluYXRlID0gdGhpcy5taW5pbXVtKCk7XHJcblx0XHRcdH0gZWxzZSBpZiAodGhpcy5fb3AoY29vcmRpbmF0ZSwgJzwnLCBjb29yZGluYXRlc1t0aGlzLm1heGltdW0oKV0pKSB7XHJcblx0XHRcdFx0cG9zaXRpb24gPSBjb29yZGluYXRlID0gdGhpcy5tYXhpbXVtKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcG9zaXRpb247XHJcblx0IH1cclxuXHJcbiAgLyoqXHJcblx0ICogQW5pbWF0ZXMgdGhlIHN0YWdlLlxyXG5cdCAqIEB0b2RvICMyNzBcclxuXHQgKiBAcGFyYW0gY29vcmRpbmF0ZSBUaGUgY29vcmRpbmF0ZSBpbiBwaXhlbHMuXHJcblx0ICovXHJcbiAgYW5pbWF0ZShjb29yZGluYXRlOiBudW1iZXIgfCBudW1iZXJbXSkge1xyXG5cdFx0Y29uc3QgYW5pbWF0ZSA9IHRoaXMuc3BlZWQoKSA+IDA7XHJcblxyXG5cdFx0aWYgKHRoaXMuaXMoJ2FuaW1hdGluZycpKSB7XHJcblx0XHRcdHRoaXMub25UcmFuc2l0aW9uRW5kKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGFuaW1hdGUpIHtcclxuXHRcdFx0dGhpcy5lbnRlcignYW5pbWF0aW5nJyk7XHJcblx0XHRcdHRoaXMuX3RyaWdnZXIoJ3RyYW5zbGF0ZScpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc3RhZ2VEYXRhLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgnICsgY29vcmRpbmF0ZSArICdweCwwcHgsMHB4KSc7XHJcblx0XHR0aGlzLnN0YWdlRGF0YS50cmFuc2l0aW9uID0gKHRoaXMuc3BlZWQoKSAvIDEwMDApICsgJ3MnO1xyXG5cclxuXHRcdC8vIGFsc28gdGhlcmUgd2FzIHRyYW5zaXRpb24gYnkgbWVhbnMgb2YgSlF1ZXJ5LmFuaW1hdGUgb3IgY3NzLWNoYW5naW5nIHByb3BlcnR5IGxlZnRcclxuXHQgfVxyXG5cclxuICAvKipcclxuXHQgKiBDaGVja3Mgd2hldGhlciB0aGUgY2Fyb3VzZWwgaXMgaW4gYSBzcGVjaWZpYyBzdGF0ZSBvciBub3QuXHJcblx0ICogQHBhcmFtIHN0YXRlIFRoZSBzdGF0ZSB0byBjaGVjay5cclxuXHQgKiBAcmV0dXJucyBUaGUgZmxhZyB3aGljaCBpbmRpY2F0ZXMgaWYgdGhlIGNhcm91c2VsIGlzIGJ1c3kuXHJcblx0ICovXHJcbiAgaXMoc3RhdGU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3N0YXRlcy5jdXJyZW50W3N0YXRlXSAmJiB0aGlzLl9zdGF0ZXMuY3VycmVudFtzdGF0ZV0gPiAwO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG5cdCAqIFNldHMgdGhlIGFic29sdXRlIHBvc2l0aW9uIG9mIHRoZSBjdXJyZW50IGl0ZW0uXHJcblx0ICogQHBhcmFtIHBvc2l0aW9uIFRoZSBuZXcgYWJzb2x1dGUgcG9zaXRpb24gb3Igbm90aGluZyB0byBsZWF2ZSBpdCB1bmNoYW5nZWQuXHJcblx0ICogQHJldHVybnMgVGhlIGFic29sdXRlIHBvc2l0aW9uIG9mIHRoZSBjdXJyZW50IGl0ZW0uXHJcblx0ICovXHJcbiAgY3VycmVudChwb3NpdGlvbj86IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRpZiAocG9zaXRpb24gPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5fY3VycmVudDtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5faXRlbXMubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdHJldHVybiB1bmRlZmluZWQ7XHJcblx0XHR9XHJcblxyXG5cdFx0cG9zaXRpb24gPSB0aGlzLm5vcm1hbGl6ZShwb3NpdGlvbik7XHJcblxyXG5cdFx0aWYgKHRoaXMuX2N1cnJlbnQgIT09IHBvc2l0aW9uKSB7XHJcblx0XHRcdGNvbnN0IGV2ZW50ID0gdGhpcy5fdHJpZ2dlcignY2hhbmdlJywgeyBwcm9wZXJ0eTogeyBuYW1lOiAncG9zaXRpb24nLCB2YWx1ZTogcG9zaXRpb24gfSB9KTtcclxuXHJcblx0XHRcdC8vIGlmIChldmVudC5kYXRhICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0Ly8gXHRwb3NpdGlvbiA9IHRoaXMubm9ybWFsaXplKGV2ZW50LmRhdGEpO1xyXG5cdFx0XHQvLyB9XHJcblxyXG5cdFx0XHR0aGlzLl9jdXJyZW50ID0gcG9zaXRpb247XHJcblxyXG5cdFx0XHR0aGlzLmludmFsaWRhdGUoJ3Bvc2l0aW9uJyk7XHJcblx0XHRcdHRoaXMuX3RyaWdnZXIoJ2NoYW5nZWQnLCB7IHByb3BlcnR5OiB7IG5hbWU6ICdwb3NpdGlvbicsIHZhbHVlOiB0aGlzLl9jdXJyZW50IH0gfSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX2N1cnJlbnQ7XHJcblx0IH1cclxuXHJcbiAgLyoqXHJcblx0ICogSW52YWxpZGF0ZXMgdGhlIGdpdmVuIHBhcnQgb2YgdGhlIHVwZGF0ZSByb3V0aW5lLlxyXG5cdCAqIEBwYXJhbSBwYXJ0IFRoZSBwYXJ0IHRvIGludmFsaWRhdGUuXHJcblx0ICogQHJldHVybnMgVGhlIGludmFsaWRhdGVkIHBhcnRzLlxyXG5cdCAqL1xyXG4gIGludmFsaWRhdGUocGFydDogc3RyaW5nKTogc3RyaW5nW10ge1xyXG5cdFx0aWYgKHR5cGVvZiBwYXJ0ID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aGlzLl9pbnZhbGlkYXRlZFtwYXJ0XSA9IHRydWU7XHJcblx0XHRcdGlmKHRoaXMuaXMoJ3ZhbGlkJykpIHsgdGhpcy5sZWF2ZSgndmFsaWQnKTsgfVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuX2ludmFsaWRhdGVkKTtcclxuICB9O1xyXG5cclxuXHQvKipcclxuXHQgKiBSZXNldHMgdGhlIGFic29sdXRlIHBvc2l0aW9uIG9mIHRoZSBjdXJyZW50IGl0ZW0uXHJcblx0ICogQHBhcmFtIHBvc2l0aW9uIHRoZSBhYnNvbHV0ZSBwb3NpdGlvbiBvZiB0aGUgbmV3IGl0ZW0uXHJcblx0ICovXHJcbiAgcmVzZXQocG9zaXRpb246IG51bWJlcikge1xyXG5cdFx0cG9zaXRpb24gPSB0aGlzLm5vcm1hbGl6ZShwb3NpdGlvbik7XHJcblxyXG5cdFx0aWYgKHBvc2l0aW9uID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX3NwZWVkID0gMDtcclxuXHRcdHRoaXMuX2N1cnJlbnQgPSBwb3NpdGlvbjtcclxuXHJcblx0XHR0aGlzLl9zdXBwcmVzcyhbICd0cmFuc2xhdGUnLCAndHJhbnNsYXRlZCcgXSk7XHJcblxyXG5cdFx0dGhpcy5hbmltYXRlKHRoaXMuY29vcmRpbmF0ZXMocG9zaXRpb24pKTtcclxuXHJcblx0XHR0aGlzLl9yZWxlYXNlKFsgJ3RyYW5zbGF0ZScsICd0cmFuc2xhdGVkJyBdKTtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIE5vcm1hbGl6ZXMgYW4gYWJzb2x1dGUgb3IgYSByZWxhdGl2ZSBwb3NpdGlvbiBvZiBhbiBpdGVtLlxyXG5cdCAqIEBwYXJhbSBwb3NpdGlvbiBUaGUgYWJzb2x1dGUgb3IgcmVsYXRpdmUgcG9zaXRpb24gdG8gbm9ybWFsaXplLlxyXG5cdCAqIEBwYXJhbSByZWxhdGl2ZSBXaGV0aGVyIHRoZSBnaXZlbiBwb3NpdGlvbiBpcyByZWxhdGl2ZSBvciBub3QuXHJcblx0ICogQHJldHVybnMgVGhlIG5vcm1hbGl6ZWQgcG9zaXRpb24uXHJcblx0ICovXHJcbiAgbm9ybWFsaXplKHBvc2l0aW9uOiBudW1iZXIsIHJlbGF0aXZlPzogYm9vbGVhbik6IG51bWJlciB7XHJcblx0XHRjb25zdCBuID0gdGhpcy5faXRlbXMubGVuZ3RoLFxyXG5cdFx0XHRcdFx0bSA9IHJlbGF0aXZlID8gMCA6IHRoaXMuX2Nsb25lcy5sZW5ndGg7XHJcblxyXG5cdFx0aWYgKCF0aGlzLl9pc051bWVyaWMocG9zaXRpb24pIHx8IG4gPCAxKSB7XHJcblx0XHRcdHBvc2l0aW9uID0gdW5kZWZpbmVkO1xyXG5cdFx0fSBlbHNlIGlmIChwb3NpdGlvbiA8IDAgfHwgcG9zaXRpb24gPj0gbiArIG0pIHtcclxuXHRcdFx0cG9zaXRpb24gPSAoKHBvc2l0aW9uIC0gbSAvIDIpICUgbiArIG4pICUgbiArIG0gLyAyO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBwb3NpdGlvbjtcclxuXHQgfVxyXG5cclxuICAvKipcclxuXHQgKiBDb252ZXJ0cyBhbiBhYnNvbHV0ZSBwb3NpdGlvbiBvZiBhbiBpdGVtIGludG8gYSByZWxhdGl2ZSBvbmUuXHJcblx0ICogQHBhcmFtIHBvc2l0aW9uIFRoZSBhYnNvbHV0ZSBwb3NpdGlvbiB0byBjb252ZXJ0LlxyXG5cdCAqIEByZXR1cm5zIFRoZSBjb252ZXJ0ZWQgcG9zaXRpb24uXHJcblx0ICovXHJcbiAgcmVsYXRpdmUocG9zaXRpb246IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRwb3NpdGlvbiAtPSB0aGlzLl9jbG9uZXMubGVuZ3RoIC8gMjtcclxuXHRcdHJldHVybiB0aGlzLm5vcm1hbGl6ZShwb3NpdGlvbiwgdHJ1ZSk7XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBHZXRzIHRoZSBtYXhpbXVtIHBvc2l0aW9uIGZvciB0aGUgY3VycmVudCBpdGVtLlxyXG5cdCAqIEBwYXJhbSByZWxhdGl2ZSBXaGV0aGVyIHRvIHJldHVybiBhbiBhYnNvbHV0ZSBwb3NpdGlvbiBvciBhIHJlbGF0aXZlIHBvc2l0aW9uLlxyXG5cdCAqIEByZXR1cm5zIG51bWJlciBvZiBtYXhpbXVtIHBvc2l0aW9uXHJcblx0ICovXHJcbiAgbWF4aW11bShyZWxhdGl2ZTogYm9vbGVhbiA9IGZhbHNlKTogbnVtYmVyIHtcclxuXHRcdGNvbnN0IHNldHRpbmdzID0gdGhpcy5zZXR0aW5ncztcclxuXHRcdGxldFx0bWF4aW11bSA9IHRoaXMuX2Nvb3JkaW5hdGVzLmxlbmd0aCxcclxuXHRcdFx0aXRlcmF0b3IsXHJcblx0XHRcdHJlY2lwcm9jYWxJdGVtc1dpZHRoLFxyXG5cdFx0XHRlbGVtZW50V2lkdGg7XHJcblxyXG5cdFx0aWYgKHNldHRpbmdzLmxvb3ApIHtcclxuXHRcdFx0bWF4aW11bSA9IHRoaXMuX2Nsb25lcy5sZW5ndGggLyAyICsgdGhpcy5faXRlbXMubGVuZ3RoIC0gMTtcclxuXHRcdH0gZWxzZSBpZiAoc2V0dGluZ3MuYXV0b1dpZHRoIHx8IHNldHRpbmdzLm1lcmdlKSB7XHJcblx0XHRcdGl0ZXJhdG9yID0gdGhpcy5faXRlbXMubGVuZ3RoO1xyXG5cdFx0XHRyZWNpcHJvY2FsSXRlbXNXaWR0aCA9IHRoaXMuc2xpZGVzRGF0YVstLWl0ZXJhdG9yXS53aWR0aDtcclxuXHRcdFx0ZWxlbWVudFdpZHRoID0gdGhpcy5fd2lkdGg7XHJcblx0XHRcdHdoaWxlIChpdGVyYXRvci0tKSB7XHJcblx0XHRcdFx0Ly8gaXQgY291bGQgYmUgdXNlIHRoaXMuX2l0ZW1zIGluc3RlYWQgb2YgdGhpcy5zbGlkZXNEYXRhO1xyXG5cdFx0XHRcdHJlY2lwcm9jYWxJdGVtc1dpZHRoICs9ICt0aGlzLnNsaWRlc0RhdGFbaXRlcmF0b3JdLndpZHRoICsgdGhpcy5zZXR0aW5ncy5tYXJnaW47XHJcblx0XHRcdFx0aWYgKHJlY2lwcm9jYWxJdGVtc1dpZHRoID4gZWxlbWVudFdpZHRoKSB7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0bWF4aW11bSA9IGl0ZXJhdG9yICsgMTtcclxuXHRcdH0gZWxzZSBpZiAoc2V0dGluZ3MuY2VudGVyKSB7XHJcblx0XHRcdG1heGltdW0gPSB0aGlzLl9pdGVtcy5sZW5ndGggLSAxO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bWF4aW11bSA9IHRoaXMuX2l0ZW1zLmxlbmd0aCAtIHNldHRpbmdzLml0ZW1zO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChyZWxhdGl2ZSkge1xyXG5cdFx0XHRtYXhpbXVtIC09IHRoaXMuX2Nsb25lcy5sZW5ndGggLyAyO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBNYXRoLm1heChtYXhpbXVtLCAwKTtcclxuXHQgfVxyXG5cclxuICAvKipcclxuXHQgKiBHZXRzIHRoZSBtaW5pbXVtIHBvc2l0aW9uIGZvciB0aGUgY3VycmVudCBpdGVtLlxyXG5cdCAqIEBwYXJhbSByZWxhdGl2ZSBXaGV0aGVyIHRvIHJldHVybiBhbiBhYnNvbHV0ZSBwb3NpdGlvbiBvciBhIHJlbGF0aXZlIHBvc2l0aW9uLlxyXG5cdCAqIEByZXR1cm5zIG51bWJlciBvZiBtaW5pbXVtIHBvc2l0aW9uXHJcblx0ICovXHJcbiAgbWluaW11bShyZWxhdGl2ZTogYm9vbGVhbiA9IGZhbHNlKTogbnVtYmVyIHtcclxuXHRcdHJldHVybiByZWxhdGl2ZSA/IDAgOiB0aGlzLl9jbG9uZXMubGVuZ3RoIC8gMjtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEdldHMgYW4gaXRlbSBhdCB0aGUgc3BlY2lmaWVkIHJlbGF0aXZlIHBvc2l0aW9uLlxyXG5cdCAqIEBwYXJhbSBwb3NpdGlvbiBUaGUgcmVsYXRpdmUgcG9zaXRpb24gb2YgdGhlIGl0ZW0uXHJcblx0ICogQHJldHVybnMgVGhlIGl0ZW0gYXQgdGhlIGdpdmVuIHBvc2l0aW9uIG9yIGFsbCBpdGVtcyBpZiBubyBwb3NpdGlvbiB3YXMgZ2l2ZW4uXHJcblx0ICovXHJcbiAgaXRlbXMocG9zaXRpb24/OiBudW1iZXIpOiBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlW10ge1xyXG5cdFx0aWYgKHBvc2l0aW9uID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuX2l0ZW1zLnNsaWNlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cG9zaXRpb24gPSB0aGlzLm5vcm1hbGl6ZShwb3NpdGlvbiwgdHJ1ZSk7XHJcblx0XHRyZXR1cm4gW3RoaXMuX2l0ZW1zW3Bvc2l0aW9uXV07XHJcblx0IH1cclxuXHJcbiAgLyoqXHJcblx0ICogR2V0cyBhbiBpdGVtIGF0IHRoZSBzcGVjaWZpZWQgcmVsYXRpdmUgcG9zaXRpb24uXHJcblx0ICogQHBhcmFtIHBvc2l0aW9uIFRoZSByZWxhdGl2ZSBwb3NpdGlvbiBvZiB0aGUgaXRlbS5cclxuXHQgKiBAcmV0dXJucyBUaGUgaXRlbSBhdCB0aGUgZ2l2ZW4gcG9zaXRpb24gb3IgYWxsIGl0ZW1zIGlmIG5vIHBvc2l0aW9uIHdhcyBnaXZlbi5cclxuXHQgKi9cclxuICBtZXJnZXJzKHBvc2l0aW9uOiBudW1iZXIpOiBudW1iZXIgfCBudW1iZXJbXSB7XHJcblx0XHRpZiAocG9zaXRpb24gPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5fbWVyZ2Vycy5zbGljZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHBvc2l0aW9uID0gdGhpcy5ub3JtYWxpemUocG9zaXRpb24sIHRydWUpO1xyXG5cdFx0cmV0dXJuIHRoaXMuX21lcmdlcnNbcG9zaXRpb25dO1xyXG5cdCB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEdldHMgdGhlIGFic29sdXRlIHBvc2l0aW9ucyBvZiBjbG9uZXMgZm9yIGFuIGl0ZW0uXHJcblx0ICogQHBhcmFtIHBvc2l0aW9uIFRoZSByZWxhdGl2ZSBwb3NpdGlvbiBvZiB0aGUgaXRlbS5cclxuXHQgKiBAcmV0dXJucyBUaGUgYWJzb2x1dGUgcG9zaXRpb25zIG9mIGNsb25lcyBmb3IgdGhlIGl0ZW0gb3IgYWxsIGlmIG5vIHBvc2l0aW9uIHdhcyBnaXZlbi5cclxuXHQgKi9cclxuICBjbG9uZXMocG9zaXRpb24/OiBudW1iZXIpOiBudW1iZXJbXSB7XHJcblx0XHRjb25zdCBvZGQgPSB0aGlzLl9jbG9uZXMubGVuZ3RoIC8gMixcclxuXHRcdFx0ZXZlbiA9IG9kZCArIHRoaXMuX2l0ZW1zLmxlbmd0aCxcclxuXHRcdFx0bWFwID0gaW5kZXggPT4gaW5kZXggJSAyID09PSAwID8gZXZlbiArIGluZGV4IC8gMiA6IG9kZCAtIChpbmRleCArIDEpIC8gMjtcclxuXHJcblx0XHRpZiAocG9zaXRpb24gPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5fY2xvbmVzLm1hcCgodiwgaSkgPT4gbWFwKGkpKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fY2xvbmVzLm1hcCgodiwgaSkgPT4gdiA9PT0gcG9zaXRpb24gPyBtYXAoaSkgOiBudWxsKS5maWx0ZXIoaXRlbSA9PiBpdGVtKTtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIFNldHMgdGhlIGN1cnJlbnQgYW5pbWF0aW9uIHNwZWVkLlxyXG5cdCAqIEBwYXJhbSBzcGVlZCBUaGUgYW5pbWF0aW9uIHNwZWVkIGluIG1pbGxpc2Vjb25kcyBvciBub3RoaW5nIHRvIGxlYXZlIGl0IHVuY2hhbmdlZC5cclxuXHQgKiBAcmV0dXJucyBUaGUgY3VycmVudCBhbmltYXRpb24gc3BlZWQgaW4gbWlsbGlzZWNvbmRzLlxyXG5cdCAqL1xyXG4gIHNwZWVkKHNwZWVkPzogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdGlmIChzcGVlZCAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHRoaXMuX3NwZWVkID0gc3BlZWQ7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX3NwZWVkO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogR2V0cyB0aGUgY29vcmRpbmF0ZSBvZiBhbiBpdGVtLlxyXG5cdCAqIEB0b2RvIFRoZSBuYW1lIG9mIHRoaXMgbWV0aG9kIGlzIG1pc3NsZWFuZGluZy5cclxuXHQgKiBAcGFyYW0gcG9zaXRpb24gVGhlIGFic29sdXRlIHBvc2l0aW9uIG9mIHRoZSBpdGVtIHdpdGhpbiBgbWluaW11bSgpYCBhbmQgYG1heGltdW0oKWAuXHJcblx0ICogQHJldHVybnMgVGhlIGNvb3JkaW5hdGUgb2YgdGhlIGl0ZW0gaW4gcGl4ZWwgb3IgYWxsIGNvb3JkaW5hdGVzLlxyXG5cdCAqL1xyXG4gIGNvb3JkaW5hdGVzKHBvc2l0aW9uPzogbnVtYmVyKTogbnVtYmVyIHwgbnVtYmVyW10ge1xyXG5cdFx0bGV0IG11bHRpcGxpZXIgPSAxLFxyXG5cdFx0XHRuZXdQb3NpdGlvbiA9IHBvc2l0aW9uIC0gMSxcclxuXHRcdFx0Y29vcmRpbmF0ZSxcclxuXHRcdFx0cmVzdWx0OiBudW1iZXJbXTtcclxuXHJcblx0XHRpZiAocG9zaXRpb24gPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXN1bHQgPSB0aGlzLl9jb29yZGluYXRlcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuY29vcmRpbmF0ZXMoaW5kZXgpIGFzIG51bWJlcjtcclxuXHRcdFx0fSk7XHJcblx0XHRcdHJldHVybiByZXN1bHQ7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3MuY2VudGVyKSB7XHJcblx0XHRcdGlmICh0aGlzLnNldHRpbmdzLnJ0bCkge1xyXG5cdFx0XHRcdG11bHRpcGxpZXIgPSAtMTtcclxuXHRcdFx0XHRuZXdQb3NpdGlvbiA9IHBvc2l0aW9uICsgMTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Y29vcmRpbmF0ZSA9IHRoaXMuX2Nvb3JkaW5hdGVzW3Bvc2l0aW9uXTtcclxuXHRcdFx0Y29vcmRpbmF0ZSArPSAodGhpcy53aWR0aCgpIC0gY29vcmRpbmF0ZSArICh0aGlzLl9jb29yZGluYXRlc1tuZXdQb3NpdGlvbl0gfHwgMCkpIC8gMiAqIG11bHRpcGxpZXI7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjb29yZGluYXRlID0gdGhpcy5fY29vcmRpbmF0ZXNbbmV3UG9zaXRpb25dIHx8IDA7XHJcblx0XHR9XHJcblxyXG5cdFx0Y29vcmRpbmF0ZSA9IE1hdGguY2VpbChjb29yZGluYXRlKTtcclxuXHJcblx0XHRyZXR1cm4gY29vcmRpbmF0ZTtcclxuXHQgfVxyXG5cclxuICAvKipcclxuXHQgKiBDYWxjdWxhdGVzIHRoZSBzcGVlZCBmb3IgYSB0cmFuc2xhdGlvbi5cclxuXHQgKiBAcGFyYW0gZnJvbSBUaGUgYWJzb2x1dGUgcG9zaXRpb24gb2YgdGhlIHN0YXJ0IGl0ZW0uXHJcblx0ICogQHBhcmFtIHRvIFRoZSBhYnNvbHV0ZSBwb3NpdGlvbiBvZiB0aGUgdGFyZ2V0IGl0ZW0uXHJcblx0ICogQHBhcmFtIGZhY3RvciBbZmFjdG9yPXVuZGVmaW5lZF0gLSBUaGUgdGltZSBmYWN0b3IgaW4gbWlsbGlzZWNvbmRzLlxyXG5cdCAqIEByZXR1cm5zIFRoZSB0aW1lIGluIG1pbGxpc2Vjb25kcyBmb3IgdGhlIHRyYW5zbGF0aW9uLlxyXG5cdCAqL1xyXG4gIHByaXZhdGUgX2R1cmF0aW9uKGZyb206IG51bWJlciwgdG86IG51bWJlciwgZmFjdG9yPzogbnVtYmVyIHwgYm9vbGVhbik6IG51bWJlciB7XHJcblx0XHRpZiAoZmFjdG9yID09PSAwKSB7XHJcblx0XHRcdHJldHVybiAwO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBNYXRoLm1pbihNYXRoLm1heChNYXRoLmFicyh0byAtIGZyb20pLCAxKSwgNikgKiBNYXRoLmFicygoK2ZhY3RvciB8fCB0aGlzLnNldHRpbmdzLnNtYXJ0U3BlZWQpKTtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIFNsaWRlcyB0byB0aGUgc3BlY2lmaWVkIGl0ZW0uXHJcblx0ICogQHBhcmFtIHBvc2l0aW9uIFRoZSBwb3NpdGlvbiBvZiB0aGUgaXRlbS5cclxuXHQgKiBAcGFyYW0gc3BlZWQgVGhlIHRpbWUgaW4gbWlsbGlzZWNvbmRzIGZvciB0aGUgdHJhbnNpdGlvbi5cclxuXHQgKi9cclxuICB0byhwb3NpdGlvbjogbnVtYmVyLCBzcGVlZDogbnVtYmVyIHwgYm9vbGVhbikge1xyXG5cdFx0bGV0IGN1cnJlbnQgPSB0aGlzLmN1cnJlbnQoKSxcclxuXHRcdFx0cmV2ZXJ0ID0gbnVsbCxcclxuXHRcdFx0ZGlzdGFuY2UgPSBwb3NpdGlvbiAtIHRoaXMucmVsYXRpdmUoY3VycmVudCksXHJcblx0XHRcdG1heGltdW0gPSB0aGlzLm1heGltdW0oKTtcclxuXHRcdGNvbnN0XHRkaXJlY3Rpb24gPSArKGRpc3RhbmNlID4gMCkgLSArKGRpc3RhbmNlIDwgMCksXHJcblx0XHRcdGl0ZW1zID0gdGhpcy5faXRlbXMubGVuZ3RoLFxyXG5cdFx0XHRtaW5pbXVtID0gdGhpcy5taW5pbXVtKCk7XHJcblxyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3MubG9vcCkge1xyXG5cdFx0XHRpZiAoIXRoaXMuc2V0dGluZ3MucmV3aW5kICYmIE1hdGguYWJzKGRpc3RhbmNlKSA+IGl0ZW1zIC8gMikge1xyXG5cdFx0XHRcdGRpc3RhbmNlICs9IGRpcmVjdGlvbiAqIC0xICogaXRlbXM7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHBvc2l0aW9uID0gY3VycmVudCArIGRpc3RhbmNlO1xyXG5cdFx0XHRyZXZlcnQgPSAoKHBvc2l0aW9uIC0gbWluaW11bSkgJSBpdGVtcyArIGl0ZW1zKSAlIGl0ZW1zICsgbWluaW11bTtcclxuXHJcblx0XHRcdGlmIChyZXZlcnQgIT09IHBvc2l0aW9uICYmIHJldmVydCAtIGRpc3RhbmNlIDw9IG1heGltdW0gJiYgcmV2ZXJ0IC0gZGlzdGFuY2UgPiAwKSB7XHJcblx0XHRcdFx0Y3VycmVudCA9IHJldmVydCAtIGRpc3RhbmNlO1xyXG5cdFx0XHRcdHBvc2l0aW9uID0gcmV2ZXJ0O1xyXG5cdFx0XHRcdHRoaXMucmVzZXQoY3VycmVudCk7XHJcblx0XHRcdFx0dGhpcy5zZW5kQ2hhbmdlcygpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2UgaWYgKHRoaXMuc2V0dGluZ3MucmV3aW5kKSB7XHJcblx0XHRcdG1heGltdW0gKz0gMTtcclxuXHRcdFx0cG9zaXRpb24gPSAocG9zaXRpb24gJSBtYXhpbXVtICsgbWF4aW11bSkgJSBtYXhpbXVtO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cG9zaXRpb24gPSBNYXRoLm1heChtaW5pbXVtLCBNYXRoLm1pbihtYXhpbXVtLCBwb3NpdGlvbikpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHR0aGlzLnNwZWVkKHRoaXMuX2R1cmF0aW9uKGN1cnJlbnQsIHBvc2l0aW9uLCBzcGVlZCkpO1xyXG5cdFx0XHR0aGlzLmN1cnJlbnQocG9zaXRpb24pO1xyXG5cclxuXHRcdFx0dGhpcy51cGRhdGUoKTtcclxuXHRcdH0sIDApO1xyXG5cclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIFNsaWRlcyB0byB0aGUgbmV4dCBpdGVtLlxyXG5cdCAqIEBwYXJhbSBzcGVlZCBUaGUgdGltZSBpbiBtaWxsaXNlY29uZHMgZm9yIHRoZSB0cmFuc2l0aW9uLlxyXG5cdCAqL1xyXG4gIG5leHQoc3BlZWQ6IG51bWJlciB8IGJvb2xlYW4pIHtcclxuXHRcdHNwZWVkID0gc3BlZWQgfHwgZmFsc2U7XHJcblx0XHR0aGlzLnRvKHRoaXMucmVsYXRpdmUodGhpcy5jdXJyZW50KCkpICsgMSwgc3BlZWQpO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogU2xpZGVzIHRvIHRoZSBwcmV2aW91cyBpdGVtLlxyXG5cdCAqIEBwYXJhbSBzcGVlZCBUaGUgdGltZSBpbiBtaWxsaXNlY29uZHMgZm9yIHRoZSB0cmFuc2l0aW9uLlxyXG5cdCAqL1xyXG4gIHByZXYoc3BlZWQ6IG51bWJlciB8IGJvb2xlYW4pIHtcclxuXHRcdHNwZWVkID0gc3BlZWQgfHwgZmFsc2U7XHJcblx0XHR0aGlzLnRvKHRoaXMucmVsYXRpdmUodGhpcy5jdXJyZW50KCkpIC0gMSwgc3BlZWQpO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogSGFuZGxlcyB0aGUgZW5kIG9mIGFuIGFuaW1hdGlvbi5cclxuXHQgKiBAcGFyYW0gZXZlbnQgLSBUaGUgZXZlbnQgYXJndW1lbnRzLlxyXG5cdCAqL1xyXG4gIG9uVHJhbnNpdGlvbkVuZChldmVudD86IGFueSkge1xyXG5cdFx0Ly8gaWYgY3NzMiBhbmltYXRpb24gdGhlbiBldmVudCBvYmplY3QgaXMgdW5kZWZpbmVkXHJcblx0XHRpZiAoZXZlbnQgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHQvLyBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcblx0XHRcdC8vIC8vIENhdGNoIG9ubHkgb3dsLXN0YWdlIHRyYW5zaXRpb25FbmQgZXZlbnRcclxuXHRcdFx0Ly8gaWYgKChldmVudC50YXJnZXQgfHwgZXZlbnQuc3JjRWxlbWVudCB8fCBldmVudC5vcmlnaW5hbFRhcmdldCkgIT09IHRoaXMuJHN0YWdlLmdldCgwKVx0KSB7XHJcblx0XHRcdC8vIFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHQvLyB9XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHRcdHRoaXMubGVhdmUoJ2FuaW1hdGluZycpO1xyXG5cdFx0dGhpcy5fdHJpZ2dlcigndHJhbnNsYXRlZCcpO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogR2V0cyB2aWV3cG9ydCB3aWR0aC5cclxuXHQgKiBAcmV0dXJucyAtIFRoZSB3aWR0aCBpbiBwaXhlbC5cclxuXHQgKi9cclxuICBwcml2YXRlIF92aWV3cG9ydCgpOiBudW1iZXIge1xyXG5cdFx0bGV0IHdpZHRoO1xyXG5cdFx0aWYgKHRoaXMuX3dpZHRoKSB7XHJcblx0XHRcdHdpZHRoID0gdGhpcy5fd2lkdGg7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmxvZ2dlci5sb2coJ0NhbiBub3QgZGV0ZWN0IHZpZXdwb3J0IHdpZHRoLicpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHdpZHRoO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogU2V0cyBfaXRlbXNcclxuXHQgKiBAcGFyYW0gY29udGVudCBUaGUgbGlzdCBvZiBzbGlkZXMgcHV0IGludG8gQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZXMuXHJcblx0ICovXHJcbiAgc2V0SXRlbXMoY29udGVudDogQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZVtdKSB7XHJcblx0XHR0aGlzLl9pdGVtcyA9IGNvbnRlbnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHNsaWRlc0RhdGEgdXNpbmcgdGhpcy5faXRlbXNcclxuXHQgKi9cclxuXHRwcml2YXRlIF9kZWZpbmVTbGlkZXNEYXRhKCkge1xyXG5cdFx0Ly8gTWF5YmUgY3JlYXRpbmcgYW5kIHVzaW5nIGxvYWRNYXAgd291bGQgYmUgYmV0dGVyIGluIExhenlMb2FkU2VydmljZS5cclxuXHRcdC8vIEhvdmV3ZXIgaW4gdGhhdCBjYXNlIHdoZW4gJ3Jlc2l6ZScgZXZlbnQgZmlyZXMsIHByb3AgJ2xvYWQnIG9mIGFsbCBzbGlkZXMgd2lsbCBnZXQgJ2ZhbHNlJyBhbmQgc3VjaCBzdGF0ZSBvZiBwcm9wIHdpbGwgYmUgc2VlbiBieSBWaWV3IGR1cmluZyBpdHMgdXBkYXRpbmcuIEFjY29yZGluZ2x5IHRoZSBjb2RlIHdpbGwgcmVtb3ZlIHNsaWRlcydzIGNvbnRlbnQgZnJvbSBET00gZXZlbiBpZiBpdCB3YXMgbG9hZGVkIGJlZm9yZS5cclxuXHRcdC8vIFRodXMgaXQgd291bGQgYmUgbmVlZGVkIHRvIGFkZCB0aGF0IGNvbnRlbnQgaW50byBET00gYWdhaW4uXHJcblx0XHQvLyBJbiBvcmRlciB0byBhdm9pZCBhZGRpdGlvbmFsIHJlbW92aW5nL2FkZGluZyBsb2FkZWQgc2xpZGVzJ3MgY29udGVudCB3ZSB1c2UgbG9hZE1hcCBoZXJlIGFuZCBzZXQgcmVzdG9yZSBzdGF0ZSBvZiBwcm9wICdsb2FkJyBiZWZvcmUgdGhlIFZpZXcgd2lsbCBnZXQgaXQuXHJcblx0XHRsZXQgbG9hZE1hcDogTWFwPHN0cmluZywgYm9vbGVhbj47XHJcblxyXG5cdFx0aWYgKHRoaXMuc2xpZGVzRGF0YSAmJiB0aGlzLnNsaWRlc0RhdGEubGVuZ3RoKSB7XHJcblx0XHRcdGxvYWRNYXAgPSBuZXcgTWFwKCk7XHJcblx0XHRcdHRoaXMuc2xpZGVzRGF0YS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG5cdFx0XHRcdGlmIChpdGVtLmxvYWQpIHtcclxuXHRcdFx0XHRcdGxvYWRNYXAuc2V0KGl0ZW0uaWQsIGl0ZW0ubG9hZCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2xpZGVzRGF0YSA9IHRoaXMuX2l0ZW1zLm1hcChzbGlkZSA9PiB7XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0aWQ6IGAke3NsaWRlLmlkfWAsXHJcblx0XHRcdFx0aXNBY3RpdmU6IGZhbHNlLFxyXG5cdFx0XHRcdHRwbFJlZjogc2xpZGUudHBsUmVmLFxyXG5cdFx0XHRcdGRhdGFNZXJnZTogc2xpZGUuZGF0YU1lcmdlLFxyXG5cdFx0XHRcdHdpZHRoOiAwLFxyXG5cdFx0XHRcdGlzQ2xvbmVkOiBmYWxzZSxcclxuXHRcdFx0XHRsb2FkOiBsb2FkTWFwID8gbG9hZE1hcC5nZXQoc2xpZGUuaWQpIDogZmFsc2UsXHJcblx0XHRcdFx0aGFzaEZyYWdtZW50OiBzbGlkZS5kYXRhSGFzaFxyXG5cdFx0XHR9O1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIGN1cnJlbnQgY2xhc3NlcyBmb3Igc2xpZGVcclxuXHQgKiBAcGFyYW0gc2xpZGUgU2xpZGUgb2YgY2Fyb3VzZWxcclxuXHQgKiBAcmV0dXJucyBvYmplY3Qgd2l0aCBuYW1lcyBvZiBjc3MtY2xhc3NlcyB3aGljaCBhcmUga2V5cyBhbmQgdHJ1ZS9mYWxzZSB2YWx1ZXNcclxuXHQgKi9cclxuXHRzZXRDdXJTbGlkZUNsYXNzZXMoc2xpZGU6IFNsaWRlTW9kZWwpOiB7W2tleTogc3RyaW5nXTogYm9vbGVhbn0ge1xyXG5cdFx0Ly8gQ1NTIGNsYXNzZXM6IGFkZGVkL3JlbW92ZWQgcGVyIGN1cnJlbnQgc3RhdGUgb2YgY29tcG9uZW50IHByb3BlcnRpZXNcclxuXHRcdGNvbnN0IGN1cnJlbnRDbGFzc2VzOiB7W2tleTogc3RyaW5nXTogYm9vbGVhbn0gPSAge1xyXG5cdFx0XHQnYWN0aXZlJzogc2xpZGUuaXNBY3RpdmUsXHJcblx0XHRcdCdjZW50ZXInOiBzbGlkZS5pc0NlbnRlcmVkLFxyXG5cdFx0XHQnY2xvbmVkJzogc2xpZGUuaXNDbG9uZWQsXHJcblx0XHRcdCdhbmltYXRlZCc6IHNsaWRlLmlzQW5pbWF0ZWQsXHJcblx0XHRcdCdvd2wtYW5pbWF0ZWQtaW4nOiBzbGlkZS5pc0RlZkFuaW1hdGVkSW4sXHJcblx0XHRcdCdvd2wtYW5pbWF0ZWQtb3V0Jzogc2xpZGUuaXNEZWZBbmltYXRlZE91dFxyXG5cdFx0fTtcclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLmFuaW1hdGVJbikge1xyXG5cdFx0XHRjdXJyZW50Q2xhc3Nlc1t0aGlzLnNldHRpbmdzLmFuaW1hdGVJbiBhcyBzdHJpbmddID0gc2xpZGUuaXNDdXN0b21BbmltYXRlZEluO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3MuYW5pbWF0ZU91dCkge1xyXG5cdFx0XHRjdXJyZW50Q2xhc3Nlc1t0aGlzLnNldHRpbmdzLmFuaW1hdGVPdXQgYXMgc3RyaW5nXSA9IHNsaWRlLmlzQ3VzdG9tQW5pbWF0ZWRPdXQ7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gY3VycmVudENsYXNzZXM7XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBPcGVyYXRvcnMgdG8gY2FsY3VsYXRlIHJpZ2h0LXRvLWxlZnQgYW5kIGxlZnQtdG8tcmlnaHQuXHJcblx0ICogQHBhcmFtIGEgLSBUaGUgbGVmdCBzaWRlIG9wZXJhbmQuXHJcblx0ICogQHBhcmFtIG8gLSBUaGUgb3BlcmF0b3IuXHJcblx0ICogQHBhcmFtIGIgLSBUaGUgcmlnaHQgc2lkZSBvcGVyYW5kLlxyXG5cdCAqIEByZXR1cm5zIHRydWUvZmFsc2UgbWVhbmluZyByaWdodC10by1sZWZ0IG9yIGxlZnQtdG8tcmlnaHRcclxuXHQgKi9cclxuICBwcml2YXRlIF9vcChhOiBudW1iZXIsIG86IHN0cmluZywgYjogbnVtYmVyKTogYm9vbGVhbiB7XHJcblx0XHRjb25zdCBydGwgPSB0aGlzLnNldHRpbmdzLnJ0bDtcclxuXHRcdHN3aXRjaCAobykge1xyXG5cdFx0XHRjYXNlICc8JzpcclxuXHRcdFx0XHRyZXR1cm4gcnRsID8gYSA+IGIgOiBhIDwgYjtcclxuXHRcdFx0Y2FzZSAnPic6XHJcblx0XHRcdFx0cmV0dXJuIHJ0bCA/IGEgPCBiIDogYSA+IGI7XHJcblx0XHRcdGNhc2UgJz49JzpcclxuXHRcdFx0XHRyZXR1cm4gcnRsID8gYSA8PSBiIDogYSA+PSBiO1xyXG5cdFx0XHRjYXNlICc8PSc6XHJcblx0XHRcdFx0cmV0dXJuIHJ0bCA/IGEgPj0gYiA6IGEgPD0gYjtcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIFRyaWdnZXJzIGEgcHVibGljIGV2ZW50LlxyXG5cdCAqIEB0b2RvIFJlbW92ZSBgc3RhdHVzYCwgYHJlbGF0ZWRUYXJnZXRgIHNob3VsZCBiZSB1c2VkIGluc3RlYWQuXHJcblx0ICogQHBhcmFtIG5hbWUgVGhlIGV2ZW50IG5hbWUuXHJcblx0ICogQHBhcmFtIGRhdGEgVGhlIGV2ZW50IGRhdGEuXHJcblx0ICogQHBhcmFtIG5hbWVzcGFjZSBUaGUgZXZlbnQgbmFtZXNwYWNlLlxyXG5cdCAqIEBwYXJhbSBzdGF0ZSBUaGUgc3RhdGUgd2hpY2ggaXMgYXNzb2NpYXRlZCB3aXRoIHRoZSBldmVudC5cclxuXHQgKiBAcGFyYW0gZW50ZXIgSW5kaWNhdGVzIGlmIHRoZSBjYWxsIGVudGVycyB0aGUgc3BlY2lmaWVkIHN0YXRlIG9yIG5vdC5cclxuXHQgKi9cclxuICBwcml2YXRlIF90cmlnZ2VyKG5hbWU6IHN0cmluZywgZGF0YT86IGFueSwgbmFtZXNwYWNlPzogc3RyaW5nLCBzdGF0ZT86IHN0cmluZywgZW50ZXI/OiBib29sZWFuKSB7XHJcblx0XHRzd2l0Y2ggKG5hbWUpIHtcclxuXHRcdFx0Y2FzZSAnaW5pdGlhbGl6ZWQnOlxyXG5cdFx0XHRcdHRoaXMuX2luaXRpYWxpemVkQ2Fyb3VzZWwkLm5leHQobmFtZSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ2NoYW5nZSc6XHJcblx0XHRcdFx0dGhpcy5fY2hhbmdlU2V0dGluZ3NDYXJvdXNlbCQubmV4dChkYXRhKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnY2hhbmdlZCc6XHJcblx0XHRcdFx0dGhpcy5fY2hhbmdlZFNldHRpbmdzQ2Fyb3VzZWwkLm5leHQoZGF0YSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ2RyYWcnOlxyXG5cdFx0XHRcdHRoaXMuX2RyYWdDYXJvdXNlbCQubmV4dChuYW1lKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnZHJhZ2dlZCc6XHJcblx0XHRcdFx0dGhpcy5fZHJhZ2dlZENhcm91c2VsJC5uZXh0KG5hbWUpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdyZXNpemUnOlxyXG5cdFx0XHRcdHRoaXMuX3Jlc2l6ZUNhcm91c2VsJC5uZXh0KG5hbWUpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdyZXNpemVkJzpcclxuXHRcdFx0XHR0aGlzLl9yZXNpemVkQ2Fyb3VzZWwkLm5leHQobmFtZSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ3JlZnJlc2gnOlxyXG5cdFx0XHRcdHRoaXMuX3JlZnJlc2hDYXJvdXNlbCQubmV4dChuYW1lKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAncmVmcmVzaGVkJzpcclxuXHRcdFx0XHR0aGlzLl9yZWZyZXNoZWRDYXJvdXNlbCQubmV4dChuYW1lKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAndHJhbnNsYXRlJzpcclxuXHRcdFx0XHR0aGlzLl90cmFuc2xhdGVDYXJvdXNlbCQubmV4dChuYW1lKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAndHJhbnNsYXRlZCc6XHJcblx0XHRcdFx0dGhpcy5fdHJhbnNsYXRlZENhcm91c2VsJC5uZXh0KG5hbWUpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEVudGVycyBhIHN0YXRlLlxyXG5cdCAqIEBwYXJhbSBuYW1lIC0gVGhlIHN0YXRlIG5hbWUuXHJcblx0ICovXHJcbiAgZW50ZXIobmFtZTogc3RyaW5nKSB7XHJcbiAgICBbIG5hbWUgXS5jb25jYXQodGhpcy5fc3RhdGVzLnRhZ3NbbmFtZV0gfHwgW10pLmZvckVhY2goKHN0YXRlTmFtZSkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5fc3RhdGVzLmN1cnJlbnRbc3RhdGVOYW1lXSA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0dGhpcy5fc3RhdGVzLmN1cnJlbnRbc3RhdGVOYW1lXSA9IDA7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuX3N0YXRlcy5jdXJyZW50W3N0YXRlTmFtZV0rKztcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG5cdCAqIExlYXZlcyBhIHN0YXRlLlxyXG5cdCAqIEBwYXJhbSBuYW1lIC0gVGhlIHN0YXRlIG5hbWUuXHJcblx0ICovXHJcblx0bGVhdmUobmFtZTogc3RyaW5nKSB7XHJcbiAgICBbIG5hbWUgXS5jb25jYXQodGhpcy5fc3RhdGVzLnRhZ3NbbmFtZV0gfHwgW10pLmZvckVhY2goKHN0YXRlTmFtZSkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5fc3RhdGVzLmN1cnJlbnRbc3RhdGVOYW1lXSA9PT0gMCB8fCAhIXRoaXMuX3N0YXRlcy5jdXJyZW50W3N0YXRlTmFtZV0pIHtcclxuICAgICAgICB0aGlzLl9zdGF0ZXMuY3VycmVudFtzdGF0ZU5hbWVdLS07XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcblx0ICogUmVnaXN0ZXJzIGFuIGV2ZW50IG9yIHN0YXRlLlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgLSBUaGUgZXZlbnQgb3Igc3RhdGUgdG8gcmVnaXN0ZXIuXHJcblx0ICovXHJcbiAgcmVnaXN0ZXIob2JqZWN0OiBhbnkpIHtcclxuXHRcdGlmIChvYmplY3QudHlwZSA9PT0gVHlwZS5TdGF0ZSkge1xyXG5cdFx0XHRpZiAoIXRoaXMuX3N0YXRlcy50YWdzW29iamVjdC5uYW1lXSkge1xyXG5cdFx0XHRcdHRoaXMuX3N0YXRlcy50YWdzW29iamVjdC5uYW1lXSA9IG9iamVjdC50YWdzO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuX3N0YXRlcy50YWdzW29iamVjdC5uYW1lXSA9IHRoaXMuX3N0YXRlcy50YWdzW29iamVjdC5uYW1lXS5jb25jYXQob2JqZWN0LnRhZ3MpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLl9zdGF0ZXMudGFnc1tvYmplY3QubmFtZV0gPSB0aGlzLl9zdGF0ZXMudGFnc1tvYmplY3QubmFtZV0uZmlsdGVyKCh0YWcsIGkpID0+IHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5fc3RhdGVzLnRhZ3Nbb2JqZWN0Lm5hbWVdLmluZGV4T2YodGFnKSA9PT0gaTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBTdXBwcmVzc2VzIGV2ZW50cy5cclxuXHQgKiBAcGFyYW0gZXZlbnRzIFRoZSBldmVudHMgdG8gc3VwcHJlc3MuXHJcblx0ICovXHJcbiAgcHJpdmF0ZSBfc3VwcHJlc3MoZXZlbnRzOiBzdHJpbmdbXSkge1xyXG5cdFx0ZXZlbnRzLmZvckVhY2goZXZlbnQgPT4ge1xyXG5cdFx0XHR0aGlzLl9zdXByZXNzW2V2ZW50XSA9IHRydWU7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIFJlbGVhc2VzIHN1cHByZXNzZWQgZXZlbnRzLlxyXG5cdCAqIEBwYXJhbSBldmVudHMgVGhlIGV2ZW50cyB0byByZWxlYXNlLlxyXG5cdCAqL1xyXG4gIHByaXZhdGUgX3JlbGVhc2UoZXZlbnRzOiBzdHJpbmdbXSkge1xyXG5cdFx0ZXZlbnRzLmZvckVhY2goZXZlbnQgPT4ge1xyXG5cdFx0XHRkZWxldGUgdGhpcy5fc3VwcmVzc1tldmVudF07XHJcblx0XHR9KTtcclxuXHQgfVxyXG5cclxuICAvKipcclxuXHQgKiBHZXRzIHVuaWZpZWQgcG9pbnRlciBjb29yZGluYXRlcyBmcm9tIGV2ZW50LlxyXG5cdCAqIEB0b2RvICMyNjFcclxuXHQgKiBAcGFyYW0gZXZlbnQgVGhlIGBtb3VzZWRvd25gIG9yIGB0b3VjaHN0YXJ0YCBldmVudC5cclxuXHQgKiBAcmV0dXJucyBPYmplY3QgQ29vcmRzIHdoaWNoIGNvbnRhaW5zIGB4YCBhbmQgYHlgIGNvb3JkaW5hdGVzIG9mIGN1cnJlbnQgcG9pbnRlciBwb3NpdGlvbi5cclxuXHQgKi9cclxuXHRwb2ludGVyKGV2ZW50OiBhbnkpOiBDb29yZHMge1xyXG5cdFx0Y29uc3QgcmVzdWx0ID0geyB4OiBudWxsLCB5OiBudWxsIH07XHJcblxyXG5cdFx0ZXZlbnQgPSBldmVudC5vcmlnaW5hbEV2ZW50IHx8IGV2ZW50IHx8IHdpbmRvdy5ldmVudDtcclxuXHJcblx0XHRldmVudCA9IGV2ZW50LnRvdWNoZXMgJiYgZXZlbnQudG91Y2hlcy5sZW5ndGggP1xyXG5cdFx0XHRldmVudC50b3VjaGVzWzBdIDogZXZlbnQuY2hhbmdlZFRvdWNoZXMgJiYgZXZlbnQuY2hhbmdlZFRvdWNoZXMubGVuZ3RoID9cclxuXHRcdFx0XHRldmVudC5jaGFuZ2VkVG91Y2hlc1swXSA6IGV2ZW50O1xyXG5cclxuXHRcdGlmIChldmVudC5wYWdlWCkge1xyXG5cdFx0XHRyZXN1bHQueCA9IGV2ZW50LnBhZ2VYO1xyXG5cdFx0XHRyZXN1bHQueSA9IGV2ZW50LnBhZ2VZO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmVzdWx0LnggPSBldmVudC5jbGllbnRYO1xyXG5cdFx0XHRyZXN1bHQueSA9IGV2ZW50LmNsaWVudFk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHQgfVxyXG5cclxuICAvKipcclxuXHQgKiBEZXRlcm1pbmVzIGlmIHRoZSBpbnB1dCBpcyBhIE51bWJlciBvciBzb21ldGhpbmcgdGhhdCBjYW4gYmUgY29lcmNlZCB0byBhIE51bWJlclxyXG5cdCAqIEBwYXJhbSBudW1iZXIgVGhlIGlucHV0IHRvIGJlIHRlc3RlZFxyXG5cdCAqIEByZXR1cm5zIEFuIGluZGljYXRpb24gaWYgdGhlIGlucHV0IGlzIGEgTnVtYmVyIG9yIGNhbiBiZSBjb2VyY2VkIHRvIGEgTnVtYmVyXHJcblx0ICovXHJcbiAgcHJpdmF0ZSBfaXNOdW1lcmljKG51bWJlcjogYW55KTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQobnVtYmVyKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdmFsdWUgaXMgbnVtYmVyIG9yIGJvb2xlYW4gdHlwZVxyXG5cdCAqIEBwYXJhbSB2YWx1ZSBUaGUgaW5wdXQgdG8gYmUgdGVzdGVkXHJcblx0ICogQHJldHVybnMgQW4gaW5kaWNhdGlvbiBpZiB0aGUgaW5wdXQgaXMgYSBOdW1iZXIgb3IgY2FuIGJlIGNvZXJjZWQgdG8gYSBOdW1iZXIsIG9yIEJvb2xlYW5cclxuXHQgKi9cclxuXHRwcml2YXRlIF9pc051bWJlck9yQm9vbGVhbih2YWx1ZTogbnVtYmVyIHwgYm9vbGVhbik6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2lzTnVtZXJpYyh2YWx1ZSkgfHwgdHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbic7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdmFsdWUgaXMgbnVtYmVyIG9yIHN0cmluZyB0eXBlXHJcblx0ICogQHBhcmFtIHZhbHVlIFRoZSBpbnB1dCB0byBiZSB0ZXN0ZWRcclxuXHQgKiBAcmV0dXJucyBBbiBpbmRpY2F0aW9uIGlmIHRoZSBpbnB1dCBpcyBhIE51bWJlciBvciBjYW4gYmUgY29lcmNlZCB0byBhIE51bWJlciwgb3IgU3RyaW5nXHJcblx0ICovXHJcblx0cHJpdmF0ZSBfaXNOdW1iZXJPclN0cmluZyh2YWx1ZTogbnVtYmVyIHwgc3RyaW5nKTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gdGhpcy5faXNOdW1lcmljKHZhbHVlKSB8fCB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRGV0ZXJtaW5lcyB3aGV0aGVyIHZhbHVlIGlzIG51bWJlciBvciBzdHJpbmcgdHlwZVxyXG5cdCAqIEBwYXJhbSB2YWx1ZSBUaGUgaW5wdXQgdG8gYmUgdGVzdGVkXHJcblx0ICogQHJldHVybnMgQW4gaW5kaWNhdGlvbiBpZiB0aGUgaW5wdXQgaXMgYSBOdW1iZXIgb3IgY2FuIGJlIGNvZXJjZWQgdG8gYSBOdW1iZXIsIG9yIFN0cmluZ1xyXG5cdCAqL1xyXG5cdHByaXZhdGUgX2lzU3RyaW5nT3JCb29sZWFuKHZhbHVlOiBudW1iZXIgfCBzdHJpbmcpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogR2V0cyB0aGUgZGlmZmVyZW5jZSBvZiB0d28gdmVjdG9ycy5cclxuXHQgKiBAdG9kbyAjMjYxXHJcblx0ICogQHBhcmFtIGZpcnN0IFRoZSBmaXJzdCB2ZWN0b3IuXHJcblx0ICogQHBhcmFtIHNlY29uZC0gVGhlIHNlY29uZCB2ZWN0b3IuXHJcblx0ICogQHJldHVybnMgVGhlIGRpZmZlcmVuY2UuXHJcblx0ICovXHJcbiAgZGlmZmVyZW5jZShmaXJzdDogQ29vcmRzLCBzZWNvbmQ6IENvb3Jkcyk6IENvb3JkcyB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHR4OiBmaXJzdC54IC0gc2Vjb25kLngsXHJcblx0XHRcdHk6IGZpcnN0LnkgLSBzZWNvbmQueVxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOYXZEYXRhLCBEb3RzRGF0YSB9IGZyb20gJy4uL21vZGVscy9uYXZpZ2F0aW9uLWRhdGEubW9kZWxzJztcclxuaW1wb3J0IHsgQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZSB9IGZyb20gJy4uL2Nhcm91c2VsL2Nhcm91c2VsLm1vZHVsZSc7XHJcbmltcG9ydCB7IENhcm91c2VsU2VydmljZSB9IGZyb20gJy4vY2Fyb3VzZWwuc2VydmljZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgT2JzZXJ2YWJsZSwgbWVyZ2UgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgdGFwLCBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IE93bE9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbHMvb3dsLW9wdGlvbnMubW9kZWwnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgTmF2aWdhdGlvblNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlvcHRpb24gdG8gbWVyZ2UgT2JzZXJ2YWJsZSAgZnJvbSBDYXJvdXNlbFNlcnZpY2VcclxuICAgKi9cclxuICBuYXZTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHBsdWdpbiBpcyBpbml0aWFsaXplZCBvciBub3QuXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIF9pbml0aWFsaXplZCA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgY3VycmVudCBwYWdpbmcgaW5kZXhlcy5cclxuICAgKi9cclxuICBwcm90ZWN0ZWQgX3BhZ2VzOiBhbnlbXSA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiBEYXRhIGZvciBuYXZpZ2F0aW9uIGVsZW1lbnRzIG9mIHRoZSB1c2VyIGludGVyZmFjZS5cclxuICAgKi9cclxuICBwcm90ZWN0ZWQgX25hdkRhdGE6IE5hdkRhdGEgPSB7XHJcbiAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICBwcmV2OiB7XHJcbiAgICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgICAgaHRtbFRleHQ6ICcnXHJcbiAgICB9LFxyXG4gICAgbmV4dDoge1xyXG4gICAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICAgIGh0bWxUZXh0OiAnJ1xyXG4gICAgfSxcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBEYXRhIGZvciBkb3QgZWxlbWVudHMgb2YgdGhlIHVzZXIgaW50ZXJmYWNlLlxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBfZG90c0RhdGE6IERvdHNEYXRhID0ge1xyXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgZG90czogW11cclxuICB9O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhcm91c2VsU2VydmljZTogQ2Fyb3VzZWxTZXJ2aWNlKSB7XHJcbiAgICB0aGlzLnNweURhdGFTdHJlYW1zKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMubmF2U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZWZpbmVzIE9ic2VydmFibGVzIHdoaWNoIHNlcnZpY2UgbXVzdCBvYnNlcnZlXHJcbiAgICovXHJcbiAgc3B5RGF0YVN0cmVhbXMoKSB7XHJcbiAgICBjb25zdCBpbml0aWFsaXplZENhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0SW5pdGlhbGl6ZWRTdGF0ZSgpLnBpcGUoXHJcbiAgICAgIHRhcChzdGF0ZSA9PiB7XHJcbiAgICAgICAgdGhpcy5pbml0aWFsaXplKCk7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlTmF2UGFnZXMoKTtcclxuICAgICAgICB0aGlzLmRyYXcoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNlbmRDaGFuZ2VzKCk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIC8vIG1vc3RseSBjaGFuZ2VzIGluIGNhcm91c2VsU2VydmljZSBhbmQgY2Fyb3VzZWwgYXQgYWxsIGNhdXNlcyBjYXJvdXNlbFNlcnZpY2UudG8oKS4gSXQgbW92ZXMgc3RhZ2UgcmlnaHQtbGVmdCBieSBpdHMgY29kZSBhbmQgY2FsbGluZyBuZWVkZWQgZnVuY3Rpb25zXHJcbiAgICAvLyBUaHVzIHRoaXMgbWV0aG9kIGJ5IGNhbGxpbmcgY2Fyb3VzZWxTZXJ2aWNlLmN1cnJlbnQocG9zaXRpb24pIG5vdGlmaWVzIGFib3V0IGNoYW5nZXNcclxuICAgIGNvbnN0IGNoYW5nZWRTZXR0aW5ncyQ6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldENoYW5nZWRTdGF0ZSgpLnBpcGUoXHJcbiAgICAgIGZpbHRlcihkYXRhID0+IGRhdGEucHJvcGVydHkubmFtZSA9PT0gJ3Bvc2l0aW9uJyksXHJcbiAgICAgIHRhcChkYXRhID0+IHtcclxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgICAgIC8vIHNob3VsZCBiZSB0aGUgY2FsbCBvZiB0aGUgZnVuY3Rpb24gd3JpdHRlbiBhdCB0aGUgZW5kIG9mIGNvbW1lbnRcclxuICAgICAgICAvLyBidXQgdGhlIG1ldGhvZCBjYXJvdXNlbFNlcnZpdmUudG8oKSBoYXMgc2V0VGltZW91dChmLCAwKSB3aGljaCBjb250YWlucyBjYXJvdXNlbFNlcnZpdmUudXBkYXRlKCkgd2hpY2ggY2FsbHMgc2VuZENoYW5nZXMoKSBtZXRob2QuXHJcbiAgICAgICAgLy8gY2Fyb3VzZWxTZXJ2aWNlLm5hdkRhdGEgYW5kIGNhcm91c2VsU2VydmljZS5kb3RzRGF0YSB1cGRhdGUgZWFybGllciB0aGFuIGNhcm91c2VsU2Vydml2ZS51cGRhdGUoKSBnZXRzIGNhbGxlZFxyXG4gICAgICAgIC8vIHVwZGF0ZXMgb2YgY2Fyb3VzZWxTZXJ2aWNlLm5hdkRhdGEgYW5kIGNhcm91c2VsU2VydmljZS5kb3RzRGF0YSBhcmUgYmVpbmcgaGFwcGVuaW5nIHdpdGhpbmcgY2Fyb3VzZWxTZXJ2aWNlLmN1cnJlbnQocG9zaXRpb24pIG1ldGhvZCB3aGljaCBjYWxscyBuZXh0KCkgb2YgX2NoYW5nZWRTZXR0aW5nc0Nhcm91c2VsJFxyXG4gICAgICAgIC8vIGNhcm91c2VsU2VydmljZS5jdXJyZW50KHBvc2l0aW9uKSBpcyBiZWluZyBjYWxsaW5nIGVhcmxpZXIgdGhhbiBjYXJvdXNlbFNlcnZpdmUudXBkYXRlKCk7XHJcbiAgICAgICAgLy8gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2VuZENoYW5nZXMoKTtcclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgcmVmcmVzaGVkQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRSZWZyZXNoZWRTdGF0ZSgpLnBpcGUoXHJcbiAgICAgIHRhcCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlTmF2UGFnZXMoKTtcclxuICAgICAgICB0aGlzLmRyYXcoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNlbmRDaGFuZ2VzKCk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IG5hdk1lcmdlJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gbWVyZ2UoaW5pdGlhbGl6ZWRDYXJvdXNlbCQsIGNoYW5nZWRTZXR0aW5ncyQsIHJlZnJlc2hlZENhcm91c2VsJCk7XHJcbiAgICB0aGlzLm5hdlN1YnNjcmlwdGlvbiA9IG5hdk1lcmdlJC5zdWJzY3JpYmUoXHJcbiAgICAgICgpID0+IHt9XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcblx0ICogSW5pdGlhbGl6ZXMgdGhlIGxheW91dCBvZiB0aGUgcGx1Z2luIGFuZCBleHRlbmRzIHRoZSBjYXJvdXNlbC5cclxuXHQgKi9cclxuXHRpbml0aWFsaXplKCkge1xyXG4gICAgdGhpcy5fbmF2RGF0YS5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICB0aGlzLl9uYXZEYXRhLnByZXYuaHRtbFRleHQgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5uYXZUZXh0WzBdO1xyXG4gICAgdGhpcy5fbmF2RGF0YS5uZXh0Lmh0bWxUZXh0ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MubmF2VGV4dFsxXTtcclxuXHJcbiAgICB0aGlzLl9kb3RzRGF0YS5kaXNhYmxlZCA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UubmF2RGF0YSA9IHRoaXMuX25hdkRhdGE7XHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5kb3RzRGF0YSA9IHRoaXMuX2RvdHNEYXRhO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsY3VsYXRlcyBpbnRlcm5hbCBzdGF0ZXMgYW5kIHVwZGF0ZXMgcHJvcCBfcGFnZXNcclxuICAgKi9cclxuXHRwcml2YXRlIF91cGRhdGVOYXZQYWdlcygpIHtcclxuXHRcdGxldCBpOiBudW1iZXIsIGo6IG51bWJlciwgazogbnVtYmVyO1xyXG5cdFx0Y29uc3QgbG93ZXI6IG51bWJlciA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmNsb25lcygpLmxlbmd0aCAvIDIsXHJcbiAgICAgIHVwcGVyOiBudW1iZXIgPSBsb3dlciArIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLml0ZW1zKCkubGVuZ3RoLFxyXG4gICAgICBtYXhpbXVtOiBudW1iZXIgPSB0aGlzLmNhcm91c2VsU2VydmljZS5tYXhpbXVtKHRydWUpLFxyXG4gICAgICBwYWdlczogYW55W10gPSBbXSxcclxuICAgICAgc2V0dGluZ3M6IE93bE9wdGlvbnMgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncztcclxuICAgICBsZXQgc2l6ZSA9IHNldHRpbmdzLmNlbnRlciB8fCBzZXR0aW5ncy5hdXRvV2lkdGggfHwgc2V0dGluZ3MuZG90c0RhdGFcclxuICAgICAgICA/IDEgOiBzZXR0aW5ncy5kb3RzRWFjaCB8fCBzZXR0aW5ncy5pdGVtcztcclxuICAgICAgc2l6ZSA9ICtzaXplO1xyXG5cdFx0aWYgKHNldHRpbmdzLnNsaWRlQnkgIT09ICdwYWdlJykge1xyXG5cdFx0XHRzZXR0aW5ncy5zbGlkZUJ5ID0gTWF0aC5taW4oK3NldHRpbmdzLnNsaWRlQnksIHNldHRpbmdzLml0ZW1zKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoc2V0dGluZ3MuZG90cyB8fCBzZXR0aW5ncy5zbGlkZUJ5ID09PSAncGFnZScpIHtcclxuXHJcblx0XHRcdGZvciAoaSA9IGxvd2VyLCBqID0gMCwgayA9IDA7IGkgPCB1cHBlcjsgaSsrKSB7XHJcblx0XHRcdFx0aWYgKGogPj0gc2l6ZSB8fCBqID09PSAwKSB7XHJcblx0XHRcdFx0XHRwYWdlcy5wdXNoKHtcclxuXHRcdFx0XHRcdFx0c3RhcnQ6IE1hdGgubWluKG1heGltdW0sIGkgLSBsb3dlciksXHJcblx0XHRcdFx0XHRcdGVuZDogaSAtIGxvd2VyICsgc2l6ZSAtIDFcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0aWYgKE1hdGgubWluKG1heGltdW0sIGkgLSBsb3dlcikgPT09IG1heGltdW0pIHtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRqID0gMCwgKytrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRqICs9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm1lcmdlcnModGhpcy5jYXJvdXNlbFNlcnZpY2UucmVsYXRpdmUoaSkpIGFzIG51bWJlcjtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0dGhpcy5fcGFnZXMgPSBwYWdlcztcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIERyYXdzIHRoZSB1c2VyIGludGVyZmFjZS5cclxuXHQgKiBAdG9kbyBUaGUgb3B0aW9uIGBkb3RzRGF0YWAgd29udCB3b3JrLlxyXG5cdCAqL1xyXG4gIGRyYXcoKSB7XHJcblx0XHRsZXQgZGlmZmVyZW5jZTogbnVtYmVyO1xyXG4gICAgY29uc3RcdHNldHRpbmdzOiBPd2xPcHRpb25zID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MsXHJcbiAgICAgIGl0ZW1zOiBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlW10gPSB0aGlzLmNhcm91c2VsU2VydmljZS5pdGVtcygpLFxyXG4gICAgICBkaXNhYmxlZCA9IGl0ZW1zLmxlbmd0aCA8PSBzZXR0aW5ncy5pdGVtcztcclxuXHJcblx0XHR0aGlzLl9uYXZEYXRhLmRpc2FibGVkID0gIXNldHRpbmdzLm5hdiB8fCBkaXNhYmxlZDtcclxuXHRcdHRoaXMuX2RvdHNEYXRhLmRpc2FibGVkID0gIXNldHRpbmdzLmRvdHMgfHwgZGlzYWJsZWQ7XHJcblxyXG5cdFx0aWYgKHNldHRpbmdzLmRvdHMpIHtcclxuXHRcdFx0ZGlmZmVyZW5jZSA9IHRoaXMuX3BhZ2VzLmxlbmd0aCAtIHRoaXMuX2RvdHNEYXRhLmRvdHMubGVuZ3RoO1xyXG5cclxuXHRcdFx0aWYgKHNldHRpbmdzLmRvdHNEYXRhICYmIGRpZmZlcmVuY2UgIT09IDApIHtcclxuICAgICAgICB0aGlzLl9kb3RzRGF0YS5kb3RzID0gW107XHJcbiAgICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgIHRoaXMuX2RvdHNEYXRhLmRvdHMucHVzaCh7XHJcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGlkOiBgZG90LSR7aXRlbS5pZH1gLFxyXG4gICAgICAgICAgICBpbm5lckNvbnRlbnQ6IGl0ZW0uZG90Q29udGVudCxcclxuICAgICAgICAgICAgc2hvd0lubmVyQ29udGVudDogdHJ1ZVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblx0XHRcdH0gZWxzZSBpZiAoZGlmZmVyZW5jZSA+IDApIHtcclxuICAgICAgICBjb25zdCBzdGFydEk6IG51bWJlciA9IHRoaXMuX2RvdHNEYXRhLmRvdHMubGVuZ3RoID4gMCA/IHRoaXMuX2RvdHNEYXRhLmRvdHMubGVuZ3RoIDogMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpZmZlcmVuY2U7IGkrKykge1xyXG4gICAgICAgICAgdGhpcy5fZG90c0RhdGEuZG90cy5wdXNoKHtcclxuICAgICAgICAgICAgYWN0aXZlOiBmYWxzZSxcclxuICAgICAgICAgICAgaWQ6IGBkb3QtJHtpICsgc3RhcnRJfWAsXHJcbiAgICAgICAgICAgIHNob3dJbm5lckNvbnRlbnQ6IGZhbHNlXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblx0XHRcdH0gZWxzZSBpZiAoZGlmZmVyZW5jZSA8IDApIHtcclxuICAgICAgICB0aGlzLl9kb3RzRGF0YS5kb3RzLnNwbGljZShkaWZmZXJlbmNlLCBNYXRoLmFicyhkaWZmZXJlbmNlKSlcclxuXHRcdFx0fVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm5hdkRhdGEgPSB0aGlzLl9uYXZEYXRhO1xyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UuZG90c0RhdGEgPSB0aGlzLl9kb3RzRGF0YTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGVzIG5hdmlnYXRpb24gYnV0dG9ucydzIGFuZCBkb3RzJ3Mgc3RhdGVzXHJcbiAgICovXHJcbiAgdXBkYXRlKCkge1xyXG4gICAgdGhpcy5fdXBkYXRlTmF2QnV0dG9ucygpO1xyXG4gICAgdGhpcy5fdXBkYXRlRG90cygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hhbmdlcyBzdGF0ZSBvZiBuYXYgYnV0dG9ucyAoZGlzYWJsZWQsIGVuYWJsZWQpXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfdXBkYXRlTmF2QnV0dG9ucygpIHtcclxuICAgIGNvbnN0XHRzZXR0aW5nczogT3dsT3B0aW9ucyA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLFxyXG4gICAgICBsb29wOiBib29sZWFuID0gc2V0dGluZ3MubG9vcCB8fCBzZXR0aW5ncy5yZXdpbmQsXHJcbiAgICAgIGluZGV4OiBudW1iZXIgPSB0aGlzLmNhcm91c2VsU2VydmljZS5yZWxhdGl2ZSh0aGlzLmNhcm91c2VsU2VydmljZS5jdXJyZW50KCkpO1xyXG5cclxuICAgIGlmIChzZXR0aW5ncy5uYXYpIHtcclxuICAgICAgdGhpcy5fbmF2RGF0YS5wcmV2LmRpc2FibGVkID0gIWxvb3AgJiYgaW5kZXggPD0gdGhpcy5jYXJvdXNlbFNlcnZpY2UubWluaW11bSh0cnVlKTtcclxuXHRcdFx0dGhpcy5fbmF2RGF0YS5uZXh0LmRpc2FibGVkID0gIWxvb3AgJiYgaW5kZXggPj0gdGhpcy5jYXJvdXNlbFNlcnZpY2UubWF4aW11bSh0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5uYXZEYXRhID0gdGhpcy5fbmF2RGF0YTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoYW5nZXMgYWN0aXZlIGRvdCBpZiBwYWdlIGJlY29tZXMgY2hhbmdlZFxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3VwZGF0ZURvdHMoKSB7XHJcbiAgICBsZXQgY3VyQWN0aXZlRG90STogbnVtYmVyO1xyXG4gICAgdGhpcy5fZG90c0RhdGEuZG90cy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICBpZiAoaXRlbS5hY3RpdmUgPT09IHRydWUpIHtcclxuICAgICAgICBpdGVtLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIGN1ckFjdGl2ZURvdEkgPSB0aGlzLl9jdXJyZW50KCk7XHJcbiAgICBpZiAodGhpcy5fZG90c0RhdGEuZG90cy5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5fZG90c0RhdGEuZG90c1tjdXJBY3RpdmVEb3RJXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UuZG90c0RhdGEgPSB0aGlzLl9kb3RzRGF0YTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEdldHMgdGhlIGN1cnJlbnQgcGFnZSBwb3NpdGlvbiBvZiB0aGUgY2Fyb3VzZWwuXHJcblx0ICogQHJldHVybnMgdGhlIGN1cnJlbnQgcGFnZSBwb3NpdGlvbiBvZiB0aGUgY2Fyb3VzZWxcclxuXHQgKi9cclxuXHRwcml2YXRlIF9jdXJyZW50KCk6IGFueSB7XHJcbiAgICBjb25zdCBjdXJyZW50OiBudW1iZXIgPSB0aGlzLmNhcm91c2VsU2VydmljZS5yZWxhdGl2ZSh0aGlzLmNhcm91c2VsU2VydmljZS5jdXJyZW50KCkpO1xyXG4gICAgbGV0IGZpbmFsQ3VycmVudDogbnVtYmVyO1xyXG4gICAgY29uc3QgcGFnZXM6IGFueSA9IHRoaXMuX3BhZ2VzLmZpbHRlcigocGFnZSwgaW5kZXgpID0+IHtcclxuICAgICAgcmV0dXJuIHBhZ2Uuc3RhcnQgPD0gY3VycmVudCAmJiBwYWdlLmVuZCA+PSBjdXJyZW50O1xyXG4gICAgfSkucG9wKCk7XHJcblxyXG4gICAgZmluYWxDdXJyZW50ID0gdGhpcy5fcGFnZXMuZmluZEluZGV4KHBhZ2UgPT4ge1xyXG4gICAgICByZXR1cm4gcGFnZS5zdGFydCA9PT0gcGFnZXMuc3RhcnQgJiYgcGFnZS5lbmQgPT09IHBhZ2VzLmVuZDtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBmaW5hbEN1cnJlbnQ7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcblx0ICogR2V0cyB0aGUgY3VycmVudCBzdWNjZXNvci9wcmVkZWNlc3NvciBwb3NpdGlvbi5cclxuICAgKiBAcGFyYW0gc3Vzc2Vzc29yIHBvc2l0aW9uIG9mIHNsaWRlXHJcblx0ICogQHJldHVybnMgdGhlIGN1cnJlbnQgc3VjY2Vzb3IvcHJlZGVjZXNzb3IgcG9zaXRpb25cclxuXHQgKi9cclxuXHRwcml2YXRlIF9nZXRQb3NpdGlvbihzdWNjZXNzb3I6IG51bWJlciB8IGJvb2xlYW4pOiBudW1iZXIge1xyXG5cdFx0bGV0IHBvc2l0aW9uOiBudW1iZXIsIGxlbmd0aDogbnVtYmVyO1xyXG5cdFx0Y29uc3RcdHNldHRpbmdzOiBPd2xPcHRpb25zID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3M7XHJcblxyXG5cdFx0aWYgKHNldHRpbmdzLnNsaWRlQnkgPT09ICdwYWdlJykge1xyXG5cdFx0XHRwb3NpdGlvbiA9IHRoaXMuX2N1cnJlbnQoKTtcclxuXHRcdFx0bGVuZ3RoID0gdGhpcy5fcGFnZXMubGVuZ3RoO1xyXG5cdFx0XHRzdWNjZXNzb3IgPyArK3Bvc2l0aW9uIDogLS1wb3NpdGlvbjtcclxuXHRcdFx0cG9zaXRpb24gPSB0aGlzLl9wYWdlc1soKHBvc2l0aW9uICUgbGVuZ3RoKSArIGxlbmd0aCkgJSBsZW5ndGhdLnN0YXJ0O1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cG9zaXRpb24gPSB0aGlzLmNhcm91c2VsU2VydmljZS5yZWxhdGl2ZSh0aGlzLmNhcm91c2VsU2VydmljZS5jdXJyZW50KCkpO1xyXG5cdFx0XHRsZW5ndGggPSB0aGlzLmNhcm91c2VsU2VydmljZS5pdGVtcygpLmxlbmd0aDtcclxuXHRcdFx0c3VjY2Vzc29yID8gcG9zaXRpb24gKz0gK3NldHRpbmdzLnNsaWRlQnkgOiBwb3NpdGlvbiAtPSArc2V0dGluZ3Muc2xpZGVCeTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcG9zaXRpb247XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcblx0ICogU2xpZGVzIHRvIHRoZSBuZXh0IGl0ZW0gb3IgcGFnZS5cclxuXHQgKiBAcGFyYW0gc3BlZWQgVGhlIHRpbWUgaW4gbWlsbGlzZWNvbmRzIGZvciB0aGUgdHJhbnNpdGlvbi5cclxuXHQgKi9cclxuXHRuZXh0KHNwZWVkOiBudW1iZXIgfCBib29sZWFuKSB7XHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS50byh0aGlzLl9nZXRQb3NpdGlvbih0cnVlKSwgc3BlZWQpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNsaWRlcyB0byB0aGUgcHJldmlvdXMgaXRlbSBvciBwYWdlLlxyXG5cdCAqIEBwYXJhbSBzcGVlZCBUaGUgdGltZSBpbiBtaWxsaXNlY29uZHMgZm9yIHRoZSB0cmFuc2l0aW9uLlxyXG5cdCAqL1xyXG5cdHByZXYoc3BlZWQ6IG51bWJlciB8IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnRvKHRoaXMuX2dldFBvc2l0aW9uKGZhbHNlKSwgc3BlZWQpO1xyXG4gIH07XHJcblxyXG4gXHQvKipcclxuXHQgKiBTbGlkZXMgdG8gdGhlIHNwZWNpZmllZCBpdGVtIG9yIHBhZ2UuXHJcblx0ICogQHBhcmFtIHBvc2l0aW9uIC0gVGhlIHBvc2l0aW9uIG9mIHRoZSBpdGVtIG9yIHBhZ2UuXHJcblx0ICogQHBhcmFtIHNwZWVkIC0gVGhlIHRpbWUgaW4gbWlsbGlzZWNvbmRzIGZvciB0aGUgdHJhbnNpdGlvbi5cclxuXHQgKiBAcGFyYW0gc3RhbmRhcmQgLSBXaGV0aGVyIHRvIHVzZSB0aGUgc3RhbmRhcmQgYmVoYXZpb3VyIG9yIG5vdC4gRGVmYXVsdCBtZWFuaW5nIGZhbHNlXHJcblx0ICovXHJcblx0dG8ocG9zaXRpb246IG51bWJlciwgc3BlZWQ6IG51bWJlciB8IGJvb2xlYW4sIHN0YW5kYXJkPzogYm9vbGVhbikge1xyXG5cdFx0bGV0IGxlbmd0aDogbnVtYmVyO1xyXG5cdFx0aWYgKCFzdGFuZGFyZCAmJiB0aGlzLl9wYWdlcy5sZW5ndGgpIHtcclxuICAgICAgbGVuZ3RoID0gdGhpcy5fcGFnZXMubGVuZ3RoO1xyXG4gICAgICB0aGlzLmNhcm91c2VsU2VydmljZS50byh0aGlzLl9wYWdlc1soKHBvc2l0aW9uICUgbGVuZ3RoKSArIGxlbmd0aCkgJSBsZW5ndGhdLnN0YXJ0LCBzcGVlZCk7XHJcblx0XHR9IGVsc2Uge1xyXG4gICAgICB0aGlzLmNhcm91c2VsU2VydmljZS50byhwb3NpdGlvbiwgc3BlZWQpO1xyXG5cdFx0fVxyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIE1vdmVzIGNhcm91c2VsIGFmdGVyIHVzZXIncyBjbGlja2luZyBvbiBhbnkgZG90c1xyXG4gICAqL1xyXG4gIG1vdmVCeURvdChkb3RJZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBpbmRleDogbnVtYmVyID0gdGhpcy5fZG90c0RhdGEuZG90cy5maW5kSW5kZXgoZG90ID0+IGRvdElkID09PSBkb3QuaWQpO1xyXG4gICAgdGhpcy50byhpbmRleCwgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuZG90c1NwZWVkKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHJld2luZHMgY2Fyb3VzZWwgdG8gc2xpZGUgd2l0aCBuZWVkZWQgaWRcclxuICAgKiBAcGFyYW0gaWQgaWQgb2Ygc2xpZGVcclxuICAgKi9cclxuICB0b1NsaWRlQnlJZChpZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNsaWRlc0RhdGEuZmluZEluZGV4KHNsaWRlID0+IHNsaWRlLmlkID09PSBpZCAmJiBzbGlkZS5pc0Nsb25lZCA9PT0gZmFsc2UpO1xyXG5cclxuICAgIGlmIChwb3NpdGlvbiA9PT0gLTEgfHwgcG9zaXRpb24gPT09IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmN1cnJlbnQoKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG5cdFx0dGhpcy5jYXJvdXNlbFNlcnZpY2UudG8odGhpcy5jYXJvdXNlbFNlcnZpY2UucmVsYXRpdmUocG9zaXRpb24pLCBmYWxzZSk7XHJcbiAgfVxyXG5cclxufVxyXG4iLCIvLyBpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbi8vIGZ1bmN0aW9uIF93aW5kb3coKTogYW55IHtcclxuLy8gICAgLy8gcmV0dXJuIHRoZSBnbG9iYWwgbmF0aXZlIGJyb3dzZXIgd2luZG93IG9iamVjdFxyXG4vLyAgICByZXR1cm4gd2luZG93O1xyXG4vLyB9XHJcbi8vIEBJbmplY3RhYmxlKClcclxuLy8gZXhwb3J0IGNsYXNzIFdpbmRvd1JlZlNlcnZpY2Uge1xyXG4vLyAgICBnZXQgbmF0aXZlV2luZG93KCk6IGFueSB7XHJcbi8vICAgICAgIHJldHVybiBfd2luZG93KCk7XHJcbi8vICAgIH1cclxuLy8gfVxyXG5cclxuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge1xyXG4gIENsYXNzUHJvdmlkZXIsXHJcbiAgRmFjdG9yeVByb3ZpZGVyLFxyXG4gIEluamVjdGlvblRva2VuLFxyXG4gIFBMQVRGT1JNX0lEXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGEgbmV3IGluamVjdGlvbiB0b2tlbiBmb3IgaW5qZWN0aW5nIHRoZSB3aW5kb3cgaW50byBhIGNvbXBvbmVudC5cclxuICovXHJcbmV4cG9ydCBjb25zdCBXSU5ET1cgPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ1dpbmRvd1Rva2VuJyk7XHJcblxyXG4vKipcclxuICogRGVmaW5lIGFic3RyYWN0IGNsYXNzIGZvciBvYnRhaW5pbmcgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgd2luZG93IG9iamVjdC5cclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBXaW5kb3dSZWYge1xyXG4gIGdldCBuYXRpdmVXaW5kb3coKTogV2luZG93IHwgT2JqZWN0IHtcclxuICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkLicpO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIERlZmluZSBjbGFzcyB0aGF0IGltcGxlbWVudHMgdGhlIGFic3RyYWN0IGNsYXNzIGFuZCByZXR1cm5zIHRoZSBuYXRpdmUgd2luZG93IG9iamVjdC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBCcm93c2VyV2luZG93UmVmIGV4dGVuZHMgV2luZG93UmVmIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcmV0dXJucyB3aW5kb3cgb2JqZWN0XHJcbiAgICovXHJcbiAgZ2V0IG5hdGl2ZVdpbmRvdygpOiBXaW5kb3cgfCBPYmplY3Qge1xyXG4gICAgcmV0dXJuIHdpbmRvdztcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYW4gZmFjdG9yeSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIG5hdGl2ZSB3aW5kb3cgb2JqZWN0LlxyXG4gKiBAcGFyYW0gYnJvd3NlcldpbmRvd1JlZiBOYXRpdmUgd2luZG93IG9iamVjdFxyXG4gKiBAcGFyYW0gcGxhdGZvcm1JZCBpZCBvZiBwbGF0Zm9ybVxyXG4gKiBAcmV0dXJucyB0eXBlIG9mIHBsYXRmb3JtIG9mIGVtcHR5IG9iamVjdFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHdpbmRvd0ZhY3RvcnkoXHJcbiAgYnJvd3NlcldpbmRvd1JlZjogQnJvd3NlcldpbmRvd1JlZixcclxuICBwbGF0Zm9ybUlkOiBPYmplY3RcclxuKTogV2luZG93IHwgT2JqZWN0IHtcclxuICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIocGxhdGZvcm1JZCkpIHtcclxuICAgIHJldHVybiBicm93c2VyV2luZG93UmVmLm5hdGl2ZVdpbmRvdztcclxuICB9XHJcbiAgcmV0dXJuIG5ldyBPYmplY3QoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhIGluamVjdGFibGUgcHJvdmlkZXIgZm9yIHRoZSBXaW5kb3dSZWYgdG9rZW4gdGhhdCB1c2VzIHRoZSBCcm93c2VyV2luZG93UmVmIGNsYXNzLlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGJyb3dzZXJXaW5kb3dQcm92aWRlcjogQ2xhc3NQcm92aWRlciA9IHtcclxuICBwcm92aWRlOiBXaW5kb3dSZWYsXHJcbiAgdXNlQ2xhc3M6IEJyb3dzZXJXaW5kb3dSZWZcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYW4gaW5qZWN0YWJsZSBwcm92aWRlciB0aGF0IHVzZXMgdGhlIHdpbmRvd0ZhY3RvcnkgZnVuY3Rpb24gZm9yIHJldHVybmluZyB0aGUgbmF0aXZlIHdpbmRvdyBvYmplY3QuXHJcbiAqL1xyXG5leHBvcnQgY29uc3Qgd2luZG93UHJvdmlkZXI6IEZhY3RvcnlQcm92aWRlciA9IHtcclxuICBwcm92aWRlOiBXSU5ET1csXHJcbiAgdXNlRmFjdG9yeTogd2luZG93RmFjdG9yeSxcclxuICBkZXBzOiBbV2luZG93UmVmLCBQTEFURk9STV9JRF1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYW4gYXJyYXkgb2YgcHJvdmlkZXJzLlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IFdJTkRPV19QUk9WSURFUlMgPSBbYnJvd3NlcldpbmRvd1Byb3ZpZGVyLCB3aW5kb3dQcm92aWRlcl07XHJcbiIsImltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtcclxuICBDbGFzc1Byb3ZpZGVyLFxyXG4gIEZhY3RvcnlQcm92aWRlcixcclxuICBJbmplY3Rpb25Ub2tlbixcclxuICBQTEFURk9STV9JRCxcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYSBuZXcgaW5qZWN0aW9uIHRva2VuIGZvciBpbmplY3RpbmcgdGhlIERvY3VtZW50IGludG8gYSBjb21wb25lbnQuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgRE9DVU1FTlQgPSBuZXcgSW5qZWN0aW9uVG9rZW48RG9jdW1lbnQ+KCdEb2N1bWVudFRva2VuJyk7XHJcbi8qKlxyXG4gKiBEZWZpbmUgYWJzdHJhY3QgY2xhc3MgZm9yIG9idGFpbmluZyByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBEb2N1bWVudCBvYmplY3QuXHJcbiAqL1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRG9jdW1lbnRSZWYge1xyXG4gIGdldCBuYXRpdmVEb2N1bWVudCgpOiBEb2N1bWVudCB8IE9iamVjdCB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZC4nKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEZWZpbmUgY2xhc3MgdGhhdCBpbXBsZW1lbnRzIHRoZSBhYnN0cmFjdCBjbGFzcyBhbmQgcmV0dXJucyB0aGUgbmF0aXZlIERvY3VtZW50IG9iamVjdC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBCcm93c2VyRG9jdW1lbnRSZWYgZXh0ZW5kcyBEb2N1bWVudFJlZiB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHJldHVybnMgRG9jdW1lbnQgb2JqZWN0XHJcbiAgICovXHJcbiAgZ2V0IG5hdGl2ZURvY3VtZW50KCk6IERvY3VtZW50IHwgT2JqZWN0IHtcclxuICAgIHJldHVybiBkb2N1bWVudDtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYW4gZmFjdG9yeSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIG5hdGl2ZSBEb2N1bWVudCBvYmplY3QuXHJcbiAqIEBwYXJhbSBicm93c2VyRG9jdW1lbnRSZWYgTmF0aXZlIERvY3VtZW50IG9iamVjdFxyXG4gKiBAcGFyYW0gcGxhdGZvcm1JZCBpZCBvZiBwbGF0Zm9ybVxyXG4gKiBAcmV0dXJucyB0eXBlIG9mIHBsYXRmb3JtIG9mIGVtcHR5IG9iamVjdFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGRvY3VtZW50RmFjdG9yeShcclxuICBicm93c2VyRG9jdW1lbnRSZWY6IEJyb3dzZXJEb2N1bWVudFJlZixcclxuICBwbGF0Zm9ybUlkOiBPYmplY3RcclxuKTogRG9jdW1lbnQgfCBPYmplY3Qge1xyXG4gIGlmIChpc1BsYXRmb3JtQnJvd3NlcihwbGF0Zm9ybUlkKSkge1xyXG4gICAgcmV0dXJuIGJyb3dzZXJEb2N1bWVudFJlZi5uYXRpdmVEb2N1bWVudDtcclxuICB9XHJcbiAgcmV0dXJuIG5ldyBPYmplY3QoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhIGluamVjdGFibGUgcHJvdmlkZXIgZm9yIHRoZSBEb2N1bWVudFJlZiB0b2tlbiB0aGF0IHVzZXMgdGhlIEJyb3dzZXJEb2N1bWVudFJlZiBjbGFzcy5cclxuICovXHJcbmV4cG9ydCBjb25zdCBicm93c2VyRG9jdW1lbnRQcm92aWRlcjogQ2xhc3NQcm92aWRlciA9IHtcclxuICBwcm92aWRlOiBEb2N1bWVudFJlZixcclxuICB1c2VDbGFzczogQnJvd3NlckRvY3VtZW50UmVmXHJcbn07XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGFuIGluamVjdGFibGUgcHJvdmlkZXIgdGhhdCB1c2VzIHRoZSBEb2N1bWVudEZhY3RvcnkgZnVuY3Rpb24gZm9yIHJldHVybmluZyB0aGUgbmF0aXZlIERvY3VtZW50IG9iamVjdC5cclxuICovXHJcbmV4cG9ydCBjb25zdCBkb2N1bWVudFByb3ZpZGVyOiBGYWN0b3J5UHJvdmlkZXIgPSB7XHJcbiAgcHJvdmlkZTogRE9DVU1FTlQsXHJcbiAgdXNlRmFjdG9yeTogZG9jdW1lbnRGYWN0b3J5LFxyXG4gIGRlcHM6IFtEb2N1bWVudFJlZiwgUExBVEZPUk1fSURdXHJcbn07XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGFuIGFycmF5IG9mIHByb3ZpZGVycy5cclxuICovXHJcbmV4cG9ydCBjb25zdCBET0NVTUVOVF9QUk9WSURFUlMgPSBbYnJvd3NlckRvY3VtZW50UHJvdmlkZXIsIGRvY3VtZW50UHJvdmlkZXJdO1xyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIE9ic2VydmFibGUsIG1lcmdlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IENhcm91c2VsU2VydmljZSB9IGZyb20gJy4vY2Fyb3VzZWwuc2VydmljZSc7XHJcbmltcG9ydCB7IHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgV0lORE9XIH0gZnJvbSAnLi93aW5kb3ctcmVmLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJy4vZG9jdW1lbnQtcmVmLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQXV0b3BsYXlTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95e1xyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlvcHRpb24gdG8gbWVyZ2UgT2JzZXJ2YWJsZXMgZnJvbSBDYXJvdXNlbFNlcnZpY2VcclxuICAgKi9cclxuICBhdXRvcGxheVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgYXV0b3BsYXkgdGltZW91dC5cclxuICAgKi9cclxuICBwcml2YXRlIF90aW1lb3V0OiBudW1iZXIgPSBudWxsO1xyXG5cclxuICAvKipcclxuICAgKiBJbmRpY2F0ZXMgd2hlbmV2ZXIgdGhlIGF1dG9wbGF5IGlzIHBhdXNlZC5cclxuICAgKi9cclxuICBwcml2YXRlIF9wYXVzZWQgPSBmYWxzZTtcclxuXHJcbiAgcHJpdmF0ZSB3aW5SZWY6IFdpbmRvdztcclxuICBwcml2YXRlIGRvY1JlZjogRG9jdW1lbnQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2Fyb3VzZWxTZXJ2aWNlOiBDYXJvdXNlbFNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgQEluamVjdChXSU5ET1cpIHdpblJlZjogYW55LFxyXG4gICAgICAgICAgICAgIEBJbmplY3QoRE9DVU1FTlQpIGRvY1JlZjogYW55LFxyXG4gICkge1xyXG4gICAgdGhpcy53aW5SZWYgPSB3aW5SZWYgYXMgV2luZG93O1xyXG4gICAgdGhpcy5kb2NSZWYgPSBkb2NSZWYgYXMgRG9jdW1lbnQ7XHJcbiAgICB0aGlzLnNweURhdGFTdHJlYW1zKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuYXV0b3BsYXlTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlZmluZXMgT2JzZXJ2YWJsZXMgd2hpY2ggc2VydmljZSBtdXN0IG9ic2VydmVcclxuICAgKi9cclxuICBzcHlEYXRhU3RyZWFtcygpIHtcclxuICAgIGNvbnN0IGluaXRpYWxpemVkQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRJbml0aWFsaXplZFN0YXRlKCkucGlwZShcclxuICAgICAgdGFwKCgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b3BsYXkpIHtcclxuXHRcdFx0XHRcdHRoaXMucGxheSgpO1xyXG5cdFx0XHRcdH1cclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgY2hhbmdlZFNldHRpbmdzJDogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0Q2hhbmdlZFN0YXRlKCkucGlwZShcclxuICAgICAgdGFwKGRhdGEgPT4ge1xyXG4gICAgICAgIHRoaXMuX2hhbmRsZUNoYW5nZU9ic2VydmFibGUoZGF0YSk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIC8vIG9yaWdpbmFsIEF1dG9wbGF5IFBsdWdpbiBoYXMgbGlzdGVuZXJzIG9uIHBsYXkub3dsLmNvcmUgYW5kIHN0b3Aub3dsLmNvcmUgZXZlbnRzLlxyXG4gICAgLy8gVGhleSBhcmUgdHJpZ2dlcmVkIGJ5IFZpZGVvIFBsdWdpblxyXG5cclxuICAgIGNvbnN0IGF1dG9wbGF5TWVyZ2UkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSBtZXJnZShpbml0aWFsaXplZENhcm91c2VsJCwgY2hhbmdlZFNldHRpbmdzJCk7XHJcbiAgICB0aGlzLmF1dG9wbGF5U3Vic2NyaXB0aW9uID0gYXV0b3BsYXlNZXJnZSQuc3Vic2NyaWJlKFxyXG4gICAgICAoKSA9PiB7fVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIFN0YXJ0cyB0aGUgYXV0b3BsYXkuXHJcblx0ICogQHBhcmFtIHRpbWVvdXQgVGhlIGludGVydmFsIGJlZm9yZSB0aGUgbmV4dCBhbmltYXRpb24gc3RhcnRzLlxyXG5cdCAqIEBwYXJhbSBzcGVlZCBUaGUgYW5pbWF0aW9uIHNwZWVkIGZvciB0aGUgYW5pbWF0aW9ucy5cclxuXHQgKi9cclxuXHRwbGF5KHRpbWVvdXQ/OiBudW1iZXIsIHNwZWVkPzogbnVtYmVyKSB7XHJcbiAgICBpZiAodGhpcy5fcGF1c2VkKSB7XHJcblx0XHRcdHRoaXMuX3BhdXNlZCA9IGZhbHNlO1xyXG5cdFx0XHR0aGlzLl9zZXRBdXRvUGxheUludGVydmFsKCk7XHJcbiAgICB9XHJcblxyXG5cdFx0aWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmlzKCdyb3RhdGluZycpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmNhcm91c2VsU2VydmljZS5lbnRlcigncm90YXRpbmcnKTtcclxuXHJcblx0XHR0aGlzLl9zZXRBdXRvUGxheUludGVydmFsKCk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcblx0ICogR2V0cyBhIG5ldyB0aW1lb3V0XHJcblx0ICogQHBhcmFtIHRpbWVvdXQgLSBUaGUgaW50ZXJ2YWwgYmVmb3JlIHRoZSBuZXh0IGFuaW1hdGlvbiBzdGFydHMuXHJcblx0ICogQHBhcmFtIHNwZWVkIC0gVGhlIGFuaW1hdGlvbiBzcGVlZCBmb3IgdGhlIGFuaW1hdGlvbnMuXHJcblx0ICogQHJldHVyblxyXG5cdCAqL1xyXG5cdHByaXZhdGUgX2dldE5leHRUaW1lb3V0KHRpbWVvdXQ/OiBudW1iZXIsIHNwZWVkPzogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdGlmICggdGhpcy5fdGltZW91dCApIHtcclxuXHRcdFx0dGhpcy53aW5SZWYuY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVvdXQpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXMud2luUmVmLnNldFRpbWVvdXQoKCkgPT57XHJcbiAgICAgIGlmICh0aGlzLl9wYXVzZWQgfHwgdGhpcy5jYXJvdXNlbFNlcnZpY2UuaXMoJ2J1c3knKSB8fCB0aGlzLmNhcm91c2VsU2VydmljZS5pcygnaW50ZXJhY3RpbmcnKSB8fCB0aGlzLmRvY1JlZi5oaWRkZW4pIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5jYXJvdXNlbFNlcnZpY2UubmV4dChzcGVlZCB8fCB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hdXRvcGxheVNwZWVkKTtcclxuICAgIH0sIHRpbWVvdXQgfHwgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b3BsYXlUaW1lb3V0KTtcclxuICB9O1xyXG5cclxuICAvKipcclxuXHQgKiBTZXRzIGF1dG9wbGF5IGluIG1vdGlvbi5cclxuXHQgKi9cclxuXHRwcml2YXRlIF9zZXRBdXRvUGxheUludGVydmFsKCkge1xyXG5cdFx0dGhpcy5fdGltZW91dCA9IHRoaXMuX2dldE5leHRUaW1lb3V0KCk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogU3RvcHMgdGhlIGF1dG9wbGF5LlxyXG5cdCAqL1xyXG5cdHN0b3AoKSB7XHJcblx0XHRpZiAoIXRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmlzKCdyb3RhdGluZycpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLndpblJlZi5jbGVhclRpbWVvdXQodGhpcy5fdGltZW91dCk7XHJcblx0XHR0aGlzLmNhcm91c2VsU2VydmljZS5sZWF2ZSgncm90YXRpbmcnKTtcclxuICB9O1xyXG5cclxuICAvKipcclxuXHQgKiBTdG9wcyB0aGUgYXV0b3BsYXkuXHJcblx0ICovXHJcblx0cGF1c2UoKSB7XHJcblx0XHRpZiAoIXRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmlzKCdyb3RhdGluZycpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl9wYXVzZWQgPSB0cnVlO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIE1hbmFnZXMgYnkgYXV0b3BsYXlpbmcgYWNjb3JkaW5nIHRvIGRhdGEgcGFzc2VkIGJ5IF9jaGFuZ2VkU2V0dGluZ3NDYXJvdXNlbCQgT2JzYXJ2YWJsZVxyXG4gICAqIEBwYXJhbSBkYXRhIG9iamVjdCB3aXRoIGN1cnJlbnQgcG9zaXRpb24gb2YgY2Fyb3VzZWwgYW5kIHR5cGUgb2YgY2hhbmdlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfaGFuZGxlQ2hhbmdlT2JzZXJ2YWJsZShkYXRhKSB7XHJcbiAgICBpZiAoZGF0YS5wcm9wZXJ0eS5uYW1lID09PSAnc2V0dGluZ3MnKSB7XHJcbiAgICAgIGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hdXRvcGxheSkge1xyXG4gICAgICAgIHRoaXMucGxheSgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuc3RvcCgpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEucHJvcGVydHkubmFtZSA9PT0gJ3Bvc2l0aW9uJykge1xyXG4gICAgICAvL2NvbnNvbGUubG9nKCdwbGF5PycsIGUpO1xyXG4gICAgICBpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b3BsYXkpIHtcclxuICAgICAgICB0aGlzLl9zZXRBdXRvUGxheUludGVydmFsKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0YXJ0cyBwYXVzaW5nXHJcbiAgICovXHJcbiAgc3RhcnRQYXVzaW5nKCkge1xyXG4gICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9wbGF5SG92ZXJQYXVzZSAmJiB0aGlzLmNhcm91c2VsU2VydmljZS5pcygncm90YXRpbmcnKSkge1xyXG4gICAgICB0aGlzLnBhdXNlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdGFydHMgcGxheWluZyBhZnRlciBtb3VzZSBsZWF2ZXMgY2Fyb3VzZWxcclxuICAgKi9cclxuICBzdGFydFBsYXlpbmdNb3VzZUxlYXZlKCkge1xyXG4gICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9wbGF5SG92ZXJQYXVzZSAmJiB0aGlzLmNhcm91c2VsU2VydmljZS5pcygncm90YXRpbmcnKSkge1xyXG4gICAgICB0aGlzLnBhdXNlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdGFydHMgcGxheWluZyBhZnRlciB0b3VjaCBlbmRzXHJcbiAgICovXHJcbiAgc3RhcnRQbGF5aW5nVG91Y2hFbmQoKSB7XHJcbiAgICBpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b3BsYXlIb3ZlclBhdXNlICYmIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmlzKCdyb3RhdGluZycpKSB7XHJcbiAgICAgIHRoaXMucGF1c2UoKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgT2JzZXJ2YWJsZSwgbWVyZ2UgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgQ2Fyb3VzZWxTZXJ2aWNlIH0gZnJvbSAnLi9jYXJvdXNlbC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgTGF6eUxvYWRTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcclxuICAvKipcclxuICAgKiBTdWJzY3Jpb3B0aW9uIHRvIG1lcmdlIE9ic2VydmFibGUgIGZyb20gQ2Fyb3VzZWxTZXJ2aWNlXHJcbiAgICovXHJcbiAgbGF6eUxvYWRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjYXJvdXNlbFNlcnZpY2U6IENhcm91c2VsU2VydmljZSkge1xyXG4gICAgdGhpcy5zcHlEYXRhU3RyZWFtcygpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmxhenlMb2FkU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZWZpbmVzIE9ic2VydmFibGVzIHdoaWNoIHNlcnZpY2UgbXVzdCBvYnNlcnZlXHJcbiAgICovXHJcbiAgc3B5RGF0YVN0cmVhbXMoKSB7XHJcbiAgICBjb25zdCBpbml0aWFsaXplZENhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0SW5pdGlhbGl6ZWRTdGF0ZSgpLnBpcGUoXHJcbiAgICAgIHRhcCgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgaXNMYXp5TG9hZCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzICYmICF0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5sYXp5TG9hZDtcclxuICAgICAgICB0aGlzLmNhcm91c2VsU2VydmljZS5zbGlkZXNEYXRhLmZvckVhY2goaXRlbSA9PiBpdGVtLmxvYWQgPSBpc0xhenlMb2FkID8gdHJ1ZSA6IGZhbHNlKTtcclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgY2hhbmdlU2V0dGluZ3MkOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRDaGFuZ2VTdGF0ZSgpO1xyXG5cclxuICAgIGNvbnN0IHJlc2l6ZWRDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldFJlc2l6ZWRTdGF0ZSgpO1xyXG5cclxuXHJcbiAgICBjb25zdCBsYXp5TG9hZE1lcmdlJDogT2JzZXJ2YWJsZTxzdHJpbmcgfCBhbnk+ID0gbWVyZ2UoaW5pdGlhbGl6ZWRDYXJvdXNlbCQsIGNoYW5nZVNldHRpbmdzJCwgcmVzaXplZENhcm91c2VsJCkucGlwZShcclxuICAgICAgdGFwKGRhdGEgPT4gdGhpcy5fZGVmaW5lTGF6eUxvYWRTbGlkZXMoZGF0YSkpLFxyXG4gICAgICAvLyB0YXAoKCkgPT4gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2VuZENoYW5nZXMoKSlcclxuICAgICk7XHJcbiAgICB0aGlzLmxhenlMb2FkU3Vic2NyaXB0aW9uID0gbGF6eUxvYWRNZXJnZSQuc3Vic2NyaWJlKFxyXG4gICAgICAoKSA9PiB7fVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2RlZmluZUxhenlMb2FkU2xpZGVzKGRhdGE6IGFueSkge1xyXG4gICAgaWYgKCF0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncyB8fCAhdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MubGF6eUxvYWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICgoZGF0YS5wcm9wZXJ0eSAmJiBkYXRhLnByb3BlcnR5Lm5hbWUgPT09ICdwb3NpdGlvbicpIHx8IGRhdGEgPT09ICdpbml0aWFsaXplZCcgfHwgZGF0YSA9PT0gXCJyZXNpemVkXCIpIHtcclxuICAgICAgY29uc3Qgc2V0dGluZ3MgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncyxcclxuICAgICAgICAgICAgY2xvbmVzID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuY2xvbmVzKCkubGVuZ3RoO1xyXG4gICAgICBsZXQgbiA9IChzZXR0aW5ncy5jZW50ZXIgJiYgTWF0aC5jZWlsKHNldHRpbmdzLml0ZW1zIC8gMikgfHwgc2V0dGluZ3MuaXRlbXMpLFxyXG4gICAgICAgICAgaSA9ICgoc2V0dGluZ3MuY2VudGVyICYmIG4gKiAtMSkgfHwgMCksXHJcbiAgICAgICAgICBwb3NpdGlvbiA9IChkYXRhLnByb3BlcnR5ICYmIGRhdGEucHJvcGVydHkudmFsdWUgIT09IHVuZGVmaW5lZCA/IGRhdGEucHJvcGVydHkudmFsdWUgOiB0aGlzLmNhcm91c2VsU2VydmljZS5jdXJyZW50KCkpICsgaTtcclxuICAgICAgICAvLyBsb2FkID0gJC5wcm94eShmdW5jdGlvbihpLCB2KSB7IHRoaXMubG9hZCh2KSB9LCB0aGlzKTtcclxuICAgICAgLy9UT0RPOiBOZWVkIGRvY3VtZW50YXRpb24gZm9yIHRoaXMgbmV3IG9wdGlvblxyXG4gICAgICBpZiAoc2V0dGluZ3MubGF6eUxvYWRFYWdlciA+IDApIHtcclxuICAgICAgICBuICs9IHNldHRpbmdzLmxhenlMb2FkRWFnZXI7XHJcbiAgICAgICAgLy8gSWYgdGhlIGNhcm91c2VsIGlzIGxvb3BpbmcgYWxzbyBwcmVsb2FkIGltYWdlcyB0aGF0IGFyZSB0byB0aGUgXCJsZWZ0XCJcclxuICAgICAgICBpZiAoc2V0dGluZ3MubG9vcCkge1xyXG4gICAgICAgICAgcG9zaXRpb24gLT0gc2V0dGluZ3MubGF6eUxvYWRFYWdlcjtcclxuICAgICAgICAgIG4rKztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHdoaWxlIChpKysgPCBuKSB7XHJcbiAgICAgICAgdGhpcy5fbG9hZChjbG9uZXMgLyAyICsgdGhpcy5jYXJvdXNlbFNlcnZpY2UucmVsYXRpdmUocG9zaXRpb24pKTtcclxuICAgICAgICBpZiAoY2xvbmVzKSB7XHJcbiAgICAgICAgICB0aGlzLmNhcm91c2VsU2VydmljZS5jbG9uZXModGhpcy5jYXJvdXNlbFNlcnZpY2UucmVsYXRpdmUocG9zaXRpb24pKS5mb3JFYWNoKHZhbHVlID0+IHRoaXMuX2xvYWQodmFsdWUpKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBvc2l0aW9uKys7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIExvYWRzIGFsbCByZXNvdXJjZXMgb2YgYW4gaXRlbSBhdCB0aGUgc3BlY2lmaWVkIHBvc2l0aW9uLlxyXG5cdCAqIEBwYXJhbSBwb3NpdGlvbiAtIFRoZSBhYnNvbHV0ZSBwb3NpdGlvbiBvZiB0aGUgaXRlbS5cclxuXHQgKi9cclxuICBwcml2YXRlIF9sb2FkKHBvc2l0aW9uOiBudW1iZXIpIHtcclxuICAgIGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5zbGlkZXNEYXRhW3Bvc2l0aW9uXS5sb2FkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5zbGlkZXNEYXRhW3Bvc2l0aW9uXS5sb2FkID0gdHJ1ZTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgT2JzZXJ2YWJsZSwgbWVyZ2UgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgQ2Fyb3VzZWxTZXJ2aWNlIH0gZnJvbSAnLi9jYXJvdXNlbC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQW5pbWF0ZVNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3l7XHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaW9wdGlvbiB0byBtZXJnZSBPYnNlcnZhYmxlICBmcm9tIENhcm91c2VsU2VydmljZVxyXG4gICAqL1xyXG4gIGFuaW1hdGVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogc1xyXG4gICAqL1xyXG4gIHN3YXBwaW5nID0gdHJ1ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogYWN0aXZlIHNsaWRlIGJlZm9yZSB0cmFuc2xhdGluZ1xyXG4gICAqL1xyXG4gIHByZXZpb3VzID0gdW5kZWZpbmVkO1xyXG5cclxuICAvKipcclxuICAgKiBuZXcgYWN0aXZlIHNsaWRlIGFmdGVyIHRyYW5zbGF0aW5nXHJcbiAgICovXHJcbiAgbmV4dCA9IHVuZGVmaW5lZDtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjYXJvdXNlbFNlcnZpY2U6IENhcm91c2VsU2VydmljZSkge1xyXG4gICAgdGhpcy5zcHlEYXRhU3RyZWFtcygpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmFuaW1hdGVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlZmluZXMgT2JzZXJ2YWJsZXMgd2hpY2ggc2VydmljZSBtdXN0IG9ic2VydmVcclxuICAgKi9cclxuICBzcHlEYXRhU3RyZWFtcygpIHtcclxuICAgIGNvbnN0IGNoYW5nZVNldHRpbmdzJDogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0Q2hhbmdlU3RhdGUoKS5waXBlKFxyXG4gICAgICB0YXAoZGF0YSA9PiB7XHJcbiAgICAgICAgaWYgKGRhdGEucHJvcGVydHkubmFtZSA9PT0gJ3Bvc2l0aW9uJykge1xyXG5cdFx0XHRcdFx0dGhpcy5wcmV2aW91cyA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmN1cnJlbnQoKTtcclxuXHRcdFx0XHRcdHRoaXMubmV4dCA9IGRhdGEucHJvcGVydHkudmFsdWU7XHJcblx0XHRcdFx0fVxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBkcmFnQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXREcmFnU3RhdGUoKTtcclxuICAgIGNvbnN0IGRyYWdnZWRDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldERyYWdnZWRTdGF0ZSgpO1xyXG4gICAgY29uc3QgdHJhbnNsYXRlZENhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0VHJhbnNsYXRlZFN0YXRlKCk7XHJcblxyXG4gICAgY29uc3QgZHJhZ1RyYW5zbGF0ZWRNZXJnZSQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IG1lcmdlKGRyYWdDYXJvdXNlbCQsIGRyYWdnZWRDYXJvdXNlbCQsIHRyYW5zbGF0ZWRDYXJvdXNlbCQpLnBpcGUoXHJcbiAgICAgIHRhcChkYXRhID0+IHRoaXMuc3dhcHBpbmcgPSBkYXRhID09PSAndHJhbnNsYXRlZCcpXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IHRyYW5zbGF0ZUNhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0VHJhbnNsYXRlU3RhdGUoKS5waXBlKFxyXG4gICAgICB0YXAoZGF0YSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3dhcHBpbmcgJiYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLl9vcHRpb25zLmFuaW1hdGVPdXQgfHwgdGhpcy5jYXJvdXNlbFNlcnZpY2UuX29wdGlvbnMuYW5pbWF0ZUluKSkge1xyXG4gICAgICAgICAgdGhpcy5fc3dhcCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgYW5pbWF0ZU1lcmdlJDogT2JzZXJ2YWJsZTxzdHJpbmcgfCBhbnk+ID0gbWVyZ2UoY2hhbmdlU2V0dGluZ3MkLCB0cmFuc2xhdGVDYXJvdXNlbCQsIGRyYWdUcmFuc2xhdGVkTWVyZ2UkKS5waXBlKCk7XHJcbiAgICB0aGlzLmFuaW1hdGVTdWJzY3JpcHRpb24gPSBhbmltYXRlTWVyZ2UkLnN1YnNjcmliZShcclxuICAgICAgKCkgPT4ge31cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuXHQgKiBUb2dnbGVzIHRoZSBhbmltYXRpb24gY2xhc3NlcyB3aGVuZXZlciBhbiB0cmFuc2xhdGlvbnMgc3RhcnRzLlxyXG5cdCAqIEByZXR1cm5zXHJcblx0ICovXHJcblx0cHJpdmF0ZSBfc3dhcCgpOiBib29sZWFuIHtcclxuXHJcblx0XHRpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuaXRlbXMgIT09IDEpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIGlmICghJC5zdXBwb3J0LmFuaW1hdGlvbiB8fCAhJC5zdXBwb3J0LnRyYW5zaXRpb24pIHtcclxuXHRcdC8vIFx0cmV0dXJuO1xyXG5cdFx0Ly8gfVxyXG5cclxuXHRcdHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNwZWVkKDApO1xyXG5cclxuXHRcdGxldCBsZWZ0O1xyXG5cdFx0Y29uc3RcdHByZXZpb3VzID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2xpZGVzRGF0YVt0aGlzLnByZXZpb3VzXSxcclxuXHRcdFx0bmV4dCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNsaWRlc0RhdGFbdGhpcy5uZXh0XSxcclxuXHRcdFx0aW5jb21pbmcgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hbmltYXRlSW4sXHJcblx0XHRcdG91dGdvaW5nID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYW5pbWF0ZU91dDtcclxuXHJcblx0XHRpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2UuY3VycmVudCgpID09PSB0aGlzLnByZXZpb3VzKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAob3V0Z29pbmcpIHtcclxuXHRcdFx0bGVmdCA9ICt0aGlzLmNhcm91c2VsU2VydmljZS5jb29yZGluYXRlcyh0aGlzLnByZXZpb3VzKSAtICt0aGlzLmNhcm91c2VsU2VydmljZS5jb29yZGluYXRlcyh0aGlzLm5leHQpO1xyXG4gICAgICB0aGlzLmNhcm91c2VsU2VydmljZS5zbGlkZXNEYXRhLmZvckVhY2goc2xpZGUgPT4ge1xyXG4gICAgICAgIGlmIChzbGlkZS5pZCA9PT0gcHJldmlvdXMuaWQpIHtcclxuICAgICAgICAgIHNsaWRlLmxlZnQgPSBgJHtsZWZ0fXB4YDtcclxuICAgICAgICAgIHNsaWRlLmlzQW5pbWF0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgc2xpZGUuaXNEZWZBbmltYXRlZE91dCA9IHRydWU7XHJcbiAgICAgICAgICBzbGlkZS5pc0N1c3RvbUFuaW1hdGVkT3V0ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChpbmNvbWluZykge1xyXG4gICAgICB0aGlzLmNhcm91c2VsU2VydmljZS5zbGlkZXNEYXRhLmZvckVhY2goc2xpZGUgPT4ge1xyXG4gICAgICAgIGlmIChzbGlkZS5pZCA9PT0gbmV4dC5pZCkge1xyXG4gICAgICAgICAgc2xpZGUuaXNBbmltYXRlZCA9IHRydWU7XHJcbiAgICAgICAgICBzbGlkZS5pc0RlZkFuaW1hdGVkSW4gPSB0cnVlO1xyXG4gICAgICAgICAgc2xpZGUuaXNDdXN0b21BbmltYXRlZEluID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhbmRsZXMgdGhlIGVuZCBvZiAnYW5pbWF0aW9uZW5kJyBldmVudFxyXG4gICAqIEBwYXJhbSBpZCBJZCBvZiBzbGlkZXNcclxuICAgKi9cclxuICBjbGVhcihpZCkge1xyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2xpZGVzRGF0YS5mb3JFYWNoKHNsaWRlID0+IHtcclxuICAgICAgaWYgKHNsaWRlLmlkID09PSBpZCkge1xyXG4gICAgICAgIHNsaWRlLmxlZnQgPSAnJztcclxuICAgICAgICBzbGlkZS5pc0FuaW1hdGVkID0gZmFsc2U7XHJcbiAgICAgICAgc2xpZGUuaXNEZWZBbmltYXRlZE91dCA9IGZhbHNlO1xyXG4gICAgICAgIHNsaWRlLmlzQ3VzdG9tQW5pbWF0ZWRPdXQgPSBmYWxzZTtcclxuICAgICAgICBzbGlkZS5pc0RlZkFuaW1hdGVkSW4gPSBmYWxzZTtcclxuICAgICAgICBzbGlkZS5pc0N1c3RvbUFuaW1hdGVkSW4gPSBmYWxzZTtcclxuICAgICAgICBzbGlkZS5jbGFzc2VzID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0Q3VyU2xpZGVDbGFzc2VzKHNsaWRlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5vblRyYW5zaXRpb25FbmQoKTtcclxuXHR9O1xyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIE9ic2VydmFibGUsIG1lcmdlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IENhcm91c2VsU2VydmljZSB9IGZyb20gJy4vY2Fyb3VzZWwuc2VydmljZSc7XHJcbmltcG9ydCB7IHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEF1dG9IZWlnaHRTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95e1xyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlvcHRpb24gdG8gbWVyZ2UgT2JzZXJ2YWJsZSAgZnJvbSBDYXJvdXNlbFNlcnZpY2VcclxuICAgKi9cclxuICBhdXRvSGVpZ2h0U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjYXJvdXNlbFNlcnZpY2U6IENhcm91c2VsU2VydmljZSkge1xyXG4gICAgdGhpcy5zcHlEYXRhU3RyZWFtcygpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmF1dG9IZWlnaHRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogRGVmaW5lcyBPYnNlcnZhYmxlcyB3aGljaCBzZXJ2aWNlIG11c3Qgb2JzZXJ2ZVxyXG4gICAqL1xyXG4gIHNweURhdGFTdHJlYW1zKCkge1xyXG4gICAgY29uc3QgaW5pdGlhbGl6ZWRDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldEluaXRpYWxpemVkU3RhdGUoKS5waXBlKFxyXG4gICAgICB0YXAoZGF0YSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9IZWlnaHQpIHtcclxuICAgICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNsaWRlc0RhdGEuZm9yRWFjaChzbGlkZSA9PiBzbGlkZS5oZWlnaHRTdGF0ZSA9ICdmdWxsJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBjaGFuZ2VkU2V0dGluZ3MkOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRDaGFuZ2VkU3RhdGUoKS5waXBlKFxyXG4gICAgICB0YXAoZGF0YSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9IZWlnaHQgJiYgZGF0YS5wcm9wZXJ0eS5uYW1lID09PSAncG9zaXRpb24nKXtcclxuXHRcdFx0XHRcdHRoaXMudXBkYXRlKCk7XHJcblx0XHRcdFx0fVxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCByZWZyZXNoZWRDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldFJlZnJlc2hlZFN0YXRlKCkucGlwZShcclxuICAgICAgdGFwKGRhdGEgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hdXRvSGVpZ2h0KSB7XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgYXV0b0hlaWdodCQ6IE9ic2VydmFibGU8c3RyaW5nIHwgYW55PiA9IG1lcmdlKGluaXRpYWxpemVkQ2Fyb3VzZWwkLCBjaGFuZ2VkU2V0dGluZ3MkLCByZWZyZXNoZWRDYXJvdXNlbCQpO1xyXG4gICAgdGhpcy5hdXRvSGVpZ2h0U3Vic2NyaXB0aW9uID0gYXV0b0hlaWdodCQuc3Vic2NyaWJlKFxyXG4gICAgICAoKSA9PiB7fVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZXMgdGhlIHByb3AgJ2hlaWdodFN0YXRlJyBvZiBzbGlkZXNcclxuICAgKi9cclxuICB1cGRhdGUoKSB7XHJcbiAgICBjb25zdCBpdGVtcyA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLml0ZW1zXHJcbiAgICBsZXQgc3RhcnQgPSB0aGlzLmNhcm91c2VsU2VydmljZS5jdXJyZW50KCksXHJcbiAgICAgICAgZW5kID0gc3RhcnQgKyBpdGVtcztcclxuXHJcbiAgICBpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuY2VudGVyKSB7XHJcbiAgICAgIHN0YXJ0ID0gaXRlbXMgJSAyID09PSAxID8gc3RhcnQgLSAoaXRlbXMgLSAxKSAvIDIgOiBzdGFydCAtIGl0ZW1zIC8gMjtcclxuICAgICAgZW5kID0gaXRlbXMgJSAyID09PSAxID8gc3RhcnQgKyBpdGVtcyA6IHN0YXJ0ICsgaXRlbXMgKyAxO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNsaWRlc0RhdGEuZm9yRWFjaCgoc2xpZGUsIGkpID0+IHtcclxuICAgICAgc2xpZGUuaGVpZ2h0U3RhdGUgPSAoaSA+PSBzdGFydCAmJiBpIDwgZW5kKSA/ICdmdWxsJyA6ICdudWxsZWQnO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgT2JzZXJ2YWJsZSwgbWVyZ2UgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgQ2Fyb3VzZWxTZXJ2aWNlIH0gZnJvbSAnLi9jYXJvdXNlbC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgdGFwLCBza2lwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEhhc2hTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gdG8gbWVyZ2UgT2JzZXJ2YWJsZSBmcm9tIENhcm91c2VsU2VydmljZVxyXG4gICAqL1xyXG4gIGhhc2hTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ3VycmVudCB1cmwgZnJhZ21lbnQgKGhhc2gpXHJcbiAgICovXHJcbiAgY3VycmVudEhhc2hGcmFnbWVudDogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhcm91c2VsU2VydmljZTogQ2Fyb3VzZWxTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHtcclxuICAgIHRoaXMuc3B5RGF0YVN0cmVhbXMoKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5oYXNoU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZWZpbmVzIE9ic2VydmFibGVzIHdoaWNoIHNlcnZpY2UgbXVzdCBvYnNlcnZlXHJcbiAgICovXHJcbiAgc3B5RGF0YVN0cmVhbXMoKSB7XHJcbiAgICBjb25zdCBpbml0aWFsaXplZENhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0SW5pdGlhbGl6ZWRTdGF0ZSgpLnBpcGUoXHJcbiAgICAgIHRhcCgoKSA9PiB0aGlzLmxpc3RlblRvUm91dGUoKSApXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IGNoYW5nZWRTZXR0aW5ncyQ6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldENoYW5nZWRTdGF0ZSgpLnBpcGUoXHJcbiAgICAgIHRhcChkYXRhID0+IHtcclxuICAgICAgICBpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuVVJMaGFzaExpc3RlbmVyICYmIGRhdGEucHJvcGVydHkubmFtZSA9PT0gJ3Bvc2l0aW9uJykge1xyXG4gICAgICAgICAgY29uc3QgbmV3Q3VyU2xpZGUgPSB0aGlzLmNhcm91c2VsU2VydmljZS5jdXJyZW50KCk7XHJcbiAgICAgICAgICBjb25zdCBuZXdDdXJGcmFnbWVudCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNsaWRlc0RhdGFbbmV3Q3VyU2xpZGVdLmhhc2hGcmFnbWVudDtcclxuXHJcbiAgICAgICAgICBpZiAoIW5ld0N1ckZyYWdtZW50IHx8IG5ld0N1ckZyYWdtZW50ID09PSB0aGlzLmN1cnJlbnRIYXNoRnJhZ21lbnQpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycuLyddLCB7ZnJhZ21lbnQ6IG5ld0N1ckZyYWdtZW50LCByZWxhdGl2ZVRvOiB0aGlzLnJvdXRlfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBoYXNoRnJhZ21lbnQkOiBPYnNlcnZhYmxlPHN0cmluZyB8IGFueT4gPSBtZXJnZShpbml0aWFsaXplZENhcm91c2VsJCwgY2hhbmdlZFNldHRpbmdzJCk7XHJcbiAgICB0aGlzLmhhc2hTdWJzY3JpcHRpb24gPSBoYXNoRnJhZ21lbnQkLnN1YnNjcmliZShcclxuICAgICAgKCkgPT4ge31cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiByZXdpbmRzIGNhcm91c2VsIHRvIHNsaWRlIHdoaWNoIGhhcyB0aGUgc2FtZSBoYXNoRnJhZ21lbnQgYXMgZnJhZ21lbnQgb2YgY3VycmVudCB1cmxcclxuICAgKiBAcGFyYW0gZnJhZ21lbnQgZnJhZ21lbnQgb2YgdXJsXHJcbiAgICovXHJcbiAgcmV3aW5kKGZyYWdtZW50OiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2xpZGVzRGF0YS5maW5kSW5kZXgoc2xpZGUgPT4gc2xpZGUuaGFzaEZyYWdtZW50ID09PSBmcmFnbWVudCAmJiBzbGlkZS5pc0Nsb25lZCA9PT0gZmFsc2UpO1xyXG5cclxuICAgIGlmIChwb3NpdGlvbiA9PT0gLTEgfHwgcG9zaXRpb24gPT09IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmN1cnJlbnQoKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG5cdFx0dGhpcy5jYXJvdXNlbFNlcnZpY2UudG8odGhpcy5jYXJvdXNlbFNlcnZpY2UucmVsYXRpdmUocG9zaXRpb24pLCBmYWxzZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbml0aWF0ZSBsaXN0ZW5pbmcgdG8gQWN0aXZhdGVkUm91dGUuZnJhZ21lbnRcclxuICAgKi9cclxuICBsaXN0ZW5Ub1JvdXRlKCkge1xyXG4gICAgY29uc3QgY291bnQgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5zdGFydFBvc2l0aW9uID09PSAnVVJMSGFzaCcgPyAwIDogMjtcclxuICAgIHRoaXMucm91dGUuZnJhZ21lbnQucGlwZShcclxuICAgICAgICBza2lwKGNvdW50KVxyXG4gICAgICApXHJcbiAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgZnJhZ21lbnQgPT4ge1xyXG4gICAgICAgICAgdGhpcy5jdXJyZW50SGFzaEZyYWdtZW50ID0gZnJhZ21lbnQ7XHJcbiAgICAgICAgICB0aGlzLnJld2luZChmcmFnbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICApXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIE9uSW5pdCxcclxuICBBZnRlckNvbnRlbnRDaGVja2VkLFxyXG4gIE9uRGVzdHJveSxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRGlyZWN0aXZlLFxyXG4gIFF1ZXJ5TGlzdCxcclxuICBDb250ZW50Q2hpbGRyZW4sXHJcbiAgVGVtcGxhdGVSZWYsXHJcbiAgRWxlbWVudFJlZixcclxuICBBZnRlckNvbnRlbnRJbml0LFxyXG4gIEV2ZW50RW1pdHRlclxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBPYnNlcnZhYmxlLCBtZXJnZSB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgUmVzaXplU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3Jlc2l6ZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgdGFwLCBkZWxheSwgZmlsdGVyLCBzd2l0Y2hNYXAsIGZpcnN0IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBDYXJvdXNlbFNlcnZpY2UsIENhcm91c2VsQ3VycmVudERhdGEgfSBmcm9tICcuLi9zZXJ2aWNlcy9jYXJvdXNlbC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3RhZ2VEYXRhIH0gZnJvbSBcIi4uL21vZGVscy9zdGFnZS1kYXRhLm1vZGVsXCI7XHJcbmltcG9ydCB7IE93bERPTURhdGEgfSBmcm9tIFwiLi4vbW9kZWxzL293bERPTS1kYXRhLm1vZGVsXCI7XHJcbmltcG9ydCB7IFNsaWRlTW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvc2xpZGUubW9kZWwnO1xyXG5pbXBvcnQgeyBPd2xPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWxzL293bC1vcHRpb25zLm1vZGVsJztcclxuaW1wb3J0IHsgTmF2RGF0YSwgRG90c0RhdGEgfSBmcm9tICcuLi9tb2RlbHMvbmF2aWdhdGlvbi1kYXRhLm1vZGVscyc7XHJcbmltcG9ydCB7IE5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmF2aWdhdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQXV0b3BsYXlTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvYXV0b3BsYXkuc2VydmljZSc7XHJcbmltcG9ydCB7IExhenlMb2FkU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2xhenlsb2FkLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBbmltYXRlU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2FuaW1hdGUuc2VydmljZSc7XHJcbmltcG9ydCB7IEF1dG9IZWlnaHRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvYXV0b2hlaWdodC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSGFzaFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9oYXNoLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBPd2xMb2dnZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9sb2dnZXIuc2VydmljZSc7XHJcblxyXG5sZXQgbmV4dElkID0gMDtcclxuXHJcbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ25nLXRlbXBsYXRlW2Nhcm91c2VsU2xpZGVdJyB9KVxyXG5leHBvcnQgY2xhc3MgQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZSB7XHJcbiAgLyoqXHJcbiAgICogVW5pcXVlIHNsaWRlIGlkZW50aWZpZXIuIE11c3QgYmUgdW5pcXVlIGZvciB0aGUgZW50aXJlIGRvY3VtZW50IGZvciBwcm9wZXIgYWNjZXNzaWJpbGl0eSBzdXBwb3J0LlxyXG4gICAqIFdpbGwgYmUgYXV0by1nZW5lcmF0ZWQgaWYgbm90IHByb3ZpZGVkLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGlkID0gYG93bC1zbGlkZS0ke25leHRJZCsrfWA7XHJcblxyXG4gIC8qKlxyXG4gICAqIERlZmluZXMgaG93IG11Y2ggd2lkdGhzIG9mIGNvbW1vbiBzbGlkZSB3aWxsIGN1cnJlbnQgc2xpZGUgaGF2ZVxyXG4gICAqIGUuZy4gaWYgX21lcmdlRGF0YT0yLCB0aGUgc2xpZGUgd2lsbCB0d2ljZSB3aWRlciB0aGVuIHNsaWRlcyB3aXRoIF9tZXJnZURhdGE9MVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2RhdGFNZXJnZSA9IDE7XHJcbiAgQElucHV0KClcclxuICBzZXQgZGF0YU1lcmdlKGRhdGE6IG51bWJlcikge1xyXG4gICAgdGhpcy5fZGF0YU1lcmdlID0gdGhpcy5pc051bWVyaWMoZGF0YSkgPyBkYXRhIDogMTtcclxuICB9O1xyXG4gIGdldCBkYXRhTWVyZ2UoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2RhdGFNZXJnZSB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdpZHRoIG9mIHNsaWRlXHJcbiAgICovXHJcbiAgQElucHV0KCkgd2lkdGggPSAwO1xyXG5cclxuICAvKipcclxuICAgKiBJbm5lciBjb250ZW50IG9mIGRvdCBmb3IgY2VydGFpbiBzbGlkZTsgY2FuIGJlIGh0bWwtbWFya3VwXHJcbiAgICovXHJcbiAgQElucHV0KCkgZG90Q29udGVudCA9ICcnO1xyXG5cclxuICAvKipcclxuICAgKiBIYXNoIChmcmFnbWVudCkgb2YgdXJsIHdoaWNoIGNvcnJlc3BvbmRzIHRvIGNlcnRhaW4gc2xpZGVcclxuICAgKi9cclxuICBASW5wdXQoKSBkYXRhSGFzaCA9ICcnO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdHBsUmVmOiBUZW1wbGF0ZVJlZjxhbnk+KSB7fVxyXG5cclxuICAvKipcclxuXHQgKiBEZXRlcm1pbmVzIGlmIHRoZSBpbnB1dCBpcyBhIE51bWJlciBvciBzb21ldGhpbmcgdGhhdCBjYW4gYmUgY29lcmNlZCB0byBhIE51bWJlclxyXG5cdCAqIEBwYXJhbSAtIFRoZSBpbnB1dCB0byBiZSB0ZXN0ZWRcclxuXHQgKiBAcmV0dXJucyAtIEFuIGluZGljYXRpb24gaWYgdGhlIGlucHV0IGlzIGEgTnVtYmVyIG9yIGNhbiBiZSBjb2VyY2VkIHRvIGEgTnVtYmVyXHJcblx0ICovXHJcbiAgaXNOdW1lcmljKG51bWJlcjogYW55KTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQobnVtYmVyKSk7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogRGF0YSB3aGljaCB3aWxsIGJlIHBhc3NlZCBvdXQgYWZ0ZXIgZW5kaW5nIG9mIHRyYW5zaXRpb24gb2YgY2Fyb3VzZWxcclxuICovXHJcbmV4cG9ydCBjbGFzcyBTbGlkZXNPdXRwdXREYXRhIHtcclxuICBzdGFydFBvc2l0aW9uPzogbnVtYmVyO1xyXG4gIHNsaWRlcz86IFNsaWRlTW9kZWxbXTtcclxufTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnb3dsLWNhcm91c2VsLW8nLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2IGNsYXNzPVwib3dsLWNhcm91c2VsIG93bC10aGVtZVwiICNvd2xDYXJvdXNlbFxyXG4gICAgICBbbmdDbGFzc109XCJ7J293bC1ydGwnOiBvd2xET01EYXRhPy5ydGwsXHJcbiAgICAgICAgICAgICAgICAgICdvd2wtbG9hZGVkJzogb3dsRE9NRGF0YT8uaXNMb2FkZWQsXHJcbiAgICAgICAgICAgICAgICAgICdvd2wtcmVzcG9uc2l2ZSc6IG93bERPTURhdGE/LmlzUmVzcG9uc2l2ZSxcclxuICAgICAgICAgICAgICAgICAgJ293bC1kcmFnJzogb3dsRE9NRGF0YT8uaXNNb3VzZURyYWdhYmxlLFxyXG4gICAgICAgICAgICAgICAgICAnb3dsLWdyYWInOiBvd2xET01EYXRhPy5pc0dyYWJ9XCJcclxuICAgICAgKG1vdXNlb3Zlcik9XCJzdGFydFBhdXNpbmcoKVwiXHJcbiAgICAgIChtb3VzZWxlYXZlKT1cInN0YXJ0UGxheU1MKClcIlxyXG4gICAgICAodG91Y2hzdGFydCk9XCJzdGFydFBhdXNpbmcoKVwiXHJcbiAgICAgICh0b3VjaGVuZCk9XCJzdGFydFBsYXlURSgpXCI+XHJcblxyXG4gICAgICA8ZGl2ICpuZ0lmPVwiY2Fyb3VzZWxMb2FkZWRcIiBjbGFzcz1cIm93bC1zdGFnZS1vdXRlclwiPlxyXG4gICAgICAgIDxvd2wtc3RhZ2UgW293bERyYWdnYWJsZV09XCJ7J2lzTW91c2VEcmFnYWJsZSc6IG93bERPTURhdGE/LmlzTW91c2VEcmFnYWJsZSwgJ2lzVG91Y2hEcmFnYWJsZSc6IG93bERPTURhdGE/LmlzVG91Y2hEcmFnYWJsZX1cIlxyXG4gICAgICAgICAgICAgICAgICAgIFtzdGFnZURhdGFdPVwic3RhZ2VEYXRhXCJcclxuICAgICAgICAgICAgICAgICAgICBbc2xpZGVzRGF0YV09XCJzbGlkZXNEYXRhXCI+PC9vd2wtc3RhZ2U+XHJcbiAgICAgIDwvZGl2PiA8IS0tIC8ub3dsLXN0YWdlLW91dGVyIC0tPlxyXG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwic2xpZGVzLnRvQXJyYXkoKS5sZW5ndGhcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwib3dsLW5hdlwiIFtuZ0NsYXNzXT1cInsnZGlzYWJsZWQnOiBuYXZEYXRhPy5kaXNhYmxlZH1cIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJvd2wtcHJldlwiIFtuZ0NsYXNzXT1cInsnZGlzYWJsZWQnOiBuYXZEYXRhPy5wcmV2Py5kaXNhYmxlZH1cIiAoY2xpY2spPVwicHJldigpXCIgW2lubmVySFRNTF09XCJuYXZEYXRhPy5wcmV2Py5odG1sVGV4dFwiPjwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm93bC1uZXh0XCIgW25nQ2xhc3NdPVwieydkaXNhYmxlZCc6IG5hdkRhdGE/Lm5leHQ/LmRpc2FibGVkfVwiIChjbGljayk9XCJuZXh0KClcIiBbaW5uZXJIVE1MXT1cIm5hdkRhdGE/Lm5leHQ/Lmh0bWxUZXh0XCI+PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+IDwhLS0gLy5vd2wtbmF2IC0tPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJvd2wtZG90c1wiIFtuZ0NsYXNzXT1cInsnZGlzYWJsZWQnOiBkb3RzRGF0YT8uZGlzYWJsZWR9XCI+XHJcbiAgICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBkb3Qgb2YgZG90c0RhdGE/LmRvdHNcIiBjbGFzcz1cIm93bC1kb3RcIiBbbmdDbGFzc109XCJ7J2FjdGl2ZSc6IGRvdC5hY3RpdmUsICdvd2wtZG90LXRleHQnOiBkb3Quc2hvd0lubmVyQ29udGVudH1cIiAoY2xpY2spPVwibW92ZUJ5RG90KGRvdC5pZClcIj5cclxuICAgICAgICAgICAgPHNwYW4gW2lubmVySFRNTF09XCJkb3QuaW5uZXJDb250ZW50XCI+PC9zcGFuPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+IDwhLS0gLy5vd2wtZG90cyAtLT5cclxuICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICA8L2Rpdj4gPCEtLSAvLm93bC1jYXJvdXNlbCBvd2wtbG9hZGVkIC0tPlxyXG4gIGAsXHJcbiAgc3R5bGVzOiBbYC5vd2wtdGhlbWUgeyBkaXNwbGF5OiBibG9jazsgfWBdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgTmF2aWdhdGlvblNlcnZpY2UsXHJcbiAgICBBdXRvcGxheVNlcnZpY2UsXHJcbiAgICBDYXJvdXNlbFNlcnZpY2UsXHJcbiAgICBMYXp5TG9hZFNlcnZpY2UsXHJcbiAgICBBbmltYXRlU2VydmljZSxcclxuICAgIEF1dG9IZWlnaHRTZXJ2aWNlLFxyXG4gICAgSGFzaFNlcnZpY2VcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDYXJvdXNlbENvbXBvbmVudFxyXG4gIGltcGxlbWVudHMgT25Jbml0LCBBZnRlckNvbnRlbnRDaGVja2VkLCBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xyXG4gIEBDb250ZW50Q2hpbGRyZW4oQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZSlcclxuICBzbGlkZXM6IFF1ZXJ5TGlzdDxDYXJvdXNlbFNsaWRlRGlyZWN0aXZlPjtcclxuXHJcbiAgQE91dHB1dCgpIHRyYW5zbGF0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFNsaWRlc091dHB1dERhdGE+KCk7XHJcbiAgQE91dHB1dCgpIGRyYWdnaW5nID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG5cclxuICAvKipcclxuICAgKiBXaWR0aCBvZiBjYXJvdXNlbCB3aW5kb3cgKHRhZyB3aXRoIGNsYXNzIC5vd2wtY2Fyb3VzZWwpLCBpbiB3aWNoIHdlIGNhbiBzZWUgbW92aW5nIHNsaWRlcnNcclxuICAgKi9cclxuICBjYXJvdXNlbFdpbmRvd1dpZHRoOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlwdGlvbiB0byAncmVzaXplJyBldmVudFxyXG4gICAqL1xyXG4gIHJlc2l6ZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gbWVyZ2UgT2JzZXJ2YWJsZSwgd2hpY2ggbWVyZ2VzIGFsbCBPYnNlcnZhYmxlcyBpbiB0aGUgY29tcG9uZW50IGV4Y2VwdCAncmVzaXplJyBPYnNlcnZhYmxlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfYWxsT2JzZXJ2U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIEN1cnJlbnQgc2V0dGluZ3MgZm9yIHRoZSBjYXJvdXNlbC5cclxuICAgKi9cclxuICBvd2xET01EYXRhOiBPd2xET01EYXRhO1xyXG5cclxuICAvKipcclxuICAgKiBEYXRhIG9mIG93bC1zdGFnZVxyXG4gICAqL1xyXG5cdHN0YWdlRGF0YTogU3RhZ2VEYXRhO1xyXG5cclxuXHQvKipcclxuXHQgKiAgRGF0YSBvZiBldmVyeSBzbGlkZVxyXG5cdCAqL1xyXG4gIHNsaWRlc0RhdGE6IFNsaWRlTW9kZWxbXTtcclxuXHJcbiAgLyoqXHJcblx0ICogRGF0YSBvZiBuYXZpZ2F0aW9uIGJsb2NrXHJcblx0ICovXHJcblx0bmF2RGF0YTogTmF2RGF0YTtcclxuXHJcblx0LyoqXHJcblx0ICogRGF0YSBvZiBkb3RzIGJsb2NrXHJcblx0ICovXHJcbiAgZG90c0RhdGE6IERvdHNEYXRhO1xyXG5cclxuICAvKipcclxuICAgKiBEYXRhLCB3aWNoIGFyZSBwYXNzZWQgb3V0IG9mIGNhcm91c2VsIGFmdGVyIGVuZGluZyBvZiB0cmFuc2lvbmluZyBvZiBjYXJvdXNlbFxyXG4gICAqL1xyXG4gIHNsaWRlc091dHB1dERhdGE6IFNsaWRlc091dHB1dERhdGE7XHJcblxyXG4gIC8qKlxyXG4gICAqIFNob3dzIHdoZXRoZXIgY2Fyb3VzZWwgaXMgbG9hZGVkIG9mIG5vdC5cclxuICAgKi9cclxuICBjYXJvdXNlbExvYWRlZCA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBVc2VyJ3Mgb3B0aW9uc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG9wdGlvbnM6IE93bE9wdGlvbnM7XHJcblxyXG4gIC8qKlxyXG4gICAqIE9ic2VydmFibGUgZm9yIGdldHRpbmcgY3VycmVudCBWaWV3IFNldHRpbmdzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfdmlld0N1clNldHRpbmdzJDogT2JzZXJ2YWJsZTxDYXJvdXNlbEN1cnJlbnREYXRhPjtcclxuXHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2YWJsZSBmb3IgY2F0Y2hpbmcgdGhlIGVuZCBvZiB0cmFuc2l0aW9uIG9mIGNhcm91c2VsXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfdHJhbnNsYXRlZENhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+O1xyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZhYmxlIGZvciBjYXRjaGluZyB0aGUgc3RhcnQgb2YgZHJhZ2dpbmcgb2YgdGhlIGNhcm91c2VsXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZHJhZ2dpbmdDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPjtcclxuXHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2YWJsZSBmb3IgbWVyZ2luZyBhbGwgT2JzZXJ2YWJsZXMgYW5kIGNyZWF0aW5nIG9uZSBzdWJzY3JpcHRpb25cclxuICAgKi9cclxuICBwcml2YXRlIF9jYXJvdXNlbE1lcmdlJDogT2JzZXJ2YWJsZTxDYXJvdXNlbEN1cnJlbnREYXRhIHwgc3RyaW5nPjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxyXG4gICAgcHJpdmF0ZSByZXNpemVTZXJ2aWNlOiBSZXNpemVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjYXJvdXNlbFNlcnZpY2U6IENhcm91c2VsU2VydmljZSxcclxuICAgIHByaXZhdGUgbmF2aWdhdGlvblNlcnZpY2U6IE5hdmlnYXRpb25TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBhdXRvcGxheVNlcnZpY2U6IEF1dG9wbGF5U2VydmljZSxcclxuICAgIHByaXZhdGUgbGF6eUxvYWRTZXJ2aWNlOiBMYXp5TG9hZFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGFuaW1hdGVTZXJ2aWNlOiBBbmltYXRlU2VydmljZSxcclxuICAgIHByaXZhdGUgYXV0b0hlaWdodFNlcnZpY2U6IEF1dG9IZWlnaHRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBoYXNoU2VydmljZTogSGFzaFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGxvZ2dlcjogT3dsTG9nZ2VyXHJcbiAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuc3B5RGF0YVN0cmVhbXMoKTtcclxuXHJcbiAgICB0aGlzLmNhcm91c2VsV2luZG93V2lkdGggPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgJy5vd2wtY2Fyb3VzZWwnXHJcbiAgICApLmNsaWVudFdpZHRoO1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xyXG4gIH1cclxuICAvLyBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSBFTkRcclxuXHJcbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG4gICAgaWYgKHRoaXMuc2xpZGVzLnRvQXJyYXkoKS5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dXAodGhpcy5jYXJvdXNlbFdpbmRvd1dpZHRoLCB0aGlzLnNsaWRlcy50b0FycmF5KCksIHRoaXMub3B0aW9ucyk7XHJcbiAgICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmluaXRpYWxpemUodGhpcy5zbGlkZXMudG9BcnJheSgpKTtcclxuXHJcbiAgICAgIHRoaXMuX3dpblJlc2l6ZVdhdGNoZXIoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubG9nZ2VyLmxvZyhgVGhlcmUncyBubyBzbGlkZXMgdG8gc2hvdy4gU28gY2Fyb3VzZWwgZGlkbid0IGdldCByZW5kZXJlZGApO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgaWYgKHRoaXMucmVzaXplU3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgIHRoaXMucmVzaXplU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fYWxsT2JzZXJ2U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBKb2lucyB0aGUgb2JzZXJ2YWJsZSBsb2dpbiBpbiBvbmUgcGxhY2U6IHNldHMgdmFsdWVzIHRvIHNvbWUgb2JzZXJ2YWJsZXMsIG1lcmdlcyB0aGlzIG9ic2VydmFibGVzIGFuZFxyXG4gICAqIHN1YmNyaWJlcyB0byBtZXJnZSBmdW5jXHJcbiAgICovXHJcbiAgc3B5RGF0YVN0cmVhbXMoKSB7XHJcbiAgICB0aGlzLl92aWV3Q3VyU2V0dGluZ3MkID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0Vmlld0N1clNldHRpbmdzKCkucGlwZShcclxuICAgICAgdGFwKGRhdGEgPT4ge1xyXG4gICAgICAgIHRoaXMub3dsRE9NRGF0YSA9IGRhdGEub3dsRE9NRGF0YTtcclxuICAgICAgICB0aGlzLnN0YWdlRGF0YSA9IGRhdGEuc3RhZ2VEYXRhO1xyXG4gICAgICAgIHRoaXMuc2xpZGVzRGF0YSA9IGRhdGEuc2xpZGVzRGF0YTtcclxuICAgICAgICBpZiAoIXRoaXMuY2Fyb3VzZWxMb2FkZWQpIHtcclxuICAgICAgICAgIHRoaXMuY2Fyb3VzZWxMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5hdkRhdGEgPSBkYXRhLm5hdkRhdGE7XHJcbiAgICAgICAgdGhpcy5kb3RzRGF0YSA9IGRhdGEuZG90c0RhdGE7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuX3RyYW5zbGF0ZWRDYXJvdXNlbCQgPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRUcmFuc2xhdGVkU3RhdGUoKS5waXBlKFxyXG4gICAgICB0YXAoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZ2F0aGVyVHJhbnNsYXRlZERhdGEoKTtcclxuICAgICAgICB0aGlzLnRyYW5zbGF0ZWQuZW1pdCh0aGlzLnNsaWRlc091dHB1dERhdGEpO1xyXG4gICAgICAgIHRoaXMuc2xpZGVzT3V0cHV0RGF0YSA9IHt9O1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLl9kcmFnZ2luZ0Nhcm91c2VsJCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldERyYWdTdGF0ZSgpLnBpcGUoXHJcbiAgICAgIHRhcCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5kcmFnZ2luZy5lbWl0KHRydWUpO1xyXG4gICAgICB9KSxcclxuICAgICAgc3dpdGNoTWFwKFxyXG4gICAgICAgICgpID0+IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldFRyYW5zbGF0ZWRTdGF0ZSgpLnBpcGUoXHJcbiAgICAgICAgICBmaXJzdCgpLFxyXG4gICAgICAgICAgdGFwKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5kcmFnZ2luZy5lbWl0KGZhbHNlKTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgKVxyXG4gICAgICApXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuX2Nhcm91c2VsTWVyZ2UkID0gbWVyZ2UodGhpcy5fdmlld0N1clNldHRpbmdzJCwgdGhpcy5fdHJhbnNsYXRlZENhcm91c2VsJCwgdGhpcy5fZHJhZ2dpbmdDYXJvdXNlbCQpO1xyXG4gICAgdGhpcy5fYWxsT2JzZXJ2U3Vic2NyaXB0aW9uID0gdGhpcy5fY2Fyb3VzZWxNZXJnZSQuc3Vic2NyaWJlKCgpID0+IHt9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXQgc3Vic2NyaXB0aW9uIHRvIHJlc2l6ZSBldmVudCBhbmQgYXR0YWNoZXMgaGFuZGxlciBmb3IgdGhpcyBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3dpblJlc2l6ZVdhdGNoZXIoKSB7XHJcbiAgICBpZiAoT2JqZWN0LmtleXModGhpcy5jYXJvdXNlbFNlcnZpY2UuX29wdGlvbnMucmVzcG9uc2l2ZSkubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMucmVzaXplU3Vic2NyaXB0aW9uID0gdGhpcy5yZXNpemVTZXJ2aWNlLm9uUmVzaXplJFxyXG4gICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgZmlsdGVyKCgpID0+IHRoaXMuY2Fyb3VzZWxXaW5kb3dXaWR0aCAhPT0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vd2wtY2Fyb3VzZWwnKS5jbGllbnRXaWR0aCksXHJcbiAgICAgICAgICBkZWxheSh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5yZXNwb25zaXZlUmVmcmVzaFJhdGUpXHJcbiAgICAgICAgKVxyXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uub25SZXNpemUodGhpcy5lbC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vd2wtY2Fyb3VzZWwnKS5jbGllbnRXaWR0aCk7XHJcbiAgICAgICAgICB0aGlzLmNhcm91c2VsV2luZG93V2lkdGggPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLm93bC1jYXJvdXNlbCcpLmNsaWVudFdpZHRoO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlciBmb3IgdHJhbnNpdGlvZW5kIGV2ZW50XHJcbiAgICovXHJcbiAgb25UcmFuc2l0aW9uRW5kKCkge1xyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uub25UcmFuc2l0aW9uRW5kKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGVyIGZvciBjbGljayBldmVudCwgYXR0YWNoZWQgdG8gbmV4dCBidXR0b25cclxuICAgKi9cclxuICBuZXh0KCkge1xyXG4gICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5uZXh0KHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLm5hdlNwZWVkKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhbmRsZXIgZm9yIGNsaWNrIGV2ZW50LCBhdHRhY2hlZCB0byBwcmV2IGJ1dHRvblxyXG4gICAqL1xyXG4gIHByZXYoKSB7XHJcbiAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLnByZXYodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MubmF2U3BlZWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlciBmb3IgY2xpY2sgZXZlbnQsIGF0dGFjaGVkIHRvIGRvdHNcclxuICAgKi9cclxuICBtb3ZlQnlEb3QoZG90SWQ6IHN0cmluZykge1xyXG4gICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5tb3ZlQnlEb3QoZG90SWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogcmV3aW5kcyBjYXJvdXNlbCB0byBzbGlkZSB3aXRoIG5lZWRlZCBpZFxyXG4gICAqIEBwYXJhbSBpZCBmcmFnbWVudCBvZiB1cmxcclxuICAgKi9cclxuICB0byhpZDogc3RyaW5nKSB7XHJcbiAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLnRvU2xpZGVCeUlkKGlkKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdhdGhlcnMgYW5kIHByZXBhcmVzIGRhdGEgaW50ZW5kZWQgZm9yIHBhc3NpbmcgdG8gdGhlIHVzZXIgYnkgbWVhbnMgb2YgZmlyaW5nIGV2ZW50IHRyYW5zbGF0ZWRDYXJvdXNlbFxyXG4gICAqL1xyXG4gIGdhdGhlclRyYW5zbGF0ZWREYXRhKCkge1xyXG4gICAgbGV0IHN0YXJ0UG9zaXRpb246IG51bWJlcjtcclxuICAgIGNvbnN0IGNsb25lZElkUHJlZml4ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuY2xvbmVkSWRQcmVmaXg7XHJcbiAgICBjb25zdCBhY3RpdmVTbGlkZXM6IFNsaWRlTW9kZWxbXSA9IHRoaXMuc2xpZGVzRGF0YVxyXG4gICAgICAuZmlsdGVyKHNsaWRlID0+IHNsaWRlLmlzQWN0aXZlID09PSB0cnVlKVxyXG4gICAgICAubWFwKHNsaWRlID0+IHtcclxuICAgICAgICBjb25zdCBpZCA9IHNsaWRlLmlkLmluZGV4T2YoY2xvbmVkSWRQcmVmaXgpID49IDAgPyBzbGlkZS5pZC5zbGljZShjbG9uZWRJZFByZWZpeC5sZW5ndGgpIDogc2xpZGUuaWQ7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIGlkOiBpZCxcclxuICAgICAgICAgIHdpZHRoOiBzbGlkZS53aWR0aCxcclxuICAgICAgICAgIG1hcmdpbkw6IHNsaWRlLm1hcmdpbkwsXHJcbiAgICAgICAgICBtYXJnaW5SOiBzbGlkZS5tYXJnaW5SLFxyXG4gICAgICAgICAgY2VudGVyOiBzbGlkZS5pc0NlbnRlcmVkXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIHN0YXJ0UG9zaXRpb24gPSB0aGlzLmNhcm91c2VsU2VydmljZS5yZWxhdGl2ZSh0aGlzLmNhcm91c2VsU2VydmljZS5jdXJyZW50KCkpO1xyXG4gICAgdGhpcy5zbGlkZXNPdXRwdXREYXRhID0ge1xyXG4gICAgICBzdGFydFBvc2l0aW9uOiBzdGFydFBvc2l0aW9uLFxyXG4gICAgICBzbGlkZXM6IGFjdGl2ZVNsaWRlc1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnRzIHBhdXNpbmdcclxuICAgKi9cclxuICBzdGFydFBhdXNpbmcoKSB7XHJcbiAgICB0aGlzLmF1dG9wbGF5U2VydmljZS5zdGFydFBhdXNpbmcoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0YXJ0cyBwbGF5aW5nIGFmdGVyIG1vdXNlIGxlYXZlcyBjYXJvdXNlbFxyXG4gICAqL1xyXG4gIHN0YXJ0UGxheU1MKCkge1xyXG4gICAgdGhpcy5hdXRvcGxheVNlcnZpY2Uuc3RhcnRQbGF5aW5nTW91c2VMZWF2ZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnRzIHBsYXlpbmcgYWZ0ZXIgdG91Y2ggZW5kc1xyXG4gICAqL1xyXG4gIHN0YXJ0UGxheVRFKCkge1xyXG4gICAgdGhpcy5hdXRvcGxheVNlcnZpY2Uuc3RhcnRQbGF5aW5nVG91Y2hFbmQoKTtcclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgTmdab25lLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIFJlbmRlcmVyMiwgT25Jbml0LCBPbkRlc3Ryb3ksIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENhcm91c2VsU2VydmljZSwgQ29vcmRzIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvY2Fyb3VzZWwuc2VydmljZSc7XHJcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBmaXJzdCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgU3RhZ2VEYXRhIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3N0YWdlLWRhdGEubW9kZWwnO1xyXG5pbXBvcnQgeyBTbGlkZU1vZGVsIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3NsaWRlLm1vZGVsJztcclxuaW1wb3J0IHsgQW5pbWF0ZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hbmltYXRlLnNlcnZpY2UnO1xyXG5pbXBvcnQge1xyXG4gIHRyaWdnZXIsXHJcbiAgc3RhdGUsXHJcbiAgc3R5bGUsXHJcbiAgYW5pbWF0ZSxcclxuICB0cmFuc2l0aW9uXHJcbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnb3dsLXN0YWdlJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cIm93bC1zdGFnZVwiIFtuZ1N0eWxlXT1cInsnd2lkdGgnOiBzdGFnZURhdGEud2lkdGggKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3RyYW5zZm9ybSc6IHN0YWdlRGF0YS50cmFuc2Zvcm0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndHJhbnNpdGlvbic6IHN0YWdlRGF0YS50cmFuc2l0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3BhZGRpbmctbGVmdCc6IHN0YWdlRGF0YS5wYWRkaW5nTCArICdweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncGFkZGluZy1yaWdodCc6IHN0YWdlRGF0YS5wYWRkaW5nUiArICdweCcgfVwiXHJcbiAgICAgICAgICAodHJhbnNpdGlvbmVuZCk9XCJvblRyYW5zaXRpb25FbmQoKVwiPlxyXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IHNsaWRlIG9mIHNsaWRlc0RhdGE7IGxldCBpID0gaW5kZXhcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJvd2wtaXRlbVwiIFtuZ0NsYXNzXT1cInNsaWRlLmNsYXNzZXNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cInsnd2lkdGgnOiBzbGlkZS53aWR0aCArICdweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ21hcmdpbi1sZWZ0Jzogc2xpZGUubWFyZ2luTCArICdweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ21hcmdpbi1yaWdodCc6IHNsaWRlLm1hcmdpblIgKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdsZWZ0Jzogc2xpZGUubGVmdH1cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChhbmltYXRpb25lbmQpPVwiY2xlYXIoc2xpZGUuaWQpXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbQGF1dG9IZWlnaHRdPVwic2xpZGUuaGVpZ2h0U3RhdGVcIj5cclxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ0lmPVwic2xpZGUubG9hZFwiIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInNsaWRlLnRwbFJlZlwiPjwvbmctdGVtcGxhdGU+XHJcbiAgICAgICAgICA8L2Rpdj48IS0tIC8ub3dsLWl0ZW0gLS0+XHJcbiAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgIDwvZGl2PjwhLS0gLy5vd2wtc3RhZ2UgLS0+XHJcbiAgICA8L2Rpdj5cclxuICBgLFxyXG4gIGFuaW1hdGlvbnM6IFtcclxuICAgIHRyaWdnZXIoJ2F1dG9IZWlnaHQnLCBbXHJcbiAgICAgIHN0YXRlKCdudWxsZWQnLCBzdHlsZSh7aGVpZ2h0OiAwfSkpLFxyXG4gICAgICBzdGF0ZSgnZnVsbCcsIHN0eWxlKHtoZWlnaHQ6ICcqJ30pKSxcclxuICAgICAgdHJhbnNpdGlvbignZnVsbCA9PiBudWxsZWQnLCBbXHJcbiAgICAgICAgLy8gc3R5bGUoe2hlaWdodDogJyonfSksXHJcbiAgICAgICAgYW5pbWF0ZSgnNzAwbXMgMzUwbXMnKVxyXG4gICAgICBdKSxcclxuICAgICAgdHJhbnNpdGlvbignbnVsbGVkID0+IGZ1bGwnLCBbXHJcbiAgICAgICAgLy8gc3R5bGUoe2hlaWdodDogMH0pLFxyXG4gICAgICAgIGFuaW1hdGUoMzUwKVxyXG4gICAgICBdKSxcclxuICAgIF0pXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU3RhZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgLyoqXHJcbiAgICogT2JqZWN0IHdpdGggc2V0dGluZ3Mgd2hpY2ggbWFrZSBjYXJvdXNlbCBkcmFnZ2FibGUgYnkgdG91Y2ggb3IgbW91c2VcclxuICAgKi9cclxuICBASW5wdXQoKSBvd2xEcmFnZ2FibGU6IHtcclxuICAgIGlzTW91c2VEcmFnYWJsZTogYm9vbGVhbixcclxuICAgIGlzVG91Y2hEcmFnYWJsZTogYm9vbGVhblxyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIERhdGEgb2Ygb3dsLXN0YWdlXHJcbiAgICovXHJcbiAgQElucHV0KCkgc3RhZ2VEYXRhOiBTdGFnZURhdGE7XHJcblxyXG5cdC8qKlxyXG5cdCAqICBEYXRhIG9mIGV2ZXJ5IHNsaWRlXHJcblx0ICovXHJcbiAgQElucHV0KCkgc2xpZGVzRGF0YTogU2xpZGVNb2RlbFtdO1xyXG5cclxuICAvKipcclxuICAgKiBGdW5jdGlvbiB3aWNoIHdpbGwgYmUgcmV0dXJuZWQgYWZ0ZXIgYXR0YWNoaW5nIGxpc3RlbmVyIHRvICdtb3VzZW1vdmUnIGV2ZW50XHJcbiAgICovXHJcbiAgbGlzdGVuZXJNb3VzZU1vdmU6ICgpID0+IHZvaWQ7XHJcbiAgLyoqXHJcbiAgICogRnVuY3Rpb24gd2ljaCB3aWxsIGJlIHJldHVybmVkIGFmdGVyIGF0dGFjaGluZyBsaXN0ZW5lciB0byAndG91Y2htb3ZlJyBldmVudFxyXG4gICAqL1xyXG4gIGxpc3RlbmVyVG91Y2hNb3ZlOiAoKSA9PiB2b2lkO1xyXG4gIC8qKlxyXG4gICAqIEZ1bmN0aW9uIHdpY2ggd2lsbCBiZSByZXR1cm5lZCBhZnRlciBhdHRhY2hpbmcgbGlzdGVuZXIgdG8gJ21vdXNlbW92ZScgZXZlbnRcclxuICAgKi9cclxuICBsaXN0ZW5lck9uZU1vdXNlTW92ZTogKCkgPT4gdm9pZDtcclxuICAvKipcclxuICAgKiBGdW5jdGlvbiB3aWNoIHdpbGwgYmUgcmV0dXJuZWQgYWZ0ZXIgYXR0YWNoaW5nIGxpc3RlbmVyIHRvICd0b3VjaG1vdmUnIGV2ZW50XHJcbiAgICovXHJcbiAgbGlzdGVuZXJPbmVUb3VjaE1vdmU6ICgpID0+IHZvaWQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIEZ1bmN0aW9uIHdpY2ggd2lsbCBiZSByZXR1cm5lZCBhZnRlciBhdHRhY2hpbmcgbGlzdGVuZXIgdG8gJ21vdXNldXAnIGV2ZW50XHJcbiAgICovXHJcbiAgbGlzdGVuZXJNb3VzZVVwOiAoKSA9PiB2b2lkO1xyXG4gIC8qKlxyXG4gICAqIEZ1bmN0aW9uIHdpY2ggd2lsbCBiZSByZXR1cm5lZCBhZnRlciBhdHRhY2hpbmcgbGlzdGVuZXIgdG8gJ3RvdWNoZW5kJyBldmVudFxyXG4gICAqL1xyXG4gIGxpc3RlbmVyVG91Y2hFbmQ6ICgpID0+IHZvaWQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIEZ1bmN0aW9uIHdpY2ggd2lsbCBiZSByZXR1cm5lZCBhZnRlciBhdHRhY2hpbmcgbGlzdGVuZXIgdG8gJ2NsaWNrJyBldmVudFxyXG4gICAqL1xyXG4gIGxpc3RlbmVyT25lQ2xpY2s6ICgpID0+IHZvaWQ7XHJcblxyXG4gIGxpc3RlbmVyQVRhZzogKCkgPT4gdm9pZDtcclxuXHJcbiAgLyoqXHJcbiAgICogT2JqZWN0IHdpdGggZGF0YSBuZWVkZWQgZm9yIGRyYWdnaW5nXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZHJhZzogYW55ID0ge1xyXG4gICAgdGltZTogbnVsbCxcclxuICAgIHRhcmdldDogbnVsbCxcclxuICAgIHBvaW50ZXI6IG51bGwsXHJcbiAgICBzdGFnZToge1xyXG4gICAgICBzdGFydDogbnVsbCxcclxuICAgICAgY3VycmVudDogbnVsbFxyXG4gICAgfSxcclxuICAgIGRpcmVjdGlvbjogbnVsbCxcclxuICAgIGFjdGl2ZTogZmFsc2UsXHJcbiAgICBtb3Zpbmc6IGZhbHNlXHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uIHdoZW4gdGhlIGNhcm91c2VsJ3MgcmVidWlsZGluZyBjYXVzZWQgYnkgcmVzaXplIGV2ZW50IHN0YXJ0c1xyXG4gICAqL1xyXG4gIHByaXZhdGUgX29uZURyYWdNb3ZlJCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2N0aXB0aW9uIHRvIF9vbmVEcmFnTW92ZSQgU3ViamVjdFxyXG4gICAqL1xyXG4gIHByaXZhdGUgX29uZU1vdmVTdWJzcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHpvbmU6IE5nWm9uZSxcclxuICAgICAgICAgICAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICAgICAgICAgICAgICBwcml2YXRlIGNhcm91c2VsU2VydmljZTogQ2Fyb3VzZWxTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgYW5pbWF0ZVNlcnZpY2U6IEFuaW1hdGVTZXJ2aWNlKSB7IH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignbW91c2Vkb3duJywgWyckZXZlbnQnXSkgb25Nb3VzZURvd24oZXZlbnQpIHtcclxuICAgIGlmICh0aGlzLm93bERyYWdnYWJsZS5pc01vdXNlRHJhZ2FibGUpIHtcclxuICAgICAgdGhpcy5fb25EcmFnU3RhcnQoZXZlbnQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcigndG91Y2hzdGFydCcsIFsnJGV2ZW50J10pIG9uVG91Y2hTdGFydChldmVudCkge1xyXG4gICAgaWYgKHRoaXMub3dsRHJhZ2dhYmxlLmlzVG91Y2hEcmFnYWJsZSkge1xyXG4gICAgICB0aGlzLl9vbkRyYWdTdGFydChldmVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIFsnJGV2ZW50J10pIG9uVG91Y2hDYW5jZWwoZXZlbnQpIHtcclxuICAgIHRoaXMuX29uRHJhZ0VuZChldmVudCk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdkcmFnc3RhcnQnKSBvbkRyYWdTdGFydCgpIHtcclxuICAgIGlmICh0aGlzLm93bERyYWdnYWJsZS5pc01vdXNlRHJhZ2FibGUpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignc2VsZWN0c3RhcnQnKSBvblNlbGVjdFN0YXJ0KCkge1xyXG4gICAgaWYgKHRoaXMub3dsRHJhZ2dhYmxlLmlzTW91c2VEcmFnYWJsZSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuX29uZU1vdmVTdWJzcmlwdGlvbiA9IHRoaXMuX29uZURyYWdNb3ZlJFxyXG4gICAgICAucGlwZShmaXJzdCgpKVxyXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICB0aGlzLl9zZW5kQ2hhbmdlcygpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5fb25lTW92ZVN1YnNyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQYXNzZXMgdGhpcyB0byBfb25lTW91c2VUb3VjaE1vdmUoKTtcclxuICAgKi9cclxuICBiaW5kT25lTW91c2VUb3VjaE1vdmUgPSAoZXYpID0+IHtcclxuICAgIHRoaXMuX29uZU1vdXNlVG91Y2hNb3ZlKGV2KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFBhc3NlcyB0aGlzIHRvIF9vbkRyYWdNb3ZlKCk7XHJcbiAgICovXHJcbiAgYmluZE9uRHJhZ01vdmUgPSAoZXYpID0+IHtcclxuICAgIHRoaXMuX29uRHJhZ01vdmUoZXYpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUGFzc2VzIHRoaXMgdG8gX29uRHJhZ01vdmUoKTtcclxuICAgKi9cclxuICBiaW5kT25EcmFnRW5kID0gKGV2KSA9PiB7XHJcbiAgICAvLyB0aGlzLnpvbmUucnVuKCgpID0+IHtcclxuICAgICAgdGhpcy5fb25EcmFnRW5kKGV2KTtcclxuICAgIC8vIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcblx0ICogSGFuZGxlcyBgdG91Y2hzdGFydGAgYW5kIGBtb3VzZWRvd25gIGV2ZW50cy5cclxuXHQgKiBAdG9kbyBIb3Jpem9udGFsIHN3aXBlIHRocmVzaG9sZCBhcyBvcHRpb25cclxuXHQgKiBAdG9kbyAjMjYxXHJcblx0ICogQHBhcmFtIGV2ZW50IC0gVGhlIGV2ZW50IGFyZ3VtZW50cy5cclxuXHQgKi9cclxuXHRwcml2YXRlIF9vbkRyYWdTdGFydChldmVudCk6IGFueSB7XHJcblx0XHRsZXQgc3RhZ2U6IENvb3JkcyA9IG51bGw7XHJcblxyXG5cdFx0aWYgKGV2ZW50LndoaWNoID09PSAzKSB7XHJcblx0XHRcdHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBzdGFnZSA9IHRoaXMuX3ByZXBhcmVEcmFnZ2luZyhldmVudCk7XHJcblxyXG5cdFx0dGhpcy5fZHJhZy50aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcblx0XHR0aGlzLl9kcmFnLnRhcmdldCA9IGV2ZW50LnRhcmdldDtcclxuXHRcdHRoaXMuX2RyYWcuc3RhZ2Uuc3RhcnQgPSBzdGFnZTtcclxuXHRcdHRoaXMuX2RyYWcuc3RhZ2UuY3VycmVudCA9IHN0YWdlO1xyXG4gICAgdGhpcy5fZHJhZy5wb2ludGVyID0gdGhpcy5fcG9pbnRlcihldmVudCk7XHJcbiAgICB0aGlzLl9kcmFnLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5saXN0ZW5lck1vdXNlVXAgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbihkb2N1bWVudCwgJ21vdXNldXAnLCB0aGlzLmJpbmRPbkRyYWdFbmQpO1xyXG4gICAgdGhpcy5saXN0ZW5lclRvdWNoRW5kID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oZG9jdW1lbnQsICd0b3VjaGVuZCcsIHRoaXMuYmluZE9uRHJhZ0VuZCk7XHJcblxyXG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgdGhpcy5saXN0ZW5lck9uZU1vdXNlTW92ZSA9IHRoaXMucmVuZGVyZXIubGlzdGVuKGRvY3VtZW50LCAnbW91c2Vtb3ZlJywgdGhpcy5iaW5kT25lTW91c2VUb3VjaE1vdmUpO1xyXG4gICAgICB0aGlzLmxpc3RlbmVyT25lVG91Y2hNb3ZlID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oZG9jdW1lbnQsICd0b3VjaG1vdmUnLCB0aGlzLmJpbmRPbmVNb3VzZVRvdWNoTW92ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBdHRhY2hlcyBsaXN0ZW5lcnMgdG8gYHRvdWNobW92ZWAgYW5kIGBtb3VzZW1vdmVgIGV2ZW50czsgaW5pdGlhdGVzIHVwZGF0aW5nIGNhcm91c2VsIGFmdGVyIHN0YXJ0aW5nIGRyYWdnaW5nXHJcbiAgICogQHBhcmFtIGV2ZW50IGV2ZW50IG9iamVjaCBvZiBtb3VzZSBvciB0b3VjaCBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgX29uZU1vdXNlVG91Y2hNb3ZlKGV2ZW50KSB7XHJcbiAgICBpZiAoIXRoaXMuX2RyYWcuYWN0aXZlKSByZXR1cm4gZmFsc2U7XHJcbiAgICBjb25zdCBkZWx0YSA9IHRoaXMuX2RpZmZlcmVuY2UodGhpcy5fZHJhZy5wb2ludGVyLCB0aGlzLl9wb2ludGVyKGV2ZW50KSk7XHJcbiAgICBpZiAodGhpcy5saXN0ZW5lckFUYWcpIHtcclxuICAgICAgdGhpcy5saXN0ZW5lckFUYWcoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmxpc3RlbmVyT25lTW91c2VNb3ZlKCk7XHJcbiAgICB0aGlzLmxpc3RlbmVyT25lVG91Y2hNb3ZlKCk7XHJcblxyXG4gICAgaWYgKE1hdGguYWJzKGRlbHRhLngpIDwgTWF0aC5hYnMoZGVsdGEueSkgJiYgdGhpcy5faXMoJ3ZhbGlkJykpIHtcclxuICAgICAgdGhpcy5fZHJhZy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fZHJhZy5tb3ZpbmcgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuYmxvY2tDbGlja0FuY2hvckluRHJhZ2dpbmcoZXZlbnQpO1xyXG5cclxuICAgIHRoaXMubGlzdGVuZXJNb3VzZU1vdmUgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbihkb2N1bWVudCwgJ21vdXNlbW92ZScsIHRoaXMuYmluZE9uRHJhZ01vdmUpO1xyXG4gICAgdGhpcy5saXN0ZW5lclRvdWNoTW92ZSA9IHRoaXMucmVuZGVyZXIubGlzdGVuKGRvY3VtZW50LCAndG91Y2htb3ZlJywgdGhpcy5iaW5kT25EcmFnTW92ZSk7XHJcblxyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICB0aGlzLl9lbnRlckRyYWdnaW5nKCk7XHJcbiAgICB0aGlzLl9vbmVEcmFnTW92ZSQubmV4dChldmVudCk7XHJcbiAgICAvLyB0aGlzLl9zZW5kQ2hhbmdlcygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQXR0YWNoZXMgaGFuZGxlciB0byBIVE1MQW5jaG9yRWxlbWVudCBmb3IgcHJldmVudGluZyBjbGljayB3aGlsZSBjYXJvdXNlbCBpcyBiZWluZyBkcmFnZ2VkXHJcbiAgICogQHBhcmFtIGV2ZW50IGV2ZW50IG9iamVjdFxyXG4gICAqL1xyXG4gIHByaXZhdGUgYmxvY2tDbGlja0FuY2hvckluRHJhZ2dpbmcoZXZlbnQ6IGFueSkge1xyXG4gICAgbGV0IHRhcmdldDogSFRNTEVsZW1lbnQgfCBudWxsID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgd2hpbGUgKHRhcmdldCAmJiAhKHRhcmdldCBpbnN0YW5jZW9mIEhUTUxBbmNob3JFbGVtZW50KSkge1xyXG4gICAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50RWxlbWVudDtcclxuICAgIH1cclxuICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBIVE1MQW5jaG9yRWxlbWVudCkge1xyXG4gICAgICB0aGlzLmxpc3RlbmVyQVRhZyA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRhcmdldCwgJ2NsaWNrJywgKCkgPT4gZmFsc2UpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgXHQvKipcclxuXHQgKiBIYW5kbGVzIHRoZSBgdG91Y2htb3ZlYCBhbmQgYG1vdXNlbW92ZWAgZXZlbnRzLlxyXG5cdCAqIEB0b2RvICMyNjFcclxuXHQgKiBAcGFyYW0gZXZlbnQgLSBUaGUgZXZlbnQgYXJndW1lbnRzLlxyXG5cdCAqL1xyXG5cdHByaXZhdGUgX29uRHJhZ01vdmUoZXZlbnQpIHtcclxuICAgIGlmICghdGhpcy5fZHJhZy5hY3RpdmUpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICBsZXQgc3RhZ2U6IENvb3JkcztcclxuICAgIGNvbnN0IHN0YWdlT3JFeGl0OiBib29sZWFuIHwgQ29vcmRzID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZGVmaW5lTmV3Q29vcmRzRHJhZyhldmVudCwgdGhpcy5fZHJhZyk7XHJcblxyXG4gICAgaWYgKHN0YWdlT3JFeGl0ID09PSBmYWxzZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBzdGFnZSA9IHN0YWdlT3JFeGl0IGFzIENvb3JkcztcclxuXHJcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIHRoaXMuX2RyYWcuc3RhZ2UuY3VycmVudCA9IHN0YWdlO1xyXG5cdFx0dGhpcy5fYW5pbWF0ZShzdGFnZS54IC0gdGhpcy5fZHJhZy5zdGFnZS5zdGFydC54KTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBNb3ZlcyAub3dsLXN0YWdlIGxlZnQtcmlnaHRcclxuICAgKiBAcGFyYW0gY29vcmRpbmF0ZSBjb29yZGluYXRlIHRvIGJlIHNldCB0byAub3dsLXN0YWdlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfYW5pbWF0ZShjb29yZGluYXRlOiBudW1iZXIpIHtcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdLCAndHJhbnNmb3JtJywgYHRyYW5zbGF0ZTNkKCR7Y29vcmRpbmF0ZX1weCwwcHgsMHB4YCk7XHJcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXSwgJ3RyYW5zaXRpb24nLCAnMHMnKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEhhbmRsZXMgdGhlIGB0b3VjaGVuZGAgYW5kIGBtb3VzZXVwYCBldmVudHMuXHJcblx0ICogQHRvZG8gIzI2MVxyXG5cdCAqIEB0b2RvIFRocmVzaG9sZCBmb3IgY2xpY2sgZXZlbnRcclxuXHQgKiBAcGFyYW0gZXZlbnQgLSBUaGUgZXZlbnQgYXJndW1lbnRzLlxyXG5cdCAqL1xyXG5cdHByaXZhdGUgX29uRHJhZ0VuZChldmVudCkge1xyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uub3dsRE9NRGF0YS5pc0dyYWIgPSBmYWxzZTtcclxuXHJcbiAgICBpZiAodGhpcy5fZHJhZy5tb3ZpbmcpIHtcclxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0sICd0cmFuc2Zvcm0nLCBgYCk7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdLCAndHJhbnNpdGlvbicsIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNwZWVkKCt0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5kcmFnRW5kU3BlZWQgfHwgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3Muc21hcnRTcGVlZCkvMTAwMCArJ3MnKTtcclxuXHJcbiAgICAgIHRoaXMuX2ZpbmlzaERyYWdnaW5nKGV2ZW50KTtcclxuICAgICAgdGhpcy5saXN0ZW5lck1vdXNlTW92ZSgpO1xyXG4gICAgICB0aGlzLmxpc3RlbmVyVG91Y2hNb3ZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fZHJhZyA9IHtcclxuICAgICAgdGltZTogbnVsbCxcclxuICAgICAgdGFyZ2V0OiBudWxsLFxyXG4gICAgICBwb2ludGVyOiBudWxsLFxyXG4gICAgICBzdGFnZToge1xyXG4gICAgICAgIHN0YXJ0OiBudWxsLFxyXG4gICAgICAgIGN1cnJlbnQ6IG51bGxcclxuICAgICAgfSxcclxuICAgICAgZGlyZWN0aW9uOiBudWxsLFxyXG4gICAgICBhY3RpdmU6IGZhbHNlLFxyXG4gICAgICBtb3Zpbmc6IGZhbHNlXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnRyaWdnZXIoJ2RyYWdnZWQnKTtcclxuICAgIHRoaXMubGlzdGVuZXJNb3VzZVVwKCk7XHJcbiAgICB0aGlzLmxpc3RlbmVyVG91Y2hFbmQoKTtcclxuICB9O1xyXG5cclxuICAvKipcclxuXHQgKiBQcmVwYXJlcyBkYXRhIGZvciBkcmFnZ2luZyBjYXJvdXNlbC4gSXQgc3RhcnRzIGFmdGVyIGZpcmluZyBgdG91Y2hzdGFydGAgYW5kIGBtb3VzZWRvd25gIGV2ZW50cy5cclxuXHQgKiBAcGFyYW0gZXZlbnQgLSBUaGUgZXZlbnQgYXJndW1lbnRzLlxyXG5cdCAqIEByZXR1cm5zIHN0YWdlIC0gb2JqZWN0IHdpdGggJ3gnIGFuZCAneScgY29vcmRpbmF0ZXMgb2YgLm93bC1zdGFnZVxyXG5cdCAqL1xyXG4gIHByaXZhdGUgX3ByZXBhcmVEcmFnZ2luZyhldmVudDogYW55KTogQ29vcmRzIHtcclxuICAgIHJldHVybiB0aGlzLmNhcm91c2VsU2VydmljZS5wcmVwYXJlRHJhZ2dpbmcoZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQXR0YWNoZXMgaGFuZGxlciBmb3IgJ2NsaWNrJyBldmVudCBvbiBhbnkgZWxlbWVudCBpbiAub3dsLXN0YWdlIGluIG9yZGVyIHRvIHByZXZlbnQgZHJhZ2dpbmcgd2hlbiBtb3Zpbmcgb2YgY3Vyc29yIGlzIGxlc3MgdGhhbiAzcHhcclxuICAgKi9cclxuICBwcml2YXRlIF9vbmVDbGlja0hhbmRsZXIgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmxpc3RlbmVyT25lQ2xpY2sgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLl9kcmFnLnRhcmdldCwgJ2NsaWNrJywgKCkgPT4gZmFsc2UpXHJcbiAgICB0aGlzLmxpc3RlbmVyT25lQ2xpY2soKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZpbmlzaGVzIGRyYWdnaW5nXHJcbiAgICogQHBhcmFtIGV2ZW50IG9iamVjdCBldmVudCBvZiAnbW91c2VVcCcgb2YgJ3RvdWNoZW5kJyBldmVudHNcclxuICAgKi9cclxuICBwcml2YXRlIF9maW5pc2hEcmFnZ2luZyhldmVudDogYW55KSB7XHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5maW5pc2hEcmFnZ2luZyhldmVudCwgdGhpcy5fZHJhZywgdGhpcy5fb25lQ2xpY2tIYW5kbGVyKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEdldHMgdW5pZmllZCBwb2ludGVyIGNvb3JkaW5hdGVzIGZyb20gZXZlbnQuXHJcblx0ICogQHBhcmFtIGV2ZW50IFRoZSBgbW91c2Vkb3duYCBvciBgdG91Y2hzdGFydGAgZXZlbnQuXHJcblx0ICogQHJldHVybnMgQ29udGFpbnMgYHhgIGFuZCBgeWAgY29vcmRpbmF0ZXMgb2YgY3VycmVudCBwb2ludGVyIHBvc2l0aW9uLlxyXG5cdCAqL1xyXG4gIHByaXZhdGUgX3BvaW50ZXIoZXZlbnQ6IGFueSk6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy5jYXJvdXNlbFNlcnZpY2UucG9pbnRlcihldmVudCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuXHQgKiBHZXRzIHRoZSBkaWZmZXJlbmNlIG9mIHR3byB2ZWN0b3JzLlxyXG5cdCAqIEBwYXJhbSBmaXJzdCBUaGUgZmlyc3QgdmVjdG9yLlxyXG5cdCAqIEBwYXJhbSBzZWNvbmQtIFRoZSBzZWNvbmQgdmVjdG9yLlxyXG5cdCAqIEByZXR1cm5zIFRoZSBkaWZmZXJlbmNlLlxyXG5cdCAqL1xyXG4gIHByaXZhdGUgX2RpZmZlcmVuY2UoZmlyc3RDOiBDb29yZHMsIHNlY29uZDogQ29vcmRzKTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLmNhcm91c2VsU2VydmljZS5kaWZmZXJlbmNlKGZpcnN0Qywgc2Vjb25kKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIENoZWNrcyB3aGV0aGVyIHRoZSBjYXJvdXNlbCBpcyBpbiBhIHNwZWNpZmljIHN0YXRlIG9yIG5vdC5cclxuXHQgKiBAcGFyYW0gc3BlY2lmaWNTdGF0ZSBUaGUgc3RhdGUgdG8gY2hlY2suXHJcblx0ICogQHJldHVybnMgVGhlIGZsYWcgd2hpY2ggaW5kaWNhdGVzIGlmIHRoZSBjYXJvdXNlbCBpcyBidXN5LlxyXG5cdCAqL1xyXG4gIHByaXZhdGUgX2lzKHNwZWNpZmljU3RhdGU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmlzKHNwZWNpZmljU3RhdGUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBFbnRlcnMgYSBzdGF0ZS5cclxuICAqIEBwYXJhbSBuYW1lIFRoZSBzdGF0ZSBuYW1lLlxyXG4gICovXHJcbiAgcHJpdmF0ZSBfZW50ZXIobmFtZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5lbnRlcihuYW1lKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIFNlbmRzIGFsbCBkYXRhIG5lZWRlZCBmb3IgVmlldy5cclxuXHQgKi9cclxuICBwcml2YXRlIF9zZW5kQ2hhbmdlcygpIHtcclxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNlbmRDaGFuZ2VzKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGVyIGZvciB0cmFuc2l0aW9lbmQgZXZlbnRcclxuICAgKi9cclxuICBvblRyYW5zaXRpb25FbmQoKSB7XHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5vblRyYW5zaXRpb25FbmQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEVudGVycyBpbnRvIGEgJ2RyYWdnaW5nJyBzdGF0ZVxyXG5cdCAqL1xyXG4gIHByaXZhdGUgX2VudGVyRHJhZ2dpbmcoKSB7XHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5lbnRlckRyYWdnaW5nKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGVzIHRoZSBlbmQgb2YgJ2FuaW1hdGlvbmVuZCcgZXZlbnRcclxuICAgKiBAcGFyYW0gaWQgSWQgb2Ygc2xpZGVzXHJcbiAgICovXHJcbiAgY2xlYXIoaWQpIHtcclxuICAgIHRoaXMuYW5pbWF0ZVNlcnZpY2UuY2xlYXIoaWQpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge0xvY2F0aW9uU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7QXR0cmlidXRlLCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgUmVuZGVyZXIyLCBpc0Rldk1vZGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQge05hdmlnYXRpb25FbmQsIFJvdXRlckV2ZW50LCBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlLCBVcmxUcmVlfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5cclxuZXhwb3J0IHR5cGUgUXVlcnlQYXJhbXNIYW5kbGluZyA9ICdtZXJnZScgfCAncHJlc2VydmUnIHwgJyc7XHJcblxyXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJzpub3QoYSlbb3dsUm91dGVyTGlua10nfSlcclxuZXhwb3J0IGNsYXNzIE93bFJvdXRlckxpbmtEaXJlY3RpdmUge1xyXG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxyXG4gIEBJbnB1dCgpIHF1ZXJ5UGFyYW1zICE6IHtbazogc3RyaW5nXTogYW55fTtcclxuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cclxuICBASW5wdXQoKSBmcmFnbWVudCAhOiBzdHJpbmc7XHJcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXHJcbiAgQElucHV0KCkgcXVlcnlQYXJhbXNIYW5kbGluZyAhOiBRdWVyeVBhcmFtc0hhbmRsaW5nO1xyXG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxyXG4gIEBJbnB1dCgpIHByZXNlcnZlRnJhZ21lbnQgITogYm9vbGVhbjtcclxuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cclxuICBASW5wdXQoKSBza2lwTG9jYXRpb25DaGFuZ2UgITogYm9vbGVhbjtcclxuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cclxuICBASW5wdXQoKSByZXBsYWNlVXJsICE6IGJvb2xlYW47XHJcblxyXG4gIEBJbnB1dCgpIHN0b3BMaW5rID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBjb21tYW5kczogYW55W10gPSBbXTtcclxuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cclxuICBwcml2YXRlIHByZXNlcnZlICE6IGJvb2xlYW47XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgICAgQEF0dHJpYnV0ZSgndGFiaW5kZXgnKSB0YWJJbmRleDogc3RyaW5nLCByZW5kZXJlcjogUmVuZGVyZXIyLCBlbDogRWxlbWVudFJlZikge1xyXG4gICAgaWYgKHRhYkluZGV4ID09IG51bGwpIHtcclxuICAgICAgcmVuZGVyZXIuc2V0QXR0cmlidXRlKGVsLm5hdGl2ZUVsZW1lbnQsICd0YWJpbmRleCcsICcwJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCBvd2xSb3V0ZXJMaW5rKGNvbW1hbmRzOiBhbnlbXXxzdHJpbmcpIHtcclxuICAgIGlmIChjb21tYW5kcyAhPSBudWxsKSB7XHJcbiAgICAgIHRoaXMuY29tbWFuZHMgPSBBcnJheS5pc0FycmF5KGNvbW1hbmRzKSA/IGNvbW1hbmRzIDogW2NvbW1hbmRzXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY29tbWFuZHMgPSBbXTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBkZXByZWNhdGVkIDQuMC4wIHVzZSBgcXVlcnlQYXJhbXNIYW5kbGluZ2AgaW5zdGVhZC5cclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIHNldCBwcmVzZXJ2ZVF1ZXJ5UGFyYW1zKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICBpZiAoaXNEZXZNb2RlKCkgJiYgPGFueT5jb25zb2xlICYmIDxhbnk+Y29uc29sZS53YXJuKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybigncHJlc2VydmVRdWVyeVBhcmFtcyBpcyBkZXByZWNhdGVkISwgdXNlIHF1ZXJ5UGFyYW1zSGFuZGxpbmcgaW5zdGVhZC4nKTtcclxuICAgIH1cclxuICAgIHRoaXMucHJlc2VydmUgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcclxuICBvbkNsaWNrKCk6IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgZXh0cmFzID0ge1xyXG4gICAgICBza2lwTG9jYXRpb25DaGFuZ2U6IGF0dHJCb29sVmFsdWUodGhpcy5za2lwTG9jYXRpb25DaGFuZ2UpLFxyXG4gICAgICByZXBsYWNlVXJsOiBhdHRyQm9vbFZhbHVlKHRoaXMucmVwbGFjZVVybCksXHJcbiAgICB9O1xyXG4gICAgaWYgKHRoaXMuc3RvcExpbmspIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGVCeVVybCh0aGlzLnVybFRyZWUsIGV4dHJhcyk7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGdldCB1cmxUcmVlKCk6IFVybFRyZWUge1xyXG4gICAgcmV0dXJuIHRoaXMucm91dGVyLmNyZWF0ZVVybFRyZWUodGhpcy5jb21tYW5kcywge1xyXG4gICAgICByZWxhdGl2ZVRvOiB0aGlzLnJvdXRlLFxyXG4gICAgICBxdWVyeVBhcmFtczogdGhpcy5xdWVyeVBhcmFtcyxcclxuICAgICAgZnJhZ21lbnQ6IHRoaXMuZnJhZ21lbnQsXHJcbiAgICAgIHByZXNlcnZlUXVlcnlQYXJhbXM6IGF0dHJCb29sVmFsdWUodGhpcy5wcmVzZXJ2ZSksXHJcbiAgICAgIHF1ZXJ5UGFyYW1zSGFuZGxpbmc6IHRoaXMucXVlcnlQYXJhbXNIYW5kbGluZyxcclxuICAgICAgcHJlc2VydmVGcmFnbWVudDogYXR0ckJvb2xWYWx1ZSh0aGlzLnByZXNlcnZlRnJhZ21lbnQpLFxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogQGRlc2NyaXB0aW9uXHJcbiAqXHJcbiAqIExldHMgeW91IGxpbmsgdG8gc3BlY2lmaWMgcm91dGVzIGluIHlvdXIgYXBwLlxyXG4gKlxyXG4gKiBTZWUgYFJvdXRlckxpbmtgIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAbmdNb2R1bGUgUm91dGVyTW9kdWxlXHJcbiAqXHJcbiAqIEBwdWJsaWNBcGlcclxuICovXHJcbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnYVtvd2xSb3V0ZXJMaW5rXSd9KVxyXG5leHBvcnQgY2xhc3MgT3dsUm91dGVyTGlua1dpdGhIcmVmRGlyZWN0aXZlIGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xyXG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxyXG4gIEBIb3N0QmluZGluZygnYXR0ci50YXJnZXQnKSBASW5wdXQoKSB0YXJnZXQgITogc3RyaW5nO1xyXG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxyXG4gIEBJbnB1dCgpIHF1ZXJ5UGFyYW1zICE6IHtbazogc3RyaW5nXTogYW55fTtcclxuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cclxuICBASW5wdXQoKSBmcmFnbWVudCAhOiBzdHJpbmc7XHJcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXHJcbiAgQElucHV0KCkgcXVlcnlQYXJhbXNIYW5kbGluZyAhOiBRdWVyeVBhcmFtc0hhbmRsaW5nO1xyXG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxyXG4gIEBJbnB1dCgpIHByZXNlcnZlRnJhZ21lbnQgITogYm9vbGVhbjtcclxuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cclxuICBASW5wdXQoKSBza2lwTG9jYXRpb25DaGFuZ2UgITogYm9vbGVhbjtcclxuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cclxuICBASW5wdXQoKSByZXBsYWNlVXJsICE6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgc3RvcExpbmsgPSBmYWxzZTtcclxuXHJcbiAgcHJpdmF0ZSBjb21tYW5kczogYW55W10gPSBbXTtcclxuICBwcml2YXRlIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxyXG4gIHByaXZhdGUgcHJlc2VydmUgITogYm9vbGVhbjtcclxuXHJcbiAgLy8gdGhlIHVybCBkaXNwbGF5ZWQgb24gdGhlIGFuY2hvciBlbGVtZW50LlxyXG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxyXG4gIEBIb3N0QmluZGluZygpIGhyZWYgITogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICAgIHByaXZhdGUgbG9jYXRpb25TdHJhdGVneTogTG9jYXRpb25TdHJhdGVneSkge1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb24gPSByb3V0ZXIuZXZlbnRzLnN1YnNjcmliZSgoczogUm91dGVyRXZlbnQpID0+IHtcclxuICAgICAgaWYgKHMgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVUYXJnZXRVcmxBbmRIcmVmKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgb3dsUm91dGVyTGluayhjb21tYW5kczogYW55W118c3RyaW5nKSB7XHJcbiAgICBpZiAoY29tbWFuZHMgIT0gbnVsbCkge1xyXG4gICAgICB0aGlzLmNvbW1hbmRzID0gQXJyYXkuaXNBcnJheShjb21tYW5kcykgPyBjb21tYW5kcyA6IFtjb21tYW5kc107XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmNvbW1hbmRzID0gW107XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCBwcmVzZXJ2ZVF1ZXJ5UGFyYW1zKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICBpZiAoaXNEZXZNb2RlKCkgJiYgPGFueT5jb25zb2xlICYmIDxhbnk+Y29uc29sZS53YXJuKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybigncHJlc2VydmVRdWVyeVBhcmFtcyBpcyBkZXByZWNhdGVkLCB1c2UgcXVlcnlQYXJhbXNIYW5kbGluZyBpbnN0ZWFkLicpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5wcmVzZXJ2ZSA9IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczoge30pOiBhbnkgeyB0aGlzLnVwZGF0ZVRhcmdldFVybEFuZEhyZWYoKTsgfVxyXG4gIG5nT25EZXN0cm95KCk6IGFueSB7IHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7IH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudC5idXR0b24nLCAnJGV2ZW50LmN0cmxLZXknLCAnJGV2ZW50Lm1ldGFLZXknLCAnJGV2ZW50LnNoaWZ0S2V5J10pXHJcbiAgb25DbGljayhidXR0b246IG51bWJlciwgY3RybEtleTogYm9vbGVhbiwgbWV0YUtleTogYm9vbGVhbiwgc2hpZnRLZXk6IGJvb2xlYW4pOiBib29sZWFuIHtcclxuICAgIGlmIChidXR0b24gIT09IDAgfHwgY3RybEtleSB8fCBtZXRhS2V5IHx8IHNoaWZ0S2V5KSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0eXBlb2YgdGhpcy50YXJnZXQgPT09ICdzdHJpbmcnICYmIHRoaXMudGFyZ2V0ICE9PSAnX3NlbGYnKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnN0b3BMaW5rKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBleHRyYXMgPSB7XHJcbiAgICAgIHNraXBMb2NhdGlvbkNoYW5nZTogYXR0ckJvb2xWYWx1ZSh0aGlzLnNraXBMb2NhdGlvbkNoYW5nZSksXHJcbiAgICAgIHJlcGxhY2VVcmw6IGF0dHJCb29sVmFsdWUodGhpcy5yZXBsYWNlVXJsKSxcclxuICAgIH07XHJcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKHRoaXMudXJsVHJlZSwgZXh0cmFzKTtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdXBkYXRlVGFyZ2V0VXJsQW5kSHJlZigpOiB2b2lkIHtcclxuICAgIHRoaXMuaHJlZiA9IHRoaXMubG9jYXRpb25TdHJhdGVneS5wcmVwYXJlRXh0ZXJuYWxVcmwodGhpcy5yb3V0ZXIuc2VyaWFsaXplVXJsKHRoaXMudXJsVHJlZSkpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHVybFRyZWUoKTogVXJsVHJlZSB7XHJcbiAgICByZXR1cm4gdGhpcy5yb3V0ZXIuY3JlYXRlVXJsVHJlZSh0aGlzLmNvbW1hbmRzLCB7XHJcbiAgICAgIHJlbGF0aXZlVG86IHRoaXMucm91dGUsXHJcbiAgICAgIHF1ZXJ5UGFyYW1zOiB0aGlzLnF1ZXJ5UGFyYW1zLFxyXG4gICAgICBmcmFnbWVudDogdGhpcy5mcmFnbWVudCxcclxuICAgICAgcHJlc2VydmVRdWVyeVBhcmFtczogYXR0ckJvb2xWYWx1ZSh0aGlzLnByZXNlcnZlKSxcclxuICAgICAgcXVlcnlQYXJhbXNIYW5kbGluZzogdGhpcy5xdWVyeVBhcmFtc0hhbmRsaW5nLFxyXG4gICAgICBwcmVzZXJ2ZUZyYWdtZW50OiBhdHRyQm9vbFZhbHVlKHRoaXMucHJlc2VydmVGcmFnbWVudCksXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGF0dHJCb29sVmFsdWUoczogYW55KTogYm9vbGVhbiB7XHJcbiAgcmV0dXJuIHMgPT09ICcnIHx8ICEhcztcclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge1xyXG4gIENhcm91c2VsQ29tcG9uZW50LFxyXG4gIENhcm91c2VsU2xpZGVEaXJlY3RpdmVcclxufSBmcm9tICcuL2Nhcm91c2VsLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFdJTkRPV19QUk9WSURFUlMgfSBmcm9tICcuLi9zZXJ2aWNlcy93aW5kb3ctcmVmLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBSZXNpemVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvcmVzaXplLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBET0NVTUVOVF9QUk9WSURFUlMgfSBmcm9tICcuLi9zZXJ2aWNlcy9kb2N1bWVudC1yZWYuc2VydmljZSc7XHJcbmltcG9ydCB7IFN0YWdlQ29tcG9uZW50IH0gZnJvbSAnLi9zdGFnZS9zdGFnZS5jb21wb25lbnQnO1xyXG4vLyBpbXBvcnQgeyBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XHJcbmV4cG9ydCB7XHJcbiAgQ2Fyb3VzZWxDb21wb25lbnQsXHJcbiAgQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZSxcclxuICBTbGlkZXNPdXRwdXREYXRhXHJcbn0gZnJvbSAnLi9jYXJvdXNlbC5jb21wb25lbnQnO1xyXG5cclxuaW1wb3J0IHsgUm91dGVyTW9kdWxlLCBSb3V0ZXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBPd2xSb3V0ZXJMaW5rRGlyZWN0aXZlLCBPd2xSb3V0ZXJMaW5rV2l0aEhyZWZEaXJlY3RpdmUgfSBmcm9tICcuL293bC1yb3V0ZXItbGluay5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBPd2xMb2dnZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9sb2dnZXIuc2VydmljZSc7XHJcbmV4cG9ydCB7IE93bFJvdXRlckxpbmtEaXJlY3RpdmUsIE93bFJvdXRlckxpbmtXaXRoSHJlZkRpcmVjdGl2ZSB9IGZyb20gJy4vb3dsLXJvdXRlci1saW5rLmRpcmVjdGl2ZSc7XHJcblxyXG5jb25zdCByb3V0ZXM6IFJvdXRlcyA9IFtdO1xyXG5cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgLy8gQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUsIC8vIHRoZXJlJ3MgYW4gaXNzdWUgd2l0aCB0aGlzIGltcG9ydCB3aGlsZSB1c2luZyBsYXp5IGxvYWRpbmcgb2YgbW9kdWxlIGNvbnN1bWluZyB0aGlzIGxpYnJhcnkuIEkgZG9uJ3QgcmVtb3ZlIGl0IGJlY2F1c2UgaXQgY291bGQgYmUgbmVlZGVkIGR1cmluZyBmdXR1cmUgZW5oYW5jZW1lbnQgb2YgdGhpcyBsaWIuXHJcbiAgICBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQocm91dGVzKV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbQ2Fyb3VzZWxDb21wb25lbnQsIENhcm91c2VsU2xpZGVEaXJlY3RpdmUsIFN0YWdlQ29tcG9uZW50LCBPd2xSb3V0ZXJMaW5rRGlyZWN0aXZlLCBPd2xSb3V0ZXJMaW5rV2l0aEhyZWZEaXJlY3RpdmVdLFxyXG4gIGV4cG9ydHM6IFtDYXJvdXNlbENvbXBvbmVudCwgQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZSwgT3dsUm91dGVyTGlua0RpcmVjdGl2ZSwgT3dsUm91dGVyTGlua1dpdGhIcmVmRGlyZWN0aXZlXSxcclxuICBwcm92aWRlcnM6IFtXSU5ET1dfUFJPVklERVJTLCBSZXNpemVTZXJ2aWNlLCBET0NVTUVOVF9QUk9WSURFUlMsIE93bExvZ2dlcl1cclxufSlcclxuZXhwb3J0IGNsYXNzIENhcm91c2VsTW9kdWxlIHt9XHJcbiJdLCJuYW1lcyI6WyJTdWJqZWN0IiwiSW5qZWN0YWJsZSIsIkV2ZW50TWFuYWdlciIsImlzRGV2TW9kZSIsIkVycm9ySGFuZGxlciIsInRhcCIsImZpbHRlciIsIm1lcmdlIiwiSW5qZWN0aW9uVG9rZW4iLCJ0c2xpYl8xLl9fZXh0ZW5kcyIsImlzUGxhdGZvcm1Ccm93c2VyIiwiUExBVEZPUk1fSUQiLCJJbmplY3QiLCJyb3V0ZXIiLCJza2lwIiwiQWN0aXZhdGVkUm91dGUiLCJSb3V0ZXIiLCJEaXJlY3RpdmUiLCJUZW1wbGF0ZVJlZiIsIklucHV0IiwiRXZlbnRFbWl0dGVyIiwic3dpdGNoTWFwIiwiZmlyc3QiLCJkZWxheSIsIkNvbXBvbmVudCIsIkVsZW1lbnRSZWYiLCJDb250ZW50Q2hpbGRyZW4iLCJPdXRwdXQiLCJ0cmlnZ2VyIiwic3RhdGUiLCJzdHlsZSIsInRyYW5zaXRpb24iLCJhbmltYXRlIiwiTmdab25lIiwiUmVuZGVyZXIyIiwiSG9zdExpc3RlbmVyIiwiQXR0cmlidXRlIiwiTmF2aWdhdGlvbkVuZCIsIkxvY2F0aW9uU3RyYXRlZ3kiLCJIb3N0QmluZGluZyIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwiUm91dGVyTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7UUF3QkUsdUJBQW9CLFlBQTBCO1lBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1lBQzVDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSUEsWUFBTyxFQUFFLENBQUM7WUFDbkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxzQkFBc0IsQ0FDdEMsUUFBUSxFQUNSLFFBQVEsRUFDUixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDekIsQ0FBQztZQUNGLElBQUksQ0FBQyxZQUFZLENBQUMsc0JBQXNCLENBQ3RDLFFBQVEsRUFDUixRQUFRLEVBQ1IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ3pCLENBQUM7U0FDSDtRQXJCRCxzQkFBSSxvQ0FBUzs7Ozs7Ozs7Z0JBQWI7Z0JBQ0UsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDO2FBQzFDOzs7V0FBQTs7Ozs7Ozs7OztRQXlCTyxnQ0FBUTs7Ozs7WUFBaEIsVUFBaUIsS0FBYztnQkFDN0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLG9CQUFTLEtBQUssQ0FBQyxNQUFNLEdBQUMsQ0FBQzthQUMvQzs7Ozs7Ozs7OztRQU1PLGdDQUFROzs7OztZQUFoQixVQUFpQixLQUFjO2dCQUM3QixJQUFJLENBQUMsV0FBVyxzQkFBVyxLQUFLLENBQUMsTUFBTSxFQUFBLENBQUM7YUFDekM7O29CQWhERkMsZUFBVTs7Ozs7d0JBSkZDLDRCQUFZOzs7UUFxRHJCLG9CQUFDO0tBakREOztJQ0pBOzs7Ozs7Ozs7Ozs7OztJQWNBO0lBRUEsSUFBSSxhQUFhLEdBQUcsVUFBUyxDQUFDLEVBQUUsQ0FBQztRQUM3QixhQUFhLEdBQUcsTUFBTSxDQUFDLGNBQWM7YUFDaEMsRUFBRSxTQUFTLEVBQUUs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QyxDQUFDLEdBQUcsS0FBSyxDQUFDO3lCQUMxRDt3QkFFRyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7NEJBQ3BELEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOzRCQUN0RCxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLEdBQUcsR0FBRyxDQUFDLENBQUM7NEJBRTdELElBQUksQ0FBQyxLQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEtBQUssS0FBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO29DQUMxRCxLQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLElBQUksS0FBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0NBQy9ELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7NkJBQ2pCO3lCQUNOO3dCQUVELEtBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSzs0QkFDNUIsS0FBSyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7NEJBQ3ZCLE9BQU8sS0FBSyxDQUFDO3lCQUNiLENBQUMsQ0FBQzt3QkFDSCxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTs0QkFDbkIsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO3lCQUN0QyxDQUFDLENBQUM7d0JBRUMs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