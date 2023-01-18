import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DIUseValueComponent } from './diuse-value.component';

describe('DIUseValueComponent', () => {
  let component: DIUseValueComponent;
  let fixture: ComponentFixture<DIUseValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DIUseValueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DIUseValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
