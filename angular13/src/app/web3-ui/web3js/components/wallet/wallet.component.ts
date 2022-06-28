import { Component, Input, OnInit } from '@angular/core';
import { ProviderErrors } from '../../model';
import { MessageService } from '../../../../shared/services/message.service';
import { Web3Service } from '../../services/web3.service';
import { NumbersService } from 'src/app/shared/services/numbers.service';
import BN from 'bn.js';

declare let window: any;

@Component({
  selector: 'dapp-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css'],
})
export class WalletComponent implements OnInit {
  //@Input() userAccountAddress: string | null = null;
  userAccountAddress: string | null = null;
  balance: string = '0';

  constructor(
    private _web3Service: Web3Service,
    private _numberService: NumbersService,
    private _messageService: MessageService
  ) {}

  ngOnInit() {
    this._web3Service
      .getUserAccountAddressSubject()
      .subscribe((_accountAddress) => {
        this.userAccountAddress = _accountAddress;
        if (this.userAccountAddress != null) {
          this._web3Service
            .chainCurrencyBalanceOf(this.userAccountAddress as string)
            .subscribe((value) => {
              console.log('value', value);
              this.balance = this._numberService.formatBN(new BN(value), 18);
            });
        }
      });
  }

  /**
   * Ask permission to connect to the Wallet (eg. Metamask) accounts
   *
   * @param event Mouse event instance
   */
  async connect(event: MouseEvent): Promise<void> {
    try {
      this._web3Service.connect();
    } catch (err: any) {
      console.error(err);
      const providerError = ProviderErrors[err.code];
      if (providerError) {
        this._messageService.show(
          `${providerError.title}: ${providerError.message}. You need to connect with an account in your wallet in order to make use of this Ðapp`
        );
      } else {
        this._messageService.show('We had some problem connecting you wallet');
      }
    }
  }
}
