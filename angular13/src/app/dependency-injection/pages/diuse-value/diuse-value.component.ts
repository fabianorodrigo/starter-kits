import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { IDemo } from '../../services/demo.interface';
import { DemoService } from '../../services/demo.service';
import { MY_INJECTION_TOKEN } from './injection-token';
import { ObjectToBeInjected } from './value-injected';

@Component({
  selector: 'dapp-diuse-value',
  templateUrl: './diuse-value.component.html',
  styleUrls: ['./diuse-value.component.css'],
  providers: [
    { provide: DemoService, useValue: ObjectToBeInjected },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MY_INJECTION_TOKEN, useValue: new Date().toISOString() },
  ],
})
export class DIUseValueComponent implements OnInit {
  demos: IDemo[] = [];

  /**
   * Nos metadados do decorador @Component acima, utiliza-se a injeção de um objeto com o useValue
   * Desta forma, será injetada aqui uma instância do objeto referenciado e não o DemoService:
   * [ ...
   *
   * @param demoService Instância de ProviderDemoService
   */
  constructor(
    private demoService: DemoService,
    @Inject(MAT_DATE_LOCALE) private locale: string,
    @Inject(MY_INJECTION_TOKEN) private valueInjected: string
  ) {}

  ngOnInit(): void {
    const local: IDemo[] = [];

    local.push(this.demoService.getUseValueObject());
    local.push(this.demoService.getUseValueConfigurationObject(this.locale));
    local.push(this.demoService.getUseValueInjectionToken(this.valueInjected));

    this.demos = [...local];
  }
}
