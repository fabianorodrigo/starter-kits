import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlignContentComponent } from './align-content.component';

describe('AlignContentComponent', () => {
  let component: AlignContentComponent;
  let fixture: ComponentFixture<AlignContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlignContentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlignContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
