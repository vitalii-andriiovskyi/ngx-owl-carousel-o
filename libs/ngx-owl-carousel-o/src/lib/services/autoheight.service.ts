import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, Observable, merge } from 'rxjs';
import { CarouselService } from './carousel.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class AutoHeightService implements OnDestroy{
  /**
   * Subscrioption to merge Observable  from CarouselService
   */
  autoHeightSubscription: Subscription;
  constructor(private carouselService: CarouselService) {
    this.spyDataStreams();
  }

  ngOnDestroy() {
    this.autoHeightSubscription.unsubscribe();
  }
  /**
   * Defines Observables which service must observe
   */
  spyDataStreams() {
    const initializedCarousel$: Observable<string> = this.carouselService.getInitializedState();
    const changedSettings$: Observable<any> = this.carouselService.getChangedState();

    const refreshedCarousel$: Observable<string> = this.carouselService.getRefreshedState();

    const autoHeight$: Observable<string | any> = merge(initializedCarousel$, changedSettings$, refreshedCarousel$);
    this.autoHeightSubscription = autoHeight$.subscribe(
      () => {}
    );
  }


}
