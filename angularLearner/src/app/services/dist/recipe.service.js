"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RecipeService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var RecipeService = /** @class */ (function () {
    function RecipeService(http) {
        this.http = http;
        this.baseUrl = 'http://localhost:4110';
    }
    RecipeService.prototype.getRecipes = function () {
        return this.http.get(this.baseUrl, {
            observe: "body"
        });
    };
    RecipeService.prototype.createRecipe = function (data) {
        return this.http.post(this.baseUrl, data, {
            observe: "body"
        });
    };
    RecipeService.prototype.getRecipe = function (id) {
        return this.http.get(this.baseUrl, {
            observe: "body",
            params: new http_1.HttpParams({ fromObject: { id: id } })
        });
    };
    RecipeService = __decorate([
        core_1.Injectable()
    ], RecipeService);
    return RecipeService;
}());
exports.RecipeService = RecipeService;
