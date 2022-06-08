import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './../material.module';
import { ComponentsModule } from './components/components.module';
import { HomeComponent } from './pages/home/home.component';
import { UiRoutingModule } from './ui.routes';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    UiRoutingModule,
    ComponentsModule,
  ],
  //snackbar global default options
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 3500 } },
  ],
  exports: [ComponentsModule],
})
export class UiModule {}
