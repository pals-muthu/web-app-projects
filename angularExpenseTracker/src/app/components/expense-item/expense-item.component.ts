import { Component, Input, OnInit } from '@angular/core';
import { ExpenseService, ExpenseType } from '../../services/expense.services';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense-item',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './expense-item.component.html',
  styleUrl: './expense-item.component.css'
})
export class ExpenseItemComponent implements OnInit {

  @Input() expenseItem: ExpenseType;

  constructor (private store: Store, private router: Router) {

  }

  ngOnInit(): void {

  }

  public deleteAction(): void {
    this.store.dispatch({ type: 'effect/expense/delete', payload: this.expenseItem.id})
  }

  public editAction (): void {
    this.router.navigateByUrl(`/edit-expense/${this.expenseItem.id}`);
  }

}
