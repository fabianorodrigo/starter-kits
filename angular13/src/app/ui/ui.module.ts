import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from './components/components.module';
import { HomeComponent } from './pages/home/home.component';
import { ProtectedSecretsComponent } from './pages/protected-secrets/protected-secrets.component';
import { UiRoutingModule } from './ui.routing.module';

@NgModule({
  declarations: [HomeComponent, ProtectedSecretsComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    UiRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  //snackbar global default options
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 5500 } },
  ],
  exports: [ComponentsModule],
})
export class UiModule {}
