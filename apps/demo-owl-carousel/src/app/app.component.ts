import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';

export interface CarouselData {
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
  standalone: true,
  imports: [CommonModule, RouterOutlet, CarouselModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
}
