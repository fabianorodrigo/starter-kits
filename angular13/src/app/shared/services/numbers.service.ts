import { Injectable } from '@angular/core';
import BN from 'bn.js';
import { BigNumber } from 'ethers';

// Está com providedIn null: https://angular.io/guide/providers#providedin-and-ngmodules
@Injectable({ providedIn: null })
export class NumbersService {
  constructor() {}

  /**
   * Time in Ethereum are represented in 'seconds' since 1/1/1970. While in Javascript, it's in milliseconds
   * @param timeInMillisJS Time in milliseconds since 1/1/1970 UTC
   * @returns Time in seconds since 1/1/1970 UTC
   */
  convertTimeJSToChain(timeInMillisJS: number) {
    return new BN(timeInMillisJS / 1000);
  }

  /**
   * Time in Ethereum are represented in 'seconds' since 1/1/1970. While in Javascript, it's in milliseconds
   * @param timeInSeconds Time in seconds since 1/1/1970 UTC
   * @returns Time in milliseconds since 1/1/1970 UTC
   */
  convertTimeChainToJS(timeInSeconds: number) {
    return timeInSeconds * 1000;
  }

  /**
   * We need to convert values to string on forms. If a huge number, the constructor of BN throws exception
   *
   * @param formRawValue Object with form values
   * @returns Struct with form values in string format
   */
  convertNumberToString(value: number): string {
    return value?.toLocaleString('fullWide', {
      useGrouping: false,
    });
  }

  /**
   * Return the {bn} formatted with thousands separator
   *
   * @param _bn The bignumber to be formatted
   * @param _decimals the number of decimals representantion in the {bn}
   */
  formatBN(_bn: BN, _decimals: number): string {
    if (!_bn) return '?';
    let result = '';
    const decimals = _decimals ? _decimals : 0;
    // como o bn.js não suporta decimais, foi feita a formatação com
    // 3 decimais a menos para possibilitar a representação de frações
    const decimalsLess3 = decimals > 3 ? decimals - 3 : decimals;
    try {
      const bnDivByDecimalsLess3 = _bn.div(
        new BN(Math.pow(10, decimalsLess3).toString())
      );
      // Se o valor de {bn} for menor que os decimais menos 3 casas decimais, resultando
      // em zero na divisão, será retornado simplesmente o valor dividido por {decimals}
      if (bnDivByDecimalsLess3.isZero() && !_bn.isZero()) {
        return (_bn.toNumber() / Math.pow(10, decimals)).toString();
      }
      // Se o resultado for menor que 1000, a lógica do FOR abaixo não vai funcionar.
      // Neste caso, dividimos este resultado por 1000 (refente às 3 casas decimais retirada acima)
      else if (bnDivByDecimalsLess3.ltn(1000) && decimals != decimalsLess3) {
        return (bnDivByDecimalsLess3.toNumber() / 1000).toString();
      }
      const bnString = bnDivByDecimalsLess3.toString(); // bn.toString();
      for (let i = bnString.length; i > 0; i = i - 3) {
        result =
          bnString.substring(i - 3, i) +
          (result.length > 0 ? ',' : '') +
          result;
      }
    } catch (e) {
      console.error(
        decimalsLess3,
        new BN(Math.pow(10, decimalsLess3).toString()),
        e
      );
      result = _bn.toString();
    }
    return result;
  }

  /**
   * @param bn format the {bn} formatted with expression in shortscale 'million', 'billion', 'trillion'.
   * @param decimals the number of decimals representantion in the {bn}
   * @see: https://www.antidote.info/en/blog/reports/millions-billions-and-other-large-numbers
   */
  formatBNShortScale(bn: BN, decimals: number): string {
    let bnFormatted = this.formatBN(bn, decimals);
    if (bnFormatted.indexOf(',') == -1) return bnFormatted;
    const parts = bnFormatted.split(',');
    if (parts.length <= 2) return bnFormatted;
    return parts[0]
      .concat(`.${parts[1].substring(0, 1)}`)
      .concat(` ${this.SHORT_SCALE_TABLE[parts.length]}`);
  }

  /**
   * Return the {bn} formatted with thousands separator
   *
   * @param _bn The bignumber to be formatted
   * @param _decimals the number of decimals representantion in the {bn}
   */
  formatBigNumber(_bn: BigNumber | BN, _decimals: number): string {
    if (!_bn) return '?';
    //If not a ethers.BigNumber, use the BN function
    if (!BigNumber.isBigNumber(_bn)) return this.formatBN(_bn, _decimals);
    const decimals = _decimals ? _decimals : 0;
    let result = '';
    // como o bn.js não suporta decimais, foi feita a formatação com
    // 3 decimais a menos para possibilitar a representação de frações
    const decimalsLess3 = decimals > 3 ? decimals - 3 : decimals;
    try {
      const bnDivByDecimalsLess3 = _bn.div(
        BigNumber.from(Math.pow(10, decimalsLess3).toString())
      );
      // Se o valor de {bn} for menor que os decimais menos 3 casas decimais, resultando
      // em zero na divisão, será retornado simplesmente o valor dividido por {decimals}
      if (bnDivByDecimalsLess3.isZero() && !_bn.isZero()) {
        return (_bn.toNumber() / Math.pow(10, decimals)).toString();
      }
      // Se o resultado for menor que 1000, a lógica do FOR abaixo não vai funcionar.
      // Neste caso, dividimos este resultado por 1000 (refente às 3 casas decimais retirada acima)
      else if (bnDivByDecimalsLess3.lt(1000) && decimals != decimalsLess3) {
        return (bnDivByDecimalsLess3.toNumber() / 1000).toString();
      }
      const bnString = bnDivByDecimalsLess3.toString(); // bn.toString();
      for (let i = bnString.length; i > 0; i = i - 3) {
        result =
          bnString.substring(i - 3, i) +
          (result.length > 0 ? ',' : '') +
          result;
      }
    } catch (e) {
      console.error(
        decimalsLess3,
        BigNumber.from(Math.pow(10, decimalsLess3).toString()),
        e
      );
      result = _bn.toString();
    }
    return result;
  }

  /**
   * @param bn format the BigNumber {bn} formatted with expression in shortscale 'million', 'billion', 'trillion'.
   * @param decimals the number of decimals representantion in the {bn}
   * @see: https://www.antidote.info/en/blog/reports/millions-billions-and-other-large-numbers
   */
  formatBigNumberShortScale(bn: BigNumber | BN, decimals: number): string {
    //If not a ethers.BigNumber, use the BN function
    if (!BigNumber.isBigNumber(bn))
      return this.formatBNShortScale(bn, decimals);

    let bnFormatted = this.formatBigNumber(bn, decimals);
    if (bnFormatted.indexOf(',') == -1) return bnFormatted;
    const parts = bnFormatted.split(',');
    if (parts.length <= 2) return bnFormatted;
    return parts[0]
      .concat(`.${parts[1].substring(0, 1)}`)
      .concat(` ${this.SHORT_SCALE_TABLE[parts.length]}`);
  }

  /**
   * @dev https://www.antidote.info/en/blog/reports/millions-billions-and-other-large-numbers
   */
  private SHORT_SCALE_TABLE = [
    '',
    '',
    '',
    'million',
    'billion',
    'trillion',
    'quadrillion',
    'quintillion',
    'sextillion',
    'septillion',
    'octillion',
    'nonillion',
  ];
}
