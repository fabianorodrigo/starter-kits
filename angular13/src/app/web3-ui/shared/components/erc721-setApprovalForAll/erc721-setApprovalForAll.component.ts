import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Result } from 'ethers/lib/utils';
import { catchError, of } from 'rxjs';
import { BaseFormComponent } from 'src/app/shared/pages/base-form/base-form.component';
import { MessageService } from 'src/app/shared/services/message.service';
import { NumbersService } from 'src/app/shared/services/numbers.service';
import { IApprovalEvent } from 'src/app/web3-ui/shared/model/interfaces';
import { IContractEventMonitor } from 'src/app/web3-ui/shared/services/contract-event-monitor.interface';
import { IERC20 } from 'src/app/web3-ui/shared/services/erc20.interface';
import { ethereumAddressValidator } from 'src/app/web3-ui/shared/validators/ethereumAddress.validator';
import { TransactionResult } from '../../model';
import { IERC721 } from '../../services/erc721.interface';

/**
 * Component to a owner approve operations by another address of a specific amount of ERC20 or a specific NFT of a ERC721.
 */
@Component({
  selector: 'dapp-erc721-setApprovalForAll',
  templateUrl: './erc721-setApprovalForAll.component.html',
  styleUrls: ['./erc721-setApprovalForAll.component.css'],
})
export class ERC721SetApprovalForAllComponent
  extends BaseFormComponent
  implements OnInit
{
  @Input() contract!: IERC721 & IContractEventMonitor;
  @Input() symbol: string = '';
  @Input() currentAccount!: string | null;

  eventList: IApprovalEvent[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    _messageService: MessageService
  ) {
    super(_messageService);
  }

  ngOnInit(): void {
    //o minLength é para prevenir o "Short address/parameter Attack"
    this.form = this._formBuilder.group({
      operatorAddress: [
        '',
        [
          Validators.required,
          Validators.minLength(42),
          ethereumAddressValidator,
        ],
      ],
      approved: [false, [Validators.required]],
    });
  }

  // async ngOnChanges(changes: SimpleChanges): Promise<void> {
  //   // EVENTOS
  //   //Se a conta não for nula, cria uma nova subscrição filtrando por eventos `Approval`
  //   // que tenha a conta `from` igual à conta conectada na Wallet
  //   if (
  //     this.currentAccount &&
  //     changes['currentAccount'] &&
  //     changes['currentAccount'].currentValue !=
  //       changes['currentAccount'].previousValue
  //   ) {
  //     this.eventList = [];
  //     // subscrição eventos últimos 1000 blocos
  //     this.fetchPastApprovalEvents(this.currentAccount);
  //     // subscrição eventos futuros
  //     await this.contract.subscribeContractEvent({
  //       eventName: 'Approval',
  //       args: [this.currentAccount],
  //       listenerFunction: (owner, spender, value, event) => {
  //         this.eventList = [
  //           ...this.eventList,
  //           {
  //             blockNumber: event.blockNumber,
  //             owner,
  //             spender,
  //             value,
  //           },
  //         ];
  //       },
  //     });
  //   }
  // }

  setApprovalForAll(event: Event) {
    this.submitted = true;
    event.preventDefault();
    if (this.form.valid) {
      this.isLoading = true;

      try {
        const transaction$ = this.contract
          .setApprovalForAll(
            (this.form.get('operatorAddress') as FormControl).value,
            (this.form.get('approved') as FormControl).value,
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
   * @param _accountAddress Account address used to filter the events where 'owner' part equals it
   */
  private async fetchPastApprovalEvents(
    _accountAddress: string
  ): Promise<void> {
    const currentBlockNumber = await this.contract.getCurrentBlockNumber();
    const pastEvents = await this.contract.getContractsPastEvent({
      eventName: 'Approval',
      filter: { owner: _accountAddress },
      fromBlock: currentBlockNumber - 1000,
      toBlock: 'latest',
    });

    const tempArray = [];
    for (const e of pastEvents) {
      //web3js answer has 'returnValues' property and ethers has 'args' property
      if (e.returnValues) e.args = e.returnValues;
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
