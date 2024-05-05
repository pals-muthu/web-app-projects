import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { RecipeService } from "../services/recipe.service";

@Injectable()
export class RecipeEffects {

  constructor (private actions: Actions, private recipeService: RecipeService) {

  }

  loadRecipes = createEffect(() => this.actions.pipe(
        ofType('Recipes Load'),
        exhaustMap(() => this.recipeService.getRecipes().pipe(
          map(recipes => ({ payload: recipes, type: 'Recipes Loaded Success' })),
          catchError(() => EMPTY)
        )
      )
    )
  );

};
