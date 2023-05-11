import { Observable, fromEvent } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { WINDOW } from './window-ref.service';

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

  constructor(@Inject(WINDOW) winRef: any) {
    this.resizeObservable$ = fromEvent(winRef, 'resize');
  }
}
