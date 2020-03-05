import { OwlOptions } from "../models/owl-options.model";
/**
 * Defaults value of options
 */
export declare class OwlCarouselOConfig implements OwlOptions {
    items: number;
    skip_validateItems: boolean;
    loop: boolean;
    center: boolean;
    rewind: boolean;
    mouseDrag: boolean;
    touchDrag: boolean;
    pullDrag: boolean;
    freeDrag: boolean;
    margin: number;
    stagePadding: number;
    merge: boolean;
    mergeFit: boolean;
    autoWidth: boolean;
    startPosition: number;
    rtl: boolean;
    smartSpeed: number;
    fluidSpeed: boolean;
    dragEndSpeed: boolean;
    responsive: {};
    responsiveRefreshRate: number;
    nav: boolean;
    navText: string[];
    navSpeed: boolean;
    slideBy: number;
    dots: boolean;
    dotsEach: boolean;
    dotsData: boolean;
    dotsSpeed: boolean;
    autoplay: boolean;
    autoplayTimeout: number;
    autoplayHoverPause: boolean;
    autoplaySpeed: boolean;
    lazyLoad: boolean;
    lazyLoadEager: number;
    slideTransition: string;
    animateOut: boolean;
    animateIn: boolean;
    autoHeight: boolean;
    URLhashListener: boolean;
    constructor();
}
/**
 * we can't read types from OwlOptions in javascript because of props have undefined value and types of those props are used for validating inputs
 * class below is copy of OwlOptions but its all props have string value showing certain type;
 * this is class is being used just in method _validateOptions() of CarouselService;
 */
export declare class OwlOptionsMockedTypes {
    items: string;
    skip_validateItems: string;
    loop: string;
    center: string;
    rewind: string;
    mouseDrag: string;
    touchDrag: string;
    pullDrag: string;
    freeDrag: string;
    margin: string;
    stagePadding: string;
    merge: string;
    mergeFit: string;
    autoWidth: string;
    startPosition: string;
    rtl: string;
    smartSpeed: string;
    fluidSpeed: string;
    dragEndSpeed: string;
    responsive: {};
    responsiveRefreshRate: string;
    nav: string;
    navText: string;
    navSpeed: string;
    slideBy: string;
    dots: string;
    dotsEach: string;
    dotsData: string;
    dotsSpeed: string;
    autoplay: string;
    autoplayTimeout: string;
    autoplayHoverPause: string;
    autoplaySpeed: string;
    lazyLoad: string;
    lazyLoadEager: string;
    slideTransition: string;
    animateOut: string;
    animateIn: string;
    autoHeight: string;
    URLhashListener: string;
    constructor();
}
