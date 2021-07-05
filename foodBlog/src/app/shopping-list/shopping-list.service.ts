import { EventEmitter } from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';

export class ShoppingListService {

  updatedIngredients = new EventEmitter<Ingredient[]>();
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5), new Ingredient('Tomato', 5)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addNewIngredient(name: string, amount: number) {
    console.log("newIngredient: ", name, amount);
    this.ingredients.push(new Ingredient(name, amount));
    this.updatedIngredients.emit(this.ingredients.slice());
  }

  addNewIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.updatedIngredients.emit(this.ingredients.slice());
  }
}
