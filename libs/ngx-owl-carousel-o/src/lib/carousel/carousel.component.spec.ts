import { async, ComponentFixture, discardPeriodicTasks, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import {
  CarouselComponent,
  CarouselSlideDirective
} from './carousel.component';
import { ResizeService } from '../services/resize.service';
import { WINDOW_PROVIDERS } from '../services/window-ref.service';
import { CarouselService } from '../services/carousel.service';
import { createGenericTestComponent } from './test/common';
import { last } from '../../../../../node_modules/rxjs/operators';


const createTestComponent = (html: string) =>
    createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>


describe('CarouselComponent', () => {
  let testComponent: TestComponent;
  let fixtureHost: ComponentFixture<TestComponent>;

  let carouselComponent: CarouselComponent;
  let deCarouselComponent: DebugElement;
  let carouselHTML: HTMLElement;
  let carouselService: CarouselService;

  let deStage: DebugElement;

  let deNavButtons: DebugElement[];
  let rightButton: HTMLElement;
  let leftButton: HTMLElement;

  let deSlides: DebugElement[];

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [
          CarouselComponent,
          TestComponent,
          CarouselSlideDirective
        ],
        providers: [ResizeService, WINDOW_PROVIDERS, CarouselService]
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

      expect(carouselComponent.owlDOMData.isDragable).toBeTruthy('isDragable should be true');
      expect(carouselHTML.classList.contains('owl-drag')).toBeTruthy('has .owl-drag');

      expect(carouselComponent.owlDOMData.rtl).toBeFalsy('isDragable should be true');
      expect(carouselHTML.classList.contains('owl-rtl')).toBeFalsy('has .owl-rtl');

      expect(carouselComponent.owlDOMData.isResponsive).toBeFalsy('isDragable should be true');
      expect(carouselHTML.classList.contains('owl-responsive')).toBeFalsy('has .owl-responsive');

      expect(carouselComponent.owlDOMData.isLoaded).toBe(true, 'isDragable should be true');
      expect(carouselHTML.classList.contains('owl-loaded')).toBeTruthy('has .owl-loaded');

      expect(carouselComponent.owlDOMData.isGrab).toBe(false, 'isDragable should be true');
      expect(carouselHTML.classList.contains('owl-grab')).toBeFalsy('has .owl-grab');

      expect(carouselComponent.carouselLoaded).toBeTruthy('owlVisible should be true; this means stage is created')

      deStage = deCarouselComponent.query(By.css('.owl-stage'));
      expect(carouselComponent.stageData.width).toBe(2000, 'width of stage');
      expect(deStage.nativeElement.clientWidth).toBe(2000, 'width of stage');

      expect(carouselComponent.stageData.transition).toBe('0s', 'transition of stage');
      expect(deStage.nativeElement.style.transition).toBe('0s', 'transition of stage');

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

  it(`should render carousel with 2 active slides and 6 cloned slide (total slides 11) [options]="{items: 2, loop: true}`, async(() => {
    const html = `
      <div style="width: 1200px; margin: auto">
        <owl-carousel-o [options]="{items: 2, loop: true}">
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
      expect(getComputedStyle(deSlides[0].nativeElement).cssFloat).toBe('right', '.owl-item should have css-rule float: right');
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
    });
  }));

  it(`should render responsive carousel  [options]="{responsive: {'0': {items: 1}, '600': {items: 2}, '900': {items: 3}}}"`, async(() => {
    const html = `
      <div class="owl-wrapper" style="width: 1200px; margin: auto">
        <owl-carousel-o [options]="{responsive: {'0': {items: 1}, '600': {items: 2}, '900': {items: 3}}}">
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
      expect(carouselHTML.classList.contains('owl-responsive')).toBeTruthy('should have class .owl-responsive');

      let activeSlides: DebugElement[] = deCarouselComponent.queryAll(By.css('.owl-item.active'));
      expect(activeSlides.length).toBe(3, 'should be 3 active slides');

      carouselHTML.closest('.owl-wrapper').setAttribute('style', 'width: 800px; margin: auto');
      fixtureHost.detectChanges();

      expect(carouselHTML.clientWidth).toBe(800);

      carouselService = fixtureHost.debugElement.injector.get(CarouselService);
      carouselService.setCarouselWidth(800);
      carouselService.refresh();

      fixtureHost.detectChanges();
      activeSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
      expect(activeSlides.length).toBe(2, 'should be 2 active slides');

    });
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


  // it('should have 10 sliders and 2 stages whilest prop "cycled" is true', () => {
  //   expect(deSlides.length).toBe(10, 'must be 10 sliders');
  //   expect(deStages.length).toBe(2, 'must be 2 stages');
  // });

  // it('should have 4 active sliders for carousel with width of 1000px', () => {
  //   deSlides = deStages[0].queryAll(By.css('.active'));
  //   expect(deSlides.length).toBe(4, '4 active slides');
  // });

  // it('first button (arrow-left) shouldn\'t have class .disabled whilest prop "cycled" is true', () => {
  //   expect(leftButton.classList.contains('disabled')).toBeFalsy();
  // });

  // it('should move carousel left on 1 slide after clicking right button', () => {
  //   deNavButtons[1].triggerEventHandler('click', null);
  //   fixtureHost.detectChanges();

  //   deSlides = deStages[0].queryAll(By.css('.surf-carousel-2-slide-wrapper'));
  //   expect(deSlides[0].nativeElement.classList.contains('active')).toBeFalsy();
  //   expect(deSlides[4].nativeElement.classList.contains('active')).toBeTruthy();
  // });

  // it('should move carousel left  on 5 slides after clicking right button 5 times', () => {
  //   deNavButtons[1].triggerEventHandler('click', null);
  //   fixtureHost.detectChanges();
  //   deNavButtons[1].triggerEventHandler('click', null);
  //   fixtureHost.detectChanges();
  //   deNavButtons[1].triggerEventHandler('click', null);
  //   fixtureHost.detectChanges();
  //   deNavButtons[1].triggerEventHandler('click', null);
  //   fixtureHost.detectChanges();
  //   deNavButtons[1].triggerEventHandler('click', null);
  //   fixtureHost.detectChanges();

  //   deSlides = deStages[0].queryAll(By.css('.active'));
  //   expect(deSlides.length).toBe(
  //     0,
  //     "1t stage shouldn't have sliders with .active class"
  //   );
  //   deSlides = deStages[1].queryAll(By.css('.surf-carousel-2-slide-wrapper'));
  //   expect(deSlides[0].nativeElement.classList.contains('active')).toBeTruthy(
  //     'first slide of 2d stage must have .active class'
  //   );

  //   deNavButtons[1].triggerEventHandler('click', null);
  //   fixtureHost.detectChanges();
  //   expect(deStages[0].nativeElement.style.transform).toBe(
  //     'translateX(1000px)',
  //     '1t stage is after second when last slide if 2d stage has .active'
  //   );
  // });

  // it('should move carousel right on 1 slide after clicking left button', () => {
  //   deNavButtons[0].triggerEventHandler('click', null);
  //   fixtureHost.detectChanges();

  //   deSlides = deStages[0].queryAll(By.css('.surf-carousel-2-slide-wrapper'));
  //   expect(deSlides[3].nativeElement.classList.contains('active')).toBeFalsy(
  //     "4th slide if 1t stage doesn't have .active"
  //   );
  //   deSlides = deStages[1].queryAll(By.css('.surf-carousel-2-slide-wrapper'));
  //   expect(deSlides[4].nativeElement.classList.contains('active')).toBeTruthy(
  //     'last slide if 2t stage has .active'
  //   );
  // });
});

@Component({
  selector: 'test-dom',
  template: ''
})
class TestComponent {
  options: any = {};
}