import { Injectable } from '@angular/core';
import { IDemo } from './demo.interface';

@Injectable({
  providedIn: null,
})
export class DemoService2 {
  getUseExistingAliasingClassProviders(): IDemo {
    throw new Error('Method not implemented.');
  }
  getUseClassClassProviderWithDependencies(): IDemo {
    throw new Error('Method not implemented.');
  }
  getUseClassAlternativeClassProvider(): IDemo {
    throw new Error('Method not implemented.');
  }
  getExpandedConfiguration(): IDemo {
    throw new Error('Method not implemented.');
  }
  getClassProviderSyntax(): IDemo {
    throw new Error('Method not implemented.');
  }
  constructor() {}
}
