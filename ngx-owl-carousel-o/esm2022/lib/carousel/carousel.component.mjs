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
import * as i10 from "@angular/common";
import * as i11 from "./stage/stage.component";
export class CarouselComponent {
    el;
    resizeService;
    carouselService;
    navigationService;
    autoplayService;
    lazyLoadService;
    animateService;
    autoHeightService;
    hashService;
    logger;
    changeDetectorRef;
    slides;
    translated = new EventEmitter();
    dragging = new EventEmitter();
    change = new EventEmitter();
    changed = new EventEmitter();
    initialized = new EventEmitter();
    /**
     * Width of carousel window (tag with class .owl-carousel), in wich we can see moving sliders
     */
    carouselWindowWidth;
    /**
     * Subscription to 'resize' event
     */
    resizeSubscription;
    /**
     * Subscription merge Observable, which merges all Observables in the component except 'resize' Observable and this.slides.changes()
     */
    _allObservSubscription;
    /**
     * Subscription to `this.slides.changes().
     * It could be included in 'this._allObservSubscription', but that subcription get created during the initializing of component
     * and 'this.slides' are undefined at that moment. So it's needed to wait for initialization of content.
     */
    _slidesChangesSubscription;
    /**
     * Current settings for the carousel.
     */
    owlDOMData;
    /**
     * Data of owl-stage
     */
    stageData;
    /**
     *  Data of every slide
     */
    slidesData = [];
    /**
     * Data of navigation block
     */
    navData;
    /**
     * Data of dots block
     */
    dotsData;
    /**
     * Data, wich are passed out of carousel after ending of transioning of carousel
     */
    slidesOutputData;
    /**
     * Shows whether carousel is loaded of not.
     */
    carouselLoaded = false;
    /**
     * User's options
     */
    options;
    prevOptions;
    /**
     * Observable for getting current View Settings
     */
    _viewCurSettings$;
    /**
     * Observable for catching the end of transition of carousel
     */
    _translatedCarousel$;
    /**
     * Observable for catching the start of dragging of the carousel
     */
    _draggingCarousel$;
    /**
     * Observable for catching the start of changing of the carousel
     */
    _changeCarousel$;
    /**
     * Observable for catching the moment when the data about slides changed, more exactly when the position changed.
     */
    _changedCarousel$;
    /**
     * Observable for catching the initialization of changing the carousel
     */
    _initializedCarousel$;
    /**
     * Observable for merging all Observables and creating one subscription
     */
    _carouselMerge$;
    docRef;
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
                this.logger.log(`There are no slides to show. So the carousel won't be re-rendered`);
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
            this.carouselService.setup(this.carouselWindowWidth, slides.toArray(), this.options);
            this.carouselService.initialize(slides.toArray());
            if (!slides.toArray().length) {
                this.carouselLoaded = false;
            }
            if (slides.toArray().length && !this.resizeSubscription) {
                this._winResizeWatcher();
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: CarouselComponent, deps: [{ token: i0.ElementRef }, { token: i1.ResizeService }, { token: i2.CarouselService }, { token: i3.NavigationService }, { token: i4.AutoplayService }, { token: i5.LazyLoadService }, { token: i6.AnimateService }, { token: i7.AutoHeightService }, { token: i8.HashService }, { token: i9.OwlLogger }, { token: i0.ChangeDetectorRef }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.0.1", type: CarouselComponent, selector: "owl-carousel-o", inputs: { options: "options" }, outputs: { translated: "translated", dragging: "dragging", change: "change", changed: "changed", initialized: "initialized" }, host: { listeners: { "document:visibilitychange": "onVisibilityChange($event)" } }, providers: [
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
  `, isInline: true, styles: [".owl-theme{display:block}\n"], dependencies: [{ kind: "directive", type: i10.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i10.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i10.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i11.StageComponent, selector: "owl-stage", inputs: ["owlDraggable", "stageData", "slidesData"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: CarouselComponent, decorators: [{
            type: Component,
            args: [{ selector: 'owl-carousel-o', template: `
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
  `, providers: [
                        NavigationService,
                        AutoplayService,
                        CarouselService,
                        LazyLoadService,
                        AnimateService,
                        AutoHeightService,
                        HashService
                    ], changeDetection: ChangeDetectionStrategy.OnPush, styles: [".owl-theme{display:block}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i1.ResizeService }, { type: i2.CarouselService }, { type: i3.NavigationService }, { type: i4.AutoplayService }, { type: i5.LazyLoadService }, { type: i6.AnimateService }, { type: i7.AutoHeightService }, { type: i8.HashService }, { type: i9.OwlLogger }, { type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }], propDecorators: { slides: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGlicy9uZ3gtb3dsLWNhcm91c2VsLW8vc3JjL2xpYi9jYXJvdXNlbC9jYXJvdXNlbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFHVCxLQUFLLEVBQ0wsTUFBTSxFQUVOLGVBQWUsRUFHZixZQUFZLEVBQ1osWUFBWSxFQUNaLE1BQU0sRUFFTix1QkFBdUIsRUFFeEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUE0QixLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUdqRSxPQUFPLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRyxPQUFPLEVBQUUsZUFBZSxFQUF1QixNQUFNLDhCQUE4QixDQUFDO0FBTXBGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUV2RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDNUQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7Ozs7Ozs7Ozs7Ozs7QUErQ3BFLE1BQU0sT0FBTyxpQkFBaUI7SUFnSGxCO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUF2SFYsTUFBTSxDQUFvQztJQUVoQyxVQUFVLEdBQUcsSUFBSSxZQUFZLEVBQW9CLENBQUM7SUFDbEQsUUFBUSxHQUFHLElBQUksWUFBWSxFQUFpRCxDQUFDO0lBQzdFLE1BQU0sR0FBRyxJQUFJLFlBQVksRUFBb0IsQ0FBQztJQUM5QyxPQUFPLEdBQUcsSUFBSSxZQUFZLEVBQW9CLENBQUM7SUFDL0MsV0FBVyxHQUFHLElBQUksWUFBWSxFQUFvQixDQUFDO0lBRTdEOztPQUVHO0lBQ0gsbUJBQW1CLENBQVM7SUFFNUI7O09BRUc7SUFDSCxrQkFBa0IsQ0FBZTtJQUVqQzs7T0FFRztJQUNLLHNCQUFzQixDQUFlO0lBRTdDOzs7O09BSUc7SUFDSywwQkFBMEIsQ0FBZTtJQUVqRDs7T0FFRztJQUNILFVBQVUsQ0FBYTtJQUV2Qjs7T0FFRztJQUNILFNBQVMsQ0FBWTtJQUVyQjs7T0FFRztJQUNILFVBQVUsR0FBaUIsRUFBRSxDQUFDO0lBRTlCOztPQUVHO0lBQ0gsT0FBTyxDQUFVO0lBRWpCOztPQUVHO0lBQ0gsUUFBUSxDQUFXO0lBRW5COztPQUVHO0lBQ0gsZ0JBQWdCLENBQW1CO0lBRW5DOztPQUVHO0lBQ0gsY0FBYyxHQUFHLEtBQUssQ0FBQztJQUV2Qjs7T0FFRztJQUNNLE9BQU8sQ0FBYTtJQUU3QixXQUFXLENBQWE7SUFFeEI7O09BRUc7SUFDSyxpQkFBaUIsQ0FBa0M7SUFFM0Q7O09BRUc7SUFDSyxvQkFBb0IsQ0FBcUI7SUFFakQ7O09BRUc7SUFDSyxrQkFBa0IsQ0FBcUI7SUFFL0M7O09BRUc7SUFDSyxnQkFBZ0IsQ0FBcUI7SUFFN0M7O09BRUc7SUFDSyxpQkFBaUIsQ0FBa0I7SUFFM0M7O09BRUc7SUFDSyxxQkFBcUIsQ0FBcUI7SUFFbEQ7O09BRUc7SUFDSyxlQUFlLENBQTJDO0lBQzFELE1BQU0sQ0FBVztJQUV6QixZQUNVLEVBQWMsRUFDZCxhQUE0QixFQUM1QixlQUFnQyxFQUNoQyxpQkFBb0MsRUFDcEMsZUFBZ0MsRUFDaEMsZUFBZ0MsRUFDaEMsY0FBOEIsRUFDOUIsaUJBQW9DLEVBQ3BDLFdBQXdCLEVBQ3hCLE1BQWlCLEVBQ2pCLGlCQUFvQyxFQUMxQixNQUFXO1FBWHJCLE9BQUUsR0FBRixFQUFFLENBQVk7UUFDZCxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLFdBQU0sR0FBTixNQUFNLENBQVc7UUFDakIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUc1QyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQWtCLENBQUM7SUFFbkMsQ0FBQztJQUdELGtCQUFrQixDQUFDLEVBQU87UUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLFFBQVE7WUFBRSxPQUFPO1FBQ3BELFFBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUNwQyxLQUFLLFNBQVM7Z0JBQ1osQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQixJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ3ZFLE1BQU07WUFFUixLQUFLLFFBQVE7Z0JBQ1gsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDN0IsTUFBTTtZQUVSO2dCQUNFLE1BQU07UUFDVixDQUFDO0lBQ0gsQ0FBQztJQUFBLENBQUM7SUFHRixRQUFRO1FBQ04sSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXRCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQzVELGVBQWUsQ0FDaEIsQ0FBQyxXQUFXLENBQUM7SUFDaEIsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3RDLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUN0RCxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzFGLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUN6RCxDQUFDO2lCQUFNLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQzlELElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO2dCQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxtRUFBbUUsQ0FBQyxDQUFDO1lBQ3ZGLENBQUM7aUJBQU0sQ0FBQztnQkFDTixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztZQUM5QixDQUFDO1lBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ2xDLENBQUM7SUFDSCxDQUFDO0lBRUQsa0JBQWtCO1FBQ2hCLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNqQyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDMUYsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBRXZELElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQzNCLENBQUM7YUFBTSxDQUFDO1lBQ04sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0VBQWdFLENBQUMsQ0FBQztRQUNwRixDQUFDO1FBRUQsSUFBSSxDQUFDLDBCQUEwQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDeEQsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDYixJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNyRixJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUM3QixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztZQUM5QixDQUFDO1lBRUQsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7Z0JBQ3hELElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQzNCLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUV6QixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7WUFDNUIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3hDLENBQUM7UUFFRCxJQUFJLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO1lBQ3BDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNoRCxDQUFDO1FBRUQsSUFBSSxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztZQUNoQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDNUMsQ0FBQztJQUNILENBQUM7SUFFRDs7O09BR0c7SUFDSCxjQUFjO1FBQ1osSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxJQUFJLENBQ3JFLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNULElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUNsQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDaEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1lBQzdCLENBQUM7WUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQzlCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4QyxDQUFDLENBQUMsQ0FDSCxDQUFDO1FBRUYsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxJQUFJLENBQzFFLEdBQUcsQ0FBQyxHQUFHLEVBQUU7WUFDUCxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUM3Qyw4QkFBOEI7UUFDaEMsQ0FBQyxDQUFDLENBQ0gsQ0FBQTtRQUVELElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQixFQUFFLENBQUMsSUFBSSxDQUN4RSxHQUFHLENBQUMsR0FBRyxFQUFFO1lBQ1AsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7WUFDNUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDNUMsOEJBQThCO1FBQ2hDLENBQUMsQ0FBQyxDQUNILENBQUM7UUFFRixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxJQUFJLENBQ2hFLEdBQUcsQ0FBQyxHQUFHLEVBQUU7WUFDUCxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUN4Qyw4QkFBOEI7UUFDaEMsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUVGLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsRUFBRSxDQUFDLElBQUksQ0FDakUsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2hCLE1BQU0sZUFBZSxHQUFpQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUNsRSxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssVUFBVSxDQUFDLEVBQ2hELFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQ3RDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQ3pDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDVixNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQztnQkFDM0QsTUFBTSxFQUFFLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7Z0JBQ3BHLE9BQU8sRUFBRSxHQUFHLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztZQUM5QyxDQUFDLENBQUMsRUFDRixPQUFPLEVBQUUsRUFDVCxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ1gsT0FBTztvQkFDTCxNQUFNLEVBQUUsTUFBTTtvQkFDZCxhQUFhLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7aUJBQ25FLENBQUE7WUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO1lBRUYsdUVBQXVFO1lBQ3ZFLHNEQUFzRDtZQUN0RCxnQkFBZ0I7WUFDaEIsZUFBZTtZQUNmLG9CQUFvQjtZQUNwQiwyRUFBMkU7WUFDM0UsUUFBUTtZQUNSLE9BQU87WUFDUCxJQUFJO1lBQ0osT0FBTyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDaEMsQ0FBQyxDQUFDLEVBQ0YsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ2YsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7WUFDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDakYsc0NBQXNDO1lBQ3RDLDhCQUE4QjtRQUNoQyxDQUFDLENBQUMsQ0FDSCxDQUFDO1FBRUYsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUNoRSxHQUFHLENBQUMsR0FBRyxFQUFFO1lBQ1AsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7WUFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO1FBQ3RFLENBQUMsQ0FBQyxFQUNGLFNBQVMsQ0FDUCxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsRUFBRSxDQUFDLElBQUksQ0FDL0MsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUNsRCxDQUNGLEVBQ0QsU0FBUyxDQUNQLElBQUksQ0FBQyxFQUFFO1lBQ0wsSUFBSSxJQUFJLEVBQUUsQ0FBQztnQkFDVCxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxJQUFJLENBQ25ELEtBQUssRUFBRSxDQUNSLENBQUM7WUFDSixDQUFDO2lCQUFNLENBQUM7Z0JBQ04sT0FBTyxFQUFFLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDN0IsQ0FBQztRQUNILENBQUMsQ0FDRixFQUNELEdBQUcsQ0FBQyxHQUFHLEVBQUU7WUFDUCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7UUFDdkUsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUVGLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUMxQixJQUFJLENBQUMsaUJBQWlCLEVBQ3RCLElBQUksQ0FBQyxvQkFBb0IsRUFDekIsSUFBSSxDQUFDLGtCQUFrQixFQUN2QixJQUFJLENBQUMsZ0JBQWdCLEVBQ3JCLElBQUksQ0FBQyxpQkFBaUIsRUFDdEIsSUFBSSxDQUFDLHFCQUFxQixDQUMzQixDQUFDO1FBQ0YsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFRDs7T0FFRztJQUNLLGlCQUFpQjtRQUN2QixJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDakUsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUztpQkFDbkQsSUFBSSxDQUNILE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxFQUMzRyxLQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMscUJBQXFCLENBQUMsQ0FDM0Q7aUJBQ0EsU0FBUyxDQUFDLEdBQUcsRUFBRTtnQkFDZCxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ2hHLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUMsV0FBVyxDQUFDO1lBQzlGLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztJQUNILENBQUM7SUFFRDs7T0FFRztJQUNILGVBQWU7UUFDYixJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFRDs7T0FFRztJQUNILElBQUk7UUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWM7WUFBRSxPQUFPO1FBQ2pDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBSTtRQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYztZQUFFLE9BQU87UUFDakMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRUQ7O09BRUc7SUFDSCxTQUFTLENBQUMsS0FBYTtRQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWM7WUFBRSxPQUFPO1FBQ2pDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVEOzs7T0FHRztJQUNILEVBQUUsQ0FBQyxFQUFVO1FBQ1gsOEhBQThIO1FBQzlILElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYztZQUFFLE9BQU87UUFDakMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxvQkFBb0I7UUFDbEIsSUFBSSxhQUFxQixDQUFDO1FBQzFCLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDO1FBQzNELE1BQU0sWUFBWSxHQUFpQixJQUFJLENBQUMsVUFBVTthQUMvQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQzthQUN4QyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDWCxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUNwRyxPQUFPO2dCQUNMLEVBQUUsRUFBRSxFQUFFO2dCQUNOLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSztnQkFDbEIsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPO2dCQUN0QixPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU87Z0JBQ3RCLE1BQU0sRUFBRSxLQUFLLENBQUMsVUFBVTthQUN6QixDQUFBO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDTCxhQUFhLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQzlFLElBQUksQ0FBQyxnQkFBZ0IsR0FBRztZQUN0QixhQUFhLEVBQUUsYUFBYTtZQUM1QixNQUFNLEVBQUUsWUFBWTtTQUNyQixDQUFBO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0gsWUFBWTtRQUNWLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsV0FBVztRQUNULElBQUksQ0FBQyxlQUFlLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztJQUNoRCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0lBQzlDLENBQUM7SUFFRCxZQUFZO1FBQ1YsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDOUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRUQsYUFBYTtRQUNYLElBQUksQ0FBQyxlQUFlLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO1FBQy9DLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDOUIsQ0FBQzt1R0ExYlUsaUJBQWlCLDJWQTJIbEIsUUFBUTsyRkEzSFAsaUJBQWlCLDRSQVhqQjtZQUNULGlCQUFpQjtZQUNqQixlQUFlO1lBQ2YsZUFBZTtZQUNmLGVBQWU7WUFDZixjQUFjO1lBQ2QsaUJBQWlCO1lBQ2pCLFdBQVc7U0FDWixpREFLZ0Isc0JBQXNCLGtEQTVDN0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkJUOzsyRkFhVSxpQkFBaUI7a0JBNUM3QixTQUFTOytCQUNFLGdCQUFnQixZQUNoQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2QlQsYUFFVTt3QkFDVCxpQkFBaUI7d0JBQ2pCLGVBQWU7d0JBQ2YsZUFBZTt3QkFDZixlQUFlO3dCQUNmLGNBQWM7d0JBQ2QsaUJBQWlCO3dCQUNqQixXQUFXO3FCQUNaLG1CQUNnQix1QkFBdUIsQ0FBQyxNQUFNOzswQkE2SDVDLE1BQU07MkJBQUMsUUFBUTt5Q0F4SGxCLE1BQU07c0JBREwsZUFBZTt1QkFBQyxzQkFBc0I7Z0JBRzdCLFVBQVU7c0JBQW5CLE1BQU07Z0JBQ0csUUFBUTtzQkFBakIsTUFBTTtnQkFDRyxNQUFNO3NCQUFmLE1BQU07Z0JBQ0csT0FBTztzQkFBaEIsTUFBTTtnQkFDRyxXQUFXO3NCQUFwQixNQUFNO2dCQThERSxPQUFPO3NCQUFmLEtBQUs7Z0JBMkROLGtCQUFrQjtzQkFEakIsWUFBWTt1QkFBQywyQkFBMkIsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgT25Jbml0LFxuICBPbkRlc3Ryb3ksXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBFbGVtZW50UmVmLFxuICBBZnRlckNvbnRlbnRJbml0LFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5qZWN0LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIE9uQ2hhbmdlc1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBPYnNlcnZhYmxlLCBtZXJnZSwgb2YsIGZyb20gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgUmVzaXplU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3Jlc2l6ZS5zZXJ2aWNlJztcbmltcG9ydCB7IHRhcCwgZGVsYXksIGZpbHRlciwgc3dpdGNoTWFwLCBmaXJzdCwgbWFwLCBza2lwLCB0YWtlLCB0b0FycmF5IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ2Fyb3VzZWxTZXJ2aWNlLCBDYXJvdXNlbEN1cnJlbnREYXRhIH0gZnJvbSAnLi4vc2VydmljZXMvY2Fyb3VzZWwuc2VydmljZSc7XG5pbXBvcnQgeyBTdGFnZURhdGEgfSBmcm9tIFwiLi4vbW9kZWxzL3N0YWdlLWRhdGEubW9kZWxcIjtcbmltcG9ydCB7IE93bERPTURhdGEgfSBmcm9tIFwiLi4vbW9kZWxzL293bERPTS1kYXRhLm1vZGVsXCI7XG5pbXBvcnQgeyBTbGlkZU1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL3NsaWRlLm1vZGVsJztcbmltcG9ydCB7IE93bE9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbHMvb3dsLW9wdGlvbnMubW9kZWwnO1xuaW1wb3J0IHsgTmF2RGF0YSwgRG90c0RhdGEgfSBmcm9tICcuLi9tb2RlbHMvbmF2aWdhdGlvbi1kYXRhLm1vZGVscyc7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25hdmlnYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBBdXRvcGxheVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9hdXRvcGxheS5zZXJ2aWNlJztcbmltcG9ydCB7IExhenlMb2FkU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2xhenlsb2FkLnNlcnZpY2UnO1xuaW1wb3J0IHsgQW5pbWF0ZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9hbmltYXRlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0b0hlaWdodFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9hdXRvaGVpZ2h0LnNlcnZpY2UnO1xuaW1wb3J0IHsgSGFzaFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9oYXNoLnNlcnZpY2UnO1xuaW1wb3J0IHsgT3dsTG9nZ2VyIH0gZnJvbSAnLi4vc2VydmljZXMvbG9nZ2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICcuLi9zZXJ2aWNlcy9kb2N1bWVudC1yZWYuc2VydmljZSc7XG5pbXBvcnQgeyBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlIH0gZnJvbSAnLi9jYXJvdXNlbC1zbGlkZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgU2xpZGVzT3V0cHV0RGF0YSB9IGZyb20gJy4uL21vZGVscy9TbGlkZXNPdXRwdXREYXRhJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnb3dsLWNhcm91c2VsLW8nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJvd2wtY2Fyb3VzZWwgb3dsLXRoZW1lXCIgI293bENhcm91c2VsXG4gICAgICBbbmdDbGFzc109XCJ7J293bC1ydGwnOiBvd2xET01EYXRhPy5ydGwsXG4gICAgICAgICAgICAgICAgICAnb3dsLWxvYWRlZCc6IG93bERPTURhdGE/LmlzTG9hZGVkLFxuICAgICAgICAgICAgICAgICAgJ293bC1yZXNwb25zaXZlJzogb3dsRE9NRGF0YT8uaXNSZXNwb25zaXZlLFxuICAgICAgICAgICAgICAgICAgJ293bC1kcmFnJzogb3dsRE9NRGF0YT8uaXNNb3VzZURyYWdhYmxlLFxuICAgICAgICAgICAgICAgICAgJ293bC1ncmFiJzogb3dsRE9NRGF0YT8uaXNHcmFifVwiXG4gICAgICAobW91c2VvdmVyKT1cInN0YXJ0UGF1c2luZygpXCJcbiAgICAgIChtb3VzZWxlYXZlKT1cInN0YXJ0UGxheU1MKClcIlxuICAgICAgKHRvdWNoc3RhcnQpPVwic3RhcnRQYXVzaW5nKClcIlxuICAgICAgKHRvdWNoZW5kKT1cInN0YXJ0UGxheVRFKClcIj5cblxuICAgICAgPGRpdiAqbmdJZj1cImNhcm91c2VsTG9hZGVkXCIgY2xhc3M9XCJvd2wtc3RhZ2Utb3V0ZXJcIj5cbiAgICAgICAgPG93bC1zdGFnZSBbb3dsRHJhZ2dhYmxlXT1cInsnaXNNb3VzZURyYWdhYmxlJzogb3dsRE9NRGF0YT8uaXNNb3VzZURyYWdhYmxlLCAnaXNUb3VjaERyYWdhYmxlJzogb3dsRE9NRGF0YT8uaXNUb3VjaERyYWdhYmxlfVwiXG4gICAgICAgICAgICAgICAgICAgIFtzdGFnZURhdGFdPVwic3RhZ2VEYXRhXCJcbiAgICAgICAgICAgICAgICAgICAgW3NsaWRlc0RhdGFdPVwic2xpZGVzRGF0YVwiPjwvb3dsLXN0YWdlPlxuICAgICAgPC9kaXY+IDwhLS0gLy5vd2wtc3RhZ2Utb3V0ZXIgLS0+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwic2xpZGVzLnRvQXJyYXkoKS5sZW5ndGhcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm93bC1uYXZcIiBbbmdDbGFzc109XCJ7J2Rpc2FibGVkJzogbmF2RGF0YT8uZGlzYWJsZWR9XCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm93bC1wcmV2XCIgW25nQ2xhc3NdPVwieydkaXNhYmxlZCc6IG5hdkRhdGE/LnByZXY/LmRpc2FibGVkfVwiIChjbGljayk9XCJwcmV2KClcIiBbaW5uZXJIVE1MXT1cIm5hdkRhdGE/LnByZXY/Lmh0bWxUZXh0XCI+PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm93bC1uZXh0XCIgW25nQ2xhc3NdPVwieydkaXNhYmxlZCc6IG5hdkRhdGE/Lm5leHQ/LmRpc2FibGVkfVwiIChjbGljayk9XCJuZXh0KClcIiBbaW5uZXJIVE1MXT1cIm5hdkRhdGE/Lm5leHQ/Lmh0bWxUZXh0XCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PiA8IS0tIC8ub3dsLW5hdiAtLT5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm93bC1kb3RzXCIgW25nQ2xhc3NdPVwieydkaXNhYmxlZCc6IGRvdHNEYXRhPy5kaXNhYmxlZH1cIj5cbiAgICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBkb3Qgb2YgZG90c0RhdGE/LmRvdHNcIiBjbGFzcz1cIm93bC1kb3RcIiBbbmdDbGFzc109XCJ7J2FjdGl2ZSc6IGRvdC5hY3RpdmUsICdvd2wtZG90LXRleHQnOiBkb3Quc2hvd0lubmVyQ29udGVudH1cIiAoY2xpY2spPVwibW92ZUJ5RG90KGRvdC5pZClcIj5cbiAgICAgICAgICAgIDxzcGFuIFtpbm5lckhUTUxdPVwiZG90LmlubmVyQ29udGVudFwiPjwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+IDwhLS0gLy5vd2wtZG90cyAtLT5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvZGl2PiA8IS0tIC8ub3dsLWNhcm91c2VsIG93bC1sb2FkZWQgLS0+XG4gIGAsXG4gIHN0eWxlczogW2Aub3dsLXRoZW1lIHsgZGlzcGxheTogYmxvY2s7IH1gXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgTmF2aWdhdGlvblNlcnZpY2UsXG4gICAgQXV0b3BsYXlTZXJ2aWNlLFxuICAgIENhcm91c2VsU2VydmljZSxcbiAgICBMYXp5TG9hZFNlcnZpY2UsXG4gICAgQW5pbWF0ZVNlcnZpY2UsXG4gICAgQXV0b0hlaWdodFNlcnZpY2UsXG4gICAgSGFzaFNlcnZpY2VcbiAgXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQ2Fyb3VzZWxDb21wb25lbnRcbiAgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcbiAgQENvbnRlbnRDaGlsZHJlbihDYXJvdXNlbFNsaWRlRGlyZWN0aXZlKVxuICBzbGlkZXM6IFF1ZXJ5TGlzdDxDYXJvdXNlbFNsaWRlRGlyZWN0aXZlPjtcblxuICBAT3V0cHV0KCkgdHJhbnNsYXRlZCA9IG5ldyBFdmVudEVtaXR0ZXI8U2xpZGVzT3V0cHV0RGF0YT4oKTtcbiAgQE91dHB1dCgpIGRyYWdnaW5nID0gbmV3IEV2ZW50RW1pdHRlcjx7IGRyYWdnaW5nOiBib29sZWFuLCBkYXRhOiBTbGlkZXNPdXRwdXREYXRhIH0+KCk7XG4gIEBPdXRwdXQoKSBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFNsaWRlc091dHB1dERhdGE+KCk7XG4gIEBPdXRwdXQoKSBjaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxTbGlkZXNPdXRwdXREYXRhPigpO1xuICBAT3V0cHV0KCkgaW5pdGlhbGl6ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFNsaWRlc091dHB1dERhdGE+KCk7XG5cbiAgLyoqXG4gICAqIFdpZHRoIG9mIGNhcm91c2VsIHdpbmRvdyAodGFnIHdpdGggY2xhc3MgLm93bC1jYXJvdXNlbCksIGluIHdpY2ggd2UgY2FuIHNlZSBtb3Zpbmcgc2xpZGVyc1xuICAgKi9cbiAgY2Fyb3VzZWxXaW5kb3dXaWR0aDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBTdWJzY3JpcHRpb24gdG8gJ3Jlc2l6ZScgZXZlbnRcbiAgICovXG4gIHJlc2l6ZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qKlxuICAgKiBTdWJzY3JpcHRpb24gbWVyZ2UgT2JzZXJ2YWJsZSwgd2hpY2ggbWVyZ2VzIGFsbCBPYnNlcnZhYmxlcyBpbiB0aGUgY29tcG9uZW50IGV4Y2VwdCAncmVzaXplJyBPYnNlcnZhYmxlIGFuZCB0aGlzLnNsaWRlcy5jaGFuZ2VzKClcbiAgICovXG4gIHByaXZhdGUgX2FsbE9ic2VydlN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qKlxuICAgKiBTdWJzY3JpcHRpb24gdG8gYHRoaXMuc2xpZGVzLmNoYW5nZXMoKS5cbiAgICogSXQgY291bGQgYmUgaW5jbHVkZWQgaW4gJ3RoaXMuX2FsbE9ic2VydlN1YnNjcmlwdGlvbicsIGJ1dCB0aGF0IHN1YmNyaXB0aW9uIGdldCBjcmVhdGVkIGR1cmluZyB0aGUgaW5pdGlhbGl6aW5nIG9mIGNvbXBvbmVudFxuICAgKiBhbmQgJ3RoaXMuc2xpZGVzJyBhcmUgdW5kZWZpbmVkIGF0IHRoYXQgbW9tZW50LiBTbyBpdCdzIG5lZWRlZCB0byB3YWl0IGZvciBpbml0aWFsaXphdGlvbiBvZiBjb250ZW50LlxuICAgKi9cbiAgcHJpdmF0ZSBfc2xpZGVzQ2hhbmdlc1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qKlxuICAgKiBDdXJyZW50IHNldHRpbmdzIGZvciB0aGUgY2Fyb3VzZWwuXG4gICAqL1xuICBvd2xET01EYXRhOiBPd2xET01EYXRhO1xuXG4gIC8qKlxuICAgKiBEYXRhIG9mIG93bC1zdGFnZVxuICAgKi9cbiAgc3RhZ2VEYXRhOiBTdGFnZURhdGE7XG5cbiAgLyoqXG4gICAqICBEYXRhIG9mIGV2ZXJ5IHNsaWRlXG4gICAqL1xuICBzbGlkZXNEYXRhOiBTbGlkZU1vZGVsW10gPSBbXTtcblxuICAvKipcbiAgICogRGF0YSBvZiBuYXZpZ2F0aW9uIGJsb2NrXG4gICAqL1xuICBuYXZEYXRhOiBOYXZEYXRhO1xuXG4gIC8qKlxuICAgKiBEYXRhIG9mIGRvdHMgYmxvY2tcbiAgICovXG4gIGRvdHNEYXRhOiBEb3RzRGF0YTtcblxuICAvKipcbiAgICogRGF0YSwgd2ljaCBhcmUgcGFzc2VkIG91dCBvZiBjYXJvdXNlbCBhZnRlciBlbmRpbmcgb2YgdHJhbnNpb25pbmcgb2YgY2Fyb3VzZWxcbiAgICovXG4gIHNsaWRlc091dHB1dERhdGE6IFNsaWRlc091dHB1dERhdGE7XG5cbiAgLyoqXG4gICAqIFNob3dzIHdoZXRoZXIgY2Fyb3VzZWwgaXMgbG9hZGVkIG9mIG5vdC5cbiAgICovXG4gIGNhcm91c2VsTG9hZGVkID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFVzZXIncyBvcHRpb25zXG4gICAqL1xuICBASW5wdXQoKSBvcHRpb25zOiBPd2xPcHRpb25zO1xuXG4gIHByZXZPcHRpb25zOiBPd2xPcHRpb25zO1xuXG4gIC8qKlxuICAgKiBPYnNlcnZhYmxlIGZvciBnZXR0aW5nIGN1cnJlbnQgVmlldyBTZXR0aW5nc1xuICAgKi9cbiAgcHJpdmF0ZSBfdmlld0N1clNldHRpbmdzJDogT2JzZXJ2YWJsZTxDYXJvdXNlbEN1cnJlbnREYXRhPjtcblxuICAvKipcbiAgICogT2JzZXJ2YWJsZSBmb3IgY2F0Y2hpbmcgdGhlIGVuZCBvZiB0cmFuc2l0aW9uIG9mIGNhcm91c2VsXG4gICAqL1xuICBwcml2YXRlIF90cmFuc2xhdGVkQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz47XG5cbiAgLyoqXG4gICAqIE9ic2VydmFibGUgZm9yIGNhdGNoaW5nIHRoZSBzdGFydCBvZiBkcmFnZ2luZyBvZiB0aGUgY2Fyb3VzZWxcbiAgICovXG4gIHByaXZhdGUgX2RyYWdnaW5nQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz47XG5cbiAgLyoqXG4gICAqIE9ic2VydmFibGUgZm9yIGNhdGNoaW5nIHRoZSBzdGFydCBvZiBjaGFuZ2luZyBvZiB0aGUgY2Fyb3VzZWxcbiAgICovXG4gIHByaXZhdGUgX2NoYW5nZUNhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+O1xuXG4gIC8qKlxuICAgKiBPYnNlcnZhYmxlIGZvciBjYXRjaGluZyB0aGUgbW9tZW50IHdoZW4gdGhlIGRhdGEgYWJvdXQgc2xpZGVzIGNoYW5nZWQsIG1vcmUgZXhhY3RseSB3aGVuIHRoZSBwb3NpdGlvbiBjaGFuZ2VkLlxuICAgKi9cbiAgcHJpdmF0ZSBfY2hhbmdlZENhcm91c2VsJDogT2JzZXJ2YWJsZTxhbnk+O1xuXG4gIC8qKlxuICAgKiBPYnNlcnZhYmxlIGZvciBjYXRjaGluZyB0aGUgaW5pdGlhbGl6YXRpb24gb2YgY2hhbmdpbmcgdGhlIGNhcm91c2VsXG4gICAqL1xuICBwcml2YXRlIF9pbml0aWFsaXplZENhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+O1xuXG4gIC8qKlxuICAgKiBPYnNlcnZhYmxlIGZvciBtZXJnaW5nIGFsbCBPYnNlcnZhYmxlcyBhbmQgY3JlYXRpbmcgb25lIHN1YnNjcmlwdGlvblxuICAgKi9cbiAgcHJpdmF0ZSBfY2Fyb3VzZWxNZXJnZSQ6IE9ic2VydmFibGU8Q2Fyb3VzZWxDdXJyZW50RGF0YSB8IHN0cmluZz47XG4gIHByaXZhdGUgZG9jUmVmOiBEb2N1bWVudDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgcmVzaXplU2VydmljZTogUmVzaXplU2VydmljZSxcbiAgICBwcml2YXRlIGNhcm91c2VsU2VydmljZTogQ2Fyb3VzZWxTZXJ2aWNlLFxuICAgIHByaXZhdGUgbmF2aWdhdGlvblNlcnZpY2U6IE5hdmlnYXRpb25TZXJ2aWNlLFxuICAgIHByaXZhdGUgYXV0b3BsYXlTZXJ2aWNlOiBBdXRvcGxheVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBsYXp5TG9hZFNlcnZpY2U6IExhenlMb2FkU2VydmljZSxcbiAgICBwcml2YXRlIGFuaW1hdGVTZXJ2aWNlOiBBbmltYXRlU2VydmljZSxcbiAgICBwcml2YXRlIGF1dG9IZWlnaHRTZXJ2aWNlOiBBdXRvSGVpZ2h0U2VydmljZSxcbiAgICBwcml2YXRlIGhhc2hTZXJ2aWNlOiBIYXNoU2VydmljZSxcbiAgICBwcml2YXRlIGxvZ2dlcjogT3dsTG9nZ2VyLFxuICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIGRvY1JlZjogYW55XG4gICkge1xuICAgIHRoaXMuZG9jUmVmID0gZG9jUmVmIGFzIERvY3VtZW50O1xuXG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDp2aXNpYmlsaXR5Y2hhbmdlJywgWyckZXZlbnQnXSlcbiAgb25WaXNpYmlsaXR5Q2hhbmdlKGV2OiBhbnkpIHtcbiAgICBpZiAoIXRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9wbGF5KSByZXR1cm47XG4gICAgc3dpdGNoICh0aGlzLmRvY1JlZi52aXNpYmlsaXR5U3RhdGUpIHtcbiAgICAgIGNhc2UgJ3Zpc2libGUnOlxuICAgICAgICAhdGhpcy5hdXRvcGxheVNlcnZpY2UuaXNBdXRvcGxheVN0b3BwZWQgJiYgdGhpcy5hdXRvcGxheVNlcnZpY2UucGxheSgpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnaGlkZGVuJzpcbiAgICAgICAgdGhpcy5hdXRvcGxheVNlcnZpY2UucGF1c2UoKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfTtcblxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc3B5RGF0YVN0cmVhbXMoKTtcblxuICAgIHRoaXMuY2Fyb3VzZWxXaW5kb3dXaWR0aCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgJy5vd2wtY2Fyb3VzZWwnXG4gICAgKS5jbGllbnRXaWR0aDtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIGlmICh0aGlzLnByZXZPcHRpb25zICE9PSB0aGlzLm9wdGlvbnMpIHtcbiAgICAgIGlmICh0aGlzLnByZXZPcHRpb25zICYmIHRoaXMuc2xpZGVzPy50b0FycmF5KCkubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHVwKHRoaXMuY2Fyb3VzZWxXaW5kb3dXaWR0aCwgdGhpcy5zbGlkZXMudG9BcnJheSgpLCB0aGlzLm9wdGlvbnMpO1xuICAgICAgICB0aGlzLmNhcm91c2VsU2VydmljZS5pbml0aWFsaXplKHRoaXMuc2xpZGVzLnRvQXJyYXkoKSk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMucHJldk9wdGlvbnMgJiYgIXRoaXMuc2xpZGVzPy50b0FycmF5KCkubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuY2Fyb3VzZWxMb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5sb2dnZXIubG9nKGBUaGVyZSBhcmUgbm8gc2xpZGVzIHRvIHNob3cuIFNvIHRoZSBjYXJvdXNlbCB3b24ndCBiZSByZS1yZW5kZXJlZGApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jYXJvdXNlbExvYWRlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgdGhpcy5wcmV2T3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgaWYgKHRoaXMuc2xpZGVzLnRvQXJyYXkoKS5sZW5ndGgpIHtcbiAgICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHVwKHRoaXMuY2Fyb3VzZWxXaW5kb3dXaWR0aCwgdGhpcy5zbGlkZXMudG9BcnJheSgpLCB0aGlzLm9wdGlvbnMpO1xuICAgICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UuaW5pdGlhbGl6ZSh0aGlzLnNsaWRlcy50b0FycmF5KCkpO1xuXG4gICAgICB0aGlzLl93aW5SZXNpemVXYXRjaGVyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubG9nZ2VyLmxvZyhgVGhlcmUgYXJlIG5vIHNsaWRlcyB0byBzaG93LiBTbyB0aGUgY2Fyb3VzZWwgd29uJ3QgYmUgcmVuZGVyZWRgKTtcbiAgICB9XG5cbiAgICB0aGlzLl9zbGlkZXNDaGFuZ2VzU3Vic2NyaXB0aW9uID0gdGhpcy5zbGlkZXMuY2hhbmdlcy5waXBlKFxuICAgICAgdGFwKChzbGlkZXMpID0+IHtcbiAgICAgICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dXAodGhpcy5jYXJvdXNlbFdpbmRvd1dpZHRoLCBzbGlkZXMudG9BcnJheSgpLCB0aGlzLm9wdGlvbnMpO1xuICAgICAgICB0aGlzLmNhcm91c2VsU2VydmljZS5pbml0aWFsaXplKHNsaWRlcy50b0FycmF5KCkpO1xuICAgICAgICBpZiAoIXNsaWRlcy50b0FycmF5KCkubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5jYXJvdXNlbExvYWRlZCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNsaWRlcy50b0FycmF5KCkubGVuZ3RoICYmICF0aGlzLnJlc2l6ZVN1YnNjcmlwdGlvbikge1xuICAgICAgICAgIHRoaXMuX3dpblJlc2l6ZVdhdGNoZXIoKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApLnN1YnNjcmliZSgoKSA9PiB7IH0pO1xuXG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5yZXNpemVTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMucmVzaXplU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3NsaWRlc0NoYW5nZXNTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuX3NsaWRlc0NoYW5nZXNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fYWxsT2JzZXJ2U3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLl9hbGxPYnNlcnZTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSm9pbnMgdGhlIG9ic2VydmFibGUgbG9naW4gaW4gb25lIHBsYWNlOiBzZXRzIHZhbHVlcyB0byBzb21lIG9ic2VydmFibGVzLCBtZXJnZXMgdGhpcyBvYnNlcnZhYmxlcyBhbmRcbiAgICogc3ViY3JpYmVzIHRvIG1lcmdlIGZ1bmNcbiAgICovXG4gIHNweURhdGFTdHJlYW1zKCkge1xuICAgIHRoaXMuX3ZpZXdDdXJTZXR0aW5ncyQgPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRWaWV3Q3VyU2V0dGluZ3MoKS5waXBlKFxuICAgICAgdGFwKGRhdGEgPT4ge1xuICAgICAgICB0aGlzLm93bERPTURhdGEgPSBkYXRhLm93bERPTURhdGE7XG4gICAgICAgIHRoaXMuc3RhZ2VEYXRhID0gZGF0YS5zdGFnZURhdGE7XG4gICAgICAgIHRoaXMuc2xpZGVzRGF0YSA9IGRhdGEuc2xpZGVzRGF0YTtcbiAgICAgICAgaWYgKCF0aGlzLmNhcm91c2VsTG9hZGVkKSB7XG4gICAgICAgICAgdGhpcy5jYXJvdXNlbExvYWRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5uYXZEYXRhID0gZGF0YS5uYXZEYXRhO1xuICAgICAgICB0aGlzLmRvdHNEYXRhID0gZGF0YS5kb3RzRGF0YTtcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMuX2luaXRpYWxpemVkQ2Fyb3VzZWwkID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0SW5pdGlhbGl6ZWRTdGF0ZSgpLnBpcGUoXG4gICAgICB0YXAoKCkgPT4ge1xuICAgICAgICB0aGlzLmdhdGhlclRyYW5zbGF0ZWREYXRhKCk7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQuZW1pdCh0aGlzLnNsaWRlc091dHB1dERhdGEpO1xuICAgICAgICAvLyB0aGlzLnNsaWRlc091dHB1dERhdGEgPSB7fTtcbiAgICAgIH0pXG4gICAgKVxuXG4gICAgdGhpcy5fdHJhbnNsYXRlZENhcm91c2VsJCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldFRyYW5zbGF0ZWRTdGF0ZSgpLnBpcGUoXG4gICAgICB0YXAoKCkgPT4ge1xuICAgICAgICB0aGlzLmdhdGhlclRyYW5zbGF0ZWREYXRhKCk7XG4gICAgICAgIHRoaXMudHJhbnNsYXRlZC5lbWl0KHRoaXMuc2xpZGVzT3V0cHV0RGF0YSk7XG4gICAgICAgIC8vIHRoaXMuc2xpZGVzT3V0cHV0RGF0YSA9IHt9O1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgdGhpcy5fY2hhbmdlQ2Fyb3VzZWwkID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0Q2hhbmdlU3RhdGUoKS5waXBlKFxuICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgdGhpcy5nYXRoZXJUcmFuc2xhdGVkRGF0YSgpO1xuICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMuc2xpZGVzT3V0cHV0RGF0YSk7XG4gICAgICAgIC8vIHRoaXMuc2xpZGVzT3V0cHV0RGF0YSA9IHt9O1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgdGhpcy5fY2hhbmdlZENhcm91c2VsJCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldENoYW5nZVN0YXRlKCkucGlwZShcbiAgICAgIHN3aXRjaE1hcCh2YWx1ZSA9PiB7XG4gICAgICAgIGNvbnN0IGNoYW5nZWRQb3NpdGlvbjogT2JzZXJ2YWJsZTxTbGlkZXNPdXRwdXREYXRhPiA9IG9mKHZhbHVlKS5waXBlKFxuICAgICAgICAgIGZpbHRlcigoKSA9PiB2YWx1ZS5wcm9wZXJ0eS5uYW1lID09PSAncG9zaXRpb24nKSxcbiAgICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gZnJvbSh0aGlzLnNsaWRlc0RhdGEpKSxcbiAgICAgICAgICBza2lwKHZhbHVlLnByb3BlcnR5LnZhbHVlKSxcbiAgICAgICAgICB0YWtlKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLml0ZW1zKSxcbiAgICAgICAgICBtYXAoc2xpZGUgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2xvbmVkSWRQcmVmaXggPSB0aGlzLmNhcm91c2VsU2VydmljZS5jbG9uZWRJZFByZWZpeDtcbiAgICAgICAgICAgIGNvbnN0IGlkID0gc2xpZGUuaWQuaW5kZXhPZihjbG9uZWRJZFByZWZpeCkgPj0gMCA/IHNsaWRlLmlkLnNsaWNlKGNsb25lZElkUHJlZml4Lmxlbmd0aCkgOiBzbGlkZS5pZDtcbiAgICAgICAgICAgIHJldHVybiB7IC4uLnNsaWRlLCBpZDogaWQsIGlzQWN0aXZlOiB0cnVlIH07XG4gICAgICAgICAgfSksXG4gICAgICAgICAgdG9BcnJheSgpLFxuICAgICAgICAgIG1hcChzbGlkZXMgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgc2xpZGVzOiBzbGlkZXMsXG4gICAgICAgICAgICAgIHN0YXJ0UG9zaXRpb246IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnJlbGF0aXZlKHZhbHVlLnByb3BlcnR5LnZhbHVlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gY29uc3QgY2hhbmdlZFNldHRpbmc6IE9ic2VydmFibGU8U2xpZGVzT3V0cHV0RGF0YT4gPSBvZih2YWx1ZSkucGlwZShcbiAgICAgICAgLy8gICBmaWx0ZXIoKCkgPT4gdmFsdWUucHJvcGVydHkubmFtZSA9PT0gJ3NldHRpbmdzJyksXG4gICAgICAgIC8vICAgbWFwKCgpID0+IHtcbiAgICAgICAgLy8gICAgIHJldHVybiB7XG4gICAgICAgIC8vICAgICAgIHNsaWRlczogW10sXG4gICAgICAgIC8vICAgICAgIHN0YXJ0UG9zaXRpb246IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnJlbGF0aXZlKHZhbHVlLnByb3BlcnR5LnZhbHVlKVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyAgIH0pXG4gICAgICAgIC8vIClcbiAgICAgICAgcmV0dXJuIG1lcmdlKGNoYW5nZWRQb3NpdGlvbik7XG4gICAgICB9KSxcbiAgICAgIHRhcChzbGlkZXNEYXRhID0+IHtcbiAgICAgICAgdGhpcy5nYXRoZXJUcmFuc2xhdGVkRGF0YSgpO1xuICAgICAgICB0aGlzLmNoYW5nZWQuZW1pdChzbGlkZXNEYXRhLnNsaWRlcy5sZW5ndGggPyBzbGlkZXNEYXRhIDogdGhpcy5zbGlkZXNPdXRwdXREYXRhKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5zbGlkZXNPdXRwdXREYXRhKTtcbiAgICAgICAgLy8gdGhpcy5zbGlkZXNPdXRwdXREYXRhID0ge307XG4gICAgICB9KVxuICAgICk7XG5cbiAgICB0aGlzLl9kcmFnZ2luZ0Nhcm91c2VsJCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldERyYWdTdGF0ZSgpLnBpcGUoXG4gICAgICB0YXAoKCkgPT4ge1xuICAgICAgICB0aGlzLmdhdGhlclRyYW5zbGF0ZWREYXRhKCk7XG4gICAgICAgIHRoaXMuZHJhZ2dpbmcuZW1pdCh7IGRyYWdnaW5nOiB0cnVlLCBkYXRhOiB0aGlzLnNsaWRlc091dHB1dERhdGEgfSk7XG4gICAgICB9KSxcbiAgICAgIHN3aXRjaE1hcChcbiAgICAgICAgKCkgPT4gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0RHJhZ2dlZFN0YXRlKCkucGlwZShcbiAgICAgICAgICBtYXAoKCkgPT4gISF0aGlzLmNhcm91c2VsU2VydmljZS5pcygnYW5pbWF0aW5nJykpXG4gICAgICAgIClcbiAgICAgICksXG4gICAgICBzd2l0Y2hNYXAoXG4gICAgICAgIGFuaW0gPT4ge1xuICAgICAgICAgIGlmIChhbmltKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0VHJhbnNsYXRlZFN0YXRlKCkucGlwZShcbiAgICAgICAgICAgICAgZmlyc3QoKSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBvZignbm90IGFuaW1hdGluZycpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKSxcbiAgICAgIHRhcCgoKSA9PiB7XG4gICAgICAgIHRoaXMuZHJhZ2dpbmcuZW1pdCh7IGRyYWdnaW5nOiBmYWxzZSwgZGF0YTogdGhpcy5zbGlkZXNPdXRwdXREYXRhIH0pO1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgdGhpcy5fY2Fyb3VzZWxNZXJnZSQgPSBtZXJnZShcbiAgICAgIHRoaXMuX3ZpZXdDdXJTZXR0aW5ncyQsXG4gICAgICB0aGlzLl90cmFuc2xhdGVkQ2Fyb3VzZWwkLFxuICAgICAgdGhpcy5fZHJhZ2dpbmdDYXJvdXNlbCQsXG4gICAgICB0aGlzLl9jaGFuZ2VDYXJvdXNlbCQsXG4gICAgICB0aGlzLl9jaGFuZ2VkQ2Fyb3VzZWwkLFxuICAgICAgdGhpcy5faW5pdGlhbGl6ZWRDYXJvdXNlbCRcbiAgICApO1xuICAgIHRoaXMuX2FsbE9ic2VydlN1YnNjcmlwdGlvbiA9IHRoaXMuX2Nhcm91c2VsTWVyZ2UkLnN1YnNjcmliZSgoKSA9PiB7IH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXQgc3Vic2NyaXB0aW9uIHRvIHJlc2l6ZSBldmVudCBhbmQgYXR0YWNoZXMgaGFuZGxlciBmb3IgdGhpcyBldmVudFxuICAgKi9cbiAgcHJpdmF0ZSBfd2luUmVzaXplV2F0Y2hlcigpIHtcbiAgICBpZiAoT2JqZWN0LmtleXModGhpcy5jYXJvdXNlbFNlcnZpY2UuX29wdGlvbnMucmVzcG9uc2l2ZSkubGVuZ3RoKSB7XG4gICAgICB0aGlzLnJlc2l6ZVN1YnNjcmlwdGlvbiA9IHRoaXMucmVzaXplU2VydmljZS5vblJlc2l6ZSRcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgZmlsdGVyKCgpID0+IHRoaXMuY2Fyb3VzZWxXaW5kb3dXaWR0aCAhPT0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vd2wtY2Fyb3VzZWwnKS5jbGllbnRXaWR0aCksXG4gICAgICAgICAgZGVsYXkodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MucmVzcG9uc2l2ZVJlZnJlc2hSYXRlKVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm9uUmVzaXplKHRoaXMuZWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcub3dsLWNhcm91c2VsJykuY2xpZW50V2lkdGgpO1xuICAgICAgICAgIHRoaXMuY2Fyb3VzZWxXaW5kb3dXaWR0aCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcub3dsLWNhcm91c2VsJykuY2xpZW50V2lkdGg7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVyIGZvciB0cmFuc2l0aW9lbmQgZXZlbnRcbiAgICovXG4gIG9uVHJhbnNpdGlvbkVuZCgpIHtcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5vblRyYW5zaXRpb25FbmQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVyIGZvciBjbGljayBldmVudCwgYXR0YWNoZWQgdG8gbmV4dCBidXR0b25cbiAgICovXG4gIG5leHQoKSB7XG4gICAgaWYgKCF0aGlzLmNhcm91c2VsTG9hZGVkKSByZXR1cm47XG4gICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5uZXh0KHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLm5hdlNwZWVkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVyIGZvciBjbGljayBldmVudCwgYXR0YWNoZWQgdG8gcHJldiBidXR0b25cbiAgICovXG4gIHByZXYoKSB7XG4gICAgaWYgKCF0aGlzLmNhcm91c2VsTG9hZGVkKSByZXR1cm47XG4gICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5wcmV2KHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLm5hdlNwZWVkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVyIGZvciBjbGljayBldmVudCwgYXR0YWNoZWQgdG8gZG90c1xuICAgKi9cbiAgbW92ZUJ5RG90KGRvdElkOiBzdHJpbmcpIHtcbiAgICBpZiAoIXRoaXMuY2Fyb3VzZWxMb2FkZWQpIHJldHVybjtcbiAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLm1vdmVCeURvdChkb3RJZCk7XG4gIH1cblxuICAvKipcbiAgICogcmV3aW5kcyBjYXJvdXNlbCB0byBzbGlkZSB3aXRoIG5lZWRlZCBpZFxuICAgKiBAcGFyYW0gaWQgZnJhZ21lbnQgb2YgdXJsXG4gICAqL1xuICB0byhpZDogc3RyaW5nKSB7XG4gICAgLy8gaWYgKCF0aGlzLmNhcm91c2VsTG9hZGVkIHx8ICgodGhpcy5uYXZEYXRhICYmIHRoaXMubmF2RGF0YS5kaXNhYmxlZCkgJiYgKHRoaXMuZG90c0RhdGEgJiYgdGhpcy5kb3RzRGF0YS5kaXNhYmxlZCkpKSByZXR1cm47XG4gICAgaWYgKCF0aGlzLmNhcm91c2VsTG9hZGVkKSByZXR1cm47XG4gICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS50b1NsaWRlQnlJZChpZCk7XG4gIH1cblxuICAvKipcbiAgICogR2F0aGVycyBhbmQgcHJlcGFyZXMgZGF0YSBpbnRlbmRlZCBmb3IgcGFzc2luZyB0byB0aGUgdXNlciBieSBtZWFucyBvZiBmaXJpbmcgZXZlbnQgdHJhbnNsYXRlZENhcm91c2VsXG4gICAqL1xuICBnYXRoZXJUcmFuc2xhdGVkRGF0YSgpIHtcbiAgICBsZXQgc3RhcnRQb3NpdGlvbjogbnVtYmVyO1xuICAgIGNvbnN0IGNsb25lZElkUHJlZml4ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuY2xvbmVkSWRQcmVmaXg7XG4gICAgY29uc3QgYWN0aXZlU2xpZGVzOiBTbGlkZU1vZGVsW10gPSB0aGlzLnNsaWRlc0RhdGFcbiAgICAgIC5maWx0ZXIoc2xpZGUgPT4gc2xpZGUuaXNBY3RpdmUgPT09IHRydWUpXG4gICAgICAubWFwKHNsaWRlID0+IHtcbiAgICAgICAgY29uc3QgaWQgPSBzbGlkZS5pZC5pbmRleE9mKGNsb25lZElkUHJlZml4KSA+PSAwID8gc2xpZGUuaWQuc2xpY2UoY2xvbmVkSWRQcmVmaXgubGVuZ3RoKSA6IHNsaWRlLmlkO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICB3aWR0aDogc2xpZGUud2lkdGgsXG4gICAgICAgICAgbWFyZ2luTDogc2xpZGUubWFyZ2luTCxcbiAgICAgICAgICBtYXJnaW5SOiBzbGlkZS5tYXJnaW5SLFxuICAgICAgICAgIGNlbnRlcjogc2xpZGUuaXNDZW50ZXJlZFxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICBzdGFydFBvc2l0aW9uID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UucmVsYXRpdmUodGhpcy5jYXJvdXNlbFNlcnZpY2UuY3VycmVudCgpKTtcbiAgICB0aGlzLnNsaWRlc091dHB1dERhdGEgPSB7XG4gICAgICBzdGFydFBvc2l0aW9uOiBzdGFydFBvc2l0aW9uLFxuICAgICAgc2xpZGVzOiBhY3RpdmVTbGlkZXNcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3RhcnRzIHBhdXNpbmdcbiAgICovXG4gIHN0YXJ0UGF1c2luZygpIHtcbiAgICB0aGlzLmF1dG9wbGF5U2VydmljZS5zdGFydFBhdXNpbmcoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydHMgcGxheWluZyBhZnRlciBtb3VzZSBsZWF2ZXMgY2Fyb3VzZWxcbiAgICovXG4gIHN0YXJ0UGxheU1MKCkge1xuICAgIHRoaXMuYXV0b3BsYXlTZXJ2aWNlLnN0YXJ0UGxheWluZ01vdXNlTGVhdmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydHMgcGxheWluZyBhZnRlciB0b3VjaCBlbmRzXG4gICAqL1xuICBzdGFydFBsYXlURSgpIHtcbiAgICB0aGlzLmF1dG9wbGF5U2VydmljZS5zdGFydFBsYXlpbmdUb3VjaEVuZCgpO1xuICB9XG5cbiAgc3RvcEF1dG9wbGF5KCkge1xuICAgIHRoaXMuYXV0b3BsYXlTZXJ2aWNlLmlzQXV0b3BsYXlTdG9wcGVkID0gdHJ1ZTtcbiAgICB0aGlzLmF1dG9wbGF5U2VydmljZS5zdG9wKCk7XG4gIH1cblxuICBzdGFydEF1dG9wbGF5KCkge1xuICAgIHRoaXMuYXV0b3BsYXlTZXJ2aWNlLmlzQXV0b3BsYXlTdG9wcGVkID0gZmFsc2U7XG4gICAgdGhpcy5hdXRvcGxheVNlcnZpY2UucGxheSgpO1xuICB9XG5cbn1cbiJdfQ==