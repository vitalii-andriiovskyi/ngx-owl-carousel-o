import { TestBed, inject } from '@angular/core/testing';

import { AutoHeightService } from './autoheight.service';

describe('AutoheightService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutoHeightService]
    });
  });

  it('should be created', inject([AutoHeightService], (service: AutoHeightService) => {
    expect(service).toBeTruthy();
  }));
});
