import { Component, OnInit } from '@angular/core';
import { Signer } from 'ethers';
import { LoggingService } from 'src/app/shared/services/logging.service';
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
  signer: Signer | null = null;
  signerAddress: string | null = null;
  balance: string = '0';

  constructor(
    private _loggingService: LoggingService,
    private _ethersjsService: EthersjsService,
    private _numberService: NumbersService,
    private _messageService: MessageService
  ) {}

  ngOnInit() {
    this._ethersjsService.getSignerSubject().subscribe(async (_signer) => {
      this._loggingService.debug(
        WalletComponent.name,
        'ngOnInit.getSignerSubject.subscribe',
        _signer
      );
      this.signer = _signer;
      this.signerAddress = _signer == null ? null : await _signer.getAddress();
      if (this.signer != null) {
        this.balance = this._numberService.formatBigNumber(
          await this.signer.getBalance(),
          18
        );
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
