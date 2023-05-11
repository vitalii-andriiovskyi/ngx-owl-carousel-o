import { isPlatformBrowser } from '@angular/common';
import { InjectionToken, PLATFORM_ID, Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Create a new injection token for injecting the Document into a component.
 */
export const DOCUMENT = new InjectionToken('DocumentToken');
/**
 * Define abstract class for obtaining reference to the global Document object.
 */
export class DocumentRef {
    get nativeDocument() {
        throw new Error('Not implemented.');
    }
}
/**
 * Define class that implements the abstract class and returns the native Document object.
 */
class BrowserDocumentRef extends DocumentRef {
    constructor() {
        super();
    }
    /**
     * @returns Document object
     */
    get nativeDocument() {
        return document;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: BrowserDocumentRef, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: BrowserDocumentRef });
}
export { BrowserDocumentRef };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: BrowserDocumentRef, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });
/**
 * Create an factory function that returns the native Document object.
 * @param browserDocumentRef Native Document object
 * @param platformId id of platform
 * @returns type of platform of empty object
 */
export function documentFactory(browserDocumentRef, platformId) {
    if (isPlatformBrowser(platformId)) {
        return browserDocumentRef.nativeDocument;
    }
    const doc = {
        hidden: false,
        visibilityState: 'visible'
    };
    return doc;
}
/**
 * Create a injectable provider for the DocumentRef token that uses the BrowserDocumentRef class.
 */
export const browserDocumentProvider = {
    provide: DocumentRef,
    useClass: BrowserDocumentRef
};
/**
 * Create an injectable provider that uses the DocumentFactory function for returning the native Document object.
 */
export const documentProvider = {
    provide: DOCUMENT,
    useFactory: documentFactory,
    deps: [DocumentRef, PLATFORM_ID]
};
/**
 * Create an array of providers.
 */
