import { TestBed, inject, ComponentFixture, fakeAsync, async, tick } from '@angular/core/testing';

import { CarouselService } from './carousel.service';
import { Component, DebugElement } from '@angular/core';
import { SlidesOutputData, CarouselComponent, CarouselSlideDirective } from '../carousel/carousel.component';
import { createGenericTestComponent } from '../carousel/test/common';
import { ResizeService } from './resize.service';
import { WINDOW_PROVIDERS } from './window-ref.service';
import { NavigationService } from './navigation.service';

import 'zone.js/dist/zone-patch-rxjs-fake-async';
import { By } from '@angular/platform-browser';
import { DOCUMENT_PROVIDERS } from './document-ref.service';
import { StageComponent } from '../carousel/stage/stage.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from "@angular/router/testing";

describe('CarouselService', () => {
  let carouselService: CarouselService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarouselService]
    });
    carouselService = TestBed.get(CarouselService);
  });

  it('should be created', inject([CarouselService], (service: CarouselService) => {
    expect(service).toBeTruthy();
  }));

  it('should add new key to prop _invalidated; method invalidate()', () => {
    const result = carouselService.invalidate('move');
    expect(result[0]).toBe('move');
    expect(carouselService.invalidated.hasOwnProperty('move')).toBe(true);
  });

  it('should add new state to carouselService.states; call method enter()', () => {
    expect(carouselService.states.current.hasOwnProperty('move')).toBe(false, 'there\'s no state move');
    carouselService.enter('move');
    expect(carouselService.states.current.hasOwnProperty('move')).toBe(true, 'has state move');
    expect(carouselService.states.current['move']).toBe(1);
  });

  it('should add new state to carouselService.states and after calling leave() decrease value of current state', () => {
    carouselService.enter('move');
    expect(carouselService.states.current['move']).toBe(1);
    carouselService.leave('move');
    expect(carouselService.states.current['move']).toBe(0);
  });

  it('should the carousel be in a state "move"', () => {
    carouselService.enter('move');
    let state = carouselService.is('move');
    expect(state).toBe(true);

    carouselService.leave('move');
    state = carouselService.is('move');
    expect('' + state).toBe('0', 'state is 0 after leaving');

  });

});

const createTestComponent = (html: string) =>
    createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>

describe('CarouselService in context of TestComponent', () => {
  let carouselService: CarouselService;
  let testComponent: TestComponent;

  let fixtureHost: ComponentFixture<TestComponent>;
  let deCarouselComponent: DebugElement;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          NoopAnimationsModule,
          RouterTestingModule.withRoutes([{path: '', component: TestComponent}])
        ],
        declarations: [
          CarouselComponent,
          TestComponent,
          CarouselSlideDirective,
          StageComponent
        ],
        providers: [ResizeService, WINDOW_PROVIDERS, CarouselService, NavigationService, DOCUMENT_PROVIDERS]
      });
    })
  );

  it('should be correct result after calling closest() method with 2th argument "null"', fakeAsync(() => {
    const html = `
      <div style="width: 920px; margin: auto">
        <owl-carousel-o>
          <ng-template carouselSlide>Slide 1</ng-template>
          <ng-template carouselSlide>Slide 2</ng-template>
          <ng-template carouselSlide>Slide 3</ng-template>
          <ng-template carouselSlide>Slide 4</ng-template>
          <ng-template carouselSlide>Slide 5</ng-template>
        </owl-carousel-o>
      </div>
    `;

    let closestItem: number;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));
    tick();
    carouselService = deCarouselComponent.injector.get(CarouselService);

    closestItem = carouselService.closest(-100, null);
    expect(closestItem).toBe(0, '0');

    closestItem = carouselService.closest(-6, null);
    expect(closestItem).toBe(0, '0');

    closestItem = carouselService.closest(50, null);
    expect(closestItem).toBe(0, '0');
  }));

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