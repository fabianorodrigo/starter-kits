import { Component, Input, OnInit } from '@angular/core';
import { ITableColumn } from 'src/app/shared/components/table/tableColumn.interface';
import { IApprovalEvent } from '../../model/interfaces';
import { IERC20 } from '../../services/erc20.interface';
import { IERC721 } from '../../services/erc721.interface';

@Component({
  selector: 'dapp-token-approval-event',
  templateUrl: './token-approval-event.component.html',
  styleUrls: ['./token-approval-event.component.css'],
})
export class TokenApprovalEventComponent implements OnInit {
  @Input() contract!: IERC20 | IERC721;
  @Input() eventList: IApprovalEvent[] = [];

  displayedColumns: ITableColumn[] = [];

  ngOnInit(): void {
    this.displayedColumns = [
      { propertyName: 'blockNumber', headerTitle: '# Block' },
      { propertyName: 'owner', headerTitle: 'Owner' },
      {
        propertyName: 'spender',
        headerTitle: this.contract?.isERC(721) ? 'Approved' : 'Spender',
      },
      {
        propertyName: 'value',
        headerTitle: this.contract?.isERC(721) ? 'Token ID' : '$',
      },
    ];
  }
}
