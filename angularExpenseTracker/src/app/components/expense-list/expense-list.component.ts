import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ExpenseType } from '../../services/expense.services';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.css'
})
export class ExpenseListComponent implements OnInit{

  expenses: Observable<ExpenseType[]> = this.store.select(state => state.expense);
  
  constructor (private store: Store<{expense: ExpenseType[]}>) {

  }

  ngOnInit(): void {
    this.store.dispatch({ type: 'effect/expense/fetch' })
  }



}
