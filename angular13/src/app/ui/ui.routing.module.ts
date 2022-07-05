import { ProtectedSecretsComponent } from './pages/protected-secrets/protected-secrets.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { MarkdownComponent } from '../shared/pages/markdown/markdown.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CanDeactivateGuard } from '../shared/guards/can-deactivate.guard';

const routes: Routes = [
  {
    path: 'protected-secrets',
    component: ProtectedSecretsComponent,
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'home_shared',
        component: MarkdownComponent,
        data: { url: 'app/shared/README.md' },
      },
      {
        path: 'home_auth',
        component: MarkdownComponent,
        data: { url: 'app/auth/README.md' },
      },
      {
        path: 'home_ui',
        component: MarkdownComponent,
        data: { url: 'app/ui/README.md' },
      },
      {
        path: 'home_product',
        component: MarkdownComponent,
        data: { url: 'app/product/README.md' },
      },
      {
        path: 'home_flexbox',
        component: MarkdownComponent,
        data: { url: 'app/flexbox/README.md' },
      },
      {
        path: 'home_web3js',
        component: MarkdownComponent,
        data: { url: 'app/web3-ui/web3js/README.md' },
      },
    ],
  },
];

@NgModule({
  //Only call RouterModule.forRoot() in the root AppRoutingModule.
  // In any other module, you must call the RouterModule.forChild() method to register additional routes.
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UiRoutingModule {}
