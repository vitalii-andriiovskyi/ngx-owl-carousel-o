/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Component, Input, Output, Directive, QueryList, ContentChildren, TemplateRef, ElementRef, EventEmitter, HostListener, Inject } from '@angular/core';
import { merge, of, from } from 'rxjs';
import { ResizeService } from '../services/resize.service';
import { tap, delay, filter, switchMap, first, map, skip, take, toArray } from 'rxjs/operators';
import { CarouselService } from '../services/carousel.service';
import { OwlOptions } from '../models/owl-options.model';
import { NavigationService } from '../services/navigation.service';
import { AutoplayService } from '../services/autoplay.service';
import { LazyLoadService } from '../services/lazyload.service';
import { AnimateService } from '../services/animate.service';
import { AutoHeightService } from '../services/autoheight.service';
import { HashService } from '../services/hash.service';
import { OwlLogger } from '../services/logger.service';
import { DOCUMENT } from '../services/document-ref.service';
/** @type {?} */
let nextId = 0;
export class CarouselSlideDirective {
    /**
     * @param {?} tplRef
     */
    constructor(tplRef) {
        this.tplRef = tplRef;
        /**
         * Unique slide identifier. Must be unique for the entire document for proper accessibility support.
         * Will be auto-generated if not provided.
         */
        this.id = `owl-slide-${nextId++}`;
        /**
         * Defines how much widths of common slide will current slide have
         * e.g. if _mergeData=2, the slide will twice wider then slides with _mergeData=1
         */
        this._dataMerge = 1;
        /**
         * Width of slide
         */
        this.width = 0;
        /**
         * Inner content of dot for certain slide; can be html-markup
         */
        this.dotContent = '';
        /**
         * Hash (fragment) of url which corresponds to certain slide
         */
        this.dataHash = '';
    }
    /**
     * @param {?} data
     * @return {?}
     */
    set dataMerge(data) {
        this._dataMerge = this.isNumeric(data) ? data : 1;
    }
    ;
    /**
     * @return {?}
     */
    get dataMerge() { return this._dataMerge; }
    /**
     * Determines if the input is a Number or something that can be coerced to a Number
     * @param {?} number
     * @return {?} - An indication if the input is a Number or can be coerced to a Number
     */
    isNumeric(number) {
        return !isNaN(parseFloat(number));
    }
}
CarouselSlideDirective.decorators = [
    { type: Directive, args: [{ selector: 'ng-template[carouselSlide]' },] }
];
/** @nocollapse */
CarouselSlideDirective.ctorParameters = () => [
    { type: TemplateRef }
];
CarouselSlideDirective.propDecorators = {
    id: [{ type: Input }],
    dataMerge: [{ type: Input }],
    width: [{ type: Input }],
    dotContent: [{ type: Input }],
    dataHash: [{ type: Input }]
};
if (false) {
    /**
     * Unique slide identifier. Must be unique for the entire document for proper accessibility support.
     * Will be auto-generated if not provided.
     * @type {?}
     */
    CarouselSlideDirective.prototype.id;
    /**
     * Defines how much widths of common slide will current slide have
     * e.g. if _mergeData=2, the slide will twice wider then slides with _mergeData=1
     * @type {?}
     */
    CarouselSlideDirective.prototype._dataMerge;
    /**
     * Width of slide
     * @type {?}
     */
    CarouselSlideDirective.prototype.width;
    /**
     * Inner content of dot for certain slide; can be html-markup
     * @type {?}
     */
    CarouselSlideDirective.prototype.dotContent;
    /**
     * Hash (fragment) of url which corresponds to certain slide
     * @type {?}
     */
    CarouselSlideDirective.prototype.dataHash;
    /** @type {?} */
    CarouselSlideDirective.prototype.tplRef;
    /* Skipping unhandled member: ;*/
}
/**
 * Data which will be passed out after ending of transition of carousel
 */
