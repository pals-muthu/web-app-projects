"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ReactiveFormComponent = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ReactiveFormComponent = /** @class */ (function () {
    function ReactiveFormComponent() {
        this.genders = ['male', 'female'];
        this.forbiddenUsernames = ['Chris', 'Anna'];
    }
    ReactiveFormComponent.prototype.ngOnInit = function () {
        this.signupForm = new forms_1.FormGroup({
            'userData': new forms_1.FormGroup({
                'username': new forms_1.FormControl(null, [forms_1.Validators.required, this.forbiddenNames.bind(this)]),
                'email': new forms_1.FormControl(null, [forms_1.Validators.required, forms_1.Validators.email], [this.forbiddenEmails])
            }),
            'gender': new forms_1.FormControl('male'),
            'hobbies': new forms_1.FormArray([])
        });
        // you can do this for indvidual form controls as well.
        this.signupForm.valueChanges.subscribe(function (value) {
            console.log('value: ', value);
        });
        this.signupForm.statusChanges.subscribe(function (status) {
            console.log('status: ', status);
        });
        // you also have form setting, patching and resetting
    };
    ReactiveFormComponent.prototype.onAddHobby = function () {
        var control = new forms_1.FormControl(null, forms_1.Validators.required);
        this.signupForm.get('hobbies').push(control);
    };
    ReactiveFormComponent.prototype.getControls = function () {
        return this.signupForm.get('hobbies').controls;
    };
    ReactiveFormComponent.prototype.onSubmit = function () {
        console.log('form data: ', this.signupForm);
    };
    ReactiveFormComponent.prototype.forbiddenNames = function (control) {
        if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
            // this will be helpful in identifying the type of error.
            // it will be in the errors of the formcontrol object.
            return { 'nameIsForbidden': true };
        }
        return null;
    };
    ReactiveFormComponent.prototype.forbiddenEmails = function (control) {
        var promise = new Promise(function (resolve, reject) {
            setTimeout(function () {
                if (control.value === 'test@test.com') {
                    resolve({ 'emailIsForbidden': true });
                }
                else {
                    resolve(null);
                }
            }, 1500);
        });
        return promise;
    };
    ReactiveFormComponent = __decorate([
        core_1.Component({
            selector: 'app-reactive-form',
            standalone: true,
            imports: [common_1.CommonModule, forms_1.ReactiveFormsModule],
            templateUrl: './reactive-form.component.html',
            styleUrl: './reactive-form.component.css'
        })
    ], ReactiveFormComponent);
    return ReactiveFormComponent;
}());
exports.ReactiveFormComponent = ReactiveFormComponent;
