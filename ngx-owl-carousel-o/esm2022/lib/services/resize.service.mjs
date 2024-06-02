import { Subject, fromEvent } from 'rxjs';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { WINDOW } from './window-ref.service';
import { isPlatformBrowser } from '@angular/common';
import * as i0 from "@angular/core";
export class ResizeService {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: ResizeService, deps: [{ token: WINDOW }, { token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: ResizeService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: ResizeService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [WINDOW]
                }] }, { type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXplLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWJzL25neC1vd2wtY2Fyb3VzZWwtby9zcmMvbGliL3NlcnZpY2VzL3Jlc2l6ZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBYyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDOUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBR3BELE1BQU0sT0FBTyxhQUFhO0lBQ2hCLGlCQUFpQixDQUFvQjtJQUU3Qzs7O09BR0c7SUFDSCxJQUFJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUNoQyxDQUFDO0lBRUQsWUFBNEIsTUFBVyxFQUF1QixVQUFrQjtRQUM5RSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxPQUFPLEVBQVMsQ0FBQyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQy9ILENBQUM7dUdBYlUsYUFBYSxrQkFXSixNQUFNLGFBQXVCLFdBQVc7MkdBWGpELGFBQWE7OzJGQUFiLGFBQWE7a0JBRHpCLFVBQVU7OzBCQVlJLE1BQU07MkJBQUMsTUFBTTs7MEJBQWdCLE1BQU07MkJBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QsIGZyb21FdmVudCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBQTEFURk9STV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgV0lORE9XIH0gZnJvbSAnLi93aW5kb3ctcmVmLnNlcnZpY2UnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUmVzaXplU2VydmljZSB7XG4gIHByaXZhdGUgcmVzaXplT2JzZXJ2YWJsZSQ6IE9ic2VydmFibGU8RXZlbnQ+O1xuXG4gIC8qKlxuICAgKiBNYWtlcyByZXNpemVTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgcmVzaXplU3ViamVjdFxuICAgKi9cbiAgZ2V0IG9uUmVzaXplJCgpOiBPYnNlcnZhYmxlPEV2ZW50PiB7XG4gICAgcmV0dXJuIHRoaXMucmVzaXplT2JzZXJ2YWJsZSQ7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KFdJTkRPVykgd2luUmVmOiBhbnksIEBJbmplY3QoUExBVEZPUk1fSUQpIHBsYXRmb3JtSWQ6IE9iamVjdCkge1xuICAgIHRoaXMucmVzaXplT2JzZXJ2YWJsZSQgPSBpc1BsYXRmb3JtQnJvd3NlcihwbGF0Zm9ybUlkKSA/IGZyb21FdmVudCh3aW5SZWYsICdyZXNpemUnKSA6IChuZXcgU3ViamVjdDxFdmVudD4oKSkuYXNPYnNlcnZhYmxlKCk7XG4gIH1cbn1cbiJdfQ==