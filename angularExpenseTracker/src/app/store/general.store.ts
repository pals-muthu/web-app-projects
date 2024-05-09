import { createAction, createReducer, on } from "@ngrx/store";

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
