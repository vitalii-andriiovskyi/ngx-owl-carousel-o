import { Component, OnInit } from '@angular/core';
import { MapOperator } from 'rxjs/internal/operators/map';

// import { ResizeService, WINDOW } from 'ngx-owl-carousel-o';

export class CarouselData {
  id?: string;
  text: string;
  dataMerge?: number;
  width?: number;
  dotContent?: string;
  src?: string;
  dataHash?: string;
}

@Component({
  selector: 'owl-carousel-libdemo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  carouselData: CarouselData[] = [
    { text: 'Slide 1', src: 'assets/images/350x450&text=1.png', dataMerge: 2, width: 300, dotContent: 'text1', dataHash: 'one'},
    { text: 'Slide 2', src: 'assets/images/350x650&text=2.png', dataMerge: 1, width: 500, dotContent: 'text2', dataHash: 'two'},
    { text: 'Slide 3', src: 'assets/images/350x250&text=3-fallback.png', dataMerge: 3, dotContent: 'text3', dataHash: 'three'},
    { text: 'Slide 4', src: 'assets/images/350x250&text=4.png', width: 450, dotContent: 'text4', dataHash: 'four'},
    { text: 'Slide 5', src: 'assets/images/350x250&text=5.png', dataMerge: 2, dotContent: 'text5', dataHash: 'five'},
    // { text: 'Slide 6', dotContent: 'text5'},
    // { text: 'Slide 7', dotContent: 'text5'},
    // { text: 'Slide 8', dotContent: 'text5'},
    // { text: 'Slide 9', dotContent: 'text5'},
    // { text: 'Slide 10', dotContent: 'text5'},
  ];
  title = 'owl-carousel-libdemo';
  owlNext = '&rarr;';
  owlPrev = '&larr;';


  customOptions: any = {
    // autoWidth: true,
    loop: true,
    // autoHeight: true,
    // lazyLoad: true,
    // lazyLoadEager: 1,
    // animateOut: 'slideOutDown',
    // animateIn: 'flipInX',
    // items: '10',
    // margin: 10,
    // slideBy: 'page',
    // merge: true,
    // autoplay: true,
    // autoplayTimeout: 5000,
    // autoplayHoverPause: true,
		// autoplaySpeed: 4000,
    // dotsSpeed: 500,
    // dots: false,
    // dotsData: true,
    // mouseDrag: false,
    // touchDrag: false,
    // pullDrag: false,
    // smartSpeed: 400,
    // fluidSpeed: 499,
    // dragEndSpeed: 350,
    // dotsEach: 4,
    center: true,
    URLhashListener:true,
    startPosition: 'URLHash',
    // rewind: true,
    // rtl: true,
    // startPosition: 1,
    // navText: [ '<i class=fa-chevron-left>left</i>', '<i class=fa-chevron-right>right</i>' ],
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      900: {
        items: 3
      }
    },
    // stagePadding: 40,
    nav: true
  }

  activeSlides: any;

  classes: {[key:string]: boolean} = {
    'animated': true,
    'fadeIn': true
  }

  constructor() {

  }

  ngOnInit() {  }

  getPassedData(data: any) {
    this.activeSlides = data;
    console.log(this.activeSlides);
  }

  addClassObj() {
    const startClasses: any = { ...this.classes};
    startClasses['fade-spin'] = true;
    this.classes = startClasses;
  }

  deleteOneClass() {
    const startClasses: any = { ...this.classes};
    delete startClasses['fade-spin'];
    this.classes = startClasses;
  }

}
