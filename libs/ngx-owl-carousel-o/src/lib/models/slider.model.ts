import { TemplateRef } from "@angular/core";

export class SliderModel {

  /**
   * Id of slide
   */
  id: string;

  /**
   * Active state of slide. If true slide gets css-class .active
   */
  active?: boolean;

  /**
   * TemplateRef of slide. In other words its html-markup
   */
  tplRef?: TemplateRef<any>;

  /**
   * Number of grid parts to be used
   */
  dataMerge?: number;

  /**
   * Width of slide
   */
  width?: number | string;

  /**
   * Css-rule 'margin-left'
   */
  marginL?: number | string;

  /**
   * Css-rule 'margin-right'
   */
  marginR?: number | string;

  /**
   * Make slide to be on center of the carousel
   */
  center?: boolean;

  /**
   * Cloned slide. It's being used when 'loop'=true
   */
  cloned?: boolean;

  /**
   * Indicates whether slide should be lazy loaded
   */
  load?: boolean;
}