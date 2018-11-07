import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CarouselComponent,
  CarouselSlideDirective
} from './carousel.component';
import { WINDOW_PROVIDERS } from '../services/window-ref.service';
import { ResizeService } from '../services/resize.service';
import { DOCUMENT_PROVIDERS } from '../services/document-ref.service';
import { StageComponent } from './stage/stage.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
export {
  CarouselComponent,
  CarouselSlideDirective,
  SlidesOutputData
} from './carousel.component';

import { RouterModule, Routes } from '@angular/router';
import { OwlRouterLinkDirective, OwlRouterLinkWithHrefDirective } from './owl-router-link.directive';
export { OwlRouterLinkDirective, OwlRouterLinkWithHrefDirective } from './owl-router-link.directive';

const routes: Routes = [];


@NgModule({
  imports: [
    CommonModule,
    // BrowserAnimationsModule, // there's an issue with this import while using lazy loading of module consuming this library. I don't remove it because it could be needed during future enhancement of this lib.
    RouterModule.forChild(routes)],
  declarations: [CarouselComponent, CarouselSlideDirective, StageComponent, OwlRouterLinkDirective, OwlRouterLinkWithHrefDirective],
  exports: [CarouselComponent, CarouselSlideDirective, OwlRouterLinkDirective, OwlRouterLinkWithHrefDirective],
  providers: [WINDOW_PROVIDERS, ResizeService, DOCUMENT_PROVIDERS]
})
export class CarouselModule {}
