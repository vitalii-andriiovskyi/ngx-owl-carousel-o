import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresentComponent } from './present.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: 'present', component: PresentComponent }
];

@NgModule({
  imports: [
    CommonModule, CarouselModule, RouterModule.forChild(appRoutes)
  ],
  declarations: [PresentComponent],
  exports: [ PresentComponent ]
})
export class PresentModule { }
