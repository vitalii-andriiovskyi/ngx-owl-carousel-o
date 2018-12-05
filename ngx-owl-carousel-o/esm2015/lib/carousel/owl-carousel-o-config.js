/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Defaults value of options
 */
export class OwlCarouselOConfig {
    constructor() {
        this.items = 3;
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
        this.animateOut = 'string|boolean';
        this.animateIn = 'string|boolean';
        // defaults to AutoHeight
        this.autoHeight = 'boolean';
        // defaults to Hash
        this.URLhashListener = "boolean";
    }
}
if (false) {
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.items;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3dsLWNhcm91c2VsLW8tY29uZmlnLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW93bC1jYXJvdXNlbC1vLyIsInNvdXJjZXMiOlsibGliL2Nhcm91c2VsL293bC1jYXJvdXNlbC1vLWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBS0EsTUFBTTtJQXlESjtRQXhEQSxVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsU0FBSSxHQUFHLEtBQUssQ0FBQztRQUNiLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDZixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBRWYsY0FBUyxHQUFHLElBQUksQ0FBQztRQUNqQixjQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUVqQixXQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsaUJBQVksR0FBRyxDQUFDLENBQUM7UUFFakIsVUFBSyxHQUFHLEtBQUssQ0FBQztRQUNkLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUVsQixrQkFBYSxHQUFHLENBQUMsQ0FBQztRQUNsQixRQUFHLEdBQUcsS0FBSyxDQUFDO1FBRVosZUFBVSxHQUFHLEdBQUcsQ0FBQztRQUNqQixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBRXJCLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFDaEIsMEJBQXFCLEdBQUcsR0FBRyxDQUFDO1FBRTVCLHlCQUF5QjtRQUN6QixRQUFHLEdBQUcsS0FBSyxDQUFDO1FBQ1osWUFBTyxHQUFHLENBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBRSxDQUFDO1FBQzdCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsWUFBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLG9GQUFvRjtRQUNqRyxTQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ1osYUFBUSxHQUFHLEtBQUssQ0FB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L0Isa0JBQWEsR0FBRyxnQkFBZ0IsQ0FBQztRQUVqQywwQkFBMEI7UUFDMUIsYUFBUSxHQUFHLFNBQVMsQ0FBQztRQUNyQixrQkFBYSxHQUFHLFFBQVEsQ0FBQztRQUV6QixzQkFBc0I7UUFDdEIsZUFBVSxHQUFHLGdCQUFnQixDQUFDO1FBQzlCLGNBQVMsR0FBRyxnQkFBZ0IsQ0FBQztRQUU3Qix5QkFBeUI7UUFDekIsZUFBVSxHQUFHLFNBQVMsQ0FBQztRQUV2QixtQkFBbUI7UUFDbkIsb0JBQWUsR0FBRyxTQUFTLENBQUM7SUFDWixDQUFDO0NBQ2xCOzs7SUF6REMsc0NBQWlCOztJQUNqQixxQ0FBaUI7O0lBQ2pCLHVDQUFtQjs7SUFDbkIsdUNBQW1COztJQUVuQiwwQ0FBc0I7O0lBQ3RCLDBDQUFzQjs7SUFDdEIseUNBQXFCOztJQUNyQix5Q0FBcUI7O0lBRXJCLHVDQUFrQjs7SUFDbEIsNkNBQXdCOztJQUV4QixzQ0FBa0I7O0lBQ2xCLHlDQUFxQjs7SUFDckIsMENBQXNCOztJQUV0Qiw4Q0FBZ0M7O0lBQ2hDLG9DQUFnQjs7SUFFaEIsMkNBQXNCOztJQUN0QiwyQ0FBdUI7O0lBQ3ZCLDZDQUFnQzs7SUFFaEMsMkNBQWdCOztJQUNoQixzREFBaUM7O0lBR2pDLG9DQUFnQjs7SUFDaEIsd0NBQXFCOztJQUNyQix5Q0FBNEI7O0lBQzVCLHdDQUEwQjs7SUFDMUIscUNBQWlCOztJQUNqQix5Q0FBNEI7O0lBQzVCLHlDQUFxQjs7SUFDckIsMENBQTZCOztJQUc3Qix5Q0FBcUI7O0lBQ3JCLGdEQUEyQjs7SUFDM0IsbURBQStCOztJQUMvQiw4Q0FBaUM7O0lBR2pDLHlDQUFxQjs7SUFDckIsOENBQXlCOztJQUd6QiwyQ0FBOEI7O0lBQzlCLDBDQUE2Qjs7SUFHN0IsMkNBQXVCOztJQUd2QixnREFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPd2xPcHRpb25zIH0gZnJvbSBcIi4uL21vZGVscy9vd2wtb3B0aW9ucy5tb2RlbFwiO1xyXG5cclxuLyoqXHJcbiAqIERlZmF1bHRzIHZhbHVlIG9mIG9wdGlvbnNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBPd2xDYXJvdXNlbE9Db25maWcgaW1wbGVtZW50cyBPd2xPcHRpb25zIHtcclxuICBpdGVtcyA9IDM7XHJcbiAgbG9vcCA9IGZhbHNlO1xyXG4gIGNlbnRlciA9IGZhbHNlO1xyXG4gIHJld2luZCA9IGZhbHNlO1xyXG5cclxuICBtb3VzZURyYWcgPSB0cnVlO1xyXG4gIHRvdWNoRHJhZyA9IHRydWU7XHJcbiAgcHVsbERyYWcgPSB0cnVlO1xyXG4gIGZyZWVEcmFnID0gZmFsc2U7XHJcblxyXG4gIG1hcmdpbiA9IDA7XHJcbiAgc3RhZ2VQYWRkaW5nID0gMDtcclxuXHJcbiAgbWVyZ2UgPSBmYWxzZTtcclxuICBtZXJnZUZpdCA9IHRydWU7XHJcbiAgYXV0b1dpZHRoID0gZmFsc2U7XHJcblxyXG4gIHN0YXJ0UG9zaXRpb24gPSAwO1xyXG4gIHJ0bCA9IGZhbHNlO1xyXG5cclxuICBzbWFydFNwZWVkID0gMjUwO1xyXG4gIGZsdWlkU3BlZWQgPSBmYWxzZTtcclxuICBkcmFnRW5kU3BlZWQgPSBmYWxzZTtcclxuXHJcbiAgcmVzcG9uc2l2ZSA9IHt9O1xyXG4gIHJlc3BvbnNpdmVSZWZyZXNoUmF0ZSA9IDIwMDtcclxuXHJcbiAgLy8gZGVmYXVsdHMgdG8gTmF2aWdhdGlvblxyXG4gIG5hdiA9IGZhbHNlO1xyXG4gIG5hdlRleHQgPSBbICdwcmV2JywgJ25leHQnIF07XHJcbiAgbmF2U3BlZWQgPSBmYWxzZTtcclxuICBzbGlkZUJ5ID0gMTsgLy8gc3RhZ2UgbW92ZXMgb24gMSB3aWR0aCBvZiBzbGlkZTsgaWYgc2xpZGVCeSA9IDIsIHN0YWdlIG1vdmVzIG9uIDIgd2lkdGhzIG9mIHNsaWRlXHJcbiAgZG90cyA9IHRydWU7XHJcbiAgZG90c0VhY2ggPSBmYWxzZTtcclxuICBkb3RzRGF0YSA9IGZhbHNlO1xyXG4gIGRvdHNTcGVlZCA9IGZhbHNlO1xyXG5cclxuICAvLyBkZWZhdWx0cyB0byBBdXRvcGxheVxyXG4gIGF1dG9wbGF5ID0gZmFsc2U7XHJcbiAgYXV0b3BsYXlUaW1lb3V0ID0gNTAwMDtcclxuICBhdXRvcGxheUhvdmVyUGF1c2UgPSBmYWxzZTtcclxuICBhdXRvcGxheVNwZWVkID0gZmFsc2U7XHJcblxyXG4gIC8vIGRlZmF1bHRzIHRvIExhenlMb2FkaW5nXHJcbiAgbGF6eUxvYWQgPSBmYWxzZTtcclxuICBsYXp5TG9hZEVhZ2VyID0gMDtcclxuXHJcbiAgLy8gZGVmYXVsdHMgdG8gQW5pbWF0ZVxyXG4gIGFuaW1hdGVPdXQgPSBmYWxzZTtcclxuICBhbmltYXRlSW4gPSBmYWxzZTtcclxuXHJcbiAgLy8gZGVmYXVsdHMgdG8gQXV0b0hlaWdodFxyXG4gIGF1dG9IZWlnaHQgPSBmYWxzZTtcclxuXHJcbiAgLy8gZGVmYXVsdHMgdG8gSGFzaFxyXG4gIFVSTGhhc2hMaXN0ZW5lciA9IGZhbHNlO1xyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiB3ZSBjYW4ndCByZWFkIHR5cGVzIGZyb20gT3dsT3B0aW9ucyBpbiBqYXZhc2NyaXB0IGJlY2F1c2Ugb2YgcHJvcHMgaGF2ZSB1bmRlZmluZWQgdmFsdWUgYW5kIHR5cGVzIG9mIHRob3NlIHByb3BzIGFyZSB1c2VkIGZvciB2YWxpZGF0aW5nIGlucHV0c1xyXG4gKiBjbGFzcyBiZWxvdyBpcyBjb3B5IG9mIE93bE9wdGlvbnMgYnV0IGl0cyBhbGwgcHJvcHMgaGF2ZSBzdHJpbmcgdmFsdWUgc2hvd2luZyBjZXJ0YWluIHR5cGU7XHJcbiAqIHRoaXMgaXMgY2xhc3MgaXMgYmVpbmcgdXNlZCBqdXN0IGluIG1ldGhvZCBfdmFsaWRhdGVPcHRpb25zKCkgb2YgQ2Fyb3VzZWxTZXJ2aWNlO1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE93bE9wdGlvbnNNb2NrZWRUeXBlcyB7XHJcbiAgaXRlbXMgPSAnbnVtYmVyJztcclxuICBsb29wID0gJ2Jvb2xlYW4nO1xyXG4gIGNlbnRlciA9ICdib29sZWFuJztcclxuICByZXdpbmQgPSAnYm9vbGVhbic7XHJcblxyXG4gIG1vdXNlRHJhZyA9ICdib29sZWFuJztcclxuICB0b3VjaERyYWcgPSAnYm9vbGVhbic7XHJcbiAgcHVsbERyYWcgPSAnYm9vbGVhbic7XHJcbiAgZnJlZURyYWcgPSAnYm9vbGVhbic7XHJcblxyXG4gIG1hcmdpbiA9ICdudW1iZXInO1xyXG4gIHN0YWdlUGFkZGluZyA9ICdudW1iZXInO1xyXG5cclxuICBtZXJnZSA9ICdib29sZWFuJztcclxuICBtZXJnZUZpdCA9ICdib29sZWFuJztcclxuICBhdXRvV2lkdGggPSAnYm9vbGVhbic7XHJcblxyXG4gIHN0YXJ0UG9zaXRpb24gPSAnbnVtYmVyfHN0cmluZyc7XHJcbiAgcnRsID0gJ2Jvb2xlYW4nO1xyXG5cclxuICBzbWFydFNwZWVkID0gJ251bWJlcic7XHJcbiAgZmx1aWRTcGVlZCA9ICdib29sZWFuJztcclxuICBkcmFnRW5kU3BlZWQgPSAnbnVtYmVyfGJvb2xlYW4nO1xyXG5cclxuICByZXNwb25zaXZlID0ge307XHJcbiAgcmVzcG9uc2l2ZVJlZnJlc2hSYXRlID0gJ251bWJlcic7XHJcblxyXG4gIC8vIGRlZmF1bHRzIHRvIE5hdmlnYXRpb25cclxuICBuYXYgPSAnYm9vbGVhbic7XHJcbiAgbmF2VGV4dCA9ICdzdHJpbmdbXSc7XHJcbiAgbmF2U3BlZWQgPSAnbnVtYmVyfGJvb2xlYW4nO1xyXG4gIHNsaWRlQnkgPSAnbnVtYmVyfHN0cmluZyc7IC8vIHN0YWdlIG1vdmVzIG9uIDEgd2lkdGggb2Ygc2xpZGU7IGlmIHNsaWRlQnkgPSAyLCBzdGFnZSBtb3ZlcyBvbiAyIHdpZHRocyBvZiBzbGlkZVxyXG4gIGRvdHMgPSAnYm9vbGVhbic7XHJcbiAgZG90c0VhY2ggPSAnbnVtYmVyfGJvb2xlYW4nO1xyXG4gIGRvdHNEYXRhID0gJ2Jvb2xlYW4nO1xyXG4gIGRvdHNTcGVlZCA9ICdudW1iZXJ8Ym9vbGVhbic7XHJcblxyXG4gIC8vIGRlZmF1bHRzIHRvIEF1dG9wbGF5XHJcbiAgYXV0b3BsYXkgPSAnYm9vbGVhbic7XHJcbiAgYXV0b3BsYXlUaW1lb3V0ID0gJ251bWJlcic7XHJcbiAgYXV0b3BsYXlIb3ZlclBhdXNlID0gJ2Jvb2xlYW4nO1xyXG4gIGF1dG9wbGF5U3BlZWQgPSAnbnVtYmVyfGJvb2xlYW4nO1xyXG5cclxuICAvLyBkZWZhdWx0cyB0byBMYXp5TG9hZGluZ1xyXG4gIGxhenlMb2FkID0gJ2Jvb2xlYW4nO1xyXG4gIGxhenlMb2FkRWFnZXIgPSAnbnVtYmVyJztcclxuXHJcbiAgLy8gZGVmYXVsdHMgdG8gQW5pbWF0ZVxyXG4gIGFuaW1hdGVPdXQgPSAnc3RyaW5nfGJvb2xlYW4nO1xyXG4gIGFuaW1hdGVJbiA9ICdzdHJpbmd8Ym9vbGVhbic7XHJcblxyXG4gIC8vIGRlZmF1bHRzIHRvIEF1dG9IZWlnaHRcclxuICBhdXRvSGVpZ2h0ID0gJ2Jvb2xlYW4nO1xyXG5cclxuICAvLyBkZWZhdWx0cyB0byBIYXNoXHJcbiAgVVJMaGFzaExpc3RlbmVyID0gXCJib29sZWFuXCI7XHJcbiAgY29uc3RydWN0b3IoKSB7IH1cclxufSJdfQ==