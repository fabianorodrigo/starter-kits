import { UmServicoQualquerService } from './services/um-servico-qualquer.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DependencyInjectionRoutingModule } from './dependency-injection-routing.module';
import { DIHomeComponent } from './pages/di-home/di-home.component';
import { MarkdownModule } from 'ngx-markdown';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { LoggerConsoleService } from './services/logger-console.service';
import { Logger } from './services/logger';
import { ProvidersDemoService } from './services/providers-demo.service';
import { DemoService } from './services/demo.service';
import { ShowDiDemoComponent } from './components/show-di-demo/show-di-demo.component';
import { DIUseClassComponent } from './pages/di-useClass/di-useClass.component';
import { DiUseExistingComponent } from './pages/di-use-existing/di-use-existing.component';
import { DIUseValueComponent } from './pages/diuse-value/diuse-value.component';

@NgModule({
  declarations: [
    DIHomeComponent,
    DIUseClassComponent,
    ShowDiDemoComponent,
    DiUseExistingComponent,
    DIUseValueComponent,
  ],
  imports: [
    CommonModule,
    MarkdownModule,
    MaterialModule,
    SharedModule,
    DependencyInjectionRoutingModule,
  ],
  //
  providers: [
    // essa é a sintaxe CLASS PROVIDER que é uma forma abreviada que usa o
    // tipo da classe como chave e o classe como valor de dependência
    UmServicoQualquerService,
    // essa é a forma expandida da configuração do provider.
    // Corresponde à forma resumida acima (de serviços diferentes, claro)
    { provide: Logger, useClass: LoggerConsoleService },
  ],
})
export class DependencyInjectionModule {}
