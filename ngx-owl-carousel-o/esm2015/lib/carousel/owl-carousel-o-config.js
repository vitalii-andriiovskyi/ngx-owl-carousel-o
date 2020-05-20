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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3dsLWNhcm91c2VsLW8tY29uZmlnLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW93bC1jYXJvdXNlbC1vLyIsInNvdXJjZXMiOlsibGliL2Nhcm91c2VsL293bC1jYXJvdXNlbC1vLWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBS0EsTUFBTTtJQTBESjtRQXpEQSxVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsdUJBQWtCLEdBQUcsS0FBSyxDQUFDO1FBQzNCLFNBQUksR0FBRyxLQUFLLENBQUM7UUFDYixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2YsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUVmLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFDakIsY0FBUyxHQUFHLElBQUksQ0FBQztRQUNqQixhQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFFakIsV0FBTSxHQUFHLENBQUMsQ0FBQztRQUNYLGlCQUFZLEdBQUcsQ0FBQyxDQUFDO1FBRWpCLFVBQUssR0FBRyxLQUFLLENBQUM7UUFDZCxhQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFFbEIsa0JBQWEsR0FBRyxDQUFDLENBQUM7UUFDbEIsUUFBRyxHQUFHLEtBQUssQ0FBQztRQUVaLGVBQVUsR0FBRyxHQUFHLENBQUM7UUFDakIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUVyQixlQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLDBCQUFxQixHQUFHLEdBQUcsQ0FBQztRQUU1Qix5QkFBeUI7UUFDekIsUUFBRyxHQUFHLEtBQUssQ0FBQztRQUNaLFlBQU8sR0FBRyxDQUFFLE1BQU0sRUFBRSxNQUFNLENBQUUsQ0FBQztRQUM3QixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLFlBQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxvRkFBb0Y7UUFDakcsU0FBSSxHQUFHLElBQUks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eyBPd2xPcHRpb25zIH0gZnJvbSBcIi4uL21vZGVscy9vd2wtb3B0aW9ucy5tb2RlbFwiO1xyXG5cclxuLyoqXHJcbiAqIERlZmF1bHRzIHZhbHVlIG9mIG9wdGlvbnNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBPd2xDYXJvdXNlbE9Db25maWcgaW1wbGVtZW50cyBPd2xPcHRpb25zIHtcclxuICBpdGVtcyA9IDM7XHJcbiAgc2tpcF92YWxpZGF0ZUl0ZW1zID0gZmFsc2U7XHJcbiAgbG9vcCA9IGZhbHNlO1xyXG4gIGNlbnRlciA9IGZhbHNlO1xyXG4gIHJld2luZCA9IGZhbHNlO1xyXG5cclxuICBtb3VzZURyYWcgPSB0cnVlO1xyXG4gIHRvdWNoRHJhZyA9IHRydWU7XHJcbiAgcHVsbERyYWcgPSB0cnVlO1xyXG4gIGZyZWVEcmFnID0gZmFsc2U7XHJcblxyXG4gIG1hcmdpbiA9IDA7XHJcbiAgc3RhZ2VQYWRkaW5nID0gMDtcclxuXHJcbiAgbWVyZ2UgPSBmYWxzZTtcclxuICBtZXJnZUZpdCA9IHRydWU7XHJcbiAgYXV0b1dpZHRoID0gZmFsc2U7XHJcblxyXG4gIHN0YXJ0UG9zaXRpb24gPSAwO1xyXG4gIHJ0bCA9IGZhbHNlO1xyXG5cclxuICBzbWFydFNwZWVkID0gMjUwO1xyXG4gIGZsdWlkU3BlZWQgPSBmYWxzZTtcclxuICBkcmFnRW5kU3BlZWQgPSBmYWxzZTtcclxuXHJcbiAgcmVzcG9uc2l2ZSA9IHt9O1xyXG4gIHJlc3BvbnNpdmVSZWZyZXNoUmF0ZSA9IDIwMDtcclxuXHJcbiAgLy8gZGVmYXVsdHMgdG8gTmF2aWdhdGlvblxyXG4gIG5hdiA9IGZhbHNlO1xyXG4gIG5hdlRleHQgPSBbICdwcmV2JywgJ25leHQnIF07XHJcbiAgbmF2U3BlZWQgPSBmYWxzZTtcclxuICBzbGlkZUJ5ID0gMTsgLy8gc3RhZ2UgbW92ZXMgb24gMSB3aWR0aCBvZiBzbGlkZTsgaWYgc2xpZGVCeSA9IDIsIHN0YWdlIG1vdmVzIG9uIDIgd2lkdGhzIG9mIHNsaWRlXHJcbiAgZG90cyA9IHRydWU7XHJcbiAgZG90c0VhY2ggPSBmYWxzZTtcclxuICBkb3RzRGF0YSA9IGZhbHNlO1xyXG4gIGRvdHNTcGVlZCA9IGZhbHNlO1xyXG5cclxuICAvLyBkZWZhdWx0cyB0byBBdXRvcGxheVxyXG4gIGF1dG9wbGF5ID0gZmFsc2U7XHJcbiAgYXV0b3BsYXlUaW1lb3V0ID0gNTAwMDtcclxuICBhdXRvcGxheUhvdmVyUGF1c2UgPSBmYWxzZTtcclxuICBhdXRvcGxheVNwZWVkID0gZmFsc2U7XHJcblxyXG4gIC8vIGRlZmF1bHRzIHRvIExhenlMb2FkaW5nXHJcbiAgbGF6eUxvYWQgPSBmYWxzZTtcclxuICBsYXp5TG9hZEVhZ2VyID0gMDtcclxuXHJcbiAgLy8gZGVmYXVsdHMgdG8gQW5pbWF0ZVxyXG4gIGFuaW1hdGVPdXQgPSBmYWxzZTtcclxuICBhbmltYXRlSW4gPSBmYWxzZTtcclxuXHJcbiAgLy8gZGVmYXVsdHMgdG8gQXV0b0hlaWdodFxyXG4gIGF1dG9IZWlnaHQgPSBmYWxzZTtcclxuXHJcbiAgLy8gZGVmYXVsdHMgdG8gSGFzaFxyXG4gIFVSTGhhc2hMaXN0ZW5lciA9IGZhbHNlO1xyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiB3ZSBjYW4ndCByZWFkIHR5cGVzIGZyb20gT3dsT3B0aW9ucyBpbiBqYXZhc2NyaXB0IGJlY2F1c2Ugb2YgcHJvcHMgaGF2ZSB1bmRlZmluZWQgdmFsdWUgYW5kIHR5cGVzIG9mIHRob3NlIHByb3BzIGFyZSB1c2VkIGZvciB2YWxpZGF0aW5nIGlucHV0c1xyXG4gKiBjbGFzcyBiZWxvdyBpcyBjb3B5IG9mIE93bE9wdGlvbnMgYnV0IGl0cyBhbGwgcHJvcHMgaGF2ZSBzdHJpbmcgdmFsdWUgc2hvd2luZyBjZXJ0YWluIHR5cGU7XHJcbiAqIHRoaXMgaXMgY2xhc3MgaXMgYmVpbmcgdXNlZCBqdXN0IGluIG1ldGhvZCBfdmFsaWRhdGVPcHRpb25zKCkgb2YgQ2Fyb3VzZWxTZXJ2aWNlO1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE93bE9wdGlvbnNNb2NrZWRUeXBlcyB7XHJcbiAgaXRlbXMgPSAnbnVtYmVyJztcclxuICBza2lwX3ZhbGlkYXRlSXRlbXMgPSAnYm9vbGVhbic7XHJcbiAgbG9vcCA9ICdib29sZWFuJztcclxuICBjZW50ZXIgPSAnYm9vbGVhbic7XHJcbiAgcmV3aW5kID0gJ2Jvb2xlYW4nO1xyXG5cclxuICBtb3VzZURyYWcgPSAnYm9vbGVhbic7XHJcbiAgdG91Y2hEcmFnID0gJ2Jvb2xlYW4nO1xyXG4gIHB1bGxEcmFnID0gJ2Jvb2xlYW4nO1xyXG4gIGZyZWVEcmFnID0gJ2Jvb2xlYW4nO1xyXG5cclxuICBtYXJnaW4gPSAnbnVtYmVyJztcclxuICBzdGFnZVBhZGRpbmcgPSAnbnVtYmVyJztcclxuXHJcbiAgbWVyZ2UgPSAnYm9vbGVhbic7XHJcbiAgbWVyZ2VGaXQgPSAnYm9vbGVhbic7XHJcbiAgYXV0b1dpZHRoID0gJ2Jvb2xlYW4nO1xyXG5cclxuICBzdGFydFBvc2l0aW9uID0gJ251bWJlcnxzdHJpbmcnO1xyXG4gIHJ0bCA9ICdib29sZWFuJztcclxuXHJcbiAgc21hcnRTcGVlZCA9ICdudW1iZXInO1xyXG4gIGZsdWlkU3BlZWQgPSAnYm9vbGVhbic7XHJcbiAgZHJhZ0VuZFNwZWVkID0gJ251bWJlcnxib29sZWFuJztcclxuXHJcbiAgcmVzcG9uc2l2ZSA9IHt9O1xyXG4gIHJlc3BvbnNpdmVSZWZyZXNoUmF0ZSA9ICdudW1iZXInO1xyXG5cclxuICAvLyBkZWZhdWx0cyB0byBOYXZpZ2F0aW9uXHJcbiAgbmF2ID0gJ2Jvb2xlYW4nO1xyXG4gIG5hdlRleHQgPSAnc3RyaW5nW10nO1xyXG4gIG5hdlNwZWVkID0gJ251bWJlcnxib29sZWFuJztcclxuICBzbGlkZUJ5ID0gJ251bWJlcnxzdHJpbmcnOyAvLyBzdGFnZSBtb3ZlcyBvbiAxIHdpZHRoIG9mIHNsaWRlOyBpZiBzbGlkZUJ5ID0gMiwgc3RhZ2UgbW92ZXMgb24gMiB3aWR0aHMgb2Ygc2xpZGVcclxuICBkb3RzID0gJ2Jvb2xlYW4nO1xyXG4gIGRvdHNFYWNoID0gJ251bWJlcnxib29sZWFuJztcclxuICBkb3RzRGF0YSA9ICdib29sZWFuJztcclxuICBkb3RzU3BlZWQgPSAnbnVtYmVyfGJvb2xlYW4nO1xyXG5cclxuICAvLyBkZWZhdWx0cyB0byBBdXRvcGxheVxyXG4gIGF1dG9wbGF5ID0gJ2Jvb2xlYW4nO1xyXG4gIGF1dG9wbGF5VGltZW91dCA9ICdudW1iZXInO1xyXG4gIGF1dG9wbGF5SG92ZXJQYXVzZSA9ICdib29sZWFuJztcclxuICBhdXRvcGxheVNwZWVkID0gJ251bWJlcnxib29sZWFuJztcclxuXHJcbiAgLy8gZGVmYXVsdHMgdG8gTGF6eUxvYWRpbmdcclxuICBsYXp5TG9hZCA9ICdib29sZWFuJztcclxuICBsYXp5TG9hZEVhZ2VyID0gJ251bWJlcic7XHJcblxyXG4gIC8vIGRlZmF1bHRzIHRvIEFuaW1hdGVcclxuICBhbmltYXRlT3V0ID0gJ3N0cmluZ3xib29sZWFuJztcclxuICBhbmltYXRlSW4gPSAnc3RyaW5nfGJvb2xlYW4nO1xyXG5cclxuICAvLyBkZWZhdWx0cyB0byBBdXRvSGVpZ2h0XHJcbiAgYXV0b0hlaWdodCA9ICdib29sZWFuJztcclxuXHJcbiAgLy8gZGVmYXVsdHMgdG8gSGFzaFxyXG4gIFVSTGhhc2hMaXN0ZW5lciA9IFwiYm9vbGVhblwiO1xyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcbn0iXX0=
