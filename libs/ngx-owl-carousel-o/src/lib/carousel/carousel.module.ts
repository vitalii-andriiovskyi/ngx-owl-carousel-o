import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CarouselComponent
} from './carousel.component';
import { CarouselSlideDirective } from './carousel-slide.directive';
import { WINDOW_PROVIDERS } from '../services/window-ref.service';
import { ResizeService } from '../services/resize.service';
import { DOCUMENT_PROVIDERS } from '../services/document-ref.service';
import { StageComponent } from './stage/stage.component';

export { CarouselComponent } from './carousel.component';
export { CarouselSlideDirective } from './carousel-slide.directive';
export { SlidesOutputData } from '../models/SlidesOutputData';

import { RouterModule, Routes } from '@angular/router';
import { OwlRouterLinkDirective, OwlRouterLinkWithHrefDirective } from './owl-router-link.directive';
import { OwlLogger } from '../services/logger.service';
export { OwlRouterLinkDirective, OwlRouterLinkWithHrefDirective } from './owl-router-link.directive';

const routes: Routes = [];


@NgModule({
  imports: [
    CommonModule,
    // RouterModule.forChild(routes)
  ],
  declarations: [CarouselComponent, CarouselSlideDirective, StageComponent, OwlRouterLinkDirective, OwlRouterLinkWithHrefDirective],
  exports: [CarouselComponent, CarouselSlideDirective, OwlRouterLinkDirective, OwlRouterLinkWithHrefDirective],
  providers: [WINDOW_PROVIDERS, ResizeService, DOCUMENT_PROVIDERS, OwlLogger]
})
export class CarouselModule { }
