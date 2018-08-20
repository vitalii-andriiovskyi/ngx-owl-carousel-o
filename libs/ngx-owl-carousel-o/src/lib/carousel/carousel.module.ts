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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
export {
  CarouselComponent,
  CarouselSlideDirective,
  SlidesOutputData
} from './carousel.component';

import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];


@NgModule({
  imports: [CommonModule, BrowserAnimationsModule, RouterModule.forChild(routes)],
  declarations: [CarouselComponent, CarouselSlideDirective, StageComponent],
  exports: [CarouselComponent, CarouselSlideDirective],
  providers: [WINDOW_PROVIDERS, ResizeService, DOCUMENT_PROVIDERS]
})
export class CarouselModule {}
