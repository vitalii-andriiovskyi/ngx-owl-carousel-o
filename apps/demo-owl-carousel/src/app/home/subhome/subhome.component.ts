import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { tap } from 'rxjs/operators';
import { SlidesOutputData, OwlOptions, CarouselModule } from 'ngx-owl-carousel-o';

interface CarouselData {
  id?: string;
  text: string;
  dataMerge?: number;
  width?: number;
  dotContent?: string;
  src?: string;
  dataHash: string;
}

@Component({
  selector: 'app-subhome',
  standalone: true,
  imports: [CommonModule, RouterLink, CarouselModule],
  templateUrl: './subhome.component.html',
  styleUrl: './subhome.component.scss'
})
export class SubhomeComponent implements OnInit {
  currentUrl: WritableSignal<string> = signal('');
  fragment: WritableSignal<string | null> = signal('');
  carouselData: CarouselData[] = [
    { text: 'Slide 1', src: 'assets/images/350x450&text=1.png', dataHash: 'one' },
    { text: 'Slide 2', src: 'assets/images/350x650&text=2.png', dataHash: 'two' },
    { text: 'Slide 3', src: 'assets/images/350x250&text=3-fallback.png', dataHash: 'three' },
    { text: 'Slide 4', src: 'assets/images/350x250&text=4.png', dataHash: 'four' },
    { text: 'Slide 5', src: 'assets/images/350x250&text=5.png', dataHash: 'five' },
    // { text: 'Slide 6', dotContent: 'text5'},
    // { text: 'Slide 7', dotContent: 'text5'},
    // { text: 'Slide 8', dotContent: 'text5'},
    // { text: 'Slide 9', dotContent: 'text5'},
    // { text: 'Slide 10', dotContent: 'text5'},
  ];
  customOptions: OwlOptions = {
    loop: true,
    autoHeight: true,
    nav: true,
    center: true,
    URLhashListener: true,
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

  activeSlides: WritableSignal<SlidesOutputData | null> = signal(null);

  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.fragment.pipe(
      tap(fragment => this.fragment.set(fragment as string)),
      // tap(() => console.log('this.fragment()', this.fragment()))
    ).subscribe(
      () => { }
    );

    this.route.url.pipe(
      tap(url => this.currentUrl.set(url[0].path)),
      // tap(() => console.log('this.currentUrl()', this.currentUrl()))
    ).subscribe(
      () => { }
    )
  }

  moveToSS() {
    this.router.navigate(['./'], { fragment: 'subhome-section-4', relativeTo: this.route });
  }

  getPassedData(data: any) {
    this.activeSlides.set(data);
    console.log('SubHomeComponent');
    console.log(this.activeSlides());
  }
}
