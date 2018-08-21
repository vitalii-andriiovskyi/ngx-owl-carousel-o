import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { tap } from 'node_modules/rxjs/operators';
import { CarouselData } from '../../app.component';
import { SlidesOutputData } from 'ngx-owl-carousel-o';

@Component({
  selector: 'owl-carousel-libdemo-subhome',
  templateUrl: './subhome.component.html',
  styleUrls: ['./subhome.component.sass']
})
export class SubHomeComponent implements OnInit {
  currentUrl: any;
  fragment: string;
  carouselData: CarouselData[] = [
    { text: 'Slide 1', src: 'assets/images/350x450&text=1.png', dataHash: 'one'},
    { text: 'Slide 2', src: 'assets/images/350x650&text=2.png', dataHash: 'two'},
    { text: 'Slide 3', src: 'assets/images/350x250&text=3-fallback.png', dataHash: 'three'},
    { text: 'Slide 4', src: 'assets/images/350x250&text=4.png', dataHash: 'four'},
    { text: 'Slide 5', src: 'assets/images/350x250&text=5.png', dataHash: 'five'},
    // { text: 'Slide 6', dotContent: 'text5'},
    // { text: 'Slide 7', dotContent: 'text5'},
    // { text: 'Slide 8', dotContent: 'text5'},
    // { text: 'Slide 9', dotContent: 'text5'},
    // { text: 'Slide 10', dotContent: 'text5'},
  ];
customOptions: any = {
    loop: true,
    autoHeight: true,
    nav: true,
    center: true,
    URLhashListener:true,
    startPosition: 'URLHash',
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
  }

  activeSlides: SlidesOutputData;

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
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
    this.router.navigate(['./'], {fragment: 'subhome-section-4', relativeTo: this.route});
  }

  getPassedData(data: any) {
    this.activeSlides = data;
    console.log('SubHomeComponent');
    console.log(this.activeSlides);
  }

}
