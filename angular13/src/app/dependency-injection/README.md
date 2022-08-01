Angular Dependency Injection
===

Demonstration of the Angular Dependency Injection concept.


# Components


## show-di-demo

It's a component that receives a data structure explaining a specific case and a demo code.


# Pages

## di-useClass

Page that shows definition providers case with the shorthand provider syntax and the expanded provider configuration using the provider-definition key `useClass`, including specification of alternative class providers and providers with dependencies.

## di-use-existing

Page that shows definition providers with the provider-definition key `useExisting` with an example of aliasing class providers.

## diuse-value

Page that shows definition providers with the provider-definition key `useValue`. Includes examples of object injection, configuration object injection, use of the object `InjectionToken`.

## diuse-factory

Page that shows definition providers with the provider-definition key `useFactory`, necessary when the injection demands info that is available only at run time. Includes a example where de service provider needs to be injected with the info if the current minute is even or not.

## dioptional-dependency

Page that shows a case to turn optional a dependency injected. The `@Optional` property decorator tells Angular to return null when it can't find the dependency.

## dicustom-inject

Page that shows supply a custom provider using the `@Inject` decorator. In the case, the `InjectionToken` was used to create a token to `localStorage` browser API and @Inject specify the custom provider of the dependency. Using a custom provider allows you to provide a concrete implementation for implicit dependencies, such as built-in browser APIs. dependency.

# Angular Concepts/Features

## Dependency Injection

Dependencies are services or objects that a class needs to perform its function. Dependency injection, or DI, is a design pattern in which a class requests dependencies from external sources rather than creating them. Angular's DI framework provides dependencies to a class upon instantiation.

In order to create an injectable service, use the decorator `@Injectable()`, it specifies that Angular can use this class in the DI system.

```javascript
@Injectable({
  providedIn: null,
})
export class ClockService {
```
*clock.service.ts*

To inject services and turn them visible to a component, just include a argument in the constructor with the dependency type.

```javascript
export class DIUseClassComponent implements OnInit {
  demos: IDemo[] = [];

  constructor(private demoService: DemoService) {}
```
*di-useClass.component.ts*

The injection of services in another service follows the same pattern.

```javascript
@Injectable({
  providedIn: null,
})
export class ProvidersDemoService {
  constructor(private logger: LoggerConsoleService) {}
  ```
*providers-demo.service.ts*


## Dependency Providers

By configuring providers, you can make services available to the parts of your application that need them. A dependency provider configures an injector with a DI token, which that injector uses to provide the runtime version of a dependency value.


### useClass: Specify an alternative class provider

Different classes can provide the same service. In the DIUseClassComponent, we specify that where a DemoService is required an instance of ProviderDemoService should be injected.

```javascript
{ provide: DemoService, useClass: ProvidersDemoService }
```

### useExisting: Aliasing class providers

To alias a class provider, specify the alias and the class provider in the providers array with the useExisting property. In the DiUseExistingComponent,  the injector injects the singleton instance of ProvidersDemoService when the component asks for either the ProvidersDemoService or the DemoService2. In this way, DemoService2 is an alias for ProvidersDemoService.

```javascript
 providers: [
    LoggerConsoleService, 
    ProvidersDemoService,
    { provide: DemoService2, useExisting: ProvidersDemoService },
  ],
```


### useValue: Injecting an object

To inject an object, configure the injector with the useValue option. The following provider object uses the useValue key to associate the variable with the DemoService token.

```javascript
 providers: [
    { provide: DemoService, useValue: ObjectToBeInjected },
     ...
```

### Using an InjectionToken object

Define and use an InjectionToken object for choosing a provider token for non-class dependencies. In the `injection-token.ts`, we define a token `MY_INJECTION_TOKEN` of type string.


```javascript
export const MY_INJECTION_TOKEN = new InjectionToken<string>('MY_INJECTION_TOKEN');
```

In the providers of the DIUseValueComponent, we associante the `MY_INJECTION_TOKEN` with the current date in a ISO format. And in it's contructor we used the parameter decorator `@Inject` to inject the value stablished in the `providers` section.

```javascript
 providers: [
  ...
  { provide: MY_INJECTION_TOKEN, useValue: new Date().toISOString() }, 
  ...
 ]

 ...

 constructor(..., @Inject(MY_INJECTION_TOKEN) private valueInjected: string) {}
```

### useFactory: Using factory providers

To create a changeable, dependent value based on information unavailable before run time, use a factory provider. In the MinutesAnalysisService, we want to show if the current minute is EVEN or ODD, an information that only be obtained during run time. In order to do it, we had to create the factory provider MinutesAnalysisServiceFactory, responsible to create an instance in runtime injecting the `isEven` boolean argument.

```javascript
const MinutesAnalysisServiceFactory = (
  logger: LoggerConsoleService,
  clockService: ClockService
) => new MinutesAnalysisService(logger, clockService.getMinute() % 2 == 0);
```

After that, we define the MinutesAnalysisServiceProvider specifying MinuteAnalysisService as token, the  MinutesAnalysisServiceFactory as useFactory and in `deps` atribute the list of dependencies.

```javascript
export const MinutesAnalysisServiceProvider = {
  provide: MinutesAnalysisService,
  useFactory: MinutesAnalysisServiceFactory,
  deps: [Logger, ClockService],
};
```

Finally, in the DIUseFactoryComponent, we registered MinutesAnalysisServiceProvider in providers list:

```javascript
@Component({
  selector: 'dapp-diuse-factory',
  templateUrl: './diuse-factory.component.html',
  styleUrls: ['./diuse-factory.component.css'],
  providers: [MinutesAnalysisServiceProvider],
})
export class DIUseFactoryComponent implements OnInit {
```

### Make a dependency @Optional 

Dependencies can be registered at any level in the component hierarchy. When a component requests a dependency, Angular starts with that component's injector and walks up the injector tree until it finds the first suitable provider. Angular throws an error if it can't find the dependency during that walk. The @Optional property decorator tells Angular to return null when it can't find the dependency.

We did this in the DIOptionalDependencyComponent, annotating the  `demoService2` argument with `@Optional`. Since the DemoService2 was not registered to be provided anywehere, it will be injected as `null`. Without the `@Optional` decorator, an exception R3InjectorError(DependencyInjectionModule)[DemoService2 -> ...
would be is thrown
 
```javascript
constructor(@Optional() private demoService2: DemoService2) {}
```

### Supply a custom provider with @Inject

Using a custom provider allows you to provide a concrete implementation for implicit dependencies, such as built-in browser APIs. The following example uses an InjectionToken to provide the localStorage browser API as a dependency in the BrowserStorageService.
 
```javascript
export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage
});

@Injectable({
  providedIn: 'root'
})
export class BrowserStorageService {
  constructor(@Inject(BROWSER_STORAGE) public storage: Storage) {}
   ...
```

# Sources

https://angular.io/guide/dependency-injection-providers
https://angular.io/guide/dependency-injection-in-action 