export const DOCUMENT_PROVIDERS = [browserDocumentProvider, documentProvider];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jdW1lbnQtcmVmLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWJzL25neC1vd2wtY2Fyb3VzZWwtby9zcmMvbGliL3NlcnZpY2VzL2RvY3VtZW50LXJlZi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFBa0MsY0FBYyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBRXhHOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sUUFBUSxHQUFHLElBQUksY0FBYyxDQUFXLGVBQWUsQ0FBQyxDQUFDO0FBQ3RFOztHQUVHO0FBQ0gsTUFBTSxPQUFnQixXQUFXO0lBQy9CLElBQUksY0FBYztRQUNoQixNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDdEMsQ0FBQztDQUNGO0FBRUQ7O0dBRUc7QUFDSCxNQUNhLGtCQUFtQixTQUFRLFdBQVc7SUFDakQ7UUFDRSxLQUFLLEVBQUUsQ0FBQztJQUNWLENBQUM7SUFFRDs7T0FFRztJQUNILElBQUksY0FBYztRQUNoQixPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO3VHQVZVLGtCQUFrQjsyR0FBbEIsa0JBQWtCOztTQUFsQixrQkFBa0I7MkZBQWxCLGtCQUFrQjtrQkFEOUIsVUFBVTs7QUFjWDs7Ozs7R0FLRztBQUNILE1BQU0sVUFBVSxlQUFlLENBQzdCLGtCQUFzQyxFQUN0QyxVQUFrQjtJQUVsQixJQUFJLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQ2pDLE9BQU8sa0JBQWtCLENBQUMsY0FBYyxDQUFDO0tBQzFDO0lBQ0QsTUFBTSxHQUFHLEdBQUc7UUFDVixNQUFNLEVBQUUsS0FBSztRQUNiLGVBQWUsRUFBRSxTQUFTO0tBQzNCLENBQUE7SUFDRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUFFRDs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLHVCQUF1QixHQUFrQjtJQUNwRCxPQUFPLEVBQUUsV0FBVztJQUNwQixRQUFRLEVBQUUsa0JBQWtCO0NBQzdCLENBQUM7QUFFRjs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixHQUFvQjtJQUMvQyxPQUFPLEVBQUUsUUFBUTtJQUNqQixVQUFVLEVBQUUsZUFBZTtJQUMzQixJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDO0NBQ2pDLENBQUM7QUFFRjs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFHLENBQUMsdUJBQXVCLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENsYXNzUHJvdmlkZXIsIEZhY3RvcnlQcm92aWRlciwgSW5qZWN0aW9uVG9rZW4sIFBMQVRGT1JNX0lELCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IGluamVjdGlvbiB0b2tlbiBmb3IgaW5qZWN0aW5nIHRoZSBEb2N1bWVudCBpbnRvIGEgY29tcG9uZW50LlxuICovXG5leHBvcnQgY29uc3QgRE9DVU1FTlQgPSBuZXcgSW5qZWN0aW9uVG9rZW48RG9jdW1lbnQ+KCdEb2N1bWVudFRva2VuJyk7XG4vKipcbiAqIERlZmluZSBhYnN0cmFjdCBjbGFzcyBmb3Igb2J0YWluaW5nIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIERvY3VtZW50IG9iamVjdC5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIERvY3VtZW50UmVmIHtcbiAgZ2V0IG5hdGl2ZURvY3VtZW50KCk6IERvY3VtZW50IHwgT2JqZWN0IHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZC4nKTtcbiAgfVxufVxuXG4vKipcbiAqIERlZmluZSBjbGFzcyB0aGF0IGltcGxlbWVudHMgdGhlIGFic3RyYWN0IGNsYXNzIGFuZCByZXR1cm5zIHRoZSBuYXRpdmUgRG9jdW1lbnQgb2JqZWN0LlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQnJvd3NlckRvY3VtZW50UmVmIGV4dGVuZHMgRG9jdW1lbnRSZWYge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIERvY3VtZW50IG9iamVjdFxuICAgKi9cbiAgZ2V0IG5hdGl2ZURvY3VtZW50KCk6IERvY3VtZW50IHwgT2JqZWN0IHtcbiAgICByZXR1cm4gZG9jdW1lbnQ7XG4gIH1cbn1cblxuLyoqXG4gKiBDcmVhdGUgYW4gZmFjdG9yeSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIG5hdGl2ZSBEb2N1bWVudCBvYmplY3QuXG4gKiBAcGFyYW0gYnJvd3NlckRvY3VtZW50UmVmIE5hdGl2ZSBEb2N1bWVudCBvYmplY3RcbiAqIEBwYXJhbSBwbGF0Zm9ybUlkIGlkIG9mIHBsYXRmb3JtXG4gKiBAcmV0dXJucyB0eXBlIG9mIHBsYXRmb3JtIG9mIGVtcHR5IG9iamVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gZG9jdW1lbnRGYWN0b3J5KFxuICBicm93c2VyRG9jdW1lbnRSZWY6IEJyb3dzZXJEb2N1bWVudFJlZixcbiAgcGxhdGZvcm1JZDogT2JqZWN0XG4pOiBEb2N1bWVudCB8IE9iamVjdCB7XG4gIGlmIChpc1BsYXRmb3JtQnJvd3NlcihwbGF0Zm9ybUlkKSkge1xuICAgIHJldHVybiBicm93c2VyRG9jdW1lbnRSZWYubmF0aXZlRG9jdW1lbnQ7XG4gIH1cbiAgY29uc3QgZG9jID0ge1xuICAgIGhpZGRlbjogZmFsc2UsXG4gICAgdmlzaWJpbGl0eVN0YXRlOiAndmlzaWJsZSdcbiAgfVxuICByZXR1cm4gZG9jO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIGluamVjdGFibGUgcHJvdmlkZXIgZm9yIHRoZSBEb2N1bWVudFJlZiB0b2tlbiB0aGF0IHVzZXMgdGhlIEJyb3dzZXJEb2N1bWVudFJlZiBjbGFzcy5cbiAqL1xuZXhwb3J0IGNvbnN0IGJyb3dzZXJEb2N1bWVudFByb3ZpZGVyOiBDbGFzc1Byb3ZpZGVyID0ge1xuICBwcm92aWRlOiBEb2N1bWVudFJlZixcbiAgdXNlQ2xhc3M6IEJyb3dzZXJEb2N1bWVudFJlZlxufTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gaW5qZWN0YWJsZSBwcm92aWRlciB0aGF0IHVzZXMgdGhlIERvY3VtZW50RmFjdG9yeSBmdW5jdGlvbiBmb3IgcmV0dXJuaW5nIHRoZSBuYXRpdmUgRG9jdW1lbnQgb2JqZWN0LlxuICovXG5leHBvcnQgY29uc3QgZG9jdW1lbnRQcm92aWRlcjogRmFjdG9yeVByb3ZpZGVyID0ge1xuICBwcm92aWRlOiBET0NVTUVOVCxcbiAgdXNlRmFjdG9yeTogZG9jdW1lbnRGYWN0b3J5LFxuICBkZXBzOiBbRG9jdW1lbnRSZWYsIFBMQVRGT1JNX0lEXVxufTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gYXJyYXkgb2YgcHJvdmlkZXJzLlxuICovXG5leHBvcnQgY29uc3QgRE9DVU1FTlRfUFJPVklERVJTID0gW2Jyb3dzZXJEb2N1bWVudFByb3ZpZGVyLCBkb2N1bWVudFByb3ZpZGVyXTtcbiJdfQ==