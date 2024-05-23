import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ExpenseService } from "../services/expense.services";
import { Observable, catchError, exhaustMap, finalize, map, of, tap } from "rxjs";
import { Store } from "@ngrx/store";
import { Loader } from "./general.store";

@Injectable()
export class ExpenseEffects {
  private loader = new Loader(this.store);
  constructor (private actions: Actions, private expenseService: ExpenseService, private store: Store) {
  }

  fetchExpenses = createEffect(() =>
    this.actions.pipe(
      ofType('effect/expense/fetch'),
      exhaustMap(() => {
        this.loader.turnOnLoader();
        return this.expenseService.getExpenses().pipe(
        map(expenses => ({ type : 'expense/fetch', payload: expenses})),
        catchError(() => of({ type : 'expense/error' })),
        finalize(() => {
          this.loader.turnOffLoader();
        })
      )
    })
    )
  );

  addExpense = createEffect(() => this.actions.pipe(
    ofType('effect/expense/add'),
    exhaustMap((action) => {
      this.loader.turnOnLoader();
      return this.expenseService.createExpenses(action['payload']).pipe(
      map(expense => ({ type : 'expense/add', payload: expense})),
      catchError(() => of({ type : 'expense/error' })),
      finalize(() => {
        this.loader.turnOffLoader();
      })
    )})
  ));

  deleteExpense = createEffect(() => this.actions.pipe(
    ofType('effect/expense/delete'),
    exhaustMap((action) => {
      this.loader.turnOnLoader();
      return this.expenseService.deleteExpense(action['payload']).pipe(
      map(expense => ({ type : 'expense/delete', payload: expense})),
      catchError(() => of({ type : 'expense/error' })),
      finalize(() => {
        this.loader.turnOffLoader();
      })
    )})
  ));

  getExpense = createEffect(() => this.actions.pipe(
    ofType('effect/expense/get'),
    exhaustMap((action) => {
      this.loader.turnOnLoader();
      return this.expenseService.getExpense(action['payload']).pipe(
      map(expense => ({ type : 'expense/get', payload: expense})),
      catchError(() => of({ type : 'expense/error' })),
      finalize(() => {
        this.loader.turnOffLoader();
      })
    )})
  ));

  editExpense = createEffect(() => this.actions.pipe(
    ofType('effect/expense/edit'),
    exhaustMap((action) => {
      this.loader.turnOnLoader();
      return this.expenseService.editExpense(action['payload']['id'], action['payload']['body']).pipe(
      map(expense => ({ type : 'expense/edit', payload: expense})),
      catchError(() => of({ type : 'expense/error' })),
      finalize(() => {
        this.loader.turnOffLoader();
      })
    )})
  ));



}
