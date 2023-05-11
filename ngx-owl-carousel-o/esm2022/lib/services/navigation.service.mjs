import { Injectable } from '@angular/core';
import { merge } from 'rxjs';
import { tap, filter } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./carousel.service";
class NavigationService {
    carouselService;
    /**
     * Subscrioption to merge Observable  from CarouselService
     */
    navSubscription;
    /**
     * Indicates whether the plugin is initialized or not.
     */
    _initialized = false;
    /**
     * The current paging indexes.
     */
    _pages = [];
    /**
     * Data for navigation elements of the user interface.
     */
    _navData = {
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
    _dotsData = {
        disabled: false,
        dots: []
    };
    constructor(carouselService) {
        this.carouselService = carouselService;
        this.spyDataStreams();
    }
    ngOnDestroy() {
        this.navSubscription.unsubscribe();
    }
    /**
     * Defines Observables which service must observe
     */
    spyDataStreams() {
        const initializedCarousel$ = this.carouselService.getInitializedState().pipe(tap(state => {
            this.initialize();
            this._updateNavPages();
            this.draw();
            this.update();
            this.carouselService.sendChanges();
        }));
        // mostly changes in carouselService and carousel at all causes carouselService.to(). It moves stage right-left by its code and calling needed functions
        // Thus this method by calling carouselService.current(position) notifies about changes
        const changedSettings$ = this.carouselService.getChangedState().pipe(filter(data => data.property.name === 'position'), tap(data => {
            this.update();
            // should be the call of the function written at the end of comment
            // but the method carouselServive.to() has setTimeout(f, 0) which contains carouselServive.update() which calls sendChanges() method.
            // carouselService.navData and carouselService.dotsData update earlier than carouselServive.update() gets called
            // updates of carouselService.navData and carouselService.dotsData are being happening withing carouselService.current(position) method which calls next() of _changedSettingsCarousel$
            // carouselService.current(position) is being calling earlier than carouselServive.update();
            // this.carouselService.sendChanges();
        }));
        const refreshedCarousel$ = this.carouselService.getRefreshedState().pipe(tap(() => {
            this._updateNavPages();
            this.draw();
            this.update();
            this.carouselService.sendChanges();
        }));
        const navMerge$ = merge(initializedCarousel$, changedSettings$, refreshedCarousel$);
        this.navSubscription = navMerge$.subscribe(() => { });
    }
    /**
       * Initializes the layout of the plugin and extends the carousel.
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
     */
    _updateNavPages() {
        let i, j, k;
        const lower = this.carouselService.clones().length / 2, upper = lower + this.carouselService.items().length, maximum = this.carouselService.maximum(true), pages = [], settings = this.carouselService.settings;
        let size = settings.center || settings.autoWidth || settings.dotsData
            ? 1 : Math.floor(Number(settings.dotsEach)) || Math.floor(settings.items);
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
    }
    /**
       * Draws the user interface.
       * @todo The option `dotsData` wont work.
       */
    draw() {
        let difference;
        const settings = this.carouselService.settings, items = this.carouselService.items(), disabled = items.length <= settings.items;
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
                const startI = this._dotsData.dots.length > 0 ? this._dotsData.dots.length : 0;
                for (let i = 0; i < difference; i++) {
                    this._dotsData.dots.push({
                        active: false,
                        id: `dot-${i + startI}`,
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
    }
    ;
    /**
     * Updates navigation buttons's and dots's states
     */
    update() {
        this._updateNavButtons();
        this._updateDots();
    }
    /**
     * Changes state of nav buttons (disabled, enabled)
     */
    _updateNavButtons() {
        const settings = this.carouselService.settings, loop = settings.loop || settings.rewind, index = this.carouselService.relative(this.carouselService.current());
        if (settings.nav) {
            this._navData.prev.disabled = !loop && index <= this.carouselService.minimum(true);
            this._navData.next.disabled = !loop && index >= this.carouselService.maximum(true);
        }
        this.carouselService.navData = this._navData;
    }
    /**
     * Changes active dot if page becomes changed
     */
    _updateDots() {
        let curActiveDotI;
        if (!this.carouselService.settings.dots) {
            return;
        }
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
       * @returns the current page position of the carousel
       */
    _current() {
        const current = this.carouselService.relative(this.carouselService.current());
        let finalCurrent;
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
     * @param sussessor position of slide
       * @returns the current succesor/predecessor position
       */
    _getPosition(successor) {
        let position, length;
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
       * @param speed The time in milliseconds for the transition.
       */
    next(speed) {
        this.carouselService.to(this._getPosition(true), speed);
    }
    ;
    /**
     * Slides to the previous item or page.
     * @param speed The time in milliseconds for the transition.
     */
    prev(speed) {
        this.carouselService.to(this._getPosition(false), speed);
    }
    ;
    /**
     * Slides to the specified item or page.
     * @param position - The position of the item or page.
     * @param speed - The time in milliseconds for the transition.
     * @param standard - Whether to use the standard behaviour or not. Default meaning false
     */
    to(position, speed, standard) {
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
     */
    moveByDot(dotId) {
        const index = this._dotsData.dots.findIndex(dot => dotId === dot.id);
        this.to(index, this.carouselService.settings.dotsSpeed);
    }
    /**
     * rewinds carousel to slide with needed id
     * @param id id of slide
     */
    toSlideById(id) {
        const position = this.carouselService.slidesData.findIndex(slide => slide.id === id && slide.isCloned === false);
        if (position === -1 || position === this.carouselService.current()) {
            return;
        }
        this.carouselService.to(this.carouselService.relative(position), false);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: NavigationService, deps: [{ token: i1.CarouselService }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: NavigationService });
}
export { NavigationService };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: NavigationService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.CarouselService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGlicy9uZ3gtb3dsLWNhcm91c2VsLW8vc3JjL2xpYi9zZXJ2aWNlcy9uYXZpZ2F0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUl0RCxPQUFPLEVBQTRCLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2RCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7QUFHN0MsTUFDYSxpQkFBaUI7SUF1Q1I7SUF0Q3BCOztPQUVHO0lBQ0gsZUFBZSxDQUFlO0lBRTlCOztPQUVHO0lBQ08sWUFBWSxHQUFHLEtBQUssQ0FBQztJQUUvQjs7T0FFRztJQUNPLE1BQU0sR0FBVSxFQUFFLENBQUM7SUFFN0I7O09BRUc7SUFDTyxRQUFRLEdBQVk7UUFDNUIsUUFBUSxFQUFFLEtBQUs7UUFDZixJQUFJLEVBQUU7WUFDSixRQUFRLEVBQUUsS0FBSztZQUNmLFFBQVEsRUFBRSxFQUFFO1NBQ2I7UUFDRCxJQUFJLEVBQUU7WUFDSixRQUFRLEVBQUUsS0FBSztZQUNmLFFBQVEsRUFBRSxFQUFFO1NBQ2I7S0FDRixDQUFDO0lBRUY7O09BRUc7SUFDTyxTQUFTLEdBQWE7UUFDOUIsUUFBUSxFQUFFLEtBQUs7UUFDZixJQUFJLEVBQUUsRUFBRTtLQUNULENBQUM7SUFFRixZQUFvQixlQUFnQztRQUFoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDbEQsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxjQUFjO1FBQ1osTUFBTSxvQkFBb0IsR0FBdUIsSUFBSSxDQUFDLGVBQWUsQ0FB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QUQ3QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOYXZEYXRhLCBEb3RzRGF0YSB9IGZyb20gJy4uL21vZGVscy9uYXZpZ2F0aW9uLWRhdGEubW9kZWxzJztcbmltcG9ydCB7IENhcm91c2VsU2xpZGVEaXJlY3RpdmUgfSBmcm9tICcuLi9jYXJvdXNlbC9jYXJvdXNlbC1zbGlkZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQ2Fyb3VzZWxTZXJ2aWNlIH0gZnJvbSAnLi9jYXJvdXNlbC5zZXJ2aWNlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgT2JzZXJ2YWJsZSwgbWVyZ2UgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRhcCwgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgT3dsT3B0aW9ucyB9IGZyb20gJy4uL21vZGVscy9vd2wtb3B0aW9ucy5tb2RlbCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOYXZpZ2F0aW9uU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIC8qKlxuICAgKiBTdWJzY3Jpb3B0aW9uIHRvIG1lcmdlIE9ic2VydmFibGUgIGZyb20gQ2Fyb3VzZWxTZXJ2aWNlXG4gICAqL1xuICBuYXZTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKipcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHBsdWdpbiBpcyBpbml0aWFsaXplZCBvciBub3QuXG4gICAqL1xuICBwcm90ZWN0ZWQgX2luaXRpYWxpemVkID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50IHBhZ2luZyBpbmRleGVzLlxuICAgKi9cbiAgcHJvdGVjdGVkIF9wYWdlczogYW55W10gPSBbXTtcblxuICAvKipcbiAgICogRGF0YSBmb3IgbmF2aWdhdGlvbiBlbGVtZW50cyBvZiB0aGUgdXNlciBpbnRlcmZhY2UuXG4gICAqL1xuICBwcm90ZWN0ZWQgX25hdkRhdGE6IE5hdkRhdGEgPSB7XG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgIHByZXY6IHtcbiAgICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICAgIGh0bWxUZXh0OiAnJ1xuICAgIH0sXG4gICAgbmV4dDoge1xuICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgaHRtbFRleHQ6ICcnXG4gICAgfSxcbiAgfTtcblxuICAvKipcbiAgICogRGF0YSBmb3IgZG90IGVsZW1lbnRzIG9mIHRoZSB1c2VyIGludGVyZmFjZS5cbiAgICovXG4gIHByb3RlY3RlZCBfZG90c0RhdGE6IERvdHNEYXRhID0ge1xuICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICBkb3RzOiBbXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2Fyb3VzZWxTZXJ2aWNlOiBDYXJvdXNlbFNlcnZpY2UpIHtcbiAgICB0aGlzLnNweURhdGFTdHJlYW1zKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLm5hdlN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlZmluZXMgT2JzZXJ2YWJsZXMgd2hpY2ggc2VydmljZSBtdXN0IG9ic2VydmVcbiAgICovXG4gIHNweURhdGFTdHJlYW1zKCkge1xuICAgIGNvbnN0IGluaXRpYWxpemVkQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRJbml0aWFsaXplZFN0YXRlKCkucGlwZShcbiAgICAgIHRhcChzdGF0ZSA9PiB7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xuICAgICAgICB0aGlzLl91cGRhdGVOYXZQYWdlcygpO1xuICAgICAgICB0aGlzLmRyYXcoKTtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2VuZENoYW5nZXMoKTtcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIC8vIG1vc3RseSBjaGFuZ2VzIGluIGNhcm91c2VsU2VydmljZSBhbmQgY2Fyb3VzZWwgYXQgYWxsIGNhdXNlcyBjYXJvdXNlbFNlcnZpY2UudG8oKS4gSXQgbW92ZXMgc3RhZ2UgcmlnaHQtbGVmdCBieSBpdHMgY29kZSBhbmQgY2FsbGluZyBuZWVkZWQgZnVuY3Rpb25zXG4gICAgLy8gVGh1cyB0aGlzIG1ldGhvZCBieSBjYWxsaW5nIGNhcm91c2VsU2VydmljZS5jdXJyZW50KHBvc2l0aW9uKSBub3RpZmllcyBhYm91dCBjaGFuZ2VzXG4gICAgY29uc3QgY2hhbmdlZFNldHRpbmdzJDogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0Q2hhbmdlZFN0YXRlKCkucGlwZShcbiAgICAgIGZpbHRlcihkYXRhID0+IGRhdGEucHJvcGVydHkubmFtZSA9PT0gJ3Bvc2l0aW9uJyksXG4gICAgICB0YXAoZGF0YSA9PiB7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIC8vIHNob3VsZCBiZSB0aGUgY2FsbCBvZiB0aGUgZnVuY3Rpb24gd3JpdHRlbiBhdCB0aGUgZW5kIG9mIGNvbW1lbnRcbiAgICAgICAgLy8gYnV0IHRoZSBtZXRob2QgY2Fyb3VzZWxTZXJ2aXZlLnRvKCkgaGFzIHNldFRpbWVvdXQoZiwgMCkgd2hpY2ggY29udGFpbnMgY2Fyb3VzZWxTZXJ2aXZlLnVwZGF0ZSgpIHdoaWNoIGNhbGxzIHNlbmRDaGFuZ2VzKCkgbWV0aG9kLlxuICAgICAgICAvLyBjYXJvdXNlbFNlcnZpY2UubmF2RGF0YSBhbmQgY2Fyb3VzZWxTZXJ2aWNlLmRvdHNEYXRhIHVwZGF0ZSBlYXJsaWVyIHRoYW4gY2Fyb3VzZWxTZXJ2aXZlLnVwZGF0ZSgpIGdldHMgY2FsbGVkXG4gICAgICAgIC8vIHVwZGF0ZXMgb2YgY2Fyb3VzZWxTZXJ2aWNlLm5hdkRhdGEgYW5kIGNhcm91c2VsU2VydmljZS5kb3RzRGF0YSBhcmUgYmVpbmcgaGFwcGVuaW5nIHdpdGhpbmcgY2Fyb3VzZWxTZXJ2aWNlLmN1cnJlbnQocG9zaXRpb24pIG1ldGhvZCB3aGljaCBjYWxscyBuZXh0KCkgb2YgX2NoYW5nZWRTZXR0aW5nc0Nhcm91c2VsJFxuICAgICAgICAvLyBjYXJvdXNlbFNlcnZpY2UuY3VycmVudChwb3NpdGlvbikgaXMgYmVpbmcgY2FsbGluZyBlYXJsaWVyIHRoYW4gY2Fyb3VzZWxTZXJ2aXZlLnVwZGF0ZSgpO1xuICAgICAgICAvLyB0aGlzLmNhcm91c2VsU2VydmljZS5zZW5kQ2hhbmdlcygpO1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgY29uc3QgcmVmcmVzaGVkQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRSZWZyZXNoZWRTdGF0ZSgpLnBpcGUoXG4gICAgICB0YXAoKCkgPT4ge1xuICAgICAgICB0aGlzLl91cGRhdGVOYXZQYWdlcygpO1xuICAgICAgICB0aGlzLmRyYXcoKTtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2VuZENoYW5nZXMoKTtcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIGNvbnN0IG5hdk1lcmdlJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gbWVyZ2UoaW5pdGlhbGl6ZWRDYXJvdXNlbCQsIGNoYW5nZWRTZXR0aW5ncyQsIHJlZnJlc2hlZENhcm91c2VsJCk7XG4gICAgdGhpcy5uYXZTdWJzY3JpcHRpb24gPSBuYXZNZXJnZSQuc3Vic2NyaWJlKFxuICAgICAgKCkgPT4ge31cbiAgICApO1xuICB9XG5cbiAgLyoqXG5cdCAqIEluaXRpYWxpemVzIHRoZSBsYXlvdXQgb2YgdGhlIHBsdWdpbiBhbmQgZXh0ZW5kcyB0aGUgY2Fyb3VzZWwuXG5cdCAqL1xuXHRpbml0aWFsaXplKCkge1xuICAgIHRoaXMuX25hdkRhdGEuZGlzYWJsZWQgPSB0cnVlO1xuICAgIHRoaXMuX25hdkRhdGEucHJldi5odG1sVGV4dCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLm5hdlRleHRbMF07XG4gICAgdGhpcy5fbmF2RGF0YS5uZXh0Lmh0bWxUZXh0ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MubmF2VGV4dFsxXTtcblxuICAgIHRoaXMuX2RvdHNEYXRhLmRpc2FibGVkID0gdHJ1ZTtcblxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm5hdkRhdGEgPSB0aGlzLl9uYXZEYXRhO1xuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmRvdHNEYXRhID0gdGhpcy5fZG90c0RhdGE7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlcyBpbnRlcm5hbCBzdGF0ZXMgYW5kIHVwZGF0ZXMgcHJvcCBfcGFnZXNcbiAgICovXG5cdHByaXZhdGUgX3VwZGF0ZU5hdlBhZ2VzKCkge1xuXHRcdGxldCBpOiBudW1iZXIsIGo6IG51bWJlciwgazogbnVtYmVyO1xuXHRcdGNvbnN0IGxvd2VyOiBudW1iZXIgPSB0aGlzLmNhcm91c2VsU2VydmljZS5jbG9uZXMoKS5sZW5ndGggLyAyLFxuICAgICAgdXBwZXI6IG51bWJlciA9IGxvd2VyICsgdGhpcy5jYXJvdXNlbFNlcnZpY2UuaXRlbXMoKS5sZW5ndGgsXG4gICAgICBtYXhpbXVtOiBudW1iZXIgPSB0aGlzLmNhcm91c2VsU2VydmljZS5tYXhpbXVtKHRydWUpLFxuICAgICAgcGFnZXM6IGFueVtdID0gW10sXG4gICAgICBzZXR0aW5nczogT3dsT3B0aW9ucyA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzO1xuICAgICBsZXQgc2l6ZSA9IHNldHRpbmdzLmNlbnRlciB8fCBzZXR0aW5ncy5hdXRvV2lkdGggfHwgc2V0dGluZ3MuZG90c0RhdGFcbiAgICAgICAgPyAxIDogTWF0aC5mbG9vcihOdW1iZXIoc2V0dGluZ3MuZG90c0VhY2gpKSB8fCBNYXRoLmZsb29yKHNldHRpbmdzLml0ZW1zKTtcbiAgICAgIHNpemUgPSArc2l6ZTtcblx0XHRpZiAoc2V0dGluZ3Muc2xpZGVCeSAhPT0gJ3BhZ2UnKSB7XG5cdFx0XHRzZXR0aW5ncy5zbGlkZUJ5ID0gTWF0aC5taW4oK3NldHRpbmdzLnNsaWRlQnksIHNldHRpbmdzLml0ZW1zKTtcblx0XHR9XG5cblx0XHRpZiAoc2V0dGluZ3MuZG90cyB8fCBzZXR0aW5ncy5zbGlkZUJ5ID09PSAncGFnZScpIHtcblxuXHRcdFx0Zm9yIChpID0gbG93ZXIsIGogPSAwLCBrID0gMDsgaSA8IHVwcGVyOyBpKyspIHtcblx0XHRcdFx0aWYgKGogPj0gc2l6ZSB8fCBqID09PSAwKSB7XG5cdFx0XHRcdFx0cGFnZXMucHVzaCh7XG5cdFx0XHRcdFx0XHRzdGFydDogTWF0aC5taW4obWF4aW11bSwgaSAtIGxvd2VyKSxcblx0XHRcdFx0XHRcdGVuZDogaSAtIGxvd2VyICsgc2l6ZSAtIDFcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRpZiAoTWF0aC5taW4obWF4aW11bSwgaSAtIGxvd2VyKSA9PT0gbWF4aW11bSkge1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGogPSAwLCArK2s7XG5cdFx0XHRcdH1cblx0XHRcdFx0aiArPSB0aGlzLmNhcm91c2VsU2VydmljZS5tZXJnZXJzKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnJlbGF0aXZlKGkpKSBhcyBudW1iZXI7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuX3BhZ2VzID0gcGFnZXM7XG5cdH1cblxuICAvKipcblx0ICogRHJhd3MgdGhlIHVzZXIgaW50ZXJmYWNlLlxuXHQgKiBAdG9kbyBUaGUgb3B0aW9uIGBkb3RzRGF0YWAgd29udCB3b3JrLlxuXHQgKi9cbiAgZHJhdygpIHtcblx0XHRsZXQgZGlmZmVyZW5jZTogbnVtYmVyO1xuICAgIGNvbnN0XHRzZXR0aW5nczogT3dsT3B0aW9ucyA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLFxuICAgICAgaXRlbXM6IENhcm91c2VsU2xpZGVEaXJlY3RpdmVbXSA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLml0ZW1zKCksXG4gICAgICBkaXNhYmxlZCA9IGl0ZW1zLmxlbmd0aCA8PSBzZXR0aW5ncy5pdGVtcztcblxuXHRcdHRoaXMuX25hdkRhdGEuZGlzYWJsZWQgPSAhc2V0dGluZ3MubmF2IHx8IGRpc2FibGVkO1xuXHRcdHRoaXMuX2RvdHNEYXRhLmRpc2FibGVkID0gIXNldHRpbmdzLmRvdHMgfHwgZGlzYWJsZWQ7XG5cblx0XHRpZiAoc2V0dGluZ3MuZG90cykge1xuXHRcdFx0ZGlmZmVyZW5jZSA9IHRoaXMuX3BhZ2VzLmxlbmd0aCAtIHRoaXMuX2RvdHNEYXRhLmRvdHMubGVuZ3RoO1xuXG5cdFx0XHRpZiAoc2V0dGluZ3MuZG90c0RhdGEgJiYgZGlmZmVyZW5jZSAhPT0gMCkge1xuICAgICAgICB0aGlzLl9kb3RzRGF0YS5kb3RzID0gW107XG4gICAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgdGhpcy5fZG90c0RhdGEuZG90cy5wdXNoKHtcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgICAgICAgICBpZDogYGRvdC0ke2l0ZW0uaWR9YCxcbiAgICAgICAgICAgIGlubmVyQ29udGVudDogaXRlbS5kb3RDb250ZW50LFxuICAgICAgICAgICAgc2hvd0lubmVyQ29udGVudDogdHJ1ZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblx0XHRcdH0gZWxzZSBpZiAoZGlmZmVyZW5jZSA+IDApIHtcbiAgICAgICAgY29uc3Qgc3RhcnRJOiBudW1iZXIgPSB0aGlzLl9kb3RzRGF0YS5kb3RzLmxlbmd0aCA+IDAgPyB0aGlzLl9kb3RzRGF0YS5kb3RzLmxlbmd0aCA6IDA7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGlmZmVyZW5jZTsgaSsrKSB7XG4gICAgICAgICAgdGhpcy5fZG90c0RhdGEuZG90cy5wdXNoKHtcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgICAgICAgICBpZDogYGRvdC0ke2kgKyBzdGFydEl9YCxcbiAgICAgICAgICAgIGlubmVyQ29udGVudDogJycsXG4gICAgICAgICAgICBzaG93SW5uZXJDb250ZW50OiBmYWxzZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cdFx0XHR9IGVsc2UgaWYgKGRpZmZlcmVuY2UgPCAwKSB7XG4gICAgICAgIHRoaXMuX2RvdHNEYXRhLmRvdHMuc3BsaWNlKGRpZmZlcmVuY2UsIE1hdGguYWJzKGRpZmZlcmVuY2UpKVxuXHRcdFx0fVxuICAgIH1cblxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm5hdkRhdGEgPSB0aGlzLl9uYXZEYXRhO1xuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmRvdHNEYXRhID0gdGhpcy5fZG90c0RhdGE7XG4gIH07XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgbmF2aWdhdGlvbiBidXR0b25zJ3MgYW5kIGRvdHMncyBzdGF0ZXNcbiAgICovXG4gIHVwZGF0ZSgpIHtcbiAgICB0aGlzLl91cGRhdGVOYXZCdXR0b25zKCk7XG4gICAgdGhpcy5fdXBkYXRlRG90cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoYW5nZXMgc3RhdGUgb2YgbmF2IGJ1dHRvbnMgKGRpc2FibGVkLCBlbmFibGVkKVxuICAgKi9cbiAgcHJpdmF0ZSBfdXBkYXRlTmF2QnV0dG9ucygpIHtcbiAgICBjb25zdFx0c2V0dGluZ3M6IE93bE9wdGlvbnMgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncyxcbiAgICAgIGxvb3A6IGJvb2xlYW4gPSBzZXR0aW5ncy5sb29wIHx8IHNldHRpbmdzLnJld2luZCxcbiAgICAgIGluZGV4OiBudW1iZXIgPSB0aGlzLmNhcm91c2VsU2VydmljZS5yZWxhdGl2ZSh0aGlzLmNhcm91c2VsU2VydmljZS5jdXJyZW50KCkpO1xuXG4gICAgaWYgKHNldHRpbmdzLm5hdikge1xuICAgICAgdGhpcy5fbmF2RGF0YS5wcmV2LmRpc2FibGVkID0gIWxvb3AgJiYgaW5kZXggPD0gdGhpcy5jYXJvdXNlbFNlcnZpY2UubWluaW11bSh0cnVlKTtcblx0XHRcdHRoaXMuX25hdkRhdGEubmV4dC5kaXNhYmxlZCA9ICFsb29wICYmIGluZGV4ID49IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm1heGltdW0odHJ1ZSk7XG4gICAgfVxuXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UubmF2RGF0YSA9IHRoaXMuX25hdkRhdGE7XG4gIH1cblxuICAvKipcbiAgICogQ2hhbmdlcyBhY3RpdmUgZG90IGlmIHBhZ2UgYmVjb21lcyBjaGFuZ2VkXG4gICAqL1xuICBwcml2YXRlIF91cGRhdGVEb3RzKCkge1xuICAgIGxldCBjdXJBY3RpdmVEb3RJOiBudW1iZXI7XG5cbiAgICBpZighdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuZG90cykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9kb3RzRGF0YS5kb3RzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBpZiAoaXRlbS5hY3RpdmUgPT09IHRydWUpIHtcbiAgICAgICAgaXRlbS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgY3VyQWN0aXZlRG90SSA9IHRoaXMuX2N1cnJlbnQoKTtcbiAgICBpZiAodGhpcy5fZG90c0RhdGEuZG90cy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuX2RvdHNEYXRhLmRvdHNbY3VyQWN0aXZlRG90SV0uYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UuZG90c0RhdGEgPSB0aGlzLl9kb3RzRGF0YTtcbiAgfVxuXG4gIC8qKlxuXHQgKiBHZXRzIHRoZSBjdXJyZW50IHBhZ2UgcG9zaXRpb24gb2YgdGhlIGNhcm91c2VsLlxuXHQgKiBAcmV0dXJucyB0aGUgY3VycmVudCBwYWdlIHBvc2l0aW9uIG9mIHRoZSBjYXJvdXNlbFxuXHQgKi9cblx0cHJpdmF0ZSBfY3VycmVudCgpOiBhbnkge1xuICAgIGNvbnN0IGN1cnJlbnQ6IG51bWJlciA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnJlbGF0aXZlKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmN1cnJlbnQoKSk7XG4gICAgbGV0IGZpbmFsQ3VycmVudDogbnVtYmVyO1xuICAgIGNvbnN0IHBhZ2VzOiBhbnkgPSB0aGlzLl9wYWdlcy5maWx0ZXIoKHBhZ2UsIGluZGV4KSA9PiB7XG4gICAgICByZXR1cm4gcGFnZS5zdGFydCA8PSBjdXJyZW50ICYmIHBhZ2UuZW5kID49IGN1cnJlbnQ7XG4gICAgfSkucG9wKCk7XG5cbiAgICBmaW5hbEN1cnJlbnQgPSB0aGlzLl9wYWdlcy5maW5kSW5kZXgocGFnZSA9PiB7XG4gICAgICByZXR1cm4gcGFnZS5zdGFydCA9PT0gcGFnZXMuc3RhcnQgJiYgcGFnZS5lbmQgPT09IHBhZ2VzLmVuZDtcbiAgICB9KTtcblxuICAgIHJldHVybiBmaW5hbEN1cnJlbnQ7XG4gIH07XG5cbiAgLyoqXG5cdCAqIEdldHMgdGhlIGN1cnJlbnQgc3VjY2Vzb3IvcHJlZGVjZXNzb3IgcG9zaXRpb24uXG4gICAqIEBwYXJhbSBzdXNzZXNzb3IgcG9zaXRpb24gb2Ygc2xpZGVcblx0ICogQHJldHVybnMgdGhlIGN1cnJlbnQgc3VjY2Vzb3IvcHJlZGVjZXNzb3IgcG9zaXRpb25cblx0ICovXG5cdHByaXZhdGUgX2dldFBvc2l0aW9uKHN1Y2Nlc3NvcjogbnVtYmVyIHwgYm9vbGVhbik6IG51bWJlciB7XG5cdFx0bGV0IHBvc2l0aW9uOiBudW1iZXIsIGxlbmd0aDogbnVtYmVyO1xuXHRcdGNvbnN0XHRzZXR0aW5nczogT3dsT3B0aW9ucyA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzO1xuXG5cdFx0aWYgKHNldHRpbmdzLnNsaWRlQnkgPT09ICdwYWdlJykge1xuXHRcdFx0cG9zaXRpb24gPSB0aGlzLl9jdXJyZW50KCk7XG5cdFx0XHRsZW5ndGggPSB0aGlzLl9wYWdlcy5sZW5ndGg7XG5cdFx0XHRzdWNjZXNzb3IgPyArK3Bvc2l0aW9uIDogLS1wb3NpdGlvbjtcblx0XHRcdHBvc2l0aW9uID0gdGhpcy5fcGFnZXNbKChwb3NpdGlvbiAlIGxlbmd0aCkgKyBsZW5ndGgpICUgbGVuZ3RoXS5zdGFydDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cG9zaXRpb24gPSB0aGlzLmNhcm91c2VsU2VydmljZS5yZWxhdGl2ZSh0aGlzLmNhcm91c2VsU2VydmljZS5jdXJyZW50KCkpO1xuXHRcdFx0bGVuZ3RoID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuaXRlbXMoKS5sZW5ndGg7XG5cdFx0XHRzdWNjZXNzb3IgPyBwb3NpdGlvbiArPSArc2V0dGluZ3Muc2xpZGVCeSA6IHBvc2l0aW9uIC09ICtzZXR0aW5ncy5zbGlkZUJ5O1xuXHRcdH1cblxuXHRcdHJldHVybiBwb3NpdGlvbjtcbiAgfTtcblxuICAvKipcblx0ICogU2xpZGVzIHRvIHRoZSBuZXh0IGl0ZW0gb3IgcGFnZS5cblx0ICogQHBhcmFtIHNwZWVkIFRoZSB0aW1lIGluIG1pbGxpc2Vjb25kcyBmb3IgdGhlIHRyYW5zaXRpb24uXG5cdCAqL1xuXHRuZXh0KHNwZWVkOiBudW1iZXIgfCBib29sZWFuKSB7XG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UudG8odGhpcy5fZ2V0UG9zaXRpb24odHJ1ZSksIHNwZWVkKTtcblx0fTtcblxuXHQvKipcblx0ICogU2xpZGVzIHRvIHRoZSBwcmV2aW91cyBpdGVtIG9yIHBhZ2UuXG5cdCAqIEBwYXJhbSBzcGVlZCBUaGUgdGltZSBpbiBtaWxsaXNlY29uZHMgZm9yIHRoZSB0cmFuc2l0aW9uLlxuXHQgKi9cblx0cHJldihzcGVlZDogbnVtYmVyIHwgYm9vbGVhbikge1xuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnRvKHRoaXMuX2dldFBvc2l0aW9uKGZhbHNlKSwgc3BlZWQpO1xuICB9O1xuXG4gXHQvKipcblx0ICogU2xpZGVzIHRvIHRoZSBzcGVjaWZpZWQgaXRlbSBvciBwYWdlLlxuXHQgKiBAcGFyYW0gcG9zaXRpb24gLSBUaGUgcG9zaXRpb24gb2YgdGhlIGl0ZW0gb3IgcGFnZS5cblx0ICogQHBhcmFtIHNwZWVkIC0gVGhlIHRpbWUgaW4gbWlsbGlzZWNvbmRzIGZvciB0aGUgdHJhbnNpdGlvbi5cblx0ICogQHBhcmFtIHN0YW5kYXJkIC0gV2hldGhlciB0byB1c2UgdGhlIHN0YW5kYXJkIGJlaGF2aW91ciBvciBub3QuIERlZmF1bHQgbWVhbmluZyBmYWxzZVxuXHQgKi9cblx0dG8ocG9zaXRpb246IG51bWJlciwgc3BlZWQ6IG51bWJlciB8IGJvb2xlYW4sIHN0YW5kYXJkPzogYm9vbGVhbikge1xuXHRcdGxldCBsZW5ndGg6IG51bWJlcjtcblx0XHRpZiAoIXN0YW5kYXJkICYmIHRoaXMuX3BhZ2VzLmxlbmd0aCkge1xuICAgICAgbGVuZ3RoID0gdGhpcy5fcGFnZXMubGVuZ3RoO1xuICAgICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UudG8odGhpcy5fcGFnZXNbKChwb3NpdGlvbiAlIGxlbmd0aCkgKyBsZW5ndGgpICUgbGVuZ3RoXS5zdGFydCwgc3BlZWQpO1xuXHRcdH0gZWxzZSB7XG4gICAgICB0aGlzLmNhcm91c2VsU2VydmljZS50byhwb3NpdGlvbiwgc3BlZWQpO1xuXHRcdH1cbiAgfTtcblxuICAvKipcbiAgICogTW92ZXMgY2Fyb3VzZWwgYWZ0ZXIgdXNlcidzIGNsaWNraW5nIG9uIGFueSBkb3RzXG4gICAqL1xuICBtb3ZlQnlEb3QoZG90SWQ6IHN0cmluZykge1xuICAgIGNvbnN0IGluZGV4OiBudW1iZXIgPSB0aGlzLl9kb3RzRGF0YS5kb3RzLmZpbmRJbmRleChkb3QgPT4gZG90SWQgPT09IGRvdC5pZCk7XG4gICAgdGhpcy50byhpbmRleCwgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuZG90c1NwZWVkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZXdpbmRzIGNhcm91c2VsIHRvIHNsaWRlIHdpdGggbmVlZGVkIGlkXG4gICAqIEBwYXJhbSBpZCBpZCBvZiBzbGlkZVxuICAgKi9cbiAgdG9TbGlkZUJ5SWQoaWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2xpZGVzRGF0YS5maW5kSW5kZXgoc2xpZGUgPT4gc2xpZGUuaWQgPT09IGlkICYmIHNsaWRlLmlzQ2xvbmVkID09PSBmYWxzZSk7XG5cbiAgICBpZiAocG9zaXRpb24gPT09IC0xIHx8IHBvc2l0aW9uID09PSB0aGlzLmNhcm91c2VsU2VydmljZS5jdXJyZW50KCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cblx0XHR0aGlzLmNhcm91c2VsU2VydmljZS50byh0aGlzLmNhcm91c2VsU2VydmljZS5yZWxhdGl2ZShwb3NpdGlvbiksIGZhbHNlKTtcbiAgfVxuXG59XG4iXX0=