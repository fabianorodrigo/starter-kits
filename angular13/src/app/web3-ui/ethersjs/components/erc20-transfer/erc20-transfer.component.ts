import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Signer } from 'ethers';
import { Result } from 'ethers/lib/utils';
import { BaseFormComponent } from 'src/app/shared/pages/base-form/base-form.component';
import { MessageService } from 'src/app/shared/services/message.service';
import { NumbersService } from 'src/app/shared/services/numbers.service';
import { ITransferEvent } from 'src/app/web3-ui/shared/model/interfaces';
import { ethereumAddressValidator } from 'src/app/web3-ui/shared/validators/ethereumAddress.validator';
import { TransactionResult } from '../../../shared/model';
import { ERC20BaseContract } from '../../services/ERC20-base';
import { EthersjsService } from '../../services/ethersjs.service';

@Component({
  selector: 'dapp-erc20-transfer',
  templateUrl: './erc20-transfer.component.html',
  styleUrls: ['./erc20-transfer.component.css'],
})
export class ERC20TransferComponent
  extends BaseFormComponent
  implements OnInit
{
  @Input() contractERC20!: ERC20BaseContract;
  @Input() symbol: string = '';
  @Input() decimals: number = 1;

  isLoading = false;
  eventList: ITransferEvent[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _messageService: MessageService,
    private _ethersjsService: EthersjsService
  ) {
    super();
  }

  ngOnInit(): void {
    //o minLength é para prevenir o "Short address/parameter Attack"
    this.form = this._formBuilder.group({
      toAddress: [
        '',
        [
          Validators.required,
          Validators.minLength(42),
          ethereumAddressValidator,
        ],
      ],
      value: ['', [Validators.required, Validators.min(1)]],
    });

    // EVENTOS
    this._ethersjsService.getSignerSubject().subscribe(async (_signer) => {
      //Se a conta não for nula, cria uma nova subscrição filtrando por eventos `Transfer`
      // que tenha a conta `from` igual à conta conectada na Wallet
      if (_signer) {
        // subscrição eventos últimos 1000 blocos
        this.fetchPastTransferEvents(_signer);
        // subscrição eventos futuros
        await this.contractERC20.subscribeContractEvent({
          eventName: 'Transfer',
          args: [await _signer.getAddress()],
          listenerFunction: (from, to, value, event) => {
            this.eventList = [
              ...this.eventList,
              {
                blockNumber: event.blockNumber,
                from,
                to,
                value,
              },
            ];
          },
        });
      }
    });
  }

  transfer(event: Event) {
    this.submitted = true;
    event.preventDefault();
    if (this.form.valid) {
      this.isLoading = true;

      try {
        this.contractERC20
          .transfer(
            (this.form.get('toAddress') as FormControl).value,
            (this.form.get('value') as FormControl).value,
            (result: TransactionResult<string>) => {
              this.isLoading = false;
              this._messageService.show(result.result);
            }
          )
          .subscribe((result) => {
            if (result.success == false) {
              this._messageService.show(
                `It was not possible to send the transaction: ${result.result}`
              );
              return;
            } else {
              this._messageService.show(result.result);
            }

            this.isLoading = false;
          });
      } catch (e: unknown) {
        this.isLoading = false;
        this._messageService.show((<Error>e).message);
      }
    } else {
      this._messageService.show(
        `The data filled in the form is not valid. Please, fill the form correctly before submit it`
      );
    }
  }

  /**
   * Fetches the past events on the blockchain since current block less 1000 and feed the {pastEvents} array
   *
   * @param signer Account address used to filter the events where 'from' part equals it
   */
  private async fetchPastTransferEvents(_signer: Signer): Promise<void> {
    const currentBlock = await this._ethersjsService.getCurrentBlockNumber();
    // subscrição eventos passados
    const pastEvents = await this.contractERC20.getContractsPastEvent({
      eventName: 'Transfer',
      filter: { from: await _signer.getAddress() },
      fromBlock: currentBlock - 1000,
      toBlock: 'latest',
    });

    const tempArray = [];
    for (const e of pastEvents) {
      tempArray.push({
        blockNumber: e.blockNumber,
        from: (<Result>e.args)['from'],
        to: (<Result>e.args)['to'],
        value: (<Result>e.args)['value'],
      });
    }
    this.eventList = [...this.eventList, ...tempArray];
  }
}
