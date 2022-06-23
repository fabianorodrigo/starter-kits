import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkComponent } from './pages/link/link.component';
import { Web3jsHomeComponent } from './pages/web3js-home/web3js-home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { Web3JSRoutingModule } from './web3js.routing.module';
import { Web3Service } from './services/web3.service';
import { LinkTokenService } from './services/link-token.service';

// LAZY LOADING: detach the web3js feature set from the main application.
// The root AppModule must neither load nor reference the Web3jsModule or its files.
// When the router navigates to Web3js route, it uses the loadChildren to
// dynamically load the Web3jsModule.
@NgModule({
  declarations: [Web3jsHomeComponent, LinkComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    SharedModule,
    Web3JSRoutingModule,
  ],
  providers: [Web3Service, LinkTokenService],
})
export class Web3jsModule {}
