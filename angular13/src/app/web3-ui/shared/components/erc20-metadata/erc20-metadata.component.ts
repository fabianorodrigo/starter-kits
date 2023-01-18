import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITableColumn } from 'src/app/shared/components/table/tableColumn.interface';
import { IERC20 } from '../../services/erc20.interface';
import { TransactionResult } from '../../model';
import { IMetadata } from '../../model/interfaces/metadata.interface';

@Component({
  selector: 'dapp-erc20-metadata',
  templateUrl: './erc20-metadata.component.html',
  styleUrls: ['./erc20-metadata.component.css'],
})
export class ERC20MetadataComponent implements OnInit {
  @Input() contractERC20!: IERC20;

  @Output() metadataRead = new EventEmitter<IMetadata>();

  displayedResultColumns: ITableColumn[] = [
    { propertyName: 'property', headerTitle: 'Property' },
    { propertyName: 'value', headerTitle: 'Value' },
  ];
  isLoading = 0;

  metadata: IMetadata[] = [];

  constructor() {}

  ngOnInit(): void {
    // name
    this.isLoading++;
    this.contractERC20.name().subscribe((result: TransactionResult<string>) => {
      this.addMetadata('name', result);
    });

    //symbol
    this.isLoading++;
    this.contractERC20
      .symbol()
      .subscribe((result: TransactionResult<string>) => {
        this.addMetadata('symbol', result);
      });
    //decimals
    this.isLoading++;
    this.contractERC20
      .decimals()
      .subscribe((result: TransactionResult<string>) => {
        this.addMetadata('decimals', result);
      });
    //totalSupply
    this.isLoading++;
    this.contractERC20
      .totalSupply()
      .subscribe((result: TransactionResult<string>) => {
        this.addMetadata('totalSuppy', result);
      });
  }

  /**
   * A a property {name} with value {value.result} to the metadata array
   * @param name Name of property to be appended to {metadata}
   * @param result Transaction result with the value of the property or an error message
   */
  private addMetadata(name: string, result: TransactionResult<string>) {
    const metadata = {
      property: name,
      value: result.success ? result.result : `Failed: ${result.result}`,
    };
    this.isLoading--;
    // precisa fazer o destruct senão o Angular não percebe a mudança e a tabela é renderizada sem linhas
    // apesar da mudança dos dados do array, sua referência não é alterada
    this.metadata = [...this.metadata, metadata].sort((a, b) =>
      a.property.localeCompare(b.property)
    );
    this.metadataRead.emit(metadata);
  }
}
