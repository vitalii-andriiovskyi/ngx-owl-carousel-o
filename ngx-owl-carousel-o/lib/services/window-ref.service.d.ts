import { ClassProvider, FactoryProvider, InjectionToken } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Create a new injection token for injecting the window into a component.
 */
export declare const WINDOW: InjectionToken<unknown>;
/**
 * Define abstract class for obtaining reference to the global window object.
 */
export declare abstract class WindowRef {
    get nativeWindow(): Window | Object;
}
/**
 * Define class that implements the abstract class and returns the native window object.
 */
export declare class BrowserWindowRef extends WindowRef {
    constructor();
    /**
     * @returns window object
     */
    get nativeWindow(): Window | Object;
    static ɵfac: i0.ɵɵFactoryDeclaration<BrowserWindowRef, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BrowserWindowRef>;
}
/**
 * Create an factory function that returns the native window object.
 * @param browserWindowRef Native window object
 * @param platformId id of platform
 * @returns type of platform of empty object
 */
export declare function windowFactory(browserWindowRef: BrowserWindowRef, platformId: Object): Window | Object;
/**
 * Create a injectable provider for the WindowRef token that uses the BrowserWindowRef class.
 */
export declare const browserWindowProvider: ClassProvider;
/**
 * Create an injectable provider that uses the windowFactory function for returning the native window object.
 */
export declare const windowProvider: FactoryProvider;
/**
 * Create an array of providers.
 */
export declare const WINDOW_PROVIDERS: (ClassProvider | FactoryProvider)[];
