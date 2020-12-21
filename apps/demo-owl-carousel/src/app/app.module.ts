import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/angular';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HomeModule } from './home/home.module';
// import { PresentModule } from './present/present.module';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LinkModule } from './link/link.module';
import { LinkComponent } from './link/link.component';

const appRoutes: Routes = [
  {
    path: 'present',
    loadChildren: () => import('./present/present.module').then(mod => mod.PresentModule)
  },
  {
    path: 'doubled-carousel',
    loadChildren:
      () => import('./doubled-carousel/doubled-carousel.module').then(
        mod => mod.DoubledCarouselModule
      )
  },
  {
    path: 'gallery-carousel',
    loadChildren: () => import('./gallery/gallery.module').then(mod => mod.GalleryModule)
  },
  {
    path: 'link-comp',
    component: LinkComponent
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NxModule.forRoot(),
    HomeModule,
    // PresentModule,
    BrowserAnimationsModule,
    CarouselModule,
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' }),
    LinkModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
