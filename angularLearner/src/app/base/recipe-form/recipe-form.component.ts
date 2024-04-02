import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.css',
  providers: [RecipeService]
})
export class RecipeFormComponent {

  // @ViewChild('formRef') formF: NgForm;

  constructor (private recipeService: RecipeService) {

  }

  onSubmit(formRef: NgForm) {
    // console.log('formRef status: ', formRef.valid, formRef.touched);
    // console.log('formRef controls: ', formRef.controls);
    // console.log('formRef controls: ', formRef.controls.name.valid, formRef.controls.name.touched, formRef.controls.name);

    if (formRef.valid) {
      console.log('value: ', formRef.value);
      this.recipeService.createRecipe(formRef.value).subscribe((res) => {
        console.log('create response: ', res);
      })
    }
  }
}
