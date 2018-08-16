import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwlImageComponent } from './owl-image.component';

describe('OwlImageComponent', () => {
  let component: OwlImageComponent;
  let fixture: ComponentFixture<OwlImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwlImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwlImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
