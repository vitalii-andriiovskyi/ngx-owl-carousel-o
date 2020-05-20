import * as tslib_1 from "tslib";
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
            this._setAutoPlayInterval(1);
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
    AutoplayService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__param(1, Inject(WINDOW)),
        tslib_1.__param(2, Inject(DOCUMENT))
    ], AutoplayService);
    return AutoplayService;
}());
export { AutoplayService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b3BsYXkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vd2wtY2Fyb3VzZWwtby8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9hdXRvcGxheS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQTRCLEtBQUssRUFBRSxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0QsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRS9ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBR2xEO0lBd0JFLHlCQUFvQixlQUFnQyxFQUN4QixNQUFXLEVBQ1QsTUFBVztRQUZyQixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFsQnBEOztXQUVHO1FBQ0ssYUFBUSxHQUFXLElBQUksQ0FBQztRQUVoQzs7V0FFRztRQUNLLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFjdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFnQixDQUFDO1FBQy9CLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBa0IsQ0FBQztRQUNqQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELHFDQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDMUMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsd0NBQWMsR0FBZDtRQUFBLGlCQWdDQztRQS9CQyxJQUFNLG9CQUFvQixHQUF1QixJQUFJLENBQUMsZUFBZSxDQUFDLG1CQUFtQixFQUFFLENBQUMsSUFBSSxDQUM5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QTFCakIsZUFBZTtRQUQzQixVQUFVLEVBQUU7UUEwQkUsbUJBQUEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ2QsbUJBQUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO09BMUJsQixlQUFlLENBNk0zQjtJQUFELHNCQUFDO0NBQUEsQUE3TUQsSUE2TUM7U0E3TVksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgT2JzZXJ2YWJsZSwgbWVyZ2UsIG9mIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IHRhcCwgc3dpdGNoTWFwLCBmaXJzdCwgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgQ2Fyb3VzZWxTZXJ2aWNlIH0gZnJvbSAnLi9jYXJvdXNlbC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgV0lORE9XIH0gZnJvbSAnLi93aW5kb3ctcmVmLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJy4vZG9jdW1lbnQtcmVmLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQXV0b3BsYXlTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95e1xyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlvcHRpb24gdG8gbWVyZ2UgT2JzZXJ2YWJsZXMgZnJvbSBDYXJvdXNlbFNlcnZpY2VcclxuICAgKi9cclxuICBhdXRvcGxheVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgYXV0b3BsYXkgdGltZW91dC5cclxuICAgKi9cclxuICBwcml2YXRlIF90aW1lb3V0OiBudW1iZXIgPSBudWxsO1xyXG5cclxuICAvKipcclxuICAgKiBJbmRpY2F0ZXMgd2hlbmV2ZXIgdGhlIGF1dG9wbGF5IGlzIHBhdXNlZC5cclxuICAgKi9cclxuICBwcml2YXRlIF9wYXVzZWQgPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogU2hvd3Mgd2hldGhlciB0aGUgY29kZSAodGhlIHBsdWdpbikgY2hhbmdlZCB0aGUgb3B0aW9uICdBdXRvcGxheVRpbWVvdXQnIGZvciBvd24gbmVlZHNcclxuICAgKi9cclxuICBwcml2YXRlIF9pc0FydGlmaWNpYWxBdXRvcGxheVRpbWVvdXQ6IGJvb2xlYW47XHJcblxyXG4gIHByaXZhdGUgd2luUmVmOiBXaW5kb3c7XHJcbiAgcHJpdmF0ZSBkb2NSZWY6IERvY3VtZW50O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhcm91c2VsU2VydmljZTogQ2Fyb3VzZWxTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgIEBJbmplY3QoV0lORE9XKSB3aW5SZWY6IGFueSxcclxuICAgICAgICAgICAgICBASW5qZWN0KERPQ1VNRU5UKSBkb2NSZWY6IGFueSxcclxuICApIHtcclxuICAgIHRoaXMud2luUmVmID0gd2luUmVmIGFzIFdpbmRvdztcclxuICAgIHRoaXMuZG9jUmVmID0gZG9jUmVmIGFzIERvY3VtZW50O1xyXG4gICAgdGhpcy5zcHlEYXRhU3RyZWFtcygpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmF1dG9wbGF5U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZWZpbmVzIE9ic2VydmFibGVzIHdoaWNoIHNlcnZpY2UgbXVzdCBvYnNlcnZlXHJcbiAgICovXHJcbiAgc3B5RGF0YVN0cmVhbXMoKSB7XHJcbiAgICBjb25zdCBpbml0aWFsaXplZENhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0SW5pdGlhbGl6ZWRTdGF0ZSgpLnBpcGUoXHJcbiAgICAgIHRhcCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9wbGF5KSB7XHJcbiAgICAgICAgICB0aGlzLnBsYXkoKTtcclxuXHRcdFx0XHR9XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IGNoYW5nZWRTZXR0aW5ncyQ6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldENoYW5nZWRTdGF0ZSgpLnBpcGUoXHJcbiAgICAgIHRhcChkYXRhID0+IHtcclxuICAgICAgICB0aGlzLl9oYW5kbGVDaGFuZ2VPYnNlcnZhYmxlKGRhdGEpO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCByZXNpemVkJDogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0UmVzaXplZFN0YXRlKCkucGlwZShcclxuICAgICAgdGFwKCgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b3BsYXkpIHtcclxuICAgICAgICAgIHRoaXMucGxheSgpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnN0b3AoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICApXHJcblxyXG4gICAgLy8gb3JpZ2luYWwgQXV0b3BsYXkgUGx1Z2luIGhhcyBsaXN0ZW5lcnMgb24gcGxheS5vd2wuY29yZSBhbmQgc3RvcC5vd2wuY29yZSBldmVudHMuXHJcbiAgICAvLyBUaGV5IGFyZSB0cmlnZ2VyZWQgYnkgVmlkZW8gUGx1Z2luXHJcblxyXG4gICAgY29uc3QgYXV0b3BsYXlNZXJnZSQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IG1lcmdlKGluaXRpYWxpemVkQ2Fyb3VzZWwkLCBjaGFuZ2VkU2V0dGluZ3MkLCByZXNpemVkJCk7XHJcbiAgICB0aGlzLmF1dG9wbGF5U3Vic2NyaXB0aW9uID0gYXV0b3BsYXlNZXJnZSQuc3Vic2NyaWJlKFxyXG4gICAgICAoKSA9PiB7fVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIFN0YXJ0cyB0aGUgYXV0b3BsYXkuXHJcblx0ICogQHBhcmFtIHRpbWVvdXQgVGhlIGludGVydmFsIGJlZm9yZSB0aGUgbmV4dCBhbmltYXRpb24gc3RhcnRzLlxyXG5cdCAqIEBwYXJhbSBzcGVlZCBUaGUgYW5pbWF0aW9uIHNwZWVkIGZvciB0aGUgYW5pbWF0aW9ucy5cclxuXHQgKi9cclxuXHRwbGF5KHRpbWVvdXQ/OiBudW1iZXIsIHNwZWVkPzogbnVtYmVyKSB7XHJcbiAgICBpZiAodGhpcy5fcGF1c2VkKSB7XHJcblx0XHRcdHRoaXMuX3BhdXNlZCA9IGZhbHNlO1xyXG5cdFx0XHR0aGlzLl9zZXRBdXRvUGxheUludGVydmFsKDEpO1xyXG4gICAgfVxyXG5cclxuXHRcdGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5pcygncm90YXRpbmcnKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5jYXJvdXNlbFNlcnZpY2UuZW50ZXIoJ3JvdGF0aW5nJyk7XHJcblxyXG5cdFx0dGhpcy5fc2V0QXV0b1BsYXlJbnRlcnZhbCgpO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG5cdCAqIEdldHMgYSBuZXcgdGltZW91dFxyXG5cdCAqIEBwYXJhbSB0aW1lb3V0IC0gVGhlIGludGVydmFsIGJlZm9yZSB0aGUgbmV4dCBhbmltYXRpb24gc3RhcnRzLlxyXG5cdCAqIEBwYXJhbSBzcGVlZCAtIFRoZSBhbmltYXRpb24gc3BlZWQgZm9yIHRoZSBhbmltYXRpb25zLlxyXG5cdCAqIEByZXR1cm5cclxuXHQgKi9cclxuXHRwcml2YXRlIF9nZXROZXh0VGltZW91dCh0aW1lb3V0PzogbnVtYmVyLCBzcGVlZD86IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRpZiAoIHRoaXMuX3RpbWVvdXQgKSB7XHJcblx0XHRcdHRoaXMud2luUmVmLmNsZWFyVGltZW91dCh0aGlzLl90aW1lb3V0KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9pc0FydGlmaWNpYWxBdXRvcGxheVRpbWVvdXQgPSB0aW1lb3V0ID8gdHJ1ZSA6IGZhbHNlO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLndpblJlZi5zZXRUaW1lb3V0KCgpID0+e1xyXG4gICAgICBpZiAodGhpcy5fcGF1c2VkIHx8IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmlzKCdidXN5JykgfHwgdGhpcy5jYXJvdXNlbFNlcnZpY2UuaXMoJ2ludGVyYWN0aW5nJykgfHwgdGhpcy5kb2NSZWYuaGlkZGVuKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm5leHQoc3BlZWQgfHwgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b3BsYXlTcGVlZCk7XHJcbiAgICB9LCB0aW1lb3V0IHx8IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9wbGF5VGltZW91dCk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcblx0ICogU2V0cyBhdXRvcGxheSBpbiBtb3Rpb24uXHJcblx0ICovXHJcbiAgcHJpdmF0ZSBfc2V0QXV0b1BsYXlJbnRlcnZhbCh0aW1lb3V0PzogbnVtYmVyKSB7XHJcblx0XHR0aGlzLl90aW1lb3V0ID0gdGhpcy5fZ2V0TmV4dFRpbWVvdXQodGltZW91dCk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogU3RvcHMgdGhlIGF1dG9wbGF5LlxyXG5cdCAqL1xyXG5cdHN0b3AoKSB7XHJcblx0XHRpZiAoIXRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmlzKCdyb3RhdGluZycpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuICAgIHRoaXMuX3BhdXNlZCA9IHRydWU7XHJcblxyXG5cdFx0dGhpcy53aW5SZWYuY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVvdXQpO1xyXG5cdFx0dGhpcy5jYXJvdXNlbFNlcnZpY2UubGVhdmUoJ3JvdGF0aW5nJyk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcblx0ICogU3RvcHMgdGhlIGF1dG9wbGF5LlxyXG5cdCAqL1xyXG5cdHBhdXNlKCkge1xyXG5cdFx0aWYgKCF0aGlzLmNhcm91c2VsU2VydmljZS5pcygncm90YXRpbmcnKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5fcGF1c2VkID0gdHJ1ZTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBNYW5hZ2VzIGJ5IGF1dG9wbGF5aW5nIGFjY29yZGluZyB0byBkYXRhIHBhc3NlZCBieSBfY2hhbmdlZFNldHRpbmdzQ2Fyb3VzZWwkIE9ic2FydmFibGVcclxuICAgKiBAcGFyYW0gZGF0YSBvYmplY3Qgd2l0aCBjdXJyZW50IHBvc2l0aW9uIG9mIGNhcm91c2VsIGFuZCB0eXBlIG9mIGNoYW5nZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2hhbmRsZUNoYW5nZU9ic2VydmFibGUoZGF0YTogYW55KSB7XHJcbiAgICBpZiAoZGF0YS5wcm9wZXJ0eS5uYW1lID09PSAnc2V0dGluZ3MnKSB7XHJcbiAgICAgIGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hdXRvcGxheSkge1xyXG4gICAgICAgIHRoaXMucGxheSgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuc3RvcCgpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEucHJvcGVydHkubmFtZSA9PT0gJ3Bvc2l0aW9uJykge1xyXG4gICAgICAvL2NvbnNvbGUubG9nKCdwbGF5PycsIGUpO1xyXG4gICAgICBpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b3BsYXkpIHtcclxuICAgICAgICB0aGlzLl9zZXRBdXRvUGxheUludGVydmFsKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0YXJ0cyBhdXRvcGxheWluZyBvZiB0aGUgY2Fyb3VzZWwgaW4gdGhlIGNhc2Ugd2hlbiB1c2VyIGxlYXZlcyB0aGUgY2Fyb3VzZWwgYmVmb3JlIGl0IHN0YXJ0cyB0cmFuc2xhdGVpbmcgKG1vdmluZylcclxuICAgKi9cclxuICBwcml2YXRlIF9wbGF5QWZ0ZXJUcmFuc2xhdGVkKCkge1xyXG4gICAgb2YoJ3RyYW5zbGF0ZWQnKS5waXBlKFxyXG4gICAgICBzd2l0Y2hNYXAoZGF0YSA9PiB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRUcmFuc2xhdGVkU3RhdGUoKSksXHJcbiAgICAgIGZpcnN0KCksXHJcbiAgICAgIGZpbHRlcigoKSA9PiB0aGlzLl9pc0FydGlmaWNpYWxBdXRvcGxheVRpbWVvdXQpLFxyXG4gICAgICB0YXAoKCkgPT4gdGhpcy5fc2V0QXV0b1BsYXlJbnRlcnZhbCgpKVxyXG4gICAgKS5zdWJzY3JpYmUoKCkgPT4geyB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0YXJ0cyBwYXVzaW5nXHJcbiAgICovXHJcbiAgc3RhcnRQYXVzaW5nKCkge1xyXG4gICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9wbGF5SG92ZXJQYXVzZSAmJiB0aGlzLmNhcm91c2VsU2VydmljZS5pcygncm90YXRpbmcnKSkge1xyXG4gICAgICB0aGlzLnBhdXNlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdGFydHMgcGxheWluZyBhZnRlciBtb3VzZSBsZWF2ZXMgY2Fyb3VzZWxcclxuICAgKi9cclxuICBzdGFydFBsYXlpbmdNb3VzZUxlYXZlKCkge1xyXG4gICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9wbGF5SG92ZXJQYXVzZSAmJiB0aGlzLmNhcm91c2VsU2VydmljZS5pcygncm90YXRpbmcnKSkge1xyXG4gICAgICB0aGlzLnBsYXkoKTtcclxuICAgICAgdGhpcy5fcGxheUFmdGVyVHJhbnNsYXRlZCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnRzIHBsYXlpbmcgYWZ0ZXIgdG91Y2ggZW5kc1xyXG4gICAqL1xyXG4gIHN0YXJ0UGxheWluZ1RvdWNoRW5kKCkge1xyXG4gICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9wbGF5SG92ZXJQYXVzZSAmJiB0aGlzLmNhcm91c2VsU2VydmljZS5pcygncm90YXRpbmcnKSkge1xyXG4gICAgICB0aGlzLnBsYXkoKTtcclxuICAgICAgdGhpcy5fcGxheUFmdGVyVHJhbnNsYXRlZCgpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=