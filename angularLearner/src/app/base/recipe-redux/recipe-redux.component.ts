import { Component, OnInit } from '@angular/core';
import { RecipeFormComponent } from '../recipe-form/recipe-form.component';
import { RecipeService } from '../../services/recipe.service';
import { CommonModule } from '@angular/common';
import { RecipeItem } from '../../utils/types';
import {MatCardModule} from '@angular/material/card';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recipe-redux',
  standalone: true,
  imports: [RecipeFormComponent, CommonModule, MatCardModule],
  templateUrl: './recipe-redux.component.html',
  styleUrl: './recipe-redux.component.css'
})
export class RecipeReduxComponent implements OnInit {
  recipeList: Observable<RecipeItem[]> = this.store.select(state => state.recipes);

  constructor (private store: Store<{ recipes: RecipeItem[] }>) {

  }

  ngOnInit(): void {
    this.store.dispatch({ type: 'Recipes Load'});
  }
}
