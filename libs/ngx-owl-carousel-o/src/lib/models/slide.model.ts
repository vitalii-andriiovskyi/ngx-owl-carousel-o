import { TemplateRef } from "@angular/core";

export class SlideModel {

  /**
   * Id of slide
   */
  id: string;

  /**
   * Active state of slide. If true slide gets css-class .active
   */
  isActive?: boolean;

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
  isCentered?: boolean;

  /**
   * Cloned slide. It's being used when 'loop'=true
   */
  isCloned?: boolean;

  /**
   * Indicates whether slide should be lazy loaded
   */
  load?: boolean;

  /**
   * Css-rule 'left'
   */
  left?: number | string;

  /**
   * Classes
   */
  classes?: {[key:string]: boolean};

}