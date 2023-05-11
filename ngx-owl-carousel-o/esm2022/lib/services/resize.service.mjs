import { Subject, fromEvent } from 'rxjs';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { WINDOW } from './window-ref.service';
import { isPlatformBrowser } from '@angular/common';
import * as i0 from "@angular/core";
class ResizeService {
    resizeObservable$;
    /**
     * Makes resizeSubject become Observable
     * @returns Observable of resizeSubject
     */
    get onResize$() {
        return this.resizeObservable$;
    }
    constructor(winRef, platformId) {
        this.resizeObservable$ = isPlatformBrowser(platformId) ? fromEvent(winRef, 'resize') : (new Subject()).asObservable();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: ResizeService, deps: [{ token: WINDOW }, { token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: ResizeService });
}
export { ResizeService };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: ResizeService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [WINDOW]
                }] }, { type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXplLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWJzL25neC1vd2wtY2Fyb3VzZWwtby9zcmMvbGliL3NlcnZpY2VzL3Jlc2l6ZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBYyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDOUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBRXBELE1BQ2EsYUFBYTtJQUNoQixpQkFBaUIsQ0FBb0I7SUFFN0M7OztPQUdHO0lBQ0gsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDaEMsQ0FBQztJQUVELFlBQTRCLE1BQVcsRUFBdUIsVUFBa0I7UUFDOUUsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTyxFQUFTLENBQUMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMvSCxDQUFDO3VHQWJVLGFBQWEsa0JBV0osTUFBTSxhQUF1QixXQUFXOzJHQVhqRCxhQUFhOztTQUFiLGFBQWE7MkZBQWIsYUFBYTtrQkFEekIsVUFBVTs7MEJBWUksTUFBTTsyQkFBQyxNQUFNOzswQkFBZ0IsTUFBTTsyQkFBQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCwgZnJvbUV2ZW50IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIFBMQVRGT1JNX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBXSU5ET1cgfSBmcm9tICcuL3dpbmRvdy1yZWYuc2VydmljZSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBSZXNpemVTZXJ2aWNlIHtcbiAgcHJpdmF0ZSByZXNpemVPYnNlcnZhYmxlJDogT2JzZXJ2YWJsZTxFdmVudD47XG5cbiAgLyoqXG4gICAqIE1ha2VzIHJlc2l6ZVN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiByZXNpemVTdWJqZWN0XG4gICAqL1xuICBnZXQgb25SZXNpemUkKCk6IE9ic2VydmFibGU8RXZlbnQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXNpemVPYnNlcnZhYmxlJDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoV0lORE9XKSB3aW5SZWY6IGFueSwgQEluamVjdChQTEFURk9STV9JRCkgcGxhdGZvcm1JZDogT2JqZWN0KSB7XG4gICAgdGhpcy5yZXNpemVPYnNlcnZhYmxlJCA9IGlzUGxhdGZvcm1Ccm93c2VyKHBsYXRmb3JtSWQpID8gZnJvbUV2ZW50KHdpblJlZiwgJ3Jlc2l6ZScpIDogKG5ldyBTdWJqZWN0PEV2ZW50PigpKS5hc09ic2VydmFibGUoKTtcbiAgfVxufVxuIl19