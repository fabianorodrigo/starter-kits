import { ABI } from './abis';
import {
  ETHEREUM_DATA_FEED_ETH_USD_ADDRESS,
  ETHEREUM_LINK_TOKEN,
} from './ethereum_prod';
import {
  POLYGON_DATA_FEED_ETH_USD_ADDRESS,
  POLYGON_LINK_TOKEN,
} from './polygon.prod';

export const environment = {
  production: true,
  debugging: false,
  tracing: false,
  chainId: 80001, //mumbai
  chainName: 'Mumbai',
  chainCurrencyName: 'MATIC',
  api: `http://localhost:3000`,

  LINK_TOKEN: ETHEREUM_LINK_TOKEN,

  ABIS: {
    LINK_TOKEN: ABI.LINK_TOKEN,
  },
};
