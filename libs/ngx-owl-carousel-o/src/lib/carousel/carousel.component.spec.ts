import { async, ComponentFixture, discardPeriodicTasks, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import {
  CarouselComponent,
  CarouselSlideDirective,
  SlidesOutputData
} from './carousel.component';
import { ResizeService } from '../services/resize.service';
import { WINDOW_PROVIDERS } from '../services/window-ref.service';
import { CarouselService } from '../services/carousel.service';
import { createGenericTestComponent } from './test/common';
import { cold, getTestScheduler, hot } from 'jasmine-marbles';
import { NavigationService } from '../services/navigation.service';
import { AutoplayService } from '../services/autoplay.service';
import { DOCUMENT_PROVIDERS } from '../services/document-ref.service';
import 'zone.js/dist/zone-patch-rxjs-fake-async';
import { StageComponent } from './stage/stage.component';
import { LazyLoadService } from '../services/lazyload.service';
// import 'zone.js/lib/rxjs/rxjs-fake-async';
const createTestComponent = (html: string) =>
    createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>


describe('CarouselComponent', () => {
  let testComponent: TestComponent;
  let fixtureHost: ComponentFixture<TestComponent>;

  let carouselComponent: CarouselComponent;
  let deCarouselComponent: DebugElement;
  let carouselHTML: HTMLElement;
  let carouselService: CarouselService;
  let autoplayService: AutoplayService;

  let deStage: DebugElement;

  let deNavButtons: DebugElement[];
  let deNavButtonsWrapper: DebugElement;
  let nextButton: HTMLElement;
  let prevButton: HTMLElement;
  let deDots: DebugElement[];
  let deDotsWrapper: DebugElement;

  let deSlides: DebugElement[];
  let deActiveSlides: DebugElement[];

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [
          CarouselComponent,
          TestComponent,
          CarouselSlideDirective,
          StageComponent
        ],
        providers: [
          ResizeService,
          WINDOW_PROVIDERS,
          CarouselService,
          NavigationService,
          AutoplayService,
          DOCUMENT_PROVIDERS,
          LazyLoadService
        ]
      });
    })
  );

  it('should render carousel with slides keeping default values', async(() => {
    const html = `
      <div style="width: 1200px; margin: auto">
        <owl-carousel-o>
          <ng-template carouselSlide>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide>Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
          <ng-template carouselSlide>Slide 5</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));
    carouselComponent = deCarouselComponent.componentInstance;

    carouselService = fixtureHost.debugElement.injector.get(CarouselService);

    fixtureHost.whenStable().then(() => {
      fixtureHost.detectChanges();
      carouselHTML = deCarouselComponent.query(By.css('.owl-carousel')).nativeElement;
      expect(carouselComponent).toBeTruthy();

      expect(carouselComponent.owlDOMData.isMouseDragable).toBeTruthy('isMouseDragable should be true');
      expect(carouselHTML.classList.contains('owl-drag')).toBeTruthy('has .owl-drag');

      expect(carouselComponent.owlDOMData.rtl).toBeFalsy('rtl should be true');
      expect(carouselHTML.classList.contains('owl-rtl')).toBeFalsy('has .owl-rtl');

      expect(carouselComponent.owlDOMData.isResponsive).toBeFalsy('isResponsive should be true');
      expect(carouselHTML.classList.contains('owl-responsive')).toBeFalsy('has .owl-responsive');

      expect(carouselComponent.owlDOMData.isLoaded).toBe(true, 'isLoaded should be true');
      expect(carouselHTML.classList.contains('owl-loaded')).toBeTruthy('has .owl-loaded');

      expect(carouselComponent.owlDOMData.isGrab).toBe(false, 'isGrab should be true');
      expect(carouselHTML.classList.contains('owl-grab')).toBeFalsy('has .owl-grab');

      expect(carouselComponent.carouselLoaded).toBeTruthy('owlVisible should be true; this means stage is created')

      deStage = deCarouselComponent.query(By.css('.owl-stage'));
      expect(carouselComponent.stageData.width).toBe(2000, 'width of stage');
      expect(deStage.nativeElement.clientWidth).toBe(2000, 'width of stage');

      expect(carouselComponent.stageData.transition).toBe('0s', 'transition of stage');
      expect(deStage.nativeElement.style.transitionDuration).toBe('0s', 'transition of stage');

      expect(carouselComponent.stageData.transform).toBe('translate3d(0px,0px,0px)', 'transform of stage');
      expect(deStage.nativeElement.style.transform).toBe('translate3d(0px, 0px, 0px)', 'transform of stage');

      expect(carouselComponent.stageData.paddingL).toBe('', 'padding-left of stage');
      expect(deStage.nativeElement.style.paddingLeft).toBe('', 'padding-left of stage');

      expect(carouselComponent.stageData.paddingR).toBe('', 'padding-right of stage');
      expect(deStage.nativeElement.style.paddingRight).toBe('', 'padding-right of stage');

      deSlides = deCarouselComponent.queryAll(By.css('.owl-item'));
      expect(carouselComponent.slidesData[0].dataMerge).toBe(1, 'dataMerge of first slide is 1');
      expect(carouselComponent.slidesData.length).toBe(5, 'length of slidesData');
      expect(deSlides.length).toBe(5, '5 slides');

      expect(deSlides[0].nativeElement.classList.contains('active')).toBeTruthy('startPosition 0, first slide must be active')

      expect(deSlides[0].nativeElement.clientWidth).toBe(400, '400px width of first slide');
      expect(deSlides[0].nativeElement.style.marginLeft).toBe('', '"" margin-left of first slide');
      expect(deSlides[0].nativeElement.style.marginRight).toBe('', '"" margin-left of first slide');
      expect(deSlides[0].nativeElement.style.marginRight).toBe('', '"" margin-left of first slide');

      const activeSlides: DebugElement[] = deCarouselComponent.queryAll(By.css('.owl-item.active'));
      expect(activeSlides.length).toBe(3, '3 active slides');

      const clonedSlides: DebugElement[] = deCarouselComponent.queryAll(By.css('.owl-item.cloned'));
      expect(clonedSlides.length).toBe(0, '0 cloned slides');

      const centeredSlides: DebugElement[] = deCarouselComponent.queryAll(By.css('.owl-item.center'));
      expect(centeredSlides.length).toBe(0, '0 centered slides');

      deDotsWrapper = deCarouselComponent.query(By.css('.owl-dots'));
      deDots = deCarouselComponent.queryAll(By.css('.owl-dot'));
      expect(deDotsWrapper.nativeElement.classList.contains('disabled')).toBeFalsy('.owl-dots doesn\'t have class .disabled');
      expect(deDots.length).toBe(2, '2 dots for 5 slides');
      expect(deDots[0].nativeElement.classList.contains('active')).toBeTruthy('1th dot is active');
      expect(deDots[0].query(By.css('span')).nativeElement.innerHTML).toBe('', 'there\'s just empty span in .owl-dot');

      deNavButtonsWrapper = deCarouselComponent.query(By.css('.owl-nav'));
      expect(deNavButtonsWrapper.nativeElement.classList.contains('disabled')).toBeTruthy('.owl-nav is disabled');
      // discardPeriodicTasks();
    });
  }));

  it(`should render carousel with 4 active slides [options]="{items: '4'}"`, async(() => {
    const html = `
      <div style="width: 1200px; margin: auto">
        <owl-carousel-o [options]="{items: '4'}">
          <ng-template carouselSlide>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide>Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
          <ng-template carouselSlide>Slide 5</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));
    carouselComponent = deCarouselComponent.componentInstance;

    fixtureHost.whenStable().then(() => {
      fixtureHost.detectChanges();

      const activeSlides: DebugElement[] = deCarouselComponent.queryAll(By.css('.owl-item.active'));
      expect(activeSlides.length).toBe(4, '4 active slides');
    });
  }));

  it(`should render carousel with 3 active slides when prop items isn't number: [options]="{items: 'four'}"`, async(() => {
    const html = `
      <div style="width: 1200px; margin: auto">
        <owl-carousel-o [options]="{items: 'four'}">
          <ng-template carouselSlide>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide>Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
          <ng-template carouselSlide>Slide 5</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));
    carouselComponent = deCarouselComponent.componentInstance;

    fixtureHost.whenStable().then(() => {
      fixtureHost.detectChanges();

      const activeSlides: DebugElement[] = deCarouselComponent.queryAll(By.css('.owl-item.active'));
      expect(activeSlides.length).toBe(3, '3 active slides');
    });
  }));

  it(`should render carousel with 5 active slides when prop items=10 and there're just 5 slides: [options]="{items: '10'}"`, async(() => {
    const html = `
      <div style="width: 1200px; margin: auto">
        <owl-carousel-o [options]="{items: '10'}">
          <ng-template carouselSlide>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide>Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
          <ng-template carouselSlide>Slide 5</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));
    carouselComponent = deCarouselComponent.componentInstance;

    fixtureHost.whenStable().then(() => {
      fixtureHost.detectChanges();

      const activeSlides: DebugElement[] = deCarouselComponent.queryAll(By.css('.owl-item.active'));
      expect(activeSlides.length).toBe(5, '5 active slides');
    });
  }));

  it(`should render carousel with 2 active slides and 6 cloned slide (total slides 11) [options]="{items: 2, loop: true}`, async(() => {
    const html = `
      <div style="width: 1200px; margin: auto">
        <owl-carousel-o [options]="{items: 2, loop: true, rewind: true}">
          <ng-template carouselSlide>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide>Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
          <ng-template carouselSlide>Slide 5</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));
    carouselComponent = deCarouselComponent.componentInstance;

    fixtureHost.whenStable().then(() => {
      fixtureHost.detectChanges();

      const activeSlides: DebugElement[] = deCarouselComponent.queryAll(By.css('.owl-item.active'));
      expect(activeSlides.length).toBe(2, '2 active slides');

      deSlides = deCarouselComponent.queryAll(By.css('.owl-item'));
      expect(deSlides.length).toBe(9, '9 slides');

      const clonedSlides: DebugElement[] = deCarouselComponent.queryAll(By.css('.owl-item.cloned'));
      expect(clonedSlides.length).toBe(4, '4 cloned slides');

      const clonedUnactiveSlides: DebugElement[] = deCarouselComponent.queryAll(By.css('.owl-item.cloned.active'))
      expect(clonedUnactiveSlides.length).toBe(0, 'when startPosition is 0 cloned slides shouldn\'t have .active')
    });
  }));

  it(`should render carousel with 2 active slides and 6 cloned slide (total slides 11) [options]="{items: 2, loop: true, rewind: false}`, async(() => {
    const html = `
      <div style="width: 1200px; margin: auto">
        <owl-carousel-o [options]="{items: 2, loop: true, rewind: false}">
          <ng-template carouselSlide>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide>Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
          <ng-template carouselSlide>Slide 5</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));
    carouselComponent = deCarouselComponent.componentInstance;

    fixtureHost.whenStable().then(() => {
      fixtureHost.detectChanges();

      const activeSlides: DebugElement[] = deCarouselComponent.queryAll(By.css('.owl-item.active'));
      expect(activeSlides.length).toBe(2, '2 active slides');

      deSlides = deCarouselComponent.queryAll(By.css('.owl-item'));
      expect(deSlides.length).toBe(11, '11 slides');

      const clonedSlides: DebugElement[] = deCarouselComponent.queryAll(By.css('.owl-item.cloned'));
      expect(clonedSlides.length).toBe(6, '6 cloned slides');

      const clonedUnactiveSlides: DebugElement[] = deCarouselComponent.queryAll(By.css('.owl-item.cloned.active'))
      expect(clonedUnactiveSlides.length).toBe(0, 'when startPosition is 0 cloned slides shouldn\'t have .active')
    });
  }));

  it(`should render carousel with 5th active slide and 1 cloned active slide (total slides 11)
       [options]="{items: 2, loop: true, startPosition: 4} (startPosition: 4 is array-like index)`, async(() => {
    const html = `
      <div style="width: 1200px; margin: auto">
        <owl-carousel-o [options]="{items: 2, loop: true, startPosition: 4}">
          <ng-template carouselSlide>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide>Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
          <ng-template carouselSlide>Slide 5</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));
    carouselComponent = deCarouselComponent.componentInstance;

    fixtureHost.whenStable().then(() => {
      fixtureHost.detectChanges();

      const activeSlides: DebugElement[] = deCarouselComponent.queryAll(By.css('.owl-item.active'));
      expect(activeSlides.length).toBe(2, '2 active slides');
      expect(activeSlides[0].nativeElement.innerHTML).toContain('Slide 5', 'first active slide is last slide of origin item');

      expect(activeSlides[1].nativeElement.classList.contains('cloned')).toBeTruthy('second active element is cloned');
      expect(activeSlides[1].nativeElement.innerHTML).toContain('Slide 1', 'second active slide is clone of first origin item');
    });
  }));

  it(`should render carousel with 2th active slide [options]="{items: 2, startPosition: 1}`, async(() => {
    const html = `
      <div style="width: 1200px; margin: auto">
        <owl-carousel-o [options]="{items: 2, startPosition: 1}">
          <ng-template carouselSlide>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide>Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
          <ng-template carouselSlide>Slide 5</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));
    carouselComponent = deCarouselComponent.componentInstance;

    fixtureHost.whenStable().then(() => {
      fixtureHost.detectChanges();

      const activeSlides: DebugElement[] = deCarouselComponent.queryAll(By.css('.owl-item.active'));
      expect(activeSlides.length).toBe(2, '2 active slides');
      expect(activeSlides[0].nativeElement.innerHTML).toContain('Slide 2', 'first active slide is second slide of all slides');

      deSlides = deCarouselComponent.queryAll(By.css('.owl-item'));
      expect(deSlides[0].nativeElement.classList.contains('active')).toBeFalsy('first slide doesn\'t have class .active');
    });
  }));

  it(`should render carousel with 4th active slide not 5th[options]="{items: 2, startPosition: 4}`, async(() => {
    const html = `
      <div style="width: 1200px; margin: auto">
        <owl-carousel-o [options]="{items: 2, startPosition: 4}">
          <ng-template carouselSlide>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide>Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
          <ng-template carouselSlide>Slide 5</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));
    carouselComponent = deCarouselComponent.componentInstance;

    fixtureHost.whenStable().then(() => {
      fixtureHost.detectChanges();

      const activeSlides: DebugElement[] = deCarouselComponent.queryAll(By.css('.owl-item.active'));
      expect(activeSlides.length).toBe(2, '2 active slides');
      expect(activeSlides[0].nativeElement.innerHTML).toContain('Slide 4', 'first active slide is 4th slide of all slides');
      expect(activeSlides[1].nativeElement.innerHTML).toContain('Slide 5', 'second active slide is 5th slide of all slides');

    });
  }));


  it(`should render carousel which has 1th slide with class .center [options]="{items: 2, center: true}`, async(() => {
    const html = `
      <div style="width: 1200px; margin: auto">
        <owl-carousel-o [options]="{items: 2, center: true}">
          <ng-template carouselSlide>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide>Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));
    carouselComponent = deCarouselComponent.componentInstance;

    fixtureHost.whenStable().then(() => {
      fixtureHost.detectChanges();

      const activeCenterSlide: DebugElement[] = deCarouselComponent.queryAll(By.css('.owl-item.active.center'));
      expect(activeCenterSlide.length).toBe(1, '1 centered slide');
      expect(activeCenterSlide[0].nativeElement.innerHTML).toContain('Slide 1', '1th slide of all slides has class .center');

    });
  }));

  it(`should render carousel which has 3th slide with class .center [options]="{items: 2, center: true, startPosition: 2}`, async(() => {
    const html = `
      <div style="width: 1200px; margin: auto">
        <owl-carousel-o [options]="{items: 2, center: true, startPosition: 2}">
          <ng-template carouselSlide>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide>Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));
    carouselComponent = deCarouselComponent.componentInstance;

    fixtureHost.whenStable().then(() => {
      fixtureHost.detectChanges();

      const activeCenterSlide: DebugElement[] = deCarouselComponent.queryAll(By.css('.owl-item.active.center'));
      expect(activeCenterSlide[0].nativeElement.innerHTML).toContain('Slide 3', '3th slide of all slides has class .center');
      const activeSlides: DebugElement[] = deCarouselComponent.queryAll(By.css('.owl-item.active'));
      expect(activeSlides.length).toBe(3, 'however items=2 .active will get 3 slides. That\'s because Slide 3 will take center and sibling slides will be visible partly');

    });
  }));

  it(`should render carousel which doesn\'t have class .owl-drag [options]="{items: 1, mouseDrag: false}`, async(() => {
    const html = `
      <div style="width: 1200px; margin: auto">
        <owl-carousel-o [options]="{items: 1, mouseDrag: false}">
          <ng-template carouselSlide>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide>Slide 3</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));
    carouselComponent = deCarouselComponent.componentInstance;

    fixtureHost.whenStable().then(() => {
      fixtureHost.detectChanges();

      carouselHTML = deCarouselComponent.query(By.css('.owl-carousel')).nativeElement;
      expect(carouselHTML.classList.contains('owl-drag')).toBeFalsy('shouldn\'t have class .owl-drag');

    });
  }));

  // rewind prop is used when carousel moves, so should be tested when moving will be done;
  it(`should render carousel with slides having 'margin-right=10px' [options]="{items: 2, margin: 10}`, async(() => {
    const html = `
      <div style="width: 1200px; margin: auto">
        <owl-carousel-o [options]="{items: 2, margin: 10}">
          <ng-template carouselSlide>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide>Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));

    fixtureHost.whenStable().then(() => {
      fixtureHost.detectChanges();

      deSlides = deCarouselComponent.queryAll(By.css('.owl-item'));
      expect(deSlides[0].nativeElement.style.marginRight).toBe('10px', 'margin-right should be 10px');
      expect(deSlides[0].nativeElement.clientWidth).toBe(595, 'width of each slider should be 595px');

    });
  }));


  it(`should render carousel with .owl-rtl [options]="{items: 2, rtl: true}`, async(() => {
    const html = `
      <div style="width: 1200px; margin: auto">
        <owl-carousel-o [options]="{items: 2, rtl: true}">
          <ng-template carouselSlide>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide>Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));

    fixtureHost.whenStable().then(() => {
      fixtureHost.detectChanges();

      carouselHTML = deCarouselComponent.query(By.css('.owl-carousel')).nativeElement;
      expect(carouselHTML.classList.contains('owl-rtl')).toBeTruthy('should have class .owl-rtl');

      deSlides = deCarouselComponent.queryAll(By.css('.owl-item'));
      // expect(getComputedStyle(deSlides[0].nativeElement).cssFloat).toBe('right', '.owl-item should have css-rule float: right');
      expect(deSlides[0].nativeElement.classList.contains('active')).toBeTruthy('1th slide should be active');

    });
  }));

  it(`should render carousel with slides having 'margin-left=10px' [options]="{items: 2, margin: 10, rtl: true}`, async(() => {
    const html = `
      <div style="width: 1200px; margin: auto">
        <owl-carousel-o [options]="{items: 2, margin: 10, rtl: true}">
          <ng-template carouselSlide>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide>Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));

    fixtureHost.whenStable().then(() => {
      fixtureHost.detectChanges();

      deSlides = deCarouselComponent.queryAll(By.css('.owl-item'));
      expect(deSlides[0].nativeElement.style.marginLeft).toBe('10px', 'margin-left should be 10px');
      expect(deSlides[0].nativeElement.clientWidth).toBe(595, 'width of each slider should be 595px');

    });
  }));

  it(`should render carousel with class .owl-rtl and active slides starting from 2 position [options]="{items: 2, startPosition: 2, rtl: true}`, async(() => {
    const html = `
      <div style="width: 1200px; margin: auto">
        <owl-carousel-o [options]="{items: 2, startPosition: 2, rtl: true}">
          <ng-template carouselSlide>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide>Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));

    fixtureHost.whenStable().then(() => {
      fixtureHost.detectChanges();

      const activeSlides: DebugElement[] = deCarouselComponent.queryAll(By.css('.owl-item.active'));
      expect(activeSlides[0].nativeElement.innerHTML).toContain('Slide 3', 'Slide 3');

    });
  }));

  it(`should render carousel with class .owl-rtl, active slides starting from 2nd position and first of active slide should have .center  [options]="{items: 3, startPosition: 2, rtl: true}`, async(() => {
    const html = `
      <div style="width: 1200px; margin: auto">
        <owl-carousel-o [options]="{items: 3, startPosition: 2, rtl: true, center: true}">
          <ng-template carouselSlide>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide>Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));

    fixtureHost.whenStable().then(() => {
      fixtureHost.detectChanges();

      const activeSlides: DebugElement[] = deCarouselComponent.queryAll(By.css('.owl-item.active'));
      expect(activeSlides[0].nativeElement.innerHTML).toContain('Slide 2', 'Slide 3 should be first, but due to center=true and odd number of active slides, it takes center spot giving its place preceding Slide 2');
      expect(activeSlides[1].nativeElement.classList.contains('center')).toBeTruthy('Slide 3 is centered');
      expect(activeSlides.length).toBe(3, '3 active slides');
    });
  }));

  it(`should render responsive carousel  [options]="{nav: true, responsive: {'0': {items: 1}, '600': {items: 2}, '900': {items: 3}}}"`, fakeAsync(() => {
    const html = `
      <div class="owl-wrapper" style="width: 1200px; margin: auto">
        <owl-carousel-o [options]="{nav: true, responsive: {'0': {items: 1}, '600': {items: 2}, '900': {items: 3}}}">
          <ng-template carouselSlide>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide>Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
          <ng-template carouselSlide>Slide 5</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));
    tick();
    fixtureHost.detectChanges();

    carouselHTML = deCarouselComponent.query(By.css('.owl-carousel')).nativeElement;
    expect(carouselHTML.classList.contains('owl-responsive')).toBeTruthy('should have class .owl-responsive');

    let activeSlides: DebugElement[] = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(activeSlides.length).toBe(3, 'should be 3 active slides');
    deDots = deCarouselComponent.queryAll(By.css('.owl-dots > .owl-dot'));
    deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
    expect(deDots.length).toBe(2, '2 dots');
    expect(deDots[0].nativeElement.classList.contains('active')).toBeTruthy('1th dot is active');
    expect(deNavButtons[0].nativeElement.classList.contains('disabled')).toBeTruthy('prev button is disabled');

    // ------- set width of carousel to 800px
    carouselHTML.closest('.owl-wrapper').setAttribute('style', 'width: 800px; margin: auto');
    fixtureHost.detectChanges();

    expect(carouselHTML.clientWidth).toBe(800);

    carouselService = fixtureHost.debugElement.injector.get(CarouselService);

    window.dispatchEvent(new Event('resize'));
    tick(200);
    fixtureHost.detectChanges();

    activeSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(activeSlides.length).toBe(2, 'should be 2 active slides');
    expect(activeSlides[0].nativeElement.innerHTML).toContain('Slide 1');

    deDots = deCarouselComponent.queryAll(By.css('.owl-dots > .owl-dot'));
    deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
    expect(deDots.length).toBe(3, '3 dots');
    expect(deDots[0].nativeElement.classList.contains('active')).toBeTruthy('1th dot is active');
    expect(deNavButtons[0].nativeElement.classList.contains('disabled')).toBeTruthy('prev button is disabled');

    // ------- set width of carousel to 500px
    carouselHTML.closest('.owl-wrapper').setAttribute('style', 'width: 500px; margin: auto');
    fixtureHost.detectChanges();
    expect(carouselHTML.clientWidth).toBe(500);

    window.dispatchEvent(new Event('resize'));
    tick(200);
    fixtureHost.detectChanges();

    activeSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(activeSlides.length).toBe(1, 'should be 1 active slide');
    expect(activeSlides[0].nativeElement.innerHTML).toContain('Slide 1');

    deDots = deCarouselComponent.queryAll(By.css('.owl-dots > .owl-dot'));
    deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
    expect(deDots.length).toBe(5, '5 dots');
    expect(deDots[0].nativeElement.classList.contains('active')).toBeTruthy('1th dot is active');
    expect(deNavButtons[0].nativeElement.classList.contains('disabled')).toBeTruthy('prev button is disabled');

    // ------- set width of carousel to 800px
    carouselHTML.closest('.owl-wrapper').setAttribute('style', 'width: 800px; margin: auto');
    window.dispatchEvent(new Event('resize'));
    tick(200);
    fixtureHost.detectChanges();

    activeSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(activeSlides.length).toBe(2, 'should be 2 active slides');
    expect(activeSlides[0].nativeElement.innerHTML).toContain('Slide 1');

    deDots = deCarouselComponent.queryAll(By.css('.owl-dots > .owl-dot'));
    deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
    expect(deDots.length).toBe(3, '3 dots');
    expect(deDots[0].nativeElement.classList.contains('active')).toBeTruthy('1th dot is active');
    expect(deNavButtons[0].nativeElement.classList.contains('disabled')).toBeTruthy('prev button is disabled');

    // ------- set width of carousel to 1100px
    carouselHTML.closest('.owl-wrapper').setAttribute('style', 'width: 1100px; margin: auto');
    window.dispatchEvent(new Event('resize'));
    tick(200);
    fixtureHost.detectChanges();

    activeSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(activeSlides.length).toBe(3, 'should be 3 active slides');
    expect(activeSlides[0].nativeElement.innerHTML).toContain('Slide 1');

    deDots = deCarouselComponent.queryAll(By.css('.owl-dots > .owl-dot'));
    deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
    expect(deDots.length).toBe(2, '2 dots');
    expect(deDots[0].nativeElement.classList.contains('active')).toBeTruthy('1th dot is active');
    expect(deNavButtons[0].nativeElement.classList.contains('disabled')).toBeTruthy('prev button is disabled');
  }));

  it(`should render responsive carousel  [options]="{nav: true, responsive: {'0': {items: 1}, '600': {items: 2}, '900': {items: 3}}}"`, fakeAsync(() => {
    const html = `
      <div class="owl-wrapper" style="width: 1200px; margin: auto">
        <owl-carousel-o [options]="{nav: true, responsive: {'0': {items: 1}, '600': {items: 2}, '900': {items: 3}}}">
          <ng-template carouselSlide>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide>Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
          <ng-template carouselSlide>Slide 5</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));
    tick();
    fixtureHost.detectChanges();

    carouselHTML = deCarouselComponent.query(By.css('.owl-carousel')).nativeElement;
    expect(carouselHTML.classList.contains('owl-responsive')).toBeTruthy('should have class .owl-responsive');

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides.length).toBe(3, 'should be 3 active slides');
    deDots = deCarouselComponent.queryAll(By.css('.owl-dots > .owl-dot'));
    deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
    expect(deDots[0].nativeElement.classList.contains('active')).toBeTruthy('1th dot is active');
    deDots[1].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 3', 'Slide 3');

    // ------- set width of carousel to 800px
    carouselHTML.closest('.owl-wrapper').setAttribute('style', 'width: 800px; margin: auto');
    window.dispatchEvent(new Event('resize'));
    tick(200);
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 3', 'Slide 3');
    expect(deActiveSlides.length).toBe(2, '2 active slides');
    deDots = deCarouselComponent.queryAll(By.css('.owl-dots > .owl-dot'));
    expect(deDots[1].nativeElement.classList.contains('active')).toBeTruthy('2 dot is active');

    deDots[2].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 4', 'Slide 4');

    // ------- set width of carousel to 400px
    carouselHTML.closest('.owl-wrapper').setAttribute('style', 'width: 400px; margin: auto');
    window.dispatchEvent(new Event('resize'));
    tick(200);
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 4', 'Slide 4');
    expect(deActiveSlides.length).toBe(1, '1 active slide');
    deDots = deCarouselComponent.queryAll(By.css('.owl-dots > .owl-dot'));
    expect(deDots[3].nativeElement.classList.contains('active')).toBeTruthy('4th dot is active');

    // 2 clicks on prev button Slide 2 should be first from actives
    deNavButtons[0].triggerEventHandler('click', null);
    tick();
    deNavButtons[0].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 2', 'Slide 2');

    // ------- set width of carousel to 800px
    carouselHTML.closest('.owl-wrapper').setAttribute('style', 'width: 800px; margin: auto');
    window.dispatchEvent(new Event('resize'));
    tick(200);
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 2', 'Slide 2');
    expect(deActiveSlides.length).toBe(2, '2 active slide');
    deDots = deCarouselComponent.queryAll(By.css('.owl-dots > .owl-dot'));
    expect(deDots[0].nativeElement.classList.contains('active')).toBeTruthy('1th dot is active');
  }));

  it(`should set paddings to .owl-stage  [options]="{items: 3, loop: true, stagePadding: 40}`, async(() => {
    const html = `
      <div style="width: 1200px; margin: auto">
        <owl-carousel-o [options]="{items: 3, loop: true, stagePadding: 40}">
          <ng-template carouselSlide>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide>Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));
    deStage = deCarouselComponent.query(By.css('.owl-stage'));

    fixtureHost.whenStable().then(() => {
      fixtureHost.detectChanges();
      expect(getComputedStyle(deStage.nativeElement).paddingLeft).toBe('40px', 'padding-left should be 40px');
      expect(getComputedStyle(deStage.nativeElement).paddingRight).toBe('40px', 'padding-right should be 40px');
    });
  }));

  it(`should render carousel with option merge (in fact this option does almost nothing; we should use data-binding to directive carouselSlide: [dataMerge]="2") [options]="{merge: true}`, async(() => {
    const html = `
      <div style="width: 1200px; margin: auto">
        <owl-carousel-o [options]="{merge: true}">
          <ng-template carouselSlide [dataMerge]="2">Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide [dataMerge]="2">Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));

    fixtureHost.whenStable().then(() => {
      fixtureHost.detectChanges();

      deSlides = deCarouselComponent.queryAll(By.css('.owl-item'));
      expect(deSlides[0].nativeElement.clientWidth).toBe(800, 'width of 1th slide is twice bigger then common slide');
      expect(deSlides[1].nativeElement.clientWidth).toBe(400, 'width of 2th slide should be 400 (1200/3=400)');
      expect(deSlides[2].nativeElement.clientWidth).toBe(800, 'width of 3th slide is twice bigger then common slide');
    });
  }));

  it(`should limit width of slide with [dataMerge]="4" by 2 widths of common slide [options]="{items: 2, merge: true}`, async(() => {
    const html = `
      <div style="width: 1200px; margin: auto">
        <owl-carousel-o [options]="{items: 2, merge: true}">
          <ng-template carouselSlide [dataMerge]="4">Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide [dataMerge]="2">Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));

    fixtureHost.whenStable().then(() => {
      fixtureHost.detectChanges();

      deSlides = deCarouselComponent.queryAll(By.css('.owl-item'));
      expect(deSlides[0].nativeElement.clientWidth).toBe(1200, 'width of 1th slide is twice bigger then common slide');
      expect(deSlides[1].nativeElement.clientWidth).toBe(600, 'width of 2th slide should be 400 (1200/3=400)');
      expect(deSlides[2].nativeElement.clientWidth).toBe(1200, 'width of 3th slide is twice bigger then common slide');
    });
  }));

  it(`shouldn\'t limit width of slide with [dataMerge]="4" by 2 widths of common slide [options]="{mergeFit: false, items: 2, merge: true}`, async(() => {
    const html = `
      <div style="width: 1200px; margin: auto">
        <owl-carousel-o [options]="{mergeFit: false, items: 2, merge: true}">
          <ng-template carouselSlide [dataMerge]="4">Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide [dataMerge]="2">Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));

    fixtureHost.whenStable().then(() => {
      fixtureHost.detectChanges();

      deSlides = deCarouselComponent.queryAll(By.css('.owl-item'));
      expect(deSlides[0].nativeElement.clientWidth).toBe(2400, 'width of 1th slide is twice bigger then common slide');
      expect(deSlides[1].nativeElement.clientWidth).toBe(600, 'width of 2th slide should be 400 (1200/3=400)');
      expect(deSlides[2].nativeElement.clientWidth).toBe(1200, 'width of 3th slide is twice bigger then common slide');
    });
  }));

  it(`should set custom width of slides [options]="{autoWidth: true}`, async(() => {
    const html = `
      <div style="width: 1200px; margin: auto">
        <owl-carousel-o [options]="{autoWidth: true}">
          <ng-template carouselSlide [width]="300">Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide [width]="500">Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));

    fixtureHost.whenStable().then(() => {
      fixtureHost.detectChanges();

      deSlides = deCarouselComponent.queryAll(By.css('.owl-item'));
      expect(deSlides[0].nativeElement.clientWidth).toBe(300, 'width of 1th slide is 300px');
      expect(deSlides[1].nativeElement.clientWidth).toBe(400, 'width of 2th slide should be 400 (1200/3=400)');
      expect(deSlides[2].nativeElement.clientWidth).toBe(500, 'width of 3th slide is 500px');
    });
  }));

  it(`shouldn\'t set custom width of slides if autoWidth=false [options]="{autoWidth: false}`, async(() => {
    const html = `
      <div style="width: 1200px; margin: auto">
        <owl-carousel-o [options]="{autoWidth: false}">
          <ng-template carouselSlide [width]="300">Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide [width]="500">Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));

    fixtureHost.whenStable().then(() => {
      fixtureHost.detectChanges();

      deSlides = deCarouselComponent.queryAll(By.css('.owl-item'));
      expect(deSlides[0].nativeElement.clientWidth).toBe(400, 'width of 1th slide is 400px');
      expect(deSlides[1].nativeElement.clientWidth).toBe(400, 'width of 2th slide should be 400 (1200/3=400)');
      expect(deSlides[2].nativeElement.clientWidth).toBe(400, 'width of 3th slide is 400px');
    });
  }));

  it(`should add navigation buttons  [options]="{nav: true}`, async(() => {
    const html = `
      <div style="width: 1200px; margin: auto">
        <owl-carousel-o [options]="{nav: true}">
          <ng-template carouselSlide>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide>Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
          <ng-template carouselSlide>Slide 5</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));

    fixtureHost.whenStable().then(() => {
      fixtureHost.detectChanges();

      deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
      expect(deNavButtons.length).toBe(2, '2 buttons');

      prevButton = deNavButtons[0].nativeElement;
      nextButton = deNavButtons[1].nativeElement;
      expect(prevButton.classList.contains('disabled')).toBeTruthy('prev button is disabled');
      expect(prevButton.innerHTML).toContain('prev', 'prev is text of prev button');
      expect(nextButton.innerHTML).toContain('next', 'next is text of next button');
    });
  }));

  it(`should set custom content on navigation buttons [options]="{nav: true, navText: [ '<i class=fa-chevron-left></i>', '<i class=fa-chevron-right></i>' ]}"`, async(() => {
    const html = `
      <div style="width: 1200px; margin: auto">
        <owl-carousel-o [options]="{ navText: [ '<i class=fa-chevron-left></i>', '<i class=fa-chevron-right></i>'], nav: true }">
          <ng-template carouselSlide>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide>Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
          <ng-template carouselSlide>Slide 5</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));

    fixtureHost.whenStable().then(() => {
      fixtureHost.detectChanges();

      deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
      prevButton = deNavButtons[0].nativeElement;
      nextButton = deNavButtons[1].nativeElement;
      expect(prevButton.firstElementChild.classList.contains('fa-chevron-left')).toBeTruthy('fa-chevron-left is class of child <i> Element of prev button');
      expect(nextButton.firstElementChild.classList.contains('fa-chevron-right')).toBeTruthy('fa-chevron-right is class of child <i> Element of next button');
    });
  }));

  it(`should render carousel without dots [options]="{dots: false}"`, async(() => {
    const html = `
      <div style="width: 1200px; margin: auto">
        <owl-carousel-o [options]="{ dots: false}">
          <ng-template carouselSlide>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide>Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
          <ng-template carouselSlide>Slide 5</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));

    fixtureHost.whenStable().then(() => {
      fixtureHost.detectChanges();

      deDotsWrapper = deCarouselComponent.query(By.css('.owl-dots'));
      expect(deDotsWrapper.nativeElement.classList.contains('disabled')).toBeTruthy('is disabled');
    });
  }));


  it(`should render dot for every x or additional slide (if items=3 and number of all slides is 5, there are 2 additional slides) [options]="{dotsEach: true}"`, async(() => {
    const html = `
      <div style="width: 1200px; margin: auto">
        <owl-carousel-o [options]="{ dotsEach: true}">
          <ng-template carouselSlide>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide>Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
          <ng-template carouselSlide>Slide 5</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));

    fixtureHost.whenStable().then(() => {
      fixtureHost.detectChanges();

      deDots = deCarouselComponent.queryAll(By.css('.owl-dots > .owl-dot'));
      expect(deDots.length).toBe(3, '3 dots');
    });
  }));

  it(`should render carousel with 3 dots [options]="{dotsEach: 4}"`, async(() => {
    const html = `
      <div style="width: 1200px; margin: auto">
        <owl-carousel-o [options]="{ dotsEach: 4}">
          <ng-template carouselSlide>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide>Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
          <ng-template carouselSlide>Slide 5</ng-template>
          <ng-template carouselSlide>Slide 6</ng-template>
          <ng-template carouselSlide>Slide 7</ng-template>
          <ng-template carouselSlide>Slide 8</ng-template>
          <ng-template carouselSlide>Slide 9</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));

    fixtureHost.whenStable().then(() => {
      fixtureHost.detectChanges();

      deDots = deCarouselComponent.queryAll(By.css('.owl-dots > .owl-dot'));
      expect(deDots.length).toBe(3, '3 dots');
    });
  }));


  it(`should render carousel with dots with text [options]="{dotsData: true}"`, async(() => {
    const html = `
      <div style="width: 1200px; margin: auto">
        <owl-carousel-o [options]="{ dotsData: true}">
          <ng-template carouselSlide dotContent="to Slide 1">Slide 1</ng-template>
          <ng-template carouselSlide dotContent="to Slide 2">Slide 2</ng-template>
          <ng-template carouselSlide dotContent="to Slide 3">Slide 3</ng-template>
          <ng-template carouselSlide dotContent="to Slide 4">Slide 4</ng-template>
          <ng-template carouselSlide dotContent="to Slide 5">Slide 5</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));

    fixtureHost.whenStable().then(() => {
      fixtureHost.detectChanges();

      deDots = deCarouselComponent.queryAll(By.css('.owl-dots > .owl-dot'));
      expect(deDots.length).toBe(5, '5 dots');
      expect(deDots[0].nativeElement.innerHTML).toContain('to Slide 1', 'to Slide 1');
      expect(deDots[0].nativeElement.classList.contains('owl-dot-text')).toBeTruthy('dot has .owl-dot-text');
      deDots = deCarouselComponent.queryAll(By.css('.owl-dots > .owl-dot.owl-dot-text'));
      expect(deDots.length).toBe(5, '5 dots');
    });
  }));

  it(`should render carousel with dots with html in [options]="{dotsData: true}"`, async(() => {
    const html = `
      <div style="width: 1200px; margin: auto">
        <owl-carousel-o [options]="{ dotsData: true}">
          <ng-template carouselSlide dotContent="<span class=innerDot>1<span>">Slide 1</ng-template>
          <ng-template carouselSlide dotContent="<span class=innerDot>1<span>">Slide 2</ng-template>
          <ng-template carouselSlide dotContent="<span class=innerDot>1<span>">Slide 3</ng-template>
          <ng-template carouselSlide dotContent="<span class=innerDot>1<span>">Slide 4</ng-template>
          <ng-template carouselSlide dotContent="<span class=innerDot>1<span>">Slide 5</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));

    fixtureHost.whenStable().then(() => {
      fixtureHost.detectChanges();

      deDots = deCarouselComponent.queryAll(By.css('.owl-dots > .owl-dot'));
      expect(deDots.length).toBe(5, '5 dots');
      const innerSpan = deDots[0].nativeElement.firstElementChild.firstElementChild;
      expect(innerSpan.classList.contains('innerDot')).toBeTruthy('dot contains <span class=innerDot>1<span>');
    });
  }));

  it(`should render carousel with dots with html in [options]="{dotsData: true}"`, async(() => {
    const html = `
      <div style="width: 1200px; margin: auto">
        <owl-carousel-o [options]="{ dotsData: true}">
          <ng-template carouselSlide>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide>Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
          <ng-template carouselSlide>Slide 5</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));

    fixtureHost.whenStable().then(() => {
      fixtureHost.detectChanges();

      deDots = deCarouselComponent.queryAll(By.css('.owl-dots > .owl-dot'));
      expect(deDots[0].nativeElement.firstElementChild.innerHTML).toBe('', '');

    });
  }));

  it(`should prev button be enabled when loop=true in [options]="{loop: true}"`, async(() => {
    const html = `
      <div style="width: 1200px; margin: auto">
        <owl-carousel-o [options]="{ loop: true}">
          <ng-template carouselSlide>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide>Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
          <ng-template carouselSlide>Slide 5</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));

    fixtureHost.whenStable().then(() => {
      fixtureHost.detectChanges();

      deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
      prevButton = deNavButtons[0].nativeElement;
      expect(prevButton.classList.contains('disabled')).toBeFalsy('prev button is enabled');

      deDots = deCarouselComponent.queryAll(By.css('.owl-dots > .owl-dot'));
      expect(deDots.length).toBe(2, '2 dots');

    });
  }));

  it(`should render carousel with the same number of dots as number of slides [options]="{center: true}"`, fakeAsync(() => {
    const html = `
      <div style="width: 1200px; margin: auto">
        <owl-carousel-o [options]="{ center: true}">
          <ng-template carouselSlide>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide>Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
          <ng-template carouselSlide>Slide 5</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    tick();
    fixtureHost.detectChanges();

    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));
    deDots = deCarouselComponent.queryAll(By.css('.owl-dots > .owl-dot'));
    expect(deDots.length).toBe(5, '5 dots');

    deDots[3].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 3', 'Slide 3');

    deDots[1].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 1', 'Slide 1');

    deDots[0].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 1', 'Slide 1');
  }));

  it(`should render 2 dots with [options]="{loop: true, merge: true}" and without defined [dataMerge]`, async(() => {
    const html = `
      <div style="width: 1200px; margin: auto">
        <owl-carousel-o [options]="{ loop: true, merge: true}">
          <ng-template carouselSlide>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide>Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
          <ng-template carouselSlide>Slide 5</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));

    fixtureHost.whenStable().then(() => {
      fixtureHost.detectChanges();

      deDots = deCarouselComponent.queryAll(By.css('.owl-dots > .owl-dot'));
      expect(deDots.length).toBe(2, '2 dots');

    });
  }));

  it(`should render 3 dots with [options]="{loop: true, merge: true}" and defined [dataMerge]; ; and move carousel correctly by clicking dots`, fakeAsync(() => {
    const html = `
      <div style="width: 1200px; margin: auto">
        <owl-carousel-o [options]="{ loop: true, merge: true}">
          <ng-template carouselSlide [dataMerge]='2'>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide [dataMerge]='3'>Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
          <ng-template carouselSlide [dataMerge]='2'>Slide 5</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));
    tick();
    fixtureHost.detectChanges();

    deDots = deCarouselComponent.queryAll(By.css('.owl-dots > .owl-dot'));
    // option items=3 (3 widths of slides must be visible).
    // Slide 1 takes 2 widths (w), slide 2 takes 1 w, slide 3 takes 3 w, slide 4 takes 1 w and slide 5 takes 2 w.
    // Together 2 + 1 + 3 + 1 + 2 = 9
    // 9 / 3 items = 3 pages = 3 dots
    expect(deDots.length).toBe(3, '3 dots');

    deDots[1].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides =  deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides.length).toBe(1, '1 active slide');
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 3', 'Slide 3');
    deDots = deCarouselComponent.queryAll(By.css('.owl-dots > .owl-dot'));
    expect(deDots[1].nativeElement.classList.contains('active')).toBeTruthy('2th dot is active');

    deDots[2].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides =  deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides.length).toBe(2, '2 active slides');
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 4', 'Slide 4');
    deDots = deCarouselComponent.queryAll(By.css('.owl-dots > .owl-dot'));
    expect(deDots[2].nativeElement.classList.contains('active')).toBeTruthy('3th dot is active');

    deDots[0].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides =  deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides.length).toBe(2, '2 active slides');
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 1', 'Slide 1');
    deDots = deCarouselComponent.queryAll(By.css('.owl-dots > .owl-dot'));
    expect(deDots[0].nativeElement.classList.contains('active')).toBeTruthy('1th dot is active');

    deDots[2].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides =  deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides.length).toBe(2, '2 active slides');
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 4', 'Slide 4');
    expect(deActiveSlides[0].nativeElement.classList.contains('cloned')).toBeTruthy('Slide 4 is cloned');
    expect(deActiveSlides[1].nativeElement.innerHTML).toContain('Slide 5', 'Slide 5');
    expect(deActiveSlides[1].nativeElement.classList.contains('cloned')).toBeTruthy('Slide 5 is cloned');

    deDots = deCarouselComponent.queryAll(By.css('.owl-dots > .owl-dot'));
    expect(deDots[2].nativeElement.classList.contains('active')).toBeTruthy('3th dot is active');

    deDots[0].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides =  deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides.length).toBe(2, '2 active slides');
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 1', 'Slide 1');
    deDots = deCarouselComponent.queryAll(By.css('.owl-dots > .owl-dot'));
    expect(deDots[0].nativeElement.classList.contains('active')).toBeTruthy('1th dot is active');
  }));

  it(`should render 3 dots with [options]="{merge: true}" and defined [dataMerge]; and move carousel correctly by clicking dots`, fakeAsync(() => {
    const html = `
      <div style="width: 1200px; margin: auto">
        <owl-carousel-o [options]="{ loop: true, merge: true}">
          <ng-template carouselSlide [dataMerge]='2'>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide [dataMerge]='3'>Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
          <ng-template carouselSlide [dataMerge]='2'>Slide 5</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));
    tick();
    fixtureHost.detectChanges();

    deDots = deCarouselComponent.queryAll(By.css('.owl-dots > .owl-dot'));
    // option items=3 (3 widths of slides must be visible).
    // Slide 1 takes 2 widths (w), slide 2 takes 1 w, slide 3 takes 3 w, slide 4 takes 1 w and slide 5 takes 2 w.
    // Together 2 + 1 + 3 + 1 + 2 = 9
    // 9 / 3 items = 3 pages = 3 dots
    expect(deDots.length).toBe(3, '3 dots');

    deDots[2].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides =  deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides.length).toBe(2, '2 active slides');
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 4', 'Slide 4');
    expect(deActiveSlides[1].nativeElement.innerHTML).toContain('Slide 5', 'Slide 5');

    deDots = deCarouselComponent.queryAll(By.css('.owl-dots > .owl-dot'));
    expect(deDots[2].nativeElement.classList.contains('active')).toBeTruthy('3th dot is active');

    deDots[0].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides =  deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides.length).toBe(2, '2 active slides');
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 1', 'Slide 1');
    deDots = deCarouselComponent.queryAll(By.css('.owl-dots > .owl-dot'));
    expect(deDots[0].nativeElement.classList.contains('active')).toBeTruthy('1th dot is active');
  }));

  it(`should render 4 dots with [options]="{autoWidth: true}" and undefined [width]`, async(() => {
    const html = `
      <div style="width: 920px; margin: auto">
        <owl-carousel-o [options]="{ autoWidth: true}">
          <ng-template carouselSlide>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide>Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
          <ng-template carouselSlide>Slide 5</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));

    fixtureHost.whenStable().then(() => {
      fixtureHost.detectChanges();

      deDots = deCarouselComponent.queryAll(By.css('.owl-dots > .owl-dot'));
      expect(deDots.length).toBe(4, '4 dots');

    });
  }));

  it(`should render 4 dots with [options]="{autoWidth: true}" and defined [width]; and move carousel by clicking on dots`, fakeAsync(() => {
    const html = `
      <div style="width: 920px; margin: auto">
        <owl-carousel-o [options]="{ autoWidth: true}">
          <ng-template carouselSlide [width]="300">Slide 1</ng-template>
          <ng-template carouselSlide [width]="500">Slide 2</ng-template>
          <ng-template carouselSlide >Slide 3</ng-template>
          <ng-template carouselSlide [width]="450">Slide 4</ng-template>
          <ng-template carouselSlide>Slide 5</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));
    tick();
    fixtureHost.detectChanges();

    deDots = deCarouselComponent.queryAll(By.css('.owl-dots > .owl-dot'));
    expect(deDots.length).toBe(4, '4 dots');

    deDots[3].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides.length).toBe(2, '2 active slides');
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 4', 'Slide 4');

    deDots[1].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 2', 'Slide 2');
  }));

  it(`should render 5 dots with [options]="{autoWidth: true, loop: true}" and defined [width]; and move carousel by clicking on dots`, fakeAsync(() => {
    const html = `
      <div style="width: 920px; margin: auto">
        <owl-carousel-o [options]="{ autoWidth: true, loop: true}">
          <ng-template carouselSlide [width]="300">Slide 1</ng-template>
          <ng-template carouselSlide [width]="500">Slide 2</ng-template>
          <ng-template carouselSlide >Slide 3</ng-template>
          <ng-template carouselSlide [width]="450">Slide 4</ng-template>
          <ng-template carouselSlide>Slide 5</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    tick();
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));

    fixtureHost.detectChanges();

    deDots = deCarouselComponent.queryAll(By.css('.owl-dots > .owl-dot'));
    expect(deDots.length).toBe(5, '5 dots');

    deDots[3].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 4', 'Slide 4');
    expect(deActiveSlides[0].nativeElement.classList.contains('cloned')).toBeTruthy('Slide 4 is cloned');

    deDots[0].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 1', 'Slide 1');
    expect(deActiveSlides[0].nativeElement.classList.contains('cloned')).toBeFalsy('Slide 1 isn\'t cloned');

    deDots[2].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 3', 'Slide 3');
    expect(deActiveSlides[0].nativeElement.classList.contains('cloned')).toBeFalsy('Slide 3 isn\'t cloned');

    deDots[4].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 5', 'Slide 5');
    expect(deActiveSlides[0].nativeElement.classList.contains('cloned')).toBeFalsy('Slide 5 isn\'t cloned');
    expect(deActiveSlides[1].nativeElement.innerHTML).toContain('Slide 1', 'Slide 1');
    expect(deActiveSlides[1].nativeElement.classList.contains('cloned')).toBeTruthy('Slide 1 is cloned');
  }));

  it(`should render 2 dots and make next nav button disabled; [options]="{startPosition: 4, nav: true}"`, async(() => {
    const html = `
      <div style="width: 920px; margin: auto">
        <owl-carousel-o [options]="{ startPosition: 4, nav: true}">
          <ng-template carouselSlide>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide >Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
          <ng-template carouselSlide>Slide 5</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));

    fixtureHost.whenStable().then(() => {
      fixtureHost.detectChanges();

      deDots = deCarouselComponent.queryAll(By.css('.owl-dots > .owl-dot'));
      expect(deDots.length).toBe(2, '2 dots');
      expect(deDots[1].nativeElement.classList.contains('active')).toBeTruthy('last dot has .active');

      nextButton = deCarouselComponent.query(By.css('.owl-nav > .owl-next')).nativeElement;
      expect(nextButton.classList.contains('disabled')).toBeTruthy('next nav button has class .disabled')
    });
  }));

  it(`should render 2 dots and make next nav button disabled; [options]="{startPosition: 4, nav: true, rewind: true}"`, async(() => {
    const html = `
      <div style="width: 920px; margin: auto">
        <owl-carousel-o [options]="{ startPosition: 4, nav: true, rewind: true}">
          <ng-template carouselSlide>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide >Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
          <ng-template carouselSlide>Slide 5</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));

    fixtureHost.whenStable().then(() => {
      fixtureHost.detectChanges();

      deDots = deCarouselComponent.queryAll(By.css('.owl-dots > .owl-dot'));
      expect(deDots.length).toBe(2, '2 dots');
      expect(deDots[1].nativeElement.classList.contains('active')).toBeTruthy('last dot has .active');

      nextButton = deCarouselComponent.query(By.css('.owl-nav > .owl-next')).nativeElement;
      expect(nextButton.classList.contains('disabled')).toBeFalsy('next nav button hasn\'t class .disabled');
    });
  }));

  it('should move stage left on 2 slide after 2 clicking next button and move back after 2 clicks on prev button', fakeAsync(() => {
    const html = `
      <div style="width: 1200px; margin: auto">
        <owl-carousel-o [options]="{nav: true}">
          <ng-template carouselSlide>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide>Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
          <ng-template carouselSlide>Slide 5</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));
    tick();
    fixtureHost.detectChanges();

    deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
    nextButton = deCarouselComponent.query(By.css('.owl-nav > .owl-next')).nativeElement;
    prevButton = deCarouselComponent.query(By.css('.owl-nav > .owl-prev')).nativeElement;

    carouselService = deCarouselComponent.injector.get(CarouselService);

    deNavButtons[1].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deNavButtons[1].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();
    expect(nextButton.classList.contains('disabled')).toBeTruthy('next nav button has class .disabled')

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 3', 'Slide 3');

    deDots = deCarouselComponent.queryAll(By.css('.owl-dots > .owl-dot'));
    expect(deDots[1].nativeElement.classList.contains('active')).toBeTruthy('last dot got .active');

  }));


  it('should move stage left on 2 slide after 2 clicking next button and move back after 2 clicks on prev button', fakeAsync(() => {
    const html = `
      <div style="width: 1200px; margin: auto">
        <owl-carousel-o [options]="{nav: true, rewind: true}">
          <ng-template carouselSlide>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide>Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
          <ng-template carouselSlide>Slide 5</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));
    tick();
    fixtureHost.detectChanges();

    deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
    nextButton = deCarouselComponent.query(By.css('.owl-nav > .owl-next')).nativeElement;
    prevButton = deCarouselComponent.query(By.css('.owl-nav > .owl-prev')).nativeElement;

    carouselService = deCarouselComponent.injector.get(CarouselService);

    deNavButtons[1].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deNavButtons[1].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();
    expect(nextButton.classList.contains('disabled')).toBeFalsy('next nav button hasn\'t class .disabled')

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 3', 'Slide 3');

    deDots = deCarouselComponent.queryAll(By.css('.owl-dots > .owl-dot'));
    expect(deDots[1].nativeElement.classList.contains('active')).toBeTruthy('last dot got .active');

  }));

  it('should loop stage movement by using nav prev-next buttons [options]="{nav: true, loop: true}"', fakeAsync(() => {
    const html = `
      <div style="width: 1200px; margin: auto">
        <owl-carousel-o [options]="{nav: true, loop: true}">
          <ng-template carouselSlide>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide>Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
          <ng-template carouselSlide>Slide 5</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));
    tick();
    fixtureHost.detectChanges();

    deSlides = deCarouselComponent.queryAll(By.css('.owl-item'));
    expect(deSlides.length).toBe(11, '11 slides: 3 cloned + 5 origin + 3 cloned ');

    deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
    deDots = deCarouselComponent.queryAll(By.css('.owl-dots > .owl-dot'));

    // move carousel left
    deNavButtons[0].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();
    expect(deSlides[2].nativeElement.classList.contains('active')).toBeTruthy('3th slide is active');
    expect(deSlides[2].nativeElement.classList.contains('cloned')).toBeTruthy('3th slide is active and cloned');
    expect(deDots[1].nativeElement.classList.contains('active')).toBeTruthy('2th dot is active');

    deNavButtons[0].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();
    expect(deSlides[6].nativeElement.classList.contains('active')).toBeTruthy('6th slide at all and 4th from origin slides is active');
    expect(deSlides[6].nativeElement.innerHTML).toContain('Slide 4');
    expect(deSlides[8].nativeElement.classList.contains('active')).toBeTruthy('8th slide which is clone of 1th origin slide is active');
    expect(deSlides[8].nativeElement.innerHTML).toContain('Slide 1');
    expect(deDots[1].nativeElement.classList.contains('active')).toBeTruthy('2th dot is active');

    // 5 clicks on prev button in order to reach the Slide 1 and check job of loop
    deNavButtons[0].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deNavButtons[0].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();
    expect(deDots[0].nativeElement.classList.contains('active')).toBeTruthy('1th dot is active');

    deNavButtons[0].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deNavButtons[0].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deNavButtons[0].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();
    expect(deSlides[6].nativeElement.classList.contains('active')).toBeTruthy('6th slide at all and 4th from origin slides is active');
    expect(deSlides[6].nativeElement.innerHTML).toContain('Slide 4');
    expect(deSlides[8].nativeElement.classList.contains('active')).toBeTruthy('8th slide which is clone of 1th origin slide is active');
    expect(deSlides[8].nativeElement.innerHTML).toContain('Slide 1');
    expect(deDots[1].nativeElement.classList.contains('active')).toBeTruthy('2th dot is active');

    // move carousel right
    deNavButtons[1].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 5', '5th origin slide is active');
    expect(deActiveSlides[0].nativeElement.classList.contains('cloned')).toBeFalsy('1th active slide is origin and not cloned');
    expect(deActiveSlides[1].nativeElement.classList.contains('cloned')).toBeTruthy('2th active slide is cloned');
    expect(deActiveSlides[1].nativeElement.innerHTML).toContain('Slide 1', '2th active slide is the clone of 1th origin slide');
    expect(deActiveSlides[2].nativeElement.classList.contains('cloned')).toBeTruthy('3th active slide is cloned');
    expect(deActiveSlides[2].nativeElement.innerHTML).toContain('Slide 2', '3th active slide is the clone of 2th origin slide');
    expect(deDots[1].nativeElement.classList.contains('active')).toBeTruthy('2th dot is active');

    deNavButtons[1].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    // we reached the start position of carousel
    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 1', '1th origin slide is active');
    expect(deActiveSlides[0].nativeElement.classList.contains('cloned')).toBeFalsy('1th active slide is origin and not cloned');
    expect(deActiveSlides[1].nativeElement.innerHTML).toContain('Slide 2', '2th origin slide is active');
    expect(deActiveSlides[1].nativeElement.classList.contains('cloned')).toBeFalsy('2th active slide is origin and not cloned');
    expect(deActiveSlides[2].nativeElement.innerHTML).toContain('Slide 3', '3th origin slide is active');
    expect(deActiveSlides[2].nativeElement.classList.contains('cloned')).toBeFalsy('3th active slide is origin and not cloned');
    expect(deDots[0].nativeElement.classList.contains('active')).toBeTruthy('2th dot is active');

    // 5 clicks on next button in order to reach the Slide 1 and check job of loop
    deNavButtons[0].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deNavButtons[0].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deNavButtons[0].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deNavButtons[0].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deNavButtons[0].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();
    // we reached the start position of carousel
    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 1', '1th origin slide is active');
    expect(deActiveSlides[0].nativeElement.classList.contains('cloned')).toBeFalsy('1th active slide is origin and not cloned');
    expect(deActiveSlides[1].nativeElement.innerHTML).toContain('Slide 2', '2th origin slide is active');
    expect(deActiveSlides[1].nativeElement.classList.contains('cloned')).toBeFalsy('2th active slide is origin and not cloned');
    expect(deActiveSlides[2].nativeElement.innerHTML).toContain('Slide 3', '3th origin slide is active');
    expect(deActiveSlides[2].nativeElement.classList.contains('cloned')).toBeFalsy('3th active slide is origin and not cloned');
    expect(deDots[0].nativeElement.classList.contains('active')).toBeTruthy('2th dot is active');

  }));

  it(`should change the centered slide after clicking prev and next buttons; [options]="{nav: true, center: true, loop: true}"`, fakeAsync(() => {
    const html = `
      <div style="width: 920px; margin: auto">
        <owl-carousel-o [options]="{ nav: true, center: true, loop: true}">
          <ng-template carouselSlide>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide>Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
          <ng-template carouselSlide>Slide 5</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    tick();
    fixtureHost.detectChanges();

    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));
    deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
    deDots = deCarouselComponent.queryAll(By.css('.owl-dots > .owl-dot'));

    let centeredSlide: HTMLElement = deCarouselComponent.query(By.css('.owl-item.active.center')).nativeElement;
    expect(centeredSlide.innerHTML).toContain('Slide 1', 'Slide 1 is centered');
    expect(deDots[0].nativeElement.classList.contains('active')).toBeTruthy('first dot has .active');

    deNavButtons[0].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    centeredSlide = deCarouselComponent.query(By.css('.owl-item.active.center')).nativeElement;
    expect(centeredSlide.innerHTML).toContain('Slide 5', 'Slide 5 is centered');
    expect(deDots[4].nativeElement.classList.contains('active')).toBeTruthy('last dot has .active');

    deNavButtons[1].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    centeredSlide = deCarouselComponent.query(By.css('.owl-item.active.center')).nativeElement;
    expect(centeredSlide.innerHTML).toContain('Slide 1', 'Slide 1 is centered');
    expect(deDots[0].nativeElement.classList.contains('active')).toBeTruthy('1th dot has .active');

  }));

  it(`should rewind carousel to first slide when last one is visible and vise versa; [options]="{nav: true, rewind: true}"`, fakeAsync(() => {
    const html = `
      <div style="width: 920px; margin: auto">
        <owl-carousel-o [options]="{ nav: true, rewind: true}">
          <ng-template carouselSlide>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide>Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
          <ng-template carouselSlide>Slide 5</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    tick();
    fixtureHost.detectChanges();

    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));
    deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
    deDots = deCarouselComponent.queryAll(By.css('.owl-dots > .owl-dot'));
    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 1', '1th slide is active');
    expect(deDots[0].nativeElement.classList.contains('active')).toBeTruthy('1th dot has .active');

    deNavButtons[0].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[2].nativeElement.innerHTML).toContain('Slide 5', '5th slide is active');
    expect(deDots[1].nativeElement.classList.contains('active')).toBeTruthy('2th dot has .active');

    deNavButtons[1].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 1', '1th slide is active');
    expect(deDots[0].nativeElement.classList.contains('active')).toBeTruthy('1th dot has .active');

  }));

  it(`should change number of active slides according to number of visible slide with [options]="{merge: true, nav: true}`, fakeAsync(() => {
    const html = `
      <div style="width: 1200px; margin: auto">
        <owl-carousel-o [options]="{merge: true, nav: true}">
          <ng-template carouselSlide [dataMerge]="2">Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide [dataMerge]="3">Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    tick();
    fixtureHost.detectChanges();

    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));
    deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
    deDots = deCarouselComponent.queryAll(By.css('.owl-dots > .owl-dot'));
    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));

    expect(deActiveSlides.length).toBe(2, '2 active slides');
    expect(deDots.length).toBe(3, '3 dots');

    deNavButtons[1].triggerEventHandler('click', null);
    tick();
    deNavButtons[1].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides.length).toBe(1, '1 active slide');
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 3', 'Slide 3');
    expect(deDots[1].nativeElement.classList.contains('active')).toBeTruthy('3th dot is active');
  }));

  it(`should change number of active slides according to number of visible slide with [options]="{merge: true, nav: true, loop: true}`, fakeAsync(() => {
    const html = `
      <div style="width: 1200px; margin: auto">
        <owl-carousel-o [options]="{merge: true, nav: true, loop: true}">
          <ng-template carouselSlide [dataMerge]="2">Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide [dataMerge]="3">Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    tick();
    fixtureHost.detectChanges();

    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));
    deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
    deDots = deCarouselComponent.queryAll(By.css('.owl-dots > .owl-dot'));
    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));

    expect(deActiveSlides.length).toBe(2, '2 active slides');
    expect(deDots.length).toBe(3, '3 dots');

    deNavButtons[1].triggerEventHandler('click', null);
    tick();
    deNavButtons[1].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides.length).toBe(1, '1 active slide');
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 3', 'Slide 3');
    expect(deDots[1].nativeElement.classList.contains('active')).toBeTruthy('2th dot is active');
  }));

  it(`should move carousel right when slides have different widths (translation is the number of pixels which equals the width of first active slide) [options]="{loop: true, autoWidth: true}`, fakeAsync(() => {
    const html = `
      <div style="width: 900px; margin: auto">
        <owl-carousel-o [options]="{loop: true, autoWidth: true}">
          <ng-template carouselSlide [width]="300">Slide 1</ng-template>
          <ng-template carouselSlide [width]="500">Slide 2</ng-template>
          <ng-template carouselSlide>Slide 3</ng-template>
          <ng-template carouselSlide [width]="650">Slide 4</ng-template>
          <ng-template carouselSlide>Slide 5</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    tick();
    fixtureHost.detectChanges();

    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));
    deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
    deDots = deCarouselComponent.queryAll(By.css('.owl-dots > .owl-dot'));
    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));

    expect(deActiveSlides.length).toBe(3, '3 active slides');
    expect(deDots.length).toBe(5, '5 dots');

    deNavButtons[1].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides.length).toBe(3, '3 active slides');
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 2', 'Slide 2');
    expect(deDots[1].nativeElement.classList.contains('active')).toBeTruthy('2th dot is active');

    deNavButtons[1].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides.length).toBe(2, '2 active slide');
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 3', 'Slide 3');
    expect(deDots[2].nativeElement.classList.contains('active')).toBeTruthy('3th dot is active');
  }));

  it(`should move carousel on 2 slides; [options]="{nav: true, slideBy: 2}"`, fakeAsync(() => {
    const html = `
      <div style="width: 920px; margin: auto">
        <owl-carousel-o [options]="{ nav: true, slideBy: 2}">
          <ng-template carouselSlide>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide>Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
          <ng-template carouselSlide>Slide 5</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    tick();
    fixtureHost.detectChanges();

    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));
    deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
    deDots = deCarouselComponent.queryAll(By.css('.owl-dots > .owl-dot'));
    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 1', '1th slide is active');
    expect(deDots[0].nativeElement.classList.contains('active')).toBeTruthy('1th dot has .active');
    expect(deDots.length).toBe(2, '2 dots');

    deNavButtons[1].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 3', '3th slide is active');
    expect(deDots[1].nativeElement.classList.contains('active')).toBeTruthy('1th dot has .active');

  }));

  it(`should move carousel on 2 slides; [options]="{nav: true, slideBy: 2, loop: true}"`, fakeAsync(() => {
    const html = `
      <div style="width: 920px; margin: auto">
        <owl-carousel-o [options]="{ nav: true, slideBy: 2, loop: true}">
          <ng-template carouselSlide>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide>Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
          <ng-template carouselSlide>Slide 5</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    tick();
    fixtureHost.detectChanges();

    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));
    deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
    deDots = deCarouselComponent.queryAll(By.css('.owl-dots > .owl-dot'));
    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 1', '1th slide is active');
    expect(deDots[0].nativeElement.classList.contains('active')).toBeTruthy('1th dot has .active');
    expect(deDots.length).toBe(2, '2 dots');

    deNavButtons[1].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 3', '3th slide is active');
    expect(deDots[0].nativeElement.classList.contains('active')).toBeTruthy('1th dot has .active');

    // get back to 1th slide
    deNavButtons[0].triggerEventHandler('click', null);
    tick();
    // move to 4th and 5th slides
    deNavButtons[0].triggerEventHandler('click', null);
    tick();

    fixtureHost.detectChanges();
    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 4', '4th slide is active');
    expect(deActiveSlides[0].nativeElement.classList.contains('cloned')).toBeTruthy('Slide 4 is cloned')
    expect(deDots[1].nativeElement.classList.contains('active')).toBeTruthy('1th dot has .active');
  }));

  it(`should move carousel by pages; [options]="{nav: true, slideBy: 'page'}"`, fakeAsync(() => {
    const html = `
      <div style="width: 920px; margin: auto">
        <owl-carousel-o [options]="{ nav: true, slideBy: 'page'}">
          <ng-template carouselSlide>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide>Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
          <ng-template carouselSlide>Slide 5</ng-template>
          <ng-template carouselSlide>Slide 6</ng-template>
          <ng-template carouselSlide>Slide 7</ng-template>
          <ng-template carouselSlide>Slide 8</ng-template>
          <ng-template carouselSlide>Slide 9</ng-template>
          <ng-template carouselSlide>Slide 10</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    tick();
    fixtureHost.detectChanges();

    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));
    deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
    deDots = deCarouselComponent.queryAll(By.css('.owl-dots > .owl-dot'));
    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));

    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 1', 'Slide 1');
    expect(deNavButtons[0].nativeElement.classList.contains('disabled')).toBeTruthy('prev button is disabled; however click on it rewinds the carousel to the end');
    expect(deDots.length).toBe(4, '4 dots = 4 pages');
    expect(deDots[0].nativeElement.classList.contains('active')).toBeTruthy('1th dot is active');

    deNavButtons[1].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 4', 'Slide 4');
    expect(deDots[1].nativeElement.classList.contains('active')).toBeTruthy('2th dot is active');
    expect(deNavButtons[0].nativeElement.classList.contains('disabled')).toBeFalsy('prev button is enabled');

    deNavButtons[1].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 7', 'Slide 7');
    expect(deDots[2].nativeElement.classList.contains('active')).toBeTruthy('3th dot is active');

    // rewind to the end of carousel
    deNavButtons[1].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 8', 'Slide 8');
    expect(deDots[3].nativeElement.classList.contains('active')).toBeTruthy('1th dot is active');
    expect(deNavButtons[1].nativeElement.classList.contains('disabled')).toBeTruthy('next button is disabled; however click on it rewinds the carousel to the begin without loop effect');

    deNavButtons[1].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 1', 'Slide 1');
    expect(deDots[0].nativeElement.classList.contains('active')).toBeTruthy('1th dot is active');
    expect(deNavButtons[0].nativeElement.classList.contains('disabled')).toBeTruthy('prev button is disabled; however click on it rewinds the carousel to the end');

    deNavButtons[0].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();
    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 8', 'Slide 8');
    expect(deDots[3].nativeElement.classList.contains('active')).toBeTruthy('1th dot is active');
    expect(deNavButtons[1].nativeElement.classList.contains('disabled')).toBeTruthy('next button is disabled; however click on it rewinds the carousel to the begin');
  }));

  it(`should move carousel by pages; [options]="{nav: true, slideBy: 'page', rewind: true}"`, fakeAsync(() => {
    const html = `
      <div style="width: 920px; margin: auto">
        <owl-carousel-o [options]="{ nav: true, slideBy: 'page', rewind: true}">
          <ng-template carouselSlide>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide>Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
          <ng-template carouselSlide>Slide 5</ng-template>
          <ng-template carouselSlide>Slide 6</ng-template>
          <ng-template carouselSlide>Slide 7</ng-template>
          <ng-template carouselSlide>Slide 8</ng-template>
          <ng-template carouselSlide>Slide 9</ng-template>
          <ng-template carouselSlide>Slide 10</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    tick();
    fixtureHost.detectChanges();

    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));
    deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
    deDots = deCarouselComponent.queryAll(By.css('.owl-dots > .owl-dot'));
    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));

    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 1', 'Slide 1');
    expect(deNavButtons[0].nativeElement.classList.contains('disabled')).toBeFalsy('prev button is enabled; click on it rewinds the carousel to the end');
    expect(deDots.length).toBe(4, '4 dots = 4 pages');
    expect(deDots[0].nativeElement.classList.contains('active')).toBeTruthy('1th dot is active');

    deNavButtons[1].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 4', 'Slide 4');
    expect(deDots[1].nativeElement.classList.contains('active')).toBeTruthy('2th dot is active');
    expect(deNavButtons[0].nativeElement.classList.contains('disabled')).toBeFalsy('prev button is enabled');

    deNavButtons[1].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 7', 'Slide 7');
    expect(deDots[2].nativeElement.classList.contains('active')).toBeTruthy('3th dot is active');

    // rewind to the end of carousel
    deNavButtons[1].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 8', 'Slide 8');
    expect(deDots[3].nativeElement.classList.contains('active')).toBeTruthy('1th dot is active');
    expect(deNavButtons[1].nativeElement.classList.contains('disabled')).toBeFalsy('next button is enabled; click on it rewinds the carousel to the begin without loop effect');

    deNavButtons[1].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 1', 'Slide 1');
    expect(deDots[0].nativeElement.classList.contains('active')).toBeTruthy('1th dot is active');
    expect(deNavButtons[0].nativeElement.classList.contains('disabled')).toBeFalsy('prev button is disabled; click on it rewinds the carousel to the end');

    deNavButtons[0].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();
    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 8', 'Slide 8');
    expect(deDots[3].nativeElement.classList.contains('active')).toBeTruthy('1th dot is active');
    expect(deNavButtons[1].nativeElement.classList.contains('disabled')).toBeFalsy('next button is disabled; click on it rewinds the carousel to the begin');
  }));

  it(`should move carousel by pages; [options]="{nav: true, slideBy: 'page', loop: true}"`, fakeAsync(() => {
    const html = `
      <div style="width: 920px; margin: auto">
        <owl-carousel-o [options]="{ nav: true, slideBy: 'page', loop: true}">
          <ng-template carouselSlide>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide>Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
          <ng-template carouselSlide>Slide 5</ng-template>
          <ng-template carouselSlide>Slide 6</ng-template>
          <ng-template carouselSlide>Slide 7</ng-template>
          <ng-template carouselSlide>Slide 8</ng-template>
          <ng-template carouselSlide>Slide 9</ng-template>
          <ng-template carouselSlide>Slide 10</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    tick();
    fixtureHost.detectChanges();

    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));
    deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
    deDots = deCarouselComponent.queryAll(By.css('.owl-dots > .owl-dot'));
    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));

    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 1', 'Slide 1');
    expect(deNavButtons[0].nativeElement.classList.contains('disabled')).toBeFalsy('prev button is enabled');
    expect(deDots.length).toBe(4, '4 dots = 4 pages');
    expect(deDots[0].nativeElement.classList.contains('active')).toBeTruthy('1th dot is active');

    deNavButtons[1].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 4', 'Slide 4');
    expect(deDots[1].nativeElement.classList.contains('active')).toBeTruthy('2th dot is active');
    expect(deNavButtons[0].nativeElement.classList.contains('disabled')).toBeFalsy('prev button is enabled');
    expect(deDots[1].nativeElement.classList.contains('active')).toBeTruthy('2th dot is active');

    // rewind to the end of carousel
    deNavButtons[1].triggerEventHandler('click', null);
    tick();
    deNavButtons[1].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 10', 'Slide 10');
    expect(deActiveSlides[1].nativeElement.innerHTML).toContain('Slide 1', 'Slide 1');
    expect(deActiveSlides[1].nativeElement.classList.contains('cloned')).toBeTruthy('Slide 1 which is after Slide 10 is cloned');
    expect(deActiveSlides[2].nativeElement.innerHTML).toContain('Slide 2', 'Slide 2');
    expect(deActiveSlides[2].nativeElement.classList.contains('cloned')).toBeTruthy('Slide 2 which is after Slide 10 is cloned');
    expect(deDots[3].nativeElement.classList.contains('active')).toBeTruthy('4th dot is active');

    // the carousel will get back to its initial position after click on next button
    deNavButtons[1].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 1', 'Slide 1');
    expect(deActiveSlides[1].nativeElement.innerHTML).toContain('Slide 2', 'Slide 2');
    expect(deActiveSlides[2].nativeElement.innerHTML).toContain('Slide 3', 'Slide 3');
    expect(deDots[0].nativeElement.classList.contains('active')).toBeTruthy('1th dot is active');

    const deCloned: DebugElement[] = deCarouselComponent.queryAll(By.css('.owl-item.active.cloned'));
    expect(deCloned.length).toBe(0, '0 all active items aren\'t cloned');

    deNavButtons[0].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();
    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 10', 'Slide 10');
    expect(deActiveSlides[0].nativeElement.classList.contains('cloned')).toBeTruthy('Slide 10 which is before Slide 1 is cloned');
    expect(deActiveSlides[1].nativeElement.innerHTML).toContain('Slide 1', 'Slide 1');
    expect(deActiveSlides[1].nativeElement.classList.contains('cloned')).toBeFalsy('Slide 1 isn\'t cloned');
    expect(deDots[3].nativeElement.classList.contains('active')).toBeTruthy('4th dot is active');

  }));

  it('should set speed of moving carousel after clicking on prev or next button [options]="{nav: true, navSpeed: 500}"', fakeAsync(() => {
    const html = `
      <div style="width: 1200px; margin: auto">
        <owl-carousel-o [options]="{nav: true, navSpeed: 500}">
          <ng-template carouselSlide>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide>Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
          <ng-template carouselSlide>Slide 5</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));
    tick();

    fixtureHost.detectChanges();
    deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
    deStage = deCarouselComponent.query(By.css('.owl-stage'));

    expect(getComputedStyle(deStage.nativeElement).transitionDuration).toBe('0s', '0s transition');

    deNavButtons[1].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deStage = deCarouselComponent.query(By.css('.owl-stage'));
    expect(getComputedStyle(deStage.nativeElement).transitionDuration).toBe('0.5s', '0.5s transition');

  }));

  it('should move carousel onto 1 slide [options]="{nav: true, dotsEach: true}"', fakeAsync(() => {
    const html = `
      <div style="width: 1200px; margin: auto">
        <owl-carousel-o [options]="{nav: true, dotsEach: true}">
          <ng-template carouselSlide>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide>Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
          <ng-template carouselSlide>Slide 5</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));
    tick();

    fixtureHost.detectChanges();
    deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
    deDots = deCarouselComponent.queryAll(By.css('.owl-dots > .owl-dot'));
    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));

    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 1', 'Slide 1');
    expect(deNavButtons[0].nativeElement.classList.contains('disabled')).toBeTruthy('prev button is disabled');
    expect(deDots.length).toBe(3, '3 dots = 3 pages');
    expect(deDots[0].nativeElement.classList.contains('active')).toBeTruthy('1th dot is active');

    deDots[1].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 2', 'Slide 2');

    deDots[2].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 3', 'Slide 3');
    expect(deNavButtons[1].nativeElement.classList.contains('disabled')).toBeTruthy('next button is disabled');

    deDots[0].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 1', 'Slide 1');

  }));

  it('should move carousel onto 1 slide [options]="{nav: true, dotsEach: true, loop: true}"', fakeAsync(() => {
    const html = `
      <div style="width: 1200px; margin: auto">
        <owl-carousel-o [options]="{nav: true, dotsEach: true, loop: true}">
          <ng-template carouselSlide>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide>Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
          <ng-template carouselSlide>Slide 5</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));
    tick();

    fixtureHost.detectChanges();
    deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
    deDots = deCarouselComponent.queryAll(By.css('.owl-dots > .owl-dot'));
    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));

    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 1', 'Slide 1');
    expect(deDots.length).toBe(5, '5 dots = 5 pages');
    expect(deDots[0].nativeElement.classList.contains('active')).toBeTruthy('1th dot is active');

    deDots[1].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 2', 'Slide 2');

    deDots[2].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 3', 'Slide 3');

    deDots[4].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 5', 'Slide 5');
    expect(deActiveSlides[1].nativeElement.innerHTML).toContain('Slide 1', 'Slide 1');
    expect(deActiveSlides[1].nativeElement.classList.contains('cloned')).toBeTruthy('Slide 1 is cloned');
    expect(deActiveSlides[2].nativeElement.innerHTML).toContain('Slide 2', 'Slide 2');
    expect(deActiveSlides[2].nativeElement.classList.contains('cloned')).toBeTruthy('Slide 2 is cloned');

    deDots[1].triggerEventHandler('click', null);
    tick();
    deDots[4].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 5', 'Slide 5');
    expect(deActiveSlides[0].nativeElement.classList.contains('cloned')).toBeTruthy('Slide 5 is cloned');
    expect(deActiveSlides[1].nativeElement.innerHTML).toContain('Slide 1', 'Slide 1');
    expect(deActiveSlides[1].nativeElement.classList.contains('cloned')).toBeFalsy('Slide 2 isn\'t cloned');
    expect(deActiveSlides[2].nativeElement.innerHTML).toContain('Slide 2', 'Slide 2');

    deDots[0].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 1', 'Slide 1');
    expect(deActiveSlides[0].nativeElement.classList.contains('cloned')).toBeFalsy('Slide 1 isn\'t cloned');

    deDots[3].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 4', 'Slide 4');
    expect(deActiveSlides[0].nativeElement.classList.contains('cloned')).toBeTruthy('Slide 4 is cloned');
    expect(deActiveSlides[1].nativeElement.innerHTML).toContain('Slide 5', 'Slide 5');
    expect(deActiveSlides[1].nativeElement.classList.contains('cloned')).toBeTruthy('Slide 5 is cloned');
    expect(deActiveSlides[2].nativeElement.innerHTML).toContain('Slide 1', 'Slide 1');
    expect(deActiveSlides[2].nativeElement.classList.contains('cloned')).toBeFalsy('Slide 1 isn\'t cloned');

    deDots[4].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 5', 'Slide 5');

    const deActiveClonedItems: DebugElement[] = deCarouselComponent.queryAll(By.css('.owl-item.active.cloned'));
    expect(deActiveClonedItems.length).toBe(2, '2 cloned active slides');
  }));

  it('should move carousel onto 1 slide [options]="{nav: true, dotsEach: 4}"', fakeAsync(() => {
    const html = `
      <div style="width: 1200px; margin: auto">
        <owl-carousel-o [options]="{nav: true, dotsEach: 4}">
          <ng-template carouselSlide>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide>Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
          <ng-template carouselSlide>Slide 5</ng-template>
          <ng-template carouselSlide>Slide 6</ng-template>
          <ng-template carouselSlide>Slide 7</ng-template>
          <ng-template carouselSlide>Slide 8</ng-template>
          <ng-template carouselSlide>Slide 9</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));
    tick();

    fixtureHost.detectChanges();
    deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
    deDots = deCarouselComponent.queryAll(By.css('.owl-dots > .owl-dot'));
    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));

    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 1', 'Slide 1');
    expect(deNavButtons[0].nativeElement.classList.contains('disabled')).toBeTruthy('prev button is disabled');
    expect(deDots.length).toBe(3, '3 dots = 3 pages');
    expect(deDots[0].nativeElement.classList.contains('active')).toBeTruthy('1th dot is active');

    deDots[1].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 5', 'Slide 5');

    deDots[2].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 7', 'Slide 7');
    expect(deNavButtons[1].nativeElement.classList.contains('disabled')).toBeTruthy('next button is disabled');

  }));

  it('should set speed of moving carousel after clicking on dots [options]="{dotsSpeed: 500}"', fakeAsync(() => {
    const html = `
      <div style="width: 1200px; margin: auto">
        <owl-carousel-o [options]="{dotsSpeed: 500}">
          <ng-template carouselSlide>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide>Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
          <ng-template carouselSlide>Slide 5</ng-template>
          <ng-template carouselSlide>Slide 6</ng-template>
          <ng-template carouselSlide>Slide 7</ng-template>
          <ng-template carouselSlide>Slide 8</ng-template>
          <ng-template carouselSlide>Slide 9</ng-template>
          <ng-template carouselSlide>Slide 10</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));
    tick();

    fixtureHost.detectChanges();
    deDots = deCarouselComponent.queryAll(By.css('.owl-dots > .owl-dot'));
    deStage = deCarouselComponent.query(By.css('.owl-stage'));

    expect(deDots.length).toBe(4, '4 dots');
    expect(getComputedStyle(deStage.nativeElement).transitionDuration).toBe('0s', '0s transition');

    deDots[1].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    // transtionDuration is defined using number of slides which must be scrolled after clicking dot. If number of slides is 3 transtionDuration will be 1.5s (3*500ms);
    // If number of slides is 1 transtionDuration will be 1.5s (1*500ms);
    deStage = deCarouselComponent.query(By.css('.owl-stage'));
    expect(getComputedStyle(deStage.nativeElement).transitionDuration).toBe('1.5s', '1.5s transition');

    deDots[3].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    // 4 slides should be scrolled; 4*500ms = 2000ms = 2s
    deStage = deCarouselComponent.query(By.css('.owl-stage'));
    expect(getComputedStyle(deStage.nativeElement).transitionDuration).toBe('2s', '2s transition');
  }));

  it('should pass data after moving carousel [options]="{nav: true}"', fakeAsync(() => {
    discardPeriodicTasks();
    const html = `
      <div style="width: 1200px; margin: auto">
        <owl-carousel-o [options]="{nav: true}" (translated)="getPassedData($event)">
          <ng-template carouselSlide id="owl-slide-1">Slide 1</ng-template>
          <ng-template carouselSlide id="owl-slide-2">Slide 2</ng-template>
          <ng-template carouselSlide id="owl-slide-3">Slide 3</ng-template>
          <ng-template carouselSlide id="owl-slide-4">Slide 4</ng-template>
          <ng-template carouselSlide id="owl-slide-5">Slide 5</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    testComponent = fixtureHost.componentInstance;
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));
    tick();

    fixtureHost.detectChanges();
    deDots = deCarouselComponent.queryAll(By.css('.owl-dots > .owl-dot'));
    deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
    expect(deDots.length).toBe(2, '2 dots');

    deDots[1].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deDots[0].triggerEventHandler('click', null);
    tick();

    // 2 tests below should be before the 2 lines above. But in that case output data don't get updates. In real app everything works fine.
    // This is because the long time of transition. Making one more else click finishes current transition, calls handler for ontransionend and starts new transition
    expect(testComponent.translatedData.startPosition).toBe(2, '2 startPosition');
    expect(testComponent.translatedData.slides[0].id).toBe('owl-slide-3', 'owl-slide-3');

    deNavButtons[1].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deNavButtons[1].triggerEventHandler('click', null);
    tick();
    // 2 tests below should be before the 2 lines above. But in that case output data don't get updates. In real app everything works fine.
    // This is because the long time of transition. Making one more else click finishes current transition, calls handler for ontransionend and starts new transition
    expect(testComponent.translatedData.startPosition).toBe(1, '1 startPosition');
    expect(testComponent.translatedData.slides[0].id).toBe('owl-slide-2', 'owl-slide-2');
  }));


  it('should pass data after moving carousel [options]="{nav: true, loop: true}"', fakeAsync(() => {
    discardPeriodicTasks();
    const html = `
      <div style="width: 1200px; margin: auto">
        <owl-carousel-o [options]="{nav: true, loop: true}" (translated)="getPassedData($event)">
          <ng-template carouselSlide id="owl-slide-1">Slide 1</ng-template>
          <ng-template carouselSlide id="owl-slide-2">Slide 2</ng-template>
          <ng-template carouselSlide id="owl-slide-3">Slide 3</ng-template>
          <ng-template carouselSlide id="owl-slide-4">Slide 4</ng-template>
          <ng-template carouselSlide id="owl-slide-5">Slide 5</ng-template>
          <ng-template carouselSlide id="owl-slide-6">Slide 6</ng-template>
          <ng-template carouselSlide id="owl-slide-7">Slide 7</ng-template>
          <ng-template carouselSlide id="owl-slide-8">Slide 8</ng-template>
          <ng-template carouselSlide id="owl-slide-9">Slide 9</ng-template>
          <ng-template carouselSlide id="owl-slide-10">Slide 10</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    testComponent = fixtureHost.componentInstance;
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));
    tick();

    fixtureHost.detectChanges();
    deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));

    deNavButtons[0].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deNavButtons[1].triggerEventHandler('click', null);
    tick();

    // 2 tests below should be before the 2 lines above. But in that case output data don't get updates. In real app everything works fine.
    // This is because the long time of transition. Making one more else click finishes current transition, calls handler for ontransionend and starts new transition
    expect(testComponent.translatedData.startPosition).toBe(9, '9 startPosition');
    expect(testComponent.translatedData.slides[0].id).toBe('owl-slide-10', 'owl-slide-10');

    deNavButtons[1].triggerEventHandler('click', null);
    tick();
  }));

  it('should autoplay carousel [options]="{nav: true, loop: true, autoplay: true, autoplayTimeout: 1000, autoplaySpeed: 500}"', fakeAsync(() => {
    discardPeriodicTasks();
    const html = `
      <div style="width: 1200px; margin: auto">
        <owl-carousel-o [options]="{nav: true, loop: true, autoplay: true, autoplayTimeout: 1000, autoplaySpeed: 500}" (translated)="getPassedData($event)">
          <ng-template carouselSlide id="owl-slide-1">Slide 1</ng-template>
          <ng-template carouselSlide id="owl-slide-2">Slide 2</ng-template>
          <ng-template carouselSlide id="owl-slide-3">Slide 3</ng-template>
          <ng-template carouselSlide id="owl-slide-4">Slide 4</ng-template>
          <ng-template carouselSlide id="owl-slide-5">Slide 5</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));
    autoplayService = deCarouselComponent.injector.get(AutoplayService);
    deStage = deCarouselComponent.query(By.css('.owl-stage'));
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 1', 'Slide 1');

    tick(1500);
    fixtureHost.detectChanges();
    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 2', 'Slide 2');
    expect(getComputedStyle(deStage.nativeElement).transitionDuration).toBe('0.5s', '0.5s');
    tick(2000);
    fixtureHost.detectChanges();

    // can't imitate passage of time (tick(2000) doesn't wait). Thus next checking won't work
    // deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    // expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 4', 'Slide 4');
    // autoplayService.stop();
  }));

  it('should stop autoplaying carousel by \'mouseover\' and \'touchstart\'[options]="{nav: true, loop: true, autoplay: true, autoplayTimeout: 100, autoplayHoverPause: true}"', fakeAsync(() => {
    discardPeriodicTasks();
    const html = `
      <div style="width: 1200px; margin: auto">
        <owl-carousel-o [options]="{nav: true, loop: true, autoplay: true, autoplayTimeout: 100, autoplayHoverPause: true}" (translated)="getPassedData($event)">
          <ng-template carouselSlide id="owl-slide-1">Slide 1</ng-template>
          <ng-template carouselSlide id="owl-slide-2">Slide 2</ng-template>
          <ng-template carouselSlide id="owl-slide-3">Slide 3</ng-template>
          <ng-template carouselSlide id="owl-slide-4">Slide 4</ng-template>
          <ng-template carouselSlide id="owl-slide-5">Slide 5</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));
    carouselHTML = deCarouselComponent.query(By.css('.owl-carousel')).nativeElement;
    autoplayService = deCarouselComponent.injector.get(AutoplayService);
    spyOn(autoplayService, 'startPausing');
    spyOn(autoplayService, 'startPlayingMouseLeave');
    spyOn(autoplayService, 'startPlayingTouchEnd');

    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 1', 'Slide 1');

    tick(1500);
    fixtureHost.detectChanges();
    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 2', 'Slide 2');

    triggerMouseEvent(carouselHTML, 'mouseover', {});
    expect(autoplayService.startPausing).toHaveBeenCalled();

    tick();
    fixtureHost.detectChanges();

    triggerMouseEvent(carouselHTML, 'mouseleave', {});
    expect(autoplayService.startPlayingMouseLeave).toHaveBeenCalled();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 2', 'Slide 2');

    tick();
    fixtureHost.detectChanges();

    triggerTouchEvent(carouselHTML, 'touchstart', {});
    expect(autoplayService.startPausing).toHaveBeenCalled();

    tick(1500);
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 2', 'Slide 2');
    triggerTouchEvent(carouselHTML, 'touchend', {});
    expect(autoplayService.startPlayingTouchEnd).toHaveBeenCalled();
    autoplayService.stop();
  }));

  it('should load content for 3 slides [options]="{nav: true, lazyLoad: true}"', fakeAsync(() => {
    discardPeriodicTasks();
    const html = `
      <div style="width: 920px; margin: auto">
        <owl-carousel-o [options]="{nav: true, lazyLoad: true}">
          <ng-template carouselSlide id="owl-slide-1"><img class="owl-lazy" [src]="['assets/img-1.png']"></ng-template>
          <ng-template carouselSlide id="owl-slide-2"><img class="owl-lazy" [src]="['assets/img-2.png']"></ng-template>
          <ng-template carouselSlide id="owl-slide-3"><img class="owl-lazy" [src]="['assets/img-3.png']"></ng-template>
          <ng-template carouselSlide id="owl-slide-4"><img class="owl-lazy" [src]="['assets/img-4.png']"></ng-template>
          <ng-template carouselSlide id="owl-slide-5"><img class="owl-lazy" [src]="['assets/img-5.png']"></ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));
    tick();
    fixtureHost.detectChanges();

    deSlides = deCarouselComponent.queryAll(By.css('.owl-item'));
    expect(deSlides.length).toBe(5, '5 slides');
    let deImages = deCarouselComponent.queryAll(By.css('.owl-item .owl-lazy'));
    expect(deImages.length).toBe(3, '3 images');
    let img: DebugElement = deSlides[0].query(By.css('.owl-lazy'));
    expect(img).toBeTruthy('img in 1th slide is loaded');
    img = deSlides[1].query(By.css('.owl-lazy'));
    expect(img).toBeTruthy('img in 2th slide is loaded');
    img = deSlides[2].query(By.css('.owl-lazy'));
    expect(img).toBeTruthy('img in 3th slide is loaded');

    img = deSlides[3].query(By.css('.owl-lazy'));
    expect(img).toBeFalsy('img in 4th slide isn\'t loaded');

    deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
    deNavButtons[1].triggerEventHandler('click', null);

    tick();
    fixtureHost.detectChanges();

    deImages = deCarouselComponent.queryAll(By.css('.owl-item .owl-lazy'));
    expect(deImages.length).toBe(4, '4 images');
    img = deSlides[3].query(By.css('.owl-lazy'));
    expect(img).toBeTruthy('img in 4th slide is loaded');
  }));


  it('should load content for 3 slides and its 3 clones [options]="{nav: true, lazyLoad: true, loop: true}"', fakeAsync(() => {
    discardPeriodicTasks();
    const html = `
      <div style="width: 920px; margin: auto">
        <owl-carousel-o [options]="{nav: true, lazyLoad: true, loop: true}">
          <ng-template carouselSlide id="owl-slide-1"><img class="owl-lazy" [src]="['assets/img-1.png']"></ng-template>
          <ng-template carouselSlide id="owl-slide-2"><img class="owl-lazy" [src]="['assets/img-2.png']"></ng-template>
          <ng-template carouselSlide id="owl-slide-3"><img class="owl-lazy" [src]="['assets/img-3.png']"></ng-template>
          <ng-template carouselSlide id="owl-slide-4"><img class="owl-lazy" [src]="['assets/img-4.png']"></ng-template>
          <ng-template carouselSlide id="owl-slide-5"><img class="owl-lazy" [src]="['assets/img-5.png']"></ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));
    tick();
    fixtureHost.detectChanges();

    deSlides = deCarouselComponent.queryAll(By.css('.owl-item'));
    expect(deSlides.length).toBe(11, '11 slides');

    let deImages = deCarouselComponent.queryAll(By.css('.owl-item .owl-lazy'));
    expect(deImages.length).toBe(6, '6 images');
    let img: DebugElement = deSlides[3].query(By.css('.owl-lazy'));
    expect(img).toBeTruthy('img in 1th visible slide is loaded');
    img = deSlides[4].query(By.css('.owl-lazy'));
    expect(img).toBeTruthy('img in 2th visible slide is loaded');
    img = deSlides[5].query(By.css('.owl-lazy'));
    expect(img).toBeTruthy('img in 3th visible slide is loaded');

    img = deSlides[6].query(By.css('.owl-lazy'));
    expect(img).toBeFalsy('img in 4th visible slide isn\'t loaded');
    img = deSlides[8].query(By.css('.owl-lazy'));
    expect(img).toBeTruthy('img in 9th slide is loaded');
    img = deSlides[9].query(By.css('.owl-lazy'));
    expect(img).toBeTruthy('img in 10th slide is loaded');
    img = deSlides[10].query(By.css('.owl-lazy'));
    expect(img).toBeTruthy('img in 11th slide is loaded');

    deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
    deNavButtons[1].triggerEventHandler('click', null);

    tick();
    fixtureHost.detectChanges();

    deImages = deCarouselComponent.queryAll(By.css('.owl-item .owl-lazy'));
    expect(deImages.length).toBe(8, '8 images');
    img = deSlides[1].query(By.css('.owl-lazy'));
    expect(img).toBeTruthy('img in 2th slide is loaded');
    img = deSlides[6].query(By.css('.owl-lazy'));
    expect(img).toBeTruthy('img in 7th visible slide is loaded');
  }));


  it('should load content for 3 slides and its 3 clones [options]="{nav: true, lazyLoad: true, lazyLoadEager: 1, loop: true, items: 2}"', fakeAsync(() => {
    discardPeriodicTasks();
    const html = `
      <div style="width: 920px; margin: auto">
        <owl-carousel-o [options]="{nav: true, lazyLoad: true, lazyLoadEager: 1, loop: true, items: 2}">
          <ng-template carouselSlide id="owl-slide-1"><img class="owl-lazy" [src]="['assets/img-1.png']"></ng-template>
          <ng-template carouselSlide id="owl-slide-2"><img class="owl-lazy" [src]="['assets/img-2.png']"></ng-template>
          <ng-template carouselSlide id="owl-slide-3"><img class="owl-lazy" [src]="['assets/img-3.png']"></ng-template>
          <ng-template carouselSlide id="owl-slide-4"><img class="owl-lazy" [src]="['assets/img-4.png']"></ng-template>
          <ng-template carouselSlide id="owl-slide-5"><img class="owl-lazy" [src]="['assets/img-5.png']"></ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));
    tick();
    fixtureHost.detectChanges();

    deSlides = deCarouselComponent.queryAll(By.css('.owl-item'));
    expect(deSlides.length).toBe(11, '11 slides');

    let deImages = deCarouselComponent.queryAll(By.css('.owl-item .owl-lazy'));
    expect(deImages.length).toBe(8, '8 images');
    let img: DebugElement = deSlides[0].query(By.css('.owl-lazy'));
    expect(img).toBeFalsy('img in 1th slide isn\'t loaded');
    img = deSlides[1].query(By.css('.owl-lazy'));
    expect(img).toBeFalsy('img in 2th slide isn\'t loaded');
    img = deSlides[2].query(By.css('.owl-lazy'));
    expect(img).toBeTruthy('img in 3th slide is loaded');
    img = deSlides[3].query(By.css('.owl-lazy'));
    expect(img).toBeTruthy('img in 4th slide is loaded');
    img = deSlides[4].query(By.css('.owl-lazy'));
    expect(img).toBeTruthy('img in 5th slide is loaded');
    img = deSlides[5].query(By.css('.owl-lazy'));
    expect(img).toBeTruthy('img in 6th slide is loaded');

    img = deSlides[6].query(By.css('.owl-lazy'));
    expect(img).toBeFalsy('img in 7th slide isn\'t loaded');
    img = deSlides[7].query(By.css('.owl-lazy'));
    expect(img).toBeTruthy('img in 8th slide is loaded');
    img = deSlides[8].query(By.css('.owl-lazy'));
    expect(img).toBeTruthy('img in 9th slide is loaded');
    img = deSlides[9].query(By.css('.owl-lazy'));
    expect(img).toBeTruthy('img in 10th slide is loaded');
    img = deSlides[10].query(By.css('.owl-lazy'));
    expect(img).toBeTruthy('img in 11th slide is loaded');

    deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
    deNavButtons[0].triggerEventHandler('click', null);

    tick();
    fixtureHost.detectChanges();

    deImages = deCarouselComponent.queryAll(By.css('.owl-item .owl-lazy'));
    expect(deImages.length).toBe(10, '10 images');
    img = deSlides[1].query(By.css('.owl-lazy'));
    expect(img).toBeTruthy('img in 2th slide is loaded');
    img = deSlides[6].query(By.css('.owl-lazy'));
    expect(img).toBeTruthy('img in 7th slide is loaded');
  }));

  it('should animate slides [options]="{nav: true, items: 1, animateOut: \'slideOutDown\', animateIn: \'flipInX\'}"', fakeAsync(() => {
    discardPeriodicTasks();
    const html = `
      <div style="width: 920px; margin: auto">
        <owl-carousel-o [options]="{nav: true, smartSpeed: 1, items: 1, animateOut: 'slideOutDown', animateIn: 'flipInX'}">
          <ng-template carouselSlide id="owl-slide-1">Slide 1</ng-template>
          <ng-template carouselSlide id="owl-slide-2">Slide 2</ng-template>
          <ng-template carouselSlide id="owl-slide-3">Slide 3</ng-template>
          <ng-template carouselSlide id="owl-slide-4">Slide 4</ng-template>
          <ng-template carouselSlide id="owl-slide-5">Slide 5</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides.length).toBe(1, '1 slide');
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 1', 'Slide 1');

    deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
    deNavButtons[1].triggerEventHandler('click', null);

    tick();
    fixtureHost.detectChanges();

    deSlides = deCarouselComponent.queryAll(By.css('.owl-item'));
    let oldActiveSlide = deSlides[0].nativeElement;
    expect(oldActiveSlide.classList.contains('animated')).toBeTruthy('1th slide has .animated class');
    expect(oldActiveSlide.classList.contains('owl-animated-out')).toBeTruthy('1th slide has .owl-animated-out class');
    expect(oldActiveSlide.classList.contains('slideOutDown')).toBeTruthy('1th slide has .slideOutDown class');
    expect(getComputedStyle(oldActiveSlide).left).toBe('920px', '920px');

    let newActiveSlide: HTMLElement = deSlides[1].nativeElement;
    expect(newActiveSlide.classList.contains('animated')).toBeTruthy('2th slide has .animated class');
    expect(newActiveSlide.classList.contains('owl-animated-in')).toBeTruthy('2th slide has .owl-animated-in class');
    expect(newActiveSlide.classList.contains('flipInX')).toBeTruthy('2th slide has .flipInX class');
    expect(newActiveSlide.classList.contains('active')).toBeTruthy('2th slide has .active class');

    tick();
    fixtureHost.detectChanges();

    // Event 'animationend' should fire by itself after some period of time. But tests ends before firing event. Calling tick(2000) doesn't help.
    deSlides[0].nativeElement.dispatchEvent(new Event('animationend'));
    deSlides[1].nativeElement.dispatchEvent(new Event('animationend'));

    tick();
    fixtureHost.detectChanges();
    deSlides = deCarouselComponent.queryAll(By.css('.owl-item'));
    oldActiveSlide = deSlides[0].nativeElement;
    expect(deSlides[0].nativeElement.classList.contains('animated')).toBeFalsy('1th slide hasn\'t .animated class');
    expect(oldActiveSlide.classList.contains('owl-animated-out')).toBeFalsy('1th slide hasn\'t .owl-animated-out class');
    expect(oldActiveSlide.classList.contains('slideOutDown')).toBeFalsy('1th slide hasn\'t .slideOutDown class');
    expect(getComputedStyle(oldActiveSlide).left).toBe('auto', 'auto');

    newActiveSlide = deSlides[1].nativeElement;
    expect(newActiveSlide.classList.contains('animated')).toBeFalsy('2th slide hasn\'t .animated class');
    expect(newActiveSlide.classList.contains('owl-animated-in')).toBeFalsy('2th slide hasn\'t .owl-animated-in class');
    expect(newActiveSlide.classList.contains('flipInX')).toBeFalsy('2th slide hasn\'t .flipInX class');
  }));

  it('should animate just new active slides; \'animateOut\' is absent [options]="{nav: true, items: 1, animateIn: \'flipInX\'}"', fakeAsync(() => {
    discardPeriodicTasks();
    const html = `
      <div style="width: 920px; margin: auto">
        <owl-carousel-o [options]="{nav: true, smartSpeed: 1, items: 1, animateIn: 'flipInX'}">
          <ng-template carouselSlide id="owl-slide-1">Slide 1</ng-template>
          <ng-template carouselSlide id="owl-slide-2">Slide 2</ng-template>
          <ng-template carouselSlide id="owl-slide-3">Slide 3</ng-template>
          <ng-template carouselSlide id="owl-slide-4">Slide 4</ng-template>
          <ng-template carouselSlide id="owl-slide-5">Slide 5</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides.length).toBe(1, '1 slide');
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 1', 'Slide 1');

    deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
    deNavButtons[1].triggerEventHandler('click', null);

    tick();
    fixtureHost.detectChanges();

    deSlides = deCarouselComponent.queryAll(By.css('.owl-item'));
    const oldActiveSlide = deSlides[0].nativeElement;
    expect(oldActiveSlide.classList.contains('animated')).toBeFalsy('1th slide hasn\'t .animated class');
    expect(oldActiveSlide.classList.contains('owl-animated-out')).toBeFalsy('1th slide hasn\'t .owl-animated-out class');
    expect(oldActiveSlide.classList.contains('slideOutDown')).toBeFalsy('1th slide hasn\'t .slideOutDown class');
    expect(getComputedStyle(oldActiveSlide).left).toBe('auto', 'auto');

    let newActiveSlide: HTMLElement = deSlides[1].nativeElement;
    expect(newActiveSlide.classList.contains('animated')).toBeTruthy('2th slide has .animated class');
    expect(newActiveSlide.classList.contains('owl-animated-in')).toBeTruthy('2th slide has .owl-animated-in class');
    expect(newActiveSlide.classList.contains('flipInX')).toBeTruthy('2th slide has .flipInX class');
    expect(newActiveSlide.classList.contains('active')).toBeTruthy('2th slide has .active class');

    tick();
    fixtureHost.detectChanges();

    // Event 'animationend' should fire by itself after some period of time. But tests ends before firing event. Calling tick(2000) doesn't help.
    deSlides[1].nativeElement.dispatchEvent(new Event('animationend'));

    tick();
    fixtureHost.detectChanges();
    deSlides = deCarouselComponent.queryAll(By.css('.owl-item'));

    newActiveSlide = deSlides[1].nativeElement;
    expect(newActiveSlide.classList.contains('animated')).toBeFalsy('2th slide hasn\'t .animated class');
    expect(newActiveSlide.classList.contains('owl-animated-in')).toBeFalsy('2th slide hasn\'t .owl-animated-in class');
    expect(newActiveSlide.classList.contains('flipInX')).toBeFalsy('2th slide hasn\'t .flipInX class');
  }));

  it('shouldn\'t animate slides; \'animateOut\' and  \'animateIn\' are absent [options]="{nav: true, items: 1}"', fakeAsync(() => {
    discardPeriodicTasks();
    const html = `
      <div style="width: 920px; margin: auto">
        <owl-carousel-o [options]="{nav: true, smartSpeed: 1, items: 1}">
          <ng-template carouselSlide id="owl-slide-1">Slide 1</ng-template>
          <ng-template carouselSlide id="owl-slide-2">Slide 2</ng-template>
          <ng-template carouselSlide id="owl-slide-3">Slide 3</ng-template>
          <ng-template carouselSlide id="owl-slide-4">Slide 4</ng-template>
          <ng-template carouselSlide id="owl-slide-5">Slide 5</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides.length).toBe(1, '1 slide');
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 1', 'Slide 1');

    deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
    deNavButtons[1].triggerEventHandler('click', null);

    tick();
    fixtureHost.detectChanges();

    deSlides = deCarouselComponent.queryAll(By.css('.owl-item'));
    const oldActiveSlide = deSlides[0].nativeElement;
    expect(oldActiveSlide.classList.contains('animated')).toBeFalsy('1th slide hasn\'t .animated class');
    expect(oldActiveSlide.classList.contains('owl-animated-out')).toBeFalsy('1th slide hasn\'t .owl-animated-out class');
    expect(oldActiveSlide.classList.contains('slideOutDown')).toBeFalsy('1th slide hasn\'t .slideOutDown class');
    expect(getComputedStyle(oldActiveSlide).left).toBe('auto', 'auto');

    const newActiveSlide: HTMLElement = deSlides[1].nativeElement;
    expect(newActiveSlide.classList.contains('animated')).toBeFalsy('2th slide hasn\'t .animated class');
    expect(newActiveSlide.classList.contains('owl-animated-in')).toBeFalsy('2th slide hasn\'t .owl-animated-in class');
    expect(newActiveSlide.classList.contains('flipInX')).toBeFalsy('2th slide hasn\'t .flipInX class');
    expect(newActiveSlide.classList.contains('active')).toBeTruthy('2th slide has .active class');

    tick();
    fixtureHost.detectChanges();

  }));

  // the ending of tests
});

@Component({
  selector: 'test-dom',
  template: ''
})
class TestComponent {
  options: any = {};
  translatedData: SlidesOutputData;
  constructor() {}
  getPassedData(data: any) {
    this.translatedData = data;
  }
}

function triggerMouseEvent(node: any, eventType: string, evtObj: any) {
  const evt = new MouseEvent(eventType, evtObj);
  node.dispatchEvent(evt);
}

function triggerTouchEvent(element: HTMLElement, eventType: string, evtObj: any) {
  const evtSet = {
    identifier: Date.now(),
    target: element,
    radiusX: 2.5,
    radiusY: 2.5,
    rotationAngle: 10,
    force: 0.5,
  };

  const touchObj = new Touch({...evtSet, ...evtObj});

  const touchEvent = new TouchEvent(eventType, {
    cancelable: true,
    bubbles: true,
    touches: [touchObj],
    targetTouches: [],
    changedTouches: [touchObj],
    shiftKey: true,
  });

  element.dispatchEvent(touchEvent);
}