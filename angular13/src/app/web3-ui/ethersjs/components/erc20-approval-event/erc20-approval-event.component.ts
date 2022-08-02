import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Result } from 'ethers/lib/utils';
import { ITableColumn } from 'src/app/shared/components/table/tableColumn.interface';
import { EventData } from 'web3-eth-contract';
import { ERC20BaseContract } from '../../services/ERC20-base';
import { EthersjsService } from '../../services/ethersjs.service';
import { IApprovalEvent } from './approval-event.interface';

@Component({
  selector: 'dapp-erc20-approval-event',
  templateUrl: './erc20-approval-event.component.html',
  styleUrls: ['./erc20-approval-event.component.css'],
})
export class ERC20ApprovalEventComponent implements OnInit {
  @Input() contractERC20!: ERC20BaseContract;

  eventList: IApprovalEvent[] = [];

  displayedColumns: ITableColumn[] = [
    { propertyName: 'blockNumber', headerTitle: '# Block' },
    { propertyName: 'owner', headerTitle: 'Owner' },
    { propertyName: 'spender', headerTitle: 'Spender' },
    { propertyName: 'value', headerTitle: '$' },
  ];

  constructor(private _web3Service: EthersjsService) {}

  async ngOnInit(): Promise<void> {
    this._web3Service
      .getUserAccountAddressSubject()
      .subscribe(async (accountAddress) => {
        //Se a conta não for nula, cria uma nova subscrição filtrando por eventos `Approval`
        // que tenha a conta `from` igual à conta conectada na Wallet
        if (accountAddress) {
          // subscrição eventos últimos 10 blocos
          this.fetchPastApprovalEvents(accountAddress);
          // subscrição eventos futuros
          await this.contractERC20.subscribeContractEvent({
            eventName: 'Approval',
            args: [accountAddress],
            listenerFunction: (event) => {
              this.eventList = [
                ...this.eventList,
                {
                  blockNumber: event.blockNumber,
                  owner: (<Result>event.args)['owner'],
                  spender: (<Result>event.args)['spender'],
                  value: (<Result>event.args)['value'],
                },
              ];
            },
          });
        }
      });
  }

  /**
   * Fetches the past events on the blockchain since current block less 10 and feed the {pastEvents} array
   *
   * @param accountAddress Account address used to filter the events where 'owner' part equals it
   */
  private async fetchPastApprovalEvents(accountAddress: string): Promise<void> {
    const currentBlock = await this._web3Service.getCurrentBlockNumber();
    // subscrição eventos passados
    // const pastEvents = await this.contractERC20.getContractsPastEvent({
    //   eventName: 'Approval',
    //   web3jsParameters: {
    //     filter: { owner: accountAddress },
    //   },
    // });
    const pastEvents = await this.contractERC20.getContractsPastEvent({
      eventName: 'Approval',
      args: [accountAddress],
      fromBlock: currentBlock - 1000,
      toBlock: 'latest',
    });

    const tempArray = [];
    for (const e of pastEvents) {
      tempArray.push({
        blockNumber: e.blockNumber,
        owner: (<Result>e.args)['owner'],
        spender: (<Result>e.args)['spender'],
        value: (<Result>e.args)['value'],
      });
    }
    this.eventList = [...this.eventList, ...tempArray];
  }
}
