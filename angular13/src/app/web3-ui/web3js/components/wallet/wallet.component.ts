import { Component, Input, OnInit } from '@angular/core';
import { ProviderErrors } from '../../model';
import { MessageService } from '../../../../shared/services/message.service';
import { Web3Service } from '../../services/web3.service';

declare let window: any;

@Component({
  selector: 'dapp-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css'],
})
export class WalletComponent implements OnInit {
  @Input() userAccountAddress: string | null = null;

  constructor(
    private _web3Service: Web3Service,
    private _messageService: MessageService
  ) {}

  ngOnInit() {}

  /**
   * Ask permission to connect to the Wallet (eg. Metamask) accounts
   *
   * @param event Mouse event instance
   */
  async connect(event: MouseEvent): Promise<void> {
    try {
      this._web3Service.fetchCurrentAccount();
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

  /**
   * Show BetToken balance of an specific account
   *
   * @param _accountAddress Account address to show balance
   */
  showBalance(_accountAddress: string) {
    // TODO: this._betTokenContractService
    //   .balanceOf(_accountAddress)
    //   .subscribe((value) => {
    //     console.log(value.result);
    //   });
  }
}
