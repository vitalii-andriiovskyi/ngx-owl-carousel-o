import { ErrorHandler, Injectable, InjectionToken, Inject } from '@angular/core';

export const CURRENT_ENVIRONMENT = new InjectionToken<any>('Current Environment');

@Injectable()
export class Logger {

  constructor(private errorHandler: ErrorHandler, @Inject(CURRENT_ENVIRONMENT) public environment: any) {}

  log(value: any, ...rest: any[]) {
    if (!this.environment.production) {
      console.log(value, ...rest);
    }
  }

  error(error: Error) {
    this.errorHandler.handleError(error);
  }

  warn(value: any, ...rest: any[]) {
    console.warn(value, ...rest);
  }
}
