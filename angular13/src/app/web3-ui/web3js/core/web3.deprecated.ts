import { InjectionToken } from '@angular/core';
import Web3 from 'web3';
import { Web3jsModule } from '../web3js.module';

//TODO: Não está sendo mais usado, mas é bom entender isso aqui
export const WEB3 = new InjectionToken<Web3>('web3', {
  providedIn: Web3jsModule,
  factory: () => new Web3(Web3.givenProvider),
});
