/**
 * data model for single navigation button
 */
export class NavButton {
	/**
	 * make button disabled by attaching class .disabled; it's being used when otpion loop=false
	 */
	disabled: boolean;
	/**
	 * text for button; can be simple text or html-markup (e.g. <i class="fa fa-next">)
	 */
	htmlText: string;
}
/**
 * data model for  navigation block
 */
export class NavData {
	/**
	 * turns on or turns off navigation block
	 */
	disabled: boolean;
	/**
	 * navigation button 'prev'
	 */
	prev: NavButton;
	/**
	 * navigation button 'next'
	 */
	next: NavButton;
}
/**
 * data model for single owl dot-button
 */
export class OwlSingeDot {
	/**
	 * id for dot button
	 */
	id: string;
	/**
	 * makes dot active by attaching .active class to it
	 */
	active: boolean;
	/**
	 * inner content of dot; can be html-markup
	 */
	innerContent?: string;
	/**
	 * enabled css-class which gives right presentaion of innerContent of dot.
	 */
	showInnerContent?: boolean;
}
/**
 * data model for owl dot-block
 */
export class DotsData {
	/**
	 * turns on or turns off navigation block
	 */
	disabled: boolean;
	/**
	 * array of dots
	 */
	dots: OwlSingeDot[];
}