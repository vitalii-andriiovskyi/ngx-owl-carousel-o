import { Input, Directive } from '@angular/core';
import * as i0 from "@angular/core";
let nextId = 0;
class CarouselSlideDirective {
    tplRef;
    /**
     * Unique slide identifier. Must be unique for the entire document for proper accessibility support.
     * Will be auto-generated if not provided.
     */
    id = `owl-slide-${nextId++}`;
    /**
     * Defines how much widths of common slide will current slide have
     * e.g. if _mergeData=2, the slide will twice wider then slides with _mergeData=1
     */
    _dataMerge = 1;
    set dataMerge(data) {
        this._dataMerge = this.isNumeric(data) ? data : 1;
    }
    ;
    get dataMerge() { return this._dataMerge; }
    /**
     * Width of slide
     */
    width = 0;
    /**
     * Inner content of dot for certain slide; can be html-markup
     */
    dotContent = '';
    /**
     * Hash (fragment) of url which corresponds to certain slide
     */
    dataHash = '';
    constructor(tplRef) {
        this.tplRef = tplRef;
    }
    /**
       * Determines if the input is a Number or something that can be coerced to a Number
       * @param - The input to be tested
       * @returns - An indication if the input is a Number or can be coerced to a Number
       */
    isNumeric(number) {
        return !isNaN(parseFloat(number));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: CarouselSlideDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.0", type: CarouselSlideDirective, selector: "ng-template[carouselSlide]", inputs: { id: "id", dataMerge: "dataMerge", width: "width", dotContent: "dotContent", dataHash: "dataHash" }, ngImport: i0 });
}
export { CarouselSlideDirective };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: CarouselSlideDirective, decorators: [{
            type: Directive,
            args: [{ selector: 'ng-template[carouselSlide]' }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; }, propDecorators: { id: [{
                type: Input
            }], dataMerge: [{
                type: Input
            }], width: [{
                type: Input
            }], dotContent: [{
                type: Input
            }], dataHash: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwtc2xpZGUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGlicy9uZ3gtb3dsLWNhcm91c2VsLW8vc3JjL2xpYi9jYXJvdXNlbC9jYXJvdXNlbC1zbGlkZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQWUsTUFBTSxlQUFlLENBQUM7O0FBRTlELElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztBQUVmLE1BQ2Esc0JBQXNCO0lBaUNkO0lBaENuQjs7O09BR0c7SUFDTSxFQUFFLEdBQUcsYUFBYSxNQUFNLEVBQUUsRUFBRSxDQUFDO0lBRXRDOzs7T0FHRztJQUNLLFVBQVUsR0FBRyxDQUFDLENBQUM7SUFDdkIsSUFDSSxTQUFTLENBQUMsSUFBWTtRQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFBQSxDQUFDO0lBQ0YsSUFBSSxTQUFTLEtBQWEsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUVuRDs7T0FFRztJQUNNLEtBQUssR0FBRyxDQUFDLENBQUM7SUFFbkI7O09BRUc7SUFDTSxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBRXpCOztPQUVHO0lBQ00sUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUV2QixZQUFtQixNQUF3QjtRQUF4QixXQUFNLEdBQU4sTUFBTSxDQUFrQjtJQUFJLENBQUM7SUFFaEQ7Ozs7U0FJSztJQUNMLFNBQVMsQ0FBQyxNQUFXO1FBQ25CLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDcEMsQ0FBQzt1R0ExQ1Usc0JBQXNCOzJGQUF0QixzQkFBc0I7O1NBQXRCLHNCQUFzQjsyRkFBdEIsc0JBQXNCO2tCQURsQyxTQUFTO21CQUFDLEVBQUUsUUFBUSxFQUFFLDRCQUE0QixFQUFFO2tHQU0xQyxFQUFFO3NCQUFWLEtBQUs7Z0JBUUYsU0FBUztzQkFEWixLQUFLO2dCQVNHLEtBQUs7c0JBQWIsS0FBSztnQkFLRyxVQUFVO3NCQUFsQixLQUFLO2dCQUtHLFFBQVE7c0JBQWhCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbnB1dCwgRGlyZWN0aXZlLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5sZXQgbmV4dElkID0gMDtcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnbmctdGVtcGxhdGVbY2Fyb3VzZWxTbGlkZV0nIH0pXG5leHBvcnQgY2xhc3MgQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZSB7XG4gIC8qKlxuICAgKiBVbmlxdWUgc2xpZGUgaWRlbnRpZmllci4gTXVzdCBiZSB1bmlxdWUgZm9yIHRoZSBlbnRpcmUgZG9jdW1lbnQgZm9yIHByb3BlciBhY2Nlc3NpYmlsaXR5IHN1cHBvcnQuXG4gICAqIFdpbGwgYmUgYXV0by1nZW5lcmF0ZWQgaWYgbm90IHByb3ZpZGVkLlxuICAgKi9cbiAgQElucHV0KCkgaWQgPSBgb3dsLXNsaWRlLSR7bmV4dElkKyt9YDtcblxuICAvKipcbiAgICogRGVmaW5lcyBob3cgbXVjaCB3aWR0aHMgb2YgY29tbW9uIHNsaWRlIHdpbGwgY3VycmVudCBzbGlkZSBoYXZlXG4gICAqIGUuZy4gaWYgX21lcmdlRGF0YT0yLCB0aGUgc2xpZGUgd2lsbCB0d2ljZSB3aWRlciB0aGVuIHNsaWRlcyB3aXRoIF9tZXJnZURhdGE9MVxuICAgKi9cbiAgcHJpdmF0ZSBfZGF0YU1lcmdlID0gMTtcbiAgQElucHV0KClcbiAgc2V0IGRhdGFNZXJnZShkYXRhOiBudW1iZXIpIHtcbiAgICB0aGlzLl9kYXRhTWVyZ2UgPSB0aGlzLmlzTnVtZXJpYyhkYXRhKSA/IGRhdGEgOiAxO1xuICB9O1xuICBnZXQgZGF0YU1lcmdlKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9kYXRhTWVyZ2U7IH1cblxuICAvKipcbiAgICogV2lkdGggb2Ygc2xpZGVcbiAgICovXG4gIEBJbnB1dCgpIHdpZHRoID0gMDtcblxuICAvKipcbiAgICogSW5uZXIgY29udGVudCBvZiBkb3QgZm9yIGNlcnRhaW4gc2xpZGU7IGNhbiBiZSBodG1sLW1hcmt1cFxuICAgKi9cbiAgQElucHV0KCkgZG90Q29udGVudCA9ICcnO1xuXG4gIC8qKlxuICAgKiBIYXNoIChmcmFnbWVudCkgb2YgdXJsIHdoaWNoIGNvcnJlc3BvbmRzIHRvIGNlcnRhaW4gc2xpZGVcbiAgICovXG4gIEBJbnB1dCgpIGRhdGFIYXNoID0gJyc7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHRwbFJlZjogVGVtcGxhdGVSZWY8YW55PikgeyB9XG5cbiAgLyoqXG4gICAgICogRGV0ZXJtaW5lcyBpZiB0aGUgaW5wdXQgaXMgYSBOdW1iZXIgb3Igc29tZXRoaW5nIHRoYXQgY2FuIGJlIGNvZXJjZWQgdG8gYSBOdW1iZXJcbiAgICAgKiBAcGFyYW0gLSBUaGUgaW5wdXQgdG8gYmUgdGVzdGVkXG4gICAgICogQHJldHVybnMgLSBBbiBpbmRpY2F0aW9uIGlmIHRoZSBpbnB1dCBpcyBhIE51bWJlciBvciBjYW4gYmUgY29lcmNlZCB0byBhIE51bWJlclxuICAgICAqL1xuICBpc051bWVyaWMobnVtYmVyOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQobnVtYmVyKSk7XG4gIH1cbn1cbiJdfQ==