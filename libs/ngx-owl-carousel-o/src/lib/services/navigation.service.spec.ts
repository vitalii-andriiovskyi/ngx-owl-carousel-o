import { TestBed, inject } from '@angular/core/testing';

import { NavigationService } from './navigation.service';
import { CarouselService } from './carousel.service';

describe('NavigationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavigationService, CarouselService]
    });
  });

  it('should be created', inject([NavigationService], (service: NavigationService) => {
    expect(service).toBeTruthy();
  }));
});
