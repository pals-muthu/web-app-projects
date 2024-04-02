"use strict";
exports.__esModule = true;
exports.routes = void 0;
var component_items_component_1 = require("./base/component-items/component-items.component");
var component_item_component_1 = require("./base/component-item/component-item.component");
var sample_guard_service_1 = require("./services/sample-guard.service");
var resolve_data_service_1 = require("./services/resolve-data.service");
var reactive_form_component_1 = require("./base/reactive-form/reactive-form.component");
var github_users_list_component_1 = require("./base/github-users-list/github-users-list.component");
var recipe_list_component_1 = require("./base/recipe-list/recipe-list.component");
exports.routes = [
    { path: '', component: component_items_component_1.ComponentItemsComponent, canActivate: [sample_guard_service_1.SampleGuard], resolve: { baseData: resolve_data_service_1.baseData } },
    { path: 'item/:id', component: component_item_component_1.ComponentItemComponent, canActivate: [sample_guard_service_1.SampleGuard], resolve: { baseData: resolve_data_service_1.baseData } },
    { path: 'new-user', component: reactive_form_component_1.ReactiveFormComponent },
    { path: 'github-users', component: github_users_list_component_1.GithubUsersListComponent },
    { path: 'recipes', component: recipe_list_component_1.RecipeListComponent }
];
