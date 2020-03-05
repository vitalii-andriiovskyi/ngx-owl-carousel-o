import { __decorate } from "tslib";
import { EventManager } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
var ResizeService = /** @class */ (function () {
    function ResizeService(eventManager) {
        this.eventManager = eventManager;
        this.resizeSubject = new Subject();
        this.eventManager.addGlobalEventListener('window', 'resize', this.onResize.bind(this));
        this.eventManager.addGlobalEventListener('window', 'onload', this.onLoaded.bind(this));
    }
    Object.defineProperty(ResizeService.prototype, "onResize$", {
        /**
         * Makes resizeSubject become Observable
         * @returns Observable of resizeSubject
         */
        get: function () {
            return this.resizeSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Handler of 'resize' event. Passes data throw resizeSubject
     * @param event Event Object of 'resize' event
     */
    /**
     * Handler of 'resize' event. Passes data throw resizeSubject
     * @private
     * @param {?} event Event Object of 'resize' event
     * @return {?}
     */
    ResizeService.prototype.onResize = /**
     * Handler of 'resize' event. Passes data throw resizeSubject
     * @private
     * @param {?} event Event Object of 'resize' event
     * @return {?}
     */
    function (event) {
        this.resizeSubject.next((/** @type {?} */ (event.target)));
    };
    /**
     * Handler of 'onload' event. Defines the width of window
     * @param event Event Object of 'onload' event
     */
    /**
     * Handler of 'onload' event. Defines the width of window
     * @private
     * @param {?} event Event Object of 'onload' event
     * @return {?}
     */
    ResizeService.prototype.onLoaded = /**
     * Handler of 'onload' event. Defines the width of window
     * @private
     * @param {?} event Event Object of 'onload' event
     * @return {?}
     */
    function (event) {
        this.windowWidth = (/** @type {?} */ (event.target));
    };
    ResizeService.ctorParameters = function () { return [
        { type: EventManager }
    ]; };
    ResizeService = __decorate([
        Injectable()
    ], ResizeService);
    return ResizeService;
}());
export { ResizeService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXplLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvcmVzaXplLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0M7SUFtQkUsdUJBQW9CLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzVDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsWUFBWSxDQUFDLHNCQUFzQixDQUN0QyxRQUFRLEVBQ1IsUUFBUSxFQUNSLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUN6QixDQUFDO1FBQ0YsSUFBSSxDQUFDLFlBQVksQ0FBQyxzQkFBc0IsQ0FDdEMsUUFBUSxFQUNSLFFBQVEsRUFDUixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDekIsQ0FBQztJQUNKLENBQUM7SUFyQkQsc0JBQUksb0NBQVM7UUFKYjs7O1dBR0c7YUFDSDtZQUNFLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMzQyxDQUFDOzs7T0FBQTtJQXFCRDs7O09BR0c7SUFDSyxnQ0FBUSxHQUFoQixVQUFpQixLQUFjO1FBQzdCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFTLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ssZ0NBQVEsR0FBaEIsVUFBaUIsS0FBYztRQUM3QixJQUFJLENBQUMsV0FBVyxHQUFXLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDMUMsQ0FBQzs7Z0JBNUJpQyxZQUFZOztJQW5CbkMsYUFBYTtRQUR6QixVQUFVLEVBQUU7T0FDQSxhQUFhLENBZ0R6QjtJQUFELG9CQUFDO0NBQUEsQUFoREQsSUFnREM7U0FoRFksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50TWFuYWdlciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFJlc2l6ZVNlcnZpY2Uge1xyXG4gIC8qKlxyXG4gICAqIFdpZHRoIG9mIHdpbmRvd1xyXG4gICAqL1xyXG4gIHB1YmxpYyB3aW5kb3dXaWR0aDogYW55O1xyXG5cclxuICAvKipcclxuICAgKiBNYWtlcyByZXNpemVTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXHJcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiByZXNpemVTdWJqZWN0XHJcbiAgICovXHJcbiAgZ2V0IG9uUmVzaXplJCgpOiBPYnNlcnZhYmxlPFdpbmRvdz4ge1xyXG4gICAgcmV0dXJuIHRoaXMucmVzaXplU3ViamVjdC5hc09ic2VydmFibGUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YmplY3Qgb2YgJ3Jlc2l6ZScgZXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIHJlc2l6ZVN1YmplY3Q6IFN1YmplY3Q8V2luZG93PjtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBldmVudE1hbmFnZXI6IEV2ZW50TWFuYWdlcikge1xyXG4gICAgdGhpcy5yZXNpemVTdWJqZWN0ID0gbmV3IFN1YmplY3QoKTtcclxuICAgIHRoaXMuZXZlbnRNYW5hZ2VyLmFkZEdsb2JhbEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgICd3aW5kb3cnLFxyXG4gICAgICAncmVzaXplJyxcclxuICAgICAgdGhpcy5vblJlc2l6ZS5iaW5kKHRoaXMpXHJcbiAgICApO1xyXG4gICAgdGhpcy5ldmVudE1hbmFnZXIuYWRkR2xvYmFsRXZlbnRMaXN0ZW5lcihcclxuICAgICAgJ3dpbmRvdycsXHJcbiAgICAgICdvbmxvYWQnLFxyXG4gICAgICB0aGlzLm9uTG9hZGVkLmJpbmQodGhpcylcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGVyIG9mICdyZXNpemUnIGV2ZW50LiBQYXNzZXMgZGF0YSB0aHJvdyByZXNpemVTdWJqZWN0XHJcbiAgICogQHBhcmFtIGV2ZW50IEV2ZW50IE9iamVjdCBvZiAncmVzaXplJyBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25SZXNpemUoZXZlbnQ6IFVJRXZlbnQpIHtcclxuICAgIHRoaXMucmVzaXplU3ViamVjdC5uZXh0KDxXaW5kb3c+ZXZlbnQudGFyZ2V0KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhbmRsZXIgb2YgJ29ubG9hZCcgZXZlbnQuIERlZmluZXMgdGhlIHdpZHRoIG9mIHdpbmRvd1xyXG4gICAqIEBwYXJhbSBldmVudCBFdmVudCBPYmplY3Qgb2YgJ29ubG9hZCcgZXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIG9uTG9hZGVkKGV2ZW50OiBVSUV2ZW50KSB7XHJcbiAgICB0aGlzLndpbmRvd1dpZHRoID0gPFdpbmRvdz5ldmVudC50YXJnZXQ7XHJcbiAgfVxyXG59XHJcbiJdfQ==
