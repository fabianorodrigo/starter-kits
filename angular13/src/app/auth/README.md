Auth
===

Module that implements features about user authentication/authorization, routes protection and correlated.

# Components




# Pages

## login

A stub page to simulate an user authentication action. It consumes the `AuthService` to identify if the user is authenticated. If authenticated, the logout button is shown and its click calls AuthService.logout. Otherwise, the login button is shown and its click calls AuhService.login.

# Services

## AuthService

A stub service to emulate a user authentication. The method login returns a Observable that set its property `isLoggedIn` to `true` and returns `true` after one second. The method logout sets its property `isLoggedIn` to `false`.

# Guards

## AuthGuard

An route guard that implements the `CanActivate` and `CanActivateChild` interfaces and it consumes the `AuthService` in order to check if the user is already authenticated. If authenticated, returns `true` and the navigation continues. Otherwise, it will return an `UrlTree` pointing to `/login`.


# Angular Concepts/Features

## Route Guards

This module provides a Route Guard `AuthGuard` in order to only logged users can access the routes that use it as `canActivate` or `canActivateChild`. The `canActivate` route mediates the navigation to that route. The class passed implements a interface also called `CanActivate` where a method `canActivate` returns `true` when the navigation process is authorized to proceed, `false` when the process stops and a `UrlTree` when the currente navigation is canceled and a new navigation is initiated to the URL returned.

```javascript
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

```

