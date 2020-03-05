import { __decorate } from "tslib";
import { ErrorHandler, Injectable, isDevMode } from '@angular/core';
let OwlLogger = class OwlLogger {
    constructor(errorHandler) {
        this.errorHandler = errorHandler;
    }
    log(value, ...rest) {
        if (isDevMode()) {
            console.log(value, ...rest);
        }
    }
    error(error) {
        this.errorHandler.handleError(error);
    }
    warn(value, ...rest) {
        console.warn(value, ...rest);
    }
};
OwlLogger.ctorParameters = () => [
    { type: ErrorHandler }
];
OwlLogger = __decorate([
    Injectable()
], OwlLogger);
export { OwlLogger };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvbG9nZ2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUdwRSxJQUFhLFNBQVMsR0FBdEIsTUFBYSxTQUFTO0lBRXBCLFlBQW9CLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO0lBQUcsQ0FBQztJQUVsRCxHQUFHLENBQUMsS0FBVSxFQUFFLEdBQUcsSUFBVztRQUM1QixJQUFJLFNBQVMsRUFBRSxFQUFFO1lBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztTQUM3QjtJQUNILENBQUM7SUFFRCxLQUFLLENBQUMsS0FBWTtRQUNoQixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsSUFBSSxDQUFDLEtBQVUsRUFBRSxHQUFHLElBQVc7UUFDN0IsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUMvQixDQUFDO0NBQ0YsQ0FBQTs7WUFmbUMsWUFBWTs7QUFGbkMsU0FBUztJQURyQixVQUFVLEVBQUU7R0FDQSxTQUFTLENBaUJyQjtTQWpCWSxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXJyb3JIYW5kbGVyLCBJbmplY3RhYmxlLCBpc0Rldk1vZGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE93bExvZ2dlciB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZXJyb3JIYW5kbGVyOiBFcnJvckhhbmRsZXIpIHt9XHJcblxyXG4gIGxvZyh2YWx1ZTogYW55LCAuLi5yZXN0OiBhbnlbXSkge1xyXG4gICAgaWYgKGlzRGV2TW9kZSgpKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHZhbHVlLCAuLi5yZXN0KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGVycm9yKGVycm9yOiBFcnJvcikge1xyXG4gICAgdGhpcy5lcnJvckhhbmRsZXIuaGFuZGxlRXJyb3IoZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgd2Fybih2YWx1ZTogYW55LCAuLi5yZXN0OiBhbnlbXSkge1xyXG4gICAgY29uc29sZS53YXJuKHZhbHVlLCAuLi5yZXN0KTtcclxuICB9XHJcbn1cclxuIl19
