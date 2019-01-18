/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Component, Input, Output, Directive, QueryList, ContentChildren, TemplateRef, ElementRef, EventEmitter, HostListener, Inject } from '@angular/core';
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
import { DOCUMENT } from '../services/document-ref.service';
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
     * @param {?} docRef
     */
    constructor(el, resizeService, carouselService, navigationService, autoplayService, lazyLoadService, animateService, autoHeightService, hashService, logger, docRef) {
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
        this.docRef = (/** @type {?} */ (docRef));
    }
    /**
     * @param {?} ev
     * @return {?}
     */
    onVisibilityChange(ev) {
        switch (this.docRef.visibilityState) {
            case 'visible':
                this.startPlayML();
                break;
            case 'hidden':
                this.startPausing();
                break;
            default:
                break;
        }
    }
    ;
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
        if (!this.carouselLoaded)
            return;
        this.navigationService.next(this.carouselService.settings.navSpeed);
    }
    /**
     * Handler for click event, attached to prev button
     * @return {?}
     */
    prev() {
        if (!this.carouselLoaded)
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
            <span [innerHTML]="dot.innerContent"
              [ngStyle]="{
                'overflow': dot.innerContent ? '' : 'hidden',
                'color': dot.innerContent ? '' : 'transparent'}"></span>
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
    { type: OwlLogger },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
