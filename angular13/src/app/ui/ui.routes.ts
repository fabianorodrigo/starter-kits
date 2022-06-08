import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  // {
  //   path: 'adminBetToken',
  //   component: BettokenHomeComponent,
  //   canActivate: [OwnerGuard],
  // },
  { path: '404', component: ErrorComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UiRoutingModule {}
