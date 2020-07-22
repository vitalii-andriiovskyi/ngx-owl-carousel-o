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
        console.log('rotating');
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
            console.log('startPlayingMouseLeave');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b3BsYXkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vd2wtY2Fyb3VzZWwtby8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9hdXRvcGxheS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQTRCLEtBQUssRUFBRSxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0QsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRS9ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBR2xEO0lBd0JFLHlCQUFvQixlQUFnQyxFQUN4QixNQUFXLEVBQ1QsTUFBVztRQUZyQixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFsQnBEOztXQUVHO1FBQ0ssYUFBUSxHQUFXLElBQUksQ0FBQztRQUVoQzs7V0FFRztRQUNLLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFjdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFnQixDQUFDO1FBQy9CLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBa0IsQ0FBQztRQUNqQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELHFDQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDMUMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsd0NBQWMsR0FBZDtRQUFBLGlCQWdDQztRQS9CQyxJQUFNLG9CQUFvQixHQUF1QixJQUFJLENBQUMsZUFBZSxDQUFDLG1CQUFtQixFQUFFLENBQUMsSUFBSSxDQUM5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QUFFLENBQUM7WUFDWixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztTQUM3QjtJQUNILENBQUM7O2dCQXJMb0MsZUFBZTtnREFDdkMsTUFBTSxTQUFDLE1BQU07Z0RBQ2IsTUFBTSxTQUFDLFFBQVE7O0lBMUJqQixlQUFlO1FBRDNCLFVBQVUsRUFBRTtRQTBCRSxXQUFBLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUNkLFdBQUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO09BMUJsQixlQUFlLENBOE0zQjtJQUFELHNCQUFDO0NBQUEsQUE5TUQsSUE4TUM7U0E5TVksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgT2JzZXJ2YWJsZSwgbWVyZ2UsIG9mIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IHRhcCwgc3dpdGNoTWFwLCBmaXJzdCwgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgQ2Fyb3VzZWxTZXJ2aWNlIH0gZnJvbSAnLi9jYXJvdXNlbC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgV0lORE9XIH0gZnJvbSAnLi93aW5kb3ctcmVmLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJy4vZG9jdW1lbnQtcmVmLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQXV0b3BsYXlTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95e1xyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlvcHRpb24gdG8gbWVyZ2UgT2JzZXJ2YWJsZXMgZnJvbSBDYXJvdXNlbFNlcnZpY2VcclxuICAgKi9cclxuICBhdXRvcGxheVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgYXV0b3BsYXkgdGltZW91dC5cclxuICAgKi9cclxuICBwcml2YXRlIF90aW1lb3V0OiBudW1iZXIgPSBudWxsO1xyXG5cclxuICAvKipcclxuICAgKiBJbmRpY2F0ZXMgd2hlbmV2ZXIgdGhlIGF1dG9wbGF5IGlzIHBhdXNlZC5cclxuICAgKi9cclxuICBwcml2YXRlIF9wYXVzZWQgPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogU2hvd3Mgd2hldGhlciB0aGUgY29kZSAodGhlIHBsdWdpbikgY2hhbmdlZCB0aGUgb3B0aW9uICdBdXRvcGxheVRpbWVvdXQnIGZvciBvd24gbmVlZHNcclxuICAgKi9cclxuICBwcml2YXRlIF9pc0FydGlmaWNpYWxBdXRvcGxheVRpbWVvdXQ6IGJvb2xlYW47XHJcblxyXG4gIHByaXZhdGUgd2luUmVmOiBXaW5kb3c7XHJcbiAgcHJpdmF0ZSBkb2NSZWY6IERvY3VtZW50O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhcm91c2VsU2VydmljZTogQ2Fyb3VzZWxTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgIEBJbmplY3QoV0lORE9XKSB3aW5SZWY6IGFueSxcclxuICAgICAgICAgICAgICBASW5qZWN0KERPQ1VNRU5UKSBkb2NSZWY6IGFueSxcclxuICApIHtcclxuICAgIHRoaXMud2luUmVmID0gd2luUmVmIGFzIFdpbmRvdztcclxuICAgIHRoaXMuZG9jUmVmID0gZG9jUmVmIGFzIERvY3VtZW50O1xyXG4gICAgdGhpcy5zcHlEYXRhU3RyZWFtcygpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmF1dG9wbGF5U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZWZpbmVzIE9ic2VydmFibGVzIHdoaWNoIHNlcnZpY2UgbXVzdCBvYnNlcnZlXHJcbiAgICovXHJcbiAgc3B5RGF0YVN0cmVhbXMoKSB7XHJcbiAgICBjb25zdCBpbml0aWFsaXplZENhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0SW5pdGlhbGl6ZWRTdGF0ZSgpLnBpcGUoXHJcbiAgICAgIHRhcCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9wbGF5KSB7XHJcbiAgICAgICAgICB0aGlzLnBsYXkoKTtcclxuXHRcdFx0XHR9XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IGNoYW5nZWRTZXR0aW5ncyQ6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldENoYW5nZWRTdGF0ZSgpLnBpcGUoXHJcbiAgICAgIHRhcChkYXRhID0+IHtcclxuICAgICAgICB0aGlzLl9oYW5kbGVDaGFuZ2VPYnNlcnZhYmxlKGRhdGEpO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCByZXNpemVkJDogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0UmVzaXplZFN0YXRlKCkucGlwZShcclxuICAgICAgdGFwKCgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b3BsYXkpIHtcclxuICAgICAgICAgIHRoaXMucGxheSgpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnN0b3AoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICApXHJcblxyXG4gICAgLy8gb3JpZ2luYWwgQXV0b3BsYXkgUGx1Z2luIGhhcyBsaXN0ZW5lcnMgb24gcGxheS5vd2wuY29yZSBhbmQgc3RvcC5vd2wuY29yZSBldmVudHMuXHJcbiAgICAvLyBUaGV5IGFyZSB0cmlnZ2VyZWQgYnkgVmlkZW8gUGx1Z2luXHJcblxyXG4gICAgY29uc3QgYXV0b3BsYXlNZXJnZSQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IG1lcmdlKGluaXRpYWxpemVkQ2Fyb3VzZWwkLCBjaGFuZ2VkU2V0dGluZ3MkLCByZXNpemVkJCk7XHJcbiAgICB0aGlzLmF1dG9wbGF5U3Vic2NyaXB0aW9uID0gYXV0b3BsYXlNZXJnZSQuc3Vic2NyaWJlKFxyXG4gICAgICAoKSA9PiB7fVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIFN0YXJ0cyB0aGUgYXV0b3BsYXkuXHJcblx0ICogQHBhcmFtIHRpbWVvdXQgVGhlIGludGVydmFsIGJlZm9yZSB0aGUgbmV4dCBhbmltYXRpb24gc3RhcnRzLlxyXG5cdCAqIEBwYXJhbSBzcGVlZCBUaGUgYW5pbWF0aW9uIHNwZWVkIGZvciB0aGUgYW5pbWF0aW9ucy5cclxuXHQgKi9cclxuXHRwbGF5KHRpbWVvdXQ/OiBudW1iZXIsIHNwZWVkPzogbnVtYmVyKSB7XHJcbiAgICBpZiAodGhpcy5fcGF1c2VkKSB7XHJcblx0XHRcdHRoaXMuX3BhdXNlZCA9IGZhbHNlO1xyXG5cdFx0XHR0aGlzLl9zZXRBdXRvUGxheUludGVydmFsKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9wbGF5TW91c2VsZWF2ZVRpbWVvdXQpO1xyXG4gICAgfVxyXG5cclxuXHRcdGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5pcygncm90YXRpbmcnKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5jYXJvdXNlbFNlcnZpY2UuZW50ZXIoJ3JvdGF0aW5nJyk7XHJcbiAgICBjb25zb2xlLmxvZygncm90YXRpbmcnKTtcclxuXHRcdHRoaXMuX3NldEF1dG9QbGF5SW50ZXJ2YWwoKTtcclxuICB9O1xyXG5cclxuICAvKipcclxuXHQgKiBHZXRzIGEgbmV3IHRpbWVvdXRcclxuXHQgKiBAcGFyYW0gdGltZW91dCAtIFRoZSBpbnRlcnZhbCBiZWZvcmUgdGhlIG5leHQgYW5pbWF0aW9uIHN0YXJ0cy5cclxuXHQgKiBAcGFyYW0gc3BlZWQgLSBUaGUgYW5pbWF0aW9uIHNwZWVkIGZvciB0aGUgYW5pbWF0aW9ucy5cclxuXHQgKiBAcmV0dXJuXHJcblx0ICovXHJcblx0cHJpdmF0ZSBfZ2V0TmV4dFRpbWVvdXQodGltZW91dD86IG51bWJlciwgc3BlZWQ/OiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0aWYgKCB0aGlzLl90aW1lb3V0ICkge1xyXG5cdFx0XHR0aGlzLndpblJlZi5jbGVhclRpbWVvdXQodGhpcy5fdGltZW91dCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5faXNBcnRpZmljaWFsQXV0b3BsYXlUaW1lb3V0ID0gdGltZW91dCA/IHRydWUgOiBmYWxzZTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy53aW5SZWYuc2V0VGltZW91dCgoKSA9PntcclxuICAgICAgaWYgKHRoaXMuX3BhdXNlZCB8fCB0aGlzLmNhcm91c2VsU2VydmljZS5pcygnYnVzeScpIHx8IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmlzKCdpbnRlcmFjdGluZycpIHx8IHRoaXMuZG9jUmVmLmhpZGRlbikge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLmNhcm91c2VsU2VydmljZS5uZXh0KHNwZWVkIHx8IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9wbGF5U3BlZWQpO1xyXG4gICAgfSwgdGltZW91dCB8fCB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hdXRvcGxheVRpbWVvdXQpO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG5cdCAqIFNldHMgYXV0b3BsYXkgaW4gbW90aW9uLlxyXG5cdCAqL1xyXG4gIHByaXZhdGUgX3NldEF1dG9QbGF5SW50ZXJ2YWwodGltZW91dD86IG51bWJlcikge1xyXG5cdFx0dGhpcy5fdGltZW91dCA9IHRoaXMuX2dldE5leHRUaW1lb3V0KHRpbWVvdXQpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFN0b3BzIHRoZSBhdXRvcGxheS5cclxuXHQgKi9cclxuXHRzdG9wKCkge1xyXG5cdFx0aWYgKCF0aGlzLmNhcm91c2VsU2VydmljZS5pcygncm90YXRpbmcnKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcbiAgICB0aGlzLl9wYXVzZWQgPSB0cnVlO1xyXG5cclxuXHRcdHRoaXMud2luUmVmLmNsZWFyVGltZW91dCh0aGlzLl90aW1lb3V0KTtcclxuXHRcdHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmxlYXZlKCdyb3RhdGluZycpO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG5cdCAqIFN0b3BzIHRoZSBhdXRvcGxheS5cclxuXHQgKi9cclxuXHRwYXVzZSgpIHtcclxuXHRcdGlmICghdGhpcy5jYXJvdXNlbFNlcnZpY2UuaXMoJ3JvdGF0aW5nJykpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX3BhdXNlZCA9IHRydWU7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogTWFuYWdlcyBieSBhdXRvcGxheWluZyBhY2NvcmRpbmcgdG8gZGF0YSBwYXNzZWQgYnkgX2NoYW5nZWRTZXR0aW5nc0Nhcm91c2VsJCBPYnNhcnZhYmxlXHJcbiAgICogQHBhcmFtIGRhdGEgb2JqZWN0IHdpdGggY3VycmVudCBwb3NpdGlvbiBvZiBjYXJvdXNlbCBhbmQgdHlwZSBvZiBjaGFuZ2VcclxuICAgKi9cclxuICBwcml2YXRlIF9oYW5kbGVDaGFuZ2VPYnNlcnZhYmxlKGRhdGE6IGFueSkge1xyXG4gICAgaWYgKGRhdGEucHJvcGVydHkubmFtZSA9PT0gJ3NldHRpbmdzJykge1xyXG4gICAgICBpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b3BsYXkpIHtcclxuICAgICAgICB0aGlzLnBsYXkoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnN0b3AoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChkYXRhLnByb3BlcnR5Lm5hbWUgPT09ICdwb3NpdGlvbicpIHtcclxuICAgICAgLy9jb25zb2xlLmxvZygncGxheT8nLCBlKTtcclxuICAgICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9wbGF5KSB7XHJcbiAgICAgICAgdGhpcy5fc2V0QXV0b1BsYXlJbnRlcnZhbCgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdGFydHMgYXV0b3BsYXlpbmcgb2YgdGhlIGNhcm91c2VsIGluIHRoZSBjYXNlIHdoZW4gdXNlciBsZWF2ZXMgdGhlIGNhcm91c2VsIGJlZm9yZSBpdCBzdGFydHMgdHJhbnNsYXRlaW5nIChtb3ZpbmcpXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfcGxheUFmdGVyVHJhbnNsYXRlZCgpIHtcclxuICAgIG9mKCd0cmFuc2xhdGVkJykucGlwZShcclxuICAgICAgc3dpdGNoTWFwKGRhdGEgPT4gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0VHJhbnNsYXRlZFN0YXRlKCkpLFxyXG4gICAgICBmaXJzdCgpLFxyXG4gICAgICBmaWx0ZXIoKCkgPT4gdGhpcy5faXNBcnRpZmljaWFsQXV0b3BsYXlUaW1lb3V0KSxcclxuICAgICAgdGFwKCgpID0+IHRoaXMuX3NldEF1dG9QbGF5SW50ZXJ2YWwoKSlcclxuICAgICkuc3Vic2NyaWJlKCgpID0+IHsgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdGFydHMgcGF1c2luZ1xyXG4gICAqL1xyXG4gIHN0YXJ0UGF1c2luZygpIHtcclxuICAgIGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hdXRvcGxheUhvdmVyUGF1c2UgJiYgdGhpcy5jYXJvdXNlbFNlcnZpY2UuaXMoJ3JvdGF0aW5nJykpIHtcclxuICAgICAgdGhpcy5wYXVzZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnRzIHBsYXlpbmcgYWZ0ZXIgbW91c2UgbGVhdmVzIGNhcm91c2VsXHJcbiAgICovXHJcbiAgc3RhcnRQbGF5aW5nTW91c2VMZWF2ZSgpIHtcclxuICAgIGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hdXRvcGxheUhvdmVyUGF1c2UgJiYgdGhpcy5jYXJvdXNlbFNlcnZpY2UuaXMoJ3JvdGF0aW5nJykpIHtcclxuICAgICAgdGhpcy5wbGF5KCk7XHJcbiAgICAgIHRoaXMuX3BsYXlBZnRlclRyYW5zbGF0ZWQoKTtcclxuICAgICAgY29uc29sZS5sb2coJ3N0YXJ0UGxheWluZ01vdXNlTGVhdmUnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0YXJ0cyBwbGF5aW5nIGFmdGVyIHRvdWNoIGVuZHNcclxuICAgKi9cclxuICBzdGFydFBsYXlpbmdUb3VjaEVuZCgpIHtcclxuICAgIGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hdXRvcGxheUhvdmVyUGF1c2UgJiYgdGhpcy5jYXJvdXNlbFNlcnZpY2UuaXMoJ3JvdGF0aW5nJykpIHtcclxuICAgICAgdGhpcy5wbGF5KCk7XHJcbiAgICAgIHRoaXMuX3BsYXlBZnRlclRyYW5zbGF0ZWQoKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19