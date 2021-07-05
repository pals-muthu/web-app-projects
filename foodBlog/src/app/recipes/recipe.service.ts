import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('All American Cheeseburger', 'Assemble the ingredients',
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=902&q=80',
    [new Ingredient('Beef Patties', 2), new Ingredient('Onions', 1), new Ingredient('Tomatos', 1), new Ingredient('Sesame Bun', 1)]),
    new Recipe('Thai inspired Ceviche', 'Assemble the ingredients',
    'https://images.unsplash.com/photo-1601579110733-f654670d8c30?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1049&q=80',
    [new Ingredient('King Fish', 1), new Ingredient('Pickled Onions', 1), new Ingredient('Baby Radishes', 1), new Ingredient('Lime', 2)])
  ];

  getRecipes () {
    // To get a copy of the array and not a refernce to it. because get operations should forbid data manipulation.
    // Although we could make it private and perform all the operations here.
    return this.recipes.slice();
  }

}
