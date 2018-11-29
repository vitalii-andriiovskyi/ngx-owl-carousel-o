/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { OwlCarouselOConfig, OwlOptionsMockedTypes } from '../carousel/owl-carousel-o-config';
import { OwlLogger } from './logger.service';
/**
 * Current state information and their tags.
 */
var /**
 * Current state information and their tags.
 */
States = /** @class */ (function () {
    function States() {
    }
    return States;
}());
/**
 * Current state information and their tags.
 */
export { States };
if (false) {
    /** @type {?} */
    States.prototype.current;
    /** @type {?} */
    States.prototype.tags;
}
/** @enum {string} */
var Type = {
    Event: 'event',
    State: 'state',
};
export { Type };
;
/** @enum {string} */
var Width = {
    Default: 'default',
    Inner: 'inner',
    Outer: 'outer',
};
export { Width };
;
/**
 * Model for coords of .owl-stage
 */
var /**
 * Model for coords of .owl-stage
 */
Coords = /** @class */ (function () {
    function Coords() {
    }
    return Coords;
}());
/**
 * Model for coords of .owl-stage
 */
export { Coords };
if (false) {
    /** @type {?} */
    Coords.prototype.x;
    /** @type {?} */
    Coords.prototype.y;
}
/**
 * Model for all current data of carousel
 */
var /**
 * Model for all current data of carousel
 */
CarouselCurrentData = /** @class */ (function () {
    function CarouselCurrentData() {
    }
    return CarouselCurrentData;
}());
/**
 * Model for all current data of carousel
 */
