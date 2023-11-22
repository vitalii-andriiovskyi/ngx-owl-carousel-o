import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoubledCarouselComponent } from './doubled-carousel.component';

describe('DoubledCarouselComponent', () => {
  let component: DoubledCarouselComponent;
  let fixture: ComponentFixture<DoubledCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoubledCarouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoubledCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
