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
import { OwlImageComponent } from './owl-image/owl-image.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
export {
  CarouselComponent,
  CarouselSlideDirective,
  SlidesOutputData
} from './carousel.component';

export { OwlImageComponent } from './owl-image/owl-image.component';

@NgModule({
  imports: [CommonModule, BrowserAnimationsModule],
  declarations: [CarouselComponent, CarouselSlideDirective, StageComponent, OwlImageComponent],
  exports: [CarouselComponent, CarouselSlideDirective, OwlImageComponent],
  providers: [WINDOW_PROVIDERS, ResizeService, DOCUMENT_PROVIDERS]
})
export class CarouselModule {}
