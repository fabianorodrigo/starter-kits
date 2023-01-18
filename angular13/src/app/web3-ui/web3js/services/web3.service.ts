import { Injectable, Optional } from '@angular/core';
import detectEthereumProvider from '@metamask/detect-provider';
import * as BN from 'bn.js';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoggingService } from 'src/app/shared/services/logging.service';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import {
  CallbackFunction,
  ProviderErrors,
  ProviderMessage,
  ProviderRpcError,
  TransactionResult,
} from '../../shared/model';

declare let window: any;

@Injectable({ providedIn: null })
export class Web3Service {
  private _web3: Web3;
  /**
   * Subject to handle the current user account address and it's changes
   */
  private _userAccountAddressSubject = new BehaviorSubject<string | null>(null);
  private _userAccountAddress!: string | null;

  constructor(@Optional() private _loggingService: LoggingService) {
    // givenProvider: When using web3.js in an Ethereum compatible browser,
    // it will set with the current native provider by that browser.
    // Will return the given provider by the (browser) environment, otherwise null.
    this._web3 = new Web3(Web3.givenProvider);
    this.hasEthereumProvider();
  }

  /**
   * @returns ID of the current chain Metamask is connected with
   */
  getCurrentChainId(): Promise<number> {
    return window.ethereum.request({
      method: 'eth_chainId',
    });
  }

  /**
   * @returns Observable to monitor changes in the user account address in the wallet
   */
  getUserAccountAddressSubject() {
    return this._userAccountAddressSubject.asObservable();
  }

  /**
   * @returns The current user account address in the provider (wallet)
   */
  getUserAccountAddress(): Promise<string | null> {
    return new Promise((resolve) => {
      // se o atributo já está preenchido, retorna-o
      if (this._userAccountAddress) {
        resolve(this._userAccountAddress);
      }
      // senão, subscreve ao subject e em seguida dispara o método de conexão.
      // quando conectado, recebe a notificação e resolve a Promise pra quem chamou
      else {
        const subscription = this._userAccountAddressSubject.subscribe(
          (_address) => {
            resolve(_address);
            if (subscription) {
              subscription.unsubscribe();
            }
          }
        );
        this.connect();
      }
    });
  }

