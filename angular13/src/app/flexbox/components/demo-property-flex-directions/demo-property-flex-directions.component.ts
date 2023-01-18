import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'dapp-demo-property-flex-directions',
  templateUrl: './demo-property-flex-directions.component.html',
  styleUrls: ['./demo-property-flex-directions.component.css'],
})
export class DemoJustifyContentComponent implements OnInit, OnChanges {
  @Input() childrenNumber: number = 3;
  @Input() fixedProperty!: string;
  @Input() showCSS: boolean = false;

  @Input() container_justifyContent!: string;
  @Input() container_alignItems!: string;
  @Input() container_alignContent!: string;
  @Input() container_flexWrap!: string;
  @Input() container_gap!: number;
  @Input() container_columnGap!: number;

  containerCSS: { [property: string]: string } = {};

  containerCSS_row: { [property: string]: string } = {};
  containerCSS_column: { [property: string]: string } = {};
  containerCSS_rowReverse: { [property: string]: string } = {};
  containerCSS_columnReverse: { [property: string]: string } = {};

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.containerCSS = {};
    this.containerCSS['display'] = 'flex';
    this.containerCSS['justify-content'] = this.container_justifyContent;
    this.containerCSS['align-items'] = this.container_alignItems;
    this.containerCSS['align-content'] = this.container_alignContent;
    this.containerCSS['flex-wrap'] = this.container_flexWrap;
    if (this.container_gap) {
      this.containerCSS['row-gap'] = `${this.container_gap}px`;
    }
    if (this.container_columnGap) {
      this.containerCSS['column-gap'] = `${this.container_columnGap}px`;
    }
    this.containerCSS_row = { ...this.containerCSS, 'flex-direction': 'row' };
    this.containerCSS_column = {
      ...this.containerCSS,
      'flex-direction': 'column',
    };
    this.containerCSS_rowReverse = {
      ...this.containerCSS,
      'flex-direction': 'reverse-row',
    };
    this.containerCSS_columnReverse = {
      ...this.containerCSS,
      'flex-direction': 'reverse-column',
    };
  }

  ngOnInit(): void {}
}
