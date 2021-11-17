import { Injectable } from '@angular/core';
import { merge } from 'rxjs';
import { CarouselService } from './carousel.service';
import { tap } from 'rxjs/operators';
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
AnimateService.decorators = [
    { type: Injectable }
];
AnimateService.ctorParameters = () => [
    { type: CarouselService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uL2xpYnMvbmd4LW93bC1jYXJvdXNlbC1vL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9hbmltYXRlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBQTRCLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDckQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR3JDLE1BQU0sT0FBTyxjQUFjO0lBcUJ6QixZQUFvQixlQUFnQztRQUFoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFmcEQ7O1dBRUc7UUFDSCxhQUFRLEdBQUcsSUFBSSxDQUFDO1FBRWhCOztXQUVHO1FBQ0gsYUFBUSxHQUFHLFNBQVMsQ0FBQztRQUVyQjs7V0FFRztRQUNILFNBQUksR0FBRyxTQUFTLENBQUM7UUFHZixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsY0FBYztRQUNaLE1BQU0sZUFBZSxHQUFvQixJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsRUFBRSxDQUFDLElBQUksQ0FDakYsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ1QsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxVQUFVLEVBQUU7Z0JBQzFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDL0MsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQzthQUNoQztR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IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIE9ic2VydmFibGUsIG1lcmdlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDYXJvdXNlbFNlcnZpY2UgfSBmcm9tICcuL2Nhcm91c2VsLnNlcnZpY2UnO1xuaW1wb3J0IHsgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQW5pbWF0ZVNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3l7XG4gIC8qKlxuICAgKiBTdWJzY3Jpb3B0aW9uIHRvIG1lcmdlIE9ic2VydmFibGUgIGZyb20gQ2Fyb3VzZWxTZXJ2aWNlXG4gICAqL1xuICBhbmltYXRlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLyoqXG4gICAqIHNcbiAgICovXG4gIHN3YXBwaW5nID0gdHJ1ZTtcblxuICAvKipcbiAgICogYWN0aXZlIHNsaWRlIGJlZm9yZSB0cmFuc2xhdGluZ1xuICAgKi9cbiAgcHJldmlvdXMgPSB1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqIG5ldyBhY3RpdmUgc2xpZGUgYWZ0ZXIgdHJhbnNsYXRpbmdcbiAgICovXG4gIG5leHQgPSB1bmRlZmluZWQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjYXJvdXNlbFNlcnZpY2U6IENhcm91c2VsU2VydmljZSkge1xuICAgIHRoaXMuc3B5RGF0YVN0cmVhbXMoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuYW5pbWF0ZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlZmluZXMgT2JzZXJ2YWJsZXMgd2hpY2ggc2VydmljZSBtdXN0IG9ic2VydmVcbiAgICovXG4gIHNweURhdGFTdHJlYW1zKCkge1xuICAgIGNvbnN0IGNoYW5nZVNldHRpbmdzJDogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0Q2hhbmdlU3RhdGUoKS5waXBlKFxuICAgICAgdGFwKGRhdGEgPT4ge1xuICAgICAgICBpZiAoZGF0YS5wcm9wZXJ0eS5uYW1lID09PSAncG9zaXRpb24nKSB7XG5cdFx0XHRcdFx0dGhpcy5wcmV2aW91cyA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmN1cnJlbnQoKTtcblx0XHRcdFx0XHR0aGlzLm5leHQgPSBkYXRhLnByb3BlcnR5LnZhbHVlO1xuXHRcdFx0XHR9XG4gICAgICB9KVxuICAgICk7XG5cbiAgICBjb25zdCBkcmFnQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXREcmFnU3RhdGUoKTtcbiAgICBjb25zdCBkcmFnZ2VkQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXREcmFnZ2VkU3RhdGUoKTtcbiAgICBjb25zdCB0cmFuc2xhdGVkQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRUcmFuc2xhdGVkU3RhdGUoKTtcblxuICAgIGNvbnN0IGRyYWdUcmFuc2xhdGVkTWVyZ2UkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSBtZXJnZShkcmFnQ2Fyb3VzZWwkLCBkcmFnZ2VkQ2Fyb3VzZWwkLCB0cmFuc2xhdGVkQ2Fyb3VzZWwkKS5waXBlKFxuICAgICAgdGFwKGRhdGEgPT4gdGhpcy5zd2FwcGluZyA9IGRhdGEgPT09ICd0cmFuc2xhdGVkJylcbiAgICApO1xuXG4gICAgY29uc3QgdHJhbnNsYXRlQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRUcmFuc2xhdGVTdGF0ZSgpLnBpcGUoXG4gICAgICB0YXAoZGF0YSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnN3YXBwaW5nICYmICh0aGlzLmNhcm91c2VsU2VydmljZS5fb3B0aW9ucy5hbmltYXRlT3V0IHx8IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLl9vcHRpb25zLmFuaW1hdGVJbikpIHtcbiAgICAgICAgICB0aGlzLl9zd2FwKCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcblxuICAgIGNvbnN0IGFuaW1hdGVNZXJnZSQ6IE9ic2VydmFibGU8c3RyaW5nIHwgYW55PiA9IG1lcmdlKGNoYW5nZVNldHRpbmdzJCwgdHJhbnNsYXRlQ2Fyb3VzZWwkLCBkcmFnVHJhbnNsYXRlZE1lcmdlJCkucGlwZSgpO1xuICAgIHRoaXMuYW5pbWF0ZVN1YnNjcmlwdGlvbiA9IGFuaW1hdGVNZXJnZSQuc3Vic2NyaWJlKFxuICAgICAgKCkgPT4ge31cbiAgICApO1xuICB9XG5cbiAgLyoqXG5cdCAqIFRvZ2dsZXMgdGhlIGFuaW1hdGlvbiBjbGFzc2VzIHdoZW5ldmVyIGFuIHRyYW5zbGF0aW9ucyBzdGFydHMuXG5cdCAqIEByZXR1cm5zXG5cdCAqL1xuXHRwcml2YXRlIF9zd2FwKCk6IGJvb2xlYW4ge1xuXG5cdFx0aWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLml0ZW1zICE9PSAxKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gaWYgKCEkLnN1cHBvcnQuYW5pbWF0aW9uIHx8ICEkLnN1cHBvcnQudHJhbnNpdGlvbikge1xuXHRcdC8vIFx0cmV0dXJuO1xuXHRcdC8vIH1cblxuXHRcdHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNwZWVkKDApO1xuXG5cdFx0bGV0IGxlZnQ7XG5cdFx0Y29uc3RcdHByZXZpb3VzID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2xpZGVzRGF0YVt0aGlzLnByZXZpb3VzXSxcblx0XHRcdG5leHQgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zbGlkZXNEYXRhW3RoaXMubmV4dF0sXG5cdFx0XHRpbmNvbWluZyA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmFuaW1hdGVJbixcblx0XHRcdG91dGdvaW5nID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYW5pbWF0ZU91dDtcblxuXHRcdGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5jdXJyZW50KCkgPT09IHRoaXMucHJldmlvdXMpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAob3V0Z29pbmcpIHtcblx0XHRcdGxlZnQgPSArdGhpcy5jYXJvdXNlbFNlcnZpY2UuY29vcmRpbmF0ZXModGhpcy5wcmV2aW91cykgLSArdGhpcy5jYXJvdXNlbFNlcnZpY2UuY29vcmRpbmF0ZXModGhpcy5uZXh0KTtcbiAgICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNsaWRlc0RhdGEuZm9yRWFjaChzbGlkZSA9PiB7XG4gICAgICAgIGlmIChzbGlkZS5pZCA9PT0gcHJldmlvdXMuaWQpIHtcbiAgICAgICAgICBzbGlkZS5sZWZ0ID0gYCR7bGVmdH1weGA7XG4gICAgICAgICAgc2xpZGUuaXNBbmltYXRlZCA9IHRydWU7XG4gICAgICAgICAgc2xpZGUuaXNEZWZBbmltYXRlZE91dCA9IHRydWU7XG4gICAgICAgICAgc2xpZGUuaXNDdXN0b21BbmltYXRlZE91dCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXHRcdH1cblxuXHRcdGlmIChpbmNvbWluZykge1xuICAgICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2xpZGVzRGF0YS5mb3JFYWNoKHNsaWRlID0+IHtcbiAgICAgICAgaWYgKHNsaWRlLmlkID09PSBuZXh0LmlkKSB7XG4gICAgICAgICAgc2xpZGUuaXNBbmltYXRlZCA9IHRydWU7XG4gICAgICAgICAgc2xpZGUuaXNEZWZBbmltYXRlZEluID0gdHJ1ZTtcbiAgICAgICAgICBzbGlkZS5pc0N1c3RvbUFuaW1hdGVkSW4gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcblx0XHR9XG5cdH07XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgdGhlIGVuZCBvZiAnYW5pbWF0aW9uZW5kJyBldmVudFxuICAgKiBAcGFyYW0gaWQgSWQgb2Ygc2xpZGVzXG4gICAqL1xuICBjbGVhcihpZCkge1xuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNsaWRlc0RhdGEuZm9yRWFjaChzbGlkZSA9PiB7XG4gICAgICBpZiAoc2xpZGUuaWQgPT09IGlkKSB7XG4gICAgICAgIHNsaWRlLmxlZnQgPSAnJztcbiAgICAgICAgc2xpZGUuaXNBbmltYXRlZCA9IGZhbHNlO1xuICAgICAgICBzbGlkZS5pc0RlZkFuaW1hdGVkT3V0ID0gZmFsc2U7XG4gICAgICAgIHNsaWRlLmlzQ3VzdG9tQW5pbWF0ZWRPdXQgPSBmYWxzZTtcbiAgICAgICAgc2xpZGUuaXNEZWZBbmltYXRlZEluID0gZmFsc2U7XG4gICAgICAgIHNsaWRlLmlzQ3VzdG9tQW5pbWF0ZWRJbiA9IGZhbHNlO1xuICAgICAgICBzbGlkZS5jbGFzc2VzID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0Q3VyU2xpZGVDbGFzc2VzKHNsaWRlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5vblRyYW5zaXRpb25FbmQoKTtcblx0fTtcbn1cbiJdfQ==