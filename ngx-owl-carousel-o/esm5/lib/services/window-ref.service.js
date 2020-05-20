/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
// import { Injectable } from '@angular/core';
// function _window(): any {
//    // return the global native browser window object
//    return window;
// }
// @Injectable()
// export class WindowRefService {
//    get nativeWindow(): any {
//       return _window();
//    }
// }
import { __decorate, __extends } from "tslib";
import { isPlatformBrowser } from '@angular/common';
import { InjectionToken, PLATFORM_ID, Injectable } from '@angular/core';
/**
 * Create a new injection token for injecting the window into a component.
 */
export var WINDOW = new InjectionToken('WindowToken');
/**
 * Define abstract class for obtaining reference to the global window object.
 */
var /**
 * Define abstract class for obtaining reference to the global window object.
 * @abstract
 */
WindowRef = /** @class */ (function () {
    /**
     * Define abstract class for obtaining reference to the global window object.
     */
    function WindowRef() {
    }
    Object.defineProperty(WindowRef.prototype, "nativeWindow", {
        get: function () {
            throw new Error('Not implemented.');
        },
        enumerable: true,
        configurable: true
    });
    return WindowRef;
}());
export { WindowRef };
/**
 * Define class that implements the abstract class and returns the native window object.
 */
var BrowserWindowRef = /** @class */ (function (_super) {
    __extends(BrowserWindowRef, _super);
    function BrowserWindowRef() {
        return _super.call(this) || this;
    }
    Object.defineProperty(BrowserWindowRef.prototype, "nativeWindow", {
        /**
         * @returns window object
         */
        get: function () {
            return window;
        },
        enumerable: true,
        configurable: true
    });
    BrowserWindowRef = __decorate([
        Injectable()
    ], BrowserWindowRef);
    return BrowserWindowRef;
}(WindowRef));
export { BrowserWindowRef };
/**
 * Create an factory function that returns the native window object.
 * @param browserWindowRef Native window object
 * @param platformId id of platform
 * @returns type of platform of empty object
 */
export function windowFactory(browserWindowRef, platformId) {
    if (isPlatformBrowser(platformId)) {
        return browserWindowRef.nativeWindow;
    }
    var obj = {
        setTimeout: (/**
         * @param {?} func
         * @param {?} time
         * @return {?}
         */
        function (func, time) { }),
        clearTimeout: (/**
         * @param {?} a
         * @return {?}
         */
        function (a) { })
    };
    return obj;
}
/**
 * Create a injectable provider for the WindowRef token that uses the BrowserWindowRef class.
 */
export var browserWindowProvider = {
    provide: WindowRef,
    useClass: BrowserWindowRef
};
/**
 * Create an injectable provider that uses the windowFactory function for returning the native window object.
 */
export var windowProvider = {
    provide: WINDOW,
    useFactory: windowFactory,
    deps: [WindowRef, PLATFORM_ID]
};
/**
 * Create an array of providers.
 */
