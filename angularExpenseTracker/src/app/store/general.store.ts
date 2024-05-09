import { Injectable } from "@angular/core";
import { Store, createAction, createReducer, on } from "@ngrx/store";

export const loaderOn = createAction('loader/on');
export const loaderOff = createAction('loader/off');

export interface GeneralState {
  loader: boolean
}

const initialGeneralState: GeneralState = {
  loader: false
};

export const generalReducer = createReducer(initialGeneralState,
  on(loaderOn, (state) => ({ ...state, loader: true })),
  on(loaderOff, (state) => ({ ...state, loader: false })),
);

@Injectable()
export class Loader {

  constructor (private store: Store) {
  }

  turnOnLoader () {
    this.store.dispatch({ type: 'loader/on'});
  }

  turnOffLoader () {
    this.store.dispatch({ type: 'loader/off'});
  }

}