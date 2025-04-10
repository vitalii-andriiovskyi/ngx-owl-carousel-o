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
    OwlLogger.ctorParameters = function () { return [
        { type: ErrorHandler }
    ]; };
    OwlLogger = tslib_1.__decorate([
        Injectable()
    ], OwlLogger);
    return OwlLogger;
}());
export { OwlLogger };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvbG9nZ2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUdwRTtJQUVFLG1CQUFvQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztJQUFHLENBQUM7SUFFbEQsdUJBQUcsR0FBSCxVQUFJLEtBQVU7UUFBRSxjQUFjO2FBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQsSUFBYztZQUFkLDZCQUFjOztRQUM1QixJQUFJLFNBQVMsRUFBRSxFQUFFO1lBQ2YsT0FBTyxDQUFDLEdBQUcsT0FBWCxPQUFPLG9CQUFLLEtBQUssR0FBSyxJQUFJLEdBQUU7U0FDN0I7SUFDSCxDQUFDO0lBRUQseUJBQUssR0FBTCxVQUFNLEtBQVk7UUFDaEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELHdCQUFJLEdBQUosVUFBSyxLQUFVO1FBQUUsY0FBYzthQUFkLFVBQWMsRUFBZCxxQkFBYyxFQUFkLElBQWM7WUFBZCw2QkFBYzs7UUFDN0IsT0FBTyxDQUFDLElBQUksT0FBWixPQUFPLG9CQUFNLEtBQUssR0FBSyxJQUFJLEdBQUU7SUFDL0IsQ0FBQzs7Z0JBZGlDLFlBQVk7O0lBRm5DLFNBQVM7UUFEckIsVUFBVSxFQUFFO09BQ0EsU0FBUyxDQWlCckI7SUFBRCxnQkFBQztDQUFBLEFBakJELElBaUJDO1NBakJZLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFcnJvckhhbmRsZXIsIEluamVjdGFibGUsIGlzRGV2TW9kZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgT3dsTG9nZ2VyIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVycm9ySGFuZGxlcjogRXJyb3JIYW5kbGVyKSB7fVxuXG4gIGxvZyh2YWx1ZTogYW55LCAuLi5yZXN0OiBhbnlbXSkge1xuICAgIGlmIChpc0Rldk1vZGUoKSkge1xuICAgICAgY29uc29sZS5sb2codmFsdWUsIC4uLnJlc3QpO1xuICAgIH1cbiAgfVxuXG4gIGVycm9yKGVycm9yOiBFcnJvcikge1xuICAgIHRoaXMuZXJyb3JIYW5kbGVyLmhhbmRsZUVycm9yKGVycm9yKTtcbiAgfVxuXG4gIHdhcm4odmFsdWU6IGFueSwgLi4ucmVzdDogYW55W10pIHtcbiAgICBjb25zb2xlLndhcm4odmFsdWUsIC4uLnJlc3QpO1xuICB9XG59XG4iXX0=