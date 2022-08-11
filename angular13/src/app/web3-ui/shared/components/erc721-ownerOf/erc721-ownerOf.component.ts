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
  selector: 'dapp-erc721-ownerOf',
  templateUrl: './erc721-ownerOf.component.html',
  styleUrls: ['./erc721-ownerOf.component.css'],
})
export class ERC721OwnerOfComponent
  extends BaseFormComponent
  implements OnInit
{
  @Input() contract!: IERC721;
  @Input() symbol: string = '';

  isLoading = false;
  showOwner = false;
  ownerAddress!: string;

  constructor(
    private _formBuilder: FormBuilder,
    private _messageService: MessageService
  ) {
    super();
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
      this.showOwner = true;
      try {
        const owner$ = this.contract
          .ownerOf((this.form.get('tokenId') as FormControl).value)
          .pipe(
            catchError((err) => {
              this._messageService.show(err.message);
              this.isLoading = false;
              return of({ success: false, result: err.message });
            })
          );

        owner$.subscribe({
          next: (result: TransactionResult<string>) => {
            if (result.success == false) {
              this._messageService.show(
                `It was not possible to get ${this.form.controls['tokenId'].value} ${this.symbol} owner`
              );
              this.showOwner = false;
              this.isLoading = false;
              return;
            }
            this.ownerAddress = result.result;
            this.isLoading = false;
          },
          // Esse tratamento encerra o observable, portanto, o catchError do `pipe`
          // deve tratar as falhas de conexão com o backend
          error: (err) => {
            this._messageService.show(err.message);
            this.isLoading = false;
          },
        });
      } catch (e: unknown) {
        console.warn(e);
        this.isLoading = false;
        this._messageService.show((<Error>e).message);
      }
    } else {
      this.showOwner = false;
      this._messageService.show(
        `The data filled in the form is not valid. Please, fill the form correctly before submit it`
      );
    }
  }
}
