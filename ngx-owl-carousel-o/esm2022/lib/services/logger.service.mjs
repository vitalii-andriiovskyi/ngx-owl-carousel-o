import { Injectable, isDevMode } from '@angular/core';
import * as i0 from "@angular/core";
export class OwlLogger {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.2", ngImport: i0, type: OwlLogger, deps: [{ token: i0.ErrorHandler }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.0.2", ngImport: i0, type: OwlLogger });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.2", ngImport: i0, type: OwlLogger, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i0.ErrorHandler }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWJzL25neC1vd2wtY2Fyb3VzZWwtby9zcmMvbGliL3NlcnZpY2VzL2xvZ2dlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBZ0IsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFHcEUsTUFBTSxPQUFPLFNBQVM7SUFFQTtJQUFwQixZQUFvQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztJQUFHLENBQUM7SUFFbEQsR0FBRyxDQUFDLEtBQVUsRUFBRSxHQUFHLElBQVc7UUFDNUIsSUFBSSxTQUFTLEVBQUUsRUFBRTtZQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7U0FDN0I7SUFDSCxDQUFDO0lBRUQsS0FBSyxDQUFDLEtBQVk7UUFDaEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELElBQUksQ0FBQyxLQUFVLEVBQUUsR0FBRyxJQUFXO1FBQzdCLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDL0IsQ0FBQzt1R0FoQlUsU0FBUzsyR0FBVCxTQUFTOzsyRkFBVCxTQUFTO2tCQURyQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXJyb3JIYW5kbGVyLCBJbmplY3RhYmxlLCBpc0Rldk1vZGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE93bExvZ2dlciB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlcnJvckhhbmRsZXI6IEVycm9ySGFuZGxlcikge31cblxuICBsb2codmFsdWU6IGFueSwgLi4ucmVzdDogYW55W10pIHtcbiAgICBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICAgIGNvbnNvbGUubG9nKHZhbHVlLCAuLi5yZXN0KTtcbiAgICB9XG4gIH1cblxuICBlcnJvcihlcnJvcjogRXJyb3IpIHtcbiAgICB0aGlzLmVycm9ySGFuZGxlci5oYW5kbGVFcnJvcihlcnJvcik7XG4gIH1cblxuICB3YXJuKHZhbHVlOiBhbnksIC4uLnJlc3Q6IGFueVtdKSB7XG4gICAgY29uc29sZS53YXJuKHZhbHVlLCAuLi5yZXN0KTtcbiAgfVxufVxuIl19