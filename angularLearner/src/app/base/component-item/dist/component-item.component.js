"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ComponentItemComponent = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var rxjs_1 = require("rxjs");
var common_1 = require("@angular/common");
var shorten_pipe_1 = require("../../utils/shorten.pipe");
var ComponentItemComponent = /** @class */ (function () {
    function ComponentItemComponent(route, router) {
        this.route = route;
        this.router = router;
        this.ELEMENT_DATA = [];
        this.paramsSubscription = new rxjs_1.Subscription();
        this.countSubscription = new rxjs_1.Subscription();
        this.newCountSubscription = new rxjs_1.Subscription();
        this.show = true;
        this.position = 0;
        this.name = '';
        this.weight = 0;
        this.symbol = '';
    }
    ComponentItemComponent.prototype.loadUserDetail = function (id) {
        var _this = this;
        this.route.data.subscribe(function (_a) {
            var baseData = _a.baseData;
            console.log('on init data: ', baseData);
            _this.ELEMENT_DATA = baseData;
        });
        var currentItem = this.ELEMENT_DATA.find(function (item) { return item.position.toString() === id; });
        console.log('currentItem: ', currentItem);
        this.position = (currentItem === null || currentItem === void 0 ? void 0 : currentItem.position) || 0;
        this.name = (currentItem === null || currentItem === void 0 ? void 0 : currentItem.name) || '';
        this.weight = (currentItem === null || currentItem === void 0 ? void 0 : currentItem.weight) || 0;
        this.symbol = (currentItem === null || currentItem === void 0 ? void 0 : currentItem.symbol) || '';
        // discarding old one
        if (this.countSubscription) {
            this.countSubscription.unsubscribe();
            this.newCountSubscription.unsubscribe();
        }
        // create an observable
        var countObservable = new rxjs_1.Observable(function (observer) {
            var count = 0;
            setInterval(function () {
                if (count > 5) {
                    observer.complete();
                }
                count++;
                observer.next(count);
            }, 1500);
        });
        this.countSubscription = countObservable.subscribe(function (data) {
            console.log('count data: ', data);
            if (data % 2 === 0) {
                _this.show = true;
            }
            else {
                _this.show = false;
            }
        });
        var newCustomObservable = countObservable.pipe(rxjs_1.map(function (data) {
            return 'Round: ' + (data + 1);
        }));
        this.newCountSubscription = newCustomObservable.subscribe(function (data) {
            console.log('new count data: ', data);
        });
    };
    ComponentItemComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('on init: ', this.route.snapshot.params);
        this.paramsSubscription = this.route.params.subscribe(function (params) { _this.loadUserDetail(params['id']); });
    };
    ComponentItemComponent.prototype.ngOnDestroy = function () {
        this.paramsSubscription.unsubscribe();
        this.countSubscription.unsubscribe();
        this.newCountSubscription.unsubscribe();
    };
    ComponentItemComponent.prototype.getPreviousPositions = function () {
        if (this.position === 1) {
            return (this.ELEMENT_DATA.length - 1).toString();
        }
        return (Number(this.position) - 1).toString();
    };
    ComponentItemComponent.prototype.getNextPostition = function () {
        if (this.position === (this.ELEMENT_DATA.length - 1)) {
            return '1';
        }
        return (Number(this.position) + 1).toString();
    };
    ComponentItemComponent.prototype.goNext = function () {
        this.router.navigate(['item', this.getNextPostition()]);
    };
    ComponentItemComponent = __decorate([
        core_1.Component({
            selector: 'app-component-item',
            standalone: true,
            imports: [router_1.RouterModule, common_1.CommonModule, shorten_pipe_1.ShortenPipe],
            templateUrl: './component-item.component.html',
            styleUrl: './component-item.component.css'
        })
    ], ComponentItemComponent);
    return ComponentItemComponent;
}());
exports.ComponentItemComponent = ComponentItemComponent;
