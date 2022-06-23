import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortScaleNumberComponent } from './components/short-scale-number/short-scale-number.component';
import { ErrorComponent } from './components/error/error.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [ShortScaleNumberComponent, ErrorComponent],
  imports: [CommonModule, MaterialModule],
  exports: [ShortScaleNumberComponent, ErrorComponent],
})
export class SharedModule {}
