import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SharedModule } from '../shared.module';

@Injectable({
  providedIn: SharedModule,
})
export class LoggingService {
  constructor() {}

  debug(source: string, ...data: any) {
    if (environment.debugging) {
      console.log(source, data);
    }
  }
  trace(source: string, ...data: any) {
    if (environment.tracing) {
      console.log(source, data);
    }
  }
}
