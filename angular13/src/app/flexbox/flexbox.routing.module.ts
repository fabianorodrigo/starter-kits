import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { FlexboxHomeComponent } from './pages/flexbox-home/flexbox-home.component';
import { JustifyContentComponent } from './pages/justify-content/justify-content.component';

export const routes: Routes = [
  {
    // Use empty path routes to group routes together without adding any
    // additional path segments to the URL. Users will still visit /web3js
    // and the Web3JSHomeComponent still serves as the Routing Component
    // containing child routes.
    path: '',
    component: FlexboxHomeComponent,
    children: [{ path: 'justify', component: JustifyContentComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Web3JSRoutingModule {}
