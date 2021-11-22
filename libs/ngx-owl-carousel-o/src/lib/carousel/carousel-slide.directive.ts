import { Input, Directive, TemplateRef } from '@angular/core';

let nextId = 0;

@Directive({ selector: 'ng-template[carouselSlide]' })
export class CarouselSlideDirective {
  /**
   * Unique slide identifier. Must be unique for the entire document for proper accessibility support.
   * Will be auto-generated if not provided.
   */
  @Input() id = `owl-slide-${nextId++}`;

  /**
   * Defines how much widths of common slide will current slide have
   * e.g. if _mergeData=2, the slide will twice wider then slides with _mergeData=1
   */
  private _dataMerge = 1;
  @Input()
  set dataMerge(data: number) {
    this._dataMerge = this.isNumeric(data) ? data : 1;
  };
  get dataMerge(): number { return this._dataMerge; }

  /**
   * Width of slide
   */
  @Input() width = 0;

  /**
   * Inner content of dot for certain slide; can be html-markup
   */
  @Input() dotContent = '';

  /**
   * Hash (fragment) of url which corresponds to certain slide
   */
  @Input() dataHash = '';

  constructor(public tplRef: TemplateRef<any>) { }

  /**
     * Determines if the input is a Number or something that can be coerced to a Number
     * @param - The input to be tested
     * @returns - An indication if the input is a Number or can be coerced to a Number
     */
  isNumeric(number: any): boolean {
    return !isNaN(parseFloat(number));
  }
}
