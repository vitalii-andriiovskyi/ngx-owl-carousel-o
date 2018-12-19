/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { isPlatformBrowser } from '@angular/common';
import { InjectionToken, PLATFORM_ID, } from '@angular/core';
/**
 * Create a new injection token for injecting the Document into a component.
 * @type {?}
 */
export const DOCUMENT = new InjectionToken('DocumentToken');
/**
 * Define abstract class for obtaining reference to the global Document object.
 * @abstract
 */
export class DocumentRef {
    /**
     * @return {?}
     */
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
     * @return {?} Document object
     */
    get nativeDocument() {
        return document;
    }
}
/**
 * Create an factory function that returns the native Document object.
 * @param {?} browserDocumentRef Native Document object
 * @param {?} platformId id of platform
 * @return {?} type of platform of empty object
 */
export function documentFactory(browserDocumentRef, platformId) {
    if (isPlatformBrowser(platformId)) {
        return browserDocumentRef.nativeDocument;
    }
    /** @type {?} */
    const doc = {
        hidden: false
    };
    return doc;
}
/**
 * Create a injectable provider for the DocumentRef token that uses the BrowserDocumentRef class.
 * @type {?}
 */
export const browserDocumentProvider = {
    provide: DocumentRef,
    useClass: BrowserDocumentRef
};
/**
 * Create an injectable provider that uses the DocumentFactory function for returning the native Document object.
 * @type {?}
 */
export const documentProvider = {
    provide: DOCUMENT,
    useFactory: documentFactory,
    deps: [DocumentRef, PLATFORM_ID]
};
/**
 * Create an array of providers.
 * @type {?}
 */
