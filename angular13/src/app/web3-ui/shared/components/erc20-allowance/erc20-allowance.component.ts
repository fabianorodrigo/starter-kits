import { catchError } from 'rxjs';
import { TransactionResult } from './../../model/transaction-result.interface';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BigNumber } from 'ethers';
import { BaseFormComponent } from 'src/app/shared/pages/base-form/base-form.component';
import { MessageService } from 'src/app/shared/services/message.service';
import { NumbersService } from 'src/app/shared/services/numbers.service';
import { ethereumAddressValidator } from 'src/app/web3-ui/shared/validators/ethereumAddress.validator';
import { IERC20 } from '../../services/erc20.interface';

@Component({
  selector: 'dapp-erc20-allowance',
  templateUrl: './erc20-allowance.component.html',
  styleUrls: ['./erc20-allowance.component.css'],
})
export class ERC20AllowanceComponent
  extends BaseFormComponent
  implements OnInit
{
  @Input() contractERC20!: IERC20;
  @Input() symbol: string = '';
  @Input() decimals: number = 1;

  showAllowance = false;
  formatedAllowance: string = '0';
  formatedAllowanceTooltip: string = '0';

  constructor(
    private _formBuilder: FormBuilder,
    private _numberService: NumbersService,
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
      spenderAddress: [
        '',
        [
          Validators.required,
          Validators.minLength(42),
          ethereumAddressValidator,
        ],
      ],
    });
  }

  getAllowance(event: Event) {
    this.submitted = true;
    event.preventDefault();
    if (this.form.valid) {
      this.isLoading = true;
      this.showAllowance = true;
      try {
        const transaction$ = this.contractERC20
          .allowance(
            (this.form.get('ownerAddress') as FormControl).value,
            (this.form.get('spenderAddress') as FormControl).value
          )
          .pipe(catchError(this.handleBackendError.bind(this)));

        transaction$.subscribe({
          next: (result: TransactionResult<any>) => {
            if (result.success == false) {
              this._messageService.show(
                `It was not possible to get the ${this.symbol} allowance from ${this.form.controls['ownerAddress'].value} to  ${this.form.controls['spenderAddress'].value}`
              );
              this.showAllowance = false;
              return;
            }
            this.formatedAllowance =
              this._numberService.formatBigNumberShortScale(
                result.result as BigNumber,
                this.decimals
              );
            this.formatedAllowanceTooltip = this._numberService.formatBigNumber(
              result.result as BigNumber,
              this.decimals
            );
            this.isLoading = false;
          },
          error: this.handleUnexpectedError.bind(this),
        });
      } catch (e: unknown) {
        this.handleUnexpectedError(e);
      }
    } else {
      this.showAllowance = false;
      this._messageService.show(
        `The data filled in the form is not valid. Please, fill the form correctly before submit it`
      );
    }
  }
}
