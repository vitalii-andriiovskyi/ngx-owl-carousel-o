import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CarouselService } from './carousel.service';
export declare class AnimateService implements OnDestroy {
    private carouselService;
    /**
     * Subscrioption to merge Observable  from CarouselService
     */
    animateSubscription: Subscription;
    /**
     * s
     */
    swapping: boolean;
    /**
     * active slide before translating
     */
    previous: any;
    /**
     * new active slide after translating
     */
    next: any;
    constructor(carouselService: CarouselService);
    ngOnDestroy(): void;
    /**
     * Defines Observables which service must observe
     */
    spyDataStreams(): void;
    /**
       * Toggles the animation classes whenever an translations starts.
       * @returns
       */
    private _swap();
    /**
     * Handles the end of 'animationend' event
     * @param id Id of slides
     */
    clear(id: any): void;
}
