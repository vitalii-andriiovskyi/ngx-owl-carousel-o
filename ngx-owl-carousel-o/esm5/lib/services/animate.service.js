/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { merge } from 'rxjs';
import { CarouselService } from './carousel.service';
import { tap } from 'rxjs/operators';
var AnimateService = /** @class */ (function () {
    function AnimateService(carouselService) {
        this.carouselService = carouselService;
        /**
         * s
         */
        this.swapping = true;
        /**
         * active slide before translating
         */
        this.previous = undefined;
        /**
         * new active slide after translating
         */
        this.next = undefined;
        this.spyDataStreams();
    }
    /**
     * @return {?}
     */
    AnimateService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.animateSubscription.unsubscribe();
    };
    /**
     * Defines Observables which service must observe
     */
    /**
     * Defines Observables which service must observe
     * @return {?}
     */
    AnimateService.prototype.spyDataStreams = /**
     * Defines Observables which service must observe
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var changeSettings$ = this.carouselService.getChangeState().pipe(tap(function (data) {
            if (data.property.name === 'position') {
                _this.previous = _this.carouselService.current();
                _this.next = data.property.value;
            }
        }));
        /** @type {?} */
        var dragCarousel$ = this.carouselService.getDragState();
        /** @type {?} */
        var draggedCarousel$ = this.carouselService.getDraggedState();
        /** @type {?} */
        var translatedCarousel$ = this.carouselService.getTranslatedState();
        /** @type {?} */
        var dragTranslatedMerge$ = merge(dragCarousel$, draggedCarousel$, translatedCarousel$).pipe(tap(function (data) { return _this.swapping = data === 'translated'; }));
        /** @type {?} */
        var translateCarousel$ = this.carouselService.getTranslateState().pipe(tap(function (data) {
            if (_this.swapping && (_this.carouselService._options.animateOut || _this.carouselService._options.animateIn)) {
                _this._swap();
            }
        }));
        /** @type {?} */
        var animateMerge$ = merge(changeSettings$, translateCarousel$, dragTranslatedMerge$).pipe();
        this.animateSubscription = animateMerge$.subscribe(function () { });
    };
    /**
       * Toggles the animation classes whenever an translations starts.
       * @returns
       */
    /**
     * Toggles the animation classes whenever an translations starts.
     * @return {?}
     */
    AnimateService.prototype._swap = /**
     * Toggles the animation classes whenever an translations starts.
     * @return {?}
     */
    function () {
        if (this.carouselService.settings.items !== 1) {
            return;
        }
        // if (!$.support.animation || !$.support.transition) {
        // 	return;
        // }
        this.carouselService.speed(0);
        /** @type {?} */
        var left;
        /** @type {?} */
        var previous = this.carouselService.slidesData[this.previous];
        /** @type {?} */
        var next = this.carouselService.slidesData[this.next];
        /** @type {?} */
        var incoming = this.carouselService.settings.animateIn;
        /** @type {?} */
        var outgoing = this.carouselService.settings.animateOut;
        if (this.carouselService.current() === this.previous) {
            return;
        }
        if (outgoing) {
            left = +this.carouselService.coordinates(this.previous) - +this.carouselService.coordinates(this.next);
            this.carouselService.slidesData.forEach(function (slide) {
                if (slide.id === previous.id) {
                    slide.left = left + "px";
                    slide.isAnimated = true;
                    slide.isDefAnimatedOut = true;
                    slide.isCustomAnimatedOut = true;
                }
            });
        }
        if (incoming) {
            this.carouselService.slidesData.forEach(function (slide) {
                if (slide.id === next.id) {
                    slide.isAnimated = true;
                    slide.isDefAnimatedIn = true;
                    slide.isCustomAnimatedIn = true;
                }
            });
        }
    };
    ;
    /**
     * Handles the end of 'animationend' event
     * @param id Id of slides
     */
    /**
     * Handles the end of 'animationend' event
     * @param {?} id Id of slides
     * @return {?}
     */
    AnimateService.prototype.clear = /**
     * Handles the end of 'animationend' event
     * @param {?} id Id of slides
     * @return {?}
     */
    function (id) {
        var _this = this;
        this.carouselService.slidesData.forEach(function (slide) {
            if (slide.id === id) {
                slide.left = '';
                slide.isAnimated = false;
                slide.isDefAnimatedOut = false;
                slide.isCustomAnimatedOut = false;
                slide.isDefAnimatedIn = false;
                slide.isCustomAnimatedIn = false;
                slide.classes = _this.carouselService.setCurSlideClasses(slide);
            }
        });
        this.carouselService.onTransitionEnd();
    };
    ;
    AnimateService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    AnimateService.ctorParameters = function () { return [
        { type: CarouselService }
    ]; };
    return AnimateService;
}());
export { AnimateService };
if (false) {
    /**
     * Subscrioption to merge Observable  from CarouselService
     * @type {?}
     */
    AnimateService.prototype.animateSubscription;
    /**
     * s
     * @type {?}
     */
    AnimateService.prototype.swapping;
    /**
     * active slide before translating
     * @type {?}
     */
    AnimateService.prototype.previous;
    /**
     * new active slide after translating
     * @type {?}
     */
    AnimateService.prototype.next;
    /** @type {?} */
    AnimateService.prototype.carouselService;
    /* Skipping unhandled member: ;*/
    /* Skipping unhandled member: ;*/
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW93bC1jYXJvdXNlbC1vLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2FuaW1hdGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBQTRCLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDckQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDO0lBc0JFLHdCQUFvQixlQUFnQztRQUFoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7Ozs7UUFacEQsYUFBUSxHQUFHLElBQUksQ0FBQzs7OztRQUtoQixhQUFRLEdBQUcsU0FBUyxDQUFDOzs7O1FBS3JCLFNBQUksR0FBRyxTQUFTLENBQUM7UUFHZixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7OztJQUVELG9DQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsdUNBQWM7Ozs7SUFBZDtRQUFBLGlCQThCQzs7WUE3Qk8sZUFBZSxHQUFvQixJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsRUFBRSxDQUFDLElBQUksQ0FDakYsR0FBRyxDQUFDLFVBQUEsSUFBSTtZQUNOLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssVUFBVSxFQUFFO2dCQUMxQyxLQUFJLENBQUMsUUFBUSxHQUFHLEtBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQy9DLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7YUFDaEM7UUFDQyxDQUFDLENBQUMsQ0FD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Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgT2JzZXJ2YWJsZSwgbWVyZ2UgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgQ2Fyb3VzZWxTZXJ2aWNlIH0gZnJvbSAnLi9jYXJvdXNlbC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQW5pbWF0ZVNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3l7XHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaW9wdGlvbiB0byBtZXJnZSBPYnNlcnZhYmxlICBmcm9tIENhcm91c2VsU2VydmljZVxyXG4gICAqL1xyXG4gIGFuaW1hdGVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogc1xyXG4gICAqL1xyXG4gIHN3YXBwaW5nID0gdHJ1ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogYWN0aXZlIHNsaWRlIGJlZm9yZSB0cmFuc2xhdGluZ1xyXG4gICAqL1xyXG4gIHByZXZpb3VzID0gdW5kZWZpbmVkO1xyXG5cclxuICAvKipcclxuICAgKiBuZXcgYWN0aXZlIHNsaWRlIGFmdGVyIHRyYW5zbGF0aW5nXHJcbiAgICovXHJcbiAgbmV4dCA9IHVuZGVmaW5lZDtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjYXJvdXNlbFNlcnZpY2U6IENhcm91c2VsU2VydmljZSkge1xyXG4gICAgdGhpcy5zcHlEYXRhU3RyZWFtcygpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmFuaW1hdGVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlZmluZXMgT2JzZXJ2YWJsZXMgd2hpY2ggc2VydmljZSBtdXN0IG9ic2VydmVcclxuICAgKi9cclxuICBzcHlEYXRhU3RyZWFtcygpIHtcclxuICAgIGNvbnN0IGNoYW5nZVNldHRpbmdzJDogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0Q2hhbmdlU3RhdGUoKS5waXBlKFxyXG4gICAgICB0YXAoZGF0YSA9PiB7XHJcbiAgICAgICAgaWYgKGRhdGEucHJvcGVydHkubmFtZSA9PT0gJ3Bvc2l0aW9uJykge1xyXG5cdFx0XHRcdFx0dGhpcy5wcmV2aW91cyA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmN1cnJlbnQoKTtcclxuXHRcdFx0XHRcdHRoaXMubmV4dCA9IGRhdGEucHJvcGVydHkudmFsdWU7XHJcblx0XHRcdFx0fVxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBkcmFnQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXREcmFnU3RhdGUoKTtcclxuICAgIGNvbnN0IGRyYWdnZWRDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldERyYWdnZWRTdGF0ZSgpO1xyXG4gICAgY29uc3QgdHJhbnNsYXRlZENhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0VHJhbnNsYXRlZFN0YXRlKCk7XHJcblxyXG4gICAgY29uc3QgZHJhZ1RyYW5zbGF0ZWRNZXJnZSQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IG1lcmdlKGRyYWdDYXJvdXNlbCQsIGRyYWdnZWRDYXJvdXNlbCQsIHRyYW5zbGF0ZWRDYXJvdXNlbCQpLnBpcGUoXHJcbiAgICAgIHRhcChkYXRhID0+IHRoaXMuc3dhcHBpbmcgPSBkYXRhID09PSAndHJhbnNsYXRlZCcpXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IHRyYW5zbGF0ZUNhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0VHJhbnNsYXRlU3RhdGUoKS5waXBlKFxyXG4gICAgICB0YXAoZGF0YSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3dhcHBpbmcgJiYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLl9vcHRpb25zLmFuaW1hdGVPdXQgfHwgdGhpcy5jYXJvdXNlbFNlcnZpY2UuX29wdGlvbnMuYW5pbWF0ZUluKSkge1xyXG4gICAgICAgICAgdGhpcy5fc3dhcCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgYW5pbWF0ZU1lcmdlJDogT2JzZXJ2YWJsZTxzdHJpbmcgfCBhbnk+ID0gbWVyZ2UoY2hhbmdlU2V0dGluZ3MkLCB0cmFuc2xhdGVDYXJvdXNlbCQsIGRyYWdUcmFuc2xhdGVkTWVyZ2UkKS5waXBlKCk7XHJcbiAgICB0aGlzLmFuaW1hdGVTdWJzY3JpcHRpb24gPSBhbmltYXRlTWVyZ2UkLnN1YnNjcmliZShcclxuICAgICAgKCkgPT4ge31cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuXHQgKiBUb2dnbGVzIHRoZSBhbmltYXRpb24gY2xhc3NlcyB3aGVuZXZlciBhbiB0cmFuc2xhdGlvbnMgc3RhcnRzLlxyXG5cdCAqIEByZXR1cm5zXHJcblx0ICovXHJcblx0cHJpdmF0ZSBfc3dhcCgpOiBib29sZWFuIHtcclxuXHJcblx0XHRpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuaXRlbXMgIT09IDEpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIGlmICghJC5zdXBwb3J0LmFuaW1hdGlvbiB8fCAhJC5zdXBwb3J0LnRyYW5zaXRpb24pIHtcclxuXHRcdC8vIFx0cmV0dXJuO1xyXG5cdFx0Ly8gfVxyXG5cclxuXHRcdHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNwZWVkKDApO1xyXG5cclxuXHRcdGxldCBsZWZ0O1xyXG5cdFx0Y29uc3RcdHByZXZpb3VzID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2xpZGVzRGF0YVt0aGlzLnByZXZpb3VzXSxcclxuXHRcdFx0bmV4dCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNsaWRlc0RhdGFbdGhpcy5uZXh0XSxcclxuXHRcdFx0aW5jb21pbmcgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hbmltYXRlSW4sXHJcblx0XHRcdG91dGdvaW5nID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYW5pbWF0ZU91dDtcclxuXHJcblx0XHRpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2UuY3VycmVudCgpID09PSB0aGlzLnByZXZpb3VzKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAob3V0Z29pbmcpIHtcclxuXHRcdFx0bGVmdCA9ICt0aGlzLmNhcm91c2VsU2VydmljZS5jb29yZGluYXRlcyh0aGlzLnByZXZpb3VzKSAtICt0aGlzLmNhcm91c2VsU2VydmljZS5jb29yZGluYXRlcyh0aGlzLm5leHQpO1xyXG4gICAgICB0aGlzLmNhcm91c2VsU2VydmljZS5zbGlkZXNEYXRhLmZvckVhY2goc2xpZGUgPT4ge1xyXG4gICAgICAgIGlmIChzbGlkZS5pZCA9PT0gcHJldmlvdXMuaWQpIHtcclxuICAgICAgICAgIHNsaWRlLmxlZnQgPSBgJHtsZWZ0fXB4YDtcclxuICAgICAgICAgIHNsaWRlLmlzQW5pbWF0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgc2xpZGUuaXNEZWZBbmltYXRlZE91dCA9IHRydWU7XHJcbiAgICAgICAgICBzbGlkZS5pc0N1c3RvbUFuaW1hdGVkT3V0ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChpbmNvbWluZykge1xyXG4gICAgICB0aGlzLmNhcm91c2VsU2VydmljZS5zbGlkZXNEYXRhLmZvckVhY2goc2xpZGUgPT4ge1xyXG4gICAgICAgIGlmIChzbGlkZS5pZCA9PT0gbmV4dC5pZCkge1xyXG4gICAgICAgICAgc2xpZGUuaXNBbmltYXRlZCA9IHRydWU7XHJcbiAgICAgICAgICBzbGlkZS5pc0RlZkFuaW1hdGVkSW4gPSB0cnVlO1xyXG4gICAgICAgICAgc2xpZGUuaXNDdXN0b21BbmltYXRlZEluID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhbmRsZXMgdGhlIGVuZCBvZiAnYW5pbWF0aW9uZW5kJyBldmVudFxyXG4gICAqIEBwYXJhbSBpZCBJZCBvZiBzbGlkZXNcclxuICAgKi9cclxuICBjbGVhcihpZCkge1xyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2xpZGVzRGF0YS5mb3JFYWNoKHNsaWRlID0+IHtcclxuICAgICAgaWYgKHNsaWRlLmlkID09PSBpZCkge1xyXG4gICAgICAgIHNsaWRlLmxlZnQgPSAnJztcclxuICAgICAgICBzbGlkZS5pc0FuaW1hdGVkID0gZmFsc2U7XHJcbiAgICAgICAgc2xpZGUuaXNEZWZBbmltYXRlZE91dCA9IGZhbHNlO1xyXG4gICAgICAgIHNsaWRlLmlzQ3VzdG9tQW5pbWF0ZWRPdXQgPSBmYWxzZTtcclxuICAgICAgICBzbGlkZS5pc0RlZkFuaW1hdGVkSW4gPSBmYWxzZTtcclxuICAgICAgICBzbGlkZS5pc0N1c3RvbUFuaW1hdGVkSW4gPSBmYWxzZTtcclxuICAgICAgICBzbGlkZS5jbGFzc2VzID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0Q3VyU2xpZGVDbGFzc2VzKHNsaWRlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5vblRyYW5zaXRpb25FbmQoKTtcclxuXHR9O1xyXG59XHJcbiJdfQ==