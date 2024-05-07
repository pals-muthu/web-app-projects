import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { config } from '../../utils/config';

@Component({
  selector: 'app-add-expense',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, FormsModule, CommonModule],
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.css'
})
export class AddExpenseComponent implements OnInit {

  public types = config.CONSTANTS.TYPES;
  public defaultType = this.types[0].value;

  ngOnInit(): void {
  }

  onSubmit(formRef: NgForm) {
    console.log('formRef: ', formRef.value);
  }

}
