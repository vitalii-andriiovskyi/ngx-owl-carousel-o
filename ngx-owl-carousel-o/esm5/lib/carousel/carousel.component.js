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
/** @type {?} */
var nextId = 0;
var CarouselSlideDirective = /** @class */ (function () {
    function CarouselSlideDirective(tplRef) {
        this.tplRef = tplRef;
        /**
         * Unique slide identifier. Must be unique for the entire document for proper accessibility support.
         * Will be auto-generated if not provided.
         */
        this.id = "owl-slide-" + nextId++;
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
    Object.defineProperty(CarouselSlideDirective.prototype, "dataMerge", {
        get: /**
         * @return {?}
         */
        function () { return this._dataMerge; },
        set: /**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            this._dataMerge = this.isNumeric(data) ? data : 1;
        },
        enumerable: true,
        configurable: true
    });
    ;
    /**
       * Determines if the input is a Number or something that can be coerced to a Number
       * @param - The input to be tested
       * @returns - An indication if the input is a Number or can be coerced to a Number
       */
    /**
     * Determines if the input is a Number or something that can be coerced to a Number
     * @param {?} number
     * @return {?} - An indication if the input is a Number or can be coerced to a Number
     */
    CarouselSlideDirective.prototype.isNumeric = /**
     * Determines if the input is a Number or something that can be coerced to a Number
     * @param {?} number
     * @return {?} - An indication if the input is a Number or can be coerced to a Number
     */
    function (number) {
        return !isNaN(parseFloat(number));
    };
    CarouselSlideDirective.decorators = [
        { type: Directive, args: [{ selector: 'ng-template[carouselSlide]' },] }
    ];
    /** @nocollapse */
    CarouselSlideDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    CarouselSlideDirective.propDecorators = {
        id: [{ type: Input }],
        dataMerge: [{ type: Input }],
        width: [{ type: Input }],
        dotContent: [{ type: Input }],
        dataHash: [{ type: Input }]
    };
    return CarouselSlideDirective;
}());
export { CarouselSlideDirective };
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
var /**
 * Data which will be passed out after ending of transition of carousel
 */
SlidesOutputData = /** @class */ (function () {
    function SlidesOutputData() {
    }
    return SlidesOutputData;
}());
/**
 * Data which will be passed out after ending of transition of carousel
 */
export { SlidesOutputData };
if (false) {
    /** @type {?} */
    SlidesOutputData.prototype.startPosition;
    /** @type {?} */
    SlidesOutputData.prototype.slides;
}
;
var CarouselComponent = /** @class */ (function () {
    function CarouselComponent(el, resizeService, carouselService, navigationService, autoplayService, lazyLoadService, animateService, autoHeightService, hashService) {
        this.el = el;
        this.resizeService = resizeService;
        this.carouselService = carouselService;
        this.navigationService = navigationService;
        this.autoplayService = autoplayService;
        this.lazyLoadService = lazyLoadService;
        this.animateService = animateService;
        this.autoHeightService = autoHeightService;
        this.hashService = hashService;
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
    CarouselComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.spyDataStreams();
        this.carouselWindowWidth = this.el.nativeElement.querySelector('.owl-carousel').clientWidth;
    };
    /**
     * @return {?}
     */
    CarouselComponent.prototype.ngAfterContentChecked = /**
     * @return {?}
     */
    function () {
    };
    // ngAfterContentChecked() END
    // ngAfterContentChecked() END
    /**
     * @return {?}
     */
    CarouselComponent.prototype.ngAfterContentInit = 
    // ngAfterContentChecked() END
    /**
     * @return {?}
     */
    function () {
        if (this.slides.toArray().length) {
            this.carouselService.setup(this.carouselWindowWidth, this.slides.toArray(), this.options);
            this.carouselService.initialize(this.slides.toArray());
            this._winResizeWatcher();
        }
        else {
            console.log("There's no slides to show. So carousel didn't get rendered");
        }
    };
    /**
     * @return {?}
     */
    CarouselComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.resizeSubscription) {
            this.resizeSubscription.unsubscribe();
        }
        this._allObservSubscription.unsubscribe();
    };
    /**
     * Joins the observable login in one place: sets values to some observables, merges this observables and
     * subcribes to merge func
     */
    /**
     * Joins the observable login in one place: sets values to some observables, merges this observables and
     * subcribes to merge func
     * @return {?}
     */
    CarouselComponent.prototype.spyDataStreams = /**
     * Joins the observable login in one place: sets values to some observables, merges this observables and
     * subcribes to merge func
     * @return {?}
     */
    function () {
        var _this = this;
        this._viewCurSettings$ = this.carouselService.getViewCurSettings().pipe(tap(function (data) {
            _this.owlDOMData = data.owlDOMData;
            _this.stageData = data.stageData;
            _this.slidesData = data.slidesData;
            if (!_this.carouselLoaded) {
                _this.carouselLoaded = true;
            }
            _this.navData = data.navData;
            _this.dotsData = data.dotsData;
        }));
        this._translatedCarousel$ = this.carouselService.getTranslatedState().pipe(tap(function () {
            _this.gatherTranslatedData();
            _this.translated.emit(_this.slidesOutputData);
            _this.slidesOutputData = {};
        }));
        this._draggingCarousel$ = this.carouselService.getDragState().pipe(tap(function () {
            _this.dragging.emit(true);
        }), switchMap(function () { return _this.carouselService.getTranslatedState().pipe(first(), tap(function () {
            _this.dragging.emit(false);
        })); }));
        this._carouselMerge$ = merge(this._viewCurSettings$, this._translatedCarousel$, this._draggingCarousel$);
        this._allObservSubscription = this._carouselMerge$.subscribe(function () { });
    };
    /**
     * Init subscription to resize event and attaches handler for this event
     */
    /**
     * Init subscription to resize event and attaches handler for this event
     * @return {?}
     */
    CarouselComponent.prototype._winResizeWatcher = /**
     * Init subscription to resize event and attaches handler for this event
     * @return {?}
     */
    function () {
        var _this = this;
        if (Object.keys(this.carouselService._options.responsive).length) {
            this.resizeSubscription = this.resizeService.onResize$
                .pipe(filter(function () { return _this.carouselWindowWidth !== _this.el.nativeElement.querySelector('.owl-carousel').clientWidth; }), delay(this.carouselService.settings.responsiveRefreshRate))
                .subscribe(function () {
                _this.carouselService.onResize(_this.el.nativeElement.querySelector('.owl-carousel').clientWidth);
                _this.carouselWindowWidth = _this.el.nativeElement.querySelector('.owl-carousel').clientWidth;
            });
        }
    };
    /**
     * Handler for transitioend event
     */
    /**
     * Handler for transitioend event
     * @return {?}
     */
    CarouselComponent.prototype.onTransitionEnd = /**
     * Handler for transitioend event
     * @return {?}
     */
    function () {
        this.carouselService.onTransitionEnd();
    };
    /**
     * Handler for click event, attached to next button
     */
    /**
     * Handler for click event, attached to next button
     * @return {?}
     */
    CarouselComponent.prototype.next = /**
     * Handler for click event, attached to next button
     * @return {?}
     */
    function () {
        this.navigationService.next(this.carouselService.settings.navSpeed);
    };
    /**
     * Handler for click event, attached to prev button
     */
    /**
     * Handler for click event, attached to prev button
     * @return {?}
     */
    CarouselComponent.prototype.prev = /**
     * Handler for click event, attached to prev button
     * @return {?}
     */
    function () {
        this.navigationService.prev(this.carouselService.settings.navSpeed);
    };
    /**
     * Handler for click event, attached to dots
     */
    /**
     * Handler for click event, attached to dots
     * @param {?} dotId
     * @return {?}
     */
    CarouselComponent.prototype.moveByDot = /**
     * Handler for click event, attached to dots
     * @param {?} dotId
     * @return {?}
     */
    function (dotId) {
        this.navigationService.moveByDot(dotId);
    };
    /**
     * rewinds carousel to slide with needed id
     * @param id fragment of url
     */
    /**
     * rewinds carousel to slide with needed id
     * @param {?} id fragment of url
     * @return {?}
     */
    CarouselComponent.prototype.to = /**
     * rewinds carousel to slide with needed id
     * @param {?} id fragment of url
     * @return {?}
     */
    function (id) {
        this.navigationService.toSlideById(id);
    };
    /**
     * Gathers and prepares data intended for passing to the user by means of firing event translatedCarousel
     */
    /**
     * Gathers and prepares data intended for passing to the user by means of firing event translatedCarousel
     * @return {?}
     */
    CarouselComponent.prototype.gatherTranslatedData = /**
     * Gathers and prepares data intended for passing to the user by means of firing event translatedCarousel
     * @return {?}
     */
    function () {
        /** @type {?} */
        var startPosition;
        /** @type {?} */
        var clonedIdPrefix = this.carouselService.clonedIdPrefix;
        /** @type {?} */
        var activeSlides = this.slidesData
            .filter(function (slide) { return slide.isActive === true; })
            .map(function (slide) {
            /** @type {?} */
            var id = slide.id.indexOf(clonedIdPrefix) >= 0 ? slide.id.slice(clonedIdPrefix.length) : slide.id;
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
    };
    /**
     * Starts pausing
     */
    /**
     * Starts pausing
     * @return {?}
     */
    CarouselComponent.prototype.startPausing = /**
     * Starts pausing
     * @return {?}
     */
    function () {
        this.autoplayService.startPausing();
    };
    /**
     * Starts playing after mouse leaves carousel
     */
    /**
     * Starts playing after mouse leaves carousel
     * @return {?}
     */
    CarouselComponent.prototype.startPlayML = /**
     * Starts playing after mouse leaves carousel
     * @return {?}
     */
    function () {
        this.autoplayService.startPlayingMouseLeave();
    };
    /**
     * Starts playing after touch ends
     */
    /**
     * Starts playing after touch ends
     * @return {?}
     */
    CarouselComponent.prototype.startPlayTE = /**
     * Starts playing after touch ends
     * @return {?}
     */
    function () {
        this.autoplayService.startPlayingTouchEnd();
    };
    CarouselComponent.decorators = [
        { type: Component, args: [{
                    selector: 'owl-carousel-o',
                    template: "\n    <div class=\"owl-carousel owl-theme\" #owlCarousel\n      [ngClass]=\"{'owl-rtl': owlDOMData?.rtl,\n                  'owl-loaded': owlDOMData?.isLoaded,\n                  'owl-responsive': owlDOMData?.isResponsive,\n                  'owl-drag': owlDOMData?.isMouseDragable,\n                  'owl-grab': owlDOMData?.isGrab}\"\n      (mouseover)=\"startPausing()\"\n      (mouseleave)=\"startPlayML()\"\n      (touchstart)=\"startPausing()\"\n      (touchend)=\"startPlayTE()\">\n\n      <div *ngIf=\"carouselLoaded\" class=\"owl-stage-outer\">\n        <owl-stage [owlDraggable]=\"{'isMouseDragable': owlDOMData?.isMouseDragable, 'isTouchDragable': owlDOMData?.isTouchDragable}\"\n                    [stageData]=\"stageData\"\n                    [slidesData]=\"slidesData\"></owl-stage>\n      </div> <!-- /.owl-stage-outer -->\n      <ng-container *ngIf=\"slides.toArray().length\">\n        <div class=\"owl-nav\" [ngClass]=\"{'disabled': navData?.disabled}\">\n          <div class=\"owl-prev\" [ngClass]=\"{'disabled': navData?.prev?.disabled}\" (click)=\"prev()\" [innerHTML]=\"navData?.prev?.htmlText\"></div>\n          <div class=\"owl-next\" [ngClass]=\"{'disabled': navData?.next?.disabled}\" (click)=\"next()\" [innerHTML]=\"navData?.next?.htmlText\"></div>\n        </div> <!-- /.owl-nav -->\n        <div class=\"owl-dots\" [ngClass]=\"{'disabled': dotsData?.disabled}\">\n          <div *ngFor=\"let dot of dotsData?.dots\" class=\"owl-dot\" [ngClass]=\"{'active': dot.active, 'owl-dot-text': dot.showInnerContent}\" (click)=\"moveByDot(dot.id)\">\n            <span [innerHTML]=\"dot.innerContent\"></span>\n          </div>\n        </div> <!-- /.owl-dots -->\n      </ng-container>\n    </div> <!-- /.owl-carousel owl-loaded -->\n  ",
                    providers: [
                        NavigationService,
                        AutoplayService,
                        CarouselService,
                        LazyLoadService,
                        AnimateService,
                        AutoHeightService,
                        HashService
                    ],
                    styles: [".owl-theme { display: block; }"]
                }] }
    ];
    /** @nocollapse */
    CarouselComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ResizeService },
        { type: CarouselService },
        { type: NavigationService },
        { type: AutoplayService },
        { type: LazyLoadService },
        { type: AnimateService },
        { type: AutoHeightService },
        { type: HashService }
    ]; };
    CarouselComponent.propDecorators = {
        slides: [{ type: ContentChildren, args: [CarouselSlideDirective,] }],
        translated: [{ type: Output }],
        dragging: [{ type: Output }],
        options: [{ type: Input }]
    };
    return CarouselComponent;
}());
export { CarouselComponent };
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
     * Subscription merge Observable, which merges all Observables in the component except 'resize' Observable
     * @type {?}
     */
    CarouselComponent.prototype._allObservSubscription;
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW93bC1jYXJvdXNlbC1vLyIsInNvdXJjZXMiOlsibGliL2Nhcm91c2VsL2Nhcm91c2VsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFJVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxTQUFTLEVBQ1QsZUFBZSxFQUNmLFdBQVcsRUFDWCxVQUFVLEVBRVYsWUFBWSxFQUNiLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBNEIsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXZELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxlQUFlLEVBQXVCLE1BQU0sOEJBQThCLENBQUM7QUFJcEYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRXpELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7SUFFbkQsTUFBTSxHQUFHLENBQUM7QUFFZDtJQWtDRSxnQ0FBbUIsTUFBd0I7UUFBeEIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7Ozs7O1FBNUJsQyxPQUFFLEdBQUcsZUFBYSxNQUFN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O0lBQ3hDLDRDQUF3Qzs7SUFDeEMsMkNBQXNDOztJQUN0Qyw4Q0FBNEM7O0lBQzVDLHdDQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIE9uSW5pdCxcclxuICBBZnRlckNvbnRlbnRDaGVja2VkLFxyXG4gIE9uRGVzdHJveSxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRGlyZWN0aXZlLFxyXG4gIFF1ZXJ5TGlzdCxcclxuICBDb250ZW50Q2hpbGRyZW4sXHJcbiAgVGVtcGxhdGVSZWYsXHJcbiAgRWxlbWVudFJlZixcclxuICBBZnRlckNvbnRlbnRJbml0LFxyXG4gIEV2ZW50RW1pdHRlclxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBPYnNlcnZhYmxlLCBtZXJnZSB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgUmVzaXplU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3Jlc2l6ZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgdGFwLCBkZWxheSwgZmlsdGVyLCBzd2l0Y2hNYXAsIGZpcnN0IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBDYXJvdXNlbFNlcnZpY2UsIENhcm91c2VsQ3VycmVudERhdGEgfSBmcm9tICcuLi9zZXJ2aWNlcy9jYXJvdXNlbC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3RhZ2VEYXRhIH0gZnJvbSBcIi4uL21vZGVscy9zdGFnZS1kYXRhLm1vZGVsXCI7XHJcbmltcG9ydCB7IE93bERPTURhdGEgfSBmcm9tIFwiLi4vbW9kZWxzL293bERPTS1kYXRhLm1vZGVsXCI7XHJcbmltcG9ydCB7IFNsaWRlTW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvc2xpZGUubW9kZWwnO1xyXG5pbXBvcnQgeyBPd2xPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWxzL293bC1vcHRpb25zLm1vZGVsJztcclxuaW1wb3J0IHsgTmF2RGF0YSwgRG90c0RhdGEgfSBmcm9tICcuLi9tb2RlbHMvbmF2aWdhdGlvbi1kYXRhLm1vZGVscyc7XHJcbmltcG9ydCB7IE5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmF2aWdhdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQXV0b3BsYXlTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvYXV0b3BsYXkuc2VydmljZSc7XHJcbmltcG9ydCB7IExhenlMb2FkU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2xhenlsb2FkLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBbmltYXRlU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2FuaW1hdGUuc2VydmljZSc7XHJcbmltcG9ydCB7IEF1dG9IZWlnaHRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvYXV0b2hlaWdodC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSGFzaFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9oYXNoLnNlcnZpY2UnO1xyXG5cclxubGV0IG5leHRJZCA9IDA7XHJcblxyXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICduZy10ZW1wbGF0ZVtjYXJvdXNlbFNsaWRlXScgfSlcclxuZXhwb3J0IGNsYXNzIENhcm91c2VsU2xpZGVEaXJlY3RpdmUge1xyXG4gIC8qKlxyXG4gICAqIFVuaXF1ZSBzbGlkZSBpZGVudGlmaWVyLiBNdXN0IGJlIHVuaXF1ZSBmb3IgdGhlIGVudGlyZSBkb2N1bWVudCBmb3IgcHJvcGVyIGFjY2Vzc2liaWxpdHkgc3VwcG9ydC5cclxuICAgKiBXaWxsIGJlIGF1dG8tZ2VuZXJhdGVkIGlmIG5vdCBwcm92aWRlZC5cclxuICAgKi9cclxuICBASW5wdXQoKSBpZCA9IGBvd2wtc2xpZGUtJHtuZXh0SWQrK31gO1xyXG5cclxuICAvKipcclxuICAgKiBEZWZpbmVzIGhvdyBtdWNoIHdpZHRocyBvZiBjb21tb24gc2xpZGUgd2lsbCBjdXJyZW50IHNsaWRlIGhhdmVcclxuICAgKiBlLmcuIGlmIF9tZXJnZURhdGE9MiwgdGhlIHNsaWRlIHdpbGwgdHdpY2Ugd2lkZXIgdGhlbiBzbGlkZXMgd2l0aCBfbWVyZ2VEYXRhPTFcclxuICAgKi9cclxuICBwcml2YXRlIF9kYXRhTWVyZ2UgPSAxO1xyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IGRhdGFNZXJnZShkYXRhOiBudW1iZXIpIHtcclxuICAgIHRoaXMuX2RhdGFNZXJnZSA9IHRoaXMuaXNOdW1lcmljKGRhdGEpID8gZGF0YSA6IDE7XHJcbiAgfTtcclxuICBnZXQgZGF0YU1lcmdlKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9kYXRhTWVyZ2UgfVxyXG5cclxuICAvKipcclxuICAgKiBXaWR0aCBvZiBzbGlkZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHdpZHRoID0gMDtcclxuXHJcbiAgLyoqXHJcbiAgICogSW5uZXIgY29udGVudCBvZiBkb3QgZm9yIGNlcnRhaW4gc2xpZGU7IGNhbiBiZSBodG1sLW1hcmt1cFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRvdENvbnRlbnQgPSAnJztcclxuXHJcbiAgLyoqXHJcbiAgICogSGFzaCAoZnJhZ21lbnQpIG9mIHVybCB3aGljaCBjb3JyZXNwb25kcyB0byBjZXJ0YWluIHNsaWRlXHJcbiAgICovXHJcbiAgQElucHV0KCkgZGF0YUhhc2ggPSAnJztcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIHRwbFJlZjogVGVtcGxhdGVSZWY8YW55Pikge31cclxuXHJcbiAgLyoqXHJcblx0ICogRGV0ZXJtaW5lcyBpZiB0aGUgaW5wdXQgaXMgYSBOdW1iZXIgb3Igc29tZXRoaW5nIHRoYXQgY2FuIGJlIGNvZXJjZWQgdG8gYSBOdW1iZXJcclxuXHQgKiBAcGFyYW0gLSBUaGUgaW5wdXQgdG8gYmUgdGVzdGVkXHJcblx0ICogQHJldHVybnMgLSBBbiBpbmRpY2F0aW9uIGlmIHRoZSBpbnB1dCBpcyBhIE51bWJlciBvciBjYW4gYmUgY29lcmNlZCB0byBhIE51bWJlclxyXG5cdCAqL1xyXG4gIGlzTnVtZXJpYyhudW1iZXI6IGFueSk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuICFpc05hTihwYXJzZUZsb2F0KG51bWJlcikpO1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIERhdGEgd2hpY2ggd2lsbCBiZSBwYXNzZWQgb3V0IGFmdGVyIGVuZGluZyBvZiB0cmFuc2l0aW9uIG9mIGNhcm91c2VsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU2xpZGVzT3V0cHV0RGF0YSB7XHJcbiAgc3RhcnRQb3NpdGlvbj86IG51bWJlcjtcclxuICBzbGlkZXM/OiBTbGlkZU1vZGVsW107XHJcbn07XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ293bC1jYXJvdXNlbC1vJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdiBjbGFzcz1cIm93bC1jYXJvdXNlbCBvd2wtdGhlbWVcIiAjb3dsQ2Fyb3VzZWxcclxuICAgICAgW25nQ2xhc3NdPVwieydvd2wtcnRsJzogb3dsRE9NRGF0YT8ucnRsLFxyXG4gICAgICAgICAgICAgICAgICAnb3dsLWxvYWRlZCc6IG93bERPTURhdGE/LmlzTG9hZGVkLFxyXG4gICAgICAgICAgICAgICAgICAnb3dsLXJlc3BvbnNpdmUnOiBvd2xET01EYXRhPy5pc1Jlc3BvbnNpdmUsXHJcbiAgICAgICAgICAgICAgICAgICdvd2wtZHJhZyc6IG93bERPTURhdGE/LmlzTW91c2VEcmFnYWJsZSxcclxuICAgICAgICAgICAgICAgICAgJ293bC1ncmFiJzogb3dsRE9NRGF0YT8uaXNHcmFifVwiXHJcbiAgICAgIChtb3VzZW92ZXIpPVwic3RhcnRQYXVzaW5nKClcIlxyXG4gICAgICAobW91c2VsZWF2ZSk9XCJzdGFydFBsYXlNTCgpXCJcclxuICAgICAgKHRvdWNoc3RhcnQpPVwic3RhcnRQYXVzaW5nKClcIlxyXG4gICAgICAodG91Y2hlbmQpPVwic3RhcnRQbGF5VEUoKVwiPlxyXG5cclxuICAgICAgPGRpdiAqbmdJZj1cImNhcm91c2VsTG9hZGVkXCIgY2xhc3M9XCJvd2wtc3RhZ2Utb3V0ZXJcIj5cclxuICAgICAgICA8b3dsLXN0YWdlIFtvd2xEcmFnZ2FibGVdPVwieydpc01vdXNlRHJhZ2FibGUnOiBvd2xET01EYXRhPy5pc01vdXNlRHJhZ2FibGUsICdpc1RvdWNoRHJhZ2FibGUnOiBvd2xET01EYXRhPy5pc1RvdWNoRHJhZ2FibGV9XCJcclxuICAgICAgICAgICAgICAgICAgICBbc3RhZ2VEYXRhXT1cInN0YWdlRGF0YVwiXHJcbiAgICAgICAgICAgICAgICAgICAgW3NsaWRlc0RhdGFdPVwic2xpZGVzRGF0YVwiPjwvb3dsLXN0YWdlPlxyXG4gICAgICA8L2Rpdj4gPCEtLSAvLm93bC1zdGFnZS1vdXRlciAtLT5cclxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInNsaWRlcy50b0FycmF5KCkubGVuZ3RoXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm93bC1uYXZcIiBbbmdDbGFzc109XCJ7J2Rpc2FibGVkJzogbmF2RGF0YT8uZGlzYWJsZWR9XCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwib3dsLXByZXZcIiBbbmdDbGFzc109XCJ7J2Rpc2FibGVkJzogbmF2RGF0YT8ucHJldj8uZGlzYWJsZWR9XCIgKGNsaWNrKT1cInByZXYoKVwiIFtpbm5lckhUTUxdPVwibmF2RGF0YT8ucHJldj8uaHRtbFRleHRcIj48L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJvd2wtbmV4dFwiIFtuZ0NsYXNzXT1cInsnZGlzYWJsZWQnOiBuYXZEYXRhPy5uZXh0Py5kaXNhYmxlZH1cIiAoY2xpY2spPVwibmV4dCgpXCIgW2lubmVySFRNTF09XCJuYXZEYXRhPy5uZXh0Py5odG1sVGV4dFwiPjwvZGl2PlxyXG4gICAgICAgIDwvZGl2PiA8IS0tIC8ub3dsLW5hdiAtLT5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwib3dsLWRvdHNcIiBbbmdDbGFzc109XCJ7J2Rpc2FibGVkJzogZG90c0RhdGE/LmRpc2FibGVkfVwiPlxyXG4gICAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgZG90IG9mIGRvdHNEYXRhPy5kb3RzXCIgY2xhc3M9XCJvd2wtZG90XCIgW25nQ2xhc3NdPVwieydhY3RpdmUnOiBkb3QuYWN0aXZlLCAnb3dsLWRvdC10ZXh0JzogZG90LnNob3dJbm5lckNvbnRlbnR9XCIgKGNsaWNrKT1cIm1vdmVCeURvdChkb3QuaWQpXCI+XHJcbiAgICAgICAgICAgIDxzcGFuIFtpbm5lckhUTUxdPVwiZG90LmlubmVyQ29udGVudFwiPjwvc3Bhbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PiA8IS0tIC8ub3dsLWRvdHMgLS0+XHJcbiAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgPC9kaXY+IDwhLS0gLy5vd2wtY2Fyb3VzZWwgb3dsLWxvYWRlZCAtLT5cclxuICBgLFxyXG4gIHN0eWxlczogW2Aub3dsLXRoZW1lIHsgZGlzcGxheTogYmxvY2s7IH1gXSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIE5hdmlnYXRpb25TZXJ2aWNlLFxyXG4gICAgQXV0b3BsYXlTZXJ2aWNlLFxyXG4gICAgQ2Fyb3VzZWxTZXJ2aWNlLFxyXG4gICAgTGF6eUxvYWRTZXJ2aWNlLFxyXG4gICAgQW5pbWF0ZVNlcnZpY2UsXHJcbiAgICBBdXRvSGVpZ2h0U2VydmljZSxcclxuICAgIEhhc2hTZXJ2aWNlXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2Fyb3VzZWxDb21wb25lbnRcclxuICBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcclxuICBAQ29udGVudENoaWxkcmVuKENhcm91c2VsU2xpZGVEaXJlY3RpdmUpXHJcbiAgc2xpZGVzOiBRdWVyeUxpc3Q8Q2Fyb3VzZWxTbGlkZURpcmVjdGl2ZT47XHJcblxyXG4gIEBPdXRwdXQoKSB0cmFuc2xhdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxTbGlkZXNPdXRwdXREYXRhPigpO1xyXG4gIEBPdXRwdXQoKSBkcmFnZ2luZyA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogV2lkdGggb2YgY2Fyb3VzZWwgd2luZG93ICh0YWcgd2l0aCBjbGFzcyAub3dsLWNhcm91c2VsKSwgaW4gd2ljaCB3ZSBjYW4gc2VlIG1vdmluZyBzbGlkZXJzXHJcbiAgICovXHJcbiAgY2Fyb3VzZWxXaW5kb3dXaWR0aDogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gdG8gJ3Jlc2l6ZScgZXZlbnRcclxuICAgKi9cclxuICByZXNpemVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaXB0aW9uIG1lcmdlIE9ic2VydmFibGUsIHdoaWNoIG1lcmdlcyBhbGwgT2JzZXJ2YWJsZXMgaW4gdGhlIGNvbXBvbmVudCBleGNlcHQgJ3Jlc2l6ZScgT2JzZXJ2YWJsZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2FsbE9ic2VydlN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBDdXJyZW50IHNldHRpbmdzIGZvciB0aGUgY2Fyb3VzZWwuXHJcbiAgICovXHJcbiAgb3dsRE9NRGF0YTogT3dsRE9NRGF0YTtcclxuXHJcbiAgLyoqXHJcbiAgICogRGF0YSBvZiBvd2wtc3RhZ2VcclxuICAgKi9cclxuXHRzdGFnZURhdGE6IFN0YWdlRGF0YTtcclxuXHJcblx0LyoqXHJcblx0ICogIERhdGEgb2YgZXZlcnkgc2xpZGVcclxuXHQgKi9cclxuICBzbGlkZXNEYXRhOiBTbGlkZU1vZGVsW107XHJcblxyXG4gIC8qKlxyXG5cdCAqIERhdGEgb2YgbmF2aWdhdGlvbiBibG9ja1xyXG5cdCAqL1xyXG5cdG5hdkRhdGE6IE5hdkRhdGE7XHJcblxyXG5cdC8qKlxyXG5cdCAqIERhdGEgb2YgZG90cyBibG9ja1xyXG5cdCAqL1xyXG4gIGRvdHNEYXRhOiBEb3RzRGF0YTtcclxuXHJcbiAgLyoqXHJcbiAgICogRGF0YSwgd2ljaCBhcmUgcGFzc2VkIG91dCBvZiBjYXJvdXNlbCBhZnRlciBlbmRpbmcgb2YgdHJhbnNpb25pbmcgb2YgY2Fyb3VzZWxcclxuICAgKi9cclxuICBzbGlkZXNPdXRwdXREYXRhOiBTbGlkZXNPdXRwdXREYXRhO1xyXG5cclxuICAvKipcclxuICAgKiBTaG93cyB3aGV0aGVyIGNhcm91c2VsIGlzIGxvYWRlZCBvZiBub3QuXHJcbiAgICovXHJcbiAgY2Fyb3VzZWxMb2FkZWQgPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVXNlcidzIG9wdGlvbnNcclxuICAgKi9cclxuICBASW5wdXQoKSBvcHRpb25zOiBPd2xPcHRpb25zO1xyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZhYmxlIGZvciBnZXR0aW5nIGN1cnJlbnQgVmlldyBTZXR0aW5nc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgX3ZpZXdDdXJTZXR0aW5ncyQ6IE9ic2VydmFibGU8Q2Fyb3VzZWxDdXJyZW50RGF0YT47XHJcblxyXG4gIC8qKlxyXG4gICAqIE9ic2VydmFibGUgZm9yIGNhdGNoaW5nIHRoZSBlbmQgb2YgdHJhbnNpdGlvbiBvZiBjYXJvdXNlbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3RyYW5zbGF0ZWRDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPjtcclxuXHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2YWJsZSBmb3IgY2F0Y2hpbmcgdGhlIHN0YXJ0IG9mIGRyYWdnaW5nIG9mIHRoZSBjYXJvdXNlbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2RyYWdnaW5nQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz47XHJcblxyXG4gIC8qKlxyXG4gICAqIE9ic2VydmFibGUgZm9yIG1lcmdpbmcgYWxsIE9ic2VydmFibGVzIGFuZCBjcmVhdGluZyBvbmUgc3Vic2NyaXB0aW9uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfY2Fyb3VzZWxNZXJnZSQ6IE9ic2VydmFibGU8Q2Fyb3VzZWxDdXJyZW50RGF0YSB8IHN0cmluZz47XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcclxuICAgIHByaXZhdGUgcmVzaXplU2VydmljZTogUmVzaXplU2VydmljZSxcclxuICAgIHByaXZhdGUgY2Fyb3VzZWxTZXJ2aWNlOiBDYXJvdXNlbFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIG5hdmlnYXRpb25TZXJ2aWNlOiBOYXZpZ2F0aW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgYXV0b3BsYXlTZXJ2aWNlOiBBdXRvcGxheVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGxhenlMb2FkU2VydmljZTogTGF6eUxvYWRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBhbmltYXRlU2VydmljZTogQW5pbWF0ZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGF1dG9IZWlnaHRTZXJ2aWNlOiBBdXRvSGVpZ2h0U2VydmljZSxcclxuICAgIHByaXZhdGUgaGFzaFNlcnZpY2U6IEhhc2hTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuc3B5RGF0YVN0cmVhbXMoKTtcclxuXHJcbiAgICB0aGlzLmNhcm91c2VsV2luZG93V2lkdGggPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgJy5vd2wtY2Fyb3VzZWwnXHJcbiAgICApLmNsaWVudFdpZHRoO1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xyXG4gIH1cclxuICAvLyBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSBFTkRcclxuXHJcbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG4gICAgaWYgKHRoaXMuc2xpZGVzLnRvQXJyYXkoKS5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dXAodGhpcy5jYXJvdXNlbFdpbmRvd1dpZHRoLCB0aGlzLnNsaWRlcy50b0FycmF5KCksIHRoaXMub3B0aW9ucyk7XHJcbiAgICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmluaXRpYWxpemUodGhpcy5zbGlkZXMudG9BcnJheSgpKTtcclxuXHJcbiAgICAgIHRoaXMuX3dpblJlc2l6ZVdhdGNoZXIoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGBUaGVyZSdzIG5vIHNsaWRlcyB0byBzaG93LiBTbyBjYXJvdXNlbCBkaWRuJ3QgZ2V0IHJlbmRlcmVkYCk7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICBpZiAodGhpcy5yZXNpemVTdWJzY3JpcHRpb24pIHtcclxuICAgICAgdGhpcy5yZXNpemVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9hbGxPYnNlcnZTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEpvaW5zIHRoZSBvYnNlcnZhYmxlIGxvZ2luIGluIG9uZSBwbGFjZTogc2V0cyB2YWx1ZXMgdG8gc29tZSBvYnNlcnZhYmxlcywgbWVyZ2VzIHRoaXMgb2JzZXJ2YWJsZXMgYW5kXHJcbiAgICogc3ViY3JpYmVzIHRvIG1lcmdlIGZ1bmNcclxuICAgKi9cclxuICBzcHlEYXRhU3RyZWFtcygpIHtcclxuICAgIHRoaXMuX3ZpZXdDdXJTZXR0aW5ncyQgPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRWaWV3Q3VyU2V0dGluZ3MoKS5waXBlKFxyXG4gICAgICB0YXAoZGF0YSA9PiB7XHJcbiAgICAgICAgdGhpcy5vd2xET01EYXRhID0gZGF0YS5vd2xET01EYXRhO1xyXG4gICAgICAgIHRoaXMuc3RhZ2VEYXRhID0gZGF0YS5zdGFnZURhdGE7XHJcbiAgICAgICAgdGhpcy5zbGlkZXNEYXRhID0gZGF0YS5zbGlkZXNEYXRhO1xyXG4gICAgICAgIGlmICghdGhpcy5jYXJvdXNlbExvYWRlZCkge1xyXG4gICAgICAgICAgdGhpcy5jYXJvdXNlbExvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubmF2RGF0YSA9IGRhdGEubmF2RGF0YTtcclxuICAgICAgICB0aGlzLmRvdHNEYXRhID0gZGF0YS5kb3RzRGF0YTtcclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5fdHJhbnNsYXRlZENhcm91c2VsJCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldFRyYW5zbGF0ZWRTdGF0ZSgpLnBpcGUoXHJcbiAgICAgIHRhcCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5nYXRoZXJUcmFuc2xhdGVkRGF0YSgpO1xyXG4gICAgICAgIHRoaXMudHJhbnNsYXRlZC5lbWl0KHRoaXMuc2xpZGVzT3V0cHV0RGF0YSk7XHJcbiAgICAgICAgdGhpcy5zbGlkZXNPdXRwdXREYXRhID0ge307XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuX2RyYWdnaW5nQ2Fyb3VzZWwkID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0RHJhZ1N0YXRlKCkucGlwZShcclxuICAgICAgdGFwKCgpID0+IHtcclxuICAgICAgICB0aGlzLmRyYWdnaW5nLmVtaXQodHJ1ZSk7XHJcbiAgICAgIH0pLFxyXG4gICAgICBzd2l0Y2hNYXAoXHJcbiAgICAgICAgKCkgPT4gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0VHJhbnNsYXRlZFN0YXRlKCkucGlwZShcclxuICAgICAgICAgIGZpcnN0KCksXHJcbiAgICAgICAgICB0YXAoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmRyYWdnaW5nLmVtaXQoZmFsc2UpO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICApXHJcbiAgICAgIClcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5fY2Fyb3VzZWxNZXJnZSQgPSBtZXJnZSh0aGlzLl92aWV3Q3VyU2V0dGluZ3MkLCB0aGlzLl90cmFuc2xhdGVkQ2Fyb3VzZWwkLCB0aGlzLl9kcmFnZ2luZ0Nhcm91c2VsJCk7XHJcbiAgICB0aGlzLl9hbGxPYnNlcnZTdWJzY3JpcHRpb24gPSB0aGlzLl9jYXJvdXNlbE1lcmdlJC5zdWJzY3JpYmUoKCkgPT4ge30pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdCBzdWJzY3JpcHRpb24gdG8gcmVzaXplIGV2ZW50IGFuZCBhdHRhY2hlcyBoYW5kbGVyIGZvciB0aGlzIGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfd2luUmVzaXplV2F0Y2hlcigpIHtcclxuICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLmNhcm91c2VsU2VydmljZS5fb3B0aW9ucy5yZXNwb25zaXZlKS5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5yZXNpemVTdWJzY3JpcHRpb24gPSB0aGlzLnJlc2l6ZVNlcnZpY2Uub25SZXNpemUkXHJcbiAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICBmaWx0ZXIoKCkgPT4gdGhpcy5jYXJvdXNlbFdpbmRvd1dpZHRoICE9PSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLm93bC1jYXJvdXNlbCcpLmNsaWVudFdpZHRoKSxcclxuICAgICAgICAgIGRlbGF5KHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLnJlc3BvbnNpdmVSZWZyZXNoUmF0ZSlcclxuICAgICAgICApXHJcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmNhcm91c2VsU2VydmljZS5vblJlc2l6ZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLm93bC1jYXJvdXNlbCcpLmNsaWVudFdpZHRoKTtcclxuICAgICAgICAgIHRoaXMuY2Fyb3VzZWxXaW5kb3dXaWR0aCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcub3dsLWNhcm91c2VsJykuY2xpZW50V2lkdGg7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGVyIGZvciB0cmFuc2l0aW9lbmQgZXZlbnRcclxuICAgKi9cclxuICBvblRyYW5zaXRpb25FbmQoKSB7XHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5vblRyYW5zaXRpb25FbmQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhbmRsZXIgZm9yIGNsaWNrIGV2ZW50LCBhdHRhY2hlZCB0byBuZXh0IGJ1dHRvblxyXG4gICAqL1xyXG4gIG5leHQoKSB7XHJcbiAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLm5leHQodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MubmF2U3BlZWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlciBmb3IgY2xpY2sgZXZlbnQsIGF0dGFjaGVkIHRvIHByZXYgYnV0dG9uXHJcbiAgICovXHJcbiAgcHJldigpIHtcclxuICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UucHJldih0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5uYXZTcGVlZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGVyIGZvciBjbGljayBldmVudCwgYXR0YWNoZWQgdG8gZG90c1xyXG4gICAqL1xyXG4gIG1vdmVCeURvdChkb3RJZDogc3RyaW5nKSB7XHJcbiAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLm1vdmVCeURvdChkb3RJZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiByZXdpbmRzIGNhcm91c2VsIHRvIHNsaWRlIHdpdGggbmVlZGVkIGlkXHJcbiAgICogQHBhcmFtIGlkIGZyYWdtZW50IG9mIHVybFxyXG4gICAqL1xyXG4gIHRvKGlkOiBzdHJpbmcpIHtcclxuICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UudG9TbGlkZUJ5SWQoaWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2F0aGVycyBhbmQgcHJlcGFyZXMgZGF0YSBpbnRlbmRlZCBmb3IgcGFzc2luZyB0byB0aGUgdXNlciBieSBtZWFucyBvZiBmaXJpbmcgZXZlbnQgdHJhbnNsYXRlZENhcm91c2VsXHJcbiAgICovXHJcbiAgZ2F0aGVyVHJhbnNsYXRlZERhdGEoKSB7XHJcbiAgICBsZXQgc3RhcnRQb3NpdGlvbjogbnVtYmVyO1xyXG4gICAgY29uc3QgY2xvbmVkSWRQcmVmaXggPSB0aGlzLmNhcm91c2VsU2VydmljZS5jbG9uZWRJZFByZWZpeDtcclxuICAgIGNvbnN0IGFjdGl2ZVNsaWRlczogU2xpZGVNb2RlbFtdID0gdGhpcy5zbGlkZXNEYXRhXHJcbiAgICAgIC5maWx0ZXIoc2xpZGUgPT4gc2xpZGUuaXNBY3RpdmUgPT09IHRydWUpXHJcbiAgICAgIC5tYXAoc2xpZGUgPT4ge1xyXG4gICAgICAgIGNvbnN0IGlkID0gc2xpZGUuaWQuaW5kZXhPZihjbG9uZWRJZFByZWZpeCkgPj0gMCA/IHNsaWRlLmlkLnNsaWNlKGNsb25lZElkUHJlZml4Lmxlbmd0aCkgOiBzbGlkZS5pZDtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgaWQ6IGlkLFxyXG4gICAgICAgICAgd2lkdGg6IHNsaWRlLndpZHRoLFxyXG4gICAgICAgICAgbWFyZ2luTDogc2xpZGUubWFyZ2luTCxcclxuICAgICAgICAgIG1hcmdpblI6IHNsaWRlLm1hcmdpblIsXHJcbiAgICAgICAgICBjZW50ZXI6IHNsaWRlLmlzQ2VudGVyZWRcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgc3RhcnRQb3NpdGlvbiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnJlbGF0aXZlKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmN1cnJlbnQoKSk7XHJcbiAgICB0aGlzLnNsaWRlc091dHB1dERhdGEgPSB7XHJcbiAgICAgIHN0YXJ0UG9zaXRpb246IHN0YXJ0UG9zaXRpb24sXHJcbiAgICAgIHNsaWRlczogYWN0aXZlU2xpZGVzXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdGFydHMgcGF1c2luZ1xyXG4gICAqL1xyXG4gIHN0YXJ0UGF1c2luZygpIHtcclxuICAgIHRoaXMuYXV0b3BsYXlTZXJ2aWNlLnN0YXJ0UGF1c2luZygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnRzIHBsYXlpbmcgYWZ0ZXIgbW91c2UgbGVhdmVzIGNhcm91c2VsXHJcbiAgICovXHJcbiAgc3RhcnRQbGF5TUwoKSB7XHJcbiAgICB0aGlzLmF1dG9wbGF5U2VydmljZS5zdGFydFBsYXlpbmdNb3VzZUxlYXZlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdGFydHMgcGxheWluZyBhZnRlciB0b3VjaCBlbmRzXHJcbiAgICovXHJcbiAgc3RhcnRQbGF5VEUoKSB7XHJcbiAgICB0aGlzLmF1dG9wbGF5U2VydmljZS5zdGFydFBsYXlpbmdUb3VjaEVuZCgpO1xyXG4gIH1cclxuXHJcbn1cclxuIl19