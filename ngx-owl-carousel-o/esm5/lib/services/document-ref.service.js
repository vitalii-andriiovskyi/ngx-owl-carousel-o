import { __decorate, __extends } from "tslib";
import { isPlatformBrowser } from '@angular/common';
import { InjectionToken, PLATFORM_ID, Injectable } from '@angular/core';
/**
 * Create a new injection token for injecting the Document into a component.
 */
export var DOCUMENT = new InjectionToken('DocumentToken');
/**
 * Define abstract class for obtaining reference to the global Document object.
 */
var DocumentRef = /** @class */ (function () {
    function DocumentRef() {
    }
    Object.defineProperty(DocumentRef.prototype, "nativeDocument", {
        get: function () {
            throw new Error('Not implemented.');
        },
        enumerable: true,
        configurable: true
    });
    return DocumentRef;
}());
export { DocumentRef };
/**
 * Define class that implements the abstract class and returns the native Document object.
 */
var BrowserDocumentRef = /** @class */ (function (_super) {
    __extends(BrowserDocumentRef, _super);
    function BrowserDocumentRef() {
        return _super.call(this) || this;
    }
    Object.defineProperty(BrowserDocumentRef.prototype, "nativeDocument", {
        /**
         * @returns Document object
         */
        get: function () {
            return document;
        },
        enumerable: true,
        configurable: true
    });
    BrowserDocumentRef = __decorate([
        Injectable()
    ], BrowserDocumentRef);
    return BrowserDocumentRef;
}(DocumentRef));
export { BrowserDocumentRef };
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
    var doc = {
        hidden: false,
        visibilityState: 'visible'
    };
    return doc;
}
/**
 * Create a injectable provider for the DocumentRef token that uses the BrowserDocumentRef class.
 */
export var browserDocumentProvider = {
    provide: DocumentRef,
    useClass: BrowserDocumentRef
};
/**
 * Create an injectable provider that uses the DocumentFactory function for returning the native Document object.
 */
export var documentProvider = {
    provide: DOCUMENT,
    useFactory: documentFactory,
    deps: [DocumentRef, PLATFORM_ID]
};
/**
 * Create an array of providers.
 */
