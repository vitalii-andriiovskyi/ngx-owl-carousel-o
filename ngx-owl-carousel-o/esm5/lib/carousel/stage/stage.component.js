/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, NgZone, ElementRef, HostListener, Renderer2, Input } from '@angular/core';
import { CarouselService } from '../../services/carousel.service';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { StageData } from '../../models/stage-data.model';
var StageComponent = /** @class */ (function () {
    function StageComponent(zone, el, renderer, carouselService) {
        var _this = this;
        this.zone = zone;
        this.el = el;
        this.renderer = renderer;
        this.carouselService = carouselService;
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
        this.listenerOneMouseMove();
        this.listenerOneTouchMove();
        if (Math.abs(delta.x) < Math.abs(delta.y) && this._is('valid')) {
            this._drag.active = false;
            return;
        }
        this._drag.moving = true;
        this.listenerMouseMove = this.renderer.listen(document, 'mousemove', this.bindOnDragMove);
        this.listenerTouchMove = this.renderer.listen(document, 'touchmove', this.bindOnDragMove);
        event.preventDefault();
        this._enter('dragging');
        // this.carouselService._trigger('drag');
        this._oneDragMove$.next(event);
        // this._sendChanges();
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
    ;
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
    ;
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
     * @param {?} state The state to check.
     * @return {?} The flag which indicates if the carousel is busy.
     */
    StageComponent.prototype._is = /**
     * Checks whether the carousel is in a specific state or not.
     * @param {?} state The state to check.
     * @return {?} The flag which indicates if the carousel is busy.
     */
    function (state) {
        return this.carouselService.is(state);
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
    StageComponent.decorators = [
        { type: Component, args: [{
                    selector: 'owl-stage',
                    template: "\n    <div>\n      <div class=\"owl-stage\" [ngStyle]=\"{'width': stageData.width + 'px',\n                                        'transform': stageData.transform,\n                                        'transition': stageData.transition,\n                                        'padding-left': stageData.paddingL + 'px',\n                                        'padding-right': stageData.paddingR + 'px' }\"\n          (transitionend)=\"onTransitionEnd()\">\n        <ng-container *ngFor=\"let slide of slidesData; let i = index\">\n          <div class=\"owl-item\" [ngClass]=\"{'active': slide.active, \n                                            'center': slide.center,\n                                            'cloned': slide.cloned}\" \n                                [ngStyle]=\"{'width': slide.width + 'px',\n                                            'margin-left': slide.marginL + 'px',\n                                            'margin-right': slide.marginR + 'px'}\">\n            <ng-template [ngTemplateOutlet]=\"slide.tplRef\"></ng-template>\n          </div><!-- /.owl-item -->\n        </ng-container>\n      </div><!-- /.owl-stage -->\n    </div>\n  "
                }] }
    ];
    /** @nocollapse */
    StageComponent.ctorParameters = function () { return [
        { type: NgZone },
        { type: ElementRef },
        { type: Renderer2 },
        { type: CarouselService }
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
    /**
     * Object with data needed for dragging
     * @type {?}
     */
    StageComponent.prototype._drag;
    /**
     * Subject for notification when the carousel's rebuilding caused by resize event starts
     * @type {?}
     */
    StageComponent.prototype._oneDragMove$;
    /**
     * Subsctiption to _oneDragMove$ Subject
     * @type {?}
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
     */
    StageComponent.prototype._oneClickHandler;
    /** @type {?} */
    StageComponent.prototype.zone;
    /** @type {?} */
    StageComponent.prototype.el;
    /** @type {?} */
    StageComponent.prototype.renderer;
    /** @type {?} */
    StageComponent.prototype.carouselService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW93bC1jYXJvdXNlbC1vLyIsInNvdXJjZXMiOlsibGliL2Nhcm91c2VsL3N0YWdlL3N0YWdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQXFCLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqSCxPQUFPLEVBQUUsZUFBZSxFQUFVLE1BQU0saUNBQWlDLENBQUM7QUFDMUUsT0FBTyxFQUFFLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQzs7SUF1R3hELHdCQUFvQixJQUFZLEVBQ1osSUFDQSxVQUNBO1FBSHBCLGlCQUd5RDtRQUhyQyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQ1osT0FBRSxHQUFGLEVBQUU7UUFDRixhQUFRLEdBQVIsUUFBUTtRQUNSLG9CQUFlLEdBQWYsZUFBZTs7OztxQkExQmQ7WUFDbkIsSUFBSSxFQUFFLElBQUk7WUFDVixNQUFNLEVBQUUsSUFBSTtZQUNaLE9BQU8sRUFBRSxJQUFJO1lBQ2IsS0FBSyxFQUFFO2dCQUNMLEtBQUssRUFBRSxJQUFJO2dCQUNYLE9BQU8sRUFBRSxJQUFJO2FBQ2Q7WUFDRCxTQUFTLEVBQUUsSUFBSTtZQUNmLE1BQU0sRUFBRSxLQUFLO1lBQ2IsTUFBTSxFQUFFLEtBQUs7U0FDZDs7Ozs2QkFLdUIsSUFBSSxPQUFPLEVBQU87Ozs7cUNBdURsQixVQUFDLEVBQUU7WUFDekIsS0FBSSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzdCOzs7OzhCQUtnQixVQUFDLEVBQUU7WUFDbEIsS0FBSSxDQUFDLFdBQVcsQ0FBQyxFQUFF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QU0zQixxQ0FBWTs7Ozs7UUFDbEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7SUFHckM7O09BRUc7Ozs7O0lBQ0gsd0NBQWU7Ozs7SUFBZjtRQUNFLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxFQUFFLENBQUM7S0FDeEM7O2dCQWhYRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLFdBQVc7b0JBQ3JCLFFBQVEsRUFBRSxpcUNBb0JUO2lCQUNGOzs7O2dCQTlCbUIsTUFBTTtnQkFBRSxVQUFVO2dCQUFnQixTQUFTO2dCQUN0RCxlQUFlOzs7K0JBa0NyQixLQUFLOzRCQVFMLEtBQUs7NkJBS0wsS0FBSzs4QkFnRUwsWUFBWSxTQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQzsrQkFNcEMsWUFBWSxTQUFDLFlBQVksRUFBRSxDQUFDLFFBQVEsQ0FBQztnQ0FNckMsWUFBWSxTQUFDLGFBQWEsRUFBRSxDQUFDLFFBQVEsQ0FBQzs4QkFJdEMsWUFBWSxTQUFDLFdBQVc7Z0NBTXhCLFlBQVksU0FBQyxhQUFhOzt5QkF0STdCOztTQStCYSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBOZ1pvbmUsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgUmVuZGVyZXIyLCBPbkluaXQsIE9uRGVzdHJveSwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ2Fyb3VzZWxTZXJ2aWNlLCBDb29yZHMgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jYXJvdXNlbC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGZpcnN0IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBTdGFnZURhdGEgfSBmcm9tICcuLi8uLi9tb2RlbHMvc3RhZ2UtZGF0YS5tb2RlbCc7XHJcbmltcG9ydCB7IFNsaWRlck1vZGVsIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3NsaWRlci5tb2RlbCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ293bC1zdGFnZScsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJvd2wtc3RhZ2VcIiBbbmdTdHlsZV09XCJ7J3dpZHRoJzogc3RhZ2VEYXRhLndpZHRoICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0cmFuc2Zvcm0nOiBzdGFnZURhdGEudHJhbnNmb3JtLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3RyYW5zaXRpb24nOiBzdGFnZURhdGEudHJhbnNpdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdwYWRkaW5nLWxlZnQnOiBzdGFnZURhdGEucGFkZGluZ0wgKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3BhZGRpbmctcmlnaHQnOiBzdGFnZURhdGEucGFkZGluZ1IgKyAncHgnIH1cIlxyXG4gICAgICAgICAgKHRyYW5zaXRpb25lbmQpPVwib25UcmFuc2l0aW9uRW5kKClcIj5cclxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBzbGlkZSBvZiBzbGlkZXNEYXRhOyBsZXQgaSA9IGluZGV4XCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwib3dsLWl0ZW1cIiBbbmdDbGFzc109XCJ7J2FjdGl2ZSc6IHNsaWRlLmFjdGl2ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2NlbnRlcic6IHNsaWRlLmNlbnRlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnY2xvbmVkJzogc2xpZGUuY2xvbmVkfVwiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cInsnd2lkdGgnOiBzbGlkZS53aWR0aCArICdweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ21hcmdpbi1sZWZ0Jzogc2xpZGUubWFyZ2luTCArICdweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ21hcmdpbi1yaWdodCc6IHNsaWRlLm1hcmdpblIgKyAncHgnfVwiPlxyXG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwic2xpZGUudHBsUmVmXCI+PC9uZy10ZW1wbGF0ZT5cclxuICAgICAgICAgIDwvZGl2PjwhLS0gLy5vd2wtaXRlbSAtLT5cclxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgPC9kaXY+PCEtLSAvLm93bC1zdGFnZSAtLT5cclxuICAgIDwvZGl2PlxyXG4gIGBcclxufSlcclxuZXhwb3J0IGNsYXNzIFN0YWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIC8qKlxyXG4gICAqIE9iamVjdCB3aXRoIHNldHRpbmdzIHdoaWNoIG1ha2UgY2Fyb3VzZWwgZHJhZ2dhYmxlIGJ5IHRvdWNoIG9yIG1vdXNlXHJcbiAgICovXHJcbiAgQElucHV0KCkgb3dsRHJhZ2dhYmxlOiB7XHJcbiAgICBpc01vdXNlRHJhZ2FibGU6IGJvb2xlYW4sXHJcbiAgICBpc1RvdWNoRHJhZ2FibGU6IGJvb2xlYW5cclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBEYXRhIG9mIG93bC1zdGFnZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHN0YWdlRGF0YTogU3RhZ2VEYXRhO1xyXG5cclxuXHQvKipcclxuXHQgKiAgRGF0YSBvZiBldmVyeSBzbGlkZVxyXG5cdCAqL1xyXG4gIEBJbnB1dCgpIHNsaWRlc0RhdGE6IFNsaWRlck1vZGVsW107XHJcblxyXG4gIC8qKlxyXG4gICAqIEZ1bmN0aW9uIHdpY2ggd2lsbCBiZSByZXR1cm5lZCBhZnRlciBhdHRhY2hpbmcgbGlzdGVuZXIgdG8gJ21vdXNlbW92ZScgZXZlbnRcclxuICAgKi9cclxuICBsaXN0ZW5lck1vdXNlTW92ZTogKCkgPT4gdm9pZDtcclxuICAvKipcclxuICAgKiBGdW5jdGlvbiB3aWNoIHdpbGwgYmUgcmV0dXJuZWQgYWZ0ZXIgYXR0YWNoaW5nIGxpc3RlbmVyIHRvICd0b3VjaG1vdmUnIGV2ZW50XHJcbiAgICovXHJcbiAgbGlzdGVuZXJUb3VjaE1vdmU6ICgpID0+IHZvaWQ7XHJcbiAgLyoqXHJcbiAgICogRnVuY3Rpb24gd2ljaCB3aWxsIGJlIHJldHVybmVkIGFmdGVyIGF0dGFjaGluZyBsaXN0ZW5lciB0byAnbW91c2Vtb3ZlJyBldmVudFxyXG4gICAqL1xyXG4gIGxpc3RlbmVyT25lTW91c2VNb3ZlOiAoKSA9PiB2b2lkO1xyXG4gIC8qKlxyXG4gICAqIEZ1bmN0aW9uIHdpY2ggd2lsbCBiZSByZXR1cm5lZCBhZnRlciBhdHRhY2hpbmcgbGlzdGVuZXIgdG8gJ3RvdWNobW92ZScgZXZlbnRcclxuICAgKi9cclxuICBsaXN0ZW5lck9uZVRvdWNoTW92ZTogKCkgPT4gdm9pZDtcclxuXHJcbiAgLyoqXHJcbiAgICogRnVuY3Rpb24gd2ljaCB3aWxsIGJlIHJldHVybmVkIGFmdGVyIGF0dGFjaGluZyBsaXN0ZW5lciB0byAnbW91c2V1cCcgZXZlbnRcclxuICAgKi9cclxuICBsaXN0ZW5lck1vdXNlVXA6ICgpID0+IHZvaWQ7XHJcbiAgLyoqXHJcbiAgICogRnVuY3Rpb24gd2ljaCB3aWxsIGJlIHJldHVybmVkIGFmdGVyIGF0dGFjaGluZyBsaXN0ZW5lciB0byAndG91Y2hlbmQnIGV2ZW50XHJcbiAgICovXHJcbiAgbGlzdGVuZXJUb3VjaEVuZDogKCkgPT4gdm9pZDtcclxuXHJcbiAgLyoqXHJcbiAgICogRnVuY3Rpb24gd2ljaCB3aWxsIGJlIHJldHVybmVkIGFmdGVyIGF0dGFjaGluZyBsaXN0ZW5lciB0byAnY2xpY2snIGV2ZW50XHJcbiAgICovXHJcbiAgbGlzdGVuZXJPbmVDbGljazogKCkgPT4gdm9pZDtcclxuXHJcbiAgLyoqXHJcbiAgICogT2JqZWN0IHdpdGggZGF0YSBuZWVkZWQgZm9yIGRyYWdnaW5nXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZHJhZzogYW55ID0ge1xyXG4gICAgdGltZTogbnVsbCxcclxuICAgIHRhcmdldDogbnVsbCxcclxuICAgIHBvaW50ZXI6IG51bGwsXHJcbiAgICBzdGFnZToge1xyXG4gICAgICBzdGFydDogbnVsbCxcclxuICAgICAgY3VycmVudDogbnVsbFxyXG4gICAgfSxcclxuICAgIGRpcmVjdGlvbjogbnVsbCxcclxuICAgIGFjdGl2ZTogZmFsc2UsXHJcbiAgICBtb3Zpbmc6IGZhbHNlXHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uIHdoZW4gdGhlIGNhcm91c2VsJ3MgcmVidWlsZGluZyBjYXVzZWQgYnkgcmVzaXplIGV2ZW50IHN0YXJ0c1xyXG4gICAqL1xyXG4gIHByaXZhdGUgX29uZURyYWdNb3ZlJCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2N0aXB0aW9uIHRvIF9vbmVEcmFnTW92ZSQgU3ViamVjdFxyXG4gICAqL1xyXG4gIHByaXZhdGUgX29uZU1vdmVTdWJzcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHpvbmU6IE5nWm9uZSxcclxuICAgICAgICAgICAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICAgICAgICAgICAgICBwcml2YXRlIGNhcm91c2VsU2VydmljZTogQ2Fyb3VzZWxTZXJ2aWNlKSB7IH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignbW91c2Vkb3duJywgWyckZXZlbnQnXSkgb25Nb3VzZURvd24oZXZlbnQpIHtcclxuICAgIGlmICh0aGlzLm93bERyYWdnYWJsZS5pc01vdXNlRHJhZ2FibGUpIHtcclxuICAgICAgdGhpcy5fb25EcmFnU3RhcnQoZXZlbnQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcigndG91Y2hzdGFydCcsIFsnJGV2ZW50J10pIG9uVG91Y2hTdGFydChldmVudCkge1xyXG4gICAgaWYgKHRoaXMub3dsRHJhZ2dhYmxlLmlzVG91Y2hEcmFnYWJsZSkge1xyXG4gICAgICB0aGlzLl9vbkRyYWdTdGFydChldmVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIFsnJGV2ZW50J10pIG9uVG91Y2hDYW5jZWwoZXZlbnQpIHtcclxuICAgIHRoaXMuX29uRHJhZ0VuZChldmVudCk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdkcmFnc3RhcnQnKSBvbkRyYWdTdGFydCgpIHtcclxuICAgIGlmICh0aGlzLm93bERyYWdnYWJsZS5pc01vdXNlRHJhZ2FibGUpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignc2VsZWN0c3RhcnQnKSBvblNlbGVjdFN0YXJ0KCkge1xyXG4gICAgaWYgKHRoaXMub3dsRHJhZ2dhYmxlLmlzTW91c2VEcmFnYWJsZSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuX29uZU1vdmVTdWJzcmlwdGlvbiA9IHRoaXMuX29uZURyYWdNb3ZlJFxyXG4gICAgICAucGlwZShmaXJzdCgpKVxyXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICB0aGlzLl9zZW5kQ2hhbmdlcygpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5fb25lTW92ZVN1YnNyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQYXNzZXMgdGhpcyB0byBfb25lTW91c2VUb3VjaE1vdmUoKTtcclxuICAgKi9cclxuICBiaW5kT25lTW91c2VUb3VjaE1vdmUgPSAoZXYpID0+IHtcclxuICAgIHRoaXMuX29uZU1vdXNlVG91Y2hNb3ZlKGV2KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFBhc3NlcyB0aGlzIHRvIF9vbkRyYWdNb3ZlKCk7XHJcbiAgICovXHJcbiAgYmluZE9uRHJhZ01vdmUgPSAoZXYpID0+IHtcclxuICAgIHRoaXMuX29uRHJhZ01vdmUoZXYpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUGFzc2VzIHRoaXMgdG8gX29uRHJhZ01vdmUoKTtcclxuICAgKi9cclxuICBiaW5kT25EcmFnRW5kID0gKGV2KSA9PiB7XHJcbiAgICAvLyB0aGlzLnpvbmUucnVuKCgpID0+IHtcclxuICAgICAgdGhpcy5fb25EcmFnRW5kKGV2KTtcclxuICAgIC8vIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcblx0ICogSGFuZGxlcyBgdG91Y2hzdGFydGAgYW5kIGBtb3VzZWRvd25gIGV2ZW50cy5cclxuXHQgKiBAdG9kbyBIb3Jpem9udGFsIHN3aXBlIHRocmVzaG9sZCBhcyBvcHRpb25cclxuXHQgKiBAdG9kbyAjMjYxXHJcblx0ICogQHBhcmFtIGV2ZW50IC0gVGhlIGV2ZW50IGFyZ3VtZW50cy5cclxuXHQgKi9cclxuXHRwcml2YXRlIF9vbkRyYWdTdGFydChldmVudCk6IGFueSB7XHJcblx0XHRsZXQgc3RhZ2U6IENvb3JkcyA9IG51bGw7XHJcblxyXG5cdFx0aWYgKGV2ZW50LndoaWNoID09PSAzKSB7XHJcblx0XHRcdHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBzdGFnZSA9IHRoaXMuX3ByZXBhcmVEcmFnZ2luZyhldmVudCk7XHJcblxyXG5cdFx0dGhpcy5fZHJhZy50aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcblx0XHR0aGlzLl9kcmFnLnRhcmdldCA9IGV2ZW50LnRhcmdldDtcclxuXHRcdHRoaXMuX2RyYWcuc3RhZ2Uuc3RhcnQgPSBzdGFnZTtcclxuXHRcdHRoaXMuX2RyYWcuc3RhZ2UuY3VycmVudCA9IHN0YWdlO1xyXG4gICAgdGhpcy5fZHJhZy5wb2ludGVyID0gdGhpcy5fcG9pbnRlcihldmVudCk7XHJcbiAgICB0aGlzLl9kcmFnLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5saXN0ZW5lck1vdXNlVXAgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbihkb2N1bWVudCwgJ21vdXNldXAnLCB0aGlzLmJpbmRPbkRyYWdFbmQpO1xyXG4gICAgdGhpcy5saXN0ZW5lclRvdWNoRW5kID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oZG9jdW1lbnQsICd0b3VjaGVuZCcsIHRoaXMuYmluZE9uRHJhZ0VuZCk7XHJcblxyXG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgdGhpcy5saXN0ZW5lck9uZU1vdXNlTW92ZSA9IHRoaXMucmVuZGVyZXIubGlzdGVuKGRvY3VtZW50LCAnbW91c2Vtb3ZlJywgdGhpcy5iaW5kT25lTW91c2VUb3VjaE1vdmUpO1xyXG4gICAgICB0aGlzLmxpc3RlbmVyT25lVG91Y2hNb3ZlID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oZG9jdW1lbnQsICd0b3VjaG1vdmUnLCB0aGlzLmJpbmRPbmVNb3VzZVRvdWNoTW92ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBdHRhY2hlcyBsaXN0ZW5lcnMgdG8gYHRvdWNobW92ZWAgYW5kIGBtb3VzZW1vdmVgIGV2ZW50czsgaW5pdGlhdGVzIHVwZGF0aW5nIGNhcm91c2VsIGFmdGVyIHN0YXJ0aW5nIGRyYWdnaW5nXHJcbiAgICogQHBhcmFtIGV2ZW50IGV2ZW50IG9iamVjaCBvZiBtb3VzZSBvciB0b3VjaCBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgX29uZU1vdXNlVG91Y2hNb3ZlKGV2ZW50KSB7XHJcbiAgICBpZiAoIXRoaXMuX2RyYWcuYWN0aXZlKSByZXR1cm4gZmFsc2U7XHJcbiAgICBjb25zdCBkZWx0YSA9IHRoaXMuX2RpZmZlcmVuY2UodGhpcy5fZHJhZy5wb2ludGVyLCB0aGlzLl9wb2ludGVyKGV2ZW50KSk7XHJcblxyXG4gICAgdGhpcy5saXN0ZW5lck9uZU1vdXNlTW92ZSgpO1xyXG4gICAgdGhpcy5saXN0ZW5lck9uZVRvdWNoTW92ZSgpO1xyXG5cclxuICAgIGlmIChNYXRoLmFicyhkZWx0YS54KSA8IE1hdGguYWJzKGRlbHRhLnkpICYmIHRoaXMuX2lzKCd2YWxpZCcpKSB7XHJcbiAgICAgIHRoaXMuX2RyYWcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuX2RyYWcubW92aW5nID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLmxpc3RlbmVyTW91c2VNb3ZlID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oZG9jdW1lbnQsICdtb3VzZW1vdmUnLCB0aGlzLmJpbmRPbkRyYWdNb3ZlKTtcclxuICAgIHRoaXMubGlzdGVuZXJUb3VjaE1vdmUgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbihkb2N1bWVudCwgJ3RvdWNobW92ZScsIHRoaXMuYmluZE9uRHJhZ01vdmUpO1xyXG5cclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgdGhpcy5fZW50ZXIoJ2RyYWdnaW5nJyk7XHJcbiAgICAvLyB0aGlzLmNhcm91c2VsU2VydmljZS5fdHJpZ2dlcignZHJhZycpO1xyXG4gICAgdGhpcy5fb25lRHJhZ01vdmUkLm5leHQoZXZlbnQpO1xyXG4gICAgLy8gdGhpcy5fc2VuZENoYW5nZXMoKTtcclxuICB9XHJcblxyXG4gIFx0LyoqXHJcblx0ICogSGFuZGxlcyB0aGUgYHRvdWNobW92ZWAgYW5kIGBtb3VzZW1vdmVgIGV2ZW50cy5cclxuXHQgKiBAdG9kbyAjMjYxXHJcblx0ICogQHBhcmFtIGV2ZW50IC0gVGhlIGV2ZW50IGFyZ3VtZW50cy5cclxuXHQgKi9cclxuXHRwcml2YXRlIF9vbkRyYWdNb3ZlKGV2ZW50KSB7XHJcbiAgICBpZiAoIXRoaXMuX2RyYWcuYWN0aXZlKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgbGV0IHN0YWdlOiBDb29yZHM7XHJcbiAgICBjb25zdCBzdGFnZU9yRXhpdDogYm9vbGVhbiB8IENvb3JkcyA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmRlZmluZU5ld0Nvb3Jkc0RyYWcoZXZlbnQsIHRoaXMuX2RyYWcpO1xyXG5cclxuICAgIGlmIChzdGFnZU9yRXhpdCA9PT0gZmFsc2UpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgc3RhZ2UgPSBzdGFnZU9yRXhpdCBhcyBDb29yZHM7XHJcblxyXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICB0aGlzLl9kcmFnLnN0YWdlLmN1cnJlbnQgPSBzdGFnZTtcclxuXHRcdHRoaXMuX2FuaW1hdGUoc3RhZ2UueCAtIHRoaXMuX2RyYWcuc3RhZ2Uuc3RhcnQueCk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogTW92ZXMgLm93bC1zdGFnZSBsZWZ0LXJpZ2h0XHJcbiAgICogQHBhcmFtIGNvb3JkaW5hdGUgY29vcmRpbmF0ZSB0byBiZSBzZXQgdG8gLm93bC1zdGFnZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2FuaW1hdGUoY29vcmRpbmF0ZTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXSwgJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGUzZCgke2Nvb3JkaW5hdGV9cHgsMHB4LDBweGApO1xyXG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0sICd0cmFuc2l0aW9uJywgJzBzJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuXHQgKiBIYW5kbGVzIHRoZSBgdG91Y2hlbmRgIGFuZCBgbW91c2V1cGAgZXZlbnRzLlxyXG5cdCAqIEB0b2RvICMyNjFcclxuXHQgKiBAdG9kbyBUaHJlc2hvbGQgZm9yIGNsaWNrIGV2ZW50XHJcblx0ICogQHBhcmFtIGV2ZW50IC0gVGhlIGV2ZW50IGFyZ3VtZW50cy5cclxuXHQgKi9cclxuXHRwcml2YXRlIF9vbkRyYWdFbmQoZXZlbnQpIHtcclxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm93bERPTURhdGEuaXNHcmFiID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKHRoaXMuX2RyYWcubW92aW5nKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdLCAndHJhbnNmb3JtJywgYGApO1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXSwgJ3RyYW5zaXRpb24nLCB0aGlzLmNhcm91c2VsU2VydmljZS5zcGVlZCgrdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuZHJhZ0VuZFNwZWVkIHx8IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLnNtYXJ0U3BlZWQpLzEwMDAgKydzJyk7XHJcblxyXG4gICAgICB0aGlzLl9maW5pc2hEcmFnZ2luZyhldmVudCk7XHJcbiAgICAgIHRoaXMubGlzdGVuZXJNb3VzZU1vdmUoKTtcclxuICAgICAgdGhpcy5saXN0ZW5lclRvdWNoTW92ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2RyYWcgPSB7XHJcbiAgICAgIHRpbWU6IG51bGwsXHJcbiAgICAgIHRhcmdldDogbnVsbCxcclxuICAgICAgcG9pbnRlcjogbnVsbCxcclxuICAgICAgc3RhZ2U6IHtcclxuICAgICAgICBzdGFydDogbnVsbCxcclxuICAgICAgICBjdXJyZW50OiBudWxsXHJcbiAgICAgIH0sXHJcbiAgICAgIGRpcmVjdGlvbjogbnVsbCxcclxuICAgICAgYWN0aXZlOiBmYWxzZSxcclxuICAgICAgbW92aW5nOiBmYWxzZVxyXG4gICAgfTtcclxuXHJcbiAgICAvLyB0aGlzLmNhcm91c2VsU2VydmljZS50cmlnZ2VyKCdkcmFnZ2VkJyk7XHJcbiAgICB0aGlzLmxpc3RlbmVyTW91c2VVcCgpO1xyXG4gICAgdGhpcy5saXN0ZW5lclRvdWNoRW5kKCk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcblx0ICogUHJlcGFyZXMgZGF0YSBmb3IgZHJhZ2dpbmcgY2Fyb3VzZWwuIEl0IHN0YXJ0cyBhZnRlciBmaXJpbmcgYHRvdWNoc3RhcnRgIGFuZCBgbW91c2Vkb3duYCBldmVudHMuXHJcblx0ICogQHBhcmFtIGV2ZW50IC0gVGhlIGV2ZW50IGFyZ3VtZW50cy5cclxuXHQgKiBAcmV0dXJucyBzdGFnZSAtIG9iamVjdCB3aXRoICd4JyBhbmQgJ3knIGNvb3JkaW5hdGVzIG9mIC5vd2wtc3RhZ2VcclxuXHQgKi9cclxuICBwcml2YXRlIF9wcmVwYXJlRHJhZ2dpbmcoZXZlbnQ6IGFueSk6IENvb3JkcyB7XHJcbiAgICByZXR1cm4gdGhpcy5jYXJvdXNlbFNlcnZpY2UucHJlcGFyZURyYWdnaW5nKGV2ZW50KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEF0dGFjaGVzIGhhbmRsZXIgZm9yICdjbGljaycgZXZlbnQgb24gYW55IGVsZW1lbnQgaW4gLm93bC1zdGFnZSBpbiBvcmRlciB0byBwcmV2ZW50IGRyYWdnaW5nIHdoZW4gbW92aW5nIG9mIGN1cnNvciBpcyBsZXNzIHRoYW4gM3B4XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfb25lQ2xpY2tIYW5kbGVyID0gKCkgPT4ge1xyXG4gICAgdGhpcy5saXN0ZW5lck9uZUNsaWNrID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5fZHJhZy50YXJnZXQsICdjbGljaycsICgpID0+IGZhbHNlKVxyXG4gICAgdGhpcy5saXN0ZW5lck9uZUNsaWNrKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGaW5pc2hlcyBkcmFnZ2luZ1xyXG4gICAqIEBwYXJhbSBldmVudCBvYmplY3QgZXZlbnQgb2YgJ21vdXNlVXAnIG9mICd0b3VjaGVuZCcgZXZlbnRzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZmluaXNoRHJhZ2dpbmcoZXZlbnQ6IGFueSkge1xyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UuZmluaXNoRHJhZ2dpbmcoZXZlbnQsIHRoaXMuX2RyYWcsIHRoaXMuX29uZUNsaWNrSGFuZGxlcik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuXHQgKiBHZXRzIHVuaWZpZWQgcG9pbnRlciBjb29yZGluYXRlcyBmcm9tIGV2ZW50LlxyXG5cdCAqIEBwYXJhbSBldmVudCBUaGUgYG1vdXNlZG93bmAgb3IgYHRvdWNoc3RhcnRgIGV2ZW50LlxyXG5cdCAqIEByZXR1cm5zIENvbnRhaW5zIGB4YCBhbmQgYHlgIGNvb3JkaW5hdGVzIG9mIGN1cnJlbnQgcG9pbnRlciBwb3NpdGlvbi5cclxuXHQgKi9cclxuICBwcml2YXRlIF9wb2ludGVyKGV2ZW50OiBhbnkpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnBvaW50ZXIoZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcblx0ICogR2V0cyB0aGUgZGlmZmVyZW5jZSBvZiB0d28gdmVjdG9ycy5cclxuXHQgKiBAcGFyYW0gZmlyc3QgVGhlIGZpcnN0IHZlY3Rvci5cclxuXHQgKiBAcGFyYW0gc2Vjb25kLSBUaGUgc2Vjb25kIHZlY3Rvci5cclxuXHQgKiBAcmV0dXJucyBUaGUgZGlmZmVyZW5jZS5cclxuXHQgKi9cclxuICBwcml2YXRlIF9kaWZmZXJlbmNlKGZpcnN0QzogQ29vcmRzLCBzZWNvbmQ6IENvb3Jkcyk6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZGlmZmVyZW5jZShmaXJzdEMsIHNlY29uZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuXHQgKiBDaGVja3Mgd2hldGhlciB0aGUgY2Fyb3VzZWwgaXMgaW4gYSBzcGVjaWZpYyBzdGF0ZSBvciBub3QuXHJcblx0ICogQHBhcmFtIHN0YXRlIFRoZSBzdGF0ZSB0byBjaGVjay5cclxuXHQgKiBAcmV0dXJucyBUaGUgZmxhZyB3aGljaCBpbmRpY2F0ZXMgaWYgdGhlIGNhcm91c2VsIGlzIGJ1c3kuXHJcblx0ICovXHJcbiAgcHJpdmF0ZSBfaXMoc3RhdGU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmlzKHN0YXRlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogRW50ZXJzIGEgc3RhdGUuXHJcbiAgKiBAcGFyYW0gbmFtZSBUaGUgc3RhdGUgbmFtZS5cclxuICAqL1xyXG4gIHByaXZhdGUgX2VudGVyKG5hbWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UuZW50ZXIobmFtZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuXHQgKiBTZW5kcyBhbGwgZGF0YSBuZWVkZWQgZm9yIFZpZXcuXHJcblx0ICovXHJcbiAgcHJpdmF0ZSBfc2VuZENoYW5nZXMoKSB7XHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5zZW5kQ2hhbmdlcygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlciBmb3IgdHJhbnNpdGlvZW5kIGV2ZW50XHJcbiAgICovXHJcbiAgb25UcmFuc2l0aW9uRW5kKCkge1xyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uub25UcmFuc2l0aW9uRW5kKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==