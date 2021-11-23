import { ClassProvider, FactoryProvider, InjectionToken } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Create a new injection token for injecting the Document into a component.
 */
export declare const DOCUMENT: InjectionToken<Document>;
/**
 * Define abstract class for obtaining reference to the global Document object.
 */
export declare abstract class DocumentRef {
    get nativeDocument(): Document | Object;
}
/**
 * Define class that implements the abstract class and returns the native Document object.
 */
export declare class BrowserDocumentRef extends DocumentRef {
    constructor();
    /**
     * @returns Document object
     */
    get nativeDocument(): Document | Object;
    static ɵfac: i0.ɵɵFactoryDeclaration<BrowserDocumentRef, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BrowserDocumentRef>;
}
/**
 * Create an factory function that returns the native Document object.
 * @param browserDocumentRef Native Document object
 * @param platformId id of platform
 * @returns type of platform of empty object
 */
export declare function documentFactory(browserDocumentRef: BrowserDocumentRef, platformId: Object): Document | Object;
/**
 * Create a injectable provider for the DocumentRef token that uses the BrowserDocumentRef class.
 */
export declare const browserDocumentProvider: ClassProvider;
/**
 * Create an injectable provider that uses the DocumentFactory function for returning the native Document object.
 */
export declare const documentProvider: FactoryProvider;
/**
 * Create an array of providers.
 */
export declare const DOCUMENT_PROVIDERS: (ClassProvider | FactoryProvider)[];
