import { Component, OnInit, Optional } from '@angular/core';
import { IDemo } from '../../services/demo.interface';
import { DemoService2 } from '../../services/demo2.service';

@Component({
  selector: 'dapp-dioptional-dependency',
  templateUrl: './dioptional-dependency.component.html',
  styleUrls: ['./dioptional-dependency.component.css'],
})
export class DIOptionalDependencyComponent implements OnInit {
  demos: IDemo[] = [];

  /**
   *
   * @param demoService2 Set as optional. If the @optional is removed, an exception R3InjectorError(DependencyInjectionModule)[DemoService2 -> ...
   * is thrown because the DemoService2 was not registered to be provided anywehere
   */
  constructor(@Optional() private demoService2: DemoService2) {}

  ngOnInit(): void {
    if (this.demoService2) {
      console.log('demoService2 is available');
    } else {
      console.log('demoService2 is NOT available');
      this.demos.push({
        title: 'Make a dependency @Optional',
        text: `Dependencies can be registered at any level in the component hierarchy. When a component requests a dependency, Angular starts with that component's injector and walks up the injector tree until it finds the first suitable provider. Angular throws an error if it can't find the dependency during that walk.
        The @Optional property decorator tells Angular to return null when it can't find the dependency. In case of this DIOptionalDependencyComponent, it was defined that the DemoService2 as optional.
        To confirm the expected behavior, in the browser console must have a log: 'demoService2 is NOT available'
        `,
        code: [
          {
            code: 'constructor(@Optional() private demoService2: DemoService2) {}',
          },
        ],
      });
    }
  }
}
