import { __decorate, __param } from "tslib";
import { Injectable, Inject } from '@angular/core';
import { merge, of } from 'rxjs';
import { tap, switchMap, first, filter } from 'rxjs/operators';
import { CarouselService } from './carousel.service';
import { WINDOW } from './window-ref.service';
import { DOCUMENT } from './document-ref.service';
var AutoplayService = /** @class */ (function () {
    function AutoplayService(carouselService, winRef, docRef) {
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
    AutoplayService.prototype.ngOnDestroy = function () {
        this.autoplaySubscription.unsubscribe();
    };
    /**
     * Defines Observables which service must observe
     */
    AutoplayService.prototype.spyDataStreams = function () {
        var _this = this;
        var initializedCarousel$ = this.carouselService.getInitializedState().pipe(tap(function () {
            if (_this.carouselService.settings.autoplay) {
                _this.play();
            }
        }));
        var changedSettings$ = this.carouselService.getChangedState().pipe(tap(function (data) {
            _this._handleChangeObservable(data);
        }));
        var resized$ = this.carouselService.getResizedState().pipe(tap(function () {
            if (_this.carouselService.settings.autoplay) {
                _this.play();
            }
            else {
                _this.stop();
            }
        }));
        // original Autoplay Plugin has listeners on play.owl.core and stop.owl.core events.
        // They are triggered by Video Plugin
        var autoplayMerge$ = merge(initializedCarousel$, changedSettings$, resized$);
        this.autoplaySubscription = autoplayMerge$.subscribe(function () { });
    };
    /**
       * Starts the autoplay.
       * @param timeout The interval before the next animation starts.
       * @param speed The animation speed for the animations.
       */
    AutoplayService.prototype.play = function (timeout, speed) {
        if (this._paused) {
            this._paused = false;
            this._setAutoPlayInterval(this.carouselService.settings.autoplayMouseleaveTimeout);
        }
        if (this.carouselService.is('rotating')) {
            return;
        }
        this.carouselService.enter('rotating');
        this._setAutoPlayInterval();
    };
    ;
    /**
       * Gets a new timeout
       * @param timeout - The interval before the next animation starts.
       * @param speed - The animation speed for the animations.
       * @return
       */
    AutoplayService.prototype._getNextTimeout = function (timeout, speed) {
        var _this = this;
        if (this._timeout) {
            this.winRef.clearTimeout(this._timeout);
        }
        this._isArtificialAutoplayTimeout = timeout ? true : false;
        return this.winRef.setTimeout(function () {
            if (_this._paused || _this.carouselService.is('busy') || _this.carouselService.is('interacting') || _this.docRef.hidden) {
                return;
            }
            _this.carouselService.next(speed || _this.carouselService.settings.autoplaySpeed);
        }, timeout || this.carouselService.settings.autoplayTimeout);
    };
    ;
    /**
       * Sets autoplay in motion.
       */
    AutoplayService.prototype._setAutoPlayInterval = function (timeout) {
        this._timeout = this._getNextTimeout(timeout);
    };
    ;
    /**
     * Stops the autoplay.
     */
    AutoplayService.prototype.stop = function () {
        if (!this.carouselService.is('rotating')) {
            return;
        }
        this._paused = true;
        this.winRef.clearTimeout(this._timeout);
        this.carouselService.leave('rotating');
    };
    ;
    /**
       * Stops the autoplay.
       */
    AutoplayService.prototype.pause = function () {
        if (!this.carouselService.is('rotating')) {
            return;
        }
        this._paused = true;
    };
    ;
    /**
     * Manages by autoplaying according to data passed by _changedSettingsCarousel$ Obsarvable
     * @param data object with current position of carousel and type of change
     */
    AutoplayService.prototype._handleChangeObservable = function (data) {
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
    };
    /**
     * Starts autoplaying of the carousel in the case when user leaves the carousel before it starts translateing (moving)
     */
    AutoplayService.prototype._playAfterTranslated = function () {
        var _this = this;
        of('translated').pipe(switchMap(function (data) { return _this.carouselService.getTranslatedState(); }), first(), filter(function () { return _this._isArtificialAutoplayTimeout; }), tap(function () { return _this._setAutoPlayInterval(); })).subscribe(function () { });
    };
    /**
     * Starts pausing
     */
    AutoplayService.prototype.startPausing = function () {
        if (this.carouselService.settings.autoplayHoverPause && this.carouselService.is('rotating')) {
            this.pause();
        }
    };
    /**
     * Starts playing after mouse leaves carousel
     */
    AutoplayService.prototype.startPlayingMouseLeave = function () {
        if (this.carouselService.settings.autoplayHoverPause && this.carouselService.is('rotating')) {
            this.play();
            this._playAfterTranslated();
        }
    };
    /**
     * Starts playing after touch ends
     */
    AutoplayService.prototype.startPlayingTouchEnd = function () {
        if (this.carouselService.settings.autoplayHoverPause && this.carouselService.is('rotating')) {
            this.play();
            this._playAfterTranslated();
        }
    };
    AutoplayService.ctorParameters = function () { return [
        { type: CarouselService },
        { type: undefined, decorators: [{ type: Inject, args: [WINDOW,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    AutoplayService = __decorate([
        Injectable(),
        __param(1, Inject(WINDOW)),
        __param(2, Inject(DOCUMENT))
    ], AutoplayService);
    return AutoplayService;
}());
export { AutoplayService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b3BsYXkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vd2wtY2Fyb3VzZWwtby8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9hdXRvcGxheS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQTRCLEtBQUssRUFBRSxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0QsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRS9ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBR2xEO0lBd0JFLHlCQUFvQixlQUFnQyxFQUN4QixNQUFXLEVBQ1QsTUFBVztRQUZyQixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFsQnBEOztXQUVHO1FBQ0ssYUFBUSxHQUFXLElBQUksQ0FBQztRQUVoQzs7V0FFRztRQUNLLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFjdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFnQixDQUFDO1FBQy9CLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBa0IsQ0FBQztRQUNqQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELHFDQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDMUMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsd0NBQWMsR0FBZDtRQUFBLGlCQWdDQztRQS9CQyxJQUFNLG9CQUFvQixHQUF1QixJQUFJLENBQUMsZUFBZSxDQUFDLG1CQUFtQixFQUFFLENBQUMsSUFBSSxDQUM5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QUFDLE1BQU07Z0RBQ2IsTUFBTSxTQUFDLFFBQVE7O0lBMUJqQixlQUFlO1FBRDNCLFVBQVUsRUFBRTtRQTBCRSxXQUFBLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUNkLFdBQUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO09BMUJsQixlQUFlLENBNE0zQjtJQUFELHNCQUFDO0NBQUEsQUE1TUQsSUE0TUM7U0E1TVksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIE9ic2VydmFibGUsIG1lcmdlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFwLCBzd2l0Y2hNYXAsIGZpcnN0LCBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IENhcm91c2VsU2VydmljZSB9IGZyb20gJy4vY2Fyb3VzZWwuc2VydmljZSc7XG5pbXBvcnQgeyBXSU5ET1cgfSBmcm9tICcuL3dpbmRvdy1yZWYuc2VydmljZSc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJy4vZG9jdW1lbnQtcmVmLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXV0b3BsYXlTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95e1xuICAvKipcbiAgICogU3Vic2NyaW9wdGlvbiB0byBtZXJnZSBPYnNlcnZhYmxlcyBmcm9tIENhcm91c2VsU2VydmljZVxuICAgKi9cbiAgYXV0b3BsYXlTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKipcbiAgICogVGhlIGF1dG9wbGF5IHRpbWVvdXQuXG4gICAqL1xuICBwcml2YXRlIF90aW1lb3V0OiBudW1iZXIgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgd2hlbmV2ZXIgdGhlIGF1dG9wbGF5IGlzIHBhdXNlZC5cbiAgICovXG4gIHByaXZhdGUgX3BhdXNlZCA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBTaG93cyB3aGV0aGVyIHRoZSBjb2RlICh0aGUgcGx1Z2luKSBjaGFuZ2VkIHRoZSBvcHRpb24gJ0F1dG9wbGF5VGltZW91dCcgZm9yIG93biBuZWVkc1xuICAgKi9cbiAgcHJpdmF0ZSBfaXNBcnRpZmljaWFsQXV0b3BsYXlUaW1lb3V0OiBib29sZWFuO1xuXG4gIHByaXZhdGUgd2luUmVmOiBXaW5kb3c7XG4gIHByaXZhdGUgZG9jUmVmOiBEb2N1bWVudDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhcm91c2VsU2VydmljZTogQ2Fyb3VzZWxTZXJ2aWNlLFxuICAgICAgICAgICAgICBASW5qZWN0KFdJTkRPVykgd2luUmVmOiBhbnksXG4gICAgICAgICAgICAgIEBJbmplY3QoRE9DVU1FTlQpIGRvY1JlZjogYW55LFxuICApIHtcbiAgICB0aGlzLndpblJlZiA9IHdpblJlZiBhcyBXaW5kb3c7XG4gICAgdGhpcy5kb2NSZWYgPSBkb2NSZWYgYXMgRG9jdW1lbnQ7XG4gICAgdGhpcy5zcHlEYXRhU3RyZWFtcygpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5hdXRvcGxheVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlZmluZXMgT2JzZXJ2YWJsZXMgd2hpY2ggc2VydmljZSBtdXN0IG9ic2VydmVcbiAgICovXG4gIHNweURhdGFTdHJlYW1zKCkge1xuICAgIGNvbnN0IGluaXRpYWxpemVkQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRJbml0aWFsaXplZFN0YXRlKCkucGlwZShcbiAgICAgIHRhcCgoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hdXRvcGxheSkge1xuICAgICAgICAgIHRoaXMucGxheSgpO1xuXHRcdFx0XHR9XG4gICAgICB9KVxuICAgICk7XG5cbiAgICBjb25zdCBjaGFuZ2VkU2V0dGluZ3MkOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRDaGFuZ2VkU3RhdGUoKS5waXBlKFxuICAgICAgdGFwKGRhdGEgPT4ge1xuICAgICAgICB0aGlzLl9oYW5kbGVDaGFuZ2VPYnNlcnZhYmxlKGRhdGEpO1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgY29uc3QgcmVzaXplZCQ6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldFJlc2l6ZWRTdGF0ZSgpLnBpcGUoXG4gICAgICB0YXAoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b3BsYXkpIHtcbiAgICAgICAgICB0aGlzLnBsYXkoKTtcblx0XHRcdFx0fSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnN0b3AoKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApXG5cbiAgICAvLyBvcmlnaW5hbCBBdXRvcGxheSBQbHVnaW4gaGFzIGxpc3RlbmVycyBvbiBwbGF5Lm93bC5jb3JlIGFuZCBzdG9wLm93bC5jb3JlIGV2ZW50cy5cbiAgICAvLyBUaGV5IGFyZSB0cmlnZ2VyZWQgYnkgVmlkZW8gUGx1Z2luXG5cbiAgICBjb25zdCBhdXRvcGxheU1lcmdlJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gbWVyZ2UoaW5pdGlhbGl6ZWRDYXJvdXNlbCQsIGNoYW5nZWRTZXR0aW5ncyQsIHJlc2l6ZWQkKTtcbiAgICB0aGlzLmF1dG9wbGF5U3Vic2NyaXB0aW9uID0gYXV0b3BsYXlNZXJnZSQuc3Vic2NyaWJlKFxuICAgICAgKCkgPT4ge31cbiAgICApO1xuICB9XG5cbiAgLyoqXG5cdCAqIFN0YXJ0cyB0aGUgYXV0b3BsYXkuXG5cdCAqIEBwYXJhbSB0aW1lb3V0IFRoZSBpbnRlcnZhbCBiZWZvcmUgdGhlIG5leHQgYW5pbWF0aW9uIHN0YXJ0cy5cblx0ICogQHBhcmFtIHNwZWVkIFRoZSBhbmltYXRpb24gc3BlZWQgZm9yIHRoZSBhbmltYXRpb25zLlxuXHQgKi9cblx0cGxheSh0aW1lb3V0PzogbnVtYmVyLCBzcGVlZD86IG51bWJlcikge1xuICAgIGlmICh0aGlzLl9wYXVzZWQpIHtcblx0XHRcdHRoaXMuX3BhdXNlZCA9IGZhbHNlO1xuXHRcdFx0dGhpcy5fc2V0QXV0b1BsYXlJbnRlcnZhbCh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hdXRvcGxheU1vdXNlbGVhdmVUaW1lb3V0KTtcbiAgICB9XG5cblx0XHRpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2UuaXMoJ3JvdGF0aW5nJykpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR0aGlzLmNhcm91c2VsU2VydmljZS5lbnRlcigncm90YXRpbmcnKTtcblx0XHR0aGlzLl9zZXRBdXRvUGxheUludGVydmFsKCk7XG4gIH07XG5cbiAgLyoqXG5cdCAqIEdldHMgYSBuZXcgdGltZW91dFxuXHQgKiBAcGFyYW0gdGltZW91dCAtIFRoZSBpbnRlcnZhbCBiZWZvcmUgdGhlIG5leHQgYW5pbWF0aW9uIHN0YXJ0cy5cblx0ICogQHBhcmFtIHNwZWVkIC0gVGhlIGFuaW1hdGlvbiBzcGVlZCBmb3IgdGhlIGFuaW1hdGlvbnMuXG5cdCAqIEByZXR1cm5cblx0ICovXG5cdHByaXZhdGUgX2dldE5leHRUaW1lb3V0KHRpbWVvdXQ/OiBudW1iZXIsIHNwZWVkPzogbnVtYmVyKTogbnVtYmVyIHtcblx0XHRpZiAoIHRoaXMuX3RpbWVvdXQgKSB7XG5cdFx0XHR0aGlzLndpblJlZi5jbGVhclRpbWVvdXQodGhpcy5fdGltZW91dCk7XG4gICAgfVxuXG4gICAgdGhpcy5faXNBcnRpZmljaWFsQXV0b3BsYXlUaW1lb3V0ID0gdGltZW91dCA/IHRydWUgOiBmYWxzZTtcblxuXHRcdHJldHVybiB0aGlzLndpblJlZi5zZXRUaW1lb3V0KCgpID0+e1xuICAgICAgaWYgKHRoaXMuX3BhdXNlZCB8fCB0aGlzLmNhcm91c2VsU2VydmljZS5pcygnYnVzeScpIHx8IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmlzKCdpbnRlcmFjdGluZycpIHx8IHRoaXMuZG9jUmVmLmhpZGRlbikge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmNhcm91c2VsU2VydmljZS5uZXh0KHNwZWVkIHx8IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9wbGF5U3BlZWQpO1xuICAgIH0sIHRpbWVvdXQgfHwgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b3BsYXlUaW1lb3V0KTtcbiAgfTtcblxuICAvKipcblx0ICogU2V0cyBhdXRvcGxheSBpbiBtb3Rpb24uXG5cdCAqL1xuICBwcml2YXRlIF9zZXRBdXRvUGxheUludGVydmFsKHRpbWVvdXQ/OiBudW1iZXIpIHtcblx0XHR0aGlzLl90aW1lb3V0ID0gdGhpcy5fZ2V0TmV4dFRpbWVvdXQodGltZW91dCk7XG5cdH07XG5cblx0LyoqXG5cdCAqIFN0b3BzIHRoZSBhdXRvcGxheS5cblx0ICovXG5cdHN0b3AoKSB7XG5cdFx0aWYgKCF0aGlzLmNhcm91c2VsU2VydmljZS5pcygncm90YXRpbmcnKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cbiAgICB0aGlzLl9wYXVzZWQgPSB0cnVlO1xuXG5cdFx0dGhpcy53aW5SZWYuY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVvdXQpO1xuXHRcdHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmxlYXZlKCdyb3RhdGluZycpO1xuICB9O1xuXG4gIC8qKlxuXHQgKiBTdG9wcyB0aGUgYXV0b3BsYXkuXG5cdCAqL1xuXHRwYXVzZSgpIHtcblx0XHRpZiAoIXRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmlzKCdyb3RhdGluZycpKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0dGhpcy5fcGF1c2VkID0gdHJ1ZTtcbiAgfTtcblxuICAvKipcbiAgICogTWFuYWdlcyBieSBhdXRvcGxheWluZyBhY2NvcmRpbmcgdG8gZGF0YSBwYXNzZWQgYnkgX2NoYW5nZWRTZXR0aW5nc0Nhcm91c2VsJCBPYnNhcnZhYmxlXG4gICAqIEBwYXJhbSBkYXRhIG9iamVjdCB3aXRoIGN1cnJlbnQgcG9zaXRpb24gb2YgY2Fyb3VzZWwgYW5kIHR5cGUgb2YgY2hhbmdlXG4gICAqL1xuICBwcml2YXRlIF9oYW5kbGVDaGFuZ2VPYnNlcnZhYmxlKGRhdGE6IGFueSkge1xuICAgIGlmIChkYXRhLnByb3BlcnR5Lm5hbWUgPT09ICdzZXR0aW5ncycpIHtcbiAgICAgIGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hdXRvcGxheSkge1xuICAgICAgICB0aGlzLnBsYXkoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZGF0YS5wcm9wZXJ0eS5uYW1lID09PSAncG9zaXRpb24nKSB7XG4gICAgICAvL2NvbnNvbGUubG9nKCdwbGF5PycsIGUpO1xuICAgICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9wbGF5KSB7XG4gICAgICAgIHRoaXMuX3NldEF1dG9QbGF5SW50ZXJ2YWwoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3RhcnRzIGF1dG9wbGF5aW5nIG9mIHRoZSBjYXJvdXNlbCBpbiB0aGUgY2FzZSB3aGVuIHVzZXIgbGVhdmVzIHRoZSBjYXJvdXNlbCBiZWZvcmUgaXQgc3RhcnRzIHRyYW5zbGF0ZWluZyAobW92aW5nKVxuICAgKi9cbiAgcHJpdmF0ZSBfcGxheUFmdGVyVHJhbnNsYXRlZCgpIHtcbiAgICBvZigndHJhbnNsYXRlZCcpLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoZGF0YSA9PiB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRUcmFuc2xhdGVkU3RhdGUoKSksXG4gICAgICBmaXJzdCgpLFxuICAgICAgZmlsdGVyKCgpID0+IHRoaXMuX2lzQXJ0aWZpY2lhbEF1dG9wbGF5VGltZW91dCksXG4gICAgICB0YXAoKCkgPT4gdGhpcy5fc2V0QXV0b1BsYXlJbnRlcnZhbCgpKVxuICAgICkuc3Vic2NyaWJlKCgpID0+IHsgfSk7XG4gIH1cblxuICAvKipcbiAgICogU3RhcnRzIHBhdXNpbmdcbiAgICovXG4gIHN0YXJ0UGF1c2luZygpIHtcbiAgICBpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b3BsYXlIb3ZlclBhdXNlICYmIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmlzKCdyb3RhdGluZycpKSB7XG4gICAgICB0aGlzLnBhdXNlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0cyBwbGF5aW5nIGFmdGVyIG1vdXNlIGxlYXZlcyBjYXJvdXNlbFxuICAgKi9cbiAgc3RhcnRQbGF5aW5nTW91c2VMZWF2ZSgpIHtcbiAgICBpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b3BsYXlIb3ZlclBhdXNlICYmIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmlzKCdyb3RhdGluZycpKSB7XG4gICAgICB0aGlzLnBsYXkoKTtcbiAgICAgIHRoaXMuX3BsYXlBZnRlclRyYW5zbGF0ZWQoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3RhcnRzIHBsYXlpbmcgYWZ0ZXIgdG91Y2ggZW5kc1xuICAgKi9cbiAgc3RhcnRQbGF5aW5nVG91Y2hFbmQoKSB7XG4gICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9wbGF5SG92ZXJQYXVzZSAmJiB0aGlzLmNhcm91c2VsU2VydmljZS5pcygncm90YXRpbmcnKSkge1xuICAgICAgdGhpcy5wbGF5KCk7XG4gICAgICB0aGlzLl9wbGF5QWZ0ZXJUcmFuc2xhdGVkKCk7XG4gICAgfVxuICB9XG59XG4iXX0=