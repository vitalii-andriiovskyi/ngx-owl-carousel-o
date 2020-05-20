/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { CarouselService } from './carousel.service';
import { merge } from 'rxjs';
import { tap, filter } from 'rxjs/operators';
var NavigationService = /** @class */ (function () {
    function NavigationService(carouselService) {
        this.carouselService = carouselService;
        /**
         * Indicates whether the plugin is initialized or not.
         */
        this._initialized = false;
        /**
         * The current paging indexes.
         */
        this._pages = [];
        /**
         * Data for navigation elements of the user interface.
         */
        this._navData = {
            disabled: false,
            prev: {
                disabled: false,
                htmlText: ''
            },
            next: {
                disabled: false,
                htmlText: ''
            },
        };
        /**
         * Data for dot elements of the user interface.
         */
        this._dotsData = {
            disabled: false,
            dots: []
        };
        this.spyDataStreams();
    }
    NavigationService.prototype.ngOnDestroy = function () {
        this.navSubscription.unsubscribe();
    };
    /**
     * Defines Observables which service must observe
     */
    NavigationService.prototype.spyDataStreams = function () {
        var _this = this;
        /** @type {?} */
        var initializedCarousel$ = this.carouselService.getInitializedState().pipe(tap((/**
         * @param {?} state
         * @return {?}
         */
        function (state) {
            _this.initialize();
            _this._updateNavPages();
            _this.draw();
            _this.update();
            _this.carouselService.sendChanges();
        })));
        // mostly changes in carouselService and carousel at all causes carouselService.to(). It moves stage right-left by its code and calling needed functions
        // Thus this method by calling carouselService.current(position) notifies about changes
        /** @type {?} */
        var changedSettings$ = this.carouselService.getChangedState().pipe(filter((/**
         * @param {?} data
         * @return {?}
         */
        function (data) { return data.property.name === 'position'; })), tap((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            _this.update();
            // should be the call of the function written at the end of comment
            // but the method carouselServive.to() has setTimeout(f, 0) which contains carouselServive.update() which calls sendChanges() method.
            // carouselService.navData and carouselService.dotsData update earlier than carouselServive.update() gets called
            // updates of carouselService.navData and carouselService.dotsData are being happening withing carouselService.current(position) method which calls next() of _changedSettingsCarousel$
            // carouselService.current(position) is being calling earlier than carouselServive.update();
            // this.carouselService.sendChanges();
        })));
        /** @type {?} */
        var refreshedCarousel$ = this.carouselService.getRefreshedState().pipe(tap((/**
         * @return {?}
         */
        function () {
            _this._updateNavPages();
            _this.draw();
            _this.update();
            _this.carouselService.sendChanges();
        })));
        /** @type {?} */
        var navMerge$ = merge(initializedCarousel$, changedSettings$, refreshedCarousel$);
        this.navSubscription = navMerge$.subscribe((/**
         * @return {?}
         */
        function () { }));
    };
    /**
       * Initializes the layout of the plugin and extends the carousel.
       */
    NavigationService.prototype.initialize = function () {
        this._navData.disabled = true;
        this._navData.prev.htmlText = this.carouselService.settings.navText[0];
        this._navData.next.htmlText = this.carouselService.settings.navText[1];
        this._dotsData.disabled = true;
        this.carouselService.navData = this._navData;
        this.carouselService.dotsData = this._dotsData;
    };
    /**
     * Calculates internal states and updates prop _pages
     */
    /**
     * Calculates internal states and updates prop _pages
     * @private
     * @return {?}
     */
    NavigationService.prototype._updateNavPages = /**
     * Calculates internal states and updates prop _pages
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var i;
        /** @type {?} */
        var j;
        /** @type {?} */
        var k;
        /** @type {?} */
        var lower = this.carouselService.clones().length / 2;
        /** @type {?} */
        var upper = lower + this.carouselService.items().length;
        /** @type {?} */
        var maximum = this.carouselService.maximum(true);
        /** @type {?} */
        var pages = [];
        /** @type {?} */
        var settings = this.carouselService.settings;
        /** @type {?} */
        var size = settings.center || settings.autoWidth || settings.dotsData
            ? 1 : settings.dotsEach || settings.items;
        size = +size;
        if (settings.slideBy !== 'page') {
            settings.slideBy = Math.min(+settings.slideBy, settings.items);
        }
        if (settings.dots || settings.slideBy === 'page') {
            for (i = lower, j = 0, k = 0; i < upper; i++) {
                if (j >= size || j === 0) {
                    pages.push({
                        start: Math.min(maximum, i - lower),
                        end: i - lower + size - 1
                    });
                    if (Math.min(maximum, i - lower) === maximum) {
                        break;
                    }
                    j = 0, ++k;
                }
                j += this.carouselService.mergers(this.carouselService.relative(i));
            }
        }
        this._pages = pages;
    };
    /**
       * Draws the user interface.
       * @todo The option `dotsData` wont work.
       */
    NavigationService.prototype.draw = function () {
        var _this = this;
        var difference;
        var settings = this.carouselService.settings, items = this.carouselService.items(), disabled = items.length <= settings.items;
        this._navData.disabled = !settings.nav || disabled;
        this._dotsData.disabled = !settings.dots || disabled;
        if (settings.dots) {
            difference = this._pages.length - this._dotsData.dots.length;
            if (settings.dotsData && difference !== 0) {
                this._dotsData.dots = [];
                items.forEach((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) {
                    _this._dotsData.dots.push({
                        active: false,
                        id: "dot-" + item.id,
                        innerContent: item.dotContent,
                        showInnerContent: true
                    });
                }));
            }
            else if (difference > 0) {
                var startI = this._dotsData.dots.length > 0 ? this._dotsData.dots.length : 0;
                for (var i = 0; i < difference; i++) {
                    this._dotsData.dots.push({
                        active: false,
                        id: "dot-" + (i + startI),
                        innerContent: '',
                        showInnerContent: false
                    });
                }
            }
            else if (difference < 0) {
                this._dotsData.dots.splice(difference, Math.abs(difference));
            }
        }
        this.carouselService.navData = this._navData;
        this.carouselService.dotsData = this._dotsData;
    };
    ;
    /**
     * Updates navigation buttons's and dots's states
     */
    NavigationService.prototype.update = function () {
        this._updateNavButtons();
        this._updateDots();
    };
    /**
     * Changes state of nav buttons (disabled, enabled)
     */
    /**
     * Changes state of nav buttons (disabled, enabled)
     * @private
     * @return {?}
     */
    NavigationService.prototype._updateNavButtons = /**
     * Changes state of nav buttons (disabled, enabled)
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var settings = this.carouselService.settings;
        /** @type {?} */
        var loop = settings.loop || settings.rewind;
        /** @type {?} */
        var index = this.carouselService.relative(this.carouselService.current());
        if (settings.nav) {
            this._navData.prev.disabled = !loop && index <= this.carouselService.minimum(true);
            this._navData.next.disabled = !loop && index >= this.carouselService.maximum(true);
        }
        this.carouselService.navData = this._navData;
    };
    /**
     * Changes active dot if page becomes changed
     */
    /**
     * Changes active dot if page becomes changed
     * @private
     * @return {?}
     */
    NavigationService.prototype._updateDots = /**
     * Changes active dot if page becomes changed
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var curActiveDotI;
        if (!this.carouselService.settings.dots) {
            return;
        }
        this._dotsData.dots.forEach((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            if (item.active === true) {
                item.active = false;
            }
        }));
        curActiveDotI = this._current();
        if (this._dotsData.dots.length) {
            this._dotsData.dots[curActiveDotI].active = true;
        }
        this.carouselService.dotsData = this._dotsData;
    };
    /**
       * Gets the current page position of the carousel.
       * @returns the current page position of the carousel
       */
    /**
     * Gets the current page position of the carousel.
     * @private
     * @return {?} the current page position of the carousel
     */
    NavigationService.prototype._current = /**
     * Gets the current page position of the carousel.
     * @private
     * @return {?} the current page position of the carousel
     */
    function () {
        /** @type {?} */
        var current = this.carouselService.relative(this.carouselService.current());
        var finalCurrent;
        /** @type {?} */
        var pages = this._pages.filter((/**
         * @param {?} page
         * @param {?} index
         * @return {?}
         */
        function (page, index) {
            return page.start <= current && page.end >= current;
        })).pop();
        finalCurrent = this._pages.findIndex((/**
         * @param {?} page
         * @return {?}
         */
        function (page) {
            return page.start === pages.start && page.end === pages.end;
        }));
        return finalCurrent;
    };
    ;
    /**
       * Gets the current succesor/predecessor position.
     * @param sussessor position of slide
       * @returns the current succesor/predecessor position
       */
    /**
     * Gets the current succesor/predecessor position.
     * @private
     * @param {?} successor
     * @return {?} the current succesor/predecessor position
     */
    NavigationService.prototype._getPosition = /**
     * Gets the current succesor/predecessor position.
     * @private
     * @param {?} successor
     * @return {?} the current succesor/predecessor position
     */
    function (successor) {
        /** @type {?} */
        var position;
        /** @type {?} */
        var length;
        /** @type {?} */
        var settings = this.carouselService.settings;
        if (settings.slideBy === 'page') {
            position = this._current();
            length = this._pages.length;
            successor ? ++position : --position;
            position = this._pages[((position % length) + length) % length].start;
        }
        else {
            position = this.carouselService.relative(this.carouselService.current());
            length = this.carouselService.items().length;
            successor ? position += +settings.slideBy : position -= +settings.slideBy;
        }
        return position;
    };
    ;
    /**
       * Slides to the next item or page.
       * @param speed The time in milliseconds for the transition.
       */
    NavigationService.prototype.next = function (speed) {
        this.carouselService.to(this._getPosition(true), speed);
    };
    ;
    /**
     * Slides to the previous item or page.
     * @param speed The time in milliseconds for the transition.
     */
    NavigationService.prototype.prev = function (speed) {
        this.carouselService.to(this._getPosition(false), speed);
    };
    ;
    /**
     * Slides to the specified item or page.
     * @param position - The position of the item or page.
     * @param speed - The time in milliseconds for the transition.
     * @param standard - Whether to use the standard behaviour or not. Default meaning false
     */
    NavigationService.prototype.to = function (position, speed, standard) {
        var length;
        if (!standard && this._pages.length) {
            length = this._pages.length;
            this.carouselService.to(this._pages[((position % length) + length) % length].start, speed);
        }
        else {
            this.carouselService.to(position, speed);
        }
    };
    ;
    /**
     * Moves carousel after user's clicking on any dots
     */
    /**
     * Moves carousel after user's clicking on any dots
     * @param {?} dotId
     * @return {?}
     */
    NavigationService.prototype.moveByDot = /**
     * Moves carousel after user's clicking on any dots
     * @param {?} dotId
     * @return {?}
     */
    function (dotId) {
        /** @type {?} */
        var index = this._dotsData.dots.findIndex((/**
         * @param {?} dot
         * @return {?}
         */
        function (dot) { return dotId === dot.id; }));
        this.to(index, this.carouselService.settings.dotsSpeed);
    };
    /**
     * rewinds carousel to slide with needed id
     * @param id id of slide
     */
    /**
     * rewinds carousel to slide with needed id
     * @param {?} id id of slide
     * @return {?}
     */
    NavigationService.prototype.toSlideById = /**
     * rewinds carousel to slide with needed id
     * @param {?} id id of slide
     * @return {?}
     */
    function (id) {
        /** @type {?} */
        var position = this.carouselService.slidesData.findIndex((/**
         * @param {?} slide
         * @return {?}
         */
        function (slide) { return slide.id === id && slide.isCloned === false; }));
        if (position === -1 || position === this.carouselService.current()) {
            return;
        }
        this.carouselService.to(this.carouselService.relative(position), false);
    };
    NavigationService.ctorParameters = function () { return [
        { type: CarouselService }
    ]; };
    NavigationService = __decorate([
        Injectable()
    ], NavigationService);
    return NavigationService;
}());
export { NavigationService };
if (false) {
    /**
     * Subscrioption to merge Observable  from CarouselService
     * @type {?}
     */
    NavigationService.prototype.navSubscription;
    /**
     * Indicates whether the plugin is initialized or not.
     * @type {?}
     * @protected
     */
    NavigationService.prototype._initialized;
    /**
     * The current paging indexes.
     * @type {?}
     * @protected
     */
    NavigationService.prototype._pages;
    /**
     * Data for navigation elements of the user interface.
     * @type {?}
     * @protected
     */
    NavigationService.prototype._navData;
    /**
     * Data for dot elements of the user interface.
     * @type {?}
     * @protected
     */
    NavigationService.prototype._dotsData;
    /**
     * @type {?}
     * @private
     */
    NavigationService.prototype.carouselService;
    /* Skipping unhandled member: ;*/
    /* Skipping unhandled member: ;*/
    /* Skipping unhandled member: ;*/
    /* Skipping unhandled member: ;*/
    /* Skipping unhandled member: ;*/
    /* Skipping unhandled member: ;*/
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW93bC1jYXJvdXNlbC1vLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL25hdmlnYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUd0RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDckQsT0FBTyxFQUE0QixLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdkQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUc3QztJQXdDRSwyQkFBb0IsZUFBZ0M7UUFBaEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBakNwRDs7V0FFRztRQUNPLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBRS9COztXQUVHO1FBQ08sV0FBTSxHQUFVLEVBQUUsQ0FBQztRQUU3Qjs7V0FFRztRQUNPLGFBQVEsR0FBWTtZQUM1QixRQUFRLEVBQUUsS0FBSztZQUNmLElBQUksRUFBRTtnQkFDSixRQUFRLEVBQUUsS0FBSztnQkFDZixRQUFRLEVBQUUsRUFBRTthQUNiO1lBQ0QsSUFBSSxFQUFFO2dCQUNKLFFBQVEsRUFBRSxLQUFLO2dCQUNmLFFBQVEsRUFBRSxFQUFFO2FBQ2I7U0FDRixDQUFDO1FBRUY7O1dBRUc7UUFDTyxjQUFTLEdBQWE7WUFDOUIsUUFBUSxFQUFFLEtBQUs7WUFDZixJQUFJLEVBQUUsRUFBRTtTQUNULENBQUM7UUFHQSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7OztJQUVELHVDQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVEOztPQUVHOzs7OztJQUNILDBDQUFjOzs7O0lBQWQ7UUFBQSxpQkF1Q0M7O1lBdENPLG9CQUFvQixH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LENBQUM7SUFDMUQsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gsdUNBQVc7Ozs7O0lBQVgsVUFBWSxFQUFVOztZQUNkLFFBQVEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxTQUFTOzs7O1FBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxLQUFLLENBQUMsUUFBUSxLQUFLLEtBQUssRUFBM0MsQ0FBMkMsRUFBQztRQUVoSCxFQUFFLENBQUMsQ0FBQyxRQUFRLEtBQUssQ0FBQyxDQUFDLElBQUksUUFBUSxLQUFLLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ25FLE1BQU0sQ0FBQztRQUNULENBQUM7UUFFSCxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN4RSxDQUFDOztnQkF0VUYsVUFBVTs7O2dCQUxGLGVBQWU7O0lBNlV4Qix3QkFBQztDQUFBLEFBeFVELElBd1VDO1NBdlVZLGlCQUFpQjs7Ozs7O0lBSTVCLDRDQUE4Qjs7Ozs7O0lBSzlCLHlDQUErQjs7Ozs7O0lBSy9CLG1DQUE2Qjs7Ozs7O0lBSzdCLHFDQVVFOzs7Ozs7SUFLRixzQ0FHRTs7Ozs7SUFFVSw0Q0FBd0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTmF2RGF0YSwgRG90c0RhdGEgfSBmcm9tICcuLi9tb2RlbHMvbmF2aWdhdGlvbi1kYXRhLm1vZGVscyc7XHJcbmltcG9ydCB7IENhcm91c2VsU2xpZGVEaXJlY3RpdmUgfSBmcm9tICcuLi9jYXJvdXNlbC9jYXJvdXNlbC5tb2R1bGUnO1xyXG5pbXBvcnQgeyBDYXJvdXNlbFNlcnZpY2UgfSBmcm9tICcuL2Nhcm91c2VsLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIE9ic2VydmFibGUsIG1lcmdlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IHRhcCwgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBPd2xPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWxzL293bC1vcHRpb25zLm1vZGVsJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE5hdmlnYXRpb25TZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcclxuICAvKipcclxuICAgKiBTdWJzY3Jpb3B0aW9uIHRvIG1lcmdlIE9ic2VydmFibGUgIGZyb20gQ2Fyb3VzZWxTZXJ2aWNlXHJcbiAgICovXHJcbiAgbmF2U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBwbHVnaW4gaXMgaW5pdGlhbGl6ZWQgb3Igbm90LlxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBfaW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGN1cnJlbnQgcGFnaW5nIGluZGV4ZXMuXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIF9wYWdlczogYW55W10gPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogRGF0YSBmb3IgbmF2aWdhdGlvbiBlbGVtZW50cyBvZiB0aGUgdXNlciBpbnRlcmZhY2UuXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIF9uYXZEYXRhOiBOYXZEYXRhID0ge1xyXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgcHJldjoge1xyXG4gICAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICAgIGh0bWxUZXh0OiAnJ1xyXG4gICAgfSxcclxuICAgIG5leHQ6IHtcclxuICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgICBodG1sVGV4dDogJydcclxuICAgIH0sXHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogRGF0YSBmb3IgZG90IGVsZW1lbnRzIG9mIHRoZSB1c2VyIGludGVyZmFjZS5cclxuICAgKi9cclxuICBwcm90ZWN0ZWQgX2RvdHNEYXRhOiBEb3RzRGF0YSA9IHtcclxuICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgIGRvdHM6IFtdXHJcbiAgfTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjYXJvdXNlbFNlcnZpY2U6IENhcm91c2VsU2VydmljZSkge1xyXG4gICAgdGhpcy5zcHlEYXRhU3RyZWFtcygpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLm5hdlN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVmaW5lcyBPYnNlcnZhYmxlcyB3aGljaCBzZXJ2aWNlIG11c3Qgb2JzZXJ2ZVxyXG4gICAqL1xyXG4gIHNweURhdGFTdHJlYW1zKCkge1xyXG4gICAgY29uc3QgaW5pdGlhbGl6ZWRDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldEluaXRpYWxpemVkU3RhdGUoKS5waXBlKFxyXG4gICAgICB0YXAoc3RhdGUgPT4ge1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZU5hdlBhZ2VzKCk7XHJcbiAgICAgICAgdGhpcy5kcmF3KCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgICB0aGlzLmNhcm91c2VsU2VydmljZS5zZW5kQ2hhbmdlcygpO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBtb3N0bHkgY2hhbmdlcyBpbiBjYXJvdXNlbFNlcnZpY2UgYW5kIGNhcm91c2VsIGF0IGFsbCBjYXVzZXMgY2Fyb3VzZWxTZXJ2aWNlLnRvKCkuIEl0IG1vdmVzIHN0YWdlIHJpZ2h0LWxlZnQgYnkgaXRzIGNvZGUgYW5kIGNhbGxpbmcgbmVlZGVkIGZ1bmN0aW9uc1xyXG4gICAgLy8gVGh1cyB0aGlzIG1ldGhvZCBieSBjYWxsaW5nIGNhcm91c2VsU2VydmljZS5jdXJyZW50KHBvc2l0aW9uKSBub3RpZmllcyBhYm91dCBjaGFuZ2VzXHJcbiAgICBjb25zdCBjaGFuZ2VkU2V0dGluZ3MkOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRDaGFuZ2VkU3RhdGUoKS5waXBlKFxyXG4gICAgICBmaWx0ZXIoZGF0YSA9PiBkYXRhLnByb3BlcnR5Lm5hbWUgPT09ICdwb3NpdGlvbicpLFxyXG4gICAgICB0YXAoZGF0YSA9PiB7XHJcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgICAvLyBzaG91bGQgYmUgdGhlIGNhbGwgb2YgdGhlIGZ1bmN0aW9uIHdyaXR0ZW4gYXQgdGhlIGVuZCBvZiBjb21tZW50XHJcbiAgICAgICAgLy8gYnV0IHRoZSBtZXRob2QgY2Fyb3VzZWxTZXJ2aXZlLnRvKCkgaGFzIHNldFRpbWVvdXQoZiwgMCkgd2hpY2ggY29udGFpbnMgY2Fyb3VzZWxTZXJ2aXZlLnVwZGF0ZSgpIHdoaWNoIGNhbGxzIHNlbmRDaGFuZ2VzKCkgbWV0aG9kLlxyXG4gICAgICAgIC8vIGNhcm91c2VsU2VydmljZS5uYXZEYXRhIGFuZCBjYXJvdXNlbFNlcnZpY2UuZG90c0RhdGEgdXBkYXRlIGVhcmxpZXIgdGhhbiBjYXJvdXNlbFNlcnZpdmUudXBkYXRlKCkgZ2V0cyBjYWxsZWRcclxuICAgICAgICAvLyB1cGRhdGVzIG9mIGNhcm91c2VsU2VydmljZS5uYXZEYXRhIGFuZCBjYXJvdXNlbFNlcnZpY2UuZG90c0RhdGEgYXJlIGJlaW5nIGhhcHBlbmluZyB3aXRoaW5nIGNhcm91c2VsU2VydmljZS5jdXJyZW50KHBvc2l0aW9uKSBtZXRob2Qgd2hpY2ggY2FsbHMgbmV4dCgpIG9mIF9jaGFuZ2VkU2V0dGluZ3NDYXJvdXNlbCRcclxuICAgICAgICAvLyBjYXJvdXNlbFNlcnZpY2UuY3VycmVudChwb3NpdGlvbikgaXMgYmVpbmcgY2FsbGluZyBlYXJsaWVyIHRoYW4gY2Fyb3VzZWxTZXJ2aXZlLnVwZGF0ZSgpO1xyXG4gICAgICAgIC8vIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNlbmRDaGFuZ2VzKCk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IHJlZnJlc2hlZENhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0UmVmcmVzaGVkU3RhdGUoKS5waXBlKFxyXG4gICAgICB0YXAoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZU5hdlBhZ2VzKCk7XHJcbiAgICAgICAgdGhpcy5kcmF3KCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgICB0aGlzLmNhcm91c2VsU2VydmljZS5zZW5kQ2hhbmdlcygpO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBuYXZNZXJnZSQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IG1lcmdlKGluaXRpYWxpemVkQ2Fyb3VzZWwkLCBjaGFuZ2VkU2V0dGluZ3MkLCByZWZyZXNoZWRDYXJvdXNlbCQpO1xyXG4gICAgdGhpcy5uYXZTdWJzY3JpcHRpb24gPSBuYXZNZXJnZSQuc3Vic2NyaWJlKFxyXG4gICAgICAoKSA9PiB7fVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEluaXRpYWxpemVzIHRoZSBsYXlvdXQgb2YgdGhlIHBsdWdpbiBhbmQgZXh0ZW5kcyB0aGUgY2Fyb3VzZWwuXHJcblx0ICovXHJcblx0aW5pdGlhbGl6ZSgpIHtcclxuICAgIHRoaXMuX25hdkRhdGEuZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5fbmF2RGF0YS5wcmV2Lmh0bWxUZXh0ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MubmF2VGV4dFswXTtcclxuICAgIHRoaXMuX25hdkRhdGEubmV4dC5odG1sVGV4dCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLm5hdlRleHRbMV07XHJcblxyXG4gICAgdGhpcy5fZG90c0RhdGEuZGlzYWJsZWQgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm5hdkRhdGEgPSB0aGlzLl9uYXZEYXRhO1xyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UuZG90c0RhdGEgPSB0aGlzLl9kb3RzRGF0YTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbGN1bGF0ZXMgaW50ZXJuYWwgc3RhdGVzIGFuZCB1cGRhdGVzIHByb3AgX3BhZ2VzXHJcbiAgICovXHJcblx0cHJpdmF0ZSBfdXBkYXRlTmF2UGFnZXMoKSB7XHJcblx0XHRsZXQgaTogbnVtYmVyLCBqOiBudW1iZXIsIGs6IG51bWJlcjtcclxuXHRcdGNvbnN0IGxvd2VyOiBudW1iZXIgPSB0aGlzLmNhcm91c2VsU2VydmljZS5jbG9uZXMoKS5sZW5ndGggLyAyLFxyXG4gICAgICB1cHBlcjogbnVtYmVyID0gbG93ZXIgKyB0aGlzLmNhcm91c2VsU2VydmljZS5pdGVtcygpLmxlbmd0aCxcclxuICAgICAgbWF4aW11bTogbnVtYmVyID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UubWF4aW11bSh0cnVlKSxcclxuICAgICAgcGFnZXM6IGFueVtdID0gW10sXHJcbiAgICAgIHNldHRpbmdzOiBPd2xPcHRpb25zID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3M7XHJcbiAgICAgbGV0IHNpemUgPSBzZXR0aW5ncy5jZW50ZXIgfHwgc2V0dGluZ3MuYXV0b1dpZHRoIHx8IHNldHRpbmdzLmRvdHNEYXRhXHJcbiAgICAgICAgPyAxIDogc2V0dGluZ3MuZG90c0VhY2ggfHwgc2V0dGluZ3MuaXRlbXM7XHJcbiAgICAgIHNpemUgPSArc2l6ZTtcclxuXHRcdGlmIChzZXR0aW5ncy5zbGlkZUJ5ICE9PSAncGFnZScpIHtcclxuXHRcdFx0c2V0dGluZ3Muc2xpZGVCeSA9IE1hdGgubWluKCtzZXR0aW5ncy5zbGlkZUJ5LCBzZXR0aW5ncy5pdGVtcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHNldHRpbmdzLmRvdHMgfHwgc2V0dGluZ3Muc2xpZGVCeSA9PT0gJ3BhZ2UnKSB7XHJcblxyXG5cdFx0XHRmb3IgKGkgPSBsb3dlciwgaiA9IDAsIGsgPSAwOyBpIDwgdXBwZXI7IGkrKykge1xyXG5cdFx0XHRcdGlmIChqID49IHNpemUgfHwgaiA9PT0gMCkge1xyXG5cdFx0XHRcdFx0cGFnZXMucHVzaCh7XHJcblx0XHRcdFx0XHRcdHN0YXJ0OiBNYXRoLm1pbihtYXhpbXVtLCBpIC0gbG93ZXIpLFxyXG5cdFx0XHRcdFx0XHRlbmQ6IGkgLSBsb3dlciArIHNpemUgLSAxXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdGlmIChNYXRoLm1pbihtYXhpbXVtLCBpIC0gbG93ZXIpID09PSBtYXhpbXVtKSB7XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0aiA9IDAsICsraztcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aiArPSB0aGlzLmNhcm91c2VsU2VydmljZS5tZXJnZXJzKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnJlbGF0aXZlKGkpKSBhcyBudW1iZXI7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHRoaXMuX3BhZ2VzID0gcGFnZXM7XHJcblx0fVxyXG5cclxuICAvKipcclxuXHQgKiBEcmF3cyB0aGUgdXNlciBpbnRlcmZhY2UuXHJcblx0ICogQHRvZG8gVGhlIG9wdGlvbiBgZG90c0RhdGFgIHdvbnQgd29yay5cclxuXHQgKi9cclxuICBkcmF3KCkge1xyXG5cdFx0bGV0IGRpZmZlcmVuY2U6IG51bWJlcjtcclxuICAgIGNvbnN0XHRzZXR0aW5nczogT3dsT3B0aW9ucyA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLFxyXG4gICAgICBpdGVtczogQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZVtdID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuaXRlbXMoKSxcclxuICAgICAgZGlzYWJsZWQgPSBpdGVtcy5sZW5ndGggPD0gc2V0dGluZ3MuaXRlbXM7XHJcblxyXG5cdFx0dGhpcy5fbmF2RGF0YS5kaXNhYmxlZCA9ICFzZXR0aW5ncy5uYXYgfHwgZGlzYWJsZWQ7XHJcblx0XHR0aGlzLl9kb3RzRGF0YS5kaXNhYmxlZCA9ICFzZXR0aW5ncy5kb3RzIHx8IGRpc2FibGVkO1xyXG5cclxuXHRcdGlmIChzZXR0aW5ncy5kb3RzKSB7XHJcblx0XHRcdGRpZmZlcmVuY2UgPSB0aGlzLl9wYWdlcy5sZW5ndGggLSB0aGlzLl9kb3RzRGF0YS5kb3RzLmxlbmd0aDtcclxuXHJcblx0XHRcdGlmIChzZXR0aW5ncy5kb3RzRGF0YSAmJiBkaWZmZXJlbmNlICE9PSAwKSB7XHJcbiAgICAgICAgdGhpcy5fZG90c0RhdGEuZG90cyA9IFtdO1xyXG4gICAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICB0aGlzLl9kb3RzRGF0YS5kb3RzLnB1c2goe1xyXG4gICAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxyXG4gICAgICAgICAgICBpZDogYGRvdC0ke2l0ZW0uaWR9YCxcclxuICAgICAgICAgICAgaW5uZXJDb250ZW50OiBpdGVtLmRvdENvbnRlbnQsXHJcbiAgICAgICAgICAgIHNob3dJbm5lckNvbnRlbnQ6IHRydWVcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cdFx0XHR9IGVsc2UgaWYgKGRpZmZlcmVuY2UgPiAwKSB7XHJcbiAgICAgICAgY29uc3Qgc3RhcnRJOiBudW1iZXIgPSB0aGlzLl9kb3RzRGF0YS5kb3RzLmxlbmd0aCA+IDAgPyB0aGlzLl9kb3RzRGF0YS5kb3RzLmxlbmd0aCA6IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaWZmZXJlbmNlOyBpKyspIHtcclxuICAgICAgICAgIHRoaXMuX2RvdHNEYXRhLmRvdHMucHVzaCh7XHJcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGlkOiBgZG90LSR7aSArIHN0YXJ0SX1gLFxyXG4gICAgICAgICAgICBpbm5lckNvbnRlbnQ6ICcnLFxyXG4gICAgICAgICAgICBzaG93SW5uZXJDb250ZW50OiBmYWxzZVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cdFx0XHR9IGVsc2UgaWYgKGRpZmZlcmVuY2UgPCAwKSB7XHJcbiAgICAgICAgdGhpcy5fZG90c0RhdGEuZG90cy5zcGxpY2UoZGlmZmVyZW5jZSwgTWF0aC5hYnMoZGlmZmVyZW5jZSkpXHJcblx0XHRcdH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5uYXZEYXRhID0gdGhpcy5fbmF2RGF0YTtcclxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmRvdHNEYXRhID0gdGhpcy5fZG90c0RhdGE7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlcyBuYXZpZ2F0aW9uIGJ1dHRvbnMncyBhbmQgZG90cydzIHN0YXRlc1xyXG4gICAqL1xyXG4gIHVwZGF0ZSgpIHtcclxuICAgIHRoaXMuX3VwZGF0ZU5hdkJ1dHRvbnMoKTtcclxuICAgIHRoaXMuX3VwZGF0ZURvdHMoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoYW5nZXMgc3RhdGUgb2YgbmF2IGJ1dHRvbnMgKGRpc2FibGVkLCBlbmFibGVkKVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3VwZGF0ZU5hdkJ1dHRvbnMoKSB7XHJcbiAgICBjb25zdFx0c2V0dGluZ3M6IE93bE9wdGlvbnMgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncyxcclxuICAgICAgbG9vcDogYm9vbGVhbiA9IHNldHRpbmdzLmxvb3AgfHwgc2V0dGluZ3MucmV3aW5kLFxyXG4gICAgICBpbmRleDogbnVtYmVyID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UucmVsYXRpdmUodGhpcy5jYXJvdXNlbFNlcnZpY2UuY3VycmVudCgpKTtcclxuXHJcbiAgICBpZiAoc2V0dGluZ3MubmF2KSB7XHJcbiAgICAgIHRoaXMuX25hdkRhdGEucHJldi5kaXNhYmxlZCA9ICFsb29wICYmIGluZGV4IDw9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm1pbmltdW0odHJ1ZSk7XHJcblx0XHRcdHRoaXMuX25hdkRhdGEubmV4dC5kaXNhYmxlZCA9ICFsb29wICYmIGluZGV4ID49IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm1heGltdW0odHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UubmF2RGF0YSA9IHRoaXMuX25hdkRhdGE7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGFuZ2VzIGFjdGl2ZSBkb3QgaWYgcGFnZSBiZWNvbWVzIGNoYW5nZWRcclxuICAgKi9cclxuICBwcml2YXRlIF91cGRhdGVEb3RzKCkge1xyXG4gICAgbGV0IGN1ckFjdGl2ZURvdEk6IG51bWJlcjtcclxuXHJcbiAgICBpZighdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuZG90cykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLl9kb3RzRGF0YS5kb3RzLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgIGlmIChpdGVtLmFjdGl2ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIGl0ZW0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgY3VyQWN0aXZlRG90SSA9IHRoaXMuX2N1cnJlbnQoKTtcclxuICAgIGlmICh0aGlzLl9kb3RzRGF0YS5kb3RzLmxlbmd0aCkge1xyXG4gICAgICB0aGlzLl9kb3RzRGF0YS5kb3RzW2N1ckFjdGl2ZURvdEldLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5kb3RzRGF0YSA9IHRoaXMuX2RvdHNEYXRhO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcblx0ICogR2V0cyB0aGUgY3VycmVudCBwYWdlIHBvc2l0aW9uIG9mIHRoZSBjYXJvdXNlbC5cclxuXHQgKiBAcmV0dXJucyB0aGUgY3VycmVudCBwYWdlIHBvc2l0aW9uIG9mIHRoZSBjYXJvdXNlbFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgX2N1cnJlbnQoKTogYW55IHtcclxuICAgIGNvbnN0IGN1cnJlbnQ6IG51bWJlciA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnJlbGF0aXZlKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmN1cnJlbnQoKSk7XHJcbiAgICBsZXQgZmluYWxDdXJyZW50OiBudW1iZXI7XHJcbiAgICBjb25zdCBwYWdlczogYW55ID0gdGhpcy5fcGFnZXMuZmlsdGVyKChwYWdlLCBpbmRleCkgPT4ge1xyXG4gICAgICByZXR1cm4gcGFnZS5zdGFydCA8PSBjdXJyZW50ICYmIHBhZ2UuZW5kID49IGN1cnJlbnQ7XHJcbiAgICB9KS5wb3AoKTtcclxuXHJcbiAgICBmaW5hbEN1cnJlbnQgPSB0aGlzLl9wYWdlcy5maW5kSW5kZXgocGFnZSA9PiB7XHJcbiAgICAgIHJldHVybiBwYWdlLnN0YXJ0ID09PSBwYWdlcy5zdGFydCAmJiBwYWdlLmVuZCA9PT0gcGFnZXMuZW5kO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGZpbmFsQ3VycmVudDtcclxuICB9O1xyXG5cclxuICAvKipcclxuXHQgKiBHZXRzIHRoZSBjdXJyZW50IHN1Y2Nlc29yL3ByZWRlY2Vzc29yIHBvc2l0aW9uLlxyXG4gICAqIEBwYXJhbSBzdXNzZXNzb3IgcG9zaXRpb24gb2Ygc2xpZGVcclxuXHQgKiBAcmV0dXJucyB0aGUgY3VycmVudCBzdWNjZXNvci9wcmVkZWNlc3NvciBwb3NpdGlvblxyXG5cdCAqL1xyXG5cdHByaXZhdGUgX2dldFBvc2l0aW9uKHN1Y2Nlc3NvcjogbnVtYmVyIHwgYm9vbGVhbik6IG51bWJlciB7XHJcblx0XHRsZXQgcG9zaXRpb246IG51bWJlciwgbGVuZ3RoOiBudW1iZXI7XHJcblx0XHRjb25zdFx0c2V0dGluZ3M6IE93bE9wdGlvbnMgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncztcclxuXHJcblx0XHRpZiAoc2V0dGluZ3Muc2xpZGVCeSA9PT0gJ3BhZ2UnKSB7XHJcblx0XHRcdHBvc2l0aW9uID0gdGhpcy5fY3VycmVudCgpO1xyXG5cdFx0XHRsZW5ndGggPSB0aGlzLl9wYWdlcy5sZW5ndGg7XHJcblx0XHRcdHN1Y2Nlc3NvciA/ICsrcG9zaXRpb24gOiAtLXBvc2l0aW9uO1xyXG5cdFx0XHRwb3NpdGlvbiA9IHRoaXMuX3BhZ2VzWygocG9zaXRpb24gJSBsZW5ndGgpICsgbGVuZ3RoKSAlIGxlbmd0aF0uc3RhcnQ7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRwb3NpdGlvbiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnJlbGF0aXZlKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmN1cnJlbnQoKSk7XHJcblx0XHRcdGxlbmd0aCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLml0ZW1zKCkubGVuZ3RoO1xyXG5cdFx0XHRzdWNjZXNzb3IgPyBwb3NpdGlvbiArPSArc2V0dGluZ3Muc2xpZGVCeSA6IHBvc2l0aW9uIC09ICtzZXR0aW5ncy5zbGlkZUJ5O1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBwb3NpdGlvbjtcclxuICB9O1xyXG5cclxuICAvKipcclxuXHQgKiBTbGlkZXMgdG8gdGhlIG5leHQgaXRlbSBvciBwYWdlLlxyXG5cdCAqIEBwYXJhbSBzcGVlZCBUaGUgdGltZSBpbiBtaWxsaXNlY29uZHMgZm9yIHRoZSB0cmFuc2l0aW9uLlxyXG5cdCAqL1xyXG5cdG5leHQoc3BlZWQ6IG51bWJlciB8IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnRvKHRoaXMuX2dldFBvc2l0aW9uKHRydWUpLCBzcGVlZCk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogU2xpZGVzIHRvIHRoZSBwcmV2aW91cyBpdGVtIG9yIHBhZ2UuXHJcblx0ICogQHBhcmFtIHNwZWVkIFRoZSB0aW1lIGluIG1pbGxpc2Vjb25kcyBmb3IgdGhlIHRyYW5zaXRpb24uXHJcblx0ICovXHJcblx0cHJldihzcGVlZDogbnVtYmVyIHwgYm9vbGVhbikge1xyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UudG8odGhpcy5fZ2V0UG9zaXRpb24oZmFsc2UpLCBzcGVlZCk7XHJcbiAgfTtcclxuXHJcbiBcdC8qKlxyXG5cdCAqIFNsaWRlcyB0byB0aGUgc3BlY2lmaWVkIGl0ZW0gb3IgcGFnZS5cclxuXHQgKiBAcGFyYW0gcG9zaXRpb24gLSBUaGUgcG9zaXRpb24gb2YgdGhlIGl0ZW0gb3IgcGFnZS5cclxuXHQgKiBAcGFyYW0gc3BlZWQgLSBUaGUgdGltZSBpbiBtaWxsaXNlY29uZHMgZm9yIHRoZSB0cmFuc2l0aW9uLlxyXG5cdCAqIEBwYXJhbSBzdGFuZGFyZCAtIFdoZXRoZXIgdG8gdXNlIHRoZSBzdGFuZGFyZCBiZWhhdmlvdXIgb3Igbm90LiBEZWZhdWx0IG1lYW5pbmcgZmFsc2VcclxuXHQgKi9cclxuXHR0byhwb3NpdGlvbjogbnVtYmVyLCBzcGVlZDogbnVtYmVyIHwgYm9vbGVhbiwgc3RhbmRhcmQ/OiBib29sZWFuKSB7XHJcblx0XHRsZXQgbGVuZ3RoOiBudW1iZXI7XHJcblx0XHRpZiAoIXN0YW5kYXJkICYmIHRoaXMuX3BhZ2VzLmxlbmd0aCkge1xyXG4gICAgICBsZW5ndGggPSB0aGlzLl9wYWdlcy5sZW5ndGg7XHJcbiAgICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnRvKHRoaXMuX3BhZ2VzWygocG9zaXRpb24gJSBsZW5ndGgpICsgbGVuZ3RoKSAlIGxlbmd0aF0uc3RhcnQsIHNwZWVkKTtcclxuXHRcdH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnRvKHBvc2l0aW9uLCBzcGVlZCk7XHJcblx0XHR9XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogTW92ZXMgY2Fyb3VzZWwgYWZ0ZXIgdXNlcidzIGNsaWNraW5nIG9uIGFueSBkb3RzXHJcbiAgICovXHJcbiAgbW92ZUJ5RG90KGRvdElkOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IGluZGV4OiBudW1iZXIgPSB0aGlzLl9kb3RzRGF0YS5kb3RzLmZpbmRJbmRleChkb3QgPT4gZG90SWQgPT09IGRvdC5pZCk7XHJcbiAgICB0aGlzLnRvKGluZGV4LCB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5kb3RzU3BlZWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogcmV3aW5kcyBjYXJvdXNlbCB0byBzbGlkZSB3aXRoIG5lZWRlZCBpZFxyXG4gICAqIEBwYXJhbSBpZCBpZCBvZiBzbGlkZVxyXG4gICAqL1xyXG4gIHRvU2xpZGVCeUlkKGlkOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2xpZGVzRGF0YS5maW5kSW5kZXgoc2xpZGUgPT4gc2xpZGUuaWQgPT09IGlkICYmIHNsaWRlLmlzQ2xvbmVkID09PSBmYWxzZSk7XHJcblxyXG4gICAgaWYgKHBvc2l0aW9uID09PSAtMSB8fCBwb3NpdGlvbiA9PT0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuY3VycmVudCgpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcblx0XHR0aGlzLmNhcm91c2VsU2VydmljZS50byh0aGlzLmNhcm91c2VsU2VydmljZS5yZWxhdGl2ZShwb3NpdGlvbiksIGZhbHNlKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==
