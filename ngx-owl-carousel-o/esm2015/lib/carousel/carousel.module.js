/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent, CarouselSlideDirective } from './carousel.component';
import { WINDOW_PROVIDERS } from '../services/window-ref.service';
import { ResizeService } from '../services/resize.service';
import { DOCUMENT_PROVIDERS } from '../services/document-ref.service';
import { StageComponent } from './stage/stage.component';
export { CarouselComponent, CarouselSlideDirective, SlidesOutputData } from './carousel.component';
import { RouterModule } from '@angular/router';
/** @type {?} */
const routes = [];
export class CarouselModule {
}
CarouselModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    // BrowserAnimationsModule, // there's an issue with this import while using lazy loading of module consuming this library. I don't remove it because it could be needed during future enhancement of this lib.
                    RouterModule.forChild(routes)
                ],
                declarations: [CarouselComponent, CarouselSlideDirective, StageComponent],
                exports: [CarouselComponent, CarouselSlideDirective],
                providers: [WINDOW_PROVIDERS, ResizeService, DOCUMENT_PROVIDERS]
            },] }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW93bC1jYXJvdXNlbC1vLyIsInNvdXJjZXMiOlsibGliL2Nhcm91c2VsL2Nhcm91c2VsLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixzQkFBc0IsRUFDdkIsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDdEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXpELE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsc0JBQXNCLEVBQ3RCLGdCQUFnQixFQUNqQixNQUFNLHNCQUFzQixDQUFDO0FBRTlCLE9BQU8sRUFBRSxZQUFZLEVBQVUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFFdkQsTUFBTSxNQUFNLEdBQVcsRUFBRSxDQUFDO0FBWTFCLE1BQU07OztZQVRMLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsWUFBWTs7b0JBRVosWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7aUJBQUM7Z0JBQ2hDLFlBQVksRUFBRSxDQUFDLGlCQUFpQixFQUFFLHNCQUFzQixFQUFFLGNBQWMsQ0FBQztnQkFDekUsT0FBTyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsc0JBQXNCLENBQUM7Z0JBQ3BELFNBQVMsRUFBRSxDQUFDLGdCQUFnQixFQUFFLGFBQWEsRUFBRSxrQkFBa0IsQ0FBQzthQUNqRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7XHJcbiAgQ2Fyb3VzZWxDb21wb25lbnQsXHJcbiAgQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZVxyXG59IGZyb20gJy4vY2Fyb3VzZWwuY29tcG9uZW50JztcclxuaW1wb3J0IHsgV0lORE9XX1BST1ZJREVSUyB9IGZyb20gJy4uL3NlcnZpY2VzL3dpbmRvdy1yZWYuc2VydmljZSc7XHJcbmltcG9ydCB7IFJlc2l6ZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9yZXNpemUuc2VydmljZSc7XHJcbmltcG9ydCB7IERPQ1VNRU5UX1BST1ZJREVSUyB9IGZyb20gJy4uL3NlcnZpY2VzL2RvY3VtZW50LXJlZi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3RhZ2VDb21wb25lbnQgfSBmcm9tICcuL3N0YWdlL3N0YWdlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEJyb3dzZXJBbmltYXRpb25zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcclxuZXhwb3J0IHtcclxuICBDYXJvdXNlbENvbXBvbmVudCxcclxuICBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlLFxyXG4gIFNsaWRlc091dHB1dERhdGFcclxufSBmcm9tICcuL2Nhcm91c2VsLmNvbXBvbmVudCc7XHJcblxyXG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUsIFJvdXRlcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG5jb25zdCByb3V0ZXM6IFJvdXRlcyA9IFtdO1xyXG5cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgLy8gQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUsIC8vIHRoZXJlJ3MgYW4gaXNzdWUgd2l0aCB0aGlzIGltcG9ydCB3aGlsZSB1c2luZyBsYXp5IGxvYWRpbmcgb2YgbW9kdWxlIGNvbnN1bWluZyB0aGlzIGxpYnJhcnkuIEkgZG9uJ3QgcmVtb3ZlIGl0IGJlY2F1c2UgaXQgY291bGQgYmUgbmVlZGVkIGR1cmluZyBmdXR1cmUgZW5oYW5jZW1lbnQgb2YgdGhpcyBsaWIuXHJcbiAgICBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQocm91dGVzKV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbQ2Fyb3VzZWxDb21wb25lbnQsIENhcm91c2VsU2xpZGVEaXJlY3RpdmUsIFN0YWdlQ29tcG9uZW50XSxcclxuICBleHBvcnRzOiBbQ2Fyb3VzZWxDb21wb25lbnQsIENhcm91c2VsU2xpZGVEaXJlY3RpdmVdLFxyXG4gIHByb3ZpZGVyczogW1dJTkRPV19QUk9WSURFUlMsIFJlc2l6ZVNlcnZpY2UsIERPQ1VNRU5UX1BST1ZJREVSU11cclxufSlcclxuZXhwb3J0IGNsYXNzIENhcm91c2VsTW9kdWxlIHt9XHJcbiJdfQ==