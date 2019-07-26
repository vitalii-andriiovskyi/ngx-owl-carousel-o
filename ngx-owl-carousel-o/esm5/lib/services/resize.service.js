import * as tslib_1 from "tslib";
import { EventManager } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
var ResizeService = /** @class */ (function () {
    function ResizeService(eventManager) {
        this.eventManager = eventManager;
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
        this.resizeSubject.next(event.target);
    };
    /**
     * Handler of 'onload' event. Defines the width of window
     * @param event Event Object of 'onload' event
     */
    ResizeService.prototype.onLoaded = function (event) {
        this.windowWidth = event.target;
    };
    ResizeService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [EventManager])
    ], ResizeService);
    return ResizeService;
}());
export { ResizeService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXplLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvcmVzaXplLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0M7SUFtQkUsdUJBQW9CLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzVDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsWUFBWSxDQUFDLHNCQUFzQixDQUN0QyxRQUFRLEVBQ1IsUUFBUSxFQUNSLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUN6QixDQUFDO1FBQ0YsSUFBSSxDQUFDLFlBQVksQ0FBQyxzQkFBc0IsQ0FDdEMsUUFBUSxFQUNSLFFBQVEsRUFDUixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDekIsQ0FBQztJQUNKLENBQUM7SUFyQkQsc0JBQUksb0NBQVM7UUFKYjs7O1dBR0c7YUFDSDtZQUNFLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMzQyxDQUFDOzs7T0FBQTtJQXFCRDs7O09BR0c7SUFDSyxnQ0FBUSxHQUFoQixVQUFpQixLQUFjO1FBQzdCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFTLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ssZ0NBQVEsR0FBaEIsVUFBaUIsS0FBYztRQUM3QixJQUFJLENBQUMsV0FBVyxHQUFXLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDMUMsQ0FBQztJQS9DVSxhQUFhO1FBRHpCLFVBQVUsRUFBRTtpREFvQnVCLFlBQVk7T0FuQm5DLGFBQWEsQ0FnRHpCO0lBQUQsb0JBQUM7Q0FBQSxBQWhERCxJQWdEQztTQWhEWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnRNYW5hZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgUmVzaXplU2VydmljZSB7XHJcbiAgLyoqXHJcbiAgICogV2lkdGggb2Ygd2luZG93XHJcbiAgICovXHJcbiAgcHVibGljIHdpbmRvd1dpZHRoOiBhbnk7XHJcblxyXG4gIC8qKlxyXG4gICAqIE1ha2VzIHJlc2l6ZVN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcclxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIHJlc2l6ZVN1YmplY3RcclxuICAgKi9cclxuICBnZXQgb25SZXNpemUkKCk6IE9ic2VydmFibGU8V2luZG93PiB7XHJcbiAgICByZXR1cm4gdGhpcy5yZXNpemVTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3ViamVjdCBvZiAncmVzaXplJyBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVzaXplU3ViamVjdDogU3ViamVjdDxXaW5kb3c+O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGV2ZW50TWFuYWdlcjogRXZlbnRNYW5hZ2VyKSB7XHJcbiAgICB0aGlzLnJlc2l6ZVN1YmplY3QgPSBuZXcgU3ViamVjdCgpO1xyXG4gICAgdGhpcy5ldmVudE1hbmFnZXIuYWRkR2xvYmFsRXZlbnRMaXN0ZW5lcihcclxuICAgICAgJ3dpbmRvdycsXHJcbiAgICAgICdyZXNpemUnLFxyXG4gICAgICB0aGlzLm9uUmVzaXplLmJpbmQodGhpcylcclxuICAgICk7XHJcbiAgICB0aGlzLmV2ZW50TWFuYWdlci5hZGRHbG9iYWxFdmVudExpc3RlbmVyKFxyXG4gICAgICAnd2luZG93JyxcclxuICAgICAgJ29ubG9hZCcsXHJcbiAgICAgIHRoaXMub25Mb2FkZWQuYmluZCh0aGlzKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhbmRsZXIgb2YgJ3Jlc2l6ZScgZXZlbnQuIFBhc3NlcyBkYXRhIHRocm93IHJlc2l6ZVN1YmplY3RcclxuICAgKiBAcGFyYW0gZXZlbnQgRXZlbnQgT2JqZWN0IG9mICdyZXNpemUnIGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvblJlc2l6ZShldmVudDogVUlFdmVudCkge1xyXG4gICAgdGhpcy5yZXNpemVTdWJqZWN0Lm5leHQoPFdpbmRvdz5ldmVudC50YXJnZXQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlciBvZiAnb25sb2FkJyBldmVudC4gRGVmaW5lcyB0aGUgd2lkdGggb2Ygd2luZG93XHJcbiAgICogQHBhcmFtIGV2ZW50IEV2ZW50IE9iamVjdCBvZiAnb25sb2FkJyBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25Mb2FkZWQoZXZlbnQ6IFVJRXZlbnQpIHtcclxuICAgIHRoaXMud2luZG93V2lkdGggPSA8V2luZG93PmV2ZW50LnRhcmdldDtcclxuICB9XHJcbn1cclxuIl19