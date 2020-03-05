import { __decorate, __param } from "tslib";
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
HashService = __decorate([
    Injectable(),
    __param(1, Optional()),
    __param(2, Optional())
], HashService);
export { HashService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFzaC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW93bC1jYXJvdXNlbC1vLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2hhc2guc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBYSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUV6RCxPQUFPLEVBQTRCLEtBQUssRUFBRSxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0QsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFakQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBR3JELElBQWEsV0FBVyxHQUF4QixNQUFhLFdBQVc7SUFXdEIsWUFDVSxlQUFnQyxFQUNwQixLQUFxQixFQUNyQixNQUFjO1FBRjFCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNwQixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBRWxDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNmLElBQUksQ0FBQyxLQUFLLEdBQUc7Z0JBQ1gsUUFBUSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2hDLENBQUM7U0FDVjtRQUFBLENBQUM7UUFFRixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNoQixJQUFJLENBQUMsTUFBTSxHQUFHO2dCQUNaLFFBQVEsRUFBRSxDQUFDLFFBQWUsRUFBRSxNQUFZLEVBQUUsRUFBRSxHQUFHLE9BQU0sQ0FBQyxDQUFDO2FBQ2pELENBQUM7U0FDVjtJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFRDs7T0FFRztJQUNILGNBQWM7UUFDWixNQUFNLG9CQUFvQixHQUF1QixJQUFJLENBQUMsZUFBZSxDQUFDLG1CQUFtQixFQUFFLENBQUMsSUFBSSxDQUM5RixHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFFLENBQ2pDLENBQUM7UUFFRixNQUFNLGdCQUFnQixHQUFvQixJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsRUFBRSxDQUFDLElBQUksQ0FDbkYsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ1QsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssVUFBVSxFQUFFO2dCQUN0RixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNuRCxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxZQUFZLENBQUM7Z0JBRWpGLElBQUksQ0FBQyxjQUFjLElBQUksY0FBYyxLQUFLLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtvQkFDeEUsT0FBTztpQkFDRjtnQkFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUMsUUFBUSxFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBQyxDQUFDLENBQUM7YUFDbEY7UUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO1FBRUYsTUFBTSxhQUFhLEdBQTZCLEtBQUssQ0FBQyxvQkFBb0IsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzlGLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxhQUFhLENBQUMsU0FBUyxDQUM3QyxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQ1QsQ0FBQztJQUNKLENBQUM7SUFFRDs7O09BR0c7SUFDSCxNQUFNLENBQUMsUUFBZ0I7UUFDckIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFlBQVksS0FBSyxRQUFRLElBQUksS0FBSyxDQUFDLFFBQVEsS0FBSyxLQUFLLENBQUMsQ0FBQztRQUVqSSxJQUFJLFFBQVEsS0FBSyxDQUFDLENBQUMsSUFBSSxRQUFRLEtBQUssSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNsRSxPQUFPO1NBQ1I7UUFFSCxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRUQ7O09BRUc7SUFDSCxhQUFhO1FBQ1gsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsYUFBYSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEYsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUNwQixJQUFJLENBQUMsS0FBSyxDQUFDLENBQ1o7YUFDQSxTQUFTLENBQ1IsUUFBUSxDQUFDLEVBQUU7WUFDVCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsUUFBUSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDeEIsQ0FBQyxDQUNGLENBQUE7SUFDTCxDQUFDO0NBQ0YsQ0FBQTs7WUEvRTRCLGVBQWU7WUFDYixjQUFjLHVCQUF4QyxRQUFRO1lBQ21CLE1BQU0sdUJBQWpDLFFBQVE7O0FBZEEsV0FBVztJQUR2QixVQUFVLEVBQUU7SUFjUixXQUFBLFFBQVEsRUFBRSxDQUFBO0lBQ1YsV0FBQSxRQUFRLEVBQUUsQ0FBQTtHQWRGLFdBQVcsQ0EyRnZCO1NBM0ZZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3ksIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5cclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBPYnNlcnZhYmxlLCBtZXJnZSwgb2YgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgdGFwLCBza2lwLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgQ2Fyb3VzZWxTZXJ2aWNlIH0gZnJvbSAnLi9jYXJvdXNlbC5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEhhc2hTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gdG8gbWVyZ2UgT2JzZXJ2YWJsZSBmcm9tIENhcm91c2VsU2VydmljZVxyXG4gICAqL1xyXG4gIGhhc2hTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ3VycmVudCB1cmwgZnJhZ21lbnQgKGhhc2gpXHJcbiAgICovXHJcbiAgY3VycmVudEhhc2hGcmFnbWVudDogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgY2Fyb3VzZWxTZXJ2aWNlOiBDYXJvdXNlbFNlcnZpY2UsXHJcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJcclxuICApIHtcclxuICAgIHRoaXMuc3B5RGF0YVN0cmVhbXMoKTtcclxuICAgIGlmICghdGhpcy5yb3V0ZSkge1xyXG4gICAgICB0aGlzLnJvdXRlID0ge1xyXG4gICAgICAgIGZyYWdtZW50OiBvZignbm8gcm91dGUnKS5waXBlKHRha2UoMSkpXHJcbiAgICAgIH0gYXMgYW55O1xyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoIXRoaXMucm91dGVyKSB7XHJcbiAgICAgIHRoaXMucm91dGVyID0ge1xyXG4gICAgICAgIG5hdmlnYXRlOiAoY29tbWFuZHM6IGFueVtdLCBleHRyYXM/OiBhbnkpID0+IHsgcmV0dXJuIH1cclxuICAgICAgfSBhcyBhbnk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuaGFzaFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVmaW5lcyBPYnNlcnZhYmxlcyB3aGljaCBzZXJ2aWNlIG11c3Qgb2JzZXJ2ZVxyXG4gICAqL1xyXG4gIHNweURhdGFTdHJlYW1zKCkge1xyXG4gICAgY29uc3QgaW5pdGlhbGl6ZWRDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldEluaXRpYWxpemVkU3RhdGUoKS5waXBlKFxyXG4gICAgICB0YXAoKCkgPT4gdGhpcy5saXN0ZW5Ub1JvdXRlKCkgKVxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBjaGFuZ2VkU2V0dGluZ3MkOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRDaGFuZ2VkU3RhdGUoKS5waXBlKFxyXG4gICAgICB0YXAoZGF0YSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLlVSTGhhc2hMaXN0ZW5lciAmJiBkYXRhLnByb3BlcnR5Lm5hbWUgPT09ICdwb3NpdGlvbicpIHtcclxuICAgICAgICAgIGNvbnN0IG5ld0N1clNsaWRlID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuY3VycmVudCgpO1xyXG4gICAgICAgICAgY29uc3QgbmV3Q3VyRnJhZ21lbnQgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zbGlkZXNEYXRhW25ld0N1clNsaWRlXS5oYXNoRnJhZ21lbnQ7XHJcblxyXG4gICAgICAgICAgaWYgKCFuZXdDdXJGcmFnbWVudCB8fCBuZXdDdXJGcmFnbWVudCA9PT0gdGhpcy5jdXJyZW50SGFzaEZyYWdtZW50KSB7XHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLi8nXSwge2ZyYWdtZW50OiBuZXdDdXJGcmFnbWVudCwgcmVsYXRpdmVUbzogdGhpcy5yb3V0ZX0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgaGFzaEZyYWdtZW50JDogT2JzZXJ2YWJsZTxzdHJpbmcgfCBhbnk+ID0gbWVyZ2UoaW5pdGlhbGl6ZWRDYXJvdXNlbCQsIGNoYW5nZWRTZXR0aW5ncyQpO1xyXG4gICAgdGhpcy5oYXNoU3Vic2NyaXB0aW9uID0gaGFzaEZyYWdtZW50JC5zdWJzY3JpYmUoXHJcbiAgICAgICgpID0+IHt9XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogcmV3aW5kcyBjYXJvdXNlbCB0byBzbGlkZSB3aGljaCBoYXMgdGhlIHNhbWUgaGFzaEZyYWdtZW50IGFzIGZyYWdtZW50IG9mIGN1cnJlbnQgdXJsXHJcbiAgICogQHBhcmFtIGZyYWdtZW50IGZyYWdtZW50IG9mIHVybFxyXG4gICAqL1xyXG4gIHJld2luZChmcmFnbWVudDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNsaWRlc0RhdGEuZmluZEluZGV4KHNsaWRlID0+IHNsaWRlLmhhc2hGcmFnbWVudCA9PT0gZnJhZ21lbnQgJiYgc2xpZGUuaXNDbG9uZWQgPT09IGZhbHNlKTtcclxuXHJcbiAgICBpZiAocG9zaXRpb24gPT09IC0xIHx8IHBvc2l0aW9uID09PSB0aGlzLmNhcm91c2VsU2VydmljZS5jdXJyZW50KCkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuXHRcdHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnRvKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnJlbGF0aXZlKHBvc2l0aW9uKSwgZmFsc2UpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdGlhdGUgbGlzdGVuaW5nIHRvIEFjdGl2YXRlZFJvdXRlLmZyYWdtZW50XHJcbiAgICovXHJcbiAgbGlzdGVuVG9Sb3V0ZSgpIHtcclxuICAgIGNvbnN0IGNvdW50ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3Muc3RhcnRQb3NpdGlvbiA9PT0gJ1VSTEhhc2gnID8gMCA6IDI7XHJcbiAgICB0aGlzLnJvdXRlLmZyYWdtZW50LnBpcGUoXHJcbiAgICAgICAgc2tpcChjb3VudClcclxuICAgICAgKVxyXG4gICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgIGZyYWdtZW50ID0+IHtcclxuICAgICAgICAgIHRoaXMuY3VycmVudEhhc2hGcmFnbWVudCA9IGZyYWdtZW50O1xyXG4gICAgICAgICAgdGhpcy5yZXdpbmQoZnJhZ21lbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgKVxyXG4gIH1cclxufVxyXG4iXX0=
