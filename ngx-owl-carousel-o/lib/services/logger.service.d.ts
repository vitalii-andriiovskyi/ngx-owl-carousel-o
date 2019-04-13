import { ErrorHandler } from '@angular/core';
export declare class OwlLogger {
    private errorHandler;
    constructor(errorHandler: ErrorHandler);
    log(value: any, ...rest: any[]): void;
    error(error: Error): void;
    warn(value: any, ...rest: any[]): void;
}
