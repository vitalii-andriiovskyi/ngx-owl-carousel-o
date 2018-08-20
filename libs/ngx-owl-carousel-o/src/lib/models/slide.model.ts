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
   * Changeable classes of slide
   */
  classes?: {[key:string]: boolean};

  /**
   * Shows whether slide could be animated and could have css-class '.animated'
   */
  isAnimated?: boolean;

  /**
   * Shows whether slide could be animated-in and could have css-class '.owl-animated-in'
   */
  isDefAnimatedIn?: boolean;
  /**
   * Shows whether slide could be animated-out and could have css-class '.owl-animated-out'
   */
  isDefAnimatedOut?: boolean;
  /**
   * Shows whether slide could be animated-in and could have animation css-class defined by user
   */
  isCustomAnimatedIn?: boolean;
  /**
   * Shows whether slide could be animated-out and could have animation css-class defined by user
   */
  isCustomAnimatedOut?: boolean;

  /**
   * State for defining the height of slide.It's values could be 'full' and 'nulled'. 'Full' sets css-height to 'auto', 'nulled' sets height to '0'.
   */
  heightState?: string;

  /**
   * Hash (fragment) of url which corresponds to slide
   */
  hashFragment?: string;
}