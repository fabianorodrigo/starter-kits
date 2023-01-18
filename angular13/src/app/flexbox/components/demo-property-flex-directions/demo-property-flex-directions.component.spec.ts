import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoJustifyContentComponent } from './demo-property-flex-directions.component';

describe('DemoJustifyContentComponent', () => {
  let component: DemoJustifyContentComponent;
  let fixture: ComponentFixture<DemoJustifyContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DemoJustifyContentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoJustifyContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
