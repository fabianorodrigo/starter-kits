import BN from 'bn.js';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoggingService } from 'src/app/shared/services/logging.service';
import { Contract, EventData } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import {
  CallbackFunction,
  EventMonitoringParameters,
  EventPastParameters,
  ProviderErrors,
  TransactionResult,
} from '../model';
import { Web3Subscription } from '../model/events/Subscription';
import { Web3Service } from './web3.service';

export abstract class BaseContract {
  protected contract!: Contract;
  protected _eventListeners: { [event: string]: BehaviorSubject<any> } = {};
  private _owner!: string;
  private _fromAccount!: string | null;
  public address: string;

  constructor(
    private _loggingService: LoggingService,
    protected _web3Service: Web3Service,
    _address: string
  ) {
    this.address = _address;
    this._web3Service.getUserAccountAddressSubject().subscribe((_account) => {
      this._fromAccount = _account;
    });
  }

  protected async getContract(_abis: AbiItem[]): Promise<Contract> {
    if (this.contract != null) {
      return this.contract;
    } else if (this._web3Service) {
      const _contract = await this._web3Service.getContract(
        _abis,
        this.address
      );
      if (_contract == null) {
        throw new Error(
          `Contract not found. Confirm that your wallet is connected on the right chain`
        );
      } else {
        return _contract;
      }
    }
    throw new Error(`Web3 not instanciated`);
  }

  /**
   * Returns the contract ABI
   */
  abstract getContractABI(): AbiItem[];

  /**
   * @returns The owner of contract
   */
  owner(): Observable<string> {
    //TODO: retornar Promise ao invés de Observable?
    return new Observable<string>((_subscriber) => {
      if (this._owner) {
        _subscriber.next(this._owner);
      } else {
        this.getString(this.getContractABI(), 'owner').then((_address) => {
          this._owner = _address;
          _subscriber.next(this._owner);
        });
      }
    });
  }

  /**
   * @returns returns TRUE if the wallet address is equal to the contract owner
   */
  isOwner(): Observable<boolean> {
    this._loggingService.debug(BaseContract.name, 'isOwner', 'CALLED');
    return new Observable<boolean>((_subscriber) => {
      this.owner().subscribe(async (_ownerAddress) => {
        const _userAddress = await this._web3Service.getUserAccountAddress();
        _subscriber.next(_ownerAddress === _userAddress);
      });
    });
  }

  /**
   * Gets a instance of WEB3.JS Subscription of an event with the parameters requested
   * @param _monitorParameter  Object with the parameteres of event monitoring including Name of the event
   * and an optional filter and an optional  parameter that indicates,
   * if is a historical search, from which block
   *
   * @returns WEB3.JS Subscription
   */
  async getWeb3EventSubscription(
    _monitorParameter: EventMonitoringParameters
  ): Promise<Web3Subscription> {
    const _contract = await this.getContract(this.getContractABI());
    return _contract.events[_monitorParameter.eventName](
      _monitorParameter.web3jsParameters
    );
  }

  /**
   * Gets a instance of WEB3.JS Subscription of past events with the parameters requested
   * @param _monitorParameter  Object with the parameteres of event monitoring including Name of the event;
   * an optional filter and, for historical search, the initial and final block of search
   *
   * @returns WEB3.JS Subscription
   */
  async getWeb3PastEventSubscription(
    _monitorParameter: EventPastParameters
  ): Promise<EventData[]> {
    const _contract = await this.getContract(this.getContractABI());

    return _contract.getPastEvents(
      _monitorParameter.eventName,
      _monitorParameter.web3jsParameters
    );
  }

  /**
   * Execute a CALL (DOEST NOT change state) to a function  from the currentAccount selected on the wallet provider
   *
   * @param _abi  Contract's ABI
   * @param _functionName Name of contract's function to be invoked
   * @param _args Contract`s function arguments
   * @returns Observable<TransactionResult<T>>
   */
  protected call<T>(
    _abi: AbiItem[],
    _functionName: string,
    ..._args: any
  ): Observable<TransactionResult<T>> {
    return this.callPrivate(_abi, _functionName, this.justReturnV, ..._args);
  }

  /**
   * Execute a CALL (DOEST NOT change state) to a function  from the currentAccount selected on the wallet provider
   * This function makes the same as call<T> and converts the result to type {BN}, since the provider returns string
   *
   * @param _abi  Contract's ABI
   * @param _functionName Name of contract's function to be invoked
   * @param _args Contract`s function arguments
   * @returns Observable<TransactionResult<T>>
   */
  protected callBN(
    _abi: AbiItem[],
    _functionName: string,
    ..._args: any
  ): Observable<TransactionResult<BN>> {
    return this.callPrivate(
      _abi,
      _functionName,
      (v: any) => {
        return new BN(v);
      },
      ..._args
    );
  }

