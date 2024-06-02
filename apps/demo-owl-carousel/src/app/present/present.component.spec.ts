import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentComponent } from './present.component';

describe('PresentComponent', () => {
  let component: PresentComponent;
  let fixture: ComponentFixture<PresentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PresentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
