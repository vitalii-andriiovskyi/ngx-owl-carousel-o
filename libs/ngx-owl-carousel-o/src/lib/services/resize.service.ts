import { EventManager } from '@angular/platform-browser';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ResizeService {
  public windowWidth: any;

  get onResize$(): Observable<Window> {
    return this.resizeSubject.asObservable();
  }

  private resizeSubject: Subject<Window>;

  constructor(private eventManager: EventManager) {
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

  private onResize(event: UIEvent) {
    this.resizeSubject.next(<Window>event.target);
  }

  private onLoaded(event: UIEvent) {
    this.windowWidth = <Window>event.target;
  }
}
