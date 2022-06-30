import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dapp-justify-content',
  templateUrl: './justify-content.component.html',
  styleUrls: ['./justify-content.component.css'],
})
export class JustifyContentComponent implements OnInit {
  childrenNumber = 3;
  flexDirection!: string;
  flexWrap!: string;
  gap: number = 0;
  alignItems!: string;
  alignContent!: string;

  constructor() {}

  ngOnInit(): void {}
}
