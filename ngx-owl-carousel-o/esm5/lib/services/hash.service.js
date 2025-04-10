import * as tslib_1 from "tslib";
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
    HashService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__param(1, Optional()),
        tslib_1.__param(2, Optional())
    ], HashService);
    return HashService;
}());
export { HashService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFzaC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW93bC1jYXJvdXNlbC1vLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2hhc2guc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBYSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUV6RCxPQUFPLEVBQTRCLEtBQUssRUFBRSxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0QsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFakQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBR3JEO0lBV0UscUJBQ1UsZUFBZ0MsRUFDcEIsS0FBcUIsRUFDckIsTUFBYztRQUYxQixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDcEIsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDckIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUVsQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZixJQUFJLENBQUMsS0FBSyxHQUFHO2dCQUNYLFFBQVEsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNoQyxDQUFDO1NBQ1Y7UUFBQSxDQUFDO1FBRUYsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRztnQkFDWixRQUFRLEVBQUUsVUFBQyxRQUFlLEVBQUUsTUFBWSxJQUFPLE9BQU0sQ0FBQyxDQUFDO2FBQ2pELENBQUM7U0FDVjtJQUNILENBQUM7SUFFRCxpQ0FBVyxHQUFYO1FBQ0UsSUFBSSxDQUFD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QVcsQ0EyRnZCO0lBQUQsa0JBQUM7Q0FBQSxBQTNGRCxJQTJGQztTQTNGWSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgT2JzZXJ2YWJsZSwgbWVyZ2UsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YXAsIHNraXAsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IENhcm91c2VsU2VydmljZSB9IGZyb20gJy4vY2Fyb3VzZWwuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBIYXNoU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIC8qKlxuICAgKiBTdWJzY3JpcHRpb24gdG8gbWVyZ2UgT2JzZXJ2YWJsZSBmcm9tIENhcm91c2VsU2VydmljZVxuICAgKi9cbiAgaGFzaFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qKlxuICAgKiBDdXJyZW50IHVybCBmcmFnbWVudCAoaGFzaClcbiAgICovXG4gIGN1cnJlbnRIYXNoRnJhZ21lbnQ6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNhcm91c2VsU2VydmljZTogQ2Fyb3VzZWxTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJcbiAgKSB7XG4gICAgdGhpcy5zcHlEYXRhU3RyZWFtcygpO1xuICAgIGlmICghdGhpcy5yb3V0ZSkge1xuICAgICAgdGhpcy5yb3V0ZSA9IHtcbiAgICAgICAgZnJhZ21lbnQ6IG9mKCdubyByb3V0ZScpLnBpcGUodGFrZSgxKSlcbiAgICAgIH0gYXMgYW55O1xuICAgIH07XG5cbiAgICBpZiAoIXRoaXMucm91dGVyKSB7XG4gICAgICB0aGlzLnJvdXRlciA9IHtcbiAgICAgICAgbmF2aWdhdGU6IChjb21tYW5kczogYW55W10sIGV4dHJhcz86IGFueSkgPT4geyByZXR1cm4gfVxuICAgICAgfSBhcyBhbnk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5oYXNoU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICAvKipcbiAgICogRGVmaW5lcyBPYnNlcnZhYmxlcyB3aGljaCBzZXJ2aWNlIG11c3Qgb2JzZXJ2ZVxuICAgKi9cbiAgc3B5RGF0YVN0cmVhbXMoKSB7XG4gICAgY29uc3QgaW5pdGlhbGl6ZWRDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldEluaXRpYWxpemVkU3RhdGUoKS5waXBlKFxuICAgICAgdGFwKCgpID0+IHRoaXMubGlzdGVuVG9Sb3V0ZSgpIClcbiAgICApO1xuXG4gICAgY29uc3QgY2hhbmdlZFNldHRpbmdzJDogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0Q2hhbmdlZFN0YXRlKCkucGlwZShcbiAgICAgIHRhcChkYXRhID0+IHtcbiAgICAgICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLlVSTGhhc2hMaXN0ZW5lciAmJiBkYXRhLnByb3BlcnR5Lm5hbWUgPT09ICdwb3NpdGlvbicpIHtcbiAgICAgICAgICBjb25zdCBuZXdDdXJTbGlkZSA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmN1cnJlbnQoKTtcbiAgICAgICAgICBjb25zdCBuZXdDdXJGcmFnbWVudCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNsaWRlc0RhdGFbbmV3Q3VyU2xpZGVdLmhhc2hGcmFnbWVudDtcblxuICAgICAgICAgIGlmICghbmV3Q3VyRnJhZ21lbnQgfHwgbmV3Q3VyRnJhZ21lbnQgPT09IHRoaXMuY3VycmVudEhhc2hGcmFnbWVudCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy4vJ10sIHtmcmFnbWVudDogbmV3Q3VyRnJhZ21lbnQsIHJlbGF0aXZlVG86IHRoaXMucm91dGV9KTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuXG4gICAgY29uc3QgaGFzaEZyYWdtZW50JDogT2JzZXJ2YWJsZTxzdHJpbmcgfCBhbnk+ID0gbWVyZ2UoaW5pdGlhbGl6ZWRDYXJvdXNlbCQsIGNoYW5nZWRTZXR0aW5ncyQpO1xuICAgIHRoaXMuaGFzaFN1YnNjcmlwdGlvbiA9IGhhc2hGcmFnbWVudCQuc3Vic2NyaWJlKFxuICAgICAgKCkgPT4ge31cbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIHJld2luZHMgY2Fyb3VzZWwgdG8gc2xpZGUgd2hpY2ggaGFzIHRoZSBzYW1lIGhhc2hGcmFnbWVudCBhcyBmcmFnbWVudCBvZiBjdXJyZW50IHVybFxuICAgKiBAcGFyYW0gZnJhZ21lbnQgZnJhZ21lbnQgb2YgdXJsXG4gICAqL1xuICByZXdpbmQoZnJhZ21lbnQ6IHN0cmluZykge1xuICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2xpZGVzRGF0YS5maW5kSW5kZXgoc2xpZGUgPT4gc2xpZGUuaGFzaEZyYWdtZW50ID09PSBmcmFnbWVudCAmJiBzbGlkZS5pc0Nsb25lZCA9PT0gZmFsc2UpO1xuXG4gICAgaWYgKHBvc2l0aW9uID09PSAtMSB8fCBwb3NpdGlvbiA9PT0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuY3VycmVudCgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG5cdFx0dGhpcy5jYXJvdXNlbFNlcnZpY2UudG8odGhpcy5jYXJvdXNlbFNlcnZpY2UucmVsYXRpdmUocG9zaXRpb24pLCBmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhdGUgbGlzdGVuaW5nIHRvIEFjdGl2YXRlZFJvdXRlLmZyYWdtZW50XG4gICAqL1xuICBsaXN0ZW5Ub1JvdXRlKCkge1xuICAgIGNvbnN0IGNvdW50ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3Muc3RhcnRQb3NpdGlvbiA9PT0gJ1VSTEhhc2gnID8gMCA6IDI7XG4gICAgdGhpcy5yb3V0ZS5mcmFnbWVudC5waXBlKFxuICAgICAgICBza2lwKGNvdW50KVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgZnJhZ21lbnQgPT4ge1xuICAgICAgICAgIHRoaXMuY3VycmVudEhhc2hGcmFnbWVudCA9IGZyYWdtZW50O1xuICAgICAgICAgIHRoaXMucmV3aW5kKGZyYWdtZW50KTtcbiAgICAgICAgfVxuICAgICAgKVxuICB9XG59XG4iXX0=