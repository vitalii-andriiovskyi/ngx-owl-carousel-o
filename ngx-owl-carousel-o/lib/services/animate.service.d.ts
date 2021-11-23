import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CarouselService } from './carousel.service';
import * as i0 from "@angular/core";
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
    private _swap;
    /**
     * Handles the end of 'animationend' event
     * @param id Id of slides
     */
    clear(id: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AnimateService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AnimateService>;
}
