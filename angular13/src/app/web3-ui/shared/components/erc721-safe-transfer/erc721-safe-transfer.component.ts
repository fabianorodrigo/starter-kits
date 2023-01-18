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

  transfer(event: Event) {
    this.submitted = true;
    event.preventDefault();
    if (this.form.valid) {
      this.isLoading = true;

      try {
        const transaction$ = this.contract
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
          .pipe(catchError(this.handleBackendError.bind(this)));

        transaction$.subscribe({
          next: this.handleTransactionResult.bind(this),
          error: this.handleUnexpectedError.bind(this),
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
}
