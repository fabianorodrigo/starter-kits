Product REST
===

User interface module to consume REST API for querying and maintenance of a database of products.



# Components



# Pages

## product/list

Offers a search products feature by requesting a REST API.


# Angular Concepts/Features

## Parameterized Routing

It is used route with the required parameter of the product's ID to be shown in the `ProductFormComponent`:
```javascript
{ path: ':id', component: ProductFormComponent },
```
*product-routing.module.ts*

By default, the router re-uses a component instance when it re-navigates to the same component type without visiting a different component first. The route parameters could change each time. That implies that the route parameter map can change during the lifetime of this component and the `ngOnInit()` won't be reexecuted (it happens only once at instatiation). Due to that, the route parameter map is retrieved from an Observable in order to detect parameter changes.  

Additionally, the `switchMap` operator cancels previous pending requests. If the user re-navigates to this route with a new id while the ProductService is still retrieving the old id, switchMap discards that old request and returns the product with the id from the new request.

```javascript
this.product$ = this._route.paramMap.pipe(
switchMap((params: ParamMap) => {
    return this._productService.findProduct(params.get('id'));
  })
);
```
*form.component.ts*

It is also used a optional parameter `filter` on the "back" button of `ProductFormComponent` that navigates the user to the root route of the module. The parameter is not defined in the route, but we pass it and the `ProductListComponent` checks for its existence to make the decision to set the 'filter' field automatically with the value received.

```javascript
backToSearch(event: MouseEvent): void {
 this._router.navigate(['./', { filter: this.filter }]);
}
```
*form.component.ts*

But this time, since we are certain that this information does not come from the `ProductListComponent` itself and the ngOnInit will be executed, we use the no-observable alternative to get the value:

```javascript
if (this._route.snapshot.paramMap.get('filter') !== null) {
  this.form.controls['filter'].setValue(
    this._route.snapshot.paramMap.get('filter')
  );
}
```
*list.component.ts*


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
