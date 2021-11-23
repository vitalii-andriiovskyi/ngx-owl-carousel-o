import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CarouselService } from './carousel.service';
import * as i0 from "@angular/core";
export declare class LazyLoadService implements OnDestroy {
    private carouselService;
    /**
     * Subscrioption to merge Observable  from CarouselService
     */
    lazyLoadSubscription: Subscription;
    constructor(carouselService: CarouselService);
    ngOnDestroy(): void;
    /**
     * Defines Observables which service must observe
     */
    spyDataStreams(): void;
    private _defineLazyLoadSlides(data);
    /**
       * Loads all resources of an item at the specified position.
       * @param position - The absolute position of the item.
       */
    private _load;
    static ɵfac: i0.ɵɵFactoryDeclaration<LazyLoadService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LazyLoadService>;
}
