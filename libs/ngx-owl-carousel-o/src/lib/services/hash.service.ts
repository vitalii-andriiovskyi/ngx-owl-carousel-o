import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, Observable, merge } from 'rxjs';
import { CarouselService } from './carousel.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class HashService implements OnDestroy {
  /**
   * Subscription to merge Observable from CarouselService
   */
  hashSubscription: Subscription;

  constructor(private carouselService: CarouselService) {
    this.spyDataStreams();
  }

  ngOnDestroy() {
    this.hashSubscription.unsubscribe();
  }
  /**
   * Defines Observables which service must observe
   */
  spyDataStreams() {
    const initializedCarousel$: Observable<string> = this.carouselService.getInitializedState().pipe(
      tap(data => {})
    );

    const changedSettings$: Observable<any> = this.carouselService.getChangedState().pipe(
      tap(data => {})
    );

    const hashFragment$: Observable<string | any> = merge(initializedCarousel$, changedSettings$);
    this.hashSubscription = hashFragment$.subscribe(
      () => {}
    );
  }
}
