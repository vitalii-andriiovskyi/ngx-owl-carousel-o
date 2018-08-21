import { StageData } from '../models/stage-data.model';
import { OwlDOMData } from '../models/owlDOM-data.model';
import { CarouselSlideDirective } from '../carousel/carousel.module';
import { SlideModel } from '../models/slide.model';
import { Observable } from 'rxjs';
import { OwlOptions } from '../models/owl-options.model';
import { NavData, DotsData } from '../models/navigation-data.models';
/**
 * Current state information and their tags.
 */
export declare class States {
    current: {};
    tags: {
        [key: string]: string[];
    };
}
/**
 * Enumeration for types.
 * @enum {String}
 */
export declare enum Type {
    Event = "event",
    State = "state",
}
/**
 * Enumeration for width.
 * @enum {String}
 */
export declare enum Width {
    Default = "default",
    Inner = "inner",
    Outer = "outer",
}
/**
 * Model for coords of .owl-stage
 */
export declare class Coords {
    x: number;
    y: number;
}
/**
 * Model for all current data of carousel
 */
export declare class CarouselCurrentData {
    owlDOMData: OwlDOMData;
    stageData: StageData;
    slidesData: SlideModel[];
    navData: NavData;
    dotsData: DotsData;
}
export declare class CarouselService {
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
    readonly _mergers: any[];
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
    readonly invalidated: any;
    /**
     * Current state information and their tags.
     */
    private _states;
    readonly states: States;
    /**
     * Ordered list of workers for the update process.
   */
    private _pipe;
    constructor();
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
    private _validateOptions(options, configOptions);
    /**
     * Checks option items set by user and if it bigger than number of slides then returns number of slides
     * @param items option items set by user
     * @returns right number of items
     */
    private _validateItems(items);
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
     * Set number of items for current viewport
     */
    setViewportItemsN(): void;
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
    private _optionsLogic();
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
    current(position?: number): number;
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
    normalize(position: number, relative?: boolean): number;
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
    private _duration(from, to, factor?);
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
    private _viewport();
    /**
       * Sets _items
       * @param content The list of slides put into CarouselSlideDirectives.
       */
    setItems(content: CarouselSlideDirective[]): void;
    /**
     * Sets slidesData using this._items
     */
    private _defineSlidesData();
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
    private _op(a, o, b);
    /**
       * Triggers a public event.
       * @todo Remove `status`, `relatedTarget` should be used instead.
       * @param name The event name.
       * @param data The event data.
       * @param namespace The event namespace.
       * @param state The state which is associated with the event.
       * @param enter Indicates if the call enters the specified state or not.
       */
    private _trigger(name, data?, namespace?, state?, enter?);
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
    private _suppress(events);
    /**
       * Releases suppressed events.
       * @param events The events to release.
       */
    private _release(events);
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
    private _isNumeric(number);
    /**
     * Determines whether value is number or boolean type
     * @param value The input to be tested
     * @returns An indication if the input is a Number or can be coerced to a Number, or Boolean
     */
    private _isNumberOrBoolean(value);
    /**
     * Determines whether value is number or string type
     * @param value The input to be tested
     * @returns An indication if the input is a Number or can be coerced to a Number, or String
     */
    private _isNumberOrString(value);
    /**
     * Determines whether value is number or string type
     * @param value The input to be tested
     * @returns An indication if the input is a Number or can be coerced to a Number, or String
     */
    private _isStringOrBoolean(value);
    /**
       * Gets the difference of two vectors.
       * @todo #261
       * @param first The first vector.
       * @param second- The second vector.
       * @returns The difference.
       */
    difference(first: Coords, second: Coords): Coords;
}
