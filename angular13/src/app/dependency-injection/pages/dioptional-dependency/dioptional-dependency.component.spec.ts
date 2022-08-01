import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DIOptionalDependencyComponent } from './dioptional-dependency.component';

describe('DIOptionalDependencyComponent', () => {
  let component: DIOptionalDependencyComponent;
  let fixture: ComponentFixture<DIOptionalDependencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DIOptionalDependencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DIOptionalDependencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
