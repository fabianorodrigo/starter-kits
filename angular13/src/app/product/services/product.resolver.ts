import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { EMPTY, mergeMap, Observable, of } from 'rxjs';
import { Product } from '../model';
import { ProductService } from './product.service';

/**
 * In summary, we use a Resolver is used when you want to delay rendering the routed component
 * until all necessary data has been fetched. In this way, you can handle errors better and also
 * avoid to show a empty component while the data is being fetched.
 */
@Injectable({
  providedIn: null,
})
export class ProductResolver implements Resolve<Product> {
  constructor(
    private _productService: ProductService,
    private _router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Product> | Observable<never> {
    const id = route.paramMap.get('id')!;
    console.log(`ProductResolver`, id);
    return this._productService.findProduct(id).pipe(
      mergeMap((product: Product) => {
        if (product) {
          return of(product);
        } else {
          // id not found
          this._router.navigate(['/products']);
          return EMPTY;
        }
      })
    );
  }
}
