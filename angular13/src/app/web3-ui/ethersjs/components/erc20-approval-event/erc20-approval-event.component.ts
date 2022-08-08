import { Component, Input, OnInit } from '@angular/core';
import { Signer } from 'ethers';
import { Result } from 'ethers/lib/utils';
import { ITableColumn } from 'src/app/shared/components/table/tableColumn.interface';
import { IApprovalEvent } from '../../../shared/model/interfaces';
import { ERC20BaseContract } from '../../services/ERC20-base';
import { EthersjsService } from '../../services/ethersjs.service';

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
