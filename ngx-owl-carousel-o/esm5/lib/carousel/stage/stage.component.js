/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, NgZone, ElementRef, HostListener, Renderer2, Input } from '@angular/core';
import { CarouselService } from '../../services/carousel.service';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { StageData } from '../../models/stage-data.model';
import { AnimateService } from '../../services/animate.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
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
    StageComponent.prototype.onMouseDown = function (event) {
        if (this.owlDraggable.isMouseDragable) {
            this._onDragStart(event);
        }
    };
    StageComponent.prototype.onTouchStart = function (event) {
        if (this.owlDraggable.isTouchDragable) {
            this._onDragStart(event);
        }
    };
    StageComponent.prototype.onTouchCancel = function (event) {
        this._onDragEnd(event);
    };
    StageComponent.prototype.onDragStart = function () {
        if (this.owlDraggable.isMouseDragable) {
            return false;
        }
    };
    StageComponent.prototype.onSelectStart = function () {
        if (this.owlDraggable.isMouseDragable) {
            return false;
        }
    };
    StageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._oneMoveSubsription = this._oneDragMove$
            .pipe(first())
            .subscribe(function () {
            _this._sendChanges();
        });
    };
    StageComponent.prototype.ngOnDestroy = function () {
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
     * @private
     * @param {?} event - The event arguments.
     * @return {?}
     */
    StageComponent.prototype._onDragStart = /**
     * Handles `touchstart` and `mousedown` events.
     * \@todo Horizontal swipe threshold as option / #261
     * @private
     * @param {?} event - The event arguments.
     * @return {?}
     */
    function (event) {
        var _this = this;
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
     * @private
     * @param {?} event event objech of mouse or touch event
     * @return {?}
     */
    StageComponent.prototype._oneMouseTouchMove = /**
     * Attaches listeners to `touchmove` and `mousemove` events; initiates updating carousel after starting dragging
     * @private
     * @param {?} event event objech of mouse or touch event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var delta = this._difference(this._drag.pointer, this._pointer(event));
        if (this.listenerATag) {
            this.listenerATag();
        }
        if (Math.abs(delta.x) < 3 && Math.abs(delta.y) < 3 && this._is('valid')) {
            return;
        }
        if ((Math.abs(delta.x) < 3 && Math.abs(delta.x) < Math.abs(delta.y)) && this._is('valid')) {
            return;
        }
        this.listenerOneMouseMove();
        this.listenerOneTouchMove();
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
     * @private
     * @param {?} event event object
     * @return {?}
     */
    StageComponent.prototype.blockClickAnchorInDragging = /**
     * Attaches handler to HTMLAnchorElement for preventing click while carousel is being dragged
     * @private
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
     * @private
     * @param {?} event - The event arguments.
     * @return {?}
     */
    StageComponent.prototype._onDragMove = /**
     * Handles the `touchmove` and `mousemove` events.
     * \@todo #261
     * @private
     * @param {?} event - The event arguments.
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var stage;
        var stageOrExit = this.carouselService.defineNewCoordsDrag(event, this._drag);
        if (stageOrExit === false) {
            return;
        }
        stage = stageOrExit;
        event.preventDefault();
        this._drag.stage.current = stage;
        this._animate(stage.x - this._drag.stage.start.x);
    };
    ;
    /**
     * Moves .owl-stage left-right
     * @param coordinate coordinate to be set to .owl-stage
     */
    /**
     * Moves .owl-stage left-right
     * @private
     * @param {?} coordinate coordinate to be set to .owl-stage
     * @return {?}
     */
    StageComponent.prototype._animate = /**
     * Moves .owl-stage left-right
     * @private
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
     * @private
     * @param {?} event - The event arguments.
     * @return {?}
     */
    StageComponent.prototype._onDragEnd = /**
     * Handles the `touchend` and `mouseup` events.
     * \@todo #261 / Threshold for click event
     * @private
     * @param {?} event - The event arguments.
     * @return {?}
     */
    function (event) {
        this.carouselService.owlDOMData.isGrab = false;
        this.listenerOneMouseMove();
        this.listenerOneTouchMove();
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
    ;
    /**
       * Prepares data for dragging carousel. It starts after firing `touchstart` and `mousedown` events.
       * @param event - The event arguments.
       * @returns stage - object with 'x' and 'y' coordinates of .owl-stage
       */
    /**
     * Prepares data for dragging carousel. It starts after firing `touchstart` and `mousedown` events.
     * @private
     * @param {?} event - The event arguments.
     * @return {?} stage - object with 'x' and 'y' coordinates of .owl-stage
     */
    StageComponent.prototype._prepareDragging = /**
     * Prepares data for dragging carousel. It starts after firing `touchstart` and `mousedown` events.
     * @private
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
     * @private
     * @param {?} event object event of 'mouseUp' of 'touchend' events
     * @return {?}
     */
    StageComponent.prototype._finishDragging = /**
     * Finishes dragging
     * @private
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
     * @private
     * @param {?} event The `mousedown` or `touchstart` event.
     * @return {?} Contains `x` and `y` coordinates of current pointer position.
     */
    StageComponent.prototype._pointer = /**
     * Gets unified pointer coordinates from event.
     * @private
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
     * @private
     * @param {?} firstC
     * @param {?} second
     * @return {?} The difference.
     */
    StageComponent.prototype._difference = /**
     * Gets the difference of two vectors.
     * @private
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
     * @private
     * @param {?} specificState The state to check.
     * @return {?} The flag which indicates if the carousel is busy.
     */
    StageComponent.prototype._is = /**
     * Checks whether the carousel is in a specific state or not.
     * @private
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
     * @private
     * @param {?} name The state name.
     * @return {?}
     */
    StageComponent.prototype._enter = /**
     * Enters a state.
     * @private
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
     * @private
     * @return {?}
     */
    StageComponent.prototype._sendChanges = /**
     * Sends all data needed for View.
     * @private
     * @return {?}
     */
    function () {
        this.carouselService.sendChanges();
    };
    /**
     * Handler for transitioend event
     */
    StageComponent.prototype.onTransitionEnd = function () {
        this.carouselService.onTransitionEnd();
    };
    /**
       * Enters into a 'dragging' state
       */
    /**
     * Enters into a 'dragging' state
     * @private
     * @return {?}
     */
    StageComponent.prototype._enterDragging = /**
     * Enters into a 'dragging' state
     * @private
     * @return {?}
     */
    function () {
        this.carouselService.enterDragging();
    };
    /**
     * Handles the end of 'animationend' event
     * @param id Id of slides
     */
    StageComponent.prototype.clear = function (id) {
        this.animateService.clear(id);
    };
    StageComponent.decorators = [
        { type: Component, args: [{
                    selector: 'owl-stage',
                    template: "\n    <div>\n      <div class=\"owl-stage\" [ngStyle]=\"{'width': stageData.width + 'px',\n                                        'transform': stageData.transform,\n                                        'transition': stageData.transition,\n                                        'padding-left': stageData.paddingL ? stageData.paddingL + 'px' : '',\n                                        'padding-right': stageData.paddingR ? stageData.paddingR + 'px' : '' }\"\n          (transitionend)=\"onTransitionEnd()\">\n        <ng-container *ngFor=\"let slide of slidesData; let i = index\">\n          <div class=\"owl-item\" [ngClass]=\"slide.classes\"\n                                [ngStyle]=\"{'width': slide.width + 'px',\n                                            'margin-left': slide.marginL ? slide.marginL + 'px' : '',\n                                            'margin-right': slide.marginR ? slide.marginR + 'px' : '',\n                                            'left': slide.left}\"\n                                (animationend)=\"clear(slide.id)\"\n                                [@autoHeight]=\"slide.heightState\">\n            <ng-template *ngIf=\"slide.load\" [ngTemplateOutlet]=\"slide.tplRef\"></ng-template>\n          </div><!-- /.owl-item -->\n        </ng-container>\n      </div><!-- /.owl-stage -->\n    </div>\n  ",
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
export { StageComponent };
if (false) {
    /**
     * Object with settings which make carousel draggable by touch or mouse
     * @type {?}
     */
    StageComponent.prototype.owlDraggable;
    /**
     * Data of owl-stage
     * @type {?}
     */
    StageComponent.prototype.stageData;
    /**
     *  Data of every slide
     * @type {?}
     */
    StageComponent.prototype.slidesData;
    /**
     * Function wich will be returned after attaching listener to 'mousemove' event
     * @type {?}
     */
    StageComponent.prototype.listenerMouseMove;
    /**
     * Function wich will be returned after attaching listener to 'touchmove' event
     * @type {?}
     */
    StageComponent.prototype.listenerTouchMove;
    /**
     * Function wich will be returned after attaching listener to 'mousemove' event
     * @type {?}
     */
    StageComponent.prototype.listenerOneMouseMove;
    /**
     * Function wich will be returned after attaching listener to 'touchmove' event
     * @type {?}
     */
    StageComponent.prototype.listenerOneTouchMove;
    /**
     * Function wich will be returned after attaching listener to 'mouseup' event
     * @type {?}
     */
    StageComponent.prototype.listenerMouseUp;
    /**
     * Function wich will be returned after attaching listener to 'touchend' event
     * @type {?}
     */
    StageComponent.prototype.listenerTouchEnd;
    /**
     * Function wich will be returned after attaching listener to 'click' event
     * @type {?}
     */
    StageComponent.prototype.listenerOneClick;
    /** @type {?} */
    StageComponent.prototype.listenerATag;
    /**
     * Object with data needed for dragging
     * @type {?}
     * @private
     */
    StageComponent.prototype._drag;
    /**
     * Subject for notification when the carousel's rebuilding caused by resize event starts
     * @type {?}
     * @private
     */
    StageComponent.prototype._oneDragMove$;
    /**
     * Subsctiption to _oneDragMove$ Subject
     * @type {?}
     * @private
     */
    StageComponent.prototype._oneMoveSubsription;
    /**
     * Passes this to _oneMouseTouchMove();
     * @type {?}
     */
    StageComponent.prototype.bindOneMouseTouchMove;
    /**
     * Passes this to _onDragMove();
     * @type {?}
     */
    StageComponent.prototype.bindOnDragMove;
    /**
     * Passes this to _onDragMove();
     * @type {?}
     */
    StageComponent.prototype.bindOnDragEnd;
    /**
     * Attaches handler for 'click' event on any element in .owl-stage in order to prevent dragging when moving of cursor is less than 3px
     * @type {?}
     * @private
     */
    StageComponent.prototype._oneClickHandler;
    /**
     * @type {?}
     * @private
     */
    StageComponent.prototype.zone;
    /**
     * @type {?}
     * @private
     */
    StageComponent.prototype.el;
    /**
     * @type {?}
     * @private
     */
    StageComponent.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    StageComponent.prototype.carouselService;
    /**
     * @type {?}
     * @private
     */
    StageComponent.prototype.animateService;
    /* Skipping unhandled member: ;*/
    /* Skipping unhandled member: ;*/
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW93bC1jYXJvdXNlbC1vLyIsInNvdXJjZXMiOlsibGliL2Nhcm91c2VsL3N0YWdlL3N0YWdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQXFCLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqSCxPQUFPLEVBQUUsZUFBZSxFQUFVLE1BQU0saUNBQWlDLENBQUM7QUFDMUUsT0FBTyxFQUFFLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUUxRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDaEUsT0FBTyxFQUNMLE9BQU8sRUFDUCxLQUFLLEVBQ0wsS0FBSyxFQUNMLE9BQU8sRUFDUCxVQUFVLEVBQ1gsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QjtJQXFIRSx3QkFBb0IsSUFBWSxFQUNaLEVBQWMsRUFDZCxRQUFtQixFQUNuQixlQUFnQyxFQUNoQyxjQUE4QjtRQUpsRCxpQkFJdUQ7UUFKbkMsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNaLE9BQUUsR0FBRixFQUFFLENBQVk7UUFDZCxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUE5QmxEOztXQUVHO1FBQ0ssVUFBSyxHQUFRO1lBQ25CLElBQUksRUFBRSxJQUFJO1lBQ1YsTUFBTSxFQUFFLElBQUk7WUFDWixPQUFPLEVBQUUsSUFBSTtZQUNiLEtBQUssRUFBRTtnQkFDTCxLQUFLLEVBQUUsSUFBSTtnQkFDWCxPQUFPLEVB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O0lBSzNDLDZDQUEwQzs7Ozs7SUFtRDFDLCtDQUVDOzs7OztJQUtELHdDQUVDOzs7OztJQUtELHVDQUlDOzs7Ozs7SUE4SkQsMENBR0M7Ozs7O0lBcE9XLDhCQUFvQjs7Ozs7SUFDcEIsNEJBQXNCOzs7OztJQUN0QixrQ0FBMkI7Ozs7O0lBQzNCLHlDQUF3Qzs7Ozs7SUFDeEMsd0NBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBOZ1pvbmUsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgUmVuZGVyZXIyLCBPbkluaXQsIE9uRGVzdHJveSwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ2Fyb3VzZWxTZXJ2aWNlLCBDb29yZHMgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jYXJvdXNlbC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGZpcnN0IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBTdGFnZURhdGEgfSBmcm9tICcuLi8uLi9tb2RlbHMvc3RhZ2UtZGF0YS5tb2RlbCc7XHJcbmltcG9ydCB7IFNsaWRlTW9kZWwgfSBmcm9tICcuLi8uLi9tb2RlbHMvc2xpZGUubW9kZWwnO1xyXG5pbXBvcnQgeyBBbmltYXRlU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FuaW1hdGUuc2VydmljZSc7XHJcbmltcG9ydCB7XHJcbiAgdHJpZ2dlcixcclxuICBzdGF0ZSxcclxuICBzdHlsZSxcclxuICBhbmltYXRlLFxyXG4gIHRyYW5zaXRpb25cclxufSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdvd2wtc3RhZ2UnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwib3dsLXN0YWdlXCIgW25nU3R5bGVdPVwieyd3aWR0aCc6IHN0YWdlRGF0YS53aWR0aCArICdweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndHJhbnNmb3JtJzogc3RhZ2VEYXRhLnRyYW5zZm9ybSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0cmFuc2l0aW9uJzogc3RhZ2VEYXRhLnRyYW5zaXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncGFkZGluZy1sZWZ0Jzogc3RhZ2VEYXRhLnBhZGRpbmdMID8gc3RhZ2VEYXRhLnBhZGRpbmdMICsgJ3B4JyA6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3BhZGRpbmctcmlnaHQnOiBzdGFnZURhdGEucGFkZGluZ1IgPyBzdGFnZURhdGEucGFkZGluZ1IgKyAncHgnIDogJycgfVwiXHJcbiAgICAgICAgICAodHJhbnNpdGlvbmVuZCk9XCJvblRyYW5zaXRpb25FbmQoKVwiPlxyXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IHNsaWRlIG9mIHNsaWRlc0RhdGE7IGxldCBpID0gaW5kZXhcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJvd2wtaXRlbVwiIFtuZ0NsYXNzXT1cInNsaWRlLmNsYXNzZXNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cInsnd2lkdGgnOiBzbGlkZS53aWR0aCArICdweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ21hcmdpbi1sZWZ0Jzogc2xpZGUubWFyZ2luTCA/IHNsaWRlLm1hcmdpbkwgKyAncHgnIDogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ21hcmdpbi1yaWdodCc6IHNsaWRlLm1hcmdpblIgPyBzbGlkZS5tYXJnaW5SICsgJ3B4JyA6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdsZWZ0Jzogc2xpZGUubGVmdH1cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChhbmltYXRpb25lbmQpPVwiY2xlYXIoc2xpZGUuaWQpXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbQGF1dG9IZWlnaHRdPVwic2xpZGUuaGVpZ2h0U3RhdGVcIj5cclxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ0lmPVwic2xpZGUubG9hZFwiIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInNsaWRlLnRwbFJlZlwiPjwvbmctdGVtcGxhdGU+XHJcbiAgICAgICAgICA8L2Rpdj48IS0tIC8ub3dsLWl0ZW0gLS0+XHJcbiAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgIDwvZGl2PjwhLS0gLy5vd2wtc3RhZ2UgLS0+XHJcbiAgICA8L2Rpdj5cclxuICBgLFxyXG4gIGFuaW1hdGlvbnM6IFtcclxuICAgIHRyaWdnZXIoJ2F1dG9IZWlnaHQnLCBbXHJcbiAgICAgIHN0YXRlKCdudWxsZWQnLCBzdHlsZSh7aGVpZ2h0OiAwfSkpLFxyXG4gICAgICBzdGF0ZSgnZnVsbCcsIHN0eWxlKHtoZWlnaHQ6ICcqJ30pKSxcclxuICAgICAgdHJhbnNpdGlvbignZnVsbCA9PiBudWxsZWQnLCBbXHJcbiAgICAgICAgLy8gc3R5bGUoe2hlaWdodDogJyonfSksXHJcbiAgICAgICAgYW5pbWF0ZSgnNzAwbXMgMzUwbXMnKVxyXG4gICAgICBdKSxcclxuICAgICAgdHJhbnNpdGlvbignbnVsbGVkID0+IGZ1bGwnLCBbXHJcbiAgICAgICAgLy8gc3R5bGUoe2hlaWdodDogMH0pLFxyXG4gICAgICAgIGFuaW1hdGUoMzUwKVxyXG4gICAgICBdKSxcclxuICAgIF0pXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU3RhZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgLyoqXHJcbiAgICogT2JqZWN0IHdpdGggc2V0dGluZ3Mgd2hpY2ggbWFrZSBjYXJvdXNlbCBkcmFnZ2FibGUgYnkgdG91Y2ggb3IgbW91c2VcclxuICAgKi9cclxuICBASW5wdXQoKSBvd2xEcmFnZ2FibGU6IHtcclxuICAgIGlzTW91c2VEcmFnYWJsZTogYm9vbGVhbixcclxuICAgIGlzVG91Y2hEcmFnYWJsZTogYm9vbGVhblxyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIERhdGEgb2Ygb3dsLXN0YWdlXHJcbiAgICovXHJcbiAgQElucHV0KCkgc3RhZ2VEYXRhOiBTdGFnZURhdGE7XHJcblxyXG5cdC8qKlxyXG5cdCAqICBEYXRhIG9mIGV2ZXJ5IHNsaWRlXHJcblx0ICovXHJcbiAgQElucHV0KCkgc2xpZGVzRGF0YTogU2xpZGVNb2RlbFtdO1xyXG5cclxuICAvKipcclxuICAgKiBGdW5jdGlvbiB3aWNoIHdpbGwgYmUgcmV0dXJuZWQgYWZ0ZXIgYXR0YWNoaW5nIGxpc3RlbmVyIHRvICdtb3VzZW1vdmUnIGV2ZW50XHJcbiAgICovXHJcbiAgbGlzdGVuZXJNb3VzZU1vdmU6ICgpID0+IHZvaWQ7XHJcbiAgLyoqXHJcbiAgICogRnVuY3Rpb24gd2ljaCB3aWxsIGJlIHJldHVybmVkIGFmdGVyIGF0dGFjaGluZyBsaXN0ZW5lciB0byAndG91Y2htb3ZlJyBldmVudFxyXG4gICAqL1xyXG4gIGxpc3RlbmVyVG91Y2hNb3ZlOiAoKSA9PiB2b2lkO1xyXG4gIC8qKlxyXG4gICAqIEZ1bmN0aW9uIHdpY2ggd2lsbCBiZSByZXR1cm5lZCBhZnRlciBhdHRhY2hpbmcgbGlzdGVuZXIgdG8gJ21vdXNlbW92ZScgZXZlbnRcclxuICAgKi9cclxuICBsaXN0ZW5lck9uZU1vdXNlTW92ZTogKCkgPT4gdm9pZDtcclxuICAvKipcclxuICAgKiBGdW5jdGlvbiB3aWNoIHdpbGwgYmUgcmV0dXJuZWQgYWZ0ZXIgYXR0YWNoaW5nIGxpc3RlbmVyIHRvICd0b3VjaG1vdmUnIGV2ZW50XHJcbiAgICovXHJcbiAgbGlzdGVuZXJPbmVUb3VjaE1vdmU6ICgpID0+IHZvaWQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIEZ1bmN0aW9uIHdpY2ggd2lsbCBiZSByZXR1cm5lZCBhZnRlciBhdHRhY2hpbmcgbGlzdGVuZXIgdG8gJ21vdXNldXAnIGV2ZW50XHJcbiAgICovXHJcbiAgbGlzdGVuZXJNb3VzZVVwOiAoKSA9PiB2b2lkO1xyXG4gIC8qKlxyXG4gICAqIEZ1bmN0aW9uIHdpY2ggd2lsbCBiZSByZXR1cm5lZCBhZnRlciBhdHRhY2hpbmcgbGlzdGVuZXIgdG8gJ3RvdWNoZW5kJyBldmVudFxyXG4gICAqL1xyXG4gIGxpc3RlbmVyVG91Y2hFbmQ6ICgpID0+IHZvaWQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIEZ1bmN0aW9uIHdpY2ggd2lsbCBiZSByZXR1cm5lZCBhZnRlciBhdHRhY2hpbmcgbGlzdGVuZXIgdG8gJ2NsaWNrJyBldmVudFxyXG4gICAqL1xyXG4gIGxpc3RlbmVyT25lQ2xpY2s6ICgpID0+IHZvaWQ7XHJcblxyXG4gIGxpc3RlbmVyQVRhZzogKCkgPT4gdm9pZDtcclxuXHJcbiAgLyoqXHJcbiAgICogT2JqZWN0IHdpdGggZGF0YSBuZWVkZWQgZm9yIGRyYWdnaW5nXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZHJhZzogYW55ID0ge1xyXG4gICAgdGltZTogbnVsbCxcclxuICAgIHRhcmdldDogbnVsbCxcclxuICAgIHBvaW50ZXI6IG51bGwsXHJcbiAgICBzdGFnZToge1xyXG4gICAgICBzdGFydDogbnVsbCxcclxuICAgICAgY3VycmVudDogbnVsbFxyXG4gICAgfSxcclxuICAgIGRpcmVjdGlvbjogbnVsbCxcclxuICAgIGFjdGl2ZTogZmFsc2UsXHJcbiAgICBtb3Zpbmc6IGZhbHNlXHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uIHdoZW4gdGhlIGNhcm91c2VsJ3MgcmVidWlsZGluZyBjYXVzZWQgYnkgcmVzaXplIGV2ZW50IHN0YXJ0c1xyXG4gICAqL1xyXG4gIHByaXZhdGUgX29uZURyYWdNb3ZlJCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2N0aXB0aW9uIHRvIF9vbmVEcmFnTW92ZSQgU3ViamVjdFxyXG4gICAqL1xyXG4gIHByaXZhdGUgX29uZU1vdmVTdWJzcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHpvbmU6IE5nWm9uZSxcclxuICAgICAgICAgICAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICAgICAgICAgICAgICBwcml2YXRlIGNhcm91c2VsU2VydmljZTogQ2Fyb3VzZWxTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgYW5pbWF0ZVNlcnZpY2U6IEFuaW1hdGVTZXJ2aWNlKSB7IH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignbW91c2Vkb3duJywgWyckZXZlbnQnXSkgb25Nb3VzZURvd24oZXZlbnQpIHtcclxuICAgIGlmICh0aGlzLm93bERyYWdnYWJsZS5pc01vdXNlRHJhZ2FibGUpIHtcclxuICAgICAgdGhpcy5fb25EcmFnU3RhcnQoZXZlbnQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcigndG91Y2hzdGFydCcsIFsnJGV2ZW50J10pIG9uVG91Y2hTdGFydChldmVudCkge1xyXG4gICAgaWYgKHRoaXMub3dsRHJhZ2dhYmxlLmlzVG91Y2hEcmFnYWJsZSkge1xyXG4gICAgICB0aGlzLl9vbkRyYWdTdGFydChldmVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIFsnJGV2ZW50J10pIG9uVG91Y2hDYW5jZWwoZXZlbnQpIHtcclxuICAgIHRoaXMuX29uRHJhZ0VuZChldmVudCk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdkcmFnc3RhcnQnKSBvbkRyYWdTdGFydCgpIHtcclxuICAgIGlmICh0aGlzLm93bERyYWdnYWJsZS5pc01vdXNlRHJhZ2FibGUpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignc2VsZWN0c3RhcnQnKSBvblNlbGVjdFN0YXJ0KCkge1xyXG4gICAgaWYgKHRoaXMub3dsRHJhZ2dhYmxlLmlzTW91c2VEcmFnYWJsZSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuX29uZU1vdmVTdWJzcmlwdGlvbiA9IHRoaXMuX29uZURyYWdNb3ZlJFxyXG4gICAgICAucGlwZShmaXJzdCgpKVxyXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICB0aGlzLl9zZW5kQ2hhbmdlcygpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5fb25lTW92ZVN1YnNyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQYXNzZXMgdGhpcyB0byBfb25lTW91c2VUb3VjaE1vdmUoKTtcclxuICAgKi9cclxuICBiaW5kT25lTW91c2VUb3VjaE1vdmUgPSAoZXYpID0+IHtcclxuICAgIHRoaXMuX29uZU1vdXNlVG91Y2hNb3ZlKGV2KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFBhc3NlcyB0aGlzIHRvIF9vbkRyYWdNb3ZlKCk7XHJcbiAgICovXHJcbiAgYmluZE9uRHJhZ01vdmUgPSAoZXYpID0+IHtcclxuICAgIHRoaXMuX29uRHJhZ01vdmUoZXYpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUGFzc2VzIHRoaXMgdG8gX29uRHJhZ01vdmUoKTtcclxuICAgKi9cclxuICBiaW5kT25EcmFnRW5kID0gKGV2KSA9PiB7XHJcbiAgICAvLyB0aGlzLnpvbmUucnVuKCgpID0+IHtcclxuICAgICAgdGhpcy5fb25EcmFnRW5kKGV2KTtcclxuICAgIC8vIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcblx0ICogSGFuZGxlcyBgdG91Y2hzdGFydGAgYW5kIGBtb3VzZWRvd25gIGV2ZW50cy5cclxuXHQgKiBAdG9kbyBIb3Jpem9udGFsIHN3aXBlIHRocmVzaG9sZCBhcyBvcHRpb25cclxuXHQgKiBAdG9kbyAjMjYxXHJcblx0ICogQHBhcmFtIGV2ZW50IC0gVGhlIGV2ZW50IGFyZ3VtZW50cy5cclxuXHQgKi9cclxuXHRwcml2YXRlIF9vbkRyYWdTdGFydChldmVudCk6IGFueSB7XHJcblx0XHRsZXQgc3RhZ2U6IENvb3JkcyA9IG51bGw7XHJcblxyXG5cdFx0aWYgKGV2ZW50LndoaWNoID09PSAzKSB7XHJcblx0XHRcdHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBzdGFnZSA9IHRoaXMuX3ByZXBhcmVEcmFnZ2luZyhldmVudCk7XHJcblxyXG5cdFx0dGhpcy5fZHJhZy50aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcblx0XHR0aGlzLl9kcmFnLnRhcmdldCA9IGV2ZW50LnRhcmdldDtcclxuXHRcdHRoaXMuX2RyYWcuc3RhZ2Uuc3RhcnQgPSBzdGFnZTtcclxuXHRcdHRoaXMuX2RyYWcuc3RhZ2UuY3VycmVudCA9IHN0YWdlO1xyXG4gICAgdGhpcy5fZHJhZy5wb2ludGVyID0gdGhpcy5fcG9pbnRlcihldmVudCk7XHJcblxyXG4gICAgdGhpcy5saXN0ZW5lck1vdXNlVXAgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbihkb2N1bWVudCwgJ21vdXNldXAnLCB0aGlzLmJpbmRPbkRyYWdFbmQpO1xyXG4gICAgdGhpcy5saXN0ZW5lclRvdWNoRW5kID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oZG9jdW1lbnQsICd0b3VjaGVuZCcsIHRoaXMuYmluZE9uRHJhZ0VuZCk7XHJcblxyXG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgdGhpcy5saXN0ZW5lck9uZU1vdXNlTW92ZSA9IHRoaXMucmVuZGVyZXIubGlzdGVuKGRvY3VtZW50LCAnbW91c2Vtb3ZlJywgdGhpcy5iaW5kT25lTW91c2VUb3VjaE1vdmUpO1xyXG4gICAgICB0aGlzLmxpc3RlbmVyT25lVG91Y2hNb3ZlID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oZG9jdW1lbnQsICd0b3VjaG1vdmUnLCB0aGlzLmJpbmRPbmVNb3VzZVRvdWNoTW92ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBdHRhY2hlcyBsaXN0ZW5lcnMgdG8gYHRvdWNobW92ZWAgYW5kIGBtb3VzZW1vdmVgIGV2ZW50czsgaW5pdGlhdGVzIHVwZGF0aW5nIGNhcm91c2VsIGFmdGVyIHN0YXJ0aW5nIGRyYWdnaW5nXHJcbiAgICogQHBhcmFtIGV2ZW50IGV2ZW50IG9iamVjaCBvZiBtb3VzZSBvciB0b3VjaCBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgX29uZU1vdXNlVG91Y2hNb3ZlKGV2ZW50KSB7XHJcbiAgICBjb25zdCBkZWx0YSA9IHRoaXMuX2RpZmZlcmVuY2UodGhpcy5fZHJhZy5wb2ludGVyLCB0aGlzLl9wb2ludGVyKGV2ZW50KSk7XHJcbiAgICBpZiAodGhpcy5saXN0ZW5lckFUYWcpIHtcclxuICAgICAgdGhpcy5saXN0ZW5lckFUYWcoKTtcclxuICAgIH1cclxuICAgIGlmICggTWF0aC5hYnMoZGVsdGEueCkgPCAzICYmIE1hdGguYWJzKGRlbHRhLnkpIDwgMyAmJiB0aGlzLl9pcygndmFsaWQnKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKChNYXRoLmFicyhkZWx0YS54KSA8IDMgJiYgTWF0aC5hYnMoZGVsdGEueCkgPCBNYXRoLmFicyhkZWx0YS55KSkgJiYgdGhpcy5faXMoJ3ZhbGlkJykpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5saXN0ZW5lck9uZU1vdXNlTW92ZSgpO1xyXG4gICAgdGhpcy5saXN0ZW5lck9uZVRvdWNoTW92ZSgpO1xyXG4gICAgdGhpcy5fZHJhZy5tb3ZpbmcgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuYmxvY2tDbGlja0FuY2hvckluRHJhZ2dpbmcoZXZlbnQpO1xyXG5cclxuICAgIHRoaXMubGlzdGVuZXJNb3VzZU1vdmUgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbihkb2N1bWVudCwgJ21vdXNlbW92ZScsIHRoaXMuYmluZE9uRHJhZ01vdmUpO1xyXG4gICAgdGhpcy5saXN0ZW5lclRvdWNoTW92ZSA9IHRoaXMucmVuZGVyZXIubGlzdGVuKGRvY3VtZW50LCAndG91Y2htb3ZlJywgdGhpcy5iaW5kT25EcmFnTW92ZSk7XHJcblxyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICB0aGlzLl9lbnRlckRyYWdnaW5nKCk7XHJcbiAgICB0aGlzLl9vbmVEcmFnTW92ZSQubmV4dChldmVudCk7XHJcbiAgICAvLyB0aGlzLl9zZW5kQ2hhbmdlcygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQXR0YWNoZXMgaGFuZGxlciB0byBIVE1MQW5jaG9yRWxlbWVudCBmb3IgcHJldmVudGluZyBjbGljayB3aGlsZSBjYXJvdXNlbCBpcyBiZWluZyBkcmFnZ2VkXHJcbiAgICogQHBhcmFtIGV2ZW50IGV2ZW50IG9iamVjdFxyXG4gICAqL1xyXG4gIHByaXZhdGUgYmxvY2tDbGlja0FuY2hvckluRHJhZ2dpbmcoZXZlbnQ6IGFueSkge1xyXG4gICAgbGV0IHRhcmdldDogSFRNTEVsZW1lbnQgfCBudWxsID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgd2hpbGUgKHRhcmdldCAmJiAhKHRhcmdldCBpbnN0YW5jZW9mIEhUTUxBbmNob3JFbGVtZW50KSkge1xyXG4gICAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50RWxlbWVudDtcclxuICAgIH1cclxuICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBIVE1MQW5jaG9yRWxlbWVudCkge1xyXG4gICAgICB0aGlzLmxpc3RlbmVyQVRhZyA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRhcmdldCwgJ2NsaWNrJywgKCkgPT4gZmFsc2UpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgXHQvKipcclxuXHQgKiBIYW5kbGVzIHRoZSBgdG91Y2htb3ZlYCBhbmQgYG1vdXNlbW92ZWAgZXZlbnRzLlxyXG5cdCAqIEB0b2RvICMyNjFcclxuXHQgKiBAcGFyYW0gZXZlbnQgLSBUaGUgZXZlbnQgYXJndW1lbnRzLlxyXG5cdCAqL1xyXG5cdHByaXZhdGUgX29uRHJhZ01vdmUoZXZlbnQpIHtcclxuICAgIGxldCBzdGFnZTogQ29vcmRzO1xyXG4gICAgY29uc3Qgc3RhZ2VPckV4aXQ6IGJvb2xlYW4gfCBDb29yZHMgPSB0aGlzLmNhcm91c2VsU2VydmljZS5kZWZpbmVOZXdDb29yZHNEcmFnKGV2ZW50LCB0aGlzLl9kcmFnKTtcclxuXHJcbiAgICBpZiAoc3RhZ2VPckV4aXQgPT09IGZhbHNlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHN0YWdlID0gc3RhZ2VPckV4aXQgYXMgQ29vcmRzO1xyXG5cclxuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgdGhpcy5fZHJhZy5zdGFnZS5jdXJyZW50ID0gc3RhZ2U7XHJcblx0XHR0aGlzLl9hbmltYXRlKHN0YWdlLnggLSB0aGlzLl9kcmFnLnN0YWdlLnN0YXJ0LngpO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIE1vdmVzIC5vd2wtc3RhZ2UgbGVmdC1yaWdodFxyXG4gICAqIEBwYXJhbSBjb29yZGluYXRlIGNvb3JkaW5hdGUgdG8gYmUgc2V0IHRvIC5vd2wtc3RhZ2VcclxuICAgKi9cclxuICBwcml2YXRlIF9hbmltYXRlKGNvb3JkaW5hdGU6IG51bWJlcikge1xyXG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0sICd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlM2QoJHtjb29yZGluYXRlfXB4LDBweCwwcHhgKTtcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdLCAndHJhbnNpdGlvbicsICcwcycpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcblx0ICogSGFuZGxlcyB0aGUgYHRvdWNoZW5kYCBhbmQgYG1vdXNldXBgIGV2ZW50cy5cclxuXHQgKiBAdG9kbyAjMjYxXHJcblx0ICogQHRvZG8gVGhyZXNob2xkIGZvciBjbGljayBldmVudFxyXG5cdCAqIEBwYXJhbSBldmVudCAtIFRoZSBldmVudCBhcmd1bWVudHMuXHJcblx0ICovXHJcblx0cHJpdmF0ZSBfb25EcmFnRW5kKGV2ZW50KSB7XHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5vd2xET01EYXRhLmlzR3JhYiA9IGZhbHNlO1xyXG4gICAgdGhpcy5saXN0ZW5lck9uZU1vdXNlTW92ZSgpO1xyXG4gICAgdGhpcy5saXN0ZW5lck9uZVRvdWNoTW92ZSgpO1xyXG5cclxuICAgIGlmICh0aGlzLl9kcmFnLm1vdmluZykge1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXSwgJ3RyYW5zZm9ybScsIGBgKTtcclxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0sICd0cmFuc2l0aW9uJywgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc3BlZWQoK3RoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmRyYWdFbmRTcGVlZCB8fCB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5zbWFydFNwZWVkKS8xMDAwICsncycpO1xyXG5cclxuICAgICAgdGhpcy5fZmluaXNoRHJhZ2dpbmcoZXZlbnQpO1xyXG4gICAgICB0aGlzLmxpc3RlbmVyTW91c2VNb3ZlKCk7XHJcbiAgICAgIHRoaXMubGlzdGVuZXJUb3VjaE1vdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9kcmFnID0ge1xyXG4gICAgICB0aW1lOiBudWxsLFxyXG4gICAgICB0YXJnZXQ6IG51bGwsXHJcbiAgICAgIHBvaW50ZXI6IG51bGwsXHJcbiAgICAgIHN0YWdlOiB7XHJcbiAgICAgICAgc3RhcnQ6IG51bGwsXHJcbiAgICAgICAgY3VycmVudDogbnVsbFxyXG4gICAgICB9LFxyXG4gICAgICBkaXJlY3Rpb246IG51bGwsXHJcbiAgICAgIGFjdGl2ZTogZmFsc2UsXHJcbiAgICAgIG1vdmluZzogZmFsc2VcclxuICAgIH07XHJcblxyXG4gICAgLy8gdGhpcy5jYXJvdXNlbFNlcnZpY2UudHJpZ2dlcignZHJhZ2dlZCcpO1xyXG4gICAgdGhpcy5saXN0ZW5lck1vdXNlVXAoKTtcclxuICAgIHRoaXMubGlzdGVuZXJUb3VjaEVuZCgpO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG5cdCAqIFByZXBhcmVzIGRhdGEgZm9yIGRyYWdnaW5nIGNhcm91c2VsLiBJdCBzdGFydHMgYWZ0ZXIgZmlyaW5nIGB0b3VjaHN0YXJ0YCBhbmQgYG1vdXNlZG93bmAgZXZlbnRzLlxyXG5cdCAqIEBwYXJhbSBldmVudCAtIFRoZSBldmVudCBhcmd1bWVudHMuXHJcblx0ICogQHJldHVybnMgc3RhZ2UgLSBvYmplY3Qgd2l0aCAneCcgYW5kICd5JyBjb29yZGluYXRlcyBvZiAub3dsLXN0YWdlXHJcblx0ICovXHJcbiAgcHJpdmF0ZSBfcHJlcGFyZURyYWdnaW5nKGV2ZW50OiBhbnkpOiBDb29yZHMge1xyXG4gICAgcmV0dXJuIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnByZXBhcmVEcmFnZ2luZyhldmVudCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBdHRhY2hlcyBoYW5kbGVyIGZvciAnY2xpY2snIGV2ZW50IG9uIGFueSBlbGVtZW50IGluIC5vd2wtc3RhZ2UgaW4gb3JkZXIgdG8gcHJldmVudCBkcmFnZ2luZyB3aGVuIG1vdmluZyBvZiBjdXJzb3IgaXMgbGVzcyB0aGFuIDNweFxyXG4gICAqL1xyXG4gIHByaXZhdGUgX29uZUNsaWNrSGFuZGxlciA9ICgpID0+IHtcclxuICAgIHRoaXMubGlzdGVuZXJPbmVDbGljayA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuX2RyYWcudGFyZ2V0LCAnY2xpY2snLCAoKSA9PiBmYWxzZSlcclxuICAgIHRoaXMubGlzdGVuZXJPbmVDbGljaygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRmluaXNoZXMgZHJhZ2dpbmdcclxuICAgKiBAcGFyYW0gZXZlbnQgb2JqZWN0IGV2ZW50IG9mICdtb3VzZVVwJyBvZiAndG91Y2hlbmQnIGV2ZW50c1xyXG4gICAqL1xyXG4gIHByaXZhdGUgX2ZpbmlzaERyYWdnaW5nKGV2ZW50OiBhbnkpIHtcclxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmZpbmlzaERyYWdnaW5nKGV2ZW50LCB0aGlzLl9kcmFnLCB0aGlzLl9vbmVDbGlja0hhbmRsZXIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcblx0ICogR2V0cyB1bmlmaWVkIHBvaW50ZXIgY29vcmRpbmF0ZXMgZnJvbSBldmVudC5cclxuXHQgKiBAcGFyYW0gZXZlbnQgVGhlIGBtb3VzZWRvd25gIG9yIGB0b3VjaHN0YXJ0YCBldmVudC5cclxuXHQgKiBAcmV0dXJucyBDb250YWlucyBgeGAgYW5kIGB5YCBjb29yZGluYXRlcyBvZiBjdXJyZW50IHBvaW50ZXIgcG9zaXRpb24uXHJcblx0ICovXHJcbiAgcHJpdmF0ZSBfcG9pbnRlcihldmVudDogYW55KTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLmNhcm91c2VsU2VydmljZS5wb2ludGVyKGV2ZW50KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEdldHMgdGhlIGRpZmZlcmVuY2Ugb2YgdHdvIHZlY3RvcnMuXHJcblx0ICogQHBhcmFtIGZpcnN0IFRoZSBmaXJzdCB2ZWN0b3IuXHJcblx0ICogQHBhcmFtIHNlY29uZC0gVGhlIHNlY29uZCB2ZWN0b3IuXHJcblx0ICogQHJldHVybnMgVGhlIGRpZmZlcmVuY2UuXHJcblx0ICovXHJcbiAgcHJpdmF0ZSBfZGlmZmVyZW5jZShmaXJzdEM6IENvb3Jkcywgc2Vjb25kOiBDb29yZHMpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmRpZmZlcmVuY2UoZmlyc3RDLCBzZWNvbmQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcblx0ICogQ2hlY2tzIHdoZXRoZXIgdGhlIGNhcm91c2VsIGlzIGluIGEgc3BlY2lmaWMgc3RhdGUgb3Igbm90LlxyXG5cdCAqIEBwYXJhbSBzcGVjaWZpY1N0YXRlIFRoZSBzdGF0ZSB0byBjaGVjay5cclxuXHQgKiBAcmV0dXJucyBUaGUgZmxhZyB3aGljaCBpbmRpY2F0ZXMgaWYgdGhlIGNhcm91c2VsIGlzIGJ1c3kuXHJcblx0ICovXHJcbiAgcHJpdmF0ZSBfaXMoc3BlY2lmaWNTdGF0ZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5jYXJvdXNlbFNlcnZpY2UuaXMoc3BlY2lmaWNTdGF0ZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIEVudGVycyBhIHN0YXRlLlxyXG4gICogQHBhcmFtIG5hbWUgVGhlIHN0YXRlIG5hbWUuXHJcbiAgKi9cclxuICBwcml2YXRlIF9lbnRlcihuYW1lOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmVudGVyKG5hbWUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcblx0ICogU2VuZHMgYWxsIGRhdGEgbmVlZGVkIGZvciBWaWV3LlxyXG5cdCAqL1xyXG4gIHByaXZhdGUgX3NlbmRDaGFuZ2VzKCkge1xyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2VuZENoYW5nZXMoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhbmRsZXIgZm9yIHRyYW5zaXRpb2VuZCBldmVudFxyXG4gICAqL1xyXG4gIG9uVHJhbnNpdGlvbkVuZCgpIHtcclxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm9uVHJhbnNpdGlvbkVuZCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcblx0ICogRW50ZXJzIGludG8gYSAnZHJhZ2dpbmcnIHN0YXRlXHJcblx0ICovXHJcbiAgcHJpdmF0ZSBfZW50ZXJEcmFnZ2luZygpIHtcclxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmVudGVyRHJhZ2dpbmcoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhbmRsZXMgdGhlIGVuZCBvZiAnYW5pbWF0aW9uZW5kJyBldmVudFxyXG4gICAqIEBwYXJhbSBpZCBJZCBvZiBzbGlkZXNcclxuICAgKi9cclxuICBjbGVhcihpZCkge1xyXG4gICAgdGhpcy5hbmltYXRlU2VydmljZS5jbGVhcihpZCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
