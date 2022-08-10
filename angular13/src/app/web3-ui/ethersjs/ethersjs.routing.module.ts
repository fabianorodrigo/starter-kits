import { ChainBattlesERC721Component } from './pages/chain-battles-erc721/chain-battles.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarkdownComponent } from 'src/app/shared/pages/markdown/markdown.component';
import { AaveComponent } from './pages/aave/aave.component';

// Components
import { EthersjsHomeComponent } from './pages/ethersjs-home/ethersjs-home.component';
import { LinkComponent } from './pages/link/link.component';

const routes: Routes = [
  {
    // Use empty path routes to group routes together without adding any
    // additional path segments to the URL. Users will still visit /web3js
    // and the Web3JSHomeComponent still serves as the Routing Component
    // containing child routes.
    path: '',
    component: EthersjsHomeComponent,
    children: [
      {
        path: '',
        component: MarkdownComponent,
        data: { url: 'app/web3-ui/ethersjs/README.md' },
      },
      { path: 'link', component: LinkComponent },
      { path: 'aave', component: AaveComponent },
      { path: 'chainbattlesNFT', component: ChainBattlesERC721Component },
    ],
  },
];

@NgModule({
  //Only call RouterModule.forRoot() in the root AppRoutingModule.
  // In any other module, you must call the RouterModule.forChild() method to register additional routes.
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EthersjsRoutingModule {}
