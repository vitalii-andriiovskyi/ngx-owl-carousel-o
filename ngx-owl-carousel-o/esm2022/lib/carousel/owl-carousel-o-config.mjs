/**
 * Defaults value of options
 */
export class OwlCarouselOConfig {
    items = 3;
    skip_validateItems = false;
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
    // defaults to Navigation
    nav = false;
    navText = ['prev', 'next'];
    navSpeed = false;
    slideBy = 1; // stage moves on 1 width of slide; if slideBy = 2, stage moves on 2 widths of slide
    dots = true;
    dotsEach = false;
    dotsData = false;
    dotsSpeed = false;
    // defaults to Autoplay
    autoplay = false;
    autoplayTimeout = 5000;
    autoplayHoverPause = false;
    autoplaySpeed = false;
    autoplayMouseleaveTimeout = 1;
    // defaults to LazyLoading
    lazyLoad = false;
    lazyLoadEager = 0;
    // defaults to Animate
    slideTransition = '';
    animateOut = false;
    animateIn = false;
    // defaults to AutoHeight
    autoHeight = false;
    // defaults to Hash
    URLhashListener = false;
    constructor() { }
}
/**
 * we can't read types from OwlOptions in javascript because of props have undefined value and types of those props are used for validating inputs
 * class below is copy of OwlOptions but its all props have string value showing certain type;
 * this is class is being used just in method _validateOptions() of CarouselService;
 */
