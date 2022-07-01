import { Component, OnInit } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { slideInAnimation } from '../../animations';

@Component({
  selector: 'dapp-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.css'],
  animations: [slideInAnimation],
})
export class ProductHomeComponent implements OnInit {
  constructor(private contexts: ChildrenOutletContexts) {}

  ngOnInit(): void {}

  /**
   * https://angular.io/guide/router-tutorial-toh#adding-routable-animations
   * @returns
   */
  getAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ];
  }
}
