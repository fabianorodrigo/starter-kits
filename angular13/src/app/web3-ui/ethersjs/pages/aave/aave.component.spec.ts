import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AaveComponent } from './aave.component';

describe('AaveComponent', () => {
  let component: AaveComponent;
  let fixture: ComponentFixture<AaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AaveComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
