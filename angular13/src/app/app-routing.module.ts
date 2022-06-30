import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './shared/components/error/error.component';

const routes: Routes = [
  {
    path: 'web3js',
    loadChildren: () =>
      import('./web3-ui/web3js/web3js.module').then((m) => m.Web3jsModule),
  },
  {
    path: 'product',
    loadChildren: () =>
      import('./product/product.module').then((m) => m.ProductModule),
  },
  {
    path: 'flexbox',
    loadChildren: () =>
      import('./flexbox/flexbox.module').then((m) => m.FlexboxModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./ui/ui.module').then((m) => m.UiModule),
  },
  //definindo a rota default como o '/home'
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  // {
  //   path: 'adminBetToken',
  //   component: BettokenHomeComponent,
  //   canActivate: [OwnerGuard],
  // },
  { path: '404', component: ErrorComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [
    // The RouterModule.forRoot() method returns a module that contains the configured
    // Router service provider, plus other providers that the routing library requires.
    RouterModule.forRoot(
      routes
      //{ enableTracing: true } // <-- debugging purposes only
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
