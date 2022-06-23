import { Injectable } from '@angular/core';
import BN from 'bn.js';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AbiItem } from 'web3-utils';
import { TransactionResult } from '../model';
import { BaseContract } from './baseContract';
import { Web3Service } from './web3.service';

@Injectable({
  providedIn: null,
})
export class LinkTokenService extends BaseContract {
  getContractABI(): AbiItem[] {
    return environment.ABIS.LINK_TOKEN;
  }

  constructor(_web3Service: Web3Service) {
    //TODO: pensar sobre: assim fica amarrado à KOVAN
    super(_web3Service, environment.KOVAN.LINK_TOKEN);
  }

  balanceOf(_accountAddress: string): Observable<TransactionResult<BN>> {
    return this.callBN(this.getContractABI(), `balanceOf`, _accountAddress);
  }
}
