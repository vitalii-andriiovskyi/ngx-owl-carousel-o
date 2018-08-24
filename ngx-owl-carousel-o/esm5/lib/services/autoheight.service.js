/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { merge } from 'rxjs';
import { CarouselService } from './carousel.service';
import { tap } from 'rxjs/operators';
var AutoHeightService = /** @class */ (function () {
    function AutoHeightService(carouselService) {
        this.carouselService = carouselService;
        this.spyDataStreams();
    }
    /**
     * @return {?}
     */
    AutoHeightService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.autoHeightSubscription.unsubscribe();
    };
    /**
     * Defines Observables which service must observe
     */
    /**
     * Defines Observables which service must observe
     * @return {?}
     */
    AutoHeightService.prototype.spyDataStreams = /**
     * Defines Observables which service must observe
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var initializedCarousel$ = this.carouselService.getInitializedState().pipe(tap(function (data) {
            if (_this.carouselService.settings.autoHeight) {
                _this.update();
            }
            else {
                _this.carouselService.slidesData.forEach(function (slide) { return slide.heightState = 'full'; });
            }
        }));
        /** @type {?} */
        var changedSettings$ = this.carouselService.getChangedState().pipe(tap(function (data) {
            if (_this.carouselService.settings.autoHeight && data.property.name === 'position') {
                _this.update();
            }
        }));
        /** @type {?} */
        var refreshedCarousel$ = this.carouselService.getRefreshedState().pipe(tap(function (data) {
            if (_this.carouselService.settings.autoHeight) {
                _this.update();
            }
        }));
        /** @type {?} */
        var autoHeight$ = merge(initializedCarousel$, changedSettings$, refreshedCarousel$);
        this.autoHeightSubscription = autoHeight$.subscribe(function () { });
    };
    /**
     * Updates the prop 'heightState' of slides
     */
    /**
     * Updates the prop 'heightState' of slides
     * @return {?}
     */
    AutoHeightService.prototype.update = /**
     * Updates the prop 'heightState' of slides
     * @return {?}
     */
    function () {
        /** @type {?} */
        var items = this.carouselService.settings.items;
        /** @type {?} */
        var start = this.carouselService.current();
        /** @type {?} */
        var end = start + items;
        if (this.carouselService.settings.center) {
            start = items % 2 === 1 ? start - (items - 1) / 2 : start - items / 2;
            end = items % 2 === 1 ? start + items : start + items + 1;
        }
        this.carouselService.slidesData.forEach(function (slide, i) {
            slide.heightState = (i >= start && i < end) ? 'full' : 'nulled';
        });
    };
    AutoHeightService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    AutoHeightService.ctorParameters = function () { return [
        { type: CarouselService }
    ]; };
    return AutoHeightService;
}());
export { AutoHeightService };
if (false) {
    /**
     * Subscrioption to merge Observable  from CarouselService
     * @type {?}
     */
    AutoHeightService.prototype.autoHeightSubscription;
    /** @type {?} */
    AutoHeightService.prototype.carouselService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2hlaWdodC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW93bC1jYXJvdXNlbC1vLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2F1dG9oZWlnaHQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBQTRCLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDckQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztJQVFuQywyQkFBb0IsZUFBZ0M7UUFBaEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2xELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUN2Qjs7OztJQUVELHVDQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUMzQztJQUNEOztPQUVHOzs7OztJQUNILDBDQUFjOzs7O0lBQWQ7UUFBQSxpQkErQkM7O1FBOUJDLElBQU0sb0JBQW9CLEdBQXVCLElBQUksQ0FBQyxlQUFlLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxJQUFJLENBQzlGLEdBQUcsQ0FBQyxVQUFBLElBQUk7WUFDTixFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxLQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDZjtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLEtBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxXQUFXLEdBQUcsTUFBTSxFQUExQixDQUEwQixDQUFDLENBQUM7YUFDOUU7U0FDRixDQUFDLENBQ0gsQ0FBQzs7UUFFRixJQUFNLGdCQUFnQixHQUFvQixJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsRUFBRSxDQUFDLElBQUksQ0FDbkYsR0FBRyxDQUFDLFVBQUEsSUFBSTtZQUNOLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxVQUFVLENBQUMsQ0FBQSxDQUFDO2dCQUN0RixLQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDZDtTQUNFLENBQUMsQ0FDSCxDQUFDOztRQUVGLElBQU0sa0JBQWtCLEdBQXVCLElBQUksQ0FBQyxlQUFlLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxJQUFJLENBQzFGLEdBQUcsQ0FBQyxVQUFBLElBQUk7WUFDTixFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxLQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDZjtTQUNGLENBQUMsQ0FDSCxDQUFDOztRQUVGLElBQU0sV0FBVyxHQUE2QixLQUFLLENBQUMsb0JBQW9CLEVBQUUsZ0JBQWdCLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUNoSCxJQUFJLENBQUMsc0JBQXNCLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FDakQsZUFBUSxDQUNULENBQUM7S0FDSDtJQUVEOztPQUVHOzs7OztJQUNILGtDQUFNOzs7O0lBQU47O1FBQ0UsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFBOztRQUNqRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxDQUNsQjs7UUFEeEIsSUFDSSxHQUFHLEdBQUcsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUV4QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLEtBQUssR0FBRyxLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDdEUsR0FBRyxHQUFHLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQztTQUMzRDtRQUVELElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQUssRUFBRSxDQUFDO1lBQy9DLEtBQUssQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7U0FDakUsQ0FBQyxDQUFDO0tBQ0o7O2dCQWpFRixVQUFVOzs7O2dCQUhGLGVBQWU7OzRCQUZ4Qjs7U0FNYSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBPYnNlcnZhYmxlLCBtZXJnZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBDYXJvdXNlbFNlcnZpY2UgfSBmcm9tICcuL2Nhcm91c2VsLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBBdXRvSGVpZ2h0U2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveXtcclxuICAvKipcclxuICAgKiBTdWJzY3Jpb3B0aW9uIHRvIG1lcmdlIE9ic2VydmFibGUgIGZyb20gQ2Fyb3VzZWxTZXJ2aWNlXHJcbiAgICovXHJcbiAgYXV0b0hlaWdodFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2Fyb3VzZWxTZXJ2aWNlOiBDYXJvdXNlbFNlcnZpY2UpIHtcclxuICAgIHRoaXMuc3B5RGF0YVN0cmVhbXMoKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5hdXRvSGVpZ2h0U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIERlZmluZXMgT2JzZXJ2YWJsZXMgd2hpY2ggc2VydmljZSBtdXN0IG9ic2VydmVcclxuICAgKi9cclxuICBzcHlEYXRhU3RyZWFtcygpIHtcclxuICAgIGNvbnN0IGluaXRpYWxpemVkQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRJbml0aWFsaXplZFN0YXRlKCkucGlwZShcclxuICAgICAgdGFwKGRhdGEgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hdXRvSGVpZ2h0KSB7XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmNhcm91c2VsU2VydmljZS5zbGlkZXNEYXRhLmZvckVhY2goc2xpZGUgPT4gc2xpZGUuaGVpZ2h0U3RhdGUgPSAnZnVsbCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgY2hhbmdlZFNldHRpbmdzJDogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0Q2hhbmdlZFN0YXRlKCkucGlwZShcclxuICAgICAgdGFwKGRhdGEgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hdXRvSGVpZ2h0ICYmIGRhdGEucHJvcGVydHkubmFtZSA9PT0gJ3Bvc2l0aW9uJyl7XHJcblx0XHRcdFx0XHR0aGlzLnVwZGF0ZSgpO1xyXG5cdFx0XHRcdH1cclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgcmVmcmVzaGVkQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRSZWZyZXNoZWRTdGF0ZSgpLnBpcGUoXHJcbiAgICAgIHRhcChkYXRhID0+IHtcclxuICAgICAgICBpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b0hlaWdodCkge1xyXG4gICAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IGF1dG9IZWlnaHQkOiBPYnNlcnZhYmxlPHN0cmluZyB8IGFueT4gPSBtZXJnZShpbml0aWFsaXplZENhcm91c2VsJCwgY2hhbmdlZFNldHRpbmdzJCwgcmVmcmVzaGVkQ2Fyb3VzZWwkKTtcclxuICAgIHRoaXMuYXV0b0hlaWdodFN1YnNjcmlwdGlvbiA9IGF1dG9IZWlnaHQkLnN1YnNjcmliZShcclxuICAgICAgKCkgPT4ge31cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGVzIHRoZSBwcm9wICdoZWlnaHRTdGF0ZScgb2Ygc2xpZGVzXHJcbiAgICovXHJcbiAgdXBkYXRlKCkge1xyXG4gICAgY29uc3QgaXRlbXMgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5pdGVtc1xyXG4gICAgbGV0IHN0YXJ0ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuY3VycmVudCgpLFxyXG4gICAgICAgIGVuZCA9IHN0YXJ0ICsgaXRlbXM7XHJcblxyXG4gICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmNlbnRlcikge1xyXG4gICAgICBzdGFydCA9IGl0ZW1zICUgMiA9PT0gMSA/IHN0YXJ0IC0gKGl0ZW1zIC0gMSkgLyAyIDogc3RhcnQgLSBpdGVtcyAvIDI7XHJcbiAgICAgIGVuZCA9IGl0ZW1zICUgMiA9PT0gMSA/IHN0YXJ0ICsgaXRlbXMgOiBzdGFydCArIGl0ZW1zICsgMTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5zbGlkZXNEYXRhLmZvckVhY2goKHNsaWRlLCBpKSA9PiB7XHJcbiAgICAgIHNsaWRlLmhlaWdodFN0YXRlID0gKGkgPj0gc3RhcnQgJiYgaSA8IGVuZCkgPyAnZnVsbCcgOiAnbnVsbGVkJztcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG59XHJcbiJdfQ==