import { BigNumber } from 'ethers';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BaseFormComponent } from 'src/app/shared/pages/base-form/base-form.component';
import { MessageService } from 'src/app/shared/services/message.service';
import { NumbersService } from 'src/app/shared/services/numbers.service';
import { ethereumAddressValidator } from 'src/app/web3-ui/shared/validators/ethereumAddress.validator';
import { TransactionResult } from '../../model';
import BN from 'bn.js';
import { IERC20 } from '../../services/erc20.interface';
import { IERC721 } from '../../services/erc721.interface';

/**
 * Component to show the balance of an ERC20 or ERC721 token.
 */
@Component({
  selector: 'dapp-token-balance',
  templateUrl: './token-balance.component.html',
  styleUrls: ['./token-balance.component.css'],
})
export class TokenBalanceComponent extends BaseFormComponent implements OnInit {
  @Input() contract!: IERC20 | IERC721;
  @Input() symbol: string = '';
  @Input() decimals: number = 1;

  isLoading = false;
  showBalance = false;
  formatedBalance: string = '0';
  formatedBalanceTooltip: string = '0';

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
      accountAddress: [
        '',
        [
          Validators.required,
          Validators.minLength(42),
          ethereumAddressValidator,
        ],
      ],
    });
  }

  getBalance(event: Event) {
    this.submitted = true;
    event.preventDefault();
    if (this.form.valid) {
      this.isLoading = true;
      this.showBalance = true;
      try {
        this.contract
          .balanceOf((this.form.get('accountAddress') as FormControl).value)
          .subscribe((result: TransactionResult<BigNumber | BN>) => {
            if (result.success == false) {
              this._messageService.show(
                `It was not possible to get ${this.form.controls['accountAddress'].value} ${this.symbol} balance`
              );
              this.showBalance = false;
              return;
            }
            this.formatedBalance =
              this._numberService.formatBigNumberShortScale(
                result.result as BigNumber,
                this.decimals
              );
            this.formatedBalanceTooltip = this._numberService.formatBigNumber(
              result.result as BigNumber,
              this.decimals
            );
            this.isLoading = false;
          });
      } catch (e: unknown) {
        this.isLoading = false;
        this._messageService.show((<Error>e).message);
      }
    } else {
      this.showBalance = false;
      this._messageService.show(
        `The data filled in the form is not valid. Please, fill the form correctly before submit it`
      );
    }
  }
}
