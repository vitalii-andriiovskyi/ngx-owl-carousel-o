export class ResponsiveSettings {
  [key: number]: { items: number}
}
export class OwlOptions {
  items?: number;
  loop?: boolean;
  center?: boolean;
  rewind?: boolean;

  mouseDrag?: boolean;
  touchDrag?: boolean;
  pullDrag?: boolean;
  freeDrag?: boolean;

  margin?: number;
  stagePadding?: number;

  merge?: boolean;
  mergeFit?: boolean;
  autoWidth?: boolean;

  startPosition?: number;
  rtl?: boolean;

  smartSpeed?: number;
  fluidSpeed?: boolean;
  dragEndSpeed?: boolean;

  responsive?: ResponsiveSettings;
  responsiveRefreshRate?: number;

  // Navigation
  nav?: boolean;
  navText?: string[];
  navSpeed?: boolean;
  navContainer?: boolean;
  slideBy?: number | string;
  dots?: boolean;
  dotsEach?: boolean;
  dotsData?: boolean;
  dotsSpeed?: boolean;
  dotsContainer?: boolean;

  constructor() { }
}
