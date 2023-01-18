import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectedSecretsComponent } from './protected-secrets.component';

describe('ProtectedSecretsComponent', () => {
  let component: ProtectedSecretsComponent;
  let fixture: ComponentFixture<ProtectedSecretsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtectedSecretsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtectedSecretsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
