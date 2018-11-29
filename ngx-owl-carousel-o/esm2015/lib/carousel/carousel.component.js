/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
        this._translatedCarousel$ = this.carouselService.getTranslatedState().pipe(tap(() => {
            this.gatherTranslatedData();
            this.translated.emit(this.slidesOutputData);
            this.slidesOutputData = {};
        }));
        this._draggingCarousel$ = this.carouselService.getDragState().pipe(tap(() => {
            this.dragging.emit(true);
        }), switchMap(() => this.carouselService.getTranslatedState().pipe(first(), tap(() => {
            this.dragging.emit(false);
        }))));
        this._carouselMerge$ = merge(this._viewCurSettings$, this._translatedCarousel$, this._draggingCarousel$);
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
    options: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    CarouselComponent.prototype.slides;
    /** @type {?} */
    CarouselComponent.prototype.translated;
    /** @type {?} */
    CarouselComponent.prototype.dragging;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW93bC1jYXJvdXNlbC1vLyIsInNvdXJjZXMiOlsibGliL2Nhcm91c2VsL2Nhcm91c2VsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFJVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxTQUFTLEVBQ1QsZUFBZSxFQUNmLFdBQVcsRUFDWCxVQUFVLEVBRVYsWUFBWSxFQUNiLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBNEIsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXZELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxlQUFlLEVBQXVCLE1BQU0sOEJBQThCLENBQUM7QUFJcEYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRXpELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7O0FBRXZELElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztBQUdmLE1BQU07Ozs7SUFpQ0osWUFBbUIsTUFB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LGlCQUFpQjtZQUNqQixXQUFXO1lBQ1gsU0FBUzs7O3FCQXVHZixlQUFlLFNBQUMsc0JBQXNCO3lCQUd0QyxNQUFNO3VCQUNOLE1BQU07c0JBOEROLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBPbkluaXQsXHJcbiAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIERpcmVjdGl2ZSxcclxuICBRdWVyeUxpc3QsXHJcbiAgQ29udGVudENoaWxkcmVuLFxyXG4gIFRlbXBsYXRlUmVmLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgQWZ0ZXJDb250ZW50SW5pdCxcclxuICBFdmVudEVtaXR0ZXJcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgT2JzZXJ2YWJsZSwgbWVyZ2UgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IFJlc2l6ZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9yZXNpemUuc2VydmljZSc7XHJcbmltcG9ydCB7IHRhcCwgZGVsYXksIGZpbHRlciwgc3dpdGNoTWFwLCBmaXJzdCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgQ2Fyb3VzZWxTZXJ2aWNlLCBDYXJvdXNlbEN1cnJlbnREYXRhIH0gZnJvbSAnLi4vc2VydmljZXMvY2Fyb3VzZWwuc2VydmljZSc7XHJcbmltcG9ydCB7IFN0YWdlRGF0YSB9IGZyb20gXCIuLi9tb2RlbHMvc3RhZ2UtZGF0YS5tb2RlbFwiO1xyXG5pbXBvcnQgeyBPd2xET01EYXRhIH0gZnJvbSBcIi4uL21vZGVscy9vd2xET00tZGF0YS5tb2RlbFwiO1xyXG5pbXBvcnQgeyBTbGlkZU1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL3NsaWRlLm1vZGVsJztcclxuaW1wb3J0IHsgT3dsT3B0aW9ucyB9IGZyb20gJy4uL21vZGVscy9vd2wtb3B0aW9ucy5tb2RlbCc7XHJcbmltcG9ydCB7IE5hdkRhdGEsIERvdHNEYXRhIH0gZnJvbSAnLi4vbW9kZWxzL25hdmlnYXRpb24tZGF0YS5tb2RlbHMnO1xyXG5pbXBvcnQgeyBOYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25hdmlnYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IEF1dG9wbGF5U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2F1dG9wbGF5LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBMYXp5TG9hZFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9sYXp5bG9hZC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQW5pbWF0ZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9hbmltYXRlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBdXRvSGVpZ2h0U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2F1dG9oZWlnaHQuc2VydmljZSc7XHJcbmltcG9ydCB7IEhhc2hTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvaGFzaC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgT3dsTG9nZ2VyIH0gZnJvbSAnLi4vc2VydmljZXMvbG9nZ2VyLnNlcnZpY2UnO1xyXG5cclxubGV0IG5leHRJZCA9IDA7XHJcblxyXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICduZy10ZW1wbGF0ZVtjYXJvdXNlbFNsaWRlXScgfSlcclxuZXhwb3J0IGNsYXNzIENhcm91c2VsU2xpZGVEaXJlY3RpdmUge1xyXG4gIC8qKlxyXG4gICAqIFVuaXF1ZSBzbGlkZSBpZGVudGlmaWVyLiBNdXN0IGJlIHVuaXF1ZSBmb3IgdGhlIGVudGlyZSBkb2N1bWVudCBmb3IgcHJvcGVyIGFjY2Vzc2liaWxpdHkgc3VwcG9ydC5cclxuICAgKiBXaWxsIGJlIGF1dG8tZ2VuZXJhdGVkIGlmIG5vdCBwcm92aWRlZC5cclxuICAgKi9cclxuICBASW5wdXQoKSBpZCA9IGBvd2wtc2xpZGUtJHtuZXh0SWQrK31gO1xyXG5cclxuICAvKipcclxuICAgKiBEZWZpbmVzIGhvdyBtdWNoIHdpZHRocyBvZiBjb21tb24gc2xpZGUgd2lsbCBjdXJyZW50IHNsaWRlIGhhdmVcclxuICAgKiBlLmcuIGlmIF9tZXJnZURhdGE9MiwgdGhlIHNsaWRlIHdpbGwgdHdpY2Ugd2lkZXIgdGhlbiBzbGlkZXMgd2l0aCBfbWVyZ2VEYXRhPTFcclxuICAgKi9cclxuICBwcml2YXRlIF9kYXRhTWVyZ2UgPSAxO1xyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IGRhdGFNZXJnZShkYXRhOiBudW1iZXIpIHtcclxuICAgIHRoaXMuX2RhdGFNZXJnZSA9IHRoaXMuaXNOdW1lcmljKGRhdGEpID8gZGF0YSA6IDE7XHJcbiAgfTtcclxuICBnZXQgZGF0YU1lcmdlKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9kYXRhTWVyZ2UgfVxyXG5cclxuICAvKipcclxuICAgKiBXaWR0aCBvZiBzbGlkZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHdpZHRoID0gMDtcclxuXHJcbiAgLyoqXHJcbiAgICogSW5uZXIgY29udGVudCBvZiBkb3QgZm9yIGNlcnRhaW4gc2xpZGU7IGNhbiBiZSBodG1sLW1hcmt1cFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRvdENvbnRlbnQgPSAnJztcclxuXHJcbiAgLyoqXHJcbiAgICogSGFzaCAoZnJhZ21lbnQpIG9mIHVybCB3aGljaCBjb3JyZXNwb25kcyB0byBjZXJ0YWluIHNsaWRlXHJcbiAgICovXHJcbiAgQElucHV0KCkgZGF0YUhhc2ggPSAnJztcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIHRwbFJlZjogVGVtcGxhdGVSZWY8YW55Pikge31cclxuXHJcbiAgLyoqXHJcblx0ICogRGV0ZXJtaW5lcyBpZiB0aGUgaW5wdXQgaXMgYSBOdW1iZXIgb3Igc29tZXRoaW5nIHRoYXQgY2FuIGJlIGNvZXJjZWQgdG8gYSBOdW1iZXJcclxuXHQgKiBAcGFyYW0gLSBUaGUgaW5wdXQgdG8gYmUgdGVzdGVkXHJcblx0ICogQHJldHVybnMgLSBBbiBpbmRpY2F0aW9uIGlmIHRoZSBpbnB1dCBpcyBhIE51bWJlciBvciBjYW4gYmUgY29lcmNlZCB0byBhIE51bWJlclxyXG5cdCAqL1xyXG4gIGlzTnVtZXJpYyhudW1iZXI6IGFueSk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuICFpc05hTihwYXJzZUZsb2F0KG51bWJlcikpO1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIERhdGEgd2hpY2ggd2lsbCBiZSBwYXNzZWQgb3V0IGFmdGVyIGVuZGluZyBvZiB0cmFuc2l0aW9uIG9mIGNhcm91c2VsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU2xpZGVzT3V0cHV0RGF0YSB7XHJcbiAgc3RhcnRQb3NpdGlvbj86IG51bWJlcjtcclxuICBzbGlkZXM/OiBTbGlkZU1vZGVsW107XHJcbn07XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ293bC1jYXJvdXNlbC1vJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdiBjbGFzcz1cIm93bC1jYXJvdXNlbCBvd2wtdGhlbWVcIiAjb3dsQ2Fyb3VzZWxcclxuICAgICAgW25nQ2xhc3NdPVwieydvd2wtcnRsJzogb3dsRE9NRGF0YT8ucnRsLFxyXG4gICAgICAgICAgICAgICAgICAnb3dsLWxvYWRlZCc6IG93bERPTURhdGE/LmlzTG9hZGVkLFxyXG4gICAgICAgICAgICAgICAgICAnb3dsLXJlc3BvbnNpdmUnOiBvd2xET01EYXRhPy5pc1Jlc3BvbnNpdmUsXHJcbiAgICAgICAgICAgICAgICAgICdvd2wtZHJhZyc6IG93bERPTURhdGE/LmlzTW91c2VEcmFnYWJsZSxcclxuICAgICAgICAgICAgICAgICAgJ293bC1ncmFiJzogb3dsRE9NRGF0YT8uaXNHcmFifVwiXHJcbiAgICAgIChtb3VzZW92ZXIpPVwic3RhcnRQYXVzaW5nKClcIlxyXG4gICAgICAobW91c2VsZWF2ZSk9XCJzdGFydFBsYXlNTCgpXCJcclxuICAgICAgKHRvdWNoc3RhcnQpPVwic3RhcnRQYXVzaW5nKClcIlxyXG4gICAgICAodG91Y2hlbmQpPVwic3RhcnRQbGF5VEUoKVwiPlxyXG5cclxuICAgICAgPGRpdiAqbmdJZj1cImNhcm91c2VsTG9hZGVkXCIgY2xhc3M9XCJvd2wtc3RhZ2Utb3V0ZXJcIj5cclxuICAgICAgICA8b3dsLXN0YWdlIFtvd2xEcmFnZ2FibGVdPVwieydpc01vdXNlRHJhZ2FibGUnOiBvd2xET01EYXRhPy5pc01vdXNlRHJhZ2FibGUsICdpc1RvdWNoRHJhZ2FibGUnOiBvd2xET01EYXRhPy5pc1RvdWNoRHJhZ2FibGV9XCJcclxuICAgICAgICAgICAgICAgICAgICBbc3RhZ2VEYXRhXT1cInN0YWdlRGF0YVwiXHJcbiAgICAgICAgICAgICAgICAgICAgW3NsaWRlc0RhdGFdPVwic2xpZGVzRGF0YVwiPjwvb3dsLXN0YWdlPlxyXG4gICAgICA8L2Rpdj4gPCEtLSAvLm93bC1zdGFnZS1vdXRlciAtLT5cclxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInNsaWRlcy50b0FycmF5KCkubGVuZ3RoXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm93bC1uYXZcIiBbbmdDbGFzc109XCJ7J2Rpc2FibGVkJzogbmF2RGF0YT8uZGlzYWJsZWR9XCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwib3dsLXByZXZcIiBbbmdDbGFzc109XCJ7J2Rpc2FibGVkJzogbmF2RGF0YT8ucHJldj8uZGlzYWJsZWR9XCIgKGNsaWNrKT1cInByZXYoKVwiIFtpbm5lckhUTUxdPVwibmF2RGF0YT8ucHJldj8uaHRtbFRleHRcIj48L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJvd2wtbmV4dFwiIFtuZ0NsYXNzXT1cInsnZGlzYWJsZWQnOiBuYXZEYXRhPy5uZXh0Py5kaXNhYmxlZH1cIiAoY2xpY2spPVwibmV4dCgpXCIgW2lubmVySFRNTF09XCJuYXZEYXRhPy5uZXh0Py5odG1sVGV4dFwiPjwvZGl2PlxyXG4gICAgICAgIDwvZGl2PiA8IS0tIC8ub3dsLW5hdiAtLT5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwib3dsLWRvdHNcIiBbbmdDbGFzc109XCJ7J2Rpc2FibGVkJzogZG90c0RhdGE/LmRpc2FibGVkfVwiPlxyXG4gICAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgZG90IG9mIGRvdHNEYXRhPy5kb3RzXCIgY2xhc3M9XCJvd2wtZG90XCIgW25nQ2xhc3NdPVwieydhY3RpdmUnOiBkb3QuYWN0aXZlLCAnb3dsLWRvdC10ZXh0JzogZG90LnNob3dJbm5lckNvbnRlbnR9XCIgKGNsaWNrKT1cIm1vdmVCeURvdChkb3QuaWQpXCI+XHJcbiAgICAgICAgICAgIDxzcGFuIFtpbm5lckhUTUxdPVwiZG90LmlubmVyQ29udGVudFwiPjwvc3Bhbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PiA8IS0tIC8ub3dsLWRvdHMgLS0+XHJcbiAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgPC9kaXY+IDwhLS0gLy5vd2wtY2Fyb3VzZWwgb3dsLWxvYWRlZCAtLT5cclxuICBgLFxyXG4gIHN0eWxlczogW2Aub3dsLXRoZW1lIHsgZGlzcGxheTogYmxvY2s7IH1gXSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIE5hdmlnYXRpb25TZXJ2aWNlLFxyXG4gICAgQXV0b3BsYXlTZXJ2aWNlLFxyXG4gICAgQ2Fyb3VzZWxTZXJ2aWNlLFxyXG4gICAgTGF6eUxvYWRTZXJ2aWNlLFxyXG4gICAgQW5pbWF0ZVNlcnZpY2UsXHJcbiAgICBBdXRvSGVpZ2h0U2VydmljZSxcclxuICAgIEhhc2hTZXJ2aWNlXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2Fyb3VzZWxDb21wb25lbnRcclxuICBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcclxuICBAQ29udGVudENoaWxkcmVuKENhcm91c2VsU2xpZGVEaXJlY3RpdmUpXHJcbiAgc2xpZGVzOiBRdWVyeUxpc3Q8Q2Fyb3VzZWxTbGlkZURpcmVjdGl2ZT47XHJcblxyXG4gIEBPdXRwdXQoKSB0cmFuc2xhdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxTbGlkZXNPdXRwdXREYXRhPigpO1xyXG4gIEBPdXRwdXQoKSBkcmFnZ2luZyA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogV2lkdGggb2YgY2Fyb3VzZWwgd2luZG93ICh0YWcgd2l0aCBjbGFzcyAub3dsLWNhcm91c2VsKSwgaW4gd2ljaCB3ZSBjYW4gc2VlIG1vdmluZyBzbGlkZXJzXHJcbiAgICovXHJcbiAgY2Fyb3VzZWxXaW5kb3dXaWR0aDogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gdG8gJ3Jlc2l6ZScgZXZlbnRcclxuICAgKi9cclxuICByZXNpemVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaXB0aW9uIG1lcmdlIE9ic2VydmFibGUsIHdoaWNoIG1lcmdlcyBhbGwgT2JzZXJ2YWJsZXMgaW4gdGhlIGNvbXBvbmVudCBleGNlcHQgJ3Jlc2l6ZScgT2JzZXJ2YWJsZSBhbmQgdGhpcy5zbGlkZXMuY2hhbmdlcygpXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfYWxsT2JzZXJ2U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlwdGlvbiB0byBgdGhpcy5zbGlkZXMuY2hhbmdlcygpLlxyXG4gICAqIEl0IGNvdWxkIGJlIGluY2x1ZGVkIGluICd0aGlzLl9hbGxPYnNlcnZTdWJzY3JpcHRpb24nLCBidXQgdGhhdCBzdWJjcmlwdGlvbiBnZXQgY3JlYXRlZCBkdXJpbmcgdGhlIGluaXRpYWxpemluZyBvZiBjb21wb25lbnRcclxuICAgKiBhbmQgJ3RoaXMuc2xpZGVzJyBhcmUgdW5kZWZpbmVkIGF0IHRoYXQgbW9tZW50LiBTbyBpdCdzIG5lZWRlZCB0byB3YWl0IGZvciBpbml0aWFsaXphdGlvbiBvZiBjb250ZW50LlxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3NsaWRlc0NoYW5nZXNTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ3VycmVudCBzZXR0aW5ncyBmb3IgdGhlIGNhcm91c2VsLlxyXG4gICAqL1xyXG4gIG93bERPTURhdGE6IE93bERPTURhdGE7XHJcblxyXG4gIC8qKlxyXG4gICAqIERhdGEgb2Ygb3dsLXN0YWdlXHJcbiAgICovXHJcblx0c3RhZ2VEYXRhOiBTdGFnZURhdGE7XHJcblxyXG5cdC8qKlxyXG5cdCAqICBEYXRhIG9mIGV2ZXJ5IHNsaWRlXHJcblx0ICovXHJcbiAgc2xpZGVzRGF0YTogU2xpZGVNb2RlbFtdO1xyXG5cclxuICAvKipcclxuXHQgKiBEYXRhIG9mIG5hdmlnYXRpb24gYmxvY2tcclxuXHQgKi9cclxuXHRuYXZEYXRhOiBOYXZEYXRhO1xyXG5cclxuXHQvKipcclxuXHQgKiBEYXRhIG9mIGRvdHMgYmxvY2tcclxuXHQgKi9cclxuICBkb3RzRGF0YTogRG90c0RhdGE7XHJcblxyXG4gIC8qKlxyXG4gICAqIERhdGEsIHdpY2ggYXJlIHBhc3NlZCBvdXQgb2YgY2Fyb3VzZWwgYWZ0ZXIgZW5kaW5nIG9mIHRyYW5zaW9uaW5nIG9mIGNhcm91c2VsXHJcbiAgICovXHJcbiAgc2xpZGVzT3V0cHV0RGF0YTogU2xpZGVzT3V0cHV0RGF0YTtcclxuXHJcbiAgLyoqXHJcbiAgICogU2hvd3Mgd2hldGhlciBjYXJvdXNlbCBpcyBsb2FkZWQgb2Ygbm90LlxyXG4gICAqL1xyXG4gIGNhcm91c2VsTG9hZGVkID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZXIncyBvcHRpb25zXHJcbiAgICovXHJcbiAgQElucHV0KCkgb3B0aW9uczogT3dsT3B0aW9ucztcclxuXHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2YWJsZSBmb3IgZ2V0dGluZyBjdXJyZW50IFZpZXcgU2V0dGluZ3NcclxuICAgKi9cclxuICBwcml2YXRlIF92aWV3Q3VyU2V0dGluZ3MkOiBPYnNlcnZhYmxlPENhcm91c2VsQ3VycmVudERhdGE+O1xyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZhYmxlIGZvciBjYXRjaGluZyB0aGUgZW5kIG9mIHRyYW5zaXRpb24gb2YgY2Fyb3VzZWxcclxuICAgKi9cclxuICBwcml2YXRlIF90cmFuc2xhdGVkQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz47XHJcblxyXG4gIC8qKlxyXG4gICAqIE9ic2VydmFibGUgZm9yIGNhdGNoaW5nIHRoZSBzdGFydCBvZiBkcmFnZ2luZyBvZiB0aGUgY2Fyb3VzZWxcclxuICAgKi9cclxuICBwcml2YXRlIF9kcmFnZ2luZ0Nhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+O1xyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZhYmxlIGZvciBtZXJnaW5nIGFsbCBPYnNlcnZhYmxlcyBhbmQgY3JlYXRpbmcgb25lIHN1YnNjcmlwdGlvblxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2Nhcm91c2VsTWVyZ2UkOiBPYnNlcnZhYmxlPENhcm91c2VsQ3VycmVudERhdGEgfCBzdHJpbmc+O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXHJcbiAgICBwcml2YXRlIHJlc2l6ZVNlcnZpY2U6IFJlc2l6ZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNhcm91c2VsU2VydmljZTogQ2Fyb3VzZWxTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBuYXZpZ2F0aW9uU2VydmljZTogTmF2aWdhdGlvblNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGF1dG9wbGF5U2VydmljZTogQXV0b3BsYXlTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBsYXp5TG9hZFNlcnZpY2U6IExhenlMb2FkU2VydmljZSxcclxuICAgIHByaXZhdGUgYW5pbWF0ZVNlcnZpY2U6IEFuaW1hdGVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBhdXRvSGVpZ2h0U2VydmljZTogQXV0b0hlaWdodFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGhhc2hTZXJ2aWNlOiBIYXNoU2VydmljZSxcclxuICAgIHByaXZhdGUgbG9nZ2VyOiBPd2xMb2dnZXJcclxuICApIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5zcHlEYXRhU3RyZWFtcygpO1xyXG5cclxuICAgIHRoaXMuY2Fyb3VzZWxXaW5kb3dXaWR0aCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICAnLm93bC1jYXJvdXNlbCdcclxuICAgICkuY2xpZW50V2lkdGg7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XHJcbiAgfVxyXG4gIC8vIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIEVORFxyXG5cclxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcbiAgICBpZiAodGhpcy5zbGlkZXMudG9BcnJheSgpLmxlbmd0aCkge1xyXG4gICAgICB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR1cCh0aGlzLmNhcm91c2VsV2luZG93V2lkdGgsIHRoaXMuc2xpZGVzLnRvQXJyYXkoKSwgdGhpcy5vcHRpb25zKTtcclxuICAgICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UuaW5pdGlhbGl6ZSh0aGlzLnNsaWRlcy50b0FycmF5KCkpO1xyXG5cclxuICAgICAgdGhpcy5fd2luUmVzaXplV2F0Y2hlcigpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5sb2dnZXIubG9nKGBUaGVyZSBhcmUgbm8gc2xpZGVzIHRvIHNob3cuIFNvIHRoZSBjYXJvdXNlbCB3b24ndCBiZSByZW5kZXJlZGApO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX3NsaWRlc0NoYW5nZXNTdWJzY3JpcHRpb24gPSB0aGlzLnNsaWRlcy5jaGFuZ2VzLnBpcGUoXHJcbiAgICAgIHRhcCgoc2xpZGVzKSA9PiB7XHJcbiAgICAgICAgaWYgKHNsaWRlcy50b0FycmF5KCkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAvLyB0aGlzLmNhcm91c2VsU2VydmljZS5zZXRJdGVtcyhzbGlkZXMudG9BcnJheSgpKTtcclxuICAgICAgICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHVwKHRoaXMuY2Fyb3VzZWxXaW5kb3dXaWR0aCwgc2xpZGVzLnRvQXJyYXkoKSwgdGhpcy5vcHRpb25zKTtcclxuICAgICAgICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmluaXRpYWxpemUoc2xpZGVzLnRvQXJyYXkoKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuY2Fyb3VzZWxMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhgVGhlcmUgYXJlIG5vIHNsaWRlcyB0byBzaG93LiBTbyB0aGUgY2Fyb3VzZWwgd29uJ3QgYmUgcmUtcmVuZGVyZWRgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICApLnN1YnNjcmliZSgoKT0+e30pO1xyXG5cclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgaWYgKHRoaXMucmVzaXplU3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgIHRoaXMucmVzaXplU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fc2xpZGVzQ2hhbmdlc1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG5cclxuICAgIHRoaXMuX2FsbE9ic2VydlN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSm9pbnMgdGhlIG9ic2VydmFibGUgbG9naW4gaW4gb25lIHBsYWNlOiBzZXRzIHZhbHVlcyB0byBzb21lIG9ic2VydmFibGVzLCBtZXJnZXMgdGhpcyBvYnNlcnZhYmxlcyBhbmRcclxuICAgKiBzdWJjcmliZXMgdG8gbWVyZ2UgZnVuY1xyXG4gICAqL1xyXG4gIHNweURhdGFTdHJlYW1zKCkge1xyXG4gICAgdGhpcy5fdmlld0N1clNldHRpbmdzJCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldFZpZXdDdXJTZXR0aW5ncygpLnBpcGUoXHJcbiAgICAgIHRhcChkYXRhID0+IHtcclxuICAgICAgICB0aGlzLm93bERPTURhdGEgPSBkYXRhLm93bERPTURhdGE7XHJcbiAgICAgICAgdGhpcy5zdGFnZURhdGEgPSBkYXRhLnN0YWdlRGF0YTtcclxuICAgICAgICB0aGlzLnNsaWRlc0RhdGEgPSBkYXRhLnNsaWRlc0RhdGE7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNhcm91c2VsTG9hZGVkKSB7XHJcbiAgICAgICAgICB0aGlzLmNhcm91c2VsTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5uYXZEYXRhID0gZGF0YS5uYXZEYXRhO1xyXG4gICAgICAgIHRoaXMuZG90c0RhdGEgPSBkYXRhLmRvdHNEYXRhO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLl90cmFuc2xhdGVkQ2Fyb3VzZWwkID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0VHJhbnNsYXRlZFN0YXRlKCkucGlwZShcclxuICAgICAgdGFwKCgpID0+IHtcclxuICAgICAgICB0aGlzLmdhdGhlclRyYW5zbGF0ZWREYXRhKCk7XHJcbiAgICAgICAgdGhpcy50cmFuc2xhdGVkLmVtaXQodGhpcy5zbGlkZXNPdXRwdXREYXRhKTtcclxuICAgICAgICB0aGlzLnNsaWRlc091dHB1dERhdGEgPSB7fTtcclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5fZHJhZ2dpbmdDYXJvdXNlbCQgPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXREcmFnU3RhdGUoKS5waXBlKFxyXG4gICAgICB0YXAoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZHJhZ2dpbmcuZW1pdCh0cnVlKTtcclxuICAgICAgfSksXHJcbiAgICAgIHN3aXRjaE1hcChcclxuICAgICAgICAoKSA9PiB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRUcmFuc2xhdGVkU3RhdGUoKS5waXBlKFxyXG4gICAgICAgICAgZmlyc3QoKSxcclxuICAgICAgICAgIHRhcCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhZ2dpbmcuZW1pdChmYWxzZSk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIClcclxuICAgICAgKVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLl9jYXJvdXNlbE1lcmdlJCA9IG1lcmdlKHRoaXMuX3ZpZXdDdXJTZXR0aW5ncyQsIHRoaXMuX3RyYW5zbGF0ZWRDYXJvdXNlbCQsIHRoaXMuX2RyYWdnaW5nQ2Fyb3VzZWwkKTtcclxuICAgIHRoaXMuX2FsbE9ic2VydlN1YnNjcmlwdGlvbiA9IHRoaXMuX2Nhcm91c2VsTWVyZ2UkLnN1YnNjcmliZSgoKSA9PiB7fSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbml0IHN1YnNjcmlwdGlvbiB0byByZXNpemUgZXZlbnQgYW5kIGF0dGFjaGVzIGhhbmRsZXIgZm9yIHRoaXMgZXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIF93aW5SZXNpemVXYXRjaGVyKCkge1xyXG4gICAgaWYgKE9iamVjdC5rZXlzKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLl9vcHRpb25zLnJlc3BvbnNpdmUpLmxlbmd0aCkge1xyXG4gICAgICB0aGlzLnJlc2l6ZVN1YnNjcmlwdGlvbiA9IHRoaXMucmVzaXplU2VydmljZS5vblJlc2l6ZSRcclxuICAgICAgICAucGlwZShcclxuICAgICAgICAgIGZpbHRlcigoKSA9PiB0aGlzLmNhcm91c2VsV2luZG93V2lkdGggIT09IHRoaXMuZWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcub3dsLWNhcm91c2VsJykuY2xpZW50V2lkdGgpLFxyXG4gICAgICAgICAgZGVsYXkodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MucmVzcG9uc2l2ZVJlZnJlc2hSYXRlKVxyXG4gICAgICAgIClcclxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm9uUmVzaXplKHRoaXMuZWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcub3dsLWNhcm91c2VsJykuY2xpZW50V2lkdGgpO1xyXG4gICAgICAgICAgdGhpcy5jYXJvdXNlbFdpbmRvd1dpZHRoID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vd2wtY2Fyb3VzZWwnKS5jbGllbnRXaWR0aDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhbmRsZXIgZm9yIHRyYW5zaXRpb2VuZCBldmVudFxyXG4gICAqL1xyXG4gIG9uVHJhbnNpdGlvbkVuZCgpIHtcclxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm9uVHJhbnNpdGlvbkVuZCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlciBmb3IgY2xpY2sgZXZlbnQsIGF0dGFjaGVkIHRvIG5leHQgYnV0dG9uXHJcbiAgICovXHJcbiAgbmV4dCgpIHtcclxuICAgIGlmICghdGhpcy5jYXJvdXNlbExvYWRlZCB8fCAodGhpcy5uYXZEYXRhICYmIHRoaXMubmF2RGF0YS5kaXNhYmxlZCkpIHJldHVybjtcclxuICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UubmV4dCh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5uYXZTcGVlZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGVyIGZvciBjbGljayBldmVudCwgYXR0YWNoZWQgdG8gcHJldiBidXR0b25cclxuICAgKi9cclxuICBwcmV2KCkge1xyXG4gICAgaWYgKCF0aGlzLmNhcm91c2VsTG9hZGVkIHx8ICh0aGlzLm5hdkRhdGEgJiYgdGhpcy5uYXZEYXRhLmRpc2FibGVkKSkgcmV0dXJuO1xyXG4gICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5wcmV2KHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLm5hdlNwZWVkKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhbmRsZXIgZm9yIGNsaWNrIGV2ZW50LCBhdHRhY2hlZCB0byBkb3RzXHJcbiAgICovXHJcbiAgbW92ZUJ5RG90KGRvdElkOiBzdHJpbmcpIHtcclxuICAgIGlmICghdGhpcy5jYXJvdXNlbExvYWRlZCkgcmV0dXJuO1xyXG4gICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5tb3ZlQnlEb3QoZG90SWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogcmV3aW5kcyBjYXJvdXNlbCB0byBzbGlkZSB3aXRoIG5lZWRlZCBpZFxyXG4gICAqIEBwYXJhbSBpZCBmcmFnbWVudCBvZiB1cmxcclxuICAgKi9cclxuICB0byhpZDogc3RyaW5nKSB7XHJcbiAgICBpZiAoIXRoaXMuY2Fyb3VzZWxMb2FkZWQgfHwgKHRoaXMubmF2RGF0YSAmJiB0aGlzLm5hdkRhdGEuZGlzYWJsZWQpIHx8ICh0aGlzLmRvdHNEYXRhICYmIHRoaXMuZG90c0RhdGEuZGlzYWJsZWQpKSByZXR1cm47XHJcbiAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLnRvU2xpZGVCeUlkKGlkKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdhdGhlcnMgYW5kIHByZXBhcmVzIGRhdGEgaW50ZW5kZWQgZm9yIHBhc3NpbmcgdG8gdGhlIHVzZXIgYnkgbWVhbnMgb2YgZmlyaW5nIGV2ZW50IHRyYW5zbGF0ZWRDYXJvdXNlbFxyXG4gICAqL1xyXG4gIGdhdGhlclRyYW5zbGF0ZWREYXRhKCkge1xyXG4gICAgbGV0IHN0YXJ0UG9zaXRpb246IG51bWJlcjtcclxuICAgIGNvbnN0IGNsb25lZElkUHJlZml4ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuY2xvbmVkSWRQcmVmaXg7XHJcbiAgICBjb25zdCBhY3RpdmVTbGlkZXM6IFNsaWRlTW9kZWxbXSA9IHRoaXMuc2xpZGVzRGF0YVxyXG4gICAgICAuZmlsdGVyKHNsaWRlID0+IHNsaWRlLmlzQWN0aXZlID09PSB0cnVlKVxyXG4gICAgICAubWFwKHNsaWRlID0+IHtcclxuICAgICAgICBjb25zdCBpZCA9IHNsaWRlLmlkLmluZGV4T2YoY2xvbmVkSWRQcmVmaXgpID49IDAgPyBzbGlkZS5pZC5zbGljZShjbG9uZWRJZFByZWZpeC5sZW5ndGgpIDogc2xpZGUuaWQ7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIGlkOiBpZCxcclxuICAgICAgICAgIHdpZHRoOiBzbGlkZS53aWR0aCxcclxuICAgICAgICAgIG1hcmdpbkw6IHNsaWRlLm1hcmdpbkwsXHJcbiAgICAgICAgICBtYXJnaW5SOiBzbGlkZS5tYXJnaW5SLFxyXG4gICAgICAgICAgY2VudGVyOiBzbGlkZS5pc0NlbnRlcmVkXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIHN0YXJ0UG9zaXRpb24gPSB0aGlzLmNhcm91c2VsU2VydmljZS5yZWxhdGl2ZSh0aGlzLmNhcm91c2VsU2VydmljZS5jdXJyZW50KCkpO1xyXG4gICAgdGhpcy5zbGlkZXNPdXRwdXREYXRhID0ge1xyXG4gICAgICBzdGFydFBvc2l0aW9uOiBzdGFydFBvc2l0aW9uLFxyXG4gICAgICBzbGlkZXM6IGFjdGl2ZVNsaWRlc1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnRzIHBhdXNpbmdcclxuICAgKi9cclxuICBzdGFydFBhdXNpbmcoKSB7XHJcbiAgICB0aGlzLmF1dG9wbGF5U2VydmljZS5zdGFydFBhdXNpbmcoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0YXJ0cyBwbGF5aW5nIGFmdGVyIG1vdXNlIGxlYXZlcyBjYXJvdXNlbFxyXG4gICAqL1xyXG4gIHN0YXJ0UGxheU1MKCkge1xyXG4gICAgdGhpcy5hdXRvcGxheVNlcnZpY2Uuc3RhcnRQbGF5aW5nTW91c2VMZWF2ZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnRzIHBsYXlpbmcgYWZ0ZXIgdG91Y2ggZW5kc1xyXG4gICAqL1xyXG4gIHN0YXJ0UGxheVRFKCkge1xyXG4gICAgdGhpcy5hdXRvcGxheVNlcnZpY2Uuc3RhcnRQbGF5aW5nVG91Y2hFbmQoKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==