export var DOCUMENT_PROVIDERS = [browserDocumentProvider, documentProvider];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jdW1lbnQtcmVmLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvZG9jdW1lbnQtcmVmLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFBa0MsY0FBYyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFeEc7O0dBRUc7QUFDSCxNQUFNLENBQUMsSUFBTSxRQUFRLEdBQUcsSUFBSSxjQUFjLENBQVcsZUFBZSxDQUFDLENBQUM7QUFDdEU7O0dBRUc7QUFDSDtJQUFBO0lBSUEsQ0FBQztJQUhDLHNCQUFJLHVDQUFjO2FBQWxCO1lBQ0UsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7OztPQUFBO0lBQ0gsa0JBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQzs7QUFFRDs7R0FFRztBQUVIO0lBQXdDLHNDQUFXO0lBQ2pEO2VBQ0UsaUJBQU87SUFDVCxDQUFDO0lBS0Qsc0JBQUksOENBQWM7UUFIbEI7O1dBRUc7YUFDSDtZQUNFLE9BQU8sUUFBUSxDQUFDO1FBQ2xCLENBQUM7OztPQUFBO0lBVlUsa0JBQWtCO1FBRDlCLFVBQVUsRUFBRTtPQUNBLGtCQUFrQixDQVc5QjtJQUFELHlCQUFDO0NBQUEsQUFYRCxDQUF3QyxXQUFXLEdBV2xEO1NBWFksa0JBQWtCO0FBYS9COzs7OztHQUtHO0FBQ0gsTUFBTSxVQUFVLGVBQWUsQ0FDN0Isa0JBQXNDLEVBQ3RDLFVBQWtCO0lBRWxCLElBQUksaUJBQWlCLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDakMsT0FBTyxrQkFBa0IsQ0FBQyxjQUFjLENBQUM7S0FDMUM7SUFDRCxJQUFNLEdBQUcsR0FBRztRQUNWLE1BQU0sRUFBRSxLQUFLO1FBQ2IsZUFBZSxFQUFFLFNBQVM7S0FDM0IsQ0FBQTtJQUNELE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQUVEOztHQUVHO0FBQ0gsTUFBTSxDQUFDLElBQU0sdUJBQXVCLEdBQWtCO0lBQ3BELE9BQU8sRUFBRSxXQUFXO0lBQ3BCLFFBQVEsRUFBRSxrQkFBa0I7Q0FDN0IsQ0FBQztBQUVGOztHQUVHO0FBQ0gsTUFBTSxDQUFDLElBQU0sZ0JBQWdCLEdBQW9CO0lBQy9DLE9BQU8sRUFBRSxRQUFRO0lBQ2pCLFVBQVUsRUFBRSxlQUFlO0lBQzNCLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUM7Q0FDakMsQ0FBQztBQUVGOztHQUVHO0FBQ0gsTUFBTSxDQUFDLElBQU0sa0JBQWtCLEdBQUcsQ0FBQyx1QkFBdUIsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ2xhc3NQcm92aWRlciwgRmFjdG9yeVByb3ZpZGVyLCBJbmplY3Rpb25Ub2tlbiwgUExBVEZPUk1fSUQsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgaW5qZWN0aW9uIHRva2VuIGZvciBpbmplY3RpbmcgdGhlIERvY3VtZW50IGludG8gYSBjb21wb25lbnQuXG4gKi9cbmV4cG9ydCBjb25zdCBET0NVTUVOVCA9IG5ldyBJbmplY3Rpb25Ub2tlbjxEb2N1bWVudD4oJ0RvY3VtZW50VG9rZW4nKTtcbi8qKlxuICogRGVmaW5lIGFic3RyYWN0IGNsYXNzIGZvciBvYnRhaW5pbmcgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgRG9jdW1lbnQgb2JqZWN0LlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRG9jdW1lbnRSZWYge1xuICBnZXQgbmF0aXZlRG9jdW1lbnQoKTogRG9jdW1lbnQgfCBPYmplY3Qge1xuICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkLicpO1xuICB9XG59XG5cbi8qKlxuICogRGVmaW5lIGNsYXNzIHRoYXQgaW1wbGVtZW50cyB0aGUgYWJzdHJhY3QgY2xhc3MgYW5kIHJldHVybnMgdGhlIG5hdGl2ZSBEb2N1bWVudCBvYmplY3QuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBCcm93c2VyRG9jdW1lbnRSZWYgZXh0ZW5kcyBEb2N1bWVudFJlZiB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMgRG9jdW1lbnQgb2JqZWN0XG4gICAqL1xuICBnZXQgbmF0aXZlRG9jdW1lbnQoKTogRG9jdW1lbnQgfCBPYmplY3Qge1xuICAgIHJldHVybiBkb2N1bWVudDtcbiAgfVxufVxuXG4vKipcbiAqIENyZWF0ZSBhbiBmYWN0b3J5IGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgbmF0aXZlIERvY3VtZW50IG9iamVjdC5cbiAqIEBwYXJhbSBicm93c2VyRG9jdW1lbnRSZWYgTmF0aXZlIERvY3VtZW50IG9iamVjdFxuICogQHBhcmFtIHBsYXRmb3JtSWQgaWQgb2YgcGxhdGZvcm1cbiAqIEByZXR1cm5zIHR5cGUgb2YgcGxhdGZvcm0gb2YgZW1wdHkgb2JqZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkb2N1bWVudEZhY3RvcnkoXG4gIGJyb3dzZXJEb2N1bWVudFJlZjogQnJvd3NlckRvY3VtZW50UmVmLFxuICBwbGF0Zm9ybUlkOiBPYmplY3Rcbik6IERvY3VtZW50IHwgT2JqZWN0IHtcbiAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHBsYXRmb3JtSWQpKSB7XG4gICAgcmV0dXJuIGJyb3dzZXJEb2N1bWVudFJlZi5uYXRpdmVEb2N1bWVudDtcbiAgfVxuICBjb25zdCBkb2MgPSB7XG4gICAgaGlkZGVuOiBmYWxzZSxcbiAgICB2aXNpYmlsaXR5U3RhdGU6ICd2aXNpYmxlJ1xuICB9XG4gIHJldHVybiBkb2M7XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgaW5qZWN0YWJsZSBwcm92aWRlciBmb3IgdGhlIERvY3VtZW50UmVmIHRva2VuIHRoYXQgdXNlcyB0aGUgQnJvd3NlckRvY3VtZW50UmVmIGNsYXNzLlxuICovXG5leHBvcnQgY29uc3QgYnJvd3NlckRvY3VtZW50UHJvdmlkZXI6IENsYXNzUHJvdmlkZXIgPSB7XG4gIHByb3ZpZGU6IERvY3VtZW50UmVmLFxuICB1c2VDbGFzczogQnJvd3NlckRvY3VtZW50UmVmXG59O1xuXG4vKipcbiAqIENyZWF0ZSBhbiBpbmplY3RhYmxlIHByb3ZpZGVyIHRoYXQgdXNlcyB0aGUgRG9jdW1lbnRGYWN0b3J5IGZ1bmN0aW9uIGZvciByZXR1cm5pbmcgdGhlIG5hdGl2ZSBEb2N1bWVudCBvYmplY3QuXG4gKi9cbmV4cG9ydCBjb25zdCBkb2N1bWVudFByb3ZpZGVyOiBGYWN0b3J5UHJvdmlkZXIgPSB7XG4gIHByb3ZpZGU6IERPQ1VNRU5ULFxuICB1c2VGYWN0b3J5OiBkb2N1bWVudEZhY3RvcnksXG4gIGRlcHM6IFtEb2N1bWVudFJlZiwgUExBVEZPUk1fSURdXG59O1xuXG4vKipcbiAqIENyZWF0ZSBhbiBhcnJheSBvZiBwcm92aWRlcnMuXG4gKi9cbmV4cG9ydCBjb25zdCBET0NVTUVOVF9QUk9WSURFUlMgPSBbYnJvd3NlckRvY3VtZW50UHJvdmlkZXIsIGRvY3VtZW50UHJvdmlkZXJdO1xuIl19