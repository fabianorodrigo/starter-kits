import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Bytes, Result } from 'ethers/lib/utils';
import { BaseFormComponent } from 'src/app/shared/pages/base-form/base-form.component';
import { MessageService } from 'src/app/shared/services/message.service';
import { ITransferEvent } from 'src/app/web3-ui/shared/model/interfaces';
import { ethereumAddressValidator } from 'src/app/web3-ui/shared/validators/ethereumAddress.validator';
import { TransactionResult } from '../../model';
import { IContractEventMonitor } from '../../services/contract-event-monitor.interface';
import { IERC721 } from '../../services/erc721.interface';

@Component({
  selector: 'dapp-erc721-safe-transfer',
  templateUrl: './erc721-safe-transfer.component.html',
  styleUrls: ['./erc721-safe-transfer.component.css'],
})
export class ERC721SafeTransferComponent
  extends BaseFormComponent
  implements OnInit
{
  @Input() contract!: IERC721 & IContractEventMonitor;
  @Input() symbol: string = '';
  @Input() currentAccount!: string | null;

  isLoading = false;
  eventList: ITransferEvent[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _messageService: MessageService
  ) {
    super();
  }

  ngOnInit(): void {
    //o minLength é para prevenir o "Short address/parameter Attack"
    this.form = this._formBuilder.group({
      fromAddress: [
        '',
        [
          Validators.required,
          Validators.minLength(42),
          ethereumAddressValidator,
        ],
      ],
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
      // EVENTOS
      // subscrição eventos últimos 1000 blocos
      this.fetchPastTransferEvents(this.currentAccount);
      // subscrição eventos futuros
      await this.contract.subscribeContractEvent({
        eventName: 'Transfer',
        args: [this.currentAccount],
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
  }

  transfer(event: Event) {
    this.submitted = true;
    event.preventDefault();
    if (this.form.valid) {
      this.isLoading = true;

      try {
        this.contract
          .safeTransferFrom(
            (this.form.get('fromAddress') as FormControl).value,
            (this.form.get('toAddress') as FormControl).value,
            (this.form.get('value') as FormControl).value,
            [],
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
   * @param @param _accountAddress Account address used to filter the events where 'from' part equals it
   */
  private async fetchPastTransferEvents(
    _accountAddress: string
  ): Promise<void> {
    const currentBlockNumber = await this.contract.getCurrentBlockNumber();
    // subscrição eventos passados
    const pastEvents = await this.contract.getContractsPastEvent({
      eventName: 'Transfer',
      filter: { from: _accountAddress },
      fromBlock: currentBlockNumber - 1000,
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
