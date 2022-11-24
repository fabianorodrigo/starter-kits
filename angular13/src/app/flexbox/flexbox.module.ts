import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexboxHomeComponent } from './pages/flexbox-home/flexbox-home.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [FlexboxHomeComponent],
  imports: [CommonModule, RouterModule, SharedModule],
})
export class FlexboxModule {}
