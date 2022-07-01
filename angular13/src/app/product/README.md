Product REST
===

User interface module to consume REST API for querying and maintenance of a database of products.



# Components



# Pages

## product/list

Offers a search products feature by requesting a REST API.


# Angular Concepts/Features

## Lazy Loading Route

This module has a [Lazy Loading route configuration](https://angular.io/guide/router-tutorial-toh#lazy-loading-route-configuration). This means that the module will only be loaded when the route that points to it is requested. In order to do so, the route has a `loadChildren` property that takes a function that returns a promise using the browser's built-in syntax for lazy loading code using dynamic imports. After the code is requested and loaded, the Promise resolves an object that contains the NgModule, in this case the `ProductModule`. Finally, the root AppModule must neither load nor reference the ProductModule or its files.

```javascript
const routes: Routes = [
  {
    path: 'product',
    loadChildren: () =>
      import('./product/product.module').then((m) => m.ProductModule),
  },
  ...

```
*app-routing.module.ts*


## Dependency Injection

The services part of the module are no injected in the root module and consequently they're only available if and when the consumers import the ProductModule. For this, these services have their [provider scope](https://angular.io/guide/providers#provider-scope) limited. The recommended way for doing this is by declaring the `providedIn` attribute in the `@Injectable` decorator as the module that contains the service. However, in this case this would cause a circular dependency as pointed by the tool [`dpdm`](https://github.com/acrazing/dpdm#readme): `product.module.ts -> product-routing.module.ts -> pages/product/list/list.component.ts -> services/product.service.ts -> product.module.ts`. The workaround is to declare the `providedIn` as null and the service as provider in the module:

```javascript
@Injectable({
  providedIn: null,
})
export class ProductService {
  ...
```
*product.service.ts*

```javascript
@NgModule({
  declarations: [
    ...
  ],
  imports: [
    ...
  ],
  providers: [ProductService],
})
export class ProductModule {}
  ...
```
*product.module.ts*
