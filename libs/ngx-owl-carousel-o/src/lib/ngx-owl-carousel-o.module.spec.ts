import { TestBed, waitForAsync } from '@angular/core/testing';
import { NgxOwlCarouselOModule } from './ngx-owl-carousel-o.module';

describe('NgxOwlCarouselOModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NgxOwlCarouselOModule]
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(NgxOwlCarouselOModule).toBeDefined();
  });
});
