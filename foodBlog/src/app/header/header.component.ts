import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  // @Output() showRecipe = new EventEmitter<void>();
  // @Output() showShoppingList = new EventEmitter<void>();
  // @Input() showRecipesPage: Boolean;

  // trigger(type: string) {
  //   console.log('trigger', type);
  //   if (type === 'recipe') {
  //     this.showRecipe.emit();
  //     console.log('emitting', type);
  //   } else {
  //     this.showShoppingList.emit();
  //     console.log('emitting', type);
  //   }
  // }
}
