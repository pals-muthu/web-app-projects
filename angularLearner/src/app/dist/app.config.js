"use strict";
exports.__esModule = true;
exports.appConfig = void 0;
var router_1 = require("@angular/router");
var app_routes_1 = require("./app.routes");
var async_1 = require("@angular/platform-browser/animations/async");
var logging_service_1 = require("./services/logging.service");
var http_1 = require("@angular/common/http");
var auth_interceptor_service_1 = require("./services/auth-interceptor.service");
exports.appConfig = {
    providers: [router_1.provideRouter(app_routes_1.routes), async_1.provideAnimationsAsync(), logging_service_1.LoggingService, { provide: http_1.HTTP_INTERCEPTORS, useClass: auth_interceptor_service_1.AuthInterceptorService, multi: true }]
};
