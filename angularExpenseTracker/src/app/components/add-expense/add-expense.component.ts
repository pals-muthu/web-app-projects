import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { config } from '../../utils/config';
import { ExpenseService } from '../../services/expense.services';

@Component({
  selector: 'app-add-expense',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, FormsModule, CommonModule],
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.css'
})
export class AddExpenseComponent implements OnInit {

  public types = config.CONSTANTS.TYPES;
  public selectedType = this.types[0].value;

  constructor (private expenseService: ExpenseService) {

  }

  ngOnInit(): void {
  }

  onSubmit(formRef: NgForm) {
    console.log('formRef: ', formRef.value);
    // TODO - set and export the data type of the expense form
    // TODO - use pipes to transform the data in the expense form
    // TODO - add redux state management
    // TODO - Add toaster and add spinner
    if (formRef.valid) {
      this.expenseService.createExpenses(formRef.value).subscribe((res) => {
        console.log('res: ',this.types[0].value, res);
        formRef.resetForm()
        formRef.form.reset()
        formRef.form.patchValue({
          type: this.types[0].value
        })
      })
    }
  }

}
