import * as tslib_1 from "tslib";
import { Component, Input, Output, Directive, QueryList, ContentChildren, TemplateRef, ElementRef, EventEmitter, HostListener, Inject, ChangeDetectorRef } from '@angular/core';
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
        this._viewCurSettings$ = this.carouselService.getViewCurSettings().pipe(tap(function (data) {
            _this.owlDOMData = data.owlDOMData;
            _this.stageData = data.stageData;
            _this.slidesData = data.slidesData;
            if (!_this.carouselLoaded) {
                _this.carouselLoaded = true;
            }
            _this.navData = data.navData;
            _this.dotsData = data.dotsData;
            _this.changeDetectorRef.markForCheck();
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
        tslib_1.__metadata("design:paramtypes", [Object]),
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
        tslib_1.__param(11, Inject(DOCUMENT)),
        tslib_1.__metadata("design:paramtypes", [ElementRef,
            ResizeService,
            CarouselService,
            NavigationService,
            AutoplayService,
            LazyLoadService,
            AnimateService,
            AutoHeightService,
            HashService,
            OwlLogger,
            ChangeDetectorRef, Object])
    ], CarouselComponent);
    return CarouselComponent;
}());
export { CarouselComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW93bC1jYXJvdXNlbC1vLyIsInNvdXJjZXMiOlsibGliL2Nhcm91c2VsL2Nhcm91c2VsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFJVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxTQUFTLEVBQ1QsZUFBZSxFQUNmLFdBQVcsRUFDWCxVQUFVLEVBRVYsWUFBWSxFQUNaLFlBQVksRUFDWixNQUFNLEVBQ04saUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBNEIsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFakUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzNELE9BQU8sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2hHLE9BQU8sRUFBRSxlQUFlLEVBQXVCLE1BQU0sOEJBQThCLENBQUM7QUFNcEYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbkUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbkUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN2RCxPQUFPLEVB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eEhuQyxpQkFBaUIsQ0FvYTdCO0lBQUQsd0JBQUM7Q0FBQSxBQXBhRCxJQW9hQztTQXBhWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBPbkluaXQsXHJcbiAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIERpcmVjdGl2ZSxcclxuICBRdWVyeUxpc3QsXHJcbiAgQ29udGVudENoaWxkcmVuLFxyXG4gIFRlbXBsYXRlUmVmLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgQWZ0ZXJDb250ZW50SW5pdCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSG9zdExpc3RlbmVyLFxyXG4gIEluamVjdCxcclxuICBDaGFuZ2VEZXRlY3RvclJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBPYnNlcnZhYmxlLCBtZXJnZSwgb2YsIGZyb20gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IFJlc2l6ZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9yZXNpemUuc2VydmljZSc7XHJcbmltcG9ydCB7IHRhcCwgZGVsYXksIGZpbHRlciwgc3dpdGNoTWFwLCBmaXJzdCwgbWFwLCBza2lwLCB0YWtlLCB0b0FycmF5IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBDYXJvdXNlbFNlcnZpY2UsIENhcm91c2VsQ3VycmVudERhdGEgfSBmcm9tICcuLi9zZXJ2aWNlcy9jYXJvdXNlbC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3RhZ2VEYXRhIH0gZnJvbSBcIi4uL21vZGVscy9zdGFnZS1kYXRhLm1vZGVsXCI7XHJcbmltcG9ydCB7IE93bERPTURhdGEgfSBmcm9tIFwiLi4vbW9kZWxzL293bERPTS1kYXRhLm1vZGVsXCI7XHJcbmltcG9ydCB7IFNsaWRlTW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvc2xpZGUubW9kZWwnO1xyXG5pbXBvcnQgeyBPd2xPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWxzL293bC1vcHRpb25zLm1vZGVsJztcclxuaW1wb3J0IHsgTmF2RGF0YSwgRG90c0RhdGEgfSBmcm9tICcuLi9tb2RlbHMvbmF2aWdhdGlvbi1kYXRhLm1vZGVscyc7XHJcbmltcG9ydCB7IE5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmF2aWdhdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQXV0b3BsYXlTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvYXV0b3BsYXkuc2VydmljZSc7XHJcbmltcG9ydCB7IExhenlMb2FkU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2xhenlsb2FkLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBbmltYXRlU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2FuaW1hdGUuc2VydmljZSc7XHJcbmltcG9ydCB7IEF1dG9IZWlnaHRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvYXV0b2hlaWdodC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSGFzaFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9oYXNoLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBPd2xMb2dnZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9sb2dnZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnLi4vc2VydmljZXMvZG9jdW1lbnQtcmVmLnNlcnZpY2UnO1xyXG5cclxubGV0IG5leHRJZCA9IDA7XHJcblxyXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICduZy10ZW1wbGF0ZVtjYXJvdXNlbFNsaWRlXScgfSlcclxuZXhwb3J0IGNsYXNzIENhcm91c2VsU2xpZGVEaXJlY3RpdmUge1xyXG4gIC8qKlxyXG4gICAqIFVuaXF1ZSBzbGlkZSBpZGVudGlmaWVyLiBNdXN0IGJlIHVuaXF1ZSBmb3IgdGhlIGVudGlyZSBkb2N1bWVudCBmb3IgcHJvcGVyIGFjY2Vzc2liaWxpdHkgc3VwcG9ydC5cclxuICAgKiBXaWxsIGJlIGF1dG8tZ2VuZXJhdGVkIGlmIG5vdCBwcm92aWRlZC5cclxuICAgKi9cclxuICBASW5wdXQoKSBpZCA9IGBvd2wtc2xpZGUtJHtuZXh0SWQrK31gO1xyXG5cclxuICAvKipcclxuICAgKiBEZWZpbmVzIGhvdyBtdWNoIHdpZHRocyBvZiBjb21tb24gc2xpZGUgd2lsbCBjdXJyZW50IHNsaWRlIGhhdmVcclxuICAgKiBlLmcuIGlmIF9tZXJnZURhdGE9MiwgdGhlIHNsaWRlIHdpbGwgdHdpY2Ugd2lkZXIgdGhlbiBzbGlkZXMgd2l0aCBfbWVyZ2VEYXRhPTFcclxuICAgKi9cclxuICBwcml2YXRlIF9kYXRhTWVyZ2UgPSAxO1xyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IGRhdGFNZXJnZShkYXRhOiBudW1iZXIpIHtcclxuICAgIHRoaXMuX2RhdGFNZXJnZSA9IHRoaXMuaXNOdW1lcmljKGRhdGEpID8gZGF0YSA6IDE7XHJcbiAgfTtcclxuICBnZXQgZGF0YU1lcmdlKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9kYXRhTWVyZ2UgfVxyXG5cclxuICAvKipcclxuICAgKiBXaWR0aCBvZiBzbGlkZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHdpZHRoID0gMDtcclxuXHJcbiAgLyoqXHJcbiAgICogSW5uZXIgY29udGVudCBvZiBkb3QgZm9yIGNlcnRhaW4gc2xpZGU7IGNhbiBiZSBodG1sLW1hcmt1cFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRvdENvbnRlbnQgPSAnJztcclxuXHJcbiAgLyoqXHJcbiAgICogSGFzaCAoZnJhZ21lbnQpIG9mIHVybCB3aGljaCBjb3JyZXNwb25kcyB0byBjZXJ0YWluIHNsaWRlXHJcbiAgICovXHJcbiAgQElucHV0KCkgZGF0YUhhc2ggPSAnJztcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIHRwbFJlZjogVGVtcGxhdGVSZWY8YW55Pikge31cclxuXHJcbiAgLyoqXHJcblx0ICogRGV0ZXJtaW5lcyBpZiB0aGUgaW5wdXQgaXMgYSBOdW1iZXIgb3Igc29tZXRoaW5nIHRoYXQgY2FuIGJlIGNvZXJjZWQgdG8gYSBOdW1iZXJcclxuXHQgKiBAcGFyYW0gLSBUaGUgaW5wdXQgdG8gYmUgdGVzdGVkXHJcblx0ICogQHJldHVybnMgLSBBbiBpbmRpY2F0aW9uIGlmIHRoZSBpbnB1dCBpcyBhIE51bWJlciBvciBjYW4gYmUgY29lcmNlZCB0byBhIE51bWJlclxyXG5cdCAqL1xyXG4gIGlzTnVtZXJpYyhudW1iZXI6IGFueSk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuICFpc05hTihwYXJzZUZsb2F0KG51bWJlcikpO1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIERhdGEgd2hpY2ggd2lsbCBiZSBwYXNzZWQgb3V0IGFmdGVyIGVuZGluZyBvZiB0cmFuc2l0aW9uIG9mIGNhcm91c2VsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU2xpZGVzT3V0cHV0RGF0YSB7XHJcbiAgc3RhcnRQb3NpdGlvbj86IG51bWJlcjtcclxuICBzbGlkZXM/OiBTbGlkZU1vZGVsW107XHJcbn07XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ293bC1jYXJvdXNlbC1vJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdiBjbGFzcz1cIm93bC1jYXJvdXNlbCBvd2wtdGhlbWVcIiAjb3dsQ2Fyb3VzZWxcclxuICAgICAgW25nQ2xhc3NdPVwieydvd2wtcnRsJzogb3dsRE9NRGF0YT8ucnRsLFxyXG4gICAgICAgICAgICAgICAgICAnb3dsLWxvYWRlZCc6IG93bERPTURhdGE/LmlzTG9hZGVkLFxyXG4gICAgICAgICAgICAgICAgICAnb3dsLXJlc3BvbnNpdmUnOiBvd2xET01EYXRhPy5pc1Jlc3BvbnNpdmUsXHJcbiAgICAgICAgICAgICAgICAgICdvd2wtZHJhZyc6IG93bERPTURhdGE/LmlzTW91c2VEcmFnYWJsZSxcclxuICAgICAgICAgICAgICAgICAgJ293bC1ncmFiJzogb3dsRE9NRGF0YT8uaXNHcmFifVwiXHJcbiAgICAgIChtb3VzZW92ZXIpPVwic3RhcnRQYXVzaW5nKClcIlxyXG4gICAgICAobW91c2VsZWF2ZSk9XCJzdGFydFBsYXlNTCgpXCJcclxuICAgICAgKHRvdWNoc3RhcnQpPVwic3RhcnRQYXVzaW5nKClcIlxyXG4gICAgICAodG91Y2hlbmQpPVwic3RhcnRQbGF5VEUoKVwiPlxyXG5cclxuICAgICAgPGRpdiAqbmdJZj1cImNhcm91c2VsTG9hZGVkXCIgY2xhc3M9XCJvd2wtc3RhZ2Utb3V0ZXJcIj5cclxuICAgICAgICA8b3dsLXN0YWdlIFtvd2xEcmFnZ2FibGVdPVwieydpc01vdXNlRHJhZ2FibGUnOiBvd2xET01EYXRhPy5pc01vdXNlRHJhZ2FibGUsICdpc1RvdWNoRHJhZ2FibGUnOiBvd2xET01EYXRhPy5pc1RvdWNoRHJhZ2FibGV9XCJcclxuICAgICAgICAgICAgICAgICAgICBbc3RhZ2VEYXRhXT1cInN0YWdlRGF0YVwiXHJcbiAgICAgICAgICAgICAgICAgICAgW3NsaWRlc0RhdGFdPVwic2xpZGVzRGF0YVwiPjwvb3dsLXN0YWdlPlxyXG4gICAgICA8L2Rpdj4gPCEtLSAvLm93bC1zdGFnZS1vdXRlciAtLT5cclxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInNsaWRlcy50b0FycmF5KCkubGVuZ3RoXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm93bC1uYXZcIiBbbmdDbGFzc109XCJ7J2Rpc2FibGVkJzogbmF2RGF0YT8uZGlzYWJsZWR9XCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwib3dsLXByZXZcIiBbbmdDbGFzc109XCJ7J2Rpc2FibGVkJzogbmF2RGF0YT8ucHJldj8uZGlzYWJsZWR9XCIgKGNsaWNrKT1cInByZXYoKVwiIFtpbm5lckhUTUxdPVwibmF2RGF0YT8ucHJldj8uaHRtbFRleHRcIj48L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJvd2wtbmV4dFwiIFtuZ0NsYXNzXT1cInsnZGlzYWJsZWQnOiBuYXZEYXRhPy5uZXh0Py5kaXNhYmxlZH1cIiAoY2xpY2spPVwibmV4dCgpXCIgW2lubmVySFRNTF09XCJuYXZEYXRhPy5uZXh0Py5odG1sVGV4dFwiPjwvZGl2PlxyXG4gICAgICAgIDwvZGl2PiA8IS0tIC8ub3dsLW5hdiAtLT5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwib3dsLWRvdHNcIiBbbmdDbGFzc109XCJ7J2Rpc2FibGVkJzogZG90c0RhdGE/LmRpc2FibGVkfVwiPlxyXG4gICAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgZG90IG9mIGRvdHNEYXRhPy5kb3RzXCIgY2xhc3M9XCJvd2wtZG90XCIgW25nQ2xhc3NdPVwieydhY3RpdmUnOiBkb3QuYWN0aXZlLCAnb3dsLWRvdC10ZXh0JzogZG90LnNob3dJbm5lckNvbnRlbnR9XCIgKGNsaWNrKT1cIm1vdmVCeURvdChkb3QuaWQpXCI+XHJcbiAgICAgICAgICAgIDxzcGFuIFtpbm5lckhUTUxdPVwiZG90LmlubmVyQ29udGVudFwiPjwvc3Bhbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PiA8IS0tIC8ub3dsLWRvdHMgLS0+XHJcbiAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgPC9kaXY+IDwhLS0gLy5vd2wtY2Fyb3VzZWwgb3dsLWxvYWRlZCAtLT5cclxuICBgLFxyXG4gIHN0eWxlczogW2Aub3dsLXRoZW1lIHsgZGlzcGxheTogYmxvY2s7IH1gXSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIE5hdmlnYXRpb25TZXJ2aWNlLFxyXG4gICAgQXV0b3BsYXlTZXJ2aWNlLFxyXG4gICAgQ2Fyb3VzZWxTZXJ2aWNlLFxyXG4gICAgTGF6eUxvYWRTZXJ2aWNlLFxyXG4gICAgQW5pbWF0ZVNlcnZpY2UsXHJcbiAgICBBdXRvSGVpZ2h0U2VydmljZSxcclxuICAgIEhhc2hTZXJ2aWNlXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2Fyb3VzZWxDb21wb25lbnRcclxuICBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcclxuICBAQ29udGVudENoaWxkcmVuKENhcm91c2VsU2xpZGVEaXJlY3RpdmUpXHJcbiAgc2xpZGVzOiBRdWVyeUxpc3Q8Q2Fyb3VzZWxTbGlkZURpcmVjdGl2ZT47XHJcblxyXG4gIEBPdXRwdXQoKSB0cmFuc2xhdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxTbGlkZXNPdXRwdXREYXRhPigpO1xyXG4gIEBPdXRwdXQoKSBkcmFnZ2luZyA9IG5ldyBFdmVudEVtaXR0ZXI8e2RyYWdnaW5nOiBib29sZWFuLCBkYXRhOiBTbGlkZXNPdXRwdXREYXRhfT4oKTtcclxuICBAT3V0cHV0KCkgY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxTbGlkZXNPdXRwdXREYXRhPigpO1xyXG4gIEBPdXRwdXQoKSBjaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxTbGlkZXNPdXRwdXREYXRhPigpO1xyXG4gIEBPdXRwdXQoKSBpbml0aWFsaXplZCA9IG5ldyBFdmVudEVtaXR0ZXI8U2xpZGVzT3V0cHV0RGF0YT4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogV2lkdGggb2YgY2Fyb3VzZWwgd2luZG93ICh0YWcgd2l0aCBjbGFzcyAub3dsLWNhcm91c2VsKSwgaW4gd2ljaCB3ZSBjYW4gc2VlIG1vdmluZyBzbGlkZXJzXHJcbiAgICovXHJcbiAgY2Fyb3VzZWxXaW5kb3dXaWR0aDogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gdG8gJ3Jlc2l6ZScgZXZlbnRcclxuICAgKi9cclxuICByZXNpemVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaXB0aW9uIG1lcmdlIE9ic2VydmFibGUsIHdoaWNoIG1lcmdlcyBhbGwgT2JzZXJ2YWJsZXMgaW4gdGhlIGNvbXBvbmVudCBleGNlcHQgJ3Jlc2l6ZScgT2JzZXJ2YWJsZSBhbmQgdGhpcy5zbGlkZXMuY2hhbmdlcygpXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfYWxsT2JzZXJ2U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlwdGlvbiB0byBgdGhpcy5zbGlkZXMuY2hhbmdlcygpLlxyXG4gICAqIEl0IGNvdWxkIGJlIGluY2x1ZGVkIGluICd0aGlzLl9hbGxPYnNlcnZTdWJzY3JpcHRpb24nLCBidXQgdGhhdCBzdWJjcmlwdGlvbiBnZXQgY3JlYXRlZCBkdXJpbmcgdGhlIGluaXRpYWxpemluZyBvZiBjb21wb25lbnRcclxuICAgKiBhbmQgJ3RoaXMuc2xpZGVzJyBhcmUgdW5kZWZpbmVkIGF0IHRoYXQgbW9tZW50LiBTbyBpdCdzIG5lZWRlZCB0byB3YWl0IGZvciBpbml0aWFsaXphdGlvbiBvZiBjb250ZW50LlxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3NsaWRlc0NoYW5nZXNTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ3VycmVudCBzZXR0aW5ncyBmb3IgdGhlIGNhcm91c2VsLlxyXG4gICAqL1xyXG4gIG93bERPTURhdGE6IE93bERPTURhdGE7XHJcblxyXG4gIC8qKlxyXG4gICAqIERhdGEgb2Ygb3dsLXN0YWdlXHJcbiAgICovXHJcbiAgc3RhZ2VEYXRhOiBTdGFnZURhdGE7XHJcblxyXG4gIC8qKlxyXG5cdCAqICBEYXRhIG9mIGV2ZXJ5IHNsaWRlXHJcblx0ICovXHJcbiAgc2xpZGVzRGF0YTogU2xpZGVNb2RlbFtdID0gW107XHJcblxyXG4gIC8qKlxyXG5cdCAqIERhdGEgb2YgbmF2aWdhdGlvbiBibG9ja1xyXG5cdCAqL1xyXG5cdG5hdkRhdGE6IE5hdkRhdGE7XHJcblxyXG5cdC8qKlxyXG5cdCAqIERhdGEgb2YgZG90cyBibG9ja1xyXG5cdCAqL1xyXG4gIGRvdHNEYXRhOiBEb3RzRGF0YTtcclxuXHJcbiAgLyoqXHJcbiAgICogRGF0YSwgd2ljaCBhcmUgcGFzc2VkIG91dCBvZiBjYXJvdXNlbCBhZnRlciBlbmRpbmcgb2YgdHJhbnNpb25pbmcgb2YgY2Fyb3VzZWxcclxuICAgKi9cclxuICBzbGlkZXNPdXRwdXREYXRhOiBTbGlkZXNPdXRwdXREYXRhO1xyXG5cclxuICAvKipcclxuICAgKiBTaG93cyB3aGV0aGVyIGNhcm91c2VsIGlzIGxvYWRlZCBvZiBub3QuXHJcbiAgICovXHJcbiAgY2Fyb3VzZWxMb2FkZWQgPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVXNlcidzIG9wdGlvbnNcclxuICAgKi9cclxuICBASW5wdXQoKSBvcHRpb25zOiBPd2xPcHRpb25zO1xyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZhYmxlIGZvciBnZXR0aW5nIGN1cnJlbnQgVmlldyBTZXR0aW5nc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgX3ZpZXdDdXJTZXR0aW5ncyQ6IE9ic2VydmFibGU8Q2Fyb3VzZWxDdXJyZW50RGF0YT47XHJcblxyXG4gIC8qKlxyXG4gICAqIE9ic2VydmFibGUgZm9yIGNhdGNoaW5nIHRoZSBlbmQgb2YgdHJhbnNpdGlvbiBvZiBjYXJvdXNlbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3RyYW5zbGF0ZWRDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPjtcclxuXHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2YWJsZSBmb3IgY2F0Y2hpbmcgdGhlIHN0YXJ0IG9mIGRyYWdnaW5nIG9mIHRoZSBjYXJvdXNlbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2RyYWdnaW5nQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz47XHJcblxyXG4gIC8qKlxyXG4gICAqIE9ic2VydmFibGUgZm9yIGNhdGNoaW5nIHRoZSBzdGFydCBvZiBjaGFuZ2luZyBvZiB0aGUgY2Fyb3VzZWxcclxuICAgKi9cclxuICBwcml2YXRlIF9jaGFuZ2VDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPjtcclxuXHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2YWJsZSBmb3IgY2F0Y2hpbmcgdGhlIG1vbWVudCB3aGVuIHRoZSBkYXRhIGFib3V0IHNsaWRlcyBjaGFuZ2VkLCBtb3JlIGV4YWN0bHkgd2hlbiB0aGUgcG9zaXRpb24gY2hhbmdlZC5cclxuICAgKi9cclxuICBwcml2YXRlIF9jaGFuZ2VkQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPGFueT47XHJcblxyXG4gIC8qKlxyXG4gICAqIE9ic2VydmFibGUgZm9yIGNhdGNoaW5nIHRoZSBpbml0aWFsaXphdGlvbiBvZiBjaGFuZ2luZyB0aGUgY2Fyb3VzZWxcclxuICAgKi9cclxuICBwcml2YXRlIF9pbml0aWFsaXplZENhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+O1xyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZhYmxlIGZvciBtZXJnaW5nIGFsbCBPYnNlcnZhYmxlcyBhbmQgY3JlYXRpbmcgb25lIHN1YnNjcmlwdGlvblxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2Nhcm91c2VsTWVyZ2UkOiBPYnNlcnZhYmxlPENhcm91c2VsQ3VycmVudERhdGEgfCBzdHJpbmc+O1xyXG4gIHByaXZhdGUgZG9jUmVmOiBEb2N1bWVudDtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxyXG4gICAgcHJpdmF0ZSByZXNpemVTZXJ2aWNlOiBSZXNpemVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjYXJvdXNlbFNlcnZpY2U6IENhcm91c2VsU2VydmljZSxcclxuICAgIHByaXZhdGUgbmF2aWdhdGlvblNlcnZpY2U6IE5hdmlnYXRpb25TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBhdXRvcGxheVNlcnZpY2U6IEF1dG9wbGF5U2VydmljZSxcclxuICAgIHByaXZhdGUgbGF6eUxvYWRTZXJ2aWNlOiBMYXp5TG9hZFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGFuaW1hdGVTZXJ2aWNlOiBBbmltYXRlU2VydmljZSxcclxuICAgIHByaXZhdGUgYXV0b0hlaWdodFNlcnZpY2U6IEF1dG9IZWlnaHRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBoYXNoU2VydmljZTogSGFzaFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGxvZ2dlcjogT3dsTG9nZ2VyLFxyXG4gICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBkb2NSZWY6IGFueVxyXG4gICkge1xyXG4gICAgdGhpcy5kb2NSZWYgPSBkb2NSZWYgYXMgRG9jdW1lbnQ7XHJcblxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6dmlzaWJpbGl0eWNoYW5nZScsIFsnJGV2ZW50J10pXHJcbiAgb25WaXNpYmlsaXR5Q2hhbmdlKGV2OiBhbnkpIHtcclxuICAgIGlmICghdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b3BsYXkpIHJldHVybjtcclxuICAgIHN3aXRjaCAodGhpcy5kb2NSZWYudmlzaWJpbGl0eVN0YXRlKSB7XHJcbiAgICAgIGNhc2UgJ3Zpc2libGUnOlxyXG4gICAgICAgIHRoaXMuYXV0b3BsYXlTZXJ2aWNlLnBsYXkoKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgJ2hpZGRlbic6XHJcbiAgICAgICAgdGhpcy5hdXRvcGxheVNlcnZpY2Uuc3RvcCgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9O1xyXG5cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnNweURhdGFTdHJlYW1zKCk7XHJcblxyXG4gICAgdGhpcy5jYXJvdXNlbFdpbmRvd1dpZHRoID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgICcub3dsLWNhcm91c2VsJ1xyXG4gICAgKS5jbGllbnRXaWR0aDtcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcclxuICB9XHJcbiAgLy8gbmdBZnRlckNvbnRlbnRDaGVja2VkKCkgRU5EXHJcblxyXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcclxuICAgIGlmICh0aGlzLnNsaWRlcy50b0FycmF5KCkubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHVwKHRoaXMuY2Fyb3VzZWxXaW5kb3dXaWR0aCwgdGhpcy5zbGlkZXMudG9BcnJheSgpLCB0aGlzLm9wdGlvbnMpO1xyXG4gICAgICB0aGlzLmNhcm91c2VsU2VydmljZS5pbml0aWFsaXplKHRoaXMuc2xpZGVzLnRvQXJyYXkoKSk7XHJcblxyXG4gICAgICB0aGlzLl93aW5SZXNpemVXYXRjaGVyKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmxvZ2dlci5sb2coYFRoZXJlIGFyZSBubyBzbGlkZXMgdG8gc2hvdy4gU28gdGhlIGNhcm91c2VsIHdvbid0IGJlIHJlbmRlcmVkYCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fc2xpZGVzQ2hhbmdlc1N1YnNjcmlwdGlvbiA9IHRoaXMuc2xpZGVzLmNoYW5nZXMucGlwZShcclxuICAgICAgdGFwKChzbGlkZXMpID0+IHtcclxuICAgICAgICBpZiAoc2xpZGVzLnRvQXJyYXkoKS5sZW5ndGgpIHtcclxuICAgICAgICAgIC8vIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldEl0ZW1zKHNsaWRlcy50b0FycmF5KCkpO1xyXG4gICAgICAgICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dXAodGhpcy5jYXJvdXNlbFdpbmRvd1dpZHRoLCBzbGlkZXMudG9BcnJheSgpLCB0aGlzLm9wdGlvbnMpO1xyXG4gICAgICAgICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UuaW5pdGlhbGl6ZShzbGlkZXMudG9BcnJheSgpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5jYXJvdXNlbExvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5sb2dnZXIubG9nKGBUaGVyZSBhcmUgbm8gc2xpZGVzIHRvIHNob3cuIFNvIHRoZSBjYXJvdXNlbCB3b24ndCBiZSByZS1yZW5kZXJlZGApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICkuc3Vic2NyaWJlKCgpPT57fSk7XHJcblxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICBpZiAodGhpcy5yZXNpemVTdWJzY3JpcHRpb24pIHtcclxuICAgICAgdGhpcy5yZXNpemVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5fc2xpZGVzQ2hhbmdlc1N1YnNjcmlwdGlvbikge1xyXG4gICAgICB0aGlzLl9zbGlkZXNDaGFuZ2VzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX2FsbE9ic2VydlN1YnNjcmlwdGlvbikge1xyXG4gICAgICB0aGlzLl9hbGxPYnNlcnZTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEpvaW5zIHRoZSBvYnNlcnZhYmxlIGxvZ2luIGluIG9uZSBwbGFjZTogc2V0cyB2YWx1ZXMgdG8gc29tZSBvYnNlcnZhYmxlcywgbWVyZ2VzIHRoaXMgb2JzZXJ2YWJsZXMgYW5kXHJcbiAgICogc3ViY3JpYmVzIHRvIG1lcmdlIGZ1bmNcclxuICAgKi9cclxuICBzcHlEYXRhU3RyZWFtcygpIHtcclxuICAgIHRoaXMuX3ZpZXdDdXJTZXR0aW5ncyQgPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRWaWV3Q3VyU2V0dGluZ3MoKS5waXBlKFxyXG4gICAgICB0YXAoZGF0YSA9PiB7XHJcbiAgICAgICAgdGhpcy5vd2xET01EYXRhID0gZGF0YS5vd2xET01EYXRhO1xyXG4gICAgICAgIHRoaXMuc3RhZ2VEYXRhID0gZGF0YS5zdGFnZURhdGE7XHJcbiAgICAgICAgdGhpcy5zbGlkZXNEYXRhID0gZGF0YS5zbGlkZXNEYXRhO1xyXG4gICAgICAgIGlmICghdGhpcy5jYXJvdXNlbExvYWRlZCkge1xyXG4gICAgICAgICAgdGhpcy5jYXJvdXNlbExvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubmF2RGF0YSA9IGRhdGEubmF2RGF0YTtcclxuICAgICAgICB0aGlzLmRvdHNEYXRhID0gZGF0YS5kb3RzRGF0YTtcclxuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLl9pbml0aWFsaXplZENhcm91c2VsJCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldEluaXRpYWxpemVkU3RhdGUoKS5waXBlKFxyXG4gICAgICB0YXAoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZ2F0aGVyVHJhbnNsYXRlZERhdGEoKTtcclxuICAgICAgICB0aGlzLmluaXRpYWxpemVkLmVtaXQodGhpcy5zbGlkZXNPdXRwdXREYXRhKTtcclxuICAgICAgICAvLyB0aGlzLnNsaWRlc091dHB1dERhdGEgPSB7fTtcclxuICAgICAgfSlcclxuICAgIClcclxuXHJcbiAgICB0aGlzLl90cmFuc2xhdGVkQ2Fyb3VzZWwkID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0VHJhbnNsYXRlZFN0YXRlKCkucGlwZShcclxuICAgICAgdGFwKCgpID0+IHtcclxuICAgICAgICB0aGlzLmdhdGhlclRyYW5zbGF0ZWREYXRhKCk7XHJcbiAgICAgICAgdGhpcy50cmFuc2xhdGVkLmVtaXQodGhpcy5zbGlkZXNPdXRwdXREYXRhKTtcclxuICAgICAgICAvLyB0aGlzLnNsaWRlc091dHB1dERhdGEgPSB7fTtcclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5fY2hhbmdlQ2Fyb3VzZWwkID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0Q2hhbmdlU3RhdGUoKS5waXBlKFxyXG4gICAgICB0YXAoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZ2F0aGVyVHJhbnNsYXRlZERhdGEoKTtcclxuICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMuc2xpZGVzT3V0cHV0RGF0YSk7XHJcbiAgICAgICAgLy8gdGhpcy5zbGlkZXNPdXRwdXREYXRhID0ge307XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuX2NoYW5nZWRDYXJvdXNlbCQgPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRDaGFuZ2VTdGF0ZSgpLnBpcGUoXHJcbiAgICAgIHN3aXRjaE1hcCh2YWx1ZSA9PiB7XHJcbiAgICAgICAgY29uc3QgY2hhbmdlZFBvc2l0aW9uOiBPYnNlcnZhYmxlPFNsaWRlc091dHB1dERhdGE+ID0gb2YodmFsdWUpLnBpcGUoXHJcbiAgICAgICAgICBmaWx0ZXIoKCkgPT4gdmFsdWUucHJvcGVydHkubmFtZSA9PT0gJ3Bvc2l0aW9uJyksXHJcbiAgICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gZnJvbSh0aGlzLnNsaWRlc0RhdGEpKSxcclxuICAgICAgICAgIHNraXAodmFsdWUucHJvcGVydHkudmFsdWUpLFxyXG4gICAgICAgICAgdGFrZSh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5pdGVtcyksXHJcbiAgICAgICAgICBtYXAoc2xpZGUgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBjbG9uZWRJZFByZWZpeCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmNsb25lZElkUHJlZml4O1xyXG4gICAgICAgICAgICBjb25zdCBpZCA9IHNsaWRlLmlkLmluZGV4T2YoY2xvbmVkSWRQcmVmaXgpID49IDAgPyBzbGlkZS5pZC5zbGljZShjbG9uZWRJZFByZWZpeC5sZW5ndGgpIDogc2xpZGUuaWQ7XHJcbiAgICAgICAgICAgIHJldHVybiB7IC4uLnNsaWRlLCBpZDogaWQsIGlzQWN0aXZlOiB0cnVlIH07XHJcbiAgICAgICAgICB9KSxcclxuICAgICAgICAgIHRvQXJyYXkoKSxcclxuICAgICAgICAgIG1hcChzbGlkZXMgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgIHNsaWRlczogc2xpZGVzLFxyXG4gICAgICAgICAgICAgIHN0YXJ0UG9zaXRpb246IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnJlbGF0aXZlKHZhbHVlLnByb3BlcnR5LnZhbHVlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIGNvbnN0IGNoYW5nZWRTZXR0aW5nOiBPYnNlcnZhYmxlPFNsaWRlc091dHB1dERhdGE+ID0gb2YodmFsdWUpLnBpcGUoXHJcbiAgICAgICAgLy8gICBmaWx0ZXIoKCkgPT4gdmFsdWUucHJvcGVydHkubmFtZSA9PT0gJ3NldHRpbmdzJyksXHJcbiAgICAgICAgLy8gICBtYXAoKCkgPT4ge1xyXG4gICAgICAgIC8vICAgICByZXR1cm4ge1xyXG4gICAgICAgIC8vICAgICAgIHNsaWRlczogW10sXHJcbiAgICAgICAgLy8gICAgICAgc3RhcnRQb3NpdGlvbjogdGhpcy5jYXJvdXNlbFNlcnZpY2UucmVsYXRpdmUodmFsdWUucHJvcGVydHkudmFsdWUpXHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyAgIH0pXHJcbiAgICAgICAgLy8gKVxyXG4gICAgICAgIHJldHVybiBtZXJnZShjaGFuZ2VkUG9zaXRpb24pO1xyXG4gICAgICB9KSxcclxuICAgICAgdGFwKHNsaWRlc0RhdGEgPT4ge1xyXG4gICAgICAgIHRoaXMuZ2F0aGVyVHJhbnNsYXRlZERhdGEoKTtcclxuICAgICAgICB0aGlzLmNoYW5nZWQuZW1pdChzbGlkZXNEYXRhLnNsaWRlcy5sZW5ndGggPyBzbGlkZXNEYXRhIDogdGhpcy5zbGlkZXNPdXRwdXREYXRhKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnNsaWRlc091dHB1dERhdGEpO1xyXG4gICAgICAgIC8vIHRoaXMuc2xpZGVzT3V0cHV0RGF0YSA9IHt9O1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLl9kcmFnZ2luZ0Nhcm91c2VsJCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldERyYWdTdGF0ZSgpLnBpcGUoXHJcbiAgICAgIHRhcCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5nYXRoZXJUcmFuc2xhdGVkRGF0YSgpO1xyXG4gICAgICAgIHRoaXMuZHJhZ2dpbmcuZW1pdCh7ZHJhZ2dpbmc6IHRydWUsIGRhdGE6IHRoaXMuc2xpZGVzT3V0cHV0RGF0YX0pO1xyXG4gICAgICB9KSxcclxuICAgICAgc3dpdGNoTWFwKFxyXG4gICAgICAgICgpID0+IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldERyYWdnZWRTdGF0ZSgpLnBpcGUoXHJcbiAgICAgICAgICBtYXAoKCkgPT4gISF0aGlzLmNhcm91c2VsU2VydmljZS5pcygnYW5pbWF0aW5nJykpXHJcbiAgICAgICAgKVxyXG4gICAgICApLFxyXG4gICAgICBzd2l0Y2hNYXAoXHJcbiAgICAgICAgYW5pbSA9PiB7XHJcbiAgICAgICAgICBpZiAoYW5pbSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0VHJhbnNsYXRlZFN0YXRlKCkucGlwZShcclxuICAgICAgICAgICAgICBmaXJzdCgpLFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9mKCdub3QgYW5pbWF0aW5nJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICApLFxyXG4gICAgICB0YXAoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZHJhZ2dpbmcuZW1pdCh7ZHJhZ2dpbmc6IGZhbHNlLCBkYXRhOiB0aGlzLnNsaWRlc091dHB1dERhdGF9KTtcclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5fY2Fyb3VzZWxNZXJnZSQgPSBtZXJnZShcclxuICAgICAgdGhpcy5fdmlld0N1clNldHRpbmdzJCxcclxuICAgICAgdGhpcy5fdHJhbnNsYXRlZENhcm91c2VsJCxcclxuICAgICAgdGhpcy5fZHJhZ2dpbmdDYXJvdXNlbCQsXHJcbiAgICAgIHRoaXMuX2NoYW5nZUNhcm91c2VsJCxcclxuICAgICAgdGhpcy5fY2hhbmdlZENhcm91c2VsJCxcclxuICAgICAgdGhpcy5faW5pdGlhbGl6ZWRDYXJvdXNlbCRcclxuICAgICk7XHJcbiAgICB0aGlzLl9hbGxPYnNlcnZTdWJzY3JpcHRpb24gPSB0aGlzLl9jYXJvdXNlbE1lcmdlJC5zdWJzY3JpYmUoKCkgPT4ge30pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdCBzdWJzY3JpcHRpb24gdG8gcmVzaXplIGV2ZW50IGFuZCBhdHRhY2hlcyBoYW5kbGVyIGZvciB0aGlzIGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfd2luUmVzaXplV2F0Y2hlcigpIHtcclxuICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLmNhcm91c2VsU2VydmljZS5fb3B0aW9ucy5yZXNwb25zaXZlKS5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5yZXNpemVTdWJzY3JpcHRpb24gPSB0aGlzLnJlc2l6ZVNlcnZpY2Uub25SZXNpemUkXHJcbiAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICBmaWx0ZXIoKCkgPT4gdGhpcy5jYXJvdXNlbFdpbmRvd1dpZHRoICE9PSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLm93bC1jYXJvdXNlbCcpLmNsaWVudFdpZHRoKSxcclxuICAgICAgICAgIGRlbGF5KHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLnJlc3BvbnNpdmVSZWZyZXNoUmF0ZSlcclxuICAgICAgICApXHJcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmNhcm91c2VsU2VydmljZS5vblJlc2l6ZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLm93bC1jYXJvdXNlbCcpLmNsaWVudFdpZHRoKTtcclxuICAgICAgICAgIHRoaXMuY2Fyb3VzZWxXaW5kb3dXaWR0aCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcub3dsLWNhcm91c2VsJykuY2xpZW50V2lkdGg7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGVyIGZvciB0cmFuc2l0aW9lbmQgZXZlbnRcclxuICAgKi9cclxuICBvblRyYW5zaXRpb25FbmQoKSB7XHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5vblRyYW5zaXRpb25FbmQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhbmRsZXIgZm9yIGNsaWNrIGV2ZW50LCBhdHRhY2hlZCB0byBuZXh0IGJ1dHRvblxyXG4gICAqL1xyXG4gIG5leHQoKSB7XHJcbiAgICBpZiAoIXRoaXMuY2Fyb3VzZWxMb2FkZWQpIHJldHVybjtcclxuICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UubmV4dCh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5uYXZTcGVlZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGVyIGZvciBjbGljayBldmVudCwgYXR0YWNoZWQgdG8gcHJldiBidXR0b25cclxuICAgKi9cclxuICBwcmV2KCkge1xyXG4gICAgaWYgKCF0aGlzLmNhcm91c2VsTG9hZGVkKSByZXR1cm47XHJcbiAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLnByZXYodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MubmF2U3BlZWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlciBmb3IgY2xpY2sgZXZlbnQsIGF0dGFjaGVkIHRvIGRvdHNcclxuICAgKi9cclxuICBtb3ZlQnlEb3QoZG90SWQ6IHN0cmluZykge1xyXG4gICAgaWYgKCF0aGlzLmNhcm91c2VsTG9hZGVkKSByZXR1cm47XHJcbiAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLm1vdmVCeURvdChkb3RJZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiByZXdpbmRzIGNhcm91c2VsIHRvIHNsaWRlIHdpdGggbmVlZGVkIGlkXHJcbiAgICogQHBhcmFtIGlkIGZyYWdtZW50IG9mIHVybFxyXG4gICAqL1xyXG4gIHRvKGlkOiBzdHJpbmcpIHtcclxuICAgIC8vIGlmICghdGhpcy5jYXJvdXNlbExvYWRlZCB8fCAoKHRoaXMubmF2RGF0YSAmJiB0aGlzLm5hdkRhdGEuZGlzYWJsZWQpICYmICh0aGlzLmRvdHNEYXRhICYmIHRoaXMuZG90c0RhdGEuZGlzYWJsZWQpKSkgcmV0dXJuO1xyXG4gICAgaWYgKCF0aGlzLmNhcm91c2VsTG9hZGVkKSByZXR1cm47XHJcbiAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLnRvU2xpZGVCeUlkKGlkKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdhdGhlcnMgYW5kIHByZXBhcmVzIGRhdGEgaW50ZW5kZWQgZm9yIHBhc3NpbmcgdG8gdGhlIHVzZXIgYnkgbWVhbnMgb2YgZmlyaW5nIGV2ZW50IHRyYW5zbGF0ZWRDYXJvdXNlbFxyXG4gICAqL1xyXG4gIGdhdGhlclRyYW5zbGF0ZWREYXRhKCkge1xyXG4gICAgbGV0IHN0YXJ0UG9zaXRpb246IG51bWJlcjtcclxuICAgIGNvbnN0IGNsb25lZElkUHJlZml4ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuY2xvbmVkSWRQcmVmaXg7XHJcbiAgICBjb25zdCBhY3RpdmVTbGlkZXM6IFNsaWRlTW9kZWxbXSA9IHRoaXMuc2xpZGVzRGF0YVxyXG4gICAgICAuZmlsdGVyKHNsaWRlID0+IHNsaWRlLmlzQWN0aXZlID09PSB0cnVlKVxyXG4gICAgICAubWFwKHNsaWRlID0+IHtcclxuICAgICAgICBjb25zdCBpZCA9IHNsaWRlLmlkLmluZGV4T2YoY2xvbmVkSWRQcmVmaXgpID49IDAgPyBzbGlkZS5pZC5zbGljZShjbG9uZWRJZFByZWZpeC5sZW5ndGgpIDogc2xpZGUuaWQ7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIGlkOiBpZCxcclxuICAgICAgICAgIHdpZHRoOiBzbGlkZS53aWR0aCxcclxuICAgICAgICAgIG1hcmdpbkw6IHNsaWRlLm1hcmdpbkwsXHJcbiAgICAgICAgICBtYXJnaW5SOiBzbGlkZS5tYXJnaW5SLFxyXG4gICAgICAgICAgY2VudGVyOiBzbGlkZS5pc0NlbnRlcmVkXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIHN0YXJ0UG9zaXRpb24gPSB0aGlzLmNhcm91c2VsU2VydmljZS5yZWxhdGl2ZSh0aGlzLmNhcm91c2VsU2VydmljZS5jdXJyZW50KCkpO1xyXG4gICAgdGhpcy5zbGlkZXNPdXRwdXREYXRhID0ge1xyXG4gICAgICBzdGFydFBvc2l0aW9uOiBzdGFydFBvc2l0aW9uLFxyXG4gICAgICBzbGlkZXM6IGFjdGl2ZVNsaWRlc1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnRzIHBhdXNpbmdcclxuICAgKi9cclxuICBzdGFydFBhdXNpbmcoKSB7XHJcbiAgICB0aGlzLmF1dG9wbGF5U2VydmljZS5zdGFydFBhdXNpbmcoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0YXJ0cyBwbGF5aW5nIGFmdGVyIG1vdXNlIGxlYXZlcyBjYXJvdXNlbFxyXG4gICAqL1xyXG4gIHN0YXJ0UGxheU1MKCkge1xyXG4gICAgdGhpcy5hdXRvcGxheVNlcnZpY2Uuc3RhcnRQbGF5aW5nTW91c2VMZWF2ZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnRzIHBsYXlpbmcgYWZ0ZXIgdG91Y2ggZW5kc1xyXG4gICAqL1xyXG4gIHN0YXJ0UGxheVRFKCkge1xyXG4gICAgdGhpcy5hdXRvcGxheVNlcnZpY2Uuc3RhcnRQbGF5aW5nVG91Y2hFbmQoKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==