import { DemoJustifyContentComponent } from './components/demo-property-flex-directions/demo-property-flex-directions.component';
import { JustifyContentComponent } from './pages/justify-content/justify-content.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexboxHomeComponent } from './pages/flexbox-home/flexbox-home.component';
import { RouterModule } from '@angular/router';
import { FlexboxRoutingModule } from './flexbox.routing.module';
import { DemoContainerComponent } from './components/demo-container/demo-container.component';
import { MaterialModule } from '../material/material.module';
import { MarkdownModule } from 'ngx-markdown';
import { FormsModule } from '@angular/forms';
import { ItemStyleDialogComponent } from './components/item-style-dialog/item-style-dialog.component';

@NgModule({
  declarations: [
    FlexboxHomeComponent,
    DemoContainerComponent,
    DemoJustifyContentComponent,
    JustifyContentComponent,
    ItemStyleDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MarkdownModule,
    MaterialModule,
    SharedModule,
    FlexboxRoutingModule,
  ],
})
export class FlexboxModule {}
