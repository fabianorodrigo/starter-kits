import { Component, Input } from '@angular/core';
import { ITableColumn } from 'src/app/shared/components/table/tableColumn.interface';
import { IApprovalEvent } from '../../../shared/model/interfaces';

@Component({
  selector: 'dapp-erc20-approval-event',
  templateUrl: './erc20-approval-event.component.html',
  styleUrls: ['./erc20-approval-event.component.css'],
})
export class ERC20ApprovalEventComponent {
  @Input() eventList: IApprovalEvent[] = [];

  displayedColumns: ITableColumn[] = [
    { propertyName: 'blockNumber', headerTitle: '# Block' },
    { propertyName: 'owner', headerTitle: 'Owner' },
    { propertyName: 'spender', headerTitle: 'Spender' },
    { propertyName: 'value', headerTitle: '$' },
  ];
}
