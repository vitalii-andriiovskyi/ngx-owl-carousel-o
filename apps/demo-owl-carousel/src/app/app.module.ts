import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HomeModule } from './home/home.module';
// import { PresentModule } from './present/present.module';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const appRoutes: Routes = [{
  path: 'present',
  loadChildren: './present/present.module#PresentModule',
}];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NxModule.forRoot(),
    HomeModule,
    // PresentModule,
    BrowserAnimationsModule,
    CarouselModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
