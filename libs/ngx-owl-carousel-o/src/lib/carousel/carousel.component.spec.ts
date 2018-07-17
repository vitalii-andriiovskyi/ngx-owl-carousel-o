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


const createTestComponent = (html: string) =>
    createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>


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
      });
    })
  );

  // it('should create SurfCarousel2Component', () => {
  //   expect(hostComponent).toBeTruthy();
  // });


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
  template: ''
})
class TestComponent {}