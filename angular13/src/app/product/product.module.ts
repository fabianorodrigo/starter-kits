import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { FormComponent } from './pages/product/form/form.component';
import { ProductListComponent } from './pages/product/list/list.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductHomeComponent } from './pages/product-home/product-home.component';

@NgModule({
  declarations: [ProductListComponent, FormComponent, ProductHomeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductRoutingModule,
    MaterialModule,
    SharedModule,
  ],
})
export class ProductModule {}
