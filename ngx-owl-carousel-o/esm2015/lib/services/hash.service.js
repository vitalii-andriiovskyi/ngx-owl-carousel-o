/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Optional } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { merge, of } from 'rxjs';
import { tap, skip, take } from 'rxjs/operators';
import { CarouselService } from './carousel.service';
export class HashService {
    /**
     * @param {?} carouselService
     * @param {?} route
     * @param {?} router
     */
    constructor(carouselService, route, router) {
        this.carouselService = carouselService;
        this.route = route;
        this.router = router;
        this.spyDataStreams();
        if (!this.route) {
            this.route = (/** @type {?} */ ({
                fragment: of('no route').pipe(take(1))
            }));
        }
        ;
        if (!this.router) {
            this.router = (/** @type {?} */ ({
                navigate: (/**
                 * @param {?} commands
                 * @param {?=} extras
                 * @return {?}
                 */
                (commands, extras) => { return; })
            }));
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.hashSubscription.unsubscribe();
    }
    /**
     * Defines Observables which service must observe
     * @return {?}
     */
    spyDataStreams() {
        /** @type {?} */
        const initializedCarousel$ = this.carouselService.getInitializedState().pipe(tap((/**
         * @return {?}
         */
        () => this.listenToRoute())));
        /** @type {?} */
        const changedSettings$ = this.carouselService.getChangedState().pipe(tap((/**
         * @param {?} data
         * @return {?}
         */
        data => {
            if (this.carouselService.settings.URLhashListener && data.property.name === 'position') {
                /** @type {?} */
                const newCurSlide = this.carouselService.current();
                /** @type {?} */
                const newCurFragment = this.carouselService.slidesData[newCurSlide].hashFragment;
                if (!newCurFragment || newCurFragment === this.currentHashFragment) {
                    return;
                }
                this.router.navigate(['./'], { fragment: newCurFragment, relativeTo: this.route });
            }
        })));
        /** @type {?} */
        const hashFragment$ = merge(initializedCarousel$, changedSettings$);
        this.hashSubscription = hashFragment$.subscribe((/**
         * @return {?}
         */
        () => { }));
    }
    /**
     * rewinds carousel to slide which has the same hashFragment as fragment of current url
     * @param {?} fragment fragment of url
     * @return {?}
     */
    rewind(fragment) {
        /** @type {?} */
        const position = this.carouselService.slidesData.findIndex((/**
         * @param {?} slide
         * @return {?}
         */
        slide => slide.hashFragment === fragment && slide.isCloned === false));
        if (position === -1 || position === this.carouselService.current()) {
            return;
        }
        this.carouselService.to(this.carouselService.relative(position), false);
    }
    /**
     * Initiate listening to ActivatedRoute.fragment
     * @return {?}
     */
    listenToRoute() {
        /** @type {?} */
        const count = this.carouselService.settings.startPosition === 'URLHash' ? 0 : 2;
        this.route.fragment.pipe(skip(count))
            .subscribe((/**
         * @param {?} fragment
         * @return {?}
         */
        fragment => {
            this.currentHashFragment = fragment;
            this.rewind(fragment);
        }));
    }
}
HashService.decorators = [
    { type: Injectable }
];
HashService.ctorParameters = () => [
    { type: CarouselService },
    { type: ActivatedRoute, decorators: [{ type: Optional }] },
    { type: Router, decorators: [{ type: Optional }] }
];
if (false) {
    /**
     * Subscription to merge Observable from CarouselService
     * @type {?}
     */
    HashService.prototype.hashSubscription;
    /**
     * Current url fragment (hash)
     * @type {?}
     */
    HashService.prototype.currentHashFragment;
    /**
     * @type {?}
     * @private
     */
    HashService.prototype.carouselService;
    /**
     * @type {?}
     * @private
     */
    HashService.prototype.route;
    /**
     * @type {?}
     * @private
     */
    HashService.prototype.router;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFzaC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW93bC1jYXJvdXNlbC1vLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2hhc2guc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBYSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUV6RCxPQUFPLEVBQTRCLEtBQUssRUFBRSxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0QsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFakQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBR3JELE1BQU07Ozs7OztJQVdKLFlBQ1UsZUFBZ0MsRUFDcEIsS0FBcUIsRUFDckIsTUFBYztRQUYxQixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDcEIsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDckIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUVsQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMsS0FBSyxHQUFHLG1CQUFBO2dCQUNYLFFBQVEsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN2QyxFQUFPLENBQUM7UUFDWCxDQUFDO1FBQUEsQ0FBQztRQUVGLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxtQkFBQTtnQkFDWixRQUFROzs7OztnQkFBRSxDQUFDLFFBQWUsRUFBRSxNQUFZLEVBQUUsRUFBRSxHQUFHLE1BQU0sQ0FBQSxDQUFDLENBQUMsQ0FBQTthQUN4RCxFQUFPLENBQUM7UUFDWCxDQUFDO0lBQ0gsQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdEMsQ0FBQzs7Ozs7SUFLRCxjQUFjOztjQUNOLG9CQUFvQixHQUF1QixJQUFJLENBQUMsZUFBZSxDQUFDLG1CQUFtQixFQUFFLENBQUMsSUFBSSxDQUM5RixHQUFHOzs7UUFBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FDakM7O2NBRUssZ0JBQWdCLEdBQW9CLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxFQUFFLENBQUMsSUFBSSxDQUNuRixHQUFHOzs7O1FBQUMsSUFBSSxDQUFDLEVBQUU7WUFDVCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQzs7c0JBQ2pGLFdBQVcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRTs7c0JBQzVDLGNBQWMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxZQUFZO2dCQUVoRixFQUFFLENBQUMsQ0FBQyxDQUFDLGNBQWMsSUFBSSxjQUFjLEtBQUssSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztvQkFDekUsTUFBTSxDQUFDO2dCQUNILENBQUM7Z0JBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFDLFFBQVEsRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDO1lBQ25GLENBQUM7UUFDSCxDQUFDLEVBQUMsQ0FDSDs7Y0FFSyxhQUFhLEdBQTZCLEtBQUssQ0FBQyxvQkFBb0IsRUFBRSxnQkFBZ0IsQ0FBQztRQUM3RixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsYUFBYSxDQUFDLFNBQVM7OztRQUM3QyxHQUFHLEVBQUUsR0FBRSxDQUFDLEVBQ1QsQ0FBQztJQUNKLENBQUM7Ozs7OztJQU1ELE1BQU0sQ0FBQyxRQUFnQjs7Y0FDZixRQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsU0FBUzs7OztRQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFlBQVksS0FBSyxRQUFRLElBQUksS0FBSyxDQUFDLFFBQVEsS0FBSyxLQUFLLEVBQUM7UUFFaEksRUFBRSxDQUFDLENBQUMsUUFBUSxLQUFLLENBQUMsQ0FBQyxJQUFJLFFBQVEsS0FBSyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNuRSxNQUFNLENBQUM7UUFDVCxDQUFDO1FBRUgsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDeEUsQ0FBQzs7Ozs7SUFLRCxhQUFhOztjQUNMLEtBQUssR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0UsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUNwQixJQUFJLENBQUMsS0FBSyxDQUFDLENBQ1o7YUFDQSxTQUFTOzs7O1FBQ1IsUUFBUSxDQUFDLEVBQUU7WUFDVCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsUUFBUSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDeEIsQ0FBQyxFQUNGLENBQUE7SUFDTCxDQUFDOzs7WUEzRkYsVUFBVTs7O1lBRkYsZUFBZTtZQUxmLGNBQWMsdUJBcUJsQixRQUFRO1lBckJZLE1BQU0sdUJBc0IxQixRQUFROzs7Ozs7O0lBVlgsdUNBQStCOzs7OztJQUsvQiwwQ0FBNEI7Ozs7O0lBRzFCLHNDQUF3Qzs7Ozs7SUFDeEMsNEJBQXlDOzs7OztJQUN6Qyw2QkFBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3ksIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5cclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBPYnNlcnZhYmxlLCBtZXJnZSwgb2YgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgdGFwLCBza2lwLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgQ2Fyb3VzZWxTZXJ2aWNlIH0gZnJvbSAnLi9jYXJvdXNlbC5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEhhc2hTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gdG8gbWVyZ2UgT2JzZXJ2YWJsZSBmcm9tIENhcm91c2VsU2VydmljZVxyXG4gICAqL1xyXG4gIGhhc2hTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ3VycmVudCB1cmwgZnJhZ21lbnQgKGhhc2gpXHJcbiAgICovXHJcbiAgY3VycmVudEhhc2hGcmFnbWVudDogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgY2Fyb3VzZWxTZXJ2aWNlOiBDYXJvdXNlbFNlcnZpY2UsXHJcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJcclxuICApIHtcclxuICAgIHRoaXMuc3B5RGF0YVN0cmVhbXMoKTtcclxuICAgIGlmICghdGhpcy5yb3V0ZSkge1xyXG4gICAgICB0aGlzLnJvdXRlID0ge1xyXG4gICAgICAgIGZyYWdtZW50OiBvZignbm8gcm91dGUnKS5waXBlKHRha2UoMSkpXHJcbiAgICAgIH0gYXMgYW55O1xyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoIXRoaXMucm91dGVyKSB7XHJcbiAgICAgIHRoaXMucm91dGVyID0ge1xyXG4gICAgICAgIG5hdmlnYXRlOiAoY29tbWFuZHM6IGFueVtdLCBleHRyYXM/OiBhbnkpID0+IHsgcmV0dXJuIH1cclxuICAgICAgfSBhcyBhbnk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuaGFzaFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVmaW5lcyBPYnNlcnZhYmxlcyB3aGljaCBzZXJ2aWNlIG11c3Qgb2JzZXJ2ZVxyXG4gICAqL1xyXG4gIHNweURhdGFTdHJlYW1zKCkge1xyXG4gICAgY29uc3QgaW5pdGlhbGl6ZWRDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldEluaXRpYWxpemVkU3RhdGUoKS5waXBlKFxyXG4gICAgICB0YXAoKCkgPT4gdGhpcy5saXN0ZW5Ub1JvdXRlKCkgKVxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBjaGFuZ2VkU2V0dGluZ3MkOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRDaGFuZ2VkU3RhdGUoKS5waXBlKFxyXG4gICAgICB0YXAoZGF0YSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLlVSTGhhc2hMaXN0ZW5lciAmJiBkYXRhLnByb3BlcnR5Lm5hbWUgPT09ICdwb3NpdGlvbicpIHtcclxuICAgICAgICAgIGNvbnN0IG5ld0N1clNsaWRlID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuY3VycmVudCgpO1xyXG4gICAgICAgICAgY29uc3QgbmV3Q3VyRnJhZ21lbnQgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zbGlkZXNEYXRhW25ld0N1clNsaWRlXS5oYXNoRnJhZ21lbnQ7XHJcblxyXG4gICAgICAgICAgaWYgKCFuZXdDdXJGcmFnbWVudCB8fCBuZXdDdXJGcmFnbWVudCA9PT0gdGhpcy5jdXJyZW50SGFzaEZyYWdtZW50KSB7XHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLi8nXSwge2ZyYWdtZW50OiBuZXdDdXJGcmFnbWVudCwgcmVsYXRpdmVUbzogdGhpcy5yb3V0ZX0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgaGFzaEZyYWdtZW50JDogT2JzZXJ2YWJsZTxzdHJpbmcgfCBhbnk+ID0gbWVyZ2UoaW5pdGlhbGl6ZWRDYXJvdXNlbCQsIGNoYW5nZWRTZXR0aW5ncyQpO1xyXG4gICAgdGhpcy5oYXNoU3Vic2NyaXB0aW9uID0gaGFzaEZyYWdtZW50JC5zdWJzY3JpYmUoXHJcbiAgICAgICgpID0+IHt9XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogcmV3aW5kcyBjYXJvdXNlbCB0byBzbGlkZSB3aGljaCBoYXMgdGhlIHNhbWUgaGFzaEZyYWdtZW50IGFzIGZyYWdtZW50IG9mIGN1cnJlbnQgdXJsXHJcbiAgICogQHBhcmFtIGZyYWdtZW50IGZyYWdtZW50IG9mIHVybFxyXG4gICAqL1xyXG4gIHJld2luZChmcmFnbWVudDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNsaWRlc0RhdGEuZmluZEluZGV4KHNsaWRlID0+IHNsaWRlLmhhc2hGcmFnbWVudCA9PT0gZnJhZ21lbnQgJiYgc2xpZGUuaXNDbG9uZWQgPT09IGZhbHNlKTtcclxuXHJcbiAgICBpZiAocG9zaXRpb24gPT09IC0xIHx8IHBvc2l0aW9uID09PSB0aGlzLmNhcm91c2VsU2VydmljZS5jdXJyZW50KCkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuXHRcdHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnRvKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnJlbGF0aXZlKHBvc2l0aW9uKSwgZmFsc2UpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdGlhdGUgbGlzdGVuaW5nIHRvIEFjdGl2YXRlZFJvdXRlLmZyYWdtZW50XHJcbiAgICovXHJcbiAgbGlzdGVuVG9Sb3V0ZSgpIHtcclxuICAgIGNvbnN0IGNvdW50ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3Muc3RhcnRQb3NpdGlvbiA9PT0gJ1VSTEhhc2gnID8gMCA6IDI7XHJcbiAgICB0aGlzLnJvdXRlLmZyYWdtZW50LnBpcGUoXHJcbiAgICAgICAgc2tpcChjb3VudClcclxuICAgICAgKVxyXG4gICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgIGZyYWdtZW50ID0+IHtcclxuICAgICAgICAgIHRoaXMuY3VycmVudEhhc2hGcmFnbWVudCA9IGZyYWdtZW50O1xyXG4gICAgICAgICAgdGhpcy5yZXdpbmQoZnJhZ21lbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgKVxyXG4gIH1cclxufVxyXG4iXX0=