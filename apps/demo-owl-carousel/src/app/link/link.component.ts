import { Component, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CarouselData } from '../app.component';

@Component({
  selector: 'app-link',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './link.component.html',
  styleUrl: './link.component.sass'
})
export class LinkComponent {
  isDragging: WritableSignal<boolean> = signal(false);
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
  customOptions: any = {
    loop: true,
    // autoHeight: true,
    nav: true,
    // center: true,
    // URLhashListener:true,
    // startPosition: 'URLHash',
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
}
