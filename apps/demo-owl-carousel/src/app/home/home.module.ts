import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterModule, Routes } from '@angular/router';
import { SubHomeComponent } from './subhome/subhome.component';

const appRoutes: Routes = [
  { path: 'home',
    component: HomeComponent,
    children: [
      { path: 'subhome', component: SubHomeComponent}
    ] },
];

@NgModule({
  imports: [
    CommonModule, CarouselModule, RouterModule.forChild(appRoutes)
  ],
  declarations: [HomeComponent, SubHomeComponent],
  exports: [ HomeComponent]
})
export class HomeModule { }