export class SlidesOutputData {
}
if (false) {
    /** @type {?} */
    SlidesOutputData.prototype.startPosition;
    /** @type {?} */
    SlidesOutputData.prototype.slides;
}
;
export class CarouselComponent {
    /**
     * @param {?} el
     * @param {?} resizeService
     * @param {?} carouselService
     * @param {?} navigationService
     * @param {?} autoplayService
     * @param {?} lazyLoadService
     * @param {?} animateService
     * @param {?} autoHeightService
     * @param {?} hashService
     * @param {?} logger
     * @param {?} docRef
     */
    constructor(el, resizeService, carouselService, navigationService, autoplayService, lazyLoadService, animateService, autoHeightService, hashService, logger, docRef) {
        this.el = el;
        this.resizeService = resizeService;
        this.carouselService = carouselService;
        this.navigationService = navigationService;
        this.autoplayService = autoplayService;
        this.lazyLoadService = lazyLoadService;
        this.animateService = animateService;
        this.autoHeightService = autoHeightService;
        this.hashService = hashService;
        this.logger = logger;
        this.translated = new EventEmitter();
        this.dragging = new EventEmitter();
        this.change = new EventEmitter();
        this.changed = new EventEmitter();
        this.initialized = new EventEmitter();
        /**
         *  Data of every slide
         */
        this.slidesData = [];
        /**
         * Shows whether carousel is loaded of not.
         */
        this.carouselLoaded = false;
        this.docRef = (/** @type {?} */ (docRef));
    }
    /**
     * @param {?} ev
     * @return {?}
     */
    onVisibilityChange(ev) {
        if (!this.carouselService.settings.autoplay)
            return;
        switch (this.docRef.visibilityState) {
            case 'visible':
                this.autoplayService.play();
                break;
            case 'hidden':
                this.autoplayService.stop();
                break;
            default:
                break;
        }
    }
    ;
    /**
     * @return {?}
     */
    ngOnInit() {
        this.spyDataStreams();
        this.carouselWindowWidth = this.el.nativeElement.querySelector('.owl-carousel').clientWidth;
    }
    /**
     * @return {?}
     */
    ngAfterContentChecked() {
    }
    // ngAfterContentChecked() END
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        if (this.slides.toArray().length) {
            this.carouselService.setup(this.carouselWindowWidth, this.slides.toArray(), this.options);
            this.carouselService.initialize(this.slides.toArray());
            this._winResizeWatcher();
        }
        else {
            this.logger.log(`There are no slides to show. So the carousel won't be rendered`);
        }
        this._slidesChangesSubscription = this.slides.changes.pipe(tap((slides) => {
            if (slides.toArray().length) {
                // this.carouselService.setItems(slides.toArray());
                this.carouselService.setup(this.carouselWindowWidth, slides.toArray(), this.options);
                this.carouselService.initialize(slides.toArray());
            }
            else {
                this.carouselLoaded = false;
                this.logger.log(`There are no slides to show. So the carousel won't be re-rendered`);
            }
        })).subscribe(() => { });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.resizeSubscription) {
            this.resizeSubscription.unsubscribe();
        }
        this._slidesChangesSubscription.unsubscribe();
        this._allObservSubscription.unsubscribe();
    }
    /**
     * Joins the observable login in one place: sets values to some observables, merges this observables and
     * subcribes to merge func
     * @return {?}
     */
    spyDataStreams() {
        this._viewCurSettings$ = this.carouselService.getViewCurSettings().pipe(tap(data => {
            this.owlDOMData = data.owlDOMData;
            this.stageData = data.stageData;
            this.slidesData = data.slidesData;
            if (!this.carouselLoaded) {
                this.carouselLoaded = true;
            }
            this.navData = data.navData;
            this.dotsData = data.dotsData;
        }));
        this._initializedCarousel$ = this.carouselService.getInitializedState().pipe(tap(() => {
            this.gatherTranslatedData();
            this.initialized.emit(this.slidesOutputData);
            // this.slidesOutputData = {};
        }));
        this._translatedCarousel$ = this.carouselService.getTranslatedState().pipe(tap(() => {
            this.gatherTranslatedData();
            this.translated.emit(this.slidesOutputData);
            // this.slidesOutputData = {};
        }));
        this._changeCarousel$ = this.carouselService.getChangeState().pipe(tap(() => {
            this.gatherTranslatedData();
            this.change.emit(this.slidesOutputData);
            // this.slidesOutputData = {};
        }));
        this._changedCarousel$ = this.carouselService.getChangeState().pipe(switchMap(value => {
            /** @type {?} */
            const changedPosition = of(value).pipe(filter(() => value.property.name === 'position'), switchMap(() => from(this.slidesData)), skip(value.property.value), take(this.carouselService.settings.items), map(slide => {
                /** @type {?} */
                const clonedIdPrefix = this.carouselService.clonedIdPrefix;
                /** @type {?} */
                const id = slide.id.indexOf(clonedIdPrefix) >= 0 ? slide.id.slice(clonedIdPrefix.length) : slide.id;
                return Object.assign({}, slide, { id: id, isActive: true });
            }), toArray(), map(slides => {
                return {
                    slides: slides,
                    startPosition: this.carouselService.relative(value.property.value)
                };
            }));
            // const changedSetting: Observable<SlidesOutputData> = of(value).pipe(
            //   filter(() => value.property.name === 'settings'),
            //   map(() => {
            //     return {
            //       slides: [],
            //       startPosition: this.carouselService.relative(value.property.value)
            //     }
            //   })
            // )
            return merge(changedPosition);
        }), tap(slidesData => {
            this.gatherTranslatedData();
            this.changed.emit(slidesData.slides.length ? slidesData : this.slidesOutputData);
            // console.log(this.slidesOutputData);
            // this.slidesOutputData = {};
        }));
        this._draggingCarousel$ = this.carouselService.getDragState().pipe(tap(() => {
            this.gatherTranslatedData();
            this.dragging.emit({ dragging: true, data: this.slidesOutputData });
        }), switchMap(() => this.carouselService.getDraggedState().pipe(map(() => !!this.carouselService.is('animating')))), switchMap(anim => {
            if (anim) {
                return this.carouselService.getTranslatedState().pipe(first());
            }
            else {
                return of('not animating');
            }
        }), tap(() => {
            this.dragging.emit({ dragging: false, data: this.slidesOutputData });
        }));
        this._carouselMerge$ = merge(this._viewCurSettings$, this._translatedCarousel$, this._draggingCarousel$, this._changeCarousel$, this._changedCarousel$, this._initializedCarousel$);
        this._allObservSubscription = this._carouselMerge$.subscribe(() => { });
    }
    /**
     * Init subscription to resize event and attaches handler for this event
     * @return {?}
     */
    _winResizeWatcher() {
        if (Object.keys(this.carouselService._options.responsive).length) {
            this.resizeSubscription = this.resizeService.onResize$
                .pipe(filter(() => this.carouselWindowWidth !== this.el.nativeElement.querySelector('.owl-carousel').clientWidth), delay(this.carouselService.settings.responsiveRefreshRate))
                .subscribe(() => {
                this.carouselService.onResize(this.el.nativeElement.querySelector('.owl-carousel').clientWidth);
                this.carouselWindowWidth = this.el.nativeElement.querySelector('.owl-carousel').clientWidth;
            });
        }
    }
    /**
     * Handler for transitioend event
     * @return {?}
     */
    onTransitionEnd() {
        this.carouselService.onTransitionEnd();
    }
    /**
     * Handler for click event, attached to next button
     * @return {?}
     */
    next() {
        if (!this.carouselLoaded)
            return;
        this.navigationService.next(this.carouselService.settings.navSpeed);
    }
    /**
     * Handler for click event, attached to prev button
     * @return {?}
     */
    prev() {
        if (!this.carouselLoaded)
            return;
        this.navigationService.prev(this.carouselService.settings.navSpeed);
    }
    /**
     * Handler for click event, attached to dots
     * @param {?} dotId
     * @return {?}
     */
    moveByDot(dotId) {
        if (!this.carouselLoaded)
            return;
        this.navigationService.moveByDot(dotId);
    }
    /**
     * rewinds carousel to slide with needed id
     * @param {?} id fragment of url
     * @return {?}
     */
    to(id) {
        // if (!this.carouselLoaded || ((this.navData && this.navData.disabled) && (this.dotsData && this.dotsData.disabled))) return;
        if (!this.carouselLoaded)
            return;
        this.navigationService.toSlideById(id);
    }
    /**
     * Gathers and prepares data intended for passing to the user by means of firing event translatedCarousel
     * @return {?}
     */
    gatherTranslatedData() {
        /** @type {?} */
        let startPosition;
        /** @type {?} */
        const clonedIdPrefix = this.carouselService.clonedIdPrefix;
        /** @type {?} */
        const activeSlides = this.slidesData
            .filter(slide => slide.isActive === true)
            .map(slide => {
            /** @type {?} */
            const id = slide.id.indexOf(clonedIdPrefix) >= 0 ? slide.id.slice(clonedIdPrefix.length) : slide.id;
            return {
                id: id,
                width: slide.width,
                marginL: slide.marginL,
                marginR: slide.marginR,
                center: slide.isCentered
            };
        });
        startPosition = this.carouselService.relative(this.carouselService.current());
        this.slidesOutputData = {
            startPosition: startPosition,
            slides: activeSlides
        };
    }
    /**
     * Starts pausing
     * @return {?}
     */
    startPausing() {
        this.autoplayService.startPausing();
    }
    /**
     * Starts playing after mouse leaves carousel
     * @return {?}
     */
    startPlayML() {
        this.autoplayService.startPlayingMouseLeave();
    }
    /**
     * Starts playing after touch ends
     * @return {?}
     */
    startPlayTE() {
        this.autoplayService.startPlayingTouchEnd();
    }
}
CarouselComponent.decorators = [
    { type: Component, args: [{
                selector: 'owl-carousel-o',
                template: `
    <div class="owl-carousel owl-theme" #owlCarousel
      [ngClass]="{'owl-rtl': owlDOMData?.rtl,
                  'owl-loaded': owlDOMData?.isLoaded,
                  'owl-responsive': owlDOMData?.isResponsive,
                  'owl-drag': owlDOMData?.isMouseDragable,
                  'owl-grab': owlDOMData?.isGrab}"
      (mouseover)="startPausing()"
      (mouseleave)="startPlayML()"
      (touchstart)="startPausing()"
      (touchend)="startPlayTE()">

      <div *ngIf="carouselLoaded" class="owl-stage-outer">
        <owl-stage [owlDraggable]="{'isMouseDragable': owlDOMData?.isMouseDragable, 'isTouchDragable': owlDOMData?.isTouchDragable}"
                    [stageData]="stageData"
                    [slidesData]="slidesData"></owl-stage>
      </div> <!-- /.owl-stage-outer -->
      <ng-container *ngIf="slides.toArray().length">
        <div class="owl-nav" [ngClass]="{'disabled': navData?.disabled}">
          <div class="owl-prev" [ngClass]="{'disabled': navData?.prev?.disabled}" (click)="prev()" [innerHTML]="navData?.prev?.htmlText"></div>
          <div class="owl-next" [ngClass]="{'disabled': navData?.next?.disabled}" (click)="next()" [innerHTML]="navData?.next?.htmlText"></div>
        </div> <!-- /.owl-nav -->
        <div class="owl-dots" [ngClass]="{'disabled': dotsData?.disabled}">
          <div *ngFor="let dot of dotsData?.dots" class="owl-dot" [ngClass]="{'active': dot.active, 'owl-dot-text': dot.showInnerContent}" (click)="moveByDot(dot.id)">
            <span [innerHTML]="dot.innerContent"
              [ngStyle]="{
                'overflow': dot.innerContent ? '' : 'hidden',
                'color': dot.innerContent ? '' : 'transparent'}"></span>
          </div>
        </div> <!-- /.owl-dots -->
      </ng-container>
    </div> <!-- /.owl-carousel owl-loaded -->
  `,
                providers: [
                    NavigationService,
                    AutoplayService,
                    CarouselService,
                    LazyLoadService,
                    AnimateService,
                    AutoHeightService,
                    HashService
                ],
                styles: [`.owl-theme { display: block; }`]
            }] }
];
/** @nocollapse */
CarouselComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ResizeService },
    { type: CarouselService },
    { type: NavigationService },
    { type: AutoplayService },
    { type: LazyLoadService },
    { type: AnimateService },
    { type: AutoHeightService },
    { type: HashService },
    { type: OwlLogger },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
