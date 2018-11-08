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
        CarouselService.ctorParameters = function () { return []; };
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
                { type: HashService }
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

    exports.CarouselModule = CarouselModule;
    exports.CarouselComponent = CarouselComponent;
    exports.CarouselSlideDirective = CarouselSlideDirective;
    exports.SlidesOutputData = SlidesOutputData;
    exports.OwlRouterLinkDirective = OwlRouterLinkDirective;
    exports.OwlRouterLinkWithHrefDirective = OwlRouterLinkWithHrefDirective;
    exports.ɵw = StageComponent;
    exports.ɵs = AnimateService;
    exports.ɵt = AutoHeightService;
    exports.ɵc = AutoplayService;
    exports.ɵb = CarouselService;
    exports.ɵm = BrowserDocumentRef;
    exports.ɵk = DOCUMENT;
    exports.ɵq = DOCUMENT_PROVIDERS;
    exports.ɵl = DocumentRef;
    exports.ɵo = browserDocumentProvider;
    exports.ɵn = documentFactory;
    exports.ɵp = documentProvider;
    exports.ɵu = HashService;
    exports.ɵr = LazyLoadService;
    exports.ɵa = NavigationService;
    exports.ɵv = ResizeService;
    exports.ɵf = BrowserWindowRef;
    exports.ɵd = WINDOW;
    exports.ɵj = WINDOW_PROVIDERS;
    exports.ɵe = WindowRef;
    exports.ɵh = browserWindowProvider;
    exports.ɵg = windowFactory;
    exports.ɵi = windowProvider;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW93bC1jYXJvdXNlbC1vLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmd4LW93bC1jYXJvdXNlbC1vL2xpYi9zZXJ2aWNlcy9yZXNpemUuc2VydmljZS50cyIsIm5vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCJuZzovL25neC1vd2wtY2Fyb3VzZWwtby9saWIvY2Fyb3VzZWwvb3dsLWNhcm91c2VsLW8tY29uZmlnLnRzIiwibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vbGliL3NlcnZpY2VzL2Nhcm91c2VsLnNlcnZpY2UudHMiLCJuZzovL25neC1vd2wtY2Fyb3VzZWwtby9saWIvc2VydmljZXMvbmF2aWdhdGlvbi5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vbGliL3NlcnZpY2VzL3dpbmRvdy1yZWYuc2VydmljZS50cyIsIm5nOi8vbmd4LW93bC1jYXJvdXNlbC1vL2xpYi9zZXJ2aWNlcy9kb2N1bWVudC1yZWYuc2VydmljZS50cyIsIm5nOi8vbmd4LW93bC1jYXJvdXNlbC1vL2xpYi9zZXJ2aWNlcy9hdXRvcGxheS5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vbGliL3NlcnZpY2VzL2xhenlsb2FkLnNlcnZpY2UudHMiLCJuZzovL25neC1vd2wtY2Fyb3VzZWwtby9saWIvc2VydmljZXMvYW5pbWF0ZS5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vbGliL3NlcnZpY2VzL2F1dG9oZWlnaHQuc2VydmljZS50cyIsIm5nOi8vbmd4LW93bC1jYXJvdXNlbC1vL2xpYi9zZXJ2aWNlcy9oYXNoLnNlcnZpY2UudHMiLCJuZzovL25neC1vd2wtY2Fyb3VzZWwtby9saWIvY2Fyb3VzZWwvY2Fyb3VzZWwuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vbGliL2Nhcm91c2VsL3N0YWdlL3N0YWdlLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LW93bC1jYXJvdXNlbC1vL2xpYi9jYXJvdXNlbC9vd2wtcm91dGVyLWxpbmsuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vbGliL2Nhcm91c2VsL2Nhcm91c2VsLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudE1hbmFnZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBSZXNpemVTZXJ2aWNlIHtcclxuICAvKipcclxuICAgKiBXaWR0aCBvZiB3aW5kb3dcclxuICAgKi9cclxuICBwdWJsaWMgd2luZG93V2lkdGg6IGFueTtcclxuXHJcbiAgLyoqXHJcbiAgICogTWFrZXMgcmVzaXplU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxyXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgcmVzaXplU3ViamVjdFxyXG4gICAqL1xyXG4gIGdldCBvblJlc2l6ZSQoKTogT2JzZXJ2YWJsZTxXaW5kb3c+IHtcclxuICAgIHJldHVybiB0aGlzLnJlc2l6ZVN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdWJqZWN0IG9mICdyZXNpemUnIGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSByZXNpemVTdWJqZWN0OiBTdWJqZWN0PFdpbmRvdz47XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZXZlbnRNYW5hZ2VyOiBFdmVudE1hbmFnZXIpIHtcclxuICAgIHRoaXMucmVzaXplU3ViamVjdCA9IG5ldyBTdWJqZWN0KCk7XHJcbiAgICB0aGlzLmV2ZW50TWFuYWdlci5hZGRHbG9iYWxFdmVudExpc3RlbmVyKFxyXG4gICAgICAnd2luZG93JyxcclxuICAgICAgJ3Jlc2l6ZScsXHJcbiAgICAgIHRoaXMub25SZXNpemUuYmluZCh0aGlzKVxyXG4gICAgKTtcclxuICAgIHRoaXMuZXZlbnRNYW5hZ2VyLmFkZEdsb2JhbEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgICd3aW5kb3cnLFxyXG4gICAgICAnb25sb2FkJyxcclxuICAgICAgdGhpcy5vbkxvYWRlZC5iaW5kKHRoaXMpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlciBvZiAncmVzaXplJyBldmVudC4gUGFzc2VzIGRhdGEgdGhyb3cgcmVzaXplU3ViamVjdFxyXG4gICAqIEBwYXJhbSBldmVudCBFdmVudCBPYmplY3Qgb2YgJ3Jlc2l6ZScgZXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIG9uUmVzaXplKGV2ZW50OiBVSUV2ZW50KSB7XHJcbiAgICB0aGlzLnJlc2l6ZVN1YmplY3QubmV4dCg8V2luZG93PmV2ZW50LnRhcmdldCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGVyIG9mICdvbmxvYWQnIGV2ZW50LiBEZWZpbmVzIHRoZSB3aWR0aCBvZiB3aW5kb3dcclxuICAgKiBAcGFyYW0gZXZlbnQgRXZlbnQgT2JqZWN0IG9mICdvbmxvYWQnIGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbkxvYWRlZChldmVudDogVUlFdmVudCkge1xyXG4gICAgdGhpcy53aW5kb3dXaWR0aCA9IDxXaW5kb3c+ZXZlbnQudGFyZ2V0O1xyXG4gIH1cclxufVxyXG4iLCIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImltcG9ydCB7IE93bE9wdGlvbnMgfSBmcm9tIFwiLi4vbW9kZWxzL293bC1vcHRpb25zLm1vZGVsXCI7XHJcblxyXG4vKipcclxuICogRGVmYXVsdHMgdmFsdWUgb2Ygb3B0aW9uc1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE93bENhcm91c2VsT0NvbmZpZyBpbXBsZW1lbnRzIE93bE9wdGlvbnMge1xyXG4gIGl0ZW1zID0gMztcclxuICBsb29wID0gZmFsc2U7XHJcbiAgY2VudGVyID0gZmFsc2U7XHJcbiAgcmV3aW5kID0gZmFsc2U7XHJcblxyXG4gIG1vdXNlRHJhZyA9IHRydWU7XHJcbiAgdG91Y2hEcmFnID0gdHJ1ZTtcclxuICBwdWxsRHJhZyA9IHRydWU7XHJcbiAgZnJlZURyYWcgPSBmYWxzZTtcclxuXHJcbiAgbWFyZ2luID0gMDtcclxuICBzdGFnZVBhZGRpbmcgPSAwO1xyXG5cclxuICBtZXJnZSA9IGZhbHNlO1xyXG4gIG1lcmdlRml0ID0gdHJ1ZTtcclxuICBhdXRvV2lkdGggPSBmYWxzZTtcclxuXHJcbiAgc3RhcnRQb3NpdGlvbiA9IDA7XHJcbiAgcnRsID0gZmFsc2U7XHJcblxyXG4gIHNtYXJ0U3BlZWQgPSAyNTA7XHJcbiAgZmx1aWRTcGVlZCA9IGZhbHNlO1xyXG4gIGRyYWdFbmRTcGVlZCA9IGZhbHNlO1xyXG5cclxuICByZXNwb25zaXZlID0ge307XHJcbiAgcmVzcG9uc2l2ZVJlZnJlc2hSYXRlID0gMjAwO1xyXG5cclxuICAvLyBkZWZhdWx0cyB0byBOYXZpZ2F0aW9uXHJcbiAgbmF2ID0gZmFsc2U7XHJcbiAgbmF2VGV4dCA9IFsgJ3ByZXYnLCAnbmV4dCcgXTtcclxuICBuYXZTcGVlZCA9IGZhbHNlO1xyXG4gIHNsaWRlQnkgPSAxOyAvLyBzdGFnZSBtb3ZlcyBvbiAxIHdpZHRoIG9mIHNsaWRlOyBpZiBzbGlkZUJ5ID0gMiwgc3RhZ2UgbW92ZXMgb24gMiB3aWR0aHMgb2Ygc2xpZGVcclxuICBkb3RzID0gdHJ1ZTtcclxuICBkb3RzRWFjaCA9IGZhbHNlO1xyXG4gIGRvdHNEYXRhID0gZmFsc2U7XHJcbiAgZG90c1NwZWVkID0gZmFsc2U7XHJcblxyXG4gIC8vIGRlZmF1bHRzIHRvIEF1dG9wbGF5XHJcbiAgYXV0b3BsYXkgPSBmYWxzZTtcclxuICBhdXRvcGxheVRpbWVvdXQgPSA1MDAwO1xyXG4gIGF1dG9wbGF5SG92ZXJQYXVzZSA9IGZhbHNlO1xyXG4gIGF1dG9wbGF5U3BlZWQgPSBmYWxzZTtcclxuXHJcbiAgLy8gZGVmYXVsdHMgdG8gTGF6eUxvYWRpbmdcclxuICBsYXp5TG9hZCA9IGZhbHNlO1xyXG4gIGxhenlMb2FkRWFnZXIgPSAwO1xyXG5cclxuICAvLyBkZWZhdWx0cyB0byBBbmltYXRlXHJcbiAgYW5pbWF0ZU91dCA9IGZhbHNlO1xyXG4gIGFuaW1hdGVJbiA9IGZhbHNlO1xyXG5cclxuICAvLyBkZWZhdWx0cyB0byBBdXRvSGVpZ2h0XHJcbiAgYXV0b0hlaWdodCA9IGZhbHNlO1xyXG5cclxuICAvLyBkZWZhdWx0cyB0byBIYXNoXHJcbiAgVVJMaGFzaExpc3RlbmVyID0gZmFsc2U7XHJcbiAgY29uc3RydWN0b3IoKSB7IH1cclxufVxyXG5cclxuLyoqXHJcbiAqIHdlIGNhbid0IHJlYWQgdHlwZXMgZnJvbSBPd2xPcHRpb25zIGluIGphdmFzY3JpcHQgYmVjYXVzZSBvZiBwcm9wcyBoYXZlIHVuZGVmaW5lZCB2YWx1ZSBhbmQgdHlwZXMgb2YgdGhvc2UgcHJvcHMgYXJlIHVzZWQgZm9yIHZhbGlkYXRpbmcgaW5wdXRzXHJcbiAqIGNsYXNzIGJlbG93IGlzIGNvcHkgb2YgT3dsT3B0aW9ucyBidXQgaXRzIGFsbCBwcm9wcyBoYXZlIHN0cmluZyB2YWx1ZSBzaG93aW5nIGNlcnRhaW4gdHlwZTtcclxuICogdGhpcyBpcyBjbGFzcyBpcyBiZWluZyB1c2VkIGp1c3QgaW4gbWV0aG9kIF92YWxpZGF0ZU9wdGlvbnMoKSBvZiBDYXJvdXNlbFNlcnZpY2U7XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgT3dsT3B0aW9uc01vY2tlZFR5cGVzIHtcclxuICBpdGVtcyA9ICdudW1iZXInO1xyXG4gIGxvb3AgPSAnYm9vbGVhbic7XHJcbiAgY2VudGVyID0gJ2Jvb2xlYW4nO1xyXG4gIHJld2luZCA9ICdib29sZWFuJztcclxuXHJcbiAgbW91c2VEcmFnID0gJ2Jvb2xlYW4nO1xyXG4gIHRvdWNoRHJhZyA9ICdib29sZWFuJztcclxuICBwdWxsRHJhZyA9ICdib29sZWFuJztcclxuICBmcmVlRHJhZyA9ICdib29sZWFuJztcclxuXHJcbiAgbWFyZ2luID0gJ251bWJlcic7XHJcbiAgc3RhZ2VQYWRkaW5nID0gJ251bWJlcic7XHJcblxyXG4gIG1lcmdlID0gJ2Jvb2xlYW4nO1xyXG4gIG1lcmdlRml0ID0gJ2Jvb2xlYW4nO1xyXG4gIGF1dG9XaWR0aCA9ICdib29sZWFuJztcclxuXHJcbiAgc3RhcnRQb3NpdGlvbiA9ICdudW1iZXJ8c3RyaW5nJztcclxuICBydGwgPSAnYm9vbGVhbic7XHJcblxyXG4gIHNtYXJ0U3BlZWQgPSAnbnVtYmVyJztcclxuICBmbHVpZFNwZWVkID0gJ2Jvb2xlYW4nO1xyXG4gIGRyYWdFbmRTcGVlZCA9ICdudW1iZXJ8Ym9vbGVhbic7XHJcblxyXG4gIHJlc3BvbnNpdmUgPSB7fTtcclxuICByZXNwb25zaXZlUmVmcmVzaFJhdGUgPSAnbnVtYmVyJztcclxuXHJcbiAgLy8gZGVmYXVsdHMgdG8gTmF2aWdhdGlvblxyXG4gIG5hdiA9ICdib29sZWFuJztcclxuICBuYXZUZXh0ID0gJ3N0cmluZ1tdJztcclxuICBuYXZTcGVlZCA9ICdudW1iZXJ8Ym9vbGVhbic7XHJcbiAgc2xpZGVCeSA9ICdudW1iZXJ8c3RyaW5nJzsgLy8gc3RhZ2UgbW92ZXMgb24gMSB3aWR0aCBvZiBzbGlkZTsgaWYgc2xpZGVCeSA9IDIsIHN0YWdlIG1vdmVzIG9uIDIgd2lkdGhzIG9mIHNsaWRlXHJcbiAgZG90cyA9ICdib29sZWFuJztcclxuICBkb3RzRWFjaCA9ICdudW1iZXJ8Ym9vbGVhbic7XHJcbiAgZG90c0RhdGEgPSAnYm9vbGVhbic7XHJcbiAgZG90c1NwZWVkID0gJ251bWJlcnxib29sZWFuJztcclxuXHJcbiAgLy8gZGVmYXVsdHMgdG8gQXV0b3BsYXlcclxuICBhdXRvcGxheSA9ICdib29sZWFuJztcclxuICBhdXRvcGxheVRpbWVvdXQgPSAnbnVtYmVyJztcclxuICBhdXRvcGxheUhvdmVyUGF1c2UgPSAnYm9vbGVhbic7XHJcbiAgYXV0b3BsYXlTcGVlZCA9ICdudW1iZXJ8Ym9vbGVhbic7XHJcblxyXG4gIC8vIGRlZmF1bHRzIHRvIExhenlMb2FkaW5nXHJcbiAgbGF6eUxvYWQgPSAnYm9vbGVhbic7XHJcbiAgbGF6eUxvYWRFYWdlciA9ICdudW1iZXInO1xyXG5cclxuICAvLyBkZWZhdWx0cyB0byBBbmltYXRlXHJcbiAgYW5pbWF0ZU91dCA9ICdzdHJpbmd8Ym9vbGVhbic7XHJcbiAgYW5pbWF0ZUluID0gJ3N0cmluZ3xib29sZWFuJztcclxuXHJcbiAgLy8gZGVmYXVsdHMgdG8gQXV0b0hlaWdodFxyXG4gIGF1dG9IZWlnaHQgPSAnYm9vbGVhbic7XHJcblxyXG4gIC8vIGRlZmF1bHRzIHRvIEhhc2hcclxuICBVUkxoYXNoTGlzdGVuZXIgPSBcImJvb2xlYW5cIjtcclxuICBjb25zdHJ1Y3RvcigpIHsgfVxyXG59IiwiXHJcbmltcG9ydCB7IFN0YWdlRGF0YSB9IGZyb20gJy4uL21vZGVscy9zdGFnZS1kYXRhLm1vZGVsJztcclxuXHJcbmltcG9ydCB7IE93bERPTURhdGEgfSBmcm9tICcuLi9tb2RlbHMvb3dsRE9NLWRhdGEubW9kZWwnO1xyXG5cclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZSB9IGZyb20gJy4uL2Nhcm91c2VsL2Nhcm91c2VsLm1vZHVsZSc7XHJcbmltcG9ydCB7IFNsaWRlTW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvc2xpZGUubW9kZWwnO1xyXG5pbXBvcnQgeyBTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IE93bENhcm91c2VsT0NvbmZpZywgT3dsT3B0aW9uc01vY2tlZFR5cGVzIH0gZnJvbSAnLi4vY2Fyb3VzZWwvb3dsLWNhcm91c2VsLW8tY29uZmlnJztcclxuaW1wb3J0IHsgT3dsT3B0aW9ucyB9IGZyb20gJy4uL21vZGVscy9vd2wtb3B0aW9ucy5tb2RlbCc7XHJcblxyXG5pbXBvcnQgeyBOYXZEYXRhLCBEb3RzRGF0YSB9IGZyb20gJy4uL21vZGVscy9uYXZpZ2F0aW9uLWRhdGEubW9kZWxzJztcclxuXHJcbi8qKlxyXG4gKiBDdXJyZW50IHN0YXRlIGluZm9ybWF0aW9uIGFuZCB0aGVpciB0YWdzLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFN0YXRlcyB7XHJcbiAgY3VycmVudDoge307XHJcbiAgdGFnczoge1xyXG4gICAgW2tleTogc3RyaW5nXTogc3RyaW5nW107XHJcbiAgfTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEVudW1lcmF0aW9uIGZvciB0eXBlcy5cclxuICogQGVudW0ge1N0cmluZ31cclxuICovXHJcbmV4cG9ydCBlbnVtIFR5cGUge1xyXG5cdEV2ZW50ID0gJ2V2ZW50JyxcclxuXHRTdGF0ZSA9ICdzdGF0ZSdcclxufTtcclxuXHJcbi8qKlxyXG4gKiBFbnVtZXJhdGlvbiBmb3Igd2lkdGguXHJcbiAqIEBlbnVtIHtTdHJpbmd9XHJcbiAqL1xyXG5leHBvcnQgZW51bSBXaWR0aCB7XHJcblx0RGVmYXVsdCA9ICdkZWZhdWx0JyxcclxuXHRJbm5lciA9ICdpbm5lcicsXHJcblx0T3V0ZXIgPSAnb3V0ZXInXHJcbn07XHJcblxyXG4vKipcclxuICogTW9kZWwgZm9yIGNvb3JkcyBvZiAub3dsLXN0YWdlXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ29vcmRzIHtcclxuXHR4OiBudW1iZXI7XHJcblx0eTogbnVtYmVyO1xyXG59XHJcblxyXG4vKipcclxuICogTW9kZWwgZm9yIGFsbCBjdXJyZW50IGRhdGEgb2YgY2Fyb3VzZWxcclxuICovXHJcbmV4cG9ydCBjbGFzcyBDYXJvdXNlbEN1cnJlbnREYXRhIHtcclxuXHRvd2xET01EYXRhOiBPd2xET01EYXRhO1xyXG5cdHN0YWdlRGF0YTogU3RhZ2VEYXRhO1xyXG5cdHNsaWRlc0RhdGE6IFNsaWRlTW9kZWxbXTtcclxuXHRuYXZEYXRhOiBOYXZEYXRhO1xyXG5cdGRvdHNEYXRhOiBEb3RzRGF0YTtcclxufVxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQ2Fyb3VzZWxTZXJ2aWNlIHtcclxuXHQvKipcclxuICAgKiBTdWJqZWN0IGZvciBwYXNzaW5nIGRhdGEgbmVlZGVkIGZvciBtYW5hZ2luZyBWaWV3XHJcbiAgICovXHJcblx0cHJpdmF0ZSBfdmlld1NldHRpbmdzU2hpcHBlciQgPSBuZXcgU3ViamVjdDxDYXJvdXNlbEN1cnJlbnREYXRhPigpO1xyXG5cdC8qKlxyXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSBjYXJvdXNlbCBnb3QgaW5pdGlhbGl6ZXNcclxuICAgKi9cclxuXHRwcml2YXRlIF9pbml0aWFsaXplZENhcm91c2VsJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcclxuXHJcblx0LyoqXHJcbiAgICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uIHdoZW4gdGhlIGNhcm91c2VsJ3Mgc2V0dGluZ3Mgc3RhcnQgY2hhbmdpbmZcclxuICAgKi9cclxuXHRwcml2YXRlIF9jaGFuZ2VTZXR0aW5nc0Nhcm91c2VsJCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcclxuXHJcblx0LyoqXHJcbiAgICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uIHdoZW4gdGhlIGNhcm91c2VsJ3Mgc2V0dGluZ3MgaGF2ZSBjaGFuZ2VkXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfY2hhbmdlZFNldHRpbmdzQ2Fyb3VzZWwkID0gbmV3IFN1YmplY3Q8YW55PigpO1xyXG5cdC8qKlxyXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSBjYXJvdXNlbCBzdGFydHMgdHJhbnNsYXRpbmcgb3IgbW92aW5nXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfdHJhbnNsYXRlQ2Fyb3VzZWwkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xyXG5cdC8qKlxyXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSBjYXJvdXNlbCBzdG9wcGVkIHRyYW5zbGF0aW5nIG9yIG1vdmluZ1xyXG4gICAqL1xyXG5cdHByaXZhdGUgX3RyYW5zbGF0ZWRDYXJvdXNlbCQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XHJcblx0LyoqXHJcbiAgICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uIHdoZW4gdGhlIGNhcm91c2VsJ3MgcmVidWlsZGluZyBjYXVzZWQgYnkgJ3Jlc2l6ZScgZXZlbnQgc3RhcnRzXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfcmVzaXplQ2Fyb3VzZWwkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xyXG5cdC8qKlxyXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiAgd2hlbiB0aGUgY2Fyb3VzZWwncyByZWJ1aWxkaW5nIGNhdXNlZCBieSAncmVzaXplJyBldmVudCBpcyBlbmRlZFxyXG4gICAqL1xyXG5cdHByaXZhdGUgX3Jlc2l6ZWRDYXJvdXNlbCQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XHJcblx0LyoqXHJcbiAgICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uIHdoZW4gdGhlIHJlZnJlc2ggb2YgY2Fyb3VzZWwgc3RhcnRzXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfcmVmcmVzaENhcm91c2VsJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcclxuXHQvKipcclxuICAgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gd2hlbiB0aGUgcmVmcmVzaCBvZiBjYXJvdXNlbCBpcyBlbmRlZFxyXG4gICAqL1xyXG5cdHByaXZhdGUgX3JlZnJlc2hlZENhcm91c2VsJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcclxuXHQvKipcclxuICAgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gd2hlbiB0aGUgZHJhZ2dpbmcgb2YgY2Fyb3VzZWwgc3RhcnRzXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfZHJhZ0Nhcm91c2VsJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcclxuXHQvKipcclxuICAgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gd2hlbiB0aGUgZHJhZ2dpbmcgb2YgY2Fyb3VzZWwgaXMgZW5kZWRcclxuICAgKi9cclxuXHRwcml2YXRlIF9kcmFnZ2VkQ2Fyb3VzZWwkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xyXG5cclxuICAvKipcclxuICAgKiBDdXJyZW50IHNldHRpbmdzIGZvciB0aGUgY2Fyb3VzZWwuXHJcbiAgICovXHJcbiAgc2V0dGluZ3M6IE93bE9wdGlvbnMgPSB7XHJcblx0XHRpdGVtczogMFxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG4gICAqIEluaXRpYWwgZGF0YSBmb3Igc2V0dGluZyBjbGFzc2VzIHRvIGVsZW1lbnQgLm93bC1jYXJvdXNlbFxyXG4gICAqL1xyXG5cdG93bERPTURhdGE6IE93bERPTURhdGEgPSB7XHJcblx0XHRydGw6IGZhbHNlLFxyXG5cdFx0aXNSZXNwb25zaXZlOiBmYWxzZSxcclxuXHRcdGlzUmVmcmVzaGVkOiBmYWxzZSxcclxuXHRcdGlzTG9hZGVkOiBmYWxzZSxcclxuXHRcdGlzTG9hZGluZzogZmFsc2UsXHJcblx0XHRpc01vdXNlRHJhZ2FibGU6IGZhbHNlLFxyXG5cdFx0aXNHcmFiOiBmYWxzZSxcclxuXHRcdGlzVG91Y2hEcmFnYWJsZTogZmFsc2VcclxuXHR9O1xyXG5cclxuXHQvKipcclxuICAgKiBJbml0aWFsIGRhdGEgb2YgLm93bC1zdGFnZVxyXG4gICAqL1xyXG5cdHN0YWdlRGF0YTogU3RhZ2VEYXRhID0ge1xyXG5cdFx0dHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoMHB4LDBweCwwcHgpJyxcclxuXHRcdHRyYW5zaXRpb246ICcwcycsXHJcblx0XHR3aWR0aDogMCxcclxuXHRcdHBhZGRpbmdMOiAwLFxyXG5cdFx0cGFkZGluZ1I6IDBcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiAgRGF0YSBvZiBldmVyeSBzbGlkZVxyXG5cdCAqL1xyXG5cdHNsaWRlc0RhdGE6IFNsaWRlTW9kZWxbXTtcclxuXHJcblx0LyoqXHJcblx0ICogRGF0YSBvZiBuYXZpZ2F0aW9uIGJsb2NrXHJcblx0ICovXHJcblx0bmF2RGF0YTogTmF2RGF0YTtcclxuXHJcblx0LyoqXHJcblx0ICogRGF0YSBvZiBkb3RzIGJsb2NrXHJcblx0ICovXHJcblx0ZG90c0RhdGE6IERvdHNEYXRhO1xyXG5cclxuXHQvKipcclxuXHQgKiBDYXJvdXNlbCB3aWR0aFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgX3dpZHRoOiBudW1iZXI7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFsbCByZWFsIGl0ZW1zLlxyXG5cdCAqL1xyXG5cdHByaXZhdGUgX2l0ZW1zOiBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlW10gPSBbXTsgLy8gaXMgZXF1YWwgdG8gdGhpcy5zbGlkZXNcclxuXHJcblx0LyoqXHJcbiAgICogQXJyYXkgd2l0aCB3aWR0aCBvZiBldmVyeSBzbGlkZS5cclxuICAgKi9cclxuICBwcml2YXRlIF93aWR0aHM6IGFueVtdID0gW107XHJcblxyXG5cdC8qKlxyXG4gICAqIEN1cnJlbnRseSBzdXBwcmVzc2VkIGV2ZW50cyB0byBwcmV2ZW50IHRoZW0gZnJvbSBiZWVpbmcgcmV0cmlnZ2VyZWQuXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfc3VwcmVzczogYW55ID0ge307XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlZmVyZW5jZXMgdG8gdGhlIHJ1bm5pbmcgcGx1Z2lucyBvZiB0aGlzIGNhcm91c2VsLlxyXG4gICAqL1xyXG5cdHByaXZhdGUgX3BsdWdpbnM6IGFueSA9IHt9O1xyXG5cclxuXHQvKipcclxuICAgKiBBYnNvbHV0ZSBjdXJyZW50IHBvc2l0aW9uLlxyXG4gICAqL1xyXG5cdHByaXZhdGUgX2N1cnJlbnQ6IG51bWJlciB8IG51bGwgPSBudWxsO1xyXG5cclxuXHQvKipcclxuICAgKiBBbGwgY2xvbmVkIGl0ZW1zLlxyXG4gICAqL1xyXG5cdHByaXZhdGUgX2Nsb25lczogYW55W10gPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogTWVyZ2UgdmFsdWVzIG9mIGFsbCBpdGVtcy5cclxuICAgKiBAdG9kbyBNYXliZSB0aGlzIGNvdWxkIGJlIHBhcnQgb2YgYSBwbHVnaW4uXHJcbiAgICovXHJcblx0cmVhZG9ubHkgX21lcmdlcnM6IGFueVtdID0gW107XHJcblxyXG5cdC8qKlxyXG4gICAqIEFuaW1hdGlvbiBzcGVlZCBpbiBtaWxsaXNlY29uZHMuXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfc3BlZWQ6IG51bWJlciB8IG51bGwgPSBudWxsO1xyXG5cclxuXHQvKipcclxuICAgKiBDb29yZGluYXRlcyBvZiBhbGwgaXRlbXMgaW4gcGl4ZWwuXHJcbiAgICogQHRvZG8gVGhlIG5hbWUgb2YgdGhpcyBtZW1iZXIgaXMgbWlzc2xlYWRpbmcuXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfY29vcmRpbmF0ZXM6IG51bWJlcltdID0gW107XHJcblxyXG5cdC8qKlxyXG4gICAqIEN1cnJlbnQgYnJlYWtwb2ludC5cclxuICAgKiBAdG9kbyBSZWFsIG1lZGlhIHF1ZXJpZXMgd291bGQgYmUgbmljZS5cclxuICAgKi9cclxuXHRwcml2YXRlIF9icmVha3BvaW50OiBhbnkgPSBudWxsO1xyXG5cclxuXHQvKipcclxuXHQgKiBQcmVmaXggZm9yIGlkIG9mIGNsb25lZCBzbGlkZXNcclxuXHQgKi9cclxuXHRjbG9uZWRJZFByZWZpeCA9ICdjbG9uZWQtJztcclxuXHJcblx0LyoqXHJcblx0ICogQ3VycmVudCBvcHRpb25zIHNldCBieSB0aGUgY2FsbGVyIGluY2x1ZGluZyBkZWZhdWx0cy5cclxuXHQgKi9cclxuXHRfb3B0aW9uczogT3dsT3B0aW9ucyA9IHt9O1xyXG5cclxuICAvKipcclxuICAgKiBJbnZhbGlkYXRlZCBwYXJ0cyB3aXRoaW4gdGhlIHVwZGF0ZSBwcm9jZXNzLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2ludmFsaWRhdGVkOiBhbnkgPSB7fTtcclxuXHJcbiAgLy8gSXMgbmVlZGVkIGZvciB0ZXN0c1xyXG4gIGdldCBpbnZhbGlkYXRlZCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9pbnZhbGlkYXRlZDtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogQ3VycmVudCBzdGF0ZSBpbmZvcm1hdGlvbiBhbmQgdGhlaXIgdGFncy5cclxuICAgKi9cclxuICBwcml2YXRlIF9zdGF0ZXM6IFN0YXRlcyA9IHtcclxuICAgIGN1cnJlbnQ6IHt9LFxyXG4gICAgdGFnczoge1xyXG4gICAgICBpbml0aWFsaXppbmc6IFsnYnVzeSddLFxyXG4gICAgICBhbmltYXRpbmc6IFsnYnVzeSddLFxyXG4gICAgICBkcmFnZ2luZzogWydpbnRlcmFjdGluZyddXHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLy8gaXMgbmVlZGVkIGZvciB0ZXN0c1xyXG4gIGdldCBzdGF0ZXMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fc3RhdGVzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcbiBcdCAqIE9yZGVyZWQgbGlzdCBvZiB3b3JrZXJzIGZvciB0aGUgdXBkYXRlIHByb2Nlc3MuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfcGlwZTogYW55W10gPSBbXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgIGZpbHRlcjogWyd3aWR0aCcsICdzZXR0aW5ncyddLFxyXG4gICAgLy8gICBydW46ICgpID0+IHtcclxuICAgIC8vICAgICB0aGlzLl93aWR0aCA9IHRoaXMuY2Fyb3VzZWxXaW5kb3dXaWR0aDtcclxuICAgIC8vICAgfVxyXG4gICAgLy8gfSxcclxuICAgIHtcclxuICAgICAgZmlsdGVyOiBbJ3dpZHRoJywgJ2l0ZW1zJywgJ3NldHRpbmdzJ10sXHJcbiAgICAgIHJ1bjogY2FjaGUgPT4ge1xyXG4gICAgICAgIGNhY2hlLmN1cnJlbnQgPSB0aGlzLl9pdGVtcyAmJiB0aGlzLl9pdGVtc1t0aGlzLnJlbGF0aXZlKHRoaXMuX2N1cnJlbnQpXS5pZDtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vIHtcclxuICAgIC8vICAgZmlsdGVyOiBbJ2l0ZW1zJywgJ3NldHRpbmdzJ10sXHJcbiAgICAvLyAgIHJ1bjogZnVuY3Rpb24oKSB7XHJcbiAgICAvLyAgICAgLy8gdGhpcy4kc3RhZ2UuY2hpbGRyZW4oJy5jbG9uZWQnKS5yZW1vdmUoKTtcclxuICAgIC8vICAgfVxyXG5cdFx0Ly8gfSxcclxuXHRcdCB7XHJcbiAgICAgIGZpbHRlcjogWyAnd2lkdGgnLCAnaXRlbXMnLCAnc2V0dGluZ3MnIF0sXHJcbiAgICAgIHJ1bjogKGNhY2hlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbWFyZ2luID0gdGhpcy5zZXR0aW5ncy5tYXJnaW4gfHwgJycsXHJcbiAgICAgICAgICBncmlkID0gIXRoaXMuc2V0dGluZ3MuYXV0b1dpZHRoLFxyXG4gICAgICAgICAgcnRsID0gdGhpcy5zZXR0aW5ncy5ydGwsXHJcbiAgICAgICAgICBjc3MgPSB7XHJcbiAgICAgICAgICAgICdtYXJnaW4tbGVmdCc6IHJ0bCA/IG1hcmdpbiA6ICcnLFxyXG4gICAgICAgICAgICAnbWFyZ2luLXJpZ2h0JzogcnRsID8gJycgOiBtYXJnaW5cclxuICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmKCFncmlkKSB7XHJcblx0XHRcdFx0XHR0aGlzLnNsaWRlc0RhdGEuZm9yRWFjaChzbGlkZSA9PiB7XHJcblx0XHRcdFx0XHRcdHNsaWRlLm1hcmdpbkwgPSBjc3NbJ21hcmdpbi1sZWZ0J107XHJcblx0XHRcdFx0XHRcdHNsaWRlLm1hcmdpblIgPSBjc3NbJ21hcmdpbi1yaWdodCddO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fVxyXG5cclxuICAgICAgICBjYWNoZS5jc3MgPSBjc3M7XHJcbiAgICAgIH1cclxuICAgIH0sIHtcclxuICAgICAgZmlsdGVyOiBbICd3aWR0aCcsICdpdGVtcycsICdzZXR0aW5ncycgXSxcclxuICAgICAgcnVuOiAoY2FjaGUpID0+IHtcclxuICAgICAgICBjb25zdCB3aWR0aDogYW55ID0gKyh0aGlzLndpZHRoKCkgLyB0aGlzLnNldHRpbmdzLml0ZW1zKS50b0ZpeGVkKDMpIC0gdGhpcy5zZXR0aW5ncy5tYXJnaW4sXHJcbiAgICAgICAgICBncmlkID0gIXRoaXMuc2V0dGluZ3MuYXV0b1dpZHRoLFxyXG4gICAgICAgICAgd2lkdGhzID0gW107XHJcblx0XHRcdFx0bGV0IG1lcmdlID0gbnVsbCxcclxuXHRcdFx0XHRcdFx0aXRlcmF0b3IgPSB0aGlzLl9pdGVtcy5sZW5ndGg7XHJcblxyXG4gICAgICAgIGNhY2hlLml0ZW1zID0ge1xyXG4gICAgICAgICAgbWVyZ2U6IGZhbHNlLFxyXG4gICAgICAgICAgd2lkdGg6IHdpZHRoXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgd2hpbGUgKGl0ZXJhdG9yLS0pIHtcclxuICAgICAgICAgIG1lcmdlID0gdGhpcy5fbWVyZ2Vyc1tpdGVyYXRvcl07XHJcbiAgICAgICAgICBtZXJnZSA9IHRoaXMuc2V0dGluZ3MubWVyZ2VGaXQgJiYgTWF0aC5taW4obWVyZ2UsIHRoaXMuc2V0dGluZ3MuaXRlbXMpIHx8IG1lcmdlO1xyXG4gICAgICAgICAgY2FjaGUuaXRlbXMubWVyZ2UgPSBtZXJnZSA+IDEgfHwgY2FjaGUuaXRlbXMubWVyZ2U7XHJcblxyXG4gICAgICAgICAgd2lkdGhzW2l0ZXJhdG9yXSA9ICFncmlkID8gdGhpcy5faXRlbXNbaXRlcmF0b3JdLndpZHRoID8gdGhpcy5faXRlbXNbaXRlcmF0b3JdLndpZHRoIDogd2lkdGggOiB3aWR0aCAqIG1lcmdlO1xyXG4gICAgICAgIH1cclxuXHJcblx0XHRcdFx0dGhpcy5fd2lkdGhzID0gd2lkdGhzO1xyXG5cclxuXHRcdFx0XHR0aGlzLnNsaWRlc0RhdGEuZm9yRWFjaCgoc2xpZGUsIGkpID0+IHtcclxuXHRcdFx0XHRcdHNsaWRlLndpZHRoID0gdGhpcy5fd2lkdGhzW2ldO1xyXG5cdFx0XHRcdFx0c2xpZGUubWFyZ2luUiA9IGNhY2hlLmNzc1snbWFyZ2luLXJpZ2h0J107XHJcblx0XHRcdFx0XHRzbGlkZS5tYXJnaW5MID0gY2FjaGUuY3NzWydtYXJnaW4tbGVmdCddO1xyXG5cdFx0XHRcdH0pO1xyXG4gICAgICB9XHJcbiAgICB9LCB7XHJcbiAgICAgIGZpbHRlcjogWyAnaXRlbXMnLCAnc2V0dGluZ3MnIF0sXHJcbiAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNsb25lczogYW55W10gPSBbXSxcclxuICAgICAgICAgIGl0ZW1zOiBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlW10gPSB0aGlzLl9pdGVtcyxcclxuICAgICAgICAgIHNldHRpbmdzOiBhbnkgPSB0aGlzLnNldHRpbmdzLFxyXG4gICAgICAgICAgLy8gVE9ETzogU2hvdWxkIGJlIGNvbXB1dGVkIGZyb20gbnVtYmVyIG9mIG1pbiB3aWR0aCBpdGVtcyBpbiBzdGFnZVxyXG4gICAgICAgICAgdmlldyA9IE1hdGgubWF4KHNldHRpbmdzLml0ZW1zICogMiwgNCksXHJcbiAgICAgICAgICBzaXplID0gTWF0aC5jZWlsKGl0ZW1zLmxlbmd0aCAvIDIpICogMjtcclxuXHRcdFx0XHRsZXQgIGFwcGVuZDogYW55W10gPSBbXSxcclxuICAgICAgICAgIHByZXBlbmQ6IGFueVtdID0gW10sXHJcblx0XHRcdFx0XHRyZXBlYXQgPSBzZXR0aW5ncy5sb29wICYmIGl0ZW1zLmxlbmd0aCA/IHNldHRpbmdzLnJld2luZCA/IHZpZXcgOiBNYXRoLm1heCh2aWV3LCBzaXplKSA6IDA7XHJcblxyXG4gICAgICAgIHJlcGVhdCAvPSAyO1xyXG5cclxuICAgICAgICB3aGlsZSAocmVwZWF0LS0pIHtcclxuICAgICAgICAgIC8vIFN3aXRjaCB0byBvbmx5IHVzaW5nIGFwcGVuZGVkIGNsb25lc1xyXG4gICAgICAgICAgY2xvbmVzLnB1c2godGhpcy5ub3JtYWxpemUoY2xvbmVzLmxlbmd0aCAvIDIsIHRydWUpKTtcclxuICAgICAgICAgIGFwcGVuZC5wdXNoKHsgLi4udGhpcy5zbGlkZXNEYXRhW2Nsb25lc1tjbG9uZXMubGVuZ3RoIC0gMV1dfSk7XHJcblx0XHRcdFx0XHRjbG9uZXMucHVzaCh0aGlzLm5vcm1hbGl6ZShpdGVtcy5sZW5ndGggLSAxIC0gKGNsb25lcy5sZW5ndGggLSAxKSAvIDIsIHRydWUpKTtcclxuXHRcdFx0XHRcdHByZXBlbmQudW5zaGlmdCh7IC4uLnRoaXMuc2xpZGVzRGF0YVtjbG9uZXNbY2xvbmVzLmxlbmd0aCAtIDFdXX0pO1xyXG4gICAgICAgIH1cclxuXHJcblx0XHRcdFx0dGhpcy5fY2xvbmVzID0gY2xvbmVzO1xyXG5cclxuXHRcdFx0XHRhcHBlbmQgPSBhcHBlbmQubWFwKHNsaWRlID0+IHtcclxuXHRcdFx0XHRcdHNsaWRlLmlkID0gYCR7dGhpcy5jbG9uZWRJZFByZWZpeH0ke3NsaWRlLmlkfWA7XHJcblx0XHRcdFx0XHRzbGlkZS5pc0FjdGl2ZSA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0c2xpZGUuaXNDbG9uZWQgPSB0cnVlO1xyXG5cdFx0XHRcdFx0cmV0dXJuIHNsaWRlO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRwcmVwZW5kID0gcHJlcGVuZC5tYXAoc2xpZGUgPT4ge1xyXG5cdFx0XHRcdFx0c2xpZGUuaWQgPSBgJHt0aGlzLmNsb25lZElkUHJlZml4fSR7c2xpZGUuaWR9YDtcclxuXHRcdFx0XHRcdHNsaWRlLmlzQWN0aXZlID0gZmFsc2U7XHJcblx0XHRcdFx0XHRzbGlkZS5pc0Nsb25lZCA9IHRydWU7XHJcblx0XHRcdFx0XHRyZXR1cm4gc2xpZGU7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdHRoaXMuc2xpZGVzRGF0YSA9IHByZXBlbmQuY29uY2F0KHRoaXMuc2xpZGVzRGF0YSkuY29uY2F0KGFwcGVuZCk7XHJcbiAgICAgIH1cclxuICAgIH0sIHtcclxuICAgICAgZmlsdGVyOiBbICd3aWR0aCcsICdpdGVtcycsICdzZXR0aW5ncycgXSxcclxuICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcnRsID0gdGhpcy5zZXR0aW5ncy5ydGwgPyAxIDogLTEsXHJcbiAgICAgICAgICBzaXplID0gdGhpcy5fY2xvbmVzLmxlbmd0aCArIHRoaXMuX2l0ZW1zLmxlbmd0aCxcclxuICAgICAgICAgIGNvb3JkaW5hdGVzID0gW107XHJcbiAgICAgICAgbGV0IGl0ZXJhdG9yID0gLTEsXHJcbiAgICAgICAgICBwcmV2aW91cyA9IDAsXHJcbiAgICAgICAgICBjdXJyZW50ID0gMDtcclxuXHJcbiAgICAgICAgd2hpbGUgKCsraXRlcmF0b3IgPCBzaXplKSB7XHJcbiAgICAgICAgICBwcmV2aW91cyA9IGNvb3JkaW5hdGVzW2l0ZXJhdG9yIC0gMV0gfHwgMDtcclxuICAgICAgICAgIGN1cnJlbnQgPSB0aGlzLl93aWR0aHNbdGhpcy5yZWxhdGl2ZShpdGVyYXRvcildICsgdGhpcy5zZXR0aW5ncy5tYXJnaW47XHJcbiAgICAgICAgICBjb29yZGluYXRlcy5wdXNoKHByZXZpb3VzICsgY3VycmVudCAqIHJ0bCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9jb29yZGluYXRlcyA9IGNvb3JkaW5hdGVzO1xyXG4gICAgICB9XHJcbiAgICB9LCB7XHJcbiAgICAgIGZpbHRlcjogWyAnd2lkdGgnLCAnaXRlbXMnLCAnc2V0dGluZ3MnIF0sXHJcbiAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHBhZGRpbmcgPSB0aGlzLnNldHRpbmdzLnN0YWdlUGFkZGluZyxcclxuICAgICAgICAgIGNvb3JkaW5hdGVzID0gdGhpcy5fY29vcmRpbmF0ZXMsXHJcbiAgICAgICAgICBjc3MgPSB7XHJcbiAgICAgICAgICAgICd3aWR0aCc6IE1hdGguY2VpbChNYXRoLmFicyhjb29yZGluYXRlc1tjb29yZGluYXRlcy5sZW5ndGggLSAxXSkpICsgcGFkZGluZyAqIDIsXHJcbiAgICAgICAgICAgICdwYWRkaW5nLWxlZnQnOiBwYWRkaW5nIHx8ICcnLFxyXG4gICAgICAgICAgICAncGFkZGluZy1yaWdodCc6IHBhZGRpbmcgfHwgJydcclxuXHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdHRoaXMuc3RhZ2VEYXRhLndpZHRoID0gY3NzLndpZHRoOyAvLyB1c2UgdGhpcyBwcm9wZXJ0eSBpbiAqbmdJZiBkaXJlY3RpdmUgZm9yIC5vd2wtc3RhZ2UgZWxlbWVudFxyXG5cdFx0XHRcdHRoaXMuc3RhZ2VEYXRhLnBhZGRpbmdMID0gY3NzWydwYWRkaW5nLWxlZnQnXTtcclxuXHRcdFx0XHR0aGlzLnN0YWdlRGF0YS5wYWRkaW5nUiA9IGNzc1sncGFkZGluZy1yaWdodCddO1xyXG4gICAgICB9XHJcbiAgICB9LCB7XHJcbiAgICAvLyAgIGZpbHRlcjogWyAnd2lkdGgnLCAnaXRlbXMnLCAnc2V0dGluZ3MnIF0sXHJcbiAgICAvLyAgIHJ1bjogY2FjaGUgPT4ge1xyXG5cdFx0Ly8gXHRcdC8vIHRoaXMgbWV0aG9kIHNldHMgdGhlIHdpZHRoIGZvciBldmVyeSBzbGlkZSwgYnV0IEkgc2V0IGl0IGluIGRpZmZlcmVudCB3YXkgZWFybGllclxyXG5cdFx0Ly8gXHRcdGNvbnN0IGdyaWQgPSAhdGhpcy5zZXR0aW5ncy5hdXRvV2lkdGgsXHJcblx0XHQvLyBcdFx0aXRlbXMgPSB0aGlzLiRzdGFnZS5jaGlsZHJlbigpOyAvLyB1c2UgdGhpcy5zbGlkZXNEYXRhXHJcbiAgICAvLyAgICAgbGV0IGl0ZXJhdG9yID0gdGhpcy5fY29vcmRpbmF0ZXMubGVuZ3RoO1xyXG5cclxuICAgIC8vICAgICBpZiAoZ3JpZCAmJiBjYWNoZS5pdGVtcy5tZXJnZSkge1xyXG4gICAgLy8gICAgICAgd2hpbGUgKGl0ZXJhdG9yLS0pIHtcclxuICAgIC8vICAgICAgICAgY2FjaGUuY3NzLndpZHRoID0gdGhpcy5fd2lkdGhzW3RoaXMucmVsYXRpdmUoaXRlcmF0b3IpXTtcclxuICAgIC8vICAgICAgICAgaXRlbXMuZXEoaXRlcmF0b3IpLmNzcyhjYWNoZS5jc3MpO1xyXG4gICAgLy8gICAgICAgfVxyXG4gICAgLy8gICAgIH0gZWxzZSBpZiAoZ3JpZCkge1xyXG4gICAgLy8gICAgICAgY2FjaGUuY3NzLndpZHRoID0gY2FjaGUuaXRlbXMud2lkdGg7XHJcbiAgICAvLyAgICAgICBpdGVtcy5jc3MoY2FjaGUuY3NzKTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgIH1cclxuICAgIC8vIH0sIHtcclxuICAgIC8vICAgZmlsdGVyOiBbICdpdGVtcycgXSxcclxuICAgIC8vICAgcnVuOiBmdW5jdGlvbigpIHtcclxuICAgIC8vICAgICB0aGlzLl9jb29yZGluYXRlcy5sZW5ndGggPCAxICYmIHRoaXMuJHN0YWdlLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAvLyAgIH1cclxuICAgIC8vIH0sIHtcclxuICAgICAgZmlsdGVyOiBbICd3aWR0aCcsICdpdGVtcycsICdzZXR0aW5ncycgXSxcclxuICAgICAgcnVuOiBjYWNoZSA9PiB7XHJcbiAgICAgICAgbGV0IGN1cnJlbnQgPSBjYWNoZS5jdXJyZW50ID8gdGhpcy5zbGlkZXNEYXRhLmZpbmRJbmRleChzbGlkZSA9PiBzbGlkZS5pZCA9PT0gY2FjaGUuY3VycmVudCkgOiAwO1xyXG4gICAgICAgXHRjdXJyZW50ID0gTWF0aC5tYXgodGhpcy5taW5pbXVtKCksIE1hdGgubWluKHRoaXMubWF4aW11bSgpLCBjdXJyZW50KSk7XHJcbiAgICAgICAgdGhpcy5yZXNldChjdXJyZW50KTtcclxuICAgICAgfVxyXG4gICAgfSwge1xyXG4gICAgICBmaWx0ZXI6IFsgJ3Bvc2l0aW9uJyBdLFxyXG4gICAgICBydW46ICgpID0+IHtcclxuICAgICAgICB0aGlzLmFuaW1hdGUodGhpcy5jb29yZGluYXRlcyh0aGlzLl9jdXJyZW50KSk7XHJcbiAgICAgIH1cclxuICAgIH0sIHtcclxuICAgICAgZmlsdGVyOiBbICd3aWR0aCcsICdwb3NpdGlvbicsICdpdGVtcycsICdzZXR0aW5ncycgXSxcclxuICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcnRsID0gdGhpcy5zZXR0aW5ncy5ydGwgPyAxIDogLTEsXHJcblx0XHRcdFx0XHRwYWRkaW5nID0gdGhpcy5zZXR0aW5ncy5zdGFnZVBhZGRpbmcgKiAyLFxyXG5cdFx0XHRcdFx0bWF0Y2hlcyA9IFtdO1xyXG5cdFx0XHRcdGxldCBiZWdpbiwgZW5kLCBpbm5lciwgb3V0ZXIsIGksIG47XHJcblxyXG5cdFx0XHRcdGJlZ2luID0gdGhpcy5jb29yZGluYXRlcyh0aGlzLmN1cnJlbnQoKSk7XHJcblx0XHRcdFx0aWYgKHR5cGVvZiBiZWdpbiA9PT0gJ251bWJlcicgKSB7XHJcblx0XHRcdFx0XHRiZWdpbiArPSBwYWRkaW5nO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRiZWdpbiA9IDA7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRlbmQgPSBiZWdpbiArIHRoaXMud2lkdGgoKSAqIHJ0bDtcclxuXHJcblx0XHRcdFx0aWYgKHJ0bCA9PT0gLTEgJiYgdGhpcy5zZXR0aW5ncy5jZW50ZXIpIHtcclxuXHRcdFx0XHRcdGNvbnN0IHJlc3VsdCA9XHR0aGlzLl9jb29yZGluYXRlcy5maWx0ZXIoZWxlbWVudCA9PiB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLnNldHRpbmdzLml0ZW1zICUgMiA9PT0gMSA/IGVsZW1lbnQgPj0gYmVnaW4gOiBlbGVtZW50ID4gYmVnaW47XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdGJlZ2luID0gcmVzdWx0Lmxlbmd0aCA/IHJlc3VsdFtyZXN1bHQubGVuZ3RoIC0gMV0gOiBiZWdpbjtcclxuXHRcdFx0XHR9XHJcblxyXG4gICAgICAgIGZvciAoaSA9IDAsIG4gPSB0aGlzLl9jb29yZGluYXRlcy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgIGlubmVyID0gTWF0aC5jZWlsKHRoaXMuX2Nvb3JkaW5hdGVzW2kgLSAxXSB8fCAwKTtcclxuXHRcdFx0XHRcdG91dGVyID0gTWF0aC5jZWlsKE1hdGguYWJzKHRoaXMuX2Nvb3JkaW5hdGVzW2ldKSArIHBhZGRpbmcgKiBydGwpO1xyXG5cclxuICAgICAgICAgIGlmICgodGhpcy5fb3AoaW5uZXIsICc8PScsIGJlZ2luKSAmJiAodGhpcy5fb3AoaW5uZXIsICc+JywgZW5kKSkpXHJcbiAgICAgICAgICAgIHx8ICh0aGlzLl9vcChvdXRlciwgJzwnLCBiZWdpbikgJiYgdGhpcy5fb3Aob3V0ZXIsICc+JywgZW5kKSkpIHtcclxuICAgICAgICAgICAgbWF0Y2hlcy5wdXNoKGkpO1xyXG4gICAgICAgICAgfVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dGhpcy5zbGlkZXNEYXRhLmZvckVhY2goc2xpZGUgPT4ge1xyXG5cdFx0XHRcdFx0c2xpZGUuaXNBY3RpdmUgPSBmYWxzZTtcclxuXHRcdFx0XHRcdHJldHVybiBzbGlkZTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRtYXRjaGVzLmZvckVhY2goaXRlbSA9PiB7XHJcblx0XHRcdFx0XHR0aGlzLnNsaWRlc0RhdGFbaXRlbV0uaXNBY3RpdmUgPSB0cnVlO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5jZW50ZXIpIHtcclxuXHRcdFx0XHRcdHRoaXMuc2xpZGVzRGF0YS5mb3JFYWNoKHNsaWRlID0+IHtcclxuXHRcdFx0XHRcdFx0c2xpZGUuaXNDZW50ZXJlZCA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gc2xpZGU7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdHRoaXMuc2xpZGVzRGF0YVt0aGlzLmN1cnJlbnQoKV0uaXNDZW50ZXJlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgXTtcclxuXHJcblx0Y29uc3RydWN0b3IoKSB7IH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgX3ZpZXdTZXR0aW5nc1NoaXBwZXIkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcclxuXHQgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIF92aWV3U2V0dGluZ3NTaGlwcGVyJCBTdWJqZWN0XHJcblx0ICovXHJcblx0Z2V0Vmlld0N1clNldHRpbmdzKCk6IE9ic2VydmFibGU8Q2Fyb3VzZWxDdXJyZW50RGF0YT4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3ZpZXdTZXR0aW5nc1NoaXBwZXIkLmFzT2JzZXJ2YWJsZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgX2luaXRpYWxpemVkQ2Fyb3VzZWwkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcclxuXHQgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIF9pbml0aWFsaXplZENhcm91c2VsJCBTdWJqZWN0XHJcblx0ICovXHJcblx0Z2V0SW5pdGlhbGl6ZWRTdGF0ZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2luaXRpYWxpemVkQ2Fyb3VzZWwkLmFzT2JzZXJ2YWJsZSgpXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBfY2hhbmdlU2V0dGluZ3NDYXJvdXNlbCQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxyXG5cdCAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX2NoYW5nZVNldHRpbmdzQ2Fyb3VzZWwkIFN1YmplY3RcclxuXHQgKi9cclxuXHRnZXRDaGFuZ2VTdGF0ZSgpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2NoYW5nZVNldHRpbmdzQ2Fyb3VzZWwkLmFzT2JzZXJ2YWJsZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgX2NoYW5nZWRTZXR0aW5nc0Nhcm91c2VsJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXHJcblx0ICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfY2hhbmdlZFNldHRpbmdzQ2Fyb3VzZWwkIFN1YmplY3RcclxuXHQgKi9cclxuXHRnZXRDaGFuZ2VkU3RhdGUoKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuXHRcdHJldHVybiB0aGlzLl9jaGFuZ2VkU2V0dGluZ3NDYXJvdXNlbCQuYXNPYnNlcnZhYmxlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBfdHJhbnNsYXRlQ2Fyb3VzZWwkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcclxuXHQgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIF90cmFuc2xhdGVDYXJvdXNlbCQgU3ViamVjdFxyXG5cdCAqL1xyXG5cdGdldFRyYW5zbGF0ZVN0YXRlKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XHJcblx0XHRyZXR1cm4gdGhpcy5fdHJhbnNsYXRlQ2Fyb3VzZWwkLmFzT2JzZXJ2YWJsZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgX3RyYW5zbGF0ZWRDYXJvdXNlbCQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxyXG5cdCAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX3RyYW5zbGF0ZWRDYXJvdXNlbCQgU3ViamVjdFxyXG5cdCAqL1xyXG5cdGdldFRyYW5zbGF0ZWRTdGF0ZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3RyYW5zbGF0ZWRDYXJvdXNlbCQuYXNPYnNlcnZhYmxlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBfcmVzaXplQ2Fyb3VzZWwkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcclxuXHQgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIF9yZXNpemVDYXJvdXNlbCQgU3ViamVjdFxyXG5cdCAqL1xyXG5cdGdldFJlc2l6ZVN0YXRlKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XHJcblx0XHRyZXR1cm4gdGhpcy5fcmVzaXplQ2Fyb3VzZWwkLmFzT2JzZXJ2YWJsZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgX3Jlc2l6ZWRDYXJvdXNlbCQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxyXG5cdCAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX3Jlc2l6ZWRDYXJvdXNlbCQgU3ViamVjdFxyXG5cdCAqL1xyXG5cdGdldFJlc2l6ZWRTdGF0ZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3Jlc2l6ZWRDYXJvdXNlbCQuYXNPYnNlcnZhYmxlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBfcmVmcmVzaENhcm91c2VsJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXHJcblx0ICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfcmVmcmVzaENhcm91c2VsJCBTdWJqZWN0XHJcblx0ICovXHJcblx0Z2V0UmVmcmVzaFN0YXRlKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XHJcblx0XHRyZXR1cm4gdGhpcy5fcmVmcmVzaENhcm91c2VsJC5hc09ic2VydmFibGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIF9yZWZyZXNoZWRDYXJvdXNlbCQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxyXG5cdCAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX3JlZnJlc2hlZENhcm91c2VsJCBTdWJqZWN0XHJcblx0ICovXHJcblx0Z2V0UmVmcmVzaGVkU3RhdGUoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcclxuXHRcdHJldHVybiB0aGlzLl9yZWZyZXNoZWRDYXJvdXNlbCQuYXNPYnNlcnZhYmxlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBfZHJhZ0Nhcm91c2VsJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXHJcblx0ICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfZHJhZ0Nhcm91c2VsJCBTdWJqZWN0XHJcblx0ICovXHJcblx0Z2V0RHJhZ1N0YXRlKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XHJcblx0XHRyZXR1cm4gdGhpcy5fZHJhZ0Nhcm91c2VsJC5hc09ic2VydmFibGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIF9kcmFnZ2VkQ2Fyb3VzZWwkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcclxuXHQgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIF9kcmFnZ2VkQ2Fyb3VzZWwkIFN1YmplY3RcclxuXHQgKi9cclxuXHRnZXREcmFnZ2VkU3RhdGUoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcclxuXHRcdHJldHVybiB0aGlzLl9kcmFnZ2VkQ2Fyb3VzZWwkLmFzT2JzZXJ2YWJsZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0dXBzIGN1c3RvbSBvcHRpb25zIGV4cGFuZGluZyBkZWZhdWx0IG9wdGlvbnNcclxuXHQgKiBAcGFyYW0gb3B0aW9ucyBjdXN0b20gb3B0aW9uc1xyXG5cdCAqL1xyXG5cdHNldE9wdGlvbnMob3B0aW9uczogT3dsT3B0aW9ucykge1xyXG5cdFx0Y29uc3QgY29uZmlnT3B0aW9uczogT3dsT3B0aW9ucyA9IG5ldyBPd2xDYXJvdXNlbE9Db25maWcoKTtcclxuXHRcdGNvbnN0IGNoZWNrZWRPcHRpb25zOiBPd2xPcHRpb25zID0gdGhpcy5fdmFsaWRhdGVPcHRpb25zKG9wdGlvbnMsIGNvbmZpZ09wdGlvbnMpO1xyXG5cdFx0dGhpcy5fb3B0aW9ucyA9IHsgLi4uY29uZmlnT3B0aW9ucywgLi4uY2hlY2tlZE9wdGlvbnN9O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIHdoZXRoZXIgdXNlcidzIG9wdGlvbiBhcmUgc2V0IHByb3Blcmx5LiBDaGVraW5nIGlzIGJhc2VkIG9uIHR5cGluZ3M7XHJcblx0ICogQHBhcmFtIG9wdGlvbnMgb3B0aW9ucyBzZXQgYnkgdXNlclxyXG5cdCAqIEBwYXJhbSBjb25maWdPcHRpb25zIGRlZmF1bHQgb3B0aW9uc1xyXG5cdCAqIEByZXR1cm5zIGNoZWNrZWQgYW5kIG1vZGlmaWVkIChpZiBpdCdzIG5lZWRlZCkgdXNlcidzIG9wdGlvbnNcclxuXHQgKlxyXG5cdCAqIE5vdGVzOlxyXG5cdCAqIFx0LSBpZiB1c2VyIHNldCBvcHRpb24gd2l0aCB3cm9uZyB0eXBlLCBpdCdsbCBiZSB3cml0dGVuIGluIGNvbnNvbGVcclxuXHQgKi9cclxuXHRwcml2YXRlIF92YWxpZGF0ZU9wdGlvbnMob3B0aW9uczogT3dsT3B0aW9ucywgY29uZmlnT3B0aW9uczogT3dsT3B0aW9ucyk6IE93bE9wdGlvbnMge1xyXG5cdFx0Y29uc3QgY2hlY2tlZE9wdGlvbnM6IE93bE9wdGlvbnMgPSB7IC4uLm9wdGlvbnN9O1xyXG5cdFx0Y29uc3QgbW9ja2VkVHlwZXMgPSBuZXcgT3dsT3B0aW9uc01vY2tlZFR5cGVzKCk7XHJcblxyXG5cdFx0Zm9yIChjb25zdCBrZXkgaW4gY2hlY2tlZE9wdGlvbnMpIHtcclxuXHRcdFx0aWYgKGNoZWNrZWRPcHRpb25zLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuXHJcblx0XHRcdFx0Ly8gY29uZGl0aW9uIGNvdWxkIGJlIHNob3J0ZW5lZCBidXQgaXQgZ2V0cyBoYXJkZXIgZm9yIHVuZGVyc3RhbmRpbmdcclxuXHRcdFx0XHRpZiAobW9ja2VkVHlwZXNba2V5XSA9PT0gJ251bWJlcicpIHtcclxuXHRcdFx0XHRcdGlmICh0aGlzLl9pc051bWVyaWMoY2hlY2tlZE9wdGlvbnNba2V5XSkpIHtcclxuXHRcdFx0XHRcdFx0Y2hlY2tlZE9wdGlvbnNba2V5XSA9ICtjaGVja2VkT3B0aW9uc1trZXldO1xyXG5cdFx0XHRcdFx0XHRjaGVja2VkT3B0aW9uc1trZXldID0ga2V5ID09PSAnaXRlbXMnID8gdGhpcy5fdmFsaWRhdGVJdGVtcyhjaGVja2VkT3B0aW9uc1trZXldKSA6IGNoZWNrZWRPcHRpb25zW2tleV07XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRjaGVja2VkT3B0aW9uc1trZXldID0gc2V0UmlnaHRPcHRpb24obW9ja2VkVHlwZXNba2V5XSwga2V5KTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9IGVsc2UgaWYgKG1vY2tlZFR5cGVzW2tleV0gPT09ICdib29sZWFuJyAmJiB0eXBlb2YgY2hlY2tlZE9wdGlvbnNba2V5XSAhPT0gJ2Jvb2xlYW4nKSB7XHJcblx0XHRcdFx0XHRjaGVja2VkT3B0aW9uc1trZXldID0gc2V0UmlnaHRPcHRpb24obW9ja2VkVHlwZXNba2V5XSwga2V5KTtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKG1vY2tlZFR5cGVzW2tleV0gPT09ICdudW1iZXJ8Ym9vbGVhbicgJiYgIXRoaXMuX2lzTnVtYmVyT3JCb29sZWFuKGNoZWNrZWRPcHRpb25zW2tleV0pKSB7XHJcblx0XHRcdFx0XHRjaGVja2VkT3B0aW9uc1trZXldID0gc2V0UmlnaHRPcHRpb24obW9ja2VkVHlwZXNba2V5XSwga2V5KTtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKG1vY2tlZFR5cGVzW2tleV0gPT09ICdudW1iZXJ8c3RyaW5nJyAmJiAhdGhpcy5faXNOdW1iZXJPclN0cmluZyhjaGVja2VkT3B0aW9uc1trZXldKSkge1xyXG5cdFx0XHRcdFx0Y2hlY2tlZE9wdGlvbnNba2V5XSA9IHNldFJpZ2h0T3B0aW9uKG1vY2tlZFR5cGVzW2tleV0sIGtleSk7XHJcblx0XHRcdFx0fSBlbHNlIGlmIChtb2NrZWRUeXBlc1trZXldID09PSAnc3RyaW5nfGJvb2xlYW4nICYmICF0aGlzLl9pc1N0cmluZ09yQm9vbGVhbihjaGVja2VkT3B0aW9uc1trZXldKSkge1xyXG5cdFx0XHRcdFx0Y2hlY2tlZE9wdGlvbnNba2V5XSA9IHNldFJpZ2h0T3B0aW9uKG1vY2tlZFR5cGVzW2tleV0sIGtleSk7XHJcblx0XHRcdFx0fSBlbHNlIGlmIChtb2NrZWRUeXBlc1trZXldID09PSAnc3RyaW5nW10nKSB7XHJcblx0XHRcdFx0XHRpZiAoQXJyYXkuaXNBcnJheShjaGVja2VkT3B0aW9uc1trZXldKSkge1xyXG5cdFx0XHRcdFx0XHRsZXQgaXNTdHJpbmcgPSBmYWxzZTtcclxuXHRcdFx0XHRcdFx0Y2hlY2tlZE9wdGlvbnNba2V5XS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdGlzU3RyaW5nID0gdHlwZW9mIGVsZW1lbnQgPT09ICdzdHJpbmcnID8gdHJ1ZSA6IGZhbHNlO1xyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0aWYgKCFpc1N0cmluZykgeyBjaGVja2VkT3B0aW9uc1trZXldID0gc2V0UmlnaHRPcHRpb24obW9ja2VkVHlwZXNba2V5XSwga2V5KSB9O1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0Y2hlY2tlZE9wdGlvbnNba2V5XSA9IHNldFJpZ2h0T3B0aW9uKG1vY2tlZFR5cGVzW2tleV0sIGtleSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gc2V0UmlnaHRPcHRpb24odHlwZTogc3RyaW5nLCBrZXk6IGFueSk6IGFueSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKGBvcHRpb25zLiR7a2V5fSBtdXN0IGJlIHR5cGUgb2YgJHt0eXBlfTsgJHtrZXl9PSR7b3B0aW9uc1trZXldfSBza2lwcGVkIHRvIGRlZmF1bHRzOiAke2tleX09JHtjb25maWdPcHRpb25zW2tleV19YCk7XHJcblx0XHRcdHJldHVybiBjb25maWdPcHRpb25zW2tleV07XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGNoZWNrZWRPcHRpb25zO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIG9wdGlvbiBpdGVtcyBzZXQgYnkgdXNlciBhbmQgaWYgaXQgYmlnZ2VyIHRoYW4gbnVtYmVyIG9mIHNsaWRlcyB0aGVuIHJldHVybnMgbnVtYmVyIG9mIHNsaWRlc1xyXG5cdCAqIEBwYXJhbSBpdGVtcyBvcHRpb24gaXRlbXMgc2V0IGJ5IHVzZXJcclxuXHQgKiBAcmV0dXJucyByaWdodCBudW1iZXIgb2YgaXRlbXNcclxuXHQgKi9cclxuXHRwcml2YXRlIF92YWxpZGF0ZUl0ZW1zKGl0ZW1zOiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0bGV0IHJlc3VsdDogbnVtYmVyO1xyXG5cdFx0aWYgKGl0ZW1zID49IHRoaXMuX2l0ZW1zLmxlbmd0aCkge1xyXG5cdFx0XHRyZXN1bHQgPSB0aGlzLl9pdGVtcy5sZW5ndGggO1xyXG5cdFx0XHRjb25zb2xlLmxvZygnb3B0aW9uIFxcJ2l0ZW1zXFwnIGluIHlvdXIgb3B0aW9ucyBpcyBiaWdnZXIgdGhhbiBudW1iZXIgb2Ygc2xpZGVzOyBUaGlzIG9wdGlvbiBpcyB1cGRhdGVkIHRvIGN1cnJlbnQgbnVtYmVyIG9mIHNsaWRlcyBhbmQgbmF2aWdhdGlvbiBnb3QgZGlzYWJsZWQnKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJlc3VsdCA9IGl0ZW1zO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldCBjdXJyZW50IHdpZHRoIG9mIGNhcm91c2VsXHJcblx0ICogQHBhcmFtIHdpZHRoIHdpZHRoIG9mIGNhcm91c2VsIFdpbmRvd1xyXG5cdCAqL1xyXG5cdHNldENhcm91c2VsV2lkdGgod2lkdGg6IG51bWJlcikge1xyXG5cdFx0dGhpcy5fd2lkdGggPSB3aWR0aDtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIFNldHVwcyB0aGUgY3VycmVudCBzZXR0aW5ncy5cclxuXHQgKiBAdG9kbyBSZW1vdmUgcmVzcG9uc2l2ZSBjbGFzc2VzLiBXaHkgc2hvdWxkIGFkYXB0aXZlIGRlc2lnbnMgYmUgYnJvdWdodCBpbnRvIElFOD9cclxuXHQgKiBAdG9kbyBTdXBwb3J0IGZvciBtZWRpYSBxdWVyaWVzIGJ5IHVzaW5nIGBtYXRjaE1lZGlhYCB3b3VsZCBiZSBuaWNlLlxyXG5cdCAqIEBwYXJhbSBjYXJvdXNlbFdpZHRoIHdpZHRoIG9mIGNhcm91c2VsXHJcblx0ICogQHBhcmFtIHNsaWRlcyBhcnJheSBvZiBzbGlkZXNcclxuXHQgKiBAcGFyYW0gb3B0aW9ucyBvcHRpb25zIHNldCBieSB1c2VyXHJcblx0ICovXHJcbiAgc2V0dXAoY2Fyb3VzZWxXaWR0aDogbnVtYmVyLCBzbGlkZXM6IENhcm91c2VsU2xpZGVEaXJlY3RpdmVbXSwgb3B0aW9uczogT3dsT3B0aW9ucykge1xyXG5cdFx0dGhpcy5zZXRDYXJvdXNlbFdpZHRoKGNhcm91c2VsV2lkdGgpO1xyXG5cdFx0dGhpcy5zZXRJdGVtcyhzbGlkZXMpO1xyXG5cdFx0dGhpcy5fZGVmaW5lU2xpZGVzRGF0YSgpO1xyXG5cdFx0dGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSB7IC4uLnRoaXMuX29wdGlvbnN9O1xyXG5cclxuXHRcdHRoaXMuc2V0Vmlld3BvcnRJdGVtc04oKTtcclxuXHJcblx0XHR0aGlzLl90cmlnZ2VyKCdjaGFuZ2UnLCB7IHByb3BlcnR5OiB7IG5hbWU6ICdzZXR0aW5ncycsIHZhbHVlOiB0aGlzLnNldHRpbmdzIH0gfSk7XHJcblx0XHR0aGlzLmludmFsaWRhdGUoJ3NldHRpbmdzJyk7IC8vIG11c3QgYmUgY2FsbCBvZiB0aGlzIGZ1bmN0aW9uO1xyXG5cdFx0dGhpcy5fdHJpZ2dlcignY2hhbmdlZCcsIHsgcHJvcGVydHk6IHsgbmFtZTogJ3NldHRpbmdzJywgdmFsdWU6IHRoaXMuc2V0dGluZ3MgfSB9KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldCBudW1iZXIgb2YgaXRlbXMgZm9yIGN1cnJlbnQgdmlld3BvcnRcclxuXHQgKi9cclxuXHRzZXRWaWV3cG9ydEl0ZW1zTigpIHtcclxuXHRcdGNvbnN0IHZpZXdwb3J0ID0gdGhpcy5fd2lkdGgsXHJcblx0XHRcdG92ZXJ3cml0ZXMgPSB0aGlzLl9vcHRpb25zLnJlc3BvbnNpdmU7XHJcblx0XHRsZXRcdG1hdGNoID0gLTE7XHJcblxyXG5cdFx0aWYgKCFPYmplY3Qua2V5cyhvdmVyd3JpdGVzKS5sZW5ndGgpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghdmlld3BvcnQpIHtcclxuXHRcdFx0dGhpcy5zZXR0aW5ncy5pdGVtcyA9IDE7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRmb3IgKGNvbnN0IGtleSBpbiBvdmVyd3JpdGVzKSB7XHJcblx0XHRcdGlmIChvdmVyd3JpdGVzLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuXHRcdFx0XHRpZiAoK2tleSA8PSB2aWV3cG9ydCAmJiAra2V5ID4gbWF0Y2gpIHtcclxuXHRcdFx0XHRcdG1hdGNoID0gTnVtYmVyKGtleSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IHsgLi4udGhpcy5zZXR0aW5ncywgaXRlbXM6IHRoaXMuX3ZhbGlkYXRlSXRlbXMob3ZlcndyaXRlc1ttYXRjaF0uaXRlbXMpfTtcclxuXHRcdC8vIGlmICh0eXBlb2YgdGhpcy5zZXR0aW5ncy5zdGFnZVBhZGRpbmcgPT09ICdmdW5jdGlvbicpIHtcclxuXHRcdC8vIFx0dGhpcy5zZXR0aW5ncy5zdGFnZVBhZGRpbmcgPSB0aGlzLnNldHRpbmdzLnN0YWdlUGFkZGluZygpO1xyXG5cdFx0Ly8gfVxyXG5cdFx0ZGVsZXRlIHRoaXMuc2V0dGluZ3MucmVzcG9uc2l2ZTtcclxuXHRcdHRoaXMub3dsRE9NRGF0YS5pc1Jlc3BvbnNpdmUgPSB0cnVlO1xyXG5cdFx0dGhpcy5fYnJlYWtwb2ludCA9IG1hdGNoO1xyXG5cclxuXHRcdHRoaXMuaW52YWxpZGF0ZSgnc2V0dGluZ3MnKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluaXRpYWxpemVzIHRoZSBjYXJvdXNlbC5cclxuXHQgKiBAcGFyYW0gc2xpZGVzIGFycmF5IG9mIENhcm91c2VsU2xpZGVEaXJlY3RpdmVcclxuXHQgKi9cclxuICBpbml0aWFsaXplKHNsaWRlczogQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZVtdKSB7XHJcblx0XHR0aGlzLmVudGVyKCdpbml0aWFsaXppbmcnKTtcclxuXHRcdC8vIHRoaXMudHJpZ2dlcignaW5pdGlhbGl6ZScpO1xyXG5cclxuXHRcdHRoaXMub3dsRE9NRGF0YS5ydGwgPSB0aGlzLnNldHRpbmdzLnJ0bDtcclxuXHJcblx0XHRzbGlkZXMuZm9yRWFjaChpdGVtID0+IHtcclxuXHRcdFx0Y29uc3QgbWVyZ2VOOiBudW1iZXIgPSB0aGlzLnNldHRpbmdzLm1lcmdlID8gaXRlbS5kYXRhTWVyZ2UgOiAxO1xyXG5cdFx0XHR0aGlzLl9tZXJnZXJzLnB1c2gobWVyZ2VOKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHRoaXMucmVzZXQodGhpcy5faXNOdW1lcmljKHRoaXMuc2V0dGluZ3Muc3RhcnRQb3NpdGlvbikgPyArdGhpcy5zZXR0aW5ncy5zdGFydFBvc2l0aW9uIDogMCk7XHJcblxyXG5cdFx0dGhpcy5pbnZhbGlkYXRlKCdpdGVtcycpO1xyXG5cdFx0dGhpcy5yZWZyZXNoKCk7XHJcblxyXG5cdFx0dGhpcy5vd2xET01EYXRhLmlzTG9hZGVkID0gdHJ1ZTtcclxuXHRcdHRoaXMub3dsRE9NRGF0YS5pc01vdXNlRHJhZ2FibGUgPSB0aGlzLnNldHRpbmdzLm1vdXNlRHJhZztcclxuXHRcdHRoaXMub3dsRE9NRGF0YS5pc1RvdWNoRHJhZ2FibGUgPSB0aGlzLnNldHRpbmdzLnRvdWNoRHJhZztcclxuXHJcblx0XHR0aGlzLnNlbmRDaGFuZ2VzKCk7XHJcblxyXG5cdFx0dGhpcy5sZWF2ZSgnaW5pdGlhbGl6aW5nJyk7XHJcblx0XHR0aGlzLl90cmlnZ2VyKCdpbml0aWFsaXplZCcpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNlbmRzIGFsbCBkYXRhIG5lZWRlZCBmb3IgVmlld1xyXG5cdCAqL1xyXG5cdHNlbmRDaGFuZ2VzKCkge1xyXG5cdFx0dGhpcy5fdmlld1NldHRpbmdzU2hpcHBlciQubmV4dCh7XHJcblx0XHRcdG93bERPTURhdGE6IHRoaXMub3dsRE9NRGF0YSxcclxuXHRcdFx0c3RhZ2VEYXRhOiB0aGlzLnN0YWdlRGF0YSxcclxuXHRcdFx0c2xpZGVzRGF0YTogdGhpcy5zbGlkZXNEYXRhLFxyXG5cdFx0XHRuYXZEYXRhOiB0aGlzLm5hdkRhdGEsXHJcblx0XHRcdGRvdHNEYXRhOiB0aGlzLmRvdHNEYXRhXHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cclxuICAvKipcclxuXHQgKiBVcGRhdGVzIG9wdGlvbiBsb2dpYyBpZiBuZWNlc3NlcnlcclxuXHQgKi9cclxuICBwcml2YXRlIF9vcHRpb25zTG9naWMoKSB7XHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5hdXRvV2lkdGgpIHtcclxuXHRcdFx0dGhpcy5zZXR0aW5ncy5zdGFnZVBhZGRpbmcgPSAwO1xyXG5cdFx0XHR0aGlzLnNldHRpbmdzLm1lcmdlID0gZmFsc2U7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGVzIHRoZSB2aWV3XHJcbiAgICovXHJcbiAgdXBkYXRlKCkge1xyXG4gICAgbGV0IGkgPSAwO1xyXG4gICAgY29uc3QgbiA9IHRoaXMuX3BpcGUubGVuZ3RoLFxyXG4gICAgICBmaWx0ZXIgPSBpdGVtID0+IHRoaXMuX2ludmFsaWRhdGVkW2l0ZW1dLFxyXG5cdFx0XHRjYWNoZSA9IHt9O1xyXG5cclxuICAgIHdoaWxlIChpIDwgbikge1xyXG4gICAgICBjb25zdCBmaWx0ZXJlZFBpcGUgPSB0aGlzLl9waXBlW2ldLmZpbHRlci5maWx0ZXIoZmlsdGVyKTtcclxuICAgICAgaWYgKHRoaXMuX2ludmFsaWRhdGVkLmFsbCB8fCBmaWx0ZXJlZFBpcGUubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdHRoaXMuX3BpcGVbaV0ucnVuKGNhY2hlKTtcclxuICAgICAgfVxyXG4gICAgICBpKys7XHJcblx0XHR9XHJcblx0XHR0aGlzLnNsaWRlc0RhdGEuZm9yRWFjaChzbGlkZSA9PiBzbGlkZS5jbGFzc2VzID0gdGhpcy5zZXRDdXJTbGlkZUNsYXNzZXMoc2xpZGUpKTtcclxuXHRcdHRoaXMuc2VuZENoYW5nZXMoKTtcclxuXHJcbiAgICB0aGlzLl9pbnZhbGlkYXRlZCA9IHt9O1xyXG5cclxuICAgIGlmICghdGhpcy5pcygndmFsaWQnKSkge1xyXG4gICAgICB0aGlzLmVudGVyKCd2YWxpZCcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcblx0ICogR2V0cyB0aGUgd2lkdGggb2YgdGhlIHZpZXcuXHJcblx0ICogQHBhcmFtIFtkaW1lbnNpb249V2lkdGguRGVmYXVsdF0gVGhlIGRpbWVuc2lvbiB0byByZXR1cm5cclxuXHQgKiBAcmV0dXJucyBUaGUgd2lkdGggb2YgdGhlIHZpZXcgaW4gcGl4ZWwuXHJcblx0ICovXHJcbiAgd2lkdGgoZGltZW5zaW9uPzogV2lkdGgpOiBudW1iZXIge1xyXG5cdFx0ZGltZW5zaW9uID0gZGltZW5zaW9uIHx8IFdpZHRoLkRlZmF1bHQ7XHJcblx0XHRzd2l0Y2ggKGRpbWVuc2lvbikge1xyXG5cdFx0XHRjYXNlIFdpZHRoLklubmVyOlxyXG5cdFx0XHRjYXNlIFdpZHRoLk91dGVyOlxyXG5cdFx0XHRcdHJldHVybiB0aGlzLl93aWR0aDtcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5fd2lkdGggLSB0aGlzLnNldHRpbmdzLnN0YWdlUGFkZGluZyAqIDIgKyB0aGlzLnNldHRpbmdzLm1hcmdpbjtcclxuXHRcdH1cclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIFJlZnJlc2hlcyB0aGUgY2Fyb3VzZWwgcHJpbWFyaWx5IGZvciBhZGFwdGl2ZSBwdXJwb3Nlcy5cclxuXHQgKi9cclxuICByZWZyZXNoKCkge1xyXG5cdFx0dGhpcy5lbnRlcigncmVmcmVzaGluZycpO1xyXG5cdFx0dGhpcy5fdHJpZ2dlcigncmVmcmVzaCcpO1xyXG5cdFx0dGhpcy5fZGVmaW5lU2xpZGVzRGF0YSgpO1xyXG5cdFx0dGhpcy5zZXRWaWV3cG9ydEl0ZW1zTigpO1xyXG5cclxuXHRcdHRoaXMuX29wdGlvbnNMb2dpYygpO1xyXG5cclxuXHRcdC8vIHRoaXMuJGVsZW1lbnQuYWRkQ2xhc3ModGhpcy5vcHRpb25zLnJlZnJlc2hDbGFzcyk7XHJcblxyXG5cdFx0dGhpcy51cGRhdGUoKTtcclxuXHJcblx0XHQvLyB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKHRoaXMub3B0aW9ucy5yZWZyZXNoQ2xhc3MpO1xyXG5cclxuXHRcdHRoaXMubGVhdmUoJ3JlZnJlc2hpbmcnKTtcclxuXHRcdHRoaXMuX3RyaWdnZXIoJ3JlZnJlc2hlZCcpO1xyXG5cdCB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIENoZWNrcyB3aW5kb3cgYHJlc2l6ZWAgZXZlbnQuXHJcblx0ICogQHBhcmFtIGN1cldpZHRoIHdpZHRoIG9mIC5vd2wtY2Fyb3VzZWxcclxuXHQgKi9cclxuICBvblJlc2l6ZShjdXJXaWR0aDogbnVtYmVyKSB7XHJcblx0XHRpZiAoIXRoaXMuX2l0ZW1zLmxlbmd0aCkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXRDYXJvdXNlbFdpZHRoKGN1cldpZHRoKTtcclxuXHJcblx0XHR0aGlzLmVudGVyKCdyZXNpemluZycpO1xyXG5cclxuXHRcdC8vIGlmICh0aGlzLnRyaWdnZXIoJ3Jlc2l6ZScpLmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XHJcblx0XHQvLyBcdHRoaXMubGVhdmUoJ3Jlc2l6aW5nJyk7XHJcblx0XHQvLyBcdHJldHVybiBmYWxzZTtcclxuXHRcdC8vIH1cclxuXHRcdHRoaXMuX3RyaWdnZXIoJ3Jlc2l6ZScpO1xyXG5cdFx0dGhpcy5pbnZhbGlkYXRlKCd3aWR0aCcpO1xyXG5cclxuXHRcdHRoaXMucmVmcmVzaCgpO1xyXG5cclxuXHRcdHRoaXMubGVhdmUoJ3Jlc2l6aW5nJyk7XHJcblx0XHR0aGlzLl90cmlnZ2VyKCdyZXNpemVkJyk7XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBQcmVwYXJlcyBkYXRhIGZvciBkcmFnZ2luZyBjYXJvdXNlbC4gSXQgc3RhcnRzIGFmdGVyIGZpcmluZyBgdG91Y2hzdGFydGAgYW5kIGBtb3VzZWRvd25gIGV2ZW50cy5cclxuXHQgKiBAdG9kbyBIb3Jpem9udGFsIHN3aXBlIHRocmVzaG9sZCBhcyBvcHRpb25cclxuXHQgKiBAdG9kbyAjMjYxXHJcblx0ICogQHBhcmFtIGV2ZW50IC0gVGhlIGV2ZW50IGFyZ3VtZW50cy5cclxuXHQgKiBAcmV0dXJucyBzdGFnZSAtIG9iamVjdCB3aXRoICd4JyBhbmQgJ3knIGNvb3JkaW5hdGVzIG9mIC5vd2wtc3RhZ2VcclxuXHQgKi9cclxuICBwcmVwYXJlRHJhZ2dpbmcoZXZlbnQ6IGFueSk6IENvb3JkcyB7XHJcblx0XHRsZXQgc3RhZ2U6IENvb3JkcyA9IG51bGwsXHJcblx0XHRcdFx0dHJhbnNmb3JtQXJyOiBzdHJpbmdbXTtcclxuXHJcblx0XHQvLyBjb3VsZCBiZSA1IGNvbW1lbnRlZCBsaW5lcyBiZWxvdzsgSG93ZXZlciB0aGVyZSdzIHN0YWdlIHRyYW5zZm9ybSBpbiBzdGFnZURhdGEgYW5kIGluIHVwZGF0ZXMgYWZ0ZXIgZWFjaCBtb3ZlIG9mIHN0YWdlXHJcbiAgICAvLyBzdGFnZSA9IGdldENvbXB1dGVkU3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50KS50cmFuc2Zvcm0ucmVwbGFjZSgvLipcXCh8XFwpfCAvZywgJycpLnNwbGl0KCcsJyk7XHJcbiAgICAvLyBzdGFnZSA9IHtcclxuICAgIC8vICAgeDogc3RhZ2Vbc3RhZ2UubGVuZ3RoID09PSAxNiA/IDEyIDogNF0sXHJcbiAgICAvLyAgIHk6IHN0YWdlW3N0YWdlLmxlbmd0aCA9PT0gMTYgPyAxMyA6IDVdXHJcblx0XHQvLyB9O1xyXG5cclxuXHRcdHRyYW5zZm9ybUFyciA9IHRoaXMuc3RhZ2VEYXRhLnRyYW5zZm9ybS5yZXBsYWNlKC8uKlxcKHxcXCl8IHxbXiwtXFxkXVxcd3xcXCkvZywgJycpLnNwbGl0KCcsJyk7XHJcbiAgICBzdGFnZSA9IHtcclxuICAgICAgeDogK3RyYW5zZm9ybUFyclswXSxcclxuICAgICAgeTogK3RyYW5zZm9ybUFyclsxXVxyXG4gICAgfTtcclxuXHJcblx0XHRpZiAodGhpcy5pcygnYW5pbWF0aW5nJykpIHtcclxuXHRcdFx0dGhpcy5pbnZhbGlkYXRlKCdwb3NpdGlvbicpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChldmVudC50eXBlID09PSAnbW91c2Vkb3duJykge1xyXG4gICAgICB0aGlzLm93bERPTURhdGEuaXNHcmFiID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcblx0XHR0aGlzLnNwZWVkKDApO1xyXG5cdFx0cmV0dXJuIHN0YWdlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRW50ZXJzIGludG8gYSAnZHJhZ2dpbmcnIHN0YXRlXHJcblx0ICovXHJcblx0ZW50ZXJEcmFnZ2luZygpIHtcclxuXHRcdHRoaXMuZW50ZXIoJ2RyYWdnaW5nJyk7XHJcbiAgICB0aGlzLl90cmlnZ2VyKCdkcmFnJyk7XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBEZWZpbmVzIG5ldyBjb29yZHMgZm9yIC5vd2wtc3RhZ2Ugd2hpbGUgZHJhZ2dpbmcgaXRcclxuXHQgKiBAdG9kbyAjMjYxXHJcblx0ICogQHBhcmFtIGV2ZW50IHRoZSBldmVudCBhcmd1bWVudHMuXHJcblx0ICogQHBhcmFtIGRyYWdEYXRhIGluaXRpYWwgZGF0YSBnb3QgYWZ0ZXIgc3RhcnRpbmcgZHJhZ2dpbmdcclxuXHQgKiBAcmV0dXJucyBjb29yZHMgb3IgZmFsc2VcclxuXHQgKi9cclxuICBkZWZpbmVOZXdDb29yZHNEcmFnKGV2ZW50OiBhbnksIGRyYWdEYXRhOiBhbnkpOiBib29sZWFuIHwgQ29vcmRzIHtcclxuXHRcdGxldCBtaW5pbXVtID0gbnVsbCxcclxuXHRcdG1heGltdW0gPSBudWxsLFxyXG5cdFx0cHVsbCA9IG51bGw7XHJcblx0XHRjb25zdFx0ZGVsdGEgPSB0aGlzLmRpZmZlcmVuY2UoZHJhZ0RhdGEucG9pbnRlciwgdGhpcy5wb2ludGVyKGV2ZW50KSksXHJcblx0XHRcdHN0YWdlID0gdGhpcy5kaWZmZXJlbmNlKGRyYWdEYXRhLnN0YWdlLnN0YXJ0LCBkZWx0YSk7XHJcblxyXG5cdFx0aWYgKCF0aGlzLmlzKCdkcmFnZ2luZycpKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5sb29wKSB7XHJcblx0XHRcdG1pbmltdW0gPSB0aGlzLmNvb3JkaW5hdGVzKHRoaXMubWluaW11bSgpKTtcclxuXHRcdFx0bWF4aW11bSA9ICt0aGlzLmNvb3JkaW5hdGVzKHRoaXMubWF4aW11bSgpICsgMSkgLSBtaW5pbXVtO1xyXG5cdFx0XHRzdGFnZS54ID0gKCgoc3RhZ2UueCAtIG1pbmltdW0pICUgbWF4aW11bSArIG1heGltdW0pICUgbWF4aW11bSkgKyBtaW5pbXVtO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bWluaW11bSA9IHRoaXMuc2V0dGluZ3MucnRsID8gdGhpcy5jb29yZGluYXRlcyh0aGlzLm1heGltdW0oKSkgOiB0aGlzLmNvb3JkaW5hdGVzKHRoaXMubWluaW11bSgpKTtcclxuXHRcdFx0bWF4aW11bSA9IHRoaXMuc2V0dGluZ3MucnRsID8gdGhpcy5jb29yZGluYXRlcyh0aGlzLm1pbmltdW0oKSkgOiB0aGlzLmNvb3JkaW5hdGVzKHRoaXMubWF4aW11bSgpKTtcclxuXHRcdFx0cHVsbCA9IHRoaXMuc2V0dGluZ3MucHVsbERyYWcgPyAtMSAqIGRlbHRhLnggLyA1IDogMDtcclxuXHRcdFx0c3RhZ2UueCA9IE1hdGgubWF4KE1hdGgubWluKHN0YWdlLngsIG1pbmltdW0gKyBwdWxsKSwgbWF4aW11bSArIHB1bGwpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBzdGFnZTtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEZpbmlzaGVzIGRyYWdnaW5nIG9mIGNhcm91c2VsIHdoZW4gYHRvdWNoZW5kYCBhbmQgYG1vdXNldXBgIGV2ZW50cyBmaXJlLlxyXG5cdCAqIEB0b2RvICMyNjFcclxuXHQgKiBAdG9kbyBUaHJlc2hvbGQgZm9yIGNsaWNrIGV2ZW50XHJcblx0ICogQHBhcmFtIGV2ZW50IHRoZSBldmVudCBhcmd1bWVudHMuXHJcblx0ICogQHBhcmFtIGRyYWdPYmogdGhlIG9iamVjdCB3aXRoIGRyYWdnaW5nIHNldHRpbmdzIGFuZCBzdGF0ZXNcclxuXHQgKiBAcGFyYW0gY2xpY2tBdHRhY2hlciBmdW5jdGlvbiB3aGljaCBhdHRhY2hlcyBjbGljayBoYW5kbGVyIHRvIHNsaWRlIG9yIGl0cyBjaGlsZHJlbiBlbGVtZW50cyBpbiBvcmRlciB0byBwcmV2ZW50IGV2ZW50IGJ1YmxpbmdcclxuXHQgKi9cclxuICBmaW5pc2hEcmFnZ2luZyhldmVudDogYW55LCBkcmFnT2JqOiBhbnksIGNsaWNrQXR0YWNoZXI6ICgpID0+IHZvaWQpIHtcclxuXHRcdGNvbnN0IGRlbHRhID0gdGhpcy5kaWZmZXJlbmNlKGRyYWdPYmoucG9pbnRlciwgdGhpcy5wb2ludGVyKGV2ZW50KSksXHJcbiAgICAgICAgc3RhZ2UgPSBkcmFnT2JqLnN0YWdlLmN1cnJlbnQsXHJcblx0XHRcdFx0ZGlyZWN0aW9uID0gZGVsdGEueCA+ICt0aGlzLnNldHRpbmdzLnJ0bCA/ICdsZWZ0JyA6ICdyaWdodCc7XHJcblx0XHRsZXQgY3VycmVudFNsaWRlSTogbnVtYmVyLCBjdXJyZW50OiBudW1iZXIsIG5ld0N1cnJlbnQ6IG51bWJlcjtcclxuXHJcbiAgICAgIGlmIChkZWx0YS54ICE9PSAwICYmIHRoaXMuaXMoJ2RyYWdnaW5nJykgfHwgIXRoaXMuaXMoJ3ZhbGlkJykpIHtcclxuICAgICAgICB0aGlzLnNwZWVkKCt0aGlzLnNldHRpbmdzLmRyYWdFbmRTcGVlZCB8fCB0aGlzLnNldHRpbmdzLnNtYXJ0U3BlZWQpO1xyXG5cdFx0XHRcdGN1cnJlbnRTbGlkZUkgPSB0aGlzLmNsb3Nlc3Qoc3RhZ2UueCwgZGVsdGEueCAhPT0gMCA/IGRpcmVjdGlvbiA6IGRyYWdPYmouZGlyZWN0aW9uKTtcclxuXHRcdFx0XHRjdXJyZW50ID0gdGhpcy5jdXJyZW50KCk7XHJcbiAgICAgICAgbmV3Q3VycmVudCA9IHRoaXMuY3VycmVudChjdXJyZW50U2xpZGVJID09PSAtMSA/IHVuZGVmaW5lZCA6IGN1cnJlbnRTbGlkZUkpO1xyXG5cclxuXHRcdFx0XHRpZiAoY3VycmVudCAhPT0gbmV3Q3VycmVudCkge1xyXG5cdFx0XHRcdFx0dGhpcy5pbnZhbGlkYXRlKCdwb3NpdGlvbicpO1xyXG5cdFx0XHRcdFx0dGhpcy51cGRhdGUoKTtcclxuXHRcdFx0XHR9XHJcblxyXG4gICAgICAgIGRyYWdPYmouZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xyXG5cclxuICAgICAgICBpZiAoTWF0aC5hYnMoZGVsdGEueCkgPiAzIHx8IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gZHJhZ09iai50aW1lID4gMzAwKSB7XHJcblx0XHRcdFx0XHRjbGlja0F0dGFjaGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmICghdGhpcy5pcygnZHJhZ2dpbmcnKSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cdFx0XHR0aGlzLmxlYXZlKCdkcmFnZ2luZycpO1xyXG5cdFx0XHR0aGlzLl90cmlnZ2VyKCdkcmFnZ2VkJylcclxuXHQgfVxyXG5cclxuICAvKipcclxuXHQgKiBHZXRzIGFic29sdXRlIHBvc2l0aW9uIG9mIHRoZSBjbG9zZXN0IGl0ZW0gZm9yIGEgY29vcmRpbmF0ZS5cclxuXHQgKiBAdG9kbyBTZXR0aW5nIGBmcmVlRHJhZ2AgbWFrZXMgYGNsb3Nlc3RgIG5vdCByZXVzYWJsZS4gU2VlICMxNjUuXHJcblx0ICogQHBhcmFtIGNvb3JkaW5hdGUgVGhlIGNvb3JkaW5hdGUgaW4gcGl4ZWwuXHJcblx0ICogQHBhcmFtIGRpcmVjdGlvbiBUaGUgZGlyZWN0aW9uIHRvIGNoZWNrIGZvciB0aGUgY2xvc2VzdCBpdGVtLiBFdGhlciBgbGVmdGAgb3IgYHJpZ2h0YC5cclxuXHQgKiBAcmV0dXJucyBUaGUgYWJzb2x1dGUgcG9zaXRpb24gb2YgdGhlIGNsb3Nlc3QgaXRlbS5cclxuXHQgKi9cclxuICBjbG9zZXN0KGNvb3JkaW5hdGU6IG51bWJlciwgZGlyZWN0aW9uOiBzdHJpbmcpOiBudW1iZXIge1xyXG5cdFx0Y29uc3QgcHVsbCA9IDMwLFxyXG5cdFx0XHR3aWR0aCA9IHRoaXMud2lkdGgoKTtcclxuXHRcdGxldFx0Y29vcmRpbmF0ZXM6IG51bWJlcltdID0gdGhpcy5jb29yZGluYXRlcygpIGFzIG51bWJlcltdLFxyXG5cdFx0IHBvc2l0aW9uID0gLTE7XHJcblxyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3MuY2VudGVyKSB7XHJcblx0XHRcdGNvb3JkaW5hdGVzID0gY29vcmRpbmF0ZXMubWFwKGl0ZW0gPT4ge1xyXG5cdFx0XHRcdGlmIChpdGVtID09PSAwKSB7XHJcblx0XHRcdFx0XHRpdGVtICs9IDAuMDAwMDAxO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gaXRlbTtcclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHJcblx0XHQvLyBvcHRpb24gJ2ZyZWVEcmFnJyBkb2Vzbid0IGhhdmUgcmVhbGl6YXRpb24gYW5kIHVzaW5nIGl0IGhlcmUgY3JlYXRlcyBwcm9ibGVtOlxyXG5cdFx0Ly8gdmFyaWFibGUgJ3Bvc2l0aW9uJyBzdGF5cyB1bmNoYW5nZWQgKGl0IGVxdWFscyAtMSBhdCB0aGUgYmVnZ2luZykgYW5kIHRodXMgbWV0aG9kIHJldHVybnMgLTFcclxuXHRcdC8vIFJldHVybmluZyB2YWx1ZSBpcyBjb25zdW1lZCBieSBtZXRob2QgY3VycmVudCgpLCB3aGljaCB0YWtpbmcgLTEgYXMgYXJndW1lbnQgY2FsY3VsYXRlcyB0aGUgaW5kZXggb2YgbmV3IGN1cnJlbnQgc2xpZGVcclxuXHRcdC8vIEluIGNhc2Ugb2YgaGF2aW5nIDUgc2xpZGVzIGFucyAnbG9vcD1mYWxzZTsgY2FsbGluZyAnY3VycmVudCgtMSknIHNldHMgcHJvcHMgJ19jdXJyZW50JyBhcyA0LiBKdXN0IGxhc3Qgc2xpZGUgcmVtYWlucyB2aXNpYmxlIGluc3RlYWQgb2YgMyBsYXN0IHNsaWRlcy5cclxuXHJcblx0XHQvLyBpZiAoIXRoaXMuc2V0dGluZ3MuZnJlZURyYWcpIHtcclxuXHRcdFx0Ly8gY2hlY2sgY2xvc2VzdCBpdGVtXHJcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgY29vcmRpbmF0ZXMubGVuZ3RoOyBpKyspIHtcclxuXHJcblx0XHRcdFx0aWYgKGRpcmVjdGlvbiA9PT0gJ2xlZnQnICYmIGNvb3JkaW5hdGUgPiBjb29yZGluYXRlc1tpXSAtIHB1bGwgJiYgY29vcmRpbmF0ZSA8IGNvb3JkaW5hdGVzW2ldICsgcHVsbCkge1xyXG5cdFx0XHRcdFx0cG9zaXRpb24gPSBpO1xyXG5cdFx0XHRcdC8vIG9uIGEgcmlnaHQgcHVsbCwgY2hlY2sgb24gcHJldmlvdXMgaW5kZXhcclxuXHRcdFx0XHQvLyB0byBkbyBzbywgc3VidHJhY3Qgd2lkdGggZnJvbSB2YWx1ZSBhbmQgc2V0IHBvc2l0aW9uID0gaW5kZXggKyAxXHJcblx0XHRcdFx0fSBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICdyaWdodCcgJiYgY29vcmRpbmF0ZSA+IGNvb3JkaW5hdGVzW2ldIC0gd2lkdGggLSBwdWxsICYmIGNvb3JkaW5hdGUgPCBjb29yZGluYXRlc1tpXSAtIHdpZHRoICsgcHVsbCkge1xyXG5cdFx0XHRcdFx0cG9zaXRpb24gPSBpICsgMTtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKHRoaXMuX29wKGNvb3JkaW5hdGUsICc8JywgY29vcmRpbmF0ZXNbaV0pXHJcblx0XHRcdFx0XHQmJiB0aGlzLl9vcChjb29yZGluYXRlLCAnPicsIGNvb3JkaW5hdGVzW2kgKyAxXSB8fCBjb29yZGluYXRlc1tpXSAtIHdpZHRoKSkge1xyXG5cdFx0XHRcdFx0cG9zaXRpb24gPSBkaXJlY3Rpb24gPT09ICdsZWZ0JyA/IGkgKyAxIDogaTtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gbnVsbCAmJiBjb29yZGluYXRlID4gY29vcmRpbmF0ZXNbaV0gLSBwdWxsICYmIGNvb3JkaW5hdGUgPCBjb29yZGluYXRlc1tpXSArIHB1bGwpIHtcclxuXHRcdFx0XHRcdHBvc2l0aW9uID0gaTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChwb3NpdGlvbiAhPT0gLTEpIHsgYnJlYWsgfTtcclxuXHRcdFx0fVxyXG5cdFx0Ly8gfVxyXG5cclxuXHRcdGlmICghdGhpcy5zZXR0aW5ncy5sb29wKSB7XHJcblx0XHRcdC8vIG5vbiBsb29wIGJvdW5kcmllc1xyXG5cdFx0XHRpZiAodGhpcy5fb3AoY29vcmRpbmF0ZSwgJz4nLCBjb29yZGluYXRlc1t0aGlzLm1pbmltdW0oKV0pKSB7XHJcblx0XHRcdFx0cG9zaXRpb24gPSBjb29yZGluYXRlID0gdGhpcy5taW5pbXVtKCk7XHJcblx0XHRcdH0gZWxzZSBpZiAodGhpcy5fb3AoY29vcmRpbmF0ZSwgJzwnLCBjb29yZGluYXRlc1t0aGlzLm1heGltdW0oKV0pKSB7XHJcblx0XHRcdFx0cG9zaXRpb24gPSBjb29yZGluYXRlID0gdGhpcy5tYXhpbXVtKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcG9zaXRpb247XHJcblx0IH1cclxuXHJcbiAgLyoqXHJcblx0ICogQW5pbWF0ZXMgdGhlIHN0YWdlLlxyXG5cdCAqIEB0b2RvICMyNzBcclxuXHQgKiBAcGFyYW0gY29vcmRpbmF0ZSBUaGUgY29vcmRpbmF0ZSBpbiBwaXhlbHMuXHJcblx0ICovXHJcbiAgYW5pbWF0ZShjb29yZGluYXRlOiBudW1iZXIgfCBudW1iZXJbXSkge1xyXG5cdFx0Y29uc3QgYW5pbWF0ZSA9IHRoaXMuc3BlZWQoKSA+IDA7XHJcblxyXG5cdFx0aWYgKHRoaXMuaXMoJ2FuaW1hdGluZycpKSB7XHJcblx0XHRcdHRoaXMub25UcmFuc2l0aW9uRW5kKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGFuaW1hdGUpIHtcclxuXHRcdFx0dGhpcy5lbnRlcignYW5pbWF0aW5nJyk7XHJcblx0XHRcdHRoaXMuX3RyaWdnZXIoJ3RyYW5zbGF0ZScpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc3RhZ2VEYXRhLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgnICsgY29vcmRpbmF0ZSArICdweCwwcHgsMHB4KSc7XHJcblx0XHR0aGlzLnN0YWdlRGF0YS50cmFuc2l0aW9uID0gKHRoaXMuc3BlZWQoKSAvIDEwMDApICsgJ3MnO1xyXG5cclxuXHRcdC8vIGFsc28gdGhlcmUgd2FzIHRyYW5zaXRpb24gYnkgbWVhbnMgb2YgSlF1ZXJ5LmFuaW1hdGUgb3IgY3NzLWNoYW5naW5nIHByb3BlcnR5IGxlZnRcclxuXHQgfVxyXG5cclxuICAvKipcclxuXHQgKiBDaGVja3Mgd2hldGhlciB0aGUgY2Fyb3VzZWwgaXMgaW4gYSBzcGVjaWZpYyBzdGF0ZSBvciBub3QuXHJcblx0ICogQHBhcmFtIHN0YXRlIFRoZSBzdGF0ZSB0byBjaGVjay5cclxuXHQgKiBAcmV0dXJucyBUaGUgZmxhZyB3aGljaCBpbmRpY2F0ZXMgaWYgdGhlIGNhcm91c2VsIGlzIGJ1c3kuXHJcblx0ICovXHJcbiAgaXMoc3RhdGU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3N0YXRlcy5jdXJyZW50W3N0YXRlXSAmJiB0aGlzLl9zdGF0ZXMuY3VycmVudFtzdGF0ZV0gPiAwO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG5cdCAqIFNldHMgdGhlIGFic29sdXRlIHBvc2l0aW9uIG9mIHRoZSBjdXJyZW50IGl0ZW0uXHJcblx0ICogQHBhcmFtIHBvc2l0aW9uIFRoZSBuZXcgYWJzb2x1dGUgcG9zaXRpb24gb3Igbm90aGluZyB0byBsZWF2ZSBpdCB1bmNoYW5nZWQuXHJcblx0ICogQHJldHVybnMgVGhlIGFic29sdXRlIHBvc2l0aW9uIG9mIHRoZSBjdXJyZW50IGl0ZW0uXHJcblx0ICovXHJcbiAgY3VycmVudChwb3NpdGlvbj86IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRpZiAocG9zaXRpb24gPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5fY3VycmVudDtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5faXRlbXMubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdHJldHVybiB1bmRlZmluZWQ7XHJcblx0XHR9XHJcblxyXG5cdFx0cG9zaXRpb24gPSB0aGlzLm5vcm1hbGl6ZShwb3NpdGlvbik7XHJcblxyXG5cdFx0aWYgKHRoaXMuX2N1cnJlbnQgIT09IHBvc2l0aW9uKSB7XHJcblx0XHRcdGNvbnN0IGV2ZW50ID0gdGhpcy5fdHJpZ2dlcignY2hhbmdlJywgeyBwcm9wZXJ0eTogeyBuYW1lOiAncG9zaXRpb24nLCB2YWx1ZTogcG9zaXRpb24gfSB9KTtcclxuXHJcblx0XHRcdC8vIGlmIChldmVudC5kYXRhICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0Ly8gXHRwb3NpdGlvbiA9IHRoaXMubm9ybWFsaXplKGV2ZW50LmRhdGEpO1xyXG5cdFx0XHQvLyB9XHJcblxyXG5cdFx0XHR0aGlzLl9jdXJyZW50ID0gcG9zaXRpb247XHJcblxyXG5cdFx0XHR0aGlzLmludmFsaWRhdGUoJ3Bvc2l0aW9uJyk7XHJcblx0XHRcdHRoaXMuX3RyaWdnZXIoJ2NoYW5nZWQnLCB7IHByb3BlcnR5OiB7IG5hbWU6ICdwb3NpdGlvbicsIHZhbHVlOiB0aGlzLl9jdXJyZW50IH0gfSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX2N1cnJlbnQ7XHJcblx0IH1cclxuXHJcbiAgLyoqXHJcblx0ICogSW52YWxpZGF0ZXMgdGhlIGdpdmVuIHBhcnQgb2YgdGhlIHVwZGF0ZSByb3V0aW5lLlxyXG5cdCAqIEBwYXJhbSBwYXJ0IFRoZSBwYXJ0IHRvIGludmFsaWRhdGUuXHJcblx0ICogQHJldHVybnMgVGhlIGludmFsaWRhdGVkIHBhcnRzLlxyXG5cdCAqL1xyXG4gIGludmFsaWRhdGUocGFydDogc3RyaW5nKTogc3RyaW5nW10ge1xyXG5cdFx0aWYgKHR5cGVvZiBwYXJ0ID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aGlzLl9pbnZhbGlkYXRlZFtwYXJ0XSA9IHRydWU7XHJcblx0XHRcdGlmKHRoaXMuaXMoJ3ZhbGlkJykpIHsgdGhpcy5sZWF2ZSgndmFsaWQnKTsgfVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuX2ludmFsaWRhdGVkKTtcclxuICB9O1xyXG5cclxuXHQvKipcclxuXHQgKiBSZXNldHMgdGhlIGFic29sdXRlIHBvc2l0aW9uIG9mIHRoZSBjdXJyZW50IGl0ZW0uXHJcblx0ICogQHBhcmFtIHBvc2l0aW9uIHRoZSBhYnNvbHV0ZSBwb3NpdGlvbiBvZiB0aGUgbmV3IGl0ZW0uXHJcblx0ICovXHJcbiAgcmVzZXQocG9zaXRpb246IG51bWJlcikge1xyXG5cdFx0cG9zaXRpb24gPSB0aGlzLm5vcm1hbGl6ZShwb3NpdGlvbik7XHJcblxyXG5cdFx0aWYgKHBvc2l0aW9uID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX3NwZWVkID0gMDtcclxuXHRcdHRoaXMuX2N1cnJlbnQgPSBwb3NpdGlvbjtcclxuXHJcblx0XHR0aGlzLl9zdXBwcmVzcyhbICd0cmFuc2xhdGUnLCAndHJhbnNsYXRlZCcgXSk7XHJcblxyXG5cdFx0dGhpcy5hbmltYXRlKHRoaXMuY29vcmRpbmF0ZXMocG9zaXRpb24pKTtcclxuXHJcblx0XHR0aGlzLl9yZWxlYXNlKFsgJ3RyYW5zbGF0ZScsICd0cmFuc2xhdGVkJyBdKTtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIE5vcm1hbGl6ZXMgYW4gYWJzb2x1dGUgb3IgYSByZWxhdGl2ZSBwb3NpdGlvbiBvZiBhbiBpdGVtLlxyXG5cdCAqIEBwYXJhbSBwb3NpdGlvbiBUaGUgYWJzb2x1dGUgb3IgcmVsYXRpdmUgcG9zaXRpb24gdG8gbm9ybWFsaXplLlxyXG5cdCAqIEBwYXJhbSByZWxhdGl2ZSBXaGV0aGVyIHRoZSBnaXZlbiBwb3NpdGlvbiBpcyByZWxhdGl2ZSBvciBub3QuXHJcblx0ICogQHJldHVybnMgVGhlIG5vcm1hbGl6ZWQgcG9zaXRpb24uXHJcblx0ICovXHJcbiAgbm9ybWFsaXplKHBvc2l0aW9uOiBudW1iZXIsIHJlbGF0aXZlPzogYm9vbGVhbik6IG51bWJlciB7XHJcblx0XHRjb25zdCBuID0gdGhpcy5faXRlbXMubGVuZ3RoLFxyXG5cdFx0XHRcdFx0bSA9IHJlbGF0aXZlID8gMCA6IHRoaXMuX2Nsb25lcy5sZW5ndGg7XHJcblxyXG5cdFx0aWYgKCF0aGlzLl9pc051bWVyaWMocG9zaXRpb24pIHx8IG4gPCAxKSB7XHJcblx0XHRcdHBvc2l0aW9uID0gdW5kZWZpbmVkO1xyXG5cdFx0fSBlbHNlIGlmIChwb3NpdGlvbiA8IDAgfHwgcG9zaXRpb24gPj0gbiArIG0pIHtcclxuXHRcdFx0cG9zaXRpb24gPSAoKHBvc2l0aW9uIC0gbSAvIDIpICUgbiArIG4pICUgbiArIG0gLyAyO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBwb3NpdGlvbjtcclxuXHQgfVxyXG5cclxuICAvKipcclxuXHQgKiBDb252ZXJ0cyBhbiBhYnNvbHV0ZSBwb3NpdGlvbiBvZiBhbiBpdGVtIGludG8gYSByZWxhdGl2ZSBvbmUuXHJcblx0ICogQHBhcmFtIHBvc2l0aW9uIFRoZSBhYnNvbHV0ZSBwb3NpdGlvbiB0byBjb252ZXJ0LlxyXG5cdCAqIEByZXR1cm5zIFRoZSBjb252ZXJ0ZWQgcG9zaXRpb24uXHJcblx0ICovXHJcbiAgcmVsYXRpdmUocG9zaXRpb246IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRwb3NpdGlvbiAtPSB0aGlzLl9jbG9uZXMubGVuZ3RoIC8gMjtcclxuXHRcdHJldHVybiB0aGlzLm5vcm1hbGl6ZShwb3NpdGlvbiwgdHJ1ZSk7XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBHZXRzIHRoZSBtYXhpbXVtIHBvc2l0aW9uIGZvciB0aGUgY3VycmVudCBpdGVtLlxyXG5cdCAqIEBwYXJhbSByZWxhdGl2ZSBXaGV0aGVyIHRvIHJldHVybiBhbiBhYnNvbHV0ZSBwb3NpdGlvbiBvciBhIHJlbGF0aXZlIHBvc2l0aW9uLlxyXG5cdCAqIEByZXR1cm5zIG51bWJlciBvZiBtYXhpbXVtIHBvc2l0aW9uXHJcblx0ICovXHJcbiAgbWF4aW11bShyZWxhdGl2ZTogYm9vbGVhbiA9IGZhbHNlKTogbnVtYmVyIHtcclxuXHRcdGNvbnN0IHNldHRpbmdzID0gdGhpcy5zZXR0aW5ncztcclxuXHRcdGxldFx0bWF4aW11bSA9IHRoaXMuX2Nvb3JkaW5hdGVzLmxlbmd0aCxcclxuXHRcdFx0aXRlcmF0b3IsXHJcblx0XHRcdHJlY2lwcm9jYWxJdGVtc1dpZHRoLFxyXG5cdFx0XHRlbGVtZW50V2lkdGg7XHJcblxyXG5cdFx0aWYgKHNldHRpbmdzLmxvb3ApIHtcclxuXHRcdFx0bWF4aW11bSA9IHRoaXMuX2Nsb25lcy5sZW5ndGggLyAyICsgdGhpcy5faXRlbXMubGVuZ3RoIC0gMTtcclxuXHRcdH0gZWxzZSBpZiAoc2V0dGluZ3MuYXV0b1dpZHRoIHx8IHNldHRpbmdzLm1lcmdlKSB7XHJcblx0XHRcdGl0ZXJhdG9yID0gdGhpcy5faXRlbXMubGVuZ3RoO1xyXG5cdFx0XHRyZWNpcHJvY2FsSXRlbXNXaWR0aCA9IHRoaXMuc2xpZGVzRGF0YVstLWl0ZXJhdG9yXS53aWR0aDtcclxuXHRcdFx0ZWxlbWVudFdpZHRoID0gdGhpcy5fd2lkdGg7XHJcblx0XHRcdHdoaWxlIChpdGVyYXRvci0tKSB7XHJcblx0XHRcdFx0Ly8gaXQgY291bGQgYmUgdXNlIHRoaXMuX2l0ZW1zIGluc3RlYWQgb2YgdGhpcy5zbGlkZXNEYXRhO1xyXG5cdFx0XHRcdHJlY2lwcm9jYWxJdGVtc1dpZHRoICs9ICt0aGlzLnNsaWRlc0RhdGFbaXRlcmF0b3JdLndpZHRoICsgdGhpcy5zZXR0aW5ncy5tYXJnaW47XHJcblx0XHRcdFx0aWYgKHJlY2lwcm9jYWxJdGVtc1dpZHRoID4gZWxlbWVudFdpZHRoKSB7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0bWF4aW11bSA9IGl0ZXJhdG9yICsgMTtcclxuXHRcdH0gZWxzZSBpZiAoc2V0dGluZ3MuY2VudGVyKSB7XHJcblx0XHRcdG1heGltdW0gPSB0aGlzLl9pdGVtcy5sZW5ndGggLSAxO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bWF4aW11bSA9IHRoaXMuX2l0ZW1zLmxlbmd0aCAtIHNldHRpbmdzLml0ZW1zO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChyZWxhdGl2ZSkge1xyXG5cdFx0XHRtYXhpbXVtIC09IHRoaXMuX2Nsb25lcy5sZW5ndGggLyAyO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBNYXRoLm1heChtYXhpbXVtLCAwKTtcclxuXHQgfVxyXG5cclxuICAvKipcclxuXHQgKiBHZXRzIHRoZSBtaW5pbXVtIHBvc2l0aW9uIGZvciB0aGUgY3VycmVudCBpdGVtLlxyXG5cdCAqIEBwYXJhbSByZWxhdGl2ZSBXaGV0aGVyIHRvIHJldHVybiBhbiBhYnNvbHV0ZSBwb3NpdGlvbiBvciBhIHJlbGF0aXZlIHBvc2l0aW9uLlxyXG5cdCAqIEByZXR1cm5zIG51bWJlciBvZiBtaW5pbXVtIHBvc2l0aW9uXHJcblx0ICovXHJcbiAgbWluaW11bShyZWxhdGl2ZTogYm9vbGVhbiA9IGZhbHNlKTogbnVtYmVyIHtcclxuXHRcdHJldHVybiByZWxhdGl2ZSA/IDAgOiB0aGlzLl9jbG9uZXMubGVuZ3RoIC8gMjtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEdldHMgYW4gaXRlbSBhdCB0aGUgc3BlY2lmaWVkIHJlbGF0aXZlIHBvc2l0aW9uLlxyXG5cdCAqIEBwYXJhbSBwb3NpdGlvbiBUaGUgcmVsYXRpdmUgcG9zaXRpb24gb2YgdGhlIGl0ZW0uXHJcblx0ICogQHJldHVybnMgVGhlIGl0ZW0gYXQgdGhlIGdpdmVuIHBvc2l0aW9uIG9yIGFsbCBpdGVtcyBpZiBubyBwb3NpdGlvbiB3YXMgZ2l2ZW4uXHJcblx0ICovXHJcbiAgaXRlbXMocG9zaXRpb24/OiBudW1iZXIpOiBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlW10ge1xyXG5cdFx0aWYgKHBvc2l0aW9uID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuX2l0ZW1zLnNsaWNlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cG9zaXRpb24gPSB0aGlzLm5vcm1hbGl6ZShwb3NpdGlvbiwgdHJ1ZSk7XHJcblx0XHRyZXR1cm4gW3RoaXMuX2l0ZW1zW3Bvc2l0aW9uXV07XHJcblx0IH1cclxuXHJcbiAgLyoqXHJcblx0ICogR2V0cyBhbiBpdGVtIGF0IHRoZSBzcGVjaWZpZWQgcmVsYXRpdmUgcG9zaXRpb24uXHJcblx0ICogQHBhcmFtIHBvc2l0aW9uIFRoZSByZWxhdGl2ZSBwb3NpdGlvbiBvZiB0aGUgaXRlbS5cclxuXHQgKiBAcmV0dXJucyBUaGUgaXRlbSBhdCB0aGUgZ2l2ZW4gcG9zaXRpb24gb3IgYWxsIGl0ZW1zIGlmIG5vIHBvc2l0aW9uIHdhcyBnaXZlbi5cclxuXHQgKi9cclxuICBtZXJnZXJzKHBvc2l0aW9uOiBudW1iZXIpOiBudW1iZXIgfCBudW1iZXJbXSB7XHJcblx0XHRpZiAocG9zaXRpb24gPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5fbWVyZ2Vycy5zbGljZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHBvc2l0aW9uID0gdGhpcy5ub3JtYWxpemUocG9zaXRpb24sIHRydWUpO1xyXG5cdFx0cmV0dXJuIHRoaXMuX21lcmdlcnNbcG9zaXRpb25dO1xyXG5cdCB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEdldHMgdGhlIGFic29sdXRlIHBvc2l0aW9ucyBvZiBjbG9uZXMgZm9yIGFuIGl0ZW0uXHJcblx0ICogQHBhcmFtIHBvc2l0aW9uIFRoZSByZWxhdGl2ZSBwb3NpdGlvbiBvZiB0aGUgaXRlbS5cclxuXHQgKiBAcmV0dXJucyBUaGUgYWJzb2x1dGUgcG9zaXRpb25zIG9mIGNsb25lcyBmb3IgdGhlIGl0ZW0gb3IgYWxsIGlmIG5vIHBvc2l0aW9uIHdhcyBnaXZlbi5cclxuXHQgKi9cclxuICBjbG9uZXMocG9zaXRpb24/OiBudW1iZXIpOiBudW1iZXJbXSB7XHJcblx0XHRjb25zdCBvZGQgPSB0aGlzLl9jbG9uZXMubGVuZ3RoIC8gMixcclxuXHRcdFx0ZXZlbiA9IG9kZCArIHRoaXMuX2l0ZW1zLmxlbmd0aCxcclxuXHRcdFx0bWFwID0gaW5kZXggPT4gaW5kZXggJSAyID09PSAwID8gZXZlbiArIGluZGV4IC8gMiA6IG9kZCAtIChpbmRleCArIDEpIC8gMjtcclxuXHJcblx0XHRpZiAocG9zaXRpb24gPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5fY2xvbmVzLm1hcCgodiwgaSkgPT4gbWFwKGkpKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fY2xvbmVzLm1hcCgodiwgaSkgPT4gdiA9PT0gcG9zaXRpb24gPyBtYXAoaSkgOiBudWxsKS5maWx0ZXIoaXRlbSA9PiBpdGVtKTtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIFNldHMgdGhlIGN1cnJlbnQgYW5pbWF0aW9uIHNwZWVkLlxyXG5cdCAqIEBwYXJhbSBzcGVlZCBUaGUgYW5pbWF0aW9uIHNwZWVkIGluIG1pbGxpc2Vjb25kcyBvciBub3RoaW5nIHRvIGxlYXZlIGl0IHVuY2hhbmdlZC5cclxuXHQgKiBAcmV0dXJucyBUaGUgY3VycmVudCBhbmltYXRpb24gc3BlZWQgaW4gbWlsbGlzZWNvbmRzLlxyXG5cdCAqL1xyXG4gIHNwZWVkKHNwZWVkPzogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdGlmIChzcGVlZCAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHRoaXMuX3NwZWVkID0gc3BlZWQ7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX3NwZWVkO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogR2V0cyB0aGUgY29vcmRpbmF0ZSBvZiBhbiBpdGVtLlxyXG5cdCAqIEB0b2RvIFRoZSBuYW1lIG9mIHRoaXMgbWV0aG9kIGlzIG1pc3NsZWFuZGluZy5cclxuXHQgKiBAcGFyYW0gcG9zaXRpb24gVGhlIGFic29sdXRlIHBvc2l0aW9uIG9mIHRoZSBpdGVtIHdpdGhpbiBgbWluaW11bSgpYCBhbmQgYG1heGltdW0oKWAuXHJcblx0ICogQHJldHVybnMgVGhlIGNvb3JkaW5hdGUgb2YgdGhlIGl0ZW0gaW4gcGl4ZWwgb3IgYWxsIGNvb3JkaW5hdGVzLlxyXG5cdCAqL1xyXG4gIGNvb3JkaW5hdGVzKHBvc2l0aW9uPzogbnVtYmVyKTogbnVtYmVyIHwgbnVtYmVyW10ge1xyXG5cdFx0bGV0IG11bHRpcGxpZXIgPSAxLFxyXG5cdFx0XHRuZXdQb3NpdGlvbiA9IHBvc2l0aW9uIC0gMSxcclxuXHRcdFx0Y29vcmRpbmF0ZSxcclxuXHRcdFx0cmVzdWx0OiBudW1iZXJbXTtcclxuXHJcblx0XHRpZiAocG9zaXRpb24gPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXN1bHQgPSB0aGlzLl9jb29yZGluYXRlcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuY29vcmRpbmF0ZXMoaW5kZXgpIGFzIG51bWJlcjtcclxuXHRcdFx0fSk7XHJcblx0XHRcdHJldHVybiByZXN1bHQ7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3MuY2VudGVyKSB7XHJcblx0XHRcdGlmICh0aGlzLnNldHRpbmdzLnJ0bCkge1xyXG5cdFx0XHRcdG11bHRpcGxpZXIgPSAtMTtcclxuXHRcdFx0XHRuZXdQb3NpdGlvbiA9IHBvc2l0aW9uICsgMTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Y29vcmRpbmF0ZSA9IHRoaXMuX2Nvb3JkaW5hdGVzW3Bvc2l0aW9uXTtcclxuXHRcdFx0Y29vcmRpbmF0ZSArPSAodGhpcy53aWR0aCgpIC0gY29vcmRpbmF0ZSArICh0aGlzLl9jb29yZGluYXRlc1tuZXdQb3NpdGlvbl0gfHwgMCkpIC8gMiAqIG11bHRpcGxpZXI7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjb29yZGluYXRlID0gdGhpcy5fY29vcmRpbmF0ZXNbbmV3UG9zaXRpb25dIHx8IDA7XHJcblx0XHR9XHJcblxyXG5cdFx0Y29vcmRpbmF0ZSA9IE1hdGguY2VpbChjb29yZGluYXRlKTtcclxuXHJcblx0XHRyZXR1cm4gY29vcmRpbmF0ZTtcclxuXHQgfVxyXG5cclxuICAvKipcclxuXHQgKiBDYWxjdWxhdGVzIHRoZSBzcGVlZCBmb3IgYSB0cmFuc2xhdGlvbi5cclxuXHQgKiBAcGFyYW0gZnJvbSBUaGUgYWJzb2x1dGUgcG9zaXRpb24gb2YgdGhlIHN0YXJ0IGl0ZW0uXHJcblx0ICogQHBhcmFtIHRvIFRoZSBhYnNvbHV0ZSBwb3NpdGlvbiBvZiB0aGUgdGFyZ2V0IGl0ZW0uXHJcblx0ICogQHBhcmFtIGZhY3RvciBbZmFjdG9yPXVuZGVmaW5lZF0gLSBUaGUgdGltZSBmYWN0b3IgaW4gbWlsbGlzZWNvbmRzLlxyXG5cdCAqIEByZXR1cm5zIFRoZSB0aW1lIGluIG1pbGxpc2Vjb25kcyBmb3IgdGhlIHRyYW5zbGF0aW9uLlxyXG5cdCAqL1xyXG4gIHByaXZhdGUgX2R1cmF0aW9uKGZyb206IG51bWJlciwgdG86IG51bWJlciwgZmFjdG9yPzogbnVtYmVyIHwgYm9vbGVhbik6IG51bWJlciB7XHJcblx0XHRpZiAoZmFjdG9yID09PSAwKSB7XHJcblx0XHRcdHJldHVybiAwO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBNYXRoLm1pbihNYXRoLm1heChNYXRoLmFicyh0byAtIGZyb20pLCAxKSwgNikgKiBNYXRoLmFicygoK2ZhY3RvciB8fCB0aGlzLnNldHRpbmdzLnNtYXJ0U3BlZWQpKTtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIFNsaWRlcyB0byB0aGUgc3BlY2lmaWVkIGl0ZW0uXHJcblx0ICogQHBhcmFtIHBvc2l0aW9uIFRoZSBwb3NpdGlvbiBvZiB0aGUgaXRlbS5cclxuXHQgKiBAcGFyYW0gc3BlZWQgVGhlIHRpbWUgaW4gbWlsbGlzZWNvbmRzIGZvciB0aGUgdHJhbnNpdGlvbi5cclxuXHQgKi9cclxuICB0byhwb3NpdGlvbjogbnVtYmVyLCBzcGVlZDogbnVtYmVyIHwgYm9vbGVhbikge1xyXG5cdFx0bGV0IGN1cnJlbnQgPSB0aGlzLmN1cnJlbnQoKSxcclxuXHRcdFx0cmV2ZXJ0ID0gbnVsbCxcclxuXHRcdFx0ZGlzdGFuY2UgPSBwb3NpdGlvbiAtIHRoaXMucmVsYXRpdmUoY3VycmVudCksXHJcblx0XHRcdG1heGltdW0gPSB0aGlzLm1heGltdW0oKTtcclxuXHRcdGNvbnN0XHRkaXJlY3Rpb24gPSArKGRpc3RhbmNlID4gMCkgLSArKGRpc3RhbmNlIDwgMCksXHJcblx0XHRcdGl0ZW1zID0gdGhpcy5faXRlbXMubGVuZ3RoLFxyXG5cdFx0XHRtaW5pbXVtID0gdGhpcy5taW5pbXVtKCk7XHJcblxyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3MubG9vcCkge1xyXG5cdFx0XHRpZiAoIXRoaXMuc2V0dGluZ3MucmV3aW5kICYmIE1hdGguYWJzKGRpc3RhbmNlKSA+IGl0ZW1zIC8gMikge1xyXG5cdFx0XHRcdGRpc3RhbmNlICs9IGRpcmVjdGlvbiAqIC0xICogaXRlbXM7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHBvc2l0aW9uID0gY3VycmVudCArIGRpc3RhbmNlO1xyXG5cdFx0XHRyZXZlcnQgPSAoKHBvc2l0aW9uIC0gbWluaW11bSkgJSBpdGVtcyArIGl0ZW1zKSAlIGl0ZW1zICsgbWluaW11bTtcclxuXHJcblx0XHRcdGlmIChyZXZlcnQgIT09IHBvc2l0aW9uICYmIHJldmVydCAtIGRpc3RhbmNlIDw9IG1heGltdW0gJiYgcmV2ZXJ0IC0gZGlzdGFuY2UgPiAwKSB7XHJcblx0XHRcdFx0Y3VycmVudCA9IHJldmVydCAtIGRpc3RhbmNlO1xyXG5cdFx0XHRcdHBvc2l0aW9uID0gcmV2ZXJ0O1xyXG5cdFx0XHRcdHRoaXMucmVzZXQoY3VycmVudCk7XHJcblx0XHRcdFx0dGhpcy5zZW5kQ2hhbmdlcygpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2UgaWYgKHRoaXMuc2V0dGluZ3MucmV3aW5kKSB7XHJcblx0XHRcdG1heGltdW0gKz0gMTtcclxuXHRcdFx0cG9zaXRpb24gPSAocG9zaXRpb24gJSBtYXhpbXVtICsgbWF4aW11bSkgJSBtYXhpbXVtO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cG9zaXRpb24gPSBNYXRoLm1heChtaW5pbXVtLCBNYXRoLm1pbihtYXhpbXVtLCBwb3NpdGlvbikpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHR0aGlzLnNwZWVkKHRoaXMuX2R1cmF0aW9uKGN1cnJlbnQsIHBvc2l0aW9uLCBzcGVlZCkpO1xyXG5cdFx0XHR0aGlzLmN1cnJlbnQocG9zaXRpb24pO1xyXG5cclxuXHRcdFx0dGhpcy51cGRhdGUoKTtcclxuXHRcdH0sIDApO1xyXG5cclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIFNsaWRlcyB0byB0aGUgbmV4dCBpdGVtLlxyXG5cdCAqIEBwYXJhbSBzcGVlZCBUaGUgdGltZSBpbiBtaWxsaXNlY29uZHMgZm9yIHRoZSB0cmFuc2l0aW9uLlxyXG5cdCAqL1xyXG4gIG5leHQoc3BlZWQ6IG51bWJlciB8IGJvb2xlYW4pIHtcclxuXHRcdHNwZWVkID0gc3BlZWQgfHwgZmFsc2U7XHJcblx0XHR0aGlzLnRvKHRoaXMucmVsYXRpdmUodGhpcy5jdXJyZW50KCkpICsgMSwgc3BlZWQpO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogU2xpZGVzIHRvIHRoZSBwcmV2aW91cyBpdGVtLlxyXG5cdCAqIEBwYXJhbSBzcGVlZCBUaGUgdGltZSBpbiBtaWxsaXNlY29uZHMgZm9yIHRoZSB0cmFuc2l0aW9uLlxyXG5cdCAqL1xyXG4gIHByZXYoc3BlZWQ6IG51bWJlciB8IGJvb2xlYW4pIHtcclxuXHRcdHNwZWVkID0gc3BlZWQgfHwgZmFsc2U7XHJcblx0XHR0aGlzLnRvKHRoaXMucmVsYXRpdmUodGhpcy5jdXJyZW50KCkpIC0gMSwgc3BlZWQpO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogSGFuZGxlcyB0aGUgZW5kIG9mIGFuIGFuaW1hdGlvbi5cclxuXHQgKiBAcGFyYW0gZXZlbnQgLSBUaGUgZXZlbnQgYXJndW1lbnRzLlxyXG5cdCAqL1xyXG4gIG9uVHJhbnNpdGlvbkVuZChldmVudD86IGFueSkge1xyXG5cdFx0Ly8gaWYgY3NzMiBhbmltYXRpb24gdGhlbiBldmVudCBvYmplY3QgaXMgdW5kZWZpbmVkXHJcblx0XHRpZiAoZXZlbnQgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHQvLyBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcblx0XHRcdC8vIC8vIENhdGNoIG9ubHkgb3dsLXN0YWdlIHRyYW5zaXRpb25FbmQgZXZlbnRcclxuXHRcdFx0Ly8gaWYgKChldmVudC50YXJnZXQgfHwgZXZlbnQuc3JjRWxlbWVudCB8fCBldmVudC5vcmlnaW5hbFRhcmdldCkgIT09IHRoaXMuJHN0YWdlLmdldCgwKVx0KSB7XHJcblx0XHRcdC8vIFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHQvLyB9XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHRcdHRoaXMubGVhdmUoJ2FuaW1hdGluZycpO1xyXG5cdFx0dGhpcy5fdHJpZ2dlcigndHJhbnNsYXRlZCcpO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogR2V0cyB2aWV3cG9ydCB3aWR0aC5cclxuXHQgKiBAcmV0dXJucyAtIFRoZSB3aWR0aCBpbiBwaXhlbC5cclxuXHQgKi9cclxuICBwcml2YXRlIF92aWV3cG9ydCgpOiBudW1iZXIge1xyXG5cdFx0bGV0IHdpZHRoO1xyXG5cdFx0aWYgKHRoaXMuX3dpZHRoKSB7XHJcblx0XHRcdHdpZHRoID0gdGhpcy5fd2lkdGg7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjb25zb2xlLndhcm4oJ0NhbiBub3QgZGV0ZWN0IHZpZXdwb3J0IHdpZHRoLicpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHdpZHRoO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogU2V0cyBfaXRlbXNcclxuXHQgKiBAcGFyYW0gY29udGVudCBUaGUgbGlzdCBvZiBzbGlkZXMgcHV0IGludG8gQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZXMuXHJcblx0ICovXHJcbiAgc2V0SXRlbXMoY29udGVudDogQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZVtdKSB7XHJcblx0XHR0aGlzLl9pdGVtcyA9IGNvbnRlbnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHNsaWRlc0RhdGEgdXNpbmcgdGhpcy5faXRlbXNcclxuXHQgKi9cclxuXHRwcml2YXRlIF9kZWZpbmVTbGlkZXNEYXRhKCkge1xyXG5cdFx0Ly8gTWF5YmUgY3JlYXRpbmcgYW5kIHVzaW5nIGxvYWRNYXAgd291bGQgYmUgYmV0dGVyIGluIExhenlMb2FkU2VydmljZS5cclxuXHRcdC8vIEhvdmV3ZXIgaW4gdGhhdCBjYXNlIHdoZW4gJ3Jlc2l6ZScgZXZlbnQgZmlyZXMsIHByb3AgJ2xvYWQnIG9mIGFsbCBzbGlkZXMgd2lsbCBnZXQgJ2ZhbHNlJyBhbmQgc3VjaCBzdGF0ZSBvZiBwcm9wIHdpbGwgYmUgc2VlbiBieSBWaWV3IGR1cmluZyBpdHMgdXBkYXRpbmcuIEFjY29yZGluZ2x5IHRoZSBjb2RlIHdpbGwgcmVtb3ZlIHNsaWRlcydzIGNvbnRlbnQgZnJvbSBET00gZXZlbiBpZiBpdCB3YXMgbG9hZGVkIGJlZm9yZS5cclxuXHRcdC8vIFRodXMgaXQgd291bGQgYmUgbmVlZGVkIHRvIGFkZCB0aGF0IGNvbnRlbnQgaW50byBET00gYWdhaW4uXHJcblx0XHQvLyBJbiBvcmRlciB0byBhdm9pZCBhZGRpdGlvbmFsIHJlbW92aW5nL2FkZGluZyBsb2FkZWQgc2xpZGVzJ3MgY29udGVudCB3ZSB1c2UgbG9hZE1hcCBoZXJlIGFuZCBzZXQgcmVzdG9yZSBzdGF0ZSBvZiBwcm9wICdsb2FkJyBiZWZvcmUgdGhlIFZpZXcgd2lsbCBnZXQgaXQuXHJcblx0XHRsZXQgbG9hZE1hcDogTWFwPHN0cmluZywgYm9vbGVhbj47XHJcblxyXG5cdFx0aWYgKHRoaXMuc2xpZGVzRGF0YSAmJiB0aGlzLnNsaWRlc0RhdGEubGVuZ3RoKSB7XHJcblx0XHRcdGxvYWRNYXAgPSBuZXcgTWFwKCk7XHJcblx0XHRcdHRoaXMuc2xpZGVzRGF0YS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG5cdFx0XHRcdGlmIChpdGVtLmxvYWQpIHtcclxuXHRcdFx0XHRcdGxvYWRNYXAuc2V0KGl0ZW0uaWQsIGl0ZW0ubG9hZCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2xpZGVzRGF0YSA9IHRoaXMuX2l0ZW1zLm1hcChzbGlkZSA9PiB7XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0aWQ6IGAke3NsaWRlLmlkfWAsXHJcblx0XHRcdFx0aXNBY3RpdmU6IGZhbHNlLFxyXG5cdFx0XHRcdHRwbFJlZjogc2xpZGUudHBsUmVmLFxyXG5cdFx0XHRcdGRhdGFNZXJnZTogc2xpZGUuZGF0YU1lcmdlLFxyXG5cdFx0XHRcdHdpZHRoOiAwLFxyXG5cdFx0XHRcdGlzQ2xvbmVkOiBmYWxzZSxcclxuXHRcdFx0XHRsb2FkOiBsb2FkTWFwID8gbG9hZE1hcC5nZXQoc2xpZGUuaWQpIDogZmFsc2UsXHJcblx0XHRcdFx0aGFzaEZyYWdtZW50OiBzbGlkZS5kYXRhSGFzaFxyXG5cdFx0XHR9O1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIGN1cnJlbnQgY2xhc3NlcyBmb3Igc2xpZGVcclxuXHQgKiBAcGFyYW0gc2xpZGUgU2xpZGUgb2YgY2Fyb3VzZWxcclxuXHQgKiBAcmV0dXJucyBvYmplY3Qgd2l0aCBuYW1lcyBvZiBjc3MtY2xhc3NlcyB3aGljaCBhcmUga2V5cyBhbmQgdHJ1ZS9mYWxzZSB2YWx1ZXNcclxuXHQgKi9cclxuXHRzZXRDdXJTbGlkZUNsYXNzZXMoc2xpZGU6IFNsaWRlTW9kZWwpOiB7W2tleTogc3RyaW5nXTogYm9vbGVhbn0ge1xyXG5cdFx0Ly8gQ1NTIGNsYXNzZXM6IGFkZGVkL3JlbW92ZWQgcGVyIGN1cnJlbnQgc3RhdGUgb2YgY29tcG9uZW50IHByb3BlcnRpZXNcclxuXHRcdGNvbnN0IGN1cnJlbnRDbGFzc2VzOiB7W2tleTogc3RyaW5nXTogYm9vbGVhbn0gPSAge1xyXG5cdFx0XHQnYWN0aXZlJzogc2xpZGUuaXNBY3RpdmUsXHJcblx0XHRcdCdjZW50ZXInOiBzbGlkZS5pc0NlbnRlcmVkLFxyXG5cdFx0XHQnY2xvbmVkJzogc2xpZGUuaXNDbG9uZWQsXHJcblx0XHRcdCdhbmltYXRlZCc6IHNsaWRlLmlzQW5pbWF0ZWQsXHJcblx0XHRcdCdvd2wtYW5pbWF0ZWQtaW4nOiBzbGlkZS5pc0RlZkFuaW1hdGVkSW4sXHJcblx0XHRcdCdvd2wtYW5pbWF0ZWQtb3V0Jzogc2xpZGUuaXNEZWZBbmltYXRlZE91dFxyXG5cdFx0fTtcclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLmFuaW1hdGVJbikge1xyXG5cdFx0XHRjdXJyZW50Q2xhc3Nlc1t0aGlzLnNldHRpbmdzLmFuaW1hdGVJbiBhcyBzdHJpbmddID0gc2xpZGUuaXNDdXN0b21BbmltYXRlZEluO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3MuYW5pbWF0ZU91dCkge1xyXG5cdFx0XHRjdXJyZW50Q2xhc3Nlc1t0aGlzLnNldHRpbmdzLmFuaW1hdGVPdXQgYXMgc3RyaW5nXSA9IHNsaWRlLmlzQ3VzdG9tQW5pbWF0ZWRPdXQ7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gY3VycmVudENsYXNzZXM7XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBPcGVyYXRvcnMgdG8gY2FsY3VsYXRlIHJpZ2h0LXRvLWxlZnQgYW5kIGxlZnQtdG8tcmlnaHQuXHJcblx0ICogQHBhcmFtIGEgLSBUaGUgbGVmdCBzaWRlIG9wZXJhbmQuXHJcblx0ICogQHBhcmFtIG8gLSBUaGUgb3BlcmF0b3IuXHJcblx0ICogQHBhcmFtIGIgLSBUaGUgcmlnaHQgc2lkZSBvcGVyYW5kLlxyXG5cdCAqIEByZXR1cm5zIHRydWUvZmFsc2UgbWVhbmluZyByaWdodC10by1sZWZ0IG9yIGxlZnQtdG8tcmlnaHRcclxuXHQgKi9cclxuICBwcml2YXRlIF9vcChhOiBudW1iZXIsIG86IHN0cmluZywgYjogbnVtYmVyKTogYm9vbGVhbiB7XHJcblx0XHRjb25zdCBydGwgPSB0aGlzLnNldHRpbmdzLnJ0bDtcclxuXHRcdHN3aXRjaCAobykge1xyXG5cdFx0XHRjYXNlICc8JzpcclxuXHRcdFx0XHRyZXR1cm4gcnRsID8gYSA+IGIgOiBhIDwgYjtcclxuXHRcdFx0Y2FzZSAnPic6XHJcblx0XHRcdFx0cmV0dXJuIHJ0bCA/IGEgPCBiIDogYSA+IGI7XHJcblx0XHRcdGNhc2UgJz49JzpcclxuXHRcdFx0XHRyZXR1cm4gcnRsID8gYSA8PSBiIDogYSA+PSBiO1xyXG5cdFx0XHRjYXNlICc8PSc6XHJcblx0XHRcdFx0cmV0dXJuIHJ0bCA/IGEgPj0gYiA6IGEgPD0gYjtcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIFRyaWdnZXJzIGEgcHVibGljIGV2ZW50LlxyXG5cdCAqIEB0b2RvIFJlbW92ZSBgc3RhdHVzYCwgYHJlbGF0ZWRUYXJnZXRgIHNob3VsZCBiZSB1c2VkIGluc3RlYWQuXHJcblx0ICogQHBhcmFtIG5hbWUgVGhlIGV2ZW50IG5hbWUuXHJcblx0ICogQHBhcmFtIGRhdGEgVGhlIGV2ZW50IGRhdGEuXHJcblx0ICogQHBhcmFtIG5hbWVzcGFjZSBUaGUgZXZlbnQgbmFtZXNwYWNlLlxyXG5cdCAqIEBwYXJhbSBzdGF0ZSBUaGUgc3RhdGUgd2hpY2ggaXMgYXNzb2NpYXRlZCB3aXRoIHRoZSBldmVudC5cclxuXHQgKiBAcGFyYW0gZW50ZXIgSW5kaWNhdGVzIGlmIHRoZSBjYWxsIGVudGVycyB0aGUgc3BlY2lmaWVkIHN0YXRlIG9yIG5vdC5cclxuXHQgKi9cclxuICBwcml2YXRlIF90cmlnZ2VyKG5hbWU6IHN0cmluZywgZGF0YT86IGFueSwgbmFtZXNwYWNlPzogc3RyaW5nLCBzdGF0ZT86IHN0cmluZywgZW50ZXI/OiBib29sZWFuKSB7XHJcblx0XHRzd2l0Y2ggKG5hbWUpIHtcclxuXHRcdFx0Y2FzZSAnaW5pdGlhbGl6ZWQnOlxyXG5cdFx0XHRcdHRoaXMuX2luaXRpYWxpemVkQ2Fyb3VzZWwkLm5leHQobmFtZSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ2NoYW5nZSc6XHJcblx0XHRcdFx0dGhpcy5fY2hhbmdlU2V0dGluZ3NDYXJvdXNlbCQubmV4dChkYXRhKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnY2hhbmdlZCc6XHJcblx0XHRcdFx0dGhpcy5fY2hhbmdlZFNldHRpbmdzQ2Fyb3VzZWwkLm5leHQoZGF0YSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ2RyYWcnOlxyXG5cdFx0XHRcdHRoaXMuX2RyYWdDYXJvdXNlbCQubmV4dChuYW1lKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnZHJhZ2dlZCc6XHJcblx0XHRcdFx0dGhpcy5fZHJhZ2dlZENhcm91c2VsJC5uZXh0KG5hbWUpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdyZXNpemUnOlxyXG5cdFx0XHRcdHRoaXMuX3Jlc2l6ZUNhcm91c2VsJC5uZXh0KG5hbWUpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdyZXNpemVkJzpcclxuXHRcdFx0XHR0aGlzLl9yZXNpemVkQ2Fyb3VzZWwkLm5leHQobmFtZSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ3JlZnJlc2gnOlxyXG5cdFx0XHRcdHRoaXMuX3JlZnJlc2hDYXJvdXNlbCQubmV4dChuYW1lKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAncmVmcmVzaGVkJzpcclxuXHRcdFx0XHR0aGlzLl9yZWZyZXNoZWRDYXJvdXNlbCQubmV4dChuYW1lKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAndHJhbnNsYXRlJzpcclxuXHRcdFx0XHR0aGlzLl90cmFuc2xhdGVDYXJvdXNlbCQubmV4dChuYW1lKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAndHJhbnNsYXRlZCc6XHJcblx0XHRcdFx0dGhpcy5fdHJhbnNsYXRlZENhcm91c2VsJC5uZXh0KG5hbWUpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEVudGVycyBhIHN0YXRlLlxyXG5cdCAqIEBwYXJhbSBuYW1lIC0gVGhlIHN0YXRlIG5hbWUuXHJcblx0ICovXHJcbiAgZW50ZXIobmFtZTogc3RyaW5nKSB7XHJcbiAgICBbIG5hbWUgXS5jb25jYXQodGhpcy5fc3RhdGVzLnRhZ3NbbmFtZV0gfHwgW10pLmZvckVhY2goKHN0YXRlTmFtZSkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5fc3RhdGVzLmN1cnJlbnRbc3RhdGVOYW1lXSA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0dGhpcy5fc3RhdGVzLmN1cnJlbnRbc3RhdGVOYW1lXSA9IDA7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuX3N0YXRlcy5jdXJyZW50W3N0YXRlTmFtZV0rKztcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG5cdCAqIExlYXZlcyBhIHN0YXRlLlxyXG5cdCAqIEBwYXJhbSBuYW1lIC0gVGhlIHN0YXRlIG5hbWUuXHJcblx0ICovXHJcblx0bGVhdmUobmFtZTogc3RyaW5nKSB7XHJcbiAgICBbIG5hbWUgXS5jb25jYXQodGhpcy5fc3RhdGVzLnRhZ3NbbmFtZV0gfHwgW10pLmZvckVhY2goKHN0YXRlTmFtZSkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5fc3RhdGVzLmN1cnJlbnRbc3RhdGVOYW1lXSA9PT0gMCB8fCAhIXRoaXMuX3N0YXRlcy5jdXJyZW50W3N0YXRlTmFtZV0pIHtcclxuICAgICAgICB0aGlzLl9zdGF0ZXMuY3VycmVudFtzdGF0ZU5hbWVdLS07XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcblx0ICogUmVnaXN0ZXJzIGFuIGV2ZW50IG9yIHN0YXRlLlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgLSBUaGUgZXZlbnQgb3Igc3RhdGUgdG8gcmVnaXN0ZXIuXHJcblx0ICovXHJcbiAgcmVnaXN0ZXIob2JqZWN0OiBhbnkpIHtcclxuXHRcdGlmIChvYmplY3QudHlwZSA9PT0gVHlwZS5TdGF0ZSkge1xyXG5cdFx0XHRpZiAoIXRoaXMuX3N0YXRlcy50YWdzW29iamVjdC5uYW1lXSkge1xyXG5cdFx0XHRcdHRoaXMuX3N0YXRlcy50YWdzW29iamVjdC5uYW1lXSA9IG9iamVjdC50YWdzO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuX3N0YXRlcy50YWdzW29iamVjdC5uYW1lXSA9IHRoaXMuX3N0YXRlcy50YWdzW29iamVjdC5uYW1lXS5jb25jYXQob2JqZWN0LnRhZ3MpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLl9zdGF0ZXMudGFnc1tvYmplY3QubmFtZV0gPSB0aGlzLl9zdGF0ZXMudGFnc1tvYmplY3QubmFtZV0uZmlsdGVyKCh0YWcsIGkpID0+IHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5fc3RhdGVzLnRhZ3Nbb2JqZWN0Lm5hbWVdLmluZGV4T2YodGFnKSA9PT0gaTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBTdXBwcmVzc2VzIGV2ZW50cy5cclxuXHQgKiBAcGFyYW0gZXZlbnRzIFRoZSBldmVudHMgdG8gc3VwcHJlc3MuXHJcblx0ICovXHJcbiAgcHJpdmF0ZSBfc3VwcHJlc3MoZXZlbnRzOiBzdHJpbmdbXSkge1xyXG5cdFx0ZXZlbnRzLmZvckVhY2goZXZlbnQgPT4ge1xyXG5cdFx0XHR0aGlzLl9zdXByZXNzW2V2ZW50XSA9IHRydWU7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIFJlbGVhc2VzIHN1cHByZXNzZWQgZXZlbnRzLlxyXG5cdCAqIEBwYXJhbSBldmVudHMgVGhlIGV2ZW50cyB0byByZWxlYXNlLlxyXG5cdCAqL1xyXG4gIHByaXZhdGUgX3JlbGVhc2UoZXZlbnRzOiBzdHJpbmdbXSkge1xyXG5cdFx0ZXZlbnRzLmZvckVhY2goZXZlbnQgPT4ge1xyXG5cdFx0XHRkZWxldGUgdGhpcy5fc3VwcmVzc1tldmVudF07XHJcblx0XHR9KTtcclxuXHQgfVxyXG5cclxuICAvKipcclxuXHQgKiBHZXRzIHVuaWZpZWQgcG9pbnRlciBjb29yZGluYXRlcyBmcm9tIGV2ZW50LlxyXG5cdCAqIEB0b2RvICMyNjFcclxuXHQgKiBAcGFyYW0gZXZlbnQgVGhlIGBtb3VzZWRvd25gIG9yIGB0b3VjaHN0YXJ0YCBldmVudC5cclxuXHQgKiBAcmV0dXJucyBPYmplY3QgQ29vcmRzIHdoaWNoIGNvbnRhaW5zIGB4YCBhbmQgYHlgIGNvb3JkaW5hdGVzIG9mIGN1cnJlbnQgcG9pbnRlciBwb3NpdGlvbi5cclxuXHQgKi9cclxuXHRwb2ludGVyKGV2ZW50OiBhbnkpOiBDb29yZHMge1xyXG5cdFx0Y29uc3QgcmVzdWx0ID0geyB4OiBudWxsLCB5OiBudWxsIH07XHJcblxyXG5cdFx0ZXZlbnQgPSBldmVudC5vcmlnaW5hbEV2ZW50IHx8IGV2ZW50IHx8IHdpbmRvdy5ldmVudDtcclxuXHJcblx0XHRldmVudCA9IGV2ZW50LnRvdWNoZXMgJiYgZXZlbnQudG91Y2hlcy5sZW5ndGggP1xyXG5cdFx0XHRldmVudC50b3VjaGVzWzBdIDogZXZlbnQuY2hhbmdlZFRvdWNoZXMgJiYgZXZlbnQuY2hhbmdlZFRvdWNoZXMubGVuZ3RoID9cclxuXHRcdFx0XHRldmVudC5jaGFuZ2VkVG91Y2hlc1swXSA6IGV2ZW50O1xyXG5cclxuXHRcdGlmIChldmVudC5wYWdlWCkge1xyXG5cdFx0XHRyZXN1bHQueCA9IGV2ZW50LnBhZ2VYO1xyXG5cdFx0XHRyZXN1bHQueSA9IGV2ZW50LnBhZ2VZO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmVzdWx0LnggPSBldmVudC5jbGllbnRYO1xyXG5cdFx0XHRyZXN1bHQueSA9IGV2ZW50LmNsaWVudFk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHQgfVxyXG5cclxuICAvKipcclxuXHQgKiBEZXRlcm1pbmVzIGlmIHRoZSBpbnB1dCBpcyBhIE51bWJlciBvciBzb21ldGhpbmcgdGhhdCBjYW4gYmUgY29lcmNlZCB0byBhIE51bWJlclxyXG5cdCAqIEBwYXJhbSBudW1iZXIgVGhlIGlucHV0IHRvIGJlIHRlc3RlZFxyXG5cdCAqIEByZXR1cm5zIEFuIGluZGljYXRpb24gaWYgdGhlIGlucHV0IGlzIGEgTnVtYmVyIG9yIGNhbiBiZSBjb2VyY2VkIHRvIGEgTnVtYmVyXHJcblx0ICovXHJcbiAgcHJpdmF0ZSBfaXNOdW1lcmljKG51bWJlcjogYW55KTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQobnVtYmVyKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdmFsdWUgaXMgbnVtYmVyIG9yIGJvb2xlYW4gdHlwZVxyXG5cdCAqIEBwYXJhbSB2YWx1ZSBUaGUgaW5wdXQgdG8gYmUgdGVzdGVkXHJcblx0ICogQHJldHVybnMgQW4gaW5kaWNhdGlvbiBpZiB0aGUgaW5wdXQgaXMgYSBOdW1iZXIgb3IgY2FuIGJlIGNvZXJjZWQgdG8gYSBOdW1iZXIsIG9yIEJvb2xlYW5cclxuXHQgKi9cclxuXHRwcml2YXRlIF9pc051bWJlck9yQm9vbGVhbih2YWx1ZTogbnVtYmVyIHwgYm9vbGVhbik6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2lzTnVtZXJpYyh2YWx1ZSkgfHwgdHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbic7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdmFsdWUgaXMgbnVtYmVyIG9yIHN0cmluZyB0eXBlXHJcblx0ICogQHBhcmFtIHZhbHVlIFRoZSBpbnB1dCB0byBiZSB0ZXN0ZWRcclxuXHQgKiBAcmV0dXJucyBBbiBpbmRpY2F0aW9uIGlmIHRoZSBpbnB1dCBpcyBhIE51bWJlciBvciBjYW4gYmUgY29lcmNlZCB0byBhIE51bWJlciwgb3IgU3RyaW5nXHJcblx0ICovXHJcblx0cHJpdmF0ZSBfaXNOdW1iZXJPclN0cmluZyh2YWx1ZTogbnVtYmVyIHwgc3RyaW5nKTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gdGhpcy5faXNOdW1lcmljKHZhbHVlKSB8fCB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRGV0ZXJtaW5lcyB3aGV0aGVyIHZhbHVlIGlzIG51bWJlciBvciBzdHJpbmcgdHlwZVxyXG5cdCAqIEBwYXJhbSB2YWx1ZSBUaGUgaW5wdXQgdG8gYmUgdGVzdGVkXHJcblx0ICogQHJldHVybnMgQW4gaW5kaWNhdGlvbiBpZiB0aGUgaW5wdXQgaXMgYSBOdW1iZXIgb3IgY2FuIGJlIGNvZXJjZWQgdG8gYSBOdW1iZXIsIG9yIFN0cmluZ1xyXG5cdCAqL1xyXG5cdHByaXZhdGUgX2lzU3RyaW5nT3JCb29sZWFuKHZhbHVlOiBudW1iZXIgfCBzdHJpbmcpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogR2V0cyB0aGUgZGlmZmVyZW5jZSBvZiB0d28gdmVjdG9ycy5cclxuXHQgKiBAdG9kbyAjMjYxXHJcblx0ICogQHBhcmFtIGZpcnN0IFRoZSBmaXJzdCB2ZWN0b3IuXHJcblx0ICogQHBhcmFtIHNlY29uZC0gVGhlIHNlY29uZCB2ZWN0b3IuXHJcblx0ICogQHJldHVybnMgVGhlIGRpZmZlcmVuY2UuXHJcblx0ICovXHJcbiAgZGlmZmVyZW5jZShmaXJzdDogQ29vcmRzLCBzZWNvbmQ6IENvb3Jkcyk6IENvb3JkcyB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHR4OiBmaXJzdC54IC0gc2Vjb25kLngsXHJcblx0XHRcdHk6IGZpcnN0LnkgLSBzZWNvbmQueVxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOYXZEYXRhLCBEb3RzRGF0YSB9IGZyb20gJy4uL21vZGVscy9uYXZpZ2F0aW9uLWRhdGEubW9kZWxzJztcclxuaW1wb3J0IHsgQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZSB9IGZyb20gJy4uL2Nhcm91c2VsL2Nhcm91c2VsLm1vZHVsZSc7XHJcbmltcG9ydCB7IENhcm91c2VsU2VydmljZSB9IGZyb20gJy4vY2Fyb3VzZWwuc2VydmljZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgT2JzZXJ2YWJsZSwgbWVyZ2UgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgdGFwLCBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IE93bE9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbHMvb3dsLW9wdGlvbnMubW9kZWwnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgTmF2aWdhdGlvblNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlvcHRpb24gdG8gbWVyZ2UgT2JzZXJ2YWJsZSAgZnJvbSBDYXJvdXNlbFNlcnZpY2VcclxuICAgKi9cclxuICBuYXZTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHBsdWdpbiBpcyBpbml0aWFsaXplZCBvciBub3QuXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIF9pbml0aWFsaXplZCA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgY3VycmVudCBwYWdpbmcgaW5kZXhlcy5cclxuICAgKi9cclxuICBwcm90ZWN0ZWQgX3BhZ2VzOiBhbnlbXSA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiBEYXRhIGZvciBuYXZpZ2F0aW9uIGVsZW1lbnRzIG9mIHRoZSB1c2VyIGludGVyZmFjZS5cclxuICAgKi9cclxuICBwcm90ZWN0ZWQgX25hdkRhdGE6IE5hdkRhdGEgPSB7XHJcbiAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICBwcmV2OiB7XHJcbiAgICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgICAgaHRtbFRleHQ6ICcnXHJcbiAgICB9LFxyXG4gICAgbmV4dDoge1xyXG4gICAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICAgIGh0bWxUZXh0OiAnJ1xyXG4gICAgfSxcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBEYXRhIGZvciBkb3QgZWxlbWVudHMgb2YgdGhlIHVzZXIgaW50ZXJmYWNlLlxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBfZG90c0RhdGE6IERvdHNEYXRhID0ge1xyXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgZG90czogW11cclxuICB9O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhcm91c2VsU2VydmljZTogQ2Fyb3VzZWxTZXJ2aWNlKSB7XHJcbiAgICB0aGlzLnNweURhdGFTdHJlYW1zKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMubmF2U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZWZpbmVzIE9ic2VydmFibGVzIHdoaWNoIHNlcnZpY2UgbXVzdCBvYnNlcnZlXHJcbiAgICovXHJcbiAgc3B5RGF0YVN0cmVhbXMoKSB7XHJcbiAgICBjb25zdCBpbml0aWFsaXplZENhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0SW5pdGlhbGl6ZWRTdGF0ZSgpLnBpcGUoXHJcbiAgICAgIHRhcChzdGF0ZSA9PiB7XHJcbiAgICAgICAgdGhpcy5pbml0aWFsaXplKCk7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlTmF2UGFnZXMoKTtcclxuICAgICAgICB0aGlzLmRyYXcoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNlbmRDaGFuZ2VzKCk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIC8vIG1vc3RseSBjaGFuZ2VzIGluIGNhcm91c2VsU2VydmljZSBhbmQgY2Fyb3VzZWwgYXQgYWxsIGNhdXNlcyBjYXJvdXNlbFNlcnZpY2UudG8oKS4gSXQgbW92ZXMgc3RhZ2UgcmlnaHQtbGVmdCBieSBpdHMgY29kZSBhbmQgY2FsbGluZyBuZWVkZWQgZnVuY3Rpb25zXHJcbiAgICAvLyBUaHVzIHRoaXMgbWV0aG9kIGJ5IGNhbGxpbmcgY2Fyb3VzZWxTZXJ2aWNlLmN1cnJlbnQocG9zaXRpb24pIG5vdGlmaWVzIGFib3V0IGNoYW5nZXNcclxuICAgIGNvbnN0IGNoYW5nZWRTZXR0aW5ncyQ6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldENoYW5nZWRTdGF0ZSgpLnBpcGUoXHJcbiAgICAgIGZpbHRlcihkYXRhID0+IGRhdGEucHJvcGVydHkubmFtZSA9PT0gJ3Bvc2l0aW9uJyksXHJcbiAgICAgIHRhcChkYXRhID0+IHtcclxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgICAgIC8vIHNob3VsZCBiZSB0aGUgY2FsbCBvZiB0aGUgZnVuY3Rpb24gd3JpdHRlbiBhdCB0aGUgZW5kIG9mIGNvbW1lbnRcclxuICAgICAgICAvLyBidXQgdGhlIG1ldGhvZCBjYXJvdXNlbFNlcnZpdmUudG8oKSBoYXMgc2V0VGltZW91dChmLCAwKSB3aGljaCBjb250YWlucyBjYXJvdXNlbFNlcnZpdmUudXBkYXRlKCkgd2hpY2ggY2FsbHMgc2VuZENoYW5nZXMoKSBtZXRob2QuXHJcbiAgICAgICAgLy8gY2Fyb3VzZWxTZXJ2aWNlLm5hdkRhdGEgYW5kIGNhcm91c2VsU2VydmljZS5kb3RzRGF0YSB1cGRhdGUgZWFybGllciB0aGFuIGNhcm91c2VsU2Vydml2ZS51cGRhdGUoKSBnZXRzIGNhbGxlZFxyXG4gICAgICAgIC8vIHVwZGF0ZXMgb2YgY2Fyb3VzZWxTZXJ2aWNlLm5hdkRhdGEgYW5kIGNhcm91c2VsU2VydmljZS5kb3RzRGF0YSBhcmUgYmVpbmcgaGFwcGVuaW5nIHdpdGhpbmcgY2Fyb3VzZWxTZXJ2aWNlLmN1cnJlbnQocG9zaXRpb24pIG1ldGhvZCB3aGljaCBjYWxscyBuZXh0KCkgb2YgX2NoYW5nZWRTZXR0aW5nc0Nhcm91c2VsJFxyXG4gICAgICAgIC8vIGNhcm91c2VsU2VydmljZS5jdXJyZW50KHBvc2l0aW9uKSBpcyBiZWluZyBjYWxsaW5nIGVhcmxpZXIgdGhhbiBjYXJvdXNlbFNlcnZpdmUudXBkYXRlKCk7XHJcbiAgICAgICAgLy8gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2VuZENoYW5nZXMoKTtcclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgcmVmcmVzaGVkQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRSZWZyZXNoZWRTdGF0ZSgpLnBpcGUoXHJcbiAgICAgIHRhcCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlTmF2UGFnZXMoKTtcclxuICAgICAgICB0aGlzLmRyYXcoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNlbmRDaGFuZ2VzKCk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IG5hdk1lcmdlJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gbWVyZ2UoaW5pdGlhbGl6ZWRDYXJvdXNlbCQsIGNoYW5nZWRTZXR0aW5ncyQsIHJlZnJlc2hlZENhcm91c2VsJCk7XHJcbiAgICB0aGlzLm5hdlN1YnNjcmlwdGlvbiA9IG5hdk1lcmdlJC5zdWJzY3JpYmUoXHJcbiAgICAgICgpID0+IHt9XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcblx0ICogSW5pdGlhbGl6ZXMgdGhlIGxheW91dCBvZiB0aGUgcGx1Z2luIGFuZCBleHRlbmRzIHRoZSBjYXJvdXNlbC5cclxuXHQgKi9cclxuXHRpbml0aWFsaXplKCkge1xyXG4gICAgdGhpcy5fbmF2RGF0YS5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICB0aGlzLl9uYXZEYXRhLnByZXYuaHRtbFRleHQgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5uYXZUZXh0WzBdO1xyXG4gICAgdGhpcy5fbmF2RGF0YS5uZXh0Lmh0bWxUZXh0ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MubmF2VGV4dFsxXTtcclxuXHJcbiAgICB0aGlzLl9kb3RzRGF0YS5kaXNhYmxlZCA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UubmF2RGF0YSA9IHRoaXMuX25hdkRhdGE7XHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5kb3RzRGF0YSA9IHRoaXMuX2RvdHNEYXRhO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsY3VsYXRlcyBpbnRlcm5hbCBzdGF0ZXMgYW5kIHVwZGF0ZXMgcHJvcCBfcGFnZXNcclxuICAgKi9cclxuXHRwcml2YXRlIF91cGRhdGVOYXZQYWdlcygpIHtcclxuXHRcdGxldCBpOiBudW1iZXIsIGo6IG51bWJlciwgazogbnVtYmVyO1xyXG5cdFx0Y29uc3QgbG93ZXI6IG51bWJlciA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmNsb25lcygpLmxlbmd0aCAvIDIsXHJcbiAgICAgIHVwcGVyOiBudW1iZXIgPSBsb3dlciArIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLml0ZW1zKCkubGVuZ3RoLFxyXG4gICAgICBtYXhpbXVtOiBudW1iZXIgPSB0aGlzLmNhcm91c2VsU2VydmljZS5tYXhpbXVtKHRydWUpLFxyXG4gICAgICBwYWdlczogYW55W10gPSBbXSxcclxuICAgICAgc2V0dGluZ3M6IE93bE9wdGlvbnMgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncztcclxuICAgICBsZXQgc2l6ZSA9IHNldHRpbmdzLmNlbnRlciB8fCBzZXR0aW5ncy5hdXRvV2lkdGggfHwgc2V0dGluZ3MuZG90c0RhdGFcclxuICAgICAgICA/IDEgOiBzZXR0aW5ncy5kb3RzRWFjaCB8fCBzZXR0aW5ncy5pdGVtcztcclxuICAgICAgc2l6ZSA9ICtzaXplO1xyXG5cdFx0aWYgKHNldHRpbmdzLnNsaWRlQnkgIT09ICdwYWdlJykge1xyXG5cdFx0XHRzZXR0aW5ncy5zbGlkZUJ5ID0gTWF0aC5taW4oK3NldHRpbmdzLnNsaWRlQnksIHNldHRpbmdzLml0ZW1zKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoc2V0dGluZ3MuZG90cyB8fCBzZXR0aW5ncy5zbGlkZUJ5ID09PSAncGFnZScpIHtcclxuXHJcblx0XHRcdGZvciAoaSA9IGxvd2VyLCBqID0gMCwgayA9IDA7IGkgPCB1cHBlcjsgaSsrKSB7XHJcblx0XHRcdFx0aWYgKGogPj0gc2l6ZSB8fCBqID09PSAwKSB7XHJcblx0XHRcdFx0XHRwYWdlcy5wdXNoKHtcclxuXHRcdFx0XHRcdFx0c3RhcnQ6IE1hdGgubWluKG1heGltdW0sIGkgLSBsb3dlciksXHJcblx0XHRcdFx0XHRcdGVuZDogaSAtIGxvd2VyICsgc2l6ZSAtIDFcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0aWYgKE1hdGgubWluKG1heGltdW0sIGkgLSBsb3dlcikgPT09IG1heGltdW0pIHtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRqID0gMCwgKytrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRqICs9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm1lcmdlcnModGhpcy5jYXJvdXNlbFNlcnZpY2UucmVsYXRpdmUoaSkpIGFzIG51bWJlcjtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0dGhpcy5fcGFnZXMgPSBwYWdlcztcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIERyYXdzIHRoZSB1c2VyIGludGVyZmFjZS5cclxuXHQgKiBAdG9kbyBUaGUgb3B0aW9uIGBkb3RzRGF0YWAgd29udCB3b3JrLlxyXG5cdCAqL1xyXG4gIGRyYXcoKSB7XHJcblx0XHRsZXQgZGlmZmVyZW5jZTogbnVtYmVyO1xyXG4gICAgY29uc3RcdHNldHRpbmdzOiBPd2xPcHRpb25zID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MsXHJcbiAgICAgIGl0ZW1zOiBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlW10gPSB0aGlzLmNhcm91c2VsU2VydmljZS5pdGVtcygpLFxyXG4gICAgICBkaXNhYmxlZCA9IGl0ZW1zLmxlbmd0aCA8PSBzZXR0aW5ncy5pdGVtcztcclxuXHJcblx0XHR0aGlzLl9uYXZEYXRhLmRpc2FibGVkID0gIXNldHRpbmdzLm5hdiB8fCBkaXNhYmxlZDtcclxuXHRcdHRoaXMuX2RvdHNEYXRhLmRpc2FibGVkID0gIXNldHRpbmdzLmRvdHMgfHwgZGlzYWJsZWQ7XHJcblxyXG5cdFx0aWYgKHNldHRpbmdzLmRvdHMpIHtcclxuXHRcdFx0ZGlmZmVyZW5jZSA9IHRoaXMuX3BhZ2VzLmxlbmd0aCAtIHRoaXMuX2RvdHNEYXRhLmRvdHMubGVuZ3RoO1xyXG5cclxuXHRcdFx0aWYgKHNldHRpbmdzLmRvdHNEYXRhICYmIGRpZmZlcmVuY2UgIT09IDApIHtcclxuICAgICAgICB0aGlzLl9kb3RzRGF0YS5kb3RzID0gW107XHJcbiAgICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgIHRoaXMuX2RvdHNEYXRhLmRvdHMucHVzaCh7XHJcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGlkOiBgZG90LSR7aXRlbS5pZH1gLFxyXG4gICAgICAgICAgICBpbm5lckNvbnRlbnQ6IGl0ZW0uZG90Q29udGVudCxcclxuICAgICAgICAgICAgc2hvd0lubmVyQ29udGVudDogdHJ1ZVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblx0XHRcdH0gZWxzZSBpZiAoZGlmZmVyZW5jZSA+IDApIHtcclxuICAgICAgICBjb25zdCBzdGFydEk6IG51bWJlciA9IHRoaXMuX2RvdHNEYXRhLmRvdHMubGVuZ3RoID4gMCA/IHRoaXMuX2RvdHNEYXRhLmRvdHMubGVuZ3RoIDogMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpZmZlcmVuY2U7IGkrKykge1xyXG4gICAgICAgICAgdGhpcy5fZG90c0RhdGEuZG90cy5wdXNoKHtcclxuICAgICAgICAgICAgYWN0aXZlOiBmYWxzZSxcclxuICAgICAgICAgICAgaWQ6IGBkb3QtJHtpICsgc3RhcnRJfWAsXHJcbiAgICAgICAgICAgIHNob3dJbm5lckNvbnRlbnQ6IGZhbHNlXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblx0XHRcdH0gZWxzZSBpZiAoZGlmZmVyZW5jZSA8IDApIHtcclxuICAgICAgICB0aGlzLl9kb3RzRGF0YS5kb3RzLnNwbGljZShkaWZmZXJlbmNlLCBNYXRoLmFicyhkaWZmZXJlbmNlKSlcclxuXHRcdFx0fVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm5hdkRhdGEgPSB0aGlzLl9uYXZEYXRhO1xyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UuZG90c0RhdGEgPSB0aGlzLl9kb3RzRGF0YTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGVzIG5hdmlnYXRpb24gYnV0dG9ucydzIGFuZCBkb3RzJ3Mgc3RhdGVzXHJcbiAgICovXHJcbiAgdXBkYXRlKCkge1xyXG4gICAgdGhpcy5fdXBkYXRlTmF2QnV0dG9ucygpO1xyXG4gICAgdGhpcy5fdXBkYXRlRG90cygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hhbmdlcyBzdGF0ZSBvZiBuYXYgYnV0dG9ucyAoZGlzYWJsZWQsIGVuYWJsZWQpXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfdXBkYXRlTmF2QnV0dG9ucygpIHtcclxuICAgIGNvbnN0XHRzZXR0aW5nczogT3dsT3B0aW9ucyA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLFxyXG4gICAgICBsb29wOiBib29sZWFuID0gc2V0dGluZ3MubG9vcCB8fCBzZXR0aW5ncy5yZXdpbmQsXHJcbiAgICAgIGluZGV4OiBudW1iZXIgPSB0aGlzLmNhcm91c2VsU2VydmljZS5yZWxhdGl2ZSh0aGlzLmNhcm91c2VsU2VydmljZS5jdXJyZW50KCkpO1xyXG5cclxuICAgIGlmIChzZXR0aW5ncy5uYXYpIHtcclxuICAgICAgdGhpcy5fbmF2RGF0YS5wcmV2LmRpc2FibGVkID0gIWxvb3AgJiYgaW5kZXggPD0gdGhpcy5jYXJvdXNlbFNlcnZpY2UubWluaW11bSh0cnVlKTtcclxuXHRcdFx0dGhpcy5fbmF2RGF0YS5uZXh0LmRpc2FibGVkID0gIWxvb3AgJiYgaW5kZXggPj0gdGhpcy5jYXJvdXNlbFNlcnZpY2UubWF4aW11bSh0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5uYXZEYXRhID0gdGhpcy5fbmF2RGF0YTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoYW5nZXMgYWN0aXZlIGRvdCBpZiBwYWdlIGJlY29tZXMgY2hhbmdlZFxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3VwZGF0ZURvdHMoKSB7XHJcbiAgICBsZXQgY3VyQWN0aXZlRG90STogbnVtYmVyO1xyXG4gICAgdGhpcy5fZG90c0RhdGEuZG90cy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICBpZiAoaXRlbS5hY3RpdmUgPT09IHRydWUpIHtcclxuICAgICAgICBpdGVtLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIGN1ckFjdGl2ZURvdEkgPSB0aGlzLl9jdXJyZW50KCk7XHJcbiAgICBpZiAodGhpcy5fZG90c0RhdGEuZG90cy5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5fZG90c0RhdGEuZG90c1tjdXJBY3RpdmVEb3RJXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UuZG90c0RhdGEgPSB0aGlzLl9kb3RzRGF0YTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEdldHMgdGhlIGN1cnJlbnQgcGFnZSBwb3NpdGlvbiBvZiB0aGUgY2Fyb3VzZWwuXHJcblx0ICogQHJldHVybnMgdGhlIGN1cnJlbnQgcGFnZSBwb3NpdGlvbiBvZiB0aGUgY2Fyb3VzZWxcclxuXHQgKi9cclxuXHRwcml2YXRlIF9jdXJyZW50KCk6IGFueSB7XHJcbiAgICBjb25zdCBjdXJyZW50OiBudW1iZXIgPSB0aGlzLmNhcm91c2VsU2VydmljZS5yZWxhdGl2ZSh0aGlzLmNhcm91c2VsU2VydmljZS5jdXJyZW50KCkpO1xyXG4gICAgbGV0IGZpbmFsQ3VycmVudDogbnVtYmVyO1xyXG4gICAgY29uc3QgcGFnZXM6IGFueSA9IHRoaXMuX3BhZ2VzLmZpbHRlcigocGFnZSwgaW5kZXgpID0+IHtcclxuICAgICAgcmV0dXJuIHBhZ2Uuc3RhcnQgPD0gY3VycmVudCAmJiBwYWdlLmVuZCA+PSBjdXJyZW50O1xyXG4gICAgfSkucG9wKCk7XHJcblxyXG4gICAgZmluYWxDdXJyZW50ID0gdGhpcy5fcGFnZXMuZmluZEluZGV4KHBhZ2UgPT4ge1xyXG4gICAgICByZXR1cm4gcGFnZS5zdGFydCA9PT0gcGFnZXMuc3RhcnQgJiYgcGFnZS5lbmQgPT09IHBhZ2VzLmVuZDtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBmaW5hbEN1cnJlbnQ7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcblx0ICogR2V0cyB0aGUgY3VycmVudCBzdWNjZXNvci9wcmVkZWNlc3NvciBwb3NpdGlvbi5cclxuICAgKiBAcGFyYW0gc3Vzc2Vzc29yIHBvc2l0aW9uIG9mIHNsaWRlXHJcblx0ICogQHJldHVybnMgdGhlIGN1cnJlbnQgc3VjY2Vzb3IvcHJlZGVjZXNzb3IgcG9zaXRpb25cclxuXHQgKi9cclxuXHRwcml2YXRlIF9nZXRQb3NpdGlvbihzdWNjZXNzb3I6IG51bWJlciB8IGJvb2xlYW4pOiBudW1iZXIge1xyXG5cdFx0bGV0IHBvc2l0aW9uOiBudW1iZXIsIGxlbmd0aDogbnVtYmVyO1xyXG5cdFx0Y29uc3RcdHNldHRpbmdzOiBPd2xPcHRpb25zID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3M7XHJcblxyXG5cdFx0aWYgKHNldHRpbmdzLnNsaWRlQnkgPT09ICdwYWdlJykge1xyXG5cdFx0XHRwb3NpdGlvbiA9IHRoaXMuX2N1cnJlbnQoKTtcclxuXHRcdFx0bGVuZ3RoID0gdGhpcy5fcGFnZXMubGVuZ3RoO1xyXG5cdFx0XHRzdWNjZXNzb3IgPyArK3Bvc2l0aW9uIDogLS1wb3NpdGlvbjtcclxuXHRcdFx0cG9zaXRpb24gPSB0aGlzLl9wYWdlc1soKHBvc2l0aW9uICUgbGVuZ3RoKSArIGxlbmd0aCkgJSBsZW5ndGhdLnN0YXJ0O1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cG9zaXRpb24gPSB0aGlzLmNhcm91c2VsU2VydmljZS5yZWxhdGl2ZSh0aGlzLmNhcm91c2VsU2VydmljZS5jdXJyZW50KCkpO1xyXG5cdFx0XHRsZW5ndGggPSB0aGlzLmNhcm91c2VsU2VydmljZS5pdGVtcygpLmxlbmd0aDtcclxuXHRcdFx0c3VjY2Vzc29yID8gcG9zaXRpb24gKz0gK3NldHRpbmdzLnNsaWRlQnkgOiBwb3NpdGlvbiAtPSArc2V0dGluZ3Muc2xpZGVCeTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcG9zaXRpb247XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcblx0ICogU2xpZGVzIHRvIHRoZSBuZXh0IGl0ZW0gb3IgcGFnZS5cclxuXHQgKiBAcGFyYW0gc3BlZWQgVGhlIHRpbWUgaW4gbWlsbGlzZWNvbmRzIGZvciB0aGUgdHJhbnNpdGlvbi5cclxuXHQgKi9cclxuXHRuZXh0KHNwZWVkOiBudW1iZXIgfCBib29sZWFuKSB7XHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS50byh0aGlzLl9nZXRQb3NpdGlvbih0cnVlKSwgc3BlZWQpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNsaWRlcyB0byB0aGUgcHJldmlvdXMgaXRlbSBvciBwYWdlLlxyXG5cdCAqIEBwYXJhbSBzcGVlZCBUaGUgdGltZSBpbiBtaWxsaXNlY29uZHMgZm9yIHRoZSB0cmFuc2l0aW9uLlxyXG5cdCAqL1xyXG5cdHByZXYoc3BlZWQ6IG51bWJlciB8IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnRvKHRoaXMuX2dldFBvc2l0aW9uKGZhbHNlKSwgc3BlZWQpO1xyXG4gIH07XHJcblxyXG4gXHQvKipcclxuXHQgKiBTbGlkZXMgdG8gdGhlIHNwZWNpZmllZCBpdGVtIG9yIHBhZ2UuXHJcblx0ICogQHBhcmFtIHBvc2l0aW9uIC0gVGhlIHBvc2l0aW9uIG9mIHRoZSBpdGVtIG9yIHBhZ2UuXHJcblx0ICogQHBhcmFtIHNwZWVkIC0gVGhlIHRpbWUgaW4gbWlsbGlzZWNvbmRzIGZvciB0aGUgdHJhbnNpdGlvbi5cclxuXHQgKiBAcGFyYW0gc3RhbmRhcmQgLSBXaGV0aGVyIHRvIHVzZSB0aGUgc3RhbmRhcmQgYmVoYXZpb3VyIG9yIG5vdC4gRGVmYXVsdCBtZWFuaW5nIGZhbHNlXHJcblx0ICovXHJcblx0dG8ocG9zaXRpb246IG51bWJlciwgc3BlZWQ6IG51bWJlciB8IGJvb2xlYW4sIHN0YW5kYXJkPzogYm9vbGVhbikge1xyXG5cdFx0bGV0IGxlbmd0aDogbnVtYmVyO1xyXG5cdFx0aWYgKCFzdGFuZGFyZCAmJiB0aGlzLl9wYWdlcy5sZW5ndGgpIHtcclxuICAgICAgbGVuZ3RoID0gdGhpcy5fcGFnZXMubGVuZ3RoO1xyXG4gICAgICB0aGlzLmNhcm91c2VsU2VydmljZS50byh0aGlzLl9wYWdlc1soKHBvc2l0aW9uICUgbGVuZ3RoKSArIGxlbmd0aCkgJSBsZW5ndGhdLnN0YXJ0LCBzcGVlZCk7XHJcblx0XHR9IGVsc2Uge1xyXG4gICAgICB0aGlzLmNhcm91c2VsU2VydmljZS50byhwb3NpdGlvbiwgc3BlZWQpO1xyXG5cdFx0fVxyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIE1vdmVzIGNhcm91c2VsIGFmdGVyIHVzZXIncyBjbGlja2luZyBvbiBhbnkgZG90c1xyXG4gICAqL1xyXG4gIG1vdmVCeURvdChkb3RJZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBpbmRleDogbnVtYmVyID0gdGhpcy5fZG90c0RhdGEuZG90cy5maW5kSW5kZXgoZG90ID0+IGRvdElkID09PSBkb3QuaWQpO1xyXG4gICAgdGhpcy50byhpbmRleCwgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuZG90c1NwZWVkKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHJld2luZHMgY2Fyb3VzZWwgdG8gc2xpZGUgd2l0aCBuZWVkZWQgaWRcclxuICAgKiBAcGFyYW0gaWQgaWQgb2Ygc2xpZGVcclxuICAgKi9cclxuICB0b1NsaWRlQnlJZChpZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNsaWRlc0RhdGEuZmluZEluZGV4KHNsaWRlID0+IHNsaWRlLmlkID09PSBpZCAmJiBzbGlkZS5pc0Nsb25lZCA9PT0gZmFsc2UpO1xyXG5cclxuICAgIGlmIChwb3NpdGlvbiA9PT0gLTEgfHwgcG9zaXRpb24gPT09IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmN1cnJlbnQoKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG5cdFx0dGhpcy5jYXJvdXNlbFNlcnZpY2UudG8odGhpcy5jYXJvdXNlbFNlcnZpY2UucmVsYXRpdmUocG9zaXRpb24pLCBmYWxzZSk7XHJcbiAgfVxyXG5cclxufVxyXG4iLCIvLyBpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbi8vIGZ1bmN0aW9uIF93aW5kb3coKTogYW55IHtcclxuLy8gICAgLy8gcmV0dXJuIHRoZSBnbG9iYWwgbmF0aXZlIGJyb3dzZXIgd2luZG93IG9iamVjdFxyXG4vLyAgICByZXR1cm4gd2luZG93O1xyXG4vLyB9XHJcbi8vIEBJbmplY3RhYmxlKClcclxuLy8gZXhwb3J0IGNsYXNzIFdpbmRvd1JlZlNlcnZpY2Uge1xyXG4vLyAgICBnZXQgbmF0aXZlV2luZG93KCk6IGFueSB7XHJcbi8vICAgICAgIHJldHVybiBfd2luZG93KCk7XHJcbi8vICAgIH1cclxuLy8gfVxyXG5cclxuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge1xyXG4gIENsYXNzUHJvdmlkZXIsXHJcbiAgRmFjdG9yeVByb3ZpZGVyLFxyXG4gIEluamVjdGlvblRva2VuLFxyXG4gIFBMQVRGT1JNX0lEXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGEgbmV3IGluamVjdGlvbiB0b2tlbiBmb3IgaW5qZWN0aW5nIHRoZSB3aW5kb3cgaW50byBhIGNvbXBvbmVudC5cclxuICovXHJcbmV4cG9ydCBjb25zdCBXSU5ET1cgPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ1dpbmRvd1Rva2VuJyk7XHJcblxyXG4vKipcclxuICogRGVmaW5lIGFic3RyYWN0IGNsYXNzIGZvciBvYnRhaW5pbmcgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgd2luZG93IG9iamVjdC5cclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBXaW5kb3dSZWYge1xyXG4gIGdldCBuYXRpdmVXaW5kb3coKTogV2luZG93IHwgT2JqZWN0IHtcclxuICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkLicpO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIERlZmluZSBjbGFzcyB0aGF0IGltcGxlbWVudHMgdGhlIGFic3RyYWN0IGNsYXNzIGFuZCByZXR1cm5zIHRoZSBuYXRpdmUgd2luZG93IG9iamVjdC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBCcm93c2VyV2luZG93UmVmIGV4dGVuZHMgV2luZG93UmVmIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcmV0dXJucyB3aW5kb3cgb2JqZWN0XHJcbiAgICovXHJcbiAgZ2V0IG5hdGl2ZVdpbmRvdygpOiBXaW5kb3cgfCBPYmplY3Qge1xyXG4gICAgcmV0dXJuIHdpbmRvdztcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYW4gZmFjdG9yeSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIG5hdGl2ZSB3aW5kb3cgb2JqZWN0LlxyXG4gKiBAcGFyYW0gYnJvd3NlcldpbmRvd1JlZiBOYXRpdmUgd2luZG93IG9iamVjdFxyXG4gKiBAcGFyYW0gcGxhdGZvcm1JZCBpZCBvZiBwbGF0Zm9ybVxyXG4gKiBAcmV0dXJucyB0eXBlIG9mIHBsYXRmb3JtIG9mIGVtcHR5IG9iamVjdFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHdpbmRvd0ZhY3RvcnkoXHJcbiAgYnJvd3NlcldpbmRvd1JlZjogQnJvd3NlcldpbmRvd1JlZixcclxuICBwbGF0Zm9ybUlkOiBPYmplY3RcclxuKTogV2luZG93IHwgT2JqZWN0IHtcclxuICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIocGxhdGZvcm1JZCkpIHtcclxuICAgIHJldHVybiBicm93c2VyV2luZG93UmVmLm5hdGl2ZVdpbmRvdztcclxuICB9XHJcbiAgcmV0dXJuIG5ldyBPYmplY3QoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhIGluamVjdGFibGUgcHJvdmlkZXIgZm9yIHRoZSBXaW5kb3dSZWYgdG9rZW4gdGhhdCB1c2VzIHRoZSBCcm93c2VyV2luZG93UmVmIGNsYXNzLlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGJyb3dzZXJXaW5kb3dQcm92aWRlcjogQ2xhc3NQcm92aWRlciA9IHtcclxuICBwcm92aWRlOiBXaW5kb3dSZWYsXHJcbiAgdXNlQ2xhc3M6IEJyb3dzZXJXaW5kb3dSZWZcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYW4gaW5qZWN0YWJsZSBwcm92aWRlciB0aGF0IHVzZXMgdGhlIHdpbmRvd0ZhY3RvcnkgZnVuY3Rpb24gZm9yIHJldHVybmluZyB0aGUgbmF0aXZlIHdpbmRvdyBvYmplY3QuXHJcbiAqL1xyXG5leHBvcnQgY29uc3Qgd2luZG93UHJvdmlkZXI6IEZhY3RvcnlQcm92aWRlciA9IHtcclxuICBwcm92aWRlOiBXSU5ET1csXHJcbiAgdXNlRmFjdG9yeTogd2luZG93RmFjdG9yeSxcclxuICBkZXBzOiBbV2luZG93UmVmLCBQTEFURk9STV9JRF1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYW4gYXJyYXkgb2YgcHJvdmlkZXJzLlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IFdJTkRPV19QUk9WSURFUlMgPSBbYnJvd3NlcldpbmRvd1Byb3ZpZGVyLCB3aW5kb3dQcm92aWRlcl07XHJcbiIsImltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtcclxuICBDbGFzc1Byb3ZpZGVyLFxyXG4gIEZhY3RvcnlQcm92aWRlcixcclxuICBJbmplY3Rpb25Ub2tlbixcclxuICBQTEFURk9STV9JRCxcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYSBuZXcgaW5qZWN0aW9uIHRva2VuIGZvciBpbmplY3RpbmcgdGhlIERvY3VtZW50IGludG8gYSBjb21wb25lbnQuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgRE9DVU1FTlQgPSBuZXcgSW5qZWN0aW9uVG9rZW48RG9jdW1lbnQ+KCdEb2N1bWVudFRva2VuJyk7XHJcbi8qKlxyXG4gKiBEZWZpbmUgYWJzdHJhY3QgY2xhc3MgZm9yIG9idGFpbmluZyByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBEb2N1bWVudCBvYmplY3QuXHJcbiAqL1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRG9jdW1lbnRSZWYge1xyXG4gIGdldCBuYXRpdmVEb2N1bWVudCgpOiBEb2N1bWVudCB8IE9iamVjdCB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZC4nKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEZWZpbmUgY2xhc3MgdGhhdCBpbXBsZW1lbnRzIHRoZSBhYnN0cmFjdCBjbGFzcyBhbmQgcmV0dXJucyB0aGUgbmF0aXZlIERvY3VtZW50IG9iamVjdC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBCcm93c2VyRG9jdW1lbnRSZWYgZXh0ZW5kcyBEb2N1bWVudFJlZiB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHJldHVybnMgRG9jdW1lbnQgb2JqZWN0XHJcbiAgICovXHJcbiAgZ2V0IG5hdGl2ZURvY3VtZW50KCk6IERvY3VtZW50IHwgT2JqZWN0IHtcclxuICAgIHJldHVybiBkb2N1bWVudDtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYW4gZmFjdG9yeSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIG5hdGl2ZSBEb2N1bWVudCBvYmplY3QuXHJcbiAqIEBwYXJhbSBicm93c2VyRG9jdW1lbnRSZWYgTmF0aXZlIERvY3VtZW50IG9iamVjdFxyXG4gKiBAcGFyYW0gcGxhdGZvcm1JZCBpZCBvZiBwbGF0Zm9ybVxyXG4gKiBAcmV0dXJucyB0eXBlIG9mIHBsYXRmb3JtIG9mIGVtcHR5IG9iamVjdFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGRvY3VtZW50RmFjdG9yeShcclxuICBicm93c2VyRG9jdW1lbnRSZWY6IEJyb3dzZXJEb2N1bWVudFJlZixcclxuICBwbGF0Zm9ybUlkOiBPYmplY3RcclxuKTogRG9jdW1lbnQgfCBPYmplY3Qge1xyXG4gIGlmIChpc1BsYXRmb3JtQnJvd3NlcihwbGF0Zm9ybUlkKSkge1xyXG4gICAgcmV0dXJuIGJyb3dzZXJEb2N1bWVudFJlZi5uYXRpdmVEb2N1bWVudDtcclxuICB9XHJcbiAgcmV0dXJuIG5ldyBPYmplY3QoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhIGluamVjdGFibGUgcHJvdmlkZXIgZm9yIHRoZSBEb2N1bWVudFJlZiB0b2tlbiB0aGF0IHVzZXMgdGhlIEJyb3dzZXJEb2N1bWVudFJlZiBjbGFzcy5cclxuICovXHJcbmV4cG9ydCBjb25zdCBicm93c2VyRG9jdW1lbnRQcm92aWRlcjogQ2xhc3NQcm92aWRlciA9IHtcclxuICBwcm92aWRlOiBEb2N1bWVudFJlZixcclxuICB1c2VDbGFzczogQnJvd3NlckRvY3VtZW50UmVmXHJcbn07XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGFuIGluamVjdGFibGUgcHJvdmlkZXIgdGhhdCB1c2VzIHRoZSBEb2N1bWVudEZhY3RvcnkgZnVuY3Rpb24gZm9yIHJldHVybmluZyB0aGUgbmF0aXZlIERvY3VtZW50IG9iamVjdC5cclxuICovXHJcbmV4cG9ydCBjb25zdCBkb2N1bWVudFByb3ZpZGVyOiBGYWN0b3J5UHJvdmlkZXIgPSB7XHJcbiAgcHJvdmlkZTogRE9DVU1FTlQsXHJcbiAgdXNlRmFjdG9yeTogZG9jdW1lbnRGYWN0b3J5LFxyXG4gIGRlcHM6IFtEb2N1bWVudFJlZiwgUExBVEZPUk1fSURdXHJcbn07XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGFuIGFycmF5IG9mIHByb3ZpZGVycy5cclxuICovXHJcbmV4cG9ydCBjb25zdCBET0NVTUVOVF9QUk9WSURFUlMgPSBbYnJvd3NlckRvY3VtZW50UHJvdmlkZXIsIGRvY3VtZW50UHJvdmlkZXJdO1xyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIE9ic2VydmFibGUsIG1lcmdlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IENhcm91c2VsU2VydmljZSB9IGZyb20gJy4vY2Fyb3VzZWwuc2VydmljZSc7XHJcbmltcG9ydCB7IHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgV0lORE9XIH0gZnJvbSAnLi93aW5kb3ctcmVmLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJy4vZG9jdW1lbnQtcmVmLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQXV0b3BsYXlTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95e1xyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlvcHRpb24gdG8gbWVyZ2UgT2JzZXJ2YWJsZXMgZnJvbSBDYXJvdXNlbFNlcnZpY2VcclxuICAgKi9cclxuICBhdXRvcGxheVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgYXV0b3BsYXkgdGltZW91dC5cclxuICAgKi9cclxuICBwcml2YXRlIF90aW1lb3V0OiBudW1iZXIgPSBudWxsO1xyXG5cclxuICAvKipcclxuICAgKiBJbmRpY2F0ZXMgd2hlbmV2ZXIgdGhlIGF1dG9wbGF5IGlzIHBhdXNlZC5cclxuICAgKi9cclxuICBwcml2YXRlIF9wYXVzZWQgPSBmYWxzZTtcclxuXHJcbiAgcHJpdmF0ZSB3aW5SZWY6IFdpbmRvdztcclxuICBwcml2YXRlIGRvY1JlZjogRG9jdW1lbnQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2Fyb3VzZWxTZXJ2aWNlOiBDYXJvdXNlbFNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgQEluamVjdChXSU5ET1cpIHdpblJlZjogYW55LFxyXG4gICAgICAgICAgICAgIEBJbmplY3QoRE9DVU1FTlQpIGRvY1JlZjogYW55LFxyXG4gICkge1xyXG4gICAgdGhpcy53aW5SZWYgPSB3aW5SZWYgYXMgV2luZG93O1xyXG4gICAgdGhpcy5kb2NSZWYgPSBkb2NSZWYgYXMgRG9jdW1lbnQ7XHJcbiAgICB0aGlzLnNweURhdGFTdHJlYW1zKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuYXV0b3BsYXlTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlZmluZXMgT2JzZXJ2YWJsZXMgd2hpY2ggc2VydmljZSBtdXN0IG9ic2VydmVcclxuICAgKi9cclxuICBzcHlEYXRhU3RyZWFtcygpIHtcclxuICAgIGNvbnN0IGluaXRpYWxpemVkQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRJbml0aWFsaXplZFN0YXRlKCkucGlwZShcclxuICAgICAgdGFwKCgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b3BsYXkpIHtcclxuXHRcdFx0XHRcdHRoaXMucGxheSgpO1xyXG5cdFx0XHRcdH1cclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgY2hhbmdlZFNldHRpbmdzJDogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0Q2hhbmdlZFN0YXRlKCkucGlwZShcclxuICAgICAgdGFwKGRhdGEgPT4ge1xyXG4gICAgICAgIHRoaXMuX2hhbmRsZUNoYW5nZU9ic2VydmFibGUoZGF0YSk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIC8vIG9yaWdpbmFsIEF1dG9wbGF5IFBsdWdpbiBoYXMgbGlzdGVuZXJzIG9uIHBsYXkub3dsLmNvcmUgYW5kIHN0b3Aub3dsLmNvcmUgZXZlbnRzLlxyXG4gICAgLy8gVGhleSBhcmUgdHJpZ2dlcmVkIGJ5IFZpZGVvIFBsdWdpblxyXG5cclxuICAgIGNvbnN0IGF1dG9wbGF5TWVyZ2UkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSBtZXJnZShpbml0aWFsaXplZENhcm91c2VsJCwgY2hhbmdlZFNldHRpbmdzJCk7XHJcbiAgICB0aGlzLmF1dG9wbGF5U3Vic2NyaXB0aW9uID0gYXV0b3BsYXlNZXJnZSQuc3Vic2NyaWJlKFxyXG4gICAgICAoKSA9PiB7fVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIFN0YXJ0cyB0aGUgYXV0b3BsYXkuXHJcblx0ICogQHBhcmFtIHRpbWVvdXQgVGhlIGludGVydmFsIGJlZm9yZSB0aGUgbmV4dCBhbmltYXRpb24gc3RhcnRzLlxyXG5cdCAqIEBwYXJhbSBzcGVlZCBUaGUgYW5pbWF0aW9uIHNwZWVkIGZvciB0aGUgYW5pbWF0aW9ucy5cclxuXHQgKi9cclxuXHRwbGF5KHRpbWVvdXQ/OiBudW1iZXIsIHNwZWVkPzogbnVtYmVyKSB7XHJcbiAgICBpZiAodGhpcy5fcGF1c2VkKSB7XHJcblx0XHRcdHRoaXMuX3BhdXNlZCA9IGZhbHNlO1xyXG5cdFx0XHR0aGlzLl9zZXRBdXRvUGxheUludGVydmFsKCk7XHJcbiAgICB9XHJcblxyXG5cdFx0aWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmlzKCdyb3RhdGluZycpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmNhcm91c2VsU2VydmljZS5lbnRlcigncm90YXRpbmcnKTtcclxuXHJcblx0XHR0aGlzLl9zZXRBdXRvUGxheUludGVydmFsKCk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcblx0ICogR2V0cyBhIG5ldyB0aW1lb3V0XHJcblx0ICogQHBhcmFtIHRpbWVvdXQgLSBUaGUgaW50ZXJ2YWwgYmVmb3JlIHRoZSBuZXh0IGFuaW1hdGlvbiBzdGFydHMuXHJcblx0ICogQHBhcmFtIHNwZWVkIC0gVGhlIGFuaW1hdGlvbiBzcGVlZCBmb3IgdGhlIGFuaW1hdGlvbnMuXHJcblx0ICogQHJldHVyblxyXG5cdCAqL1xyXG5cdHByaXZhdGUgX2dldE5leHRUaW1lb3V0KHRpbWVvdXQ/OiBudW1iZXIsIHNwZWVkPzogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdGlmICggdGhpcy5fdGltZW91dCApIHtcclxuXHRcdFx0dGhpcy53aW5SZWYuY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVvdXQpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXMud2luUmVmLnNldFRpbWVvdXQoKCkgPT57XHJcbiAgICAgIGlmICh0aGlzLl9wYXVzZWQgfHwgdGhpcy5jYXJvdXNlbFNlcnZpY2UuaXMoJ2J1c3knKSB8fCB0aGlzLmNhcm91c2VsU2VydmljZS5pcygnaW50ZXJhY3RpbmcnKSB8fCB0aGlzLmRvY1JlZi5oaWRkZW4pIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5jYXJvdXNlbFNlcnZpY2UubmV4dChzcGVlZCB8fCB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hdXRvcGxheVNwZWVkKTtcclxuICAgIH0sIHRpbWVvdXQgfHwgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b3BsYXlUaW1lb3V0KTtcclxuICB9O1xyXG5cclxuICAvKipcclxuXHQgKiBTZXRzIGF1dG9wbGF5IGluIG1vdGlvbi5cclxuXHQgKi9cclxuXHRwcml2YXRlIF9zZXRBdXRvUGxheUludGVydmFsKCkge1xyXG5cdFx0dGhpcy5fdGltZW91dCA9IHRoaXMuX2dldE5leHRUaW1lb3V0KCk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogU3RvcHMgdGhlIGF1dG9wbGF5LlxyXG5cdCAqL1xyXG5cdHN0b3AoKSB7XHJcblx0XHRpZiAoIXRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmlzKCdyb3RhdGluZycpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLndpblJlZi5jbGVhclRpbWVvdXQodGhpcy5fdGltZW91dCk7XHJcblx0XHR0aGlzLmNhcm91c2VsU2VydmljZS5sZWF2ZSgncm90YXRpbmcnKTtcclxuICB9O1xyXG5cclxuICAvKipcclxuXHQgKiBTdG9wcyB0aGUgYXV0b3BsYXkuXHJcblx0ICovXHJcblx0cGF1c2UoKSB7XHJcblx0XHRpZiAoIXRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmlzKCdyb3RhdGluZycpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl9wYXVzZWQgPSB0cnVlO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIE1hbmFnZXMgYnkgYXV0b3BsYXlpbmcgYWNjb3JkaW5nIHRvIGRhdGEgcGFzc2VkIGJ5IF9jaGFuZ2VkU2V0dGluZ3NDYXJvdXNlbCQgT2JzYXJ2YWJsZVxyXG4gICAqIEBwYXJhbSBkYXRhIG9iamVjdCB3aXRoIGN1cnJlbnQgcG9zaXRpb24gb2YgY2Fyb3VzZWwgYW5kIHR5cGUgb2YgY2hhbmdlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfaGFuZGxlQ2hhbmdlT2JzZXJ2YWJsZShkYXRhKSB7XHJcbiAgICBpZiAoZGF0YS5wcm9wZXJ0eS5uYW1lID09PSAnc2V0dGluZ3MnKSB7XHJcbiAgICAgIGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hdXRvcGxheSkge1xyXG4gICAgICAgIHRoaXMucGxheSgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuc3RvcCgpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEucHJvcGVydHkubmFtZSA9PT0gJ3Bvc2l0aW9uJykge1xyXG4gICAgICAvL2NvbnNvbGUubG9nKCdwbGF5PycsIGUpO1xyXG4gICAgICBpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b3BsYXkpIHtcclxuICAgICAgICB0aGlzLl9zZXRBdXRvUGxheUludGVydmFsKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0YXJ0cyBwYXVzaW5nXHJcbiAgICovXHJcbiAgc3RhcnRQYXVzaW5nKCkge1xyXG4gICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9wbGF5SG92ZXJQYXVzZSAmJiB0aGlzLmNhcm91c2VsU2VydmljZS5pcygncm90YXRpbmcnKSkge1xyXG4gICAgICB0aGlzLnBhdXNlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdGFydHMgcGxheWluZyBhZnRlciBtb3VzZSBsZWF2ZXMgY2Fyb3VzZWxcclxuICAgKi9cclxuICBzdGFydFBsYXlpbmdNb3VzZUxlYXZlKCkge1xyXG4gICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9wbGF5SG92ZXJQYXVzZSAmJiB0aGlzLmNhcm91c2VsU2VydmljZS5pcygncm90YXRpbmcnKSkge1xyXG4gICAgICB0aGlzLnBhdXNlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdGFydHMgcGxheWluZyBhZnRlciB0b3VjaCBlbmRzXHJcbiAgICovXHJcbiAgc3RhcnRQbGF5aW5nVG91Y2hFbmQoKSB7XHJcbiAgICBpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b3BsYXlIb3ZlclBhdXNlICYmIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmlzKCdyb3RhdGluZycpKSB7XHJcbiAgICAgIHRoaXMucGF1c2UoKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgT2JzZXJ2YWJsZSwgbWVyZ2UgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgQ2Fyb3VzZWxTZXJ2aWNlIH0gZnJvbSAnLi9jYXJvdXNlbC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgTGF6eUxvYWRTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcclxuICAvKipcclxuICAgKiBTdWJzY3Jpb3B0aW9uIHRvIG1lcmdlIE9ic2VydmFibGUgIGZyb20gQ2Fyb3VzZWxTZXJ2aWNlXHJcbiAgICovXHJcbiAgbGF6eUxvYWRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjYXJvdXNlbFNlcnZpY2U6IENhcm91c2VsU2VydmljZSkge1xyXG4gICAgdGhpcy5zcHlEYXRhU3RyZWFtcygpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmxhenlMb2FkU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZWZpbmVzIE9ic2VydmFibGVzIHdoaWNoIHNlcnZpY2UgbXVzdCBvYnNlcnZlXHJcbiAgICovXHJcbiAgc3B5RGF0YVN0cmVhbXMoKSB7XHJcbiAgICBjb25zdCBpbml0aWFsaXplZENhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0SW5pdGlhbGl6ZWRTdGF0ZSgpLnBpcGUoXHJcbiAgICAgIHRhcCgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgaXNMYXp5TG9hZCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzICYmICF0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5sYXp5TG9hZDtcclxuICAgICAgICB0aGlzLmNhcm91c2VsU2VydmljZS5zbGlkZXNEYXRhLmZvckVhY2goaXRlbSA9PiBpdGVtLmxvYWQgPSBpc0xhenlMb2FkID8gdHJ1ZSA6IGZhbHNlKTtcclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgY2hhbmdlU2V0dGluZ3MkOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRDaGFuZ2VTdGF0ZSgpO1xyXG5cclxuICAgIGNvbnN0IHJlc2l6ZWRDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldFJlc2l6ZWRTdGF0ZSgpO1xyXG5cclxuXHJcbiAgICBjb25zdCBsYXp5TG9hZE1lcmdlJDogT2JzZXJ2YWJsZTxzdHJpbmcgfCBhbnk+ID0gbWVyZ2UoaW5pdGlhbGl6ZWRDYXJvdXNlbCQsIGNoYW5nZVNldHRpbmdzJCwgcmVzaXplZENhcm91c2VsJCkucGlwZShcclxuICAgICAgdGFwKGRhdGEgPT4gdGhpcy5fZGVmaW5lTGF6eUxvYWRTbGlkZXMoZGF0YSkpLFxyXG4gICAgICAvLyB0YXAoKCkgPT4gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2VuZENoYW5nZXMoKSlcclxuICAgICk7XHJcbiAgICB0aGlzLmxhenlMb2FkU3Vic2NyaXB0aW9uID0gbGF6eUxvYWRNZXJnZSQuc3Vic2NyaWJlKFxyXG4gICAgICAoKSA9PiB7fVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2RlZmluZUxhenlMb2FkU2xpZGVzKGRhdGE6IGFueSkge1xyXG4gICAgaWYgKCF0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncyB8fCAhdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MubGF6eUxvYWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICgoZGF0YS5wcm9wZXJ0eSAmJiBkYXRhLnByb3BlcnR5Lm5hbWUgPT09ICdwb3NpdGlvbicpIHx8IGRhdGEgPT09ICdpbml0aWFsaXplZCcgfHwgZGF0YSA9PT0gXCJyZXNpemVkXCIpIHtcclxuICAgICAgY29uc3Qgc2V0dGluZ3MgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncyxcclxuICAgICAgICAgICAgY2xvbmVzID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuY2xvbmVzKCkubGVuZ3RoO1xyXG4gICAgICBsZXQgbiA9IChzZXR0aW5ncy5jZW50ZXIgJiYgTWF0aC5jZWlsKHNldHRpbmdzLml0ZW1zIC8gMikgfHwgc2V0dGluZ3MuaXRlbXMpLFxyXG4gICAgICAgICAgaSA9ICgoc2V0dGluZ3MuY2VudGVyICYmIG4gKiAtMSkgfHwgMCksXHJcbiAgICAgICAgICBwb3NpdGlvbiA9IChkYXRhLnByb3BlcnR5ICYmIGRhdGEucHJvcGVydHkudmFsdWUgIT09IHVuZGVmaW5lZCA/IGRhdGEucHJvcGVydHkudmFsdWUgOiB0aGlzLmNhcm91c2VsU2VydmljZS5jdXJyZW50KCkpICsgaTtcclxuICAgICAgICAvLyBsb2FkID0gJC5wcm94eShmdW5jdGlvbihpLCB2KSB7IHRoaXMubG9hZCh2KSB9LCB0aGlzKTtcclxuICAgICAgLy9UT0RPOiBOZWVkIGRvY3VtZW50YXRpb24gZm9yIHRoaXMgbmV3IG9wdGlvblxyXG4gICAgICBpZiAoc2V0dGluZ3MubGF6eUxvYWRFYWdlciA+IDApIHtcclxuICAgICAgICBuICs9IHNldHRpbmdzLmxhenlMb2FkRWFnZXI7XHJcbiAgICAgICAgLy8gSWYgdGhlIGNhcm91c2VsIGlzIGxvb3BpbmcgYWxzbyBwcmVsb2FkIGltYWdlcyB0aGF0IGFyZSB0byB0aGUgXCJsZWZ0XCJcclxuICAgICAgICBpZiAoc2V0dGluZ3MubG9vcCkge1xyXG4gICAgICAgICAgcG9zaXRpb24gLT0gc2V0dGluZ3MubGF6eUxvYWRFYWdlcjtcclxuICAgICAgICAgIG4rKztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHdoaWxlIChpKysgPCBuKSB7XHJcbiAgICAgICAgdGhpcy5fbG9hZChjbG9uZXMgLyAyICsgdGhpcy5jYXJvdXNlbFNlcnZpY2UucmVsYXRpdmUocG9zaXRpb24pKTtcclxuICAgICAgICBpZiAoY2xvbmVzKSB7XHJcbiAgICAgICAgICB0aGlzLmNhcm91c2VsU2VydmljZS5jbG9uZXModGhpcy5jYXJvdXNlbFNlcnZpY2UucmVsYXRpdmUocG9zaXRpb24pKS5mb3JFYWNoKHZhbHVlID0+IHRoaXMuX2xvYWQodmFsdWUpKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBvc2l0aW9uKys7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIExvYWRzIGFsbCByZXNvdXJjZXMgb2YgYW4gaXRlbSBhdCB0aGUgc3BlY2lmaWVkIHBvc2l0aW9uLlxyXG5cdCAqIEBwYXJhbSBwb3NpdGlvbiAtIFRoZSBhYnNvbHV0ZSBwb3NpdGlvbiBvZiB0aGUgaXRlbS5cclxuXHQgKi9cclxuICBwcml2YXRlIF9sb2FkKHBvc2l0aW9uOiBudW1iZXIpIHtcclxuICAgIGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5zbGlkZXNEYXRhW3Bvc2l0aW9uXS5sb2FkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5zbGlkZXNEYXRhW3Bvc2l0aW9uXS5sb2FkID0gdHJ1ZTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgT2JzZXJ2YWJsZSwgbWVyZ2UgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgQ2Fyb3VzZWxTZXJ2aWNlIH0gZnJvbSAnLi9jYXJvdXNlbC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQW5pbWF0ZVNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3l7XHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaW9wdGlvbiB0byBtZXJnZSBPYnNlcnZhYmxlICBmcm9tIENhcm91c2VsU2VydmljZVxyXG4gICAqL1xyXG4gIGFuaW1hdGVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogc1xyXG4gICAqL1xyXG4gIHN3YXBwaW5nID0gdHJ1ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogYWN0aXZlIHNsaWRlIGJlZm9yZSB0cmFuc2xhdGluZ1xyXG4gICAqL1xyXG4gIHByZXZpb3VzID0gdW5kZWZpbmVkO1xyXG5cclxuICAvKipcclxuICAgKiBuZXcgYWN0aXZlIHNsaWRlIGFmdGVyIHRyYW5zbGF0aW5nXHJcbiAgICovXHJcbiAgbmV4dCA9IHVuZGVmaW5lZDtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjYXJvdXNlbFNlcnZpY2U6IENhcm91c2VsU2VydmljZSkge1xyXG4gICAgdGhpcy5zcHlEYXRhU3RyZWFtcygpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmFuaW1hdGVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlZmluZXMgT2JzZXJ2YWJsZXMgd2hpY2ggc2VydmljZSBtdXN0IG9ic2VydmVcclxuICAgKi9cclxuICBzcHlEYXRhU3RyZWFtcygpIHtcclxuICAgIGNvbnN0IGNoYW5nZVNldHRpbmdzJDogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0Q2hhbmdlU3RhdGUoKS5waXBlKFxyXG4gICAgICB0YXAoZGF0YSA9PiB7XHJcbiAgICAgICAgaWYgKGRhdGEucHJvcGVydHkubmFtZSA9PT0gJ3Bvc2l0aW9uJykge1xyXG5cdFx0XHRcdFx0dGhpcy5wcmV2aW91cyA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmN1cnJlbnQoKTtcclxuXHRcdFx0XHRcdHRoaXMubmV4dCA9IGRhdGEucHJvcGVydHkudmFsdWU7XHJcblx0XHRcdFx0fVxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBkcmFnQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXREcmFnU3RhdGUoKTtcclxuICAgIGNvbnN0IGRyYWdnZWRDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldERyYWdnZWRTdGF0ZSgpO1xyXG4gICAgY29uc3QgdHJhbnNsYXRlZENhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0VHJhbnNsYXRlZFN0YXRlKCk7XHJcblxyXG4gICAgY29uc3QgZHJhZ1RyYW5zbGF0ZWRNZXJnZSQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IG1lcmdlKGRyYWdDYXJvdXNlbCQsIGRyYWdnZWRDYXJvdXNlbCQsIHRyYW5zbGF0ZWRDYXJvdXNlbCQpLnBpcGUoXHJcbiAgICAgIHRhcChkYXRhID0+IHRoaXMuc3dhcHBpbmcgPSBkYXRhID09PSAndHJhbnNsYXRlZCcpXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IHRyYW5zbGF0ZUNhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0VHJhbnNsYXRlU3RhdGUoKS5waXBlKFxyXG4gICAgICB0YXAoZGF0YSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3dhcHBpbmcgJiYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLl9vcHRpb25zLmFuaW1hdGVPdXQgfHwgdGhpcy5jYXJvdXNlbFNlcnZpY2UuX29wdGlvbnMuYW5pbWF0ZUluKSkge1xyXG4gICAgICAgICAgdGhpcy5fc3dhcCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgYW5pbWF0ZU1lcmdlJDogT2JzZXJ2YWJsZTxzdHJpbmcgfCBhbnk+ID0gbWVyZ2UoY2hhbmdlU2V0dGluZ3MkLCB0cmFuc2xhdGVDYXJvdXNlbCQsIGRyYWdUcmFuc2xhdGVkTWVyZ2UkKS5waXBlKCk7XHJcbiAgICB0aGlzLmFuaW1hdGVTdWJzY3JpcHRpb24gPSBhbmltYXRlTWVyZ2UkLnN1YnNjcmliZShcclxuICAgICAgKCkgPT4ge31cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuXHQgKiBUb2dnbGVzIHRoZSBhbmltYXRpb24gY2xhc3NlcyB3aGVuZXZlciBhbiB0cmFuc2xhdGlvbnMgc3RhcnRzLlxyXG5cdCAqIEByZXR1cm5zXHJcblx0ICovXHJcblx0cHJpdmF0ZSBfc3dhcCgpOiBib29sZWFuIHtcclxuXHJcblx0XHRpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuaXRlbXMgIT09IDEpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIGlmICghJC5zdXBwb3J0LmFuaW1hdGlvbiB8fCAhJC5zdXBwb3J0LnRyYW5zaXRpb24pIHtcclxuXHRcdC8vIFx0cmV0dXJuO1xyXG5cdFx0Ly8gfVxyXG5cclxuXHRcdHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNwZWVkKDApO1xyXG5cclxuXHRcdGxldCBsZWZ0O1xyXG5cdFx0Y29uc3RcdHByZXZpb3VzID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2xpZGVzRGF0YVt0aGlzLnByZXZpb3VzXSxcclxuXHRcdFx0bmV4dCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNsaWRlc0RhdGFbdGhpcy5uZXh0XSxcclxuXHRcdFx0aW5jb21pbmcgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hbmltYXRlSW4sXHJcblx0XHRcdG91dGdvaW5nID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYW5pbWF0ZU91dDtcclxuXHJcblx0XHRpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2UuY3VycmVudCgpID09PSB0aGlzLnByZXZpb3VzKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAob3V0Z29pbmcpIHtcclxuXHRcdFx0bGVmdCA9ICt0aGlzLmNhcm91c2VsU2VydmljZS5jb29yZGluYXRlcyh0aGlzLnByZXZpb3VzKSAtICt0aGlzLmNhcm91c2VsU2VydmljZS5jb29yZGluYXRlcyh0aGlzLm5leHQpO1xyXG4gICAgICB0aGlzLmNhcm91c2VsU2VydmljZS5zbGlkZXNEYXRhLmZvckVhY2goc2xpZGUgPT4ge1xyXG4gICAgICAgIGlmIChzbGlkZS5pZCA9PT0gcHJldmlvdXMuaWQpIHtcclxuICAgICAgICAgIHNsaWRlLmxlZnQgPSBgJHtsZWZ0fXB4YDtcclxuICAgICAgICAgIHNsaWRlLmlzQW5pbWF0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgc2xpZGUuaXNEZWZBbmltYXRlZE91dCA9IHRydWU7XHJcbiAgICAgICAgICBzbGlkZS5pc0N1c3RvbUFuaW1hdGVkT3V0ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChpbmNvbWluZykge1xyXG4gICAgICB0aGlzLmNhcm91c2VsU2VydmljZS5zbGlkZXNEYXRhLmZvckVhY2goc2xpZGUgPT4ge1xyXG4gICAgICAgIGlmIChzbGlkZS5pZCA9PT0gbmV4dC5pZCkge1xyXG4gICAgICAgICAgc2xpZGUuaXNBbmltYXRlZCA9IHRydWU7XHJcbiAgICAgICAgICBzbGlkZS5pc0RlZkFuaW1hdGVkSW4gPSB0cnVlO1xyXG4gICAgICAgICAgc2xpZGUuaXNDdXN0b21BbmltYXRlZEluID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhbmRsZXMgdGhlIGVuZCBvZiAnYW5pbWF0aW9uZW5kJyBldmVudFxyXG4gICAqIEBwYXJhbSBpZCBJZCBvZiBzbGlkZXNcclxuICAgKi9cclxuICBjbGVhcihpZCkge1xyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2xpZGVzRGF0YS5mb3JFYWNoKHNsaWRlID0+IHtcclxuICAgICAgaWYgKHNsaWRlLmlkID09PSBpZCkge1xyXG4gICAgICAgIHNsaWRlLmxlZnQgPSAnJztcclxuICAgICAgICBzbGlkZS5pc0FuaW1hdGVkID0gZmFsc2U7XHJcbiAgICAgICAgc2xpZGUuaXNEZWZBbmltYXRlZE91dCA9IGZhbHNlO1xyXG4gICAgICAgIHNsaWRlLmlzQ3VzdG9tQW5pbWF0ZWRPdXQgPSBmYWxzZTtcclxuICAgICAgICBzbGlkZS5pc0RlZkFuaW1hdGVkSW4gPSBmYWxzZTtcclxuICAgICAgICBzbGlkZS5pc0N1c3RvbUFuaW1hdGVkSW4gPSBmYWxzZTtcclxuICAgICAgICBzbGlkZS5jbGFzc2VzID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0Q3VyU2xpZGVDbGFzc2VzKHNsaWRlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5vblRyYW5zaXRpb25FbmQoKTtcclxuXHR9O1xyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIE9ic2VydmFibGUsIG1lcmdlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IENhcm91c2VsU2VydmljZSB9IGZyb20gJy4vY2Fyb3VzZWwuc2VydmljZSc7XHJcbmltcG9ydCB7IHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEF1dG9IZWlnaHRTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95e1xyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlvcHRpb24gdG8gbWVyZ2UgT2JzZXJ2YWJsZSAgZnJvbSBDYXJvdXNlbFNlcnZpY2VcclxuICAgKi9cclxuICBhdXRvSGVpZ2h0U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjYXJvdXNlbFNlcnZpY2U6IENhcm91c2VsU2VydmljZSkge1xyXG4gICAgdGhpcy5zcHlEYXRhU3RyZWFtcygpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmF1dG9IZWlnaHRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogRGVmaW5lcyBPYnNlcnZhYmxlcyB3aGljaCBzZXJ2aWNlIG11c3Qgb2JzZXJ2ZVxyXG4gICAqL1xyXG4gIHNweURhdGFTdHJlYW1zKCkge1xyXG4gICAgY29uc3QgaW5pdGlhbGl6ZWRDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldEluaXRpYWxpemVkU3RhdGUoKS5waXBlKFxyXG4gICAgICB0YXAoZGF0YSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9IZWlnaHQpIHtcclxuICAgICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNsaWRlc0RhdGEuZm9yRWFjaChzbGlkZSA9PiBzbGlkZS5oZWlnaHRTdGF0ZSA9ICdmdWxsJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBjaGFuZ2VkU2V0dGluZ3MkOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRDaGFuZ2VkU3RhdGUoKS5waXBlKFxyXG4gICAgICB0YXAoZGF0YSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9IZWlnaHQgJiYgZGF0YS5wcm9wZXJ0eS5uYW1lID09PSAncG9zaXRpb24nKXtcclxuXHRcdFx0XHRcdHRoaXMudXBkYXRlKCk7XHJcblx0XHRcdFx0fVxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCByZWZyZXNoZWRDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldFJlZnJlc2hlZFN0YXRlKCkucGlwZShcclxuICAgICAgdGFwKGRhdGEgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hdXRvSGVpZ2h0KSB7XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgYXV0b0hlaWdodCQ6IE9ic2VydmFibGU8c3RyaW5nIHwgYW55PiA9IG1lcmdlKGluaXRpYWxpemVkQ2Fyb3VzZWwkLCBjaGFuZ2VkU2V0dGluZ3MkLCByZWZyZXNoZWRDYXJvdXNlbCQpO1xyXG4gICAgdGhpcy5hdXRvSGVpZ2h0U3Vic2NyaXB0aW9uID0gYXV0b0hlaWdodCQuc3Vic2NyaWJlKFxyXG4gICAgICAoKSA9PiB7fVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZXMgdGhlIHByb3AgJ2hlaWdodFN0YXRlJyBvZiBzbGlkZXNcclxuICAgKi9cclxuICB1cGRhdGUoKSB7XHJcbiAgICBjb25zdCBpdGVtcyA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLml0ZW1zXHJcbiAgICBsZXQgc3RhcnQgPSB0aGlzLmNhcm91c2VsU2VydmljZS5jdXJyZW50KCksXHJcbiAgICAgICAgZW5kID0gc3RhcnQgKyBpdGVtcztcclxuXHJcbiAgICBpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuY2VudGVyKSB7XHJcbiAgICAgIHN0YXJ0ID0gaXRlbXMgJSAyID09PSAxID8gc3RhcnQgLSAoaXRlbXMgLSAxKSAvIDIgOiBzdGFydCAtIGl0ZW1zIC8gMjtcclxuICAgICAgZW5kID0gaXRlbXMgJSAyID09PSAxID8gc3RhcnQgKyBpdGVtcyA6IHN0YXJ0ICsgaXRlbXMgKyAxO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNsaWRlc0RhdGEuZm9yRWFjaCgoc2xpZGUsIGkpID0+IHtcclxuICAgICAgc2xpZGUuaGVpZ2h0U3RhdGUgPSAoaSA+PSBzdGFydCAmJiBpIDwgZW5kKSA/ICdmdWxsJyA6ICdudWxsZWQnO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgT2JzZXJ2YWJsZSwgbWVyZ2UgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgQ2Fyb3VzZWxTZXJ2aWNlIH0gZnJvbSAnLi9jYXJvdXNlbC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgdGFwLCBza2lwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEhhc2hTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gdG8gbWVyZ2UgT2JzZXJ2YWJsZSBmcm9tIENhcm91c2VsU2VydmljZVxyXG4gICAqL1xyXG4gIGhhc2hTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ3VycmVudCB1cmwgZnJhZ21lbnQgKGhhc2gpXHJcbiAgICovXHJcbiAgY3VycmVudEhhc2hGcmFnbWVudDogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhcm91c2VsU2VydmljZTogQ2Fyb3VzZWxTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHtcclxuICAgIHRoaXMuc3B5RGF0YVN0cmVhbXMoKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5oYXNoU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZWZpbmVzIE9ic2VydmFibGVzIHdoaWNoIHNlcnZpY2UgbXVzdCBvYnNlcnZlXHJcbiAgICovXHJcbiAgc3B5RGF0YVN0cmVhbXMoKSB7XHJcbiAgICBjb25zdCBpbml0aWFsaXplZENhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0SW5pdGlhbGl6ZWRTdGF0ZSgpLnBpcGUoXHJcbiAgICAgIHRhcCgoKSA9PiB0aGlzLmxpc3RlblRvUm91dGUoKSApXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IGNoYW5nZWRTZXR0aW5ncyQ6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldENoYW5nZWRTdGF0ZSgpLnBpcGUoXHJcbiAgICAgIHRhcChkYXRhID0+IHtcclxuICAgICAgICBpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuVVJMaGFzaExpc3RlbmVyICYmIGRhdGEucHJvcGVydHkubmFtZSA9PT0gJ3Bvc2l0aW9uJykge1xyXG4gICAgICAgICAgY29uc3QgbmV3Q3VyU2xpZGUgPSB0aGlzLmNhcm91c2VsU2VydmljZS5jdXJyZW50KCk7XHJcbiAgICAgICAgICBjb25zdCBuZXdDdXJGcmFnbWVudCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNsaWRlc0RhdGFbbmV3Q3VyU2xpZGVdLmhhc2hGcmFnbWVudDtcclxuXHJcbiAgICAgICAgICBpZiAoIW5ld0N1ckZyYWdtZW50IHx8IG5ld0N1ckZyYWdtZW50ID09PSB0aGlzLmN1cnJlbnRIYXNoRnJhZ21lbnQpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycuLyddLCB7ZnJhZ21lbnQ6IG5ld0N1ckZyYWdtZW50LCByZWxhdGl2ZVRvOiB0aGlzLnJvdXRlfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBoYXNoRnJhZ21lbnQkOiBPYnNlcnZhYmxlPHN0cmluZyB8IGFueT4gPSBtZXJnZShpbml0aWFsaXplZENhcm91c2VsJCwgY2hhbmdlZFNldHRpbmdzJCk7XHJcbiAgICB0aGlzLmhhc2hTdWJzY3JpcHRpb24gPSBoYXNoRnJhZ21lbnQkLnN1YnNjcmliZShcclxuICAgICAgKCkgPT4ge31cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiByZXdpbmRzIGNhcm91c2VsIHRvIHNsaWRlIHdoaWNoIGhhcyB0aGUgc2FtZSBoYXNoRnJhZ21lbnQgYXMgZnJhZ21lbnQgb2YgY3VycmVudCB1cmxcclxuICAgKiBAcGFyYW0gZnJhZ21lbnQgZnJhZ21lbnQgb2YgdXJsXHJcbiAgICovXHJcbiAgcmV3aW5kKGZyYWdtZW50OiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2xpZGVzRGF0YS5maW5kSW5kZXgoc2xpZGUgPT4gc2xpZGUuaGFzaEZyYWdtZW50ID09PSBmcmFnbWVudCAmJiBzbGlkZS5pc0Nsb25lZCA9PT0gZmFsc2UpO1xyXG5cclxuICAgIGlmIChwb3NpdGlvbiA9PT0gLTEgfHwgcG9zaXRpb24gPT09IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmN1cnJlbnQoKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG5cdFx0dGhpcy5jYXJvdXNlbFNlcnZpY2UudG8odGhpcy5jYXJvdXNlbFNlcnZpY2UucmVsYXRpdmUocG9zaXRpb24pLCBmYWxzZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbml0aWF0ZSBsaXN0ZW5pbmcgdG8gQWN0aXZhdGVkUm91dGUuZnJhZ21lbnRcclxuICAgKi9cclxuICBsaXN0ZW5Ub1JvdXRlKCkge1xyXG4gICAgY29uc3QgY291bnQgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5zdGFydFBvc2l0aW9uID09PSAnVVJMSGFzaCcgPyAwIDogMjtcclxuICAgIHRoaXMucm91dGUuZnJhZ21lbnQucGlwZShcclxuICAgICAgICBza2lwKGNvdW50KVxyXG4gICAgICApXHJcbiAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgZnJhZ21lbnQgPT4ge1xyXG4gICAgICAgICAgdGhpcy5jdXJyZW50SGFzaEZyYWdtZW50ID0gZnJhZ21lbnQ7XHJcbiAgICAgICAgICB0aGlzLnJld2luZChmcmFnbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICApXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIE9uSW5pdCxcclxuICBBZnRlckNvbnRlbnRDaGVja2VkLFxyXG4gIE9uRGVzdHJveSxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRGlyZWN0aXZlLFxyXG4gIFF1ZXJ5TGlzdCxcclxuICBDb250ZW50Q2hpbGRyZW4sXHJcbiAgVGVtcGxhdGVSZWYsXHJcbiAgRWxlbWVudFJlZixcclxuICBBZnRlckNvbnRlbnRJbml0LFxyXG4gIEV2ZW50RW1pdHRlclxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBPYnNlcnZhYmxlLCBtZXJnZSB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgUmVzaXplU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3Jlc2l6ZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgdGFwLCBkZWxheSwgZmlsdGVyLCBzd2l0Y2hNYXAsIGZpcnN0IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBDYXJvdXNlbFNlcnZpY2UsIENhcm91c2VsQ3VycmVudERhdGEgfSBmcm9tICcuLi9zZXJ2aWNlcy9jYXJvdXNlbC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3RhZ2VEYXRhIH0gZnJvbSBcIi4uL21vZGVscy9zdGFnZS1kYXRhLm1vZGVsXCI7XHJcbmltcG9ydCB7IE93bERPTURhdGEgfSBmcm9tIFwiLi4vbW9kZWxzL293bERPTS1kYXRhLm1vZGVsXCI7XHJcbmltcG9ydCB7IFNsaWRlTW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvc2xpZGUubW9kZWwnO1xyXG5pbXBvcnQgeyBPd2xPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWxzL293bC1vcHRpb25zLm1vZGVsJztcclxuaW1wb3J0IHsgTmF2RGF0YSwgRG90c0RhdGEgfSBmcm9tICcuLi9tb2RlbHMvbmF2aWdhdGlvbi1kYXRhLm1vZGVscyc7XHJcbmltcG9ydCB7IE5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmF2aWdhdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQXV0b3BsYXlTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvYXV0b3BsYXkuc2VydmljZSc7XHJcbmltcG9ydCB7IExhenlMb2FkU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2xhenlsb2FkLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBbmltYXRlU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2FuaW1hdGUuc2VydmljZSc7XHJcbmltcG9ydCB7IEF1dG9IZWlnaHRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvYXV0b2hlaWdodC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSGFzaFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9oYXNoLnNlcnZpY2UnO1xyXG5cclxubGV0IG5leHRJZCA9IDA7XHJcblxyXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICduZy10ZW1wbGF0ZVtjYXJvdXNlbFNsaWRlXScgfSlcclxuZXhwb3J0IGNsYXNzIENhcm91c2VsU2xpZGVEaXJlY3RpdmUge1xyXG4gIC8qKlxyXG4gICAqIFVuaXF1ZSBzbGlkZSBpZGVudGlmaWVyLiBNdXN0IGJlIHVuaXF1ZSBmb3IgdGhlIGVudGlyZSBkb2N1bWVudCBmb3IgcHJvcGVyIGFjY2Vzc2liaWxpdHkgc3VwcG9ydC5cclxuICAgKiBXaWxsIGJlIGF1dG8tZ2VuZXJhdGVkIGlmIG5vdCBwcm92aWRlZC5cclxuICAgKi9cclxuICBASW5wdXQoKSBpZCA9IGBvd2wtc2xpZGUtJHtuZXh0SWQrK31gO1xyXG5cclxuICAvKipcclxuICAgKiBEZWZpbmVzIGhvdyBtdWNoIHdpZHRocyBvZiBjb21tb24gc2xpZGUgd2lsbCBjdXJyZW50IHNsaWRlIGhhdmVcclxuICAgKiBlLmcuIGlmIF9tZXJnZURhdGE9MiwgdGhlIHNsaWRlIHdpbGwgdHdpY2Ugd2lkZXIgdGhlbiBzbGlkZXMgd2l0aCBfbWVyZ2VEYXRhPTFcclxuICAgKi9cclxuICBwcml2YXRlIF9kYXRhTWVyZ2UgPSAxO1xyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IGRhdGFNZXJnZShkYXRhOiBudW1iZXIpIHtcclxuICAgIHRoaXMuX2RhdGFNZXJnZSA9IHRoaXMuaXNOdW1lcmljKGRhdGEpID8gZGF0YSA6IDE7XHJcbiAgfTtcclxuICBnZXQgZGF0YU1lcmdlKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9kYXRhTWVyZ2UgfVxyXG5cclxuICAvKipcclxuICAgKiBXaWR0aCBvZiBzbGlkZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHdpZHRoID0gMDtcclxuXHJcbiAgLyoqXHJcbiAgICogSW5uZXIgY29udGVudCBvZiBkb3QgZm9yIGNlcnRhaW4gc2xpZGU7IGNhbiBiZSBodG1sLW1hcmt1cFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRvdENvbnRlbnQgPSAnJztcclxuXHJcbiAgLyoqXHJcbiAgICogSGFzaCAoZnJhZ21lbnQpIG9mIHVybCB3aGljaCBjb3JyZXNwb25kcyB0byBjZXJ0YWluIHNsaWRlXHJcbiAgICovXHJcbiAgQElucHV0KCkgZGF0YUhhc2ggPSAnJztcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIHRwbFJlZjogVGVtcGxhdGVSZWY8YW55Pikge31cclxuXHJcbiAgLyoqXHJcblx0ICogRGV0ZXJtaW5lcyBpZiB0aGUgaW5wdXQgaXMgYSBOdW1iZXIgb3Igc29tZXRoaW5nIHRoYXQgY2FuIGJlIGNvZXJjZWQgdG8gYSBOdW1iZXJcclxuXHQgKiBAcGFyYW0gLSBUaGUgaW5wdXQgdG8gYmUgdGVzdGVkXHJcblx0ICogQHJldHVybnMgLSBBbiBpbmRpY2F0aW9uIGlmIHRoZSBpbnB1dCBpcyBhIE51bWJlciBvciBjYW4gYmUgY29lcmNlZCB0byBhIE51bWJlclxyXG5cdCAqL1xyXG4gIGlzTnVtZXJpYyhudW1iZXI6IGFueSk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuICFpc05hTihwYXJzZUZsb2F0KG51bWJlcikpO1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIERhdGEgd2hpY2ggd2lsbCBiZSBwYXNzZWQgb3V0IGFmdGVyIGVuZGluZyBvZiB0cmFuc2l0aW9uIG9mIGNhcm91c2VsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU2xpZGVzT3V0cHV0RGF0YSB7XHJcbiAgc3RhcnRQb3NpdGlvbj86IG51bWJlcjtcclxuICBzbGlkZXM/OiBTbGlkZU1vZGVsW107XHJcbn07XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ293bC1jYXJvdXNlbC1vJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdiBjbGFzcz1cIm93bC1jYXJvdXNlbCBvd2wtdGhlbWVcIiAjb3dsQ2Fyb3VzZWxcclxuICAgICAgW25nQ2xhc3NdPVwieydvd2wtcnRsJzogb3dsRE9NRGF0YT8ucnRsLFxyXG4gICAgICAgICAgICAgICAgICAnb3dsLWxvYWRlZCc6IG93bERPTURhdGE/LmlzTG9hZGVkLFxyXG4gICAgICAgICAgICAgICAgICAnb3dsLXJlc3BvbnNpdmUnOiBvd2xET01EYXRhPy5pc1Jlc3BvbnNpdmUsXHJcbiAgICAgICAgICAgICAgICAgICdvd2wtZHJhZyc6IG93bERPTURhdGE/LmlzTW91c2VEcmFnYWJsZSxcclxuICAgICAgICAgICAgICAgICAgJ293bC1ncmFiJzogb3dsRE9NRGF0YT8uaXNHcmFifVwiXHJcbiAgICAgIChtb3VzZW92ZXIpPVwic3RhcnRQYXVzaW5nKClcIlxyXG4gICAgICAobW91c2VsZWF2ZSk9XCJzdGFydFBsYXlNTCgpXCJcclxuICAgICAgKHRvdWNoc3RhcnQpPVwic3RhcnRQYXVzaW5nKClcIlxyXG4gICAgICAodG91Y2hlbmQpPVwic3RhcnRQbGF5VEUoKVwiPlxyXG5cclxuICAgICAgPGRpdiAqbmdJZj1cImNhcm91c2VsTG9hZGVkXCIgY2xhc3M9XCJvd2wtc3RhZ2Utb3V0ZXJcIj5cclxuICAgICAgICA8b3dsLXN0YWdlIFtvd2xEcmFnZ2FibGVdPVwieydpc01vdXNlRHJhZ2FibGUnOiBvd2xET01EYXRhPy5pc01vdXNlRHJhZ2FibGUsICdpc1RvdWNoRHJhZ2FibGUnOiBvd2xET01EYXRhPy5pc1RvdWNoRHJhZ2FibGV9XCJcclxuICAgICAgICAgICAgICAgICAgICBbc3RhZ2VEYXRhXT1cInN0YWdlRGF0YVwiXHJcbiAgICAgICAgICAgICAgICAgICAgW3NsaWRlc0RhdGFdPVwic2xpZGVzRGF0YVwiPjwvb3dsLXN0YWdlPlxyXG4gICAgICA8L2Rpdj4gPCEtLSAvLm93bC1zdGFnZS1vdXRlciAtLT5cclxuICAgICAgPGRpdiBjbGFzcz1cIm93bC1uYXZcIiBbbmdDbGFzc109XCJ7J2Rpc2FibGVkJzogbmF2RGF0YT8uZGlzYWJsZWR9XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm93bC1wcmV2XCIgW25nQ2xhc3NdPVwieydkaXNhYmxlZCc6IG5hdkRhdGE/LnByZXY/LmRpc2FibGVkfVwiIChjbGljayk9XCJwcmV2KClcIiBbaW5uZXJIVE1MXT1cIm5hdkRhdGE/LnByZXY/Lmh0bWxUZXh0XCI+PC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm93bC1uZXh0XCIgW25nQ2xhc3NdPVwieydkaXNhYmxlZCc6IG5hdkRhdGE/Lm5leHQ/LmRpc2FibGVkfVwiIChjbGljayk9XCJuZXh0KClcIiBbaW5uZXJIVE1MXT1cIm5hdkRhdGE/Lm5leHQ/Lmh0bWxUZXh0XCI+PC9kaXY+XHJcbiAgICAgIDwvZGl2PiA8IS0tIC8ub3dsLW5hdiAtLT5cclxuICAgICAgPGRpdiBjbGFzcz1cIm93bC1kb3RzXCIgW25nQ2xhc3NdPVwieydkaXNhYmxlZCc6IGRvdHNEYXRhPy5kaXNhYmxlZH1cIj5cclxuICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBkb3Qgb2YgZG90c0RhdGE/LmRvdHNcIiBjbGFzcz1cIm93bC1kb3RcIiBbbmdDbGFzc109XCJ7J2FjdGl2ZSc6IGRvdC5hY3RpdmUsICdvd2wtZG90LXRleHQnOiBkb3Quc2hvd0lubmVyQ29udGVudH1cIiAoY2xpY2spPVwibW92ZUJ5RG90KGRvdC5pZClcIj5cclxuICAgICAgICAgIDxzcGFuIFtpbm5lckhUTUxdPVwiZG90LmlubmVyQ29udGVudFwiPjwvc3Bhbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+IDwhLS0gLy5vd2wtZG90cyAtLT5cclxuICAgIDwvZGl2PiA8IS0tIC8ub3dsLWNhcm91c2VsIG93bC1sb2FkZWQgLS0+XHJcbiAgYCxcclxuICBzdHlsZXM6IFtgLm93bC10aGVtZSB7IGRpc3BsYXk6IGJsb2NrOyB9YF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBOYXZpZ2F0aW9uU2VydmljZSxcclxuICAgIEF1dG9wbGF5U2VydmljZSxcclxuICAgIENhcm91c2VsU2VydmljZSxcclxuICAgIExhenlMb2FkU2VydmljZSxcclxuICAgIEFuaW1hdGVTZXJ2aWNlLFxyXG4gICAgQXV0b0hlaWdodFNlcnZpY2UsXHJcbiAgICBIYXNoU2VydmljZVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIENhcm91c2VsQ29tcG9uZW50XHJcbiAgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudENoZWNrZWQsIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XHJcbiAgQENvbnRlbnRDaGlsZHJlbihDYXJvdXNlbFNsaWRlRGlyZWN0aXZlKVxyXG4gIHNsaWRlczogUXVlcnlMaXN0PENhcm91c2VsU2xpZGVEaXJlY3RpdmU+O1xyXG5cclxuICBAT3V0cHV0KCkgdHJhbnNsYXRlZCA9IG5ldyBFdmVudEVtaXR0ZXI8U2xpZGVzT3V0cHV0RGF0YT4oKTtcclxuICBAT3V0cHV0KCkgZHJhZ2dpbmcgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdpZHRoIG9mIGNhcm91c2VsIHdpbmRvdyAodGFnIHdpdGggY2xhc3MgLm93bC1jYXJvdXNlbCksIGluIHdpY2ggd2UgY2FuIHNlZSBtb3Zpbmcgc2xpZGVyc1xyXG4gICAqL1xyXG4gIGNhcm91c2VsV2luZG93V2lkdGg6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaXB0aW9uIHRvICdyZXNpemUnIGV2ZW50XHJcbiAgICovXHJcbiAgcmVzaXplU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlwdGlvbiBtZXJnZSBPYnNlcnZhYmxlLCB3aGljaCBtZXJnZXMgYWxsIE9ic2VydmFibGVzIGluIHRoZSBjb21wb25lbnQgZXhjZXB0ICdyZXNpemUnIE9ic2VydmFibGVcclxuICAgKi9cclxuICBwcml2YXRlIF9hbGxPYnNlcnZTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ3VycmVudCBzZXR0aW5ncyBmb3IgdGhlIGNhcm91c2VsLlxyXG4gICAqL1xyXG4gIG93bERPTURhdGE6IE93bERPTURhdGE7XHJcblxyXG4gIC8qKlxyXG4gICAqIERhdGEgb2Ygb3dsLXN0YWdlXHJcbiAgICovXHJcblx0c3RhZ2VEYXRhOiBTdGFnZURhdGE7XHJcblxyXG5cdC8qKlxyXG5cdCAqICBEYXRhIG9mIGV2ZXJ5IHNsaWRlXHJcblx0ICovXHJcbiAgc2xpZGVzRGF0YTogU2xpZGVNb2RlbFtdO1xyXG5cclxuICAvKipcclxuXHQgKiBEYXRhIG9mIG5hdmlnYXRpb24gYmxvY2tcclxuXHQgKi9cclxuXHRuYXZEYXRhOiBOYXZEYXRhO1xyXG5cclxuXHQvKipcclxuXHQgKiBEYXRhIG9mIGRvdHMgYmxvY2tcclxuXHQgKi9cclxuICBkb3RzRGF0YTogRG90c0RhdGE7XHJcblxyXG4gIC8qKlxyXG4gICAqIERhdGEsIHdpY2ggYXJlIHBhc3NlZCBvdXQgb2YgY2Fyb3VzZWwgYWZ0ZXIgZW5kaW5nIG9mIHRyYW5zaW9uaW5nIG9mIGNhcm91c2VsXHJcbiAgICovXHJcbiAgc2xpZGVzT3V0cHV0RGF0YTogU2xpZGVzT3V0cHV0RGF0YTtcclxuXHJcbiAgLyoqXHJcbiAgICogU2hvd3Mgd2hldGhlciBjYXJvdXNlbCBpcyBsb2FkZWQgb2Ygbm90LlxyXG4gICAqL1xyXG4gIGNhcm91c2VsTG9hZGVkID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZXIncyBvcHRpb25zXHJcbiAgICovXHJcbiAgQElucHV0KCkgb3B0aW9uczogT3dsT3B0aW9ucztcclxuXHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2YWJsZSBmb3IgZ2V0dGluZyBjdXJyZW50IFZpZXcgU2V0dGluZ3NcclxuICAgKi9cclxuICBwcml2YXRlIF92aWV3Q3VyU2V0dGluZ3MkOiBPYnNlcnZhYmxlPENhcm91c2VsQ3VycmVudERhdGE+O1xyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZhYmxlIGZvciBjYXRjaGluZyB0aGUgZW5kIG9mIHRyYW5zaXRpb24gb2YgY2Fyb3VzZWxcclxuICAgKi9cclxuICBwcml2YXRlIF90cmFuc2xhdGVkQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz47XHJcblxyXG4gIC8qKlxyXG4gICAqIE9ic2VydmFibGUgZm9yIGNhdGNoaW5nIHRoZSBzdGFydCBvZiBkcmFnZ2luZyBvZiB0aGUgY2Fyb3VzZWxcclxuICAgKi9cclxuICBwcml2YXRlIF9kcmFnZ2luZ0Nhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+O1xyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZhYmxlIGZvciBtZXJnaW5nIGFsbCBPYnNlcnZhYmxlcyBhbmQgY3JlYXRpbmcgb25lIHN1YnNjcmlwdGlvblxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2Nhcm91c2VsTWVyZ2UkOiBPYnNlcnZhYmxlPENhcm91c2VsQ3VycmVudERhdGEgfCBzdHJpbmc+O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXHJcbiAgICBwcml2YXRlIHJlc2l6ZVNlcnZpY2U6IFJlc2l6ZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNhcm91c2VsU2VydmljZTogQ2Fyb3VzZWxTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBuYXZpZ2F0aW9uU2VydmljZTogTmF2aWdhdGlvblNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGF1dG9wbGF5U2VydmljZTogQXV0b3BsYXlTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBsYXp5TG9hZFNlcnZpY2U6IExhenlMb2FkU2VydmljZSxcclxuICAgIHByaXZhdGUgYW5pbWF0ZVNlcnZpY2U6IEFuaW1hdGVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBhdXRvSGVpZ2h0U2VydmljZTogQXV0b0hlaWdodFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGhhc2hTZXJ2aWNlOiBIYXNoU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnNweURhdGFTdHJlYW1zKCk7XHJcblxyXG4gICAgdGhpcy5jYXJvdXNlbFdpbmRvd1dpZHRoID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgICcub3dsLWNhcm91c2VsJ1xyXG4gICAgKS5jbGllbnRXaWR0aDtcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcclxuICB9XHJcbiAgLy8gbmdBZnRlckNvbnRlbnRDaGVja2VkKCkgRU5EXHJcblxyXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcclxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHVwKHRoaXMuY2Fyb3VzZWxXaW5kb3dXaWR0aCwgdGhpcy5zbGlkZXMudG9BcnJheSgpLCB0aGlzLm9wdGlvbnMpO1xyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UuaW5pdGlhbGl6ZSh0aGlzLnNsaWRlcy50b0FycmF5KCkpO1xyXG5cclxuICAgIHRoaXMuX3dpblJlc2l6ZVdhdGNoZXIoKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgaWYgKHRoaXMucmVzaXplU3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgIHRoaXMucmVzaXplU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fYWxsT2JzZXJ2U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBKb2lucyB0aGUgb2JzZXJ2YWJsZSBsb2dpbiBpbiBvbmUgcGxhY2U6IHNldHMgdmFsdWVzIHRvIHNvbWUgb2JzZXJ2YWJsZXMsIG1lcmdlcyB0aGlzIG9ic2VydmFibGVzIGFuZFxyXG4gICAqIHN1YmNyaWJlcyB0byBtZXJnZSBmdW5jXHJcbiAgICovXHJcbiAgc3B5RGF0YVN0cmVhbXMoKSB7XHJcbiAgICB0aGlzLl92aWV3Q3VyU2V0dGluZ3MkID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0Vmlld0N1clNldHRpbmdzKCkucGlwZShcclxuICAgICAgdGFwKGRhdGEgPT4ge1xyXG4gICAgICAgIHRoaXMub3dsRE9NRGF0YSA9IGRhdGEub3dsRE9NRGF0YTtcclxuICAgICAgICB0aGlzLnN0YWdlRGF0YSA9IGRhdGEuc3RhZ2VEYXRhO1xyXG4gICAgICAgIHRoaXMuc2xpZGVzRGF0YSA9IGRhdGEuc2xpZGVzRGF0YTtcclxuICAgICAgICBpZiAoIXRoaXMuY2Fyb3VzZWxMb2FkZWQpIHtcclxuICAgICAgICAgIHRoaXMuY2Fyb3VzZWxMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5hdkRhdGEgPSBkYXRhLm5hdkRhdGE7XHJcbiAgICAgICAgdGhpcy5kb3RzRGF0YSA9IGRhdGEuZG90c0RhdGE7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuX3RyYW5zbGF0ZWRDYXJvdXNlbCQgPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRUcmFuc2xhdGVkU3RhdGUoKS5waXBlKFxyXG4gICAgICB0YXAoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZ2F0aGVyVHJhbnNsYXRlZERhdGEoKTtcclxuICAgICAgICB0aGlzLnRyYW5zbGF0ZWQuZW1pdCh0aGlzLnNsaWRlc091dHB1dERhdGEpO1xyXG4gICAgICAgIHRoaXMuc2xpZGVzT3V0cHV0RGF0YSA9IHt9O1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLl9kcmFnZ2luZ0Nhcm91c2VsJCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldERyYWdTdGF0ZSgpLnBpcGUoXHJcbiAgICAgIHRhcCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5kcmFnZ2luZy5lbWl0KHRydWUpO1xyXG4gICAgICB9KSxcclxuICAgICAgc3dpdGNoTWFwKFxyXG4gICAgICAgICgpID0+IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldFRyYW5zbGF0ZWRTdGF0ZSgpLnBpcGUoXHJcbiAgICAgICAgICBmaXJzdCgpLFxyXG4gICAgICAgICAgdGFwKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5kcmFnZ2luZy5lbWl0KGZhbHNlKTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgKVxyXG4gICAgICApXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuX2Nhcm91c2VsTWVyZ2UkID0gbWVyZ2UodGhpcy5fdmlld0N1clNldHRpbmdzJCwgdGhpcy5fdHJhbnNsYXRlZENhcm91c2VsJCwgdGhpcy5fZHJhZ2dpbmdDYXJvdXNlbCQpO1xyXG4gICAgdGhpcy5fYWxsT2JzZXJ2U3Vic2NyaXB0aW9uID0gdGhpcy5fY2Fyb3VzZWxNZXJnZSQuc3Vic2NyaWJlKCgpID0+IHt9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXQgc3Vic2NyaXB0aW9uIHRvIHJlc2l6ZSBldmVudCBhbmQgYXR0YWNoZXMgaGFuZGxlciBmb3IgdGhpcyBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3dpblJlc2l6ZVdhdGNoZXIoKSB7XHJcbiAgICBpZiAoT2JqZWN0LmtleXModGhpcy5jYXJvdXNlbFNlcnZpY2UuX29wdGlvbnMucmVzcG9uc2l2ZSkubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMucmVzaXplU3Vic2NyaXB0aW9uID0gdGhpcy5yZXNpemVTZXJ2aWNlLm9uUmVzaXplJFxyXG4gICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgZmlsdGVyKCgpID0+IHRoaXMuY2Fyb3VzZWxXaW5kb3dXaWR0aCAhPT0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vd2wtY2Fyb3VzZWwnKS5jbGllbnRXaWR0aCksXHJcbiAgICAgICAgICBkZWxheSh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5yZXNwb25zaXZlUmVmcmVzaFJhdGUpXHJcbiAgICAgICAgKVxyXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uub25SZXNpemUodGhpcy5lbC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vd2wtY2Fyb3VzZWwnKS5jbGllbnRXaWR0aCk7XHJcbiAgICAgICAgICB0aGlzLmNhcm91c2VsV2luZG93V2lkdGggPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLm93bC1jYXJvdXNlbCcpLmNsaWVudFdpZHRoO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlciBmb3IgdHJhbnNpdGlvZW5kIGV2ZW50XHJcbiAgICovXHJcbiAgb25UcmFuc2l0aW9uRW5kKCkge1xyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uub25UcmFuc2l0aW9uRW5kKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGVyIGZvciBjbGljayBldmVudCwgYXR0YWNoZWQgdG8gbmV4dCBidXR0b25cclxuICAgKi9cclxuICBuZXh0KCkge1xyXG4gICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5uZXh0KHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLm5hdlNwZWVkKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhbmRsZXIgZm9yIGNsaWNrIGV2ZW50LCBhdHRhY2hlZCB0byBwcmV2IGJ1dHRvblxyXG4gICAqL1xyXG4gIHByZXYoKSB7XHJcbiAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLnByZXYodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MubmF2U3BlZWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlciBmb3IgY2xpY2sgZXZlbnQsIGF0dGFjaGVkIHRvIGRvdHNcclxuICAgKi9cclxuICBtb3ZlQnlEb3QoZG90SWQ6IHN0cmluZykge1xyXG4gICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5tb3ZlQnlEb3QoZG90SWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogcmV3aW5kcyBjYXJvdXNlbCB0byBzbGlkZSB3aXRoIG5lZWRlZCBpZFxyXG4gICAqIEBwYXJhbSBpZCBmcmFnbWVudCBvZiB1cmxcclxuICAgKi9cclxuICB0byhpZDogc3RyaW5nKSB7XHJcbiAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLnRvU2xpZGVCeUlkKGlkKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdhdGhlcnMgYW5kIHByZXBhcmVzIGRhdGEgaW50ZW5kZWQgZm9yIHBhc3NpbmcgdG8gdGhlIHVzZXIgYnkgbWVhbnMgb2YgZmlyaW5nIGV2ZW50IHRyYW5zbGF0ZWRDYXJvdXNlbFxyXG4gICAqL1xyXG4gIGdhdGhlclRyYW5zbGF0ZWREYXRhKCkge1xyXG4gICAgbGV0IHN0YXJ0UG9zaXRpb246IG51bWJlcjtcclxuICAgIGNvbnN0IGNsb25lZElkUHJlZml4ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuY2xvbmVkSWRQcmVmaXg7XHJcbiAgICBjb25zdCBhY3RpdmVTbGlkZXM6IFNsaWRlTW9kZWxbXSA9IHRoaXMuc2xpZGVzRGF0YVxyXG4gICAgICAuZmlsdGVyKHNsaWRlID0+IHNsaWRlLmlzQWN0aXZlID09PSB0cnVlKVxyXG4gICAgICAubWFwKHNsaWRlID0+IHtcclxuICAgICAgICBjb25zdCBpZCA9IHNsaWRlLmlkLmluZGV4T2YoY2xvbmVkSWRQcmVmaXgpID49IDAgPyBzbGlkZS5pZC5zbGljZShjbG9uZWRJZFByZWZpeC5sZW5ndGgpIDogc2xpZGUuaWQ7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIGlkOiBpZCxcclxuICAgICAgICAgIHdpZHRoOiBzbGlkZS53aWR0aCxcclxuICAgICAgICAgIG1hcmdpbkw6IHNsaWRlLm1hcmdpbkwsXHJcbiAgICAgICAgICBtYXJnaW5SOiBzbGlkZS5tYXJnaW5SLFxyXG4gICAgICAgICAgY2VudGVyOiBzbGlkZS5pc0NlbnRlcmVkXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIHN0YXJ0UG9zaXRpb24gPSB0aGlzLmNhcm91c2VsU2VydmljZS5yZWxhdGl2ZSh0aGlzLmNhcm91c2VsU2VydmljZS5jdXJyZW50KCkpO1xyXG4gICAgdGhpcy5zbGlkZXNPdXRwdXREYXRhID0ge1xyXG4gICAgICBzdGFydFBvc2l0aW9uOiBzdGFydFBvc2l0aW9uLFxyXG4gICAgICBzbGlkZXM6IGFjdGl2ZVNsaWRlc1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnRzIHBhdXNpbmdcclxuICAgKi9cclxuICBzdGFydFBhdXNpbmcoKSB7XHJcbiAgICB0aGlzLmF1dG9wbGF5U2VydmljZS5zdGFydFBhdXNpbmcoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0YXJ0cyBwbGF5aW5nIGFmdGVyIG1vdXNlIGxlYXZlcyBjYXJvdXNlbFxyXG4gICAqL1xyXG4gIHN0YXJ0UGxheU1MKCkge1xyXG4gICAgdGhpcy5hdXRvcGxheVNlcnZpY2Uuc3RhcnRQbGF5aW5nTW91c2VMZWF2ZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnRzIHBsYXlpbmcgYWZ0ZXIgdG91Y2ggZW5kc1xyXG4gICAqL1xyXG4gIHN0YXJ0UGxheVRFKCkge1xyXG4gICAgdGhpcy5hdXRvcGxheVNlcnZpY2Uuc3RhcnRQbGF5aW5nVG91Y2hFbmQoKTtcclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgTmdab25lLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIFJlbmRlcmVyMiwgT25Jbml0LCBPbkRlc3Ryb3ksIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENhcm91c2VsU2VydmljZSwgQ29vcmRzIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvY2Fyb3VzZWwuc2VydmljZSc7XHJcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBmaXJzdCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgU3RhZ2VEYXRhIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3N0YWdlLWRhdGEubW9kZWwnO1xyXG5pbXBvcnQgeyBTbGlkZU1vZGVsIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3NsaWRlLm1vZGVsJztcclxuaW1wb3J0IHsgQW5pbWF0ZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hbmltYXRlLnNlcnZpY2UnO1xyXG5pbXBvcnQge1xyXG4gIHRyaWdnZXIsXHJcbiAgc3RhdGUsXHJcbiAgc3R5bGUsXHJcbiAgYW5pbWF0ZSxcclxuICB0cmFuc2l0aW9uXHJcbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnb3dsLXN0YWdlJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cIm93bC1zdGFnZVwiIFtuZ1N0eWxlXT1cInsnd2lkdGgnOiBzdGFnZURhdGEud2lkdGggKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3RyYW5zZm9ybSc6IHN0YWdlRGF0YS50cmFuc2Zvcm0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndHJhbnNpdGlvbic6IHN0YWdlRGF0YS50cmFuc2l0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3BhZGRpbmctbGVmdCc6IHN0YWdlRGF0YS5wYWRkaW5nTCArICdweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncGFkZGluZy1yaWdodCc6IHN0YWdlRGF0YS5wYWRkaW5nUiArICdweCcgfVwiXHJcbiAgICAgICAgICAodHJhbnNpdGlvbmVuZCk9XCJvblRyYW5zaXRpb25FbmQoKVwiPlxyXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IHNsaWRlIG9mIHNsaWRlc0RhdGE7IGxldCBpID0gaW5kZXhcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJvd2wtaXRlbVwiIFtuZ0NsYXNzXT1cInNsaWRlLmNsYXNzZXNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cInsnd2lkdGgnOiBzbGlkZS53aWR0aCArICdweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ21hcmdpbi1sZWZ0Jzogc2xpZGUubWFyZ2luTCArICdweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ21hcmdpbi1yaWdodCc6IHNsaWRlLm1hcmdpblIgKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdsZWZ0Jzogc2xpZGUubGVmdH1cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChhbmltYXRpb25lbmQpPVwiY2xlYXIoc2xpZGUuaWQpXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbQGF1dG9IZWlnaHRdPVwic2xpZGUuaGVpZ2h0U3RhdGVcIj5cclxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ0lmPVwic2xpZGUubG9hZFwiIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInNsaWRlLnRwbFJlZlwiPjwvbmctdGVtcGxhdGU+XHJcbiAgICAgICAgICA8L2Rpdj48IS0tIC8ub3dsLWl0ZW0gLS0+XHJcbiAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgIDwvZGl2PjwhLS0gLy5vd2wtc3RhZ2UgLS0+XHJcbiAgICA8L2Rpdj5cclxuICBgLFxyXG4gIGFuaW1hdGlvbnM6IFtcclxuICAgIHRyaWdnZXIoJ2F1dG9IZWlnaHQnLCBbXHJcbiAgICAgIHN0YXRlKCdudWxsZWQnLCBzdHlsZSh7aGVpZ2h0OiAwfSkpLFxyXG4gICAgICBzdGF0ZSgnZnVsbCcsIHN0eWxlKHtoZWlnaHQ6ICcqJ30pKSxcclxuICAgICAgdHJhbnNpdGlvbignZnVsbCA9PiBudWxsZWQnLCBbXHJcbiAgICAgICAgLy8gc3R5bGUoe2hlaWdodDogJyonfSksXHJcbiAgICAgICAgYW5pbWF0ZSgnNzAwbXMgMzUwbXMnKVxyXG4gICAgICBdKSxcclxuICAgICAgdHJhbnNpdGlvbignbnVsbGVkID0+IGZ1bGwnLCBbXHJcbiAgICAgICAgLy8gc3R5bGUoe2hlaWdodDogMH0pLFxyXG4gICAgICAgIGFuaW1hdGUoMzUwKVxyXG4gICAgICBdKSxcclxuICAgIF0pXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU3RhZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgLyoqXHJcbiAgICogT2JqZWN0IHdpdGggc2V0dGluZ3Mgd2hpY2ggbWFrZSBjYXJvdXNlbCBkcmFnZ2FibGUgYnkgdG91Y2ggb3IgbW91c2VcclxuICAgKi9cclxuICBASW5wdXQoKSBvd2xEcmFnZ2FibGU6IHtcclxuICAgIGlzTW91c2VEcmFnYWJsZTogYm9vbGVhbixcclxuICAgIGlzVG91Y2hEcmFnYWJsZTogYm9vbGVhblxyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIERhdGEgb2Ygb3dsLXN0YWdlXHJcbiAgICovXHJcbiAgQElucHV0KCkgc3RhZ2VEYXRhOiBTdGFnZURhdGE7XHJcblxyXG5cdC8qKlxyXG5cdCAqICBEYXRhIG9mIGV2ZXJ5IHNsaWRlXHJcblx0ICovXHJcbiAgQElucHV0KCkgc2xpZGVzRGF0YTogU2xpZGVNb2RlbFtdO1xyXG5cclxuICAvKipcclxuICAgKiBGdW5jdGlvbiB3aWNoIHdpbGwgYmUgcmV0dXJuZWQgYWZ0ZXIgYXR0YWNoaW5nIGxpc3RlbmVyIHRvICdtb3VzZW1vdmUnIGV2ZW50XHJcbiAgICovXHJcbiAgbGlzdGVuZXJNb3VzZU1vdmU6ICgpID0+IHZvaWQ7XHJcbiAgLyoqXHJcbiAgICogRnVuY3Rpb24gd2ljaCB3aWxsIGJlIHJldHVybmVkIGFmdGVyIGF0dGFjaGluZyBsaXN0ZW5lciB0byAndG91Y2htb3ZlJyBldmVudFxyXG4gICAqL1xyXG4gIGxpc3RlbmVyVG91Y2hNb3ZlOiAoKSA9PiB2b2lkO1xyXG4gIC8qKlxyXG4gICAqIEZ1bmN0aW9uIHdpY2ggd2lsbCBiZSByZXR1cm5lZCBhZnRlciBhdHRhY2hpbmcgbGlzdGVuZXIgdG8gJ21vdXNlbW92ZScgZXZlbnRcclxuICAgKi9cclxuICBsaXN0ZW5lck9uZU1vdXNlTW92ZTogKCkgPT4gdm9pZDtcclxuICAvKipcclxuICAgKiBGdW5jdGlvbiB3aWNoIHdpbGwgYmUgcmV0dXJuZWQgYWZ0ZXIgYXR0YWNoaW5nIGxpc3RlbmVyIHRvICd0b3VjaG1vdmUnIGV2ZW50XHJcbiAgICovXHJcbiAgbGlzdGVuZXJPbmVUb3VjaE1vdmU6ICgpID0+IHZvaWQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIEZ1bmN0aW9uIHdpY2ggd2lsbCBiZSByZXR1cm5lZCBhZnRlciBhdHRhY2hpbmcgbGlzdGVuZXIgdG8gJ21vdXNldXAnIGV2ZW50XHJcbiAgICovXHJcbiAgbGlzdGVuZXJNb3VzZVVwOiAoKSA9PiB2b2lkO1xyXG4gIC8qKlxyXG4gICAqIEZ1bmN0aW9uIHdpY2ggd2lsbCBiZSByZXR1cm5lZCBhZnRlciBhdHRhY2hpbmcgbGlzdGVuZXIgdG8gJ3RvdWNoZW5kJyBldmVudFxyXG4gICAqL1xyXG4gIGxpc3RlbmVyVG91Y2hFbmQ6ICgpID0+IHZvaWQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIEZ1bmN0aW9uIHdpY2ggd2lsbCBiZSByZXR1cm5lZCBhZnRlciBhdHRhY2hpbmcgbGlzdGVuZXIgdG8gJ2NsaWNrJyBldmVudFxyXG4gICAqL1xyXG4gIGxpc3RlbmVyT25lQ2xpY2s6ICgpID0+IHZvaWQ7XHJcblxyXG4gIGxpc3RlbmVyQVRhZzogKCkgPT4gdm9pZDtcclxuXHJcbiAgLyoqXHJcbiAgICogT2JqZWN0IHdpdGggZGF0YSBuZWVkZWQgZm9yIGRyYWdnaW5nXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZHJhZzogYW55ID0ge1xyXG4gICAgdGltZTogbnVsbCxcclxuICAgIHRhcmdldDogbnVsbCxcclxuICAgIHBvaW50ZXI6IG51bGwsXHJcbiAgICBzdGFnZToge1xyXG4gICAgICBzdGFydDogbnVsbCxcclxuICAgICAgY3VycmVudDogbnVsbFxyXG4gICAgfSxcclxuICAgIGRpcmVjdGlvbjogbnVsbCxcclxuICAgIGFjdGl2ZTogZmFsc2UsXHJcbiAgICBtb3Zpbmc6IGZhbHNlXHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uIHdoZW4gdGhlIGNhcm91c2VsJ3MgcmVidWlsZGluZyBjYXVzZWQgYnkgcmVzaXplIGV2ZW50IHN0YXJ0c1xyXG4gICAqL1xyXG4gIHByaXZhdGUgX29uZURyYWdNb3ZlJCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2N0aXB0aW9uIHRvIF9vbmVEcmFnTW92ZSQgU3ViamVjdFxyXG4gICAqL1xyXG4gIHByaXZhdGUgX29uZU1vdmVTdWJzcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHpvbmU6IE5nWm9uZSxcclxuICAgICAgICAgICAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICAgICAgICAgICAgICBwcml2YXRlIGNhcm91c2VsU2VydmljZTogQ2Fyb3VzZWxTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgYW5pbWF0ZVNlcnZpY2U6IEFuaW1hdGVTZXJ2aWNlKSB7IH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignbW91c2Vkb3duJywgWyckZXZlbnQnXSkgb25Nb3VzZURvd24oZXZlbnQpIHtcclxuICAgIGlmICh0aGlzLm93bERyYWdnYWJsZS5pc01vdXNlRHJhZ2FibGUpIHtcclxuICAgICAgdGhpcy5fb25EcmFnU3RhcnQoZXZlbnQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcigndG91Y2hzdGFydCcsIFsnJGV2ZW50J10pIG9uVG91Y2hTdGFydChldmVudCkge1xyXG4gICAgaWYgKHRoaXMub3dsRHJhZ2dhYmxlLmlzVG91Y2hEcmFnYWJsZSkge1xyXG4gICAgICB0aGlzLl9vbkRyYWdTdGFydChldmVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIFsnJGV2ZW50J10pIG9uVG91Y2hDYW5jZWwoZXZlbnQpIHtcclxuICAgIHRoaXMuX29uRHJhZ0VuZChldmVudCk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdkcmFnc3RhcnQnKSBvbkRyYWdTdGFydCgpIHtcclxuICAgIGlmICh0aGlzLm93bERyYWdnYWJsZS5pc01vdXNlRHJhZ2FibGUpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignc2VsZWN0c3RhcnQnKSBvblNlbGVjdFN0YXJ0KCkge1xyXG4gICAgaWYgKHRoaXMub3dsRHJhZ2dhYmxlLmlzTW91c2VEcmFnYWJsZSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuX29uZU1vdmVTdWJzcmlwdGlvbiA9IHRoaXMuX29uZURyYWdNb3ZlJFxyXG4gICAgICAucGlwZShmaXJzdCgpKVxyXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICB0aGlzLl9zZW5kQ2hhbmdlcygpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5fb25lTW92ZVN1YnNyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQYXNzZXMgdGhpcyB0byBfb25lTW91c2VUb3VjaE1vdmUoKTtcclxuICAgKi9cclxuICBiaW5kT25lTW91c2VUb3VjaE1vdmUgPSAoZXYpID0+IHtcclxuICAgIHRoaXMuX29uZU1vdXNlVG91Y2hNb3ZlKGV2KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFBhc3NlcyB0aGlzIHRvIF9vbkRyYWdNb3ZlKCk7XHJcbiAgICovXHJcbiAgYmluZE9uRHJhZ01vdmUgPSAoZXYpID0+IHtcclxuICAgIHRoaXMuX29uRHJhZ01vdmUoZXYpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUGFzc2VzIHRoaXMgdG8gX29uRHJhZ01vdmUoKTtcclxuICAgKi9cclxuICBiaW5kT25EcmFnRW5kID0gKGV2KSA9PiB7XHJcbiAgICAvLyB0aGlzLnpvbmUucnVuKCgpID0+IHtcclxuICAgICAgdGhpcy5fb25EcmFnRW5kKGV2KTtcclxuICAgIC8vIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcblx0ICogSGFuZGxlcyBgdG91Y2hzdGFydGAgYW5kIGBtb3VzZWRvd25gIGV2ZW50cy5cclxuXHQgKiBAdG9kbyBIb3Jpem9udGFsIHN3aXBlIHRocmVzaG9sZCBhcyBvcHRpb25cclxuXHQgKiBAdG9kbyAjMjYxXHJcblx0ICogQHBhcmFtIGV2ZW50IC0gVGhlIGV2ZW50IGFyZ3VtZW50cy5cclxuXHQgKi9cclxuXHRwcml2YXRlIF9vbkRyYWdTdGFydChldmVudCk6IGFueSB7XHJcblx0XHRsZXQgc3RhZ2U6IENvb3JkcyA9IG51bGw7XHJcblxyXG5cdFx0aWYgKGV2ZW50LndoaWNoID09PSAzKSB7XHJcblx0XHRcdHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBzdGFnZSA9IHRoaXMuX3ByZXBhcmVEcmFnZ2luZyhldmVudCk7XHJcblxyXG5cdFx0dGhpcy5fZHJhZy50aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcblx0XHR0aGlzLl9kcmFnLnRhcmdldCA9IGV2ZW50LnRhcmdldDtcclxuXHRcdHRoaXMuX2RyYWcuc3RhZ2Uuc3RhcnQgPSBzdGFnZTtcclxuXHRcdHRoaXMuX2RyYWcuc3RhZ2UuY3VycmVudCA9IHN0YWdlO1xyXG4gICAgdGhpcy5fZHJhZy5wb2ludGVyID0gdGhpcy5fcG9pbnRlcihldmVudCk7XHJcbiAgICB0aGlzLl9kcmFnLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5saXN0ZW5lck1vdXNlVXAgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbihkb2N1bWVudCwgJ21vdXNldXAnLCB0aGlzLmJpbmRPbkRyYWdFbmQpO1xyXG4gICAgdGhpcy5saXN0ZW5lclRvdWNoRW5kID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oZG9jdW1lbnQsICd0b3VjaGVuZCcsIHRoaXMuYmluZE9uRHJhZ0VuZCk7XHJcblxyXG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgdGhpcy5saXN0ZW5lck9uZU1vdXNlTW92ZSA9IHRoaXMucmVuZGVyZXIubGlzdGVuKGRvY3VtZW50LCAnbW91c2Vtb3ZlJywgdGhpcy5iaW5kT25lTW91c2VUb3VjaE1vdmUpO1xyXG4gICAgICB0aGlzLmxpc3RlbmVyT25lVG91Y2hNb3ZlID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oZG9jdW1lbnQsICd0b3VjaG1vdmUnLCB0aGlzLmJpbmRPbmVNb3VzZVRvdWNoTW92ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBdHRhY2hlcyBsaXN0ZW5lcnMgdG8gYHRvdWNobW92ZWAgYW5kIGBtb3VzZW1vdmVgIGV2ZW50czsgaW5pdGlhdGVzIHVwZGF0aW5nIGNhcm91c2VsIGFmdGVyIHN0YXJ0aW5nIGRyYWdnaW5nXHJcbiAgICogQHBhcmFtIGV2ZW50IGV2ZW50IG9iamVjaCBvZiBtb3VzZSBvciB0b3VjaCBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgX29uZU1vdXNlVG91Y2hNb3ZlKGV2ZW50KSB7XHJcbiAgICBpZiAoIXRoaXMuX2RyYWcuYWN0aXZlKSByZXR1cm4gZmFsc2U7XHJcbiAgICBjb25zdCBkZWx0YSA9IHRoaXMuX2RpZmZlcmVuY2UodGhpcy5fZHJhZy5wb2ludGVyLCB0aGlzLl9wb2ludGVyKGV2ZW50KSk7XHJcbiAgICBpZiAodGhpcy5saXN0ZW5lckFUYWcpIHtcclxuICAgICAgdGhpcy5saXN0ZW5lckFUYWcoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmxpc3RlbmVyT25lTW91c2VNb3ZlKCk7XHJcbiAgICB0aGlzLmxpc3RlbmVyT25lVG91Y2hNb3ZlKCk7XHJcblxyXG4gICAgaWYgKE1hdGguYWJzKGRlbHRhLngpIDwgTWF0aC5hYnMoZGVsdGEueSkgJiYgdGhpcy5faXMoJ3ZhbGlkJykpIHtcclxuICAgICAgdGhpcy5fZHJhZy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fZHJhZy5tb3ZpbmcgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuYmxvY2tDbGlja0FuY2hvckluRHJhZ2dpbmcoZXZlbnQpO1xyXG5cclxuICAgIHRoaXMubGlzdGVuZXJNb3VzZU1vdmUgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbihkb2N1bWVudCwgJ21vdXNlbW92ZScsIHRoaXMuYmluZE9uRHJhZ01vdmUpO1xyXG4gICAgdGhpcy5saXN0ZW5lclRvdWNoTW92ZSA9IHRoaXMucmVuZGVyZXIubGlzdGVuKGRvY3VtZW50LCAndG91Y2htb3ZlJywgdGhpcy5iaW5kT25EcmFnTW92ZSk7XHJcblxyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICB0aGlzLl9lbnRlckRyYWdnaW5nKCk7XHJcbiAgICB0aGlzLl9vbmVEcmFnTW92ZSQubmV4dChldmVudCk7XHJcbiAgICAvLyB0aGlzLl9zZW5kQ2hhbmdlcygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQXR0YWNoZXMgaGFuZGxlciB0byBIVE1MQW5jaG9yRWxlbWVudCBmb3IgcHJldmVudGluZyBjbGljayB3aGlsZSBjYXJvdXNlbCBpcyBiZWluZyBkcmFnZ2VkXHJcbiAgICogQHBhcmFtIGV2ZW50IGV2ZW50IG9iamVjdFxyXG4gICAqL1xyXG4gIHByaXZhdGUgYmxvY2tDbGlja0FuY2hvckluRHJhZ2dpbmcoZXZlbnQ6IGFueSkge1xyXG4gICAgbGV0IHRhcmdldDogSFRNTEVsZW1lbnQgfCBudWxsID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgd2hpbGUgKHRhcmdldCAmJiAhKHRhcmdldCBpbnN0YW5jZW9mIEhUTUxBbmNob3JFbGVtZW50KSkge1xyXG4gICAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50RWxlbWVudDtcclxuICAgIH1cclxuICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBIVE1MQW5jaG9yRWxlbWVudCkge1xyXG4gICAgICB0aGlzLmxpc3RlbmVyQVRhZyA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRhcmdldCwgJ2NsaWNrJywgKCkgPT4gZmFsc2UpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgXHQvKipcclxuXHQgKiBIYW5kbGVzIHRoZSBgdG91Y2htb3ZlYCBhbmQgYG1vdXNlbW92ZWAgZXZlbnRzLlxyXG5cdCAqIEB0b2RvICMyNjFcclxuXHQgKiBAcGFyYW0gZXZlbnQgLSBUaGUgZXZlbnQgYXJndW1lbnRzLlxyXG5cdCAqL1xyXG5cdHByaXZhdGUgX29uRHJhZ01vdmUoZXZlbnQpIHtcclxuICAgIGlmICghdGhpcy5fZHJhZy5hY3RpdmUpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICBsZXQgc3RhZ2U6IENvb3JkcztcclxuICAgIGNvbnN0IHN0YWdlT3JFeGl0OiBib29sZWFuIHwgQ29vcmRzID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZGVmaW5lTmV3Q29vcmRzRHJhZyhldmVudCwgdGhpcy5fZHJhZyk7XHJcblxyXG4gICAgaWYgKHN0YWdlT3JFeGl0ID09PSBmYWxzZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBzdGFnZSA9IHN0YWdlT3JFeGl0IGFzIENvb3JkcztcclxuXHJcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIHRoaXMuX2RyYWcuc3RhZ2UuY3VycmVudCA9IHN0YWdlO1xyXG5cdFx0dGhpcy5fYW5pbWF0ZShzdGFnZS54IC0gdGhpcy5fZHJhZy5zdGFnZS5zdGFydC54KTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBNb3ZlcyAub3dsLXN0YWdlIGxlZnQtcmlnaHRcclxuICAgKiBAcGFyYW0gY29vcmRpbmF0ZSBjb29yZGluYXRlIHRvIGJlIHNldCB0byAub3dsLXN0YWdlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfYW5pbWF0ZShjb29yZGluYXRlOiBudW1iZXIpIHtcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdLCAndHJhbnNmb3JtJywgYHRyYW5zbGF0ZTNkKCR7Y29vcmRpbmF0ZX1weCwwcHgsMHB4YCk7XHJcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXSwgJ3RyYW5zaXRpb24nLCAnMHMnKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEhhbmRsZXMgdGhlIGB0b3VjaGVuZGAgYW5kIGBtb3VzZXVwYCBldmVudHMuXHJcblx0ICogQHRvZG8gIzI2MVxyXG5cdCAqIEB0b2RvIFRocmVzaG9sZCBmb3IgY2xpY2sgZXZlbnRcclxuXHQgKiBAcGFyYW0gZXZlbnQgLSBUaGUgZXZlbnQgYXJndW1lbnRzLlxyXG5cdCAqL1xyXG5cdHByaXZhdGUgX29uRHJhZ0VuZChldmVudCkge1xyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uub3dsRE9NRGF0YS5pc0dyYWIgPSBmYWxzZTtcclxuXHJcbiAgICBpZiAodGhpcy5fZHJhZy5tb3ZpbmcpIHtcclxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0sICd0cmFuc2Zvcm0nLCBgYCk7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdLCAndHJhbnNpdGlvbicsIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNwZWVkKCt0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5kcmFnRW5kU3BlZWQgfHwgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3Muc21hcnRTcGVlZCkvMTAwMCArJ3MnKTtcclxuXHJcbiAgICAgIHRoaXMuX2ZpbmlzaERyYWdnaW5nKGV2ZW50KTtcclxuICAgICAgdGhpcy5saXN0ZW5lck1vdXNlTW92ZSgpO1xyXG4gICAgICB0aGlzLmxpc3RlbmVyVG91Y2hNb3ZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fZHJhZyA9IHtcclxuICAgICAgdGltZTogbnVsbCxcclxuICAgICAgdGFyZ2V0OiBudWxsLFxyXG4gICAgICBwb2ludGVyOiBudWxsLFxyXG4gICAgICBzdGFnZToge1xyXG4gICAgICAgIHN0YXJ0OiBudWxsLFxyXG4gICAgICAgIGN1cnJlbnQ6IG51bGxcclxuICAgICAgfSxcclxuICAgICAgZGlyZWN0aW9uOiBudWxsLFxyXG4gICAgICBhY3RpdmU6IGZhbHNlLFxyXG4gICAgICBtb3Zpbmc6IGZhbHNlXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnRyaWdnZXIoJ2RyYWdnZWQnKTtcclxuICAgIHRoaXMubGlzdGVuZXJNb3VzZVVwKCk7XHJcbiAgICB0aGlzLmxpc3RlbmVyVG91Y2hFbmQoKTtcclxuICB9O1xyXG5cclxuICAvKipcclxuXHQgKiBQcmVwYXJlcyBkYXRhIGZvciBkcmFnZ2luZyBjYXJvdXNlbC4gSXQgc3RhcnRzIGFmdGVyIGZpcmluZyBgdG91Y2hzdGFydGAgYW5kIGBtb3VzZWRvd25gIGV2ZW50cy5cclxuXHQgKiBAcGFyYW0gZXZlbnQgLSBUaGUgZXZlbnQgYXJndW1lbnRzLlxyXG5cdCAqIEByZXR1cm5zIHN0YWdlIC0gb2JqZWN0IHdpdGggJ3gnIGFuZCAneScgY29vcmRpbmF0ZXMgb2YgLm93bC1zdGFnZVxyXG5cdCAqL1xyXG4gIHByaXZhdGUgX3ByZXBhcmVEcmFnZ2luZyhldmVudDogYW55KTogQ29vcmRzIHtcclxuICAgIHJldHVybiB0aGlzLmNhcm91c2VsU2VydmljZS5wcmVwYXJlRHJhZ2dpbmcoZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQXR0YWNoZXMgaGFuZGxlciBmb3IgJ2NsaWNrJyBldmVudCBvbiBhbnkgZWxlbWVudCBpbiAub3dsLXN0YWdlIGluIG9yZGVyIHRvIHByZXZlbnQgZHJhZ2dpbmcgd2hlbiBtb3Zpbmcgb2YgY3Vyc29yIGlzIGxlc3MgdGhhbiAzcHhcclxuICAgKi9cclxuICBwcml2YXRlIF9vbmVDbGlja0hhbmRsZXIgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmxpc3RlbmVyT25lQ2xpY2sgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLl9kcmFnLnRhcmdldCwgJ2NsaWNrJywgKCkgPT4gZmFsc2UpXHJcbiAgICB0aGlzLmxpc3RlbmVyT25lQ2xpY2soKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZpbmlzaGVzIGRyYWdnaW5nXHJcbiAgICogQHBhcmFtIGV2ZW50IG9iamVjdCBldmVudCBvZiAnbW91c2VVcCcgb2YgJ3RvdWNoZW5kJyBldmVudHNcclxuICAgKi9cclxuICBwcml2YXRlIF9maW5pc2hEcmFnZ2luZyhldmVudDogYW55KSB7XHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5maW5pc2hEcmFnZ2luZyhldmVudCwgdGhpcy5fZHJhZywgdGhpcy5fb25lQ2xpY2tIYW5kbGVyKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEdldHMgdW5pZmllZCBwb2ludGVyIGNvb3JkaW5hdGVzIGZyb20gZXZlbnQuXHJcblx0ICogQHBhcmFtIGV2ZW50IFRoZSBgbW91c2Vkb3duYCBvciBgdG91Y2hzdGFydGAgZXZlbnQuXHJcblx0ICogQHJldHVybnMgQ29udGFpbnMgYHhgIGFuZCBgeWAgY29vcmRpbmF0ZXMgb2YgY3VycmVudCBwb2ludGVyIHBvc2l0aW9uLlxyXG5cdCAqL1xyXG4gIHByaXZhdGUgX3BvaW50ZXIoZXZlbnQ6IGFueSk6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy5jYXJvdXNlbFNlcnZpY2UucG9pbnRlcihldmVudCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuXHQgKiBHZXRzIHRoZSBkaWZmZXJlbmNlIG9mIHR3byB2ZWN0b3JzLlxyXG5cdCAqIEBwYXJhbSBmaXJzdCBUaGUgZmlyc3QgdmVjdG9yLlxyXG5cdCAqIEBwYXJhbSBzZWNvbmQtIFRoZSBzZWNvbmQgdmVjdG9yLlxyXG5cdCAqIEByZXR1cm5zIFRoZSBkaWZmZXJlbmNlLlxyXG5cdCAqL1xyXG4gIHByaXZhdGUgX2RpZmZlcmVuY2UoZmlyc3RDOiBDb29yZHMsIHNlY29uZDogQ29vcmRzKTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLmNhcm91c2VsU2VydmljZS5kaWZmZXJlbmNlKGZpcnN0Qywgc2Vjb25kKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIENoZWNrcyB3aGV0aGVyIHRoZSBjYXJvdXNlbCBpcyBpbiBhIHNwZWNpZmljIHN0YXRlIG9yIG5vdC5cclxuXHQgKiBAcGFyYW0gc3BlY2lmaWNTdGF0ZSBUaGUgc3RhdGUgdG8gY2hlY2suXHJcblx0ICogQHJldHVybnMgVGhlIGZsYWcgd2hpY2ggaW5kaWNhdGVzIGlmIHRoZSBjYXJvdXNlbCBpcyBidXN5LlxyXG5cdCAqL1xyXG4gIHByaXZhdGUgX2lzKHNwZWNpZmljU3RhdGU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmlzKHNwZWNpZmljU3RhdGUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBFbnRlcnMgYSBzdGF0ZS5cclxuICAqIEBwYXJhbSBuYW1lIFRoZSBzdGF0ZSBuYW1lLlxyXG4gICovXHJcbiAgcHJpdmF0ZSBfZW50ZXIobmFtZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5lbnRlcihuYW1lKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIFNlbmRzIGFsbCBkYXRhIG5lZWRlZCBmb3IgVmlldy5cclxuXHQgKi9cclxuICBwcml2YXRlIF9zZW5kQ2hhbmdlcygpIHtcclxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNlbmRDaGFuZ2VzKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGVyIGZvciB0cmFuc2l0aW9lbmQgZXZlbnRcclxuICAgKi9cclxuICBvblRyYW5zaXRpb25FbmQoKSB7XHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5vblRyYW5zaXRpb25FbmQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEVudGVycyBpbnRvIGEgJ2RyYWdnaW5nJyBzdGF0ZVxyXG5cdCAqL1xyXG4gIHByaXZhdGUgX2VudGVyRHJhZ2dpbmcoKSB7XHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5lbnRlckRyYWdnaW5nKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGVzIHRoZSBlbmQgb2YgJ2FuaW1hdGlvbmVuZCcgZXZlbnRcclxuICAgKiBAcGFyYW0gaWQgSWQgb2Ygc2xpZGVzXHJcbiAgICovXHJcbiAgY2xlYXIoaWQpIHtcclxuICAgIHRoaXMuYW5pbWF0ZVNlcnZpY2UuY2xlYXIoaWQpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge0xvY2F0aW9uU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7QXR0cmlidXRlLCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgUmVuZGVyZXIyLCBpc0Rldk1vZGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQge05hdmlnYXRpb25FbmQsIFJvdXRlckV2ZW50LCBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlLCBVcmxUcmVlfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5cclxuZXhwb3J0IHR5cGUgUXVlcnlQYXJhbXNIYW5kbGluZyA9ICdtZXJnZScgfCAncHJlc2VydmUnIHwgJyc7XHJcblxyXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJzpub3QoYSlbb3dsUm91dGVyTGlua10nfSlcclxuZXhwb3J0IGNsYXNzIE93bFJvdXRlckxpbmtEaXJlY3RpdmUge1xyXG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxyXG4gIEBJbnB1dCgpIHF1ZXJ5UGFyYW1zICE6IHtbazogc3RyaW5nXTogYW55fTtcclxuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cclxuICBASW5wdXQoKSBmcmFnbWVudCAhOiBzdHJpbmc7XHJcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXHJcbiAgQElucHV0KCkgcXVlcnlQYXJhbXNIYW5kbGluZyAhOiBRdWVyeVBhcmFtc0hhbmRsaW5nO1xyXG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxyXG4gIEBJbnB1dCgpIHByZXNlcnZlRnJhZ21lbnQgITogYm9vbGVhbjtcclxuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cclxuICBASW5wdXQoKSBza2lwTG9jYXRpb25DaGFuZ2UgITogYm9vbGVhbjtcclxuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cclxuICBASW5wdXQoKSByZXBsYWNlVXJsICE6IGJvb2xlYW47XHJcblxyXG4gIEBJbnB1dCgpIHN0b3BMaW5rID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBjb21tYW5kczogYW55W10gPSBbXTtcclxuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cclxuICBwcml2YXRlIHByZXNlcnZlICE6IGJvb2xlYW47XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgICAgQEF0dHJpYnV0ZSgndGFiaW5kZXgnKSB0YWJJbmRleDogc3RyaW5nLCByZW5kZXJlcjogUmVuZGVyZXIyLCBlbDogRWxlbWVudFJlZikge1xyXG4gICAgaWYgKHRhYkluZGV4ID09IG51bGwpIHtcclxuICAgICAgcmVuZGVyZXIuc2V0QXR0cmlidXRlKGVsLm5hdGl2ZUVsZW1lbnQsICd0YWJpbmRleCcsICcwJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCBvd2xSb3V0ZXJMaW5rKGNvbW1hbmRzOiBhbnlbXXxzdHJpbmcpIHtcclxuICAgIGlmIChjb21tYW5kcyAhPSBudWxsKSB7XHJcbiAgICAgIHRoaXMuY29tbWFuZHMgPSBBcnJheS5pc0FycmF5KGNvbW1hbmRzKSA/IGNvbW1hbmRzIDogW2NvbW1hbmRzXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY29tbWFuZHMgPSBbXTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBkZXByZWNhdGVkIDQuMC4wIHVzZSBgcXVlcnlQYXJhbXNIYW5kbGluZ2AgaW5zdGVhZC5cclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIHNldCBwcmVzZXJ2ZVF1ZXJ5UGFyYW1zKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICBpZiAoaXNEZXZNb2RlKCkgJiYgPGFueT5jb25zb2xlICYmIDxhbnk+Y29uc29sZS53YXJuKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybigncHJlc2VydmVRdWVyeVBhcmFtcyBpcyBkZXByZWNhdGVkISwgdXNlIHF1ZXJ5UGFyYW1zSGFuZGxpbmcgaW5zdGVhZC4nKTtcclxuICAgIH1cclxuICAgIHRoaXMucHJlc2VydmUgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcclxuICBvbkNsaWNrKCk6IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgZXh0cmFzID0ge1xyXG4gICAgICBza2lwTG9jYXRpb25DaGFuZ2U6IGF0dHJCb29sVmFsdWUodGhpcy5za2lwTG9jYXRpb25DaGFuZ2UpLFxyXG4gICAgICByZXBsYWNlVXJsOiBhdHRyQm9vbFZhbHVlKHRoaXMucmVwbGFjZVVybCksXHJcbiAgICB9O1xyXG4gICAgaWYgKHRoaXMuc3RvcExpbmspIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGVCeVVybCh0aGlzLnVybFRyZWUsIGV4dHJhcyk7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGdldCB1cmxUcmVlKCk6IFVybFRyZWUge1xyXG4gICAgcmV0dXJuIHRoaXMucm91dGVyLmNyZWF0ZVVybFRyZWUodGhpcy5jb21tYW5kcywge1xyXG4gICAgICByZWxhdGl2ZVRvOiB0aGlzLnJvdXRlLFxyXG4gICAgICBxdWVyeVBhcmFtczogdGhpcy5xdWVyeVBhcmFtcyxcclxuICAgICAgZnJhZ21lbnQ6IHRoaXMuZnJhZ21lbnQsXHJcbiAgICAgIHByZXNlcnZlUXVlcnlQYXJhbXM6IGF0dHJCb29sVmFsdWUodGhpcy5wcmVzZXJ2ZSksXHJcbiAgICAgIHF1ZXJ5UGFyYW1zSGFuZGxpbmc6IHRoaXMucXVlcnlQYXJhbXNIYW5kbGluZyxcclxuICAgICAgcHJlc2VydmVGcmFnbWVudDogYXR0ckJvb2xWYWx1ZSh0aGlzLnByZXNlcnZlRnJhZ21lbnQpLFxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogQGRlc2NyaXB0aW9uXHJcbiAqXHJcbiAqIExldHMgeW91IGxpbmsgdG8gc3BlY2lmaWMgcm91dGVzIGluIHlvdXIgYXBwLlxyXG4gKlxyXG4gKiBTZWUgYFJvdXRlckxpbmtgIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAbmdNb2R1bGUgUm91dGVyTW9kdWxlXHJcbiAqXHJcbiAqIEBwdWJsaWNBcGlcclxuICovXHJcbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnYVtvd2xSb3V0ZXJMaW5rXSd9KVxyXG5leHBvcnQgY2xhc3MgT3dsUm91dGVyTGlua1dpdGhIcmVmRGlyZWN0aXZlIGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xyXG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxyXG4gIEBIb3N0QmluZGluZygnYXR0ci50YXJnZXQnKSBASW5wdXQoKSB0YXJnZXQgITogc3RyaW5nO1xyXG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxyXG4gIEBJbnB1dCgpIHF1ZXJ5UGFyYW1zICE6IHtbazogc3RyaW5nXTogYW55fTtcclxuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cclxuICBASW5wdXQoKSBmcmFnbWVudCAhOiBzdHJpbmc7XHJcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXHJcbiAgQElucHV0KCkgcXVlcnlQYXJhbXNIYW5kbGluZyAhOiBRdWVyeVBhcmFtc0hhbmRsaW5nO1xyXG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxyXG4gIEBJbnB1dCgpIHByZXNlcnZlRnJhZ21lbnQgITogYm9vbGVhbjtcclxuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cclxuICBASW5wdXQoKSBza2lwTG9jYXRpb25DaGFuZ2UgITogYm9vbGVhbjtcclxuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cclxuICBASW5wdXQoKSByZXBsYWNlVXJsICE6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgc3RvcExpbmsgPSBmYWxzZTtcclxuXHJcbiAgcHJpdmF0ZSBjb21tYW5kczogYW55W10gPSBbXTtcclxuICBwcml2YXRlIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxyXG4gIHByaXZhdGUgcHJlc2VydmUgITogYm9vbGVhbjtcclxuXHJcbiAgLy8gdGhlIHVybCBkaXNwbGF5ZWQgb24gdGhlIGFuY2hvciBlbGVtZW50LlxyXG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxyXG4gIEBIb3N0QmluZGluZygpIGhyZWYgITogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICAgIHByaXZhdGUgbG9jYXRpb25TdHJhdGVneTogTG9jYXRpb25TdHJhdGVneSkge1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb24gPSByb3V0ZXIuZXZlbnRzLnN1YnNjcmliZSgoczogUm91dGVyRXZlbnQpID0+IHtcclxuICAgICAgaWYgKHMgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVUYXJnZXRVcmxBbmRIcmVmKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgb3dsUm91dGVyTGluayhjb21tYW5kczogYW55W118c3RyaW5nKSB7XHJcbiAgICBpZiAoY29tbWFuZHMgIT0gbnVsbCkge1xyXG4gICAgICB0aGlzLmNvbW1hbmRzID0gQXJyYXkuaXNBcnJheShjb21tYW5kcykgPyBjb21tYW5kcyA6IFtjb21tYW5kc107XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmNvbW1hbmRzID0gW107XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCBwcmVzZXJ2ZVF1ZXJ5UGFyYW1zKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICBpZiAoaXNEZXZNb2RlKCkgJiYgPGFueT5jb25zb2xlICYmIDxhbnk+Y29uc29sZS53YXJuKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybigncHJlc2VydmVRdWVyeVBhcmFtcyBpcyBkZXByZWNhdGVkLCB1c2UgcXVlcnlQYXJhbXNIYW5kbGluZyBpbnN0ZWFkLicpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5wcmVzZXJ2ZSA9IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczoge30pOiBhbnkgeyB0aGlzLnVwZGF0ZVRhcmdldFVybEFuZEhyZWYoKTsgfVxyXG4gIG5nT25EZXN0cm95KCk6IGFueSB7IHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7IH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudC5idXR0b24nLCAnJGV2ZW50LmN0cmxLZXknLCAnJGV2ZW50Lm1ldGFLZXknLCAnJGV2ZW50LnNoaWZ0S2V5J10pXHJcbiAgb25DbGljayhidXR0b246IG51bWJlciwgY3RybEtleTogYm9vbGVhbiwgbWV0YUtleTogYm9vbGVhbiwgc2hpZnRLZXk6IGJvb2xlYW4pOiBib29sZWFuIHtcclxuICAgIGlmIChidXR0b24gIT09IDAgfHwgY3RybEtleSB8fCBtZXRhS2V5IHx8IHNoaWZ0S2V5KSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0eXBlb2YgdGhpcy50YXJnZXQgPT09ICdzdHJpbmcnICYmIHRoaXMudGFyZ2V0ICE9PSAnX3NlbGYnKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnN0b3BMaW5rKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBleHRyYXMgPSB7XHJcbiAgICAgIHNraXBMb2NhdGlvbkNoYW5nZTogYXR0ckJvb2xWYWx1ZSh0aGlzLnNraXBMb2NhdGlvbkNoYW5nZSksXHJcbiAgICAgIHJlcGxhY2VVcmw6IGF0dHJCb29sVmFsdWUodGhpcy5yZXBsYWNlVXJsKSxcclxuICAgIH07XHJcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKHRoaXMudXJsVHJlZSwgZXh0cmFzKTtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdXBkYXRlVGFyZ2V0VXJsQW5kSHJlZigpOiB2b2lkIHtcclxuICAgIHRoaXMuaHJlZiA9IHRoaXMubG9jYXRpb25TdHJhdGVneS5wcmVwYXJlRXh0ZXJuYWxVcmwodGhpcy5yb3V0ZXIuc2VyaWFsaXplVXJsKHRoaXMudXJsVHJlZSkpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHVybFRyZWUoKTogVXJsVHJlZSB7XHJcbiAgICByZXR1cm4gdGhpcy5yb3V0ZXIuY3JlYXRlVXJsVHJlZSh0aGlzLmNvbW1hbmRzLCB7XHJcbiAgICAgIHJlbGF0aXZlVG86IHRoaXMucm91dGUsXHJcbiAgICAgIHF1ZXJ5UGFyYW1zOiB0aGlzLnF1ZXJ5UGFyYW1zLFxyXG4gICAgICBmcmFnbWVudDogdGhpcy5mcmFnbWVudCxcclxuICAgICAgcHJlc2VydmVRdWVyeVBhcmFtczogYXR0ckJvb2xWYWx1ZSh0aGlzLnByZXNlcnZlKSxcclxuICAgICAgcXVlcnlQYXJhbXNIYW5kbGluZzogdGhpcy5xdWVyeVBhcmFtc0hhbmRsaW5nLFxyXG4gICAgICBwcmVzZXJ2ZUZyYWdtZW50OiBhdHRyQm9vbFZhbHVlKHRoaXMucHJlc2VydmVGcmFnbWVudCksXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGF0dHJCb29sVmFsdWUoczogYW55KTogYm9vbGVhbiB7XHJcbiAgcmV0dXJuIHMgPT09ICcnIHx8ICEhcztcclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge1xyXG4gIENhcm91c2VsQ29tcG9uZW50LFxyXG4gIENhcm91c2VsU2xpZGVEaXJlY3RpdmVcclxufSBmcm9tICcuL2Nhcm91c2VsLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFdJTkRPV19QUk9WSURFUlMgfSBmcm9tICcuLi9zZXJ2aWNlcy93aW5kb3ctcmVmLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBSZXNpemVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvcmVzaXplLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBET0NVTUVOVF9QUk9WSURFUlMgfSBmcm9tICcuLi9zZXJ2aWNlcy9kb2N1bWVudC1yZWYuc2VydmljZSc7XHJcbmltcG9ydCB7IFN0YWdlQ29tcG9uZW50IH0gZnJvbSAnLi9zdGFnZS9zdGFnZS5jb21wb25lbnQnO1xyXG4vLyBpbXBvcnQgeyBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XHJcbmV4cG9ydCB7XHJcbiAgQ2Fyb3VzZWxDb21wb25lbnQsXHJcbiAgQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZSxcclxuICBTbGlkZXNPdXRwdXREYXRhXHJcbn0gZnJvbSAnLi9jYXJvdXNlbC5jb21wb25lbnQnO1xyXG5cclxuaW1wb3J0IHsgUm91dGVyTW9kdWxlLCBSb3V0ZXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBPd2xSb3V0ZXJMaW5rRGlyZWN0aXZlLCBPd2xSb3V0ZXJMaW5rV2l0aEhyZWZEaXJlY3RpdmUgfSBmcm9tICcuL293bC1yb3V0ZXItbGluay5kaXJlY3RpdmUnO1xyXG5leHBvcnQgeyBPd2xSb3V0ZXJMaW5rRGlyZWN0aXZlLCBPd2xSb3V0ZXJMaW5rV2l0aEhyZWZEaXJlY3RpdmUgfSBmcm9tICcuL293bC1yb3V0ZXItbGluay5kaXJlY3RpdmUnO1xyXG5cclxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXTtcclxuXHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIC8vIEJyb3dzZXJBbmltYXRpb25zTW9kdWxlLCAvLyB0aGVyZSdzIGFuIGlzc3VlIHdpdGggdGhpcyBpbXBvcnQgd2hpbGUgdXNpbmcgbGF6eSBsb2FkaW5nIG9mIG1vZHVsZSBjb25zdW1pbmcgdGhpcyBsaWJyYXJ5LiBJIGRvbid0IHJlbW92ZSBpdCBiZWNhdXNlIGl0IGNvdWxkIGJlIG5lZWRlZCBkdXJpbmcgZnV0dXJlIGVuaGFuY2VtZW50IG9mIHRoaXMgbGliLlxyXG4gICAgUm91dGVyTW9kdWxlLmZvckNoaWxkKHJvdXRlcyldLFxyXG4gIGRlY2xhcmF0aW9uczogW0Nhcm91c2VsQ29tcG9uZW50LCBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlLCBTdGFnZUNvbXBvbmVudCwgT3dsUm91dGVyTGlua0RpcmVjdGl2ZSwgT3dsUm91dGVyTGlua1dpdGhIcmVmRGlyZWN0aXZlXSxcclxuICBleHBvcnRzOiBbQ2Fyb3VzZWxDb21wb25lbnQsIENhcm91c2VsU2xpZGVEaXJlY3RpdmUsIE93bFJvdXRlckxpbmtEaXJlY3RpdmUsIE93bFJvdXRlckxpbmtXaXRoSHJlZkRpcmVjdGl2ZV0sXHJcbiAgcHJvdmlkZXJzOiBbV0lORE9XX1BST1ZJREVSUywgUmVzaXplU2VydmljZSwgRE9DVU1FTlRfUFJPVklERVJTXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2Fyb3VzZWxNb2R1bGUge31cclxuIl0sIm5hbWVzIjpbIlN1YmplY3QiLCJJbmplY3RhYmxlIiwiRXZlbnRNYW5hZ2VyIiwidGFwIiwiZmlsdGVyIiwibWVyZ2UiLCJJbmplY3Rpb25Ub2tlbiIsInRzbGliXzEuX19leHRlbmRzIiwiaXNQbGF0Zm9ybUJyb3dzZXIiLCJQTEFURk9STV9JRCIsIkluamVjdCIsInJvdXRlciIsInNraXAiLCJBY3RpdmF0ZWRSb3V0ZSIsIlJvdXRlciIsIkRpcmVjdGl2ZSIsIlRlbXBsYXRlUmVmIiwiSW5wdXQiLCJFdmVudEVtaXR0ZXIiLCJzd2l0Y2hNYXAiLCJmaXJzdCIsImRlbGF5IiwiQ29tcG9uZW50IiwiRWxlbWVudFJlZiIsIkNvbnRlbnRDaGlsZHJlbiIsIk91dHB1dCIsInRyaWdnZXIiLCJzdGF0ZSIsInN0eWxlIiwidHJhbnNpdGlvbiIsImFuaW1hdGUiLCJOZ1pvbmUiLCJSZW5kZXJlcjIiLCJIb3N0TGlzdGVuZXIiLCJpc0Rldk1vZGUiLCJBdHRyaWJ1dGUiLCJOYXZpZ2F0aW9uRW5kIiwiTG9jYXRpb25TdHJhdGVneSIsIkhvc3RCaW5kaW5nIiwiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiLCJSb3V0ZXJNb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtRQXdCRSx1QkFBb0IsWUFBMEI7WUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7WUFDNUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJQSxZQUFPLEVBQUUsQ0FBQztZQUNuQyxJQUFJLENBQUMsWUFBWSxDQUFDLHNCQUFzQixDQUN0QyxRQUFRLEVBQ1IsUUFBUSxFQUNSLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUN6QixDQUFDO1lBQ0YsSUFBSSxDQUFDLFlBQVksQ0FBQyxzQkFBc0IsQ0FDdEMsUUFBUSxFQUNSLFFBQVEsRUFDUixJQUFJLENBQUMs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