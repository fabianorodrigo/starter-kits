import BN from 'bn.js';
import { BigNumber, Contract, ContractInterface, Signer } from 'ethers';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoggingService } from 'src/app/shared/services/logging.service';
import {
  CallbackFunction,
  ProviderErrors,
  TransactionResult,
} from '../../shared/model';
import { EventMonitoringParameters } from '../model/EventMonitoringParameters';
import { EventPastParameters } from '../model/EventPastParameters';
import { EthersjsService } from './ethersjs.service';
import { Event } from '@ethersproject/contracts';

export abstract class ContractBaseService {
  protected contract!: Contract;
  protected _eventListeners: { [event: string]: BehaviorSubject<any> } = {};
  private _owner!: string;
  private _signer!: Signer | null;
  public address: string;

  constructor(
    private _loggingService: LoggingService,
    protected _ethersjsService: EthersjsService,
    _address: string
  ) {
    this.address = _address;
    this._ethersjsService.getSignerSubject().subscribe((_account) => {
      this._signer = _account;
    });
  }

  protected async getContract(_abis: ContractInterface): Promise<Contract> {
    if (this.contract != null) {
      return this.contract;
    } else if (this._ethersjsService) {
      const _contract = await this._ethersjsService.getContract(
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
  abstract getContractABI(): ContractInterface;

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
    return new Observable<boolean>((_subscriber) => {
      this.owner().subscribe(async (_ownerAddress) => {
        const _userAddress =
          await this._ethersjsService.getUserAccountAddress();
        _subscriber.next(_ownerAddress === _userAddress);
      });
    });
  }

  /**
   * Subscribe to a contract's event  with optional filter parameters registering a listener function
   *
   * @param _monitorParameter  Object with the parameteres of event monitoring including Name of the event,
   * the listener function and optional filter arguments
   *
   */
  async subscribeContractEvent(
    _monitorParameter: EventMonitoringParameters
  ): Promise<void> {
    const _contract = await this.getContract(this.getContractABI());
    const filter = _contract.filters[_monitorParameter.eventName](
      _monitorParameter.args
    );
    _contract.on(filter, _monitorParameter.listenerFunction);
  }

  /**
   * Gets list of past events with the parameters requested
   *
   * @param _monitorParameter  Object with the parameteres of event monitoring including Name of the event;
   * an optional filter and the initial and final block of search
   *
   * @returns Events array
   */
  async getContractsPastEvent(
    _monitorParameter: EventPastParameters
  ): Promise<Event[]> {
    const _contract = await this.getContract(this.getContractABI());
    const filter = _contract.filters[_monitorParameter.eventName](
      _monitorParameter.args
    );

    return _contract.queryFilter(
      filter,
      _monitorParameter.fromBlock,
      _monitorParameter.toBlock
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
    _abi: ContractInterface,
    _functionName: string,
    ..._args: any
  ): Observable<TransactionResult<T>> {
    return this.callPrivate(_abi, _functionName, this.justReturnV, ..._args);
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
    _abi: ContractInterface,
    _functionName: string,
    _successMessage: string,
    _callback?: CallbackFunction,
    _confirmationMessage?: string,
    ..._args: any
  ): Observable<TransactionResult<string>> {
    return new Observable<TransactionResult<string>>((subscriber) => {
      this.getContract(_abi).then(async (_contract) => {
        const fromSigner = this._ethersjsService.getSigner();
        if (fromSigner == null)
          throw new Error(`Not possible to determine the origin account`);
        try {
          _contract
            .connect(fromSigner)
            [_functionName](..._args)
            .then((tx: TransactionResponse) => {
              // espera-se que o wait seja o cara que vai ser executado quando for confirmado
              // (equivalente ao 'once('confirmation') no web3js)
              tx.wait()
                .then((_receipt) => {
                  if (_callback) {
                    _callback({
                      success: true,
                      result: _confirmationMessage || ``,
                    });
                  }
                })
                .catch((e) => {
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
                  subscriber.next({ success: true, result: _successMessage });
                });
              subscriber.next({ success: true, result: _successMessage });
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
  protected getString(
    _abi: ContractInterface,
    _propertyName: string
  ): Promise<string> {
    return this.getProperty(_abi, _propertyName);
  }

  /**
   * Calls the GET function of the contract with the name {_propertyName}
   * @param _abi Contract's ABI
   * @param _propertyName name of the property of type string[]
   */
  protected getStringArray(
    _abi: ContractInterface,
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
    _abi: ContractInterface,
    _propertyName: string
  ): Promise<boolean> {
    return this.getProperty(_abi, _propertyName);
  }

  /**
   * Calls the GET function of the contract with the name {_propertyName}
   * @param _propertyName name of the property of type number
   */
  protected getNumber(
    _abi: ContractInterface,
    _propertyName: string
  ): Promise<number> {
    return this.getProperty(_abi, _propertyName);
  }

  /**
   * Calls the GET function of the contract with the name {_propertyName}
   * @param _propertyName name of the property of type BN (BigNumber)
   */
  protected getBN(_abi: ContractInterface, _propertyName: string): Promise<BN> {
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
    _abi: ContractInterface,
    _propertyName: string
  ): Promise<any> {
    try {
      const _contract = await this.getContract(_abi);
      // If not passing 'from', the msg.sender is 0x0 at the contract's function
      // This was detected when testing the 'canClose()' function, a kind of getter
      // where we needed to validate the msg.sender
      const _result = await _contract[_propertyName]();
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
    _abi: ContractInterface,
    _functionName: string,
    transform: Function = this.justReturnV,
    ..._args: any
  ): Observable<TransactionResult<T>> {
    return new Observable<TransactionResult<T>>((subscriber) => {
      this.getContract(_abi).then(async (_contract) => {
        let result;
        const fromAccount = await this._ethersjsService.getUserAccountAddress();
        if (fromAccount == null)
          throw new Error(`Not possible to determine the origin account`);
        try {
          result = await _contract
            .connect(fromAccount)
            [_functionName](..._args);
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
