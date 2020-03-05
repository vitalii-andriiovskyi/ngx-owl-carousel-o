import { __decorate, __param } from "tslib";
import { Injectable, Optional } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { merge, of } from 'rxjs';
import { tap, skip, take } from 'rxjs/operators';
import { CarouselService } from './carousel.service';
var HashService = /** @class */ (function () {
    function HashService(carouselService, route, router) {
        this.carouselService = carouselService;
        this.route = route;
        this.router = router;
        this.spyDataStreams();
        if (!this.route) {
            this.route = {
                fragment: of('no route').pipe(take(1))
            };
        }
        ;
        if (!this.router) {
            this.router = {
                navigate: function (commands, extras) { return; }
            };
        }
    }
    HashService.prototype.ngOnDestroy = function () {
        this.hashSubscription.unsubscribe();
    };
    /**
     * Defines Observables which service must observe
     */
    HashService.prototype.spyDataStreams = function () {
        var _this = this;
        var initializedCarousel$ = this.carouselService.getInitializedState().pipe(tap(function () { return _this.listenToRoute(); }));
        var changedSettings$ = this.carouselService.getChangedState().pipe(tap(function (data) {
            if (_this.carouselService.settings.URLhashListener && data.property.name === 'position') {
                var newCurSlide = _this.carouselService.current();
                var newCurFragment = _this.carouselService.slidesData[newCurSlide].hashFragment;
                if (!newCurFragment || newCurFragment === _this.currentHashFragment) {
                    return;
                }
                _this.router.navigate(['./'], { fragment: newCurFragment, relativeTo: _this.route });
            }
        }));
        var hashFragment$ = merge(initializedCarousel$, changedSettings$);
        this.hashSubscription = hashFragment$.subscribe(function () { });
    };
    /**
     * rewinds carousel to slide which has the same hashFragment as fragment of current url
     * @param fragment fragment of url
     */
    HashService.prototype.rewind = function (fragment) {
        var position = this.carouselService.slidesData.findIndex(function (slide) { return slide.hashFragment === fragment && slide.isCloned === false; });
        if (position === -1 || position === this.carouselService.current()) {
            return;
        }
        this.carouselService.to(this.carouselService.relative(position), false);
    };
    /**
     * Initiate listening to ActivatedRoute.fragment
     */
    HashService.prototype.listenToRoute = function () {
        var _this = this;
        var count = this.carouselService.settings.startPosition === 'URLHash' ? 0 : 2;
        this.route.fragment.pipe(skip(count))
            .subscribe(function (fragment) {
            _this.currentHashFragment = fragment;
            _this.rewind(fragment);
        });
    };
    HashService.ctorParameters = function () { return [
        { type: CarouselService },
        { type: ActivatedRoute, decorators: [{ type: Optional }] },
        { type: Router, decorators: [{ type: Optional }] }
    ]; };
    HashService = __decorate([
        Injectable(),
        __param(1, Optional()),
        __param(2, Optional())
    ], HashService);
    return HashService;
}());
export { HashService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFzaC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW93bC1jYXJvdXNlbC1vLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2hhc2guc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBYSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUV6RCxPQUFPLEVBQTRCLEtBQUssRUFBRSxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0QsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFakQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBR3JEO0lBV0UscUJBQ1UsZUFBZ0MsRUFDcEIsS0FBcUIsRUFDckIsTUFBYztRQUYxQixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDcEIsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDckIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUVsQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZixJQUFJLENBQUMsS0FBSyxHQUFHO2dCQUNYLFFBQVEsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNoQyxDQUFDO1NBQ1Y7UUFBQSxDQUFDO1FBRUYsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRztnQkFDWixRQUFRLEVBQUUsVUFBQyxRQUFlLEVBQUUsTUFBWSxJQUFPLE9BQU0sQ0FBQyxDQUFDO2FBQ2pELENBQUM7U0FDVjtJQUNILENBQUM7SUFFRCxpQ0FBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFRDs7T0FFRztJQUNILG9DQUFjLEdBQWQ7UUFBQSxpQkF1QkM7UUF0QkMsSUFBTSxvQkFBb0IsR0FBdUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLElBQUksQ0FDOUYsR0FBRyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsYUFBYSxFQUFFLEVBQXBCLENBQW9CLENBQUUsQ0FDakMsQ0FBQztRQUVGLElBQU0sZ0JBQWdCLEdBQW9CLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxFQUFFLENBQUMsSUFBSSxDQUNuRixHQUFHLENBQUMsVUFBQSxJQUFJO1lBQ04sSUFBSSxLQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssVUFBVSxFQUFFO2dCQUN0RixJQUFNLFdBQVcsR0FBRyxLQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNuRCxJQUFNLGNBQWMsR0FBRyxLQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxZQUFZLENBQUM7Z0JBRWpGLElBQUksQ0FBQyxjQUFjLElBQUksY0FBYyxLQUFLLEtBQUksQ0FBQyxtQkFBbUIsRUFBRTtvQkFDeEUsT0FBTztpQkFDRjtnQkFDRCxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUMsUUFBUSxFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUUsS0FBSSxDQUFDLEtBQUssRUFBQyxDQUFDLENBQUM7YUFDbEY7UUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO1FBRUYsSUFBTSxhQUFhLEdBQTZCLEtBQUssQ0FBQyxvQkFBb0IsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzlGLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxhQUFhLENBQUMsU0FBUyxDQUM3QyxjQUFPLENBQUMsQ0FDVCxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7T0FHRztJQUNILDRCQUFNLEdBQU4sVUFBTyxRQUFnQjtRQUNyQixJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsWUFBWSxLQUFLLFFBQVEsSUFBSSxLQUFLLENBQUMsUUFBUSxLQUFLLEtBQUssRUFBM0QsQ0FBMkQsQ0FBQyxDQUFDO1FBRWpJLElBQUksUUFBUSxLQUFLLENBQUMsQ0FBQyxJQUFJLFFBQVEsS0FBSyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ2xFLE9BQU87U0FDUjtRQUVILElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFRDs7T0FFRztJQUNILG1DQUFhLEdBQWI7UUFBQSxpQkFXQztRQVZDLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLGFBQWEsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hGLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDcEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUNaO2FBQ0EsU0FBUyxDQUNSLFVBQUEsUUFBUTtZQUNOLEtBQUksQ0FBQyxtQkFBbUIsR0FBRyxRQUFRLENBQUM7WUFDcEMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4QixDQUFDLENBQ0YsQ0FBQTtJQUNMLENBQUM7O2dCQTlFMEIsZUFBZTtnQkFDYixjQUFjLHVCQUF4QyxRQUFRO2dCQUNtQixNQUFNLHVCQUFqQyxRQUFROztJQWRBLFdBQVc7UUFEdkIsVUFBVSxFQUFFO1FBY1IsV0FBQSxRQUFRLEVBQUUsQ0FBQTtRQUNWLFdBQUEsUUFBUSxFQUFFLENBQUE7T0FkRixXQUFXLENBMkZ2QjtJQUFELGtCQUFDO0NBQUEsQUEzRkQsSUEyRkM7U0EzRlksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIE9ic2VydmFibGUsIG1lcmdlLCBvZiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyB0YXAsIHNraXAsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBDYXJvdXNlbFNlcnZpY2UgfSBmcm9tICcuL2Nhcm91c2VsLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSGFzaFNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlwdGlvbiB0byBtZXJnZSBPYnNlcnZhYmxlIGZyb20gQ2Fyb3VzZWxTZXJ2aWNlXHJcbiAgICovXHJcbiAgaGFzaFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBDdXJyZW50IHVybCBmcmFnbWVudCAoaGFzaClcclxuICAgKi9cclxuICBjdXJyZW50SGFzaEZyYWdtZW50OiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBjYXJvdXNlbFNlcnZpY2U6IENhcm91c2VsU2VydmljZSxcclxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlclxyXG4gICkge1xyXG4gICAgdGhpcy5zcHlEYXRhU3RyZWFtcygpO1xyXG4gICAgaWYgKCF0aGlzLnJvdXRlKSB7XHJcbiAgICAgIHRoaXMucm91dGUgPSB7XHJcbiAgICAgICAgZnJhZ21lbnQ6IG9mKCdubyByb3V0ZScpLnBpcGUodGFrZSgxKSlcclxuICAgICAgfSBhcyBhbnk7XHJcbiAgICB9O1xyXG5cclxuICAgIGlmICghdGhpcy5yb3V0ZXIpIHtcclxuICAgICAgdGhpcy5yb3V0ZXIgPSB7XHJcbiAgICAgICAgbmF2aWdhdGU6IChjb21tYW5kczogYW55W10sIGV4dHJhcz86IGFueSkgPT4geyByZXR1cm4gfVxyXG4gICAgICB9IGFzIGFueTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5oYXNoU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZWZpbmVzIE9ic2VydmFibGVzIHdoaWNoIHNlcnZpY2UgbXVzdCBvYnNlcnZlXHJcbiAgICovXHJcbiAgc3B5RGF0YVN0cmVhbXMoKSB7XHJcbiAgICBjb25zdCBpbml0aWFsaXplZENhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0SW5pdGlhbGl6ZWRTdGF0ZSgpLnBpcGUoXHJcbiAgICAgIHRhcCgoKSA9PiB0aGlzLmxpc3RlblRvUm91dGUoKSApXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IGNoYW5nZWRTZXR0aW5ncyQ6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldENoYW5nZWRTdGF0ZSgpLnBpcGUoXHJcbiAgICAgIHRhcChkYXRhID0+IHtcclxuICAgICAgICBpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuVVJMaGFzaExpc3RlbmVyICYmIGRhdGEucHJvcGVydHkubmFtZSA9PT0gJ3Bvc2l0aW9uJykge1xyXG4gICAgICAgICAgY29uc3QgbmV3Q3VyU2xpZGUgPSB0aGlzLmNhcm91c2VsU2VydmljZS5jdXJyZW50KCk7XHJcbiAgICAgICAgICBjb25zdCBuZXdDdXJGcmFnbWVudCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNsaWRlc0RhdGFbbmV3Q3VyU2xpZGVdLmhhc2hGcmFnbWVudDtcclxuXHJcbiAgICAgICAgICBpZiAoIW5ld0N1ckZyYWdtZW50IHx8IG5ld0N1ckZyYWdtZW50ID09PSB0aGlzLmN1cnJlbnRIYXNoRnJhZ21lbnQpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycuLyddLCB7ZnJhZ21lbnQ6IG5ld0N1ckZyYWdtZW50LCByZWxhdGl2ZVRvOiB0aGlzLnJvdXRlfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBoYXNoRnJhZ21lbnQkOiBPYnNlcnZhYmxlPHN0cmluZyB8IGFueT4gPSBtZXJnZShpbml0aWFsaXplZENhcm91c2VsJCwgY2hhbmdlZFNldHRpbmdzJCk7XHJcbiAgICB0aGlzLmhhc2hTdWJzY3JpcHRpb24gPSBoYXNoRnJhZ21lbnQkLnN1YnNjcmliZShcclxuICAgICAgKCkgPT4ge31cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiByZXdpbmRzIGNhcm91c2VsIHRvIHNsaWRlIHdoaWNoIGhhcyB0aGUgc2FtZSBoYXNoRnJhZ21lbnQgYXMgZnJhZ21lbnQgb2YgY3VycmVudCB1cmxcclxuICAgKiBAcGFyYW0gZnJhZ21lbnQgZnJhZ21lbnQgb2YgdXJsXHJcbiAgICovXHJcbiAgcmV3aW5kKGZyYWdtZW50OiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2xpZGVzRGF0YS5maW5kSW5kZXgoc2xpZGUgPT4gc2xpZGUuaGFzaEZyYWdtZW50ID09PSBmcmFnbWVudCAmJiBzbGlkZS5pc0Nsb25lZCA9PT0gZmFsc2UpO1xyXG5cclxuICAgIGlmIChwb3NpdGlvbiA9PT0gLTEgfHwgcG9zaXRpb24gPT09IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmN1cnJlbnQoKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG5cdFx0dGhpcy5jYXJvdXNlbFNlcnZpY2UudG8odGhpcy5jYXJvdXNlbFNlcnZpY2UucmVsYXRpdmUocG9zaXRpb24pLCBmYWxzZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbml0aWF0ZSBsaXN0ZW5pbmcgdG8gQWN0aXZhdGVkUm91dGUuZnJhZ21lbnRcclxuICAgKi9cclxuICBsaXN0ZW5Ub1JvdXRlKCkge1xyXG4gICAgY29uc3QgY291bnQgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5zdGFydFBvc2l0aW9uID09PSAnVVJMSGFzaCcgPyAwIDogMjtcclxuICAgIHRoaXMucm91dGUuZnJhZ21lbnQucGlwZShcclxuICAgICAgICBza2lwKGNvdW50KVxyXG4gICAgICApXHJcbiAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgZnJhZ21lbnQgPT4ge1xyXG4gICAgICAgICAgdGhpcy5jdXJyZW50SGFzaEZyYWdtZW50ID0gZnJhZ21lbnQ7XHJcbiAgICAgICAgICB0aGlzLnJld2luZChmcmFnbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICApXHJcbiAgfVxyXG59XHJcbiJdfQ==
