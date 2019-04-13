import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";

import { HashService } from './hash.service';
import { Component } from '@angular/core';
import { CarouselService } from './carousel.service';
import { OwlLogger } from './logger.service';

describe('HashService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{path: '', component: TestComponent}])
      ],
      declarations: [ TestComponent ],
      providers: [HashService, CarouselService, OwlLogger]
    });
  });

  it('should be created', inject([HashService], (service: HashService) => {
    expect(service).toBeTruthy();
  }));
});

@Component({
  selector: 'test-dom',
  template: ''
})
class TestComponent {
  options: any = {};
  constructor() {}
}
