/**
 * Data model for single navigation button
 */
export declare class NavButton {
    /**
     * Make button disabled by attaching class .disabled; it's being used when otpion loop=false
     */
    disabled: boolean;
    /**
     * Text for button; can be simple text or html-markup (e.g. <i class="fa fa-next">)
     */
    htmlText: string;
}
/**
 * Data model for  navigation block
 */
export declare class NavData {
    /**
     * Rurns on or turns off navigation block
     */
    disabled: boolean;
    /**
     * Navigation button 'prev'
     */
    prev: NavButton;
    /**
     * Navigation button 'next'
     */
    next: NavButton;
}
/**
 * data model for single owl dot-button
 */
export declare class OwlSingeDot {
    /**
     * Id for dot button
     */
    id: string;
    /**
     * Makes dot active by attaching .active class to it
     */
    active: boolean;
    /**
     * Inner content of dot; can be html-markup
     */
    innerContent?: string;
    /**
     * Enabled css-class which gives right presentaion of innerContent of dot.
     */
    showInnerContent?: boolean;
}
/**
 * Data model for owl dot-block
 */
export declare class DotsData {
    /**
     * Turns on or turns off navigation block
     */
    disabled: boolean;
    /**
     * Array of dots
     */
    dots: OwlSingeDot[];
}
