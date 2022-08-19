import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ethers } from 'ethers';
import { ITableColumn } from 'src/app/shared/components/table/tableColumn.interface';
import { IERC20 } from '../../services/erc20.interface';
import { TransactionResult } from '../../model';
import { IMetadata } from '../../model/interfaces/metadata.interface';
import { IERC721 } from '../../services/erc721.interface';

const ERC165_INTERFACE_IDENTIFIER = '0x01ffc9a7';
const ERC721METADATA_INTERFACE_IDENTIFIER = '0x5b5e139f';
const ERC721ENUMERABLE_INTERFACE_IDENTIFIER = '0x780e9d63';

@Component({
  selector: 'dapp-erc721-metadata',
  templateUrl: './erc721-metadata.component.html',
  styleUrls: ['./erc721-metadata.component.css'],
})
export class ERC721MetadataComponent implements OnInit {
  @Input() contractERC721!: IERC721;

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
    this.contractERC721
      .name()
      .subscribe((result: TransactionResult<string>) => {
        this.addMetadata('name', result);
      });

    //symbol
    this.isLoading++;
    this.contractERC721
      .symbol()
      .subscribe((result: TransactionResult<string>) => {
        this.addMetadata('symbol', result);
      });

    //totalSupply
    this.isLoading++;
    this.contractERC721
      .totalSupply()
      .subscribe((result: TransactionResult<string>) => {
        this.addMetadata('totalSuppy', result);
      });

    //Implements ERC-165
    this.isLoading++;
    this.contractERC721
      .supportsInterface(ethers.utils.arrayify(ERC165_INTERFACE_IDENTIFIER))
      .subscribe((result: TransactionResult<boolean>) => {
        this.addMetadata('Implements ERC165', {
          success: result.success,
          result: result.result ? 'Yes' : 'No',
        });
      });

    //Implements ERC-721 Metadata
    this.isLoading++;
    this.contractERC721
      .supportsInterface(
        ethers.utils.arrayify(ERC721METADATA_INTERFACE_IDENTIFIER)
      )
      .subscribe((result: TransactionResult<boolean>) => {
        this.addMetadata('Implements ERC721Metadata', {
          success: result.success,
          result: result.result ? 'Yes' : 'No',
        });
      });

    //Implements ERC-721 Enumerable
    this.isLoading++;
    this.contractERC721
      .supportsInterface(
        ethers.utils.arrayify(ERC721ENUMERABLE_INTERFACE_IDENTIFIER)
      )
      .subscribe((result: TransactionResult<boolean>) => {
        this.addMetadata('Implements ERC721Enumerable', {
          success: result.success,
          result: result.result ? 'Yes' : 'No',
        });
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
