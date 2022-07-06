import { Injectable } from '@angular/core';
import { IDemo } from './demo.interface';
import { LoggerConsoleService } from './logger-console.service';

@Injectable({
  providedIn: null,
})
export class ProvidersDemoService {
  constructor(private logger: LoggerConsoleService) {}

  getClassProviderSyntax(): IDemo {
    return {
      title: 'Class Provider Syntax',
      text: 'The class provider syntax is a shorthand expression that expands into a provider configuration.',
      code: 'providers: [Logger]',
    };
  }

  getExpandedConfiguration(): IDemo {
    return {
      title: 'Full provider configuration',
      text: `Angular expands the providers value into a full provider object. The provide property holds the token that serves as the key.
      The second property is a provider definition object, which tells the injector how to create the dependency value.
      The provider-definition key ca be useClass, useExisting, useValue or useFactory.`,
      code: 'providers: [{ provide: Logger, useClass: Logger }]',
    };
  }

  getUseClassAlternativeClassProvider(): IDemo {
    return {
      title: 'useClass: Specifying an alternative class provider',
      text: `Different classes can provide the same service. In this example, the injector will return a ProvidersDemoService instance
      when the component asks for a demo service using the 'Demo' token`,
      code: 'providers: [{ provide: DemoService, useClass: ProvidersDemoService }]',
    };
  }

  getUseClassClassProviderWithDependencies(): IDemo {
    this.logger.log('getUseClassClassProviderWithDependencies');
    return {
      title: 'useClass: Configuring class providers with dependencies',
      text: `If the alternative class providers have their own dependencies, specify both providers in the providers metadata property of the parent module or component.
      Otherwise, a exception will be thrown: NullInjectorError: No provider for LoggerConsoleService!`,
      code: 'providers: [ LoggerConsoleService, { provide: DemoService, useClass: ProvidersDemoService }]',
    };
  }

  getUseExistingAliasingClassProviders(): IDemo {
    return {
      title: 'useExisting: Aliasing class providers',
      text: `To alias a class provider, specify the alias and the class provider in the providers array with the useExisting property.
      In the example, the injector injects the single instance of ProvidersDemoService when the component asks for a DemoService2 or a ProviderDemoService.
      In this way, 'DemoService2' is just an alias for 'ProviderDemoService'.`,
      code: `providers: [ ProvidersDemoService,
            { provide: DemoService2, useExisting: ProvidersDemoService }]`,
    };
  }

  getUseValueObject(): IDemo {
    return {
      title: 'useValue: WONT BE USED THIS',
      text: `WONT BE USED THIS`,
      code: `WONT BE USED THIS`,
    };
  }

  getUseValueConfigurationObject(locale: string): IDemo {
    return {
      title: 'useValue: WONT BE USED THIS',
      text: `WONT BE USED THIS`,
      code: `WONT BE USED THIS`,
    };
  }
}
