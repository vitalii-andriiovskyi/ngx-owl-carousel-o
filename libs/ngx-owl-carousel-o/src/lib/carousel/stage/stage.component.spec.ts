import { StageComponent } from './stage.component';
import { async, ComponentFixture, discardPeriodicTasks, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import {
  CarouselComponent,
  CarouselSlideDirective,
  SlidesOutputData
} from '../carousel.component';
import { ResizeService } from '../../services/resize.service';
import { WINDOW_PROVIDERS } from '../../services/window-ref.service';
import { CarouselService } from '../../services/carousel.service';
import { createGenericTestComponent } from '../test/common';
import { NavigationService } from '../../services/navigation.service';
import { AutoplayService } from '../../services/autoplay.service';
import { DOCUMENT_PROVIDERS } from '../../services/document-ref.service';
import 'zone.js/dist/zone-patch-rxjs-fake-async';

const createTestComponent = (html: string) =>
    createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

describe('CarouselComponent in context of CarouselComponent (integrated tests): ', () => {
  let testComponent: TestComponent;
  let fixtureHost: ComponentFixture<TestComponent>;

  let deCarouselComponent: DebugElement;

  let deStageWrapper: DebugElement;
  let deStage: DebugElement;

  let deNavButtons: DebugElement[];
  let deDots: DebugElement[];

  let deSlides: DebugElement[];
  let deActiveSlides: DebugElement[];

  let coords: { x: number, y: number};

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [
          CarouselComponent,
          TestComponent,
          CarouselSlideDirective,
          StageComponent
        ],
        providers: [ResizeService, WINDOW_PROVIDERS, CarouselService, NavigationService, AutoplayService, DOCUMENT_PROVIDERS]
      });
    })
  );

  it('should drag carousel by mouse [options]="{nav: true}"', fakeAsync(() => {
    discardPeriodicTasks();
    const html = `
      <div style="width: 920px; margin: auto">
        <owl-carousel-o [options]="{nav: true}">
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
    deStageWrapper = deCarouselComponent.query(By.css('owl-stage'));
    deSlides = deCarouselComponent.queryAll(By.css('.owl-item'));

    coords = findCoordsInElem(deSlides[0].nativeElement, getCoords(deSlides[0].nativeElement));

    const stageParent: HTMLElement = deStageWrapper.nativeElement.children[0]; // css rules for this element are being changed outer of angular zone. Thus there's no need to call detectChanges();
    deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
    deDots = deCarouselComponent.queryAll(By.css('.owl-dots .owl-dot'));

    expect(deNavButtons[0].nativeElement.classList.contains('disabled')).toBeTruthy('prev button has .disabled');
    expect(deDots.length).toBe(2, '2 dots');

    // drag carousel to left hand-side
    triggerMouseEvent(deStageWrapper.nativeElement, 'mousedown', {clientX: coords.x, clientY: coords.y});
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x -10, clientY: coords.y});
    tick();

    expect(stageParent.style.transform).toBe('translate3d(-10px, 0px, 0px)', 'translate3d(-10px, 0px, 0px)');

    triggerMouseEvent(document, 'mousemove', {clientX: coords.x -40, clientY: coords.y});
    tick();
    expect(stageParent.style.transform).toBe('translate3d(-40px, 0px, 0px)', 'translate3d(-40px, 0px, 0px)');

    triggerMouseEvent(document, 'mouseup', {clientX: coords.x-40, clientY: coords.y});
    tick();
    expect(stageParent.style.transform).toBe('', '');
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 2', 'Slide 2');
    deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
    expect(deNavButtons[0].nativeElement.classList.contains('disabled')).toBeFalsy('prev button doesn\'t have .disabled');
    deDots = deCarouselComponent.queryAll(By.css('.owl-dots .owl-dot'));
    expect(deDots[0].nativeElement.classList.contains('active')).toBeTruthy('1th dot is active');

    // drag carousel to right hand-side
    triggerMouseEvent(deStageWrapper.nativeElement, 'mousedown', {clientX: coords.x, clientY: coords.y});
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x +10, clientY: coords.y});
    tick();
    expect(stageParent.style.transform).toBe('translate3d(10px, 0px, 0px)', 'translate3d(10px, 0px, 0px)');

    triggerMouseEvent(document, 'mousemove', {clientX: coords.x +40, clientY: coords.y});
    tick();
    expect(stageParent.style.transform).toBe('translate3d(40px, 0px, 0px)', 'translate3d(40px, 0px, 0px)');

    triggerMouseEvent(document, 'mouseup', {clientX: coords.x+40, clientY: coords.y});
    tick();
    expect(stageParent.style.transform).toBe('', '');
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 1', 'Slide 1');
    deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
    expect(deNavButtons[0].nativeElement.classList.contains('disabled')).toBeTruthy('prev button has .disabled');
    deDots = deCarouselComponent.queryAll(By.css('.owl-dots .owl-dot'));
    expect(deDots[0].nativeElement.classList.contains('active')).toBeTruthy('1th dot is active');

    // Slide 1 is active. Thus dragging carousel to right hand-side shoudn't change anything
    triggerMouseEvent(deStageWrapper.nativeElement, 'mousedown', {clientX: coords.x, clientY: coords.y});
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x +10, clientY: coords.y});
    tick();
    expect(stageParent.style.transform).toBeTruthy('translate3d(2px, 0px, 0px)');

    triggerMouseEvent(document, 'mousemove', {clientX: coords.x +40, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mouseup', {clientX: coords.x+40, clientY: coords.y});
    tick();
    expect(stageParent.style.transform).toBeFalsy('');
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 1', 'Slide 1');
    deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
    expect(deNavButtons[0].nativeElement.classList.contains('disabled')).toBeTruthy('prev button has .disabled');
    deDots = deCarouselComponent.queryAll(By.css('.owl-dots .owl-dot'));
    expect(deDots[0].nativeElement.classList.contains('active')).toBeTruthy('1th dot is active');

    coords = findCoordsInElem(deSlides[2].nativeElement, getCoords(deSlides[2].nativeElement));

    // drag carousel to left hand-side as much as it's needed to see last slide
    triggerMouseEvent(deStageWrapper.nativeElement, 'mousedown', {clientX: coords.x, clientY: coords.y});
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x -10, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x -800, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mouseup', {clientX: coords.x - 800, clientY: coords.y});
    tick();
    expect(stageParent.style.transform).toBe('', '');
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 3', 'Slide 3');
    deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
    expect(deNavButtons[1].nativeElement.classList.contains('disabled')).toBeTruthy('next button has .disabled');
    deDots = deCarouselComponent.queryAll(By.css('.owl-dots .owl-dot'));
    expect(deDots[1].nativeElement.classList.contains('active')).toBeTruthy('2th dot is active');

    // drag carousel to left hand-side
    // Slide 5 is active. Thus dragging carousel to left hand-side shoudn't change anything
    triggerMouseEvent(deStageWrapper.nativeElement, 'mousedown', {clientX: coords.x, clientY: coords.y});
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x -10, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x -40, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mouseup', {clientX: coords.x - 40, clientY: coords.y});
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 3', 'Slide 3');
    deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
    expect(deNavButtons[1].nativeElement.classList.contains('disabled')).toBeTruthy('next button has .disabled');
    deDots = deCarouselComponent.queryAll(By.css('.owl-dots .owl-dot'));
    expect(deDots[1].nativeElement.classList.contains('active')).toBeTruthy('2th dot is active');
  }));

  it('should drag carousel by mouse [options]="{nav: true, loop: true}"', fakeAsync(() => {
    discardPeriodicTasks();
    const html = `
      <div style="width: 920px; margin: auto">
        <owl-carousel-o [options]="{nav: true, loop: true}">
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
    deStageWrapper = deCarouselComponent.query(By.css('owl-stage'));
    deSlides = deCarouselComponent.queryAll(By.css('.owl-item'));

    coords = findCoordsInElem(deSlides[3].nativeElement, getCoords(deSlides[3].nativeElement));

    const stageParent: HTMLElement = deStageWrapper.nativeElement.children[0]; // css rules for this element are being changed outer of angular zone. Thus there's no need to call detectChanges();
    deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
    deDots = deCarouselComponent.queryAll(By.css('.owl-dots .owl-dot'));

    expect(deNavButtons[0].nativeElement.classList.contains('disabled')).toBeFalsy('prev button hasn\'t .disabled');
    expect(deDots.length).toBe(2, '2 dots');

    // drag carousel to left hand-side
    triggerMouseEvent(deStageWrapper.nativeElement, 'mousedown', {clientX: coords.x, clientY: coords.y});
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x -10, clientY: coords.y});
    tick();

    expect(stageParent.style.transform).toBe('translate3d(-10px, 0px, 0px)', 'translate3d(-10px, 0px, 0px)');

    triggerMouseEvent(document, 'mousemove', {clientX: coords.x -300, clientY: coords.y});
    tick();
    expect(stageParent.style.transform).toBe('translate3d(-300px, 0px, 0px)', 'translate3d(-300px, 0px, 0px)');

    triggerMouseEvent(document, 'mouseup', {clientX: coords.x -300, clientY: coords.y});
    tick();
    expect(stageParent.style.transform).toBe('', '');
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 2', 'Slide 2');
    deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
    expect(deNavButtons[0].nativeElement.classList.contains('disabled')).toBeFalsy('prev button doesn\'t have .disabled');
    deDots = deCarouselComponent.queryAll(By.css('.owl-dots .owl-dot'));
    expect(deDots[0].nativeElement.classList.contains('active')).toBeTruthy('1th dot is active');

    // drag carousel to right hand-side on 2 slides, before it carousel is in initial state
    triggerMouseEvent(deStageWrapper.nativeElement, 'mousedown', {clientX: coords.x, clientY: coords.y});
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x + 10, clientY: coords.y});
    tick();

    expect(stageParent.style.transform).toBe('translate3d(10px, 0px, 0px)', 'translate3d(10px, 0px, 0px)');

    triggerMouseEvent(document, 'mousemove', {clientX: coords.x +600, clientY: coords.y});
    tick();
    expect(stageParent.style.transform).toBe('translate3d(-933px, 0px, 0px)', 'translate3d(-933px, 0px, 0px)');

    triggerMouseEvent(document, 'mouseup', {clientX: coords.x +600, clientY: coords.y});
    tick();
    expect(stageParent.style.transform).toBe('', '');
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 3', 'Slide 3');
    expect(deActiveSlides[2].nativeElement.innerHTML).toContain('Slide 5', 'Slide 5');
    deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
    expect(deNavButtons[0].nativeElement.classList.contains('disabled')).toBeFalsy('prev button doesn\'t have .disabled');
    deDots = deCarouselComponent.queryAll(By.css('.owl-dots .owl-dot'));
    expect(deDots[0].nativeElement.classList.contains('active')).toBeTruthy('1th dot is active');

    // drag carousel to left hand-side on 3 slides
    coords = findCoordsInElem(deSlides[5].nativeElement, getCoords(deSlides[5].nativeElement));

    triggerMouseEvent(deStageWrapper.nativeElement, 'mousedown', {clientX: coords.x, clientY: coords.y});
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x - 10, clientY: coords.y});
    tick();

    expect(stageParent.style.transform).toBe('translate3d(-10px, 0px, 0px)', 'translate3d(-10px, 0px, 0px)');

    triggerMouseEvent(document, 'mousemove', {clientX: coords.x -900, clientY: coords.y});
    tick();
    expect(stageParent.style.transform).toBe('translate3d(-900px, 0px, 0px)', 'translate3d(-900px, 0px, 0px)');

    triggerMouseEvent(document, 'mouseup', {clientX: coords.x -900, clientY: coords.y});
    tick();
    expect(stageParent.style.transform).toBe('', '');
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 1', 'Slide 1');
    expect(deActiveSlides[2].nativeElement.innerHTML).toContain('Slide 3', 'Slide 3');
    deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
    expect(deNavButtons[0].nativeElement.classList.contains('disabled')).toBeFalsy('prev button doesn\'t have .disabled');
    deDots = deCarouselComponent.queryAll(By.css('.owl-dots .owl-dot'));
    expect(deDots[0].nativeElement.classList.contains('active')).toBeTruthy('1th dot is active');
  }));

  it('should drag carousel by mouse [options]="{nav: true, center: true}"', fakeAsync(() => {
    discardPeriodicTasks();
    const html = `
      <div style="width: 920px; margin: auto">
        <owl-carousel-o [options]="{nav: true, center: true}">
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
    deStageWrapper = deCarouselComponent.query(By.css('owl-stage'));
    deSlides = deCarouselComponent.queryAll(By.css('.owl-item'));
    let centeredSlide: HTMLElement = deCarouselComponent.query(By.css('.owl-item.active.center')).nativeElement;
    coords = findCoordsInElem(deSlides[1].nativeElement, getCoords(deSlides[1].nativeElement));

    const stageParent: HTMLElement = deStageWrapper.nativeElement.children[0]; // css rules for this element are being changed outer of angular zone. Thus there's no need to call detectChanges();
    deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
    deDots = deCarouselComponent.queryAll(By.css('.owl-dots .owl-dot'));

    expect(deNavButtons[0].nativeElement.classList.contains('disabled')).toBeTruthy('prev button has .disabled');
    expect(deDots.length).toBe(5, '5 dots');
    expect(centeredSlide.innerHTML).toContain('Slide 1', 'Slide 1');

    // drag carousel to right hand-side; current first active slide is Slide 1;
    triggerMouseEvent(deStageWrapper.nativeElement, 'mousedown', {clientX: coords.x, clientY: coords.y});
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x +10, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x + 300, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mouseup', {clientX: coords.x + 300, clientY: coords.y});
    tick();
    expect(stageParent.style.transform).toBe('', '');
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 1', 'Slide 1');
    expect(centeredSlide.innerHTML).toContain('Slide 1', 'Slide 1');
    deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
    expect(deNavButtons[0].nativeElement.classList.contains('disabled')).toBeTruthy('prev button has .disabled');
    deDots = deCarouselComponent.queryAll(By.css('.owl-dots .owl-dot'));
    expect(deDots[0].nativeElement.classList.contains('active')).toBeTruthy('1th dot is active');

    // drag carousel to right hand-side on 1 slide; current centered slide is Slide 1;
    triggerMouseEvent(deStageWrapper.nativeElement, 'mousedown', {clientX: coords.x, clientY: coords.y});
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x -10, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x - 200, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mouseup', {clientX: coords.x - 200, clientY: coords.y});
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 1', 'Slide 1');
    centeredSlide = deCarouselComponent.query(By.css('.owl-item.active.center')).nativeElement;
    expect(centeredSlide.innerHTML).toContain('Slide 2', 'Slide 2');
    deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
    expect(deNavButtons[0].nativeElement.classList.contains('disabled')).toBeFalsy('prev button hasn\'t .disabled');
    deDots = deCarouselComponent.queryAll(By.css('.owl-dots .owl-dot'));
    expect(deDots[1].nativeElement.classList.contains('active')).toBeTruthy('2th dot is active');

    // drag carousel to right hand-side on 1 slide; current centered slide is Slide 2;
    triggerMouseEvent(deStageWrapper.nativeElement, 'mousedown', {clientX: coords.x, clientY: coords.y});
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x -10, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x - 200, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mouseup', {clientX: coords.x - 200, clientY: coords.y});
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 2', 'Slide 2');
    centeredSlide = deCarouselComponent.query(By.css('.owl-item.active.center')).nativeElement;
    expect(centeredSlide.innerHTML).toContain('Slide 3', 'Slide 3');
    deDots = deCarouselComponent.queryAll(By.css('.owl-dots .owl-dot'));
    expect(deDots[2].nativeElement.classList.contains('active')).toBeTruthy('3th dot is active');

    // drag carousel to left hand-side on 1 slide; current centered slide is Slide 3
    triggerMouseEvent(deStageWrapper.nativeElement, 'mousedown', {clientX: coords.x, clientY: coords.y});
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x +10, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x + 200, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mouseup', {clientX: coords.x + 200, clientY: coords.y});
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 1', 'Slide 1');
    centeredSlide = deCarouselComponent.query(By.css('.owl-item.active.center')).nativeElement;
    expect(centeredSlide.innerHTML).toContain('Slide 2', 'Slide 2');
    deDots = deCarouselComponent.queryAll(By.css('.owl-dots .owl-dot'));
    expect(deDots[1].nativeElement.classList.contains('active')).toBeTruthy('2th dot is active');

  }));

  it('should drag carousel by mouse [options]="{nav: true, rewind: true}"', fakeAsync(() => {
    discardPeriodicTasks();
    const html = `
      <div style="width: 920px; margin: auto">
        <owl-carousel-o [options]="{nav: true, rewind: true}">
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
    deStageWrapper = deCarouselComponent.query(By.css('owl-stage'));
    deSlides = deCarouselComponent.queryAll(By.css('.owl-item'));
    coords = findCoordsInElem(deSlides[1].nativeElement, getCoords(deSlides[1].nativeElement));

    const stageParent: HTMLElement = deStageWrapper.nativeElement.children[0]; // css rules for this element are being changed outer of angular zone. Thus there's no need to call detectChanges();
    deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
    deDots = deCarouselComponent.queryAll(By.css('.owl-dots .owl-dot'));

    expect(deNavButtons[0].nativeElement.classList.contains('disabled')).toBeFalsy('prev button hasn\'t .disabled');
    expect(deDots.length).toBe(2, '2 dots');

    // drag carousel to right hand-side; current first active slide is Slide 1;
    triggerMouseEvent(deStageWrapper.nativeElement, 'mousedown', {clientX: coords.x, clientY: coords.y});
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x +10, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x + 300, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mouseup', {clientX: coords.x + 300, clientY: coords.y});
    tick();
    expect(stageParent.style.transform).toBe('', '');
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 1', 'Slide 1');
    deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
    expect(deNavButtons[0].nativeElement.classList.contains('disabled')).toBeFalsy('prev button hasn\'t .disabled');
    deDots = deCarouselComponent.queryAll(By.css('.owl-dots .owl-dot'));
    expect(deDots[0].nativeElement.classList.contains('active')).toBeTruthy('1th dot is active');

    deNavButtons[1].triggerEventHandler('click', null);
    tick();
    deNavButtons[1].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[2].nativeElement.innerHTML).toContain('Slide 5', 'Slide 5');

    // drag carousel to left hand-side; current first active slide is Slide 3; last active slide is Slide 5;
    triggerMouseEvent(deStageWrapper.nativeElement, 'mousedown', {clientX: coords.x, clientY: coords.y});
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x -10, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x - 300, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mouseup', {clientX: coords.x - 300, clientY: coords.y});
    tick();
    expect(stageParent.style.transform).toBe('', '');
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[2].nativeElement.innerHTML).toContain('Slide 5', 'Slide 5');
    deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
    expect(deNavButtons[1].nativeElement.classList.contains('disabled')).toBeFalsy('prev button hasn\'t .disabled');
    deDots = deCarouselComponent.queryAll(By.css('.owl-dots .owl-dot'));
    expect(deDots[1].nativeElement.classList.contains('active')).toBeTruthy('2th dot is active');
  }));

  it(`should drag carousel by mouse [options]="{merge: true, nav: true}`, fakeAsync(() => {
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
    testComponent = fixtureHost.componentInstance;
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));
    tick();

    fixtureHost.detectChanges();
    deStageWrapper = deCarouselComponent.query(By.css('owl-stage'));
    deSlides = deCarouselComponent.queryAll(By.css('.owl-item'));
    coords = findCoordsInElem(deSlides[1].nativeElement, getCoords(deSlides[1].nativeElement));

    deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
    deDots = deCarouselComponent.queryAll(By.css('.owl-dots .owl-dot'));

    expect(deNavButtons[0].nativeElement.classList.contains('disabled')).toBeTruthy('prev button has .disabled');
    expect(deDots.length).toBe(3, '3 dots');

    // drag carousel to left hand-side; current first active slide is Slide 1;
    triggerMouseEvent(deStageWrapper.nativeElement, 'mousedown', {clientX: coords.x, clientY: coords.y});
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x -10, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x - 300, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mouseup', {clientX: coords.x - 300, clientY: coords.y});
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 2', 'Slide 2');
    expect(deActiveSlides.length).toBe(2, '2 active slide');
    deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
    expect(deNavButtons[0].nativeElement.classList.contains('disabled')).toBeFalsy('prev button hasn\'t .disabled');
    deDots = deCarouselComponent.queryAll(By.css('.owl-dots .owl-dot'));
    expect(deDots[0].nativeElement.classList.contains('active')).toBeTruthy('1th dot is active');

    // drag carousel to left hand-side; current first active slide is Slide 2;
    triggerMouseEvent(deStageWrapper.nativeElement, 'mousedown', {clientX: coords.x, clientY: coords.y});
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x -10, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x - 300, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mouseup', {clientX: coords.x - 300, clientY: coords.y});
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 3', 'Slide 3');
    expect(deActiveSlides.length).toBe(1, '1 active slide');
    deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
    expect(deNavButtons[0].nativeElement.classList.contains('disabled')).toBeFalsy('prev button hasn\'t .disabled');
    deDots = deCarouselComponent.queryAll(By.css('.owl-dots .owl-dot'));
    expect(deDots[1].nativeElement.classList.contains('active')).toBeTruthy('2th dot is active');

    // drag carousel to right hand-side; current first active slide is Slide 2;
    triggerMouseEvent(deStageWrapper.nativeElement, 'mousedown', {clientX: coords.x, clientY: coords.y});
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x +10, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x + 700, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mouseup', {clientX: coords.x + 700, clientY: coords.y});
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 1', 'Slide 1');
    expect(deActiveSlides.length).toBe(2, '2 active slide');
    deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
    expect(deNavButtons[0].nativeElement.classList.contains('disabled')).toBeTruthy('prev button has .disabled');
    deDots = deCarouselComponent.queryAll(By.css('.owl-dots .owl-dot'));
    expect(deDots[0].nativeElement.classList.contains('active')).toBeTruthy('1th dot is active');
  }));

  it(`should drag carousel by mouse [options]="{nav: true, loop: true, autoWidth: true}`, fakeAsync(() => {
    discardPeriodicTasks();
    const html = `
      <div style="width: 920px; margin: auto">
        <owl-carousel-o [options]="{nav: true, loop: true, autoWidth: true}">
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

    deSlides = deCarouselComponent.queryAll(By.css('.owl-item'));
    deStageWrapper = deCarouselComponent.query(By.css('owl-stage'));

    coords = findCoordsInElem(deSlides[3].nativeElement, getCoords(deSlides[3].nativeElement));
    expect(deActiveSlides.length).toBe(3, '3 active slides');
    expect(deDots.length).toBe(5, '5 dots');

    // drag carousel to left hand-side; current first active slide is Slide 1;
    triggerMouseEvent(deStageWrapper.nativeElement, 'mousedown', {clientX: coords.x, clientY: coords.y});
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x -10, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x - 300, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mouseup', {clientX: coords.x - 300, clientY: coords.y});
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 2', 'Slide 2');
    expect(deActiveSlides.length).toBe(3, '3 active slide');
    deNavButtons = deCarouselComponent.queryAll(By.css('.owl-nav > div'));
    expect(deNavButtons[0].nativeElement.classList.contains('disabled')).toBeFalsy('prev button hasn\'t .disabled');
    deDots = deCarouselComponent.queryAll(By.css('.owl-dots .owl-dot'));
    expect(deDots[1].nativeElement.classList.contains('active')).toBeTruthy('2th dot is active');

    // drag carousel to left hand-side; current first active slide is Slide 2;
    triggerMouseEvent(deStageWrapper.nativeElement, 'mousedown', {clientX: coords.x, clientY: coords.y});
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x -10, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x - 300, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mouseup', {clientX: coords.x - 300, clientY: coords.y});
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 3', 'Slide 3');
    expect(deActiveSlides.length).toBe(2, '2 active slide');
    deDots = deCarouselComponent.queryAll(By.css('.owl-dots .owl-dot'));
    expect(deDots[2].nativeElement.classList.contains('active')).toBeTruthy('3th dot is active');

    // drag carousel to right hand-side; current first active slide is Slide 3;
    triggerMouseEvent(deStageWrapper.nativeElement, 'mousedown', {clientX: coords.x, clientY: coords.y});
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x +10, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x + 600, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mouseup', {clientX: coords.x + 600, clientY: coords.y});
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 1', 'Slide 1');
    expect(deActiveSlides.length).toBe(3, '3 active slide');
    deDots = deCarouselComponent.queryAll(By.css('.owl-dots .owl-dot'));
    expect(deDots[0].nativeElement.classList.contains('active')).toBeTruthy('1th dot is active');
    discardPeriodicTasks();
  }));

  it(`shouldn\'t drag carousel by mouse [options]="{mouseDrag: false}`, fakeAsync(() => {
    const html = `
      <div style="width: 920px; margin: auto">
        <owl-carousel-o [options]="{mouseDrag: false}">
          <ng-template carouselSlide>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide>Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
          <ng-template carouselSlide>Slide 5</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    testComponent = fixtureHost.componentInstance;
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));
    tick();

    fixtureHost.detectChanges();
    deStageWrapper = deCarouselComponent.query(By.css('owl-stage'));
    deSlides = deCarouselComponent.queryAll(By.css('.owl-item'));
    coords = findCoordsInElem(deSlides[1].nativeElement, getCoords(deSlides[1].nativeElement));

    deDots = deCarouselComponent.queryAll(By.css('.owl-dots .owl-dot'));

    expect(deDots.length).toBe(2, '2 dots');

    // drag carousel to left hand-side; current first active slide is Slide 1;
    triggerMouseEvent(deStageWrapper.nativeElement, 'mousedown', {clientX: coords.x, clientY: coords.y});
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x -10, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x - 300, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mouseup', {clientX: coords.x - 300, clientY: coords.y});
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 1', 'Slide 1');
    expect(deActiveSlides.length).toBe(3, '3 active slide');
    deDots = deCarouselComponent.queryAll(By.css('.owl-dots .owl-dot'));
    expect(deDots[0].nativeElement.classList.contains('active')).toBeTruthy('1th dot is active');

    discardPeriodicTasks();
  }));

  it(`shouldn\'t make smooth drag of carousel by mouse right when Slide 1 is active and left when Slide 5 is active[options]="{pullDrag: false}`, fakeAsync(() => {
    const html = `
      <div style="width: 920px; margin: auto">
        <owl-carousel-o [options]="{pullDrag: false}">
          <ng-template carouselSlide>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide>Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
          <ng-template carouselSlide>Slide 5</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    testComponent = fixtureHost.componentInstance;
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));

    tick();
    fixtureHost.detectChanges();

    deDots = deCarouselComponent.queryAll(By.css('.owl-dots .owl-dot'));
    deStageWrapper = deCarouselComponent.query(By.css('owl-stage'));
    deSlides = deCarouselComponent.queryAll(By.css('.owl-item'));
    coords = findCoordsInElem(deSlides[1].nativeElement, getCoords(deSlides[1].nativeElement));

    const stageParent: HTMLElement = deStageWrapper.nativeElement.children[0]; // css rules for this element are being changed outer of angular zone. Thus there's no need to call detectChanges();

    expect(deDots.length).toBe(2, '2 dots');

    // drag carousel to right hand-side; current first active slide is Slide 1;
    triggerMouseEvent(deStageWrapper.nativeElement, 'mousedown', {clientX: coords.x, clientY: coords.y});
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x +10, clientY: coords.y});
    tick();
    expect(stageParent.style.transform).toBe('translate3d(0px, 0px, 0px)', 'translate3d(0px, 0px, 0px)');

    triggerMouseEvent(document, 'mousemove', {clientX: coords.x + 300, clientY: coords.y});
    tick();
    expect(stageParent.style.transform).toBe('translate3d(0px, 0px, 0px)', 'translate3d(0px, 0px, 0px)');

    triggerMouseEvent(document, 'mouseup', {clientX: coords.x + 300, clientY: coords.y});
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 1', 'Slide 1');
    deDots = deCarouselComponent.queryAll(By.css('.owl-dots .owl-dot'));
    expect(deDots[0].nativeElement.classList.contains('active')).toBeTruthy('1th dot is active');

    deDots[1].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[2].nativeElement.innerHTML).toContain('Slide 5', 'Slide 5');

    // drag carousel to right hand-side; current first active slide is Slide 1;
    triggerMouseEvent(deStageWrapper.nativeElement, 'mousedown', {clientX: coords.x, clientY: coords.y});
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x -10, clientY: coords.y});
    tick();
    expect(stageParent.style.transform).toBe('translate3d(0px, 0px, 0px)', 'translate3d(0px, 0px, 0px)');

    triggerMouseEvent(document, 'mousemove', {clientX: coords.x - 300, clientY: coords.y});
    tick();
    expect(stageParent.style.transform).toBe('translate3d(0px, 0px, 0px)', 'translate3d(0px, 0px, 0px)');

    triggerMouseEvent(document, 'mouseup', {clientX: coords.x - 300, clientY: coords.y});
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[2].nativeElement.innerHTML).toContain('Slide 5', 'Slide 5');
    discardPeriodicTasks();
  }));

  it(`should drag carousel with transition-duration=400ms [options]="{smartSpeed: 400}`, fakeAsync(() => {
    const html = `
      <div style="width: 920px; margin: auto">
        <owl-carousel-o [options]="{smartSpeed: 400}">
          <ng-template carouselSlide>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide>Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
          <ng-template carouselSlide>Slide 5</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    testComponent = fixtureHost.componentInstance;
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));

    tick();
    fixtureHost.detectChanges();

    deStageWrapper = deCarouselComponent.query(By.css('owl-stage'));
    deSlides = deCarouselComponent.queryAll(By.css('.owl-item'));
    coords = findCoordsInElem(deSlides[1].nativeElement, getCoords(deSlides[1].nativeElement));

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 1', 'Slide 1');

    // drag carousel to left hand-side; current first active slide is Slide 1;
    triggerMouseEvent(deStageWrapper.nativeElement, 'mousedown', {clientX: coords.x, clientY: coords.y});
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x - 10, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x - 300, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mouseup', {clientX: coords.x - 300, clientY: coords.y});
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 2', 'Slide 2');
    deStage = deCarouselComponent.query(By.css('.owl-stage'));
    expect(getComputedStyle(deStage.nativeElement).transitionDuration).toBe('0.4s', 'transition-duration: 0.4s');
  }));

  it(`should drag carousel with transition-duration=350ms [options]="{dragEndSpeed: 350}`, fakeAsync(() => {
    const html = `
      <div style="width: 920px; margin: auto">
        <owl-carousel-o [options]="{dragEndSpeed: 350}">
          <ng-template carouselSlide>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide>Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
          <ng-template carouselSlide>Slide 5</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    testComponent = fixtureHost.componentInstance;
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));

    tick();
    fixtureHost.detectChanges();

    deStageWrapper = deCarouselComponent.query(By.css('owl-stage'));
    deSlides = deCarouselComponent.queryAll(By.css('.owl-item'));
    coords = findCoordsInElem(deSlides[1].nativeElement, getCoords(deSlides[1].nativeElement));

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 1', 'Slide 1');

    // drag carousel to left hand-side; current first active slide is Slide 1;
    triggerMouseEvent(deStageWrapper.nativeElement, 'mousedown', {clientX: coords.x, clientY: coords.y});
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x - 10, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x - 300, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mouseup', {clientX: coords.x - 300, clientY: coords.y});
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 2', 'Slide 2');
    deStage = deCarouselComponent.query(By.css('.owl-stage'));
    expect(getComputedStyle(deStage.nativeElement).transitionDuration).toBe('0.35s', 'transition-duration: 0.35s');

    discardPeriodicTasks();
  }));

  it(`should drag carousel with transition-duration=350ms and change pages with transition-duration=500ms [options]="{dragEndSpeed: 350, dotsSpeed: 500,}`, fakeAsync(() => {
    const html = `
      <div style="width: 920px; margin: auto">
        <owl-carousel-o [options]="{dragEndSpeed: 350, dotsSpeed: 500}">
          <ng-template carouselSlide>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide>Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
          <ng-template carouselSlide>Slide 5</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    testComponent = fixtureHost.componentInstance;
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));

    tick();
    fixtureHost.detectChanges();

    deStageWrapper = deCarouselComponent.query(By.css('owl-stage'));
    deSlides = deCarouselComponent.queryAll(By.css('.owl-item'));
    coords = findCoordsInElem(deSlides[1].nativeElement, getCoords(deSlides[1].nativeElement));

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 1', 'Slide 1');

    // drag carousel to left hand-side; current first active slide is Slide 1;
    triggerMouseEvent(deStageWrapper.nativeElement, 'mousedown', {clientX: coords.x, clientY: coords.y});
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x - 10, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x - 300, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mouseup', {clientX: coords.x - 300, clientY: coords.y});
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 2', 'Slide 2');
    deStage = deCarouselComponent.query(By.css('.owl-stage'));
    expect(getComputedStyle(deStage.nativeElement).transitionDuration).toBe('0.35s', 'transition-duration: 0.35s');

    deDots = deCarouselComponent.queryAll(By.css('.owl-dots .owl-dot'));
    deDots[1].triggerEventHandler('click', null);
    tick();
    fixtureHost.detectChanges();

    deStage = deCarouselComponent.query(By.css('.owl-stage'));
    expect(getComputedStyle(deStage.nativeElement).transitionDuration).toBe('0.5s', 'transition-duration: 0.5s');

    // drag carousel to right hand-side; current first active slide is Slide 1;
    triggerMouseEvent(deStageWrapper.nativeElement, 'mousedown', {clientX: coords.x, clientY: coords.y});
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x + 10, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mousemove', {clientX: coords.x + 300, clientY: coords.y});
    tick();
    triggerMouseEvent(document, 'mouseup', {clientX: coords.x + 300, clientY: coords.y});
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 2', 'Slide 2');
    deStage = deCarouselComponent.query(By.css('.owl-stage'));
    expect(getComputedStyle(deStage.nativeElement).transitionDuration).toBe('0.35s', 'transition-duration: 0.35s');

    discardPeriodicTasks();
  }));


  it(`should drag carousel with transition-duration=350ms by touch (finger) [options]="{dragEndSpeed: 350}`, fakeAsync(() => {
    const html = `
      <div style="width: 920px; margin: auto">
        <owl-carousel-o [options]="{dragEndSpeed: 350}">
          <ng-template carouselSlide>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide>Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
          <ng-template carouselSlide>Slide 5</ng-template>
        </owl-carousel-o>
      </div>
    `;
    fixtureHost = createTestComponent(html);
    testComponent = fixtureHost.componentInstance;
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));

    tick();
    fixtureHost.detectChanges();

    deStageWrapper = deCarouselComponent.query(By.css('owl-stage'));
    deSlides = deCarouselComponent.queryAll(By.css('.owl-item'));
    coords = findCoordsInElem(deSlides[1].nativeElement, getCoords(deSlides[1].nativeElement));

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 1', 'Slide 1');

    // drag carousel to left hand-side; current first active slide is Slide 1;
    let evtObj = {clientX: coords.x, clientY: coords.y, pageX: coords.x, pageY: coords.y}
    triggerTouchEvent(deStageWrapper.nativeElement, 'touchstart', evtObj);
    triggerMouseEvent(document, 'touchmove', {clientX: coords.x, clientY: coords.y});
    tick();
    evtObj = {clientX: coords.x - 10, clientY: coords.y, pageX: coords.x - 10, pageY: coords.y}
    triggerMouseEvent(document, 'touchmove', evtObj);
    tick();
    evtObj = {clientX: coords.x - 300, clientY: coords.y, pageX: coords.x - 300, pageY: coords.y}
    triggerMouseEvent(document, 'touchmove', evtObj);
    tick();
    triggerMouseEvent(document, 'touchend', evtObj);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 2', 'Slide 2');

    deStage = deCarouselComponent.query(By.css('.owl-stage'));
    expect(getComputedStyle(deStage.nativeElement).transitionDuration).toBe('0.35s', 'transition-duration: 0.35s');

    // drag carousel to left hand-side; current first active slide is Slide 2;
    evtObj = {clientX: coords.x, clientY: coords.y, pageX: coords.x, pageY: coords.y}
    triggerTouchEvent(deStageWrapper.nativeElement, 'touchstart', evtObj);
    triggerMouseEvent(document, 'touchmove', {clientX: coords.x, clientY: coords.y});
    tick();
    evtObj = {clientX: coords.x - 10, clientY: coords.y, pageX: coords.x - 10, pageY: coords.y}
    triggerMouseEvent(document, 'touchmove', evtObj);
    tick();
    evtObj = {clientX: coords.x - 300, clientY: coords.y, pageX: coords.x - 300, pageY: coords.y}
    triggerMouseEvent(document, 'touchmove', evtObj);
    tick();
    triggerMouseEvent(document, 'touchend', evtObj);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 3', 'Slide 3');

    deStage = deCarouselComponent.query(By.css('.owl-stage'));
    expect(getComputedStyle(deStage.nativeElement).transitionDuration).toBe('0.35s', 'transition-duration: 0.35s');

    // drag carousel to right hand-side; current first active slide is Slide 3;
    evtObj = {clientX: coords.x, clientY: coords.y, pageX: coords.x, pageY: coords.y}
    triggerTouchEvent(deStageWrapper.nativeElement, 'touchstart', evtObj);
    triggerMouseEvent(document, 'touchmove', {clientX: coords.x, clientY: coords.y});
    tick();
    evtObj = {clientX: coords.x + 10, clientY: coords.y, pageX: coords.x + 10, pageY: coords.y}
    triggerMouseEvent(document, 'touchmove', evtObj);
    tick();
    evtObj = {clientX: coords.x + 650, clientY: coords.y, pageX: coords.x + 650, pageY: coords.y}
    triggerMouseEvent(document, 'touchmove', evtObj);
    tick();
    triggerMouseEvent(document, 'touchend', evtObj);
    tick();
    fixtureHost.detectChanges();

    deActiveSlides = deCarouselComponent.queryAll(By.css('.owl-item.active'));
    expect(deActiveSlides[0].nativeElement.innerHTML).toContain('Slide 1', 'Slide 1');

    deStage = deCarouselComponent.query(By.css('.owl-stage'));
    expect(getComputedStyle(deStage.nativeElement).transitionDuration).toBe('0.35s', 'transition-duration: 0.35s');
    discardPeriodicTasks();
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

function getCoords(elem) {
  // (1)
  const box = elem.getBoundingClientRect();

  const body = document.body;
  const docEl = document.documentElement;

  // (2)
  const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  // (3)
  const clientTop = docEl.clientTop || body.clientTop || 0;
  const clientLeft = docEl.clientLeft || body.clientLeft || 0;

  // (4)
  const top = box.top + scrollTop - clientTop;
  const left = box.left + scrollLeft - clientLeft;

  return {
    top: top,
    left: left
  };
}

function triggerMouseEvent(node: any, eventType: string, evtObj: any) {
  const evt = new MouseEvent(eventType, evtObj);
  node.dispatchEvent(evt);
}

function findCoordsInElem(elem: HTMLElement, coords: any) {
  return {
    x: coords.left + elem.clientWidth - 30,
    y: coords.top + 10
  }
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