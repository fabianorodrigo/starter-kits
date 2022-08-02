Web 3.0 UI - Ethers
===

User interface module to interact with Blockchains using the [Ethers Javascript library](https://www.npmjs.com/package/ethers)

[Ethers Documentation](https://docs.ethers.io/v5/)

# Services

## EthersjsService

It's a service provider with some methods of general purpose:

- `getCurrentNetwork()`: returns data about the current Ethereum network including name, chainId and ensAdress.
- `getUserAccountAddressSubject()`: returns a Observable to monitor changes in the account which the Wallet is connected  with.
- `getUserAccountAddress()`: returns the current account which the Wallet is connected with.
- `connect()`: triggers the Wallet connection action (open it for password and/or select account).
- `balanceOf(_accountAddress: string)`: returns the balance of {accountAddress} in the native currency of the connected chain (ex ETH in case of Ethereum).
- `sendWei(_addressFrom: string,_addressTo: string,_valueInWei: BigNumber,_successMessage: string,_callback?: CallbackFunction,_confirmationMessage?: string)`: Send a transaction to transfer an amount of {_valueInWei} units in the native currency's smallest representation from {_addressFrom} to {_addressTo}.  Allows specify custom messages for successful sent and confirmation by the blockchain and also a callback function when the transaction is confirmed.
- `addTokenToWallet(tokenAddress: string)`: adds an ERC-20 token in the Wallet given it's address.
- `getContract(_abis: ContractInterface,_address: string)`:  returns a instance of the Web3js's Contract class given it's ABI and it's address.
- `toCheckSumAddress(_address: string)`: returns the representation ot {_address} following the mixed case checksum by [EIP-55](https://eips.ethereum.org/EIPS/eip-55).
- `getCurrentBlockNumber()`: returns the lastest block number of the connected chain.

## BaseContract

It's a abstract class with generic operations to interact with Smart Contracts. For each contract the application deal with, there is gonna be created a Service Provider (Angular) that extends this class, directly or indirectly. Among these generic operations to a specific contract, some of them are:

- `getContract(_abis: AbiItem[])`: returns a instance of the Web3js's `Contract` class to a specific contract in the blockchain.
- `call<T>(_abi: AbiItem[], _functionName: string, ..._args: any)`: executes a call (readonly) to the contract's function named {_functionName} passing the arguments {args}.
- `callBN(_abi: AbiItem[], _functionName: string, ..._args: any)`: same as `call<T>` but used when the contract's function returns a BigNumber.
- `send(_abi: AbiItem[], _functionName: string, _successMessage: string, _callback?: CallbackFunction,_confirmationMessage?: string, ..._args: any)`: send a transaction to the contract's function named {_functionName} passing the arguments {args}. Allows specify custom messages for successful sent and confirmation by the blockchain and also a callback function when the transaction is confirmed.
- `getString(_abi: AbiItem[], _propertyName: string)`: executes a call (readonly) to the getter of property named {_propertyName}, that returns a string
- `getStringArray(_abi: AbiItem[], _propertyName: string)`: executes a call (readonly) to the getter of property named {_propertyName}, that returns an array of strings.
- `getBoolean(_abi: AbiItem[], _propertyName: string)`: executes a call (readonly) to the getter of property named {_propertyName}, that returns a boolean.
- `getNumber(_abi: AbiItem[], _propertyName: string)`: executes a call (readonly) to the getter of property named {_propertyName}, that returns a number.
- `getBN(_abi: AbiItem[], _propertyName: string)`: executes a call (readonly) to the getter of property named {_propertyName}, that returns a BigNumber.
- `getProperty(_abi: AbiItem[], _propertyName: string)`: executes a call (readonly) to the getter of property named {_propertyName}, that can return any type.
- `subscribeContractEvent(_monitorParameter: EventMonitoringParameters)`: Gets a Web3JS subscription to monitor future ocurrences of a specific event.
- `getContractsPastEvent(_monitorParameter: EventPastParameters)`: Gets a list of `EventData` of past ocurrences of a specific event.

## ERC20BaseContract

It's a abstract class with generic operations to interact with Smart Contracts that implement the [ERC-2O](https://eips.ethereum.org/EIPS/eip-20). For each contract ERC-20 which the application deal with, should have a Service Provider (Angular) that extends this class. It implements a method for each function required by the ERC-2O pattern.

- `name()`
- `symbol()`
- `decimals()`
- `totalSupply()`
- `balanceOf(_owner: string)`
- `allowance(_owner: string,_spender: string)`
- `transfer(_to: string,_value: BN,_callback?: CallbackFunction)`
- `transferFrom(_from: string,_to: string,_value: BN,_callback?: CallbackFunction)`
- `approve(_spender: string,_value: BN,_callback?: CallbackFunction)`

## LinkTokenService

It's a concrete class that inherits from `ERC20BaseContract` and it's purpose is to deal with the `LINK`, the [Chainlink's](https://chain.link) token. Since the parent class implements all the ERC-20 features, all it has to specify is the contract address to be used inside it's constructor.

```javascript
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
```


<br>
<br>


# Angular Concepts/Features

## Lazy Loading Route

This module has a [Lazy Loading route configuration](https://angular.io/guide/router-tutorial-toh#lazy-loading-route-configuration). This means that the module will only be loaded when the route that points to it is requested. In order to do so, the route has a `loadChildren` property that takes a function that returns a promise using the browser's built-in syntax for lazy loading code using dynamic imports. After the code is requested and loaded, the Promise resolves an object that contains the NgModule, in this case the `Web3jsModule`. Finally, the root AppModule must neither load nor reference the Web3jsModule or its files.

```javascript
const routes: Routes = [
  {
    path: 'web3js',
    loadChildren: () =>
      import('./web3-ui/web3js/web3js.module').then((m) => m.Web3jsModule),
  },
  ...

```
*app-routing.module.ts*

## Dependency Injection

The services part of the module are no injected in the root module and consequently they're only available if and when the consumers import the Web3jsModule. For this, these services have their [provider scope](https://angular.io/guide/providers#provider-scope) limited by being declared with the `providedIn` equals null and, in the module are declared in the `provides` section:

```javascript
@Injectable({
  providedIn: null,
})
export class ...

```
*service.ts*

```javascript
@NgModule({
  declarations: [...  ],
  imports: [...],
  providers: [Web3Service, LinkTokenService],
})
export class Web3jsModule {}
```
*web3js.module.ts*
