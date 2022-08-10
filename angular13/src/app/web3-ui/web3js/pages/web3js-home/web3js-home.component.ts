import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoggingService } from 'src/app/shared/services/logging.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { CHAINS_NAME } from 'src/app/web3-ui/shared/services/chains';
import { environment } from 'src/environments/environment';
import { Web3Service } from '../../services/web3.service';

@Component({
  selector: 'dapp-web3js-home',
  templateUrl: './web3js-home.component.html',
  styleUrls: ['./web3js-home.component.css'],
})
export class Web3jsHomeComponent implements OnInit {
  userAccountAddress: string | null = null;

  readonly LINK_CHAIN_ID =
    CHAINS_NAME[environment.LINK_TOKEN_CHAINID].name.toLowerCase();

  constructor(
    private _changeDetectorRefs: ChangeDetectorRef,
    private _loggingService: LoggingService,
    private _web3Service: Web3Service
  ) {}

  async ngOnInit(): Promise<void> {
    const chainId = await this._web3Service.getCurrentChainId();
    this._loggingService.debug(Web3jsHomeComponent.name, 'chainId', chainId);

    await this._web3Service.connect();

    this._web3Service.getUserAccountAddressSubject().subscribe((address) => {
      this._loggingService.debug(
        Web3jsHomeComponent.name,
        'getUserAccountAddressSubject.subscribe',
        address
      );
      this.changeWalletAccount(address);
    });
  }

  changeWalletAccount(_address: string | null) {
    this.userAccountAddress = _address;
    this._changeDetectorRefs.detectChanges();
  }
}
