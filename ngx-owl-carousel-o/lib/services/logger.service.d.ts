import { ErrorHandler } from '@angular/core';
import * as i0 from "@angular/core";
export declare class OwlLogger {
    private errorHandler;
    constructor(errorHandler: ErrorHandler);
    log(value: any, ...rest: any[]): void;
    error(error: Error): void;
    warn(value: any, ...rest: any[]): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<OwlLogger, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OwlLogger>;
}
