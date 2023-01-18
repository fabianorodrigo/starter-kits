import { Component, Inject, InjectionToken, OnInit } from '@angular/core';
import { MessageService } from 'src/app/shared/services/message.service';
import { IMetadata } from 'src/app/web3-ui/shared/model/interfaces/metadata.interface';
import { CHAINS_NAME } from 'src/app/web3-ui/shared/services/chains';
import { environment } from 'src/environments/environment';
import { LinkTokenService } from '../../services/link-token.service';
import { Web3Service } from '../../services/web3.service';

@Component({
  selector: 'dapp-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css'],
})
export class LinkComponent implements OnInit {
  userAccountAddress: string | null = null;
  formatedBalance: string = '0';
  formatedBalanceTooltip: string = '0';
  metadata: { [property: string]: any } = {};

  constructor(
    private _messageService: MessageService,
    private _web3Service: Web3Service,
    public readonly linkTokenService: LinkTokenService
  ) {}

  async ngOnInit(): Promise<void> {
    // Subscribing for account address changes in the provider
    this._web3Service
      .getUserAccountAddressSubject()
      .subscribe(async (address) => {
        this.userAccountAddress = address;
      });

    const chainId = await this._web3Service.getCurrentChainId();
    if (chainId != environment.LINK_TOKEN_CHAINID) {
      const msg = `Unexpected chain: Change network to ${
        CHAINS_NAME[environment.LINK_TOKEN_CHAINID].name
      }`;
      this._messageService.show(msg);
      throw new Error(msg);
    }
  }

  onMetadataRead(event: IMetadata) {
    this.metadata[event.property] =
      event.property == 'decimals' ? parseInt(event.value) : event.value;
  }
}
