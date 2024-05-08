import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ExpenseType } from '../../services/expense.services';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ExpenseItemComponent } from '../expense-item/expense-item.component';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [CommonModule, ExpenseItemComponent],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.css'
})
export class ExpenseListComponent implements OnInit, OnDestroy{

  expenses: Observable<ExpenseType[]> = this.store.select(state => state.expense);
  subs: Subscription;
  constructor (private store: Store<{expense: ExpenseType[]}>) {}

  ngOnInit(): void {
    this.subs = this.expenses.subscribe((expenses) => {
      if (!expenses.length) {
        this.store.dispatch({ type: 'effect/expense/fetch' });
      }
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
  
}
