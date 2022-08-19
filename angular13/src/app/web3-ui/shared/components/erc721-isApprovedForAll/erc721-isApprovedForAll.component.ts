import { catchError } from 'rxjs';
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
  selector: 'dapp-erc721-isApprovedForAll',
  templateUrl: './erc721-isApprovedForAll.component.html',
  styleUrls: ['./erc721-isApprovedForAll.component.css'],
})
export class ERC721IsApprovedForAllComponent
  extends BaseFormComponent
  implements OnInit
{
  @Input() contract!: IERC721 & IContractEventMonitor;
  @Input() symbol: string = '';
  @Input() currentAccount!: string | null;

  showApproved: boolean = false;
  isApproved: boolean = false;

  eventList: ITransferEvent[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    _messageService: MessageService
  ) {
    super(_messageService);
  }

  ngOnInit(): void {
    //o minLength é para prevenir o "Short address/parameter Attack"
    this.form = this._formBuilder.group({
      ownerAddress: [
        '',
        [
          Validators.required,
          Validators.minLength(42),
          ethereumAddressValidator,
        ],
      ],
      operatorAddress: [
        '',
        [
          Validators.required,
          Validators.minLength(42),
          ethereumAddressValidator,
        ],
      ],
    });
  }

  isApprovedForAll(event: Event) {
    this.submitted = true;
    event.preventDefault();
    if (this.form.valid) {
      this.isLoading = true;
      this.showApproved = true;

      try {
        const response$ = this.contract
          .isApprovedForAll(
            (this.form.get('ownerAddress') as FormControl).value,
            (this.form.get('operatorAddress') as FormControl).value
          )
          .pipe(catchError(this.handleBackendError.bind(this)));

        response$.subscribe({
          next: (result: TransactionResult<any>) => {
            if (result.success == false) {
              this._messageService.show(
                `It was not possible to request if ${this.form.controls['operatorAddress'].value} is approved for all ${this.symbol} assets of ${this.form.controls['ownerAddress'].value} `
              );
              this.showApproved = false;
              this.isLoading = false;
              return;
            }
            this.isApproved = result.result;
            this.isLoading = false;
          },
          error: this.handleBackendError.bind(this),
        });
      } catch (e: unknown) {
        this.handleUnexpectedError(e);
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
