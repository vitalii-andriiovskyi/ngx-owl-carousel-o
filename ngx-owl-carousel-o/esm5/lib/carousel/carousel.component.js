import * as tslib_1 from "tslib";
import { Component, Input, Output, Directive, QueryList, ContentChildren, TemplateRef, ElementRef, EventEmitter, HostListener, Inject } from '@angular/core';
import { merge, of, from } from 'rxjs';
import { ResizeService } from '../services/resize.service';
import { tap, delay, filter, switchMap, first, map, skip, take, toArray } from 'rxjs/operators';
import { CarouselService } from '../services/carousel.service';
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
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], CarouselSlideDirective.prototype, "id", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number),
        tslib_1.__metadata("design:paramtypes", [Number])
    ], CarouselSlideDirective.prototype, "dataMerge", null);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], CarouselSlideDirective.prototype, "width", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], CarouselSlideDirective.prototype, "dotContent", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], CarouselSlideDirective.prototype, "dataHash", void 0);
    CarouselSlideDirective = tslib_1.__decorate([
        Directive({ selector: 'ng-template[carouselSlide]' }),
        tslib_1.__metadata("design:paramtypes", [TemplateRef])
    ], CarouselSlideDirective);
    return CarouselSlideDirective;
}());
export { CarouselSlideDirective };
/**
 * Data which will be passed out after ending of transition of carousel
 */
