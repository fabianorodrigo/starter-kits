import { Injectable } from '@angular/core';
import { IDemo } from './demo.interface';
import { LoggerConsoleService } from './logger-console.service';

/**
 * Como esse serviço depende de um valor em tempo de execução, precisamos criar um FACTORY PROVIDER para ela,
 * no minutes-analysis.service.provider.ts, e remover daqui o decorador @Injectable
 */
export class MinutesAnalysisService {
  /**
   *
   * @param logger
   * @param isEvenMinute Para criar um valor dependente baseado em informações indisponíveis antes do run time,
   * utilize um factory provider. Neste caso, queremos identificar se o minuto atual é par. Isso só poderá ser
   * validado em tempo de execução
   */
  constructor(
    private logger: LoggerConsoleService,
    private isEvenMinute: boolean
  ) {}

  getUseFactoryProvider(): IDemo {
    return {
      title: 'useFactory: Using factory providers',
      text: `To create a changeable, dependent value based on information unavailable before run time, use a factory provider. In the exampĺe,
      the MinutesAnalysisService needs to know if the current minute is even or odd, this is possible to know only in run time and changes
      regularly. The current minute is: ${this.getValue()}`,
      code: [
        {
          code: `const MinutesAnalysisServiceFactory = (
        logger: LoggerConsoleService,
        clockService: ClockService
      ) => new MinutesAnalysisService(logger, clockService.getMinute() % 2 == 0);

      export const MinutesAnalysisServiceProvider = {
        provide: MinutesAnalysisService,
        useFactory: MinutesAnalysisServiceFactory,
        deps: [Logger, ClockService],
      }`,
          filename: 'minutes-analysis.service.provider.ts',
        },
        {
          code: ` providers: [MinutesAnalysisServiceProvider],`,
          filename: `pages/diuse-factory.component.ts`,
        },
      ],
    };
  }

  private getValue(): string {
    if (this.isEvenMinute) {
      return 'EVEN';
    } else {
      return 'ODD';
    }
  }
}
