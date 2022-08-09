import { Component, OnInit } from '@angular/core';
import { Signer } from 'ethers';
import { IMetadata } from '../../../shared/model/interfaces/metadata.interface';
import { EthersjsService } from '../../services/ethersjs.service';
import { LinkTokenService } from '../../services/link-token.service';

@Component({
  selector: 'dapp-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css'],
  providers: [LinkTokenService],
})
export class LinkComponent implements OnInit {
  signer!: Signer | null;
  currentAccount!: string | null;
  formatedBalance: string = '0';
  formatedBalanceTooltip: string = '0';
  metadata: { [property: string]: any } = {};

  constructor(
    private _web3Service: EthersjsService,
    public readonly linkTokenService: LinkTokenService
  ) {}

  ngOnInit(): void {
    // Subscribing for account address changes in the provider
    this._web3Service.getSignerSubject().subscribe(async (_signer) => {
      this.signer = _signer;
      this.currentAccount = _signer == null ? null : await _signer.getAddress();
    });
  }

  onMetadataRead(event: IMetadata) {
    this.metadata[event.property] =
      event.property == 'decimals' ? parseInt(event.value) : event.value;
  }
}
