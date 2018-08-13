import { TestBed, inject } from '@angular/core/testing';

import { LazyLoadService } from './lazyload.service';

describe('LazyloadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LazyLoadService]
    });
  });

  it('should be created', inject([LazyLoadService], (service: LazyLoadService) => {
    expect(service).toBeTruthy();
  }));
});
