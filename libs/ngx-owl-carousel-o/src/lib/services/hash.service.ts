import { Injectable, OnDestroy, Optional } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription, Observable, merge, of } from 'rxjs';
import { tap, skip, take } from 'rxjs/operators';

import { CarouselService } from './carousel.service';

@Injectable()
export class HashService implements OnDestroy {
  /**
   * Subscription to merge Observable from CarouselService
   */
  hashSubscription: Subscription;

  /**
   * Current url fragment (hash)
   */
  currentHashFragment: string;

  constructor(
    private carouselService: CarouselService,
    @Optional() private route: ActivatedRoute,
    @Optional() private router: Router
  ) {
    this.spyDataStreams();
    if (!this.route) {
      this.route = {
        fragment: of('no route').pipe(take(1))
      } as any;
    };

    if (!this.router) {
      this.router = {
        navigate: (commands: any[], extras?: any) => { return }
      } as any;
    }
  }

  ngOnDestroy() {
    this.hashSubscription.unsubscribe();
  }

  /**
   * Defines Observables which service must observe
   */
  spyDataStreams() {
    const initializedCarousel$: Observable<string> = this.carouselService.getInitializedState().pipe(
      tap(() => this.listenToRoute() )
    );

    const changedSettings$: Observable<any> = this.carouselService.getChangedState().pipe(
      tap(data => {
        if (this.carouselService.settings.URLhashListener && data.property.name === 'position') {
          const newCurSlide = this.carouselService.current();
          const newCurFragment = this.carouselService.slidesData[newCurSlide].hashFragment;

          if (!newCurFragment || newCurFragment === this.currentHashFragment) {
						return;
          }
          this.router.navigate(['./'], {fragment: newCurFragment, relativeTo: this.route});
        }
      })
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
    const position = this.carouselService.slidesData.findIndex(slide => slide.hashFragment === fragment && slide.isCloned === false);

    if (position === -1 || position === this.carouselService.current()) {
      return;
    }

		this.carouselService.to(this.carouselService.relative(position), false);
  }

  /**
   * Initiate listening to ActivatedRoute.fragment
   */
  listenToRoute() {
    const count = this.carouselService.settings.startPosition === 'URLHash' ? 0 : 2;
    this.route.fragment.pipe(
        skip(count)
      )
      .subscribe(
        fragment => {
          this.currentHashFragment = fragment;
          this.rewind(fragment);
        }
      )
  }
}
