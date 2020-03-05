/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        setTimeout: function (func, time) { },
        clearTimeout: function (a) { }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2luZG93LXJlZi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW93bC1jYXJvdXNlbC1vLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3dpbmRvdy1yZWYuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw4Q0FBOEM7QUFDOUMsNEJBQTRCO0FBQzVCLHVEQUF1RDtBQUN2RCxvQkFBb0I7QUFDcEIsSUFBSTtBQUNKLGdCQUFnQjtBQUNoQixrQ0FBa0M7QUFDbEMsK0JBQStCO0FBQy9CLDBCQUEwQjtBQUMxQixPQUFPO0FBQ1AsSUFBSTs7QUFFSixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRCxPQUFPLEVBQWtDLGNBQWMsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXhHOztHQUVHO0FBQ0gsTUFBTSxDQUFDLElBQU0sTUFBTSxHQUFHLElBQUksY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBRXhEOztHQUVHO0FBQ0g7SUFBQTtJQUlBLENBQUM7SUFIQyxzQkFBSSxtQ0FBWTthQUFoQjtZQUNFLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUN0QyxDQUFDOzs7T0FBQTtJQUNILGdCQUFDO0FBQUQsQ0FBQyxBQUpELElBSUM7O0FBRUQ7O0dBRUc7QUFFSDtJQUFzQyxvQ0FBUztJQUM3QztlQUNFLGlCQUFPO0lBQ1QsQ0FBQztJQUtELHNCQUFJLDBDQUFZO1FBSGhCOztXQUVHO2FBQ0g7WUFDRSxPQUFPLE1BQU0sQ0FBQztRQUNoQixDQUFDOzs7T0FBQTtJQVZVLGdCQUFnQjtRQUQ1QixVQUFVLEVBQUU7T0FDQSxnQkFBZ0IsQ0FXNUI7SUFBRCx1QkFBQztDQUFBLEFBWEQsQ0FBc0MsU0FBUyxHQVc5QztTQVhZLGdCQUFnQjtBQWE3Qjs7Ozs7R0FLRztBQUNILE1BQU0sVUFBVSxhQUFhLENBQzNCLGdCQUFrQyxFQUNsQyxVQUFrQjtJQUVsQixJQUFJLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQ2pDLE9BQU8sZ0JBQWdCLENBQUMsWUFBWSxDQUFDO0tBQ3RDO0lBQ0QsSUFBTSxHQUFHLEdBQUc7UUFDVixVQUFVLEVBQUUsVUFBQyxJQUFTLEVBQUUsSUFBUyxJQUFNLENBQUM7UUFDeEMsWUFBWSxFQUFFLFVBQUMsQ0FBTSxJQUFNLENBQUM7S0FDN0IsQ0FBQTtJQUNELE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQUVEOztHQUVHO0FBQ0gsTUFBTSxDQUFDLElBQU0scUJBQXFCLEdBQWtCO0lBQ2xELE9BQU8sRUFBRSxTQUFTO0lBQ2xCLFFBQVEsRUFBRSxnQkFBZ0I7Q0FDM0IsQ0FBQztBQUVGOztHQUVHO0FBQ0gsTUFBTSxDQUFDLElBQU0sY0FBYyxHQUFvQjtJQUM3QyxPQUFPLEVBQUUsTUFBTTtJQUNmLFVBQVUsRUFBRSxhQUFhO0lBQ3pCLElBQUksRUFBRSxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUM7Q0FDL0IsQ0FBQztBQUVGOztHQUVHO0FBQ0gsTUFBTSxDQUFDLElBQU0sZ0JBQWdCLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxjQUFjLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuLy8gZnVuY3Rpb24gX3dpbmRvdygpOiBhbnkge1xyXG4vLyAgICAvLyByZXR1cm4gdGhlIGdsb2JhbCBuYXRpdmUgYnJvd3NlciB3aW5kb3cgb2JqZWN0XHJcbi8vICAgIHJldHVybiB3aW5kb3c7XHJcbi8vIH1cclxuLy8gQEluamVjdGFibGUoKVxyXG4vLyBleHBvcnQgY2xhc3MgV2luZG93UmVmU2VydmljZSB7XHJcbi8vICAgIGdldCBuYXRpdmVXaW5kb3coKTogYW55IHtcclxuLy8gICAgICAgcmV0dXJuIF93aW5kb3coKTtcclxuLy8gICAgfVxyXG4vLyB9XHJcblxyXG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IENsYXNzUHJvdmlkZXIsIEZhY3RvcnlQcm92aWRlciwgSW5qZWN0aW9uVG9rZW4sIFBMQVRGT1JNX0lELCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGEgbmV3IGluamVjdGlvbiB0b2tlbiBmb3IgaW5qZWN0aW5nIHRoZSB3aW5kb3cgaW50byBhIGNvbXBvbmVudC5cclxuICovXHJcbmV4cG9ydCBjb25zdCBXSU5ET1cgPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ1dpbmRvd1Rva2VuJyk7XHJcblxyXG4vKipcclxuICogRGVmaW5lIGFic3RyYWN0IGNsYXNzIGZvciBvYnRhaW5pbmcgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgd2luZG93IG9iamVjdC5cclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBXaW5kb3dSZWYge1xyXG4gIGdldCBuYXRpdmVXaW5kb3coKTogV2luZG93IHwgT2JqZWN0IHtcclxuICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkLicpO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIERlZmluZSBjbGFzcyB0aGF0IGltcGxlbWVudHMgdGhlIGFic3RyYWN0IGNsYXNzIGFuZCByZXR1cm5zIHRoZSBuYXRpdmUgd2luZG93IG9iamVjdC5cclxuICovXHJcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBCcm93c2VyV2luZG93UmVmIGV4dGVuZHMgV2luZG93UmVmIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcmV0dXJucyB3aW5kb3cgb2JqZWN0XHJcbiAgICovXHJcbiAgZ2V0IG5hdGl2ZVdpbmRvdygpOiBXaW5kb3cgfCBPYmplY3Qge1xyXG4gICAgcmV0dXJuIHdpbmRvdztcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYW4gZmFjdG9yeSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIG5hdGl2ZSB3aW5kb3cgb2JqZWN0LlxyXG4gKiBAcGFyYW0gYnJvd3NlcldpbmRvd1JlZiBOYXRpdmUgd2luZG93IG9iamVjdFxyXG4gKiBAcGFyYW0gcGxhdGZvcm1JZCBpZCBvZiBwbGF0Zm9ybVxyXG4gKiBAcmV0dXJucyB0eXBlIG9mIHBsYXRmb3JtIG9mIGVtcHR5IG9iamVjdFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHdpbmRvd0ZhY3RvcnkoXHJcbiAgYnJvd3NlcldpbmRvd1JlZjogQnJvd3NlcldpbmRvd1JlZixcclxuICBwbGF0Zm9ybUlkOiBPYmplY3RcclxuKTogV2luZG93IHwgT2JqZWN0IHtcclxuICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIocGxhdGZvcm1JZCkpIHtcclxuICAgIHJldHVybiBicm93c2VyV2luZG93UmVmLm5hdGl2ZVdpbmRvdztcclxuICB9XHJcbiAgY29uc3Qgb2JqID0ge1xyXG4gICAgc2V0VGltZW91dDogKGZ1bmM6IGFueSwgdGltZTogYW55KSA9PiB7fSxcclxuICAgIGNsZWFyVGltZW91dDogKGE6IGFueSkgPT4ge31cclxuICB9XHJcbiAgcmV0dXJuIG9iajtcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhIGluamVjdGFibGUgcHJvdmlkZXIgZm9yIHRoZSBXaW5kb3dSZWYgdG9rZW4gdGhhdCB1c2VzIHRoZSBCcm93c2VyV2luZG93UmVmIGNsYXNzLlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGJyb3dzZXJXaW5kb3dQcm92aWRlcjogQ2xhc3NQcm92aWRlciA9IHtcclxuICBwcm92aWRlOiBXaW5kb3dSZWYsXHJcbiAgdXNlQ2xhc3M6IEJyb3dzZXJXaW5kb3dSZWZcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYW4gaW5qZWN0YWJsZSBwcm92aWRlciB0aGF0IHVzZXMgdGhlIHdpbmRvd0ZhY3RvcnkgZnVuY3Rpb24gZm9yIHJldHVybmluZyB0aGUgbmF0aXZlIHdpbmRvdyBvYmplY3QuXHJcbiAqL1xyXG5leHBvcnQgY29uc3Qgd2luZG93UHJvdmlkZXI6IEZhY3RvcnlQcm92aWRlciA9IHtcclxuICBwcm92aWRlOiBXSU5ET1csXHJcbiAgdXNlRmFjdG9yeTogd2luZG93RmFjdG9yeSxcclxuICBkZXBzOiBbV2luZG93UmVmLCBQTEFURk9STV9JRF1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYW4gYXJyYXkgb2YgcHJvdmlkZXJzLlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IFdJTkRPV19QUk9WSURFUlMgPSBbYnJvd3NlcldpbmRvd1Byb3ZpZGVyLCB3aW5kb3dQcm92aWRlcl07XHJcbiJdfQ==
