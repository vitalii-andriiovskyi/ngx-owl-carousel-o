import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

interface Image {
  src: string;
  title?: string;
  alt?: string;
}

@Component({
  selector: 'owl-carousel-libdemo-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.sass'],
  animations: [
    trigger('activeSlide', [
      state('active', style({
        transform: 'scale(1.4)',
        opacity: 1,
      })),
      state('inActive', style({
        transform: 'scale(0.7)',
        opacity: 0.8,
      })),
      transition('active => inActive', [
        animate('0.5s')
      ]),
      transition('inActive => active', [
        animate('0.5s')
      ])
    ])
  ]
})
export class GalleryComponent implements OnInit {

  imagesData: Image[] = [
    {
      src: 'assets/images/cities/bridge.jpg',
      alt: '',
      title: ''
    },
    {
      src: 'assets/images/cities/city-before-sunrise.jpg',
      alt: 'image',
      title: 'image'
    },
    {
      src: 'assets/images/cities/golden-gate-bridge.jpg',
      alt: 'image',
      title: 'image'
    },
    {
      src: 'assets/images/cities/night-lights.jpg',
      alt: 'image',
      title: 'image'
    },
    {
      src: 'assets/images/cities/nigth-and-city.jpg',
      alt: 'image',
      title: 'image'
    },
    {
      src: 'assets/images/cities/paris-sunset.jpg',
      alt: 'image',
      title: 'image'
    },
    {
      src: 'assets/images/cities/red-sunset.jpg',
      alt: 'image',
      title: 'image'
    },
    {
      src: 'assets/images/cities/river-and-bridge.jpg',
      alt: 'image',
      title: 'image'
    },
    {
      src: 'assets/images/cities/town-hall.jpg',
      alt: 'image',
      title: 'image'
    }
  ]

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<<', '>>'],
    center: true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 1
      }
    },
    nav: true
  }

  constructor() { }

  ngOnInit() {
  }

}
