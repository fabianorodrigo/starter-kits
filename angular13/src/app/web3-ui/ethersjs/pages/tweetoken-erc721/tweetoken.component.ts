import { Component, OnInit } from '@angular/core';
import { Signer } from 'ethers';
import { MessageService } from 'src/app/shared/services/message.service';
import { CHAINS_NAME } from 'src/app/web3-ui/shared/services/chains';
import { environment } from 'src/environments/environment';
import { IMetadata } from '../../../shared/model/interfaces/metadata.interface';
import { EthersjsService } from '../../services/ethersjs.service';
import { TweetTokenERC721Service } from '../../services/tweettoken-ERC721.service';

@Component({
  selector: 'dapp-chain-battles',
  templateUrl: './tweetoken.component.html',
  styleUrls: ['./tweetoken.component.css'],
  providers: [TweetTokenERC721Service],
})
export class TweetokenERC721Component implements OnInit {
  signer!: Signer | null;
  currentAccount!: string | null;
  formatedBalance: string = '0';
  formatedBalanceTooltip: string = '0';
  metadata: { [property: string]: any } = {};

  constructor(
    private _messageService: MessageService,
    private _ethersjsService: EthersjsService,
    public readonly NFTService: TweetTokenERC721Service
  ) {}

  async ngOnInit(): Promise<void> {
    // Subscribing for account address changes in the provider
    this._ethersjsService.getSignerSubject().subscribe(async (_signer) => {
      this.signer = _signer;
      this.currentAccount = _signer == null ? null : await _signer.getAddress();
    });

    const network = await this._ethersjsService.getCurrentNetwork();
    if (network.chainId != environment.TWEETTOKEN_CHAINID) {
      const msg = `Unexpected chain: Change network to ${
        CHAINS_NAME[environment.TWEETTOKEN_CHAINID].name
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
