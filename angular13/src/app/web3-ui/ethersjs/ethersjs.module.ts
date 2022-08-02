import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EthersjsHomeComponent } from './pages/ethersjs-home/ethersjs-home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { WalletComponent } from './components/wallet/wallet.component';
import { EthersjsService } from './services/ethersjs.service';
import { LinkTokenService } from './services/link-token.service';
import { EthersjsRoutingModule } from './ethersjs.routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { LinkComponent } from './pages/link/link.component';
import { ERC20MetadataComponent } from './components/erc20-metadata/erc20-metadata.component';
import { ERC20BalanceComponent } from './components/erc20-balance/erc20-balance.component';
import { ERC20AllowanceComponent } from './components/erc20-allowance/erc20-allowance.component';
import { ERC20ApprovalEventComponent } from './components/erc20-approval-event/erc20-approval-event.component';
import { ERC20ApproveComponent } from './components/erc20-approve/erc20-approve.component';
import { ERC20TransferEventComponent } from './components/erc20-transfer-event/erc20-transfer-event.component';
import { ERC20TransferFromComponent } from './components/erc20-transfer-from/erc20-transfer-from.component';
import { ERC20TransferComponent } from './components/erc20-transfer/erc20-transfer.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EthersjsHomeComponent,
    WalletComponent,
    ERC20MetadataComponent,
    ERC20BalanceComponent,
    ERC20AllowanceComponent,
    ERC20ApproveComponent,
    ERC20TransferComponent,
    ERC20TransferFromComponent,
    ERC20TransferEventComponent,
    ERC20ApprovalEventComponent,
    LinkComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    EthersjsRoutingModule,
    MaterialModule,
  ],
  providers: [EthersjsService],
})
export class EthersjsModule {}
