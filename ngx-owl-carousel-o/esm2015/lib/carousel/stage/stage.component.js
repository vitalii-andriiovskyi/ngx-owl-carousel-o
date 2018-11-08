/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Component, NgZone, ElementRef, HostListener, Renderer2, Input } from '@angular/core';
import { CarouselService } from '../../services/carousel.service';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { StageData } from '../../models/stage-data.model';
import { AnimateService } from '../../services/animate.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
export class StageComponent {
    /**
     * @param {?} zone
     * @param {?} el
     * @param {?} renderer
     * @param {?} carouselService
     * @param {?} animateService
     */
    constructor(zone, el, renderer, carouselService, animateService) {
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
        this.bindOneMouseTouchMove = (ev) => {
            this._oneMouseTouchMove(ev);
        };
        /**
         * Passes this to _onDragMove();
         */
        this.bindOnDragMove = (ev) => {
            this._onDragMove(ev);
        };
        /**
         * Passes this to _onDragMove();
         */
        this.bindOnDragEnd = (ev) => {
            // this.zone.run(() => {
            this._onDragEnd(ev);
            // });
        };
        /**
         * Attaches handler for 'click' event on any element in .owl-stage in order to prevent dragging when moving of cursor is less than 3px
         */
        this._oneClickHandler = () => {
            this.listenerOneClick = this.renderer.listen(this._drag.target, 'click', () => false);
            this.listenerOneClick();
        };
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onMouseDown(event) {
        if (this.owlDraggable.isMouseDragable) {
            this._onDragStart(event);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onTouchStart(event) {
        if (this.owlDraggable.isTouchDragable) {
            this._onDragStart(event);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onTouchCancel(event) {
        this._onDragEnd(event);
    }
    /**
     * @return {?}
     */
    onDragStart() {
        if (this.owlDraggable.isMouseDragable) {
            return false;
        }
    }
    /**
     * @return {?}
     */
    onSelectStart() {
        if (this.owlDraggable.isMouseDragable) {
            return false;
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._oneMoveSubsription = this._oneDragMove$
            .pipe(first())
            .subscribe(() => {
            this._sendChanges();
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._oneMoveSubsription.unsubscribe();
    }
    /**
     * Handles `touchstart` and `mousedown` events.
     * \@todo Horizontal swipe threshold as option / #261
     * @param {?} event - The event arguments.
     * @return {?}
     */
    _onDragStart(event) {
        /** @type {?} */
        let stage = null;
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
        this.zone.runOutsideAngular(() => {
            this.listenerOneMouseMove = this.renderer.listen(document, 'mousemove', this.bindOneMouseTouchMove);
            this.listenerOneTouchMove = this.renderer.listen(document, 'touchmove', this.bindOneMouseTouchMove);
        });
    }
    /**
     * Attaches listeners to `touchmove` and `mousemove` events; initiates updating carousel after starting dragging
     * @param {?} event event objech of mouse or touch event
     * @return {?}
     */
    _oneMouseTouchMove(event) {
        if (!this._drag.active)
            return false;
        /** @type {?} */
        const delta = this._difference(this._drag.pointer, this._pointer(event));
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
    }
    /**
     * Attaches handler to HTMLAnchorElement for preventing click while carousel is being dragged
     * @param {?} event event object
     * @return {?}
     */
    blockClickAnchorInDragging(event) {
        /** @type {?} */
        let target = event.target;
        while (target && !(target instanceof HTMLAnchorElement)) {
            target = target.parentElement;
        }
        if (target instanceof HTMLAnchorElement) {
            this.listenerATag = this.renderer.listen(target, 'click', () => false);
        }
    }
    /**
     * Handles the `touchmove` and `mousemove` events.
     * \@todo #261
     * @param {?} event - The event arguments.
     * @return {?}
     */
    _onDragMove(event) {
        if (!this._drag.active)
            return false;
        /** @type {?} */
        let stage;
        /** @type {?} */
        const stageOrExit = this.carouselService.defineNewCoordsDrag(event, this._drag);
        if (stageOrExit === false) {
            return;
        }
        stage = (/** @type {?} */ (stageOrExit));
        event.preventDefault();
        this._drag.stage.current = stage;
        this._animate(stage.x - this._drag.stage.start.x);
    }
    ;
    /**
     * Moves .owl-stage left-right
     * @param {?} coordinate coordinate to be set to .owl-stage
     * @return {?}
     */
    _animate(coordinate) {
        this.renderer.setStyle(this.el.nativeElement.children[0], 'transform', `translate3d(${coordinate}px,0px,0px`);
        this.renderer.setStyle(this.el.nativeElement.children[0], 'transition', '0s');
    }
    /**
     * Handles the `touchend` and `mouseup` events.
     * \@todo #261 / Threshold for click event
     * @param {?} event - The event arguments.
     * @return {?}
     */
    _onDragEnd(event) {
        this.carouselService.owlDOMData.isGrab = false;
        if (this._drag.moving) {
            this.renderer.setStyle(this.el.nativeElement.children[0], 'transform', ``);
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
    }
    ;
    /**
     * Prepares data for dragging carousel. It starts after firing `touchstart` and `mousedown` events.
     * @param {?} event - The event arguments.
     * @return {?} stage - object with 'x' and 'y' coordinates of .owl-stage
     */
    _prepareDragging(event) {
        return this.carouselService.prepareDragging(event);
    }
    /**
     * Finishes dragging
     * @param {?} event object event of 'mouseUp' of 'touchend' events
     * @return {?}
     */
    _finishDragging(event) {
        this.carouselService.finishDragging(event, this._drag, this._oneClickHandler);
    }
    /**
     * Gets unified pointer coordinates from event.
     * @param {?} event The `mousedown` or `touchstart` event.
     * @return {?} Contains `x` and `y` coordinates of current pointer position.
     */
    _pointer(event) {
        return this.carouselService.pointer(event);
    }
    /**
     * Gets the difference of two vectors.
     * @param {?} firstC
     * @param {?} second
     * @return {?} The difference.
     */
    _difference(firstC, second) {
        return this.carouselService.difference(firstC, second);
    }
    /**
     * Checks whether the carousel is in a specific state or not.
     * @param {?} specificState The state to check.
     * @return {?} The flag which indicates if the carousel is busy.
     */
    _is(specificState) {
        return this.carouselService.is(specificState);
    }
    /**
     * Enters a state.
     * @param {?} name The state name.
     * @return {?}
     */
    _enter(name) {
        this.carouselService.enter(name);
    }
    /**
     * Sends all data needed for View.
     * @return {?}
     */
    _sendChanges() {
        this.carouselService.sendChanges();
    }
    /**
     * Handler for transitioend event
     * @return {?}
     */
    onTransitionEnd() {
        this.carouselService.onTransitionEnd();
    }
    /**
     * Enters into a 'dragging' state
     * @return {?}
     */
    _enterDragging() {
        this.carouselService.enterDragging();
    }
    /**
     * Handles the end of 'animationend' event
     * @param {?} id Id of slides
     * @return {?}
     */
    clear(id) {
        this.animateService.clear(id);
    }
}
StageComponent.decorators = [
    { type: Component, args: [{
                selector: 'owl-stage',
                template: `
    <div>
      <div class="owl-stage" [ngStyle]="{'width': stageData.width + 'px',
                                        'transform': stageData.transform,
                                        'transition': stageData.transition,
                                        'padding-left': stageData.paddingL + 'px',
                                        'padding-right': stageData.paddingR + 'px' }"
          (transitionend)="onTransitionEnd()">
        <ng-container *ngFor="let slide of slidesData; let i = index">
          <div class="owl-item" [ngClass]="slide.classes"
                                [ngStyle]="{'width': slide.width + 'px',
                                            'margin-left': slide.marginL + 'px',
                                            'margin-right': slide.marginR + 'px',
                                            'left': slide.left}"
                                (animationend)="clear(slide.id)"
                                [@autoHeight]="slide.heightState">
            <ng-template *ngIf="slide.load" [ngTemplateOutlet]="slide.tplRef"></ng-template>
          </div><!-- /.owl-item -->
        </ng-container>
      </div><!-- /.owl-stage -->
    </div>
  `,
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
/** @nocollapse */
StageComponent.ctorParameters = () => [
    { type: NgZone },
    { type: ElementRef },
    { type: Renderer2 },
    { type: CarouselService },
    { type: AnimateService }
];
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
    /** @type {?} */
    StageComponent.prototype.animateService;
    /* Skipping unhandled member: ;*/
    /* Skipping unhandled member: ;*/
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW93bC1jYXJvdXNlbC1vLyIsInNvdXJjZXMiOlsibGliL2Nhcm91c2VsL3N0YWdlL3N0YWdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQXFCLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqSCxPQUFPLEVBQUUsZUFBZSxFQUFVLE1BQU0saUNBQWlDLENBQUM7QUFDMUUsT0FBTyxFQUFFLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUUxRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDaEUsT0FBTyxFQUNMLE9BQU8sRUFDUCxLQUFLLEVBQ0wsS0FBSyxFQUNMLE9BQU8sRUFDUCxVQUFVLEVBQ1gsTUFBTSxxQkFBcUIsQ0FBQztBQXdDN0IsTUFBTSxPQUFPLGNBQWM7Ozs7Ozs7O0lBOEV6QixZQUFvQixJQUFZLEVBQ1osRUFBYyxFQUNkLFFBQW1CLEVBQ25CLGVBQWdDLEVBQ2hDLGNBQThCO1FBSjlCLFNBQUksR0FBSixJQUFJLENBQVE7UUFDWixPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQ2QsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCOzs7O1FBM0IxQyxVQUFLLEdBQVE7WUFDbkIsSUFBSSxFQUFFLElBQUk7WUFDVixNQUFNLEVBQUUsSUFBSTtZQUNaLE9BQU8sRUFBRSxJQUFJO1lBQ2IsS0FBSyxFQUFFO2dCQUNMLEtBQUssRUFBRSxJQUFJO2dCQUNYLE9BQU8sRUFBRSxJQUFJO2FBQ2Q7WUFDRCxTQUFTLEVBQUUsSUFBSTtZQUNmLE1BQU0sRUFBRSxLQUFLO1lBQ2IsTUFBTSxFQUFFLEtBQUs7U0FDZCxDQUFDOzs7O1FBS00sa0JBQWEsR0FBRyxJQUFJLE9BQU8sRUFBTyxDQUFDOzs7O1FBd0QzQywwQkFBcUIsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFO1lBQzdCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM5QixDQUFDLENBQUE7Ozs7UUFLRCxtQkFBYyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUU7WUFDdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN2QixDQUFDLENBQUE7Ozs7UUFLRCxrQkFBYSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUU7WUFDckIsd0JBQXdCO1lBQ3RCLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDdEIsTUFBTTtRQUNSLENBQUMsQ0FBQTs7OztRQStKTyxxQkFBZ0IsR0FBRyxHQUFHLEVBQUU7WUFDOUIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUNyRixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUMxQixDQUFDLENBQUE7SUFqT3FELENBQUM7Ozs7O0lBRWhCLFdBQVcsQ0FBQyxLQUFLO1FBQ3RELElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLEVBQUU7WUFDckMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMxQjtJQUNILENBQUM7Ozs7O0lBRXVDLFlBQVksQ0FBQyxLQUFLO1FBQ3hELElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLEVBQUU7WUFDckMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMxQjtJQUNILENBQUM7Ozs7O0lBRXdDLGFBQWEsQ0FBQyxLQUFLO1FBQzFELElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekIsQ0FBQzs7OztJQUUwQixXQUFXO1FBQ3BDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLEVBQUU7WUFDckMsT0FBTyxLQUFLLENBQUM7U0FDZDtJQUNILENBQUM7Ozs7SUFFNEIsYUFBYTtRQUN4QyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUFFO1lBQ3JDLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7SUFDSCxDQUFDOzs7O0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsYUFBYTthQUMxQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDYixTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDekMsQ0FBQzs7Ozs7OztJQStCTSxZQUFZLENBQUMsS0FBSzs7WUFDckIsS0FBSyxHQUFXLElBQUk7UUFFeEIsSUFBSSxLQUFLLENBQUMsS0FBSyxLQUFLLENBQUMsRUFBRTtZQUN0QixPQUFPO1NBQ0w7UUFFRCxLQUFLLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXZDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUNqQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQy9CLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFFekIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNyRixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFdkYsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUU7WUFDL0IsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDcEcsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDdEcsQ0FBQyxDQUFDLENBQUM7SUFFTCxDQUFDOzs7Ozs7SUFNTyxrQkFBa0IsQ0FBQyxLQUFLO1FBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU07WUFBRSxPQUFPLEtBQUssQ0FBQzs7Y0FDL0IsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4RSxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3JCO1FBRUQsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFFNUIsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQzlELElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUMxQixPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFFekIsSUFBSSxDQUFDLDBCQUEwQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXZDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMxRixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFMUYsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXZCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQix1QkFBdUI7SUFDekIsQ0FBQzs7Ozs7O0lBTU8sMEJBQTBCLENBQUMsS0FBVTs7WUFDdkMsTUFBTSxHQUF1QixLQUFLLENBQUMsTUFBTTtRQUM3QyxPQUFPLE1BQU0sSUFBSSxDQUFDLENBQUMsTUFBTSxZQUFZLGlCQUFpQixDQUFDLEVBQUU7WUFDdkQsTUFBTSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUM7U0FDL0I7UUFDRCxJQUFJLE1BQU0sWUFBWSxpQkFBaUIsRUFBRTtZQUN2QyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDeEU7SUFDSCxDQUFDOzs7Ozs7O0lBT00sV0FBVyxDQUFDLEtBQUs7UUFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTTtZQUFFLE9BQU8sS0FBSyxDQUFDOztZQUVqQyxLQUFhOztjQUNYLFdBQVcsR0FBcUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUVqRyxJQUFJLFdBQVcsS0FBSyxLQUFLLEVBQUU7WUFDekIsT0FBTztTQUNSO1FBQ0QsS0FBSyxHQUFHLG1CQUFBLFdBQVcsRUFBVSxDQUFDO1FBRWhDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUVyQixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ25DLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUFBLENBQUM7Ozs7OztJQU1NLFFBQVEsQ0FBQyxVQUFrQjtRQUNqQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsV0FBVyxFQUFFLGVBQWUsVUFBVSxZQUFZLENBQUMsQ0FBQztRQUM5RyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2hGLENBQUM7Ozs7Ozs7SUFRTSxVQUFVLENBQUMsS0FBSztRQUNyQixJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBRS9DLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUMzRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFDLElBQUksR0FBRSxHQUFHLENBQUMsQ0FBQztZQUV2TSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1NBQzFCO1FBRUQsSUFBSSxDQUFDLEtBQUssR0FBRztZQUNYLElBQUksRUFBRSxJQUFJO1lBQ1YsTUFBTSxFQUFFLElBQUk7WUFDWixPQUFPLEVBQUUsSUFBSTtZQUNiLEtBQUssRUFBRTtnQkFDTCxLQUFLLEVBQUUsSUFBSTtnQkFDWCxPQUFPLEVBQUUsSUFBSTthQUNkO1lBQ0QsU0FBUyxFQUFFLElBQUk7WUFDZixNQUFNLEVBQUUsS0FBSztZQUNiLE1BQU0sRUFBRSxLQUFLO1NBQ2QsQ0FBQztRQUVGLDJDQUEyQztRQUMzQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUFBLENBQUM7Ozs7OztJQU9NLGdCQUFnQixDQUFDLEtBQVU7UUFDakMsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyRCxDQUFDOzs7Ozs7SUFjTyxlQUFlLENBQUMsS0FBVTtRQUNoQyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUNoRixDQUFDOzs7Ozs7SUFPTyxRQUFRLENBQUMsS0FBVTtRQUN6QixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdDLENBQUM7Ozs7Ozs7SUFRTyxXQUFXLENBQUMsTUFBYyxFQUFFLE1BQWM7UUFDaEQsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDekQsQ0FBQzs7Ozs7O0lBT08sR0FBRyxDQUFDLGFBQXFCO1FBQy9CLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDaEQsQ0FBQzs7Ozs7O0lBTU8sTUFBTSxDQUFDLElBQVk7UUFDekIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQzs7Ozs7SUFLTyxZQUFZO1FBQ2xCLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckMsQ0FBQzs7Ozs7SUFLRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUN6QyxDQUFDOzs7OztJQUtPLGNBQWM7UUFDcEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QyxDQUFDOzs7Ozs7SUFNRCxLQUFLLENBQUMsRUFBRTtRQUNOLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7OztZQW5hRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFdBQVc7Z0JBQ3JCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJUO2dCQUNELFVBQVUsRUFBRTtvQkFDVixPQUFPLENBQUMsWUFBWSxFQUFFO3dCQUNwQixLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxFQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO3dCQUNuQyxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxFQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUMsQ0FBQyxDQUFDO3dCQUNuQyxVQUFVLENBQUMsZ0JBQWdCLEVBQUU7NEJBQzNCLHdCQUF3Qjs0QkFDeEIsT0FBTyxDQUFDLGFBQWEsQ0FBQzt5QkFDdkIsQ0FBQzt3QkFDRixVQUFVLENBQUMsZ0JBQWdCLEVBQUU7NEJBQzNCLHNCQUFzQjs0QkFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQzt5QkFDYixDQUFDO3FCQUNILENBQUM7aUJBQ0g7YUFDRjs7OztZQXBEbUIsTUFBTTtZQUFFLFVBQVU7WUFBZ0IsU0FBUztZQUN0RCxlQUFlO1lBS2YsY0FBYzs7OzJCQW1EcEIsS0FBSzt3QkFRTCxLQUFLO3lCQUtMLEtBQUs7MEJBbUVMLFlBQVksU0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUM7MkJBTXBDLFlBQVksU0FBQyxZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUM7NEJBTXJDLFlBQVksU0FBQyxhQUFhLEVBQUUsQ0FBQyxRQUFRLENBQUM7MEJBSXRDLFlBQVksU0FBQyxXQUFXOzRCQU14QixZQUFZLFNBQUMsYUFBYTs7Ozs7OztJQXRHM0Isc0NBR0U7Ozs7O0lBS0YsbUNBQThCOzs7OztJQUs5QixvQ0FBa0M7Ozs7O0lBS2xDLDJDQUE4Qjs7Ozs7SUFJOUIsMkNBQThCOzs7OztJQUk5Qiw4Q0FBaUM7Ozs7O0lBSWpDLDhDQUFpQzs7Ozs7SUFLakMseUNBQTRCOzs7OztJQUk1QiwwQ0FBNkI7Ozs7O0lBSzdCLDBDQUE2Qjs7SUFFN0Isc0NBQXlCOzs7OztJQUt6QiwrQkFXRTs7Ozs7SUFLRix1Q0FBMkM7Ozs7O0lBSzNDLDZDQUEwQzs7Ozs7SUFtRDFDLCtDQUVDOzs7OztJQUtELHdDQUVDOzs7OztJQUtELHVDQUlDOzs7OztJQStKRCwwQ0FHQzs7SUFyT1csOEJBQW9COztJQUNwQiw0QkFBc0I7O0lBQ3RCLGtDQUEyQjs7SUFDM0IseUNBQXdDOztJQUN4Qyx3Q0FBc0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE5nWm9uZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBSZW5kZXJlcjIsIE9uSW5pdCwgT25EZXN0cm95LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDYXJvdXNlbFNlcnZpY2UsIENvb3JkcyB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2Nhcm91c2VsLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZmlyc3QgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IFN0YWdlRGF0YSB9IGZyb20gJy4uLy4uL21vZGVscy9zdGFnZS1kYXRhLm1vZGVsJztcclxuaW1wb3J0IHsgU2xpZGVNb2RlbCB9IGZyb20gJy4uLy4uL21vZGVscy9zbGlkZS5tb2RlbCc7XHJcbmltcG9ydCB7IEFuaW1hdGVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYW5pbWF0ZS5zZXJ2aWNlJztcclxuaW1wb3J0IHtcclxuICB0cmlnZ2VyLFxyXG4gIHN0YXRlLFxyXG4gIHN0eWxlLFxyXG4gIGFuaW1hdGUsXHJcbiAgdHJhbnNpdGlvblxyXG59IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ293bC1zdGFnZScsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJvd2wtc3RhZ2VcIiBbbmdTdHlsZV09XCJ7J3dpZHRoJzogc3RhZ2VEYXRhLndpZHRoICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0cmFuc2Zvcm0nOiBzdGFnZURhdGEudHJhbnNmb3JtLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3RyYW5zaXRpb24nOiBzdGFnZURhdGEudHJhbnNpdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdwYWRkaW5nLWxlZnQnOiBzdGFnZURhdGEucGFkZGluZ0wgKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3BhZGRpbmctcmlnaHQnOiBzdGFnZURhdGEucGFkZGluZ1IgKyAncHgnIH1cIlxyXG4gICAgICAgICAgKHRyYW5zaXRpb25lbmQpPVwib25UcmFuc2l0aW9uRW5kKClcIj5cclxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBzbGlkZSBvZiBzbGlkZXNEYXRhOyBsZXQgaSA9IGluZGV4XCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwib3dsLWl0ZW1cIiBbbmdDbGFzc109XCJzbGlkZS5jbGFzc2VzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdTdHlsZV09XCJ7J3dpZHRoJzogc2xpZGUud2lkdGggKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdtYXJnaW4tbGVmdCc6IHNsaWRlLm1hcmdpbkwgKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdtYXJnaW4tcmlnaHQnOiBzbGlkZS5tYXJnaW5SICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbGVmdCc6IHNsaWRlLmxlZnR9XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoYW5pbWF0aW9uZW5kKT1cImNsZWFyKHNsaWRlLmlkKVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW0BhdXRvSGVpZ2h0XT1cInNsaWRlLmhlaWdodFN0YXRlXCI+XHJcbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdJZj1cInNsaWRlLmxvYWRcIiBbbmdUZW1wbGF0ZU91dGxldF09XCJzbGlkZS50cGxSZWZcIj48L25nLXRlbXBsYXRlPlxyXG4gICAgICAgICAgPC9kaXY+PCEtLSAvLm93bC1pdGVtIC0tPlxyXG4gICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICA8L2Rpdj48IS0tIC8ub3dsLXN0YWdlIC0tPlxyXG4gICAgPC9kaXY+XHJcbiAgYCxcclxuICBhbmltYXRpb25zOiBbXHJcbiAgICB0cmlnZ2VyKCdhdXRvSGVpZ2h0JywgW1xyXG4gICAgICBzdGF0ZSgnbnVsbGVkJywgc3R5bGUoe2hlaWdodDogMH0pKSxcclxuICAgICAgc3RhdGUoJ2Z1bGwnLCBzdHlsZSh7aGVpZ2h0OiAnKid9KSksXHJcbiAgICAgIHRyYW5zaXRpb24oJ2Z1bGwgPT4gbnVsbGVkJywgW1xyXG4gICAgICAgIC8vIHN0eWxlKHtoZWlnaHQ6ICcqJ30pLFxyXG4gICAgICAgIGFuaW1hdGUoJzcwMG1zIDM1MG1zJylcclxuICAgICAgXSksXHJcbiAgICAgIHRyYW5zaXRpb24oJ251bGxlZCA9PiBmdWxsJywgW1xyXG4gICAgICAgIC8vIHN0eWxlKHtoZWlnaHQ6IDB9KSxcclxuICAgICAgICBhbmltYXRlKDM1MClcclxuICAgICAgXSksXHJcbiAgICBdKVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFN0YWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIC8qKlxyXG4gICAqIE9iamVjdCB3aXRoIHNldHRpbmdzIHdoaWNoIG1ha2UgY2Fyb3VzZWwgZHJhZ2dhYmxlIGJ5IHRvdWNoIG9yIG1vdXNlXHJcbiAgICovXHJcbiAgQElucHV0KCkgb3dsRHJhZ2dhYmxlOiB7XHJcbiAgICBpc01vdXNlRHJhZ2FibGU6IGJvb2xlYW4sXHJcbiAgICBpc1RvdWNoRHJhZ2FibGU6IGJvb2xlYW5cclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBEYXRhIG9mIG93bC1zdGFnZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHN0YWdlRGF0YTogU3RhZ2VEYXRhO1xyXG5cclxuXHQvKipcclxuXHQgKiAgRGF0YSBvZiBldmVyeSBzbGlkZVxyXG5cdCAqL1xyXG4gIEBJbnB1dCgpIHNsaWRlc0RhdGE6IFNsaWRlTW9kZWxbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogRnVuY3Rpb24gd2ljaCB3aWxsIGJlIHJldHVybmVkIGFmdGVyIGF0dGFjaGluZyBsaXN0ZW5lciB0byAnbW91c2Vtb3ZlJyBldmVudFxyXG4gICAqL1xyXG4gIGxpc3RlbmVyTW91c2VNb3ZlOiAoKSA9PiB2b2lkO1xyXG4gIC8qKlxyXG4gICAqIEZ1bmN0aW9uIHdpY2ggd2lsbCBiZSByZXR1cm5lZCBhZnRlciBhdHRhY2hpbmcgbGlzdGVuZXIgdG8gJ3RvdWNobW92ZScgZXZlbnRcclxuICAgKi9cclxuICBsaXN0ZW5lclRvdWNoTW92ZTogKCkgPT4gdm9pZDtcclxuICAvKipcclxuICAgKiBGdW5jdGlvbiB3aWNoIHdpbGwgYmUgcmV0dXJuZWQgYWZ0ZXIgYXR0YWNoaW5nIGxpc3RlbmVyIHRvICdtb3VzZW1vdmUnIGV2ZW50XHJcbiAgICovXHJcbiAgbGlzdGVuZXJPbmVNb3VzZU1vdmU6ICgpID0+IHZvaWQ7XHJcbiAgLyoqXHJcbiAgICogRnVuY3Rpb24gd2ljaCB3aWxsIGJlIHJldHVybmVkIGFmdGVyIGF0dGFjaGluZyBsaXN0ZW5lciB0byAndG91Y2htb3ZlJyBldmVudFxyXG4gICAqL1xyXG4gIGxpc3RlbmVyT25lVG91Y2hNb3ZlOiAoKSA9PiB2b2lkO1xyXG5cclxuICAvKipcclxuICAgKiBGdW5jdGlvbiB3aWNoIHdpbGwgYmUgcmV0dXJuZWQgYWZ0ZXIgYXR0YWNoaW5nIGxpc3RlbmVyIHRvICdtb3VzZXVwJyBldmVudFxyXG4gICAqL1xyXG4gIGxpc3RlbmVyTW91c2VVcDogKCkgPT4gdm9pZDtcclxuICAvKipcclxuICAgKiBGdW5jdGlvbiB3aWNoIHdpbGwgYmUgcmV0dXJuZWQgYWZ0ZXIgYXR0YWNoaW5nIGxpc3RlbmVyIHRvICd0b3VjaGVuZCcgZXZlbnRcclxuICAgKi9cclxuICBsaXN0ZW5lclRvdWNoRW5kOiAoKSA9PiB2b2lkO1xyXG5cclxuICAvKipcclxuICAgKiBGdW5jdGlvbiB3aWNoIHdpbGwgYmUgcmV0dXJuZWQgYWZ0ZXIgYXR0YWNoaW5nIGxpc3RlbmVyIHRvICdjbGljaycgZXZlbnRcclxuICAgKi9cclxuICBsaXN0ZW5lck9uZUNsaWNrOiAoKSA9PiB2b2lkO1xyXG5cclxuICBsaXN0ZW5lckFUYWc6ICgpID0+IHZvaWQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIE9iamVjdCB3aXRoIGRhdGEgbmVlZGVkIGZvciBkcmFnZ2luZ1xyXG4gICAqL1xyXG4gIHByaXZhdGUgX2RyYWc6IGFueSA9IHtcclxuICAgIHRpbWU6IG51bGwsXHJcbiAgICB0YXJnZXQ6IG51bGwsXHJcbiAgICBwb2ludGVyOiBudWxsLFxyXG4gICAgc3RhZ2U6IHtcclxuICAgICAgc3RhcnQ6IG51bGwsXHJcbiAgICAgIGN1cnJlbnQ6IG51bGxcclxuICAgIH0sXHJcbiAgICBkaXJlY3Rpb246IG51bGwsXHJcbiAgICBhY3RpdmU6IGZhbHNlLFxyXG4gICAgbW92aW5nOiBmYWxzZVxyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSBjYXJvdXNlbCdzIHJlYnVpbGRpbmcgY2F1c2VkIGJ5IHJlc2l6ZSBldmVudCBzdGFydHNcclxuICAgKi9cclxuICBwcml2YXRlIF9vbmVEcmFnTW92ZSQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjdGlwdGlvbiB0byBfb25lRHJhZ01vdmUkIFN1YmplY3RcclxuICAgKi9cclxuICBwcml2YXRlIF9vbmVNb3ZlU3Vic3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB6b25lOiBOZ1pvbmUsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcclxuICAgICAgICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSBjYXJvdXNlbFNlcnZpY2U6IENhcm91c2VsU2VydmljZSxcclxuICAgICAgICAgICAgICBwcml2YXRlIGFuaW1hdGVTZXJ2aWNlOiBBbmltYXRlU2VydmljZSkgeyB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZG93bicsIFsnJGV2ZW50J10pIG9uTW91c2VEb3duKGV2ZW50KSB7XHJcbiAgICBpZiAodGhpcy5vd2xEcmFnZ2FibGUuaXNNb3VzZURyYWdhYmxlKSB7XHJcbiAgICAgIHRoaXMuX29uRHJhZ1N0YXJ0KGV2ZW50KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBbJyRldmVudCddKSBvblRvdWNoU3RhcnQoZXZlbnQpIHtcclxuICAgIGlmICh0aGlzLm93bERyYWdnYWJsZS5pc1RvdWNoRHJhZ2FibGUpIHtcclxuICAgICAgdGhpcy5fb25EcmFnU3RhcnQoZXZlbnQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcigndG91Y2hjYW5jZWwnLCBbJyRldmVudCddKSBvblRvdWNoQ2FuY2VsKGV2ZW50KSB7XHJcbiAgICB0aGlzLl9vbkRyYWdFbmQoZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignZHJhZ3N0YXJ0Jykgb25EcmFnU3RhcnQoKSB7XHJcbiAgICBpZiAodGhpcy5vd2xEcmFnZ2FibGUuaXNNb3VzZURyYWdhYmxlKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ3NlbGVjdHN0YXJ0Jykgb25TZWxlY3RTdGFydCgpIHtcclxuICAgIGlmICh0aGlzLm93bERyYWdnYWJsZS5pc01vdXNlRHJhZ2FibGUpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLl9vbmVNb3ZlU3Vic3JpcHRpb24gPSB0aGlzLl9vbmVEcmFnTW92ZSRcclxuICAgICAgLnBpcGUoZmlyc3QoKSlcclxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5fc2VuZENoYW5nZXMoKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuX29uZU1vdmVTdWJzcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUGFzc2VzIHRoaXMgdG8gX29uZU1vdXNlVG91Y2hNb3ZlKCk7XHJcbiAgICovXHJcbiAgYmluZE9uZU1vdXNlVG91Y2hNb3ZlID0gKGV2KSA9PiB7XHJcbiAgICB0aGlzLl9vbmVNb3VzZVRvdWNoTW92ZShldik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQYXNzZXMgdGhpcyB0byBfb25EcmFnTW92ZSgpO1xyXG4gICAqL1xyXG4gIGJpbmRPbkRyYWdNb3ZlID0gKGV2KSA9PiB7XHJcbiAgICB0aGlzLl9vbkRyYWdNb3ZlKGV2KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFBhc3NlcyB0aGlzIHRvIF9vbkRyYWdNb3ZlKCk7XHJcbiAgICovXHJcbiAgYmluZE9uRHJhZ0VuZCA9IChldikgPT4ge1xyXG4gICAgLy8gdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgIHRoaXMuX29uRHJhZ0VuZChldik7XHJcbiAgICAvLyB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEhhbmRsZXMgYHRvdWNoc3RhcnRgIGFuZCBgbW91c2Vkb3duYCBldmVudHMuXHJcblx0ICogQHRvZG8gSG9yaXpvbnRhbCBzd2lwZSB0aHJlc2hvbGQgYXMgb3B0aW9uXHJcblx0ICogQHRvZG8gIzI2MVxyXG5cdCAqIEBwYXJhbSBldmVudCAtIFRoZSBldmVudCBhcmd1bWVudHMuXHJcblx0ICovXHJcblx0cHJpdmF0ZSBfb25EcmFnU3RhcnQoZXZlbnQpOiBhbnkge1xyXG5cdFx0bGV0IHN0YWdlOiBDb29yZHMgPSBudWxsO1xyXG5cclxuXHRcdGlmIChldmVudC53aGljaCA9PT0gMykge1xyXG5cdFx0XHRyZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgc3RhZ2UgPSB0aGlzLl9wcmVwYXJlRHJhZ2dpbmcoZXZlbnQpO1xyXG5cclxuXHRcdHRoaXMuX2RyYWcudGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG5cdFx0dGhpcy5fZHJhZy50YXJnZXQgPSBldmVudC50YXJnZXQ7XHJcblx0XHR0aGlzLl9kcmFnLnN0YWdlLnN0YXJ0ID0gc3RhZ2U7XHJcblx0XHR0aGlzLl9kcmFnLnN0YWdlLmN1cnJlbnQgPSBzdGFnZTtcclxuICAgIHRoaXMuX2RyYWcucG9pbnRlciA9IHRoaXMuX3BvaW50ZXIoZXZlbnQpO1xyXG4gICAgdGhpcy5fZHJhZy5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMubGlzdGVuZXJNb3VzZVVwID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oZG9jdW1lbnQsICdtb3VzZXVwJywgdGhpcy5iaW5kT25EcmFnRW5kKTtcclxuICAgIHRoaXMubGlzdGVuZXJUb3VjaEVuZCA9IHRoaXMucmVuZGVyZXIubGlzdGVuKGRvY3VtZW50LCAndG91Y2hlbmQnLCB0aGlzLmJpbmRPbkRyYWdFbmQpO1xyXG5cclxuICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgIHRoaXMubGlzdGVuZXJPbmVNb3VzZU1vdmUgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbihkb2N1bWVudCwgJ21vdXNlbW92ZScsIHRoaXMuYmluZE9uZU1vdXNlVG91Y2hNb3ZlKTtcclxuICAgICAgdGhpcy5saXN0ZW5lck9uZVRvdWNoTW92ZSA9IHRoaXMucmVuZGVyZXIubGlzdGVuKGRvY3VtZW50LCAndG91Y2htb3ZlJywgdGhpcy5iaW5kT25lTW91c2VUb3VjaE1vdmUpO1xyXG4gICAgfSk7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQXR0YWNoZXMgbGlzdGVuZXJzIHRvIGB0b3VjaG1vdmVgIGFuZCBgbW91c2Vtb3ZlYCBldmVudHM7IGluaXRpYXRlcyB1cGRhdGluZyBjYXJvdXNlbCBhZnRlciBzdGFydGluZyBkcmFnZ2luZ1xyXG4gICAqIEBwYXJhbSBldmVudCBldmVudCBvYmplY2ggb2YgbW91c2Ugb3IgdG91Y2ggZXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIF9vbmVNb3VzZVRvdWNoTW92ZShldmVudCkge1xyXG4gICAgaWYgKCF0aGlzLl9kcmFnLmFjdGl2ZSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgY29uc3QgZGVsdGEgPSB0aGlzLl9kaWZmZXJlbmNlKHRoaXMuX2RyYWcucG9pbnRlciwgdGhpcy5fcG9pbnRlcihldmVudCkpO1xyXG4gICAgaWYgKHRoaXMubGlzdGVuZXJBVGFnKSB7XHJcbiAgICAgIHRoaXMubGlzdGVuZXJBVGFnKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5saXN0ZW5lck9uZU1vdXNlTW92ZSgpO1xyXG4gICAgdGhpcy5saXN0ZW5lck9uZVRvdWNoTW92ZSgpO1xyXG5cclxuICAgIGlmIChNYXRoLmFicyhkZWx0YS54KSA8IE1hdGguYWJzKGRlbHRhLnkpICYmIHRoaXMuX2lzKCd2YWxpZCcpKSB7XHJcbiAgICAgIHRoaXMuX2RyYWcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuX2RyYWcubW92aW5nID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLmJsb2NrQ2xpY2tBbmNob3JJbkRyYWdnaW5nKGV2ZW50KTtcclxuXHJcbiAgICB0aGlzLmxpc3RlbmVyTW91c2VNb3ZlID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oZG9jdW1lbnQsICdtb3VzZW1vdmUnLCB0aGlzLmJpbmRPbkRyYWdNb3ZlKTtcclxuICAgIHRoaXMubGlzdGVuZXJUb3VjaE1vdmUgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbihkb2N1bWVudCwgJ3RvdWNobW92ZScsIHRoaXMuYmluZE9uRHJhZ01vdmUpO1xyXG5cclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgdGhpcy5fZW50ZXJEcmFnZ2luZygpO1xyXG4gICAgdGhpcy5fb25lRHJhZ01vdmUkLm5leHQoZXZlbnQpO1xyXG4gICAgLy8gdGhpcy5fc2VuZENoYW5nZXMoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEF0dGFjaGVzIGhhbmRsZXIgdG8gSFRNTEFuY2hvckVsZW1lbnQgZm9yIHByZXZlbnRpbmcgY2xpY2sgd2hpbGUgY2Fyb3VzZWwgaXMgYmVpbmcgZHJhZ2dlZFxyXG4gICAqIEBwYXJhbSBldmVudCBldmVudCBvYmplY3RcclxuICAgKi9cclxuICBwcml2YXRlIGJsb2NrQ2xpY2tBbmNob3JJbkRyYWdnaW5nKGV2ZW50OiBhbnkpIHtcclxuICAgIGxldCB0YXJnZXQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IGV2ZW50LnRhcmdldDtcclxuICAgIHdoaWxlICh0YXJnZXQgJiYgISh0YXJnZXQgaW5zdGFuY2VvZiBIVE1MQW5jaG9yRWxlbWVudCkpIHtcclxuICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQ7XHJcbiAgICB9XHJcbiAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgSFRNTEFuY2hvckVsZW1lbnQpIHtcclxuICAgICAgdGhpcy5saXN0ZW5lckFUYWcgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0YXJnZXQsICdjbGljaycsICgpID0+IGZhbHNlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIFx0LyoqXHJcblx0ICogSGFuZGxlcyB0aGUgYHRvdWNobW92ZWAgYW5kIGBtb3VzZW1vdmVgIGV2ZW50cy5cclxuXHQgKiBAdG9kbyAjMjYxXHJcblx0ICogQHBhcmFtIGV2ZW50IC0gVGhlIGV2ZW50IGFyZ3VtZW50cy5cclxuXHQgKi9cclxuXHRwcml2YXRlIF9vbkRyYWdNb3ZlKGV2ZW50KSB7XHJcbiAgICBpZiAoIXRoaXMuX2RyYWcuYWN0aXZlKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgbGV0IHN0YWdlOiBDb29yZHM7XHJcbiAgICBjb25zdCBzdGFnZU9yRXhpdDogYm9vbGVhbiB8IENvb3JkcyA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmRlZmluZU5ld0Nvb3Jkc0RyYWcoZXZlbnQsIHRoaXMuX2RyYWcpO1xyXG5cclxuICAgIGlmIChzdGFnZU9yRXhpdCA9PT0gZmFsc2UpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgc3RhZ2UgPSBzdGFnZU9yRXhpdCBhcyBDb29yZHM7XHJcblxyXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICB0aGlzLl9kcmFnLnN0YWdlLmN1cnJlbnQgPSBzdGFnZTtcclxuXHRcdHRoaXMuX2FuaW1hdGUoc3RhZ2UueCAtIHRoaXMuX2RyYWcuc3RhZ2Uuc3RhcnQueCk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogTW92ZXMgLm93bC1zdGFnZSBsZWZ0LXJpZ2h0XHJcbiAgICogQHBhcmFtIGNvb3JkaW5hdGUgY29vcmRpbmF0ZSB0byBiZSBzZXQgdG8gLm93bC1zdGFnZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2FuaW1hdGUoY29vcmRpbmF0ZTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXSwgJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGUzZCgke2Nvb3JkaW5hdGV9cHgsMHB4LDBweGApO1xyXG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0sICd0cmFuc2l0aW9uJywgJzBzJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuXHQgKiBIYW5kbGVzIHRoZSBgdG91Y2hlbmRgIGFuZCBgbW91c2V1cGAgZXZlbnRzLlxyXG5cdCAqIEB0b2RvICMyNjFcclxuXHQgKiBAdG9kbyBUaHJlc2hvbGQgZm9yIGNsaWNrIGV2ZW50XHJcblx0ICogQHBhcmFtIGV2ZW50IC0gVGhlIGV2ZW50IGFyZ3VtZW50cy5cclxuXHQgKi9cclxuXHRwcml2YXRlIF9vbkRyYWdFbmQoZXZlbnQpIHtcclxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm93bERPTURhdGEuaXNHcmFiID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKHRoaXMuX2RyYWcubW92aW5nKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdLCAndHJhbnNmb3JtJywgYGApO1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXSwgJ3RyYW5zaXRpb24nLCB0aGlzLmNhcm91c2VsU2VydmljZS5zcGVlZCgrdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuZHJhZ0VuZFNwZWVkIHx8IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLnNtYXJ0U3BlZWQpLzEwMDAgKydzJyk7XHJcblxyXG4gICAgICB0aGlzLl9maW5pc2hEcmFnZ2luZyhldmVudCk7XHJcbiAgICAgIHRoaXMubGlzdGVuZXJNb3VzZU1vdmUoKTtcclxuICAgICAgdGhpcy5saXN0ZW5lclRvdWNoTW92ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2RyYWcgPSB7XHJcbiAgICAgIHRpbWU6IG51bGwsXHJcbiAgICAgIHRhcmdldDogbnVsbCxcclxuICAgICAgcG9pbnRlcjogbnVsbCxcclxuICAgICAgc3RhZ2U6IHtcclxuICAgICAgICBzdGFydDogbnVsbCxcclxuICAgICAgICBjdXJyZW50OiBudWxsXHJcbiAgICAgIH0sXHJcbiAgICAgIGRpcmVjdGlvbjogbnVsbCxcclxuICAgICAgYWN0aXZlOiBmYWxzZSxcclxuICAgICAgbW92aW5nOiBmYWxzZVxyXG4gICAgfTtcclxuXHJcbiAgICAvLyB0aGlzLmNhcm91c2VsU2VydmljZS50cmlnZ2VyKCdkcmFnZ2VkJyk7XHJcbiAgICB0aGlzLmxpc3RlbmVyTW91c2VVcCgpO1xyXG4gICAgdGhpcy5saXN0ZW5lclRvdWNoRW5kKCk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcblx0ICogUHJlcGFyZXMgZGF0YSBmb3IgZHJhZ2dpbmcgY2Fyb3VzZWwuIEl0IHN0YXJ0cyBhZnRlciBmaXJpbmcgYHRvdWNoc3RhcnRgIGFuZCBgbW91c2Vkb3duYCBldmVudHMuXHJcblx0ICogQHBhcmFtIGV2ZW50IC0gVGhlIGV2ZW50IGFyZ3VtZW50cy5cclxuXHQgKiBAcmV0dXJucyBzdGFnZSAtIG9iamVjdCB3aXRoICd4JyBhbmQgJ3knIGNvb3JkaW5hdGVzIG9mIC5vd2wtc3RhZ2VcclxuXHQgKi9cclxuICBwcml2YXRlIF9wcmVwYXJlRHJhZ2dpbmcoZXZlbnQ6IGFueSk6IENvb3JkcyB7XHJcbiAgICByZXR1cm4gdGhpcy5jYXJvdXNlbFNlcnZpY2UucHJlcGFyZURyYWdnaW5nKGV2ZW50KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEF0dGFjaGVzIGhhbmRsZXIgZm9yICdjbGljaycgZXZlbnQgb24gYW55IGVsZW1lbnQgaW4gLm93bC1zdGFnZSBpbiBvcmRlciB0byBwcmV2ZW50IGRyYWdnaW5nIHdoZW4gbW92aW5nIG9mIGN1cnNvciBpcyBsZXNzIHRoYW4gM3B4XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfb25lQ2xpY2tIYW5kbGVyID0gKCkgPT4ge1xyXG4gICAgdGhpcy5saXN0ZW5lck9uZUNsaWNrID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5fZHJhZy50YXJnZXQsICdjbGljaycsICgpID0+IGZhbHNlKVxyXG4gICAgdGhpcy5saXN0ZW5lck9uZUNsaWNrKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGaW5pc2hlcyBkcmFnZ2luZ1xyXG4gICAqIEBwYXJhbSBldmVudCBvYmplY3QgZXZlbnQgb2YgJ21vdXNlVXAnIG9mICd0b3VjaGVuZCcgZXZlbnRzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZmluaXNoRHJhZ2dpbmcoZXZlbnQ6IGFueSkge1xyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UuZmluaXNoRHJhZ2dpbmcoZXZlbnQsIHRoaXMuX2RyYWcsIHRoaXMuX29uZUNsaWNrSGFuZGxlcik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuXHQgKiBHZXRzIHVuaWZpZWQgcG9pbnRlciBjb29yZGluYXRlcyBmcm9tIGV2ZW50LlxyXG5cdCAqIEBwYXJhbSBldmVudCBUaGUgYG1vdXNlZG93bmAgb3IgYHRvdWNoc3RhcnRgIGV2ZW50LlxyXG5cdCAqIEByZXR1cm5zIENvbnRhaW5zIGB4YCBhbmQgYHlgIGNvb3JkaW5hdGVzIG9mIGN1cnJlbnQgcG9pbnRlciBwb3NpdGlvbi5cclxuXHQgKi9cclxuICBwcml2YXRlIF9wb2ludGVyKGV2ZW50OiBhbnkpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnBvaW50ZXIoZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcblx0ICogR2V0cyB0aGUgZGlmZmVyZW5jZSBvZiB0d28gdmVjdG9ycy5cclxuXHQgKiBAcGFyYW0gZmlyc3QgVGhlIGZpcnN0IHZlY3Rvci5cclxuXHQgKiBAcGFyYW0gc2Vjb25kLSBUaGUgc2Vjb25kIHZlY3Rvci5cclxuXHQgKiBAcmV0dXJucyBUaGUgZGlmZmVyZW5jZS5cclxuXHQgKi9cclxuICBwcml2YXRlIF9kaWZmZXJlbmNlKGZpcnN0QzogQ29vcmRzLCBzZWNvbmQ6IENvb3Jkcyk6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZGlmZmVyZW5jZShmaXJzdEMsIHNlY29uZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuXHQgKiBDaGVja3Mgd2hldGhlciB0aGUgY2Fyb3VzZWwgaXMgaW4gYSBzcGVjaWZpYyBzdGF0ZSBvciBub3QuXHJcblx0ICogQHBhcmFtIHNwZWNpZmljU3RhdGUgVGhlIHN0YXRlIHRvIGNoZWNrLlxyXG5cdCAqIEByZXR1cm5zIFRoZSBmbGFnIHdoaWNoIGluZGljYXRlcyBpZiB0aGUgY2Fyb3VzZWwgaXMgYnVzeS5cclxuXHQgKi9cclxuICBwcml2YXRlIF9pcyhzcGVjaWZpY1N0YXRlOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmNhcm91c2VsU2VydmljZS5pcyhzcGVjaWZpY1N0YXRlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogRW50ZXJzIGEgc3RhdGUuXHJcbiAgKiBAcGFyYW0gbmFtZSBUaGUgc3RhdGUgbmFtZS5cclxuICAqL1xyXG4gIHByaXZhdGUgX2VudGVyKG5hbWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UuZW50ZXIobmFtZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuXHQgKiBTZW5kcyBhbGwgZGF0YSBuZWVkZWQgZm9yIFZpZXcuXHJcblx0ICovXHJcbiAgcHJpdmF0ZSBfc2VuZENoYW5nZXMoKSB7XHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5zZW5kQ2hhbmdlcygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlciBmb3IgdHJhbnNpdGlvZW5kIGV2ZW50XHJcbiAgICovXHJcbiAgb25UcmFuc2l0aW9uRW5kKCkge1xyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uub25UcmFuc2l0aW9uRW5kKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuXHQgKiBFbnRlcnMgaW50byBhICdkcmFnZ2luZycgc3RhdGVcclxuXHQgKi9cclxuICBwcml2YXRlIF9lbnRlckRyYWdnaW5nKCkge1xyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UuZW50ZXJEcmFnZ2luZygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlcyB0aGUgZW5kIG9mICdhbmltYXRpb25lbmQnIGV2ZW50XHJcbiAgICogQHBhcmFtIGlkIElkIG9mIHNsaWRlc1xyXG4gICAqL1xyXG4gIGNsZWFyKGlkKSB7XHJcbiAgICB0aGlzLmFuaW1hdGVTZXJ2aWNlLmNsZWFyKGlkKTtcclxuICB9XHJcbn1cclxuIl19