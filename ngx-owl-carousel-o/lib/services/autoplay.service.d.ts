import { OnDestroy, NgZone } from '@angular/core';
import { Subscription } from 'rxjs';
import { CarouselService } from './carousel.service';
import * as i0 from "@angular/core";
export declare class AutoplayService implements OnDestroy {
    private carouselService;
    private ngZone;
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
    /**
     * Shows whether the code (the plugin) changed the option 'AutoplayTimeout' for own needs
     */
    private _isArtificialAutoplayTimeout;
    /**
     * Shows whether the autoplay is paused for unlimited time by the developer.
     * Use to prevent autoplaying in case of firing `mouseleave` by adding layers to `<body>` like `mat-menu` does
     */
    private _isAutoplayStopped;
    get isAutoplayStopped(): boolean;
    set isAutoplayStopped(value: boolean);
    private winRef;
    private docRef;
    constructor(carouselService: CarouselService, winRef: any, docRef: any, ngZone: NgZone);
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
    private _getNextTimeout(timeout?, speed?);
    /**
       * Sets autoplay in motion.
       */
    private _setAutoPlayInterval(timeout?);
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
    private _handleChangeObservable(data);
    /**
     * Starts autoplaying of the carousel in the case when user leaves the carousel before it starts translateing (moving)
     */
    private _playAfterTranslated();
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
    static ɵfac: i0.ɵɵFactoryDeclaration<AutoplayService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AutoplayService>;
}
