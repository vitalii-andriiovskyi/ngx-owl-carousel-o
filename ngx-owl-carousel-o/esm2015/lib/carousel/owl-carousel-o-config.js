/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Defaults value of options
 */
export class OwlCarouselOConfig {
    constructor() {
        this.items = 3;
        this.skip_validateItems = false;
        this.loop = false;
        this.center = false;
        this.rewind = false;
        this.mouseDrag = true;
        this.touchDrag = true;
        this.pullDrag = true;
        this.freeDrag = false;
        this.margin = 0;
        this.stagePadding = 0;
        this.merge = false;
        this.mergeFit = true;
        this.autoWidth = false;
        this.startPosition = 0;
        this.rtl = false;
        this.smartSpeed = 250;
        this.fluidSpeed = false;
        this.dragEndSpeed = false;
        this.responsive = {};
        this.responsiveRefreshRate = 200;
        // defaults to Navigation
        this.nav = false;
        this.navText = ['prev', 'next'];
        this.navSpeed = false;
        this.slideBy = 1; // stage moves on 1 width of slide; if slideBy = 2, stage moves on 2 widths of slide
        this.dots = true;
        this.dotsEach = false;
        this.dotsData = false;
        this.dotsSpeed = false;
        // defaults to Autoplay
        this.autoplay = false;
        this.autoplayTimeout = 5000;
        this.autoplayHoverPause = false;
        this.autoplaySpeed = false;
        this.autoplayMouseleaveTimeout = 1;
        // defaults to LazyLoading
        this.lazyLoad = false;
        this.lazyLoadEager = 0;
        // defaults to Animate
        this.slideTransition = '';
        this.animateOut = false;
        this.animateIn = false;
        // defaults to AutoHeight
        this.autoHeight = false;
        // defaults to Hash
        this.URLhashListener = false;
    }
}
if (false) {
    /** @type {?} */
    OwlCarouselOConfig.prototype.items;
    /** @type {?} */
    OwlCarouselOConfig.prototype.skip_validateItems;
    /** @type {?} */
    OwlCarouselOConfig.prototype.loop;
    /** @type {?} */
    OwlCarouselOConfig.prototype.center;
    /** @type {?} */
    OwlCarouselOConfig.prototype.rewind;
    /** @type {?} */
    OwlCarouselOConfig.prototype.mouseDrag;
    /** @type {?} */
    OwlCarouselOConfig.prototype.touchDrag;
    /** @type {?} */
    OwlCarouselOConfig.prototype.pullDrag;
    /** @type {?} */
    OwlCarouselOConfig.prototype.freeDrag;
    /** @type {?} */
    OwlCarouselOConfig.prototype.margin;
    /** @type {?} */
    OwlCarouselOConfig.prototype.stagePadding;
    /** @type {?} */
    OwlCarouselOConfig.prototype.merge;
    /** @type {?} */
    OwlCarouselOConfig.prototype.mergeFit;
    /** @type {?} */
    OwlCarouselOConfig.prototype.autoWidth;
    /** @type {?} */
    OwlCarouselOConfig.prototype.startPosition;
    /** @type {?} */
    OwlCarouselOConfig.prototype.rtl;
    /** @type {?} */
    OwlCarouselOConfig.prototype.smartSpeed;
    /** @type {?} */
    OwlCarouselOConfig.prototype.fluidSpeed;
    /** @type {?} */
    OwlCarouselOConfig.prototype.dragEndSpeed;
    /** @type {?} */
    OwlCarouselOConfig.prototype.responsive;
    /** @type {?} */
    OwlCarouselOConfig.prototype.responsiveRefreshRate;
    /** @type {?} */
    OwlCarouselOConfig.prototype.nav;
    /** @type {?} */
    OwlCarouselOConfig.prototype.navText;
    /** @type {?} */
    OwlCarouselOConfig.prototype.navSpeed;
    /** @type {?} */
    OwlCarouselOConfig.prototype.slideBy;
    /** @type {?} */
    OwlCarouselOConfig.prototype.dots;
    /** @type {?} */
    OwlCarouselOConfig.prototype.dotsEach;
    /** @type {?} */
    OwlCarouselOConfig.prototype.dotsData;
    /** @type {?} */
    OwlCarouselOConfig.prototype.dotsSpeed;
    /** @type {?} */
    OwlCarouselOConfig.prototype.autoplay;
    /** @type {?} */
    OwlCarouselOConfig.prototype.autoplayTimeout;
    /** @type {?} */
    OwlCarouselOConfig.prototype.autoplayHoverPause;
    /** @type {?} */
    OwlCarouselOConfig.prototype.autoplaySpeed;
    /** @type {?} */
    OwlCarouselOConfig.prototype.lazyLoad;
    /** @type {?} */
    OwlCarouselOConfig.prototype.lazyLoadEager;
    /** @type {?} */
    OwlCarouselOConfig.prototype.animateOut;
    /** @type {?} */
    OwlCarouselOConfig.prototype.animateIn;
    /** @type {?} */
    OwlCarouselOConfig.prototype.autoHeight;
    /** @type {?} */
    OwlCarouselOConfig.prototype.URLhashListener;
}
/**
 * we can't read types from OwlOptions in javascript because of props have undefined value and types of those props are used for validating inputs
 * class below is copy of OwlOptions but its all props have string value showing certain type;
 * this is class is being used just in method _validateOptions() of CarouselService;
 */
export class OwlOptionsMockedTypes {
    constructor() {
        this.items = 'number';
        this.skip_validateItems = 'boolean';
        this.loop = 'boolean';
        this.center = 'boolean';
        this.rewind = 'boolean';
        this.mouseDrag = 'boolean';
        this.touchDrag = 'boolean';
        this.pullDrag = 'boolean';
        this.freeDrag = 'boolean';
        this.margin = 'number';
        this.stagePadding = 'number';
        this.merge = 'boolean';
        this.mergeFit = 'boolean';
        this.autoWidth = 'boolean';
        this.startPosition = 'number|string';
        this.rtl = 'boolean';
        this.smartSpeed = 'number';
        this.fluidSpeed = 'boolean';
        this.dragEndSpeed = 'number|boolean';
        this.responsive = {};
        this.responsiveRefreshRate = 'number';
        // defaults to Navigation
        this.nav = 'boolean';
        this.navText = 'string[]';
        this.navSpeed = 'number|boolean';
        this.slideBy = 'number|string'; // stage moves on 1 width of slide; if slideBy = 2, stage moves on 2 widths of slide
        this.dots = 'boolean';
        this.dotsEach = 'number|boolean';
        this.dotsData = 'boolean';
        this.dotsSpeed = 'number|boolean';
        // defaults to Autoplay
        this.autoplay = 'boolean';
        this.autoplayTimeout = 'number';
        this.autoplayHoverPause = 'boolean';
        this.autoplaySpeed = 'number|boolean';
        this.autoplayMouseleaveTimeout = 'number';
        // defaults to LazyLoading
        this.lazyLoad = 'boolean';
        this.lazyLoadEager = 'number';
        // defaults to Animate
        this.slideTransition = 'string';
        this.animateOut = 'string|boolean';
        this.animateIn = 'string|boolean';
        // defaults to AutoHeight
        this.autoHeight = 'boolean';
        // defaults to Hash
        this.URLhashListener = "boolean";
    }
}
