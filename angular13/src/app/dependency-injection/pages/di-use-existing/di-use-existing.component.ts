import { Component, OnInit } from '@angular/core';
import { IDemo } from '../../services/demo.interface';
import { DemoService2 } from '../../services/demo2.service';
import { LoggerConsoleService } from '../../services/logger-console.service';
import { ProvidersDemoService } from '../../services/providers-demo.service';

@Component({
  selector: 'dapp-di-use-existing',
  templateUrl: './di-use-existing.component.html',
  styleUrls: ['./di-use-existing.component.css'],
  // the injector injects the singleton instance of ProvidersDemoService when the component asks for either
  // ProvidersDemoService or DemoService2. In this way, DemoService2 is an alias for ProvidersDemoService.
  providers: [
    LoggerConsoleService, // como LoggerConsoleService não foi injetado no 'root', precisa adicionar essa dependência
    ProvidersDemoService,
    { provide: DemoService2, useExisting: ProvidersDemoService },
  ],
})
export class DiUseExistingComponent implements OnInit {
  demos: IDemo[] = [];

  /**
   * Nos metadados do decorador @Component acima, utiliza-se um alias 'DemoService2' para
   * o ProviderDemoService já instanciado antes.
   * Desta forma, será injetada aqui uma instância de ProviderDemoService e não o DemoService2:
   * [ ... ProvidersDemoService, { provide: DemoService2, useExisting: ProvidersDemoService }]
   *
   * @param demoService Instância de ProviderDemoService
   */
  constructor(private demoService2: DemoService2) {}

  ngOnInit(): void {
    const local: IDemo[] = [];

    local.push(this.demoService2.getUseExistingAliasingClassProviders());

    this.demos = [...local];
  }
}
