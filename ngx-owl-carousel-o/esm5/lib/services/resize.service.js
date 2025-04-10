import { __decorate, __param } from "tslib";
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
        var _a;
        if ((_a = this.docRef) === null || _a === void 0 ? void 0 : _a.fullscreenElement) {
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
    ResizeService = __decorate([
        Injectable(),
        __param(1, Inject(DOCUMENT))
    ], ResizeService);
    return ResizeService;
}());
export { ResizeService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXplLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvcmVzaXplLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUdsRDtJQW9CRSx1QkFBb0IsWUFBMEIsRUFBb0IsTUFBVztRQUF6RCxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUU1QyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQWtCLENBQUM7UUFFakMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQ25DLElBQUksQ0FBQyxZQUFZLENBQUMsc0JBQXNCLENBQ3RDLFFBQVEsRUFDUixRQUFRLEVBQ1IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ3pCLENBQUM7UUFDRixJQUFJLENBQUMsWUFBWSxDQUFDLHNCQUFzQixDQUN0QyxRQUFRLEVBQ1IsUUFBUSxFQUNSLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUN6QixDQUFDO0lBQ0osQ0FBQztJQXpCRCxzQkFBSSxvQ0FBUztRQUpiOzs7V0FHRzthQUNIO1lBQ0UsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzNDLENBQUM7OztPQUFBO0lBeUJEOzs7T0FHRztJQUNLLGdDQUFRLEdBQWhCLFVBQWlCLEtBQWM7O1FBQzdCLFVBQUksSUFBSSxDQUFDLE1BQU0sMENBQUUsaUJBQWlCLEVBQUU7WUFDbEMsT0FBTTtTQUNQO1FBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQVMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRDs7O09BR0c7SUFDSyxnQ0FBUSxHQUFoQixVQUFpQixLQUFjO1FBQzdCLElBQUksQ0FBQyxXQUFXLEdBQVcsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUMxQyxDQUFDOztnQkFsQ2lDLFlBQVk7Z0RBQUcsTUFBTSxTQUFDLFFBQVE7O0lBcEJyRCxhQUFhO1FBRHpCLFVBQVUsRUFBRTtRQXFCc0MsV0FBQSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7T0FwQnRELGFBQWEsQ0F1RHpCO0lBQUQsb0JBQUM7Q0FBQSxBQXZERCxJQXVEQztTQXZEWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnRNYW5hZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnLi9kb2N1bWVudC1yZWYuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBSZXNpemVTZXJ2aWNlIHtcbiAgLyoqXG4gICAqIFdpZHRoIG9mIHdpbmRvd1xuICAgKi9cbiAgcHVibGljIHdpbmRvd1dpZHRoOiBhbnk7XG5cbiAgLyoqXG4gICAqIE1ha2VzIHJlc2l6ZVN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiByZXNpemVTdWJqZWN0XG4gICAqL1xuICBnZXQgb25SZXNpemUkKCk6IE9ic2VydmFibGU8V2luZG93PiB7XG4gICAgcmV0dXJuIHRoaXMucmVzaXplU3ViamVjdC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJqZWN0IG9mICdyZXNpemUnIGV2ZW50XG4gICAqL1xuICBwcml2YXRlIHJlc2l6ZVN1YmplY3Q6IFN1YmplY3Q8V2luZG93PjtcbiAgcHJpdmF0ZSBkb2NSZWY6IERvY3VtZW50O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZXZlbnRNYW5hZ2VyOiBFdmVudE1hbmFnZXIsIEBJbmplY3QoRE9DVU1FTlQpIGRvY1JlZjogYW55LCkge1xuXG4gICAgdGhpcy5kb2NSZWYgPSBkb2NSZWYgYXMgRG9jdW1lbnQ7XG5cbiAgICB0aGlzLnJlc2l6ZVN1YmplY3QgPSBuZXcgU3ViamVjdCgpO1xuICAgIHRoaXMuZXZlbnRNYW5hZ2VyLmFkZEdsb2JhbEV2ZW50TGlzdGVuZXIoXG4gICAgICAnd2luZG93JyxcbiAgICAgICdyZXNpemUnLFxuICAgICAgdGhpcy5vblJlc2l6ZS5iaW5kKHRoaXMpXG4gICAgKTtcbiAgICB0aGlzLmV2ZW50TWFuYWdlci5hZGRHbG9iYWxFdmVudExpc3RlbmVyKFxuICAgICAgJ3dpbmRvdycsXG4gICAgICAnb25sb2FkJyxcbiAgICAgIHRoaXMub25Mb2FkZWQuYmluZCh0aGlzKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlciBvZiAncmVzaXplJyBldmVudC4gUGFzc2VzIGRhdGEgdGhyb3cgcmVzaXplU3ViamVjdFxuICAgKiBAcGFyYW0gZXZlbnQgRXZlbnQgT2JqZWN0IG9mICdyZXNpemUnIGV2ZW50XG4gICAqL1xuICBwcml2YXRlIG9uUmVzaXplKGV2ZW50OiBVSUV2ZW50KSB7XG4gICAgaWYgKHRoaXMuZG9jUmVmPy5mdWxsc2NyZWVuRWxlbWVudCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHRoaXMucmVzaXplU3ViamVjdC5uZXh0KDxXaW5kb3c+ZXZlbnQudGFyZ2V0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVyIG9mICdvbmxvYWQnIGV2ZW50LiBEZWZpbmVzIHRoZSB3aWR0aCBvZiB3aW5kb3dcbiAgICogQHBhcmFtIGV2ZW50IEV2ZW50IE9iamVjdCBvZiAnb25sb2FkJyBldmVudFxuICAgKi9cbiAgcHJpdmF0ZSBvbkxvYWRlZChldmVudDogVUlFdmVudCkge1xuICAgIHRoaXMud2luZG93V2lkdGggPSA8V2luZG93PmV2ZW50LnRhcmdldDtcbiAgfVxufVxuIl19