export const DOCUMENT_PROVIDERS = [browserDocumentProvider, documentProvider];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jdW1lbnQtcmVmLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvZG9jdW1lbnQtcmVmLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFHTCxjQUFjLEVBQ2QsV0FBVyxHQUNaLE1BQU0sZUFBZSxDQUFDOzs7OztBQUt2QixNQUFNLE9BQU8sUUFBUSxHQUFHLElBQUksY0FBYyxDQUFXLGVBQWUsQ0FBQzs7Ozs7QUFJckUsTUFBTSxPQUFnQixXQUFXOzs7O0lBQy9CLElBQUksY0FBYztRQUNoQixNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDdEMsQ0FBQztDQUNGOzs7O0FBS0QsTUFBTSxPQUFPLGtCQUFtQixTQUFRLFdBQVc7SUFDakQ7UUFDRSxLQUFLLEVBQUUsQ0FBQztJQUNWLENBQUM7Ozs7SUFLRCxJQUFJLGNBQWM7UUFDaEIsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztDQUNGOzs7Ozs7O0FBUUQsTUFBTSxVQUFVLGVBQWUsQ0FDN0Isa0JBQXNDLEVBQ3RDLFVBQWtCO0lBRWxCLElBQUksaUJBQWlCLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDakMsT0FBTyxrQkFBa0IsQ0FBQyxjQUFjLENBQUM7S0FDMUM7O1VBQ0ssR0FBRyxHQUFHO1FBQ1YsTUFBTSxFQUFFLEtBQUs7S0FDZDtJQUNELE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQzs7Ozs7QUFLRCxNQUFNLE9BQU8sdUJBQXVCLEdBQWtCO0lBQ3BELE9BQU8sRUFBRSxXQUFXO0lBQ3BCLFFBQVEsRUFBRSxrQkFBa0I7Q0FDN0I7Ozs7O0FBS0QsTUFBTSxPQUFPLGdCQUFnQixHQUFvQjtJQUMvQyxPQUFPLEVBQUUsUUFBUTtJQUNqQixVQUFVLEVBQUUsZUFBZTtJQUMzQixJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDO0NBQ2pDOzs7OztBQUtELE1BQU0sT0FBTyxrQkFBa0IsR0FBRyxDQUFDLHVCQUF1QixFQUFFLGdCQUFnQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge1xyXG4gIENsYXNzUHJvdmlkZXIsXHJcbiAgRmFjdG9yeVByb3ZpZGVyLFxyXG4gIEluamVjdGlvblRva2VuLFxyXG4gIFBMQVRGT1JNX0lELFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhIG5ldyBpbmplY3Rpb24gdG9rZW4gZm9yIGluamVjdGluZyB0aGUgRG9jdW1lbnQgaW50byBhIGNvbXBvbmVudC5cclxuICovXHJcbmV4cG9ydCBjb25zdCBET0NVTUVOVCA9IG5ldyBJbmplY3Rpb25Ub2tlbjxEb2N1bWVudD4oJ0RvY3VtZW50VG9rZW4nKTtcclxuLyoqXHJcbiAqIERlZmluZSBhYnN0cmFjdCBjbGFzcyBmb3Igb2J0YWluaW5nIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIERvY3VtZW50IG9iamVjdC5cclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBEb2N1bWVudFJlZiB7XHJcbiAgZ2V0IG5hdGl2ZURvY3VtZW50KCk6IERvY3VtZW50IHwgT2JqZWN0IHtcclxuICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkLicpO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIERlZmluZSBjbGFzcyB0aGF0IGltcGxlbWVudHMgdGhlIGFic3RyYWN0IGNsYXNzIGFuZCByZXR1cm5zIHRoZSBuYXRpdmUgRG9jdW1lbnQgb2JqZWN0LlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEJyb3dzZXJEb2N1bWVudFJlZiBleHRlbmRzIERvY3VtZW50UmVmIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcmV0dXJucyBEb2N1bWVudCBvYmplY3RcclxuICAgKi9cclxuICBnZXQgbmF0aXZlRG9jdW1lbnQoKTogRG9jdW1lbnQgfCBPYmplY3Qge1xyXG4gICAgcmV0dXJuIGRvY3VtZW50O1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhbiBmYWN0b3J5IGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgbmF0aXZlIERvY3VtZW50IG9iamVjdC5cclxuICogQHBhcmFtIGJyb3dzZXJEb2N1bWVudFJlZiBOYXRpdmUgRG9jdW1lbnQgb2JqZWN0XHJcbiAqIEBwYXJhbSBwbGF0Zm9ybUlkIGlkIG9mIHBsYXRmb3JtXHJcbiAqIEByZXR1cm5zIHR5cGUgb2YgcGxhdGZvcm0gb2YgZW1wdHkgb2JqZWN0XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZG9jdW1lbnRGYWN0b3J5KFxyXG4gIGJyb3dzZXJEb2N1bWVudFJlZjogQnJvd3NlckRvY3VtZW50UmVmLFxyXG4gIHBsYXRmb3JtSWQ6IE9iamVjdFxyXG4pOiBEb2N1bWVudCB8IE9iamVjdCB7XHJcbiAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHBsYXRmb3JtSWQpKSB7XHJcbiAgICByZXR1cm4gYnJvd3NlckRvY3VtZW50UmVmLm5hdGl2ZURvY3VtZW50O1xyXG4gIH1cclxuICBjb25zdCBkb2MgPSB7XHJcbiAgICBoaWRkZW46IGZhbHNlXHJcbiAgfVxyXG4gIHJldHVybiBkb2M7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYSBpbmplY3RhYmxlIHByb3ZpZGVyIGZvciB0aGUgRG9jdW1lbnRSZWYgdG9rZW4gdGhhdCB1c2VzIHRoZSBCcm93c2VyRG9jdW1lbnRSZWYgY2xhc3MuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgYnJvd3NlckRvY3VtZW50UHJvdmlkZXI6IENsYXNzUHJvdmlkZXIgPSB7XHJcbiAgcHJvdmlkZTogRG9jdW1lbnRSZWYsXHJcbiAgdXNlQ2xhc3M6IEJyb3dzZXJEb2N1bWVudFJlZlxyXG59O1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhbiBpbmplY3RhYmxlIHByb3ZpZGVyIHRoYXQgdXNlcyB0aGUgRG9jdW1lbnRGYWN0b3J5IGZ1bmN0aW9uIGZvciByZXR1cm5pbmcgdGhlIG5hdGl2ZSBEb2N1bWVudCBvYmplY3QuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZG9jdW1lbnRQcm92aWRlcjogRmFjdG9yeVByb3ZpZGVyID0ge1xyXG4gIHByb3ZpZGU6IERPQ1VNRU5ULFxyXG4gIHVzZUZhY3Rvcnk6IGRvY3VtZW50RmFjdG9yeSxcclxuICBkZXBzOiBbRG9jdW1lbnRSZWYsIFBMQVRGT1JNX0lEXVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhbiBhcnJheSBvZiBwcm92aWRlcnMuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgRE9DVU1FTlRfUFJPVklERVJTID0gW2Jyb3dzZXJEb2N1bWVudFByb3ZpZGVyLCBkb2N1bWVudFByb3ZpZGVyXTtcclxuIl19