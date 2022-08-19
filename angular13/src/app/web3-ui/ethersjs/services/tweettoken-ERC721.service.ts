import { Injectable } from '@angular/core';
import { ContractInterface } from 'ethers';
import { LoggingService } from 'src/app/shared/services/logging.service';
import { environment } from 'src/environments/environment';
import { TWEETTOKEN_NFT_ABI } from '../ABI/tweetToken-nft';
import { ERC721BaseContract } from './ERC721-base';
import { EthersjsService } from './ethersjs.service';

@Injectable({
  providedIn: null,
})
export class TweetTokenERC721Service extends ERC721BaseContract {
  getContractABI(): ContractInterface {
    return TWEETTOKEN_NFT_ABI;
  }

  constructor(_loggingService: LoggingService, _web3Service: EthersjsService) {
    super(_loggingService, _web3Service, environment.TWEETTOKEN_NFT_ADDRESS);
  }
}
