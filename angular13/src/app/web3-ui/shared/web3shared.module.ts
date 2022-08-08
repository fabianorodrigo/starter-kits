import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ERC20BalanceComponent } from './components/erc20-balance/erc20-balance.component';
import { ERC20MetadataComponent } from './components/erc20-metadata/erc20-metadata.component';

@NgModule({
  declarations: [ERC20MetadataComponent, ERC20BalanceComponent],
  imports: [CommonModule, ReactiveFormsModule, SharedModule, MaterialModule],
  exports: [ERC20MetadataComponent, ERC20BalanceComponent],
})
export class Web3sharedModule {}
