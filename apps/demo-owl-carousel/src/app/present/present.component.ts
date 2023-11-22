import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, WritableSignal, signal } from '@angular/core';
import { CarouselModule, OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

interface CarouselData {
  id?: string;
  text: string;
  dataMerge?: number;
  width: number;
  dotContent?: string;
  src?: string;
  dataHash?: string;
}


@Component({
  selector: 'app-present',
  standalone: true,
  imports: [CommonModule, CarouselModule, MatMenuModule, MatButtonModule],
  templateUrl: './present.component.html',
  styleUrl: './present.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PresentComponent implements OnInit {
  carouselData: CarouselData[] = [
    { text: 'Slide 1 PM', dataMerge: 2, width: 300, dotContent: 'text1' },
    { text: 'Slide 2 PM', dataMerge: 1, width: 500, dotContent: 'text2' },
    { text: 'Slide 3 PM', dataMerge: 3, width: 500, dotContent: 'text3' },
    { text: 'Slide 4 PM', width: 450, dotContent: 'text4' },
    { text: 'Slide 5 PM', dataMerge: 2, width: 500, dotContent: 'text5' },
    // { text: 'Slide 6', dotContent: 'text5'},
    // { text: 'Slide 7', dotContent: 'text5'},
    // { text: 'Slide 8', dotContent: 'text5'},
    // { text: 'Slide 9', dotContent: 'text5'},
    // { text: 'Slide 10', dotContent: 'text5'},
  ];
  title = 'owl-carousel-libdemo';
  owlNext = '&rarr;';
  owlPrev = '&larr;';


  customOptions: OwlOptions = {
    // autoWidth: true,
    loop: true,
    // items: '10',
    // margin: 10,
    // slideBy: 'page',
    // merge: true,
    autoplay: true,
    autoplayTimeout: 1000,
    autoplayHoverPause: true,
    autoplaySpeed: 900,
    dotsSpeed: 500,
    autoplayMouseleaveTimeout: 1100,
    // dots: false,
    // dotsData: true,
    // mouseDrag: false,
    // touchDrag: false,
    // pullDrag: false,
    smartSpeed: 400,
    // fluidSpeed: 499,
    dragEndSpeed: 350,
    // dotsEach: 4,
    // center: true,
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
  activeSlides: WritableSignal<SlidesOutputData> = signal({});

  constructor() { }

  ngOnInit() {
  }

  getPassedData(data: any) {
    this.activeSlides.set(data);
    // console.log(this.activeSlides());
  }
}
