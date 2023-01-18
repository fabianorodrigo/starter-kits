import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarkdownComponent } from 'src/app/shared/pages/markdown/markdown.component';

// Components
import { LinkComponent } from './pages/link/link.component';
import { Web3jsHomeComponent } from './pages/web3js-home/web3js-home.component';

const routes: Routes = [
  {
    // Use empty path routes to group routes together without adding any
    // additional path segments to the URL. Users will still visit /web3js
    // and the Web3JSHomeComponent still serves as the Routing Component
    // containing child routes.
    path: '',
    component: Web3jsHomeComponent,
    children: [
      {
        path: '',
        component: MarkdownComponent,
        data: { url: 'app/web3-ui/web3js/README.md' },
      },
      { path: 'link', component: LinkComponent },
    ],
  },
];

@NgModule({
  //Only call RouterModule.forRoot() in the root AppRoutingModule.
  // In any other module, you must call the RouterModule.forChild() method to register additional routes.
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Web3JSRoutingModule {}
