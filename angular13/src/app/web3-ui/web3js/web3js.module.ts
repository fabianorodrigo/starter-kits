import { MaterialModule } from '../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkComponent } from './pages/link/link.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { Web3JSRoutingModule } from './web3js.routing.module';

@NgModule({
  declarations: [LinkComponent],
  imports: [CommonModule, MaterialModule, SharedModule, Web3JSRoutingModule],
})
export class Web3jsModule {}
