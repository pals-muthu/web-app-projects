import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AppComponent {
  title = 'foodBlog';
  showRecipesPage: boolean = true;

  enableRecipe() {
    console.log('enabling recipe');
    this.showRecipesPage = true;
  }
  enableShoppingList() {
    console.log('enabling shopping list');
    console.log('shopping list');
    this.showRecipesPage = false;
  }
}
