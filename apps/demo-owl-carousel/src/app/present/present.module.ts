import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresentComponent } from './present.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterModule, Routes } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

const appRoutes: Routes = [
  { path: '', component: PresentComponent }
];

@NgModule({
  imports: [
    CommonModule,
    CarouselModule,
    RouterModule.forChild(appRoutes),
    MatMenuModule,
    MatButtonModule
  ],
  declarations: [PresentComponent],
  exports: [ PresentComponent ]
})
export class PresentModule { }
