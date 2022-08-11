import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ethers } from 'ethers';
import { catchError, of } from 'rxjs';
import { BaseFormComponent } from 'src/app/shared/pages/base-form/base-form.component';
import { MessageService } from 'src/app/shared/services/message.service';
import { TransactionResult } from '../../model';
import { IERC721 } from '../../services/erc721.interface';

/**
 * Component to show the balance of an ERC20 or ERC721 token.
 */
@Component({
  selector: 'dapp-erc721-getApproved',
  templateUrl: './erc721-getApproved.component.html',
  styleUrls: ['./erc721-getApproved.component.css'],
})
export class ERC721GetApprovedComponent
  extends BaseFormComponent
  implements OnInit
{
  @Input() contract!: IERC721;
  @Input() symbol: string = '';

  showApproved = false;
  approvedAddress!: string;

  constructor(
    private _formBuilder: FormBuilder,
    _messageService: MessageService
  ) {
    super(_messageService);
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      tokenId: ['', [Validators.required]],
    });
  }

  getOwner(event: Event) {
    this.submitted = true;
    event.preventDefault();
    if (this.form.valid) {
      this.isLoading = true;
      this.showApproved = true;
      try {
        const owner$ = this.contract
          .getApproved((this.form.get('tokenId') as FormControl).value)
          .pipe(catchError(this.handleBackendError.bind(this)));

        owner$.subscribe({
          next: (result: TransactionResult<string>) => {
            if (result.success == false) {
              this._messageService.show(
                `It was not possible to get ${this.form.controls['tokenId'].value} ${this.symbol} approved address`
              );
              this.showApproved = false;
              this.isLoading = false;
              return;
            }
            this.approvedAddress =
              result.result == ethers.constants.AddressZero
                ? 'None approved'
                : result.result;
            this.isLoading = false;
          },
          // Esse tratamento encerra o observable, portanto, o catchError do `pipe`
          // deve tratar as falhas de conexão com o backend
          error: this.handleUnexpectedError.bind(this),
        });
      } catch (e: unknown) {
        console.warn(e);
        this.handleUnexpectedError(e);
      }
    } else {
      this.showApproved = false;
      this._messageService.show(
        `The data filled in the form is not valid. Please, fill the form correctly before submit it`
      );
    }
  }
}
