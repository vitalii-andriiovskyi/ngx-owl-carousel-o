import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubHomeComponent } from './subhome.component';

describe('SubhomeComponent', () => {
  let component: SubHomeComponent;
  let fixture: ComponentFixture<SubHomeComponent>;

  beforeEach(async(() => {
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
