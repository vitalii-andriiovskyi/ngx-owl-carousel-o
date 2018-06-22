import { TestBed, inject } from '@angular/core/testing';

import { AutorefresherService } from './autorefresher.service';

describe('AutorefresherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutorefresherService]
    });
  });

  it('should be created', inject([AutorefresherService], (service: AutorefresherService) => {
    expect(service).toBeTruthy();
  }));
});
