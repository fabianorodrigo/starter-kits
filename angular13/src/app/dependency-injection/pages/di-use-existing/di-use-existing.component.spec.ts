import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiUseExistingComponent } from './di-use-existing.component';

describe('DiUseExistingComponent', () => {
  let component: DiUseExistingComponent;
  let fixture: ComponentFixture<DiUseExistingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiUseExistingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiUseExistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
