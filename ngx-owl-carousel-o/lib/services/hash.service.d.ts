import { OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CarouselService } from './carousel.service';
export declare class HashService implements OnDestroy {
    private carouselService;
    private route;
    private router;
    /**
     * Subscription to merge Observable from CarouselService
     */
    hashSubscription: Subscription;
    /**
     * Current url fragment (hash)
     */
    currentHashFragment: string;
    constructor(carouselService: CarouselService, route: ActivatedRoute, router: Router);
    ngOnDestroy(): void;
    /**
     * Defines Observables which service must observe
     */
    spyDataStreams(): void;
    /**
     * rewinds carousel to slide which has the same hashFragment as fragment of current url
     * @param fragment fragment of url
     */
    rewind(fragment: string): void;
    /**
     * Initiate listening to ActivatedRoute.fragment
     */
    listenToRoute(): void;
}
