import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from '../../material/material.module';
import { Web3sharedModule } from '../shared/web3shared.module';
import { ERC20AllowanceComponent } from './components/erc20-allowance/erc20-allowance.component';
import { ERC20ApprovalEventComponent } from './components/erc20-approval-event/erc20-approval-event.component';
import { ERC20ApproveComponent } from './components/erc20-approve/erc20-approve.component';
import { ERC20BalanceComponent } from './components/erc20-balance/erc20-balance.component';
import { ERC20TransferEventComponent } from './components/erc20-transfer-event/erc20-transfer-event.component';
import { ERC20TransferFromComponent } from './components/erc20-transfer-from/erc20-transfer-from.component';
import { ERC20TransferComponent } from './components/erc20-transfer/erc20-transfer.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { LinkComponent } from './pages/link/link.component';
import { Web3jsHomeComponent } from './pages/web3js-home/web3js-home.component';
import { LinkTokenService } from './services/link-token.service';
import { Web3Service } from './services/web3.service';
import { Web3JSRoutingModule } from './web3js.routing.module';

// LAZY LOADING: detach the web3js feature set from the main application.
// The root AppModule must neither load nor reference the Web3jsModule or its files.
// When the router navigates to Web3js route, it uses the loadChildren to
// dynamically load the Web3jsModule.
@NgModule({
  declarations: [
    Web3jsHomeComponent,
    LinkComponent,
    WalletComponent,
    ERC20BalanceComponent,
    ERC20AllowanceComponent,
    ERC20ApproveComponent,
    ERC20TransferComponent,
    ERC20TransferFromComponent,
    ERC20TransferEventComponent,
    ERC20ApprovalEventComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    Web3JSRoutingModule,
    Web3sharedModule,
  ],
  providers: [Web3Service, LinkTokenService],
})
export class Web3jsModule {}
