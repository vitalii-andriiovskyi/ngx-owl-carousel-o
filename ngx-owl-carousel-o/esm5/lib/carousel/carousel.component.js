/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Output, Directive, QueryList, ContentChildren, TemplateRef, ElementRef, EventEmitter, HostListener, Inject } from '@angular/core';
import { merge, of, from } from 'rxjs';
import { ResizeService } from '../services/resize.service';
import { tap, delay, filter, switchMap, first, map, skip, take, toArray } from 'rxjs/operators';
import { CarouselService, CarouselCurrentData } from '../services/carousel.service';
import { NavigationService } from '../services/navigation.service';
import { AutoplayService } from '../services/autoplay.service';
import { LazyLoadService } from '../services/lazyload.service';
import { AnimateService } from '../services/animate.service';
import { AutoHeightService } from '../services/autoheight.service';
import { HashService } from '../services/hash.service';
import { OwlLogger } from '../services/logger.service';
import { DOCUMENT } from '../services/document-ref.service';
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
        get: function () { return this._dataMerge; },
        set: function (data) {
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
    CarouselSlideDirective.prototype.isNumeric = function (number) {
        return !isNaN(parseFloat(number));
    };
    CarouselSlideDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    __decorate([
        Input()
    ], CarouselSlideDirective.prototype, "id", void 0);
    __decorate([
        Input()
    ], CarouselSlideDirective.prototype, "dataMerge", null);
    __decorate([
        Input()
    ], CarouselSlideDirective.prototype, "width", void 0);
    __decorate([
        Input()
    ], CarouselSlideDirective.prototype, "dotContent", void 0);
    __decorate([
        Input()
    ], CarouselSlideDirective.prototype, "dataHash", void 0);
    CarouselSlideDirective = __decorate([
        Directive({ selector: 'ng-template[carouselSlide]' })
    ], CarouselSlideDirective);
    return CarouselSlideDirective;
}());
export { CarouselSlideDirective };
/**
 * Data which will be passed out after ending of transition of carousel
 */
var /**
 * Data which will be passed out after ending of transition of carousel
 */
