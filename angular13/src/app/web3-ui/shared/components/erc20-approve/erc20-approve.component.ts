import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Result } from 'ethers/lib/utils';
import { BaseFormComponent } from 'src/app/shared/pages/base-form/base-form.component';
import { MessageService } from 'src/app/shared/services/message.service';
import { NumbersService } from 'src/app/shared/services/numbers.service';
import { IContractEventMonitor } from 'src/app/web3-ui/shared/contract-event-monitor.interface';
import { IERC20 } from 'src/app/web3-ui/shared/erc20.interface';
import { IApprovalEvent } from 'src/app/web3-ui/shared/model/interfaces';
import { ethereumAddressValidator } from 'src/app/web3-ui/shared/validators/ethereumAddress.validator';
import { TransactionResult } from '../../../shared/model';

@Component({
  selector: 'dapp-erc20-approve',
  templateUrl: './erc20-approve.component.html',
  styleUrls: ['./erc20-approve.component.css'],
})
export class ERC20ApproveComponent
  extends BaseFormComponent
  implements OnInit, OnChanges
{
  @Input() contractERC20!: IERC20 & IContractEventMonitor;
  @Input() symbol: string = '';
  @Input() decimals: number = 1;
  @Input() currentAccount!: string | null;
  @Input() currentBlockNumber: number = 0;

  isLoading = false;
  eventList: IApprovalEvent[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _messageService: MessageService,
    private _numberService: NumbersService
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
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    // EVENTOS
    //Se a conta não for nula, cria uma nova subscrição filtrando por eventos `Approval`
    // que tenha a conta `from` igual à conta conectada na Wallet
    if (
      this.currentAccount &&
      changes['currentAccount'] &&
      changes['currentAccount'].currentValue !=
        changes['currentAccount'].previousValue
    ) {
      this.eventList = [];
      // subscrição eventos últimos 1000 blocos
      this.fetchPastApprovalEvents(this.currentAccount);
      // subscrição eventos futuros
      await this.contractERC20.subscribeContractEvent({
        eventName: 'Approval',
        args: [this.currentAccount],
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
    }
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

  /**
   * Fetches the past events on the blockchain since current block less 1000 and feed the {pastEvents} array
   *
   * @param _accountAddress Account address used to filter the events where 'owner' part equals it
   */
  private async fetchPastApprovalEvents(
    _accountAddress: string
  ): Promise<void> {
    const pastEvents = await this.contractERC20.getContractsPastEvent({
      eventName: 'Approval',
      args: [_accountAddress],
      fromBlock: this.currentBlockNumber - 1000,
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
