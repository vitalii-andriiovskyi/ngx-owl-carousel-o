import { Component, OnInit } from '@angular/core';
import { CarouselData } from '../app.component';
import { Router, ActivatedRoute } from '@angular/router';
import { tap } from 'node_modules/rxjs/operators';
import { SlidesOutputData, OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'owl-carousel-libdemo-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  carouselData: CarouselData[] = [
    { id: 'slide-1', text: 'Slide 1 HM', dataMerge: 2, width: 300, dotContent: 'text1'},
    { id: 'slide-2', text: 'Slide 2 HM', dataMerge: 1, width: 500, dotContent: 'text2'},
    { id: 'slide-3', text: 'Slide 3 HM', dataMerge: 3, dotContent: 'text3'},
    { id: 'slide-4', text: 'Slide 4 HM', width: 450, dotContent: 'text4'},
    { id: 'slide-5', text: 'Slide 5 HM', dataMerge: 2, dotContent: 'text5'},
    // { text: 'Slide 6', dotContent: 'text5'},
    // { text: 'Slide 7', dotContent: 'text5'},
    // { text: 'Slide 8', dotContent: 'text5'},
    // { text: 'Slide 9', dotContent: 'text5'},
    // { text: 'Slide 10', dotContent: 'text5'},
  ];

  customOptions: OwlOptions = {
    autoWidth: true,
    loop: true,
    // items: '10',
    // margin: 10,
    // slideBy: 'page',
    // merge: true,
    // autoplay: true,
    // autoplayTimeout: 5000,
    // autoplayHoverPause: true,
		// autoplaySpeed: 4000,
    dotsSpeed: 500,
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

  currentUrl: any;
  fragment: string;

  activeSlides: SlidesOutputData;

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    // console.log(this.route.pathFromRoot);
    this.route.fragment.pipe(
      tap(fragment => this.fragment = fragment),
      // tap(() => console.log(this.fragment))
    ).subscribe(
      () => {}
    );

    this.route.url.pipe(
      tap(url => this.currentUrl = url[0].path),
      // tap(() => console.log(this.currentUrl))
    ).subscribe(
      () => {}
    )

  }

  moveToSS() {
    this.router.navigate(['/' + this.currentUrl], {fragment: 'second-section'});
  }

  getPassedData(data: any) {
    this.activeSlides = data;
    console.log('HomeComponent');
    console.log(this.activeSlides);
  }

  getChangeData(data: any) {
    this.activeSlides = data;
    console.log('HomeComponent -> change');
    console.log(data);
  }

  getChangedData(data: any) {
    this.activeSlides = data;
    console.log('HomeComponent -> changed');
    console.log(data);
  }
  removeLastSlide() {
    this.carouselData.splice(-1, 1);
  }
}
