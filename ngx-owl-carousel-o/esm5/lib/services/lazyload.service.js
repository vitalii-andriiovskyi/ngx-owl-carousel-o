import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { merge } from 'rxjs';
import { CarouselService } from './carousel.service';
import { tap } from 'rxjs/operators';
var LazyLoadService = /** @class */ (function () {
    function LazyLoadService(carouselService) {
        this.carouselService = carouselService;
        this.spyDataStreams();
    }
    LazyLoadService.prototype.ngOnDestroy = function () {
        this.lazyLoadSubscription.unsubscribe();
    };
    /**
     * Defines Observables which service must observe
     */
    LazyLoadService.prototype.spyDataStreams = function () {
        var _this = this;
        var initializedCarousel$ = this.carouselService.getInitializedState().pipe(tap(function () {
            var isLazyLoad = _this.carouselService.settings && !_this.carouselService.settings.lazyLoad;
            _this.carouselService.slidesData.forEach(function (item) { return item.load = isLazyLoad ? true : false; });
        }));
        var changeSettings$ = this.carouselService.getChangeState();
        var resizedCarousel$ = this.carouselService.getResizedState();
        var lazyLoadMerge$ = merge(initializedCarousel$, changeSettings$, resizedCarousel$).pipe(tap(function (data) { return _this._defineLazyLoadSlides(data); }));
        this.lazyLoadSubscription = lazyLoadMerge$.subscribe(function () { });
    };
    LazyLoadService.prototype._defineLazyLoadSlides = function (data) {
        var _this = this;
        if (!this.carouselService.settings || !this.carouselService.settings.lazyLoad) {
            return;
        }
        if ((data.property && data.property.name === 'position') || data === 'initialized' || data === "resized") {
            var settings = this.carouselService.settings, clones = this.carouselService.clones().length;
            var n = (settings.center && Math.ceil(settings.items / 2) || settings.items), i = ((settings.center && n * -1) || 0), position = (data.property && data.property.value !== undefined ? data.property.value : this.carouselService.current()) + i;
            // load = $.proxy(function(i, v) { this.load(v) }, this);
            //TODO: Need documentation for this new option
            if (settings.lazyLoadEager > 0) {
                n += settings.lazyLoadEager;
                // If the carousel is looping also preload images that are to the "left"
                if (settings.loop) {
                    position -= settings.lazyLoadEager;
                    n++;
                }
            }
            while (i++ < n) {
                this._load(clones / 2 + this.carouselService.relative(position));
                if (clones) {
                    this.carouselService.clones(this.carouselService.relative(position)).forEach(function (value) { return _this._load(value); });
                }
                position++;
            }
        }
    };
    /**
       * Loads all resources of an item at the specified position.
       * @param position - The absolute position of the item.
       */
    LazyLoadService.prototype._load = function (position) {
        if (this.carouselService.slidesData[position].load) {
            return;
        }
        this.carouselService.slidesData[position].load = true;
    };
    LazyLoadService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [CarouselService])
    ], LazyLoadService);
    return LazyLoadService;
}());
export { LazyLoadService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF6eWxvYWQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vd2wtY2Fyb3VzZWwtby8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9sYXp5bG9hZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFBNEIsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3ZELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHckM7SUFNRSx5QkFBb0IsZUFBZ0M7UUFBaEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2xELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQscUNBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCx3Q0FBYyxHQUFkO1FBQUEsaUJBb0JDO1FBbkJDLElBQU0sb0JBQW9CLEdBQXVCLElBQUksQ0FBQyxlQUFlLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxJQUFJLENBQzlGLEdBQUcsQ0FBQztZQUNGLElBQU0sVUFBVSxHQUFHLEtBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxJQUFJLENBQUMsS0FBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO1lBQzVGLEtBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBckMsQ0FBcUMsQ0FBQyxDQUFDO1FBQ3pGLENBQUMsQ0FBQyxDQUNILENBQUM7UUFFRixJQUFNLGVBQWUsR0FBb0Is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RTtZQUNsRCxPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3hELENBQUM7SUFsRlUsZUFBZTtRQUQzQixVQUFVLEVBQUU7aURBTzBCLGVBQWU7T0FOekMsZUFBZSxDQW1GM0I7SUFBRCxzQkFBQztDQUFBLEFBbkZELElBbUZDO1NBbkZZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBPYnNlcnZhYmxlLCBtZXJnZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBDYXJvdXNlbFNlcnZpY2UgfSBmcm9tICcuL2Nhcm91c2VsLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBMYXp5TG9hZFNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlvcHRpb24gdG8gbWVyZ2UgT2JzZXJ2YWJsZSAgZnJvbSBDYXJvdXNlbFNlcnZpY2VcclxuICAgKi9cclxuICBsYXp5TG9hZFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhcm91c2VsU2VydmljZTogQ2Fyb3VzZWxTZXJ2aWNlKSB7XHJcbiAgICB0aGlzLnNweURhdGFTdHJlYW1zKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMubGF6eUxvYWRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlZmluZXMgT2JzZXJ2YWJsZXMgd2hpY2ggc2VydmljZSBtdXN0IG9ic2VydmVcclxuICAgKi9cclxuICBzcHlEYXRhU3RyZWFtcygpIHtcclxuICAgIGNvbnN0IGluaXRpYWxpemVkQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRJbml0aWFsaXplZFN0YXRlKCkucGlwZShcclxuICAgICAgdGFwKCgpID0+IHtcclxuICAgICAgICBjb25zdCBpc0xhenlMb2FkID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MgJiYgIXRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmxhenlMb2FkO1xyXG4gICAgICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNsaWRlc0RhdGEuZm9yRWFjaChpdGVtID0+IGl0ZW0ubG9hZCA9IGlzTGF6eUxvYWQgPyB0cnVlIDogZmFsc2UpO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBjaGFuZ2VTZXR0aW5ncyQ6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldENoYW5nZVN0YXRlKCk7XHJcblxyXG4gICAgY29uc3QgcmVzaXplZENhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0UmVzaXplZFN0YXRlKCk7XHJcblxyXG5cclxuICAgIGNvbnN0IGxhenlMb2FkTWVyZ2UkOiBPYnNlcnZhYmxlPHN0cmluZyB8IGFueT4gPSBtZXJnZShpbml0aWFsaXplZENhcm91c2VsJCwgY2hhbmdlU2V0dGluZ3MkLCByZXNpemVkQ2Fyb3VzZWwkKS5waXBlKFxyXG4gICAgICB0YXAoZGF0YSA9PiB0aGlzLl9kZWZpbmVMYXp5TG9hZFNsaWRlcyhkYXRhKSksXHJcbiAgICAgIC8vIHRhcCgoKSA9PiB0aGlzLmNhcm91c2VsU2VydmljZS5zZW5kQ2hhbmdlcygpKVxyXG4gICAgKTtcclxuICAgIHRoaXMubGF6eUxvYWRTdWJzY3JpcHRpb24gPSBsYXp5TG9hZE1lcmdlJC5zdWJzY3JpYmUoXHJcbiAgICAgICgpID0+IHt9XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZGVmaW5lTGF6eUxvYWRTbGlkZXMoZGF0YTogYW55KSB7XHJcbiAgICBpZiAoIXRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzIHx8ICF0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5sYXp5TG9hZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKChkYXRhLnByb3BlcnR5ICYmIGRhdGEucHJvcGVydHkubmFtZSA9PT0gJ3Bvc2l0aW9uJykgfHwgZGF0YSA9PT0gJ2luaXRpYWxpemVkJyB8fCBkYXRhID09PSBcInJlc2l6ZWRcIikge1xyXG4gICAgICBjb25zdCBzZXR0aW5ncyA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLFxyXG4gICAgICAgICAgICBjbG9uZXMgPSB0aGlzLmNhcm91c2VsU2VydmljZS5jbG9uZXMoKS5sZW5ndGg7XHJcbiAgICAgIGxldCBuID0gKHNldHRpbmdzLmNlbnRlciAmJiBNYXRoLmNlaWwoc2V0dGluZ3MuaXRlbXMgLyAyKSB8fCBzZXR0aW5ncy5pdGVtcyksXHJcbiAgICAgICAgICBpID0gKChzZXR0aW5ncy5jZW50ZXIgJiYgbiAqIC0xKSB8fCAwKSxcclxuICAgICAgICAgIHBvc2l0aW9uID0gKGRhdGEucHJvcGVydHkgJiYgZGF0YS5wcm9wZXJ0eS52YWx1ZSAhPT0gdW5kZWZpbmVkID8gZGF0YS5wcm9wZXJ0eS52YWx1ZSA6IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmN1cnJlbnQoKSkgKyBpO1xyXG4gICAgICAgIC8vIGxvYWQgPSAkLnByb3h5KGZ1bmN0aW9uKGksIHYpIHsgdGhpcy5sb2FkKHYpIH0sIHRoaXMpO1xyXG4gICAgICAvL1RPRE86IE5lZWQgZG9jdW1lbnRhdGlvbiBmb3IgdGhpcyBuZXcgb3B0aW9uXHJcbiAgICAgIGlmIChzZXR0aW5ncy5sYXp5TG9hZEVhZ2VyID4gMCkge1xyXG4gICAgICAgIG4gKz0gc2V0dGluZ3MubGF6eUxvYWRFYWdlcjtcclxuICAgICAgICAvLyBJZiB0aGUgY2Fyb3VzZWwgaXMgbG9vcGluZyBhbHNvIHByZWxvYWQgaW1hZ2VzIHRoYXQgYXJlIHRvIHRoZSBcImxlZnRcIlxyXG4gICAgICAgIGlmIChzZXR0aW5ncy5sb29wKSB7XHJcbiAgICAgICAgICBwb3NpdGlvbiAtPSBzZXR0aW5ncy5sYXp5TG9hZEVhZ2VyO1xyXG4gICAgICAgICAgbisrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgd2hpbGUgKGkrKyA8IG4pIHtcclxuICAgICAgICB0aGlzLl9sb2FkKGNsb25lcyAvIDIgKyB0aGlzLmNhcm91c2VsU2VydmljZS5yZWxhdGl2ZShwb3NpdGlvbikpO1xyXG4gICAgICAgIGlmIChjbG9uZXMpIHtcclxuICAgICAgICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmNsb25lcyh0aGlzLmNhcm91c2VsU2VydmljZS5yZWxhdGl2ZShwb3NpdGlvbikpLmZvckVhY2godmFsdWUgPT4gdGhpcy5fbG9hZCh2YWx1ZSkpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgcG9zaXRpb24rKztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcblx0ICogTG9hZHMgYWxsIHJlc291cmNlcyBvZiBhbiBpdGVtIGF0IHRoZSBzcGVjaWZpZWQgcG9zaXRpb24uXHJcblx0ICogQHBhcmFtIHBvc2l0aW9uIC0gVGhlIGFic29sdXRlIHBvc2l0aW9uIG9mIHRoZSBpdGVtLlxyXG5cdCAqL1xyXG4gIHByaXZhdGUgX2xvYWQocG9zaXRpb246IG51bWJlcikge1xyXG4gICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNsaWRlc0RhdGFbcG9zaXRpb25dLmxvYWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNsaWRlc0RhdGFbcG9zaXRpb25dLmxvYWQgPSB0cnVlO1xyXG4gIH1cclxufVxyXG4iXX0=