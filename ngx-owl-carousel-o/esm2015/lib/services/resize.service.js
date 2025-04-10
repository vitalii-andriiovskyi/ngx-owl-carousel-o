import { __decorate, __param } from "tslib";
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
        var _a;
        if ((_a = this.docRef) === null || _a === void 0 ? void 0 : _a.fullscreenElement) {
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
ResizeService = __decorate([
    Injectable(),
    __param(1, Inject(DOCUMENT))
], ResizeService);
export { ResizeService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXplLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvcmVzaXplLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUdsRCxJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFhO0lBb0J4QixZQUFvQixZQUEwQixFQUFvQixNQUFXO1FBQXpELGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBRTVDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBa0IsQ0FBQztRQUVqQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxzQkFBc0IsQ0FDdEMsUUFBUSxFQUNSLFFBQVEsRUFDUixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDekIsQ0FBQztRQUNGLElBQUksQ0FBQyxZQUFZLENBQUMsc0JBQXNCLENBQ3RDLFFBQVEsRUFDUixRQUFRLEVBQ1IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ3pCLENBQUM7SUFDSixDQUFDO0lBN0JEOzs7T0FHRztJQUNILElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBeUJEOzs7T0FHRztJQUNLLFFBQVEsQ0FBQyxLQUFjOztRQUM3QixVQUFJLElBQUksQ0FBQyxNQUFNLDBDQUFFLGlCQUFpQixFQUFFO1lBQ2xDLE9BQU07U0FDUDtRQUNELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFTLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ssUUFBUSxDQUFDLEtBQWM7UUFDN0IsSUFBSSxDQUFDLFdBQVcsR0FBVyxLQUFLLENBQUMsTUFBTSxDQUFDO0lBQzFDLENBQUM7Q0FDRixDQUFBOztZQW5DbUMsWUFBWTs0Q0FBRyxNQUFNLFNBQUMsUUFBUTs7QUFwQnJELGFBQWE7SUFEekIsVUFBVSxFQUFFO0lBcUJzQyxXQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQTtHQXBCdEQsYUFBYSxDQXVEekI7U0F2RFksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50TWFuYWdlciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJy4vZG9jdW1lbnQtcmVmLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUmVzaXplU2VydmljZSB7XG4gIC8qKlxuICAgKiBXaWR0aCBvZiB3aW5kb3dcbiAgICovXG4gIHB1YmxpYyB3aW5kb3dXaWR0aDogYW55O1xuXG4gIC8qKlxuICAgKiBNYWtlcyByZXNpemVTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgcmVzaXplU3ViamVjdFxuICAgKi9cbiAgZ2V0IG9uUmVzaXplJCgpOiBPYnNlcnZhYmxlPFdpbmRvdz4ge1xuICAgIHJldHVybiB0aGlzLnJlc2l6ZVN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogU3ViamVjdCBvZiAncmVzaXplJyBldmVudFxuICAgKi9cbiAgcHJpdmF0ZSByZXNpemVTdWJqZWN0OiBTdWJqZWN0PFdpbmRvdz47XG4gIHByaXZhdGUgZG9jUmVmOiBEb2N1bWVudDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGV2ZW50TWFuYWdlcjogRXZlbnRNYW5hZ2VyLCBASW5qZWN0KERPQ1VNRU5UKSBkb2NSZWY6IGFueSwpIHtcblxuICAgIHRoaXMuZG9jUmVmID0gZG9jUmVmIGFzIERvY3VtZW50O1xuXG4gICAgdGhpcy5yZXNpemVTdWJqZWN0ID0gbmV3IFN1YmplY3QoKTtcbiAgICB0aGlzLmV2ZW50TWFuYWdlci5hZGRHbG9iYWxFdmVudExpc3RlbmVyKFxuICAgICAgJ3dpbmRvdycsXG4gICAgICAncmVzaXplJyxcbiAgICAgIHRoaXMub25SZXNpemUuYmluZCh0aGlzKVxuICAgICk7XG4gICAgdGhpcy5ldmVudE1hbmFnZXIuYWRkR2xvYmFsRXZlbnRMaXN0ZW5lcihcbiAgICAgICd3aW5kb3cnLFxuICAgICAgJ29ubG9hZCcsXG4gICAgICB0aGlzLm9uTG9hZGVkLmJpbmQodGhpcylcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXIgb2YgJ3Jlc2l6ZScgZXZlbnQuIFBhc3NlcyBkYXRhIHRocm93IHJlc2l6ZVN1YmplY3RcbiAgICogQHBhcmFtIGV2ZW50IEV2ZW50IE9iamVjdCBvZiAncmVzaXplJyBldmVudFxuICAgKi9cbiAgcHJpdmF0ZSBvblJlc2l6ZShldmVudDogVUlFdmVudCkge1xuICAgIGlmICh0aGlzLmRvY1JlZj8uZnVsbHNjcmVlbkVsZW1lbnQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB0aGlzLnJlc2l6ZVN1YmplY3QubmV4dCg8V2luZG93PmV2ZW50LnRhcmdldCk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlciBvZiAnb25sb2FkJyBldmVudC4gRGVmaW5lcyB0aGUgd2lkdGggb2Ygd2luZG93XG4gICAqIEBwYXJhbSBldmVudCBFdmVudCBPYmplY3Qgb2YgJ29ubG9hZCcgZXZlbnRcbiAgICovXG4gIHByaXZhdGUgb25Mb2FkZWQoZXZlbnQ6IFVJRXZlbnQpIHtcbiAgICB0aGlzLndpbmRvd1dpZHRoID0gPFdpbmRvdz5ldmVudC50YXJnZXQ7XG4gIH1cbn1cbiJdfQ==