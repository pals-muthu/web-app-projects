import { Component, Input, OnInit } from '@angular/core';
import { ExpenseType } from '../../services/expense.services';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-expense-item',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './expense-item.component.html',
  styleUrl: './expense-item.component.css'
})
export class ExpenseItemComponent implements OnInit {

  @Input() expenseItem: ExpenseType;

  ngOnInit(): void {

  }

}
