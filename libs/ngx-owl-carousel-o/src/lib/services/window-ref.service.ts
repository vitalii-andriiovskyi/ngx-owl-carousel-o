// import { Injectable } from '@angular/core';
// function _window(): any {
//    // return the global native browser window object
//    return window;
// }
// @Injectable()
// export class WindowRefService {
//    get nativeWindow(): any {
//       return _window();
//    }
// }

import { isPlatformBrowser } from '@angular/common';
import { ClassProvider, FactoryProvider, InjectionToken, PLATFORM_ID, Injectable } from '@angular/core';

/**
 * Create a new injection token for injecting the window into a component.
 */
export const WINDOW = new InjectionToken('WindowToken');

/**
 * Define abstract class for obtaining reference to the global window object.
 */
export abstract class WindowRef {
  get nativeWindow(): Window | Object {
    throw new Error('Not implemented.');
  }
}

/**
 * Define class that implements the abstract class and returns the native window object.
 */
@Injectable()
export class BrowserWindowRef extends WindowRef {
  constructor() {
    super();
  }

  /**
   * @returns window object
   */
  get nativeWindow(): Window | Object {
    return window;
  }
}

/**
 * Create an factory function that returns the native window object.
 * @param browserWindowRef Native window object
 * @param platformId id of platform
 * @returns type of platform of empty object
 */
export function windowFactory(
  browserWindowRef: BrowserWindowRef,
  platformId: Object
): Window | Object {
  if (isPlatformBrowser(platformId)) {
    return browserWindowRef.nativeWindow;
  }
  const obj = {
    setTimeout: (func: any, time: any) => { },
    clearTimeout: (a: any) => { }
  }
  return obj;
}

/**
 * Create a injectable provider for the WindowRef token that uses the BrowserWindowRef class.
 */
export const browserWindowProvider: ClassProvider = {
  provide: WindowRef,
  useClass: BrowserWindowRef
};

/**
 * Create an injectable provider that uses the windowFactory function for returning the native window object.
 */
export const windowProvider: FactoryProvider = {
  provide: WINDOW,
  useFactory: windowFactory,
  deps: [WindowRef, PLATFORM_ID]
};

/**
 * Create an array of providers.
 */
export const WINDOW_PROVIDERS = [browserWindowProvider, windowProvider];
