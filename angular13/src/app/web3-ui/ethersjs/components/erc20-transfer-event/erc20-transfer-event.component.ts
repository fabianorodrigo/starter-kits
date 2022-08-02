import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Result } from 'ethers/lib/utils';
import { ITableColumn } from 'src/app/shared/components/table/tableColumn.interface';

import { EventData } from 'web3-eth-contract';
import { Web3Subscription } from '../../../shared/model/events/Subscription';
import { ERC20BaseContract } from '../../services/ERC20-base';
import { EthersjsService } from '../../services/ethersjs.service';
import { ITransferEvent } from './transfer-event.interface';

@Component({
  selector: 'dapp-erc20-transfer-event',
  templateUrl: './erc20-transfer-event.component.html',
  styleUrls: ['./erc20-transfer-event.component.css'],
})
export class ERC20TransferEventComponent implements OnInit {
  @Input() contractERC20!: ERC20BaseContract;

  eventList: ITransferEvent[] = [];

  displayedColumns: ITableColumn[] = [
    { propertyName: 'blockNumber', headerTitle: '# Block' },
    { propertyName: 'from', headerTitle: 'From Account' },
    { propertyName: 'to', headerTitle: 'To Account' },
    { propertyName: 'value', headerTitle: '$' },
  ];

  constructor(private _ethersjsService: EthersjsService) {}

  jureba: any;

  async ngOnInit(): Promise<void> {
    // const web3 = new Web3(Web3.givenProvider);

    // this.jureba = new web3.eth.Contract(
    //   this.contractERC20.getContractABI(),
    //   environment.KOVAN.LINK_TOKEN
    // );
    // this.jureba.events.Transfer().on('data', (ev: any) => {
    //   console.log('toma evento', ev);
    // });
    // this.jureba
    //   .getPastEvents('Transfer', {
    //     fromBlock: (await web3.eth.getBlockNumber()) - 1000,
    //     toBlock: 'latest',
    //     filter: { from: '0x97b6183621504b18Ccb97D0422c33a5D3601b862' },
    //   })
    //   .then((events: EventData[]) => {
    //     console.log(`toma past da jureba`, events);
    //   });
    /////////
    this._ethersjsService
      .getUserAccountAddressSubject()
      .subscribe(async (accountAddress) => {
        //Se a conta não for nula, cria uma nova subscrição filtrando por eventos `Transfer`
        // que tenha a conta `from` igual à conta conectada na Wallet
        if (accountAddress) {
          // subscrição eventos últimos 10 blocos
          this.fetchPastTransferEvents(accountAddress);
          // subscrição eventos futuros
          await this.contractERC20.subscribeContractEvent({
            eventName: 'Transfer',
            args: [accountAddress],
            listenerFunction: (event) => {
              this.eventList = [
                ...this.eventList,
                {
                  blockNumber: event.blockNumber,
                  from: (<Result>event.args)['from'],
                  to: (<Result>event.args)['to'],
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
   * @param accountAddress Account address used to filter the events where 'from' part equals it
   */
  private async fetchPastTransferEvents(accountAddress: string): Promise<void> {
    const currentBlock = await this._ethersjsService.getCurrentBlockNumber();
    // subscrição eventos passados
    const pastEvents = await this.contractERC20.getContractsPastEvent({
      eventName: 'Transfer',
      args: [accountAddress],
      fromBlock: currentBlock - 1000,
      toBlock: 'latest',
    });

    const tempArray = [];
    for (const e of pastEvents) {
      tempArray.push({
        blockNumber: e.blockNumber,
        from: (<Result>e.args)['from'],
        to: (<Result>e.args)['to'],
        value: (<Result>e.args)['value'],
      });
    }
    this.eventList = [...this.eventList, ...tempArray];
  }
}
