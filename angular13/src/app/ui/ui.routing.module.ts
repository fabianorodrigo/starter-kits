import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { ErrorComponent } from '../shared/components/error/error.component';
import { MarkdownComponent } from '../shared/pages/markdown/markdown.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductListComponent } from './pages/product/list/list.component';

export const routes: Routes = [
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
        path: 'home_ui',
        component: MarkdownComponent,
        data: { url: 'app/ui/README.md' },
      },
      {
        path: 'home_web3js',
        component: MarkdownComponent,
        data: { url: 'app/web3-ui/web3js/README.md' },
      },
    ],
  },
  { path: 'product', component: ProductListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UiRoutingModule {}
