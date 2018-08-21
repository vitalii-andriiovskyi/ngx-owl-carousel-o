/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
export class SlideModel {
}
if (false) {
    /**
     * Id of slide
     * @type {?}
     */
    SlideModel.prototype.id;
    /**
     * Active state of slide. If true slide gets css-class .active
     * @type {?}
     */
    SlideModel.prototype.isActive;
    /**
     * TemplateRef of slide. In other words its html-markup
     * @type {?}
     */
    SlideModel.prototype.tplRef;
    /**
     * Number of grid parts to be used
     * @type {?}
     */
    SlideModel.prototype.dataMerge;
    /**
     * Width of slide
     * @type {?}
     */
    SlideModel.prototype.width;
    /**
     * Css-rule 'margin-left'
     * @type {?}
     */
    SlideModel.prototype.marginL;
    /**
     * Css-rule 'margin-right'
     * @type {?}
     */
    SlideModel.prototype.marginR;
    /**
     * Make slide to be on center of the carousel
     * @type {?}
     */
    SlideModel.prototype.isCentered;
    /**
     * Cloned slide. It's being used when 'loop'=true
     * @type {?}
     */
    SlideModel.prototype.isCloned;
    /**
     * Indicates whether slide should be lazy loaded
     * @type {?}
     */
    SlideModel.prototype.load;
    /**
     * Css-rule 'left'
     * @type {?}
     */
    SlideModel.prototype.left;
    /**
     * Changeable classes of slide
     * @type {?}
     */
    SlideModel.prototype.classes;
    /**
     * Shows whether slide could be animated and could have css-class '.animated'
     * @type {?}
     */
    SlideModel.prototype.isAnimated;
    /**
     * Shows whether slide could be animated-in and could have css-class '.owl-animated-in'
     * @type {?}
     */
    SlideModel.prototype.isDefAnimatedIn;
    /**
     * Shows whether slide could be animated-out and could have css-class '.owl-animated-out'
     * @type {?}
     */
    SlideModel.prototype.isDefAnimatedOut;
    /**
     * Shows whether slide could be animated-in and could have animation css-class defined by user
     * @type {?}
     */
    SlideModel.prototype.isCustomAnimatedIn;
    /**
     * Shows whether slide could be animated-out and could have animation css-class defined by user
     * @type {?}
     */
    SlideModel.prototype.isCustomAnimatedOut;
    /**
     * State for defining the height of slide.It's values could be 'full' and 'nulled'. 'Full' sets css-height to 'auto', 'nulled' sets height to '0'.
     * @type {?}
     */
    SlideModel.prototype.heightState;
    /**
     * Hash (fragment) of url which corresponds to slide
     * @type {?}
     */
    SlideModel.prototype.hashFragment;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGUubW9kZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vIiwic291cmNlcyI6WyJsaWIvbW9kZWxzL3NsaWRlLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxNQUFNO0NBNkZMIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGVtcGxhdGVSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNsaWRlTW9kZWwge1xyXG5cclxuICAvKipcclxuICAgKiBJZCBvZiBzbGlkZVxyXG4gICAqL1xyXG4gIGlkOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEFjdGl2ZSBzdGF0ZSBvZiBzbGlkZS4gSWYgdHJ1ZSBzbGlkZSBnZXRzIGNzcy1jbGFzcyAuYWN0aXZlXHJcbiAgICovXHJcbiAgaXNBY3RpdmU/OiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBUZW1wbGF0ZVJlZiBvZiBzbGlkZS4gSW4gb3RoZXIgd29yZHMgaXRzIGh0bWwtbWFya3VwXHJcbiAgICovXHJcbiAgdHBsUmVmPzogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgLyoqXHJcbiAgICogTnVtYmVyIG9mIGdyaWQgcGFydHMgdG8gYmUgdXNlZFxyXG4gICAqL1xyXG4gIGRhdGFNZXJnZT86IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogV2lkdGggb2Ygc2xpZGVcclxuICAgKi9cclxuICB3aWR0aD86IG51bWJlciB8IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogQ3NzLXJ1bGUgJ21hcmdpbi1sZWZ0J1xyXG4gICAqL1xyXG4gIG1hcmdpbkw/OiBudW1iZXIgfCBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIENzcy1ydWxlICdtYXJnaW4tcmlnaHQnXHJcbiAgICovXHJcbiAgbWFyZ2luUj86IG51bWJlciB8IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogTWFrZSBzbGlkZSB0byBiZSBvbiBjZW50ZXIgb2YgdGhlIGNhcm91c2VsXHJcbiAgICovXHJcbiAgaXNDZW50ZXJlZD86IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIENsb25lZCBzbGlkZS4gSXQncyBiZWluZyB1c2VkIHdoZW4gJ2xvb3AnPXRydWVcclxuICAgKi9cclxuICBpc0Nsb25lZD86IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIEluZGljYXRlcyB3aGV0aGVyIHNsaWRlIHNob3VsZCBiZSBsYXp5IGxvYWRlZFxyXG4gICAqL1xyXG4gIGxvYWQ/OiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBDc3MtcnVsZSAnbGVmdCdcclxuICAgKi9cclxuICBsZWZ0PzogbnVtYmVyIHwgc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBDaGFuZ2VhYmxlIGNsYXNzZXMgb2Ygc2xpZGVcclxuICAgKi9cclxuICBjbGFzc2VzPzoge1trZXk6c3RyaW5nXTogYm9vbGVhbn07XHJcblxyXG4gIC8qKlxyXG4gICAqIFNob3dzIHdoZXRoZXIgc2xpZGUgY291bGQgYmUgYW5pbWF0ZWQgYW5kIGNvdWxkIGhhdmUgY3NzLWNsYXNzICcuYW5pbWF0ZWQnXHJcbiAgICovXHJcbiAgaXNBbmltYXRlZD86IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFNob3dzIHdoZXRoZXIgc2xpZGUgY291bGQgYmUgYW5pbWF0ZWQtaW4gYW5kIGNvdWxkIGhhdmUgY3NzLWNsYXNzICcub3dsLWFuaW1hdGVkLWluJ1xyXG4gICAqL1xyXG4gIGlzRGVmQW5pbWF0ZWRJbj86IGJvb2xlYW47XHJcbiAgLyoqXHJcbiAgICogU2hvd3Mgd2hldGhlciBzbGlkZSBjb3VsZCBiZSBhbmltYXRlZC1vdXQgYW5kIGNvdWxkIGhhdmUgY3NzLWNsYXNzICcub3dsLWFuaW1hdGVkLW91dCdcclxuICAgKi9cclxuICBpc0RlZkFuaW1hdGVkT3V0PzogYm9vbGVhbjtcclxuICAvKipcclxuICAgKiBTaG93cyB3aGV0aGVyIHNsaWRlIGNvdWxkIGJlIGFuaW1hdGVkLWluIGFuZCBjb3VsZCBoYXZlIGFuaW1hdGlvbiBjc3MtY2xhc3MgZGVmaW5lZCBieSB1c2VyXHJcbiAgICovXHJcbiAgaXNDdXN0b21BbmltYXRlZEluPzogYm9vbGVhbjtcclxuICAvKipcclxuICAgKiBTaG93cyB3aGV0aGVyIHNsaWRlIGNvdWxkIGJlIGFuaW1hdGVkLW91dCBhbmQgY291bGQgaGF2ZSBhbmltYXRpb24gY3NzLWNsYXNzIGRlZmluZWQgYnkgdXNlclxyXG4gICAqL1xyXG4gIGlzQ3VzdG9tQW5pbWF0ZWRPdXQ/OiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBTdGF0ZSBmb3IgZGVmaW5pbmcgdGhlIGhlaWdodCBvZiBzbGlkZS5JdCdzIHZhbHVlcyBjb3VsZCBiZSAnZnVsbCcgYW5kICdudWxsZWQnLiAnRnVsbCcgc2V0cyBjc3MtaGVpZ2h0IHRvICdhdXRvJywgJ251bGxlZCcgc2V0cyBoZWlnaHQgdG8gJzAnLlxyXG4gICAqL1xyXG4gIGhlaWdodFN0YXRlPzogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBIYXNoIChmcmFnbWVudCkgb2YgdXJsIHdoaWNoIGNvcnJlc3BvbmRzIHRvIHNsaWRlXHJcbiAgICovXHJcbiAgaGFzaEZyYWdtZW50Pzogc3RyaW5nO1xyXG59Il19