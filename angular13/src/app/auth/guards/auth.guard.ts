import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
  CanActivateChild,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  /**
   *
   * @param route  contains the future route that will be activated
   * @param state contains the future RouterState of the application
   * @returns
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): true | UrlTree {
    const url: string = state.url;

    return this.checkLogin(url);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): true | UrlTree {
    return this.canActivate(route, state);
  }

  checkLogin(url: string): true | UrlTree {
    if (this.authService.isLoggedIn) {
      return true;
    }
    // If the user is not logged in, you store the attempted URL the user
    // came from using the RouterStateSnapshot.url and tell the router to
    // redirect to a login page

    // Store the attempted URL for redirecting after user login successfully
    this.authService.redirectUrl = url;

    // Redirect to the login page. Returning a UrlTree tells the Router to cancel
    // the current navigation and schedule a new one to redirect the user.
    return this.router.parseUrl('/login');
  }
}
