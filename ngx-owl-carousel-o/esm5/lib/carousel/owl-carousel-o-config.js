/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Defaults value of options
 */
var /**
 * Defaults value of options
 */
var OwlCarouselOConfig = /** @class */ (function () {
    function OwlCarouselOConfig() {
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
    return OwlCarouselOConfig;
}());
export { OwlCarouselOConfig };
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
var OwlOptionsMockedTypes = /** @class */ (function () {
    function OwlOptionsMockedTypes() {
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
    return OwlOptionsMockedTypes;
}());
export { OwlOptionsMockedTypes };
if (false) {
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.items;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.skip_validateItems;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.loop;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.center;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.rewind;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.mouseDrag;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.touchDrag;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.pullDrag;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.freeDrag;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.margin;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.stagePadding;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.merge;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.mergeFit;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.autoWidth;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.startPosition;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.rtl;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.smartSpeed;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.fluidSpeed;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.dragEndSpeed;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.responsive;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.responsiveRefreshRate;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.nav;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.navText;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.navSpeed;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.slideBy;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.dots;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.dotsEach;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.dotsData;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.dotsSpeed;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.autoplay;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.autoplayTimeout;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.autoplayHoverPause;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.autoplaySpeed;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.lazyLoad;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.lazyLoadEager;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.animateOut;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.animateIn;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.autoHeight;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.URLhashListener;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3dsLWNhcm91c2VsLW8tY29uZmlnLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW93bC1jYXJvdXNlbC1vLyIsInNvdXJjZXMiOlsibGliL2Nhcm91c2VsL293bC1jYXJvdXNlbC1vLWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBS0E7Ozs7SUEwREU7UUF6REEsVUFBSyxHQUFHLENBQUMsQ0FBQztRQUNWLHVCQUFrQixHQUFHLEtBQUssQ0FBQztRQUMzQixTQUFJLEdBQUcsS0FBSyxDQUFDO1FBQ2IsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUNmLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFFZixjQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFDakIsYUFBUSxHQUFHLElBQUksQ0FBQztRQUNoQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBRWpCLFdBQU0sR0FBRyxDQUFDLENBQUM7UUFDWCxpQkFBWSxHQUFHLENBQUMsQ0FBQztRQUVqQixVQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ2QsYUFBUSxHQUFHLElBQUksQ0FBQztRQUNoQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBRWxCLGtCQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLFFBQUcsR0FBRyxLQUFLLENBQUM7UUFFWixlQUFVLEdBQUcsR0FBRyxDQUFDO1FBQ2pCLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFFckIsZUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNoQiwwQkFBcUIsR0FBRyxHQUFHLENBQUM7UUFFNUIseUJBQXlCO1FBQ3pCLFFBQUcsR0FBRyxLQUFLLENBQUM7UUFDWixZQUFPLEdBQUcsQ0FBRSxNQUFNLEVBQUUsTUFBTSxDQUFFLENBQUM7UUFDN0IsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixZQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsb0ZBQW9GO1FBQ2pHLFNBQUksR0FBRyxJQUFJLENB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QiwwQ0FBNkI7O0lBRzdCLDJDQUF1Qjs7SUFHdkIsZ0RBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3dsT3B0aW9ucyB9IGZyb20gXCIuLi9tb2RlbHMvb3dsLW9wdGlvbnMubW9kZWxcIjtcclxuXHJcbi8qKlxyXG4gKiBEZWZhdWx0cyB2YWx1ZSBvZiBvcHRpb25zXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgT3dsQ2Fyb3VzZWxPQ29uZmlnIGltcGxlbWVudHMgT3dsT3B0aW9ucyB7XHJcbiAgaXRlbXMgPSAzO1xyXG4gIHNraXBfdmFsaWRhdGVJdGVtcyA9IGZhbHNlO1xyXG4gIGxvb3AgPSBmYWxzZTtcclxuICBjZW50ZXIgPSBmYWxzZTtcclxuICByZXdpbmQgPSBmYWxzZTtcclxuXHJcbiAgbW91c2VEcmFnID0gdHJ1ZTtcclxuICB0b3VjaERyYWcgPSB0cnVlO1xyXG4gIHB1bGxEcmFnID0gdHJ1ZTtcclxuICBmcmVlRHJhZyA9IGZhbHNlO1xyXG5cclxuICBtYXJnaW4gPSAwO1xyXG4gIHN0YWdlUGFkZGluZyA9IDA7XHJcblxyXG4gIG1lcmdlID0gZmFsc2U7XHJcbiAgbWVyZ2VGaXQgPSB0cnVlO1xyXG4gIGF1dG9XaWR0aCA9IGZhbHNlO1xyXG5cclxuICBzdGFydFBvc2l0aW9uID0gMDtcclxuICBydGwgPSBmYWxzZTtcclxuXHJcbiAgc21hcnRTcGVlZCA9IDI1MDtcclxuICBmbHVpZFNwZWVkID0gZmFsc2U7XHJcbiAgZHJhZ0VuZFNwZWVkID0gZmFsc2U7XHJcblxyXG4gIHJlc3BvbnNpdmUgPSB7fTtcclxuICByZXNwb25zaXZlUmVmcmVzaFJhdGUgPSAyMDA7XHJcblxyXG4gIC8vIGRlZmF1bHRzIHRvIE5hdmlnYXRpb25cclxuICBuYXYgPSBmYWxzZTtcclxuICBuYXZUZXh0ID0gWyAncHJldicsICduZXh0JyBdO1xyXG4gIG5hdlNwZWVkID0gZmFsc2U7XHJcbiAgc2xpZGVCeSA9IDE7IC8vIHN0YWdlIG1vdmVzIG9uIDEgd2lkdGggb2Ygc2xpZGU7IGlmIHNsaWRlQnkgPSAyLCBzdGFnZSBtb3ZlcyBvbiAyIHdpZHRocyBvZiBzbGlkZVxyXG4gIGRvdHMgPSB0cnVlO1xyXG4gIGRvdHNFYWNoID0gZmFsc2U7XHJcbiAgZG90c0RhdGEgPSBmYWxzZTtcclxuICBkb3RzU3BlZWQgPSBmYWxzZTtcclxuXHJcbiAgLy8gZGVmYXVsdHMgdG8gQXV0b3BsYXlcclxuICBhdXRvcGxheSA9IGZhbHNlO1xyXG4gIGF1dG9wbGF5VGltZW91dCA9IDUwMDA7XHJcbiAgYXV0b3BsYXlIb3ZlclBhdXNlID0gZmFsc2U7XHJcbiAgYXV0b3BsYXlTcGVlZCA9IGZhbHNlO1xyXG5cclxuICAvLyBkZWZhdWx0cyB0byBMYXp5TG9hZGluZ1xyXG4gIGxhenlMb2FkID0gZmFsc2U7XHJcbiAgbGF6eUxvYWRFYWdlciA9IDA7XHJcblxyXG4gIC8vIGRlZmF1bHRzIHRvIEFuaW1hdGVcclxuICBhbmltYXRlT3V0ID0gZmFsc2U7XHJcbiAgYW5pbWF0ZUluID0gZmFsc2U7XHJcblxyXG4gIC8vIGRlZmF1bHRzIHRvIEF1dG9IZWlnaHRcclxuICBhdXRvSGVpZ2h0ID0gZmFsc2U7XHJcblxyXG4gIC8vIGRlZmF1bHRzIHRvIEhhc2hcclxuICBVUkxoYXNoTGlzdGVuZXIgPSBmYWxzZTtcclxuICBjb25zdHJ1Y3RvcigpIHsgfVxyXG59XHJcblxyXG4vKipcclxuICogd2UgY2FuJ3QgcmVhZCB0eXBlcyBmcm9tIE93bE9wdGlvbnMgaW4gamF2YXNjcmlwdCBiZWNhdXNlIG9mIHByb3BzIGhhdmUgdW5kZWZpbmVkIHZhbHVlIGFuZCB0eXBlcyBvZiB0aG9zZSBwcm9wcyBhcmUgdXNlZCBmb3IgdmFsaWRhdGluZyBpbnB1dHNcclxuICogY2xhc3MgYmVsb3cgaXMgY29weSBvZiBPd2xPcHRpb25zIGJ1dCBpdHMgYWxsIHByb3BzIGhhdmUgc3RyaW5nIHZhbHVlIHNob3dpbmcgY2VydGFpbiB0eXBlO1xyXG4gKiB0aGlzIGlzIGNsYXNzIGlzIGJlaW5nIHVzZWQganVzdCBpbiBtZXRob2QgX3ZhbGlkYXRlT3B0aW9ucygpIG9mIENhcm91c2VsU2VydmljZTtcclxuICovXHJcbmV4cG9ydCBjbGFzcyBPd2xPcHRpb25zTW9ja2VkVHlwZXMge1xyXG4gIGl0ZW1zID0gJ251bWJlcic7XHJcbiAgc2tpcF92YWxpZGF0ZUl0ZW1zID0gJ2Jvb2xlYW4nO1xyXG4gIGxvb3AgPSAnYm9vbGVhbic7XHJcbiAgY2VudGVyID0gJ2Jvb2xlYW4nO1xyXG4gIHJld2luZCA9ICdib29sZWFuJztcclxuXHJcbiAgbW91c2VEcmFnID0gJ2Jvb2xlYW4nO1xyXG4gIHRvdWNoRHJhZyA9ICdib29sZWFuJztcclxuICBwdWxsRHJhZyA9ICdib29sZWFuJztcclxuICBmcmVlRHJhZyA9ICdib29sZWFuJztcclxuXHJcbiAgbWFyZ2luID0gJ251bWJlcic7XHJcbiAgc3RhZ2VQYWRkaW5nID0gJ251bWJlcic7XHJcblxyXG4gIG1lcmdlID0gJ2Jvb2xlYW4nO1xyXG4gIG1lcmdlRml0ID0gJ2Jvb2xlYW4nO1xyXG4gIGF1dG9XaWR0aCA9ICdib29sZWFuJztcclxuXHJcbiAgc3RhcnRQb3NpdGlvbiA9ICdudW1iZXJ8c3RyaW5nJztcclxuICBydGwgPSAnYm9vbGVhbic7XHJcblxyXG4gIHNtYXJ0U3BlZWQgPSAnbnVtYmVyJztcclxuICBmbHVpZFNwZWVkID0gJ2Jvb2xlYW4nO1xyXG4gIGRyYWdFbmRTcGVlZCA9ICdudW1iZXJ8Ym9vbGVhbic7XHJcblxyXG4gIHJlc3BvbnNpdmUgPSB7fTtcclxuICByZXNwb25zaXZlUmVmcmVzaFJhdGUgPSAnbnVtYmVyJztcclxuXHJcbiAgLy8gZGVmYXVsdHMgdG8gTmF2aWdhdGlvblxyXG4gIG5hdiA9ICdib29sZWFuJztcclxuICBuYXZUZXh0ID0gJ3N0cmluZ1tdJztcclxuICBuYXZTcGVlZCA9ICdudW1iZXJ8Ym9vbGVhbic7XHJcbiAgc2xpZGVCeSA9ICdudW1iZXJ8c3RyaW5nJzsgLy8gc3RhZ2UgbW92ZXMgb24gMSB3aWR0aCBvZiBzbGlkZTsgaWYgc2xpZGVCeSA9IDIsIHN0YWdlIG1vdmVzIG9uIDIgd2lkdGhzIG9mIHNsaWRlXHJcbiAgZG90cyA9ICdib29sZWFuJztcclxuICBkb3RzRWFjaCA9ICdudW1iZXJ8Ym9vbGVhbic7XHJcbiAgZG90c0RhdGEgPSAnYm9vbGVhbic7XHJcbiAgZG90c1NwZWVkID0gJ251bWJlcnxib29sZWFuJztcclxuXHJcbiAgLy8gZGVmYXVsdHMgdG8gQXV0b3BsYXlcclxuICBhdXRvcGxheSA9ICdib29sZWFuJztcclxuICBhdXRvcGxheVRpbWVvdXQgPSAnbnVtYmVyJztcclxuICBhdXRvcGxheUhvdmVyUGF1c2UgPSAnYm9vbGVhbic7XHJcbiAgYXV0b3BsYXlTcGVlZCA9ICdudW1iZXJ8Ym9vbGVhbic7XHJcblxyXG4gIC8vIGRlZmF1bHRzIHRvIExhenlMb2FkaW5nXHJcbiAgbGF6eUxvYWQgPSAnYm9vbGVhbic7XHJcbiAgbGF6eUxvYWRFYWdlciA9ICdudW1iZXInO1xyXG5cclxuICAvLyBkZWZhdWx0cyB0byBBbmltYXRlXHJcbiAgYW5pbWF0ZU91dCA9ICdzdHJpbmd8Ym9vbGVhbic7XHJcbiAgYW5pbWF0ZUluID0gJ3N0cmluZ3xib29sZWFuJztcclxuXHJcbiAgLy8gZGVmYXVsdHMgdG8gQXV0b0hlaWdodFxyXG4gIGF1dG9IZWlnaHQgPSAnYm9vbGVhbic7XHJcblxyXG4gIC8vIGRlZmF1bHRzIHRvIEhhc2hcclxuICBVUkxoYXNoTGlzdGVuZXIgPSBcImJvb2xlYW5cIjtcclxuICBjb25zdHJ1Y3RvcigpIHsgfVxyXG59Il19
