import { Component, OnInit } from '@angular/core';
import { RecipeFormComponent } from '../recipe-form/recipe-form.component';
import { RecipeService } from '../../services/recipe.service';
import { CommonModule } from '@angular/common';
import { RecipeItem } from '../../utils/types';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [RecipeFormComponent, CommonModule, MatCardModule],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
  providers: [RecipeService]
})
export class RecipeListComponent implements OnInit{
  recipeList: RecipeItem[] = [];

  constructor (private recipeService: RecipeService) {

  }

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe((data) => {
      console.log('data: ', data);
      this.recipeList = data;
    })
  }
}
