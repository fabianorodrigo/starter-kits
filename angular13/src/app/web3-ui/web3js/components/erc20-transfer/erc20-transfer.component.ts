import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import BN from 'bn.js';
import { BaseFormComponent } from 'src/app/shared/pages/base-form/base-form.component';
import { MessageService } from 'src/app/shared/services/message.service';
import { NumbersService } from 'src/app/shared/services/numbers.service';
import { Web3Subscription } from 'src/app/web3-ui/shared/model/events/Subscription';
import { ITransferEvent } from 'src/app/web3-ui/shared/model/interfaces';
import { ethereumAddressValidator } from 'src/app/web3-ui/shared/validators/ethereumAddress.validator';
import { EventData } from 'web3-eth-contract';
import { TransactionResult } from '../../../shared/model';
import { ERC20BaseContract } from '../../services/ERC20-base';
import { Web3Service } from '../../services/web3.service';

@Component({
  selector: 'dapp-erc20-transfer',
  templateUrl: './erc20-transfer.component.html',
  styleUrls: ['./erc20-transfer.component.css'],
})
export class ERC20TransferComponent
  extends BaseFormComponent
  implements OnInit, OnDestroy
{
  @Input() contractERC20!: ERC20BaseContract;
  @Input() symbol: string = '';
  @Input() decimals: number = 1;

  isLoading = false;
  eventPastSubscription!: Web3Subscription;
  eventSubscription!: Web3Subscription;
  eventList: ITransferEvent[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _messageService: MessageService,
    private _numberService: NumbersService,
    private _web3Service: Web3Service
  ) {
    super();
  }

  ngOnInit(): void {
    //o minLength é para prevenir o "Short address/parameter Attack"
    this.form = this._formBuilder.group({
      toAddress: [
        '',
        [
          Validators.required,
          Validators.minLength(42),
          ethereumAddressValidator,
        ],
      ],
      value: ['', [Validators.required, Validators.min(1)]],
    });

    // EVENTOS
    this._web3Service
      .getUserAccountAddressSubject()
      .subscribe(async (accountAddress) => {
        //se existe uma subscrição, encerra-a
        if (this.eventSubscription) {
          this.eventSubscription.unsubscribe();
        }
        //Se a conta não for nula, cria uma nova subscrição filtrando por eventos `Transfer`
        // que tenha a conta `from` igual à conta conectada na Wallet
        if (accountAddress) {
          // subscrição eventos últimos 10 blocos
          this.fetchPastTransferEvents(accountAddress);
          // subscrição eventos futuros
          await this.contractERC20.subscribeContractEvent({
            eventName: 'Transfer',
            args: { from: accountAddress },
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

          // this.eventSubscription.on('data', (event: EventData) => {
          //   console.log('subscr evento Transfer', event.returnValues);
          //   this.eventList = [
          //     ...this.eventList,
          //     {
          //       blockNumber: event.blockNumber,
          //       from: event.returnValues['from'],
          //       to: event.returnValues['to'],
          //       value: event.returnValues['value'],
          //     },
          //   ];
          // });
          // this.eventSubscription.on('error', (error) => {
          //   alert(error);
          // });
        }
      });
  }

  ngOnDestroy(): void {
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }
  }

  transfer(event: Event) {
    this.submitted = true;
    event.preventDefault();
    if (this.form.valid) {
      this.isLoading = true;

      try {
        this.contractERC20
          .transfer(
            (this.form.get('toAddress') as FormControl).value,
            (this.form.get('value') as FormControl).value,
            (result: TransactionResult<string>) => {
              this.isLoading = false;
              this._messageService.show(result.result);
            }
          )
          .subscribe((result) => {
            if (result.success == false) {
              this._messageService.show(
                `It was not possible to send the transaction: ${result.result}`
              );
              return;
            } else {
              this._messageService.show(result.result);
            }

            this.isLoading = false;
          });
      } catch (e: unknown) {
        this.isLoading = false;
        this._messageService.show((<Error>e).message);
      }
    } else {
      this._messageService.show(
        `The data filled in the form is not valid. Please, fill the form correctly before submit it`
      );
    }
  }

  /**
   * Fetches the past events on the blockchain since current block less 1000 and feed the {pastEvents} array
   *
   * @param accountAddress Account address used to filter the events where 'from' part equals it
   */
  private async fetchPastTransferEvents(accountAddress: string): Promise<void> {
    const currentBlock = await this._web3Service.getCurrentBlockNumber();
    // subscrição eventos passados
    const pastEvents = await this.contractERC20.getContractsPastEvent({
      eventName: 'Transfer',
      args: { from: accountAddress },
      fromBlock: currentBlock - 1000,
      toBlock: 'latest',
    });

    const tempArray = [];
    for (const e of pastEvents) {
      tempArray.push({
        blockNumber: e.blockNumber,
        from: e.returnValues['from'],
        to: e.returnValues['to'],
        value: e.returnValues['value'],
      });
    }
    this.eventList = [...this.eventList, ...tempArray];
  }
}
