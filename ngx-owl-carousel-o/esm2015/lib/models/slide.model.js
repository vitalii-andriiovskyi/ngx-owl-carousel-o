/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGUubW9kZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vIiwic291cmNlcyI6WyJsaWIvbW9kZWxzL3NsaWRlLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxNQUFNLE9BQU8sVUFBVTtDQTZGdEI7Ozs7OztJQXhGQyx3QkFBVzs7Ozs7SUFLWCw4QkFBbUI7Ozs7O0lBS25CLDRCQUEwQjs7Ozs7SUFLMUIsK0JBQW1COzs7OztJQUtuQiwyQkFBd0I7Ozs7O0lBS3hCLDZCQUEwQjs7Ozs7SUFLMUIsNkJBQTBCOzs7OztJQUsxQixnQ0FBcUI7Ozs7O0lBS3JCLDhCQUFtQjs7Ozs7SUFLbkIsMEJBQWU7Ozs7O0lBS2YsMEJBQXVCOzs7OztJQUt2Qiw2QkFBa0M7Ozs7O0lBS2xDLGdDQUFxQjs7Ozs7SUFLckIscUNBQTBCOzs7OztJQUkxQixzQ0FBMkI7Ozs7O0lBSTNCLHdDQUE2Qjs7Ozs7SUFJN0IseUNBQThCOzs7OztJQUs5QixpQ0FBcUI7Ozs7O0lBS3JCLGtDQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRlbXBsYXRlUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTbGlkZU1vZGVsIHtcclxuXHJcbiAgLyoqXHJcbiAgICogSWQgb2Ygc2xpZGVcclxuICAgKi9cclxuICBpZDogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBBY3RpdmUgc3RhdGUgb2Ygc2xpZGUuIElmIHRydWUgc2xpZGUgZ2V0cyBjc3MtY2xhc3MgLmFjdGl2ZVxyXG4gICAqL1xyXG4gIGlzQWN0aXZlPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGVtcGxhdGVSZWYgb2Ygc2xpZGUuIEluIG90aGVyIHdvcmRzIGl0cyBodG1sLW1hcmt1cFxyXG4gICAqL1xyXG4gIHRwbFJlZj86IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIC8qKlxyXG4gICAqIE51bWJlciBvZiBncmlkIHBhcnRzIHRvIGJlIHVzZWRcclxuICAgKi9cclxuICBkYXRhTWVyZ2U/OiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdpZHRoIG9mIHNsaWRlXHJcbiAgICovXHJcbiAgd2lkdGg/OiBudW1iZXIgfCBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIENzcy1ydWxlICdtYXJnaW4tbGVmdCdcclxuICAgKi9cclxuICBtYXJnaW5MPzogbnVtYmVyIHwgc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBDc3MtcnVsZSAnbWFyZ2luLXJpZ2h0J1xyXG4gICAqL1xyXG4gIG1hcmdpblI/OiBudW1iZXIgfCBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIE1ha2Ugc2xpZGUgdG8gYmUgb24gY2VudGVyIG9mIHRoZSBjYXJvdXNlbFxyXG4gICAqL1xyXG4gIGlzQ2VudGVyZWQ/OiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBDbG9uZWQgc2xpZGUuIEl0J3MgYmVpbmcgdXNlZCB3aGVuICdsb29wJz10cnVlXHJcbiAgICovXHJcbiAgaXNDbG9uZWQ/OiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciBzbGlkZSBzaG91bGQgYmUgbGF6eSBsb2FkZWRcclxuICAgKi9cclxuICBsb2FkPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ3NzLXJ1bGUgJ2xlZnQnXHJcbiAgICovXHJcbiAgbGVmdD86IG51bWJlciB8IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogQ2hhbmdlYWJsZSBjbGFzc2VzIG9mIHNsaWRlXHJcbiAgICovXHJcbiAgY2xhc3Nlcz86IHtba2V5OnN0cmluZ106IGJvb2xlYW59O1xyXG5cclxuICAvKipcclxuICAgKiBTaG93cyB3aGV0aGVyIHNsaWRlIGNvdWxkIGJlIGFuaW1hdGVkIGFuZCBjb3VsZCBoYXZlIGNzcy1jbGFzcyAnLmFuaW1hdGVkJ1xyXG4gICAqL1xyXG4gIGlzQW5pbWF0ZWQ/OiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBTaG93cyB3aGV0aGVyIHNsaWRlIGNvdWxkIGJlIGFuaW1hdGVkLWluIGFuZCBjb3VsZCBoYXZlIGNzcy1jbGFzcyAnLm93bC1hbmltYXRlZC1pbidcclxuICAgKi9cclxuICBpc0RlZkFuaW1hdGVkSW4/OiBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqIFNob3dzIHdoZXRoZXIgc2xpZGUgY291bGQgYmUgYW5pbWF0ZWQtb3V0IGFuZCBjb3VsZCBoYXZlIGNzcy1jbGFzcyAnLm93bC1hbmltYXRlZC1vdXQnXHJcbiAgICovXHJcbiAgaXNEZWZBbmltYXRlZE91dD86IGJvb2xlYW47XHJcbiAgLyoqXHJcbiAgICogU2hvd3Mgd2hldGhlciBzbGlkZSBjb3VsZCBiZSBhbmltYXRlZC1pbiBhbmQgY291bGQgaGF2ZSBhbmltYXRpb24gY3NzLWNsYXNzIGRlZmluZWQgYnkgdXNlclxyXG4gICAqL1xyXG4gIGlzQ3VzdG9tQW5pbWF0ZWRJbj86IGJvb2xlYW47XHJcbiAgLyoqXHJcbiAgICogU2hvd3Mgd2hldGhlciBzbGlkZSBjb3VsZCBiZSBhbmltYXRlZC1vdXQgYW5kIGNvdWxkIGhhdmUgYW5pbWF0aW9uIGNzcy1jbGFzcyBkZWZpbmVkIGJ5IHVzZXJcclxuICAgKi9cclxuICBpc0N1c3RvbUFuaW1hdGVkT3V0PzogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogU3RhdGUgZm9yIGRlZmluaW5nIHRoZSBoZWlnaHQgb2Ygc2xpZGUuSXQncyB2YWx1ZXMgY291bGQgYmUgJ2Z1bGwnIGFuZCAnbnVsbGVkJy4gJ0Z1bGwnIHNldHMgY3NzLWhlaWdodCB0byAnYXV0bycsICdudWxsZWQnIHNldHMgaGVpZ2h0IHRvICcwJy5cclxuICAgKi9cclxuICBoZWlnaHRTdGF0ZT86IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogSGFzaCAoZnJhZ21lbnQpIG9mIHVybCB3aGljaCBjb3JyZXNwb25kcyB0byBzbGlkZVxyXG4gICAqL1xyXG4gIGhhc2hGcmFnbWVudD86IHN0cmluZztcclxufSJdfQ==