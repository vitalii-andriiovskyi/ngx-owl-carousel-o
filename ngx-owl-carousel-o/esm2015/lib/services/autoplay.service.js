import { Injectable, Inject } from '@angular/core';
import { merge, of } from 'rxjs';
import { tap, switchMap, first, filter } from 'rxjs/operators';
import { CarouselService } from './carousel.service';
import { WINDOW } from './window-ref.service';
import { DOCUMENT } from './document-ref.service';
export class AutoplayService {
    constructor(carouselService, winRef, docRef) {
        this.carouselService = carouselService;
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
        return this.winRef.setTimeout(() => {
            if (this._paused || this.carouselService.is('busy') || this.carouselService.is('interacting') || this.docRef.hidden) {
                return;
            }
            this.carouselService.next(speed || this.carouselService.settings.autoplaySpeed);
        }, timeout || this.carouselService.settings.autoplayTimeout);
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
AutoplayService.decorators = [
    { type: Injectable }
];
AutoplayService.ctorParameters = () => [
    { type: CarouselService },
    { type: undefined, decorators: [{ type: Inject, args: [WINDOW,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b3BsYXkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi9saWJzL25neC1vd2wtY2Fyb3VzZWwtby9zcmMvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvYXV0b3BsYXkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQTRCLEtBQUssRUFBRSxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0QsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRS9ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBR2xELE1BQU0sT0FBTyxlQUFlO0lBcUMxQixZQUFvQixlQUFnQyxFQUN4QixNQUFXLEVBQ1QsTUFBVztRQUZyQixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUEvQnBEOztXQUVHO1FBQ0ssYUFBUSxHQUFXLElBQUksQ0FBQztRQUVoQzs7V0FFRztRQUNLLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFPeEI7OztXQUdHO1FBQ0ssdUJBQWtCLEdBQUcsS0FBSyxDQUFDO1FBZ0JqQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQWdCLENBQUM7UUFDL0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFrQixDQUFDO1FBQ2pDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBbEJELElBQUksaUJBQWlCO1FBQ25CLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDO0lBQ2pDLENBQUM7SUFDRCxJQUFJLGlCQUFpQixDQUFDLEtBQUs7UUFDekIsSUFBSSxDQUFDLGtCQUFrQixH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SUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDM0YsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ1osSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7U0FDN0I7SUFDSCxDQUFDOzs7WUExTkYsVUFBVTs7O1lBSkYsZUFBZTs0Q0EyQ1QsTUFBTSxTQUFDLE1BQU07NENBQ2IsTUFBTSxTQUFDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBPYnNlcnZhYmxlLCBtZXJnZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRhcCwgc3dpdGNoTWFwLCBmaXJzdCwgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBDYXJvdXNlbFNlcnZpY2UgfSBmcm9tICcuL2Nhcm91c2VsLnNlcnZpY2UnO1xuaW1wb3J0IHsgV0lORE9XIH0gZnJvbSAnLi93aW5kb3ctcmVmLnNlcnZpY2UnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICcuL2RvY3VtZW50LXJlZi5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEF1dG9wbGF5U2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveXtcbiAgLyoqXG4gICAqIFN1YnNjcmlvcHRpb24gdG8gbWVyZ2UgT2JzZXJ2YWJsZXMgZnJvbSBDYXJvdXNlbFNlcnZpY2VcbiAgICovXG4gIGF1dG9wbGF5U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLyoqXG4gICAqIFRoZSBhdXRvcGxheSB0aW1lb3V0LlxuICAgKi9cbiAgcHJpdmF0ZSBfdGltZW91dDogbnVtYmVyID0gbnVsbDtcblxuICAvKipcbiAgICogSW5kaWNhdGVzIHdoZW5ldmVyIHRoZSBhdXRvcGxheSBpcyBwYXVzZWQuXG4gICAqL1xuICBwcml2YXRlIF9wYXVzZWQgPSBmYWxzZTtcblxuICAvKipcbiAgICogU2hvd3Mgd2hldGhlciB0aGUgY29kZSAodGhlIHBsdWdpbikgY2hhbmdlZCB0aGUgb3B0aW9uICdBdXRvcGxheVRpbWVvdXQnIGZvciBvd24gbmVlZHNcbiAgICovXG4gIHByaXZhdGUgX2lzQXJ0aWZpY2lhbEF1dG9wbGF5VGltZW91dDogYm9vbGVhbjtcblxuICAvKipcbiAgICogU2hvd3Mgd2hldGhlciB0aGUgYXV0b3BsYXkgaXMgcGF1c2VkIGZvciB1bmxpbWl0ZWQgdGltZSBieSB0aGUgZGV2ZWxvcGVyLlxuICAgKiBVc2UgdG8gcHJldmVudCBhdXRvcGxheWluZyBpbiBjYXNlIG9mIGZpcmluZyBgbW91c2VsZWF2ZWAgYnkgYWRkaW5nIGxheWVycyB0byBgPGJvZHk+YCBsaWtlIGBtYXQtbWVudWAgZG9lc1xuICAgKi9cbiAgcHJpdmF0ZSBfaXNBdXRvcGxheVN0b3BwZWQgPSBmYWxzZTtcbiAgZ2V0IGlzQXV0b3BsYXlTdG9wcGVkKCkge1xuICAgIHJldHVybiB0aGlzLl9pc0F1dG9wbGF5U3RvcHBlZDtcbiAgfVxuICBzZXQgaXNBdXRvcGxheVN0b3BwZWQodmFsdWUpIHtcbiAgICB0aGlzLl9pc0F1dG9wbGF5U3RvcHBlZCA9IHZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSB3aW5SZWY6IFdpbmRvdztcbiAgcHJpdmF0ZSBkb2NSZWY6IERvY3VtZW50O1xuXG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjYXJvdXNlbFNlcnZpY2U6IENhcm91c2VsU2VydmljZSxcbiAgICAgICAgICAgICAgQEluamVjdChXSU5ET1cpIHdpblJlZjogYW55LFxuICAgICAgICAgICAgICBASW5qZWN0KERPQ1VNRU5UKSBkb2NSZWY6IGFueSxcbiAgKSB7XG4gICAgdGhpcy53aW5SZWYgPSB3aW5SZWYgYXMgV2luZG93O1xuICAgIHRoaXMuZG9jUmVmID0gZG9jUmVmIGFzIERvY3VtZW50O1xuICAgIHRoaXMuc3B5RGF0YVN0cmVhbXMoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuYXV0b3BsYXlTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZpbmVzIE9ic2VydmFibGVzIHdoaWNoIHNlcnZpY2UgbXVzdCBvYnNlcnZlXG4gICAqL1xuICBzcHlEYXRhU3RyZWFtcygpIHtcbiAgICBjb25zdCBpbml0aWFsaXplZENhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0SW5pdGlhbGl6ZWRTdGF0ZSgpLnBpcGUoXG4gICAgICB0YXAoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b3BsYXkpIHtcbiAgICAgICAgICB0aGlzLnBsYXkoKTtcblx0XHRcdFx0fVxuICAgICAgfSlcbiAgICApO1xuXG4gICAgY29uc3QgY2hhbmdlZFNldHRpbmdzJDogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0Q2hhbmdlZFN0YXRlKCkucGlwZShcbiAgICAgIHRhcChkYXRhID0+IHtcbiAgICAgICAgdGhpcy5faGFuZGxlQ2hhbmdlT2JzZXJ2YWJsZShkYXRhKTtcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIGNvbnN0IHJlc2l6ZWQkOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRSZXNpemVkU3RhdGUoKS5waXBlKFxuICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9wbGF5ICYmICF0aGlzLl9pc0F1dG9wbGF5U3RvcHBlZCkge1xuICAgICAgICAgIHRoaXMucGxheSgpO1xuXHRcdFx0XHR9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIClcblxuICAgIC8vIG9yaWdpbmFsIEF1dG9wbGF5IFBsdWdpbiBoYXMgbGlzdGVuZXJzIG9uIHBsYXkub3dsLmNvcmUgYW5kIHN0b3Aub3dsLmNvcmUgZXZlbnRzLlxuICAgIC8vIFRoZXkgYXJlIHRyaWdnZXJlZCBieSBWaWRlbyBQbHVnaW5cblxuICAgIGNvbnN0IGF1dG9wbGF5TWVyZ2UkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSBtZXJnZShpbml0aWFsaXplZENhcm91c2VsJCwgY2hhbmdlZFNldHRpbmdzJCwgcmVzaXplZCQpO1xuICAgIHRoaXMuYXV0b3BsYXlTdWJzY3JpcHRpb24gPSBhdXRvcGxheU1lcmdlJC5zdWJzY3JpYmUoXG4gICAgICAoKSA9PiB7fVxuICAgICk7XG4gIH1cblxuICAvKipcblx0ICogU3RhcnRzIHRoZSBhdXRvcGxheS5cblx0ICogQHBhcmFtIHRpbWVvdXQgVGhlIGludGVydmFsIGJlZm9yZSB0aGUgbmV4dCBhbmltYXRpb24gc3RhcnRzLlxuXHQgKiBAcGFyYW0gc3BlZWQgVGhlIGFuaW1hdGlvbiBzcGVlZCBmb3IgdGhlIGFuaW1hdGlvbnMuXG5cdCAqL1xuXHRwbGF5KHRpbWVvdXQ/OiBudW1iZXIsIHNwZWVkPzogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuX3BhdXNlZCkge1xuXHRcdFx0dGhpcy5fcGF1c2VkID0gZmFsc2U7XG5cdFx0XHR0aGlzLl9zZXRBdXRvUGxheUludGVydmFsKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9wbGF5TW91c2VsZWF2ZVRpbWVvdXQpO1xuICAgIH1cblxuXHRcdGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5pcygncm90YXRpbmcnKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmVudGVyKCdyb3RhdGluZycpO1xuXG5cdFx0dGhpcy5fc2V0QXV0b1BsYXlJbnRlcnZhbCgpO1xuICB9O1xuXG4gIC8qKlxuXHQgKiBHZXRzIGEgbmV3IHRpbWVvdXRcblx0ICogQHBhcmFtIHRpbWVvdXQgLSBUaGUgaW50ZXJ2YWwgYmVmb3JlIHRoZSBuZXh0IGFuaW1hdGlvbiBzdGFydHMuXG5cdCAqIEBwYXJhbSBzcGVlZCAtIFRoZSBhbmltYXRpb24gc3BlZWQgZm9yIHRoZSBhbmltYXRpb25zLlxuXHQgKiBAcmV0dXJuXG5cdCAqL1xuXHRwcml2YXRlIF9nZXROZXh0VGltZW91dCh0aW1lb3V0PzogbnVtYmVyLCBzcGVlZD86IG51bWJlcik6IG51bWJlciB7XG5cdFx0aWYgKCB0aGlzLl90aW1lb3V0ICkge1xuXHRcdFx0dGhpcy53aW5SZWYuY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVvdXQpO1xuICAgIH1cblxuICAgIHRoaXMuX2lzQXJ0aWZpY2lhbEF1dG9wbGF5VGltZW91dCA9IHRpbWVvdXQgPyB0cnVlIDogZmFsc2U7XG5cblx0XHRyZXR1cm4gdGhpcy53aW5SZWYuc2V0VGltZW91dCgoKSA9PntcbiAgICAgIGlmICh0aGlzLl9wYXVzZWQgfHwgdGhpcy5jYXJvdXNlbFNlcnZpY2UuaXMoJ2J1c3knKSB8fCB0aGlzLmNhcm91c2VsU2VydmljZS5pcygnaW50ZXJhY3RpbmcnKSB8fCB0aGlzLmRvY1JlZi5oaWRkZW4pIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5jYXJvdXNlbFNlcnZpY2UubmV4dChzcGVlZCB8fCB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hdXRvcGxheVNwZWVkKTtcbiAgICB9LCB0aW1lb3V0IHx8IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9wbGF5VGltZW91dCk7XG4gIH07XG5cbiAgLyoqXG5cdCAqIFNldHMgYXV0b3BsYXkgaW4gbW90aW9uLlxuXHQgKi9cbiAgcHJpdmF0ZSBfc2V0QXV0b1BsYXlJbnRlcnZhbCh0aW1lb3V0PzogbnVtYmVyKSB7XG5cdFx0dGhpcy5fdGltZW91dCA9IHRoaXMuX2dldE5leHRUaW1lb3V0KHRpbWVvdXQpO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBTdG9wcyB0aGUgYXV0b3BsYXkuXG5cdCAqL1xuXHRzdG9wKCkge1xuXHRcdGlmICghdGhpcy5jYXJvdXNlbFNlcnZpY2UuaXMoJ3JvdGF0aW5nJykpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG4gICAgdGhpcy5fcGF1c2VkID0gdHJ1ZTtcblxuXHRcdHRoaXMud2luUmVmLmNsZWFyVGltZW91dCh0aGlzLl90aW1lb3V0KTtcblx0XHR0aGlzLmNhcm91c2VsU2VydmljZS5sZWF2ZSgncm90YXRpbmcnKTtcbiAgfTtcblxuICAvKipcblx0ICogU3RvcHMgdGhlIGF1dG9wbGF5LlxuXHQgKi9cblx0cGF1c2UoKSB7XG5cdFx0aWYgKCF0aGlzLmNhcm91c2VsU2VydmljZS5pcygncm90YXRpbmcnKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHRoaXMuX3BhdXNlZCA9IHRydWU7XG4gIH07XG5cbiAgLyoqXG4gICAqIE1hbmFnZXMgYnkgYXV0b3BsYXlpbmcgYWNjb3JkaW5nIHRvIGRhdGEgcGFzc2VkIGJ5IF9jaGFuZ2VkU2V0dGluZ3NDYXJvdXNlbCQgT2JzYXJ2YWJsZVxuICAgKiBAcGFyYW0gZGF0YSBvYmplY3Qgd2l0aCBjdXJyZW50IHBvc2l0aW9uIG9mIGNhcm91c2VsIGFuZCB0eXBlIG9mIGNoYW5nZVxuICAgKi9cbiAgcHJpdmF0ZSBfaGFuZGxlQ2hhbmdlT2JzZXJ2YWJsZShkYXRhOiBhbnkpIHtcbiAgICBpZiAoZGF0YS5wcm9wZXJ0eS5uYW1lID09PSAnc2V0dGluZ3MnKSB7XG4gICAgICBpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b3BsYXkpIHtcbiAgICAgICAgdGhpcy5wbGF5KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnN0b3AoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGRhdGEucHJvcGVydHkubmFtZSA9PT0gJ3Bvc2l0aW9uJykge1xuICAgICAgLy9jb25zb2xlLmxvZygncGxheT8nLCBlKTtcbiAgICAgIGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hdXRvcGxheSkge1xuICAgICAgICB0aGlzLl9zZXRBdXRvUGxheUludGVydmFsKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0cyBhdXRvcGxheWluZyBvZiB0aGUgY2Fyb3VzZWwgaW4gdGhlIGNhc2Ugd2hlbiB1c2VyIGxlYXZlcyB0aGUgY2Fyb3VzZWwgYmVmb3JlIGl0IHN0YXJ0cyB0cmFuc2xhdGVpbmcgKG1vdmluZylcbiAgICovXG4gIHByaXZhdGUgX3BsYXlBZnRlclRyYW5zbGF0ZWQoKSB7XG4gICAgb2YoJ3RyYW5zbGF0ZWQnKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKGRhdGEgPT4gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0VHJhbnNsYXRlZFN0YXRlKCkpLFxuICAgICAgZmlyc3QoKSxcbiAgICAgIGZpbHRlcigoKSA9PiB0aGlzLl9pc0FydGlmaWNpYWxBdXRvcGxheVRpbWVvdXQpLFxuICAgICAgdGFwKCgpID0+IHRoaXMuX3NldEF1dG9QbGF5SW50ZXJ2YWwoKSlcbiAgICApLnN1YnNjcmliZSgoKSA9PiB7IH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0cyBwYXVzaW5nXG4gICAqL1xuICBzdGFydFBhdXNpbmcoKSB7XG4gICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9wbGF5SG92ZXJQYXVzZSAmJiB0aGlzLmNhcm91c2VsU2VydmljZS5pcygncm90YXRpbmcnKSkge1xuICAgICAgdGhpcy5wYXVzZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydHMgcGxheWluZyBhZnRlciBtb3VzZSBsZWF2ZXMgY2Fyb3VzZWxcbiAgICovXG4gIHN0YXJ0UGxheWluZ01vdXNlTGVhdmUoKSB7XG4gICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9wbGF5SG92ZXJQYXVzZSAmJiB0aGlzLmNhcm91c2VsU2VydmljZS5pcygncm90YXRpbmcnKSkge1xuICAgICAgdGhpcy5wbGF5KCk7XG4gICAgICB0aGlzLl9wbGF5QWZ0ZXJUcmFuc2xhdGVkKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0cyBwbGF5aW5nIGFmdGVyIHRvdWNoIGVuZHNcbiAgICovXG4gIHN0YXJ0UGxheWluZ1RvdWNoRW5kKCkge1xuICAgIGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hdXRvcGxheUhvdmVyUGF1c2UgJiYgdGhpcy5jYXJvdXNlbFNlcnZpY2UuaXMoJ3JvdGF0aW5nJykpIHtcbiAgICAgIHRoaXMucGxheSgpO1xuICAgICAgdGhpcy5fcGxheUFmdGVyVHJhbnNsYXRlZCgpO1xuICAgIH1cbiAgfVxufVxuIl19