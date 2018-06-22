import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NxModule.forRoot(), CarouselModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
