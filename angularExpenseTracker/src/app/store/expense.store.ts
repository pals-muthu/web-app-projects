import { createAction, createReducer, on } from "@ngrx/store";

export const fetchExpenses = createAction('expense/fetch');
export const addExpense = createAction('expense/add');
export const deleteExpense = createAction('expense/delete');
export const errorExpense = createAction('expense/error');

const initialExpenseData = [];

export const expenseReducer = createReducer(initialExpenseData,
  on(fetchExpenses, (state, action) => [...action['payload']]),
  on(addExpense, (state, action) => [...state, action['payload']]),
  on(deleteExpense, (state, action) => state.filter((eachExpense) => eachExpense.id !== action['payload']['id'])),
  on(errorExpense, (state) => state)
);
