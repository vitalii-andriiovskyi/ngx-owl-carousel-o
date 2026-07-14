import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, Observable, merge } from 'rxjs';
import { CarouselService } from './carousel.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class AnimateService implements OnDestroy {
  /**
   * Subscrioption to merge Observable  from CarouselService
   */
  animateSubscription!: Subscription;

  /**
   * s
   */
  swapping = true;

  /**
   * active slide before translating
   */
  previous: number | undefined = undefined;

  /**
   * new active slide after translating
   */
  next: number | undefined = undefined;

  constructor(private carouselService: CarouselService) {
    this.spyDataStreams();
  }

  ngOnDestroy() {
    this.animateSubscription.unsubscribe();
  }

  /**
   * Defines Observables which service must observe
   */
  spyDataStreams() {
    const changeSettings$: Observable<any> = this.carouselService
      .getChangeState()
      .pipe(
        tap((data) => {
          if (data.property.name === 'position') {
            this.previous = this.carouselService.current();
            this.next = data.property.value;
          }
        })
      );

    const dragCarousel$: Observable<string> =
      this.carouselService.getDragState();
    const draggedCarousel$: Observable<string> =
      this.carouselService.getDraggedState();
    const translatedCarousel$: Observable<string> =
      this.carouselService.getTranslatedState();

    const dragTranslatedMerge$: Observable<string> = merge(
      dragCarousel$,
      draggedCarousel$,
      translatedCarousel$
    ).pipe(tap((data) => (this.swapping = data === 'translated')));

    const translateCarousel$: Observable<string> = this.carouselService
      .getTranslateState()
      .pipe(
        tap((data) => {
          if (
            this.swapping &&
            (this.carouselService._options.animateOut ||
              this.carouselService._options.animateIn)
          ) {
            this._swap();
          }
        })
      );

    const animateMerge$: Observable<string | any> = merge(
      changeSettings$,
      translateCarousel$,
      dragTranslatedMerge$
    ).pipe();
    this.animateSubscription = animateMerge$.subscribe(() => {});
  }

  /**
   * Toggles the animation classes whenever an translations starts.
   * @returns
   */
  private _swap() {
    if (this.carouselService.settings.items !== 1) {
      return;
    }

    // if (!$.support.animation || !$.support.transition) {
    // 	return;
    // }

    this.carouselService.speed(0);

    let left: number;
    const previous = this.carouselService.slidesData[this.previous as number],
      next = this.carouselService.slidesData[this.next as number],
      incoming = this.carouselService.settings.animateIn,
      outgoing = this.carouselService.settings.animateOut;

    if (this.carouselService.current() === this.previous) {
      return;
    }

    if (outgoing) {
      left =
        +this.carouselService.coordinates(this.previous) -
        +this.carouselService.coordinates(this.next);
      this.carouselService.slidesData.forEach((slide) => {
        if (slide.id === previous.id) {
          slide.left = `${left}px`;
          slide.isAnimated = true;
          slide.isDefAnimatedOut = true;
          slide.isCustomAnimatedOut = true;
        }
      });
    }

    if (incoming) {
      this.carouselService.slidesData.forEach((slide) => {
        if (slide.id === next.id) {
          slide.isAnimated = true;
          slide.isDefAnimatedIn = true;
          slide.isCustomAnimatedIn = true;
        }
      });
    }
  }

  /**
   * Handles the end of 'animationend' event
   * @param id Id of slides
   */
  clear(id: string) {
    this.carouselService.slidesData.forEach((slide) => {
      if (slide.id === id) {
        slide.left = '';
        slide.isAnimated = false;
        slide.isDefAnimatedOut = false;
        slide.isCustomAnimatedOut = false;
        slide.isDefAnimatedIn = false;
        slide.isCustomAnimatedIn = false;
        slide.classes = this.carouselService.setCurSlideClasses(slide);
      }
    });
    this.carouselService.onTransitionEnd();
  }
}