export var WINDOW_PROVIDERS = [browserWindowProvider, windowProvider];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2luZG93LXJlZi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW93bC1jYXJvdXNlbC1vLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3dpbmRvdy1yZWYuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBWUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDcEQsT0FBTyxFQUdMLGNBQWMsRUFDZCxXQUFXLEVBQ1osTUFBTSxlQUFlLENBQUM7Ozs7O0FBS3ZCLE1BQU0sS0FBTyxNQUFNLEdBQUcsSUFBSSxjQUFjLENBQUMsYUFBYSxDQUFDOzs7OztBQUt2RDs7Ozs7SUFIQTs7T0FFRztJQUNIO0lBSUEsQ0FBQztJQUhDLHNCQUFJLG1DQUFZOzs7O1FBQWhCO1lBQ0UsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7OztPQUFBO0lBQ0gsZ0JBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQzs7Ozs7Ozs7O0FBS0Q7Ozs7SUFBc0MsNENBQVM7SUFDN0M7ZUFDRSxpQkFBTztJQUNULENBQUM7SUFLRCxzQkFBSSwwQ0FBWTtRQUhoQjs7V0FFRzs7OztRQUNIO1lBQ0UsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNoQixDQUFDOzs7T0FBQTtJQUNILHVCQUFDO0FBQUQsQ0FBQyxBQVhELENBQXNDLFNBQVMsR0FXOUM7Ozs7Ozs7Ozs7O0FBUUQsTUFBTSx3QkFDSixnQkFBa0MsRUFDbEMsVUFBa0I7SUFFbEIsRUFBRSxDQUFDLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUM7SUFDdkMsQ0FBQzs7UUFDSyxHQUFHLEdBQUc7UUFDVixVQUFVOzs7OztRQUFFLFVBQUMsSUFBUyxFQUFFLElBQVMsSUFBTSxDQUFDLENBQUE7UUFDeEMsWUFBWTs7OztRQUFFLFVBQUMsQ0FBTSxJQUFNLENBQUMsQ0FBQTtLQUM3QjtJQUNELE1BQU0sQ0FBQyxHQUFHLENBQUM7QUFDYixDQUFDOzs7OztBQUtELE1BQU0sS0FBTyxxQkFBcUIsR0FBa0I7SUFDbEQsT0FBTyxFQUFFLFNBQVM7SUFDbEIsUUFBUSxFQUFFLGdCQUFnQjtDQUMzQjs7Ozs7QUFLRCxNQUFNLEtBQU8sY0FBYyxHQUFvQjtJQUM3QyxPQUFPLEVBQUUsTUFBTTtJQUNmLFVBQVUsRUFBRSxhQUFhO0lBQ3pCLElBQUksRUFBRSxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUM7Q0FDL0I7Ozs7O0FBS0QsTUFBTSxLQUFPLGdCQUFnQixHQUFHLENBQUMscUJBQXFCLEVBQUUsY0FBYyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG4vLyBmdW5jdGlvbiBfd2luZG93KCk6IGFueSB7XHJcbi8vICAgIC8vIHJldHVybiB0aGUgZ2xvYmFsIG5hdGl2ZSBicm93c2VyIHdpbmRvdyBvYmplY3RcclxuLy8gICAgcmV0dXJuIHdpbmRvdztcclxuLy8gfVxyXG4vLyBASW5qZWN0YWJsZSgpXHJcbi8vIGV4cG9ydCBjbGFzcyBXaW5kb3dSZWZTZXJ2aWNlIHtcclxuLy8gICAgZ2V0IG5hdGl2ZVdpbmRvdygpOiBhbnkge1xyXG4vLyAgICAgICByZXR1cm4gX3dpbmRvdygpO1xyXG4vLyAgICB9XHJcbi8vIH1cclxuXHJcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtcclxuICBDbGFzc1Byb3ZpZGVyLFxyXG4gIEZhY3RvcnlQcm92aWRlcixcclxuICBJbmplY3Rpb25Ub2tlbixcclxuICBQTEFURk9STV9JRFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhIG5ldyBpbmplY3Rpb24gdG9rZW4gZm9yIGluamVjdGluZyB0aGUgd2luZG93IGludG8gYSBjb21wb25lbnQuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgV0lORE9XID0gbmV3IEluamVjdGlvblRva2VuKCdXaW5kb3dUb2tlbicpO1xyXG5cclxuLyoqXHJcbiAqIERlZmluZSBhYnN0cmFjdCBjbGFzcyBmb3Igb2J0YWluaW5nIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIHdpbmRvdyBvYmplY3QuXHJcbiAqL1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgV2luZG93UmVmIHtcclxuICBnZXQgbmF0aXZlV2luZG93KCk6IFdpbmRvdyB8IE9iamVjdCB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZC4nKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEZWZpbmUgY2xhc3MgdGhhdCBpbXBsZW1lbnRzIHRoZSBhYnN0cmFjdCBjbGFzcyBhbmQgcmV0dXJucyB0aGUgbmF0aXZlIHdpbmRvdyBvYmplY3QuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQnJvd3NlcldpbmRvd1JlZiBleHRlbmRzIFdpbmRvd1JlZiB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHJldHVybnMgd2luZG93IG9iamVjdFxyXG4gICAqL1xyXG4gIGdldCBuYXRpdmVXaW5kb3coKTogV2luZG93IHwgT2JqZWN0IHtcclxuICAgIHJldHVybiB3aW5kb3c7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGFuIGZhY3RvcnkgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBuYXRpdmUgd2luZG93IG9iamVjdC5cclxuICogQHBhcmFtIGJyb3dzZXJXaW5kb3dSZWYgTmF0aXZlIHdpbmRvdyBvYmplY3RcclxuICogQHBhcmFtIHBsYXRmb3JtSWQgaWQgb2YgcGxhdGZvcm1cclxuICogQHJldHVybnMgdHlwZSBvZiBwbGF0Zm9ybSBvZiBlbXB0eSBvYmplY3RcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB3aW5kb3dGYWN0b3J5KFxyXG4gIGJyb3dzZXJXaW5kb3dSZWY6IEJyb3dzZXJXaW5kb3dSZWYsXHJcbiAgcGxhdGZvcm1JZDogT2JqZWN0XHJcbik6IFdpbmRvdyB8IE9iamVjdCB7XHJcbiAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHBsYXRmb3JtSWQpKSB7XHJcbiAgICByZXR1cm4gYnJvd3NlcldpbmRvd1JlZi5uYXRpdmVXaW5kb3c7XHJcbiAgfVxyXG4gIGNvbnN0IG9iaiA9IHtcclxuICAgIHNldFRpbWVvdXQ6IChmdW5jOiBhbnksIHRpbWU6IGFueSkgPT4ge30sXHJcbiAgICBjbGVhclRpbWVvdXQ6IChhOiBhbnkpID0+IHt9XHJcbiAgfVxyXG4gIHJldHVybiBvYmo7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYSBpbmplY3RhYmxlIHByb3ZpZGVyIGZvciB0aGUgV2luZG93UmVmIHRva2VuIHRoYXQgdXNlcyB0aGUgQnJvd3NlcldpbmRvd1JlZiBjbGFzcy5cclxuICovXHJcbmV4cG9ydCBjb25zdCBicm93c2VyV2luZG93UHJvdmlkZXI6IENsYXNzUHJvdmlkZXIgPSB7XHJcbiAgcHJvdmlkZTogV2luZG93UmVmLFxyXG4gIHVzZUNsYXNzOiBCcm93c2VyV2luZG93UmVmXHJcbn07XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGFuIGluamVjdGFibGUgcHJvdmlkZXIgdGhhdCB1c2VzIHRoZSB3aW5kb3dGYWN0b3J5IGZ1bmN0aW9uIGZvciByZXR1cm5pbmcgdGhlIG5hdGl2ZSB3aW5kb3cgb2JqZWN0LlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHdpbmRvd1Byb3ZpZGVyOiBGYWN0b3J5UHJvdmlkZXIgPSB7XHJcbiAgcHJvdmlkZTogV0lORE9XLFxyXG4gIHVzZUZhY3Rvcnk6IHdpbmRvd0ZhY3RvcnksXHJcbiAgZGVwczogW1dpbmRvd1JlZiwgUExBVEZPUk1fSURdXHJcbn07XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGFuIGFycmF5IG9mIHByb3ZpZGVycy5cclxuICovXHJcbmV4cG9ydCBjb25zdCBXSU5ET1dfUFJPVklERVJTID0gW2Jyb3dzZXJXaW5kb3dQcm92aWRlciwgd2luZG93UHJvdmlkZXJdO1xyXG4iXX0=
