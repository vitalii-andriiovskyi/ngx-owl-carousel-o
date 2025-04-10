import { Subject, fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { WINDOW } from './window-ref.service';
import { DOCUMENT } from './document-ref.service';
import * as i0 from "@angular/core";
export class ResizeService {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: ResizeService, deps: [{ token: WINDOW }, { token: DOCUMENT }, { token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: ResizeService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: ResizeService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [WINDOW]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXplLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWJzL25neC1vd2wtY2Fyb3VzZWwtby9zcmMvbGliL3NlcnZpY2VzL3Jlc2l6ZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBYyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QyxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDcEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7QUFHbEQsTUFBTSxPQUFPLGFBQWE7SUFDaEIsaUJBQWlCLENBQW9CO0lBQ3JDLE1BQU0sQ0FBVztJQUV6Qjs7O09BR0c7SUFDSCxJQUFJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQ2hDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsaUJBQWlCLENBQUMsQ0FDOUMsQ0FBQztJQUNKLENBQUM7SUFFRCxZQUE0QixNQUFXLEVBQW9CLE1BQVcsRUFBdUIsVUFBa0I7UUFDN0csSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFrQixDQUFDO1FBQ2pDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQyxVQUFVLENBQUM7WUFDcEQsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDO1lBQzdCLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTyxFQUFTLENBQUMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUM1QyxDQUFDO3VHQW5CVSxhQUFhLGtCQWNKLE1BQU0sYUFBdUIsUUFBUSxhQUF1QixXQUFXOzJHQWRoRixhQUFhOzsyRkFBYixhQUFhO2tCQUR6QixVQUFVOzswQkFlSSxNQUFNOzJCQUFDLE1BQU07OzBCQUFnQixNQUFNOzJCQUFDLFFBQVE7OzBCQUFnQixNQUFNOzJCQUFDLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0LCBmcm9tRXZlbnQgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBQTEFURk9STV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgV0lORE9XIH0gZnJvbSAnLi93aW5kb3ctcmVmLnNlcnZpY2UnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICcuL2RvY3VtZW50LXJlZi5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJlc2l6ZVNlcnZpY2Uge1xuICBwcml2YXRlIHJlc2l6ZU9ic2VydmFibGUkOiBPYnNlcnZhYmxlPEV2ZW50PjtcbiAgcHJpdmF0ZSBkb2NSZWY6IERvY3VtZW50O1xuXG4gIC8qKlxuICAgKiBNYWtlcyByZXNpemVTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgcmVzaXplU3ViamVjdFxuICAgKi9cbiAgZ2V0IG9uUmVzaXplJCgpOiBPYnNlcnZhYmxlPEV2ZW50PiB7XG4gICAgcmV0dXJuIHRoaXMucmVzaXplT2JzZXJ2YWJsZSQucGlwZShcbiAgICAgIGZpbHRlcigoKSA9PiAhdGhpcy5kb2NSZWY/LmZ1bGxzY3JlZW5FbGVtZW50KVxuICAgICk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KFdJTkRPVykgd2luUmVmOiBhbnksIEBJbmplY3QoRE9DVU1FTlQpIGRvY1JlZjogYW55LCBASW5qZWN0KFBMQVRGT1JNX0lEKSBwbGF0Zm9ybUlkOiBPYmplY3QpIHtcbiAgICB0aGlzLmRvY1JlZiA9IGRvY1JlZiBhcyBEb2N1bWVudDtcbiAgICB0aGlzLnJlc2l6ZU9ic2VydmFibGUkID0gaXNQbGF0Zm9ybUJyb3dzZXIocGxhdGZvcm1JZClcbiAgICAgID8gZnJvbUV2ZW50KHdpblJlZiwgJ3Jlc2l6ZScpXG4gICAgICA6IChuZXcgU3ViamVjdDxFdmVudD4oKSkuYXNPYnNlcnZhYmxlKCk7XG4gIH1cbn1cbiJdfQ==