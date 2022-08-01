import { Component, Input, OnInit } from '@angular/core';
import { IDemo } from '../../services/demo.interface';

@Component({
  selector: 'dapp-show-di-demo',
  templateUrl: './show-di-demo.component.html',
  styleUrls: ['./show-di-demo.component.css'],
})
export class ShowDiDemoComponent implements OnInit {
  @Input() demo!: IDemo;

  constructor() {}

  ngOnInit(): void {}
}
