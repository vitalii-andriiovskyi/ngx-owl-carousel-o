import * as i0 from '@angular/core';
import { TemplateRef, ErrorHandler, OnDestroy, NgZone, OnInit, AfterContentInit, QueryList, Signal, ElementRef, ChangeDetectorRef, Renderer2, OnChanges } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import * as i5 from '@angular/common';
import { LocationStrategy } from '@angular/common';

declare class ResizeService {
    private resizeObservable$;
    private docRef;
    /**
     * Makes resizeSubject become Observable
     * @returns Observable of resizeSubject
     */
    get onResize$(): Observable<Event>;
    constructor(winRef: any, docRef: any, platformId: Object);
    static ɵfac: i0.ɵɵFactoryDeclaration<ResizeService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ResizeService>;
}

/**
 * Data model for managing classes of .owl-stage DOM element
 */
declare class StageData {
    /**
     * Determines css-rule 'transform'
     */
    transform: string;
    /**
     *  Determines css-rule 'transition'
   */
    transition: string;
    /**
     *  Determines css-rule 'width'
   */
    width: number | string;
    /**
     *  Determines css-rule 'padding-left'
   */
    paddingL: number | string;
    /**
     *  Determines css-rule 'padding-right'
   */
    paddingR: number | string;
}

/**
 * Data model for managing classes of .owl-carousel DOM element
 */
declare class OwlDOMData {
    /**
     * Defines whether to set class .owl-rtl or not
     */
    rtl: boolean;
    /**
     * Defines whether to set class .owl-responsive or not
     */
    isResponsive: boolean;
    /**
     * Defines whether to set class .owl-refreshed or not
     */
    isRefreshed: boolean;
    /**
     * Defines whether to set class .owl-loaded or not
    */
    isLoaded: boolean;
    /**
     * Defines whether to set class .owl-loading or not
     */
    isLoading: boolean;
    /**
     * Defines whether to set class .owl-drag or not and makes carousel draggable by mouse moving
     */
    isMouseDragable: boolean;
    /**
     * Makes carousel draggable by touch moving
     */
    isTouchDragable: boolean;
    /**
     * Defines whether to set class .owl-grab or not
     */
    isGrab: boolean;
}

declare class SlideModel {
    /**
     * Id of slide
     */
    id: string;
    /**
     * Active state of slide. If true slide gets css-class .active
     */
    isActive?: boolean;
    /**
     * TemplateRef of slide. In other words its html-markup
     */
    tplRef?: TemplateRef<any>;
    /**
     * Number of grid parts to be used
     */
    dataMerge?: number;
    /**
     * Width of slide
     */
    width?: number | string;
    /**
     * Css-rule 'margin-left'
     */
    marginL?: number | string;
    /**
     * Css-rule 'margin-right'
     */
    marginR?: number | string;
    /**
     * Make slide to be on center of the carousel
     */
    isCentered?: boolean;
    /**
     * Mark slide to be on center of the carousel (has .center)
     */
    center?: boolean;
    /**
     * Cloned slide. It's being used when 'loop'=true
     */
    isCloned?: boolean;
    /**
     * Indicates whether slide should be lazy loaded
     */
    load?: boolean;
    /**
     * Css-rule 'left'
     */
    left?: number | string;
    /**
     * Changeable classes of slide
     */
    classes?: {
        [key: string]: boolean;
    };
    /**
     * Shows whether slide could be animated and could have css-class '.animated'
     */
    isAnimated?: boolean;
    /**
     * Shows whether slide could be animated-in and could have css-class '.owl-animated-in'
     */
    isDefAnimatedIn?: boolean;
    /**
     * Shows whether slide could be animated-out and could have css-class '.owl-animated-out'
     */
    isDefAnimatedOut?: boolean;
    /**
     * Shows whether slide could be animated-in and could have animation css-class defined by user
     */
    isCustomAnimatedIn?: boolean;
    /**
     * Shows whether slide could be animated-out and could have animation css-class defined by user
     */
    isCustomAnimatedOut?: boolean;
    /**
     * State for defining the height of slide.It's values could be 'full' and 'nulled'. 'Full' sets css-height to 'auto', 'nulled' sets height to '0'.
     */
    heightState?: string;
    /**
     * Hash (fragment) of url which corresponds to slide
     */
    hashFragment?: string;
}

declare class CarouselSlideDirective {
    tplRef: TemplateRef<any>;
    /**
     * Unique slide identifier. Must be unique for the entire document for proper accessibility support.
     * Will be auto-generated if not provided.
     */
    id: i0.InputSignal<string>;
    /**
     * Defines how much widths of common slide will current slide have
     * e.g. if dataMerge=2, the slide will twice wider then slides with dataMerge=1
     */
    dataMerge: i0.InputSignalWithTransform<number, number>;
    /**
     * Width of slide
     */
    width: i0.InputSignal<number>;
    /**
     * Inner content of dot for certain slide; can be html-markup
     */
    dotContent: i0.InputSignal<string>;
    /**
     * Hash (fragment) of url which corresponds to certain slide
     */
    dataHash: i0.InputSignal<string>;
    constructor(tplRef: TemplateRef<any>);
    /**
       * Determines if the input is a Number or something that can be coerced to a Number
       * @param - The input to be tested
       * @returns - An indication if the input is a Number or can be coerced to a Number
       */
    isNumeric(number: any): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<CarouselSlideDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<CarouselSlideDirective, "ng-template[carouselSlide]", never, { "id": { "alias": "id"; "required": false; "isSignal": true; }; "dataMerge": { "alias": "dataMerge"; "required": false; "isSignal": true; }; "width": { "alias": "width"; "required": false; "isSignal": true; }; "dotContent": { "alias": "dotContent"; "required": false; "isSignal": true; }; "dataHash": { "alias": "dataHash"; "required": false; "isSignal": true; }; }, {}, never, never, false, never>;
}

