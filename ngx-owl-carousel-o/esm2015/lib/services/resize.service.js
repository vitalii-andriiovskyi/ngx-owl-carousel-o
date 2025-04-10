import * as tslib_1 from "tslib";
import { EventManager } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from './document-ref.service';
let ResizeService = class ResizeService {
    constructor(eventManager, docRef) {
        this.eventManager = eventManager;
        this.docRef = docRef;
        this.resizeSubject = new Subject();
        this.eventManager.addGlobalEventListener('window', 'resize', this.onResize.bind(this));
        this.eventManager.addGlobalEventListener('window', 'onload', this.onLoaded.bind(this));
    }
    /**
     * Makes resizeSubject become Observable
     * @returns Observable of resizeSubject
     */
    get onResize$() {
        return this.resizeSubject.asObservable();
    }
    /**
     * Handler of 'resize' event. Passes data throw resizeSubject
     * @param event Event Object of 'resize' event
     */
    onResize(event) {
        if (this.docRef.fullscreenElement) {
            return;
        }
        this.resizeSubject.next(event.target);
    }
    /**
     * Handler of 'onload' event. Defines the width of window
     * @param event Event Object of 'onload' event
     */
    onLoaded(event) {
        this.windowWidth = event.target;
    }
};
ResizeService.ctorParameters = () => [
    { type: EventManager },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
ResizeService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__param(1, Inject(DOCUMENT))
], ResizeService);
export { ResizeService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXplLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvcmVzaXplLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUdsRCxJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFhO0lBb0J4QixZQUFvQixZQUEwQixFQUFvQixNQUFXO1FBQXpELGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBRTVDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBa0IsQ0FBQztRQUVqQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxzQkFBc0IsQ0FDdEMsUUFBUSxFQUNSLFFBQVEsRUFDUixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDekIsQ0FBQztRQUNGLElBQUksQ0FBQyxZQUFZLENBQUMsc0JBQXNCLENBQ3RDLFFBQVEsRUFDUixRQUFRLEVBQ1IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ3pCLENBQUM7SUFDSixDQUFDO0lBN0JEOzs7T0FHRztJQUNILElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBeUJEOzs7T0FHRztJQUNLLFFBQVEsQ0FBQyxLQUFjO1FBQzdCLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRTtZQUNqQyxPQUFNO1NBQ1A7UUFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBUyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVEOzs7T0FHRztJQUNLLFFBQVEsQ0FBQyxLQUFjO1FBQzdCLElBQUksQ0FBQyxXQUFXLEdBQVcsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUMxQyxDQUFDO0NBQ0YsQ0FBQTs7WUFuQ21DLFlBQVk7NENBQUcsTUFBTSxTQUFDLFFBQVE7O0FBcEJyRCxhQUFhO0lBRHpCLFVBQVUsRUFBRTtJQXFCc0MsbUJBQUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0dBcEJ0RCxhQUFhLENBdUR6QjtTQXZEWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnRNYW5hZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnLi9kb2N1bWVudC1yZWYuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBSZXNpemVTZXJ2aWNlIHtcbiAgLyoqXG4gICAqIFdpZHRoIG9mIHdpbmRvd1xuICAgKi9cbiAgcHVibGljIHdpbmRvd1dpZHRoOiBhbnk7XG5cbiAgLyoqXG4gICAqIE1ha2VzIHJlc2l6ZVN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiByZXNpemVTdWJqZWN0XG4gICAqL1xuICBnZXQgb25SZXNpemUkKCk6IE9ic2VydmFibGU8V2luZG93PiB7XG4gICAgcmV0dXJuIHRoaXMucmVzaXplU3ViamVjdC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJqZWN0IG9mICdyZXNpemUnIGV2ZW50XG4gICAqL1xuICBwcml2YXRlIHJlc2l6ZVN1YmplY3Q6IFN1YmplY3Q8V2luZG93PjtcbiAgcHJpdmF0ZSBkb2NSZWY6IERvY3VtZW50O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZXZlbnRNYW5hZ2VyOiBFdmVudE1hbmFnZXIsIEBJbmplY3QoRE9DVU1FTlQpIGRvY1JlZjogYW55LCkge1xuXG4gICAgdGhpcy5kb2NSZWYgPSBkb2NSZWYgYXMgRG9jdW1lbnQ7XG5cbiAgICB0aGlzLnJlc2l6ZVN1YmplY3QgPSBuZXcgU3ViamVjdCgpO1xuICAgIHRoaXMuZXZlbnRNYW5hZ2VyLmFkZEdsb2JhbEV2ZW50TGlzdGVuZXIoXG4gICAgICAnd2luZG93JyxcbiAgICAgICdyZXNpemUnLFxuICAgICAgdGhpcy5vblJlc2l6ZS5iaW5kKHRoaXMpXG4gICAgKTtcbiAgICB0aGlzLmV2ZW50TWFuYWdlci5hZGRHbG9iYWxFdmVudExpc3RlbmVyKFxuICAgICAgJ3dpbmRvdycsXG4gICAgICAnb25sb2FkJyxcbiAgICAgIHRoaXMub25Mb2FkZWQuYmluZCh0aGlzKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlciBvZiAncmVzaXplJyBldmVudC4gUGFzc2VzIGRhdGEgdGhyb3cgcmVzaXplU3ViamVjdFxuICAgKiBAcGFyYW0gZXZlbnQgRXZlbnQgT2JqZWN0IG9mICdyZXNpemUnIGV2ZW50XG4gICAqL1xuICBwcml2YXRlIG9uUmVzaXplKGV2ZW50OiBVSUV2ZW50KSB7XG4gICAgaWYgKHRoaXMuZG9jUmVmLmZ1bGxzY3JlZW5FbGVtZW50KSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgdGhpcy5yZXNpemVTdWJqZWN0Lm5leHQoPFdpbmRvdz5ldmVudC50YXJnZXQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXIgb2YgJ29ubG9hZCcgZXZlbnQuIERlZmluZXMgdGhlIHdpZHRoIG9mIHdpbmRvd1xuICAgKiBAcGFyYW0gZXZlbnQgRXZlbnQgT2JqZWN0IG9mICdvbmxvYWQnIGV2ZW50XG4gICAqL1xuICBwcml2YXRlIG9uTG9hZGVkKGV2ZW50OiBVSUV2ZW50KSB7XG4gICAgdGhpcy53aW5kb3dXaWR0aCA9IDxXaW5kb3c+ZXZlbnQudGFyZ2V0O1xuICB9XG59XG4iXX0=