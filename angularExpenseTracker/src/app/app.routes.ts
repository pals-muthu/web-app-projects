import { Routes } from '@angular/router';
import { config } from './utils/config';
import { AddExpenseComponent } from './components/add-expense/add-expense.component';
import { ExpenseListComponent } from './components/expense-list/expense-list.component';

export const routes: Routes = [
  { path: config.CONSTANTS.ROUTES.HOME.link, component: AddExpenseComponent },
  { path: config.CONSTANTS.ROUTES.VIEW.link, component: ExpenseListComponent },
  { path: config.CONSTANTS.ROUTES.EDIT.link, component: AddExpenseComponent }
];
