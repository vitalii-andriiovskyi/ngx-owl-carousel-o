import { Injectable, Optional } from '@angular/core';
import { merge, of } from 'rxjs';
import { tap, skip, take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./carousel.service";
import * as i2 from "@angular/router";
export class HashService {
    constructor(carouselService, route, router) {
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
                navigate: (commands, extras) => { return; }
            };
        }
    }
    ngOnDestroy() {
        this.hashSubscription.unsubscribe();
    }
    /**
     * Defines Observables which service must observe
     */
    spyDataStreams() {
        const initializedCarousel$ = this.carouselService.getInitializedState().pipe(tap(() => this.listenToRoute()));
        const changedSettings$ = this.carouselService.getChangedState().pipe(tap(data => {
            if (this.carouselService.settings.URLhashListener && data.property.name === 'position') {
                const newCurSlide = this.carouselService.current();
                const newCurFragment = this.carouselService.slidesData[newCurSlide].hashFragment;
                if (!newCurFragment || newCurFragment === this.currentHashFragment) {
                    return;
                }
                this.router.navigate(['./'], { fragment: newCurFragment, relativeTo: this.route });
            }
        }));
        const hashFragment$ = merge(initializedCarousel$, changedSettings$);
        this.hashSubscription = hashFragment$.subscribe(() => { });
    }
    /**
     * rewinds carousel to slide which has the same hashFragment as fragment of current url
     * @param fragment fragment of url
     */
    rewind(fragment) {
        const position = this.carouselService.slidesData.findIndex(slide => slide.hashFragment === fragment && slide.isCloned === false);
        if (position === -1 || position === this.carouselService.current()) {
            return;
        }
        this.carouselService.to(this.carouselService.relative(position), false);
    }
    /**
     * Initiate listening to ActivatedRoute.fragment
     */
    listenToRoute() {
        const count = this.carouselService.settings.startPosition === 'URLHash' ? 0 : 2;
        this.route.fragment.pipe(skip(count))
            .subscribe(fragment => {
            this.currentHashFragment = fragment;
            this.rewind(fragment);
        });
    }
}
HashService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.4", ngImport: i0, type: HashService, deps: [{ token: i1.CarouselService }, { token: i2.ActivatedRoute, optional: true }, { token: i2.Router, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
HashService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.0.4", ngImport: i0, type: HashService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.4", ngImport: i0, type: HashService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.CarouselService }, { type: i2.ActivatedRoute, decorators: [{
                    type: Optional
                }] }, { type: i2.Router, decorators: [{
                    type: Optional
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFzaC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGlicy9uZ3gtb3dsLWNhcm91c2VsLW8vc3JjL2xpYi9zZXJ2aWNlcy9oYXNoLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBYSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHaEUsT0FBTyxFQUE0QixLQUFLLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNELE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBS2pELE1BQU0sT0FBTyxXQUFXO0lBV3RCLFlBQ1UsZUFBZ0MsRUFDcEIsS0FBcUIsRUFDckIsTUFBYztRQUYxQixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDcEIsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDckIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUVsQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZixJQUFJLENBQUMsS0FBSyxHQUFHO2dCQUNYLFFBQVEsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNoQyxDQUFDO1NBQ1Y7UUFBQSxDQUFDO1FBRUYsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRztnQkFDWixRQUFRLEVBQUUsQ0FBQyxRQUFlLEVBQUUsTUFBWSxFQUFFLEVBQUUsR0FBRyxPQUFNLENBQUMsQ0FBQzthQUNqRCxDQUFDO1NBQ1Y7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxjQUFjO1FBQ1osTUFBTSxvQkFBb0IsR0FBdUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLElBQUksQ0FDOUYsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBRSxDQUNqQyxDQUFDO1FBRUYsTUFBTSxnQkFBZ0IsR0FBb0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxJQUFJLENBQ25GLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNULElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLFVBQVUsRUFBRTtnQkFDdEYsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDbkQsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsWUFBWSxDQUFDO2dCQUVqRixJQUFJLENBQUMsY0FBYyxJQUFJLGNBQWMsS0FBSyxJQUFJLENBQUMsbUJBQW1CLEVBQUU7b0JBQ3hFLE9BQU87aUJBQ0Y7Z0JBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFDLFFBQVEsRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDO2FBQ2xGO1FBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUVGLE1BQU0sYUFBYSxHQUE2QixLQUFLLENBQUMsb0JBQW9CLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUM5RixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsYUFBYSxDQUFDLFNBQVMsQ0FDN0MsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUNULENBQUM7SUFDSixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsTUFBTSxDQUFDLFFBQWdCO1FBQ3JCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxZQUFZLEtBQUssUUFBUSxJQUFJLEtBQUssQ0FBQyxRQUFRLEtBQUssS0FBSyxDQUFDLENBQUM7UUFFakksSUFBSSxRQUFRLEtBQUssQ0FBQyxDQUFDLElBQUksUUFBUSxLQUFLLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDbEUsT0FBTztTQUNSO1FBRUgsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVEOztPQUVHO0lBQ0gsYUFBYTtRQUNYLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLGFBQWEsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hGLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDcEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUNaO2FBQ0EsU0FBUyxDQUNSLFFBQVEsQ0FBQyxFQUFFO1lBQ1QsSUFBSSxDQUFDLG1CQUFtQixHQUFHLFFBQVEsQ0FBQztZQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hCLENBQUMsQ0FDRixDQUFBO0lBQ0wsQ0FBQzs7d0dBMUZVLFdBQVc7NEdBQVgsV0FBVzsyRkFBWCxXQUFXO2tCQUR2QixVQUFVOzswQkFjTixRQUFROzswQkFDUixRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgT2JzZXJ2YWJsZSwgbWVyZ2UsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YXAsIHNraXAsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IENhcm91c2VsU2VydmljZSB9IGZyb20gJy4vY2Fyb3VzZWwuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBIYXNoU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIC8qKlxuICAgKiBTdWJzY3JpcHRpb24gdG8gbWVyZ2UgT2JzZXJ2YWJsZSBmcm9tIENhcm91c2VsU2VydmljZVxuICAgKi9cbiAgaGFzaFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qKlxuICAgKiBDdXJyZW50IHVybCBmcmFnbWVudCAoaGFzaClcbiAgICovXG4gIGN1cnJlbnRIYXNoRnJhZ21lbnQ6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNhcm91c2VsU2VydmljZTogQ2Fyb3VzZWxTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJcbiAgKSB7XG4gICAgdGhpcy5zcHlEYXRhU3RyZWFtcygpO1xuICAgIGlmICghdGhpcy5yb3V0ZSkge1xuICAgICAgdGhpcy5yb3V0ZSA9IHtcbiAgICAgICAgZnJhZ21lbnQ6IG9mKCdubyByb3V0ZScpLnBpcGUodGFrZSgxKSlcbiAgICAgIH0gYXMgYW55O1xuICAgIH07XG5cbiAgICBpZiAoIXRoaXMucm91dGVyKSB7XG4gICAgICB0aGlzLnJvdXRlciA9IHtcbiAgICAgICAgbmF2aWdhdGU6IChjb21tYW5kczogYW55W10sIGV4dHJhcz86IGFueSkgPT4geyByZXR1cm4gfVxuICAgICAgfSBhcyBhbnk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5oYXNoU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICAvKipcbiAgICogRGVmaW5lcyBPYnNlcnZhYmxlcyB3aGljaCBzZXJ2aWNlIG11c3Qgb2JzZXJ2ZVxuICAgKi9cbiAgc3B5RGF0YVN0cmVhbXMoKSB7XG4gICAgY29uc3QgaW5pdGlhbGl6ZWRDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldEluaXRpYWxpemVkU3RhdGUoKS5waXBlKFxuICAgICAgdGFwKCgpID0+IHRoaXMubGlzdGVuVG9Sb3V0ZSgpIClcbiAgICApO1xuXG4gICAgY29uc3QgY2hhbmdlZFNldHRpbmdzJDogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0Q2hhbmdlZFN0YXRlKCkucGlwZShcbiAgICAgIHRhcChkYXRhID0+IHtcbiAgICAgICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLlVSTGhhc2hMaXN0ZW5lciAmJiBkYXRhLnByb3BlcnR5Lm5hbWUgPT09ICdwb3NpdGlvbicpIHtcbiAgICAgICAgICBjb25zdCBuZXdDdXJTbGlkZSA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmN1cnJlbnQoKTtcbiAgICAgICAgICBjb25zdCBuZXdDdXJGcmFnbWVudCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNsaWRlc0RhdGFbbmV3Q3VyU2xpZGVdLmhhc2hGcmFnbWVudDtcblxuICAgICAgICAgIGlmICghbmV3Q3VyRnJhZ21lbnQgfHwgbmV3Q3VyRnJhZ21lbnQgPT09IHRoaXMuY3VycmVudEhhc2hGcmFnbWVudCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy4vJ10sIHtmcmFnbWVudDogbmV3Q3VyRnJhZ21lbnQsIHJlbGF0aXZlVG86IHRoaXMucm91dGV9KTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuXG4gICAgY29uc3QgaGFzaEZyYWdtZW50JDogT2JzZXJ2YWJsZTxzdHJpbmcgfCBhbnk+ID0gbWVyZ2UoaW5pdGlhbGl6ZWRDYXJvdXNlbCQsIGNoYW5nZWRTZXR0aW5ncyQpO1xuICAgIHRoaXMuaGFzaFN1YnNjcmlwdGlvbiA9IGhhc2hGcmFnbWVudCQuc3Vic2NyaWJlKFxuICAgICAgKCkgPT4ge31cbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIHJld2luZHMgY2Fyb3VzZWwgdG8gc2xpZGUgd2hpY2ggaGFzIHRoZSBzYW1lIGhhc2hGcmFnbWVudCBhcyBmcmFnbWVudCBvZiBjdXJyZW50IHVybFxuICAgKiBAcGFyYW0gZnJhZ21lbnQgZnJhZ21lbnQgb2YgdXJsXG4gICAqL1xuICByZXdpbmQoZnJhZ21lbnQ6IHN0cmluZykge1xuICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2xpZGVzRGF0YS5maW5kSW5kZXgoc2xpZGUgPT4gc2xpZGUuaGFzaEZyYWdtZW50ID09PSBmcmFnbWVudCAmJiBzbGlkZS5pc0Nsb25lZCA9PT0gZmFsc2UpO1xuXG4gICAgaWYgKHBvc2l0aW9uID09PSAtMSB8fCBwb3NpdGlvbiA9PT0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuY3VycmVudCgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG5cdFx0dGhpcy5jYXJvdXNlbFNlcnZpY2UudG8odGhpcy5jYXJvdXNlbFNlcnZpY2UucmVsYXRpdmUocG9zaXRpb24pLCBmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhdGUgbGlzdGVuaW5nIHRvIEFjdGl2YXRlZFJvdXRlLmZyYWdtZW50XG4gICAqL1xuICBsaXN0ZW5Ub1JvdXRlKCkge1xuICAgIGNvbnN0IGNvdW50ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3Muc3RhcnRQb3NpdGlvbiA9PT0gJ1VSTEhhc2gnID8gMCA6IDI7XG4gICAgdGhpcy5yb3V0ZS5mcmFnbWVudC5waXBlKFxuICAgICAgICBza2lwKGNvdW50KVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgZnJhZ21lbnQgPT4ge1xuICAgICAgICAgIHRoaXMuY3VycmVudEhhc2hGcmFnbWVudCA9IGZyYWdtZW50O1xuICAgICAgICAgIHRoaXMucmV3aW5kKGZyYWdtZW50KTtcbiAgICAgICAgfVxuICAgICAgKVxuICB9XG59XG4iXX0=