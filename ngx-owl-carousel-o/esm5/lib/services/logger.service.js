import * as tslib_1 from "tslib";
import { ErrorHandler, Injectable, isDevMode } from '@angular/core';
var OwlLogger = /** @class */ (function () {
    function OwlLogger(errorHandler) {
        this.errorHandler = errorHandler;
    }
    OwlLogger.prototype.log = function (value) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        if (isDevMode()) {
            console.log.apply(console, tslib_1.__spread([value], rest));
        }
    };
    OwlLogger.prototype.error = function (error) {
        this.errorHandler.handleError(error);
    };
    OwlLogger.prototype.warn = function (value) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        console.warn.apply(console, tslib_1.__spread([value], rest));
    };
    OwlLogger = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [ErrorHandler])
    ], OwlLogger);
    return OwlLogger;
}());
export { OwlLogger };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvbG9nZ2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUdwRTtJQUVFLG1CQUFvQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztJQUFHLENBQUM7SUFFbEQsdUJBQUcsR0FBSCxVQUFJLEtBQVU7UUFBRSxjQUFjO2FBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQsSUFBYztZQUFkLDZCQUFjOztRQUM1QixJQUFJLFNBQVMsRUFBRSxFQUFFO1lBQ2YsT0FBTyxDQUFDLEdBQUcsT0FBWCxPQUFPLG9CQUFLLEtBQUssR0FBSyxJQUFJLEdBQUU7U0FDN0I7SUFDSCxDQUFDO0lBRUQseUJBQUssR0FBTCxVQUFNLEtBQVk7UUFDaEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELHdCQUFJLEdBQUosVUFBSyxLQUFVO1FBQUUsY0FBYzthQUFkLFVBQWMsRUFBZCxxQkFBYyxFQUFkLElBQWM7WUFBZCw2QkFBYzs7UUFDN0IsT0FBTyxDQUFDLElBQUksT0FBWixPQUFPLG9CQUFNLEtBQUssR0FBSyxJQUFJLEdBQUU7SUFDL0IsQ0FBQztJQWhCVSxTQUFTO1FBRHJCLFVBQVUsRUFBRTtpREFHdUIsWUFBWTtPQUZuQyxTQUFTLENBaUJyQjtJQUFELGdCQUFDO0NBQUEsQUFqQkQsSUFpQkM7U0FqQlksU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVycm9ySGFuZGxlciwgSW5qZWN0YWJsZSwgaXNEZXZNb2RlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBPd2xMb2dnZXIge1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVycm9ySGFuZGxlcjogRXJyb3JIYW5kbGVyKSB7fVxyXG5cclxuICBsb2codmFsdWU6IGFueSwgLi4ucmVzdDogYW55W10pIHtcclxuICAgIGlmIChpc0Rldk1vZGUoKSkge1xyXG4gICAgICBjb25zb2xlLmxvZyh2YWx1ZSwgLi4ucmVzdCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBlcnJvcihlcnJvcjogRXJyb3IpIHtcclxuICAgIHRoaXMuZXJyb3JIYW5kbGVyLmhhbmRsZUVycm9yKGVycm9yKTtcclxuICB9XHJcblxyXG4gIHdhcm4odmFsdWU6IGFueSwgLi4ucmVzdDogYW55W10pIHtcclxuICAgIGNvbnNvbGUud2Fybih2YWx1ZSwgLi4ucmVzdCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==