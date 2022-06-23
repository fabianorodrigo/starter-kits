// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { ABI } from './abis';
import { KOVAN_DATA_FEED_ETH_USD_ADDRESS, KOVAN_LINK_TOKEN } from './kovan';
import { MUMBAI_DATA_FEED_ETH_USD_ADDRESS, MUMBAI_LINK_TOKEN } from './mumbai';

export const environment = {
  production: false,
  chainId: 31337, //set on backend-hardhat/package.json `ganache` script
  chainName: 'Localhost',
  chainCurrencyName: 'Ether',
  api: `http://localhost:3000`,

  MUMBAI: {
    LINK_TOKEN: MUMBAI_LINK_TOKEN,
    DATA_FEED_ETH_USD_ADDRESS: MUMBAI_DATA_FEED_ETH_USD_ADDRESS,
  },

  KOVAN: {
    LINK_TOKEN: KOVAN_LINK_TOKEN,
    DATA_FEED_ETH_USD_ADDRESS: KOVAN_DATA_FEED_ETH_USD_ADDRESS,
  },

  ABIS: {
    LINK_TOKEN: ABI.LINK_TOKEN,
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
