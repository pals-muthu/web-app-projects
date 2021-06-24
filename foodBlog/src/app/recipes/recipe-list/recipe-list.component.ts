import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [];
  @Output() selectedRecipe = new EventEmitter<Recipe>();

  constructor() {
    this.recipes.push(new Recipe('A Test Recipe', 'This is simply a test', 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1035&q=80'));
    this.recipes.push(new Recipe('A Test Recipe', 'This is simply a test', 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1035&q=80'));
    console.log('pushing inside the array', this.recipes);
  }

  ngOnInit(): void {


  }
  showRecipeDetail(currRecipe: Recipe) {
    console.log("Recipe selected");
    this.selectedRecipe.emit(currRecipe);
  }
}
