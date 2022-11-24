import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Web3jsHomeComponent } from './web3js-home.component';

describe('Web3jsHomeComponent', () => {
  let component: Web3jsHomeComponent;
  let fixture: ComponentFixture<Web3jsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Web3jsHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Web3jsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
