export class OwlCarouselOConfig {
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
  // responsiveBaseElement = window, delet;

  fallbackEasing = 'swing';

  info = false;
  constructor() { }
}
