(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/platform-browser'), require('rxjs'), require('@angular/core'), require('rxjs/operators'), require('@angular/common'), require('@angular/router'), require('@angular/animations')) :
    typeof define === 'function' && define.amd ? define('ngx-owl-carousel-o', ['exports', '@angular/platform-browser', 'rxjs', '@angular/core', 'rxjs/operators', '@angular/common', '@angular/router', '@angular/animations'], factory) :
    (factory((global['ngx-owl-carousel-o'] = {}),global.ng.platformBrowser,global.rxjs,global.ng.core,global.rxjs.operators,global.ng.common,global.ng.router,global.ng.animations));
}(this, (function (exports,platformBrowser,rxjs,core,operators,common,router,animations) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ResizeService = (function () {
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
         * @param {?} event Event Object of 'resize' event
         * @return {?}
         */
        ResizeService.prototype.onResize = /**
         * Handler of 'resize' event. Passes data throw resizeSubject
         * @param {?} event Event Object of 'resize' event
         * @return {?}
         */
            function (event) {
                this.resizeSubject.next(/** @type {?} */ (event.target));
            };
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
                this.windowWidth = /** @type {?} */ (event.target);
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Defaults value of options
     */
    var /**
     * Defaults value of options
     */ OwlCarouselOConfig = (function () {
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
            this.slideBy = 1;
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
     */ OwlOptionsMockedTypes = (function () {
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
            this.slideBy = 'number|string';
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
    var CarouselService = (function () {
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
            get: /**
             * @return {?}
             */ function () {
                return this._invalidated;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CarouselService.prototype, "states", {
            // is needed for tests
            get: /**
             * @return {?}
             */ function () {
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
         * \@todo Remove responsive classes. Why should adaptive designs be brought into IE8?
         * \@todo Support for media queries by using `matchMedia` would be nice.
         * @param {?} carouselWidth width of carousel
         * @param {?} slides array of slides
         * @param {?} options options set by user
         * @return {?}
         */
        CarouselService.prototype.setup = /**
         * Setups the current settings.
         * \@todo Remove responsive classes. Why should adaptive designs be brought into IE8?
         * \@todo Support for media queries by using `matchMedia` would be nice.
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
         * \@todo Horizontal swipe threshold as option
         * \@todo #261
         * @param {?} event - The event arguments.
         * @return {?} stage - object with 'x' and 'y' coordinates of .owl-stage
         */
        CarouselService.prototype.prepareDragging = /**
         * Prepares data for dragging carousel. It starts after firing `touchstart` and `mousedown` events.
         * \@todo Horizontal swipe threshold as option
         * \@todo #261
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
         * \@todo #261
         * \@todo Threshold for click event
         * @param {?} event the event arguments.
         * @param {?} dragObj the object with dragging settings and states
         * @param {?} clickAttacher function which attaches click handler to slide or its children elements in order to prevent event bubling
         * @return {?}
         */
        CarouselService.prototype.finishDragging = /**
         * Finishes dragging of carousel when `touchend` and `mouseup` events fire.
         * \@todo #261
         * \@todo Threshold for click event
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
                var coordinates = (this.coordinates());
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
                        return /** @type {?} */ (_this.coordinates(index));
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
         * @return {?}
         */
        CarouselService.prototype._defineSlidesData = /**
         * Sets slidesData using this._items
         * @return {?}
         */
            function () {
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
                    currentClasses[(this.settings.animateIn)] = slide.isCustomAnimatedIn;
                }
                if (this.settings.animateOut) {
                    currentClasses[(this.settings.animateOut)] = slide.isCustomAnimatedOut;
                }
                return currentClasses;
            };
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NavigationService = (function () {
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
                        j += /** @type {?} */ (this.carouselService.mergers(this.carouselService.relative(i)));
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** *
     * Create a new injection token for injecting the window into a component.
      @type {?} */
    var WINDOW = new core.InjectionToken('WindowToken');
    /**
     * Define abstract class for obtaining reference to the global window object.
     * @abstract
     */
    var /**
     * Define abstract class for obtaining reference to the global window object.
     * @abstract
     */ WindowRef = (function () {
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
     */ BrowserWindowRef = (function (_super) {
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
    /** *
     * Create a injectable provider for the WindowRef token that uses the BrowserWindowRef class.
      @type {?} */
    var browserWindowProvider = {
        provide: WindowRef,
        useClass: BrowserWindowRef
    };
    /** *
     * Create an injectable provider that uses the windowFactory function for returning the native window object.
      @type {?} */
    var windowProvider = {
        provide: WINDOW,
        useFactory: windowFactory,
        deps: [WindowRef, core.PLATFORM_ID]
    };
    /** *
     * Create an array of providers.
      @type {?} */
    var WINDOW_PROVIDERS = [browserWindowProvider, windowProvider];

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** *
     * Create a new injection token for injecting the Document into a component.
      @type {?} */
    var DOCUMENT = new core.InjectionToken('DocumentToken');
    /**
     * Define abstract class for obtaining reference to the global Document object.
     * @abstract
     */
    var /**
     * Define abstract class for obtaining reference to the global Document object.
     * @abstract
     */ DocumentRef = (function () {
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
     */ BrowserDocumentRef = (function (_super) {
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
    /** *
     * Create a injectable provider for the DocumentRef token that uses the BrowserDocumentRef class.
      @type {?} */
    var browserDocumentProvider = {
        provide: DocumentRef,
        useClass: BrowserDocumentRef
    };
    /** *
     * Create an injectable provider that uses the DocumentFactory function for returning the native Document object.
      @type {?} */
    var documentProvider = {
        provide: DOCUMENT,
        useFactory: documentFactory,
        deps: [DocumentRef, core.PLATFORM_ID]
    };
    /** *
     * Create an array of providers.
      @type {?} */
    var DOCUMENT_PROVIDERS = [browserDocumentProvider, documentProvider];

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var AutoplayService = (function () {
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
            this.winRef = /** @type {?} */ (winRef);
            this.docRef = /** @type {?} */ (docRef);
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var LazyLoadService = (function () {
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var AnimateService = (function () {
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var AutoHeightService = (function () {
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var HashService = (function () {
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var nextId = 0;
    var CarouselSlideDirective = (function () {
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
     */ SlidesOutputData = (function () {
        function SlidesOutputData() {
        }
        return SlidesOutputData;
    }());
    var CarouselComponent = (function () {
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
        /**
         * @return {?}
         */
        CarouselComponent.prototype.ngAfterContentInit = /**
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var StageComponent = (function () {
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
         * \@todo Horizontal swipe threshold as option
         * \@todo #261
         * @param {?} event - The event arguments.
         * @return {?}
         */
        StageComponent.prototype._onDragStart = /**
         * Handles `touchstart` and `mousedown` events.
         * \@todo Horizontal swipe threshold as option
         * \@todo #261
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
                stage = /** @type {?} */ (stageOrExit);
                event.preventDefault();
                this._drag.stage.current = stage;
                this._animate(stage.x - this._drag.stage.start.x);
            };
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
         * \@todo #261
         * \@todo Threshold for click event
         * @param {?} event - The event arguments.
         * @return {?}
         */
        StageComponent.prototype._onDragEnd = /**
         * Handles the `touchend` and `mouseup` events.
         * \@todo #261
         * \@todo Threshold for click event
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var OwlRouterLinkDirective = (function () {
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
                if (core.isDevMode() && /** @type {?} */ (console) && /** @type {?} */ (console.warn)) {
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
    var OwlRouterLinkWithHrefDirective = (function () {
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
                if (core.isDevMode() && /** @type {?} */ (console) && /** @type {?} */ (console.warn)) {
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var routes = [];
    var CarouselModule = (function () {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW93bC1jYXJvdXNlbC1vLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmd4LW93bC1jYXJvdXNlbC1vL2xpYi9zZXJ2aWNlcy9yZXNpemUuc2VydmljZS50cyIsbnVsbCwibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vbGliL2Nhcm91c2VsL293bC1jYXJvdXNlbC1vLWNvbmZpZy50cyIsIm5nOi8vbmd4LW93bC1jYXJvdXNlbC1vL2xpYi9zZXJ2aWNlcy9jYXJvdXNlbC5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vbGliL3NlcnZpY2VzL25hdmlnYXRpb24uc2VydmljZS50cyIsIm5nOi8vbmd4LW93bC1jYXJvdXNlbC1vL2xpYi9zZXJ2aWNlcy93aW5kb3ctcmVmLnNlcnZpY2UudHMiLCJuZzovL25neC1vd2wtY2Fyb3VzZWwtby9saWIvc2VydmljZXMvZG9jdW1lbnQtcmVmLnNlcnZpY2UudHMiLCJuZzovL25neC1vd2wtY2Fyb3VzZWwtby9saWIvc2VydmljZXMvYXV0b3BsYXkuc2VydmljZS50cyIsIm5nOi8vbmd4LW93bC1jYXJvdXNlbC1vL2xpYi9zZXJ2aWNlcy9sYXp5bG9hZC5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vbGliL3NlcnZpY2VzL2FuaW1hdGUuc2VydmljZS50cyIsIm5nOi8vbmd4LW93bC1jYXJvdXNlbC1vL2xpYi9zZXJ2aWNlcy9hdXRvaGVpZ2h0LnNlcnZpY2UudHMiLCJuZzovL25neC1vd2wtY2Fyb3VzZWwtby9saWIvc2VydmljZXMvaGFzaC5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vbGliL2Nhcm91c2VsL2Nhcm91c2VsLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LW93bC1jYXJvdXNlbC1vL2xpYi9jYXJvdXNlbC9zdGFnZS9zdGFnZS5jb21wb25lbnQudHMiLCJuZzovL25neC1vd2wtY2Fyb3VzZWwtby9saWIvY2Fyb3VzZWwvb3dsLXJvdXRlci1saW5rLmRpcmVjdGl2ZS50cyIsIm5nOi8vbmd4LW93bC1jYXJvdXNlbC1vL2xpYi9jYXJvdXNlbC9jYXJvdXNlbC5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnRNYW5hZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgUmVzaXplU2VydmljZSB7XHJcbiAgLyoqXHJcbiAgICogV2lkdGggb2Ygd2luZG93XHJcbiAgICovXHJcbiAgcHVibGljIHdpbmRvd1dpZHRoOiBhbnk7XHJcblxyXG4gIC8qKlxyXG4gICAqIE1ha2VzIHJlc2l6ZVN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcclxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIHJlc2l6ZVN1YmplY3RcclxuICAgKi9cclxuICBnZXQgb25SZXNpemUkKCk6IE9ic2VydmFibGU8V2luZG93PiB7XHJcbiAgICByZXR1cm4gdGhpcy5yZXNpemVTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3ViamVjdCBvZiAncmVzaXplJyBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVzaXplU3ViamVjdDogU3ViamVjdDxXaW5kb3c+O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGV2ZW50TWFuYWdlcjogRXZlbnRNYW5hZ2VyKSB7XHJcbiAgICB0aGlzLnJlc2l6ZVN1YmplY3QgPSBuZXcgU3ViamVjdCgpO1xyXG4gICAgdGhpcy5ldmVudE1hbmFnZXIuYWRkR2xvYmFsRXZlbnRMaXN0ZW5lcihcclxuICAgICAgJ3dpbmRvdycsXHJcbiAgICAgICdyZXNpemUnLFxyXG4gICAgICB0aGlzLm9uUmVzaXplLmJpbmQodGhpcylcclxuICAgICk7XHJcbiAgICB0aGlzLmV2ZW50TWFuYWdlci5hZGRHbG9iYWxFdmVudExpc3RlbmVyKFxyXG4gICAgICAnd2luZG93JyxcclxuICAgICAgJ29ubG9hZCcsXHJcbiAgICAgIHRoaXMub25Mb2FkZWQuYmluZCh0aGlzKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhbmRsZXIgb2YgJ3Jlc2l6ZScgZXZlbnQuIFBhc3NlcyBkYXRhIHRocm93IHJlc2l6ZVN1YmplY3RcclxuICAgKiBAcGFyYW0gZXZlbnQgRXZlbnQgT2JqZWN0IG9mICdyZXNpemUnIGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvblJlc2l6ZShldmVudDogVUlFdmVudCkge1xyXG4gICAgdGhpcy5yZXNpemVTdWJqZWN0Lm5leHQoPFdpbmRvdz5ldmVudC50YXJnZXQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlciBvZiAnb25sb2FkJyBldmVudC4gRGVmaW5lcyB0aGUgd2lkdGggb2Ygd2luZG93XHJcbiAgICogQHBhcmFtIGV2ZW50IEV2ZW50IE9iamVjdCBvZiAnb25sb2FkJyBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25Mb2FkZWQoZXZlbnQ6IFVJRXZlbnQpIHtcclxuICAgIHRoaXMud2luZG93V2lkdGggPSA8V2luZG93PmV2ZW50LnRhcmdldDtcclxuICB9XHJcbn1cclxuIiwiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIGlmIChlLmluZGV4T2YocFtpXSkgPCAwKVxyXG4gICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0LmRlZmF1bHQgPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBPd2xPcHRpb25zIH0gZnJvbSBcIi4uL21vZGVscy9vd2wtb3B0aW9ucy5tb2RlbFwiO1xyXG5cclxuLyoqXHJcbiAqIERlZmF1bHRzIHZhbHVlIG9mIG9wdGlvbnNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBPd2xDYXJvdXNlbE9Db25maWcgaW1wbGVtZW50cyBPd2xPcHRpb25zIHtcclxuICBpdGVtcyA9IDM7XHJcbiAgbG9vcCA9IGZhbHNlO1xyXG4gIGNlbnRlciA9IGZhbHNlO1xyXG4gIHJld2luZCA9IGZhbHNlO1xyXG5cclxuICBtb3VzZURyYWcgPSB0cnVlO1xyXG4gIHRvdWNoRHJhZyA9IHRydWU7XHJcbiAgcHVsbERyYWcgPSB0cnVlO1xyXG4gIGZyZWVEcmFnID0gZmFsc2U7XHJcblxyXG4gIG1hcmdpbiA9IDA7XHJcbiAgc3RhZ2VQYWRkaW5nID0gMDtcclxuXHJcbiAgbWVyZ2UgPSBmYWxzZTtcclxuICBtZXJnZUZpdCA9IHRydWU7XHJcbiAgYXV0b1dpZHRoID0gZmFsc2U7XHJcblxyXG4gIHN0YXJ0UG9zaXRpb24gPSAwO1xyXG4gIHJ0bCA9IGZhbHNlO1xyXG5cclxuICBzbWFydFNwZWVkID0gMjUwO1xyXG4gIGZsdWlkU3BlZWQgPSBmYWxzZTtcclxuICBkcmFnRW5kU3BlZWQgPSBmYWxzZTtcclxuXHJcbiAgcmVzcG9uc2l2ZSA9IHt9O1xyXG4gIHJlc3BvbnNpdmVSZWZyZXNoUmF0ZSA9IDIwMDtcclxuXHJcbiAgLy8gZGVmYXVsdHMgdG8gTmF2aWdhdGlvblxyXG4gIG5hdiA9IGZhbHNlO1xyXG4gIG5hdlRleHQgPSBbICdwcmV2JywgJ25leHQnIF07XHJcbiAgbmF2U3BlZWQgPSBmYWxzZTtcclxuICBzbGlkZUJ5ID0gMTsgLy8gc3RhZ2UgbW92ZXMgb24gMSB3aWR0aCBvZiBzbGlkZTsgaWYgc2xpZGVCeSA9IDIsIHN0YWdlIG1vdmVzIG9uIDIgd2lkdGhzIG9mIHNsaWRlXHJcbiAgZG90cyA9IHRydWU7XHJcbiAgZG90c0VhY2ggPSBmYWxzZTtcclxuICBkb3RzRGF0YSA9IGZhbHNlO1xyXG4gIGRvdHNTcGVlZCA9IGZhbHNlO1xyXG5cclxuICAvLyBkZWZhdWx0cyB0byBBdXRvcGxheVxyXG4gIGF1dG9wbGF5ID0gZmFsc2U7XHJcbiAgYXV0b3BsYXlUaW1lb3V0ID0gNTAwMDtcclxuICBhdXRvcGxheUhvdmVyUGF1c2UgPSBmYWxzZTtcclxuICBhdXRvcGxheVNwZWVkID0gZmFsc2U7XHJcblxyXG4gIC8vIGRlZmF1bHRzIHRvIExhenlMb2FkaW5nXHJcbiAgbGF6eUxvYWQgPSBmYWxzZTtcclxuICBsYXp5TG9hZEVhZ2VyID0gMDtcclxuXHJcbiAgLy8gZGVmYXVsdHMgdG8gQW5pbWF0ZVxyXG4gIGFuaW1hdGVPdXQgPSBmYWxzZTtcclxuICBhbmltYXRlSW4gPSBmYWxzZTtcclxuXHJcbiAgLy8gZGVmYXVsdHMgdG8gQXV0b0hlaWdodFxyXG4gIGF1dG9IZWlnaHQgPSBmYWxzZTtcclxuXHJcbiAgLy8gZGVmYXVsdHMgdG8gSGFzaFxyXG4gIFVSTGhhc2hMaXN0ZW5lciA9IGZhbHNlO1xyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiB3ZSBjYW4ndCByZWFkIHR5cGVzIGZyb20gT3dsT3B0aW9ucyBpbiBqYXZhc2NyaXB0IGJlY2F1c2Ugb2YgcHJvcHMgaGF2ZSB1bmRlZmluZWQgdmFsdWUgYW5kIHR5cGVzIG9mIHRob3NlIHByb3BzIGFyZSB1c2VkIGZvciB2YWxpZGF0aW5nIGlucHV0c1xyXG4gKiBjbGFzcyBiZWxvdyBpcyBjb3B5IG9mIE93bE9wdGlvbnMgYnV0IGl0cyBhbGwgcHJvcHMgaGF2ZSBzdHJpbmcgdmFsdWUgc2hvd2luZyBjZXJ0YWluIHR5cGU7XHJcbiAqIHRoaXMgaXMgY2xhc3MgaXMgYmVpbmcgdXNlZCBqdXN0IGluIG1ldGhvZCBfdmFsaWRhdGVPcHRpb25zKCkgb2YgQ2Fyb3VzZWxTZXJ2aWNlO1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE93bE9wdGlvbnNNb2NrZWRUeXBlcyB7XHJcbiAgaXRlbXMgPSAnbnVtYmVyJztcclxuICBsb29wID0gJ2Jvb2xlYW4nO1xyXG4gIGNlbnRlciA9ICdib29sZWFuJztcclxuICByZXdpbmQgPSAnYm9vbGVhbic7XHJcblxyXG4gIG1vdXNlRHJhZyA9ICdib29sZWFuJztcclxuICB0b3VjaERyYWcgPSAnYm9vbGVhbic7XHJcbiAgcHVsbERyYWcgPSAnYm9vbGVhbic7XHJcbiAgZnJlZURyYWcgPSAnYm9vbGVhbic7XHJcblxyXG4gIG1hcmdpbiA9ICdudW1iZXInO1xyXG4gIHN0YWdlUGFkZGluZyA9ICdudW1iZXInO1xyXG5cclxuICBtZXJnZSA9ICdib29sZWFuJztcclxuICBtZXJnZUZpdCA9ICdib29sZWFuJztcclxuICBhdXRvV2lkdGggPSAnYm9vbGVhbic7XHJcblxyXG4gIHN0YXJ0UG9zaXRpb24gPSAnbnVtYmVyfHN0cmluZyc7XHJcbiAgcnRsID0gJ2Jvb2xlYW4nO1xyXG5cclxuICBzbWFydFNwZWVkID0gJ251bWJlcic7XHJcbiAgZmx1aWRTcGVlZCA9ICdib29sZWFuJztcclxuICBkcmFnRW5kU3BlZWQgPSAnbnVtYmVyfGJvb2xlYW4nO1xyXG5cclxuICByZXNwb25zaXZlID0ge307XHJcbiAgcmVzcG9uc2l2ZVJlZnJlc2hSYXRlID0gJ251bWJlcic7XHJcblxyXG4gIC8vIGRlZmF1bHRzIHRvIE5hdmlnYXRpb25cclxuICBuYXYgPSAnYm9vbGVhbic7XHJcbiAgbmF2VGV4dCA9ICdzdHJpbmdbXSc7XHJcbiAgbmF2U3BlZWQgPSAnbnVtYmVyfGJvb2xlYW4nO1xyXG4gIHNsaWRlQnkgPSAnbnVtYmVyfHN0cmluZyc7IC8vIHN0YWdlIG1vdmVzIG9uIDEgd2lkdGggb2Ygc2xpZGU7IGlmIHNsaWRlQnkgPSAyLCBzdGFnZSBtb3ZlcyBvbiAyIHdpZHRocyBvZiBzbGlkZVxyXG4gIGRvdHMgPSAnYm9vbGVhbic7XHJcbiAgZG90c0VhY2ggPSAnbnVtYmVyfGJvb2xlYW4nO1xyXG4gIGRvdHNEYXRhID0gJ2Jvb2xlYW4nO1xyXG4gIGRvdHNTcGVlZCA9ICdudW1iZXJ8Ym9vbGVhbic7XHJcblxyXG4gIC8vIGRlZmF1bHRzIHRvIEF1dG9wbGF5XHJcbiAgYXV0b3BsYXkgPSAnYm9vbGVhbic7XHJcbiAgYXV0b3BsYXlUaW1lb3V0ID0gJ251bWJlcic7XHJcbiAgYXV0b3BsYXlIb3ZlclBhdXNlID0gJ2Jvb2xlYW4nO1xyXG4gIGF1dG9wbGF5U3BlZWQgPSAnbnVtYmVyfGJvb2xlYW4nO1xyXG5cclxuICAvLyBkZWZhdWx0cyB0byBMYXp5TG9hZGluZ1xyXG4gIGxhenlMb2FkID0gJ2Jvb2xlYW4nO1xyXG4gIGxhenlMb2FkRWFnZXIgPSAnbnVtYmVyJztcclxuXHJcbiAgLy8gZGVmYXVsdHMgdG8gQW5pbWF0ZVxyXG4gIGFuaW1hdGVPdXQgPSAnc3RyaW5nfGJvb2xlYW4nO1xyXG4gIGFuaW1hdGVJbiA9ICdzdHJpbmd8Ym9vbGVhbic7XHJcblxyXG4gIC8vIGRlZmF1bHRzIHRvIEF1dG9IZWlnaHRcclxuICBhdXRvSGVpZ2h0ID0gJ2Jvb2xlYW4nO1xyXG5cclxuICAvLyBkZWZhdWx0cyB0byBIYXNoXHJcbiAgVVJMaGFzaExpc3RlbmVyID0gXCJib29sZWFuXCI7XHJcbiAgY29uc3RydWN0b3IoKSB7IH1cclxufSIsIlxyXG5pbXBvcnQgeyBTdGFnZURhdGEgfSBmcm9tICcuLi9tb2RlbHMvc3RhZ2UtZGF0YS5tb2RlbCc7XHJcblxyXG5pbXBvcnQgeyBPd2xET01EYXRhIH0gZnJvbSAnLi4vbW9kZWxzL293bERPTS1kYXRhLm1vZGVsJztcclxuXHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IENhcm91c2VsU2xpZGVEaXJlY3RpdmUgfSBmcm9tICcuLi9jYXJvdXNlbC9jYXJvdXNlbC5tb2R1bGUnO1xyXG5pbXBvcnQgeyBTbGlkZU1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL3NsaWRlLm1vZGVsJztcclxuaW1wb3J0IHsgU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBPd2xDYXJvdXNlbE9Db25maWcsIE93bE9wdGlvbnNNb2NrZWRUeXBlcyB9IGZyb20gJy4uL2Nhcm91c2VsL293bC1jYXJvdXNlbC1vLWNvbmZpZyc7XHJcbmltcG9ydCB7IE93bE9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbHMvb3dsLW9wdGlvbnMubW9kZWwnO1xyXG5cclxuaW1wb3J0IHsgTmF2RGF0YSwgRG90c0RhdGEgfSBmcm9tICcuLi9tb2RlbHMvbmF2aWdhdGlvbi1kYXRhLm1vZGVscyc7XHJcblxyXG4vKipcclxuICogQ3VycmVudCBzdGF0ZSBpbmZvcm1hdGlvbiBhbmQgdGhlaXIgdGFncy5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBTdGF0ZXMge1xyXG4gIGN1cnJlbnQ6IHt9O1xyXG4gIHRhZ3M6IHtcclxuICAgIFtrZXk6IHN0cmluZ106IHN0cmluZ1tdO1xyXG4gIH07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFbnVtZXJhdGlvbiBmb3IgdHlwZXMuXHJcbiAqIEBlbnVtIHtTdHJpbmd9XHJcbiAqL1xyXG5leHBvcnQgZW51bSBUeXBlIHtcclxuXHRFdmVudCA9ICdldmVudCcsXHJcblx0U3RhdGUgPSAnc3RhdGUnXHJcbn07XHJcblxyXG4vKipcclxuICogRW51bWVyYXRpb24gZm9yIHdpZHRoLlxyXG4gKiBAZW51bSB7U3RyaW5nfVxyXG4gKi9cclxuZXhwb3J0IGVudW0gV2lkdGgge1xyXG5cdERlZmF1bHQgPSAnZGVmYXVsdCcsXHJcblx0SW5uZXIgPSAnaW5uZXInLFxyXG5cdE91dGVyID0gJ291dGVyJ1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIE1vZGVsIGZvciBjb29yZHMgb2YgLm93bC1zdGFnZVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENvb3JkcyB7XHJcblx0eDogbnVtYmVyO1xyXG5cdHk6IG51bWJlcjtcclxufVxyXG5cclxuLyoqXHJcbiAqIE1vZGVsIGZvciBhbGwgY3VycmVudCBkYXRhIG9mIGNhcm91c2VsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ2Fyb3VzZWxDdXJyZW50RGF0YSB7XHJcblx0b3dsRE9NRGF0YTogT3dsRE9NRGF0YTtcclxuXHRzdGFnZURhdGE6IFN0YWdlRGF0YTtcclxuXHRzbGlkZXNEYXRhOiBTbGlkZU1vZGVsW107XHJcblx0bmF2RGF0YTogTmF2RGF0YTtcclxuXHRkb3RzRGF0YTogRG90c0RhdGE7XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIENhcm91c2VsU2VydmljZSB7XHJcblx0LyoqXHJcbiAgICogU3ViamVjdCBmb3IgcGFzc2luZyBkYXRhIG5lZWRlZCBmb3IgbWFuYWdpbmcgVmlld1xyXG4gICAqL1xyXG5cdHByaXZhdGUgX3ZpZXdTZXR0aW5nc1NoaXBwZXIkID0gbmV3IFN1YmplY3Q8Q2Fyb3VzZWxDdXJyZW50RGF0YT4oKTtcclxuXHQvKipcclxuICAgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gd2hlbiB0aGUgY2Fyb3VzZWwgZ290IGluaXRpYWxpemVzXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfaW5pdGlhbGl6ZWRDYXJvdXNlbCQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XHJcblxyXG5cdC8qKlxyXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSBjYXJvdXNlbCdzIHNldHRpbmdzIHN0YXJ0IGNoYW5naW5mXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfY2hhbmdlU2V0dGluZ3NDYXJvdXNlbCQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XHJcblxyXG5cdC8qKlxyXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSBjYXJvdXNlbCdzIHNldHRpbmdzIGhhdmUgY2hhbmdlZFxyXG4gICAqL1xyXG5cdHByaXZhdGUgX2NoYW5nZWRTZXR0aW5nc0Nhcm91c2VsJCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcclxuXHQvKipcclxuICAgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gd2hlbiB0aGUgY2Fyb3VzZWwgc3RhcnRzIHRyYW5zbGF0aW5nIG9yIG1vdmluZ1xyXG4gICAqL1xyXG5cdHByaXZhdGUgX3RyYW5zbGF0ZUNhcm91c2VsJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcclxuXHQvKipcclxuICAgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gd2hlbiB0aGUgY2Fyb3VzZWwgc3RvcHBlZCB0cmFuc2xhdGluZyBvciBtb3ZpbmdcclxuICAgKi9cclxuXHRwcml2YXRlIF90cmFuc2xhdGVkQ2Fyb3VzZWwkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xyXG5cdC8qKlxyXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSBjYXJvdXNlbCdzIHJlYnVpbGRpbmcgY2F1c2VkIGJ5ICdyZXNpemUnIGV2ZW50IHN0YXJ0c1xyXG4gICAqL1xyXG5cdHByaXZhdGUgX3Jlc2l6ZUNhcm91c2VsJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcclxuXHQvKipcclxuICAgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gIHdoZW4gdGhlIGNhcm91c2VsJ3MgcmVidWlsZGluZyBjYXVzZWQgYnkgJ3Jlc2l6ZScgZXZlbnQgaXMgZW5kZWRcclxuICAgKi9cclxuXHRwcml2YXRlIF9yZXNpemVkQ2Fyb3VzZWwkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xyXG5cdC8qKlxyXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSByZWZyZXNoIG9mIGNhcm91c2VsIHN0YXJ0c1xyXG4gICAqL1xyXG5cdHByaXZhdGUgX3JlZnJlc2hDYXJvdXNlbCQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XHJcblx0LyoqXHJcbiAgICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uIHdoZW4gdGhlIHJlZnJlc2ggb2YgY2Fyb3VzZWwgaXMgZW5kZWRcclxuICAgKi9cclxuXHRwcml2YXRlIF9yZWZyZXNoZWRDYXJvdXNlbCQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XHJcblx0LyoqXHJcbiAgICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uIHdoZW4gdGhlIGRyYWdnaW5nIG9mIGNhcm91c2VsIHN0YXJ0c1xyXG4gICAqL1xyXG5cdHByaXZhdGUgX2RyYWdDYXJvdXNlbCQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XHJcblx0LyoqXHJcbiAgICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uIHdoZW4gdGhlIGRyYWdnaW5nIG9mIGNhcm91c2VsIGlzIGVuZGVkXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfZHJhZ2dlZENhcm91c2VsJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ3VycmVudCBzZXR0aW5ncyBmb3IgdGhlIGNhcm91c2VsLlxyXG4gICAqL1xyXG4gIHNldHRpbmdzOiBPd2xPcHRpb25zID0ge1xyXG5cdFx0aXRlbXM6IDBcclxuXHR9O1xyXG5cclxuXHQvKipcclxuICAgKiBJbml0aWFsIGRhdGEgZm9yIHNldHRpbmcgY2xhc3NlcyB0byBlbGVtZW50IC5vd2wtY2Fyb3VzZWxcclxuICAgKi9cclxuXHRvd2xET01EYXRhOiBPd2xET01EYXRhID0ge1xyXG5cdFx0cnRsOiBmYWxzZSxcclxuXHRcdGlzUmVzcG9uc2l2ZTogZmFsc2UsXHJcblx0XHRpc1JlZnJlc2hlZDogZmFsc2UsXHJcblx0XHRpc0xvYWRlZDogZmFsc2UsXHJcblx0XHRpc0xvYWRpbmc6IGZhbHNlLFxyXG5cdFx0aXNNb3VzZURyYWdhYmxlOiBmYWxzZSxcclxuXHRcdGlzR3JhYjogZmFsc2UsXHJcblx0XHRpc1RvdWNoRHJhZ2FibGU6IGZhbHNlXHJcblx0fTtcclxuXHJcblx0LyoqXHJcbiAgICogSW5pdGlhbCBkYXRhIG9mIC5vd2wtc3RhZ2VcclxuICAgKi9cclxuXHRzdGFnZURhdGE6IFN0YWdlRGF0YSA9IHtcclxuXHRcdHRyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKDBweCwwcHgsMHB4KScsXHJcblx0XHR0cmFuc2l0aW9uOiAnMHMnLFxyXG5cdFx0d2lkdGg6IDAsXHJcblx0XHRwYWRkaW5nTDogMCxcclxuXHRcdHBhZGRpbmdSOiAwXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogIERhdGEgb2YgZXZlcnkgc2xpZGVcclxuXHQgKi9cclxuXHRzbGlkZXNEYXRhOiBTbGlkZU1vZGVsW107XHJcblxyXG5cdC8qKlxyXG5cdCAqIERhdGEgb2YgbmF2aWdhdGlvbiBibG9ja1xyXG5cdCAqL1xyXG5cdG5hdkRhdGE6IE5hdkRhdGE7XHJcblxyXG5cdC8qKlxyXG5cdCAqIERhdGEgb2YgZG90cyBibG9ja1xyXG5cdCAqL1xyXG5cdGRvdHNEYXRhOiBEb3RzRGF0YTtcclxuXHJcblx0LyoqXHJcblx0ICogQ2Fyb3VzZWwgd2lkdGhcclxuXHQgKi9cclxuXHRwcml2YXRlIF93aWR0aDogbnVtYmVyO1xyXG5cclxuXHQvKipcclxuXHQgKiBBbGwgcmVhbCBpdGVtcy5cclxuXHQgKi9cclxuXHRwcml2YXRlIF9pdGVtczogQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZVtdID0gW107IC8vIGlzIGVxdWFsIHRvIHRoaXMuc2xpZGVzXHJcblxyXG5cdC8qKlxyXG4gICAqIEFycmF5IHdpdGggd2lkdGggb2YgZXZlcnkgc2xpZGUuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfd2lkdGhzOiBhbnlbXSA9IFtdO1xyXG5cclxuXHQvKipcclxuICAgKiBDdXJyZW50bHkgc3VwcHJlc3NlZCBldmVudHMgdG8gcHJldmVudCB0aGVtIGZyb20gYmVlaW5nIHJldHJpZ2dlcmVkLlxyXG4gICAqL1xyXG5cdHByaXZhdGUgX3N1cHJlc3M6IGFueSA9IHt9O1xyXG5cclxuICAvKipcclxuICAgKiBSZWZlcmVuY2VzIHRvIHRoZSBydW5uaW5nIHBsdWdpbnMgb2YgdGhpcyBjYXJvdXNlbC5cclxuICAgKi9cclxuXHRwcml2YXRlIF9wbHVnaW5zOiBhbnkgPSB7fTtcclxuXHJcblx0LyoqXHJcbiAgICogQWJzb2x1dGUgY3VycmVudCBwb3NpdGlvbi5cclxuICAgKi9cclxuXHRwcml2YXRlIF9jdXJyZW50OiBudW1iZXIgfCBudWxsID0gbnVsbDtcclxuXHJcblx0LyoqXHJcbiAgICogQWxsIGNsb25lZCBpdGVtcy5cclxuICAgKi9cclxuXHRwcml2YXRlIF9jbG9uZXM6IGFueVtdID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIE1lcmdlIHZhbHVlcyBvZiBhbGwgaXRlbXMuXHJcbiAgICogQHRvZG8gTWF5YmUgdGhpcyBjb3VsZCBiZSBwYXJ0IG9mIGEgcGx1Z2luLlxyXG4gICAqL1xyXG5cdHJlYWRvbmx5IF9tZXJnZXJzOiBhbnlbXSA9IFtdO1xyXG5cclxuXHQvKipcclxuICAgKiBBbmltYXRpb24gc3BlZWQgaW4gbWlsbGlzZWNvbmRzLlxyXG4gICAqL1xyXG5cdHByaXZhdGUgX3NwZWVkOiBudW1iZXIgfCBudWxsID0gbnVsbDtcclxuXHJcblx0LyoqXHJcbiAgICogQ29vcmRpbmF0ZXMgb2YgYWxsIGl0ZW1zIGluIHBpeGVsLlxyXG4gICAqIEB0b2RvIFRoZSBuYW1lIG9mIHRoaXMgbWVtYmVyIGlzIG1pc3NsZWFkaW5nLlxyXG4gICAqL1xyXG5cdHByaXZhdGUgX2Nvb3JkaW5hdGVzOiBudW1iZXJbXSA9IFtdO1xyXG5cclxuXHQvKipcclxuICAgKiBDdXJyZW50IGJyZWFrcG9pbnQuXHJcbiAgICogQHRvZG8gUmVhbCBtZWRpYSBxdWVyaWVzIHdvdWxkIGJlIG5pY2UuXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfYnJlYWtwb2ludDogYW55ID0gbnVsbDtcclxuXHJcblx0LyoqXHJcblx0ICogUHJlZml4IGZvciBpZCBvZiBjbG9uZWQgc2xpZGVzXHJcblx0ICovXHJcblx0Y2xvbmVkSWRQcmVmaXggPSAnY2xvbmVkLSc7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEN1cnJlbnQgb3B0aW9ucyBzZXQgYnkgdGhlIGNhbGxlciBpbmNsdWRpbmcgZGVmYXVsdHMuXHJcblx0ICovXHJcblx0X29wdGlvbnM6IE93bE9wdGlvbnMgPSB7fTtcclxuXHJcbiAgLyoqXHJcbiAgICogSW52YWxpZGF0ZWQgcGFydHMgd2l0aGluIHRoZSB1cGRhdGUgcHJvY2Vzcy5cclxuICAgKi9cclxuICBwcml2YXRlIF9pbnZhbGlkYXRlZDogYW55ID0ge307XHJcblxyXG4gIC8vIElzIG5lZWRlZCBmb3IgdGVzdHNcclxuICBnZXQgaW52YWxpZGF0ZWQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5faW52YWxpZGF0ZWQ7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIEN1cnJlbnQgc3RhdGUgaW5mb3JtYXRpb24gYW5kIHRoZWlyIHRhZ3MuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfc3RhdGVzOiBTdGF0ZXMgPSB7XHJcbiAgICBjdXJyZW50OiB7fSxcclxuICAgIHRhZ3M6IHtcclxuICAgICAgaW5pdGlhbGl6aW5nOiBbJ2J1c3knXSxcclxuICAgICAgYW5pbWF0aW5nOiBbJ2J1c3knXSxcclxuICAgICAgZHJhZ2dpbmc6IFsnaW50ZXJhY3RpbmcnXVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8vIGlzIG5lZWRlZCBmb3IgdGVzdHNcclxuICBnZXQgc3RhdGVzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3N0YXRlcztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG4gXHQgKiBPcmRlcmVkIGxpc3Qgb2Ygd29ya2VycyBmb3IgdGhlIHVwZGF0ZSBwcm9jZXNzLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3BpcGU6IGFueVtdID0gW1xyXG4gICAgLy8ge1xyXG4gICAgLy8gICBmaWx0ZXI6IFsnd2lkdGgnLCAnc2V0dGluZ3MnXSxcclxuICAgIC8vICAgcnVuOiAoKSA9PiB7XHJcbiAgICAvLyAgICAgdGhpcy5fd2lkdGggPSB0aGlzLmNhcm91c2VsV2luZG93V2lkdGg7XHJcbiAgICAvLyAgIH1cclxuICAgIC8vIH0sXHJcbiAgICB7XHJcbiAgICAgIGZpbHRlcjogWyd3aWR0aCcsICdpdGVtcycsICdzZXR0aW5ncyddLFxyXG4gICAgICBydW46IGNhY2hlID0+IHtcclxuICAgICAgICBjYWNoZS5jdXJyZW50ID0gdGhpcy5faXRlbXMgJiYgdGhpcy5faXRlbXNbdGhpcy5yZWxhdGl2ZSh0aGlzLl9jdXJyZW50KV0uaWQ7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgIGZpbHRlcjogWydpdGVtcycsICdzZXR0aW5ncyddLFxyXG4gICAgLy8gICBydW46IGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gICAgIC8vIHRoaXMuJHN0YWdlLmNoaWxkcmVuKCcuY2xvbmVkJykucmVtb3ZlKCk7XHJcbiAgICAvLyAgIH1cclxuXHRcdC8vIH0sXHJcblx0XHQge1xyXG4gICAgICBmaWx0ZXI6IFsgJ3dpZHRoJywgJ2l0ZW1zJywgJ3NldHRpbmdzJyBdLFxyXG4gICAgICBydW46IChjYWNoZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG1hcmdpbiA9IHRoaXMuc2V0dGluZ3MubWFyZ2luIHx8ICcnLFxyXG4gICAgICAgICAgZ3JpZCA9ICF0aGlzLnNldHRpbmdzLmF1dG9XaWR0aCxcclxuICAgICAgICAgIHJ0bCA9IHRoaXMuc2V0dGluZ3MucnRsLFxyXG4gICAgICAgICAgY3NzID0ge1xyXG4gICAgICAgICAgICAnbWFyZ2luLWxlZnQnOiBydGwgPyBtYXJnaW4gOiAnJyxcclxuICAgICAgICAgICAgJ21hcmdpbi1yaWdodCc6IHJ0bCA/ICcnIDogbWFyZ2luXHJcbiAgICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZighZ3JpZCkge1xyXG5cdFx0XHRcdFx0dGhpcy5zbGlkZXNEYXRhLmZvckVhY2goc2xpZGUgPT4ge1xyXG5cdFx0XHRcdFx0XHRzbGlkZS5tYXJnaW5MID0gY3NzWydtYXJnaW4tbGVmdCddO1xyXG5cdFx0XHRcdFx0XHRzbGlkZS5tYXJnaW5SID0gY3NzWydtYXJnaW4tcmlnaHQnXTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH1cclxuXHJcbiAgICAgICAgY2FjaGUuY3NzID0gY3NzO1xyXG4gICAgICB9XHJcbiAgICB9LCB7XHJcbiAgICAgIGZpbHRlcjogWyAnd2lkdGgnLCAnaXRlbXMnLCAnc2V0dGluZ3MnIF0sXHJcbiAgICAgIHJ1bjogKGNhY2hlKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgd2lkdGg6IGFueSA9ICsodGhpcy53aWR0aCgpIC8gdGhpcy5zZXR0aW5ncy5pdGVtcykudG9GaXhlZCgzKSAtIHRoaXMuc2V0dGluZ3MubWFyZ2luLFxyXG4gICAgICAgICAgZ3JpZCA9ICF0aGlzLnNldHRpbmdzLmF1dG9XaWR0aCxcclxuICAgICAgICAgIHdpZHRocyA9IFtdO1xyXG5cdFx0XHRcdGxldCBtZXJnZSA9IG51bGwsXHJcblx0XHRcdFx0XHRcdGl0ZXJhdG9yID0gdGhpcy5faXRlbXMubGVuZ3RoO1xyXG5cclxuICAgICAgICBjYWNoZS5pdGVtcyA9IHtcclxuICAgICAgICAgIG1lcmdlOiBmYWxzZSxcclxuICAgICAgICAgIHdpZHRoOiB3aWR0aFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHdoaWxlIChpdGVyYXRvci0tKSB7XHJcbiAgICAgICAgICBtZXJnZSA9IHRoaXMuX21lcmdlcnNbaXRlcmF0b3JdO1xyXG4gICAgICAgICAgbWVyZ2UgPSB0aGlzLnNldHRpbmdzLm1lcmdlRml0ICYmIE1hdGgubWluKG1lcmdlLCB0aGlzLnNldHRpbmdzLml0ZW1zKSB8fCBtZXJnZTtcclxuICAgICAgICAgIGNhY2hlLml0ZW1zLm1lcmdlID0gbWVyZ2UgPiAxIHx8IGNhY2hlLml0ZW1zLm1lcmdlO1xyXG5cclxuICAgICAgICAgIHdpZHRoc1tpdGVyYXRvcl0gPSAhZ3JpZCA/IHRoaXMuX2l0ZW1zW2l0ZXJhdG9yXS53aWR0aCA/IHRoaXMuX2l0ZW1zW2l0ZXJhdG9yXS53aWR0aCA6IHdpZHRoIDogd2lkdGggKiBtZXJnZTtcclxuICAgICAgICB9XHJcblxyXG5cdFx0XHRcdHRoaXMuX3dpZHRocyA9IHdpZHRocztcclxuXHJcblx0XHRcdFx0dGhpcy5zbGlkZXNEYXRhLmZvckVhY2goKHNsaWRlLCBpKSA9PiB7XHJcblx0XHRcdFx0XHRzbGlkZS53aWR0aCA9IHRoaXMuX3dpZHRoc1tpXTtcclxuXHRcdFx0XHRcdHNsaWRlLm1hcmdpblIgPSBjYWNoZS5jc3NbJ21hcmdpbi1yaWdodCddO1xyXG5cdFx0XHRcdFx0c2xpZGUubWFyZ2luTCA9IGNhY2hlLmNzc1snbWFyZ2luLWxlZnQnXTtcclxuXHRcdFx0XHR9KTtcclxuICAgICAgfVxyXG4gICAgfSwge1xyXG4gICAgICBmaWx0ZXI6IFsgJ2l0ZW1zJywgJ3NldHRpbmdzJyBdLFxyXG4gICAgICBydW46ICgpID0+IHtcclxuICAgICAgICBjb25zdCBjbG9uZXM6IGFueVtdID0gW10sXHJcbiAgICAgICAgICBpdGVtczogQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZVtdID0gdGhpcy5faXRlbXMsXHJcbiAgICAgICAgICBzZXR0aW5nczogYW55ID0gdGhpcy5zZXR0aW5ncyxcclxuICAgICAgICAgIC8vIFRPRE86IFNob3VsZCBiZSBjb21wdXRlZCBmcm9tIG51bWJlciBvZiBtaW4gd2lkdGggaXRlbXMgaW4gc3RhZ2VcclxuICAgICAgICAgIHZpZXcgPSBNYXRoLm1heChzZXR0aW5ncy5pdGVtcyAqIDIsIDQpLFxyXG4gICAgICAgICAgc2l6ZSA9IE1hdGguY2VpbChpdGVtcy5sZW5ndGggLyAyKSAqIDI7XHJcblx0XHRcdFx0bGV0ICBhcHBlbmQ6IGFueVtdID0gW10sXHJcbiAgICAgICAgICBwcmVwZW5kOiBhbnlbXSA9IFtdLFxyXG5cdFx0XHRcdFx0cmVwZWF0ID0gc2V0dGluZ3MubG9vcCAmJiBpdGVtcy5sZW5ndGggPyBzZXR0aW5ncy5yZXdpbmQgPyB2aWV3IDogTWF0aC5tYXgodmlldywgc2l6ZSkgOiAwO1xyXG5cclxuICAgICAgICByZXBlYXQgLz0gMjtcclxuXHJcbiAgICAgICAgd2hpbGUgKHJlcGVhdC0tKSB7XHJcbiAgICAgICAgICAvLyBTd2l0Y2ggdG8gb25seSB1c2luZyBhcHBlbmRlZCBjbG9uZXNcclxuICAgICAgICAgIGNsb25lcy5wdXNoKHRoaXMubm9ybWFsaXplKGNsb25lcy5sZW5ndGggLyAyLCB0cnVlKSk7XHJcbiAgICAgICAgICBhcHBlbmQucHVzaCh7IC4uLnRoaXMuc2xpZGVzRGF0YVtjbG9uZXNbY2xvbmVzLmxlbmd0aCAtIDFdXX0pO1xyXG5cdFx0XHRcdFx0Y2xvbmVzLnB1c2godGhpcy5ub3JtYWxpemUoaXRlbXMubGVuZ3RoIC0gMSAtIChjbG9uZXMubGVuZ3RoIC0gMSkgLyAyLCB0cnVlKSk7XHJcblx0XHRcdFx0XHRwcmVwZW5kLnVuc2hpZnQoeyAuLi50aGlzLnNsaWRlc0RhdGFbY2xvbmVzW2Nsb25lcy5sZW5ndGggLSAxXV19KTtcclxuICAgICAgICB9XHJcblxyXG5cdFx0XHRcdHRoaXMuX2Nsb25lcyA9IGNsb25lcztcclxuXHJcblx0XHRcdFx0YXBwZW5kID0gYXBwZW5kLm1hcChzbGlkZSA9PiB7XHJcblx0XHRcdFx0XHRzbGlkZS5pZCA9IGAke3RoaXMuY2xvbmVkSWRQcmVmaXh9JHtzbGlkZS5pZH1gO1xyXG5cdFx0XHRcdFx0c2xpZGUuaXNBY3RpdmUgPSBmYWxzZTtcclxuXHRcdFx0XHRcdHNsaWRlLmlzQ2xvbmVkID0gdHJ1ZTtcclxuXHRcdFx0XHRcdHJldHVybiBzbGlkZTtcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0cHJlcGVuZCA9IHByZXBlbmQubWFwKHNsaWRlID0+IHtcclxuXHRcdFx0XHRcdHNsaWRlLmlkID0gYCR7dGhpcy5jbG9uZWRJZFByZWZpeH0ke3NsaWRlLmlkfWA7XHJcblx0XHRcdFx0XHRzbGlkZS5pc0FjdGl2ZSA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0c2xpZGUuaXNDbG9uZWQgPSB0cnVlO1xyXG5cdFx0XHRcdFx0cmV0dXJuIHNsaWRlO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHR0aGlzLnNsaWRlc0RhdGEgPSBwcmVwZW5kLmNvbmNhdCh0aGlzLnNsaWRlc0RhdGEpLmNvbmNhdChhcHBlbmQpO1xyXG4gICAgICB9XHJcbiAgICB9LCB7XHJcbiAgICAgIGZpbHRlcjogWyAnd2lkdGgnLCAnaXRlbXMnLCAnc2V0dGluZ3MnIF0sXHJcbiAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJ0bCA9IHRoaXMuc2V0dGluZ3MucnRsID8gMSA6IC0xLFxyXG4gICAgICAgICAgc2l6ZSA9IHRoaXMuX2Nsb25lcy5sZW5ndGggKyB0aGlzLl9pdGVtcy5sZW5ndGgsXHJcbiAgICAgICAgICBjb29yZGluYXRlcyA9IFtdO1xyXG4gICAgICAgIGxldCBpdGVyYXRvciA9IC0xLFxyXG4gICAgICAgICAgcHJldmlvdXMgPSAwLFxyXG4gICAgICAgICAgY3VycmVudCA9IDA7XHJcblxyXG4gICAgICAgIHdoaWxlICgrK2l0ZXJhdG9yIDwgc2l6ZSkge1xyXG4gICAgICAgICAgcHJldmlvdXMgPSBjb29yZGluYXRlc1tpdGVyYXRvciAtIDFdIHx8IDA7XHJcbiAgICAgICAgICBjdXJyZW50ID0gdGhpcy5fd2lkdGhzW3RoaXMucmVsYXRpdmUoaXRlcmF0b3IpXSArIHRoaXMuc2V0dGluZ3MubWFyZ2luO1xyXG4gICAgICAgICAgY29vcmRpbmF0ZXMucHVzaChwcmV2aW91cyArIGN1cnJlbnQgKiBydGwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fY29vcmRpbmF0ZXMgPSBjb29yZGluYXRlcztcclxuICAgICAgfVxyXG4gICAgfSwge1xyXG4gICAgICBmaWx0ZXI6IFsgJ3dpZHRoJywgJ2l0ZW1zJywgJ3NldHRpbmdzJyBdLFxyXG4gICAgICBydW46ICgpID0+IHtcclxuICAgICAgICBjb25zdCBwYWRkaW5nID0gdGhpcy5zZXR0aW5ncy5zdGFnZVBhZGRpbmcsXHJcbiAgICAgICAgICBjb29yZGluYXRlcyA9IHRoaXMuX2Nvb3JkaW5hdGVzLFxyXG4gICAgICAgICAgY3NzID0ge1xyXG4gICAgICAgICAgICAnd2lkdGgnOiBNYXRoLmNlaWwoTWF0aC5hYnMoY29vcmRpbmF0ZXNbY29vcmRpbmF0ZXMubGVuZ3RoIC0gMV0pKSArIHBhZGRpbmcgKiAyLFxyXG4gICAgICAgICAgICAncGFkZGluZy1sZWZ0JzogcGFkZGluZyB8fCAnJyxcclxuICAgICAgICAgICAgJ3BhZGRpbmctcmlnaHQnOiBwYWRkaW5nIHx8ICcnXHJcblx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHR0aGlzLnN0YWdlRGF0YS53aWR0aCA9IGNzcy53aWR0aDsgLy8gdXNlIHRoaXMgcHJvcGVydHkgaW4gKm5nSWYgZGlyZWN0aXZlIGZvciAub3dsLXN0YWdlIGVsZW1lbnRcclxuXHRcdFx0XHR0aGlzLnN0YWdlRGF0YS5wYWRkaW5nTCA9IGNzc1sncGFkZGluZy1sZWZ0J107XHJcblx0XHRcdFx0dGhpcy5zdGFnZURhdGEucGFkZGluZ1IgPSBjc3NbJ3BhZGRpbmctcmlnaHQnXTtcclxuICAgICAgfVxyXG4gICAgfSwge1xyXG4gICAgLy8gICBmaWx0ZXI6IFsgJ3dpZHRoJywgJ2l0ZW1zJywgJ3NldHRpbmdzJyBdLFxyXG4gICAgLy8gICBydW46IGNhY2hlID0+IHtcclxuXHRcdC8vIFx0XHQvLyB0aGlzIG1ldGhvZCBzZXRzIHRoZSB3aWR0aCBmb3IgZXZlcnkgc2xpZGUsIGJ1dCBJIHNldCBpdCBpbiBkaWZmZXJlbnQgd2F5IGVhcmxpZXJcclxuXHRcdC8vIFx0XHRjb25zdCBncmlkID0gIXRoaXMuc2V0dGluZ3MuYXV0b1dpZHRoLFxyXG5cdFx0Ly8gXHRcdGl0ZW1zID0gdGhpcy4kc3RhZ2UuY2hpbGRyZW4oKTsgLy8gdXNlIHRoaXMuc2xpZGVzRGF0YVxyXG4gICAgLy8gICAgIGxldCBpdGVyYXRvciA9IHRoaXMuX2Nvb3JkaW5hdGVzLmxlbmd0aDtcclxuXHJcbiAgICAvLyAgICAgaWYgKGdyaWQgJiYgY2FjaGUuaXRlbXMubWVyZ2UpIHtcclxuICAgIC8vICAgICAgIHdoaWxlIChpdGVyYXRvci0tKSB7XHJcbiAgICAvLyAgICAgICAgIGNhY2hlLmNzcy53aWR0aCA9IHRoaXMuX3dpZHRoc1t0aGlzLnJlbGF0aXZlKGl0ZXJhdG9yKV07XHJcbiAgICAvLyAgICAgICAgIGl0ZW1zLmVxKGl0ZXJhdG9yKS5jc3MoY2FjaGUuY3NzKTtcclxuICAgIC8vICAgICAgIH1cclxuICAgIC8vICAgICB9IGVsc2UgaWYgKGdyaWQpIHtcclxuICAgIC8vICAgICAgIGNhY2hlLmNzcy53aWR0aCA9IGNhY2hlLml0ZW1zLndpZHRoO1xyXG4gICAgLy8gICAgICAgaXRlbXMuY3NzKGNhY2hlLmNzcyk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICB9XHJcbiAgICAvLyB9LCB7XHJcbiAgICAvLyAgIGZpbHRlcjogWyAnaXRlbXMnIF0sXHJcbiAgICAvLyAgIHJ1bjogZnVuY3Rpb24oKSB7XHJcbiAgICAvLyAgICAgdGhpcy5fY29vcmRpbmF0ZXMubGVuZ3RoIDwgMSAmJiB0aGlzLiRzdGFnZS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgLy8gICB9XHJcbiAgICAvLyB9LCB7XHJcbiAgICAgIGZpbHRlcjogWyAnd2lkdGgnLCAnaXRlbXMnLCAnc2V0dGluZ3MnIF0sXHJcbiAgICAgIHJ1bjogY2FjaGUgPT4ge1xyXG4gICAgICAgIGxldCBjdXJyZW50ID0gY2FjaGUuY3VycmVudCA/IHRoaXMuc2xpZGVzRGF0YS5maW5kSW5kZXgoc2xpZGUgPT4gc2xpZGUuaWQgPT09IGNhY2hlLmN1cnJlbnQpIDogMDtcclxuICAgICAgIFx0Y3VycmVudCA9IE1hdGgubWF4KHRoaXMubWluaW11bSgpLCBNYXRoLm1pbih0aGlzLm1heGltdW0oKSwgY3VycmVudCkpO1xyXG4gICAgICAgIHRoaXMucmVzZXQoY3VycmVudCk7XHJcbiAgICAgIH1cclxuICAgIH0sIHtcclxuICAgICAgZmlsdGVyOiBbICdwb3NpdGlvbicgXSxcclxuICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5hbmltYXRlKHRoaXMuY29vcmRpbmF0ZXModGhpcy5fY3VycmVudCkpO1xyXG4gICAgICB9XHJcbiAgICB9LCB7XHJcbiAgICAgIGZpbHRlcjogWyAnd2lkdGgnLCAncG9zaXRpb24nLCAnaXRlbXMnLCAnc2V0dGluZ3MnIF0sXHJcbiAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJ0bCA9IHRoaXMuc2V0dGluZ3MucnRsID8gMSA6IC0xLFxyXG5cdFx0XHRcdFx0cGFkZGluZyA9IHRoaXMuc2V0dGluZ3Muc3RhZ2VQYWRkaW5nICogMixcclxuXHRcdFx0XHRcdG1hdGNoZXMgPSBbXTtcclxuXHRcdFx0XHRsZXQgYmVnaW4sIGVuZCwgaW5uZXIsIG91dGVyLCBpLCBuO1xyXG5cclxuXHRcdFx0XHRiZWdpbiA9IHRoaXMuY29vcmRpbmF0ZXModGhpcy5jdXJyZW50KCkpO1xyXG5cdFx0XHRcdGlmICh0eXBlb2YgYmVnaW4gPT09ICdudW1iZXInICkge1xyXG5cdFx0XHRcdFx0YmVnaW4gKz0gcGFkZGluZztcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0YmVnaW4gPSAwO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0ZW5kID0gYmVnaW4gKyB0aGlzLndpZHRoKCkgKiBydGw7XHJcblxyXG5cdFx0XHRcdGlmIChydGwgPT09IC0xICYmIHRoaXMuc2V0dGluZ3MuY2VudGVyKSB7XHJcblx0XHRcdFx0XHRjb25zdCByZXN1bHQgPVx0dGhpcy5fY29vcmRpbmF0ZXMuZmlsdGVyKGVsZW1lbnQgPT4ge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5zZXR0aW5ncy5pdGVtcyAlIDIgPT09IDEgPyBlbGVtZW50ID49IGJlZ2luIDogZWxlbWVudCA+IGJlZ2luO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRiZWdpbiA9IHJlc3VsdC5sZW5ndGggPyByZXN1bHRbcmVzdWx0Lmxlbmd0aCAtIDFdIDogYmVnaW47XHJcblx0XHRcdFx0fVxyXG5cclxuICAgICAgICBmb3IgKGkgPSAwLCBuID0gdGhpcy5fY29vcmRpbmF0ZXMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICBpbm5lciA9IE1hdGguY2VpbCh0aGlzLl9jb29yZGluYXRlc1tpIC0gMV0gfHwgMCk7XHJcblx0XHRcdFx0XHRvdXRlciA9IE1hdGguY2VpbChNYXRoLmFicyh0aGlzLl9jb29yZGluYXRlc1tpXSkgKyBwYWRkaW5nICogcnRsKTtcclxuXHJcbiAgICAgICAgICBpZiAoKHRoaXMuX29wKGlubmVyLCAnPD0nLCBiZWdpbikgJiYgKHRoaXMuX29wKGlubmVyLCAnPicsIGVuZCkpKVxyXG4gICAgICAgICAgICB8fCAodGhpcy5fb3Aob3V0ZXIsICc8JywgYmVnaW4pICYmIHRoaXMuX29wKG91dGVyLCAnPicsIGVuZCkpKSB7XHJcbiAgICAgICAgICAgIG1hdGNoZXMucHVzaChpKTtcclxuICAgICAgICAgIH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHRoaXMuc2xpZGVzRGF0YS5mb3JFYWNoKHNsaWRlID0+IHtcclxuXHRcdFx0XHRcdHNsaWRlLmlzQWN0aXZlID0gZmFsc2U7XHJcblx0XHRcdFx0XHRyZXR1cm4gc2xpZGU7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0bWF0Y2hlcy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy5zbGlkZXNEYXRhW2l0ZW1dLmlzQWN0aXZlID0gdHJ1ZTtcclxuXHRcdFx0XHR9KTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuY2VudGVyKSB7XHJcblx0XHRcdFx0XHR0aGlzLnNsaWRlc0RhdGEuZm9yRWFjaChzbGlkZSA9PiB7XHJcblx0XHRcdFx0XHRcdHNsaWRlLmlzQ2VudGVyZWQgPSBmYWxzZTtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHNsaWRlO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR0aGlzLnNsaWRlc0RhdGFbdGhpcy5jdXJyZW50KCldLmlzQ2VudGVyZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIF07XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIF92aWV3U2V0dGluZ3NTaGlwcGVyJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXHJcblx0ICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfdmlld1NldHRpbmdzU2hpcHBlciQgU3ViamVjdFxyXG5cdCAqL1xyXG5cdGdldFZpZXdDdXJTZXR0aW5ncygpOiBPYnNlcnZhYmxlPENhcm91c2VsQ3VycmVudERhdGE+IHtcclxuXHRcdHJldHVybiB0aGlzLl92aWV3U2V0dGluZ3NTaGlwcGVyJC5hc09ic2VydmFibGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIF9pbml0aWFsaXplZENhcm91c2VsJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXHJcblx0ICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfaW5pdGlhbGl6ZWRDYXJvdXNlbCQgU3ViamVjdFxyXG5cdCAqL1xyXG5cdGdldEluaXRpYWxpemVkU3RhdGUoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcclxuXHRcdHJldHVybiB0aGlzLl9pbml0aWFsaXplZENhcm91c2VsJC5hc09ic2VydmFibGUoKVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgX2NoYW5nZVNldHRpbmdzQ2Fyb3VzZWwkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcclxuXHQgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIF9jaGFuZ2VTZXR0aW5nc0Nhcm91c2VsJCBTdWJqZWN0XHJcblx0ICovXHJcblx0Z2V0Q2hhbmdlU3RhdGUoKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuXHRcdHJldHVybiB0aGlzLl9jaGFuZ2VTZXR0aW5nc0Nhcm91c2VsJC5hc09ic2VydmFibGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIF9jaGFuZ2VkU2V0dGluZ3NDYXJvdXNlbCQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxyXG5cdCAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX2NoYW5nZWRTZXR0aW5nc0Nhcm91c2VsJCBTdWJqZWN0XHJcblx0ICovXHJcblx0Z2V0Q2hhbmdlZFN0YXRlKCk6IE9ic2VydmFibGU8YW55PiB7XHJcblx0XHRyZXR1cm4gdGhpcy5fY2hhbmdlZFNldHRpbmdzQ2Fyb3VzZWwkLmFzT2JzZXJ2YWJsZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgX3RyYW5zbGF0ZUNhcm91c2VsJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXHJcblx0ICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfdHJhbnNsYXRlQ2Fyb3VzZWwkIFN1YmplY3RcclxuXHQgKi9cclxuXHRnZXRUcmFuc2xhdGVTdGF0ZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3RyYW5zbGF0ZUNhcm91c2VsJC5hc09ic2VydmFibGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIF90cmFuc2xhdGVkQ2Fyb3VzZWwkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcclxuXHQgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIF90cmFuc2xhdGVkQ2Fyb3VzZWwkIFN1YmplY3RcclxuXHQgKi9cclxuXHRnZXRUcmFuc2xhdGVkU3RhdGUoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcclxuXHRcdHJldHVybiB0aGlzLl90cmFuc2xhdGVkQ2Fyb3VzZWwkLmFzT2JzZXJ2YWJsZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgX3Jlc2l6ZUNhcm91c2VsJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXHJcblx0ICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfcmVzaXplQ2Fyb3VzZWwkIFN1YmplY3RcclxuXHQgKi9cclxuXHRnZXRSZXNpemVTdGF0ZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3Jlc2l6ZUNhcm91c2VsJC5hc09ic2VydmFibGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIF9yZXNpemVkQ2Fyb3VzZWwkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcclxuXHQgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIF9yZXNpemVkQ2Fyb3VzZWwkIFN1YmplY3RcclxuXHQgKi9cclxuXHRnZXRSZXNpemVkU3RhdGUoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcclxuXHRcdHJldHVybiB0aGlzLl9yZXNpemVkQ2Fyb3VzZWwkLmFzT2JzZXJ2YWJsZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgX3JlZnJlc2hDYXJvdXNlbCQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxyXG5cdCAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX3JlZnJlc2hDYXJvdXNlbCQgU3ViamVjdFxyXG5cdCAqL1xyXG5cdGdldFJlZnJlc2hTdGF0ZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3JlZnJlc2hDYXJvdXNlbCQuYXNPYnNlcnZhYmxlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBfcmVmcmVzaGVkQ2Fyb3VzZWwkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcclxuXHQgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIF9yZWZyZXNoZWRDYXJvdXNlbCQgU3ViamVjdFxyXG5cdCAqL1xyXG5cdGdldFJlZnJlc2hlZFN0YXRlKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XHJcblx0XHRyZXR1cm4gdGhpcy5fcmVmcmVzaGVkQ2Fyb3VzZWwkLmFzT2JzZXJ2YWJsZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgX2RyYWdDYXJvdXNlbCQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxyXG5cdCAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX2RyYWdDYXJvdXNlbCQgU3ViamVjdFxyXG5cdCAqL1xyXG5cdGdldERyYWdTdGF0ZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2RyYWdDYXJvdXNlbCQuYXNPYnNlcnZhYmxlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBfZHJhZ2dlZENhcm91c2VsJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXHJcblx0ICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfZHJhZ2dlZENhcm91c2VsJCBTdWJqZWN0XHJcblx0ICovXHJcblx0Z2V0RHJhZ2dlZFN0YXRlKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XHJcblx0XHRyZXR1cm4gdGhpcy5fZHJhZ2dlZENhcm91c2VsJC5hc09ic2VydmFibGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHVwcyBjdXN0b20gb3B0aW9ucyBleHBhbmRpbmcgZGVmYXVsdCBvcHRpb25zXHJcblx0ICogQHBhcmFtIG9wdGlvbnMgY3VzdG9tIG9wdGlvbnNcclxuXHQgKi9cclxuXHRzZXRPcHRpb25zKG9wdGlvbnM6IE93bE9wdGlvbnMpIHtcclxuXHRcdGNvbnN0IGNvbmZpZ09wdGlvbnM6IE93bE9wdGlvbnMgPSBuZXcgT3dsQ2Fyb3VzZWxPQ29uZmlnKCk7XHJcblx0XHRjb25zdCBjaGVja2VkT3B0aW9uczogT3dsT3B0aW9ucyA9IHRoaXMuX3ZhbGlkYXRlT3B0aW9ucyhvcHRpb25zLCBjb25maWdPcHRpb25zKTtcclxuXHRcdHRoaXMuX29wdGlvbnMgPSB7IC4uLmNvbmZpZ09wdGlvbnMsIC4uLmNoZWNrZWRPcHRpb25zfTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyB3aGV0aGVyIHVzZXIncyBvcHRpb24gYXJlIHNldCBwcm9wZXJseS4gQ2hla2luZyBpcyBiYXNlZCBvbiB0eXBpbmdzO1xyXG5cdCAqIEBwYXJhbSBvcHRpb25zIG9wdGlvbnMgc2V0IGJ5IHVzZXJcclxuXHQgKiBAcGFyYW0gY29uZmlnT3B0aW9ucyBkZWZhdWx0IG9wdGlvbnNcclxuXHQgKiBAcmV0dXJucyBjaGVja2VkIGFuZCBtb2RpZmllZCAoaWYgaXQncyBuZWVkZWQpIHVzZXIncyBvcHRpb25zXHJcblx0ICpcclxuXHQgKiBOb3RlczpcclxuXHQgKiBcdC0gaWYgdXNlciBzZXQgb3B0aW9uIHdpdGggd3JvbmcgdHlwZSwgaXQnbGwgYmUgd3JpdHRlbiBpbiBjb25zb2xlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBfdmFsaWRhdGVPcHRpb25zKG9wdGlvbnM6IE93bE9wdGlvbnMsIGNvbmZpZ09wdGlvbnM6IE93bE9wdGlvbnMpOiBPd2xPcHRpb25zIHtcclxuXHRcdGNvbnN0IGNoZWNrZWRPcHRpb25zOiBPd2xPcHRpb25zID0geyAuLi5vcHRpb25zfTtcclxuXHRcdGNvbnN0IG1vY2tlZFR5cGVzID0gbmV3IE93bE9wdGlvbnNNb2NrZWRUeXBlcygpO1xyXG5cclxuXHRcdGZvciAoY29uc3Qga2V5IGluIGNoZWNrZWRPcHRpb25zKSB7XHJcblx0XHRcdGlmIChjaGVja2VkT3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcblxyXG5cdFx0XHRcdC8vIGNvbmRpdGlvbiBjb3VsZCBiZSBzaG9ydGVuZWQgYnV0IGl0IGdldHMgaGFyZGVyIGZvciB1bmRlcnN0YW5kaW5nXHJcblx0XHRcdFx0aWYgKG1vY2tlZFR5cGVzW2tleV0gPT09ICdudW1iZXInKSB7XHJcblx0XHRcdFx0XHRpZiAodGhpcy5faXNOdW1lcmljKGNoZWNrZWRPcHRpb25zW2tleV0pKSB7XHJcblx0XHRcdFx0XHRcdGNoZWNrZWRPcHRpb25zW2tleV0gPSArY2hlY2tlZE9wdGlvbnNba2V5XTtcclxuXHRcdFx0XHRcdFx0Y2hlY2tlZE9wdGlvbnNba2V5XSA9IGtleSA9PT0gJ2l0ZW1zJyA/IHRoaXMuX3ZhbGlkYXRlSXRlbXMoY2hlY2tlZE9wdGlvbnNba2V5XSkgOiBjaGVja2VkT3B0aW9uc1trZXldO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0Y2hlY2tlZE9wdGlvbnNba2V5XSA9IHNldFJpZ2h0T3B0aW9uKG1vY2tlZFR5cGVzW2tleV0sIGtleSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSBlbHNlIGlmIChtb2NrZWRUeXBlc1trZXldID09PSAnYm9vbGVhbicgJiYgdHlwZW9mIGNoZWNrZWRPcHRpb25zW2tleV0gIT09ICdib29sZWFuJykge1xyXG5cdFx0XHRcdFx0Y2hlY2tlZE9wdGlvbnNba2V5XSA9IHNldFJpZ2h0T3B0aW9uKG1vY2tlZFR5cGVzW2tleV0sIGtleSk7XHJcblx0XHRcdFx0fSBlbHNlIGlmIChtb2NrZWRUeXBlc1trZXldID09PSAnbnVtYmVyfGJvb2xlYW4nICYmICF0aGlzLl9pc051bWJlck9yQm9vbGVhbihjaGVja2VkT3B0aW9uc1trZXldKSkge1xyXG5cdFx0XHRcdFx0Y2hlY2tlZE9wdGlvbnNba2V5XSA9IHNldFJpZ2h0T3B0aW9uKG1vY2tlZFR5cGVzW2tleV0sIGtleSk7XHJcblx0XHRcdFx0fSBlbHNlIGlmIChtb2NrZWRUeXBlc1trZXldID09PSAnbnVtYmVyfHN0cmluZycgJiYgIXRoaXMuX2lzTnVtYmVyT3JTdHJpbmcoY2hlY2tlZE9wdGlvbnNba2V5XSkpIHtcclxuXHRcdFx0XHRcdGNoZWNrZWRPcHRpb25zW2tleV0gPSBzZXRSaWdodE9wdGlvbihtb2NrZWRUeXBlc1trZXldLCBrZXkpO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAobW9ja2VkVHlwZXNba2V5XSA9PT0gJ3N0cmluZ3xib29sZWFuJyAmJiAhdGhpcy5faXNTdHJpbmdPckJvb2xlYW4oY2hlY2tlZE9wdGlvbnNba2V5XSkpIHtcclxuXHRcdFx0XHRcdGNoZWNrZWRPcHRpb25zW2tleV0gPSBzZXRSaWdodE9wdGlvbihtb2NrZWRUeXBlc1trZXldLCBrZXkpO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAobW9ja2VkVHlwZXNba2V5XSA9PT0gJ3N0cmluZ1tdJykge1xyXG5cdFx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoY2hlY2tlZE9wdGlvbnNba2V5XSkpIHtcclxuXHRcdFx0XHRcdFx0bGV0IGlzU3RyaW5nID0gZmFsc2U7XHJcblx0XHRcdFx0XHRcdGNoZWNrZWRPcHRpb25zW2tleV0uZm9yRWFjaChlbGVtZW50ID0+IHtcclxuXHRcdFx0XHRcdFx0XHRpc1N0cmluZyA9IHR5cGVvZiBlbGVtZW50ID09PSAnc3RyaW5nJyA/IHRydWUgOiBmYWxzZTtcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdGlmICghaXNTdHJpbmcpIHsgY2hlY2tlZE9wdGlvbnNba2V5XSA9IHNldFJpZ2h0T3B0aW9uKG1vY2tlZFR5cGVzW2tleV0sIGtleSkgfTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGNoZWNrZWRPcHRpb25zW2tleV0gPSBzZXRSaWdodE9wdGlvbihtb2NrZWRUeXBlc1trZXldLCBrZXkpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIHNldFJpZ2h0T3B0aW9uKHR5cGU6IHN0cmluZywga2V5OiBhbnkpOiBhbnkge1xyXG5cdFx0XHRjb25zb2xlLmxvZyhgb3B0aW9ucy4ke2tleX0gbXVzdCBiZSB0eXBlIG9mICR7dHlwZX07ICR7a2V5fT0ke29wdGlvbnNba2V5XX0gc2tpcHBlZCB0byBkZWZhdWx0czogJHtrZXl9PSR7Y29uZmlnT3B0aW9uc1trZXldfWApO1xyXG5cdFx0XHRyZXR1cm4gY29uZmlnT3B0aW9uc1trZXldO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBjaGVja2VkT3B0aW9ucztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBvcHRpb24gaXRlbXMgc2V0IGJ5IHVzZXIgYW5kIGlmIGl0IGJpZ2dlciB0aGFuIG51bWJlciBvZiBzbGlkZXMgdGhlbiByZXR1cm5zIG51bWJlciBvZiBzbGlkZXNcclxuXHQgKiBAcGFyYW0gaXRlbXMgb3B0aW9uIGl0ZW1zIHNldCBieSB1c2VyXHJcblx0ICogQHJldHVybnMgcmlnaHQgbnVtYmVyIG9mIGl0ZW1zXHJcblx0ICovXHJcblx0cHJpdmF0ZSBfdmFsaWRhdGVJdGVtcyhpdGVtczogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdGxldCByZXN1bHQ6IG51bWJlcjtcclxuXHRcdGlmIChpdGVtcyA+PSB0aGlzLl9pdGVtcy5sZW5ndGgpIHtcclxuXHRcdFx0cmVzdWx0ID0gdGhpcy5faXRlbXMubGVuZ3RoIDtcclxuXHRcdFx0Y29uc29sZS5sb2coJ29wdGlvbiBcXCdpdGVtc1xcJyBpbiB5b3VyIG9wdGlvbnMgaXMgYmlnZ2VyIHRoYW4gbnVtYmVyIG9mIHNsaWRlczsgVGhpcyBvcHRpb24gaXMgdXBkYXRlZCB0byBjdXJyZW50IG51bWJlciBvZiBzbGlkZXMgYW5kIG5hdmlnYXRpb24gZ290IGRpc2FibGVkJyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXN1bHQgPSBpdGVtcztcclxuXHRcdH1cclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXQgY3VycmVudCB3aWR0aCBvZiBjYXJvdXNlbFxyXG5cdCAqIEBwYXJhbSB3aWR0aCB3aWR0aCBvZiBjYXJvdXNlbCBXaW5kb3dcclxuXHQgKi9cclxuXHRzZXRDYXJvdXNlbFdpZHRoKHdpZHRoOiBudW1iZXIpIHtcclxuXHRcdHRoaXMuX3dpZHRoID0gd2lkdGg7XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBTZXR1cHMgdGhlIGN1cnJlbnQgc2V0dGluZ3MuXHJcblx0ICogQHRvZG8gUmVtb3ZlIHJlc3BvbnNpdmUgY2xhc3Nlcy4gV2h5IHNob3VsZCBhZGFwdGl2ZSBkZXNpZ25zIGJlIGJyb3VnaHQgaW50byBJRTg/XHJcblx0ICogQHRvZG8gU3VwcG9ydCBmb3IgbWVkaWEgcXVlcmllcyBieSB1c2luZyBgbWF0Y2hNZWRpYWAgd291bGQgYmUgbmljZS5cclxuXHQgKiBAcGFyYW0gY2Fyb3VzZWxXaWR0aCB3aWR0aCBvZiBjYXJvdXNlbFxyXG5cdCAqIEBwYXJhbSBzbGlkZXMgYXJyYXkgb2Ygc2xpZGVzXHJcblx0ICogQHBhcmFtIG9wdGlvbnMgb3B0aW9ucyBzZXQgYnkgdXNlclxyXG5cdCAqL1xyXG4gIHNldHVwKGNhcm91c2VsV2lkdGg6IG51bWJlciwgc2xpZGVzOiBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlW10sIG9wdGlvbnM6IE93bE9wdGlvbnMpIHtcclxuXHRcdHRoaXMuc2V0Q2Fyb3VzZWxXaWR0aChjYXJvdXNlbFdpZHRoKTtcclxuXHRcdHRoaXMuc2V0SXRlbXMoc2xpZGVzKTtcclxuXHRcdHRoaXMuX2RlZmluZVNsaWRlc0RhdGEoKTtcclxuXHRcdHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0geyAuLi50aGlzLl9vcHRpb25zfTtcclxuXHJcblx0XHR0aGlzLnNldFZpZXdwb3J0SXRlbXNOKCk7XHJcblxyXG5cdFx0dGhpcy5fdHJpZ2dlcignY2hhbmdlJywgeyBwcm9wZXJ0eTogeyBuYW1lOiAnc2V0dGluZ3MnLCB2YWx1ZTogdGhpcy5zZXR0aW5ncyB9IH0pO1xyXG5cdFx0dGhpcy5pbnZhbGlkYXRlKCdzZXR0aW5ncycpOyAvLyBtdXN0IGJlIGNhbGwgb2YgdGhpcyBmdW5jdGlvbjtcclxuXHRcdHRoaXMuX3RyaWdnZXIoJ2NoYW5nZWQnLCB7IHByb3BlcnR5OiB7IG5hbWU6ICdzZXR0aW5ncycsIHZhbHVlOiB0aGlzLnNldHRpbmdzIH0gfSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXQgbnVtYmVyIG9mIGl0ZW1zIGZvciBjdXJyZW50IHZpZXdwb3J0XHJcblx0ICovXHJcblx0c2V0Vmlld3BvcnRJdGVtc04oKSB7XHJcblx0XHRjb25zdCB2aWV3cG9ydCA9IHRoaXMuX3dpZHRoLFxyXG5cdFx0XHRvdmVyd3JpdGVzID0gdGhpcy5fb3B0aW9ucy5yZXNwb25zaXZlO1xyXG5cdFx0bGV0XHRtYXRjaCA9IC0xO1xyXG5cclxuXHRcdGlmICghT2JqZWN0LmtleXMob3ZlcndyaXRlcykubGVuZ3RoKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIXZpZXdwb3J0KSB7XHJcblx0XHRcdHRoaXMuc2V0dGluZ3MuaXRlbXMgPSAxO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yIChjb25zdCBrZXkgaW4gb3ZlcndyaXRlcykge1xyXG5cdFx0XHRpZiAob3ZlcndyaXRlcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcblx0XHRcdFx0aWYgKCtrZXkgPD0gdmlld3BvcnQgJiYgK2tleSA+IG1hdGNoKSB7XHJcblx0XHRcdFx0XHRtYXRjaCA9IE51bWJlcihrZXkpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSB7IC4uLnRoaXMuc2V0dGluZ3MsIGl0ZW1zOiB0aGlzLl92YWxpZGF0ZUl0ZW1zKG92ZXJ3cml0ZXNbbWF0Y2hdLml0ZW1zKX07XHJcblx0XHQvLyBpZiAodHlwZW9mIHRoaXMuc2V0dGluZ3Muc3RhZ2VQYWRkaW5nID09PSAnZnVuY3Rpb24nKSB7XHJcblx0XHQvLyBcdHRoaXMuc2V0dGluZ3Muc3RhZ2VQYWRkaW5nID0gdGhpcy5zZXR0aW5ncy5zdGFnZVBhZGRpbmcoKTtcclxuXHRcdC8vIH1cclxuXHRcdGRlbGV0ZSB0aGlzLnNldHRpbmdzLnJlc3BvbnNpdmU7XHJcblx0XHR0aGlzLm93bERPTURhdGEuaXNSZXNwb25zaXZlID0gdHJ1ZTtcclxuXHRcdHRoaXMuX2JyZWFrcG9pbnQgPSBtYXRjaDtcclxuXHJcblx0XHR0aGlzLmludmFsaWRhdGUoJ3NldHRpbmdzJyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJbml0aWFsaXplcyB0aGUgY2Fyb3VzZWwuXHJcblx0ICogQHBhcmFtIHNsaWRlcyBhcnJheSBvZiBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlXHJcblx0ICovXHJcbiAgaW5pdGlhbGl6ZShzbGlkZXM6IENhcm91c2VsU2xpZGVEaXJlY3RpdmVbXSkge1xyXG5cdFx0dGhpcy5lbnRlcignaW5pdGlhbGl6aW5nJyk7XHJcblx0XHQvLyB0aGlzLnRyaWdnZXIoJ2luaXRpYWxpemUnKTtcclxuXHJcblx0XHR0aGlzLm93bERPTURhdGEucnRsID0gdGhpcy5zZXR0aW5ncy5ydGw7XHJcblxyXG5cdFx0c2xpZGVzLmZvckVhY2goaXRlbSA9PiB7XHJcblx0XHRcdGNvbnN0IG1lcmdlTjogbnVtYmVyID0gdGhpcy5zZXR0aW5ncy5tZXJnZSA/IGl0ZW0uZGF0YU1lcmdlIDogMTtcclxuXHRcdFx0dGhpcy5fbWVyZ2Vycy5wdXNoKG1lcmdlTik7XHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLnJlc2V0KHRoaXMuX2lzTnVtZXJpYyh0aGlzLnNldHRpbmdzLnN0YXJ0UG9zaXRpb24pID8gK3RoaXMuc2V0dGluZ3Muc3RhcnRQb3NpdGlvbiA6IDApO1xyXG5cclxuXHRcdHRoaXMuaW52YWxpZGF0ZSgnaXRlbXMnKTtcclxuXHRcdHRoaXMucmVmcmVzaCgpO1xyXG5cclxuXHRcdHRoaXMub3dsRE9NRGF0YS5pc0xvYWRlZCA9IHRydWU7XHJcblx0XHR0aGlzLm93bERPTURhdGEuaXNNb3VzZURyYWdhYmxlID0gdGhpcy5zZXR0aW5ncy5tb3VzZURyYWc7XHJcblx0XHR0aGlzLm93bERPTURhdGEuaXNUb3VjaERyYWdhYmxlID0gdGhpcy5zZXR0aW5ncy50b3VjaERyYWc7XHJcblxyXG5cdFx0dGhpcy5zZW5kQ2hhbmdlcygpO1xyXG5cclxuXHRcdHRoaXMubGVhdmUoJ2luaXRpYWxpemluZycpO1xyXG5cdFx0dGhpcy5fdHJpZ2dlcignaW5pdGlhbGl6ZWQnKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBTZW5kcyBhbGwgZGF0YSBuZWVkZWQgZm9yIFZpZXdcclxuXHQgKi9cclxuXHRzZW5kQ2hhbmdlcygpIHtcclxuXHRcdHRoaXMuX3ZpZXdTZXR0aW5nc1NoaXBwZXIkLm5leHQoe1xyXG5cdFx0XHRvd2xET01EYXRhOiB0aGlzLm93bERPTURhdGEsXHJcblx0XHRcdHN0YWdlRGF0YTogdGhpcy5zdGFnZURhdGEsXHJcblx0XHRcdHNsaWRlc0RhdGE6IHRoaXMuc2xpZGVzRGF0YSxcclxuXHRcdFx0bmF2RGF0YTogdGhpcy5uYXZEYXRhLFxyXG5cdFx0XHRkb3RzRGF0YTogdGhpcy5kb3RzRGF0YVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHJcbiAgLyoqXHJcblx0ICogVXBkYXRlcyBvcHRpb24gbG9naWMgaWYgbmVjZXNzZXJ5XHJcblx0ICovXHJcbiAgcHJpdmF0ZSBfb3B0aW9uc0xvZ2ljKCkge1xyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3MuYXV0b1dpZHRoKSB7XHJcblx0XHRcdHRoaXMuc2V0dGluZ3Muc3RhZ2VQYWRkaW5nID0gMDtcclxuXHRcdFx0dGhpcy5zZXR0aW5ncy5tZXJnZSA9IGZhbHNlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlcyB0aGUgdmlld1xyXG4gICAqL1xyXG4gIHVwZGF0ZSgpIHtcclxuICAgIGxldCBpID0gMDtcclxuICAgIGNvbnN0IG4gPSB0aGlzLl9waXBlLmxlbmd0aCxcclxuICAgICAgZmlsdGVyID0gaXRlbSA9PiB0aGlzLl9pbnZhbGlkYXRlZFtpdGVtXSxcclxuXHRcdFx0Y2FjaGUgPSB7fTtcclxuXHJcbiAgICB3aGlsZSAoaSA8IG4pIHtcclxuICAgICAgY29uc3QgZmlsdGVyZWRQaXBlID0gdGhpcy5fcGlwZVtpXS5maWx0ZXIuZmlsdGVyKGZpbHRlcik7XHJcbiAgICAgIGlmICh0aGlzLl9pbnZhbGlkYXRlZC5hbGwgfHwgZmlsdGVyZWRQaXBlLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHR0aGlzLl9waXBlW2ldLnJ1bihjYWNoZSk7XHJcbiAgICAgIH1cclxuICAgICAgaSsrO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5zbGlkZXNEYXRhLmZvckVhY2goc2xpZGUgPT4gc2xpZGUuY2xhc3NlcyA9IHRoaXMuc2V0Q3VyU2xpZGVDbGFzc2VzKHNsaWRlKSk7XHJcblx0XHR0aGlzLnNlbmRDaGFuZ2VzKCk7XHJcblxyXG4gICAgdGhpcy5faW52YWxpZGF0ZWQgPSB7fTtcclxuXHJcbiAgICBpZiAoIXRoaXMuaXMoJ3ZhbGlkJykpIHtcclxuICAgICAgdGhpcy5lbnRlcigndmFsaWQnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEdldHMgdGhlIHdpZHRoIG9mIHRoZSB2aWV3LlxyXG5cdCAqIEBwYXJhbSBbZGltZW5zaW9uPVdpZHRoLkRlZmF1bHRdIFRoZSBkaW1lbnNpb24gdG8gcmV0dXJuXHJcblx0ICogQHJldHVybnMgVGhlIHdpZHRoIG9mIHRoZSB2aWV3IGluIHBpeGVsLlxyXG5cdCAqL1xyXG4gIHdpZHRoKGRpbWVuc2lvbj86IFdpZHRoKTogbnVtYmVyIHtcclxuXHRcdGRpbWVuc2lvbiA9IGRpbWVuc2lvbiB8fCBXaWR0aC5EZWZhdWx0O1xyXG5cdFx0c3dpdGNoIChkaW1lbnNpb24pIHtcclxuXHRcdFx0Y2FzZSBXaWR0aC5Jbm5lcjpcclxuXHRcdFx0Y2FzZSBXaWR0aC5PdXRlcjpcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5fd2lkdGg7XHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuX3dpZHRoIC0gdGhpcy5zZXR0aW5ncy5zdGFnZVBhZGRpbmcgKiAyICsgdGhpcy5zZXR0aW5ncy5tYXJnaW47XHJcblx0XHR9XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBSZWZyZXNoZXMgdGhlIGNhcm91c2VsIHByaW1hcmlseSBmb3IgYWRhcHRpdmUgcHVycG9zZXMuXHJcblx0ICovXHJcbiAgcmVmcmVzaCgpIHtcclxuXHRcdHRoaXMuZW50ZXIoJ3JlZnJlc2hpbmcnKTtcclxuXHRcdHRoaXMuX3RyaWdnZXIoJ3JlZnJlc2gnKTtcclxuXHRcdHRoaXMuX2RlZmluZVNsaWRlc0RhdGEoKTtcclxuXHRcdHRoaXMuc2V0Vmlld3BvcnRJdGVtc04oKTtcclxuXHJcblx0XHR0aGlzLl9vcHRpb25zTG9naWMoKTtcclxuXHJcblx0XHQvLyB0aGlzLiRlbGVtZW50LmFkZENsYXNzKHRoaXMub3B0aW9ucy5yZWZyZXNoQ2xhc3MpO1xyXG5cclxuXHRcdHRoaXMudXBkYXRlKCk7XHJcblxyXG5cdFx0Ly8gdGhpcy4kZWxlbWVudC5yZW1vdmVDbGFzcyh0aGlzLm9wdGlvbnMucmVmcmVzaENsYXNzKTtcclxuXHJcblx0XHR0aGlzLmxlYXZlKCdyZWZyZXNoaW5nJyk7XHJcblx0XHR0aGlzLl90cmlnZ2VyKCdyZWZyZXNoZWQnKTtcclxuXHQgfVxyXG5cclxuICAvKipcclxuXHQgKiBDaGVja3Mgd2luZG93IGByZXNpemVgIGV2ZW50LlxyXG5cdCAqIEBwYXJhbSBjdXJXaWR0aCB3aWR0aCBvZiAub3dsLWNhcm91c2VsXHJcblx0ICovXHJcbiAgb25SZXNpemUoY3VyV2lkdGg6IG51bWJlcikge1xyXG5cdFx0aWYgKCF0aGlzLl9pdGVtcy5sZW5ndGgpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0Q2Fyb3VzZWxXaWR0aChjdXJXaWR0aCk7XHJcblxyXG5cdFx0dGhpcy5lbnRlcigncmVzaXppbmcnKTtcclxuXHJcblx0XHQvLyBpZiAodGhpcy50cmlnZ2VyKCdyZXNpemUnKS5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xyXG5cdFx0Ly8gXHR0aGlzLmxlYXZlKCdyZXNpemluZycpO1xyXG5cdFx0Ly8gXHRyZXR1cm4gZmFsc2U7XHJcblx0XHQvLyB9XHJcblx0XHR0aGlzLl90cmlnZ2VyKCdyZXNpemUnKTtcclxuXHRcdHRoaXMuaW52YWxpZGF0ZSgnd2lkdGgnKTtcclxuXHJcblx0XHR0aGlzLnJlZnJlc2goKTtcclxuXHJcblx0XHR0aGlzLmxlYXZlKCdyZXNpemluZycpO1xyXG5cdFx0dGhpcy5fdHJpZ2dlcigncmVzaXplZCcpO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogUHJlcGFyZXMgZGF0YSBmb3IgZHJhZ2dpbmcgY2Fyb3VzZWwuIEl0IHN0YXJ0cyBhZnRlciBmaXJpbmcgYHRvdWNoc3RhcnRgIGFuZCBgbW91c2Vkb3duYCBldmVudHMuXHJcblx0ICogQHRvZG8gSG9yaXpvbnRhbCBzd2lwZSB0aHJlc2hvbGQgYXMgb3B0aW9uXHJcblx0ICogQHRvZG8gIzI2MVxyXG5cdCAqIEBwYXJhbSBldmVudCAtIFRoZSBldmVudCBhcmd1bWVudHMuXHJcblx0ICogQHJldHVybnMgc3RhZ2UgLSBvYmplY3Qgd2l0aCAneCcgYW5kICd5JyBjb29yZGluYXRlcyBvZiAub3dsLXN0YWdlXHJcblx0ICovXHJcbiAgcHJlcGFyZURyYWdnaW5nKGV2ZW50OiBhbnkpOiBDb29yZHMge1xyXG5cdFx0bGV0IHN0YWdlOiBDb29yZHMgPSBudWxsLFxyXG5cdFx0XHRcdHRyYW5zZm9ybUFycjogc3RyaW5nW107XHJcblxyXG5cdFx0Ly8gY291bGQgYmUgNSBjb21tZW50ZWQgbGluZXMgYmVsb3c7IEhvd2V2ZXIgdGhlcmUncyBzdGFnZSB0cmFuc2Zvcm0gaW4gc3RhZ2VEYXRhIGFuZCBpbiB1cGRhdGVzIGFmdGVyIGVhY2ggbW92ZSBvZiBzdGFnZVxyXG4gICAgLy8gc3RhZ2UgPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCkudHJhbnNmb3JtLnJlcGxhY2UoLy4qXFwofFxcKXwgL2csICcnKS5zcGxpdCgnLCcpO1xyXG4gICAgLy8gc3RhZ2UgPSB7XHJcbiAgICAvLyAgIHg6IHN0YWdlW3N0YWdlLmxlbmd0aCA9PT0gMTYgPyAxMiA6IDRdLFxyXG4gICAgLy8gICB5OiBzdGFnZVtzdGFnZS5sZW5ndGggPT09IDE2ID8gMTMgOiA1XVxyXG5cdFx0Ly8gfTtcclxuXHJcblx0XHR0cmFuc2Zvcm1BcnIgPSB0aGlzLnN0YWdlRGF0YS50cmFuc2Zvcm0ucmVwbGFjZSgvLipcXCh8XFwpfCB8W14sLVxcZF1cXHd8XFwpL2csICcnKS5zcGxpdCgnLCcpO1xyXG4gICAgc3RhZ2UgPSB7XHJcbiAgICAgIHg6ICt0cmFuc2Zvcm1BcnJbMF0sXHJcbiAgICAgIHk6ICt0cmFuc2Zvcm1BcnJbMV1cclxuICAgIH07XHJcblxyXG5cdFx0aWYgKHRoaXMuaXMoJ2FuaW1hdGluZycpKSB7XHJcblx0XHRcdHRoaXMuaW52YWxpZGF0ZSgncG9zaXRpb24nKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ21vdXNlZG93bicpIHtcclxuICAgICAgdGhpcy5vd2xET01EYXRhLmlzR3JhYiA9IHRydWU7XHJcbiAgICB9XHJcblxyXG5cdFx0dGhpcy5zcGVlZCgwKTtcclxuXHRcdHJldHVybiBzdGFnZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEVudGVycyBpbnRvIGEgJ2RyYWdnaW5nJyBzdGF0ZVxyXG5cdCAqL1xyXG5cdGVudGVyRHJhZ2dpbmcoKSB7XHJcblx0XHR0aGlzLmVudGVyKCdkcmFnZ2luZycpO1xyXG4gICAgdGhpcy5fdHJpZ2dlcignZHJhZycpO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogRGVmaW5lcyBuZXcgY29vcmRzIGZvciAub3dsLXN0YWdlIHdoaWxlIGRyYWdnaW5nIGl0XHJcblx0ICogQHRvZG8gIzI2MVxyXG5cdCAqIEBwYXJhbSBldmVudCB0aGUgZXZlbnQgYXJndW1lbnRzLlxyXG5cdCAqIEBwYXJhbSBkcmFnRGF0YSBpbml0aWFsIGRhdGEgZ290IGFmdGVyIHN0YXJ0aW5nIGRyYWdnaW5nXHJcblx0ICogQHJldHVybnMgY29vcmRzIG9yIGZhbHNlXHJcblx0ICovXHJcbiAgZGVmaW5lTmV3Q29vcmRzRHJhZyhldmVudDogYW55LCBkcmFnRGF0YTogYW55KTogYm9vbGVhbiB8IENvb3JkcyB7XHJcblx0XHRsZXQgbWluaW11bSA9IG51bGwsXHJcblx0XHRtYXhpbXVtID0gbnVsbCxcclxuXHRcdHB1bGwgPSBudWxsO1xyXG5cdFx0Y29uc3RcdGRlbHRhID0gdGhpcy5kaWZmZXJlbmNlKGRyYWdEYXRhLnBvaW50ZXIsIHRoaXMucG9pbnRlcihldmVudCkpLFxyXG5cdFx0XHRzdGFnZSA9IHRoaXMuZGlmZmVyZW5jZShkcmFnRGF0YS5zdGFnZS5zdGFydCwgZGVsdGEpO1xyXG5cclxuXHRcdGlmICghdGhpcy5pcygnZHJhZ2dpbmcnKSkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3MubG9vcCkge1xyXG5cdFx0XHRtaW5pbXVtID0gdGhpcy5jb29yZGluYXRlcyh0aGlzLm1pbmltdW0oKSk7XHJcblx0XHRcdG1heGltdW0gPSArdGhpcy5jb29yZGluYXRlcyh0aGlzLm1heGltdW0oKSArIDEpIC0gbWluaW11bTtcclxuXHRcdFx0c3RhZ2UueCA9ICgoKHN0YWdlLnggLSBtaW5pbXVtKSAlIG1heGltdW0gKyBtYXhpbXVtKSAlIG1heGltdW0pICsgbWluaW11bTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdG1pbmltdW0gPSB0aGlzLnNldHRpbmdzLnJ0bCA/IHRoaXMuY29vcmRpbmF0ZXModGhpcy5tYXhpbXVtKCkpIDogdGhpcy5jb29yZGluYXRlcyh0aGlzLm1pbmltdW0oKSk7XHJcblx0XHRcdG1heGltdW0gPSB0aGlzLnNldHRpbmdzLnJ0bCA/IHRoaXMuY29vcmRpbmF0ZXModGhpcy5taW5pbXVtKCkpIDogdGhpcy5jb29yZGluYXRlcyh0aGlzLm1heGltdW0oKSk7XHJcblx0XHRcdHB1bGwgPSB0aGlzLnNldHRpbmdzLnB1bGxEcmFnID8gLTEgKiBkZWx0YS54IC8gNSA6IDA7XHJcblx0XHRcdHN0YWdlLnggPSBNYXRoLm1heChNYXRoLm1pbihzdGFnZS54LCBtaW5pbXVtICsgcHVsbCksIG1heGltdW0gKyBwdWxsKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gc3RhZ2U7XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBGaW5pc2hlcyBkcmFnZ2luZyBvZiBjYXJvdXNlbCB3aGVuIGB0b3VjaGVuZGAgYW5kIGBtb3VzZXVwYCBldmVudHMgZmlyZS5cclxuXHQgKiBAdG9kbyAjMjYxXHJcblx0ICogQHRvZG8gVGhyZXNob2xkIGZvciBjbGljayBldmVudFxyXG5cdCAqIEBwYXJhbSBldmVudCB0aGUgZXZlbnQgYXJndW1lbnRzLlxyXG5cdCAqIEBwYXJhbSBkcmFnT2JqIHRoZSBvYmplY3Qgd2l0aCBkcmFnZ2luZyBzZXR0aW5ncyBhbmQgc3RhdGVzXHJcblx0ICogQHBhcmFtIGNsaWNrQXR0YWNoZXIgZnVuY3Rpb24gd2hpY2ggYXR0YWNoZXMgY2xpY2sgaGFuZGxlciB0byBzbGlkZSBvciBpdHMgY2hpbGRyZW4gZWxlbWVudHMgaW4gb3JkZXIgdG8gcHJldmVudCBldmVudCBidWJsaW5nXHJcblx0ICovXHJcbiAgZmluaXNoRHJhZ2dpbmcoZXZlbnQ6IGFueSwgZHJhZ09iajogYW55LCBjbGlja0F0dGFjaGVyOiAoKSA9PiB2b2lkKSB7XHJcblx0XHRjb25zdCBkZWx0YSA9IHRoaXMuZGlmZmVyZW5jZShkcmFnT2JqLnBvaW50ZXIsIHRoaXMucG9pbnRlcihldmVudCkpLFxyXG4gICAgICAgIHN0YWdlID0gZHJhZ09iai5zdGFnZS5jdXJyZW50LFxyXG5cdFx0XHRcdGRpcmVjdGlvbiA9IGRlbHRhLnggPiArdGhpcy5zZXR0aW5ncy5ydGwgPyAnbGVmdCcgOiAncmlnaHQnO1xyXG5cdFx0bGV0IGN1cnJlbnRTbGlkZUk6IG51bWJlciwgY3VycmVudDogbnVtYmVyLCBuZXdDdXJyZW50OiBudW1iZXI7XHJcblxyXG4gICAgICBpZiAoZGVsdGEueCAhPT0gMCAmJiB0aGlzLmlzKCdkcmFnZ2luZycpIHx8ICF0aGlzLmlzKCd2YWxpZCcpKSB7XHJcbiAgICAgICAgdGhpcy5zcGVlZCgrdGhpcy5zZXR0aW5ncy5kcmFnRW5kU3BlZWQgfHwgdGhpcy5zZXR0aW5ncy5zbWFydFNwZWVkKTtcclxuXHRcdFx0XHRjdXJyZW50U2xpZGVJID0gdGhpcy5jbG9zZXN0KHN0YWdlLngsIGRlbHRhLnggIT09IDAgPyBkaXJlY3Rpb24gOiBkcmFnT2JqLmRpcmVjdGlvbik7XHJcblx0XHRcdFx0Y3VycmVudCA9IHRoaXMuY3VycmVudCgpO1xyXG4gICAgICAgIG5ld0N1cnJlbnQgPSB0aGlzLmN1cnJlbnQoY3VycmVudFNsaWRlSSA9PT0gLTEgPyB1bmRlZmluZWQgOiBjdXJyZW50U2xpZGVJKTtcclxuXHJcblx0XHRcdFx0aWYgKGN1cnJlbnQgIT09IG5ld0N1cnJlbnQpIHtcclxuXHRcdFx0XHRcdHRoaXMuaW52YWxpZGF0ZSgncG9zaXRpb24nKTtcclxuXHRcdFx0XHRcdHRoaXMudXBkYXRlKCk7XHJcblx0XHRcdFx0fVxyXG5cclxuICAgICAgICBkcmFnT2JqLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcclxuXHJcbiAgICAgICAgaWYgKE1hdGguYWJzKGRlbHRhLngpID4gMyB8fCBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIGRyYWdPYmoudGltZSA+IDMwMCkge1xyXG5cdFx0XHRcdFx0Y2xpY2tBdHRhY2hlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAoIXRoaXMuaXMoJ2RyYWdnaW5nJykpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHRcdFx0dGhpcy5sZWF2ZSgnZHJhZ2dpbmcnKTtcclxuXHRcdFx0dGhpcy5fdHJpZ2dlcignZHJhZ2dlZCcpXHJcblx0IH1cclxuXHJcbiAgLyoqXHJcblx0ICogR2V0cyBhYnNvbHV0ZSBwb3NpdGlvbiBvZiB0aGUgY2xvc2VzdCBpdGVtIGZvciBhIGNvb3JkaW5hdGUuXHJcblx0ICogQHRvZG8gU2V0dGluZyBgZnJlZURyYWdgIG1ha2VzIGBjbG9zZXN0YCBub3QgcmV1c2FibGUuIFNlZSAjMTY1LlxyXG5cdCAqIEBwYXJhbSBjb29yZGluYXRlIFRoZSBjb29yZGluYXRlIGluIHBpeGVsLlxyXG5cdCAqIEBwYXJhbSBkaXJlY3Rpb24gVGhlIGRpcmVjdGlvbiB0byBjaGVjayBmb3IgdGhlIGNsb3Nlc3QgaXRlbS4gRXRoZXIgYGxlZnRgIG9yIGByaWdodGAuXHJcblx0ICogQHJldHVybnMgVGhlIGFic29sdXRlIHBvc2l0aW9uIG9mIHRoZSBjbG9zZXN0IGl0ZW0uXHJcblx0ICovXHJcbiAgY2xvc2VzdChjb29yZGluYXRlOiBudW1iZXIsIGRpcmVjdGlvbjogc3RyaW5nKTogbnVtYmVyIHtcclxuXHRcdGNvbnN0IHB1bGwgPSAzMCxcclxuXHRcdFx0d2lkdGggPSB0aGlzLndpZHRoKCk7XHJcblx0XHRsZXRcdGNvb3JkaW5hdGVzOiBudW1iZXJbXSA9IHRoaXMuY29vcmRpbmF0ZXMoKSBhcyBudW1iZXJbXSxcclxuXHRcdCBwb3NpdGlvbiA9IC0xO1xyXG5cclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLmNlbnRlcikge1xyXG5cdFx0XHRjb29yZGluYXRlcyA9IGNvb3JkaW5hdGVzLm1hcChpdGVtID0+IHtcclxuXHRcdFx0XHRpZiAoaXRlbSA9PT0gMCkge1xyXG5cdFx0XHRcdFx0aXRlbSArPSAwLjAwMDAwMTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIGl0ZW07XHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gb3B0aW9uICdmcmVlRHJhZycgZG9lc24ndCBoYXZlIHJlYWxpemF0aW9uIGFuZCB1c2luZyBpdCBoZXJlIGNyZWF0ZXMgcHJvYmxlbTpcclxuXHRcdC8vIHZhcmlhYmxlICdwb3NpdGlvbicgc3RheXMgdW5jaGFuZ2VkIChpdCBlcXVhbHMgLTEgYXQgdGhlIGJlZ2dpbmcpIGFuZCB0aHVzIG1ldGhvZCByZXR1cm5zIC0xXHJcblx0XHQvLyBSZXR1cm5pbmcgdmFsdWUgaXMgY29uc3VtZWQgYnkgbWV0aG9kIGN1cnJlbnQoKSwgd2hpY2ggdGFraW5nIC0xIGFzIGFyZ3VtZW50IGNhbGN1bGF0ZXMgdGhlIGluZGV4IG9mIG5ldyBjdXJyZW50IHNsaWRlXHJcblx0XHQvLyBJbiBjYXNlIG9mIGhhdmluZyA1IHNsaWRlcyBhbnMgJ2xvb3A9ZmFsc2U7IGNhbGxpbmcgJ2N1cnJlbnQoLTEpJyBzZXRzIHByb3BzICdfY3VycmVudCcgYXMgNC4gSnVzdCBsYXN0IHNsaWRlIHJlbWFpbnMgdmlzaWJsZSBpbnN0ZWFkIG9mIDMgbGFzdCBzbGlkZXMuXHJcblxyXG5cdFx0Ly8gaWYgKCF0aGlzLnNldHRpbmdzLmZyZWVEcmFnKSB7XHJcblx0XHRcdC8vIGNoZWNrIGNsb3Nlc3QgaXRlbVxyXG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGNvb3JkaW5hdGVzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG5cdFx0XHRcdGlmIChkaXJlY3Rpb24gPT09ICdsZWZ0JyAmJiBjb29yZGluYXRlID4gY29vcmRpbmF0ZXNbaV0gLSBwdWxsICYmIGNvb3JkaW5hdGUgPCBjb29yZGluYXRlc1tpXSArIHB1bGwpIHtcclxuXHRcdFx0XHRcdHBvc2l0aW9uID0gaTtcclxuXHRcdFx0XHQvLyBvbiBhIHJpZ2h0IHB1bGwsIGNoZWNrIG9uIHByZXZpb3VzIGluZGV4XHJcblx0XHRcdFx0Ly8gdG8gZG8gc28sIHN1YnRyYWN0IHdpZHRoIGZyb20gdmFsdWUgYW5kIHNldCBwb3NpdGlvbiA9IGluZGV4ICsgMVxyXG5cdFx0XHRcdH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSAncmlnaHQnICYmIGNvb3JkaW5hdGUgPiBjb29yZGluYXRlc1tpXSAtIHdpZHRoIC0gcHVsbCAmJiBjb29yZGluYXRlIDwgY29vcmRpbmF0ZXNbaV0gLSB3aWR0aCArIHB1bGwpIHtcclxuXHRcdFx0XHRcdHBvc2l0aW9uID0gaSArIDE7XHJcblx0XHRcdFx0fSBlbHNlIGlmICh0aGlzLl9vcChjb29yZGluYXRlLCAnPCcsIGNvb3JkaW5hdGVzW2ldKVxyXG5cdFx0XHRcdFx0JiYgdGhpcy5fb3AoY29vcmRpbmF0ZSwgJz4nLCBjb29yZGluYXRlc1tpICsgMV0gfHwgY29vcmRpbmF0ZXNbaV0gLSB3aWR0aCkpIHtcclxuXHRcdFx0XHRcdHBvc2l0aW9uID0gZGlyZWN0aW9uID09PSAnbGVmdCcgPyBpICsgMSA6IGk7XHJcblx0XHRcdFx0fSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IG51bGwgJiYgY29vcmRpbmF0ZSA+IGNvb3JkaW5hdGVzW2ldIC0gcHVsbCAmJiBjb29yZGluYXRlIDwgY29vcmRpbmF0ZXNbaV0gKyBwdWxsKSB7XHJcblx0XHRcdFx0XHRwb3NpdGlvbiA9IGk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAocG9zaXRpb24gIT09IC0xKSB7IGJyZWFrIH07XHJcblx0XHRcdH1cclxuXHRcdC8vIH1cclxuXHJcblx0XHRpZiAoIXRoaXMuc2V0dGluZ3MubG9vcCkge1xyXG5cdFx0XHQvLyBub24gbG9vcCBib3VuZHJpZXNcclxuXHRcdFx0aWYgKHRoaXMuX29wKGNvb3JkaW5hdGUsICc+JywgY29vcmRpbmF0ZXNbdGhpcy5taW5pbXVtKCldKSkge1xyXG5cdFx0XHRcdHBvc2l0aW9uID0gY29vcmRpbmF0ZSA9IHRoaXMubWluaW11bSgpO1xyXG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMuX29wKGNvb3JkaW5hdGUsICc8JywgY29vcmRpbmF0ZXNbdGhpcy5tYXhpbXVtKCldKSkge1xyXG5cdFx0XHRcdHBvc2l0aW9uID0gY29vcmRpbmF0ZSA9IHRoaXMubWF4aW11bSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHBvc2l0aW9uO1xyXG5cdCB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEFuaW1hdGVzIHRoZSBzdGFnZS5cclxuXHQgKiBAdG9kbyAjMjcwXHJcblx0ICogQHBhcmFtIGNvb3JkaW5hdGUgVGhlIGNvb3JkaW5hdGUgaW4gcGl4ZWxzLlxyXG5cdCAqL1xyXG4gIGFuaW1hdGUoY29vcmRpbmF0ZTogbnVtYmVyIHwgbnVtYmVyW10pIHtcclxuXHRcdGNvbnN0IGFuaW1hdGUgPSB0aGlzLnNwZWVkKCkgPiAwO1xyXG5cclxuXHRcdGlmICh0aGlzLmlzKCdhbmltYXRpbmcnKSkge1xyXG5cdFx0XHR0aGlzLm9uVHJhbnNpdGlvbkVuZCgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChhbmltYXRlKSB7XHJcblx0XHRcdHRoaXMuZW50ZXIoJ2FuaW1hdGluZycpO1xyXG5cdFx0XHR0aGlzLl90cmlnZ2VyKCd0cmFuc2xhdGUnKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnN0YWdlRGF0YS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlM2QoJyArIGNvb3JkaW5hdGUgKyAncHgsMHB4LDBweCknO1xyXG5cdFx0dGhpcy5zdGFnZURhdGEudHJhbnNpdGlvbiA9ICh0aGlzLnNwZWVkKCkgLyAxMDAwKSArICdzJztcclxuXHJcblx0XHQvLyBhbHNvIHRoZXJlIHdhcyB0cmFuc2l0aW9uIGJ5IG1lYW5zIG9mIEpRdWVyeS5hbmltYXRlIG9yIGNzcy1jaGFuZ2luZyBwcm9wZXJ0eSBsZWZ0XHJcblx0IH1cclxuXHJcbiAgLyoqXHJcblx0ICogQ2hlY2tzIHdoZXRoZXIgdGhlIGNhcm91c2VsIGlzIGluIGEgc3BlY2lmaWMgc3RhdGUgb3Igbm90LlxyXG5cdCAqIEBwYXJhbSBzdGF0ZSBUaGUgc3RhdGUgdG8gY2hlY2suXHJcblx0ICogQHJldHVybnMgVGhlIGZsYWcgd2hpY2ggaW5kaWNhdGVzIGlmIHRoZSBjYXJvdXNlbCBpcyBidXN5LlxyXG5cdCAqL1xyXG4gIGlzKHN0YXRlOiBzdHJpbmcpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiB0aGlzLl9zdGF0ZXMuY3VycmVudFtzdGF0ZV0gJiYgdGhpcy5fc3RhdGVzLmN1cnJlbnRbc3RhdGVdID4gMDtcclxuICB9O1xyXG5cclxuICAvKipcclxuXHQgKiBTZXRzIHRoZSBhYnNvbHV0ZSBwb3NpdGlvbiBvZiB0aGUgY3VycmVudCBpdGVtLlxyXG5cdCAqIEBwYXJhbSBwb3NpdGlvbiBUaGUgbmV3IGFic29sdXRlIHBvc2l0aW9uIG9yIG5vdGhpbmcgdG8gbGVhdmUgaXQgdW5jaGFuZ2VkLlxyXG5cdCAqIEByZXR1cm5zIFRoZSBhYnNvbHV0ZSBwb3NpdGlvbiBvZiB0aGUgY3VycmVudCBpdGVtLlxyXG5cdCAqL1xyXG4gIGN1cnJlbnQocG9zaXRpb24/OiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0aWYgKHBvc2l0aW9uID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuX2N1cnJlbnQ7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuX2l0ZW1zLmxlbmd0aCA9PT0gMCkge1xyXG5cdFx0XHRyZXR1cm4gdW5kZWZpbmVkO1xyXG5cdFx0fVxyXG5cclxuXHRcdHBvc2l0aW9uID0gdGhpcy5ub3JtYWxpemUocG9zaXRpb24pO1xyXG5cclxuXHRcdGlmICh0aGlzLl9jdXJyZW50ICE9PSBwb3NpdGlvbikge1xyXG5cdFx0XHRjb25zdCBldmVudCA9IHRoaXMuX3RyaWdnZXIoJ2NoYW5nZScsIHsgcHJvcGVydHk6IHsgbmFtZTogJ3Bvc2l0aW9uJywgdmFsdWU6IHBvc2l0aW9uIH0gfSk7XHJcblxyXG5cdFx0XHQvLyBpZiAoZXZlbnQuZGF0YSAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdC8vIFx0cG9zaXRpb24gPSB0aGlzLm5vcm1hbGl6ZShldmVudC5kYXRhKTtcclxuXHRcdFx0Ly8gfVxyXG5cclxuXHRcdFx0dGhpcy5fY3VycmVudCA9IHBvc2l0aW9uO1xyXG5cclxuXHRcdFx0dGhpcy5pbnZhbGlkYXRlKCdwb3NpdGlvbicpO1xyXG5cdFx0XHR0aGlzLl90cmlnZ2VyKCdjaGFuZ2VkJywgeyBwcm9wZXJ0eTogeyBuYW1lOiAncG9zaXRpb24nLCB2YWx1ZTogdGhpcy5fY3VycmVudCB9IH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzLl9jdXJyZW50O1xyXG5cdCB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEludmFsaWRhdGVzIHRoZSBnaXZlbiBwYXJ0IG9mIHRoZSB1cGRhdGUgcm91dGluZS5cclxuXHQgKiBAcGFyYW0gcGFydCBUaGUgcGFydCB0byBpbnZhbGlkYXRlLlxyXG5cdCAqIEByZXR1cm5zIFRoZSBpbnZhbGlkYXRlZCBwYXJ0cy5cclxuXHQgKi9cclxuICBpbnZhbGlkYXRlKHBhcnQ6IHN0cmluZyk6IHN0cmluZ1tdIHtcclxuXHRcdGlmICh0eXBlb2YgcGFydCA9PT0gJ3N0cmluZycpIHtcclxuXHRcdFx0dGhpcy5faW52YWxpZGF0ZWRbcGFydF0gPSB0cnVlO1xyXG5cdFx0XHRpZih0aGlzLmlzKCd2YWxpZCcpKSB7IHRoaXMubGVhdmUoJ3ZhbGlkJyk7IH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBPYmplY3Qua2V5cyh0aGlzLl9pbnZhbGlkYXRlZCk7XHJcbiAgfTtcclxuXHJcblx0LyoqXHJcblx0ICogUmVzZXRzIHRoZSBhYnNvbHV0ZSBwb3NpdGlvbiBvZiB0aGUgY3VycmVudCBpdGVtLlxyXG5cdCAqIEBwYXJhbSBwb3NpdGlvbiB0aGUgYWJzb2x1dGUgcG9zaXRpb24gb2YgdGhlIG5ldyBpdGVtLlxyXG5cdCAqL1xyXG4gIHJlc2V0KHBvc2l0aW9uOiBudW1iZXIpIHtcclxuXHRcdHBvc2l0aW9uID0gdGhpcy5ub3JtYWxpemUocG9zaXRpb24pO1xyXG5cclxuXHRcdGlmIChwb3NpdGlvbiA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl9zcGVlZCA9IDA7XHJcblx0XHR0aGlzLl9jdXJyZW50ID0gcG9zaXRpb247XHJcblxyXG5cdFx0dGhpcy5fc3VwcHJlc3MoWyAndHJhbnNsYXRlJywgJ3RyYW5zbGF0ZWQnIF0pO1xyXG5cclxuXHRcdHRoaXMuYW5pbWF0ZSh0aGlzLmNvb3JkaW5hdGVzKHBvc2l0aW9uKSk7XHJcblxyXG5cdFx0dGhpcy5fcmVsZWFzZShbICd0cmFuc2xhdGUnLCAndHJhbnNsYXRlZCcgXSk7XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBOb3JtYWxpemVzIGFuIGFic29sdXRlIG9yIGEgcmVsYXRpdmUgcG9zaXRpb24gb2YgYW4gaXRlbS5cclxuXHQgKiBAcGFyYW0gcG9zaXRpb24gVGhlIGFic29sdXRlIG9yIHJlbGF0aXZlIHBvc2l0aW9uIHRvIG5vcm1hbGl6ZS5cclxuXHQgKiBAcGFyYW0gcmVsYXRpdmUgV2hldGhlciB0aGUgZ2l2ZW4gcG9zaXRpb24gaXMgcmVsYXRpdmUgb3Igbm90LlxyXG5cdCAqIEByZXR1cm5zIFRoZSBub3JtYWxpemVkIHBvc2l0aW9uLlxyXG5cdCAqL1xyXG4gIG5vcm1hbGl6ZShwb3NpdGlvbjogbnVtYmVyLCByZWxhdGl2ZT86IGJvb2xlYW4pOiBudW1iZXIge1xyXG5cdFx0Y29uc3QgbiA9IHRoaXMuX2l0ZW1zLmxlbmd0aCxcclxuXHRcdFx0XHRcdG0gPSByZWxhdGl2ZSA/IDAgOiB0aGlzLl9jbG9uZXMubGVuZ3RoO1xyXG5cclxuXHRcdGlmICghdGhpcy5faXNOdW1lcmljKHBvc2l0aW9uKSB8fCBuIDwgMSkge1xyXG5cdFx0XHRwb3NpdGlvbiA9IHVuZGVmaW5lZDtcclxuXHRcdH0gZWxzZSBpZiAocG9zaXRpb24gPCAwIHx8IHBvc2l0aW9uID49IG4gKyBtKSB7XHJcblx0XHRcdHBvc2l0aW9uID0gKChwb3NpdGlvbiAtIG0gLyAyKSAlIG4gKyBuKSAlIG4gKyBtIC8gMjtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcG9zaXRpb247XHJcblx0IH1cclxuXHJcbiAgLyoqXHJcblx0ICogQ29udmVydHMgYW4gYWJzb2x1dGUgcG9zaXRpb24gb2YgYW4gaXRlbSBpbnRvIGEgcmVsYXRpdmUgb25lLlxyXG5cdCAqIEBwYXJhbSBwb3NpdGlvbiBUaGUgYWJzb2x1dGUgcG9zaXRpb24gdG8gY29udmVydC5cclxuXHQgKiBAcmV0dXJucyBUaGUgY29udmVydGVkIHBvc2l0aW9uLlxyXG5cdCAqL1xyXG4gIHJlbGF0aXZlKHBvc2l0aW9uOiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0cG9zaXRpb24gLT0gdGhpcy5fY2xvbmVzLmxlbmd0aCAvIDI7XHJcblx0XHRyZXR1cm4gdGhpcy5ub3JtYWxpemUocG9zaXRpb24sIHRydWUpO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogR2V0cyB0aGUgbWF4aW11bSBwb3NpdGlvbiBmb3IgdGhlIGN1cnJlbnQgaXRlbS5cclxuXHQgKiBAcGFyYW0gcmVsYXRpdmUgV2hldGhlciB0byByZXR1cm4gYW4gYWJzb2x1dGUgcG9zaXRpb24gb3IgYSByZWxhdGl2ZSBwb3NpdGlvbi5cclxuXHQgKiBAcmV0dXJucyBudW1iZXIgb2YgbWF4aW11bSBwb3NpdGlvblxyXG5cdCAqL1xyXG4gIG1heGltdW0ocmVsYXRpdmU6IGJvb2xlYW4gPSBmYWxzZSk6IG51bWJlciB7XHJcblx0XHRjb25zdCBzZXR0aW5ncyA9IHRoaXMuc2V0dGluZ3M7XHJcblx0XHRsZXRcdG1heGltdW0gPSB0aGlzLl9jb29yZGluYXRlcy5sZW5ndGgsXHJcblx0XHRcdGl0ZXJhdG9yLFxyXG5cdFx0XHRyZWNpcHJvY2FsSXRlbXNXaWR0aCxcclxuXHRcdFx0ZWxlbWVudFdpZHRoO1xyXG5cclxuXHRcdGlmIChzZXR0aW5ncy5sb29wKSB7XHJcblx0XHRcdG1heGltdW0gPSB0aGlzLl9jbG9uZXMubGVuZ3RoIC8gMiArIHRoaXMuX2l0ZW1zLmxlbmd0aCAtIDE7XHJcblx0XHR9IGVsc2UgaWYgKHNldHRpbmdzLmF1dG9XaWR0aCB8fCBzZXR0aW5ncy5tZXJnZSkge1xyXG5cdFx0XHRpdGVyYXRvciA9IHRoaXMuX2l0ZW1zLmxlbmd0aDtcclxuXHRcdFx0cmVjaXByb2NhbEl0ZW1zV2lkdGggPSB0aGlzLnNsaWRlc0RhdGFbLS1pdGVyYXRvcl0ud2lkdGg7XHJcblx0XHRcdGVsZW1lbnRXaWR0aCA9IHRoaXMuX3dpZHRoO1xyXG5cdFx0XHR3aGlsZSAoaXRlcmF0b3ItLSkge1xyXG5cdFx0XHRcdC8vIGl0IGNvdWxkIGJlIHVzZSB0aGlzLl9pdGVtcyBpbnN0ZWFkIG9mIHRoaXMuc2xpZGVzRGF0YTtcclxuXHRcdFx0XHRyZWNpcHJvY2FsSXRlbXNXaWR0aCArPSArdGhpcy5zbGlkZXNEYXRhW2l0ZXJhdG9yXS53aWR0aCArIHRoaXMuc2V0dGluZ3MubWFyZ2luO1xyXG5cdFx0XHRcdGlmIChyZWNpcHJvY2FsSXRlbXNXaWR0aCA+IGVsZW1lbnRXaWR0aCkge1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdG1heGltdW0gPSBpdGVyYXRvciArIDE7XHJcblx0XHR9IGVsc2UgaWYgKHNldHRpbmdzLmNlbnRlcikge1xyXG5cdFx0XHRtYXhpbXVtID0gdGhpcy5faXRlbXMubGVuZ3RoIC0gMTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdG1heGltdW0gPSB0aGlzLl9pdGVtcy5sZW5ndGggLSBzZXR0aW5ncy5pdGVtcztcclxuXHRcdH1cclxuXHJcblx0XHRpZiAocmVsYXRpdmUpIHtcclxuXHRcdFx0bWF4aW11bSAtPSB0aGlzLl9jbG9uZXMubGVuZ3RoIC8gMjtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gTWF0aC5tYXgobWF4aW11bSwgMCk7XHJcblx0IH1cclxuXHJcbiAgLyoqXHJcblx0ICogR2V0cyB0aGUgbWluaW11bSBwb3NpdGlvbiBmb3IgdGhlIGN1cnJlbnQgaXRlbS5cclxuXHQgKiBAcGFyYW0gcmVsYXRpdmUgV2hldGhlciB0byByZXR1cm4gYW4gYWJzb2x1dGUgcG9zaXRpb24gb3IgYSByZWxhdGl2ZSBwb3NpdGlvbi5cclxuXHQgKiBAcmV0dXJucyBudW1iZXIgb2YgbWluaW11bSBwb3NpdGlvblxyXG5cdCAqL1xyXG4gIG1pbmltdW0ocmVsYXRpdmU6IGJvb2xlYW4gPSBmYWxzZSk6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gcmVsYXRpdmUgPyAwIDogdGhpcy5fY2xvbmVzLmxlbmd0aCAvIDI7XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBHZXRzIGFuIGl0ZW0gYXQgdGhlIHNwZWNpZmllZCByZWxhdGl2ZSBwb3NpdGlvbi5cclxuXHQgKiBAcGFyYW0gcG9zaXRpb24gVGhlIHJlbGF0aXZlIHBvc2l0aW9uIG9mIHRoZSBpdGVtLlxyXG5cdCAqIEByZXR1cm5zIFRoZSBpdGVtIGF0IHRoZSBnaXZlbiBwb3NpdGlvbiBvciBhbGwgaXRlbXMgaWYgbm8gcG9zaXRpb24gd2FzIGdpdmVuLlxyXG5cdCAqL1xyXG4gIGl0ZW1zKHBvc2l0aW9uPzogbnVtYmVyKTogQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZVtdIHtcclxuXHRcdGlmIChwb3NpdGlvbiA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLl9pdGVtcy5zbGljZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHBvc2l0aW9uID0gdGhpcy5ub3JtYWxpemUocG9zaXRpb24sIHRydWUpO1xyXG5cdFx0cmV0dXJuIFt0aGlzLl9pdGVtc1twb3NpdGlvbl1dO1xyXG5cdCB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEdldHMgYW4gaXRlbSBhdCB0aGUgc3BlY2lmaWVkIHJlbGF0aXZlIHBvc2l0aW9uLlxyXG5cdCAqIEBwYXJhbSBwb3NpdGlvbiBUaGUgcmVsYXRpdmUgcG9zaXRpb24gb2YgdGhlIGl0ZW0uXHJcblx0ICogQHJldHVybnMgVGhlIGl0ZW0gYXQgdGhlIGdpdmVuIHBvc2l0aW9uIG9yIGFsbCBpdGVtcyBpZiBubyBwb3NpdGlvbiB3YXMgZ2l2ZW4uXHJcblx0ICovXHJcbiAgbWVyZ2Vycyhwb3NpdGlvbjogbnVtYmVyKTogbnVtYmVyIHwgbnVtYmVyW10ge1xyXG5cdFx0aWYgKHBvc2l0aW9uID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuX21lcmdlcnMuc2xpY2UoKTtcclxuXHRcdH1cclxuXHJcblx0XHRwb3NpdGlvbiA9IHRoaXMubm9ybWFsaXplKHBvc2l0aW9uLCB0cnVlKTtcclxuXHRcdHJldHVybiB0aGlzLl9tZXJnZXJzW3Bvc2l0aW9uXTtcclxuXHQgfVxyXG5cclxuICAvKipcclxuXHQgKiBHZXRzIHRoZSBhYnNvbHV0ZSBwb3NpdGlvbnMgb2YgY2xvbmVzIGZvciBhbiBpdGVtLlxyXG5cdCAqIEBwYXJhbSBwb3NpdGlvbiBUaGUgcmVsYXRpdmUgcG9zaXRpb24gb2YgdGhlIGl0ZW0uXHJcblx0ICogQHJldHVybnMgVGhlIGFic29sdXRlIHBvc2l0aW9ucyBvZiBjbG9uZXMgZm9yIHRoZSBpdGVtIG9yIGFsbCBpZiBubyBwb3NpdGlvbiB3YXMgZ2l2ZW4uXHJcblx0ICovXHJcbiAgY2xvbmVzKHBvc2l0aW9uPzogbnVtYmVyKTogbnVtYmVyW10ge1xyXG5cdFx0Y29uc3Qgb2RkID0gdGhpcy5fY2xvbmVzLmxlbmd0aCAvIDIsXHJcblx0XHRcdGV2ZW4gPSBvZGQgKyB0aGlzLl9pdGVtcy5sZW5ndGgsXHJcblx0XHRcdG1hcCA9IGluZGV4ID0+IGluZGV4ICUgMiA9PT0gMCA/IGV2ZW4gKyBpbmRleCAvIDIgOiBvZGQgLSAoaW5kZXggKyAxKSAvIDI7XHJcblxyXG5cdFx0aWYgKHBvc2l0aW9uID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuX2Nsb25lcy5tYXAoKHYsIGkpID0+IG1hcChpKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX2Nsb25lcy5tYXAoKHYsIGkpID0+IHYgPT09IHBvc2l0aW9uID8gbWFwKGkpIDogbnVsbCkuZmlsdGVyKGl0ZW0gPT4gaXRlbSk7XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBTZXRzIHRoZSBjdXJyZW50IGFuaW1hdGlvbiBzcGVlZC5cclxuXHQgKiBAcGFyYW0gc3BlZWQgVGhlIGFuaW1hdGlvbiBzcGVlZCBpbiBtaWxsaXNlY29uZHMgb3Igbm90aGluZyB0byBsZWF2ZSBpdCB1bmNoYW5nZWQuXHJcblx0ICogQHJldHVybnMgVGhlIGN1cnJlbnQgYW5pbWF0aW9uIHNwZWVkIGluIG1pbGxpc2Vjb25kcy5cclxuXHQgKi9cclxuICBzcGVlZChzcGVlZD86IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRpZiAoc3BlZWQgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHR0aGlzLl9zcGVlZCA9IHNwZWVkO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzLl9zcGVlZDtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEdldHMgdGhlIGNvb3JkaW5hdGUgb2YgYW4gaXRlbS5cclxuXHQgKiBAdG9kbyBUaGUgbmFtZSBvZiB0aGlzIG1ldGhvZCBpcyBtaXNzbGVhbmRpbmcuXHJcblx0ICogQHBhcmFtIHBvc2l0aW9uIFRoZSBhYnNvbHV0ZSBwb3NpdGlvbiBvZiB0aGUgaXRlbSB3aXRoaW4gYG1pbmltdW0oKWAgYW5kIGBtYXhpbXVtKClgLlxyXG5cdCAqIEByZXR1cm5zIFRoZSBjb29yZGluYXRlIG9mIHRoZSBpdGVtIGluIHBpeGVsIG9yIGFsbCBjb29yZGluYXRlcy5cclxuXHQgKi9cclxuICBjb29yZGluYXRlcyhwb3NpdGlvbj86IG51bWJlcik6IG51bWJlciB8IG51bWJlcltdIHtcclxuXHRcdGxldCBtdWx0aXBsaWVyID0gMSxcclxuXHRcdFx0bmV3UG9zaXRpb24gPSBwb3NpdGlvbiAtIDEsXHJcblx0XHRcdGNvb3JkaW5hdGUsXHJcblx0XHRcdHJlc3VsdDogbnVtYmVyW107XHJcblxyXG5cdFx0aWYgKHBvc2l0aW9uID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0cmVzdWx0ID0gdGhpcy5fY29vcmRpbmF0ZXMubWFwKChpdGVtLCBpbmRleCkgPT4ge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLmNvb3JkaW5hdGVzKGluZGV4KSBhcyBudW1iZXI7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLmNlbnRlcikge1xyXG5cdFx0XHRpZiAodGhpcy5zZXR0aW5ncy5ydGwpIHtcclxuXHRcdFx0XHRtdWx0aXBsaWVyID0gLTE7XHJcblx0XHRcdFx0bmV3UG9zaXRpb24gPSBwb3NpdGlvbiArIDE7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGNvb3JkaW5hdGUgPSB0aGlzLl9jb29yZGluYXRlc1twb3NpdGlvbl07XHJcblx0XHRcdGNvb3JkaW5hdGUgKz0gKHRoaXMud2lkdGgoKSAtIGNvb3JkaW5hdGUgKyAodGhpcy5fY29vcmRpbmF0ZXNbbmV3UG9zaXRpb25dIHx8IDApKSAvIDIgKiBtdWx0aXBsaWVyO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y29vcmRpbmF0ZSA9IHRoaXMuX2Nvb3JkaW5hdGVzW25ld1Bvc2l0aW9uXSB8fCAwO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNvb3JkaW5hdGUgPSBNYXRoLmNlaWwoY29vcmRpbmF0ZSk7XHJcblxyXG5cdFx0cmV0dXJuIGNvb3JkaW5hdGU7XHJcblx0IH1cclxuXHJcbiAgLyoqXHJcblx0ICogQ2FsY3VsYXRlcyB0aGUgc3BlZWQgZm9yIGEgdHJhbnNsYXRpb24uXHJcblx0ICogQHBhcmFtIGZyb20gVGhlIGFic29sdXRlIHBvc2l0aW9uIG9mIHRoZSBzdGFydCBpdGVtLlxyXG5cdCAqIEBwYXJhbSB0byBUaGUgYWJzb2x1dGUgcG9zaXRpb24gb2YgdGhlIHRhcmdldCBpdGVtLlxyXG5cdCAqIEBwYXJhbSBmYWN0b3IgW2ZhY3Rvcj11bmRlZmluZWRdIC0gVGhlIHRpbWUgZmFjdG9yIGluIG1pbGxpc2Vjb25kcy5cclxuXHQgKiBAcmV0dXJucyBUaGUgdGltZSBpbiBtaWxsaXNlY29uZHMgZm9yIHRoZSB0cmFuc2xhdGlvbi5cclxuXHQgKi9cclxuICBwcml2YXRlIF9kdXJhdGlvbihmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIsIGZhY3Rvcj86IG51bWJlciB8IGJvb2xlYW4pOiBudW1iZXIge1xyXG5cdFx0aWYgKGZhY3RvciA9PT0gMCkge1xyXG5cdFx0XHRyZXR1cm4gMDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgoTWF0aC5hYnModG8gLSBmcm9tKSwgMSksIDYpICogTWF0aC5hYnMoKCtmYWN0b3IgfHwgdGhpcy5zZXR0aW5ncy5zbWFydFNwZWVkKSk7XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBTbGlkZXMgdG8gdGhlIHNwZWNpZmllZCBpdGVtLlxyXG5cdCAqIEBwYXJhbSBwb3NpdGlvbiBUaGUgcG9zaXRpb24gb2YgdGhlIGl0ZW0uXHJcblx0ICogQHBhcmFtIHNwZWVkIFRoZSB0aW1lIGluIG1pbGxpc2Vjb25kcyBmb3IgdGhlIHRyYW5zaXRpb24uXHJcblx0ICovXHJcbiAgdG8ocG9zaXRpb246IG51bWJlciwgc3BlZWQ6IG51bWJlciB8IGJvb2xlYW4pIHtcclxuXHRcdGxldCBjdXJyZW50ID0gdGhpcy5jdXJyZW50KCksXHJcblx0XHRcdHJldmVydCA9IG51bGwsXHJcblx0XHRcdGRpc3RhbmNlID0gcG9zaXRpb24gLSB0aGlzLnJlbGF0aXZlKGN1cnJlbnQpLFxyXG5cdFx0XHRtYXhpbXVtID0gdGhpcy5tYXhpbXVtKCk7XHJcblx0XHRjb25zdFx0ZGlyZWN0aW9uID0gKyhkaXN0YW5jZSA+IDApIC0gKyhkaXN0YW5jZSA8IDApLFxyXG5cdFx0XHRpdGVtcyA9IHRoaXMuX2l0ZW1zLmxlbmd0aCxcclxuXHRcdFx0bWluaW11bSA9IHRoaXMubWluaW11bSgpO1xyXG5cclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLmxvb3ApIHtcclxuXHRcdFx0aWYgKCF0aGlzLnNldHRpbmdzLnJld2luZCAmJiBNYXRoLmFicyhkaXN0YW5jZSkgPiBpdGVtcyAvIDIpIHtcclxuXHRcdFx0XHRkaXN0YW5jZSArPSBkaXJlY3Rpb24gKiAtMSAqIGl0ZW1zO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRwb3NpdGlvbiA9IGN1cnJlbnQgKyBkaXN0YW5jZTtcclxuXHRcdFx0cmV2ZXJ0ID0gKChwb3NpdGlvbiAtIG1pbmltdW0pICUgaXRlbXMgKyBpdGVtcykgJSBpdGVtcyArIG1pbmltdW07XHJcblxyXG5cdFx0XHRpZiAocmV2ZXJ0ICE9PSBwb3NpdGlvbiAmJiByZXZlcnQgLSBkaXN0YW5jZSA8PSBtYXhpbXVtICYmIHJldmVydCAtIGRpc3RhbmNlID4gMCkge1xyXG5cdFx0XHRcdGN1cnJlbnQgPSByZXZlcnQgLSBkaXN0YW5jZTtcclxuXHRcdFx0XHRwb3NpdGlvbiA9IHJldmVydDtcclxuXHRcdFx0XHR0aGlzLnJlc2V0KGN1cnJlbnQpO1xyXG5cdFx0XHRcdHRoaXMuc2VuZENoYW5nZXMoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIGlmICh0aGlzLnNldHRpbmdzLnJld2luZCkge1xyXG5cdFx0XHRtYXhpbXVtICs9IDE7XHJcblx0XHRcdHBvc2l0aW9uID0gKHBvc2l0aW9uICUgbWF4aW11bSArIG1heGltdW0pICUgbWF4aW11bTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHBvc2l0aW9uID0gTWF0aC5tYXgobWluaW11bSwgTWF0aC5taW4obWF4aW11bSwgcG9zaXRpb24pKTtcclxuXHRcdH1cclxuXHJcblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0dGhpcy5zcGVlZCh0aGlzLl9kdXJhdGlvbihjdXJyZW50LCBwb3NpdGlvbiwgc3BlZWQpKTtcclxuXHRcdFx0dGhpcy5jdXJyZW50KHBvc2l0aW9uKTtcclxuXHJcblx0XHRcdHRoaXMudXBkYXRlKCk7XHJcblx0XHR9LCAwKTtcclxuXHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBTbGlkZXMgdG8gdGhlIG5leHQgaXRlbS5cclxuXHQgKiBAcGFyYW0gc3BlZWQgVGhlIHRpbWUgaW4gbWlsbGlzZWNvbmRzIGZvciB0aGUgdHJhbnNpdGlvbi5cclxuXHQgKi9cclxuICBuZXh0KHNwZWVkOiBudW1iZXIgfCBib29sZWFuKSB7XHJcblx0XHRzcGVlZCA9IHNwZWVkIHx8IGZhbHNlO1xyXG5cdFx0dGhpcy50byh0aGlzLnJlbGF0aXZlKHRoaXMuY3VycmVudCgpKSArIDEsIHNwZWVkKTtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIFNsaWRlcyB0byB0aGUgcHJldmlvdXMgaXRlbS5cclxuXHQgKiBAcGFyYW0gc3BlZWQgVGhlIHRpbWUgaW4gbWlsbGlzZWNvbmRzIGZvciB0aGUgdHJhbnNpdGlvbi5cclxuXHQgKi9cclxuICBwcmV2KHNwZWVkOiBudW1iZXIgfCBib29sZWFuKSB7XHJcblx0XHRzcGVlZCA9IHNwZWVkIHx8IGZhbHNlO1xyXG5cdFx0dGhpcy50byh0aGlzLnJlbGF0aXZlKHRoaXMuY3VycmVudCgpKSAtIDEsIHNwZWVkKTtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEhhbmRsZXMgdGhlIGVuZCBvZiBhbiBhbmltYXRpb24uXHJcblx0ICogQHBhcmFtIGV2ZW50IC0gVGhlIGV2ZW50IGFyZ3VtZW50cy5cclxuXHQgKi9cclxuICBvblRyYW5zaXRpb25FbmQoZXZlbnQ/OiBhbnkpIHtcclxuXHRcdC8vIGlmIGNzczIgYW5pbWF0aW9uIHRoZW4gZXZlbnQgb2JqZWN0IGlzIHVuZGVmaW5lZFxyXG5cdFx0aWYgKGV2ZW50ICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0Ly8gZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG5cdFx0XHQvLyAvLyBDYXRjaCBvbmx5IG93bC1zdGFnZSB0cmFuc2l0aW9uRW5kIGV2ZW50XHJcblx0XHRcdC8vIGlmICgoZXZlbnQudGFyZ2V0IHx8IGV2ZW50LnNyY0VsZW1lbnQgfHwgZXZlbnQub3JpZ2luYWxUYXJnZXQpICE9PSB0aGlzLiRzdGFnZS5nZXQoMClcdCkge1xyXG5cdFx0XHQvLyBcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0Ly8gfVxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0XHR0aGlzLmxlYXZlKCdhbmltYXRpbmcnKTtcclxuXHRcdHRoaXMuX3RyaWdnZXIoJ3RyYW5zbGF0ZWQnKTtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEdldHMgdmlld3BvcnQgd2lkdGguXHJcblx0ICogQHJldHVybnMgLSBUaGUgd2lkdGggaW4gcGl4ZWwuXHJcblx0ICovXHJcbiAgcHJpdmF0ZSBfdmlld3BvcnQoKTogbnVtYmVyIHtcclxuXHRcdGxldCB3aWR0aDtcclxuXHRcdGlmICh0aGlzLl93aWR0aCkge1xyXG5cdFx0XHR3aWR0aCA9IHRoaXMuX3dpZHRoO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y29uc29sZS53YXJuKCdDYW4gbm90IGRldGVjdCB2aWV3cG9ydCB3aWR0aC4nKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB3aWR0aDtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIFNldHMgX2l0ZW1zXHJcblx0ICogQHBhcmFtIGNvbnRlbnQgVGhlIGxpc3Qgb2Ygc2xpZGVzIHB1dCBpbnRvIENhcm91c2VsU2xpZGVEaXJlY3RpdmVzLlxyXG5cdCAqL1xyXG4gIHNldEl0ZW1zKGNvbnRlbnQ6IENhcm91c2VsU2xpZGVEaXJlY3RpdmVbXSkge1xyXG5cdFx0dGhpcy5faXRlbXMgPSBjb250ZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyBzbGlkZXNEYXRhIHVzaW5nIHRoaXMuX2l0ZW1zXHJcblx0ICovXHJcblx0cHJpdmF0ZSBfZGVmaW5lU2xpZGVzRGF0YSgpIHtcclxuXHRcdC8vIE1heWJlIGNyZWF0aW5nIGFuZCB1c2luZyBsb2FkTWFwIHdvdWxkIGJlIGJldHRlciBpbiBMYXp5TG9hZFNlcnZpY2UuXHJcblx0XHQvLyBIb3Zld2VyIGluIHRoYXQgY2FzZSB3aGVuICdyZXNpemUnIGV2ZW50IGZpcmVzLCBwcm9wICdsb2FkJyBvZiBhbGwgc2xpZGVzIHdpbGwgZ2V0ICdmYWxzZScgYW5kIHN1Y2ggc3RhdGUgb2YgcHJvcCB3aWxsIGJlIHNlZW4gYnkgVmlldyBkdXJpbmcgaXRzIHVwZGF0aW5nLiBBY2NvcmRpbmdseSB0aGUgY29kZSB3aWxsIHJlbW92ZSBzbGlkZXMncyBjb250ZW50IGZyb20gRE9NIGV2ZW4gaWYgaXQgd2FzIGxvYWRlZCBiZWZvcmUuXHJcblx0XHQvLyBUaHVzIGl0IHdvdWxkIGJlIG5lZWRlZCB0byBhZGQgdGhhdCBjb250ZW50IGludG8gRE9NIGFnYWluLlxyXG5cdFx0Ly8gSW4gb3JkZXIgdG8gYXZvaWQgYWRkaXRpb25hbCByZW1vdmluZy9hZGRpbmcgbG9hZGVkIHNsaWRlcydzIGNvbnRlbnQgd2UgdXNlIGxvYWRNYXAgaGVyZSBhbmQgc2V0IHJlc3RvcmUgc3RhdGUgb2YgcHJvcCAnbG9hZCcgYmVmb3JlIHRoZSBWaWV3IHdpbGwgZ2V0IGl0LlxyXG5cdFx0bGV0IGxvYWRNYXA6IE1hcDxzdHJpbmcsIGJvb2xlYW4+O1xyXG5cclxuXHRcdGlmICh0aGlzLnNsaWRlc0RhdGEgJiYgdGhpcy5zbGlkZXNEYXRhLmxlbmd0aCkge1xyXG5cdFx0XHRsb2FkTWFwID0gbmV3IE1hcCgpO1xyXG5cdFx0XHR0aGlzLnNsaWRlc0RhdGEuZm9yRWFjaChpdGVtID0+IHtcclxuXHRcdFx0XHRpZiAoaXRlbS5sb2FkKSB7XHJcblx0XHRcdFx0XHRsb2FkTWFwLnNldChpdGVtLmlkLCBpdGVtLmxvYWQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNsaWRlc0RhdGEgPSB0aGlzLl9pdGVtcy5tYXAoc2xpZGUgPT4ge1xyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdGlkOiBgJHtzbGlkZS5pZH1gLFxyXG5cdFx0XHRcdGlzQWN0aXZlOiBmYWxzZSxcclxuXHRcdFx0XHR0cGxSZWY6IHNsaWRlLnRwbFJlZixcclxuXHRcdFx0XHRkYXRhTWVyZ2U6IHNsaWRlLmRhdGFNZXJnZSxcclxuXHRcdFx0XHR3aWR0aDogMCxcclxuXHRcdFx0XHRpc0Nsb25lZDogZmFsc2UsXHJcblx0XHRcdFx0bG9hZDogbG9hZE1hcCA/IGxvYWRNYXAuZ2V0KHNsaWRlLmlkKSA6IGZhbHNlLFxyXG5cdFx0XHRcdGhhc2hGcmFnbWVudDogc2xpZGUuZGF0YUhhc2hcclxuXHRcdFx0fTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyBjdXJyZW50IGNsYXNzZXMgZm9yIHNsaWRlXHJcblx0ICogQHBhcmFtIHNsaWRlIFNsaWRlIG9mIGNhcm91c2VsXHJcblx0ICogQHJldHVybnMgb2JqZWN0IHdpdGggbmFtZXMgb2YgY3NzLWNsYXNzZXMgd2hpY2ggYXJlIGtleXMgYW5kIHRydWUvZmFsc2UgdmFsdWVzXHJcblx0ICovXHJcblx0c2V0Q3VyU2xpZGVDbGFzc2VzKHNsaWRlOiBTbGlkZU1vZGVsKToge1trZXk6IHN0cmluZ106IGJvb2xlYW59IHtcclxuXHRcdC8vIENTUyBjbGFzc2VzOiBhZGRlZC9yZW1vdmVkIHBlciBjdXJyZW50IHN0YXRlIG9mIGNvbXBvbmVudCBwcm9wZXJ0aWVzXHJcblx0XHRjb25zdCBjdXJyZW50Q2xhc3Nlczoge1trZXk6IHN0cmluZ106IGJvb2xlYW59ID0gIHtcclxuXHRcdFx0J2FjdGl2ZSc6IHNsaWRlLmlzQWN0aXZlLFxyXG5cdFx0XHQnY2VudGVyJzogc2xpZGUuaXNDZW50ZXJlZCxcclxuXHRcdFx0J2Nsb25lZCc6IHNsaWRlLmlzQ2xvbmVkLFxyXG5cdFx0XHQnYW5pbWF0ZWQnOiBzbGlkZS5pc0FuaW1hdGVkLFxyXG5cdFx0XHQnb3dsLWFuaW1hdGVkLWluJzogc2xpZGUuaXNEZWZBbmltYXRlZEluLFxyXG5cdFx0XHQnb3dsLWFuaW1hdGVkLW91dCc6IHNsaWRlLmlzRGVmQW5pbWF0ZWRPdXRcclxuXHRcdH07XHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5hbmltYXRlSW4pIHtcclxuXHRcdFx0Y3VycmVudENsYXNzZXNbdGhpcy5zZXR0aW5ncy5hbmltYXRlSW4gYXMgc3RyaW5nXSA9IHNsaWRlLmlzQ3VzdG9tQW5pbWF0ZWRJbjtcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLmFuaW1hdGVPdXQpIHtcclxuXHRcdFx0Y3VycmVudENsYXNzZXNbdGhpcy5zZXR0aW5ncy5hbmltYXRlT3V0IGFzIHN0cmluZ10gPSBzbGlkZS5pc0N1c3RvbUFuaW1hdGVkT3V0O1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGN1cnJlbnRDbGFzc2VzO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogT3BlcmF0b3JzIHRvIGNhbGN1bGF0ZSByaWdodC10by1sZWZ0IGFuZCBsZWZ0LXRvLXJpZ2h0LlxyXG5cdCAqIEBwYXJhbSBhIC0gVGhlIGxlZnQgc2lkZSBvcGVyYW5kLlxyXG5cdCAqIEBwYXJhbSBvIC0gVGhlIG9wZXJhdG9yLlxyXG5cdCAqIEBwYXJhbSBiIC0gVGhlIHJpZ2h0IHNpZGUgb3BlcmFuZC5cclxuXHQgKiBAcmV0dXJucyB0cnVlL2ZhbHNlIG1lYW5pbmcgcmlnaHQtdG8tbGVmdCBvciBsZWZ0LXRvLXJpZ2h0XHJcblx0ICovXHJcbiAgcHJpdmF0ZSBfb3AoYTogbnVtYmVyLCBvOiBzdHJpbmcsIGI6IG51bWJlcik6IGJvb2xlYW4ge1xyXG5cdFx0Y29uc3QgcnRsID0gdGhpcy5zZXR0aW5ncy5ydGw7XHJcblx0XHRzd2l0Y2ggKG8pIHtcclxuXHRcdFx0Y2FzZSAnPCc6XHJcblx0XHRcdFx0cmV0dXJuIHJ0bCA/IGEgPiBiIDogYSA8IGI7XHJcblx0XHRcdGNhc2UgJz4nOlxyXG5cdFx0XHRcdHJldHVybiBydGwgPyBhIDwgYiA6IGEgPiBiO1xyXG5cdFx0XHRjYXNlICc+PSc6XHJcblx0XHRcdFx0cmV0dXJuIHJ0bCA/IGEgPD0gYiA6IGEgPj0gYjtcclxuXHRcdFx0Y2FzZSAnPD0nOlxyXG5cdFx0XHRcdHJldHVybiBydGwgPyBhID49IGIgOiBhIDw9IGI7XHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBUcmlnZ2VycyBhIHB1YmxpYyBldmVudC5cclxuXHQgKiBAdG9kbyBSZW1vdmUgYHN0YXR1c2AsIGByZWxhdGVkVGFyZ2V0YCBzaG91bGQgYmUgdXNlZCBpbnN0ZWFkLlxyXG5cdCAqIEBwYXJhbSBuYW1lIFRoZSBldmVudCBuYW1lLlxyXG5cdCAqIEBwYXJhbSBkYXRhIFRoZSBldmVudCBkYXRhLlxyXG5cdCAqIEBwYXJhbSBuYW1lc3BhY2UgVGhlIGV2ZW50IG5hbWVzcGFjZS5cclxuXHQgKiBAcGFyYW0gc3RhdGUgVGhlIHN0YXRlIHdoaWNoIGlzIGFzc29jaWF0ZWQgd2l0aCB0aGUgZXZlbnQuXHJcblx0ICogQHBhcmFtIGVudGVyIEluZGljYXRlcyBpZiB0aGUgY2FsbCBlbnRlcnMgdGhlIHNwZWNpZmllZCBzdGF0ZSBvciBub3QuXHJcblx0ICovXHJcbiAgcHJpdmF0ZSBfdHJpZ2dlcihuYW1lOiBzdHJpbmcsIGRhdGE/OiBhbnksIG5hbWVzcGFjZT86IHN0cmluZywgc3RhdGU/OiBzdHJpbmcsIGVudGVyPzogYm9vbGVhbikge1xyXG5cdFx0c3dpdGNoIChuYW1lKSB7XHJcblx0XHRcdGNhc2UgJ2luaXRpYWxpemVkJzpcclxuXHRcdFx0XHR0aGlzLl9pbml0aWFsaXplZENhcm91c2VsJC5uZXh0KG5hbWUpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdjaGFuZ2UnOlxyXG5cdFx0XHRcdHRoaXMuX2NoYW5nZVNldHRpbmdzQ2Fyb3VzZWwkLm5leHQoZGF0YSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ2NoYW5nZWQnOlxyXG5cdFx0XHRcdHRoaXMuX2NoYW5nZWRTZXR0aW5nc0Nhcm91c2VsJC5uZXh0KGRhdGEpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdkcmFnJzpcclxuXHRcdFx0XHR0aGlzLl9kcmFnQ2Fyb3VzZWwkLm5leHQobmFtZSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ2RyYWdnZWQnOlxyXG5cdFx0XHRcdHRoaXMuX2RyYWdnZWRDYXJvdXNlbCQubmV4dChuYW1lKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAncmVzaXplJzpcclxuXHRcdFx0XHR0aGlzLl9yZXNpemVDYXJvdXNlbCQubmV4dChuYW1lKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAncmVzaXplZCc6XHJcblx0XHRcdFx0dGhpcy5fcmVzaXplZENhcm91c2VsJC5uZXh0KG5hbWUpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdyZWZyZXNoJzpcclxuXHRcdFx0XHR0aGlzLl9yZWZyZXNoQ2Fyb3VzZWwkLm5leHQobmFtZSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ3JlZnJlc2hlZCc6XHJcblx0XHRcdFx0dGhpcy5fcmVmcmVzaGVkQ2Fyb3VzZWwkLm5leHQobmFtZSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ3RyYW5zbGF0ZSc6XHJcblx0XHRcdFx0dGhpcy5fdHJhbnNsYXRlQ2Fyb3VzZWwkLm5leHQobmFtZSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ3RyYW5zbGF0ZWQnOlxyXG5cdFx0XHRcdHRoaXMuX3RyYW5zbGF0ZWRDYXJvdXNlbCQubmV4dChuYW1lKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBFbnRlcnMgYSBzdGF0ZS5cclxuXHQgKiBAcGFyYW0gbmFtZSAtIFRoZSBzdGF0ZSBuYW1lLlxyXG5cdCAqL1xyXG4gIGVudGVyKG5hbWU6IHN0cmluZykge1xyXG4gICAgWyBuYW1lIF0uY29uY2F0KHRoaXMuX3N0YXRlcy50YWdzW25hbWVdIHx8IFtdKS5mb3JFYWNoKChzdGF0ZU5hbWUpID0+IHtcclxuICAgICAgaWYgKHRoaXMuX3N0YXRlcy5jdXJyZW50W3N0YXRlTmFtZV0gPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdHRoaXMuX3N0YXRlcy5jdXJyZW50W3N0YXRlTmFtZV0gPSAwO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLl9zdGF0ZXMuY3VycmVudFtzdGF0ZU5hbWVdKys7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICAvKipcclxuXHQgKiBMZWF2ZXMgYSBzdGF0ZS5cclxuXHQgKiBAcGFyYW0gbmFtZSAtIFRoZSBzdGF0ZSBuYW1lLlxyXG5cdCAqL1xyXG5cdGxlYXZlKG5hbWU6IHN0cmluZykge1xyXG4gICAgWyBuYW1lIF0uY29uY2F0KHRoaXMuX3N0YXRlcy50YWdzW25hbWVdIHx8IFtdKS5mb3JFYWNoKChzdGF0ZU5hbWUpID0+IHtcclxuICAgICAgaWYgKHRoaXMuX3N0YXRlcy5jdXJyZW50W3N0YXRlTmFtZV0gPT09IDAgfHwgISF0aGlzLl9zdGF0ZXMuY3VycmVudFtzdGF0ZU5hbWVdKSB7XHJcbiAgICAgICAgdGhpcy5fc3RhdGVzLmN1cnJlbnRbc3RhdGVOYW1lXS0tO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH07XHJcblxyXG4gIC8qKlxyXG5cdCAqIFJlZ2lzdGVycyBhbiBldmVudCBvciBzdGF0ZS5cclxuXHQgKiBAcGFyYW0gb2JqZWN0IC0gVGhlIGV2ZW50IG9yIHN0YXRlIHRvIHJlZ2lzdGVyLlxyXG5cdCAqL1xyXG4gIHJlZ2lzdGVyKG9iamVjdDogYW55KSB7XHJcblx0XHRpZiAob2JqZWN0LnR5cGUgPT09IFR5cGUuU3RhdGUpIHtcclxuXHRcdFx0aWYgKCF0aGlzLl9zdGF0ZXMudGFnc1tvYmplY3QubmFtZV0pIHtcclxuXHRcdFx0XHR0aGlzLl9zdGF0ZXMudGFnc1tvYmplY3QubmFtZV0gPSBvYmplY3QudGFncztcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLl9zdGF0ZXMudGFnc1tvYmplY3QubmFtZV0gPSB0aGlzLl9zdGF0ZXMudGFnc1tvYmplY3QubmFtZV0uY29uY2F0KG9iamVjdC50YWdzKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5fc3RhdGVzLnRhZ3Nbb2JqZWN0Lm5hbWVdID0gdGhpcy5fc3RhdGVzLnRhZ3Nbb2JqZWN0Lm5hbWVdLmZpbHRlcigodGFnLCBpKSA9PiB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuX3N0YXRlcy50YWdzW29iamVjdC5uYW1lXS5pbmRleE9mKHRhZykgPT09IGk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogU3VwcHJlc3NlcyBldmVudHMuXHJcblx0ICogQHBhcmFtIGV2ZW50cyBUaGUgZXZlbnRzIHRvIHN1cHByZXNzLlxyXG5cdCAqL1xyXG4gIHByaXZhdGUgX3N1cHByZXNzKGV2ZW50czogc3RyaW5nW10pIHtcclxuXHRcdGV2ZW50cy5mb3JFYWNoKGV2ZW50ID0+IHtcclxuXHRcdFx0dGhpcy5fc3VwcmVzc1tldmVudF0gPSB0cnVlO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBSZWxlYXNlcyBzdXBwcmVzc2VkIGV2ZW50cy5cclxuXHQgKiBAcGFyYW0gZXZlbnRzIFRoZSBldmVudHMgdG8gcmVsZWFzZS5cclxuXHQgKi9cclxuICBwcml2YXRlIF9yZWxlYXNlKGV2ZW50czogc3RyaW5nW10pIHtcclxuXHRcdGV2ZW50cy5mb3JFYWNoKGV2ZW50ID0+IHtcclxuXHRcdFx0ZGVsZXRlIHRoaXMuX3N1cHJlc3NbZXZlbnRdO1xyXG5cdFx0fSk7XHJcblx0IH1cclxuXHJcbiAgLyoqXHJcblx0ICogR2V0cyB1bmlmaWVkIHBvaW50ZXIgY29vcmRpbmF0ZXMgZnJvbSBldmVudC5cclxuXHQgKiBAdG9kbyAjMjYxXHJcblx0ICogQHBhcmFtIGV2ZW50IFRoZSBgbW91c2Vkb3duYCBvciBgdG91Y2hzdGFydGAgZXZlbnQuXHJcblx0ICogQHJldHVybnMgT2JqZWN0IENvb3JkcyB3aGljaCBjb250YWlucyBgeGAgYW5kIGB5YCBjb29yZGluYXRlcyBvZiBjdXJyZW50IHBvaW50ZXIgcG9zaXRpb24uXHJcblx0ICovXHJcblx0cG9pbnRlcihldmVudDogYW55KTogQ29vcmRzIHtcclxuXHRcdGNvbnN0IHJlc3VsdCA9IHsgeDogbnVsbCwgeTogbnVsbCB9O1xyXG5cclxuXHRcdGV2ZW50ID0gZXZlbnQub3JpZ2luYWxFdmVudCB8fCBldmVudCB8fCB3aW5kb3cuZXZlbnQ7XHJcblxyXG5cdFx0ZXZlbnQgPSBldmVudC50b3VjaGVzICYmIGV2ZW50LnRvdWNoZXMubGVuZ3RoID9cclxuXHRcdFx0ZXZlbnQudG91Y2hlc1swXSA6IGV2ZW50LmNoYW5nZWRUb3VjaGVzICYmIGV2ZW50LmNoYW5nZWRUb3VjaGVzLmxlbmd0aCA/XHJcblx0XHRcdFx0ZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0gOiBldmVudDtcclxuXHJcblx0XHRpZiAoZXZlbnQucGFnZVgpIHtcclxuXHRcdFx0cmVzdWx0LnggPSBldmVudC5wYWdlWDtcclxuXHRcdFx0cmVzdWx0LnkgPSBldmVudC5wYWdlWTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJlc3VsdC54ID0gZXZlbnQuY2xpZW50WDtcclxuXHRcdFx0cmVzdWx0LnkgPSBldmVudC5jbGllbnRZO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0IH1cclxuXHJcbiAgLyoqXHJcblx0ICogRGV0ZXJtaW5lcyBpZiB0aGUgaW5wdXQgaXMgYSBOdW1iZXIgb3Igc29tZXRoaW5nIHRoYXQgY2FuIGJlIGNvZXJjZWQgdG8gYSBOdW1iZXJcclxuXHQgKiBAcGFyYW0gbnVtYmVyIFRoZSBpbnB1dCB0byBiZSB0ZXN0ZWRcclxuXHQgKiBAcmV0dXJucyBBbiBpbmRpY2F0aW9uIGlmIHRoZSBpbnB1dCBpcyBhIE51bWJlciBvciBjYW4gYmUgY29lcmNlZCB0byBhIE51bWJlclxyXG5cdCAqL1xyXG4gIHByaXZhdGUgX2lzTnVtZXJpYyhudW1iZXI6IGFueSk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuICFpc05hTihwYXJzZUZsb2F0KG51bWJlcikpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRGV0ZXJtaW5lcyB3aGV0aGVyIHZhbHVlIGlzIG51bWJlciBvciBib29sZWFuIHR5cGVcclxuXHQgKiBAcGFyYW0gdmFsdWUgVGhlIGlucHV0IHRvIGJlIHRlc3RlZFxyXG5cdCAqIEByZXR1cm5zIEFuIGluZGljYXRpb24gaWYgdGhlIGlucHV0IGlzIGEgTnVtYmVyIG9yIGNhbiBiZSBjb2VyY2VkIHRvIGEgTnVtYmVyLCBvciBCb29sZWFuXHJcblx0ICovXHJcblx0cHJpdmF0ZSBfaXNOdW1iZXJPckJvb2xlYW4odmFsdWU6IG51bWJlciB8IGJvb2xlYW4pOiBib29sZWFuIHtcclxuXHRcdHJldHVybiB0aGlzLl9pc051bWVyaWModmFsdWUpIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRGV0ZXJtaW5lcyB3aGV0aGVyIHZhbHVlIGlzIG51bWJlciBvciBzdHJpbmcgdHlwZVxyXG5cdCAqIEBwYXJhbSB2YWx1ZSBUaGUgaW5wdXQgdG8gYmUgdGVzdGVkXHJcblx0ICogQHJldHVybnMgQW4gaW5kaWNhdGlvbiBpZiB0aGUgaW5wdXQgaXMgYSBOdW1iZXIgb3IgY2FuIGJlIGNvZXJjZWQgdG8gYSBOdW1iZXIsIG9yIFN0cmluZ1xyXG5cdCAqL1xyXG5cdHByaXZhdGUgX2lzTnVtYmVyT3JTdHJpbmcodmFsdWU6IG51bWJlciB8IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2lzTnVtZXJpYyh2YWx1ZSkgfHwgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERldGVybWluZXMgd2hldGhlciB2YWx1ZSBpcyBudW1iZXIgb3Igc3RyaW5nIHR5cGVcclxuXHQgKiBAcGFyYW0gdmFsdWUgVGhlIGlucHV0IHRvIGJlIHRlc3RlZFxyXG5cdCAqIEByZXR1cm5zIEFuIGluZGljYXRpb24gaWYgdGhlIGlucHV0IGlzIGEgTnVtYmVyIG9yIGNhbiBiZSBjb2VyY2VkIHRvIGEgTnVtYmVyLCBvciBTdHJpbmdcclxuXHQgKi9cclxuXHRwcml2YXRlIF9pc1N0cmluZ09yQm9vbGVhbih2YWx1ZTogbnVtYmVyIHwgc3RyaW5nKTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJztcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEdldHMgdGhlIGRpZmZlcmVuY2Ugb2YgdHdvIHZlY3RvcnMuXHJcblx0ICogQHRvZG8gIzI2MVxyXG5cdCAqIEBwYXJhbSBmaXJzdCBUaGUgZmlyc3QgdmVjdG9yLlxyXG5cdCAqIEBwYXJhbSBzZWNvbmQtIFRoZSBzZWNvbmQgdmVjdG9yLlxyXG5cdCAqIEByZXR1cm5zIFRoZSBkaWZmZXJlbmNlLlxyXG5cdCAqL1xyXG4gIGRpZmZlcmVuY2UoZmlyc3Q6IENvb3Jkcywgc2Vjb25kOiBDb29yZHMpOiBDb29yZHMge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0eDogZmlyc3QueCAtIHNlY29uZC54LFxyXG5cdFx0XHR5OiBmaXJzdC55IC0gc2Vjb25kLnlcclxuXHRcdH07XHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTmF2RGF0YSwgRG90c0RhdGEgfSBmcm9tICcuLi9tb2RlbHMvbmF2aWdhdGlvbi1kYXRhLm1vZGVscyc7XHJcbmltcG9ydCB7IENhcm91c2VsU2xpZGVEaXJlY3RpdmUgfSBmcm9tICcuLi9jYXJvdXNlbC9jYXJvdXNlbC5tb2R1bGUnO1xyXG5pbXBvcnQgeyBDYXJvdXNlbFNlcnZpY2UgfSBmcm9tICcuL2Nhcm91c2VsLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIE9ic2VydmFibGUsIG1lcmdlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IHRhcCwgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBPd2xPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWxzL293bC1vcHRpb25zLm1vZGVsJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE5hdmlnYXRpb25TZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcclxuICAvKipcclxuICAgKiBTdWJzY3Jpb3B0aW9uIHRvIG1lcmdlIE9ic2VydmFibGUgIGZyb20gQ2Fyb3VzZWxTZXJ2aWNlXHJcbiAgICovXHJcbiAgbmF2U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBwbHVnaW4gaXMgaW5pdGlhbGl6ZWQgb3Igbm90LlxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBfaW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGN1cnJlbnQgcGFnaW5nIGluZGV4ZXMuXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIF9wYWdlczogYW55W10gPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogRGF0YSBmb3IgbmF2aWdhdGlvbiBlbGVtZW50cyBvZiB0aGUgdXNlciBpbnRlcmZhY2UuXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIF9uYXZEYXRhOiBOYXZEYXRhID0ge1xyXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgcHJldjoge1xyXG4gICAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICAgIGh0bWxUZXh0OiAnJ1xyXG4gICAgfSxcclxuICAgIG5leHQ6IHtcclxuICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgICBodG1sVGV4dDogJydcclxuICAgIH0sXHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogRGF0YSBmb3IgZG90IGVsZW1lbnRzIG9mIHRoZSB1c2VyIGludGVyZmFjZS5cclxuICAgKi9cclxuICBwcm90ZWN0ZWQgX2RvdHNEYXRhOiBEb3RzRGF0YSA9IHtcclxuICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgIGRvdHM6IFtdXHJcbiAgfTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjYXJvdXNlbFNlcnZpY2U6IENhcm91c2VsU2VydmljZSkge1xyXG4gICAgdGhpcy5zcHlEYXRhU3RyZWFtcygpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLm5hdlN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVmaW5lcyBPYnNlcnZhYmxlcyB3aGljaCBzZXJ2aWNlIG11c3Qgb2JzZXJ2ZVxyXG4gICAqL1xyXG4gIHNweURhdGFTdHJlYW1zKCkge1xyXG4gICAgY29uc3QgaW5pdGlhbGl6ZWRDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldEluaXRpYWxpemVkU3RhdGUoKS5waXBlKFxyXG4gICAgICB0YXAoc3RhdGUgPT4ge1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZU5hdlBhZ2VzKCk7XHJcbiAgICAgICAgdGhpcy5kcmF3KCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgICB0aGlzLmNhcm91c2VsU2VydmljZS5zZW5kQ2hhbmdlcygpO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBtb3N0bHkgY2hhbmdlcyBpbiBjYXJvdXNlbFNlcnZpY2UgYW5kIGNhcm91c2VsIGF0IGFsbCBjYXVzZXMgY2Fyb3VzZWxTZXJ2aWNlLnRvKCkuIEl0IG1vdmVzIHN0YWdlIHJpZ2h0LWxlZnQgYnkgaXRzIGNvZGUgYW5kIGNhbGxpbmcgbmVlZGVkIGZ1bmN0aW9uc1xyXG4gICAgLy8gVGh1cyB0aGlzIG1ldGhvZCBieSBjYWxsaW5nIGNhcm91c2VsU2VydmljZS5jdXJyZW50KHBvc2l0aW9uKSBub3RpZmllcyBhYm91dCBjaGFuZ2VzXHJcbiAgICBjb25zdCBjaGFuZ2VkU2V0dGluZ3MkOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRDaGFuZ2VkU3RhdGUoKS5waXBlKFxyXG4gICAgICBmaWx0ZXIoZGF0YSA9PiBkYXRhLnByb3BlcnR5Lm5hbWUgPT09ICdwb3NpdGlvbicpLFxyXG4gICAgICB0YXAoZGF0YSA9PiB7XHJcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgICAvLyBzaG91bGQgYmUgdGhlIGNhbGwgb2YgdGhlIGZ1bmN0aW9uIHdyaXR0ZW4gYXQgdGhlIGVuZCBvZiBjb21tZW50XHJcbiAgICAgICAgLy8gYnV0IHRoZSBtZXRob2QgY2Fyb3VzZWxTZXJ2aXZlLnRvKCkgaGFzIHNldFRpbWVvdXQoZiwgMCkgd2hpY2ggY29udGFpbnMgY2Fyb3VzZWxTZXJ2aXZlLnVwZGF0ZSgpIHdoaWNoIGNhbGxzIHNlbmRDaGFuZ2VzKCkgbWV0aG9kLlxyXG4gICAgICAgIC8vIGNhcm91c2VsU2VydmljZS5uYXZEYXRhIGFuZCBjYXJvdXNlbFNlcnZpY2UuZG90c0RhdGEgdXBkYXRlIGVhcmxpZXIgdGhhbiBjYXJvdXNlbFNlcnZpdmUudXBkYXRlKCkgZ2V0cyBjYWxsZWRcclxuICAgICAgICAvLyB1cGRhdGVzIG9mIGNhcm91c2VsU2VydmljZS5uYXZEYXRhIGFuZCBjYXJvdXNlbFNlcnZpY2UuZG90c0RhdGEgYXJlIGJlaW5nIGhhcHBlbmluZyB3aXRoaW5nIGNhcm91c2VsU2VydmljZS5jdXJyZW50KHBvc2l0aW9uKSBtZXRob2Qgd2hpY2ggY2FsbHMgbmV4dCgpIG9mIF9jaGFuZ2VkU2V0dGluZ3NDYXJvdXNlbCRcclxuICAgICAgICAvLyBjYXJvdXNlbFNlcnZpY2UuY3VycmVudChwb3NpdGlvbikgaXMgYmVpbmcgY2FsbGluZyBlYXJsaWVyIHRoYW4gY2Fyb3VzZWxTZXJ2aXZlLnVwZGF0ZSgpO1xyXG4gICAgICAgIC8vIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNlbmRDaGFuZ2VzKCk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IHJlZnJlc2hlZENhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0UmVmcmVzaGVkU3RhdGUoKS5waXBlKFxyXG4gICAgICB0YXAoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZU5hdlBhZ2VzKCk7XHJcbiAgICAgICAgdGhpcy5kcmF3KCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgICB0aGlzLmNhcm91c2VsU2VydmljZS5zZW5kQ2hhbmdlcygpO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBuYXZNZXJnZSQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IG1lcmdlKGluaXRpYWxpemVkQ2Fyb3VzZWwkLCBjaGFuZ2VkU2V0dGluZ3MkLCByZWZyZXNoZWRDYXJvdXNlbCQpO1xyXG4gICAgdGhpcy5uYXZTdWJzY3JpcHRpb24gPSBuYXZNZXJnZSQuc3Vic2NyaWJlKFxyXG4gICAgICAoKSA9PiB7fVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEluaXRpYWxpemVzIHRoZSBsYXlvdXQgb2YgdGhlIHBsdWdpbiBhbmQgZXh0ZW5kcyB0aGUgY2Fyb3VzZWwuXHJcblx0ICovXHJcblx0aW5pdGlhbGl6ZSgpIHtcclxuICAgIHRoaXMuX25hdkRhdGEuZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5fbmF2RGF0YS5wcmV2Lmh0bWxUZXh0ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MubmF2VGV4dFswXTtcclxuICAgIHRoaXMuX25hdkRhdGEubmV4dC5odG1sVGV4dCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLm5hdlRleHRbMV07XHJcblxyXG4gICAgdGhpcy5fZG90c0RhdGEuZGlzYWJsZWQgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm5hdkRhdGEgPSB0aGlzLl9uYXZEYXRhO1xyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UuZG90c0RhdGEgPSB0aGlzLl9kb3RzRGF0YTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbGN1bGF0ZXMgaW50ZXJuYWwgc3RhdGVzIGFuZCB1cGRhdGVzIHByb3AgX3BhZ2VzXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfdXBkYXRlTmF2UGFnZXMoKSB7XHJcblx0XHRsZXQgaTogbnVtYmVyLCBqOiBudW1iZXIsIGs6IG51bWJlcjtcclxuXHRcdGNvbnN0IGxvd2VyOiBudW1iZXIgPSB0aGlzLmNhcm91c2VsU2VydmljZS5jbG9uZXMoKS5sZW5ndGggLyAyLFxyXG4gICAgICB1cHBlcjogbnVtYmVyID0gbG93ZXIgKyB0aGlzLmNhcm91c2VsU2VydmljZS5pdGVtcygpLmxlbmd0aCxcclxuICAgICAgbWF4aW11bTogbnVtYmVyID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UubWF4aW11bSh0cnVlKSxcclxuICAgICAgcGFnZXM6IGFueVtdID0gW10sXHJcbiAgICAgIHNldHRpbmdzOiBPd2xPcHRpb25zID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3M7XHJcbiAgICAgbGV0IHNpemUgPSBzZXR0aW5ncy5jZW50ZXIgfHwgc2V0dGluZ3MuYXV0b1dpZHRoIHx8IHNldHRpbmdzLmRvdHNEYXRhXHJcbiAgICAgICAgPyAxIDogc2V0dGluZ3MuZG90c0VhY2ggfHwgc2V0dGluZ3MuaXRlbXM7XHJcbiAgICAgIHNpemUgPSArc2l6ZTtcclxuXHRcdGlmIChzZXR0aW5ncy5zbGlkZUJ5ICE9PSAncGFnZScpIHtcclxuXHRcdFx0c2V0dGluZ3Muc2xpZGVCeSA9IE1hdGgubWluKCtzZXR0aW5ncy5zbGlkZUJ5LCBzZXR0aW5ncy5pdGVtcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHNldHRpbmdzLmRvdHMgfHwgc2V0dGluZ3Muc2xpZGVCeSA9PT0gJ3BhZ2UnKSB7XHJcblxyXG5cdFx0XHRmb3IgKGkgPSBsb3dlciwgaiA9IDAsIGsgPSAwOyBpIDwgdXBwZXI7IGkrKykge1xyXG5cdFx0XHRcdGlmIChqID49IHNpemUgfHwgaiA9PT0gMCkge1xyXG5cdFx0XHRcdFx0cGFnZXMucHVzaCh7XHJcblx0XHRcdFx0XHRcdHN0YXJ0OiBNYXRoLm1pbihtYXhpbXVtLCBpIC0gbG93ZXIpLFxyXG5cdFx0XHRcdFx0XHRlbmQ6IGkgLSBsb3dlciArIHNpemUgLSAxXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdGlmIChNYXRoLm1pbihtYXhpbXVtLCBpIC0gbG93ZXIpID09PSBtYXhpbXVtKSB7XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0aiA9IDAsICsraztcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aiArPSB0aGlzLmNhcm91c2VsU2VydmljZS5tZXJnZXJzKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnJlbGF0aXZlKGkpKSBhcyBudW1iZXI7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHRoaXMuX3BhZ2VzID0gcGFnZXM7XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBEcmF3cyB0aGUgdXNlciBpbnRlcmZhY2UuXHJcblx0ICogQHRvZG8gVGhlIG9wdGlvbiBgZG90c0RhdGFgIHdvbnQgd29yay5cclxuXHQgKi9cclxuICBkcmF3KCkge1xyXG5cdFx0bGV0IGRpZmZlcmVuY2U6IG51bWJlcjtcclxuICAgIGNvbnN0XHRzZXR0aW5nczogT3dsT3B0aW9ucyA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLFxyXG4gICAgICBpdGVtczogQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZVtdID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuaXRlbXMoKSxcclxuICAgICAgZGlzYWJsZWQgPSBpdGVtcy5sZW5ndGggPD0gc2V0dGluZ3MuaXRlbXM7XHJcblxyXG5cdFx0dGhpcy5fbmF2RGF0YS5kaXNhYmxlZCA9ICFzZXR0aW5ncy5uYXYgfHwgZGlzYWJsZWQ7XHJcblx0XHR0aGlzLl9kb3RzRGF0YS5kaXNhYmxlZCA9ICFzZXR0aW5ncy5kb3RzIHx8IGRpc2FibGVkO1xyXG5cclxuXHRcdGlmIChzZXR0aW5ncy5kb3RzKSB7XHJcblx0XHRcdGRpZmZlcmVuY2UgPSB0aGlzLl9wYWdlcy5sZW5ndGggLSB0aGlzLl9kb3RzRGF0YS5kb3RzLmxlbmd0aDtcclxuXHJcblx0XHRcdGlmIChzZXR0aW5ncy5kb3RzRGF0YSAmJiBkaWZmZXJlbmNlICE9PSAwKSB7XHJcbiAgICAgICAgdGhpcy5fZG90c0RhdGEuZG90cyA9IFtdO1xyXG4gICAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICB0aGlzLl9kb3RzRGF0YS5kb3RzLnB1c2goe1xyXG4gICAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxyXG4gICAgICAgICAgICBpZDogYGRvdC0ke2l0ZW0uaWR9YCxcclxuICAgICAgICAgICAgaW5uZXJDb250ZW50OiBpdGVtLmRvdENvbnRlbnQsXHJcbiAgICAgICAgICAgIHNob3dJbm5lckNvbnRlbnQ6IHRydWVcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cdFx0XHR9IGVsc2UgaWYgKGRpZmZlcmVuY2UgPiAwKSB7XHJcbiAgICAgICAgY29uc3Qgc3RhcnRJOiBudW1iZXIgPSB0aGlzLl9kb3RzRGF0YS5kb3RzLmxlbmd0aCA+IDAgPyB0aGlzLl9kb3RzRGF0YS5kb3RzLmxlbmd0aCA6IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaWZmZXJlbmNlOyBpKyspIHtcclxuICAgICAgICAgIHRoaXMuX2RvdHNEYXRhLmRvdHMucHVzaCh7XHJcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGlkOiBgZG90LSR7aSArIHN0YXJ0SX1gLFxyXG4gICAgICAgICAgICBzaG93SW5uZXJDb250ZW50OiBmYWxzZVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cdFx0XHR9IGVsc2UgaWYgKGRpZmZlcmVuY2UgPCAwKSB7XHJcbiAgICAgICAgdGhpcy5fZG90c0RhdGEuZG90cy5zcGxpY2UoZGlmZmVyZW5jZSwgTWF0aC5hYnMoZGlmZmVyZW5jZSkpXHJcblx0XHRcdH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5uYXZEYXRhID0gdGhpcy5fbmF2RGF0YTtcclxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmRvdHNEYXRhID0gdGhpcy5fZG90c0RhdGE7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlcyBuYXZpZ2F0aW9uIGJ1dHRvbnMncyBhbmQgZG90cydzIHN0YXRlc1xyXG4gICAqL1xyXG4gIHVwZGF0ZSgpIHtcclxuICAgIHRoaXMuX3VwZGF0ZU5hdkJ1dHRvbnMoKTtcclxuICAgIHRoaXMuX3VwZGF0ZURvdHMoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoYW5nZXMgc3RhdGUgb2YgbmF2IGJ1dHRvbnMgKGRpc2FibGVkLCBlbmFibGVkKVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3VwZGF0ZU5hdkJ1dHRvbnMoKSB7XHJcbiAgICBjb25zdFx0c2V0dGluZ3M6IE93bE9wdGlvbnMgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncyxcclxuICAgICAgbG9vcDogYm9vbGVhbiA9IHNldHRpbmdzLmxvb3AgfHwgc2V0dGluZ3MucmV3aW5kLFxyXG4gICAgICBpbmRleDogbnVtYmVyID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UucmVsYXRpdmUodGhpcy5jYXJvdXNlbFNlcnZpY2UuY3VycmVudCgpKTtcclxuXHJcbiAgICBpZiAoc2V0dGluZ3MubmF2KSB7XHJcbiAgICAgIHRoaXMuX25hdkRhdGEucHJldi5kaXNhYmxlZCA9ICFsb29wICYmIGluZGV4IDw9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm1pbmltdW0odHJ1ZSk7XHJcblx0XHRcdHRoaXMuX25hdkRhdGEubmV4dC5kaXNhYmxlZCA9ICFsb29wICYmIGluZGV4ID49IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm1heGltdW0odHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UubmF2RGF0YSA9IHRoaXMuX25hdkRhdGE7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGFuZ2VzIGFjdGl2ZSBkb3QgaWYgcGFnZSBiZWNvbWVzIGNoYW5nZWRcclxuICAgKi9cclxuICBwcml2YXRlIF91cGRhdGVEb3RzKCkge1xyXG4gICAgbGV0IGN1ckFjdGl2ZURvdEk6IG51bWJlcjtcclxuICAgIHRoaXMuX2RvdHNEYXRhLmRvdHMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgaWYgKGl0ZW0uYWN0aXZlID09PSB0cnVlKSB7XHJcbiAgICAgICAgaXRlbS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICBjdXJBY3RpdmVEb3RJID0gdGhpcy5fY3VycmVudCgpO1xyXG4gICAgaWYgKHRoaXMuX2RvdHNEYXRhLmRvdHMubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMuX2RvdHNEYXRhLmRvdHNbY3VyQWN0aXZlRG90SV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmRvdHNEYXRhID0gdGhpcy5fZG90c0RhdGE7XHJcbiAgfVxyXG5cclxuICAvKipcclxuXHQgKiBHZXRzIHRoZSBjdXJyZW50IHBhZ2UgcG9zaXRpb24gb2YgdGhlIGNhcm91c2VsLlxyXG5cdCAqIEByZXR1cm5zIHRoZSBjdXJyZW50IHBhZ2UgcG9zaXRpb24gb2YgdGhlIGNhcm91c2VsXHJcblx0ICovXHJcblx0cHJpdmF0ZSBfY3VycmVudCgpOiBhbnkge1xyXG4gICAgY29uc3QgY3VycmVudDogbnVtYmVyID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UucmVsYXRpdmUodGhpcy5jYXJvdXNlbFNlcnZpY2UuY3VycmVudCgpKTtcclxuICAgIGxldCBmaW5hbEN1cnJlbnQ6IG51bWJlcjtcclxuICAgIGNvbnN0IHBhZ2VzOiBhbnkgPSB0aGlzLl9wYWdlcy5maWx0ZXIoKHBhZ2UsIGluZGV4KSA9PiB7XHJcbiAgICAgIHJldHVybiBwYWdlLnN0YXJ0IDw9IGN1cnJlbnQgJiYgcGFnZS5lbmQgPj0gY3VycmVudDtcclxuICAgIH0pLnBvcCgpO1xyXG5cclxuICAgIGZpbmFsQ3VycmVudCA9IHRoaXMuX3BhZ2VzLmZpbmRJbmRleChwYWdlID0+IHtcclxuICAgICAgcmV0dXJuIHBhZ2Uuc3RhcnQgPT09IHBhZ2VzLnN0YXJ0ICYmIHBhZ2UuZW5kID09PSBwYWdlcy5lbmQ7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gZmluYWxDdXJyZW50O1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG5cdCAqIEdldHMgdGhlIGN1cnJlbnQgc3VjY2Vzb3IvcHJlZGVjZXNzb3IgcG9zaXRpb24uXHJcbiAgICogQHBhcmFtIHN1c3Nlc3NvciBwb3NpdGlvbiBvZiBzbGlkZVxyXG5cdCAqIEByZXR1cm5zIHRoZSBjdXJyZW50IHN1Y2Nlc29yL3ByZWRlY2Vzc29yIHBvc2l0aW9uXHJcblx0ICovXHJcblx0cHJpdmF0ZSBfZ2V0UG9zaXRpb24oc3VjY2Vzc29yOiBudW1iZXIgfCBib29sZWFuKTogbnVtYmVyIHtcclxuXHRcdGxldCBwb3NpdGlvbjogbnVtYmVyLCBsZW5ndGg6IG51bWJlcjtcclxuXHRcdGNvbnN0XHRzZXR0aW5nczogT3dsT3B0aW9ucyA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzO1xyXG5cclxuXHRcdGlmIChzZXR0aW5ncy5zbGlkZUJ5ID09PSAncGFnZScpIHtcclxuXHRcdFx0cG9zaXRpb24gPSB0aGlzLl9jdXJyZW50KCk7XHJcblx0XHRcdGxlbmd0aCA9IHRoaXMuX3BhZ2VzLmxlbmd0aDtcclxuXHRcdFx0c3VjY2Vzc29yID8gKytwb3NpdGlvbiA6IC0tcG9zaXRpb247XHJcblx0XHRcdHBvc2l0aW9uID0gdGhpcy5fcGFnZXNbKChwb3NpdGlvbiAlIGxlbmd0aCkgKyBsZW5ndGgpICUgbGVuZ3RoXS5zdGFydDtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHBvc2l0aW9uID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UucmVsYXRpdmUodGhpcy5jYXJvdXNlbFNlcnZpY2UuY3VycmVudCgpKTtcclxuXHRcdFx0bGVuZ3RoID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuaXRlbXMoKS5sZW5ndGg7XHJcblx0XHRcdHN1Y2Nlc3NvciA/IHBvc2l0aW9uICs9ICtzZXR0aW5ncy5zbGlkZUJ5IDogcG9zaXRpb24gLT0gK3NldHRpbmdzLnNsaWRlQnk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHBvc2l0aW9uO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG5cdCAqIFNsaWRlcyB0byB0aGUgbmV4dCBpdGVtIG9yIHBhZ2UuXHJcblx0ICogQHBhcmFtIHNwZWVkIFRoZSB0aW1lIGluIG1pbGxpc2Vjb25kcyBmb3IgdGhlIHRyYW5zaXRpb24uXHJcblx0ICovXHJcblx0bmV4dChzcGVlZDogbnVtYmVyIHwgYm9vbGVhbikge1xyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UudG8odGhpcy5fZ2V0UG9zaXRpb24odHJ1ZSksIHNwZWVkKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBTbGlkZXMgdG8gdGhlIHByZXZpb3VzIGl0ZW0gb3IgcGFnZS5cclxuXHQgKiBAcGFyYW0gc3BlZWQgVGhlIHRpbWUgaW4gbWlsbGlzZWNvbmRzIGZvciB0aGUgdHJhbnNpdGlvbi5cclxuXHQgKi9cclxuXHRwcmV2KHNwZWVkOiBudW1iZXIgfCBib29sZWFuKSB7XHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS50byh0aGlzLl9nZXRQb3NpdGlvbihmYWxzZSksIHNwZWVkKTtcclxuICB9O1xyXG5cclxuIFx0LyoqXHJcblx0ICogU2xpZGVzIHRvIHRoZSBzcGVjaWZpZWQgaXRlbSBvciBwYWdlLlxyXG5cdCAqIEBwYXJhbSBwb3NpdGlvbiAtIFRoZSBwb3NpdGlvbiBvZiB0aGUgaXRlbSBvciBwYWdlLlxyXG5cdCAqIEBwYXJhbSBzcGVlZCAtIFRoZSB0aW1lIGluIG1pbGxpc2Vjb25kcyBmb3IgdGhlIHRyYW5zaXRpb24uXHJcblx0ICogQHBhcmFtIHN0YW5kYXJkIC0gV2hldGhlciB0byB1c2UgdGhlIHN0YW5kYXJkIGJlaGF2aW91ciBvciBub3QuIERlZmF1bHQgbWVhbmluZyBmYWxzZVxyXG5cdCAqL1xyXG5cdHRvKHBvc2l0aW9uOiBudW1iZXIsIHNwZWVkOiBudW1iZXIgfCBib29sZWFuLCBzdGFuZGFyZD86IGJvb2xlYW4pIHtcclxuXHRcdGxldCBsZW5ndGg6IG51bWJlcjtcclxuXHRcdGlmICghc3RhbmRhcmQgJiYgdGhpcy5fcGFnZXMubGVuZ3RoKSB7XHJcbiAgICAgIGxlbmd0aCA9IHRoaXMuX3BhZ2VzLmxlbmd0aDtcclxuICAgICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UudG8odGhpcy5fcGFnZXNbKChwb3NpdGlvbiAlIGxlbmd0aCkgKyBsZW5ndGgpICUgbGVuZ3RoXS5zdGFydCwgc3BlZWQpO1xyXG5cdFx0fSBlbHNlIHtcclxuICAgICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UudG8ocG9zaXRpb24sIHNwZWVkKTtcclxuXHRcdH1cclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBNb3ZlcyBjYXJvdXNlbCBhZnRlciB1c2VyJ3MgY2xpY2tpbmcgb24gYW55IGRvdHNcclxuICAgKi9cclxuICBtb3ZlQnlEb3QoZG90SWQ6IHN0cmluZykge1xyXG4gICAgY29uc3QgaW5kZXg6IG51bWJlciA9IHRoaXMuX2RvdHNEYXRhLmRvdHMuZmluZEluZGV4KGRvdCA9PiBkb3RJZCA9PT0gZG90LmlkKTtcclxuICAgIHRoaXMudG8oaW5kZXgsIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmRvdHNTcGVlZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiByZXdpbmRzIGNhcm91c2VsIHRvIHNsaWRlIHdpdGggbmVlZGVkIGlkXHJcbiAgICogQHBhcmFtIGlkIGlkIG9mIHNsaWRlXHJcbiAgICovXHJcbiAgdG9TbGlkZUJ5SWQoaWQ6IHN0cmluZykge1xyXG4gICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLmNhcm91c2VsU2VydmljZS5zbGlkZXNEYXRhLmZpbmRJbmRleChzbGlkZSA9PiBzbGlkZS5pZCA9PT0gaWQgJiYgc2xpZGUuaXNDbG9uZWQgPT09IGZhbHNlKTtcclxuXHJcbiAgICBpZiAocG9zaXRpb24gPT09IC0xIHx8IHBvc2l0aW9uID09PSB0aGlzLmNhcm91c2VsU2VydmljZS5jdXJyZW50KCkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuXHRcdHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnRvKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnJlbGF0aXZlKHBvc2l0aW9uKSwgZmFsc2UpO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiLy8gaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG4vLyBmdW5jdGlvbiBfd2luZG93KCk6IGFueSB7XHJcbi8vICAgIC8vIHJldHVybiB0aGUgZ2xvYmFsIG5hdGl2ZSBicm93c2VyIHdpbmRvdyBvYmplY3RcclxuLy8gICAgcmV0dXJuIHdpbmRvdztcclxuLy8gfVxyXG4vLyBASW5qZWN0YWJsZSgpXHJcbi8vIGV4cG9ydCBjbGFzcyBXaW5kb3dSZWZTZXJ2aWNlIHtcclxuLy8gICAgZ2V0IG5hdGl2ZVdpbmRvdygpOiBhbnkge1xyXG4vLyAgICAgICByZXR1cm4gX3dpbmRvdygpO1xyXG4vLyAgICB9XHJcbi8vIH1cclxuXHJcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtcclxuICBDbGFzc1Byb3ZpZGVyLFxyXG4gIEZhY3RvcnlQcm92aWRlcixcclxuICBJbmplY3Rpb25Ub2tlbixcclxuICBQTEFURk9STV9JRFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhIG5ldyBpbmplY3Rpb24gdG9rZW4gZm9yIGluamVjdGluZyB0aGUgd2luZG93IGludG8gYSBjb21wb25lbnQuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgV0lORE9XID0gbmV3IEluamVjdGlvblRva2VuKCdXaW5kb3dUb2tlbicpO1xyXG5cclxuLyoqXHJcbiAqIERlZmluZSBhYnN0cmFjdCBjbGFzcyBmb3Igb2J0YWluaW5nIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIHdpbmRvdyBvYmplY3QuXHJcbiAqL1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgV2luZG93UmVmIHtcclxuICBnZXQgbmF0aXZlV2luZG93KCk6IFdpbmRvdyB8IE9iamVjdCB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZC4nKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEZWZpbmUgY2xhc3MgdGhhdCBpbXBsZW1lbnRzIHRoZSBhYnN0cmFjdCBjbGFzcyBhbmQgcmV0dXJucyB0aGUgbmF0aXZlIHdpbmRvdyBvYmplY3QuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQnJvd3NlcldpbmRvd1JlZiBleHRlbmRzIFdpbmRvd1JlZiB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHJldHVybnMgd2luZG93IG9iamVjdFxyXG4gICAqL1xyXG4gIGdldCBuYXRpdmVXaW5kb3coKTogV2luZG93IHwgT2JqZWN0IHtcclxuICAgIHJldHVybiB3aW5kb3c7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGFuIGZhY3RvcnkgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBuYXRpdmUgd2luZG93IG9iamVjdC5cclxuICogQHBhcmFtIGJyb3dzZXJXaW5kb3dSZWYgTmF0aXZlIHdpbmRvdyBvYmplY3RcclxuICogQHBhcmFtIHBsYXRmb3JtSWQgaWQgb2YgcGxhdGZvcm1cclxuICogQHJldHVybnMgdHlwZSBvZiBwbGF0Zm9ybSBvZiBlbXB0eSBvYmplY3RcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB3aW5kb3dGYWN0b3J5KFxyXG4gIGJyb3dzZXJXaW5kb3dSZWY6IEJyb3dzZXJXaW5kb3dSZWYsXHJcbiAgcGxhdGZvcm1JZDogT2JqZWN0XHJcbik6IFdpbmRvdyB8IE9iamVjdCB7XHJcbiAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHBsYXRmb3JtSWQpKSB7XHJcbiAgICByZXR1cm4gYnJvd3NlcldpbmRvd1JlZi5uYXRpdmVXaW5kb3c7XHJcbiAgfVxyXG4gIHJldHVybiBuZXcgT2JqZWN0KCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYSBpbmplY3RhYmxlIHByb3ZpZGVyIGZvciB0aGUgV2luZG93UmVmIHRva2VuIHRoYXQgdXNlcyB0aGUgQnJvd3NlcldpbmRvd1JlZiBjbGFzcy5cclxuICovXHJcbmV4cG9ydCBjb25zdCBicm93c2VyV2luZG93UHJvdmlkZXI6IENsYXNzUHJvdmlkZXIgPSB7XHJcbiAgcHJvdmlkZTogV2luZG93UmVmLFxyXG4gIHVzZUNsYXNzOiBCcm93c2VyV2luZG93UmVmXHJcbn07XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGFuIGluamVjdGFibGUgcHJvdmlkZXIgdGhhdCB1c2VzIHRoZSB3aW5kb3dGYWN0b3J5IGZ1bmN0aW9uIGZvciByZXR1cm5pbmcgdGhlIG5hdGl2ZSB3aW5kb3cgb2JqZWN0LlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHdpbmRvd1Byb3ZpZGVyOiBGYWN0b3J5UHJvdmlkZXIgPSB7XHJcbiAgcHJvdmlkZTogV0lORE9XLFxyXG4gIHVzZUZhY3Rvcnk6IHdpbmRvd0ZhY3RvcnksXHJcbiAgZGVwczogW1dpbmRvd1JlZiwgUExBVEZPUk1fSURdXHJcbn07XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGFuIGFycmF5IG9mIHByb3ZpZGVycy5cclxuICovXHJcbmV4cG9ydCBjb25zdCBXSU5ET1dfUFJPVklERVJTID0gW2Jyb3dzZXJXaW5kb3dQcm92aWRlciwgd2luZG93UHJvdmlkZXJdO1xyXG4iLCJpbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7XHJcbiAgQ2xhc3NQcm92aWRlcixcclxuICBGYWN0b3J5UHJvdmlkZXIsXHJcbiAgSW5qZWN0aW9uVG9rZW4sXHJcbiAgUExBVEZPUk1fSUQsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGEgbmV3IGluamVjdGlvbiB0b2tlbiBmb3IgaW5qZWN0aW5nIHRoZSBEb2N1bWVudCBpbnRvIGEgY29tcG9uZW50LlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IERPQ1VNRU5UID0gbmV3IEluamVjdGlvblRva2VuPERvY3VtZW50PignRG9jdW1lbnRUb2tlbicpO1xyXG4vKipcclxuICogRGVmaW5lIGFic3RyYWN0IGNsYXNzIGZvciBvYnRhaW5pbmcgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgRG9jdW1lbnQgb2JqZWN0LlxyXG4gKi9cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIERvY3VtZW50UmVmIHtcclxuICBnZXQgbmF0aXZlRG9jdW1lbnQoKTogRG9jdW1lbnQgfCBPYmplY3Qge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQuJyk7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogRGVmaW5lIGNsYXNzIHRoYXQgaW1wbGVtZW50cyB0aGUgYWJzdHJhY3QgY2xhc3MgYW5kIHJldHVybnMgdGhlIG5hdGl2ZSBEb2N1bWVudCBvYmplY3QuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQnJvd3NlckRvY3VtZW50UmVmIGV4dGVuZHMgRG9jdW1lbnRSZWYge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEByZXR1cm5zIERvY3VtZW50IG9iamVjdFxyXG4gICAqL1xyXG4gIGdldCBuYXRpdmVEb2N1bWVudCgpOiBEb2N1bWVudCB8IE9iamVjdCB7XHJcbiAgICByZXR1cm4gZG9jdW1lbnQ7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGFuIGZhY3RvcnkgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBuYXRpdmUgRG9jdW1lbnQgb2JqZWN0LlxyXG4gKiBAcGFyYW0gYnJvd3NlckRvY3VtZW50UmVmIE5hdGl2ZSBEb2N1bWVudCBvYmplY3RcclxuICogQHBhcmFtIHBsYXRmb3JtSWQgaWQgb2YgcGxhdGZvcm1cclxuICogQHJldHVybnMgdHlwZSBvZiBwbGF0Zm9ybSBvZiBlbXB0eSBvYmplY3RcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBkb2N1bWVudEZhY3RvcnkoXHJcbiAgYnJvd3NlckRvY3VtZW50UmVmOiBCcm93c2VyRG9jdW1lbnRSZWYsXHJcbiAgcGxhdGZvcm1JZDogT2JqZWN0XHJcbik6IERvY3VtZW50IHwgT2JqZWN0IHtcclxuICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIocGxhdGZvcm1JZCkpIHtcclxuICAgIHJldHVybiBicm93c2VyRG9jdW1lbnRSZWYubmF0aXZlRG9jdW1lbnQ7XHJcbiAgfVxyXG4gIHJldHVybiBuZXcgT2JqZWN0KCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYSBpbmplY3RhYmxlIHByb3ZpZGVyIGZvciB0aGUgRG9jdW1lbnRSZWYgdG9rZW4gdGhhdCB1c2VzIHRoZSBCcm93c2VyRG9jdW1lbnRSZWYgY2xhc3MuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgYnJvd3NlckRvY3VtZW50UHJvdmlkZXI6IENsYXNzUHJvdmlkZXIgPSB7XHJcbiAgcHJvdmlkZTogRG9jdW1lbnRSZWYsXHJcbiAgdXNlQ2xhc3M6IEJyb3dzZXJEb2N1bWVudFJlZlxyXG59O1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhbiBpbmplY3RhYmxlIHByb3ZpZGVyIHRoYXQgdXNlcyB0aGUgRG9jdW1lbnRGYWN0b3J5IGZ1bmN0aW9uIGZvciByZXR1cm5pbmcgdGhlIG5hdGl2ZSBEb2N1bWVudCBvYmplY3QuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZG9jdW1lbnRQcm92aWRlcjogRmFjdG9yeVByb3ZpZGVyID0ge1xyXG4gIHByb3ZpZGU6IERPQ1VNRU5ULFxyXG4gIHVzZUZhY3Rvcnk6IGRvY3VtZW50RmFjdG9yeSxcclxuICBkZXBzOiBbRG9jdW1lbnRSZWYsIFBMQVRGT1JNX0lEXVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhbiBhcnJheSBvZiBwcm92aWRlcnMuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgRE9DVU1FTlRfUFJPVklERVJTID0gW2Jyb3dzZXJEb2N1bWVudFByb3ZpZGVyLCBkb2N1bWVudFByb3ZpZGVyXTtcclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBPYnNlcnZhYmxlLCBtZXJnZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBDYXJvdXNlbFNlcnZpY2UgfSBmcm9tICcuL2Nhcm91c2VsLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IFdJTkRPVyB9IGZyb20gJy4vd2luZG93LXJlZi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICcuL2RvY3VtZW50LXJlZi5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEF1dG9wbGF5U2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveXtcclxuICAvKipcclxuICAgKiBTdWJzY3Jpb3B0aW9uIHRvIG1lcmdlIE9ic2VydmFibGVzIGZyb20gQ2Fyb3VzZWxTZXJ2aWNlXHJcbiAgICovXHJcbiAgYXV0b3BsYXlTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGF1dG9wbGF5IHRpbWVvdXQuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfdGltZW91dDogbnVtYmVyID0gbnVsbDtcclxuXHJcbiAgLyoqXHJcbiAgICogSW5kaWNhdGVzIHdoZW5ldmVyIHRoZSBhdXRvcGxheSBpcyBwYXVzZWQuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfcGF1c2VkID0gZmFsc2U7XHJcblxyXG4gIHByaXZhdGUgd2luUmVmOiBXaW5kb3c7XHJcbiAgcHJpdmF0ZSBkb2NSZWY6IERvY3VtZW50O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhcm91c2VsU2VydmljZTogQ2Fyb3VzZWxTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgIEBJbmplY3QoV0lORE9XKSB3aW5SZWY6IGFueSxcclxuICAgICAgICAgICAgICBASW5qZWN0KERPQ1VNRU5UKSBkb2NSZWY6IGFueSxcclxuICApIHtcclxuICAgIHRoaXMud2luUmVmID0gd2luUmVmIGFzIFdpbmRvdztcclxuICAgIHRoaXMuZG9jUmVmID0gZG9jUmVmIGFzIERvY3VtZW50O1xyXG4gICAgdGhpcy5zcHlEYXRhU3RyZWFtcygpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmF1dG9wbGF5U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZWZpbmVzIE9ic2VydmFibGVzIHdoaWNoIHNlcnZpY2UgbXVzdCBvYnNlcnZlXHJcbiAgICovXHJcbiAgc3B5RGF0YVN0cmVhbXMoKSB7XHJcbiAgICBjb25zdCBpbml0aWFsaXplZENhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0SW5pdGlhbGl6ZWRTdGF0ZSgpLnBpcGUoXHJcbiAgICAgIHRhcCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9wbGF5KSB7XHJcblx0XHRcdFx0XHR0aGlzLnBsYXkoKTtcclxuXHRcdFx0XHR9XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IGNoYW5nZWRTZXR0aW5ncyQ6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldENoYW5nZWRTdGF0ZSgpLnBpcGUoXHJcbiAgICAgIHRhcChkYXRhID0+IHtcclxuICAgICAgICB0aGlzLl9oYW5kbGVDaGFuZ2VPYnNlcnZhYmxlKGRhdGEpO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBvcmlnaW5hbCBBdXRvcGxheSBQbHVnaW4gaGFzIGxpc3RlbmVycyBvbiBwbGF5Lm93bC5jb3JlIGFuZCBzdG9wLm93bC5jb3JlIGV2ZW50cy5cclxuICAgIC8vIFRoZXkgYXJlIHRyaWdnZXJlZCBieSBWaWRlbyBQbHVnaW5cclxuXHJcbiAgICBjb25zdCBhdXRvcGxheU1lcmdlJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gbWVyZ2UoaW5pdGlhbGl6ZWRDYXJvdXNlbCQsIGNoYW5nZWRTZXR0aW5ncyQpO1xyXG4gICAgdGhpcy5hdXRvcGxheVN1YnNjcmlwdGlvbiA9IGF1dG9wbGF5TWVyZ2UkLnN1YnNjcmliZShcclxuICAgICAgKCkgPT4ge31cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuXHQgKiBTdGFydHMgdGhlIGF1dG9wbGF5LlxyXG5cdCAqIEBwYXJhbSB0aW1lb3V0IFRoZSBpbnRlcnZhbCBiZWZvcmUgdGhlIG5leHQgYW5pbWF0aW9uIHN0YXJ0cy5cclxuXHQgKiBAcGFyYW0gc3BlZWQgVGhlIGFuaW1hdGlvbiBzcGVlZCBmb3IgdGhlIGFuaW1hdGlvbnMuXHJcblx0ICovXHJcblx0cGxheSh0aW1lb3V0PzogbnVtYmVyLCBzcGVlZD86IG51bWJlcikge1xyXG4gICAgaWYgKHRoaXMuX3BhdXNlZCkge1xyXG5cdFx0XHR0aGlzLl9wYXVzZWQgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy5fc2V0QXV0b1BsYXlJbnRlcnZhbCgpO1xyXG4gICAgfVxyXG5cclxuXHRcdGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5pcygncm90YXRpbmcnKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5jYXJvdXNlbFNlcnZpY2UuZW50ZXIoJ3JvdGF0aW5nJyk7XHJcblxyXG5cdFx0dGhpcy5fc2V0QXV0b1BsYXlJbnRlcnZhbCgpO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG5cdCAqIEdldHMgYSBuZXcgdGltZW91dFxyXG5cdCAqIEBwYXJhbSB0aW1lb3V0IC0gVGhlIGludGVydmFsIGJlZm9yZSB0aGUgbmV4dCBhbmltYXRpb24gc3RhcnRzLlxyXG5cdCAqIEBwYXJhbSBzcGVlZCAtIFRoZSBhbmltYXRpb24gc3BlZWQgZm9yIHRoZSBhbmltYXRpb25zLlxyXG5cdCAqIEByZXR1cm5cclxuXHQgKi9cclxuXHRwcml2YXRlIF9nZXROZXh0VGltZW91dCh0aW1lb3V0PzogbnVtYmVyLCBzcGVlZD86IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRpZiAoIHRoaXMuX3RpbWVvdXQgKSB7XHJcblx0XHRcdHRoaXMud2luUmVmLmNsZWFyVGltZW91dCh0aGlzLl90aW1lb3V0KTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzLndpblJlZi5zZXRUaW1lb3V0KCgpID0+e1xyXG4gICAgICBpZiAodGhpcy5fcGF1c2VkIHx8IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmlzKCdidXN5JykgfHwgdGhpcy5jYXJvdXNlbFNlcnZpY2UuaXMoJ2ludGVyYWN0aW5nJykgfHwgdGhpcy5kb2NSZWYuaGlkZGVuKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm5leHQoc3BlZWQgfHwgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b3BsYXlTcGVlZCk7XHJcbiAgICB9LCB0aW1lb3V0IHx8IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9wbGF5VGltZW91dCk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcblx0ICogU2V0cyBhdXRvcGxheSBpbiBtb3Rpb24uXHJcblx0ICovXHJcblx0cHJpdmF0ZSBfc2V0QXV0b1BsYXlJbnRlcnZhbCgpIHtcclxuXHRcdHRoaXMuX3RpbWVvdXQgPSB0aGlzLl9nZXROZXh0VGltZW91dCgpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFN0b3BzIHRoZSBhdXRvcGxheS5cclxuXHQgKi9cclxuXHRzdG9wKCkge1xyXG5cdFx0aWYgKCF0aGlzLmNhcm91c2VsU2VydmljZS5pcygncm90YXRpbmcnKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy53aW5SZWYuY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVvdXQpO1xyXG5cdFx0dGhpcy5jYXJvdXNlbFNlcnZpY2UubGVhdmUoJ3JvdGF0aW5nJyk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcblx0ICogU3RvcHMgdGhlIGF1dG9wbGF5LlxyXG5cdCAqL1xyXG5cdHBhdXNlKCkge1xyXG5cdFx0aWYgKCF0aGlzLmNhcm91c2VsU2VydmljZS5pcygncm90YXRpbmcnKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5fcGF1c2VkID0gdHJ1ZTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBNYW5hZ2VzIGJ5IGF1dG9wbGF5aW5nIGFjY29yZGluZyB0byBkYXRhIHBhc3NlZCBieSBfY2hhbmdlZFNldHRpbmdzQ2Fyb3VzZWwkIE9ic2FydmFibGVcclxuICAgKiBAcGFyYW0gZGF0YSBvYmplY3Qgd2l0aCBjdXJyZW50IHBvc2l0aW9uIG9mIGNhcm91c2VsIGFuZCB0eXBlIG9mIGNoYW5nZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2hhbmRsZUNoYW5nZU9ic2VydmFibGUoZGF0YSkge1xyXG4gICAgaWYgKGRhdGEucHJvcGVydHkubmFtZSA9PT0gJ3NldHRpbmdzJykge1xyXG4gICAgICBpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b3BsYXkpIHtcclxuICAgICAgICB0aGlzLnBsYXkoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnN0b3AoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChkYXRhLnByb3BlcnR5Lm5hbWUgPT09ICdwb3NpdGlvbicpIHtcclxuICAgICAgLy9jb25zb2xlLmxvZygncGxheT8nLCBlKTtcclxuICAgICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9wbGF5KSB7XHJcbiAgICAgICAgdGhpcy5fc2V0QXV0b1BsYXlJbnRlcnZhbCgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdGFydHMgcGF1c2luZ1xyXG4gICAqL1xyXG4gIHN0YXJ0UGF1c2luZygpIHtcclxuICAgIGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hdXRvcGxheUhvdmVyUGF1c2UgJiYgdGhpcy5jYXJvdXNlbFNlcnZpY2UuaXMoJ3JvdGF0aW5nJykpIHtcclxuICAgICAgdGhpcy5wYXVzZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnRzIHBsYXlpbmcgYWZ0ZXIgbW91c2UgbGVhdmVzIGNhcm91c2VsXHJcbiAgICovXHJcbiAgc3RhcnRQbGF5aW5nTW91c2VMZWF2ZSgpIHtcclxuICAgIGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hdXRvcGxheUhvdmVyUGF1c2UgJiYgdGhpcy5jYXJvdXNlbFNlcnZpY2UuaXMoJ3JvdGF0aW5nJykpIHtcclxuICAgICAgdGhpcy5wYXVzZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnRzIHBsYXlpbmcgYWZ0ZXIgdG91Y2ggZW5kc1xyXG4gICAqL1xyXG4gIHN0YXJ0UGxheWluZ1RvdWNoRW5kKCkge1xyXG4gICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9wbGF5SG92ZXJQYXVzZSAmJiB0aGlzLmNhcm91c2VsU2VydmljZS5pcygncm90YXRpbmcnKSkge1xyXG4gICAgICB0aGlzLnBhdXNlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIE9ic2VydmFibGUsIG1lcmdlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IENhcm91c2VsU2VydmljZSB9IGZyb20gJy4vY2Fyb3VzZWwuc2VydmljZSc7XHJcbmltcG9ydCB7IHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIExhenlMb2FkU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaW9wdGlvbiB0byBtZXJnZSBPYnNlcnZhYmxlICBmcm9tIENhcm91c2VsU2VydmljZVxyXG4gICAqL1xyXG4gIGxhenlMb2FkU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2Fyb3VzZWxTZXJ2aWNlOiBDYXJvdXNlbFNlcnZpY2UpIHtcclxuICAgIHRoaXMuc3B5RGF0YVN0cmVhbXMoKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5sYXp5TG9hZFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVmaW5lcyBPYnNlcnZhYmxlcyB3aGljaCBzZXJ2aWNlIG11c3Qgb2JzZXJ2ZVxyXG4gICAqL1xyXG4gIHNweURhdGFTdHJlYW1zKCkge1xyXG4gICAgY29uc3QgaW5pdGlhbGl6ZWRDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldEluaXRpYWxpemVkU3RhdGUoKS5waXBlKFxyXG4gICAgICB0YXAoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGlzTGF6eUxvYWQgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncyAmJiAhdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MubGF6eUxvYWQ7XHJcbiAgICAgICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2xpZGVzRGF0YS5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5sb2FkID0gaXNMYXp5TG9hZCA/IHRydWUgOiBmYWxzZSk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IGNoYW5nZVNldHRpbmdzJDogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0Q2hhbmdlU3RhdGUoKTtcclxuXHJcbiAgICBjb25zdCByZXNpemVkQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRSZXNpemVkU3RhdGUoKTtcclxuXHJcblxyXG4gICAgY29uc3QgbGF6eUxvYWRNZXJnZSQ6IE9ic2VydmFibGU8c3RyaW5nIHwgYW55PiA9IG1lcmdlKGluaXRpYWxpemVkQ2Fyb3VzZWwkLCBjaGFuZ2VTZXR0aW5ncyQsIHJlc2l6ZWRDYXJvdXNlbCQpLnBpcGUoXHJcbiAgICAgIHRhcChkYXRhID0+IHRoaXMuX2RlZmluZUxhenlMb2FkU2xpZGVzKGRhdGEpKSxcclxuICAgICAgLy8gdGFwKCgpID0+IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNlbmRDaGFuZ2VzKCkpXHJcbiAgICApO1xyXG4gICAgdGhpcy5sYXp5TG9hZFN1YnNjcmlwdGlvbiA9IGxhenlMb2FkTWVyZ2UkLnN1YnNjcmliZShcclxuICAgICAgKCkgPT4ge31cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9kZWZpbmVMYXp5TG9hZFNsaWRlcyhkYXRhOiBhbnkpIHtcclxuICAgIGlmICghdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MgfHwgIXRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmxhenlMb2FkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoKGRhdGEucHJvcGVydHkgJiYgZGF0YS5wcm9wZXJ0eS5uYW1lID09PSAncG9zaXRpb24nKSB8fCBkYXRhID09PSAnaW5pdGlhbGl6ZWQnIHx8IGRhdGEgPT09IFwicmVzaXplZFwiKSB7XHJcbiAgICAgIGNvbnN0IHNldHRpbmdzID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MsXHJcbiAgICAgICAgICAgIGNsb25lcyA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmNsb25lcygpLmxlbmd0aDtcclxuICAgICAgbGV0IG4gPSAoc2V0dGluZ3MuY2VudGVyICYmIE1hdGguY2VpbChzZXR0aW5ncy5pdGVtcyAvIDIpIHx8IHNldHRpbmdzLml0ZW1zKSxcclxuICAgICAgICAgIGkgPSAoKHNldHRpbmdzLmNlbnRlciAmJiBuICogLTEpIHx8IDApLFxyXG4gICAgICAgICAgcG9zaXRpb24gPSAoZGF0YS5wcm9wZXJ0eSAmJiBkYXRhLnByb3BlcnR5LnZhbHVlICE9PSB1bmRlZmluZWQgPyBkYXRhLnByb3BlcnR5LnZhbHVlIDogdGhpcy5jYXJvdXNlbFNlcnZpY2UuY3VycmVudCgpKSArIGk7XHJcbiAgICAgICAgLy8gbG9hZCA9ICQucHJveHkoZnVuY3Rpb24oaSwgdikgeyB0aGlzLmxvYWQodikgfSwgdGhpcyk7XHJcbiAgICAgIC8vVE9ETzogTmVlZCBkb2N1bWVudGF0aW9uIGZvciB0aGlzIG5ldyBvcHRpb25cclxuICAgICAgaWYgKHNldHRpbmdzLmxhenlMb2FkRWFnZXIgPiAwKSB7XHJcbiAgICAgICAgbiArPSBzZXR0aW5ncy5sYXp5TG9hZEVhZ2VyO1xyXG4gICAgICAgIC8vIElmIHRoZSBjYXJvdXNlbCBpcyBsb29waW5nIGFsc28gcHJlbG9hZCBpbWFnZXMgdGhhdCBhcmUgdG8gdGhlIFwibGVmdFwiXHJcbiAgICAgICAgaWYgKHNldHRpbmdzLmxvb3ApIHtcclxuICAgICAgICAgIHBvc2l0aW9uIC09IHNldHRpbmdzLmxhenlMb2FkRWFnZXI7XHJcbiAgICAgICAgICBuKys7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICB3aGlsZSAoaSsrIDwgbikge1xyXG4gICAgICAgIHRoaXMuX2xvYWQoY2xvbmVzIC8gMiArIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnJlbGF0aXZlKHBvc2l0aW9uKSk7XHJcbiAgICAgICAgaWYgKGNsb25lcykge1xyXG4gICAgICAgICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UuY2xvbmVzKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnJlbGF0aXZlKHBvc2l0aW9uKSkuZm9yRWFjaCh2YWx1ZSA9PiB0aGlzLl9sb2FkKHZhbHVlKSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBwb3NpdGlvbisrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuXHQgKiBMb2FkcyBhbGwgcmVzb3VyY2VzIG9mIGFuIGl0ZW0gYXQgdGhlIHNwZWNpZmllZCBwb3NpdGlvbi5cclxuXHQgKiBAcGFyYW0gcG9zaXRpb24gLSBUaGUgYWJzb2x1dGUgcG9zaXRpb24gb2YgdGhlIGl0ZW0uXHJcblx0ICovXHJcbiAgcHJpdmF0ZSBfbG9hZChwb3NpdGlvbjogbnVtYmVyKSB7XHJcbiAgICBpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2xpZGVzRGF0YVtwb3NpdGlvbl0ubG9hZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2xpZGVzRGF0YVtwb3NpdGlvbl0ubG9hZCA9IHRydWU7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIE9ic2VydmFibGUsIG1lcmdlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IENhcm91c2VsU2VydmljZSB9IGZyb20gJy4vY2Fyb3VzZWwuc2VydmljZSc7XHJcbmltcG9ydCB7IHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEFuaW1hdGVTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95e1xyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlvcHRpb24gdG8gbWVyZ2UgT2JzZXJ2YWJsZSAgZnJvbSBDYXJvdXNlbFNlcnZpY2VcclxuICAgKi9cclxuICBhbmltYXRlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIHNcclxuICAgKi9cclxuICBzd2FwcGluZyA9IHRydWU7XHJcblxyXG4gIC8qKlxyXG4gICAqIGFjdGl2ZSBzbGlkZSBiZWZvcmUgdHJhbnNsYXRpbmdcclxuICAgKi9cclxuICBwcmV2aW91cyA9IHVuZGVmaW5lZDtcclxuXHJcbiAgLyoqXHJcbiAgICogbmV3IGFjdGl2ZSBzbGlkZSBhZnRlciB0cmFuc2xhdGluZ1xyXG4gICAqL1xyXG4gIG5leHQgPSB1bmRlZmluZWQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2Fyb3VzZWxTZXJ2aWNlOiBDYXJvdXNlbFNlcnZpY2UpIHtcclxuICAgIHRoaXMuc3B5RGF0YVN0cmVhbXMoKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5hbmltYXRlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZWZpbmVzIE9ic2VydmFibGVzIHdoaWNoIHNlcnZpY2UgbXVzdCBvYnNlcnZlXHJcbiAgICovXHJcbiAgc3B5RGF0YVN0cmVhbXMoKSB7XHJcbiAgICBjb25zdCBjaGFuZ2VTZXR0aW5ncyQ6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldENoYW5nZVN0YXRlKCkucGlwZShcclxuICAgICAgdGFwKGRhdGEgPT4ge1xyXG4gICAgICAgIGlmIChkYXRhLnByb3BlcnR5Lm5hbWUgPT09ICdwb3NpdGlvbicpIHtcclxuXHRcdFx0XHRcdHRoaXMucHJldmlvdXMgPSB0aGlzLmNhcm91c2VsU2VydmljZS5jdXJyZW50KCk7XHJcblx0XHRcdFx0XHR0aGlzLm5leHQgPSBkYXRhLnByb3BlcnR5LnZhbHVlO1xyXG5cdFx0XHRcdH1cclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgZHJhZ0Nhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0RHJhZ1N0YXRlKCk7XHJcbiAgICBjb25zdCBkcmFnZ2VkQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXREcmFnZ2VkU3RhdGUoKTtcclxuICAgIGNvbnN0IHRyYW5zbGF0ZWRDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldFRyYW5zbGF0ZWRTdGF0ZSgpO1xyXG5cclxuICAgIGNvbnN0IGRyYWdUcmFuc2xhdGVkTWVyZ2UkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSBtZXJnZShkcmFnQ2Fyb3VzZWwkLCBkcmFnZ2VkQ2Fyb3VzZWwkLCB0cmFuc2xhdGVkQ2Fyb3VzZWwkKS5waXBlKFxyXG4gICAgICB0YXAoZGF0YSA9PiB0aGlzLnN3YXBwaW5nID0gZGF0YSA9PT0gJ3RyYW5zbGF0ZWQnKVxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCB0cmFuc2xhdGVDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldFRyYW5zbGF0ZVN0YXRlKCkucGlwZShcclxuICAgICAgdGFwKGRhdGEgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLnN3YXBwaW5nICYmICh0aGlzLmNhcm91c2VsU2VydmljZS5fb3B0aW9ucy5hbmltYXRlT3V0IHx8IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLl9vcHRpb25zLmFuaW1hdGVJbikpIHtcclxuICAgICAgICAgIHRoaXMuX3N3YXAoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IGFuaW1hdGVNZXJnZSQ6IE9ic2VydmFibGU8c3RyaW5nIHwgYW55PiA9IG1lcmdlKGNoYW5nZVNldHRpbmdzJCwgdHJhbnNsYXRlQ2Fyb3VzZWwkLCBkcmFnVHJhbnNsYXRlZE1lcmdlJCkucGlwZSgpO1xyXG4gICAgdGhpcy5hbmltYXRlU3Vic2NyaXB0aW9uID0gYW5pbWF0ZU1lcmdlJC5zdWJzY3JpYmUoXHJcbiAgICAgICgpID0+IHt9XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcblx0ICogVG9nZ2xlcyB0aGUgYW5pbWF0aW9uIGNsYXNzZXMgd2hlbmV2ZXIgYW4gdHJhbnNsYXRpb25zIHN0YXJ0cy5cclxuXHQgKiBAcmV0dXJuc1xyXG5cdCAqL1xyXG5cdHByaXZhdGUgX3N3YXAoKTogYm9vbGVhbiB7XHJcblxyXG5cdFx0aWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLml0ZW1zICE9PSAxKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBpZiAoISQuc3VwcG9ydC5hbmltYXRpb24gfHwgISQuc3VwcG9ydC50cmFuc2l0aW9uKSB7XHJcblx0XHQvLyBcdHJldHVybjtcclxuXHRcdC8vIH1cclxuXHJcblx0XHR0aGlzLmNhcm91c2VsU2VydmljZS5zcGVlZCgwKTtcclxuXHJcblx0XHRsZXQgbGVmdDtcclxuXHRcdGNvbnN0XHRwcmV2aW91cyA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNsaWRlc0RhdGFbdGhpcy5wcmV2aW91c10sXHJcblx0XHRcdG5leHQgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zbGlkZXNEYXRhW3RoaXMubmV4dF0sXHJcblx0XHRcdGluY29taW5nID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYW5pbWF0ZUluLFxyXG5cdFx0XHRvdXRnb2luZyA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmFuaW1hdGVPdXQ7XHJcblxyXG5cdFx0aWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmN1cnJlbnQoKSA9PT0gdGhpcy5wcmV2aW91cykge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKG91dGdvaW5nKSB7XHJcblx0XHRcdGxlZnQgPSArdGhpcy5jYXJvdXNlbFNlcnZpY2UuY29vcmRpbmF0ZXModGhpcy5wcmV2aW91cykgLSArdGhpcy5jYXJvdXNlbFNlcnZpY2UuY29vcmRpbmF0ZXModGhpcy5uZXh0KTtcclxuICAgICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2xpZGVzRGF0YS5mb3JFYWNoKHNsaWRlID0+IHtcclxuICAgICAgICBpZiAoc2xpZGUuaWQgPT09IHByZXZpb3VzLmlkKSB7XHJcbiAgICAgICAgICBzbGlkZS5sZWZ0ID0gYCR7bGVmdH1weGA7XHJcbiAgICAgICAgICBzbGlkZS5pc0FuaW1hdGVkID0gdHJ1ZTtcclxuICAgICAgICAgIHNsaWRlLmlzRGVmQW5pbWF0ZWRPdXQgPSB0cnVlO1xyXG4gICAgICAgICAgc2xpZGUuaXNDdXN0b21BbmltYXRlZE91dCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoaW5jb21pbmcpIHtcclxuICAgICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2xpZGVzRGF0YS5mb3JFYWNoKHNsaWRlID0+IHtcclxuICAgICAgICBpZiAoc2xpZGUuaWQgPT09IG5leHQuaWQpIHtcclxuICAgICAgICAgIHNsaWRlLmlzQW5pbWF0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgc2xpZGUuaXNEZWZBbmltYXRlZEluID0gdHJ1ZTtcclxuICAgICAgICAgIHNsaWRlLmlzQ3VzdG9tQW5pbWF0ZWRJbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGVzIHRoZSBlbmQgb2YgJ2FuaW1hdGlvbmVuZCcgZXZlbnRcclxuICAgKiBAcGFyYW0gaWQgSWQgb2Ygc2xpZGVzXHJcbiAgICovXHJcbiAgY2xlYXIoaWQpIHtcclxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNsaWRlc0RhdGEuZm9yRWFjaChzbGlkZSA9PiB7XHJcbiAgICAgIGlmIChzbGlkZS5pZCA9PT0gaWQpIHtcclxuICAgICAgICBzbGlkZS5sZWZ0ID0gJyc7XHJcbiAgICAgICAgc2xpZGUuaXNBbmltYXRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHNsaWRlLmlzRGVmQW5pbWF0ZWRPdXQgPSBmYWxzZTtcclxuICAgICAgICBzbGlkZS5pc0N1c3RvbUFuaW1hdGVkT3V0ID0gZmFsc2U7XHJcbiAgICAgICAgc2xpZGUuaXNEZWZBbmltYXRlZEluID0gZmFsc2U7XHJcbiAgICAgICAgc2xpZGUuaXNDdXN0b21BbmltYXRlZEluID0gZmFsc2U7XHJcbiAgICAgICAgc2xpZGUuY2xhc3NlcyA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldEN1clNsaWRlQ2xhc3NlcyhzbGlkZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uub25UcmFuc2l0aW9uRW5kKCk7XHJcblx0fTtcclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBPYnNlcnZhYmxlLCBtZXJnZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBDYXJvdXNlbFNlcnZpY2UgfSBmcm9tICcuL2Nhcm91c2VsLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBBdXRvSGVpZ2h0U2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveXtcclxuICAvKipcclxuICAgKiBTdWJzY3Jpb3B0aW9uIHRvIG1lcmdlIE9ic2VydmFibGUgIGZyb20gQ2Fyb3VzZWxTZXJ2aWNlXHJcbiAgICovXHJcbiAgYXV0b0hlaWdodFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2Fyb3VzZWxTZXJ2aWNlOiBDYXJvdXNlbFNlcnZpY2UpIHtcclxuICAgIHRoaXMuc3B5RGF0YVN0cmVhbXMoKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5hdXRvSGVpZ2h0U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIERlZmluZXMgT2JzZXJ2YWJsZXMgd2hpY2ggc2VydmljZSBtdXN0IG9ic2VydmVcclxuICAgKi9cclxuICBzcHlEYXRhU3RyZWFtcygpIHtcclxuICAgIGNvbnN0IGluaXRpYWxpemVkQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRJbml0aWFsaXplZFN0YXRlKCkucGlwZShcclxuICAgICAgdGFwKGRhdGEgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hdXRvSGVpZ2h0KSB7XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmNhcm91c2VsU2VydmljZS5zbGlkZXNEYXRhLmZvckVhY2goc2xpZGUgPT4gc2xpZGUuaGVpZ2h0U3RhdGUgPSAnZnVsbCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgY2hhbmdlZFNldHRpbmdzJDogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0Q2hhbmdlZFN0YXRlKCkucGlwZShcclxuICAgICAgdGFwKGRhdGEgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hdXRvSGVpZ2h0ICYmIGRhdGEucHJvcGVydHkubmFtZSA9PT0gJ3Bvc2l0aW9uJyl7XHJcblx0XHRcdFx0XHR0aGlzLnVwZGF0ZSgpO1xyXG5cdFx0XHRcdH1cclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgcmVmcmVzaGVkQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRSZWZyZXNoZWRTdGF0ZSgpLnBpcGUoXHJcbiAgICAgIHRhcChkYXRhID0+IHtcclxuICAgICAgICBpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b0hlaWdodCkge1xyXG4gICAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IGF1dG9IZWlnaHQkOiBPYnNlcnZhYmxlPHN0cmluZyB8IGFueT4gPSBtZXJnZShpbml0aWFsaXplZENhcm91c2VsJCwgY2hhbmdlZFNldHRpbmdzJCwgcmVmcmVzaGVkQ2Fyb3VzZWwkKTtcclxuICAgIHRoaXMuYXV0b0hlaWdodFN1YnNjcmlwdGlvbiA9IGF1dG9IZWlnaHQkLnN1YnNjcmliZShcclxuICAgICAgKCkgPT4ge31cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGVzIHRoZSBwcm9wICdoZWlnaHRTdGF0ZScgb2Ygc2xpZGVzXHJcbiAgICovXHJcbiAgdXBkYXRlKCkge1xyXG4gICAgY29uc3QgaXRlbXMgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5pdGVtc1xyXG4gICAgbGV0IHN0YXJ0ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuY3VycmVudCgpLFxyXG4gICAgICAgIGVuZCA9IHN0YXJ0ICsgaXRlbXM7XHJcblxyXG4gICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmNlbnRlcikge1xyXG4gICAgICBzdGFydCA9IGl0ZW1zICUgMiA9PT0gMSA/IHN0YXJ0IC0gKGl0ZW1zIC0gMSkgLyAyIDogc3RhcnQgLSBpdGVtcyAvIDI7XHJcbiAgICAgIGVuZCA9IGl0ZW1zICUgMiA9PT0gMSA/IHN0YXJ0ICsgaXRlbXMgOiBzdGFydCArIGl0ZW1zICsgMTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5zbGlkZXNEYXRhLmZvckVhY2goKHNsaWRlLCBpKSA9PiB7XHJcbiAgICAgIHNsaWRlLmhlaWdodFN0YXRlID0gKGkgPj0gc3RhcnQgJiYgaSA8IGVuZCkgPyAnZnVsbCcgOiAnbnVsbGVkJztcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIE9ic2VydmFibGUsIG1lcmdlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IENhcm91c2VsU2VydmljZSB9IGZyb20gJy4vY2Fyb3VzZWwuc2VydmljZSc7XHJcbmltcG9ydCB7IHRhcCwgc2tpcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBIYXNoU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaXB0aW9uIHRvIG1lcmdlIE9ic2VydmFibGUgZnJvbSBDYXJvdXNlbFNlcnZpY2VcclxuICAgKi9cclxuICBoYXNoU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIEN1cnJlbnQgdXJsIGZyYWdtZW50IChoYXNoKVxyXG4gICAqL1xyXG4gIGN1cnJlbnRIYXNoRnJhZ21lbnQ6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjYXJvdXNlbFNlcnZpY2U6IENhcm91c2VsU2VydmljZSxcclxuICAgICAgICAgICAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgICAgICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7XHJcbiAgICB0aGlzLnNweURhdGFTdHJlYW1zKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuaGFzaFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVmaW5lcyBPYnNlcnZhYmxlcyB3aGljaCBzZXJ2aWNlIG11c3Qgb2JzZXJ2ZVxyXG4gICAqL1xyXG4gIHNweURhdGFTdHJlYW1zKCkge1xyXG4gICAgY29uc3QgaW5pdGlhbGl6ZWRDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldEluaXRpYWxpemVkU3RhdGUoKS5waXBlKFxyXG4gICAgICB0YXAoKCkgPT4gdGhpcy5saXN0ZW5Ub1JvdXRlKCkgKVxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBjaGFuZ2VkU2V0dGluZ3MkOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRDaGFuZ2VkU3RhdGUoKS5waXBlKFxyXG4gICAgICB0YXAoZGF0YSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLlVSTGhhc2hMaXN0ZW5lciAmJiBkYXRhLnByb3BlcnR5Lm5hbWUgPT09ICdwb3NpdGlvbicpIHtcclxuICAgICAgICAgIGNvbnN0IG5ld0N1clNsaWRlID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuY3VycmVudCgpO1xyXG4gICAgICAgICAgY29uc3QgbmV3Q3VyRnJhZ21lbnQgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zbGlkZXNEYXRhW25ld0N1clNsaWRlXS5oYXNoRnJhZ21lbnQ7XHJcblxyXG4gICAgICAgICAgaWYgKCFuZXdDdXJGcmFnbWVudCB8fCBuZXdDdXJGcmFnbWVudCA9PT0gdGhpcy5jdXJyZW50SGFzaEZyYWdtZW50KSB7XHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLi8nXSwge2ZyYWdtZW50OiBuZXdDdXJGcmFnbWVudCwgcmVsYXRpdmVUbzogdGhpcy5yb3V0ZX0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgaGFzaEZyYWdtZW50JDogT2JzZXJ2YWJsZTxzdHJpbmcgfCBhbnk+ID0gbWVyZ2UoaW5pdGlhbGl6ZWRDYXJvdXNlbCQsIGNoYW5nZWRTZXR0aW5ncyQpO1xyXG4gICAgdGhpcy5oYXNoU3Vic2NyaXB0aW9uID0gaGFzaEZyYWdtZW50JC5zdWJzY3JpYmUoXHJcbiAgICAgICgpID0+IHt9XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogcmV3aW5kcyBjYXJvdXNlbCB0byBzbGlkZSB3aGljaCBoYXMgdGhlIHNhbWUgaGFzaEZyYWdtZW50IGFzIGZyYWdtZW50IG9mIGN1cnJlbnQgdXJsXHJcbiAgICogQHBhcmFtIGZyYWdtZW50IGZyYWdtZW50IG9mIHVybFxyXG4gICAqL1xyXG4gIHJld2luZChmcmFnbWVudDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNsaWRlc0RhdGEuZmluZEluZGV4KHNsaWRlID0+IHNsaWRlLmhhc2hGcmFnbWVudCA9PT0gZnJhZ21lbnQgJiYgc2xpZGUuaXNDbG9uZWQgPT09IGZhbHNlKTtcclxuXHJcbiAgICBpZiAocG9zaXRpb24gPT09IC0xIHx8IHBvc2l0aW9uID09PSB0aGlzLmNhcm91c2VsU2VydmljZS5jdXJyZW50KCkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuXHRcdHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnRvKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnJlbGF0aXZlKHBvc2l0aW9uKSwgZmFsc2UpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdGlhdGUgbGlzdGVuaW5nIHRvIEFjdGl2YXRlZFJvdXRlLmZyYWdtZW50XHJcbiAgICovXHJcbiAgbGlzdGVuVG9Sb3V0ZSgpIHtcclxuICAgIGNvbnN0IGNvdW50ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3Muc3RhcnRQb3NpdGlvbiA9PT0gJ1VSTEhhc2gnID8gMCA6IDI7XHJcbiAgICB0aGlzLnJvdXRlLmZyYWdtZW50LnBpcGUoXHJcbiAgICAgICAgc2tpcChjb3VudClcclxuICAgICAgKVxyXG4gICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgIGZyYWdtZW50ID0+IHtcclxuICAgICAgICAgIHRoaXMuY3VycmVudEhhc2hGcmFnbWVudCA9IGZyYWdtZW50O1xyXG4gICAgICAgICAgdGhpcy5yZXdpbmQoZnJhZ21lbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgKVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBPbkluaXQsXHJcbiAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIERpcmVjdGl2ZSxcclxuICBRdWVyeUxpc3QsXHJcbiAgQ29udGVudENoaWxkcmVuLFxyXG4gIFRlbXBsYXRlUmVmLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgQWZ0ZXJDb250ZW50SW5pdCxcclxuICBFdmVudEVtaXR0ZXJcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgT2JzZXJ2YWJsZSwgbWVyZ2UgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IFJlc2l6ZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9yZXNpemUuc2VydmljZSc7XHJcbmltcG9ydCB7IHRhcCwgZGVsYXksIGZpbHRlciwgc3dpdGNoTWFwLCBmaXJzdCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgQ2Fyb3VzZWxTZXJ2aWNlLCBDYXJvdXNlbEN1cnJlbnREYXRhIH0gZnJvbSAnLi4vc2VydmljZXMvY2Fyb3VzZWwuc2VydmljZSc7XHJcbmltcG9ydCB7IFN0YWdlRGF0YSB9IGZyb20gXCIuLi9tb2RlbHMvc3RhZ2UtZGF0YS5tb2RlbFwiO1xyXG5pbXBvcnQgeyBPd2xET01EYXRhIH0gZnJvbSBcIi4uL21vZGVscy9vd2xET00tZGF0YS5tb2RlbFwiO1xyXG5pbXBvcnQgeyBTbGlkZU1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL3NsaWRlLm1vZGVsJztcclxuaW1wb3J0IHsgT3dsT3B0aW9ucyB9IGZyb20gJy4uL21vZGVscy9vd2wtb3B0aW9ucy5tb2RlbCc7XHJcbmltcG9ydCB7IE5hdkRhdGEsIERvdHNEYXRhIH0gZnJvbSAnLi4vbW9kZWxzL25hdmlnYXRpb24tZGF0YS5tb2RlbHMnO1xyXG5pbXBvcnQgeyBOYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25hdmlnYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IEF1dG9wbGF5U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2F1dG9wbGF5LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBMYXp5TG9hZFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9sYXp5bG9hZC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQW5pbWF0ZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9hbmltYXRlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBdXRvSGVpZ2h0U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2F1dG9oZWlnaHQuc2VydmljZSc7XHJcbmltcG9ydCB7IEhhc2hTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvaGFzaC5zZXJ2aWNlJztcclxuXHJcbmxldCBuZXh0SWQgPSAwO1xyXG5cclxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnbmctdGVtcGxhdGVbY2Fyb3VzZWxTbGlkZV0nIH0pXHJcbmV4cG9ydCBjbGFzcyBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlIHtcclxuICAvKipcclxuICAgKiBVbmlxdWUgc2xpZGUgaWRlbnRpZmllci4gTXVzdCBiZSB1bmlxdWUgZm9yIHRoZSBlbnRpcmUgZG9jdW1lbnQgZm9yIHByb3BlciBhY2Nlc3NpYmlsaXR5IHN1cHBvcnQuXHJcbiAgICogV2lsbCBiZSBhdXRvLWdlbmVyYXRlZCBpZiBub3QgcHJvdmlkZWQuXHJcbiAgICovXHJcbiAgQElucHV0KCkgaWQgPSBgb3dsLXNsaWRlLSR7bmV4dElkKyt9YDtcclxuXHJcbiAgLyoqXHJcbiAgICogRGVmaW5lcyBob3cgbXVjaCB3aWR0aHMgb2YgY29tbW9uIHNsaWRlIHdpbGwgY3VycmVudCBzbGlkZSBoYXZlXHJcbiAgICogZS5nLiBpZiBfbWVyZ2VEYXRhPTIsIHRoZSBzbGlkZSB3aWxsIHR3aWNlIHdpZGVyIHRoZW4gc2xpZGVzIHdpdGggX21lcmdlRGF0YT0xXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZGF0YU1lcmdlID0gMTtcclxuICBASW5wdXQoKVxyXG4gIHNldCBkYXRhTWVyZ2UoZGF0YTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLl9kYXRhTWVyZ2UgPSB0aGlzLmlzTnVtZXJpYyhkYXRhKSA/IGRhdGEgOiAxO1xyXG4gIH07XHJcbiAgZ2V0IGRhdGFNZXJnZSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fZGF0YU1lcmdlIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2lkdGggb2Ygc2xpZGVcclxuICAgKi9cclxuICBASW5wdXQoKSB3aWR0aCA9IDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIElubmVyIGNvbnRlbnQgb2YgZG90IGZvciBjZXJ0YWluIHNsaWRlOyBjYW4gYmUgaHRtbC1tYXJrdXBcclxuICAgKi9cclxuICBASW5wdXQoKSBkb3RDb250ZW50ID0gJyc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhc2ggKGZyYWdtZW50KSBvZiB1cmwgd2hpY2ggY29ycmVzcG9uZHMgdG8gY2VydGFpbiBzbGlkZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRhdGFIYXNoID0gJyc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0cGxSZWY6IFRlbXBsYXRlUmVmPGFueT4pIHt9XHJcblxyXG4gIC8qKlxyXG5cdCAqIERldGVybWluZXMgaWYgdGhlIGlucHV0IGlzIGEgTnVtYmVyIG9yIHNvbWV0aGluZyB0aGF0IGNhbiBiZSBjb2VyY2VkIHRvIGEgTnVtYmVyXHJcblx0ICogQHBhcmFtIC0gVGhlIGlucHV0IHRvIGJlIHRlc3RlZFxyXG5cdCAqIEByZXR1cm5zIC0gQW4gaW5kaWNhdGlvbiBpZiB0aGUgaW5wdXQgaXMgYSBOdW1iZXIgb3IgY2FuIGJlIGNvZXJjZWQgdG8gYSBOdW1iZXJcclxuXHQgKi9cclxuICBpc051bWVyaWMobnVtYmVyOiBhbnkpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiAhaXNOYU4ocGFyc2VGbG9hdChudW1iZXIpKTtcclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEYXRhIHdoaWNoIHdpbGwgYmUgcGFzc2VkIG91dCBhZnRlciBlbmRpbmcgb2YgdHJhbnNpdGlvbiBvZiBjYXJvdXNlbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNsaWRlc091dHB1dERhdGEge1xyXG4gIHN0YXJ0UG9zaXRpb24/OiBudW1iZXI7XHJcbiAgc2xpZGVzPzogU2xpZGVNb2RlbFtdO1xyXG59O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdvd2wtY2Fyb3VzZWwtbycsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgY2xhc3M9XCJvd2wtY2Fyb3VzZWwgb3dsLXRoZW1lXCIgI293bENhcm91c2VsXHJcbiAgICAgIFtuZ0NsYXNzXT1cInsnb3dsLXJ0bCc6IG93bERPTURhdGE/LnJ0bCxcclxuICAgICAgICAgICAgICAgICAgJ293bC1sb2FkZWQnOiBvd2xET01EYXRhPy5pc0xvYWRlZCxcclxuICAgICAgICAgICAgICAgICAgJ293bC1yZXNwb25zaXZlJzogb3dsRE9NRGF0YT8uaXNSZXNwb25zaXZlLFxyXG4gICAgICAgICAgICAgICAgICAnb3dsLWRyYWcnOiBvd2xET01EYXRhPy5pc01vdXNlRHJhZ2FibGUsXHJcbiAgICAgICAgICAgICAgICAgICdvd2wtZ3JhYic6IG93bERPTURhdGE/LmlzR3JhYn1cIlxyXG4gICAgICAobW91c2VvdmVyKT1cInN0YXJ0UGF1c2luZygpXCJcclxuICAgICAgKG1vdXNlbGVhdmUpPVwic3RhcnRQbGF5TUwoKVwiXHJcbiAgICAgICh0b3VjaHN0YXJ0KT1cInN0YXJ0UGF1c2luZygpXCJcclxuICAgICAgKHRvdWNoZW5kKT1cInN0YXJ0UGxheVRFKClcIj5cclxuXHJcbiAgICAgIDxkaXYgKm5nSWY9XCJjYXJvdXNlbExvYWRlZFwiIGNsYXNzPVwib3dsLXN0YWdlLW91dGVyXCI+XHJcbiAgICAgICAgPG93bC1zdGFnZSBbb3dsRHJhZ2dhYmxlXT1cInsnaXNNb3VzZURyYWdhYmxlJzogb3dsRE9NRGF0YT8uaXNNb3VzZURyYWdhYmxlLCAnaXNUb3VjaERyYWdhYmxlJzogb3dsRE9NRGF0YT8uaXNUb3VjaERyYWdhYmxlfVwiXHJcbiAgICAgICAgICAgICAgICAgICAgW3N0YWdlRGF0YV09XCJzdGFnZURhdGFcIlxyXG4gICAgICAgICAgICAgICAgICAgIFtzbGlkZXNEYXRhXT1cInNsaWRlc0RhdGFcIj48L293bC1zdGFnZT5cclxuICAgICAgPC9kaXY+IDwhLS0gLy5vd2wtc3RhZ2Utb3V0ZXIgLS0+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJvd2wtbmF2XCIgW25nQ2xhc3NdPVwieydkaXNhYmxlZCc6IG5hdkRhdGE/LmRpc2FibGVkfVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJvd2wtcHJldlwiIFtuZ0NsYXNzXT1cInsnZGlzYWJsZWQnOiBuYXZEYXRhPy5wcmV2Py5kaXNhYmxlZH1cIiAoY2xpY2spPVwicHJldigpXCIgW2lubmVySFRNTF09XCJuYXZEYXRhPy5wcmV2Py5odG1sVGV4dFwiPjwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJvd2wtbmV4dFwiIFtuZ0NsYXNzXT1cInsnZGlzYWJsZWQnOiBuYXZEYXRhPy5uZXh0Py5kaXNhYmxlZH1cIiAoY2xpY2spPVwibmV4dCgpXCIgW2lubmVySFRNTF09XCJuYXZEYXRhPy5uZXh0Py5odG1sVGV4dFwiPjwvZGl2PlxyXG4gICAgICA8L2Rpdj4gPCEtLSAvLm93bC1uYXYgLS0+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJvd2wtZG90c1wiIFtuZ0NsYXNzXT1cInsnZGlzYWJsZWQnOiBkb3RzRGF0YT8uZGlzYWJsZWR9XCI+XHJcbiAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgZG90IG9mIGRvdHNEYXRhPy5kb3RzXCIgY2xhc3M9XCJvd2wtZG90XCIgW25nQ2xhc3NdPVwieydhY3RpdmUnOiBkb3QuYWN0aXZlLCAnb3dsLWRvdC10ZXh0JzogZG90LnNob3dJbm5lckNvbnRlbnR9XCIgKGNsaWNrKT1cIm1vdmVCeURvdChkb3QuaWQpXCI+XHJcbiAgICAgICAgICA8c3BhbiBbaW5uZXJIVE1MXT1cImRvdC5pbm5lckNvbnRlbnRcIj48L3NwYW4+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PiA8IS0tIC8ub3dsLWRvdHMgLS0+XHJcbiAgICA8L2Rpdj4gPCEtLSAvLm93bC1jYXJvdXNlbCBvd2wtbG9hZGVkIC0tPlxyXG4gIGAsXHJcbiAgc3R5bGVzOiBbYC5vd2wtdGhlbWUgeyBkaXNwbGF5OiBibG9jazsgfWBdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgTmF2aWdhdGlvblNlcnZpY2UsXHJcbiAgICBBdXRvcGxheVNlcnZpY2UsXHJcbiAgICBDYXJvdXNlbFNlcnZpY2UsXHJcbiAgICBMYXp5TG9hZFNlcnZpY2UsXHJcbiAgICBBbmltYXRlU2VydmljZSxcclxuICAgIEF1dG9IZWlnaHRTZXJ2aWNlLFxyXG4gICAgSGFzaFNlcnZpY2VcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDYXJvdXNlbENvbXBvbmVudFxyXG4gIGltcGxlbWVudHMgT25Jbml0LCBBZnRlckNvbnRlbnRDaGVja2VkLCBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xyXG4gIEBDb250ZW50Q2hpbGRyZW4oQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZSlcclxuICBzbGlkZXM6IFF1ZXJ5TGlzdDxDYXJvdXNlbFNsaWRlRGlyZWN0aXZlPjtcclxuXHJcbiAgQE91dHB1dCgpIHRyYW5zbGF0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFNsaWRlc091dHB1dERhdGE+KCk7XHJcbiAgQE91dHB1dCgpIGRyYWdnaW5nID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG5cclxuICAvKipcclxuICAgKiBXaWR0aCBvZiBjYXJvdXNlbCB3aW5kb3cgKHRhZyB3aXRoIGNsYXNzIC5vd2wtY2Fyb3VzZWwpLCBpbiB3aWNoIHdlIGNhbiBzZWUgbW92aW5nIHNsaWRlcnNcclxuICAgKi9cclxuICBjYXJvdXNlbFdpbmRvd1dpZHRoOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlwdGlvbiB0byAncmVzaXplJyBldmVudFxyXG4gICAqL1xyXG4gIHJlc2l6ZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gbWVyZ2UgT2JzZXJ2YWJsZSwgd2hpY2ggbWVyZ2VzIGFsbCBPYnNlcnZhYmxlcyBpbiB0aGUgY29tcG9uZW50IGV4Y2VwdCAncmVzaXplJyBPYnNlcnZhYmxlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfYWxsT2JzZXJ2U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIEN1cnJlbnQgc2V0dGluZ3MgZm9yIHRoZSBjYXJvdXNlbC5cclxuICAgKi9cclxuICBvd2xET01EYXRhOiBPd2xET01EYXRhO1xyXG5cclxuICAvKipcclxuICAgKiBEYXRhIG9mIG93bC1zdGFnZVxyXG4gICAqL1xyXG5cdHN0YWdlRGF0YTogU3RhZ2VEYXRhO1xyXG5cclxuXHQvKipcclxuXHQgKiAgRGF0YSBvZiBldmVyeSBzbGlkZVxyXG5cdCAqL1xyXG4gIHNsaWRlc0RhdGE6IFNsaWRlTW9kZWxbXTtcclxuXHJcbiAgLyoqXHJcblx0ICogRGF0YSBvZiBuYXZpZ2F0aW9uIGJsb2NrXHJcblx0ICovXHJcblx0bmF2RGF0YTogTmF2RGF0YTtcclxuXHJcblx0LyoqXHJcblx0ICogRGF0YSBvZiBkb3RzIGJsb2NrXHJcblx0ICovXHJcbiAgZG90c0RhdGE6IERvdHNEYXRhO1xyXG5cclxuICAvKipcclxuICAgKiBEYXRhLCB3aWNoIGFyZSBwYXNzZWQgb3V0IG9mIGNhcm91c2VsIGFmdGVyIGVuZGluZyBvZiB0cmFuc2lvbmluZyBvZiBjYXJvdXNlbFxyXG4gICAqL1xyXG4gIHNsaWRlc091dHB1dERhdGE6IFNsaWRlc091dHB1dERhdGE7XHJcblxyXG4gIC8qKlxyXG4gICAqIFNob3dzIHdoZXRoZXIgY2Fyb3VzZWwgaXMgbG9hZGVkIG9mIG5vdC5cclxuICAgKi9cclxuICBjYXJvdXNlbExvYWRlZCA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBVc2VyJ3Mgb3B0aW9uc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG9wdGlvbnM6IE93bE9wdGlvbnM7XHJcblxyXG4gIC8qKlxyXG4gICAqIE9ic2VydmFibGUgZm9yIGdldHRpbmcgY3VycmVudCBWaWV3IFNldHRpbmdzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfdmlld0N1clNldHRpbmdzJDogT2JzZXJ2YWJsZTxDYXJvdXNlbEN1cnJlbnREYXRhPjtcclxuXHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2YWJsZSBmb3IgY2F0Y2hpbmcgdGhlIGVuZCBvZiB0cmFuc2l0aW9uIG9mIGNhcm91c2VsXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfdHJhbnNsYXRlZENhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+O1xyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZhYmxlIGZvciBjYXRjaGluZyB0aGUgc3RhcnQgb2YgZHJhZ2dpbmcgb2YgdGhlIGNhcm91c2VsXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZHJhZ2dpbmdDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPjtcclxuXHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2YWJsZSBmb3IgbWVyZ2luZyBhbGwgT2JzZXJ2YWJsZXMgYW5kIGNyZWF0aW5nIG9uZSBzdWJzY3JpcHRpb25cclxuICAgKi9cclxuICBwcml2YXRlIF9jYXJvdXNlbE1lcmdlJDogT2JzZXJ2YWJsZTxDYXJvdXNlbEN1cnJlbnREYXRhIHwgc3RyaW5nPjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxyXG4gICAgcHJpdmF0ZSByZXNpemVTZXJ2aWNlOiBSZXNpemVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjYXJvdXNlbFNlcnZpY2U6IENhcm91c2VsU2VydmljZSxcclxuICAgIHByaXZhdGUgbmF2aWdhdGlvblNlcnZpY2U6IE5hdmlnYXRpb25TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBhdXRvcGxheVNlcnZpY2U6IEF1dG9wbGF5U2VydmljZSxcclxuICAgIHByaXZhdGUgbGF6eUxvYWRTZXJ2aWNlOiBMYXp5TG9hZFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGFuaW1hdGVTZXJ2aWNlOiBBbmltYXRlU2VydmljZSxcclxuICAgIHByaXZhdGUgYXV0b0hlaWdodFNlcnZpY2U6IEF1dG9IZWlnaHRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBoYXNoU2VydmljZTogSGFzaFNlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5zcHlEYXRhU3RyZWFtcygpO1xyXG5cclxuICAgIHRoaXMuY2Fyb3VzZWxXaW5kb3dXaWR0aCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICAnLm93bC1jYXJvdXNlbCdcclxuICAgICkuY2xpZW50V2lkdGg7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XHJcbiAgfVxyXG4gIC8vIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIEVORFxyXG5cclxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR1cCh0aGlzLmNhcm91c2VsV2luZG93V2lkdGgsIHRoaXMuc2xpZGVzLnRvQXJyYXkoKSwgdGhpcy5vcHRpb25zKTtcclxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmluaXRpYWxpemUodGhpcy5zbGlkZXMudG9BcnJheSgpKTtcclxuXHJcbiAgICB0aGlzLl93aW5SZXNpemVXYXRjaGVyKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIGlmICh0aGlzLnJlc2l6ZVN1YnNjcmlwdGlvbikge1xyXG4gICAgICB0aGlzLnJlc2l6ZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2FsbE9ic2VydlN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSm9pbnMgdGhlIG9ic2VydmFibGUgbG9naW4gaW4gb25lIHBsYWNlOiBzZXRzIHZhbHVlcyB0byBzb21lIG9ic2VydmFibGVzLCBtZXJnZXMgdGhpcyBvYnNlcnZhYmxlcyBhbmRcclxuICAgKiBzdWJjcmliZXMgdG8gbWVyZ2UgZnVuY1xyXG4gICAqL1xyXG4gIHNweURhdGFTdHJlYW1zKCkge1xyXG4gICAgdGhpcy5fdmlld0N1clNldHRpbmdzJCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldFZpZXdDdXJTZXR0aW5ncygpLnBpcGUoXHJcbiAgICAgIHRhcChkYXRhID0+IHtcclxuICAgICAgICB0aGlzLm93bERPTURhdGEgPSBkYXRhLm93bERPTURhdGE7XHJcbiAgICAgICAgdGhpcy5zdGFnZURhdGEgPSBkYXRhLnN0YWdlRGF0YTtcclxuICAgICAgICB0aGlzLnNsaWRlc0RhdGEgPSBkYXRhLnNsaWRlc0RhdGE7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNhcm91c2VsTG9hZGVkKSB7XHJcbiAgICAgICAgICB0aGlzLmNhcm91c2VsTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5uYXZEYXRhID0gZGF0YS5uYXZEYXRhO1xyXG4gICAgICAgIHRoaXMuZG90c0RhdGEgPSBkYXRhLmRvdHNEYXRhO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLl90cmFuc2xhdGVkQ2Fyb3VzZWwkID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0VHJhbnNsYXRlZFN0YXRlKCkucGlwZShcclxuICAgICAgdGFwKCgpID0+IHtcclxuICAgICAgICB0aGlzLmdhdGhlclRyYW5zbGF0ZWREYXRhKCk7XHJcbiAgICAgICAgdGhpcy50cmFuc2xhdGVkLmVtaXQodGhpcy5zbGlkZXNPdXRwdXREYXRhKTtcclxuICAgICAgICB0aGlzLnNsaWRlc091dHB1dERhdGEgPSB7fTtcclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5fZHJhZ2dpbmdDYXJvdXNlbCQgPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXREcmFnU3RhdGUoKS5waXBlKFxyXG4gICAgICB0YXAoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZHJhZ2dpbmcuZW1pdCh0cnVlKTtcclxuICAgICAgfSksXHJcbiAgICAgIHN3aXRjaE1hcChcclxuICAgICAgICAoKSA9PiB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRUcmFuc2xhdGVkU3RhdGUoKS5waXBlKFxyXG4gICAgICAgICAgZmlyc3QoKSxcclxuICAgICAgICAgIHRhcCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhZ2dpbmcuZW1pdChmYWxzZSk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIClcclxuICAgICAgKVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLl9jYXJvdXNlbE1lcmdlJCA9IG1lcmdlKHRoaXMuX3ZpZXdDdXJTZXR0aW5ncyQsIHRoaXMuX3RyYW5zbGF0ZWRDYXJvdXNlbCQsIHRoaXMuX2RyYWdnaW5nQ2Fyb3VzZWwkKTtcclxuICAgIHRoaXMuX2FsbE9ic2VydlN1YnNjcmlwdGlvbiA9IHRoaXMuX2Nhcm91c2VsTWVyZ2UkLnN1YnNjcmliZSgoKSA9PiB7fSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbml0IHN1YnNjcmlwdGlvbiB0byByZXNpemUgZXZlbnQgYW5kIGF0dGFjaGVzIGhhbmRsZXIgZm9yIHRoaXMgZXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIF93aW5SZXNpemVXYXRjaGVyKCkge1xyXG4gICAgaWYgKE9iamVjdC5rZXlzKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLl9vcHRpb25zLnJlc3BvbnNpdmUpLmxlbmd0aCkge1xyXG4gICAgICB0aGlzLnJlc2l6ZVN1YnNjcmlwdGlvbiA9IHRoaXMucmVzaXplU2VydmljZS5vblJlc2l6ZSRcclxuICAgICAgICAucGlwZShcclxuICAgICAgICAgIGZpbHRlcigoKSA9PiB0aGlzLmNhcm91c2VsV2luZG93V2lkdGggIT09IHRoaXMuZWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcub3dsLWNhcm91c2VsJykuY2xpZW50V2lkdGgpLFxyXG4gICAgICAgICAgZGVsYXkodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MucmVzcG9uc2l2ZVJlZnJlc2hSYXRlKVxyXG4gICAgICAgIClcclxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm9uUmVzaXplKHRoaXMuZWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcub3dsLWNhcm91c2VsJykuY2xpZW50V2lkdGgpO1xyXG4gICAgICAgICAgdGhpcy5jYXJvdXNlbFdpbmRvd1dpZHRoID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vd2wtY2Fyb3VzZWwnKS5jbGllbnRXaWR0aDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhbmRsZXIgZm9yIHRyYW5zaXRpb2VuZCBldmVudFxyXG4gICAqL1xyXG4gIG9uVHJhbnNpdGlvbkVuZCgpIHtcclxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm9uVHJhbnNpdGlvbkVuZCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlciBmb3IgY2xpY2sgZXZlbnQsIGF0dGFjaGVkIHRvIG5leHQgYnV0dG9uXHJcbiAgICovXHJcbiAgbmV4dCgpIHtcclxuICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UubmV4dCh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5uYXZTcGVlZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGVyIGZvciBjbGljayBldmVudCwgYXR0YWNoZWQgdG8gcHJldiBidXR0b25cclxuICAgKi9cclxuICBwcmV2KCkge1xyXG4gICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5wcmV2KHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLm5hdlNwZWVkKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhbmRsZXIgZm9yIGNsaWNrIGV2ZW50LCBhdHRhY2hlZCB0byBkb3RzXHJcbiAgICovXHJcbiAgbW92ZUJ5RG90KGRvdElkOiBzdHJpbmcpIHtcclxuICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UubW92ZUJ5RG90KGRvdElkKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHJld2luZHMgY2Fyb3VzZWwgdG8gc2xpZGUgd2l0aCBuZWVkZWQgaWRcclxuICAgKiBAcGFyYW0gaWQgZnJhZ21lbnQgb2YgdXJsXHJcbiAgICovXHJcbiAgdG8oaWQ6IHN0cmluZykge1xyXG4gICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS50b1NsaWRlQnlJZChpZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHYXRoZXJzIGFuZCBwcmVwYXJlcyBkYXRhIGludGVuZGVkIGZvciBwYXNzaW5nIHRvIHRoZSB1c2VyIGJ5IG1lYW5zIG9mIGZpcmluZyBldmVudCB0cmFuc2xhdGVkQ2Fyb3VzZWxcclxuICAgKi9cclxuICBnYXRoZXJUcmFuc2xhdGVkRGF0YSgpIHtcclxuICAgIGxldCBzdGFydFBvc2l0aW9uOiBudW1iZXI7XHJcbiAgICBjb25zdCBjbG9uZWRJZFByZWZpeCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmNsb25lZElkUHJlZml4O1xyXG4gICAgY29uc3QgYWN0aXZlU2xpZGVzOiBTbGlkZU1vZGVsW10gPSB0aGlzLnNsaWRlc0RhdGFcclxuICAgICAgLmZpbHRlcihzbGlkZSA9PiBzbGlkZS5pc0FjdGl2ZSA9PT0gdHJ1ZSlcclxuICAgICAgLm1hcChzbGlkZSA9PiB7XHJcbiAgICAgICAgY29uc3QgaWQgPSBzbGlkZS5pZC5pbmRleE9mKGNsb25lZElkUHJlZml4KSA+PSAwID8gc2xpZGUuaWQuc2xpY2UoY2xvbmVkSWRQcmVmaXgubGVuZ3RoKSA6IHNsaWRlLmlkO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBpZDogaWQsXHJcbiAgICAgICAgICB3aWR0aDogc2xpZGUud2lkdGgsXHJcbiAgICAgICAgICBtYXJnaW5MOiBzbGlkZS5tYXJnaW5MLFxyXG4gICAgICAgICAgbWFyZ2luUjogc2xpZGUubWFyZ2luUixcclxuICAgICAgICAgIGNlbnRlcjogc2xpZGUuaXNDZW50ZXJlZFxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICBzdGFydFBvc2l0aW9uID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UucmVsYXRpdmUodGhpcy5jYXJvdXNlbFNlcnZpY2UuY3VycmVudCgpKTtcclxuICAgIHRoaXMuc2xpZGVzT3V0cHV0RGF0YSA9IHtcclxuICAgICAgc3RhcnRQb3NpdGlvbjogc3RhcnRQb3NpdGlvbixcclxuICAgICAgc2xpZGVzOiBhY3RpdmVTbGlkZXNcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0YXJ0cyBwYXVzaW5nXHJcbiAgICovXHJcbiAgc3RhcnRQYXVzaW5nKCkge1xyXG4gICAgdGhpcy5hdXRvcGxheVNlcnZpY2Uuc3RhcnRQYXVzaW5nKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdGFydHMgcGxheWluZyBhZnRlciBtb3VzZSBsZWF2ZXMgY2Fyb3VzZWxcclxuICAgKi9cclxuICBzdGFydFBsYXlNTCgpIHtcclxuICAgIHRoaXMuYXV0b3BsYXlTZXJ2aWNlLnN0YXJ0UGxheWluZ01vdXNlTGVhdmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0YXJ0cyBwbGF5aW5nIGFmdGVyIHRvdWNoIGVuZHNcclxuICAgKi9cclxuICBzdGFydFBsYXlURSgpIHtcclxuICAgIHRoaXMuYXV0b3BsYXlTZXJ2aWNlLnN0YXJ0UGxheWluZ1RvdWNoRW5kKCk7XHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE5nWm9uZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBSZW5kZXJlcjIsIE9uSW5pdCwgT25EZXN0cm95LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDYXJvdXNlbFNlcnZpY2UsIENvb3JkcyB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2Nhcm91c2VsLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZmlyc3QgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IFN0YWdlRGF0YSB9IGZyb20gJy4uLy4uL21vZGVscy9zdGFnZS1kYXRhLm1vZGVsJztcclxuaW1wb3J0IHsgU2xpZGVNb2RlbCB9IGZyb20gJy4uLy4uL21vZGVscy9zbGlkZS5tb2RlbCc7XHJcbmltcG9ydCB7IEFuaW1hdGVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYW5pbWF0ZS5zZXJ2aWNlJztcclxuaW1wb3J0IHtcclxuICB0cmlnZ2VyLFxyXG4gIHN0YXRlLFxyXG4gIHN0eWxlLFxyXG4gIGFuaW1hdGUsXHJcbiAgdHJhbnNpdGlvblxyXG59IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ293bC1zdGFnZScsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJvd2wtc3RhZ2VcIiBbbmdTdHlsZV09XCJ7J3dpZHRoJzogc3RhZ2VEYXRhLndpZHRoICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0cmFuc2Zvcm0nOiBzdGFnZURhdGEudHJhbnNmb3JtLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3RyYW5zaXRpb24nOiBzdGFnZURhdGEudHJhbnNpdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdwYWRkaW5nLWxlZnQnOiBzdGFnZURhdGEucGFkZGluZ0wgKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3BhZGRpbmctcmlnaHQnOiBzdGFnZURhdGEucGFkZGluZ1IgKyAncHgnIH1cIlxyXG4gICAgICAgICAgKHRyYW5zaXRpb25lbmQpPVwib25UcmFuc2l0aW9uRW5kKClcIj5cclxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBzbGlkZSBvZiBzbGlkZXNEYXRhOyBsZXQgaSA9IGluZGV4XCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwib3dsLWl0ZW1cIiBbbmdDbGFzc109XCJzbGlkZS5jbGFzc2VzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdTdHlsZV09XCJ7J3dpZHRoJzogc2xpZGUud2lkdGggKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdtYXJnaW4tbGVmdCc6IHNsaWRlLm1hcmdpbkwgKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdtYXJnaW4tcmlnaHQnOiBzbGlkZS5tYXJnaW5SICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbGVmdCc6IHNsaWRlLmxlZnR9XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoYW5pbWF0aW9uZW5kKT1cImNsZWFyKHNsaWRlLmlkKVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW0BhdXRvSGVpZ2h0XT1cInNsaWRlLmhlaWdodFN0YXRlXCI+XHJcbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdJZj1cInNsaWRlLmxvYWRcIiBbbmdUZW1wbGF0ZU91dGxldF09XCJzbGlkZS50cGxSZWZcIj48L25nLXRlbXBsYXRlPlxyXG4gICAgICAgICAgPC9kaXY+PCEtLSAvLm93bC1pdGVtIC0tPlxyXG4gICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICA8L2Rpdj48IS0tIC8ub3dsLXN0YWdlIC0tPlxyXG4gICAgPC9kaXY+XHJcbiAgYCxcclxuICBhbmltYXRpb25zOiBbXHJcbiAgICB0cmlnZ2VyKCdhdXRvSGVpZ2h0JywgW1xyXG4gICAgICBzdGF0ZSgnbnVsbGVkJywgc3R5bGUoe2hlaWdodDogMH0pKSxcclxuICAgICAgc3RhdGUoJ2Z1bGwnLCBzdHlsZSh7aGVpZ2h0OiAnKid9KSksXHJcbiAgICAgIHRyYW5zaXRpb24oJ2Z1bGwgPT4gbnVsbGVkJywgW1xyXG4gICAgICAgIC8vIHN0eWxlKHtoZWlnaHQ6ICcqJ30pLFxyXG4gICAgICAgIGFuaW1hdGUoJzcwMG1zIDM1MG1zJylcclxuICAgICAgXSksXHJcbiAgICAgIHRyYW5zaXRpb24oJ251bGxlZCA9PiBmdWxsJywgW1xyXG4gICAgICAgIC8vIHN0eWxlKHtoZWlnaHQ6IDB9KSxcclxuICAgICAgICBhbmltYXRlKDM1MClcclxuICAgICAgXSksXHJcbiAgICBdKVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFN0YWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIC8qKlxyXG4gICAqIE9iamVjdCB3aXRoIHNldHRpbmdzIHdoaWNoIG1ha2UgY2Fyb3VzZWwgZHJhZ2dhYmxlIGJ5IHRvdWNoIG9yIG1vdXNlXHJcbiAgICovXHJcbiAgQElucHV0KCkgb3dsRHJhZ2dhYmxlOiB7XHJcbiAgICBpc01vdXNlRHJhZ2FibGU6IGJvb2xlYW4sXHJcbiAgICBpc1RvdWNoRHJhZ2FibGU6IGJvb2xlYW5cclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBEYXRhIG9mIG93bC1zdGFnZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHN0YWdlRGF0YTogU3RhZ2VEYXRhO1xyXG5cclxuXHQvKipcclxuXHQgKiAgRGF0YSBvZiBldmVyeSBzbGlkZVxyXG5cdCAqL1xyXG4gIEBJbnB1dCgpIHNsaWRlc0RhdGE6IFNsaWRlTW9kZWxbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogRnVuY3Rpb24gd2ljaCB3aWxsIGJlIHJldHVybmVkIGFmdGVyIGF0dGFjaGluZyBsaXN0ZW5lciB0byAnbW91c2Vtb3ZlJyBldmVudFxyXG4gICAqL1xyXG4gIGxpc3RlbmVyTW91c2VNb3ZlOiAoKSA9PiB2b2lkO1xyXG4gIC8qKlxyXG4gICAqIEZ1bmN0aW9uIHdpY2ggd2lsbCBiZSByZXR1cm5lZCBhZnRlciBhdHRhY2hpbmcgbGlzdGVuZXIgdG8gJ3RvdWNobW92ZScgZXZlbnRcclxuICAgKi9cclxuICBsaXN0ZW5lclRvdWNoTW92ZTogKCkgPT4gdm9pZDtcclxuICAvKipcclxuICAgKiBGdW5jdGlvbiB3aWNoIHdpbGwgYmUgcmV0dXJuZWQgYWZ0ZXIgYXR0YWNoaW5nIGxpc3RlbmVyIHRvICdtb3VzZW1vdmUnIGV2ZW50XHJcbiAgICovXHJcbiAgbGlzdGVuZXJPbmVNb3VzZU1vdmU6ICgpID0+IHZvaWQ7XHJcbiAgLyoqXHJcbiAgICogRnVuY3Rpb24gd2ljaCB3aWxsIGJlIHJldHVybmVkIGFmdGVyIGF0dGFjaGluZyBsaXN0ZW5lciB0byAndG91Y2htb3ZlJyBldmVudFxyXG4gICAqL1xyXG4gIGxpc3RlbmVyT25lVG91Y2hNb3ZlOiAoKSA9PiB2b2lkO1xyXG5cclxuICAvKipcclxuICAgKiBGdW5jdGlvbiB3aWNoIHdpbGwgYmUgcmV0dXJuZWQgYWZ0ZXIgYXR0YWNoaW5nIGxpc3RlbmVyIHRvICdtb3VzZXVwJyBldmVudFxyXG4gICAqL1xyXG4gIGxpc3RlbmVyTW91c2VVcDogKCkgPT4gdm9pZDtcclxuICAvKipcclxuICAgKiBGdW5jdGlvbiB3aWNoIHdpbGwgYmUgcmV0dXJuZWQgYWZ0ZXIgYXR0YWNoaW5nIGxpc3RlbmVyIHRvICd0b3VjaGVuZCcgZXZlbnRcclxuICAgKi9cclxuICBsaXN0ZW5lclRvdWNoRW5kOiAoKSA9PiB2b2lkO1xyXG5cclxuICAvKipcclxuICAgKiBGdW5jdGlvbiB3aWNoIHdpbGwgYmUgcmV0dXJuZWQgYWZ0ZXIgYXR0YWNoaW5nIGxpc3RlbmVyIHRvICdjbGljaycgZXZlbnRcclxuICAgKi9cclxuICBsaXN0ZW5lck9uZUNsaWNrOiAoKSA9PiB2b2lkO1xyXG5cclxuICBsaXN0ZW5lckFUYWc6ICgpID0+IHZvaWQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIE9iamVjdCB3aXRoIGRhdGEgbmVlZGVkIGZvciBkcmFnZ2luZ1xyXG4gICAqL1xyXG4gIHByaXZhdGUgX2RyYWc6IGFueSA9IHtcclxuICAgIHRpbWU6IG51bGwsXHJcbiAgICB0YXJnZXQ6IG51bGwsXHJcbiAgICBwb2ludGVyOiBudWxsLFxyXG4gICAgc3RhZ2U6IHtcclxuICAgICAgc3RhcnQ6IG51bGwsXHJcbiAgICAgIGN1cnJlbnQ6IG51bGxcclxuICAgIH0sXHJcbiAgICBkaXJlY3Rpb246IG51bGwsXHJcbiAgICBhY3RpdmU6IGZhbHNlLFxyXG4gICAgbW92aW5nOiBmYWxzZVxyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSBjYXJvdXNlbCdzIHJlYnVpbGRpbmcgY2F1c2VkIGJ5IHJlc2l6ZSBldmVudCBzdGFydHNcclxuICAgKi9cclxuICBwcml2YXRlIF9vbmVEcmFnTW92ZSQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjdGlwdGlvbiB0byBfb25lRHJhZ01vdmUkIFN1YmplY3RcclxuICAgKi9cclxuICBwcml2YXRlIF9vbmVNb3ZlU3Vic3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB6b25lOiBOZ1pvbmUsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcclxuICAgICAgICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSBjYXJvdXNlbFNlcnZpY2U6IENhcm91c2VsU2VydmljZSxcclxuICAgICAgICAgICAgICBwcml2YXRlIGFuaW1hdGVTZXJ2aWNlOiBBbmltYXRlU2VydmljZSkgeyB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZG93bicsIFsnJGV2ZW50J10pIG9uTW91c2VEb3duKGV2ZW50KSB7XHJcbiAgICBpZiAodGhpcy5vd2xEcmFnZ2FibGUuaXNNb3VzZURyYWdhYmxlKSB7XHJcbiAgICAgIHRoaXMuX29uRHJhZ1N0YXJ0KGV2ZW50KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBbJyRldmVudCddKSBvblRvdWNoU3RhcnQoZXZlbnQpIHtcclxuICAgIGlmICh0aGlzLm93bERyYWdnYWJsZS5pc1RvdWNoRHJhZ2FibGUpIHtcclxuICAgICAgdGhpcy5fb25EcmFnU3RhcnQoZXZlbnQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcigndG91Y2hjYW5jZWwnLCBbJyRldmVudCddKSBvblRvdWNoQ2FuY2VsKGV2ZW50KSB7XHJcbiAgICB0aGlzLl9vbkRyYWdFbmQoZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignZHJhZ3N0YXJ0Jykgb25EcmFnU3RhcnQoKSB7XHJcbiAgICBpZiAodGhpcy5vd2xEcmFnZ2FibGUuaXNNb3VzZURyYWdhYmxlKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ3NlbGVjdHN0YXJ0Jykgb25TZWxlY3RTdGFydCgpIHtcclxuICAgIGlmICh0aGlzLm93bERyYWdnYWJsZS5pc01vdXNlRHJhZ2FibGUpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLl9vbmVNb3ZlU3Vic3JpcHRpb24gPSB0aGlzLl9vbmVEcmFnTW92ZSRcclxuICAgICAgLnBpcGUoZmlyc3QoKSlcclxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5fc2VuZENoYW5nZXMoKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuX29uZU1vdmVTdWJzcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUGFzc2VzIHRoaXMgdG8gX29uZU1vdXNlVG91Y2hNb3ZlKCk7XHJcbiAgICovXHJcbiAgYmluZE9uZU1vdXNlVG91Y2hNb3ZlID0gKGV2KSA9PiB7XHJcbiAgICB0aGlzLl9vbmVNb3VzZVRvdWNoTW92ZShldik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQYXNzZXMgdGhpcyB0byBfb25EcmFnTW92ZSgpO1xyXG4gICAqL1xyXG4gIGJpbmRPbkRyYWdNb3ZlID0gKGV2KSA9PiB7XHJcbiAgICB0aGlzLl9vbkRyYWdNb3ZlKGV2KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFBhc3NlcyB0aGlzIHRvIF9vbkRyYWdNb3ZlKCk7XHJcbiAgICovXHJcbiAgYmluZE9uRHJhZ0VuZCA9IChldikgPT4ge1xyXG4gICAgLy8gdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgIHRoaXMuX29uRHJhZ0VuZChldik7XHJcbiAgICAvLyB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEhhbmRsZXMgYHRvdWNoc3RhcnRgIGFuZCBgbW91c2Vkb3duYCBldmVudHMuXHJcblx0ICogQHRvZG8gSG9yaXpvbnRhbCBzd2lwZSB0aHJlc2hvbGQgYXMgb3B0aW9uXHJcblx0ICogQHRvZG8gIzI2MVxyXG5cdCAqIEBwYXJhbSBldmVudCAtIFRoZSBldmVudCBhcmd1bWVudHMuXHJcblx0ICovXHJcblx0cHJpdmF0ZSBfb25EcmFnU3RhcnQoZXZlbnQpOiBhbnkge1xyXG5cdFx0bGV0IHN0YWdlOiBDb29yZHMgPSBudWxsO1xyXG5cclxuXHRcdGlmIChldmVudC53aGljaCA9PT0gMykge1xyXG5cdFx0XHRyZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgc3RhZ2UgPSB0aGlzLl9wcmVwYXJlRHJhZ2dpbmcoZXZlbnQpO1xyXG5cclxuXHRcdHRoaXMuX2RyYWcudGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG5cdFx0dGhpcy5fZHJhZy50YXJnZXQgPSBldmVudC50YXJnZXQ7XHJcblx0XHR0aGlzLl9kcmFnLnN0YWdlLnN0YXJ0ID0gc3RhZ2U7XHJcblx0XHR0aGlzLl9kcmFnLnN0YWdlLmN1cnJlbnQgPSBzdGFnZTtcclxuICAgIHRoaXMuX2RyYWcucG9pbnRlciA9IHRoaXMuX3BvaW50ZXIoZXZlbnQpO1xyXG4gICAgdGhpcy5fZHJhZy5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMubGlzdGVuZXJNb3VzZVVwID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oZG9jdW1lbnQsICdtb3VzZXVwJywgdGhpcy5iaW5kT25EcmFnRW5kKTtcclxuICAgIHRoaXMubGlzdGVuZXJUb3VjaEVuZCA9IHRoaXMucmVuZGVyZXIubGlzdGVuKGRvY3VtZW50LCAndG91Y2hlbmQnLCB0aGlzLmJpbmRPbkRyYWdFbmQpO1xyXG5cclxuICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgIHRoaXMubGlzdGVuZXJPbmVNb3VzZU1vdmUgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbihkb2N1bWVudCwgJ21vdXNlbW92ZScsIHRoaXMuYmluZE9uZU1vdXNlVG91Y2hNb3ZlKTtcclxuICAgICAgdGhpcy5saXN0ZW5lck9uZVRvdWNoTW92ZSA9IHRoaXMucmVuZGVyZXIubGlzdGVuKGRvY3VtZW50LCAndG91Y2htb3ZlJywgdGhpcy5iaW5kT25lTW91c2VUb3VjaE1vdmUpO1xyXG4gICAgfSk7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQXR0YWNoZXMgbGlzdGVuZXJzIHRvIGB0b3VjaG1vdmVgIGFuZCBgbW91c2Vtb3ZlYCBldmVudHM7IGluaXRpYXRlcyB1cGRhdGluZyBjYXJvdXNlbCBhZnRlciBzdGFydGluZyBkcmFnZ2luZ1xyXG4gICAqIEBwYXJhbSBldmVudCBldmVudCBvYmplY2ggb2YgbW91c2Ugb3IgdG91Y2ggZXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIF9vbmVNb3VzZVRvdWNoTW92ZShldmVudCkge1xyXG4gICAgaWYgKCF0aGlzLl9kcmFnLmFjdGl2ZSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgY29uc3QgZGVsdGEgPSB0aGlzLl9kaWZmZXJlbmNlKHRoaXMuX2RyYWcucG9pbnRlciwgdGhpcy5fcG9pbnRlcihldmVudCkpO1xyXG4gICAgaWYgKHRoaXMubGlzdGVuZXJBVGFnKSB7XHJcbiAgICAgIHRoaXMubGlzdGVuZXJBVGFnKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5saXN0ZW5lck9uZU1vdXNlTW92ZSgpO1xyXG4gICAgdGhpcy5saXN0ZW5lck9uZVRvdWNoTW92ZSgpO1xyXG5cclxuICAgIGlmIChNYXRoLmFicyhkZWx0YS54KSA8IE1hdGguYWJzKGRlbHRhLnkpICYmIHRoaXMuX2lzKCd2YWxpZCcpKSB7XHJcbiAgICAgIHRoaXMuX2RyYWcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuX2RyYWcubW92aW5nID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLmJsb2NrQ2xpY2tBbmNob3JJbkRyYWdnaW5nKGV2ZW50KTtcclxuXHJcbiAgICB0aGlzLmxpc3RlbmVyTW91c2VNb3ZlID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oZG9jdW1lbnQsICdtb3VzZW1vdmUnLCB0aGlzLmJpbmRPbkRyYWdNb3ZlKTtcclxuICAgIHRoaXMubGlzdGVuZXJUb3VjaE1vdmUgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbihkb2N1bWVudCwgJ3RvdWNobW92ZScsIHRoaXMuYmluZE9uRHJhZ01vdmUpO1xyXG5cclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgdGhpcy5fZW50ZXJEcmFnZ2luZygpO1xyXG4gICAgdGhpcy5fb25lRHJhZ01vdmUkLm5leHQoZXZlbnQpO1xyXG4gICAgLy8gdGhpcy5fc2VuZENoYW5nZXMoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEF0dGFjaGVzIGhhbmRsZXIgdG8gSFRNTEFuY2hvckVsZW1lbnQgZm9yIHByZXZlbnRpbmcgY2xpY2sgd2hpbGUgY2Fyb3VzZWwgaXMgYmVpbmcgZHJhZ2dlZFxyXG4gICAqIEBwYXJhbSBldmVudCBldmVudCBvYmplY3RcclxuICAgKi9cclxuICBwcml2YXRlIGJsb2NrQ2xpY2tBbmNob3JJbkRyYWdnaW5nKGV2ZW50OiBhbnkpIHtcclxuICAgIGxldCB0YXJnZXQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IGV2ZW50LnRhcmdldDtcclxuICAgIHdoaWxlICh0YXJnZXQgJiYgISh0YXJnZXQgaW5zdGFuY2VvZiBIVE1MQW5jaG9yRWxlbWVudCkpIHtcclxuICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQ7XHJcbiAgICB9XHJcbiAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgSFRNTEFuY2hvckVsZW1lbnQpIHtcclxuICAgICAgdGhpcy5saXN0ZW5lckFUYWcgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0YXJnZXQsICdjbGljaycsICgpID0+IGZhbHNlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIFx0LyoqXHJcblx0ICogSGFuZGxlcyB0aGUgYHRvdWNobW92ZWAgYW5kIGBtb3VzZW1vdmVgIGV2ZW50cy5cclxuXHQgKiBAdG9kbyAjMjYxXHJcblx0ICogQHBhcmFtIGV2ZW50IC0gVGhlIGV2ZW50IGFyZ3VtZW50cy5cclxuXHQgKi9cclxuXHRwcml2YXRlIF9vbkRyYWdNb3ZlKGV2ZW50KSB7XHJcbiAgICBpZiAoIXRoaXMuX2RyYWcuYWN0aXZlKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgbGV0IHN0YWdlOiBDb29yZHM7XHJcbiAgICBjb25zdCBzdGFnZU9yRXhpdDogYm9vbGVhbiB8IENvb3JkcyA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmRlZmluZU5ld0Nvb3Jkc0RyYWcoZXZlbnQsIHRoaXMuX2RyYWcpO1xyXG5cclxuICAgIGlmIChzdGFnZU9yRXhpdCA9PT0gZmFsc2UpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgc3RhZ2UgPSBzdGFnZU9yRXhpdCBhcyBDb29yZHM7XHJcblxyXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICB0aGlzLl9kcmFnLnN0YWdlLmN1cnJlbnQgPSBzdGFnZTtcclxuXHRcdHRoaXMuX2FuaW1hdGUoc3RhZ2UueCAtIHRoaXMuX2RyYWcuc3RhZ2Uuc3RhcnQueCk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogTW92ZXMgLm93bC1zdGFnZSBsZWZ0LXJpZ2h0XHJcbiAgICogQHBhcmFtIGNvb3JkaW5hdGUgY29vcmRpbmF0ZSB0byBiZSBzZXQgdG8gLm93bC1zdGFnZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2FuaW1hdGUoY29vcmRpbmF0ZTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXSwgJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGUzZCgke2Nvb3JkaW5hdGV9cHgsMHB4LDBweGApO1xyXG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0sICd0cmFuc2l0aW9uJywgJzBzJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuXHQgKiBIYW5kbGVzIHRoZSBgdG91Y2hlbmRgIGFuZCBgbW91c2V1cGAgZXZlbnRzLlxyXG5cdCAqIEB0b2RvICMyNjFcclxuXHQgKiBAdG9kbyBUaHJlc2hvbGQgZm9yIGNsaWNrIGV2ZW50XHJcblx0ICogQHBhcmFtIGV2ZW50IC0gVGhlIGV2ZW50IGFyZ3VtZW50cy5cclxuXHQgKi9cclxuXHRwcml2YXRlIF9vbkRyYWdFbmQoZXZlbnQpIHtcclxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm93bERPTURhdGEuaXNHcmFiID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKHRoaXMuX2RyYWcubW92aW5nKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdLCAndHJhbnNmb3JtJywgYGApO1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXSwgJ3RyYW5zaXRpb24nLCB0aGlzLmNhcm91c2VsU2VydmljZS5zcGVlZCgrdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuZHJhZ0VuZFNwZWVkIHx8IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLnNtYXJ0U3BlZWQpLzEwMDAgKydzJyk7XHJcblxyXG4gICAgICB0aGlzLl9maW5pc2hEcmFnZ2luZyhldmVudCk7XHJcbiAgICAgIHRoaXMubGlzdGVuZXJNb3VzZU1vdmUoKTtcclxuICAgICAgdGhpcy5saXN0ZW5lclRvdWNoTW92ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2RyYWcgPSB7XHJcbiAgICAgIHRpbWU6IG51bGwsXHJcbiAgICAgIHRhcmdldDogbnVsbCxcclxuICAgICAgcG9pbnRlcjogbnVsbCxcclxuICAgICAgc3RhZ2U6IHtcclxuICAgICAgICBzdGFydDogbnVsbCxcclxuICAgICAgICBjdXJyZW50OiBudWxsXHJcbiAgICAgIH0sXHJcbiAgICAgIGRpcmVjdGlvbjogbnVsbCxcclxuICAgICAgYWN0aXZlOiBmYWxzZSxcclxuICAgICAgbW92aW5nOiBmYWxzZVxyXG4gICAgfTtcclxuXHJcbiAgICAvLyB0aGlzLmNhcm91c2VsU2VydmljZS50cmlnZ2VyKCdkcmFnZ2VkJyk7XHJcbiAgICB0aGlzLmxpc3RlbmVyTW91c2VVcCgpO1xyXG4gICAgdGhpcy5saXN0ZW5lclRvdWNoRW5kKCk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcblx0ICogUHJlcGFyZXMgZGF0YSBmb3IgZHJhZ2dpbmcgY2Fyb3VzZWwuIEl0IHN0YXJ0cyBhZnRlciBmaXJpbmcgYHRvdWNoc3RhcnRgIGFuZCBgbW91c2Vkb3duYCBldmVudHMuXHJcblx0ICogQHBhcmFtIGV2ZW50IC0gVGhlIGV2ZW50IGFyZ3VtZW50cy5cclxuXHQgKiBAcmV0dXJucyBzdGFnZSAtIG9iamVjdCB3aXRoICd4JyBhbmQgJ3knIGNvb3JkaW5hdGVzIG9mIC5vd2wtc3RhZ2VcclxuXHQgKi9cclxuICBwcml2YXRlIF9wcmVwYXJlRHJhZ2dpbmcoZXZlbnQ6IGFueSk6IENvb3JkcyB7XHJcbiAgICByZXR1cm4gdGhpcy5jYXJvdXNlbFNlcnZpY2UucHJlcGFyZURyYWdnaW5nKGV2ZW50KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEF0dGFjaGVzIGhhbmRsZXIgZm9yICdjbGljaycgZXZlbnQgb24gYW55IGVsZW1lbnQgaW4gLm93bC1zdGFnZSBpbiBvcmRlciB0byBwcmV2ZW50IGRyYWdnaW5nIHdoZW4gbW92aW5nIG9mIGN1cnNvciBpcyBsZXNzIHRoYW4gM3B4XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfb25lQ2xpY2tIYW5kbGVyID0gKCkgPT4ge1xyXG4gICAgdGhpcy5saXN0ZW5lck9uZUNsaWNrID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5fZHJhZy50YXJnZXQsICdjbGljaycsICgpID0+IGZhbHNlKVxyXG4gICAgdGhpcy5saXN0ZW5lck9uZUNsaWNrKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGaW5pc2hlcyBkcmFnZ2luZ1xyXG4gICAqIEBwYXJhbSBldmVudCBvYmplY3QgZXZlbnQgb2YgJ21vdXNlVXAnIG9mICd0b3VjaGVuZCcgZXZlbnRzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZmluaXNoRHJhZ2dpbmcoZXZlbnQ6IGFueSkge1xyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UuZmluaXNoRHJhZ2dpbmcoZXZlbnQsIHRoaXMuX2RyYWcsIHRoaXMuX29uZUNsaWNrSGFuZGxlcik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuXHQgKiBHZXRzIHVuaWZpZWQgcG9pbnRlciBjb29yZGluYXRlcyBmcm9tIGV2ZW50LlxyXG5cdCAqIEBwYXJhbSBldmVudCBUaGUgYG1vdXNlZG93bmAgb3IgYHRvdWNoc3RhcnRgIGV2ZW50LlxyXG5cdCAqIEByZXR1cm5zIENvbnRhaW5zIGB4YCBhbmQgYHlgIGNvb3JkaW5hdGVzIG9mIGN1cnJlbnQgcG9pbnRlciBwb3NpdGlvbi5cclxuXHQgKi9cclxuICBwcml2YXRlIF9wb2ludGVyKGV2ZW50OiBhbnkpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnBvaW50ZXIoZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcblx0ICogR2V0cyB0aGUgZGlmZmVyZW5jZSBvZiB0d28gdmVjdG9ycy5cclxuXHQgKiBAcGFyYW0gZmlyc3QgVGhlIGZpcnN0IHZlY3Rvci5cclxuXHQgKiBAcGFyYW0gc2Vjb25kLSBUaGUgc2Vjb25kIHZlY3Rvci5cclxuXHQgKiBAcmV0dXJucyBUaGUgZGlmZmVyZW5jZS5cclxuXHQgKi9cclxuICBwcml2YXRlIF9kaWZmZXJlbmNlKGZpcnN0QzogQ29vcmRzLCBzZWNvbmQ6IENvb3Jkcyk6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZGlmZmVyZW5jZShmaXJzdEMsIHNlY29uZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuXHQgKiBDaGVja3Mgd2hldGhlciB0aGUgY2Fyb3VzZWwgaXMgaW4gYSBzcGVjaWZpYyBzdGF0ZSBvciBub3QuXHJcblx0ICogQHBhcmFtIHNwZWNpZmljU3RhdGUgVGhlIHN0YXRlIHRvIGNoZWNrLlxyXG5cdCAqIEByZXR1cm5zIFRoZSBmbGFnIHdoaWNoIGluZGljYXRlcyBpZiB0aGUgY2Fyb3VzZWwgaXMgYnVzeS5cclxuXHQgKi9cclxuICBwcml2YXRlIF9pcyhzcGVjaWZpY1N0YXRlOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmNhcm91c2VsU2VydmljZS5pcyhzcGVjaWZpY1N0YXRlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogRW50ZXJzIGEgc3RhdGUuXHJcbiAgKiBAcGFyYW0gbmFtZSBUaGUgc3RhdGUgbmFtZS5cclxuICAqL1xyXG4gIHByaXZhdGUgX2VudGVyKG5hbWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UuZW50ZXIobmFtZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuXHQgKiBTZW5kcyBhbGwgZGF0YSBuZWVkZWQgZm9yIFZpZXcuXHJcblx0ICovXHJcbiAgcHJpdmF0ZSBfc2VuZENoYW5nZXMoKSB7XHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5zZW5kQ2hhbmdlcygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlciBmb3IgdHJhbnNpdGlvZW5kIGV2ZW50XHJcbiAgICovXHJcbiAgb25UcmFuc2l0aW9uRW5kKCkge1xyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uub25UcmFuc2l0aW9uRW5kKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuXHQgKiBFbnRlcnMgaW50byBhICdkcmFnZ2luZycgc3RhdGVcclxuXHQgKi9cclxuICBwcml2YXRlIF9lbnRlckRyYWdnaW5nKCkge1xyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UuZW50ZXJEcmFnZ2luZygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlcyB0aGUgZW5kIG9mICdhbmltYXRpb25lbmQnIGV2ZW50XHJcbiAgICogQHBhcmFtIGlkIElkIG9mIHNsaWRlc1xyXG4gICAqL1xyXG4gIGNsZWFyKGlkKSB7XHJcbiAgICB0aGlzLmFuaW1hdGVTZXJ2aWNlLmNsZWFyKGlkKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHtMb2NhdGlvblN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtBdHRyaWJ1dGUsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdEJpbmRpbmcsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBSZW5kZXJlcjIsIGlzRGV2TW9kZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7TmF2aWdhdGlvbkVuZCwgUm91dGVyRXZlbnQsIFJvdXRlciwgQWN0aXZhdGVkUm91dGUsIFVybFRyZWV9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmV4cG9ydCB0eXBlIFF1ZXJ5UGFyYW1zSGFuZGxpbmcgPSAnbWVyZ2UnIHwgJ3ByZXNlcnZlJyB8ICcnO1xuXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJzpub3QoYSlbb3dsUm91dGVyTGlua10nfSlcbmV4cG9ydCBjbGFzcyBPd2xSb3V0ZXJMaW5rRGlyZWN0aXZlIHtcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIEBJbnB1dCgpIHF1ZXJ5UGFyYW1zICE6IHtbazogc3RyaW5nXTogYW55fTtcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIEBJbnB1dCgpIGZyYWdtZW50ICE6IHN0cmluZztcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIEBJbnB1dCgpIHF1ZXJ5UGFyYW1zSGFuZGxpbmcgITogUXVlcnlQYXJhbXNIYW5kbGluZztcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIEBJbnB1dCgpIHByZXNlcnZlRnJhZ21lbnQgITogYm9vbGVhbjtcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIEBJbnB1dCgpIHNraXBMb2NhdGlvbkNoYW5nZSAhOiBib29sZWFuO1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgQElucHV0KCkgcmVwbGFjZVVybCAhOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHN0b3BMaW5rID0gZmFsc2U7XG4gIHByaXZhdGUgY29tbWFuZHM6IGFueVtdID0gW107XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBwcml2YXRlIHByZXNlcnZlICE6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICAgIEBBdHRyaWJ1dGUoJ3RhYmluZGV4JykgdGFiSW5kZXg6IHN0cmluZywgcmVuZGVyZXI6IFJlbmRlcmVyMiwgZWw6IEVsZW1lbnRSZWYpIHtcbiAgICBpZiAodGFiSW5kZXggPT0gbnVsbCkge1xuICAgICAgcmVuZGVyZXIuc2V0QXR0cmlidXRlKGVsLm5hdGl2ZUVsZW1lbnQsICd0YWJpbmRleCcsICcwJyk7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG93bFJvdXRlckxpbmsoY29tbWFuZHM6IGFueVtdfHN0cmluZykge1xuICAgIGlmIChjb21tYW5kcyAhPSBudWxsKSB7XG4gICAgICB0aGlzLmNvbW1hbmRzID0gQXJyYXkuaXNBcnJheShjb21tYW5kcykgPyBjb21tYW5kcyA6IFtjb21tYW5kc107XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29tbWFuZHMgPSBbXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgNC4wLjAgdXNlIGBxdWVyeVBhcmFtc0hhbmRsaW5nYCBpbnN0ZWFkLlxuICAgKi9cbiAgQElucHV0KClcbiAgc2V0IHByZXNlcnZlUXVlcnlQYXJhbXModmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAoaXNEZXZNb2RlKCkgJiYgPGFueT5jb25zb2xlICYmIDxhbnk+Y29uc29sZS53YXJuKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ3ByZXNlcnZlUXVlcnlQYXJhbXMgaXMgZGVwcmVjYXRlZCEsIHVzZSBxdWVyeVBhcmFtc0hhbmRsaW5nIGluc3RlYWQuJyk7XG4gICAgfVxuICAgIHRoaXMucHJlc2VydmUgPSB2YWx1ZTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpOiBib29sZWFuIHtcbiAgICBjb25zdCBleHRyYXMgPSB7XG4gICAgICBza2lwTG9jYXRpb25DaGFuZ2U6IGF0dHJCb29sVmFsdWUodGhpcy5za2lwTG9jYXRpb25DaGFuZ2UpLFxuICAgICAgcmVwbGFjZVVybDogYXR0ckJvb2xWYWx1ZSh0aGlzLnJlcGxhY2VVcmwpLFxuICAgIH07XG4gICAgaWYgKHRoaXMuc3RvcExpbmspIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGVCeVVybCh0aGlzLnVybFRyZWUsIGV4dHJhcyk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBnZXQgdXJsVHJlZSgpOiBVcmxUcmVlIHtcbiAgICByZXR1cm4gdGhpcy5yb3V0ZXIuY3JlYXRlVXJsVHJlZSh0aGlzLmNvbW1hbmRzLCB7XG4gICAgICByZWxhdGl2ZVRvOiB0aGlzLnJvdXRlLFxuICAgICAgcXVlcnlQYXJhbXM6IHRoaXMucXVlcnlQYXJhbXMsXG4gICAgICBmcmFnbWVudDogdGhpcy5mcmFnbWVudCxcbiAgICAgIHByZXNlcnZlUXVlcnlQYXJhbXM6IGF0dHJCb29sVmFsdWUodGhpcy5wcmVzZXJ2ZSksXG4gICAgICBxdWVyeVBhcmFtc0hhbmRsaW5nOiB0aGlzLnF1ZXJ5UGFyYW1zSGFuZGxpbmcsXG4gICAgICBwcmVzZXJ2ZUZyYWdtZW50OiBhdHRyQm9vbFZhbHVlKHRoaXMucHJlc2VydmVGcmFnbWVudCksXG4gICAgfSk7XG4gIH1cbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKiBMZXRzIHlvdSBsaW5rIHRvIHNwZWNpZmljIHJvdXRlcyBpbiB5b3VyIGFwcC5cbiAqXG4gKiBTZWUgYFJvdXRlckxpbmtgIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICpcbiAqIEBuZ01vZHVsZSBSb3V0ZXJNb2R1bGVcbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnYVtvd2xSb3V0ZXJMaW5rXSd9KVxuZXhwb3J0IGNsYXNzIE93bFJvdXRlckxpbmtXaXRoSHJlZkRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIEBIb3N0QmluZGluZygnYXR0ci50YXJnZXQnKSBASW5wdXQoKSB0YXJnZXQgITogc3RyaW5nO1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgQElucHV0KCkgcXVlcnlQYXJhbXMgIToge1trOiBzdHJpbmddOiBhbnl9O1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgQElucHV0KCkgZnJhZ21lbnQgITogc3RyaW5nO1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgQElucHV0KCkgcXVlcnlQYXJhbXNIYW5kbGluZyAhOiBRdWVyeVBhcmFtc0hhbmRsaW5nO1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgQElucHV0KCkgcHJlc2VydmVGcmFnbWVudCAhOiBib29sZWFuO1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgQElucHV0KCkgc2tpcExvY2F0aW9uQ2hhbmdlICE6IGJvb2xlYW47XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBASW5wdXQoKSByZXBsYWNlVXJsICE6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHN0b3BMaW5rID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBjb21tYW5kczogYW55W10gPSBbXTtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIHByaXZhdGUgcHJlc2VydmUgITogYm9vbGVhbjtcblxuICAvLyB0aGUgdXJsIGRpc3BsYXllZCBvbiB0aGUgYW5jaG9yIGVsZW1lbnQuXG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBASG9zdEJpbmRpbmcoKSBocmVmICE6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICAgcHJpdmF0ZSBsb2NhdGlvblN0cmF0ZWd5OiBMb2NhdGlvblN0cmF0ZWd5KSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24gPSByb3V0ZXIuZXZlbnRzLnN1YnNjcmliZSgoczogUm91dGVyRXZlbnQpID0+IHtcbiAgICAgIGlmIChzIGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCkge1xuICAgICAgICB0aGlzLnVwZGF0ZVRhcmdldFVybEFuZEhyZWYoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBvd2xSb3V0ZXJMaW5rKGNvbW1hbmRzOiBhbnlbXXxzdHJpbmcpIHtcbiAgICBpZiAoY29tbWFuZHMgIT0gbnVsbCkge1xuICAgICAgdGhpcy5jb21tYW5kcyA9IEFycmF5LmlzQXJyYXkoY29tbWFuZHMpID8gY29tbWFuZHMgOiBbY29tbWFuZHNdO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbW1hbmRzID0gW107XG4gICAgfVxuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IHByZXNlcnZlUXVlcnlQYXJhbXModmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAoaXNEZXZNb2RlKCkgJiYgPGFueT5jb25zb2xlICYmIDxhbnk+Y29uc29sZS53YXJuKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ3ByZXNlcnZlUXVlcnlQYXJhbXMgaXMgZGVwcmVjYXRlZCwgdXNlIHF1ZXJ5UGFyYW1zSGFuZGxpbmcgaW5zdGVhZC4nKTtcbiAgICB9XG4gICAgdGhpcy5wcmVzZXJ2ZSA9IHZhbHVlO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczoge30pOiBhbnkgeyB0aGlzLnVwZGF0ZVRhcmdldFVybEFuZEhyZWYoKTsgfVxuICBuZ09uRGVzdHJveSgpOiBhbnkgeyB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpOyB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudC5idXR0b24nLCAnJGV2ZW50LmN0cmxLZXknLCAnJGV2ZW50Lm1ldGFLZXknLCAnJGV2ZW50LnNoaWZ0S2V5J10pXG4gIG9uQ2xpY2soYnV0dG9uOiBudW1iZXIsIGN0cmxLZXk6IGJvb2xlYW4sIG1ldGFLZXk6IGJvb2xlYW4sIHNoaWZ0S2V5OiBib29sZWFuKTogYm9vbGVhbiB7XG4gICAgaWYgKGJ1dHRvbiAhPT0gMCB8fCBjdHJsS2V5IHx8IG1ldGFLZXkgfHwgc2hpZnRLZXkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdGhpcy50YXJnZXQgPT09ICdzdHJpbmcnICYmIHRoaXMudGFyZ2V0ICE9PSAnX3NlbGYnKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zdG9wTGluaykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IGV4dHJhcyA9IHtcbiAgICAgIHNraXBMb2NhdGlvbkNoYW5nZTogYXR0ckJvb2xWYWx1ZSh0aGlzLnNraXBMb2NhdGlvbkNoYW5nZSksXG4gICAgICByZXBsYWNlVXJsOiBhdHRyQm9vbFZhbHVlKHRoaXMucmVwbGFjZVVybCksXG4gICAgfTtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKHRoaXMudXJsVHJlZSwgZXh0cmFzKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVRhcmdldFVybEFuZEhyZWYoKTogdm9pZCB7XG4gICAgdGhpcy5ocmVmID0gdGhpcy5sb2NhdGlvblN0cmF0ZWd5LnByZXBhcmVFeHRlcm5hbFVybCh0aGlzLnJvdXRlci5zZXJpYWxpemVVcmwodGhpcy51cmxUcmVlKSk7XG4gIH1cblxuICBnZXQgdXJsVHJlZSgpOiBVcmxUcmVlIHtcbiAgICByZXR1cm4gdGhpcy5yb3V0ZXIuY3JlYXRlVXJsVHJlZSh0aGlzLmNvbW1hbmRzLCB7XG4gICAgICByZWxhdGl2ZVRvOiB0aGlzLnJvdXRlLFxuICAgICAgcXVlcnlQYXJhbXM6IHRoaXMucXVlcnlQYXJhbXMsXG4gICAgICBmcmFnbWVudDogdGhpcy5mcmFnbWVudCxcbiAgICAgIHByZXNlcnZlUXVlcnlQYXJhbXM6IGF0dHJCb29sVmFsdWUodGhpcy5wcmVzZXJ2ZSksXG4gICAgICBxdWVyeVBhcmFtc0hhbmRsaW5nOiB0aGlzLnF1ZXJ5UGFyYW1zSGFuZGxpbmcsXG4gICAgICBwcmVzZXJ2ZUZyYWdtZW50OiBhdHRyQm9vbFZhbHVlKHRoaXMucHJlc2VydmVGcmFnbWVudCksXG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gYXR0ckJvb2xWYWx1ZShzOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIHMgPT09ICcnIHx8ICEhcztcbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7XHJcbiAgQ2Fyb3VzZWxDb21wb25lbnQsXHJcbiAgQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZVxyXG59IGZyb20gJy4vY2Fyb3VzZWwuY29tcG9uZW50JztcclxuaW1wb3J0IHsgV0lORE9XX1BST1ZJREVSUyB9IGZyb20gJy4uL3NlcnZpY2VzL3dpbmRvdy1yZWYuc2VydmljZSc7XHJcbmltcG9ydCB7IFJlc2l6ZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9yZXNpemUuc2VydmljZSc7XHJcbmltcG9ydCB7IERPQ1VNRU5UX1BST1ZJREVSUyB9IGZyb20gJy4uL3NlcnZpY2VzL2RvY3VtZW50LXJlZi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3RhZ2VDb21wb25lbnQgfSBmcm9tICcuL3N0YWdlL3N0YWdlLmNvbXBvbmVudCc7XHJcbi8vIGltcG9ydCB7IEJyb3dzZXJBbmltYXRpb25zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcclxuZXhwb3J0IHtcclxuICBDYXJvdXNlbENvbXBvbmVudCxcclxuICBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlLFxyXG4gIFNsaWRlc091dHB1dERhdGFcclxufSBmcm9tICcuL2Nhcm91c2VsLmNvbXBvbmVudCc7XHJcblxyXG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUsIFJvdXRlcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IE93bFJvdXRlckxpbmtEaXJlY3RpdmUsIE93bFJvdXRlckxpbmtXaXRoSHJlZkRpcmVjdGl2ZSB9IGZyb20gJy4vb3dsLXJvdXRlci1saW5rLmRpcmVjdGl2ZSc7XHJcbmV4cG9ydCB7IE93bFJvdXRlckxpbmtEaXJlY3RpdmUsIE93bFJvdXRlckxpbmtXaXRoSHJlZkRpcmVjdGl2ZSB9IGZyb20gJy4vb3dsLXJvdXRlci1saW5rLmRpcmVjdGl2ZSc7XHJcblxyXG5jb25zdCByb3V0ZXM6IFJvdXRlcyA9IFtdO1xyXG5cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgLy8gQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUsIC8vIHRoZXJlJ3MgYW4gaXNzdWUgd2l0aCB0aGlzIGltcG9ydCB3aGlsZSB1c2luZyBsYXp5IGxvYWRpbmcgb2YgbW9kdWxlIGNvbnN1bWluZyB0aGlzIGxpYnJhcnkuIEkgZG9uJ3QgcmVtb3ZlIGl0IGJlY2F1c2UgaXQgY291bGQgYmUgbmVlZGVkIGR1cmluZyBmdXR1cmUgZW5oYW5jZW1lbnQgb2YgdGhpcyBsaWIuXHJcbiAgICBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQocm91dGVzKV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbQ2Fyb3VzZWxDb21wb25lbnQsIENhcm91c2VsU2xpZGVEaXJlY3RpdmUsIFN0YWdlQ29tcG9uZW50LCBPd2xSb3V0ZXJMaW5rRGlyZWN0aXZlLCBPd2xSb3V0ZXJMaW5rV2l0aEhyZWZEaXJlY3RpdmVdLFxyXG4gIGV4cG9ydHM6IFtDYXJvdXNlbENvbXBvbmVudCwgQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZSwgT3dsUm91dGVyTGlua0RpcmVjdGl2ZSwgT3dsUm91dGVyTGlua1dpdGhIcmVmRGlyZWN0aXZlXSxcclxuICBwcm92aWRlcnM6IFtXSU5ET1dfUFJPVklERVJTLCBSZXNpemVTZXJ2aWNlLCBET0NVTUVOVF9QUk9WSURFUlNdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDYXJvdXNlbE1vZHVsZSB7fVxyXG4iXSwibmFtZXMiOlsiU3ViamVjdCIsIkluamVjdGFibGUiLCJFdmVudE1hbmFnZXIiLCJ0YXAiLCJmaWx0ZXIiLCJtZXJnZSIsIkluamVjdGlvblRva2VuIiwidHNsaWJfMS5fX2V4dGVuZHMiLCJpc1BsYXRmb3JtQnJvd3NlciIsIlBMQVRGT1JNX0lEIiwiSW5qZWN0Iiwicm91dGVyIiwic2tpcCIsIkFjdGl2YXRlZFJvdXRlIiwiUm91dGVyIiwiRGlyZWN0aXZlIiwiVGVtcGxhdGVSZWYiLCJJbnB1dCIsIkV2ZW50RW1pdHRlciIsInN3aXRjaE1hcCIsImZpcnN0IiwiZGVsYXkiLCJDb21wb25lbnQiLCJFbGVtZW50UmVmIiwiQ29udGVudENoaWxkcmVuIiwiT3V0cHV0IiwidHJpZ2dlciIsInN0YXRlIiwic3R5bGUiLCJ0cmFuc2l0aW9uIiwiYW5pbWF0ZSIsIk5nWm9uZSIsIlJlbmRlcmVyMiIsIkhvc3RMaXN0ZW5lciIsImlzRGV2TW9kZSIsIkF0dHJpYnV0ZSIsIk5hdmlnYXRpb25FbmQiLCJMb2NhdGlvblN0cmF0ZWd5IiwiSG9zdEJpbmRpbmciLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSIsIlJvdXRlck1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO1FBd0JFLHVCQUFvQixZQUEwQjtZQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztZQUM1QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUlBLFlBQU8sRUFBRSxDQUFDO1lBQ25DLElBQUksQ0FBQyxZQUFZLENBQUMsc0JBQXNCLENBQ3RDLFFBQVEsRUFDUixRQUFRLEVBQ1IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ3pCLENBQUM7WUFDRixJQUFJLENBQUMsWUFBWSxDQUFDLHNCQUFzQixDQUN0QyxRQUFRLEVBQ1IsUUFBUSxFQUNSLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUN6QixDQUFDO1NBQ0g7UUFyQkQsc0JBQUksb0NBQVM7Ozs7Ozs7O2dCQUFiO2dCQUNFLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUMxQzs7O1dBQUE7Ozs7OztRQXlCTyxnQ0FBUTs7Ozs7c0JBQUMsS0FBYztnQkFDN0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLG1CQUFTLEtBQUssQ0FBQyxNQUFNLEVBQUMsQ0FBQzs7Ozs7OztRQU94QyxnQ0FBUTs7Ozs7c0JBQUMsS0FBYztnQkFDN0IsSUFBSSxDQUFDLFdBQVcscUJBQVcsS0FBSyxDQUFDLE1BQU0sQ0FBQSxDQUFDOzs7b0JBL0MzQ0MsZUFBVTs7Ozs7d0JBSkZDLDRCQUFZOzs7NEJBQXJCOzs7SUNBQTs7Ozs7Ozs7Ozs7Ozs7SUFjQTtJQUVBLElBQUksYUFBYSxHQUFHLFVBQVMsQ0FBQyxFQUFFLENBQUM7UUFDN0IsYUFBYSxHQUFHLE1BQU0sQ0FBQyxjQUFjO2FBQ2hDLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxZQUFZLEtBQUssSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQzVFLFVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQUUsSUFBSSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztvQkFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUMvRSxPQUFPLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDL0IsQ0FBQyxDQUFDO0FBRUYsdUJBQTBCLENBQUMsRUFBRSxDQUFDO1FBQzFCLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDcEIsZ0JBQWdCLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEVBQUU7UUFDdkMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLEtBQUssSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN6RixDQUFDO0FBRUQsSUFBTyxJQUFJLFFBQVEsR0FBRztRQUNsQixRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sSUFBSSxrQkFBa0IsQ0FBQztZQUMzQyxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDakQsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakIsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUFFLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7d0JBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNoRjtZQUNELE9BQU8sQ0FBQyxDQUFDO1NBQ1osQ0FBQTtRQUNELE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDM0MsQ0FBQyxDQUFBOzs7Ozs7Ozs7SUNqQ0Q7O1FBQUE7UUF5REU7eUJBeERRLENBQUM7d0JBQ0YsS0FBSzswQkFDSCxLQUFLOzBCQUNMLEtBQUs7NkJBRUYsSUFBSTs2QkFDSixJQUFJOzRCQUNMLElBQUk7NEJBQ0osS0FBSzswQkFFUCxDQUFDO2dDQUNLLENBQUM7eUJBRVIsS0FBSzs0QkFDRixJQUFJOzZCQUNILEtBQUs7aUNBRUQsQ0FBQzt1QkFDWCxLQUFLOzhCQUVFLEdBQUc7OEJBQ0gsS0FBSztnQ0FDSCxLQUFLOzhCQUVQLEVBQUU7eUNBQ1MsR0FBRzs7dUJBR3JCLEtBQUs7MkJBQ0QsQ0FBRSxNQUFNLEVBQUUsTUFBTSxDQUFFOzRCQUNqQixLQUFLOzJCQUNOLENBQUM7d0JBQ0osSUFBSTs0QkFDQSxLQUFLOzRCQUNMLEtBQUs7NkJBQ0osS0FBSzs7NEJBR04sS0FBSzttQ0FDRSxJQUFJO3NDQUNELEtBQUs7aUNBQ1YsS0FBSzs7NEJBR1YsS0FBSztpQ0FDQSxDQUFDOzs4QkFHSixLQUFLOzZCQUNOLEtBQUs7OzhCQUdKLEtBQUs7O21DQUdBLEtBQUs7U0FDTjtpQ0E5RG5CO1FBK0RDLENBQUE7Ozs7OztJQU9EOzs7O1FBQUE7UUF5REU7eUJBeERRLFFBQVE7d0JBQ1QsU0FBUzswQkFDUCxTQUFTOzBCQUNULFNBQVM7NkJBRU4sU0FBUzs2QkFDVCxTQUFTOzRCQUNWLFNBQVM7NEJBQ1QsU0FBUzswQkFFWCxRQUFRO2dDQUNGLFFBQVE7eUJBRWYsU0FBUzs0QkFDTixTQUFTOzZCQUNSLFNBQVM7aUNBRUwsZUFBZTt1QkFDekIsU0FBUzs4QkFFRixRQUFROzhCQUNSLFNBQVM7Z0NBQ1AsZ0JBQWdCOzhCQUVsQixFQUFFO3lDQUNTLFFBQVE7O3VCQUcxQixTQUFTOzJCQUNMLFVBQVU7NEJBQ1QsZ0JBQWdCOzJCQUNqQixlQUFlO3dCQUNsQixTQUFTOzRCQUNMLGdCQUFnQjs0QkFDaEIsU0FBUzs2QkFDUixnQkFBZ0I7OzRCQUdqQixTQUFTO21DQUNGLFFBQVE7c0NBQ0wsU0FBUztpQ0FDZCxnQkFBZ0I7OzRCQUdyQixTQUFTO2lDQUNKLFFBQVE7OzhCQUdYLGdCQUFnQjs2QkFDakIsZ0JBQWdCOzs4QkFHZixTQUFTOzttQ0FHSixTQUFTO1NBQ1Y7b0NBL0huQjtRQWdJQyxDQUFBOzs7Ozs7OztRQ2xHQSxPQUFRLE9BQU87UUFDZixPQUFRLE9BQU87Ozs7UUFRZixTQUFVLFNBQVM7UUFDbkIsT0FBUSxPQUFPO1FBQ2YsT0FBUSxPQUFPOzs7UUFrY2Y7WUFBQSxpQkFBaUI7Ozs7eUNBdmFlLElBQUlGLFlBQU8sRUFBdUI7Ozs7eUNBSWxDLElBQUlBLFlBQU8sRUFBVTs7Ozs0Q0FLbEIsSUFBSUEsWUFBTyxFQUFPOzs7OzZDQUtqQixJQUFJQSxZQUFPLEVBQU87Ozs7dUNBSXhCLElBQUlBLFlBQU8sRUFBVTs7Ozt3Q0FJcEIsSUFBSUEsWUFBTyxFQUFVOzs7O29DQUl6QixJQUFJQSxZQUFPLEVBQVU7Ozs7cUNBSXBCLElBQUlBLFlBQU8sRUFBVTs7OztxQ0FJckIsSUFBSUEsWUFBTyxFQUFVOzs7O3VDQUluQixJQUFJQSxZQUFPLEVBQVU7Ozs7a0NBSTFCLElBQUlBLFlBQU8sRUFBVTs7OztxQ0FJbEIsSUFBSUEsWUFBTyxFQUFVOzs7OzRCQUt6QjtnQkFDdkIsS0FBSyxFQUFFLENBQUM7YUFDUjs7Ozs4QkFLd0I7Z0JBQ3hCLEdBQUcsRUFBRSxLQUFLO2dCQUNWLFlBQVksRUFBRSxLQUFLO2dCQUNuQixXQUFXLEVBQUUsS0FBSztnQkFDbEIsUUFBUSxFQUFFLEtBQUs7Z0JBQ2YsU0FBUyxFQUFFLEtBQUs7Z0JBQ2hCLGVBQWUsRUFBRSxLQUFLO2dCQUN0QixNQUFNLEVBQUUsS0FBSztnQkFDYixlQUFlLEVBQUUsS0FBSzthQUN0Qjs7Ozs2QkFLc0I7Z0JBQ3RCLFNBQVMsRUFBRSwwQkFBMEI7Z0JBQ3JDLFVBQVUsRUFBRSxJQUFJO2dCQUNoQixLQUFLLEVBQUUsQ0FBQztnQkFDUixRQUFRLEVBQUUsQ0FBQztnQkFDWCxRQUFRLEVBQUUsQ0FBQzthQUNYOzs7OzBCQXlCMEMsRUFBRTs7OzsyQkFLbkIsRUFBRTs7Ozs0QkFLSixFQUFFOzs7OzRCQUtGLEVBQUU7Ozs7NEJBS1EsSUFBSTs7OzsyQkFLYixFQUFFOzs7Ozs0QkFNQSxFQUFFOzs7OzBCQUtHLElBQUk7Ozs7O2dDQU1ILEVBQUU7Ozs7OytCQU1SLElBQUk7Ozs7a0NBS2QsU0FBUzs7Ozs0QkFLSCxFQUFFOzs7O2dDQUtJLEVBQUU7Ozs7MkJBU0o7Z0JBQ3hCLE9BQU8sRUFBRSxFQUFFO2dCQUNYLElBQUksRUFBRTtvQkFDSixZQUFZLEVBQUUsQ0FBQyxNQUFNLENBQUM7b0JBQ3RCLFNBQVMsRUFBRSxDQUFDLE1BQU0sQ0FBQztvQkFDbkIsUUFBUSxFQUFFLENBQUMsYUFBYSxDQUFDO2lCQUMxQjthQUNGOzs7O3lCQVVzQjs7Ozs7OztnQkFPckI7b0JBQ0UsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxVQUFVLENBQUM7b0JBQ3RDLEdBQUcsRUFBRSxVQUFBLEtBQUs7d0JBQ1IsS0FBSyxDQUFDLE9BQU8sR0FBRyxLQUFJLENBQUMsTUFBTSxJQUFJLEtBQUksQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7cUJBQzdFO2lCQUNGOzs7Ozs7O2dCQU9GO29CQUNHLE1BQU0sRUFBRSxDQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsVUFBVSxDQUFFO29CQUN4QyxHQUFHLEVBQUUsVUFBQyxLQUFLOzt3QkFDVCxJQUFNLE1BQU0sR0FBRyxLQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBTXJDOzt3QkFOSixJQUNFLElBQUksR0FBRyxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUs3Qjs7d0JBTkosSUFFRSxHQUFHLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBSXJCOzt3QkFOSixJQUdFLEdBQUcsR0FBRzs0QkFDSixhQUFhLEVBQUUsR0FBRyxHQUFHLE1BQU0sR0FBRyxFQUFFOzRCQUNoQyxjQUFjLEVBQUUsR0FBRyxHQUFHLEVBQUUsR0FBRyxNQUFNO3lCQUNsQyxDQUFDO3dCQUVKLElBQUcsQ0FBQyxJQUFJLEVBQUU7NEJBQ2IsS0FBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLO2dDQUM1QixLQUFLLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQ0FDbkMsS0FBSyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7NkJBQ3BDLENBQUMsQ0FBQzt5QkFDSDt3QkFFRyxLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztxQkFDakI7aUJBQ0YsRUFBRTtvQkFDRCxNQUFNLEVBQUUsQ0FBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBRTtvQkFDeEMsR0FBRyxFQUFFLFVBQUMsS0FBSzs7d0JBQ1QsSUFBTSxLQUFLLEdBQVEsQ0FBQyxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxLQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBRTVFOzt3QkFGZCxJQUNFLElBQUksR0FBRyxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUNuQjs7d0JBRmQsSUFFRSxNQUFNLEdBQUcsRUFBRSxDQUFDOzt3QkFDbEIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUNnQjs7d0JBRGhDLElBQ0UsUUFBUSxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO3dCQUU1QixLQUFLLENBQUMsS0FBSyxHQUFHOzRCQUNaLEtBQUssRUFBRSxLQUFLOzRCQUNaLEtBQUssRUFBRSxLQUFLO3lCQUNiLENBQUM7d0JBRUYsT0FBTyxRQUFRLEVBQUUsRUFBRTs0QkFDakIsS0FBSyxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7NEJBQ2hDLEtBQUssR0FBRyxLQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQzs0QkFDaEYsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQzs0QkFFbkQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxHQUFHLEtBQUssR0FBRyxLQUFLLEdBQUcsS0FBSyxDQUFDO3lCQUM5Rzt3QkFFTCxLQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQzt3QkFFdEIsS0FBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLLEVBQUUsQ0FBQzs0QkFDaEMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUM5QixLQUFLLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7NEJBQzFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQzt5QkFDekMsQ0FBQyxDQUFDO3FCQUNBO2lCQUNGLEVBQUU7b0JBQ0QsTUFBTSxFQUFFLENBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBRTtvQkFDL0IsR0FBRyxFQUFFOzt3QkFDSCxJQUFNLE1BQU0sR0FBVSxFQUFFLENBS2lCOzt3QkFMekMsSUFDRSxLQUFLLEdBQTZCLEtBQUksQ0FBQyxNQUFNLENBSU47O3dCQUx6QyxJQUVFLFFBQVEsR0FBUSxLQUFJLENBQUMsUUFBUSxDQUdVOzt3QkFMekM7O3dCQUlFLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUNDOzt3QkFMekMsSUFLRSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7d0JBQzdDLElBQUssTUFBTSxHQUFVLEVBQUUsQ0FFcUU7O3dCQUY1RixJQUNNLE9BQU8sR0FBVSxFQUFFLENBQ21FOzt3QkFGNUYsSUFFQyxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFFeEYsTUFBTSxJQUFJLENBQUMsQ0FBQzt3QkFFWixPQUFPLE1BQU0sRUFBRSxFQUFFOzs0QkFFZixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQzs0QkFDckQsTUFBTSxDQUFDLElBQUksY0FBTSxLQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQzs0QkFDbkUsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7NEJBQzlFLE9BQU8sQ0FBQyxPQUFPLGNBQU0sS0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7eUJBQzlEO3dCQUVMLEtBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO3dCQUV0QixNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFBLEtBQUs7NEJBQ3hCLEtBQUssQ0FBQyxFQUFFLEdBQUcsS0FBRyxLQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQyxFQUFJLENBQUM7NEJBQy9DLEtBQUssQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDOzRCQUN2QixLQUFLLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQzs0QkFDdEIsT0FBTyxLQUFLLENBQUM7eUJBQ2IsQ0FBQyxDQUFDO3dCQUVILE9BQU8sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUEsS0FBSzs0QkFDMUIsS0FBSyxDQUFDLEVBQUUsR0FBRyxLQUFHLEtBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDLEVBQUksQ0FBQzs0QkFDL0MsS0FBSyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7NEJBQ3ZCLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDOzRCQUN0QixPQUFPLEtBQUssQ0FBQzt5QkFDYixDQUFDLENBQUM7d0JBRUgsS0FBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7cUJBQzlEO2lCQUNGLEVBQUU7b0JBQ0QsTUFBTSxFQUFFLENBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxVQUFVLENBQUU7b0JBQ3hDLEdBQUcsRUFBRTs7d0JBQ0gsSUFBTSxHQUFHLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUVuQjs7d0JBRm5CLElBQ0UsSUFBSSxHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUM5Qjs7d0JBRm5CLElBRUUsV0FBVyxHQUFHLEVBQUUsQ0FBQzs7d0JBQ25CLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUVIOzt3QkFGZCxJQUNFLFFBQVEsR0FBRyxDQUFDLENBQ0E7O3dCQUZkLElBRUUsT0FBTyxHQUFHLENBQUMsQ0FBQzt3QkFFZCxPQUFPLEVBQUUsUUFBUSxHQUFHLElBQUksRUFBRTs0QkFDeEIsUUFBUSxHQUFHLFdBQVcsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUMxQyxPQUFPLEdBQUcsS0FBSSxDQUFDLE9BQU8sQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7NEJBQ3ZFLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sR0FBRyxHQUFHLENBQUMsQ0FBQzt5QkFDNUM7d0JBRUQsS0FBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUM7cUJBQ2pDO2lCQUNGLEVBQUU7b0JBQ0QsTUFBTSxFQUFFLENBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxVQUFVLENBQUU7b0JBQ3hDLEdBQUcsRUFBRTs7d0JBQ0gsSUFBTSxPQUFPLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBTTNDOzt3QkFOQyxJQUNFLFdBQVcsR0FBRyxLQUFJLENBQUMsWUFBWSxDQUtsQzs7d0JBTkMsSUFFRSxHQUFHLEdBQUc7NEJBQ0osT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxHQUFHLENBQUM7NEJBQy9FLGNBQWMsRUFBRSxPQUFPLElBQUksRUFBRTs0QkFDN0IsZUFBZSxFQUFFLE9BQU8sSUFBSSxFQUFFO3lCQUNwQyxDQUFDO3dCQUVILEtBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7d0JBQ2pDLEtBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQzt3QkFDOUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO3FCQUM1QztpQkFDRixFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQkF3QkQsTUFBTSxFQUFFLENBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxVQUFVLENBQUU7b0JBQ3hDLEdBQUcsRUFBRSxVQUFBLEtBQUs7O3dCQUNSLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLEdBQUcsS0FBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsRUFBRSxLQUFLLEtBQUssQ0FBQyxPQUFPLEdBQUEsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDakcsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7d0JBQ3RFLEtBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7cUJBQ3JCO2lCQUNGLEVBQUU7b0JBQ0QsTUFBTSxFQUFFLENBQUUsVUFBVSxDQUFFO29CQUN0QixHQUFHLEVBQUU7d0JBQ0gsS0FBSSxDQUFDLE9BQU8sQ0FBQyxLQUFJLENBQUMsV0FBVyxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO3FCQUMvQztpQkFDRixFQUFFO29CQUNELE1BQU0sRUFBRSxDQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBRTtvQkFDcEQsR0FBRyxFQUFFOzt3QkFDSCxJQUFNLEdBQUcsR0FBRyxLQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBRTVCOzt3QkFGVixJQUNILE9BQU8sR0FBRyxLQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQzNCOzt3QkFGVixJQUVILE9BQU8sR0FBRyxFQUFFLENBQUM7O3dCQUNkLElBQUksS0FBSyxDQUEwQjs7d0JBQW5DLElBQVcsR0FBRyxDQUFxQjs7d0JBQW5DLElBQWdCLEtBQUssQ0FBYzs7d0JBQW5DLElBQXVCLEtBQUssQ0FBTzs7d0JBQW5DLElBQThCLENBQUMsQ0FBSTs7d0JBQW5DLElBQWlDLENBQUMsQ0FBQzt3QkFFbkMsS0FBSyxHQUFHLEtBQUksQ0FBQyxXQUFXLENBQUMsS0FBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7d0JBQ3pDLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUyxFQUFFOzRCQUMvQixLQUFLLElBQUksT0FBTyxDQUFDO3lCQUNqQjs2QkFBTTs0QkFDTixLQUFLLEdBQUcsQ0FBQyxDQUFDO3lCQUNWO3dCQUVELEdBQUcsR0FBRyxLQUFLLEdBQUcsS0FBSSxDQUFDLEtBQUssRUFBRSxHQUFHLEdBQUcsQ0FBQzt3QkFFakMsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLElBQUksS0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7OzRCQUN2QyxJQUFNLE1BQU0sR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxVQUFBLE9BQU87Z0NBQzlDLE9BQU8sS0FBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLElBQUksS0FBSyxHQUFHLE9BQU8sR0FBRyxLQUFLLENBQUM7NkJBQzFFLENBQUMsQ0FBQzs0QkFDSCxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7eUJBQzFEO3dCQUVHLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTs0QkFDcEQsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7NEJBQ3RELEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sR0FBRyxHQUFHLENBQUMsQ0FBQzs0QkFFN0QsSUFBSSxDQUFDLEtBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsS0FBSyxLQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7b0NBQzFELEtBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsSUFBSSxLQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRTtnQ0FDL0QsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzs2QkFDakI7eUJBQ047d0JBRUQsS0FBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLOzRCQUM1QixLQUFLLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQzs0QkFDdkIsT0FBTyxLQUFLLENBQUM7eUJBQ2IsQ0FBQyxDQUFDO3dCQUNILE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJOzRCQUNuQixLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7eUJBQ3RDLENBQUMsQ0FBQzt3QkFFQyxJQUFJLEtBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFOzRCQUM3QixLQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUs7Z0NBQzVCLEtBQUssQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO2dDQUN6QixPQUFPLEtBQUssQ0FBQzs2QkFDYixDQUFDLENBQUM7NEJBQ0gsS0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO3lCQUM5QztxQkFDRjtpQkFDRjthQUNGO1NBRWU7UUE5UGhCLHNCQUFJLHdDQUFXOzs7O2dCQUFmO2dCQUNFLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQzthQUMxQjs7O1dBQUE7UUFjRCxzQkFBSSxtQ0FBTTs7OztnQkFBVjtnQkFDRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7YUFDdEI7OztXQUFBOzs7Ozs7Ozs7UUFrUEQsNENBQWtCOzs7O1lBQWxCO2dCQUNDLE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDLFlBQVksRUFBRSxDQUFDO2FBQ2pEOzs7Ozs7Ozs7UUFNRCw2Q0FBbUI7Ozs7WUFBbkI7Z0JBQ0MsT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUMsWUFBWSxFQUFFLENBQUE7YUFDaEQ7Ozs7Ozs7OztRQU1ELHdDQUFjOzs7O1lBQWQ7Z0JBQ0MsT0FBTyxJQUFJLENBQUMsd0JBQXdCLENBQUMsWUFBWSxFQUFFLENBQUM7YUFDcEQ7Ozs7Ozs7OztRQU1ELHlDQUFlOzs7O1lBQWY7Z0JBQ0MsT0FBTyxJQUFJLENBQUMseUJBQXlCLENBQUMsWUFBWSxFQUFFLENBQUM7YUFDckQ7Ozs7Ozs7OztRQU1ELDJDQUFpQjs7OztZQUFqQjtnQkFDQyxPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUMvQzs7Ozs7Ozs7O1FBTUQsNENBQWtCOzs7O1lBQWxCO2dCQUNDLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLFlBQVksRUFBRSxDQUFDO2FBQ2hEOzs7Ozs7Ozs7UUFNRCx3Q0FBYzs7OztZQUFkO2dCQUNDLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxDQUFDO2FBQzVDOzs7Ozs7Ozs7UUFNRCx5Q0FBZTs7OztZQUFmO2dCQUNDLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDO2FBQzdDOzs7Ozs7Ozs7UUFNRCx5Q0FBZTs7OztZQUFmO2dCQUNDLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDO2FBQzdDOzs7Ozs7Ozs7UUFNRCwyQ0FBaUI7Ozs7WUFBakI7Z0JBQ0MsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsWUFBWSxFQUFFLENBQUM7YUFDL0M7Ozs7Ozs7OztRQU1ELHNDQUFZOzs7O1lBQVo7Z0JBQ0MsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDO2FBQzFDOzs7Ozs7Ozs7UUFNRCx5Q0FBZTs7OztZQUFmO2dCQUNDLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDO2FBQzdDOzs7Ozs7Ozs7O1FBTUQsb0NBQVU7Ozs7O1lBQVYsVUFBVyxPQUFtQjs7Z0JBQzdCLElBQU0sYUFBYSxHQUFlLElBQUksa0JBQWtCLEVBQUUsQ0FBQzs7Z0JBQzNELElBQU0sY0FBYyxHQUFlLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUM7Z0JBQ2pGLElBQUksQ0FBQyxRQUFRLGdCQUFRLGFBQWEsRUFBSyxjQUFjLENBQUMsQ0FBQzthQUN2RDs7Ozs7Ozs7OztRQVdPLDBDQUFnQjs7Ozs7Ozs7O3NCQUFDLE9BQW1CLEVBQUUsYUFBeUI7O2dCQUN0RSxJQUFNLGNBQWMsZ0JBQW9CLE9BQU8sRUFBRTs7Z0JBQ2pELElBQU0sV0FBVyxHQUFHLElBQUkscUJBQXFCLEVBQUUsQ0FBQzt3Q0FFckMsR0FBRztvQkFDYixJQUFJLGNBQWMsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7O3dCQUd2QyxJQUFJLFdBQVcsQ0FBQyxHQUFHLENBQUMsS0FBSyxRQUFRLEVBQUU7NEJBQ2xDLElBQUksT0FBSyxVQUFVLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0NBQ3pDLGNBQWMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQ0FDM0MsY0FBYyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsS0FBSyxPQUFPLEdBQUcsT0FBSyxjQUFjLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDOzZCQUN2RztpQ0FBTTtnQ0FDTixjQUFjLENBQUMsR0FBRyxDQUFDLEdBQUcsY0FBYyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQzs2QkFDNUQ7eUJBQ0Q7NkJBQU0sSUFBSSxXQUFXLENBQUMsR0FBRyxDQUFDLEtBQUssU0FBUyxJQUFJLE9BQU8sY0FBYyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVMsRUFBRTs0QkFDdEYsY0FBYyxDQUFDLEdBQUcsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7eUJBQzVEOzZCQUFNLElBQUksV0FBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLGdCQUFnQixJQUFJLENBQUMsT0FBSyxrQkFBa0IsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTs0QkFDbEcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7eUJBQzVEOzZCQUFNLElBQUksV0FBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLGVBQWUsSUFBSSxDQUFDLE9BQUssaUJBQWlCLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7NEJBQ2hHLGNBQWMsQ0FBQyxHQUFHLENBQUMsR0FBRyxjQUFjLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO3lCQUM1RDs2QkFBTSxJQUFJLFdBQVcsQ0FBQyxHQUFHLENBQUMsS0FBSyxnQkFBZ0IsSUFBSSxDQUFDLE9BQUssa0JBQWtCLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7NEJBQ2xHLGNBQWMsQ0FBQyxHQUFHLENBQUMsR0FBRyxjQUFjLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO3lCQUM1RDs2QkFBTSxJQUFJLFdBQVcsQ0FBQyxHQUFHLENBQUMsS0FBSyxVQUFVLEVBQUU7NEJBQzNDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTs7Z0NBQ3ZDLElBQUksVUFBUSxHQUFHLEtBQUssQ0FBQztnQ0FDckIsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLE9BQU87b0NBQ2xDLFVBQVEsR0FBRyxPQUFPLE9BQU8sS0FBSyxRQUFRLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQztpQ0FDdEQsQ0FBQyxDQUFDO2dDQUNILElBQUksQ0FBQyxVQUFRLEVBQUU7b0NBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUE7aUNBQUU7NkJBQzlFO2lDQUFNO2dDQUNOLGNBQWMsQ0FBQyxHQUFHLENBQUMsR0FBRyxjQUFjLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDOzZCQUM1RDt5QkFDRDtxQkFDRDs7O2dCQTlCRixLQUFLLElBQU0sR0FBRyxJQUFJLGNBQWM7NEJBQXJCLEdBQUc7aUJBK0JiOzs7Ozs7Z0JBRUQsd0JBQXdCLElBQVksRUFBRSxHQUFRO29CQUM3QyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQVcsR0FBRyx5QkFBb0IsSUFBSSxVQUFLLEdBQUcsU0FBSSxPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUF5QixHQUFHLFNBQUksYUFBYSxDQUFDLEdBQUcsQ0FBRyxDQUFDLENBQUM7b0JBQ2hJLE9BQU8sYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUMxQjtnQkFFRCxPQUFPLGNBQWMsQ0FBQzs7Ozs7OztRQVFmLHdDQUFjOzs7OztzQkFBQyxLQUFhOztnQkFDbkMsSUFBSSxNQUFNLENBQVM7Z0JBQ25CLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO29CQUNoQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUU7b0JBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0pBQWtKLENBQUMsQ0FBQztpQkFDaEs7cUJBQU07b0JBQ04sTUFBTSxHQUFHLEtBQUssQ0FBQztpQkFDZjtnQkFDRCxPQUFPLE1BQU0sQ0FBQzs7Ozs7Ozs7Ozs7UUFPZiwwQ0FBZ0I7Ozs7O1lBQWhCLFVBQWlCLEtBQWE7Z0JBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2FBQ3BCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFVQSwrQkFBSzs7Ozs7Ozs7O1lBQUwsVUFBTSxhQUFxQixFQUFFLE1BQWdDLEVBQUUsT0FBbUI7Z0JBQ2xGLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDckMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBRXpCLElBQUksQ0FBQyxRQUFRLGdCQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFFcEMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7Z0JBRXpCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDbEYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2FBQ25GOzs7Ozs7OztRQUtELDJDQUFpQjs7OztZQUFqQjs7Z0JBQ0MsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FDVzs7Z0JBRHZDLElBQ0MsVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDOztnQkFDdkMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBRWYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxFQUFFO29CQUNwQyxPQUFPO2lCQUNQO2dCQUVELElBQUksQ0FBQyxRQUFRLEVBQUU7b0JBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO29CQUN4QixPQUFPO2lCQUNQO2dCQUVELEtBQUssSUFBTSxHQUFHLElBQUksVUFBVSxFQUFFO29CQUM3QixJQUFJLFVBQVUsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7d0JBQ25DLElBQUksQ0FBQyxHQUFHLElBQUksUUFBUSxJQUFJLENBQUMsR0FBRyxHQUFHLEtBQUssRUFBRTs0QkFDckMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzt5QkFDcEI7cUJBQ0Q7aUJBQ0Q7Z0JBRUQsSUFBSSxDQUFDLFFBQVEsZ0JBQVEsSUFBSSxDQUFDLFFBQVEsSUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUMsQ0FBQzs7OztnQkFJekYsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQztnQkFDaEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO2dCQUNwQyxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztnQkFFekIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUM1Qjs7Ozs7Ozs7OztRQU1BLG9DQUFVOzs7OztZQUFWLFVBQVcsTUFBZ0M7Z0JBQTNDLGlCQXdCQTtnQkF2QkEsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQzs7Z0JBRzNCLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO2dCQUV4QyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTs7b0JBQ2xCLElBQU0sTUFBTSxHQUFXLEtBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO29CQUNoRSxLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDM0IsQ0FBQyxDQUFDO2dCQUVILElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBRTVGLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFFZixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO2dCQUMxRCxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQztnQkFFMUQsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUVuQixJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQzdCOzs7Ozs7OztRQUtELHFDQUFXOzs7O1lBQVg7Z0JBQ0MsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQztvQkFDL0IsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO29CQUMzQixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7b0JBQ3pCLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtvQkFDM0IsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO29CQUNyQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7aUJBQ3ZCLENBQUMsQ0FBQzthQUNIOzs7OztRQU1RLHVDQUFhOzs7OztnQkFDckIsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRTtvQkFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO29CQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7aUJBQzVCOzs7Ozs7Ozs7UUFNRCxnQ0FBTTs7OztZQUFOO2dCQUFBLGlCQXFCQzs7Z0JBcEJDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzs7Z0JBQ1YsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBRWpCOztnQkFGVixJQUNFLE1BQU0sR0FBRyxVQUFBLElBQUksSUFBSSxPQUFBLEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUEsQ0FDaEM7O2dCQUZWLElBRUQsS0FBSyxHQUFHLEVBQUUsQ0FBQztnQkFFVixPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7O29CQUNaLElBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDekQsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsSUFBSSxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTt3QkFDeEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQ3RCO29CQUNELENBQUMsRUFBRSxDQUFDO2lCQUNQO2dCQUNELElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLE9BQU8sR0FBRyxLQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLEdBQUEsQ0FBQyxDQUFDO2dCQUNqRixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBRWpCLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO2dCQUV2QixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRTtvQkFDckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDckI7YUFDRjs7Ozs7Ozs7Ozs7UUFPRCwrQkFBSzs7Ozs7WUFBTCxVQUFNLFNBQWlCO2dCQUN2QixTQUFTLEdBQUcsU0FBUyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUM7Z0JBQ3ZDLFFBQVEsU0FBUztvQkFDaEIsS0FBSyxLQUFLLENBQUMsS0FBSyxDQUFDO29CQUNqQixLQUFLLEtBQUssQ0FBQyxLQUFLO3dCQUNmLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztvQkFDcEI7d0JBQ0MsT0FBTyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztpQkFDNUU7YUFDRDs7Ozs7Ozs7UUFLQSxpQ0FBTzs7OztZQUFQO2dCQUNBLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2dCQUN6QixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztnQkFFekIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDOztnQkFJckIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDOztnQkFJZCxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUN6QixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQzFCOzs7Ozs7Ozs7O1FBTUQsa0NBQVE7Ozs7O1lBQVIsVUFBUyxRQUFnQjtnQkFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO29CQUN4QixPQUFPLEtBQUssQ0FBQztpQkFDYjtnQkFFRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBRWhDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7Ozs7O2dCQU12QixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN4QixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUV6QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBRWYsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUN6Qjs7Ozs7Ozs7Ozs7Ozs7O1FBU0EseUNBQWU7Ozs7Ozs7WUFBZixVQUFnQixLQUFVOztnQkFDMUIsSUFBSSxLQUFLLEdBQVcsSUFBSSxDQUNDOztnQkFEekIsSUFDRSxZQUFZLENBQVc7Ozs7Ozs7Z0JBU3pCLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMseUJBQXlCLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN4RixLQUFLLEdBQUc7b0JBQ04sQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztvQkFDbkIsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztpQkFDcEIsQ0FBQztnQkFFSixJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUU7b0JBQ3pCLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7aUJBQzFCO2dCQUVELElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxXQUFXLEVBQUU7b0JBQzlCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztpQkFDL0I7Z0JBRUgsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDZCxPQUFPLEtBQUssQ0FBQzthQUNiOzs7Ozs7OztRQUtELHVDQUFhOzs7O1lBQWI7Z0JBQ0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUN4Qjs7Ozs7Ozs7Ozs7Ozs7O1FBU0EsNkNBQW1COzs7Ozs7O1lBQW5CLFVBQW9CLEtBQVUsRUFBRSxRQUFhOztnQkFDN0MsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUVOOztnQkFGWixJQUNBLE9BQU8sR0FBRyxJQUFJLENBQ0Y7O2dCQUZaLElBRUEsSUFBSSxHQUFHLElBQUksQ0FBQzs7Z0JBQ1osSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FDZDs7Z0JBRHRELElBQ0MsS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBRXRELElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFO29CQUN6QixPQUFPLEtBQUssQ0FBQztpQkFDYjtnQkFFRCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFO29CQUN2QixPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztvQkFDM0MsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDO29CQUMxRCxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsT0FBTyxJQUFJLE9BQU8sR0FBRyxPQUFPLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQztpQkFDMUU7cUJBQU07b0JBQ04sT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztvQkFDbEcsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztvQkFDbEcsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDckQsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxPQUFPLEdBQUcsSUFBSSxDQUFDLEVBQUUsT0FBTyxHQUFHLElBQUksQ0FBQyxDQUFDO2lCQUN0RTtnQkFFRCxPQUFPLEtBQUssQ0FBQzthQUNiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFVQSx3Q0FBYzs7Ozs7Ozs7O1lBQWQsVUFBZSxLQUFVLEVBQUUsT0FBWSxFQUFFLGFBQXlCOztnQkFDbEUsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FFTDs7Z0JBRjlELElBQ00sS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUMyQjs7Z0JBRjlELElBRUUsU0FBUyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxNQUFNLEdBQUcsT0FBTyxDQUFDOztnQkFDOUQsSUFBSSxhQUFhLENBQThDOztnQkFBL0QsSUFBMkIsT0FBTyxDQUE2Qjs7Z0JBQS9ELElBQTRDLFVBQVUsQ0FBUztnQkFFM0QsSUFBSSxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRTtvQkFDN0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQ3hFLGFBQWEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDckYsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDckIsVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxLQUFLLENBQUMsQ0FBQyxHQUFHLFNBQVMsR0FBRyxhQUFhLENBQUMsQ0FBQztvQkFFaEYsSUFBSSxPQUFPLEtBQUssVUFBVSxFQUFFO3dCQUMzQixJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO3dCQUM1QixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7cUJBQ2Q7b0JBRUcsT0FBTyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7b0JBRTlCLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksR0FBRyxHQUFHLEVBQUU7d0JBQzNFLGFBQWEsRUFBRSxDQUFDO3FCQUNaO2lCQUNGO2dCQUNELElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFO29CQUN4QixPQUFPO2lCQUNSO2dCQUNKLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUE7YUFDeEI7Ozs7Ozs7Ozs7Ozs7OztRQVNELGlDQUFPOzs7Ozs7O1lBQVAsVUFBUSxVQUFrQixFQUFFLFNBQWlCOztnQkFDN0MsSUFBTSxJQUFJLEdBQUcsRUFBRSxDQUNPOztnQkFEdEIsSUFDQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDOztnQkFDdEIsSUFBSSxXQUFXLElBQWEsSUFBSSxDQUFDLFdBQVcsRUFBYyxFQUMzQzs7Z0JBRGYsSUFDQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBRWYsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtvQkFDekIsV0FBVyxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsVUFBQSxJQUFJO3dCQUNqQyxJQUFJLElBQUksS0FBSyxDQUFDLEVBQUU7NEJBQ2YsSUFBSSxJQUFJLFFBQVEsQ0FBQzt5QkFDakI7d0JBQ0QsT0FBTyxJQUFJLENBQUM7cUJBQ1osQ0FBQyxDQUFBO2lCQUNGOzs7Ozs7O2dCQVNBLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUU1QyxJQUFJLFNBQVMsS0FBSyxNQUFNLElBQUksVUFBVSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLElBQUksVUFBVSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEVBQUU7d0JBQ3JHLFFBQVEsR0FBRyxDQUFDLENBQUM7OztxQkFHYjt5QkFBTSxJQUFJLFNBQVMsS0FBSyxPQUFPLElBQUksVUFBVSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxJQUFJLFVBQVUsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksRUFBRTt3QkFDN0gsUUFBUSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQ2pCO3lCQUFNLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzsyQkFDaEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxFQUFFO3dCQUM1RSxRQUFRLEdBQUcsU0FBUyxLQUFLLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFDNUM7eUJBQU0sSUFBSSxTQUFTLEtBQUssSUFBSSxJQUFJLFVBQVUsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxJQUFJLFVBQVUsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFO3dCQUMxRyxRQUFRLEdBQUcsQ0FBQyxDQUFDO3FCQUNiO29CQUVELElBQUksUUFBUSxLQUFLLENBQUMsQ0FBQyxFQUFFO3dCQUFFLE1BQUs7cUJBQUU7aUJBQzlCOztnQkFHRixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7O29CQUV4QixJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRSxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRTt3QkFDM0QsUUFBUSxHQUFHLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7cUJBQ3ZDO3lCQUFNLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFO3dCQUNsRSxRQUFRLEdBQUcsVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztxQkFDdkM7aUJBQ0Q7Z0JBRUQsT0FBTyxRQUFRLENBQUM7YUFDZjs7Ozs7Ozs7Ozs7O1FBT0QsaUNBQU87Ozs7OztZQUFQLFVBQVEsVUFBNkI7O2dCQUNyQyxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUVqQyxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUU7b0JBQ3pCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztpQkFDdkI7Z0JBRUQsSUFBSSxPQUFPLEVBQUU7b0JBQ1osSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztpQkFDM0I7Z0JBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsY0FBYyxHQUFHLFVBQVUsR0FBRyxhQUFhLENBQUM7Z0JBQ3ZFLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLElBQUksSUFBSSxHQUFHLENBQUM7O2FBR3ZEOzs7Ozs7Ozs7OztRQU9ELDRCQUFFOzs7OztZQUFGLFVBQUcsS0FBYTtnQkFDaEIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDckU7Ozs7Ozs7Ozs7O1FBT0QsaUNBQU87Ozs7O1lBQVAsVUFBUSxRQUFpQjtnQkFDekIsSUFBSSxRQUFRLEtBQUssU0FBUyxFQUFFO29CQUMzQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7aUJBQ3JCO2dCQUVELElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO29CQUM3QixPQUFPLFNBQVMsQ0FBQztpQkFDakI7Z0JBRUQsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBRXBDLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxRQUFRLEVBQUU7O29CQUMvQixJQUFNLE9BQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQzs7OztvQkFNM0YsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7b0JBRXpCLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQzVCLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztpQkFDbkY7Z0JBRUQsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO2FBQ3BCOzs7Ozs7Ozs7OztRQU9ELG9DQUFVOzs7OztZQUFWLFVBQVcsSUFBWTtnQkFDdkIsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7b0JBQzdCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO29CQUMvQixJQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUU7d0JBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztxQkFBRTtpQkFDN0M7Z0JBQ0QsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUNyQzs7Ozs7Ozs7OztRQU1ELCtCQUFLOzs7OztZQUFMLFVBQU0sUUFBZ0I7Z0JBQ3RCLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUVwQyxJQUFJLFFBQVEsS0FBSyxTQUFTLEVBQUU7b0JBQzNCLE9BQU87aUJBQ1A7Z0JBRUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7Z0JBQ2hCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO2dCQUV6QixJQUFJLENBQUMsU0FBUyxDQUFDLENBQUUsV0FBVyxFQUFFLFlBQVksQ0FBRSxDQUFDLENBQUM7Z0JBRTlDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUV6QyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUUsV0FBVyxFQUFFLFlBQVksQ0FBRSxDQUFDLENBQUM7YUFDN0M7Ozs7Ozs7Ozs7Ozs7UUFRQSxtQ0FBUzs7Ozs7O1lBQVQsVUFBVSxRQUFnQixFQUFFLFFBQWtCOztnQkFDOUMsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQ2M7O2dCQUQxQyxJQUNHLENBQUMsR0FBRyxRQUFRLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO2dCQUUxQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUN4QyxRQUFRLEdBQUcsU0FBUyxDQUFDO2lCQUNyQjtxQkFBTSxJQUFJLFFBQVEsR0FBRyxDQUFDLElBQUksUUFBUSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQzdDLFFBQVEsR0FBRyxDQUFDLENBQUMsUUFBUSxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDcEQ7Z0JBRUQsT0FBTyxRQUFRLENBQUM7YUFDZjs7Ozs7Ozs7Ozs7UUFPRCxrQ0FBUTs7Ozs7WUFBUixVQUFTLFFBQWdCO2dCQUN6QixRQUFRLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2dCQUNwQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ3RDOzs7Ozs7Ozs7OztRQU9BLGlDQUFPOzs7OztZQUFQLFVBQVEsUUFBeUI7Z0JBQXpCLHlCQUFBO29CQUFBLGdCQUF5Qjs7O2dCQUNqQyxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDOztnQkFDL0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBR3hCOztnQkFIZCxJQUNDLFFBQVEsQ0FFSzs7Z0JBSGQsSUFFQyxvQkFBb0IsQ0FDUDs7Z0JBSGQsSUFHQyxZQUFZLENBQUM7Z0JBRWQsSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFO29CQUNsQixPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztpQkFDM0Q7cUJBQU0sSUFBSSxRQUFRLENBQUMsU0FBUyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUU7b0JBQ2hELFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztvQkFDOUIsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQztvQkFDekQsWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7b0JBQzNCLE9BQU8sUUFBUSxFQUFFLEVBQUU7O3dCQUVsQixvQkFBb0IsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO3dCQUNoRixJQUFJLG9CQUFvQixHQUFHLFlBQVksRUFBRTs0QkFDeEMsTUFBTTt5QkFDTjtxQkFDRDtvQkFDRCxPQUFPLEdBQUcsUUFBUSxHQUFHLENBQUMsQ0FBQztpQkFDdkI7cUJBQU0sSUFBSSxRQUFRLENBQUMsTUFBTSxFQUFFO29CQUMzQixPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2lCQUNqQztxQkFBTTtvQkFDTixPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQztpQkFDOUM7Z0JBRUQsSUFBSSxRQUFRLEVBQUU7b0JBQ2IsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztpQkFDbkM7Z0JBRUQsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQzthQUMzQjs7Ozs7Ozs7Ozs7UUFPRCxpQ0FBTzs7Ozs7WUFBUCxVQUFRLFFBQXlCO2dCQUF6Qix5QkFBQTtvQkFBQSxnQkFBeUI7O2dCQUNqQyxPQUFPLFFBQVEsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2FBQzlDOzs7Ozs7Ozs7OztRQU9BLCtCQUFLOzs7OztZQUFMLFVBQU0sUUFBaUI7Z0JBQ3ZCLElBQUksUUFBUSxLQUFLLFNBQVMsRUFBRTtvQkFDM0IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO2lCQUMzQjtnQkFFRCxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQzFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7YUFDOUI7Ozs7Ozs7Ozs7O1FBT0QsaUNBQU87Ozs7O1lBQVAsVUFBUSxRQUFnQjtnQkFDeEIsSUFBSSxRQUFRLEtBQUssU0FBUyxFQUFFO29CQUMzQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7aUJBQzdCO2dCQUVELFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDMUMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzlCOzs7Ozs7Ozs7OztRQU9ELGdDQUFNOzs7OztZQUFOLFVBQU8sUUFBaUI7O2dCQUN4QixJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBRXdDOztnQkFGM0UsSUFDQyxJQUFJLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUMyQzs7Z0JBRjNFLElBRUMsR0FBRyxHQUFHLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxHQUFHLEtBQUssR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUEsQ0FBQztnQkFFM0UsSUFBSSxRQUFRLEtBQUssU0FBUyxFQUFFO29CQUMzQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSyxPQUFBLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBQSxDQUFDLENBQUM7aUJBQzFDO2dCQUVELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxLQUFLLFFBQVEsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFBLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLEdBQUEsQ0FBQyxDQUFDO2FBQ3ZGOzs7Ozs7Ozs7OztRQU9BLCtCQUFLOzs7OztZQUFMLFVBQU0sS0FBYztnQkFDcEIsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO29CQUN4QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztpQkFDcEI7Z0JBRUQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO2FBQ25COzs7Ozs7Ozs7Ozs7O1FBUUEscUNBQVc7Ozs7OztZQUFYLFVBQVksUUFBaUI7Z0JBQTdCLGlCQTRCQzs7Z0JBM0JELElBQUksVUFBVSxHQUFHLENBQUMsQ0FHQTs7Z0JBSGxCLElBQ0MsV0FBVyxHQUFHLFFBQVEsR0FBRyxDQUFDLENBRVQ7O2dCQUhsQixJQUVDLFVBQVUsQ0FDTzs7Z0JBSGxCLElBR0MsTUFBTSxDQUFXO2dCQUVsQixJQUFJLFFBQVEsS0FBSyxTQUFTLEVBQUU7b0JBQzNCLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQUksRUFBRSxLQUFLO3dCQUMxQyx5QkFBTyxLQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBVyxFQUFDO3FCQUN6QyxDQUFDLENBQUM7b0JBQ0gsT0FBTyxNQUFNLENBQUM7aUJBQ2Q7Z0JBRUQsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtvQkFDekIsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRTt3QkFDdEIsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUNoQixXQUFXLEdBQUcsUUFBUSxHQUFHLENBQUMsQ0FBQztxQkFDM0I7b0JBRUQsVUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ3pDLFVBQVUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxVQUFVLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsVUFBVSxDQUFDO2lCQUNuRztxQkFBTTtvQkFDTixVQUFVLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ2pEO2dCQUVELFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUVuQyxPQUFPLFVBQVUsQ0FBQzthQUNqQjs7Ozs7Ozs7UUFTTyxtQ0FBUzs7Ozs7OztzQkFBQyxJQUFZLEVBQUUsRUFBVSxFQUFFLE1BQXlCO2dCQUNyRSxJQUFJLE1BQU0sS0FBSyxDQUFDLEVBQUU7b0JBQ2pCLE9BQU8sQ0FBQyxDQUFDO2lCQUNUO2dCQUVELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7OztRQVF2Ryw0QkFBRTs7Ozs7O1lBQUYsVUFBRyxRQUFnQixFQUFFLEtBQXVCO2dCQUE1QyxpQkFxQ0E7O2dCQXBDQSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBR0Y7O2dCQUgxQixJQUNDLE1BQU0sR0FBRyxJQUFJLENBRVk7O2dCQUgxQixJQUVDLFFBQVEsR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FDbkI7O2dCQUgxQixJQUdDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7O2dCQUMxQixJQUFNLFNBQVMsR0FBRyxFQUFFLFFBQVEsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FFekI7O2dCQUYxQixJQUNDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FDRDs7Z0JBRjFCLElBRUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFFMUIsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRTtvQkFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsRUFBRTt3QkFDNUQsUUFBUSxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7cUJBQ25DO29CQUVELFFBQVEsR0FBRyxPQUFPLEdBQUcsUUFBUSxDQUFDO29CQUM5QixNQUFNLEdBQUcsQ0FBQyxDQUFDLFFBQVEsR0FBRyxPQUFPLElBQUksS0FBSyxHQUFHLEtBQUssSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDO29CQUVsRSxJQUFJLE1BQU0sS0FBSyxRQUFRLElBQUksTUFBTSxHQUFHLFFBQVEsSUFBSSxPQUFPLElBQUksTUFBTSxHQUFHLFFBQVEsR0FBRyxDQUFDLEVBQUU7d0JBQ2pGLE9BQU8sR0FBRyxNQUFNLEdBQUcsUUFBUSxDQUFDO3dCQUM1QixRQUFRLEdBQUcsTUFBTSxDQUFDO3dCQUNsQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUNwQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7cUJBQ25CO2lCQUNEO3FCQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7b0JBQ2hDLE9BQU8sSUFBSSxDQUFDLENBQUM7b0JBQ2IsUUFBUSxHQUFHLENBQUMsUUFBUSxHQUFHLE9BQU8sR0FBRyxPQUFPLElBQUksT0FBTyxDQUFDO2lCQUNwRDtxQkFBTTtvQkFDTixRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztpQkFDMUQ7Z0JBRUQsVUFBVSxDQUFDO29CQUNWLEtBQUksQ0FBQyxLQUFLLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ3JELEtBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBRXZCLEtBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztpQkFDZCxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBRU47Ozs7Ozs7Ozs7UUFNQSw4QkFBSTs7Ozs7WUFBSixVQUFLLEtBQXVCO2dCQUM1QixLQUFLLEdBQUcsS0FBSyxJQUFJLEtBQUssQ0FBQztnQkFDdkIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQzthQUNsRDs7Ozs7Ozs7OztRQU1BLDhCQUFJOzs7OztZQUFKLFVBQUssS0FBdUI7Z0JBQzVCLEtBQUssR0FBRyxLQUFLLElBQUksS0FBSyxDQUFDO2dCQUN2QixJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ2xEOzs7Ozs7Ozs7O1FBTUEseUNBQWU7Ozs7O1lBQWYsVUFBZ0IsS0FBVzs7Z0JBRTNCLElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTs7Ozs7O29CQU94QixPQUFPLEtBQUssQ0FBQztpQkFDYjtnQkFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUN4QixJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQzVCOzs7OztRQU1RLG1DQUFTOzs7Ozs7Z0JBQ2pCLElBQUksS0FBSyxDQUFDO2dCQUNWLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtvQkFDaEIsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7aUJBQ3BCO3FCQUFNO29CQUNOLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztpQkFDL0M7Z0JBQ0QsT0FBTyxLQUFLLENBQUM7Ozs7Ozs7Ozs7O1FBT2Isa0NBQVE7Ozs7O1lBQVIsVUFBUyxPQUFpQztnQkFDMUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUM7YUFDdEI7Ozs7O1FBS08sMkNBQWlCOzs7Ozs7Z0JBS3hCLElBQUksT0FBTyxDQUF1QjtnQkFFbEMsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFO29CQUM5QyxPQUFPLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztvQkFDcEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO3dCQUMzQixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7NEJBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzt5QkFDaEM7cUJBQ0QsQ0FBQyxDQUFBO2lCQUNGO2dCQUVELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQSxLQUFLO29CQUN0QyxPQUFPO3dCQUNOLEVBQUUsRUFBRSxLQUFHLEtBQUssQ0FBQyxFQUFJO3dCQUNqQixRQUFRLEVBQUUsS0FBSzt3QkFDZixNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU07d0JBQ3BCLFNBQVMsRUFBRSxLQUFLLENBQUMsU0FBUzt3QkFDMUIsS0FBSyxFQUFFLENBQUM7d0JBQ1IsUUFBUSxFQUFFLEtBQUs7d0JBQ2YsSUFBSSxFQUFFLE9BQU8sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLO3dCQUM3QyxZQUFZLEVBQUUsS0FBSyxDQUFDLFFBQVE7cUJBQzVCLENBQUM7aUJBQ0YsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7UUFRSiw0Q0FBa0I7Ozs7O1lBQWxCLFVBQW1CLEtBQWlCOztnQkFFbkMsSUFBTSxjQUFjLEdBQThCO29CQUNqRCxRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVE7b0JBQ3hCLFFBQVEsRUFBRSxLQUFLLENBQUMsVUFBVTtvQkFDMUIsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRO29CQUN4QixVQUFVLEVBQUUsS0FBSyxDQUFDLFVBQVU7b0JBQzVCLGlCQUFpQixFQUFFLEtBQUssQ0FBQyxlQUFlO29CQUN4QyxrQkFBa0IsRUFBRSxLQUFLLENBQUMsZ0JBQWdCO2lCQUMxQyxDQUFDO2dCQUNGLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUU7b0JBQzVCLGNBQWMsRUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQW1CLEVBQUMsR0FBRyxLQUFLLENBQUMsa0JBQWtCLENBQUM7aUJBQzdFO2dCQUNELElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUU7b0JBQzdCLGNBQWMsRUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQW9CLEVBQUMsR0FBRyxLQUFLLENBQUMsbUJBQW1CLENBQUM7aUJBQy9FO2dCQUNELE9BQU8sY0FBYyxDQUFDO2FBQ3RCOzs7Ozs7OztRQVNRLDZCQUFHOzs7Ozs7O3NCQUFDLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUzs7Z0JBQzNDLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO2dCQUM5QixRQUFRLENBQUM7b0JBQ1IsS0FBSyxHQUFHO3dCQUNQLE9BQU8sR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDNUIsS0FBSyxHQUFHO3dCQUNQLE9BQU8sR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDNUIsS0FBSyxJQUFJO3dCQUNSLE9BQU8sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDOUIsS0FBSyxJQUFJO3dCQUNSLE9BQU8sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDOUI7d0JBQ0MsTUFBTTtpQkFDUDs7Ozs7Ozs7Ozs7O1FBWU8sa0NBQVE7Ozs7Ozs7Ozs7c0JBQUMsSUFBWSxFQUFFLElBQVUsRUFBRSxTQUFrQixFQUFFLEtBQWMsRUFBRSxLQUFlO2dCQUM5RixRQUFRLElBQUk7b0JBQ1gsS0FBSyxhQUFhO3dCQUNqQixJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUN0QyxNQUFNO29CQUNQLEtBQUssUUFBUTt3QkFDWixJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUN6QyxNQUFNO29CQUNQLEtBQUssU0FBUzt3QkFDYixJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUMxQyxNQUFNO29CQUNQLEtBQUssTUFBTTt3QkFDVixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDL0IsTUFBTTtvQkFDUCxLQUFLLFNBQVM7d0JBQ2IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDbEMsTUFBTTtvQkFDUCxLQUFLLFFBQVE7d0JBQ1osSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDakMsTUFBTTtvQkFDUCxLQUFLLFNBQVM7d0JBQ2IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDbEMsTUFBTTtvQkFDUCxLQUFLLFNBQVM7d0JBQ2IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDbEMsTUFBTTtvQkFDUCxLQUFLLFdBQVc7d0JBQ2YsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDcEMsTUFBTTtvQkFDUCxLQUFLLFdBQVc7d0JBQ2YsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDcEMsTUFBTTtvQkFDUCxLQUFLLFlBQVk7d0JBQ2hCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ3JDLE1BQU07b0JBQ1A7d0JBQ0MsTUFBTTtpQkFDUDs7Ozs7Ozs7Ozs7UUFRRCwrQkFBSzs7Ozs7WUFBTCxVQUFNLElBQVk7Z0JBQWxCLGlCQVFDO2dCQVBDLENBQUUsSUFBSSxDQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLFNBQVM7b0JBQy9ELElBQUksS0FBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssU0FBUyxFQUFFO3dCQUNyRCxLQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQ3BDO29CQUVELEtBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7aUJBQ2hDLENBQUMsQ0FBQzthQUNKOzs7Ozs7Ozs7O1FBTUYsK0JBQUs7Ozs7O1lBQUwsVUFBTSxJQUFZO2dCQUFsQixpQkFNRTtnQkFMQyxDQUFFLElBQUksQ0FBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxTQUFTO29CQUMvRCxJQUFJLEtBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUU7d0JBQzlFLEtBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7cUJBQ25DO2lCQUNGLENBQUMsQ0FBQTthQUNIOzs7Ozs7Ozs7O1FBTUQsa0NBQVE7Ozs7O1lBQVIsVUFBUyxNQUFXO2dCQUFwQixpQkFZQTtnQkFYQSxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTt3QkFDcEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7cUJBQzdDO3lCQUFNO3dCQUNOLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFDcEY7b0JBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQyxHQUFHLEVBQUUsQ0FBQzt3QkFDN0UsT0FBTyxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztxQkFDekQsQ0FBQyxDQUFDO2lCQUNIO2FBQ0Q7Ozs7OztRQU1RLG1DQUFTOzs7OztzQkFBQyxNQUFnQjs7Z0JBQ2xDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLO29CQUNuQixLQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQztpQkFDNUIsQ0FBQyxDQUFDOzs7Ozs7O1FBT0ssa0NBQVE7Ozs7O3NCQUFDLE1BQWdCOztnQkFDakMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUs7b0JBQ25CLE9BQU8sS0FBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDNUIsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7OztRQVNKLGlDQUFPOzs7Ozs7WUFBUCxVQUFRLEtBQVU7O2dCQUNqQixJQUFNLE1BQU0sR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUVwQyxLQUFLLEdBQUcsS0FBSyxDQUFDLGFBQWEsSUFBSSxLQUFLLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQztnQkFFckQsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNO29CQUM1QyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxjQUFjLElBQUksS0FBSyxDQUFDLGNBQWMsQ0FBQyxNQUFNO29CQUNyRSxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztnQkFFbEMsSUFBSSxLQUFLLENBQUMsS0FBSyxFQUFFO29CQUNoQixNQUFNLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7b0JBQ3ZCLE1BQU0sQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztpQkFDdkI7cUJBQU07b0JBQ04sTUFBTSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO29CQUN6QixNQUFNLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7aUJBQ3pCO2dCQUVELE9BQU8sTUFBTSxDQUFDO2FBQ2I7Ozs7OztRQU9PLG9DQUFVOzs7OztzQkFBQyxNQUFXO2dCQUM5QixPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDOzs7Ozs7O1FBUTNCLDRDQUFrQjs7Ozs7c0JBQUMsS0FBdUI7Z0JBQ2pELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxPQUFPLEtBQUssS0FBSyxTQUFTLENBQUM7Ozs7Ozs7UUFRckQsMkNBQWlCOzs7OztzQkFBQyxLQUFzQjtnQkFDL0MsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQzs7Ozs7OztRQVFwRCw0Q0FBa0I7Ozs7O3NCQUFDLEtBQXNCO2dCQUNoRCxPQUFPLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxPQUFPLEtBQUssS0FBSyxTQUFTLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7UUFVL0Qsb0NBQVU7Ozs7Ozs7WUFBVixVQUFXLEtBQWEsRUFBRSxNQUFjO2dCQUN4QyxPQUFPO29CQUNOLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDO29CQUNyQixDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQztpQkFDckIsQ0FBQzthQUNGOztvQkE3bUREQyxlQUFVOzs7OzhCQS9EWDs7Ozs7OztBQ0FBO1FBZ0RFLDJCQUFvQixlQUFnQztZQUFoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7Ozs7Z0NBOUIzQixLQUFLOzs7OzBCQUtKLEVBQUU7Ozs7NEJBS0U7Z0JBQzVCLFFBQVEsRUFBRSxLQUFLO2dCQUNmLElBQUksRUFBRTtvQkFDSixRQUFRLEVBQUUsS0FBSztvQkFDZixRQUFRLEVBQUUsRUFBRTtpQkFDYjtnQkFDRCxJQUFJLEVBQUU7b0JBQ0osUUFBUSxFQUFFLEtBQUs7b0JBQ2YsUUFBUSxFQUFFLEVBQUU7aUJBQ2I7YUFDRjs7Ozs2QkFLK0I7Z0JBQzlCLFFBQVEsRUFBRSxLQUFLO2dCQUNmLElBQUksRUFBRSxFQUFFO2FBQ1Q7WUFHQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDdkI7Ozs7UUFFRCx1Q0FBVzs7O1lBQVg7Z0JBQ0UsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUNwQzs7Ozs7Ozs7UUFLRCwwQ0FBYzs7OztZQUFkO2dCQUFBLGlCQXVDQzs7Z0JBdENDLElBQU0sb0JBQW9CLEdBQXVCLElBQUksQ0FBQyxlQUFlLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxJQUFJLENBQzlGRSxhQUFHLENBQUMsVUFBQSxLQUFLO29CQUNQLEtBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDbEIsS0FBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO29CQUN2QixLQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQ1osS0FBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUNkLEtBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7aUJBQ3BDLENBQUMsQ0FDSCxDQUFDOztnQkFJRixJQUFNLGdCQUFnQixHQUFvQixJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsRUFBRSxDQUFDLElBQUksQ0FDbkZDLGdCQUFNLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxVQUFVLEdBQUEsQ0FBQyxFQUNqREQsYUFBRyxDQUFDLFVBQUEsSUFBSTtvQkFDTixLQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7aUJBT2YsQ0FBQyxDQUNILENBQUM7O2dCQUVGLElBQU0sa0JBQWtCLEdBQXVCLElBQUksQ0FBQyxlQUFlLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxJQUFJLENBQzFGQSxhQUFHLENBQUM7b0JBQ0YsS0FBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO29CQUN2QixLQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQ1osS0FBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUNkLEtBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7aUJBQ3BDLENBQUMsQ0FDSCxDQUFDOztnQkFFRixJQUFNLFNBQVMsR0FBdUJFLFVBQUssQ0FBQyxvQkFBb0IsRUFBRSxnQkFBZ0IsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO2dCQUN4RyxJQUFJLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQ3hDLGVBQVEsQ0FDVCxDQUFDO2FBQ0g7Ozs7Ozs7O1FBS0Ysc0NBQVU7Ozs7WUFBVjtnQkFDRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRXZFLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztnQkFFL0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDN0MsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQzthQUNoRDs7Ozs7UUFLTSwyQ0FBZTs7Ozs7O2dCQUN0QixJQUFJLENBQUMsQ0FBK0I7O2dCQUFwQyxJQUFlLENBQUMsQ0FBb0I7O2dCQUFwQyxJQUEwQixDQUFDLENBQVM7O2dCQUNwQyxJQUFNLEtBQUssR0FBVyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBSUw7O2dCQUp6RCxJQUNJLEtBQUssR0FBVyxLQUFLLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxNQUFNLENBR047O2dCQUp6RCxJQUVJLE9BQU8sR0FBVyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FFQzs7Z0JBSnpELElBR0ksS0FBSyxHQUFVLEVBQUUsQ0FDb0M7O2dCQUp6RCxJQUlJLFFBQVEsR0FBZSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQzs7Z0JBQ3RELElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxNQUFNLElBQUksUUFBUSxDQUFDLFNBQVMsSUFBSSxRQUFRLENBQUMsUUFBUTtzQkFDaEUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQztnQkFDNUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDO2dCQUNqQixJQUFJLFFBQVEsQ0FBQyxPQUFPLEtBQUssTUFBTSxFQUFFO29CQUNoQyxRQUFRLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDL0Q7Z0JBRUQsSUFBSSxRQUFRLENBQUMsSUFBSSxJQUFJLFFBQVEsQ0FBQyxPQUFPLEtBQUssTUFBTSxFQUFFO29CQUVqRCxLQUFLLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7d0JBQzdDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFOzRCQUN6QixLQUFLLENBQUMsSUFBSSxDQUFDO2dDQUNWLEtBQUssRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDO2dDQUNuQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLEdBQUcsQ0FBQzs2QkFDekIsQ0FBQyxDQUFDOzRCQUNILElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxLQUFLLE9BQU8sRUFBRTtnQ0FDN0MsTUFBTTs2QkFDTjs0QkFDRCxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO3lCQUNYO3dCQUNELENBQUMsc0JBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQVcsQ0FBQSxDQUFDO3FCQUM5RTtpQkFDRDtnQkFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQzs7Ozs7Ozs7Ozs7UUFPcEIsZ0NBQUk7Ozs7O1lBQUo7Z0JBQUEsaUJBc0NDOztnQkFyQ0QsSUFBSSxVQUFVLENBQVM7O2dCQUNyQixJQUFNLFFBQVEsR0FBZSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FFZDs7Z0JBRjVDLElBQ0UsS0FBSyxHQUE2QixJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxDQUNwQjs7Z0JBRjVDLElBRUUsUUFBUSxHQUFHLEtBQUssQ0FBQyxNQUFNLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQztnQkFFOUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLFFBQVEsQ0FBQztnQkFDbkQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLFFBQVEsQ0FBQztnQkFFckQsSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFO29CQUNsQixVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO29CQUU3RCxJQUFJLFFBQVEsQ0FBQyxRQUFRLElBQUksVUFBVSxLQUFLLENBQUMsRUFBRTt3QkFDdEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO3dCQUN6QixLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTs0QkFDaEIsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dDQUN2QixNQUFNLEVBQUUsS0FBSztnQ0FDYixFQUFFLEVBQUUsU0FBTyxJQUFJLENBQUMsRUFBSTtnQ0FDcEIsWUFBWSxFQUFFLElBQUksQ0FBQyxVQUFVO2dDQUM3QixnQkFBZ0IsRUFBRSxJQUFJOzZCQUN2QixDQUFDLENBQUM7eUJBQ0osQ0FBQyxDQUFDO3FCQUNQO3lCQUFNLElBQUksVUFBVSxHQUFHLENBQUMsRUFBRTs7d0JBQ3RCLElBQU0sTUFBTSxHQUFXLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQzt3QkFDdkYsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRTs0QkFDbkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dDQUN2QixNQUFNLEVBQUUsS0FBSztnQ0FDYixFQUFFLEVBQUUsVUFBTyxDQUFDLEdBQUcsTUFBTSxDQUFFO2dDQUN2QixnQkFBZ0IsRUFBRSxLQUFLOzZCQUN4QixDQUFDLENBQUM7eUJBQ0o7cUJBQ0w7eUJBQU0sSUFBSSxVQUFVLEdBQUcsQ0FBQyxFQUFFO3dCQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQTtxQkFDaEU7aUJBQ0M7Z0JBRUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDN0MsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQzthQUNoRDs7Ozs7Ozs7UUFLRCxrQ0FBTTs7OztZQUFOO2dCQUNFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2dCQUN6QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDcEI7Ozs7O1FBS08sNkNBQWlCOzs7Ozs7Z0JBQ3ZCLElBQU0sUUFBUSxHQUFlLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUVzQjs7Z0JBRmhGLElBQ0UsSUFBSSxHQUFZLFFBQVEsQ0FBQyxJQUFJLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FDOEI7O2dCQUZoRixJQUVFLEtBQUssR0FBVyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7Z0JBRWhGLElBQUksUUFBUSxDQUFDLEdBQUcsRUFBRTtvQkFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDdEYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDakY7Z0JBRUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQzs7Ozs7O1FBTXZDLHVDQUFXOzs7Ozs7Z0JBQ2pCLElBQUksYUFBYSxDQUFTO2dCQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO29CQUM5QixJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxFQUFFO3dCQUN4QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztxQkFDckI7aUJBQ0YsQ0FBQyxDQUFBO2dCQUVGLGFBQWEsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ2hDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO29CQUM5QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2lCQUNsRDtnQkFDRCxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDOzs7Ozs7UUFPMUMsb0NBQVE7Ozs7OztnQkFDYixJQUFNLE9BQU8sR0FBVyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7O2dCQUN0RixJQUFJLFlBQVksQ0FBUzs7Z0JBQ3pCLElBQU0sS0FBSyxHQUFRLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQUMsSUFBSSxFQUFFLEtBQUs7b0JBQ2hELE9BQU8sSUFBSSxDQUFDLEtBQUssSUFBSSxPQUFPLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxPQUFPLENBQUM7aUJBQ3JELENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFFVCxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJO29CQUN2QyxPQUFPLElBQUksQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxLQUFLLEtBQUssQ0FBQyxHQUFHLENBQUM7aUJBQzdELENBQUMsQ0FBQztnQkFFSCxPQUFPLFlBQVksQ0FBQzs7Ozs7OztRQVFmLHdDQUFZOzs7OztzQkFBQyxTQUEyQjs7Z0JBQy9DLElBQUksUUFBUSxDQUF5Qjs7Z0JBQXJDLElBQXNCLE1BQU0sQ0FBUzs7Z0JBQ3JDLElBQU0sUUFBUSxHQUFlLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDO2dCQUUzRCxJQUFJLFFBQVEsQ0FBQyxPQUFPLEtBQUssTUFBTSxFQUFFO29CQUNoQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUMzQixNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7b0JBQzVCLFNBQVMsR0FBRyxFQUFFLFFBQVEsR0FBRyxFQUFFLFFBQVEsQ0FBQztvQkFDcEMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxNQUFNLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQztpQkFDdEU7cUJBQU07b0JBQ04sUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztvQkFDekUsTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLENBQUMsTUFBTSxDQUFDO29CQUM3QyxTQUFTLEdBQUcsUUFBUSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxRQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO2lCQUMxRTtnQkFFRCxPQUFPLFFBQVEsQ0FBQzs7Ozs7Ozs7Ozs7UUFPakIsZ0NBQUk7Ozs7O1lBQUosVUFBSyxLQUF1QjtnQkFDekIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQzthQUMxRDs7Ozs7Ozs7OztRQU1ELGdDQUFJOzs7OztZQUFKLFVBQUssS0FBdUI7Z0JBQ3pCLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDMUQ7Ozs7Ozs7Ozs7Ozs7O1FBUUYsOEJBQUU7Ozs7Ozs7WUFBRixVQUFHLFFBQWdCLEVBQUUsS0FBdUIsRUFBRSxRQUFrQjs7Z0JBQy9ELElBQUksTUFBTSxDQUFTO2dCQUNuQixJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO29CQUNqQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7b0JBQzVCLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxNQUFNLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztpQkFDOUY7cUJBQU07b0JBQ0gsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO2lCQUM1QzthQUNBOzs7Ozs7Ozs7UUFLRCxxQ0FBUzs7Ozs7WUFBVCxVQUFVLEtBQWE7O2dCQUNyQixJQUFNLEtBQUssR0FBVyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxLQUFLLEtBQUssR0FBRyxDQUFDLEVBQUUsR0FBQSxDQUFDLENBQUM7Z0JBQzdFLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ3pEOzs7Ozs7Ozs7O1FBTUQsdUNBQVc7Ozs7O1lBQVgsVUFBWSxFQUFVOztnQkFDcEIsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksS0FBSyxDQUFDLFFBQVEsS0FBSyxLQUFLLEdBQUEsQ0FBQyxDQUFDO2dCQUVqSCxJQUFJLFFBQVEsS0FBSyxDQUFDLENBQUMsSUFBSSxRQUFRLEtBQUssSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsRUFBRTtvQkFDbEUsT0FBTztpQkFDUjtnQkFFSCxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQzthQUN2RTs7b0JBalVGSixlQUFVOzs7Ozt3QkFMRixlQUFlOzs7Z0NBSHhCOzs7Ozs7Ozs7O0FDdUJBLFFBQWEsTUFBTSxHQUFHLElBQUlLLG1CQUFjLENBQUMsYUFBYSxDQUFDLENBQUM7Ozs7O0FBS3hEOzs7UUFBQTs7O1FBQ0Usc0JBQUksbUNBQVk7OztnQkFBaEI7Z0JBQ0UsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2FBQ3JDOzs7V0FBQTt3QkEvQkg7UUFnQ0MsQ0FBQTs7OztBQUtEOztRQUFBO1FBQXNDQyxvQ0FBUztRQUM3QzttQkFDRSxpQkFBTztTQUNSO1FBS0Qsc0JBQUksMENBQVk7Ozs7OztnQkFBaEI7Z0JBQ0UsT0FBTyxNQUFNLENBQUM7YUFDZjs7O1dBQUE7K0JBL0NIO01BcUNzQyxTQUFTLEVBVzlDLENBQUE7Ozs7Ozs7QUFRRCwyQkFDRSxnQkFBa0MsRUFDbEMsVUFBa0I7UUFFbEIsSUFBSUMsd0JBQWlCLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDakMsT0FBTyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUM7U0FDdEM7UUFDRCxPQUFPLElBQUksTUFBTSxFQUFFLENBQUM7S0FDckI7Ozs7QUFLRCxRQUFhLHFCQUFxQixHQUFrQjtRQUNsRCxPQUFPLEVBQUUsU0FBUztRQUNsQixRQUFRLEVBQUUsZ0JBQWdCO0tBQzNCLENBQUM7Ozs7QUFLRixRQUFhLGNBQWMsR0FBb0I7UUFDN0MsT0FBTyxFQUFFLE1BQU07UUFDZixVQUFVLEVBQUUsYUFBYTtRQUN6QixJQUFJLEVBQUUsQ0FBQyxTQUFTLEVBQUVDLGdCQUFXLENBQUM7S0FDL0IsQ0FBQzs7OztBQUtGLFFBQWEsZ0JBQWdCLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxjQUFjLENBQUM7Ozs7Ozs7OztBQzNFdkUsUUFBYSxRQUFRLEdBQUcsSUFBSUgsbUJBQWMsQ0FBVyxlQUFlLENBQUMsQ0FBQzs7Ozs7QUFJdEU7OztRQUFBOzs7UUFDRSxzQkFBSSx1Q0FBYzs7O2dCQUFsQjtnQkFDRSxNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7YUFDckM7OztXQUFBOzBCQWxCSDtRQW1CQyxDQUFBOzs7O0FBS0Q7O1FBQUE7UUFBd0NDLHNDQUFXO1FBQ2pEO21CQUNFLGlCQUFPO1NBQ1I7UUFLRCxzQkFBSSw4Q0FBYzs7Ozs7O2dCQUFsQjtnQkFDRSxPQUFPLFFBQVEsQ0FBQzthQUNqQjs7O1dBQUE7aUNBbENIO01Bd0J3QyxXQUFXLEVBV2xELENBQUE7Ozs7Ozs7QUFRRCw2QkFDRSxrQkFBc0MsRUFDdEMsVUFBa0I7UUFFbEIsSUFBSUMsd0JBQWlCLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDakMsT0FBTyxrQkFBa0IsQ0FBQyxjQUFjLENBQUM7U0FDMUM7UUFDRCxPQUFPLElBQUksTUFBTSxFQUFFLENBQUM7S0FDckI7Ozs7QUFLRCxRQUFhLHVCQUF1QixHQUFrQjtRQUNwRCxPQUFPLEVBQUUsV0FBVztRQUNwQixRQUFRLEVBQUUsa0JBQWtCO0tBQzdCLENBQUM7Ozs7QUFLRixRQUFhLGdCQUFnQixHQUFvQjtRQUMvQyxPQUFPLEVBQUUsUUFBUTtRQUNqQixVQUFVLEVBQUUsZUFBZTtRQUMzQixJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUVDLGdCQUFXLENBQUM7S0FDakMsQ0FBQzs7OztBQUtGLFFBQWEsa0JBQWtCLEdBQUcsQ0FBQyx1QkFBdUIsRUFBRSxnQkFBZ0IsQ0FBQzs7Ozs7O0FDekU3RTtRQTJCRSx5QkFBb0IsZUFBZ0MsRUFDeEIsTUFBVyxFQUNULE1BQVc7WUFGckIsb0JBQWUsR0FBZixlQUFlLENBQWlCOzs7OzRCQVZ6QixJQUFJOzs7OzJCQUtiLEtBQUs7WUFTckIsSUFBSSxDQUFDLE1BQU0scUJBQUcsTUFBZ0IsQ0FBQSxDQUFDO1lBQy9CLElBQUksQ0FBQyxNQUFNLHFCQUFHLE1BQWtCLENBQUEsQ0FBQztZQUNqQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDdkI7Ozs7UUFFRCxxQ0FBVzs7O1lBQVg7Z0JBQ0UsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ3pDOzs7Ozs7OztRQUtELHdDQUFjOzs7O1lBQWQ7Z0JBQUEsaUJBc0JDOztnQkFyQkMsSUFBTSxvQkFBb0IsR0FBdUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLElBQUksQ0FDOUZOLGFBQUcsQ0FBQztvQkFDRixJQUFJLEtBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRTt3QkFDL0MsS0FBSSxDQUFDLElBQUksRUFBRSxDQUFDO3FCQUNaO2lCQUNFLENBQUMsQ0FDSCxDQUFDOztnQkFFRixJQUFNLGdCQUFnQixHQUFvQixJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsRUFBRSxDQUFDLElBQUksQ0FDbkZBLGFBQUcsQ0FBQyxVQUFBLElBQUk7b0JBQ04sS0FBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNwQyxDQUFDLENBQ0gsQ0FBQzs7Z0JBS0YsSUFBTSxjQUFjLEdBQXVCRSxVQUFLLENBQUMsb0JBQW9CLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztnQkFDekYsSUFBSSxDQUFDLG9CQUFvQixHQUFHLGNBQWMsQ0FBQyxTQUFTLENBQ2xELGVBQVEsQ0FDVCxDQUFDO2FBQ0g7Ozs7Ozs7Ozs7OztRQU9GLDhCQUFJOzs7Ozs7WUFBSixVQUFLLE9BQWdCLEVBQUUsS0FBYztnQkFDbEMsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO29CQUNuQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztvQkFDckIsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7aUJBQzFCO2dCQUVILElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUU7b0JBQ3hDLE9BQU87aUJBQ1A7Z0JBRUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBRXZDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO2FBQzNCOzs7Ozs7O1FBUU0seUNBQWU7Ozs7OztzQkFBQyxPQUFnQixFQUFFLEtBQWM7O2dCQUN2RCxJQUFLLElBQUksQ0FBQyxRQUFTLEVBQUU7b0JBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDeEM7Z0JBQ0QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztvQkFDMUIsSUFBSSxLQUFJLENBQUMsT0FBTyxJQUFJLEtBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEtBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO3dCQUN2SCxPQUFPO3FCQUNQO29CQUNELEtBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxLQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztpQkFDOUUsRUFBRSxPQUFPLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUM7Ozs7OztRQU14RCw4Q0FBb0I7Ozs7O2dCQUMzQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQzs7Ozs7Ozs7O1FBTXhDLDhCQUFJOzs7O1lBQUo7Z0JBQ0MsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFO29CQUN6QyxPQUFPO2lCQUNQO2dCQUVELElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDeEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDdEM7Ozs7Ozs7O1FBS0YsK0JBQUs7Ozs7WUFBTDtnQkFDQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUU7b0JBQ3pDLE9BQU87aUJBQ1A7Z0JBRUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7YUFDbkI7Ozs7OztRQU1PLGlEQUF1Qjs7Ozs7c0JBQUMsSUFBSTtnQkFDbEMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxVQUFVLEVBQUU7b0JBQ3JDLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFO3dCQUMxQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7cUJBQ2I7eUJBQU07d0JBQ0wsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO3FCQUNiO2lCQUNGO3FCQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssVUFBVSxFQUFFOztvQkFFNUMsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUU7d0JBQzFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO3FCQUM3QjtpQkFDRjs7Ozs7Ozs7O1FBTUgsc0NBQVk7Ozs7WUFBWjtnQkFDRSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLGtCQUFrQixJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFO29CQUMzRixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7aUJBQ2Q7YUFDRjs7Ozs7Ozs7UUFLRCxnREFBc0I7Ozs7WUFBdEI7Z0JBQ0UsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRTtvQkFDM0YsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2lCQUNkO2FBQ0Y7Ozs7Ozs7O1FBS0QsOENBQW9COzs7O1lBQXBCO2dCQUNFLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsa0JBQWtCLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUU7b0JBQzNGLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztpQkFDZDthQUNGOztvQkE1S0ZKLGVBQVU7Ozs7O3dCQUxGLGVBQWU7d0RBMEJUUyxXQUFNLFNBQUMsTUFBTTt3REFDYkEsV0FBTSxTQUFDLFFBQVE7Ozs4QkE3QjlCOzs7Ozs7O0FDQUE7UUFZRSx5QkFBb0IsZUFBZ0M7WUFBaEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1lBQ2xELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUN2Qjs7OztRQUVELHFDQUFXOzs7WUFBWDtnQkFDRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDekM7Ozs7Ozs7O1FBS0Qsd0NBQWM7Ozs7WUFBZDtnQkFBQSxpQkFvQkM7O2dCQW5CQyxJQUFNLG9CQUFvQixHQUF1QixJQUFJLENBQUMsZUFBZSxDQUFDLG1CQUFtQixFQUFFLENBQUMsSUFBSSxDQUM5RlAsYUFBRyxDQUFDOztvQkFDRixJQUFNLFVBQVUsR0FBRyxLQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsSUFBSSxDQUFDLEtBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztvQkFDNUYsS0FBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLEdBQUcsSUFBSSxHQUFHLEtBQUssR0FBQSxDQUFDLENBQUM7aUJBQ3hGLENBQUMsQ0FDSCxDQUFDOztnQkFFRixJQUFNLGVBQWUsR0FBb0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLEVBQUUsQ0FBQzs7Z0JBRS9FLElBQU0sZ0JBQWdCLEdBQXVCLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxFQUFFLENBQUM7O2dCQUdwRixJQUFNLGNBQWMsR0FBNkJFLFVBQUssQ0FBQyxvQkFBb0IsRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLENBQ2xIRixhQUFHLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxLQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLEdBQUEsQ0FBQyxDQUU5QyxDQUFDO2dCQUNGLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxjQUFjLENBQUMsU0FBUyxDQUNsRCxlQUFRLENBQ1QsQ0FBQzthQUNIOzs7OztRQUVPLCtDQUFxQjs7OztzQkFBQyxJQUFTOztnQkFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFO29CQUM3RSxPQUFPO2lCQUNSO2dCQUVELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLFVBQVUsS0FBSyxJQUFJLEtBQUssYUFBYSxJQUFJLElBQUksS0FBSyxTQUFTLEVBQUU7O29CQUN4RyxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FDTTs7b0JBRHBELElBQ00sTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDOztvQkFDcEQsSUFBSSxDQUFDLElBQUksUUFBUSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUVtRDs7b0JBRi9ILElBQ0ksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQ3FGOztvQkFGL0gsSUFFSSxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxLQUFLLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQzs7O29CQUcvSCxJQUFJLFFBQVEsQ0FBQyxhQUFhLEdBQUcsQ0FBQyxFQUFFO3dCQUM5QixDQUFDLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQzs7d0JBRTVCLElBQUksUUFBUSxDQUFDLElBQUksRUFBRTs0QkFDakIsUUFBUSxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUM7NEJBQ25DLENBQUMsRUFBRSxDQUFDO3lCQUNMO3FCQUNGO29CQUVELE9BQU8sQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFO3dCQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO3dCQUNqRSxJQUFJLE1BQU0sRUFBRTs0QkFDVixJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUEsQ0FBQyxDQUFDO3lCQUUxRzt3QkFDRCxRQUFRLEVBQUUsQ0FBQztxQkFDWjtpQkFDRjs7Ozs7OztRQU9LLCtCQUFLOzs7OztzQkFBQyxRQUFnQjtnQkFDNUIsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLEVBQUU7b0JBQ2xELE9BQU87aUJBQ1I7Z0JBRUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzs7O29CQWxGekRGLGVBQVU7Ozs7O3dCQUhGLGVBQWU7Ozs4QkFGeEI7Ozs7Ozs7QUNBQTtRQTJCRSx3QkFBb0IsZUFBZ0M7WUFBaEMsb0JBQWUsR0FBZixlQUFlLENBQWlCOzs7OzRCQVp6QyxJQUFJOzs7OzRCQUtKLFNBQVM7Ozs7d0JBS2IsU0FBUztZQUdkLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUN2Qjs7OztRQUVELG9DQUFXOzs7WUFBWDtnQkFDRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDeEM7Ozs7Ozs7O1FBS0QsdUNBQWM7Ozs7WUFBZDtnQkFBQSxpQkE4QkM7O2dCQTdCQyxJQUFNLGVBQWUsR0FBb0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxJQUFJLENBQ2pGRSxhQUFHLENBQUMsVUFBQSxJQUFJO29CQUNOLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssVUFBVSxFQUFFO3dCQUMxQyxLQUFJLENBQUMsUUFBUSxHQUFHLEtBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQy9DLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7cUJBQ2hDO2lCQUNFLENBQUMsQ0FDSCxDQUFDOztnQkFFRixJQUFNLGFBQWEsR0FBdUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQUUsQ0FBQzs7Z0JBQzlFLElBQU0sZ0JBQWdCLEdBQXVCLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxFQUFFLENBQUM7O2dCQUNwRixJQUFNLG1CQUFtQixHQUF1QixJQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQixFQUFFLENBQUM7O2dCQUUxRixJQUFNLG9CQUFvQixHQUF1QkUsVUFBSyxDQUFDLGFBQWEsRUFBRSxnQkFBZ0IsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDLElBQUksQ0FDL0dGLGFBQUcsQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLEtBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxLQUFLLFlBQVksR0FBQSxDQUFDLENBQ25ELENBQUM7O2dCQUVGLElBQU0sa0JBQWtCLEdBQXVCLElBQUksQ0FBQyxlQUFlLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxJQUFJLENBQzFGQSxhQUFHLENBQUMsVUFBQSxJQUFJO29CQUNOLElBQUksS0FBSSxDQUFDLFFBQVEsS0FBSyxLQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxVQUFVLElBQUksS0FBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7d0JBQzFHLEtBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztxQkFDZDtpQkFDRixDQUFDLENBQ0gsQ0FBQzs7Z0JBRUYsSUFBTSxhQUFhLEdBQTZCRSxVQUFLLENBQUMsZUFBZSxFQUFFLGtCQUFrQixFQUFFLG9CQUFvQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ3hILElBQUksQ0FBQyxtQkFBbUIsR0FBRyxhQUFhLENBQUMsU0FBUyxDQUNoRCxlQUFRLENBQ1QsQ0FBQzthQUNIOzs7OztRQU1NLDhCQUFLOzs7OztnQkFFWixJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLEtBQUssS0FBSyxDQUFDLEVBQUU7b0JBQzlDLE9BQU87aUJBQ1A7Ozs7Z0JBTUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7O2dCQUU5QixJQUFJLElBQUksQ0FBQzs7Z0JBQ1QsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUdWOztnQkFIckQsSUFDQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUVHOztnQkFIckQsSUFFQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUNFOztnQkFIckQsSUFHQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO2dCQUVyRCxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLEtBQUssSUFBSSxDQUFDLFFBQVEsRUFBRTtvQkFDckQsT0FBTztpQkFDUDtnQkFFRCxJQUFJLFFBQVEsRUFBRTtvQkFDYixJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3BHLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUs7d0JBQzNDLElBQUksS0FBSyxDQUFDLEVBQUUsS0FBSyxRQUFRLENBQUMsRUFBRSxFQUFFOzRCQUM1QixLQUFLLENBQUMsSUFBSSxHQUFNLElBQUksT0FBSSxDQUFDOzRCQUN6QixLQUFLLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQzs0QkFDeEIsS0FBSyxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQzs0QkFDOUIsS0FBSyxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQzt5QkFDbEM7cUJBQ0YsQ0FBQyxDQUFDO2lCQUNOO2dCQUVELElBQUksUUFBUSxFQUFFO29CQUNWLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUs7d0JBQzNDLElBQUksS0FBSyxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsRUFBRSxFQUFFOzRCQUN4QixLQUFLLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQzs0QkFDeEIsS0FBSyxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7NEJBQzdCLEtBQUssQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7eUJBQ2pDO3FCQUNGLENBQUMsQ0FBQztpQkFDTjs7Ozs7Ozs7Ozs7UUFPRCw4QkFBSzs7Ozs7WUFBTCxVQUFNLEVBQUU7Z0JBQVIsaUJBYUE7Z0JBWkUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSztvQkFDM0MsSUFBSSxLQUFLLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRTt3QkFDbkIsS0FBSyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7d0JBQ2hCLEtBQUssQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO3dCQUN6QixLQUFLLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO3dCQUMvQixLQUFLLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO3dCQUNsQyxLQUFLLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQzt3QkFDOUIsS0FBSyxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQzt3QkFDakMsS0FBSyxDQUFDLE9BQU8sR0FBRyxLQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUNoRTtpQkFDRixDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLEVBQUUsQ0FBQzthQUN6Qzs7b0JBbklESixlQUFVOzs7Ozt3QkFIRixlQUFlOzs7NkJBRnhCOzs7Ozs7O0FDQUE7UUFXRSwyQkFBb0IsZUFBZ0M7WUFBaEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1lBQ2xELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUN2Qjs7OztRQUVELHVDQUFXOzs7WUFBWDtnQkFDRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDM0M7Ozs7Ozs7O1FBSUQsMENBQWM7Ozs7WUFBZDtnQkFBQSxpQkErQkM7O2dCQTlCQyxJQUFNLG9CQUFvQixHQUF1QixJQUFJLENBQUMsZUFBZSxDQUFDLG1CQUFtQixFQUFFLENBQUMsSUFBSSxDQUM5RkUsYUFBRyxDQUFDLFVBQUEsSUFBSTtvQkFDTixJQUFJLEtBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRTt3QkFDNUMsS0FBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO3FCQUNmO3lCQUFNO3dCQUNMLEtBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxXQUFXLEdBQUcsTUFBTSxHQUFBLENBQUMsQ0FBQztxQkFDOUU7aUJBQ0YsQ0FBQyxDQUNILENBQUM7O2dCQUVGLElBQU0sZ0JBQWdCLEdBQW9CLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxFQUFFLENBQUMsSUFBSSxDQUNuRkEsYUFBRyxDQUFDLFVBQUEsSUFBSTtvQkFDTixJQUFJLEtBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxVQUFVLEVBQUM7d0JBQ3JGLEtBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztxQkFDZDtpQkFDRSxDQUFDLENBQ0gsQ0FBQzs7Z0JBRUYsSUFBTSxrQkFBa0IsR0FBdUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLElBQUksQ0FDMUZBLGFBQUcsQ0FBQyxVQUFBLElBQUk7b0JBQ04sSUFBSSxLQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUU7d0JBQzVDLEtBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztxQkFDZjtpQkFDRixDQUFDLENBQ0gsQ0FBQzs7Z0JBRUYsSUFBTSxXQUFXLEdBQTZCRSxVQUFLLENBQUMsb0JBQW9CLEVBQUUsZ0JBQWdCLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztnQkFDaEgsSUFBSSxDQUFDLHNCQUFzQixHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQ2pELGVBQVEsQ0FDVCxDQUFDO2FBQ0g7Ozs7Ozs7O1FBS0Qsa0NBQU07Ozs7WUFBTjs7Z0JBQ0UsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFBOztnQkFDakQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FDbEI7O2dCQUR4QixJQUNJLEdBQUcsR0FBRyxLQUFLLEdBQUcsS0FBSyxDQUFDO2dCQUV4QixJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtvQkFDeEMsS0FBSyxHQUFHLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDO29CQUN0RSxHQUFHLEdBQUcsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxHQUFHLEtBQUssR0FBRyxLQUFLLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQztpQkFDM0Q7Z0JBRUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBSyxFQUFFLENBQUM7b0JBQy9DLEtBQUssQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQztpQkFDakUsQ0FBQyxDQUFDO2FBQ0o7O29CQWpFRkosZUFBVTs7Ozs7d0JBSEYsZUFBZTs7O2dDQUZ4Qjs7Ozs7OztBQ0FBO1FBa0JFLHFCQUFvQixlQUFnQyxFQUNoQyxPQUNBVTtZQUZBLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtZQUNoQyxVQUFLLEdBQUwsS0FBSztZQUNMLFdBQU0sR0FBTkEsU0FBTTtZQUN4QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDdkI7Ozs7UUFFRCxpQ0FBVzs7O1lBQVg7Z0JBQ0UsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ3JDOzs7Ozs7OztRQUtELG9DQUFjOzs7O1lBQWQ7Z0JBQUEsaUJBdUJDOztnQkF0QkMsSUFBTSxvQkFBb0IsR0FBdUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLElBQUksQ0FDOUZSLGFBQUcsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLGFBQWEsRUFBRSxHQUFBLENBQUUsQ0FDakMsQ0FBQzs7Z0JBRUYsSUFBTSxnQkFBZ0IsR0FBb0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxJQUFJLENBQ25GQSxhQUFHLENBQUMsVUFBQSxJQUFJO29CQUNOLElBQUksS0FBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLFVBQVUsRUFBRTs7d0JBQ3RGLElBQU0sV0FBVyxHQUFHLEtBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLENBQUM7O3dCQUNuRCxJQUFNLGNBQWMsR0FBRyxLQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxZQUFZLENBQUM7d0JBRWpGLElBQUksQ0FBQyxjQUFjLElBQUksY0FBYyxLQUFLLEtBQUksQ0FBQyxtQkFBbUIsRUFBRTs0QkFDeEUsT0FBTzt5QkFDRjt3QkFDRCxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUMsUUFBUSxFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUUsS0FBSSxDQUFDLEtBQUssRUFBQyxDQUFDLENBQUM7cUJBQ2xGO2lCQUNGLENBQUMsQ0FDSCxDQUFDOztnQkFFRixJQUFNLGFBQWEsR0FBNkJFLFVBQUssQ0FBQyxvQkFBb0IsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUM5RixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsYUFBYSxDQUFDLFNBQVMsQ0FDN0MsZUFBUSxDQUNULENBQUM7YUFDSDs7Ozs7Ozs7OztRQU1ELDRCQUFNOzs7OztZQUFOLFVBQU8sUUFBZ0I7O2dCQUNyQixJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsWUFBWSxLQUFLLFFBQVEsSUFBSSxLQUFLLENBQUMsUUFBUSxLQUFLLEtBQUssR0FBQSxDQUFDLENBQUM7Z0JBRWpJLElBQUksUUFBUSxLQUFLLENBQUMsQ0FBQyxJQUFJLFFBQVEsS0FBSyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxFQUFFO29CQUNsRSxPQUFPO2lCQUNSO2dCQUVILElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ3ZFOzs7Ozs7OztRQUtELG1DQUFhOzs7O1lBQWI7Z0JBQUEsaUJBV0M7O2dCQVZDLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLGFBQWEsS0FBSyxTQUFTLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDaEYsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUNwQk8sY0FBSSxDQUFDLEtBQUssQ0FBQyxDQUNaO3FCQUNBLFNBQVMsQ0FDUixVQUFBLFFBQVE7b0JBQ04sS0FBSSxDQUFDLG1CQUFtQixHQUFHLFFBQVEsQ0FBQztvQkFDcEMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDdkIsQ0FDRixDQUFBO2FBQ0o7O29CQTlFRlgsZUFBVTs7Ozs7d0JBSkYsZUFBZTt3QkFFZlkscUJBQWM7d0JBQUVDLGFBQU07OzswQkFKL0I7Ozs7Ozs7QUNBQTtJQWlDQSxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7O1FBb0NiLGdDQUFtQixNQUF3QjtZQUF4QixXQUFNLEdBQU4sTUFBTSxDQUFrQjs7Ozs7c0JBNUI3QixlQUFhLE1BQU0sRUFBSTs7Ozs7OEJBTWhCLENBQUM7Ozs7eUJBVUwsQ0FBQzs7Ozs4QkFLSSxFQUFFOzs7OzRCQUtKLEVBQUU7U0FFeUI7UUFyQi9DLHNCQUNJLDZDQUFTOzs7Z0JBR2IsY0FBMEIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFBLEVBQUU7Ozs7Z0JBSmxELFVBQ2MsSUFBWTtnQkFDeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUM7YUFDbkQ7OztXQUFBOzs7Ozs7Ozs7OztRQXlCRCwwQ0FBUzs7Ozs7WUFBVCxVQUFVLE1BQVc7Z0JBQ3JCLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7YUFDbEM7O29CQTNDREMsY0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLDRCQUE0QixFQUFFOzs7Ozt3QkF6Qm5EQyxnQkFBVzs7Ozt5QkErQlZDLFVBQUs7Z0NBT0xBLFVBQUs7NEJBU0xBLFVBQUs7aUNBS0xBLFVBQUs7K0JBS0xBLFVBQUs7O3FDQW5FUjs7Ozs7QUFvRkE7O1FBQUE7OzsrQkFwRkE7UUF1RkMsQ0FBQTs7UUE4SEMsMkJBQ1UsSUFDQSxlQUNBLGlCQUNBLG1CQUNBLGlCQUNBLGlCQUNBLGdCQUNBLG1CQUNBO1lBUkEsT0FBRSxHQUFGLEVBQUU7WUFDRixrQkFBYSxHQUFiLGFBQWE7WUFDYixvQkFBZSxHQUFmLGVBQWU7WUFDZixzQkFBaUIsR0FBakIsaUJBQWlCO1lBQ2pCLG9CQUFlLEdBQWYsZUFBZTtZQUNmLG9CQUFlLEdBQWYsZUFBZTtZQUNmLG1CQUFjLEdBQWQsY0FBYztZQUNkLHNCQUFpQixHQUFqQixpQkFBaUI7WUFDakIsZ0JBQVcsR0FBWCxXQUFXOzhCQXZGRSxJQUFJQyxpQkFBWSxFQUFvQjs0QkFDdEMsSUFBSUEsaUJBQVksRUFBVzs7OztrQ0FrRC9CLEtBQUs7U0FxQ2xCOzs7O1FBRUosb0NBQVE7OztZQUFSO2dCQUNFLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFFdEIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FDNUQsZUFBZSxDQUNoQixDQUFDLFdBQVcsQ0FBQzthQUNmOzs7O1FBRUQsaURBQXFCOzs7WUFBckI7YUFDQzs7Ozs7UUFHRCw4Q0FBa0I7OztZQUFsQjtnQkFDRSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzFGLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztnQkFFdkQsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7YUFDMUI7Ozs7UUFFRCx1Q0FBVzs7O1lBQVg7Z0JBQ0UsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUU7b0JBQzNCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztpQkFDdkM7Z0JBRUQsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQzNDOzs7Ozs7Ozs7O1FBTUQsMENBQWM7Ozs7O1lBQWQ7Z0JBQUEsaUJBc0NDO2dCQXJDQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLElBQUksQ0FDckVmLGFBQUcsQ0FBQyxVQUFBLElBQUk7b0JBQ04sS0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO29CQUNsQyxLQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7b0JBQ2hDLEtBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztvQkFDbEMsSUFBSSxDQUFDLEtBQUksQ0FBQyxjQUFjLEVBQUU7d0JBQ3hCLEtBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO3FCQUM1QjtvQkFDRCxLQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7b0JBQzVCLEtBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztpQkFDL0IsQ0FBQyxDQUNILENBQUM7Z0JBRUYsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxJQUFJLENBQ3hFQSxhQUFHLENBQUM7b0JBQ0YsS0FBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7b0JBQzVCLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO29CQUM1QyxLQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO2lCQUM1QixDQUFDLENBQ0gsQ0FBQztnQkFFRixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQ2hFQSxhQUFHLENBQUM7b0JBQ0YsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQzFCLENBQUMsRUFDRmdCLG1CQUFTLENBQ1A7b0JBQU0sT0FBQSxLQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQixFQUFFLENBQUMsSUFBSSxDQUNsREMsZUFBSyxFQUFFLEVBQ1BqQixhQUFHLENBQUM7d0JBQ0YsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQzNCLENBQUMsQ0FDSDtpQkFBQSxDQUNGLENBQ0YsQ0FBQztnQkFFRixJQUFJLENBQUMsZUFBZSxHQUFHRSxVQUFLLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztnQkFDekcsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLGVBQVEsQ0FBQyxDQUFDO2FBQ3hFOzs7OztRQUtPLDZDQUFpQjs7Ozs7O2dCQUN2QixJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxFQUFFO29CQUNoRSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTO3lCQUNuRCxJQUFJLENBQ0hELGdCQUFNLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxtQkFBbUIsS0FBSyxLQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUMsV0FBVyxHQUFBLENBQUMsRUFDM0dpQixlQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMscUJBQXFCLENBQUMsQ0FDM0Q7eUJBQ0EsU0FBUyxDQUFDO3dCQUNULEtBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQzt3QkFDaEcsS0FBSSxDQUFDLG1CQUFtQixHQUFHLEtBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxXQUFXLENBQUM7cUJBQzdGLENBQUMsQ0FBQztpQkFDTjs7Ozs7Ozs7O1FBTUgsMkNBQWU7Ozs7WUFBZjtnQkFDRSxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsRUFBRSxDQUFDO2FBQ3hDOzs7Ozs7OztRQUtELGdDQUFJOzs7O1lBQUo7Z0JBQ0UsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNyRTs7Ozs7Ozs7UUFLRCxnQ0FBSTs7OztZQUFKO2dCQUNFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDckU7Ozs7Ozs7OztRQUtELHFDQUFTOzs7OztZQUFULFVBQVUsS0FBYTtnQkFDckIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN6Qzs7Ozs7Ozs7OztRQU1ELDhCQUFFOzs7OztZQUFGLFVBQUcsRUFBVTtnQkFDWCxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ3hDOzs7Ozs7OztRQUtELGdEQUFvQjs7OztZQUFwQjs7Z0JBQ0UsSUFBSSxhQUFhLENBQVM7O2dCQUMxQixJQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQzs7Z0JBQzNELElBQU0sWUFBWSxHQUFpQixJQUFJLENBQUMsVUFBVTtxQkFDL0MsTUFBTSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLFFBQVEsS0FBSyxJQUFJLEdBQUEsQ0FBQztxQkFDeEMsR0FBRyxDQUFDLFVBQUEsS0FBSzs7b0JBQ1IsSUFBTSxFQUFFLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDO29CQUNwRyxPQUFPO3dCQUNMLEVBQUUsRUFBRSxFQUFFO3dCQUNOLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSzt3QkFDbEIsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPO3dCQUN0QixPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU87d0JBQ3RCLE1BQU0sRUFBRSxLQUFLLENBQUMsVUFBVTtxQkFDekIsQ0FBQTtpQkFDRixDQUFDLENBQUM7Z0JBQ0wsYUFBYSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztnQkFDOUUsSUFBSSxDQUFDLGdCQUFnQixHQUFHO29CQUN0QixhQUFhLEVBQUUsYUFBYTtvQkFDNUIsTUFBTSxFQUFFLFlBQVk7aUJBQ3JCLENBQUE7YUFDRjs7Ozs7Ozs7UUFLRCx3Q0FBWTs7OztZQUFaO2dCQUNFLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFLENBQUM7YUFDckM7Ozs7Ozs7O1FBS0QsdUNBQVc7Ozs7WUFBWDtnQkFDRSxJQUFJLENBQUMsZUFBZSxDQUFDLHNCQUFzQixFQUFFLENBQUM7YUFDL0M7Ozs7Ozs7O1FBS0QsdUNBQVc7Ozs7WUFBWDtnQkFDRSxJQUFJLENBQUMsZUFBZSxDQUFDLG9CQUFvQixFQUFFLENBQUM7YUFDN0M7O29CQWhURkMsY0FBUyxTQUFDO3dCQUNULFFBQVEsRUFBRSxnQkFBZ0I7d0JBQzFCLFFBQVEsRUFBRSxrb0RBMkJUO3dCQUVELFNBQVMsRUFBRTs0QkFDVCxpQkFBaUI7NEJBQ2pCLGVBQWU7NEJBQ2YsZUFBZTs0QkFDZixlQUFlOzRCQUNmLGNBQWM7NEJBQ2QsaUJBQWlCOzRCQUNqQixXQUFXO3lCQUNaO2lDQVRRLGdDQUFnQztxQkFVMUM7Ozs7O3dCQXRIQ0MsZUFBVTt3QkFPSCxhQUFhO3dCQUViLGVBQWU7d0JBTWYsaUJBQWlCO3dCQUNqQixlQUFlO3dCQUNmLGVBQWU7d0JBQ2YsY0FBYzt3QkFDZCxpQkFBaUI7d0JBQ2pCLFdBQVc7Ozs7NkJBcUdqQkMsb0JBQWUsU0FBQyxzQkFBc0I7aUNBR3RDQyxXQUFNOytCQUNOQSxXQUFNOzhCQXVETlIsVUFBSzs7Z0NBL0xSOzs7Ozs7O0FDQUE7UUFtSUUsd0JBQW9CLElBQVksRUFDWixJQUNBLFVBQ0EsaUJBQ0E7WUFKcEIsaUJBSXVEO1lBSm5DLFNBQUksR0FBSixJQUFJLENBQVE7WUFDWixPQUFFLEdBQUYsRUFBRTtZQUNGLGFBQVEsR0FBUixRQUFRO1lBQ1Isb0JBQWUsR0FBZixlQUFlO1lBQ2YsbUJBQWMsR0FBZCxjQUFjOzs7O3lCQTNCYjtnQkFDbkIsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsTUFBTSxFQUFFLElBQUk7Z0JBQ1osT0FBTyxFQUFFLElBQUk7Z0JBQ2IsS0FBSyxFQUFFO29CQUNMLEtBQUssRUFBRSxJQUFJO29CQUNYLE9BQU8sRUFBRSxJQUFJO2lCQUNkO2dCQUNELFNBQVMsRUFBRSxJQUFJO2dCQUNmLE1BQU0sRUFBRSxLQUFLO2dCQUNiLE1BQU0sRUFBRSxLQUFLO2FBQ2Q7Ozs7aUNBS3VCLElBQUlqQixZQUFPLEVBQU87Ozs7eUNBd0RsQixVQUFDLEVBQUU7Z0JBQ3pCLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUM3Qjs7OztrQ0FLZ0IsVUFBQyxFQUFFO2dCQUNsQixLQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ3RCOzs7O2lDQUtlLFVBQUMsRUFBRTs7O2dCQUVmLEtBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7O2FBRXZCOzs7O29DQStKMEI7Z0JBQ3pCLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsY0FBTSxPQUFBLEtBQUssR0FBQSxDQUFDLENBQUE7Z0JBQ3JGLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2FBQ3pCO1NBak9zRDs7Ozs7UUFFaEIsb0NBQVc7Ozs7WUFBbEQsVUFBbUQsS0FBSztnQkFDdEQsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsRUFBRTtvQkFDckMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDMUI7YUFDRjs7Ozs7UUFFdUMscUNBQVk7Ozs7WUFBcEQsVUFBcUQsS0FBSztnQkFDeEQsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsRUFBRTtvQkFDckMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDMUI7YUFDRjs7Ozs7UUFFd0Msc0NBQWE7Ozs7WUFBdEQsVUFBdUQsS0FBSztnQkFDMUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN4Qjs7OztRQUUwQixvQ0FBVzs7O1lBQXRDO2dCQUNFLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLEVBQUU7b0JBQ3JDLE9BQU8sS0FBSyxDQUFDO2lCQUNkO2FBQ0Y7Ozs7UUFFNEIsc0NBQWE7OztZQUExQztnQkFDRSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUFFO29CQUNyQyxPQUFPLEtBQUssQ0FBQztpQkFDZDthQUNGOzs7O1FBRUQsaUNBQVE7OztZQUFSO2dCQUFBLGlCQU1DO2dCQUxDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsYUFBYTtxQkFDMUMsSUFBSSxDQUFDb0IsZUFBSyxFQUFFLENBQUM7cUJBQ2IsU0FBUyxDQUFDO29CQUNULEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztpQkFDckIsQ0FBQyxDQUFDO2FBQ047Ozs7UUFFRCxvQ0FBVzs7O1lBQVg7Z0JBQ0UsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ3hDOzs7Ozs7OztRQStCTSxxQ0FBWTs7Ozs7OztzQkFBQyxLQUFLOzs7Z0JBQ3pCLElBQUksS0FBSyxHQUFXLElBQUksQ0FBQztnQkFFekIsSUFBSSxLQUFLLENBQUMsS0FBSyxLQUFLLENBQUMsRUFBRTtvQkFDdEIsT0FBTztpQkFDTDtnQkFFRCxLQUFLLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUV2QyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUN2QyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO2dCQUNqQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2dCQUMvQixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2dCQUMvQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMxQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBRXpCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQ3JGLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFFdkYsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztvQkFDMUIsS0FBSSxDQUFDLG9CQUFvQixHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsS0FBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7b0JBQ3BHLEtBQUksQ0FBQyxvQkFBb0IsR0FBRyxLQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO2lCQUNyRyxDQUFDLENBQUM7Ozs7Ozs7UUFRRywyQ0FBa0I7Ozs7O3NCQUFDLEtBQUs7Z0JBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU07b0JBQUUsT0FBTyxLQUFLLENBQUM7O2dCQUNyQyxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDekUsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO29CQUNyQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7aUJBQ3JCO2dCQUVELElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO2dCQUM1QixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztnQkFFNUIsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUM5RCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7b0JBQzFCLE9BQU87aUJBQ1I7Z0JBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUV6QixJQUFJLENBQUMsMEJBQTBCLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBRXZDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDMUYsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUUxRixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBRXZCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7Ozs7O1FBUXpCLG1EQUEwQjs7Ozs7c0JBQUMsS0FBVTs7Z0JBQzNDLElBQUksTUFBTSxHQUF1QixLQUFLLENBQUMsTUFBTSxDQUFDO2dCQUM5QyxPQUFPLE1BQU0sSUFBSSxFQUFFLE1BQU0sWUFBWSxpQkFBaUIsQ0FBQyxFQUFFO29CQUN2RCxNQUFNLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQztpQkFDL0I7Z0JBQ0QsSUFBSSxNQUFNLFlBQVksaUJBQWlCLEVBQUU7b0JBQ3ZDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxjQUFNLE9BQUEsS0FBSyxHQUFBLENBQUMsQ0FBQztpQkFDeEU7Ozs7Ozs7O1FBUUksb0NBQVc7Ozs7OztzQkFBQyxLQUFLO2dCQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNO29CQUFFLE9BQU8sS0FBSyxDQUFDOztnQkFFckMsSUFBSSxLQUFLLENBQVM7O2dCQUNsQixJQUFNLFdBQVcsR0FBcUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUVsRyxJQUFJLFdBQVcsS0FBSyxLQUFLLEVBQUU7b0JBQ3pCLE9BQU87aUJBQ1I7Z0JBQ0QsS0FBSyxxQkFBRyxXQUFxQixDQUFBLENBQUM7Z0JBRWhDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFFckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztnQkFDbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7OztRQU8xQyxpQ0FBUTs7Ozs7c0JBQUMsVUFBa0I7Z0JBQ2pDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxXQUFXLEVBQUUsaUJBQWUsVUFBVSxlQUFZLENBQUMsQ0FBQztnQkFDOUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQzs7Ozs7Ozs7O1FBU3pFLG1DQUFVOzs7Ozs7O3NCQUFDLEtBQUs7Z0JBQ3JCLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7Z0JBRS9DLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7b0JBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQzNFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUMsSUFBSSxHQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUV2TSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUM1QixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztvQkFDekIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7aUJBQzFCO2dCQUVELElBQUksQ0FBQyxLQUFLLEdBQUc7b0JBQ1gsSUFBSSxFQUFFLElBQUk7b0JBQ1YsTUFBTSxFQUFFLElBQUk7b0JBQ1osT0FBTyxFQUFFLElBQUk7b0JBQ2IsS0FBSyxFQUFFO3dCQUNMLEtBQUssRUFBRSxJQUFJO3dCQUNYLE9BQU8sRUFBRSxJQUFJO3FCQUNkO29CQUNELFNBQVMsRUFBRSxJQUFJO29CQUNmLE1BQU0sRUFBRSxLQUFLO29CQUNiLE1BQU0sRUFBRSxLQUFLO2lCQUNkLENBQUM7O2dCQUdGLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7Ozs7Ozs7UUFRbEIseUNBQWdCOzs7OztzQkFBQyxLQUFVO2dCQUNqQyxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Ozs7O1FBZTdDLHdDQUFlOzs7OztzQkFBQyxLQUFVO2dCQUNoQyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzs7Ozs7OztRQVF4RSxpQ0FBUTs7Ozs7c0JBQUMsS0FBVTtnQkFDekIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Ozs7Ozs7UUFTckMsb0NBQVc7Ozs7OztzQkFBQyxNQUFjLEVBQUUsTUFBYztnQkFDaEQsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7Ozs7Ozs7UUFRakQsNEJBQUc7Ozs7O3NCQUFDLGFBQXFCO2dCQUMvQixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDOzs7Ozs7O1FBT3hDLCtCQUFNOzs7OztzQkFBQyxJQUFZO2dCQUN6QixJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Ozs7O1FBTTNCLHFDQUFZOzs7OztnQkFDbEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7Ozs7Ozs7O1FBTXJDLHdDQUFlOzs7O1lBQWY7Z0JBQ0UsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLEVBQUUsQ0FBQzthQUN4Qzs7Ozs7UUFLTyx1Q0FBYzs7Ozs7Z0JBQ3BCLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLENBQUM7Ozs7Ozs7Ozs7O1FBT3ZDLDhCQUFLOzs7OztZQUFMLFVBQU0sRUFBRTtnQkFDTixJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUMvQjs7b0JBbmFGRSxjQUFTLFNBQUM7d0JBQ1QsUUFBUSxFQUFFLFdBQVc7d0JBQ3JCLFFBQVEsRUFBRSx5dUNBcUJUO3dCQUNELFVBQVUsRUFBRTs0QkFDVkksa0JBQU8sQ0FBQyxZQUFZLEVBQUU7Z0NBQ3BCQyxnQkFBSyxDQUFDLFFBQVEsRUFBRUMsZ0JBQUssQ0FBQyxFQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO2dDQUNuQ0QsZ0JBQUssQ0FBQyxNQUFNLEVBQUVDLGdCQUFLLENBQUMsRUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFDLENBQUMsQ0FBQztnQ0FDbkNDLHFCQUFVLENBQUMsZ0JBQWdCLEVBQUU7O29DQUUzQkMsa0JBQU8sQ0FBQyxhQUFhLENBQUM7aUNBQ3ZCLENBQUM7Z0NBQ0ZELHFCQUFVLENBQUMsZ0JBQWdCLEVBQUU7O29DQUUzQkMsa0JBQU8sQ0FBQyxHQUFHLENBQUM7aUNBQ2IsQ0FBQzs2QkFDSCxDQUFDO3lCQUNIO3FCQUNGOzs7Ozt3QkFwRG1CQyxXQUFNO3dCQUFFUixlQUFVO3dCQUFnQlMsY0FBUzt3QkFDdEQsZUFBZTt3QkFLZixjQUFjOzs7O21DQW1EcEJmLFVBQUs7Z0NBUUxBLFVBQUs7aUNBS0xBLFVBQUs7a0NBbUVMZ0IsaUJBQVksU0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUM7bUNBTXBDQSxpQkFBWSxTQUFDLFlBQVksRUFBRSxDQUFDLFFBQVEsQ0FBQztvQ0FNckNBLGlCQUFZLFNBQUMsYUFBYSxFQUFFLENBQUMsUUFBUSxDQUFDO2tDQUl0Q0EsaUJBQVksU0FBQyxXQUFXO29DQU14QkEsaUJBQVksU0FBQyxhQUFhOzs2QkEvSjdCOzs7Ozs7O0FDQUE7UUE0QkUsZ0NBQ1l0QixXQUF3QixLQUFxQixFQUM5QixRQUFnQixFQUFFLFFBQW1CLEVBQUUsRUFBYztZQURwRSxXQUFNLEdBQU5BLFNBQU07WUFBa0IsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7NEJBTnJDLEtBQUs7NEJBQ0MsRUFBRTtZQU8xQixJQUFJLFFBQVEsSUFBSSxJQUFJLEVBQUU7Z0JBQ3BCLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUM7YUFDMUQ7U0FDRjtRQUVELHNCQUNJLGlEQUFhOzs7O2dCQURqQixVQUNrQixRQUFzQjtnQkFDdEMsSUFBSSxRQUFRLElBQUksSUFBSSxFQUFFO29CQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsUUFBUSxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQ2pFO3FCQUFNO29CQUNMLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO2lCQUNwQjthQUNGOzs7V0FBQTtRQUtELHNCQUNJLHVEQUFtQjs7Ozs7Ozs7Z0JBRHZCLFVBQ3dCLEtBQWM7Z0JBQ3BDLElBQUl1QixjQUFTLEVBQUUsc0JBQVMsT0FBTyxDQUFBLHNCQUFTLE9BQU8sQ0FBQyxJQUFJLENBQUEsRUFBRTtvQkFDcEQsT0FBTyxDQUFDLElBQUksQ0FBQyxzRUFBc0UsQ0FBQyxDQUFDO2lCQUN0RjtnQkFDRCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQzthQUN2Qjs7O1dBQUE7Ozs7UUFHRCx3Q0FBTzs7O1lBRFA7O2dCQUVFLElBQU0sTUFBTSxHQUFHO29CQUNiLGtCQUFrQixFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUM7b0JBQzFELFVBQVUsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztpQkFDM0MsQ0FBQztnQkFDRixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7b0JBQ2pCLE9BQU8sS0FBSyxDQUFDO2lCQUNkO2dCQUNELElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ2hELE9BQU8sSUFBSSxDQUFDO2FBQ2I7UUFFRCxzQkFBSSwyQ0FBTzs7O2dCQUFYO2dCQUNFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtvQkFDOUMsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLO29CQUN0QixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7b0JBQzdCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtvQkFDdkIsbUJBQW1CLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBQ2pELG1CQUFtQixFQUFFLElBQUksQ0FBQyxtQkFBbUI7b0JBQzdDLGdCQUFnQixFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7aUJBQ3ZELENBQUMsQ0FBQzthQUNKOzs7V0FBQTs7b0JBdEVGbkIsY0FBUyxTQUFDLEVBQUMsUUFBUSxFQUFFLHdCQUF3QixFQUFDOzs7Ozt3QkFKWEQsYUFBTTt3QkFBRUQscUJBQWM7cURBMEJuRHNCLGNBQVMsU0FBQyxVQUFVO3dCQTdCdUVILGNBQVM7d0JBQTdFVCxlQUFVOzs7O2tDQVVyQ04sVUFBSzsrQkFFTEEsVUFBSzswQ0FFTEEsVUFBSzt1Q0FFTEEsVUFBSzt5Q0FFTEEsVUFBSztpQ0FFTEEsVUFBSzsrQkFFTEEsVUFBSztvQ0FhTEEsVUFBSzswQ0FZTEEsVUFBSzs4QkFRTGdCLGlCQUFZLFNBQUMsT0FBTzs7cUNBeER2Qjs7Ozs7Ozs7Ozs7Ozs7UUF1SEUsd0NBQ1l0QixXQUF3QixLQUFxQixFQUM3QztZQUZaLGlCQVFDO1lBUFcsV0FBTSxHQUFOQSxTQUFNO1lBQWtCLFVBQUssR0FBTCxLQUFLLENBQWdCO1lBQzdDLHFCQUFnQixHQUFoQixnQkFBZ0I7NEJBYlIsS0FBSzs0QkFFQyxFQUFFO1lBWTFCLElBQUksQ0FBQyxZQUFZLEdBQUdBLFNBQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQUMsQ0FBYztnQkFDekQsSUFBSSxDQUFDLFlBQVl5QixvQkFBYSxFQUFFO29CQUM5QixLQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztpQkFDL0I7YUFDRixDQUFDLENBQUM7U0FDSjtRQUVELHNCQUNJLHlEQUFhOzs7O2dCQURqQixVQUNrQixRQUFzQjtnQkFDdEMsSUFBSSxRQUFRLElBQUksSUFBSSxFQUFFO29CQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsUUFBUSxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQ2pFO3FCQUFNO29CQUNMLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO2lCQUNwQjthQUNGOzs7V0FBQTtRQUVELHNCQUNJLCtEQUFtQjs7OztnQkFEdkIsVUFDd0IsS0FBYztnQkFDcEMsSUFBSUYsY0FBUyxFQUFFLHNCQUFTLE9BQU8sQ0FBQSxzQkFBUyxPQUFPLENBQUMsSUFBSSxDQUFBLEVBQUU7b0JBQ3BELE9BQU8sQ0FBQyxJQUFJLENBQUMscUVBQXFFLENBQUMsQ0FBQztpQkFDckY7Z0JBQ0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7YUFDdkI7OztXQUFBOzs7OztRQUVELG9EQUFXOzs7O1lBQVgsVUFBWSxPQUFXLElBQVMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUMsRUFBRTs7OztRQUNoRSxvREFBVzs7O1lBQVgsY0FBcUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFOzs7Ozs7OztRQUd2RCxnREFBTzs7Ozs7OztZQURQLFVBQ1EsTUFBYyxFQUFFLE9BQWdCLEVBQUUsT0FBZ0IsRUFBRSxRQUFpQjtnQkFDM0UsSUFBSSxNQUFNLEtBQUssQ0FBQyxJQUFJLE9BQU8sSUFBSSxPQUFPLElBQUksUUFBUSxFQUFFO29CQUNsRCxPQUFPLElBQUksQ0FBQztpQkFDYjtnQkFFRCxJQUFJLE9BQU8sSUFBSSxDQUFDLE1BQU0sS0FBSyxRQUFRLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxPQUFPLEVBQUU7b0JBQzlELE9BQU8sSUFBSSxDQUFDO2lCQUNiO2dCQUVELElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtvQkFDakIsT0FBTyxLQUFLLENBQUM7aUJBQ2Q7O2dCQUVELElBQU0sTUFBTSxHQUFHO29CQUNiLGtCQUFrQixFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUM7b0JBQzFELFVBQVUsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztpQkFDM0MsQ0FBQztnQkFDRixJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUNoRCxPQUFPLEtBQUssQ0FBQzthQUNkOzs7O1FBRU8sK0RBQXNCOzs7O2dCQUM1QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs7UUFHL0Ysc0JBQUksbURBQU87OztnQkFBWDtnQkFDRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7b0JBQzlDLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSztvQkFDdEIsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO29CQUM3QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7b0JBQ3ZCLG1CQUFtQixFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO29CQUNqRCxtQkFBbUIsRUFBRSxJQUFJLENBQUMsbUJBQW1CO29CQUM3QyxnQkFBZ0IsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDO2lCQUN2RCxDQUFDLENBQUM7YUFDSjs7O1dBQUE7O29CQTVGRm5CLGNBQVMsU0FBQyxFQUFDLFFBQVEsRUFBRSxrQkFBa0IsRUFBQzs7Ozs7d0JBeEZMRCxhQUFNO3dCQUFFRCxxQkFBYzt3QkFKbER3Qix1QkFBZ0I7Ozs7NkJBK0ZyQkMsZ0JBQVcsU0FBQyxhQUFhLGNBQUdyQixVQUFLO2tDQUVqQ0EsVUFBSzsrQkFFTEEsVUFBSzswQ0FFTEEsVUFBSzt1Q0FFTEEsVUFBSzt5Q0FFTEEsVUFBSztpQ0FFTEEsVUFBSzsrQkFDTEEsVUFBSzsyQkFTTHFCLGdCQUFXO29DQVlYckIsVUFBSzswQ0FTTEEsVUFBSzs4QkFXTGdCLGlCQUFZLFNBQUMsT0FBTyxFQUFFLENBQUMsZUFBZSxFQUFFLGdCQUFnQixFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixDQUFDOzs2Q0FySmpHOzs7Ozs7SUEyTEEsdUJBQXVCLENBQU07UUFDM0IsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDeEI7Ozs7OztBQzdMRDtJQXFCQSxJQUFNLE1BQU0sR0FBVyxFQUFFLENBQUM7Ozs7O29CQUd6Qk0sYUFBUSxTQUFDO3dCQUNSLE9BQU8sRUFBRTs0QkFDUEMsbUJBQVk7OzRCQUVaQyxtQkFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7eUJBQUM7d0JBQ2hDLFlBQVksRUFBRSxDQUFDLGlCQUFpQixFQUFFLHNCQUFzQixFQUFFLGNBQWMsRUFBRSxzQkFBc0IsRUFBRSw4QkFBOEIsQ0FBQzt3QkFDakksT0FBTyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsc0JBQXNCLEVBQUUsc0JBQXNCLEVBQUUsOEJBQThCLENBQUM7d0JBQzVHLFNBQVMsRUFBRSxDQUFDLGdCQUFnQixFQUFFLGFBQWEsRUFBRSxrQkFBa0IsQ0FBQztxQkFDakU7OzZCQWhDRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=