import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, Observable, merge } from 'rxjs';
import { CarouselService } from './carousel.service';
import { tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class HashService implements OnDestroy {
  /**
   * Subscription to merge Observable from CarouselService
   */
  hashSubscription: Subscription;

  /**
   * Subscription to ActivatedRoute.fragment
   */
  routeSubscription: Subscription;

  constructor(private carouselService: CarouselService,
              private route: ActivatedRoute,
              private router: Router) {
    this.spyDataStreams();
  }

  ngOnDestroy() {
    this.hashSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
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

  /**
   * rewinds carousel to slide which has the same hashFragment as fragment of current url
   * @param fragment fragment of url
   */
  rewind(fragment: string) {
    const position = this.carouselService.slidesData.findIndex(slide => slide.hashFragment === fragment);

    if (position === -1 || position === this.carouselService.current()) {
      return;
    }

		this.carouselService.to(this.carouselService.relative(position), false);
  }

  /**
   * Initiate listening to ActivatedRoute.fragment
   */
  listenToRoute() {
    this.routeSubscription = this.route.fragment.subscribe(
      fragment => this.rewind(fragment)
    )
  }
}
