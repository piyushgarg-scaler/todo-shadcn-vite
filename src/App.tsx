import { useState } from "react";
import { useAppDispatch, useAppSelector } from "./redux/hooks";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TodoItem from "@/components/ui/todoItem";

import {
  createTodoItem,
  deleteTodoItem,
  getAllTodos,
  toggleTodoItem,
} from "@/redux/slices/todos";

import "./App.css";

function App() {
  const todos = useAppSelector(getAllTodos);
  const dispatch = useAppDispatch();

  const [value, setValue] = useState("");

  const handleClickAddButton = () => {
    dispatch(createTodoItem(value));
    setValue("");
  };

  const handleToggleTodoItem = (id: string, value: boolean) => {
    dispatch(toggleTodoItem({ id, value }));
  };

  const handleDeleteTodoItem = (id: string) => {
    dispatch(deleteTodoItem(id));
  };

  return (
    <div>
      <div className="flex w-[100vw] h-[100vh] items-center justify-center">
        <div className="w-[30vw]">
          <div className="flex gap-2">
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Type something here..."
            />
            <Button
              disabled={value.trim() === ""}
              onClick={handleClickAddButton}
            >
              Add
            </Button>
          </div>
          <div className="mt-5">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                item={todo}
                onMarkComplete={(id) => handleToggleTodoItem(id, true)}
                onMarkInComplete={(id) => handleToggleTodoItem(id, false)}
                onDelete={handleDeleteTodoItem}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
