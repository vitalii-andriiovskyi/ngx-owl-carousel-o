import { Injectable } from '@angular/core';
import { Subscription, Observable, merge } from 'rxjs';
import { CarouselService } from './carousel.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class LazyLoadService {
/**
   * Subscrioption to merge Observable  from CarouselService
   */
  lazyLoadSubscription: Subscription;

  constructor(private carouselService: CarouselService) { }

  /**
   * Defines Observables which service must observe
   */
  spyDataStreams() {
    const initializedCarousel$: Observable<string> = this.carouselService.getInitializedState().pipe(
      tap(() => {

      })
    );

    const changeSettings$: Observable<any> = this.carouselService.getChangeState().pipe(
      tap(data => {
      })
    );

    const resizedCarousel$: Observable<string> = this.carouselService.getResizedState().pipe();


    const lazyLoadMerge$: Observable<string | any> = merge(initializedCarousel$, changeSettings$, resizedCarousel$);
    this.lazyLoadSubscription = lazyLoadMerge$.subscribe(
      () => {}
    );
  }
}
