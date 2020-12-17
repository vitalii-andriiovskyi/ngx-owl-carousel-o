import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SubHomeComponent } from './subhome.component';

describe('SubhomeComponent', () => {
  let component: SubHomeComponent;
  let fixture: ComponentFixture<SubHomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SubHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
