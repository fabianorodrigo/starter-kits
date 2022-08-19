import { catchError } from 'rxjs';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BaseFormComponent } from 'src/app/shared/pages/base-form/base-form.component';
import { MessageService } from 'src/app/shared/services/message.service';
import { ethereumAddressValidator } from 'src/app/web3-ui/shared/validators/ethereumAddress.validator';
import { TransactionResult } from '../../model';
import { IERC20 } from '../../services/erc20.interface';
import { IERC721 } from '../../services/erc721.interface';
import { Result } from 'ethers/lib/utils';
import { ITransferEvent } from '../../model/interfaces';
import { IContractEventMonitor } from '../../services/contract-event-monitor.interface';

/**
 * Component to transfer an amount of ERC20 or a specific NFT of a ERC721 from one address to another.
 */
@Component({
  selector: 'dapp-token-transfer-from',
  templateUrl: './token-transfer-from.component.html',
  styleUrls: ['./token-transfer-from.component.css'],
})
export class TokenTransferFromComponent
  extends BaseFormComponent
  implements OnInit, OnChanges
{
  @Input() contract!: (IERC20 | IERC721) & IContractEventMonitor;
  @Input() symbol: string = '';
  @Input() currentAccount!: string | null;

  eventList: ITransferEvent[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    _messageService: MessageService
  ) {
    super(_messageService);
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

  transferFrom(event: Event) {
    this.submitted = true;
    event.preventDefault();
    if (this.form.valid) {
      this.isLoading = true;

      try {
        const transaction$ = this.contract
          .transferFrom(
            (this.form.get('fromAddress') as FormControl).value,
            (this.form.get('toAddress') as FormControl).value,
            (this.form.get('value') as FormControl).value,
            (result: TransactionResult<string>) => {
              this.isLoading = false;
              this._messageService.show(result.result);
            }
          )
          .pipe(catchError(this.handleBackendError));

        transaction$.subscribe({
          next: this.handleTransactionResult.bind(this),
          // Esse tratamento encerra o observable, portanto, o catchError do `pipe`
          // deve tratar as falhas de conexão com o backend
          error: this.handleUnexpectedError.bind(this),
        });
      } catch (e: unknown) {
        this.handleUnexpectedError(this);
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
        value: this.contract.isERC(721)
          ? (<Result>e.args)['tokenId']
          : (<Result>e.args)['value'],
      });
    }
    this.eventList = [...this.eventList, ...tempArray];
  }
}
