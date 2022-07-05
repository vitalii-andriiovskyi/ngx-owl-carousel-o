import { Injectable, Inject } from '@angular/core';
import { merge, of } from 'rxjs';
import { tap, switchMap, first, filter } from 'rxjs/operators';
import { WINDOW } from './window-ref.service';
import { DOCUMENT } from './document-ref.service';
import * as i0 from "@angular/core";
import * as i1 from "./carousel.service";
export class AutoplayService {
    constructor(carouselService, winRef, docRef, ngZone) {
        this.carouselService = carouselService;
        this.ngZone = ngZone;
        /**
         * The autoplay timeout.
         */
        this._timeout = null;
        /**
         * Indicates whenever the autoplay is paused.
         */
        this._paused = false;
        /**
         * Shows whether the autoplay is paused for unlimited time by the developer.
         * Use to prevent autoplaying in case of firing `mouseleave` by adding layers to `<body>` like `mat-menu` does
         */
        this._isAutoplayStopped = false;
        this.winRef = winRef;
        this.docRef = docRef;
        this.spyDataStreams();
    }
    get isAutoplayStopped() {
        return this._isAutoplayStopped;
    }
    set isAutoplayStopped(value) {
        this._isAutoplayStopped = value;
    }
    ngOnDestroy() {
        this.autoplaySubscription.unsubscribe();
    }
    /**
     * Defines Observables which service must observe
     */
    spyDataStreams() {
        const initializedCarousel$ = this.carouselService.getInitializedState().pipe(tap(() => {
            if (this.carouselService.settings.autoplay) {
                this.play();
            }
        }));
        const changedSettings$ = this.carouselService.getChangedState().pipe(tap(data => {
            this._handleChangeObservable(data);
        }));
        const resized$ = this.carouselService.getResizedState().pipe(tap(() => {
            if (this.carouselService.settings.autoplay && !this._isAutoplayStopped) {
                this.play();
            }
            else {
                this.stop();
            }
        }));
        // original Autoplay Plugin has listeners on play.owl.core and stop.owl.core events.
        // They are triggered by Video Plugin
        const autoplayMerge$ = merge(initializedCarousel$, changedSettings$, resized$);
        this.autoplaySubscription = autoplayMerge$.subscribe(() => { });
    }
    /**
       * Starts the autoplay.
       * @param timeout The interval before the next animation starts.
       * @param speed The animation speed for the animations.
       */
    play(timeout, speed) {
        if (this._paused) {
            this._paused = false;
            this._setAutoPlayInterval(this.carouselService.settings.autoplayMouseleaveTimeout);
        }
        if (this.carouselService.is('rotating')) {
            return;
        }
        this.carouselService.enter('rotating');
        this._setAutoPlayInterval();
    }
    ;
    /**
       * Gets a new timeout
       * @param timeout - The interval before the next animation starts.
       * @param speed - The animation speed for the animations.
       * @return
       */
    _getNextTimeout(timeout, speed) {
        if (this._timeout) {
            this.winRef.clearTimeout(this._timeout);
        }
        this._isArtificialAutoplayTimeout = timeout ? true : false;
        return this.ngZone.runOutsideAngular(() => {
            return this.winRef.setTimeout(() => {
                this.ngZone.run(() => {
                    if (this._paused || this.carouselService.is('busy') || this.carouselService.is('interacting') || this.docRef.hidden) {
                        return;
                    }
                    this.carouselService.next(speed || this.carouselService.settings.autoplaySpeed);
                });
            }, timeout || this.carouselService.settings.autoplayTimeout);
        });
    }
    ;
    /**
       * Sets autoplay in motion.
       */
    _setAutoPlayInterval(timeout) {
        this._timeout = this._getNextTimeout(timeout);
    }
    ;
    /**
     * Stops the autoplay.
     */
    stop() {
        if (!this.carouselService.is('rotating')) {
            return;
        }
        this._paused = true;
        this.winRef.clearTimeout(this._timeout);
        this.carouselService.leave('rotating');
    }
    ;
    /**
       * Stops the autoplay.
       */
    pause() {
        if (!this.carouselService.is('rotating')) {
            return;
        }
        this._paused = true;
    }
    ;
    /**
     * Manages by autoplaying according to data passed by _changedSettingsCarousel$ Obsarvable
     * @param data object with current position of carousel and type of change
     */
    _handleChangeObservable(data) {
        if (data.property.name === 'settings') {
            if (this.carouselService.settings.autoplay) {
                this.play();
            }
            else {
                this.stop();
            }
        }
        else if (data.property.name === 'position') {
            //console.log('play?', e);
            if (this.carouselService.settings.autoplay) {
                this._setAutoPlayInterval();
            }
        }
    }
    /**
     * Starts autoplaying of the carousel in the case when user leaves the carousel before it starts translateing (moving)
     */
    _playAfterTranslated() {
        of('translated').pipe(switchMap(data => this.carouselService.getTranslatedState()), first(), filter(() => this._isArtificialAutoplayTimeout), tap(() => this._setAutoPlayInterval())).subscribe(() => { });
    }
    /**
     * Starts pausing
     */
    startPausing() {
        if (this.carouselService.settings.autoplayHoverPause && this.carouselService.is('rotating')) {
            this.pause();
        }
    }
    /**
     * Starts playing after mouse leaves carousel
     */
    startPlayingMouseLeave() {
        if (this.carouselService.settings.autoplayHoverPause && this.carouselService.is('rotating')) {
            this.play();
            this._playAfterTranslated();
        }
    }
    /**
     * Starts playing after touch ends
     */
    startPlayingTouchEnd() {
        if (this.carouselService.settings.autoplayHoverPause && this.carouselService.is('rotating')) {
            this.play();
            this._playAfterTranslated();
        }
    }
}
AutoplayService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.4", ngImport: i0, type: AutoplayService, deps: [{ token: i1.CarouselService }, { token: WINDOW }, { token: DOCUMENT }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Injectable });
AutoplayService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.0.4", ngImport: i0, type: AutoplayService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.4", ngImport: i0, type: AutoplayService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.CarouselService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [WINDOW]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.NgZone }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b3BsYXkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYnMvbmd4LW93bC1jYXJvdXNlbC1vL3NyYy9saWIvc2VydmljZXMvYXV0b3BsYXkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDdEUsT0FBTyxFQUE0QixLQUFLLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNELE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUcvRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHdCQUF3QixDQUFDOzs7QUFHbEQsTUFBTSxPQUFPLGVBQWU7SUFxQzFCLFlBQW9CLGVBQWdDLEVBQ3hCLE1BQVcsRUFDVCxNQUFXLEVBQ3JCLE1BQWM7UUFIZCxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFHaEMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQWxDbEM7O1dBRUc7UUFDSyxhQUFRLEdBQVcsSUFBSSxDQUFDO1FBRWhDOztXQUVHO1FBQ0ssWUFBTyxHQUFHLEtBQUssQ0FBQztRQU94Qjs7O1dBR0c7UUFDSyx1QkFBa0IsR0FBRyxLQUFLLENBQUM7UUFpQmpDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBZ0IsQ0FBQztRQUMvQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQWtCLENBQUM7UUFDakMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFuQkQsSUFBSSxpQkFBaUI7UUFDbkIsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUM7SUFDakMsQ0FBQztJQUNELElBQUksaUJBQWlCLENBQUMsS0FBSztRQUN6QixJQUFJLENBQUMsa0JBQWtC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QUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNaLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1NBQzdCO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0gsb0JBQW9CO1FBQ2xCLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsa0JBQWtCLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDM0YsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ1osSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7U0FDN0I7SUFDSCxDQUFDOzs0R0EvTlUsZUFBZSxpREFzQ04sTUFBTSxhQUNOLFFBQVE7Z0hBdkNqQixlQUFlOzJGQUFmLGVBQWU7a0JBRDNCLFVBQVU7OzBCQXVDSSxNQUFNOzJCQUFDLE1BQU07OzBCQUNiLE1BQU07MkJBQUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCwgT25EZXN0cm95LCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgT2JzZXJ2YWJsZSwgbWVyZ2UsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YXAsIHN3aXRjaE1hcCwgZmlyc3QsIGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgQ2Fyb3VzZWxTZXJ2aWNlIH0gZnJvbSAnLi9jYXJvdXNlbC5zZXJ2aWNlJztcbmltcG9ydCB7IFdJTkRPVyB9IGZyb20gJy4vd2luZG93LXJlZi5zZXJ2aWNlJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnLi9kb2N1bWVudC1yZWYuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBdXRvcGxheVNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3l7XG4gIC8qKlxuICAgKiBTdWJzY3Jpb3B0aW9uIHRvIG1lcmdlIE9ic2VydmFibGVzIGZyb20gQ2Fyb3VzZWxTZXJ2aWNlXG4gICAqL1xuICBhdXRvcGxheVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qKlxuICAgKiBUaGUgYXV0b3BsYXkgdGltZW91dC5cbiAgICovXG4gIHByaXZhdGUgX3RpbWVvdXQ6IG51bWJlciA9IG51bGw7XG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyB3aGVuZXZlciB0aGUgYXV0b3BsYXkgaXMgcGF1c2VkLlxuICAgKi9cbiAgcHJpdmF0ZSBfcGF1c2VkID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFNob3dzIHdoZXRoZXIgdGhlIGNvZGUgKHRoZSBwbHVnaW4pIGNoYW5nZWQgdGhlIG9wdGlvbiAnQXV0b3BsYXlUaW1lb3V0JyBmb3Igb3duIG5lZWRzXG4gICAqL1xuICBwcml2YXRlIF9pc0FydGlmaWNpYWxBdXRvcGxheVRpbWVvdXQ6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFNob3dzIHdoZXRoZXIgdGhlIGF1dG9wbGF5IGlzIHBhdXNlZCBmb3IgdW5saW1pdGVkIHRpbWUgYnkgdGhlIGRldmVsb3Blci5cbiAgICogVXNlIHRvIHByZXZlbnQgYXV0b3BsYXlpbmcgaW4gY2FzZSBvZiBmaXJpbmcgYG1vdXNlbGVhdmVgIGJ5IGFkZGluZyBsYXllcnMgdG8gYDxib2R5PmAgbGlrZSBgbWF0LW1lbnVgIGRvZXNcbiAgICovXG4gIHByaXZhdGUgX2lzQXV0b3BsYXlTdG9wcGVkID0gZmFsc2U7XG4gIGdldCBpc0F1dG9wbGF5U3RvcHBlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5faXNBdXRvcGxheVN0b3BwZWQ7XG4gIH1cbiAgc2V0IGlzQXV0b3BsYXlTdG9wcGVkKHZhbHVlKSB7XG4gICAgdGhpcy5faXNBdXRvcGxheVN0b3BwZWQgPSB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgd2luUmVmOiBXaW5kb3c7XG4gIHByaXZhdGUgZG9jUmVmOiBEb2N1bWVudDtcblxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2Fyb3VzZWxTZXJ2aWNlOiBDYXJvdXNlbFNlcnZpY2UsXG4gICAgICAgICAgICAgIEBJbmplY3QoV0lORE9XKSB3aW5SZWY6IGFueSxcbiAgICAgICAgICAgICAgQEluamVjdChET0NVTUVOVCkgZG9jUmVmOiBhbnksXG4gICAgICAgICAgICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmVcbiAgKSB7XG4gICAgdGhpcy53aW5SZWYgPSB3aW5SZWYgYXMgV2luZG93O1xuICAgIHRoaXMuZG9jUmVmID0gZG9jUmVmIGFzIERvY3VtZW50O1xuICAgIHRoaXMuc3B5RGF0YVN0cmVhbXMoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuYXV0b3BsYXlTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZpbmVzIE9ic2VydmFibGVzIHdoaWNoIHNlcnZpY2UgbXVzdCBvYnNlcnZlXG4gICAqL1xuICBzcHlEYXRhU3RyZWFtcygpIHtcbiAgICBjb25zdCBpbml0aWFsaXplZENhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0SW5pdGlhbGl6ZWRTdGF0ZSgpLnBpcGUoXG4gICAgICB0YXAoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b3BsYXkpIHtcbiAgICAgICAgICB0aGlzLnBsYXkoKTtcblx0XHRcdFx0fVxuICAgICAgfSlcbiAgICApO1xuXG4gICAgY29uc3QgY2hhbmdlZFNldHRpbmdzJDogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0Q2hhbmdlZFN0YXRlKCkucGlwZShcbiAgICAgIHRhcChkYXRhID0+IHtcbiAgICAgICAgdGhpcy5faGFuZGxlQ2hhbmdlT2JzZXJ2YWJsZShkYXRhKTtcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIGNvbnN0IHJlc2l6ZWQkOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRSZXNpemVkU3RhdGUoKS5waXBlKFxuICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9wbGF5ICYmICF0aGlzLl9pc0F1dG9wbGF5U3RvcHBlZCkge1xuICAgICAgICAgIHRoaXMucGxheSgpO1xuXHRcdFx0XHR9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIClcblxuICAgIC8vIG9yaWdpbmFsIEF1dG9wbGF5IFBsdWdpbiBoYXMgbGlzdGVuZXJzIG9uIHBsYXkub3dsLmNvcmUgYW5kIHN0b3Aub3dsLmNvcmUgZXZlbnRzLlxuICAgIC8vIFRoZXkgYXJlIHRyaWdnZXJlZCBieSBWaWRlbyBQbHVnaW5cblxuICAgIGNvbnN0IGF1dG9wbGF5TWVyZ2UkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSBtZXJnZShpbml0aWFsaXplZENhcm91c2VsJCwgY2hhbmdlZFNldHRpbmdzJCwgcmVzaXplZCQpO1xuICAgIHRoaXMuYXV0b3BsYXlTdWJzY3JpcHRpb24gPSBhdXRvcGxheU1lcmdlJC5zdWJzY3JpYmUoXG4gICAgICAoKSA9PiB7fVxuICAgICk7XG4gIH1cblxuICAvKipcblx0ICogU3RhcnRzIHRoZSBhdXRvcGxheS5cblx0ICogQHBhcmFtIHRpbWVvdXQgVGhlIGludGVydmFsIGJlZm9yZSB0aGUgbmV4dCBhbmltYXRpb24gc3RhcnRzLlxuXHQgKiBAcGFyYW0gc3BlZWQgVGhlIGFuaW1hdGlvbiBzcGVlZCBmb3IgdGhlIGFuaW1hdGlvbnMuXG5cdCAqL1xuXHRwbGF5KHRpbWVvdXQ/OiBudW1iZXIsIHNwZWVkPzogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuX3BhdXNlZCkge1xuXHRcdFx0dGhpcy5fcGF1c2VkID0gZmFsc2U7XG5cdFx0XHR0aGlzLl9zZXRBdXRvUGxheUludGVydmFsKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9wbGF5TW91c2VsZWF2ZVRpbWVvdXQpO1xuICAgIH1cblxuXHRcdGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5pcygncm90YXRpbmcnKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmVudGVyKCdyb3RhdGluZycpO1xuXG5cdFx0dGhpcy5fc2V0QXV0b1BsYXlJbnRlcnZhbCgpO1xuICB9O1xuXG4gIC8qKlxuXHQgKiBHZXRzIGEgbmV3IHRpbWVvdXRcblx0ICogQHBhcmFtIHRpbWVvdXQgLSBUaGUgaW50ZXJ2YWwgYmVmb3JlIHRoZSBuZXh0IGFuaW1hdGlvbiBzdGFydHMuXG5cdCAqIEBwYXJhbSBzcGVlZCAtIFRoZSBhbmltYXRpb24gc3BlZWQgZm9yIHRoZSBhbmltYXRpb25zLlxuXHQgKiBAcmV0dXJuXG5cdCAqL1xuXHRwcml2YXRlIF9nZXROZXh0VGltZW91dCh0aW1lb3V0PzogbnVtYmVyLCBzcGVlZD86IG51bWJlcik6IG51bWJlciB7XG5cdFx0aWYgKCB0aGlzLl90aW1lb3V0ICkge1xuXHRcdFx0dGhpcy53aW5SZWYuY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVvdXQpO1xuICAgIH1cblxuICAgIHRoaXMuX2lzQXJ0aWZpY2lhbEF1dG9wbGF5VGltZW91dCA9IHRpbWVvdXQgPyB0cnVlIDogZmFsc2U7XG5cblx0XHRyZXR1cm4gdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMud2luUmVmLnNldFRpbWVvdXQoKCkgPT57XG4gICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuX3BhdXNlZCB8fCB0aGlzLmNhcm91c2VsU2VydmljZS5pcygnYnVzeScpIHx8IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmlzKCdpbnRlcmFjdGluZycpIHx8IHRoaXMuZG9jUmVmLmhpZGRlbikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmNhcm91c2VsU2VydmljZS5uZXh0KHNwZWVkIHx8IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9wbGF5U3BlZWQpO1xuICAgICAgICB9KTtcbiAgICAgIH0sIHRpbWVvdXQgfHwgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b3BsYXlUaW1lb3V0KTtcbiAgICB9KTtcblxuICB9O1xuXG4gIC8qKlxuXHQgKiBTZXRzIGF1dG9wbGF5IGluIG1vdGlvbi5cblx0ICovXG4gIHByaXZhdGUgX3NldEF1dG9QbGF5SW50ZXJ2YWwodGltZW91dD86IG51bWJlcikge1xuXHRcdHRoaXMuX3RpbWVvdXQgPSB0aGlzLl9nZXROZXh0VGltZW91dCh0aW1lb3V0KTtcblx0fTtcblxuXHQvKipcblx0ICogU3RvcHMgdGhlIGF1dG9wbGF5LlxuXHQgKi9cblx0c3RvcCgpIHtcblx0XHRpZiAoIXRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmlzKCdyb3RhdGluZycpKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuICAgIHRoaXMuX3BhdXNlZCA9IHRydWU7XG5cblx0XHR0aGlzLndpblJlZi5jbGVhclRpbWVvdXQodGhpcy5fdGltZW91dCk7XG5cdFx0dGhpcy5jYXJvdXNlbFNlcnZpY2UubGVhdmUoJ3JvdGF0aW5nJyk7XG4gIH07XG5cbiAgLyoqXG5cdCAqIFN0b3BzIHRoZSBhdXRvcGxheS5cblx0ICovXG5cdHBhdXNlKCkge1xuXHRcdGlmICghdGhpcy5jYXJvdXNlbFNlcnZpY2UuaXMoJ3JvdGF0aW5nJykpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR0aGlzLl9wYXVzZWQgPSB0cnVlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBNYW5hZ2VzIGJ5IGF1dG9wbGF5aW5nIGFjY29yZGluZyB0byBkYXRhIHBhc3NlZCBieSBfY2hhbmdlZFNldHRpbmdzQ2Fyb3VzZWwkIE9ic2FydmFibGVcbiAgICogQHBhcmFtIGRhdGEgb2JqZWN0IHdpdGggY3VycmVudCBwb3NpdGlvbiBvZiBjYXJvdXNlbCBhbmQgdHlwZSBvZiBjaGFuZ2VcbiAgICovXG4gIHByaXZhdGUgX2hhbmRsZUNoYW5nZU9ic2VydmFibGUoZGF0YTogYW55KSB7XG4gICAgaWYgKGRhdGEucHJvcGVydHkubmFtZSA9PT0gJ3NldHRpbmdzJykge1xuICAgICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9wbGF5KSB7XG4gICAgICAgIHRoaXMucGxheSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zdG9wKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChkYXRhLnByb3BlcnR5Lm5hbWUgPT09ICdwb3NpdGlvbicpIHtcbiAgICAgIC8vY29uc29sZS5sb2coJ3BsYXk/JywgZSk7XG4gICAgICBpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b3BsYXkpIHtcbiAgICAgICAgdGhpcy5fc2V0QXV0b1BsYXlJbnRlcnZhbCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydHMgYXV0b3BsYXlpbmcgb2YgdGhlIGNhcm91c2VsIGluIHRoZSBjYXNlIHdoZW4gdXNlciBsZWF2ZXMgdGhlIGNhcm91c2VsIGJlZm9yZSBpdCBzdGFydHMgdHJhbnNsYXRlaW5nIChtb3ZpbmcpXG4gICAqL1xuICBwcml2YXRlIF9wbGF5QWZ0ZXJUcmFuc2xhdGVkKCkge1xuICAgIG9mKCd0cmFuc2xhdGVkJykucGlwZShcbiAgICAgIHN3aXRjaE1hcChkYXRhID0+IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldFRyYW5zbGF0ZWRTdGF0ZSgpKSxcbiAgICAgIGZpcnN0KCksXG4gICAgICBmaWx0ZXIoKCkgPT4gdGhpcy5faXNBcnRpZmljaWFsQXV0b3BsYXlUaW1lb3V0KSxcbiAgICAgIHRhcCgoKSA9PiB0aGlzLl9zZXRBdXRvUGxheUludGVydmFsKCkpXG4gICAgKS5zdWJzY3JpYmUoKCkgPT4geyB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydHMgcGF1c2luZ1xuICAgKi9cbiAgc3RhcnRQYXVzaW5nKCkge1xuICAgIGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hdXRvcGxheUhvdmVyUGF1c2UgJiYgdGhpcy5jYXJvdXNlbFNlcnZpY2UuaXMoJ3JvdGF0aW5nJykpIHtcbiAgICAgIHRoaXMucGF1c2UoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3RhcnRzIHBsYXlpbmcgYWZ0ZXIgbW91c2UgbGVhdmVzIGNhcm91c2VsXG4gICAqL1xuICBzdGFydFBsYXlpbmdNb3VzZUxlYXZlKCkge1xuICAgIGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hdXRvcGxheUhvdmVyUGF1c2UgJiYgdGhpcy5jYXJvdXNlbFNlcnZpY2UuaXMoJ3JvdGF0aW5nJykpIHtcbiAgICAgIHRoaXMucGxheSgpO1xuICAgICAgdGhpcy5fcGxheUFmdGVyVHJhbnNsYXRlZCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydHMgcGxheWluZyBhZnRlciB0b3VjaCBlbmRzXG4gICAqL1xuICBzdGFydFBsYXlpbmdUb3VjaEVuZCgpIHtcbiAgICBpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b3BsYXlIb3ZlclBhdXNlICYmIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmlzKCdyb3RhdGluZycpKSB7XG4gICAgICB0aGlzLnBsYXkoKTtcbiAgICAgIHRoaXMuX3BsYXlBZnRlclRyYW5zbGF0ZWQoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==