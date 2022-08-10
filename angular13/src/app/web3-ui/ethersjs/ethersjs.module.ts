import { AaveComponent } from './pages/aave/aave.component';
import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import detectEthereumProvider from '@metamask/detect-provider';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { Web3sharedModule } from '../shared/web3shared.module';
import { WalletComponent } from './components/wallet/wallet.component';
import { EthersjsRoutingModule } from './ethersjs.routing.module';
import { EthersjsHomeComponent } from './pages/ethersjs-home/ethersjs-home.component';
import { LinkComponent } from './pages/link/link.component';
import { EthersjsService } from './services/ethersjs.service';
import { ChainBattlesERC721Component } from './pages/chain-battles-erc721/chain-battles.component';

@NgModule({
  declarations: [
    EthersjsHomeComponent,
    WalletComponent,
    LinkComponent,
    AaveComponent,
    ChainBattlesERC721Component,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    EthersjsRoutingModule,
    MaterialModule,
    Web3sharedModule,
  ],
  providers: [
    EthersjsService,
    // Provider para detectar o provider do metamask ao carregar o módulo
    // Quando o módulo for carregado, se o metamask já não estiver conectado ao
    // site, a janelinha do Metamask será aberta para conexão
    //
    // APP_INITIALIZER is a DI token that you can use to provide one or more
    // initialization functions.  If any of these functions returns a Promise
    // or an Observable, initialization does not complete until the Promise is
    // resolved or the Observable is completed.
    //  Angular suspends the module initialization until all the functions
    // provided by the APP_INITIALIZER are run
    {
      provide: APP_INITIALIZER,
      useFactory: () => detectEthereumProvider(),
      multi: true,
    },
  ],
})
export class EthersjsModule {}
