import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ERC20ApproveDeprectaedComponent } from './erc20-approve.component';

describe('ERC20ApproveComponent', () => {
  let component: ERC20ApproveDeprectaedComponent;
  let fixture: ComponentFixture<ERC20ApproveDeprectaedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ERC20ApproveDeprectaedComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ERC20ApproveDeprectaedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
