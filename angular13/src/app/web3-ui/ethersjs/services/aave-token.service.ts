import { Injectable } from '@angular/core';
import { ContractInterface } from 'ethers';
import { LoggingService } from 'src/app/shared/services/logging.service';
import { environment } from 'src/environments/environment';
import { LINK_TOKEN_ABI } from '../ABI';
import { ERC20BaseContract } from './ERC20-base';
import { EthersjsService } from './ethersjs.service';

@Injectable({
  providedIn: null,
})
export class AaveTokenService extends ERC20BaseContract {
  getContractABI(): ContractInterface {
    return LINK_TOKEN_ABI;
  }

  constructor(_loggingService: LoggingService, _web3Service: EthersjsService) {
    super(_loggingService, _web3Service, environment.AAVE_TOKEN_ADDRESS);
  }
}
