import { ErrorHandler, Injectable, isDevMode } from '@angular/core';

@Injectable()
export class OwlLogger {

  constructor(private errorHandler: ErrorHandler) {}

  log(value: any, ...rest: any[]) {
    if (isDevMode()) {
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
