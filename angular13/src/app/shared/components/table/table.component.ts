import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ITableColumn } from './tableColumn.interface';
import { ITableConfig } from './tableConfig.interface';

@Component({
  selector: 'dapp-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent<T> implements OnInit {
  @Input() columns: ITableColumn[] = [];
  @Input() data: T[] = [];
  @Input() config: ITableConfig = {
    selectable: true,
  };

  @Output() edit = new EventEmitter<T>();
  @Output() delete = new EventEmitter<T>();

  dataSource!: MatTableDataSource<T>;
  selectedRows = new Set<T>();

  constructor() {}

  ngOnInit(): void {}

  /**
   * Chamado quando o Angular seta ou reseta propriedades de entrada data-bound.
   * Ou seja, se this.columns, this.data ou this.config forem modificados, cria-se
   * uma nova instância de datasource
   */
  ngOnChanges(changes: SimpleChanges) {
    this.dataSource = new MatTableDataSource<T>(this.data);
  }

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