interface BreakpointOptions {
    /**
     * The number of items you want to see on the screen.
     */
    items?: number;
    /**
     * Skips the validation of `items` when the number of slides is less than the number of `items`
     */
    skip_validateItems?: boolean;
    /**
     * Infinity loop. Duplicate last and first items to get loop illusion.
     */
    loop?: boolean;
    /**
     * Center item. Works well with even an odd number of items.
     */
    center?: boolean;
    /**
     * Go backwards when the boundary has reached.
     */
    rewind?: boolean;
    /**
     * Mouse drag.
     */
    mouseDrag?: boolean;
    /**
     * Touch drag
     */
    touchDrag?: boolean;
    /**
     * Stage pull to edge
     */
    pullDrag?: boolean;
    /**
     * Item pull to edge.
     */
    freeDrag?: boolean;
    /**
     * margin-right(px) on item
     */
    margin?: number;
    /**
     * Padding left and right on stage (can see neighbours)
     */
    stagePadding?: number;
    /**
     * Merge items. Works with @Input option 'dataMerge' of CarouselSlideDirective.
     */
    merge?: boolean;
    /**
     * Fit merged items if screen is smaller than items value.
     */
    mergeFit?: boolean;
    /**
     * Set non grid content.  Works with @Input option 'width' of CarouselSlideDirective.
     */
    autoWidth?: boolean;
    /**
     * Speed Calculate while dragging
     */
    smartSpeed?: number;
    /**
     * Speed Calculate while dragging
     */
    fluidSpeed?: boolean;
    /**
     * Drag end speed
     */
    dragEndSpeed?: number | boolean;
    /**
     * Responsive refresh rate. Period of time between firing 'resize' event and refreshing carousel.
     */
    responsiveRefreshRate?: number;
    /**
     * Show next/prev buttons.
     */
    nav?: boolean;
    /**
     * Navigation speed
     */
    navSpeed?: number | boolean;
    /**
     * Navigation slide by x. 'page' string can be set to slide by page.
     */
    slideBy?: number | string;
    /**
     * Show dots navigation
     */
    dots?: boolean;
    /**
     * Show dots each x item
     */
    dotsEach?: number | boolean;
    /**
     * Pagination speed.
     */
    dotsSpeed?: number | boolean;
    /**
     * Autoplay.
     */
    autoplay?: boolean;
    /**
     * Autoplay interval timeout
     */
    autoplayTimeout?: number;
    /**
     * Autoplay speed
     */
    autoplaySpeed?: number | boolean;
    /**
     * Period of time to start autoplaying or first timeout after firing `mouseleave`. Default is `1`
     */
    autoplayMouseleaveTimeout?: number;
    /**
     * You can define the transition for the stage you want to use eg. `linear`.
     */
    slideTransition?: string;
    /**
     * Class for CSS3 animation out.
     */
    animateOut?: string | boolean;
    /**
     * Class for CSS3 animation in.
     */
    animateIn?: string | boolean;
    /**
     * Enables changing carousel according to the biggest height of ass active slides providing slides have different height
     */
    autoHeight?: boolean;
}
interface ResponsiveSettings {
    [key: number]: BreakpointOptions;
}
interface OwlOptions {
    /**
     * The number of items you want to see on the screen.
     */
    items?: number;
    /**
     * Skips the validation of `items` when the number of slides is less than the number of `items`
     */
    skip_validateItems?: boolean;
    /**
     * Infinity loop. Duplicate last and first items to get loop illusion.
     */
    loop?: boolean;
    /**
     * Center item. Works well with even an odd number of items.
     */
    center?: boolean;
    /**
     * Go backwards when the boundary has reached.
     */
    rewind?: boolean;
    /**
     * Mouse drag.
     */
    mouseDrag?: boolean;
    /**
     * Touch drag
     */
    touchDrag?: boolean;
    /**
     * Stage pull to edge
     */
    pullDrag?: boolean;
    /**
     * Item pull to edge.
     */
    freeDrag?: boolean;
    /**
     * margin-right(px) on item
     */
    margin?: number;
    /**
     * Padding left and right on stage (can see neighbours)
     */
    stagePadding?: number;
    /**
     * Merge items. Works with @Input option 'dataMerge' of CarouselSlideDirective.
     */
    merge?: boolean;
    /**
     * Fit merged items if screen is smaller than items value.
     */
    mergeFit?: boolean;
    /**
     * Set non grid content.  Works with @Input option 'width' of CarouselSlideDirective.
     */
    autoWidth?: boolean;
    /**
     * Start position
     */
    startPosition?: number | string;
    /**
     * Change direction from Right to left
     */
    rtl?: boolean;
    /**
     * Speed Calculate while dragging
     */
    smartSpeed?: number;
    /**
     * Speed Calculate while dragging
     */
    fluidSpeed?: boolean;
    /**
     * Drag end speed
     */
    dragEndSpeed?: number | boolean;
    /**
     * Object containing responsive options. Can be set to false to remove responsive capabilities.
     */
    responsive?: ResponsiveSettings;
    /**
     * Responsive refresh rate. Period of time between firing 'resize' event and refreshing carousel.
     */
    responsiveRefreshRate?: number;
    /**
     * Show next/prev buttons.
     */
    nav?: boolean;
    /**
     * Text in next/prev buttons. HTML allowed.
     */
    navText?: string[];
    /**
     * Navigation speed
     */
    navSpeed?: number | boolean;
    /**
     * Navigation slide by x. 'page' string can be set to slide by page.
     */
    slideBy?: number | string;
    /**
     * Show dots navigation
     */
    dots?: boolean;
    /**
     * Show dots each x item
     */
    dotsEach?: number | boolean;
    /**
     * Used with @Input option 'dotContent' of CarouselSlideDirective.
     */
    dotsData?: boolean;
    /**
     * Pagination speed.
     */
    dotsSpeed?: number | boolean;
    /**
     * Autoplay.
     */
    autoplay?: boolean;
    /**
     * Autoplay interval timeout
     */
    autoplayTimeout?: number;
    /**
     * Pause on mouse hover
     */
    autoplayHoverPause?: boolean;
    /**
     * Period of time to start autoplaying or first timeout after firing `mouseleave`. Default is `1`
     */
    autoplayMouseleaveTimeout?: number;
    /**
     * Autoplay speed
     */
    autoplaySpeed?: number | boolean;
    /**
     * Lazy loading of slides with images
     */
    lazyLoad?: boolean;
    /**
     * Indicates how many items (slides with images) to the right (and left, when loop is true) will be pre-loaded
     */
    lazyLoadEager?: number;
    /**
     * You can define the transition for the stage you want to use eg. `linear`.
     */
    slideTransition?: string;
    /**
     * Class for CSS3 animation out.
     */
    animateOut?: string | boolean;
    /**
     * Class for CSS3 animation in.
     */
    animateIn?: string | boolean;
    /**
     * Enables changing carousel according to the biggest height of ass active slides providing slides have different height
     */
    autoHeight?: boolean;
    /**
     * Enables listening to url hash (fragment) changes
     */
    URLhashListener?: boolean;
}

/**
 * Data model for single navigation button
 */
