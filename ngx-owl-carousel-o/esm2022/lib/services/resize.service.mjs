import { Subject, fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { WINDOW } from './window-ref.service';
import { DOCUMENT } from './document-ref.service';
import * as i0 from "@angular/core";
class ResizeService {
    resizeObservable$;
    docRef;
    /**
     * Makes resizeSubject become Observable
     * @returns Observable of resizeSubject
     */
    get onResize$() {
        return this.resizeObservable$.pipe(filter(() => !this.docRef?.fullscreenElement));
    }
    constructor(winRef, docRef, platformId) {
        this.docRef = docRef;
        this.resizeObservable$ = isPlatformBrowser(platformId)
            ? fromEvent(winRef, 'resize')
            : (new Subject()).asObservable();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: ResizeService, deps: [{ token: WINDOW }, { token: DOCUMENT }, { token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: ResizeService });
}
export { ResizeService };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: ResizeService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [WINDOW]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXplLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWJzL25neC1vd2wtY2Fyb3VzZWwtby9zcmMvbGliL3NlcnZpY2VzL3Jlc2l6ZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBYyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QyxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDcEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7QUFFbEQsTUFDYSxhQUFhO0lBQ2hCLGlCQUFpQixDQUFvQjtJQUNyQyxNQUFNLENBQVc7SUFFekI7OztPQUdHO0lBQ0gsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUNoQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLGlCQUFpQixDQUFDLENBQzlDLENBQUM7SUFDSixDQUFDO0lBRUQsWUFBNEIsTUFBVyxFQUFvQixNQUFXLEVBQXVCLFVBQWtCO1FBQzdHLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBa0IsQ0FBQztRQUNqQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUMsVUFBVSxDQUFDO1lBQ3BELENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQztZQUM3QixDQUFDLENBQUMsQ0FBQyxJQUFJLE9BQU8sRUFBUyxDQUFDLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDNUMsQ0FBQzt1R0FuQlUsYUFBYSxrQkFjSixNQUFNLGFBQXVCLFFBQVEsYUFBdUIsV0FBVzsyR0FkaEYsYUFBYTs7U0FBYixhQUFhOzJGQUFiLGFBQWE7a0JBRHpCLFVBQVU7OzBCQWVJLE1BQU07MkJBQUMsTUFBTTs7MEJBQWdCLE1BQU07MkJBQUMsUUFBUTs7MEJBQWdCLE1BQU07MkJBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QsIGZyb21FdmVudCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIFBMQVRGT1JNX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBXSU5ET1cgfSBmcm9tICcuL3dpbmRvdy1yZWYuc2VydmljZSc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJy4vZG9jdW1lbnQtcmVmLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUmVzaXplU2VydmljZSB7XG4gIHByaXZhdGUgcmVzaXplT2JzZXJ2YWJsZSQ6IE9ic2VydmFibGU8RXZlbnQ+O1xuICBwcml2YXRlIGRvY1JlZjogRG9jdW1lbnQ7XG5cbiAgLyoqXG4gICAqIE1ha2VzIHJlc2l6ZVN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiByZXNpemVTdWJqZWN0XG4gICAqL1xuICBnZXQgb25SZXNpemUkKCk6IE9ic2VydmFibGU8RXZlbnQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXNpemVPYnNlcnZhYmxlJC5waXBlKFxuICAgICAgZmlsdGVyKCgpID0+ICF0aGlzLmRvY1JlZj8uZnVsbHNjcmVlbkVsZW1lbnQpXG4gICAgKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoV0lORE9XKSB3aW5SZWY6IGFueSwgQEluamVjdChET0NVTUVOVCkgZG9jUmVmOiBhbnksIEBJbmplY3QoUExBVEZPUk1fSUQpIHBsYXRmb3JtSWQ6IE9iamVjdCkge1xuICAgIHRoaXMuZG9jUmVmID0gZG9jUmVmIGFzIERvY3VtZW50O1xuICAgIHRoaXMucmVzaXplT2JzZXJ2YWJsZSQgPSBpc1BsYXRmb3JtQnJvd3NlcihwbGF0Zm9ybUlkKVxuICAgICAgPyBmcm9tRXZlbnQod2luUmVmLCAncmVzaXplJylcbiAgICAgIDogKG5ldyBTdWJqZWN0PEV2ZW50PigpKS5hc09ic2VydmFibGUoKTtcbiAgfVxufVxuIl19