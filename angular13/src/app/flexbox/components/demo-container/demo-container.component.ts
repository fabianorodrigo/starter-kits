import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ItemStyleDialogComponent } from '../item-style-dialog/item-style-dialog.component';

@Component({
  selector: 'dapp-demo-container',
  templateUrl: './demo-container.component.html',
  styleUrls: ['./demo-container.component.css'],
})
export class DemoContainerComponent implements OnInit, OnChanges {
  @Input() childrenNumber: number = 3;
  @Input() showCSS: boolean = false;

  @Input() container: { [property: string]: string } = {};

  css: string = '';
  containerStyle: { [property: string]: any } = {};
  itemStyle: { [property: string]: { [property: string]: any } } = {};

  constructor(private _dialog: MatDialog) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.mountCssAndStyle();
  }

  private mountCssAndStyle() {
    this.css = '';
    this.containerStyle = {};

    for (const property in this.container) {
      if (this.container[property]) {
        this.css += ` ${property}: ${this.container[property]}\n`;
        this.containerStyle[property] = this.container[property];
      }
    }

    //remover última quebra de linha
    this.css = this.css.substring(0, this.css.length - 1);
  }

  getCSSChildren(): string[] {
    const result: string[] = [];
    for (let item of Object.keys(this.itemStyle)) {
      let css = '';
      for (let property of Object.keys(this.itemStyle[item])) {
        css += `${property}: ${this.itemStyle[item][property]}\n`;
      }
      if (css) {
        css = `/* ${item} */\n${css}`;
        result.push(css);
      }
    }
    return result;
  }

  getChar(i: number) {
    return String.fromCharCode(i + 65);
  }

  itemClick(index: number) {
    const dialogRef = this._dialog.open(ItemStyleDialogComponent, {
      data: {
        title: `Specify the item style`,
        style: this.itemStyle[this.getChar(index)] || {},
      },
    });

    dialogRef.afterClosed().subscribe((_style) => {
      if (_style) {
        this.itemStyle[this.getChar(index)] = _style;
      }
    });
  }
}
