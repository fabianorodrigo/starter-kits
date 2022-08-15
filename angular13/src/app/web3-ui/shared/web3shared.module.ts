import { ERC721TokenURIComponent } from './components/erc721-tokenURI/erc721-tokenURI.component';
import { ERC721IsApprovedForAllComponent } from './components/erc721-isApprovedForAll/erc721-isApprovedForAll.component';
import { ERC721SetApprovalForAllComponent } from './components/erc721-setApprovalForAll/erc721-setApprovalForAll.component';
import { ERC721OwnerOfComponent } from './components/erc721-ownerOf/erc721-ownerOf.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ERC20AllowanceComponent } from './components/erc20-allowance/erc20-allowance.component';
import { TokenApprovalEventComponent } from './components/token-approval-event/token-approval-event.component';
import { ERC20MetadataComponent } from './components/erc20-metadata/erc20-metadata.component';
import { TokenTransferEventComponent } from './components/token-transfer-event/token-transfer-event.component';
import { ERC20TransferComponent } from './components/erc20-transfer/erc20-transfer.component';
import { ERC721MetadataComponent } from './components/erc721-metadata/erc721-metadata.component';
import { ERC721SafeTransferComponent } from './components/erc721-safe-transfer/erc721-safe-transfer.component';
import { TokenApproveComponent } from './components/token-approve/token-approve.component';
import { TokenBalanceComponent } from './components/token-balance/token-balance.component';
import { TokenTransferFromComponent } from './components/token-transfer-from/token-transfer-from.component';
import { ERC721GetApprovedComponent } from './components/erc721-getApproved/erc721-getApproved.component';

@NgModule({
  declarations: [
    ERC20MetadataComponent,
    ERC20AllowanceComponent,
    TokenTransferEventComponent,
    TokenApprovalEventComponent,
    ERC20TransferComponent,
    ERC721MetadataComponent,
    ERC721SafeTransferComponent,
    ERC721OwnerOfComponent,
    ERC721TokenURIComponent,
    ERC721GetApprovedComponent,
    ERC721SetApprovalForAllComponent,
    ERC721IsApprovedForAllComponent,
    TokenBalanceComponent,
    TokenTransferFromComponent,
    TokenApproveComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, SharedModule, MaterialModule],
  exports: [
    ERC20MetadataComponent,
    ERC20AllowanceComponent,
    TokenTransferEventComponent,
    TokenApprovalEventComponent,
    ERC20TransferComponent,
    ERC721MetadataComponent,
    ERC721SafeTransferComponent,
    ERC721OwnerOfComponent,
    ERC721TokenURIComponent,
    ERC721GetApprovedComponent,
    ERC721SetApprovalForAllComponent,
    ERC721IsApprovedForAllComponent,
    TokenBalanceComponent,
    TokenTransferFromComponent,
    TokenApproveComponent,
  ],
})
export class Web3sharedModule {}
