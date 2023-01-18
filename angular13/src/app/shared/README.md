SharedModule
===

User interface module of general purpose. The objective is to serve as library for other Angular Modules.

# Components

Provide a set of components Angular

## error

To be used as route when some error happen. For instance, a 404.

## menu

Provides a menu based on an array of `IMenuItem` passed by `@Input()`.

## short-scale-number

Provides a component to show large number in a short scale. For instance, in spite of render "10.000.000.000.000", shows "1 trillion".


## table

Provides a simple table based on Material Angular `mat-table`. The datasource is passed by `@Input()`.

# Directives

## DisableControlDirective

Allows the control of disable/enable for `<input>` elements.

# Pages

## base-form

Provides a abstract class `BaseForm` with basic features to Components that implements a Form. Such as: identify if a specific field has erros and provide the error message.

## markdown

Generic component to render markdown files. It expects the path to the markdown file to be rendered in the `url` attribute inside the router.data:
```javascript
 this._route.data.subscribe((data) => {
      this.markdownFile = data['url'];
    });
```

An example of route configuration:
```javascript
const routes: Routes = [
  {
    path: '',
    component: Web3jsHomeComponent,
    children: [
      {
        path: '',
        component: MarkdownComponent,
        data: { url: 'app/web3-ui/web3js/README.md' },
      },
      ...
    ],
  },
];
```
*web3js.routing.module.ts*

In order to work, the path `app/web3-ui/web3js/README.md` was inserted in the assets array inside the `angular.json`.

# Services

## LoggingService

Provides a `debug` and `trace` function to log info in the console. Only logs if the respective variable is `true` in the `environment.ts`.

## MessageService

Shows a message based on Angular Material `MatSnackBarRef`.

## NumberService

Offers a set of methods to format/convert numbers:


- `convertTimeJSToChain(timeInMillisJS: number)`: receives the time in milliseconds since since 1/1/1970 UTC and returns the time in seconds since 1/1/1970 UTC.
- `convertTimeChainToJS(timeInSeconds: number)`: receives the time in seconds since since 1/1/1970 UTC and returns the time in milliseconds since 1/1/1970 UTC
- `convertNumberToString(value: number)`: convert a number to locale string.
- `formatBN(bn: BN, decimals: number)`: formats a BigNumber considering the number of decimals.
- `formatBNShortScale(bn: BN, decimals: number)`: formats a BigNumber to a short scale format considering the number of decimals.

# Guards

## CanDeactivate

An route guard that implements the `CanDeactivate` interfaces offering a reusable canDeactivate guard in order to check if the user can leave the current route accordingly to the method `canDeactivate` implemented in the component received as argument.


# Angular Concepts/Features


## Dependency Injection

The services part of the module are no injected in the root module and consequently they're only available if and when the consumers import the SharedModule. For this, these services have their [provider scope](https://angular.io/guide/providers#provider-scope) limited by being declared with the `providedIn` as the `SharedModule`:

```javascript
@Injectable({
  providedIn: SharedModule,
})
export class MessageService {
  ...
```
*message.service.ts*


## Route Guards

This module provides a Route Guard `CanDeactivate` in order to decide if the user can leave the current route or not accordingly to the method `canDeactivate` implemented in the component received as argument.

```javascript
// The guard not knowing the details of any component's deactivation method makes the guard reusable.
@Injectable({
  providedIn: SharedModule,
})
export class CanDeactivateGuard
  implements CanDeactivate<ICanComponentDeactivate>
{
  canDeactivate(
    component: ICanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
```

