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
    const initializedCarousel$: Observable<string> = this.carouselService.getInitializedState().pipe(
      tap(data => {
        if (this.carouselService.settings.autoHeight) {
          this.update();
        } else {
          this.carouselService.slidesData.forEach(slide => slide.heightState = 'full');
        }
      })
    );

    const changedSettings$: Observable<any> = this.carouselService.getChangedState().pipe(
      tap(data => {
        if (this.carouselService.settings.autoHeight && data.property.name === 'position'){
					this.update();
				}
      })
    );

    const refreshedCarousel$: Observable<string> = this.carouselService.getRefreshedState().pipe(
      tap(data => {
        if (this.carouselService.settings.autoHeight) {
          this.update();
        }
      })
    );

    const autoHeight$: Observable<string | any> = merge(initializedCarousel$, changedSettings$, refreshedCarousel$);
    this.autoHeightSubscription = autoHeight$.subscribe(
      () => {}
    );
  }

  /**
   * Updates the prop 'heightState' of slides
   */
  update() {
    const start = this.carouselService.current(),
			end = start + this.carouselService.settings.items,
      visible: Map<string, string> = new Map(),
      cloneIdPref = this.carouselService.clonedIdPrefix;

    this.carouselService.slidesData.forEach((slide, i) => {
      if (i >= start && i < end) {
        visible.set(slide.id, slide.id);
      }
    });
    this.carouselService.slidesData.forEach((slide, i) => {
      slide.heightState = (i >= start && i < end) ? 'full' : 'nulled';
      if (this.carouselService.settings.loop && visible.size === this.carouselService.settings.items) {
        if (slide.isActive) {
          if (slide.id.indexOf(cloneIdPref) !== -1) {
            const id = slide.id.slice(cloneIdPref.length);
            if (visible.has(id)) slide.heightState = 'full';
          } else {
            if (visible.has(cloneIdPref+slide.id)) slide.heightState = 'full';
          }
        }
      }
    });
  }


}
