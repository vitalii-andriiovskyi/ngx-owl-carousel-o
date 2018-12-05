/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Component, Input, Output, Directive, QueryList, ContentChildren, TemplateRef, ElementRef, EventEmitter } from '@angular/core';
import { merge } from 'rxjs';
import { ResizeService } from '../services/resize.service';
import { tap, delay, filter, switchMap, first } from 'rxjs/operators';
import { CarouselService } from '../services/carousel.service';
import { OwlOptions } from '../models/owl-options.model';
import { NavigationService } from '../services/navigation.service';
import { AutoplayService } from '../services/autoplay.service';
import { LazyLoadService } from '../services/lazyload.service';
import { AnimateService } from '../services/animate.service';
import { AutoHeightService } from '../services/autoheight.service';
import { HashService } from '../services/hash.service';
import { OwlLogger } from '../services/logger.service';
/** @type {?} */
let nextId = 0;
export class CarouselSlideDirective {
    /**
     * @param {?} tplRef
     */
    constructor(tplRef) {
        this.tplRef = tplRef;
        /**
         * Unique slide identifier. Must be unique for the entire document for proper accessibility support.
         * Will be auto-generated if not provided.
         */
        this.id = `owl-slide-${nextId++}`;
        /**
         * Defines how much widths of common slide will current slide have
         * e.g. if _mergeData=2, the slide will twice wider then slides with _mergeData=1
         */
        this._dataMerge = 1;
        /**
         * Width of slide
         */
        this.width = 0;
        /**
         * Inner content of dot for certain slide; can be html-markup
         */
        this.dotContent = '';
        /**
         * Hash (fragment) of url which corresponds to certain slide
         */
        this.dataHash = '';
    }
    /**
     * @param {?} data
     * @return {?}
     */
    set dataMerge(data) {
        this._dataMerge = this.isNumeric(data) ? data : 1;
    }
    ;
    /**
     * @return {?}
     */
    get dataMerge() { return this._dataMerge; }
    /**
     * Determines if the input is a Number or something that can be coerced to a Number
     * @param {?} number
     * @return {?} - An indication if the input is a Number or can be coerced to a Number
     */
    isNumeric(number) {
        return !isNaN(parseFloat(number));
    }
}
CarouselSlideDirective.decorators = [
    { type: Directive, args: [{ selector: 'ng-template[carouselSlide]' },] }
];
/** @nocollapse */
CarouselSlideDirective.ctorParameters = () => [
    { type: TemplateRef }
];
CarouselSlideDirective.propDecorators = {
    id: [{ type: Input }],
    dataMerge: [{ type: Input }],
    width: [{ type: Input }],
    dotContent: [{ type: Input }],
    dataHash: [{ type: Input }]
};
if (false) {
    /**
     * Unique slide identifier. Must be unique for the entire document for proper accessibility support.
     * Will be auto-generated if not provided.
     * @type {?}
     */
    CarouselSlideDirective.prototype.id;
    /**
     * Defines how much widths of common slide will current slide have
     * e.g. if _mergeData=2, the slide will twice wider then slides with _mergeData=1
     * @type {?}
     */
    CarouselSlideDirective.prototype._dataMerge;
    /**
     * Width of slide
     * @type {?}
     */
    CarouselSlideDirective.prototype.width;
    /**
     * Inner content of dot for certain slide; can be html-markup
     * @type {?}
     */
    CarouselSlideDirective.prototype.dotContent;
    /**
     * Hash (fragment) of url which corresponds to certain slide
     * @type {?}
     */
    CarouselSlideDirective.prototype.dataHash;
    /** @type {?} */
    CarouselSlideDirective.prototype.tplRef;
    /* Skipping unhandled member: ;*/
}
/**
 * Data which will be passed out after ending of transition of carousel
 */
