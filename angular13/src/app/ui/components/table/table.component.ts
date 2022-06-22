import { ITableColumn } from './tableColumn.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dapp-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @Input() columns: ITableColumn[] = [];
  @Input() dataSource: any[] = [];

  constructor() {}

  ngOnInit(): void {}

  /**
   *
   * @returns array with the property names
   */
  getColumnsDef() {
    return this.columns.map((c) => c.propertyName);
  }
}
