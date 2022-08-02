import { Component, OnInit } from '@angular/core';
import { BigNumber } from 'ethers';
import { MessageService } from 'src/app/shared/services/message.service';
import { NumbersService } from 'src/app/shared/services/numbers.service';
import { ProviderErrors } from 'src/app/web3-ui/shared/model';
import { EthersjsService } from '../../services/ethersjs.service';

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
    private _ethersjsService: EthersjsService,
    private _numberService: NumbersService,
    private _messageService: MessageService
  ) {}

  ngOnInit() {
    this._ethersjsService
      .getUserAccountAddressSubject()
      .subscribe((_accountAddress) => {
        this.userAccountAddress = _accountAddress;
        if (this.userAccountAddress != null) {
          this._ethersjsService
            .balanceOf(this.userAccountAddress as string)
            .subscribe((value) => {
              this.balance = this._numberService.formatBigNumber(
                BigNumber.from(value),
                18
              );
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
      this._ethersjsService.connect();
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
