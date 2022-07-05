import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { ProductHomeComponent } from './pages/product-home/product-home.component';
import { ProductFormComponent } from './pages/product/form/form.component';
import { ProductListComponent } from './pages/product/list/list.component';
import { ProductRoutingModule } from './product-routing.module';
import { ProductService } from './services/product.service';
import { ProductShowComponent } from './pages/product/show-from-resolver/show.component';
import { ProductResolver } from './services/product.resolver';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductFormComponent,
    ProductHomeComponent,
    ProductShowComponent,
  ],
  // https://angular.io/guide/providers#providedin-and-ngmodules
  providers: [ProductService, ProductResolver],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductRoutingModule,
    MaterialModule,
    SharedModule,
  ],
})
export class ProductModule {}
