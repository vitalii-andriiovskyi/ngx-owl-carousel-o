import * as tslib_1 from "tslib";
import { EventManager } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from './document-ref.service';
var ResizeService = /** @class */ (function () {
    function ResizeService(eventManager, docRef) {
        this.eventManager = eventManager;
        this.docRef = docRef;
        this.resizeSubject = new Subject();
        this.eventManager.addGlobalEventListener('window', 'resize', this.onResize.bind(this));
        this.eventManager.addGlobalEventListener('window', 'onload', this.onLoaded.bind(this));
    }
    Object.defineProperty(ResizeService.prototype, "onResize$", {
        /**
         * Makes resizeSubject become Observable
         * @returns Observable of resizeSubject
         */
        get: function () {
            return this.resizeSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Handler of 'resize' event. Passes data throw resizeSubject
     * @param event Event Object of 'resize' event
     */
    ResizeService.prototype.onResize = function (event) {
        if (this.docRef.fullscreenElement) {
            return;
        }
        this.resizeSubject.next(event.target);
    };
    /**
     * Handler of 'onload' event. Defines the width of window
     * @param event Event Object of 'onload' event
     */
    ResizeService.prototype.onLoaded = function (event) {
        this.windowWidth = event.target;
    };
    ResizeService.ctorParameters = function () { return [
        { type: EventManager },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    ResizeService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__param(1, Inject(DOCUMENT))
    ], ResizeService);
    return ResizeService;
}());
export { ResizeService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXplLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvcmVzaXplLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUdsRDtJQW9CRSx1QkFBb0IsWUFBMEIsRUFBb0IsTUFBVztRQUF6RCxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUU1QyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQWtCLENBQUM7UUFFakMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQ25DLElBQUksQ0FBQyxZQUFZLENBQUMsc0JBQXNCLENBQ3RDLFFBQVEsRUFDUixRQUFRLEVBQ1IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ3pCLENBQUM7UUFDRixJQUFJLENBQUMsWUFBWSxDQUFDLHNCQUFzQixDQUN0QyxRQUFRLEVBQ1IsUUFBUSxFQUNSLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUN6QixDQUFDO0lBQ0osQ0FBQztJQXpCRCxzQkFBSSxvQ0FBUztRQUpiOzs7V0FHRzthQUNIO1lBQ0UsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzNDLENBQUM7OztPQUFBO0lBeUJEOzs7T0FHRztJQUNLLGdDQUFRLEdBQWhCLFVBQWlCLEtBQWM7UUFDN0IsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFO1lBQ2pDLE9BQU07U0FDUDtRQUNELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFTLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ssZ0NBQVEsR0FBaEIsVUFBaUIsS0FBYztRQUM3QixJQUFJLENBQUMsV0FBVyxHQUFXLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDMUMsQ0FBQzs7Z0JBbENpQyxZQUFZO2dEQUFHLE1BQU0sU0FBQyxRQUFROztJQXBCckQsYUFBYTtRQUR6QixVQUFVLEVBQUU7UUFxQnNDLG1CQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQTtPQXBCdEQsYUFBYSxDQXVEekI7SUFBRCxvQkFBQztDQUFBLEFBdkRELElBdURDO1NBdkRZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudE1hbmFnZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICcuL2RvY3VtZW50LXJlZi5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJlc2l6ZVNlcnZpY2Uge1xuICAvKipcbiAgICogV2lkdGggb2Ygd2luZG93XG4gICAqL1xuICBwdWJsaWMgd2luZG93V2lkdGg6IGFueTtcblxuICAvKipcbiAgICogTWFrZXMgcmVzaXplU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIHJlc2l6ZVN1YmplY3RcbiAgICovXG4gIGdldCBvblJlc2l6ZSQoKTogT2JzZXJ2YWJsZTxXaW5kb3c+IHtcbiAgICByZXR1cm4gdGhpcy5yZXNpemVTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN1YmplY3Qgb2YgJ3Jlc2l6ZScgZXZlbnRcbiAgICovXG4gIHByaXZhdGUgcmVzaXplU3ViamVjdDogU3ViamVjdDxXaW5kb3c+O1xuICBwcml2YXRlIGRvY1JlZjogRG9jdW1lbnQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBldmVudE1hbmFnZXI6IEV2ZW50TWFuYWdlciwgQEluamVjdChET0NVTUVOVCkgZG9jUmVmOiBhbnksKSB7XG5cbiAgICB0aGlzLmRvY1JlZiA9IGRvY1JlZiBhcyBEb2N1bWVudDtcblxuICAgIHRoaXMucmVzaXplU3ViamVjdCA9IG5ldyBTdWJqZWN0KCk7XG4gICAgdGhpcy5ldmVudE1hbmFnZXIuYWRkR2xvYmFsRXZlbnRMaXN0ZW5lcihcbiAgICAgICd3aW5kb3cnLFxuICAgICAgJ3Jlc2l6ZScsXG4gICAgICB0aGlzLm9uUmVzaXplLmJpbmQodGhpcylcbiAgICApO1xuICAgIHRoaXMuZXZlbnRNYW5hZ2VyLmFkZEdsb2JhbEV2ZW50TGlzdGVuZXIoXG4gICAgICAnd2luZG93JyxcbiAgICAgICdvbmxvYWQnLFxuICAgICAgdGhpcy5vbkxvYWRlZC5iaW5kKHRoaXMpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVyIG9mICdyZXNpemUnIGV2ZW50LiBQYXNzZXMgZGF0YSB0aHJvdyByZXNpemVTdWJqZWN0XG4gICAqIEBwYXJhbSBldmVudCBFdmVudCBPYmplY3Qgb2YgJ3Jlc2l6ZScgZXZlbnRcbiAgICovXG4gIHByaXZhdGUgb25SZXNpemUoZXZlbnQ6IFVJRXZlbnQpIHtcbiAgICBpZiAodGhpcy5kb2NSZWYuZnVsbHNjcmVlbkVsZW1lbnQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB0aGlzLnJlc2l6ZVN1YmplY3QubmV4dCg8V2luZG93PmV2ZW50LnRhcmdldCk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlciBvZiAnb25sb2FkJyBldmVudC4gRGVmaW5lcyB0aGUgd2lkdGggb2Ygd2luZG93XG4gICAqIEBwYXJhbSBldmVudCBFdmVudCBPYmplY3Qgb2YgJ29ubG9hZCcgZXZlbnRcbiAgICovXG4gIHByaXZhdGUgb25Mb2FkZWQoZXZlbnQ6IFVJRXZlbnQpIHtcbiAgICB0aGlzLndpbmRvd1dpZHRoID0gPFdpbmRvdz5ldmVudC50YXJnZXQ7XG4gIH1cbn1cbiJdfQ==