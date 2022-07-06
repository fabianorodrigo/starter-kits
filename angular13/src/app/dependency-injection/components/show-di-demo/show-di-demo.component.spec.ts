import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDiDemoComponent } from './show-di-demo.component';

describe('ShowDiDemoComponent', () => {
  let component: ShowDiDemoComponent;
  let fixture: ComponentFixture<ShowDiDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowDiDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDiDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
