import { isPlatformBrowser } from '@angular/common';
import {
  ClassProvider,
  FactoryProvider,
  InjectionToken,
  PLATFORM_ID,
} from '@angular/core';

/**
 * Create a new injection token for injecting the Document into a component.
 */
export const DOCUMENT = new InjectionToken<Document>('DocumentToken');
/**
 * Define abstract class for obtaining reference to the global Document object.
 */
export abstract class DocumentRef {
  get nativeDocument(): Document | Object {
    throw new Error('Not implemented.');
  }
}

/**
 * Define class that implements the abstract class and returns the native Document object.
 */
export class BrowserDocumentRef extends DocumentRef {
  constructor() {
    super();
  }

  /**
   * @returns Document object
   */
  get nativeDocument(): Document | Object {
    return document;
  }
}

/**
 * Create an factory function that returns the native Document object.
 * @param browserDocumentRef Native Document object
 * @param platformId id of platform
 * @returns type of platform of empty object
 */
export function documentFactory(
  browserDocumentRef: BrowserDocumentRef,
  platformId: Object
): Document | Object {
  if (isPlatformBrowser(platformId)) {
    return browserDocumentRef.nativeDocument;
  }
  const doc = {
    hidden: false,
    visibilityState: 'visible'
  }
  return doc;
}

/**
 * Create a injectable provider for the DocumentRef token that uses the BrowserDocumentRef class.
 */
export const browserDocumentProvider: ClassProvider = {
  provide: DocumentRef,
  useClass: BrowserDocumentRef
};

/**
 * Create an injectable provider that uses the DocumentFactory function for returning the native Document object.
 */
export const documentProvider: FactoryProvider = {
  provide: DOCUMENT,
  useFactory: documentFactory,
  deps: [DocumentRef, PLATFORM_ID]
};

/**
 * Create an array of providers.
 */
export const DOCUMENT_PROVIDERS = [browserDocumentProvider, documentProvider];
