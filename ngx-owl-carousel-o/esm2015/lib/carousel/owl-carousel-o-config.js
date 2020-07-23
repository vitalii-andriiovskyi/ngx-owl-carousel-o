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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3dsLWNhcm91c2VsLW8tY29uZmlnLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW93bC1jYXJvdXNlbC1vLyIsInNvdXJjZXMiOlsibGliL2Nhcm91c2VsL293bC1jYXJvdXNlbC1vLWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTs7R0FFRztBQUNILE1BQU0sT0FBTyxrQkFBa0I7SUE0RDdCO1FBM0RBLFVBQUssR0FBRyxDQUFDLENBQUM7UUFDVix1QkFBa0IsR0FBRyxLQUFLLENBQUM7UUFDM0IsU0FBSSxHQUFHLEtBQUssQ0FBQztRQUNiLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDZixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBRWYsY0FBUyxHQUFHLElBQUksQ0FBQztRQUNqQixjQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUVqQixXQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsaUJBQVksR0FBRyxDQUFDLENBQUM7UUFFakIsVUFBSyxHQUFHLEtBQUssQ0FBQztRQUNkLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUVsQixrQkFBYSxHQUFHLENBQUMsQ0FBQztRQUNsQixRQUFHLEdBQUcsS0FBSyxDQUFDO1FBRVosZUFBVSxHQUFHLEdBQUcsQ0FBQztRQUNqQixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBRXJCLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFDaEIsMEJBQXFCLEdBQUcsR0FBRyxDQUFDO1FBRTVCLHlCQUF5QjtRQUN6QixRQUFHLEdBQUcsS0FBSyxDQUFDO1FBQ1osWUFBTyxHQUFHLENBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBRSxDQUFDO1FBQzdCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsWUFBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLG9GQUFvRjtRQUNq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ZWxzL293bC1vcHRpb25zLm1vZGVsXCI7XHJcblxyXG4vKipcclxuICogRGVmYXVsdHMgdmFsdWUgb2Ygb3B0aW9uc1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE93bENhcm91c2VsT0NvbmZpZyBpbXBsZW1lbnRzIE93bE9wdGlvbnMge1xyXG4gIGl0ZW1zID0gMztcclxuICBza2lwX3ZhbGlkYXRlSXRlbXMgPSBmYWxzZTtcclxuICBsb29wID0gZmFsc2U7XHJcbiAgY2VudGVyID0gZmFsc2U7XHJcbiAgcmV3aW5kID0gZmFsc2U7XHJcblxyXG4gIG1vdXNlRHJhZyA9IHRydWU7XHJcbiAgdG91Y2hEcmFnID0gdHJ1ZTtcclxuICBwdWxsRHJhZyA9IHRydWU7XHJcbiAgZnJlZURyYWcgPSBmYWxzZTtcclxuXHJcbiAgbWFyZ2luID0gMDtcclxuICBzdGFnZVBhZGRpbmcgPSAwO1xyXG5cclxuICBtZXJnZSA9IGZhbHNlO1xyXG4gIG1lcmdlRml0ID0gdHJ1ZTtcclxuICBhdXRvV2lkdGggPSBmYWxzZTtcclxuXHJcbiAgc3RhcnRQb3NpdGlvbiA9IDA7XHJcbiAgcnRsID0gZmFsc2U7XHJcblxyXG4gIHNtYXJ0U3BlZWQgPSAyNTA7XHJcbiAgZmx1aWRTcGVlZCA9IGZhbHNlO1xyXG4gIGRyYWdFbmRTcGVlZCA9IGZhbHNlO1xyXG5cclxuICByZXNwb25zaXZlID0ge307XHJcbiAgcmVzcG9uc2l2ZVJlZnJlc2hSYXRlID0gMjAwO1xyXG5cclxuICAvLyBkZWZhdWx0cyB0byBOYXZpZ2F0aW9uXHJcbiAgbmF2ID0gZmFsc2U7XHJcbiAgbmF2VGV4dCA9IFsgJ3ByZXYnLCAnbmV4dCcgXTtcclxuICBuYXZTcGVlZCA9IGZhbHNlO1xyXG4gIHNsaWRlQnkgPSAxOyAvLyBzdGFnZSBtb3ZlcyBvbiAxIHdpZHRoIG9mIHNsaWRlOyBpZiBzbGlkZUJ5ID0gMiwgc3RhZ2UgbW92ZXMgb24gMiB3aWR0aHMgb2Ygc2xpZGVcclxuICBkb3RzID0gdHJ1ZTtcclxuICBkb3RzRWFjaCA9IGZhbHNlO1xyXG4gIGRvdHNEYXRhID0gZmFsc2U7XHJcbiAgZG90c1NwZWVkID0gZmFsc2U7XHJcblxyXG4gIC8vIGRlZmF1bHRzIHRvIEF1dG9wbGF5XHJcbiAgYXV0b3BsYXkgPSBmYWxzZTtcclxuICBhdXRvcGxheVRpbWVvdXQgPSA1MDAwO1xyXG4gIGF1dG9wbGF5SG92ZXJQYXVzZSA9IGZhbHNlO1xyXG4gIGF1dG9wbGF5U3BlZWQgPSBmYWxzZTtcclxuICBhdXRvcGxheU1vdXNlbGVhdmVUaW1lb3V0ID0gMTtcclxuXHJcbiAgLy8gZGVmYXVsdHMgdG8gTGF6eUxvYWRpbmdcclxuICBsYXp5TG9hZCA9IGZhbHNlO1xyXG4gIGxhenlMb2FkRWFnZXIgPSAwO1xyXG5cclxuICAvLyBkZWZhdWx0cyB0byBBbmltYXRlXHJcbiAgc2xpZGVUcmFuc2l0aW9uID0gJyc7XHJcbiAgYW5pbWF0ZU91dCA9IGZhbHNlO1xyXG4gIGFuaW1hdGVJbiA9IGZhbHNlO1xyXG5cclxuICAvLyBkZWZhdWx0cyB0byBBdXRvSGVpZ2h0XHJcbiAgYXV0b0hlaWdodCA9IGZhbHNlO1xyXG5cclxuICAvLyBkZWZhdWx0cyB0byBIYXNoXHJcbiAgVVJMaGFzaExpc3RlbmVyID0gZmFsc2U7XHJcbiAgY29uc3RydWN0b3IoKSB7IH1cclxufVxyXG5cclxuLyoqXHJcbiAqIHdlIGNhbid0IHJlYWQgdHlwZXMgZnJvbSBPd2xPcHRpb25zIGluIGphdmFzY3JpcHQgYmVjYXVzZSBvZiBwcm9wcyBoYXZlIHVuZGVmaW5lZCB2YWx1ZSBhbmQgdHlwZXMgb2YgdGhvc2UgcHJvcHMgYXJlIHVzZWQgZm9yIHZhbGlkYXRpbmcgaW5wdXRzXHJcbiAqIGNsYXNzIGJlbG93IGlzIGNvcHkgb2YgT3dsT3B0aW9ucyBidXQgaXRzIGFsbCBwcm9wcyBoYXZlIHN0cmluZyB2YWx1ZSBzaG93aW5nIGNlcnRhaW4gdHlwZTtcclxuICogdGhpcyBpcyBjbGFzcyBpcyBiZWluZyB1c2VkIGp1c3QgaW4gbWV0aG9kIF92YWxpZGF0ZU9wdGlvbnMoKSBvZiBDYXJvdXNlbFNlcnZpY2U7XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgT3dsT3B0aW9uc01vY2tlZFR5cGVzIHtcclxuICBpdGVtcyA9ICdudW1iZXInO1xyXG4gIHNraXBfdmFsaWRhdGVJdGVtcyA9ICdib29sZWFuJztcclxuICBsb29wID0gJ2Jvb2xlYW4nO1xyXG4gIGNlbnRlciA9ICdib29sZWFuJztcclxuICByZXdpbmQgPSAnYm9vbGVhbic7XHJcblxyXG4gIG1vdXNlRHJhZyA9ICdib29sZWFuJztcclxuICB0b3VjaERyYWcgPSAnYm9vbGVhbic7XHJcbiAgcHVsbERyYWcgPSAnYm9vbGVhbic7XHJcbiAgZnJlZURyYWcgPSAnYm9vbGVhbic7XHJcblxyXG4gIG1hcmdpbiA9ICdudW1iZXInO1xyXG4gIHN0YWdlUGFkZGluZyA9ICdudW1iZXInO1xyXG5cclxuICBtZXJnZSA9ICdib29sZWFuJztcclxuICBtZXJnZUZpdCA9ICdib29sZWFuJztcclxuICBhdXRvV2lkdGggPSAnYm9vbGVhbic7XHJcblxyXG4gIHN0YXJ0UG9zaXRpb24gPSAnbnVtYmVyfHN0cmluZyc7XHJcbiAgcnRsID0gJ2Jvb2xlYW4nO1xyXG5cclxuICBzbWFydFNwZWVkID0gJ251bWJlcic7XHJcbiAgZmx1aWRTcGVlZCA9ICdib29sZWFuJztcclxuICBkcmFnRW5kU3BlZWQgPSAnbnVtYmVyfGJvb2xlYW4nO1xyXG5cclxuICByZXNwb25zaXZlID0ge307XHJcbiAgcmVzcG9uc2l2ZVJlZnJlc2hSYXRlID0gJ251bWJlcic7XHJcblxyXG4gIC8vIGRlZmF1bHRzIHRvIE5hdmlnYXRpb25cclxuICBuYXYgPSAnYm9vbGVhbic7XHJcbiAgbmF2VGV4dCA9ICdzdHJpbmdbXSc7XHJcbiAgbmF2U3BlZWQgPSAnbnVtYmVyfGJvb2xlYW4nO1xyXG4gIHNsaWRlQnkgPSAnbnVtYmVyfHN0cmluZyc7IC8vIHN0YWdlIG1vdmVzIG9uIDEgd2lkdGggb2Ygc2xpZGU7IGlmIHNsaWRlQnkgPSAyLCBzdGFnZSBtb3ZlcyBvbiAyIHdpZHRocyBvZiBzbGlkZVxyXG4gIGRvdHMgPSAnYm9vbGVhbic7XHJcbiAgZG90c0VhY2ggPSAnbnVtYmVyfGJvb2xlYW4nO1xyXG4gIGRvdHNEYXRhID0gJ2Jvb2xlYW4nO1xyXG4gIGRvdHNTcGVlZCA9ICdudW1iZXJ8Ym9vbGVhbic7XHJcblxyXG4gIC8vIGRlZmF1bHRzIHRvIEF1dG9wbGF5XHJcbiAgYXV0b3BsYXkgPSAnYm9vbGVhbic7XHJcbiAgYXV0b3BsYXlUaW1lb3V0ID0gJ251bWJlcic7XHJcbiAgYXV0b3BsYXlIb3ZlclBhdXNlID0gJ2Jvb2xlYW4nO1xyXG4gIGF1dG9wbGF5U3BlZWQgPSAnbnVtYmVyfGJvb2xlYW4nO1xyXG4gIGF1dG9wbGF5TW91c2VsZWF2ZVRpbWVvdXQgPSAnbnVtYmVyJztcclxuXHJcbiAgLy8gZGVmYXVsdHMgdG8gTGF6eUxvYWRpbmdcclxuICBsYXp5TG9hZCA9ICdib29sZWFuJztcclxuICBsYXp5TG9hZEVhZ2VyID0gJ251bWJlcic7XHJcblxyXG4gIC8vIGRlZmF1bHRzIHRvIEFuaW1hdGVcclxuICBzbGlkZVRyYW5zaXRpb24gPSAnc3RyaW5nJztcclxuICBhbmltYXRlT3V0ID0gJ3N0cmluZ3xib29sZWFuJztcclxuICBhbmltYXRlSW4gPSAnc3RyaW5nfGJvb2xlYW4nO1xyXG5cclxuICAvLyBkZWZhdWx0cyB0byBBdXRvSGVpZ2h0XHJcbiAgYXV0b0hlaWdodCA9ICdib29sZWFuJztcclxuXHJcbiAgLy8gZGVmYXVsdHMgdG8gSGFzaFxyXG4gIFVSTGhhc2hMaXN0ZW5lciA9IFwiYm9vbGVhblwiO1xyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcbn0iXX0=