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
var WindowRef = /** @class */ (function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2luZG93LXJlZi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW93bC1jYXJvdXNlbC1vLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3dpbmRvdy1yZWYuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw4Q0FBOEM7QUFDOUMsNEJBQTRCO0FBQzVCLHVEQUF1RDtBQUN2RCxvQkFBb0I7QUFDcEIsSUFBSTtBQUNKLGdCQUFnQjtBQUNoQixrQ0FBa0M7QUFDbEMsK0JBQStCO0FBQy9CLDBCQUEwQjtBQUMxQixPQUFPO0FBQ1AsSUFBSTs7QUFFSixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRCxPQUFPLEVBQWtDLGNBQWMsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXhHOztHQUVHO0FBQ0gsTUFBTSxDQUFDLElBQU0sTUFBTSxHQUFHLElBQUksY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBRXhEOztHQUVHO0FBQ0g7SUFBQTtJQUlBLENBQUM7SUFIQyxzQkFBSSxtQ0FBWTthQUFoQjtZQUNFLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUN0QyxDQUFDOzs7T0FBQTtJQUNILGdCQUFDO0FBQUQsQ0FBQyxBQUpELElBSUM7O0FBRUQ7O0dBRUc7QUFFSDtJQUFzQyxvQ0FBUztJQUM3QztlQUNFLGlCQUFPO0lBQ1QsQ0FBQztJQUtELHNCQUFJLDBDQUFZO1FBSGhCOztXQUVHO2FBQ0g7WUFDRSxPQUFPLE1BQU0sQ0FBQztRQUNoQixDQUFDOzs7T0FBQTtJQVZVLGdCQUFnQjtRQUQ1QixVQUFVLEVBQUU7T0FDQSxnQkFBZ0IsQ0FXNUI7SUFBRCx1QkFBQztDQUFBLEFBWEQsQ0FBc0MsU0FBUyxHQVc5QztTQVhZLGdCQUFnQjtBQWE3Qjs7Ozs7R0FLRztBQUNILE1BQU0sVUFBVSxhQUFhLENBQzNCLGdCQUFrQyxFQUNsQyxVQUFrQjtJQUVsQixJQUFJLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQ2pDLE9BQU8sZ0JBQWdCLENBQUMsWUFBWSxDQUFDO0tBQ3RDO0lBQ0QsSUFBTSxHQUFHLEdBQUc7UUFDVixVQUFVLEVBQUUsVUFBQyxJQUFTLEVBQUUsSUFBUyxJQUFNLENBQUM7UUFDeEMsWUFBWSxFQUFFLFVBQUMsQ0FBTSxJQUFNLENBQUM7S0FDN0IsQ0FBQTtJQUNELE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQUVEOztHQUVHO0FBQ0gsTUFBTSxDQUFDLElBQU0scUJBQXFCLEdBQWtCO0lBQ2xELE9BQU8sRUFBRSxTQUFTO0lBQ2xCLFFBQVEsRUFBRSxnQkFBZ0I7Q0FDM0IsQ0FBQztBQUVGOztHQUVHO0FBQ0gsTUFBTSxDQUFDLElBQU0sY0FBYyxHQUFvQjtJQUM3QyxPQUFPLEVBQUUsTUFBTTtJQUNmLFVBQVUsRUFBRSxhQUFhO0lBQ3pCLElBQUksRUFBRSxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUM7Q0FDL0IsQ0FBQztBQUVGOztHQUVHO0FBQ0gsTUFBTSxDQUFDLElBQU0sZ0JBQWdCLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxjQUFjLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIGZ1bmN0aW9uIF93aW5kb3coKTogYW55IHtcbi8vICAgIC8vIHJldHVybiB0aGUgZ2xvYmFsIG5hdGl2ZSBicm93c2VyIHdpbmRvdyBvYmplY3Rcbi8vICAgIHJldHVybiB3aW5kb3c7XG4vLyB9XG4vLyBASW5qZWN0YWJsZSgpXG4vLyBleHBvcnQgY2xhc3MgV2luZG93UmVmU2VydmljZSB7XG4vLyAgICBnZXQgbmF0aXZlV2luZG93KCk6IGFueSB7XG4vLyAgICAgICByZXR1cm4gX3dpbmRvdygpO1xuLy8gICAgfVxuLy8gfVxuXG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDbGFzc1Byb3ZpZGVyLCBGYWN0b3J5UHJvdmlkZXIsIEluamVjdGlvblRva2VuLCBQTEFURk9STV9JRCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBpbmplY3Rpb24gdG9rZW4gZm9yIGluamVjdGluZyB0aGUgd2luZG93IGludG8gYSBjb21wb25lbnQuXG4gKi9cbmV4cG9ydCBjb25zdCBXSU5ET1cgPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ1dpbmRvd1Rva2VuJyk7XG5cbi8qKlxuICogRGVmaW5lIGFic3RyYWN0IGNsYXNzIGZvciBvYnRhaW5pbmcgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgd2luZG93IG9iamVjdC5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFdpbmRvd1JlZiB7XG4gIGdldCBuYXRpdmVXaW5kb3coKTogV2luZG93IHwgT2JqZWN0IHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZC4nKTtcbiAgfVxufVxuXG4vKipcbiAqIERlZmluZSBjbGFzcyB0aGF0IGltcGxlbWVudHMgdGhlIGFic3RyYWN0IGNsYXNzIGFuZCByZXR1cm5zIHRoZSBuYXRpdmUgd2luZG93IG9iamVjdC5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEJyb3dzZXJXaW5kb3dSZWYgZXh0ZW5kcyBXaW5kb3dSZWYge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHdpbmRvdyBvYmplY3RcbiAgICovXG4gIGdldCBuYXRpdmVXaW5kb3coKTogV2luZG93IHwgT2JqZWN0IHtcbiAgICByZXR1cm4gd2luZG93O1xuICB9XG59XG5cbi8qKlxuICogQ3JlYXRlIGFuIGZhY3RvcnkgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBuYXRpdmUgd2luZG93IG9iamVjdC5cbiAqIEBwYXJhbSBicm93c2VyV2luZG93UmVmIE5hdGl2ZSB3aW5kb3cgb2JqZWN0XG4gKiBAcGFyYW0gcGxhdGZvcm1JZCBpZCBvZiBwbGF0Zm9ybVxuICogQHJldHVybnMgdHlwZSBvZiBwbGF0Zm9ybSBvZiBlbXB0eSBvYmplY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHdpbmRvd0ZhY3RvcnkoXG4gIGJyb3dzZXJXaW5kb3dSZWY6IEJyb3dzZXJXaW5kb3dSZWYsXG4gIHBsYXRmb3JtSWQ6IE9iamVjdFxuKTogV2luZG93IHwgT2JqZWN0IHtcbiAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHBsYXRmb3JtSWQpKSB7XG4gICAgcmV0dXJuIGJyb3dzZXJXaW5kb3dSZWYubmF0aXZlV2luZG93O1xuICB9XG4gIGNvbnN0IG9iaiA9IHtcbiAgICBzZXRUaW1lb3V0OiAoZnVuYzogYW55LCB0aW1lOiBhbnkpID0+IHt9LFxuICAgIGNsZWFyVGltZW91dDogKGE6IGFueSkgPT4ge31cbiAgfVxuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIGluamVjdGFibGUgcHJvdmlkZXIgZm9yIHRoZSBXaW5kb3dSZWYgdG9rZW4gdGhhdCB1c2VzIHRoZSBCcm93c2VyV2luZG93UmVmIGNsYXNzLlxuICovXG5leHBvcnQgY29uc3QgYnJvd3NlcldpbmRvd1Byb3ZpZGVyOiBDbGFzc1Byb3ZpZGVyID0ge1xuICBwcm92aWRlOiBXaW5kb3dSZWYsXG4gIHVzZUNsYXNzOiBCcm93c2VyV2luZG93UmVmXG59O1xuXG4vKipcbiAqIENyZWF0ZSBhbiBpbmplY3RhYmxlIHByb3ZpZGVyIHRoYXQgdXNlcyB0aGUgd2luZG93RmFjdG9yeSBmdW5jdGlvbiBmb3IgcmV0dXJuaW5nIHRoZSBuYXRpdmUgd2luZG93IG9iamVjdC5cbiAqL1xuZXhwb3J0IGNvbnN0IHdpbmRvd1Byb3ZpZGVyOiBGYWN0b3J5UHJvdmlkZXIgPSB7XG4gIHByb3ZpZGU6IFdJTkRPVyxcbiAgdXNlRmFjdG9yeTogd2luZG93RmFjdG9yeSxcbiAgZGVwczogW1dpbmRvd1JlZiwgUExBVEZPUk1fSURdXG59O1xuXG4vKipcbiAqIENyZWF0ZSBhbiBhcnJheSBvZiBwcm92aWRlcnMuXG4gKi9cbmV4cG9ydCBjb25zdCBXSU5ET1dfUFJPVklERVJTID0gW2Jyb3dzZXJXaW5kb3dQcm92aWRlciwgd2luZG93UHJvdmlkZXJdO1xuIl19