declare class NavButton {
    /**
     * Make button disabled by attaching class .disabled; it's being used when otpion loop=false
     */
    disabled: boolean;
    /**
     * Text for button; can be simple text or html-markup (e.g. <i class="fa fa-next">)
     */
    htmlText: string;
}
/**
 * Data model for  navigation block
 */
declare class NavData {
    /**
     * Rurns on or turns off navigation block
     */
    disabled: boolean;
    /**
     * Navigation button 'prev'
     */
    prev: NavButton;
    /**
     * Navigation button 'next'
     */
    next: NavButton;
}
/**
 * data model for single owl dot-button
 */
declare class OwlSingeDot {
    /**
     * Id for dot button
     */
    id: string;
    /**
     * Makes dot active by attaching .active class to it
     */
    active: boolean;
    /**
     * Inner content of dot; can be html-markup
     */
    innerContent?: string;
    /**
     * Enabled css-class which gives right presentaion of innerContent of dot.
     */
    showInnerContent?: boolean;
}
/**
 * Data model for owl dot-block
 */
declare class DotsData {
    /**
     * Turns on or turns off navigation block
     */
    disabled: boolean;
    /**
     * Array of dots
     */
    dots: OwlSingeDot[];
}

declare class OwlLogger {
    private errorHandler;
    constructor(errorHandler: ErrorHandler);
    log(value: any, ...rest: any[]): void;
    error(error: Error): void;
    warn(value: any, ...rest: any[]): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<OwlLogger, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OwlLogger>;
}

/**
 * Current state information and their tags.
 */
declare class States {
    current: {};
    tags: {
        [key: string]: string[];
    };
}
/**
 * Enumeration for width.
 * @enum {String}
 */
declare enum Width {
    Default = "default",
    Inner = "inner",
    Outer = "outer"
}
/**
 * Model for coords of .owl-stage
 */
declare class Coords {
    x: number;
    y: number;
}
/**
 * Model for all current data of carousel
 */
