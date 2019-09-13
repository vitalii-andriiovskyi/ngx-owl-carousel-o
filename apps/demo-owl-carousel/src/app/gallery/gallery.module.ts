import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryComponent } from './gallery.component';
import { Routes, RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';

const routes: Routes = [
  {
    path: '',
    component: GalleryComponent
  }
];

@NgModule({
  declarations: [GalleryComponent],
  imports: [
    CommonModule,
    CarouselModule,
    RouterModule.forChild(routes)
  ]
})
export class GalleryModule { }
