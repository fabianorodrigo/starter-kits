import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Signer } from 'ethers';
import { Result } from 'ethers/lib/utils';
import { BaseFormComponent } from 'src/app/shared/pages/base-form/base-form.component';
import { MessageService } from 'src/app/shared/services/message.service';
import { NumbersService } from 'src/app/shared/services/numbers.service';
import { IContractEventMonitor } from 'src/app/web3-ui/shared/contract-event-monitor.interface';
import { IERC20 } from 'src/app/web3-ui/shared/erc20.interface';
import { IApprovalEvent } from 'src/app/web3-ui/shared/model/interfaces';
import { ethereumAddressValidator } from 'src/app/web3-ui/shared/validators/ethereumAddress.validator';
import { TransactionResult } from '../../../shared/model';
import { ERC20BaseContract } from '../../services/ERC20-base';
import { EthersjsService } from '../../services/ethersjs.service';

@Component({
  selector: 'dapp-erc20-approve',
  templateUrl: './erc20-approve.component.html',
  styleUrls: ['./erc20-approve.component.css'],
})
export class ERC20ApproveComponent extends BaseFormComponent implements OnInit {
  @Input() contractERC20!: IERC20 & IContractEventMonitor;
  @Input() symbol: string = '';
  @Input() decimals: number = 1;

  isLoading = false;
  eventList: IApprovalEvent[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _messageService: MessageService,
    private _numberService: NumbersService,
    private _web3Service: EthersjsService
  ) {
    super();
  }

  ngOnInit(): void {
    //o minLength é para prevenir o "Short address/parameter Attack"
    this.form = this._formBuilder.group({
      spenderAddress: [
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
    this._web3Service.getSignerSubject().subscribe(async (_signer) => {
      //Se a conta não for nula, cria uma nova subscrição filtrando por eventos `Approval`
      // que tenha a conta `from` igual à conta conectada na Wallet
      if (_signer) {
        // subscrição eventos últimos 1000 blocos
        this.fetchPastApprovalEvents(_signer);
        // subscrição eventos futuros
        await this.contractERC20.subscribeContractEvent({
          eventName: 'Approval',
          args: [await _signer.getAddress()],
          listenerFunction: (owner, spender, value, event) => {
            this.eventList = [
              ...this.eventList,
              {
                blockNumber: event.blockNumber,
                owner,
                spender,
                value,
              },
            ];
          },
        });
      }
    });
  }

  approve(event: Event) {
    this.submitted = true;
    event.preventDefault();
    if (this.form.valid) {
      this.isLoading = true;

      try {
        this.contractERC20
          .approve(
            (this.form.get('spenderAddress') as FormControl).value,
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
   * @param signer Account address used to filter the events where 'owner' part equals it
   */
  private async fetchPastApprovalEvents(signer: Signer): Promise<void> {
    const currentBlock = await this._web3Service.getCurrentBlockNumber();
    const pastEvents = await this.contractERC20.getContractsPastEvent({
      eventName: 'Approval',
      args: [await signer.getAddress()],
      fromBlock: currentBlock - 1000,
      toBlock: 'latest',
    });

    const tempArray = [];
    for (const e of pastEvents) {
      tempArray.push({
        blockNumber: e.blockNumber,
        owner: (<Result>e.args)['owner'],
        spender: (<Result>e.args)['spender'],
        value: (<Result>e.args)['value'],
      });
    }
    this.eventList = [...this.eventList, ...tempArray];
  }
}
