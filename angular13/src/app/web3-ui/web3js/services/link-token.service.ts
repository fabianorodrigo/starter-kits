import { Injectable } from '@angular/core';
import { LoggingService } from 'src/app/shared/services/logging.service';
import { environment } from 'src/environments/environment';
import { AbiItem } from 'web3-utils';
import { ERC20BaseContract } from './ERC20-base';
import { Web3Service } from './web3.service';

@Injectable({
  providedIn: null,
})
export class LinkTokenService extends ERC20BaseContract {
  getContractABI(): AbiItem[] {
    return environment.ABIS.LINK_TOKEN;
  }

  constructor(_loggingService: LoggingService, _web3Service: Web3Service) {
    super(_loggingService, _web3Service, environment.LINK_TOKEN);
  }
}
