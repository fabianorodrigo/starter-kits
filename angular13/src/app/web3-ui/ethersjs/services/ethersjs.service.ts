import { Inject, Injectable, InjectionToken } from '@angular/core';
import { BigNumber, Contract, ContractInterface, ethers, Signer } from 'ethers';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoggingService } from 'src/app/shared/services/logging.service';
import {
  CallbackFunction,
  ProviderErrors,
  ProviderMessage,
  ProviderRpcError,
  TransactionResult,
} from '../../shared/model';

declare let window: any;

export const METAMASK = new InjectionToken('Metamask', {
  providedIn: null,
  factory: () => window.ethereum,
});

@Injectable({
  providedIn: null,
})
export class EthersjsService {
  //the Ethersjs web3 provider
  private _web3Provider!: ethers.providers.Web3Provider;
  /**
   * Subject to handle the current user account address and it's changes
   */
  private _signerSubject = new BehaviorSubject<Signer | null>(null);
  private _userAccountAddress!: string | undefined;

  constructor(
    private _loggingService: LoggingService,
    @Inject(METAMASK) provider: any
  ) {
    this._web3Provider = new ethers.providers.Web3Provider(provider);
    this.handleEthereumProvider(provider);
  }

  /**
   * Gets data about the current Ethereum network including name, chainId and ensAdress
   *
   * @returns data about the current network Metamask is connected with
   */
  getCurrentNetwork(): Promise<ethers.providers.Network> {
    return this._web3Provider.getNetwork();
  }

  /**
   * @returns Observable to monitor changes in the user account address in the wallet
   */
  getSignerSubject() {
    return this._signerSubject.asObservable();
  }

  /**
   * @returns The current signer in the provider (wallet)
   */
  getSigner() {
    return this._signerSubject.value;
  }

  /**
   * @returns The current user account address in the provider (wallet)
   */
  getUserAccountAddress(): Promise<string | undefined> {
    return new Promise((resolve) => {
      // se o atributo já está preenchido, retorna-o
      if (this._userAccountAddress) {
        resolve(this._userAccountAddress);
      }
      // senão, subscreve ao subject e em seguida dispara o método de conexão.
      // quando conectado, recebe a notificação e resolve a Promise pra quem chamou
      else {
        const subscription = this._signerSubject.subscribe(async (_signer) => {
          const _address =
            _signer == null ? undefined : await _signer.getAddress();
          resolve(_address);
          if (subscription) {
            subscription.unsubscribe();
          }
        });
        this.connect();
      }
    });
  }

  /**
   * Calls wallet 'connect' action and triggers the {userAccountAddressSubject} when done
   */
  async connect(): Promise<string | null> {
    try {
      this._loggingService.debug(
        EthersjsService.name,
        'connect',
        this._web3Provider
      );
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      //await this._web3Provider.listAccounts();
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
   * @returns The BigNumber value in Wei
   */
  balanceOf(_accountAddress: string): Observable<BigNumber> {
    if (_accountAddress == null) throw new Error(`Account address is null`);
    return new Observable<BigNumber>((_subscriber) => {
      this._web3Provider
        .getBalance(_accountAddress)
        .then((_balance: BigNumber) => {
          _subscriber.next(_balance);
        })
        .catch((e: Error) => {
          console.warn(`web3Service`, e);
        });
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
    _valueInWei: BigNumber,
    _successMessage: string,
    _callback?: CallbackFunction,
    _confirmationMessage?: string
  ): Observable<TransactionResult<string>> {
    return new Observable<TransactionResult<string>>((_subscriber) => {
      if (window.ethereum) {
        try {
          this._web3Provider
            .getSigner(_addressFrom)
            .sendTransaction({
              to: _addressTo,
              value: _valueInWei,
            })
            .then((tx) => {
              // espera-se que o wait seja o cara que vai ser executado quando for confirmado (equivalente ao 'once('confirmation') no web3js)
              tx.wait().then((_receipt) => {
                if (_callback) {
                  _callback({
                    success: true,
                    result: _confirmationMessage || ``,
                  });
                }
              });
              _subscriber.next({ success: true, result: _successMessage });
            });
        } catch (e: any) {
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
        }
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
   * Instance a ethersjs contrat based on ABIs and address informed
   *
   * @param _abis Abis of contract
   * @param _address Address of contract
   * @returns instance of Contract
   */
  async getContract(
    _abis: ContractInterface,
    _address: string
  ): Promise<Contract | null> {
    try {
      this._loggingService.debug(`ethersjsService.getContract`, _address);
      if ((await this._web3Provider.getCode(_address)) === '0x') {
        console.warn(
          `Address ${_address} is not a contract at the connected chain`
        );
        return null;
      }
    } catch (e) {
      console.warn(e);
      return null;
    }
    const resultingContract = new ethers.Contract(
      _address,
      _abis,
      this._web3Provider.getSigner(_address)
    );
    this._loggingService.debug(
      `ethersjsService.getContract`,
      resultingContract
    );
    return resultingContract;
  }

  /**
   * Generates address with checksum (lower e upper case) as specified at EIP-55
   *
   * @param {string} _address the given HEX address
   * @return {string} The HEX address with checksum
   */
  toCheckSumAddress(_address: string): string {
    return ethers.utils.getAddress(_address);
  }

  /**
   * @returns Lastest block in the current connected chain
   */
  getCurrentBlockNumber(): Promise<number> {
    return this._web3Provider.getBlockNumber();
  }

  /**
   * Handle a Web3 provider (Metamask Ethereum) and makes the bindings of events: connect, disconnect, accountsChanged, message etc
   * @returns TRUE if Wallet detected and bindings made successfully
   */
  private async handleEthereumProvider(provider: any): Promise<boolean> {
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
      EthersjsService.name,
      'handleOnAccountsChanged',
      _accounts
    );
    this._userAccountAddress =
      _accounts.length > 0 ? this.toCheckSumAddress(_accounts[0]) : undefined;
    if (_accounts.length > 0) {
      this._signerSubject.next(
        this._web3Provider.getSigner(this._userAccountAddress)
      );
    } else {
      this._signerSubject.next(null);
    }
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
