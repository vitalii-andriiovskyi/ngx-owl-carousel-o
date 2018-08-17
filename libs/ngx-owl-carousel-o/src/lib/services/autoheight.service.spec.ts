import { TestBed, inject } from '@angular/core/testing';

import { AutoHeightService } from './autoheight.service';
import { CarouselService } from './carousel.service';

describe('AutoheightService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutoHeightService, CarouselService]
    });
  });

  it('should be created', inject([AutoHeightService], (service: AutoHeightService) => {
    expect(service).toBeTruthy();
  }));
});
