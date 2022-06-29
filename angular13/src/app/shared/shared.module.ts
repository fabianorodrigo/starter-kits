import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule, SecurityContext } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { MaterialModule } from '../material/material.module';
import { ErrorComponent } from './components/error/error.component';
import { MenuComponent } from './components/menu/menu.component';
import { ShortScaleNumberComponent } from './components/short-scale-number/short-scale-number.component';
import { TableComponent } from './components/table/table.component';
import { DisableControlDirective } from './directives/disable.directive';
import { MarkdownComponent } from './pages/markdown/markdown.component';
import { NumbersService } from './services/numbers.service';

@NgModule({
  declarations: [
    ShortScaleNumberComponent,
    ErrorComponent,
    MenuComponent,
    TableComponent,
    DisableControlDirective,
    MarkdownComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    MarkdownModule.forRoot({
      loader: HttpClient,
      sanitize: SecurityContext.NONE,
    }),
  ],
  // https://angular.io/guide/providers#providedin-and-ngmodules
  providers: [NumbersService],
  exports: [
    ShortScaleNumberComponent,
    ErrorComponent,
    MenuComponent,
    TableComponent,
    DisableControlDirective,
  ],
})
export class SharedModule {}
