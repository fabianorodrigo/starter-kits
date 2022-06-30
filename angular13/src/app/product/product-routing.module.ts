import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarkdownComponent } from '../shared/pages/markdown/markdown.component';
import { ProductHomeComponent } from './pages/product-home/product-home.component';
import { ProductListComponent } from './pages/product/list/list.component';

export const routes: Routes = [
  {
    // Use empty path routes to group routes together without adding any
    // additional path segments to the URL. Users will still visit /flexbox
    // and the ProductHomeComponent still serves as the Routing Component
    // containing child routes.
    path: '',
    component: ProductHomeComponent,
    children: [
      {
        path: '',
        component: MarkdownComponent,
        data: { url: 'app/product/README.md' },
      },
      { path: 'search', component: ProductListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
