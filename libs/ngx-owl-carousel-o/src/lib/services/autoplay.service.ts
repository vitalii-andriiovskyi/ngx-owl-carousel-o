import { Injectable } from '@angular/core';
import { Subscription, Observable, merge } from 'rxjs';
import { CarouselService } from './carousel.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutoplayService {
  /**
   * Subscrioption to merge Observables from CarouselService
   */
  autoplaySubscription: Subscription;

  /**
   * The autoplay timeout.
   */
  private _timeout: number = null;

  /**
   * Indicates whenever the autoplay is paused.
   */
  private _paused = false;

  constructor(private carouselService: CarouselService) { }

  /**
   * Defines Observables which service must observe
   */
  spyDataStreams() {

    const initializedCarousel$: Observable<string> = this.carouselService.getInitializedState().pipe(
      tap(state => {
        // this.initialize();
        this.carouselService.sendChanges();
      })
    );

    // mostly changes in carouselService and carousel at all causes carouselService.to(). It moves stage right-left by its code and calling needed functions
    // Thus this method by calling carouselService.current(position) notifies about changes
    const changedSettings$: Observable<string> = this.carouselService.getChangedState().pipe(
      tap(state => {
        // this.update();
        // this.carouselService.sendChanges();
      })
    );

    const autoplayMerge$: Observable<string> = merge(initializedCarousel$, changedSettings$);
    this.autoplaySubscription = autoplayMerge$.subscribe(
      () => {}
    );
  }
}
