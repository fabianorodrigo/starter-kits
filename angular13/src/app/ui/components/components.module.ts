import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { UiRoutingModule } from '../ui.routes';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ErrorComponent } from './error/error.component';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { MenuComponent } from './menu/menu.component';
import { ShortScaleNumberComponent } from './short-scale-number/short-scale-number.component';
import { WalletComponent } from './wallet/wallet.component';
import { TableComponent } from './table/table.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ErrorComponent,
    WalletComponent,
    MenuComponent,
    LayoutComponent,
    ConfirmDialogComponent,
    ShortScaleNumberComponent,
    TableComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    UiRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [
    HeaderComponent,
    WalletComponent,
    MenuComponent,
    LayoutComponent,
    ConfirmDialogComponent,
    ShortScaleNumberComponent,
    TableComponent,
  ],
})
export class ComponentsModule {}
