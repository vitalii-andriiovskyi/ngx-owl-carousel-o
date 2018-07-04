import { TestBed, inject } from '@angular/core/testing';

import { CustomEventsService } from './custom-events.service';

describe('CustomEventsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomEventsService]
    });
  });

  it(
    'should be created',
    inject([CustomEventsService], (service: CustomEventsService) => {
      expect(service).toBeTruthy();
    })
  );
});
