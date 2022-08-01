import { Component, OnInit } from '@angular/core';
import { IDemo } from '../../services/demo.interface';
import { MinutesAnalysisService } from '../../services/minutes-analysis.service';
import { MinutesAnalysisServiceProvider } from './../../services/minutes-analysis.service.provider';

@Component({
  selector: 'dapp-diuse-factory',
  templateUrl: './diuse-factory.component.html',
  styleUrls: ['./diuse-factory.component.css'],
  providers: [MinutesAnalysisServiceProvider],
})
export class DIUseFactoryComponent implements OnInit {
  demos: IDemo[] = [];

  /**
   * Nos metadados do decorador @Component acima, utiliza-se um FACTORY PROVIDER.
   * Desta forma, será injetada aqui uma instância de MinutesAnalysisService retornada
   * por essa factory, que precisará recuperar informações em tempo de execução, se o
   * minuto corrente é PAR ou ÍMPAR, para repassar para injetar no MinutesAnalysisService.
   *
   * @param minuteAnalysisService Instância de MinutesAnalysisService
   */
  constructor(private minuteAnalysisService: MinutesAnalysisService) {}

  ngOnInit(): void {
    const local: IDemo[] = [];

    local.push(this.minuteAnalysisService.getUseFactoryProvider());

    this.demos = [...local];
  }
}
