import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ethers, Signer } from 'ethers';
import { Result } from 'ethers/lib/utils';
import { ITableColumn } from 'src/app/shared/components/table/tableColumn.interface';

import { EventData } from 'web3-eth-contract';
import { Web3Subscription } from '../../../shared/model/events/Subscription';
import { LINK_TOKEN_ABI } from '../../ABI';
import { ERC20BaseContract } from '../../services/ERC20-base';
import { EthersjsService } from '../../services/ethersjs.service';
import { ITransferEvent } from './transfer-event.interface';

declare let window: any;

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
    this._ethersjsService.getSignerSubject().subscribe(async (_signer) => {
      //Se a conta não for nula, cria uma nova subscrição filtrando por eventos `Transfer`
      // que tenha a conta `from` igual à conta conectada na Wallet
      if (_signer) {
        // subscrição eventos últimos 1000 blocos
        this.fetchPastTransferEvents(_signer);
        // subscrição eventos futuros
        await this.contractERC20.subscribeContractEvent({
          eventName: 'Transfer',
          args: [await _signer.getAddress()],
          listenerFunction: (from, to, value, event) => {
            this.eventList = [
              ...this.eventList,
              {
                blockNumber: event.blockNumber,
                from,
                to,
                value,
              },
            ];
          },
        });
      }
    });
  }

  /**
   * Fetches the past events on the blockchain since current block less 1000 and feed the {pastEvents} array
   *
   * @param signer Account address used to filter the events where 'from' part equals it
   */
  private async fetchPastTransferEvents(_signer: Signer): Promise<void> {
    const currentBlock = await this._ethersjsService.getCurrentBlockNumber();
    // subscrição eventos passados
    const pastEvents = await this.contractERC20.getContractsPastEvent({
      eventName: 'Transfer',
      args: [],
      fromBlock: currentBlock - 1000,
      toBlock: 'latest',
    });

    ////////////////////////////////

    // const linkContract = new ethers.Contract(
    //   '0x01BE23585060835E02B77ef475b0Cc51aA1e0709',
    //   LINK_TOKEN_ABI,
    //   new ethers.providers.Web3Provider(window.ethereum)
    // );
    // const filterTransfer = linkContract.filters['Transfer']();
    // const transferEvents = await linkContract.queryFilter(
    //   filterTransfer,
    //   currentBlock - 50,
    //   'latest'
    // );
    // console.log(
    //   'Transfers____',
    //   transferEvents.map((e) => {
    //     return { transaction: e.transactionHash, block: e.blockNumber };
    //   }),
    //   transferEvents
    // );

    // console.warn(
    //   '#DEBUG',
    //   transferEvents.length,
    //   currentBlock,
    //   transferEvents[transferEvents.length - 1],
    //   transferEvents[0],
    //   //      33084061, // BLOCK WHERE IS THE TRANSACTION IN KOVAN
    //   11138995, // BLOCK WHERE IS THE TRANSACTION IN RINKEBY
    //   pastEvents.filter((e) => {
    //     return e.transactionHash.startsWith('0x55c2dd6b760a');
    //   })
    // );

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
