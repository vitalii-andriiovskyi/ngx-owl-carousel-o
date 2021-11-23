import { SlideModel } from './slide.model';

/**
 * Data which will be passed out after ending of transition of carousel
 */

export class SlidesOutputData {
  startPosition?: number;
  slides?: SlideModel[];
};
