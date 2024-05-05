import { createAction, props } from '@ngrx/store';
import { createReducer, on } from '@ngrx/store';
import { RecipeItem } from '../utils/types';

export const getRecipes = createAction('Recipes Loaded Success', props<{payload: RecipeItem[]}>() );

export const initialState = [];

export const recipesReducer = createReducer(initialState,
  on(getRecipes, (state, action) => {
    console.log('recipesReducer: ', state, action);
    return [...action.payload]
  })
)
