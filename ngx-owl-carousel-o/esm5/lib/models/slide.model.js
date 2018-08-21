/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var SlideModel = /** @class */ (function () {
    function SlideModel() {
    }
    return SlideModel;
}());
export { SlideModel };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGUubW9kZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vIiwic291cmNlcyI6WyJsaWIvbW9kZWxzL3NsaWRlLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxJQUFBOzs7cUJBRkE7SUErRkMsQ0FBQTtBQTdGRCxzQkE2RkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUZW1wbGF0ZVJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU2xpZGVNb2RlbCB7XHJcblxyXG4gIC8qKlxyXG4gICAqIElkIG9mIHNsaWRlXHJcbiAgICovXHJcbiAgaWQ6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogQWN0aXZlIHN0YXRlIG9mIHNsaWRlLiBJZiB0cnVlIHNsaWRlIGdldHMgY3NzLWNsYXNzIC5hY3RpdmVcclxuICAgKi9cclxuICBpc0FjdGl2ZT86IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFRlbXBsYXRlUmVmIG9mIHNsaWRlLiBJbiBvdGhlciB3b3JkcyBpdHMgaHRtbC1tYXJrdXBcclxuICAgKi9cclxuICB0cGxSZWY/OiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAvKipcclxuICAgKiBOdW1iZXIgb2YgZ3JpZCBwYXJ0cyB0byBiZSB1c2VkXHJcbiAgICovXHJcbiAgZGF0YU1lcmdlPzogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBXaWR0aCBvZiBzbGlkZVxyXG4gICAqL1xyXG4gIHdpZHRoPzogbnVtYmVyIHwgc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBDc3MtcnVsZSAnbWFyZ2luLWxlZnQnXHJcbiAgICovXHJcbiAgbWFyZ2luTD86IG51bWJlciB8IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogQ3NzLXJ1bGUgJ21hcmdpbi1yaWdodCdcclxuICAgKi9cclxuICBtYXJnaW5SPzogbnVtYmVyIHwgc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBNYWtlIHNsaWRlIHRvIGJlIG9uIGNlbnRlciBvZiB0aGUgY2Fyb3VzZWxcclxuICAgKi9cclxuICBpc0NlbnRlcmVkPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ2xvbmVkIHNsaWRlLiBJdCdzIGJlaW5nIHVzZWQgd2hlbiAnbG9vcCc9dHJ1ZVxyXG4gICAqL1xyXG4gIGlzQ2xvbmVkPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgc2xpZGUgc2hvdWxkIGJlIGxhenkgbG9hZGVkXHJcbiAgICovXHJcbiAgbG9hZD86IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIENzcy1ydWxlICdsZWZ0J1xyXG4gICAqL1xyXG4gIGxlZnQ/OiBudW1iZXIgfCBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIENoYW5nZWFibGUgY2xhc3NlcyBvZiBzbGlkZVxyXG4gICAqL1xyXG4gIGNsYXNzZXM/OiB7W2tleTpzdHJpbmddOiBib29sZWFufTtcclxuXHJcbiAgLyoqXHJcbiAgICogU2hvd3Mgd2hldGhlciBzbGlkZSBjb3VsZCBiZSBhbmltYXRlZCBhbmQgY291bGQgaGF2ZSBjc3MtY2xhc3MgJy5hbmltYXRlZCdcclxuICAgKi9cclxuICBpc0FuaW1hdGVkPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogU2hvd3Mgd2hldGhlciBzbGlkZSBjb3VsZCBiZSBhbmltYXRlZC1pbiBhbmQgY291bGQgaGF2ZSBjc3MtY2xhc3MgJy5vd2wtYW5pbWF0ZWQtaW4nXHJcbiAgICovXHJcbiAgaXNEZWZBbmltYXRlZEluPzogYm9vbGVhbjtcclxuICAvKipcclxuICAgKiBTaG93cyB3aGV0aGVyIHNsaWRlIGNvdWxkIGJlIGFuaW1hdGVkLW91dCBhbmQgY291bGQgaGF2ZSBjc3MtY2xhc3MgJy5vd2wtYW5pbWF0ZWQtb3V0J1xyXG4gICAqL1xyXG4gIGlzRGVmQW5pbWF0ZWRPdXQ/OiBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqIFNob3dzIHdoZXRoZXIgc2xpZGUgY291bGQgYmUgYW5pbWF0ZWQtaW4gYW5kIGNvdWxkIGhhdmUgYW5pbWF0aW9uIGNzcy1jbGFzcyBkZWZpbmVkIGJ5IHVzZXJcclxuICAgKi9cclxuICBpc0N1c3RvbUFuaW1hdGVkSW4/OiBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqIFNob3dzIHdoZXRoZXIgc2xpZGUgY291bGQgYmUgYW5pbWF0ZWQtb3V0IGFuZCBjb3VsZCBoYXZlIGFuaW1hdGlvbiBjc3MtY2xhc3MgZGVmaW5lZCBieSB1c2VyXHJcbiAgICovXHJcbiAgaXNDdXN0b21BbmltYXRlZE91dD86IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0YXRlIGZvciBkZWZpbmluZyB0aGUgaGVpZ2h0IG9mIHNsaWRlLkl0J3MgdmFsdWVzIGNvdWxkIGJlICdmdWxsJyBhbmQgJ251bGxlZCcuICdGdWxsJyBzZXRzIGNzcy1oZWlnaHQgdG8gJ2F1dG8nLCAnbnVsbGVkJyBzZXRzIGhlaWdodCB0byAnMCcuXHJcbiAgICovXHJcbiAgaGVpZ2h0U3RhdGU/OiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhc2ggKGZyYWdtZW50KSBvZiB1cmwgd2hpY2ggY29ycmVzcG9uZHMgdG8gc2xpZGVcclxuICAgKi9cclxuICBoYXNoRnJhZ21lbnQ/OiBzdHJpbmc7XHJcbn0iXX0=