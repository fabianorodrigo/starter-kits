import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'dapp-demo-container',
  templateUrl: './demo-container.component.html',
  styleUrls: ['./demo-container.component.css'],
})
export class DemoContainerComponent implements OnInit, OnChanges {
  @Input() childrenNumber: number = 3;
  @Input() itemAClasses = 'item';
  @Input() itemBClasses = 'item';
  @Input() itemCClasses = 'item';
  @Input() allItemsClasses = 'item';

  @Input() container_display!: string;
  @Input() container_flexDirection!: string;
  @Input() container_flexWrap!: string;
  @Input() container_justifyContent!: string;
  @Input() container_gap!: number;
  @Input() container_alignItems!: string;
  @Input() container_alignContent!: string;

  css: string = '';
  style: { [property: string]: any } = {};

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges() {
    this.mountCssAndStyle();
  }

  private mountCssAndStyle() {
    this.css = '';
    this.style = {};
    if (this.container_display) {
      this.css += ` display: ${this.container_display};\n`;
      this.style['display'] = this.container_display;
    }
    if (this.container_flexDirection) {
      this.css += ` flex-direction: ${this.container_flexDirection};\n`;
      this.style['flex-direction'] = this.container_flexDirection;
    }
    if (this.container_flexWrap) {
      this.css += ` flex-wrap: ${this.container_flexWrap};\n`;
      this.style['flex-wrap'] = this.container_flexWrap;
    }
    if (this.container_justifyContent) {
      this.css += ` justify-content: ${this.container_justifyContent};\n`;
      this.style['justify-content'] = this.container_justifyContent;
    }
    if (this.container_gap) {
      this.css += ` gap: ${this.container_gap}px;\n`;
      this.style['gap'] = `${this.container_gap}px`;
    }
    if (this.container_alignItems) {
      this.css += ` align-items: ${this.container_alignItems};\n`;
      this.style['align-items'] = this.container_alignItems;
    }
    if (this.container_alignContent) {
      this.css += ` align-content: ${this.container_alignContent};\n`;
      this.style['align-content'] = this.container_alignContent;
    }

    if (this.container_flexDirection?.startsWith('column')) {
      this.css += ` /* it is needed in order to be able too
  notice behavior differences in flex-direction 'column' modes */\n`;

      this.css += ` min-height: 450px;\n`;
      this.css += ` max-height: 550px; \n`;
      this.style['min-height'] = '450px';
      this.style['max-height'] = '550px';
    }
    //remover última quebra de linha
    this.css = this.css.substring(0, this.css.length - 1);
  }

  getChar(i: number) {
    return String.fromCharCode(i + 65);
  }
}