var SlidesOutputData = /** @class */ (function () {
    function SlidesOutputData() {
    }
    return SlidesOutputData;
}());
export { SlidesOutputData };
;
var CarouselComponent = /** @class */ (function () {
    function CarouselComponent(el, resizeService, carouselService, navigationService, autoplayService, lazyLoadService, animateService, autoHeightService, hashService, logger, docRef) {
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
        if (!this.carouselService.settings.autoplay)
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
        this._slidesChangesSubscription = this.slides.changes.pipe(tap(function (slides) {
            if (slides.toArray().length) {
                // this.carouselService.setItems(slides.toArray());
                _this.carouselService.setup(_this.carouselWindowWidth, slides.toArray(), _this.options);
                _this.carouselService.initialize(slides.toArray());
            }
            else {
                _this.carouselLoaded = false;
                _this.logger.log("There are no slides to show. So the carousel won't be re-rendered");
            }
        })).subscribe(function () { });
    };
    CarouselComponent.prototype.ngOnDestroy = function () {
        if (this.resizeSubscription) {
            this.resizeSubscription.unsubscribe();
        }
        this._slidesChangesSubscription.unsubscribe();
        this._allObservSubscription.unsubscribe();
    };
    /**
     * Joins the observable login in one place: sets values to some observables, merges this observables and
     * subcribes to merge func
     */
    CarouselComponent.prototype.spyDataStreams = function () {
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
        this._initializedCarousel$ = this.carouselService.getInitializedState().pipe(tap(function () {
            _this.gatherTranslatedData();
            _this.initialized.emit(_this.slidesOutputData);
            // this.slidesOutputData = {};
        }));
        this._translatedCarousel$ = this.carouselService.getTranslatedState().pipe(tap(function () {
            _this.gatherTranslatedData();
            _this.translated.emit(_this.slidesOutputData);
            // this.slidesOutputData = {};
        }));
        this._changeCarousel$ = this.carouselService.getChangeState().pipe(tap(function () {
            _this.gatherTranslatedData();
            _this.change.emit(_this.slidesOutputData);
            // this.slidesOutputData = {};
        }));
        this._changedCarousel$ = this.carouselService.getChangeState().pipe(switchMap(function (value) {
            var changedPosition = of(value).pipe(filter(function () { return value.property.name === 'position'; }), switchMap(function () { return from(_this.slidesData); }), skip(value.property.value), take(_this.carouselService.settings.items), map(function (slide) {
                var clonedIdPrefix = _this.carouselService.clonedIdPrefix;
                var id = slide.id.indexOf(clonedIdPrefix) >= 0 ? slide.id.slice(clonedIdPrefix.length) : slide.id;
                return tslib_1.__assign({}, slide, { id: id, isActive: true });
            }), toArray(), map(function (slides) {
                return {
                    slides: slides,
                    startPosition: _this.carouselService.relative(value.property.value)
                };
            }));
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
        }), tap(function (slidesData) {
            _this.gatherTranslatedData();
            _this.changed.emit(slidesData.slides.length ? slidesData : _this.slidesOutputData);
            // console.log(this.slidesOutputData);
            // this.slidesOutputData = {};
        }));
        this._draggingCarousel$ = this.carouselService.getDragState().pipe(tap(function () {
            _this.gatherTranslatedData();
            _this.dragging.emit({ dragging: true, data: _this.slidesOutputData });
        }), switchMap(function () { return _this.carouselService.getDraggedState().pipe(map(function () { return !!_this.carouselService.is('animating'); })); }), switchMap(function (anim) {
            if (anim) {
                return _this.carouselService.getTranslatedState().pipe(first());
            }
            else {
                return of('not animating');
            }
        }), tap(function () {
            _this.dragging.emit({ dragging: false, data: _this.slidesOutputData });
        }));
        this._carouselMerge$ = merge(this._viewCurSettings$, this._translatedCarousel$, this._draggingCarousel$, this._changeCarousel$, this._changedCarousel$, this._initializedCarousel$);
        this._allObservSubscription = this._carouselMerge$.subscribe(function () { });
    };
    /**
     * Init subscription to resize event and attaches handler for this event
     */
    CarouselComponent.prototype._winResizeWatcher = function () {
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
            .filter(function (slide) { return slide.isActive === true; })
            .map(function (slide) {
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
    tslib_1.__decorate([
        ContentChildren(CarouselSlideDirective),
        tslib_1.__metadata("design:type", QueryList)
    ], CarouselComponent.prototype, "slides", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], CarouselComponent.prototype, "translated", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], CarouselComponent.prototype, "dragging", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], CarouselComponent.prototype, "change", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], CarouselComponent.prototype, "changed", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], CarouselComponent.prototype, "initialized", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], CarouselComponent.prototype, "options", void 0);
    tslib_1.__decorate([
        HostListener('document:visibilitychange', ['$event']),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Event]),
        tslib_1.__metadata("design:returntype", void 0)
    ], CarouselComponent.prototype, "onVisibilityChange", null);
    CarouselComponent = tslib_1.__decorate([
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
        tslib_1.__param(10, Inject(DOCUMENT)),
        tslib_1.__metadata("design:paramtypes", [ElementRef,
            ResizeService,
            CarouselService,
            NavigationService,
            AutoplayService,
            LazyLoadService,
            AnimateService,
            AutoHeightService,
            HashService,
            OwlLogger, Object])
    ], CarouselComponent);
    return CarouselComponent;
}());
export { CarouselComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW93bC1jYXJvdXNlbC1vLyIsInNvdXJjZXMiOlsibGliL2Nhcm91c2VsL2Nhcm91c2VsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFJVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxTQUFTLEVBQ1QsZUFBZSxFQUNmLFdBQVcsRUFDWCxVQUFVLEVBRVYsWUFBWSxFQUNaLFlBQVksRUFDWixNQUFNLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUE0QixLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUVqRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDM0QsT0FBTyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEcsT0FBTyxFQUFFLGVBQWUsRUFBdUIsTUFBTSw4QkFBOEIsQ0FBQztBQU1wRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNuRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNuRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxRQUFRLEVBQUUs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QUNILHVDQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsZUFBZSxDQUFDLG9CQUFvQixFQUFFLENBQUM7SUFDOUMsQ0FBQztJQXpaRDtRQURDLGVBQWUsQ0FBQyxzQkFBc0IsQ0FBQzswQ0FDaEMsU0FBUztxREFBeUI7SUFFaEM7UUFBVCxNQUFNLEVBQUU7O3lEQUFtRDtJQUNsRDtRQUFULE1BQU0sRUFBRTs7dURBQTRFO0lBQzNFO1FBQVQsTUFBTSxFQUFFOztxREFBK0M7SUFDOUM7UUFBVCxNQUFNLEVBQUU7O3NEQUFnRDtJQUMvQztRQUFULE1BQU0sRUFBRTs7MERBQW9EO0lBOERwRDtRQUFSLEtBQUssRUFBRTs7c0RBQXFCO0lBd0Q3QjtRQURDLFlBQVksQ0FBQywyQkFBMkIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOztpREFDL0IsS0FBSzs7K0RBYzNCO0lBN0lVLGlCQUFpQjtRQTNDN0IsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQixRQUFRLEVBQUUsbXVEQTZCVDtZQUVELFNBQVMsRUFBRTtnQkFDVCxpQkFBaUI7Z0JBQ2pCLGVBQWU7Z0JBQ2YsZUFBZTtnQkFDZixlQUFlO2dCQUNmLGNBQWM7Z0JBQ2QsaUJBQWlCO2dCQUNqQixXQUFXO2FBQ1o7cUJBVFEsZ0NBQWdDO1NBVTFDLENBQUM7UUF5SEcsb0JBQUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO2lEQVZMLFVBQVU7WUFDQyxhQUFhO1lBQ1gsZUFBZTtZQUNiLGlCQUFpQjtZQUNuQixlQUFlO1lBQ2YsZUFBZTtZQUNoQixjQUFjO1lBQ1gsaUJBQWlCO1lBQ3ZCLFdBQVc7WUFDaEIsU0FBUztPQXZIaEIsaUJBQWlCLENBOFo3QjtJQUFELHdCQUFDO0NBQUEsQUE5WkQsSUE4WkM7U0E5WlksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgT25Jbml0LFxyXG4gIEFmdGVyQ29udGVudENoZWNrZWQsXHJcbiAgT25EZXN0cm95LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBEaXJlY3RpdmUsXHJcbiAgUXVlcnlMaXN0LFxyXG4gIENvbnRlbnRDaGlsZHJlbixcclxuICBUZW1wbGF0ZVJlZixcclxuICBFbGVtZW50UmVmLFxyXG4gIEFmdGVyQ29udGVudEluaXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIEhvc3RMaXN0ZW5lcixcclxuICBJbmplY3RcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgT2JzZXJ2YWJsZSwgbWVyZ2UsIG9mLCBmcm9tIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBSZXNpemVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvcmVzaXplLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyB0YXAsIGRlbGF5LCBmaWx0ZXIsIHN3aXRjaE1hcCwgZmlyc3QsIG1hcCwgc2tpcCwgdGFrZSwgdG9BcnJheSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgQ2Fyb3VzZWxTZXJ2aWNlLCBDYXJvdXNlbEN1cnJlbnREYXRhIH0gZnJvbSAnLi4vc2VydmljZXMvY2Fyb3VzZWwuc2VydmljZSc7XHJcbmltcG9ydCB7IFN0YWdlRGF0YSB9IGZyb20gXCIuLi9tb2RlbHMvc3RhZ2UtZGF0YS5tb2RlbFwiO1xyXG5pbXBvcnQgeyBPd2xET01EYXRhIH0gZnJvbSBcIi4uL21vZGVscy9vd2xET00tZGF0YS5tb2RlbFwiO1xyXG5pbXBvcnQgeyBTbGlkZU1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL3NsaWRlLm1vZGVsJztcclxuaW1wb3J0IHsgT3dsT3B0aW9ucyB9IGZyb20gJy4uL21vZGVscy9vd2wtb3B0aW9ucy5tb2RlbCc7XHJcbmltcG9ydCB7IE5hdkRhdGEsIERvdHNEYXRhIH0gZnJvbSAnLi4vbW9kZWxzL25hdmlnYXRpb24tZGF0YS5tb2RlbHMnO1xyXG5pbXBvcnQgeyBOYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25hdmlnYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IEF1dG9wbGF5U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2F1dG9wbGF5LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBMYXp5TG9hZFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9sYXp5bG9hZC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQW5pbWF0ZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9hbmltYXRlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBdXRvSGVpZ2h0U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2F1dG9oZWlnaHQuc2VydmljZSc7XHJcbmltcG9ydCB7IEhhc2hTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvaGFzaC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgT3dsTG9nZ2VyIH0gZnJvbSAnLi4vc2VydmljZXMvbG9nZ2VyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJy4uL3NlcnZpY2VzL2RvY3VtZW50LXJlZi5zZXJ2aWNlJztcclxuXHJcbmxldCBuZXh0SWQgPSAwO1xyXG5cclxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnbmctdGVtcGxhdGVbY2Fyb3VzZWxTbGlkZV0nIH0pXHJcbmV4cG9ydCBjbGFzcyBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlIHtcclxuICAvKipcclxuICAgKiBVbmlxdWUgc2xpZGUgaWRlbnRpZmllci4gTXVzdCBiZSB1bmlxdWUgZm9yIHRoZSBlbnRpcmUgZG9jdW1lbnQgZm9yIHByb3BlciBhY2Nlc3NpYmlsaXR5IHN1cHBvcnQuXHJcbiAgICogV2lsbCBiZSBhdXRvLWdlbmVyYXRlZCBpZiBub3QgcHJvdmlkZWQuXHJcbiAgICovXHJcbiAgQElucHV0KCkgaWQgPSBgb3dsLXNsaWRlLSR7bmV4dElkKyt9YDtcclxuXHJcbiAgLyoqXHJcbiAgICogRGVmaW5lcyBob3cgbXVjaCB3aWR0aHMgb2YgY29tbW9uIHNsaWRlIHdpbGwgY3VycmVudCBzbGlkZSBoYXZlXHJcbiAgICogZS5nLiBpZiBfbWVyZ2VEYXRhPTIsIHRoZSBzbGlkZSB3aWxsIHR3aWNlIHdpZGVyIHRoZW4gc2xpZGVzIHdpdGggX21lcmdlRGF0YT0xXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZGF0YU1lcmdlID0gMTtcclxuICBASW5wdXQoKVxyXG4gIHNldCBkYXRhTWVyZ2UoZGF0YTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLl9kYXRhTWVyZ2UgPSB0aGlzLmlzTnVtZXJpYyhkYXRhKSA/IGRhdGEgOiAxO1xyXG4gIH07XHJcbiAgZ2V0IGRhdGFNZXJnZSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fZGF0YU1lcmdlIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2lkdGggb2Ygc2xpZGVcclxuICAgKi9cclxuICBASW5wdXQoKSB3aWR0aCA9IDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIElubmVyIGNvbnRlbnQgb2YgZG90IGZvciBjZXJ0YWluIHNsaWRlOyBjYW4gYmUgaHRtbC1tYXJrdXBcclxuICAgKi9cclxuICBASW5wdXQoKSBkb3RDb250ZW50ID0gJyc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhc2ggKGZyYWdtZW50KSBvZiB1cmwgd2hpY2ggY29ycmVzcG9uZHMgdG8gY2VydGFpbiBzbGlkZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRhdGFIYXNoID0gJyc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0cGxSZWY6IFRlbXBsYXRlUmVmPGFueT4pIHt9XHJcblxyXG4gIC8qKlxyXG5cdCAqIERldGVybWluZXMgaWYgdGhlIGlucHV0IGlzIGEgTnVtYmVyIG9yIHNvbWV0aGluZyB0aGF0IGNhbiBiZSBjb2VyY2VkIHRvIGEgTnVtYmVyXHJcblx0ICogQHBhcmFtIC0gVGhlIGlucHV0IHRvIGJlIHRlc3RlZFxyXG5cdCAqIEByZXR1cm5zIC0gQW4gaW5kaWNhdGlvbiBpZiB0aGUgaW5wdXQgaXMgYSBOdW1iZXIgb3IgY2FuIGJlIGNvZXJjZWQgdG8gYSBOdW1iZXJcclxuXHQgKi9cclxuICBpc051bWVyaWMobnVtYmVyOiBhbnkpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiAhaXNOYU4ocGFyc2VGbG9hdChudW1iZXIpKTtcclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEYXRhIHdoaWNoIHdpbGwgYmUgcGFzc2VkIG91dCBhZnRlciBlbmRpbmcgb2YgdHJhbnNpdGlvbiBvZiBjYXJvdXNlbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNsaWRlc091dHB1dERhdGEge1xyXG4gIHN0YXJ0UG9zaXRpb24/OiBudW1iZXI7XHJcbiAgc2xpZGVzPzogU2xpZGVNb2RlbFtdO1xyXG59O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdvd2wtY2Fyb3VzZWwtbycsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgY2xhc3M9XCJvd2wtY2Fyb3VzZWwgb3dsLXRoZW1lXCIgI293bENhcm91c2VsXHJcbiAgICAgIFtuZ0NsYXNzXT1cInsnb3dsLXJ0bCc6IG93bERPTURhdGE/LnJ0bCxcclxuICAgICAgICAgICAgICAgICAgJ293bC1sb2FkZWQnOiBvd2xET01EYXRhPy5pc0xvYWRlZCxcclxuICAgICAgICAgICAgICAgICAgJ293bC1yZXNwb25zaXZlJzogb3dsRE9NRGF0YT8uaXNSZXNwb25zaXZlLFxyXG4gICAgICAgICAgICAgICAgICAnb3dsLWRyYWcnOiBvd2xET01EYXRhPy5pc01vdXNlRHJhZ2FibGUsXHJcbiAgICAgICAgICAgICAgICAgICdvd2wtZ3JhYic6IG93bERPTURhdGE/LmlzR3JhYn1cIlxyXG4gICAgICAobW91c2VvdmVyKT1cInN0YXJ0UGF1c2luZygpXCJcclxuICAgICAgKG1vdXNlbGVhdmUpPVwic3RhcnRQbGF5TUwoKVwiXHJcbiAgICAgICh0b3VjaHN0YXJ0KT1cInN0YXJ0UGF1c2luZygpXCJcclxuICAgICAgKHRvdWNoZW5kKT1cInN0YXJ0UGxheVRFKClcIj5cclxuXHJcbiAgICAgIDxkaXYgKm5nSWY9XCJjYXJvdXNlbExvYWRlZFwiIGNsYXNzPVwib3dsLXN0YWdlLW91dGVyXCI+XHJcbiAgICAgICAgPG93bC1zdGFnZSBbb3dsRHJhZ2dhYmxlXT1cInsnaXNNb3VzZURyYWdhYmxlJzogb3dsRE9NRGF0YT8uaXNNb3VzZURyYWdhYmxlLCAnaXNUb3VjaERyYWdhYmxlJzogb3dsRE9NRGF0YT8uaXNUb3VjaERyYWdhYmxlfVwiXHJcbiAgICAgICAgICAgICAgICAgICAgW3N0YWdlRGF0YV09XCJzdGFnZURhdGFcIlxyXG4gICAgICAgICAgICAgICAgICAgIFtzbGlkZXNEYXRhXT1cInNsaWRlc0RhdGFcIj48L293bC1zdGFnZT5cclxuICAgICAgPC9kaXY+IDwhLS0gLy5vd2wtc3RhZ2Utb3V0ZXIgLS0+XHJcbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJzbGlkZXMudG9BcnJheSgpLmxlbmd0aFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJvd2wtbmF2XCIgW25nQ2xhc3NdPVwieydkaXNhYmxlZCc6IG5hdkRhdGE/LmRpc2FibGVkfVwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm93bC1wcmV2XCIgW25nQ2xhc3NdPVwieydkaXNhYmxlZCc6IG5hdkRhdGE/LnByZXY/LmRpc2FibGVkfVwiIChjbGljayk9XCJwcmV2KClcIiBbaW5uZXJIVE1MXT1cIm5hdkRhdGE/LnByZXY/Lmh0bWxUZXh0XCI+PC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwib3dsLW5leHRcIiBbbmdDbGFzc109XCJ7J2Rpc2FibGVkJzogbmF2RGF0YT8ubmV4dD8uZGlzYWJsZWR9XCIgKGNsaWNrKT1cIm5leHQoKVwiIFtpbm5lckhUTUxdPVwibmF2RGF0YT8ubmV4dD8uaHRtbFRleHRcIj48L2Rpdj5cclxuICAgICAgICA8L2Rpdj4gPCEtLSAvLm93bC1uYXYgLS0+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm93bC1kb3RzXCIgW25nQ2xhc3NdPVwieydkaXNhYmxlZCc6IGRvdHNEYXRhPy5kaXNhYmxlZH1cIj5cclxuICAgICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGRvdCBvZiBkb3RzRGF0YT8uZG90c1wiIGNsYXNzPVwib3dsLWRvdFwiIFtuZ0NsYXNzXT1cInsnYWN0aXZlJzogZG90LmFjdGl2ZSwgJ293bC1kb3QtdGV4dCc6IGRvdC5zaG93SW5uZXJDb250ZW50fVwiIChjbGljayk9XCJtb3ZlQnlEb3QoZG90LmlkKVwiPlxyXG4gICAgICAgICAgICA8c3BhbiBbaW5uZXJIVE1MXT1cImRvdC5pbm5lckNvbnRlbnRcIj48L3NwYW4+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj4gPCEtLSAvLm93bC1kb3RzIC0tPlxyXG4gICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgIDwvZGl2PiA8IS0tIC8ub3dsLWNhcm91c2VsIG93bC1sb2FkZWQgLS0+XHJcbiAgYCxcclxuICBzdHlsZXM6IFtgLm93bC10aGVtZSB7IGRpc3BsYXk6IGJsb2NrOyB9YF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBOYXZpZ2F0aW9uU2VydmljZSxcclxuICAgIEF1dG9wbGF5U2VydmljZSxcclxuICAgIENhcm91c2VsU2VydmljZSxcclxuICAgIExhenlMb2FkU2VydmljZSxcclxuICAgIEFuaW1hdGVTZXJ2aWNlLFxyXG4gICAgQXV0b0hlaWdodFNlcnZpY2UsXHJcbiAgICBIYXNoU2VydmljZVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIENhcm91c2VsQ29tcG9uZW50XHJcbiAgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudENoZWNrZWQsIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XHJcbiAgQENvbnRlbnRDaGlsZHJlbihDYXJvdXNlbFNsaWRlRGlyZWN0aXZlKVxyXG4gIHNsaWRlczogUXVlcnlMaXN0PENhcm91c2VsU2xpZGVEaXJlY3RpdmU+O1xyXG5cclxuICBAT3V0cHV0KCkgdHJhbnNsYXRlZCA9IG5ldyBFdmVudEVtaXR0ZXI8U2xpZGVzT3V0cHV0RGF0YT4oKTtcclxuICBAT3V0cHV0KCkgZHJhZ2dpbmcgPSBuZXcgRXZlbnRFbWl0dGVyPHtkcmFnZ2luZzogYm9vbGVhbiwgZGF0YTogU2xpZGVzT3V0cHV0RGF0YX0+KCk7XHJcbiAgQE91dHB1dCgpIGNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8U2xpZGVzT3V0cHV0RGF0YT4oKTtcclxuICBAT3V0cHV0KCkgY2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8U2xpZGVzT3V0cHV0RGF0YT4oKTtcclxuICBAT3V0cHV0KCkgaW5pdGlhbGl6ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFNsaWRlc091dHB1dERhdGE+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdpZHRoIG9mIGNhcm91c2VsIHdpbmRvdyAodGFnIHdpdGggY2xhc3MgLm93bC1jYXJvdXNlbCksIGluIHdpY2ggd2UgY2FuIHNlZSBtb3Zpbmcgc2xpZGVyc1xyXG4gICAqL1xyXG4gIGNhcm91c2VsV2luZG93V2lkdGg6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaXB0aW9uIHRvICdyZXNpemUnIGV2ZW50XHJcbiAgICovXHJcbiAgcmVzaXplU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlwdGlvbiBtZXJnZSBPYnNlcnZhYmxlLCB3aGljaCBtZXJnZXMgYWxsIE9ic2VydmFibGVzIGluIHRoZSBjb21wb25lbnQgZXhjZXB0ICdyZXNpemUnIE9ic2VydmFibGUgYW5kIHRoaXMuc2xpZGVzLmNoYW5nZXMoKVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2FsbE9ic2VydlN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gdG8gYHRoaXMuc2xpZGVzLmNoYW5nZXMoKS5cclxuICAgKiBJdCBjb3VsZCBiZSBpbmNsdWRlZCBpbiAndGhpcy5fYWxsT2JzZXJ2U3Vic2NyaXB0aW9uJywgYnV0IHRoYXQgc3ViY3JpcHRpb24gZ2V0IGNyZWF0ZWQgZHVyaW5nIHRoZSBpbml0aWFsaXppbmcgb2YgY29tcG9uZW50XHJcbiAgICogYW5kICd0aGlzLnNsaWRlcycgYXJlIHVuZGVmaW5lZCBhdCB0aGF0IG1vbWVudC4gU28gaXQncyBuZWVkZWQgdG8gd2FpdCBmb3IgaW5pdGlhbGl6YXRpb24gb2YgY29udGVudC5cclxuICAgKi9cclxuICBwcml2YXRlIF9zbGlkZXNDaGFuZ2VzU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIEN1cnJlbnQgc2V0dGluZ3MgZm9yIHRoZSBjYXJvdXNlbC5cclxuICAgKi9cclxuICBvd2xET01EYXRhOiBPd2xET01EYXRhO1xyXG5cclxuICAvKipcclxuICAgKiBEYXRhIG9mIG93bC1zdGFnZVxyXG4gICAqL1xyXG5cdHN0YWdlRGF0YTogU3RhZ2VEYXRhO1xyXG5cclxuXHQvKipcclxuXHQgKiAgRGF0YSBvZiBldmVyeSBzbGlkZVxyXG5cdCAqL1xyXG4gIHNsaWRlc0RhdGE6IFNsaWRlTW9kZWxbXSA9IFtdO1xyXG5cclxuICAvKipcclxuXHQgKiBEYXRhIG9mIG5hdmlnYXRpb24gYmxvY2tcclxuXHQgKi9cclxuXHRuYXZEYXRhOiBOYXZEYXRhO1xyXG5cclxuXHQvKipcclxuXHQgKiBEYXRhIG9mIGRvdHMgYmxvY2tcclxuXHQgKi9cclxuICBkb3RzRGF0YTogRG90c0RhdGE7XHJcblxyXG4gIC8qKlxyXG4gICAqIERhdGEsIHdpY2ggYXJlIHBhc3NlZCBvdXQgb2YgY2Fyb3VzZWwgYWZ0ZXIgZW5kaW5nIG9mIHRyYW5zaW9uaW5nIG9mIGNhcm91c2VsXHJcbiAgICovXHJcbiAgc2xpZGVzT3V0cHV0RGF0YTogU2xpZGVzT3V0cHV0RGF0YTtcclxuXHJcbiAgLyoqXHJcbiAgICogU2hvd3Mgd2hldGhlciBjYXJvdXNlbCBpcyBsb2FkZWQgb2Ygbm90LlxyXG4gICAqL1xyXG4gIGNhcm91c2VsTG9hZGVkID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZXIncyBvcHRpb25zXHJcbiAgICovXHJcbiAgQElucHV0KCkgb3B0aW9uczogT3dsT3B0aW9ucztcclxuXHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2YWJsZSBmb3IgZ2V0dGluZyBjdXJyZW50IFZpZXcgU2V0dGluZ3NcclxuICAgKi9cclxuICBwcml2YXRlIF92aWV3Q3VyU2V0dGluZ3MkOiBPYnNlcnZhYmxlPENhcm91c2VsQ3VycmVudERhdGE+O1xyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZhYmxlIGZvciBjYXRjaGluZyB0aGUgZW5kIG9mIHRyYW5zaXRpb24gb2YgY2Fyb3VzZWxcclxuICAgKi9cclxuICBwcml2YXRlIF90cmFuc2xhdGVkQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz47XHJcblxyXG4gIC8qKlxyXG4gICAqIE9ic2VydmFibGUgZm9yIGNhdGNoaW5nIHRoZSBzdGFydCBvZiBkcmFnZ2luZyBvZiB0aGUgY2Fyb3VzZWxcclxuICAgKi9cclxuICBwcml2YXRlIF9kcmFnZ2luZ0Nhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+O1xyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZhYmxlIGZvciBjYXRjaGluZyB0aGUgc3RhcnQgb2YgY2hhbmdpbmcgb2YgdGhlIGNhcm91c2VsXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfY2hhbmdlQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz47XHJcblxyXG4gIC8qKlxyXG4gICAqIE9ic2VydmFibGUgZm9yIGNhdGNoaW5nIHRoZSBtb21lbnQgd2hlbiB0aGUgZGF0YSBhYm91dCBzbGlkZXMgY2hhbmdlZCwgbW9yZSBleGFjdGx5IHdoZW4gdGhlIHBvc2l0aW9uIGNoYW5nZWQuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfY2hhbmdlZENhcm91c2VsJDogT2JzZXJ2YWJsZTxhbnk+O1xyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZhYmxlIGZvciBjYXRjaGluZyB0aGUgaW5pdGlhbGl6YXRpb24gb2YgY2hhbmdpbmcgdGhlIGNhcm91c2VsXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfaW5pdGlhbGl6ZWRDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPjtcclxuXHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2YWJsZSBmb3IgbWVyZ2luZyBhbGwgT2JzZXJ2YWJsZXMgYW5kIGNyZWF0aW5nIG9uZSBzdWJzY3JpcHRpb25cclxuICAgKi9cclxuICBwcml2YXRlIF9jYXJvdXNlbE1lcmdlJDogT2JzZXJ2YWJsZTxDYXJvdXNlbEN1cnJlbnREYXRhIHwgc3RyaW5nPjtcclxuICBwcml2YXRlIGRvY1JlZjogRG9jdW1lbnQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcclxuICAgIHByaXZhdGUgcmVzaXplU2VydmljZTogUmVzaXplU2VydmljZSxcclxuICAgIHByaXZhdGUgY2Fyb3VzZWxTZXJ2aWNlOiBDYXJvdXNlbFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIG5hdmlnYXRpb25TZXJ2aWNlOiBOYXZpZ2F0aW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgYXV0b3BsYXlTZXJ2aWNlOiBBdXRvcGxheVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGxhenlMb2FkU2VydmljZTogTGF6eUxvYWRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBhbmltYXRlU2VydmljZTogQW5pbWF0ZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGF1dG9IZWlnaHRTZXJ2aWNlOiBBdXRvSGVpZ2h0U2VydmljZSxcclxuICAgIHByaXZhdGUgaGFzaFNlcnZpY2U6IEhhc2hTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBsb2dnZXI6IE93bExvZ2dlcixcclxuICAgIEBJbmplY3QoRE9DVU1FTlQpIGRvY1JlZjogYW55XHJcbiAgKSB7XHJcbiAgICB0aGlzLmRvY1JlZiA9IGRvY1JlZiBhcyBEb2N1bWVudDtcclxuXHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDp2aXNpYmlsaXR5Y2hhbmdlJywgWyckZXZlbnQnXSlcclxuICBvblZpc2liaWxpdHlDaGFuZ2UoZXY6IEV2ZW50KSB7XHJcbiAgICBpZiAoIXRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9wbGF5KSByZXR1cm47XHJcbiAgICBzd2l0Y2ggKHRoaXMuZG9jUmVmLnZpc2liaWxpdHlTdGF0ZSkge1xyXG4gICAgICBjYXNlICd2aXNpYmxlJzpcclxuICAgICAgICB0aGlzLmF1dG9wbGF5U2VydmljZS5wbGF5KCk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlICdoaWRkZW4nOlxyXG4gICAgICAgIHRoaXMuYXV0b3BsYXlTZXJ2aWNlLnN0b3AoKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5zcHlEYXRhU3RyZWFtcygpO1xyXG5cclxuICAgIHRoaXMuY2Fyb3VzZWxXaW5kb3dXaWR0aCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICAnLm93bC1jYXJvdXNlbCdcclxuICAgICkuY2xpZW50V2lkdGg7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XHJcbiAgfVxyXG4gIC8vIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIEVORFxyXG5cclxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcbiAgICBpZiAodGhpcy5zbGlkZXMudG9BcnJheSgpLmxlbmd0aCkge1xyXG4gICAgICB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR1cCh0aGlzLmNhcm91c2VsV2luZG93V2lkdGgsIHRoaXMuc2xpZGVzLnRvQXJyYXkoKSwgdGhpcy5vcHRpb25zKTtcclxuICAgICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UuaW5pdGlhbGl6ZSh0aGlzLnNsaWRlcy50b0FycmF5KCkpO1xyXG5cclxuICAgICAgdGhpcy5fd2luUmVzaXplV2F0Y2hlcigpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5sb2dnZXIubG9nKGBUaGVyZSBhcmUgbm8gc2xpZGVzIHRvIHNob3cuIFNvIHRoZSBjYXJvdXNlbCB3b24ndCBiZSByZW5kZXJlZGApO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX3NsaWRlc0NoYW5nZXNTdWJzY3JpcHRpb24gPSB0aGlzLnNsaWRlcy5jaGFuZ2VzLnBpcGUoXHJcbiAgICAgIHRhcCgoc2xpZGVzKSA9PiB7XHJcbiAgICAgICAgaWYgKHNsaWRlcy50b0FycmF5KCkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAvLyB0aGlzLmNhcm91c2VsU2VydmljZS5zZXRJdGVtcyhzbGlkZXMudG9BcnJheSgpKTtcclxuICAgICAgICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHVwKHRoaXMuY2Fyb3VzZWxXaW5kb3dXaWR0aCwgc2xpZGVzLnRvQXJyYXkoKSwgdGhpcy5vcHRpb25zKTtcclxuICAgICAgICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmluaXRpYWxpemUoc2xpZGVzLnRvQXJyYXkoKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuY2Fyb3VzZWxMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhgVGhlcmUgYXJlIG5vIHNsaWRlcyB0byBzaG93LiBTbyB0aGUgY2Fyb3VzZWwgd29uJ3QgYmUgcmUtcmVuZGVyZWRgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICApLnN1YnNjcmliZSgoKT0+e30pO1xyXG5cclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgaWYgKHRoaXMucmVzaXplU3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgIHRoaXMucmVzaXplU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fc2xpZGVzQ2hhbmdlc1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG5cclxuICAgIHRoaXMuX2FsbE9ic2VydlN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSm9pbnMgdGhlIG9ic2VydmFibGUgbG9naW4gaW4gb25lIHBsYWNlOiBzZXRzIHZhbHVlcyB0byBzb21lIG9ic2VydmFibGVzLCBtZXJnZXMgdGhpcyBvYnNlcnZhYmxlcyBhbmRcclxuICAgKiBzdWJjcmliZXMgdG8gbWVyZ2UgZnVuY1xyXG4gICAqL1xyXG4gIHNweURhdGFTdHJlYW1zKCkge1xyXG4gICAgdGhpcy5fdmlld0N1clNldHRpbmdzJCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldFZpZXdDdXJTZXR0aW5ncygpLnBpcGUoXHJcbiAgICAgIHRhcChkYXRhID0+IHtcclxuICAgICAgICB0aGlzLm93bERPTURhdGEgPSBkYXRhLm93bERPTURhdGE7XHJcbiAgICAgICAgdGhpcy5zdGFnZURhdGEgPSBkYXRhLnN0YWdlRGF0YTtcclxuICAgICAgICB0aGlzLnNsaWRlc0RhdGEgPSBkYXRhLnNsaWRlc0RhdGE7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNhcm91c2VsTG9hZGVkKSB7XHJcbiAgICAgICAgICB0aGlzLmNhcm91c2VsTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5uYXZEYXRhID0gZGF0YS5uYXZEYXRhO1xyXG4gICAgICAgIHRoaXMuZG90c0RhdGEgPSBkYXRhLmRvdHNEYXRhO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLl9pbml0aWFsaXplZENhcm91c2VsJCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldEluaXRpYWxpemVkU3RhdGUoKS5waXBlKFxyXG4gICAgICB0YXAoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZ2F0aGVyVHJhbnNsYXRlZERhdGEoKTtcclxuICAgICAgICB0aGlzLmluaXRpYWxpemVkLmVtaXQodGhpcy5zbGlkZXNPdXRwdXREYXRhKTtcclxuICAgICAgICAvLyB0aGlzLnNsaWRlc091dHB1dERhdGEgPSB7fTtcclxuICAgICAgfSlcclxuICAgIClcclxuXHJcbiAgICB0aGlzLl90cmFuc2xhdGVkQ2Fyb3VzZWwkID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0VHJhbnNsYXRlZFN0YXRlKCkucGlwZShcclxuICAgICAgdGFwKCgpID0+IHtcclxuICAgICAgICB0aGlzLmdhdGhlclRyYW5zbGF0ZWREYXRhKCk7XHJcbiAgICAgICAgdGhpcy50cmFuc2xhdGVkLmVtaXQodGhpcy5zbGlkZXNPdXRwdXREYXRhKTtcclxuICAgICAgICAvLyB0aGlzLnNsaWRlc091dHB1dERhdGEgPSB7fTtcclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5fY2hhbmdlQ2Fyb3VzZWwkID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0Q2hhbmdlU3RhdGUoKS5waXBlKFxyXG4gICAgICB0YXAoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZ2F0aGVyVHJhbnNsYXRlZERhdGEoKTtcclxuICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMuc2xpZGVzT3V0cHV0RGF0YSk7XHJcbiAgICAgICAgLy8gdGhpcy5zbGlkZXNPdXRwdXREYXRhID0ge307XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuX2NoYW5nZWRDYXJvdXNlbCQgPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRDaGFuZ2VTdGF0ZSgpLnBpcGUoXHJcbiAgICAgIHN3aXRjaE1hcCh2YWx1ZSA9PiB7XHJcbiAgICAgICAgY29uc3QgY2hhbmdlZFBvc2l0aW9uOiBPYnNlcnZhYmxlPFNsaWRlc091dHB1dERhdGE+ID0gb2YodmFsdWUpLnBpcGUoXHJcbiAgICAgICAgICBmaWx0ZXIoKCkgPT4gdmFsdWUucHJvcGVydHkubmFtZSA9PT0gJ3Bvc2l0aW9uJyksXHJcbiAgICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gZnJvbSh0aGlzLnNsaWRlc0RhdGEpKSxcclxuICAgICAgICAgIHNraXAodmFsdWUucHJvcGVydHkudmFsdWUpLFxyXG4gICAgICAgICAgdGFrZSh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5pdGVtcyksXHJcbiAgICAgICAgICBtYXAoc2xpZGUgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBjbG9uZWRJZFByZWZpeCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmNsb25lZElkUHJlZml4O1xyXG4gICAgICAgICAgICBjb25zdCBpZCA9IHNsaWRlLmlkLmluZGV4T2YoY2xvbmVkSWRQcmVmaXgpID49IDAgPyBzbGlkZS5pZC5zbGljZShjbG9uZWRJZFByZWZpeC5sZW5ndGgpIDogc2xpZGUuaWQ7XHJcbiAgICAgICAgICAgIHJldHVybiB7IC4uLnNsaWRlLCBpZDogaWQsIGlzQWN0aXZlOiB0cnVlIH07XHJcbiAgICAgICAgICB9KSxcclxuICAgICAgICAgIHRvQXJyYXkoKSxcclxuICAgICAgICAgIG1hcChzbGlkZXMgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgIHNsaWRlczogc2xpZGVzLFxyXG4gICAgICAgICAgICAgIHN0YXJ0UG9zaXRpb246IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnJlbGF0aXZlKHZhbHVlLnByb3BlcnR5LnZhbHVlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIGNvbnN0IGNoYW5nZWRTZXR0aW5nOiBPYnNlcnZhYmxlPFNsaWRlc091dHB1dERhdGE+ID0gb2YodmFsdWUpLnBpcGUoXHJcbiAgICAgICAgLy8gICBmaWx0ZXIoKCkgPT4gdmFsdWUucHJvcGVydHkubmFtZSA9PT0gJ3NldHRpbmdzJyksXHJcbiAgICAgICAgLy8gICBtYXAoKCkgPT4ge1xyXG4gICAgICAgIC8vICAgICByZXR1cm4ge1xyXG4gICAgICAgIC8vICAgICAgIHNsaWRlczogW10sXHJcbiAgICAgICAgLy8gICAgICAgc3RhcnRQb3NpdGlvbjogdGhpcy5jYXJvdXNlbFNlcnZpY2UucmVsYXRpdmUodmFsdWUucHJvcGVydHkudmFsdWUpXHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyAgIH0pXHJcbiAgICAgICAgLy8gKVxyXG4gICAgICAgIHJldHVybiBtZXJnZShjaGFuZ2VkUG9zaXRpb24pO1xyXG4gICAgICB9KSxcclxuICAgICAgdGFwKHNsaWRlc0RhdGEgPT4ge1xyXG4gICAgICAgIHRoaXMuZ2F0aGVyVHJhbnNsYXRlZERhdGEoKTtcclxuICAgICAgICB0aGlzLmNoYW5nZWQuZW1pdChzbGlkZXNEYXRhLnNsaWRlcy5sZW5ndGggPyBzbGlkZXNEYXRhIDogdGhpcy5zbGlkZXNPdXRwdXREYXRhKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnNsaWRlc091dHB1dERhdGEpO1xyXG4gICAgICAgIC8vIHRoaXMuc2xpZGVzT3V0cHV0RGF0YSA9IHt9O1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLl9kcmFnZ2luZ0Nhcm91c2VsJCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldERyYWdTdGF0ZSgpLnBpcGUoXHJcbiAgICAgIHRhcCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5nYXRoZXJUcmFuc2xhdGVkRGF0YSgpO1xyXG4gICAgICAgIHRoaXMuZHJhZ2dpbmcuZW1pdCh7ZHJhZ2dpbmc6IHRydWUsIGRhdGE6IHRoaXMuc2xpZGVzT3V0cHV0RGF0YX0pO1xyXG4gICAgICB9KSxcclxuICAgICAgc3dpdGNoTWFwKFxyXG4gICAgICAgICgpID0+IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldERyYWdnZWRTdGF0ZSgpLnBpcGUoXHJcbiAgICAgICAgICBtYXAoKCkgPT4gISF0aGlzLmNhcm91c2VsU2VydmljZS5pcygnYW5pbWF0aW5nJykpXHJcbiAgICAgICAgKVxyXG4gICAgICApLFxyXG4gICAgICBzd2l0Y2hNYXAoXHJcbiAgICAgICAgYW5pbSA9PiB7XHJcbiAgICAgICAgICBpZiAoYW5pbSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0VHJhbnNsYXRlZFN0YXRlKCkucGlwZShcclxuICAgICAgICAgICAgICBmaXJzdCgpLFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9mKCdub3QgYW5pbWF0aW5nJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICApLFxyXG4gICAgICB0YXAoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZHJhZ2dpbmcuZW1pdCh7ZHJhZ2dpbmc6IGZhbHNlLCBkYXRhOiB0aGlzLnNsaWRlc091dHB1dERhdGF9KTtcclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5fY2Fyb3VzZWxNZXJnZSQgPSBtZXJnZShcclxuICAgICAgdGhpcy5fdmlld0N1clNldHRpbmdzJCxcclxuICAgICAgdGhpcy5fdHJhbnNsYXRlZENhcm91c2VsJCxcclxuICAgICAgdGhpcy5fZHJhZ2dpbmdDYXJvdXNlbCQsXHJcbiAgICAgIHRoaXMuX2NoYW5nZUNhcm91c2VsJCxcclxuICAgICAgdGhpcy5fY2hhbmdlZENhcm91c2VsJCxcclxuICAgICAgdGhpcy5faW5pdGlhbGl6ZWRDYXJvdXNlbCRcclxuICAgICk7XHJcbiAgICB0aGlzLl9hbGxPYnNlcnZTdWJzY3JpcHRpb24gPSB0aGlzLl9jYXJvdXNlbE1lcmdlJC5zdWJzY3JpYmUoKCkgPT4ge30pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdCBzdWJzY3JpcHRpb24gdG8gcmVzaXplIGV2ZW50IGFuZCBhdHRhY2hlcyBoYW5kbGVyIGZvciB0aGlzIGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfd2luUmVzaXplV2F0Y2hlcigpIHtcclxuICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLmNhcm91c2VsU2VydmljZS5fb3B0aW9ucy5yZXNwb25zaXZlKS5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5yZXNpemVTdWJzY3JpcHRpb24gPSB0aGlzLnJlc2l6ZVNlcnZpY2Uub25SZXNpemUkXHJcbiAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICBmaWx0ZXIoKCkgPT4gdGhpcy5jYXJvdXNlbFdpbmRvd1dpZHRoICE9PSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLm93bC1jYXJvdXNlbCcpLmNsaWVudFdpZHRoKSxcclxuICAgICAgICAgIGRlbGF5KHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLnJlc3BvbnNpdmVSZWZyZXNoUmF0ZSlcclxuICAgICAgICApXHJcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmNhcm91c2VsU2VydmljZS5vblJlc2l6ZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLm93bC1jYXJvdXNlbCcpLmNsaWVudFdpZHRoKTtcclxuICAgICAgICAgIHRoaXMuY2Fyb3VzZWxXaW5kb3dXaWR0aCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcub3dsLWNhcm91c2VsJykuY2xpZW50V2lkdGg7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGVyIGZvciB0cmFuc2l0aW9lbmQgZXZlbnRcclxuICAgKi9cclxuICBvblRyYW5zaXRpb25FbmQoKSB7XHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5vblRyYW5zaXRpb25FbmQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhbmRsZXIgZm9yIGNsaWNrIGV2ZW50LCBhdHRhY2hlZCB0byBuZXh0IGJ1dHRvblxyXG4gICAqL1xyXG4gIG5leHQoKSB7XHJcbiAgICBpZiAoIXRoaXMuY2Fyb3VzZWxMb2FkZWQpIHJldHVybjtcclxuICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UubmV4dCh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5uYXZTcGVlZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGVyIGZvciBjbGljayBldmVudCwgYXR0YWNoZWQgdG8gcHJldiBidXR0b25cclxuICAgKi9cclxuICBwcmV2KCkge1xyXG4gICAgaWYgKCF0aGlzLmNhcm91c2VsTG9hZGVkKSByZXR1cm47XHJcbiAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLnByZXYodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MubmF2U3BlZWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlciBmb3IgY2xpY2sgZXZlbnQsIGF0dGFjaGVkIHRvIGRvdHNcclxuICAgKi9cclxuICBtb3ZlQnlEb3QoZG90SWQ6IHN0cmluZykge1xyXG4gICAgaWYgKCF0aGlzLmNhcm91c2VsTG9hZGVkKSByZXR1cm47XHJcbiAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLm1vdmVCeURvdChkb3RJZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiByZXdpbmRzIGNhcm91c2VsIHRvIHNsaWRlIHdpdGggbmVlZGVkIGlkXHJcbiAgICogQHBhcmFtIGlkIGZyYWdtZW50IG9mIHVybFxyXG4gICAqL1xyXG4gIHRvKGlkOiBzdHJpbmcpIHtcclxuICAgIC8vIGlmICghdGhpcy5jYXJvdXNlbExvYWRlZCB8fCAoKHRoaXMubmF2RGF0YSAmJiB0aGlzLm5hdkRhdGEuZGlzYWJsZWQpICYmICh0aGlzLmRvdHNEYXRhICYmIHRoaXMuZG90c0RhdGEuZGlzYWJsZWQpKSkgcmV0dXJuO1xyXG4gICAgaWYgKCF0aGlzLmNhcm91c2VsTG9hZGVkKSByZXR1cm47XHJcbiAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLnRvU2xpZGVCeUlkKGlkKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdhdGhlcnMgYW5kIHByZXBhcmVzIGRhdGEgaW50ZW5kZWQgZm9yIHBhc3NpbmcgdG8gdGhlIHVzZXIgYnkgbWVhbnMgb2YgZmlyaW5nIGV2ZW50IHRyYW5zbGF0ZWRDYXJvdXNlbFxyXG4gICAqL1xyXG4gIGdhdGhlclRyYW5zbGF0ZWREYXRhKCkge1xyXG4gICAgbGV0IHN0YXJ0UG9zaXRpb246IG51bWJlcjtcclxuICAgIGNvbnN0IGNsb25lZElkUHJlZml4ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuY2xvbmVkSWRQcmVmaXg7XHJcbiAgICBjb25zdCBhY3RpdmVTbGlkZXM6IFNsaWRlTW9kZWxbXSA9IHRoaXMuc2xpZGVzRGF0YVxyXG4gICAgICAuZmlsdGVyKHNsaWRlID0+IHNsaWRlLmlzQWN0aXZlID09PSB0cnVlKVxyXG4gICAgICAubWFwKHNsaWRlID0+IHtcclxuICAgICAgICBjb25zdCBpZCA9IHNsaWRlLmlkLmluZGV4T2YoY2xvbmVkSWRQcmVmaXgpID49IDAgPyBzbGlkZS5pZC5zbGljZShjbG9uZWRJZFByZWZpeC5sZW5ndGgpIDogc2xpZGUuaWQ7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIGlkOiBpZCxcclxuICAgICAgICAgIHdpZHRoOiBzbGlkZS53aWR0aCxcclxuICAgICAgICAgIG1hcmdpbkw6IHNsaWRlLm1hcmdpbkwsXHJcbiAgICAgICAgICBtYXJnaW5SOiBzbGlkZS5tYXJnaW5SLFxyXG4gICAgICAgICAgY2VudGVyOiBzbGlkZS5pc0NlbnRlcmVkXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIHN0YXJ0UG9zaXRpb24gPSB0aGlzLmNhcm91c2VsU2VydmljZS5yZWxhdGl2ZSh0aGlzLmNhcm91c2VsU2VydmljZS5jdXJyZW50KCkpO1xyXG4gICAgdGhpcy5zbGlkZXNPdXRwdXREYXRhID0ge1xyXG4gICAgICBzdGFydFBvc2l0aW9uOiBzdGFydFBvc2l0aW9uLFxyXG4gICAgICBzbGlkZXM6IGFjdGl2ZVNsaWRlc1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnRzIHBhdXNpbmdcclxuICAgKi9cclxuICBzdGFydFBhdXNpbmcoKSB7XHJcbiAgICB0aGlzLmF1dG9wbGF5U2VydmljZS5zdGFydFBhdXNpbmcoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0YXJ0cyBwbGF5aW5nIGFmdGVyIG1vdXNlIGxlYXZlcyBjYXJvdXNlbFxyXG4gICAqL1xyXG4gIHN0YXJ0UGxheU1MKCkge1xyXG4gICAgdGhpcy5hdXRvcGxheVNlcnZpY2Uuc3RhcnRQbGF5aW5nTW91c2VMZWF2ZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnRzIHBsYXlpbmcgYWZ0ZXIgdG91Y2ggZW5kc1xyXG4gICAqL1xyXG4gIHN0YXJ0UGxheVRFKCkge1xyXG4gICAgdGhpcy5hdXRvcGxheVNlcnZpY2Uuc3RhcnRQbGF5aW5nVG91Y2hFbmQoKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==