import { Component, OnInit } from '@angular/core';
import { IDemo } from '../../services/demo.interface';
import { DemoService } from '../../services/demo.service';
import { LoggerConsoleService } from '../../services/logger-console.service';
import { ProvidersDemoService } from '../../services/providers-demo.service';

@Component({
  selector: 'dapp-di-home',
  templateUrl: './di-useClass.component.html',
  styleUrls: ['./di-useClass.component.css'],
  providers: [
    // Se for utilizado um class provider alternativo, como será feito logo abaixo
    // em relação ao token 'DemoService', deve-se injetar também as dependências da
    // classe alternativa, como é o caso do LoggerConsoleService. Comentando a linha
    // abaixo, acontecerá a exceção: NullInjectorError: No provider for LoggerConsoleService!
    LoggerConsoleService, // se injetar no 'root' não vai precisar
    // Class provider alternativo: Ao ser injetada no componente o token 'DemoService',
    // o injetor proverá uma instância de ProviderDemoService
    { provide: DemoService, useClass: ProvidersDemoService },
  ],
})
export class DIUseClassComponent implements OnInit {
  demos: IDemo[] = [];

  /**
   * Nos metadados do decorador @Component acima, utiliza-se um Class provider alternativo.
   * Desta forma, será injetada aqui uma instância de ProviderDemoService e não o DemoService:
   * { provide: DemoService, useClass: ProvidersDemoService }
   *
   * @param demoService Instância de ProviderDemoService
   */
  constructor(private demoService: DemoService) {}

  ngOnInit(): void {
    const local: IDemo[] = [];

    local.push(this.demoService.getClassProviderSyntax());
    local.push(this.demoService.getExpandedConfiguration());
    local.push(this.demoService.getUseClassAlternativeClassProvider());
    local.push(this.demoService.getUseClassClassProviderWithDependencies());

    this.demos = [...local];
  }
}
