/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
        get: /**
         * Makes resizeSubject become Observable
         * @return {?} Observable of resizeSubject
         */
        function () {
            return this.resizeSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Handler of 'resize' event. Passes data throw resizeSubject
     * @param {?} event Event Object of 'resize' event
     * @return {?}
     */
    ResizeService.prototype.onResize = /**
     * Handler of 'resize' event. Passes data throw resizeSubject
     * @param {?} event Event Object of 'resize' event
     * @return {?}
     */
    function (event) {
        this.resizeSubject.next(/** @type {?} */ (event.target));
    };
    /**
     * Handler of 'onload' event. Defines the width of window
     * @param {?} event Event Object of 'onload' event
     * @return {?}
     */
    ResizeService.prototype.onLoaded = /**
     * Handler of 'onload' event. Defines the width of window
     * @param {?} event Event Object of 'onload' event
     * @return {?}
     */
    function (event) {
        this.windowWidth = /** @type {?} */ (event.target);
    };
    ResizeService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ResizeService.ctorParameters = function () { return [
        { type: EventManager }
    ]; };
    return ResizeService;
}());
export { ResizeService };
if (false) {
    /**
     * Width of window
     * @type {?}
     */
    ResizeService.prototype.windowWidth;
    /**
     * Subject of 'resize' event
     * @type {?}
     */
    ResizeService.prototype.resizeSubject;
    /** @type {?} */
    ResizeService.prototype.eventManager;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXplLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvcmVzaXplLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0lBc0J6Qyx1QkFBb0IsWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDNUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQ25DLElBQUksQ0FBQyxZQUFZLENBQUMsc0JBQXNCLENBQ3RDLFFBQVEsRUFDUixRQUFRLEVBQ1IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ3pCLENBQUM7UUFDRixJQUFJLENBQUMsWUFBWSxDQUFDLHNCQUFzQixDQUN0QyxRQUFRLEVBQ1IsUUFBUSxFQUNSLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUN6QixDQUFDO0tBQ0g7SUFyQkQsc0JBQUksb0NBQVM7UUFKYjs7O1dBR0c7Ozs7O1FBQ0g7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUMxQzs7O09BQUE7Ozs7OztJQXlCTyxnQ0FBUTs7Ozs7Y0FBQyxLQUFjO1FBQzdCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxtQkFBUyxLQUFLLENBQUMsTUFBTSxFQUFDLENBQUM7Ozs7Ozs7SUFPeEMsZ0NBQVE7Ozs7O2NBQUMsS0FBYztRQUM3QixJQUFJLENBQUMsV0FBVyxxQkFBVyxLQUFLLENBQUMsTUFBTSxDQUFBLENBQUM7OztnQkEvQzNDLFVBQVU7Ozs7Z0JBSkYsWUFBWTs7d0JBQXJCOztTQUthLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudE1hbmFnZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBSZXNpemVTZXJ2aWNlIHtcclxuICAvKipcclxuICAgKiBXaWR0aCBvZiB3aW5kb3dcclxuICAgKi9cclxuICBwdWJsaWMgd2luZG93V2lkdGg6IGFueTtcclxuXHJcbiAgLyoqXHJcbiAgICogTWFrZXMgcmVzaXplU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxyXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgcmVzaXplU3ViamVjdFxyXG4gICAqL1xyXG4gIGdldCBvblJlc2l6ZSQoKTogT2JzZXJ2YWJsZTxXaW5kb3c+IHtcclxuICAgIHJldHVybiB0aGlzLnJlc2l6ZVN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdWJqZWN0IG9mICdyZXNpemUnIGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSByZXNpemVTdWJqZWN0OiBTdWJqZWN0PFdpbmRvdz47XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZXZlbnRNYW5hZ2VyOiBFdmVudE1hbmFnZXIpIHtcclxuICAgIHRoaXMucmVzaXplU3ViamVjdCA9IG5ldyBTdWJqZWN0KCk7XHJcbiAgICB0aGlzLmV2ZW50TWFuYWdlci5hZGRHbG9iYWxFdmVudExpc3RlbmVyKFxyXG4gICAgICAnd2luZG93JyxcclxuICAgICAgJ3Jlc2l6ZScsXHJcbiAgICAgIHRoaXMub25SZXNpemUuYmluZCh0aGlzKVxyXG4gICAgKTtcclxuICAgIHRoaXMuZXZlbnRNYW5hZ2VyLmFkZEdsb2JhbEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgICd3aW5kb3cnLFxyXG4gICAgICAnb25sb2FkJyxcclxuICAgICAgdGhpcy5vbkxvYWRlZC5iaW5kKHRoaXMpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlciBvZiAncmVzaXplJyBldmVudC4gUGFzc2VzIGRhdGEgdGhyb3cgcmVzaXplU3ViamVjdFxyXG4gICAqIEBwYXJhbSBldmVudCBFdmVudCBPYmplY3Qgb2YgJ3Jlc2l6ZScgZXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIG9uUmVzaXplKGV2ZW50OiBVSUV2ZW50KSB7XHJcbiAgICB0aGlzLnJlc2l6ZVN1YmplY3QubmV4dCg8V2luZG93PmV2ZW50LnRhcmdldCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGVyIG9mICdvbmxvYWQnIGV2ZW50LiBEZWZpbmVzIHRoZSB3aWR0aCBvZiB3aW5kb3dcclxuICAgKiBAcGFyYW0gZXZlbnQgRXZlbnQgT2JqZWN0IG9mICdvbmxvYWQnIGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbkxvYWRlZChldmVudDogVUlFdmVudCkge1xyXG4gICAgdGhpcy53aW5kb3dXaWR0aCA9IDxXaW5kb3c+ZXZlbnQudGFyZ2V0O1xyXG4gIH1cclxufVxyXG4iXX0=