SlidesOutputData = /** @class */ (function () {
    /**
     * Data which will be passed out after ending of transition of carousel
     */
    function SlidesOutputData() {
    }
    return SlidesOutputData;
}());
export { SlidesOutputData };
;
var CarouselComponent = /** @class */ (function () {
    function CarouselComponent(el, resizeService, carouselService, navigationService, autoplayService, lazyLoadService, animateService, autoHeightService, hashService, logger, changeDetectorRef, docRef) {
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
        this.changeDetectorRef = changeDetectorRef;
        this.translated = new EventEmitter();
        this.dragging = new EventEmitter();
        this.change = new EventEmitter();
        this.changed = new EventEmitter();
        this.initialized = new EventEmitter();
        /**
           *  Data of every slide
           */
        this.slidesData = [];
        /**
         * Shows whether carousel is loaded of not.
         */
        this.carouselLoaded = false;
        this.docRef = docRef;
    }
    CarouselComponent.prototype.onVisibilityChange = function (ev) {
            return;
        switch (this.docRef.visibilityState) {
            case 'visible':
                this.autoplayService.play();
                break;
            case 'hidden':
                this.autoplayService.stop();
                break;
            default:
                break;
        }
    };
    ;
    CarouselComponent.prototype.ngOnInit = function () {
        this.spyDataStreams();
        this.carouselWindowWidth = this.el.nativeElement.querySelector('.owl-carousel').clientWidth;
    };
    CarouselComponent.prototype.ngAfterContentChecked = function () {
    };
    // ngAfterContentChecked() END
    CarouselComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        if (this.slides.toArray().length) {
            this.carouselService.setup(this.carouselWindowWidth, this.slides.toArray(), this.options);
            this.carouselService.initialize(this.slides.toArray());
            this._winResizeWatcher();
        }
        else {
            this.logger.log("There are no slides to show. So the carousel won't be rendered");
        }
        this._slidesChangesSubscription = this.slides.changes.pipe(tap((/**
         * @param {?} slides
         * @return {?}
         */
        function (slides) {
            if (slides.toArray().length) {
                // this.carouselService.setItems(slides.toArray());
                _this.carouselService.setup(_this.carouselWindowWidth, slides.toArray(), _this.options);
                _this.carouselService.initialize(slides.toArray());
            }
            else {
                _this.carouselLoaded = false;
                _this.logger.log("There are no slides to show. So the carousel won't be re-rendered");
            }
        }))).subscribe((/**
         * @return {?}
         */
        function () { }));
    };
    CarouselComponent.prototype.ngOnDestroy = function () {
        if (this.resizeSubscription) {
            this.resizeSubscription.unsubscribe();
        }
        if (this._slidesChangesSubscription) {
            this._slidesChangesSubscription.unsubscribe();
        }
        if (this._allObservSubscription) {
            this._allObservSubscription.unsubscribe();
        }
    };
    /**
     * Joins the observable login in one place: sets values to some observables, merges this observables and
     * subcribes to merge func
     */
    CarouselComponent.prototype.spyDataStreams = function () {
        var _this = this;
        this._viewCurSettings$ = this.carouselService.getViewCurSettings().pipe(tap((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            _this.owlDOMData = data.owlDOMData;
            _this.stageData = data.stageData;
            _this.slidesData = data.slidesData;
            if (!_this.carouselLoaded) {
                _this.carouselLoaded = true;
            }
            _this.navData = data.navData;
            _this.dotsData = data.dotsData;
        })));
        this._initializedCarousel$ = this.carouselService.getInitializedState().pipe(tap((/**
         * @return {?}
         */
        function () {
            _this.gatherTranslatedData();
            _this.initialized.emit(_this.slidesOutputData);
            // this.slidesOutputData = {};
        })));
        this._translatedCarousel$ = this.carouselService.getTranslatedState().pipe(tap((/**
         * @return {?}
         */
        function () {
            _this.gatherTranslatedData();
            _this.translated.emit(_this.slidesOutputData);
            // this.slidesOutputData = {};
        })));
        this._changeCarousel$ = this.carouselService.getChangeState().pipe(tap((/**
         * @return {?}
         */
        function () {
            _this.gatherTranslatedData();
            _this.change.emit(_this.slidesOutputData);
            // this.slidesOutputData = {};
        })));
        this._changedCarousel$ = this.carouselService.getChangeState().pipe(switchMap((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var changedPosition = of(value).pipe(filter((/**
             * @return {?}
             */
            function () { return value.property.name === 'position'; })), switchMap((/**
             * @return {?}
             */
            function () { return from(_this.slidesData); })), skip(value.property.value), take(_this.carouselService.settings.items), map((/**
             * @param {?} slide
             * @return {?}
             */
            function (slide) {
                /** @type {?} */
                var clonedIdPrefix = _this.carouselService.clonedIdPrefix;
                var id = slide.id.indexOf(clonedIdPrefix) >= 0 ? slide.id.slice(clonedIdPrefix.length) : slide.id;
                return tslib_1.__assign({}, slide, { id: id, isActive: true });
            })), toArray(), map((/**
             * @param {?} slides
             * @return {?}
             */
            function (slides) {
                return {
                    slides: slides,
                    startPosition: _this.carouselService.relative(value.property.value)
                };
            })));
            // const changedSetting: Observable<SlidesOutputData> = of(value).pipe(
            //   filter(() => value.property.name === 'settings'),
            //   map(() => {
            //     return {
            //       slides: [],
            //       startPosition: this.carouselService.relative(value.property.value)
            //     }
            //   })
            // )
            return merge(changedPosition);
        })), tap((/**
         * @param {?} slidesData
         * @return {?}
         */
        function (slidesData) {
            _this.gatherTranslatedData();
            _this.changed.emit(slidesData.slides.length ? slidesData : _this.slidesOutputData);
            // console.log(this.slidesOutputData);
            // this.slidesOutputData = {};
        })));
        this._draggingCarousel$ = this.carouselService.getDragState().pipe(tap((/**
         * @return {?}
         */
        function () {
            _this.gatherTranslatedData();
            _this.dragging.emit({ dragging: true, data: _this.slidesOutputData });
        })), switchMap((/**
         * @return {?}
         */
        function () { return _this.carouselService.getDraggedState().pipe(map((/**
         * @return {?}
         */
        function () { return !!_this.carouselService.is('animating'); }))); })), switchMap((/**
         * @param {?} anim
         * @return {?}
         */
        function (anim) {
            if (anim) {
                return _this.carouselService.getTranslatedState().pipe(first());
            }
            else {
                return of('not animating');
            }
        })), tap((/**
         * @return {?}
         */
        function () {
            _this.dragging.emit({ dragging: false, data: _this.slidesOutputData });
        })));
        this._carouselMerge$ = merge(this._viewCurSettings$, this._translatedCarousel$, this._draggingCarousel$, this._changeCarousel$, this._changedCarousel$, this._initializedCarousel$);
        this._allObservSubscription = this._carouselMerge$.subscribe((/**
         * @return {?}
         */
        function () { }));
    };
    /**
     * Init subscription to resize event and attaches handler for this event
     */
    /**
     * Init subscription to resize event and attaches handler for this event
     * @private
     * @return {?}
     */
    CarouselComponent.prototype._winResizeWatcher = /**
     * Init subscription to resize event and attaches handler for this event
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (Object.keys(this.carouselService._options.responsive).length) {
            this.resizeSubscription = this.resizeService.onResize$
                .pipe(filter((/**
             * @return {?}
             */
            function () { return _this.carouselWindowWidth !== _this.el.nativeElement.querySelector('.owl-carousel').clientWidth; })), delay(this.carouselService.settings.responsiveRefreshRate))
                .subscribe((/**
             * @return {?}
             */
            function () {
                _this.carouselService.onResize(_this.el.nativeElement.querySelector('.owl-carousel').clientWidth);
                _this.carouselWindowWidth = _this.el.nativeElement.querySelector('.owl-carousel').clientWidth;
            }));
        }
    };
    /**
     * Handler for transitioend event
     */
    CarouselComponent.prototype.onTransitionEnd = function () {
        this.carouselService.onTransitionEnd();
    };
    /**
     * Handler for click event, attached to next button
     */
    CarouselComponent.prototype.next = function () {
        if (!this.carouselLoaded)
            return;
        this.navigationService.next(this.carouselService.settings.navSpeed);
    };
    /**
     * Handler for click event, attached to prev button
     */
    CarouselComponent.prototype.prev = function () {
        if (!this.carouselLoaded)
            return;
        this.navigationService.prev(this.carouselService.settings.navSpeed);
    };
    /**
     * Handler for click event, attached to dots
     */
    CarouselComponent.prototype.moveByDot = function (dotId) {
        if (!this.carouselLoaded)
            return;
        this.navigationService.moveByDot(dotId);
    };
    /**
     * rewinds carousel to slide with needed id
     * @param id fragment of url
     */
    CarouselComponent.prototype.to = function (id) {
        // if (!this.carouselLoaded || ((this.navData && this.navData.disabled) && (this.dotsData && this.dotsData.disabled))) return;
        if (!this.carouselLoaded)
            return;
        this.navigationService.toSlideById(id);
    };
    /**
     * Gathers and prepares data intended for passing to the user by means of firing event translatedCarousel
     */
    CarouselComponent.prototype.gatherTranslatedData = function () {
        var startPosition;
        var clonedIdPrefix = this.carouselService.clonedIdPrefix;
        var activeSlides = this.slidesData
            .filter((/**
         * @param {?} slide
         * @return {?}
         */
        function (slide) { return slide.isActive === true; }))
            .map((/**
         * @param {?} slide
         * @return {?}
         */
        function (slide) {
            /** @type {?} */
            var id = slide.id.indexOf(clonedIdPrefix) >= 0 ? slide.id.slice(clonedIdPrefix.length) : slide.id;
            return {
                id: id,
                width: slide.width,
                marginL: slide.marginL,
                marginR: slide.marginR,
                center: slide.isCentered
            };
        }));
        startPosition = this.carouselService.relative(this.carouselService.current());
        this.slidesOutputData = {
            startPosition: startPosition,
            slides: activeSlides
        };
    };
    /**
     * Starts pausing
     */
    CarouselComponent.prototype.startPausing = function () {
        this.autoplayService.startPausing();
    };
    /**
     * Starts playing after mouse leaves carousel
     */
    CarouselComponent.prototype.startPlayML = function () {
        this.autoplayService.startPlayingMouseLeave();
    };
    /**
     * Starts playing after touch ends
     */
    CarouselComponent.prototype.startPlayTE = function () {
        this.autoplayService.startPlayingTouchEnd();
    };
    CarouselComponent.ctorParameters = function () { return [
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
        { type: ChangeDetectorRef },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    __decorate([
        ContentChildren(CarouselSlideDirective)
    ], CarouselComponent.prototype, "slides", void 0);
    __decorate([
        Output()
    ], CarouselComponent.prototype, "translated", void 0);
    __decorate([
        Output()
    ], CarouselComponent.prototype, "dragging", void 0);
    __decorate([
        Output()
    ], CarouselComponent.prototype, "change", void 0);
    __decorate([
        Output()
    ], CarouselComponent.prototype, "changed", void 0);
    __decorate([
        Output()
    ], CarouselComponent.prototype, "initialized", void 0);
    __decorate([
        Input()
    ], CarouselComponent.prototype, "options", void 0);
    __decorate([
        HostListener('document:visibilitychange', ['$event'])
    ], CarouselComponent.prototype, "onVisibilityChange", null);
    CarouselComponent = __decorate([
        Component({
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
        }),
        __param(11, Inject(DOCUMENT))
    ], CarouselComponent);
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
    /** @type {?} */
    CarouselComponent.prototype.change;
    /** @type {?} */
    CarouselComponent.prototype.changed;
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
     * @private
     */
    CarouselComponent.prototype._allObservSubscription;
    /**
     * Subscription to `this.slides.changes().
     * It could be included in 'this._allObservSubscription', but that subcription get created during the initializing of component
     * and 'this.slides' are undefined at that moment. So it's needed to wait for initialization of content.
     * @type {?}
     * @private
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
     * @private
     */
    CarouselComponent.prototype._viewCurSettings$;
    /**
     * Observable for catching the end of transition of carousel
     * @type {?}
     * @private
     */
    CarouselComponent.prototype._translatedCarousel$;
    /**
     * Observable for catching the start of dragging of the carousel
     * @type {?}
     * @private
     */
    CarouselComponent.prototype._draggingCarousel$;
    /**
     * Observable for catching the start of changing of the carousel
     * @type {?}
     * @private
     */
    CarouselComponent.prototype._changeCarousel$;
    /**
     * Observable for catching the moment when the data about slides changed, more exactly when the position changed.
     * @type {?}
     * @private
     */
    CarouselComponent.prototype._changedCarousel$;
    /**
     * Observable for catching the initialization of changing the carousel
     * @type {?}
     * @private
     */
    CarouselComponent.prototype._initializedCarousel$;
    /**
     * Observable for merging all Observables and creating one subscription
     * @type {?}
     * @private
     */
    CarouselComponent.prototype._carouselMerge$;
    /**
     * @type {?}
     * @private
     */
    CarouselComponent.prototype.docRef;
    /**
     * @type {?}
     * @private
     */
    CarouselComponent.prototype.el;
    /**
     * @type {?}
     * @private
     */
    CarouselComponent.prototype.resizeService;
    /**
     * @type {?}
     * @private
     */
    CarouselComponent.prototype.carouselService;
    /**
     * @type {?}
     * @private
     */
    CarouselComponent.prototype.navigationService;
    /**
     * @type {?}
     * @private
     */
    CarouselComponent.prototype.autoplayService;
    /**
     * @type {?}
     * @private
     */
    CarouselComponent.prototype.lazyLoadService;
    /**
     * @type {?}
     * @private
     */
    CarouselComponent.prototype.animateService;
    /**
     * @type {?}
     * @private
     */
    CarouselComponent.prototype.autoHeightService;
    /**
     * @type {?}
     * @private
     */
    CarouselComponent.prototype.hashService;
    /**
     * @type {?}
     * @private
     */
    CarouselComponent.prototype.logger;
    /* Skipping unhandled member: ;*/
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW93bC1jYXJvdXNlbC1vLyIsInNvdXJjZXMiOlsibGliL2Nhcm91c2VsL2Nhcm91c2VsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBSVQsS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNULGVBQWUsRUFDZixXQUFXLEVBQ1gsVUFBVSxFQUVWLFlBQVksRUFDWixZQUFZLEVBQ1osTUFBTSxFQUNQLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBNEIsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFakUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzNELE9BQU8sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2hHLE9BQU8sRUFBRSxlQUFlLEVBQXVCLE1BQU0sOEJBQThCLENBQUM7QUFNcEYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbkUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbkUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsUUFBUSxF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QXNDOzs7OztJQUN0Qyw4Q0FBNEM7Ozs7O0lBQzVDLHdDQUFnQzs7Ozs7SUFDaEMsbUNBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgT25Jbml0LFxyXG4gIEFmdGVyQ29udGVudENoZWNrZWQsXHJcbiAgT25EZXN0cm95LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBEaXJlY3RpdmUsXHJcbiAgUXVlcnlMaXN0LFxyXG4gIENvbnRlbnRDaGlsZHJlbixcclxuICBUZW1wbGF0ZVJlZixcclxuICBFbGVtZW50UmVmLFxyXG4gIEFmdGVyQ29udGVudEluaXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIEhvc3RMaXN0ZW5lcixcclxuICBJbmplY3RcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgT2JzZXJ2YWJsZSwgbWVyZ2UsIG9mLCBmcm9tIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBSZXNpemVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvcmVzaXplLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyB0YXAsIGRlbGF5LCBmaWx0ZXIsIHN3aXRjaE1hcCwgZmlyc3QsIG1hcCwgc2tpcCwgdGFrZSwgdG9BcnJheSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgQ2Fyb3VzZWxTZXJ2aWNlLCBDYXJvdXNlbEN1cnJlbnREYXRhIH0gZnJvbSAnLi4vc2VydmljZXMvY2Fyb3VzZWwuc2VydmljZSc7XHJcbmltcG9ydCB7IFN0YWdlRGF0YSB9IGZyb20gXCIuLi9tb2RlbHMvc3RhZ2UtZGF0YS5tb2RlbFwiO1xyXG5pbXBvcnQgeyBPd2xET01EYXRhIH0gZnJvbSBcIi4uL21vZGVscy9vd2xET00tZGF0YS5tb2RlbFwiO1xyXG5pbXBvcnQgeyBTbGlkZU1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL3NsaWRlLm1vZGVsJztcclxuaW1wb3J0IHsgT3dsT3B0aW9ucyB9IGZyb20gJy4uL21vZGVscy9vd2wtb3B0aW9ucy5tb2RlbCc7XHJcbmltcG9ydCB7IE5hdkRhdGEsIERvdHNEYXRhIH0gZnJvbSAnLi4vbW9kZWxzL25hdmlnYXRpb24tZGF0YS5tb2RlbHMnO1xyXG5pbXBvcnQgeyBOYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25hdmlnYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IEF1dG9wbGF5U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2F1dG9wbGF5LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBMYXp5TG9hZFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9sYXp5bG9hZC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQW5pbWF0ZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9hbmltYXRlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBdXRvSGVpZ2h0U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2F1dG9oZWlnaHQuc2VydmljZSc7XHJcbmltcG9ydCB7IEhhc2hTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvaGFzaC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgT3dsTG9nZ2VyIH0gZnJvbSAnLi4vc2VydmljZXMvbG9nZ2VyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJy4uL3NlcnZpY2VzL2RvY3VtZW50LXJlZi5zZXJ2aWNlJztcclxuXHJcbmxldCBuZXh0SWQgPSAwO1xyXG5cclxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnbmctdGVtcGxhdGVbY2Fyb3VzZWxTbGlkZV0nIH0pXHJcbmV4cG9ydCBjbGFzcyBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlIHtcclxuICAvKipcclxuICAgKiBVbmlxdWUgc2xpZGUgaWRlbnRpZmllci4gTXVzdCBiZSB1bmlxdWUgZm9yIHRoZSBlbnRpcmUgZG9jdW1lbnQgZm9yIHByb3BlciBhY2Nlc3NpYmlsaXR5IHN1cHBvcnQuXHJcbiAgICogV2lsbCBiZSBhdXRvLWdlbmVyYXRlZCBpZiBub3QgcHJvdmlkZWQuXHJcbiAgICovXHJcbiAgQElucHV0KCkgaWQgPSBgb3dsLXNsaWRlLSR7bmV4dElkKyt9YDtcclxuXHJcbiAgLyoqXHJcbiAgICogRGVmaW5lcyBob3cgbXVjaCB3aWR0aHMgb2YgY29tbW9uIHNsaWRlIHdpbGwgY3VycmVudCBzbGlkZSBoYXZlXHJcbiAgICogZS5nLiBpZiBfbWVyZ2VEYXRhPTIsIHRoZSBzbGlkZSB3aWxsIHR3aWNlIHdpZGVyIHRoZW4gc2xpZGVzIHdpdGggX21lcmdlRGF0YT0xXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZGF0YU1lcmdlID0gMTtcclxuICBASW5wdXQoKVxyXG4gIHNldCBkYXRhTWVyZ2UoZGF0YTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLl9kYXRhTWVyZ2UgPSB0aGlzLmlzTnVtZXJpYyhkYXRhKSA/IGRhdGEgOiAxO1xyXG4gIH07XHJcbiAgZ2V0IGRhdGFNZXJnZSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fZGF0YU1lcmdlIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2lkdGggb2Ygc2xpZGVcclxuICAgKi9cclxuICBASW5wdXQoKSB3aWR0aCA9IDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIElubmVyIGNvbnRlbnQgb2YgZG90IGZvciBjZXJ0YWluIHNsaWRlOyBjYW4gYmUgaHRtbC1tYXJrdXBcclxuICAgKi9cclxuICBASW5wdXQoKSBkb3RDb250ZW50ID0gJyc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhc2ggKGZyYWdtZW50KSBvZiB1cmwgd2hpY2ggY29ycmVzcG9uZHMgdG8gY2VydGFpbiBzbGlkZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRhdGFIYXNoID0gJyc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0cGxSZWY6IFRlbXBsYXRlUmVmPGFueT4pIHt9XHJcblxyXG4gIC8qKlxyXG5cdCAqIERldGVybWluZXMgaWYgdGhlIGlucHV0IGlzIGEgTnVtYmVyIG9yIHNvbWV0aGluZyB0aGF0IGNhbiBiZSBjb2VyY2VkIHRvIGEgTnVtYmVyXHJcblx0ICogQHBhcmFtIC0gVGhlIGlucHV0IHRvIGJlIHRlc3RlZFxyXG5cdCAqIEByZXR1cm5zIC0gQW4gaW5kaWNhdGlvbiBpZiB0aGUgaW5wdXQgaXMgYSBOdW1iZXIgb3IgY2FuIGJlIGNvZXJjZWQgdG8gYSBOdW1iZXJcclxuXHQgKi9cclxuICBpc051bWVyaWMobnVtYmVyOiBhbnkpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiAhaXNOYU4ocGFyc2VGbG9hdChudW1iZXIpKTtcclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEYXRhIHdoaWNoIHdpbGwgYmUgcGFzc2VkIG91dCBhZnRlciBlbmRpbmcgb2YgdHJhbnNpdGlvbiBvZiBjYXJvdXNlbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNsaWRlc091dHB1dERhdGEge1xyXG4gIHN0YXJ0UG9zaXRpb24/OiBudW1iZXI7XHJcbiAgc2xpZGVzPzogU2xpZGVNb2RlbFtdO1xyXG59O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdvd2wtY2Fyb3VzZWwtbycsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgY2xhc3M9XCJvd2wtY2Fyb3VzZWwgb3dsLXRoZW1lXCIgI293bENhcm91c2VsXHJcbiAgICAgIFtuZ0NsYXNzXT1cInsnb3dsLXJ0bCc6IG93bERPTURhdGE/LnJ0bCxcclxuICAgICAgICAgICAgICAgICAgJ293bC1sb2FkZWQnOiBvd2xET01EYXRhPy5pc0xvYWRlZCxcclxuICAgICAgICAgICAgICAgICAgJ293bC1yZXNwb25zaXZlJzogb3dsRE9NRGF0YT8uaXNSZXNwb25zaXZlLFxyXG4gICAgICAgICAgICAgICAgICAnb3dsLWRyYWcnOiBvd2xET01EYXRhPy5pc01vdXNlRHJhZ2FibGUsXHJcbiAgICAgICAgICAgICAgICAgICdvd2wtZ3JhYic6IG93bERPTURhdGE/LmlzR3JhYn1cIlxyXG4gICAgICAobW91c2VvdmVyKT1cInN0YXJ0UGF1c2luZygpXCJcclxuICAgICAgKG1vdXNlbGVhdmUpPVwic3RhcnRQbGF5TUwoKVwiXHJcbiAgICAgICh0b3VjaHN0YXJ0KT1cInN0YXJ0UGF1c2luZygpXCJcclxuICAgICAgKHRvdWNoZW5kKT1cInN0YXJ0UGxheVRFKClcIj5cclxuXHJcbiAgICAgIDxkaXYgKm5nSWY9XCJjYXJvdXNlbExvYWRlZFwiIGNsYXNzPVwib3dsLXN0YWdlLW91dGVyXCI+XHJcbiAgICAgICAgPG93bC1zdGFnZSBbb3dsRHJhZ2dhYmxlXT1cInsnaXNNb3VzZURyYWdhYmxlJzogb3dsRE9NRGF0YT8uaXNNb3VzZURyYWdhYmxlLCAnaXNUb3VjaERyYWdhYmxlJzogb3dsRE9NRGF0YT8uaXNUb3VjaERyYWdhYmxlfVwiXHJcbiAgICAgICAgICAgICAgICAgICAgW3N0YWdlRGF0YV09XCJzdGFnZURhdGFcIlxyXG4gICAgICAgICAgICAgICAgICAgIFtzbGlkZXNEYXRhXT1cInNsaWRlc0RhdGFcIj48L293bC1zdGFnZT5cclxuICAgICAgPC9kaXY+IDwhLS0gLy5vd2wtc3RhZ2Utb3V0ZXIgLS0+XHJcbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJzbGlkZXMudG9BcnJheSgpLmxlbmd0aFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJvd2wtbmF2XCIgW25nQ2xhc3NdPVwieydkaXNhYmxlZCc6IG5hdkRhdGE/LmRpc2FibGVkfVwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm93bC1wcmV2XCIgW25nQ2xhc3NdPVwieydkaXNhYmxlZCc6IG5hdkRhdGE/LnByZXY/LmRpc2FibGVkfVwiIChjbGljayk9XCJwcmV2KClcIiBbaW5uZXJIVE1MXT1cIm5hdkRhdGE/LnByZXY/Lmh0bWxUZXh0XCI+PC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwib3dsLW5leHRcIiBbbmdDbGFzc109XCJ7J2Rpc2FibGVkJzogbmF2RGF0YT8ubmV4dD8uZGlzYWJsZWR9XCIgKGNsaWNrKT1cIm5leHQoKVwiIFtpbm5lckhUTUxdPVwibmF2RGF0YT8ubmV4dD8uaHRtbFRleHRcIj48L2Rpdj5cclxuICAgICAgICA8L2Rpdj4gPCEtLSAvLm93bC1uYXYgLS0+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm93bC1kb3RzXCIgW25nQ2xhc3NdPVwieydkaXNhYmxlZCc6IGRvdHNEYXRhPy5kaXNhYmxlZH1cIj5cclxuICAgICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGRvdCBvZiBkb3RzRGF0YT8uZG90c1wiIGNsYXNzPVwib3dsLWRvdFwiIFtuZ0NsYXNzXT1cInsnYWN0aXZlJzogZG90LmFjdGl2ZSwgJ293bC1kb3QtdGV4dCc6IGRvdC5zaG93SW5uZXJDb250ZW50fVwiIChjbGljayk9XCJtb3ZlQnlEb3QoZG90LmlkKVwiPlxyXG4gICAgICAgICAgICA8c3BhbiBbaW5uZXJIVE1MXT1cImRvdC5pbm5lckNvbnRlbnRcIj48L3NwYW4+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj4gPCEtLSAvLm93bC1kb3RzIC0tPlxyXG4gICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgIDwvZGl2PiA8IS0tIC8ub3dsLWNhcm91c2VsIG93bC1sb2FkZWQgLS0+XHJcbiAgYCxcclxuICBzdHlsZXM6IFtgLm93bC10aGVtZSB7IGRpc3BsYXk6IGJsb2NrOyB9YF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBOYXZpZ2F0aW9uU2VydmljZSxcclxuICAgIEF1dG9wbGF5U2VydmljZSxcclxuICAgIENhcm91c2VsU2VydmljZSxcclxuICAgIExhenlMb2FkU2VydmljZSxcclxuICAgIEFuaW1hdGVTZXJ2aWNlLFxyXG4gICAgQXV0b0hlaWdodFNlcnZpY2UsXHJcbiAgICBIYXNoU2VydmljZVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIENhcm91c2VsQ29tcG9uZW50XHJcbiAgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudENoZWNrZWQsIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XHJcbiAgQENvbnRlbnRDaGlsZHJlbihDYXJvdXNlbFNsaWRlRGlyZWN0aXZlKVxyXG4gIHNsaWRlczogUXVlcnlMaXN0PENhcm91c2VsU2xpZGVEaXJlY3RpdmU+O1xyXG5cclxuICBAT3V0cHV0KCkgdHJhbnNsYXRlZCA9IG5ldyBFdmVudEVtaXR0ZXI8U2xpZGVzT3V0cHV0RGF0YT4oKTtcclxuICBAT3V0cHV0KCkgZHJhZ2dpbmcgPSBuZXcgRXZlbnRFbWl0dGVyPHtkcmFnZ2luZzogYm9vbGVhbiwgZGF0YTogU2xpZGVzT3V0cHV0RGF0YX0+KCk7XHJcbiAgQE91dHB1dCgpIGNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8U2xpZGVzT3V0cHV0RGF0YT4oKTtcclxuICBAT3V0cHV0KCkgY2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8U2xpZGVzT3V0cHV0RGF0YT4oKTtcclxuICBAT3V0cHV0KCkgaW5pdGlhbGl6ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFNsaWRlc091dHB1dERhdGE+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdpZHRoIG9mIGNhcm91c2VsIHdpbmRvdyAodGFnIHdpdGggY2xhc3MgLm93bC1jYXJvdXNlbCksIGluIHdpY2ggd2UgY2FuIHNlZSBtb3Zpbmcgc2xpZGVyc1xyXG4gICAqL1xyXG4gIGNhcm91c2VsV2luZG93V2lkdGg6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaXB0aW9uIHRvICdyZXNpemUnIGV2ZW50XHJcbiAgICovXHJcbiAgcmVzaXplU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlwdGlvbiBtZXJnZSBPYnNlcnZhYmxlLCB3aGljaCBtZXJnZXMgYWxsIE9ic2VydmFibGVzIGluIHRoZSBjb21wb25lbnQgZXhjZXB0ICdyZXNpemUnIE9ic2VydmFibGUgYW5kIHRoaXMuc2xpZGVzLmNoYW5nZXMoKVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2FsbE9ic2VydlN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gdG8gYHRoaXMuc2xpZGVzLmNoYW5nZXMoKS5cclxuICAgKiBJdCBjb3VsZCBiZSBpbmNsdWRlZCBpbiAndGhpcy5fYWxsT2JzZXJ2U3Vic2NyaXB0aW9uJywgYnV0IHRoYXQgc3ViY3JpcHRpb24gZ2V0IGNyZWF0ZWQgZHVyaW5nIHRoZSBpbml0aWFsaXppbmcgb2YgY29tcG9uZW50XHJcbiAgICogYW5kICd0aGlzLnNsaWRlcycgYXJlIHVuZGVmaW5lZCBhdCB0aGF0IG1vbWVudC4gU28gaXQncyBuZWVkZWQgdG8gd2FpdCBmb3IgaW5pdGlhbGl6YXRpb24gb2YgY29udGVudC5cclxuICAgKi9cclxuICBwcml2YXRlIF9zbGlkZXNDaGFuZ2VzU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIEN1cnJlbnQgc2V0dGluZ3MgZm9yIHRoZSBjYXJvdXNlbC5cclxuICAgKi9cclxuICBvd2xET01EYXRhOiBPd2xET01EYXRhO1xyXG5cclxuICAvKipcclxuICAgKiBEYXRhIG9mIG93bC1zdGFnZVxyXG4gICAqL1xyXG5cdHN0YWdlRGF0YTogU3RhZ2VEYXRhO1xyXG5cclxuXHQvKipcclxuXHQgKiAgRGF0YSBvZiBldmVyeSBzbGlkZVxyXG5cdCAqL1xyXG4gIHNsaWRlc0RhdGE6IFNsaWRlTW9kZWxbXSA9IFtdO1xyXG5cclxuICAvKipcclxuXHQgKiBEYXRhIG9mIG5hdmlnYXRpb24gYmxvY2tcclxuXHQgKi9cclxuXHRuYXZEYXRhOiBOYXZEYXRhO1xyXG5cclxuXHQvKipcclxuXHQgKiBEYXRhIG9mIGRvdHMgYmxvY2tcclxuXHQgKi9cclxuICBkb3RzRGF0YTogRG90c0RhdGE7XHJcblxyXG4gIC8qKlxyXG4gICAqIERhdGEsIHdpY2ggYXJlIHBhc3NlZCBvdXQgb2YgY2Fyb3VzZWwgYWZ0ZXIgZW5kaW5nIG9mIHRyYW5zaW9uaW5nIG9mIGNhcm91c2VsXHJcbiAgICovXHJcbiAgc2xpZGVzT3V0cHV0RGF0YTogU2xpZGVzT3V0cHV0RGF0YTtcclxuXHJcbiAgLyoqXHJcbiAgICogU2hvd3Mgd2hldGhlciBjYXJvdXNlbCBpcyBsb2FkZWQgb2Ygbm90LlxyXG4gICAqL1xyXG4gIGNhcm91c2VsTG9hZGVkID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZXIncyBvcHRpb25zXHJcbiAgICovXHJcbiAgQElucHV0KCkgb3B0aW9uczogT3dsT3B0aW9ucztcclxuXHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2YWJsZSBmb3IgZ2V0dGluZyBjdXJyZW50IFZpZXcgU2V0dGluZ3NcclxuICAgKi9cclxuICBwcml2YXRlIF92aWV3Q3VyU2V0dGluZ3MkOiBPYnNlcnZhYmxlPENhcm91c2VsQ3VycmVudERhdGE+O1xyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZhYmxlIGZvciBjYXRjaGluZyB0aGUgZW5kIG9mIHRyYW5zaXRpb24gb2YgY2Fyb3VzZWxcclxuICAgKi9cclxuICBwcml2YXRlIF90cmFuc2xhdGVkQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz47XHJcblxyXG4gIC8qKlxyXG4gICAqIE9ic2VydmFibGUgZm9yIGNhdGNoaW5nIHRoZSBzdGFydCBvZiBkcmFnZ2luZyBvZiB0aGUgY2Fyb3VzZWxcclxuICAgKi9cclxuICBwcml2YXRlIF9kcmFnZ2luZ0Nhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+O1xyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZhYmxlIGZvciBjYXRjaGluZyB0aGUgc3RhcnQgb2YgY2hhbmdpbmcgb2YgdGhlIGNhcm91c2VsXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfY2hhbmdlQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz47XHJcblxyXG4gIC8qKlxyXG4gICAqIE9ic2VydmFibGUgZm9yIGNhdGNoaW5nIHRoZSBtb21lbnQgd2hlbiB0aGUgZGF0YSBhYm91dCBzbGlkZXMgY2hhbmdlZCwgbW9yZSBleGFjdGx5IHdoZW4gdGhlIHBvc2l0aW9uIGNoYW5nZWQuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfY2hhbmdlZENhcm91c2VsJDogT2JzZXJ2YWJsZTxhbnk+O1xyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZhYmxlIGZvciBjYXRjaGluZyB0aGUgaW5pdGlhbGl6YXRpb24gb2YgY2hhbmdpbmcgdGhlIGNhcm91c2VsXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfaW5pdGlhbGl6ZWRDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPjtcclxuXHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2YWJsZSBmb3IgbWVyZ2luZyBhbGwgT2JzZXJ2YWJsZXMgYW5kIGNyZWF0aW5nIG9uZSBzdWJzY3JpcHRpb25cclxuICAgKi9cclxuICBwcml2YXRlIF9jYXJvdXNlbE1lcmdlJDogT2JzZXJ2YWJsZTxDYXJvdXNlbEN1cnJlbnREYXRhIHwgc3RyaW5nPjtcclxuICBwcml2YXRlIGRvY1JlZjogRG9jdW1lbnQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcclxuICAgIHByaXZhdGUgcmVzaXplU2VydmljZTogUmVzaXplU2VydmljZSxcclxuICAgIHByaXZhdGUgY2Fyb3VzZWxTZXJ2aWNlOiBDYXJvdXNlbFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIG5hdmlnYXRpb25TZXJ2aWNlOiBOYXZpZ2F0aW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgYXV0b3BsYXlTZXJ2aWNlOiBBdXRvcGxheVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGxhenlMb2FkU2VydmljZTogTGF6eUxvYWRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBhbmltYXRlU2VydmljZTogQW5pbWF0ZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGF1dG9IZWlnaHRTZXJ2aWNlOiBBdXRvSGVpZ2h0U2VydmljZSxcclxuICAgIHByaXZhdGUgaGFzaFNlcnZpY2U6IEhhc2hTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBsb2dnZXI6IE93bExvZ2dlcixcclxuICAgIEBJbmplY3QoRE9DVU1FTlQpIGRvY1JlZjogYW55XHJcbiAgKSB7XHJcbiAgICB0aGlzLmRvY1JlZiA9IGRvY1JlZiBhcyBEb2N1bWVudDtcclxuXHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDp2aXNpYmlsaXR5Y2hhbmdlJywgWyckZXZlbnQnXSlcclxuICBvblZpc2liaWxpdHlDaGFuZ2UoZXY6IGFueSkge1xyXG4gICAgaWYgKCF0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hdXRvcGxheSkgcmV0dXJuO1xyXG4gICAgc3dpdGNoICh0aGlzLmRvY1JlZi52aXNpYmlsaXR5U3RhdGUpIHtcclxuICAgICAgY2FzZSAndmlzaWJsZSc6XHJcbiAgICAgICAgdGhpcy5hdXRvcGxheVNlcnZpY2UucGxheSgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAnaGlkZGVuJzpcclxuICAgICAgICB0aGlzLmF1dG9wbGF5U2VydmljZS5zdG9wKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuc3B5RGF0YVN0cmVhbXMoKTtcclxuXHJcbiAgICB0aGlzLmNhcm91c2VsV2luZG93V2lkdGggPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgJy5vd2wtY2Fyb3VzZWwnXHJcbiAgICApLmNsaWVudFdpZHRoO1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xyXG4gIH1cclxuICAvLyBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSBFTkRcclxuXHJcbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG4gICAgaWYgKHRoaXMuc2xpZGVzLnRvQXJyYXkoKS5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dXAodGhpcy5jYXJvdXNlbFdpbmRvd1dpZHRoLCB0aGlzLnNsaWRlcy50b0FycmF5KCksIHRoaXMub3B0aW9ucyk7XHJcbiAgICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmluaXRpYWxpemUodGhpcy5zbGlkZXMudG9BcnJheSgpKTtcclxuXHJcbiAgICAgIHRoaXMuX3dpblJlc2l6ZVdhdGNoZXIoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubG9nZ2VyLmxvZyhgVGhlcmUgYXJlIG5vIHNsaWRlcyB0byBzaG93LiBTbyB0aGUgY2Fyb3VzZWwgd29uJ3QgYmUgcmVuZGVyZWRgKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9zbGlkZXNDaGFuZ2VzU3Vic2NyaXB0aW9uID0gdGhpcy5zbGlkZXMuY2hhbmdlcy5waXBlKFxyXG4gICAgICB0YXAoKHNsaWRlcykgPT4ge1xyXG4gICAgICAgIGlmIChzbGlkZXMudG9BcnJheSgpLmxlbmd0aCkge1xyXG4gICAgICAgICAgLy8gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0SXRlbXMoc2xpZGVzLnRvQXJyYXkoKSk7XHJcbiAgICAgICAgICB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR1cCh0aGlzLmNhcm91c2VsV2luZG93V2lkdGgsIHNsaWRlcy50b0FycmF5KCksIHRoaXMub3B0aW9ucyk7XHJcbiAgICAgICAgICB0aGlzLmNhcm91c2VsU2VydmljZS5pbml0aWFsaXplKHNsaWRlcy50b0FycmF5KCkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmNhcm91c2VsTG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coYFRoZXJlIGFyZSBubyBzbGlkZXMgdG8gc2hvdy4gU28gdGhlIGNhcm91c2VsIHdvbid0IGJlIHJlLXJlbmRlcmVkYCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgKS5zdWJzY3JpYmUoKCk9Pnt9KTtcclxuXHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIGlmICh0aGlzLnJlc2l6ZVN1YnNjcmlwdGlvbikge1xyXG4gICAgICB0aGlzLnJlc2l6ZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLl9zbGlkZXNDaGFuZ2VzU3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgIHRoaXMuX3NsaWRlc0NoYW5nZXNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5fYWxsT2JzZXJ2U3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgIHRoaXMuX2FsbE9ic2VydlN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSm9pbnMgdGhlIG9ic2VydmFibGUgbG9naW4gaW4gb25lIHBsYWNlOiBzZXRzIHZhbHVlcyB0byBzb21lIG9ic2VydmFibGVzLCBtZXJnZXMgdGhpcyBvYnNlcnZhYmxlcyBhbmRcclxuICAgKiBzdWJjcmliZXMgdG8gbWVyZ2UgZnVuY1xyXG4gICAqL1xyXG4gIHNweURhdGFTdHJlYW1zKCkge1xyXG4gICAgdGhpcy5fdmlld0N1clNldHRpbmdzJCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldFZpZXdDdXJTZXR0aW5ncygpLnBpcGUoXHJcbiAgICAgIHRhcChkYXRhID0+IHtcclxuICAgICAgICB0aGlzLm93bERPTURhdGEgPSBkYXRhLm93bERPTURhdGE7XHJcbiAgICAgICAgdGhpcy5zdGFnZURhdGEgPSBkYXRhLnN0YWdlRGF0YTtcclxuICAgICAgICB0aGlzLnNsaWRlc0RhdGEgPSBkYXRhLnNsaWRlc0RhdGE7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNhcm91c2VsTG9hZGVkKSB7XHJcbiAgICAgICAgICB0aGlzLmNhcm91c2VsTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5uYXZEYXRhID0gZGF0YS5uYXZEYXRhO1xyXG4gICAgICAgIHRoaXMuZG90c0RhdGEgPSBkYXRhLmRvdHNEYXRhO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLl9pbml0aWFsaXplZENhcm91c2VsJCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldEluaXRpYWxpemVkU3RhdGUoKS5waXBlKFxyXG4gICAgICB0YXAoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZ2F0aGVyVHJhbnNsYXRlZERhdGEoKTtcclxuICAgICAgICB0aGlzLmluaXRpYWxpemVkLmVtaXQodGhpcy5zbGlkZXNPdXRwdXREYXRhKTtcclxuICAgICAgICAvLyB0aGlzLnNsaWRlc091dHB1dERhdGEgPSB7fTtcclxuICAgICAgfSlcclxuICAgIClcclxuXHJcbiAgICB0aGlzLl90cmFuc2xhdGVkQ2Fyb3VzZWwkID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0VHJhbnNsYXRlZFN0YXRlKCkucGlwZShcclxuICAgICAgdGFwKCgpID0+IHtcclxuICAgICAgICB0aGlzLmdhdGhlclRyYW5zbGF0ZWREYXRhKCk7XHJcbiAgICAgICAgdGhpcy50cmFuc2xhdGVkLmVtaXQodGhpcy5zbGlkZXNPdXRwdXREYXRhKTtcclxuICAgICAgICAvLyB0aGlzLnNsaWRlc091dHB1dERhdGEgPSB7fTtcclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5fY2hhbmdlQ2Fyb3VzZWwkID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0Q2hhbmdlU3RhdGUoKS5waXBlKFxyXG4gICAgICB0YXAoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZ2F0aGVyVHJhbnNsYXRlZERhdGEoKTtcclxuICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMuc2xpZGVzT3V0cHV0RGF0YSk7XHJcbiAgICAgICAgLy8gdGhpcy5zbGlkZXNPdXRwdXREYXRhID0ge307XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuX2NoYW5nZWRDYXJvdXNlbCQgPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRDaGFuZ2VTdGF0ZSgpLnBpcGUoXHJcbiAgICAgIHN3aXRjaE1hcCh2YWx1ZSA9PiB7XHJcbiAgICAgICAgY29uc3QgY2hhbmdlZFBvc2l0aW9uOiBPYnNlcnZhYmxlPFNsaWRlc091dHB1dERhdGE+ID0gb2YodmFsdWUpLnBpcGUoXHJcbiAgICAgICAgICBmaWx0ZXIoKCkgPT4gdmFsdWUucHJvcGVydHkubmFtZSA9PT0gJ3Bvc2l0aW9uJyksXHJcbiAgICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gZnJvbSh0aGlzLnNsaWRlc0RhdGEpKSxcclxuICAgICAgICAgIHNraXAodmFsdWUucHJvcGVydHkudmFsdWUpLFxyXG4gICAgICAgICAgdGFrZSh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5pdGVtcyksXHJcbiAgICAgICAgICBtYXAoc2xpZGUgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBjbG9uZWRJZFByZWZpeCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmNsb25lZElkUHJlZml4O1xyXG4gICAgICAgICAgICBjb25zdCBpZCA9IHNsaWRlLmlkLmluZGV4T2YoY2xvbmVkSWRQcmVmaXgpID49IDAgPyBzbGlkZS5pZC5zbGljZShjbG9uZWRJZFByZWZpeC5sZW5ndGgpIDogc2xpZGUuaWQ7XHJcbiAgICAgICAgICAgIHJldHVybiB7IC4uLnNsaWRlLCBpZDogaWQsIGlzQWN0aXZlOiB0cnVlIH07XHJcbiAgICAgICAgICB9KSxcclxuICAgICAgICAgIHRvQXJyYXkoKSxcclxuICAgICAgICAgIG1hcChzbGlkZXMgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgIHNsaWRlczogc2xpZGVzLFxyXG4gICAgICAgICAgICAgIHN0YXJ0UG9zaXRpb246IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnJlbGF0aXZlKHZhbHVlLnByb3BlcnR5LnZhbHVlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIGNvbnN0IGNoYW5nZWRTZXR0aW5nOiBPYnNlcnZhYmxlPFNsaWRlc091dHB1dERhdGE+ID0gb2YodmFsdWUpLnBpcGUoXHJcbiAgICAgICAgLy8gICBmaWx0ZXIoKCkgPT4gdmFsdWUucHJvcGVydHkubmFtZSA9PT0gJ3NldHRpbmdzJyksXHJcbiAgICAgICAgLy8gICBtYXAoKCkgPT4ge1xyXG4gICAgICAgIC8vICAgICByZXR1cm4ge1xyXG4gICAgICAgIC8vICAgICAgIHNsaWRlczogW10sXHJcbiAgICAgICAgLy8gICAgICAgc3RhcnRQb3NpdGlvbjogdGhpcy5jYXJvdXNlbFNlcnZpY2UucmVsYXRpdmUodmFsdWUucHJvcGVydHkudmFsdWUpXHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyAgIH0pXHJcbiAgICAgICAgLy8gKVxyXG4gICAgICAgIHJldHVybiBtZXJnZShjaGFuZ2VkUG9zaXRpb24pO1xyXG4gICAgICB9KSxcclxuICAgICAgdGFwKHNsaWRlc0RhdGEgPT4ge1xyXG4gICAgICAgIHRoaXMuZ2F0aGVyVHJhbnNsYXRlZERhdGEoKTtcclxuICAgICAgICB0aGlzLmNoYW5nZWQuZW1pdChzbGlkZXNEYXRhLnNsaWRlcy5sZW5ndGggPyBzbGlkZXNEYXRhIDogdGhpcy5zbGlkZXNPdXRwdXREYXRhKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnNsaWRlc091dHB1dERhdGEpO1xyXG4gICAgICAgIC8vIHRoaXMuc2xpZGVzT3V0cHV0RGF0YSA9IHt9O1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLl9kcmFnZ2luZ0Nhcm91c2VsJCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldERyYWdTdGF0ZSgpLnBpcGUoXHJcbiAgICAgIHRhcCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5nYXRoZXJUcmFuc2xhdGVkRGF0YSgpO1xyXG4gICAgICAgIHRoaXMuZHJhZ2dpbmcuZW1pdCh7ZHJhZ2dpbmc6IHRydWUsIGRhdGE6IHRoaXMuc2xpZGVzT3V0cHV0RGF0YX0pO1xyXG4gICAgICB9KSxcclxuICAgICAgc3dpdGNoTWFwKFxyXG4gICAgICAgICgpID0+IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldERyYWdnZWRTdGF0ZSgpLnBpcGUoXHJcbiAgICAgICAgICBtYXAoKCkgPT4gISF0aGlzLmNhcm91c2VsU2VydmljZS5pcygnYW5pbWF0aW5nJykpXHJcbiAgICAgICAgKVxyXG4gICAgICApLFxyXG4gICAgICBzd2l0Y2hNYXAoXHJcbiAgICAgICAgYW5pbSA9PiB7XHJcbiAgICAgICAgICBpZiAoYW5pbSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0VHJhbnNsYXRlZFN0YXRlKCkucGlwZShcclxuICAgICAgICAgICAgICBmaXJzdCgpLFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9mKCdub3QgYW5pbWF0aW5nJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICApLFxyXG4gICAgICB0YXAoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZHJhZ2dpbmcuZW1pdCh7ZHJhZ2dpbmc6IGZhbHNlLCBkYXRhOiB0aGlzLnNsaWRlc091dHB1dERhdGF9KTtcclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5fY2Fyb3VzZWxNZXJnZSQgPSBtZXJnZShcclxuICAgICAgdGhpcy5fdmlld0N1clNldHRpbmdzJCxcclxuICAgICAgdGhpcy5fdHJhbnNsYXRlZENhcm91c2VsJCxcclxuICAgICAgdGhpcy5fZHJhZ2dpbmdDYXJvdXNlbCQsXHJcbiAgICAgIHRoaXMuX2NoYW5nZUNhcm91c2VsJCxcclxuICAgICAgdGhpcy5fY2hhbmdlZENhcm91c2VsJCxcclxuICAgICAgdGhpcy5faW5pdGlhbGl6ZWRDYXJvdXNlbCRcclxuICAgICk7XHJcbiAgICB0aGlzLl9hbGxPYnNlcnZTdWJzY3JpcHRpb24gPSB0aGlzLl9jYXJvdXNlbE1lcmdlJC5zdWJzY3JpYmUoKCkgPT4ge30pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdCBzdWJzY3JpcHRpb24gdG8gcmVzaXplIGV2ZW50IGFuZCBhdHRhY2hlcyBoYW5kbGVyIGZvciB0aGlzIGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfd2luUmVzaXplV2F0Y2hlcigpIHtcclxuICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLmNhcm91c2VsU2VydmljZS5fb3B0aW9ucy5yZXNwb25zaXZlKS5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5yZXNpemVTdWJzY3JpcHRpb24gPSB0aGlzLnJlc2l6ZVNlcnZpY2Uub25SZXNpemUkXHJcbiAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICBmaWx0ZXIoKCkgPT4gdGhpcy5jYXJvdXNlbFdpbmRvd1dpZHRoICE9PSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLm93bC1jYXJvdXNlbCcpLmNsaWVudFdpZHRoKSxcclxuICAgICAgICAgIGRlbGF5KHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLnJlc3BvbnNpdmVSZWZyZXNoUmF0ZSlcclxuICAgICAgICApXHJcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmNhcm91c2VsU2VydmljZS5vblJlc2l6ZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLm93bC1jYXJvdXNlbCcpLmNsaWVudFdpZHRoKTtcclxuICAgICAgICAgIHRoaXMuY2Fyb3VzZWxXaW5kb3dXaWR0aCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcub3dsLWNhcm91c2VsJykuY2xpZW50V2lkdGg7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGVyIGZvciB0cmFuc2l0aW9lbmQgZXZlbnRcclxuICAgKi9cclxuICBvblRyYW5zaXRpb25FbmQoKSB7XHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5vblRyYW5zaXRpb25FbmQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhbmRsZXIgZm9yIGNsaWNrIGV2ZW50LCBhdHRhY2hlZCB0byBuZXh0IGJ1dHRvblxyXG4gICAqL1xyXG4gIG5leHQoKSB7XHJcbiAgICBpZiAoIXRoaXMuY2Fyb3VzZWxMb2FkZWQpIHJldHVybjtcclxuICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UubmV4dCh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5uYXZTcGVlZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGVyIGZvciBjbGljayBldmVudCwgYXR0YWNoZWQgdG8gcHJldiBidXR0b25cclxuICAgKi9cclxuICBwcmV2KCkge1xyXG4gICAgaWYgKCF0aGlzLmNhcm91c2VsTG9hZGVkKSByZXR1cm47XHJcbiAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLnByZXYodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MubmF2U3BlZWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlciBmb3IgY2xpY2sgZXZlbnQsIGF0dGFjaGVkIHRvIGRvdHNcclxuICAgKi9cclxuICBtb3ZlQnlEb3QoZG90SWQ6IHN0cmluZykge1xyXG4gICAgaWYgKCF0aGlzLmNhcm91c2VsTG9hZGVkKSByZXR1cm47XHJcbiAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLm1vdmVCeURvdChkb3RJZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiByZXdpbmRzIGNhcm91c2VsIHRvIHNsaWRlIHdpdGggbmVlZGVkIGlkXHJcbiAgICogQHBhcmFtIGlkIGZyYWdtZW50IG9mIHVybFxyXG4gICAqL1xyXG4gIHRvKGlkOiBzdHJpbmcpIHtcclxuICAgIC8vIGlmICghdGhpcy5jYXJvdXNlbExvYWRlZCB8fCAoKHRoaXMubmF2RGF0YSAmJiB0aGlzLm5hdkRhdGEuZGlzYWJsZWQpICYmICh0aGlzLmRvdHNEYXRhICYmIHRoaXMuZG90c0RhdGEuZGlzYWJsZWQpKSkgcmV0dXJuO1xyXG4gICAgaWYgKCF0aGlzLmNhcm91c2VsTG9hZGVkKSByZXR1cm47XHJcbiAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLnRvU2xpZGVCeUlkKGlkKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdhdGhlcnMgYW5kIHByZXBhcmVzIGRhdGEgaW50ZW5kZWQgZm9yIHBhc3NpbmcgdG8gdGhlIHVzZXIgYnkgbWVhbnMgb2YgZmlyaW5nIGV2ZW50IHRyYW5zbGF0ZWRDYXJvdXNlbFxyXG4gICAqL1xyXG4gIGdhdGhlclRyYW5zbGF0ZWREYXRhKCkge1xyXG4gICAgbGV0IHN0YXJ0UG9zaXRpb246IG51bWJlcjtcclxuICAgIGNvbnN0IGNsb25lZElkUHJlZml4ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuY2xvbmVkSWRQcmVmaXg7XHJcbiAgICBjb25zdCBhY3RpdmVTbGlkZXM6IFNsaWRlTW9kZWxbXSA9IHRoaXMuc2xpZGVzRGF0YVxyXG4gICAgICAuZmlsdGVyKHNsaWRlID0+IHNsaWRlLmlzQWN0aXZlID09PSB0cnVlKVxyXG4gICAgICAubWFwKHNsaWRlID0+IHtcclxuICAgICAgICBjb25zdCBpZCA9IHNsaWRlLmlkLmluZGV4T2YoY2xvbmVkSWRQcmVmaXgpID49IDAgPyBzbGlkZS5pZC5zbGljZShjbG9uZWRJZFByZWZpeC5sZW5ndGgpIDogc2xpZGUuaWQ7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIGlkOiBpZCxcclxuICAgICAgICAgIHdpZHRoOiBzbGlkZS53aWR0aCxcclxuICAgICAgICAgIG1hcmdpbkw6IHNsaWRlLm1hcmdpbkwsXHJcbiAgICAgICAgICBtYXJnaW5SOiBzbGlkZS5tYXJnaW5SLFxyXG4gICAgICAgICAgY2VudGVyOiBzbGlkZS5pc0NlbnRlcmVkXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIHN0YXJ0UG9zaXRpb24gPSB0aGlzLmNhcm91c2VsU2VydmljZS5yZWxhdGl2ZSh0aGlzLmNhcm91c2VsU2VydmljZS5jdXJyZW50KCkpO1xyXG4gICAgdGhpcy5zbGlkZXNPdXRwdXREYXRhID0ge1xyXG4gICAgICBzdGFydFBvc2l0aW9uOiBzdGFydFBvc2l0aW9uLFxyXG4gICAgICBzbGlkZXM6IGFjdGl2ZVNsaWRlc1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnRzIHBhdXNpbmdcclxuICAgKi9cclxuICBzdGFydFBhdXNpbmcoKSB7XHJcbiAgICB0aGlzLmF1dG9wbGF5U2VydmljZS5zdGFydFBhdXNpbmcoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0YXJ0cyBwbGF5aW5nIGFmdGVyIG1vdXNlIGxlYXZlcyBjYXJvdXNlbFxyXG4gICAqL1xyXG4gIHN0YXJ0UGxheU1MKCkge1xyXG4gICAgdGhpcy5hdXRvcGxheVNlcnZpY2Uuc3RhcnRQbGF5aW5nTW91c2VMZWF2ZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnRzIHBsYXlpbmcgYWZ0ZXIgdG91Y2ggZW5kc1xyXG4gICAqL1xyXG4gIHN0YXJ0UGxheVRFKCkge1xyXG4gICAgdGhpcy5hdXRvcGxheVNlcnZpY2Uuc3RhcnRQbGF5aW5nVG91Y2hFbmQoKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==
