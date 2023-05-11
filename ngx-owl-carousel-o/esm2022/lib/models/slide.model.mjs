export class SlideModel {
    /**
     * Id of slide
     */
    id;
    /**
     * Active state of slide. If true slide gets css-class .active
     */
    isActive;
    /**
     * TemplateRef of slide. In other words its html-markup
     */
    tplRef;
    /**
     * Number of grid parts to be used
     */
    dataMerge;
    /**
     * Width of slide
     */
    width;
    /**
     * Css-rule 'margin-left'
     */
    marginL;
    /**
     * Css-rule 'margin-right'
     */
    marginR;
    /**
     * Make slide to be on center of the carousel
     */
    isCentered;
    /**
     * Mark slide to be on center of the carousel (has .center)
     */
    center;
    /**
     * Cloned slide. It's being used when 'loop'=true
     */
    isCloned;
    /**
     * Indicates whether slide should be lazy loaded
     */
    load;
    /**
     * Css-rule 'left'
     */
    left;
    /**
     * Changeable classes of slide
     */
    classes;
    /**
     * Shows whether slide could be animated and could have css-class '.animated'
     */
    isAnimated;
    /**
     * Shows whether slide could be animated-in and could have css-class '.owl-animated-in'
     */
    isDefAnimatedIn;
    /**
     * Shows whether slide could be animated-out and could have css-class '.owl-animated-out'
     */
    isDefAnimatedOut;
    /**
     * Shows whether slide could be animated-in and could have animation css-class defined by user
     */
    isCustomAnimatedIn;
    /**
     * Shows whether slide could be animated-out and could have animation css-class defined by user
     */
    isCustomAnimatedOut;
    /**
     * State for defining the height of slide.It's values could be 'full' and 'nulled'. 'Full' sets css-height to 'auto', 'nulled' sets height to '0'.
     */
    heightState;
    /**
     * Hash (fragment) of url which corresponds to slide
     */
    hashFragment;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGUubW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWJzL25neC1vd2wtY2Fyb3VzZWwtby9zcmMvbGliL21vZGVscy9zbGlkZS5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxNQUFNLE9BQU8sVUFBVTtJQUVyQjs7T0FFRztJQUNILEVBQUUsQ0FBUztJQUVYOztPQUVHO0lBQ0gsUUFBUSxDQUFXO0lBRW5COztPQUVHO0lBQ0gsTUFBTSxDQUFvQjtJQUUxQjs7T0FFRztJQUNILFNBQVMsQ0FBVTtJQUVuQjs7T0FFRztJQUNILEtBQUssQ0FBbUI7SUFFeEI7O09BRUc7SUFDSCxPQUFPLENBQW1CO0lBRTFCOztPQUVHO0lBQ0gsT0FBTyxDQUFtQjtJQUUxQjs7T0FFRztJQUNILFVBQVUsQ0FBVztJQUVyQjs7T0FFRztJQUNILE1BQU0sQ0FBVztJQUVqQjs7T0FFRztJQUNILFFBQVEsQ0FBVztJQUVuQjs7T0FFRztJQUNILElBQUksQ0FBVztJQUVmOztPQUVHO0lBQ0gsSUFBSSxDQUFtQjtJQUV2Qjs7T0FFRztJQUNILE9BQU8sQ0FBMkI7SUFFbEM7O09BRUc7SUFDSCxVQUFVLENBQVc7SUFFckI7O09BRUc7SUFDSCxlQUFlLENBQVc7SUFDMUI7O09BRUc7SUFDSCxnQkFBZ0IsQ0FBVztJQUMzQjs7T0FFRztJQUNILGtCQUFrQixDQUFXO0lBQzdCOztPQUVHO0lBQ0gsbUJBQW1CLENBQVc7SUFFOUI7O09BRUc7SUFDSCxXQUFXLENBQVU7SUFFckI7O09BRUc7SUFDSCxZQUFZLENBQVU7Q0FDdkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUZW1wbGF0ZVJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbmV4cG9ydCBjbGFzcyBTbGlkZU1vZGVsIHtcblxuICAvKipcbiAgICogSWQgb2Ygc2xpZGVcbiAgICovXG4gIGlkOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEFjdGl2ZSBzdGF0ZSBvZiBzbGlkZS4gSWYgdHJ1ZSBzbGlkZSBnZXRzIGNzcy1jbGFzcyAuYWN0aXZlXG4gICAqL1xuICBpc0FjdGl2ZT86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFRlbXBsYXRlUmVmIG9mIHNsaWRlLiBJbiBvdGhlciB3b3JkcyBpdHMgaHRtbC1tYXJrdXBcbiAgICovXG4gIHRwbFJlZj86IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLyoqXG4gICAqIE51bWJlciBvZiBncmlkIHBhcnRzIHRvIGJlIHVzZWRcbiAgICovXG4gIGRhdGFNZXJnZT86IG51bWJlcjtcblxuICAvKipcbiAgICogV2lkdGggb2Ygc2xpZGVcbiAgICovXG4gIHdpZHRoPzogbnVtYmVyIHwgc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBDc3MtcnVsZSAnbWFyZ2luLWxlZnQnXG4gICAqL1xuICBtYXJnaW5MPzogbnVtYmVyIHwgc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBDc3MtcnVsZSAnbWFyZ2luLXJpZ2h0J1xuICAgKi9cbiAgbWFyZ2luUj86IG51bWJlciB8IHN0cmluZztcblxuICAvKipcbiAgICogTWFrZSBzbGlkZSB0byBiZSBvbiBjZW50ZXIgb2YgdGhlIGNhcm91c2VsXG4gICAqL1xuICBpc0NlbnRlcmVkPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogTWFyayBzbGlkZSB0byBiZSBvbiBjZW50ZXIgb2YgdGhlIGNhcm91c2VsIChoYXMgLmNlbnRlcilcbiAgICovXG4gIGNlbnRlcj86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIENsb25lZCBzbGlkZS4gSXQncyBiZWluZyB1c2VkIHdoZW4gJ2xvb3AnPXRydWVcbiAgICovXG4gIGlzQ2xvbmVkPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgc2xpZGUgc2hvdWxkIGJlIGxhenkgbG9hZGVkXG4gICAqL1xuICBsb2FkPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogQ3NzLXJ1bGUgJ2xlZnQnXG4gICAqL1xuICBsZWZ0PzogbnVtYmVyIHwgc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBDaGFuZ2VhYmxlIGNsYXNzZXMgb2Ygc2xpZGVcbiAgICovXG4gIGNsYXNzZXM/OiB7W2tleTpzdHJpbmddOiBib29sZWFufTtcblxuICAvKipcbiAgICogU2hvd3Mgd2hldGhlciBzbGlkZSBjb3VsZCBiZSBhbmltYXRlZCBhbmQgY291bGQgaGF2ZSBjc3MtY2xhc3MgJy5hbmltYXRlZCdcbiAgICovXG4gIGlzQW5pbWF0ZWQ/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBTaG93cyB3aGV0aGVyIHNsaWRlIGNvdWxkIGJlIGFuaW1hdGVkLWluIGFuZCBjb3VsZCBoYXZlIGNzcy1jbGFzcyAnLm93bC1hbmltYXRlZC1pbidcbiAgICovXG4gIGlzRGVmQW5pbWF0ZWRJbj86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBTaG93cyB3aGV0aGVyIHNsaWRlIGNvdWxkIGJlIGFuaW1hdGVkLW91dCBhbmQgY291bGQgaGF2ZSBjc3MtY2xhc3MgJy5vd2wtYW5pbWF0ZWQtb3V0J1xuICAgKi9cbiAgaXNEZWZBbmltYXRlZE91dD86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBTaG93cyB3aGV0aGVyIHNsaWRlIGNvdWxkIGJlIGFuaW1hdGVkLWluIGFuZCBjb3VsZCBoYXZlIGFuaW1hdGlvbiBjc3MtY2xhc3MgZGVmaW5lZCBieSB1c2VyXG4gICAqL1xuICBpc0N1c3RvbUFuaW1hdGVkSW4/OiBib29sZWFuO1xuICAvKipcbiAgICogU2hvd3Mgd2hldGhlciBzbGlkZSBjb3VsZCBiZSBhbmltYXRlZC1vdXQgYW5kIGNvdWxkIGhhdmUgYW5pbWF0aW9uIGNzcy1jbGFzcyBkZWZpbmVkIGJ5IHVzZXJcbiAgICovXG4gIGlzQ3VzdG9tQW5pbWF0ZWRPdXQ/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBTdGF0ZSBmb3IgZGVmaW5pbmcgdGhlIGhlaWdodCBvZiBzbGlkZS5JdCdzIHZhbHVlcyBjb3VsZCBiZSAnZnVsbCcgYW5kICdudWxsZWQnLiAnRnVsbCcgc2V0cyBjc3MtaGVpZ2h0IHRvICdhdXRvJywgJ251bGxlZCcgc2V0cyBoZWlnaHQgdG8gJzAnLlxuICAgKi9cbiAgaGVpZ2h0U3RhdGU/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEhhc2ggKGZyYWdtZW50KSBvZiB1cmwgd2hpY2ggY29ycmVzcG9uZHMgdG8gc2xpZGVcbiAgICovXG4gIGhhc2hGcmFnbWVudD86IHN0cmluZztcbn0iXX0=