import { OwlOptions } from "./owl-options.model";

export class OwlCarouselOConfig implements OwlOptions {
  items = 3;
  loop = false;
  center = false;
  rewind = false;

  mouseDrag = true;
  touchDrag = true;
  pullDrag = true;
  freeDrag = false;

  margin = 0;
  stagePadding = 0;

  merge = false;
  mergeFit = true;
  autoWidth = false;

  startPosition = 0;
  rtl = false;

  smartSpeed = 250;
  fluidSpeed = false;
  dragEndSpeed = false;

  responsive = {};
  responsiveRefreshRate = 200;

  // defaults to Navigation
  nav = false;
  navText = [ 'prev', 'next' ];
  navSpeed = false;
  navElement = 'div';
  navContainer = false;
  slideBy = 1;
  dots = true;
  dotsEach = false;
  dotsData = false;
  dotsSpeed = false;
  dotsContainer = false;
  constructor() { }
}
