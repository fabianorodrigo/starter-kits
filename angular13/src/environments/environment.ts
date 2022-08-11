import { GOERLI_AAVE_TOKEN } from './goerli';
import { RINKEBY_LINK_TOKEN } from './rinkeby';
import { CHAINS } from 'src/app/web3-ui/shared/services/chains';
import { MUMBAI_CHAIN_BATTLES_NFT_ADDRESS } from './mumbai';

export const environment = {
  production: false,
  debugging: false,
  tracing: false,
  //chainId: 31337, //set on backend-hardhat/package.json `ganache` script
  api: `/api`,

  // LINK TOKEN (ERC-20)
  LINK_TOKEN_CHAINID: CHAINS.RINKEBY,
  LINK_TOKEN_ADDRESS: RINKEBY_LINK_TOKEN,
  //AAVE TOKEN (ERC-20)
  AAVE_TOKEN_CHAINID: CHAINS.GOERLI,
  AAVE_TOKEN_ADDRESS: GOERLI_AAVE_TOKEN,
  // CHAIN BATTLES (ERC-721)
  CHAIN_BATTLES_CHAINID: CHAINS.MUMBAI,
  CHAIN_BATTLES_NFT_ADDRESS: MUMBAI_CHAIN_BATTLES_NFT_ADDRESS,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
