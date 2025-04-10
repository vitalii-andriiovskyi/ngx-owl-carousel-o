import { __decorate, __param } from "tslib";
import { Injectable, Inject } from '@angular/core';
import { merge, of } from 'rxjs';
import { tap, switchMap, first, filter } from 'rxjs/operators';
import { CarouselService } from './carousel.service';
import { WINDOW } from './window-ref.service';
import { DOCUMENT } from './document-ref.service';
let AutoplayService = class AutoplayService {
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
            if (this.carouselService.settings.autoplay) {
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
};
AutoplayService.ctorParameters = () => [
    { type: CarouselService },
    { type: undefined, decorators: [{ type: Inject, args: [WINDOW,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
AutoplayService = __decorate([
    Injectable(),
    __param(1, Inject(WINDOW)),
    __param(2, Inject(DOCUMENT))
], AutoplayService);
export { AutoplayService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b3BsYXkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vd2wtY2Fyb3VzZWwtby8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9hdXRvcGxheS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQTRCLEtBQUssRUFBRSxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0QsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRS9ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBR2xELElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWU7SUF3QjFCLFlBQW9CLGVBQWdDLEVBQ3hCLE1BQVcsRUFDVCxNQUFXO1FBRnJCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQWxCcEQ7O1dBRUc7UUFDSyxhQUFRLEdBQVcsSUFBSSxDQUFDO1FBRWhDOztXQUVHO1FBQ0ssWUFBTyxHQUFHLEtBQUssQ0FBQztRQWN0QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQWdCLENBQUM7UUFDL0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFrQixDQUFDO1FBQ2pDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxjQUFjO1FBQ1osTUFBTSxvQkFBb0IsR0FBdUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLElBQUksQ0FD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QUQzQixVQUFVLEVBQUU7SUEwQkUsV0FBQSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDZCxXQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQTtHQTFCbEIsZUFBZSxDQTRNM0I7U0E1TVksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIE9ic2VydmFibGUsIG1lcmdlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFwLCBzd2l0Y2hNYXAsIGZpcnN0LCBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IENhcm91c2VsU2VydmljZSB9IGZyb20gJy4vY2Fyb3VzZWwuc2VydmljZSc7XG5pbXBvcnQgeyBXSU5ET1cgfSBmcm9tICcuL3dpbmRvdy1yZWYuc2VydmljZSc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJy4vZG9jdW1lbnQtcmVmLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXV0b3BsYXlTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95e1xuICAvKipcbiAgICogU3Vic2NyaW9wdGlvbiB0byBtZXJnZSBPYnNlcnZhYmxlcyBmcm9tIENhcm91c2VsU2VydmljZVxuICAgKi9cbiAgYXV0b3BsYXlTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKipcbiAgICogVGhlIGF1dG9wbGF5IHRpbWVvdXQuXG4gICAqL1xuICBwcml2YXRlIF90aW1lb3V0OiBudW1iZXIgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgd2hlbmV2ZXIgdGhlIGF1dG9wbGF5IGlzIHBhdXNlZC5cbiAgICovXG4gIHByaXZhdGUgX3BhdXNlZCA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBTaG93cyB3aGV0aGVyIHRoZSBjb2RlICh0aGUgcGx1Z2luKSBjaGFuZ2VkIHRoZSBvcHRpb24gJ0F1dG9wbGF5VGltZW91dCcgZm9yIG93biBuZWVkc1xuICAgKi9cbiAgcHJpdmF0ZSBfaXNBcnRpZmljaWFsQXV0b3BsYXlUaW1lb3V0OiBib29sZWFuO1xuXG4gIHByaXZhdGUgd2luUmVmOiBXaW5kb3c7XG4gIHByaXZhdGUgZG9jUmVmOiBEb2N1bWVudDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhcm91c2VsU2VydmljZTogQ2Fyb3VzZWxTZXJ2aWNlLFxuICAgICAgICAgICAgICBASW5qZWN0KFdJTkRPVykgd2luUmVmOiBhbnksXG4gICAgICAgICAgICAgIEBJbmplY3QoRE9DVU1FTlQpIGRvY1JlZjogYW55LFxuICApIHtcbiAgICB0aGlzLndpblJlZiA9IHdpblJlZiBhcyBXaW5kb3c7XG4gICAgdGhpcy5kb2NSZWYgPSBkb2NSZWYgYXMgRG9jdW1lbnQ7XG4gICAgdGhpcy5zcHlEYXRhU3RyZWFtcygpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5hdXRvcGxheVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlZmluZXMgT2JzZXJ2YWJsZXMgd2hpY2ggc2VydmljZSBtdXN0IG9ic2VydmVcbiAgICovXG4gIHNweURhdGFTdHJlYW1zKCkge1xuICAgIGNvbnN0IGluaXRpYWxpemVkQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRJbml0aWFsaXplZFN0YXRlKCkucGlwZShcbiAgICAgIHRhcCgoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hdXRvcGxheSkge1xuICAgICAgICAgIHRoaXMucGxheSgpO1xuXHRcdFx0XHR9XG4gICAgICB9KVxuICAgICk7XG5cbiAgICBjb25zdCBjaGFuZ2VkU2V0dGluZ3MkOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRDaGFuZ2VkU3RhdGUoKS5waXBlKFxuICAgICAgdGFwKGRhdGEgPT4ge1xuICAgICAgICB0aGlzLl9oYW5kbGVDaGFuZ2VPYnNlcnZhYmxlKGRhdGEpO1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgY29uc3QgcmVzaXplZCQ6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldFJlc2l6ZWRTdGF0ZSgpLnBpcGUoXG4gICAgICB0YXAoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b3BsYXkpIHtcbiAgICAgICAgICB0aGlzLnBsYXkoKTtcblx0XHRcdFx0fSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnN0b3AoKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApXG5cbiAgICAvLyBvcmlnaW5hbCBBdXRvcGxheSBQbHVnaW4gaGFzIGxpc3RlbmVycyBvbiBwbGF5Lm93bC5jb3JlIGFuZCBzdG9wLm93bC5jb3JlIGV2ZW50cy5cbiAgICAvLyBUaGV5IGFyZSB0cmlnZ2VyZWQgYnkgVmlkZW8gUGx1Z2luXG5cbiAgICBjb25zdCBhdXRvcGxheU1lcmdlJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gbWVyZ2UoaW5pdGlhbGl6ZWRDYXJvdXNlbCQsIGNoYW5nZWRTZXR0aW5ncyQsIHJlc2l6ZWQkKTtcbiAgICB0aGlzLmF1dG9wbGF5U3Vic2NyaXB0aW9uID0gYXV0b3BsYXlNZXJnZSQuc3Vic2NyaWJlKFxuICAgICAgKCkgPT4ge31cbiAgICApO1xuICB9XG5cbiAgLyoqXG5cdCAqIFN0YXJ0cyB0aGUgYXV0b3BsYXkuXG5cdCAqIEBwYXJhbSB0aW1lb3V0IFRoZSBpbnRlcnZhbCBiZWZvcmUgdGhlIG5leHQgYW5pbWF0aW9uIHN0YXJ0cy5cblx0ICogQHBhcmFtIHNwZWVkIFRoZSBhbmltYXRpb24gc3BlZWQgZm9yIHRoZSBhbmltYXRpb25zLlxuXHQgKi9cblx0cGxheSh0aW1lb3V0PzogbnVtYmVyLCBzcGVlZD86IG51bWJlcikge1xuICAgIGlmICh0aGlzLl9wYXVzZWQpIHtcblx0XHRcdHRoaXMuX3BhdXNlZCA9IGZhbHNlO1xuXHRcdFx0dGhpcy5fc2V0QXV0b1BsYXlJbnRlcnZhbCh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hdXRvcGxheU1vdXNlbGVhdmVUaW1lb3V0KTtcbiAgICB9XG5cblx0XHRpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2UuaXMoJ3JvdGF0aW5nJykpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR0aGlzLmNhcm91c2VsU2VydmljZS5lbnRlcigncm90YXRpbmcnKTtcblx0XHR0aGlzLl9zZXRBdXRvUGxheUludGVydmFsKCk7XG4gIH07XG5cbiAgLyoqXG5cdCAqIEdldHMgYSBuZXcgdGltZW91dFxuXHQgKiBAcGFyYW0gdGltZW91dCAtIFRoZSBpbnRlcnZhbCBiZWZvcmUgdGhlIG5leHQgYW5pbWF0aW9uIHN0YXJ0cy5cblx0ICogQHBhcmFtIHNwZWVkIC0gVGhlIGFuaW1hdGlvbiBzcGVlZCBmb3IgdGhlIGFuaW1hdGlvbnMuXG5cdCAqIEByZXR1cm5cblx0ICovXG5cdHByaXZhdGUgX2dldE5leHRUaW1lb3V0KHRpbWVvdXQ/OiBudW1iZXIsIHNwZWVkPzogbnVtYmVyKTogbnVtYmVyIHtcblx0XHRpZiAoIHRoaXMuX3RpbWVvdXQgKSB7XG5cdFx0XHR0aGlzLndpblJlZi5jbGVhclRpbWVvdXQodGhpcy5fdGltZW91dCk7XG4gICAgfVxuXG4gICAgdGhpcy5faXNBcnRpZmljaWFsQXV0b3BsYXlUaW1lb3V0ID0gdGltZW91dCA/IHRydWUgOiBmYWxzZTtcblxuXHRcdHJldHVybiB0aGlzLndpblJlZi5zZXRUaW1lb3V0KCgpID0+e1xuICAgICAgaWYgKHRoaXMuX3BhdXNlZCB8fCB0aGlzLmNhcm91c2VsU2VydmljZS5pcygnYnVzeScpIHx8IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmlzKCdpbnRlcmFjdGluZycpIHx8IHRoaXMuZG9jUmVmLmhpZGRlbikge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmNhcm91c2VsU2VydmljZS5uZXh0KHNwZWVkIHx8IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9wbGF5U3BlZWQpO1xuICAgIH0sIHRpbWVvdXQgfHwgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b3BsYXlUaW1lb3V0KTtcbiAgfTtcblxuICAvKipcblx0ICogU2V0cyBhdXRvcGxheSBpbiBtb3Rpb24uXG5cdCAqL1xuICBwcml2YXRlIF9zZXRBdXRvUGxheUludGVydmFsKHRpbWVvdXQ/OiBudW1iZXIpIHtcblx0XHR0aGlzLl90aW1lb3V0ID0gdGhpcy5fZ2V0TmV4dFRpbWVvdXQodGltZW91dCk7XG5cdH07XG5cblx0LyoqXG5cdCAqIFN0b3BzIHRoZSBhdXRvcGxheS5cblx0ICovXG5cdHN0b3AoKSB7XG5cdFx0aWYgKCF0aGlzLmNhcm91c2VsU2VydmljZS5pcygncm90YXRpbmcnKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cbiAgICB0aGlzLl9wYXVzZWQgPSB0cnVlO1xuXG5cdFx0dGhpcy53aW5SZWYuY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVvdXQpO1xuXHRcdHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmxlYXZlKCdyb3RhdGluZycpO1xuICB9O1xuXG4gIC8qKlxuXHQgKiBTdG9wcyB0aGUgYXV0b3BsYXkuXG5cdCAqL1xuXHRwYXVzZSgpIHtcblx0XHRpZiAoIXRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmlzKCdyb3RhdGluZycpKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0dGhpcy5fcGF1c2VkID0gdHJ1ZTtcbiAgfTtcblxuICAvKipcbiAgICogTWFuYWdlcyBieSBhdXRvcGxheWluZyBhY2NvcmRpbmcgdG8gZGF0YSBwYXNzZWQgYnkgX2NoYW5nZWRTZXR0aW5nc0Nhcm91c2VsJCBPYnNhcnZhYmxlXG4gICAqIEBwYXJhbSBkYXRhIG9iamVjdCB3aXRoIGN1cnJlbnQgcG9zaXRpb24gb2YgY2Fyb3VzZWwgYW5kIHR5cGUgb2YgY2hhbmdlXG4gICAqL1xuICBwcml2YXRlIF9oYW5kbGVDaGFuZ2VPYnNlcnZhYmxlKGRhdGE6IGFueSkge1xuICAgIGlmIChkYXRhLnByb3BlcnR5Lm5hbWUgPT09ICdzZXR0aW5ncycpIHtcbiAgICAgIGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hdXRvcGxheSkge1xuICAgICAgICB0aGlzLnBsYXkoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZGF0YS5wcm9wZXJ0eS5uYW1lID09PSAncG9zaXRpb24nKSB7XG4gICAgICAvL2NvbnNvbGUubG9nKCdwbGF5PycsIGUpO1xuICAgICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9wbGF5KSB7XG4gICAgICAgIHRoaXMuX3NldEF1dG9QbGF5SW50ZXJ2YWwoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3RhcnRzIGF1dG9wbGF5aW5nIG9mIHRoZSBjYXJvdXNlbCBpbiB0aGUgY2FzZSB3aGVuIHVzZXIgbGVhdmVzIHRoZSBjYXJvdXNlbCBiZWZvcmUgaXQgc3RhcnRzIHRyYW5zbGF0ZWluZyAobW92aW5nKVxuICAgKi9cbiAgcHJpdmF0ZSBfcGxheUFmdGVyVHJhbnNsYXRlZCgpIHtcbiAgICBvZigndHJhbnNsYXRlZCcpLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoZGF0YSA9PiB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRUcmFuc2xhdGVkU3RhdGUoKSksXG4gICAgICBmaXJzdCgpLFxuICAgICAgZmlsdGVyKCgpID0+IHRoaXMuX2lzQXJ0aWZpY2lhbEF1dG9wbGF5VGltZW91dCksXG4gICAgICB0YXAoKCkgPT4gdGhpcy5fc2V0QXV0b1BsYXlJbnRlcnZhbCgpKVxuICAgICkuc3Vic2NyaWJlKCgpID0+IHsgfSk7XG4gIH1cblxuICAvKipcbiAgICogU3RhcnRzIHBhdXNpbmdcbiAgICovXG4gIHN0YXJ0UGF1c2luZygpIHtcbiAgICBpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b3BsYXlIb3ZlclBhdXNlICYmIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmlzKCdyb3RhdGluZycpKSB7XG4gICAgICB0aGlzLnBhdXNlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0cyBwbGF5aW5nIGFmdGVyIG1vdXNlIGxlYXZlcyBjYXJvdXNlbFxuICAgKi9cbiAgc3RhcnRQbGF5aW5nTW91c2VMZWF2ZSgpIHtcbiAgICBpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b3BsYXlIb3ZlclBhdXNlICYmIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmlzKCdyb3RhdGluZycpKSB7XG4gICAgICB0aGlzLnBsYXkoKTtcbiAgICAgIHRoaXMuX3BsYXlBZnRlclRyYW5zbGF0ZWQoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3RhcnRzIHBsYXlpbmcgYWZ0ZXIgdG91Y2ggZW5kc1xuICAgKi9cbiAgc3RhcnRQbGF5aW5nVG91Y2hFbmQoKSB7XG4gICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9wbGF5SG92ZXJQYXVzZSAmJiB0aGlzLmNhcm91c2VsU2VydmljZS5pcygncm90YXRpbmcnKSkge1xuICAgICAgdGhpcy5wbGF5KCk7XG4gICAgICB0aGlzLl9wbGF5QWZ0ZXJUcmFuc2xhdGVkKCk7XG4gICAgfVxuICB9XG59XG4iXX0=