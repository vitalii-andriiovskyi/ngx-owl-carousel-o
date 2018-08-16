import { Component, OnInit, Input } from '@angular/core';
import { CarouselService } from '../../services/carousel.service';

@Component({
  selector: 'owl-image',
  template: `
  <picture>
    <ng-container *ngFor="let source of sources">
      <source [srcset]="source.srcset" [media]="source.media" [type]="source.type">
    </ng-container>
    <img [src]="src" [alt]="alt" [title]="title" [srcset]="srcset" [sizes]="sizes">
  </picture>
  `,
  styles: ['']
})
export class OwlImageComponent implements OnInit {
  /**
   * Id of slide which should contain this compoment
   */
  @Input() slideId: string;

  /**
   * Attribute 'src' of tag <img>
   */
  @Input() src: string;

  /**
   * Attribute 'alt' of tag <img>
   */
  @Input() alt: string;

  /**
   * Attribute 'title' of tag <img>
   */
  @Input() title: string;

  /**
   * Attribute 'srcset' of tag <img>
   */
  @Input() srcset: string;

  /**
   * Attribute 'sizes' of tag <img>
   */
  @Input() sizes: string;

  /**
   * Attribute 'sizes' of tag <img>
   */
  @Input() sources: any[];
  constructor(private carouselService: CarouselService) { }

  ngOnInit() {
  }

  loaded() {

  }

}
