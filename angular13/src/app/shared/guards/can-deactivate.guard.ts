import { ProtectedSecretsComponent } from '../../ui/pages/protected-secrets/protected-secrets.component';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ICanComponentDeactivate } from './can-deactivate.interface';
import { SharedModule } from '../shared.module';

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
