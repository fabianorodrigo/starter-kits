import { ClockService } from './clock.service';
import { Logger } from './logger';
import { LoggerConsoleService } from './logger-console.service';
import { MinutesAnalysisService } from './minutes-analysis.service';

/*
 * Para criar um valor dependente baseado em informações indisponíveis antes do run time,
 * utilize um factory provider. No caso do serviço MinutesAnalysisService, queremos identificar
 * se o minuto atual é par. Isso só poderá ser validado em tempo de execução
 *
 * Para tal, criamos um FACTORY PROVIDER que passará essa informação para o serviço MinutesAnalysisService
 * em tempo de execução e também as sua outra dependência a ser injetada, o LoggerConsoleService.
 *
 * Perceba que para repassar o LoggerConsoleService, o FACTORY PROVIDER precisa recebê-la como parâmetro. Assim
 * como também precisará receber uma instância do serviço que ele mesmo consome, o ClockService
 *
 * @param logger Instância de LoggerConsoleService a ser injetada (só repassada para o construtor do
 *    serviço ProvidersDemoService)
 * @param clockService Instância de ClockService a ser injetada (usada para obter o minuto atual)
 */
const MinutesAnalysisServiceFactory = (
  logger: LoggerConsoleService,
  clockService: ClockService
) => new MinutesAnalysisService(logger, clockService.getMinute() % 2 == 0);

/**
 * O 'useFactory' especifica que é uma factory function cuja implementação é MinutesAnalysisServiceFactory
 * O 'deps' é um array de provider tokens. As classes Logger e ClockService servem como tokens
 *    para seus próprios class providers (no Module Logger, na verdade, é token para LoggerConsoleService).
 *    O injector os resolve e injeta os serviços correspondentes nos parâmetros da MinutesAnalysisServiceFactory
 *
 * Capturar o factory provider em uma const exportável (MinutesAnalysisServiceProvider) torna o factory provider reutilizável
 */
export const MinutesAnalysisServiceProvider = {
  provide: MinutesAnalysisService,
  useFactory: MinutesAnalysisServiceFactory,
  deps: [Logger, ClockService],
};
