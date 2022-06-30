import { Component, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'dapp-align-items',
  templateUrl: './align-items.component.html',
  styleUrls: ['./align-items.component.css'],
})
export class AlignItemsComponent implements OnInit {
  childrenNumber = 3;
  flexDirection!: string;
  flexWrap!: string;
  rowGap: number = 0;
  columnGap: number = 0;
  justifyContent!: string;
  alignContent!: string;
  showCSS = false;

  constructor() {}

  ngOnInit(): void {}
}
