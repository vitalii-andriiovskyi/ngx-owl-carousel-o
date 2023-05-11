import { Injectable, isDevMode } from '@angular/core';
import * as i0 from "@angular/core";
class OwlLogger {
    errorHandler;
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: OwlLogger, deps: [{ token: i0.ErrorHandler }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: OwlLogger });
}
export { OwlLogger };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: OwlLogger, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i0.ErrorHandler }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWJzL25neC1vd2wtY2Fyb3VzZWwtby9zcmMvbGliL3NlcnZpY2VzL2xvZ2dlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBZ0IsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFFcEUsTUFDYSxTQUFTO0lBRUE7SUFBcEIsWUFBb0IsWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7SUFBRyxDQUFDO0lBRWxELEdBQUcsQ0FBQyxLQUFVLEVBQUUsR0FBRyxJQUFXO1FBQzVCLElBQUksU0FBUyxFQUFFLEVBQUU7WUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO1NBQzdCO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxLQUFZO1FBQ2hCLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxJQUFJLENBQUMsS0FBVSxFQUFFLEdBQUcsSUFBVztRQUM3QixPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7dUdBaEJVLFNBQVM7MkdBQVQsU0FBUzs7U0FBVCxTQUFTOzJGQUFULFNBQVM7a0JBRHJCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFcnJvckhhbmRsZXIsIEluamVjdGFibGUsIGlzRGV2TW9kZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgT3dsTG9nZ2VyIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVycm9ySGFuZGxlcjogRXJyb3JIYW5kbGVyKSB7fVxuXG4gIGxvZyh2YWx1ZTogYW55LCAuLi5yZXN0OiBhbnlbXSkge1xuICAgIGlmIChpc0Rldk1vZGUoKSkge1xuICAgICAgY29uc29sZS5sb2codmFsdWUsIC4uLnJlc3QpO1xuICAgIH1cbiAgfVxuXG4gIGVycm9yKGVycm9yOiBFcnJvcikge1xuICAgIHRoaXMuZXJyb3JIYW5kbGVyLmhhbmRsZUVycm9yKGVycm9yKTtcbiAgfVxuXG4gIHdhcm4odmFsdWU6IGFueSwgLi4ucmVzdDogYW55W10pIHtcbiAgICBjb25zb2xlLndhcm4odmFsdWUsIC4uLnJlc3QpO1xuICB9XG59XG4iXX0=