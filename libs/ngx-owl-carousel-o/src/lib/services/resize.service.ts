import { EventManager } from '@angular/platform-browser';
import { Observable, Subject } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from './document-ref.service';

@Injectable()
export class ResizeService {
  /**
   * Width of window
   */
  public windowWidth: any;

  /**
   * Makes resizeSubject become Observable
   * @returns Observable of resizeSubject
   */
  get onResize$(): Observable<Window> {
    return this.resizeSubject.asObservable();
  }

  /**
   * Subject of 'resize' event
   */
  private resizeSubject: Subject<Window>;
  private docRef: Document;

  constructor(private eventManager: EventManager, @Inject(DOCUMENT) docRef: any,) {

    this.docRef = docRef as Document;

    this.resizeSubject = new Subject();
    this.eventManager.addGlobalEventListener(
      'window',
      'resize',
      this.onResize.bind(this)
    );
    this.eventManager.addGlobalEventListener(
      'window',
      'onload',
      this.onLoaded.bind(this)
    );
  }

  /**
   * Handler of 'resize' event. Passes data throw resizeSubject
   * @param event Event Object of 'resize' event
   */
  private onResize(event: UIEvent) {
    if (this.docRef.fullscreenElement) {
      return
    }
    this.resizeSubject.next(<Window>event.target);
  }

  /**
   * Handler of 'onload' event. Defines the width of window
   * @param event Event Object of 'onload' event
   */
  private onLoaded(event: UIEvent) {
    this.windowWidth = <Window>event.target;
  }
}
