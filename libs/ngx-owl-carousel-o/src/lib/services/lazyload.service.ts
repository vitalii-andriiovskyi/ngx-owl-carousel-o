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

  constructor(private carouselService: CarouselService) {
    this.spyDataStreams();
   }

  /**
   * Defines Observables which service must observe
   */
  spyDataStreams() {
    const initializedCarousel$: Observable<string> = this.carouselService.getInitializedState().pipe(
      tap(() => {
        const isLazyLoad = this.carouselService.settings && !this.carouselService.settings.lazyLoad;
        this.carouselService.slidesData.forEach(item => item.lazyLoad = isLazyLoad ? true : false);
      })
    );

    const changeSettings$: Observable<any> = this.carouselService.getChangeState();


    const lazyLoadMerge$: Observable<string | any> = merge(initializedCarousel$, changeSettings$).pipe(
      tap(data => this._defineLazyLoadSlides(data)),
      tap(() => this.carouselService.sendChanges())
    );
    this.lazyLoadSubscription = lazyLoadMerge$.subscribe(
      () => {}
    );
  }

  private _defineLazyLoadSlides(data: any) {
    if (!this.carouselService.settings || !this.carouselService.settings.lazyLoad) {
      return;
    }

    if ((data.property && data.property.name === 'position') || data === 'initialized') {
      const settings = this.carouselService.settings,
            clones = this.carouselService.clones().length;
      let n = (settings.center && Math.ceil(settings.items / 2) || settings.items),
          i = ((settings.center && n * -1) || 0),
          position = (data.property && data.property.value !== undefined ? data.property.value : this.carouselService.current()) + i;
        // load = $.proxy(function(i, v) { this.load(v) }, this);
      //TODO: Need documentation for this new option
      if (settings.lazyLoadEager > 0) {
        n += settings.lazyLoadEager;
        // If the carousel is looping also preload images that are to the "left"
        if (settings.loop) {
          position -= settings.lazyLoadEager;
          n++;
        }
      }

      while (i++ < n) {
        this._load(clones / 2 + this.carouselService.relative(position));
        if (clones) {
          this.carouselService.clones(this.carouselService.relative(position)).forEach(value => this._load(value));

        }
        position++;
      }
    }
  }

  /**
	 * Loads all resources of an item at the specified position.
	 * @param position - The absolute position of the item.
	 */
  private _load(position: number) {
    if (this.carouselService.slidesData[position].lazyLoad) {
      return;
    }

    this.carouselService.slidesData[position].lazyLoad = true;
  }
}
