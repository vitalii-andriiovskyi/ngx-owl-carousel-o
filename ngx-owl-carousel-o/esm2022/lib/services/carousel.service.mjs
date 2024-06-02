import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { OwlCarouselOConfig, OwlOptionsMockedTypes } from '../carousel/owl-carousel-o-config';
import * as i0 from "@angular/core";
import * as i1 from "./logger.service";
/**
 * Current state information and their tags.
 */
export class States {
    current;
    tags;
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
    x;
    y;
}
/**
 * Model for all current data of carousel
 */
export class CarouselCurrentData {
    owlDOMData;
    stageData;
    slidesData;
    navData;
    dotsData;
}
export class CarouselService {
    logger;
    /**
     * Subject for passing data needed for managing View
     */
    _viewSettingsShipper$ = new Subject();
    /**
     * Subject for notification when the carousel got initializes
     */
    _initializedCarousel$ = new Subject();
    /**
     * Subject for notification when the carousel's settings start changinf
     */
    _changeSettingsCarousel$ = new Subject();
    /**
     * Subject for notification when the carousel's settings have changed
     */
    _changedSettingsCarousel$ = new Subject();
    /**
     * Subject for notification when the carousel starts translating or moving
     */
    _translateCarousel$ = new Subject();
    /**
     * Subject for notification when the carousel stopped translating or moving
     */
    _translatedCarousel$ = new Subject();
    /**
     * Subject for notification when the carousel's rebuilding caused by 'resize' event starts
     */
    _resizeCarousel$ = new Subject();
    /**
     * Subject for notification  when the carousel's rebuilding caused by 'resize' event is ended
     */
    _resizedCarousel$ = new Subject();
    /**
     * Subject for notification when the refresh of carousel starts
     */
    _refreshCarousel$ = new Subject();
    /**
     * Subject for notification when the refresh of carousel is ended
     */
    _refreshedCarousel$ = new Subject();
    /**
     * Subject for notification when the dragging of carousel starts
     */
    _dragCarousel$ = new Subject();
    /**
     * Subject for notification when the dragging of carousel is ended
     */
    _draggedCarousel$ = new Subject();
    /**
     * Current settings for the carousel.
     */
    settings = {
        items: 0
    };
    /**
     * Initial data for setting classes to element .owl-carousel
     */
    owlDOMData = {
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
    stageData = {
        transform: 'translate3d(0px,0px,0px)',
        transition: '0s',
        width: 0,
        paddingL: 0,
        paddingR: 0
    };
    /**
     *  Data of every slide
     */
    slidesData;
    /**
     * Data of navigation block
     */
    navData;
    /**
     * Data of dots block
     */
    dotsData;
    /**
     * Carousel width
     */
    _width;
    /**
     * All real items.
     */
    _items = []; // is equal to this.slides
    /**
     * Array with width of every slide.
     */
    _widths = [];
    /**
     * Currently suppressed events to prevent them from beeing retriggered.
     */
    _supress = {};
    /**
     * References to the running plugins of this carousel.
     */
    _plugins = {};
    /**
     * Absolute current position.
     */
    _current = null;
    /**
     * All cloned items.
     */
    _clones = [];
    /**
     * Merge values of all items.
     * @todo Maybe this could be part of a plugin.
     */
    _mergers = [];
    /**
     * Animation speed in milliseconds.
     */
    _speed = null;
    /**
     * Coordinates of all items in pixel.
     * @todo The name of this member is missleading.
     */
    _coordinates = [];
    /**
     * Current breakpoint.
     * @todo Real media queries would be nice.
     */
    _breakpoint = null;
    /**
     * Prefix for id of cloned slides
     */
    clonedIdPrefix = 'cloned-';
    /**
     * Current options set by the caller including defaults.
     */
    _options = {};
    /**
     * Invalidated parts within the update process.
     */
    _invalidated = {};
    // Is needed for tests
    get invalidated() {
        return this._invalidated;
    }
    /**
     * Current state information and their tags.
     */
    _states = {
        current: {},
        tags: {
            initializing: ['busy'],
            animating: ['busy'],
            dragging: ['interacting']
        }
    };
    // is needed for tests
    get states() {
        return this._states;
    }
    /**
         * Ordered list of workers for the update process.
     */
    _pipe = [
        // {
        //   filter: ['width', 'settings'],
        //   run: () => {
        //     this._width = this.carouselWindowWidth;
        //   }
        // },
        {
            filter: ['width', 'items', 'settings'],
            run: cache => {
                cache.current = this._items && this._items[this.relative(this._current)]?.id;
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
                while (iterator-- > 0) {
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
                while (repeat-- > 0) {
                    // Switch to only using appended clones
                    clones.push(this.normalize(clones.length / 2, true));
                    append.push({ ...this.slidesData[clones[clones.length - 1]] });
                    clones.push(this.normalize(items.length - 1 - (clones.length - 1) / 2, true));
                    prepend.unshift({ ...this.slidesData[clones[clones.length - 1]] });
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
    constructor(logger) {
        this.logger = logger;
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
        this._options = { ...configOptions, ...checkedOptions };
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
        const checkedOptions = { ...options };
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
                        checkedOptions[key] = key === 'items' ? this._validateItems(checkedOptions[key], checkedOptions.skip_validateItems) : checkedOptions[key];
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
     * Checks the option `items` set by user and if it bigger than number of slides, the function returns number of slides
     * @param items option items set by user
     * @param skip_validateItems option `skip_validateItems` set by user
     * @returns right number of items
     */
    _validateItems(items, skip_validateItems) {
        let result = items;
        if (items > this._items.length) {
            if (skip_validateItems) {
                this.logger.log('The option \'items\' in your options is bigger than the number of slides. The navigation got disabled');
            }
            else {
                result = this._items.length;
                this.logger.log('The option \'items\' in your options is bigger than the number of slides. This option is updated to the current number of slides and the navigation got disabled');
            }
        }
        else {
            if (items === this._items.length && (this.settings.dots || this.settings.nav)) {
                this.logger.log('Option \'items\' in your options is equal to the number of slides. So the navigation got disabled');
            }
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
        this.settings = { ...this._options };
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
        this.settings = { ...this._options, ...overwrites[match], items: (overwrites[match] && overwrites[match].items) ? this._validateItems(overwrites[match].items, this._options.skip_validateItems) : this._options.items };
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
            while (iterator-- > 0) {
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
     * @param second The second vector.
     * @returns The difference.
     */
    difference(first, second) {
        if (null === first || null === second) {
            return {
                x: 0,
                y: 0,
            };
        }
        return {
            x: first.x - second.x,
            y: first.y - second.y
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: CarouselService, deps: [{ token: i1.OwlLogger }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: CarouselService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: CarouselService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i1.OwlLogger }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYnMvbmd4LW93bC1jYXJvdXNlbC1vL3NyYy9saWIvc2VydmljZXMvY2Fyb3VzZWwuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFRM0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLHFCQUFxQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7OztBQU05Rjs7R0FFRztBQUNILE1BQU0sT0FBTyxNQUFNO0lBQ2xCLE9BQU8sQ0FBSztJQUNaLElBQUksQ0FFRjtDQUNGO0FBRUQ7OztHQUdHO0FBQ0gsTUFBTSxDQUFOLElBQVksSUFHWDtBQUhELFdBQVksSUFBSTtJQUNmLHVCQUFlLENBQUE7SUFDZix1QkFBZSxDQUFBO0FBQ2hCLENBQUMsRUFIVyxJQUFJLEtBQUosSUFBSSxRQUdmO0FBQUEsQ0FBQztBQUVGOzs7R0FHRztBQUNILE1BQU0sQ0FBTixJQUFZLEtBSVg7QUFKRCxXQUFZLEtBQUs7SUFDaEIsNEJBQW1CLENBQUE7SUFDbkIsd0JBQWUsQ0FBQTtJQUNmLHdCQUFlLENBQUE7QUFDaEIsQ0FBQyxFQUpXLEtBQUssS0FBTCxLQUFLLFFBSWhCO0FBQUEsQ0FBQztBQUVGOztHQUVHO0FBQ0gsTUFBTSxPQUFPLE1BQU07SUFDbEIsQ0FBQyxDQUFTO0lBQ1YsQ0FBQyxDQUFTO0NBQ1Y7QUFFRDs7R0FFRztBQUNILE1BQU0sT0FBTyxtQkFBbUI7SUFDL0IsVUFBVSxDQUFhO0lBQ3ZCLFNBQVMsQ0FBWTtJQUNyQixVQUFVLENBQWU7SUFDekIsT0FBTyxDQUFVO0lBQ2pCLFFBQVEsQ0FBVztDQUNuQjtBQUdELE1BQU0sT0FBTyxlQUFlO0lBMmFQO0lBMWFwQjs7T0FFRztJQUNLLHFCQUFxQixHQUFHLElB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SSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLENBQUM7SUFDNUQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSyxrQkFBa0IsQ0FBQyxLQUFzQjtRQUNoRCxPQUFPLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxPQUFPLEtBQUssS0FBSyxTQUFTLENBQUM7SUFDaEUsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILFVBQVUsQ0FBQyxLQUFhLEVBQUUsTUFBYztRQUN2QyxJQUFJLElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLE1BQU0sRUFBRSxDQUFDO1lBQ3ZDLE9BQU87Z0JBQ04sQ0FBQyxFQUFFLENBQUM7Z0JBQ0osQ0FBQyxFQUFFLENBQUM7YUFDSixDQUFDO1FBQ0gsQ0FBQztRQUNELE9BQU87WUFDTixDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQztZQUNyQixDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQztTQUNyQixDQUFDO0lBQ0gsQ0FBQzt1R0E3b0RXLGVBQWU7MkdBQWYsZUFBZTs7MkZBQWYsZUFBZTtrQkFEM0IsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgU3RhZ2VEYXRhIH0gZnJvbSAnLi4vbW9kZWxzL3N0YWdlLWRhdGEubW9kZWwnO1xuaW1wb3J0IHsgT3dsRE9NRGF0YSB9IGZyb20gJy4uL21vZGVscy9vd2xET00tZGF0YS5tb2RlbCc7XG5pbXBvcnQgeyBTbGlkZU1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL3NsaWRlLm1vZGVsJztcblxuXG5pbXBvcnQgeyBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlIH0gZnJvbSAnLi4vY2Fyb3VzZWwvY2Fyb3VzZWwtc2xpZGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IE93bENhcm91c2VsT0NvbmZpZywgT3dsT3B0aW9uc01vY2tlZFR5cGVzIH0gZnJvbSAnLi4vY2Fyb3VzZWwvb3dsLWNhcm91c2VsLW8tY29uZmlnJztcbmltcG9ydCB7IE93bE9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbHMvb3dsLW9wdGlvbnMubW9kZWwnO1xuXG5pbXBvcnQgeyBOYXZEYXRhLCBEb3RzRGF0YSB9IGZyb20gJy4uL21vZGVscy9uYXZpZ2F0aW9uLWRhdGEubW9kZWxzJztcbmltcG9ydCB7IE93bExvZ2dlciB9IGZyb20gJy4vbG9nZ2VyLnNlcnZpY2UnO1xuXG4vKipcbiAqIEN1cnJlbnQgc3RhdGUgaW5mb3JtYXRpb24gYW5kIHRoZWlyIHRhZ3MuXG4gKi9cbmV4cG9ydCBjbGFzcyBTdGF0ZXMge1xuXHRjdXJyZW50OiB7fTtcblx0dGFnczoge1xuXHRcdFtrZXk6IHN0cmluZ106IHN0cmluZ1tdO1xuXHR9O1xufVxuXG4vKipcbiAqIEVudW1lcmF0aW9uIGZvciB0eXBlcy5cbiAqIEBlbnVtIHtTdHJpbmd9XG4gKi9cbmV4cG9ydCBlbnVtIFR5cGUge1xuXHRFdmVudCA9ICdldmVudCcsXG5cdFN0YXRlID0gJ3N0YXRlJ1xufTtcblxuLyoqXG4gKiBFbnVtZXJhdGlvbiBmb3Igd2lkdGguXG4gKiBAZW51bSB7U3RyaW5nfVxuICovXG5leHBvcnQgZW51bSBXaWR0aCB7XG5cdERlZmF1bHQgPSAnZGVmYXVsdCcsXG5cdElubmVyID0gJ2lubmVyJyxcblx0T3V0ZXIgPSAnb3V0ZXInXG59O1xuXG4vKipcbiAqIE1vZGVsIGZvciBjb29yZHMgb2YgLm93bC1zdGFnZVxuICovXG5leHBvcnQgY2xhc3MgQ29vcmRzIHtcblx0eDogbnVtYmVyO1xuXHR5OiBudW1iZXI7XG59XG5cbi8qKlxuICogTW9kZWwgZm9yIGFsbCBjdXJyZW50IGRhdGEgb2YgY2Fyb3VzZWxcbiAqL1xuZXhwb3J0IGNsYXNzIENhcm91c2VsQ3VycmVudERhdGEge1xuXHRvd2xET01EYXRhOiBPd2xET01EYXRhO1xuXHRzdGFnZURhdGE6IFN0YWdlRGF0YTtcblx0c2xpZGVzRGF0YTogU2xpZGVNb2RlbFtdO1xuXHRuYXZEYXRhOiBOYXZEYXRhO1xuXHRkb3RzRGF0YTogRG90c0RhdGE7XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDYXJvdXNlbFNlcnZpY2Uge1xuXHQvKipcblx0ICogU3ViamVjdCBmb3IgcGFzc2luZyBkYXRhIG5lZWRlZCBmb3IgbWFuYWdpbmcgVmlld1xuXHQgKi9cblx0cHJpdmF0ZSBfdmlld1NldHRpbmdzU2hpcHBlciQgPSBuZXcgU3ViamVjdDxDYXJvdXNlbEN1cnJlbnREYXRhPigpO1xuXHQvKipcblx0ICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uIHdoZW4gdGhlIGNhcm91c2VsIGdvdCBpbml0aWFsaXplc1xuXHQgKi9cblx0cHJpdmF0ZSBfaW5pdGlhbGl6ZWRDYXJvdXNlbCQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG5cblx0LyoqXG5cdCAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSBjYXJvdXNlbCdzIHNldHRpbmdzIHN0YXJ0IGNoYW5naW5mXG5cdCAqL1xuXHRwcml2YXRlIF9jaGFuZ2VTZXR0aW5nc0Nhcm91c2VsJCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcblxuXHQvKipcblx0ICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uIHdoZW4gdGhlIGNhcm91c2VsJ3Mgc2V0dGluZ3MgaGF2ZSBjaGFuZ2VkXG5cdCAqL1xuXHRwcml2YXRlIF9jaGFuZ2VkU2V0dGluZ3NDYXJvdXNlbCQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cdC8qKlxuXHQgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gd2hlbiB0aGUgY2Fyb3VzZWwgc3RhcnRzIHRyYW5zbGF0aW5nIG9yIG1vdmluZ1xuXHQgKi9cblx0cHJpdmF0ZSBfdHJhbnNsYXRlQ2Fyb3VzZWwkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuXHQvKipcblx0ICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uIHdoZW4gdGhlIGNhcm91c2VsIHN0b3BwZWQgdHJhbnNsYXRpbmcgb3IgbW92aW5nXG5cdCAqL1xuXHRwcml2YXRlIF90cmFuc2xhdGVkQ2Fyb3VzZWwkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuXHQvKipcblx0ICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uIHdoZW4gdGhlIGNhcm91c2VsJ3MgcmVidWlsZGluZyBjYXVzZWQgYnkgJ3Jlc2l6ZScgZXZlbnQgc3RhcnRzXG5cdCAqL1xuXHRwcml2YXRlIF9yZXNpemVDYXJvdXNlbCQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG5cdC8qKlxuXHQgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gIHdoZW4gdGhlIGNhcm91c2VsJ3MgcmVidWlsZGluZyBjYXVzZWQgYnkgJ3Jlc2l6ZScgZXZlbnQgaXMgZW5kZWRcblx0ICovXG5cdHByaXZhdGUgX3Jlc2l6ZWRDYXJvdXNlbCQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG5cdC8qKlxuXHQgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gd2hlbiB0aGUgcmVmcmVzaCBvZiBjYXJvdXNlbCBzdGFydHNcblx0ICovXG5cdHByaXZhdGUgX3JlZnJlc2hDYXJvdXNlbCQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG5cdC8qKlxuXHQgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gd2hlbiB0aGUgcmVmcmVzaCBvZiBjYXJvdXNlbCBpcyBlbmRlZFxuXHQgKi9cblx0cHJpdmF0ZSBfcmVmcmVzaGVkQ2Fyb3VzZWwkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuXHQvKipcblx0ICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uIHdoZW4gdGhlIGRyYWdnaW5nIG9mIGNhcm91c2VsIHN0YXJ0c1xuXHQgKi9cblx0cHJpdmF0ZSBfZHJhZ0Nhcm91c2VsJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcblx0LyoqXG5cdCAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSBkcmFnZ2luZyBvZiBjYXJvdXNlbCBpcyBlbmRlZFxuXHQgKi9cblx0cHJpdmF0ZSBfZHJhZ2dlZENhcm91c2VsJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcblxuXHQvKipcblx0ICogQ3VycmVudCBzZXR0aW5ncyBmb3IgdGhlIGNhcm91c2VsLlxuXHQgKi9cblx0c2V0dGluZ3M6IE93bE9wdGlvbnMgPSB7XG5cdFx0aXRlbXM6IDBcblx0fTtcblxuXHQvKipcblx0ICogSW5pdGlhbCBkYXRhIGZvciBzZXR0aW5nIGNsYXNzZXMgdG8gZWxlbWVudCAub3dsLWNhcm91c2VsXG5cdCAqL1xuXHRvd2xET01EYXRhOiBPd2xET01EYXRhID0ge1xuXHRcdHJ0bDogZmFsc2UsXG5cdFx0aXNSZXNwb25zaXZlOiBmYWxzZSxcblx0XHRpc1JlZnJlc2hlZDogZmFsc2UsXG5cdFx0aXNMb2FkZWQ6IGZhbHNlLFxuXHRcdGlzTG9hZGluZzogZmFsc2UsXG5cdFx0aXNNb3VzZURyYWdhYmxlOiBmYWxzZSxcblx0XHRpc0dyYWI6IGZhbHNlLFxuXHRcdGlzVG91Y2hEcmFnYWJsZTogZmFsc2Vcblx0fTtcblxuXHQvKipcblx0ICogSW5pdGlhbCBkYXRhIG9mIC5vd2wtc3RhZ2Vcblx0ICovXG5cdHN0YWdlRGF0YTogU3RhZ2VEYXRhID0ge1xuXHRcdHRyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKDBweCwwcHgsMHB4KScsXG5cdFx0dHJhbnNpdGlvbjogJzBzJyxcblx0XHR3aWR0aDogMCxcblx0XHRwYWRkaW5nTDogMCxcblx0XHRwYWRkaW5nUjogMFxuXHR9O1xuXG5cdC8qKlxuXHQgKiAgRGF0YSBvZiBldmVyeSBzbGlkZVxuXHQgKi9cblx0c2xpZGVzRGF0YTogU2xpZGVNb2RlbFtdO1xuXG5cdC8qKlxuXHQgKiBEYXRhIG9mIG5hdmlnYXRpb24gYmxvY2tcblx0ICovXG5cdG5hdkRhdGE6IE5hdkRhdGE7XG5cblx0LyoqXG5cdCAqIERhdGEgb2YgZG90cyBibG9ja1xuXHQgKi9cblx0ZG90c0RhdGE6IERvdHNEYXRhO1xuXG5cdC8qKlxuXHQgKiBDYXJvdXNlbCB3aWR0aFxuXHQgKi9cblx0cHJpdmF0ZSBfd2lkdGg6IG51bWJlcjtcblxuXHQvKipcblx0ICogQWxsIHJlYWwgaXRlbXMuXG5cdCAqL1xuXHRwcml2YXRlIF9pdGVtczogQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZVtdID0gW107IC8vIGlzIGVxdWFsIHRvIHRoaXMuc2xpZGVzXG5cblx0LyoqXG5cdCAqIEFycmF5IHdpdGggd2lkdGggb2YgZXZlcnkgc2xpZGUuXG5cdCAqL1xuXHRwcml2YXRlIF93aWR0aHM6IGFueVtdID0gW107XG5cblx0LyoqXG5cdCAqIEN1cnJlbnRseSBzdXBwcmVzc2VkIGV2ZW50cyB0byBwcmV2ZW50IHRoZW0gZnJvbSBiZWVpbmcgcmV0cmlnZ2VyZWQuXG5cdCAqL1xuXHRwcml2YXRlIF9zdXByZXNzOiBhbnkgPSB7fTtcblxuXHQvKipcblx0ICogUmVmZXJlbmNlcyB0byB0aGUgcnVubmluZyBwbHVnaW5zIG9mIHRoaXMgY2Fyb3VzZWwuXG5cdCAqL1xuXHRwcml2YXRlIF9wbHVnaW5zOiBhbnkgPSB7fTtcblxuXHQvKipcblx0ICogQWJzb2x1dGUgY3VycmVudCBwb3NpdGlvbi5cblx0ICovXG5cdHByaXZhdGUgX2N1cnJlbnQ6IG51bWJlciB8IG51bGwgPSBudWxsO1xuXG5cdC8qKlxuXHQgKiBBbGwgY2xvbmVkIGl0ZW1zLlxuXHQgKi9cblx0cHJpdmF0ZSBfY2xvbmVzOiBhbnlbXSA9IFtdO1xuXG5cdC8qKlxuXHQgKiBNZXJnZSB2YWx1ZXMgb2YgYWxsIGl0ZW1zLlxuXHQgKiBAdG9kbyBNYXliZSB0aGlzIGNvdWxkIGJlIHBhcnQgb2YgYSBwbHVnaW4uXG5cdCAqL1xuXHRwcml2YXRlIF9tZXJnZXJzOiBhbnlbXSA9IFtdO1xuXG5cdC8qKlxuXHQgKiBBbmltYXRpb24gc3BlZWQgaW4gbWlsbGlzZWNvbmRzLlxuXHQgKi9cblx0cHJpdmF0ZSBfc3BlZWQ6IG51bWJlciB8IG51bGwgPSBudWxsO1xuXG5cdC8qKlxuXHQgKiBDb29yZGluYXRlcyBvZiBhbGwgaXRlbXMgaW4gcGl4ZWwuXG5cdCAqIEB0b2RvIFRoZSBuYW1lIG9mIHRoaXMgbWVtYmVyIGlzIG1pc3NsZWFkaW5nLlxuXHQgKi9cblx0cHJpdmF0ZSBfY29vcmRpbmF0ZXM6IG51bWJlcltdID0gW107XG5cblx0LyoqXG5cdCAqIEN1cnJlbnQgYnJlYWtwb2ludC5cblx0ICogQHRvZG8gUmVhbCBtZWRpYSBxdWVyaWVzIHdvdWxkIGJlIG5pY2UuXG5cdCAqL1xuXHRwcml2YXRlIF9icmVha3BvaW50OiBhbnkgPSBudWxsO1xuXG5cdC8qKlxuXHQgKiBQcmVmaXggZm9yIGlkIG9mIGNsb25lZCBzbGlkZXNcblx0ICovXG5cdGNsb25lZElkUHJlZml4ID0gJ2Nsb25lZC0nO1xuXG5cdC8qKlxuXHQgKiBDdXJyZW50IG9wdGlvbnMgc2V0IGJ5IHRoZSBjYWxsZXIgaW5jbHVkaW5nIGRlZmF1bHRzLlxuXHQgKi9cblx0X29wdGlvbnM6IE93bE9wdGlvbnMgPSB7fTtcblxuXHQvKipcblx0ICogSW52YWxpZGF0ZWQgcGFydHMgd2l0aGluIHRoZSB1cGRhdGUgcHJvY2Vzcy5cblx0ICovXG5cdHByaXZhdGUgX2ludmFsaWRhdGVkOiBhbnkgPSB7fTtcblxuXHQvLyBJcyBuZWVkZWQgZm9yIHRlc3RzXG5cdGdldCBpbnZhbGlkYXRlZCgpIHtcblx0XHRyZXR1cm4gdGhpcy5faW52YWxpZGF0ZWQ7XG5cdH1cblx0LyoqXG5cdCAqIEN1cnJlbnQgc3RhdGUgaW5mb3JtYXRpb24gYW5kIHRoZWlyIHRhZ3MuXG5cdCAqL1xuXHRwcml2YXRlIF9zdGF0ZXM6IFN0YXRlcyA9IHtcblx0XHRjdXJyZW50OiB7fSxcblx0XHR0YWdzOiB7XG5cdFx0XHRpbml0aWFsaXppbmc6IFsnYnVzeSddLFxuXHRcdFx0YW5pbWF0aW5nOiBbJ2J1c3knXSxcblx0XHRcdGRyYWdnaW5nOiBbJ2ludGVyYWN0aW5nJ11cblx0XHR9XG5cdH07XG5cblx0Ly8gaXMgbmVlZGVkIGZvciB0ZXN0c1xuXHRnZXQgc3RhdGVzKCkge1xuXHRcdHJldHVybiB0aGlzLl9zdGF0ZXM7XG5cdH1cblxuXHQvKipcblx0XHQgKiBPcmRlcmVkIGxpc3Qgb2Ygd29ya2VycyBmb3IgdGhlIHVwZGF0ZSBwcm9jZXNzLlxuXHQgKi9cblx0cHJpdmF0ZSBfcGlwZTogYW55W10gPSBbXG5cdFx0Ly8ge1xuXHRcdC8vICAgZmlsdGVyOiBbJ3dpZHRoJywgJ3NldHRpbmdzJ10sXG5cdFx0Ly8gICBydW46ICgpID0+IHtcblx0XHQvLyAgICAgdGhpcy5fd2lkdGggPSB0aGlzLmNhcm91c2VsV2luZG93V2lkdGg7XG5cdFx0Ly8gICB9XG5cdFx0Ly8gfSxcblx0XHR7XG5cdFx0XHRmaWx0ZXI6IFsnd2lkdGgnLCAnaXRlbXMnLCAnc2V0dGluZ3MnXSxcblx0XHRcdHJ1bjogY2FjaGUgPT4ge1xuXHRcdFx0XHRjYWNoZS5jdXJyZW50ID0gdGhpcy5faXRlbXMgJiYgdGhpcy5faXRlbXNbdGhpcy5yZWxhdGl2ZSh0aGlzLl9jdXJyZW50KV0/LmlkO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0Ly8ge1xuXHRcdC8vICAgZmlsdGVyOiBbJ2l0ZW1zJywgJ3NldHRpbmdzJ10sXG5cdFx0Ly8gICBydW46IGZ1bmN0aW9uKCkge1xuXHRcdC8vICAgICAvLyB0aGlzLiRzdGFnZS5jaGlsZHJlbignLmNsb25lZCcpLnJlbW92ZSgpO1xuXHRcdC8vICAgfVxuXHRcdC8vIH0sXG5cdFx0e1xuXHRcdFx0ZmlsdGVyOiBbJ3dpZHRoJywgJ2l0ZW1zJywgJ3NldHRpbmdzJ10sXG5cdFx0XHRydW46IChjYWNoZSkgPT4ge1xuXHRcdFx0XHRjb25zdCBtYXJnaW4gPSB0aGlzLnNldHRpbmdzLm1hcmdpbiB8fCAnJyxcblx0XHRcdFx0XHRncmlkID0gIXRoaXMuc2V0dGluZ3MuYXV0b1dpZHRoLFxuXHRcdFx0XHRcdHJ0bCA9IHRoaXMuc2V0dGluZ3MucnRsLFxuXHRcdFx0XHRcdGNzcyA9IHtcblx0XHRcdFx0XHRcdCdtYXJnaW4tbGVmdCc6IHJ0bCA/IG1hcmdpbiA6ICcnLFxuXHRcdFx0XHRcdFx0J21hcmdpbi1yaWdodCc6IHJ0bCA/ICcnIDogbWFyZ2luXG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRpZiAoIWdyaWQpIHtcblx0XHRcdFx0XHR0aGlzLnNsaWRlc0RhdGEuZm9yRWFjaChzbGlkZSA9PiB7XG5cdFx0XHRcdFx0XHRzbGlkZS5tYXJnaW5MID0gY3NzWydtYXJnaW4tbGVmdCddO1xuXHRcdFx0XHRcdFx0c2xpZGUubWFyZ2luUiA9IGNzc1snbWFyZ2luLXJpZ2h0J107XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjYWNoZS5jc3MgPSBjc3M7XG5cdFx0XHR9XG5cdFx0fSwge1xuXHRcdFx0ZmlsdGVyOiBbJ3dpZHRoJywgJ2l0ZW1zJywgJ3NldHRpbmdzJ10sXG5cdFx0XHRydW46IChjYWNoZSkgPT4ge1xuXHRcdFx0XHRjb25zdCB3aWR0aDogYW55ID0gKyh0aGlzLndpZHRoKCkgLyB0aGlzLnNldHRpbmdzLml0ZW1zKS50b0ZpeGVkKDMpIC0gdGhpcy5zZXR0aW5ncy5tYXJnaW4sXG5cdFx0XHRcdFx0Z3JpZCA9ICF0aGlzLnNldHRpbmdzLmF1dG9XaWR0aCxcblx0XHRcdFx0XHR3aWR0aHMgPSBbXTtcblx0XHRcdFx0bGV0IG1lcmdlID0gbnVsbCxcblx0XHRcdFx0XHRpdGVyYXRvciA9IHRoaXMuX2l0ZW1zLmxlbmd0aDtcblxuXHRcdFx0XHRjYWNoZS5pdGVtcyA9IHtcblx0XHRcdFx0XHRtZXJnZTogZmFsc2UsXG5cdFx0XHRcdFx0d2lkdGg6IHdpZHRoXG5cdFx0XHRcdH07XG5cblx0XHRcdFx0d2hpbGUgKGl0ZXJhdG9yLS0gPiAwKSB7XG5cdFx0XHRcdFx0bWVyZ2UgPSB0aGlzLl9tZXJnZXJzW2l0ZXJhdG9yXTtcblx0XHRcdFx0XHRtZXJnZSA9IHRoaXMuc2V0dGluZ3MubWVyZ2VGaXQgJiYgTWF0aC5taW4obWVyZ2UsIHRoaXMuc2V0dGluZ3MuaXRlbXMpIHx8IG1lcmdlO1xuXHRcdFx0XHRcdGNhY2hlLml0ZW1zLm1lcmdlID0gbWVyZ2UgPiAxIHx8IGNhY2hlLml0ZW1zLm1lcmdlO1xuXG5cdFx0XHRcdFx0d2lkdGhzW2l0ZXJhdG9yXSA9ICFncmlkID8gdGhpcy5faXRlbXNbaXRlcmF0b3JdLndpZHRoID8gdGhpcy5faXRlbXNbaXRlcmF0b3JdLndpZHRoIDogd2lkdGggOiB3aWR0aCAqIG1lcmdlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy5fd2lkdGhzID0gd2lkdGhzO1xuXG5cdFx0XHRcdHRoaXMuc2xpZGVzRGF0YS5mb3JFYWNoKChzbGlkZSwgaSkgPT4ge1xuXHRcdFx0XHRcdHNsaWRlLndpZHRoID0gdGhpcy5fd2lkdGhzW2ldO1xuXHRcdFx0XHRcdHNsaWRlLm1hcmdpblIgPSBjYWNoZS5jc3NbJ21hcmdpbi1yaWdodCddO1xuXHRcdFx0XHRcdHNsaWRlLm1hcmdpbkwgPSBjYWNoZS5jc3NbJ21hcmdpbi1sZWZ0J107XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0sIHtcblx0XHRcdGZpbHRlcjogWydpdGVtcycsICdzZXR0aW5ncyddLFxuXHRcdFx0cnVuOiAoKSA9PiB7XG5cdFx0XHRcdGNvbnN0IGNsb25lczogYW55W10gPSBbXSxcblx0XHRcdFx0XHRpdGVtczogQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZVtdID0gdGhpcy5faXRlbXMsXG5cdFx0XHRcdFx0c2V0dGluZ3M6IGFueSA9IHRoaXMuc2V0dGluZ3MsXG5cdFx0XHRcdFx0Ly8gVE9ETzogU2hvdWxkIGJlIGNvbXB1dGVkIGZyb20gbnVtYmVyIG9mIG1pbiB3aWR0aCBpdGVtcyBpbiBzdGFnZVxuXHRcdFx0XHRcdHZpZXcgPSBNYXRoLm1heChzZXR0aW5ncy5pdGVtcyAqIDIsIDQpLFxuXHRcdFx0XHRcdHNpemUgPSBNYXRoLmNlaWwoaXRlbXMubGVuZ3RoIC8gMikgKiAyO1xuXHRcdFx0XHRsZXQgYXBwZW5kOiBhbnlbXSA9IFtdLFxuXHRcdFx0XHRcdHByZXBlbmQ6IGFueVtdID0gW10sXG5cdFx0XHRcdFx0cmVwZWF0ID0gc2V0dGluZ3MubG9vcCAmJiBpdGVtcy5sZW5ndGggPyBzZXR0aW5ncy5yZXdpbmQgPyB2aWV3IDogTWF0aC5tYXgodmlldywgc2l6ZSkgOiAwO1xuXG5cdFx0XHRcdHJlcGVhdCAvPSAyO1xuXG5cdFx0XHRcdHdoaWxlIChyZXBlYXQtLSA+IDApIHtcblx0XHRcdFx0XHQvLyBTd2l0Y2ggdG8gb25seSB1c2luZyBhcHBlbmRlZCBjbG9uZXNcblx0XHRcdFx0XHRjbG9uZXMucHVzaCh0aGlzLm5vcm1hbGl6ZShjbG9uZXMubGVuZ3RoIC8gMiwgdHJ1ZSkpO1xuXHRcdFx0XHRcdGFwcGVuZC5wdXNoKHsgLi4udGhpcy5zbGlkZXNEYXRhW2Nsb25lc1tjbG9uZXMubGVuZ3RoIC0gMV1dIH0pO1xuXHRcdFx0XHRcdGNsb25lcy5wdXNoKHRoaXMubm9ybWFsaXplKGl0ZW1zLmxlbmd0aCAtIDEgLSAoY2xvbmVzLmxlbmd0aCAtIDEpIC8gMiwgdHJ1ZSkpO1xuXHRcdFx0XHRcdHByZXBlbmQudW5zaGlmdCh7IC4uLnRoaXMuc2xpZGVzRGF0YVtjbG9uZXNbY2xvbmVzLmxlbmd0aCAtIDFdXSB9KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMuX2Nsb25lcyA9IGNsb25lcztcblxuXHRcdFx0XHRhcHBlbmQgPSBhcHBlbmQubWFwKHNsaWRlID0+IHtcblx0XHRcdFx0XHRzbGlkZS5pZCA9IGAke3RoaXMuY2xvbmVkSWRQcmVmaXh9JHtzbGlkZS5pZH1gO1xuXHRcdFx0XHRcdHNsaWRlLmlzQWN0aXZlID0gZmFsc2U7XG5cdFx0XHRcdFx0c2xpZGUuaXNDbG9uZWQgPSB0cnVlO1xuXHRcdFx0XHRcdHJldHVybiBzbGlkZTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0cHJlcGVuZCA9IHByZXBlbmQubWFwKHNsaWRlID0+IHtcblx0XHRcdFx0XHRzbGlkZS5pZCA9IGAke3RoaXMuY2xvbmVkSWRQcmVmaXh9JHtzbGlkZS5pZH1gO1xuXHRcdFx0XHRcdHNsaWRlLmlzQWN0aXZlID0gZmFsc2U7XG5cdFx0XHRcdFx0c2xpZGUuaXNDbG9uZWQgPSB0cnVlO1xuXHRcdFx0XHRcdHJldHVybiBzbGlkZTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0dGhpcy5zbGlkZXNEYXRhID0gcHJlcGVuZC5jb25jYXQodGhpcy5zbGlkZXNEYXRhKS5jb25jYXQoYXBwZW5kKTtcblx0XHRcdH1cblx0XHR9LCB7XG5cdFx0XHRmaWx0ZXI6IFsnd2lkdGgnLCAnaXRlbXMnLCAnc2V0dGluZ3MnXSxcblx0XHRcdHJ1bjogKCkgPT4ge1xuXHRcdFx0XHRjb25zdCBydGwgPSB0aGlzLnNldHRpbmdzLnJ0bCA/IDEgOiAtMSxcblx0XHRcdFx0XHRzaXplID0gdGhpcy5fY2xvbmVzLmxlbmd0aCArIHRoaXMuX2l0ZW1zLmxlbmd0aCxcblx0XHRcdFx0XHRjb29yZGluYXRlcyA9IFtdO1xuXHRcdFx0XHRsZXQgaXRlcmF0b3IgPSAtMSxcblx0XHRcdFx0XHRwcmV2aW91cyA9IDAsXG5cdFx0XHRcdFx0Y3VycmVudCA9IDA7XG5cblx0XHRcdFx0d2hpbGUgKCsraXRlcmF0b3IgPCBzaXplKSB7XG5cdFx0XHRcdFx0cHJldmlvdXMgPSBjb29yZGluYXRlc1tpdGVyYXRvciAtIDFdIHx8IDA7XG5cdFx0XHRcdFx0Y3VycmVudCA9IHRoaXMuX3dpZHRoc1t0aGlzLnJlbGF0aXZlKGl0ZXJhdG9yKV0gKyB0aGlzLnNldHRpbmdzLm1hcmdpbjtcblx0XHRcdFx0XHRjb29yZGluYXRlcy5wdXNoKHByZXZpb3VzICsgY3VycmVudCAqIHJ0bCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLl9jb29yZGluYXRlcyA9IGNvb3JkaW5hdGVzO1xuXHRcdFx0fVxuXHRcdH0sIHtcblx0XHRcdGZpbHRlcjogWyd3aWR0aCcsICdpdGVtcycsICdzZXR0aW5ncyddLFxuXHRcdFx0cnVuOiAoKSA9PiB7XG5cdFx0XHRcdGNvbnN0IHBhZGRpbmcgPSB0aGlzLnNldHRpbmdzLnN0YWdlUGFkZGluZyxcblx0XHRcdFx0XHRjb29yZGluYXRlcyA9IHRoaXMuX2Nvb3JkaW5hdGVzLFxuXHRcdFx0XHRcdGNzcyA9IHtcblx0XHRcdFx0XHRcdCd3aWR0aCc6IE1hdGguY2VpbChNYXRoLmFicyhjb29yZGluYXRlc1tjb29yZGluYXRlcy5sZW5ndGggLSAxXSkpICsgcGFkZGluZyAqIDIsXG5cdFx0XHRcdFx0XHQncGFkZGluZy1sZWZ0JzogcGFkZGluZyB8fCAnJyxcblx0XHRcdFx0XHRcdCdwYWRkaW5nLXJpZ2h0JzogcGFkZGluZyB8fCAnJ1xuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0dGhpcy5zdGFnZURhdGEud2lkdGggPSBjc3Mud2lkdGg7IC8vIHVzZSB0aGlzIHByb3BlcnR5IGluICpuZ0lmIGRpcmVjdGl2ZSBmb3IgLm93bC1zdGFnZSBlbGVtZW50XG5cdFx0XHRcdHRoaXMuc3RhZ2VEYXRhLnBhZGRpbmdMID0gY3NzWydwYWRkaW5nLWxlZnQnXTtcblx0XHRcdFx0dGhpcy5zdGFnZURhdGEucGFkZGluZ1IgPSBjc3NbJ3BhZGRpbmctcmlnaHQnXTtcblx0XHRcdH1cblx0XHR9LCB7XG5cdFx0XHQvLyAgIGZpbHRlcjogWyAnd2lkdGgnLCAnaXRlbXMnLCAnc2V0dGluZ3MnIF0sXG5cdFx0XHQvLyAgIHJ1bjogY2FjaGUgPT4ge1xuXHRcdFx0Ly8gXHRcdC8vIHRoaXMgbWV0aG9kIHNldHMgdGhlIHdpZHRoIGZvciBldmVyeSBzbGlkZSwgYnV0IEkgc2V0IGl0IGluIGRpZmZlcmVudCB3YXkgZWFybGllclxuXHRcdFx0Ly8gXHRcdGNvbnN0IGdyaWQgPSAhdGhpcy5zZXR0aW5ncy5hdXRvV2lkdGgsXG5cdFx0XHQvLyBcdFx0aXRlbXMgPSB0aGlzLiRzdGFnZS5jaGlsZHJlbigpOyAvLyB1c2UgdGhpcy5zbGlkZXNEYXRhXG5cdFx0XHQvLyAgICAgbGV0IGl0ZXJhdG9yID0gdGhpcy5fY29vcmRpbmF0ZXMubGVuZ3RoO1xuXG5cdFx0XHQvLyAgICAgaWYgKGdyaWQgJiYgY2FjaGUuaXRlbXMubWVyZ2UpIHtcblx0XHRcdC8vICAgICAgIHdoaWxlIChpdGVyYXRvci0tKSB7XG5cdFx0XHQvLyAgICAgICAgIGNhY2hlLmNzcy53aWR0aCA9IHRoaXMuX3dpZHRoc1t0aGlzLnJlbGF0aXZlKGl0ZXJhdG9yKV07XG5cdFx0XHQvLyAgICAgICAgIGl0ZW1zLmVxKGl0ZXJhdG9yKS5jc3MoY2FjaGUuY3NzKTtcblx0XHRcdC8vICAgICAgIH1cblx0XHRcdC8vICAgICB9IGVsc2UgaWYgKGdyaWQpIHtcblx0XHRcdC8vICAgICAgIGNhY2hlLmNzcy53aWR0aCA9IGNhY2hlLml0ZW1zLndpZHRoO1xuXHRcdFx0Ly8gICAgICAgaXRlbXMuY3NzKGNhY2hlLmNzcyk7XG5cdFx0XHQvLyAgICAgfVxuXHRcdFx0Ly8gICB9XG5cdFx0XHQvLyB9LCB7XG5cdFx0XHQvLyAgIGZpbHRlcjogWyAnaXRlbXMnIF0sXG5cdFx0XHQvLyAgIHJ1bjogZnVuY3Rpb24oKSB7XG5cdFx0XHQvLyAgICAgdGhpcy5fY29vcmRpbmF0ZXMubGVuZ3RoIDwgMSAmJiB0aGlzLiRzdGFnZS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuXHRcdFx0Ly8gICB9XG5cdFx0XHQvLyB9LCB7XG5cdFx0XHRmaWx0ZXI6IFsnd2lkdGgnLCAnaXRlbXMnLCAnc2V0dGluZ3MnXSxcblx0XHRcdHJ1bjogY2FjaGUgPT4ge1xuXHRcdFx0XHRsZXQgY3VycmVudCA9IGNhY2hlLmN1cnJlbnQgPyB0aGlzLnNsaWRlc0RhdGEuZmluZEluZGV4KHNsaWRlID0+IHNsaWRlLmlkID09PSBjYWNoZS5jdXJyZW50KSA6IDA7XG5cdFx0XHRcdGN1cnJlbnQgPSBNYXRoLm1heCh0aGlzLm1pbmltdW0oKSwgTWF0aC5taW4odGhpcy5tYXhpbXVtKCksIGN1cnJlbnQpKTtcblx0XHRcdFx0dGhpcy5yZXNldChjdXJyZW50KTtcblx0XHRcdH1cblx0XHR9LCB7XG5cdFx0XHRmaWx0ZXI6IFsncG9zaXRpb24nXSxcblx0XHRcdHJ1bjogKCkgPT4ge1xuXHRcdFx0XHR0aGlzLmFuaW1hdGUodGhpcy5jb29yZGluYXRlcyh0aGlzLl9jdXJyZW50KSk7XG5cdFx0XHR9XG5cdFx0fSwge1xuXHRcdFx0ZmlsdGVyOiBbJ3dpZHRoJywgJ3Bvc2l0aW9uJywgJ2l0ZW1zJywgJ3NldHRpbmdzJ10sXG5cdFx0XHRydW46ICgpID0+IHtcblx0XHRcdFx0Y29uc3QgcnRsID0gdGhpcy5zZXR0aW5ncy5ydGwgPyAxIDogLTEsXG5cdFx0XHRcdFx0cGFkZGluZyA9IHRoaXMuc2V0dGluZ3Muc3RhZ2VQYWRkaW5nICogMixcblx0XHRcdFx0XHRtYXRjaGVzID0gW107XG5cdFx0XHRcdGxldCBiZWdpbiwgZW5kLCBpbm5lciwgb3V0ZXIsIGksIG47XG5cblx0XHRcdFx0YmVnaW4gPSB0aGlzLmNvb3JkaW5hdGVzKHRoaXMuY3VycmVudCgpKTtcblx0XHRcdFx0aWYgKHR5cGVvZiBiZWdpbiA9PT0gJ251bWJlcicpIHtcblx0XHRcdFx0XHRiZWdpbiArPSBwYWRkaW5nO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGJlZ2luID0gMDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGVuZCA9IGJlZ2luICsgdGhpcy53aWR0aCgpICogcnRsO1xuXG5cdFx0XHRcdGlmIChydGwgPT09IC0xICYmIHRoaXMuc2V0dGluZ3MuY2VudGVyKSB7XG5cdFx0XHRcdFx0Y29uc3QgcmVzdWx0ID0gdGhpcy5fY29vcmRpbmF0ZXMuZmlsdGVyKGVsZW1lbnQgPT4ge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuc2V0dGluZ3MuaXRlbXMgJSAyID09PSAxID8gZWxlbWVudCA+PSBiZWdpbiA6IGVsZW1lbnQgPiBiZWdpbjtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRiZWdpbiA9IHJlc3VsdC5sZW5ndGggPyByZXN1bHRbcmVzdWx0Lmxlbmd0aCAtIDFdIDogYmVnaW47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRmb3IgKGkgPSAwLCBuID0gdGhpcy5fY29vcmRpbmF0ZXMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG5cdFx0XHRcdFx0aW5uZXIgPSBNYXRoLmNlaWwodGhpcy5fY29vcmRpbmF0ZXNbaSAtIDFdIHx8IDApO1xuXHRcdFx0XHRcdG91dGVyID0gTWF0aC5jZWlsKE1hdGguYWJzKHRoaXMuX2Nvb3JkaW5hdGVzW2ldKSArIHBhZGRpbmcgKiBydGwpO1xuXG5cdFx0XHRcdFx0aWYgKCh0aGlzLl9vcChpbm5lciwgJzw9JywgYmVnaW4pICYmICh0aGlzLl9vcChpbm5lciwgJz4nLCBlbmQpKSlcblx0XHRcdFx0XHRcdHx8ICh0aGlzLl9vcChvdXRlciwgJzwnLCBiZWdpbikgJiYgdGhpcy5fb3Aob3V0ZXIsICc+JywgZW5kKSkpIHtcblx0XHRcdFx0XHRcdG1hdGNoZXMucHVzaChpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLnNsaWRlc0RhdGEuZm9yRWFjaChzbGlkZSA9PiB7XG5cdFx0XHRcdFx0c2xpZGUuaXNBY3RpdmUgPSBmYWxzZTtcblx0XHRcdFx0XHRyZXR1cm4gc2xpZGU7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRtYXRjaGVzLmZvckVhY2goaXRlbSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5zbGlkZXNEYXRhW2l0ZW1dLmlzQWN0aXZlID0gdHJ1ZTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0aWYgKHRoaXMuc2V0dGluZ3MuY2VudGVyKSB7XG5cdFx0XHRcdFx0dGhpcy5zbGlkZXNEYXRhLmZvckVhY2goc2xpZGUgPT4ge1xuXHRcdFx0XHRcdFx0c2xpZGUuaXNDZW50ZXJlZCA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHNsaWRlO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHRoaXMuc2xpZGVzRGF0YVt0aGlzLmN1cnJlbnQoKV0uaXNDZW50ZXJlZCA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdF07XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSBsb2dnZXI6IE93bExvZ2dlcikgeyB9XG5cblx0LyoqXG5cdCAqIE1ha2VzIF92aWV3U2V0dGluZ3NTaGlwcGVyJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXG5cdCAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX3ZpZXdTZXR0aW5nc1NoaXBwZXIkIFN1YmplY3Rcblx0ICovXG5cdGdldFZpZXdDdXJTZXR0aW5ncygpOiBPYnNlcnZhYmxlPENhcm91c2VsQ3VycmVudERhdGE+IHtcblx0XHRyZXR1cm4gdGhpcy5fdmlld1NldHRpbmdzU2hpcHBlciQuYXNPYnNlcnZhYmxlKCk7XG5cdH1cblxuXHQvKipcblx0ICogTWFrZXMgX2luaXRpYWxpemVkQ2Fyb3VzZWwkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcblx0ICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfaW5pdGlhbGl6ZWRDYXJvdXNlbCQgU3ViamVjdFxuXHQgKi9cblx0Z2V0SW5pdGlhbGl6ZWRTdGF0ZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuXHRcdHJldHVybiB0aGlzLl9pbml0aWFsaXplZENhcm91c2VsJC5hc09ic2VydmFibGUoKVxuXHR9XG5cblx0LyoqXG5cdCAqIE1ha2VzIF9jaGFuZ2VTZXR0aW5nc0Nhcm91c2VsJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXG5cdCAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX2NoYW5nZVNldHRpbmdzQ2Fyb3VzZWwkIFN1YmplY3Rcblx0ICovXG5cdGdldENoYW5nZVN0YXRlKCk6IE9ic2VydmFibGU8YW55PiB7XG5cdFx0cmV0dXJuIHRoaXMuX2NoYW5nZVNldHRpbmdzQ2Fyb3VzZWwkLmFzT2JzZXJ2YWJsZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIE1ha2VzIF9jaGFuZ2VkU2V0dGluZ3NDYXJvdXNlbCQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxuXHQgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIF9jaGFuZ2VkU2V0dGluZ3NDYXJvdXNlbCQgU3ViamVjdFxuXHQgKi9cblx0Z2V0Q2hhbmdlZFN0YXRlKCk6IE9ic2VydmFibGU8YW55PiB7XG5cdFx0cmV0dXJuIHRoaXMuX2NoYW5nZWRTZXR0aW5nc0Nhcm91c2VsJC5hc09ic2VydmFibGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBNYWtlcyBfdHJhbnNsYXRlQ2Fyb3VzZWwkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcblx0ICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfdHJhbnNsYXRlQ2Fyb3VzZWwkIFN1YmplY3Rcblx0ICovXG5cdGdldFRyYW5zbGF0ZVN0YXRlKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG5cdFx0cmV0dXJuIHRoaXMuX3RyYW5zbGF0ZUNhcm91c2VsJC5hc09ic2VydmFibGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBNYWtlcyBfdHJhbnNsYXRlZENhcm91c2VsJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXG5cdCAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX3RyYW5zbGF0ZWRDYXJvdXNlbCQgU3ViamVjdFxuXHQgKi9cblx0Z2V0VHJhbnNsYXRlZFN0YXRlKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG5cdFx0cmV0dXJuIHRoaXMuX3RyYW5zbGF0ZWRDYXJvdXNlbCQuYXNPYnNlcnZhYmxlKCk7XG5cdH1cblxuXHQvKipcblx0ICogTWFrZXMgX3Jlc2l6ZUNhcm91c2VsJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXG5cdCAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX3Jlc2l6ZUNhcm91c2VsJCBTdWJqZWN0XG5cdCAqL1xuXHRnZXRSZXNpemVTdGF0ZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuXHRcdHJldHVybiB0aGlzLl9yZXNpemVDYXJvdXNlbCQuYXNPYnNlcnZhYmxlKCk7XG5cdH1cblxuXHQvKipcblx0ICogTWFrZXMgX3Jlc2l6ZWRDYXJvdXNlbCQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxuXHQgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIF9yZXNpemVkQ2Fyb3VzZWwkIFN1YmplY3Rcblx0ICovXG5cdGdldFJlc2l6ZWRTdGF0ZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuXHRcdHJldHVybiB0aGlzLl9yZXNpemVkQ2Fyb3VzZWwkLmFzT2JzZXJ2YWJsZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIE1ha2VzIF9yZWZyZXNoQ2Fyb3VzZWwkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcblx0ICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfcmVmcmVzaENhcm91c2VsJCBTdWJqZWN0XG5cdCAqL1xuXHRnZXRSZWZyZXNoU3RhdGUoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcblx0XHRyZXR1cm4gdGhpcy5fcmVmcmVzaENhcm91c2VsJC5hc09ic2VydmFibGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBNYWtlcyBfcmVmcmVzaGVkQ2Fyb3VzZWwkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcblx0ICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfcmVmcmVzaGVkQ2Fyb3VzZWwkIFN1YmplY3Rcblx0ICovXG5cdGdldFJlZnJlc2hlZFN0YXRlKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG5cdFx0cmV0dXJuIHRoaXMuX3JlZnJlc2hlZENhcm91c2VsJC5hc09ic2VydmFibGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBNYWtlcyBfZHJhZ0Nhcm91c2VsJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXG5cdCAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX2RyYWdDYXJvdXNlbCQgU3ViamVjdFxuXHQgKi9cblx0Z2V0RHJhZ1N0YXRlKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG5cdFx0cmV0dXJuIHRoaXMuX2RyYWdDYXJvdXNlbCQuYXNPYnNlcnZhYmxlKCk7XG5cdH1cblxuXHQvKipcblx0ICogTWFrZXMgX2RyYWdnZWRDYXJvdXNlbCQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxuXHQgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIF9kcmFnZ2VkQ2Fyb3VzZWwkIFN1YmplY3Rcblx0ICovXG5cdGdldERyYWdnZWRTdGF0ZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuXHRcdHJldHVybiB0aGlzLl9kcmFnZ2VkQ2Fyb3VzZWwkLmFzT2JzZXJ2YWJsZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldHVwcyBjdXN0b20gb3B0aW9ucyBleHBhbmRpbmcgZGVmYXVsdCBvcHRpb25zXG5cdCAqIEBwYXJhbSBvcHRpb25zIGN1c3RvbSBvcHRpb25zXG5cdCAqL1xuXHRzZXRPcHRpb25zKG9wdGlvbnM6IE93bE9wdGlvbnMpIHtcblx0XHRjb25zdCBjb25maWdPcHRpb25zOiBPd2xPcHRpb25zID0gbmV3IE93bENhcm91c2VsT0NvbmZpZygpO1xuXHRcdGNvbnN0IGNoZWNrZWRPcHRpb25zOiBPd2xPcHRpb25zID0gdGhpcy5fdmFsaWRhdGVPcHRpb25zKG9wdGlvbnMsIGNvbmZpZ09wdGlvbnMpO1xuXHRcdHRoaXMuX29wdGlvbnMgPSB7IC4uLmNvbmZpZ09wdGlvbnMsIC4uLmNoZWNrZWRPcHRpb25zIH07XG5cdH1cblxuXHQvKipcblx0ICogQ2hlY2tzIHdoZXRoZXIgdXNlcidzIG9wdGlvbiBhcmUgc2V0IHByb3Blcmx5LiBDaGVraW5nIGlzIGJhc2VkIG9uIHR5cGluZ3M7XG5cdCAqIEBwYXJhbSBvcHRpb25zIG9wdGlvbnMgc2V0IGJ5IHVzZXJcblx0ICogQHBhcmFtIGNvbmZpZ09wdGlvbnMgZGVmYXVsdCBvcHRpb25zXG5cdCAqIEByZXR1cm5zIGNoZWNrZWQgYW5kIG1vZGlmaWVkIChpZiBpdCdzIG5lZWRlZCkgdXNlcidzIG9wdGlvbnNcblx0ICpcblx0ICogTm90ZXM6XG5cdCAqIFx0LSBpZiB1c2VyIHNldCBvcHRpb24gd2l0aCB3cm9uZyB0eXBlLCBpdCdsbCBiZSB3cml0dGVuIGluIGNvbnNvbGVcblx0ICovXG5cdHByaXZhdGUgX3ZhbGlkYXRlT3B0aW9ucyhvcHRpb25zOiBPd2xPcHRpb25zLCBjb25maWdPcHRpb25zOiBPd2xPcHRpb25zKTogT3dsT3B0aW9ucyB7XG5cdFx0Y29uc3QgY2hlY2tlZE9wdGlvbnM6IE93bE9wdGlvbnMgPSB7IC4uLm9wdGlvbnMgfTtcblx0XHRjb25zdCBtb2NrZWRUeXBlcyA9IG5ldyBPd2xPcHRpb25zTW9ja2VkVHlwZXMoKTtcblxuXHRcdGNvbnN0IHNldFJpZ2h0T3B0aW9uID0gKHR5cGU6IHN0cmluZywga2V5OiBhbnkpOiBPd2xPcHRpb25zID0+IHtcblx0XHRcdHRoaXMubG9nZ2VyLmxvZyhgb3B0aW9ucy4ke2tleX0gbXVzdCBiZSB0eXBlIG9mICR7dHlwZX07ICR7a2V5fT0ke29wdGlvbnNba2V5XX0gc2tpcHBlZCB0byBkZWZhdWx0czogJHtrZXl9PSR7Y29uZmlnT3B0aW9uc1trZXldfWApO1xuXHRcdFx0cmV0dXJuIGNvbmZpZ09wdGlvbnNba2V5XTtcblx0XHR9O1xuXG5cdFx0Zm9yIChjb25zdCBrZXkgaW4gY2hlY2tlZE9wdGlvbnMpIHtcblx0XHRcdGlmIChjaGVja2VkT3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cblx0XHRcdFx0Ly8gY29uZGl0aW9uIGNvdWxkIGJlIHNob3J0ZW5lZCBidXQgaXQgZ2V0cyBoYXJkZXIgZm9yIHVuZGVyc3RhbmRpbmdcblx0XHRcdFx0aWYgKG1vY2tlZFR5cGVzW2tleV0gPT09ICdudW1iZXInKSB7XG5cdFx0XHRcdFx0aWYgKHRoaXMuX2lzTnVtZXJpYyhjaGVja2VkT3B0aW9uc1trZXldKSkge1xuXHRcdFx0XHRcdFx0Y2hlY2tlZE9wdGlvbnNba2V5XSA9ICtjaGVja2VkT3B0aW9uc1trZXldO1xuXHRcdFx0XHRcdFx0Y2hlY2tlZE9wdGlvbnNba2V5XSA9IGtleSA9PT0gJ2l0ZW1zJyA/IHRoaXMuX3ZhbGlkYXRlSXRlbXMoY2hlY2tlZE9wdGlvbnNba2V5XSwgY2hlY2tlZE9wdGlvbnMuc2tpcF92YWxpZGF0ZUl0ZW1zKSA6IGNoZWNrZWRPcHRpb25zW2tleV07XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGNoZWNrZWRPcHRpb25zW2tleV0gPSBzZXRSaWdodE9wdGlvbihtb2NrZWRUeXBlc1trZXldLCBrZXkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIGlmIChtb2NrZWRUeXBlc1trZXldID09PSAnYm9vbGVhbicgJiYgdHlwZW9mIGNoZWNrZWRPcHRpb25zW2tleV0gIT09ICdib29sZWFuJykge1xuXHRcdFx0XHRcdGNoZWNrZWRPcHRpb25zW2tleV0gPSBzZXRSaWdodE9wdGlvbihtb2NrZWRUeXBlc1trZXldLCBrZXkpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKG1vY2tlZFR5cGVzW2tleV0gPT09ICdudW1iZXJ8Ym9vbGVhbicgJiYgIXRoaXMuX2lzTnVtYmVyT3JCb29sZWFuKGNoZWNrZWRPcHRpb25zW2tleV0pKSB7XG5cdFx0XHRcdFx0Y2hlY2tlZE9wdGlvbnNba2V5XSA9IHNldFJpZ2h0T3B0aW9uKG1vY2tlZFR5cGVzW2tleV0sIGtleSk7XG5cdFx0XHRcdH0gZWxzZSBpZiAobW9ja2VkVHlwZXNba2V5XSA9PT0gJ251bWJlcnxzdHJpbmcnICYmICF0aGlzLl9pc051bWJlck9yU3RyaW5nKGNoZWNrZWRPcHRpb25zW2tleV0pKSB7XG5cdFx0XHRcdFx0Y2hlY2tlZE9wdGlvbnNba2V5XSA9IHNldFJpZ2h0T3B0aW9uKG1vY2tlZFR5cGVzW2tleV0sIGtleSk7XG5cdFx0XHRcdH0gZWxzZSBpZiAobW9ja2VkVHlwZXNba2V5XSA9PT0gJ3N0cmluZ3xib29sZWFuJyAmJiAhdGhpcy5faXNTdHJpbmdPckJvb2xlYW4oY2hlY2tlZE9wdGlvbnNba2V5XSkpIHtcblx0XHRcdFx0XHRjaGVja2VkT3B0aW9uc1trZXldID0gc2V0UmlnaHRPcHRpb24obW9ja2VkVHlwZXNba2V5XSwga2V5KTtcblx0XHRcdFx0fSBlbHNlIGlmIChtb2NrZWRUeXBlc1trZXldID09PSAnc3RyaW5nW10nKSB7XG5cdFx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoY2hlY2tlZE9wdGlvbnNba2V5XSkpIHtcblx0XHRcdFx0XHRcdGxldCBpc1N0cmluZyA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0Y2hlY2tlZE9wdGlvbnNba2V5XS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuXHRcdFx0XHRcdFx0XHRpc1N0cmluZyA9IHR5cGVvZiBlbGVtZW50ID09PSAnc3RyaW5nJyA/IHRydWUgOiBmYWxzZTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0aWYgKCFpc1N0cmluZykgeyBjaGVja2VkT3B0aW9uc1trZXldID0gc2V0UmlnaHRPcHRpb24obW9ja2VkVHlwZXNba2V5XSwga2V5KSB9O1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRjaGVja2VkT3B0aW9uc1trZXldID0gc2V0UmlnaHRPcHRpb24obW9ja2VkVHlwZXNba2V5XSwga2V5KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gY2hlY2tlZE9wdGlvbnM7XG5cdH1cblxuXHQvKipcblx0ICogQ2hlY2tzIHRoZSBvcHRpb24gYGl0ZW1zYCBzZXQgYnkgdXNlciBhbmQgaWYgaXQgYmlnZ2VyIHRoYW4gbnVtYmVyIG9mIHNsaWRlcywgdGhlIGZ1bmN0aW9uIHJldHVybnMgbnVtYmVyIG9mIHNsaWRlc1xuXHQgKiBAcGFyYW0gaXRlbXMgb3B0aW9uIGl0ZW1zIHNldCBieSB1c2VyXG5cdCAqIEBwYXJhbSBza2lwX3ZhbGlkYXRlSXRlbXMgb3B0aW9uIGBza2lwX3ZhbGlkYXRlSXRlbXNgIHNldCBieSB1c2VyXG5cdCAqIEByZXR1cm5zIHJpZ2h0IG51bWJlciBvZiBpdGVtc1xuXHQgKi9cblx0cHJpdmF0ZSBfdmFsaWRhdGVJdGVtcyhpdGVtczogbnVtYmVyLCBza2lwX3ZhbGlkYXRlSXRlbXM6IGJvb2xlYW4pOiBudW1iZXIge1xuXHRcdGxldCByZXN1bHQ6IG51bWJlciA9IGl0ZW1zO1xuXHRcdGlmIChpdGVtcyA+IHRoaXMuX2l0ZW1zLmxlbmd0aCkge1xuXHRcdFx0aWYgKHNraXBfdmFsaWRhdGVJdGVtcykge1xuXHRcdFx0XHR0aGlzLmxvZ2dlci5sb2coJ1RoZSBvcHRpb24gXFwnaXRlbXNcXCcgaW4geW91ciBvcHRpb25zIGlzIGJpZ2dlciB0aGFuIHRoZSBudW1iZXIgb2Ygc2xpZGVzLiBUaGUgbmF2aWdhdGlvbiBnb3QgZGlzYWJsZWQnKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJlc3VsdCA9IHRoaXMuX2l0ZW1zLmxlbmd0aDtcblx0XHRcdFx0dGhpcy5sb2dnZXIubG9nKCdUaGUgb3B0aW9uIFxcJ2l0ZW1zXFwnIGluIHlvdXIgb3B0aW9ucyBpcyBiaWdnZXIgdGhhbiB0aGUgbnVtYmVyIG9mIHNsaWRlcy4gVGhpcyBvcHRpb24gaXMgdXBkYXRlZCB0byB0aGUgY3VycmVudCBudW1iZXIgb2Ygc2xpZGVzIGFuZCB0aGUgbmF2aWdhdGlvbiBnb3QgZGlzYWJsZWQnKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKGl0ZW1zID09PSB0aGlzLl9pdGVtcy5sZW5ndGggJiYgKHRoaXMuc2V0dGluZ3MuZG90cyB8fCB0aGlzLnNldHRpbmdzLm5hdikpIHtcblx0XHRcdFx0dGhpcy5sb2dnZXIubG9nKCdPcHRpb24gXFwnaXRlbXNcXCcgaW4geW91ciBvcHRpb25zIGlzIGVxdWFsIHRvIHRoZSBudW1iZXIgb2Ygc2xpZGVzLiBTbyB0aGUgbmF2aWdhdGlvbiBnb3QgZGlzYWJsZWQnKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgY3VycmVudCB3aWR0aCBvZiBjYXJvdXNlbFxuXHQgKiBAcGFyYW0gd2lkdGggd2lkdGggb2YgY2Fyb3VzZWwgV2luZG93XG5cdCAqL1xuXHRzZXRDYXJvdXNlbFdpZHRoKHdpZHRoOiBudW1iZXIpIHtcblx0XHR0aGlzLl93aWR0aCA9IHdpZHRoO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldHVwcyB0aGUgY3VycmVudCBzZXR0aW5ncy5cblx0ICogQHRvZG8gUmVtb3ZlIHJlc3BvbnNpdmUgY2xhc3Nlcy4gV2h5IHNob3VsZCBhZGFwdGl2ZSBkZXNpZ25zIGJlIGJyb3VnaHQgaW50byBJRTg/XG5cdCAqIEB0b2RvIFN1cHBvcnQgZm9yIG1lZGlhIHF1ZXJpZXMgYnkgdXNpbmcgYG1hdGNoTWVkaWFgIHdvdWxkIGJlIG5pY2UuXG5cdCAqIEBwYXJhbSBjYXJvdXNlbFdpZHRoIHdpZHRoIG9mIGNhcm91c2VsXG5cdCAqIEBwYXJhbSBzbGlkZXMgYXJyYXkgb2Ygc2xpZGVzXG5cdCAqIEBwYXJhbSBvcHRpb25zIG9wdGlvbnMgc2V0IGJ5IHVzZXJcblx0ICovXG5cdHNldHVwKGNhcm91c2VsV2lkdGg6IG51bWJlciwgc2xpZGVzOiBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlW10sIG9wdGlvbnM6IE93bE9wdGlvbnMpIHtcblx0XHR0aGlzLnNldENhcm91c2VsV2lkdGgoY2Fyb3VzZWxXaWR0aCk7XG5cdFx0dGhpcy5zZXRJdGVtcyhzbGlkZXMpO1xuXHRcdHRoaXMuX2RlZmluZVNsaWRlc0RhdGEoKTtcblx0XHR0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG5cblx0XHR0aGlzLnNldHRpbmdzID0geyAuLi50aGlzLl9vcHRpb25zIH07XG5cblx0XHR0aGlzLnNldE9wdGlvbnNGb3JWaWV3cG9ydCgpO1xuXG5cdFx0dGhpcy5fdHJpZ2dlcignY2hhbmdlJywgeyBwcm9wZXJ0eTogeyBuYW1lOiAnc2V0dGluZ3MnLCB2YWx1ZTogdGhpcy5zZXR0aW5ncyB9IH0pO1xuXHRcdHRoaXMuaW52YWxpZGF0ZSgnc2V0dGluZ3MnKTsgLy8gbXVzdCBiZSBjYWxsIG9mIHRoaXMgZnVuY3Rpb247XG5cdFx0dGhpcy5fdHJpZ2dlcignY2hhbmdlZCcsIHsgcHJvcGVydHk6IHsgbmFtZTogJ3NldHRpbmdzJywgdmFsdWU6IHRoaXMuc2V0dGluZ3MgfSB9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgb3B0aW9ucyBmb3IgY3VycmVudCB2aWV3cG9ydFxuXHQgKi9cblx0c2V0T3B0aW9uc0ZvclZpZXdwb3J0KCkge1xuXHRcdGNvbnN0IHZpZXdwb3J0ID0gdGhpcy5fd2lkdGgsXG5cdFx0XHRvdmVyd3JpdGVzID0gdGhpcy5fb3B0aW9ucy5yZXNwb25zaXZlO1xuXHRcdGxldCBtYXRjaCA9IC0xO1xuXG5cdFx0aWYgKCFPYmplY3Qua2V5cyhvdmVyd3JpdGVzKS5sZW5ndGgpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAoIXZpZXdwb3J0KSB7XG5cdFx0XHR0aGlzLnNldHRpbmdzLml0ZW1zID0gMTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRmb3IgKGNvbnN0IGtleSBpbiBvdmVyd3JpdGVzKSB7XG5cdFx0XHRpZiAob3ZlcndyaXRlcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdGlmICgra2V5IDw9IHZpZXdwb3J0ICYmICtrZXkgPiBtYXRjaCkge1xuXHRcdFx0XHRcdG1hdGNoID0gTnVtYmVyKGtleSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aGlzLnNldHRpbmdzID0geyAuLi50aGlzLl9vcHRpb25zLCAuLi5vdmVyd3JpdGVzW21hdGNoXSwgaXRlbXM6IChvdmVyd3JpdGVzW21hdGNoXSAmJiBvdmVyd3JpdGVzW21hdGNoXS5pdGVtcykgPyB0aGlzLl92YWxpZGF0ZUl0ZW1zKG92ZXJ3cml0ZXNbbWF0Y2hdLml0ZW1zLCB0aGlzLl9vcHRpb25zLnNraXBfdmFsaWRhdGVJdGVtcykgOiB0aGlzLl9vcHRpb25zLml0ZW1zIH07XG5cdFx0Ly8gaWYgKHR5cGVvZiB0aGlzLnNldHRpbmdzLnN0YWdlUGFkZGluZyA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdC8vIFx0dGhpcy5zZXR0aW5ncy5zdGFnZVBhZGRpbmcgPSB0aGlzLnNldHRpbmdzLnN0YWdlUGFkZGluZygpO1xuXHRcdC8vIH1cblx0XHRkZWxldGUgdGhpcy5zZXR0aW5ncy5yZXNwb25zaXZlO1xuXHRcdHRoaXMub3dsRE9NRGF0YS5pc1Jlc3BvbnNpdmUgPSB0cnVlO1xuXHRcdHRoaXMub3dsRE9NRGF0YS5pc01vdXNlRHJhZ2FibGUgPSB0aGlzLnNldHRpbmdzLm1vdXNlRHJhZztcblx0XHR0aGlzLm93bERPTURhdGEuaXNUb3VjaERyYWdhYmxlID0gdGhpcy5zZXR0aW5ncy50b3VjaERyYWc7XG5cblx0XHRjb25zdCBtZXJnZXJzID0gW107XG5cdFx0dGhpcy5faXRlbXMuZm9yRWFjaChpdGVtID0+IHtcblx0XHRcdGNvbnN0IG1lcmdlTjogbnVtYmVyID0gdGhpcy5zZXR0aW5ncy5tZXJnZSA/IGl0ZW0uZGF0YU1lcmdlIDogMTtcblx0XHRcdG1lcmdlcnMucHVzaChtZXJnZU4pO1xuXHRcdH0pO1xuXHRcdHRoaXMuX21lcmdlcnMgPSBtZXJnZXJzO1xuXG5cdFx0dGhpcy5fYnJlYWtwb2ludCA9IG1hdGNoO1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlKCdzZXR0aW5ncycpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemVzIHRoZSBjYXJvdXNlbC5cblx0ICogQHBhcmFtIHNsaWRlcyBhcnJheSBvZiBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlXG5cdCAqL1xuXHRpbml0aWFsaXplKHNsaWRlczogQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZVtdKSB7XG5cdFx0dGhpcy5lbnRlcignaW5pdGlhbGl6aW5nJyk7XG5cdFx0Ly8gdGhpcy50cmlnZ2VyKCdpbml0aWFsaXplJyk7XG5cblx0XHR0aGlzLm93bERPTURhdGEucnRsID0gdGhpcy5zZXR0aW5ncy5ydGw7XG5cblx0XHRpZiAodGhpcy5fbWVyZ2Vycy5sZW5ndGgpIHtcblx0XHRcdHRoaXMuX21lcmdlcnMgPSBbXTtcblx0XHR9XG5cblx0XHRzbGlkZXMuZm9yRWFjaChpdGVtID0+IHtcblx0XHRcdGNvbnN0IG1lcmdlTjogbnVtYmVyID0gdGhpcy5zZXR0aW5ncy5tZXJnZSA/IGl0ZW0uZGF0YU1lcmdlIDogMTtcblx0XHRcdHRoaXMuX21lcmdlcnMucHVzaChtZXJnZU4pO1xuXHRcdH0pO1xuXHRcdHRoaXMuX2Nsb25lcyA9IFtdO1xuXG5cdFx0dGhpcy5yZXNldCh0aGlzLl9pc051bWVyaWModGhpcy5zZXR0aW5ncy5zdGFydFBvc2l0aW9uKSA/ICt0aGlzLnNldHRpbmdzLnN0YXJ0UG9zaXRpb24gOiAwKTtcblxuXHRcdHRoaXMuaW52YWxpZGF0ZSgnaXRlbXMnKTtcblx0XHR0aGlzLnJlZnJlc2goKTtcblxuXHRcdHRoaXMub3dsRE9NRGF0YS5pc0xvYWRlZCA9IHRydWU7XG5cdFx0dGhpcy5vd2xET01EYXRhLmlzTW91c2VEcmFnYWJsZSA9IHRoaXMuc2V0dGluZ3MubW91c2VEcmFnO1xuXHRcdHRoaXMub3dsRE9NRGF0YS5pc1RvdWNoRHJhZ2FibGUgPSB0aGlzLnNldHRpbmdzLnRvdWNoRHJhZztcblxuXHRcdHRoaXMuc2VuZENoYW5nZXMoKTtcblxuXHRcdHRoaXMubGVhdmUoJ2luaXRpYWxpemluZycpO1xuXHRcdHRoaXMuX3RyaWdnZXIoJ2luaXRpYWxpemVkJyk7XG5cdH07XG5cblx0LyoqXG5cdCAqIFNlbmRzIGFsbCBkYXRhIG5lZWRlZCBmb3IgVmlld1xuXHQgKi9cblx0c2VuZENoYW5nZXMoKSB7XG5cdFx0dGhpcy5fdmlld1NldHRpbmdzU2hpcHBlciQubmV4dCh7XG5cdFx0XHRvd2xET01EYXRhOiB0aGlzLm93bERPTURhdGEsXG5cdFx0XHRzdGFnZURhdGE6IHRoaXMuc3RhZ2VEYXRhLFxuXHRcdFx0c2xpZGVzRGF0YTogdGhpcy5zbGlkZXNEYXRhLFxuXHRcdFx0bmF2RGF0YTogdGhpcy5uYXZEYXRhLFxuXHRcdFx0ZG90c0RhdGE6IHRoaXMuZG90c0RhdGFcblx0XHR9KTtcblx0fVxuXG5cblx0LyoqXG5cdCAqIFVwZGF0ZXMgb3B0aW9uIGxvZ2ljIGlmIG5lY2Vzc2VyeVxuXHQgKi9cblx0cHJpdmF0ZSBfb3B0aW9uc0xvZ2ljKCkge1xuXHRcdGlmICh0aGlzLnNldHRpbmdzLmF1dG9XaWR0aCkge1xuXHRcdFx0dGhpcy5zZXR0aW5ncy5zdGFnZVBhZGRpbmcgPSAwO1xuXHRcdFx0dGhpcy5zZXR0aW5ncy5tZXJnZSA9IGZhbHNlO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBVcGRhdGVzIHRoZSB2aWV3XG5cdCAqL1xuXHR1cGRhdGUoKSB7XG5cdFx0bGV0IGkgPSAwO1xuXHRcdGNvbnN0IG4gPSB0aGlzLl9waXBlLmxlbmd0aCxcblx0XHRcdGZpbHRlciA9IGl0ZW0gPT4gdGhpcy5faW52YWxpZGF0ZWRbaXRlbV0sXG5cdFx0XHRjYWNoZSA9IHt9O1xuXG5cdFx0d2hpbGUgKGkgPCBuKSB7XG5cdFx0XHRjb25zdCBmaWx0ZXJlZFBpcGUgPSB0aGlzLl9waXBlW2ldLmZpbHRlci5maWx0ZXIoZmlsdGVyKTtcblx0XHRcdGlmICh0aGlzLl9pbnZhbGlkYXRlZC5hbGwgfHwgZmlsdGVyZWRQaXBlLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0dGhpcy5fcGlwZVtpXS5ydW4oY2FjaGUpO1xuXHRcdFx0fVxuXHRcdFx0aSsrO1xuXHRcdH1cblx0XHR0aGlzLnNsaWRlc0RhdGEuZm9yRWFjaChzbGlkZSA9PiBzbGlkZS5jbGFzc2VzID0gdGhpcy5zZXRDdXJTbGlkZUNsYXNzZXMoc2xpZGUpKTtcblx0XHR0aGlzLnNlbmRDaGFuZ2VzKCk7XG5cblx0XHR0aGlzLl9pbnZhbGlkYXRlZCA9IHt9O1xuXG5cdFx0aWYgKCF0aGlzLmlzKCd2YWxpZCcpKSB7XG5cdFx0XHR0aGlzLmVudGVyKCd2YWxpZCcpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBHZXRzIHRoZSB3aWR0aCBvZiB0aGUgdmlldy5cblx0ICogQHBhcmFtIFtkaW1lbnNpb249V2lkdGguRGVmYXVsdF0gVGhlIGRpbWVuc2lvbiB0byByZXR1cm5cblx0ICogQHJldHVybnMgVGhlIHdpZHRoIG9mIHRoZSB2aWV3IGluIHBpeGVsLlxuXHQgKi9cblx0d2lkdGgoZGltZW5zaW9uPzogV2lkdGgpOiBudW1iZXIge1xuXHRcdGRpbWVuc2lvbiA9IGRpbWVuc2lvbiB8fCBXaWR0aC5EZWZhdWx0O1xuXHRcdHN3aXRjaCAoZGltZW5zaW9uKSB7XG5cdFx0XHRjYXNlIFdpZHRoLklubmVyOlxuXHRcdFx0Y2FzZSBXaWR0aC5PdXRlcjpcblx0XHRcdFx0cmV0dXJuIHRoaXMuX3dpZHRoO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0cmV0dXJuIHRoaXMuX3dpZHRoIC0gdGhpcy5zZXR0aW5ncy5zdGFnZVBhZGRpbmcgKiAyICsgdGhpcy5zZXR0aW5ncy5tYXJnaW47XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFJlZnJlc2hlcyB0aGUgY2Fyb3VzZWwgcHJpbWFyaWx5IGZvciBhZGFwdGl2ZSBwdXJwb3Nlcy5cblx0ICovXG5cdHJlZnJlc2goKSB7XG5cdFx0dGhpcy5lbnRlcigncmVmcmVzaGluZycpO1xuXHRcdHRoaXMuX3RyaWdnZXIoJ3JlZnJlc2gnKTtcblx0XHR0aGlzLl9kZWZpbmVTbGlkZXNEYXRhKCk7XG5cdFx0dGhpcy5zZXRPcHRpb25zRm9yVmlld3BvcnQoKTtcblxuXHRcdHRoaXMuX29wdGlvbnNMb2dpYygpO1xuXG5cdFx0Ly8gdGhpcy4kZWxlbWVudC5hZGRDbGFzcyh0aGlzLm9wdGlvbnMucmVmcmVzaENsYXNzKTtcblxuXHRcdHRoaXMudXBkYXRlKCk7XG5cblx0XHQvLyB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKHRoaXMub3B0aW9ucy5yZWZyZXNoQ2xhc3MpO1xuXG5cdFx0dGhpcy5sZWF2ZSgncmVmcmVzaGluZycpO1xuXHRcdHRoaXMuX3RyaWdnZXIoJ3JlZnJlc2hlZCcpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENoZWNrcyB3aW5kb3cgYHJlc2l6ZWAgZXZlbnQuXG5cdCAqIEBwYXJhbSBjdXJXaWR0aCB3aWR0aCBvZiAub3dsLWNhcm91c2VsXG5cdCAqL1xuXHRvblJlc2l6ZShjdXJXaWR0aDogbnVtYmVyKSB7XG5cdFx0aWYgKCF0aGlzLl9pdGVtcy5sZW5ndGgpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHR0aGlzLnNldENhcm91c2VsV2lkdGgoY3VyV2lkdGgpO1xuXG5cdFx0dGhpcy5lbnRlcigncmVzaXppbmcnKTtcblxuXHRcdC8vIGlmICh0aGlzLnRyaWdnZXIoJ3Jlc2l6ZScpLmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG5cdFx0Ly8gXHR0aGlzLmxlYXZlKCdyZXNpemluZycpO1xuXHRcdC8vIFx0cmV0dXJuIGZhbHNlO1xuXHRcdC8vIH1cblx0XHR0aGlzLl90cmlnZ2VyKCdyZXNpemUnKTtcblx0XHR0aGlzLmludmFsaWRhdGUoJ3dpZHRoJyk7XG5cblx0XHR0aGlzLnJlZnJlc2goKTtcblxuXHRcdHRoaXMubGVhdmUoJ3Jlc2l6aW5nJyk7XG5cdFx0dGhpcy5fdHJpZ2dlcigncmVzaXplZCcpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFByZXBhcmVzIGRhdGEgZm9yIGRyYWdnaW5nIGNhcm91c2VsLiBJdCBzdGFydHMgYWZ0ZXIgZmlyaW5nIGB0b3VjaHN0YXJ0YCBhbmQgYG1vdXNlZG93bmAgZXZlbnRzLlxuXHQgKiBAdG9kbyBIb3Jpem9udGFsIHN3aXBlIHRocmVzaG9sZCBhcyBvcHRpb25cblx0ICogQHRvZG8gIzI2MVxuXHQgKiBAcGFyYW0gZXZlbnQgLSBUaGUgZXZlbnQgYXJndW1lbnRzLlxuXHQgKiBAcmV0dXJucyBzdGFnZSAtIG9iamVjdCB3aXRoICd4JyBhbmQgJ3knIGNvb3JkaW5hdGVzIG9mIC5vd2wtc3RhZ2Vcblx0ICovXG5cdHByZXBhcmVEcmFnZ2luZyhldmVudDogYW55KTogQ29vcmRzIHtcblx0XHRsZXQgc3RhZ2U6IENvb3JkcyA9IG51bGwsXG5cdFx0XHR0cmFuc2Zvcm1BcnI6IHN0cmluZ1tdO1xuXG5cdFx0Ly8gY291bGQgYmUgNSBjb21tZW50ZWQgbGluZXMgYmVsb3c7IEhvd2V2ZXIgdGhlcmUncyBzdGFnZSB0cmFuc2Zvcm0gaW4gc3RhZ2VEYXRhIGFuZCBpbiB1cGRhdGVzIGFmdGVyIGVhY2ggbW92ZSBvZiBzdGFnZVxuXHRcdC8vIHN0YWdlID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpLnRyYW5zZm9ybS5yZXBsYWNlKC8uKlxcKHxcXCl8IC9nLCAnJykuc3BsaXQoJywnKTtcblx0XHQvLyBzdGFnZSA9IHtcblx0XHQvLyAgIHg6IHN0YWdlW3N0YWdlLmxlbmd0aCA9PT0gMTYgPyAxMiA6IDRdLFxuXHRcdC8vICAgeTogc3RhZ2Vbc3RhZ2UubGVuZ3RoID09PSAxNiA/IDEzIDogNV1cblx0XHQvLyB9O1xuXG5cdFx0dHJhbnNmb3JtQXJyID0gdGhpcy5zdGFnZURhdGEudHJhbnNmb3JtLnJlcGxhY2UoLy4qXFwofFxcKXwgfFteLC1cXGRdXFx3fFxcKS9nLCAnJykuc3BsaXQoJywnKTtcblx0XHRzdGFnZSA9IHtcblx0XHRcdHg6ICt0cmFuc2Zvcm1BcnJbMF0sXG5cdFx0XHR5OiArdHJhbnNmb3JtQXJyWzFdXG5cdFx0fTtcblxuXHRcdGlmICh0aGlzLmlzKCdhbmltYXRpbmcnKSkge1xuXHRcdFx0dGhpcy5pbnZhbGlkYXRlKCdwb3NpdGlvbicpO1xuXHRcdH1cblxuXHRcdGlmIChldmVudC50eXBlID09PSAnbW91c2Vkb3duJykge1xuXHRcdFx0dGhpcy5vd2xET01EYXRhLmlzR3JhYiA9IHRydWU7XG5cdFx0fVxuXG5cdFx0dGhpcy5zcGVlZCgwKTtcblx0XHRyZXR1cm4gc3RhZ2U7XG5cdH1cblxuXHQvKipcblx0ICogRW50ZXJzIGludG8gYSAnZHJhZ2dpbmcnIHN0YXRlXG5cdCAqL1xuXHRlbnRlckRyYWdnaW5nKCkge1xuXHRcdHRoaXMuZW50ZXIoJ2RyYWdnaW5nJyk7XG5cdFx0dGhpcy5fdHJpZ2dlcignZHJhZycpO1xuXHR9XG5cblx0LyoqXG5cdCAqIERlZmluZXMgbmV3IGNvb3JkcyBmb3IgLm93bC1zdGFnZSB3aGlsZSBkcmFnZ2luZyBpdFxuXHQgKiBAdG9kbyAjMjYxXG5cdCAqIEBwYXJhbSBldmVudCB0aGUgZXZlbnQgYXJndW1lbnRzLlxuXHQgKiBAcGFyYW0gZHJhZ0RhdGEgaW5pdGlhbCBkYXRhIGdvdCBhZnRlciBzdGFydGluZyBkcmFnZ2luZ1xuXHQgKiBAcmV0dXJucyBjb29yZHMgb3IgZmFsc2Vcblx0ICovXG5cdGRlZmluZU5ld0Nvb3Jkc0RyYWcoZXZlbnQ6IGFueSwgZHJhZ0RhdGE6IGFueSk6IGJvb2xlYW4gfCBDb29yZHMge1xuXHRcdGxldCBtaW5pbXVtID0gbnVsbCxcblx0XHRcdG1heGltdW0gPSBudWxsLFxuXHRcdFx0cHVsbCA9IG51bGw7XG5cdFx0Y29uc3QgZGVsdGEgPSB0aGlzLmRpZmZlcmVuY2UoZHJhZ0RhdGEucG9pbnRlciwgdGhpcy5wb2ludGVyKGV2ZW50KSksXG5cdFx0XHRzdGFnZSA9IHRoaXMuZGlmZmVyZW5jZShkcmFnRGF0YS5zdGFnZS5zdGFydCwgZGVsdGEpO1xuXG5cdFx0aWYgKCF0aGlzLmlzKCdkcmFnZ2luZycpKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3MubG9vcCkge1xuXHRcdFx0bWluaW11bSA9IHRoaXMuY29vcmRpbmF0ZXModGhpcy5taW5pbXVtKCkpO1xuXHRcdFx0bWF4aW11bSA9ICt0aGlzLmNvb3JkaW5hdGVzKHRoaXMubWF4aW11bSgpICsgMSkgLSBtaW5pbXVtO1xuXHRcdFx0c3RhZ2UueCA9ICgoKHN0YWdlLnggLSBtaW5pbXVtKSAlIG1heGltdW0gKyBtYXhpbXVtKSAlIG1heGltdW0pICsgbWluaW11bTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bWluaW11bSA9IHRoaXMuc2V0dGluZ3MucnRsID8gdGhpcy5jb29yZGluYXRlcyh0aGlzLm1heGltdW0oKSkgOiB0aGlzLmNvb3JkaW5hdGVzKHRoaXMubWluaW11bSgpKTtcblx0XHRcdG1heGltdW0gPSB0aGlzLnNldHRpbmdzLnJ0bCA/IHRoaXMuY29vcmRpbmF0ZXModGhpcy5taW5pbXVtKCkpIDogdGhpcy5jb29yZGluYXRlcyh0aGlzLm1heGltdW0oKSk7XG5cdFx0XHRwdWxsID0gdGhpcy5zZXR0aW5ncy5wdWxsRHJhZyA/IC0xICogZGVsdGEueCAvIDUgOiAwO1xuXHRcdFx0c3RhZ2UueCA9IE1hdGgubWF4KE1hdGgubWluKHN0YWdlLngsIG1pbmltdW0gKyBwdWxsKSwgbWF4aW11bSArIHB1bGwpO1xuXHRcdH1cblxuXHRcdHJldHVybiBzdGFnZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBGaW5pc2hlcyBkcmFnZ2luZyBvZiBjYXJvdXNlbCB3aGVuIGB0b3VjaGVuZGAgYW5kIGBtb3VzZXVwYCBldmVudHMgZmlyZS5cblx0ICogQHRvZG8gIzI2MVxuXHQgKiBAdG9kbyBUaHJlc2hvbGQgZm9yIGNsaWNrIGV2ZW50XG5cdCAqIEBwYXJhbSBldmVudCB0aGUgZXZlbnQgYXJndW1lbnRzLlxuXHQgKiBAcGFyYW0gZHJhZ09iaiB0aGUgb2JqZWN0IHdpdGggZHJhZ2dpbmcgc2V0dGluZ3MgYW5kIHN0YXRlc1xuXHQgKiBAcGFyYW0gY2xpY2tBdHRhY2hlciBmdW5jdGlvbiB3aGljaCBhdHRhY2hlcyBjbGljayBoYW5kbGVyIHRvIHNsaWRlIG9yIGl0cyBjaGlsZHJlbiBlbGVtZW50cyBpbiBvcmRlciB0byBwcmV2ZW50IGV2ZW50IGJ1Ymxpbmdcblx0ICovXG5cdGZpbmlzaERyYWdnaW5nKGV2ZW50OiBhbnksIGRyYWdPYmo6IGFueSwgY2xpY2tBdHRhY2hlcjogKCkgPT4gdm9pZCkge1xuXHRcdGNvbnN0IGRpcmVjdGlvbnMgPSBbJ3JpZ2h0JywgJ2xlZnQnXSxcblx0XHRcdGRlbHRhID0gdGhpcy5kaWZmZXJlbmNlKGRyYWdPYmoucG9pbnRlciwgdGhpcy5wb2ludGVyKGV2ZW50KSksXG5cdFx0XHRzdGFnZSA9IGRyYWdPYmouc3RhZ2UuY3VycmVudCxcblx0XHRcdGRpcmVjdGlvbiA9IGRpcmVjdGlvbnNbKyh0aGlzLnNldHRpbmdzLnJ0bCA/IGRlbHRhLnggPCArdGhpcy5zZXR0aW5ncy5ydGwgOiBkZWx0YS54ID4gK3RoaXMuc2V0dGluZ3MucnRsKV07XG5cdFx0bGV0IGN1cnJlbnRTbGlkZUk6IG51bWJlciwgY3VycmVudDogbnVtYmVyLCBuZXdDdXJyZW50OiBudW1iZXI7XG5cblx0XHRpZiAoZGVsdGEueCAhPT0gMCAmJiB0aGlzLmlzKCdkcmFnZ2luZycpIHx8ICF0aGlzLmlzKCd2YWxpZCcpKSB7XG5cdFx0XHR0aGlzLnNwZWVkKCt0aGlzLnNldHRpbmdzLmRyYWdFbmRTcGVlZCB8fCB0aGlzLnNldHRpbmdzLnNtYXJ0U3BlZWQpO1xuXHRcdFx0Y3VycmVudFNsaWRlSSA9IHRoaXMuY2xvc2VzdChzdGFnZS54LCBkZWx0YS54ICE9PSAwID8gZGlyZWN0aW9uIDogZHJhZ09iai5kaXJlY3Rpb24pO1xuXHRcdFx0Y3VycmVudCA9IHRoaXMuY3VycmVudCgpO1xuXHRcdFx0bmV3Q3VycmVudCA9IHRoaXMuY3VycmVudChjdXJyZW50U2xpZGVJID09PSAtMSA/IHVuZGVmaW5lZCA6IGN1cnJlbnRTbGlkZUkpO1xuXG5cdFx0XHRpZiAoY3VycmVudCAhPT0gbmV3Q3VycmVudCkge1xuXHRcdFx0XHR0aGlzLmludmFsaWRhdGUoJ3Bvc2l0aW9uJyk7XG5cdFx0XHRcdHRoaXMudXBkYXRlKCk7XG5cdFx0XHR9XG5cblx0XHRcdGRyYWdPYmouZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuXG5cdFx0XHRpZiAoTWF0aC5hYnMoZGVsdGEueCkgPiAzIHx8IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gZHJhZ09iai50aW1lID4gMzAwKSB7XG5cdFx0XHRcdGNsaWNrQXR0YWNoZXIoKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKCF0aGlzLmlzKCdkcmFnZ2luZycpKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHRoaXMubGVhdmUoJ2RyYWdnaW5nJyk7XG5cdFx0dGhpcy5fdHJpZ2dlcignZHJhZ2dlZCcpXG5cdH1cblxuXHQvKipcblx0ICogR2V0cyBhYnNvbHV0ZSBwb3NpdGlvbiBvZiB0aGUgY2xvc2VzdCBpdGVtIGZvciBhIGNvb3JkaW5hdGUuXG5cdCAqIEB0b2RvIFNldHRpbmcgYGZyZWVEcmFnYCBtYWtlcyBgY2xvc2VzdGAgbm90IHJldXNhYmxlLiBTZWUgIzE2NS5cblx0ICogQHBhcmFtIGNvb3JkaW5hdGUgVGhlIGNvb3JkaW5hdGUgaW4gcGl4ZWwuXG5cdCAqIEBwYXJhbSBkaXJlY3Rpb24gVGhlIGRpcmVjdGlvbiB0byBjaGVjayBmb3IgdGhlIGNsb3Nlc3QgaXRlbS4gRXRoZXIgYGxlZnRgIG9yIGByaWdodGAuXG5cdCAqIEByZXR1cm5zIFRoZSBhYnNvbHV0ZSBwb3NpdGlvbiBvZiB0aGUgY2xvc2VzdCBpdGVtLlxuXHQgKi9cblx0Y2xvc2VzdChjb29yZGluYXRlOiBudW1iZXIsIGRpcmVjdGlvbjogc3RyaW5nKTogbnVtYmVyIHtcblx0XHRjb25zdCBwdWxsID0gMzAsXG5cdFx0XHR3aWR0aCA9IHRoaXMud2lkdGgoKTtcblx0XHRsZXQgY29vcmRpbmF0ZXM6IG51bWJlcltdID0gdGhpcy5jb29yZGluYXRlcygpIGFzIG51bWJlcltdLFxuXHRcdFx0cG9zaXRpb24gPSAtMTtcblxuXHRcdGlmICh0aGlzLnNldHRpbmdzLmNlbnRlcikge1xuXHRcdFx0Y29vcmRpbmF0ZXMgPSBjb29yZGluYXRlcy5tYXAoaXRlbSA9PiB7XG5cdFx0XHRcdGlmIChpdGVtID09PSAwKSB7XG5cdFx0XHRcdFx0aXRlbSArPSAwLjAwMDAwMTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gaXRlbTtcblx0XHRcdH0pXG5cdFx0fVxuXG5cdFx0Ly8gb3B0aW9uICdmcmVlRHJhZycgZG9lc24ndCBoYXZlIHJlYWxpemF0aW9uIGFuZCB1c2luZyBpdCBoZXJlIGNyZWF0ZXMgcHJvYmxlbTpcblx0XHQvLyB2YXJpYWJsZSAncG9zaXRpb24nIHN0YXlzIHVuY2hhbmdlZCAoaXQgZXF1YWxzIC0xIGF0IHRoZSBiZWdnaW5nKSBhbmQgdGh1cyBtZXRob2QgcmV0dXJucyAtMVxuXHRcdC8vIFJldHVybmluZyB2YWx1ZSBpcyBjb25zdW1lZCBieSBtZXRob2QgY3VycmVudCgpLCB3aGljaCB0YWtpbmcgLTEgYXMgYXJndW1lbnQgY2FsY3VsYXRlcyB0aGUgaW5kZXggb2YgbmV3IGN1cnJlbnQgc2xpZGVcblx0XHQvLyBJbiBjYXNlIG9mIGhhdmluZyA1IHNsaWRlcyBhbnMgJ2xvb3A9ZmFsc2U7IGNhbGxpbmcgJ2N1cnJlbnQoLTEpJyBzZXRzIHByb3BzICdfY3VycmVudCcgYXMgNC4gSnVzdCBsYXN0IHNsaWRlIHJlbWFpbnMgdmlzaWJsZSBpbnN0ZWFkIG9mIDMgbGFzdCBzbGlkZXMuXG5cblx0XHQvLyBpZiAoIXRoaXMuc2V0dGluZ3MuZnJlZURyYWcpIHtcblx0XHQvLyBjaGVjayBjbG9zZXN0IGl0ZW1cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGNvb3JkaW5hdGVzLmxlbmd0aDsgaSsrKSB7XG5cblx0XHRcdGlmIChkaXJlY3Rpb24gPT09ICdsZWZ0JyAmJiBjb29yZGluYXRlID4gY29vcmRpbmF0ZXNbaV0gLSBwdWxsICYmIGNvb3JkaW5hdGUgPCBjb29yZGluYXRlc1tpXSArIHB1bGwpIHtcblx0XHRcdFx0cG9zaXRpb24gPSBpO1xuXHRcdFx0XHQvLyBvbiBhIHJpZ2h0IHB1bGwsIGNoZWNrIG9uIHByZXZpb3VzIGluZGV4XG5cdFx0XHRcdC8vIHRvIGRvIHNvLCBzdWJ0cmFjdCB3aWR0aCBmcm9tIHZhbHVlIGFuZCBzZXQgcG9zaXRpb24gPSBpbmRleCArIDFcblx0XHRcdH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSAncmlnaHQnICYmIGNvb3JkaW5hdGUgPiBjb29yZGluYXRlc1tpXSAtIHdpZHRoIC0gcHVsbCAmJiBjb29yZGluYXRlIDwgY29vcmRpbmF0ZXNbaV0gLSB3aWR0aCArIHB1bGwpIHtcblx0XHRcdFx0cG9zaXRpb24gPSBpICsgMTtcblx0XHRcdH0gZWxzZSBpZiAodGhpcy5fb3AoY29vcmRpbmF0ZSwgJzwnLCBjb29yZGluYXRlc1tpXSlcblx0XHRcdFx0JiYgdGhpcy5fb3AoY29vcmRpbmF0ZSwgJz4nLCBjb29yZGluYXRlc1tpICsgMV0gfHwgY29vcmRpbmF0ZXNbaV0gLSB3aWR0aCkpIHtcblx0XHRcdFx0cG9zaXRpb24gPSBkaXJlY3Rpb24gPT09ICdsZWZ0JyA/IGkgKyAxIDogaTtcblx0XHRcdH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBudWxsICYmIGNvb3JkaW5hdGUgPiBjb29yZGluYXRlc1tpXSAtIHB1bGwgJiYgY29vcmRpbmF0ZSA8IGNvb3JkaW5hdGVzW2ldICsgcHVsbCkge1xuXHRcdFx0XHRwb3NpdGlvbiA9IGk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChwb3NpdGlvbiAhPT0gLTEpIHsgYnJlYWsgfTtcblx0XHR9XG5cdFx0Ly8gfVxuXG5cdFx0aWYgKCF0aGlzLnNldHRpbmdzLmxvb3ApIHtcblx0XHRcdC8vIG5vbiBsb29wIGJvdW5kcmllc1xuXHRcdFx0aWYgKHRoaXMuX29wKGNvb3JkaW5hdGUsICc+JywgY29vcmRpbmF0ZXNbdGhpcy5taW5pbXVtKCldKSkge1xuXHRcdFx0XHRwb3NpdGlvbiA9IGNvb3JkaW5hdGUgPSB0aGlzLm1pbmltdW0oKTtcblx0XHRcdH0gZWxzZSBpZiAodGhpcy5fb3AoY29vcmRpbmF0ZSwgJzwnLCBjb29yZGluYXRlc1t0aGlzLm1heGltdW0oKV0pKSB7XG5cdFx0XHRcdHBvc2l0aW9uID0gY29vcmRpbmF0ZSA9IHRoaXMubWF4aW11bSgpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBwb3NpdGlvbjtcblx0fVxuXG5cdC8qKlxuXHQgKiBBbmltYXRlcyB0aGUgc3RhZ2UuXG5cdCAqIEB0b2RvICMyNzBcblx0ICogQHBhcmFtIGNvb3JkaW5hdGUgVGhlIGNvb3JkaW5hdGUgaW4gcGl4ZWxzLlxuXHQgKi9cblx0YW5pbWF0ZShjb29yZGluYXRlOiBudW1iZXIgfCBudW1iZXJbXSkge1xuXHRcdGNvbnN0IGFuaW1hdGUgPSB0aGlzLnNwZWVkKCkgPiAwO1xuXG5cdFx0aWYgKHRoaXMuaXMoJ2FuaW1hdGluZycpKSB7XG5cdFx0XHR0aGlzLm9uVHJhbnNpdGlvbkVuZCgpO1xuXHRcdH1cblxuXHRcdGlmIChhbmltYXRlKSB7XG5cdFx0XHR0aGlzLmVudGVyKCdhbmltYXRpbmcnKTtcblx0XHRcdHRoaXMuX3RyaWdnZXIoJ3RyYW5zbGF0ZScpO1xuXHRcdH1cblxuXHRcdHRoaXMuc3RhZ2VEYXRhLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgnICsgY29vcmRpbmF0ZSArICdweCwwcHgsMHB4KSc7XG5cdFx0dGhpcy5zdGFnZURhdGEudHJhbnNpdGlvbiA9ICh0aGlzLnNwZWVkKCkgLyAxMDAwKSArICdzJyArIChcblx0XHRcdHRoaXMuc2V0dGluZ3Muc2xpZGVUcmFuc2l0aW9uID8gJyAnICsgdGhpcy5zZXR0aW5ncy5zbGlkZVRyYW5zaXRpb24gOiAnJ1xuXHRcdCk7XG5cblx0XHQvLyBhbHNvIHRoZXJlIHdhcyB0cmFuc2l0aW9uIGJ5IG1lYW5zIG9mIEpRdWVyeS5hbmltYXRlIG9yIGNzcy1jaGFuZ2luZyBwcm9wZXJ0eSBsZWZ0XG5cdH1cblxuXHQvKipcblx0ICogQ2hlY2tzIHdoZXRoZXIgdGhlIGNhcm91c2VsIGlzIGluIGEgc3BlY2lmaWMgc3RhdGUgb3Igbm90LlxuXHQgKiBAcGFyYW0gc3RhdGUgVGhlIHN0YXRlIHRvIGNoZWNrLlxuXHQgKiBAcmV0dXJucyBUaGUgZmxhZyB3aGljaCBpbmRpY2F0ZXMgaWYgdGhlIGNhcm91c2VsIGlzIGJ1c3kuXG5cdCAqL1xuXHRpcyhzdGF0ZTogc3RyaW5nKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuIHRoaXMuX3N0YXRlcy5jdXJyZW50W3N0YXRlXSAmJiB0aGlzLl9zdGF0ZXMuY3VycmVudFtzdGF0ZV0gPiAwO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBTZXRzIHRoZSBhYnNvbHV0ZSBwb3NpdGlvbiBvZiB0aGUgY3VycmVudCBpdGVtLlxuXHQgKiBAcGFyYW0gcG9zaXRpb24gVGhlIG5ldyBhYnNvbHV0ZSBwb3NpdGlvbiBvciBub3RoaW5nIHRvIGxlYXZlIGl0IHVuY2hhbmdlZC5cblx0ICogQHJldHVybnMgVGhlIGFic29sdXRlIHBvc2l0aW9uIG9mIHRoZSBjdXJyZW50IGl0ZW0uXG5cdCAqL1xuXHRjdXJyZW50KHBvc2l0aW9uPzogbnVtYmVyKTogbnVtYmVyIHtcblx0XHRpZiAocG9zaXRpb24gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuX2N1cnJlbnQ7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX2l0ZW1zLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0XHR9XG5cblx0XHRwb3NpdGlvbiA9IHRoaXMubm9ybWFsaXplKHBvc2l0aW9uKTtcblxuXHRcdGlmICh0aGlzLl9jdXJyZW50ICE9PSBwb3NpdGlvbikge1xuXHRcdFx0Y29uc3QgZXZlbnQgPSB0aGlzLl90cmlnZ2VyKCdjaGFuZ2UnLCB7IHByb3BlcnR5OiB7IG5hbWU6ICdwb3NpdGlvbicsIHZhbHVlOiBwb3NpdGlvbiB9IH0pO1xuXG5cdFx0XHQvLyBpZiAoZXZlbnQuZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHQvLyBcdHBvc2l0aW9uID0gdGhpcy5ub3JtYWxpemUoZXZlbnQuZGF0YSk7XG5cdFx0XHQvLyB9XG5cblx0XHRcdHRoaXMuX2N1cnJlbnQgPSBwb3NpdGlvbjtcblxuXHRcdFx0dGhpcy5pbnZhbGlkYXRlKCdwb3NpdGlvbicpO1xuXHRcdFx0dGhpcy5fdHJpZ2dlcignY2hhbmdlZCcsIHsgcHJvcGVydHk6IHsgbmFtZTogJ3Bvc2l0aW9uJywgdmFsdWU6IHRoaXMuX2N1cnJlbnQgfSB9KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5fY3VycmVudDtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbnZhbGlkYXRlcyB0aGUgZ2l2ZW4gcGFydCBvZiB0aGUgdXBkYXRlIHJvdXRpbmUuXG5cdCAqIEBwYXJhbSBwYXJ0IFRoZSBwYXJ0IHRvIGludmFsaWRhdGUuXG5cdCAqIEByZXR1cm5zIFRoZSBpbnZhbGlkYXRlZCBwYXJ0cy5cblx0ICovXG5cdGludmFsaWRhdGUocGFydDogc3RyaW5nKTogc3RyaW5nW10ge1xuXHRcdGlmICh0eXBlb2YgcGFydCA9PT0gJ3N0cmluZycpIHtcblx0XHRcdHRoaXMuX2ludmFsaWRhdGVkW3BhcnRdID0gdHJ1ZTtcblx0XHRcdGlmICh0aGlzLmlzKCd2YWxpZCcpKSB7IHRoaXMubGVhdmUoJ3ZhbGlkJyk7IH1cblx0XHR9XG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuX2ludmFsaWRhdGVkKTtcblx0fTtcblxuXHQvKipcblx0ICogUmVzZXRzIHRoZSBhYnNvbHV0ZSBwb3NpdGlvbiBvZiB0aGUgY3VycmVudCBpdGVtLlxuXHQgKiBAcGFyYW0gcG9zaXRpb24gdGhlIGFic29sdXRlIHBvc2l0aW9uIG9mIHRoZSBuZXcgaXRlbS5cblx0ICovXG5cdHJlc2V0KHBvc2l0aW9uOiBudW1iZXIpIHtcblx0XHRwb3NpdGlvbiA9IHRoaXMubm9ybWFsaXplKHBvc2l0aW9uKTtcblxuXHRcdGlmIChwb3NpdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0dGhpcy5fc3BlZWQgPSAwO1xuXHRcdHRoaXMuX2N1cnJlbnQgPSBwb3NpdGlvbjtcblxuXHRcdHRoaXMuX3N1cHByZXNzKFsndHJhbnNsYXRlJywgJ3RyYW5zbGF0ZWQnXSk7XG5cblx0XHR0aGlzLmFuaW1hdGUodGhpcy5jb29yZGluYXRlcyhwb3NpdGlvbikpO1xuXG5cdFx0dGhpcy5fcmVsZWFzZShbJ3RyYW5zbGF0ZScsICd0cmFuc2xhdGVkJ10pO1xuXHR9XG5cblx0LyoqXG5cdCAqIE5vcm1hbGl6ZXMgYW4gYWJzb2x1dGUgb3IgYSByZWxhdGl2ZSBwb3NpdGlvbiBvZiBhbiBpdGVtLlxuXHQgKiBAcGFyYW0gcG9zaXRpb24gVGhlIGFic29sdXRlIG9yIHJlbGF0aXZlIHBvc2l0aW9uIHRvIG5vcm1hbGl6ZS5cblx0ICogQHBhcmFtIHJlbGF0aXZlIFdoZXRoZXIgdGhlIGdpdmVuIHBvc2l0aW9uIGlzIHJlbGF0aXZlIG9yIG5vdC5cblx0ICogQHJldHVybnMgVGhlIG5vcm1hbGl6ZWQgcG9zaXRpb24uXG5cdCAqL1xuXHRub3JtYWxpemUocG9zaXRpb246IG51bWJlciwgcmVsYXRpdmU/OiBib29sZWFuKTogbnVtYmVyIHtcblx0XHRjb25zdCBuID0gdGhpcy5faXRlbXMubGVuZ3RoLFxuXHRcdFx0bSA9IHJlbGF0aXZlID8gMCA6IHRoaXMuX2Nsb25lcy5sZW5ndGg7XG5cblx0XHRpZiAoIXRoaXMuX2lzTnVtZXJpYyhwb3NpdGlvbikgfHwgbiA8IDEpIHtcblx0XHRcdHBvc2l0aW9uID0gdW5kZWZpbmVkO1xuXHRcdH0gZWxzZSBpZiAocG9zaXRpb24gPCAwIHx8IHBvc2l0aW9uID49IG4gKyBtKSB7XG5cdFx0XHRwb3NpdGlvbiA9ICgocG9zaXRpb24gLSBtIC8gMikgJSBuICsgbikgJSBuICsgbSAvIDI7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHBvc2l0aW9uO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGFuIGFic29sdXRlIHBvc2l0aW9uIG9mIGFuIGl0ZW0gaW50byBhIHJlbGF0aXZlIG9uZS5cblx0ICogQHBhcmFtIHBvc2l0aW9uIFRoZSBhYnNvbHV0ZSBwb3NpdGlvbiB0byBjb252ZXJ0LlxuXHQgKiBAcmV0dXJucyBUaGUgY29udmVydGVkIHBvc2l0aW9uLlxuXHQgKi9cblx0cmVsYXRpdmUocG9zaXRpb246IG51bWJlcik6IG51bWJlciB7XG5cdFx0cG9zaXRpb24gLT0gdGhpcy5fY2xvbmVzLmxlbmd0aCAvIDI7XG5cdFx0cmV0dXJuIHRoaXMubm9ybWFsaXplKHBvc2l0aW9uLCB0cnVlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXRzIHRoZSBtYXhpbXVtIHBvc2l0aW9uIGZvciB0aGUgY3VycmVudCBpdGVtLlxuXHQgKiBAcGFyYW0gcmVsYXRpdmUgV2hldGhlciB0byByZXR1cm4gYW4gYWJzb2x1dGUgcG9zaXRpb24gb3IgYSByZWxhdGl2ZSBwb3NpdGlvbi5cblx0ICogQHJldHVybnMgbnVtYmVyIG9mIG1heGltdW0gcG9zaXRpb25cblx0ICovXG5cdG1heGltdW0ocmVsYXRpdmU6IGJvb2xlYW4gPSBmYWxzZSk6IG51bWJlciB7XG5cdFx0Y29uc3Qgc2V0dGluZ3MgPSB0aGlzLnNldHRpbmdzO1xuXHRcdGxldCBtYXhpbXVtID0gdGhpcy5fY29vcmRpbmF0ZXMubGVuZ3RoLFxuXHRcdFx0aXRlcmF0b3IsXG5cdFx0XHRyZWNpcHJvY2FsSXRlbXNXaWR0aCxcblx0XHRcdGVsZW1lbnRXaWR0aDtcblxuXHRcdGlmIChzZXR0aW5ncy5sb29wKSB7XG5cdFx0XHRtYXhpbXVtID0gdGhpcy5fY2xvbmVzLmxlbmd0aCAvIDIgKyB0aGlzLl9pdGVtcy5sZW5ndGggLSAxO1xuXHRcdH0gZWxzZSBpZiAoc2V0dGluZ3MuYXV0b1dpZHRoIHx8IHNldHRpbmdzLm1lcmdlKSB7XG5cdFx0XHRpdGVyYXRvciA9IHRoaXMuX2l0ZW1zLmxlbmd0aDtcblx0XHRcdHJlY2lwcm9jYWxJdGVtc1dpZHRoID0gdGhpcy5zbGlkZXNEYXRhWy0taXRlcmF0b3JdLndpZHRoO1xuXHRcdFx0ZWxlbWVudFdpZHRoID0gdGhpcy5fd2lkdGg7XG5cdFx0XHR3aGlsZSAoaXRlcmF0b3ItLSA+IDApIHtcblx0XHRcdFx0Ly8gaXQgY291bGQgYmUgdXNlIHRoaXMuX2l0ZW1zIGluc3RlYWQgb2YgdGhpcy5zbGlkZXNEYXRhO1xuXHRcdFx0XHRyZWNpcHJvY2FsSXRlbXNXaWR0aCArPSArdGhpcy5zbGlkZXNEYXRhW2l0ZXJhdG9yXS53aWR0aCArIHRoaXMuc2V0dGluZ3MubWFyZ2luO1xuXHRcdFx0XHRpZiAocmVjaXByb2NhbEl0ZW1zV2lkdGggPiBlbGVtZW50V2lkdGgpIHtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0bWF4aW11bSA9IGl0ZXJhdG9yICsgMTtcblx0XHR9IGVsc2UgaWYgKHNldHRpbmdzLmNlbnRlcikge1xuXHRcdFx0bWF4aW11bSA9IHRoaXMuX2l0ZW1zLmxlbmd0aCAtIDE7XG5cdFx0fSBlbHNlIHtcblx0XHRcdG1heGltdW0gPSB0aGlzLl9pdGVtcy5sZW5ndGggLSBzZXR0aW5ncy5pdGVtcztcblx0XHR9XG5cblx0XHRpZiAocmVsYXRpdmUpIHtcblx0XHRcdG1heGltdW0gLT0gdGhpcy5fY2xvbmVzLmxlbmd0aCAvIDI7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIE1hdGgubWF4KG1heGltdW0sIDApO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldHMgdGhlIG1pbmltdW0gcG9zaXRpb24gZm9yIHRoZSBjdXJyZW50IGl0ZW0uXG5cdCAqIEBwYXJhbSByZWxhdGl2ZSBXaGV0aGVyIHRvIHJldHVybiBhbiBhYnNvbHV0ZSBwb3NpdGlvbiBvciBhIHJlbGF0aXZlIHBvc2l0aW9uLlxuXHQgKiBAcmV0dXJucyBudW1iZXIgb2YgbWluaW11bSBwb3NpdGlvblxuXHQgKi9cblx0bWluaW11bShyZWxhdGl2ZTogYm9vbGVhbiA9IGZhbHNlKTogbnVtYmVyIHtcblx0XHRyZXR1cm4gcmVsYXRpdmUgPyAwIDogdGhpcy5fY2xvbmVzLmxlbmd0aCAvIDI7XG5cdH1cblxuXHQvKipcblx0ICogR2V0cyBhbiBpdGVtIGF0IHRoZSBzcGVjaWZpZWQgcmVsYXRpdmUgcG9zaXRpb24uXG5cdCAqIEBwYXJhbSBwb3NpdGlvbiBUaGUgcmVsYXRpdmUgcG9zaXRpb24gb2YgdGhlIGl0ZW0uXG5cdCAqIEByZXR1cm5zIFRoZSBpdGVtIGF0IHRoZSBnaXZlbiBwb3NpdGlvbiBvciBhbGwgaXRlbXMgaWYgbm8gcG9zaXRpb24gd2FzIGdpdmVuLlxuXHQgKi9cblx0aXRlbXMocG9zaXRpb24/OiBudW1iZXIpOiBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlW10ge1xuXHRcdGlmIChwb3NpdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5faXRlbXMuc2xpY2UoKTtcblx0XHR9XG5cblx0XHRwb3NpdGlvbiA9IHRoaXMubm9ybWFsaXplKHBvc2l0aW9uLCB0cnVlKTtcblx0XHRyZXR1cm4gW3RoaXMuX2l0ZW1zW3Bvc2l0aW9uXV07XG5cdH1cblxuXHQvKipcblx0ICogR2V0cyBhbiBpdGVtIGF0IHRoZSBzcGVjaWZpZWQgcmVsYXRpdmUgcG9zaXRpb24uXG5cdCAqIEBwYXJhbSBwb3NpdGlvbiBUaGUgcmVsYXRpdmUgcG9zaXRpb24gb2YgdGhlIGl0ZW0uXG5cdCAqIEByZXR1cm5zIFRoZSBpdGVtIGF0IHRoZSBnaXZlbiBwb3NpdGlvbiBvciBhbGwgaXRlbXMgaWYgbm8gcG9zaXRpb24gd2FzIGdpdmVuLlxuXHQgKi9cblx0bWVyZ2Vycyhwb3NpdGlvbjogbnVtYmVyKTogbnVtYmVyIHwgbnVtYmVyW10ge1xuXHRcdGlmIChwb3NpdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5fbWVyZ2Vycy5zbGljZSgpO1xuXHRcdH1cblxuXHRcdHBvc2l0aW9uID0gdGhpcy5ub3JtYWxpemUocG9zaXRpb24sIHRydWUpO1xuXHRcdHJldHVybiB0aGlzLl9tZXJnZXJzW3Bvc2l0aW9uXTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXRzIHRoZSBhYnNvbHV0ZSBwb3NpdGlvbnMgb2YgY2xvbmVzIGZvciBhbiBpdGVtLlxuXHQgKiBAcGFyYW0gcG9zaXRpb24gVGhlIHJlbGF0aXZlIHBvc2l0aW9uIG9mIHRoZSBpdGVtLlxuXHQgKiBAcmV0dXJucyBUaGUgYWJzb2x1dGUgcG9zaXRpb25zIG9mIGNsb25lcyBmb3IgdGhlIGl0ZW0gb3IgYWxsIGlmIG5vIHBvc2l0aW9uIHdhcyBnaXZlbi5cblx0ICovXG5cdGNsb25lcyhwb3NpdGlvbj86IG51bWJlcik6IG51bWJlcltdIHtcblx0XHRjb25zdCBvZGQgPSB0aGlzLl9jbG9uZXMubGVuZ3RoIC8gMixcblx0XHRcdGV2ZW4gPSBvZGQgKyB0aGlzLl9pdGVtcy5sZW5ndGgsXG5cdFx0XHRtYXAgPSBpbmRleCA9PiBpbmRleCAlIDIgPT09IDAgPyBldmVuICsgaW5kZXggLyAyIDogb2RkIC0gKGluZGV4ICsgMSkgLyAyO1xuXG5cdFx0aWYgKHBvc2l0aW9uID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHJldHVybiB0aGlzLl9jbG9uZXMubWFwKCh2LCBpKSA9PiBtYXAoaSkpO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLl9jbG9uZXMubWFwKCh2LCBpKSA9PiB2ID09PSBwb3NpdGlvbiA/IG1hcChpKSA6IG51bGwpLmZpbHRlcihpdGVtID0+IGl0ZW0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldHMgdGhlIGN1cnJlbnQgYW5pbWF0aW9uIHNwZWVkLlxuXHQgKiBAcGFyYW0gc3BlZWQgVGhlIGFuaW1hdGlvbiBzcGVlZCBpbiBtaWxsaXNlY29uZHMgb3Igbm90aGluZyB0byBsZWF2ZSBpdCB1bmNoYW5nZWQuXG5cdCAqIEByZXR1cm5zIFRoZSBjdXJyZW50IGFuaW1hdGlvbiBzcGVlZCBpbiBtaWxsaXNlY29uZHMuXG5cdCAqL1xuXHRzcGVlZChzcGVlZD86IG51bWJlcik6IG51bWJlciB7XG5cdFx0aWYgKHNwZWVkICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdHRoaXMuX3NwZWVkID0gc3BlZWQ7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMuX3NwZWVkO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldHMgdGhlIGNvb3JkaW5hdGUgb2YgYW4gaXRlbS5cblx0ICogQHRvZG8gVGhlIG5hbWUgb2YgdGhpcyBtZXRob2QgaXMgbWlzc2xlYW5kaW5nLlxuXHQgKiBAcGFyYW0gcG9zaXRpb24gVGhlIGFic29sdXRlIHBvc2l0aW9uIG9mIHRoZSBpdGVtIHdpdGhpbiBgbWluaW11bSgpYCBhbmQgYG1heGltdW0oKWAuXG5cdCAqIEByZXR1cm5zIFRoZSBjb29yZGluYXRlIG9mIHRoZSBpdGVtIGluIHBpeGVsIG9yIGFsbCBjb29yZGluYXRlcy5cblx0ICovXG5cdGNvb3JkaW5hdGVzKHBvc2l0aW9uPzogbnVtYmVyKTogbnVtYmVyIHwgbnVtYmVyW10ge1xuXHRcdGxldCBtdWx0aXBsaWVyID0gMSxcblx0XHRcdG5ld1Bvc2l0aW9uID0gcG9zaXRpb24gLSAxLFxuXHRcdFx0Y29vcmRpbmF0ZSxcblx0XHRcdHJlc3VsdDogbnVtYmVyW107XG5cblx0XHRpZiAocG9zaXRpb24gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cmVzdWx0ID0gdGhpcy5fY29vcmRpbmF0ZXMubWFwKChpdGVtLCBpbmRleCkgPT4ge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5jb29yZGluYXRlcyhpbmRleCkgYXMgbnVtYmVyO1xuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLnNldHRpbmdzLmNlbnRlcikge1xuXHRcdFx0aWYgKHRoaXMuc2V0dGluZ3MucnRsKSB7XG5cdFx0XHRcdG11bHRpcGxpZXIgPSAtMTtcblx0XHRcdFx0bmV3UG9zaXRpb24gPSBwb3NpdGlvbiArIDE7XG5cdFx0XHR9XG5cblx0XHRcdGNvb3JkaW5hdGUgPSB0aGlzLl9jb29yZGluYXRlc1twb3NpdGlvbl07XG5cdFx0XHRjb29yZGluYXRlICs9ICh0aGlzLndpZHRoKCkgLSBjb29yZGluYXRlICsgKHRoaXMuX2Nvb3JkaW5hdGVzW25ld1Bvc2l0aW9uXSB8fCAwKSkgLyAyICogbXVsdGlwbGllcjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29vcmRpbmF0ZSA9IHRoaXMuX2Nvb3JkaW5hdGVzW25ld1Bvc2l0aW9uXSB8fCAwO1xuXHRcdH1cblxuXHRcdGNvb3JkaW5hdGUgPSBNYXRoLmNlaWwoY29vcmRpbmF0ZSk7XG5cblx0XHRyZXR1cm4gY29vcmRpbmF0ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDYWxjdWxhdGVzIHRoZSBzcGVlZCBmb3IgYSB0cmFuc2xhdGlvbi5cblx0ICogQHBhcmFtIGZyb20gVGhlIGFic29sdXRlIHBvc2l0aW9uIG9mIHRoZSBzdGFydCBpdGVtLlxuXHQgKiBAcGFyYW0gdG8gVGhlIGFic29sdXRlIHBvc2l0aW9uIG9mIHRoZSB0YXJnZXQgaXRlbS5cblx0ICogQHBhcmFtIGZhY3RvciBbZmFjdG9yPXVuZGVmaW5lZF0gLSBUaGUgdGltZSBmYWN0b3IgaW4gbWlsbGlzZWNvbmRzLlxuXHQgKiBAcmV0dXJucyBUaGUgdGltZSBpbiBtaWxsaXNlY29uZHMgZm9yIHRoZSB0cmFuc2xhdGlvbi5cblx0ICovXG5cdHByaXZhdGUgX2R1cmF0aW9uKGZyb206IG51bWJlciwgdG86IG51bWJlciwgZmFjdG9yPzogbnVtYmVyIHwgYm9vbGVhbik6IG51bWJlciB7XG5cdFx0aWYgKGZhY3RvciA9PT0gMCkge1xuXHRcdFx0cmV0dXJuIDA7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIE1hdGgubWluKE1hdGgubWF4KE1hdGguYWJzKHRvIC0gZnJvbSksIDEpLCA2KSAqIE1hdGguYWJzKCgrZmFjdG9yIHx8IHRoaXMuc2V0dGluZ3Muc21hcnRTcGVlZCkpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNsaWRlcyB0byB0aGUgc3BlY2lmaWVkIGl0ZW0uXG5cdCAqIEBwYXJhbSBwb3NpdGlvbiBUaGUgcG9zaXRpb24gb2YgdGhlIGl0ZW0uXG5cdCAqIEBwYXJhbSBzcGVlZCBUaGUgdGltZSBpbiBtaWxsaXNlY29uZHMgZm9yIHRoZSB0cmFuc2l0aW9uLlxuXHQgKi9cblx0dG8ocG9zaXRpb246IG51bWJlciwgc3BlZWQ6IG51bWJlciB8IGJvb2xlYW4pIHtcblx0XHRsZXQgY3VycmVudCA9IHRoaXMuY3VycmVudCgpLFxuXHRcdFx0cmV2ZXJ0ID0gbnVsbCxcblx0XHRcdGRpc3RhbmNlID0gcG9zaXRpb24gLSB0aGlzLnJlbGF0aXZlKGN1cnJlbnQpLFxuXHRcdFx0bWF4aW11bSA9IHRoaXMubWF4aW11bSgpLFxuXHRcdFx0ZGVsYXlGb3JMb29wID0gMDtcblx0XHRjb25zdCBkaXJlY3Rpb24gPSArKGRpc3RhbmNlID4gMCkgLSArKGRpc3RhbmNlIDwgMCksXG5cdFx0XHRpdGVtcyA9IHRoaXMuX2l0ZW1zLmxlbmd0aCxcblx0XHRcdG1pbmltdW0gPSB0aGlzLm1pbmltdW0oKTtcblxuXHRcdGlmICh0aGlzLnNldHRpbmdzLmxvb3ApIHtcblx0XHRcdGlmICghdGhpcy5zZXR0aW5ncy5yZXdpbmQgJiYgTWF0aC5hYnMoZGlzdGFuY2UpID4gaXRlbXMgLyAyKSB7XG5cdFx0XHRcdGRpc3RhbmNlICs9IGRpcmVjdGlvbiAqIC0xICogaXRlbXM7XG5cdFx0XHR9XG5cblx0XHRcdHBvc2l0aW9uID0gY3VycmVudCArIGRpc3RhbmNlO1xuXHRcdFx0cmV2ZXJ0ID0gKChwb3NpdGlvbiAtIG1pbmltdW0pICUgaXRlbXMgKyBpdGVtcykgJSBpdGVtcyArIG1pbmltdW07XG5cblx0XHRcdGlmIChyZXZlcnQgIT09IHBvc2l0aW9uICYmIHJldmVydCAtIGRpc3RhbmNlIDw9IG1heGltdW0gJiYgcmV2ZXJ0IC0gZGlzdGFuY2UgPiAwKSB7XG5cdFx0XHRcdGN1cnJlbnQgPSByZXZlcnQgLSBkaXN0YW5jZTtcblx0XHRcdFx0cG9zaXRpb24gPSByZXZlcnQ7XG5cdFx0XHRcdGRlbGF5Rm9yTG9vcCA9IDMwO1xuXHRcdFx0XHR0aGlzLnJlc2V0KGN1cnJlbnQpO1xuXHRcdFx0XHR0aGlzLnNlbmRDaGFuZ2VzKCk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmICh0aGlzLnNldHRpbmdzLnJld2luZCkge1xuXHRcdFx0bWF4aW11bSArPSAxO1xuXHRcdFx0cG9zaXRpb24gPSAocG9zaXRpb24gJSBtYXhpbXVtICsgbWF4aW11bSkgJSBtYXhpbXVtO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRwb3NpdGlvbiA9IE1hdGgubWF4KG1pbmltdW0sIE1hdGgubWluKG1heGltdW0sIHBvc2l0aW9uKSk7XG5cdFx0fVxuXG5cdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHR0aGlzLnNwZWVkKHRoaXMuX2R1cmF0aW9uKGN1cnJlbnQsIHBvc2l0aW9uLCBzcGVlZCkpO1xuXHRcdFx0dGhpcy5jdXJyZW50KHBvc2l0aW9uKTtcblxuXHRcdFx0dGhpcy51cGRhdGUoKTtcblx0XHR9LCBkZWxheUZvckxvb3ApO1xuXG5cdH1cblxuXHQvKipcblx0ICogU2xpZGVzIHRvIHRoZSBuZXh0IGl0ZW0uXG5cdCAqIEBwYXJhbSBzcGVlZCBUaGUgdGltZSBpbiBtaWxsaXNlY29uZHMgZm9yIHRoZSB0cmFuc2l0aW9uLlxuXHQgKi9cblx0bmV4dChzcGVlZDogbnVtYmVyIHwgYm9vbGVhbikge1xuXHRcdHNwZWVkID0gc3BlZWQgfHwgZmFsc2U7XG5cdFx0dGhpcy50byh0aGlzLnJlbGF0aXZlKHRoaXMuY3VycmVudCgpKSArIDEsIHNwZWVkKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTbGlkZXMgdG8gdGhlIHByZXZpb3VzIGl0ZW0uXG5cdCAqIEBwYXJhbSBzcGVlZCBUaGUgdGltZSBpbiBtaWxsaXNlY29uZHMgZm9yIHRoZSB0cmFuc2l0aW9uLlxuXHQgKi9cblx0cHJldihzcGVlZDogbnVtYmVyIHwgYm9vbGVhbikge1xuXHRcdHNwZWVkID0gc3BlZWQgfHwgZmFsc2U7XG5cdFx0dGhpcy50byh0aGlzLnJlbGF0aXZlKHRoaXMuY3VycmVudCgpKSAtIDEsIHNwZWVkKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBIYW5kbGVzIHRoZSBlbmQgb2YgYW4gYW5pbWF0aW9uLlxuXHQgKiBAcGFyYW0gZXZlbnQgLSBUaGUgZXZlbnQgYXJndW1lbnRzLlxuXHQgKi9cblx0b25UcmFuc2l0aW9uRW5kKGV2ZW50PzogYW55KSB7XG5cdFx0Ly8gaWYgY3NzMiBhbmltYXRpb24gdGhlbiBldmVudCBvYmplY3QgaXMgdW5kZWZpbmVkXG5cdFx0aWYgKGV2ZW50ICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdC8vIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0XHQvLyAvLyBDYXRjaCBvbmx5IG93bC1zdGFnZSB0cmFuc2l0aW9uRW5kIGV2ZW50XG5cdFx0XHQvLyBpZiAoKGV2ZW50LnRhcmdldCB8fCBldmVudC5zcmNFbGVtZW50IHx8IGV2ZW50Lm9yaWdpbmFsVGFyZ2V0KSAhPT0gdGhpcy4kc3RhZ2UuZ2V0KDApXHQpIHtcblx0XHRcdC8vIFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0Ly8gfVxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHR0aGlzLmxlYXZlKCdhbmltYXRpbmcnKTtcblx0XHR0aGlzLl90cmlnZ2VyKCd0cmFuc2xhdGVkJyk7XG5cdH1cblxuXHQvKipcblx0ICogR2V0cyB2aWV3cG9ydCB3aWR0aC5cblx0ICogQHJldHVybnMgLSBUaGUgd2lkdGggaW4gcGl4ZWwuXG5cdCAqL1xuXHRwcml2YXRlIF92aWV3cG9ydCgpOiBudW1iZXIge1xuXHRcdGxldCB3aWR0aDtcblx0XHRpZiAodGhpcy5fd2lkdGgpIHtcblx0XHRcdHdpZHRoID0gdGhpcy5fd2lkdGg7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMubG9nZ2VyLmxvZygnQ2FuIG5vdCBkZXRlY3Qgdmlld3BvcnQgd2lkdGguJyk7XG5cdFx0fVxuXHRcdHJldHVybiB3aWR0aDtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXRzIF9pdGVtc1xuXHQgKiBAcGFyYW0gY29udGVudCBUaGUgbGlzdCBvZiBzbGlkZXMgcHV0IGludG8gQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZXMuXG5cdCAqL1xuXHRzZXRJdGVtcyhjb250ZW50OiBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlW10pIHtcblx0XHR0aGlzLl9pdGVtcyA9IGNvbnRlbnQ7XG5cdH1cblxuXHQvKipcblx0ICogU2V0cyBzbGlkZXNEYXRhIHVzaW5nIHRoaXMuX2l0ZW1zXG5cdCAqL1xuXHRwcml2YXRlIF9kZWZpbmVTbGlkZXNEYXRhKCkge1xuXHRcdC8vIE1heWJlIGNyZWF0aW5nIGFuZCB1c2luZyBsb2FkTWFwIHdvdWxkIGJlIGJldHRlciBpbiBMYXp5TG9hZFNlcnZpY2UuXG5cdFx0Ly8gSG92ZXdlciBpbiB0aGF0IGNhc2Ugd2hlbiAncmVzaXplJyBldmVudCBmaXJlcywgcHJvcCAnbG9hZCcgb2YgYWxsIHNsaWRlcyB3aWxsIGdldCAnZmFsc2UnIGFuZCBzdWNoIHN0YXRlIG9mIHByb3Agd2lsbCBiZSBzZWVuIGJ5IFZpZXcgZHVyaW5nIGl0cyB1cGRhdGluZy4gQWNjb3JkaW5nbHkgdGhlIGNvZGUgd2lsbCByZW1vdmUgc2xpZGVzJ3MgY29udGVudCBmcm9tIERPTSBldmVuIGlmIGl0IHdhcyBsb2FkZWQgYmVmb3JlLlxuXHRcdC8vIFRodXMgaXQgd291bGQgYmUgbmVlZGVkIHRvIGFkZCB0aGF0IGNvbnRlbnQgaW50byBET00gYWdhaW4uXG5cdFx0Ly8gSW4gb3JkZXIgdG8gYXZvaWQgYWRkaXRpb25hbCByZW1vdmluZy9hZGRpbmcgbG9hZGVkIHNsaWRlcydzIGNvbnRlbnQgd2UgdXNlIGxvYWRNYXAgaGVyZSBhbmQgc2V0IHJlc3RvcmUgc3RhdGUgb2YgcHJvcCAnbG9hZCcgYmVmb3JlIHRoZSBWaWV3IHdpbGwgZ2V0IGl0LlxuXHRcdGxldCBsb2FkTWFwOiBNYXA8c3RyaW5nLCBib29sZWFuPjtcblxuXHRcdGlmICh0aGlzLnNsaWRlc0RhdGEgJiYgdGhpcy5zbGlkZXNEYXRhLmxlbmd0aCkge1xuXHRcdFx0bG9hZE1hcCA9IG5ldyBNYXAoKTtcblx0XHRcdHRoaXMuc2xpZGVzRGF0YS5mb3JFYWNoKGl0ZW0gPT4ge1xuXHRcdFx0XHRpZiAoaXRlbS5sb2FkKSB7XG5cdFx0XHRcdFx0bG9hZE1hcC5zZXQoaXRlbS5pZCwgaXRlbS5sb2FkKTtcblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHR9XG5cblx0XHR0aGlzLnNsaWRlc0RhdGEgPSB0aGlzLl9pdGVtcy5tYXAoc2xpZGUgPT4ge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0aWQ6IGAke3NsaWRlLmlkfWAsXG5cdFx0XHRcdGlzQWN0aXZlOiBmYWxzZSxcblx0XHRcdFx0dHBsUmVmOiBzbGlkZS50cGxSZWYsXG5cdFx0XHRcdGRhdGFNZXJnZTogc2xpZGUuZGF0YU1lcmdlLFxuXHRcdFx0XHR3aWR0aDogMCxcblx0XHRcdFx0aXNDbG9uZWQ6IGZhbHNlLFxuXHRcdFx0XHRsb2FkOiBsb2FkTWFwID8gbG9hZE1hcC5nZXQoc2xpZGUuaWQpIDogZmFsc2UsXG5cdFx0XHRcdGhhc2hGcmFnbWVudDogc2xpZGUuZGF0YUhhc2hcblx0XHRcdH07XG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogU2V0cyBjdXJyZW50IGNsYXNzZXMgZm9yIHNsaWRlXG5cdCAqIEBwYXJhbSBzbGlkZSBTbGlkZSBvZiBjYXJvdXNlbFxuXHQgKiBAcmV0dXJucyBvYmplY3Qgd2l0aCBuYW1lcyBvZiBjc3MtY2xhc3NlcyB3aGljaCBhcmUga2V5cyBhbmQgdHJ1ZS9mYWxzZSB2YWx1ZXNcblx0ICovXG5cdHNldEN1clNsaWRlQ2xhc3NlcyhzbGlkZTogU2xpZGVNb2RlbCk6IHsgW2tleTogc3RyaW5nXTogYm9vbGVhbiB9IHtcblx0XHQvLyBDU1MgY2xhc3NlczogYWRkZWQvcmVtb3ZlZCBwZXIgY3VycmVudCBzdGF0ZSBvZiBjb21wb25lbnQgcHJvcGVydGllc1xuXHRcdGNvbnN0IGN1cnJlbnRDbGFzc2VzOiB7IFtrZXk6IHN0cmluZ106IGJvb2xlYW4gfSA9IHtcblx0XHRcdCdhY3RpdmUnOiBzbGlkZS5pc0FjdGl2ZSxcblx0XHRcdCdjZW50ZXInOiBzbGlkZS5pc0NlbnRlcmVkLFxuXHRcdFx0J2Nsb25lZCc6IHNsaWRlLmlzQ2xvbmVkLFxuXHRcdFx0J2FuaW1hdGVkJzogc2xpZGUuaXNBbmltYXRlZCxcblx0XHRcdCdvd2wtYW5pbWF0ZWQtaW4nOiBzbGlkZS5pc0RlZkFuaW1hdGVkSW4sXG5cdFx0XHQnb3dsLWFuaW1hdGVkLW91dCc6IHNsaWRlLmlzRGVmQW5pbWF0ZWRPdXRcblx0XHR9O1xuXHRcdGlmICh0aGlzLnNldHRpbmdzLmFuaW1hdGVJbikge1xuXHRcdFx0Y3VycmVudENsYXNzZXNbdGhpcy5zZXR0aW5ncy5hbmltYXRlSW4gYXMgc3RyaW5nXSA9IHNsaWRlLmlzQ3VzdG9tQW5pbWF0ZWRJbjtcblx0XHR9XG5cdFx0aWYgKHRoaXMuc2V0dGluZ3MuYW5pbWF0ZU91dCkge1xuXHRcdFx0Y3VycmVudENsYXNzZXNbdGhpcy5zZXR0aW5ncy5hbmltYXRlT3V0IGFzIHN0cmluZ10gPSBzbGlkZS5pc0N1c3RvbUFuaW1hdGVkT3V0O1xuXHRcdH1cblx0XHRyZXR1cm4gY3VycmVudENsYXNzZXM7XG5cdH1cblxuXHQvKipcblx0ICogT3BlcmF0b3JzIHRvIGNhbGN1bGF0ZSByaWdodC10by1sZWZ0IGFuZCBsZWZ0LXRvLXJpZ2h0LlxuXHQgKiBAcGFyYW0gYSAtIFRoZSBsZWZ0IHNpZGUgb3BlcmFuZC5cblx0ICogQHBhcmFtIG8gLSBUaGUgb3BlcmF0b3IuXG5cdCAqIEBwYXJhbSBiIC0gVGhlIHJpZ2h0IHNpZGUgb3BlcmFuZC5cblx0ICogQHJldHVybnMgdHJ1ZS9mYWxzZSBtZWFuaW5nIHJpZ2h0LXRvLWxlZnQgb3IgbGVmdC10by1yaWdodFxuXHQgKi9cblx0cHJpdmF0ZSBfb3AoYTogbnVtYmVyLCBvOiBzdHJpbmcsIGI6IG51bWJlcik6IGJvb2xlYW4ge1xuXHRcdGNvbnN0IHJ0bCA9IHRoaXMuc2V0dGluZ3MucnRsO1xuXHRcdHN3aXRjaCAobykge1xuXHRcdFx0Y2FzZSAnPCc6XG5cdFx0XHRcdHJldHVybiBydGwgPyBhID4gYiA6IGEgPCBiO1xuXHRcdFx0Y2FzZSAnPic6XG5cdFx0XHRcdHJldHVybiBydGwgPyBhIDwgYiA6IGEgPiBiO1xuXHRcdFx0Y2FzZSAnPj0nOlxuXHRcdFx0XHRyZXR1cm4gcnRsID8gYSA8PSBiIDogYSA+PSBiO1xuXHRcdFx0Y2FzZSAnPD0nOlxuXHRcdFx0XHRyZXR1cm4gcnRsID8gYSA+PSBiIDogYSA8PSBiO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFRyaWdnZXJzIGEgcHVibGljIGV2ZW50LlxuXHQgKiBAdG9kbyBSZW1vdmUgYHN0YXR1c2AsIGByZWxhdGVkVGFyZ2V0YCBzaG91bGQgYmUgdXNlZCBpbnN0ZWFkLlxuXHQgKiBAcGFyYW0gbmFtZSBUaGUgZXZlbnQgbmFtZS5cblx0ICogQHBhcmFtIGRhdGEgVGhlIGV2ZW50IGRhdGEuXG5cdCAqIEBwYXJhbSBuYW1lc3BhY2UgVGhlIGV2ZW50IG5hbWVzcGFjZS5cblx0ICogQHBhcmFtIHN0YXRlIFRoZSBzdGF0ZSB3aGljaCBpcyBhc3NvY2lhdGVkIHdpdGggdGhlIGV2ZW50LlxuXHQgKiBAcGFyYW0gZW50ZXIgSW5kaWNhdGVzIGlmIHRoZSBjYWxsIGVudGVycyB0aGUgc3BlY2lmaWVkIHN0YXRlIG9yIG5vdC5cblx0ICovXG5cdHByaXZhdGUgX3RyaWdnZXIobmFtZTogc3RyaW5nLCBkYXRhPzogYW55LCBuYW1lc3BhY2U/OiBzdHJpbmcsIHN0YXRlPzogc3RyaW5nLCBlbnRlcj86IGJvb2xlYW4pIHtcblx0XHRzd2l0Y2ggKG5hbWUpIHtcblx0XHRcdGNhc2UgJ2luaXRpYWxpemVkJzpcblx0XHRcdFx0dGhpcy5faW5pdGlhbGl6ZWRDYXJvdXNlbCQubmV4dChuYW1lKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdjaGFuZ2UnOlxuXHRcdFx0XHR0aGlzLl9jaGFuZ2VTZXR0aW5nc0Nhcm91c2VsJC5uZXh0KGRhdGEpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ2NoYW5nZWQnOlxuXHRcdFx0XHR0aGlzLl9jaGFuZ2VkU2V0dGluZ3NDYXJvdXNlbCQubmV4dChkYXRhKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdkcmFnJzpcblx0XHRcdFx0dGhpcy5fZHJhZ0Nhcm91c2VsJC5uZXh0KG5hbWUpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ2RyYWdnZWQnOlxuXHRcdFx0XHR0aGlzLl9kcmFnZ2VkQ2Fyb3VzZWwkLm5leHQobmFtZSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAncmVzaXplJzpcblx0XHRcdFx0dGhpcy5fcmVzaXplQ2Fyb3VzZWwkLm5leHQobmFtZSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAncmVzaXplZCc6XG5cdFx0XHRcdHRoaXMuX3Jlc2l6ZWRDYXJvdXNlbCQubmV4dChuYW1lKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdyZWZyZXNoJzpcblx0XHRcdFx0dGhpcy5fcmVmcmVzaENhcm91c2VsJC5uZXh0KG5hbWUpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ3JlZnJlc2hlZCc6XG5cdFx0XHRcdHRoaXMuX3JlZnJlc2hlZENhcm91c2VsJC5uZXh0KG5hbWUpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ3RyYW5zbGF0ZSc6XG5cdFx0XHRcdHRoaXMuX3RyYW5zbGF0ZUNhcm91c2VsJC5uZXh0KG5hbWUpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ3RyYW5zbGF0ZWQnOlxuXHRcdFx0XHR0aGlzLl90cmFuc2xhdGVkQ2Fyb3VzZWwkLm5leHQobmFtZSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXG5cdH1cblxuXHQvKipcblx0ICogRW50ZXJzIGEgc3RhdGUuXG5cdCAqIEBwYXJhbSBuYW1lIC0gVGhlIHN0YXRlIG5hbWUuXG5cdCAqL1xuXHRlbnRlcihuYW1lOiBzdHJpbmcpIHtcblx0XHRbbmFtZV0uY29uY2F0KHRoaXMuX3N0YXRlcy50YWdzW25hbWVdIHx8IFtdKS5mb3JFYWNoKChzdGF0ZU5hbWUpID0+IHtcblx0XHRcdGlmICh0aGlzLl9zdGF0ZXMuY3VycmVudFtzdGF0ZU5hbWVdID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0dGhpcy5fc3RhdGVzLmN1cnJlbnRbc3RhdGVOYW1lXSA9IDA7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX3N0YXRlcy5jdXJyZW50W3N0YXRlTmFtZV0rKztcblx0XHR9KTtcblx0fTtcblxuXHQvKipcblx0ICogTGVhdmVzIGEgc3RhdGUuXG5cdCAqIEBwYXJhbSBuYW1lIC0gVGhlIHN0YXRlIG5hbWUuXG5cdCAqL1xuXHRsZWF2ZShuYW1lOiBzdHJpbmcpIHtcblx0XHRbbmFtZV0uY29uY2F0KHRoaXMuX3N0YXRlcy50YWdzW25hbWVdIHx8IFtdKS5mb3JFYWNoKChzdGF0ZU5hbWUpID0+IHtcblx0XHRcdGlmICh0aGlzLl9zdGF0ZXMuY3VycmVudFtzdGF0ZU5hbWVdID09PSAwIHx8ICEhdGhpcy5fc3RhdGVzLmN1cnJlbnRbc3RhdGVOYW1lXSkge1xuXHRcdFx0XHR0aGlzLl9zdGF0ZXMuY3VycmVudFtzdGF0ZU5hbWVdLS07XG5cdFx0XHR9XG5cdFx0fSlcblx0fTtcblxuXHQvKipcblx0ICogUmVnaXN0ZXJzIGFuIGV2ZW50IG9yIHN0YXRlLlxuXHQgKiBAcGFyYW0gb2JqZWN0IC0gVGhlIGV2ZW50IG9yIHN0YXRlIHRvIHJlZ2lzdGVyLlxuXHQgKi9cblx0cmVnaXN0ZXIob2JqZWN0OiBhbnkpIHtcblx0XHRpZiAob2JqZWN0LnR5cGUgPT09IFR5cGUuU3RhdGUpIHtcblx0XHRcdGlmICghdGhpcy5fc3RhdGVzLnRhZ3Nbb2JqZWN0Lm5hbWVdKSB7XG5cdFx0XHRcdHRoaXMuX3N0YXRlcy50YWdzW29iamVjdC5uYW1lXSA9IG9iamVjdC50YWdzO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5fc3RhdGVzLnRhZ3Nbb2JqZWN0Lm5hbWVdID0gdGhpcy5fc3RhdGVzLnRhZ3Nbb2JqZWN0Lm5hbWVdLmNvbmNhdChvYmplY3QudGFncyk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX3N0YXRlcy50YWdzW29iamVjdC5uYW1lXSA9IHRoaXMuX3N0YXRlcy50YWdzW29iamVjdC5uYW1lXS5maWx0ZXIoKHRhZywgaSkgPT4ge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5fc3RhdGVzLnRhZ3Nbb2JqZWN0Lm5hbWVdLmluZGV4T2YodGFnKSA9PT0gaTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBTdXBwcmVzc2VzIGV2ZW50cy5cblx0ICogQHBhcmFtIGV2ZW50cyBUaGUgZXZlbnRzIHRvIHN1cHByZXNzLlxuXHQgKi9cblx0cHJpdmF0ZSBfc3VwcHJlc3MoZXZlbnRzOiBzdHJpbmdbXSkge1xuXHRcdGV2ZW50cy5mb3JFYWNoKGV2ZW50ID0+IHtcblx0XHRcdHRoaXMuX3N1cHJlc3NbZXZlbnRdID0gdHJ1ZTtcblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZWxlYXNlcyBzdXBwcmVzc2VkIGV2ZW50cy5cblx0ICogQHBhcmFtIGV2ZW50cyBUaGUgZXZlbnRzIHRvIHJlbGVhc2UuXG5cdCAqL1xuXHRwcml2YXRlIF9yZWxlYXNlKGV2ZW50czogc3RyaW5nW10pIHtcblx0XHRldmVudHMuZm9yRWFjaChldmVudCA9PiB7XG5cdFx0XHRkZWxldGUgdGhpcy5fc3VwcmVzc1tldmVudF07XG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogR2V0cyB1bmlmaWVkIHBvaW50ZXIgY29vcmRpbmF0ZXMgZnJvbSBldmVudC5cblx0ICogQHRvZG8gIzI2MVxuXHQgKiBAcGFyYW0gZXZlbnQgVGhlIGBtb3VzZWRvd25gIG9yIGB0b3VjaHN0YXJ0YCBldmVudC5cblx0ICogQHJldHVybnMgT2JqZWN0IENvb3JkcyB3aGljaCBjb250YWlucyBgeGAgYW5kIGB5YCBjb29yZGluYXRlcyBvZiBjdXJyZW50IHBvaW50ZXIgcG9zaXRpb24uXG5cdCAqL1xuXHRwb2ludGVyKGV2ZW50OiBhbnkpOiBDb29yZHMge1xuXHRcdGNvbnN0IHJlc3VsdCA9IHsgeDogbnVsbCwgeTogbnVsbCB9O1xuXG5cdFx0ZXZlbnQgPSBldmVudC5vcmlnaW5hbEV2ZW50IHx8IGV2ZW50IHx8IHdpbmRvdy5ldmVudDtcblxuXHRcdGV2ZW50ID0gZXZlbnQudG91Y2hlcyAmJiBldmVudC50b3VjaGVzLmxlbmd0aCA/XG5cdFx0XHRldmVudC50b3VjaGVzWzBdIDogZXZlbnQuY2hhbmdlZFRvdWNoZXMgJiYgZXZlbnQuY2hhbmdlZFRvdWNoZXMubGVuZ3RoID9cblx0XHRcdFx0ZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0gOiBldmVudDtcblxuXHRcdGlmIChldmVudC5wYWdlWCkge1xuXHRcdFx0cmVzdWx0LnggPSBldmVudC5wYWdlWDtcblx0XHRcdHJlc3VsdC55ID0gZXZlbnQucGFnZVk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlc3VsdC54ID0gZXZlbnQuY2xpZW50WDtcblx0XHRcdHJlc3VsdC55ID0gZXZlbnQuY2xpZW50WTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0LyoqXG5cdCAqIERldGVybWluZXMgaWYgdGhlIGlucHV0IGlzIGEgTnVtYmVyIG9yIHNvbWV0aGluZyB0aGF0IGNhbiBiZSBjb2VyY2VkIHRvIGEgTnVtYmVyXG5cdCAqIEBwYXJhbSBudW1iZXIgVGhlIGlucHV0IHRvIGJlIHRlc3RlZFxuXHQgKiBAcmV0dXJucyBBbiBpbmRpY2F0aW9uIGlmIHRoZSBpbnB1dCBpcyBhIE51bWJlciBvciBjYW4gYmUgY29lcmNlZCB0byBhIE51bWJlclxuXHQgKi9cblx0cHJpdmF0ZSBfaXNOdW1lcmljKG51bWJlcjogYW55KTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuICFpc05hTihwYXJzZUZsb2F0KG51bWJlcikpO1xuXHR9XG5cblx0LyoqXG5cdCAqIERldGVybWluZXMgd2hldGhlciB2YWx1ZSBpcyBudW1iZXIgb3IgYm9vbGVhbiB0eXBlXG5cdCAqIEBwYXJhbSB2YWx1ZSBUaGUgaW5wdXQgdG8gYmUgdGVzdGVkXG5cdCAqIEByZXR1cm5zIEFuIGluZGljYXRpb24gaWYgdGhlIGlucHV0IGlzIGEgTnVtYmVyIG9yIGNhbiBiZSBjb2VyY2VkIHRvIGEgTnVtYmVyLCBvciBCb29sZWFuXG5cdCAqL1xuXHRwcml2YXRlIF9pc051bWJlck9yQm9vbGVhbih2YWx1ZTogbnVtYmVyIHwgYm9vbGVhbik6IGJvb2xlYW4ge1xuXHRcdHJldHVybiB0aGlzLl9pc051bWVyaWModmFsdWUpIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nO1xuXHR9XG5cblx0LyoqXG5cdCAqIERldGVybWluZXMgd2hldGhlciB2YWx1ZSBpcyBudW1iZXIgb3Igc3RyaW5nIHR5cGVcblx0ICogQHBhcmFtIHZhbHVlIFRoZSBpbnB1dCB0byBiZSB0ZXN0ZWRcblx0ICogQHJldHVybnMgQW4gaW5kaWNhdGlvbiBpZiB0aGUgaW5wdXQgaXMgYSBOdW1iZXIgb3IgY2FuIGJlIGNvZXJjZWQgdG8gYSBOdW1iZXIsIG9yIFN0cmluZ1xuXHQgKi9cblx0cHJpdmF0ZSBfaXNOdW1iZXJPclN0cmluZyh2YWx1ZTogbnVtYmVyIHwgc3RyaW5nKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuIHRoaXMuX2lzTnVtZXJpYyh2YWx1ZSkgfHwgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJztcblx0fVxuXG5cdC8qKlxuXHQgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdmFsdWUgaXMgbnVtYmVyIG9yIHN0cmluZyB0eXBlXG5cdCAqIEBwYXJhbSB2YWx1ZSBUaGUgaW5wdXQgdG8gYmUgdGVzdGVkXG5cdCAqIEByZXR1cm5zIEFuIGluZGljYXRpb24gaWYgdGhlIGlucHV0IGlzIGEgTnVtYmVyIG9yIGNhbiBiZSBjb2VyY2VkIHRvIGEgTnVtYmVyLCBvciBTdHJpbmdcblx0ICovXG5cdHByaXZhdGUgX2lzU3RyaW5nT3JCb29sZWFuKHZhbHVlOiBudW1iZXIgfCBzdHJpbmcpOiBib29sZWFuIHtcblx0XHRyZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJztcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXRzIHRoZSBkaWZmZXJlbmNlIG9mIHR3byB2ZWN0b3JzLlxuXHQgKiBAdG9kbyAjMjYxXG5cdCAqIEBwYXJhbSBmaXJzdCBUaGUgZmlyc3QgdmVjdG9yLlxuXHQgKiBAcGFyYW0gc2Vjb25kIFRoZSBzZWNvbmQgdmVjdG9yLlxuXHQgKiBAcmV0dXJucyBUaGUgZGlmZmVyZW5jZS5cblx0ICovXG5cdGRpZmZlcmVuY2UoZmlyc3Q6IENvb3Jkcywgc2Vjb25kOiBDb29yZHMpOiBDb29yZHMge1xuXHRcdGlmIChudWxsID09PSBmaXJzdCB8fCBudWxsID09PSBzZWNvbmQpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHg6IDAsXG5cdFx0XHRcdHk6IDAsXG5cdFx0XHR9O1xuXHRcdH1cblx0XHRyZXR1cm4ge1xuXHRcdFx0eDogZmlyc3QueCAtIHNlY29uZC54LFxuXHRcdFx0eTogZmlyc3QueSAtIHNlY29uZC55XG5cdFx0fTtcblx0fVxuXG59XG4iXX0=