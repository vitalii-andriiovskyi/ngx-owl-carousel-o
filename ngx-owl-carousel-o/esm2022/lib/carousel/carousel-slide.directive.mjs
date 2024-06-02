import { Input, Directive } from '@angular/core';
import * as i0 from "@angular/core";
let nextId = 0;
export class CarouselSlideDirective {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: CarouselSlideDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.0.1", type: CarouselSlideDirective, selector: "ng-template[carouselSlide]", inputs: { id: "id", dataMerge: "dataMerge", width: "width", dotContent: "dotContent", dataHash: "dataHash" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: CarouselSlideDirective, decorators: [{
            type: Directive,
            args: [{ selector: 'ng-template[carouselSlide]' }]
        }], ctorParameters: () => [{ type: i0.TemplateRef }], propDecorators: { id: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwtc2xpZGUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGlicy9uZ3gtb3dsLWNhcm91c2VsLW8vc3JjL2xpYi9jYXJvdXNlbC9jYXJvdXNlbC1zbGlkZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQWUsTUFBTSxlQUFlLENBQUM7O0FBRTlELElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztBQUdmLE1BQU0sT0FBTyxzQkFBc0I7SUFpQ2Q7SUFoQ25COzs7T0FHRztJQUNNLEVBQUUsR0FBRyxhQUFhLE1BQU0sRUFBRSxFQUFFLENBQUM7SUFFdEM7OztPQUdHO0lBQ0ssVUFBVSxHQUFHLENBQUMsQ0FBQztJQUN2QixJQUNJLFNBQVMsQ0FBQyxJQUFZO1FBQ3hCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUFBLENBQUM7SUFDRixJQUFJLFNBQVMsS0FBYSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBRW5EOztPQUVHO0lBQ00sS0FBSyxHQUFHLENBQUMsQ0FBQztJQUVuQjs7T0FFRztJQUNNLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFFekI7O09BRUc7SUFDTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBRXZCLFlBQW1CLE1BQXdCO1FBQXhCLFdBQU0sR0FBTixNQUFNLENBQWtCO0lBQUksQ0FBQztJQUVoRDs7OztTQUlLO0lBQ0wsU0FBUyxDQUFDLE1BQVc7UUFDbkIsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNwQyxDQUFDO3VHQTFDVSxzQkFBc0I7MkZBQXRCLHNCQUFzQjs7MkZBQXRCLHNCQUFzQjtrQkFEbEMsU0FBUzttQkFBQyxFQUFFLFFBQVEsRUFBRSw0QkFBNEIsRUFBRTtnRkFNMUMsRUFBRTtzQkFBVixLQUFLO2dCQVFGLFNBQVM7c0JBRFosS0FBSztnQkFTRyxLQUFLO3NCQUFiLEtBQUs7Z0JBS0csVUFBVTtzQkFBbEIsS0FBSztnQkFLRyxRQUFRO3NCQUFoQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5wdXQsIERpcmVjdGl2ZSwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxubGV0IG5leHRJZCA9IDA7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ25nLXRlbXBsYXRlW2Nhcm91c2VsU2xpZGVdJyB9KVxuZXhwb3J0IGNsYXNzIENhcm91c2VsU2xpZGVEaXJlY3RpdmUge1xuICAvKipcbiAgICogVW5pcXVlIHNsaWRlIGlkZW50aWZpZXIuIE11c3QgYmUgdW5pcXVlIGZvciB0aGUgZW50aXJlIGRvY3VtZW50IGZvciBwcm9wZXIgYWNjZXNzaWJpbGl0eSBzdXBwb3J0LlxuICAgKiBXaWxsIGJlIGF1dG8tZ2VuZXJhdGVkIGlmIG5vdCBwcm92aWRlZC5cbiAgICovXG4gIEBJbnB1dCgpIGlkID0gYG93bC1zbGlkZS0ke25leHRJZCsrfWA7XG5cbiAgLyoqXG4gICAqIERlZmluZXMgaG93IG11Y2ggd2lkdGhzIG9mIGNvbW1vbiBzbGlkZSB3aWxsIGN1cnJlbnQgc2xpZGUgaGF2ZVxuICAgKiBlLmcuIGlmIF9tZXJnZURhdGE9MiwgdGhlIHNsaWRlIHdpbGwgdHdpY2Ugd2lkZXIgdGhlbiBzbGlkZXMgd2l0aCBfbWVyZ2VEYXRhPTFcbiAgICovXG4gIHByaXZhdGUgX2RhdGFNZXJnZSA9IDE7XG4gIEBJbnB1dCgpXG4gIHNldCBkYXRhTWVyZ2UoZGF0YTogbnVtYmVyKSB7XG4gICAgdGhpcy5fZGF0YU1lcmdlID0gdGhpcy5pc051bWVyaWMoZGF0YSkgPyBkYXRhIDogMTtcbiAgfTtcbiAgZ2V0IGRhdGFNZXJnZSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fZGF0YU1lcmdlOyB9XG5cbiAgLyoqXG4gICAqIFdpZHRoIG9mIHNsaWRlXG4gICAqL1xuICBASW5wdXQoKSB3aWR0aCA9IDA7XG5cbiAgLyoqXG4gICAqIElubmVyIGNvbnRlbnQgb2YgZG90IGZvciBjZXJ0YWluIHNsaWRlOyBjYW4gYmUgaHRtbC1tYXJrdXBcbiAgICovXG4gIEBJbnB1dCgpIGRvdENvbnRlbnQgPSAnJztcblxuICAvKipcbiAgICogSGFzaCAoZnJhZ21lbnQpIG9mIHVybCB3aGljaCBjb3JyZXNwb25kcyB0byBjZXJ0YWluIHNsaWRlXG4gICAqL1xuICBASW5wdXQoKSBkYXRhSGFzaCA9ICcnO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0cGxSZWY6IFRlbXBsYXRlUmVmPGFueT4pIHsgfVxuXG4gIC8qKlxuICAgICAqIERldGVybWluZXMgaWYgdGhlIGlucHV0IGlzIGEgTnVtYmVyIG9yIHNvbWV0aGluZyB0aGF0IGNhbiBiZSBjb2VyY2VkIHRvIGEgTnVtYmVyXG4gICAgICogQHBhcmFtIC0gVGhlIGlucHV0IHRvIGJlIHRlc3RlZFxuICAgICAqIEByZXR1cm5zIC0gQW4gaW5kaWNhdGlvbiBpZiB0aGUgaW5wdXQgaXMgYSBOdW1iZXIgb3IgY2FuIGJlIGNvZXJjZWQgdG8gYSBOdW1iZXJcbiAgICAgKi9cbiAgaXNOdW1lcmljKG51bWJlcjogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICFpc05hTihwYXJzZUZsb2F0KG51bWJlcikpO1xuICB9XG59XG4iXX0=