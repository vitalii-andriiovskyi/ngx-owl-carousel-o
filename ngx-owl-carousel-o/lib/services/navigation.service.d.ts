import { OnDestroy } from '@angular/core';
import { NavData, DotsData } from '../models/navigation-data.models';
import { CarouselService } from './carousel.service';
import { Subscription } from 'rxjs';
export declare class NavigationService implements OnDestroy {
    private carouselService;
    /**
     * Subscrioption to merge Observable  from CarouselService
     */
    navSubscription: Subscription;
    /**
     * Indicates whether the plugin is initialized or not.
     */
    protected _initialized: boolean;
    /**
     * The current paging indexes.
     */
    protected _pages: any[];
    /**
     * Data for navigation elements of the user interface.
     */
    protected _navData: NavData;
    /**
     * Data for dot elements of the user interface.
     */
    protected _dotsData: DotsData;
    constructor(carouselService: CarouselService);
    ngOnDestroy(): void;
    /**
     * Defines Observables which service must observe
     */
    spyDataStreams(): void;
    /**
       * Initializes the layout of the plugin and extends the carousel.
       */
    initialize(): void;
    /**
     * Calculates internal states and updates prop _pages
     */
    private _updateNavPages();
    /**
       * Draws the user interface.
       * @todo The option `dotsData` wont work.
       */
    draw(): void;
    /**
     * Updates navigation buttons's and dots's states
     */
    update(): void;
    /**
     * Changes state of nav buttons (disabled, enabled)
     */
    private _updateNavButtons();
    /**
     * Changes active dot if page becomes changed
     */
    private _updateDots();
    /**
       * Gets the current page position of the carousel.
       * @returns the current page position of the carousel
       */
    private _current();
    /**
       * Gets the current succesor/predecessor position.
     * @param sussessor position of slide
       * @returns the current succesor/predecessor position
       */
    private _getPosition(successor);
    /**
       * Slides to the next item or page.
       * @param speed The time in milliseconds for the transition.
       */
    next(speed: number | boolean): void;
    /**
     * Slides to the previous item or page.
     * @param speed The time in milliseconds for the transition.
     */
    prev(speed: number | boolean): void;
    /**
     * Slides to the specified item or page.
     * @param position - The position of the item or page.
     * @param speed - The time in milliseconds for the transition.
     * @param standard - Whether to use the standard behaviour or not. Default meaning false
     */
    to(position: number, speed: number | boolean, standard?: boolean): void;
    /**
     * Moves carousel after user's clicking on any dots
     */
    moveByDot(dotId: string): void;
}
