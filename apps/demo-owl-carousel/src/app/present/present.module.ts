import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresentComponent } from './present.component';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  imports: [
    CommonModule, CarouselModule
  ],
  declarations: [PresentComponent],
  exports: [ PresentComponent ]
})
export class PresentModule { }
