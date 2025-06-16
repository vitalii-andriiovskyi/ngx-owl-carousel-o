import { Directive, TemplateRef, input } from '@angular/core';

let nextId = 0;

@Directive({
  selector: 'ng-template[carouselSlide]',
  standalone: false
})
export class CarouselSlideDirective {
  /**
   * Unique slide identifier. Must be unique for the entire document for proper accessibility support.
   * Will be auto-generated if not provided.
   */
  id = input<string>(`owl-slide-${nextId++}`);

  /**
   * Defines how much widths of common slide will current slide have
   * e.g. if dataMerge=2, the slide will twice wider then slides with dataMerge=1
   */
  dataMerge = input(1, {
    transform: (data: number) => {
      return +data || 1;
    }
  });


  /**
   * Width of slide
   */
  width = input(0);

  /**
   * Inner content of dot for certain slide; can be html-markup
   */
  dotContent = input('');

  /**
   * Hash (fragment) of url which corresponds to certain slide
   */
  dataHash = input<string>('');

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
