import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { config } from '../../utils/config';
import { ExpenseService } from '../../services/expense.services';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-add-expense',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatCardModule, FormsModule, CommonModule],
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.css'
})
export class AddExpenseComponent implements OnInit {

  public types = config.CONSTANTS.TYPES;
  public selectedType = this.types[0].value;

  constructor (private expenseService: ExpenseService, private store: Store) {

  }

  ngOnInit(): void {
  }

  onSubmit(formRef: NgForm) {
    console.log('formRef: ', formRef.value);
    // TODO - Add toaster and add spinner
    if (formRef.valid) {
      this.store.dispatch({ type: 'effect/expense/add', payload: formRef.value})
      formRef.resetForm()
      formRef.form.reset()
      formRef.form.patchValue({
        type: this.types[0].value
      })
    }
  }

}
