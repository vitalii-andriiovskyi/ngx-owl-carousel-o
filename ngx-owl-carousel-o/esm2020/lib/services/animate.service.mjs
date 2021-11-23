import { Injectable } from '@angular/core';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./carousel.service";
export class AnimateService {
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
    ngOnDestroy() {
        this.animateSubscription.unsubscribe();
    }
    /**
     * Defines Observables which service must observe
     */
    spyDataStreams() {
        const changeSettings$ = this.carouselService.getChangeState().pipe(tap(data => {
            if (data.property.name === 'position') {
                this.previous = this.carouselService.current();
                this.next = data.property.value;
            }
        }));
        const dragCarousel$ = this.carouselService.getDragState();
        const draggedCarousel$ = this.carouselService.getDraggedState();
        const translatedCarousel$ = this.carouselService.getTranslatedState();
        const dragTranslatedMerge$ = merge(dragCarousel$, draggedCarousel$, translatedCarousel$).pipe(tap(data => this.swapping = data === 'translated'));
        const translateCarousel$ = this.carouselService.getTranslateState().pipe(tap(data => {
            if (this.swapping && (this.carouselService._options.animateOut || this.carouselService._options.animateIn)) {
                this._swap();
            }
        }));
        const animateMerge$ = merge(changeSettings$, translateCarousel$, dragTranslatedMerge$).pipe();
        this.animateSubscription = animateMerge$.subscribe(() => { });
    }
    /**
       * Toggles the animation classes whenever an translations starts.
       * @returns
       */
    _swap() {
        if (this.carouselService.settings.items !== 1) {
            return;
        }
        // if (!$.support.animation || !$.support.transition) {
        // 	return;
        // }
        this.carouselService.speed(0);
        let left;
        const previous = this.carouselService.slidesData[this.previous], next = this.carouselService.slidesData[this.next], incoming = this.carouselService.settings.animateIn, outgoing = this.carouselService.settings.animateOut;
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
     * @param id Id of slides
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
AnimateService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: AnimateService, deps: [{ token: i1.CarouselService }], target: i0.ɵɵFactoryTarget.Injectable });
AnimateService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: AnimateService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: AnimateService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.CarouselService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGlicy9uZ3gtb3dsLWNhcm91c2VsLW8vc3JjL2xpYi9zZXJ2aWNlcy9hbmltYXRlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBQTRCLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUV2RCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQUdyQyxNQUFNLE9BQU8sY0FBYztJQXFCekIsWUFBb0IsZUFBZ0M7UUFBaEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBZnBEOztXQUVHO1FBQ0gsYUFBUSxHQUFHLElBQUksQ0FBQztRQUVoQjs7V0FFRztRQUNILGFBQVEsR0FBRyxTQUFTLENBQUM7UUFFckI7O1dBRUc7UUFDSCxTQUFJLEdBQUcsU0FBUyxDQUFDO1FBR2YsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFRDs7T0FFRztJQUNILGNBQWM7UUFDWixNQUFNLGVBQWUsR0FBb0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxJQUFJLENBQ2pGLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNULElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssVUFBVSxFQUFFO2dCQUMxQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQy9DLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7YUFDaEM7UUFDQyxDQUFDLENBQUMsQ0FDSCxDQUFDO1FBRUYsTUFBTSxh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dWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgT2JzZXJ2YWJsZSwgbWVyZ2UgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENhcm91c2VsU2VydmljZSB9IGZyb20gJy4vY2Fyb3VzZWwuc2VydmljZSc7XG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBbmltYXRlU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveXtcbiAgLyoqXG4gICAqIFN1YnNjcmlvcHRpb24gdG8gbWVyZ2UgT2JzZXJ2YWJsZSAgZnJvbSBDYXJvdXNlbFNlcnZpY2VcbiAgICovXG4gIGFuaW1hdGVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKipcbiAgICogc1xuICAgKi9cbiAgc3dhcHBpbmcgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBhY3RpdmUgc2xpZGUgYmVmb3JlIHRyYW5zbGF0aW5nXG4gICAqL1xuICBwcmV2aW91cyA9IHVuZGVmaW5lZDtcblxuICAvKipcbiAgICogbmV3IGFjdGl2ZSBzbGlkZSBhZnRlciB0cmFuc2xhdGluZ1xuICAgKi9cbiAgbmV4dCA9IHVuZGVmaW5lZDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhcm91c2VsU2VydmljZTogQ2Fyb3VzZWxTZXJ2aWNlKSB7XG4gICAgdGhpcy5zcHlEYXRhU3RyZWFtcygpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5hbmltYXRlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICAvKipcbiAgICogRGVmaW5lcyBPYnNlcnZhYmxlcyB3aGljaCBzZXJ2aWNlIG11c3Qgb2JzZXJ2ZVxuICAgKi9cbiAgc3B5RGF0YVN0cmVhbXMoKSB7XG4gICAgY29uc3QgY2hhbmdlU2V0dGluZ3MkOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRDaGFuZ2VTdGF0ZSgpLnBpcGUoXG4gICAgICB0YXAoZGF0YSA9PiB7XG4gICAgICAgIGlmIChkYXRhLnByb3BlcnR5Lm5hbWUgPT09ICdwb3NpdGlvbicpIHtcblx0XHRcdFx0XHR0aGlzLnByZXZpb3VzID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuY3VycmVudCgpO1xuXHRcdFx0XHRcdHRoaXMubmV4dCA9IGRhdGEucHJvcGVydHkudmFsdWU7XG5cdFx0XHRcdH1cbiAgICAgIH0pXG4gICAgKTtcblxuICAgIGNvbnN0IGRyYWdDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldERyYWdTdGF0ZSgpO1xuICAgIGNvbnN0IGRyYWdnZWRDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldERyYWdnZWRTdGF0ZSgpO1xuICAgIGNvbnN0IHRyYW5zbGF0ZWRDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldFRyYW5zbGF0ZWRTdGF0ZSgpO1xuXG4gICAgY29uc3QgZHJhZ1RyYW5zbGF0ZWRNZXJnZSQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IG1lcmdlKGRyYWdDYXJvdXNlbCQsIGRyYWdnZWRDYXJvdXNlbCQsIHRyYW5zbGF0ZWRDYXJvdXNlbCQpLnBpcGUoXG4gICAgICB0YXAoZGF0YSA9PiB0aGlzLnN3YXBwaW5nID0gZGF0YSA9PT0gJ3RyYW5zbGF0ZWQnKVxuICAgICk7XG5cbiAgICBjb25zdCB0cmFuc2xhdGVDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldFRyYW5zbGF0ZVN0YXRlKCkucGlwZShcbiAgICAgIHRhcChkYXRhID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc3dhcHBpbmcgJiYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLl9vcHRpb25zLmFuaW1hdGVPdXQgfHwgdGhpcy5jYXJvdXNlbFNlcnZpY2UuX29wdGlvbnMuYW5pbWF0ZUluKSkge1xuICAgICAgICAgIHRoaXMuX3N3YXAoKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuXG4gICAgY29uc3QgYW5pbWF0ZU1lcmdlJDogT2JzZXJ2YWJsZTxzdHJpbmcgfCBhbnk+ID0gbWVyZ2UoY2hhbmdlU2V0dGluZ3MkLCB0cmFuc2xhdGVDYXJvdXNlbCQsIGRyYWdUcmFuc2xhdGVkTWVyZ2UkKS5waXBlKCk7XG4gICAgdGhpcy5hbmltYXRlU3Vic2NyaXB0aW9uID0gYW5pbWF0ZU1lcmdlJC5zdWJzY3JpYmUoXG4gICAgICAoKSA9PiB7fVxuICAgICk7XG4gIH1cblxuICAvKipcblx0ICogVG9nZ2xlcyB0aGUgYW5pbWF0aW9uIGNsYXNzZXMgd2hlbmV2ZXIgYW4gdHJhbnNsYXRpb25zIHN0YXJ0cy5cblx0ICogQHJldHVybnNcblx0ICovXG5cdHByaXZhdGUgX3N3YXAoKTogYm9vbGVhbiB7XG5cblx0XHRpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuaXRlbXMgIT09IDEpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBpZiAoISQuc3VwcG9ydC5hbmltYXRpb24gfHwgISQuc3VwcG9ydC50cmFuc2l0aW9uKSB7XG5cdFx0Ly8gXHRyZXR1cm47XG5cdFx0Ly8gfVxuXG5cdFx0dGhpcy5jYXJvdXNlbFNlcnZpY2Uuc3BlZWQoMCk7XG5cblx0XHRsZXQgbGVmdDtcblx0XHRjb25zdFx0cHJldmlvdXMgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zbGlkZXNEYXRhW3RoaXMucHJldmlvdXNdLFxuXHRcdFx0bmV4dCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNsaWRlc0RhdGFbdGhpcy5uZXh0XSxcblx0XHRcdGluY29taW5nID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYW5pbWF0ZUluLFxuXHRcdFx0b3V0Z29pbmcgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hbmltYXRlT3V0O1xuXG5cdFx0aWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmN1cnJlbnQoKSA9PT0gdGhpcy5wcmV2aW91cykge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmIChvdXRnb2luZykge1xuXHRcdFx0bGVmdCA9ICt0aGlzLmNhcm91c2VsU2VydmljZS5jb29yZGluYXRlcyh0aGlzLnByZXZpb3VzKSAtICt0aGlzLmNhcm91c2VsU2VydmljZS5jb29yZGluYXRlcyh0aGlzLm5leHQpO1xuICAgICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2xpZGVzRGF0YS5mb3JFYWNoKHNsaWRlID0+IHtcbiAgICAgICAgaWYgKHNsaWRlLmlkID09PSBwcmV2aW91cy5pZCkge1xuICAgICAgICAgIHNsaWRlLmxlZnQgPSBgJHtsZWZ0fXB4YDtcbiAgICAgICAgICBzbGlkZS5pc0FuaW1hdGVkID0gdHJ1ZTtcbiAgICAgICAgICBzbGlkZS5pc0RlZkFuaW1hdGVkT3V0ID0gdHJ1ZTtcbiAgICAgICAgICBzbGlkZS5pc0N1c3RvbUFuaW1hdGVkT3V0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cdFx0fVxuXG5cdFx0aWYgKGluY29taW5nKSB7XG4gICAgICB0aGlzLmNhcm91c2VsU2VydmljZS5zbGlkZXNEYXRhLmZvckVhY2goc2xpZGUgPT4ge1xuICAgICAgICBpZiAoc2xpZGUuaWQgPT09IG5leHQuaWQpIHtcbiAgICAgICAgICBzbGlkZS5pc0FuaW1hdGVkID0gdHJ1ZTtcbiAgICAgICAgICBzbGlkZS5pc0RlZkFuaW1hdGVkSW4gPSB0cnVlO1xuICAgICAgICAgIHNsaWRlLmlzQ3VzdG9tQW5pbWF0ZWRJbiA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXHRcdH1cblx0fTtcblxuICAvKipcbiAgICogSGFuZGxlcyB0aGUgZW5kIG9mICdhbmltYXRpb25lbmQnIGV2ZW50XG4gICAqIEBwYXJhbSBpZCBJZCBvZiBzbGlkZXNcbiAgICovXG4gIGNsZWFyKGlkKSB7XG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2xpZGVzRGF0YS5mb3JFYWNoKHNsaWRlID0+IHtcbiAgICAgIGlmIChzbGlkZS5pZCA9PT0gaWQpIHtcbiAgICAgICAgc2xpZGUubGVmdCA9ICcnO1xuICAgICAgICBzbGlkZS5pc0FuaW1hdGVkID0gZmFsc2U7XG4gICAgICAgIHNsaWRlLmlzRGVmQW5pbWF0ZWRPdXQgPSBmYWxzZTtcbiAgICAgICAgc2xpZGUuaXNDdXN0b21BbmltYXRlZE91dCA9IGZhbHNlO1xuICAgICAgICBzbGlkZS5pc0RlZkFuaW1hdGVkSW4gPSBmYWxzZTtcbiAgICAgICAgc2xpZGUuaXNDdXN0b21BbmltYXRlZEluID0gZmFsc2U7XG4gICAgICAgIHNsaWRlLmNsYXNzZXMgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zZXRDdXJTbGlkZUNsYXNzZXMoc2xpZGUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm9uVHJhbnNpdGlvbkVuZCgpO1xuXHR9O1xufVxuIl19