import { TestBed, inject } from '@angular/core/testing';

import { AnimateService } from './animate.service';

describe('AnimateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnimateService]
    });
  });

  it('should be created', inject([AnimateService], (service: AnimateService) => {
    expect(service).toBeTruthy();
  }));
});
