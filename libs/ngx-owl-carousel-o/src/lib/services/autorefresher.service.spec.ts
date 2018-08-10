import { TestBed, inject } from '@angular/core/testing';

import { AutorefresherService } from './autorefresher.service';
import { WINDOW_PROVIDERS } from './window-ref.service';
import { DOCUMENT_PROVIDERS } from './document-ref.service';

describe('AutorefresherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutorefresherService, WINDOW_PROVIDERS, DOCUMENT_PROVIDERS]
    });
  });

  it(
    'should be created',
    inject([AutorefresherService], (service: AutorefresherService) => {
      expect(service).toBeTruthy();
    })
  );
});
