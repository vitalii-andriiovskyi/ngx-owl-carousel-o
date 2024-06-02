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
import { isPlatformBrowser } from '@angular/common';
import { InjectionToken, PLATFORM_ID, Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Create a new injection token for injecting the window into a component.
 */
export const WINDOW = new InjectionToken('WindowToken');
/**
 * Define abstract class for obtaining reference to the global window object.
 */
export class WindowRef {
    get nativeWindow() {
        throw new Error('Not implemented.');
    }
}
/**
 * Define class that implements the abstract class and returns the native window object.
 */
export class BrowserWindowRef extends WindowRef {
    constructor() {
        super();
    }
    /**
     * @returns window object
     */
    get nativeWindow() {
        return window;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: BrowserWindowRef, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: BrowserWindowRef });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: BrowserWindowRef, decorators: [{
            type: Injectable
        }], ctorParameters: () => [] });
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
    const obj = {
        setTimeout: (func, time) => { },
        clearTimeout: (a) => { }
    };
    return obj;
}
/**
 * Create a injectable provider for the WindowRef token that uses the BrowserWindowRef class.
 */
export const browserWindowProvider = {
    provide: WindowRef,
    useClass: BrowserWindowRef
};
/**
 * Create an injectable provider that uses the windowFactory function for returning the native window object.
 */
export const windowProvider = {
    provide: WINDOW,
    useFactory: windowFactory,
    deps: [WindowRef, PLATFORM_ID]
};
/**
 * Create an array of providers.
 */
