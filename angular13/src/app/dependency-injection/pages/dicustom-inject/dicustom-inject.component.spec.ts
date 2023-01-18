import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DICustomInjectComponent } from './dicustom-inject.component';

describe('DICustomInjectComponent', () => {
  let component: DICustomInjectComponent;
  let fixture: ComponentFixture<DICustomInjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DICustomInjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DICustomInjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
