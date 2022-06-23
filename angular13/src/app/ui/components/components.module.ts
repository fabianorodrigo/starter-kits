import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { UiRoutingModule } from '../ui.routes';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { MenuComponent } from './menu/menu.component';
import { WalletComponent } from '../../web3-ui/web3js/components/wallet/wallet.component';
import { TableComponent } from './table/table.component';

@NgModule({
  declarations: [
    HeaderComponent,
    WalletComponent,
    MenuComponent,
    LayoutComponent,
    ConfirmDialogComponent,
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
    TableComponent,
  ],
})
export class ComponentsModule {}
