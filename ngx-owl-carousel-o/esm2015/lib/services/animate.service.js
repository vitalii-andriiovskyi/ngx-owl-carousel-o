/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { merge } from 'rxjs';
import { CarouselService } from './carousel.service';
import { tap } from 'rxjs/operators';
export class AnimateService {
    /**
     * @param {?} carouselService
     */
    constructor(carouselService) {
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
    ngOnDestroy() {
        this.animateSubscription.unsubscribe();
    }
    /**
     * Defines Observables which service must observe
     * @return {?}
     */
    spyDataStreams() {
        /** @type {?} */
        const changeSettings$ = this.carouselService.getChangeState().pipe(tap(data => {
            if (data.property.name === 'position') {
                this.previous = this.carouselService.current();
                this.next = data.property.value;
            }
        }));
        /** @type {?} */
        const dragCarousel$ = this.carouselService.getDragState();
        /** @type {?} */
        const draggedCarousel$ = this.carouselService.getDraggedState();
        /** @type {?} */
        const translatedCarousel$ = this.carouselService.getTranslatedState();
        /** @type {?} */
        const dragTranslatedMerge$ = merge(dragCarousel$, draggedCarousel$, translatedCarousel$).pipe(tap(data => this.swapping = data === 'translated'));
        /** @type {?} */
        const translateCarousel$ = this.carouselService.getTranslateState().pipe(tap(data => {
            if (this.swapping && (this.carouselService._options.animateOut || this.carouselService._options.animateIn)) {
                this._swap();
            }
        }));
        /** @type {?} */
        const animateMerge$ = merge(changeSettings$, translateCarousel$, dragTranslatedMerge$).pipe();
        this.animateSubscription = animateMerge$.subscribe(() => { });
    }
    /**
     * Toggles the animation classes whenever an translations starts.
     * @return {?}
     */
    _swap() {
        if (this.carouselService.settings.items !== 1) {
            return;
        }
        // if (!$.support.animation || !$.support.transition) {
        // 	return;
        // }
        this.carouselService.speed(0);
        /** @type {?} */
        let left;
        /** @type {?} */
        const previous = this.carouselService.slidesData[this.previous];
        /** @type {?} */
        const next = this.carouselService.slidesData[this.next];
        /** @type {?} */
        const incoming = this.carouselService.settings.animateIn;
        /** @type {?} */
        const outgoing = this.carouselService.settings.animateOut;
        if (this.carouselService.current() === this.previous) {
            return;
        }
        if (outgoing) {
            left = +this.carouselService.coordinates(this.previous) - +this.carouselService.coordinates(this.next);
            this.carouselService.slidesData.forEach(slide => {
                if (slide.id === previous.id) {
                    slide.left = `${left}px`;
                    slide.isAnimated = true;
                    slide.isDefAnimatedOut = true;
                    slide.isCustomAnimatedOut = true;
                }
            });
        }
        if (incoming) {
            this.carouselService.slidesData.forEach(slide => {
                if (slide.id === next.id) {
                    slide.isAnimated = true;
                    slide.isDefAnimatedIn = true;
                    slide.isCustomAnimatedIn = true;
                }
            });
        }
    }
    ;
    /**
     * Handles the end of 'animationend' event
     * @param {?} id Id of slides
     * @return {?}
     */
    clear(id) {
        this.carouselService.slidesData.forEach(slide => {
            if (slide.id === id) {
                slide.left = '';
                slide.isAnimated = false;
                slide.isDefAnimatedOut = false;
                slide.isCustomAnimatedOut = false;
                slide.isDefAnimatedIn = false;
                slide.isCustomAnimatedIn = false;
                slide.classes = this.carouselService.setCurSlideClasses(slide);
            }
        });
        this.carouselService.onTransitionEnd();
    }
    ;
}
AnimateService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
AnimateService.ctorParameters = () => [
    { type: CarouselService }
];
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
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW93bC1jYXJvdXNlbC1vLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2FuaW1hdGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBQTRCLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDckQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR3JDLE1BQU07Ozs7SUFxQkosWUFBb0IsZUFBZ0M7UUFBaEMsb0JBQWUsR0FBZixlQUFlLENBQWlCOzs7O3dCQVp6QyxJQUFJOzs7O3dCQUtKLFNBQVM7Ozs7b0JBS2IsU0FBUztRQUdkLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUN2Qjs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDeEM7Ozs7O0lBS0QsY0FBYzs7UUFDWixNQUFNLGVBQWUsR0FBb0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxJQUFJLENBQ2pGLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNULEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQzNDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDL0MsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQzthQUNoQztTQUNFLENBQUMsQ0FDSCxDQUFDOztRQUVGLE1BQU0sYUFBYSxHQUF1QixJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRSxDQUFD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ZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIE9ic2VydmFibGUsIG1lcmdlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IENhcm91c2VsU2VydmljZSB9IGZyb20gJy4vY2Fyb3VzZWwuc2VydmljZSc7XHJcbmltcG9ydCB7IHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEFuaW1hdGVTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95e1xyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlvcHRpb24gdG8gbWVyZ2UgT2JzZXJ2YWJsZSAgZnJvbSBDYXJvdXNlbFNlcnZpY2VcclxuICAgKi9cclxuICBhbmltYXRlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIHNcclxuICAgKi9cclxuICBzd2FwcGluZyA9IHRydWU7XHJcblxyXG4gIC8qKlxyXG4gICAqIGFjdGl2ZSBzbGlkZSBiZWZvcmUgdHJhbnNsYXRpbmdcclxuICAgKi9cclxuICBwcmV2aW91cyA9IHVuZGVmaW5lZDtcclxuXHJcbiAgLyoqXHJcbiAgICogbmV3IGFjdGl2ZSBzbGlkZSBhZnRlciB0cmFuc2xhdGluZ1xyXG4gICAqL1xyXG4gIG5leHQgPSB1bmRlZmluZWQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2Fyb3VzZWxTZXJ2aWNlOiBDYXJvdXNlbFNlcnZpY2UpIHtcclxuICAgIHRoaXMuc3B5RGF0YVN0cmVhbXMoKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5hbmltYXRlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZWZpbmVzIE9ic2VydmFibGVzIHdoaWNoIHNlcnZpY2UgbXVzdCBvYnNlcnZlXHJcbiAgICovXHJcbiAgc3B5RGF0YVN0cmVhbXMoKSB7XHJcbiAgICBjb25zdCBjaGFuZ2VTZXR0aW5ncyQ6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldENoYW5nZVN0YXRlKCkucGlwZShcclxuICAgICAgdGFwKGRhdGEgPT4ge1xyXG4gICAgICAgIGlmIChkYXRhLnByb3BlcnR5Lm5hbWUgPT09ICdwb3NpdGlvbicpIHtcclxuXHRcdFx0XHRcdHRoaXMucHJldmlvdXMgPSB0aGlzLmNhcm91c2VsU2VydmljZS5jdXJyZW50KCk7XHJcblx0XHRcdFx0XHR0aGlzLm5leHQgPSBkYXRhLnByb3BlcnR5LnZhbHVlO1xyXG5cdFx0XHRcdH1cclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgZHJhZ0Nhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0RHJhZ1N0YXRlKCk7XHJcbiAgICBjb25zdCBkcmFnZ2VkQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXREcmFnZ2VkU3RhdGUoKTtcclxuICAgIGNvbnN0IHRyYW5zbGF0ZWRDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldFRyYW5zbGF0ZWRTdGF0ZSgpO1xyXG5cclxuICAgIGNvbnN0IGRyYWdUcmFuc2xhdGVkTWVyZ2UkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSBtZXJnZShkcmFnQ2Fyb3VzZWwkLCBkcmFnZ2VkQ2Fyb3VzZWwkLCB0cmFuc2xhdGVkQ2Fyb3VzZWwkKS5waXBlKFxyXG4gICAgICB0YXAoZGF0YSA9PiB0aGlzLnN3YXBwaW5nID0gZGF0YSA9PT0gJ3RyYW5zbGF0ZWQnKVxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCB0cmFuc2xhdGVDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldFRyYW5zbGF0ZVN0YXRlKCkucGlwZShcclxuICAgICAgdGFwKGRhdGEgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLnN3YXBwaW5nICYmICh0aGlzLmNhcm91c2VsU2VydmljZS5fb3B0aW9ucy5hbmltYXRlT3V0IHx8IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLl9vcHRpb25zLmFuaW1hdGVJbikpIHtcclxuICAgICAgICAgIHRoaXMuX3N3YXAoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IGFuaW1hdGVNZXJnZSQ6IE9ic2VydmFibGU8c3RyaW5nIHwgYW55PiA9IG1lcmdlKGNoYW5nZVNldHRpbmdzJCwgdHJhbnNsYXRlQ2Fyb3VzZWwkLCBkcmFnVHJhbnNsYXRlZE1lcmdlJCkucGlwZSgpO1xyXG4gICAgdGhpcy5hbmltYXRlU3Vic2NyaXB0aW9uID0gYW5pbWF0ZU1lcmdlJC5zdWJzY3JpYmUoXHJcbiAgICAgICgpID0+IHt9XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcblx0ICogVG9nZ2xlcyB0aGUgYW5pbWF0aW9uIGNsYXNzZXMgd2hlbmV2ZXIgYW4gdHJhbnNsYXRpb25zIHN0YXJ0cy5cclxuXHQgKiBAcmV0dXJuc1xyXG5cdCAqL1xyXG5cdHByaXZhdGUgX3N3YXAoKTogYm9vbGVhbiB7XHJcblxyXG5cdFx0aWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLml0ZW1zICE9PSAxKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBpZiAoISQuc3VwcG9ydC5hbmltYXRpb24gfHwgISQuc3VwcG9ydC50cmFuc2l0aW9uKSB7XHJcblx0XHQvLyBcdHJldHVybjtcclxuXHRcdC8vIH1cclxuXHJcblx0XHR0aGlzLmNhcm91c2VsU2VydmljZS5zcGVlZCgwKTtcclxuXHJcblx0XHRsZXQgbGVmdDtcclxuXHRcdGNvbnN0XHRwcmV2aW91cyA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNsaWRlc0RhdGFbdGhpcy5wcmV2aW91c10sXHJcblx0XHRcdG5leHQgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zbGlkZXNEYXRhW3RoaXMubmV4dF0sXHJcblx0XHRcdGluY29taW5nID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYW5pbWF0ZUluLFxyXG5cdFx0XHRvdXRnb2luZyA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmFuaW1hdGVPdXQ7XHJcblxyXG5cdFx0aWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmN1cnJlbnQoKSA9PT0gdGhpcy5wcmV2aW91cykge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKG91dGdvaW5nKSB7XHJcblx0XHRcdGxlZnQgPSArdGhpcy5jYXJvdXNlbFNlcnZpY2UuY29vcmRpbmF0ZXModGhpcy5wcmV2aW91cykgLSArdGhpcy5jYXJvdXNlbFNlcnZpY2UuY29vcmRpbmF0ZXModGhpcy5uZXh0KTtcclxuICAgICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2xpZGVzRGF0YS5mb3JFYWNoKHNsaWRlID0+IHtcclxuICAgICAgICBpZiAoc2xpZGUuaWQgPT09IHByZXZpb3VzLmlkKSB7XHJcbiAgICAgICAgICBzbGlkZS5sZWZ0ID0gYCR7bGVmdH1weGA7XHJcbiAgICAgICAgICBzbGlkZS5pc0FuaW1hdGVkID0gdHJ1ZTtcclxuICAgICAgICAgIHNsaWRlLmlzRGVmQW5pbWF0ZWRPdXQgPSB0cnVlO1xyXG4gICAgICAgICAgc2xpZGUuaXNDdXN0b21BbmltYXRlZE91dCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoaW5jb21pbmcpIHtcclxuICAgICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2xpZGVzRGF0YS5mb3JFYWNoKHNsaWRlID0+IHtcclxuICAgICAgICBpZiAoc2xpZGUuaWQgPT09IG5leHQuaWQpIHtcclxuICAgICAgICAgIHNsaWRlLmlzQW5pbWF0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgc2xpZGUuaXNEZWZBbmltYXRlZEluID0gdHJ1ZTtcclxuICAgICAgICAgIHNsaWRlLmlzQ3VzdG9tQW5pbWF0ZWRJbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGVzIHRoZSBlbmQgb2YgJ2FuaW1hdGlvbmVuZCcgZXZlbnRcclxuICAgKiBAcGFyYW0gaWQgSWQgb2Ygc2xpZGVzXHJcbiAgICovXHJcbiAgY2xlYXIoaWQpIHtcclxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNsaWRlc0RhdGEuZm9yRWFjaChzbGlkZSA9PiB7XHJcbiAgICAgIGlmIChzbGlkZS5pZCA9PT0gaWQpIHtcclxuICAgICAgICBzbGlkZS5sZWZ0ID0gJyc7XHJcbiAgICAgICAgc2xpZGUuaXNBbmltYXRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHNsaWRlLmlzRGVmQW5pbWF0ZWRPdXQgPSBmYWxzZTtcclxuICAgICAgICBzbGlkZS5pc0N1c3RvbUFuaW1hdGVkT3V0ID0gZmFsc2U7XHJcbiAgICAgICAgc2xpZGUuaXNEZWZBbmltYXRlZEluID0gZmFsc2U7XHJcbiAgICAgICAgc2xpZGUuaXNDdXN0b21BbmltYXRlZEluID0gZmFsc2U7XHJcbiAgICAgICAgc2xpZGUuY2xhc3NlcyA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldEN1clNsaWRlQ2xhc3NlcyhzbGlkZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uub25UcmFuc2l0aW9uRW5kKCk7XHJcblx0fTtcclxufVxyXG4iXX0=