import { Injectable } from '@angular/core';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./carousel.service";
class AutoHeightService {
    carouselService;
    /**
     * Subscrioption to merge Observable  from CarouselService
     */
    autoHeightSubscription;
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: AutoHeightService, deps: [{ token: i1.CarouselService }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: AutoHeightService });
}
export { AutoHeightService };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: AutoHeightService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.CarouselService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2hlaWdodC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGlicy9uZ3gtb3dsLWNhcm91c2VsLW8vc3JjL2xpYi9zZXJ2aWNlcy9hdXRvaGVpZ2h0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBQTRCLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUV2RCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQUVyQyxNQUNhLGlCQUFpQjtJQUtSO0lBSnBCOztPQUVHO0lBQ0gsc0JBQXNCLENBQWU7SUFDckMsWUFBb0IsZUFBZ0M7UUFBaEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2xELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUM1QyxDQUFDO0lBQ0Q7O09BRUc7SUFDSCxjQUFjO1FBQ1osTUFBTSxvQkFBb0IsR0FBdUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLElBQUksQ0FDOUYsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ1QsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUU7Z0JBQzVDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUNmO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLENBQUM7YUFDOUU7UUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO1FBRUYsTUFBTSxnQkFBZ0IsR0FBb0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxJQUFJLENBQ25GLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNULElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLFVBQVUsRUFBQztnQkFDckYsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ2Q7UUFDQyxDQUFDLENBQUMsQ0FDSCxDQUFDO1FBRUYsTUFBTSxrQkFBa0IsR0FBdUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLElBQUksQ0FDMUYsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ1QsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUU7Z0JBQzVDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUNmO1FBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUVGLE1BQU0sV0FBVyxHQUE2QixLQUFLLENBQUMsb0JBQW9CLEVBQUUsZ0JBQWdCLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUNoSCxJQUFJLENBQUMsc0JBQXNCLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FDakQsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUNULENBQUM7SUFDSixDQUFDO0lBRUQ7O09BRUc7SUFDSCxNQUFNO1FBQ0osTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFBO1FBQ2pELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLEVBQ3RDLEdBQUcsR0FBRyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBRXhCLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO1lBQ3hDLEtBQUssR0FBRyxLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDdEUsR0FBRyxHQUFHLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQztTQUMzRDtRQUVELElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNuRCxLQUFLLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO1FBQ2xFLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzt1R0FoRVUsaUJBQWlCOzJHQUFqQixpQkFBaUI7O1NBQWpCLGlCQUFpQjsyRkFBakIsaUJBQWlCO2tCQUQ3QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIE9ic2VydmFibGUsIG1lcmdlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDYXJvdXNlbFNlcnZpY2UgfSBmcm9tICcuL2Nhcm91c2VsLnNlcnZpY2UnO1xuaW1wb3J0IHsgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXV0b0hlaWdodFNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3l7XG4gIC8qKlxuICAgKiBTdWJzY3Jpb3B0aW9uIHRvIG1lcmdlIE9ic2VydmFibGUgIGZyb20gQ2Fyb3VzZWxTZXJ2aWNlXG4gICAqL1xuICBhdXRvSGVpZ2h0U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2Fyb3VzZWxTZXJ2aWNlOiBDYXJvdXNlbFNlcnZpY2UpIHtcbiAgICB0aGlzLnNweURhdGFTdHJlYW1zKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmF1dG9IZWlnaHRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuICAvKipcbiAgICogRGVmaW5lcyBPYnNlcnZhYmxlcyB3aGljaCBzZXJ2aWNlIG11c3Qgb2JzZXJ2ZVxuICAgKi9cbiAgc3B5RGF0YVN0cmVhbXMoKSB7XG4gICAgY29uc3QgaW5pdGlhbGl6ZWRDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldEluaXRpYWxpemVkU3RhdGUoKS5waXBlKFxuICAgICAgdGFwKGRhdGEgPT4ge1xuICAgICAgICBpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b0hlaWdodCkge1xuICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2xpZGVzRGF0YS5mb3JFYWNoKHNsaWRlID0+IHNsaWRlLmhlaWdodFN0YXRlID0gJ2Z1bGwnKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuXG4gICAgY29uc3QgY2hhbmdlZFNldHRpbmdzJDogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0Q2hhbmdlZFN0YXRlKCkucGlwZShcbiAgICAgIHRhcChkYXRhID0+IHtcbiAgICAgICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9IZWlnaHQgJiYgZGF0YS5wcm9wZXJ0eS5uYW1lID09PSAncG9zaXRpb24nKXtcblx0XHRcdFx0XHR0aGlzLnVwZGF0ZSgpO1xuXHRcdFx0XHR9XG4gICAgICB9KVxuICAgICk7XG5cbiAgICBjb25zdCByZWZyZXNoZWRDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldFJlZnJlc2hlZFN0YXRlKCkucGlwZShcbiAgICAgIHRhcChkYXRhID0+IHtcbiAgICAgICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9IZWlnaHQpIHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG5cbiAgICBjb25zdCBhdXRvSGVpZ2h0JDogT2JzZXJ2YWJsZTxzdHJpbmcgfCBhbnk+ID0gbWVyZ2UoaW5pdGlhbGl6ZWRDYXJvdXNlbCQsIGNoYW5nZWRTZXR0aW5ncyQsIHJlZnJlc2hlZENhcm91c2VsJCk7XG4gICAgdGhpcy5hdXRvSGVpZ2h0U3Vic2NyaXB0aW9uID0gYXV0b0hlaWdodCQuc3Vic2NyaWJlKFxuICAgICAgKCkgPT4ge31cbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIHByb3AgJ2hlaWdodFN0YXRlJyBvZiBzbGlkZXNcbiAgICovXG4gIHVwZGF0ZSgpIHtcbiAgICBjb25zdCBpdGVtcyA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLml0ZW1zXG4gICAgbGV0IHN0YXJ0ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuY3VycmVudCgpLFxuICAgICAgICBlbmQgPSBzdGFydCArIGl0ZW1zO1xuXG4gICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmNlbnRlcikge1xuICAgICAgc3RhcnQgPSBpdGVtcyAlIDIgPT09IDEgPyBzdGFydCAtIChpdGVtcyAtIDEpIC8gMiA6IHN0YXJ0IC0gaXRlbXMgLyAyO1xuICAgICAgZW5kID0gaXRlbXMgJSAyID09PSAxID8gc3RhcnQgKyBpdGVtcyA6IHN0YXJ0ICsgaXRlbXMgKyAxO1xuICAgIH1cblxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNsaWRlc0RhdGEuZm9yRWFjaCgoc2xpZGUsIGkpID0+IHtcbiAgICAgIHNsaWRlLmhlaWdodFN0YXRlID0gKGkgPj0gc3RhcnQgJiYgaSA8IGVuZCkgPyAnZnVsbCcgOiAnbnVsbGVkJztcbiAgICB9KTtcbiAgfVxuXG5cbn1cbiJdfQ==