import { catchError } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BaseFormComponent } from 'src/app/shared/pages/base-form/base-form.component';
import { MessageService } from 'src/app/shared/services/message.service';
import { ethereumAddressValidator } from 'src/app/web3-ui/shared/validators/ethereumAddress.validator';
import { TransactionResult } from '../../model';
import { IERC20 } from '../../services/erc20.interface';
import { IERC721 } from '../../services/erc721.interface';

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
  implements OnInit
{
  @Input() contract!: IERC20 | IERC721;
  @Input() symbol: string = '';

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
}
