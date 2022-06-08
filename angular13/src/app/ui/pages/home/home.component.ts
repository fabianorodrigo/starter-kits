import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dapp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  betTokenOwner!: string;
  gameFactoryOwner!: string;
  calculatorOwner!: string;

  constructor() {}

  ngOnInit(): void {}

  public executeSelectedChange = (event: any) => {
    console.log(event);
  };
}
