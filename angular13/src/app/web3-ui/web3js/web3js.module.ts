import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from '../../material/material.module';
import { Web3sharedModule } from '../shared/web3shared.module';
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
    ERC20TransferComponent,
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
