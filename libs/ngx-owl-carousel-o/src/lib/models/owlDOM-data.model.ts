/**
 * Data model for managing classes of .owl-carousel DOM element
 */
export class OwlDOMData {
	/**
	 * Defines whether to set class .owl-rtl or not
	 */
	rtl: boolean;
	/**
	 * Defines whether to set class .owl-responsive or not
	 */
	isResponsive: boolean;
	/**
	 * Defines whether to set class .owl-refreshed or not
	 */
	isRefreshed: boolean;
	/**
	 * Defines whether to set class .owl-loaded or not
	*/
	isLoaded: boolean;
	/**
	 * Defines whether to set class .owl-loading or not
	 */
	isLoading: boolean;
	/**
	 * Defines whether to set class .owl-drag or not and makes carousel draggable by mouse moving
	 */
	isMouseDragable: boolean;
	/**
	 * Makes carousel draggable by touch moving
	 */
	isTouchDragable: boolean;
	/**
	 * Defines whether to set class .owl-grab or not
	 */
	isGrab: boolean;
}