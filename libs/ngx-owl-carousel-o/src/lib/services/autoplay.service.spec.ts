import { TestBed, inject } from '@angular/core/testing';

import { AutoplayService } from './autoplay.service';

describe('AutoplayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutoplayService]
    });
  });

  it('should be created', inject([AutoplayService], (service: AutoplayService) => {
    expect(service).toBeTruthy();
  }));
});
