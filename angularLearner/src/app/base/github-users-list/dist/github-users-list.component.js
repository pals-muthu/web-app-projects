"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GithubUsersListComponent = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var GithubUsersListComponent = /** @class */ (function () {
    function GithubUsersListComponent(http) {
        this.http = http;
    }
    GithubUsersListComponent.prototype.ngOnInit = function () {
        this.http.get("https://api.github.com/users?per_page=10", {
            headers: {
                // ...(process?.env?.['REACT_APP_GITHUB_TOKEN']
                //   ? { Authorization: `Bearer ${process.env['REACT_APP_GITHUB_TOKEN']}` }
                //   : null),
                Accept: "application/vnd.github+json",
                "X-GitHub-Api-Version": "2022-11-28"
            }
        }).subscribe(function (data) {
            console.log('data: ', data);
        });
    };
    GithubUsersListComponent = __decorate([
        core_1.Component({
            selector: 'app-github-users-list',
            standalone: true,
            imports: [http_1.HttpClientModule],
            templateUrl: './github-users-list.component.html',
            styleUrl: './github-users-list.component.css'
        })
    ], GithubUsersListComponent);
    return GithubUsersListComponent;
}());
exports.GithubUsersListComponent = GithubUsersListComponent;
