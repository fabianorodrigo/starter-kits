import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'web3js',
    loadChildren: () =>
      import('./web3-ui/web3js/web3js.module').then((m) => m.Web3jsModule),
  },
  {
    path: 'rest',
    loadChildren: () => import('./ui/ui.module').then((m) => m.UiModule),
  },
  //definindo a rota default como o '/web3js'
  {
    path: '',
    redirectTo: '/web3js',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    // The RouterModule.forRoot() method returns a module that contains the configured
    // Router service provider, plus other providers that the routing library requires.
    RouterModule.forRoot(
      routes,
      { enableTracing: true } // <-- debugging purposes only
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
