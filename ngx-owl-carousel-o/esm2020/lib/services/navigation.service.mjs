import { Injectable } from '@angular/core';
import { merge } from 'rxjs';
import { tap, filter } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./carousel.service";
export class NavigationService {
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
}
NavigationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: NavigationService, deps: [{ token: i1.CarouselService }], target: i0.ɵɵFactoryTarget.Injectable });
NavigationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: NavigationService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: NavigationService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.CarouselService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGlicy9uZ3gtb3dsLWNhcm91c2VsLW8vc3JjL2xpYi9zZXJ2aWNlcy9uYXZpZ2F0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUl0RCxPQUFPLEVBQTRCLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2RCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7QUFJN0MsTUFBTSxPQUFPLGlCQUFpQjtJQXVDNUIsWUFBb0IsZUFBZ0M7UUFBaEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBakNwRDs7V0FFRztRQUNPLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBRS9COztXQUVHO1FBQ08sV0FBTSxHQUFVLEVBQUUsQ0FBQztRQUU3Qjs7V0FFRztRQUNPLGFBQVEsR0FBWTtZQUM1QixRQUFRLEVBQUUsS0FBSztZQUNmLElBQUksRUFBRTtnQkFDSixRQUFRLEVBQUUsS0FBSztnQkFDZixRQUFRLEVBQUUsRUFBRTthQUNiO1lBQ0QsSUFBSSxFQUFFO2dCQUNKLFFBQVEsRUFBRSxLQUFLO2dCQUNmLFFBQVEsRUFBRSxFQUFFO2FBQ2I7U0FDRixDQUFDO1FBRUY7O1dBRUc7UUFDTyxjQUFTLEdBQWE7WUFDOUIsUUFBUSxFQUFFLEtBQUs7WUFDZixJQUFJLEVBQUUsRUFBRTtTQUNULENBQUM7UUFHQSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFRDs7T0FFRztJQUNILGNBQWM7UUFDWixNQUFNLG9CQUFvQixHQUF1QixJQUFJLENBQUMsZUFBZSxDQUFDLG1CQUFtQixFQUFFLENBQUMsSUFB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dCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmF2RGF0YSwgRG90c0RhdGEgfSBmcm9tICcuLi9tb2RlbHMvbmF2aWdhdGlvbi1kYXRhLm1vZGVscyc7XG5pbXBvcnQgeyBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlIH0gZnJvbSAnLi4vY2Fyb3VzZWwvY2Fyb3VzZWwtc2xpZGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IENhcm91c2VsU2VydmljZSB9IGZyb20gJy4vY2Fyb3VzZWwuc2VydmljZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIE9ic2VydmFibGUsIG1lcmdlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YXAsIGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE93bE9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbHMvb3dsLW9wdGlvbnMubW9kZWwnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmF2aWdhdGlvblNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogU3Vic2NyaW9wdGlvbiB0byBtZXJnZSBPYnNlcnZhYmxlICBmcm9tIENhcm91c2VsU2VydmljZVxuICAgKi9cbiAgbmF2U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBwbHVnaW4gaXMgaW5pdGlhbGl6ZWQgb3Igbm90LlxuICAgKi9cbiAgcHJvdGVjdGVkIF9pbml0aWFsaXplZCA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBUaGUgY3VycmVudCBwYWdpbmcgaW5kZXhlcy5cbiAgICovXG4gIHByb3RlY3RlZCBfcGFnZXM6IGFueVtdID0gW107XG5cbiAgLyoqXG4gICAqIERhdGEgZm9yIG5hdmlnYXRpb24gZWxlbWVudHMgb2YgdGhlIHVzZXIgaW50ZXJmYWNlLlxuICAgKi9cbiAgcHJvdGVjdGVkIF9uYXZEYXRhOiBOYXZEYXRhID0ge1xuICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICBwcmV2OiB7XG4gICAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgICBodG1sVGV4dDogJydcbiAgICB9LFxuICAgIG5leHQ6IHtcbiAgICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICAgIGh0bWxUZXh0OiAnJ1xuICAgIH0sXG4gIH07XG5cbiAgLyoqXG4gICAqIERhdGEgZm9yIGRvdCBlbGVtZW50cyBvZiB0aGUgdXNlciBpbnRlcmZhY2UuXG4gICAqL1xuICBwcm90ZWN0ZWQgX2RvdHNEYXRhOiBEb3RzRGF0YSA9IHtcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgZG90czogW11cbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhcm91c2VsU2VydmljZTogQ2Fyb3VzZWxTZXJ2aWNlKSB7XG4gICAgdGhpcy5zcHlEYXRhU3RyZWFtcygpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5uYXZTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZpbmVzIE9ic2VydmFibGVzIHdoaWNoIHNlcnZpY2UgbXVzdCBvYnNlcnZlXG4gICAqL1xuICBzcHlEYXRhU3RyZWFtcygpIHtcbiAgICBjb25zdCBpbml0aWFsaXplZENhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0SW5pdGlhbGl6ZWRTdGF0ZSgpLnBpcGUoXG4gICAgICB0YXAoc3RhdGUgPT4ge1xuICAgICAgICB0aGlzLmluaXRpYWxpemUoKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlTmF2UGFnZXMoKTtcbiAgICAgICAgdGhpcy5kcmF3KCk7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNlbmRDaGFuZ2VzKCk7XG4gICAgICB9KVxuICAgICk7XG5cbiAgICAvLyBtb3N0bHkgY2hhbmdlcyBpbiBjYXJvdXNlbFNlcnZpY2UgYW5kIGNhcm91c2VsIGF0IGFsbCBjYXVzZXMgY2Fyb3VzZWxTZXJ2aWNlLnRvKCkuIEl0IG1vdmVzIHN0YWdlIHJpZ2h0LWxlZnQgYnkgaXRzIGNvZGUgYW5kIGNhbGxpbmcgbmVlZGVkIGZ1bmN0aW9uc1xuICAgIC8vIFRodXMgdGhpcyBtZXRob2QgYnkgY2FsbGluZyBjYXJvdXNlbFNlcnZpY2UuY3VycmVudChwb3NpdGlvbikgbm90aWZpZXMgYWJvdXQgY2hhbmdlc1xuICAgIGNvbnN0IGNoYW5nZWRTZXR0aW5ncyQ6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldENoYW5nZWRTdGF0ZSgpLnBpcGUoXG4gICAgICBmaWx0ZXIoZGF0YSA9PiBkYXRhLnByb3BlcnR5Lm5hbWUgPT09ICdwb3NpdGlvbicpLFxuICAgICAgdGFwKGRhdGEgPT4ge1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAvLyBzaG91bGQgYmUgdGhlIGNhbGwgb2YgdGhlIGZ1bmN0aW9uIHdyaXR0ZW4gYXQgdGhlIGVuZCBvZiBjb21tZW50XG4gICAgICAgIC8vIGJ1dCB0aGUgbWV0aG9kIGNhcm91c2VsU2Vydml2ZS50bygpIGhhcyBzZXRUaW1lb3V0KGYsIDApIHdoaWNoIGNvbnRhaW5zIGNhcm91c2VsU2Vydml2ZS51cGRhdGUoKSB3aGljaCBjYWxscyBzZW5kQ2hhbmdlcygpIG1ldGhvZC5cbiAgICAgICAgLy8gY2Fyb3VzZWxTZXJ2aWNlLm5hdkRhdGEgYW5kIGNhcm91c2VsU2VydmljZS5kb3RzRGF0YSB1cGRhdGUgZWFybGllciB0aGFuIGNhcm91c2VsU2Vydml2ZS51cGRhdGUoKSBnZXRzIGNhbGxlZFxuICAgICAgICAvLyB1cGRhdGVzIG9mIGNhcm91c2VsU2VydmljZS5uYXZEYXRhIGFuZCBjYXJvdXNlbFNlcnZpY2UuZG90c0RhdGEgYXJlIGJlaW5nIGhhcHBlbmluZyB3aXRoaW5nIGNhcm91c2VsU2VydmljZS5jdXJyZW50KHBvc2l0aW9uKSBtZXRob2Qgd2hpY2ggY2FsbHMgbmV4dCgpIG9mIF9jaGFuZ2VkU2V0dGluZ3NDYXJvdXNlbCRcbiAgICAgICAgLy8gY2Fyb3VzZWxTZXJ2aWNlLmN1cnJlbnQocG9zaXRpb24pIGlzIGJlaW5nIGNhbGxpbmcgZWFybGllciB0aGFuIGNhcm91c2VsU2Vydml2ZS51cGRhdGUoKTtcbiAgICAgICAgLy8gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2VuZENoYW5nZXMoKTtcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIGNvbnN0IHJlZnJlc2hlZENhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0UmVmcmVzaGVkU3RhdGUoKS5waXBlKFxuICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgdGhpcy5fdXBkYXRlTmF2UGFnZXMoKTtcbiAgICAgICAgdGhpcy5kcmF3KCk7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNlbmRDaGFuZ2VzKCk7XG4gICAgICB9KVxuICAgICk7XG5cbiAgICBjb25zdCBuYXZNZXJnZSQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IG1lcmdlKGluaXRpYWxpemVkQ2Fyb3VzZWwkLCBjaGFuZ2VkU2V0dGluZ3MkLCByZWZyZXNoZWRDYXJvdXNlbCQpO1xuICAgIHRoaXMubmF2U3Vic2NyaXB0aW9uID0gbmF2TWVyZ2UkLnN1YnNjcmliZShcbiAgICAgICgpID0+IHt9XG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuXHQgKiBJbml0aWFsaXplcyB0aGUgbGF5b3V0IG9mIHRoZSBwbHVnaW4gYW5kIGV4dGVuZHMgdGhlIGNhcm91c2VsLlxuXHQgKi9cblx0aW5pdGlhbGl6ZSgpIHtcbiAgICB0aGlzLl9uYXZEYXRhLmRpc2FibGVkID0gdHJ1ZTtcbiAgICB0aGlzLl9uYXZEYXRhLnByZXYuaHRtbFRleHQgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5uYXZUZXh0WzBdO1xuICAgIHRoaXMuX25hdkRhdGEubmV4dC5odG1sVGV4dCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLm5hdlRleHRbMV07XG5cbiAgICB0aGlzLl9kb3RzRGF0YS5kaXNhYmxlZCA9IHRydWU7XG5cbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5uYXZEYXRhID0gdGhpcy5fbmF2RGF0YTtcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5kb3RzRGF0YSA9IHRoaXMuX2RvdHNEYXRhO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgaW50ZXJuYWwgc3RhdGVzIGFuZCB1cGRhdGVzIHByb3AgX3BhZ2VzXG4gICAqL1xuXHRwcml2YXRlIF91cGRhdGVOYXZQYWdlcygpIHtcblx0XHRsZXQgaTogbnVtYmVyLCBqOiBudW1iZXIsIGs6IG51bWJlcjtcblx0XHRjb25zdCBsb3dlcjogbnVtYmVyID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuY2xvbmVzKCkubGVuZ3RoIC8gMixcbiAgICAgIHVwcGVyOiBudW1iZXIgPSBsb3dlciArIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLml0ZW1zKCkubGVuZ3RoLFxuICAgICAgbWF4aW11bTogbnVtYmVyID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UubWF4aW11bSh0cnVlKSxcbiAgICAgIHBhZ2VzOiBhbnlbXSA9IFtdLFxuICAgICAgc2V0dGluZ3M6IE93bE9wdGlvbnMgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncztcbiAgICAgbGV0IHNpemUgPSBzZXR0aW5ncy5jZW50ZXIgfHwgc2V0dGluZ3MuYXV0b1dpZHRoIHx8IHNldHRpbmdzLmRvdHNEYXRhXG4gICAgICAgID8gMSA6IE1hdGguZmxvb3IoTnVtYmVyKHNldHRpbmdzLmRvdHNFYWNoKSkgfHwgTWF0aC5mbG9vcihzZXR0aW5ncy5pdGVtcyk7XG4gICAgICBzaXplID0gK3NpemU7XG5cdFx0aWYgKHNldHRpbmdzLnNsaWRlQnkgIT09ICdwYWdlJykge1xuXHRcdFx0c2V0dGluZ3Muc2xpZGVCeSA9IE1hdGgubWluKCtzZXR0aW5ncy5zbGlkZUJ5LCBzZXR0aW5ncy5pdGVtcyk7XG5cdFx0fVxuXG5cdFx0aWYgKHNldHRpbmdzLmRvdHMgfHwgc2V0dGluZ3Muc2xpZGVCeSA9PT0gJ3BhZ2UnKSB7XG5cblx0XHRcdGZvciAoaSA9IGxvd2VyLCBqID0gMCwgayA9IDA7IGkgPCB1cHBlcjsgaSsrKSB7XG5cdFx0XHRcdGlmIChqID49IHNpemUgfHwgaiA9PT0gMCkge1xuXHRcdFx0XHRcdHBhZ2VzLnB1c2goe1xuXHRcdFx0XHRcdFx0c3RhcnQ6IE1hdGgubWluKG1heGltdW0sIGkgLSBsb3dlciksXG5cdFx0XHRcdFx0XHRlbmQ6IGkgLSBsb3dlciArIHNpemUgLSAxXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0aWYgKE1hdGgubWluKG1heGltdW0sIGkgLSBsb3dlcikgPT09IG1heGltdW0pIHtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRqID0gMCwgKytrO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGogKz0gdGhpcy5jYXJvdXNlbFNlcnZpY2UubWVyZ2Vycyh0aGlzLmNhcm91c2VsU2VydmljZS5yZWxhdGl2ZShpKSkgYXMgbnVtYmVyO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLl9wYWdlcyA9IHBhZ2VzO1xuXHR9XG5cbiAgLyoqXG5cdCAqIERyYXdzIHRoZSB1c2VyIGludGVyZmFjZS5cblx0ICogQHRvZG8gVGhlIG9wdGlvbiBgZG90c0RhdGFgIHdvbnQgd29yay5cblx0ICovXG4gIGRyYXcoKSB7XG5cdFx0bGV0IGRpZmZlcmVuY2U6IG51bWJlcjtcbiAgICBjb25zdFx0c2V0dGluZ3M6IE93bE9wdGlvbnMgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncyxcbiAgICAgIGl0ZW1zOiBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlW10gPSB0aGlzLmNhcm91c2VsU2VydmljZS5pdGVtcygpLFxuICAgICAgZGlzYWJsZWQgPSBpdGVtcy5sZW5ndGggPD0gc2V0dGluZ3MuaXRlbXM7XG5cblx0XHR0aGlzLl9uYXZEYXRhLmRpc2FibGVkID0gIXNldHRpbmdzLm5hdiB8fCBkaXNhYmxlZDtcblx0XHR0aGlzLl9kb3RzRGF0YS5kaXNhYmxlZCA9ICFzZXR0aW5ncy5kb3RzIHx8IGRpc2FibGVkO1xuXG5cdFx0aWYgKHNldHRpbmdzLmRvdHMpIHtcblx0XHRcdGRpZmZlcmVuY2UgPSB0aGlzLl9wYWdlcy5sZW5ndGggLSB0aGlzLl9kb3RzRGF0YS5kb3RzLmxlbmd0aDtcblxuXHRcdFx0aWYgKHNldHRpbmdzLmRvdHNEYXRhICYmIGRpZmZlcmVuY2UgIT09IDApIHtcbiAgICAgICAgdGhpcy5fZG90c0RhdGEuZG90cyA9IFtdO1xuICAgICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgIHRoaXMuX2RvdHNEYXRhLmRvdHMucHVzaCh7XG4gICAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxuICAgICAgICAgICAgaWQ6IGBkb3QtJHtpdGVtLmlkfWAsXG4gICAgICAgICAgICBpbm5lckNvbnRlbnQ6IGl0ZW0uZG90Q29udGVudCxcbiAgICAgICAgICAgIHNob3dJbm5lckNvbnRlbnQ6IHRydWVcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cdFx0XHR9IGVsc2UgaWYgKGRpZmZlcmVuY2UgPiAwKSB7XG4gICAgICAgIGNvbnN0IHN0YXJ0STogbnVtYmVyID0gdGhpcy5fZG90c0RhdGEuZG90cy5sZW5ndGggPiAwID8gdGhpcy5fZG90c0RhdGEuZG90cy5sZW5ndGggOiAwO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpZmZlcmVuY2U7IGkrKykge1xuICAgICAgICAgIHRoaXMuX2RvdHNEYXRhLmRvdHMucHVzaCh7XG4gICAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxuICAgICAgICAgICAgaWQ6IGBkb3QtJHtpICsgc3RhcnRJfWAsXG4gICAgICAgICAgICBpbm5lckNvbnRlbnQ6ICcnLFxuICAgICAgICAgICAgc2hvd0lubmVyQ29udGVudDogZmFsc2VcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXHRcdFx0fSBlbHNlIGlmIChkaWZmZXJlbmNlIDwgMCkge1xuICAgICAgICB0aGlzLl9kb3RzRGF0YS5kb3RzLnNwbGljZShkaWZmZXJlbmNlLCBNYXRoLmFicyhkaWZmZXJlbmNlKSlcblx0XHRcdH1cbiAgICB9XG5cbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5uYXZEYXRhID0gdGhpcy5fbmF2RGF0YTtcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5kb3RzRGF0YSA9IHRoaXMuX2RvdHNEYXRhO1xuICB9O1xuXG4gIC8qKlxuICAgKiBVcGRhdGVzIG5hdmlnYXRpb24gYnV0dG9ucydzIGFuZCBkb3RzJ3Mgc3RhdGVzXG4gICAqL1xuICB1cGRhdGUoKSB7XG4gICAgdGhpcy5fdXBkYXRlTmF2QnV0dG9ucygpO1xuICAgIHRoaXMuX3VwZGF0ZURvdHMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGFuZ2VzIHN0YXRlIG9mIG5hdiBidXR0b25zIChkaXNhYmxlZCwgZW5hYmxlZClcbiAgICovXG4gIHByaXZhdGUgX3VwZGF0ZU5hdkJ1dHRvbnMoKSB7XG4gICAgY29uc3RcdHNldHRpbmdzOiBPd2xPcHRpb25zID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MsXG4gICAgICBsb29wOiBib29sZWFuID0gc2V0dGluZ3MubG9vcCB8fCBzZXR0aW5ncy5yZXdpbmQsXG4gICAgICBpbmRleDogbnVtYmVyID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UucmVsYXRpdmUodGhpcy5jYXJvdXNlbFNlcnZpY2UuY3VycmVudCgpKTtcblxuICAgIGlmIChzZXR0aW5ncy5uYXYpIHtcbiAgICAgIHRoaXMuX25hdkRhdGEucHJldi5kaXNhYmxlZCA9ICFsb29wICYmIGluZGV4IDw9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm1pbmltdW0odHJ1ZSk7XG5cdFx0XHR0aGlzLl9uYXZEYXRhLm5leHQuZGlzYWJsZWQgPSAhbG9vcCAmJiBpbmRleCA+PSB0aGlzLmNhcm91c2VsU2VydmljZS5tYXhpbXVtKHRydWUpO1xuICAgIH1cblxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm5hdkRhdGEgPSB0aGlzLl9uYXZEYXRhO1xuICB9XG5cbiAgLyoqXG4gICAqIENoYW5nZXMgYWN0aXZlIGRvdCBpZiBwYWdlIGJlY29tZXMgY2hhbmdlZFxuICAgKi9cbiAgcHJpdmF0ZSBfdXBkYXRlRG90cygpIHtcbiAgICBsZXQgY3VyQWN0aXZlRG90STogbnVtYmVyO1xuXG4gICAgaWYoIXRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmRvdHMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fZG90c0RhdGEuZG90cy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgaWYgKGl0ZW0uYWN0aXZlID09PSB0cnVlKSB7XG4gICAgICAgIGl0ZW0uYWN0aXZlID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSlcblxuICAgIGN1ckFjdGl2ZURvdEkgPSB0aGlzLl9jdXJyZW50KCk7XG4gICAgaWYgKHRoaXMuX2RvdHNEYXRhLmRvdHMubGVuZ3RoKSB7XG4gICAgICB0aGlzLl9kb3RzRGF0YS5kb3RzW2N1ckFjdGl2ZURvdEldLmFjdGl2ZSA9IHRydWU7XG4gICAgfVxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmRvdHNEYXRhID0gdGhpcy5fZG90c0RhdGE7XG4gIH1cblxuICAvKipcblx0ICogR2V0cyB0aGUgY3VycmVudCBwYWdlIHBvc2l0aW9uIG9mIHRoZSBjYXJvdXNlbC5cblx0ICogQHJldHVybnMgdGhlIGN1cnJlbnQgcGFnZSBwb3NpdGlvbiBvZiB0aGUgY2Fyb3VzZWxcblx0ICovXG5cdHByaXZhdGUgX2N1cnJlbnQoKTogYW55IHtcbiAgICBjb25zdCBjdXJyZW50OiBudW1iZXIgPSB0aGlzLmNhcm91c2VsU2VydmljZS5yZWxhdGl2ZSh0aGlzLmNhcm91c2VsU2VydmljZS5jdXJyZW50KCkpO1xuICAgIGxldCBmaW5hbEN1cnJlbnQ6IG51bWJlcjtcbiAgICBjb25zdCBwYWdlczogYW55ID0gdGhpcy5fcGFnZXMuZmlsdGVyKChwYWdlLCBpbmRleCkgPT4ge1xuICAgICAgcmV0dXJuIHBhZ2Uuc3RhcnQgPD0gY3VycmVudCAmJiBwYWdlLmVuZCA+PSBjdXJyZW50O1xuICAgIH0pLnBvcCgpO1xuXG4gICAgZmluYWxDdXJyZW50ID0gdGhpcy5fcGFnZXMuZmluZEluZGV4KHBhZ2UgPT4ge1xuICAgICAgcmV0dXJuIHBhZ2Uuc3RhcnQgPT09IHBhZ2VzLnN0YXJ0ICYmIHBhZ2UuZW5kID09PSBwYWdlcy5lbmQ7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZmluYWxDdXJyZW50O1xuICB9O1xuXG4gIC8qKlxuXHQgKiBHZXRzIHRoZSBjdXJyZW50IHN1Y2Nlc29yL3ByZWRlY2Vzc29yIHBvc2l0aW9uLlxuICAgKiBAcGFyYW0gc3Vzc2Vzc29yIHBvc2l0aW9uIG9mIHNsaWRlXG5cdCAqIEByZXR1cm5zIHRoZSBjdXJyZW50IHN1Y2Nlc29yL3ByZWRlY2Vzc29yIHBvc2l0aW9uXG5cdCAqL1xuXHRwcml2YXRlIF9nZXRQb3NpdGlvbihzdWNjZXNzb3I6IG51bWJlciB8IGJvb2xlYW4pOiBudW1iZXIge1xuXHRcdGxldCBwb3NpdGlvbjogbnVtYmVyLCBsZW5ndGg6IG51bWJlcjtcblx0XHRjb25zdFx0c2V0dGluZ3M6IE93bE9wdGlvbnMgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncztcblxuXHRcdGlmIChzZXR0aW5ncy5zbGlkZUJ5ID09PSAncGFnZScpIHtcblx0XHRcdHBvc2l0aW9uID0gdGhpcy5fY3VycmVudCgpO1xuXHRcdFx0bGVuZ3RoID0gdGhpcy5fcGFnZXMubGVuZ3RoO1xuXHRcdFx0c3VjY2Vzc29yID8gKytwb3NpdGlvbiA6IC0tcG9zaXRpb247XG5cdFx0XHRwb3NpdGlvbiA9IHRoaXMuX3BhZ2VzWygocG9zaXRpb24gJSBsZW5ndGgpICsgbGVuZ3RoKSAlIGxlbmd0aF0uc3RhcnQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHBvc2l0aW9uID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UucmVsYXRpdmUodGhpcy5jYXJvdXNlbFNlcnZpY2UuY3VycmVudCgpKTtcblx0XHRcdGxlbmd0aCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLml0ZW1zKCkubGVuZ3RoO1xuXHRcdFx0c3VjY2Vzc29yID8gcG9zaXRpb24gKz0gK3NldHRpbmdzLnNsaWRlQnkgOiBwb3NpdGlvbiAtPSArc2V0dGluZ3Muc2xpZGVCeTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcG9zaXRpb247XG4gIH07XG5cbiAgLyoqXG5cdCAqIFNsaWRlcyB0byB0aGUgbmV4dCBpdGVtIG9yIHBhZ2UuXG5cdCAqIEBwYXJhbSBzcGVlZCBUaGUgdGltZSBpbiBtaWxsaXNlY29uZHMgZm9yIHRoZSB0cmFuc2l0aW9uLlxuXHQgKi9cblx0bmV4dChzcGVlZDogbnVtYmVyIHwgYm9vbGVhbikge1xuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnRvKHRoaXMuX2dldFBvc2l0aW9uKHRydWUpLCBzcGVlZCk7XG5cdH07XG5cblx0LyoqXG5cdCAqIFNsaWRlcyB0byB0aGUgcHJldmlvdXMgaXRlbSBvciBwYWdlLlxuXHQgKiBAcGFyYW0gc3BlZWQgVGhlIHRpbWUgaW4gbWlsbGlzZWNvbmRzIGZvciB0aGUgdHJhbnNpdGlvbi5cblx0ICovXG5cdHByZXYoc3BlZWQ6IG51bWJlciB8IGJvb2xlYW4pIHtcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS50byh0aGlzLl9nZXRQb3NpdGlvbihmYWxzZSksIHNwZWVkKTtcbiAgfTtcblxuIFx0LyoqXG5cdCAqIFNsaWRlcyB0byB0aGUgc3BlY2lmaWVkIGl0ZW0gb3IgcGFnZS5cblx0ICogQHBhcmFtIHBvc2l0aW9uIC0gVGhlIHBvc2l0aW9uIG9mIHRoZSBpdGVtIG9yIHBhZ2UuXG5cdCAqIEBwYXJhbSBzcGVlZCAtIFRoZSB0aW1lIGluIG1pbGxpc2Vjb25kcyBmb3IgdGhlIHRyYW5zaXRpb24uXG5cdCAqIEBwYXJhbSBzdGFuZGFyZCAtIFdoZXRoZXIgdG8gdXNlIHRoZSBzdGFuZGFyZCBiZWhhdmlvdXIgb3Igbm90LiBEZWZhdWx0IG1lYW5pbmcgZmFsc2Vcblx0ICovXG5cdHRvKHBvc2l0aW9uOiBudW1iZXIsIHNwZWVkOiBudW1iZXIgfCBib29sZWFuLCBzdGFuZGFyZD86IGJvb2xlYW4pIHtcblx0XHRsZXQgbGVuZ3RoOiBudW1iZXI7XG5cdFx0aWYgKCFzdGFuZGFyZCAmJiB0aGlzLl9wYWdlcy5sZW5ndGgpIHtcbiAgICAgIGxlbmd0aCA9IHRoaXMuX3BhZ2VzLmxlbmd0aDtcbiAgICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnRvKHRoaXMuX3BhZ2VzWygocG9zaXRpb24gJSBsZW5ndGgpICsgbGVuZ3RoKSAlIGxlbmd0aF0uc3RhcnQsIHNwZWVkKTtcblx0XHR9IGVsc2Uge1xuICAgICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UudG8ocG9zaXRpb24sIHNwZWVkKTtcblx0XHR9XG4gIH07XG5cbiAgLyoqXG4gICAqIE1vdmVzIGNhcm91c2VsIGFmdGVyIHVzZXIncyBjbGlja2luZyBvbiBhbnkgZG90c1xuICAgKi9cbiAgbW92ZUJ5RG90KGRvdElkOiBzdHJpbmcpIHtcbiAgICBjb25zdCBpbmRleDogbnVtYmVyID0gdGhpcy5fZG90c0RhdGEuZG90cy5maW5kSW5kZXgoZG90ID0+IGRvdElkID09PSBkb3QuaWQpO1xuICAgIHRoaXMudG8oaW5kZXgsIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmRvdHNTcGVlZCk7XG4gIH1cblxuICAvKipcbiAgICogcmV3aW5kcyBjYXJvdXNlbCB0byBzbGlkZSB3aXRoIG5lZWRlZCBpZFxuICAgKiBAcGFyYW0gaWQgaWQgb2Ygc2xpZGVcbiAgICovXG4gIHRvU2xpZGVCeUlkKGlkOiBzdHJpbmcpIHtcbiAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNsaWRlc0RhdGEuZmluZEluZGV4KHNsaWRlID0+IHNsaWRlLmlkID09PSBpZCAmJiBzbGlkZS5pc0Nsb25lZCA9PT0gZmFsc2UpO1xuXG4gICAgaWYgKHBvc2l0aW9uID09PSAtMSB8fCBwb3NpdGlvbiA9PT0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuY3VycmVudCgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG5cdFx0dGhpcy5jYXJvdXNlbFNlcnZpY2UudG8odGhpcy5jYXJvdXNlbFNlcnZpY2UucmVsYXRpdmUocG9zaXRpb24pLCBmYWxzZSk7XG4gIH1cblxufVxuIl19