CarouselComponent.propDecorators = {
    slides: [{ type: ContentChildren, args: [CarouselSlideDirective,] }],
    translated: [{ type: Output }],
    dragging: [{ type: Output }],
    change: [{ type: Output }],
    initialized: [{ type: Output }],
    options: [{ type: Input }],
    onVisibilityChange: [{ type: HostListener, args: ['document:visibilitychange', ['$event'],] }]
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
    CarouselComponent.prototype.docRef;
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
    /* Skipping unhandled member: ;*/
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW93bC1jYXJvdXNlbC1vLyIsInNvdXJjZXMiOlsibGliL2Nhcm91c2VsL2Nhcm91c2VsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFJVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxTQUFTLEVBQ1QsZUFBZSxFQUNmLFdBQVcsRUFDWCxVQUFVLEVBRVYsWUFBWSxFQUNaLFlBQVksRUFDWixNQUFNLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUE0QixLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFdkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzNELE9BQU8sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEUsT0FBTyxFQUFFLGVBQWUsRUFBdUIsTUFBTSw4QkFBOEIsQ0FBQztBQUlwRixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFekQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbkUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbkUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sa0NBQWtDLENB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LHdDQUFnQzs7SUFDaEMsbUNBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgT25Jbml0LFxyXG4gIEFmdGVyQ29udGVudENoZWNrZWQsXHJcbiAgT25EZXN0cm95LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBEaXJlY3RpdmUsXHJcbiAgUXVlcnlMaXN0LFxyXG4gIENvbnRlbnRDaGlsZHJlbixcclxuICBUZW1wbGF0ZVJlZixcclxuICBFbGVtZW50UmVmLFxyXG4gIEFmdGVyQ29udGVudEluaXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIEhvc3RMaXN0ZW5lcixcclxuICBJbmplY3RcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgT2JzZXJ2YWJsZSwgbWVyZ2UgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IFJlc2l6ZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9yZXNpemUuc2VydmljZSc7XHJcbmltcG9ydCB7IHRhcCwgZGVsYXksIGZpbHRlciwgc3dpdGNoTWFwLCBmaXJzdCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgQ2Fyb3VzZWxTZXJ2aWNlLCBDYXJvdXNlbEN1cnJlbnREYXRhIH0gZnJvbSAnLi4vc2VydmljZXMvY2Fyb3VzZWwuc2VydmljZSc7XHJcbmltcG9ydCB7IFN0YWdlRGF0YSB9IGZyb20gXCIuLi9tb2RlbHMvc3RhZ2UtZGF0YS5tb2RlbFwiO1xyXG5pbXBvcnQgeyBPd2xET01EYXRhIH0gZnJvbSBcIi4uL21vZGVscy9vd2xET00tZGF0YS5tb2RlbFwiO1xyXG5pbXBvcnQgeyBTbGlkZU1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL3NsaWRlLm1vZGVsJztcclxuaW1wb3J0IHsgT3dsT3B0aW9ucyB9IGZyb20gJy4uL21vZGVscy9vd2wtb3B0aW9ucy5tb2RlbCc7XHJcbmltcG9ydCB7IE5hdkRhdGEsIERvdHNEYXRhIH0gZnJvbSAnLi4vbW9kZWxzL25hdmlnYXRpb24tZGF0YS5tb2RlbHMnO1xyXG5pbXBvcnQgeyBOYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25hdmlnYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IEF1dG9wbGF5U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2F1dG9wbGF5LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBMYXp5TG9hZFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9sYXp5bG9hZC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQW5pbWF0ZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9hbmltYXRlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBdXRvSGVpZ2h0U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2F1dG9oZWlnaHQuc2VydmljZSc7XHJcbmltcG9ydCB7IEhhc2hTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvaGFzaC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgT3dsTG9nZ2VyIH0gZnJvbSAnLi4vc2VydmljZXMvbG9nZ2VyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJy4uL3NlcnZpY2VzL2RvY3VtZW50LXJlZi5zZXJ2aWNlJztcclxuXHJcbmxldCBuZXh0SWQgPSAwO1xyXG5cclxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnbmctdGVtcGxhdGVbY2Fyb3VzZWxTbGlkZV0nIH0pXHJcbmV4cG9ydCBjbGFzcyBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlIHtcclxuICAvKipcclxuICAgKiBVbmlxdWUgc2xpZGUgaWRlbnRpZmllci4gTXVzdCBiZSB1bmlxdWUgZm9yIHRoZSBlbnRpcmUgZG9jdW1lbnQgZm9yIHByb3BlciBhY2Nlc3NpYmlsaXR5IHN1cHBvcnQuXHJcbiAgICogV2lsbCBiZSBhdXRvLWdlbmVyYXRlZCBpZiBub3QgcHJvdmlkZWQuXHJcbiAgICovXHJcbiAgQElucHV0KCkgaWQgPSBgb3dsLXNsaWRlLSR7bmV4dElkKyt9YDtcclxuXHJcbiAgLyoqXHJcbiAgICogRGVmaW5lcyBob3cgbXVjaCB3aWR0aHMgb2YgY29tbW9uIHNsaWRlIHdpbGwgY3VycmVudCBzbGlkZSBoYXZlXHJcbiAgICogZS5nLiBpZiBfbWVyZ2VEYXRhPTIsIHRoZSBzbGlkZSB3aWxsIHR3aWNlIHdpZGVyIHRoZW4gc2xpZGVzIHdpdGggX21lcmdlRGF0YT0xXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZGF0YU1lcmdlID0gMTtcclxuICBASW5wdXQoKVxyXG4gIHNldCBkYXRhTWVyZ2UoZGF0YTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLl9kYXRhTWVyZ2UgPSB0aGlzLmlzTnVtZXJpYyhkYXRhKSA/IGRhdGEgOiAxO1xyXG4gIH07XHJcbiAgZ2V0IGRhdGFNZXJnZSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fZGF0YU1lcmdlIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2lkdGggb2Ygc2xpZGVcclxuICAgKi9cclxuICBASW5wdXQoKSB3aWR0aCA9IDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIElubmVyIGNvbnRlbnQgb2YgZG90IGZvciBjZXJ0YWluIHNsaWRlOyBjYW4gYmUgaHRtbC1tYXJrdXBcclxuICAgKi9cclxuICBASW5wdXQoKSBkb3RDb250ZW50ID0gJyc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhc2ggKGZyYWdtZW50KSBvZiB1cmwgd2hpY2ggY29ycmVzcG9uZHMgdG8gY2VydGFpbiBzbGlkZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRhdGFIYXNoID0gJyc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0cGxSZWY6IFRlbXBsYXRlUmVmPGFueT4pIHt9XHJcblxyXG4gIC8qKlxyXG5cdCAqIERldGVybWluZXMgaWYgdGhlIGlucHV0IGlzIGEgTnVtYmVyIG9yIHNvbWV0aGluZyB0aGF0IGNhbiBiZSBjb2VyY2VkIHRvIGEgTnVtYmVyXHJcblx0ICogQHBhcmFtIC0gVGhlIGlucHV0IHRvIGJlIHRlc3RlZFxyXG5cdCAqIEByZXR1cm5zIC0gQW4gaW5kaWNhdGlvbiBpZiB0aGUgaW5wdXQgaXMgYSBOdW1iZXIgb3IgY2FuIGJlIGNvZXJjZWQgdG8gYSBOdW1iZXJcclxuXHQgKi9cclxuICBpc051bWVyaWMobnVtYmVyOiBhbnkpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiAhaXNOYU4ocGFyc2VGbG9hdChudW1iZXIpKTtcclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEYXRhIHdoaWNoIHdpbGwgYmUgcGFzc2VkIG91dCBhZnRlciBlbmRpbmcgb2YgdHJhbnNpdGlvbiBvZiBjYXJvdXNlbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNsaWRlc091dHB1dERhdGEge1xyXG4gIHN0YXJ0UG9zaXRpb24/OiBudW1iZXI7XHJcbiAgc2xpZGVzPzogU2xpZGVNb2RlbFtdO1xyXG59O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdvd2wtY2Fyb3VzZWwtbycsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgY2xhc3M9XCJvd2wtY2Fyb3VzZWwgb3dsLXRoZW1lXCIgI293bENhcm91c2VsXHJcbiAgICAgIFtuZ0NsYXNzXT1cInsnb3dsLXJ0bCc6IG93bERPTURhdGE/LnJ0bCxcclxuICAgICAgICAgICAgICAgICAgJ293bC1sb2FkZWQnOiBvd2xET01EYXRhPy5pc0xvYWRlZCxcclxuICAgICAgICAgICAgICAgICAgJ293bC1yZXNwb25zaXZlJzogb3dsRE9NRGF0YT8uaXNSZXNwb25zaXZlLFxyXG4gICAgICAgICAgICAgICAgICAnb3dsLWRyYWcnOiBvd2xET01EYXRhPy5pc01vdXNlRHJhZ2FibGUsXHJcbiAgICAgICAgICAgICAgICAgICdvd2wtZ3JhYic6IG93bERPTURhdGE/LmlzR3JhYn1cIlxyXG4gICAgICAobW91c2VvdmVyKT1cInN0YXJ0UGF1c2luZygpXCJcclxuICAgICAgKG1vdXNlbGVhdmUpPVwic3RhcnRQbGF5TUwoKVwiXHJcbiAgICAgICh0b3VjaHN0YXJ0KT1cInN0YXJ0UGF1c2luZygpXCJcclxuICAgICAgKHRvdWNoZW5kKT1cInN0YXJ0UGxheVRFKClcIj5cclxuXHJcbiAgICAgIDxkaXYgKm5nSWY9XCJjYXJvdXNlbExvYWRlZFwiIGNsYXNzPVwib3dsLXN0YWdlLW91dGVyXCI+XHJcbiAgICAgICAgPG93bC1zdGFnZSBbb3dsRHJhZ2dhYmxlXT1cInsnaXNNb3VzZURyYWdhYmxlJzogb3dsRE9NRGF0YT8uaXNNb3VzZURyYWdhYmxlLCAnaXNUb3VjaERyYWdhYmxlJzogb3dsRE9NRGF0YT8uaXNUb3VjaERyYWdhYmxlfVwiXHJcbiAgICAgICAgICAgICAgICAgICAgW3N0YWdlRGF0YV09XCJzdGFnZURhdGFcIlxyXG4gICAgICAgICAgICAgICAgICAgIFtzbGlkZXNEYXRhXT1cInNsaWRlc0RhdGFcIj48L293bC1zdGFnZT5cclxuICAgICAgPC9kaXY+IDwhLS0gLy5vd2wtc3RhZ2Utb3V0ZXIgLS0+XHJcbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJzbGlkZXMudG9BcnJheSgpLmxlbmd0aFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJvd2wtbmF2XCIgW25nQ2xhc3NdPVwieydkaXNhYmxlZCc6IG5hdkRhdGE/LmRpc2FibGVkfVwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm93bC1wcmV2XCIgW25nQ2xhc3NdPVwieydkaXNhYmxlZCc6IG5hdkRhdGE/LnByZXY/LmRpc2FibGVkfVwiIChjbGljayk9XCJwcmV2KClcIiBbaW5uZXJIVE1MXT1cIm5hdkRhdGE/LnByZXY/Lmh0bWxUZXh0XCI+PC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwib3dsLW5leHRcIiBbbmdDbGFzc109XCJ7J2Rpc2FibGVkJzogbmF2RGF0YT8ubmV4dD8uZGlzYWJsZWR9XCIgKGNsaWNrKT1cIm5leHQoKVwiIFtpbm5lckhUTUxdPVwibmF2RGF0YT8ubmV4dD8uaHRtbFRleHRcIj48L2Rpdj5cclxuICAgICAgICA8L2Rpdj4gPCEtLSAvLm93bC1uYXYgLS0+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm93bC1kb3RzXCIgW25nQ2xhc3NdPVwieydkaXNhYmxlZCc6IGRvdHNEYXRhPy5kaXNhYmxlZH1cIj5cclxuICAgICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGRvdCBvZiBkb3RzRGF0YT8uZG90c1wiIGNsYXNzPVwib3dsLWRvdFwiIFtuZ0NsYXNzXT1cInsnYWN0aXZlJzogZG90LmFjdGl2ZSwgJ293bC1kb3QtdGV4dCc6IGRvdC5zaG93SW5uZXJDb250ZW50fVwiIChjbGljayk9XCJtb3ZlQnlEb3QoZG90LmlkKVwiPlxyXG4gICAgICAgICAgICA8c3BhbiBbaW5uZXJIVE1MXT1cImRvdC5pbm5lckNvbnRlbnRcIlxyXG4gICAgICAgICAgICAgIFtuZ1N0eWxlXT1cIntcclxuICAgICAgICAgICAgICAgICdvdmVyZmxvdyc6IGRvdC5pbm5lckNvbnRlbnQgPyAnJyA6ICdoaWRkZW4nLFxyXG4gICAgICAgICAgICAgICAgJ2NvbG9yJzogZG90LmlubmVyQ29udGVudCA/ICcnIDogJ3RyYW5zcGFyZW50J31cIj48L3NwYW4+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj4gPCEtLSAvLm93bC1kb3RzIC0tPlxyXG4gICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgIDwvZGl2PiA8IS0tIC8ub3dsLWNhcm91c2VsIG93bC1sb2FkZWQgLS0+XHJcbiAgYCxcclxuICBzdHlsZXM6IFtgLm93bC10aGVtZSB7IGRpc3BsYXk6IGJsb2NrOyB9YF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBOYXZpZ2F0aW9uU2VydmljZSxcclxuICAgIEF1dG9wbGF5U2VydmljZSxcclxuICAgIENhcm91c2VsU2VydmljZSxcclxuICAgIExhenlMb2FkU2VydmljZSxcclxuICAgIEFuaW1hdGVTZXJ2aWNlLFxyXG4gICAgQXV0b0hlaWdodFNlcnZpY2UsXHJcbiAgICBIYXNoU2VydmljZVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIENhcm91c2VsQ29tcG9uZW50XHJcbiAgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudENoZWNrZWQsIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XHJcbiAgQENvbnRlbnRDaGlsZHJlbihDYXJvdXNlbFNsaWRlRGlyZWN0aXZlKVxyXG4gIHNsaWRlczogUXVlcnlMaXN0PENhcm91c2VsU2xpZGVEaXJlY3RpdmU+O1xyXG5cclxuICBAT3V0cHV0KCkgdHJhbnNsYXRlZCA9IG5ldyBFdmVudEVtaXR0ZXI8U2xpZGVzT3V0cHV0RGF0YT4oKTtcclxuICBAT3V0cHV0KCkgZHJhZ2dpbmcgPSBuZXcgRXZlbnRFbWl0dGVyPHtkcmFnZ2luZzogYm9vbGVhbiwgZGF0YTogU2xpZGVzT3V0cHV0RGF0YX0+KCk7XHJcbiAgQE91dHB1dCgpIGNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8U2xpZGVzT3V0cHV0RGF0YT4oKTtcclxuICBAT3V0cHV0KCkgaW5pdGlhbGl6ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFNsaWRlc091dHB1dERhdGE+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdpZHRoIG9mIGNhcm91c2VsIHdpbmRvdyAodGFnIHdpdGggY2xhc3MgLm93bC1jYXJvdXNlbCksIGluIHdpY2ggd2UgY2FuIHNlZSBtb3Zpbmcgc2xpZGVyc1xyXG4gICAqL1xyXG4gIGNhcm91c2VsV2luZG93V2lkdGg6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaXB0aW9uIHRvICdyZXNpemUnIGV2ZW50XHJcbiAgICovXHJcbiAgcmVzaXplU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlwdGlvbiBtZXJnZSBPYnNlcnZhYmxlLCB3aGljaCBtZXJnZXMgYWxsIE9ic2VydmFibGVzIGluIHRoZSBjb21wb25lbnQgZXhjZXB0ICdyZXNpemUnIE9ic2VydmFibGUgYW5kIHRoaXMuc2xpZGVzLmNoYW5nZXMoKVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2FsbE9ic2VydlN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gdG8gYHRoaXMuc2xpZGVzLmNoYW5nZXMoKS5cclxuICAgKiBJdCBjb3VsZCBiZSBpbmNsdWRlZCBpbiAndGhpcy5fYWxsT2JzZXJ2U3Vic2NyaXB0aW9uJywgYnV0IHRoYXQgc3ViY3JpcHRpb24gZ2V0IGNyZWF0ZWQgZHVyaW5nIHRoZSBpbml0aWFsaXppbmcgb2YgY29tcG9uZW50XHJcbiAgICogYW5kICd0aGlzLnNsaWRlcycgYXJlIHVuZGVmaW5lZCBhdCB0aGF0IG1vbWVudC4gU28gaXQncyBuZWVkZWQgdG8gd2FpdCBmb3IgaW5pdGlhbGl6YXRpb24gb2YgY29udGVudC5cclxuICAgKi9cclxuICBwcml2YXRlIF9zbGlkZXNDaGFuZ2VzU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIEN1cnJlbnQgc2V0dGluZ3MgZm9yIHRoZSBjYXJvdXNlbC5cclxuICAgKi9cclxuICBvd2xET01EYXRhOiBPd2xET01EYXRhO1xyXG5cclxuICAvKipcclxuICAgKiBEYXRhIG9mIG93bC1zdGFnZVxyXG4gICAqL1xyXG5cdHN0YWdlRGF0YTogU3RhZ2VEYXRhO1xyXG5cclxuXHQvKipcclxuXHQgKiAgRGF0YSBvZiBldmVyeSBzbGlkZVxyXG5cdCAqL1xyXG4gIHNsaWRlc0RhdGE6IFNsaWRlTW9kZWxbXSA9IFtdO1xyXG5cclxuICAvKipcclxuXHQgKiBEYXRhIG9mIG5hdmlnYXRpb24gYmxvY2tcclxuXHQgKi9cclxuXHRuYXZEYXRhOiBOYXZEYXRhO1xyXG5cclxuXHQvKipcclxuXHQgKiBEYXRhIG9mIGRvdHMgYmxvY2tcclxuXHQgKi9cclxuICBkb3RzRGF0YTogRG90c0RhdGE7XHJcblxyXG4gIC8qKlxyXG4gICAqIERhdGEsIHdpY2ggYXJlIHBhc3NlZCBvdXQgb2YgY2Fyb3VzZWwgYWZ0ZXIgZW5kaW5nIG9mIHRyYW5zaW9uaW5nIG9mIGNhcm91c2VsXHJcbiAgICovXHJcbiAgc2xpZGVzT3V0cHV0RGF0YTogU2xpZGVzT3V0cHV0RGF0YTtcclxuXHJcbiAgLyoqXHJcbiAgICogU2hvd3Mgd2hldGhlciBjYXJvdXNlbCBpcyBsb2FkZWQgb2Ygbm90LlxyXG4gICAqL1xyXG4gIGNhcm91c2VsTG9hZGVkID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZXIncyBvcHRpb25zXHJcbiAgICovXHJcbiAgQElucHV0KCkgb3B0aW9uczogT3dsT3B0aW9ucztcclxuXHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2YWJsZSBmb3IgZ2V0dGluZyBjdXJyZW50IFZpZXcgU2V0dGluZ3NcclxuICAgKi9cclxuICBwcml2YXRlIF92aWV3Q3VyU2V0dGluZ3MkOiBPYnNlcnZhYmxlPENhcm91c2VsQ3VycmVudERhdGE+O1xyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZhYmxlIGZvciBjYXRjaGluZyB0aGUgZW5kIG9mIHRyYW5zaXRpb24gb2YgY2Fyb3VzZWxcclxuICAgKi9cclxuICBwcml2YXRlIF90cmFuc2xhdGVkQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz47XHJcblxyXG4gIC8qKlxyXG4gICAqIE9ic2VydmFibGUgZm9yIGNhdGNoaW5nIHRoZSBzdGFydCBvZiBkcmFnZ2luZyBvZiB0aGUgY2Fyb3VzZWxcclxuICAgKi9cclxuICBwcml2YXRlIF9kcmFnZ2luZ0Nhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+O1xyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZhYmxlIGZvciBjYXRjaGluZyB0aGUgc3RhcnQgb2YgY2hhbmdpbmcgb2YgdGhlIGNhcm91c2VsXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfY2hhbmdlQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz47XHJcblxyXG4gIC8qKlxyXG4gICAqIE9ic2VydmFibGUgZm9yIGNhdGNoaW5nIHRoZSBpbml0aWFsaXphdGlvbiBvZiBjaGFuZ2luZyB0aGUgY2Fyb3VzZWxcclxuICAgKi9cclxuICBwcml2YXRlIF9pbml0aWFsaXplZENhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+O1xyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZhYmxlIGZvciBtZXJnaW5nIGFsbCBPYnNlcnZhYmxlcyBhbmQgY3JlYXRpbmcgb25lIHN1YnNjcmlwdGlvblxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2Nhcm91c2VsTWVyZ2UkOiBPYnNlcnZhYmxlPENhcm91c2VsQ3VycmVudERhdGEgfCBzdHJpbmc+O1xyXG4gIHByaXZhdGUgZG9jUmVmOiBEb2N1bWVudDtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxyXG4gICAgcHJpdmF0ZSByZXNpemVTZXJ2aWNlOiBSZXNpemVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjYXJvdXNlbFNlcnZpY2U6IENhcm91c2VsU2VydmljZSxcclxuICAgIHByaXZhdGUgbmF2aWdhdGlvblNlcnZpY2U6IE5hdmlnYXRpb25TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBhdXRvcGxheVNlcnZpY2U6IEF1dG9wbGF5U2VydmljZSxcclxuICAgIHByaXZhdGUgbGF6eUxvYWRTZXJ2aWNlOiBMYXp5TG9hZFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGFuaW1hdGVTZXJ2aWNlOiBBbmltYXRlU2VydmljZSxcclxuICAgIHByaXZhdGUgYXV0b0hlaWdodFNlcnZpY2U6IEF1dG9IZWlnaHRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBoYXNoU2VydmljZTogSGFzaFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGxvZ2dlcjogT3dsTG9nZ2VyLFxyXG4gICAgQEluamVjdChET0NVTUVOVCkgZG9jUmVmOiBhbnlcclxuICApIHtcclxuICAgIHRoaXMuZG9jUmVmID0gZG9jUmVmIGFzIERvY3VtZW50O1xyXG5cclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OnZpc2liaWxpdHljaGFuZ2UnLCBbJyRldmVudCddKVxyXG4gIG9uVmlzaWJpbGl0eUNoYW5nZShldjogRXZlbnQpIHtcclxuICAgIHN3aXRjaCAodGhpcy5kb2NSZWYudmlzaWJpbGl0eVN0YXRlKSB7XHJcbiAgICAgIGNhc2UgJ3Zpc2libGUnOlxyXG4gICAgICAgIHRoaXMuc3RhcnRQbGF5TUwoKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgJ2hpZGRlbic6XHJcbiAgICAgICAgdGhpcy5zdGFydFBhdXNpbmcoKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5zcHlEYXRhU3RyZWFtcygpO1xyXG5cclxuICAgIHRoaXMuY2Fyb3VzZWxXaW5kb3dXaWR0aCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICAnLm93bC1jYXJvdXNlbCdcclxuICAgICkuY2xpZW50V2lkdGg7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XHJcbiAgfVxyXG4gIC8vIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIEVORFxyXG5cclxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcbiAgICBpZiAodGhpcy5zbGlkZXMudG9BcnJheSgpLmxlbmd0aCkge1xyXG4gICAgICB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR1cCh0aGlzLmNhcm91c2VsV2luZG93V2lkdGgsIHRoaXMuc2xpZGVzLnRvQXJyYXkoKSwgdGhpcy5vcHRpb25zKTtcclxuICAgICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UuaW5pdGlhbGl6ZSh0aGlzLnNsaWRlcy50b0FycmF5KCkpO1xyXG5cclxuICAgICAgdGhpcy5fd2luUmVzaXplV2F0Y2hlcigpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5sb2dnZXIubG9nKGBUaGVyZSBhcmUgbm8gc2xpZGVzIHRvIHNob3cuIFNvIHRoZSBjYXJvdXNlbCB3b24ndCBiZSByZW5kZXJlZGApO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX3NsaWRlc0NoYW5nZXNTdWJzY3JpcHRpb24gPSB0aGlzLnNsaWRlcy5jaGFuZ2VzLnBpcGUoXHJcbiAgICAgIHRhcCgoc2xpZGVzKSA9PiB7XHJcbiAgICAgICAgaWYgKHNsaWRlcy50b0FycmF5KCkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAvLyB0aGlzLmNhcm91c2VsU2VydmljZS5zZXRJdGVtcyhzbGlkZXMudG9BcnJheSgpKTtcclxuICAgICAgICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHVwKHRoaXMuY2Fyb3VzZWxXaW5kb3dXaWR0aCwgc2xpZGVzLnRvQXJyYXkoKSwgdGhpcy5vcHRpb25zKTtcclxuICAgICAgICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmluaXRpYWxpemUoc2xpZGVzLnRvQXJyYXkoKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuY2Fyb3VzZWxMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhgVGhlcmUgYXJlIG5vIHNsaWRlcyB0byBzaG93LiBTbyB0aGUgY2Fyb3VzZWwgd29uJ3QgYmUgcmUtcmVuZGVyZWRgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICApLnN1YnNjcmliZSgoKT0+e30pO1xyXG5cclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgaWYgKHRoaXMucmVzaXplU3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgIHRoaXMucmVzaXplU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fc2xpZGVzQ2hhbmdlc1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG5cclxuICAgIHRoaXMuX2FsbE9ic2VydlN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSm9pbnMgdGhlIG9ic2VydmFibGUgbG9naW4gaW4gb25lIHBsYWNlOiBzZXRzIHZhbHVlcyB0byBzb21lIG9ic2VydmFibGVzLCBtZXJnZXMgdGhpcyBvYnNlcnZhYmxlcyBhbmRcclxuICAgKiBzdWJjcmliZXMgdG8gbWVyZ2UgZnVuY1xyXG4gICAqL1xyXG4gIHNweURhdGFTdHJlYW1zKCkge1xyXG4gICAgdGhpcy5fdmlld0N1clNldHRpbmdzJCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldFZpZXdDdXJTZXR0aW5ncygpLnBpcGUoXHJcbiAgICAgIHRhcChkYXRhID0+IHtcclxuICAgICAgICB0aGlzLm93bERPTURhdGEgPSBkYXRhLm93bERPTURhdGE7XHJcbiAgICAgICAgdGhpcy5zdGFnZURhdGEgPSBkYXRhLnN0YWdlRGF0YTtcclxuICAgICAgICB0aGlzLnNsaWRlc0RhdGEgPSBkYXRhLnNsaWRlc0RhdGE7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNhcm91c2VsTG9hZGVkKSB7XHJcbiAgICAgICAgICB0aGlzLmNhcm91c2VsTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5uYXZEYXRhID0gZGF0YS5uYXZEYXRhO1xyXG4gICAgICAgIHRoaXMuZG90c0RhdGEgPSBkYXRhLmRvdHNEYXRhO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLl9pbml0aWFsaXplZENhcm91c2VsJCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldEluaXRpYWxpemVkU3RhdGUoKS5waXBlKFxyXG4gICAgICB0YXAoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZ2F0aGVyVHJhbnNsYXRlZERhdGEoKTtcclxuICAgICAgICB0aGlzLmluaXRpYWxpemVkLmVtaXQodGhpcy5zbGlkZXNPdXRwdXREYXRhKTtcclxuICAgICAgICAvLyB0aGlzLnNsaWRlc091dHB1dERhdGEgPSB7fTtcclxuICAgICAgfSlcclxuICAgIClcclxuXHJcbiAgICB0aGlzLl90cmFuc2xhdGVkQ2Fyb3VzZWwkID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0VHJhbnNsYXRlZFN0YXRlKCkucGlwZShcclxuICAgICAgdGFwKCgpID0+IHtcclxuICAgICAgICB0aGlzLmdhdGhlclRyYW5zbGF0ZWREYXRhKCk7XHJcbiAgICAgICAgdGhpcy50cmFuc2xhdGVkLmVtaXQodGhpcy5zbGlkZXNPdXRwdXREYXRhKTtcclxuICAgICAgICAvLyB0aGlzLnNsaWRlc091dHB1dERhdGEgPSB7fTtcclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5fY2hhbmdlQ2Fyb3VzZWwkID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0Q2hhbmdlU3RhdGUoKS5waXBlKFxyXG4gICAgICB0YXAoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZ2F0aGVyVHJhbnNsYXRlZERhdGEoKTtcclxuICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMuc2xpZGVzT3V0cHV0RGF0YSk7XHJcbiAgICAgICAgLy8gdGhpcy5zbGlkZXNPdXRwdXREYXRhID0ge307XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuX2RyYWdnaW5nQ2Fyb3VzZWwkID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0RHJhZ1N0YXRlKCkucGlwZShcclxuICAgICAgdGFwKCgpID0+IHtcclxuICAgICAgICB0aGlzLmdhdGhlclRyYW5zbGF0ZWREYXRhKCk7XHJcbiAgICAgICAgdGhpcy5kcmFnZ2luZy5lbWl0KHtkcmFnZ2luZzogdHJ1ZSwgZGF0YTogdGhpcy5zbGlkZXNPdXRwdXREYXRhfSk7XHJcbiAgICAgIH0pLFxyXG4gICAgICBzd2l0Y2hNYXAoXHJcbiAgICAgICAgKCkgPT4gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0VHJhbnNsYXRlZFN0YXRlKCkucGlwZShcclxuICAgICAgICAgIGZpcnN0KCksXHJcbiAgICAgICAgICB0YXAoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmRyYWdnaW5nLmVtaXQoe2RyYWdnaW5nOiBmYWxzZSwgZGF0YTogdGhpcy5zbGlkZXNPdXRwdXREYXRhfSk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIClcclxuICAgICAgKVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLl9jYXJvdXNlbE1lcmdlJCA9IG1lcmdlKHRoaXMuX3ZpZXdDdXJTZXR0aW5ncyQsIHRoaXMuX3RyYW5zbGF0ZWRDYXJvdXNlbCQsIHRoaXMuX2RyYWdnaW5nQ2Fyb3VzZWwkLCB0aGlzLl9jaGFuZ2VDYXJvdXNlbCQsIHRoaXMuX2luaXRpYWxpemVkQ2Fyb3VzZWwkKTtcclxuICAgIHRoaXMuX2FsbE9ic2VydlN1YnNjcmlwdGlvbiA9IHRoaXMuX2Nhcm91c2VsTWVyZ2UkLnN1YnNjcmliZSgoKSA9PiB7fSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbml0IHN1YnNjcmlwdGlvbiB0byByZXNpemUgZXZlbnQgYW5kIGF0dGFjaGVzIGhhbmRsZXIgZm9yIHRoaXMgZXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIF93aW5SZXNpemVXYXRjaGVyKCkge1xyXG4gICAgaWYgKE9iamVjdC5rZXlzKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLl9vcHRpb25zLnJlc3BvbnNpdmUpLmxlbmd0aCkge1xyXG4gICAgICB0aGlzLnJlc2l6ZVN1YnNjcmlwdGlvbiA9IHRoaXMucmVzaXplU2VydmljZS5vblJlc2l6ZSRcclxuICAgICAgICAucGlwZShcclxuICAgICAgICAgIGZpbHRlcigoKSA9PiB0aGlzLmNhcm91c2VsV2luZG93V2lkdGggIT09IHRoaXMuZWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcub3dsLWNhcm91c2VsJykuY2xpZW50V2lkdGgpLFxyXG4gICAgICAgICAgZGVsYXkodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MucmVzcG9uc2l2ZVJlZnJlc2hSYXRlKVxyXG4gICAgICAgIClcclxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm9uUmVzaXplKHRoaXMuZWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcub3dsLWNhcm91c2VsJykuY2xpZW50V2lkdGgpO1xyXG4gICAgICAgICAgdGhpcy5jYXJvdXNlbFdpbmRvd1dpZHRoID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vd2wtY2Fyb3VzZWwnKS5jbGllbnRXaWR0aDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhbmRsZXIgZm9yIHRyYW5zaXRpb2VuZCBldmVudFxyXG4gICAqL1xyXG4gIG9uVHJhbnNpdGlvbkVuZCgpIHtcclxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm9uVHJhbnNpdGlvbkVuZCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlciBmb3IgY2xpY2sgZXZlbnQsIGF0dGFjaGVkIHRvIG5leHQgYnV0dG9uXHJcbiAgICovXHJcbiAgbmV4dCgpIHtcclxuICAgIGlmICghdGhpcy5jYXJvdXNlbExvYWRlZCkgcmV0dXJuO1xyXG4gICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5uZXh0KHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLm5hdlNwZWVkKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhbmRsZXIgZm9yIGNsaWNrIGV2ZW50LCBhdHRhY2hlZCB0byBwcmV2IGJ1dHRvblxyXG4gICAqL1xyXG4gIHByZXYoKSB7XHJcbiAgICBpZiAoIXRoaXMuY2Fyb3VzZWxMb2FkZWQpIHJldHVybjtcclxuICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UucHJldih0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5uYXZTcGVlZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGVyIGZvciBjbGljayBldmVudCwgYXR0YWNoZWQgdG8gZG90c1xyXG4gICAqL1xyXG4gIG1vdmVCeURvdChkb3RJZDogc3RyaW5nKSB7XHJcbiAgICBpZiAoIXRoaXMuY2Fyb3VzZWxMb2FkZWQpIHJldHVybjtcclxuICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UubW92ZUJ5RG90KGRvdElkKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHJld2luZHMgY2Fyb3VzZWwgdG8gc2xpZGUgd2l0aCBuZWVkZWQgaWRcclxuICAgKiBAcGFyYW0gaWQgZnJhZ21lbnQgb2YgdXJsXHJcbiAgICovXHJcbiAgdG8oaWQ6IHN0cmluZykge1xyXG4gICAgLy8gaWYgKCF0aGlzLmNhcm91c2VsTG9hZGVkIHx8ICgodGhpcy5uYXZEYXRhICYmIHRoaXMubmF2RGF0YS5kaXNhYmxlZCkgJiYgKHRoaXMuZG90c0RhdGEgJiYgdGhpcy5kb3RzRGF0YS5kaXNhYmxlZCkpKSByZXR1cm47XHJcbiAgICBpZiAoIXRoaXMuY2Fyb3VzZWxMb2FkZWQpIHJldHVybjtcclxuICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UudG9TbGlkZUJ5SWQoaWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2F0aGVycyBhbmQgcHJlcGFyZXMgZGF0YSBpbnRlbmRlZCBmb3IgcGFzc2luZyB0byB0aGUgdXNlciBieSBtZWFucyBvZiBmaXJpbmcgZXZlbnQgdHJhbnNsYXRlZENhcm91c2VsXHJcbiAgICovXHJcbiAgZ2F0aGVyVHJhbnNsYXRlZERhdGEoKSB7XHJcbiAgICBsZXQgc3RhcnRQb3NpdGlvbjogbnVtYmVyO1xyXG4gICAgY29uc3QgY2xvbmVkSWRQcmVmaXggPSB0aGlzLmNhcm91c2VsU2VydmljZS5jbG9uZWRJZFByZWZpeDtcclxuICAgIGNvbnN0IGFjdGl2ZVNsaWRlczogU2xpZGVNb2RlbFtdID0gdGhpcy5zbGlkZXNEYXRhXHJcbiAgICAgIC5maWx0ZXIoc2xpZGUgPT4gc2xpZGUuaXNBY3RpdmUgPT09IHRydWUpXHJcbiAgICAgIC5tYXAoc2xpZGUgPT4ge1xyXG4gICAgICAgIGNvbnN0IGlkID0gc2xpZGUuaWQuaW5kZXhPZihjbG9uZWRJZFByZWZpeCkgPj0gMCA/IHNsaWRlLmlkLnNsaWNlKGNsb25lZElkUHJlZml4Lmxlbmd0aCkgOiBzbGlkZS5pZDtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgaWQ6IGlkLFxyXG4gICAgICAgICAgd2lkdGg6IHNsaWRlLndpZHRoLFxyXG4gICAgICAgICAgbWFyZ2luTDogc2xpZGUubWFyZ2luTCxcclxuICAgICAgICAgIG1hcmdpblI6IHNsaWRlLm1hcmdpblIsXHJcbiAgICAgICAgICBjZW50ZXI6IHNsaWRlLmlzQ2VudGVyZWRcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgc3RhcnRQb3NpdGlvbiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnJlbGF0aXZlKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmN1cnJlbnQoKSk7XHJcbiAgICB0aGlzLnNsaWRlc091dHB1dERhdGEgPSB7XHJcbiAgICAgIHN0YXJ0UG9zaXRpb246IHN0YXJ0UG9zaXRpb24sXHJcbiAgICAgIHNsaWRlczogYWN0aXZlU2xpZGVzXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdGFydHMgcGF1c2luZ1xyXG4gICAqL1xyXG4gIHN0YXJ0UGF1c2luZygpIHtcclxuICAgIHRoaXMuYXV0b3BsYXlTZXJ2aWNlLnN0YXJ0UGF1c2luZygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnRzIHBsYXlpbmcgYWZ0ZXIgbW91c2UgbGVhdmVzIGNhcm91c2VsXHJcbiAgICovXHJcbiAgc3RhcnRQbGF5TUwoKSB7XHJcbiAgICB0aGlzLmF1dG9wbGF5U2VydmljZS5zdGFydFBsYXlpbmdNb3VzZUxlYXZlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdGFydHMgcGxheWluZyBhZnRlciB0b3VjaCBlbmRzXHJcbiAgICovXHJcbiAgc3RhcnRQbGF5VEUoKSB7XHJcbiAgICB0aGlzLmF1dG9wbGF5U2VydmljZS5zdGFydFBsYXlpbmdUb3VjaEVuZCgpO1xyXG4gIH1cclxuXHJcbn1cclxuIl19