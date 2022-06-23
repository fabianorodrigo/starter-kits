import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { LinkComponent } from './pages/link/link.component';

export const routes: Routes = [{ path: 'link', component: LinkComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Web3JSRoutingModule {}
