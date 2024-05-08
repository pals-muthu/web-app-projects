import { createSlice, configureStore } from '@reduxjs/toolkit';

const counter = createSlice({
  name: 'counter',
  initialState: {
    counter: 0
  },
  reducers: {
    increment: (state) => {
      return { counter: (state.counter + 1) };
    },
    decrement: (state) => {
      return { counter: (state.counter - 1) };
    }
  }
})

const store = configureStore({
  reducer: { counter: counter.reducer }
})

export const counterActions = counter.actions;

export default store;