import { Component, Input, OnInit } from '@angular/core';
import { ITableColumn } from 'src/app/shared/components/table/tableColumn.interface';
import { IApprovalForAllEvent } from '../../model/interfaces/approvalForAll-event.interface';
import { IERC20 } from '../../services/erc20.interface';
import { IERC721 } from '../../services/erc721.interface';

@Component({
  selector: 'dapp-erc721-approvalForAll-event',
  templateUrl: './erc721-approvalForAll-event.component.html',
  styleUrls: ['./erc721-approvalForAll-event.component.css'],
})
export class ERC721ApprovalForAllEventComponent implements OnInit {
  @Input() contract!: IERC20 | IERC721;
  @Input() eventList: IApprovalForAllEvent[] = [];

  displayedColumns: ITableColumn[] = [];

  ngOnInit(): void {
    this.displayedColumns = [
      { propertyName: 'blockNumber', headerTitle: '# Block' },
      { propertyName: 'owner', headerTitle: 'Owner' },
      {
        propertyName: 'operator',
        headerTitle: 'Operator',
      },
      {
        propertyName: 'action',
        headerTitle: 'Action',
      },
    ];
  }
}
