import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { ITableColumn } from 'src/app/shared/components/table/tableColumn.interface';
import { TransactionResult } from '../../model';
import { ERC20BaseContract } from '../../services/ERC20-base';

@Component({
  selector: 'dapp-erc20-metadata',
  templateUrl: './erc20-metadata.component.html',
  styleUrls: ['./erc20-metadata.component.css'],
})
export class ERC20MetadataComponent implements OnInit {
  @Input() contractERC20!: ERC20BaseContract;

  displayedResultColumns: ITableColumn[] = [
    { propertyName: 'property', headerTitle: 'Property' },
    { propertyName: 'value', headerTitle: 'Value' },
  ];

  metadata: { property: string; value: string }[] = [];

  constructor() {}

  ngOnInit(): void {
    // name
    this.contractERC20.name().subscribe((result) => {
      this.addMetadata('name', result);
    });

    //symbol
    this.contractERC20.symbol().subscribe((result) => {
      this.addMetadata('symbol', result);
    });
    //decimals
    this.contractERC20.decimals().subscribe((result) => {
      this.addMetadata('decimals', result);
    });
    //totalSupply
    this.contractERC20.totalSupply().subscribe((result) => {
      this.addMetadata('totalSuppy', result);
    });
  }

  /**
   * A a property {name} with value {value.result} to the metadata array
   * @param name Name of property to be appended to {metadata}
   * @param result Transaction result with the value of the property or an error message
   */
  private addMetadata(name: string, result: TransactionResult<string>) {
    // precisa fazer o destruct senão o Angular não percebe a mudança e a tabela é renderizada sem linhas
    // apesar da mudança dos dados do array, sua referência não é alterada
    this.metadata = [
      ...this.metadata,
      {
        property: name,
        value: result.success ? result.result : `Failed: ${result.result}`,
      },
    ].sort((a, b) => a.property.localeCompare(b.property));
  }
}
