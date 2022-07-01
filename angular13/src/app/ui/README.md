UI Module
===

Core UI interface module 

# Components

## confirm-dialog

A generic confirmation dialog to be used throughout appplication

## header

The header of application

## layout

Stablish the main layout of application compound.


# Pages

## home

Shows a menu to README.md files in the Application.

## protected-secrets

A simple component used just show apply Route Guards concept.


# Angular Concepts/Features

## Route Guards

This module makes use of Route Guards in order to only logged users can access the route `/protected-secrets`. The `canActivate` route mediates the navigation to that route. The class passed implements a interface also called `CanActivate` where a method `canActivate` returns `true` when the navigation process is authorized to proceed, `false` when the process stops and a `UrlTree` when the currente navigation is canceled and a new navigation is initiated to the URL returned.

```javascript
const routes: Routes = [
  {
    path: 'protected-secrets',
    component: ProtectedSecretsComponent,
    canActivate: [AuthGuard],
  },
```

To check the details about the implementation of `AuthGuard` class, check the [AuthModule](/home/home_auth).
