import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IMenuItem } from './menu-item.interface';

@Component({
  selector: 'dapp-menu2',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  @Input() items: IMenuItem[] = [];

  @Output() sidenavClose = new EventEmitter();

  constructor() {}
  ngOnInit() {}
  public onSidenavClose = () => {
    this.sidenavClose.emit();
  };
}
