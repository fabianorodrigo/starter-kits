import { Component, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'dapp-justify-content',
  templateUrl: './justify-content.component.html',
  styleUrls: ['./justify-content.component.css'],
})
export class JustifyContentComponent implements OnInit {
  childrenNumber = 3;
  flexDirection!: string;
  flexWrap!: string;
  rowGap: number = 0;
  columnGap: number = 0;
  alignItems!: string;
  alignContent!: string;
  showCSS = false;

  constructor() {}

  ngOnInit(): void {}
}
