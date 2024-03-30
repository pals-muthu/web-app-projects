"use strict";
exports.__esModule = true;
exports.AuthInterceptorService = void 0;
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var AuthInterceptorService = /** @class */ (function () {
    function AuthInterceptorService() {
    }
    AuthInterceptorService.prototype.intercept = function (req, next) {
        console.log(' intecepting request ');
        var modifiedRequest = req.clone({
            headers: req.headers.append('X-Requested-With', 'XYZ')
        });
        return next.handle(modifiedRequest).pipe(rxjs_1.tap(function (event) {
            console.log('event type: ', event.type);
            if (event.type === http_1.HttpEventType.Response) {
                console.log('event body: ', event.body);
            }
        }));
    };
    return AuthInterceptorService;
}());
exports.AuthInterceptorService = AuthInterceptorService;
