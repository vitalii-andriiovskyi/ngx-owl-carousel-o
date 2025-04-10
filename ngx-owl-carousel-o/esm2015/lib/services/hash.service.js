import * as tslib_1 from "tslib";
import { Injectable, Optional } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { merge, of } from 'rxjs';
import { tap, skip, take } from 'rxjs/operators';
import { CarouselService } from './carousel.service';
let HashService = class HashService {
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
};
HashService.ctorParameters = () => [
    { type: CarouselService },
    { type: ActivatedRoute, decorators: [{ type: Optional }] },
    { type: Router, decorators: [{ type: Optional }] }
];
HashService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__param(1, Optional()),
    tslib_1.__param(2, Optional())
], HashService);
export { HashService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFzaC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW93bC1jYXJvdXNlbC1vLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2hhc2guc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBYSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUV6RCxPQUFPLEVBQTRCLEtBQUssRUFBRSxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0QsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFakQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBR3JELElBQWEsV0FBVyxHQUF4QixNQUFhLFdBQVc7SUFXdEIsWUFDVSxlQUFnQyxFQUNwQixLQUFxQixFQUNyQixNQUFjO1FBRjFCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNwQixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBRWxDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNmLElBQUksQ0FBQyxLQUFLLEdBQUc7Z0JBQ1gsUUFBUSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2hDLENBQUM7U0FDVjtRQUFBLENBQUM7UUFFRixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNoQixJQUFJLENBQUMsTUFBTSxHQUFHO2dCQUNaLFFBQVEsRUFBRSxDQUFDLFFBQWUsRUFBRSxNQUFZLEVBQUUsRUFBRSxHQUFHLE9BQU0sQ0FBQyxDQUFDO2FBQ2pELENBQUM7U0FDVjtJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFRDs7T0FFRztJQUNILGNBQWM7UUFDWixNQUFNLG9CQUFvQixHQUF1QixJQUFJLENBQUMsZUFBZSxDQUFDLG1CQUFtQixFQUFFLENBQUMsSUFBSSxDQUM5RixHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFFLENBQ2pDLENBQUM7UUFFRixNQUFNLGdCQUFnQixHQUFvQixJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsRUFBRSxDQUFDLElBQUksQ0FDbkYsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ1QsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssVUFBVSxFQUFFO2dCQUN0RixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNuRCxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxZQUFZLENBQUM7Z0JBRWpGLElBQUksQ0FBQyxjQUFjLElBQUksY0FBYyxLQUFLLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtvQkFDeEUsT0FBTztpQkFDRjtnQkFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUMsUUFBUSxFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBQyxDQUFDLENBQUM7YUFDbEY7UUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO1FBRUYsTUFBTSxhQUFhLEdBQTZCLEtBQUssQ0FBQyxvQkFBb0IsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzlGLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxhQUFhLENBQUMsU0FBUyxDQUM3QyxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQ1QsQ0FBQztJQUNKLENBQUM7SUFFRDs7O09BR0c7SUFDSCxNQUFNLENBQUMsUUFBZ0I7UUFDckIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFlBQVksS0FBSyxRQUFRLElBQUksS0FBSyxDQUFDLFFBQVEsS0FBSyxLQUFLLENBQUMsQ0FBQztRQUVqSSxJQUFJLFFBQVEsS0FBSyxDQUFDLENBQUMsSUFBSSxRQUFRLEtBQUssSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNsRSxPQUFPO1NBQ1I7UUFFSCxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRUQ7O09BRUc7SUFDSCxhQUFhO1FBQ1gsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsYUFBYSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEYsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUNwQixJQUFJLENBQUMsS0FBSyxDQUFDLENBQ1o7YUFDQSxTQUFTLENBQ1IsUUFBUSxDQUFDLEVBQUU7WUFDVCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsUUFBUSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDeEIsQ0FBQyxDQUNGLENBQUE7SUFDTCxDQUFDO0NBQ0YsQ0FBQTs7WUEvRTRCLGVBQWU7WUFDYixjQUFjLHVCQUF4QyxRQUFRO1lBQ21CLE1BQU0sdUJBQWpDLFFBQVE7O0FBZEEsV0FBVztJQUR2QixVQUFVLEVBQUU7SUFjUixtQkFBQSxRQUFRLEVBQUUsQ0FBQTtJQUNWLG1CQUFBLFFBQVEsRUFBRSxDQUFBO0dBZEYsV0FBVyxDQTJGdkI7U0EzRlksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIE9ic2VydmFibGUsIG1lcmdlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFwLCBza2lwLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBDYXJvdXNlbFNlcnZpY2UgfSBmcm9tICcuL2Nhcm91c2VsLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSGFzaFNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogU3Vic2NyaXB0aW9uIHRvIG1lcmdlIE9ic2VydmFibGUgZnJvbSBDYXJvdXNlbFNlcnZpY2VcbiAgICovXG4gIGhhc2hTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKipcbiAgICogQ3VycmVudCB1cmwgZnJhZ21lbnQgKGhhc2gpXG4gICAqL1xuICBjdXJyZW50SGFzaEZyYWdtZW50OiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjYXJvdXNlbFNlcnZpY2U6IENhcm91c2VsU2VydmljZSxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIHJvdXRlcjogUm91dGVyXG4gICkge1xuICAgIHRoaXMuc3B5RGF0YVN0cmVhbXMoKTtcbiAgICBpZiAoIXRoaXMucm91dGUpIHtcbiAgICAgIHRoaXMucm91dGUgPSB7XG4gICAgICAgIGZyYWdtZW50OiBvZignbm8gcm91dGUnKS5waXBlKHRha2UoMSkpXG4gICAgICB9IGFzIGFueTtcbiAgICB9O1xuXG4gICAgaWYgKCF0aGlzLnJvdXRlcikge1xuICAgICAgdGhpcy5yb3V0ZXIgPSB7XG4gICAgICAgIG5hdmlnYXRlOiAoY29tbWFuZHM6IGFueVtdLCBleHRyYXM/OiBhbnkpID0+IHsgcmV0dXJuIH1cbiAgICAgIH0gYXMgYW55O1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuaGFzaFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlZmluZXMgT2JzZXJ2YWJsZXMgd2hpY2ggc2VydmljZSBtdXN0IG9ic2VydmVcbiAgICovXG4gIHNweURhdGFTdHJlYW1zKCkge1xuICAgIGNvbnN0IGluaXRpYWxpemVkQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRJbml0aWFsaXplZFN0YXRlKCkucGlwZShcbiAgICAgIHRhcCgoKSA9PiB0aGlzLmxpc3RlblRvUm91dGUoKSApXG4gICAgKTtcblxuICAgIGNvbnN0IGNoYW5nZWRTZXR0aW5ncyQ6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldENoYW5nZWRTdGF0ZSgpLnBpcGUoXG4gICAgICB0YXAoZGF0YSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5VUkxoYXNoTGlzdGVuZXIgJiYgZGF0YS5wcm9wZXJ0eS5uYW1lID09PSAncG9zaXRpb24nKSB7XG4gICAgICAgICAgY29uc3QgbmV3Q3VyU2xpZGUgPSB0aGlzLmNhcm91c2VsU2VydmljZS5jdXJyZW50KCk7XG4gICAgICAgICAgY29uc3QgbmV3Q3VyRnJhZ21lbnQgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zbGlkZXNEYXRhW25ld0N1clNsaWRlXS5oYXNoRnJhZ21lbnQ7XG5cbiAgICAgICAgICBpZiAoIW5ld0N1ckZyYWdtZW50IHx8IG5ld0N1ckZyYWdtZW50ID09PSB0aGlzLmN1cnJlbnRIYXNoRnJhZ21lbnQpIHtcblx0XHRcdFx0XHRcdHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycuLyddLCB7ZnJhZ21lbnQ6IG5ld0N1ckZyYWdtZW50LCByZWxhdGl2ZVRvOiB0aGlzLnJvdXRlfSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcblxuICAgIGNvbnN0IGhhc2hGcmFnbWVudCQ6IE9ic2VydmFibGU8c3RyaW5nIHwgYW55PiA9IG1lcmdlKGluaXRpYWxpemVkQ2Fyb3VzZWwkLCBjaGFuZ2VkU2V0dGluZ3MkKTtcbiAgICB0aGlzLmhhc2hTdWJzY3JpcHRpb24gPSBoYXNoRnJhZ21lbnQkLnN1YnNjcmliZShcbiAgICAgICgpID0+IHt9XG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZXdpbmRzIGNhcm91c2VsIHRvIHNsaWRlIHdoaWNoIGhhcyB0aGUgc2FtZSBoYXNoRnJhZ21lbnQgYXMgZnJhZ21lbnQgb2YgY3VycmVudCB1cmxcbiAgICogQHBhcmFtIGZyYWdtZW50IGZyYWdtZW50IG9mIHVybFxuICAgKi9cbiAgcmV3aW5kKGZyYWdtZW50OiBzdHJpbmcpIHtcbiAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNsaWRlc0RhdGEuZmluZEluZGV4KHNsaWRlID0+IHNsaWRlLmhhc2hGcmFnbWVudCA9PT0gZnJhZ21lbnQgJiYgc2xpZGUuaXNDbG9uZWQgPT09IGZhbHNlKTtcblxuICAgIGlmIChwb3NpdGlvbiA9PT0gLTEgfHwgcG9zaXRpb24gPT09IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmN1cnJlbnQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuXHRcdHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnRvKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnJlbGF0aXZlKHBvc2l0aW9uKSwgZmFsc2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYXRlIGxpc3RlbmluZyB0byBBY3RpdmF0ZWRSb3V0ZS5mcmFnbWVudFxuICAgKi9cbiAgbGlzdGVuVG9Sb3V0ZSgpIHtcbiAgICBjb25zdCBjb3VudCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLnN0YXJ0UG9zaXRpb24gPT09ICdVUkxIYXNoJyA/IDAgOiAyO1xuICAgIHRoaXMucm91dGUuZnJhZ21lbnQucGlwZShcbiAgICAgICAgc2tpcChjb3VudClcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgIGZyYWdtZW50ID0+IHtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRIYXNoRnJhZ21lbnQgPSBmcmFnbWVudDtcbiAgICAgICAgICB0aGlzLnJld2luZChmcmFnbWVudCk7XG4gICAgICAgIH1cbiAgICAgIClcbiAgfVxufVxuIl19