import { TestBed, inject } from '@angular/core/testing';

import { LazyLoadService } from './lazyload.service';
import { CarouselService } from './carousel.service';
import { OwlLogger } from './logger.service';

describe('LazyloadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LazyLoadService, CarouselService, OwlLogger]
    });
  });

  it('should be created', inject([LazyLoadService], (service: LazyLoadService) => {
    expect(service).toBeTruthy();
  }));
});