  /**
   * Calls wallet 'connect' action and triggers the {userAccountAddressSubject} when done
   */
  async connect(): Promise<string | null> {
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      this.handleOnAccountsChanged(accounts);
      return accounts[0];
    } catch (err: unknown) {
      if ((err as ProviderRpcError).code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        alert('Please connect to MetaMask.');
      } else {
        console.error(err);
      }
      return null;
    }
  }

  /**
   * Gets the balance of the {_accountAddress} in the official currency of chain in use (ex. Ether in case of Ethereum)
   *
   * @param _accountAddress The account address which balance is wanted
   * @returns The string value in Wei
   */
  chainCurrencyBalanceOf(_accountAddress: string): Observable<string> {
    return new Observable<string>((_subscriber) => {
      if (_accountAddress == null) {
        _subscriber.next('');
      } else {
        this._web3.eth
          .getBalance(_accountAddress)
          .then((_balance: string | undefined) => {
            _subscriber.next(_balance);
          })
          .catch((e: Error) => {
            console.warn(`web3Service`, e);
          });
      }
    });
  }

  /**
   * Send Ether a {_value} from account {_addressFrom} to account {_addressTo}
   *
   * @param _addressFrom origin of funds
   * @param _addressTo destination of funds
   * @param _valueInWei Value in Wei
   *
   * @returns a TransactionResult that indicates if successful or not and message
   */
  sendWei(
    _addressFrom: string,
    _addressTo: string,
    _valueInWei: BN,
    _successMessage: string,
    _callback?: CallbackFunction,
    _confirmationMessage?: string
  ): Observable<TransactionResult<string>> {
    return new Observable<TransactionResult<string>>((_subscriber) => {
      if (window.ethereum) {
        const weiAmmountHEX = this._web3.utils.toHex(_valueInWei);
        this._web3.eth
          .sendTransaction({
            from: _addressFrom,
            to: _addressTo,
            value: weiAmmountHEX,
          })
          .once(`transactionHash`, (hash: string) => {
            _subscriber.next({ success: true, result: _successMessage });
          })
          .once(`confirmation`, (confNumber: any) => {
            if (_callback)
              _callback({
                success: true,
                result: _confirmationMessage || ``,
              });
          })
          .once(`error`, (e: any) => {
            const providerError = ProviderErrors[e.code];
            let message = `We had some problem. The transaction wasn't sent.`;
            if (providerError) {
              message = `${providerError.title}: ${providerError.message}. The transaction wasn't sent.`;
            }
            console.warn(e);
            if (_callback) {
              _callback({
                success: false,
                result: message,
              });
            }
          });
      } else {
        _subscriber.next({
          success: false,
          result: `You need a wallet to connect. You can install Metamask plugin in your browser or you can use the Brave browser that has already a native wallet`,
        });
      }
    });
  }

  async addTokenToWallet(tokenAddress: string): Promise<boolean> {
    const tokenSymbol = 'BET';
    const tokenDecimals = 18;
    const tokenImage =
      'https://cdn.iconscout.com/icon/premium/png-256-thumb/football-betting-2018363-1716872.png';

    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      return await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20', // Initially only supports ERC20, but eventually more!
          options: {
            address: tokenAddress, // The address that the token is at.
            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: tokenDecimals, // The number of decimals in the token
            image: tokenImage, // A string url of the token logo
          },
        },
      });
    } catch (error) {
      console.log(error);
    }

    return false;
  }

  /**
   * Instance a Web3js contrat based on ABIs and address informed
   *
   * @param _abis Abis of contract
   * @param _address Address of contract
   * @returns instance of Contract
   */
  async getContract(
    _abis: AbiItem[],
    _address: string
  ): Promise<Contract | null> {
    if ((await this._web3.eth.getCode(_address)) === '0x') {
      console.error(
        `Address ${_address} is not a contract at the connected chain`
      );
      return null;
    }
    return new this._web3.eth.Contract(_abis, _address);
  }

  /**
   * Generates address with checksum (lower e upper case) as specified at EIP-55
   *
   * @param {string} _address the given HEX address
   * @return {string} The HEX address with checksum
   */
  toCheckSumAddress(_address: string): string {
    return this._web3.utils.toChecksumAddress(_address);
  }

  /**
   * @returns Lastest block in the current connected chain
   */
  getCurrentBlockNumber(): Promise<number> {
    return this._web3.eth.getBlockNumber();
  }

  /**
   * Detects Metamask Ethereum provider and makes the bindings of events: connect, disconnect, accountsChanged, message etc
   * @returns TRUE if Wallet detected and bindings made successfully
   */
  private async hasEthereumProvider(): Promise<boolean> {
    // this returns the provider, or null if it wasn't detected
    const provider = await detectEthereumProvider();
    if (provider) {
      // If the provider returned by detectEthereumProvider is not the same as
      // window.ethereum, something is overwriting it, perhaps another wallet.
      if (provider !== window.ethereum) {
        alert('Do you have multiple wallets installed?');
      } else {
        window.ethereum.on('connect', this.handleOnConnect.bind(this));
        window.ethereum.on('disconnect', this.handleOnDisconnect.bind(this));
        window.ethereum.on(
          'accountsChanged',
          this.handleOnAccountsChanged.bind(this)
        );
        //window.ethereum.on('message', this.handleOnMessage);
        //Metamask Docs strongly recommend reloading the page on chain changes, unless you have good reason not to.
        window.ethereum.on('chainChanged', (_chainId: string) =>
          window.location.reload()
        );
        return true;
      }
    }
    alert(
      `You need a wallet to connect. You can install Metamask plugin in your browser or you can use the Brave browser that has already a native wallet`
    );
    return false;
  }

  /**
   * Handles connect event
   * @param _connectInfo Info with chainId connection
   */
  private handleOnConnect(_connectInfo: { chainId: string }) {
    console.log('connected', _connectInfo.chainId);
  }

  /**
   * Handles disconnect event. This event is emited when becomes unable to submit RPC
   * requests to any chain. In general, this will only happen due to network connectivity
   * issues or some unforeseen error.
   *
   * @param connectInfo ProviderRpcError
   */
  private handleOnDisconnect(_error: any) {
    console.log('disconnected', _error);
    //this.accountAddress = null;
  }

  /**
   * Handles account changed event. This event is emited when the account is changed at the wallet
   *
   * @param connectInfo ProviderRpcError
   */
  private handleOnAccountsChanged(_accounts: string[]) {
    this._loggingService.debug(
      Web3Service.name,
      'handleOnAccountsChanged',
      _accounts
    );
    this._userAccountAddress =
      _accounts.length > 0 ? this.toCheckSumAddress(_accounts[0]) : null;
    this._userAccountAddressSubject.next(this._userAccountAddress);
  }

  /**
   * The MetaMask provider emits this event when it receives
   * some message that the consumer should be notified of. The
   * kind of message is identified by the type string.
   *
   * @param _message ProviderMessage
   */
  private handleOnMessage(_message: ProviderMessage) {
    console.log('Mensagem', _message);
  }
}