export class SlidesOutputData {
}
if (false) {
    /** @type {?} */
    SlidesOutputData.prototype.startPosition;
    /** @type {?} */
    SlidesOutputData.prototype.slides;
}
;
export class CarouselComponent {
    /**
     * @param {?} el
     * @param {?} resizeService
     * @param {?} carouselService
     * @param {?} navigationService
     * @param {?} autoplayService
     * @param {?} lazyLoadService
     * @param {?} animateService
     * @param {?} autoHeightService
     * @param {?} hashService
     * @param {?} logger
     */
    constructor(el, resizeService, carouselService, navigationService, autoplayService, lazyLoadService, animateService, autoHeightService, hashService, logger) {
        this.el = el;
        this.resizeService = resizeService;
        this.carouselService = carouselService;
        this.navigationService = navigationService;
        this.autoplayService = autoplayService;
        this.lazyLoadService = lazyLoadService;
        this.animateService = animateService;
        this.autoHeightService = autoHeightService;
        this.hashService = hashService;
        this.logger = logger;
        this.translated = new EventEmitter();
        this.dragging = new EventEmitter();
        this.change = new EventEmitter();
        this.initialized = new EventEmitter();
        /**
         *  Data of every slide
         */
        this.slidesData = [];
        /**
         * Shows whether carousel is loaded of not.
         */
        this.carouselLoaded = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.spyDataStreams();
        this.carouselWindowWidth = this.el.nativeElement.querySelector('.owl-carousel').clientWidth;
    }
    /**
     * @return {?}
     */
    ngAfterContentChecked() {
    }
    // ngAfterContentChecked() END
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        if (this.slides.toArray().length) {
            this.carouselService.setup(this.carouselWindowWidth, this.slides.toArray(), this.options);
            this.carouselService.initialize(this.slides.toArray());
            this._winResizeWatcher();
        }
        else {
            this.logger.log(`There are no slides to show. So the carousel won't be rendered`);
        }
        this._slidesChangesSubscription = this.slides.changes.pipe(tap((slides) => {
            if (slides.toArray().length) {
                // this.carouselService.setItems(slides.toArray());
                this.carouselService.setup(this.carouselWindowWidth, slides.toArray(), this.options);
                this.carouselService.initialize(slides.toArray());
            }
            else {
                this.carouselLoaded = false;
                this.logger.log(`There are no slides to show. So the carousel won't be re-rendered`);
            }
        })).subscribe(() => { });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.resizeSubscription) {
            this.resizeSubscription.unsubscribe();
        }
        this._slidesChangesSubscription.unsubscribe();
        this._allObservSubscription.unsubscribe();
    }
    /**
     * Joins the observable login in one place: sets values to some observables, merges this observables and
     * subcribes to merge func
     * @return {?}
     */
    spyDataStreams() {
        this._viewCurSettings$ = this.carouselService.getViewCurSettings().pipe(tap(data => {
            this.owlDOMData = data.owlDOMData;
            this.stageData = data.stageData;
            this.slidesData = data.slidesData;
            if (!this.carouselLoaded) {
                this.carouselLoaded = true;
            }
            this.navData = data.navData;
            this.dotsData = data.dotsData;
        }));
        this._initializedCarousel$ = this.carouselService.getInitializedState().pipe(tap(() => {
            this.gatherTranslatedData();
            this.initialized.emit(this.slidesOutputData);
            // this.slidesOutputData = {};
        }));
        this._translatedCarousel$ = this.carouselService.getTranslatedState().pipe(tap(() => {
            this.gatherTranslatedData();
            this.translated.emit(this.slidesOutputData);
            // this.slidesOutputData = {};
        }));
        this._changeCarousel$ = this.carouselService.getChangeState().pipe(tap(() => {
            this.gatherTranslatedData();
            this.change.emit(this.slidesOutputData);
            // this.slidesOutputData = {};
        }));
        this._draggingCarousel$ = this.carouselService.getDragState().pipe(tap(() => {
            this.gatherTranslatedData();
            this.dragging.emit({ dragging: true, data: this.slidesOutputData });
        }), switchMap(() => this.carouselService.getTranslatedState().pipe(first(), tap(() => {
            this.dragging.emit({ dragging: false, data: this.slidesOutputData });
        }))));
        this._carouselMerge$ = merge(this._viewCurSettings$, this._translatedCarousel$, this._draggingCarousel$, this._changeCarousel$, this._initializedCarousel$);
        this._allObservSubscription = this._carouselMerge$.subscribe(() => { });
    }
    /**
     * Init subscription to resize event and attaches handler for this event
     * @return {?}
     */
    _winResizeWatcher() {
        if (Object.keys(this.carouselService._options.responsive).length) {
            this.resizeSubscription = this.resizeService.onResize$
                .pipe(filter(() => this.carouselWindowWidth !== this.el.nativeElement.querySelector('.owl-carousel').clientWidth), delay(this.carouselService.settings.responsiveRefreshRate))
                .subscribe(() => {
                this.carouselService.onResize(this.el.nativeElement.querySelector('.owl-carousel').clientWidth);
                this.carouselWindowWidth = this.el.nativeElement.querySelector('.owl-carousel').clientWidth;
            });
        }
    }
    /**
     * Handler for transitioend event
     * @return {?}
     */
    onTransitionEnd() {
        this.carouselService.onTransitionEnd();
    }
    /**
     * Handler for click event, attached to next button
     * @return {?}
     */
    next() {
        if (!this.carouselLoaded || (this.navData && this.navData.disabled))
            return;
        this.navigationService.next(this.carouselService.settings.navSpeed);
    }
    /**
     * Handler for click event, attached to prev button
     * @return {?}
     */
    prev() {
        if (!this.carouselLoaded || (this.navData && this.navData.disabled))
            return;
        this.navigationService.prev(this.carouselService.settings.navSpeed);
    }
    /**
     * Handler for click event, attached to dots
     * @param {?} dotId
     * @return {?}
     */
    moveByDot(dotId) {
        if (!this.carouselLoaded)
            return;
        this.navigationService.moveByDot(dotId);
    }
    /**
     * rewinds carousel to slide with needed id
     * @param {?} id fragment of url
     * @return {?}
     */
    to(id) {
        if (!this.carouselLoaded || (this.navData && this.navData.disabled) || (this.dotsData && this.dotsData.disabled))
            return;
        this.navigationService.toSlideById(id);
    }
    /**
     * Gathers and prepares data intended for passing to the user by means of firing event translatedCarousel
     * @return {?}
     */
    gatherTranslatedData() {
        /** @type {?} */
        let startPosition;
        /** @type {?} */
        const clonedIdPrefix = this.carouselService.clonedIdPrefix;
        /** @type {?} */
        const activeSlides = this.slidesData
            .filter(slide => slide.isActive === true)
            .map(slide => {
            /** @type {?} */
            const id = slide.id.indexOf(clonedIdPrefix) >= 0 ? slide.id.slice(clonedIdPrefix.length) : slide.id;
            return {
                id: id,
                width: slide.width,
                marginL: slide.marginL,
                marginR: slide.marginR,
                center: slide.isCentered
            };
        });
        startPosition = this.carouselService.relative(this.carouselService.current());
        this.slidesOutputData = {
            startPosition: startPosition,
            slides: activeSlides
        };
    }
    /**
     * Starts pausing
     * @return {?}
     */
    startPausing() {
        this.autoplayService.startPausing();
    }
    /**
     * Starts playing after mouse leaves carousel
     * @return {?}
     */
    startPlayML() {
        this.autoplayService.startPlayingMouseLeave();
    }
    /**
     * Starts playing after touch ends
     * @return {?}
     */
    startPlayTE() {
        this.autoplayService.startPlayingTouchEnd();
    }
}
CarouselComponent.decorators = [
    { type: Component, args: [{
                selector: 'owl-carousel-o',
                template: `
    <div class="owl-carousel owl-theme" #owlCarousel
      [ngClass]="{'owl-rtl': owlDOMData?.rtl,
                  'owl-loaded': owlDOMData?.isLoaded,
                  'owl-responsive': owlDOMData?.isResponsive,
                  'owl-drag': owlDOMData?.isMouseDragable,
                  'owl-grab': owlDOMData?.isGrab}"
      (mouseover)="startPausing()"
      (mouseleave)="startPlayML()"
      (touchstart)="startPausing()"
      (touchend)="startPlayTE()">

      <div *ngIf="carouselLoaded" class="owl-stage-outer">
        <owl-stage [owlDraggable]="{'isMouseDragable': owlDOMData?.isMouseDragable, 'isTouchDragable': owlDOMData?.isTouchDragable}"
                    [stageData]="stageData"
                    [slidesData]="slidesData"></owl-stage>
      </div> <!-- /.owl-stage-outer -->
      <ng-container *ngIf="slides.toArray().length">
        <div class="owl-nav" [ngClass]="{'disabled': navData?.disabled}">
          <div class="owl-prev" [ngClass]="{'disabled': navData?.prev?.disabled}" (click)="prev()" [innerHTML]="navData?.prev?.htmlText"></div>
          <div class="owl-next" [ngClass]="{'disabled': navData?.next?.disabled}" (click)="next()" [innerHTML]="navData?.next?.htmlText"></div>
        </div> <!-- /.owl-nav -->
        <div class="owl-dots" [ngClass]="{'disabled': dotsData?.disabled}">
          <div *ngFor="let dot of dotsData?.dots" class="owl-dot" [ngClass]="{'active': dot.active, 'owl-dot-text': dot.showInnerContent}" (click)="moveByDot(dot.id)">
            <span [innerHTML]="dot.innerContent"></span>
          </div>
        </div> <!-- /.owl-dots -->
      </ng-container>
    </div> <!-- /.owl-carousel owl-loaded -->
  `,
                providers: [
                    NavigationService,
                    AutoplayService,
                    CarouselService,
                    LazyLoadService,
                    AnimateService,
                    AutoHeightService,
                    HashService
                ],
                styles: [`.owl-theme { display: block; }`]
            }] }
];
/** @nocollapse */
CarouselComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ResizeService },
    { type: CarouselService },
    { type: NavigationService },
    { type: AutoplayService },
    { type: LazyLoadService },
    { type: AnimateService },
    { type: AutoHeightService },
    { type: HashService },
    { type: OwlLogger }
];
CarouselComponent.propDecorators = {
    slides: [{ type: ContentChildren, args: [CarouselSlideDirective,] }],
    translated: [{ type: Output }],
    dragging: [{ type: Output }],
    change: [{ type: Output }],
    initialized: [{ type: Output }],
    options: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    CarouselComponent.prototype.slides;
    /** @type {?} */
    CarouselComponent.prototype.translated;
    /** @type {?} */
    CarouselComponent.prototype.dragging;
    /** @type {?} */
    CarouselComponent.prototype.change;
    /** @type {?} */
    CarouselComponent.prototype.initialized;
    /**
     * Width of carousel window (tag with class .owl-carousel), in wich we can see moving sliders
     * @type {?}
     */
    CarouselComponent.prototype.carouselWindowWidth;
    /**
     * Subscription to 'resize' event
     * @type {?}
     */
    CarouselComponent.prototype.resizeSubscription;
    /**
     * Subscription merge Observable, which merges all Observables in the component except 'resize' Observable and this.slides.changes()
     * @type {?}
     */
    CarouselComponent.prototype._allObservSubscription;
    /**
     * Subscription to `this.slides.changes().
     * It could be included in 'this._allObservSubscription', but that subcription get created during the initializing of component
     * and 'this.slides' are undefined at that moment. So it's needed to wait for initialization of content.
     * @type {?}
     */
    CarouselComponent.prototype._slidesChangesSubscription;
    /**
     * Current settings for the carousel.
     * @type {?}
     */
    CarouselComponent.prototype.owlDOMData;
    /**
     * Data of owl-stage
     * @type {?}
     */
    CarouselComponent.prototype.stageData;
    /**
     *  Data of every slide
     * @type {?}
     */
    CarouselComponent.prototype.slidesData;
    /**
     * Data of navigation block
     * @type {?}
     */
    CarouselComponent.prototype.navData;
    /**
     * Data of dots block
     * @type {?}
     */
    CarouselComponent.prototype.dotsData;
    /**
     * Data, wich are passed out of carousel after ending of transioning of carousel
     * @type {?}
     */
    CarouselComponent.prototype.slidesOutputData;
    /**
     * Shows whether carousel is loaded of not.
     * @type {?}
     */
    CarouselComponent.prototype.carouselLoaded;
    /**
     * User's options
     * @type {?}
     */
    CarouselComponent.prototype.options;
    /**
     * Observable for getting current View Settings
     * @type {?}
     */
    CarouselComponent.prototype._viewCurSettings$;
    /**
     * Observable for catching the end of transition of carousel
     * @type {?}
     */
    CarouselComponent.prototype._translatedCarousel$;
    /**
     * Observable for catching the start of dragging of the carousel
     * @type {?}
     */
    CarouselComponent.prototype._draggingCarousel$;
    /**
     * Observable for catching the start of changing of the carousel
     * @type {?}
     */
    CarouselComponent.prototype._changeCarousel$;
    /**
     * Observable for catching the initialization of changing the carousel
     * @type {?}
     */
    CarouselComponent.prototype._initializedCarousel$;
    /**
     * Observable for merging all Observables and creating one subscription
     * @type {?}
     */
    CarouselComponent.prototype._carouselMerge$;
    /** @type {?} */
    CarouselComponent.prototype.el;
    /** @type {?} */
    CarouselComponent.prototype.resizeService;
    /** @type {?} */
    CarouselComponent.prototype.carouselService;
    /** @type {?} */
    CarouselComponent.prototype.navigationService;
    /** @type {?} */
    CarouselComponent.prototype.autoplayService;
    /** @type {?} */
    CarouselComponent.prototype.lazyLoadService;
    /** @type {?} */
    CarouselComponent.prototype.animateService;
    /** @type {?} */
    CarouselComponent.prototype.autoHeightService;
    /** @type {?} */
    CarouselComponent.prototype.hashService;
    /** @type {?} */
    CarouselComponent.prototype.logger;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW93bC1jYXJvdXNlbC1vLyIsInNvdXJjZXMiOlsibGliL2Nhcm91c2VsL2Nhcm91c2VsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFJVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxTQUFTLEVBQ1QsZUFBZSxFQUNmLFdBQVcsRUFDWCxVQUFVLEVBRVYsWUFBWSxFQUNiLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBNEIsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXZELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxlQUFlLEVBQXVCLE1BQU0sOEJBQThCLENBQUM7QUFJcEYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRXpELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7O0lBRW5ELE1BQU0sR0FBRyxDQUFDO0FBR2QsTUFBTSxPQUFPLHNCQUFzQjs7OztJQWlDakMsWUFBbUIs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QVUxQzs7OztZQXpIQyxVQUFVO1lBT0gsYUFBYTtZQUViLGVBQWU7WUFNZixpQkFBaUI7WUFDakIsZUFBZTtZQUNmLGVBQWU7WUFDZixjQUFjO1lBQ2QsaUJBQWlCO1lBQ2pCLFdBQVc7WUFDWCxTQUFTOzs7cUJBdUdmLGVBQWUsU0FBQyxzQkFBc0I7eUJBR3RDLE1BQU07dUJBQ04sTUFBTTtxQkFDTixNQUFNOzBCQUNOLE1BQU07c0JBOEROLEtBQUs7Ozs7SUFwRU4sbUNBQzBDOztJQUUxQyx1Q0FBNEQ7O0lBQzVELHFDQUFxRjs7SUFDckYsbUNBQXdEOztJQUN4RCx3Q0FBNkQ7Ozs7O0lBSzdELGdEQUE0Qjs7Ozs7SUFLNUIsK0NBQWlDOzs7OztJQUtqQyxtREFBNkM7Ozs7Ozs7SUFPN0MsdURBQWlEOzs7OztJQUtqRCx1Q0FBdUI7Ozs7O0lBS3hCLHNDQUFxQjs7Ozs7SUFLcEIsdUNBQThCOzs7OztJQUsvQixvQ0FBaUI7Ozs7O0lBS2hCLHFDQUFtQjs7Ozs7SUFLbkIsNkNBQW1DOzs7OztJQUtuQywyQ0FBdUI7Ozs7O0lBS3ZCLG9DQUE2Qjs7Ozs7SUFLN0IsOENBQTJEOzs7OztJQUszRCxpREFBaUQ7Ozs7O0lBS2pELCtDQUErQzs7Ozs7SUFLL0MsNkNBQTZDOzs7OztJQUs3QyxrREFBa0Q7Ozs7O0lBS2xELDRDQUFrRTs7SUFHaEUsK0JBQXNCOztJQUN0QiwwQ0FBb0M7O0lBQ3BDLDRDQUF3Qzs7SUFDeEMsOENBQTRDOztJQUM1Qyw0Q0FBd0M7O0lBQ3hDLDRDQUF3Qzs7SUFDeEMsMkNBQXNDOztJQUN0Qyw4Q0FBNEM7O0lBQzVDLHdDQUFnQzs7SUFDaEMsbUNBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgT25Jbml0LFxyXG4gIEFmdGVyQ29udGVudENoZWNrZWQsXHJcbiAgT25EZXN0cm95LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBEaXJlY3RpdmUsXHJcbiAgUXVlcnlMaXN0LFxyXG4gIENvbnRlbnRDaGlsZHJlbixcclxuICBUZW1wbGF0ZVJlZixcclxuICBFbGVtZW50UmVmLFxyXG4gIEFmdGVyQ29udGVudEluaXQsXHJcbiAgRXZlbnRFbWl0dGVyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIE9ic2VydmFibGUsIG1lcmdlIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBSZXNpemVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvcmVzaXplLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyB0YXAsIGRlbGF5LCBmaWx0ZXIsIHN3aXRjaE1hcCwgZmlyc3QgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IENhcm91c2VsU2VydmljZSwgQ2Fyb3VzZWxDdXJyZW50RGF0YSB9IGZyb20gJy4uL3NlcnZpY2VzL2Nhcm91c2VsLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTdGFnZURhdGEgfSBmcm9tIFwiLi4vbW9kZWxzL3N0YWdlLWRhdGEubW9kZWxcIjtcclxuaW1wb3J0IHsgT3dsRE9NRGF0YSB9IGZyb20gXCIuLi9tb2RlbHMvb3dsRE9NLWRhdGEubW9kZWxcIjtcclxuaW1wb3J0IHsgU2xpZGVNb2RlbCB9IGZyb20gJy4uL21vZGVscy9zbGlkZS5tb2RlbCc7XHJcbmltcG9ydCB7IE93bE9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbHMvb3dsLW9wdGlvbnMubW9kZWwnO1xyXG5pbXBvcnQgeyBOYXZEYXRhLCBEb3RzRGF0YSB9IGZyb20gJy4uL21vZGVscy9uYXZpZ2F0aW9uLWRhdGEubW9kZWxzJztcclxuaW1wb3J0IHsgTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uYXZpZ2F0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBdXRvcGxheVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9hdXRvcGxheS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTGF6eUxvYWRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbGF6eWxvYWQuc2VydmljZSc7XHJcbmltcG9ydCB7IEFuaW1hdGVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvYW5pbWF0ZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQXV0b0hlaWdodFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9hdXRvaGVpZ2h0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBIYXNoU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2hhc2guc2VydmljZSc7XHJcbmltcG9ydCB7IE93bExvZ2dlciB9IGZyb20gJy4uL3NlcnZpY2VzL2xvZ2dlci5zZXJ2aWNlJztcclxuXHJcbmxldCBuZXh0SWQgPSAwO1xyXG5cclxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnbmctdGVtcGxhdGVbY2Fyb3VzZWxTbGlkZV0nIH0pXHJcbmV4cG9ydCBjbGFzcyBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlIHtcclxuICAvKipcclxuICAgKiBVbmlxdWUgc2xpZGUgaWRlbnRpZmllci4gTXVzdCBiZSB1bmlxdWUgZm9yIHRoZSBlbnRpcmUgZG9jdW1lbnQgZm9yIHByb3BlciBhY2Nlc3NpYmlsaXR5IHN1cHBvcnQuXHJcbiAgICogV2lsbCBiZSBhdXRvLWdlbmVyYXRlZCBpZiBub3QgcHJvdmlkZWQuXHJcbiAgICovXHJcbiAgQElucHV0KCkgaWQgPSBgb3dsLXNsaWRlLSR7bmV4dElkKyt9YDtcclxuXHJcbiAgLyoqXHJcbiAgICogRGVmaW5lcyBob3cgbXVjaCB3aWR0aHMgb2YgY29tbW9uIHNsaWRlIHdpbGwgY3VycmVudCBzbGlkZSBoYXZlXHJcbiAgICogZS5nLiBpZiBfbWVyZ2VEYXRhPTIsIHRoZSBzbGlkZSB3aWxsIHR3aWNlIHdpZGVyIHRoZW4gc2xpZGVzIHdpdGggX21lcmdlRGF0YT0xXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZGF0YU1lcmdlID0gMTtcclxuICBASW5wdXQoKVxyXG4gIHNldCBkYXRhTWVyZ2UoZGF0YTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLl9kYXRhTWVyZ2UgPSB0aGlzLmlzTnVtZXJpYyhkYXRhKSA/IGRhdGEgOiAxO1xyXG4gIH07XHJcbiAgZ2V0IGRhdGFNZXJnZSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fZGF0YU1lcmdlIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2lkdGggb2Ygc2xpZGVcclxuICAgKi9cclxuICBASW5wdXQoKSB3aWR0aCA9IDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIElubmVyIGNvbnRlbnQgb2YgZG90IGZvciBjZXJ0YWluIHNsaWRlOyBjYW4gYmUgaHRtbC1tYXJrdXBcclxuICAgKi9cclxuICBASW5wdXQoKSBkb3RDb250ZW50ID0gJyc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhc2ggKGZyYWdtZW50KSBvZiB1cmwgd2hpY2ggY29ycmVzcG9uZHMgdG8gY2VydGFpbiBzbGlkZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRhdGFIYXNoID0gJyc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0cGxSZWY6IFRlbXBsYXRlUmVmPGFueT4pIHt9XHJcblxyXG4gIC8qKlxyXG5cdCAqIERldGVybWluZXMgaWYgdGhlIGlucHV0IGlzIGEgTnVtYmVyIG9yIHNvbWV0aGluZyB0aGF0IGNhbiBiZSBjb2VyY2VkIHRvIGEgTnVtYmVyXHJcblx0ICogQHBhcmFtIC0gVGhlIGlucHV0IHRvIGJlIHRlc3RlZFxyXG5cdCAqIEByZXR1cm5zIC0gQW4gaW5kaWNhdGlvbiBpZiB0aGUgaW5wdXQgaXMgYSBOdW1iZXIgb3IgY2FuIGJlIGNvZXJjZWQgdG8gYSBOdW1iZXJcclxuXHQgKi9cclxuICBpc051bWVyaWMobnVtYmVyOiBhbnkpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiAhaXNOYU4ocGFyc2VGbG9hdChudW1iZXIpKTtcclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEYXRhIHdoaWNoIHdpbGwgYmUgcGFzc2VkIG91dCBhZnRlciBlbmRpbmcgb2YgdHJhbnNpdGlvbiBvZiBjYXJvdXNlbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNsaWRlc091dHB1dERhdGEge1xyXG4gIHN0YXJ0UG9zaXRpb24/OiBudW1iZXI7XHJcbiAgc2xpZGVzPzogU2xpZGVNb2RlbFtdO1xyXG59O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdvd2wtY2Fyb3VzZWwtbycsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgY2xhc3M9XCJvd2wtY2Fyb3VzZWwgb3dsLXRoZW1lXCIgI293bENhcm91c2VsXHJcbiAgICAgIFtuZ0NsYXNzXT1cInsnb3dsLXJ0bCc6IG93bERPTURhdGE/LnJ0bCxcclxuICAgICAgICAgICAgICAgICAgJ293bC1sb2FkZWQnOiBvd2xET01EYXRhPy5pc0xvYWRlZCxcclxuICAgICAgICAgICAgICAgICAgJ293bC1yZXNwb25zaXZlJzogb3dsRE9NRGF0YT8uaXNSZXNwb25zaXZlLFxyXG4gICAgICAgICAgICAgICAgICAnb3dsLWRyYWcnOiBvd2xET01EYXRhPy5pc01vdXNlRHJhZ2FibGUsXHJcbiAgICAgICAgICAgICAgICAgICdvd2wtZ3JhYic6IG93bERPTURhdGE/LmlzR3JhYn1cIlxyXG4gICAgICAobW91c2VvdmVyKT1cInN0YXJ0UGF1c2luZygpXCJcclxuICAgICAgKG1vdXNlbGVhdmUpPVwic3RhcnRQbGF5TUwoKVwiXHJcbiAgICAgICh0b3VjaHN0YXJ0KT1cInN0YXJ0UGF1c2luZygpXCJcclxuICAgICAgKHRvdWNoZW5kKT1cInN0YXJ0UGxheVRFKClcIj5cclxuXHJcbiAgICAgIDxkaXYgKm5nSWY9XCJjYXJvdXNlbExvYWRlZFwiIGNsYXNzPVwib3dsLXN0YWdlLW91dGVyXCI+XHJcbiAgICAgICAgPG93bC1zdGFnZSBbb3dsRHJhZ2dhYmxlXT1cInsnaXNNb3VzZURyYWdhYmxlJzogb3dsRE9NRGF0YT8uaXNNb3VzZURyYWdhYmxlLCAnaXNUb3VjaERyYWdhYmxlJzogb3dsRE9NRGF0YT8uaXNUb3VjaERyYWdhYmxlfVwiXHJcbiAgICAgICAgICAgICAgICAgICAgW3N0YWdlRGF0YV09XCJzdGFnZURhdGFcIlxyXG4gICAgICAgICAgICAgICAgICAgIFtzbGlkZXNEYXRhXT1cInNsaWRlc0RhdGFcIj48L293bC1zdGFnZT5cclxuICAgICAgPC9kaXY+IDwhLS0gLy5vd2wtc3RhZ2Utb3V0ZXIgLS0+XHJcbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJzbGlkZXMudG9BcnJheSgpLmxlbmd0aFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJvd2wtbmF2XCIgW25nQ2xhc3NdPVwieydkaXNhYmxlZCc6IG5hdkRhdGE/LmRpc2FibGVkfVwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm93bC1wcmV2XCIgW25nQ2xhc3NdPVwieydkaXNhYmxlZCc6IG5hdkRhdGE/LnByZXY/LmRpc2FibGVkfVwiIChjbGljayk9XCJwcmV2KClcIiBbaW5uZXJIVE1MXT1cIm5hdkRhdGE/LnByZXY/Lmh0bWxUZXh0XCI+PC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwib3dsLW5leHRcIiBbbmdDbGFzc109XCJ7J2Rpc2FibGVkJzogbmF2RGF0YT8ubmV4dD8uZGlzYWJsZWR9XCIgKGNsaWNrKT1cIm5leHQoKVwiIFtpbm5lckhUTUxdPVwibmF2RGF0YT8ubmV4dD8uaHRtbFRleHRcIj48L2Rpdj5cclxuICAgICAgICA8L2Rpdj4gPCEtLSAvLm93bC1uYXYgLS0+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm93bC1kb3RzXCIgW25nQ2xhc3NdPVwieydkaXNhYmxlZCc6IGRvdHNEYXRhPy5kaXNhYmxlZH1cIj5cclxuICAgICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGRvdCBvZiBkb3RzRGF0YT8uZG90c1wiIGNsYXNzPVwib3dsLWRvdFwiIFtuZ0NsYXNzXT1cInsnYWN0aXZlJzogZG90LmFjdGl2ZSwgJ293bC1kb3QtdGV4dCc6IGRvdC5zaG93SW5uZXJDb250ZW50fVwiIChjbGljayk9XCJtb3ZlQnlEb3QoZG90LmlkKVwiPlxyXG4gICAgICAgICAgICA8c3BhbiBbaW5uZXJIVE1MXT1cImRvdC5pbm5lckNvbnRlbnRcIj48L3NwYW4+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj4gPCEtLSAvLm93bC1kb3RzIC0tPlxyXG4gICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgIDwvZGl2PiA8IS0tIC8ub3dsLWNhcm91c2VsIG93bC1sb2FkZWQgLS0+XHJcbiAgYCxcclxuICBzdHlsZXM6IFtgLm93bC10aGVtZSB7IGRpc3BsYXk6IGJsb2NrOyB9YF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBOYXZpZ2F0aW9uU2VydmljZSxcclxuICAgIEF1dG9wbGF5U2VydmljZSxcclxuICAgIENhcm91c2VsU2VydmljZSxcclxuICAgIExhenlMb2FkU2VydmljZSxcclxuICAgIEFuaW1hdGVTZXJ2aWNlLFxyXG4gICAgQXV0b0hlaWdodFNlcnZpY2UsXHJcbiAgICBIYXNoU2VydmljZVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIENhcm91c2VsQ29tcG9uZW50XHJcbiAgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudENoZWNrZWQsIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XHJcbiAgQENvbnRlbnRDaGlsZHJlbihDYXJvdXNlbFNsaWRlRGlyZWN0aXZlKVxyXG4gIHNsaWRlczogUXVlcnlMaXN0PENhcm91c2VsU2xpZGVEaXJlY3RpdmU+O1xyXG5cclxuICBAT3V0cHV0KCkgdHJhbnNsYXRlZCA9IG5ldyBFdmVudEVtaXR0ZXI8U2xpZGVzT3V0cHV0RGF0YT4oKTtcclxuICBAT3V0cHV0KCkgZHJhZ2dpbmcgPSBuZXcgRXZlbnRFbWl0dGVyPHtkcmFnZ2luZzogYm9vbGVhbiwgZGF0YTogU2xpZGVzT3V0cHV0RGF0YX0+KCk7XHJcbiAgQE91dHB1dCgpIGNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8U2xpZGVzT3V0cHV0RGF0YT4oKTtcclxuICBAT3V0cHV0KCkgaW5pdGlhbGl6ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFNsaWRlc091dHB1dERhdGE+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdpZHRoIG9mIGNhcm91c2VsIHdpbmRvdyAodGFnIHdpdGggY2xhc3MgLm93bC1jYXJvdXNlbCksIGluIHdpY2ggd2UgY2FuIHNlZSBtb3Zpbmcgc2xpZGVyc1xyXG4gICAqL1xyXG4gIGNhcm91c2VsV2luZG93V2lkdGg6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaXB0aW9uIHRvICdyZXNpemUnIGV2ZW50XHJcbiAgICovXHJcbiAgcmVzaXplU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlwdGlvbiBtZXJnZSBPYnNlcnZhYmxlLCB3aGljaCBtZXJnZXMgYWxsIE9ic2VydmFibGVzIGluIHRoZSBjb21wb25lbnQgZXhjZXB0ICdyZXNpemUnIE9ic2VydmFibGUgYW5kIHRoaXMuc2xpZGVzLmNoYW5nZXMoKVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2FsbE9ic2VydlN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gdG8gYHRoaXMuc2xpZGVzLmNoYW5nZXMoKS5cclxuICAgKiBJdCBjb3VsZCBiZSBpbmNsdWRlZCBpbiAndGhpcy5fYWxsT2JzZXJ2U3Vic2NyaXB0aW9uJywgYnV0IHRoYXQgc3ViY3JpcHRpb24gZ2V0IGNyZWF0ZWQgZHVyaW5nIHRoZSBpbml0aWFsaXppbmcgb2YgY29tcG9uZW50XHJcbiAgICogYW5kICd0aGlzLnNsaWRlcycgYXJlIHVuZGVmaW5lZCBhdCB0aGF0IG1vbWVudC4gU28gaXQncyBuZWVkZWQgdG8gd2FpdCBmb3IgaW5pdGlhbGl6YXRpb24gb2YgY29udGVudC5cclxuICAgKi9cclxuICBwcml2YXRlIF9zbGlkZXNDaGFuZ2VzU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIEN1cnJlbnQgc2V0dGluZ3MgZm9yIHRoZSBjYXJvdXNlbC5cclxuICAgKi9cclxuICBvd2xET01EYXRhOiBPd2xET01EYXRhO1xyXG5cclxuICAvKipcclxuICAgKiBEYXRhIG9mIG93bC1zdGFnZVxyXG4gICAqL1xyXG5cdHN0YWdlRGF0YTogU3RhZ2VEYXRhO1xyXG5cclxuXHQvKipcclxuXHQgKiAgRGF0YSBvZiBldmVyeSBzbGlkZVxyXG5cdCAqL1xyXG4gIHNsaWRlc0RhdGE6IFNsaWRlTW9kZWxbXSA9IFtdO1xyXG5cclxuICAvKipcclxuXHQgKiBEYXRhIG9mIG5hdmlnYXRpb24gYmxvY2tcclxuXHQgKi9cclxuXHRuYXZEYXRhOiBOYXZEYXRhO1xyXG5cclxuXHQvKipcclxuXHQgKiBEYXRhIG9mIGRvdHMgYmxvY2tcclxuXHQgKi9cclxuICBkb3RzRGF0YTogRG90c0RhdGE7XHJcblxyXG4gIC8qKlxyXG4gICAqIERhdGEsIHdpY2ggYXJlIHBhc3NlZCBvdXQgb2YgY2Fyb3VzZWwgYWZ0ZXIgZW5kaW5nIG9mIHRyYW5zaW9uaW5nIG9mIGNhcm91c2VsXHJcbiAgICovXHJcbiAgc2xpZGVzT3V0cHV0RGF0YTogU2xpZGVzT3V0cHV0RGF0YTtcclxuXHJcbiAgLyoqXHJcbiAgICogU2hvd3Mgd2hldGhlciBjYXJvdXNlbCBpcyBsb2FkZWQgb2Ygbm90LlxyXG4gICAqL1xyXG4gIGNhcm91c2VsTG9hZGVkID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZXIncyBvcHRpb25zXHJcbiAgICovXHJcbiAgQElucHV0KCkgb3B0aW9uczogT3dsT3B0aW9ucztcclxuXHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2YWJsZSBmb3IgZ2V0dGluZyBjdXJyZW50IFZpZXcgU2V0dGluZ3NcclxuICAgKi9cclxuICBwcml2YXRlIF92aWV3Q3VyU2V0dGluZ3MkOiBPYnNlcnZhYmxlPENhcm91c2VsQ3VycmVudERhdGE+O1xyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZhYmxlIGZvciBjYXRjaGluZyB0aGUgZW5kIG9mIHRyYW5zaXRpb24gb2YgY2Fyb3VzZWxcclxuICAgKi9cclxuICBwcml2YXRlIF90cmFuc2xhdGVkQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz47XHJcblxyXG4gIC8qKlxyXG4gICAqIE9ic2VydmFibGUgZm9yIGNhdGNoaW5nIHRoZSBzdGFydCBvZiBkcmFnZ2luZyBvZiB0aGUgY2Fyb3VzZWxcclxuICAgKi9cclxuICBwcml2YXRlIF9kcmFnZ2luZ0Nhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+O1xyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZhYmxlIGZvciBjYXRjaGluZyB0aGUgc3RhcnQgb2YgY2hhbmdpbmcgb2YgdGhlIGNhcm91c2VsXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfY2hhbmdlQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz47XHJcblxyXG4gIC8qKlxyXG4gICAqIE9ic2VydmFibGUgZm9yIGNhdGNoaW5nIHRoZSBpbml0aWFsaXphdGlvbiBvZiBjaGFuZ2luZyB0aGUgY2Fyb3VzZWxcclxuICAgKi9cclxuICBwcml2YXRlIF9pbml0aWFsaXplZENhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+O1xyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZhYmxlIGZvciBtZXJnaW5nIGFsbCBPYnNlcnZhYmxlcyBhbmQgY3JlYXRpbmcgb25lIHN1YnNjcmlwdGlvblxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2Nhcm91c2VsTWVyZ2UkOiBPYnNlcnZhYmxlPENhcm91c2VsQ3VycmVudERhdGEgfCBzdHJpbmc+O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXHJcbiAgICBwcml2YXRlIHJlc2l6ZVNlcnZpY2U6IFJlc2l6ZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNhcm91c2VsU2VydmljZTogQ2Fyb3VzZWxTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBuYXZpZ2F0aW9uU2VydmljZTogTmF2aWdhdGlvblNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGF1dG9wbGF5U2VydmljZTogQXV0b3BsYXlTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBsYXp5TG9hZFNlcnZpY2U6IExhenlMb2FkU2VydmljZSxcclxuICAgIHByaXZhdGUgYW5pbWF0ZVNlcnZpY2U6IEFuaW1hdGVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBhdXRvSGVpZ2h0U2VydmljZTogQXV0b0hlaWdodFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGhhc2hTZXJ2aWNlOiBIYXNoU2VydmljZSxcclxuICAgIHByaXZhdGUgbG9nZ2VyOiBPd2xMb2dnZXJcclxuICApIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5zcHlEYXRhU3RyZWFtcygpO1xyXG5cclxuICAgIHRoaXMuY2Fyb3VzZWxXaW5kb3dXaWR0aCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICAnLm93bC1jYXJvdXNlbCdcclxuICAgICkuY2xpZW50V2lkdGg7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XHJcbiAgfVxyXG4gIC8vIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIEVORFxyXG5cclxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcbiAgICBpZiAodGhpcy5zbGlkZXMudG9BcnJheSgpLmxlbmd0aCkge1xyXG4gICAgICB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR1cCh0aGlzLmNhcm91c2VsV2luZG93V2lkdGgsIHRoaXMuc2xpZGVzLnRvQXJyYXkoKSwgdGhpcy5vcHRpb25zKTtcclxuICAgICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UuaW5pdGlhbGl6ZSh0aGlzLnNsaWRlcy50b0FycmF5KCkpO1xyXG5cclxuICAgICAgdGhpcy5fd2luUmVzaXplV2F0Y2hlcigpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5sb2dnZXIubG9nKGBUaGVyZSBhcmUgbm8gc2xpZGVzIHRvIHNob3cuIFNvIHRoZSBjYXJvdXNlbCB3b24ndCBiZSByZW5kZXJlZGApO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX3NsaWRlc0NoYW5nZXNTdWJzY3JpcHRpb24gPSB0aGlzLnNsaWRlcy5jaGFuZ2VzLnBpcGUoXHJcbiAgICAgIHRhcCgoc2xpZGVzKSA9PiB7XHJcbiAgICAgICAgaWYgKHNsaWRlcy50b0FycmF5KCkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAvLyB0aGlzLmNhcm91c2VsU2VydmljZS5zZXRJdGVtcyhzbGlkZXMudG9BcnJheSgpKTtcclxuICAgICAgICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHVwKHRoaXMuY2Fyb3VzZWxXaW5kb3dXaWR0aCwgc2xpZGVzLnRvQXJyYXkoKSwgdGhpcy5vcHRpb25zKTtcclxuICAgICAgICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmluaXRpYWxpemUoc2xpZGVzLnRvQXJyYXkoKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuY2Fyb3VzZWxMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhgVGhlcmUgYXJlIG5vIHNsaWRlcyB0byBzaG93LiBTbyB0aGUgY2Fyb3VzZWwgd29uJ3QgYmUgcmUtcmVuZGVyZWRgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICApLnN1YnNjcmliZSgoKT0+e30pO1xyXG5cclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgaWYgKHRoaXMucmVzaXplU3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgIHRoaXMucmVzaXplU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fc2xpZGVzQ2hhbmdlc1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG5cclxuICAgIHRoaXMuX2FsbE9ic2VydlN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSm9pbnMgdGhlIG9ic2VydmFibGUgbG9naW4gaW4gb25lIHBsYWNlOiBzZXRzIHZhbHVlcyB0byBzb21lIG9ic2VydmFibGVzLCBtZXJnZXMgdGhpcyBvYnNlcnZhYmxlcyBhbmRcclxuICAgKiBzdWJjcmliZXMgdG8gbWVyZ2UgZnVuY1xyXG4gICAqL1xyXG4gIHNweURhdGFTdHJlYW1zKCkge1xyXG4gICAgdGhpcy5fdmlld0N1clNldHRpbmdzJCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldFZpZXdDdXJTZXR0aW5ncygpLnBpcGUoXHJcbiAgICAgIHRhcChkYXRhID0+IHtcclxuICAgICAgICB0aGlzLm93bERPTURhdGEgPSBkYXRhLm93bERPTURhdGE7XHJcbiAgICAgICAgdGhpcy5zdGFnZURhdGEgPSBkYXRhLnN0YWdlRGF0YTtcclxuICAgICAgICB0aGlzLnNsaWRlc0RhdGEgPSBkYXRhLnNsaWRlc0RhdGE7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNhcm91c2VsTG9hZGVkKSB7XHJcbiAgICAgICAgICB0aGlzLmNhcm91c2VsTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5uYXZEYXRhID0gZGF0YS5uYXZEYXRhO1xyXG4gICAgICAgIHRoaXMuZG90c0RhdGEgPSBkYXRhLmRvdHNEYXRhO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLl9pbml0aWFsaXplZENhcm91c2VsJCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldEluaXRpYWxpemVkU3RhdGUoKS5waXBlKFxyXG4gICAgICB0YXAoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZ2F0aGVyVHJhbnNsYXRlZERhdGEoKTtcclxuICAgICAgICB0aGlzLmluaXRpYWxpemVkLmVtaXQodGhpcy5zbGlkZXNPdXRwdXREYXRhKTtcclxuICAgICAgICAvLyB0aGlzLnNsaWRlc091dHB1dERhdGEgPSB7fTtcclxuICAgICAgfSlcclxuICAgIClcclxuXHJcbiAgICB0aGlzLl90cmFuc2xhdGVkQ2Fyb3VzZWwkID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0VHJhbnNsYXRlZFN0YXRlKCkucGlwZShcclxuICAgICAgdGFwKCgpID0+IHtcclxuICAgICAgICB0aGlzLmdhdGhlclRyYW5zbGF0ZWREYXRhKCk7XHJcbiAgICAgICAgdGhpcy50cmFuc2xhdGVkLmVtaXQodGhpcy5zbGlkZXNPdXRwdXREYXRhKTtcclxuICAgICAgICAvLyB0aGlzLnNsaWRlc091dHB1dERhdGEgPSB7fTtcclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5fY2hhbmdlQ2Fyb3VzZWwkID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0Q2hhbmdlU3RhdGUoKS5waXBlKFxyXG4gICAgICB0YXAoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZ2F0aGVyVHJhbnNsYXRlZERhdGEoKTtcclxuICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMuc2xpZGVzT3V0cHV0RGF0YSk7XHJcbiAgICAgICAgLy8gdGhpcy5zbGlkZXNPdXRwdXREYXRhID0ge307XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuX2RyYWdnaW5nQ2Fyb3VzZWwkID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0RHJhZ1N0YXRlKCkucGlwZShcclxuICAgICAgdGFwKCgpID0+IHtcclxuICAgICAgICB0aGlzLmdhdGhlclRyYW5zbGF0ZWREYXRhKCk7XHJcbiAgICAgICAgdGhpcy5kcmFnZ2luZy5lbWl0KHtkcmFnZ2luZzogdHJ1ZSwgZGF0YTogdGhpcy5zbGlkZXNPdXRwdXREYXRhfSk7XHJcbiAgICAgIH0pLFxyXG4gICAgICBzd2l0Y2hNYXAoXHJcbiAgICAgICAgKCkgPT4gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0VHJhbnNsYXRlZFN0YXRlKCkucGlwZShcclxuICAgICAgICAgIGZpcnN0KCksXHJcbiAgICAgICAgICB0YXAoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmRyYWdnaW5nLmVtaXQoe2RyYWdnaW5nOiBmYWxzZSwgZGF0YTogdGhpcy5zbGlkZXNPdXRwdXREYXRhfSk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIClcclxuICAgICAgKVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLl9jYXJvdXNlbE1lcmdlJCA9IG1lcmdlKHRoaXMuX3ZpZXdDdXJTZXR0aW5ncyQsIHRoaXMuX3RyYW5zbGF0ZWRDYXJvdXNlbCQsIHRoaXMuX2RyYWdnaW5nQ2Fyb3VzZWwkLCB0aGlzLl9jaGFuZ2VDYXJvdXNlbCQsIHRoaXMuX2luaXRpYWxpemVkQ2Fyb3VzZWwkKTtcclxuICAgIHRoaXMuX2FsbE9ic2VydlN1YnNjcmlwdGlvbiA9IHRoaXMuX2Nhcm91c2VsTWVyZ2UkLnN1YnNjcmliZSgoKSA9PiB7fSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbml0IHN1YnNjcmlwdGlvbiB0byByZXNpemUgZXZlbnQgYW5kIGF0dGFjaGVzIGhhbmRsZXIgZm9yIHRoaXMgZXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIF93aW5SZXNpemVXYXRjaGVyKCkge1xyXG4gICAgaWYgKE9iamVjdC5rZXlzKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLl9vcHRpb25zLnJlc3BvbnNpdmUpLmxlbmd0aCkge1xyXG4gICAgICB0aGlzLnJlc2l6ZVN1YnNjcmlwdGlvbiA9IHRoaXMucmVzaXplU2VydmljZS5vblJlc2l6ZSRcclxuICAgICAgICAucGlwZShcclxuICAgICAgICAgIGZpbHRlcigoKSA9PiB0aGlzLmNhcm91c2VsV2luZG93V2lkdGggIT09IHRoaXMuZWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcub3dsLWNhcm91c2VsJykuY2xpZW50V2lkdGgpLFxyXG4gICAgICAgICAgZGVsYXkodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MucmVzcG9uc2l2ZVJlZnJlc2hSYXRlKVxyXG4gICAgICAgIClcclxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm9uUmVzaXplKHRoaXMuZWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcub3dsLWNhcm91c2VsJykuY2xpZW50V2lkdGgpO1xyXG4gICAgICAgICAgdGhpcy5jYXJvdXNlbFdpbmRvd1dpZHRoID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vd2wtY2Fyb3VzZWwnKS5jbGllbnRXaWR0aDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhbmRsZXIgZm9yIHRyYW5zaXRpb2VuZCBldmVudFxyXG4gICAqL1xyXG4gIG9uVHJhbnNpdGlvbkVuZCgpIHtcclxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm9uVHJhbnNpdGlvbkVuZCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlciBmb3IgY2xpY2sgZXZlbnQsIGF0dGFjaGVkIHRvIG5leHQgYnV0dG9uXHJcbiAgICovXHJcbiAgbmV4dCgpIHtcclxuICAgIGlmICghdGhpcy5jYXJvdXNlbExvYWRlZCB8fCAodGhpcy5uYXZEYXRhICYmIHRoaXMubmF2RGF0YS5kaXNhYmxlZCkpIHJldHVybjtcclxuICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UubmV4dCh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5uYXZTcGVlZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGVyIGZvciBjbGljayBldmVudCwgYXR0YWNoZWQgdG8gcHJldiBidXR0b25cclxuICAgKi9cclxuICBwcmV2KCkge1xyXG4gICAgaWYgKCF0aGlzLmNhcm91c2VsTG9hZGVkIHx8ICh0aGlzLm5hdkRhdGEgJiYgdGhpcy5uYXZEYXRhLmRpc2FibGVkKSkgcmV0dXJuO1xyXG4gICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5wcmV2KHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLm5hdlNwZWVkKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhbmRsZXIgZm9yIGNsaWNrIGV2ZW50LCBhdHRhY2hlZCB0byBkb3RzXHJcbiAgICovXHJcbiAgbW92ZUJ5RG90KGRvdElkOiBzdHJpbmcpIHtcclxuICAgIGlmICghdGhpcy5jYXJvdXNlbExvYWRlZCkgcmV0dXJuO1xyXG4gICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5tb3ZlQnlEb3QoZG90SWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogcmV3aW5kcyBjYXJvdXNlbCB0byBzbGlkZSB3aXRoIG5lZWRlZCBpZFxyXG4gICAqIEBwYXJhbSBpZCBmcmFnbWVudCBvZiB1cmxcclxuICAgKi9cclxuICB0byhpZDogc3RyaW5nKSB7XHJcbiAgICBpZiAoIXRoaXMuY2Fyb3VzZWxMb2FkZWQgfHwgKHRoaXMubmF2RGF0YSAmJiB0aGlzLm5hdkRhdGEuZGlzYWJsZWQpIHx8ICh0aGlzLmRvdHNEYXRhICYmIHRoaXMuZG90c0RhdGEuZGlzYWJsZWQpKSByZXR1cm47XHJcbiAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLnRvU2xpZGVCeUlkKGlkKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdhdGhlcnMgYW5kIHByZXBhcmVzIGRhdGEgaW50ZW5kZWQgZm9yIHBhc3NpbmcgdG8gdGhlIHVzZXIgYnkgbWVhbnMgb2YgZmlyaW5nIGV2ZW50IHRyYW5zbGF0ZWRDYXJvdXNlbFxyXG4gICAqL1xyXG4gIGdhdGhlclRyYW5zbGF0ZWREYXRhKCkge1xyXG4gICAgbGV0IHN0YXJ0UG9zaXRpb246IG51bWJlcjtcclxuICAgIGNvbnN0IGNsb25lZElkUHJlZml4ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuY2xvbmVkSWRQcmVmaXg7XHJcbiAgICBjb25zdCBhY3RpdmVTbGlkZXM6IFNsaWRlTW9kZWxbXSA9IHRoaXMuc2xpZGVzRGF0YVxyXG4gICAgICAuZmlsdGVyKHNsaWRlID0+IHNsaWRlLmlzQWN0aXZlID09PSB0cnVlKVxyXG4gICAgICAubWFwKHNsaWRlID0+IHtcclxuICAgICAgICBjb25zdCBpZCA9IHNsaWRlLmlkLmluZGV4T2YoY2xvbmVkSWRQcmVmaXgpID49IDAgPyBzbGlkZS5pZC5zbGljZShjbG9uZWRJZFByZWZpeC5sZW5ndGgpIDogc2xpZGUuaWQ7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIGlkOiBpZCxcclxuICAgICAgICAgIHdpZHRoOiBzbGlkZS53aWR0aCxcclxuICAgICAgICAgIG1hcmdpbkw6IHNsaWRlLm1hcmdpbkwsXHJcbiAgICAgICAgICBtYXJnaW5SOiBzbGlkZS5tYXJnaW5SLFxyXG4gICAgICAgICAgY2VudGVyOiBzbGlkZS5pc0NlbnRlcmVkXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIHN0YXJ0UG9zaXRpb24gPSB0aGlzLmNhcm91c2VsU2VydmljZS5yZWxhdGl2ZSh0aGlzLmNhcm91c2VsU2VydmljZS5jdXJyZW50KCkpO1xyXG4gICAgdGhpcy5zbGlkZXNPdXRwdXREYXRhID0ge1xyXG4gICAgICBzdGFydFBvc2l0aW9uOiBzdGFydFBvc2l0aW9uLFxyXG4gICAgICBzbGlkZXM6IGFjdGl2ZVNsaWRlc1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnRzIHBhdXNpbmdcclxuICAgKi9cclxuICBzdGFydFBhdXNpbmcoKSB7XHJcbiAgICB0aGlzLmF1dG9wbGF5U2VydmljZS5zdGFydFBhdXNpbmcoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0YXJ0cyBwbGF5aW5nIGFmdGVyIG1vdXNlIGxlYXZlcyBjYXJvdXNlbFxyXG4gICAqL1xyXG4gIHN0YXJ0UGxheU1MKCkge1xyXG4gICAgdGhpcy5hdXRvcGxheVNlcnZpY2Uuc3RhcnRQbGF5aW5nTW91c2VMZWF2ZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnRzIHBsYXlpbmcgYWZ0ZXIgdG91Y2ggZW5kc1xyXG4gICAqL1xyXG4gIHN0YXJ0UGxheVRFKCkge1xyXG4gICAgdGhpcy5hdXRvcGxheVNlcnZpY2Uuc3RhcnRQbGF5aW5nVG91Y2hFbmQoKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==