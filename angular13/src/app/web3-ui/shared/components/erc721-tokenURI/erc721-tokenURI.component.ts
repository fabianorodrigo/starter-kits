import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { BaseFormComponent } from 'src/app/shared/pages/base-form/base-form.component';
import { MessageService } from 'src/app/shared/services/message.service';
import { TransactionResult } from '../../model';
import { IERC721 } from '../../services/erc721.interface';

/**
 * Component to show the balance of an ERC20 or ERC721 token.
 */
@Component({
  selector: 'dapp-erc721-tokenURI',
  templateUrl: './erc721-tokenURI.component.html',
  styleUrls: ['./erc721-tokenURI.component.css'],
})
export class ERC721TokenURIComponent
  extends BaseFormComponent
  implements OnInit
{
  @Input() contract!: IERC721;
  @Input() symbol: string = '';

  showURI = false;
  uri!: string;

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
      this.showURI = true;
      try {
        const owner$ = this.contract
          .tokenURI((this.form.get('tokenId') as FormControl).value)
          .pipe(catchError(this.handleBackendError.bind(this)));

        owner$.subscribe({
          next: (result: TransactionResult<string>) => {
            if (result.success == false) {
              this._messageService.show(
                `It was not possible to get ${this.form.controls['tokenId'].value} ${this.symbol} token URI.`
              );
              this.showURI = false;
              this.isLoading = false;
              return;
            }
            this.uri = result.result;
            this.isLoading = false;
          },
          // Esse tratamento encerra o observable, portanto, o catchError do `pipe`
          // deve tratar as falhas de conexão com o backend
          error: this.handleUnexpectedError.bind(this),
        });
      } catch (e: unknown) {
        this.handleUnexpectedError(e);
      }
    } else {
      this.showURI = false;
      this._messageService.show(
        `The data filled in the form is not valid. Please, fill the form correctly before submit it`
      );
    }
  }
}
