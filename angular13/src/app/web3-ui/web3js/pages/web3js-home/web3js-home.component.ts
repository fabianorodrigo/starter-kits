import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoggingService } from 'src/app/shared/services/logging.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { environment } from 'src/environments/environment';
import { Web3Service } from '../../services/web3.service';

@Component({
  selector: 'dapp-web3js-home',
  templateUrl: './web3js-home.component.html',
  styleUrls: ['./web3js-home.component.css'],
})
export class Web3jsHomeComponent implements OnInit {
  userAccountAddress: string | null = null;

  constructor(
    private _changeDetectorRefs: ChangeDetectorRef,
    private _loggingService: LoggingService,
    private _messageService: MessageService,
    private _web3Service: Web3Service
  ) {}

  async ngOnInit(): Promise<void> {
    const chainId = await this._web3Service.getCurrentChainId();
    this._loggingService.debug(Web3jsHomeComponent.name, 'chainId', chainId);
    if (chainId != environment.chainId) {
      const msg = `Unexpected chain: Change network to ${environment.chainName}`;
      this._messageService.show(msg);
      throw new Error(msg);
    }

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
