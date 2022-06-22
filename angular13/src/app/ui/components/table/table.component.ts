import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITableColumn } from './tableColumn.interface';
import { ITableConfig } from './tableConfig.interface';

@Component({
  selector: 'dapp-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent<T> implements OnInit {
  @Input() columns: ITableColumn[] = [];
  @Input() dataSource: T[] = [];
  @Input() config: ITableConfig = {
    selectable: true,
  };

  @Output() edit = new EventEmitter<T>();
  @Output() delete = new EventEmitter<T>();

  selectedRows = new Set<T>();

  constructor() {}

  ngOnInit(): void {}

  /**
   *
   * @returns array with the property names
   */
  getColumnsDef() {
    const cols = this.columns.map((c) => c.propertyName);
    if (this.edit.observed || this.delete.observed) {
      cols.push('Actions');
    }
    return cols;
  }

  clickRow(event: Event, row: T) {
    if (this.config.selectable) {
      if (this.selectedRows.has(row)) {
        this.selectedRows.delete(row);
      } else {
        this.selectedRows.add(row);
      }
    }
  }

  /**
   * Triggered when the user clicks on the edit button
   * @param row the row to edit
   */
  onEdit(event: Event, row: T) {
    event.stopPropagation();
    this.edit.emit(row);
  }

  /**
   * Triggered when the user clicks on the delete button
   * @param row the row to edit
   */
  onDelete(event: Event, row: T) {
    event.stopPropagation();
    this.delete.emit(row);
  }
}
