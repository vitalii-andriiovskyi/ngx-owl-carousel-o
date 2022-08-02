import { Component, Input, Output, ContentChildren, EventEmitter, HostListener, Inject, ChangeDetectionStrategy } from '@angular/core';
import { merge, of, from } from 'rxjs';
import { tap, delay, filter, switchMap, first, map, skip, take, toArray } from 'rxjs/operators';
import { CarouselService } from '../services/carousel.service';
import { NavigationService } from '../services/navigation.service';
import { AutoplayService } from '../services/autoplay.service';
import { LazyLoadService } from '../services/lazyload.service';
import { AnimateService } from '../services/animate.service';
import { AutoHeightService } from '../services/autoheight.service';
import { HashService } from '../services/hash.service';
import { DOCUMENT } from '../services/document-ref.service';
import { CarouselSlideDirective } from './carousel-slide.directive';
import * as i0 from "@angular/core";
import * as i1 from "../services/resize.service";
import * as i2 from "../services/carousel.service";
import * as i3 from "../services/navigation.service";
import * as i4 from "../services/autoplay.service";
import * as i5 from "../services/lazyload.service";
import * as i6 from "../services/animate.service";
import * as i7 from "../services/autoheight.service";
import * as i8 from "../services/hash.service";
import * as i9 from "../services/logger.service";
import * as i10 from "./stage/stage.component";
import * as i11 from "@angular/common";
export class CarouselComponent {
    constructor(el, resizeService, carouselService, navigationService, autoplayService, lazyLoadService, animateService, autoHeightService, hashService, logger, changeDetectorRef, docRef) {
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
        this.changeDetectorRef = changeDetectorRef;
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
        this.docRef = docRef;
    }
    onVisibilityChange(ev) {
        if (!this.carouselService.settings.autoplay)
            return;
        switch (this.docRef.visibilityState) {
            case 'visible':
                !this.autoplayService.isAutoplayStopped && this.autoplayService.play();
                break;
            case 'hidden':
                this.autoplayService.pause();
                break;
            default:
                break;
        }
    }
    ;
    ngOnInit() {
        this.spyDataStreams();
        this.carouselWindowWidth = this.el.nativeElement.querySelector('.owl-carousel').clientWidth;
    }
    ngOnChanges() {
        if (this.prevOptions !== this.options) {
            if (this.prevOptions && this.slides?.toArray().length) {
                this.carouselService.setup(this.carouselWindowWidth, this.slides.toArray(), this.options);
                this.carouselService.initialize(this.slides.toArray());
            }
            else if (this.prevOptions && !this.slides?.toArray().length) {
                this.carouselLoaded = false;
                this.logger.log(`There are no slides to show. So the carousel won't be re-rendered...`);
            }
            else {
                this.carouselLoaded = false;
            }
            this.prevOptions = this.options;
        }
    }
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
    ngOnDestroy() {
        if (this.resizeSubscription) {
            this.resizeSubscription.unsubscribe();
        }
        if (this._slidesChangesSubscription) {
            this._slidesChangesSubscription.unsubscribe();
        }
        if (this._allObservSubscription) {
            this._allObservSubscription.unsubscribe();
        }
    }
    /**
     * Joins the observable login in one place: sets values to some observables, merges this observables and
     * subcribes to merge func
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
            this.changeDetectorRef.markForCheck();
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
            const changedPosition = of(value).pipe(filter(() => value.property.name === 'position'), switchMap(() => from(this.slidesData)), skip(value.property.value), take(this.carouselService.settings.items), map(slide => {
                const clonedIdPrefix = this.carouselService.clonedIdPrefix;
                const id = slide.id.indexOf(clonedIdPrefix) >= 0 ? slide.id.slice(clonedIdPrefix.length) : slide.id;
                return { ...slide, id: id, isActive: true };
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
     */
    onTransitionEnd() {
        this.carouselService.onTransitionEnd();
    }
    /**
     * Handler for click event, attached to next button
     */
    next() {
        if (!this.carouselLoaded)
            return;
        this.navigationService.next(this.carouselService.settings.navSpeed);
    }
    /**
     * Handler for click event, attached to prev button
     */
    prev() {
        if (!this.carouselLoaded)
            return;
        this.navigationService.prev(this.carouselService.settings.navSpeed);
    }
    /**
     * Handler for click event, attached to dots
     */
    moveByDot(dotId) {
        if (!this.carouselLoaded)
            return;
        this.navigationService.moveByDot(dotId);
    }
    /**
     * rewinds carousel to slide with needed id
     * @param id fragment of url
     */
    to(id) {
        // if (!this.carouselLoaded || ((this.navData && this.navData.disabled) && (this.dotsData && this.dotsData.disabled))) return;
        if (!this.carouselLoaded)
            return;
        this.navigationService.toSlideById(id);
    }
    /**
     * Gathers and prepares data intended for passing to the user by means of firing event translatedCarousel
     */
    gatherTranslatedData() {
        let startPosition;
        const clonedIdPrefix = this.carouselService.clonedIdPrefix;
        const activeSlides = this.slidesData
            .filter(slide => slide.isActive === true)
            .map(slide => {
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
     */
    startPausing() {
        this.autoplayService.startPausing();
    }
    /**
     * Starts playing after mouse leaves carousel
     */
    startPlayML() {
        this.autoplayService.startPlayingMouseLeave();
    }
    /**
     * Starts playing after touch ends
     */
    startPlayTE() {
        this.autoplayService.startPlayingTouchEnd();
    }
    stopAutoplay() {
        this.autoplayService.isAutoplayStopped = true;
        this.autoplayService.stop();
    }
    startAutoplay() {
        this.autoplayService.isAutoplayStopped = false;
        this.autoplayService.play();
    }
}
CarouselComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: CarouselComponent, deps: [{ token: i0.ElementRef }, { token: i1.ResizeService }, { token: i2.CarouselService }, { token: i3.NavigationService }, { token: i4.AutoplayService }, { token: i5.LazyLoadService }, { token: i6.AnimateService }, { token: i7.AutoHeightService }, { token: i8.HashService }, { token: i9.OwlLogger }, { token: i0.ChangeDetectorRef }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Component });
CarouselComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.2", type: CarouselComponent, selector: "owl-carousel-o", inputs: { options: "options" }, outputs: { translated: "translated", dragging: "dragging", change: "change", changed: "changed", initialized: "initialized" }, host: { listeners: { "document:visibilitychange": "onVisibilityChange($event)" } }, providers: [
        NavigationService,
        AutoplayService,
        CarouselService,
        LazyLoadService,
        AnimateService,
        AutoHeightService,
        HashService
    ], queries: [{ propertyName: "slides", predicate: CarouselSlideDirective }], usesOnChanges: true, ngImport: i0, template: `
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
            <span [innerHTML]="dot.innerContent"></span>
          </div>
        </div> <!-- /.owl-dots -->
      </ng-container>
    </div> <!-- /.owl-carousel owl-loaded -->
  `, isInline: true, styles: [".owl-theme{display:block}\n"], components: [{ type: i10.StageComponent, selector: "owl-stage", inputs: ["owlDraggable", "stageData", "slidesData"] }], directives: [{ type: i11.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i11.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i11.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: CarouselComponent, decorators: [{
            type: Component,
            args: [{
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
            <span [innerHTML]="dot.innerContent"></span>
          </div>
        </div> <!-- /.owl-dots -->
      </ng-container>
    </div> <!-- /.owl-carousel owl-loaded -->
  `,
                    styles: [`.owl-theme { display: block; }`],
                    providers: [
                        NavigationService,
                        AutoplayService,
                        CarouselService,
                        LazyLoadService,
                        AnimateService,
                        AutoHeightService,
                        HashService
                    ],
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.ResizeService }, { type: i2.CarouselService }, { type: i3.NavigationService }, { type: i4.AutoplayService }, { type: i5.LazyLoadService }, { type: i6.AnimateService }, { type: i7.AutoHeightService }, { type: i8.HashService }, { type: i9.OwlLogger }, { type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { slides: [{
                type: ContentChildren,
                args: [CarouselSlideDirective]
            }], translated: [{
                type: Output
            }], dragging: [{
                type: Output
            }], change: [{
                type: Output
            }], changed: [{
                type: Output
            }], initialized: [{
                type: Output
            }], options: [{
                type: Input
            }], onVisibilityChange: [{
                type: HostListener,
                args: ['document:visibilitychange', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGlicy9uZ3gtb3dsLWNhcm91c2VsLW8vc3JjL2xpYi9jYXJvdXNlbC9jYXJvdXNlbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFHVCxLQUFLLEVBQ0wsTUFBTSxFQUVOLGVBQWUsRUFHZixZQUFZLEVBQ1osWUFBWSxFQUNaLE1BQU0sRUFFTix1QkFBdUIsRUFFeEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUE0QixLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUdqRSxPQUFPLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRyxPQUFPLEVBQUUsZUFBZSxFQUF1QixNQUFNLDhCQUE4QixDQUFDO0FBTXBGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUV2RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDNUQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7Ozs7Ozs7Ozs7Ozs7QUErQ3BFLE1BQU0sT0FBTyxpQkFBaUI7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SyxDQUFDO1FBQy9DLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDOUIsQ0FBQzs7OEdBemJVLGlCQUFpQiwyVkEySGxCLFFBQVE7a0dBM0hQLGlCQUFpQiw0UkFYakI7UUFDVCxpQkFBaUI7UUFDakIsZUFBZTtRQUNmLGVBQWU7UUFDZixlQUFlO1FBQ2YsY0FBYztRQUNkLGlCQUFpQjtRQUNqQixXQUFXO0tBQ1osaURBS2dCLHNCQUFzQixrREE1QzdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZCVDsyRkFhVSxpQkFBaUI7a0JBNUM3QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2QlQ7b0JBQ0QsTUFBTSxFQUFFLENBQUMsZ0NBQWdDLENBQUM7b0JBQzFDLFNBQVMsRUFBRTt3QkFDVCxpQkFBaUI7d0JBQ2pCLGVBQWU7d0JBQ2YsZUFBZTt3QkFDZixlQUFlO3dCQUNmLGNBQWM7d0JBQ2QsaUJBQWlCO3dCQUNqQixXQUFXO3FCQUNaO29CQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRDs7MEJBNEhJLE1BQU07MkJBQUMsUUFBUTs0Q0F4SGxCLE1BQU07c0JBREwsZUFBZTt1QkFBQyxzQkFBc0I7Z0JBRzdCLFVBQVU7c0JBQW5CLE1BQU07Z0JBQ0csUUFBUTtzQkFBakIsTUFBTTtnQkFDRyxNQUFNO3NCQUFmLE1BQU07Z0JBQ0csT0FBTztzQkFBaEIsTUFBTTtnQkFDRyxXQUFXO3NCQUFwQixNQUFNO2dCQThERSxPQUFPO3NCQUFmLEtBQUs7Z0JBMkROLGtCQUFrQjtzQkFEakIsWUFBWTt1QkFBQywyQkFBMkIsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgT25Jbml0LFxuICBPbkRlc3Ryb3ksXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBFbGVtZW50UmVmLFxuICBBZnRlckNvbnRlbnRJbml0LFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5qZWN0LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIE9uQ2hhbmdlc1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBPYnNlcnZhYmxlLCBtZXJnZSwgb2YsIGZyb20gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgUmVzaXplU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3Jlc2l6ZS5zZXJ2aWNlJztcbmltcG9ydCB7IHRhcCwgZGVsYXksIGZpbHRlciwgc3dpdGNoTWFwLCBmaXJzdCwgbWFwLCBza2lwLCB0YWtlLCB0b0FycmF5IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ2Fyb3VzZWxTZXJ2aWNlLCBDYXJvdXNlbEN1cnJlbnREYXRhIH0gZnJvbSAnLi4vc2VydmljZXMvY2Fyb3VzZWwuc2VydmljZSc7XG5pbXBvcnQgeyBTdGFnZURhdGEgfSBmcm9tIFwiLi4vbW9kZWxzL3N0YWdlLWRhdGEubW9kZWxcIjtcbmltcG9ydCB7IE93bERPTURhdGEgfSBmcm9tIFwiLi4vbW9kZWxzL293bERPTS1kYXRhLm1vZGVsXCI7XG5pbXBvcnQgeyBTbGlkZU1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL3NsaWRlLm1vZGVsJztcbmltcG9ydCB7IE93bE9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbHMvb3dsLW9wdGlvbnMubW9kZWwnO1xuaW1wb3J0IHsgTmF2RGF0YSwgRG90c0RhdGEgfSBmcm9tICcuLi9tb2RlbHMvbmF2aWdhdGlvbi1kYXRhLm1vZGVscyc7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25hdmlnYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBBdXRvcGxheVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9hdXRvcGxheS5zZXJ2aWNlJztcbmltcG9ydCB7IExhenlMb2FkU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2xhenlsb2FkLnNlcnZpY2UnO1xuaW1wb3J0IHsgQW5pbWF0ZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9hbmltYXRlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0b0hlaWdodFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9hdXRvaGVpZ2h0LnNlcnZpY2UnO1xuaW1wb3J0IHsgSGFzaFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9oYXNoLnNlcnZpY2UnO1xuaW1wb3J0IHsgT3dsTG9nZ2VyIH0gZnJvbSAnLi4vc2VydmljZXMvbG9nZ2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICcuLi9zZXJ2aWNlcy9kb2N1bWVudC1yZWYuc2VydmljZSc7XG5pbXBvcnQgeyBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlIH0gZnJvbSAnLi9jYXJvdXNlbC1zbGlkZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgU2xpZGVzT3V0cHV0RGF0YSB9IGZyb20gJy4uL21vZGVscy9TbGlkZXNPdXRwdXREYXRhJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnb3dsLWNhcm91c2VsLW8nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJvd2wtY2Fyb3VzZWwgb3dsLXRoZW1lXCIgI293bENhcm91c2VsXG4gICAgICBbbmdDbGFzc109XCJ7J293bC1ydGwnOiBvd2xET01EYXRhPy5ydGwsXG4gICAgICAgICAgICAgICAgICAnb3dsLWxvYWRlZCc6IG93bERPTURhdGE/LmlzTG9hZGVkLFxuICAgICAgICAgICAgICAgICAgJ293bC1yZXNwb25zaXZlJzogb3dsRE9NRGF0YT8uaXNSZXNwb25zaXZlLFxuICAgICAgICAgICAgICAgICAgJ293bC1kcmFnJzogb3dsRE9NRGF0YT8uaXNNb3VzZURyYWdhYmxlLFxuICAgICAgICAgICAgICAgICAgJ293bC1ncmFiJzogb3dsRE9NRGF0YT8uaXNHcmFifVwiXG4gICAgICAobW91c2VvdmVyKT1cInN0YXJ0UGF1c2luZygpXCJcbiAgICAgIChtb3VzZWxlYXZlKT1cInN0YXJ0UGxheU1MKClcIlxuICAgICAgKHRvdWNoc3RhcnQpPVwic3RhcnRQYXVzaW5nKClcIlxuICAgICAgKHRvdWNoZW5kKT1cInN0YXJ0UGxheVRFKClcIj5cblxuICAgICAgPGRpdiAqbmdJZj1cImNhcm91c2VsTG9hZGVkXCIgY2xhc3M9XCJvd2wtc3RhZ2Utb3V0ZXJcIj5cbiAgICAgICAgPG93bC1zdGFnZSBbb3dsRHJhZ2dhYmxlXT1cInsnaXNNb3VzZURyYWdhYmxlJzogb3dsRE9NRGF0YT8uaXNNb3VzZURyYWdhYmxlLCAnaXNUb3VjaERyYWdhYmxlJzogb3dsRE9NRGF0YT8uaXNUb3VjaERyYWdhYmxlfVwiXG4gICAgICAgICAgICAgICAgICAgIFtzdGFnZURhdGFdPVwic3RhZ2VEYXRhXCJcbiAgICAgICAgICAgICAgICAgICAgW3NsaWRlc0RhdGFdPVwic2xpZGVzRGF0YVwiPjwvb3dsLXN0YWdlPlxuICAgICAgPC9kaXY+IDwhLS0gLy5vd2wtc3RhZ2Utb3V0ZXIgLS0+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwic2xpZGVzLnRvQXJyYXkoKS5sZW5ndGhcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm93bC1uYXZcIiBbbmdDbGFzc109XCJ7J2Rpc2FibGVkJzogbmF2RGF0YT8uZGlzYWJsZWR9XCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm93bC1wcmV2XCIgW25nQ2xhc3NdPVwieydkaXNhYmxlZCc6IG5hdkRhdGE/LnByZXY/LmRpc2FibGVkfVwiIChjbGljayk9XCJwcmV2KClcIiBbaW5uZXJIVE1MXT1cIm5hdkRhdGE/LnByZXY/Lmh0bWxUZXh0XCI+PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm93bC1uZXh0XCIgW25nQ2xhc3NdPVwieydkaXNhYmxlZCc6IG5hdkRhdGE/Lm5leHQ/LmRpc2FibGVkfVwiIChjbGljayk9XCJuZXh0KClcIiBbaW5uZXJIVE1MXT1cIm5hdkRhdGE/Lm5leHQ/Lmh0bWxUZXh0XCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PiA8IS0tIC8ub3dsLW5hdiAtLT5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm93bC1kb3RzXCIgW25nQ2xhc3NdPVwieydkaXNhYmxlZCc6IGRvdHNEYXRhPy5kaXNhYmxlZH1cIj5cbiAgICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBkb3Qgb2YgZG90c0RhdGE/LmRvdHNcIiBjbGFzcz1cIm93bC1kb3RcIiBbbmdDbGFzc109XCJ7J2FjdGl2ZSc6IGRvdC5hY3RpdmUsICdvd2wtZG90LXRleHQnOiBkb3Quc2hvd0lubmVyQ29udGVudH1cIiAoY2xpY2spPVwibW92ZUJ5RG90KGRvdC5pZClcIj5cbiAgICAgICAgICAgIDxzcGFuIFtpbm5lckhUTUxdPVwiZG90LmlubmVyQ29udGVudFwiPjwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+IDwhLS0gLy5vd2wtZG90cyAtLT5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvZGl2PiA8IS0tIC8ub3dsLWNhcm91c2VsIG93bC1sb2FkZWQgLS0+XG4gIGAsXG4gIHN0eWxlczogW2Aub3dsLXRoZW1lIHsgZGlzcGxheTogYmxvY2s7IH1gXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgTmF2aWdhdGlvblNlcnZpY2UsXG4gICAgQXV0b3BsYXlTZXJ2aWNlLFxuICAgIENhcm91c2VsU2VydmljZSxcbiAgICBMYXp5TG9hZFNlcnZpY2UsXG4gICAgQW5pbWF0ZVNlcnZpY2UsXG4gICAgQXV0b0hlaWdodFNlcnZpY2UsXG4gICAgSGFzaFNlcnZpY2VcbiAgXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQ2Fyb3VzZWxDb21wb25lbnRcbiAgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcbiAgQENvbnRlbnRDaGlsZHJlbihDYXJvdXNlbFNsaWRlRGlyZWN0aXZlKVxuICBzbGlkZXM6IFF1ZXJ5TGlzdDxDYXJvdXNlbFNsaWRlRGlyZWN0aXZlPjtcblxuICBAT3V0cHV0KCkgdHJhbnNsYXRlZCA9IG5ldyBFdmVudEVtaXR0ZXI8U2xpZGVzT3V0cHV0RGF0YT4oKTtcbiAgQE91dHB1dCgpIGRyYWdnaW5nID0gbmV3IEV2ZW50RW1pdHRlcjx7ZHJhZ2dpbmc6IGJvb2xlYW4sIGRhdGE6IFNsaWRlc091dHB1dERhdGF9PigpO1xuICBAT3V0cHV0KCkgY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxTbGlkZXNPdXRwdXREYXRhPigpO1xuICBAT3V0cHV0KCkgY2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8U2xpZGVzT3V0cHV0RGF0YT4oKTtcbiAgQE91dHB1dCgpIGluaXRpYWxpemVkID0gbmV3IEV2ZW50RW1pdHRlcjxTbGlkZXNPdXRwdXREYXRhPigpO1xuXG4gIC8qKlxuICAgKiBXaWR0aCBvZiBjYXJvdXNlbCB3aW5kb3cgKHRhZyB3aXRoIGNsYXNzIC5vd2wtY2Fyb3VzZWwpLCBpbiB3aWNoIHdlIGNhbiBzZWUgbW92aW5nIHNsaWRlcnNcbiAgICovXG4gIGNhcm91c2VsV2luZG93V2lkdGg6IG51bWJlcjtcblxuICAvKipcbiAgICogU3Vic2NyaXB0aW9uIHRvICdyZXNpemUnIGV2ZW50XG4gICAqL1xuICByZXNpemVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKipcbiAgICogU3Vic2NyaXB0aW9uIG1lcmdlIE9ic2VydmFibGUsIHdoaWNoIG1lcmdlcyBhbGwgT2JzZXJ2YWJsZXMgaW4gdGhlIGNvbXBvbmVudCBleGNlcHQgJ3Jlc2l6ZScgT2JzZXJ2YWJsZSBhbmQgdGhpcy5zbGlkZXMuY2hhbmdlcygpXG4gICAqL1xuICBwcml2YXRlIF9hbGxPYnNlcnZTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKipcbiAgICogU3Vic2NyaXB0aW9uIHRvIGB0aGlzLnNsaWRlcy5jaGFuZ2VzKCkuXG4gICAqIEl0IGNvdWxkIGJlIGluY2x1ZGVkIGluICd0aGlzLl9hbGxPYnNlcnZTdWJzY3JpcHRpb24nLCBidXQgdGhhdCBzdWJjcmlwdGlvbiBnZXQgY3JlYXRlZCBkdXJpbmcgdGhlIGluaXRpYWxpemluZyBvZiBjb21wb25lbnRcbiAgICogYW5kICd0aGlzLnNsaWRlcycgYXJlIHVuZGVmaW5lZCBhdCB0aGF0IG1vbWVudC4gU28gaXQncyBuZWVkZWQgdG8gd2FpdCBmb3IgaW5pdGlhbGl6YXRpb24gb2YgY29udGVudC5cbiAgICovXG4gIHByaXZhdGUgX3NsaWRlc0NoYW5nZXNTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKipcbiAgICogQ3VycmVudCBzZXR0aW5ncyBmb3IgdGhlIGNhcm91c2VsLlxuICAgKi9cbiAgb3dsRE9NRGF0YTogT3dsRE9NRGF0YTtcblxuICAvKipcbiAgICogRGF0YSBvZiBvd2wtc3RhZ2VcbiAgICovXG4gIHN0YWdlRGF0YTogU3RhZ2VEYXRhO1xuXG4gIC8qKlxuXHQgKiAgRGF0YSBvZiBldmVyeSBzbGlkZVxuXHQgKi9cbiAgc2xpZGVzRGF0YTogU2xpZGVNb2RlbFtdID0gW107XG5cbiAgLyoqXG5cdCAqIERhdGEgb2YgbmF2aWdhdGlvbiBibG9ja1xuXHQgKi9cblx0bmF2RGF0YTogTmF2RGF0YTtcblxuXHQvKipcblx0ICogRGF0YSBvZiBkb3RzIGJsb2NrXG5cdCAqL1xuICBkb3RzRGF0YTogRG90c0RhdGE7XG5cbiAgLyoqXG4gICAqIERhdGEsIHdpY2ggYXJlIHBhc3NlZCBvdXQgb2YgY2Fyb3VzZWwgYWZ0ZXIgZW5kaW5nIG9mIHRyYW5zaW9uaW5nIG9mIGNhcm91c2VsXG4gICAqL1xuICBzbGlkZXNPdXRwdXREYXRhOiBTbGlkZXNPdXRwdXREYXRhO1xuXG4gIC8qKlxuICAgKiBTaG93cyB3aGV0aGVyIGNhcm91c2VsIGlzIGxvYWRlZCBvZiBub3QuXG4gICAqL1xuICBjYXJvdXNlbExvYWRlZCA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBVc2VyJ3Mgb3B0aW9uc1xuICAgKi9cbiAgQElucHV0KCkgb3B0aW9uczogT3dsT3B0aW9ucztcblxuICBwcmV2T3B0aW9uczogT3dsT3B0aW9ucztcblxuICAvKipcbiAgICogT2JzZXJ2YWJsZSBmb3IgZ2V0dGluZyBjdXJyZW50IFZpZXcgU2V0dGluZ3NcbiAgICovXG4gIHByaXZhdGUgX3ZpZXdDdXJTZXR0aW5ncyQ6IE9ic2VydmFibGU8Q2Fyb3VzZWxDdXJyZW50RGF0YT47XG5cbiAgLyoqXG4gICAqIE9ic2VydmFibGUgZm9yIGNhdGNoaW5nIHRoZSBlbmQgb2YgdHJhbnNpdGlvbiBvZiBjYXJvdXNlbFxuICAgKi9cbiAgcHJpdmF0ZSBfdHJhbnNsYXRlZENhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+O1xuXG4gIC8qKlxuICAgKiBPYnNlcnZhYmxlIGZvciBjYXRjaGluZyB0aGUgc3RhcnQgb2YgZHJhZ2dpbmcgb2YgdGhlIGNhcm91c2VsXG4gICAqL1xuICBwcml2YXRlIF9kcmFnZ2luZ0Nhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+O1xuXG4gIC8qKlxuICAgKiBPYnNlcnZhYmxlIGZvciBjYXRjaGluZyB0aGUgc3RhcnQgb2YgY2hhbmdpbmcgb2YgdGhlIGNhcm91c2VsXG4gICAqL1xuICBwcml2YXRlIF9jaGFuZ2VDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPjtcblxuICAvKipcbiAgICogT2JzZXJ2YWJsZSBmb3IgY2F0Y2hpbmcgdGhlIG1vbWVudCB3aGVuIHRoZSBkYXRhIGFib3V0IHNsaWRlcyBjaGFuZ2VkLCBtb3JlIGV4YWN0bHkgd2hlbiB0aGUgcG9zaXRpb24gY2hhbmdlZC5cbiAgICovXG4gIHByaXZhdGUgX2NoYW5nZWRDYXJvdXNlbCQ6IE9ic2VydmFibGU8YW55PjtcblxuICAvKipcbiAgICogT2JzZXJ2YWJsZSBmb3IgY2F0Y2hpbmcgdGhlIGluaXRpYWxpemF0aW9uIG9mIGNoYW5naW5nIHRoZSBjYXJvdXNlbFxuICAgKi9cbiAgcHJpdmF0ZSBfaW5pdGlhbGl6ZWRDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPjtcblxuICAvKipcbiAgICogT2JzZXJ2YWJsZSBmb3IgbWVyZ2luZyBhbGwgT2JzZXJ2YWJsZXMgYW5kIGNyZWF0aW5nIG9uZSBzdWJzY3JpcHRpb25cbiAgICovXG4gIHByaXZhdGUgX2Nhcm91c2VsTWVyZ2UkOiBPYnNlcnZhYmxlPENhcm91c2VsQ3VycmVudERhdGEgfCBzdHJpbmc+O1xuICBwcml2YXRlIGRvY1JlZjogRG9jdW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHJlc2l6ZVNlcnZpY2U6IFJlc2l6ZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjYXJvdXNlbFNlcnZpY2U6IENhcm91c2VsU2VydmljZSxcbiAgICBwcml2YXRlIG5hdmlnYXRpb25TZXJ2aWNlOiBOYXZpZ2F0aW9uU2VydmljZSxcbiAgICBwcml2YXRlIGF1dG9wbGF5U2VydmljZTogQXV0b3BsYXlTZXJ2aWNlLFxuICAgIHByaXZhdGUgbGF6eUxvYWRTZXJ2aWNlOiBMYXp5TG9hZFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBhbmltYXRlU2VydmljZTogQW5pbWF0ZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBhdXRvSGVpZ2h0U2VydmljZTogQXV0b0hlaWdodFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBoYXNoU2VydmljZTogSGFzaFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBsb2dnZXI6IE93bExvZ2dlcixcbiAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBkb2NSZWY6IGFueVxuICApIHtcbiAgICB0aGlzLmRvY1JlZiA9IGRvY1JlZiBhcyBEb2N1bWVudDtcblxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6dmlzaWJpbGl0eWNoYW5nZScsIFsnJGV2ZW50J10pXG4gIG9uVmlzaWJpbGl0eUNoYW5nZShldjogYW55KSB7XG4gICAgaWYgKCF0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hdXRvcGxheSkgcmV0dXJuO1xuICAgIHN3aXRjaCAodGhpcy5kb2NSZWYudmlzaWJpbGl0eVN0YXRlKSB7XG4gICAgICBjYXNlICd2aXNpYmxlJzpcbiAgICAgICAgIXRoaXMuYXV0b3BsYXlTZXJ2aWNlLmlzQXV0b3BsYXlTdG9wcGVkICYmIHRoaXMuYXV0b3BsYXlTZXJ2aWNlLnBsYXkoKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ2hpZGRlbic6XG4gICAgICAgIHRoaXMuYXV0b3BsYXlTZXJ2aWNlLnBhdXNlKCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH07XG5cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnNweURhdGFTdHJlYW1zKCk7XG5cbiAgICB0aGlzLmNhcm91c2VsV2luZG93V2lkdGggPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICcub3dsLWNhcm91c2VsJ1xuICAgICkuY2xpZW50V2lkdGg7XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICBpZiAodGhpcy5wcmV2T3B0aW9ucyAhPT0gdGhpcy5vcHRpb25zKSB7XG4gICAgICBpZiAodGhpcy5wcmV2T3B0aW9ucyAmJiB0aGlzLnNsaWRlcz8udG9BcnJheSgpLmxlbmd0aCkge1xuICAgICAgICB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR1cCh0aGlzLmNhcm91c2VsV2luZG93V2lkdGgsIHRoaXMuc2xpZGVzLnRvQXJyYXkoKSwgdGhpcy5vcHRpb25zKTtcbiAgICAgICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UuaW5pdGlhbGl6ZSh0aGlzLnNsaWRlcy50b0FycmF5KCkpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnByZXZPcHRpb25zICYmICF0aGlzLnNsaWRlcz8udG9BcnJheSgpLmxlbmd0aCkge1xuICAgICAgICB0aGlzLmNhcm91c2VsTG9hZGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMubG9nZ2VyLmxvZyhgVGhlcmUgYXJlIG5vIHNsaWRlcyB0byBzaG93LiBTbyB0aGUgY2Fyb3VzZWwgd29uJ3QgYmUgcmUtcmVuZGVyZWQuLi5gKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY2Fyb3VzZWxMb2FkZWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHRoaXMucHJldk9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIGlmICh0aGlzLnNsaWRlcy50b0FycmF5KCkubGVuZ3RoKSB7XG4gICAgICB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR1cCh0aGlzLmNhcm91c2VsV2luZG93V2lkdGgsIHRoaXMuc2xpZGVzLnRvQXJyYXkoKSwgdGhpcy5vcHRpb25zKTtcbiAgICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmluaXRpYWxpemUodGhpcy5zbGlkZXMudG9BcnJheSgpKTtcblxuICAgICAgdGhpcy5fd2luUmVzaXplV2F0Y2hlcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxvZ2dlci5sb2coYFRoZXJlIGFyZSBubyBzbGlkZXMgdG8gc2hvdy4gU28gdGhlIGNhcm91c2VsIHdvbid0IGJlIHJlbmRlcmVkYCk7XG4gICAgfVxuXG4gICAgdGhpcy5fc2xpZGVzQ2hhbmdlc1N1YnNjcmlwdGlvbiA9IHRoaXMuc2xpZGVzLmNoYW5nZXMucGlwZShcbiAgICAgIHRhcCgoc2xpZGVzKSA9PiB7XG4gICAgICAgIGlmIChzbGlkZXMudG9BcnJheSgpLmxlbmd0aCkge1xuICAgICAgICAgIC8vIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldEl0ZW1zKHNsaWRlcy50b0FycmF5KCkpO1xuICAgICAgICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHVwKHRoaXMuY2Fyb3VzZWxXaW5kb3dXaWR0aCwgc2xpZGVzLnRvQXJyYXkoKSwgdGhpcy5vcHRpb25zKTtcbiAgICAgICAgICB0aGlzLmNhcm91c2VsU2VydmljZS5pbml0aWFsaXplKHNsaWRlcy50b0FycmF5KCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY2Fyb3VzZWxMb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coYFRoZXJlIGFyZSBubyBzbGlkZXMgdG8gc2hvdy4gU28gdGhlIGNhcm91c2VsIHdvbid0IGJlIHJlLXJlbmRlcmVkYCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKS5zdWJzY3JpYmUoKCk9Pnt9KTtcblxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMucmVzaXplU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnJlc2l6ZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9zbGlkZXNDaGFuZ2VzU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLl9zbGlkZXNDaGFuZ2VzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2FsbE9ic2VydlN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5fYWxsT2JzZXJ2U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEpvaW5zIHRoZSBvYnNlcnZhYmxlIGxvZ2luIGluIG9uZSBwbGFjZTogc2V0cyB2YWx1ZXMgdG8gc29tZSBvYnNlcnZhYmxlcywgbWVyZ2VzIHRoaXMgb2JzZXJ2YWJsZXMgYW5kXG4gICAqIHN1YmNyaWJlcyB0byBtZXJnZSBmdW5jXG4gICAqL1xuICBzcHlEYXRhU3RyZWFtcygpIHtcbiAgICB0aGlzLl92aWV3Q3VyU2V0dGluZ3MkID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0Vmlld0N1clNldHRpbmdzKCkucGlwZShcbiAgICAgIHRhcChkYXRhID0+IHtcbiAgICAgICAgdGhpcy5vd2xET01EYXRhID0gZGF0YS5vd2xET01EYXRhO1xuICAgICAgICB0aGlzLnN0YWdlRGF0YSA9IGRhdGEuc3RhZ2VEYXRhO1xuICAgICAgICB0aGlzLnNsaWRlc0RhdGEgPSBkYXRhLnNsaWRlc0RhdGE7XG4gICAgICAgIGlmICghdGhpcy5jYXJvdXNlbExvYWRlZCkge1xuICAgICAgICAgIHRoaXMuY2Fyb3VzZWxMb2FkZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubmF2RGF0YSA9IGRhdGEubmF2RGF0YTtcbiAgICAgICAgdGhpcy5kb3RzRGF0YSA9IGRhdGEuZG90c0RhdGE7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICB9KVxuICAgICk7XG5cbiAgICB0aGlzLl9pbml0aWFsaXplZENhcm91c2VsJCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldEluaXRpYWxpemVkU3RhdGUoKS5waXBlKFxuICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgdGhpcy5nYXRoZXJUcmFuc2xhdGVkRGF0YSgpO1xuICAgICAgICB0aGlzLmluaXRpYWxpemVkLmVtaXQodGhpcy5zbGlkZXNPdXRwdXREYXRhKTtcbiAgICAgICAgLy8gdGhpcy5zbGlkZXNPdXRwdXREYXRhID0ge307XG4gICAgICB9KVxuICAgIClcblxuICAgIHRoaXMuX3RyYW5zbGF0ZWRDYXJvdXNlbCQgPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRUcmFuc2xhdGVkU3RhdGUoKS5waXBlKFxuICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgdGhpcy5nYXRoZXJUcmFuc2xhdGVkRGF0YSgpO1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZWQuZW1pdCh0aGlzLnNsaWRlc091dHB1dERhdGEpO1xuICAgICAgICAvLyB0aGlzLnNsaWRlc091dHB1dERhdGEgPSB7fTtcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMuX2NoYW5nZUNhcm91c2VsJCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldENoYW5nZVN0YXRlKCkucGlwZShcbiAgICAgIHRhcCgoKSA9PiB7XG4gICAgICAgIHRoaXMuZ2F0aGVyVHJhbnNsYXRlZERhdGEoKTtcbiAgICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh0aGlzLnNsaWRlc091dHB1dERhdGEpO1xuICAgICAgICAvLyB0aGlzLnNsaWRlc091dHB1dERhdGEgPSB7fTtcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMuX2NoYW5nZWRDYXJvdXNlbCQgPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRDaGFuZ2VTdGF0ZSgpLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAodmFsdWUgPT4ge1xuICAgICAgICBjb25zdCBjaGFuZ2VkUG9zaXRpb246IE9ic2VydmFibGU8U2xpZGVzT3V0cHV0RGF0YT4gPSBvZih2YWx1ZSkucGlwZShcbiAgICAgICAgICBmaWx0ZXIoKCkgPT4gdmFsdWUucHJvcGVydHkubmFtZSA9PT0gJ3Bvc2l0aW9uJyksXG4gICAgICAgICAgc3dpdGNoTWFwKCgpID0+IGZyb20odGhpcy5zbGlkZXNEYXRhKSksXG4gICAgICAgICAgc2tpcCh2YWx1ZS5wcm9wZXJ0eS52YWx1ZSksXG4gICAgICAgICAgdGFrZSh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5pdGVtcyksXG4gICAgICAgICAgbWFwKHNsaWRlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNsb25lZElkUHJlZml4ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuY2xvbmVkSWRQcmVmaXg7XG4gICAgICAgICAgICBjb25zdCBpZCA9IHNsaWRlLmlkLmluZGV4T2YoY2xvbmVkSWRQcmVmaXgpID49IDAgPyBzbGlkZS5pZC5zbGljZShjbG9uZWRJZFByZWZpeC5sZW5ndGgpIDogc2xpZGUuaWQ7XG4gICAgICAgICAgICByZXR1cm4geyAuLi5zbGlkZSwgaWQ6IGlkLCBpc0FjdGl2ZTogdHJ1ZSB9O1xuICAgICAgICAgIH0pLFxuICAgICAgICAgIHRvQXJyYXkoKSxcbiAgICAgICAgICBtYXAoc2xpZGVzID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHNsaWRlczogc2xpZGVzLFxuICAgICAgICAgICAgICBzdGFydFBvc2l0aW9uOiB0aGlzLmNhcm91c2VsU2VydmljZS5yZWxhdGl2ZSh2YWx1ZS5wcm9wZXJ0eS52YWx1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICApO1xuXG4gICAgICAgIC8vIGNvbnN0IGNoYW5nZWRTZXR0aW5nOiBPYnNlcnZhYmxlPFNsaWRlc091dHB1dERhdGE+ID0gb2YodmFsdWUpLnBpcGUoXG4gICAgICAgIC8vICAgZmlsdGVyKCgpID0+IHZhbHVlLnByb3BlcnR5Lm5hbWUgPT09ICdzZXR0aW5ncycpLFxuICAgICAgICAvLyAgIG1hcCgoKSA9PiB7XG4gICAgICAgIC8vICAgICByZXR1cm4ge1xuICAgICAgICAvLyAgICAgICBzbGlkZXM6IFtdLFxuICAgICAgICAvLyAgICAgICBzdGFydFBvc2l0aW9uOiB0aGlzLmNhcm91c2VsU2VydmljZS5yZWxhdGl2ZSh2YWx1ZS5wcm9wZXJ0eS52YWx1ZSlcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gICB9KVxuICAgICAgICAvLyApXG4gICAgICAgIHJldHVybiBtZXJnZShjaGFuZ2VkUG9zaXRpb24pO1xuICAgICAgfSksXG4gICAgICB0YXAoc2xpZGVzRGF0YSA9PiB7XG4gICAgICAgIHRoaXMuZ2F0aGVyVHJhbnNsYXRlZERhdGEoKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VkLmVtaXQoc2xpZGVzRGF0YS5zbGlkZXMubGVuZ3RoID8gc2xpZGVzRGF0YSA6IHRoaXMuc2xpZGVzT3V0cHV0RGF0YSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuc2xpZGVzT3V0cHV0RGF0YSk7XG4gICAgICAgIC8vIHRoaXMuc2xpZGVzT3V0cHV0RGF0YSA9IHt9O1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgdGhpcy5fZHJhZ2dpbmdDYXJvdXNlbCQgPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXREcmFnU3RhdGUoKS5waXBlKFxuICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgdGhpcy5nYXRoZXJUcmFuc2xhdGVkRGF0YSgpO1xuICAgICAgICB0aGlzLmRyYWdnaW5nLmVtaXQoe2RyYWdnaW5nOiB0cnVlLCBkYXRhOiB0aGlzLnNsaWRlc091dHB1dERhdGF9KTtcbiAgICAgIH0pLFxuICAgICAgc3dpdGNoTWFwKFxuICAgICAgICAoKSA9PiB0aGlzLmNhcm91c2VsU2VydmljZS5nZXREcmFnZ2VkU3RhdGUoKS5waXBlKFxuICAgICAgICAgIG1hcCgoKSA9PiAhIXRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmlzKCdhbmltYXRpbmcnKSlcbiAgICAgICAgKVxuICAgICAgKSxcbiAgICAgIHN3aXRjaE1hcChcbiAgICAgICAgYW5pbSA9PiB7XG4gICAgICAgICAgaWYgKGFuaW0pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRUcmFuc2xhdGVkU3RhdGUoKS5waXBlKFxuICAgICAgICAgICAgICBmaXJzdCgpLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG9mKCdub3QgYW5pbWF0aW5nJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApLFxuICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgdGhpcy5kcmFnZ2luZy5lbWl0KHtkcmFnZ2luZzogZmFsc2UsIGRhdGE6IHRoaXMuc2xpZGVzT3V0cHV0RGF0YX0pO1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgdGhpcy5fY2Fyb3VzZWxNZXJnZSQgPSBtZXJnZShcbiAgICAgIHRoaXMuX3ZpZXdDdXJTZXR0aW5ncyQsXG4gICAgICB0aGlzLl90cmFuc2xhdGVkQ2Fyb3VzZWwkLFxuICAgICAgdGhpcy5fZHJhZ2dpbmdDYXJvdXNlbCQsXG4gICAgICB0aGlzLl9jaGFuZ2VDYXJvdXNlbCQsXG4gICAgICB0aGlzLl9jaGFuZ2VkQ2Fyb3VzZWwkLFxuICAgICAgdGhpcy5faW5pdGlhbGl6ZWRDYXJvdXNlbCRcbiAgICApO1xuICAgIHRoaXMuX2FsbE9ic2VydlN1YnNjcmlwdGlvbiA9IHRoaXMuX2Nhcm91c2VsTWVyZ2UkLnN1YnNjcmliZSgoKSA9PiB7fSk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdCBzdWJzY3JpcHRpb24gdG8gcmVzaXplIGV2ZW50IGFuZCBhdHRhY2hlcyBoYW5kbGVyIGZvciB0aGlzIGV2ZW50XG4gICAqL1xuICBwcml2YXRlIF93aW5SZXNpemVXYXRjaGVyKCkge1xuICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLmNhcm91c2VsU2VydmljZS5fb3B0aW9ucy5yZXNwb25zaXZlKS5sZW5ndGgpIHtcbiAgICAgIHRoaXMucmVzaXplU3Vic2NyaXB0aW9uID0gdGhpcy5yZXNpemVTZXJ2aWNlLm9uUmVzaXplJFxuICAgICAgICAucGlwZShcbiAgICAgICAgICBmaWx0ZXIoKCkgPT4gdGhpcy5jYXJvdXNlbFdpbmRvd1dpZHRoICE9PSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLm93bC1jYXJvdXNlbCcpLmNsaWVudFdpZHRoKSxcbiAgICAgICAgICBkZWxheSh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5yZXNwb25zaXZlUmVmcmVzaFJhdGUpXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uub25SZXNpemUodGhpcy5lbC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vd2wtY2Fyb3VzZWwnKS5jbGllbnRXaWR0aCk7XG4gICAgICAgICAgdGhpcy5jYXJvdXNlbFdpbmRvd1dpZHRoID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vd2wtY2Fyb3VzZWwnKS5jbGllbnRXaWR0aDtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXIgZm9yIHRyYW5zaXRpb2VuZCBldmVudFxuICAgKi9cbiAgb25UcmFuc2l0aW9uRW5kKCkge1xuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm9uVHJhbnNpdGlvbkVuZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXIgZm9yIGNsaWNrIGV2ZW50LCBhdHRhY2hlZCB0byBuZXh0IGJ1dHRvblxuICAgKi9cbiAgbmV4dCgpIHtcbiAgICBpZiAoIXRoaXMuY2Fyb3VzZWxMb2FkZWQpIHJldHVybjtcbiAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLm5leHQodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MubmF2U3BlZWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXIgZm9yIGNsaWNrIGV2ZW50LCBhdHRhY2hlZCB0byBwcmV2IGJ1dHRvblxuICAgKi9cbiAgcHJldigpIHtcbiAgICBpZiAoIXRoaXMuY2Fyb3VzZWxMb2FkZWQpIHJldHVybjtcbiAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLnByZXYodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MubmF2U3BlZWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXIgZm9yIGNsaWNrIGV2ZW50LCBhdHRhY2hlZCB0byBkb3RzXG4gICAqL1xuICBtb3ZlQnlEb3QoZG90SWQ6IHN0cmluZykge1xuICAgIGlmICghdGhpcy5jYXJvdXNlbExvYWRlZCkgcmV0dXJuO1xuICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UubW92ZUJ5RG90KGRvdElkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZXdpbmRzIGNhcm91c2VsIHRvIHNsaWRlIHdpdGggbmVlZGVkIGlkXG4gICAqIEBwYXJhbSBpZCBmcmFnbWVudCBvZiB1cmxcbiAgICovXG4gIHRvKGlkOiBzdHJpbmcpIHtcbiAgICAvLyBpZiAoIXRoaXMuY2Fyb3VzZWxMb2FkZWQgfHwgKCh0aGlzLm5hdkRhdGEgJiYgdGhpcy5uYXZEYXRhLmRpc2FibGVkKSAmJiAodGhpcy5kb3RzRGF0YSAmJiB0aGlzLmRvdHNEYXRhLmRpc2FibGVkKSkpIHJldHVybjtcbiAgICBpZiAoIXRoaXMuY2Fyb3VzZWxMb2FkZWQpIHJldHVybjtcbiAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLnRvU2xpZGVCeUlkKGlkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHYXRoZXJzIGFuZCBwcmVwYXJlcyBkYXRhIGludGVuZGVkIGZvciBwYXNzaW5nIHRvIHRoZSB1c2VyIGJ5IG1lYW5zIG9mIGZpcmluZyBldmVudCB0cmFuc2xhdGVkQ2Fyb3VzZWxcbiAgICovXG4gIGdhdGhlclRyYW5zbGF0ZWREYXRhKCkge1xuICAgIGxldCBzdGFydFBvc2l0aW9uOiBudW1iZXI7XG4gICAgY29uc3QgY2xvbmVkSWRQcmVmaXggPSB0aGlzLmNhcm91c2VsU2VydmljZS5jbG9uZWRJZFByZWZpeDtcbiAgICBjb25zdCBhY3RpdmVTbGlkZXM6IFNsaWRlTW9kZWxbXSA9IHRoaXMuc2xpZGVzRGF0YVxuICAgICAgLmZpbHRlcihzbGlkZSA9PiBzbGlkZS5pc0FjdGl2ZSA9PT0gdHJ1ZSlcbiAgICAgIC5tYXAoc2xpZGUgPT4ge1xuICAgICAgICBjb25zdCBpZCA9IHNsaWRlLmlkLmluZGV4T2YoY2xvbmVkSWRQcmVmaXgpID49IDAgPyBzbGlkZS5pZC5zbGljZShjbG9uZWRJZFByZWZpeC5sZW5ndGgpIDogc2xpZGUuaWQ7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgIHdpZHRoOiBzbGlkZS53aWR0aCxcbiAgICAgICAgICBtYXJnaW5MOiBzbGlkZS5tYXJnaW5MLFxuICAgICAgICAgIG1hcmdpblI6IHNsaWRlLm1hcmdpblIsXG4gICAgICAgICAgY2VudGVyOiBzbGlkZS5pc0NlbnRlcmVkXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIHN0YXJ0UG9zaXRpb24gPSB0aGlzLmNhcm91c2VsU2VydmljZS5yZWxhdGl2ZSh0aGlzLmNhcm91c2VsU2VydmljZS5jdXJyZW50KCkpO1xuICAgIHRoaXMuc2xpZGVzT3V0cHV0RGF0YSA9IHtcbiAgICAgIHN0YXJ0UG9zaXRpb246IHN0YXJ0UG9zaXRpb24sXG4gICAgICBzbGlkZXM6IGFjdGl2ZVNsaWRlc1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydHMgcGF1c2luZ1xuICAgKi9cbiAgc3RhcnRQYXVzaW5nKCkge1xuICAgIHRoaXMuYXV0b3BsYXlTZXJ2aWNlLnN0YXJ0UGF1c2luZygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0cyBwbGF5aW5nIGFmdGVyIG1vdXNlIGxlYXZlcyBjYXJvdXNlbFxuICAgKi9cbiAgc3RhcnRQbGF5TUwoKSB7XG4gICAgdGhpcy5hdXRvcGxheVNlcnZpY2Uuc3RhcnRQbGF5aW5nTW91c2VMZWF2ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0cyBwbGF5aW5nIGFmdGVyIHRvdWNoIGVuZHNcbiAgICovXG4gIHN0YXJ0UGxheVRFKCkge1xuICAgIHRoaXMuYXV0b3BsYXlTZXJ2aWNlLnN0YXJ0UGxheWluZ1RvdWNoRW5kKCk7XG4gIH1cblxuICBzdG9wQXV0b3BsYXkoKSB7XG4gICAgdGhpcy5hdXRvcGxheVNlcnZpY2UuaXNBdXRvcGxheVN0b3BwZWQgPSB0cnVlO1xuICAgIHRoaXMuYXV0b3BsYXlTZXJ2aWNlLnN0b3AoKTtcbiAgfVxuXG4gIHN0YXJ0QXV0b3BsYXkoKSB7XG4gICAgdGhpcy5hdXRvcGxheVNlcnZpY2UuaXNBdXRvcGxheVN0b3BwZWQgPSBmYWxzZTtcbiAgICB0aGlzLmF1dG9wbGF5U2VydmljZS5wbGF5KCk7XG4gIH1cblxufVxuIl19