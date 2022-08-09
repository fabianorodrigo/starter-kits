import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BaseFormComponent } from 'src/app/shared/pages/base-form/base-form.component';
import { MessageService } from 'src/app/shared/services/message.service';
import { NumbersService } from 'src/app/shared/services/numbers.service';
import { Web3Subscription } from 'src/app/web3-ui/shared/model/events/Subscription';
import { IApprovalEvent } from 'src/app/web3-ui/shared/model/interfaces';
import { ethereumAddressValidator } from 'src/app/web3-ui/shared/validators/ethereumAddress.validator';
import { EventData } from 'web3-eth-contract';
import { TransactionResult } from '../../../shared/model';
import { ERC20BaseContract } from '../../services/ERC20-base';
import { Web3Service } from '../../services/web3.service';

@Component({
  selector: 'dapp-erc20-approvedepre',
  templateUrl: './erc20-approve.component.html',
  styleUrls: ['./erc20-approve.component.css'],
})
export class ERC20ApproveDeprectaedComponent
  extends BaseFormComponent
  implements OnInit, OnDestroy
{
  @Input() contractERC20!: ERC20BaseContract;
  @Input() symbol: string = '';
  @Input() decimals: number = 1;

  isLoading = false;
  eventPastSubscription!: Web3Subscription;
  eventSubscription!: Web3Subscription;
  eventList: IApprovalEvent[] = [];

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
      spenderAddress: [
        '',
        [
          Validators.required,
          Validators.minLength(42),
          ethereumAddressValidator,
        ],
      ],
      value: ['', [Validators.required, Validators.min(1)]],
    });

    //EVENTOS
    this._web3Service
      .getUserAccountAddressSubject()
      .subscribe(async (accountAddress) => {
        //se existe uma subscrição, encerra-a
        if (this.eventSubscription) {
          this.eventSubscription.unsubscribe();
        }
        //Se a conta não for nula, cria uma nova subscrição filtrando por eventos `Approval`
        // que tenha a conta `from` igual à conta conectada na Wallet
        if (accountAddress) {
          // subscrição eventos últimos 10 blocos
          this.fetchPastApprovalEvents(accountAddress);
          // subscrição eventos futuros
          await this.contractERC20.subscribeContractEvent({
            eventName: 'Approval',
            args: { from: accountAddress },
            listenerFunction: (owner, spender, value, event) => {
              this.eventList = [
                ...this.eventList,
                {
                  blockNumber: event.blockNumber,
                  owner,
                  spender,
                  value,
                },
              ];
            },
          });

          // this.eventSubscription.on('data', (event: EventData) => {
          //   console.log('subscr evento approval', event);
          //   this.eventList = [
          //     ...this.eventList,
          //     {
          //       blockNumber: event.blockNumber,
          //       owner: event.returnValues['owner'],
          //       spender: event.returnValues['spender'],
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

  approve(event: Event) {
    this.submitted = true;
    event.preventDefault();
    if (this.form.valid) {
      this.isLoading = true;

      try {
        this.contractERC20
          .approve(
            (this.form.get('spenderAddress') as FormControl).value,
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

  ngOnDestroy(): void {
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }
  }

  /**
   * Fetches the past events on the blockchain since current block less 10 and feed the {pastEvents} array
   *
   * @param accountAddress Account address used to filter the events where 'owner' part equals it
   */
  private async fetchPastApprovalEvents(accountAddress: string): Promise<void> {
    const currentBlock = await this._web3Service.getCurrentBlockNumber();
    // subscrição eventos passados
    const pastEvents = await this.contractERC20.getContractsPastEvent({
      eventName: 'Approval',
      args: { owner: accountAddress },
      fromBlock: currentBlock - 1000,
      toBlock: 'latest',
    });

    const tempArray = [];
    for (const e of pastEvents) {
      tempArray.push({
        blockNumber: e.blockNumber,
        owner: e.returnValues['owner'],
        spender: e.returnValues['spender'],
        value: e.returnValues['value'],
      });
    }
    this.eventList = [...this.eventList, ...tempArray];
  }
}
