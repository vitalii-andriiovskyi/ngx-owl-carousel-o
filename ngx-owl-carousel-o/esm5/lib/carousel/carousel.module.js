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
import { OwlRouterLinkDirective, OwlRouterLinkWithHrefDirective } from './owl-router-link.directive';
export { OwlRouterLinkDirective, OwlRouterLinkWithHrefDirective } from './owl-router-link.directive';
/** @type {?} */
var routes = [];
var CarouselModule = /** @class */ (function () {
    function CarouselModule() {
    }
    CarouselModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        // BrowserAnimationsModule, // there's an issue with this import while using lazy loading of module consuming this library. I don't remove it because it could be needed during future enhancement of this lib.
                        RouterModule.forChild(routes)
                    ],
                    declarations: [CarouselComponent, CarouselSlideDirective, StageComponent, OwlRouterLinkDirective, OwlRouterLinkWithHrefDirective],
                    exports: [CarouselComponent, CarouselSlideDirective, OwlRouterLinkDirective, OwlRouterLinkWithHrefDirective],
                    providers: [WINDOW_PROVIDERS, ResizeService, DOCUMENT_PROVIDERS]
                },] }
    ];
    return CarouselModule;
}());
export { CarouselModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW93bC1jYXJvdXNlbC1vLyIsInNvdXJjZXMiOlsibGliL2Nhcm91c2VsL2Nhcm91c2VsLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixzQkFBc0IsRUFDdkIsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDdEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXpELE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsc0JBQXNCLEVBQ3RCLGdCQUFnQixFQUNqQixNQUFNLHNCQUFzQixDQUFDO0FBRTlCLE9BQU8sRUFBRSxZQUFZLEVBQVUsTUFBTSxpQkFBaUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsOEJBQThCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNyRyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsOEJBQThCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7QUFFckcsSUFBTSxNQUFNLEdBQVcsRUFBRSxDQUFDOzs7OztnQkFHekIsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZOzt3QkFFWixZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztxQkFBQztvQkFDaEMsWUFBWSxFQUFFLENBQUMsaUJBQWlCLEVBQUUsc0JBQXNCLEVBQUUsY0FBYyxFQUFFLHNCQUFzQixFQUFFLDhCQUE4QixDQUFDO29CQUNqSSxPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxzQkFBc0IsRUFBRSxzQkFBc0IsRUFBRSw4QkFBOEIsQ0FBQztvQkFDNUcsU0FBUyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsYUFBYSxFQUFFLGtCQUFrQixDQUFDO2lCQUNqRTs7eUJBaENEOztTQWlDYSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtcclxuICBDYXJvdXNlbENvbXBvbmVudCxcclxuICBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlXHJcbn0gZnJvbSAnLi9jYXJvdXNlbC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBXSU5ET1dfUFJPVklERVJTIH0gZnJvbSAnLi4vc2VydmljZXMvd2luZG93LXJlZi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUmVzaXplU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3Jlc2l6ZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRE9DVU1FTlRfUFJPVklERVJTIH0gZnJvbSAnLi4vc2VydmljZXMvZG9jdW1lbnQtcmVmLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTdGFnZUNvbXBvbmVudCB9IGZyb20gJy4vc3RhZ2Uvc3RhZ2UuY29tcG9uZW50JztcclxuLy8gaW1wb3J0IHsgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xyXG5leHBvcnQge1xyXG4gIENhcm91c2VsQ29tcG9uZW50LFxyXG4gIENhcm91c2VsU2xpZGVEaXJlY3RpdmUsXHJcbiAgU2xpZGVzT3V0cHV0RGF0YVxyXG59IGZyb20gJy4vY2Fyb3VzZWwuY29tcG9uZW50JztcclxuXHJcbmltcG9ydCB7IFJvdXRlck1vZHVsZSwgUm91dGVzIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgT3dsUm91dGVyTGlua0RpcmVjdGl2ZSwgT3dsUm91dGVyTGlua1dpdGhIcmVmRGlyZWN0aXZlIH0gZnJvbSAnLi9vd2wtcm91dGVyLWxpbmsuZGlyZWN0aXZlJztcclxuZXhwb3J0IHsgT3dsUm91dGVyTGlua0RpcmVjdGl2ZSwgT3dsUm91dGVyTGlua1dpdGhIcmVmRGlyZWN0aXZlIH0gZnJvbSAnLi9vd2wtcm91dGVyLWxpbmsuZGlyZWN0aXZlJztcclxuXHJcbmNvbnN0IHJvdXRlczogUm91dGVzID0gW107XHJcblxyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICAvLyBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSwgLy8gdGhlcmUncyBhbiBpc3N1ZSB3aXRoIHRoaXMgaW1wb3J0IHdoaWxlIHVzaW5nIGxhenkgbG9hZGluZyBvZiBtb2R1bGUgY29uc3VtaW5nIHRoaXMgbGlicmFyeS4gSSBkb24ndCByZW1vdmUgaXQgYmVjYXVzZSBpdCBjb3VsZCBiZSBuZWVkZWQgZHVyaW5nIGZ1dHVyZSBlbmhhbmNlbWVudCBvZiB0aGlzIGxpYi5cclxuICAgIFJvdXRlck1vZHVsZS5mb3JDaGlsZChyb3V0ZXMpXSxcclxuICBkZWNsYXJhdGlvbnM6IFtDYXJvdXNlbENvbXBvbmVudCwgQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZSwgU3RhZ2VDb21wb25lbnQsIE93bFJvdXRlckxpbmtEaXJlY3RpdmUsIE93bFJvdXRlckxpbmtXaXRoSHJlZkRpcmVjdGl2ZV0sXHJcbiAgZXhwb3J0czogW0Nhcm91c2VsQ29tcG9uZW50LCBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlLCBPd2xSb3V0ZXJMaW5rRGlyZWN0aXZlLCBPd2xSb3V0ZXJMaW5rV2l0aEhyZWZEaXJlY3RpdmVdLFxyXG4gIHByb3ZpZGVyczogW1dJTkRPV19QUk9WSURFUlMsIFJlc2l6ZVNlcnZpY2UsIERPQ1VNRU5UX1BST1ZJREVSU11cclxufSlcclxuZXhwb3J0IGNsYXNzIENhcm91c2VsTW9kdWxlIHt9XHJcbiJdfQ==