import { OnInit, OnDestroy, QueryList, ElementRef, AfterContentInit, EventEmitter, ChangeDetectorRef, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { ResizeService } from '../services/resize.service';
import { CarouselService } from '../services/carousel.service';
import { StageData } from "../models/stage-data.model";
import { OwlDOMData } from "../models/owlDOM-data.model";
import { SlideModel } from '../models/slide.model';
import { OwlOptions } from '../models/owl-options.model';
import { NavData, DotsData } from '../models/navigation-data.models';
import { NavigationService } from '../services/navigation.service';
import { AutoplayService } from '../services/autoplay.service';
import { LazyLoadService } from '../services/lazyload.service';
import { AnimateService } from '../services/animate.service';
import { AutoHeightService } from '../services/autoheight.service';
import { HashService } from '../services/hash.service';
import { OwlLogger } from '../services/logger.service';
import { CarouselSlideDirective } from './carousel-slide.directive';
import { SlidesOutputData } from '../models/SlidesOutputData';
import * as i0 from "@angular/core";
export declare class CarouselComponent implements OnInit, AfterContentInit, OnDestroy, OnChanges {
    private el;
    private resizeService;
    private carouselService;
    private navigationService;
    private autoplayService;
    private lazyLoadService;
    private animateService;
    private autoHeightService;
    private hashService;
    private logger;
    private changeDetectorRef;
    slides: QueryList<CarouselSlideDirective>;
    translated: EventEmitter<SlidesOutputData>;
    dragging: EventEmitter<{
        dragging: boolean;
        data: SlidesOutputData;
    }>;
    change: EventEmitter<SlidesOutputData>;
    changed: EventEmitter<SlidesOutputData>;
    initialized: EventEmitter<SlidesOutputData>;
    /**
     * Width of carousel window (tag with class .owl-carousel), in wich we can see moving sliders
     */
    carouselWindowWidth: number;
    /**
     * Subscription to 'resize' event
     */
    resizeSubscription: Subscription;
    /**
     * Subscription merge Observable, which merges all Observables in the component except 'resize' Observable and this.slides.changes()
     */
    private _allObservSubscription;
    /**
     * Subscription to `this.slides.changes().
     * It could be included in 'this._allObservSubscription', but that subcription get created during the initializing of component
     * and 'this.slides' are undefined at that moment. So it's needed to wait for initialization of content.
     */
    private _slidesChangesSubscription;
    /**
     * Current settings for the carousel.
     */
    owlDOMData: OwlDOMData;
    /**
     * Data of owl-stage
     */
    stageData: StageData;
    /**
       *  Data of every slide
       */
    slidesData: SlideModel[];
    /**
       * Data of navigation block
       */
    navData: NavData;
    /**
     * Data of dots block
     */
    dotsData: DotsData;
    /**
     * Data, wich are passed out of carousel after ending of transioning of carousel
     */
    slidesOutputData: SlidesOutputData;
    /**
     * Shows whether carousel is loaded of not.
     */
    carouselLoaded: boolean;
    /**
     * User's options
     */
    options: OwlOptions;
    prevOptions: OwlOptions;
    /**
     * Observable for getting current View Settings
     */
    private _viewCurSettings$;
    /**
     * Observable for catching the end of transition of carousel
     */
    private _translatedCarousel$;
    /**
     * Observable for catching the start of dragging of the carousel
     */
    private _draggingCarousel$;
    /**
     * Observable for catching the start of changing of the carousel
     */
    private _changeCarousel$;
    /**
     * Observable for catching the moment when the data about slides changed, more exactly when the position changed.
     */
    private _changedCarousel$;
    /**
     * Observable for catching the initialization of changing the carousel
     */
    private _initializedCarousel$;
    /**
     * Observable for merging all Observables and creating one subscription
     */
    private _carouselMerge$;
    private docRef;
    constructor(el: ElementRef, resizeService: ResizeService, carouselService: CarouselService, navigationService: NavigationService, autoplayService: AutoplayService, lazyLoadService: LazyLoadService, animateService: AnimateService, autoHeightService: AutoHeightService, hashService: HashService, logger: OwlLogger, changeDetectorRef: ChangeDetectorRef, docRef: any);
    onVisibilityChange(ev: any): void;
    ngOnInit(): void;
    ngOnChanges(): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    /**
     * Joins the observable login in one place: sets values to some observables, merges this observables and
     * subcribes to merge func
     */
    spyDataStreams(): void;
    /**
     * Init subscription to resize event and attaches handler for this event
     */
    private _winResizeWatcher();
    /**
     * Handler for transitioend event
     */
    onTransitionEnd(): void;
    /**
     * Handler for click event, attached to next button
     */
    next(): void;
    /**
     * Handler for click event, attached to prev button
     */
    prev(): void;
    /**
     * Handler for click event, attached to dots
     */
    moveByDot(dotId: string): void;
    /**
     * rewinds carousel to slide with needed id
     * @param id fragment of url
     */
    to(id: string): void;
    /**
     * Gathers and prepares data intended for passing to the user by means of firing event translatedCarousel
     */
    gatherTranslatedData(): void;
    /**
     * Starts pausing
     */
    startPausing(): void;
    /**
     * Starts playing after mouse leaves carousel
     */
    startPlayML(): void;
    /**
     * Starts playing after touch ends
     */
    startPlayTE(): void;
    stopAutoplay(): void;
    startAutoplay(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CarouselComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CarouselComponent, "owl-carousel-o", never, { "options": "options"; }, { "translated": "translated"; "dragging": "dragging"; "change": "change"; "changed": "changed"; "initialized": "initialized"; }, ["slides"], never, false>;
}
