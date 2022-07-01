import { catchError, Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model';
import { ProductModule } from '../product.module';

// Está com o providedIn igual null devido a uma dependência circular que se formaria
// ao referenciar o ProductModule e, indiretamente, o ProductModule referenciaria essa
// classe do serviço também via ProductRouting -> ProductListComponent -> ProductService
// https://angular.io/guide/providers#providedin-and-ngmodules
@Injectable({ providedIn: null })
export class ProductService {
  private readonly baseURL: string = `${environment.api}/product`;
  private readonly options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  findProduct(id: string | null): Observable<Product> {
    if (Number.isInteger(id)) {
      throw new Error(`Invalid product id: ${id}`);
    }
    return this.http.get<Product>(`${this.baseURL}/${id}`).pipe(
      catchError((err) => {
        console.log('Service failed', err);
        return throwError(() => new Error(err.message));
      })
    );
  }
  /**
   * Request products to the API
   *
   * @param filter filter sent in the request
   * @returns Observable of Product array
   */
  searchProducts(filter?: string): Observable<Product[]> {
    const params = filter
      ? new HttpParams().append('filter', filter)
      : undefined;
    //debugger;
    return this.http.get<Product[]>(this.baseURL, { params }).pipe(
      catchError((err) => {
        console.log('Service failed', err);
        return throwError(() => new Error(err.message));
      })
    );
  }
}
