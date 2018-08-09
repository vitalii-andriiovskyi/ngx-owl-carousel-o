import { Injectable, Inject } from '@angular/core';
import { Subscription, Observable, merge } from 'rxjs';
import { CarouselService } from './carousel.service';
import { tap } from 'rxjs/operators';
import { WINDOW } from './window-ref.service';
import { DOCUMENT } from './document-ref.service';

@Injectable({
  providedIn: 'root'
})
export class AutoplayService {
  /**
   * Subscrioption to merge Observables from CarouselService
   */
  autoplaySubscription: Subscription;

  /**
   * The autoplay timeout.
   */
  private _timeout: number = null;

  /**
   * Indicates whenever the autoplay is paused.
   */
  private _paused = false;

  constructor(private carouselService: CarouselService,
              @Inject(WINDOW) private winRef: Window,
              @Inject(DOCUMENT) private docRef: Document,
  ) {
    this.spyDataStreams();
  }

  /**
   * Defines Observables which service must observe
   */
  spyDataStreams() {
    const initializedCarousel$: Observable<string> = this.carouselService.getInitializedState().pipe(
      tap(() => {
        if (this.carouselService.settings.autoplay) {
					this.play();
				}
      })
    );

    const changedSettings$: Observable<any> = this.carouselService.getChangedState().pipe(
      tap(data => {
        this._handleChangeObservable(data);
      })
    );

    // original Autoplay Plugin has listeners on play.owl.core and stop.owl.core events.
    // They are triggered by Video Plugin

    const autoplayMerge$: Observable<string> = merge(initializedCarousel$, changedSettings$);
    this.autoplaySubscription = autoplayMerge$.subscribe(
      () => {}
    );
  }

  /**
	 * Starts the autoplay.
	 * @param timeout The interval before the next animation starts.
	 * @param speed The animation speed for the animations.
	 */
	play(timeout?: number, speed?: number) {
		this._paused = false;

		if (this.carouselService.is('rotating')) {
			return;
		}

		this.carouselService.enter('rotating');

		this._setAutoPlayInterval();
  };

  /**
	 * Gets a new timeout
	 * @param timeout - The interval before the next animation starts.
	 * @param speed - The animation speed for the animations.
	 * @return
	 */
	private _getNextTimeout(timeout?: number, speed?: number): number {
		if ( this._timeout ) {
			this.winRef.clearTimeout(this._timeout);
		}
		return this.winRef.setTimeout(() =>{
      if (this._paused || this.carouselService.is('busy') || this.carouselService.is('interacting') || this.docRef.hidden) {
				return;
			}
			this.carouselService.next(speed || this.carouselService.settings.autoplaySpeed);
    }, timeout || this.carouselService.settings.autoplayTimeout);
  };

  /**
	 * Sets autoplay in motion.
	 */
	private _setAutoPlayInterval() {
		this._timeout = this._getNextTimeout();
	};

	/**
	 * Stops the autoplay.
	 */
	stop() {
		if (!this.carouselService.is('rotating')) {
			return;
		}

		this.winRef.clearTimeout(this._timeout);
		this.carouselService.leave('rotating');
  };

  /**
	 * Stops the autoplay.
	 */
	pause() {
		if (!this.carouselService.is('rotating')) {
			return;
		}

		this._paused = true;
  };

  /**
   * Manages by autoplaying according to data passed by _changedSettingsCarousel$ Obsarvable
   * @param data object with current position of carousel and type of change
   */
  private _handleChangeObservable(data) {
    if (data.property.name === 'settings') {
      if (this.carouselService.settings.autoplay) {
        this.play();
      } else {
        this.stop();
      }
    } else if (data.property.name === 'position') {
      //console.log('play?', e);
      if (this.carouselService.settings.autoplay) {
        this._setAutoPlayInterval();
      }
    }
  }

  /**
   * Starts pausing
   */
  startPausing() {
    if (this.carouselService.settings.autoplayHoverPause && this.carouselService.is('rotating')) {
      this.pause();
    }
  }

  /**
   * Starts playing after mouse leaves carousel
   */
  startPlayingMouseLeave() {
    if (this.carouselService.settings.autoplayHoverPause && this.carouselService.is('rotating')) {
      this.pause();
    }
  }

  /**
   * Starts playing after touch ends
   */
  startPlayingTouchEnd() {
    if (this.carouselService.settings.autoplayHoverPause && this.carouselService.is('rotating')) {
      this.pause();
    }
  }
}
