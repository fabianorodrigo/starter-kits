import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarkdownComponent } from '../shared/pages/markdown/markdown.component';
import { ProductHomeComponent } from './pages/product-home/product-home.component';
import { ProductFormComponent } from './pages/product/form/form.component';
import { ProductListComponent } from './pages/product/list/list.component';
import { ProductShowComponent } from './pages/product/show-from-resolver/show.component';
import { ProductResolver } from './services/product.resolver';

const routes: Routes = [
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
        component: ProductListComponent,
        //descomentar para habilitar transição
        data: { animation: 'list' }, // https://angular.io/guide/router-tutorial-toh#adding-routable-animations
      },
      {
        path: 'readme',
        component: MarkdownComponent,
        data: { url: 'app/product/README.md' },
      },
      {
        path: 'fromResolver/:id',
        component: ProductShowComponent,
        /**
         * In summary, we use a Resolver is used when you want to delay rendering the routed component
         * until all necessary data has been fetched. In this way, you can handle errors better and also
         * avoid to show a empty component while the data is being fetched.
         *
         * No ProductShowComponent, subscreve-se o método `data` do ActivatedRoute
         * this._route.data.subscribe((data) => { this.product = data['product'];});
         */
        resolve: {
          product: ProductResolver,
        },
      },
      // a rota do ID tem que vir depois do readme, senão o 'readme' já
      // dá match pois é interpretado como um ID
      {
        path: ':id',
        component: ProductFormComponent,
        //descomentar para habilitar transição
        data: { animation: 'form' }, // https://angular.io/guide/router-tutorial-toh#adding-routable-animations
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
