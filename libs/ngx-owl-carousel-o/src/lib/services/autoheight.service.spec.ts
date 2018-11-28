import { TestBed, inject } from '@angular/core/testing';

import { AutoHeightService } from './autoheight.service';
import { CarouselService } from './carousel.service';
import { OwlLogger } from './logger.service';

describe('AutoheightService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutoHeightService, CarouselService, OwlLogger]
    });
  });

  it('should be created', inject([AutoHeightService], (service: AutoHeightService) => {
    expect(service).toBeTruthy();
  }));
});
