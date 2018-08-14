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

  /**
   * s
   */
  swapping = true;

  /**
   * active slide before translating
   */
  previous = undefined;

  /**
   * new active slide after translating
   */
  next = undefined;

  constructor(private carouselService: CarouselService) { }

  ngOnDestroy() {
    this.animateSubscription.unsubscribe();
  }

  /**
   * Defines Observables which service must observe
   */
  spyDataStreams() {
    const changeSettings$: Observable<any> = this.carouselService.getChangeState().pipe(
      tap(data => {
        if (data.property.name === 'position') {
					this.previous = this.carouselService.current();
					this.next = data.property.value;
				}
      })
    );

    const dragCarousel$: Observable<string> = this.carouselService.getDragState();
    const draggedCarousel$: Observable<string> = this.carouselService.getDraggedState();
    const translatedCarousel$: Observable<string> = this.carouselService.getTranslatedState();

    const translateCarousel$: Observable<string> = this.carouselService.getTranslateState();

    const dragTranslatedMerge$: Observable<string> = merge(dragCarousel$, draggedCarousel$, translatedCarousel$).pipe(
      tap(data => this.swapping = data === 'translated')
    );
    const animateMerge$: Observable<string | any> = merge(changeSettings$, translateCarousel$, dragTranslatedMerge$).pipe();
    this.animateSubscription = animateMerge$.subscribe(
      () => {}
    );
  }

  /**
   * Handles the end of 'animationend' event
   * @param id Id of slides
   */
  clear(id) {
    this.carouselService.slidesData.forEach(slide => {
      if (slide.id === id) {
        slide.left = '';
        slide.classes = {}
      }
    })
		this.carouselService.onTransitionEnd();
	};
}
