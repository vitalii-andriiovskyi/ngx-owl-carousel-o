import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubhomeComponent } from './subhome.component';

describe('SubhomeComponent', () => {
  let component: SubhomeComponent;
  let fixture: ComponentFixture<SubhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubhomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
