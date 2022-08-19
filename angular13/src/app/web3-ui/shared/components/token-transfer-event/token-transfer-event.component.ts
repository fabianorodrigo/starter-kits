import { Component, Input, OnInit } from '@angular/core';
import { ITableColumn } from 'src/app/shared/components/table/tableColumn.interface';

import { ITransferEvent } from '../../model/interfaces/transfer-event.interface';
import { IERC20 } from '../../services/erc20.interface';
import { IERC721 } from '../../services/erc721.interface';

@Component({
  selector: 'dapp-token-transfer-event',
  templateUrl: './token-transfer-event.component.html',
  styleUrls: ['./token-transfer-event.component.css'],
})
export class TokenTransferEventComponent implements OnInit {
  @Input() contract!: IERC20 | IERC721;
  @Input() eventList: ITransferEvent[] = [];

  displayedColumns: ITableColumn[] = [];

  ngOnInit(): void {
    this.displayedColumns = [
      { propertyName: 'blockNumber', headerTitle: '# Block' },
      { propertyName: 'from', headerTitle: 'From Account' },
      { propertyName: 'to', headerTitle: 'To Account' },
      {
        propertyName: 'value',
        headerTitle: this.contract?.isERC(721) ? 'Token ID' : '$',
      },
    ];
  }
}
