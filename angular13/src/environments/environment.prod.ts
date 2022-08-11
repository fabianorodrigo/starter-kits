import { CHAINS } from 'src/app/web3-ui/shared/services/chains';
import {
  ETHEREUM_AAVE_TOKEN,
  ETHEREUM_DATA_FEED_ETH_USD_ADDRESS,
  ETHEREUM_LINK_TOKEN,
} from './ethereum_prod';
import {
  POLYGON_CHAIN_BATTLES_NFT_ADDRESS,
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

  // LINK TOKEN (ERC-20)
  LINK_TOKEN_CHAINID: CHAINS.ETHEREUM,
  LINK_TOKEN_ADDRESS: ETHEREUM_LINK_TOKEN,
  //AAVE TOKEN (ERC-20)
  AAVE_TOKEN_CHAINID: CHAINS.GOERLI,
  AAVE_TOKEN_ADDRESS: ETHEREUM_AAVE_TOKEN,
  // CHAIN BATTLES (ERC-721)
  CHAIN_BATTLES_CHAINID: CHAINS.MUMBAI,
  CHAIN_BATTLES_NFT_ADDRESS: POLYGON_CHAIN_BATTLES_NFT_ADDRESS,
};
