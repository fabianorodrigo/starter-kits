import { Component, Inject, InjectionToken, OnInit } from '@angular/core';
import { IDemo } from '../../services/demo.interface';

export const BROWSER_STORAGE = new InjectionToken('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage,
});

@Component({
  selector: 'dapp-dicustom-inject',
  templateUrl: './dicustom-inject.component.html',
  styleUrls: ['./dicustom-inject.component.css'],
})
export class DICustomInjectComponent implements OnInit {
  demos: IDemo[] = [];

  /**
   *
   * @param storage Using a custom provider allows you to provide a concrete implementation for implicit dependencies,
   * such as built-in browser APIs
   */
  constructor(@Inject(BROWSER_STORAGE) public storage: Storage) {}

  ngOnInit(): void {
    this.storage.setItem(
      `starter-kit-demo.angular13`,
      new Date().toISOString()
    );
    this.demos.push({
      title: 'Supply a custom provider @Inject',
      text: `Using a custom provider allows you to provide a concrete implementation for implicit dependencies, such as built-in browser APIs.
         In case of this DICustomInjectComponent, it was used a InjectionToken to provide the localStorage browser API as a dependency in the component.
         To confirm the expected behavior, in the browser Application/Storage/Local Storage must have a key 'starter-kit-demo.angular13' with current date time in ISO format
         `,
      code: [
        {
          code: `export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
            providedIn: 'root',
            factory: () => localStorage
          });`,
        },
        {
          code: `export class DICustomInjectComponent implements OnInit {

            constructor(@Inject(BROWSER_STORAGE) private storage: Storage) {}`,
        },
      ],
    });
  }
}
