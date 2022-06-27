import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortScaleNumberComponent } from './components/short-scale-number/short-scale-number.component';
import { ErrorComponent } from './components/error/error.component';
import { MaterialModule } from '../material/material.module';
import { NumbersService } from './services/numbers.service';
import { MenuComponent } from './components/menu/menu.component';
import { RouterModule } from '@angular/router';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [
    ShortScaleNumberComponent,
    ErrorComponent,
    MenuComponent,
    TableComponent,
  ],
  imports: [CommonModule, RouterModule, MaterialModule],
  // https://angular.io/guide/providers#providedin-and-ngmodules
  providers: [NumbersService],
  exports: [
    ShortScaleNumberComponent,
    ErrorComponent,
    MenuComponent,
    TableComponent,
  ],
})
export class SharedModule {}
