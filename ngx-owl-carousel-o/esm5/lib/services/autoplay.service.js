import { DOCUMENT } from './document-ref.service';
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
    /**
     * Gets a new timeout
     * @private
     * @param {?=} timeout - The interval before the next animation starts.
     * @param {?=} speed - The animation speed for the animations.
     * @return {?}
     */
    AutoplayService.prototype._getNextTimeout = /**
     * Gets a new timeout
     * @private
     * @param {?=} timeout - The interval before the next animation starts.
     * @param {?=} speed - The animation speed for the animations.
     * @return {?}
     */
    function (timeout, speed) {
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
    /**
     * Sets autoplay in motion.
     * @private
     * @param {?=} timeout
     * @return {?}
     */
    AutoplayService.prototype._setAutoPlayInterval = /**
     * Sets autoplay in motion.
     * @private
     * @param {?=} timeout
     * @return {?}
     */
    function (timeout) {
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
    /**
     * Manages by autoplaying according to data passed by _changedSettingsCarousel$ Obsarvable
     * @private
     * @param {?} data object with current position of carousel and type of change
     * @return {?}
     */
    AutoplayService.prototype._handleChangeObservable = /**
     * Manages by autoplaying according to data passed by _changedSettingsCarousel$ Obsarvable
     * @private
     * @param {?} data object with current position of carousel and type of change
     * @return {?}
     */
    function (data) {
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
    /**
     * Starts autoplaying of the carousel in the case when user leaves the carousel before it starts translateing (moving)
     * @private
     * @return {?}
     */
    AutoplayService.prototype._playAfterTranslated = /**
     * Starts autoplaying of the carousel in the case when user leaves the carousel before it starts translateing (moving)
     * @private
     * @return {?}
     */
    function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b3BsYXkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vd2wtY2Fyb3VzZWwtby8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9hdXRvcGxheS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQTRCLEtBQUssRUFBRSxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0QsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRS9ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBR2xEO0lBd0JFLHlCQUFvQixlQUFnQyxFQUN4QixNQUFXLEVBQ1QsTUFBVztRQUZyQixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFsQnBEOztXQUVHO1FBQ0ssYUFBUSxHQUFXLElBQUksQ0FBQztRQUVoQzs7V0FFRztRQUNLLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFjdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFnQixDQUFDO1FBQy9CLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBa0IsQ0FBQztRQUNqQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELHFDQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDMUMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsd0NBQWMsR0FBZDtRQUFBLGlCQWdDQztRQS9CQyxJQUFNLG9CQUFvQixHQUF1QixJQUFJLENBQUMsZUFBZSxDQUFDLG1CQUFtQixFQUFFLENBQUMsSUFBSSxDQUM5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QTFCakIsZUFBZTtRQUQzQixVQUFVLEVBQUU7UUEwQkUsV0FBQSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDZCxXQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQTtPQTFCbEIsZUFBZSxDQTZNM0I7SUFBRCxzQkFBQztDQUFBLEFBN01ELElBNk1DO1NBN01ZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIE9ic2VydmFibGUsIG1lcmdlLCBvZiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyB0YXAsIHN3aXRjaE1hcCwgZmlyc3QsIGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IENhcm91c2VsU2VydmljZSB9IGZyb20gJy4vY2Fyb3VzZWwuc2VydmljZSc7XHJcbmltcG9ydCB7IFdJTkRPVyB9IGZyb20gJy4vd2luZG93LXJlZi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICcuL2RvY3VtZW50LXJlZi5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEF1dG9wbGF5U2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveXtcclxuICAvKipcclxuICAgKiBTdWJzY3Jpb3B0aW9uIHRvIG1lcmdlIE9ic2VydmFibGVzIGZyb20gQ2Fyb3VzZWxTZXJ2aWNlXHJcbiAgICovXHJcbiAgYXV0b3BsYXlTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGF1dG9wbGF5IHRpbWVvdXQuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfdGltZW91dDogbnVtYmVyID0gbnVsbDtcclxuXHJcbiAgLyoqXHJcbiAgICogSW5kaWNhdGVzIHdoZW5ldmVyIHRoZSBhdXRvcGxheSBpcyBwYXVzZWQuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfcGF1c2VkID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIFNob3dzIHdoZXRoZXIgdGhlIGNvZGUgKHRoZSBwbHVnaW4pIGNoYW5nZWQgdGhlIG9wdGlvbiAnQXV0b3BsYXlUaW1lb3V0JyBmb3Igb3duIG5lZWRzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfaXNBcnRpZmljaWFsQXV0b3BsYXlUaW1lb3V0OiBib29sZWFuO1xyXG5cclxuICBwcml2YXRlIHdpblJlZjogV2luZG93O1xyXG4gIHByaXZhdGUgZG9jUmVmOiBEb2N1bWVudDtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjYXJvdXNlbFNlcnZpY2U6IENhcm91c2VsU2VydmljZSxcclxuICAgICAgICAgICAgICBASW5qZWN0KFdJTkRPVykgd2luUmVmOiBhbnksXHJcbiAgICAgICAgICAgICAgQEluamVjdChET0NVTUVOVCkgZG9jUmVmOiBhbnksXHJcbiAgKSB7XHJcbiAgICB0aGlzLndpblJlZiA9IHdpblJlZiBhcyBXaW5kb3c7XHJcbiAgICB0aGlzLmRvY1JlZiA9IGRvY1JlZiBhcyBEb2N1bWVudDtcclxuICAgIHRoaXMuc3B5RGF0YVN0cmVhbXMoKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5hdXRvcGxheVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVmaW5lcyBPYnNlcnZhYmxlcyB3aGljaCBzZXJ2aWNlIG11c3Qgb2JzZXJ2ZVxyXG4gICAqL1xyXG4gIHNweURhdGFTdHJlYW1zKCkge1xyXG4gICAgY29uc3QgaW5pdGlhbGl6ZWRDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldEluaXRpYWxpemVkU3RhdGUoKS5waXBlKFxyXG4gICAgICB0YXAoKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hdXRvcGxheSkge1xyXG4gICAgICAgICAgdGhpcy5wbGF5KCk7XHJcblx0XHRcdFx0fVxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBjaGFuZ2VkU2V0dGluZ3MkOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRDaGFuZ2VkU3RhdGUoKS5waXBlKFxyXG4gICAgICB0YXAoZGF0YSA9PiB7XHJcbiAgICAgICAgdGhpcy5faGFuZGxlQ2hhbmdlT2JzZXJ2YWJsZShkYXRhKTtcclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgcmVzaXplZCQ6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldFJlc2l6ZWRTdGF0ZSgpLnBpcGUoXHJcbiAgICAgIHRhcCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9wbGF5KSB7XHJcbiAgICAgICAgICB0aGlzLnBsYXkoKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5zdG9wKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgKVxyXG5cclxuICAgIC8vIG9yaWdpbmFsIEF1dG9wbGF5IFBsdWdpbiBoYXMgbGlzdGVuZXJzIG9uIHBsYXkub3dsLmNvcmUgYW5kIHN0b3Aub3dsLmNvcmUgZXZlbnRzLlxyXG4gICAgLy8gVGhleSBhcmUgdHJpZ2dlcmVkIGJ5IFZpZGVvIFBsdWdpblxyXG5cclxuICAgIGNvbnN0IGF1dG9wbGF5TWVyZ2UkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSBtZXJnZShpbml0aWFsaXplZENhcm91c2VsJCwgY2hhbmdlZFNldHRpbmdzJCwgcmVzaXplZCQpO1xyXG4gICAgdGhpcy5hdXRvcGxheVN1YnNjcmlwdGlvbiA9IGF1dG9wbGF5TWVyZ2UkLnN1YnNjcmliZShcclxuICAgICAgKCkgPT4ge31cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuXHQgKiBTdGFydHMgdGhlIGF1dG9wbGF5LlxyXG5cdCAqIEBwYXJhbSB0aW1lb3V0IFRoZSBpbnRlcnZhbCBiZWZvcmUgdGhlIG5leHQgYW5pbWF0aW9uIHN0YXJ0cy5cclxuXHQgKiBAcGFyYW0gc3BlZWQgVGhlIGFuaW1hdGlvbiBzcGVlZCBmb3IgdGhlIGFuaW1hdGlvbnMuXHJcblx0ICovXHJcblx0cGxheSh0aW1lb3V0PzogbnVtYmVyLCBzcGVlZD86IG51bWJlcikge1xyXG4gICAgaWYgKHRoaXMuX3BhdXNlZCkge1xyXG5cdFx0XHR0aGlzLl9wYXVzZWQgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy5fc2V0QXV0b1BsYXlJbnRlcnZhbCgxKTtcclxuICAgIH1cclxuXHJcblx0XHRpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2UuaXMoJ3JvdGF0aW5nJykpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmVudGVyKCdyb3RhdGluZycpO1xyXG5cclxuXHRcdHRoaXMuX3NldEF1dG9QbGF5SW50ZXJ2YWwoKTtcclxuICB9O1xyXG5cclxuICAvKipcclxuXHQgKiBHZXRzIGEgbmV3IHRpbWVvdXRcclxuXHQgKiBAcGFyYW0gdGltZW91dCAtIFRoZSBpbnRlcnZhbCBiZWZvcmUgdGhlIG5leHQgYW5pbWF0aW9uIHN0YXJ0cy5cclxuXHQgKiBAcGFyYW0gc3BlZWQgLSBUaGUgYW5pbWF0aW9uIHNwZWVkIGZvciB0aGUgYW5pbWF0aW9ucy5cclxuXHQgKiBAcmV0dXJuXHJcblx0ICovXHJcblx0cHJpdmF0ZSBfZ2V0TmV4dFRpbWVvdXQodGltZW91dD86IG51bWJlciwgc3BlZWQ/OiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0aWYgKCB0aGlzLl90aW1lb3V0ICkge1xyXG5cdFx0XHR0aGlzLndpblJlZi5jbGVhclRpbWVvdXQodGhpcy5fdGltZW91dCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5faXNBcnRpZmljaWFsQXV0b3BsYXlUaW1lb3V0ID0gdGltZW91dCA/IHRydWUgOiBmYWxzZTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy53aW5SZWYuc2V0VGltZW91dCgoKSA9PntcclxuICAgICAgaWYgKHRoaXMuX3BhdXNlZCB8fCB0aGlzLmNhcm91c2VsU2VydmljZS5pcygnYnVzeScpIHx8IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmlzKCdpbnRlcmFjdGluZycpIHx8IHRoaXMuZG9jUmVmLmhpZGRlbikge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLmNhcm91c2VsU2VydmljZS5uZXh0KHNwZWVkIHx8IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9wbGF5U3BlZWQpO1xyXG4gICAgfSwgdGltZW91dCB8fCB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hdXRvcGxheVRpbWVvdXQpO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG5cdCAqIFNldHMgYXV0b3BsYXkgaW4gbW90aW9uLlxyXG5cdCAqL1xyXG4gIHByaXZhdGUgX3NldEF1dG9QbGF5SW50ZXJ2YWwodGltZW91dD86IG51bWJlcikge1xyXG5cdFx0dGhpcy5fdGltZW91dCA9IHRoaXMuX2dldE5leHRUaW1lb3V0KHRpbWVvdXQpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFN0b3BzIHRoZSBhdXRvcGxheS5cclxuXHQgKi9cclxuXHRzdG9wKCkge1xyXG5cdFx0aWYgKCF0aGlzLmNhcm91c2VsU2VydmljZS5pcygncm90YXRpbmcnKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcbiAgICB0aGlzLl9wYXVzZWQgPSB0cnVlO1xyXG5cclxuXHRcdHRoaXMud2luUmVmLmNsZWFyVGltZW91dCh0aGlzLl90aW1lb3V0KTtcclxuXHRcdHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmxlYXZlKCdyb3RhdGluZycpO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG5cdCAqIFN0b3BzIHRoZSBhdXRvcGxheS5cclxuXHQgKi9cclxuXHRwYXVzZSgpIHtcclxuXHRcdGlmICghdGhpcy5jYXJvdXNlbFNlcnZpY2UuaXMoJ3JvdGF0aW5nJykpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX3BhdXNlZCA9IHRydWU7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogTWFuYWdlcyBieSBhdXRvcGxheWluZyBhY2NvcmRpbmcgdG8gZGF0YSBwYXNzZWQgYnkgX2NoYW5nZWRTZXR0aW5nc0Nhcm91c2VsJCBPYnNhcnZhYmxlXHJcbiAgICogQHBhcmFtIGRhdGEgb2JqZWN0IHdpdGggY3VycmVudCBwb3NpdGlvbiBvZiBjYXJvdXNlbCBhbmQgdHlwZSBvZiBjaGFuZ2VcclxuICAgKi9cclxuICBwcml2YXRlIF9oYW5kbGVDaGFuZ2VPYnNlcnZhYmxlKGRhdGE6IGFueSkge1xyXG4gICAgaWYgKGRhdGEucHJvcGVydHkubmFtZSA9PT0gJ3NldHRpbmdzJykge1xyXG4gICAgICBpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b3BsYXkpIHtcclxuICAgICAgICB0aGlzLnBsYXkoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnN0b3AoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChkYXRhLnByb3BlcnR5Lm5hbWUgPT09ICdwb3NpdGlvbicpIHtcclxuICAgICAgLy9jb25zb2xlLmxvZygncGxheT8nLCBlKTtcclxuICAgICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9wbGF5KSB7XHJcbiAgICAgICAgdGhpcy5fc2V0QXV0b1BsYXlJbnRlcnZhbCgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdGFydHMgYXV0b3BsYXlpbmcgb2YgdGhlIGNhcm91c2VsIGluIHRoZSBjYXNlIHdoZW4gdXNlciBsZWF2ZXMgdGhlIGNhcm91c2VsIGJlZm9yZSBpdCBzdGFydHMgdHJhbnNsYXRlaW5nIChtb3ZpbmcpXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfcGxheUFmdGVyVHJhbnNsYXRlZCgpIHtcclxuICAgIG9mKCd0cmFuc2xhdGVkJykucGlwZShcclxuICAgICAgc3dpdGNoTWFwKGRhdGEgPT4gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0VHJhbnNsYXRlZFN0YXRlKCkpLFxyXG4gICAgICBmaXJzdCgpLFxyXG4gICAgICBmaWx0ZXIoKCkgPT4gdGhpcy5faXNBcnRpZmljaWFsQXV0b3BsYXlUaW1lb3V0KSxcclxuICAgICAgdGFwKCgpID0+IHRoaXMuX3NldEF1dG9QbGF5SW50ZXJ2YWwoKSlcclxuICAgICkuc3Vic2NyaWJlKCgpID0+IHsgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdGFydHMgcGF1c2luZ1xyXG4gICAqL1xyXG4gIHN0YXJ0UGF1c2luZygpIHtcclxuICAgIGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hdXRvcGxheUhvdmVyUGF1c2UgJiYgdGhpcy5jYXJvdXNlbFNlcnZpY2UuaXMoJ3JvdGF0aW5nJykpIHtcclxuICAgICAgdGhpcy5wYXVzZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnRzIHBsYXlpbmcgYWZ0ZXIgbW91c2UgbGVhdmVzIGNhcm91c2VsXHJcbiAgICovXHJcbiAgc3RhcnRQbGF5aW5nTW91c2VMZWF2ZSgpIHtcclxuICAgIGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hdXRvcGxheUhvdmVyUGF1c2UgJiYgdGhpcy5jYXJvdXNlbFNlcnZpY2UuaXMoJ3JvdGF0aW5nJykpIHtcclxuICAgICAgdGhpcy5wbGF5KCk7XHJcbiAgICAgIHRoaXMuX3BsYXlBZnRlclRyYW5zbGF0ZWQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0YXJ0cyBwbGF5aW5nIGFmdGVyIHRvdWNoIGVuZHNcclxuICAgKi9cclxuICBzdGFydFBsYXlpbmdUb3VjaEVuZCgpIHtcclxuICAgIGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hdXRvcGxheUhvdmVyUGF1c2UgJiYgdGhpcy5jYXJvdXNlbFNlcnZpY2UuaXMoJ3JvdGF0aW5nJykpIHtcclxuICAgICAgdGhpcy5wbGF5KCk7XHJcbiAgICAgIHRoaXMuX3BsYXlBZnRlclRyYW5zbGF0ZWQoKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19
