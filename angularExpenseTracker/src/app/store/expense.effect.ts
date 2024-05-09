import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ExpenseService } from "../services/expense.services";
import { Observable, catchError, exhaustMap, finalize, map, of, tap } from "rxjs";
import { Store } from "@ngrx/store";

@Injectable()
export class ExpenseEffects {

  constructor (private actions: Actions, private expenseService: ExpenseService, private store: Store) {
  }

  turnOnLoader () {
    this.store.dispatch({ type: 'loader/on'});
  }

  turnOffLoader () {
    this.store.dispatch({ type: 'loader/off'});
  }

  // processRequest (funcPipe: Observable<any>) {
  //   this.turnOnLoader();
  //   return exhaustMap(() => {
  //     return funcPipe.pipe(
  //       finalize(() => {
  //         this.turnOffLoader();
  //       })
  //     )
  //   })
  // }

  fetchExpenses = createEffect(() =>
    this.actions.pipe(
      ofType('effect/expense/fetch'),
      // this.processRequest(this.expenseService.getExpenses().pipe(
      //   map(expenses => ({ type : 'expense/fetch', payload: expenses})),
      //   catchError(() => of({ type : 'expense/error' })))),
      exhaustMap(() => {
        this.turnOnLoader();
        return this.expenseService.getExpenses().pipe(
        map(expenses => ({ type : 'expense/fetch', payload: expenses})),
        catchError(() => of({ type : 'expense/error' })),
        finalize(() => {
          this.turnOffLoader();
        })
      )
    })
    )
  );

  addExpense = createEffect(() => this.actions.pipe(
    ofType('effect/expense/add'),
    exhaustMap((action) => {
      this.turnOnLoader();
      return this.expenseService.createExpenses(action['payload']).pipe(
      map(expense => ({ type : 'expense/add', payload: expense})),
      catchError(() => of({ type : 'expense/error' })),
      finalize(() => {
        this.turnOffLoader();
      })
    )})
  ));

}
