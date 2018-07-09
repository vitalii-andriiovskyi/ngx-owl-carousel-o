import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import {
  CarouselComponent,
  CarouselSlideDirective
} from './carousel.component';
import { ResizeService } from '../services/resize.service';
import { WINDOW_PROVIDERS } from '../services/window-ref.service';
import { CarouselService } from '../services/carousel.service';

@Component({
  template: `
    <div class="carousel-wrapper" style="width: 1000px;">
      <owl-carousel-o>
        <ng-template carouselSlide>
          Slide 1
        </ng-template>
        <ng-template carouselSlide>
          Slide 2
        </ng-template>
        <ng-template carouselSlide>
          Slide 3
        </ng-template>
        <ng-template carouselSlide>
          Slide 4
        </ng-template>
        <ng-template carouselSlide>
          Slide 5
        </ng-template>
      </owl-carousel-o>
    </div>
  `
})
class TestComponent {}

describe('SurfCarousel2Component with prop "cycled=true"', () => {
  let hostComponent: TestComponent;
  let fixtureHost: ComponentFixture<TestComponent>;

  let carouselComponent: CarouselComponent;
  let deCarouselComponent: DebugElement;
  let carouselService: CarouselService;

  let deNavButtons: DebugElement[];
  let rightButton: HTMLElement;
  let leftButton: HTMLElement;

  let deSlides: DebugElement[];
  let deStages: DebugElement[];

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [
          CarouselComponent,
          TestComponent,
          CarouselSlideDirective
        ],
        providers: [ResizeService, WINDOW_PROVIDERS, CarouselService]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixtureHost = TestBed.createComponent(TestComponent);
    hostComponent = fixtureHost.componentInstance;

    fixtureHost.detectChanges();

    deCarouselComponent = fixtureHost.debugElement.query(
      By.css('owl-carousel-o')
    );
    carouselComponent = deCarouselComponent.componentInstance;
    carouselService = deCarouselComponent.injector.get(CarouselService);

    fixtureHost.detectChanges();

    deNavButtons = fixtureHost.debugElement.queryAll(
      By.css('.owl-nav > div')
    );
    leftButton = deNavButtons[0].nativeElement;
    rightButton = deNavButtons[1].nativeElement;
    deStages = fixtureHost.debugElement.queryAll(
      By.css('.owl-stage')
    );
    // deSlides = fixtureHost.debugElement.queryAll(
    //   By.css('.surf-carousel-2-slide-wrapper')
    // );
  });

  it('should create SurfCarousel2Component', () => {
    expect(hostComponent).toBeTruthy();
  });


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
  template: `
    <div class="carousel-wrapper" style="width: 1000px;">
      <owl-carousel-o>
        <ng-template carouselSlide>
          Slide 1
        </ng-template>
        <ng-template carouselSlide>
          Slide 2
        </ng-template>
        <ng-template carouselSlide>
          Slide 3
        </ng-template>
        <ng-template carouselSlide>
          Slide 4
        </ng-template>
        <ng-template carouselSlide>
          Slide 5
        </ng-template>
      </owl-carousel-o>
    </div>
  `
})
class TestSingleComponent {}

describe('SurfCarousel2Component without prop "cycled=true"', () => {
  let hostComponent: TestSingleComponent;
  let fixtureHost: ComponentFixture<TestSingleComponent>;

  let carouselComponent: CarouselComponent;
  let deCarouselComponent: DebugElement;

  let deNavButtons: DebugElement[];
  let rightButton: HTMLElement;
  let leftButton: HTMLElement;

  let deSlides: DebugElement[];
  let deStage: DebugElement;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [
          CarouselComponent,
          TestSingleComponent,
          CarouselSlideDirective
        ],
        providers: [ResizeService, WINDOW_PROVIDERS, CarouselService]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixtureHost = TestBed.createComponent(TestSingleComponent);
    hostComponent = fixtureHost.componentInstance;

    fixtureHost.detectChanges();
    deCarouselComponent = fixtureHost.debugElement.query(
      By.css('owl-carousel-o')
    );
    fixtureHost.detectChanges();

    deNavButtons = fixtureHost.debugElement.queryAll(
      By.css('.owl-nav > div')
    );
    leftButton = deNavButtons[0].nativeElement;
    rightButton = deNavButtons[1].nativeElement;
    deStage = fixtureHost.debugElement.query(By.css('.owl-stage'));
    // deSlides = fixtureHost.debugElement.queryAll(
    //   By.css('.surf-carousel-2-slide-wrapper')
    // );
  });

  // it('should have 5 sliders', () => {
  //   expect(deSlides.length).toBe(5, 'must be 5 sliders');
  // });

  // it('should have 1 active slider', () => {
  //   deSlides = deStage.queryAll(By.css('.active'));
  //   expect(deSlides.length).toBe(1, '1 active slide');
  // });

  // it('first button (arrow-left) should have class .disabled', () => {
  //   expect(leftButton.classList.contains('disabled')).toBeTruthy();
  // });

  // it('should move carousel left on 1 slide after clicking right button', () => {
  //   deNavButtons[1].triggerEventHandler('click', null);
  //   fixtureHost.detectChanges();

  //   deSlides = deStage.queryAll(By.css('.surf-carousel-2-slide-wrapper'));
  //   expect(deSlides[0].nativeElement.classList.contains('active')).toBeFalsy(
  //     "1t slide hasn't .active class"
  //   );
  //   expect(deSlides[1].nativeElement.classList.contains('active')).toBeTruthy(
  //     '2d slide has .active class'
  //   );
  //   expect(leftButton.classList.contains('disabled')).toBeFalsy(
  //     "left arrow hasn't .disable class"
  //   );
  // });

  // it("shouldn't move carousel right after clicking left button while 1t slide is active", () => {
  //   deNavButtons[0].triggerEventHandler('click', null);
  //   fixtureHost.detectChanges();
  //   deSlides = deStage.queryAll(By.css('.surf-carousel-2-slide-wrapper'));
  //   expect(deSlides[0].nativeElement.classList.contains('active')).toBeTruthy(
  //     '1t slide hasn .active class'
  //   );
  //   expect(leftButton.classList.contains('disabled')).toBeTruthy(
  //     'left arrow has .disable class'
  //   );
  // });

  // it('should right button be disabled while last slide is active', () => {
  //   deNavButtons[1].triggerEventHandler('click', null);
  //   fixtureHost.detectChanges();
  //   deNavButtons[1].triggerEventHandler('click', null);
  //   fixtureHost.detectChanges();
  //   deNavButtons[1].triggerEventHandler('click', null);
  //   fixtureHost.detectChanges();
  //   deNavButtons[1].triggerEventHandler('click', null);
  //   fixtureHost.detectChanges();

  //   deSlides = deStage.queryAll(By.css('.surf-carousel-2-slide-wrapper'));
  //   expect(rightButton.classList.contains('disabled')).toBeTruthy(
  //     'right arrow has .disable class'
  //   );
  //   expect(deSlides[4].nativeElement.classList.contains('active')).toBeTruthy(
  //     'last slide has .active class'
  //   );
  // });
});