declare class CarouselCurrentData {
    owlDOMData: OwlDOMData;
    stageData: StageData;
    slidesData: SlideModel[];
    navData: NavData;
    dotsData: DotsData;
}
declare class CarouselService {
    private logger;
    /**
     * Subject for passing data needed for managing View
     */
    private _viewSettingsShipper$;
    /**
     * Subject for notification when the carousel got initializes
     */
    private _initializedCarousel$;
    /**
     * Subject for notification when the carousel's settings start changinf
     */
    private _changeSettingsCarousel$;
    /**
     * Subject for notification when the carousel's settings have changed
     */
    private _changedSettingsCarousel$;
    /**
     * Subject for notification when the carousel starts translating or moving
     */
    private _translateCarousel$;
    /**
     * Subject for notification when the carousel stopped translating or moving
     */
    private _translatedCarousel$;
    /**
     * Subject for notification when the carousel's rebuilding caused by 'resize' event starts
     */
    private _resizeCarousel$;
    /**
     * Subject for notification  when the carousel's rebuilding caused by 'resize' event is ended
     */
    private _resizedCarousel$;
    /**
     * Subject for notification when the refresh of carousel starts
     */
    private _refreshCarousel$;
    /**
     * Subject for notification when the refresh of carousel is ended
     */
    private _refreshedCarousel$;
    /**
     * Subject for notification when the dragging of carousel starts
     */
    private _dragCarousel$;
    /**
     * Subject for notification when the dragging of carousel is ended
     */
    private _draggedCarousel$;
    /**
     * Current settings for the carousel.
     */
    settings: OwlOptions;
    /**
     * Initial data for setting classes to element .owl-carousel
     */
    owlDOMData: OwlDOMData;
    /**
     * Initial data of .owl-stage
     */
    stageData: StageData;
    /**
     *  Data of every slide
     */
    slidesData: SlideModel[];
    /**
     * Data of navigation block
     */
    navData: NavData;
    /**
     * Data of dots block
     */
    dotsData: DotsData;
    /**
     * Carousel width
     */
    private _width;
    /**
     * All real items.
     */
    private _items;
    /**
     * Array with width of every slide.
     */
    private _widths;
    /**
     * Currently suppressed events to prevent them from beeing retriggered.
     */
    private _supress;
    /**
     * References to the running plugins of this carousel.
     */
    private _plugins;
    /**
     * Absolute current position.
     */
    private _current;
    /**
     * All cloned items.
     */
    private _clones;
    /**
     * Merge values of all items.
     * @todo Maybe this could be part of a plugin.
     */
    private _mergers;
    /**
     * Animation speed in milliseconds.
     */
    private _speed;
    /**
     * Coordinates of all items in pixel.
     * @todo The name of this member is missleading.
     */
    private _coordinates;
    /**
     * Current breakpoint.
     * @todo Real media queries would be nice.
     */
    private _breakpoint;
    /**
     * Prefix for id of cloned slides
     */
    clonedIdPrefix: string;
    /**
     * Current options set by the caller including defaults.
     */
    _options: OwlOptions;
    /**
     * Invalidated parts within the update process.
     */
    private _invalidated;
    get invalidated(): any;
    /**
     * Current state information and their tags.
     */
    private _states;
    get states(): States;
    /**
         * Ordered list of workers for the update process.
     */
    private _pipe;
    constructor(logger: OwlLogger);
    /**
     * Makes _viewSettingsShipper$ Subject become Observable
     * @returns Observable of _viewSettingsShipper$ Subject
     */
    getViewCurSettings(): Observable<CarouselCurrentData>;
    /**
     * Makes _initializedCarousel$ Subject become Observable
     * @returns Observable of _initializedCarousel$ Subject
     */
    getInitializedState(): Observable<string>;
    /**
     * Makes _changeSettingsCarousel$ Subject become Observable
     * @returns Observable of _changeSettingsCarousel$ Subject
     */
    getChangeState(): Observable<any>;
    /**
     * Makes _changedSettingsCarousel$ Subject become Observable
     * @returns Observable of _changedSettingsCarousel$ Subject
     */
    getChangedState(): Observable<any>;
    /**
     * Makes _translateCarousel$ Subject become Observable
     * @returns Observable of _translateCarousel$ Subject
     */
    getTranslateState(): Observable<string>;
    /**
     * Makes _translatedCarousel$ Subject become Observable
     * @returns Observable of _translatedCarousel$ Subject
     */
    getTranslatedState(): Observable<string>;
    /**
     * Makes _resizeCarousel$ Subject become Observable
     * @returns Observable of _resizeCarousel$ Subject
     */
    getResizeState(): Observable<string>;
    /**
     * Makes _resizedCarousel$ Subject become Observable
     * @returns Observable of _resizedCarousel$ Subject
     */
    getResizedState(): Observable<string>;
    /**
     * Makes _refreshCarousel$ Subject become Observable
     * @returns Observable of _refreshCarousel$ Subject
     */
    getRefreshState(): Observable<string>;
    /**
     * Makes _refreshedCarousel$ Subject become Observable
     * @returns Observable of _refreshedCarousel$ Subject
     */
    getRefreshedState(): Observable<string>;
    /**
     * Makes _dragCarousel$ Subject become Observable
     * @returns Observable of _dragCarousel$ Subject
     */
    getDragState(): Observable<string>;
    /**
     * Makes _draggedCarousel$ Subject become Observable
     * @returns Observable of _draggedCarousel$ Subject
     */
    getDraggedState(): Observable<string>;
    /**
     * Setups custom options expanding default options
     * @param options custom options
     */
    setOptions(options: OwlOptions): void;
    /**
     * Checks whether user's option are set properly. Cheking is based on typings;
     * @param options options set by user
     * @param configOptions default options
     * @returns checked and modified (if it's needed) user's options
     *
     * Notes:
     * 	- if user set option with wrong type, it'll be written in console
     */
    private _validateOptions;
    /**
     * Checks the option `items` set by user and if it bigger than number of slides, the function returns number of slides
     * @param items option items set by user
     * @param skip_validateItems option `skip_validateItems` set by user
     * @returns right number of items
     */
    private _validateItems;
    /**
     * Set current width of carousel
     * @param width width of carousel Window
     */
    setCarouselWidth(width: number): void;
    /**
     * Setups the current settings.
     * @todo Remove responsive classes. Why should adaptive designs be brought into IE8?
     * @todo Support for media queries by using `matchMedia` would be nice.
     * @param carouselWidth width of carousel
     * @param slides array of slides
     * @param options options set by user
     */
    setup(carouselWidth: number, slides: CarouselSlideDirective[], options: OwlOptions): void;
    /**
     * Set options for current viewport
     */
    setOptionsForViewport(): void;
    /**
     * Initializes the carousel.
     * @param slides array of CarouselSlideDirective
     */
    initialize(slides: CarouselSlideDirective[]): void;
    /**
     * Sends all data needed for View
     */
    sendChanges(): void;
    /**
     * Updates option logic if necessery
     */
    private _optionsLogic;
    /**
     * Updates the view
     */
    update(): void;
    /**
     * Gets the width of the view.
     * @param [dimension=Width.Default] The dimension to return
     * @returns The width of the view in pixel.
     */
    width(dimension?: Width): number;
    /**
     * Refreshes the carousel primarily for adaptive purposes.
     */
    refresh(): void;
    /**
     * Checks window `resize` event.
     * @param curWidth width of .owl-carousel
     */
    onResize(curWidth: number): boolean;
    /**
     * Prepares data for dragging carousel. It starts after firing `touchstart` and `mousedown` events.
     * @todo Horizontal swipe threshold as option
     * @todo #261
     * @param event - The event arguments.
     * @returns stage - object with 'x' and 'y' coordinates of .owl-stage
     */
    prepareDragging(event: any): Coords;
    /**
     * Enters into a 'dragging' state
     */
    enterDragging(): void;
    /**
     * Defines new coords for .owl-stage while dragging it
     * @todo #261
     * @param event the event arguments.
     * @param dragData initial data got after starting dragging
     * @returns coords or false
     */
    defineNewCoordsDrag(event: any, dragData: any): boolean | Coords;
    /**
     * Finishes dragging of carousel when `touchend` and `mouseup` events fire.
     * @todo #261
     * @todo Threshold for click event
     * @param event the event arguments.
     * @param dragObj the object with dragging settings and states
     * @param clickAttacher function which attaches click handler to slide or its children elements in order to prevent event bubling
     */
    finishDragging(event: any, dragObj: any, clickAttacher: () => void): void;
    /**
     * Gets absolute position of the closest item for a coordinate.
     * @todo Setting `freeDrag` makes `closest` not reusable. See #165.
     * @param coordinate The coordinate in pixel.
     * @param direction The direction to check for the closest item. Ether `left` or `right`.
     * @returns The absolute position of the closest item.
     */
    closest(coordinate: number, direction: string): number;
    /**
     * Animates the stage.
     * @todo #270
     * @param coordinate The coordinate in pixels.
     */
    animate(coordinate: number | number[]): void;
    /**
     * Checks whether the carousel is in a specific state or not.
     * @param state The state to check.
     * @returns The flag which indicates if the carousel is busy.
     */
    is(state: string): boolean;
    /**
     * Sets the absolute position of the current item.
     * @param position The new absolute position or nothing to leave it unchanged.
     * @returns The absolute position of the current item.
     */
    current(position?: number): number | undefined;
    /**
     * Invalidates the given part of the update routine.
     * @param part The part to invalidate.
     * @returns The invalidated parts.
     */
    invalidate(part: string): string[];
    /**
     * Resets the absolute position of the current item.
     * @param position the absolute position of the new item.
     */
    reset(position: number): void;
    /**
     * Normalizes an absolute or a relative position of an item.
     * @param position The absolute or relative position to normalize.
     * @param relative Whether the given position is relative or not.
     * @returns The normalized position.
     */
    normalize(position: number, relative?: boolean): number | undefined;
    /**
     * Converts an absolute position of an item into a relative one.
     * @param position The absolute position to convert.
     * @returns The converted position.
     */
    relative(position: number): number;
    /**
     * Gets the maximum position for the current item.
     * @param relative Whether to return an absolute position or a relative position.
     * @returns number of maximum position
     */
    maximum(relative?: boolean): number;
    /**
     * Gets the minimum position for the current item.
     * @param relative Whether to return an absolute position or a relative position.
     * @returns number of minimum position
     */
    minimum(relative?: boolean): number;
    /**
     * Gets an item at the specified relative position.
     * @param position The relative position of the item.
     * @returns The item at the given position or all items if no position was given.
     */
    items(position?: number): CarouselSlideDirective[];
    /**
     * Gets an item at the specified relative position.
     * @param position The relative position of the item.
     * @returns The item at the given position or all items if no position was given.
     */
    mergers(position: number): number | number[];
    /**
     * Gets the absolute positions of clones for an item.
     * @param position The relative position of the item.
     * @returns The absolute positions of clones for the item or all if no position was given.
     */
    clones(position?: number): number[];
    /**
     * Sets the current animation speed.
     * @param speed The animation speed in milliseconds or nothing to leave it unchanged.
     * @returns The current animation speed in milliseconds.
     */
    speed(speed?: number): number;
    /**
     * Gets the coordinate of an item.
     * @todo The name of this method is missleanding.
     * @param position The absolute position of the item within `minimum()` and `maximum()`.
     * @returns The coordinate of the item in pixel or all coordinates.
     */
    coordinates(position?: number): number | number[];
    /**
     * Calculates the speed for a translation.
     * @param from The absolute position of the start item.
     * @param to The absolute position of the target item.
     * @param factor [factor=undefined] - The time factor in milliseconds.
     * @returns The time in milliseconds for the translation.
     */
    private _duration;
    /**
     * Slides to the specified item.
     * @param position The position of the item.
     * @param speed The time in milliseconds for the transition.
     */
    to(position: number, speed: number | boolean): void;
    /**
     * Slides to the next item.
     * @param speed The time in milliseconds for the transition.
     */
    next(speed: number | boolean): void;
    /**
     * Slides to the previous item.
     * @param speed The time in milliseconds for the transition.
     */
    prev(speed: number | boolean): void;
    /**
     * Handles the end of an animation.
     * @param event - The event arguments.
     */
    onTransitionEnd(event?: any): boolean;
    /**
     * Gets viewport width.
     * @returns - The width in pixel.
     */
    private _viewport;
    /**
     * Sets _items
     * @param content The list of slides put into CarouselSlideDirectives.
     */
    setItems(content: CarouselSlideDirective[]): void;
    /**
     * Sets slidesData using this._items
     */
    private _defineSlidesData;
    /**
     * Sets current classes for slide
     * @param slide Slide of carousel
     * @returns object with names of css-classes which are keys and true/false values
     */
    setCurSlideClasses(slide: SlideModel): {
        [key: string]: boolean;
    };
    /**
     * Operators to calculate right-to-left and left-to-right.
     * @param a - The left side operand.
     * @param o - The operator.
     * @param b - The right side operand.
     * @returns true/false meaning right-to-left or left-to-right
     */
    private _op;
    /**
     * Triggers a public event.
     * @todo Remove `status`, `relatedTarget` should be used instead.
     * @param name The event name.
     * @param data The event data.
     * @param namespace The event namespace.
     * @param state The state which is associated with the event.
     * @param enter Indicates if the call enters the specified state or not.
     */
    private _trigger;
    /**
     * Enters a state.
     * @param name - The state name.
     */
    enter(name: string): void;
    /**
     * Leaves a state.
     * @param name - The state name.
     */
    leave(name: string): void;
    /**
     * Registers an event or state.
     * @param object - The event or state to register.
     */
    register(object: any): void;
    /**
     * Suppresses events.
     * @param events The events to suppress.
     */
    private _suppress;
    /**
     * Releases suppressed events.
     * @param events The events to release.
     */
    private _release;
    /**
     * Gets unified pointer coordinates from event.
     * @todo #261
     * @param event The `mousedown` or `touchstart` event.
     * @returns Object Coords which contains `x` and `y` coordinates of current pointer position.
     */
    pointer(event: any): Coords;
    /**
     * Determines if the input is a Number or something that can be coerced to a Number
     * @param number The input to be tested
     * @returns An indication if the input is a Number or can be coerced to a Number
     */
    private _isNumeric;
    /**
     * Determines whether value is number or boolean type
     * @param value The input to be tested
     * @returns An indication if the input is a Number or can be coerced to a Number, or Boolean
     */
    private _isNumberOrBoolean;
    /**
     * Determines whether value is number or string type
     * @param value The input to be tested
     * @returns An indication if the input is a Number or can be coerced to a Number, or String
     */
    private _isNumberOrString;
    /**
     * Determines whether value is number or string type
     * @param value The input to be tested
     * @returns An indication if the input is a Number or can be coerced to a Number, or String
     */
    private _isStringOrBoolean;
    /**
     * Gets the difference of two vectors.
     * @todo #261
     * @param first The first vector.
     * @param second The second vector.
     * @returns The difference.
     */
    difference(first: Coords, second: Coords): Coords;
    static ɵfac: i0.ɵɵFactoryDeclaration<CarouselService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CarouselService>;
}