export const WINDOW_PROVIDERS = [browserWindowProvider, windowProvider];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2luZG93LXJlZi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGlicy9uZ3gtb3dsLWNhcm91c2VsLW8vc3JjL2xpYi9zZXJ2aWNlcy93aW5kb3ctcmVmLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsOENBQThDO0FBQzlDLDRCQUE0QjtBQUM1Qix1REFBdUQ7QUFDdkQsb0JBQW9CO0FBQ3BCLElBQUk7QUFDSixnQkFBZ0I7QUFDaEIsa0NBQWtDO0FBQ2xDLCtCQUErQjtBQUMvQiwwQkFBMEI7QUFDMUIsT0FBTztBQUNQLElBQUk7QUFFSixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRCxPQUFPLEVBQWtDLGNBQWMsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUV4Rzs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLE1BQU0sR0FBRyxJQUFJLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUV4RDs7R0FFRztBQUNILE1BQU0sT0FBZ0IsU0FBUztJQUM3QixJQUFJLFlBQVk7UUFDZCxNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDdEMsQ0FBQztDQUNGO0FBRUQ7O0dBRUc7QUFFSCxNQUFNLE9BQU8sZ0JBQWlCLFNBQVEsU0FBUztJQUM3QztRQUNFLEtBQUssRUFBRSxDQUFDO0lBQ1YsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBSSxZQUFZO1FBQ2QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzt1R0FWVSxnQkFBZ0I7MkdBQWhCLGdCQUFnQjs7MkZBQWhCLGdCQUFnQjtrQkFENUIsVUFBVTs7QUFjWDs7Ozs7R0FLRztBQUNILE1BQU0sVUFBVSxhQUFhLENBQzNCLGdCQUFrQyxFQUNsQyxVQUFrQjtJQUVsQixJQUFJLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7UUFDbEMsT0FBTyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUM7SUFDdkMsQ0FBQztJQUNELE1BQU0sR0FBRyxHQUFHO1FBQ1YsVUFBVSxFQUFFLENBQUMsSUFBUyxFQUFFLElBQVMsRUFBRSxFQUFFLEdBQUcsQ0FBQztRQUN6QyxZQUFZLEVBQUUsQ0FBQyxDQUFNLEVBQUUsRUFBRSxHQUFHLENBQUM7S0FDOUIsQ0FBQTtJQUNELE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQUVEOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQWtCO0lBQ2xELE9BQU8sRUFBRSxTQUFTO0lBQ2xCLFFBQVEsRUFBRSxnQkFBZ0I7Q0FDM0IsQ0FBQztBQUVGOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUFvQjtJQUM3QyxPQUFPLEVBQUUsTUFBTTtJQUNmLFVBQVUsRUFBRSxhQUFhO0lBQ3pCLElBQUksRUFBRSxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUM7Q0FDL0IsQ0FBQztBQUVGOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxjQUFjLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIGZ1bmN0aW9uIF93aW5kb3coKTogYW55IHtcbi8vICAgIC8vIHJldHVybiB0aGUgZ2xvYmFsIG5hdGl2ZSBicm93c2VyIHdpbmRvdyBvYmplY3Rcbi8vICAgIHJldHVybiB3aW5kb3c7XG4vLyB9XG4vLyBASW5qZWN0YWJsZSgpXG4vLyBleHBvcnQgY2xhc3MgV2luZG93UmVmU2VydmljZSB7XG4vLyAgICBnZXQgbmF0aXZlV2luZG93KCk6IGFueSB7XG4vLyAgICAgICByZXR1cm4gX3dpbmRvdygpO1xuLy8gICAgfVxuLy8gfVxuXG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDbGFzc1Byb3ZpZGVyLCBGYWN0b3J5UHJvdmlkZXIsIEluamVjdGlvblRva2VuLCBQTEFURk9STV9JRCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBpbmplY3Rpb24gdG9rZW4gZm9yIGluamVjdGluZyB0aGUgd2luZG93IGludG8gYSBjb21wb25lbnQuXG4gKi9cbmV4cG9ydCBjb25zdCBXSU5ET1cgPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ1dpbmRvd1Rva2VuJyk7XG5cbi8qKlxuICogRGVmaW5lIGFic3RyYWN0IGNsYXNzIGZvciBvYnRhaW5pbmcgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgd2luZG93IG9iamVjdC5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFdpbmRvd1JlZiB7XG4gIGdldCBuYXRpdmVXaW5kb3coKTogV2luZG93IHwgT2JqZWN0IHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZC4nKTtcbiAgfVxufVxuXG4vKipcbiAqIERlZmluZSBjbGFzcyB0aGF0IGltcGxlbWVudHMgdGhlIGFic3RyYWN0IGNsYXNzIGFuZCByZXR1cm5zIHRoZSBuYXRpdmUgd2luZG93IG9iamVjdC5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEJyb3dzZXJXaW5kb3dSZWYgZXh0ZW5kcyBXaW5kb3dSZWYge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHdpbmRvdyBvYmplY3RcbiAgICovXG4gIGdldCBuYXRpdmVXaW5kb3coKTogV2luZG93IHwgT2JqZWN0IHtcbiAgICByZXR1cm4gd2luZG93O1xuICB9XG59XG5cbi8qKlxuICogQ3JlYXRlIGFuIGZhY3RvcnkgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBuYXRpdmUgd2luZG93IG9iamVjdC5cbiAqIEBwYXJhbSBicm93c2VyV2luZG93UmVmIE5hdGl2ZSB3aW5kb3cgb2JqZWN0XG4gKiBAcGFyYW0gcGxhdGZvcm1JZCBpZCBvZiBwbGF0Zm9ybVxuICogQHJldHVybnMgdHlwZSBvZiBwbGF0Zm9ybSBvZiBlbXB0eSBvYmplY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHdpbmRvd0ZhY3RvcnkoXG4gIGJyb3dzZXJXaW5kb3dSZWY6IEJyb3dzZXJXaW5kb3dSZWYsXG4gIHBsYXRmb3JtSWQ6IE9iamVjdFxuKTogV2luZG93IHwgT2JqZWN0IHtcbiAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHBsYXRmb3JtSWQpKSB7XG4gICAgcmV0dXJuIGJyb3dzZXJXaW5kb3dSZWYubmF0aXZlV2luZG93O1xuICB9XG4gIGNvbnN0IG9iaiA9IHtcbiAgICBzZXRUaW1lb3V0OiAoZnVuYzogYW55LCB0aW1lOiBhbnkpID0+IHsgfSxcbiAgICBjbGVhclRpbWVvdXQ6IChhOiBhbnkpID0+IHsgfVxuICB9XG4gIHJldHVybiBvYmo7XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgaW5qZWN0YWJsZSBwcm92aWRlciBmb3IgdGhlIFdpbmRvd1JlZiB0b2tlbiB0aGF0IHVzZXMgdGhlIEJyb3dzZXJXaW5kb3dSZWYgY2xhc3MuXG4gKi9cbmV4cG9ydCBjb25zdCBicm93c2VyV2luZG93UHJvdmlkZXI6IENsYXNzUHJvdmlkZXIgPSB7XG4gIHByb3ZpZGU6IFdpbmRvd1JlZixcbiAgdXNlQ2xhc3M6IEJyb3dzZXJXaW5kb3dSZWZcbn07XG5cbi8qKlxuICogQ3JlYXRlIGFuIGluamVjdGFibGUgcHJvdmlkZXIgdGhhdCB1c2VzIHRoZSB3aW5kb3dGYWN0b3J5IGZ1bmN0aW9uIGZvciByZXR1cm5pbmcgdGhlIG5hdGl2ZSB3aW5kb3cgb2JqZWN0LlxuICovXG5leHBvcnQgY29uc3Qgd2luZG93UHJvdmlkZXI6IEZhY3RvcnlQcm92aWRlciA9IHtcbiAgcHJvdmlkZTogV0lORE9XLFxuICB1c2VGYWN0b3J5OiB3aW5kb3dGYWN0b3J5LFxuICBkZXBzOiBbV2luZG93UmVmLCBQTEFURk9STV9JRF1cbn07XG5cbi8qKlxuICogQ3JlYXRlIGFuIGFycmF5IG9mIHByb3ZpZGVycy5cbiAqL1xuZXhwb3J0IGNvbnN0IFdJTkRPV19QUk9WSURFUlMgPSBbYnJvd3NlcldpbmRvd1Byb3ZpZGVyLCB3aW5kb3dQcm92aWRlcl07XG4iXX0=