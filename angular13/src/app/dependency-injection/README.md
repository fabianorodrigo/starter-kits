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



# Sources

https://angular.io/guide/dependency-injection-providers
