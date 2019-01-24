/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { EventManager } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
export class ResizeService {
    /**
     * @param {?} eventManager
     */
    constructor(eventManager) {
        this.eventManager = eventManager;
        this.resizeSubject = new Subject();
        this.eventManager.addGlobalEventListener('window', 'resize', this.onResize.bind(this));
        this.eventManager.addGlobalEventListener('window', 'onload', this.onLoaded.bind(this));
    }
    /**
     * Makes resizeSubject become Observable
     * @return {?} Observable of resizeSubject
     */
    get onResize$() {
        return this.resizeSubject.asObservable();
    }
    /**
     * Handler of 'resize' event. Passes data throw resizeSubject
     * @private
     * @param {?} event Event Object of 'resize' event
     * @return {?}
     */
    onResize(event) {
        this.resizeSubject.next((/** @type {?} */ (event.target)));
    }
    /**
     * Handler of 'onload' event. Defines the width of window
     * @private
     * @param {?} event Event Object of 'onload' event
     * @return {?}
     */
    onLoaded(event) {
        this.windowWidth = (/** @type {?} */ (event.target));
    }
}
ResizeService.decorators = [
    { type: Injectable }
];
ResizeService.ctorParameters = () => [
    { type: EventManager }
];
if (false) {
    /**
     * Width of window
     * @type {?}
     */
    ResizeService.prototype.windowWidth;
    /**
     * Subject of 'resize' event
     * @type {?}
     * @private
     */
    ResizeService.prototype.resizeSubject;
    /**
     * @type {?}
     * @private
     */
    ResizeService.prototype.eventManager;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXplLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvcmVzaXplLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsTUFBTTs7OztJQW1CSixZQUFvQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUM1QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxzQkFBc0IsQ0FDdEMsUUFBUSxFQUNSLFFBQVEsRUFDUixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDekIsQ0FBQztRQUNGLElBQUksQ0FBQyxZQUFZLENBQUMsc0JBQXNCLENBQ3RDLFFBQVEsRUFDUixRQUFRLEVBQ1IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ3pCLENBQUM7SUFDSixDQUFDOzs7OztJQXJCRCxJQUFJLFNBQVM7UUFDWCxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMzQyxDQUFDOzs7Ozs7O0lBeUJPLFFBQVEsQ0FBQyxLQUFjO1FBQzdCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLG1CQUFRLEtBQUssQ0FBQyxNQUFNLEVBQUEsQ0FBQyxDQUFDO0lBQ2hELENBQUM7Ozs7Ozs7SUFNTyxRQUFRLENBQUMsS0FBYztRQUM3QixJQUFJLENBQUMsV0FBVyxHQUFHLG1CQUFRLEtBQUssQ0FBQyxNQUFNLEVBQUEsQ0FBQztJQUMxQyxDQUFDOzs7WUFoREYsVUFBVTs7O1lBSkYsWUFBWTs7Ozs7OztJQVNuQixvQ0FBd0I7Ozs7OztJQWF4QixzQ0FBdUM7Ozs7O0lBRTNCLHFDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50TWFuYWdlciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFJlc2l6ZVNlcnZpY2Uge1xyXG4gIC8qKlxyXG4gICAqIFdpZHRoIG9mIHdpbmRvd1xyXG4gICAqL1xyXG4gIHB1YmxpYyB3aW5kb3dXaWR0aDogYW55O1xyXG5cclxuICAvKipcclxuICAgKiBNYWtlcyByZXNpemVTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXHJcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiByZXNpemVTdWJqZWN0XHJcbiAgICovXHJcbiAgZ2V0IG9uUmVzaXplJCgpOiBPYnNlcnZhYmxlPFdpbmRvdz4ge1xyXG4gICAgcmV0dXJuIHRoaXMucmVzaXplU3ViamVjdC5hc09ic2VydmFibGUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YmplY3Qgb2YgJ3Jlc2l6ZScgZXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIHJlc2l6ZVN1YmplY3Q6IFN1YmplY3Q8V2luZG93PjtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBldmVudE1hbmFnZXI6IEV2ZW50TWFuYWdlcikge1xyXG4gICAgdGhpcy5yZXNpemVTdWJqZWN0ID0gbmV3IFN1YmplY3QoKTtcclxuICAgIHRoaXMuZXZlbnRNYW5hZ2VyLmFkZEdsb2JhbEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgICd3aW5kb3cnLFxyXG4gICAgICAncmVzaXplJyxcclxuICAgICAgdGhpcy5vblJlc2l6ZS5iaW5kKHRoaXMpXHJcbiAgICApO1xyXG4gICAgdGhpcy5ldmVudE1hbmFnZXIuYWRkR2xvYmFsRXZlbnRMaXN0ZW5lcihcclxuICAgICAgJ3dpbmRvdycsXHJcbiAgICAgICdvbmxvYWQnLFxyXG4gICAgICB0aGlzLm9uTG9hZGVkLmJpbmQodGhpcylcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGVyIG9mICdyZXNpemUnIGV2ZW50LiBQYXNzZXMgZGF0YSB0aHJvdyByZXNpemVTdWJqZWN0XHJcbiAgICogQHBhcmFtIGV2ZW50IEV2ZW50IE9iamVjdCBvZiAncmVzaXplJyBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25SZXNpemUoZXZlbnQ6IFVJRXZlbnQpIHtcclxuICAgIHRoaXMucmVzaXplU3ViamVjdC5uZXh0KDxXaW5kb3c+ZXZlbnQudGFyZ2V0KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhbmRsZXIgb2YgJ29ubG9hZCcgZXZlbnQuIERlZmluZXMgdGhlIHdpZHRoIG9mIHdpbmRvd1xyXG4gICAqIEBwYXJhbSBldmVudCBFdmVudCBPYmplY3Qgb2YgJ29ubG9hZCcgZXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIG9uTG9hZGVkKGV2ZW50OiBVSUV2ZW50KSB7XHJcbiAgICB0aGlzLndpbmRvd1dpZHRoID0gPFdpbmRvdz5ldmVudC50YXJnZXQ7XHJcbiAgfVxyXG59XHJcbiJdfQ==