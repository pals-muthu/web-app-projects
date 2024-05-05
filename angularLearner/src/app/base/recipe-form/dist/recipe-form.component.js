"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RecipeFormComponent = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var recipe_service_1 = require("../../services/recipe.service");
var RecipeFormComponent = /** @class */ (function () {
    // @ViewChild('formRef') formF: NgForm;
    function RecipeFormComponent(recipeService) {
        this.recipeService = recipeService;
    }
    RecipeFormComponent.prototype.onSubmit = function (formRef) {
        // console.log('formRef status: ', formRef.valid, formRef.touched);
        // console.log('formRef controls: ', formRef.controls);
        // console.log('formRef controls: ', formRef.controls.name.valid, formRef.controls.name.touched, formRef.controls.name);
        if (formRef.valid) {
            console.log('value: ', formRef.value);
            this.recipeService.createRecipe(formRef.value).subscribe(function (res) {
                console.log('create response: ', res);
            });
        }
    };
    RecipeFormComponent = __decorate([
        core_1.Component({
            selector: 'app-recipe-form',
            standalone: true,
            imports: [common_1.CommonModule, forms_1.FormsModule],
            templateUrl: './recipe-form.component.html',
            styleUrl: './recipe-form.component.css',
            providers: [recipe_service_1.RecipeService]
        })
    ], RecipeFormComponent);
    return RecipeFormComponent;
}());
exports.RecipeFormComponent = RecipeFormComponent;
