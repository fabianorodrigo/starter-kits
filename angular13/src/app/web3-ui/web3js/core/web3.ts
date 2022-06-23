import { InjectionToken } from '@angular/core';
import Web3 from 'web3';
import { Web3jsModule } from '../web3js.module';

export const WEB3 = new InjectionToken<Web3>('web3', {
  providedIn: Web3jsModule,
  factory: () => new Web3(Web3.givenProvider),
});
