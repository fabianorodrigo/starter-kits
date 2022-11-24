import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, throwError } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private _router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // if (this.tokenService.hasToken()) {
    //   const token = this.tokenService.getToken();
    //   req = req.clone({
    //     setHeaders: {
    //       'x-access-token': token,
    //     },
    //   });
    // }
    return next.handle(req).pipe(
      catchError((err) => {
        let handled: boolean = false;
        if (err instanceof HttpErrorResponse) {
          if (err.error instanceof ErrorEvent) {
            console.error('HTTP Error Event');
          } else {
            console.log(`HTTP error status : ${err.status} ${err.statusText}`);
            switch (err.status) {
              case 401: //login
                this._router.navigateByUrl('/login');
                handled = true;
                break;
              case 403: //forbidden
                this._router.navigateByUrl('/unauthorized');
                handled = true;
                break;
            }
          }
        } else {
          console.error('some thing else happened');
        }
        //Se o erro foi tratado ou não
        if (handled) {
          return of(err);
        } else {
          return throwError(
            () => new Error(`HTTP request failed: ${err.message}`)
          );
        }
      })
    );
  }
}
