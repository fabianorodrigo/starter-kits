import BN from 'bn.js';
import { Observable } from 'rxjs';
import { CallbackFunction, TransactionResult } from '../model';
import { BaseContract } from './contract-base';

/**
 * Base contract to interact with ERC-20 smart contracts
 */
export abstract class ERC20BaseContract extends BaseContract {
  protected _symbol!: string;

  /**
   * @returns Returns the name of the token
   */
  name(): Observable<TransactionResult<string>> {
    return this.call(this.getContractABI(), `name`);
  }

  /**
   * @returns Returns the symbol of the token
   */
  symbol(): Observable<TransactionResult<string>> {
    if (this._symbol) {
      return new Observable<TransactionResult<string>>((subscriber) => {
        subscriber.next({ success: true, result: this._symbol });
      });
    } else {
      return this.call(this.getContractABI(), `symbol`);
    }
  }

  /**
   * @returns Returns the decimals of the token
   */
  decimals(): Observable<TransactionResult<string>> {
    return this.call(this.getContractABI(), `decimals`);
  }

  /**
   * @returns Returns the totalSupply of the token
   */
  totalSupply(): Observable<TransactionResult<string>> {
    return this.call(this.getContractABI(), `totalSupply`);
  }

  /**
   * Returns the account balance of another account with address _owner
   * @param _owner account address which balance is asked
   * @returns _owners balance
   */
  balanceOf(_owner: string): Observable<TransactionResult<BN>> {
    return this.callBN(this.getContractABI(), `balanceOf`, _owner);
  }

  /**
   * Returns the amount which {_spender} is still allowed to withdraw from {_owner}.
   *
   * @param _owner account address owner of tokens and who authorized the spender spends
   * @param _spender account address authorized to spend tokens of {_owner}
   * @returns ammount of owner's tokens allowed to be spent by {_spender}
   */
  allowance(
    _owner: string,
    _spender: string
  ): Observable<TransactionResult<BN>> {
    return this.callBN(this.getContractABI(), `allowance`, _owner, _spender);
  }

  /**
   * Transfers {_value} amount of tokens to address {_to}
   *
   * @param _to destination account
   * @param _value quantity of tokens to be transfered
   * @param _callback  Function to be called when the transaction is confirmed
   * @returns
   */
  transfer(
    _to: string,
    _value: BN,
    _callback?: CallbackFunction
  ): Observable<TransactionResult<string>> {
    const successSentMessage = `Transaction to tranfer ${_value.toString()} ${
      this._symbol
    }  to ${_to} was sent successfully`;
    const successConfirmationMessage = `Transaction to tranfer ${_value.toString()} ${
      this._symbol
    }  to ${_to} was confirmed`;
    return this.send(
      this.getContractABI(),
      'transfer',
      successSentMessage,
      _callback,
      successConfirmationMessage,
      _to,
      _value
    );
  }

  /**
   * Transfers {_value} amount of tokens  from address {_from} to address {_to}
   *
   * @param _to destination account
   * @param _value quantity of tokens to be transfered
   * @param _callback  Function to be called when the transaction is confirmed
   * @returns
   */
  transferFrom(
    _from: string,
    _to: string,
    _value: BN,
    _callback?: CallbackFunction
  ): Observable<TransactionResult<string>> {
    const successSentMessage = `Transaction to tranfer ${_value.toString()} ${
      this._symbol
    } from ${_from} to ${_to} was sent successfully`;
    const successConfirmationMessage = `Transaction to tranfer ${_value.toString()} ${
      this._symbol
    }  from ${_from} to ${_to} was confirmed`;
    return this.send(
      this.getContractABI(),
      'transferFrom',
      successSentMessage,
      _callback,
      successConfirmationMessage,
      _from,
      _to,
      _value
    );
  }

  /**
   * Allows {_spender} to withdraw from your account multiple times, up to the {_value} amount.
   * If this function is called again it overwrites the current allowance with _value.
   *
   * @param _spender account authorized to spend up to {_value} tokens
   * @param _value quantity of tokens to be approved to be spent by {_spender}
   * @param _callback  Function to be called when the transaction is confirmed
   * @returns
   */
  approve(
    _spender: string,
    _value: BN,
    _callback?: CallbackFunction
  ): Observable<TransactionResult<string>> {
    return this.send(
      this.getContractABI(),
      'approve',
      `Transaction to approve allowance of ${_value} ${this.symbol} to ${_spender} was sent successfully`,
      _callback,
      `Transaction to approve allowance of ${_value} ${this.symbol} to ${_spender} was confirmed`,
      _spender,
      _value
    );
  }
}
