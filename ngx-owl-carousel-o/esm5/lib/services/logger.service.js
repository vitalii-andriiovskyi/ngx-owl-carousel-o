/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ErrorHandler, Injectable, isDevMode } from '@angular/core';
var OwlLogger = /** @class */ (function () {
    function OwlLogger(errorHandler) {
        this.errorHandler = errorHandler;
    }
    /**
     * @param {?} value
     * @param {...?} rest
     * @return {?}
     */
    OwlLogger.prototype.log = /**
     * @param {?} value
     * @param {...?} rest
     * @return {?}
     */
    function (value) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        if (isDevMode()) {
            console.log.apply(console, tslib_1.__spread([value], rest));
        }
    };
    /**
     * @param {?} error
     * @return {?}
     */
    OwlLogger.prototype.error = /**
     * @param {?} error
     * @return {?}
     */
    function (error) {
        this.errorHandler.handleError(error);
    };
    /**
     * @param {?} value
     * @param {...?} rest
     * @return {?}
     */
    OwlLogger.prototype.warn = /**
     * @param {?} value
     * @param {...?} rest
     * @return {?}
     */
    function (value) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        console.warn.apply(console, tslib_1.__spread([value], rest));
    };
    OwlLogger.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    OwlLogger.ctorParameters = function () { return [
        { type: ErrorHandler }
    ]; };
    return OwlLogger;
}());
export { OwlLogger };
if (false) {
    /** @type {?} */
    OwlLogger.prototype.errorHandler;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvbG9nZ2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7O0lBS2xFLG1CQUFvQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztLQUFJOzs7Ozs7SUFFbEQsdUJBQUc7Ozs7O0lBQUgsVUFBSSxLQUFVO1FBQUUsY0FBYzthQUFkLFVBQWMsRUFBZCxxQkFBYyxFQUFkLElBQWM7WUFBZCw2QkFBYzs7UUFDNUIsRUFBRSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLE9BQU8sQ0FBQyxHQUFHLE9BQVgsT0FBTyxvQkFBSyxLQUFLLEdBQUssSUFBSSxHQUFFO1NBQzdCO0tBQ0Y7Ozs7O0lBRUQseUJBQUs7Ozs7SUFBTCxVQUFNLEtBQVk7UUFDaEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDdEM7Ozs7OztJQUVELHdCQUFJOzs7OztJQUFKLFVBQUssS0FBVTtRQUFFLGNBQWM7YUFBZCxVQUFjLEVBQWQscUJBQWMsRUFBZCxJQUFjO1lBQWQsNkJBQWM7O1FBQzdCLE9BQU8sQ0FBQyxJQUFJLE9BQVosT0FBTyxvQkFBTSxLQUFLLEdBQUssSUFBSSxHQUFFO0tBQzlCOztnQkFqQkYsVUFBVTs7OztnQkFGRixZQUFZOztvQkFBckI7O1NBR2EsU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVycm9ySGFuZGxlciwgSW5qZWN0YWJsZSwgaXNEZXZNb2RlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBPd2xMb2dnZXIge1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVycm9ySGFuZGxlcjogRXJyb3JIYW5kbGVyKSB7fVxyXG5cclxuICBsb2codmFsdWU6IGFueSwgLi4ucmVzdDogYW55W10pIHtcclxuICAgIGlmIChpc0Rldk1vZGUoKSkge1xyXG4gICAgICBjb25zb2xlLmxvZyh2YWx1ZSwgLi4ucmVzdCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBlcnJvcihlcnJvcjogRXJyb3IpIHtcclxuICAgIHRoaXMuZXJyb3JIYW5kbGVyLmhhbmRsZUVycm9yKGVycm9yKTtcclxuICB9XHJcblxyXG4gIHdhcm4odmFsdWU6IGFueSwgLi4ucmVzdDogYW55W10pIHtcclxuICAgIGNvbnNvbGUud2Fybih2YWx1ZSwgLi4ucmVzdCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==