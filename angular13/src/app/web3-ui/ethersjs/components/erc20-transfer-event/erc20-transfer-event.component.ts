import { Component, Input } from '@angular/core';
import { ITableColumn } from 'src/app/shared/components/table/tableColumn.interface';

import { ITransferEvent } from '../../../shared/model/interfaces/transfer-event.interface';

@Component({
  selector: 'dapp-erc20-transfer-event',
  templateUrl: './erc20-transfer-event.component.html',
  styleUrls: ['./erc20-transfer-event.component.css'],
})
export class ERC20TransferEventComponent {
  @Input() eventList: ITransferEvent[] = [];

  displayedColumns: ITableColumn[] = [
    { propertyName: 'blockNumber', headerTitle: '# Block' },
    { propertyName: 'from', headerTitle: 'From Account' },
    { propertyName: 'to', headerTitle: 'To Account' },
    { propertyName: 'value', headerTitle: '$' },
  ];
}
