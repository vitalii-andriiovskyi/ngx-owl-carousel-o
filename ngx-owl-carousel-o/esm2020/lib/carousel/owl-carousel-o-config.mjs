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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3dsLWNhcm91c2VsLW8tY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGlicy9uZ3gtb3dsLWNhcm91c2VsLW8vc3JjL2xpYi9jYXJvdXNlbC9vd2wtY2Fyb3VzZWwtby1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7O0dBRUc7QUFDSCxNQUFNLE9BQU8sa0JBQWtCO0lBNEQ3QjtRQTNEQSxVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsdUJBQWtCLEdBQUcsS0FBSyxDQUFDO1FBQzNCLFNBQUksR0FBRyxLQUFLLENBQUM7UUFDYixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2YsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUVmLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFDakIsY0FBUyxHQUFHLElBQUksQ0FBQztRQUNqQixhQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFFakIsV0FBTSxHQUFHLENBQUMsQ0FBQztRQUNYLGlCQUFZLEdBQUcsQ0FBQyxDQUFDO1FBRWpCLFVBQUssR0FBRyxLQUFLLENBQUM7UUFDZCxhQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFFbEIsa0JBQWEsR0FBRyxDQUFDLENBQUM7UUFDbEIsUUFBRyxHQUFHLEtBQUssQ0FBQztRQUVaLGVBQVUsR0FBRyxHQUFHLENBQUM7UUFDakIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUVyQixlQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLDBCQUFxQixHQUFHLEdBQUcsQ0FBQztRQUU1Qix5QkFBeUI7UUFDekIsUUFBRyxHQUFHLEtBQUssQ0FBQztRQUNaLFlBQU8sR0FBRyxDQUFFLE1BQU0sRUFBRSxNQUFNLENBQUUsQ0FBQztRQUM3QixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLFlBQU8sR0FBRyxDQUFDLENBQUMs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IH0gZnJvbSBcIi4uL21vZGVscy9vd2wtb3B0aW9ucy5tb2RlbFwiO1xuXG4vKipcbiAqIERlZmF1bHRzIHZhbHVlIG9mIG9wdGlvbnNcbiAqL1xuZXhwb3J0IGNsYXNzIE93bENhcm91c2VsT0NvbmZpZyBpbXBsZW1lbnRzIE93bE9wdGlvbnMge1xuICBpdGVtcyA9IDM7XG4gIHNraXBfdmFsaWRhdGVJdGVtcyA9IGZhbHNlO1xuICBsb29wID0gZmFsc2U7XG4gIGNlbnRlciA9IGZhbHNlO1xuICByZXdpbmQgPSBmYWxzZTtcblxuICBtb3VzZURyYWcgPSB0cnVlO1xuICB0b3VjaERyYWcgPSB0cnVlO1xuICBwdWxsRHJhZyA9IHRydWU7XG4gIGZyZWVEcmFnID0gZmFsc2U7XG5cbiAgbWFyZ2luID0gMDtcbiAgc3RhZ2VQYWRkaW5nID0gMDtcblxuICBtZXJnZSA9IGZhbHNlO1xuICBtZXJnZUZpdCA9IHRydWU7XG4gIGF1dG9XaWR0aCA9IGZhbHNlO1xuXG4gIHN0YXJ0UG9zaXRpb24gPSAwO1xuICBydGwgPSBmYWxzZTtcblxuICBzbWFydFNwZWVkID0gMjUwO1xuICBmbHVpZFNwZWVkID0gZmFsc2U7XG4gIGRyYWdFbmRTcGVlZCA9IGZhbHNlO1xuXG4gIHJlc3BvbnNpdmUgPSB7fTtcbiAgcmVzcG9uc2l2ZVJlZnJlc2hSYXRlID0gMjAwO1xuXG4gIC8vIGRlZmF1bHRzIHRvIE5hdmlnYXRpb25cbiAgbmF2ID0gZmFsc2U7XG4gIG5hdlRleHQgPSBbICdwcmV2JywgJ25leHQnIF07XG4gIG5hdlNwZWVkID0gZmFsc2U7XG4gIHNsaWRlQnkgPSAxOyAvLyBzdGFnZSBtb3ZlcyBvbiAxIHdpZHRoIG9mIHNsaWRlOyBpZiBzbGlkZUJ5ID0gMiwgc3RhZ2UgbW92ZXMgb24gMiB3aWR0aHMgb2Ygc2xpZGVcbiAgZG90cyA9IHRydWU7XG4gIGRvdHNFYWNoID0gZmFsc2U7XG4gIGRvdHNEYXRhID0gZmFsc2U7XG4gIGRvdHNTcGVlZCA9IGZhbHNlO1xuXG4gIC8vIGRlZmF1bHRzIHRvIEF1dG9wbGF5XG4gIGF1dG9wbGF5ID0gZmFsc2U7XG4gIGF1dG9wbGF5VGltZW91dCA9IDUwMDA7XG4gIGF1dG9wbGF5SG92ZXJQYXVzZSA9IGZhbHNlO1xuICBhdXRvcGxheVNwZWVkID0gZmFsc2U7XG4gIGF1dG9wbGF5TW91c2VsZWF2ZVRpbWVvdXQgPSAxO1xuXG4gIC8vIGRlZmF1bHRzIHRvIExhenlMb2FkaW5nXG4gIGxhenlMb2FkID0gZmFsc2U7XG4gIGxhenlMb2FkRWFnZXIgPSAwO1xuXG4gIC8vIGRlZmF1bHRzIHRvIEFuaW1hdGVcbiAgc2xpZGVUcmFuc2l0aW9uID0gJyc7XG4gIGFuaW1hdGVPdXQgPSBmYWxzZTtcbiAgYW5pbWF0ZUluID0gZmFsc2U7XG5cbiAgLy8gZGVmYXVsdHMgdG8gQXV0b0hlaWdodFxuICBhdXRvSGVpZ2h0ID0gZmFsc2U7XG5cbiAgLy8gZGVmYXVsdHMgdG8gSGFzaFxuICBVUkxoYXNoTGlzdGVuZXIgPSBmYWxzZTtcbiAgY29uc3RydWN0b3IoKSB7IH1cbn1cblxuLyoqXG4gKiB3ZSBjYW4ndCByZWFkIHR5cGVzIGZyb20gT3dsT3B0aW9ucyBpbiBqYXZhc2NyaXB0IGJlY2F1c2Ugb2YgcHJvcHMgaGF2ZSB1bmRlZmluZWQgdmFsdWUgYW5kIHR5cGVzIG9mIHRob3NlIHByb3BzIGFyZSB1c2VkIGZvciB2YWxpZGF0aW5nIGlucHV0c1xuICogY2xhc3MgYmVsb3cgaXMgY29weSBvZiBPd2xPcHRpb25zIGJ1dCBpdHMgYWxsIHByb3BzIGhhdmUgc3RyaW5nIHZhbHVlIHNob3dpbmcgY2VydGFpbiB0eXBlO1xuICogdGhpcyBpcyBjbGFzcyBpcyBiZWluZyB1c2VkIGp1c3QgaW4gbWV0aG9kIF92YWxpZGF0ZU9wdGlvbnMoKSBvZiBDYXJvdXNlbFNlcnZpY2U7XG4gKi9cbmV4cG9ydCBjbGFzcyBPd2xPcHRpb25zTW9ja2VkVHlwZXMge1xuICBpdGVtcyA9ICdudW1iZXInO1xuICBza2lwX3ZhbGlkYXRlSXRlbXMgPSAnYm9vbGVhbic7XG4gIGxvb3AgPSAnYm9vbGVhbic7XG4gIGNlbnRlciA9ICdib29sZWFuJztcbiAgcmV3aW5kID0gJ2Jvb2xlYW4nO1xuXG4gIG1vdXNlRHJhZyA9ICdib29sZWFuJztcbiAgdG91Y2hEcmFnID0gJ2Jvb2xlYW4nO1xuICBwdWxsRHJhZyA9ICdib29sZWFuJztcbiAgZnJlZURyYWcgPSAnYm9vbGVhbic7XG5cbiAgbWFyZ2luID0gJ251bWJlcic7XG4gIHN0YWdlUGFkZGluZyA9ICdudW1iZXInO1xuXG4gIG1lcmdlID0gJ2Jvb2xlYW4nO1xuICBtZXJnZUZpdCA9ICdib29sZWFuJztcbiAgYXV0b1dpZHRoID0gJ2Jvb2xlYW4nO1xuXG4gIHN0YXJ0UG9zaXRpb24gPSAnbnVtYmVyfHN0cmluZyc7XG4gIHJ0bCA9ICdib29sZWFuJztcblxuICBzbWFydFNwZWVkID0gJ251bWJlcic7XG4gIGZsdWlkU3BlZWQgPSAnYm9vbGVhbic7XG4gIGRyYWdFbmRTcGVlZCA9ICdudW1iZXJ8Ym9vbGVhbic7XG5cbiAgcmVzcG9uc2l2ZSA9IHt9O1xuICByZXNwb25zaXZlUmVmcmVzaFJhdGUgPSAnbnVtYmVyJztcblxuICAvLyBkZWZhdWx0cyB0byBOYXZpZ2F0aW9uXG4gIG5hdiA9ICdib29sZWFuJztcbiAgbmF2VGV4dCA9ICdzdHJpbmdbXSc7XG4gIG5hdlNwZWVkID0gJ251bWJlcnxib29sZWFuJztcbiAgc2xpZGVCeSA9ICdudW1iZXJ8c3RyaW5nJzsgLy8gc3RhZ2UgbW92ZXMgb24gMSB3aWR0aCBvZiBzbGlkZTsgaWYgc2xpZGVCeSA9IDIsIHN0YWdlIG1vdmVzIG9uIDIgd2lkdGhzIG9mIHNsaWRlXG4gIGRvdHMgPSAnYm9vbGVhbic7XG4gIGRvdHNFYWNoID0gJ251bWJlcnxib29sZWFuJztcbiAgZG90c0RhdGEgPSAnYm9vbGVhbic7XG4gIGRvdHNTcGVlZCA9ICdudW1iZXJ8Ym9vbGVhbic7XG5cbiAgLy8gZGVmYXVsdHMgdG8gQXV0b3BsYXlcbiAgYXV0b3BsYXkgPSAnYm9vbGVhbic7XG4gIGF1dG9wbGF5VGltZW91dCA9ICdudW1iZXInO1xuICBhdXRvcGxheUhvdmVyUGF1c2UgPSAnYm9vbGVhbic7XG4gIGF1dG9wbGF5U3BlZWQgPSAnbnVtYmVyfGJvb2xlYW4nO1xuICBhdXRvcGxheU1vdXNlbGVhdmVUaW1lb3V0ID0gJ251bWJlcic7XG5cbiAgLy8gZGVmYXVsdHMgdG8gTGF6eUxvYWRpbmdcbiAgbGF6eUxvYWQgPSAnYm9vbGVhbic7XG4gIGxhenlMb2FkRWFnZXIgPSAnbnVtYmVyJztcblxuICAvLyBkZWZhdWx0cyB0byBBbmltYXRlXG4gIHNsaWRlVHJhbnNpdGlvbiA9ICdzdHJpbmcnO1xuICBhbmltYXRlT3V0ID0gJ3N0cmluZ3xib29sZWFuJztcbiAgYW5pbWF0ZUluID0gJ3N0cmluZ3xib29sZWFuJztcblxuICAvLyBkZWZhdWx0cyB0byBBdXRvSGVpZ2h0XG4gIGF1dG9IZWlnaHQgPSAnYm9vbGVhbic7XG5cbiAgLy8gZGVmYXVsdHMgdG8gSGFzaFxuICBVUkxoYXNoTGlzdGVuZXIgPSBcImJvb2xlYW5cIjtcbiAgY29uc3RydWN0b3IoKSB7IH1cbn0iXX0=