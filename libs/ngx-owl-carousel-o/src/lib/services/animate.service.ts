import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, Observable, merge } from 'rxjs';
import { CarouselService } from './carousel.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class AnimateService implements OnDestroy{
  /**
   * Subscrioption to merge Observable  from CarouselService
   */
  animateSubscription: Subscription;

  constructor(private carouselService: CarouselService) { }

  ngOnDestroy() {
    this.animateSubscription.unsubscribe();
  }

  /**
   * Defines Observables which service must observe
   */
  spyDataStreams() {
    const changeSettings$: Observable<any> = this.carouselService.getChangeState();

    const translatedCarousel$: Observable<string> = this.carouselService.getTranslatedState();

    const animateMerge$: Observable<string | any> = merge(changeSettings$).pipe();
    this.animateSubscription = animateMerge$.subscribe(
      () => {}
    );
  }
}
