import { Component, OnInit, ViewChild } from '@angular/core';
import { CarouselComponent, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'owl-carousel-libdemo-doubled-carousel',
  templateUrl: './doubled-carousel.component.html',
  styleUrls: ['./doubled-carousel.component.scss']
})
export class DoubledCarouselComponent implements OnInit {
  @ViewChild('owlMac', { static: false }) owlMac: CarouselComponent;
  @ViewChild('owlCat', { static: false }) owlCat: CarouselComponent;

  categoriesOptions: any = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    center: true,
    margin: 10,
    dotsSpeed: 300,
    responsive: {
      0: {
        items: 4,
        loop: true,
      },
      400: {
        items: 4,
        loop: true,
      },
      740: {
        items: 4,
        loop: true,
      },
      940: {
        items: 4,
        loop: true,
      }
    }
  };

  carouselOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dragEndSpeed: 450,
    items: 1,
    // responsive: {
    //   0: {
    //     items: 1,
    //     loop: true,
    //   },
    //   400: {
    //     items: 1,
    //     loop: true,
    //   },
    //   740: {
    //     items: 1,
    //     loop: true,
    //   },
    //   940: {
    //     items: 1,
    //     loop: true,
    //   }
    // }
  };

  categories: any = {
    items: [
      {
        id: 'slide-1',
        displayedName: 'Slide 1'
      },
      {
        id: 'slide-2',
        displayedName: 'Slide 2'
      },
      {
        id: 'slide-3',
        displayedName: 'Slide 3'
      },
      {
        id: 'slide-4',
        displayedName: 'Slide 4'
      },
      {
        id: 'slide-5',
        displayedName: 'Slide 5'
      },
      // {
      //   id: 'slide-6',
      //   displayedName: 'Slide 6'
      // },
      // {
      //   id: 'slide-7',
      //   displayedName: 'Slide 7'
      // },
      // {
      //   id: 'slide-8',
      //   displayedName: 'Slide 8'
      // }
    ]

  };
  constructor() { }

  slideTo(category: string) {
    this.owlMac.moveByDot(category);
  }

  changeSlide($event) {
    if (this.owlCat) {
      // this.category$.next($event.slides[0].id);
      this.owlCat.moveByDot(this.owlCat.dotsData.dots[$event.startPosition].id)
    }
  }


  ngOnInit() {
  }

}
