import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router, ActivatedRoute, RouterOutlet, RouterLink } from '@angular/router';
import { tap } from 'rxjs/operators';
import { SlidesOutputData, OwlOptions, CarouselModule } from 'ngx-owl-carousel-o';

interface CarouselData {
  id: string;
  text: string;
  dataMerge?: number;
  width: number;
  dotContent?: string;
  src?: string;
  dataHash?: string;
}


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CarouselModule, RouterOutlet, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  carouselData: WritableSignal<CarouselData[]> = signal([
    { id: 'slide-1', text: 'Slide 1 HM', dataMerge: 2, width: 300, dotContent: 'text1' },
    { id: 'slide-2', text: 'Slide 2 HM', dataMerge: 1, width: 500, dotContent: 'text2' },
    { id: 'slide-3', text: 'Slide 3 HM', dataMerge: 3, width: 500, dotContent: 'text3' },
    { id: 'slide-4', text: 'Slide 4 HM', width: 450, dotContent: 'text4' },
    { id: 'slide-5', text: 'Slide 5 HM', dataMerge: 2, width: 500, dotContent: 'text5' },
    { id: 'slide-6', text: 'Slide 6', width: 500, dotContent: 'text5' },
    { id: 'slide-7', text: 'Slide 7', width: 500, dotContent: 'text6' },
    { id: 'slide-8', text: 'Slide 8', width: 500, dotContent: 'text8' },
    // { id: 'slide-7', text: 'Slide 7', dotContent: 'text5'},
    // { id: 'slide-8', text: 'Slide 8', dotContent: 'text5'},
    // { id: 'slide-9', text: 'Slide 9', dotContent: 'text5'},
    // { id: 'slide-10', text: 'Slide 10', dotContent: 'text5'},
  ]);

  customOptions: OwlOptions = {
    // autoWidth: true,
    loop: false,
    // items: '10',
    // margin: 10,
    // slideBy: 'page',
    // merge: true,
    // autoplay: true,
    // autoplayTimeout: 5000,
    // autoplayHoverPause: true,
    // autoplaySpeed: 4000,
    dotsSpeed: 500,
    rewind: false,
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
    slideBy: 'page',
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

  currentUrl: WritableSignal<string> = signal('');
  fragment: WritableSignal<string | null> = signal('');

  activeSlides: WritableSignal<SlidesOutputData | null> = signal(null);

  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    // console.log(this.route.pathFromRoot);
    this.route.fragment.pipe(
      tap(fragment => this.fragment.set(fragment)),
      // tap(() => console.log('this.fragment', this.fragment()))
    ).subscribe(
      () => { }
    );

    this.route.url.pipe(
      tap(url => this.currentUrl.set(url[0].path)),
      // tap(() => console.log('this.currentUrl', this.currentUrl()))
    ).subscribe(
      () => { }
    )

  }

  moveToSS() {
    this.router.navigate(['/' + this.currentUrl()], { fragment: 'second-section' });
  }

  getPassedData(data: any) {
    this.activeSlides.set(data);
    console.log('HomeComponent');
    console.log(this.activeSlides());
  }

  getChangeData(data: any) {
    this.activeSlides.set(data);
    console.log('HomeComponent -> change');
    console.log(data);
  }

  getChangedData(data: any) {
    this.activeSlides.set(data);
    console.log('HomeComponent -> changed');
    console.log(data);
  }
  removeLastSlide() {
    this.carouselData.update((data) => {
      const res = [...data]
      res.splice(-1, 1)
      return res
    });
  }

  carouselChanged(evt: SlidesOutputData) {
    console.log(evt);
  }
}
