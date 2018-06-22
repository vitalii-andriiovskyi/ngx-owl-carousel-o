import { Component, OnInit } from '@angular/core';
import { MapOperator } from 'rxjs/internal/operators/map';

// import { ResizeService, WINDOW } from 'ngx-owl-carousel-o';

export class CarouselData {
  text: string;
}

@Component({
  selector: 'owl-carousel-libdemo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  carouselData: CarouselData[] = [
    { text: 'Slide 1'},
    { text: 'Slide 2'},
    { text: 'Slide 3'},
    { text: 'Slide 4'},
    { text: 'Slide 5'},
    { text: 'Slide 6'}
  ];
  title = 'owl-carousel-libdemo';
  owlNext = "&rarr;";
  owlPrev = "&larr;";

  constructor() {

  }

  ngOnInit() {  }



}
