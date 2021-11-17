import { ErrorHandler, Injectable, isDevMode } from '@angular/core';
export class OwlLogger {
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
}
OwlLogger.decorators = [
    { type: Injectable }
];
OwlLogger.ctorParameters = () => [
    { type: ErrorHandler }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vbGlicy9uZ3gtb3dsLWNhcm91c2VsLW8vc3JjLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2xvZ2dlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUdwRSxNQUFNLE9BQU8sU0FBUztJQUVwQixZQUFvQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztJQUFHLENBQUM7SUFFbEQsR0FBRyxDQUFDLEtBQVUsRUFBRSxHQUFHLElBQVc7UUFDNUIsSUFBSSxTQUFTLEVBQUUsRUFBRTtZQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7U0FDN0I7SUFDSCxDQUFDO0lBRUQsS0FBSyxDQUFDLEtBQVk7UUFDaEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELElBQUksQ0FBQyxLQUFVLEVBQUUsR0FBRyxJQUFXO1FBQzdCLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDL0IsQ0FBQzs7O1lBakJGLFVBQVU7OztZQUZGLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFcnJvckhhbmRsZXIsIEluamVjdGFibGUsIGlzRGV2TW9kZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgT3dsTG9nZ2VyIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVycm9ySGFuZGxlcjogRXJyb3JIYW5kbGVyKSB7fVxuXG4gIGxvZyh2YWx1ZTogYW55LCAuLi5yZXN0OiBhbnlbXSkge1xuICAgIGlmIChpc0Rldk1vZGUoKSkge1xuICAgICAgY29uc29sZS5sb2codmFsdWUsIC4uLnJlc3QpO1xuICAgIH1cbiAgfVxuXG4gIGVycm9yKGVycm9yOiBFcnJvcikge1xuICAgIHRoaXMuZXJyb3JIYW5kbGVyLmhhbmRsZUVycm9yKGVycm9yKTtcbiAgfVxuXG4gIHdhcm4odmFsdWU6IGFueSwgLi4ucmVzdDogYW55W10pIHtcbiAgICBjb25zb2xlLndhcm4odmFsdWUsIC4uLnJlc3QpO1xuICB9XG59XG4iXX0=