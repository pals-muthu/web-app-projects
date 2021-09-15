import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";

import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoutes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'recipes', component: RecipesComponent, children: [
    {path: ':id', component: RecipeDetailComponent}
  ]},
  {path: 'shop', component: ShoppingListComponent}
]

@NgModule(
  {
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]

  })
  export class AppRoutingModule {}
