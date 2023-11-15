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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.2", ngImport: i0, type: StageComponent, deps: [{ token: i0.NgZone }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.CarouselService }, { token: i2.AnimateService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.2", type: StageComponent, selector: "owl-stage", inputs: { owlDraggable: "owlDraggable", stageData: "stageData", slidesData: "slidesData" }, host: { listeners: { "mousedown": "onMouseDown($event)", "touchstart": "onTouchStart($event)", "touchcancel": "onTouchCancel($event)", "dragstart": "onDragStart()", "selectstart": "onSelectStart()" } }, ngImport: i0, template: `
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.2", ngImport: i0, type: StageComponent, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtb3dsLWNhcm91c2VsLW8vc3JjL2xpYi9jYXJvdXNlbC9zdGFnZS9zdGFnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBc0IsWUFBWSxFQUFnQyxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFakgsT0FBTyxFQUFFLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSXZDLE9BQU8sRUFDTCxPQUFPLEVBQ1AsS0FBSyxFQUNMLEtBQUssRUFDTCxPQUFPLEVBQ1AsVUFBVSxFQUNYLE1BQU0scUJBQXFCLENBQUM7Ozs7O0FBd0M3QixNQUFNLE9BQU8sY0FBYztJQW9GTDtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBdkZwQjs7T0FFRztJQUNNLFlBQVksQ0FHbkI7SUFFRjs7T0FFRztJQUNNLFNBQVMsQ0FBWTtJQUUvQjs7T0FFRztJQUNPLFVBQVUsQ0FBZTtJQUVsQzs7T0FFRztJQUNILGlCQUFpQixDQUFhO0lBQzlCOztPQUVHO0lBQ0gsaUJBQWlCLENBQWE7SUFDOUI7O09BRUc7SUFDSCxvQkFBb0IsQ0FBYTtJQUNqQzs7T0FFRztJQUNILG9CQUFvQixDQUFhO0lBRWpDOztPQUVHO0lBQ0gsZUFBZSxDQUFhO0lBQzVCOztPQUVHO0lBQ0gsZ0JBQWdCLENBQWE7SUFFN0I7O09BRUc7SUFDSCxnQkFBZ0IsQ0FBYTtJQUU3QixZQUFZLENBQWE7SUFFekI7O09BRUc7SUFDSyxLQUFLLEdBQVE7UUFDbkIsSUFBSSxFQUFFLElBQUk7UUFDVixNQUFNLEVBQUUsSUFBSTtRQUNaLE9BQU8sRUFBRSxJQUFJO1FBQ2IsS0FBSyxFQUFFO1lBQ0wsS0FBSyxFQUFFLElBQUk7WUFDWCxPQUFPLEVBQUUsSUFBSTtT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ZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgTmdab25lLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIFJlbmRlcmVyMiwgT25Jbml0LCBPbkRlc3Ryb3ksIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYXJvdXNlbFNlcnZpY2UsIENvb3JkcyB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2Nhcm91c2VsLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaXJzdCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN0YWdlRGF0YSB9IGZyb20gJy4uLy4uL21vZGVscy9zdGFnZS1kYXRhLm1vZGVsJztcbmltcG9ydCB7IFNsaWRlTW9kZWwgfSBmcm9tICcuLi8uLi9tb2RlbHMvc2xpZGUubW9kZWwnO1xuaW1wb3J0IHsgQW5pbWF0ZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hbmltYXRlLnNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgdHJpZ2dlcixcbiAgc3RhdGUsXG4gIHN0eWxlLFxuICBhbmltYXRlLFxuICB0cmFuc2l0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnb3dsLXN0YWdlJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cIm93bC1zdGFnZVwiIFtuZ1N0eWxlXT1cInsnd2lkdGgnOiBzdGFnZURhdGEud2lkdGggKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0cmFuc2Zvcm0nOiBzdGFnZURhdGEudHJhbnNmb3JtLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0cmFuc2l0aW9uJzogc3RhZ2VEYXRhLnRyYW5zaXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3BhZGRpbmctbGVmdCc6IHN0YWdlRGF0YS5wYWRkaW5nTCA/IHN0YWdlRGF0YS5wYWRkaW5nTCArICdweCcgOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncGFkZGluZy1yaWdodCc6IHN0YWdlRGF0YS5wYWRkaW5nUiA/IHN0YWdlRGF0YS5wYWRkaW5nUiArICdweCcgOiAnJyB9XCJcbiAgICAgICAgICAodHJhbnNpdGlvbmVuZCk9XCJvblRyYW5zaXRpb25FbmQoKVwiPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBzbGlkZSBvZiBzbGlkZXNEYXRhOyBsZXQgaSA9IGluZGV4XCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm93bC1pdGVtXCIgW25nQ2xhc3NdPVwic2xpZGUuY2xhc3Nlc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cInsnd2lkdGgnOiBzbGlkZS53aWR0aCArICdweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdtYXJnaW4tbGVmdCc6IHNsaWRlLm1hcmdpbkwgPyBzbGlkZS5tYXJnaW5MICsgJ3B4JyA6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbWFyZ2luLXJpZ2h0Jzogc2xpZGUubWFyZ2luUiA/IHNsaWRlLm1hcmdpblIgKyAncHgnIDogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdsZWZ0Jzogc2xpZGUubGVmdH1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoYW5pbWF0aW9uZW5kKT1cImNsZWFyKHNsaWRlLmlkKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtAYXV0b0hlaWdodF09XCJzbGlkZS5oZWlnaHRTdGF0ZVwiPlxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ0lmPVwic2xpZGUubG9hZFwiIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInNsaWRlLnRwbFJlZlwiIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ICRpbXBsaWNpdDogcHJlcGFyZVB1YmxpY1NsaWRlKHNsaWRlKSwgaW5kZXg6IGkgfVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgPC9kaXY+PCEtLSAvLm93bC1pdGVtIC0tPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvZGl2PjwhLS0gLy5vd2wtc3RhZ2UgLS0+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKCdhdXRvSGVpZ2h0JywgW1xuICAgICAgc3RhdGUoJ251bGxlZCcsIHN0eWxlKHtoZWlnaHQ6IDB9KSksXG4gICAgICBzdGF0ZSgnZnVsbCcsIHN0eWxlKHtoZWlnaHQ6ICcqJ30pKSxcbiAgICAgIHRyYW5zaXRpb24oJ2Z1bGwgPT4gbnVsbGVkJywgW1xuICAgICAgICAvLyBzdHlsZSh7aGVpZ2h0OiAnKid9KSxcbiAgICAgICAgYW5pbWF0ZSgnNzAwbXMgMzUwbXMnKVxuICAgICAgXSksXG4gICAgICB0cmFuc2l0aW9uKCdudWxsZWQgPT4gZnVsbCcsIFtcbiAgICAgICAgLy8gc3R5bGUoe2hlaWdodDogMH0pLFxuICAgICAgICBhbmltYXRlKDM1MClcbiAgICAgIF0pLFxuICAgIF0pXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgU3RhZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIC8qKlxuICAgKiBPYmplY3Qgd2l0aCBzZXR0aW5ncyB3aGljaCBtYWtlIGNhcm91c2VsIGRyYWdnYWJsZSBieSB0b3VjaCBvciBtb3VzZVxuICAgKi9cbiAgQElucHV0KCkgb3dsRHJhZ2dhYmxlOiB7XG4gICAgaXNNb3VzZURyYWdhYmxlOiBib29sZWFuLFxuICAgIGlzVG91Y2hEcmFnYWJsZTogYm9vbGVhblxuICB9O1xuXG4gIC8qKlxuICAgKiBEYXRhIG9mIG93bC1zdGFnZVxuICAgKi9cbiAgQElucHV0KCkgc3RhZ2VEYXRhOiBTdGFnZURhdGE7XG5cblx0LyoqXG5cdCAqICBEYXRhIG9mIGV2ZXJ5IHNsaWRlXG5cdCAqL1xuICBASW5wdXQoKSBzbGlkZXNEYXRhOiBTbGlkZU1vZGVsW107XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHdpY2ggd2lsbCBiZSByZXR1cm5lZCBhZnRlciBhdHRhY2hpbmcgbGlzdGVuZXIgdG8gJ21vdXNlbW92ZScgZXZlbnRcbiAgICovXG4gIGxpc3RlbmVyTW91c2VNb3ZlOiAoKSA9PiB2b2lkO1xuICAvKipcbiAgICogRnVuY3Rpb24gd2ljaCB3aWxsIGJlIHJldHVybmVkIGFmdGVyIGF0dGFjaGluZyBsaXN0ZW5lciB0byAndG91Y2htb3ZlJyBldmVudFxuICAgKi9cbiAgbGlzdGVuZXJUb3VjaE1vdmU6ICgpID0+IHZvaWQ7XG4gIC8qKlxuICAgKiBGdW5jdGlvbiB3aWNoIHdpbGwgYmUgcmV0dXJuZWQgYWZ0ZXIgYXR0YWNoaW5nIGxpc3RlbmVyIHRvICdtb3VzZW1vdmUnIGV2ZW50XG4gICAqL1xuICBsaXN0ZW5lck9uZU1vdXNlTW92ZTogKCkgPT4gdm9pZDtcbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHdpY2ggd2lsbCBiZSByZXR1cm5lZCBhZnRlciBhdHRhY2hpbmcgbGlzdGVuZXIgdG8gJ3RvdWNobW92ZScgZXZlbnRcbiAgICovXG4gIGxpc3RlbmVyT25lVG91Y2hNb3ZlOiAoKSA9PiB2b2lkO1xuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiB3aWNoIHdpbGwgYmUgcmV0dXJuZWQgYWZ0ZXIgYXR0YWNoaW5nIGxpc3RlbmVyIHRvICdtb3VzZXVwJyBldmVudFxuICAgKi9cbiAgbGlzdGVuZXJNb3VzZVVwOiAoKSA9PiB2b2lkO1xuICAvKipcbiAgICogRnVuY3Rpb24gd2ljaCB3aWxsIGJlIHJldHVybmVkIGFmdGVyIGF0dGFjaGluZyBsaXN0ZW5lciB0byAndG91Y2hlbmQnIGV2ZW50XG4gICAqL1xuICBsaXN0ZW5lclRvdWNoRW5kOiAoKSA9PiB2b2lkO1xuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiB3aWNoIHdpbGwgYmUgcmV0dXJuZWQgYWZ0ZXIgYXR0YWNoaW5nIGxpc3RlbmVyIHRvICdjbGljaycgZXZlbnRcbiAgICovXG4gIGxpc3RlbmVyT25lQ2xpY2s6ICgpID0+IHZvaWQ7XG5cbiAgbGlzdGVuZXJBVGFnOiAoKSA9PiB2b2lkO1xuXG4gIC8qKlxuICAgKiBPYmplY3Qgd2l0aCBkYXRhIG5lZWRlZCBmb3IgZHJhZ2dpbmdcbiAgICovXG4gIHByaXZhdGUgX2RyYWc6IGFueSA9IHtcbiAgICB0aW1lOiBudWxsLFxuICAgIHRhcmdldDogbnVsbCxcbiAgICBwb2ludGVyOiBudWxsLFxuICAgIHN0YWdlOiB7XG4gICAgICBzdGFydDogbnVsbCxcbiAgICAgIGN1cnJlbnQ6IG51bGxcbiAgICB9LFxuICAgIGRpcmVjdGlvbjogbnVsbCxcbiAgICBhY3RpdmU6IGZhbHNlLFxuICAgIG1vdmluZzogZmFsc2VcbiAgfTtcblxuICAvKipcbiAgICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uIHdoZW4gdGhlIGNhcm91c2VsJ3MgcmVidWlsZGluZyBjYXVzZWQgYnkgcmVzaXplIGV2ZW50IHN0YXJ0c1xuICAgKi9cbiAgcHJpdmF0ZSBfb25lRHJhZ01vdmUkID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG4gIC8qKlxuICAgKiBTdWJzY3RpcHRpb24gdG8gX29uZURyYWdNb3ZlJCBTdWJqZWN0XG4gICAqL1xuICBwcml2YXRlIF9vbmVNb3ZlU3Vic3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBwcmVwYXJlUHVibGljU2xpZGUgPSAoc2xpZGU6IFNsaWRlTW9kZWwpOiBTbGlkZU1vZGVsID0+IHtcbiAgICBjb25zdCBuZXdTbGlkZSA9IHsgLi4uc2xpZGUgfTtcbiAgICBkZWxldGUgbmV3U2xpZGUudHBsUmVmO1xuICAgIHJldHVybiBuZXdTbGlkZTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgem9uZTogTmdab25lLFxuICAgICAgICAgICAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgICAgICAgICAgIHByaXZhdGUgY2Fyb3VzZWxTZXJ2aWNlOiBDYXJvdXNlbFNlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgYW5pbWF0ZVNlcnZpY2U6IEFuaW1hdGVTZXJ2aWNlKSB7IH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWRvd24nLCBbJyRldmVudCddKSBvbk1vdXNlRG93bihldmVudCkge1xuICAgIGlmICh0aGlzLm93bERyYWdnYWJsZS5pc01vdXNlRHJhZ2FibGUpIHtcbiAgICAgIHRoaXMuX29uRHJhZ1N0YXJ0KGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgWyckZXZlbnQnXSkgb25Ub3VjaFN0YXJ0KGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LnRhcmdldFRvdWNoZXMubGVuZ3RoID49IDIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHRoaXMub3dsRHJhZ2dhYmxlLmlzVG91Y2hEcmFnYWJsZSkge1xuICAgICAgdGhpcy5fb25EcmFnU3RhcnQoZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3RvdWNoY2FuY2VsJywgWyckZXZlbnQnXSkgb25Ub3VjaENhbmNlbChldmVudCkge1xuICAgIHRoaXMuX29uRHJhZ0VuZChldmVudCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcmFnc3RhcnQnKSBvbkRyYWdTdGFydCgpIHtcbiAgICBpZiAodGhpcy5vd2xEcmFnZ2FibGUuaXNNb3VzZURyYWdhYmxlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignc2VsZWN0c3RhcnQnKSBvblNlbGVjdFN0YXJ0KCkge1xuICAgIGlmICh0aGlzLm93bERyYWdnYWJsZS5pc01vdXNlRHJhZ2FibGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl9vbmVNb3ZlU3Vic3JpcHRpb24gPSB0aGlzLl9vbmVEcmFnTW92ZSRcbiAgICAgIC5waXBlKGZpcnN0KCkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5fc2VuZENoYW5nZXMoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fb25lTW92ZVN1YnNyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICAvKipcbiAgICogUGFzc2VzIHRoaXMgdG8gX29uZU1vdXNlVG91Y2hNb3ZlKCk7XG4gICAqL1xuICBiaW5kT25lTW91c2VUb3VjaE1vdmUgPSAoZXYpID0+IHtcbiAgICB0aGlzLl9vbmVNb3VzZVRvdWNoTW92ZShldik7XG4gIH1cblxuICAvKipcbiAgICogUGFzc2VzIHRoaXMgdG8gX29uRHJhZ01vdmUoKTtcbiAgICovXG4gIGJpbmRPbkRyYWdNb3ZlID0gKGV2KSA9PiB7XG4gICAgdGhpcy5fb25EcmFnTW92ZShldik7XG4gIH1cblxuICAvKipcbiAgICogUGFzc2VzIHRoaXMgdG8gX29uRHJhZ01vdmUoKTtcbiAgICovXG4gIGJpbmRPbkRyYWdFbmQgPSAoZXYpID0+IHtcbiAgICAvLyB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgIHRoaXMuX29uRHJhZ0VuZChldik7XG4gICAgLy8gfSk7XG4gIH1cblxuICAvKipcblx0ICogSGFuZGxlcyBgdG91Y2hzdGFydGAgYW5kIGBtb3VzZWRvd25gIGV2ZW50cy5cblx0ICogQHRvZG8gSG9yaXpvbnRhbCBzd2lwZSB0aHJlc2hvbGQgYXMgb3B0aW9uXG5cdCAqIEB0b2RvICMyNjFcblx0ICogQHBhcmFtIGV2ZW50IC0gVGhlIGV2ZW50IGFyZ3VtZW50cy5cblx0ICovXG5cdHByaXZhdGUgX29uRHJhZ1N0YXJ0KGV2ZW50KTogYW55IHtcblx0XHRsZXQgc3RhZ2U6IENvb3JkcyA9IG51bGw7XG5cblx0XHRpZiAoZXZlbnQud2hpY2ggPT09IDMpIHtcblx0XHRcdHJldHVybjtcbiAgICB9XG5cbiAgICBzdGFnZSA9IHRoaXMuX3ByZXBhcmVEcmFnZ2luZyhldmVudCk7XG5cblx0XHR0aGlzLl9kcmFnLnRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblx0XHR0aGlzLl9kcmFnLnRhcmdldCA9IGV2ZW50LnRhcmdldDtcblx0XHR0aGlzLl9kcmFnLnN0YWdlLnN0YXJ0ID0gc3RhZ2U7XG5cdFx0dGhpcy5fZHJhZy5zdGFnZS5jdXJyZW50ID0gc3RhZ2U7XG4gICAgdGhpcy5fZHJhZy5wb2ludGVyID0gdGhpcy5fcG9pbnRlcihldmVudCk7XG5cbiAgICB0aGlzLmxpc3RlbmVyTW91c2VVcCA9IHRoaXMucmVuZGVyZXIubGlzdGVuKGRvY3VtZW50LCAnbW91c2V1cCcsIHRoaXMuYmluZE9uRHJhZ0VuZCk7XG4gICAgdGhpcy5saXN0ZW5lclRvdWNoRW5kID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oZG9jdW1lbnQsICd0b3VjaGVuZCcsIHRoaXMuYmluZE9uRHJhZ0VuZCk7XG5cbiAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5saXN0ZW5lck9uZU1vdXNlTW92ZSA9IHRoaXMucmVuZGVyZXIubGlzdGVuKGRvY3VtZW50LCAnbW91c2Vtb3ZlJywgdGhpcy5iaW5kT25lTW91c2VUb3VjaE1vdmUpO1xuICAgICAgdGhpcy5saXN0ZW5lck9uZVRvdWNoTW92ZSA9IHRoaXMucmVuZGVyZXIubGlzdGVuKGRvY3VtZW50LCAndG91Y2htb3ZlJywgdGhpcy5iaW5kT25lTW91c2VUb3VjaE1vdmUpO1xuICAgIH0pO1xuXG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoZXMgbGlzdGVuZXJzIHRvIGB0b3VjaG1vdmVgIGFuZCBgbW91c2Vtb3ZlYCBldmVudHM7IGluaXRpYXRlcyB1cGRhdGluZyBjYXJvdXNlbCBhZnRlciBzdGFydGluZyBkcmFnZ2luZ1xuICAgKiBAcGFyYW0gZXZlbnQgZXZlbnQgb2JqZWNoIG9mIG1vdXNlIG9yIHRvdWNoIGV2ZW50XG4gICAqL1xuICBwcml2YXRlIF9vbmVNb3VzZVRvdWNoTW92ZShldmVudCkge1xuICAgIGNvbnN0IGRlbHRhID0gdGhpcy5fZGlmZmVyZW5jZSh0aGlzLl9kcmFnLnBvaW50ZXIsIHRoaXMuX3BvaW50ZXIoZXZlbnQpKTtcbiAgICBpZiAodGhpcy5saXN0ZW5lckFUYWcpIHtcbiAgICAgIHRoaXMubGlzdGVuZXJBVGFnKCk7XG4gICAgfVxuICAgIGlmICggTWF0aC5hYnMoZGVsdGEueCkgPCAzICYmIE1hdGguYWJzKGRlbHRhLnkpIDwgMyAmJiB0aGlzLl9pcygndmFsaWQnKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICgoTWF0aC5hYnMoZGVsdGEueCkgPCAzICYmIE1hdGguYWJzKGRlbHRhLngpIDwgTWF0aC5hYnMoZGVsdGEueSkpICYmIHRoaXMuX2lzKCd2YWxpZCcpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMubGlzdGVuZXJPbmVNb3VzZU1vdmUoKTtcbiAgICB0aGlzLmxpc3RlbmVyT25lVG91Y2hNb3ZlKCk7XG4gICAgdGhpcy5fZHJhZy5tb3ZpbmcgPSB0cnVlO1xuXG4gICAgdGhpcy5ibG9ja0NsaWNrQW5jaG9ySW5EcmFnZ2luZyhldmVudCk7XG5cbiAgICB0aGlzLmxpc3RlbmVyTW91c2VNb3ZlID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oZG9jdW1lbnQsICdtb3VzZW1vdmUnLCB0aGlzLmJpbmRPbkRyYWdNb3ZlKTtcbiAgICB0aGlzLmxpc3RlbmVyVG91Y2hNb3ZlID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oZG9jdW1lbnQsICd0b3VjaG1vdmUnLCB0aGlzLmJpbmRPbkRyYWdNb3ZlKTtcblxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICB0aGlzLl9lbnRlckRyYWdnaW5nKCk7XG4gICAgdGhpcy5fb25lRHJhZ01vdmUkLm5leHQoZXZlbnQpO1xuICAgIC8vIHRoaXMuX3NlbmRDaGFuZ2VzKCk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoZXMgaGFuZGxlciB0byBIVE1MQW5jaG9yRWxlbWVudCBmb3IgcHJldmVudGluZyBjbGljayB3aGlsZSBjYXJvdXNlbCBpcyBiZWluZyBkcmFnZ2VkXG4gICAqIEBwYXJhbSBldmVudCBldmVudCBvYmplY3RcbiAgICovXG4gIHByaXZhdGUgYmxvY2tDbGlja0FuY2hvckluRHJhZ2dpbmcoZXZlbnQ6IGFueSkge1xuICAgIGxldCB0YXJnZXQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IGV2ZW50LnRhcmdldDtcbiAgICB3aGlsZSAodGFyZ2V0ICYmICEodGFyZ2V0IGluc3RhbmNlb2YgSFRNTEFuY2hvckVsZW1lbnQpKSB7XG4gICAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50RWxlbWVudDtcbiAgICB9XG4gICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIEhUTUxBbmNob3JFbGVtZW50KSB7XG4gICAgICB0aGlzLmxpc3RlbmVyQVRhZyA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRhcmdldCwgJ2NsaWNrJywgKCkgPT4gZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIFx0LyoqXG5cdCAqIEhhbmRsZXMgdGhlIGB0b3VjaG1vdmVgIGFuZCBgbW91c2Vtb3ZlYCBldmVudHMuXG5cdCAqIEB0b2RvICMyNjFcblx0ICogQHBhcmFtIGV2ZW50IC0gVGhlIGV2ZW50IGFyZ3VtZW50cy5cblx0ICovXG5cdHByaXZhdGUgX29uRHJhZ01vdmUoZXZlbnQpIHtcbiAgICBsZXQgc3RhZ2U6IENvb3JkcztcbiAgICBjb25zdCBzdGFnZU9yRXhpdDogYm9vbGVhbiB8IENvb3JkcyA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmRlZmluZU5ld0Nvb3Jkc0RyYWcoZXZlbnQsIHRoaXMuX2RyYWcpO1xuXG4gICAgaWYgKHN0YWdlT3JFeGl0ID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzdGFnZSA9IHN0YWdlT3JFeGl0IGFzIENvb3JkcztcblxuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICB0aGlzLl9kcmFnLnN0YWdlLmN1cnJlbnQgPSBzdGFnZTtcblx0XHR0aGlzLl9hbmltYXRlKHN0YWdlLnggLSB0aGlzLl9kcmFnLnN0YWdlLnN0YXJ0LngpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBNb3ZlcyAub3dsLXN0YWdlIGxlZnQtcmlnaHRcbiAgICogQHBhcmFtIGNvb3JkaW5hdGUgY29vcmRpbmF0ZSB0byBiZSBzZXQgdG8gLm93bC1zdGFnZVxuICAgKi9cbiAgcHJpdmF0ZSBfYW5pbWF0ZShjb29yZGluYXRlOiBudW1iZXIpIHtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXSwgJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGUzZCgke2Nvb3JkaW5hdGV9cHgsMHB4LDBweGApO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdLCAndHJhbnNpdGlvbicsICcwcycpO1xuICB9XG5cbiAgLyoqXG5cdCAqIEhhbmRsZXMgdGhlIGB0b3VjaGVuZGAgYW5kIGBtb3VzZXVwYCBldmVudHMuXG5cdCAqIEB0b2RvICMyNjFcblx0ICogQHRvZG8gVGhyZXNob2xkIGZvciBjbGljayBldmVudFxuXHQgKiBAcGFyYW0gZXZlbnQgLSBUaGUgZXZlbnQgYXJndW1lbnRzLlxuXHQgKi9cblx0cHJpdmF0ZSBfb25EcmFnRW5kKGV2ZW50KSB7XG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uub3dsRE9NRGF0YS5pc0dyYWIgPSBmYWxzZTtcbiAgICB0aGlzLmxpc3RlbmVyT25lTW91c2VNb3ZlKCk7XG4gICAgdGhpcy5saXN0ZW5lck9uZVRvdWNoTW92ZSgpO1xuXG4gICAgaWYgKHRoaXMuX2RyYWcubW92aW5nKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXSwgJ3RyYW5zZm9ybScsIGBgKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdLCAndHJhbnNpdGlvbicsIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNwZWVkKCt0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5kcmFnRW5kU3BlZWQgfHwgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3Muc21hcnRTcGVlZCkvMTAwMCArJ3MnKTtcblxuICAgICAgdGhpcy5fZmluaXNoRHJhZ2dpbmcoZXZlbnQpO1xuICAgICAgdGhpcy5saXN0ZW5lck1vdXNlTW92ZSgpO1xuICAgICAgdGhpcy5saXN0ZW5lclRvdWNoTW92ZSgpO1xuICAgIH1cblxuICAgIHRoaXMuX2RyYWcgPSB7XG4gICAgICB0aW1lOiBudWxsLFxuICAgICAgdGFyZ2V0OiBudWxsLFxuICAgICAgcG9pbnRlcjogbnVsbCxcbiAgICAgIHN0YWdlOiB7XG4gICAgICAgIHN0YXJ0OiBudWxsLFxuICAgICAgICBjdXJyZW50OiBudWxsXG4gICAgICB9LFxuICAgICAgZGlyZWN0aW9uOiBudWxsLFxuICAgICAgYWN0aXZlOiBmYWxzZSxcbiAgICAgIG1vdmluZzogZmFsc2VcbiAgICB9O1xuXG4gICAgLy8gdGhpcy5jYXJvdXNlbFNlcnZpY2UudHJpZ2dlcignZHJhZ2dlZCcpO1xuICAgIHRoaXMubGlzdGVuZXJNb3VzZVVwKCk7XG4gICAgdGhpcy5saXN0ZW5lclRvdWNoRW5kKCk7XG4gIH07XG5cbiAgLyoqXG5cdCAqIFByZXBhcmVzIGRhdGEgZm9yIGRyYWdnaW5nIGNhcm91c2VsLiBJdCBzdGFydHMgYWZ0ZXIgZmlyaW5nIGB0b3VjaHN0YXJ0YCBhbmQgYG1vdXNlZG93bmAgZXZlbnRzLlxuXHQgKiBAcGFyYW0gZXZlbnQgLSBUaGUgZXZlbnQgYXJndW1lbnRzLlxuXHQgKiBAcmV0dXJucyBzdGFnZSAtIG9iamVjdCB3aXRoICd4JyBhbmQgJ3knIGNvb3JkaW5hdGVzIG9mIC5vd2wtc3RhZ2Vcblx0ICovXG4gIHByaXZhdGUgX3ByZXBhcmVEcmFnZ2luZyhldmVudDogYW55KTogQ29vcmRzIHtcbiAgICByZXR1cm4gdGhpcy5jYXJvdXNlbFNlcnZpY2UucHJlcGFyZURyYWdnaW5nKGV2ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2hlcyBoYW5kbGVyIGZvciAnY2xpY2snIGV2ZW50IG9uIGFueSBlbGVtZW50IGluIC5vd2wtc3RhZ2UgaW4gb3JkZXIgdG8gcHJldmVudCBkcmFnZ2luZyB3aGVuIG1vdmluZyBvZiBjdXJzb3IgaXMgbGVzcyB0aGFuIDNweFxuICAgKi9cbiAgcHJpdmF0ZSBfb25lQ2xpY2tIYW5kbGVyID0gKCkgPT4ge1xuICAgIHRoaXMubGlzdGVuZXJPbmVDbGljayA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuX2RyYWcudGFyZ2V0LCAnY2xpY2snLCAoKSA9PiBmYWxzZSlcbiAgICB0aGlzLmxpc3RlbmVyT25lQ2xpY2soKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5pc2hlcyBkcmFnZ2luZ1xuICAgKiBAcGFyYW0gZXZlbnQgb2JqZWN0IGV2ZW50IG9mICdtb3VzZVVwJyBvZiAndG91Y2hlbmQnIGV2ZW50c1xuICAgKi9cbiAgcHJpdmF0ZSBfZmluaXNoRHJhZ2dpbmcoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmZpbmlzaERyYWdnaW5nKGV2ZW50LCB0aGlzLl9kcmFnLCB0aGlzLl9vbmVDbGlja0hhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG5cdCAqIEdldHMgdW5pZmllZCBwb2ludGVyIGNvb3JkaW5hdGVzIGZyb20gZXZlbnQuXG5cdCAqIEBwYXJhbSBldmVudCBUaGUgYG1vdXNlZG93bmAgb3IgYHRvdWNoc3RhcnRgIGV2ZW50LlxuXHQgKiBAcmV0dXJucyBDb250YWlucyBgeGAgYW5kIGB5YCBjb29yZGluYXRlcyBvZiBjdXJyZW50IHBvaW50ZXIgcG9zaXRpb24uXG5cdCAqL1xuICBwcml2YXRlIF9wb2ludGVyKGV2ZW50OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmNhcm91c2VsU2VydmljZS5wb2ludGVyKGV2ZW50KTtcbiAgfVxuXG4gIC8qKlxuXHQgKiBHZXRzIHRoZSBkaWZmZXJlbmNlIG9mIHR3byB2ZWN0b3JzLlxuXHQgKiBAcGFyYW0gZmlyc3QgVGhlIGZpcnN0IHZlY3Rvci5cblx0ICogQHBhcmFtIHNlY29uZCBUaGUgc2Vjb25kIHZlY3Rvci5cblx0ICogQHJldHVybnMgVGhlIGRpZmZlcmVuY2UuXG5cdCAqL1xuICBwcml2YXRlIF9kaWZmZXJlbmNlKGZpcnN0QzogQ29vcmRzLCBzZWNvbmQ6IENvb3Jkcyk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmRpZmZlcmVuY2UoZmlyc3RDLCBzZWNvbmQpO1xuICB9XG5cbiAgLyoqXG5cdCAqIENoZWNrcyB3aGV0aGVyIHRoZSBjYXJvdXNlbCBpcyBpbiBhIHNwZWNpZmljIHN0YXRlIG9yIG5vdC5cblx0ICogQHBhcmFtIHNwZWNpZmljU3RhdGUgVGhlIHN0YXRlIHRvIGNoZWNrLlxuXHQgKiBAcmV0dXJucyBUaGUgZmxhZyB3aGljaCBpbmRpY2F0ZXMgaWYgdGhlIGNhcm91c2VsIGlzIGJ1c3kuXG5cdCAqL1xuICBwcml2YXRlIF9pcyhzcGVjaWZpY1N0YXRlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jYXJvdXNlbFNlcnZpY2UuaXMoc3BlY2lmaWNTdGF0ZSk7XG4gIH1cblxuICAvKipcbiAgKiBFbnRlcnMgYSBzdGF0ZS5cbiAgKiBAcGFyYW0gbmFtZSBUaGUgc3RhdGUgbmFtZS5cbiAgKi9cbiAgcHJpdmF0ZSBfZW50ZXIobmFtZTogc3RyaW5nKSB7XG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UuZW50ZXIobmFtZSk7XG4gIH1cblxuICAvKipcblx0ICogU2VuZHMgYWxsIGRhdGEgbmVlZGVkIGZvciBWaWV3LlxuXHQgKi9cbiAgcHJpdmF0ZSBfc2VuZENoYW5nZXMoKSB7XG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2VuZENoYW5nZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVyIGZvciB0cmFuc2l0aW9lbmQgZXZlbnRcbiAgICovXG4gIG9uVHJhbnNpdGlvbkVuZCgpIHtcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5vblRyYW5zaXRpb25FbmQoKTtcbiAgfVxuXG4gIC8qKlxuXHQgKiBFbnRlcnMgaW50byBhICdkcmFnZ2luZycgc3RhdGVcblx0ICovXG4gIHByaXZhdGUgX2VudGVyRHJhZ2dpbmcoKSB7XG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UuZW50ZXJEcmFnZ2luZygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgdGhlIGVuZCBvZiAnYW5pbWF0aW9uZW5kJyBldmVudFxuICAgKiBAcGFyYW0gaWQgSWQgb2Ygc2xpZGVzXG4gICAqL1xuICBjbGVhcihpZCkge1xuICAgIHRoaXMuYW5pbWF0ZVNlcnZpY2UuY2xlYXIoaWQpO1xuICB9XG59XG4iXX0=