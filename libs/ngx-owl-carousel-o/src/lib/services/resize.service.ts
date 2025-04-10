import { Observable, Subject, fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { WINDOW } from './window-ref.service';
import { DOCUMENT } from './document-ref.service';

@Injectable()
export class ResizeService {
  private resizeObservable$: Observable<Event>;
  private docRef: Document;

  /**
   * Makes resizeSubject become Observable
   * @returns Observable of resizeSubject
   */
  get onResize$(): Observable<Event> {
    return this.resizeObservable$.pipe(
      filter(() => !this.docRef?.fullscreenElement)
    );
  }

  constructor(@Inject(WINDOW) winRef: any, @Inject(DOCUMENT) docRef: any, @Inject(PLATFORM_ID) platformId: Object) {
    this.docRef = docRef as Document;
    this.resizeObservable$ = isPlatformBrowser(platformId)
      ? fromEvent(winRef, 'resize')
      : (new Subject<Event>()).asObservable();
  }
}