export class OwlOptionsMockedTypes {
    items = 'number';
    skip_validateItems = 'boolean';
    loop = 'boolean';
    center = 'boolean';
    rewind = 'boolean';
    mouseDrag = 'boolean';
    touchDrag = 'boolean';
    pullDrag = 'boolean';
    freeDrag = 'boolean';
    margin = 'number';
    stagePadding = 'number';
    merge = 'boolean';
    mergeFit = 'boolean';
    autoWidth = 'boolean';
    startPosition = 'number|string';
    rtl = 'boolean';
    smartSpeed = 'number';
    fluidSpeed = 'boolean';
    dragEndSpeed = 'number|boolean';
    responsive = {};
    responsiveRefreshRate = 'number';
    // defaults to Navigation
    nav = 'boolean';
    navText = 'string[]';
    navSpeed = 'number|boolean';
    slideBy = 'number|string'; // stage moves on 1 width of slide; if slideBy = 2, stage moves on 2 widths of slide
    dots = 'boolean';
    dotsEach = 'number|boolean';
    dotsData = 'boolean';
    dotsSpeed = 'number|boolean';
    // defaults to Autoplay
    autoplay = 'boolean';
    autoplayTimeout = 'number';
    autoplayHoverPause = 'boolean';
    autoplaySpeed = 'number|boolean';
    autoplayMouseleaveTimeout = 'number';
    // defaults to LazyLoading
    lazyLoad = 'boolean';
    lazyLoadEager = 'number';
    // defaults to Animate
    slideTransition = 'string';
    animateOut = 'string|boolean';
    animateIn = 'string|boolean';
    // defaults to AutoHeight
    autoHeight = 'boolean';
    // defaults to Hash
    URLhashListener = "boolean";
    constructor() { }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3dsLWNhcm91c2VsLW8tY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGlicy9uZ3gtb3dsLWNhcm91c2VsLW8vc3JjL2xpYi9jYXJvdXNlbC9vd2wtY2Fyb3VzZWwtby1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7O0dBRUc7QUFDSCxNQUFNLE9BQU8sa0JBQWtCO0lBQzdCLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDVixrQkFBa0IsR0FBRyxLQUFLLENBQUM7SUFDM0IsSUFBSSxHQUFHLEtBQUssQ0FBQztJQUNiLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDZixNQUFNLEdBQUcsS0FBSyxDQUFDO0lBRWYsU0FBUyxHQUFHLElBQUksQ0FBQztJQUNqQixTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQ2pCLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDaEIsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUVqQixNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ1gsWUFBWSxHQUFHLENBQUMsQ0FBQztJQUVqQixLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ2QsUUFBUSxHQUFHLElBQUksQ0FBQztJQUNoQixTQUFTLEdBQUcsS0FBSyxDQUFDO0lBRWxCLGFBQWEsR0FBRyxDQUFDLENBQUM7SUFDbEIsR0FBRyxHQUFHLEtBQUssQ0FBQztJQUVaLFVBQVUsR0FBRyxHQUFHLENBQUM7SUFDakIsVUFBVSxHQUFHLEtBQUssQ0FBQztJQUNuQixZQUFZLEdBQUcsS0FBSyxDQUFDO0lBRXJCLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFDaEIscUJBQXFCLEdBQUcsR0FBRyxDQUFDO0lBRTVCLHlCQUF5QjtJQUN6QixHQUFHLEdBQUcsS0FBSyxDQUFDO0lBQ1osT0FBTyxHQUFHLENBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBRSxDQUFDO0lBQzdCLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDakIsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLG9GQUFv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b2RlbHMvb3dsLW9wdGlvbnMubW9kZWxcIjtcblxuLyoqXG4gKiBEZWZhdWx0cyB2YWx1ZSBvZiBvcHRpb25zXG4gKi9cbmV4cG9ydCBjbGFzcyBPd2xDYXJvdXNlbE9Db25maWcgaW1wbGVtZW50cyBPd2xPcHRpb25zIHtcbiAgaXRlbXMgPSAzO1xuICBza2lwX3ZhbGlkYXRlSXRlbXMgPSBmYWxzZTtcbiAgbG9vcCA9IGZhbHNlO1xuICBjZW50ZXIgPSBmYWxzZTtcbiAgcmV3aW5kID0gZmFsc2U7XG5cbiAgbW91c2VEcmFnID0gdHJ1ZTtcbiAgdG91Y2hEcmFnID0gdHJ1ZTtcbiAgcHVsbERyYWcgPSB0cnVlO1xuICBmcmVlRHJhZyA9IGZhbHNlO1xuXG4gIG1hcmdpbiA9IDA7XG4gIHN0YWdlUGFkZGluZyA9IDA7XG5cbiAgbWVyZ2UgPSBmYWxzZTtcbiAgbWVyZ2VGaXQgPSB0cnVlO1xuICBhdXRvV2lkdGggPSBmYWxzZTtcblxuICBzdGFydFBvc2l0aW9uID0gMDtcbiAgcnRsID0gZmFsc2U7XG5cbiAgc21hcnRTcGVlZCA9IDI1MDtcbiAgZmx1aWRTcGVlZCA9IGZhbHNlO1xuICBkcmFnRW5kU3BlZWQgPSBmYWxzZTtcblxuICByZXNwb25zaXZlID0ge307XG4gIHJlc3BvbnNpdmVSZWZyZXNoUmF0ZSA9IDIwMDtcblxuICAvLyBkZWZhdWx0cyB0byBOYXZpZ2F0aW9uXG4gIG5hdiA9IGZhbHNlO1xuICBuYXZUZXh0ID0gWyAncHJldicsICduZXh0JyBdO1xuICBuYXZTcGVlZCA9IGZhbHNlO1xuICBzbGlkZUJ5ID0gMTsgLy8gc3RhZ2UgbW92ZXMgb24gMSB3aWR0aCBvZiBzbGlkZTsgaWYgc2xpZGVCeSA9IDIsIHN0YWdlIG1vdmVzIG9uIDIgd2lkdGhzIG9mIHNsaWRlXG4gIGRvdHMgPSB0cnVlO1xuICBkb3RzRWFjaCA9IGZhbHNlO1xuICBkb3RzRGF0YSA9IGZhbHNlO1xuICBkb3RzU3BlZWQgPSBmYWxzZTtcblxuICAvLyBkZWZhdWx0cyB0byBBdXRvcGxheVxuICBhdXRvcGxheSA9IGZhbHNlO1xuICBhdXRvcGxheVRpbWVvdXQgPSA1MDAwO1xuICBhdXRvcGxheUhvdmVyUGF1c2UgPSBmYWxzZTtcbiAgYXV0b3BsYXlTcGVlZCA9IGZhbHNlO1xuICBhdXRvcGxheU1vdXNlbGVhdmVUaW1lb3V0ID0gMTtcblxuICAvLyBkZWZhdWx0cyB0byBMYXp5TG9hZGluZ1xuICBsYXp5TG9hZCA9IGZhbHNlO1xuICBsYXp5TG9hZEVhZ2VyID0gMDtcblxuICAvLyBkZWZhdWx0cyB0byBBbmltYXRlXG4gIHNsaWRlVHJhbnNpdGlvbiA9ICcnO1xuICBhbmltYXRlT3V0ID0gZmFsc2U7XG4gIGFuaW1hdGVJbiA9IGZhbHNlO1xuXG4gIC8vIGRlZmF1bHRzIHRvIEF1dG9IZWlnaHRcbiAgYXV0b0hlaWdodCA9IGZhbHNlO1xuXG4gIC8vIGRlZmF1bHRzIHRvIEhhc2hcbiAgVVJMaGFzaExpc3RlbmVyID0gZmFsc2U7XG4gIGNvbnN0cnVjdG9yKCkgeyB9XG59XG5cbi8qKlxuICogd2UgY2FuJ3QgcmVhZCB0eXBlcyBmcm9tIE93bE9wdGlvbnMgaW4gamF2YXNjcmlwdCBiZWNhdXNlIG9mIHByb3BzIGhhdmUgdW5kZWZpbmVkIHZhbHVlIGFuZCB0eXBlcyBvZiB0aG9zZSBwcm9wcyBhcmUgdXNlZCBmb3IgdmFsaWRhdGluZyBpbnB1dHNcbiAqIGNsYXNzIGJlbG93IGlzIGNvcHkgb2YgT3dsT3B0aW9ucyBidXQgaXRzIGFsbCBwcm9wcyBoYXZlIHN0cmluZyB2YWx1ZSBzaG93aW5nIGNlcnRhaW4gdHlwZTtcbiAqIHRoaXMgaXMgY2xhc3MgaXMgYmVpbmcgdXNlZCBqdXN0IGluIG1ldGhvZCBfdmFsaWRhdGVPcHRpb25zKCkgb2YgQ2Fyb3VzZWxTZXJ2aWNlO1xuICovXG5leHBvcnQgY2xhc3MgT3dsT3B0aW9uc01vY2tlZFR5cGVzIHtcbiAgaXRlbXMgPSAnbnVtYmVyJztcbiAgc2tpcF92YWxpZGF0ZUl0ZW1zID0gJ2Jvb2xlYW4nO1xuICBsb29wID0gJ2Jvb2xlYW4nO1xuICBjZW50ZXIgPSAnYm9vbGVhbic7XG4gIHJld2luZCA9ICdib29sZWFuJztcblxuICBtb3VzZURyYWcgPSAnYm9vbGVhbic7XG4gIHRvdWNoRHJhZyA9ICdib29sZWFuJztcbiAgcHVsbERyYWcgPSAnYm9vbGVhbic7XG4gIGZyZWVEcmFnID0gJ2Jvb2xlYW4nO1xuXG4gIG1hcmdpbiA9ICdudW1iZXInO1xuICBzdGFnZVBhZGRpbmcgPSAnbnVtYmVyJztcblxuICBtZXJnZSA9ICdib29sZWFuJztcbiAgbWVyZ2VGaXQgPSAnYm9vbGVhbic7XG4gIGF1dG9XaWR0aCA9ICdib29sZWFuJztcblxuICBzdGFydFBvc2l0aW9uID0gJ251bWJlcnxzdHJpbmcnO1xuICBydGwgPSAnYm9vbGVhbic7XG5cbiAgc21hcnRTcGVlZCA9ICdudW1iZXInO1xuICBmbHVpZFNwZWVkID0gJ2Jvb2xlYW4nO1xuICBkcmFnRW5kU3BlZWQgPSAnbnVtYmVyfGJvb2xlYW4nO1xuXG4gIHJlc3BvbnNpdmUgPSB7fTtcbiAgcmVzcG9uc2l2ZVJlZnJlc2hSYXRlID0gJ251bWJlcic7XG5cbiAgLy8gZGVmYXVsdHMgdG8gTmF2aWdhdGlvblxuICBuYXYgPSAnYm9vbGVhbic7XG4gIG5hdlRleHQgPSAnc3RyaW5nW10nO1xuICBuYXZTcGVlZCA9ICdudW1iZXJ8Ym9vbGVhbic7XG4gIHNsaWRlQnkgPSAnbnVtYmVyfHN0cmluZyc7IC8vIHN0YWdlIG1vdmVzIG9uIDEgd2lkdGggb2Ygc2xpZGU7IGlmIHNsaWRlQnkgPSAyLCBzdGFnZSBtb3ZlcyBvbiAyIHdpZHRocyBvZiBzbGlkZVxuICBkb3RzID0gJ2Jvb2xlYW4nO1xuICBkb3RzRWFjaCA9ICdudW1iZXJ8Ym9vbGVhbic7XG4gIGRvdHNEYXRhID0gJ2Jvb2xlYW4nO1xuICBkb3RzU3BlZWQgPSAnbnVtYmVyfGJvb2xlYW4nO1xuXG4gIC8vIGRlZmF1bHRzIHRvIEF1dG9wbGF5XG4gIGF1dG9wbGF5ID0gJ2Jvb2xlYW4nO1xuICBhdXRvcGxheVRpbWVvdXQgPSAnbnVtYmVyJztcbiAgYXV0b3BsYXlIb3ZlclBhdXNlID0gJ2Jvb2xlYW4nO1xuICBhdXRvcGxheVNwZWVkID0gJ251bWJlcnxib29sZWFuJztcbiAgYXV0b3BsYXlNb3VzZWxlYXZlVGltZW91dCA9ICdudW1iZXInO1xuXG4gIC8vIGRlZmF1bHRzIHRvIExhenlMb2FkaW5nXG4gIGxhenlMb2FkID0gJ2Jvb2xlYW4nO1xuICBsYXp5TG9hZEVhZ2VyID0gJ251bWJlcic7XG5cbiAgLy8gZGVmYXVsdHMgdG8gQW5pbWF0ZVxuICBzbGlkZVRyYW5zaXRpb24gPSAnc3RyaW5nJztcbiAgYW5pbWF0ZU91dCA9ICdzdHJpbmd8Ym9vbGVhbic7XG4gIGFuaW1hdGVJbiA9ICdzdHJpbmd8Ym9vbGVhbic7XG5cbiAgLy8gZGVmYXVsdHMgdG8gQXV0b0hlaWdodFxuICBhdXRvSGVpZ2h0ID0gJ2Jvb2xlYW4nO1xuXG4gIC8vIGRlZmF1bHRzIHRvIEhhc2hcbiAgVVJMaGFzaExpc3RlbmVyID0gXCJib29sZWFuXCI7XG4gIGNvbnN0cnVjdG9yKCkgeyB9XG59Il19