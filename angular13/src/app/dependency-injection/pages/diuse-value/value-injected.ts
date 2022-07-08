export const ObjectToBeInjected = {
  getUseValueObject: () => {
    return {
      title: 'useValue: Injecting an object',
      text: `To inject an object, configure the injector with the useValue option. `,
      code: [
        {
          code: `[{ provide: DemoService, useValue: ObjectToBeInjected }]`,
        },
      ],
    };
  },
  getUseValueConfigurationObject: (locale: string) => {
    return {
      title: 'useValue: Injecting a configuration object',
      text: `A common use case for object literals is a configuration object. The locale injected this way in DIUseValueComponent was: ${locale}`,
      code: [
        {
          code: `providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }]
  ...
     constructor(@Inject(MAT_DATE_LOCALE) private locale: string) { }
  ...`,
        },
      ],
    };
  },
  getUseValueInjectionToken: (valueInjected: string) => {
    return {
      title: 'useValue: Using object Injectiontoken',
      text: `Define and use an InjectionToken object for choosing a provider token for non-class dependencies. The value injected this way in DIUseValueComponent was: ${valueInjected}`,
      code: [
        {
          code: `export const MY_INJECTION_TOKEN = new InjectionToken<string>('MY_INJECTION_TOKEN');`,
          filename: 'injection-token.ts',
        },

        {
          code: ` ...
  providers: [{ provide: MY_INJECTION_TOKEN, useValue: new Date().toISOString() }]
  ...
  constructor(...,  @Inject(MY_INJECTION_TOKEN) private valueInjected: string) {}
  ...`,
          filename: 'diuse-value.component.ts',
        },
      ],
    };
  },
};
