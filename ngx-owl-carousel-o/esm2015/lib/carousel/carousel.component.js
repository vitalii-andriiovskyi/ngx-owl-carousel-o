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
        // if (!this.carouselLoaded || ((this.navData && this.navData.disabled) && (this.dotsData && this.dotsData.disabled))) return;
        if (!this.carouselLoaded)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW93bC1jYXJvdXNlbC1vLyIsInNvdXJjZXMiOlsibGliL2Nhcm91c2VsL2Nhcm91c2VsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFJVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxTQUFTLEVBQ1QsZUFBZSxFQUNmLFdBQVcsRUFDWCxVQUFVLEVBRVYsWUFBWSxFQUNiLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBNEIsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXZELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxlQUFlLEVBQXVCLE1BQU0sOEJBQThCLENBQUM7QUFJcEYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRXpELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7O0lBRW5ELE1BQU0sR0FBRyxDQUFDO0FBR2QsTUFBTSxPQUFPLHNCQUFzQjs7OztJQWlDakMsWUFBbUIs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Q1gsU0FBUzs7O3FCQXVHZixlQUFlLFNBQUMsc0JBQXNCO3lCQUd0QyxNQUFNO3VCQUNOLE1BQU07cUJBQ04sTUFBTTswQkFDTixNQUFNO3NCQThETixLQUFLOzs7O0lBcEVOLG1DQUMwQzs7SUFFMUMsdUNBQTREOztJQUM1RCxxQ0FBcUY7O0lBQ3JGLG1DQUF3RDs7SUFDeEQsd0NBQTZEOzs7OztJQUs3RCxnREFBNEI7Ozs7O0lBSzVCLCtDQUFpQzs7Ozs7SUFLakMsbURBQTZDOzs7Ozs7O0lBTzdDLHVEQUFpRDs7Ozs7SUFLakQsdUNBQXVCOzs7OztJQUt4QixzQ0FBcUI7Ozs7O0lBS3BCLHVDQUE4Qjs7Ozs7SUFLL0Isb0NBQWlCOzs7OztJQUtoQixxQ0FBbUI7Ozs7O0lBS25CLDZDQUFtQzs7Ozs7SUFLbkMsMkNBQXVCOzs7OztJQUt2QixvQ0FBNkI7Ozs7O0lBSzdCLDhDQUEyRDs7Ozs7SUFLM0QsaURBQWlEOzs7OztJQUtqRCwrQ0FBK0M7Ozs7O0lBSy9DLDZDQUE2Qzs7Ozs7SUFLN0Msa0RBQWtEOzs7OztJQUtsRCw0Q0FBa0U7O0lBR2hFLCtCQUFzQjs7SUFDdEIsMENBQW9DOztJQUNwQyw0Q0FBd0M7O0lBQ3hDLDhDQUE0Qzs7SUFDNUMsNENBQXdDOztJQUN4Qyw0Q0FBd0M7O0lBQ3hDLDJDQUFzQzs7SUFDdEMsOENBQTRDOztJQUM1Qyx3Q0FBZ0M7O0lBQ2hDLG1DQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIE9uSW5pdCxcclxuICBBZnRlckNvbnRlbnRDaGVja2VkLFxyXG4gIE9uRGVzdHJveSxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRGlyZWN0aXZlLFxyXG4gIFF1ZXJ5TGlzdCxcclxuICBDb250ZW50Q2hpbGRyZW4sXHJcbiAgVGVtcGxhdGVSZWYsXHJcbiAgRWxlbWVudFJlZixcclxuICBBZnRlckNvbnRlbnRJbml0LFxyXG4gIEV2ZW50RW1pdHRlclxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBPYnNlcnZhYmxlLCBtZXJnZSB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgUmVzaXplU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3Jlc2l6ZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgdGFwLCBkZWxheSwgZmlsdGVyLCBzd2l0Y2hNYXAsIGZpcnN0IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBDYXJvdXNlbFNlcnZpY2UsIENhcm91c2VsQ3VycmVudERhdGEgfSBmcm9tICcuLi9zZXJ2aWNlcy9jYXJvdXNlbC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3RhZ2VEYXRhIH0gZnJvbSBcIi4uL21vZGVscy9zdGFnZS1kYXRhLm1vZGVsXCI7XHJcbmltcG9ydCB7IE93bERPTURhdGEgfSBmcm9tIFwiLi4vbW9kZWxzL293bERPTS1kYXRhLm1vZGVsXCI7XHJcbmltcG9ydCB7IFNsaWRlTW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvc2xpZGUubW9kZWwnO1xyXG5pbXBvcnQgeyBPd2xPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWxzL293bC1vcHRpb25zLm1vZGVsJztcclxuaW1wb3J0IHsgTmF2RGF0YSwgRG90c0RhdGEgfSBmcm9tICcuLi9tb2RlbHMvbmF2aWdhdGlvbi1kYXRhLm1vZGVscyc7XHJcbmltcG9ydCB7IE5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmF2aWdhdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQXV0b3BsYXlTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvYXV0b3BsYXkuc2VydmljZSc7XHJcbmltcG9ydCB7IExhenlMb2FkU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2xhenlsb2FkLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBbmltYXRlU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2FuaW1hdGUuc2VydmljZSc7XHJcbmltcG9ydCB7IEF1dG9IZWlnaHRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvYXV0b2hlaWdodC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSGFzaFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9oYXNoLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBPd2xMb2dnZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9sb2dnZXIuc2VydmljZSc7XHJcblxyXG5sZXQgbmV4dElkID0gMDtcclxuXHJcbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ25nLXRlbXBsYXRlW2Nhcm91c2VsU2xpZGVdJyB9KVxyXG5leHBvcnQgY2xhc3MgQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZSB7XHJcbiAgLyoqXHJcbiAgICogVW5pcXVlIHNsaWRlIGlkZW50aWZpZXIuIE11c3QgYmUgdW5pcXVlIGZvciB0aGUgZW50aXJlIGRvY3VtZW50IGZvciBwcm9wZXIgYWNjZXNzaWJpbGl0eSBzdXBwb3J0LlxyXG4gICAqIFdpbGwgYmUgYXV0by1nZW5lcmF0ZWQgaWYgbm90IHByb3ZpZGVkLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGlkID0gYG93bC1zbGlkZS0ke25leHRJZCsrfWA7XHJcblxyXG4gIC8qKlxyXG4gICAqIERlZmluZXMgaG93IG11Y2ggd2lkdGhzIG9mIGNvbW1vbiBzbGlkZSB3aWxsIGN1cnJlbnQgc2xpZGUgaGF2ZVxyXG4gICAqIGUuZy4gaWYgX21lcmdlRGF0YT0yLCB0aGUgc2xpZGUgd2lsbCB0d2ljZSB3aWRlciB0aGVuIHNsaWRlcyB3aXRoIF9tZXJnZURhdGE9MVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2RhdGFNZXJnZSA9IDE7XHJcbiAgQElucHV0KClcclxuICBzZXQgZGF0YU1lcmdlKGRhdGE6IG51bWJlcikge1xyXG4gICAgdGhpcy5fZGF0YU1lcmdlID0gdGhpcy5pc051bWVyaWMoZGF0YSkgPyBkYXRhIDogMTtcclxuICB9O1xyXG4gIGdldCBkYXRhTWVyZ2UoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2RhdGFNZXJnZSB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdpZHRoIG9mIHNsaWRlXHJcbiAgICovXHJcbiAgQElucHV0KCkgd2lkdGggPSAwO1xyXG5cclxuICAvKipcclxuICAgKiBJbm5lciBjb250ZW50IG9mIGRvdCBmb3IgY2VydGFpbiBzbGlkZTsgY2FuIGJlIGh0bWwtbWFya3VwXHJcbiAgICovXHJcbiAgQElucHV0KCkgZG90Q29udGVudCA9ICcnO1xyXG5cclxuICAvKipcclxuICAgKiBIYXNoIChmcmFnbWVudCkgb2YgdXJsIHdoaWNoIGNvcnJlc3BvbmRzIHRvIGNlcnRhaW4gc2xpZGVcclxuICAgKi9cclxuICBASW5wdXQoKSBkYXRhSGFzaCA9ICcnO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdHBsUmVmOiBUZW1wbGF0ZVJlZjxhbnk+KSB7fVxyXG5cclxuICAvKipcclxuXHQgKiBEZXRlcm1pbmVzIGlmIHRoZSBpbnB1dCBpcyBhIE51bWJlciBvciBzb21ldGhpbmcgdGhhdCBjYW4gYmUgY29lcmNlZCB0byBhIE51bWJlclxyXG5cdCAqIEBwYXJhbSAtIFRoZSBpbnB1dCB0byBiZSB0ZXN0ZWRcclxuXHQgKiBAcmV0dXJucyAtIEFuIGluZGljYXRpb24gaWYgdGhlIGlucHV0IGlzIGEgTnVtYmVyIG9yIGNhbiBiZSBjb2VyY2VkIHRvIGEgTnVtYmVyXHJcblx0ICovXHJcbiAgaXNOdW1lcmljKG51bWJlcjogYW55KTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQobnVtYmVyKSk7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogRGF0YSB3aGljaCB3aWxsIGJlIHBhc3NlZCBvdXQgYWZ0ZXIgZW5kaW5nIG9mIHRyYW5zaXRpb24gb2YgY2Fyb3VzZWxcclxuICovXHJcbmV4cG9ydCBjbGFzcyBTbGlkZXNPdXRwdXREYXRhIHtcclxuICBzdGFydFBvc2l0aW9uPzogbnVtYmVyO1xyXG4gIHNsaWRlcz86IFNsaWRlTW9kZWxbXTtcclxufTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnb3dsLWNhcm91c2VsLW8nLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2IGNsYXNzPVwib3dsLWNhcm91c2VsIG93bC10aGVtZVwiICNvd2xDYXJvdXNlbFxyXG4gICAgICBbbmdDbGFzc109XCJ7J293bC1ydGwnOiBvd2xET01EYXRhPy5ydGwsXHJcbiAgICAgICAgICAgICAgICAgICdvd2wtbG9hZGVkJzogb3dsRE9NRGF0YT8uaXNMb2FkZWQsXHJcbiAgICAgICAgICAgICAgICAgICdvd2wtcmVzcG9uc2l2ZSc6IG93bERPTURhdGE/LmlzUmVzcG9uc2l2ZSxcclxuICAgICAgICAgICAgICAgICAgJ293bC1kcmFnJzogb3dsRE9NRGF0YT8uaXNNb3VzZURyYWdhYmxlLFxyXG4gICAgICAgICAgICAgICAgICAnb3dsLWdyYWInOiBvd2xET01EYXRhPy5pc0dyYWJ9XCJcclxuICAgICAgKG1vdXNlb3Zlcik9XCJzdGFydFBhdXNpbmcoKVwiXHJcbiAgICAgIChtb3VzZWxlYXZlKT1cInN0YXJ0UGxheU1MKClcIlxyXG4gICAgICAodG91Y2hzdGFydCk9XCJzdGFydFBhdXNpbmcoKVwiXHJcbiAgICAgICh0b3VjaGVuZCk9XCJzdGFydFBsYXlURSgpXCI+XHJcblxyXG4gICAgICA8ZGl2ICpuZ0lmPVwiY2Fyb3VzZWxMb2FkZWRcIiBjbGFzcz1cIm93bC1zdGFnZS1vdXRlclwiPlxyXG4gICAgICAgIDxvd2wtc3RhZ2UgW293bERyYWdnYWJsZV09XCJ7J2lzTW91c2VEcmFnYWJsZSc6IG93bERPTURhdGE/LmlzTW91c2VEcmFnYWJsZSwgJ2lzVG91Y2hEcmFnYWJsZSc6IG93bERPTURhdGE/LmlzVG91Y2hEcmFnYWJsZX1cIlxyXG4gICAgICAgICAgICAgICAgICAgIFtzdGFnZURhdGFdPVwic3RhZ2VEYXRhXCJcclxuICAgICAgICAgICAgICAgICAgICBbc2xpZGVzRGF0YV09XCJzbGlkZXNEYXRhXCI+PC9vd2wtc3RhZ2U+XHJcbiAgICAgIDwvZGl2PiA8IS0tIC8ub3dsLXN0YWdlLW91dGVyIC0tPlxyXG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwic2xpZGVzLnRvQXJyYXkoKS5sZW5ndGhcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwib3dsLW5hdlwiIFtuZ0NsYXNzXT1cInsnZGlzYWJsZWQnOiBuYXZEYXRhPy5kaXNhYmxlZH1cIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJvd2wtcHJldlwiIFtuZ0NsYXNzXT1cInsnZGlzYWJsZWQnOiBuYXZEYXRhPy5wcmV2Py5kaXNhYmxlZH1cIiAoY2xpY2spPVwicHJldigpXCIgW2lubmVySFRNTF09XCJuYXZEYXRhPy5wcmV2Py5odG1sVGV4dFwiPjwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm93bC1uZXh0XCIgW25nQ2xhc3NdPVwieydkaXNhYmxlZCc6IG5hdkRhdGE/Lm5leHQ/LmRpc2FibGVkfVwiIChjbGljayk9XCJuZXh0KClcIiBbaW5uZXJIVE1MXT1cIm5hdkRhdGE/Lm5leHQ/Lmh0bWxUZXh0XCI+PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+IDwhLS0gLy5vd2wtbmF2IC0tPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJvd2wtZG90c1wiIFtuZ0NsYXNzXT1cInsnZGlzYWJsZWQnOiBkb3RzRGF0YT8uZGlzYWJsZWR9XCI+XHJcbiAgICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBkb3Qgb2YgZG90c0RhdGE/LmRvdHNcIiBjbGFzcz1cIm93bC1kb3RcIiBbbmdDbGFzc109XCJ7J2FjdGl2ZSc6IGRvdC5hY3RpdmUsICdvd2wtZG90LXRleHQnOiBkb3Quc2hvd0lubmVyQ29udGVudH1cIiAoY2xpY2spPVwibW92ZUJ5RG90KGRvdC5pZClcIj5cclxuICAgICAgICAgICAgPHNwYW4gW2lubmVySFRNTF09XCJkb3QuaW5uZXJDb250ZW50XCI+PC9zcGFuPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+IDwhLS0gLy5vd2wtZG90cyAtLT5cclxuICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICA8L2Rpdj4gPCEtLSAvLm93bC1jYXJvdXNlbCBvd2wtbG9hZGVkIC0tPlxyXG4gIGAsXHJcbiAgc3R5bGVzOiBbYC5vd2wtdGhlbWUgeyBkaXNwbGF5OiBibG9jazsgfWBdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgTmF2aWdhdGlvblNlcnZpY2UsXHJcbiAgICBBdXRvcGxheVNlcnZpY2UsXHJcbiAgICBDYXJvdXNlbFNlcnZpY2UsXHJcbiAgICBMYXp5TG9hZFNlcnZpY2UsXHJcbiAgICBBbmltYXRlU2VydmljZSxcclxuICAgIEF1dG9IZWlnaHRTZXJ2aWNlLFxyXG4gICAgSGFzaFNlcnZpY2VcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDYXJvdXNlbENvbXBvbmVudFxyXG4gIGltcGxlbWVudHMgT25Jbml0LCBBZnRlckNvbnRlbnRDaGVja2VkLCBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xyXG4gIEBDb250ZW50Q2hpbGRyZW4oQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZSlcclxuICBzbGlkZXM6IFF1ZXJ5TGlzdDxDYXJvdXNlbFNsaWRlRGlyZWN0aXZlPjtcclxuXHJcbiAgQE91dHB1dCgpIHRyYW5zbGF0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFNsaWRlc091dHB1dERhdGE+KCk7XHJcbiAgQE91dHB1dCgpIGRyYWdnaW5nID0gbmV3IEV2ZW50RW1pdHRlcjx7ZHJhZ2dpbmc6IGJvb2xlYW4sIGRhdGE6IFNsaWRlc091dHB1dERhdGF9PigpO1xyXG4gIEBPdXRwdXQoKSBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFNsaWRlc091dHB1dERhdGE+KCk7XHJcbiAgQE91dHB1dCgpIGluaXRpYWxpemVkID0gbmV3IEV2ZW50RW1pdHRlcjxTbGlkZXNPdXRwdXREYXRhPigpO1xyXG5cclxuICAvKipcclxuICAgKiBXaWR0aCBvZiBjYXJvdXNlbCB3aW5kb3cgKHRhZyB3aXRoIGNsYXNzIC5vd2wtY2Fyb3VzZWwpLCBpbiB3aWNoIHdlIGNhbiBzZWUgbW92aW5nIHNsaWRlcnNcclxuICAgKi9cclxuICBjYXJvdXNlbFdpbmRvd1dpZHRoOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlwdGlvbiB0byAncmVzaXplJyBldmVudFxyXG4gICAqL1xyXG4gIHJlc2l6ZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gbWVyZ2UgT2JzZXJ2YWJsZSwgd2hpY2ggbWVyZ2VzIGFsbCBPYnNlcnZhYmxlcyBpbiB0aGUgY29tcG9uZW50IGV4Y2VwdCAncmVzaXplJyBPYnNlcnZhYmxlIGFuZCB0aGlzLnNsaWRlcy5jaGFuZ2VzKClcclxuICAgKi9cclxuICBwcml2YXRlIF9hbGxPYnNlcnZTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaXB0aW9uIHRvIGB0aGlzLnNsaWRlcy5jaGFuZ2VzKCkuXHJcbiAgICogSXQgY291bGQgYmUgaW5jbHVkZWQgaW4gJ3RoaXMuX2FsbE9ic2VydlN1YnNjcmlwdGlvbicsIGJ1dCB0aGF0IHN1YmNyaXB0aW9uIGdldCBjcmVhdGVkIGR1cmluZyB0aGUgaW5pdGlhbGl6aW5nIG9mIGNvbXBvbmVudFxyXG4gICAqIGFuZCAndGhpcy5zbGlkZXMnIGFyZSB1bmRlZmluZWQgYXQgdGhhdCBtb21lbnQuIFNvIGl0J3MgbmVlZGVkIHRvIHdhaXQgZm9yIGluaXRpYWxpemF0aW9uIG9mIGNvbnRlbnQuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfc2xpZGVzQ2hhbmdlc1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBDdXJyZW50IHNldHRpbmdzIGZvciB0aGUgY2Fyb3VzZWwuXHJcbiAgICovXHJcbiAgb3dsRE9NRGF0YTogT3dsRE9NRGF0YTtcclxuXHJcbiAgLyoqXHJcbiAgICogRGF0YSBvZiBvd2wtc3RhZ2VcclxuICAgKi9cclxuXHRzdGFnZURhdGE6IFN0YWdlRGF0YTtcclxuXHJcblx0LyoqXHJcblx0ICogIERhdGEgb2YgZXZlcnkgc2xpZGVcclxuXHQgKi9cclxuICBzbGlkZXNEYXRhOiBTbGlkZU1vZGVsW10gPSBbXTtcclxuXHJcbiAgLyoqXHJcblx0ICogRGF0YSBvZiBuYXZpZ2F0aW9uIGJsb2NrXHJcblx0ICovXHJcblx0bmF2RGF0YTogTmF2RGF0YTtcclxuXHJcblx0LyoqXHJcblx0ICogRGF0YSBvZiBkb3RzIGJsb2NrXHJcblx0ICovXHJcbiAgZG90c0RhdGE6IERvdHNEYXRhO1xyXG5cclxuICAvKipcclxuICAgKiBEYXRhLCB3aWNoIGFyZSBwYXNzZWQgb3V0IG9mIGNhcm91c2VsIGFmdGVyIGVuZGluZyBvZiB0cmFuc2lvbmluZyBvZiBjYXJvdXNlbFxyXG4gICAqL1xyXG4gIHNsaWRlc091dHB1dERhdGE6IFNsaWRlc091dHB1dERhdGE7XHJcblxyXG4gIC8qKlxyXG4gICAqIFNob3dzIHdoZXRoZXIgY2Fyb3VzZWwgaXMgbG9hZGVkIG9mIG5vdC5cclxuICAgKi9cclxuICBjYXJvdXNlbExvYWRlZCA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBVc2VyJ3Mgb3B0aW9uc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG9wdGlvbnM6IE93bE9wdGlvbnM7XHJcblxyXG4gIC8qKlxyXG4gICAqIE9ic2VydmFibGUgZm9yIGdldHRpbmcgY3VycmVudCBWaWV3IFNldHRpbmdzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfdmlld0N1clNldHRpbmdzJDogT2JzZXJ2YWJsZTxDYXJvdXNlbEN1cnJlbnREYXRhPjtcclxuXHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2YWJsZSBmb3IgY2F0Y2hpbmcgdGhlIGVuZCBvZiB0cmFuc2l0aW9uIG9mIGNhcm91c2VsXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfdHJhbnNsYXRlZENhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+O1xyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZhYmxlIGZvciBjYXRjaGluZyB0aGUgc3RhcnQgb2YgZHJhZ2dpbmcgb2YgdGhlIGNhcm91c2VsXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZHJhZ2dpbmdDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPjtcclxuXHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2YWJsZSBmb3IgY2F0Y2hpbmcgdGhlIHN0YXJ0IG9mIGNoYW5naW5nIG9mIHRoZSBjYXJvdXNlbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2NoYW5nZUNhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+O1xyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZhYmxlIGZvciBjYXRjaGluZyB0aGUgaW5pdGlhbGl6YXRpb24gb2YgY2hhbmdpbmcgdGhlIGNhcm91c2VsXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfaW5pdGlhbGl6ZWRDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPjtcclxuXHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2YWJsZSBmb3IgbWVyZ2luZyBhbGwgT2JzZXJ2YWJsZXMgYW5kIGNyZWF0aW5nIG9uZSBzdWJzY3JpcHRpb25cclxuICAgKi9cclxuICBwcml2YXRlIF9jYXJvdXNlbE1lcmdlJDogT2JzZXJ2YWJsZTxDYXJvdXNlbEN1cnJlbnREYXRhIHwgc3RyaW5nPjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxyXG4gICAgcHJpdmF0ZSByZXNpemVTZXJ2aWNlOiBSZXNpemVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjYXJvdXNlbFNlcnZpY2U6IENhcm91c2VsU2VydmljZSxcclxuICAgIHByaXZhdGUgbmF2aWdhdGlvblNlcnZpY2U6IE5hdmlnYXRpb25TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBhdXRvcGxheVNlcnZpY2U6IEF1dG9wbGF5U2VydmljZSxcclxuICAgIHByaXZhdGUgbGF6eUxvYWRTZXJ2aWNlOiBMYXp5TG9hZFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGFuaW1hdGVTZXJ2aWNlOiBBbmltYXRlU2VydmljZSxcclxuICAgIHByaXZhdGUgYXV0b0hlaWdodFNlcnZpY2U6IEF1dG9IZWlnaHRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBoYXNoU2VydmljZTogSGFzaFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGxvZ2dlcjogT3dsTG9nZ2VyXHJcbiAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuc3B5RGF0YVN0cmVhbXMoKTtcclxuXHJcbiAgICB0aGlzLmNhcm91c2VsV2luZG93V2lkdGggPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgJy5vd2wtY2Fyb3VzZWwnXHJcbiAgICApLmNsaWVudFdpZHRoO1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xyXG4gIH1cclxuICAvLyBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSBFTkRcclxuXHJcbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG4gICAgaWYgKHRoaXMuc2xpZGVzLnRvQXJyYXkoKS5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dXAodGhpcy5jYXJvdXNlbFdpbmRvd1dpZHRoLCB0aGlzLnNsaWRlcy50b0FycmF5KCksIHRoaXMub3B0aW9ucyk7XHJcbiAgICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmluaXRpYWxpemUodGhpcy5zbGlkZXMudG9BcnJheSgpKTtcclxuXHJcbiAgICAgIHRoaXMuX3dpblJlc2l6ZVdhdGNoZXIoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubG9nZ2VyLmxvZyhgVGhlcmUgYXJlIG5vIHNsaWRlcyB0byBzaG93LiBTbyB0aGUgY2Fyb3VzZWwgd29uJ3QgYmUgcmVuZGVyZWRgKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9zbGlkZXNDaGFuZ2VzU3Vic2NyaXB0aW9uID0gdGhpcy5zbGlkZXMuY2hhbmdlcy5waXBlKFxyXG4gICAgICB0YXAoKHNsaWRlcykgPT4ge1xyXG4gICAgICAgIGlmIChzbGlkZXMudG9BcnJheSgpLmxlbmd0aCkge1xyXG4gICAgICAgICAgLy8gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0SXRlbXMoc2xpZGVzLnRvQXJyYXkoKSk7XHJcbiAgICAgICAgICB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR1cCh0aGlzLmNhcm91c2VsV2luZG93V2lkdGgsIHNsaWRlcy50b0FycmF5KCksIHRoaXMub3B0aW9ucyk7XHJcbiAgICAgICAgICB0aGlzLmNhcm91c2VsU2VydmljZS5pbml0aWFsaXplKHNsaWRlcy50b0FycmF5KCkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmNhcm91c2VsTG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coYFRoZXJlIGFyZSBubyBzbGlkZXMgdG8gc2hvdy4gU28gdGhlIGNhcm91c2VsIHdvbid0IGJlIHJlLXJlbmRlcmVkYCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgKS5zdWJzY3JpYmUoKCk9Pnt9KTtcclxuXHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIGlmICh0aGlzLnJlc2l6ZVN1YnNjcmlwdGlvbikge1xyXG4gICAgICB0aGlzLnJlc2l6ZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX3NsaWRlc0NoYW5nZXNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuXHJcbiAgICB0aGlzLl9hbGxPYnNlcnZTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEpvaW5zIHRoZSBvYnNlcnZhYmxlIGxvZ2luIGluIG9uZSBwbGFjZTogc2V0cyB2YWx1ZXMgdG8gc29tZSBvYnNlcnZhYmxlcywgbWVyZ2VzIHRoaXMgb2JzZXJ2YWJsZXMgYW5kXHJcbiAgICogc3ViY3JpYmVzIHRvIG1lcmdlIGZ1bmNcclxuICAgKi9cclxuICBzcHlEYXRhU3RyZWFtcygpIHtcclxuICAgIHRoaXMuX3ZpZXdDdXJTZXR0aW5ncyQgPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRWaWV3Q3VyU2V0dGluZ3MoKS5waXBlKFxyXG4gICAgICB0YXAoZGF0YSA9PiB7XHJcbiAgICAgICAgdGhpcy5vd2xET01EYXRhID0gZGF0YS5vd2xET01EYXRhO1xyXG4gICAgICAgIHRoaXMuc3RhZ2VEYXRhID0gZGF0YS5zdGFnZURhdGE7XHJcbiAgICAgICAgdGhpcy5zbGlkZXNEYXRhID0gZGF0YS5zbGlkZXNEYXRhO1xyXG4gICAgICAgIGlmICghdGhpcy5jYXJvdXNlbExvYWRlZCkge1xyXG4gICAgICAgICAgdGhpcy5jYXJvdXNlbExvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubmF2RGF0YSA9IGRhdGEubmF2RGF0YTtcclxuICAgICAgICB0aGlzLmRvdHNEYXRhID0gZGF0YS5kb3RzRGF0YTtcclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5faW5pdGlhbGl6ZWRDYXJvdXNlbCQgPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRJbml0aWFsaXplZFN0YXRlKCkucGlwZShcclxuICAgICAgdGFwKCgpID0+IHtcclxuICAgICAgICB0aGlzLmdhdGhlclRyYW5zbGF0ZWREYXRhKCk7XHJcbiAgICAgICAgdGhpcy5pbml0aWFsaXplZC5lbWl0KHRoaXMuc2xpZGVzT3V0cHV0RGF0YSk7XHJcbiAgICAgICAgLy8gdGhpcy5zbGlkZXNPdXRwdXREYXRhID0ge307XHJcbiAgICAgIH0pXHJcbiAgICApXHJcblxyXG4gICAgdGhpcy5fdHJhbnNsYXRlZENhcm91c2VsJCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldFRyYW5zbGF0ZWRTdGF0ZSgpLnBpcGUoXHJcbiAgICAgIHRhcCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5nYXRoZXJUcmFuc2xhdGVkRGF0YSgpO1xyXG4gICAgICAgIHRoaXMudHJhbnNsYXRlZC5lbWl0KHRoaXMuc2xpZGVzT3V0cHV0RGF0YSk7XHJcbiAgICAgICAgLy8gdGhpcy5zbGlkZXNPdXRwdXREYXRhID0ge307XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuX2NoYW5nZUNhcm91c2VsJCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldENoYW5nZVN0YXRlKCkucGlwZShcclxuICAgICAgdGFwKCgpID0+IHtcclxuICAgICAgICB0aGlzLmdhdGhlclRyYW5zbGF0ZWREYXRhKCk7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh0aGlzLnNsaWRlc091dHB1dERhdGEpO1xyXG4gICAgICAgIC8vIHRoaXMuc2xpZGVzT3V0cHV0RGF0YSA9IHt9O1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLl9kcmFnZ2luZ0Nhcm91c2VsJCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldERyYWdTdGF0ZSgpLnBpcGUoXHJcbiAgICAgIHRhcCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5nYXRoZXJUcmFuc2xhdGVkRGF0YSgpO1xyXG4gICAgICAgIHRoaXMuZHJhZ2dpbmcuZW1pdCh7ZHJhZ2dpbmc6IHRydWUsIGRhdGE6IHRoaXMuc2xpZGVzT3V0cHV0RGF0YX0pO1xyXG4gICAgICB9KSxcclxuICAgICAgc3dpdGNoTWFwKFxyXG4gICAgICAgICgpID0+IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldFRyYW5zbGF0ZWRTdGF0ZSgpLnBpcGUoXHJcbiAgICAgICAgICBmaXJzdCgpLFxyXG4gICAgICAgICAgdGFwKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5kcmFnZ2luZy5lbWl0KHtkcmFnZ2luZzogZmFsc2UsIGRhdGE6IHRoaXMuc2xpZGVzT3V0cHV0RGF0YX0pO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICApXHJcbiAgICAgIClcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5fY2Fyb3VzZWxNZXJnZSQgPSBtZXJnZSh0aGlzLl92aWV3Q3VyU2V0dGluZ3MkLCB0aGlzLl90cmFuc2xhdGVkQ2Fyb3VzZWwkLCB0aGlzLl9kcmFnZ2luZ0Nhcm91c2VsJCwgdGhpcy5fY2hhbmdlQ2Fyb3VzZWwkLCB0aGlzLl9pbml0aWFsaXplZENhcm91c2VsJCk7XHJcbiAgICB0aGlzLl9hbGxPYnNlcnZTdWJzY3JpcHRpb24gPSB0aGlzLl9jYXJvdXNlbE1lcmdlJC5zdWJzY3JpYmUoKCkgPT4ge30pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdCBzdWJzY3JpcHRpb24gdG8gcmVzaXplIGV2ZW50IGFuZCBhdHRhY2hlcyBoYW5kbGVyIGZvciB0aGlzIGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfd2luUmVzaXplV2F0Y2hlcigpIHtcclxuICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLmNhcm91c2VsU2VydmljZS5fb3B0aW9ucy5yZXNwb25zaXZlKS5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5yZXNpemVTdWJzY3JpcHRpb24gPSB0aGlzLnJlc2l6ZVNlcnZpY2Uub25SZXNpemUkXHJcbiAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICBmaWx0ZXIoKCkgPT4gdGhpcy5jYXJvdXNlbFdpbmRvd1dpZHRoICE9PSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLm93bC1jYXJvdXNlbCcpLmNsaWVudFdpZHRoKSxcclxuICAgICAgICAgIGRlbGF5KHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLnJlc3BvbnNpdmVSZWZyZXNoUmF0ZSlcclxuICAgICAgICApXHJcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmNhcm91c2VsU2VydmljZS5vblJlc2l6ZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLm93bC1jYXJvdXNlbCcpLmNsaWVudFdpZHRoKTtcclxuICAgICAgICAgIHRoaXMuY2Fyb3VzZWxXaW5kb3dXaWR0aCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcub3dsLWNhcm91c2VsJykuY2xpZW50V2lkdGg7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGVyIGZvciB0cmFuc2l0aW9lbmQgZXZlbnRcclxuICAgKi9cclxuICBvblRyYW5zaXRpb25FbmQoKSB7XHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5vblRyYW5zaXRpb25FbmQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhbmRsZXIgZm9yIGNsaWNrIGV2ZW50LCBhdHRhY2hlZCB0byBuZXh0IGJ1dHRvblxyXG4gICAqL1xyXG4gIG5leHQoKSB7XHJcbiAgICBpZiAoIXRoaXMuY2Fyb3VzZWxMb2FkZWQgfHwgKHRoaXMubmF2RGF0YSAmJiB0aGlzLm5hdkRhdGEuZGlzYWJsZWQpKSByZXR1cm47XHJcbiAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLm5leHQodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MubmF2U3BlZWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlciBmb3IgY2xpY2sgZXZlbnQsIGF0dGFjaGVkIHRvIHByZXYgYnV0dG9uXHJcbiAgICovXHJcbiAgcHJldigpIHtcclxuICAgIGlmICghdGhpcy5jYXJvdXNlbExvYWRlZCB8fCAodGhpcy5uYXZEYXRhICYmIHRoaXMubmF2RGF0YS5kaXNhYmxlZCkpIHJldHVybjtcclxuICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UucHJldih0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5uYXZTcGVlZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGVyIGZvciBjbGljayBldmVudCwgYXR0YWNoZWQgdG8gZG90c1xyXG4gICAqL1xyXG4gIG1vdmVCeURvdChkb3RJZDogc3RyaW5nKSB7XHJcbiAgICBpZiAoIXRoaXMuY2Fyb3VzZWxMb2FkZWQpIHJldHVybjtcclxuICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UubW92ZUJ5RG90KGRvdElkKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHJld2luZHMgY2Fyb3VzZWwgdG8gc2xpZGUgd2l0aCBuZWVkZWQgaWRcclxuICAgKiBAcGFyYW0gaWQgZnJhZ21lbnQgb2YgdXJsXHJcbiAgICovXHJcbiAgdG8oaWQ6IHN0cmluZykge1xyXG4gICAgLy8gaWYgKCF0aGlzLmNhcm91c2VsTG9hZGVkIHx8ICgodGhpcy5uYXZEYXRhICYmIHRoaXMubmF2RGF0YS5kaXNhYmxlZCkgJiYgKHRoaXMuZG90c0RhdGEgJiYgdGhpcy5kb3RzRGF0YS5kaXNhYmxlZCkpKSByZXR1cm47XHJcbiAgICBpZiAoIXRoaXMuY2Fyb3VzZWxMb2FkZWQpIHJldHVybjtcclxuICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UudG9TbGlkZUJ5SWQoaWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2F0aGVycyBhbmQgcHJlcGFyZXMgZGF0YSBpbnRlbmRlZCBmb3IgcGFzc2luZyB0byB0aGUgdXNlciBieSBtZWFucyBvZiBmaXJpbmcgZXZlbnQgdHJhbnNsYXRlZENhcm91c2VsXHJcbiAgICovXHJcbiAgZ2F0aGVyVHJhbnNsYXRlZERhdGEoKSB7XHJcbiAgICBsZXQgc3RhcnRQb3NpdGlvbjogbnVtYmVyO1xyXG4gICAgY29uc3QgY2xvbmVkSWRQcmVmaXggPSB0aGlzLmNhcm91c2VsU2VydmljZS5jbG9uZWRJZFByZWZpeDtcclxuICAgIGNvbnN0IGFjdGl2ZVNsaWRlczogU2xpZGVNb2RlbFtdID0gdGhpcy5zbGlkZXNEYXRhXHJcbiAgICAgIC5maWx0ZXIoc2xpZGUgPT4gc2xpZGUuaXNBY3RpdmUgPT09IHRydWUpXHJcbiAgICAgIC5tYXAoc2xpZGUgPT4ge1xyXG4gICAgICAgIGNvbnN0IGlkID0gc2xpZGUuaWQuaW5kZXhPZihjbG9uZWRJZFByZWZpeCkgPj0gMCA/IHNsaWRlLmlkLnNsaWNlKGNsb25lZElkUHJlZml4Lmxlbmd0aCkgOiBzbGlkZS5pZDtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgaWQ6IGlkLFxyXG4gICAgICAgICAgd2lkdGg6IHNsaWRlLndpZHRoLFxyXG4gICAgICAgICAgbWFyZ2luTDogc2xpZGUubWFyZ2luTCxcclxuICAgICAgICAgIG1hcmdpblI6IHNsaWRlLm1hcmdpblIsXHJcbiAgICAgICAgICBjZW50ZXI6IHNsaWRlLmlzQ2VudGVyZWRcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgc3RhcnRQb3NpdGlvbiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnJlbGF0aXZlKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmN1cnJlbnQoKSk7XHJcbiAgICB0aGlzLnNsaWRlc091dHB1dERhdGEgPSB7XHJcbiAgICAgIHN0YXJ0UG9zaXRpb246IHN0YXJ0UG9zaXRpb24sXHJcbiAgICAgIHNsaWRlczogYWN0aXZlU2xpZGVzXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdGFydHMgcGF1c2luZ1xyXG4gICAqL1xyXG4gIHN0YXJ0UGF1c2luZygpIHtcclxuICAgIHRoaXMuYXV0b3BsYXlTZXJ2aWNlLnN0YXJ0UGF1c2luZygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnRzIHBsYXlpbmcgYWZ0ZXIgbW91c2UgbGVhdmVzIGNhcm91c2VsXHJcbiAgICovXHJcbiAgc3RhcnRQbGF5TUwoKSB7XHJcbiAgICB0aGlzLmF1dG9wbGF5U2VydmljZS5zdGFydFBsYXlpbmdNb3VzZUxlYXZlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdGFydHMgcGxheWluZyBhZnRlciB0b3VjaCBlbmRzXHJcbiAgICovXHJcbiAgc3RhcnRQbGF5VEUoKSB7XHJcbiAgICB0aGlzLmF1dG9wbGF5U2VydmljZS5zdGFydFBsYXlpbmdUb3VjaEVuZCgpO1xyXG4gIH1cclxuXHJcbn1cclxuIl19