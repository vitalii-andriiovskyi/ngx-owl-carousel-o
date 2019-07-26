/**
 * Defaults value of options
 */
var OwlCarouselOConfig = /** @class */ (function () {
    function OwlCarouselOConfig() {
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
    return OwlOptionsMockedTypes;
}());
export { OwlOptionsMockedTypes };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3dsLWNhcm91c2VsLW8tY29uZmlnLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW93bC1jYXJvdXNlbC1vLyIsInNvdXJjZXMiOlsibGliL2Nhcm91c2VsL293bC1jYXJvdXNlbC1vLWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTs7R0FFRztBQUNIO0lBeURFO1FBeERBLFVBQUssR0FBRyxDQUFDLENBQUM7UUFDVixTQUFJLEdBQUcsS0FBSyxDQUFDO1FBQ2IsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUNmLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFFZixjQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFDakIsYUFBUSxHQUFHLElBQUksQ0FBQztRQUNoQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBRWpCLFdBQU0sR0FBRyxDQUFDLENBQUM7UUFDWCxpQkFBWSxHQUFHLENBQUMsQ0FBQztRQUVqQixVQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ2QsYUFBUSxHQUFHLElBQUksQ0FBQztRQUNoQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBRWxCLGtCQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLFFBQUcsR0FBRyxLQUFLLENBQUM7UUFFWixlQUFVLEdBQUcsR0FBRyxDQUFDO1FBQ2pCLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFFckIsZUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNoQiwwQkFBcUIsR0FBRyxHQUFHLENBQUM7UUFFNUIseUJBQXlCO1FBQ3pCLFFBQUcsR0FBRyxLQUFLLENBQUM7UUFDWixZQUFPLEdBQUcsQ0FBRSxNQUFNLEVBQUUsTUFBTSxDQUFFLENBQUM7UUFDN0IsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixZQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsb0ZBQW9GO1FBQ2pHLFNBQUksR0FBRyxJQUFJLENBQUM7UUFDWixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUVsQix1QkFBdUI7UUFDdkIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixvQkFBZSxHQUFHLElBQUksQ0FBQztRQUN2Qix1QkFBa0IsR0FBRyxLQUFLLENBQUM7UUFDM0Isa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFFdEIsMEJBQTBCO1FBQzFCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsa0JBQWEsR0FBRyxDQUFDLENBQUM7UUFFbEIsc0JBQXNCO1FBQ3RCLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUVsQix5QkFBeUI7UUFDekIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUVuQixtQkFBbUI7UUFDbkIsb0JBQWUsR0FBRyxLQUFLLENBQUM7SUFDUixDQUFDO0lBQ25CLHlCQUFDO0FBQUQsQ0FBQyxBQTFERCxJQTBEQzs7QUFFRDs7OztHQUlHO0FBQ0g7SUF5REU7UUF4REEsVUFBSyxHQUFHLFFBQVEsQ0FBQztRQUNqQixTQUFJLEdBQUcsU0FBUyxDQUFDO1FBQ2pCLFdBQU0sR0FBRyxTQUFTLENBQUM7UUFDbkIsV0FBTSxHQUFHLFNBQVMsQ0FBQztRQUVuQixjQUFTLEdBQUcsU0FBUyxDQUFDO1FBQ3RCLGNBQVMsR0FBRyxTQUFTLENBQUM7UUFDdEIsYUFBUSxHQUFHLFNBQVMsQ0FBQztRQUNyQixhQUFRLEdBQUcsU0FBUyxDQUFDO1FBRXJCLFdBQU0sR0FBRyxRQUFRLENBQUM7UUFDbEIsaUJBQVksR0FBRyxRQUFRLENBQUM7UUFFeEIsVUFBSyxHQUFHLFNBQVMsQ0FBQztRQUNsQixhQUFRLEdBQUcsU0FBUyxDQUFDO1FBQ3JCLGNBQVMsR0FBRyxTQUFTLENBQUM7UUFFdEIsa0JBQWEsR0FBRyxlQUFlLENBQUM7UUFDaEMsUUFBRyxHQUFHLFNBQVMsQ0FBQztRQUVoQixlQUFVLEdBQUcsUUFBUSxDQUFDO1FBQ3RCLGVBQVUsR0FBRyxTQUFTLENBQUM7UUFDdkIsaUJBQVksR0FBRyxnQkFBZ0IsQ0FBQztRQUVoQyxlQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLDBCQUFxQixHQUFHLFFBQVEsQ0FBQztRQUVqQyx5QkFBeUI7UUFDekIsUUFBRyxHQUFHLFNBQVMsQ0FBQztRQUNoQixZQUFPLEdBQUcsVUFBVSxDQUFDO1FBQ3JCLGFBQVEsR0FBRyxnQkFBZ0IsQ0FBQztRQUM1QixZQUFPLEdBQUcsZUFBZSxDQUFDLENBQUMsb0ZBQW9GO1FBQy9HLFNBQUksR0FBRyxTQUFTLENBQUM7UUFDakIsYUFBUSxHQUFHLGdCQUFnQixDQUFDO1FBQzVCLGFBQVEsR0FBRyxTQUFTLENBQUM7UUFDckIsY0FBUyxHQUFHLGdCQUFnQixDQUFDO1FBRTdCLHVCQUF1QjtRQUN2QixhQUFRLEdBQUcsU0FBUyxDQUFDO1FBQ3JCLG9CQUFlLEdBQUcsUUFBUSxDQUFDO1FBQzNCLHVCQUFrQixHQUFHLFNBQVMsQ0FBQztRQUMvQixrQkFBYSxHQUFHLGdCQUFnQixDQUFDO1FBRWpDLDBCQUEwQjtRQUMxQixhQUFRLEdBQUcsU0FBUyxDQUFDO1FBQ3JCLGtCQUFhLEdBQUcsUUFBUSxDQUFDO1FBRXpCLHNCQUFzQjtRQUN0QixlQUFVLEdBQUcsZ0JBQWdCLENBQUM7UUFDOUIsY0FBUyxHQUFHLGdCQUFnQixDQUFDO1FBRTdCLHlCQUF5QjtRQUN6QixlQUFVLEdBQUcsU0FBUyxDQUFDO1FBRXZCLG1CQUFtQjtRQUNuQixvQkFBZSxHQUFHLFNBQVMsQ0FBQztJQUNaLENBQUM7SUFDbkIsNEJBQUM7QUFBRCxDQUFDLEFBMURELElBMERDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3dsT3B0aW9ucyB9IGZyb20gXCIuLi9tb2RlbHMvb3dsLW9wdGlvbnMubW9kZWxcIjtcclxuXHJcbi8qKlxyXG4gKiBEZWZhdWx0cyB2YWx1ZSBvZiBvcHRpb25zXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgT3dsQ2Fyb3VzZWxPQ29uZmlnIGltcGxlbWVudHMgT3dsT3B0aW9ucyB7XHJcbiAgaXRlbXMgPSAzO1xyXG4gIGxvb3AgPSBmYWxzZTtcclxuICBjZW50ZXIgPSBmYWxzZTtcclxuICByZXdpbmQgPSBmYWxzZTtcclxuXHJcbiAgbW91c2VEcmFnID0gdHJ1ZTtcclxuICB0b3VjaERyYWcgPSB0cnVlO1xyXG4gIHB1bGxEcmFnID0gdHJ1ZTtcclxuICBmcmVlRHJhZyA9IGZhbHNlO1xyXG5cclxuICBtYXJnaW4gPSAwO1xyXG4gIHN0YWdlUGFkZGluZyA9IDA7XHJcblxyXG4gIG1lcmdlID0gZmFsc2U7XHJcbiAgbWVyZ2VGaXQgPSB0cnVlO1xyXG4gIGF1dG9XaWR0aCA9IGZhbHNlO1xyXG5cclxuICBzdGFydFBvc2l0aW9uID0gMDtcclxuICBydGwgPSBmYWxzZTtcclxuXHJcbiAgc21hcnRTcGVlZCA9IDI1MDtcclxuICBmbHVpZFNwZWVkID0gZmFsc2U7XHJcbiAgZHJhZ0VuZFNwZWVkID0gZmFsc2U7XHJcblxyXG4gIHJlc3BvbnNpdmUgPSB7fTtcclxuICByZXNwb25zaXZlUmVmcmVzaFJhdGUgPSAyMDA7XHJcblxyXG4gIC8vIGRlZmF1bHRzIHRvIE5hdmlnYXRpb25cclxuICBuYXYgPSBmYWxzZTtcclxuICBuYXZUZXh0ID0gWyAncHJldicsICduZXh0JyBdO1xyXG4gIG5hdlNwZWVkID0gZmFsc2U7XHJcbiAgc2xpZGVCeSA9IDE7IC8vIHN0YWdlIG1vdmVzIG9uIDEgd2lkdGggb2Ygc2xpZGU7IGlmIHNsaWRlQnkgPSAyLCBzdGFnZSBtb3ZlcyBvbiAyIHdpZHRocyBvZiBzbGlkZVxyXG4gIGRvdHMgPSB0cnVlO1xyXG4gIGRvdHNFYWNoID0gZmFsc2U7XHJcbiAgZG90c0RhdGEgPSBmYWxzZTtcclxuICBkb3RzU3BlZWQgPSBmYWxzZTtcclxuXHJcbiAgLy8gZGVmYXVsdHMgdG8gQXV0b3BsYXlcclxuICBhdXRvcGxheSA9IGZhbHNlO1xyXG4gIGF1dG9wbGF5VGltZW91dCA9IDUwMDA7XHJcbiAgYXV0b3BsYXlIb3ZlclBhdXNlID0gZmFsc2U7XHJcbiAgYXV0b3BsYXlTcGVlZCA9IGZhbHNlO1xyXG5cclxuICAvLyBkZWZhdWx0cyB0byBMYXp5TG9hZGluZ1xyXG4gIGxhenlMb2FkID0gZmFsc2U7XHJcbiAgbGF6eUxvYWRFYWdlciA9IDA7XHJcblxyXG4gIC8vIGRlZmF1bHRzIHRvIEFuaW1hdGVcclxuICBhbmltYXRlT3V0ID0gZmFsc2U7XHJcbiAgYW5pbWF0ZUluID0gZmFsc2U7XHJcblxyXG4gIC8vIGRlZmF1bHRzIHRvIEF1dG9IZWlnaHRcclxuICBhdXRvSGVpZ2h0ID0gZmFsc2U7XHJcblxyXG4gIC8vIGRlZmF1bHRzIHRvIEhhc2hcclxuICBVUkxoYXNoTGlzdGVuZXIgPSBmYWxzZTtcclxuICBjb25zdHJ1Y3RvcigpIHsgfVxyXG59XHJcblxyXG4vKipcclxuICogd2UgY2FuJ3QgcmVhZCB0eXBlcyBmcm9tIE93bE9wdGlvbnMgaW4gamF2YXNjcmlwdCBiZWNhdXNlIG9mIHByb3BzIGhhdmUgdW5kZWZpbmVkIHZhbHVlIGFuZCB0eXBlcyBvZiB0aG9zZSBwcm9wcyBhcmUgdXNlZCBmb3IgdmFsaWRhdGluZyBpbnB1dHNcclxuICogY2xhc3MgYmVsb3cgaXMgY29weSBvZiBPd2xPcHRpb25zIGJ1dCBpdHMgYWxsIHByb3BzIGhhdmUgc3RyaW5nIHZhbHVlIHNob3dpbmcgY2VydGFpbiB0eXBlO1xyXG4gKiB0aGlzIGlzIGNsYXNzIGlzIGJlaW5nIHVzZWQganVzdCBpbiBtZXRob2QgX3ZhbGlkYXRlT3B0aW9ucygpIG9mIENhcm91c2VsU2VydmljZTtcclxuICovXHJcbmV4cG9ydCBjbGFzcyBPd2xPcHRpb25zTW9ja2VkVHlwZXMge1xyXG4gIGl0ZW1zID0gJ251bWJlcic7XHJcbiAgbG9vcCA9ICdib29sZWFuJztcclxuICBjZW50ZXIgPSAnYm9vbGVhbic7XHJcbiAgcmV3aW5kID0gJ2Jvb2xlYW4nO1xyXG5cclxuICBtb3VzZURyYWcgPSAnYm9vbGVhbic7XHJcbiAgdG91Y2hEcmFnID0gJ2Jvb2xlYW4nO1xyXG4gIHB1bGxEcmFnID0gJ2Jvb2xlYW4nO1xyXG4gIGZyZWVEcmFnID0gJ2Jvb2xlYW4nO1xyXG5cclxuICBtYXJnaW4gPSAnbnVtYmVyJztcclxuICBzdGFnZVBhZGRpbmcgPSAnbnVtYmVyJztcclxuXHJcbiAgbWVyZ2UgPSAnYm9vbGVhbic7XHJcbiAgbWVyZ2VGaXQgPSAnYm9vbGVhbic7XHJcbiAgYXV0b1dpZHRoID0gJ2Jvb2xlYW4nO1xyXG5cclxuICBzdGFydFBvc2l0aW9uID0gJ251bWJlcnxzdHJpbmcnO1xyXG4gIHJ0bCA9ICdib29sZWFuJztcclxuXHJcbiAgc21hcnRTcGVlZCA9ICdudW1iZXInO1xyXG4gIGZsdWlkU3BlZWQgPSAnYm9vbGVhbic7XHJcbiAgZHJhZ0VuZFNwZWVkID0gJ251bWJlcnxib29sZWFuJztcclxuXHJcbiAgcmVzcG9uc2l2ZSA9IHt9O1xyXG4gIHJlc3BvbnNpdmVSZWZyZXNoUmF0ZSA9ICdudW1iZXInO1xyXG5cclxuICAvLyBkZWZhdWx0cyB0byBOYXZpZ2F0aW9uXHJcbiAgbmF2ID0gJ2Jvb2xlYW4nO1xyXG4gIG5hdlRleHQgPSAnc3RyaW5nW10nO1xyXG4gIG5hdlNwZWVkID0gJ251bWJlcnxib29sZWFuJztcclxuICBzbGlkZUJ5ID0gJ251bWJlcnxzdHJpbmcnOyAvLyBzdGFnZSBtb3ZlcyBvbiAxIHdpZHRoIG9mIHNsaWRlOyBpZiBzbGlkZUJ5ID0gMiwgc3RhZ2UgbW92ZXMgb24gMiB3aWR0aHMgb2Ygc2xpZGVcclxuICBkb3RzID0gJ2Jvb2xlYW4nO1xyXG4gIGRvdHNFYWNoID0gJ251bWJlcnxib29sZWFuJztcclxuICBkb3RzRGF0YSA9ICdib29sZWFuJztcclxuICBkb3RzU3BlZWQgPSAnbnVtYmVyfGJvb2xlYW4nO1xyXG5cclxuICAvLyBkZWZhdWx0cyB0byBBdXRvcGxheVxyXG4gIGF1dG9wbGF5ID0gJ2Jvb2xlYW4nO1xyXG4gIGF1dG9wbGF5VGltZW91dCA9ICdudW1iZXInO1xyXG4gIGF1dG9wbGF5SG92ZXJQYXVzZSA9ICdib29sZWFuJztcclxuICBhdXRvcGxheVNwZWVkID0gJ251bWJlcnxib29sZWFuJztcclxuXHJcbiAgLy8gZGVmYXVsdHMgdG8gTGF6eUxvYWRpbmdcclxuICBsYXp5TG9hZCA9ICdib29sZWFuJztcclxuICBsYXp5TG9hZEVhZ2VyID0gJ251bWJlcic7XHJcblxyXG4gIC8vIGRlZmF1bHRzIHRvIEFuaW1hdGVcclxuICBhbmltYXRlT3V0ID0gJ3N0cmluZ3xib29sZWFuJztcclxuICBhbmltYXRlSW4gPSAnc3RyaW5nfGJvb2xlYW4nO1xyXG5cclxuICAvLyBkZWZhdWx0cyB0byBBdXRvSGVpZ2h0XHJcbiAgYXV0b0hlaWdodCA9ICdib29sZWFuJztcclxuXHJcbiAgLy8gZGVmYXVsdHMgdG8gSGFzaFxyXG4gIFVSTGhhc2hMaXN0ZW5lciA9IFwiYm9vbGVhblwiO1xyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcbn0iXX0=