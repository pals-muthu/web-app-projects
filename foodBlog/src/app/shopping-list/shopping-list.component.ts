import { Component, OnInit } from '@angular/core';

import {Ingredient} from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = [];

  constructor() {
    this.ingredients.push(new Ingredient('Apples', 5), new Ingredient('Tomato', 5))
  }

  ngOnInit(): void {
  }

  addNewIngredientHandle(newIngredient: Ingredient) {
    console.log("newIngredient: ", newIngredient);
    this.ingredients.push(newIngredient);
  }

}
