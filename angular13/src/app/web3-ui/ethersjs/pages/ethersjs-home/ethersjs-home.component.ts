import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoggingService } from 'src/app/shared/services/logging.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { CHAINS_NAME } from 'src/app/web3-ui/shared/services/chains';
import { environment } from 'src/environments/environment';
import { EthersjsService } from '../../services/ethersjs.service';

@Component({
  selector: 'dapp-ethersjs-home',
  templateUrl: './ethersjs-home.component.html',
  styleUrls: ['./ethersjs-home.component.css'],
})
export class EthersjsHomeComponent implements OnInit {
  userAccountAddress: string | null = null;

  readonly LINK_CHAIN_ID =
    CHAINS_NAME[environment.LINK_TOKEN_CHAINID].name.toLowerCase();
  readonly AAVE_CHAIN_ID =
    CHAINS_NAME[environment.AAVE_TOKEN_CHAINID].name.toLowerCase();
  readonly TWEETTOKEN_CHAIN_ID =
    CHAINS_NAME[environment.TWEETTOKEN_CHAINID].name.toLowerCase();

  constructor(
    private _changeDetectorRefs: ChangeDetectorRef,
    private _loggingService: LoggingService,
    private _messageService: MessageService,
    private _ethersjsService: EthersjsService
  ) {}

  async ngOnInit(): Promise<void> {
    const network = await this._ethersjsService.getCurrentNetwork();
    this._loggingService.debug(EthersjsHomeComponent.name, 'network', network);

    await this._ethersjsService.connect();

    this._ethersjsService.getSignerSubject().subscribe(async (signer) => {
      this._loggingService.debug(
        EthersjsHomeComponent.name,
        'getUserAccountAddressSubject.subscribe',
        signer,
        signer == null ? null : await signer.getAddress()
      );

      this.changeWalletAccount(
        signer == null ? null : await signer.getAddress()
      );
    });
  }

  changeWalletAccount(_address: string | null) {
    this.userAccountAddress = _address;
    this._changeDetectorRefs.detectChanges();
  }
}
