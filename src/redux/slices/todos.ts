import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Todo } from "@/types/todo";

interface ITodoState {
  todos: Todo[];
}

const initialState: ITodoState = {
  todos: localStorage.getItem("todos")
    ? (JSON.parse(localStorage.getItem("todos")!) as Todo[])
    : [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    createTodoItem: (state, action: PayloadAction<string>) => {
      state.todos.push({
        id: Date.now().toString(),
        title: action.payload,
        isCompleted: false,
      });
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    deleteTodoItem: (state, action: PayloadAction<string>) => {
      const filteredItems = state.todos.filter((e) => e.id !== action.payload);
      state.todos = filteredItems;
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    toggleTodoItem: (
      state,
      action: PayloadAction<{ id: string; value: boolean }>
    ) => {
      const updatedState = state.todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, isCompleted: action.payload.value }
          : todo
      );
      state.todos = updatedState;
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
  },
});

export const { createTodoItem, deleteTodoItem, toggleTodoItem } =
  todoSlice.actions;
export default todoSlice.reducer;
