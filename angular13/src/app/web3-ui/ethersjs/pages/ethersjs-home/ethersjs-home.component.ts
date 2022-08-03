import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoggingService } from 'src/app/shared/services/logging.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { environment } from 'src/environments/environment';
import { EthersjsService } from '../../services/ethersjs.service';

@Component({
  selector: 'dapp-ethersjs-home',
  templateUrl: './ethersjs-home.component.html',
  styleUrls: ['./ethersjs-home.component.css'],
})
export class EthersjsHomeComponent implements OnInit {
  userAccountAddress: string | null = null;

  constructor(
    private _changeDetectorRefs: ChangeDetectorRef,
    private _loggingService: LoggingService,
    private _messageService: MessageService,
    private _ethersjsService: EthersjsService
  ) {}

  async ngOnInit(): Promise<void> {
    const network = await this._ethersjsService.getCurrentNetwork();
    this._loggingService.debug(EthersjsHomeComponent.name, 'network', network);
    if (network.chainId != environment.chainId) {
      const msg = `Unexpected chain: Change network to ${environment.chainName}`;
      this._messageService.show(msg);
      throw new Error(msg);
    }

    await this._ethersjsService.connect();

    this._ethersjsService.getSignerSubject().subscribe(async (signer) => {
      this._loggingService.debug(
        EthersjsHomeComponent.name,
        'getUserAccountAddressSubject.subscribe',
        signer
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
