import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';

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
  style: { [property: string]: any } = {};

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.mountCssAndStyle();
  }

  private mountCssAndStyle() {
    this.css = '';
    this.style = {};

    for (const property in this.container) {
      if (this.container[property]) {
        this.css += ` ${property}: ${this.container[property]}\n`;
        this.style[property] = this.container[property];
      }
    }

    //remover última quebra de linha
    this.css = this.css.substring(0, this.css.length - 1);
  }

  getChar(i: number) {
    return String.fromCharCode(i + 65);
  }
}
