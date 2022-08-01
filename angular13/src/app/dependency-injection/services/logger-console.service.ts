import { Injectable } from '@angular/core';
import { Logger } from './logger';

@Injectable({
  providedIn: null,
})
export class LoggerConsoleService implements Logger {
  constructor() {}

  log(message: string): void {
    console.log(message);
  }
}
