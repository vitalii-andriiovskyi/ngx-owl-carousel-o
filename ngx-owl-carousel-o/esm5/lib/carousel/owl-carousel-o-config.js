/**
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
    return OwlCarouselOConfig;
}());
export { OwlCarouselOConfig };
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
    return OwlOptionsMockedTypes;
}());
export { OwlOptionsMockedTypes };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3dsLWNhcm91c2VsLW8tY29uZmlnLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW93bC1jYXJvdXNlbC1vLyIsInNvdXJjZXMiOlsibGliL2Nhcm91c2VsL293bC1jYXJvdXNlbC1vLWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTs7R0FFRztBQUNIO0lBNERFO1FBM0RBLFVBQUssR0FBRyxDQUFDLENBQUM7UUFDVix1QkFBa0IsR0FBRyxLQUFLLENBQUM7UUFDM0IsU0FBSSxHQUFHLEtBQUssQ0FBQztRQUNiLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDZixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBRWYsY0FBUyxHQUFHLElBQUksQ0FBQztRQUNqQixjQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUVqQixXQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsaUJBQVksR0FBRyxDQUFDLENBQUM7UUFFakIsVUFBSyxHQUFHLEtBQUssQ0FBQztRQUNkLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUVsQixrQkFBYSxHQUFHLENBQUMsQ0FBQztRQUNsQixRQUFHLEdBQUcsS0FBSyxDQUFDO1FBRVosZUFBVSxHQUFHLEdBQUcsQ0FBQztRQUNqQixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBRXJCLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFDaEIsMEJBQXFCLEdBQUcsR0FBRyxDQUFDO1FBRTVCLHlCQUF5QjtRQUN6QixRQUFHLEdBQUcsS0FBSyxDQUFDO1FBQ1osWUFBTyxHQUFHLENBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBRSxDQUFDO1FBQzdCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsWUFBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLG9GQUFvRjtRQUNqRyxTQUFJLEdBQUcsSUFBSSxD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dGlvbnMgfSBmcm9tIFwiLi4vbW9kZWxzL293bC1vcHRpb25zLm1vZGVsXCI7XG5cbi8qKlxuICogRGVmYXVsdHMgdmFsdWUgb2Ygb3B0aW9uc1xuICovXG5leHBvcnQgY2xhc3MgT3dsQ2Fyb3VzZWxPQ29uZmlnIGltcGxlbWVudHMgT3dsT3B0aW9ucyB7XG4gIGl0ZW1zID0gMztcbiAgc2tpcF92YWxpZGF0ZUl0ZW1zID0gZmFsc2U7XG4gIGxvb3AgPSBmYWxzZTtcbiAgY2VudGVyID0gZmFsc2U7XG4gIHJld2luZCA9IGZhbHNlO1xuXG4gIG1vdXNlRHJhZyA9IHRydWU7XG4gIHRvdWNoRHJhZyA9IHRydWU7XG4gIHB1bGxEcmFnID0gdHJ1ZTtcbiAgZnJlZURyYWcgPSBmYWxzZTtcblxuICBtYXJnaW4gPSAwO1xuICBzdGFnZVBhZGRpbmcgPSAwO1xuXG4gIG1lcmdlID0gZmFsc2U7XG4gIG1lcmdlRml0ID0gdHJ1ZTtcbiAgYXV0b1dpZHRoID0gZmFsc2U7XG5cbiAgc3RhcnRQb3NpdGlvbiA9IDA7XG4gIHJ0bCA9IGZhbHNlO1xuXG4gIHNtYXJ0U3BlZWQgPSAyNTA7XG4gIGZsdWlkU3BlZWQgPSBmYWxzZTtcbiAgZHJhZ0VuZFNwZWVkID0gZmFsc2U7XG5cbiAgcmVzcG9uc2l2ZSA9IHt9O1xuICByZXNwb25zaXZlUmVmcmVzaFJhdGUgPSAyMDA7XG5cbiAgLy8gZGVmYXVsdHMgdG8gTmF2aWdhdGlvblxuICBuYXYgPSBmYWxzZTtcbiAgbmF2VGV4dCA9IFsgJ3ByZXYnLCAnbmV4dCcgXTtcbiAgbmF2U3BlZWQgPSBmYWxzZTtcbiAgc2xpZGVCeSA9IDE7IC8vIHN0YWdlIG1vdmVzIG9uIDEgd2lkdGggb2Ygc2xpZGU7IGlmIHNsaWRlQnkgPSAyLCBzdGFnZSBtb3ZlcyBvbiAyIHdpZHRocyBvZiBzbGlkZVxuICBkb3RzID0gdHJ1ZTtcbiAgZG90c0VhY2ggPSBmYWxzZTtcbiAgZG90c0RhdGEgPSBmYWxzZTtcbiAgZG90c1NwZWVkID0gZmFsc2U7XG5cbiAgLy8gZGVmYXVsdHMgdG8gQXV0b3BsYXlcbiAgYXV0b3BsYXkgPSBmYWxzZTtcbiAgYXV0b3BsYXlUaW1lb3V0ID0gNTAwMDtcbiAgYXV0b3BsYXlIb3ZlclBhdXNlID0gZmFsc2U7XG4gIGF1dG9wbGF5U3BlZWQgPSBmYWxzZTtcbiAgYXV0b3BsYXlNb3VzZWxlYXZlVGltZW91dCA9IDE7XG5cbiAgLy8gZGVmYXVsdHMgdG8gTGF6eUxvYWRpbmdcbiAgbGF6eUxvYWQgPSBmYWxzZTtcbiAgbGF6eUxvYWRFYWdlciA9IDA7XG5cbiAgLy8gZGVmYXVsdHMgdG8gQW5pbWF0ZVxuICBzbGlkZVRyYW5zaXRpb24gPSAnJztcbiAgYW5pbWF0ZU91dCA9IGZhbHNlO1xuICBhbmltYXRlSW4gPSBmYWxzZTtcblxuICAvLyBkZWZhdWx0cyB0byBBdXRvSGVpZ2h0XG4gIGF1dG9IZWlnaHQgPSBmYWxzZTtcblxuICAvLyBkZWZhdWx0cyB0byBIYXNoXG4gIFVSTGhhc2hMaXN0ZW5lciA9IGZhbHNlO1xuICBjb25zdHJ1Y3RvcigpIHsgfVxufVxuXG4vKipcbiAqIHdlIGNhbid0IHJlYWQgdHlwZXMgZnJvbSBPd2xPcHRpb25zIGluIGphdmFzY3JpcHQgYmVjYXVzZSBvZiBwcm9wcyBoYXZlIHVuZGVmaW5lZCB2YWx1ZSBhbmQgdHlwZXMgb2YgdGhvc2UgcHJvcHMgYXJlIHVzZWQgZm9yIHZhbGlkYXRpbmcgaW5wdXRzXG4gKiBjbGFzcyBiZWxvdyBpcyBjb3B5IG9mIE93bE9wdGlvbnMgYnV0IGl0cyBhbGwgcHJvcHMgaGF2ZSBzdHJpbmcgdmFsdWUgc2hvd2luZyBjZXJ0YWluIHR5cGU7XG4gKiB0aGlzIGlzIGNsYXNzIGlzIGJlaW5nIHVzZWQganVzdCBpbiBtZXRob2QgX3ZhbGlkYXRlT3B0aW9ucygpIG9mIENhcm91c2VsU2VydmljZTtcbiAqL1xuZXhwb3J0IGNsYXNzIE93bE9wdGlvbnNNb2NrZWRUeXBlcyB7XG4gIGl0ZW1zID0gJ251bWJlcic7XG4gIHNraXBfdmFsaWRhdGVJdGVtcyA9ICdib29sZWFuJztcbiAgbG9vcCA9ICdib29sZWFuJztcbiAgY2VudGVyID0gJ2Jvb2xlYW4nO1xuICByZXdpbmQgPSAnYm9vbGVhbic7XG5cbiAgbW91c2VEcmFnID0gJ2Jvb2xlYW4nO1xuICB0b3VjaERyYWcgPSAnYm9vbGVhbic7XG4gIHB1bGxEcmFnID0gJ2Jvb2xlYW4nO1xuICBmcmVlRHJhZyA9ICdib29sZWFuJztcblxuICBtYXJnaW4gPSAnbnVtYmVyJztcbiAgc3RhZ2VQYWRkaW5nID0gJ251bWJlcic7XG5cbiAgbWVyZ2UgPSAnYm9vbGVhbic7XG4gIG1lcmdlRml0ID0gJ2Jvb2xlYW4nO1xuICBhdXRvV2lkdGggPSAnYm9vbGVhbic7XG5cbiAgc3RhcnRQb3NpdGlvbiA9ICdudW1iZXJ8c3RyaW5nJztcbiAgcnRsID0gJ2Jvb2xlYW4nO1xuXG4gIHNtYXJ0U3BlZWQgPSAnbnVtYmVyJztcbiAgZmx1aWRTcGVlZCA9ICdib29sZWFuJztcbiAgZHJhZ0VuZFNwZWVkID0gJ251bWJlcnxib29sZWFuJztcblxuICByZXNwb25zaXZlID0ge307XG4gIHJlc3BvbnNpdmVSZWZyZXNoUmF0ZSA9ICdudW1iZXInO1xuXG4gIC8vIGRlZmF1bHRzIHRvIE5hdmlnYXRpb25cbiAgbmF2ID0gJ2Jvb2xlYW4nO1xuICBuYXZUZXh0ID0gJ3N0cmluZ1tdJztcbiAgbmF2U3BlZWQgPSAnbnVtYmVyfGJvb2xlYW4nO1xuICBzbGlkZUJ5ID0gJ251bWJlcnxzdHJpbmcnOyAvLyBzdGFnZSBtb3ZlcyBvbiAxIHdpZHRoIG9mIHNsaWRlOyBpZiBzbGlkZUJ5ID0gMiwgc3RhZ2UgbW92ZXMgb24gMiB3aWR0aHMgb2Ygc2xpZGVcbiAgZG90cyA9ICdib29sZWFuJztcbiAgZG90c0VhY2ggPSAnbnVtYmVyfGJvb2xlYW4nO1xuICBkb3RzRGF0YSA9ICdib29sZWFuJztcbiAgZG90c1NwZWVkID0gJ251bWJlcnxib29sZWFuJztcblxuICAvLyBkZWZhdWx0cyB0byBBdXRvcGxheVxuICBhdXRvcGxheSA9ICdib29sZWFuJztcbiAgYXV0b3BsYXlUaW1lb3V0ID0gJ251bWJlcic7XG4gIGF1dG9wbGF5SG92ZXJQYXVzZSA9ICdib29sZWFuJztcbiAgYXV0b3BsYXlTcGVlZCA9ICdudW1iZXJ8Ym9vbGVhbic7XG4gIGF1dG9wbGF5TW91c2VsZWF2ZVRpbWVvdXQgPSAnbnVtYmVyJztcblxuICAvLyBkZWZhdWx0cyB0byBMYXp5TG9hZGluZ1xuICBsYXp5TG9hZCA9ICdib29sZWFuJztcbiAgbGF6eUxvYWRFYWdlciA9ICdudW1iZXInO1xuXG4gIC8vIGRlZmF1bHRzIHRvIEFuaW1hdGVcbiAgc2xpZGVUcmFuc2l0aW9uID0gJ3N0cmluZyc7XG4gIGFuaW1hdGVPdXQgPSAnc3RyaW5nfGJvb2xlYW4nO1xuICBhbmltYXRlSW4gPSAnc3RyaW5nfGJvb2xlYW4nO1xuXG4gIC8vIGRlZmF1bHRzIHRvIEF1dG9IZWlnaHRcbiAgYXV0b0hlaWdodCA9ICdib29sZWFuJztcblxuICAvLyBkZWZhdWx0cyB0byBIYXNoXG4gIFVSTGhhc2hMaXN0ZW5lciA9IFwiYm9vbGVhblwiO1xuICBjb25zdHJ1Y3RvcigpIHsgfVxufSJdfQ==