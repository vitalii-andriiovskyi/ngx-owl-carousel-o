import { __decorate } from "tslib";
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
    NavigationService.ctorParameters = function () { return [
        { type: CarouselService }
    ]; };
    NavigationService = __decorate([
        Injectable()
    ], NavigationService);
    return NavigationService;
}());
export { NavigationService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW93bC1jYXJvdXNlbC1vLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL25hdmlnYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUd0RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDckQsT0FBTyxFQUE0QixLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdkQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUk3QztJQXVDRSwyQkFBb0IsZUFBZ0M7UUFBaEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBakNwRDs7V0FFRztRQUNPLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBRS9COztXQUVHO1FBQ08sV0FBTSxHQUFVLEVBQUUsQ0FBQztRQUU3Qjs7V0FFRztRQUNPLGFBQVEsR0FBWTtZQUM1QixRQUFRLEVBQUUsS0FBSztZQUNmLElBQUksRUFBRTtnQkFDSixRQUFRLEVBQUUsS0FBSztnQkFDZixRQUFRLEVBQUUsRUFBRTthQUNiO1lBQ0QsSUFBSSxFQUFFO2dCQUNKLFFBQVEsRUFBRSxLQUFLO2dCQUNmLFFBQVEsRUFBRSxFQUFFO2FBQ2I7U0FDRixDQUFDO1FBRUY7O1dBRUc7UUFDTyxjQUFTLEdBQWE7WUFDOUIsUUFBUSxFQUFFLEtBQUs7WUFDZixJQUFJLEVBQUUsRUFBRTtTQUNULENBQUM7UUFHQSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELHVDQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFRDs7T0FFRztJQUNILDBDQUFjLEdBQWQ7UUFBQSxpQkF1Q0M7UUF0Q0MsSUFBTSxvQkFBb0IsR0FBdUIsSUFBSSxD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QUU7T0FDQSxpQkFBaUIsQ0F1VTdCO0lBQUQsd0JBQUM7Q0FBQSxBQXZVRCxJQXVVQztTQXZVWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5hdkRhdGEsIERvdHNEYXRhIH0gZnJvbSAnLi4vbW9kZWxzL25hdmlnYXRpb24tZGF0YS5tb2RlbHMnO1xuaW1wb3J0IHsgQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZSB9IGZyb20gJy4uL2Nhcm91c2VsL2Nhcm91c2VsLm1vZHVsZSc7XG5pbXBvcnQgeyBDYXJvdXNlbFNlcnZpY2UgfSBmcm9tICcuL2Nhcm91c2VsLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBPYnNlcnZhYmxlLCBtZXJnZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFwLCBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBPd2xPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWxzL293bC1vcHRpb25zLm1vZGVsJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5hdmlnYXRpb25TZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgLyoqXG4gICAqIFN1YnNjcmlvcHRpb24gdG8gbWVyZ2UgT2JzZXJ2YWJsZSAgZnJvbSBDYXJvdXNlbFNlcnZpY2VcbiAgICovXG4gIG5hdlN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgcGx1Z2luIGlzIGluaXRpYWxpemVkIG9yIG5vdC5cbiAgICovXG4gIHByb3RlY3RlZCBfaW5pdGlhbGl6ZWQgPSBmYWxzZTtcblxuICAvKipcbiAgICogVGhlIGN1cnJlbnQgcGFnaW5nIGluZGV4ZXMuXG4gICAqL1xuICBwcm90ZWN0ZWQgX3BhZ2VzOiBhbnlbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBEYXRhIGZvciBuYXZpZ2F0aW9uIGVsZW1lbnRzIG9mIHRoZSB1c2VyIGludGVyZmFjZS5cbiAgICovXG4gIHByb3RlY3RlZCBfbmF2RGF0YTogTmF2RGF0YSA9IHtcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgcHJldjoge1xuICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgaHRtbFRleHQ6ICcnXG4gICAgfSxcbiAgICBuZXh0OiB7XG4gICAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgICBodG1sVGV4dDogJydcbiAgICB9LFxuICB9O1xuXG4gIC8qKlxuICAgKiBEYXRhIGZvciBkb3QgZWxlbWVudHMgb2YgdGhlIHVzZXIgaW50ZXJmYWNlLlxuICAgKi9cbiAgcHJvdGVjdGVkIF9kb3RzRGF0YTogRG90c0RhdGEgPSB7XG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgIGRvdHM6IFtdXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjYXJvdXNlbFNlcnZpY2U6IENhcm91c2VsU2VydmljZSkge1xuICAgIHRoaXMuc3B5RGF0YVN0cmVhbXMoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMubmF2U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICAvKipcbiAgICogRGVmaW5lcyBPYnNlcnZhYmxlcyB3aGljaCBzZXJ2aWNlIG11c3Qgb2JzZXJ2ZVxuICAgKi9cbiAgc3B5RGF0YVN0cmVhbXMoKSB7XG4gICAgY29uc3QgaW5pdGlhbGl6ZWRDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldEluaXRpYWxpemVkU3RhdGUoKS5waXBlKFxuICAgICAgdGFwKHN0YXRlID0+IHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplKCk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZU5hdlBhZ2VzKCk7XG4gICAgICAgIHRoaXMuZHJhdygpO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB0aGlzLmNhcm91c2VsU2VydmljZS5zZW5kQ2hhbmdlcygpO1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgLy8gbW9zdGx5IGNoYW5nZXMgaW4gY2Fyb3VzZWxTZXJ2aWNlIGFuZCBjYXJvdXNlbCBhdCBhbGwgY2F1c2VzIGNhcm91c2VsU2VydmljZS50bygpLiBJdCBtb3ZlcyBzdGFnZSByaWdodC1sZWZ0IGJ5IGl0cyBjb2RlIGFuZCBjYWxsaW5nIG5lZWRlZCBmdW5jdGlvbnNcbiAgICAvLyBUaHVzIHRoaXMgbWV0aG9kIGJ5IGNhbGxpbmcgY2Fyb3VzZWxTZXJ2aWNlLmN1cnJlbnQocG9zaXRpb24pIG5vdGlmaWVzIGFib3V0IGNoYW5nZXNcbiAgICBjb25zdCBjaGFuZ2VkU2V0dGluZ3MkOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRDaGFuZ2VkU3RhdGUoKS5waXBlKFxuICAgICAgZmlsdGVyKGRhdGEgPT4gZGF0YS5wcm9wZXJ0eS5uYW1lID09PSAncG9zaXRpb24nKSxcbiAgICAgIHRhcChkYXRhID0+IHtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgLy8gc2hvdWxkIGJlIHRoZSBjYWxsIG9mIHRoZSBmdW5jdGlvbiB3cml0dGVuIGF0IHRoZSBlbmQgb2YgY29tbWVudFxuICAgICAgICAvLyBidXQgdGhlIG1ldGhvZCBjYXJvdXNlbFNlcnZpdmUudG8oKSBoYXMgc2V0VGltZW91dChmLCAwKSB3aGljaCBjb250YWlucyBjYXJvdXNlbFNlcnZpdmUudXBkYXRlKCkgd2hpY2ggY2FsbHMgc2VuZENoYW5nZXMoKSBtZXRob2QuXG4gICAgICAgIC8vIGNhcm91c2VsU2VydmljZS5uYXZEYXRhIGFuZCBjYXJvdXNlbFNlcnZpY2UuZG90c0RhdGEgdXBkYXRlIGVhcmxpZXIgdGhhbiBjYXJvdXNlbFNlcnZpdmUudXBkYXRlKCkgZ2V0cyBjYWxsZWRcbiAgICAgICAgLy8gdXBkYXRlcyBvZiBjYXJvdXNlbFNlcnZpY2UubmF2RGF0YSBhbmQgY2Fyb3VzZWxTZXJ2aWNlLmRvdHNEYXRhIGFyZSBiZWluZyBoYXBwZW5pbmcgd2l0aGluZyBjYXJvdXNlbFNlcnZpY2UuY3VycmVudChwb3NpdGlvbikgbWV0aG9kIHdoaWNoIGNhbGxzIG5leHQoKSBvZiBfY2hhbmdlZFNldHRpbmdzQ2Fyb3VzZWwkXG4gICAgICAgIC8vIGNhcm91c2VsU2VydmljZS5jdXJyZW50KHBvc2l0aW9uKSBpcyBiZWluZyBjYWxsaW5nIGVhcmxpZXIgdGhhbiBjYXJvdXNlbFNlcnZpdmUudXBkYXRlKCk7XG4gICAgICAgIC8vIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNlbmRDaGFuZ2VzKCk7XG4gICAgICB9KVxuICAgICk7XG5cbiAgICBjb25zdCByZWZyZXNoZWRDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldFJlZnJlc2hlZFN0YXRlKCkucGlwZShcbiAgICAgIHRhcCgoKSA9PiB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZU5hdlBhZ2VzKCk7XG4gICAgICAgIHRoaXMuZHJhdygpO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB0aGlzLmNhcm91c2VsU2VydmljZS5zZW5kQ2hhbmdlcygpO1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgY29uc3QgbmF2TWVyZ2UkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSBtZXJnZShpbml0aWFsaXplZENhcm91c2VsJCwgY2hhbmdlZFNldHRpbmdzJCwgcmVmcmVzaGVkQ2Fyb3VzZWwkKTtcbiAgICB0aGlzLm5hdlN1YnNjcmlwdGlvbiA9IG5hdk1lcmdlJC5zdWJzY3JpYmUoXG4gICAgICAoKSA9PiB7fVxuICAgICk7XG4gIH1cblxuICAvKipcblx0ICogSW5pdGlhbGl6ZXMgdGhlIGxheW91dCBvZiB0aGUgcGx1Z2luIGFuZCBleHRlbmRzIHRoZSBjYXJvdXNlbC5cblx0ICovXG5cdGluaXRpYWxpemUoKSB7XG4gICAgdGhpcy5fbmF2RGF0YS5kaXNhYmxlZCA9IHRydWU7XG4gICAgdGhpcy5fbmF2RGF0YS5wcmV2Lmh0bWxUZXh0ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MubmF2VGV4dFswXTtcbiAgICB0aGlzLl9uYXZEYXRhLm5leHQuaHRtbFRleHQgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5uYXZUZXh0WzFdO1xuXG4gICAgdGhpcy5fZG90c0RhdGEuZGlzYWJsZWQgPSB0cnVlO1xuXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UubmF2RGF0YSA9IHRoaXMuX25hdkRhdGE7XG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UuZG90c0RhdGEgPSB0aGlzLl9kb3RzRGF0YTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIGludGVybmFsIHN0YXRlcyBhbmQgdXBkYXRlcyBwcm9wIF9wYWdlc1xuICAgKi9cblx0cHJpdmF0ZSBfdXBkYXRlTmF2UGFnZXMoKSB7XG5cdFx0bGV0IGk6IG51bWJlciwgajogbnVtYmVyLCBrOiBudW1iZXI7XG5cdFx0Y29uc3QgbG93ZXI6IG51bWJlciA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmNsb25lcygpLmxlbmd0aCAvIDIsXG4gICAgICB1cHBlcjogbnVtYmVyID0gbG93ZXIgKyB0aGlzLmNhcm91c2VsU2VydmljZS5pdGVtcygpLmxlbmd0aCxcbiAgICAgIG1heGltdW06IG51bWJlciA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm1heGltdW0odHJ1ZSksXG4gICAgICBwYWdlczogYW55W10gPSBbXSxcbiAgICAgIHNldHRpbmdzOiBPd2xPcHRpb25zID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3M7XG4gICAgIGxldCBzaXplID0gc2V0dGluZ3MuY2VudGVyIHx8IHNldHRpbmdzLmF1dG9XaWR0aCB8fCBzZXR0aW5ncy5kb3RzRGF0YVxuICAgICAgICA/IDEgOiBzZXR0aW5ncy5kb3RzRWFjaCB8fCBzZXR0aW5ncy5pdGVtcztcbiAgICAgIHNpemUgPSArc2l6ZTtcblx0XHRpZiAoc2V0dGluZ3Muc2xpZGVCeSAhPT0gJ3BhZ2UnKSB7XG5cdFx0XHRzZXR0aW5ncy5zbGlkZUJ5ID0gTWF0aC5taW4oK3NldHRpbmdzLnNsaWRlQnksIHNldHRpbmdzLml0ZW1zKTtcblx0XHR9XG5cblx0XHRpZiAoc2V0dGluZ3MuZG90cyB8fCBzZXR0aW5ncy5zbGlkZUJ5ID09PSAncGFnZScpIHtcblxuXHRcdFx0Zm9yIChpID0gbG93ZXIsIGogPSAwLCBrID0gMDsgaSA8IHVwcGVyOyBpKyspIHtcblx0XHRcdFx0aWYgKGogPj0gc2l6ZSB8fCBqID09PSAwKSB7XG5cdFx0XHRcdFx0cGFnZXMucHVzaCh7XG5cdFx0XHRcdFx0XHRzdGFydDogTWF0aC5taW4obWF4aW11bSwgaSAtIGxvd2VyKSxcblx0XHRcdFx0XHRcdGVuZDogaSAtIGxvd2VyICsgc2l6ZSAtIDFcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRpZiAoTWF0aC5taW4obWF4aW11bSwgaSAtIGxvd2VyKSA9PT0gbWF4aW11bSkge1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGogPSAwLCArK2s7XG5cdFx0XHRcdH1cblx0XHRcdFx0aiArPSB0aGlzLmNhcm91c2VsU2VydmljZS5tZXJnZXJzKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnJlbGF0aXZlKGkpKSBhcyBudW1iZXI7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuX3BhZ2VzID0gcGFnZXM7XG5cdH1cblxuICAvKipcblx0ICogRHJhd3MgdGhlIHVzZXIgaW50ZXJmYWNlLlxuXHQgKiBAdG9kbyBUaGUgb3B0aW9uIGBkb3RzRGF0YWAgd29udCB3b3JrLlxuXHQgKi9cbiAgZHJhdygpIHtcblx0XHRsZXQgZGlmZmVyZW5jZTogbnVtYmVyO1xuICAgIGNvbnN0XHRzZXR0aW5nczogT3dsT3B0aW9ucyA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLFxuICAgICAgaXRlbXM6IENhcm91c2VsU2xpZGVEaXJlY3RpdmVbXSA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLml0ZW1zKCksXG4gICAgICBkaXNhYmxlZCA9IGl0ZW1zLmxlbmd0aCA8PSBzZXR0aW5ncy5pdGVtcztcblxuXHRcdHRoaXMuX25hdkRhdGEuZGlzYWJsZWQgPSAhc2V0dGluZ3MubmF2IHx8IGRpc2FibGVkO1xuXHRcdHRoaXMuX2RvdHNEYXRhLmRpc2FibGVkID0gIXNldHRpbmdzLmRvdHMgfHwgZGlzYWJsZWQ7XG5cblx0XHRpZiAoc2V0dGluZ3MuZG90cykge1xuXHRcdFx0ZGlmZmVyZW5jZSA9IHRoaXMuX3BhZ2VzLmxlbmd0aCAtIHRoaXMuX2RvdHNEYXRhLmRvdHMubGVuZ3RoO1xuXG5cdFx0XHRpZiAoc2V0dGluZ3MuZG90c0RhdGEgJiYgZGlmZmVyZW5jZSAhPT0gMCkge1xuICAgICAgICB0aGlzLl9kb3RzRGF0YS5kb3RzID0gW107XG4gICAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgdGhpcy5fZG90c0RhdGEuZG90cy5wdXNoKHtcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgICAgICAgICBpZDogYGRvdC0ke2l0ZW0uaWR9YCxcbiAgICAgICAgICAgIGlubmVyQ29udGVudDogaXRlbS5kb3RDb250ZW50LFxuICAgICAgICAgICAgc2hvd0lubmVyQ29udGVudDogdHJ1ZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblx0XHRcdH0gZWxzZSBpZiAoZGlmZmVyZW5jZSA+IDApIHtcbiAgICAgICAgY29uc3Qgc3RhcnRJOiBudW1iZXIgPSB0aGlzLl9kb3RzRGF0YS5kb3RzLmxlbmd0aCA+IDAgPyB0aGlzLl9kb3RzRGF0YS5kb3RzLmxlbmd0aCA6IDA7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGlmZmVyZW5jZTsgaSsrKSB7XG4gICAgICAgICAgdGhpcy5fZG90c0RhdGEuZG90cy5wdXNoKHtcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgICAgICAgICBpZDogYGRvdC0ke2kgKyBzdGFydEl9YCxcbiAgICAgICAgICAgIGlubmVyQ29udGVudDogJycsXG4gICAgICAgICAgICBzaG93SW5uZXJDb250ZW50OiBmYWxzZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cdFx0XHR9IGVsc2UgaWYgKGRpZmZlcmVuY2UgPCAwKSB7XG4gICAgICAgIHRoaXMuX2RvdHNEYXRhLmRvdHMuc3BsaWNlKGRpZmZlcmVuY2UsIE1hdGguYWJzKGRpZmZlcmVuY2UpKVxuXHRcdFx0fVxuICAgIH1cblxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm5hdkRhdGEgPSB0aGlzLl9uYXZEYXRhO1xuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmRvdHNEYXRhID0gdGhpcy5fZG90c0RhdGE7XG4gIH07XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgbmF2aWdhdGlvbiBidXR0b25zJ3MgYW5kIGRvdHMncyBzdGF0ZXNcbiAgICovXG4gIHVwZGF0ZSgpIHtcbiAgICB0aGlzLl91cGRhdGVOYXZCdXR0b25zKCk7XG4gICAgdGhpcy5fdXBkYXRlRG90cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoYW5nZXMgc3RhdGUgb2YgbmF2IGJ1dHRvbnMgKGRpc2FibGVkLCBlbmFibGVkKVxuICAgKi9cbiAgcHJpdmF0ZSBfdXBkYXRlTmF2QnV0dG9ucygpIHtcbiAgICBjb25zdFx0c2V0dGluZ3M6IE93bE9wdGlvbnMgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncyxcbiAgICAgIGxvb3A6IGJvb2xlYW4gPSBzZXR0aW5ncy5sb29wIHx8IHNldHRpbmdzLnJld2luZCxcbiAgICAgIGluZGV4OiBudW1iZXIgPSB0aGlzLmNhcm91c2VsU2VydmljZS5yZWxhdGl2ZSh0aGlzLmNhcm91c2VsU2VydmljZS5jdXJyZW50KCkpO1xuXG4gICAgaWYgKHNldHRpbmdzLm5hdikge1xuICAgICAgdGhpcy5fbmF2RGF0YS5wcmV2LmRpc2FibGVkID0gIWxvb3AgJiYgaW5kZXggPD0gdGhpcy5jYXJvdXNlbFNlcnZpY2UubWluaW11bSh0cnVlKTtcblx0XHRcdHRoaXMuX25hdkRhdGEubmV4dC5kaXNhYmxlZCA9ICFsb29wICYmIGluZGV4ID49IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm1heGltdW0odHJ1ZSk7XG4gICAgfVxuXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UubmF2RGF0YSA9IHRoaXMuX25hdkRhdGE7XG4gIH1cblxuICAvKipcbiAgICogQ2hhbmdlcyBhY3RpdmUgZG90IGlmIHBhZ2UgYmVjb21lcyBjaGFuZ2VkXG4gICAqL1xuICBwcml2YXRlIF91cGRhdGVEb3RzKCkge1xuICAgIGxldCBjdXJBY3RpdmVEb3RJOiBudW1iZXI7XG5cbiAgICBpZighdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuZG90cykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9kb3RzRGF0YS5kb3RzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBpZiAoaXRlbS5hY3RpdmUgPT09IHRydWUpIHtcbiAgICAgICAgaXRlbS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgY3VyQWN0aXZlRG90SSA9IHRoaXMuX2N1cnJlbnQoKTtcbiAgICBpZiAodGhpcy5fZG90c0RhdGEuZG90cy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuX2RvdHNEYXRhLmRvdHNbY3VyQWN0aXZlRG90SV0uYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UuZG90c0RhdGEgPSB0aGlzLl9kb3RzRGF0YTtcbiAgfVxuXG4gIC8qKlxuXHQgKiBHZXRzIHRoZSBjdXJyZW50IHBhZ2UgcG9zaXRpb24gb2YgdGhlIGNhcm91c2VsLlxuXHQgKiBAcmV0dXJucyB0aGUgY3VycmVudCBwYWdlIHBvc2l0aW9uIG9mIHRoZSBjYXJvdXNlbFxuXHQgKi9cblx0cHJpdmF0ZSBfY3VycmVudCgpOiBhbnkge1xuICAgIGNvbnN0IGN1cnJlbnQ6IG51bWJlciA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnJlbGF0aXZlKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmN1cnJlbnQoKSk7XG4gICAgbGV0IGZpbmFsQ3VycmVudDogbnVtYmVyO1xuICAgIGNvbnN0IHBhZ2VzOiBhbnkgPSB0aGlzLl9wYWdlcy5maWx0ZXIoKHBhZ2UsIGluZGV4KSA9PiB7XG4gICAgICByZXR1cm4gcGFnZS5zdGFydCA8PSBjdXJyZW50ICYmIHBhZ2UuZW5kID49IGN1cnJlbnQ7XG4gICAgfSkucG9wKCk7XG5cbiAgICBmaW5hbEN1cnJlbnQgPSB0aGlzLl9wYWdlcy5maW5kSW5kZXgocGFnZSA9PiB7XG4gICAgICByZXR1cm4gcGFnZS5zdGFydCA9PT0gcGFnZXMuc3RhcnQgJiYgcGFnZS5lbmQgPT09IHBhZ2VzLmVuZDtcbiAgICB9KTtcblxuICAgIHJldHVybiBmaW5hbEN1cnJlbnQ7XG4gIH07XG5cbiAgLyoqXG5cdCAqIEdldHMgdGhlIGN1cnJlbnQgc3VjY2Vzb3IvcHJlZGVjZXNzb3IgcG9zaXRpb24uXG4gICAqIEBwYXJhbSBzdXNzZXNzb3IgcG9zaXRpb24gb2Ygc2xpZGVcblx0ICogQHJldHVybnMgdGhlIGN1cnJlbnQgc3VjY2Vzb3IvcHJlZGVjZXNzb3IgcG9zaXRpb25cblx0ICovXG5cdHByaXZhdGUgX2dldFBvc2l0aW9uKHN1Y2Nlc3NvcjogbnVtYmVyIHwgYm9vbGVhbik6IG51bWJlciB7XG5cdFx0bGV0IHBvc2l0aW9uOiBudW1iZXIsIGxlbmd0aDogbnVtYmVyO1xuXHRcdGNvbnN0XHRzZXR0aW5nczogT3dsT3B0aW9ucyA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzO1xuXG5cdFx0aWYgKHNldHRpbmdzLnNsaWRlQnkgPT09ICdwYWdlJykge1xuXHRcdFx0cG9zaXRpb24gPSB0aGlzLl9jdXJyZW50KCk7XG5cdFx0XHRsZW5ndGggPSB0aGlzLl9wYWdlcy5sZW5ndGg7XG5cdFx0XHRzdWNjZXNzb3IgPyArK3Bvc2l0aW9uIDogLS1wb3NpdGlvbjtcblx0XHRcdHBvc2l0aW9uID0gdGhpcy5fcGFnZXNbKChwb3NpdGlvbiAlIGxlbmd0aCkgKyBsZW5ndGgpICUgbGVuZ3RoXS5zdGFydDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cG9zaXRpb24gPSB0aGlzLmNhcm91c2VsU2VydmljZS5yZWxhdGl2ZSh0aGlzLmNhcm91c2VsU2VydmljZS5jdXJyZW50KCkpO1xuXHRcdFx0bGVuZ3RoID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuaXRlbXMoKS5sZW5ndGg7XG5cdFx0XHRzdWNjZXNzb3IgPyBwb3NpdGlvbiArPSArc2V0dGluZ3Muc2xpZGVCeSA6IHBvc2l0aW9uIC09ICtzZXR0aW5ncy5zbGlkZUJ5O1xuXHRcdH1cblxuXHRcdHJldHVybiBwb3NpdGlvbjtcbiAgfTtcblxuICAvKipcblx0ICogU2xpZGVzIHRvIHRoZSBuZXh0IGl0ZW0gb3IgcGFnZS5cblx0ICogQHBhcmFtIHNwZWVkIFRoZSB0aW1lIGluIG1pbGxpc2Vjb25kcyBmb3IgdGhlIHRyYW5zaXRpb24uXG5cdCAqL1xuXHRuZXh0KHNwZWVkOiBudW1iZXIgfCBib29sZWFuKSB7XG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UudG8odGhpcy5fZ2V0UG9zaXRpb24odHJ1ZSksIHNwZWVkKTtcblx0fTtcblxuXHQvKipcblx0ICogU2xpZGVzIHRvIHRoZSBwcmV2aW91cyBpdGVtIG9yIHBhZ2UuXG5cdCAqIEBwYXJhbSBzcGVlZCBUaGUgdGltZSBpbiBtaWxsaXNlY29uZHMgZm9yIHRoZSB0cmFuc2l0aW9uLlxuXHQgKi9cblx0cHJldihzcGVlZDogbnVtYmVyIHwgYm9vbGVhbikge1xuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnRvKHRoaXMuX2dldFBvc2l0aW9uKGZhbHNlKSwgc3BlZWQpO1xuICB9O1xuXG4gXHQvKipcblx0ICogU2xpZGVzIHRvIHRoZSBzcGVjaWZpZWQgaXRlbSBvciBwYWdlLlxuXHQgKiBAcGFyYW0gcG9zaXRpb24gLSBUaGUgcG9zaXRpb24gb2YgdGhlIGl0ZW0gb3IgcGFnZS5cblx0ICogQHBhcmFtIHNwZWVkIC0gVGhlIHRpbWUgaW4gbWlsbGlzZWNvbmRzIGZvciB0aGUgdHJhbnNpdGlvbi5cblx0ICogQHBhcmFtIHN0YW5kYXJkIC0gV2hldGhlciB0byB1c2UgdGhlIHN0YW5kYXJkIGJlaGF2aW91ciBvciBub3QuIERlZmF1bHQgbWVhbmluZyBmYWxzZVxuXHQgKi9cblx0dG8ocG9zaXRpb246IG51bWJlciwgc3BlZWQ6IG51bWJlciB8IGJvb2xlYW4sIHN0YW5kYXJkPzogYm9vbGVhbikge1xuXHRcdGxldCBsZW5ndGg6IG51bWJlcjtcblx0XHRpZiAoIXN0YW5kYXJkICYmIHRoaXMuX3BhZ2VzLmxlbmd0aCkge1xuICAgICAgbGVuZ3RoID0gdGhpcy5fcGFnZXMubGVuZ3RoO1xuICAgICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UudG8odGhpcy5fcGFnZXNbKChwb3NpdGlvbiAlIGxlbmd0aCkgKyBsZW5ndGgpICUgbGVuZ3RoXS5zdGFydCwgc3BlZWQpO1xuXHRcdH0gZWxzZSB7XG4gICAgICB0aGlzLmNhcm91c2VsU2VydmljZS50byhwb3NpdGlvbiwgc3BlZWQpO1xuXHRcdH1cbiAgfTtcblxuICAvKipcbiAgICogTW92ZXMgY2Fyb3VzZWwgYWZ0ZXIgdXNlcidzIGNsaWNraW5nIG9uIGFueSBkb3RzXG4gICAqL1xuICBtb3ZlQnlEb3QoZG90SWQ6IHN0cmluZykge1xuICAgIGNvbnN0IGluZGV4OiBudW1iZXIgPSB0aGlzLl9kb3RzRGF0YS5kb3RzLmZpbmRJbmRleChkb3QgPT4gZG90SWQgPT09IGRvdC5pZCk7XG4gICAgdGhpcy50byhpbmRleCwgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuZG90c1NwZWVkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZXdpbmRzIGNhcm91c2VsIHRvIHNsaWRlIHdpdGggbmVlZGVkIGlkXG4gICAqIEBwYXJhbSBpZCBpZCBvZiBzbGlkZVxuICAgKi9cbiAgdG9TbGlkZUJ5SWQoaWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2xpZGVzRGF0YS5maW5kSW5kZXgoc2xpZGUgPT4gc2xpZGUuaWQgPT09IGlkICYmIHNsaWRlLmlzQ2xvbmVkID09PSBmYWxzZSk7XG5cbiAgICBpZiAocG9zaXRpb24gPT09IC0xIHx8IHBvc2l0aW9uID09PSB0aGlzLmNhcm91c2VsU2VydmljZS5jdXJyZW50KCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cblx0XHR0aGlzLmNhcm91c2VsU2VydmljZS50byh0aGlzLmNhcm91c2VsU2VydmljZS5yZWxhdGl2ZShwb3NpdGlvbiksIGZhbHNlKTtcbiAgfVxuXG59XG4iXX0=