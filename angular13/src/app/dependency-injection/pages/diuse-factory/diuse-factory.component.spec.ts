import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DIUseFactoryComponent } from './diuse-factory.component';

describe('DIUseFactoryComponent', () => {
  let component: DIUseFactoryComponent;
  let fixture: ComponentFixture<DIUseFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DIUseFactoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DIUseFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