export { CarouselCurrentData };
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
var CarouselService = /** @class */ (function () {
    function CarouselService(logger) {
        var _this = this;
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
                        append.push(tslib_1.__assign({}, _this.slidesData[clones[clones.length - 1]]));
                        clones.push(_this.normalize(items.length - 1 - (clones.length - 1) / 2, true));
                        prepend.unshift(tslib_1.__assign({}, _this.slidesData[clones[clones.length - 1]]));
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
         */
        function () {
            return this._invalidated;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CarouselService.prototype, "states", {
        // is needed for tests
        get: /**
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
        this._options = tslib_1.__assign({}, configOptions, checkedOptions);
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
        var _this = this;
        /** @type {?} */
        var checkedOptions = tslib_1.__assign({}, options);
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
                        ;
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
        this.settings = tslib_1.__assign({}, this._options);
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
        this.settings = tslib_1.__assign({}, this.settings, { items: this._validateItems(overwrites[match].items) });
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
        if (this._mergers.length) {
            this._mergers = [];
        }
        slides.forEach(function (item) {
            /** @type {?} */
            var mergeN = _this.settings.merge ? item.dataMerge : 1;
            _this._mergers.push(mergeN);
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
    };
    ;
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
        var coordinates = /** @type {?} */ (this.coordinates());
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
    ;
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
    ;
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
            currentClasses[/** @type {?} */ (this.settings.animateIn)] = slide.isCustomAnimatedIn;
        }
        if (this.settings.animateOut) {
            currentClasses[/** @type {?} */ (this.settings.animateOut)] = slide.isCustomAnimatedOut;
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
    ;
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
    ;
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
        { type: Injectable }
    ];
    /** @nocollapse */
    CarouselService.ctorParameters = function () { return [
        { type: OwlLogger }
    ]; };
    return CarouselService;
}());
export { CarouselService };
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
    /** @type {?} */
    CarouselService.prototype.logger;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vd2wtY2Fyb3VzZWwtby8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9jYXJvdXNlbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBS0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUkzQyxPQUFPLEVBQUUsT0FBTyxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBSTlGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7OztBQUs3Qzs7O0FBQUE7OztpQkFuQkE7SUF3QkMsQ0FBQTs7OztBQUxELGtCQUtDOzs7Ozs7Ozs7SUFPQSxPQUFRLE9BQU87SUFDZixPQUFRLE9BQU87OztBQUNmLENBQUM7OztJQU9ELFNBQVUsU0FBUztJQUNuQixPQUFRLE9BQU87SUFDZixPQUFRLE9BQU87OztBQUNmLENBQUM7Ozs7QUFLRjs7O0FBQUE7OztpQkFoREE7SUFtREMsQ0FBQTs7OztBQUhELGtCQUdDOzs7Ozs7Ozs7O0FBS0Q7OztBQUFBOzs7OEJBeERBO0lBOERDLENBQUE7Ozs7QUFORCwrQkFNQzs7Ozs7Ozs7Ozs7Ozs7SUE4YUEseUJBQW9CLE1BQWlCO1FBQXJDLGlCQUEwQztRQUF0QixXQUFNLEdBQU4sTUFBTSxDQUFXOzs7O3FDQXZhTCxJQUFJLE9BQU8sRUFBdUI7Ozs7cUNBSWxDLElBQUksT0FBTyxFQUFVOzs7O3dDQUtsQixJQUFJLE9BQU8sRUFBTzs7Ozt5Q0FLakIsSUFBSSxPQUFPLEVBQU87Ozs7bUNBSXhCLElBQUksT0FBTyxFQUFVOzs7O29DQUlwQixJQUFJLE9BQU8sRUFBVTs7OztnQ0FJekIsSUFBSSxPQUFPLEVBQVU7Ozs7aUNBSXBCLElBQUksT0FBTyxFQUFVOzs7O2lDQUlyQixJQUFJLE9BQU8sRUFBVTs7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Q0FBQyxDQUFDO1lBQ3hCLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBQzNDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQztZQUMxRCxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLE9BQU8sQ0FBQztTQUMxRTtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1AsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBQ2xHLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUNsRyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckQsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxPQUFPLEdBQUcsSUFBSSxDQUFDLEVBQUUsT0FBTyxHQUFHLElBQUksQ0FB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Ozs7OztjQUFDLEtBQXVCO1FBQ2pELE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLE9BQU8sS0FBSyxLQUFLLFNBQVMsQ0FBQzs7Ozs7OztJQVFyRCwyQ0FBaUI7Ozs7O2NBQUMsS0FBc0I7UUFDL0MsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDOzs7Ozs7O0lBUXBELDRDQUFrQjs7Ozs7Y0FBQyxLQUFzQjtRQUNoRCxNQUFNLENBQUMsT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLE9BQU8sS0FBSyxLQUFLLFNBQVMsQ0FBQzs7SUFHL0Q7Ozs7OztTQU1FOzs7Ozs7OztJQUNGLG9DQUFVOzs7Ozs7O0lBQVYsVUFBVyxLQUFhLEVBQUUsTUFBYztRQUN4QyxNQUFNLENBQUM7WUFDTixDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQztZQUNyQixDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQztTQUNyQixDQUFDO0tBQ0Y7O2dCQXJuREQsVUFBVTs7OztnQkFsREYsU0FBUzs7MEJBZGxCOztTQWlFYSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IFN0YWdlRGF0YSB9IGZyb20gJy4uL21vZGVscy9zdGFnZS1kYXRhLm1vZGVsJztcclxuXHJcbmltcG9ydCB7IE93bERPTURhdGEgfSBmcm9tICcuLi9tb2RlbHMvb3dsRE9NLWRhdGEubW9kZWwnO1xyXG5cclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZSB9IGZyb20gJy4uL2Nhcm91c2VsL2Nhcm91c2VsLm1vZHVsZSc7XHJcbmltcG9ydCB7IFNsaWRlTW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvc2xpZGUubW9kZWwnO1xyXG5pbXBvcnQgeyBTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IE93bENhcm91c2VsT0NvbmZpZywgT3dsT3B0aW9uc01vY2tlZFR5cGVzIH0gZnJvbSAnLi4vY2Fyb3VzZWwvb3dsLWNhcm91c2VsLW8tY29uZmlnJztcclxuaW1wb3J0IHsgT3dsT3B0aW9ucyB9IGZyb20gJy4uL21vZGVscy9vd2wtb3B0aW9ucy5tb2RlbCc7XHJcblxyXG5pbXBvcnQgeyBOYXZEYXRhLCBEb3RzRGF0YSB9IGZyb20gJy4uL21vZGVscy9uYXZpZ2F0aW9uLWRhdGEubW9kZWxzJztcclxuaW1wb3J0IHsgT3dsTG9nZ2VyIH0gZnJvbSAnLi9sb2dnZXIuc2VydmljZSc7XHJcblxyXG4vKipcclxuICogQ3VycmVudCBzdGF0ZSBpbmZvcm1hdGlvbiBhbmQgdGhlaXIgdGFncy5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBTdGF0ZXMge1xyXG4gIGN1cnJlbnQ6IHt9O1xyXG4gIHRhZ3M6IHtcclxuICAgIFtrZXk6IHN0cmluZ106IHN0cmluZ1tdO1xyXG4gIH07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFbnVtZXJhdGlvbiBmb3IgdHlwZXMuXHJcbiAqIEBlbnVtIHtTdHJpbmd9XHJcbiAqL1xyXG5leHBvcnQgZW51bSBUeXBlIHtcclxuXHRFdmVudCA9ICdldmVudCcsXHJcblx0U3RhdGUgPSAnc3RhdGUnXHJcbn07XHJcblxyXG4vKipcclxuICogRW51bWVyYXRpb24gZm9yIHdpZHRoLlxyXG4gKiBAZW51bSB7U3RyaW5nfVxyXG4gKi9cclxuZXhwb3J0IGVudW0gV2lkdGgge1xyXG5cdERlZmF1bHQgPSAnZGVmYXVsdCcsXHJcblx0SW5uZXIgPSAnaW5uZXInLFxyXG5cdE91dGVyID0gJ291dGVyJ1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIE1vZGVsIGZvciBjb29yZHMgb2YgLm93bC1zdGFnZVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENvb3JkcyB7XHJcblx0eDogbnVtYmVyO1xyXG5cdHk6IG51bWJlcjtcclxufVxyXG5cclxuLyoqXHJcbiAqIE1vZGVsIGZvciBhbGwgY3VycmVudCBkYXRhIG9mIGNhcm91c2VsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ2Fyb3VzZWxDdXJyZW50RGF0YSB7XHJcblx0b3dsRE9NRGF0YTogT3dsRE9NRGF0YTtcclxuXHRzdGFnZURhdGE6IFN0YWdlRGF0YTtcclxuXHRzbGlkZXNEYXRhOiBTbGlkZU1vZGVsW107XHJcblx0bmF2RGF0YTogTmF2RGF0YTtcclxuXHRkb3RzRGF0YTogRG90c0RhdGE7XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIENhcm91c2VsU2VydmljZSB7XHJcblx0LyoqXHJcbiAgICogU3ViamVjdCBmb3IgcGFzc2luZyBkYXRhIG5lZWRlZCBmb3IgbWFuYWdpbmcgVmlld1xyXG4gICAqL1xyXG5cdHByaXZhdGUgX3ZpZXdTZXR0aW5nc1NoaXBwZXIkID0gbmV3IFN1YmplY3Q8Q2Fyb3VzZWxDdXJyZW50RGF0YT4oKTtcclxuXHQvKipcclxuICAgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gd2hlbiB0aGUgY2Fyb3VzZWwgZ290IGluaXRpYWxpemVzXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfaW5pdGlhbGl6ZWRDYXJvdXNlbCQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XHJcblxyXG5cdC8qKlxyXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSBjYXJvdXNlbCdzIHNldHRpbmdzIHN0YXJ0IGNoYW5naW5mXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfY2hhbmdlU2V0dGluZ3NDYXJvdXNlbCQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XHJcblxyXG5cdC8qKlxyXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSBjYXJvdXNlbCdzIHNldHRpbmdzIGhhdmUgY2hhbmdlZFxyXG4gICAqL1xyXG5cdHByaXZhdGUgX2NoYW5nZWRTZXR0aW5nc0Nhcm91c2VsJCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcclxuXHQvKipcclxuICAgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gd2hlbiB0aGUgY2Fyb3VzZWwgc3RhcnRzIHRyYW5zbGF0aW5nIG9yIG1vdmluZ1xyXG4gICAqL1xyXG5cdHByaXZhdGUgX3RyYW5zbGF0ZUNhcm91c2VsJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcclxuXHQvKipcclxuICAgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gd2hlbiB0aGUgY2Fyb3VzZWwgc3RvcHBlZCB0cmFuc2xhdGluZyBvciBtb3ZpbmdcclxuICAgKi9cclxuXHRwcml2YXRlIF90cmFuc2xhdGVkQ2Fyb3VzZWwkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xyXG5cdC8qKlxyXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSBjYXJvdXNlbCdzIHJlYnVpbGRpbmcgY2F1c2VkIGJ5ICdyZXNpemUnIGV2ZW50IHN0YXJ0c1xyXG4gICAqL1xyXG5cdHByaXZhdGUgX3Jlc2l6ZUNhcm91c2VsJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcclxuXHQvKipcclxuICAgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gIHdoZW4gdGhlIGNhcm91c2VsJ3MgcmVidWlsZGluZyBjYXVzZWQgYnkgJ3Jlc2l6ZScgZXZlbnQgaXMgZW5kZWRcclxuICAgKi9cclxuXHRwcml2YXRlIF9yZXNpemVkQ2Fyb3VzZWwkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xyXG5cdC8qKlxyXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSByZWZyZXNoIG9mIGNhcm91c2VsIHN0YXJ0c1xyXG4gICAqL1xyXG5cdHByaXZhdGUgX3JlZnJlc2hDYXJvdXNlbCQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XHJcblx0LyoqXHJcbiAgICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uIHdoZW4gdGhlIHJlZnJlc2ggb2YgY2Fyb3VzZWwgaXMgZW5kZWRcclxuICAgKi9cclxuXHRwcml2YXRlIF9yZWZyZXNoZWRDYXJvdXNlbCQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XHJcblx0LyoqXHJcbiAgICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uIHdoZW4gdGhlIGRyYWdnaW5nIG9mIGNhcm91c2VsIHN0YXJ0c1xyXG4gICAqL1xyXG5cdHByaXZhdGUgX2RyYWdDYXJvdXNlbCQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XHJcblx0LyoqXHJcbiAgICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uIHdoZW4gdGhlIGRyYWdnaW5nIG9mIGNhcm91c2VsIGlzIGVuZGVkXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfZHJhZ2dlZENhcm91c2VsJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ3VycmVudCBzZXR0aW5ncyBmb3IgdGhlIGNhcm91c2VsLlxyXG4gICAqL1xyXG4gIHNldHRpbmdzOiBPd2xPcHRpb25zID0ge1xyXG5cdFx0aXRlbXM6IDBcclxuXHR9O1xyXG5cclxuXHQvKipcclxuICAgKiBJbml0aWFsIGRhdGEgZm9yIHNldHRpbmcgY2xhc3NlcyB0byBlbGVtZW50IC5vd2wtY2Fyb3VzZWxcclxuICAgKi9cclxuXHRvd2xET01EYXRhOiBPd2xET01EYXRhID0ge1xyXG5cdFx0cnRsOiBmYWxzZSxcclxuXHRcdGlzUmVzcG9uc2l2ZTogZmFsc2UsXHJcblx0XHRpc1JlZnJlc2hlZDogZmFsc2UsXHJcblx0XHRpc0xvYWRlZDogZmFsc2UsXHJcblx0XHRpc0xvYWRpbmc6IGZhbHNlLFxyXG5cdFx0aXNNb3VzZURyYWdhYmxlOiBmYWxzZSxcclxuXHRcdGlzR3JhYjogZmFsc2UsXHJcblx0XHRpc1RvdWNoRHJhZ2FibGU6IGZhbHNlXHJcblx0fTtcclxuXHJcblx0LyoqXHJcbiAgICogSW5pdGlhbCBkYXRhIG9mIC5vd2wtc3RhZ2VcclxuICAgKi9cclxuXHRzdGFnZURhdGE6IFN0YWdlRGF0YSA9IHtcclxuXHRcdHRyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKDBweCwwcHgsMHB4KScsXHJcblx0XHR0cmFuc2l0aW9uOiAnMHMnLFxyXG5cdFx0d2lkdGg6IDAsXHJcblx0XHRwYWRkaW5nTDogMCxcclxuXHRcdHBhZGRpbmdSOiAwXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogIERhdGEgb2YgZXZlcnkgc2xpZGVcclxuXHQgKi9cclxuXHRzbGlkZXNEYXRhOiBTbGlkZU1vZGVsW107XHJcblxyXG5cdC8qKlxyXG5cdCAqIERhdGEgb2YgbmF2aWdhdGlvbiBibG9ja1xyXG5cdCAqL1xyXG5cdG5hdkRhdGE6IE5hdkRhdGE7XHJcblxyXG5cdC8qKlxyXG5cdCAqIERhdGEgb2YgZG90cyBibG9ja1xyXG5cdCAqL1xyXG5cdGRvdHNEYXRhOiBEb3RzRGF0YTtcclxuXHJcblx0LyoqXHJcblx0ICogQ2Fyb3VzZWwgd2lkdGhcclxuXHQgKi9cclxuXHRwcml2YXRlIF93aWR0aDogbnVtYmVyO1xyXG5cclxuXHQvKipcclxuXHQgKiBBbGwgcmVhbCBpdGVtcy5cclxuXHQgKi9cclxuXHRwcml2YXRlIF9pdGVtczogQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZVtdID0gW107IC8vIGlzIGVxdWFsIHRvIHRoaXMuc2xpZGVzXHJcblxyXG5cdC8qKlxyXG4gICAqIEFycmF5IHdpdGggd2lkdGggb2YgZXZlcnkgc2xpZGUuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfd2lkdGhzOiBhbnlbXSA9IFtdO1xyXG5cclxuXHQvKipcclxuICAgKiBDdXJyZW50bHkgc3VwcHJlc3NlZCBldmVudHMgdG8gcHJldmVudCB0aGVtIGZyb20gYmVlaW5nIHJldHJpZ2dlcmVkLlxyXG4gICAqL1xyXG5cdHByaXZhdGUgX3N1cHJlc3M6IGFueSA9IHt9O1xyXG5cclxuICAvKipcclxuICAgKiBSZWZlcmVuY2VzIHRvIHRoZSBydW5uaW5nIHBsdWdpbnMgb2YgdGhpcyBjYXJvdXNlbC5cclxuICAgKi9cclxuXHRwcml2YXRlIF9wbHVnaW5zOiBhbnkgPSB7fTtcclxuXHJcblx0LyoqXHJcbiAgICogQWJzb2x1dGUgY3VycmVudCBwb3NpdGlvbi5cclxuICAgKi9cclxuXHRwcml2YXRlIF9jdXJyZW50OiBudW1iZXIgfCBudWxsID0gbnVsbDtcclxuXHJcblx0LyoqXHJcbiAgICogQWxsIGNsb25lZCBpdGVtcy5cclxuICAgKi9cclxuXHRwcml2YXRlIF9jbG9uZXM6IGFueVtdID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIE1lcmdlIHZhbHVlcyBvZiBhbGwgaXRlbXMuXHJcbiAgICogQHRvZG8gTWF5YmUgdGhpcyBjb3VsZCBiZSBwYXJ0IG9mIGEgcGx1Z2luLlxyXG4gICAqL1xyXG5cdHByaXZhdGUgX21lcmdlcnM6IGFueVtdID0gW107XHJcblxyXG5cdC8qKlxyXG4gICAqIEFuaW1hdGlvbiBzcGVlZCBpbiBtaWxsaXNlY29uZHMuXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfc3BlZWQ6IG51bWJlciB8IG51bGwgPSBudWxsO1xyXG5cclxuXHQvKipcclxuICAgKiBDb29yZGluYXRlcyBvZiBhbGwgaXRlbXMgaW4gcGl4ZWwuXHJcbiAgICogQHRvZG8gVGhlIG5hbWUgb2YgdGhpcyBtZW1iZXIgaXMgbWlzc2xlYWRpbmcuXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfY29vcmRpbmF0ZXM6IG51bWJlcltdID0gW107XHJcblxyXG5cdC8qKlxyXG4gICAqIEN1cnJlbnQgYnJlYWtwb2ludC5cclxuICAgKiBAdG9kbyBSZWFsIG1lZGlhIHF1ZXJpZXMgd291bGQgYmUgbmljZS5cclxuICAgKi9cclxuXHRwcml2YXRlIF9icmVha3BvaW50OiBhbnkgPSBudWxsO1xyXG5cclxuXHQvKipcclxuXHQgKiBQcmVmaXggZm9yIGlkIG9mIGNsb25lZCBzbGlkZXNcclxuXHQgKi9cclxuXHRjbG9uZWRJZFByZWZpeCA9ICdjbG9uZWQtJztcclxuXHJcblx0LyoqXHJcblx0ICogQ3VycmVudCBvcHRpb25zIHNldCBieSB0aGUgY2FsbGVyIGluY2x1ZGluZyBkZWZhdWx0cy5cclxuXHQgKi9cclxuXHRfb3B0aW9uczogT3dsT3B0aW9ucyA9IHt9O1xyXG5cclxuICAvKipcclxuICAgKiBJbnZhbGlkYXRlZCBwYXJ0cyB3aXRoaW4gdGhlIHVwZGF0ZSBwcm9jZXNzLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2ludmFsaWRhdGVkOiBhbnkgPSB7fTtcclxuXHJcbiAgLy8gSXMgbmVlZGVkIGZvciB0ZXN0c1xyXG4gIGdldCBpbnZhbGlkYXRlZCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9pbnZhbGlkYXRlZDtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogQ3VycmVudCBzdGF0ZSBpbmZvcm1hdGlvbiBhbmQgdGhlaXIgdGFncy5cclxuICAgKi9cclxuICBwcml2YXRlIF9zdGF0ZXM6IFN0YXRlcyA9IHtcclxuICAgIGN1cnJlbnQ6IHt9LFxyXG4gICAgdGFnczoge1xyXG4gICAgICBpbml0aWFsaXppbmc6IFsnYnVzeSddLFxyXG4gICAgICBhbmltYXRpbmc6IFsnYnVzeSddLFxyXG4gICAgICBkcmFnZ2luZzogWydpbnRlcmFjdGluZyddXHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLy8gaXMgbmVlZGVkIGZvciB0ZXN0c1xyXG4gIGdldCBzdGF0ZXMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fc3RhdGVzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcbiBcdCAqIE9yZGVyZWQgbGlzdCBvZiB3b3JrZXJzIGZvciB0aGUgdXBkYXRlIHByb2Nlc3MuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfcGlwZTogYW55W10gPSBbXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgIGZpbHRlcjogWyd3aWR0aCcsICdzZXR0aW5ncyddLFxyXG4gICAgLy8gICBydW46ICgpID0+IHtcclxuICAgIC8vICAgICB0aGlzLl93aWR0aCA9IHRoaXMuY2Fyb3VzZWxXaW5kb3dXaWR0aDtcclxuICAgIC8vICAgfVxyXG4gICAgLy8gfSxcclxuICAgIHtcclxuICAgICAgZmlsdGVyOiBbJ3dpZHRoJywgJ2l0ZW1zJywgJ3NldHRpbmdzJ10sXHJcbiAgICAgIHJ1bjogY2FjaGUgPT4ge1xyXG4gICAgICAgIGNhY2hlLmN1cnJlbnQgPSB0aGlzLl9pdGVtcyAmJiB0aGlzLl9pdGVtc1t0aGlzLnJlbGF0aXZlKHRoaXMuX2N1cnJlbnQpXS5pZDtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vIHtcclxuICAgIC8vICAgZmlsdGVyOiBbJ2l0ZW1zJywgJ3NldHRpbmdzJ10sXHJcbiAgICAvLyAgIHJ1bjogZnVuY3Rpb24oKSB7XHJcbiAgICAvLyAgICAgLy8gdGhpcy4kc3RhZ2UuY2hpbGRyZW4oJy5jbG9uZWQnKS5yZW1vdmUoKTtcclxuICAgIC8vICAgfVxyXG5cdFx0Ly8gfSxcclxuXHRcdCB7XHJcbiAgICAgIGZpbHRlcjogWyAnd2lkdGgnLCAnaXRlbXMnLCAnc2V0dGluZ3MnIF0sXHJcbiAgICAgIHJ1bjogKGNhY2hlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbWFyZ2luID0gdGhpcy5zZXR0aW5ncy5tYXJnaW4gfHwgJycsXHJcbiAgICAgICAgICBncmlkID0gIXRoaXMuc2V0dGluZ3MuYXV0b1dpZHRoLFxyXG4gICAgICAgICAgcnRsID0gdGhpcy5zZXR0aW5ncy5ydGwsXHJcbiAgICAgICAgICBjc3MgPSB7XHJcbiAgICAgICAgICAgICdtYXJnaW4tbGVmdCc6IHJ0bCA/IG1hcmdpbiA6ICcnLFxyXG4gICAgICAgICAgICAnbWFyZ2luLXJpZ2h0JzogcnRsID8gJycgOiBtYXJnaW5cclxuICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmKCFncmlkKSB7XHJcblx0XHRcdFx0XHR0aGlzLnNsaWRlc0RhdGEuZm9yRWFjaChzbGlkZSA9PiB7XHJcblx0XHRcdFx0XHRcdHNsaWRlLm1hcmdpbkwgPSBjc3NbJ21hcmdpbi1sZWZ0J107XHJcblx0XHRcdFx0XHRcdHNsaWRlLm1hcmdpblIgPSBjc3NbJ21hcmdpbi1yaWdodCddO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fVxyXG5cclxuICAgICAgICBjYWNoZS5jc3MgPSBjc3M7XHJcbiAgICAgIH1cclxuICAgIH0sIHtcclxuICAgICAgZmlsdGVyOiBbICd3aWR0aCcsICdpdGVtcycsICdzZXR0aW5ncycgXSxcclxuICAgICAgcnVuOiAoY2FjaGUpID0+IHtcclxuICAgICAgICBjb25zdCB3aWR0aDogYW55ID0gKyh0aGlzLndpZHRoKCkgLyB0aGlzLnNldHRpbmdzLml0ZW1zKS50b0ZpeGVkKDMpIC0gdGhpcy5zZXR0aW5ncy5tYXJnaW4sXHJcbiAgICAgICAgICBncmlkID0gIXRoaXMuc2V0dGluZ3MuYXV0b1dpZHRoLFxyXG4gICAgICAgICAgd2lkdGhzID0gW107XHJcblx0XHRcdFx0bGV0IG1lcmdlID0gbnVsbCxcclxuXHRcdFx0XHRcdFx0aXRlcmF0b3IgPSB0aGlzLl9pdGVtcy5sZW5ndGg7XHJcblxyXG4gICAgICAgIGNhY2hlLml0ZW1zID0ge1xyXG4gICAgICAgICAgbWVyZ2U6IGZhbHNlLFxyXG4gICAgICAgICAgd2lkdGg6IHdpZHRoXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgd2hpbGUgKGl0ZXJhdG9yLS0pIHtcclxuICAgICAgICAgIG1lcmdlID0gdGhpcy5fbWVyZ2Vyc1tpdGVyYXRvcl07XHJcbiAgICAgICAgICBtZXJnZSA9IHRoaXMuc2V0dGluZ3MubWVyZ2VGaXQgJiYgTWF0aC5taW4obWVyZ2UsIHRoaXMuc2V0dGluZ3MuaXRlbXMpIHx8IG1lcmdlO1xyXG4gICAgICAgICAgY2FjaGUuaXRlbXMubWVyZ2UgPSBtZXJnZSA+IDEgfHwgY2FjaGUuaXRlbXMubWVyZ2U7XHJcblxyXG4gICAgICAgICAgd2lkdGhzW2l0ZXJhdG9yXSA9ICFncmlkID8gdGhpcy5faXRlbXNbaXRlcmF0b3JdLndpZHRoID8gdGhpcy5faXRlbXNbaXRlcmF0b3JdLndpZHRoIDogd2lkdGggOiB3aWR0aCAqIG1lcmdlO1xyXG4gICAgICAgIH1cclxuXHJcblx0XHRcdFx0dGhpcy5fd2lkdGhzID0gd2lkdGhzO1xyXG5cclxuXHRcdFx0XHR0aGlzLnNsaWRlc0RhdGEuZm9yRWFjaCgoc2xpZGUsIGkpID0+IHtcclxuXHRcdFx0XHRcdHNsaWRlLndpZHRoID0gdGhpcy5fd2lkdGhzW2ldO1xyXG5cdFx0XHRcdFx0c2xpZGUubWFyZ2luUiA9IGNhY2hlLmNzc1snbWFyZ2luLXJpZ2h0J107XHJcblx0XHRcdFx0XHRzbGlkZS5tYXJnaW5MID0gY2FjaGUuY3NzWydtYXJnaW4tbGVmdCddO1xyXG5cdFx0XHRcdH0pO1xyXG4gICAgICB9XHJcbiAgICB9LCB7XHJcbiAgICAgIGZpbHRlcjogWyAnaXRlbXMnLCAnc2V0dGluZ3MnIF0sXHJcbiAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNsb25lczogYW55W10gPSBbXSxcclxuICAgICAgICAgIGl0ZW1zOiBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlW10gPSB0aGlzLl9pdGVtcyxcclxuICAgICAgICAgIHNldHRpbmdzOiBhbnkgPSB0aGlzLnNldHRpbmdzLFxyXG4gICAgICAgICAgLy8gVE9ETzogU2hvdWxkIGJlIGNvbXB1dGVkIGZyb20gbnVtYmVyIG9mIG1pbiB3aWR0aCBpdGVtcyBpbiBzdGFnZVxyXG4gICAgICAgICAgdmlldyA9IE1hdGgubWF4KHNldHRpbmdzLml0ZW1zICogMiwgNCksXHJcbiAgICAgICAgICBzaXplID0gTWF0aC5jZWlsKGl0ZW1zLmxlbmd0aCAvIDIpICogMjtcclxuXHRcdFx0XHRsZXQgIGFwcGVuZDogYW55W10gPSBbXSxcclxuICAgICAgICAgIHByZXBlbmQ6IGFueVtdID0gW10sXHJcblx0XHRcdFx0XHRyZXBlYXQgPSBzZXR0aW5ncy5sb29wICYmIGl0ZW1zLmxlbmd0aCA/IHNldHRpbmdzLnJld2luZCA/IHZpZXcgOiBNYXRoLm1heCh2aWV3LCBzaXplKSA6IDA7XHJcblxyXG4gICAgICAgIHJlcGVhdCAvPSAyO1xyXG5cclxuICAgICAgICB3aGlsZSAocmVwZWF0LS0pIHtcclxuICAgICAgICAgIC8vIFN3aXRjaCB0byBvbmx5IHVzaW5nIGFwcGVuZGVkIGNsb25lc1xyXG4gICAgICAgICAgY2xvbmVzLnB1c2godGhpcy5ub3JtYWxpemUoY2xvbmVzLmxlbmd0aCAvIDIsIHRydWUpKTtcclxuICAgICAgICAgIGFwcGVuZC5wdXNoKHsgLi4udGhpcy5zbGlkZXNEYXRhW2Nsb25lc1tjbG9uZXMubGVuZ3RoIC0gMV1dfSk7XHJcblx0XHRcdFx0XHRjbG9uZXMucHVzaCh0aGlzLm5vcm1hbGl6ZShpdGVtcy5sZW5ndGggLSAxIC0gKGNsb25lcy5sZW5ndGggLSAxKSAvIDIsIHRydWUpKTtcclxuXHRcdFx0XHRcdHByZXBlbmQudW5zaGlmdCh7IC4uLnRoaXMuc2xpZGVzRGF0YVtjbG9uZXNbY2xvbmVzLmxlbmd0aCAtIDFdXX0pO1xyXG4gICAgICAgIH1cclxuXHJcblx0XHRcdFx0dGhpcy5fY2xvbmVzID0gY2xvbmVzO1xyXG5cclxuXHRcdFx0XHRhcHBlbmQgPSBhcHBlbmQubWFwKHNsaWRlID0+IHtcclxuXHRcdFx0XHRcdHNsaWRlLmlkID0gYCR7dGhpcy5jbG9uZWRJZFByZWZpeH0ke3NsaWRlLmlkfWA7XHJcblx0XHRcdFx0XHRzbGlkZS5pc0FjdGl2ZSA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0c2xpZGUuaXNDbG9uZWQgPSB0cnVlO1xyXG5cdFx0XHRcdFx0cmV0dXJuIHNsaWRlO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRwcmVwZW5kID0gcHJlcGVuZC5tYXAoc2xpZGUgPT4ge1xyXG5cdFx0XHRcdFx0c2xpZGUuaWQgPSBgJHt0aGlzLmNsb25lZElkUHJlZml4fSR7c2xpZGUuaWR9YDtcclxuXHRcdFx0XHRcdHNsaWRlLmlzQWN0aXZlID0gZmFsc2U7XHJcblx0XHRcdFx0XHRzbGlkZS5pc0Nsb25lZCA9IHRydWU7XHJcblx0XHRcdFx0XHRyZXR1cm4gc2xpZGU7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdHRoaXMuc2xpZGVzRGF0YSA9IHByZXBlbmQuY29uY2F0KHRoaXMuc2xpZGVzRGF0YSkuY29uY2F0KGFwcGVuZCk7XHJcbiAgICAgIH1cclxuICAgIH0sIHtcclxuICAgICAgZmlsdGVyOiBbICd3aWR0aCcsICdpdGVtcycsICdzZXR0aW5ncycgXSxcclxuICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcnRsID0gdGhpcy5zZXR0aW5ncy5ydGwgPyAxIDogLTEsXHJcbiAgICAgICAgICBzaXplID0gdGhpcy5fY2xvbmVzLmxlbmd0aCArIHRoaXMuX2l0ZW1zLmxlbmd0aCxcclxuICAgICAgICAgIGNvb3JkaW5hdGVzID0gW107XHJcbiAgICAgICAgbGV0IGl0ZXJhdG9yID0gLTEsXHJcbiAgICAgICAgICBwcmV2aW91cyA9IDAsXHJcbiAgICAgICAgICBjdXJyZW50ID0gMDtcclxuXHJcbiAgICAgICAgd2hpbGUgKCsraXRlcmF0b3IgPCBzaXplKSB7XHJcbiAgICAgICAgICBwcmV2aW91cyA9IGNvb3JkaW5hdGVzW2l0ZXJhdG9yIC0gMV0gfHwgMDtcclxuICAgICAgICAgIGN1cnJlbnQgPSB0aGlzLl93aWR0aHNbdGhpcy5yZWxhdGl2ZShpdGVyYXRvcildICsgdGhpcy5zZXR0aW5ncy5tYXJnaW47XHJcbiAgICAgICAgICBjb29yZGluYXRlcy5wdXNoKHByZXZpb3VzICsgY3VycmVudCAqIHJ0bCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9jb29yZGluYXRlcyA9IGNvb3JkaW5hdGVzO1xyXG4gICAgICB9XHJcbiAgICB9LCB7XHJcbiAgICAgIGZpbHRlcjogWyAnd2lkdGgnLCAnaXRlbXMnLCAnc2V0dGluZ3MnIF0sXHJcbiAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHBhZGRpbmcgPSB0aGlzLnNldHRpbmdzLnN0YWdlUGFkZGluZyxcclxuICAgICAgICAgIGNvb3JkaW5hdGVzID0gdGhpcy5fY29vcmRpbmF0ZXMsXHJcbiAgICAgICAgICBjc3MgPSB7XHJcbiAgICAgICAgICAgICd3aWR0aCc6IE1hdGguY2VpbChNYXRoLmFicyhjb29yZGluYXRlc1tjb29yZGluYXRlcy5sZW5ndGggLSAxXSkpICsgcGFkZGluZyAqIDIsXHJcbiAgICAgICAgICAgICdwYWRkaW5nLWxlZnQnOiBwYWRkaW5nIHx8ICcnLFxyXG4gICAgICAgICAgICAncGFkZGluZy1yaWdodCc6IHBhZGRpbmcgfHwgJydcclxuXHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdHRoaXMuc3RhZ2VEYXRhLndpZHRoID0gY3NzLndpZHRoOyAvLyB1c2UgdGhpcyBwcm9wZXJ0eSBpbiAqbmdJZiBkaXJlY3RpdmUgZm9yIC5vd2wtc3RhZ2UgZWxlbWVudFxyXG5cdFx0XHRcdHRoaXMuc3RhZ2VEYXRhLnBhZGRpbmdMID0gY3NzWydwYWRkaW5nLWxlZnQnXTtcclxuXHRcdFx0XHR0aGlzLnN0YWdlRGF0YS5wYWRkaW5nUiA9IGNzc1sncGFkZGluZy1yaWdodCddO1xyXG4gICAgICB9XHJcbiAgICB9LCB7XHJcbiAgICAvLyAgIGZpbHRlcjogWyAnd2lkdGgnLCAnaXRlbXMnLCAnc2V0dGluZ3MnIF0sXHJcbiAgICAvLyAgIHJ1bjogY2FjaGUgPT4ge1xyXG5cdFx0Ly8gXHRcdC8vIHRoaXMgbWV0aG9kIHNldHMgdGhlIHdpZHRoIGZvciBldmVyeSBzbGlkZSwgYnV0IEkgc2V0IGl0IGluIGRpZmZlcmVudCB3YXkgZWFybGllclxyXG5cdFx0Ly8gXHRcdGNvbnN0IGdyaWQgPSAhdGhpcy5zZXR0aW5ncy5hdXRvV2lkdGgsXHJcblx0XHQvLyBcdFx0aXRlbXMgPSB0aGlzLiRzdGFnZS5jaGlsZHJlbigpOyAvLyB1c2UgdGhpcy5zbGlkZXNEYXRhXHJcbiAgICAvLyAgICAgbGV0IGl0ZXJhdG9yID0gdGhpcy5fY29vcmRpbmF0ZXMubGVuZ3RoO1xyXG5cclxuICAgIC8vICAgICBpZiAoZ3JpZCAmJiBjYWNoZS5pdGVtcy5tZXJnZSkge1xyXG4gICAgLy8gICAgICAgd2hpbGUgKGl0ZXJhdG9yLS0pIHtcclxuICAgIC8vICAgICAgICAgY2FjaGUuY3NzLndpZHRoID0gdGhpcy5fd2lkdGhzW3RoaXMucmVsYXRpdmUoaXRlcmF0b3IpXTtcclxuICAgIC8vICAgICAgICAgaXRlbXMuZXEoaXRlcmF0b3IpLmNzcyhjYWNoZS5jc3MpO1xyXG4gICAgLy8gICAgICAgfVxyXG4gICAgLy8gICAgIH0gZWxzZSBpZiAoZ3JpZCkge1xyXG4gICAgLy8gICAgICAgY2FjaGUuY3NzLndpZHRoID0gY2FjaGUuaXRlbXMud2lkdGg7XHJcbiAgICAvLyAgICAgICBpdGVtcy5jc3MoY2FjaGUuY3NzKTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgIH1cclxuICAgIC8vIH0sIHtcclxuICAgIC8vICAgZmlsdGVyOiBbICdpdGVtcycgXSxcclxuICAgIC8vICAgcnVuOiBmdW5jdGlvbigpIHtcclxuICAgIC8vICAgICB0aGlzLl9jb29yZGluYXRlcy5sZW5ndGggPCAxICYmIHRoaXMuJHN0YWdlLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAvLyAgIH1cclxuICAgIC8vIH0sIHtcclxuICAgICAgZmlsdGVyOiBbICd3aWR0aCcsICdpdGVtcycsICdzZXR0aW5ncycgXSxcclxuICAgICAgcnVuOiBjYWNoZSA9PiB7XHJcbiAgICAgICAgbGV0IGN1cnJlbnQgPSBjYWNoZS5jdXJyZW50ID8gdGhpcy5zbGlkZXNEYXRhLmZpbmRJbmRleChzbGlkZSA9PiBzbGlkZS5pZCA9PT0gY2FjaGUuY3VycmVudCkgOiAwO1xyXG4gICAgICAgXHRjdXJyZW50ID0gTWF0aC5tYXgodGhpcy5taW5pbXVtKCksIE1hdGgubWluKHRoaXMubWF4aW11bSgpLCBjdXJyZW50KSk7XHJcbiAgICAgICAgdGhpcy5yZXNldChjdXJyZW50KTtcclxuICAgICAgfVxyXG4gICAgfSwge1xyXG4gICAgICBmaWx0ZXI6IFsgJ3Bvc2l0aW9uJyBdLFxyXG4gICAgICBydW46ICgpID0+IHtcclxuICAgICAgICB0aGlzLmFuaW1hdGUodGhpcy5jb29yZGluYXRlcyh0aGlzLl9jdXJyZW50KSk7XHJcbiAgICAgIH1cclxuICAgIH0sIHtcclxuICAgICAgZmlsdGVyOiBbICd3aWR0aCcsICdwb3NpdGlvbicsICdpdGVtcycsICdzZXR0aW5ncycgXSxcclxuICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcnRsID0gdGhpcy5zZXR0aW5ncy5ydGwgPyAxIDogLTEsXHJcblx0XHRcdFx0XHRwYWRkaW5nID0gdGhpcy5zZXR0aW5ncy5zdGFnZVBhZGRpbmcgKiAyLFxyXG5cdFx0XHRcdFx0bWF0Y2hlcyA9IFtdO1xyXG5cdFx0XHRcdGxldCBiZWdpbiwgZW5kLCBpbm5lciwgb3V0ZXIsIGksIG47XHJcblxyXG5cdFx0XHRcdGJlZ2luID0gdGhpcy5jb29yZGluYXRlcyh0aGlzLmN1cnJlbnQoKSk7XHJcblx0XHRcdFx0aWYgKHR5cGVvZiBiZWdpbiA9PT0gJ251bWJlcicgKSB7XHJcblx0XHRcdFx0XHRiZWdpbiArPSBwYWRkaW5nO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRiZWdpbiA9IDA7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRlbmQgPSBiZWdpbiArIHRoaXMud2lkdGgoKSAqIHJ0bDtcclxuXHJcblx0XHRcdFx0aWYgKHJ0bCA9PT0gLTEgJiYgdGhpcy5zZXR0aW5ncy5jZW50ZXIpIHtcclxuXHRcdFx0XHRcdGNvbnN0IHJlc3VsdCA9XHR0aGlzLl9jb29yZGluYXRlcy5maWx0ZXIoZWxlbWVudCA9PiB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLnNldHRpbmdzLml0ZW1zICUgMiA9PT0gMSA/IGVsZW1lbnQgPj0gYmVnaW4gOiBlbGVtZW50ID4gYmVnaW47XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdGJlZ2luID0gcmVzdWx0Lmxlbmd0aCA/IHJlc3VsdFtyZXN1bHQubGVuZ3RoIC0gMV0gOiBiZWdpbjtcclxuXHRcdFx0XHR9XHJcblxyXG4gICAgICAgIGZvciAoaSA9IDAsIG4gPSB0aGlzLl9jb29yZGluYXRlcy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgIGlubmVyID0gTWF0aC5jZWlsKHRoaXMuX2Nvb3JkaW5hdGVzW2kgLSAxXSB8fCAwKTtcclxuXHRcdFx0XHRcdG91dGVyID0gTWF0aC5jZWlsKE1hdGguYWJzKHRoaXMuX2Nvb3JkaW5hdGVzW2ldKSArIHBhZGRpbmcgKiBydGwpO1xyXG5cclxuICAgICAgICAgIGlmICgodGhpcy5fb3AoaW5uZXIsICc8PScsIGJlZ2luKSAmJiAodGhpcy5fb3AoaW5uZXIsICc+JywgZW5kKSkpXHJcbiAgICAgICAgICAgIHx8ICh0aGlzLl9vcChvdXRlciwgJzwnLCBiZWdpbikgJiYgdGhpcy5fb3Aob3V0ZXIsICc+JywgZW5kKSkpIHtcclxuICAgICAgICAgICAgbWF0Y2hlcy5wdXNoKGkpO1xyXG4gICAgICAgICAgfVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dGhpcy5zbGlkZXNEYXRhLmZvckVhY2goc2xpZGUgPT4ge1xyXG5cdFx0XHRcdFx0c2xpZGUuaXNBY3RpdmUgPSBmYWxzZTtcclxuXHRcdFx0XHRcdHJldHVybiBzbGlkZTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRtYXRjaGVzLmZvckVhY2goaXRlbSA9PiB7XHJcblx0XHRcdFx0XHR0aGlzLnNsaWRlc0RhdGFbaXRlbV0uaXNBY3RpdmUgPSB0cnVlO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5jZW50ZXIpIHtcclxuXHRcdFx0XHRcdHRoaXMuc2xpZGVzRGF0YS5mb3JFYWNoKHNsaWRlID0+IHtcclxuXHRcdFx0XHRcdFx0c2xpZGUuaXNDZW50ZXJlZCA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gc2xpZGU7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdHRoaXMuc2xpZGVzRGF0YVt0aGlzLmN1cnJlbnQoKV0uaXNDZW50ZXJlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgXTtcclxuXHJcblx0Y29uc3RydWN0b3IocHJpdmF0ZSBsb2dnZXI6IE93bExvZ2dlcikgeyB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIF92aWV3U2V0dGluZ3NTaGlwcGVyJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXHJcblx0ICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfdmlld1NldHRpbmdzU2hpcHBlciQgU3ViamVjdFxyXG5cdCAqL1xyXG5cdGdldFZpZXdDdXJTZXR0aW5ncygpOiBPYnNlcnZhYmxlPENhcm91c2VsQ3VycmVudERhdGE+IHtcclxuXHRcdHJldHVybiB0aGlzLl92aWV3U2V0dGluZ3NTaGlwcGVyJC5hc09ic2VydmFibGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIF9pbml0aWFsaXplZENhcm91c2VsJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXHJcblx0ICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfaW5pdGlhbGl6ZWRDYXJvdXNlbCQgU3ViamVjdFxyXG5cdCAqL1xyXG5cdGdldEluaXRpYWxpemVkU3RhdGUoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcclxuXHRcdHJldHVybiB0aGlzLl9pbml0aWFsaXplZENhcm91c2VsJC5hc09ic2VydmFibGUoKVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgX2NoYW5nZVNldHRpbmdzQ2Fyb3VzZWwkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcclxuXHQgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIF9jaGFuZ2VTZXR0aW5nc0Nhcm91c2VsJCBTdWJqZWN0XHJcblx0ICovXHJcblx0Z2V0Q2hhbmdlU3RhdGUoKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuXHRcdHJldHVybiB0aGlzLl9jaGFuZ2VTZXR0aW5nc0Nhcm91c2VsJC5hc09ic2VydmFibGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIF9jaGFuZ2VkU2V0dGluZ3NDYXJvdXNlbCQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxyXG5cdCAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX2NoYW5nZWRTZXR0aW5nc0Nhcm91c2VsJCBTdWJqZWN0XHJcblx0ICovXHJcblx0Z2V0Q2hhbmdlZFN0YXRlKCk6IE9ic2VydmFibGU8YW55PiB7XHJcblx0XHRyZXR1cm4gdGhpcy5fY2hhbmdlZFNldHRpbmdzQ2Fyb3VzZWwkLmFzT2JzZXJ2YWJsZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgX3RyYW5zbGF0ZUNhcm91c2VsJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXHJcblx0ICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfdHJhbnNsYXRlQ2Fyb3VzZWwkIFN1YmplY3RcclxuXHQgKi9cclxuXHRnZXRUcmFuc2xhdGVTdGF0ZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3RyYW5zbGF0ZUNhcm91c2VsJC5hc09ic2VydmFibGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIF90cmFuc2xhdGVkQ2Fyb3VzZWwkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcclxuXHQgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIF90cmFuc2xhdGVkQ2Fyb3VzZWwkIFN1YmplY3RcclxuXHQgKi9cclxuXHRnZXRUcmFuc2xhdGVkU3RhdGUoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcclxuXHRcdHJldHVybiB0aGlzLl90cmFuc2xhdGVkQ2Fyb3VzZWwkLmFzT2JzZXJ2YWJsZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgX3Jlc2l6ZUNhcm91c2VsJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXHJcblx0ICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfcmVzaXplQ2Fyb3VzZWwkIFN1YmplY3RcclxuXHQgKi9cclxuXHRnZXRSZXNpemVTdGF0ZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3Jlc2l6ZUNhcm91c2VsJC5hc09ic2VydmFibGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIF9yZXNpemVkQ2Fyb3VzZWwkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcclxuXHQgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIF9yZXNpemVkQ2Fyb3VzZWwkIFN1YmplY3RcclxuXHQgKi9cclxuXHRnZXRSZXNpemVkU3RhdGUoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcclxuXHRcdHJldHVybiB0aGlzLl9yZXNpemVkQ2Fyb3VzZWwkLmFzT2JzZXJ2YWJsZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgX3JlZnJlc2hDYXJvdXNlbCQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxyXG5cdCAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX3JlZnJlc2hDYXJvdXNlbCQgU3ViamVjdFxyXG5cdCAqL1xyXG5cdGdldFJlZnJlc2hTdGF0ZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3JlZnJlc2hDYXJvdXNlbCQuYXNPYnNlcnZhYmxlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBfcmVmcmVzaGVkQ2Fyb3VzZWwkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcclxuXHQgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIF9yZWZyZXNoZWRDYXJvdXNlbCQgU3ViamVjdFxyXG5cdCAqL1xyXG5cdGdldFJlZnJlc2hlZFN0YXRlKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XHJcblx0XHRyZXR1cm4gdGhpcy5fcmVmcmVzaGVkQ2Fyb3VzZWwkLmFzT2JzZXJ2YWJsZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgX2RyYWdDYXJvdXNlbCQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxyXG5cdCAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX2RyYWdDYXJvdXNlbCQgU3ViamVjdFxyXG5cdCAqL1xyXG5cdGdldERyYWdTdGF0ZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2RyYWdDYXJvdXNlbCQuYXNPYnNlcnZhYmxlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBfZHJhZ2dlZENhcm91c2VsJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXHJcblx0ICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfZHJhZ2dlZENhcm91c2VsJCBTdWJqZWN0XHJcblx0ICovXHJcblx0Z2V0RHJhZ2dlZFN0YXRlKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XHJcblx0XHRyZXR1cm4gdGhpcy5fZHJhZ2dlZENhcm91c2VsJC5hc09ic2VydmFibGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHVwcyBjdXN0b20gb3B0aW9ucyBleHBhbmRpbmcgZGVmYXVsdCBvcHRpb25zXHJcblx0ICogQHBhcmFtIG9wdGlvbnMgY3VzdG9tIG9wdGlvbnNcclxuXHQgKi9cclxuXHRzZXRPcHRpb25zKG9wdGlvbnM6IE93bE9wdGlvbnMpIHtcclxuXHRcdGNvbnN0IGNvbmZpZ09wdGlvbnM6IE93bE9wdGlvbnMgPSBuZXcgT3dsQ2Fyb3VzZWxPQ29uZmlnKCk7XHJcblx0XHRjb25zdCBjaGVja2VkT3B0aW9uczogT3dsT3B0aW9ucyA9IHRoaXMuX3ZhbGlkYXRlT3B0aW9ucyhvcHRpb25zLCBjb25maWdPcHRpb25zKTtcclxuXHRcdHRoaXMuX29wdGlvbnMgPSB7IC4uLmNvbmZpZ09wdGlvbnMsIC4uLmNoZWNrZWRPcHRpb25zfTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyB3aGV0aGVyIHVzZXIncyBvcHRpb24gYXJlIHNldCBwcm9wZXJseS4gQ2hla2luZyBpcyBiYXNlZCBvbiB0eXBpbmdzO1xyXG5cdCAqIEBwYXJhbSBvcHRpb25zIG9wdGlvbnMgc2V0IGJ5IHVzZXJcclxuXHQgKiBAcGFyYW0gY29uZmlnT3B0aW9ucyBkZWZhdWx0IG9wdGlvbnNcclxuXHQgKiBAcmV0dXJucyBjaGVja2VkIGFuZCBtb2RpZmllZCAoaWYgaXQncyBuZWVkZWQpIHVzZXIncyBvcHRpb25zXHJcblx0ICpcclxuXHQgKiBOb3RlczpcclxuXHQgKiBcdC0gaWYgdXNlciBzZXQgb3B0aW9uIHdpdGggd3JvbmcgdHlwZSwgaXQnbGwgYmUgd3JpdHRlbiBpbiBjb25zb2xlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBfdmFsaWRhdGVPcHRpb25zKG9wdGlvbnM6IE93bE9wdGlvbnMsIGNvbmZpZ09wdGlvbnM6IE93bE9wdGlvbnMpOiBPd2xPcHRpb25zIHtcclxuXHRcdGNvbnN0IGNoZWNrZWRPcHRpb25zOiBPd2xPcHRpb25zID0geyAuLi5vcHRpb25zfTtcclxuXHRcdGNvbnN0IG1vY2tlZFR5cGVzID0gbmV3IE93bE9wdGlvbnNNb2NrZWRUeXBlcygpO1xyXG5cclxuXHRcdGNvbnN0IHNldFJpZ2h0T3B0aW9uID0gKHR5cGU6IHN0cmluZywga2V5OiBhbnkpOiBPd2xPcHRpb25zID0+IHtcclxuXHRcdFx0dGhpcy5sb2dnZXIubG9nKGBvcHRpb25zLiR7a2V5fSBtdXN0IGJlIHR5cGUgb2YgJHt0eXBlfTsgJHtrZXl9PSR7b3B0aW9uc1trZXldfSBza2lwcGVkIHRvIGRlZmF1bHRzOiAke2tleX09JHtjb25maWdPcHRpb25zW2tleV19YCk7XHJcblx0XHRcdHJldHVybiBjb25maWdPcHRpb25zW2tleV07XHJcblx0XHR9O1xyXG5cclxuXHRcdGZvciAoY29uc3Qga2V5IGluIGNoZWNrZWRPcHRpb25zKSB7XHJcblx0XHRcdGlmIChjaGVja2VkT3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcblxyXG5cdFx0XHRcdC8vIGNvbmRpdGlvbiBjb3VsZCBiZSBzaG9ydGVuZWQgYnV0IGl0IGdldHMgaGFyZGVyIGZvciB1bmRlcnN0YW5kaW5nXHJcblx0XHRcdFx0aWYgKG1vY2tlZFR5cGVzW2tleV0gPT09ICdudW1iZXInKSB7XHJcblx0XHRcdFx0XHRpZiAodGhpcy5faXNOdW1lcmljKGNoZWNrZWRPcHRpb25zW2tleV0pKSB7XHJcblx0XHRcdFx0XHRcdGNoZWNrZWRPcHRpb25zW2tleV0gPSArY2hlY2tlZE9wdGlvbnNba2V5XTtcclxuXHRcdFx0XHRcdFx0Y2hlY2tlZE9wdGlvbnNba2V5XSA9IGtleSA9PT0gJ2l0ZW1zJyA/IHRoaXMuX3ZhbGlkYXRlSXRlbXMoY2hlY2tlZE9wdGlvbnNba2V5XSkgOiBjaGVja2VkT3B0aW9uc1trZXldO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0Y2hlY2tlZE9wdGlvbnNba2V5XSA9IHNldFJpZ2h0T3B0aW9uKG1vY2tlZFR5cGVzW2tleV0sIGtleSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSBlbHNlIGlmIChtb2NrZWRUeXBlc1trZXldID09PSAnYm9vbGVhbicgJiYgdHlwZW9mIGNoZWNrZWRPcHRpb25zW2tleV0gIT09ICdib29sZWFuJykge1xyXG5cdFx0XHRcdFx0Y2hlY2tlZE9wdGlvbnNba2V5XSA9IHNldFJpZ2h0T3B0aW9uKG1vY2tlZFR5cGVzW2tleV0sIGtleSk7XHJcblx0XHRcdFx0fSBlbHNlIGlmIChtb2NrZWRUeXBlc1trZXldID09PSAnbnVtYmVyfGJvb2xlYW4nICYmICF0aGlzLl9pc051bWJlck9yQm9vbGVhbihjaGVja2VkT3B0aW9uc1trZXldKSkge1xyXG5cdFx0XHRcdFx0Y2hlY2tlZE9wdGlvbnNba2V5XSA9IHNldFJpZ2h0T3B0aW9uKG1vY2tlZFR5cGVzW2tleV0sIGtleSk7XHJcblx0XHRcdFx0fSBlbHNlIGlmIChtb2NrZWRUeXBlc1trZXldID09PSAnbnVtYmVyfHN0cmluZycgJiYgIXRoaXMuX2lzTnVtYmVyT3JTdHJpbmcoY2hlY2tlZE9wdGlvbnNba2V5XSkpIHtcclxuXHRcdFx0XHRcdGNoZWNrZWRPcHRpb25zW2tleV0gPSBzZXRSaWdodE9wdGlvbihtb2NrZWRUeXBlc1trZXldLCBrZXkpO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAobW9ja2VkVHlwZXNba2V5XSA9PT0gJ3N0cmluZ3xib29sZWFuJyAmJiAhdGhpcy5faXNTdHJpbmdPckJvb2xlYW4oY2hlY2tlZE9wdGlvbnNba2V5XSkpIHtcclxuXHRcdFx0XHRcdGNoZWNrZWRPcHRpb25zW2tleV0gPSBzZXRSaWdodE9wdGlvbihtb2NrZWRUeXBlc1trZXldLCBrZXkpO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAobW9ja2VkVHlwZXNba2V5XSA9PT0gJ3N0cmluZ1tdJykge1xyXG5cdFx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoY2hlY2tlZE9wdGlvbnNba2V5XSkpIHtcclxuXHRcdFx0XHRcdFx0bGV0IGlzU3RyaW5nID0gZmFsc2U7XHJcblx0XHRcdFx0XHRcdGNoZWNrZWRPcHRpb25zW2tleV0uZm9yRWFjaChlbGVtZW50ID0+IHtcclxuXHRcdFx0XHRcdFx0XHRpc1N0cmluZyA9IHR5cGVvZiBlbGVtZW50ID09PSAnc3RyaW5nJyA/IHRydWUgOiBmYWxzZTtcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdGlmICghaXNTdHJpbmcpIHsgY2hlY2tlZE9wdGlvbnNba2V5XSA9IHNldFJpZ2h0T3B0aW9uKG1vY2tlZFR5cGVzW2tleV0sIGtleSkgfTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGNoZWNrZWRPcHRpb25zW2tleV0gPSBzZXRSaWdodE9wdGlvbihtb2NrZWRUeXBlc1trZXldLCBrZXkpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBjaGVja2VkT3B0aW9ucztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBvcHRpb24gaXRlbXMgc2V0IGJ5IHVzZXIgYW5kIGlmIGl0IGJpZ2dlciB0aGFuIG51bWJlciBvZiBzbGlkZXMgdGhlbiByZXR1cm5zIG51bWJlciBvZiBzbGlkZXNcclxuXHQgKiBAcGFyYW0gaXRlbXMgb3B0aW9uIGl0ZW1zIHNldCBieSB1c2VyXHJcblx0ICogQHJldHVybnMgcmlnaHQgbnVtYmVyIG9mIGl0ZW1zXHJcblx0ICovXHJcblx0cHJpdmF0ZSBfdmFsaWRhdGVJdGVtcyhpdGVtczogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdGxldCByZXN1bHQ6IG51bWJlcjtcclxuXHRcdGlmIChpdGVtcyA+IHRoaXMuX2l0ZW1zLmxlbmd0aCkge1xyXG5cdFx0XHRyZXN1bHQgPSB0aGlzLl9pdGVtcy5sZW5ndGg7XHJcblx0XHRcdHRoaXMubG9nZ2VyLmxvZygnVGhlIG9wdGlvbiBcXCdpdGVtc1xcJyBpbiB5b3VyIG9wdGlvbnMgaXMgYmlnZ2VyIHRoYW4gdGhlIG51bWJlciBvZiBzbGlkZXMuIFRoaXMgb3B0aW9uIGlzIHVwZGF0ZWQgdG8gdGhlIGN1cnJlbnQgbnVtYmVyIG9mIHNsaWRlcyBhbmQgdGhlIG5hdmlnYXRpb24gZ290IGRpc2FibGVkJyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRpZiAoaXRlbXMgPT09IHRoaXMuX2l0ZW1zLmxlbmd0aCAmJiAodGhpcy5zZXR0aW5ncy5kb3RzIHx8IHRoaXMuc2V0dGluZ3MubmF2KSkge1xyXG5cdFx0XHRcdHRoaXMubG9nZ2VyLmxvZygnT3B0aW9uIFxcJ2l0ZW1zXFwnIGluIHlvdXIgb3B0aW9ucyBpcyBlcXVhbCB0byB0aGUgbnVtYmVyIG9mIHNsaWRlcy4gU28gdGhlIG5hdmlnYXRpb24gZ290IGRpc2FibGVkJyk7XHJcblx0XHRcdH1cclxuXHRcdFx0cmVzdWx0ID0gaXRlbXM7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0IGN1cnJlbnQgd2lkdGggb2YgY2Fyb3VzZWxcclxuXHQgKiBAcGFyYW0gd2lkdGggd2lkdGggb2YgY2Fyb3VzZWwgV2luZG93XHJcblx0ICovXHJcblx0c2V0Q2Fyb3VzZWxXaWR0aCh3aWR0aDogbnVtYmVyKSB7XHJcblx0XHR0aGlzLl93aWR0aCA9IHdpZHRoO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogU2V0dXBzIHRoZSBjdXJyZW50IHNldHRpbmdzLlxyXG5cdCAqIEB0b2RvIFJlbW92ZSByZXNwb25zaXZlIGNsYXNzZXMuIFdoeSBzaG91bGQgYWRhcHRpdmUgZGVzaWducyBiZSBicm91Z2h0IGludG8gSUU4P1xyXG5cdCAqIEB0b2RvIFN1cHBvcnQgZm9yIG1lZGlhIHF1ZXJpZXMgYnkgdXNpbmcgYG1hdGNoTWVkaWFgIHdvdWxkIGJlIG5pY2UuXHJcblx0ICogQHBhcmFtIGNhcm91c2VsV2lkdGggd2lkdGggb2YgY2Fyb3VzZWxcclxuXHQgKiBAcGFyYW0gc2xpZGVzIGFycmF5IG9mIHNsaWRlc1xyXG5cdCAqIEBwYXJhbSBvcHRpb25zIG9wdGlvbnMgc2V0IGJ5IHVzZXJcclxuXHQgKi9cclxuICBzZXR1cChjYXJvdXNlbFdpZHRoOiBudW1iZXIsIHNsaWRlczogQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZVtdLCBvcHRpb25zOiBPd2xPcHRpb25zKSB7XHJcblx0XHR0aGlzLnNldENhcm91c2VsV2lkdGgoY2Fyb3VzZWxXaWR0aCk7XHJcblx0XHR0aGlzLnNldEl0ZW1zKHNsaWRlcyk7XHJcblx0XHR0aGlzLl9kZWZpbmVTbGlkZXNEYXRhKCk7XHJcblx0XHR0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XHJcblxyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IHsgLi4udGhpcy5fb3B0aW9uc307XHJcblxyXG5cdFx0dGhpcy5zZXRWaWV3cG9ydEl0ZW1zTigpO1xyXG5cclxuXHRcdHRoaXMuX3RyaWdnZXIoJ2NoYW5nZScsIHsgcHJvcGVydHk6IHsgbmFtZTogJ3NldHRpbmdzJywgdmFsdWU6IHRoaXMuc2V0dGluZ3MgfSB9KTtcclxuXHRcdHRoaXMuaW52YWxpZGF0ZSgnc2V0dGluZ3MnKTsgLy8gbXVzdCBiZSBjYWxsIG9mIHRoaXMgZnVuY3Rpb247XHJcblx0XHR0aGlzLl90cmlnZ2VyKCdjaGFuZ2VkJywgeyBwcm9wZXJ0eTogeyBuYW1lOiAnc2V0dGluZ3MnLCB2YWx1ZTogdGhpcy5zZXR0aW5ncyB9IH0pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0IG51bWJlciBvZiBpdGVtcyBmb3IgY3VycmVudCB2aWV3cG9ydFxyXG5cdCAqL1xyXG5cdHNldFZpZXdwb3J0SXRlbXNOKCkge1xyXG5cdFx0Y29uc3Qgdmlld3BvcnQgPSB0aGlzLl93aWR0aCxcclxuXHRcdFx0b3ZlcndyaXRlcyA9IHRoaXMuX29wdGlvbnMucmVzcG9uc2l2ZTtcclxuXHRcdGxldFx0bWF0Y2ggPSAtMTtcclxuXHJcblx0XHRpZiAoIU9iamVjdC5rZXlzKG92ZXJ3cml0ZXMpLmxlbmd0aCkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCF2aWV3cG9ydCkge1xyXG5cdFx0XHR0aGlzLnNldHRpbmdzLml0ZW1zID0gMTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZvciAoY29uc3Qga2V5IGluIG92ZXJ3cml0ZXMpIHtcclxuXHRcdFx0aWYgKG92ZXJ3cml0ZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG5cdFx0XHRcdGlmICgra2V5IDw9IHZpZXdwb3J0ICYmICtrZXkgPiBtYXRjaCkge1xyXG5cdFx0XHRcdFx0bWF0Y2ggPSBOdW1iZXIoa2V5KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0geyAuLi50aGlzLnNldHRpbmdzLCBpdGVtczogdGhpcy5fdmFsaWRhdGVJdGVtcyhvdmVyd3JpdGVzW21hdGNoXS5pdGVtcyl9O1xyXG5cdFx0Ly8gaWYgKHR5cGVvZiB0aGlzLnNldHRpbmdzLnN0YWdlUGFkZGluZyA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0Ly8gXHR0aGlzLnNldHRpbmdzLnN0YWdlUGFkZGluZyA9IHRoaXMuc2V0dGluZ3Muc3RhZ2VQYWRkaW5nKCk7XHJcblx0XHQvLyB9XHJcblx0XHRkZWxldGUgdGhpcy5zZXR0aW5ncy5yZXNwb25zaXZlO1xyXG5cdFx0dGhpcy5vd2xET01EYXRhLmlzUmVzcG9uc2l2ZSA9IHRydWU7XHJcblx0XHR0aGlzLl9icmVha3BvaW50ID0gbWF0Y2g7XHJcblxyXG5cdFx0dGhpcy5pbnZhbGlkYXRlKCdzZXR0aW5ncycpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSW5pdGlhbGl6ZXMgdGhlIGNhcm91c2VsLlxyXG5cdCAqIEBwYXJhbSBzbGlkZXMgYXJyYXkgb2YgQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZVxyXG5cdCAqL1xyXG4gIGluaXRpYWxpemUoc2xpZGVzOiBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlW10pIHtcclxuXHRcdHRoaXMuZW50ZXIoJ2luaXRpYWxpemluZycpO1xyXG5cdFx0Ly8gdGhpcy50cmlnZ2VyKCdpbml0aWFsaXplJyk7XHJcblxyXG5cdFx0dGhpcy5vd2xET01EYXRhLnJ0bCA9IHRoaXMuc2V0dGluZ3MucnRsO1xyXG5cclxuXHRcdGlmICh0aGlzLl9tZXJnZXJzLmxlbmd0aCkge1xyXG5cdFx0XHR0aGlzLl9tZXJnZXJzID0gW107XHJcblx0XHR9XHJcblxyXG5cdFx0c2xpZGVzLmZvckVhY2goaXRlbSA9PiB7XHJcblx0XHRcdGNvbnN0IG1lcmdlTjogbnVtYmVyID0gdGhpcy5zZXR0aW5ncy5tZXJnZSA/IGl0ZW0uZGF0YU1lcmdlIDogMTtcclxuXHRcdFx0dGhpcy5fbWVyZ2Vycy5wdXNoKG1lcmdlTik7XHJcblx0XHR9KTtcclxuXHRcdHRoaXMuX2Nsb25lcyA9IFtdO1xyXG5cclxuXHRcdHRoaXMucmVzZXQodGhpcy5faXNOdW1lcmljKHRoaXMuc2V0dGluZ3Muc3RhcnRQb3NpdGlvbikgPyArdGhpcy5zZXR0aW5ncy5zdGFydFBvc2l0aW9uIDogMCk7XHJcblxyXG5cdFx0dGhpcy5pbnZhbGlkYXRlKCdpdGVtcycpO1xyXG5cdFx0dGhpcy5yZWZyZXNoKCk7XHJcblxyXG5cdFx0dGhpcy5vd2xET01EYXRhLmlzTG9hZGVkID0gdHJ1ZTtcclxuXHRcdHRoaXMub3dsRE9NRGF0YS5pc01vdXNlRHJhZ2FibGUgPSB0aGlzLnNldHRpbmdzLm1vdXNlRHJhZztcclxuXHRcdHRoaXMub3dsRE9NRGF0YS5pc1RvdWNoRHJhZ2FibGUgPSB0aGlzLnNldHRpbmdzLnRvdWNoRHJhZztcclxuXHJcblx0XHR0aGlzLnNlbmRDaGFuZ2VzKCk7XHJcblxyXG5cdFx0dGhpcy5sZWF2ZSgnaW5pdGlhbGl6aW5nJyk7XHJcblx0XHR0aGlzLl90cmlnZ2VyKCdpbml0aWFsaXplZCcpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNlbmRzIGFsbCBkYXRhIG5lZWRlZCBmb3IgVmlld1xyXG5cdCAqL1xyXG5cdHNlbmRDaGFuZ2VzKCkge1xyXG5cdFx0dGhpcy5fdmlld1NldHRpbmdzU2hpcHBlciQubmV4dCh7XHJcblx0XHRcdG93bERPTURhdGE6IHRoaXMub3dsRE9NRGF0YSxcclxuXHRcdFx0c3RhZ2VEYXRhOiB0aGlzLnN0YWdlRGF0YSxcclxuXHRcdFx0c2xpZGVzRGF0YTogdGhpcy5zbGlkZXNEYXRhLFxyXG5cdFx0XHRuYXZEYXRhOiB0aGlzLm5hdkRhdGEsXHJcblx0XHRcdGRvdHNEYXRhOiB0aGlzLmRvdHNEYXRhXHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cclxuICAvKipcclxuXHQgKiBVcGRhdGVzIG9wdGlvbiBsb2dpYyBpZiBuZWNlc3NlcnlcclxuXHQgKi9cclxuICBwcml2YXRlIF9vcHRpb25zTG9naWMoKSB7XHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5hdXRvV2lkdGgpIHtcclxuXHRcdFx0dGhpcy5zZXR0aW5ncy5zdGFnZVBhZGRpbmcgPSAwO1xyXG5cdFx0XHR0aGlzLnNldHRpbmdzLm1lcmdlID0gZmFsc2U7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGVzIHRoZSB2aWV3XHJcbiAgICovXHJcbiAgdXBkYXRlKCkge1xyXG4gICAgbGV0IGkgPSAwO1xyXG4gICAgY29uc3QgbiA9IHRoaXMuX3BpcGUubGVuZ3RoLFxyXG4gICAgICBmaWx0ZXIgPSBpdGVtID0+IHRoaXMuX2ludmFsaWRhdGVkW2l0ZW1dLFxyXG5cdFx0XHRjYWNoZSA9IHt9O1xyXG5cclxuICAgIHdoaWxlIChpIDwgbikge1xyXG4gICAgICBjb25zdCBmaWx0ZXJlZFBpcGUgPSB0aGlzLl9waXBlW2ldLmZpbHRlci5maWx0ZXIoZmlsdGVyKTtcclxuICAgICAgaWYgKHRoaXMuX2ludmFsaWRhdGVkLmFsbCB8fCBmaWx0ZXJlZFBpcGUubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdHRoaXMuX3BpcGVbaV0ucnVuKGNhY2hlKTtcclxuICAgICAgfVxyXG4gICAgICBpKys7XHJcblx0XHR9XHJcblx0XHR0aGlzLnNsaWRlc0RhdGEuZm9yRWFjaChzbGlkZSA9PiBzbGlkZS5jbGFzc2VzID0gdGhpcy5zZXRDdXJTbGlkZUNsYXNzZXMoc2xpZGUpKTtcclxuXHRcdHRoaXMuc2VuZENoYW5nZXMoKTtcclxuXHJcbiAgICB0aGlzLl9pbnZhbGlkYXRlZCA9IHt9O1xyXG5cclxuICAgIGlmICghdGhpcy5pcygndmFsaWQnKSkge1xyXG4gICAgICB0aGlzLmVudGVyKCd2YWxpZCcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcblx0ICogR2V0cyB0aGUgd2lkdGggb2YgdGhlIHZpZXcuXHJcblx0ICogQHBhcmFtIFtkaW1lbnNpb249V2lkdGguRGVmYXVsdF0gVGhlIGRpbWVuc2lvbiB0byByZXR1cm5cclxuXHQgKiBAcmV0dXJucyBUaGUgd2lkdGggb2YgdGhlIHZpZXcgaW4gcGl4ZWwuXHJcblx0ICovXHJcbiAgd2lkdGgoZGltZW5zaW9uPzogV2lkdGgpOiBudW1iZXIge1xyXG5cdFx0ZGltZW5zaW9uID0gZGltZW5zaW9uIHx8IFdpZHRoLkRlZmF1bHQ7XHJcblx0XHRzd2l0Y2ggKGRpbWVuc2lvbikge1xyXG5cdFx0XHRjYXNlIFdpZHRoLklubmVyOlxyXG5cdFx0XHRjYXNlIFdpZHRoLk91dGVyOlxyXG5cdFx0XHRcdHJldHVybiB0aGlzLl93aWR0aDtcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5fd2lkdGggLSB0aGlzLnNldHRpbmdzLnN0YWdlUGFkZGluZyAqIDIgKyB0aGlzLnNldHRpbmdzLm1hcmdpbjtcclxuXHRcdH1cclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIFJlZnJlc2hlcyB0aGUgY2Fyb3VzZWwgcHJpbWFyaWx5IGZvciBhZGFwdGl2ZSBwdXJwb3Nlcy5cclxuXHQgKi9cclxuICByZWZyZXNoKCkge1xyXG5cdFx0dGhpcy5lbnRlcigncmVmcmVzaGluZycpO1xyXG5cdFx0dGhpcy5fdHJpZ2dlcigncmVmcmVzaCcpO1xyXG5cdFx0dGhpcy5fZGVmaW5lU2xpZGVzRGF0YSgpO1xyXG5cdFx0dGhpcy5zZXRWaWV3cG9ydEl0ZW1zTigpO1xyXG5cclxuXHRcdHRoaXMuX29wdGlvbnNMb2dpYygpO1xyXG5cclxuXHRcdC8vIHRoaXMuJGVsZW1lbnQuYWRkQ2xhc3ModGhpcy5vcHRpb25zLnJlZnJlc2hDbGFzcyk7XHJcblxyXG5cdFx0dGhpcy51cGRhdGUoKTtcclxuXHJcblx0XHQvLyB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKHRoaXMub3B0aW9ucy5yZWZyZXNoQ2xhc3MpO1xyXG5cclxuXHRcdHRoaXMubGVhdmUoJ3JlZnJlc2hpbmcnKTtcclxuXHRcdHRoaXMuX3RyaWdnZXIoJ3JlZnJlc2hlZCcpO1xyXG5cdCB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIENoZWNrcyB3aW5kb3cgYHJlc2l6ZWAgZXZlbnQuXHJcblx0ICogQHBhcmFtIGN1cldpZHRoIHdpZHRoIG9mIC5vd2wtY2Fyb3VzZWxcclxuXHQgKi9cclxuICBvblJlc2l6ZShjdXJXaWR0aDogbnVtYmVyKSB7XHJcblx0XHRpZiAoIXRoaXMuX2l0ZW1zLmxlbmd0aCkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXRDYXJvdXNlbFdpZHRoKGN1cldpZHRoKTtcclxuXHJcblx0XHR0aGlzLmVudGVyKCdyZXNpemluZycpO1xyXG5cclxuXHRcdC8vIGlmICh0aGlzLnRyaWdnZXIoJ3Jlc2l6ZScpLmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XHJcblx0XHQvLyBcdHRoaXMubGVhdmUoJ3Jlc2l6aW5nJyk7XHJcblx0XHQvLyBcdHJldHVybiBmYWxzZTtcclxuXHRcdC8vIH1cclxuXHRcdHRoaXMuX3RyaWdnZXIoJ3Jlc2l6ZScpO1xyXG5cdFx0dGhpcy5pbnZhbGlkYXRlKCd3aWR0aCcpO1xyXG5cclxuXHRcdHRoaXMucmVmcmVzaCgpO1xyXG5cclxuXHRcdHRoaXMubGVhdmUoJ3Jlc2l6aW5nJyk7XHJcblx0XHR0aGlzLl90cmlnZ2VyKCdyZXNpemVkJyk7XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBQcmVwYXJlcyBkYXRhIGZvciBkcmFnZ2luZyBjYXJvdXNlbC4gSXQgc3RhcnRzIGFmdGVyIGZpcmluZyBgdG91Y2hzdGFydGAgYW5kIGBtb3VzZWRvd25gIGV2ZW50cy5cclxuXHQgKiBAdG9kbyBIb3Jpem9udGFsIHN3aXBlIHRocmVzaG9sZCBhcyBvcHRpb25cclxuXHQgKiBAdG9kbyAjMjYxXHJcblx0ICogQHBhcmFtIGV2ZW50IC0gVGhlIGV2ZW50IGFyZ3VtZW50cy5cclxuXHQgKiBAcmV0dXJucyBzdGFnZSAtIG9iamVjdCB3aXRoICd4JyBhbmQgJ3knIGNvb3JkaW5hdGVzIG9mIC5vd2wtc3RhZ2VcclxuXHQgKi9cclxuICBwcmVwYXJlRHJhZ2dpbmcoZXZlbnQ6IGFueSk6IENvb3JkcyB7XHJcblx0XHRsZXQgc3RhZ2U6IENvb3JkcyA9IG51bGwsXHJcblx0XHRcdFx0dHJhbnNmb3JtQXJyOiBzdHJpbmdbXTtcclxuXHJcblx0XHQvLyBjb3VsZCBiZSA1IGNvbW1lbnRlZCBsaW5lcyBiZWxvdzsgSG93ZXZlciB0aGVyZSdzIHN0YWdlIHRyYW5zZm9ybSBpbiBzdGFnZURhdGEgYW5kIGluIHVwZGF0ZXMgYWZ0ZXIgZWFjaCBtb3ZlIG9mIHN0YWdlXHJcbiAgICAvLyBzdGFnZSA9IGdldENvbXB1dGVkU3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50KS50cmFuc2Zvcm0ucmVwbGFjZSgvLipcXCh8XFwpfCAvZywgJycpLnNwbGl0KCcsJyk7XHJcbiAgICAvLyBzdGFnZSA9IHtcclxuICAgIC8vICAgeDogc3RhZ2Vbc3RhZ2UubGVuZ3RoID09PSAxNiA/IDEyIDogNF0sXHJcbiAgICAvLyAgIHk6IHN0YWdlW3N0YWdlLmxlbmd0aCA9PT0gMTYgPyAxMyA6IDVdXHJcblx0XHQvLyB9O1xyXG5cclxuXHRcdHRyYW5zZm9ybUFyciA9IHRoaXMuc3RhZ2VEYXRhLnRyYW5zZm9ybS5yZXBsYWNlKC8uKlxcKHxcXCl8IHxbXiwtXFxkXVxcd3xcXCkvZywgJycpLnNwbGl0KCcsJyk7XHJcbiAgICBzdGFnZSA9IHtcclxuICAgICAgeDogK3RyYW5zZm9ybUFyclswXSxcclxuICAgICAgeTogK3RyYW5zZm9ybUFyclsxXVxyXG4gICAgfTtcclxuXHJcblx0XHRpZiAodGhpcy5pcygnYW5pbWF0aW5nJykpIHtcclxuXHRcdFx0dGhpcy5pbnZhbGlkYXRlKCdwb3NpdGlvbicpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChldmVudC50eXBlID09PSAnbW91c2Vkb3duJykge1xyXG4gICAgICB0aGlzLm93bERPTURhdGEuaXNHcmFiID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcblx0XHR0aGlzLnNwZWVkKDApO1xyXG5cdFx0cmV0dXJuIHN0YWdlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRW50ZXJzIGludG8gYSAnZHJhZ2dpbmcnIHN0YXRlXHJcblx0ICovXHJcblx0ZW50ZXJEcmFnZ2luZygpIHtcclxuXHRcdHRoaXMuZW50ZXIoJ2RyYWdnaW5nJyk7XHJcbiAgICB0aGlzLl90cmlnZ2VyKCdkcmFnJyk7XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBEZWZpbmVzIG5ldyBjb29yZHMgZm9yIC5vd2wtc3RhZ2Ugd2hpbGUgZHJhZ2dpbmcgaXRcclxuXHQgKiBAdG9kbyAjMjYxXHJcblx0ICogQHBhcmFtIGV2ZW50IHRoZSBldmVudCBhcmd1bWVudHMuXHJcblx0ICogQHBhcmFtIGRyYWdEYXRhIGluaXRpYWwgZGF0YSBnb3QgYWZ0ZXIgc3RhcnRpbmcgZHJhZ2dpbmdcclxuXHQgKiBAcmV0dXJucyBjb29yZHMgb3IgZmFsc2VcclxuXHQgKi9cclxuICBkZWZpbmVOZXdDb29yZHNEcmFnKGV2ZW50OiBhbnksIGRyYWdEYXRhOiBhbnkpOiBib29sZWFuIHwgQ29vcmRzIHtcclxuXHRcdGxldCBtaW5pbXVtID0gbnVsbCxcclxuXHRcdG1heGltdW0gPSBudWxsLFxyXG5cdFx0cHVsbCA9IG51bGw7XHJcblx0XHRjb25zdFx0ZGVsdGEgPSB0aGlzLmRpZmZlcmVuY2UoZHJhZ0RhdGEucG9pbnRlciwgdGhpcy5wb2ludGVyKGV2ZW50KSksXHJcblx0XHRcdHN0YWdlID0gdGhpcy5kaWZmZXJlbmNlKGRyYWdEYXRhLnN0YWdlLnN0YXJ0LCBkZWx0YSk7XHJcblxyXG5cdFx0aWYgKCF0aGlzLmlzKCdkcmFnZ2luZycpKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5sb29wKSB7XHJcblx0XHRcdG1pbmltdW0gPSB0aGlzLmNvb3JkaW5hdGVzKHRoaXMubWluaW11bSgpKTtcclxuXHRcdFx0bWF4aW11bSA9ICt0aGlzLmNvb3JkaW5hdGVzKHRoaXMubWF4aW11bSgpICsgMSkgLSBtaW5pbXVtO1xyXG5cdFx0XHRzdGFnZS54ID0gKCgoc3RhZ2UueCAtIG1pbmltdW0pICUgbWF4aW11bSArIG1heGltdW0pICUgbWF4aW11bSkgKyBtaW5pbXVtO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bWluaW11bSA9IHRoaXMuc2V0dGluZ3MucnRsID8gdGhpcy5jb29yZGluYXRlcyh0aGlzLm1heGltdW0oKSkgOiB0aGlzLmNvb3JkaW5hdGVzKHRoaXMubWluaW11bSgpKTtcclxuXHRcdFx0bWF4aW11bSA9IHRoaXMuc2V0dGluZ3MucnRsID8gdGhpcy5jb29yZGluYXRlcyh0aGlzLm1pbmltdW0oKSkgOiB0aGlzLmNvb3JkaW5hdGVzKHRoaXMubWF4aW11bSgpKTtcclxuXHRcdFx0cHVsbCA9IHRoaXMuc2V0dGluZ3MucHVsbERyYWcgPyAtMSAqIGRlbHRhLnggLyA1IDogMDtcclxuXHRcdFx0c3RhZ2UueCA9IE1hdGgubWF4KE1hdGgubWluKHN0YWdlLngsIG1pbmltdW0gKyBwdWxsKSwgbWF4aW11bSArIHB1bGwpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBzdGFnZTtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEZpbmlzaGVzIGRyYWdnaW5nIG9mIGNhcm91c2VsIHdoZW4gYHRvdWNoZW5kYCBhbmQgYG1vdXNldXBgIGV2ZW50cyBmaXJlLlxyXG5cdCAqIEB0b2RvICMyNjFcclxuXHQgKiBAdG9kbyBUaHJlc2hvbGQgZm9yIGNsaWNrIGV2ZW50XHJcblx0ICogQHBhcmFtIGV2ZW50IHRoZSBldmVudCBhcmd1bWVudHMuXHJcblx0ICogQHBhcmFtIGRyYWdPYmogdGhlIG9iamVjdCB3aXRoIGRyYWdnaW5nIHNldHRpbmdzIGFuZCBzdGF0ZXNcclxuXHQgKiBAcGFyYW0gY2xpY2tBdHRhY2hlciBmdW5jdGlvbiB3aGljaCBhdHRhY2hlcyBjbGljayBoYW5kbGVyIHRvIHNsaWRlIG9yIGl0cyBjaGlsZHJlbiBlbGVtZW50cyBpbiBvcmRlciB0byBwcmV2ZW50IGV2ZW50IGJ1YmxpbmdcclxuXHQgKi9cclxuICBmaW5pc2hEcmFnZ2luZyhldmVudDogYW55LCBkcmFnT2JqOiBhbnksIGNsaWNrQXR0YWNoZXI6ICgpID0+IHZvaWQpIHtcclxuXHRcdGNvbnN0IGRlbHRhID0gdGhpcy5kaWZmZXJlbmNlKGRyYWdPYmoucG9pbnRlciwgdGhpcy5wb2ludGVyKGV2ZW50KSksXHJcbiAgICAgICAgc3RhZ2UgPSBkcmFnT2JqLnN0YWdlLmN1cnJlbnQsXHJcblx0XHRcdFx0ZGlyZWN0aW9uID0gZGVsdGEueCA+ICt0aGlzLnNldHRpbmdzLnJ0bCA/ICdsZWZ0JyA6ICdyaWdodCc7XHJcblx0XHRsZXQgY3VycmVudFNsaWRlSTogbnVtYmVyLCBjdXJyZW50OiBudW1iZXIsIG5ld0N1cnJlbnQ6IG51bWJlcjtcclxuXHJcbiAgICAgIGlmIChkZWx0YS54ICE9PSAwICYmIHRoaXMuaXMoJ2RyYWdnaW5nJykgfHwgIXRoaXMuaXMoJ3ZhbGlkJykpIHtcclxuICAgICAgICB0aGlzLnNwZWVkKCt0aGlzLnNldHRpbmdzLmRyYWdFbmRTcGVlZCB8fCB0aGlzLnNldHRpbmdzLnNtYXJ0U3BlZWQpO1xyXG5cdFx0XHRcdGN1cnJlbnRTbGlkZUkgPSB0aGlzLmNsb3Nlc3Qoc3RhZ2UueCwgZGVsdGEueCAhPT0gMCA/IGRpcmVjdGlvbiA6IGRyYWdPYmouZGlyZWN0aW9uKTtcclxuXHRcdFx0XHRjdXJyZW50ID0gdGhpcy5jdXJyZW50KCk7XHJcbiAgICAgICAgbmV3Q3VycmVudCA9IHRoaXMuY3VycmVudChjdXJyZW50U2xpZGVJID09PSAtMSA/IHVuZGVmaW5lZCA6IGN1cnJlbnRTbGlkZUkpO1xyXG5cclxuXHRcdFx0XHRpZiAoY3VycmVudCAhPT0gbmV3Q3VycmVudCkge1xyXG5cdFx0XHRcdFx0dGhpcy5pbnZhbGlkYXRlKCdwb3NpdGlvbicpO1xyXG5cdFx0XHRcdFx0dGhpcy51cGRhdGUoKTtcclxuXHRcdFx0XHR9XHJcblxyXG4gICAgICAgIGRyYWdPYmouZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xyXG5cclxuICAgICAgICBpZiAoTWF0aC5hYnMoZGVsdGEueCkgPiAzIHx8IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gZHJhZ09iai50aW1lID4gMzAwKSB7XHJcblx0XHRcdFx0XHRjbGlja0F0dGFjaGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmICghdGhpcy5pcygnZHJhZ2dpbmcnKSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cdFx0XHR0aGlzLmxlYXZlKCdkcmFnZ2luZycpO1xyXG5cdFx0XHR0aGlzLl90cmlnZ2VyKCdkcmFnZ2VkJylcclxuXHQgfVxyXG5cclxuICAvKipcclxuXHQgKiBHZXRzIGFic29sdXRlIHBvc2l0aW9uIG9mIHRoZSBjbG9zZXN0IGl0ZW0gZm9yIGEgY29vcmRpbmF0ZS5cclxuXHQgKiBAdG9kbyBTZXR0aW5nIGBmcmVlRHJhZ2AgbWFrZXMgYGNsb3Nlc3RgIG5vdCByZXVzYWJsZS4gU2VlICMxNjUuXHJcblx0ICogQHBhcmFtIGNvb3JkaW5hdGUgVGhlIGNvb3JkaW5hdGUgaW4gcGl4ZWwuXHJcblx0ICogQHBhcmFtIGRpcmVjdGlvbiBUaGUgZGlyZWN0aW9uIHRvIGNoZWNrIGZvciB0aGUgY2xvc2VzdCBpdGVtLiBFdGhlciBgbGVmdGAgb3IgYHJpZ2h0YC5cclxuXHQgKiBAcmV0dXJucyBUaGUgYWJzb2x1dGUgcG9zaXRpb24gb2YgdGhlIGNsb3Nlc3QgaXRlbS5cclxuXHQgKi9cclxuICBjbG9zZXN0KGNvb3JkaW5hdGU6IG51bWJlciwgZGlyZWN0aW9uOiBzdHJpbmcpOiBudW1iZXIge1xyXG5cdFx0Y29uc3QgcHVsbCA9IDMwLFxyXG5cdFx0XHR3aWR0aCA9IHRoaXMud2lkdGgoKTtcclxuXHRcdGxldFx0Y29vcmRpbmF0ZXM6IG51bWJlcltdID0gdGhpcy5jb29yZGluYXRlcygpIGFzIG51bWJlcltdLFxyXG5cdFx0IHBvc2l0aW9uID0gLTE7XHJcblxyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3MuY2VudGVyKSB7XHJcblx0XHRcdGNvb3JkaW5hdGVzID0gY29vcmRpbmF0ZXMubWFwKGl0ZW0gPT4ge1xyXG5cdFx0XHRcdGlmIChpdGVtID09PSAwKSB7XHJcblx0XHRcdFx0XHRpdGVtICs9IDAuMDAwMDAxO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gaXRlbTtcclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHJcblx0XHQvLyBvcHRpb24gJ2ZyZWVEcmFnJyBkb2Vzbid0IGhhdmUgcmVhbGl6YXRpb24gYW5kIHVzaW5nIGl0IGhlcmUgY3JlYXRlcyBwcm9ibGVtOlxyXG5cdFx0Ly8gdmFyaWFibGUgJ3Bvc2l0aW9uJyBzdGF5cyB1bmNoYW5nZWQgKGl0IGVxdWFscyAtMSBhdCB0aGUgYmVnZ2luZykgYW5kIHRodXMgbWV0aG9kIHJldHVybnMgLTFcclxuXHRcdC8vIFJldHVybmluZyB2YWx1ZSBpcyBjb25zdW1lZCBieSBtZXRob2QgY3VycmVudCgpLCB3aGljaCB0YWtpbmcgLTEgYXMgYXJndW1lbnQgY2FsY3VsYXRlcyB0aGUgaW5kZXggb2YgbmV3IGN1cnJlbnQgc2xpZGVcclxuXHRcdC8vIEluIGNhc2Ugb2YgaGF2aW5nIDUgc2xpZGVzIGFucyAnbG9vcD1mYWxzZTsgY2FsbGluZyAnY3VycmVudCgtMSknIHNldHMgcHJvcHMgJ19jdXJyZW50JyBhcyA0LiBKdXN0IGxhc3Qgc2xpZGUgcmVtYWlucyB2aXNpYmxlIGluc3RlYWQgb2YgMyBsYXN0IHNsaWRlcy5cclxuXHJcblx0XHQvLyBpZiAoIXRoaXMuc2V0dGluZ3MuZnJlZURyYWcpIHtcclxuXHRcdFx0Ly8gY2hlY2sgY2xvc2VzdCBpdGVtXHJcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgY29vcmRpbmF0ZXMubGVuZ3RoOyBpKyspIHtcclxuXHJcblx0XHRcdFx0aWYgKGRpcmVjdGlvbiA9PT0gJ2xlZnQnICYmIGNvb3JkaW5hdGUgPiBjb29yZGluYXRlc1tpXSAtIHB1bGwgJiYgY29vcmRpbmF0ZSA8IGNvb3JkaW5hdGVzW2ldICsgcHVsbCkge1xyXG5cdFx0XHRcdFx0cG9zaXRpb24gPSBpO1xyXG5cdFx0XHRcdC8vIG9uIGEgcmlnaHQgcHVsbCwgY2hlY2sgb24gcHJldmlvdXMgaW5kZXhcclxuXHRcdFx0XHQvLyB0byBkbyBzbywgc3VidHJhY3Qgd2lkdGggZnJvbSB2YWx1ZSBhbmQgc2V0IHBvc2l0aW9uID0gaW5kZXggKyAxXHJcblx0XHRcdFx0fSBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICdyaWdodCcgJiYgY29vcmRpbmF0ZSA+IGNvb3JkaW5hdGVzW2ldIC0gd2lkdGggLSBwdWxsICYmIGNvb3JkaW5hdGUgPCBjb29yZGluYXRlc1tpXSAtIHdpZHRoICsgcHVsbCkge1xyXG5cdFx0XHRcdFx0cG9zaXRpb24gPSBpICsgMTtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKHRoaXMuX29wKGNvb3JkaW5hdGUsICc8JywgY29vcmRpbmF0ZXNbaV0pXHJcblx0XHRcdFx0XHQmJiB0aGlzLl9vcChjb29yZGluYXRlLCAnPicsIGNvb3JkaW5hdGVzW2kgKyAxXSB8fCBjb29yZGluYXRlc1tpXSAtIHdpZHRoKSkge1xyXG5cdFx0XHRcdFx0cG9zaXRpb24gPSBkaXJlY3Rpb24gPT09ICdsZWZ0JyA/IGkgKyAxIDogaTtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gbnVsbCAmJiBjb29yZGluYXRlID4gY29vcmRpbmF0ZXNbaV0gLSBwdWxsICYmIGNvb3JkaW5hdGUgPCBjb29yZGluYXRlc1tpXSArIHB1bGwpIHtcclxuXHRcdFx0XHRcdHBvc2l0aW9uID0gaTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChwb3NpdGlvbiAhPT0gLTEpIHsgYnJlYWsgfTtcclxuXHRcdFx0fVxyXG5cdFx0Ly8gfVxyXG5cclxuXHRcdGlmICghdGhpcy5zZXR0aW5ncy5sb29wKSB7XHJcblx0XHRcdC8vIG5vbiBsb29wIGJvdW5kcmllc1xyXG5cdFx0XHRpZiAodGhpcy5fb3AoY29vcmRpbmF0ZSwgJz4nLCBjb29yZGluYXRlc1t0aGlzLm1pbmltdW0oKV0pKSB7XHJcblx0XHRcdFx0cG9zaXRpb24gPSBjb29yZGluYXRlID0gdGhpcy5taW5pbXVtKCk7XHJcblx0XHRcdH0gZWxzZSBpZiAodGhpcy5fb3AoY29vcmRpbmF0ZSwgJzwnLCBjb29yZGluYXRlc1t0aGlzLm1heGltdW0oKV0pKSB7XHJcblx0XHRcdFx0cG9zaXRpb24gPSBjb29yZGluYXRlID0gdGhpcy5tYXhpbXVtKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcG9zaXRpb247XHJcblx0IH1cclxuXHJcbiAgLyoqXHJcblx0ICogQW5pbWF0ZXMgdGhlIHN0YWdlLlxyXG5cdCAqIEB0b2RvICMyNzBcclxuXHQgKiBAcGFyYW0gY29vcmRpbmF0ZSBUaGUgY29vcmRpbmF0ZSBpbiBwaXhlbHMuXHJcblx0ICovXHJcbiAgYW5pbWF0ZShjb29yZGluYXRlOiBudW1iZXIgfCBudW1iZXJbXSkge1xyXG5cdFx0Y29uc3QgYW5pbWF0ZSA9IHRoaXMuc3BlZWQoKSA+IDA7XHJcblxyXG5cdFx0aWYgKHRoaXMuaXMoJ2FuaW1hdGluZycpKSB7XHJcblx0XHRcdHRoaXMub25UcmFuc2l0aW9uRW5kKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGFuaW1hdGUpIHtcclxuXHRcdFx0dGhpcy5lbnRlcignYW5pbWF0aW5nJyk7XHJcblx0XHRcdHRoaXMuX3RyaWdnZXIoJ3RyYW5zbGF0ZScpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc3RhZ2VEYXRhLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgnICsgY29vcmRpbmF0ZSArICdweCwwcHgsMHB4KSc7XHJcblx0XHR0aGlzLnN0YWdlRGF0YS50cmFuc2l0aW9uID0gKHRoaXMuc3BlZWQoKSAvIDEwMDApICsgJ3MnO1xyXG5cclxuXHRcdC8vIGFsc28gdGhlcmUgd2FzIHRyYW5zaXRpb24gYnkgbWVhbnMgb2YgSlF1ZXJ5LmFuaW1hdGUgb3IgY3NzLWNoYW5naW5nIHByb3BlcnR5IGxlZnRcclxuXHQgfVxyXG5cclxuICAvKipcclxuXHQgKiBDaGVja3Mgd2hldGhlciB0aGUgY2Fyb3VzZWwgaXMgaW4gYSBzcGVjaWZpYyBzdGF0ZSBvciBub3QuXHJcblx0ICogQHBhcmFtIHN0YXRlIFRoZSBzdGF0ZSB0byBjaGVjay5cclxuXHQgKiBAcmV0dXJucyBUaGUgZmxhZyB3aGljaCBpbmRpY2F0ZXMgaWYgdGhlIGNhcm91c2VsIGlzIGJ1c3kuXHJcblx0ICovXHJcbiAgaXMoc3RhdGU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3N0YXRlcy5jdXJyZW50W3N0YXRlXSAmJiB0aGlzLl9zdGF0ZXMuY3VycmVudFtzdGF0ZV0gPiAwO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG5cdCAqIFNldHMgdGhlIGFic29sdXRlIHBvc2l0aW9uIG9mIHRoZSBjdXJyZW50IGl0ZW0uXHJcblx0ICogQHBhcmFtIHBvc2l0aW9uIFRoZSBuZXcgYWJzb2x1dGUgcG9zaXRpb24gb3Igbm90aGluZyB0byBsZWF2ZSBpdCB1bmNoYW5nZWQuXHJcblx0ICogQHJldHVybnMgVGhlIGFic29sdXRlIHBvc2l0aW9uIG9mIHRoZSBjdXJyZW50IGl0ZW0uXHJcblx0ICovXHJcbiAgY3VycmVudChwb3NpdGlvbj86IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRpZiAocG9zaXRpb24gPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5fY3VycmVudDtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5faXRlbXMubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdHJldHVybiB1bmRlZmluZWQ7XHJcblx0XHR9XHJcblxyXG5cdFx0cG9zaXRpb24gPSB0aGlzLm5vcm1hbGl6ZShwb3NpdGlvbik7XHJcblxyXG5cdFx0aWYgKHRoaXMuX2N1cnJlbnQgIT09IHBvc2l0aW9uKSB7XHJcblx0XHRcdGNvbnN0IGV2ZW50ID0gdGhpcy5fdHJpZ2dlcignY2hhbmdlJywgeyBwcm9wZXJ0eTogeyBuYW1lOiAncG9zaXRpb24nLCB2YWx1ZTogcG9zaXRpb24gfSB9KTtcclxuXHJcblx0XHRcdC8vIGlmIChldmVudC5kYXRhICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0Ly8gXHRwb3NpdGlvbiA9IHRoaXMubm9ybWFsaXplKGV2ZW50LmRhdGEpO1xyXG5cdFx0XHQvLyB9XHJcblxyXG5cdFx0XHR0aGlzLl9jdXJyZW50ID0gcG9zaXRpb247XHJcblxyXG5cdFx0XHR0aGlzLmludmFsaWRhdGUoJ3Bvc2l0aW9uJyk7XHJcblx0XHRcdHRoaXMuX3RyaWdnZXIoJ2NoYW5nZWQnLCB7IHByb3BlcnR5OiB7IG5hbWU6ICdwb3NpdGlvbicsIHZhbHVlOiB0aGlzLl9jdXJyZW50IH0gfSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX2N1cnJlbnQ7XHJcblx0IH1cclxuXHJcbiAgLyoqXHJcblx0ICogSW52YWxpZGF0ZXMgdGhlIGdpdmVuIHBhcnQgb2YgdGhlIHVwZGF0ZSByb3V0aW5lLlxyXG5cdCAqIEBwYXJhbSBwYXJ0IFRoZSBwYXJ0IHRvIGludmFsaWRhdGUuXHJcblx0ICogQHJldHVybnMgVGhlIGludmFsaWRhdGVkIHBhcnRzLlxyXG5cdCAqL1xyXG4gIGludmFsaWRhdGUocGFydDogc3RyaW5nKTogc3RyaW5nW10ge1xyXG5cdFx0aWYgKHR5cGVvZiBwYXJ0ID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aGlzLl9pbnZhbGlkYXRlZFtwYXJ0XSA9IHRydWU7XHJcblx0XHRcdGlmKHRoaXMuaXMoJ3ZhbGlkJykpIHsgdGhpcy5sZWF2ZSgndmFsaWQnKTsgfVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuX2ludmFsaWRhdGVkKTtcclxuICB9O1xyXG5cclxuXHQvKipcclxuXHQgKiBSZXNldHMgdGhlIGFic29sdXRlIHBvc2l0aW9uIG9mIHRoZSBjdXJyZW50IGl0ZW0uXHJcblx0ICogQHBhcmFtIHBvc2l0aW9uIHRoZSBhYnNvbHV0ZSBwb3NpdGlvbiBvZiB0aGUgbmV3IGl0ZW0uXHJcblx0ICovXHJcbiAgcmVzZXQocG9zaXRpb246IG51bWJlcikge1xyXG5cdFx0cG9zaXRpb24gPSB0aGlzLm5vcm1hbGl6ZShwb3NpdGlvbik7XHJcblxyXG5cdFx0aWYgKHBvc2l0aW9uID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX3NwZWVkID0gMDtcclxuXHRcdHRoaXMuX2N1cnJlbnQgPSBwb3NpdGlvbjtcclxuXHJcblx0XHR0aGlzLl9zdXBwcmVzcyhbICd0cmFuc2xhdGUnLCAndHJhbnNsYXRlZCcgXSk7XHJcblxyXG5cdFx0dGhpcy5hbmltYXRlKHRoaXMuY29vcmRpbmF0ZXMocG9zaXRpb24pKTtcclxuXHJcblx0XHR0aGlzLl9yZWxlYXNlKFsgJ3RyYW5zbGF0ZScsICd0cmFuc2xhdGVkJyBdKTtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIE5vcm1hbGl6ZXMgYW4gYWJzb2x1dGUgb3IgYSByZWxhdGl2ZSBwb3NpdGlvbiBvZiBhbiBpdGVtLlxyXG5cdCAqIEBwYXJhbSBwb3NpdGlvbiBUaGUgYWJzb2x1dGUgb3IgcmVsYXRpdmUgcG9zaXRpb24gdG8gbm9ybWFsaXplLlxyXG5cdCAqIEBwYXJhbSByZWxhdGl2ZSBXaGV0aGVyIHRoZSBnaXZlbiBwb3NpdGlvbiBpcyByZWxhdGl2ZSBvciBub3QuXHJcblx0ICogQHJldHVybnMgVGhlIG5vcm1hbGl6ZWQgcG9zaXRpb24uXHJcblx0ICovXHJcbiAgbm9ybWFsaXplKHBvc2l0aW9uOiBudW1iZXIsIHJlbGF0aXZlPzogYm9vbGVhbik6IG51bWJlciB7XHJcblx0XHRjb25zdCBuID0gdGhpcy5faXRlbXMubGVuZ3RoLFxyXG5cdFx0XHRcdFx0bSA9IHJlbGF0aXZlID8gMCA6IHRoaXMuX2Nsb25lcy5sZW5ndGg7XHJcblxyXG5cdFx0aWYgKCF0aGlzLl9pc051bWVyaWMocG9zaXRpb24pIHx8IG4gPCAxKSB7XHJcblx0XHRcdHBvc2l0aW9uID0gdW5kZWZpbmVkO1xyXG5cdFx0fSBlbHNlIGlmIChwb3NpdGlvbiA8IDAgfHwgcG9zaXRpb24gPj0gbiArIG0pIHtcclxuXHRcdFx0cG9zaXRpb24gPSAoKHBvc2l0aW9uIC0gbSAvIDIpICUgbiArIG4pICUgbiArIG0gLyAyO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBwb3NpdGlvbjtcclxuXHQgfVxyXG5cclxuICAvKipcclxuXHQgKiBDb252ZXJ0cyBhbiBhYnNvbHV0ZSBwb3NpdGlvbiBvZiBhbiBpdGVtIGludG8gYSByZWxhdGl2ZSBvbmUuXHJcblx0ICogQHBhcmFtIHBvc2l0aW9uIFRoZSBhYnNvbHV0ZSBwb3NpdGlvbiB0byBjb252ZXJ0LlxyXG5cdCAqIEByZXR1cm5zIFRoZSBjb252ZXJ0ZWQgcG9zaXRpb24uXHJcblx0ICovXHJcbiAgcmVsYXRpdmUocG9zaXRpb246IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRwb3NpdGlvbiAtPSB0aGlzLl9jbG9uZXMubGVuZ3RoIC8gMjtcclxuXHRcdHJldHVybiB0aGlzLm5vcm1hbGl6ZShwb3NpdGlvbiwgdHJ1ZSk7XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBHZXRzIHRoZSBtYXhpbXVtIHBvc2l0aW9uIGZvciB0aGUgY3VycmVudCBpdGVtLlxyXG5cdCAqIEBwYXJhbSByZWxhdGl2ZSBXaGV0aGVyIHRvIHJldHVybiBhbiBhYnNvbHV0ZSBwb3NpdGlvbiBvciBhIHJlbGF0aXZlIHBvc2l0aW9uLlxyXG5cdCAqIEByZXR1cm5zIG51bWJlciBvZiBtYXhpbXVtIHBvc2l0aW9uXHJcblx0ICovXHJcbiAgbWF4aW11bShyZWxhdGl2ZTogYm9vbGVhbiA9IGZhbHNlKTogbnVtYmVyIHtcclxuXHRcdGNvbnN0IHNldHRpbmdzID0gdGhpcy5zZXR0aW5ncztcclxuXHRcdGxldFx0bWF4aW11bSA9IHRoaXMuX2Nvb3JkaW5hdGVzLmxlbmd0aCxcclxuXHRcdFx0aXRlcmF0b3IsXHJcblx0XHRcdHJlY2lwcm9jYWxJdGVtc1dpZHRoLFxyXG5cdFx0XHRlbGVtZW50V2lkdGg7XHJcblxyXG5cdFx0aWYgKHNldHRpbmdzLmxvb3ApIHtcclxuXHRcdFx0bWF4aW11bSA9IHRoaXMuX2Nsb25lcy5sZW5ndGggLyAyICsgdGhpcy5faXRlbXMubGVuZ3RoIC0gMTtcclxuXHRcdH0gZWxzZSBpZiAoc2V0dGluZ3MuYXV0b1dpZHRoIHx8IHNldHRpbmdzLm1lcmdlKSB7XHJcblx0XHRcdGl0ZXJhdG9yID0gdGhpcy5faXRlbXMubGVuZ3RoO1xyXG5cdFx0XHRyZWNpcHJvY2FsSXRlbXNXaWR0aCA9IHRoaXMuc2xpZGVzRGF0YVstLWl0ZXJhdG9yXS53aWR0aDtcclxuXHRcdFx0ZWxlbWVudFdpZHRoID0gdGhpcy5fd2lkdGg7XHJcblx0XHRcdHdoaWxlIChpdGVyYXRvci0tKSB7XHJcblx0XHRcdFx0Ly8gaXQgY291bGQgYmUgdXNlIHRoaXMuX2l0ZW1zIGluc3RlYWQgb2YgdGhpcy5zbGlkZXNEYXRhO1xyXG5cdFx0XHRcdHJlY2lwcm9jYWxJdGVtc1dpZHRoICs9ICt0aGlzLnNsaWRlc0RhdGFbaXRlcmF0b3JdLndpZHRoICsgdGhpcy5zZXR0aW5ncy5tYXJnaW47XHJcblx0XHRcdFx0aWYgKHJlY2lwcm9jYWxJdGVtc1dpZHRoID4gZWxlbWVudFdpZHRoKSB7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0bWF4aW11bSA9IGl0ZXJhdG9yICsgMTtcclxuXHRcdH0gZWxzZSBpZiAoc2V0dGluZ3MuY2VudGVyKSB7XHJcblx0XHRcdG1heGltdW0gPSB0aGlzLl9pdGVtcy5sZW5ndGggLSAxO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bWF4aW11bSA9IHRoaXMuX2l0ZW1zLmxlbmd0aCAtIHNldHRpbmdzLml0ZW1zO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChyZWxhdGl2ZSkge1xyXG5cdFx0XHRtYXhpbXVtIC09IHRoaXMuX2Nsb25lcy5sZW5ndGggLyAyO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBNYXRoLm1heChtYXhpbXVtLCAwKTtcclxuXHQgfVxyXG5cclxuICAvKipcclxuXHQgKiBHZXRzIHRoZSBtaW5pbXVtIHBvc2l0aW9uIGZvciB0aGUgY3VycmVudCBpdGVtLlxyXG5cdCAqIEBwYXJhbSByZWxhdGl2ZSBXaGV0aGVyIHRvIHJldHVybiBhbiBhYnNvbHV0ZSBwb3NpdGlvbiBvciBhIHJlbGF0aXZlIHBvc2l0aW9uLlxyXG5cdCAqIEByZXR1cm5zIG51bWJlciBvZiBtaW5pbXVtIHBvc2l0aW9uXHJcblx0ICovXHJcbiAgbWluaW11bShyZWxhdGl2ZTogYm9vbGVhbiA9IGZhbHNlKTogbnVtYmVyIHtcclxuXHRcdHJldHVybiByZWxhdGl2ZSA/IDAgOiB0aGlzLl9jbG9uZXMubGVuZ3RoIC8gMjtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEdldHMgYW4gaXRlbSBhdCB0aGUgc3BlY2lmaWVkIHJlbGF0aXZlIHBvc2l0aW9uLlxyXG5cdCAqIEBwYXJhbSBwb3NpdGlvbiBUaGUgcmVsYXRpdmUgcG9zaXRpb24gb2YgdGhlIGl0ZW0uXHJcblx0ICogQHJldHVybnMgVGhlIGl0ZW0gYXQgdGhlIGdpdmVuIHBvc2l0aW9uIG9yIGFsbCBpdGVtcyBpZiBubyBwb3NpdGlvbiB3YXMgZ2l2ZW4uXHJcblx0ICovXHJcbiAgaXRlbXMocG9zaXRpb24/OiBudW1iZXIpOiBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlW10ge1xyXG5cdFx0aWYgKHBvc2l0aW9uID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuX2l0ZW1zLnNsaWNlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cG9zaXRpb24gPSB0aGlzLm5vcm1hbGl6ZShwb3NpdGlvbiwgdHJ1ZSk7XHJcblx0XHRyZXR1cm4gW3RoaXMuX2l0ZW1zW3Bvc2l0aW9uXV07XHJcblx0IH1cclxuXHJcbiAgLyoqXHJcblx0ICogR2V0cyBhbiBpdGVtIGF0IHRoZSBzcGVjaWZpZWQgcmVsYXRpdmUgcG9zaXRpb24uXHJcblx0ICogQHBhcmFtIHBvc2l0aW9uIFRoZSByZWxhdGl2ZSBwb3NpdGlvbiBvZiB0aGUgaXRlbS5cclxuXHQgKiBAcmV0dXJucyBUaGUgaXRlbSBhdCB0aGUgZ2l2ZW4gcG9zaXRpb24gb3IgYWxsIGl0ZW1zIGlmIG5vIHBvc2l0aW9uIHdhcyBnaXZlbi5cclxuXHQgKi9cclxuICBtZXJnZXJzKHBvc2l0aW9uOiBudW1iZXIpOiBudW1iZXIgfCBudW1iZXJbXSB7XHJcblx0XHRpZiAocG9zaXRpb24gPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5fbWVyZ2Vycy5zbGljZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHBvc2l0aW9uID0gdGhpcy5ub3JtYWxpemUocG9zaXRpb24sIHRydWUpO1xyXG5cdFx0cmV0dXJuIHRoaXMuX21lcmdlcnNbcG9zaXRpb25dO1xyXG5cdCB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEdldHMgdGhlIGFic29sdXRlIHBvc2l0aW9ucyBvZiBjbG9uZXMgZm9yIGFuIGl0ZW0uXHJcblx0ICogQHBhcmFtIHBvc2l0aW9uIFRoZSByZWxhdGl2ZSBwb3NpdGlvbiBvZiB0aGUgaXRlbS5cclxuXHQgKiBAcmV0dXJucyBUaGUgYWJzb2x1dGUgcG9zaXRpb25zIG9mIGNsb25lcyBmb3IgdGhlIGl0ZW0gb3IgYWxsIGlmIG5vIHBvc2l0aW9uIHdhcyBnaXZlbi5cclxuXHQgKi9cclxuICBjbG9uZXMocG9zaXRpb24/OiBudW1iZXIpOiBudW1iZXJbXSB7XHJcblx0XHRjb25zdCBvZGQgPSB0aGlzLl9jbG9uZXMubGVuZ3RoIC8gMixcclxuXHRcdFx0ZXZlbiA9IG9kZCArIHRoaXMuX2l0ZW1zLmxlbmd0aCxcclxuXHRcdFx0bWFwID0gaW5kZXggPT4gaW5kZXggJSAyID09PSAwID8gZXZlbiArIGluZGV4IC8gMiA6IG9kZCAtIChpbmRleCArIDEpIC8gMjtcclxuXHJcblx0XHRpZiAocG9zaXRpb24gPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5fY2xvbmVzLm1hcCgodiwgaSkgPT4gbWFwKGkpKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fY2xvbmVzLm1hcCgodiwgaSkgPT4gdiA9PT0gcG9zaXRpb24gPyBtYXAoaSkgOiBudWxsKS5maWx0ZXIoaXRlbSA9PiBpdGVtKTtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIFNldHMgdGhlIGN1cnJlbnQgYW5pbWF0aW9uIHNwZWVkLlxyXG5cdCAqIEBwYXJhbSBzcGVlZCBUaGUgYW5pbWF0aW9uIHNwZWVkIGluIG1pbGxpc2Vjb25kcyBvciBub3RoaW5nIHRvIGxlYXZlIGl0IHVuY2hhbmdlZC5cclxuXHQgKiBAcmV0dXJucyBUaGUgY3VycmVudCBhbmltYXRpb24gc3BlZWQgaW4gbWlsbGlzZWNvbmRzLlxyXG5cdCAqL1xyXG4gIHNwZWVkKHNwZWVkPzogbnVtYmVyKTogbnVtYmVyIHtcclxuXHRcdGlmIChzcGVlZCAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHRoaXMuX3NwZWVkID0gc3BlZWQ7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX3NwZWVkO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogR2V0cyB0aGUgY29vcmRpbmF0ZSBvZiBhbiBpdGVtLlxyXG5cdCAqIEB0b2RvIFRoZSBuYW1lIG9mIHRoaXMgbWV0aG9kIGlzIG1pc3NsZWFuZGluZy5cclxuXHQgKiBAcGFyYW0gcG9zaXRpb24gVGhlIGFic29sdXRlIHBvc2l0aW9uIG9mIHRoZSBpdGVtIHdpdGhpbiBgbWluaW11bSgpYCBhbmQgYG1heGltdW0oKWAuXHJcblx0ICogQHJldHVybnMgVGhlIGNvb3JkaW5hdGUgb2YgdGhlIGl0ZW0gaW4gcGl4ZWwgb3IgYWxsIGNvb3JkaW5hdGVzLlxyXG5cdCAqL1xyXG4gIGNvb3JkaW5hdGVzKHBvc2l0aW9uPzogbnVtYmVyKTogbnVtYmVyIHwgbnVtYmVyW10ge1xyXG5cdFx0bGV0IG11bHRpcGxpZXIgPSAxLFxyXG5cdFx0XHRuZXdQb3NpdGlvbiA9IHBvc2l0aW9uIC0gMSxcclxuXHRcdFx0Y29vcmRpbmF0ZSxcclxuXHRcdFx0cmVzdWx0OiBudW1iZXJbXTtcclxuXHJcblx0XHRpZiAocG9zaXRpb24gPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXN1bHQgPSB0aGlzLl9jb29yZGluYXRlcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuY29vcmRpbmF0ZXMoaW5kZXgpIGFzIG51bWJlcjtcclxuXHRcdFx0fSk7XHJcblx0XHRcdHJldHVybiByZXN1bHQ7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3MuY2VudGVyKSB7XHJcblx0XHRcdGlmICh0aGlzLnNldHRpbmdzLnJ0bCkge1xyXG5cdFx0XHRcdG11bHRpcGxpZXIgPSAtMTtcclxuXHRcdFx0XHRuZXdQb3NpdGlvbiA9IHBvc2l0aW9uICsgMTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Y29vcmRpbmF0ZSA9IHRoaXMuX2Nvb3JkaW5hdGVzW3Bvc2l0aW9uXTtcclxuXHRcdFx0Y29vcmRpbmF0ZSArPSAodGhpcy53aWR0aCgpIC0gY29vcmRpbmF0ZSArICh0aGlzLl9jb29yZGluYXRlc1tuZXdQb3NpdGlvbl0gfHwgMCkpIC8gMiAqIG11bHRpcGxpZXI7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjb29yZGluYXRlID0gdGhpcy5fY29vcmRpbmF0ZXNbbmV3UG9zaXRpb25dIHx8IDA7XHJcblx0XHR9XHJcblxyXG5cdFx0Y29vcmRpbmF0ZSA9IE1hdGguY2VpbChjb29yZGluYXRlKTtcclxuXHJcblx0XHRyZXR1cm4gY29vcmRpbmF0ZTtcclxuXHQgfVxyXG5cclxuICAvKipcclxuXHQgKiBDYWxjdWxhdGVzIHRoZSBzcGVlZCBmb3IgYSB0cmFuc2xhdGlvbi5cclxuXHQgKiBAcGFyYW0gZnJvbSBUaGUgYWJzb2x1dGUgcG9zaXRpb24gb2YgdGhlIHN0YXJ0IGl0ZW0uXHJcblx0ICogQHBhcmFtIHRvIFRoZSBhYnNvbHV0ZSBwb3NpdGlvbiBvZiB0aGUgdGFyZ2V0IGl0ZW0uXHJcblx0ICogQHBhcmFtIGZhY3RvciBbZmFjdG9yPXVuZGVmaW5lZF0gLSBUaGUgdGltZSBmYWN0b3IgaW4gbWlsbGlzZWNvbmRzLlxyXG5cdCAqIEByZXR1cm5zIFRoZSB0aW1lIGluIG1pbGxpc2Vjb25kcyBmb3IgdGhlIHRyYW5zbGF0aW9uLlxyXG5cdCAqL1xyXG4gIHByaXZhdGUgX2R1cmF0aW9uKGZyb206IG51bWJlciwgdG86IG51bWJlciwgZmFjdG9yPzogbnVtYmVyIHwgYm9vbGVhbik6IG51bWJlciB7XHJcblx0XHRpZiAoZmFjdG9yID09PSAwKSB7XHJcblx0XHRcdHJldHVybiAwO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBNYXRoLm1pbihNYXRoLm1heChNYXRoLmFicyh0byAtIGZyb20pLCAxKSwgNikgKiBNYXRoLmFicygoK2ZhY3RvciB8fCB0aGlzLnNldHRpbmdzLnNtYXJ0U3BlZWQpKTtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIFNsaWRlcyB0byB0aGUgc3BlY2lmaWVkIGl0ZW0uXHJcblx0ICogQHBhcmFtIHBvc2l0aW9uIFRoZSBwb3NpdGlvbiBvZiB0aGUgaXRlbS5cclxuXHQgKiBAcGFyYW0gc3BlZWQgVGhlIHRpbWUgaW4gbWlsbGlzZWNvbmRzIGZvciB0aGUgdHJhbnNpdGlvbi5cclxuXHQgKi9cclxuICB0byhwb3NpdGlvbjogbnVtYmVyLCBzcGVlZDogbnVtYmVyIHwgYm9vbGVhbikge1xyXG5cdFx0bGV0IGN1cnJlbnQgPSB0aGlzLmN1cnJlbnQoKSxcclxuXHRcdFx0cmV2ZXJ0ID0gbnVsbCxcclxuXHRcdFx0ZGlzdGFuY2UgPSBwb3NpdGlvbiAtIHRoaXMucmVsYXRpdmUoY3VycmVudCksXHJcblx0XHRcdG1heGltdW0gPSB0aGlzLm1heGltdW0oKTtcclxuXHRcdGNvbnN0XHRkaXJlY3Rpb24gPSArKGRpc3RhbmNlID4gMCkgLSArKGRpc3RhbmNlIDwgMCksXHJcblx0XHRcdGl0ZW1zID0gdGhpcy5faXRlbXMubGVuZ3RoLFxyXG5cdFx0XHRtaW5pbXVtID0gdGhpcy5taW5pbXVtKCk7XHJcblxyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3MubG9vcCkge1xyXG5cdFx0XHRpZiAoIXRoaXMuc2V0dGluZ3MucmV3aW5kICYmIE1hdGguYWJzKGRpc3RhbmNlKSA+IGl0ZW1zIC8gMikge1xyXG5cdFx0XHRcdGRpc3RhbmNlICs9IGRpcmVjdGlvbiAqIC0xICogaXRlbXM7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHBvc2l0aW9uID0gY3VycmVudCArIGRpc3RhbmNlO1xyXG5cdFx0XHRyZXZlcnQgPSAoKHBvc2l0aW9uIC0gbWluaW11bSkgJSBpdGVtcyArIGl0ZW1zKSAlIGl0ZW1zICsgbWluaW11bTtcclxuXHJcblx0XHRcdGlmIChyZXZlcnQgIT09IHBvc2l0aW9uICYmIHJldmVydCAtIGRpc3RhbmNlIDw9IG1heGltdW0gJiYgcmV2ZXJ0IC0gZGlzdGFuY2UgPiAwKSB7XHJcblx0XHRcdFx0Y3VycmVudCA9IHJldmVydCAtIGRpc3RhbmNlO1xyXG5cdFx0XHRcdHBvc2l0aW9uID0gcmV2ZXJ0O1xyXG5cdFx0XHRcdHRoaXMucmVzZXQoY3VycmVudCk7XHJcblx0XHRcdFx0dGhpcy5zZW5kQ2hhbmdlcygpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2UgaWYgKHRoaXMuc2V0dGluZ3MucmV3aW5kKSB7XHJcblx0XHRcdG1heGltdW0gKz0gMTtcclxuXHRcdFx0cG9zaXRpb24gPSAocG9zaXRpb24gJSBtYXhpbXVtICsgbWF4aW11bSkgJSBtYXhpbXVtO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cG9zaXRpb24gPSBNYXRoLm1heChtaW5pbXVtLCBNYXRoLm1pbihtYXhpbXVtLCBwb3NpdGlvbikpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHR0aGlzLnNwZWVkKHRoaXMuX2R1cmF0aW9uKGN1cnJlbnQsIHBvc2l0aW9uLCBzcGVlZCkpO1xyXG5cdFx0XHR0aGlzLmN1cnJlbnQocG9zaXRpb24pO1xyXG5cclxuXHRcdFx0dGhpcy51cGRhdGUoKTtcclxuXHRcdH0sIDApO1xyXG5cclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIFNsaWRlcyB0byB0aGUgbmV4dCBpdGVtLlxyXG5cdCAqIEBwYXJhbSBzcGVlZCBUaGUgdGltZSBpbiBtaWxsaXNlY29uZHMgZm9yIHRoZSB0cmFuc2l0aW9uLlxyXG5cdCAqL1xyXG4gIG5leHQoc3BlZWQ6IG51bWJlciB8IGJvb2xlYW4pIHtcclxuXHRcdHNwZWVkID0gc3BlZWQgfHwgZmFsc2U7XHJcblx0XHR0aGlzLnRvKHRoaXMucmVsYXRpdmUodGhpcy5jdXJyZW50KCkpICsgMSwgc3BlZWQpO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogU2xpZGVzIHRvIHRoZSBwcmV2aW91cyBpdGVtLlxyXG5cdCAqIEBwYXJhbSBzcGVlZCBUaGUgdGltZSBpbiBtaWxsaXNlY29uZHMgZm9yIHRoZSB0cmFuc2l0aW9uLlxyXG5cdCAqL1xyXG4gIHByZXYoc3BlZWQ6IG51bWJlciB8IGJvb2xlYW4pIHtcclxuXHRcdHNwZWVkID0gc3BlZWQgfHwgZmFsc2U7XHJcblx0XHR0aGlzLnRvKHRoaXMucmVsYXRpdmUodGhpcy5jdXJyZW50KCkpIC0gMSwgc3BlZWQpO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogSGFuZGxlcyB0aGUgZW5kIG9mIGFuIGFuaW1hdGlvbi5cclxuXHQgKiBAcGFyYW0gZXZlbnQgLSBUaGUgZXZlbnQgYXJndW1lbnRzLlxyXG5cdCAqL1xyXG4gIG9uVHJhbnNpdGlvbkVuZChldmVudD86IGFueSkge1xyXG5cdFx0Ly8gaWYgY3NzMiBhbmltYXRpb24gdGhlbiBldmVudCBvYmplY3QgaXMgdW5kZWZpbmVkXHJcblx0XHRpZiAoZXZlbnQgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHQvLyBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcblx0XHRcdC8vIC8vIENhdGNoIG9ubHkgb3dsLXN0YWdlIHRyYW5zaXRpb25FbmQgZXZlbnRcclxuXHRcdFx0Ly8gaWYgKChldmVudC50YXJnZXQgfHwgZXZlbnQuc3JjRWxlbWVudCB8fCBldmVudC5vcmlnaW5hbFRhcmdldCkgIT09IHRoaXMuJHN0YWdlLmdldCgwKVx0KSB7XHJcblx0XHRcdC8vIFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHQvLyB9XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHRcdHRoaXMubGVhdmUoJ2FuaW1hdGluZycpO1xyXG5cdFx0dGhpcy5fdHJpZ2dlcigndHJhbnNsYXRlZCcpO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogR2V0cyB2aWV3cG9ydCB3aWR0aC5cclxuXHQgKiBAcmV0dXJucyAtIFRoZSB3aWR0aCBpbiBwaXhlbC5cclxuXHQgKi9cclxuICBwcml2YXRlIF92aWV3cG9ydCgpOiBudW1iZXIge1xyXG5cdFx0bGV0IHdpZHRoO1xyXG5cdFx0aWYgKHRoaXMuX3dpZHRoKSB7XHJcblx0XHRcdHdpZHRoID0gdGhpcy5fd2lkdGg7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmxvZ2dlci5sb2coJ0NhbiBub3QgZGV0ZWN0IHZpZXdwb3J0IHdpZHRoLicpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHdpZHRoO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogU2V0cyBfaXRlbXNcclxuXHQgKiBAcGFyYW0gY29udGVudCBUaGUgbGlzdCBvZiBzbGlkZXMgcHV0IGludG8gQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZXMuXHJcblx0ICovXHJcbiAgc2V0SXRlbXMoY29udGVudDogQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZVtdKSB7XHJcblx0XHR0aGlzLl9pdGVtcyA9IGNvbnRlbnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHNsaWRlc0RhdGEgdXNpbmcgdGhpcy5faXRlbXNcclxuXHQgKi9cclxuXHRwcml2YXRlIF9kZWZpbmVTbGlkZXNEYXRhKCkge1xyXG5cdFx0Ly8gTWF5YmUgY3JlYXRpbmcgYW5kIHVzaW5nIGxvYWRNYXAgd291bGQgYmUgYmV0dGVyIGluIExhenlMb2FkU2VydmljZS5cclxuXHRcdC8vIEhvdmV3ZXIgaW4gdGhhdCBjYXNlIHdoZW4gJ3Jlc2l6ZScgZXZlbnQgZmlyZXMsIHByb3AgJ2xvYWQnIG9mIGFsbCBzbGlkZXMgd2lsbCBnZXQgJ2ZhbHNlJyBhbmQgc3VjaCBzdGF0ZSBvZiBwcm9wIHdpbGwgYmUgc2VlbiBieSBWaWV3IGR1cmluZyBpdHMgdXBkYXRpbmcuIEFjY29yZGluZ2x5IHRoZSBjb2RlIHdpbGwgcmVtb3ZlIHNsaWRlcydzIGNvbnRlbnQgZnJvbSBET00gZXZlbiBpZiBpdCB3YXMgbG9hZGVkIGJlZm9yZS5cclxuXHRcdC8vIFRodXMgaXQgd291bGQgYmUgbmVlZGVkIHRvIGFkZCB0aGF0IGNvbnRlbnQgaW50byBET00gYWdhaW4uXHJcblx0XHQvLyBJbiBvcmRlciB0byBhdm9pZCBhZGRpdGlvbmFsIHJlbW92aW5nL2FkZGluZyBsb2FkZWQgc2xpZGVzJ3MgY29udGVudCB3ZSB1c2UgbG9hZE1hcCBoZXJlIGFuZCBzZXQgcmVzdG9yZSBzdGF0ZSBvZiBwcm9wICdsb2FkJyBiZWZvcmUgdGhlIFZpZXcgd2lsbCBnZXQgaXQuXHJcblx0XHRsZXQgbG9hZE1hcDogTWFwPHN0cmluZywgYm9vbGVhbj47XHJcblxyXG5cdFx0aWYgKHRoaXMuc2xpZGVzRGF0YSAmJiB0aGlzLnNsaWRlc0RhdGEubGVuZ3RoKSB7XHJcblx0XHRcdGxvYWRNYXAgPSBuZXcgTWFwKCk7XHJcblx0XHRcdHRoaXMuc2xpZGVzRGF0YS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG5cdFx0XHRcdGlmIChpdGVtLmxvYWQpIHtcclxuXHRcdFx0XHRcdGxvYWRNYXAuc2V0KGl0ZW0uaWQsIGl0ZW0ubG9hZCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2xpZGVzRGF0YSA9IHRoaXMuX2l0ZW1zLm1hcChzbGlkZSA9PiB7XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0aWQ6IGAke3NsaWRlLmlkfWAsXHJcblx0XHRcdFx0aXNBY3RpdmU6IGZhbHNlLFxyXG5cdFx0XHRcdHRwbFJlZjogc2xpZGUudHBsUmVmLFxyXG5cdFx0XHRcdGRhdGFNZXJnZTogc2xpZGUuZGF0YU1lcmdlLFxyXG5cdFx0XHRcdHdpZHRoOiAwLFxyXG5cdFx0XHRcdGlzQ2xvbmVkOiBmYWxzZSxcclxuXHRcdFx0XHRsb2FkOiBsb2FkTWFwID8gbG9hZE1hcC5nZXQoc2xpZGUuaWQpIDogZmFsc2UsXHJcblx0XHRcdFx0aGFzaEZyYWdtZW50OiBzbGlkZS5kYXRhSGFzaFxyXG5cdFx0XHR9O1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIGN1cnJlbnQgY2xhc3NlcyBmb3Igc2xpZGVcclxuXHQgKiBAcGFyYW0gc2xpZGUgU2xpZGUgb2YgY2Fyb3VzZWxcclxuXHQgKiBAcmV0dXJucyBvYmplY3Qgd2l0aCBuYW1lcyBvZiBjc3MtY2xhc3NlcyB3aGljaCBhcmUga2V5cyBhbmQgdHJ1ZS9mYWxzZSB2YWx1ZXNcclxuXHQgKi9cclxuXHRzZXRDdXJTbGlkZUNsYXNzZXMoc2xpZGU6IFNsaWRlTW9kZWwpOiB7W2tleTogc3RyaW5nXTogYm9vbGVhbn0ge1xyXG5cdFx0Ly8gQ1NTIGNsYXNzZXM6IGFkZGVkL3JlbW92ZWQgcGVyIGN1cnJlbnQgc3RhdGUgb2YgY29tcG9uZW50IHByb3BlcnRpZXNcclxuXHRcdGNvbnN0IGN1cnJlbnRDbGFzc2VzOiB7W2tleTogc3RyaW5nXTogYm9vbGVhbn0gPSAge1xyXG5cdFx0XHQnYWN0aXZlJzogc2xpZGUuaXNBY3RpdmUsXHJcblx0XHRcdCdjZW50ZXInOiBzbGlkZS5pc0NlbnRlcmVkLFxyXG5cdFx0XHQnY2xvbmVkJzogc2xpZGUuaXNDbG9uZWQsXHJcblx0XHRcdCdhbmltYXRlZCc6IHNsaWRlLmlzQW5pbWF0ZWQsXHJcblx0XHRcdCdvd2wtYW5pbWF0ZWQtaW4nOiBzbGlkZS5pc0RlZkFuaW1hdGVkSW4sXHJcblx0XHRcdCdvd2wtYW5pbWF0ZWQtb3V0Jzogc2xpZGUuaXNEZWZBbmltYXRlZE91dFxyXG5cdFx0fTtcclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLmFuaW1hdGVJbikge1xyXG5cdFx0XHRjdXJyZW50Q2xhc3Nlc1t0aGlzLnNldHRpbmdzLmFuaW1hdGVJbiBhcyBzdHJpbmddID0gc2xpZGUuaXNDdXN0b21BbmltYXRlZEluO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3MuYW5pbWF0ZU91dCkge1xyXG5cdFx0XHRjdXJyZW50Q2xhc3Nlc1t0aGlzLnNldHRpbmdzLmFuaW1hdGVPdXQgYXMgc3RyaW5nXSA9IHNsaWRlLmlzQ3VzdG9tQW5pbWF0ZWRPdXQ7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gY3VycmVudENsYXNzZXM7XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBPcGVyYXRvcnMgdG8gY2FsY3VsYXRlIHJpZ2h0LXRvLWxlZnQgYW5kIGxlZnQtdG8tcmlnaHQuXHJcblx0ICogQHBhcmFtIGEgLSBUaGUgbGVmdCBzaWRlIG9wZXJhbmQuXHJcblx0ICogQHBhcmFtIG8gLSBUaGUgb3BlcmF0b3IuXHJcblx0ICogQHBhcmFtIGIgLSBUaGUgcmlnaHQgc2lkZSBvcGVyYW5kLlxyXG5cdCAqIEByZXR1cm5zIHRydWUvZmFsc2UgbWVhbmluZyByaWdodC10by1sZWZ0IG9yIGxlZnQtdG8tcmlnaHRcclxuXHQgKi9cclxuICBwcml2YXRlIF9vcChhOiBudW1iZXIsIG86IHN0cmluZywgYjogbnVtYmVyKTogYm9vbGVhbiB7XHJcblx0XHRjb25zdCBydGwgPSB0aGlzLnNldHRpbmdzLnJ0bDtcclxuXHRcdHN3aXRjaCAobykge1xyXG5cdFx0XHRjYXNlICc8JzpcclxuXHRcdFx0XHRyZXR1cm4gcnRsID8gYSA+IGIgOiBhIDwgYjtcclxuXHRcdFx0Y2FzZSAnPic6XHJcblx0XHRcdFx0cmV0dXJuIHJ0bCA/IGEgPCBiIDogYSA+IGI7XHJcblx0XHRcdGNhc2UgJz49JzpcclxuXHRcdFx0XHRyZXR1cm4gcnRsID8gYSA8PSBiIDogYSA+PSBiO1xyXG5cdFx0XHRjYXNlICc8PSc6XHJcblx0XHRcdFx0cmV0dXJuIHJ0bCA/IGEgPj0gYiA6IGEgPD0gYjtcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIFRyaWdnZXJzIGEgcHVibGljIGV2ZW50LlxyXG5cdCAqIEB0b2RvIFJlbW92ZSBgc3RhdHVzYCwgYHJlbGF0ZWRUYXJnZXRgIHNob3VsZCBiZSB1c2VkIGluc3RlYWQuXHJcblx0ICogQHBhcmFtIG5hbWUgVGhlIGV2ZW50IG5hbWUuXHJcblx0ICogQHBhcmFtIGRhdGEgVGhlIGV2ZW50IGRhdGEuXHJcblx0ICogQHBhcmFtIG5hbWVzcGFjZSBUaGUgZXZlbnQgbmFtZXNwYWNlLlxyXG5cdCAqIEBwYXJhbSBzdGF0ZSBUaGUgc3RhdGUgd2hpY2ggaXMgYXNzb2NpYXRlZCB3aXRoIHRoZSBldmVudC5cclxuXHQgKiBAcGFyYW0gZW50ZXIgSW5kaWNhdGVzIGlmIHRoZSBjYWxsIGVudGVycyB0aGUgc3BlY2lmaWVkIHN0YXRlIG9yIG5vdC5cclxuXHQgKi9cclxuICBwcml2YXRlIF90cmlnZ2VyKG5hbWU6IHN0cmluZywgZGF0YT86IGFueSwgbmFtZXNwYWNlPzogc3RyaW5nLCBzdGF0ZT86IHN0cmluZywgZW50ZXI/OiBib29sZWFuKSB7XHJcblx0XHRzd2l0Y2ggKG5hbWUpIHtcclxuXHRcdFx0Y2FzZSAnaW5pdGlhbGl6ZWQnOlxyXG5cdFx0XHRcdHRoaXMuX2luaXRpYWxpemVkQ2Fyb3VzZWwkLm5leHQobmFtZSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ2NoYW5nZSc6XHJcblx0XHRcdFx0dGhpcy5fY2hhbmdlU2V0dGluZ3NDYXJvdXNlbCQubmV4dChkYXRhKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnY2hhbmdlZCc6XHJcblx0XHRcdFx0dGhpcy5fY2hhbmdlZFNldHRpbmdzQ2Fyb3VzZWwkLm5leHQoZGF0YSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ2RyYWcnOlxyXG5cdFx0XHRcdHRoaXMuX2RyYWdDYXJvdXNlbCQubmV4dChuYW1lKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnZHJhZ2dlZCc6XHJcblx0XHRcdFx0dGhpcy5fZHJhZ2dlZENhcm91c2VsJC5uZXh0KG5hbWUpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdyZXNpemUnOlxyXG5cdFx0XHRcdHRoaXMuX3Jlc2l6ZUNhcm91c2VsJC5uZXh0KG5hbWUpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdyZXNpemVkJzpcclxuXHRcdFx0XHR0aGlzLl9yZXNpemVkQ2Fyb3VzZWwkLm5leHQobmFtZSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ3JlZnJlc2gnOlxyXG5cdFx0XHRcdHRoaXMuX3JlZnJlc2hDYXJvdXNlbCQubmV4dChuYW1lKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAncmVmcmVzaGVkJzpcclxuXHRcdFx0XHR0aGlzLl9yZWZyZXNoZWRDYXJvdXNlbCQubmV4dChuYW1lKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAndHJhbnNsYXRlJzpcclxuXHRcdFx0XHR0aGlzLl90cmFuc2xhdGVDYXJvdXNlbCQubmV4dChuYW1lKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAndHJhbnNsYXRlZCc6XHJcblx0XHRcdFx0dGhpcy5fdHJhbnNsYXRlZENhcm91c2VsJC5uZXh0KG5hbWUpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEVudGVycyBhIHN0YXRlLlxyXG5cdCAqIEBwYXJhbSBuYW1lIC0gVGhlIHN0YXRlIG5hbWUuXHJcblx0ICovXHJcbiAgZW50ZXIobmFtZTogc3RyaW5nKSB7XHJcbiAgICBbIG5hbWUgXS5jb25jYXQodGhpcy5fc3RhdGVzLnRhZ3NbbmFtZV0gfHwgW10pLmZvckVhY2goKHN0YXRlTmFtZSkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5fc3RhdGVzLmN1cnJlbnRbc3RhdGVOYW1lXSA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0dGhpcy5fc3RhdGVzLmN1cnJlbnRbc3RhdGVOYW1lXSA9IDA7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuX3N0YXRlcy5jdXJyZW50W3N0YXRlTmFtZV0rKztcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG5cdCAqIExlYXZlcyBhIHN0YXRlLlxyXG5cdCAqIEBwYXJhbSBuYW1lIC0gVGhlIHN0YXRlIG5hbWUuXHJcblx0ICovXHJcblx0bGVhdmUobmFtZTogc3RyaW5nKSB7XHJcbiAgICBbIG5hbWUgXS5jb25jYXQodGhpcy5fc3RhdGVzLnRhZ3NbbmFtZV0gfHwgW10pLmZvckVhY2goKHN0YXRlTmFtZSkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5fc3RhdGVzLmN1cnJlbnRbc3RhdGVOYW1lXSA9PT0gMCB8fCAhIXRoaXMuX3N0YXRlcy5jdXJyZW50W3N0YXRlTmFtZV0pIHtcclxuICAgICAgICB0aGlzLl9zdGF0ZXMuY3VycmVudFtzdGF0ZU5hbWVdLS07XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcblx0ICogUmVnaXN0ZXJzIGFuIGV2ZW50IG9yIHN0YXRlLlxyXG5cdCAqIEBwYXJhbSBvYmplY3QgLSBUaGUgZXZlbnQgb3Igc3RhdGUgdG8gcmVnaXN0ZXIuXHJcblx0ICovXHJcbiAgcmVnaXN0ZXIob2JqZWN0OiBhbnkpIHtcclxuXHRcdGlmIChvYmplY3QudHlwZSA9PT0gVHlwZS5TdGF0ZSkge1xyXG5cdFx0XHRpZiAoIXRoaXMuX3N0YXRlcy50YWdzW29iamVjdC5uYW1lXSkge1xyXG5cdFx0XHRcdHRoaXMuX3N0YXRlcy50YWdzW29iamVjdC5uYW1lXSA9IG9iamVjdC50YWdzO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuX3N0YXRlcy50YWdzW29iamVjdC5uYW1lXSA9IHRoaXMuX3N0YXRlcy50YWdzW29iamVjdC5uYW1lXS5jb25jYXQob2JqZWN0LnRhZ3MpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLl9zdGF0ZXMudGFnc1tvYmplY3QubmFtZV0gPSB0aGlzLl9zdGF0ZXMudGFnc1tvYmplY3QubmFtZV0uZmlsdGVyKCh0YWcsIGkpID0+IHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5fc3RhdGVzLnRhZ3Nbb2JqZWN0Lm5hbWVdLmluZGV4T2YodGFnKSA9PT0gaTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBTdXBwcmVzc2VzIGV2ZW50cy5cclxuXHQgKiBAcGFyYW0gZXZlbnRzIFRoZSBldmVudHMgdG8gc3VwcHJlc3MuXHJcblx0ICovXHJcbiAgcHJpdmF0ZSBfc3VwcHJlc3MoZXZlbnRzOiBzdHJpbmdbXSkge1xyXG5cdFx0ZXZlbnRzLmZvckVhY2goZXZlbnQgPT4ge1xyXG5cdFx0XHR0aGlzLl9zdXByZXNzW2V2ZW50XSA9IHRydWU7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIFJlbGVhc2VzIHN1cHByZXNzZWQgZXZlbnRzLlxyXG5cdCAqIEBwYXJhbSBldmVudHMgVGhlIGV2ZW50cyB0byByZWxlYXNlLlxyXG5cdCAqL1xyXG4gIHByaXZhdGUgX3JlbGVhc2UoZXZlbnRzOiBzdHJpbmdbXSkge1xyXG5cdFx0ZXZlbnRzLmZvckVhY2goZXZlbnQgPT4ge1xyXG5cdFx0XHRkZWxldGUgdGhpcy5fc3VwcmVzc1tldmVudF07XHJcblx0XHR9KTtcclxuXHQgfVxyXG5cclxuICAvKipcclxuXHQgKiBHZXRzIHVuaWZpZWQgcG9pbnRlciBjb29yZGluYXRlcyBmcm9tIGV2ZW50LlxyXG5cdCAqIEB0b2RvICMyNjFcclxuXHQgKiBAcGFyYW0gZXZlbnQgVGhlIGBtb3VzZWRvd25gIG9yIGB0b3VjaHN0YXJ0YCBldmVudC5cclxuXHQgKiBAcmV0dXJucyBPYmplY3QgQ29vcmRzIHdoaWNoIGNvbnRhaW5zIGB4YCBhbmQgYHlgIGNvb3JkaW5hdGVzIG9mIGN1cnJlbnQgcG9pbnRlciBwb3NpdGlvbi5cclxuXHQgKi9cclxuXHRwb2ludGVyKGV2ZW50OiBhbnkpOiBDb29yZHMge1xyXG5cdFx0Y29uc3QgcmVzdWx0ID0geyB4OiBudWxsLCB5OiBudWxsIH07XHJcblxyXG5cdFx0ZXZlbnQgPSBldmVudC5vcmlnaW5hbEV2ZW50IHx8IGV2ZW50IHx8IHdpbmRvdy5ldmVudDtcclxuXHJcblx0XHRldmVudCA9IGV2ZW50LnRvdWNoZXMgJiYgZXZlbnQudG91Y2hlcy5sZW5ndGggP1xyXG5cdFx0XHRldmVudC50b3VjaGVzWzBdIDogZXZlbnQuY2hhbmdlZFRvdWNoZXMgJiYgZXZlbnQuY2hhbmdlZFRvdWNoZXMubGVuZ3RoID9cclxuXHRcdFx0XHRldmVudC5jaGFuZ2VkVG91Y2hlc1swXSA6IGV2ZW50O1xyXG5cclxuXHRcdGlmIChldmVudC5wYWdlWCkge1xyXG5cdFx0XHRyZXN1bHQueCA9IGV2ZW50LnBhZ2VYO1xyXG5cdFx0XHRyZXN1bHQueSA9IGV2ZW50LnBhZ2VZO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmVzdWx0LnggPSBldmVudC5jbGllbnRYO1xyXG5cdFx0XHRyZXN1bHQueSA9IGV2ZW50LmNsaWVudFk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHQgfVxyXG5cclxuICAvKipcclxuXHQgKiBEZXRlcm1pbmVzIGlmIHRoZSBpbnB1dCBpcyBhIE51bWJlciBvciBzb21ldGhpbmcgdGhhdCBjYW4gYmUgY29lcmNlZCB0byBhIE51bWJlclxyXG5cdCAqIEBwYXJhbSBudW1iZXIgVGhlIGlucHV0IHRvIGJlIHRlc3RlZFxyXG5cdCAqIEByZXR1cm5zIEFuIGluZGljYXRpb24gaWYgdGhlIGlucHV0IGlzIGEgTnVtYmVyIG9yIGNhbiBiZSBjb2VyY2VkIHRvIGEgTnVtYmVyXHJcblx0ICovXHJcbiAgcHJpdmF0ZSBfaXNOdW1lcmljKG51bWJlcjogYW55KTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQobnVtYmVyKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdmFsdWUgaXMgbnVtYmVyIG9yIGJvb2xlYW4gdHlwZVxyXG5cdCAqIEBwYXJhbSB2YWx1ZSBUaGUgaW5wdXQgdG8gYmUgdGVzdGVkXHJcblx0ICogQHJldHVybnMgQW4gaW5kaWNhdGlvbiBpZiB0aGUgaW5wdXQgaXMgYSBOdW1iZXIgb3IgY2FuIGJlIGNvZXJjZWQgdG8gYSBOdW1iZXIsIG9yIEJvb2xlYW5cclxuXHQgKi9cclxuXHRwcml2YXRlIF9pc051bWJlck9yQm9vbGVhbih2YWx1ZTogbnVtYmVyIHwgYm9vbGVhbik6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2lzTnVtZXJpYyh2YWx1ZSkgfHwgdHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbic7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdmFsdWUgaXMgbnVtYmVyIG9yIHN0cmluZyB0eXBlXHJcblx0ICogQHBhcmFtIHZhbHVlIFRoZSBpbnB1dCB0byBiZSB0ZXN0ZWRcclxuXHQgKiBAcmV0dXJucyBBbiBpbmRpY2F0aW9uIGlmIHRoZSBpbnB1dCBpcyBhIE51bWJlciBvciBjYW4gYmUgY29lcmNlZCB0byBhIE51bWJlciwgb3IgU3RyaW5nXHJcblx0ICovXHJcblx0cHJpdmF0ZSBfaXNOdW1iZXJPclN0cmluZyh2YWx1ZTogbnVtYmVyIHwgc3RyaW5nKTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gdGhpcy5faXNOdW1lcmljKHZhbHVlKSB8fCB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRGV0ZXJtaW5lcyB3aGV0aGVyIHZhbHVlIGlzIG51bWJlciBvciBzdHJpbmcgdHlwZVxyXG5cdCAqIEBwYXJhbSB2YWx1ZSBUaGUgaW5wdXQgdG8gYmUgdGVzdGVkXHJcblx0ICogQHJldHVybnMgQW4gaW5kaWNhdGlvbiBpZiB0aGUgaW5wdXQgaXMgYSBOdW1iZXIgb3IgY2FuIGJlIGNvZXJjZWQgdG8gYSBOdW1iZXIsIG9yIFN0cmluZ1xyXG5cdCAqL1xyXG5cdHByaXZhdGUgX2lzU3RyaW5nT3JCb29sZWFuKHZhbHVlOiBudW1iZXIgfCBzdHJpbmcpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nO1xyXG5cdH1cclxuXHJcbiAgLyoqXHJcblx0ICogR2V0cyB0aGUgZGlmZmVyZW5jZSBvZiB0d28gdmVjdG9ycy5cclxuXHQgKiBAdG9kbyAjMjYxXHJcblx0ICogQHBhcmFtIGZpcnN0IFRoZSBmaXJzdCB2ZWN0b3IuXHJcblx0ICogQHBhcmFtIHNlY29uZC0gVGhlIHNlY29uZCB2ZWN0b3IuXHJcblx0ICogQHJldHVybnMgVGhlIGRpZmZlcmVuY2UuXHJcblx0ICovXHJcbiAgZGlmZmVyZW5jZShmaXJzdDogQ29vcmRzLCBzZWNvbmQ6IENvb3Jkcyk6IENvb3JkcyB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHR4OiBmaXJzdC54IC0gc2Vjb25kLngsXHJcblx0XHRcdHk6IGZpcnN0LnkgLSBzZWNvbmQueVxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG59XHJcbiJdfQ==