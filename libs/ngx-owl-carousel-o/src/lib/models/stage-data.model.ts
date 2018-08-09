/**
 * data model for managing classes of .owl-stage DOM element
 */
export class StageData {
	/**
	 * determines css-rule transform
	 */
	transform: string;
	/**
	 *  determines css-rule transition
   */
	transition: string;
	/**
	 *  determines css-rule width
   */
	width: number | string;
	/**
	 *  determines css-rule padding-left
   */
	paddingL: number | string;
	/**
	 *  determines css-rule padding-right
   */
	paddingR: number | string;
}