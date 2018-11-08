/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { CarouselService } from './carousel.service';
import { merge } from 'rxjs';
import { tap, filter } from 'rxjs/operators';
export class NavigationService {
    /**
     * @param {?} carouselService
     */
    constructor(carouselService) {
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
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.navSubscription.unsubscribe();
    }
    /**
     * Defines Observables which service must observe
     * @return {?}
     */
    spyDataStreams() {
        /** @type {?} */
        const initializedCarousel$ = this.carouselService.getInitializedState().pipe(tap(state => {
            this.initialize();
            this._updateNavPages();
            this.draw();
            this.update();
            this.carouselService.sendChanges();
        }));
        // mostly changes in carouselService and carousel at all causes carouselService.to(). It moves stage right-left by its code and calling needed functions
        // Thus this method by calling carouselService.current(position) notifies about changes
        /** @type {?} */
        const changedSettings$ = this.carouselService.getChangedState().pipe(filter(data => data.property.name === 'position'), tap(data => {
            this.update();
            // should be the call of the function written at the end of comment
            // but the method carouselServive.to() has setTimeout(f, 0) which contains carouselServive.update() which calls sendChanges() method.
            // carouselService.navData and carouselService.dotsData update earlier than carouselServive.update() gets called
            // updates of carouselService.navData and carouselService.dotsData are being happening withing carouselService.current(position) method which calls next() of _changedSettingsCarousel$
            // carouselService.current(position) is being calling earlier than carouselServive.update();
            // this.carouselService.sendChanges();
        }));
        /** @type {?} */
        const refreshedCarousel$ = this.carouselService.getRefreshedState().pipe(tap(() => {
            this._updateNavPages();
            this.draw();
            this.update();
            this.carouselService.sendChanges();
        }));
        /** @type {?} */
        const navMerge$ = merge(initializedCarousel$, changedSettings$, refreshedCarousel$);
        this.navSubscription = navMerge$.subscribe(() => { });
    }
    /**
     * Initializes the layout of the plugin and extends the carousel.
     * @return {?}
     */
    initialize() {
        this._navData.disabled = true;
        this._navData.prev.htmlText = this.carouselService.settings.navText[0];
        this._navData.next.htmlText = this.carouselService.settings.navText[1];
        this._dotsData.disabled = true;
        this.carouselService.navData = this._navData;
        this.carouselService.dotsData = this._dotsData;
    }
    /**
     * Calculates internal states and updates prop _pages
     * @return {?}
     */
    _updateNavPages() {
        /** @type {?} */
        let i;
        /** @type {?} */
        let j;
        /** @type {?} */
        let k;
        /** @type {?} */
        const lower = this.carouselService.clones().length / 2;
        /** @type {?} */
        const upper = lower + this.carouselService.items().length;
        /** @type {?} */
        const maximum = this.carouselService.maximum(true);
        /** @type {?} */
        const pages = [];
        /** @type {?} */
        const settings = this.carouselService.settings;
        /** @type {?} */
        let size = settings.center || settings.autoWidth || settings.dotsData
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
                j += (/** @type {?} */ (this.carouselService.mergers(this.carouselService.relative(i))));
            }
        }
        this._pages = pages;
    }
    /**
     * Draws the user interface.
     * \@todo The option `dotsData` wont work.
     * @return {?}
     */
    draw() {
        /** @type {?} */
        let difference;
        /** @type {?} */
        const settings = this.carouselService.settings;
        /** @type {?} */
        const items = this.carouselService.items();
        /** @type {?} */
        const disabled = items.length <= settings.items;
        this._navData.disabled = !settings.nav || disabled;
        this._dotsData.disabled = !settings.dots || disabled;
        if (settings.dots) {
            difference = this._pages.length - this._dotsData.dots.length;
            if (settings.dotsData && difference !== 0) {
                this._dotsData.dots = [];
                items.forEach(item => {
                    this._dotsData.dots.push({
                        active: false,
                        id: `dot-${item.id}`,
                        innerContent: item.dotContent,
                        showInnerContent: true
                    });
                });
            }
            else if (difference > 0) {
                /** @type {?} */
                const startI = this._dotsData.dots.length > 0 ? this._dotsData.dots.length : 0;
                for (let i = 0; i < difference; i++) {
                    this._dotsData.dots.push({
                        active: false,
                        id: `dot-${i + startI}`,
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
    }
    ;
    /**
     * Updates navigation buttons's and dots's states
     * @return {?}
     */
    update() {
        this._updateNavButtons();
        this._updateDots();
    }
    /**
     * Changes state of nav buttons (disabled, enabled)
     * @return {?}
     */
    _updateNavButtons() {
        /** @type {?} */
        const settings = this.carouselService.settings;
        /** @type {?} */
        const loop = settings.loop || settings.rewind;
        /** @type {?} */
        const index = this.carouselService.relative(this.carouselService.current());
        if (settings.nav) {
            this._navData.prev.disabled = !loop && index <= this.carouselService.minimum(true);
            this._navData.next.disabled = !loop && index >= this.carouselService.maximum(true);
        }
        this.carouselService.navData = this._navData;
    }
    /**
     * Changes active dot if page becomes changed
     * @return {?}
     */
    _updateDots() {
        /** @type {?} */
        let curActiveDotI;
        this._dotsData.dots.forEach(item => {
            if (item.active === true) {
                item.active = false;
            }
        });
        curActiveDotI = this._current();
        if (this._dotsData.dots.length) {
            this._dotsData.dots[curActiveDotI].active = true;
        }
        this.carouselService.dotsData = this._dotsData;
    }
    /**
     * Gets the current page position of the carousel.
     * @return {?} the current page position of the carousel
     */
    _current() {
        /** @type {?} */
        const current = this.carouselService.relative(this.carouselService.current());
        /** @type {?} */
        let finalCurrent;
        /** @type {?} */
        const pages = this._pages.filter((page, index) => {
            return page.start <= current && page.end >= current;
        }).pop();
        finalCurrent = this._pages.findIndex(page => {
            return page.start === pages.start && page.end === pages.end;
        });
        return finalCurrent;
    }
    ;
    /**
     * Gets the current succesor/predecessor position.
     * @param {?} successor
     * @return {?} the current succesor/predecessor position
     */
    _getPosition(successor) {
        /** @type {?} */
        let position;
        /** @type {?} */
        let length;
        /** @type {?} */
        const settings = this.carouselService.settings;
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
    }
    ;
    /**
     * Slides to the next item or page.
     * @param {?} speed The time in milliseconds for the transition.
     * @return {?}
     */
    next(speed) {
        this.carouselService.to(this._getPosition(true), speed);
    }
    ;
    /**
     * Slides to the previous item or page.
     * @param {?} speed The time in milliseconds for the transition.
     * @return {?}
     */
    prev(speed) {
        this.carouselService.to(this._getPosition(false), speed);
    }
    ;
    /**
     * Slides to the specified item or page.
     * @param {?} position - The position of the item or page.
     * @param {?} speed - The time in milliseconds for the transition.
     * @param {?=} standard - Whether to use the standard behaviour or not. Default meaning false
     * @return {?}
     */
    to(position, speed, standard) {
        /** @type {?} */
        let length;
        if (!standard && this._pages.length) {
            length = this._pages.length;
            this.carouselService.to(this._pages[((position % length) + length) % length].start, speed);
        }
        else {
            this.carouselService.to(position, speed);
        }
    }
    ;
    /**
     * Moves carousel after user's clicking on any dots
     * @param {?} dotId
     * @return {?}
     */
    moveByDot(dotId) {
        /** @type {?} */
        const index = this._dotsData.dots.findIndex(dot => dotId === dot.id);
        this.to(index, this.carouselService.settings.dotsSpeed);
    }
    /**
     * rewinds carousel to slide with needed id
     * @param {?} id id of slide
     * @return {?}
     */
    toSlideById(id) {
        /** @type {?} */
        const position = this.carouselService.slidesData.findIndex(slide => slide.id === id && slide.isCloned === false);
        if (position === -1 || position === this.carouselService.current()) {
            return;
        }
        this.carouselService.to(this.carouselService.relative(position), false);
    }
}
NavigationService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
NavigationService.ctorParameters = () => [
    { type: CarouselService }
];
if (false) {
    /**
     * Subscrioption to merge Observable  from CarouselService
     * @type {?}
     */
    NavigationService.prototype.navSubscription;
    /**
     * Indicates whether the plugin is initialized or not.
     * @type {?}
     */
    NavigationService.prototype._initialized;
    /**
     * The current paging indexes.
     * @type {?}
     */
    NavigationService.prototype._pages;
    /**
     * Data for navigation elements of the user interface.
     * @type {?}
     */
    NavigationService.prototype._navData;
    /**
     * Data for dot elements of the user interface.
     * @type {?}
     */
    NavigationService.prototype._dotsData;
    /** @type {?} */
    NavigationService.prototype.carouselService;
    /* Skipping unhandled member: ;*/
    /* Skipping unhandled member: ;*/
    /* Skipping unhandled member: ;*/
    /* Skipping unhandled member: ;*/
    /* Skipping unhandled member: ;*/
    /* Skipping unhandled member: ;*/
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW93bC1jYXJvdXNlbC1vLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL25hdmlnYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUd0RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDckQsT0FBTyxFQUE0QixLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdkQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUk3QyxNQUFNLE9BQU8saUJBQWlCOzs7O0lBdUM1QixZQUFvQixlQUFnQztRQUFoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7Ozs7UUE5QjFDLGlCQUFZLEdBQUcsS0FBSyxDQUFDOzs7O1FBS3JCLFdBQU0sR0FBVSxFQUFFLENBQUM7Ozs7UUFLbkIsYUFBUSxHQUFZO1lBQzVCLFFBQVEsRUFBRSxLQUFLO1lBQ2YsSUFBSSxFQUFFO2dCQUNKLFFBQVEsRUFBRSxLQUFLO2dCQUNmLFFBQVEsRUFBRSxFQUFFO2FBQ2I7WUFDRCxJQUFJLEVBQUU7Z0JBQ0osUUFBUSxFQUFFLEtBQUs7Z0JBQ2YsUUFBUSxFQUFFLEVBQUU7YUFDYjtTQUNGLENBQUM7Ozs7UUFLUSxjQUFTLEdBQWE7WUFDOUIsUUFBUSxFQUFFLEtBQUs7WUFDZixJQUFJLEVBQUUsRUFBRTtTQUNULENBQUM7UUFHQSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JDLENBQUM7Ozs7O0lBS0QsY0FBYzs7Y0FDTixvQkFBb0IsR0FBdUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLElBQUksQ0FDOUYs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Q0FBQztJQUMxRCxDQUFDOzs7Ozs7SUFNRCxXQUFXLENBQUMsRUFBVTs7Y0FDZCxRQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksS0FBSyxDQUFDLFFBQVEsS0FBSyxLQUFLLENBQUM7UUFFaEgsSUFBSSxRQUFRLEtBQUssQ0FBQyxDQUFDLElBQUksUUFBUSxLQUFLLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDbEUsT0FBTztTQUNSO1FBRUgsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDeEUsQ0FBQzs7O1lBalVGLFVBQVU7Ozs7WUFMRixlQUFlOzs7Ozs7O0lBVXRCLDRDQUE4Qjs7Ozs7SUFLOUIseUNBQStCOzs7OztJQUsvQixtQ0FBNkI7Ozs7O0lBSzdCLHFDQVVFOzs7OztJQUtGLHNDQUdFOztJQUVVLDRDQUF3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOYXZEYXRhLCBEb3RzRGF0YSB9IGZyb20gJy4uL21vZGVscy9uYXZpZ2F0aW9uLWRhdGEubW9kZWxzJztcclxuaW1wb3J0IHsgQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZSB9IGZyb20gJy4uL2Nhcm91c2VsL2Nhcm91c2VsLm1vZHVsZSc7XHJcbmltcG9ydCB7IENhcm91c2VsU2VydmljZSB9IGZyb20gJy4vY2Fyb3VzZWwuc2VydmljZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgT2JzZXJ2YWJsZSwgbWVyZ2UgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgdGFwLCBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IE93bE9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbHMvb3dsLW9wdGlvbnMubW9kZWwnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgTmF2aWdhdGlvblNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlvcHRpb24gdG8gbWVyZ2UgT2JzZXJ2YWJsZSAgZnJvbSBDYXJvdXNlbFNlcnZpY2VcclxuICAgKi9cclxuICBuYXZTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHBsdWdpbiBpcyBpbml0aWFsaXplZCBvciBub3QuXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIF9pbml0aWFsaXplZCA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgY3VycmVudCBwYWdpbmcgaW5kZXhlcy5cclxuICAgKi9cclxuICBwcm90ZWN0ZWQgX3BhZ2VzOiBhbnlbXSA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiBEYXRhIGZvciBuYXZpZ2F0aW9uIGVsZW1lbnRzIG9mIHRoZSB1c2VyIGludGVyZmFjZS5cclxuICAgKi9cclxuICBwcm90ZWN0ZWQgX25hdkRhdGE6IE5hdkRhdGEgPSB7XHJcbiAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICBwcmV2OiB7XHJcbiAgICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgICAgaHRtbFRleHQ6ICcnXHJcbiAgICB9LFxyXG4gICAgbmV4dDoge1xyXG4gICAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICAgIGh0bWxUZXh0OiAnJ1xyXG4gICAgfSxcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBEYXRhIGZvciBkb3QgZWxlbWVudHMgb2YgdGhlIHVzZXIgaW50ZXJmYWNlLlxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBfZG90c0RhdGE6IERvdHNEYXRhID0ge1xyXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgZG90czogW11cclxuICB9O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhcm91c2VsU2VydmljZTogQ2Fyb3VzZWxTZXJ2aWNlKSB7XHJcbiAgICB0aGlzLnNweURhdGFTdHJlYW1zKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMubmF2U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZWZpbmVzIE9ic2VydmFibGVzIHdoaWNoIHNlcnZpY2UgbXVzdCBvYnNlcnZlXHJcbiAgICovXHJcbiAgc3B5RGF0YVN0cmVhbXMoKSB7XHJcbiAgICBjb25zdCBpbml0aWFsaXplZENhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0SW5pdGlhbGl6ZWRTdGF0ZSgpLnBpcGUoXHJcbiAgICAgIHRhcChzdGF0ZSA9PiB7XHJcbiAgICAgICAgdGhpcy5pbml0aWFsaXplKCk7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlTmF2UGFnZXMoKTtcclxuICAgICAgICB0aGlzLmRyYXcoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNlbmRDaGFuZ2VzKCk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIC8vIG1vc3RseSBjaGFuZ2VzIGluIGNhcm91c2VsU2VydmljZSBhbmQgY2Fyb3VzZWwgYXQgYWxsIGNhdXNlcyBjYXJvdXNlbFNlcnZpY2UudG8oKS4gSXQgbW92ZXMgc3RhZ2UgcmlnaHQtbGVmdCBieSBpdHMgY29kZSBhbmQgY2FsbGluZyBuZWVkZWQgZnVuY3Rpb25zXHJcbiAgICAvLyBUaHVzIHRoaXMgbWV0aG9kIGJ5IGNhbGxpbmcgY2Fyb3VzZWxTZXJ2aWNlLmN1cnJlbnQocG9zaXRpb24pIG5vdGlmaWVzIGFib3V0IGNoYW5nZXNcclxuICAgIGNvbnN0IGNoYW5nZWRTZXR0aW5ncyQ6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldENoYW5nZWRTdGF0ZSgpLnBpcGUoXHJcbiAgICAgIGZpbHRlcihkYXRhID0+IGRhdGEucHJvcGVydHkubmFtZSA9PT0gJ3Bvc2l0aW9uJyksXHJcbiAgICAgIHRhcChkYXRhID0+IHtcclxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgICAgIC8vIHNob3VsZCBiZSB0aGUgY2FsbCBvZiB0aGUgZnVuY3Rpb24gd3JpdHRlbiBhdCB0aGUgZW5kIG9mIGNvbW1lbnRcclxuICAgICAgICAvLyBidXQgdGhlIG1ldGhvZCBjYXJvdXNlbFNlcnZpdmUudG8oKSBoYXMgc2V0VGltZW91dChmLCAwKSB3aGljaCBjb250YWlucyBjYXJvdXNlbFNlcnZpdmUudXBkYXRlKCkgd2hpY2ggY2FsbHMgc2VuZENoYW5nZXMoKSBtZXRob2QuXHJcbiAgICAgICAgLy8gY2Fyb3VzZWxTZXJ2aWNlLm5hdkRhdGEgYW5kIGNhcm91c2VsU2VydmljZS5kb3RzRGF0YSB1cGRhdGUgZWFybGllciB0aGFuIGNhcm91c2VsU2Vydml2ZS51cGRhdGUoKSBnZXRzIGNhbGxlZFxyXG4gICAgICAgIC8vIHVwZGF0ZXMgb2YgY2Fyb3VzZWxTZXJ2aWNlLm5hdkRhdGEgYW5kIGNhcm91c2VsU2VydmljZS5kb3RzRGF0YSBhcmUgYmVpbmcgaGFwcGVuaW5nIHdpdGhpbmcgY2Fyb3VzZWxTZXJ2aWNlLmN1cnJlbnQocG9zaXRpb24pIG1ldGhvZCB3aGljaCBjYWxscyBuZXh0KCkgb2YgX2NoYW5nZWRTZXR0aW5nc0Nhcm91c2VsJFxyXG4gICAgICAgIC8vIGNhcm91c2VsU2VydmljZS5jdXJyZW50KHBvc2l0aW9uKSBpcyBiZWluZyBjYWxsaW5nIGVhcmxpZXIgdGhhbiBjYXJvdXNlbFNlcnZpdmUudXBkYXRlKCk7XHJcbiAgICAgICAgLy8gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2VuZENoYW5nZXMoKTtcclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgcmVmcmVzaGVkQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRSZWZyZXNoZWRTdGF0ZSgpLnBpcGUoXHJcbiAgICAgIHRhcCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlTmF2UGFnZXMoKTtcclxuICAgICAgICB0aGlzLmRyYXcoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNlbmRDaGFuZ2VzKCk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IG5hdk1lcmdlJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gbWVyZ2UoaW5pdGlhbGl6ZWRDYXJvdXNlbCQsIGNoYW5nZWRTZXR0aW5ncyQsIHJlZnJlc2hlZENhcm91c2VsJCk7XHJcbiAgICB0aGlzLm5hdlN1YnNjcmlwdGlvbiA9IG5hdk1lcmdlJC5zdWJzY3JpYmUoXHJcbiAgICAgICgpID0+IHt9XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcblx0ICogSW5pdGlhbGl6ZXMgdGhlIGxheW91dCBvZiB0aGUgcGx1Z2luIGFuZCBleHRlbmRzIHRoZSBjYXJvdXNlbC5cclxuXHQgKi9cclxuXHRpbml0aWFsaXplKCkge1xyXG4gICAgdGhpcy5fbmF2RGF0YS5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICB0aGlzLl9uYXZEYXRhLnByZXYuaHRtbFRleHQgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5uYXZUZXh0WzBdO1xyXG4gICAgdGhpcy5fbmF2RGF0YS5uZXh0Lmh0bWxUZXh0ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MubmF2VGV4dFsxXTtcclxuXHJcbiAgICB0aGlzLl9kb3RzRGF0YS5kaXNhYmxlZCA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UubmF2RGF0YSA9IHRoaXMuX25hdkRhdGE7XHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5kb3RzRGF0YSA9IHRoaXMuX2RvdHNEYXRhO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsY3VsYXRlcyBpbnRlcm5hbCBzdGF0ZXMgYW5kIHVwZGF0ZXMgcHJvcCBfcGFnZXNcclxuICAgKi9cclxuXHRwcml2YXRlIF91cGRhdGVOYXZQYWdlcygpIHtcclxuXHRcdGxldCBpOiBudW1iZXIsIGo6IG51bWJlciwgazogbnVtYmVyO1xyXG5cdFx0Y29uc3QgbG93ZXI6IG51bWJlciA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmNsb25lcygpLmxlbmd0aCAvIDIsXHJcbiAgICAgIHVwcGVyOiBudW1iZXIgPSBsb3dlciArIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLml0ZW1zKCkubGVuZ3RoLFxyXG4gICAgICBtYXhpbXVtOiBudW1iZXIgPSB0aGlzLmNhcm91c2VsU2VydmljZS5tYXhpbXVtKHRydWUpLFxyXG4gICAgICBwYWdlczogYW55W10gPSBbXSxcclxuICAgICAgc2V0dGluZ3M6IE93bE9wdGlvbnMgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncztcclxuICAgICBsZXQgc2l6ZSA9IHNldHRpbmdzLmNlbnRlciB8fCBzZXR0aW5ncy5hdXRvV2lkdGggfHwgc2V0dGluZ3MuZG90c0RhdGFcclxuICAgICAgICA/IDEgOiBzZXR0aW5ncy5kb3RzRWFjaCB8fCBzZXR0aW5ncy5pdGVtcztcclxuICAgICAgc2l6ZSA9ICtzaXplO1xyXG5cdFx0aWYgKHNldHRpbmdzLnNsaWRlQnkgIT09ICdwYWdlJykge1xyXG5cdFx0XHRzZXR0aW5ncy5zbGlkZUJ5ID0gTWF0aC5taW4oK3NldHRpbmdzLnNsaWRlQnksIHNldHRpbmdzLml0ZW1zKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoc2V0dGluZ3MuZG90cyB8fCBzZXR0aW5ncy5zbGlkZUJ5ID09PSAncGFnZScpIHtcclxuXHJcblx0XHRcdGZvciAoaSA9IGxvd2VyLCBqID0gMCwgayA9IDA7IGkgPCB1cHBlcjsgaSsrKSB7XHJcblx0XHRcdFx0aWYgKGogPj0gc2l6ZSB8fCBqID09PSAwKSB7XHJcblx0XHRcdFx0XHRwYWdlcy5wdXNoKHtcclxuXHRcdFx0XHRcdFx0c3RhcnQ6IE1hdGgubWluKG1heGltdW0sIGkgLSBsb3dlciksXHJcblx0XHRcdFx0XHRcdGVuZDogaSAtIGxvd2VyICsgc2l6ZSAtIDFcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0aWYgKE1hdGgubWluKG1heGltdW0sIGkgLSBsb3dlcikgPT09IG1heGltdW0pIHtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRqID0gMCwgKytrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRqICs9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm1lcmdlcnModGhpcy5jYXJvdXNlbFNlcnZpY2UucmVsYXRpdmUoaSkpIGFzIG51bWJlcjtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0dGhpcy5fcGFnZXMgPSBwYWdlcztcclxuXHR9XHJcblxyXG4gIC8qKlxyXG5cdCAqIERyYXdzIHRoZSB1c2VyIGludGVyZmFjZS5cclxuXHQgKiBAdG9kbyBUaGUgb3B0aW9uIGBkb3RzRGF0YWAgd29udCB3b3JrLlxyXG5cdCAqL1xyXG4gIGRyYXcoKSB7XHJcblx0XHRsZXQgZGlmZmVyZW5jZTogbnVtYmVyO1xyXG4gICAgY29uc3RcdHNldHRpbmdzOiBPd2xPcHRpb25zID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MsXHJcbiAgICAgIGl0ZW1zOiBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlW10gPSB0aGlzLmNhcm91c2VsU2VydmljZS5pdGVtcygpLFxyXG4gICAgICBkaXNhYmxlZCA9IGl0ZW1zLmxlbmd0aCA8PSBzZXR0aW5ncy5pdGVtcztcclxuXHJcblx0XHR0aGlzLl9uYXZEYXRhLmRpc2FibGVkID0gIXNldHRpbmdzLm5hdiB8fCBkaXNhYmxlZDtcclxuXHRcdHRoaXMuX2RvdHNEYXRhLmRpc2FibGVkID0gIXNldHRpbmdzLmRvdHMgfHwgZGlzYWJsZWQ7XHJcblxyXG5cdFx0aWYgKHNldHRpbmdzLmRvdHMpIHtcclxuXHRcdFx0ZGlmZmVyZW5jZSA9IHRoaXMuX3BhZ2VzLmxlbmd0aCAtIHRoaXMuX2RvdHNEYXRhLmRvdHMubGVuZ3RoO1xyXG5cclxuXHRcdFx0aWYgKHNldHRpbmdzLmRvdHNEYXRhICYmIGRpZmZlcmVuY2UgIT09IDApIHtcclxuICAgICAgICB0aGlzLl9kb3RzRGF0YS5kb3RzID0gW107XHJcbiAgICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgIHRoaXMuX2RvdHNEYXRhLmRvdHMucHVzaCh7XHJcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGlkOiBgZG90LSR7aXRlbS5pZH1gLFxyXG4gICAgICAgICAgICBpbm5lckNvbnRlbnQ6IGl0ZW0uZG90Q29udGVudCxcclxuICAgICAgICAgICAgc2hvd0lubmVyQ29udGVudDogdHJ1ZVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblx0XHRcdH0gZWxzZSBpZiAoZGlmZmVyZW5jZSA+IDApIHtcclxuICAgICAgICBjb25zdCBzdGFydEk6IG51bWJlciA9IHRoaXMuX2RvdHNEYXRhLmRvdHMubGVuZ3RoID4gMCA/IHRoaXMuX2RvdHNEYXRhLmRvdHMubGVuZ3RoIDogMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpZmZlcmVuY2U7IGkrKykge1xyXG4gICAgICAgICAgdGhpcy5fZG90c0RhdGEuZG90cy5wdXNoKHtcclxuICAgICAgICAgICAgYWN0aXZlOiBmYWxzZSxcclxuICAgICAgICAgICAgaWQ6IGBkb3QtJHtpICsgc3RhcnRJfWAsXHJcbiAgICAgICAgICAgIHNob3dJbm5lckNvbnRlbnQ6IGZhbHNlXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblx0XHRcdH0gZWxzZSBpZiAoZGlmZmVyZW5jZSA8IDApIHtcclxuICAgICAgICB0aGlzLl9kb3RzRGF0YS5kb3RzLnNwbGljZShkaWZmZXJlbmNlLCBNYXRoLmFicyhkaWZmZXJlbmNlKSlcclxuXHRcdFx0fVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm5hdkRhdGEgPSB0aGlzLl9uYXZEYXRhO1xyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UuZG90c0RhdGEgPSB0aGlzLl9kb3RzRGF0YTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGVzIG5hdmlnYXRpb24gYnV0dG9ucydzIGFuZCBkb3RzJ3Mgc3RhdGVzXHJcbiAgICovXHJcbiAgdXBkYXRlKCkge1xyXG4gICAgdGhpcy5fdXBkYXRlTmF2QnV0dG9ucygpO1xyXG4gICAgdGhpcy5fdXBkYXRlRG90cygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hhbmdlcyBzdGF0ZSBvZiBuYXYgYnV0dG9ucyAoZGlzYWJsZWQsIGVuYWJsZWQpXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfdXBkYXRlTmF2QnV0dG9ucygpIHtcclxuICAgIGNvbnN0XHRzZXR0aW5nczogT3dsT3B0aW9ucyA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLFxyXG4gICAgICBsb29wOiBib29sZWFuID0gc2V0dGluZ3MubG9vcCB8fCBzZXR0aW5ncy5yZXdpbmQsXHJcbiAgICAgIGluZGV4OiBudW1iZXIgPSB0aGlzLmNhcm91c2VsU2VydmljZS5yZWxhdGl2ZSh0aGlzLmNhcm91c2VsU2VydmljZS5jdXJyZW50KCkpO1xyXG5cclxuICAgIGlmIChzZXR0aW5ncy5uYXYpIHtcclxuICAgICAgdGhpcy5fbmF2RGF0YS5wcmV2LmRpc2FibGVkID0gIWxvb3AgJiYgaW5kZXggPD0gdGhpcy5jYXJvdXNlbFNlcnZpY2UubWluaW11bSh0cnVlKTtcclxuXHRcdFx0dGhpcy5fbmF2RGF0YS5uZXh0LmRpc2FibGVkID0gIWxvb3AgJiYgaW5kZXggPj0gdGhpcy5jYXJvdXNlbFNlcnZpY2UubWF4aW11bSh0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5uYXZEYXRhID0gdGhpcy5fbmF2RGF0YTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoYW5nZXMgYWN0aXZlIGRvdCBpZiBwYWdlIGJlY29tZXMgY2hhbmdlZFxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3VwZGF0ZURvdHMoKSB7XHJcbiAgICBsZXQgY3VyQWN0aXZlRG90STogbnVtYmVyO1xyXG4gICAgdGhpcy5fZG90c0RhdGEuZG90cy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICBpZiAoaXRlbS5hY3RpdmUgPT09IHRydWUpIHtcclxuICAgICAgICBpdGVtLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIGN1ckFjdGl2ZURvdEkgPSB0aGlzLl9jdXJyZW50KCk7XHJcbiAgICBpZiAodGhpcy5fZG90c0RhdGEuZG90cy5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5fZG90c0RhdGEuZG90c1tjdXJBY3RpdmVEb3RJXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UuZG90c0RhdGEgPSB0aGlzLl9kb3RzRGF0YTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG5cdCAqIEdldHMgdGhlIGN1cnJlbnQgcGFnZSBwb3NpdGlvbiBvZiB0aGUgY2Fyb3VzZWwuXHJcblx0ICogQHJldHVybnMgdGhlIGN1cnJlbnQgcGFnZSBwb3NpdGlvbiBvZiB0aGUgY2Fyb3VzZWxcclxuXHQgKi9cclxuXHRwcml2YXRlIF9jdXJyZW50KCk6IGFueSB7XHJcbiAgICBjb25zdCBjdXJyZW50OiBudW1iZXIgPSB0aGlzLmNhcm91c2VsU2VydmljZS5yZWxhdGl2ZSh0aGlzLmNhcm91c2VsU2VydmljZS5jdXJyZW50KCkpO1xyXG4gICAgbGV0IGZpbmFsQ3VycmVudDogbnVtYmVyO1xyXG4gICAgY29uc3QgcGFnZXM6IGFueSA9IHRoaXMuX3BhZ2VzLmZpbHRlcigocGFnZSwgaW5kZXgpID0+IHtcclxuICAgICAgcmV0dXJuIHBhZ2Uuc3RhcnQgPD0gY3VycmVudCAmJiBwYWdlLmVuZCA+PSBjdXJyZW50O1xyXG4gICAgfSkucG9wKCk7XHJcblxyXG4gICAgZmluYWxDdXJyZW50ID0gdGhpcy5fcGFnZXMuZmluZEluZGV4KHBhZ2UgPT4ge1xyXG4gICAgICByZXR1cm4gcGFnZS5zdGFydCA9PT0gcGFnZXMuc3RhcnQgJiYgcGFnZS5lbmQgPT09IHBhZ2VzLmVuZDtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBmaW5hbEN1cnJlbnQ7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcblx0ICogR2V0cyB0aGUgY3VycmVudCBzdWNjZXNvci9wcmVkZWNlc3NvciBwb3NpdGlvbi5cclxuICAgKiBAcGFyYW0gc3Vzc2Vzc29yIHBvc2l0aW9uIG9mIHNsaWRlXHJcblx0ICogQHJldHVybnMgdGhlIGN1cnJlbnQgc3VjY2Vzb3IvcHJlZGVjZXNzb3IgcG9zaXRpb25cclxuXHQgKi9cclxuXHRwcml2YXRlIF9nZXRQb3NpdGlvbihzdWNjZXNzb3I6IG51bWJlciB8IGJvb2xlYW4pOiBudW1iZXIge1xyXG5cdFx0bGV0IHBvc2l0aW9uOiBudW1iZXIsIGxlbmd0aDogbnVtYmVyO1xyXG5cdFx0Y29uc3RcdHNldHRpbmdzOiBPd2xPcHRpb25zID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3M7XHJcblxyXG5cdFx0aWYgKHNldHRpbmdzLnNsaWRlQnkgPT09ICdwYWdlJykge1xyXG5cdFx0XHRwb3NpdGlvbiA9IHRoaXMuX2N1cnJlbnQoKTtcclxuXHRcdFx0bGVuZ3RoID0gdGhpcy5fcGFnZXMubGVuZ3RoO1xyXG5cdFx0XHRzdWNjZXNzb3IgPyArK3Bvc2l0aW9uIDogLS1wb3NpdGlvbjtcclxuXHRcdFx0cG9zaXRpb24gPSB0aGlzLl9wYWdlc1soKHBvc2l0aW9uICUgbGVuZ3RoKSArIGxlbmd0aCkgJSBsZW5ndGhdLnN0YXJ0O1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cG9zaXRpb24gPSB0aGlzLmNhcm91c2VsU2VydmljZS5yZWxhdGl2ZSh0aGlzLmNhcm91c2VsU2VydmljZS5jdXJyZW50KCkpO1xyXG5cdFx0XHRsZW5ndGggPSB0aGlzLmNhcm91c2VsU2VydmljZS5pdGVtcygpLmxlbmd0aDtcclxuXHRcdFx0c3VjY2Vzc29yID8gcG9zaXRpb24gKz0gK3NldHRpbmdzLnNsaWRlQnkgOiBwb3NpdGlvbiAtPSArc2V0dGluZ3Muc2xpZGVCeTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcG9zaXRpb247XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcblx0ICogU2xpZGVzIHRvIHRoZSBuZXh0IGl0ZW0gb3IgcGFnZS5cclxuXHQgKiBAcGFyYW0gc3BlZWQgVGhlIHRpbWUgaW4gbWlsbGlzZWNvbmRzIGZvciB0aGUgdHJhbnNpdGlvbi5cclxuXHQgKi9cclxuXHRuZXh0KHNwZWVkOiBudW1iZXIgfCBib29sZWFuKSB7XHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS50byh0aGlzLl9nZXRQb3NpdGlvbih0cnVlKSwgc3BlZWQpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNsaWRlcyB0byB0aGUgcHJldmlvdXMgaXRlbSBvciBwYWdlLlxyXG5cdCAqIEBwYXJhbSBzcGVlZCBUaGUgdGltZSBpbiBtaWxsaXNlY29uZHMgZm9yIHRoZSB0cmFuc2l0aW9uLlxyXG5cdCAqL1xyXG5cdHByZXYoc3BlZWQ6IG51bWJlciB8IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnRvKHRoaXMuX2dldFBvc2l0aW9uKGZhbHNlKSwgc3BlZWQpO1xyXG4gIH07XHJcblxyXG4gXHQvKipcclxuXHQgKiBTbGlkZXMgdG8gdGhlIHNwZWNpZmllZCBpdGVtIG9yIHBhZ2UuXHJcblx0ICogQHBhcmFtIHBvc2l0aW9uIC0gVGhlIHBvc2l0aW9uIG9mIHRoZSBpdGVtIG9yIHBhZ2UuXHJcblx0ICogQHBhcmFtIHNwZWVkIC0gVGhlIHRpbWUgaW4gbWlsbGlzZWNvbmRzIGZvciB0aGUgdHJhbnNpdGlvbi5cclxuXHQgKiBAcGFyYW0gc3RhbmRhcmQgLSBXaGV0aGVyIHRvIHVzZSB0aGUgc3RhbmRhcmQgYmVoYXZpb3VyIG9yIG5vdC4gRGVmYXVsdCBtZWFuaW5nIGZhbHNlXHJcblx0ICovXHJcblx0dG8ocG9zaXRpb246IG51bWJlciwgc3BlZWQ6IG51bWJlciB8IGJvb2xlYW4sIHN0YW5kYXJkPzogYm9vbGVhbikge1xyXG5cdFx0bGV0IGxlbmd0aDogbnVtYmVyO1xyXG5cdFx0aWYgKCFzdGFuZGFyZCAmJiB0aGlzLl9wYWdlcy5sZW5ndGgpIHtcclxuICAgICAgbGVuZ3RoID0gdGhpcy5fcGFnZXMubGVuZ3RoO1xyXG4gICAgICB0aGlzLmNhcm91c2VsU2VydmljZS50byh0aGlzLl9wYWdlc1soKHBvc2l0aW9uICUgbGVuZ3RoKSArIGxlbmd0aCkgJSBsZW5ndGhdLnN0YXJ0LCBzcGVlZCk7XHJcblx0XHR9IGVsc2Uge1xyXG4gICAgICB0aGlzLmNhcm91c2VsU2VydmljZS50byhwb3NpdGlvbiwgc3BlZWQpO1xyXG5cdFx0fVxyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIE1vdmVzIGNhcm91c2VsIGFmdGVyIHVzZXIncyBjbGlja2luZyBvbiBhbnkgZG90c1xyXG4gICAqL1xyXG4gIG1vdmVCeURvdChkb3RJZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBpbmRleDogbnVtYmVyID0gdGhpcy5fZG90c0RhdGEuZG90cy5maW5kSW5kZXgoZG90ID0+IGRvdElkID09PSBkb3QuaWQpO1xyXG4gICAgdGhpcy50byhpbmRleCwgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuZG90c1NwZWVkKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHJld2luZHMgY2Fyb3VzZWwgdG8gc2xpZGUgd2l0aCBuZWVkZWQgaWRcclxuICAgKiBAcGFyYW0gaWQgaWQgb2Ygc2xpZGVcclxuICAgKi9cclxuICB0b1NsaWRlQnlJZChpZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNsaWRlc0RhdGEuZmluZEluZGV4KHNsaWRlID0+IHNsaWRlLmlkID09PSBpZCAmJiBzbGlkZS5pc0Nsb25lZCA9PT0gZmFsc2UpO1xyXG5cclxuICAgIGlmIChwb3NpdGlvbiA9PT0gLTEgfHwgcG9zaXRpb24gPT09IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmN1cnJlbnQoKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG5cdFx0dGhpcy5jYXJvdXNlbFNlcnZpY2UudG8odGhpcy5jYXJvdXNlbFNlcnZpY2UucmVsYXRpdmUocG9zaXRpb24pLCBmYWxzZSk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=