  /**
   * Execute a SEND (change state) to a function  from the currentAccount selected on the wallet provider
   *
   * @param _abi  Contract's ABI
   * @param _functionName Name of contract's function to be invoked
   * @param _successMessage Message to be sent in the Observable in case of successfully transaction sent
   * @param _callback Function to be called when the transaction is confirmed
   * @param _confirmationMessage Message to be sent in the callback function when transaction confirmed by the network
   * @param _args Contract`s function arguments
   * @returns Observable<TransactionResult>
   */
  protected send(
    _abi: AbiItem[],
    _functionName: string,
    _successMessage: string,
    _callback?: CallbackFunction,
    _confirmationMessage?: string,
    ..._args: any
  ): Observable<TransactionResult<string>> {
    return new Observable<TransactionResult<string>>((subscriber) => {
      this.getContract(_abi as AbiItem[]).then(async (_contract) => {
        const fromAccount = await this._web3Service.getUserAccountAddress();
        try {
          await _contract.methods[_functionName](..._args)
            .send({
              from: fromAccount,
            })
            .once(`transactionHash`, (hash: string) => {
              subscriber.next({ success: true, result: _successMessage });
            })
            .once(
              `confirmation`,
              (confNumber: number, receipt: any, latestBlockHash: string) => {
                if (_callback) {
                  _callback({
                    success: true,
                    result: _confirmationMessage || ``,
                  });
                }
              }
            )
            .once('error', (e: any) => {
              console.error(e);
              if (_callback) {
                let msg = `Transaction has been reverted by the blockchain network`;
                if (e.code && ProviderErrors[e.code]) {
                  msg = `${ProviderErrors[e.code].title}: ${
                    ProviderErrors[e.code].message
                  }`;
                }
                _callback({
                  success: false,
                  result: msg,
                });
              }
            });
        } catch (e: any) {
          const providerError = ProviderErrors[e.code];
          let message = `We had some problem. The transaction wasn't sent.`;
          if (providerError) {
            message = `${providerError.title}: ${providerError.message}. The transaction wasn't sent.`;
          }
          if (_callback) {
            _callback({
              success: false,
              result: message,
            });
          } else {
            subscriber.next({
              success: false,
              result: message,
            });
          }
        }
      });
    });
  }

  /**
   * Calls the GET function of the contract with the name {_propertyName}
   * @param _abi Contract's ABI
   * @param _propertyName name of the property of type string
   */
  protected getString(_abi: AbiItem[], _propertyName: string): Promise<string> {
    return this.getProperty(_abi, _propertyName);
  }

  /**
   * Calls the GET function of the contract with the name {_propertyName}
   * @param _abi Contract's ABI
   * @param _propertyName name of the property of type string[]
   */
  protected getStringArray(
    _abi: AbiItem[],
    _propertyName: string
  ): Promise<string[]> {
    return this.getProperty(_abi, _propertyName);
  }

  /**
   * Calls the GET function of the contract with the name {_propertyName}
   * @param _abi Contract's ABI
   * @param _propertyName name of the property of type boolean
   */
  protected async getBoolean(
    _abi: AbiItem[],
    _propertyName: string
  ): Promise<boolean> {
    return this.getProperty(_abi, _propertyName);
  }

  /**
   * Calls the GET function of the contract with the name {_propertyName}
   * @param _propertyName name of the property of type number
   */
  protected getNumber(_abi: AbiItem[], _propertyName: string): Promise<number> {
    return this.getProperty(_abi, _propertyName);
  }

  /**
   * Calls the GET function of the contract with the name {_propertyName}
   * @param _propertyName name of the property of type BN (BigNumber)
   */
  protected getBN(_abi: AbiItem[], _propertyName: string): Promise<BN> {
    return this.getProperty(_abi, _propertyName);
  }

  /**
   * Calls the GET function of the contract with the name {_propertyName}
   *
   * @param _abi Contract's ABI
   * @param _propertyName name of the property of type string
   * @param _subscriber Instance of the subscriber that will receive the result
   */
  protected async getProperty(
    _abi: AbiItem[],
    _propertyName: string
  ): Promise<any> {
    try {
      const _contract = await this.getContract(_abi);
      // If not passing 'from', the msg.sender is 0x0 at the contract's function
      // This was detected when testing the 'canClose()' function, a kind of getter
      // where we needed to validate the msg.sender
      const _result = await _contract.methods[_propertyName]().call({
        from: this._fromAccount,
      });
      return _result;
    } catch (e: any) {
      console.error(e);
    }
  }

  /**
   * Just return the value received. It is used by callPrivate as default
   * @param v value to be received and to be returned
   * @returns
   */
  private justReturnV(v: any) {
    return v;
  }

  /**
   * Execute a CALL (DOEST NOT change state) to a function  from the currentAccount selected on the wallet provider
   *
   * @param _abi  Contract's ABI
   * @param _functionName Name of contract's function to be invoked
   * @param _args Contract`s function arguments
   * @returns Observable<TransactionResult<T>>
   */
  private callPrivate<T>(
    _abi: AbiItem[],
    _functionName: string,
    transform: Function = this.justReturnV,
    ..._args: any
  ): Observable<TransactionResult<T>> {
    return new Observable<TransactionResult<T>>((subscriber) => {
      this.getContract(_abi as AbiItem[]).then(async (_contract) => {
        let result;
        const fromAccount = await this._web3Service.getUserAccountAddress();
        try {
          result = await _contract.methods[_functionName](..._args).call({
            from: fromAccount,
          });
          subscriber.next({
            success: true,
            result: transform(result),
          });
        } catch (e: any) {
          const providerError = ProviderErrors[e.code];
          let message = `We had some problem. The transaction wasn't sent.`;
          if (providerError) {
            message = `${providerError.title}: ${providerError.message}. The transaction wasn't sent.`;
          }
          console.warn(e);
          subscriber.next({
            success: false,
            result: message,
          });
        }
      });
    });
  }
}
