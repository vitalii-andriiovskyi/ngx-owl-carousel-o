import { Component, HostListener, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { trigger, state, style, animate, transition } from '@angular/animations';
import * as i0 from "@angular/core";
import * as i1 from "../../services/carousel.service";
import * as i2 from "../../services/animate.service";
import * as i3 from "@angular/common";
export class StageComponent {
    zone;
    el;
    renderer;
    carouselService;
    animateService;
    /**
     * Object with settings which make carousel draggable by touch or mouse
     */
    owlDraggable;
    /**
     * Data of owl-stage
     */
    stageData;
    /**
     *  Data of every slide
     */
    slidesData;
    /**
     * Function wich will be returned after attaching listener to 'mousemove' event
     */
    listenerMouseMove;
    /**
     * Function wich will be returned after attaching listener to 'touchmove' event
     */
    listenerTouchMove;
    /**
     * Function wich will be returned after attaching listener to 'mousemove' event
     */
    listenerOneMouseMove;
    /**
     * Function wich will be returned after attaching listener to 'touchmove' event
     */
    listenerOneTouchMove;
    /**
     * Function wich will be returned after attaching listener to 'mouseup' event
     */
    listenerMouseUp;
    /**
     * Function wich will be returned after attaching listener to 'touchend' event
     */
    listenerTouchEnd;
    /**
     * Function wich will be returned after attaching listener to 'click' event
     */
    listenerOneClick;
    listenerATag;
    /**
     * Object with data needed for dragging
     */
    _drag = {
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
    _oneDragMove$ = new Subject();
    /**
     * Subsctiption to _oneDragMove$ Subject
     */
    _oneMoveSubsription;
    preparePublicSlide = (slide) => {
        const newSlide = { ...slide };
        delete newSlide.tplRef;
        return newSlide;
    };
    constructor(zone, el, renderer, carouselService, animateService) {
        this.zone = zone;
        this.el = el;
        this.renderer = renderer;
        this.carouselService = carouselService;
        this.animateService = animateService;
    }
    onMouseDown(event) {
        if (this.owlDraggable.isMouseDragable) {
            this._onDragStart(event);
        }
    }
    onTouchStart(event) {
        if (event.targetTouches.length >= 2) {
            return false;
        }
        if (this.owlDraggable.isTouchDragable) {
            this._onDragStart(event);
        }
    }
    onTouchCancel(event) {
        this._onDragEnd(event);
    }
    onDragStart() {
        if (this.owlDraggable.isMouseDragable) {
            return false;
        }
    }
    onSelectStart() {
        if (this.owlDraggable.isMouseDragable) {
            return false;
        }
    }
    ngOnInit() {
        this._oneMoveSubsription = this._oneDragMove$
            .pipe(first())
            .subscribe(() => {
            this._sendChanges();
        });
    }
    ngOnDestroy() {
        this._oneMoveSubsription.unsubscribe();
    }
    /**
     * Passes this to _oneMouseTouchMove();
     */
    bindOneMouseTouchMove = (ev) => {
        this._oneMouseTouchMove(ev);
    };
    /**
     * Passes this to _onDragMove();
     */
    bindOnDragMove = (ev) => {
        this._onDragMove(ev);
    };
    /**
     * Passes this to _onDragMove();
     */
    bindOnDragEnd = (ev) => {
        // this.zone.run(() => {
        this._onDragEnd(ev);
        // });
    };
    /**
       * Handles `touchstart` and `mousedown` events.
       * @todo Horizontal swipe threshold as option
       * @todo #261
       * @param event - The event arguments.
       */
    _onDragStart(event) {
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
        this.listenerMouseUp = this.renderer.listen(document, 'mouseup', this.bindOnDragEnd);
        this.listenerTouchEnd = this.renderer.listen(document, 'touchend', this.bindOnDragEnd);
        this.zone.runOutsideAngular(() => {
            this.listenerOneMouseMove = this.renderer.listen(document, 'mousemove', this.bindOneMouseTouchMove);
            this.listenerOneTouchMove = this.renderer.listen(document, 'touchmove', this.bindOneMouseTouchMove);
        });
    }
    /**
     * Attaches listeners to `touchmove` and `mousemove` events; initiates updating carousel after starting dragging
     * @param event event objech of mouse or touch event
     */
    _oneMouseTouchMove(event) {
        const delta = this._difference(this._drag.pointer, this._pointer(event));
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
    }
    /**
     * Attaches handler to HTMLAnchorElement for preventing click while carousel is being dragged
     * @param event event object
     */
    blockClickAnchorInDragging(event) {
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
     * @todo #261
     * @param event - The event arguments.
     */
    _onDragMove(event) {
        let stage;
        const stageOrExit = this.carouselService.defineNewCoordsDrag(event, this._drag);
        if (stageOrExit === false) {
            return;
        }
        stage = stageOrExit;
        event.preventDefault();
        this._drag.stage.current = stage;
        this._animate(stage.x - this._drag.stage.start.x);
    }
    ;
    /**
     * Moves .owl-stage left-right
     * @param coordinate coordinate to be set to .owl-stage
     */
    _animate(coordinate) {
        this.renderer.setStyle(this.el.nativeElement.children[0], 'transform', `translate3d(${coordinate}px,0px,0px`);
        this.renderer.setStyle(this.el.nativeElement.children[0], 'transition', '0s');
    }
    /**
       * Handles the `touchend` and `mouseup` events.
       * @todo #261
       * @todo Threshold for click event
       * @param event - The event arguments.
       */
    _onDragEnd(event) {
        this.carouselService.owlDOMData.isGrab = false;
        this.listenerOneMouseMove();
        this.listenerOneTouchMove();
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
       * @param event - The event arguments.
       * @returns stage - object with 'x' and 'y' coordinates of .owl-stage
       */
    _prepareDragging(event) {
        return this.carouselService.prepareDragging(event);
    }
    /**
     * Attaches handler for 'click' event on any element in .owl-stage in order to prevent dragging when moving of cursor is less than 3px
     */
    _oneClickHandler = () => {
        this.listenerOneClick = this.renderer.listen(this._drag.target, 'click', () => false);
        this.listenerOneClick();
    };
    /**
     * Finishes dragging
     * @param event object event of 'mouseUp' of 'touchend' events
     */
    _finishDragging(event) {
        this.carouselService.finishDragging(event, this._drag, this._oneClickHandler);
    }
    /**
       * Gets unified pointer coordinates from event.
       * @param event The `mousedown` or `touchstart` event.
       * @returns Contains `x` and `y` coordinates of current pointer position.
       */
    _pointer(event) {
        return this.carouselService.pointer(event);
    }
    /**
       * Gets the difference of two vectors.
       * @param first The first vector.
       * @param second The second vector.
       * @returns The difference.
       */
    _difference(firstC, second) {
        return this.carouselService.difference(firstC, second);
    }
    /**
       * Checks whether the carousel is in a specific state or not.
       * @param specificState The state to check.
       * @returns The flag which indicates if the carousel is busy.
       */
    _is(specificState) {
        return this.carouselService.is(specificState);
    }
    /**
    * Enters a state.
    * @param name The state name.
    */
    _enter(name) {
        this.carouselService.enter(name);
    }
    /**
       * Sends all data needed for View.
       */
    _sendChanges() {
        this.carouselService.sendChanges();
    }
    /**
     * Handler for transitioend event
     */
    onTransitionEnd() {
        this.carouselService.onTransitionEnd();
    }
    /**
       * Enters into a 'dragging' state
       */
    _enterDragging() {
        this.carouselService.enterDragging();
    }
    /**
     * Handles the end of 'animationend' event
     * @param id Id of slides
     */
    clear(id) {
        this.animateService.clear(id);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: StageComponent, deps: [{ token: i0.NgZone }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.CarouselService }, { token: i2.AnimateService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.0.1", type: StageComponent, selector: "owl-stage", inputs: { owlDraggable: "owlDraggable", stageData: "stageData", slidesData: "slidesData" }, host: { listeners: { "mousedown": "onMouseDown($event)", "touchstart": "onTouchStart($event)", "touchcancel": "onTouchCancel($event)", "dragstart": "onDragStart()", "selectstart": "onSelectStart()" } }, ngImport: i0, template: `
    <div>
      <div class="owl-stage" [ngStyle]="{'width': stageData.width + 'px',
                                        'transform': stageData.transform,
                                        'transition': stageData.transition,
                                        'padding-left': stageData.paddingL ? stageData.paddingL + 'px' : '',
                                        'padding-right': stageData.paddingR ? stageData.paddingR + 'px' : '' }"
          (transitionend)="onTransitionEnd()">
        <ng-container *ngFor="let slide of slidesData; let i = index">
          <div class="owl-item" [ngClass]="slide.classes"
                                [ngStyle]="{'width': slide.width + 'px',
                                            'margin-left': slide.marginL ? slide.marginL + 'px' : '',
                                            'margin-right': slide.marginR ? slide.marginR + 'px' : '',
                                            'left': slide.left}"
                                (animationend)="clear(slide.id)"
                                [@autoHeight]="slide.heightState">
            <ng-template *ngIf="slide.load" [ngTemplateOutlet]="slide.tplRef" [ngTemplateOutletContext]="{ $implicit: preparePublicSlide(slide), index: i }"></ng-template>
          </div><!-- /.owl-item -->
        </ng-container>
      </div><!-- /.owl-stage -->
    </div>
  `, isInline: true, dependencies: [{ kind: "directive", type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i3.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], animations: [
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
        ] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: StageComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'owl-stage',
                    template: `
    <div>
      <div class="owl-stage" [ngStyle]="{'width': stageData.width + 'px',
                                        'transform': stageData.transform,
                                        'transition': stageData.transition,
                                        'padding-left': stageData.paddingL ? stageData.paddingL + 'px' : '',
                                        'padding-right': stageData.paddingR ? stageData.paddingR + 'px' : '' }"
          (transitionend)="onTransitionEnd()">
        <ng-container *ngFor="let slide of slidesData; let i = index">
          <div class="owl-item" [ngClass]="slide.classes"
                                [ngStyle]="{'width': slide.width + 'px',
                                            'margin-left': slide.marginL ? slide.marginL + 'px' : '',
                                            'margin-right': slide.marginR ? slide.marginR + 'px' : '',
                                            'left': slide.left}"
                                (animationend)="clear(slide.id)"
                                [@autoHeight]="slide.heightState">
            <ng-template *ngIf="slide.load" [ngTemplateOutlet]="slide.tplRef" [ngTemplateOutletContext]="{ $implicit: preparePublicSlide(slide), index: i }"></ng-template>
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
                }]
        }], ctorParameters: () => [{ type: i0.NgZone }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.CarouselService }, { type: i2.AnimateService }], propDecorators: { owlDraggable: [{
                type: Input
            }], stageData: [{
                type: Input
            }], slidesData: [{
                type: Input
            }], onMouseDown: [{
                type: HostListener,
                args: ['mousedown', ['$event']]
            }], onTouchStart: [{
                type: HostListener,
                args: ['touchstart', ['$event']]
            }], onTouchCancel: [{
                type: HostListener,
                args: ['touchcancel', ['$event']]
            }], onDragStart: [{
                type: HostListener,
                args: ['dragstart']
            }], onSelectStart: [{
                type: HostListener,
                args: ['selectstart']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtb3dsLWNhcm91c2VsLW8vc3JjL2xpYi9jYXJvdXNlbC9zdGFnZS9zdGFnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBc0IsWUFBWSxFQUFnQyxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFakgsT0FBTyxFQUFFLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSXZDLE9BQU8sRUFDTCxPQUFPLEVBQ1AsS0FBSyxFQUNMLEtBQUssRUFDTCxPQUFPLEVBQ1AsVUFBVSxFQUNYLE1BQU0scUJBQXFCLENBQUM7Ozs7O0FBd0M3QixNQUFNLE9BQU8sY0FBYztJQW9GTDtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBdkZwQjs7T0FFRztJQUNNLFlBQVksQ0FHbkI7SUFFRjs7T0FFRztJQUNNLFNBQVMsQ0FBWTtJQUUvQjs7T0FFRztJQUNPLFVBQVUsQ0FBZTtJQUVsQzs7T0FFRztJQUNILGlCQUFpQixDQUFhO0lBQzlCOztPQUVHO0lBQ0gsaUJBQWlCLENBQWE7SUFDOUI7O09BRUc7SUFDSCxvQkFBb0IsQ0FBYTtJQUNqQzs7T0FFRztJQUNILG9CQUFvQixDQUFhO0lBRWpDOztPQUVHO0lBQ0gsZUFBZSxDQUFhO0lBQzVCOztPQUVHO0lBQ0gsZ0JBQWdCLENBQWE7SUFFN0I7O09BRUc7SUFDSCxnQkFBZ0IsQ0FBYTtJQUU3QixZQUFZLENBQWE7SUFFekI7O09BRUc7SUFDSyxLQUFLLEdBQVE7UUFDbkIsSUFBSSxFQUFFLElBQUk7UUFDVixNQUFNLEVBQUUsSUFBSTtRQUNaLE9BQU8sRUFBRSxJQUFJO1FBQ2IsS0FBSyxFQUFFO1lBQ0wsS0FBSyxFQUFFLElBQUk7WUFDWCxPQUFPLEVBQUUsSUFBSTtTQUNkO1FBQ0QsU0FBUyxFQUFFLElBQUk7UUFDZixNQUFNLEVBQUUsS0FBSztRQUNiLE1BQU0sRUFBRSxLQUFLO0tBQ2QsQ0FBQztJQUVGOztPQUVHO0lBQ0ssYUFBYSxHQUFHLElBQUksT0FBTyxFQUFPLENBQUM7SUFFM0M7O09BRUc7SUFDSyxtQkFBbUIsQ0FBZTtJQUUxQyxrQkFBa0IsR0FBRyxDQUFDLEtBQWlCLEVBQWMsRUFBRTtRQUNyRCxNQUFNLFFBQVEsR0FBRyxFQUFFLEdBQUcsS0FBSyxFQUFFLENBQUM7UUFDOUIsT0FBTyxRQUFRLENBQUMsTUFBTSxDQUFDO1FBQ3ZCLE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUMsQ0FBQTtJQUVELFlBQW9CLElBQVksRUFDWixFQUFjLEVBQ2QsUUFBbUIsRUFDbkIsZUFBZ0MsRUFDaEMsY0FBOEI7UUFKOUIsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNaLE9BQUUsR0FBRixFQUFFLENBQVk7UUFDZCxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7SUFBSSxDQUFDO0lBRWhCLFdBQVcsQ0FBQyxLQUFLO1FBQ3RELElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN0QyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNCLENBQUM7SUFDSCxDQUFDO0lBRXVDLFlBQVksQ0FBQyxLQUFLO1FBQ3hELElBQUksS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDcEMsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDO1FBQ0QsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0IsQ0FBQztJQUNILENBQUM7SUFFd0MsYUFBYSxDQUFDLEtBQUs7UUFDMUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRTBCLFdBQVc7UUFDcEMsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3RDLE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQztJQUNILENBQUM7SUFFNEIsYUFBYTtRQUN4QyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDdEMsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDO0lBQ0gsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLGFBQWE7YUFDMUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ2IsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNkLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFRDs7T0FFRztJQUNILHFCQUFxQixHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUU7UUFDN0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzlCLENBQUMsQ0FBQTtJQUVEOztPQUVHO0lBQ0gsY0FBYyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUU7UUFDdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN2QixDQUFDLENBQUE7SUFFRDs7T0FFRztJQUNILGFBQWEsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFO1FBQ3JCLHdCQUF3QjtRQUN0QixJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3RCLE1BQU07SUFDUixDQUFDLENBQUE7SUFFRDs7Ozs7U0FLRTtJQUNLLFlBQVksQ0FBQyxLQUFLO1FBQ3pCLElBQUksS0FBSyxHQUFXLElBQUksQ0FBQztRQUV6QixJQUFJLEtBQUssQ0FBQyxLQUFLLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDdkIsT0FBTztRQUNOLENBQUM7UUFFRCxLQUFLLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXZDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUNqQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQy9CLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUxQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3JGLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUV2RixJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtZQUMvQixJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUNwRyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUN0RyxDQUFDLENBQUMsQ0FBQztJQUVMLENBQUM7SUFFRDs7O09BR0c7SUFDSyxrQkFBa0IsQ0FBQyxLQUFLO1FBQzlCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3pFLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN0QixDQUFDO1FBQ0QsSUFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUN6RSxPQUFPO1FBQ1QsQ0FBQztRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDMUYsT0FBTztRQUNULENBQUM7UUFDRCxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFFekIsSUFBSSxDQUFDLDBCQUEwQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXZDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMxRixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFMUYsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXZCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQix1QkFBdUI7SUFDekIsQ0FBQztJQUVEOzs7T0FHRztJQUNLLDBCQUEwQixDQUFDLEtBQVU7UUFDM0MsSUFBSSxNQUFNLEdBQXVCLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDOUMsT0FBTyxNQUFNLElBQUksQ0FBQyxDQUFDLE1BQU0sWUFBWSxpQkFBaUIsQ0FBQyxFQUFFLENBQUM7WUFDeEQsTUFBTSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUM7UUFDaEMsQ0FBQztRQUNELElBQUksTUFBTSxZQUFZLGlCQUFpQixFQUFFLENBQUM7WUFDeEMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pFLENBQUM7SUFDSCxDQUFDO0lBRUE7Ozs7T0FJQztJQUNLLFdBQVcsQ0FBQyxLQUFLO1FBQ3RCLElBQUksS0FBYSxDQUFDO1FBQ2xCLE1BQU0sV0FBVyxHQUFxQixJQUFJLENBQUMsZUFBZSxDQUFDLG1CQUFtQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFbEcsSUFBSSxXQUFXLEtBQUssS0FBSyxFQUFFLENBQUM7WUFDMUIsT0FBTztRQUNULENBQUM7UUFDRCxLQUFLLEdBQUcsV0FBcUIsQ0FBQztRQUVoQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNuQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFBQSxDQUFDO0lBRUY7OztPQUdHO0lBQ0ssUUFBUSxDQUFDLFVBQWtCO1FBQ2pDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxXQUFXLEVBQUUsZUFBZSxVQUFVLFlBQVksQ0FBQyxDQUFDO1FBQzlHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDaEYsQ0FBQztJQUVEOzs7OztTQUtFO0lBQ0ssVUFBVSxDQUFDLEtBQUs7UUFDckIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUMvQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUU1QixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUMzRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFDLElBQUksR0FBRSxHQUFHLENBQUMsQ0FBQztZQUV2TSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQzNCLENBQUM7UUFFRCxJQUFJLENBQUMsS0FBSyxHQUFHO1lBQ1gsSUFBSSxFQUFFLElBQUk7WUFDVixNQUFNLEVBQUUsSUFBSTtZQUNaLE9BQU8sRUFBRSxJQUFJO1lBQ2IsS0FBSyxFQUFFO2dCQUNMLEtBQUssRUFBRSxJQUFJO2dCQUNYLE9BQU8sRUFBRSxJQUFJO2FBQ2Q7WUFDRCxTQUFTLEVBQUUsSUFBSTtZQUNmLE1BQU0sRUFBRSxLQUFLO1lBQ2IsTUFBTSxFQUFFLEtBQUs7U0FDZCxDQUFDO1FBRUYsMkNBQTJDO1FBQzNDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBQUEsQ0FBQztJQUVGOzs7O1NBSUU7SUFDTSxnQkFBZ0IsQ0FBQyxLQUFVO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVEOztPQUVHO0lBQ0ssZ0JBQWdCLEdBQUcsR0FBRyxFQUFFO1FBQzlCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDckYsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDMUIsQ0FBQyxDQUFBO0lBRUQ7OztPQUdHO0lBQ0ssZUFBZSxDQUFDLEtBQVU7UUFDaEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDaEYsQ0FBQztJQUVEOzs7O1NBSUU7SUFDTSxRQUFRLENBQUMsS0FBVTtRQUN6QixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRDs7Ozs7U0FLRTtJQUNNLFdBQVcsQ0FBQyxNQUFjLEVBQUUsTUFBYztRQUNoRCxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQ7Ozs7U0FJRTtJQUNNLEdBQUcsQ0FBQyxhQUFxQjtRQUMvQixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRDs7O01BR0U7SUFDTSxNQUFNLENBQUMsSUFBWTtRQUN6QixJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQ7O1NBRUU7SUFDTSxZQUFZO1FBQ2xCLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsZUFBZTtRQUNiLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUVEOztTQUVFO0lBQ00sY0FBYztRQUNwQixJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsRUFBRTtRQUNOLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7dUdBcFlVLGNBQWM7MkZBQWQsY0FBYyx3VkFyQ2Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCVCx5bUJBQ1c7WUFDVixPQUFPLENBQUMsWUFBWSxFQUFFO2dCQUNwQixLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxFQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO2dCQUNuQyxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxFQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUMsQ0FBQyxDQUFDO2dCQUNuQyxVQUFVLENBQUMsZ0JBQWdCLEVBQUU7b0JBQzNCLHdCQUF3QjtvQkFDeEIsT0FBTyxDQUFDLGFBQWEsQ0FBQztpQkFDdkIsQ0FBQztnQkFDRixVQUFVLENBQUMsZ0JBQWdCLEVBQUU7b0JBQzNCLHNCQUFzQjtvQkFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQztpQkFDYixDQUFDO2FBQ0gsQ0FBQztTQUNIOzsyRkFFVSxjQUFjO2tCQXZDMUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsV0FBVztvQkFDckIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQlQ7b0JBQ0QsVUFBVSxFQUFFO3dCQUNWLE9BQU8sQ0FBQyxZQUFZLEVBQUU7NEJBQ3BCLEtBQUssQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLEVBQUMsTUFBTSxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUM7NEJBQ25DLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLEVBQUMsTUFBTSxFQUFFLEdBQUcsRUFBQyxDQUFDLENBQUM7NEJBQ25DLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRTtnQ0FDM0Isd0JBQXdCO2dDQUN4QixPQUFPLENBQUMsYUFBYSxDQUFDOzZCQUN2QixDQUFDOzRCQUNGLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRTtnQ0FDM0Isc0JBQXNCO2dDQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDOzZCQUNiLENBQUM7eUJBQ0gsQ0FBQztxQkFDSDtpQkFDRjt1TEFLVSxZQUFZO3NCQUFwQixLQUFLO2dCQVFHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBS0csVUFBVTtzQkFBbEIsS0FBSztnQkF5RWlDLFdBQVc7c0JBQWpELFlBQVk7dUJBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQU1HLFlBQVk7c0JBQW5ELFlBQVk7dUJBQUMsWUFBWSxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQVNHLGFBQWE7c0JBQXJELFlBQVk7dUJBQUMsYUFBYSxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQUlaLFdBQVc7c0JBQXJDLFlBQVk7dUJBQUMsV0FBVztnQkFNSSxhQUFhO3NCQUF6QyxZQUFZO3VCQUFDLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE5nWm9uZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBSZW5kZXJlcjIsIE9uSW5pdCwgT25EZXN0cm95LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2Fyb3VzZWxTZXJ2aWNlLCBDb29yZHMgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jYXJvdXNlbC5zZXJ2aWNlJztcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlyc3QgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdGFnZURhdGEgfSBmcm9tICcuLi8uLi9tb2RlbHMvc3RhZ2UtZGF0YS5tb2RlbCc7XG5pbXBvcnQgeyBTbGlkZU1vZGVsIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3NsaWRlLm1vZGVsJztcbmltcG9ydCB7IEFuaW1hdGVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYW5pbWF0ZS5zZXJ2aWNlJztcbmltcG9ydCB7XG4gIHRyaWdnZXIsXG4gIHN0YXRlLFxuICBzdHlsZSxcbiAgYW5pbWF0ZSxcbiAgdHJhbnNpdGlvblxufSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ293bC1zdGFnZScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJvd2wtc3RhZ2VcIiBbbmdTdHlsZV09XCJ7J3dpZHRoJzogc3RhZ2VEYXRhLndpZHRoICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndHJhbnNmb3JtJzogc3RhZ2VEYXRhLnRyYW5zZm9ybSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndHJhbnNpdGlvbic6IHN0YWdlRGF0YS50cmFuc2l0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdwYWRkaW5nLWxlZnQnOiBzdGFnZURhdGEucGFkZGluZ0wgPyBzdGFnZURhdGEucGFkZGluZ0wgKyAncHgnIDogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3BhZGRpbmctcmlnaHQnOiBzdGFnZURhdGEucGFkZGluZ1IgPyBzdGFnZURhdGEucGFkZGluZ1IgKyAncHgnIDogJycgfVwiXG4gICAgICAgICAgKHRyYW5zaXRpb25lbmQpPVwib25UcmFuc2l0aW9uRW5kKClcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgc2xpZGUgb2Ygc2xpZGVzRGF0YTsgbGV0IGkgPSBpbmRleFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJvd2wtaXRlbVwiIFtuZ0NsYXNzXT1cInNsaWRlLmNsYXNzZXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdTdHlsZV09XCJ7J3dpZHRoJzogc2xpZGUud2lkdGggKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbWFyZ2luLWxlZnQnOiBzbGlkZS5tYXJnaW5MID8gc2xpZGUubWFyZ2luTCArICdweCcgOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ21hcmdpbi1yaWdodCc6IHNsaWRlLm1hcmdpblIgPyBzbGlkZS5tYXJnaW5SICsgJ3B4JyA6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbGVmdCc6IHNsaWRlLmxlZnR9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGFuaW1hdGlvbmVuZCk9XCJjbGVhcihzbGlkZS5pZClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbQGF1dG9IZWlnaHRdPVwic2xpZGUuaGVpZ2h0U3RhdGVcIj5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdJZj1cInNsaWRlLmxvYWRcIiBbbmdUZW1wbGF0ZU91dGxldF09XCJzbGlkZS50cGxSZWZcIiBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyAkaW1wbGljaXQ6IHByZXBhcmVQdWJsaWNTbGlkZShzbGlkZSksIGluZGV4OiBpIH1cIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgIDwvZGl2PjwhLS0gLy5vd2wtaXRlbSAtLT5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L2Rpdj48IS0tIC8ub3dsLXN0YWdlIC0tPlxuICAgIDwvZGl2PlxuICBgLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignYXV0b0hlaWdodCcsIFtcbiAgICAgIHN0YXRlKCdudWxsZWQnLCBzdHlsZSh7aGVpZ2h0OiAwfSkpLFxuICAgICAgc3RhdGUoJ2Z1bGwnLCBzdHlsZSh7aGVpZ2h0OiAnKid9KSksXG4gICAgICB0cmFuc2l0aW9uKCdmdWxsID0+IG51bGxlZCcsIFtcbiAgICAgICAgLy8gc3R5bGUoe2hlaWdodDogJyonfSksXG4gICAgICAgIGFuaW1hdGUoJzcwMG1zIDM1MG1zJylcbiAgICAgIF0pLFxuICAgICAgdHJhbnNpdGlvbignbnVsbGVkID0+IGZ1bGwnLCBbXG4gICAgICAgIC8vIHN0eWxlKHtoZWlnaHQ6IDB9KSxcbiAgICAgICAgYW5pbWF0ZSgzNTApXG4gICAgICBdKSxcbiAgICBdKVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFN0YWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogT2JqZWN0IHdpdGggc2V0dGluZ3Mgd2hpY2ggbWFrZSBjYXJvdXNlbCBkcmFnZ2FibGUgYnkgdG91Y2ggb3IgbW91c2VcbiAgICovXG4gIEBJbnB1dCgpIG93bERyYWdnYWJsZToge1xuICAgIGlzTW91c2VEcmFnYWJsZTogYm9vbGVhbixcbiAgICBpc1RvdWNoRHJhZ2FibGU6IGJvb2xlYW5cbiAgfTtcblxuICAvKipcbiAgICogRGF0YSBvZiBvd2wtc3RhZ2VcbiAgICovXG4gIEBJbnB1dCgpIHN0YWdlRGF0YTogU3RhZ2VEYXRhO1xuXG5cdC8qKlxuXHQgKiAgRGF0YSBvZiBldmVyeSBzbGlkZVxuXHQgKi9cbiAgQElucHV0KCkgc2xpZGVzRGF0YTogU2xpZGVNb2RlbFtdO1xuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiB3aWNoIHdpbGwgYmUgcmV0dXJuZWQgYWZ0ZXIgYXR0YWNoaW5nIGxpc3RlbmVyIHRvICdtb3VzZW1vdmUnIGV2ZW50XG4gICAqL1xuICBsaXN0ZW5lck1vdXNlTW92ZTogKCkgPT4gdm9pZDtcbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHdpY2ggd2lsbCBiZSByZXR1cm5lZCBhZnRlciBhdHRhY2hpbmcgbGlzdGVuZXIgdG8gJ3RvdWNobW92ZScgZXZlbnRcbiAgICovXG4gIGxpc3RlbmVyVG91Y2hNb3ZlOiAoKSA9PiB2b2lkO1xuICAvKipcbiAgICogRnVuY3Rpb24gd2ljaCB3aWxsIGJlIHJldHVybmVkIGFmdGVyIGF0dGFjaGluZyBsaXN0ZW5lciB0byAnbW91c2Vtb3ZlJyBldmVudFxuICAgKi9cbiAgbGlzdGVuZXJPbmVNb3VzZU1vdmU6ICgpID0+IHZvaWQ7XG4gIC8qKlxuICAgKiBGdW5jdGlvbiB3aWNoIHdpbGwgYmUgcmV0dXJuZWQgYWZ0ZXIgYXR0YWNoaW5nIGxpc3RlbmVyIHRvICd0b3VjaG1vdmUnIGV2ZW50XG4gICAqL1xuICBsaXN0ZW5lck9uZVRvdWNoTW92ZTogKCkgPT4gdm9pZDtcblxuICAvKipcbiAgICogRnVuY3Rpb24gd2ljaCB3aWxsIGJlIHJldHVybmVkIGFmdGVyIGF0dGFjaGluZyBsaXN0ZW5lciB0byAnbW91c2V1cCcgZXZlbnRcbiAgICovXG4gIGxpc3RlbmVyTW91c2VVcDogKCkgPT4gdm9pZDtcbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHdpY2ggd2lsbCBiZSByZXR1cm5lZCBhZnRlciBhdHRhY2hpbmcgbGlzdGVuZXIgdG8gJ3RvdWNoZW5kJyBldmVudFxuICAgKi9cbiAgbGlzdGVuZXJUb3VjaEVuZDogKCkgPT4gdm9pZDtcblxuICAvKipcbiAgICogRnVuY3Rpb24gd2ljaCB3aWxsIGJlIHJldHVybmVkIGFmdGVyIGF0dGFjaGluZyBsaXN0ZW5lciB0byAnY2xpY2snIGV2ZW50XG4gICAqL1xuICBsaXN0ZW5lck9uZUNsaWNrOiAoKSA9PiB2b2lkO1xuXG4gIGxpc3RlbmVyQVRhZzogKCkgPT4gdm9pZDtcblxuICAvKipcbiAgICogT2JqZWN0IHdpdGggZGF0YSBuZWVkZWQgZm9yIGRyYWdnaW5nXG4gICAqL1xuICBwcml2YXRlIF9kcmFnOiBhbnkgPSB7XG4gICAgdGltZTogbnVsbCxcbiAgICB0YXJnZXQ6IG51bGwsXG4gICAgcG9pbnRlcjogbnVsbCxcbiAgICBzdGFnZToge1xuICAgICAgc3RhcnQ6IG51bGwsXG4gICAgICBjdXJyZW50OiBudWxsXG4gICAgfSxcbiAgICBkaXJlY3Rpb246IG51bGwsXG4gICAgYWN0aXZlOiBmYWxzZSxcbiAgICBtb3Zpbmc6IGZhbHNlXG4gIH07XG5cbiAgLyoqXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSBjYXJvdXNlbCdzIHJlYnVpbGRpbmcgY2F1c2VkIGJ5IHJlc2l6ZSBldmVudCBzdGFydHNcbiAgICovXG4gIHByaXZhdGUgX29uZURyYWdNb3ZlJCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcblxuICAvKipcbiAgICogU3Vic2N0aXB0aW9uIHRvIF9vbmVEcmFnTW92ZSQgU3ViamVjdFxuICAgKi9cbiAgcHJpdmF0ZSBfb25lTW92ZVN1YnNyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgcHJlcGFyZVB1YmxpY1NsaWRlID0gKHNsaWRlOiBTbGlkZU1vZGVsKTogU2xpZGVNb2RlbCA9PiB7XG4gICAgY29uc3QgbmV3U2xpZGUgPSB7IC4uLnNsaWRlIH07XG4gICAgZGVsZXRlIG5ld1NsaWRlLnRwbFJlZjtcbiAgICByZXR1cm4gbmV3U2xpZGU7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHpvbmU6IE5nWm9uZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgICAgICAgICAgICBwcml2YXRlIGNhcm91c2VsU2VydmljZTogQ2Fyb3VzZWxTZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIGFuaW1hdGVTZXJ2aWNlOiBBbmltYXRlU2VydmljZSkgeyB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2Vkb3duJywgWyckZXZlbnQnXSkgb25Nb3VzZURvd24oZXZlbnQpIHtcbiAgICBpZiAodGhpcy5vd2xEcmFnZ2FibGUuaXNNb3VzZURyYWdhYmxlKSB7XG4gICAgICB0aGlzLl9vbkRyYWdTdGFydChldmVudCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcigndG91Y2hzdGFydCcsIFsnJGV2ZW50J10pIG9uVG91Y2hTdGFydChldmVudCkge1xuICAgIGlmIChldmVudC50YXJnZXRUb3VjaGVzLmxlbmd0aCA+PSAyKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICh0aGlzLm93bERyYWdnYWJsZS5pc1RvdWNoRHJhZ2FibGUpIHtcbiAgICAgIHRoaXMuX29uRHJhZ1N0YXJ0KGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIFsnJGV2ZW50J10pIG9uVG91Y2hDYW5jZWwoZXZlbnQpIHtcbiAgICB0aGlzLl9vbkRyYWdFbmQoZXZlbnQpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJhZ3N0YXJ0Jykgb25EcmFnU3RhcnQoKSB7XG4gICAgaWYgKHRoaXMub3dsRHJhZ2dhYmxlLmlzTW91c2VEcmFnYWJsZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3NlbGVjdHN0YXJ0Jykgb25TZWxlY3RTdGFydCgpIHtcbiAgICBpZiAodGhpcy5vd2xEcmFnZ2FibGUuaXNNb3VzZURyYWdhYmxlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5fb25lTW92ZVN1YnNyaXB0aW9uID0gdGhpcy5fb25lRHJhZ01vdmUkXG4gICAgICAucGlwZShmaXJzdCgpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuX3NlbmRDaGFuZ2VzKCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX29uZU1vdmVTdWJzcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhc3NlcyB0aGlzIHRvIF9vbmVNb3VzZVRvdWNoTW92ZSgpO1xuICAgKi9cbiAgYmluZE9uZU1vdXNlVG91Y2hNb3ZlID0gKGV2KSA9PiB7XG4gICAgdGhpcy5fb25lTW91c2VUb3VjaE1vdmUoZXYpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhc3NlcyB0aGlzIHRvIF9vbkRyYWdNb3ZlKCk7XG4gICAqL1xuICBiaW5kT25EcmFnTW92ZSA9IChldikgPT4ge1xuICAgIHRoaXMuX29uRHJhZ01vdmUoZXYpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhc3NlcyB0aGlzIHRvIF9vbkRyYWdNb3ZlKCk7XG4gICAqL1xuICBiaW5kT25EcmFnRW5kID0gKGV2KSA9PiB7XG4gICAgLy8gdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICB0aGlzLl9vbkRyYWdFbmQoZXYpO1xuICAgIC8vIH0pO1xuICB9XG5cbiAgLyoqXG5cdCAqIEhhbmRsZXMgYHRvdWNoc3RhcnRgIGFuZCBgbW91c2Vkb3duYCBldmVudHMuXG5cdCAqIEB0b2RvIEhvcml6b250YWwgc3dpcGUgdGhyZXNob2xkIGFzIG9wdGlvblxuXHQgKiBAdG9kbyAjMjYxXG5cdCAqIEBwYXJhbSBldmVudCAtIFRoZSBldmVudCBhcmd1bWVudHMuXG5cdCAqL1xuXHRwcml2YXRlIF9vbkRyYWdTdGFydChldmVudCk6IGFueSB7XG5cdFx0bGV0IHN0YWdlOiBDb29yZHMgPSBudWxsO1xuXG5cdFx0aWYgKGV2ZW50LndoaWNoID09PSAzKSB7XG5cdFx0XHRyZXR1cm47XG4gICAgfVxuXG4gICAgc3RhZ2UgPSB0aGlzLl9wcmVwYXJlRHJhZ2dpbmcoZXZlbnQpO1xuXG5cdFx0dGhpcy5fZHJhZy50aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cdFx0dGhpcy5fZHJhZy50YXJnZXQgPSBldmVudC50YXJnZXQ7XG5cdFx0dGhpcy5fZHJhZy5zdGFnZS5zdGFydCA9IHN0YWdlO1xuXHRcdHRoaXMuX2RyYWcuc3RhZ2UuY3VycmVudCA9IHN0YWdlO1xuICAgIHRoaXMuX2RyYWcucG9pbnRlciA9IHRoaXMuX3BvaW50ZXIoZXZlbnQpO1xuXG4gICAgdGhpcy5saXN0ZW5lck1vdXNlVXAgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbihkb2N1bWVudCwgJ21vdXNldXAnLCB0aGlzLmJpbmRPbkRyYWdFbmQpO1xuICAgIHRoaXMubGlzdGVuZXJUb3VjaEVuZCA9IHRoaXMucmVuZGVyZXIubGlzdGVuKGRvY3VtZW50LCAndG91Y2hlbmQnLCB0aGlzLmJpbmRPbkRyYWdFbmQpO1xuXG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubGlzdGVuZXJPbmVNb3VzZU1vdmUgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbihkb2N1bWVudCwgJ21vdXNlbW92ZScsIHRoaXMuYmluZE9uZU1vdXNlVG91Y2hNb3ZlKTtcbiAgICAgIHRoaXMubGlzdGVuZXJPbmVUb3VjaE1vdmUgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbihkb2N1bWVudCwgJ3RvdWNobW92ZScsIHRoaXMuYmluZE9uZU1vdXNlVG91Y2hNb3ZlKTtcbiAgICB9KTtcblxuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaGVzIGxpc3RlbmVycyB0byBgdG91Y2htb3ZlYCBhbmQgYG1vdXNlbW92ZWAgZXZlbnRzOyBpbml0aWF0ZXMgdXBkYXRpbmcgY2Fyb3VzZWwgYWZ0ZXIgc3RhcnRpbmcgZHJhZ2dpbmdcbiAgICogQHBhcmFtIGV2ZW50IGV2ZW50IG9iamVjaCBvZiBtb3VzZSBvciB0b3VjaCBldmVudFxuICAgKi9cbiAgcHJpdmF0ZSBfb25lTW91c2VUb3VjaE1vdmUoZXZlbnQpIHtcbiAgICBjb25zdCBkZWx0YSA9IHRoaXMuX2RpZmZlcmVuY2UodGhpcy5fZHJhZy5wb2ludGVyLCB0aGlzLl9wb2ludGVyKGV2ZW50KSk7XG4gICAgaWYgKHRoaXMubGlzdGVuZXJBVGFnKSB7XG4gICAgICB0aGlzLmxpc3RlbmVyQVRhZygpO1xuICAgIH1cbiAgICBpZiAoIE1hdGguYWJzKGRlbHRhLngpIDwgMyAmJiBNYXRoLmFicyhkZWx0YS55KSA8IDMgJiYgdGhpcy5faXMoJ3ZhbGlkJykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoKE1hdGguYWJzKGRlbHRhLngpIDwgMyAmJiBNYXRoLmFicyhkZWx0YS54KSA8IE1hdGguYWJzKGRlbHRhLnkpKSAmJiB0aGlzLl9pcygndmFsaWQnKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmxpc3RlbmVyT25lTW91c2VNb3ZlKCk7XG4gICAgdGhpcy5saXN0ZW5lck9uZVRvdWNoTW92ZSgpO1xuICAgIHRoaXMuX2RyYWcubW92aW5nID0gdHJ1ZTtcblxuICAgIHRoaXMuYmxvY2tDbGlja0FuY2hvckluRHJhZ2dpbmcoZXZlbnQpO1xuXG4gICAgdGhpcy5saXN0ZW5lck1vdXNlTW92ZSA9IHRoaXMucmVuZGVyZXIubGlzdGVuKGRvY3VtZW50LCAnbW91c2Vtb3ZlJywgdGhpcy5iaW5kT25EcmFnTW92ZSk7XG4gICAgdGhpcy5saXN0ZW5lclRvdWNoTW92ZSA9IHRoaXMucmVuZGVyZXIubGlzdGVuKGRvY3VtZW50LCAndG91Y2htb3ZlJywgdGhpcy5iaW5kT25EcmFnTW92ZSk7XG5cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgdGhpcy5fZW50ZXJEcmFnZ2luZygpO1xuICAgIHRoaXMuX29uZURyYWdNb3ZlJC5uZXh0KGV2ZW50KTtcbiAgICAvLyB0aGlzLl9zZW5kQ2hhbmdlcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaGVzIGhhbmRsZXIgdG8gSFRNTEFuY2hvckVsZW1lbnQgZm9yIHByZXZlbnRpbmcgY2xpY2sgd2hpbGUgY2Fyb3VzZWwgaXMgYmVpbmcgZHJhZ2dlZFxuICAgKiBAcGFyYW0gZXZlbnQgZXZlbnQgb2JqZWN0XG4gICAqL1xuICBwcml2YXRlIGJsb2NrQ2xpY2tBbmNob3JJbkRyYWdnaW5nKGV2ZW50OiBhbnkpIHtcbiAgICBsZXQgdGFyZ2V0OiBIVE1MRWxlbWVudCB8IG51bGwgPSBldmVudC50YXJnZXQ7XG4gICAgd2hpbGUgKHRhcmdldCAmJiAhKHRhcmdldCBpbnN0YW5jZW9mIEhUTUxBbmNob3JFbGVtZW50KSkge1xuICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQ7XG4gICAgfVxuICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBIVE1MQW5jaG9yRWxlbWVudCkge1xuICAgICAgdGhpcy5saXN0ZW5lckFUYWcgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0YXJnZXQsICdjbGljaycsICgpID0+IGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICBcdC8qKlxuXHQgKiBIYW5kbGVzIHRoZSBgdG91Y2htb3ZlYCBhbmQgYG1vdXNlbW92ZWAgZXZlbnRzLlxuXHQgKiBAdG9kbyAjMjYxXG5cdCAqIEBwYXJhbSBldmVudCAtIFRoZSBldmVudCBhcmd1bWVudHMuXG5cdCAqL1xuXHRwcml2YXRlIF9vbkRyYWdNb3ZlKGV2ZW50KSB7XG4gICAgbGV0IHN0YWdlOiBDb29yZHM7XG4gICAgY29uc3Qgc3RhZ2VPckV4aXQ6IGJvb2xlYW4gfCBDb29yZHMgPSB0aGlzLmNhcm91c2VsU2VydmljZS5kZWZpbmVOZXdDb29yZHNEcmFnKGV2ZW50LCB0aGlzLl9kcmFnKTtcblxuICAgIGlmIChzdGFnZU9yRXhpdCA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc3RhZ2UgPSBzdGFnZU9yRXhpdCBhcyBDb29yZHM7XG5cblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgdGhpcy5fZHJhZy5zdGFnZS5jdXJyZW50ID0gc3RhZ2U7XG5cdFx0dGhpcy5fYW5pbWF0ZShzdGFnZS54IC0gdGhpcy5fZHJhZy5zdGFnZS5zdGFydC54KTtcbiAgfTtcblxuICAvKipcbiAgICogTW92ZXMgLm93bC1zdGFnZSBsZWZ0LXJpZ2h0XG4gICAqIEBwYXJhbSBjb29yZGluYXRlIGNvb3JkaW5hdGUgdG8gYmUgc2V0IHRvIC5vd2wtc3RhZ2VcbiAgICovXG4gIHByaXZhdGUgX2FuaW1hdGUoY29vcmRpbmF0ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0sICd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlM2QoJHtjb29yZGluYXRlfXB4LDBweCwwcHhgKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXSwgJ3RyYW5zaXRpb24nLCAnMHMnKTtcbiAgfVxuXG4gIC8qKlxuXHQgKiBIYW5kbGVzIHRoZSBgdG91Y2hlbmRgIGFuZCBgbW91c2V1cGAgZXZlbnRzLlxuXHQgKiBAdG9kbyAjMjYxXG5cdCAqIEB0b2RvIFRocmVzaG9sZCBmb3IgY2xpY2sgZXZlbnRcblx0ICogQHBhcmFtIGV2ZW50IC0gVGhlIGV2ZW50IGFyZ3VtZW50cy5cblx0ICovXG5cdHByaXZhdGUgX29uRHJhZ0VuZChldmVudCkge1xuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm93bERPTURhdGEuaXNHcmFiID0gZmFsc2U7XG4gICAgdGhpcy5saXN0ZW5lck9uZU1vdXNlTW92ZSgpO1xuICAgIHRoaXMubGlzdGVuZXJPbmVUb3VjaE1vdmUoKTtcblxuICAgIGlmICh0aGlzLl9kcmFnLm1vdmluZykge1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0sICd0cmFuc2Zvcm0nLCBgYCk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXSwgJ3RyYW5zaXRpb24nLCB0aGlzLmNhcm91c2VsU2VydmljZS5zcGVlZCgrdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuZHJhZ0VuZFNwZWVkIHx8IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLnNtYXJ0U3BlZWQpLzEwMDAgKydzJyk7XG5cbiAgICAgIHRoaXMuX2ZpbmlzaERyYWdnaW5nKGV2ZW50KTtcbiAgICAgIHRoaXMubGlzdGVuZXJNb3VzZU1vdmUoKTtcbiAgICAgIHRoaXMubGlzdGVuZXJUb3VjaE1vdmUoKTtcbiAgICB9XG5cbiAgICB0aGlzLl9kcmFnID0ge1xuICAgICAgdGltZTogbnVsbCxcbiAgICAgIHRhcmdldDogbnVsbCxcbiAgICAgIHBvaW50ZXI6IG51bGwsXG4gICAgICBzdGFnZToge1xuICAgICAgICBzdGFydDogbnVsbCxcbiAgICAgICAgY3VycmVudDogbnVsbFxuICAgICAgfSxcbiAgICAgIGRpcmVjdGlvbjogbnVsbCxcbiAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgICBtb3Zpbmc6IGZhbHNlXG4gICAgfTtcblxuICAgIC8vIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnRyaWdnZXIoJ2RyYWdnZWQnKTtcbiAgICB0aGlzLmxpc3RlbmVyTW91c2VVcCgpO1xuICAgIHRoaXMubGlzdGVuZXJUb3VjaEVuZCgpO1xuICB9O1xuXG4gIC8qKlxuXHQgKiBQcmVwYXJlcyBkYXRhIGZvciBkcmFnZ2luZyBjYXJvdXNlbC4gSXQgc3RhcnRzIGFmdGVyIGZpcmluZyBgdG91Y2hzdGFydGAgYW5kIGBtb3VzZWRvd25gIGV2ZW50cy5cblx0ICogQHBhcmFtIGV2ZW50IC0gVGhlIGV2ZW50IGFyZ3VtZW50cy5cblx0ICogQHJldHVybnMgc3RhZ2UgLSBvYmplY3Qgd2l0aCAneCcgYW5kICd5JyBjb29yZGluYXRlcyBvZiAub3dsLXN0YWdlXG5cdCAqL1xuICBwcml2YXRlIF9wcmVwYXJlRHJhZ2dpbmcoZXZlbnQ6IGFueSk6IENvb3JkcyB7XG4gICAgcmV0dXJuIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnByZXBhcmVEcmFnZ2luZyhldmVudCk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoZXMgaGFuZGxlciBmb3IgJ2NsaWNrJyBldmVudCBvbiBhbnkgZWxlbWVudCBpbiAub3dsLXN0YWdlIGluIG9yZGVyIHRvIHByZXZlbnQgZHJhZ2dpbmcgd2hlbiBtb3Zpbmcgb2YgY3Vyc29yIGlzIGxlc3MgdGhhbiAzcHhcbiAgICovXG4gIHByaXZhdGUgX29uZUNsaWNrSGFuZGxlciA9ICgpID0+IHtcbiAgICB0aGlzLmxpc3RlbmVyT25lQ2xpY2sgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLl9kcmFnLnRhcmdldCwgJ2NsaWNrJywgKCkgPT4gZmFsc2UpXG4gICAgdGhpcy5saXN0ZW5lck9uZUNsaWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogRmluaXNoZXMgZHJhZ2dpbmdcbiAgICogQHBhcmFtIGV2ZW50IG9iamVjdCBldmVudCBvZiAnbW91c2VVcCcgb2YgJ3RvdWNoZW5kJyBldmVudHNcbiAgICovXG4gIHByaXZhdGUgX2ZpbmlzaERyYWdnaW5nKGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5maW5pc2hEcmFnZ2luZyhldmVudCwgdGhpcy5fZHJhZywgdGhpcy5fb25lQ2xpY2tIYW5kbGVyKTtcbiAgfVxuXG4gIC8qKlxuXHQgKiBHZXRzIHVuaWZpZWQgcG9pbnRlciBjb29yZGluYXRlcyBmcm9tIGV2ZW50LlxuXHQgKiBAcGFyYW0gZXZlbnQgVGhlIGBtb3VzZWRvd25gIG9yIGB0b3VjaHN0YXJ0YCBldmVudC5cblx0ICogQHJldHVybnMgQ29udGFpbnMgYHhgIGFuZCBgeWAgY29vcmRpbmF0ZXMgb2YgY3VycmVudCBwb2ludGVyIHBvc2l0aW9uLlxuXHQgKi9cbiAgcHJpdmF0ZSBfcG9pbnRlcihldmVudDogYW55KTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5jYXJvdXNlbFNlcnZpY2UucG9pbnRlcihldmVudCk7XG4gIH1cblxuICAvKipcblx0ICogR2V0cyB0aGUgZGlmZmVyZW5jZSBvZiB0d28gdmVjdG9ycy5cblx0ICogQHBhcmFtIGZpcnN0IFRoZSBmaXJzdCB2ZWN0b3IuXG5cdCAqIEBwYXJhbSBzZWNvbmQgVGhlIHNlY29uZCB2ZWN0b3IuXG5cdCAqIEByZXR1cm5zIFRoZSBkaWZmZXJlbmNlLlxuXHQgKi9cbiAgcHJpdmF0ZSBfZGlmZmVyZW5jZShmaXJzdEM6IENvb3Jkcywgc2Vjb25kOiBDb29yZHMpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmNhcm91c2VsU2VydmljZS5kaWZmZXJlbmNlKGZpcnN0Qywgc2Vjb25kKTtcbiAgfVxuXG4gIC8qKlxuXHQgKiBDaGVja3Mgd2hldGhlciB0aGUgY2Fyb3VzZWwgaXMgaW4gYSBzcGVjaWZpYyBzdGF0ZSBvciBub3QuXG5cdCAqIEBwYXJhbSBzcGVjaWZpY1N0YXRlIFRoZSBzdGF0ZSB0byBjaGVjay5cblx0ICogQHJldHVybnMgVGhlIGZsYWcgd2hpY2ggaW5kaWNhdGVzIGlmIHRoZSBjYXJvdXNlbCBpcyBidXN5LlxuXHQgKi9cbiAgcHJpdmF0ZSBfaXMoc3BlY2lmaWNTdGF0ZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmlzKHNwZWNpZmljU3RhdGUpO1xuICB9XG5cbiAgLyoqXG4gICogRW50ZXJzIGEgc3RhdGUuXG4gICogQHBhcmFtIG5hbWUgVGhlIHN0YXRlIG5hbWUuXG4gICovXG4gIHByaXZhdGUgX2VudGVyKG5hbWU6IHN0cmluZykge1xuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmVudGVyKG5hbWUpO1xuICB9XG5cbiAgLyoqXG5cdCAqIFNlbmRzIGFsbCBkYXRhIG5lZWRlZCBmb3IgVmlldy5cblx0ICovXG4gIHByaXZhdGUgX3NlbmRDaGFuZ2VzKCkge1xuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNlbmRDaGFuZ2VzKCk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlciBmb3IgdHJhbnNpdGlvZW5kIGV2ZW50XG4gICAqL1xuICBvblRyYW5zaXRpb25FbmQoKSB7XG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uub25UcmFuc2l0aW9uRW5kKCk7XG4gIH1cblxuICAvKipcblx0ICogRW50ZXJzIGludG8gYSAnZHJhZ2dpbmcnIHN0YXRlXG5cdCAqL1xuICBwcml2YXRlIF9lbnRlckRyYWdnaW5nKCkge1xuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmVudGVyRHJhZ2dpbmcoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHRoZSBlbmQgb2YgJ2FuaW1hdGlvbmVuZCcgZXZlbnRcbiAgICogQHBhcmFtIGlkIElkIG9mIHNsaWRlc1xuICAgKi9cbiAgY2xlYXIoaWQpIHtcbiAgICB0aGlzLmFuaW1hdGVTZXJ2aWNlLmNsZWFyKGlkKTtcbiAgfVxufVxuIl19