declare class NavigationService implements OnDestroy {
    private carouselService;
    /**
     * Subscrioption to merge Observable  from CarouselService
     */
    navSubscription: Subscription;
    /**
     * Indicates whether the plugin is initialized or not.
     */
    protected _initialized: boolean;
    /**
     * The current paging indexes.
     */
    protected _pages: any[];
    /**
     * Data for navigation elements of the user interface.
     */
    protected _navData: NavData;
    /**
     * Data for dot elements of the user interface.
     */
    protected _dotsData: DotsData;
    constructor(carouselService: CarouselService);
    ngOnDestroy(): void;
    /**
     * Defines Observables which service must observe
     */
    spyDataStreams(): void;
    /**
     * Initializes the layout of the plugin and extends the carousel.
     */
    initialize(): void;
    /**
     * Calculates internal states and updates prop _pages
     */
    private _updateNavPages;
    /**
     * Draws the user interface.
     * @todo The option `dotsData` wont work.
     */
    draw(): void;
    /**
     * Updates navigation buttons's and dots's states
     */
    update(): void;
    /**
     * Changes state of nav buttons (disabled, enabled)
     */
    private _updateNavButtons;
    /**
     * Changes active dot if page becomes changed
     */
    private _updateDots;
    /**
     * Gets the current page position of the carousel.
     * @returns the current page position of the carousel
     */
    private _current;
    /**
     * Gets the current succesor/predecessor position.
     * @param sussessor position of slide
     * @returns the current succesor/predecessor position
     */
    private _getPosition;
    /**
     * Slides to the next item or page.
     * @param speed The time in milliseconds for the transition.
     */
    next(speed: number | boolean): void;
    /**
     * Slides to the previous item or page.
     * @param speed The time in milliseconds for the transition.
     */
    prev(speed: number | boolean): void;
    /**
   * Slides to the specified item or page.
   * @param position - The position of the item or page.
   * @param speed - The time in milliseconds for the transition.
   * @param standard - Whether to use the standard behaviour or not. Default meaning false
   */
    to(position: number, speed: number | boolean, standard?: boolean): void;
    /**
     * Moves carousel after user's clicking on any dots
     */
    moveByDot(dotId: string): void;
    /**
     * rewinds carousel to slide with needed id
     * @param id id of slide
     */
    toSlideById(id: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NavigationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NavigationService>;
}

declare class AutoplayService implements OnDestroy {
    private carouselService;
    private ngZone;
    /**
     * Subscrioption to merge Observables from CarouselService
     */
    autoplaySubscription: Subscription;
    /**
     * The autoplay timeout.
     */
    private _timeout;
    /**
     * Indicates whenever the autoplay is paused.
     */
    private _paused;
    /**
     * Shows whether the code (the plugin) changed the option 'AutoplayTimeout' for own needs
     */
    private _isArtificialAutoplayTimeout;
    /**
     * Shows whether the autoplay is paused for unlimited time by the developer.
     * Use to prevent autoplaying in case of firing `mouseleave` by adding layers to `<body>` like `mat-menu` does
     */
    private _isAutoplayStopped;
    get isAutoplayStopped(): boolean;
    set isAutoplayStopped(value: boolean);
    private winRef;
    private docRef;
    constructor(carouselService: CarouselService, winRef: any, docRef: any, ngZone: NgZone);
    ngOnDestroy(): void;
    /**
     * Defines Observables which service must observe
     */
    spyDataStreams(): void;
    /**
       * Starts the autoplay.
       * @param timeout The interval before the next animation starts.
       * @param speed The animation speed for the animations.
       */
    play(timeout?: number, speed?: number): void;
    /**
       * Gets a new timeout
       * @param timeout - The interval before the next animation starts.
       * @param speed - The animation speed for the animations.
       * @return
       */
    private _getNextTimeout;
    /**
       * Sets autoplay in motion.
       */
    private _setAutoPlayInterval;
    /**
     * Stops the autoplay.
     */
    stop(): void;
    /**
       * Stops the autoplay.
       */
    pause(): void;
    /**
     * Manages by autoplaying according to data passed by _changedSettingsCarousel$ Obsarvable
     * @param data object with current position of carousel and type of change
     */
    private _handleChangeObservable;
    /**
     * Starts autoplaying of the carousel in the case when user leaves the carousel before it starts translateing (moving)
     */
    private _playAfterTranslated;
    /**
     * Starts pausing
     */
    startPausing(): void;
    /**
     * Starts playing after mouse leaves carousel
     */
    startPlayingMouseLeave(): void;
    /**
     * Starts playing after touch ends
     */
    startPlayingTouchEnd(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AutoplayService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AutoplayService>;
}

declare class LazyLoadService implements OnDestroy {
    private carouselService;
    /**
     * Subscrioption to merge Observable  from CarouselService
     */
    lazyLoadSubscription: Subscription;
    constructor(carouselService: CarouselService);
    ngOnDestroy(): void;
    /**
     * Defines Observables which service must observe
     */
    spyDataStreams(): void;
    private _defineLazyLoadSlides;
    /**
       * Loads all resources of an item at the specified position.
       * @param position - The absolute position of the item.
       */
    private _load;
    static ɵfac: i0.ɵɵFactoryDeclaration<LazyLoadService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LazyLoadService>;
}

declare class AnimateService implements OnDestroy {
    private carouselService;
    /**
     * Subscrioption to merge Observable  from CarouselService
     */
    animateSubscription: Subscription;
    /**
     * s
     */
    swapping: boolean;
    /**
     * active slide before translating
     */
    previous: any;
    /**
     * new active slide after translating
     */
    next: any;
    constructor(carouselService: CarouselService);
    ngOnDestroy(): void;
    /**
     * Defines Observables which service must observe
     */
    spyDataStreams(): void;
    /**
       * Toggles the animation classes whenever an translations starts.
       * @returns
       */
    private _swap;
    /**
     * Handles the end of 'animationend' event
     * @param id Id of slides
     */
    clear(id: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AnimateService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AnimateService>;
}

declare class AutoHeightService implements OnDestroy {
    private carouselService;
    /**
     * Subscrioption to merge Observable  from CarouselService
     */
    autoHeightSubscription: Subscription;
    constructor(carouselService: CarouselService);
    ngOnDestroy(): void;
    /**
     * Defines Observables which service must observe
     */
    spyDataStreams(): void;
    /**
     * Updates the prop 'heightState' of slides
     */
    update(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AutoHeightService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AutoHeightService>;
}

declare class HashService implements OnDestroy {
    private carouselService;
    private route;
    private router;
    /**
     * Subscription to merge Observable from CarouselService
     */
    hashSubscription: Subscription;
    /**
     * Current url fragment (hash)
     */
    currentHashFragment: string;
    constructor(carouselService: CarouselService, route: ActivatedRoute, router: Router);
    ngOnDestroy(): void;
    /**
     * Defines Observables which service must observe
     */
    spyDataStreams(): void;
    /**
     * rewinds carousel to slide which has the same hashFragment as fragment of current url
     * @param fragment fragment of url
     */
    rewind(fragment: string): void;
    /**
     * Initiate listening to ActivatedRoute.fragment
     */
    listenToRoute(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<HashService, [null, { optional: true; }, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<HashService>;
}

/**
 * Data which will be passed out after ending of transition of carousel
 */
declare class SlidesOutputData {
    startPosition?: number;
    slides?: SlideModel[];
}

declare class CarouselComponent implements OnInit, OnDestroy, AfterContentInit {
    private el;
    private resizeService;
    private carouselService;
    private navigationService;
    private autoplayService;
    private lazyLoadService;
    private animateService;
    private autoHeightService;
    private hashService;
    private logger;
    private changeDetectorRef;
    slides: QueryList<CarouselSlideDirective>;
    translated: i0.OutputEmitterRef<SlidesOutputData>;
    dragging: i0.OutputEmitterRef<{
        dragging: boolean;
        data: SlidesOutputData;
    }>;
    change: i0.OutputEmitterRef<SlidesOutputData>;
    changed: i0.OutputEmitterRef<SlidesOutputData>;
    initialized: i0.OutputEmitterRef<SlidesOutputData>;
    /**
     * Width of carousel window (tag with class .owl-carousel), in wich we can see moving sliders
     */
    carouselWindowWidth: number;
    /**
     * Subscription to 'resize' event
     */
    resizeSubscription: Subscription;
    /**
     * Subscription merge Observable, which merges all Observables in the component except 'resize' Observable and this.slides.changes()
     */
    private _allObservSubscription;
    /**
     * Subscription to `this.slides.changes().
     * It could be included in 'this._allObservSubscription', but that subcription get created during the initializing of component
     * and 'this.slides' are undefined at that moment. So it's needed to wait for initialization of content.
     */
    private _slidesChangesSubscription;
    /**
     * Current settings for the carousel.
     */
    private _owlDOMData;
    owlDOMData: Signal<OwlDOMData>;
    /**
     * Data of owl-stage
     */
    private _stageData;
    stageData: Signal<StageData>;
    /**
     *  Data of every slide
     */
    private _slidesData;
    slidesData: Signal<SlideModel[]>;
    /**
     * Data of navigation block
     */
    private _navData;
    navData: Signal<NavData>;
    /**
     * Data of dots block
     */
    private _dotsData;
    dotsData: Signal<DotsData>;
    /**
     * Data, wich are passed out of carousel after ending of transioning of carousel
     */
    slidesOutputData: SlidesOutputData;
    /**
     * Shows whether carousel is loaded of not.
     */
    private _carouselLoaded;
    carouselLoaded: Signal<boolean>;
    /**
     * User's options
     */
    options: i0.InputSignal<OwlOptions>;
    /**
     * Observable for user's options
     * It is used to track changes of options and re-render carousel if needed
     */
    private _options$;
    /**
     * Previous options, used for checking whether options were changed
     */
    private _optionsPrevAndCur$;
    /**
     * Observable for getting current View Settings
     */
    private _viewCurSettings$;
    /**
     * Observable for catching the end of transition of carousel
     */
    private _translatedCarousel$;
    /**
     * Observable for catching the start of dragging of the carousel
     */
    private _draggingCarousel$;
    /**
     * Observable for catching the start of changing of the carousel
     */
    private _changeCarousel$;
    /**
     * Observable for catching the moment when the data about slides changed, more exactly when the position changed.
     */
    private _changedCarousel$;
    /**
     * Observable for catching the initialization of changing the carousel
     */
    private _initializedCarousel$;
    /**
     * Observable for merging all Observables and creating one subscription
     */
    private _carouselMerge$;
    private docRef;
    constructor(el: ElementRef, resizeService: ResizeService, carouselService: CarouselService, navigationService: NavigationService, autoplayService: AutoplayService, lazyLoadService: LazyLoadService, animateService: AnimateService, autoHeightService: AutoHeightService, hashService: HashService, logger: OwlLogger, changeDetectorRef: ChangeDetectorRef, docRef: any);
    onVisibilityChange(ev: any): void;
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    /**
     * Joins the observable login in one place: sets values to some observables, merges this observables and
     * subcribes to merge func
     */
    spyDataStreams(): void;
    /**
     * Init subscription to resize event and attaches handler for this event
     */
    private _winResizeWatcher;
    /**
     * Handler for transitioend event
     */
    onTransitionEnd(): void;
    /**
     * Handler for click event, attached to next button
     */
    next(): void;
    /**
     * Handler for click event, attached to prev button
     */
    prev(): void;
    /**
     * Handler for click event, attached to dots
     */
    moveByDot(dotId: string): void;
    /**
     * rewinds carousel to slide with needed id
     * @param id fragment of url
     */
    to(id: string): void;
    /**
     * Gathers and prepares data intended for passing to the user by means of firing event translatedCarousel
     */
    gatherTranslatedData(): void;
    /**
     * Starts pausing
     */
    startPausing(): void;
    /**
     * Starts playing after mouse leaves carousel
     */
    startPlayML(): void;
    /**
     * Starts playing after touch ends
     */
    startPlayTE(): void;
    stopAutoplay(): void;
    startAutoplay(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CarouselComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CarouselComponent, "owl-carousel-o", never, { "options": { "alias": "options"; "required": false; "isSignal": true; }; }, { "translated": "translated"; "dragging": "dragging"; "change": "change"; "changed": "changed"; "initialized": "initialized"; }, ["slides"], never, false, never>;
}

declare class StageComponent implements OnInit, OnDestroy {
    private zone;
    private el;
    private renderer;
    private carouselService;
    private animateService;
    /**
     * Object with settings which make carousel draggable by touch or mouse
     */
    owlDraggable: i0.InputSignal<{
        isMouseDragable: boolean;
        isTouchDragable: boolean;
    }>;
    /**
     * Data of owl-stage
     */
    stageData: i0.InputSignal<StageData>;
    /**
     *  Data of every slide
     */
    slidesData: i0.InputSignal<SlideModel[]>;
    /**
     * Function wich will be returned after attaching listener to 'mousemove' event
     */
    listenerMouseMove: () => void;
    /**
     * Function wich will be returned after attaching listener to 'touchmove' event
     */
    listenerTouchMove: () => void;
    /**
     * Function wich will be returned after attaching listener to 'mousemove' event
     */
    listenerOneMouseMove: () => void;
    /**
     * Function wich will be returned after attaching listener to 'touchmove' event
     */
    listenerOneTouchMove: () => void;
    /**
     * Function wich will be returned after attaching listener to 'mouseup' event
     */
    listenerMouseUp: () => void;
    /**
     * Function wich will be returned after attaching listener to 'touchend' event
     */
    listenerTouchEnd: () => void;
    /**
     * Function wich will be returned after attaching listener to 'click' event
     */
    listenerOneClick: () => void;
    listenerATag: () => void;
    /**
     * Object with data needed for dragging
     */
    private _drag;
    /**
     * Subject for notification when the carousel's rebuilding caused by resize event starts
     */
    private _oneDragMove$;
    /**
     * Subsctiption to _oneDragMove$ Subject
     */
    private _oneMoveSubsription;
    preparePublicSlide: (slide: SlideModel) => SlideModel;
    constructor(zone: NgZone, el: ElementRef, renderer: Renderer2, carouselService: CarouselService, animateService: AnimateService);
    onMouseDown(event: any): void;
    onTouchStart(event: any): boolean;
    onTouchCancel(event: any): void;
    onDragStart(): boolean;
    onSelectStart(): boolean;
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * Passes this to _oneMouseTouchMove();
     */
    bindOneMouseTouchMove: (ev: any) => void;
    /**
     * Passes this to _onDragMove();
     */
    bindOnDragMove: (ev: any) => void;
    /**
     * Passes this to _onDragMove();
     */
    bindOnDragEnd: (ev: any) => void;
    /**
     * Handles `touchstart` and `mousedown` events.
     * @todo Horizontal swipe threshold as option
     * @todo #261
     * @param event - The event arguments.
     */
    private _onDragStart;
    /**
     * Attaches listeners to `touchmove` and `mousemove` events; initiates updating carousel after starting dragging
     * @param event event objech of mouse or touch event
     */
    private _oneMouseTouchMove;
    /**
     * Attaches handler to HTMLAnchorElement for preventing click while carousel is being dragged
     * @param event event object
     */
    private blockClickAnchorInDragging;
    /**
   * Handles the `touchmove` and `mousemove` events.
   * @todo #261
   * @param event - The event arguments.
   */
    private _onDragMove;
    /**
     * Moves .owl-stage left-right
     * @param coordinate coordinate to be set to .owl-stage
     */
    private _animate;
    /**
     * Handles the `touchend` and `mouseup` events.
     * @todo #261
     * @todo Threshold for click event
     * @param event - The event arguments.
     */
    private _onDragEnd;
    /**
     * Prepares data for dragging carousel. It starts after firing `touchstart` and `mousedown` events.
     * @param event - The event arguments.
     * @returns stage - object with 'x' and 'y' coordinates of .owl-stage
     */
    private _prepareDragging;
    /**
     * Attaches handler for 'click' event on any element in .owl-stage in order to prevent dragging when moving of cursor is less than 3px
     */
    private _oneClickHandler;
    /**
     * Finishes dragging
     * @param event object event of 'mouseUp' of 'touchend' events
     */
    private _finishDragging;
    /**
     * Gets unified pointer coordinates from event.
     * @param event The `mousedown` or `touchstart` event.
     * @returns Contains `x` and `y` coordinates of current pointer position.
     */
    private _pointer;
    /**
     * Gets the difference of two vectors.
     * @param first The first vector.
     * @param second The second vector.
     * @returns The difference.
     */
    private _difference;
    /**
     * Checks whether the carousel is in a specific state or not.
     * @param specificState The state to check.
     * @returns The flag which indicates if the carousel is busy.
     */
    private _is;
    /**
    * Enters a state.
    * @param name The state name.
    */
    private _enter;
    /**
     * Sends all data needed for View.
     */
    private _sendChanges;
    /**
     * Handler for transitioend event
     */
    onTransitionEnd(): void;
    /**
     * Enters into a 'dragging' state
     */
    private _enterDragging;
    /**
     * Handles the end of 'animationend' event
     * @param id Id of slides
     */
    clear(id: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<StageComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<StageComponent, "owl-stage", never, { "owlDraggable": { "alias": "owlDraggable"; "required": false; "isSignal": true; }; "stageData": { "alias": "stageData"; "required": false; "isSignal": true; }; "slidesData": { "alias": "slidesData"; "required": false; "isSignal": true; }; }, {}, never, never, false, never>;
}

type QueryParamsHandling = 'merge' | 'preserve' | '';
declare class OwlRouterLinkDirective {
    private router;
    private route;
    queryParams: {
        [k: string]: any;
    };
    fragment: string;
    queryParamsHandling: QueryParamsHandling;
    preserveFragment: boolean;
    skipLocationChange: boolean;
    replaceUrl: boolean;
    stopLink: boolean;
    private commands;
    private preserve;
    constructor(router: Router, route: ActivatedRoute, tabIndex: string, renderer: Renderer2, el: ElementRef);
    set owlRouterLink(commands: any[] | string);
    /**
     * @deprecated 4.0.0 use `queryParamsHandling` instead.
     */
    set preserveQueryParams(value: boolean);
    onClick(): boolean;
    get urlTree(): UrlTree;
    static ɵfac: i0.ɵɵFactoryDeclaration<OwlRouterLinkDirective, [null, null, { attribute: "tabindex"; }, null, null]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<OwlRouterLinkDirective, ":not(a)[owlRouterLink]", never, { "queryParams": { "alias": "queryParams"; "required": false; }; "fragment": { "alias": "fragment"; "required": false; }; "queryParamsHandling": { "alias": "queryParamsHandling"; "required": false; }; "preserveFragment": { "alias": "preserveFragment"; "required": false; }; "skipLocationChange": { "alias": "skipLocationChange"; "required": false; }; "replaceUrl": { "alias": "replaceUrl"; "required": false; }; "stopLink": { "alias": "stopLink"; "required": false; }; "owlRouterLink": { "alias": "owlRouterLink"; "required": false; }; "preserveQueryParams": { "alias": "preserveQueryParams"; "required": false; }; }, {}, never, never, false, never>;
}
/**
 * @description
 *
 * Lets you link to specific routes in your app.
 *
 * See `RouterLink` for more information.
 *
 * @ngModule RouterModule
 *
 * @publicApi
 */
declare class OwlRouterLinkWithHrefDirective implements OnChanges, OnDestroy {
    private router;
    private route;
    private locationStrategy;
    target: string;
    queryParams: {
        [k: string]: any;
    };
    fragment: string;
    queryParamsHandling: QueryParamsHandling;
    preserveFragment: boolean;
    skipLocationChange: boolean;
    replaceUrl: boolean;
    stopLink: boolean;
    private commands;
    private subscription;
    private preserve;
    href: string;
    constructor(router: Router, route: ActivatedRoute, locationStrategy: LocationStrategy);
    set owlRouterLink(commands: any[] | string);
    set preserveQueryParams(value: boolean);
    ngOnChanges(changes: {}): any;
    ngOnDestroy(): any;
    onClick(button: number, ctrlKey: boolean, metaKey: boolean, shiftKey: boolean): boolean;
    private updateTargetUrlAndHref;
    get urlTree(): UrlTree;
    static ɵfac: i0.ɵɵFactoryDeclaration<OwlRouterLinkWithHrefDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<OwlRouterLinkWithHrefDirective, "a[owlRouterLink]", never, { "target": { "alias": "target"; "required": false; }; "queryParams": { "alias": "queryParams"; "required": false; }; "fragment": { "alias": "fragment"; "required": false; }; "queryParamsHandling": { "alias": "queryParamsHandling"; "required": false; }; "preserveFragment": { "alias": "preserveFragment"; "required": false; }; "skipLocationChange": { "alias": "skipLocationChange"; "required": false; }; "replaceUrl": { "alias": "replaceUrl"; "required": false; }; "stopLink": { "alias": "stopLink"; "required": false; }; "owlRouterLink": { "alias": "owlRouterLink"; "required": false; }; "preserveQueryParams": { "alias": "preserveQueryParams"; "required": false; }; }, {}, never, never, false, never>;
}

declare class CarouselModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<CarouselModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<CarouselModule, [typeof CarouselComponent, typeof CarouselSlideDirective, typeof StageComponent, typeof OwlRouterLinkDirective, typeof OwlRouterLinkWithHrefDirective], [typeof i5.CommonModule], [typeof CarouselComponent, typeof CarouselSlideDirective, typeof OwlRouterLinkDirective, typeof OwlRouterLinkWithHrefDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<CarouselModule>;
}

export { CarouselComponent, CarouselModule, CarouselSlideDirective, OwlRouterLinkDirective, OwlRouterLinkWithHrefDirective, SlideModel, SlidesOutputData };
export type { BreakpointOptions, OwlOptions, ResponsiveSettings };
