import { Component } from '@angular/core';
import { RecipeFormComponent } from '../recipe-form/recipe-form.component';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [RecipeFormComponent],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
  providers: [RecipeService]
})
export class RecipeListComponent {

}
