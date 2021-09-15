import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  // @Input() recipeDetail: Recipe;
  recipeDetail: Recipe;
  id: number;
  constructor(private shopinglistService: ShoppingListService, private recipeService: RecipeService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    // this.id = this.route.snapshot.params['id'];
    // console.log('In recipe detail', this.id);
    // this.recipeDetail = this.recipeService.getRecipeById(this.id);

    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipeDetail = this.recipeService.getRecipeById(this.id);
      });
  }

  // ngAfterViewChecked(): void {
  //   this.id = this.route.snapshot.params['id'];
  //   console.log('In recipe detail - after checked', this.id);
  //   this.recipeDetail = this.recipeService.getRecipeById(this.id);
  // }

  toShoppingList() {
    this.shopinglistService.addNewIngredients(this.recipeDetail.ingredients);
  }
}
