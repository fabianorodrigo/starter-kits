import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexboxHomeComponent } from './flexbox-home.component';

describe('FlexboxHomeComponent', () => {
  let component: FlexboxHomeComponent;
  let fixture: ComponentFixture<FlexboxHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlexboxHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexboxHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
