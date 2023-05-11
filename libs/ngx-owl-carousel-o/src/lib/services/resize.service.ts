import { Observable, Subject, fromEvent } from 'rxjs';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { WINDOW } from './window-ref.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class ResizeService {
  private resizeObservable$: Observable<Event>;

  /**
   * Makes resizeSubject become Observable
   * @returns Observable of resizeSubject
   */
  get onResize$(): Observable<Event> {
    return this.resizeObservable$;
  }

  constructor(@Inject(WINDOW) winRef: any, @Inject(PLATFORM_ID) platformId: Object) {
    this.resizeObservable$ = isPlatformBrowser(platformId) ? fromEvent(winRef, 'resize') : (new Subject<Event>()).asObservable();
  }
}
