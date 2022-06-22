import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly baseURL: string = `${environment.api}/product`;

  constructor(private http: HttpClient) {}

  /**
   * Request products to the API
   *
   * @param filter filter sent in the request
   * @returns Observable of Product array
   */
  getProducts(filter?: string): Observable<Product[]> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    const params = filter
      ? new HttpParams().append('filter', filter)
      : undefined;
    //debugger;
    return this.http.get<Product[]>(this.baseURL, { params });
  }
}
