import { Component, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'dapp-align-content',
  templateUrl: './align-content.component.html',
  styleUrls: ['./align-content.component.css'],
})
export class AlignContentComponent implements OnInit {
  childrenNumber = 3;
  flexDirection!: string;
  flexWrap!: string;
  rowGap: number = 0;
  columnGap: number = 0;
  justifyContent!: string;
  alignItems!: string;
  showCSS = false;

  constructor() {}

  ngOnInit(): void {}
}
