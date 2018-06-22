import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from './carousel/carousel.module';
import { WINDOW_PROVIDERS } from './services/window-ref.service';
import { ResizeService } from './services/resize.service';

@NgModule({
  imports: [CommonModule, CarouselModule],
  declarations: [],
  exports: [CarouselModule],
  providers: [
    WINDOW_PROVIDERS,
    ResizeService
  ]
})
export class NgxOwlCarouselOModule {}