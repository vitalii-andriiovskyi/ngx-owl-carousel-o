/**
 * Data model for single navigation button
 */
export class NavButton {
    /**
     * Make button disabled by attaching class .disabled; it's being used when otpion loop=false
     */
    disabled;
    /**
     * Text for button; can be simple text or html-markup (e.g. <i class="fa fa-next">)
     */
    htmlText;
}
/**
 * Data model for  navigation block
 */
export class NavData {
    /**
     * Rurns on or turns off navigation block
     */
    disabled;
    /**
     * Navigation button 'prev'
     */
    prev;
    /**
     * Navigation button 'next'
     */
    next;
}
/**
 * data model for single owl dot-button
 */
export class OwlSingeDot {
    /**
     * Id for dot button
     */
    id;
    /**
     * Makes dot active by attaching .active class to it
     */
    active;
    /**
     * Inner content of dot; can be html-markup
     */
    innerContent;
    /**
     * Enabled css-class which gives right presentaion of innerContent of dot.
     */
    showInnerContent;
}
/**
 * Data model for owl dot-block
 */
export class DotsData {
    /**
     * Turns on or turns off navigation block
     */
    disabled;
    /**
     * Array of dots
     */
    dots;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi1kYXRhLm1vZGVscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYnMvbmd4LW93bC1jYXJvdXNlbC1vL3NyYy9saWIvbW9kZWxzL25hdmlnYXRpb24tZGF0YS5tb2RlbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7QUFDSCxNQUFNLE9BQU8sU0FBUztJQUNyQjs7T0FFRztJQUNILFFBQVEsQ0FBVTtJQUNsQjs7T0FFRztJQUNILFFBQVEsQ0FBUztDQUNqQjtBQUNEOztHQUVHO0FBQ0gsTUFBTSxPQUFPLE9BQU87SUFDbkI7O09BRUc7SUFDSCxRQUFRLENBQVU7SUFDbEI7O09BRUc7SUFDSCxJQUFJLENBQVk7SUFDaEI7O09BRUc7SUFDSCxJQUFJLENBQVk7Q0FDaEI7QUFDRDs7R0FFRztBQUNILE1BQU0sT0FBTyxXQUFXO0lBQ3ZCOztPQUVHO0lBQ0gsRUFBRSxDQUFTO0lBQ1g7O09BRUc7SUFDSCxNQUFNLENBQVU7SUFDaEI7O09BRUc7SUFDSCxZQUFZLENBQVU7SUFDdEI7O09BRUc7SUFDSCxnQkFBZ0IsQ0FBVztDQUMzQjtBQUNEOztHQUVHO0FBQ0gsTUFBTSxPQUFPLFFBQVE7SUFDcEI7O09BRUc7SUFDSCxRQUFRLENBQVU7SUFDbEI7O09BRUc7SUFDSCxJQUFJLENBQWdCO0NBQ3BCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBEYXRhIG1vZGVsIGZvciBzaW5nbGUgbmF2aWdhdGlvbiBidXR0b25cbiAqL1xuZXhwb3J0IGNsYXNzIE5hdkJ1dHRvbiB7XG5cdC8qKlxuXHQgKiBNYWtlIGJ1dHRvbiBkaXNhYmxlZCBieSBhdHRhY2hpbmcgY2xhc3MgLmRpc2FibGVkOyBpdCdzIGJlaW5nIHVzZWQgd2hlbiBvdHBpb24gbG9vcD1mYWxzZVxuXHQgKi9cblx0ZGlzYWJsZWQ6IGJvb2xlYW47XG5cdC8qKlxuXHQgKiBUZXh0IGZvciBidXR0b247IGNhbiBiZSBzaW1wbGUgdGV4dCBvciBodG1sLW1hcmt1cCAoZS5nLiA8aSBjbGFzcz1cImZhIGZhLW5leHRcIj4pXG5cdCAqL1xuXHRodG1sVGV4dDogc3RyaW5nO1xufVxuLyoqXG4gKiBEYXRhIG1vZGVsIGZvciAgbmF2aWdhdGlvbiBibG9ja1xuICovXG5leHBvcnQgY2xhc3MgTmF2RGF0YSB7XG5cdC8qKlxuXHQgKiBSdXJucyBvbiBvciB0dXJucyBvZmYgbmF2aWdhdGlvbiBibG9ja1xuXHQgKi9cblx0ZGlzYWJsZWQ6IGJvb2xlYW47XG5cdC8qKlxuXHQgKiBOYXZpZ2F0aW9uIGJ1dHRvbiAncHJldidcblx0ICovXG5cdHByZXY6IE5hdkJ1dHRvbjtcblx0LyoqXG5cdCAqIE5hdmlnYXRpb24gYnV0dG9uICduZXh0J1xuXHQgKi9cblx0bmV4dDogTmF2QnV0dG9uO1xufVxuLyoqXG4gKiBkYXRhIG1vZGVsIGZvciBzaW5nbGUgb3dsIGRvdC1idXR0b25cbiAqL1xuZXhwb3J0IGNsYXNzIE93bFNpbmdlRG90IHtcblx0LyoqXG5cdCAqIElkIGZvciBkb3QgYnV0dG9uXG5cdCAqL1xuXHRpZDogc3RyaW5nO1xuXHQvKipcblx0ICogTWFrZXMgZG90IGFjdGl2ZSBieSBhdHRhY2hpbmcgLmFjdGl2ZSBjbGFzcyB0byBpdFxuXHQgKi9cblx0YWN0aXZlOiBib29sZWFuO1xuXHQvKipcblx0ICogSW5uZXIgY29udGVudCBvZiBkb3Q7IGNhbiBiZSBodG1sLW1hcmt1cFxuXHQgKi9cblx0aW5uZXJDb250ZW50Pzogc3RyaW5nO1xuXHQvKipcblx0ICogRW5hYmxlZCBjc3MtY2xhc3Mgd2hpY2ggZ2l2ZXMgcmlnaHQgcHJlc2VudGFpb24gb2YgaW5uZXJDb250ZW50IG9mIGRvdC5cblx0ICovXG5cdHNob3dJbm5lckNvbnRlbnQ/OiBib29sZWFuO1xufVxuLyoqXG4gKiBEYXRhIG1vZGVsIGZvciBvd2wgZG90LWJsb2NrXG4gKi9cbmV4cG9ydCBjbGFzcyBEb3RzRGF0YSB7XG5cdC8qKlxuXHQgKiBUdXJucyBvbiBvciB0dXJucyBvZmYgbmF2aWdhdGlvbiBibG9ja1xuXHQgKi9cblx0ZGlzYWJsZWQ6IGJvb2xlYW47XG5cdC8qKlxuXHQgKiBBcnJheSBvZiBkb3RzXG5cdCAqL1xuXHRkb3RzOiBPd2xTaW5nZURvdFtdO1xufSJdfQ==