import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ExpenseService } from "../services/expense.services";
import { Subscription, catchError, exhaustMap, map, of } from "rxjs";

@Injectable()
export class ExpenseEffects {

  private getExpenseSubscription: Subscription;
  constructor (private actions: Actions, private expenseService: ExpenseService) {
  }

  fetchExpenses = createEffect(() => 
    this.actions.pipe(
      ofType('effect/expense/fetch'),
      exhaustMap(() => this.expenseService.getExpenses().pipe(
        map(expenses => ({ type : 'expense/fetch', payload: expenses})),
        catchError(() => of({ type : 'expense/error' }))
      ))
    )
  );

  addExpense = createEffect(() => this.actions.pipe(
    ofType('effect/expense/add'),
    exhaustMap((action) => this.expenseService.createExpenses(action['payload']).pipe(
      map(expense => ({ type : 'expense/add', payload: expense})),
      catchError(() => of({ type : 'expense/error' }))
    ))
  ));

}