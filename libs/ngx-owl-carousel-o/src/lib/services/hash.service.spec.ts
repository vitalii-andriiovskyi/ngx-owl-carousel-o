import { TestBed, inject } from '@angular/core/testing';

import { HashService } from './hash.service';
import { Component } from '@angular/core';
import { CarouselService } from './carousel.service';
import { OwlLogger } from './logger.service';
import { RouterModule } from '@angular/router';

describe('HashService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([{ path: '', component: TestComponent }])
      ],
      declarations: [TestComponent],
      providers: [HashService, CarouselService, OwlLogger]
    });
  });

  it('should be created', inject([HashService], (service: HashService) => {
    expect(service).toBeTruthy();
  }));
});

@Component({
  selector: 'test-dom',
  template: '',
  standalone: false
})
class TestComponent {
  options: any = {};
  constructor() { }
}
