import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoubledCarouselComponent } from './doubled-carousel/doubled-carousel.component';
import { Routes, RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';

const routes: Routes = [
  {
    path: '',
    component: DoubledCarouselComponent
  }
]
@NgModule({
  declarations: [DoubledCarouselComponent],
  imports: [
    CommonModule,
    CarouselModule,
    RouterModule.forChild(routes)
  ]
})
export class DoubledCarouselModule { }
