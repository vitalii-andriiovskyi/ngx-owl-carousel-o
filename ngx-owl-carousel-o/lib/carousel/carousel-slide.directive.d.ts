import { TemplateRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class CarouselSlideDirective {
    tplRef: TemplateRef<any>;
    /**
     * Unique slide identifier. Must be unique for the entire document for proper accessibility support.
     * Will be auto-generated if not provided.
     */
    id: string;
    /**
     * Defines how much widths of common slide will current slide have
     * e.g. if _mergeData=2, the slide will twice wider then slides with _mergeData=1
     */
    private _dataMerge;
    set dataMerge(data: number);
    get dataMerge(): number;
    /**
     * Width of slide
     */
    width: number;
    /**
     * Inner content of dot for certain slide; can be html-markup
     */
    dotContent: string;
    /**
     * Hash (fragment) of url which corresponds to certain slide
     */
    dataHash: string;
    constructor(tplRef: TemplateRef<any>);
    /**
       * Determines if the input is a Number or something that can be coerced to a Number
       * @param - The input to be tested
       * @returns - An indication if the input is a Number or can be coerced to a Number
       */
    isNumeric(number: any): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<CarouselSlideDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<CarouselSlideDirective, "ng-template[carouselSlide]", never, { "id": { "alias": "id"; "required": false; }; "dataMerge": { "alias": "dataMerge"; "required": false; }; "width": { "alias": "width"; "required": false; }; "dotContent": { "alias": "dotContent"; "required": false; }; "dataHash": { "alias": "dataHash"; "required": false; }; }, {}, never, never, false, never>;
}
