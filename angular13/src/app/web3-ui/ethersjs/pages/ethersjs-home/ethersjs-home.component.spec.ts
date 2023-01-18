import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EthersjsHomeComponent } from './ethersjs-home.component';

describe('EthersjsHomeComponent', () => {
  let component: EthersjsHomeComponent;
  let fixture: ComponentFixture<EthersjsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EthersjsHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EthersjsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
