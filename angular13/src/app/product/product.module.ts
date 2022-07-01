import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductFormComponent } from './pages/product/form/form.component';
import { ProductListComponent } from './pages/product/list/list.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductHomeComponent } from './pages/product-home/product-home.component';
import { ProductService } from './services/product.service';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductFormComponent,
    ProductHomeComponent,
  ],
  // https://angular.io/guide/providers#providedin-and-ngmodules
  providers: [ProductService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductRoutingModule,
    MaterialModule,
    SharedModule,
  ],
})
export class ProductModule {}
