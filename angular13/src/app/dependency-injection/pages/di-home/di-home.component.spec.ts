import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiHomeComponent } from './di-home.component';

describe('DiHomeComponent', () => {
  let component: DiHomeComponent;
  let fixture: ComponentFixture<DiHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
