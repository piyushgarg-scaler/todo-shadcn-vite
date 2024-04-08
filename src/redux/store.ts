import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/todos";
import jokeReducer from "./slices/jokes";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    joke: jokeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
