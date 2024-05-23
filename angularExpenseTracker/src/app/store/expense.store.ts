import { createAction, createReducer, on } from "@ngrx/store";

export const fetchExpenses = createAction('expense/fetch');
export const addExpense = createAction('expense/add');
export const deleteExpense = createAction('expense/delete');
export const editExpense = createAction('expense/edit');
export const errorExpense = createAction('expense/error');

export const getExpense = createAction('expense/get');

const initialExpenseData = [];

export const expenseReducer = createReducer(initialExpenseData,
  on(fetchExpenses, (state, action) => [...action['payload']]),
  on(addExpense, (state, action) => [...state, action['payload']]),
  on(deleteExpense, (state, action) => state.filter((eachExpense) => eachExpense.id !== action['payload']['id'])),
  on(editExpense, (state, action) => state),
  on(errorExpense, (state) => state)
);


const currentExpenseData = {}

export const currentExpenseReducer = createReducer(currentExpenseData,
  on(getExpense, (state, action) => action['payload'])
)
