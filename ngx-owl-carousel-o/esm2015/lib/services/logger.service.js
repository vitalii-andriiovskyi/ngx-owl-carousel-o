/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { ErrorHandler, Injectable, isDevMode } from '@angular/core';
export class OwlLogger {
    /**
     * @param {?} errorHandler
     */
    constructor(errorHandler) {
        this.errorHandler = errorHandler;
    }
    /**
     * @param {?} value
     * @param {...?} rest
     * @return {?}
     */
    log(value, ...rest) {
        if (isDevMode()) {
            console.log(value, ...rest);
        }
    }
    /**
     * @param {?} error
     * @return {?}
     */
    error(error) {
        this.errorHandler.handleError(error);
    }
    /**
     * @param {?} value
     * @param {...?} rest
     * @return {?}
     */
    warn(value, ...rest) {
        console.warn(value, ...rest);
    }
}
OwlLogger.decorators = [
    { type: Injectable }
];
/** @nocollapse */
OwlLogger.ctorParameters = () => [
    { type: ErrorHandler }
];
if (false) {
    /** @type {?} */
    OwlLogger.prototype.errorHandler;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvbG9nZ2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUdwRSxNQUFNLE9BQU8sU0FBUzs7OztJQUVwQixZQUFvQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztJQUFHLENBQUM7Ozs7OztJQUVsRCxHQUFHLENBQUMsS0FBVSxFQUFFLEdBQUcsSUFBVztRQUM1QixJQUFJLFNBQVMsRUFBRSxFQUFFO1lBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztTQUM3QjtJQUNILENBQUM7Ozs7O0lBRUQsS0FBSyxDQUFDLEtBQVk7UUFDaEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7Ozs7O0lBRUQsSUFBSSxDQUFDLEtBQVUsRUFBRSxHQUFHLElBQVc7UUFDN0IsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUMvQixDQUFDOzs7WUFqQkYsVUFBVTs7OztZQUZGLFlBQVk7Ozs7SUFLUCxpQ0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFcnJvckhhbmRsZXIsIEluamVjdGFibGUsIGlzRGV2TW9kZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgT3dsTG9nZ2VyIHtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlcnJvckhhbmRsZXI6IEVycm9ySGFuZGxlcikge31cclxuXHJcbiAgbG9nKHZhbHVlOiBhbnksIC4uLnJlc3Q6IGFueVtdKSB7XHJcbiAgICBpZiAoaXNEZXZNb2RlKCkpIHtcclxuICAgICAgY29uc29sZS5sb2codmFsdWUsIC4uLnJlc3QpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZXJyb3IoZXJyb3I6IEVycm9yKSB7XHJcbiAgICB0aGlzLmVycm9ySGFuZGxlci5oYW5kbGVFcnJvcihlcnJvcik7XHJcbiAgfVxyXG5cclxuICB3YXJuKHZhbHVlOiBhbnksIC4uLnJlc3Q6IGFueVtdKSB7XHJcbiAgICBjb25zb2xlLndhcm4odmFsdWUsIC4uLnJlc3QpO1xyXG4gIH1cclxufVxyXG4iXX0=