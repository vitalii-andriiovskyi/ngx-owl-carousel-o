import { OwlOptions } from "../models/owl-options.model";

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
  slideBy = 1; // stage moves on 1 width of slide; if slideBy = 2, stage moves on 2 widths of slide
  dots = true;
  dotsEach = false;
  dotsData = false;
  dotsSpeed = false;

  // defaults to Autoplay
  autoplay: false;
  autoplayTimeout: 5000;
  autoplayHoverPause: false;
  autoplaySpeed: false;
  constructor() { }
}

// although we can't read types from OwlOptions in javascript as props have value undefined and types are used for validating inputs
// class below is copy of OwlOptions but its all props have string value showing certain type;
// this is class is being used just in method _validateOptions of CarouselService;
export class OwlOptionsMockedTypes {
  items = 'number';
  loop = 'boolean';
  center = 'boolean';
  rewind = 'boolean';

  mouseDrag = 'boolean';
  touchDrag = 'boolean';
  pullDrag = 'boolean';
  freeDrag = 'boolean';

  margin = 'number';
  stagePadding = 'number';

  merge = 'boolean';
  mergeFit = 'boolean';
  autoWidth = 'boolean';

  startPosition = 'number';
  rtl = 'boolean';

  smartSpeed = 'number';
  fluidSpeed = 'boolean';
  dragEndSpeed = 'number|boolean';

  responsive = {};
  responsiveRefreshRate = 'number';

  // defaults to Navigation
  nav = 'boolean';
  navText = 'string[]';
  navSpeed = 'number|boolean';
  slideBy = 'number|string'; // stage moves on 1 width of slide; if slideBy = 2, stage moves on 2 widths of slide
  dots = 'boolean';
  dotsEach = 'number|boolean';
  dotsData = 'boolean';
  dotsSpeed = 'number|boolean';

  // defaults to Autoplay
  autoplay: 'boolean';
  autoplayTimeout: 'number';
  autoplayHoverPause: 'boolean';
  autoplaySpeed: 'number|boolean';
  constructor() { }
}