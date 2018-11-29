/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvbG9nZ2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUdwRSxNQUFNOzs7O0lBRUosWUFBb0IsWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7S0FBSTs7Ozs7O0lBRWxELEdBQUcsQ0FBQyxLQUFVLEVBQUUsR0FBRyxJQUFXO1FBQzVCLEVBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO1NBQzdCO0tBQ0Y7Ozs7O0lBRUQsS0FBSyxDQUFDLEtBQVk7UUFDaEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDdEM7Ozs7OztJQUVELElBQUksQ0FBQyxLQUFVLEVBQUUsR0FBRyxJQUFXO1FBQzdCLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7S0FDOUI7OztZQWpCRixVQUFVOzs7O1lBRkYsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVycm9ySGFuZGxlciwgSW5qZWN0YWJsZSwgaXNEZXZNb2RlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBPd2xMb2dnZXIge1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVycm9ySGFuZGxlcjogRXJyb3JIYW5kbGVyKSB7fVxyXG5cclxuICBsb2codmFsdWU6IGFueSwgLi4ucmVzdDogYW55W10pIHtcclxuICAgIGlmIChpc0Rldk1vZGUoKSkge1xyXG4gICAgICBjb25zb2xlLmxvZyh2YWx1ZSwgLi4ucmVzdCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBlcnJvcihlcnJvcjogRXJyb3IpIHtcclxuICAgIHRoaXMuZXJyb3JIYW5kbGVyLmhhbmRsZUVycm9yKGVycm9yKTtcclxuICB9XHJcblxyXG4gIHdhcm4odmFsdWU6IGFueSwgLi4ucmVzdDogYW55W10pIHtcclxuICAgIGNvbnNvbGUud2Fybih2YWx1ZSwgLi4ucmVzdCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==