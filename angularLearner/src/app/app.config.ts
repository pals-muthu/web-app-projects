import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoggingService } from './services/logging.service';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { provideClientHydration } from '@angular/platform-browser';
import { RecipeEffects } from './store/recipe.effects';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { recipesReducer } from './store/recipe.store';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideHttpClient(),
    LoggingService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
    provideAnimationsAsync(), provideClientHydration(),
    provideStore({
      recipes: recipesReducer
    }),
    provideEffects([RecipeEffects])
  ],
};

