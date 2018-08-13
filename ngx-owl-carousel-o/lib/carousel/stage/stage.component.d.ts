import { NgZone, ElementRef, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { CarouselService } from '../../services/carousel.service';
import { StageData } from '../../models/stage-data.model';
import { SliderModel } from '../../models/slider.model';
export declare class StageComponent implements OnInit, OnDestroy {
    private zone;
    private el;
    private renderer;
    private carouselService;
    /**
     * Object with settings which make carousel draggable by touch or mouse
     */
    owlDraggable: {
        isMouseDragable: boolean;
        isTouchDragable: boolean;
    };
    /**
     * Data of owl-stage
     */
    stageData: StageData;
    /**
     *  Data of every slide
     */
    slidesData: SliderModel[];
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
    constructor(zone: NgZone, el: ElementRef, renderer: Renderer2, carouselService: CarouselService);
    onMouseDown(event: any): void;
    onTouchStart(event: any): void;
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
    private _onDragStart(event);
    /**
     * Attaches listeners to `touchmove` and `mousemove` events; initiates updating carousel after starting dragging
     * @param event event objech of mouse or touch event
     */
    private _oneMouseTouchMove(event);
    /**
     * Handles the `touchmove` and `mousemove` events.
     * @todo #261
     * @param event - The event arguments.
     */
    private _onDragMove(event);
    /**
     * Moves .owl-stage left-right
     * @param coordinate coordinate to be set to .owl-stage
     */
    private _animate(coordinate);
    /**
       * Handles the `touchend` and `mouseup` events.
       * @todo #261
       * @todo Threshold for click event
       * @param event - The event arguments.
       */
    private _onDragEnd(event);
    /**
       * Prepares data for dragging carousel. It starts after firing `touchstart` and `mousedown` events.
       * @param event - The event arguments.
       * @returns stage - object with 'x' and 'y' coordinates of .owl-stage
       */
    private _prepareDragging(event);
    /**
     * Attaches handler for 'click' event on any element in .owl-stage in order to prevent dragging when moving of cursor is less than 3px
     */
    private _oneClickHandler;
    /**
     * Finishes dragging
     * @param event object event of 'mouseUp' of 'touchend' events
     */
    private _finishDragging(event);
    /**
       * Gets unified pointer coordinates from event.
       * @param event The `mousedown` or `touchstart` event.
       * @returns Contains `x` and `y` coordinates of current pointer position.
       */
    private _pointer(event);
    /**
       * Gets the difference of two vectors.
       * @param first The first vector.
       * @param second- The second vector.
       * @returns The difference.
       */
    private _difference(firstC, second);
    /**
       * Checks whether the carousel is in a specific state or not.
       * @param state The state to check.
       * @returns The flag which indicates if the carousel is busy.
       */
    private _is(state);
    /**
    * Enters a state.
    * @param name The state name.
    */
    private _enter(name);
    /**
       * Sends all data needed for View.
       */
    private _sendChanges();
    /**
     * Handler for transitioend event
     */
    onTransitionEnd(): void;
}
