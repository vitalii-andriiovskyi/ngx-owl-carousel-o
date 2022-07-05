import { Injectable } from '@angular/core';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./carousel.service";
export class AutoHeightService {
    constructor(carouselService) {
        this.carouselService = carouselService;
        this.spyDataStreams();
    }
    ngOnDestroy() {
        this.autoHeightSubscription.unsubscribe();
    }
    /**
     * Defines Observables which service must observe
     */
    spyDataStreams() {
        const initializedCarousel$ = this.carouselService.getInitializedState().pipe(tap(data => {
            if (this.carouselService.settings.autoHeight) {
                this.update();
            }
            else {
                this.carouselService.slidesData.forEach(slide => slide.heightState = 'full');
            }
        }));
        const changedSettings$ = this.carouselService.getChangedState().pipe(tap(data => {
            if (this.carouselService.settings.autoHeight && data.property.name === 'position') {
                this.update();
            }
        }));
        const refreshedCarousel$ = this.carouselService.getRefreshedState().pipe(tap(data => {
            if (this.carouselService.settings.autoHeight) {
                this.update();
            }
        }));
        const autoHeight$ = merge(initializedCarousel$, changedSettings$, refreshedCarousel$);
        this.autoHeightSubscription = autoHeight$.subscribe(() => { });
    }
    /**
     * Updates the prop 'heightState' of slides
     */
    update() {
        const items = this.carouselService.settings.items;
        let start = this.carouselService.current(), end = start + items;
        if (this.carouselService.settings.center) {
            start = items % 2 === 1 ? start - (items - 1) / 2 : start - items / 2;
            end = items % 2 === 1 ? start + items : start + items + 1;
        }
        this.carouselService.slidesData.forEach((slide, i) => {
            slide.heightState = (i >= start && i < end) ? 'full' : 'nulled';
        });
    }
}
AutoHeightService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.4", ngImport: i0, type: AutoHeightService, deps: [{ token: i1.CarouselService }], target: i0.ɵɵFactoryTarget.Injectable });
AutoHeightService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.0.4", ngImport: i0, type: AutoHeightService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.4", ngImport: i0, type: AutoHeightService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.CarouselService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2hlaWdodC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGlicy9uZ3gtb3dsLWNhcm91c2VsLW8vc3JjL2xpYi9zZXJ2aWNlcy9hdXRvaGVpZ2h0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBQTRCLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUV2RCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQUdyQyxNQUFNLE9BQU8saUJBQWlCO0lBSzVCLFlBQW9CLGVBQWdDO1FBQWhDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNsRCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsc0JBQXNCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDNUMsQ0FBQztJQUNEOztPQUVHO0lBQ0gsY0FBYztRQUNaLE1BQU0sb0JBQW9CLEdBQXVCLElBQUksQ0FBQyxlQUFlLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxJQUFJLENBQzlGLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNULElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFO2dCQUM1QyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDZjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxDQUFDO2FBQzlFO1FBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUVGLE1BQU0sZ0JBQWdCLEdBQW9CLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxFQUFFLENBQUMsSUFBSSxDQUNuRixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDVCxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxVQUFVLEVBQUM7Z0JBQ3JGLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUNkO1FBQ0MsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUVGLE1BQU0sa0JBQWtCLEdBQXVCLElBQUksQ0FBQyxlQUFlLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxJQUFJLENBQzFGLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNULElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFO2dCQUM1QyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDZjtRQUNILENBQUMsQ0FBQyxDQUNILENBQUM7UUFFRixNQUFNLFdBQVcsR0FBNkIsS0FBSyxDQUFDLG9CQUFvQixFQUFFLGdCQUFnQixFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFDaEgsSUFBSSxDQUFDLHNCQUFzQixHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQ2pELEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FDVCxDQUFDO0lBQ0osQ0FBQztJQUVEOztPQUVHO0lBQ0gsTUFBTTtRQUNKLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQTtRQUNqRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxFQUN0QyxHQUFHLEdBQUcsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUV4QixJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtZQUN4QyxLQUFLLEdBQUcsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ3RFLEdBQUcsR0FBRyxLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUM7U0FDM0Q7UUFFRCxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbkQsS0FBSyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUNsRSxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7OzhHQWhFVSxpQkFBaUI7a0hBQWpCLGlCQUFpQjsyRkFBakIsaUJBQWlCO2tCQUQ3QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIE9ic2VydmFibGUsIG1lcmdlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDYXJvdXNlbFNlcnZpY2UgfSBmcm9tICcuL2Nhcm91c2VsLnNlcnZpY2UnO1xuaW1wb3J0IHsgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXV0b0hlaWdodFNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3l7XG4gIC8qKlxuICAgKiBTdWJzY3Jpb3B0aW9uIHRvIG1lcmdlIE9ic2VydmFibGUgIGZyb20gQ2Fyb3VzZWxTZXJ2aWNlXG4gICAqL1xuICBhdXRvSGVpZ2h0U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2Fyb3VzZWxTZXJ2aWNlOiBDYXJvdXNlbFNlcnZpY2UpIHtcbiAgICB0aGlzLnNweURhdGFTdHJlYW1zKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmF1dG9IZWlnaHRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuICAvKipcbiAgICogRGVmaW5lcyBPYnNlcnZhYmxlcyB3aGljaCBzZXJ2aWNlIG11c3Qgb2JzZXJ2ZVxuICAgKi9cbiAgc3B5RGF0YVN0cmVhbXMoKSB7XG4gICAgY29uc3QgaW5pdGlhbGl6ZWRDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldEluaXRpYWxpemVkU3RhdGUoKS5waXBlKFxuICAgICAgdGFwKGRhdGEgPT4ge1xuICAgICAgICBpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b0hlaWdodCkge1xuICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2xpZGVzRGF0YS5mb3JFYWNoKHNsaWRlID0+IHNsaWRlLmhlaWdodFN0YXRlID0gJ2Z1bGwnKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuXG4gICAgY29uc3QgY2hhbmdlZFNldHRpbmdzJDogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0Q2hhbmdlZFN0YXRlKCkucGlwZShcbiAgICAgIHRhcChkYXRhID0+IHtcbiAgICAgICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9IZWlnaHQgJiYgZGF0YS5wcm9wZXJ0eS5uYW1lID09PSAncG9zaXRpb24nKXtcblx0XHRcdFx0XHR0aGlzLnVwZGF0ZSgpO1xuXHRcdFx0XHR9XG4gICAgICB9KVxuICAgICk7XG5cbiAgICBjb25zdCByZWZyZXNoZWRDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldFJlZnJlc2hlZFN0YXRlKCkucGlwZShcbiAgICAgIHRhcChkYXRhID0+IHtcbiAgICAgICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9IZWlnaHQpIHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG5cbiAgICBjb25zdCBhdXRvSGVpZ2h0JDogT2JzZXJ2YWJsZTxzdHJpbmcgfCBhbnk+ID0gbWVyZ2UoaW5pdGlhbGl6ZWRDYXJvdXNlbCQsIGNoYW5nZWRTZXR0aW5ncyQsIHJlZnJlc2hlZENhcm91c2VsJCk7XG4gICAgdGhpcy5hdXRvSGVpZ2h0U3Vic2NyaXB0aW9uID0gYXV0b0hlaWdodCQuc3Vic2NyaWJlKFxuICAgICAgKCkgPT4ge31cbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIHByb3AgJ2hlaWdodFN0YXRlJyBvZiBzbGlkZXNcbiAgICovXG4gIHVwZGF0ZSgpIHtcbiAgICBjb25zdCBpdGVtcyA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLml0ZW1zXG4gICAgbGV0IHN0YXJ0ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuY3VycmVudCgpLFxuICAgICAgICBlbmQgPSBzdGFydCArIGl0ZW1zO1xuXG4gICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmNlbnRlcikge1xuICAgICAgc3RhcnQgPSBpdGVtcyAlIDIgPT09IDEgPyBzdGFydCAtIChpdGVtcyAtIDEpIC8gMiA6IHN0YXJ0IC0gaXRlbXMgLyAyO1xuICAgICAgZW5kID0gaXRlbXMgJSAyID09PSAxID8gc3RhcnQgKyBpdGVtcyA6IHN0YXJ0ICsgaXRlbXMgKyAxO1xuICAgIH1cblxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNsaWRlc0RhdGEuZm9yRWFjaCgoc2xpZGUsIGkpID0+IHtcbiAgICAgIHNsaWRlLmhlaWdodFN0YXRlID0gKGkgPj0gc3RhcnQgJiYgaSA8IGVuZCkgPyAnZnVsbCcgOiAnbnVsbGVkJztcbiAgICB9KTtcbiAgfVxuXG5cbn1cbiJdfQ==