import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LinkTokenService, Web3Service } from '../../services';
import { MessageService, NumbersService } from 'src/app/shared/services';
import BN from 'bn.js';

@Component({
  selector: 'dapp-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css'],
})
export class LinkComponent implements OnInit {
  userAccountAddress: string | null = null;
  formatedBalance: string = '0';
  formatedBalanceTooltip: string = '0';

  constructor(
    private _changeDetectorRefs: ChangeDetectorRef,
    private _messageService: MessageService,
    private _numberService: NumbersService,
    private _web3Service: Web3Service,
    private _linkTokenService: LinkTokenService
  ) {}

  ngOnInit(): void {
    // Subscribing for account address changes in the provider
    this._web3Service
      .getUserAccountAddressSubject()
      .subscribe(async (address) => {
        this.userAccountAddress = address;
        this.getBalance();
      });
  }

  private getBalance() {
    if (this.userAccountAddress) {
      this._linkTokenService
        .balanceOf(this.userAccountAddress)
        .subscribe((_balanceSBT) => {
          if (_balanceSBT.success == false) {
            this._messageService.show(
              `It was not possible to get Bet Tokens balance`
            );
            return;
          }
          this.formatedBalance = this._numberService.formatBNShortScale(
            _balanceSBT.result as BN
          );
          this.formatedBalanceTooltip = this._numberService.formatBN(
            _balanceSBT.result as BN
          );
          this._changeDetectorRefs.detectChanges();
        });
    }
  }
}
