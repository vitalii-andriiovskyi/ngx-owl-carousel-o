/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
    OwlLogger.ctorParameters = function () { return [
        { type: ErrorHandler }
    ]; };
    return OwlLogger;
}());
export { OwlLogger };
if (false) {
    /**
     * @type {?}
     * @private
     */
    OwlLogger.prototype.errorHandler;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvbG9nZ2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFcEU7SUFHRSxtQkFBb0IsWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7SUFBRyxDQUFDOzs7Ozs7SUFFbEQsdUJBQUc7Ozs7O0lBQUgsVUFBSSxLQUFVO1FBQUUsY0FBYzthQUFkLFVBQWMsRUFBZCxxQkFBYyxFQUFkLElBQWM7WUFBZCw2QkFBYzs7UUFDNUIsRUFBRSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLE9BQU8sQ0FBQyxHQUFHLE9BQVgsT0FBTyxvQkFBSyxLQUFLLEdBQUssSUFBSSxHQUFFO1FBQzlCLENBQUM7SUFDSCxDQUFDOzs7OztJQUVELHlCQUFLOzs7O0lBQUwsVUFBTSxLQUFZO1FBQ2hCLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7Ozs7OztJQUVELHdCQUFJOzs7OztJQUFKLFVBQUssS0FBVTtRQUFFLGNBQWM7YUFBZCxVQUFjLEVBQWQscUJBQWMsRUFBZCxJQUFjO1lBQWQsNkJBQWM7O1FBQzdCLE9BQU8sQ0FBQyxJQUFJLE9BQVosT0FBTyxvQkFBTSxLQUFLLEdBQUssSUFBSSxHQUFFO0lBQy9CLENBQUM7O2dCQWpCRixVQUFVOzs7Z0JBRkYsWUFBWTs7SUFvQnJCLGdCQUFDO0NBQUEsQUFsQkQsSUFrQkM7U0FqQlksU0FBUzs7Ozs7O0lBRVIsaUNBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXJyb3JIYW5kbGVyLCBJbmplY3RhYmxlLCBpc0Rldk1vZGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE93bExvZ2dlciB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZXJyb3JIYW5kbGVyOiBFcnJvckhhbmRsZXIpIHt9XHJcblxyXG4gIGxvZyh2YWx1ZTogYW55LCAuLi5yZXN0OiBhbnlbXSkge1xyXG4gICAgaWYgKGlzRGV2TW9kZSgpKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHZhbHVlLCAuLi5yZXN0KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGVycm9yKGVycm9yOiBFcnJvcikge1xyXG4gICAgdGhpcy5lcnJvckhhbmRsZXIuaGFuZGxlRXJyb3IoZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgd2Fybih2YWx1ZTogYW55LCAuLi5yZXN0OiBhbnlbXSkge1xyXG4gICAgY29uc29sZS53YXJuKHZhbHVlLCAuLi5yZXN0KTtcclxuICB9XHJcbn1cclxuIl19