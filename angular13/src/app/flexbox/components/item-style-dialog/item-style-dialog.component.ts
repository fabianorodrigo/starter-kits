import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'dapp-item-style-dialog',
  templateUrl: './item-style-dialog.component.html',
  styleUrls: ['./item-style-dialog.component.css'],
})
export class ItemStyleDialogComponent implements OnInit {
  order!: string;
  flexGrow!: string;
  flexShrink!: string;
  flexBasis!: string;
  alignSelf!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      style: { [property: string]: string };
    }
  ) {}

  ngOnInit(): void {
    this.order = this.data.style['order'];
    this.flexGrow = this.data.style['flex-grow'];
    this.flexShrink = this.data.style['flex-shrink'];
    this.flexBasis = this.data.style['flex-basis'];
    this.alignSelf = this.data.style['align-self'];
  }

  createItemStyle() {
    const result: { [property: string]: string } = {};
    if (this.order) {
      result['order'] = this.order;
    }
    if (this.flexGrow) {
      result['flex-grow'] = this.flexGrow;
    }
    if (this.flexShrink) {
      result['flex-shrink'] = this.flexShrink;
    }
    if (this.flexBasis) {
      result['flex-basis'] = this.flexBasis;
    }
    if (this.alignSelf) {
      result['align-self'] = this.alignSelf;
    }
    return result;
  }
}
