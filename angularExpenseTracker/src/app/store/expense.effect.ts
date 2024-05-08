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
  )

}