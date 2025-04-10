import { __decorate, __read, __spread } from "tslib";
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
            console.log.apply(console, __spread([value], rest));
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
        console.warn.apply(console, __spread([value], rest));
    };
    OwlLogger.ctorParameters = function () { return [
        { type: ErrorHandler }
    ]; };
    OwlLogger = __decorate([
        Injectable()
    ], OwlLogger);
    return OwlLogger;
}());
export { OwlLogger };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvbG9nZ2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUdwRTtJQUVFLG1CQUFvQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztJQUFHLENBQUM7SUFFbEQsdUJBQUcsR0FBSCxVQUFJLEtBQVU7UUFBRSxjQUFjO2FBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQsSUFBYztZQUFkLDZCQUFjOztRQUM1QixJQUFJLFNBQVMsRUFBRSxFQUFFO1lBQ2YsT0FBTyxDQUFDLEdBQUcsT0FBWCxPQUFPLFlBQUssS0FBSyxHQUFLLElBQUksR0FBRTtTQUM3QjtJQUNILENBQUM7SUFFRCx5QkFBSyxHQUFMLFVBQU0sS0FBWTtRQUNoQixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsd0JBQUksR0FBSixVQUFLLEtBQVU7UUFBRSxjQUFjO2FBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQsSUFBYztZQUFkLDZCQUFjOztRQUM3QixPQUFPLENBQUMsSUFBSSxPQUFaLE9BQU8sWUFBTSxLQUFLLEdBQUssSUFBSSxHQUFFO0lBQy9CLENBQUM7O2dCQWRpQyxZQUFZOztJQUZuQyxTQUFTO1FBRHJCLFVBQVUsRUFBRTtPQUNBLFNBQVMsQ0FpQnJCO0lBQUQsZ0JBQUM7Q0FBQSxBQWpCRCxJQWlCQztTQWpCWSxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXJyb3JIYW5kbGVyLCBJbmplY3RhYmxlLCBpc0Rldk1vZGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE93bExvZ2dlciB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlcnJvckhhbmRsZXI6IEVycm9ySGFuZGxlcikge31cblxuICBsb2codmFsdWU6IGFueSwgLi4ucmVzdDogYW55W10pIHtcbiAgICBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICAgIGNvbnNvbGUubG9nKHZhbHVlLCAuLi5yZXN0KTtcbiAgICB9XG4gIH1cblxuICBlcnJvcihlcnJvcjogRXJyb3IpIHtcbiAgICB0aGlzLmVycm9ySGFuZGxlci5oYW5kbGVFcnJvcihlcnJvcik7XG4gIH1cblxuICB3YXJuKHZhbHVlOiBhbnksIC4uLnJlc3Q6IGFueVtdKSB7XG4gICAgY29uc29sZS53YXJuKHZhbHVlLCAuLi5yZXN0KTtcbiAgfVxufVxuIl19