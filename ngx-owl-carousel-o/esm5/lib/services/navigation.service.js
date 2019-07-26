import * as tslib_1 from "tslib";
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
        var initializedCarousel$ = this.carouselService.getInitializedState().pipe(tap(function (state) {
            _this.initialize();
            _this._updateNavPages();
            _this.draw();
            _this.update();
            _this.carouselService.sendChanges();
        }));
        // mostly changes in carouselService and carousel at all causes carouselService.to(). It moves stage right-left by its code and calling needed functions
        // Thus this method by calling carouselService.current(position) notifies about changes
        var changedSettings$ = this.carouselService.getChangedState().pipe(filter(function (data) { return data.property.name === 'position'; }), tap(function (data) {
            _this.update();
            // should be the call of the function written at the end of comment
            // but the method carouselServive.to() has setTimeout(f, 0) which contains carouselServive.update() which calls sendChanges() method.
            // carouselService.navData and carouselService.dotsData update earlier than carouselServive.update() gets called
            // updates of carouselService.navData and carouselService.dotsData are being happening withing carouselService.current(position) method which calls next() of _changedSettingsCarousel$
            // carouselService.current(position) is being calling earlier than carouselServive.update();
            // this.carouselService.sendChanges();
        }));
        var refreshedCarousel$ = this.carouselService.getRefreshedState().pipe(tap(function () {
            _this._updateNavPages();
            _this.draw();
            _this.update();
            _this.carouselService.sendChanges();
        }));
        var navMerge$ = merge(initializedCarousel$, changedSettings$, refreshedCarousel$);
        this.navSubscription = navMerge$.subscribe(function () { });
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
    NavigationService.prototype._updateNavPages = function () {
        var i, j, k;
        var lower = this.carouselService.clones().length / 2, upper = lower + this.carouselService.items().length, maximum = this.carouselService.maximum(true), pages = [], settings = this.carouselService.settings;
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
                items.forEach(function (item) {
                    _this._dotsData.dots.push({
                        active: false,
                        id: "dot-" + item.id,
                        innerContent: item.dotContent,
                        showInnerContent: true
                    });
                });
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
    NavigationService.prototype._updateNavButtons = function () {
        var settings = this.carouselService.settings, loop = settings.loop || settings.rewind, index = this.carouselService.relative(this.carouselService.current());
        if (settings.nav) {
            this._navData.prev.disabled = !loop && index <= this.carouselService.minimum(true);
            this._navData.next.disabled = !loop && index >= this.carouselService.maximum(true);
        }
        this.carouselService.navData = this._navData;
    };
    /**
     * Changes active dot if page becomes changed
     */
    NavigationService.prototype._updateDots = function () {
        var curActiveDotI;
        if (!this.carouselService.settings.dots) {
            return;
        }
        this._dotsData.dots.forEach(function (item) {
            if (item.active === true) {
                item.active = false;
            }
        });
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
    NavigationService.prototype._current = function () {
        var current = this.carouselService.relative(this.carouselService.current());
        var finalCurrent;
        var pages = this._pages.filter(function (page, index) {
            return page.start <= current && page.end >= current;
        }).pop();
        finalCurrent = this._pages.findIndex(function (page) {
            return page.start === pages.start && page.end === pages.end;
        });
        return finalCurrent;
    };
    ;
    /**
       * Gets the current succesor/predecessor position.
     * @param sussessor position of slide
       * @returns the current succesor/predecessor position
       */
    NavigationService.prototype._getPosition = function (successor) {
        var position, length;
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
    NavigationService.prototype.moveByDot = function (dotId) {
        var index = this._dotsData.dots.findIndex(function (dot) { return dotId === dot.id; });
        this.to(index, this.carouselService.settings.dotsSpeed);
    };
    /**
     * rewinds carousel to slide with needed id
     * @param id id of slide
     */
    NavigationService.prototype.toSlideById = function (id) {
        var position = this.carouselService.slidesData.findIndex(function (slide) { return slide.id === id && slide.isCloned === false; });
        if (position === -1 || position === this.carouselService.current()) {
            return;
        }
        this.carouselService.to(this.carouselService.relative(position), false);
    };
    NavigationService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [CarouselService])
    ], NavigationService);
    return NavigationService;
}());
export { NavigationService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW93bC1jYXJvdXNlbC1vLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL25hdmlnYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUd0RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDckQsT0FBTyxFQUE0QixLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdkQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUk3QztJQXVDRSwyQkFBb0IsZUFBZ0M7UUFBaEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBakNwRDs7V0FFRztRQUNPLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBRS9COztXQUVHO1FBQ08sV0FBTSxHQUFVLEVBQUUsQ0FBQztRQUU3Qjs7V0FFRztRQUNPLGFBQVEsR0FBWTtZQUM1QixRQUFRLEVBQUUsS0FBSztZQUNmLElBQUksRUFBRTtnQkFDSixRQUFRLEVBQUUsS0FBSztnQkFDZixRQUFRLEVBQUUsRUFBRTthQUNiO1lBQ0QsSUFBSSxFQUFFO2dCQUNKLFFBQVEsRUFBRSxLQUFLO2dCQUNmLFFBQVEsRUFBRSxFQUFFO2FBQ2I7U0FDRixDQUFDO1FBRUY7O1dBRUc7UUFDTyxjQUFTLEdBQWE7WUFDOUIsUUFBUSxFQUFFLEtBQUs7WUFDZixJQUFJLEVBQUUsRUFBRTtTQUNULENBQUM7UUFHQSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELHVDQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFRDs7T0FFRztJQUNILDBDQUFjLEdBQWQ7UUFBQSxpQkF1Q0M7UUF0Q0MsSUFBTSxvQkFBb0IsR0FBdUIsSUFBSSxD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T0F2Q3pDLGlCQUFpQixDQXVVN0I7SUFBRCx3QkFBQztDQUFBLEFBdlVELElBdVVDO1NBdlVZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOYXZEYXRhLCBEb3RzRGF0YSB9IGZyb20gJy4uL21vZGVscy9uYXZpZ2F0aW9uLWRhdGEubW9kZWxzJztcclxuaW1wb3J0IHsgQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZSB9IGZyb20gJy4uL2Nhcm91c2VsL2Nhcm91c2VsLm1vZHVsZSc7XHJcbmltcG9ydCB7IENhcm91c2VsU2VydmljZSB9IGZyb20gJy4vY2Fyb3VzZWwuc2VydmljZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgT2JzZXJ2YWJsZSwgbWVyZ2UgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgdGFwLCBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IE93bE9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbHMvb3dsLW9wdGlvbnMubW9kZWwnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgTmF2aWdhdGlvblNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlvcHRpb24gdG8gbWVyZ2UgT2JzZXJ2YWJsZSAgZnJvbSBDYXJvdXNlbFNlcnZpY2VcclxuICAgKi9cclxuICBuYXZTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHBsdWdpbiBpcyBpbml0aWFsaXplZCBvciBub3QuXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIF9pbml0aWFsaXplZCA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgY3VycmVudCBwYWdpbmcgaW5kZXhlcy5cclxuICAgKi9cclxuICBwcm90ZWN0ZWQgX3BhZ2VzOiBhbnlbXSA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiBEYXRhIGZvciBuYXZpZ2F0aW9uIGVsZW1lbnRzIG9mIHRoZSB1c2VyIGludGVyZmFjZS5cclxuICAgKi9cclxuICBwcm90ZWN0ZWQgX25hdkRhdGE6IE5hdkRhdGEgPSB7XHJcbiAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICBwcmV2OiB7XHJcbiAgICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgICAgaHRtbFRleHQ6ICcnXHJcbiAgICB9LFxyXG4gICAgbmV4dDoge1xyXG4gICAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICAgIGh0bWxUZXh0OiAnJ1xyXG4gICAgfSxcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBEYXRhIGZvciBkb3QgZWxlbWVudHMgb2YgdGhlIHVzZXIgaW50ZXJmYWNlLlxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBfZG90c0RhdGE6IERvdHNEYXRhID0ge1xyXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgZG90czogW11cclxuICB9O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhcm91c2VsU2VydmljZTogQ2Fyb3VzZWxTZXJ2aWNlKSB7XHJcbiAgICB0aGlzLnNweURhdGFTdHJlYW1zKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMubmF2U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZWZpbmVzIE9ic2VydmFibGVzIHdoaWNoIHNlcnZpY2UgbXVzdCBvYnNlcnZlXHJcbiAgICovXHJcbiAgc3B5RGF0YVN0cmVhbXMoKSB7XHJcbiAgICBjb25zdCBpbml0aWFsaXplZENhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0SW5pdGlhbGl6ZWRTdGF0ZSgpLnBpcGUoXHJcbiAgICAgIHRhcChzdGF0ZSA9PiB7XHJcbiAgICAgICAgdGhpcy5pbml0aWFsaXplKCk7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlTmF2UGFnZXMoKTtcclxuICAgICAgICB0aGlzLmRyYXcoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNlbmRDaGFuZ2VzKCk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIC8vIG1vc3RseSBjaGFuZ2VzIGluIGNhcm91c2VsU2VydmljZSBhbmQgY2Fyb3VzZWwgYXQgYWxsIGNhdXNlcyBjYXJvdXNlbFNlcnZpY2UudG8oKS4gSXQgbW92ZXMgc3RhZ2UgcmlnaHQtbGVmdCBieSBpdHMgY29kZSBhbmQgY2FsbGluZyBuZWVkZWQgZnVuY3Rpb25zXHJcbiAgICAvLyBUaHVzIHRoaXMgbWV0aG9kIGJ5IGNhbGxpbmcgY2Fyb3VzZWxTZXJ2aWNlLmN1cnJlbnQocG9zaXRpb24pIG5vdGlmaWVzIGFib3V0IGNoYW5nZXNcclxuICAgIGNvbnN0IGNoYW5nZWRTZXR0aW5ncyQ6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldENoYW5nZWRTdGF0ZSgpLnBpcGUoXHJcbiAgICAgIGZpbHRlcihkYXRhID0+IGRhdGEucHJvcGVydHkubmFtZSA9PT0gJ3Bvc2l0aW9uJyksXHJcbiAgICAgIHRhcChkYXRhID0+IHtcclxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgICAgIC8vIHNob3VsZCBiZSB0aGUgY2FsbCBvZiB0aGUgZnVuY3Rpb24gd3JpdHRlbiBhdCB0aGUgZW5kIG9mIGNvbW1lbnRcclxuICAgICAgICAvLyBidXQgdGhlIG1ldGhvZCBjYXJvdXNlbFNlcnZpdmUudG8oKSBoYXMgc2V0VGltZW91dChmLCAwKSB3aGljaCBjb250YWlucyBjYXJvdXNlbFNlcnZpdmUudXBkYXRlKCkgd2hpY2ggY2FsbHMgc2VuZENoYW5nZXMoKSBtZXRob2QuXHJcbiAgICAgICAgLy8gY2Fyb3VzZWxTZXJ2aWNlLm5hdkRhdGEgYW5kIGNhcm91c2VsU2VydmljZS5kb3RzRGF0YSB1cGRhdGUgZWFybGllciB0aGFuIGNhcm91c2VsU2Vydml2ZS51cGRhdGUoKSBnZXRzIGNhbGxlZFxyXG4gICAgICAgIC8vIHVwZGF0ZXMgb2YgY2Fyb3VzZWxTZXJ2aWNlLm5hdkRhdGEgYW5kIGNhcm91c2VsU2VydmljZS5kb3RzRGF0YSBhcmUgYmVpbmcgaGFwcGVuaW5nIHdpdGhpbmcgY2Fyb3VzZWxTZXJ2aWNlLmN1cnJlbnQocG9zaXRpb24pIG1ldGhvZCB3aGljaCBjYWxscyBuZXh0KCkgb2YgX2NoYW5nZWRTZXR0aW5nc0Nhcm91c2VsJFxyXG4gICAgICAgIC8vIGNhcm91c2VsU2VydmljZS5jdXJyZW50KHBvc2l0aW9uKSBpcyBiZWluZyBjYWxsaW5nIGVhcmxpZXIgdGhhbiBjYXJvdXNlbFNlcnZpdmUudXBkYXRlKCk7XHJcbiAgICAgICAgLy8gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2VuZENoYW5nZXMoKTtcclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgcmVmcmVzaGVkQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRSZWZyZXNoZWRTdGF0ZSgpLnBpcGUoXHJcbiAgICAgIHRhcCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlTmF2UGFnZXMoKTtcclxuICAgICAgICB0aGlzLmRyYXcoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNlbmRDaGFuZ2VzKCk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IG5hdk1lcmdlJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gbWVyZ2UoaW5pdGlhbGl6ZWRDYXJvdXNlbCQsIGNoYW5nZWRTZXR0aW5ncyQsIHJlZnJlc2hlZENhcm91c2VsJCk7XHJcbiAgICB0aGlzLm5hdlN1YnNjcmlwdGlvbiA9IG5hdk1lcmdlJC5zdWJzY3JpYmUoXHJcbiAgICAgICgpID0+IHt9XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcblx0ICogSW5pdGlhbGl6ZXMgdGhlIGxheW91dCBvZiB0aGUgcGx1Z2luIGFuZCBleHRlbmRzIHRoZSBjYXJvdXNlbC5cclxuXHQgKi9cclxuXHRpbml0aWFsaXplKCkge1xyXG4gICAgdGhpcy5fbmF2RGF0YS5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICB0aGlzLl9uYXZEYXRhLnByZXYuaHRtbFRleHQgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5uYXZUZXh0WzBdO1xyXG4gICAgdGhpcy5fbmF2RGF0YS5uZXh0Lmh0bWxUZXh0ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MubmF2VGV4dFsxXTtcclxuXHJcbiAgICB0aGlzLl9kb3RzRGF0YS5kaXNhYmxlZCA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UubmF2RGF0YSA9IHRoaXMuX25hdkRhdGE7XHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5kb3RzRGF0YSA9IHRoaXMuX2RvdHNEYXRhO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsY3VsYXRlcyBpbnRlcm5hbCBzdGF0ZXMgYW5kIHVwZGF0ZXMgcHJvcCBfcGFnZXNcclxuICAgKi9cclxuXHRwcml2YXRlIF91cGRhdGVOYXZQYWdlcygpIHtcclxuXHRcdGxldCBpOiBudW1iZXIsIGo6IG51bWJlciwgazogbnVtYmVyO1xyXG5cdFx0Y29uc3QgbG93ZXI6IG51bWJlciA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmNsb25lcygpLmxlbmd0aCAvIDIsXHJcbiAgICAgIHVwcGVyOiBudW1iZXIgPSBsb3dlciArIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLml0ZW1zKCkubGVuZ3RoLFxyXG4gICAgICBtYXhpbXVtOiBudW1iZXIgPSB0aGlzLmNhcm91c2VsU2VydmljZS5tYXhpbXVtKHRydWUpLFxyXG4gICAgICBwYWdlczogYW55W10gPSBbXSxcclxuICAgICAgc2V0dGluZ3M6IE93bE9wdGlvbnMgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncztcclxuICAgICBsZXQgc2l6ZSA9IHNldHRpbmdzLmNlbnRlciB8fCBzZXR0aW5ncy5hdXRvV2lkdGggfHwgc2V0dGluZ3MuZG90c0RhdGFcclxuICAgICAgICA/IDEgOiBzZXR0aW5ncy5kb3RzRWFjaCB8fCBzZXR0aW5ncy5pdGVtcztcclxuICAgICAgc2l6ZSA9ICtzaXplO1xyXG5cdFx0aWYgKHNldHRpbmdzLnNsaWRlQnkgIT09ICdwYWdlJykge1xyXG5cdFx0XHRzZXR0aW5ncy5zbGlkZUJ5ID0gTWF0aC5taW4oK3NldHRpbmdzLnNsaWRlQnksIHNldHRpbmdzLml0ZW1zKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoc2V0dGluZ3MuZG90cyB8fCBzZXR0aW5ncy5zbGlkZUJ5ID09PSAncGFnZScpIHtcclxuXHJcblx0XHRcdGZvciAoaSA9IGxvd2VyLCBqID0gMCwgayA9IDA7IGkgPCB1cHBlcjsgaSsrKSB7XHJcblx0XHRcdFx0aWYgKGogPj0gc2l6ZSB8fCBqID09PSAwKSB7XHJcblx0XHRcdFx0XHRwYWdlcy5wdXNoKHtcclxuXHRcdFx0XHRcdFx0c3RhcnQ6IE1hdGgubWluKG1heGltdW0sIGkgLSBsb3dlciksXHJcblx0XHRcdFx0XHRcdGVuZDogaSAtIGxvd2VyICsgc2l6ZSAtIDFcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0aWYgKE1hdGgubWluKG1heGltdW0sIGkgLSBsb3dlcikgPT09IG1heGltdW0pIHtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRqID0gMCwgKytrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRqICs9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm1lcmdlcnModGhpcy5jYXJvdXNlbFNlcnZpY2UucmVsYXRpdmUoaSkpIGFzIG51bWJlcjtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0dGhpcy5fcGFnZXMgPSBwYWdlcztcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIERyYXdzIHRoZSB1c2VyIGludGVyZmFjZS5cclxuXHQgKiBAdG9kbyBUaGUgb3B0aW9uIGBkb3RzRGF0YWAgd29udCB3b3JrLlxyXG5cdCAqL1xyXG4gIGRyYXcoKSB7XHJcblx0XHRsZXQgZGlmZmVyZW5jZTogbnVtYmVyO1xyXG4gICAgY29uc3RcdHNldHRpbmdzOiBPd2xPcHRpb25zID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MsXHJcbiAgICAgIGl0ZW1zOiBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlW10gPSB0aGlzLmNhcm91c2VsU2VydmljZS5pdGVtcygpLFxyXG4gICAgICBkaXNhYmxlZCA9IGl0ZW1zLmxlbmd0aCA8PSBzZXR0aW5ncy5pdGVtcztcclxuXHJcblx0XHR0aGlzLl9uYXZEYXRhLmRpc2FibGVkID0gIXNldHRpbmdzLm5hdiB8fCBkaXNhYmxlZDtcclxuXHRcdHRoaXMuX2RvdHNEYXRhLmRpc2FibGVkID0gIXNldHRpbmdzLmRvdHMgfHwgZGlzYWJsZWQ7XHJcblxyXG5cdFx0aWYgKHNldHRpbmdzLmRvdHMpIHtcclxuXHRcdFx0ZGlmZmVyZW5jZSA9IHRoaXMuX3BhZ2VzLmxlbmd0aCAtIHRoaXMuX2RvdHNEYXRhLmRvdHMubGVuZ3RoO1xyXG5cclxuXHRcdFx0aWYgKHNldHRpbmdzLmRvdHNEYXRhICYmIGRpZmZlcmVuY2UgIT09IDApIHtcclxuICAgICAgICB0aGlzLl9kb3RzRGF0YS5kb3RzID0gW107XHJcbiAgICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgIHRoaXMuX2RvdHNEYXRhLmRvdHMucHVzaCh7XHJcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGlkOiBgZG90LSR7aXRlbS5pZH1gLFxyXG4gICAgICAgICAgICBpbm5lckNvbnRlbnQ6IGl0ZW0uZG90Q29udGVudCxcclxuICAgICAgICAgICAgc2hvd0lubmVyQ29udGVudDogdHJ1ZVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblx0XHRcdH0gZWxzZSBpZiAoZGlmZmVyZW5jZSA+IDApIHtcclxuICAgICAgICBjb25zdCBzdGFydEk6IG51bWJlciA9IHRoaXMuX2RvdHNEYXRhLmRvdHMubGVuZ3RoID4gMCA/IHRoaXMuX2RvdHNEYXRhLmRvdHMubGVuZ3RoIDogMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpZmZlcmVuY2U7IGkrKykge1xyXG4gICAgICAgICAgdGhpcy5fZG90c0RhdGEuZG90cy5wdXNoKHtcclxuICAgICAgICAgICAgYWN0aXZlOiBmYWxzZSxcclxuICAgICAgICAgICAgaWQ6IGBkb3QtJHtpICsgc3RhcnRJfWAsXHJcbiAgICAgICAgICAgIGlubmVyQ29udGVudDogJycsXHJcbiAgICAgICAgICAgIHNob3dJbm5lckNvbnRlbnQ6IGZhbHNlXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblx0XHRcdH0gZWxzZSBpZiAoZGlmZmVyZW5jZSA8IDApIHtcclxuICAgICAgICB0aGlzLl9kb3RzRGF0YS5kb3RzLnNwbGljZShkaWZmZXJlbmNlLCBNYXRoLmFicyhkaWZmZXJlbmNlKSlcclxuXHRcdFx0fVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm5hdkRhdGEgPSB0aGlzLl9uYXZEYXRhO1xyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UuZG90c0RhdGEgPSB0aGlzLl9kb3RzRGF0YTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGVzIG5hdmlnYXRpb24gYnV0dG9ucydzIGFuZCBkb3RzJ3Mgc3RhdGVzXHJcbiAgICovXHJcbiAgdXBkYXRlKCkge1xyXG4gICAgdGhpcy5fdXBkYXRlTmF2QnV0dG9ucygpO1xyXG4gICAgdGhpcy5fdXBkYXRlRG90cygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hhbmdlcyBzdGF0ZSBvZiBuYXYgYnV0dG9ucyAoZGlzYWJsZWQsIGVuYWJsZWQpXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfdXBkYXRlTmF2QnV0dG9ucygpIHtcclxuICAgIGNvbnN0XHRzZXR0aW5nczogT3dsT3B0aW9ucyA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLFxyXG4gICAgICBsb29wOiBib29sZWFuID0gc2V0dGluZ3MubG9vcCB8fCBzZXR0aW5ncy5yZXdpbmQsXHJcbiAgICAgIGluZGV4OiBudW1iZXIgPSB0aGlzLmNhcm91c2VsU2VydmljZS5yZWxhdGl2ZSh0aGlzLmNhcm91c2VsU2VydmljZS5jdXJyZW50KCkpO1xyXG5cclxuICAgIGlmIChzZXR0aW5ncy5uYXYpIHtcclxuICAgICAgdGhpcy5fbmF2RGF0YS5wcmV2LmRpc2FibGVkID0gIWxvb3AgJiYgaW5kZXggPD0gdGhpcy5jYXJvdXNlbFNlcnZpY2UubWluaW11bSh0cnVlKTtcclxuXHRcdFx0dGhpcy5fbmF2RGF0YS5uZXh0LmRpc2FibGVkID0gIWxvb3AgJiYgaW5kZXggPj0gdGhpcy5jYXJvdXNlbFNlcnZpY2UubWF4aW11bSh0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5uYXZEYXRhID0gdGhpcy5fbmF2RGF0YTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoYW5nZXMgYWN0aXZlIGRvdCBpZiBwYWdlIGJlY29tZXMgY2hhbmdlZFxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3VwZGF0ZURvdHMoKSB7XHJcbiAgICBsZXQgY3VyQWN0aXZlRG90STogbnVtYmVyO1xyXG5cclxuICAgIGlmKCF0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5kb3RzKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuX2RvdHNEYXRhLmRvdHMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgaWYgKGl0ZW0uYWN0aXZlID09PSB0cnVlKSB7XHJcbiAgICAgICAgaXRlbS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICBjdXJBY3RpdmVEb3RJID0gdGhpcy5fY3VycmVudCgpO1xyXG4gICAgaWYgKHRoaXMuX2RvdHNEYXRhLmRvdHMubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMuX2RvdHNEYXRhLmRvdHNbY3VyQWN0aXZlRG90SV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmRvdHNEYXRhID0gdGhpcy5fZG90c0RhdGE7XHJcbiAgfVxyXG5cclxuICAvKipcclxuXHQgKiBHZXRzIHRoZSBjdXJyZW50IHBhZ2UgcG9zaXRpb24gb2YgdGhlIGNhcm91c2VsLlxyXG5cdCAqIEByZXR1cm5zIHRoZSBjdXJyZW50IHBhZ2UgcG9zaXRpb24gb2YgdGhlIGNhcm91c2VsXHJcblx0ICovXHJcblx0cHJpdmF0ZSBfY3VycmVudCgpOiBhbnkge1xyXG4gICAgY29uc3QgY3VycmVudDogbnVtYmVyID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UucmVsYXRpdmUodGhpcy5jYXJvdXNlbFNlcnZpY2UuY3VycmVudCgpKTtcclxuICAgIGxldCBmaW5hbEN1cnJlbnQ6IG51bWJlcjtcclxuICAgIGNvbnN0IHBhZ2VzOiBhbnkgPSB0aGlzLl9wYWdlcy5maWx0ZXIoKHBhZ2UsIGluZGV4KSA9PiB7XHJcbiAgICAgIHJldHVybiBwYWdlLnN0YXJ0IDw9IGN1cnJlbnQgJiYgcGFnZS5lbmQgPj0gY3VycmVudDtcclxuICAgIH0pLnBvcCgpO1xyXG5cclxuICAgIGZpbmFsQ3VycmVudCA9IHRoaXMuX3BhZ2VzLmZpbmRJbmRleChwYWdlID0+IHtcclxuICAgICAgcmV0dXJuIHBhZ2Uuc3RhcnQgPT09IHBhZ2VzLnN0YXJ0ICYmIHBhZ2UuZW5kID09PSBwYWdlcy5lbmQ7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gZmluYWxDdXJyZW50O1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG5cdCAqIEdldHMgdGhlIGN1cnJlbnQgc3VjY2Vzb3IvcHJlZGVjZXNzb3IgcG9zaXRpb24uXHJcbiAgICogQHBhcmFtIHN1c3Nlc3NvciBwb3NpdGlvbiBvZiBzbGlkZVxyXG5cdCAqIEByZXR1cm5zIHRoZSBjdXJyZW50IHN1Y2Nlc29yL3ByZWRlY2Vzc29yIHBvc2l0aW9uXHJcblx0ICovXHJcblx0cHJpdmF0ZSBfZ2V0UG9zaXRpb24oc3VjY2Vzc29yOiBudW1iZXIgfCBib29sZWFuKTogbnVtYmVyIHtcclxuXHRcdGxldCBwb3NpdGlvbjogbnVtYmVyLCBsZW5ndGg6IG51bWJlcjtcclxuXHRcdGNvbnN0XHRzZXR0aW5nczogT3dsT3B0aW9ucyA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzO1xyXG5cclxuXHRcdGlmIChzZXR0aW5ncy5zbGlkZUJ5ID09PSAncGFnZScpIHtcclxuXHRcdFx0cG9zaXRpb24gPSB0aGlzLl9jdXJyZW50KCk7XHJcblx0XHRcdGxlbmd0aCA9IHRoaXMuX3BhZ2VzLmxlbmd0aDtcclxuXHRcdFx0c3VjY2Vzc29yID8gKytwb3NpdGlvbiA6IC0tcG9zaXRpb247XHJcblx0XHRcdHBvc2l0aW9uID0gdGhpcy5fcGFnZXNbKChwb3NpdGlvbiAlIGxlbmd0aCkgKyBsZW5ndGgpICUgbGVuZ3RoXS5zdGFydDtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHBvc2l0aW9uID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UucmVsYXRpdmUodGhpcy5jYXJvdXNlbFNlcnZpY2UuY3VycmVudCgpKTtcclxuXHRcdFx0bGVuZ3RoID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuaXRlbXMoKS5sZW5ndGg7XHJcblx0XHRcdHN1Y2Nlc3NvciA/IHBvc2l0aW9uICs9ICtzZXR0aW5ncy5zbGlkZUJ5IDogcG9zaXRpb24gLT0gK3NldHRpbmdzLnNsaWRlQnk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHBvc2l0aW9uO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG5cdCAqIFNsaWRlcyB0byB0aGUgbmV4dCBpdGVtIG9yIHBhZ2UuXHJcblx0ICogQHBhcmFtIHNwZWVkIFRoZSB0aW1lIGluIG1pbGxpc2Vjb25kcyBmb3IgdGhlIHRyYW5zaXRpb24uXHJcblx0ICovXHJcblx0bmV4dChzcGVlZDogbnVtYmVyIHwgYm9vbGVhbikge1xyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UudG8odGhpcy5fZ2V0UG9zaXRpb24odHJ1ZSksIHNwZWVkKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBTbGlkZXMgdG8gdGhlIHByZXZpb3VzIGl0ZW0gb3IgcGFnZS5cclxuXHQgKiBAcGFyYW0gc3BlZWQgVGhlIHRpbWUgaW4gbWlsbGlzZWNvbmRzIGZvciB0aGUgdHJhbnNpdGlvbi5cclxuXHQgKi9cclxuXHRwcmV2KHNwZWVkOiBudW1iZXIgfCBib29sZWFuKSB7XHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS50byh0aGlzLl9nZXRQb3NpdGlvbihmYWxzZSksIHNwZWVkKTtcclxuICB9O1xyXG5cclxuIFx0LyoqXHJcblx0ICogU2xpZGVzIHRvIHRoZSBzcGVjaWZpZWQgaXRlbSBvciBwYWdlLlxyXG5cdCAqIEBwYXJhbSBwb3NpdGlvbiAtIFRoZSBwb3NpdGlvbiBvZiB0aGUgaXRlbSBvciBwYWdlLlxyXG5cdCAqIEBwYXJhbSBzcGVlZCAtIFRoZSB0aW1lIGluIG1pbGxpc2Vjb25kcyBmb3IgdGhlIHRyYW5zaXRpb24uXHJcblx0ICogQHBhcmFtIHN0YW5kYXJkIC0gV2hldGhlciB0byB1c2UgdGhlIHN0YW5kYXJkIGJlaGF2aW91ciBvciBub3QuIERlZmF1bHQgbWVhbmluZyBmYWxzZVxyXG5cdCAqL1xyXG5cdHRvKHBvc2l0aW9uOiBudW1iZXIsIHNwZWVkOiBudW1iZXIgfCBib29sZWFuLCBzdGFuZGFyZD86IGJvb2xlYW4pIHtcclxuXHRcdGxldCBsZW5ndGg6IG51bWJlcjtcclxuXHRcdGlmICghc3RhbmRhcmQgJiYgdGhpcy5fcGFnZXMubGVuZ3RoKSB7XHJcbiAgICAgIGxlbmd0aCA9IHRoaXMuX3BhZ2VzLmxlbmd0aDtcclxuICAgICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UudG8odGhpcy5fcGFnZXNbKChwb3NpdGlvbiAlIGxlbmd0aCkgKyBsZW5ndGgpICUgbGVuZ3RoXS5zdGFydCwgc3BlZWQpO1xyXG5cdFx0fSBlbHNlIHtcclxuICAgICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UudG8ocG9zaXRpb24sIHNwZWVkKTtcclxuXHRcdH1cclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBNb3ZlcyBjYXJvdXNlbCBhZnRlciB1c2VyJ3MgY2xpY2tpbmcgb24gYW55IGRvdHNcclxuICAgKi9cclxuICBtb3ZlQnlEb3QoZG90SWQ6IHN0cmluZykge1xyXG4gICAgY29uc3QgaW5kZXg6IG51bWJlciA9IHRoaXMuX2RvdHNEYXRhLmRvdHMuZmluZEluZGV4KGRvdCA9PiBkb3RJZCA9PT0gZG90LmlkKTtcclxuICAgIHRoaXMudG8oaW5kZXgsIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmRvdHNTcGVlZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiByZXdpbmRzIGNhcm91c2VsIHRvIHNsaWRlIHdpdGggbmVlZGVkIGlkXHJcbiAgICogQHBhcmFtIGlkIGlkIG9mIHNsaWRlXHJcbiAgICovXHJcbiAgdG9TbGlkZUJ5SWQoaWQ6IHN0cmluZykge1xyXG4gICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLmNhcm91c2VsU2VydmljZS5zbGlkZXNEYXRhLmZpbmRJbmRleChzbGlkZSA9PiBzbGlkZS5pZCA9PT0gaWQgJiYgc2xpZGUuaXNDbG9uZWQgPT09IGZhbHNlKTtcclxuXHJcbiAgICBpZiAocG9zaXRpb24gPT09IC0xIHx8IHBvc2l0aW9uID09PSB0aGlzLmNhcm91c2VsU2VydmljZS5jdXJyZW50KCkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuXHRcdHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnRvKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnJlbGF0aXZlKHBvc2l0aW9uKSwgZmFsc2UpO1xyXG4gIH1cclxuXHJcbn1cclxuIl19