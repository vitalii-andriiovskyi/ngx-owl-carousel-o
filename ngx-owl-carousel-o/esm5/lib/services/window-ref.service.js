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
import * as tslib_1 from "tslib";
import { isPlatformBrowser } from '@angular/common';
import { InjectionToken, PLATFORM_ID } from '@angular/core';
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
    tslib_1.__extends(BrowserWindowRef, _super);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2luZG93LXJlZi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW93bC1jYXJvdXNlbC1vLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3dpbmRvdy1yZWYuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw4Q0FBOEM7QUFDOUMsNEJBQTRCO0FBQzVCLHVEQUF1RDtBQUN2RCxvQkFBb0I7QUFDcEIsSUFBSTtBQUNKLGdCQUFnQjtBQUNoQixrQ0FBa0M7QUFDbEMsK0JBQStCO0FBQy9CLDBCQUEwQjtBQUMxQixPQUFPO0FBQ1AsSUFBSTs7QUFFSixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRCxPQUFPLEVBR0wsY0FBYyxFQUNkLFdBQVcsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUV2Qjs7R0FFRztBQUNILE1BQU0sQ0FBQyxJQUFNLE1BQU0sR0FBRyxJQUFJLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUV4RDs7R0FFRztBQUNIO0lBQUE7SUFJQSxDQUFDO0lBSEMsc0JBQUksbUNBQVk7YUFBaEI7WUFDRSxNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDdEMsQ0FBQzs7O09BQUE7SUFDSCxnQkFBQztBQUFELENBQUMsQUFKRCxJQUlDOztBQUVEOztHQUVHO0FBQ0g7SUFBc0MsNENBQVM7SUFDN0M7ZUFDRSxpQkFBTztJQUNULENBQUM7SUFLRCxzQkFBSSwwQ0FBWTtRQUhoQjs7V0FFRzthQUNIO1lBQ0UsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQzs7O09BQUE7SUFDSCx1QkFBQztBQUFELENBQUMsQUFYRCxDQUFzQyxTQUFTLEdBVzlDOztBQUVEOzs7OztHQUtHO0FBQ0gsTUFBTSxVQUFVLGFBQWEsQ0FDM0IsZ0JBQWtDLEVBQ2xDLFVBQWtCO0lBRWxCLElBQUksaUJBQWlCLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDakMsT0FBTyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUM7S0FDdEM7SUFDRCxJQUFNLEdBQUcsR0FBRztRQUNWLFVBQVUsRUFBRSxVQUFDLElBQVMsRUFBRSxJQUFTLElBQU0sQ0FBQztRQUN4QyxZQUFZLEVBQUUsVUFBQyxDQUFNLElBQU0sQ0FBQztLQUM3QixDQUFBO0lBQ0QsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLENBQUMsSUFBTSxxQkFBcUIsR0FBa0I7SUFDbEQsT0FBTyxFQUFFLFNBQVM7SUFDbEIsUUFBUSxFQUFFLGdCQUFnQjtDQUMzQixDQUFDO0FBRUY7O0dBRUc7QUFDSCxNQUFNLENBQUMsSUFBTSxjQUFjLEdBQW9CO0lBQzdDLE9BQU8sRUFBRSxNQUFNO0lBQ2YsVUFBVSxFQUFFLGFBQWE7SUFDekIsSUFBSSxFQUFFLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQztDQUMvQixDQUFDO0FBRUY7O0dBRUc7QUFDSCxNQUFNLENBQUMsSUFBTSxnQkFBZ0IsR0FBRyxDQUFDLHFCQUFxQixFQUFFLGNBQWMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy8gZnVuY3Rpb24gX3dpbmRvdygpOiBhbnkge1xuLy8gICAgLy8gcmV0dXJuIHRoZSBnbG9iYWwgbmF0aXZlIGJyb3dzZXIgd2luZG93IG9iamVjdFxuLy8gICAgcmV0dXJuIHdpbmRvdztcbi8vIH1cbi8vIEBJbmplY3RhYmxlKClcbi8vIGV4cG9ydCBjbGFzcyBXaW5kb3dSZWZTZXJ2aWNlIHtcbi8vICAgIGdldCBuYXRpdmVXaW5kb3coKTogYW55IHtcbi8vICAgICAgIHJldHVybiBfd2luZG93KCk7XG4vLyAgICB9XG4vLyB9XG5cbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIENsYXNzUHJvdmlkZXIsXG4gIEZhY3RvcnlQcm92aWRlcixcbiAgSW5qZWN0aW9uVG9rZW4sXG4gIFBMQVRGT1JNX0lEXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBpbmplY3Rpb24gdG9rZW4gZm9yIGluamVjdGluZyB0aGUgd2luZG93IGludG8gYSBjb21wb25lbnQuXG4gKi9cbmV4cG9ydCBjb25zdCBXSU5ET1cgPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ1dpbmRvd1Rva2VuJyk7XG5cbi8qKlxuICogRGVmaW5lIGFic3RyYWN0IGNsYXNzIGZvciBvYnRhaW5pbmcgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgd2luZG93IG9iamVjdC5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFdpbmRvd1JlZiB7XG4gIGdldCBuYXRpdmVXaW5kb3coKTogV2luZG93IHwgT2JqZWN0IHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZC4nKTtcbiAgfVxufVxuXG4vKipcbiAqIERlZmluZSBjbGFzcyB0aGF0IGltcGxlbWVudHMgdGhlIGFic3RyYWN0IGNsYXNzIGFuZCByZXR1cm5zIHRoZSBuYXRpdmUgd2luZG93IG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIEJyb3dzZXJXaW5kb3dSZWYgZXh0ZW5kcyBXaW5kb3dSZWYge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHdpbmRvdyBvYmplY3RcbiAgICovXG4gIGdldCBuYXRpdmVXaW5kb3coKTogV2luZG93IHwgT2JqZWN0IHtcbiAgICByZXR1cm4gd2luZG93O1xuICB9XG59XG5cbi8qKlxuICogQ3JlYXRlIGFuIGZhY3RvcnkgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBuYXRpdmUgd2luZG93IG9iamVjdC5cbiAqIEBwYXJhbSBicm93c2VyV2luZG93UmVmIE5hdGl2ZSB3aW5kb3cgb2JqZWN0XG4gKiBAcGFyYW0gcGxhdGZvcm1JZCBpZCBvZiBwbGF0Zm9ybVxuICogQHJldHVybnMgdHlwZSBvZiBwbGF0Zm9ybSBvZiBlbXB0eSBvYmplY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHdpbmRvd0ZhY3RvcnkoXG4gIGJyb3dzZXJXaW5kb3dSZWY6IEJyb3dzZXJXaW5kb3dSZWYsXG4gIHBsYXRmb3JtSWQ6IE9iamVjdFxuKTogV2luZG93IHwgT2JqZWN0IHtcbiAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHBsYXRmb3JtSWQpKSB7XG4gICAgcmV0dXJuIGJyb3dzZXJXaW5kb3dSZWYubmF0aXZlV2luZG93O1xuICB9XG4gIGNvbnN0IG9iaiA9IHtcbiAgICBzZXRUaW1lb3V0OiAoZnVuYzogYW55LCB0aW1lOiBhbnkpID0+IHt9LFxuICAgIGNsZWFyVGltZW91dDogKGE6IGFueSkgPT4ge31cbiAgfVxuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIGluamVjdGFibGUgcHJvdmlkZXIgZm9yIHRoZSBXaW5kb3dSZWYgdG9rZW4gdGhhdCB1c2VzIHRoZSBCcm93c2VyV2luZG93UmVmIGNsYXNzLlxuICovXG5leHBvcnQgY29uc3QgYnJvd3NlcldpbmRvd1Byb3ZpZGVyOiBDbGFzc1Byb3ZpZGVyID0ge1xuICBwcm92aWRlOiBXaW5kb3dSZWYsXG4gIHVzZUNsYXNzOiBCcm93c2VyV2luZG93UmVmXG59O1xuXG4vKipcbiAqIENyZWF0ZSBhbiBpbmplY3RhYmxlIHByb3ZpZGVyIHRoYXQgdXNlcyB0aGUgd2luZG93RmFjdG9yeSBmdW5jdGlvbiBmb3IgcmV0dXJuaW5nIHRoZSBuYXRpdmUgd2luZG93IG9iamVjdC5cbiAqL1xuZXhwb3J0IGNvbnN0IHdpbmRvd1Byb3ZpZGVyOiBGYWN0b3J5UHJvdmlkZXIgPSB7XG4gIHByb3ZpZGU6IFdJTkRPVyxcbiAgdXNlRmFjdG9yeTogd2luZG93RmFjdG9yeSxcbiAgZGVwczogW1dpbmRvd1JlZiwgUExBVEZPUk1fSURdXG59O1xuXG4vKipcbiAqIENyZWF0ZSBhbiBhcnJheSBvZiBwcm92aWRlcnMuXG4gKi9cbmV4cG9ydCBjb25zdCBXSU5ET1dfUFJPVklERVJTID0gW2Jyb3dzZXJXaW5kb3dQcm92aWRlciwgd2luZG93UHJvdmlkZXJdO1xuIl19