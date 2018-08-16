import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from './carousel/carousel.module';
import { WINDOW_PROVIDERS } from './services/window-ref.service';
import { ResizeService } from './services/resize.service';

export {
  CarouselModule,
  CarouselComponent,
  CarouselSlideDirective,
  SlidesOutputData
} from './carousel/carousel.module';
export { ResizeService } from './services/resize.service';
export {
  WindowRef,
  BrowserWindowRef,
  WINDOW,
  windowFactory,
  browserWindowProvider,
  windowProvider,
  WINDOW_PROVIDERS
} from './services/window-ref.service';
export { OwlImageComponent } from './carousel/owl-image/owl-image.component';

@NgModule({
  imports: [CommonModule, CarouselModule],
  exports: [CarouselModule],
  providers: [WINDOW_PROVIDERS, ResizeService]
})
export class NgxOwlCarouselOModule {}
