import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import BN from 'bn.js';
import { BaseFormComponent } from 'src/app/shared/pages/base-form/base-form.component';
import { MessageService } from 'src/app/shared/services/message.service';
import { NumbersService } from 'src/app/shared/services/numbers.service';
import { ethereumAddressValidator } from 'src/app/web3-ui/shared/validators/ethereumAddress.validator';
import { ERC20BaseContract } from '../../services/ERC20-base';

@Component({
  selector: 'dapp-erc20-allowance',
  templateUrl: './erc20-allowance.component.html',
  styleUrls: ['./erc20-allowance.component.css'],
})
export class ERC20AllowanceComponent
  extends BaseFormComponent
  implements OnInit
{
  @Input() contractERC20!: ERC20BaseContract;
  @Input() symbol: string = '';
  @Input() decimals: number = 1;

  isLoading = false;
  showAllowance = false;
  formatedAllowance: string = '0';
  formatedAllowanceTooltip: string = '0';

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
        this.contractERC20
          .allowance(
            (this.form.get('ownerAddress') as FormControl).value,
            (this.form.get('spenderAddress') as FormControl).value
          )
          .subscribe((result) => {
            if (result.success == false) {
              this._messageService.show(
                `It was not possible to get the ${this.symbol} allowance from ${this.form.controls['ownerAddress'].value} to  ${this.form.controls['spenderAddress'].value}`
              );
              this.showAllowance = false;
              return;
            }
            this.formatedAllowance = this._numberService.formatBNShortScale(
              result.result as BN,
              this.decimals
            );
            this.formatedAllowanceTooltip = this._numberService.formatBN(
              result.result as BN,
              this.decimals
            );
            this.isLoading = false;
          });
      } catch (e: unknown) {
        this.isLoading = false;
        this._messageService.show((<Error>e).message);
      }
    } else {
      this.showAllowance = false;
      this._messageService.show(
        `The data filled in the form is not valid. Please, fill the form correctly before submit it`
      );
    }
  }
}
