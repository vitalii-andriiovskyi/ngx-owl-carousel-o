import { Injectable, Inject } from '@angular/core';
import { merge, of } from 'rxjs';
import { tap, switchMap, first, filter } from 'rxjs/operators';
import { WINDOW } from './window-ref.service';
import { DOCUMENT } from './document-ref.service';
import * as i0 from "@angular/core";
import * as i1 from "./carousel.service";
export class AutoplayService {
    carouselService;
    ngZone;
    /**
     * Subscrioption to merge Observables from CarouselService
     */
    autoplaySubscription;
    /**
     * The autoplay timeout.
     */
    _timeout = null;
    /**
     * Indicates whenever the autoplay is paused.
     */
    _paused = false;
    /**
     * Shows whether the code (the plugin) changed the option 'AutoplayTimeout' for own needs
     */
    _isArtificialAutoplayTimeout;
    /**
     * Shows whether the autoplay is paused for unlimited time by the developer.
     * Use to prevent autoplaying in case of firing `mouseleave` by adding layers to `<body>` like `mat-menu` does
     */
    _isAutoplayStopped = false;
    get isAutoplayStopped() {
        return this._isAutoplayStopped;
    }
    set isAutoplayStopped(value) {
        this._isAutoplayStopped = value;
    }
    winRef;
    docRef;
    constructor(carouselService, winRef, docRef, ngZone) {
        this.carouselService = carouselService;
        this.ngZone = ngZone;
        this.winRef = winRef;
        this.docRef = docRef;
        this.spyDataStreams();
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: AutoplayService, deps: [{ token: i1.CarouselService }, { token: WINDOW }, { token: DOCUMENT }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: AutoplayService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: AutoplayService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i1.CarouselService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [WINDOW]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.NgZone }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b3BsYXkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYnMvbmd4LW93bC1jYXJvdXNlbC1vL3NyYy9saWIvc2VydmljZXMvYXV0b3BsYXkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDdEUsT0FBTyxFQUE0QixLQUFLLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNELE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUcvRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHdCQUF3QixDQUFDOzs7QUFHbEQsTUFBTSxPQUFPLGVBQWU7SUFxQ047SUFHQTtJQXZDcEI7O09BRUc7SUFDSCxvQkFBb0IsQ0FBZTtJQUVuQzs7T0FFRztJQUNLLFFBQVEsR0FBVyxJQUFJLENBQUM7SUFFaEM7O09BRUc7SUFDSyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBRXhCOztPQUVHO0lBQ0ssNEJBQTRCLENBQVU7SUFFOUM7OztPQUdHO0lBQ0ssa0JBQWtCLEdBQUcsS0FBSyxDQUFDO0lBQ25DLElBQUksaUJBQWlCO1FBQ25CLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDO0lBQ2pDLENBQUM7SUFDRCxJQUFJLGlCQUFpQixDQUFDLEtBQUs7UUFDekIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztJQUNsQyxDQUFDO0lBRU8sTUFBTSxDQUFTO0lBQ2YsTUFBTSxDQUFXO0lBR3pCLFlBQW9CLGVBQWdDLEVBQ3hCLE1BQVcsRUFDVCxNQUFXLEVBQ3JCLE1BQWM7UUFIZCxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFHaEMsV0FBTSxHQUFOLE1B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QUFDLGtCQUFrQixJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7WUFDNUYsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2YsQ0FBQztJQUNILENBQUM7SUFFRDs7T0FFRztJQUNILHNCQUFzQjtRQUNwQixJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLGtCQUFrQixJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7WUFDNUYsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ1osSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDOUIsQ0FBQztJQUNILENBQUM7SUFFRDs7T0FFRztJQUNILG9CQUFvQjtRQUNsQixJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLGtCQUFrQixJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7WUFDNUYsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ1osSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDOUIsQ0FBQztJQUNILENBQUM7dUdBL05VLGVBQWUsaURBc0NOLE1BQU0sYUFDTixRQUFROzJHQXZDakIsZUFBZTs7MkZBQWYsZUFBZTtrQkFEM0IsVUFBVTs7MEJBdUNJLE1BQU07MkJBQUMsTUFBTTs7MEJBQ2IsTUFBTTsyQkFBQyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBPbkRlc3Ryb3ksIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBPYnNlcnZhYmxlLCBtZXJnZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRhcCwgc3dpdGNoTWFwLCBmaXJzdCwgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBDYXJvdXNlbFNlcnZpY2UgfSBmcm9tICcuL2Nhcm91c2VsLnNlcnZpY2UnO1xuaW1wb3J0IHsgV0lORE9XIH0gZnJvbSAnLi93aW5kb3ctcmVmLnNlcnZpY2UnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICcuL2RvY3VtZW50LXJlZi5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEF1dG9wbGF5U2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveXtcbiAgLyoqXG4gICAqIFN1YnNjcmlvcHRpb24gdG8gbWVyZ2UgT2JzZXJ2YWJsZXMgZnJvbSBDYXJvdXNlbFNlcnZpY2VcbiAgICovXG4gIGF1dG9wbGF5U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLyoqXG4gICAqIFRoZSBhdXRvcGxheSB0aW1lb3V0LlxuICAgKi9cbiAgcHJpdmF0ZSBfdGltZW91dDogbnVtYmVyID0gbnVsbDtcblxuICAvKipcbiAgICogSW5kaWNhdGVzIHdoZW5ldmVyIHRoZSBhdXRvcGxheSBpcyBwYXVzZWQuXG4gICAqL1xuICBwcml2YXRlIF9wYXVzZWQgPSBmYWxzZTtcblxuICAvKipcbiAgICogU2hvd3Mgd2hldGhlciB0aGUgY29kZSAodGhlIHBsdWdpbikgY2hhbmdlZCB0aGUgb3B0aW9uICdBdXRvcGxheVRpbWVvdXQnIGZvciBvd24gbmVlZHNcbiAgICovXG4gIHByaXZhdGUgX2lzQXJ0aWZpY2lhbEF1dG9wbGF5VGltZW91dDogYm9vbGVhbjtcblxuICAvKipcbiAgICogU2hvd3Mgd2hldGhlciB0aGUgYXV0b3BsYXkgaXMgcGF1c2VkIGZvciB1bmxpbWl0ZWQgdGltZSBieSB0aGUgZGV2ZWxvcGVyLlxuICAgKiBVc2UgdG8gcHJldmVudCBhdXRvcGxheWluZyBpbiBjYXNlIG9mIGZpcmluZyBgbW91c2VsZWF2ZWAgYnkgYWRkaW5nIGxheWVycyB0byBgPGJvZHk+YCBsaWtlIGBtYXQtbWVudWAgZG9lc1xuICAgKi9cbiAgcHJpdmF0ZSBfaXNBdXRvcGxheVN0b3BwZWQgPSBmYWxzZTtcbiAgZ2V0IGlzQXV0b3BsYXlTdG9wcGVkKCkge1xuICAgIHJldHVybiB0aGlzLl9pc0F1dG9wbGF5U3RvcHBlZDtcbiAgfVxuICBzZXQgaXNBdXRvcGxheVN0b3BwZWQodmFsdWUpIHtcbiAgICB0aGlzLl9pc0F1dG9wbGF5U3RvcHBlZCA9IHZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSB3aW5SZWY6IFdpbmRvdztcbiAgcHJpdmF0ZSBkb2NSZWY6IERvY3VtZW50O1xuXG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjYXJvdXNlbFNlcnZpY2U6IENhcm91c2VsU2VydmljZSxcbiAgICAgICAgICAgICAgQEluamVjdChXSU5ET1cpIHdpblJlZjogYW55LFxuICAgICAgICAgICAgICBASW5qZWN0KERPQ1VNRU5UKSBkb2NSZWY6IGFueSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZVxuICApIHtcbiAgICB0aGlzLndpblJlZiA9IHdpblJlZiBhcyBXaW5kb3c7XG4gICAgdGhpcy5kb2NSZWYgPSBkb2NSZWYgYXMgRG9jdW1lbnQ7XG4gICAgdGhpcy5zcHlEYXRhU3RyZWFtcygpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5hdXRvcGxheVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlZmluZXMgT2JzZXJ2YWJsZXMgd2hpY2ggc2VydmljZSBtdXN0IG9ic2VydmVcbiAgICovXG4gIHNweURhdGFTdHJlYW1zKCkge1xuICAgIGNvbnN0IGluaXRpYWxpemVkQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRJbml0aWFsaXplZFN0YXRlKCkucGlwZShcbiAgICAgIHRhcCgoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hdXRvcGxheSkge1xuICAgICAgICAgIHRoaXMucGxheSgpO1xuXHRcdFx0XHR9XG4gICAgICB9KVxuICAgICk7XG5cbiAgICBjb25zdCBjaGFuZ2VkU2V0dGluZ3MkOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRDaGFuZ2VkU3RhdGUoKS5waXBlKFxuICAgICAgdGFwKGRhdGEgPT4ge1xuICAgICAgICB0aGlzLl9oYW5kbGVDaGFuZ2VPYnNlcnZhYmxlKGRhdGEpO1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgY29uc3QgcmVzaXplZCQ6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldFJlc2l6ZWRTdGF0ZSgpLnBpcGUoXG4gICAgICB0YXAoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b3BsYXkgJiYgIXRoaXMuX2lzQXV0b3BsYXlTdG9wcGVkKSB7XG4gICAgICAgICAgdGhpcy5wbGF5KCk7XG5cdFx0XHRcdH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zdG9wKCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKVxuXG4gICAgLy8gb3JpZ2luYWwgQXV0b3BsYXkgUGx1Z2luIGhhcyBsaXN0ZW5lcnMgb24gcGxheS5vd2wuY29yZSBhbmQgc3RvcC5vd2wuY29yZSBldmVudHMuXG4gICAgLy8gVGhleSBhcmUgdHJpZ2dlcmVkIGJ5IFZpZGVvIFBsdWdpblxuXG4gICAgY29uc3QgYXV0b3BsYXlNZXJnZSQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IG1lcmdlKGluaXRpYWxpemVkQ2Fyb3VzZWwkLCBjaGFuZ2VkU2V0dGluZ3MkLCByZXNpemVkJCk7XG4gICAgdGhpcy5hdXRvcGxheVN1YnNjcmlwdGlvbiA9IGF1dG9wbGF5TWVyZ2UkLnN1YnNjcmliZShcbiAgICAgICgpID0+IHt9XG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuXHQgKiBTdGFydHMgdGhlIGF1dG9wbGF5LlxuXHQgKiBAcGFyYW0gdGltZW91dCBUaGUgaW50ZXJ2YWwgYmVmb3JlIHRoZSBuZXh0IGFuaW1hdGlvbiBzdGFydHMuXG5cdCAqIEBwYXJhbSBzcGVlZCBUaGUgYW5pbWF0aW9uIHNwZWVkIGZvciB0aGUgYW5pbWF0aW9ucy5cblx0ICovXG5cdHBsYXkodGltZW91dD86IG51bWJlciwgc3BlZWQ/OiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5fcGF1c2VkKSB7XG5cdFx0XHR0aGlzLl9wYXVzZWQgPSBmYWxzZTtcblx0XHRcdHRoaXMuX3NldEF1dG9QbGF5SW50ZXJ2YWwodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b3BsYXlNb3VzZWxlYXZlVGltZW91dCk7XG4gICAgfVxuXG5cdFx0aWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmlzKCdyb3RhdGluZycpKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UuZW50ZXIoJ3JvdGF0aW5nJyk7XG5cblx0XHR0aGlzLl9zZXRBdXRvUGxheUludGVydmFsKCk7XG4gIH07XG5cbiAgLyoqXG5cdCAqIEdldHMgYSBuZXcgdGltZW91dFxuXHQgKiBAcGFyYW0gdGltZW91dCAtIFRoZSBpbnRlcnZhbCBiZWZvcmUgdGhlIG5leHQgYW5pbWF0aW9uIHN0YXJ0cy5cblx0ICogQHBhcmFtIHNwZWVkIC0gVGhlIGFuaW1hdGlvbiBzcGVlZCBmb3IgdGhlIGFuaW1hdGlvbnMuXG5cdCAqIEByZXR1cm5cblx0ICovXG5cdHByaXZhdGUgX2dldE5leHRUaW1lb3V0KHRpbWVvdXQ/OiBudW1iZXIsIHNwZWVkPzogbnVtYmVyKTogbnVtYmVyIHtcblx0XHRpZiAoIHRoaXMuX3RpbWVvdXQgKSB7XG5cdFx0XHR0aGlzLndpblJlZi5jbGVhclRpbWVvdXQodGhpcy5fdGltZW91dCk7XG4gICAgfVxuXG4gICAgdGhpcy5faXNBcnRpZmljaWFsQXV0b3BsYXlUaW1lb3V0ID0gdGltZW91dCA/IHRydWUgOiBmYWxzZTtcblxuXHRcdHJldHVybiB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy53aW5SZWYuc2V0VGltZW91dCgoKSA9PntcbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5fcGF1c2VkIHx8IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmlzKCdidXN5JykgfHwgdGhpcy5jYXJvdXNlbFNlcnZpY2UuaXMoJ2ludGVyYWN0aW5nJykgfHwgdGhpcy5kb2NSZWYuaGlkZGVuKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm5leHQoc3BlZWQgfHwgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b3BsYXlTcGVlZCk7XG4gICAgICAgIH0pO1xuICAgICAgfSwgdGltZW91dCB8fCB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hdXRvcGxheVRpbWVvdXQpO1xuICAgIH0pO1xuXG4gIH07XG5cbiAgLyoqXG5cdCAqIFNldHMgYXV0b3BsYXkgaW4gbW90aW9uLlxuXHQgKi9cbiAgcHJpdmF0ZSBfc2V0QXV0b1BsYXlJbnRlcnZhbCh0aW1lb3V0PzogbnVtYmVyKSB7XG5cdFx0dGhpcy5fdGltZW91dCA9IHRoaXMuX2dldE5leHRUaW1lb3V0KHRpbWVvdXQpO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBTdG9wcyB0aGUgYXV0b3BsYXkuXG5cdCAqL1xuXHRzdG9wKCkge1xuXHRcdGlmICghdGhpcy5jYXJvdXNlbFNlcnZpY2UuaXMoJ3JvdGF0aW5nJykpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG4gICAgdGhpcy5fcGF1c2VkID0gdHJ1ZTtcblxuXHRcdHRoaXMud2luUmVmLmNsZWFyVGltZW91dCh0aGlzLl90aW1lb3V0KTtcblx0XHR0aGlzLmNhcm91c2VsU2VydmljZS5sZWF2ZSgncm90YXRpbmcnKTtcbiAgfTtcblxuICAvKipcblx0ICogU3RvcHMgdGhlIGF1dG9wbGF5LlxuXHQgKi9cblx0cGF1c2UoKSB7XG5cdFx0aWYgKCF0aGlzLmNhcm91c2VsU2VydmljZS5pcygncm90YXRpbmcnKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHRoaXMuX3BhdXNlZCA9IHRydWU7XG4gIH07XG5cbiAgLyoqXG4gICAqIE1hbmFnZXMgYnkgYXV0b3BsYXlpbmcgYWNjb3JkaW5nIHRvIGRhdGEgcGFzc2VkIGJ5IF9jaGFuZ2VkU2V0dGluZ3NDYXJvdXNlbCQgT2JzYXJ2YWJsZVxuICAgKiBAcGFyYW0gZGF0YSBvYmplY3Qgd2l0aCBjdXJyZW50IHBvc2l0aW9uIG9mIGNhcm91c2VsIGFuZCB0eXBlIG9mIGNoYW5nZVxuICAgKi9cbiAgcHJpdmF0ZSBfaGFuZGxlQ2hhbmdlT2JzZXJ2YWJsZShkYXRhOiBhbnkpIHtcbiAgICBpZiAoZGF0YS5wcm9wZXJ0eS5uYW1lID09PSAnc2V0dGluZ3MnKSB7XG4gICAgICBpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b3BsYXkpIHtcbiAgICAgICAgdGhpcy5wbGF5KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnN0b3AoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGRhdGEucHJvcGVydHkubmFtZSA9PT0gJ3Bvc2l0aW9uJykge1xuICAgICAgLy9jb25zb2xlLmxvZygncGxheT8nLCBlKTtcbiAgICAgIGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hdXRvcGxheSkge1xuICAgICAgICB0aGlzLl9zZXRBdXRvUGxheUludGVydmFsKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0cyBhdXRvcGxheWluZyBvZiB0aGUgY2Fyb3VzZWwgaW4gdGhlIGNhc2Ugd2hlbiB1c2VyIGxlYXZlcyB0aGUgY2Fyb3VzZWwgYmVmb3JlIGl0IHN0YXJ0cyB0cmFuc2xhdGVpbmcgKG1vdmluZylcbiAgICovXG4gIHByaXZhdGUgX3BsYXlBZnRlclRyYW5zbGF0ZWQoKSB7XG4gICAgb2YoJ3RyYW5zbGF0ZWQnKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKGRhdGEgPT4gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0VHJhbnNsYXRlZFN0YXRlKCkpLFxuICAgICAgZmlyc3QoKSxcbiAgICAgIGZpbHRlcigoKSA9PiB0aGlzLl9pc0FydGlmaWNpYWxBdXRvcGxheVRpbWVvdXQpLFxuICAgICAgdGFwKCgpID0+IHRoaXMuX3NldEF1dG9QbGF5SW50ZXJ2YWwoKSlcbiAgICApLnN1YnNjcmliZSgoKSA9PiB7IH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0cyBwYXVzaW5nXG4gICAqL1xuICBzdGFydFBhdXNpbmcoKSB7XG4gICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9wbGF5SG92ZXJQYXVzZSAmJiB0aGlzLmNhcm91c2VsU2VydmljZS5pcygncm90YXRpbmcnKSkge1xuICAgICAgdGhpcy5wYXVzZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydHMgcGxheWluZyBhZnRlciBtb3VzZSBsZWF2ZXMgY2Fyb3VzZWxcbiAgICovXG4gIHN0YXJ0UGxheWluZ01vdXNlTGVhdmUoKSB7XG4gICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9wbGF5SG92ZXJQYXVzZSAmJiB0aGlzLmNhcm91c2VsU2VydmljZS5pcygncm90YXRpbmcnKSkge1xuICAgICAgdGhpcy5wbGF5KCk7XG4gICAgICB0aGlzLl9wbGF5QWZ0ZXJUcmFuc2xhdGVkKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0cyBwbGF5aW5nIGFmdGVyIHRvdWNoIGVuZHNcbiAgICovXG4gIHN0YXJ0UGxheWluZ1RvdWNoRW5kKCkge1xuICAgIGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hdXRvcGxheUhvdmVyUGF1c2UgJiYgdGhpcy5jYXJvdXNlbFNlcnZpY2UuaXMoJ3JvdGF0aW5nJykpIHtcbiAgICAgIHRoaXMucGxheSgpO1xuICAgICAgdGhpcy5fcGxheUFmdGVyVHJhbnNsYXRlZCgpO1xuICAgIH1cbiAgfVxufVxuIl19