CarouselComponent.propDecorators = {
    slides: [{ type: ContentChildren, args: [CarouselSlideDirective,] }],
    translated: [{ type: Output }],
    dragging: [{ type: Output }],
    change: [{ type: Output }],
    changed: [{ type: Output }],
    initialized: [{ type: Output }],
    options: [{ type: Input }],
    onVisibilityChange: [{ type: HostListener, args: ['document:visibilitychange', ['$event'],] }]
};
if (false) {
    /** @type {?} */
    CarouselComponent.prototype.slides;
    /** @type {?} */
    CarouselComponent.prototype.translated;
    /** @type {?} */
    CarouselComponent.prototype.dragging;
    /** @type {?} */
    CarouselComponent.prototype.change;
    /** @type {?} */
    CarouselComponent.prototype.changed;
    /** @type {?} */
    CarouselComponent.prototype.initialized;
    /**
     * Width of carousel window (tag with class .owl-carousel), in wich we can see moving sliders
     * @type {?}
     */
    CarouselComponent.prototype.carouselWindowWidth;
    /**
     * Subscription to 'resize' event
     * @type {?}
     */
    CarouselComponent.prototype.resizeSubscription;
    /**
     * Subscription merge Observable, which merges all Observables in the component except 'resize' Observable and this.slides.changes()
     * @type {?}
     */
    CarouselComponent.prototype._allObservSubscription;
    /**
     * Subscription to `this.slides.changes().
     * It could be included in 'this._allObservSubscription', but that subcription get created during the initializing of component
     * and 'this.slides' are undefined at that moment. So it's needed to wait for initialization of content.
     * @type {?}
     */
    CarouselComponent.prototype._slidesChangesSubscription;
    /**
     * Current settings for the carousel.
     * @type {?}
     */
    CarouselComponent.prototype.owlDOMData;
    /**
     * Data of owl-stage
     * @type {?}
     */
    CarouselComponent.prototype.stageData;
    /**
     *  Data of every slide
     * @type {?}
     */
    CarouselComponent.prototype.slidesData;
    /**
     * Data of navigation block
     * @type {?}
     */
    CarouselComponent.prototype.navData;
    /**
     * Data of dots block
     * @type {?}
     */
    CarouselComponent.prototype.dotsData;
    /**
     * Data, wich are passed out of carousel after ending of transioning of carousel
     * @type {?}
     */
    CarouselComponent.prototype.slidesOutputData;
    /**
     * Shows whether carousel is loaded of not.
     * @type {?}
     */
    CarouselComponent.prototype.carouselLoaded;
    /**
     * User's options
     * @type {?}
     */
    CarouselComponent.prototype.options;
    /**
     * Observable for getting current View Settings
     * @type {?}
     */
    CarouselComponent.prototype._viewCurSettings$;
    /**
     * Observable for catching the end of transition of carousel
     * @type {?}
     */
    CarouselComponent.prototype._translatedCarousel$;
    /**
     * Observable for catching the start of dragging of the carousel
     * @type {?}
     */
    CarouselComponent.prototype._draggingCarousel$;
    /**
     * Observable for catching the start of changing of the carousel
     * @type {?}
     */
    CarouselComponent.prototype._changeCarousel$;
    /**
     * Observable for catching the moment when the data about slides changed, more exactly when the position changed.
     * @type {?}
     */
    CarouselComponent.prototype._changedCarousel$;
    /**
     * Observable for catching the initialization of changing the carousel
     * @type {?}
     */
    CarouselComponent.prototype._initializedCarousel$;
    /**
     * Observable for merging all Observables and creating one subscription
     * @type {?}
     */
    CarouselComponent.prototype._carouselMerge$;
    /** @type {?} */
    CarouselComponent.prototype.docRef;
    /** @type {?} */
    CarouselComponent.prototype.el;
    /** @type {?} */
    CarouselComponent.prototype.resizeService;
    /** @type {?} */
    CarouselComponent.prototype.carouselService;
    /** @type {?} */
    CarouselComponent.prototype.navigationService;
    /** @type {?} */
    CarouselComponent.prototype.autoplayService;
    /** @type {?} */
    CarouselComponent.prototype.lazyLoadService;
    /** @type {?} */
    CarouselComponent.prototype.animateService;
    /** @type {?} */
    CarouselComponent.prototype.autoHeightService;
    /** @type {?} */
    CarouselComponent.prototype.hashService;
    /** @type {?} */
    CarouselComponent.prototype.logger;
    /* Skipping unhandled member: ;*/
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW93bC1jYXJvdXNlbC1vLyIsInNvdXJjZXMiOlsibGliL2Nhcm91c2VsL2Nhcm91c2VsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFJVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxTQUFTLEVBQ1QsZUFBZSxFQUNmLFdBQVcsRUFDWCxVQUFVLEVBRVYsWUFBWSxFQUNaLFlBQVksRUFDWixNQUFNLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUE0QixLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUVqRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDM0QsT0FBTyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEcsT0FBTyxFQUFFLGVBQWUsRUFBdUIsTUFBTSw4QkFBOEIsQ0FBQztBQUlwRixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFekQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbkUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbkUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxTQUFTLEVB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O0lBQ2hDLG1DQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIE9uSW5pdCxcclxuICBBZnRlckNvbnRlbnRDaGVja2VkLFxyXG4gIE9uRGVzdHJveSxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRGlyZWN0aXZlLFxyXG4gIFF1ZXJ5TGlzdCxcclxuICBDb250ZW50Q2hpbGRyZW4sXHJcbiAgVGVtcGxhdGVSZWYsXHJcbiAgRWxlbWVudFJlZixcclxuICBBZnRlckNvbnRlbnRJbml0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgSW5qZWN0XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIE9ic2VydmFibGUsIG1lcmdlLCBvZiwgZnJvbSB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgUmVzaXplU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3Jlc2l6ZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgdGFwLCBkZWxheSwgZmlsdGVyLCBzd2l0Y2hNYXAsIGZpcnN0LCBtYXAsIHNraXAsIHRha2UsIHRvQXJyYXkgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IENhcm91c2VsU2VydmljZSwgQ2Fyb3VzZWxDdXJyZW50RGF0YSB9IGZyb20gJy4uL3NlcnZpY2VzL2Nhcm91c2VsLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTdGFnZURhdGEgfSBmcm9tIFwiLi4vbW9kZWxzL3N0YWdlLWRhdGEubW9kZWxcIjtcclxuaW1wb3J0IHsgT3dsRE9NRGF0YSB9IGZyb20gXCIuLi9tb2RlbHMvb3dsRE9NLWRhdGEubW9kZWxcIjtcclxuaW1wb3J0IHsgU2xpZGVNb2RlbCB9IGZyb20gJy4uL21vZGVscy9zbGlkZS5tb2RlbCc7XHJcbmltcG9ydCB7IE93bE9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbHMvb3dsLW9wdGlvbnMubW9kZWwnO1xyXG5pbXBvcnQgeyBOYXZEYXRhLCBEb3RzRGF0YSB9IGZyb20gJy4uL21vZGVscy9uYXZpZ2F0aW9uLWRhdGEubW9kZWxzJztcclxuaW1wb3J0IHsgTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uYXZpZ2F0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBdXRvcGxheVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9hdXRvcGxheS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTGF6eUxvYWRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbGF6eWxvYWQuc2VydmljZSc7XHJcbmltcG9ydCB7IEFuaW1hdGVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvYW5pbWF0ZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQXV0b0hlaWdodFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9hdXRvaGVpZ2h0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBIYXNoU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2hhc2guc2VydmljZSc7XHJcbmltcG9ydCB7IE93bExvZ2dlciB9IGZyb20gJy4uL3NlcnZpY2VzL2xvZ2dlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICcuLi9zZXJ2aWNlcy9kb2N1bWVudC1yZWYuc2VydmljZSc7XHJcblxyXG5sZXQgbmV4dElkID0gMDtcclxuXHJcbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ25nLXRlbXBsYXRlW2Nhcm91c2VsU2xpZGVdJyB9KVxyXG5leHBvcnQgY2xhc3MgQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZSB7XHJcbiAgLyoqXHJcbiAgICogVW5pcXVlIHNsaWRlIGlkZW50aWZpZXIuIE11c3QgYmUgdW5pcXVlIGZvciB0aGUgZW50aXJlIGRvY3VtZW50IGZvciBwcm9wZXIgYWNjZXNzaWJpbGl0eSBzdXBwb3J0LlxyXG4gICAqIFdpbGwgYmUgYXV0by1nZW5lcmF0ZWQgaWYgbm90IHByb3ZpZGVkLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGlkID0gYG93bC1zbGlkZS0ke25leHRJZCsrfWA7XHJcblxyXG4gIC8qKlxyXG4gICAqIERlZmluZXMgaG93IG11Y2ggd2lkdGhzIG9mIGNvbW1vbiBzbGlkZSB3aWxsIGN1cnJlbnQgc2xpZGUgaGF2ZVxyXG4gICAqIGUuZy4gaWYgX21lcmdlRGF0YT0yLCB0aGUgc2xpZGUgd2lsbCB0d2ljZSB3aWRlciB0aGVuIHNsaWRlcyB3aXRoIF9tZXJnZURhdGE9MVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2RhdGFNZXJnZSA9IDE7XHJcbiAgQElucHV0KClcclxuICBzZXQgZGF0YU1lcmdlKGRhdGE6IG51bWJlcikge1xyXG4gICAgdGhpcy5fZGF0YU1lcmdlID0gdGhpcy5pc051bWVyaWMoZGF0YSkgPyBkYXRhIDogMTtcclxuICB9O1xyXG4gIGdldCBkYXRhTWVyZ2UoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2RhdGFNZXJnZSB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdpZHRoIG9mIHNsaWRlXHJcbiAgICovXHJcbiAgQElucHV0KCkgd2lkdGggPSAwO1xyXG5cclxuICAvKipcclxuICAgKiBJbm5lciBjb250ZW50IG9mIGRvdCBmb3IgY2VydGFpbiBzbGlkZTsgY2FuIGJlIGh0bWwtbWFya3VwXHJcbiAgICovXHJcbiAgQElucHV0KCkgZG90Q29udGVudCA9ICcnO1xyXG5cclxuICAvKipcclxuICAgKiBIYXNoIChmcmFnbWVudCkgb2YgdXJsIHdoaWNoIGNvcnJlc3BvbmRzIHRvIGNlcnRhaW4gc2xpZGVcclxuICAgKi9cclxuICBASW5wdXQoKSBkYXRhSGFzaCA9ICcnO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdHBsUmVmOiBUZW1wbGF0ZVJlZjxhbnk+KSB7fVxyXG5cclxuICAvKipcclxuXHQgKiBEZXRlcm1pbmVzIGlmIHRoZSBpbnB1dCBpcyBhIE51bWJlciBvciBzb21ldGhpbmcgdGhhdCBjYW4gYmUgY29lcmNlZCB0byBhIE51bWJlclxyXG5cdCAqIEBwYXJhbSAtIFRoZSBpbnB1dCB0byBiZSB0ZXN0ZWRcclxuXHQgKiBAcmV0dXJucyAtIEFuIGluZGljYXRpb24gaWYgdGhlIGlucHV0IGlzIGEgTnVtYmVyIG9yIGNhbiBiZSBjb2VyY2VkIHRvIGEgTnVtYmVyXHJcblx0ICovXHJcbiAgaXNOdW1lcmljKG51bWJlcjogYW55KTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQobnVtYmVyKSk7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogRGF0YSB3aGljaCB3aWxsIGJlIHBhc3NlZCBvdXQgYWZ0ZXIgZW5kaW5nIG9mIHRyYW5zaXRpb24gb2YgY2Fyb3VzZWxcclxuICovXHJcbmV4cG9ydCBjbGFzcyBTbGlkZXNPdXRwdXREYXRhIHtcclxuICBzdGFydFBvc2l0aW9uPzogbnVtYmVyO1xyXG4gIHNsaWRlcz86IFNsaWRlTW9kZWxbXTtcclxufTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnb3dsLWNhcm91c2VsLW8nLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2IGNsYXNzPVwib3dsLWNhcm91c2VsIG93bC10aGVtZVwiICNvd2xDYXJvdXNlbFxyXG4gICAgICBbbmdDbGFzc109XCJ7J293bC1ydGwnOiBvd2xET01EYXRhPy5ydGwsXHJcbiAgICAgICAgICAgICAgICAgICdvd2wtbG9hZGVkJzogb3dsRE9NRGF0YT8uaXNMb2FkZWQsXHJcbiAgICAgICAgICAgICAgICAgICdvd2wtcmVzcG9uc2l2ZSc6IG93bERPTURhdGE/LmlzUmVzcG9uc2l2ZSxcclxuICAgICAgICAgICAgICAgICAgJ293bC1kcmFnJzogb3dsRE9NRGF0YT8uaXNNb3VzZURyYWdhYmxlLFxyXG4gICAgICAgICAgICAgICAgICAnb3dsLWdyYWInOiBvd2xET01EYXRhPy5pc0dyYWJ9XCJcclxuICAgICAgKG1vdXNlb3Zlcik9XCJzdGFydFBhdXNpbmcoKVwiXHJcbiAgICAgIChtb3VzZWxlYXZlKT1cInN0YXJ0UGxheU1MKClcIlxyXG4gICAgICAodG91Y2hzdGFydCk9XCJzdGFydFBhdXNpbmcoKVwiXHJcbiAgICAgICh0b3VjaGVuZCk9XCJzdGFydFBsYXlURSgpXCI+XHJcblxyXG4gICAgICA8ZGl2ICpuZ0lmPVwiY2Fyb3VzZWxMb2FkZWRcIiBjbGFzcz1cIm93bC1zdGFnZS1vdXRlclwiPlxyXG4gICAgICAgIDxvd2wtc3RhZ2UgW293bERyYWdnYWJsZV09XCJ7J2lzTW91c2VEcmFnYWJsZSc6IG93bERPTURhdGE/LmlzTW91c2VEcmFnYWJsZSwgJ2lzVG91Y2hEcmFnYWJsZSc6IG93bERPTURhdGE/LmlzVG91Y2hEcmFnYWJsZX1cIlxyXG4gICAgICAgICAgICAgICAgICAgIFtzdGFnZURhdGFdPVwic3RhZ2VEYXRhXCJcclxuICAgICAgICAgICAgICAgICAgICBbc2xpZGVzRGF0YV09XCJzbGlkZXNEYXRhXCI+PC9vd2wtc3RhZ2U+XHJcbiAgICAgIDwvZGl2PiA8IS0tIC8ub3dsLXN0YWdlLW91dGVyIC0tPlxyXG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwic2xpZGVzLnRvQXJyYXkoKS5sZW5ndGhcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwib3dsLW5hdlwiIFtuZ0NsYXNzXT1cInsnZGlzYWJsZWQnOiBuYXZEYXRhPy5kaXNhYmxlZH1cIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJvd2wtcHJldlwiIFtuZ0NsYXNzXT1cInsnZGlzYWJsZWQnOiBuYXZEYXRhPy5wcmV2Py5kaXNhYmxlZH1cIiAoY2xpY2spPVwicHJldigpXCIgW2lubmVySFRNTF09XCJuYXZEYXRhPy5wcmV2Py5odG1sVGV4dFwiPjwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm93bC1uZXh0XCIgW25nQ2xhc3NdPVwieydkaXNhYmxlZCc6IG5hdkRhdGE/Lm5leHQ/LmRpc2FibGVkfVwiIChjbGljayk9XCJuZXh0KClcIiBbaW5uZXJIVE1MXT1cIm5hdkRhdGE/Lm5leHQ/Lmh0bWxUZXh0XCI+PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+IDwhLS0gLy5vd2wtbmF2IC0tPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJvd2wtZG90c1wiIFtuZ0NsYXNzXT1cInsnZGlzYWJsZWQnOiBkb3RzRGF0YT8uZGlzYWJsZWR9XCI+XHJcbiAgICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBkb3Qgb2YgZG90c0RhdGE/LmRvdHNcIiBjbGFzcz1cIm93bC1kb3RcIiBbbmdDbGFzc109XCJ7J2FjdGl2ZSc6IGRvdC5hY3RpdmUsICdvd2wtZG90LXRleHQnOiBkb3Quc2hvd0lubmVyQ29udGVudH1cIiAoY2xpY2spPVwibW92ZUJ5RG90KGRvdC5pZClcIj5cclxuICAgICAgICAgICAgPHNwYW4gW2lubmVySFRNTF09XCJkb3QuaW5uZXJDb250ZW50XCJcclxuICAgICAgICAgICAgICBbbmdTdHlsZV09XCJ7XHJcbiAgICAgICAgICAgICAgICAnb3ZlcmZsb3cnOiBkb3QuaW5uZXJDb250ZW50ID8gJycgOiAnaGlkZGVuJyxcclxuICAgICAgICAgICAgICAgICdjb2xvcic6IGRvdC5pbm5lckNvbnRlbnQgPyAnJyA6ICd0cmFuc3BhcmVudCd9XCI+PC9zcGFuPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+IDwhLS0gLy5vd2wtZG90cyAtLT5cclxuICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICA8L2Rpdj4gPCEtLSAvLm93bC1jYXJvdXNlbCBvd2wtbG9hZGVkIC0tPlxyXG4gIGAsXHJcbiAgc3R5bGVzOiBbYC5vd2wtdGhlbWUgeyBkaXNwbGF5OiBibG9jazsgfWBdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgTmF2aWdhdGlvblNlcnZpY2UsXHJcbiAgICBBdXRvcGxheVNlcnZpY2UsXHJcbiAgICBDYXJvdXNlbFNlcnZpY2UsXHJcbiAgICBMYXp5TG9hZFNlcnZpY2UsXHJcbiAgICBBbmltYXRlU2VydmljZSxcclxuICAgIEF1dG9IZWlnaHRTZXJ2aWNlLFxyXG4gICAgSGFzaFNlcnZpY2VcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDYXJvdXNlbENvbXBvbmVudFxyXG4gIGltcGxlbWVudHMgT25Jbml0LCBBZnRlckNvbnRlbnRDaGVja2VkLCBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xyXG4gIEBDb250ZW50Q2hpbGRyZW4oQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZSlcclxuICBzbGlkZXM6IFF1ZXJ5TGlzdDxDYXJvdXNlbFNsaWRlRGlyZWN0aXZlPjtcclxuXHJcbiAgQE91dHB1dCgpIHRyYW5zbGF0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFNsaWRlc091dHB1dERhdGE+KCk7XHJcbiAgQE91dHB1dCgpIGRyYWdnaW5nID0gbmV3IEV2ZW50RW1pdHRlcjx7ZHJhZ2dpbmc6IGJvb2xlYW4sIGRhdGE6IFNsaWRlc091dHB1dERhdGF9PigpO1xyXG4gIEBPdXRwdXQoKSBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFNsaWRlc091dHB1dERhdGE+KCk7XHJcbiAgQE91dHB1dCgpIGNoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFNsaWRlc091dHB1dERhdGE+KCk7XHJcbiAgQE91dHB1dCgpIGluaXRpYWxpemVkID0gbmV3IEV2ZW50RW1pdHRlcjxTbGlkZXNPdXRwdXREYXRhPigpO1xyXG5cclxuICAvKipcclxuICAgKiBXaWR0aCBvZiBjYXJvdXNlbCB3aW5kb3cgKHRhZyB3aXRoIGNsYXNzIC5vd2wtY2Fyb3VzZWwpLCBpbiB3aWNoIHdlIGNhbiBzZWUgbW92aW5nIHNsaWRlcnNcclxuICAgKi9cclxuICBjYXJvdXNlbFdpbmRvd1dpZHRoOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlwdGlvbiB0byAncmVzaXplJyBldmVudFxyXG4gICAqL1xyXG4gIHJlc2l6ZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gbWVyZ2UgT2JzZXJ2YWJsZSwgd2hpY2ggbWVyZ2VzIGFsbCBPYnNlcnZhYmxlcyBpbiB0aGUgY29tcG9uZW50IGV4Y2VwdCAncmVzaXplJyBPYnNlcnZhYmxlIGFuZCB0aGlzLnNsaWRlcy5jaGFuZ2VzKClcclxuICAgKi9cclxuICBwcml2YXRlIF9hbGxPYnNlcnZTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaXB0aW9uIHRvIGB0aGlzLnNsaWRlcy5jaGFuZ2VzKCkuXHJcbiAgICogSXQgY291bGQgYmUgaW5jbHVkZWQgaW4gJ3RoaXMuX2FsbE9ic2VydlN1YnNjcmlwdGlvbicsIGJ1dCB0aGF0IHN1YmNyaXB0aW9uIGdldCBjcmVhdGVkIGR1cmluZyB0aGUgaW5pdGlhbGl6aW5nIG9mIGNvbXBvbmVudFxyXG4gICAqIGFuZCAndGhpcy5zbGlkZXMnIGFyZSB1bmRlZmluZWQgYXQgdGhhdCBtb21lbnQuIFNvIGl0J3MgbmVlZGVkIHRvIHdhaXQgZm9yIGluaXRpYWxpemF0aW9uIG9mIGNvbnRlbnQuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfc2xpZGVzQ2hhbmdlc1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBDdXJyZW50IHNldHRpbmdzIGZvciB0aGUgY2Fyb3VzZWwuXHJcbiAgICovXHJcbiAgb3dsRE9NRGF0YTogT3dsRE9NRGF0YTtcclxuXHJcbiAgLyoqXHJcbiAgICogRGF0YSBvZiBvd2wtc3RhZ2VcclxuICAgKi9cclxuXHRzdGFnZURhdGE6IFN0YWdlRGF0YTtcclxuXHJcblx0LyoqXHJcblx0ICogIERhdGEgb2YgZXZlcnkgc2xpZGVcclxuXHQgKi9cclxuICBzbGlkZXNEYXRhOiBTbGlkZU1vZGVsW10gPSBbXTtcclxuXHJcbiAgLyoqXHJcblx0ICogRGF0YSBvZiBuYXZpZ2F0aW9uIGJsb2NrXHJcblx0ICovXHJcblx0bmF2RGF0YTogTmF2RGF0YTtcclxuXHJcblx0LyoqXHJcblx0ICogRGF0YSBvZiBkb3RzIGJsb2NrXHJcblx0ICovXHJcbiAgZG90c0RhdGE6IERvdHNEYXRhO1xyXG5cclxuICAvKipcclxuICAgKiBEYXRhLCB3aWNoIGFyZSBwYXNzZWQgb3V0IG9mIGNhcm91c2VsIGFmdGVyIGVuZGluZyBvZiB0cmFuc2lvbmluZyBvZiBjYXJvdXNlbFxyXG4gICAqL1xyXG4gIHNsaWRlc091dHB1dERhdGE6IFNsaWRlc091dHB1dERhdGE7XHJcblxyXG4gIC8qKlxyXG4gICAqIFNob3dzIHdoZXRoZXIgY2Fyb3VzZWwgaXMgbG9hZGVkIG9mIG5vdC5cclxuICAgKi9cclxuICBjYXJvdXNlbExvYWRlZCA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBVc2VyJ3Mgb3B0aW9uc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG9wdGlvbnM6IE93bE9wdGlvbnM7XHJcblxyXG4gIC8qKlxyXG4gICAqIE9ic2VydmFibGUgZm9yIGdldHRpbmcgY3VycmVudCBWaWV3IFNldHRpbmdzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfdmlld0N1clNldHRpbmdzJDogT2JzZXJ2YWJsZTxDYXJvdXNlbEN1cnJlbnREYXRhPjtcclxuXHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2YWJsZSBmb3IgY2F0Y2hpbmcgdGhlIGVuZCBvZiB0cmFuc2l0aW9uIG9mIGNhcm91c2VsXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfdHJhbnNsYXRlZENhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+O1xyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZhYmxlIGZvciBjYXRjaGluZyB0aGUgc3RhcnQgb2YgZHJhZ2dpbmcgb2YgdGhlIGNhcm91c2VsXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZHJhZ2dpbmdDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPjtcclxuXHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2YWJsZSBmb3IgY2F0Y2hpbmcgdGhlIHN0YXJ0IG9mIGNoYW5naW5nIG9mIHRoZSBjYXJvdXNlbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2NoYW5nZUNhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+O1xyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZhYmxlIGZvciBjYXRjaGluZyB0aGUgbW9tZW50IHdoZW4gdGhlIGRhdGEgYWJvdXQgc2xpZGVzIGNoYW5nZWQsIG1vcmUgZXhhY3RseSB3aGVuIHRoZSBwb3NpdGlvbiBjaGFuZ2VkLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2NoYW5nZWRDYXJvdXNlbCQ6IE9ic2VydmFibGU8YW55PjtcclxuXHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2YWJsZSBmb3IgY2F0Y2hpbmcgdGhlIGluaXRpYWxpemF0aW9uIG9mIGNoYW5naW5nIHRoZSBjYXJvdXNlbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2luaXRpYWxpemVkQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz47XHJcblxyXG4gIC8qKlxyXG4gICAqIE9ic2VydmFibGUgZm9yIG1lcmdpbmcgYWxsIE9ic2VydmFibGVzIGFuZCBjcmVhdGluZyBvbmUgc3Vic2NyaXB0aW9uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfY2Fyb3VzZWxNZXJnZSQ6IE9ic2VydmFibGU8Q2Fyb3VzZWxDdXJyZW50RGF0YSB8IHN0cmluZz47XHJcbiAgcHJpdmF0ZSBkb2NSZWY6IERvY3VtZW50O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXHJcbiAgICBwcml2YXRlIHJlc2l6ZVNlcnZpY2U6IFJlc2l6ZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNhcm91c2VsU2VydmljZTogQ2Fyb3VzZWxTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBuYXZpZ2F0aW9uU2VydmljZTogTmF2aWdhdGlvblNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGF1dG9wbGF5U2VydmljZTogQXV0b3BsYXlTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBsYXp5TG9hZFNlcnZpY2U6IExhenlMb2FkU2VydmljZSxcclxuICAgIHByaXZhdGUgYW5pbWF0ZVNlcnZpY2U6IEFuaW1hdGVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBhdXRvSGVpZ2h0U2VydmljZTogQXV0b0hlaWdodFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGhhc2hTZXJ2aWNlOiBIYXNoU2VydmljZSxcclxuICAgIHByaXZhdGUgbG9nZ2VyOiBPd2xMb2dnZXIsXHJcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBkb2NSZWY6IGFueVxyXG4gICkge1xyXG4gICAgdGhpcy5kb2NSZWYgPSBkb2NSZWYgYXMgRG9jdW1lbnQ7XHJcblxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6dmlzaWJpbGl0eWNoYW5nZScsIFsnJGV2ZW50J10pXHJcbiAgb25WaXNpYmlsaXR5Q2hhbmdlKGV2OiBFdmVudCkge1xyXG4gICAgaWYgKCF0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hdXRvcGxheSkgcmV0dXJuO1xyXG4gICAgc3dpdGNoICh0aGlzLmRvY1JlZi52aXNpYmlsaXR5U3RhdGUpIHtcclxuICAgICAgY2FzZSAndmlzaWJsZSc6XHJcbiAgICAgICAgdGhpcy5hdXRvcGxheVNlcnZpY2UucGxheSgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAnaGlkZGVuJzpcclxuICAgICAgICB0aGlzLmF1dG9wbGF5U2VydmljZS5zdG9wKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuc3B5RGF0YVN0cmVhbXMoKTtcclxuXHJcbiAgICB0aGlzLmNhcm91c2VsV2luZG93V2lkdGggPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgJy5vd2wtY2Fyb3VzZWwnXHJcbiAgICApLmNsaWVudFdpZHRoO1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xyXG4gIH1cclxuICAvLyBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSBFTkRcclxuXHJcbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG4gICAgaWYgKHRoaXMuc2xpZGVzLnRvQXJyYXkoKS5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dXAodGhpcy5jYXJvdXNlbFdpbmRvd1dpZHRoLCB0aGlzLnNsaWRlcy50b0FycmF5KCksIHRoaXMub3B0aW9ucyk7XHJcbiAgICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmluaXRpYWxpemUodGhpcy5zbGlkZXMudG9BcnJheSgpKTtcclxuXHJcbiAgICAgIHRoaXMuX3dpblJlc2l6ZVdhdGNoZXIoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubG9nZ2VyLmxvZyhgVGhlcmUgYXJlIG5vIHNsaWRlcyB0byBzaG93LiBTbyB0aGUgY2Fyb3VzZWwgd29uJ3QgYmUgcmVuZGVyZWRgKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9zbGlkZXNDaGFuZ2VzU3Vic2NyaXB0aW9uID0gdGhpcy5zbGlkZXMuY2hhbmdlcy5waXBlKFxyXG4gICAgICB0YXAoKHNsaWRlcykgPT4ge1xyXG4gICAgICAgIGlmIChzbGlkZXMudG9BcnJheSgpLmxlbmd0aCkge1xyXG4gICAgICAgICAgLy8gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0SXRlbXMoc2xpZGVzLnRvQXJyYXkoKSk7XHJcbiAgICAgICAgICB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR1cCh0aGlzLmNhcm91c2VsV2luZG93V2lkdGgsIHNsaWRlcy50b0FycmF5KCksIHRoaXMub3B0aW9ucyk7XHJcbiAgICAgICAgICB0aGlzLmNhcm91c2VsU2VydmljZS5pbml0aWFsaXplKHNsaWRlcy50b0FycmF5KCkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmNhcm91c2VsTG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coYFRoZXJlIGFyZSBubyBzbGlkZXMgdG8gc2hvdy4gU28gdGhlIGNhcm91c2VsIHdvbid0IGJlIHJlLXJlbmRlcmVkYCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgKS5zdWJzY3JpYmUoKCk9Pnt9KTtcclxuXHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIGlmICh0aGlzLnJlc2l6ZVN1YnNjcmlwdGlvbikge1xyXG4gICAgICB0aGlzLnJlc2l6ZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX3NsaWRlc0NoYW5nZXNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuXHJcbiAgICB0aGlzLl9hbGxPYnNlcnZTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEpvaW5zIHRoZSBvYnNlcnZhYmxlIGxvZ2luIGluIG9uZSBwbGFjZTogc2V0cyB2YWx1ZXMgdG8gc29tZSBvYnNlcnZhYmxlcywgbWVyZ2VzIHRoaXMgb2JzZXJ2YWJsZXMgYW5kXHJcbiAgICogc3ViY3JpYmVzIHRvIG1lcmdlIGZ1bmNcclxuICAgKi9cclxuICBzcHlEYXRhU3RyZWFtcygpIHtcclxuICAgIHRoaXMuX3ZpZXdDdXJTZXR0aW5ncyQgPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRWaWV3Q3VyU2V0dGluZ3MoKS5waXBlKFxyXG4gICAgICB0YXAoZGF0YSA9PiB7XHJcbiAgICAgICAgdGhpcy5vd2xET01EYXRhID0gZGF0YS5vd2xET01EYXRhO1xyXG4gICAgICAgIHRoaXMuc3RhZ2VEYXRhID0gZGF0YS5zdGFnZURhdGE7XHJcbiAgICAgICAgdGhpcy5zbGlkZXNEYXRhID0gZGF0YS5zbGlkZXNEYXRhO1xyXG4gICAgICAgIGlmICghdGhpcy5jYXJvdXNlbExvYWRlZCkge1xyXG4gICAgICAgICAgdGhpcy5jYXJvdXNlbExvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubmF2RGF0YSA9IGRhdGEubmF2RGF0YTtcclxuICAgICAgICB0aGlzLmRvdHNEYXRhID0gZGF0YS5kb3RzRGF0YTtcclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5faW5pdGlhbGl6ZWRDYXJvdXNlbCQgPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRJbml0aWFsaXplZFN0YXRlKCkucGlwZShcclxuICAgICAgdGFwKCgpID0+IHtcclxuICAgICAgICB0aGlzLmdhdGhlclRyYW5zbGF0ZWREYXRhKCk7XHJcbiAgICAgICAgdGhpcy5pbml0aWFsaXplZC5lbWl0KHRoaXMuc2xpZGVzT3V0cHV0RGF0YSk7XHJcbiAgICAgICAgLy8gdGhpcy5zbGlkZXNPdXRwdXREYXRhID0ge307XHJcbiAgICAgIH0pXHJcbiAgICApXHJcblxyXG4gICAgdGhpcy5fdHJhbnNsYXRlZENhcm91c2VsJCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldFRyYW5zbGF0ZWRTdGF0ZSgpLnBpcGUoXHJcbiAgICAgIHRhcCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5nYXRoZXJUcmFuc2xhdGVkRGF0YSgpO1xyXG4gICAgICAgIHRoaXMudHJhbnNsYXRlZC5lbWl0KHRoaXMuc2xpZGVzT3V0cHV0RGF0YSk7XHJcbiAgICAgICAgLy8gdGhpcy5zbGlkZXNPdXRwdXREYXRhID0ge307XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuX2NoYW5nZUNhcm91c2VsJCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldENoYW5nZVN0YXRlKCkucGlwZShcclxuICAgICAgdGFwKCgpID0+IHtcclxuICAgICAgICB0aGlzLmdhdGhlclRyYW5zbGF0ZWREYXRhKCk7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh0aGlzLnNsaWRlc091dHB1dERhdGEpO1xyXG4gICAgICAgIC8vIHRoaXMuc2xpZGVzT3V0cHV0RGF0YSA9IHt9O1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLl9jaGFuZ2VkQ2Fyb3VzZWwkID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0Q2hhbmdlU3RhdGUoKS5waXBlKFxyXG4gICAgICBzd2l0Y2hNYXAodmFsdWUgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNoYW5nZWRQb3NpdGlvbjogT2JzZXJ2YWJsZTxTbGlkZXNPdXRwdXREYXRhPiA9IG9mKHZhbHVlKS5waXBlKFxyXG4gICAgICAgICAgZmlsdGVyKCgpID0+IHZhbHVlLnByb3BlcnR5Lm5hbWUgPT09ICdwb3NpdGlvbicpLFxyXG4gICAgICAgICAgc3dpdGNoTWFwKCgpID0+IGZyb20odGhpcy5zbGlkZXNEYXRhKSksXHJcbiAgICAgICAgICBza2lwKHZhbHVlLnByb3BlcnR5LnZhbHVlKSxcclxuICAgICAgICAgIHRha2UodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuaXRlbXMpLFxyXG4gICAgICAgICAgbWFwKHNsaWRlID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY2xvbmVkSWRQcmVmaXggPSB0aGlzLmNhcm91c2VsU2VydmljZS5jbG9uZWRJZFByZWZpeDtcclxuICAgICAgICAgICAgY29uc3QgaWQgPSBzbGlkZS5pZC5pbmRleE9mKGNsb25lZElkUHJlZml4KSA+PSAwID8gc2xpZGUuaWQuc2xpY2UoY2xvbmVkSWRQcmVmaXgubGVuZ3RoKSA6IHNsaWRlLmlkO1xyXG4gICAgICAgICAgICByZXR1cm4geyAuLi5zbGlkZSwgaWQ6IGlkLCBpc0FjdGl2ZTogdHJ1ZSB9O1xyXG4gICAgICAgICAgfSksXHJcbiAgICAgICAgICB0b0FycmF5KCksXHJcbiAgICAgICAgICBtYXAoc2xpZGVzID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICBzbGlkZXM6IHNsaWRlcyxcclxuICAgICAgICAgICAgICBzdGFydFBvc2l0aW9uOiB0aGlzLmNhcm91c2VsU2VydmljZS5yZWxhdGl2ZSh2YWx1ZS5wcm9wZXJ0eS52YWx1ZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBjb25zdCBjaGFuZ2VkU2V0dGluZzogT2JzZXJ2YWJsZTxTbGlkZXNPdXRwdXREYXRhPiA9IG9mKHZhbHVlKS5waXBlKFxyXG4gICAgICAgIC8vICAgZmlsdGVyKCgpID0+IHZhbHVlLnByb3BlcnR5Lm5hbWUgPT09ICdzZXR0aW5ncycpLFxyXG4gICAgICAgIC8vICAgbWFwKCgpID0+IHtcclxuICAgICAgICAvLyAgICAgcmV0dXJuIHtcclxuICAgICAgICAvLyAgICAgICBzbGlkZXM6IFtdLFxyXG4gICAgICAgIC8vICAgICAgIHN0YXJ0UG9zaXRpb246IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnJlbGF0aXZlKHZhbHVlLnByb3BlcnR5LnZhbHVlKVxyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gICB9KVxyXG4gICAgICAgIC8vIClcclxuICAgICAgICByZXR1cm4gbWVyZ2UoY2hhbmdlZFBvc2l0aW9uKTtcclxuICAgICAgfSksXHJcbiAgICAgIHRhcChzbGlkZXNEYXRhID0+IHtcclxuICAgICAgICB0aGlzLmdhdGhlclRyYW5zbGF0ZWREYXRhKCk7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VkLmVtaXQoc2xpZGVzRGF0YS5zbGlkZXMubGVuZ3RoID8gc2xpZGVzRGF0YSA6IHRoaXMuc2xpZGVzT3V0cHV0RGF0YSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5zbGlkZXNPdXRwdXREYXRhKTtcclxuICAgICAgICAvLyB0aGlzLnNsaWRlc091dHB1dERhdGEgPSB7fTtcclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5fZHJhZ2dpbmdDYXJvdXNlbCQgPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXREcmFnU3RhdGUoKS5waXBlKFxyXG4gICAgICB0YXAoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZ2F0aGVyVHJhbnNsYXRlZERhdGEoKTtcclxuICAgICAgICB0aGlzLmRyYWdnaW5nLmVtaXQoe2RyYWdnaW5nOiB0cnVlLCBkYXRhOiB0aGlzLnNsaWRlc091dHB1dERhdGF9KTtcclxuICAgICAgfSksXHJcbiAgICAgIHN3aXRjaE1hcChcclxuICAgICAgICAoKSA9PiB0aGlzLmNhcm91c2VsU2VydmljZS5nZXREcmFnZ2VkU3RhdGUoKS5waXBlKFxyXG4gICAgICAgICAgbWFwKCgpID0+ICEhdGhpcy5jYXJvdXNlbFNlcnZpY2UuaXMoJ2FuaW1hdGluZycpKVxyXG4gICAgICAgIClcclxuICAgICAgKSxcclxuICAgICAgc3dpdGNoTWFwKFxyXG4gICAgICAgIGFuaW0gPT4ge1xyXG4gICAgICAgICAgaWYgKGFuaW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldFRyYW5zbGF0ZWRTdGF0ZSgpLnBpcGUoXHJcbiAgICAgICAgICAgICAgZmlyc3QoKSxcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvZignbm90IGFuaW1hdGluZycpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgKSxcclxuICAgICAgdGFwKCgpID0+IHtcclxuICAgICAgICB0aGlzLmRyYWdnaW5nLmVtaXQoe2RyYWdnaW5nOiBmYWxzZSwgZGF0YTogdGhpcy5zbGlkZXNPdXRwdXREYXRhfSk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuX2Nhcm91c2VsTWVyZ2UkID0gbWVyZ2UoXHJcbiAgICAgIHRoaXMuX3ZpZXdDdXJTZXR0aW5ncyQsXHJcbiAgICAgIHRoaXMuX3RyYW5zbGF0ZWRDYXJvdXNlbCQsXHJcbiAgICAgIHRoaXMuX2RyYWdnaW5nQ2Fyb3VzZWwkLFxyXG4gICAgICB0aGlzLl9jaGFuZ2VDYXJvdXNlbCQsXHJcbiAgICAgIHRoaXMuX2NoYW5nZWRDYXJvdXNlbCQsXHJcbiAgICAgIHRoaXMuX2luaXRpYWxpemVkQ2Fyb3VzZWwkXHJcbiAgICApO1xyXG4gICAgdGhpcy5fYWxsT2JzZXJ2U3Vic2NyaXB0aW9uID0gdGhpcy5fY2Fyb3VzZWxNZXJnZSQuc3Vic2NyaWJlKCgpID0+IHt9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXQgc3Vic2NyaXB0aW9uIHRvIHJlc2l6ZSBldmVudCBhbmQgYXR0YWNoZXMgaGFuZGxlciBmb3IgdGhpcyBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3dpblJlc2l6ZVdhdGNoZXIoKSB7XHJcbiAgICBpZiAoT2JqZWN0LmtleXModGhpcy5jYXJvdXNlbFNlcnZpY2UuX29wdGlvbnMucmVzcG9uc2l2ZSkubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMucmVzaXplU3Vic2NyaXB0aW9uID0gdGhpcy5yZXNpemVTZXJ2aWNlLm9uUmVzaXplJFxyXG4gICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgZmlsdGVyKCgpID0+IHRoaXMuY2Fyb3VzZWxXaW5kb3dXaWR0aCAhPT0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vd2wtY2Fyb3VzZWwnKS5jbGllbnRXaWR0aCksXHJcbiAgICAgICAgICBkZWxheSh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5yZXNwb25zaXZlUmVmcmVzaFJhdGUpXHJcbiAgICAgICAgKVxyXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uub25SZXNpemUodGhpcy5lbC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vd2wtY2Fyb3VzZWwnKS5jbGllbnRXaWR0aCk7XHJcbiAgICAgICAgICB0aGlzLmNhcm91c2VsV2luZG93V2lkdGggPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLm93bC1jYXJvdXNlbCcpLmNsaWVudFdpZHRoO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlciBmb3IgdHJhbnNpdGlvZW5kIGV2ZW50XHJcbiAgICovXHJcbiAgb25UcmFuc2l0aW9uRW5kKCkge1xyXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uub25UcmFuc2l0aW9uRW5kKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGVyIGZvciBjbGljayBldmVudCwgYXR0YWNoZWQgdG8gbmV4dCBidXR0b25cclxuICAgKi9cclxuICBuZXh0KCkge1xyXG4gICAgaWYgKCF0aGlzLmNhcm91c2VsTG9hZGVkKSByZXR1cm47XHJcbiAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLm5leHQodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MubmF2U3BlZWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlciBmb3IgY2xpY2sgZXZlbnQsIGF0dGFjaGVkIHRvIHByZXYgYnV0dG9uXHJcbiAgICovXHJcbiAgcHJldigpIHtcclxuICAgIGlmICghdGhpcy5jYXJvdXNlbExvYWRlZCkgcmV0dXJuO1xyXG4gICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5wcmV2KHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLm5hdlNwZWVkKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhbmRsZXIgZm9yIGNsaWNrIGV2ZW50LCBhdHRhY2hlZCB0byBkb3RzXHJcbiAgICovXHJcbiAgbW92ZUJ5RG90KGRvdElkOiBzdHJpbmcpIHtcclxuICAgIGlmICghdGhpcy5jYXJvdXNlbExvYWRlZCkgcmV0dXJuO1xyXG4gICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5tb3ZlQnlEb3QoZG90SWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogcmV3aW5kcyBjYXJvdXNlbCB0byBzbGlkZSB3aXRoIG5lZWRlZCBpZFxyXG4gICAqIEBwYXJhbSBpZCBmcmFnbWVudCBvZiB1cmxcclxuICAgKi9cclxuICB0byhpZDogc3RyaW5nKSB7XHJcbiAgICAvLyBpZiAoIXRoaXMuY2Fyb3VzZWxMb2FkZWQgfHwgKCh0aGlzLm5hdkRhdGEgJiYgdGhpcy5uYXZEYXRhLmRpc2FibGVkKSAmJiAodGhpcy5kb3RzRGF0YSAmJiB0aGlzLmRvdHNEYXRhLmRpc2FibGVkKSkpIHJldHVybjtcclxuICAgIGlmICghdGhpcy5jYXJvdXNlbExvYWRlZCkgcmV0dXJuO1xyXG4gICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS50b1NsaWRlQnlJZChpZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHYXRoZXJzIGFuZCBwcmVwYXJlcyBkYXRhIGludGVuZGVkIGZvciBwYXNzaW5nIHRvIHRoZSB1c2VyIGJ5IG1lYW5zIG9mIGZpcmluZyBldmVudCB0cmFuc2xhdGVkQ2Fyb3VzZWxcclxuICAgKi9cclxuICBnYXRoZXJUcmFuc2xhdGVkRGF0YSgpIHtcclxuICAgIGxldCBzdGFydFBvc2l0aW9uOiBudW1iZXI7XHJcbiAgICBjb25zdCBjbG9uZWRJZFByZWZpeCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmNsb25lZElkUHJlZml4O1xyXG4gICAgY29uc3QgYWN0aXZlU2xpZGVzOiBTbGlkZU1vZGVsW10gPSB0aGlzLnNsaWRlc0RhdGFcclxuICAgICAgLmZpbHRlcihzbGlkZSA9PiBzbGlkZS5pc0FjdGl2ZSA9PT0gdHJ1ZSlcclxuICAgICAgLm1hcChzbGlkZSA9PiB7XHJcbiAgICAgICAgY29uc3QgaWQgPSBzbGlkZS5pZC5pbmRleE9mKGNsb25lZElkUHJlZml4KSA+PSAwID8gc2xpZGUuaWQuc2xpY2UoY2xvbmVkSWRQcmVmaXgubGVuZ3RoKSA6IHNsaWRlLmlkO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBpZDogaWQsXHJcbiAgICAgICAgICB3aWR0aDogc2xpZGUud2lkdGgsXHJcbiAgICAgICAgICBtYXJnaW5MOiBzbGlkZS5tYXJnaW5MLFxyXG4gICAgICAgICAgbWFyZ2luUjogc2xpZGUubWFyZ2luUixcclxuICAgICAgICAgIGNlbnRlcjogc2xpZGUuaXNDZW50ZXJlZFxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICBzdGFydFBvc2l0aW9uID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UucmVsYXRpdmUodGhpcy5jYXJvdXNlbFNlcnZpY2UuY3VycmVudCgpKTtcclxuICAgIHRoaXMuc2xpZGVzT3V0cHV0RGF0YSA9IHtcclxuICAgICAgc3RhcnRQb3NpdGlvbjogc3RhcnRQb3NpdGlvbixcclxuICAgICAgc2xpZGVzOiBhY3RpdmVTbGlkZXNcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0YXJ0cyBwYXVzaW5nXHJcbiAgICovXHJcbiAgc3RhcnRQYXVzaW5nKCkge1xyXG4gICAgdGhpcy5hdXRvcGxheVNlcnZpY2Uuc3RhcnRQYXVzaW5nKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdGFydHMgcGxheWluZyBhZnRlciBtb3VzZSBsZWF2ZXMgY2Fyb3VzZWxcclxuICAgKi9cclxuICBzdGFydFBsYXlNTCgpIHtcclxuICAgIHRoaXMuYXV0b3BsYXlTZXJ2aWNlLnN0YXJ0UGxheWluZ01vdXNlTGVhdmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0YXJ0cyBwbGF5aW5nIGFmdGVyIHRvdWNoIGVuZHNcclxuICAgKi9cclxuICBzdGFydFBsYXlURSgpIHtcclxuICAgIHRoaXMuYXV0b3BsYXlTZXJ2aWNlLnN0YXJ0UGxheWluZ1RvdWNoRW5kKCk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=