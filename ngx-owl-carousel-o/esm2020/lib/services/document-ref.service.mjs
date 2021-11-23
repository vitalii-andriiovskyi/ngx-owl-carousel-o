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
export class BrowserDocumentRef extends DocumentRef {
    constructor() {
        super();
    }
    /**
     * @returns Document object
     */
    get nativeDocument() {
        return document;
    }
}
BrowserDocumentRef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: BrowserDocumentRef, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
BrowserDocumentRef.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: BrowserDocumentRef });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: BrowserDocumentRef, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jdW1lbnQtcmVmLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWJzL25neC1vd2wtY2Fyb3VzZWwtby9zcmMvbGliL3NlcnZpY2VzL2RvY3VtZW50LXJlZi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFBa0MsY0FBYyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBRXhHOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sUUFBUSxHQUFHLElBQUksY0FBYyxDQUFXLGVBQWUsQ0FBQyxDQUFDO0FBQ3RFOztHQUVHO0FBQ0gsTUFBTSxPQUFnQixXQUFXO0lBQy9CLElBQUksY0FBYztRQUNoQixNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDdEMsQ0FBQztDQUNGO0FBRUQ7O0dBRUc7QUFFSCxNQUFNLE9BQU8sa0JBQW1CLFNBQVEsV0FBVztJQUNqRDtRQUNFLEtBQUssRUFBRSxDQUFDO0lBQ1YsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBSSxjQUFjO1FBQ2hCLE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7OytHQVZVLGtCQUFrQjttSEFBbEIsa0JBQWtCOzJGQUFsQixrQkFBa0I7a0JBRDlCLFVBQVU7O0FBY1g7Ozs7O0dBS0c7QUFDSCxNQUFNLFVBQVUsZUFBZSxDQUM3QixrQkFBc0MsRUFDdEMsVUFBa0I7SUFFbEIsSUFBSSxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUNqQyxPQUFPLGtCQUFrQixDQUFDLGNBQWMsQ0FBQztLQUMxQztJQUNELE1BQU0sR0FBRyxHQUFHO1FBQ1YsTUFBTSxFQUFFLEtBQUs7UUFDYixlQUFlLEVBQUUsU0FBUztLQUMzQixDQUFBO0lBQ0QsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSx1QkFBdUIsR0FBa0I7SUFDcEQsT0FBTyxFQUFFLFdBQVc7SUFDcEIsUUFBUSxFQUFFLGtCQUFrQjtDQUM3QixDQUFDO0FBRUY7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSxnQkFBZ0IsR0FBb0I7SUFDL0MsT0FBTyxFQUFFLFFBQVE7SUFDakIsVUFBVSxFQUFFLGVBQWU7SUFDM0IsSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQztDQUNqQyxDQUFDO0FBRUY7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSxrQkFBa0IsR0FBRyxDQUFDLHVCQUF1QixFQUFFLGdCQUFnQixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDbGFzc1Byb3ZpZGVyLCBGYWN0b3J5UHJvdmlkZXIsIEluamVjdGlvblRva2VuLCBQTEFURk9STV9JRCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBpbmplY3Rpb24gdG9rZW4gZm9yIGluamVjdGluZyB0aGUgRG9jdW1lbnQgaW50byBhIGNvbXBvbmVudC5cbiAqL1xuZXhwb3J0IGNvbnN0IERPQ1VNRU5UID0gbmV3IEluamVjdGlvblRva2VuPERvY3VtZW50PignRG9jdW1lbnRUb2tlbicpO1xuLyoqXG4gKiBEZWZpbmUgYWJzdHJhY3QgY2xhc3MgZm9yIG9idGFpbmluZyByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBEb2N1bWVudCBvYmplY3QuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBEb2N1bWVudFJlZiB7XG4gIGdldCBuYXRpdmVEb2N1bWVudCgpOiBEb2N1bWVudCB8IE9iamVjdCB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQuJyk7XG4gIH1cbn1cblxuLyoqXG4gKiBEZWZpbmUgY2xhc3MgdGhhdCBpbXBsZW1lbnRzIHRoZSBhYnN0cmFjdCBjbGFzcyBhbmQgcmV0dXJucyB0aGUgbmF0aXZlIERvY3VtZW50IG9iamVjdC5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEJyb3dzZXJEb2N1bWVudFJlZiBleHRlbmRzIERvY3VtZW50UmVmIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyBEb2N1bWVudCBvYmplY3RcbiAgICovXG4gIGdldCBuYXRpdmVEb2N1bWVudCgpOiBEb2N1bWVudCB8IE9iamVjdCB7XG4gICAgcmV0dXJuIGRvY3VtZW50O1xuICB9XG59XG5cbi8qKlxuICogQ3JlYXRlIGFuIGZhY3RvcnkgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBuYXRpdmUgRG9jdW1lbnQgb2JqZWN0LlxuICogQHBhcmFtIGJyb3dzZXJEb2N1bWVudFJlZiBOYXRpdmUgRG9jdW1lbnQgb2JqZWN0XG4gKiBAcGFyYW0gcGxhdGZvcm1JZCBpZCBvZiBwbGF0Zm9ybVxuICogQHJldHVybnMgdHlwZSBvZiBwbGF0Zm9ybSBvZiBlbXB0eSBvYmplY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRvY3VtZW50RmFjdG9yeShcbiAgYnJvd3NlckRvY3VtZW50UmVmOiBCcm93c2VyRG9jdW1lbnRSZWYsXG4gIHBsYXRmb3JtSWQ6IE9iamVjdFxuKTogRG9jdW1lbnQgfCBPYmplY3Qge1xuICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIocGxhdGZvcm1JZCkpIHtcbiAgICByZXR1cm4gYnJvd3NlckRvY3VtZW50UmVmLm5hdGl2ZURvY3VtZW50O1xuICB9XG4gIGNvbnN0IGRvYyA9IHtcbiAgICBoaWRkZW46IGZhbHNlLFxuICAgIHZpc2liaWxpdHlTdGF0ZTogJ3Zpc2libGUnXG4gIH1cbiAgcmV0dXJuIGRvYztcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBpbmplY3RhYmxlIHByb3ZpZGVyIGZvciB0aGUgRG9jdW1lbnRSZWYgdG9rZW4gdGhhdCB1c2VzIHRoZSBCcm93c2VyRG9jdW1lbnRSZWYgY2xhc3MuXG4gKi9cbmV4cG9ydCBjb25zdCBicm93c2VyRG9jdW1lbnRQcm92aWRlcjogQ2xhc3NQcm92aWRlciA9IHtcbiAgcHJvdmlkZTogRG9jdW1lbnRSZWYsXG4gIHVzZUNsYXNzOiBCcm93c2VyRG9jdW1lbnRSZWZcbn07XG5cbi8qKlxuICogQ3JlYXRlIGFuIGluamVjdGFibGUgcHJvdmlkZXIgdGhhdCB1c2VzIHRoZSBEb2N1bWVudEZhY3RvcnkgZnVuY3Rpb24gZm9yIHJldHVybmluZyB0aGUgbmF0aXZlIERvY3VtZW50IG9iamVjdC5cbiAqL1xuZXhwb3J0IGNvbnN0IGRvY3VtZW50UHJvdmlkZXI6IEZhY3RvcnlQcm92aWRlciA9IHtcbiAgcHJvdmlkZTogRE9DVU1FTlQsXG4gIHVzZUZhY3Rvcnk6IGRvY3VtZW50RmFjdG9yeSxcbiAgZGVwczogW0RvY3VtZW50UmVmLCBQTEFURk9STV9JRF1cbn07XG5cbi8qKlxuICogQ3JlYXRlIGFuIGFycmF5IG9mIHByb3ZpZGVycy5cbiAqL1xuZXhwb3J0IGNvbnN0IERPQ1VNRU5UX1BST1ZJREVSUyA9IFticm93c2VyRG9jdW1lbnRQcm92aWRlciwgZG9jdW1lbnRQcm92aWRlcl07XG4iXX0=