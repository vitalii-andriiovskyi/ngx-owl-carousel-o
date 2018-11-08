import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CarouselService } from './carousel.service';
export declare class AutoplayService implements OnDestroy {
    private carouselService;
    /**
     * Subscrioption to merge Observables from CarouselService
     */
    autoplaySubscription: Subscription;
    /**
     * The autoplay timeout.
     */
    private _timeout;
    /**
     * Indicates whenever the autoplay is paused.
     */
    private _paused;
    private winRef;
    private docRef;
    constructor(carouselService: CarouselService, winRef: any, docRef: any);
    ngOnDestroy(): void;
    /**
     * Defines Observables which service must observe
     */
    spyDataStreams(): void;
    /**
       * Starts the autoplay.
       * @param timeout The interval before the next animation starts.
       * @param speed The animation speed for the animations.
       */
    play(timeout?: number, speed?: number): void;
    /**
       * Gets a new timeout
       * @param timeout - The interval before the next animation starts.
       * @param speed - The animation speed for the animations.
       * @return
       */
    private _getNextTimeout;
    /**
       * Sets autoplay in motion.
       */
    private _setAutoPlayInterval;
    /**
     * Stops the autoplay.
     */
    stop(): void;
    /**
       * Stops the autoplay.
       */
    pause(): void;
    /**
     * Manages by autoplaying according to data passed by _changedSettingsCarousel$ Obsarvable
     * @param data object with current position of carousel and type of change
     */
    private _handleChangeObservable;
    /**
     * Starts pausing
     */
    startPausing(): void;
    /**
     * Starts playing after mouse leaves carousel
     */
    startPlayingMouseLeave(): void;
    /**
     * Starts playing after touch ends
     */
    startPlayingTouchEnd(): void;
}
