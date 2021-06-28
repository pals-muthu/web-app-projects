import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @Output() addNewIngredient = new EventEmitter<Ingredient>();
  constructor() { }

  ngOnInit(): void {
  }

  AddIngredient(nameInput , amountInput) {
    console.log("nameInput: ", nameInput);
    this.addNewIngredient.emit(new Ingredient(nameInput.value, amountInput.value));
  }
}
