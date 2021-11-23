import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CarouselService } from './carousel.service';
import * as i0 from "@angular/core";
export declare class AutoHeightService implements OnDestroy {
    private carouselService;
    /**
     * Subscrioption to merge Observable  from CarouselService
     */
    autoHeightSubscription: Subscription;
    constructor(carouselService: CarouselService);
    ngOnDestroy(): void;
    /**
     * Defines Observables which service must observe
     */
    spyDataStreams(): void;
    /**
     * Updates the prop 'heightState' of slides
     */
    update(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AutoHeightService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AutoHeightService>;
}
