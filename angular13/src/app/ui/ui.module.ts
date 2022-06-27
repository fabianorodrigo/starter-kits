import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { ComponentsModule } from './components/components.module';
import { HomeComponent } from './pages/home/home.component';
import { UiRoutingModule } from './ui.routing.module';
import { ProductListComponent } from './pages/product/list/list.component';
import { FormComponent } from './pages/product/form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HomeComponent, ProductListComponent, FormComponent],
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
