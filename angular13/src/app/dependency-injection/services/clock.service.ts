import { Injectable } from '@angular/core';
import { DependencyInjectionModule } from '../dependency-injection.module';

@Injectable({
  providedIn: null,
})
export class ClockService {
  constructor() {}

  /**
   *
   * @returns {number} current minute in the clock
   */
  getMinute(): number {
    return new Date().getMinutes();
  }
}
