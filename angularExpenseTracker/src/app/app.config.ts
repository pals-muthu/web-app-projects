import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideEffects } from '@ngrx/effects';
import { ExpenseEffects } from './store/expense.effect';
import { provideStore } from '@ngrx/store';
import { expenseReducer } from './store/expense.store';
import { generalReducer } from './store/general.store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideClientHydration(),
    provideHttpClient(),
    provideStore({
      expense: expenseReducer,
      general: generalReducer
    }),
    provideEffects([ExpenseEffects])
  ]
};
