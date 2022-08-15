import { Component, Input } from '@angular/core';
import { ITableColumn } from 'src/app/shared/components/table/tableColumn.interface';

import { ITransferEvent } from '../../model/interfaces/transfer-event.interface';

@Component({
  selector: 'dapp-token-transfer-event',
  templateUrl: './token-transfer-event.component.html',
  styleUrls: ['./token-transfer-event.component.css'],
})
export class TokenTransferEventComponent {
  @Input() eventList: ITransferEvent[] = [];

  displayedColumns: ITableColumn[] = [
    { propertyName: 'blockNumber', headerTitle: '# Block' },
    { propertyName: 'from', headerTitle: 'From Account' },
    { propertyName: 'to', headerTitle: 'To Account' },
    { propertyName: 'value', headerTitle: '$' },
  ];
}
