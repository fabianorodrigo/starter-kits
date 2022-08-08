import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ERC20MetadataComponent } from './components/erc20-metadata/erc20-metadata.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [ERC20MetadataComponent],
  imports: [CommonModule, SharedModule, MaterialModule],
  exports: [ERC20MetadataComponent],
})
export class Web3sharedModule {}
