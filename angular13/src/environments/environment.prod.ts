import { ABI } from './abis';
import {
  KOVAN_DATA_FEED_ETH_USD_ADDRESS,
  KOVAN_LINK_TOKEN,
} from './kovan prod';
import {
  MUMBAI_DATA_FEED_ETH_USD_ADDRESS,
  MUMBAI_LINK_TOKEN,
} from './mumbai.prod';

export const environment = {
  production: true,
  debugging: false,
  tracing: false,
  chainId: 80001, //mumbai
  chainName: 'Mumbai',
  chainCurrencyName: 'MATIC',
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
