import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from 'src/app/shared/components/error/error.component';
import { WalletComponent } from './components/wallet/wallet.component';
// Components
import { LinkComponent } from './pages/link/link.component';

export const routes: Routes = [
  { path: '', redirectTo: 'link', pathMatch: 'full' },
  { path: 'link', component: LinkComponent },
  { path: '404', component: WalletComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Web3JSRoutingModule {}
