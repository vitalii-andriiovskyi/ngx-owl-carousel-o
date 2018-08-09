/**
 * Data model for managing classes of .owl-stage DOM element
 */
export class StageData {
	/**
	 * Determines css-rule 'transform'
	 */
	transform: string;
	/**
	 *  Determines css-rule 'transition'
   */
	transition: string;
	/**
	 *  Determines css-rule 'width'
   */
	width: number | string;
	/**
	 *  Determines css-rule 'padding-left'
   */
	paddingL: number | string;
	/**
	 *  Determines css-rule 'padding-right'
   */
	paddingR: number | string;
}