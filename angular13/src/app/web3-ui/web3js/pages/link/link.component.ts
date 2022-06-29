import { Component, OnInit } from '@angular/core';
import { IMetadata } from '../../components/erc20-metadata/metadata.interface';
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
    private _web3Service: Web3Service,
    public readonly linkTokenService: LinkTokenService
  ) {}

  ngOnInit(): void {
    // Subscribing for account address changes in the provider
    this._web3Service
      .getUserAccountAddressSubject()
      .subscribe(async (address) => {
        this.userAccountAddress = address;
      });
  }

  onMetadataRead(event: IMetadata) {
    this.metadata[event.property] =
      event.property == 'decimals' ? parseInt(event.value) : event.value;
  }
}
