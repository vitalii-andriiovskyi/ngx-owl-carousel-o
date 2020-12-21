import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DoubledCarouselComponent } from './doubled-carousel.component';

describe('DoubledCarouselComponent', () => {
  let component: DoubledCarouselComponent;
  let fixture: ComponentFixture<DoubledCarouselComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DoubledCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoubledCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
