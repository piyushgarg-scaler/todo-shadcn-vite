import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TodoItem from "./components/ui/todoItem";
import type { Todo } from "./types/todo";

import "./App.css";

function App() {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState<Todo[]>(() => {
    const todos = localStorage.getItem("todos");
    if (todos) return JSON.parse(todos) as Todo[];
    return [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleClickAddButton = () => {
    setTodos([
      ...todos,
      { id: Date.now().toString(), title: value, isCompleted: false },
    ]);
    setValue("");
  };

  const handleToggleTodoItem = (id: string, value: boolean) => {
    const updatedState = todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: value } : todo
    );
    setTodos(updatedState);
  };

  const handleDeleteTodoItem = (id: string) => {
    const filteredItems = todos.filter((e) => e.id !== id);
    setTodos(filteredItems);
  };

  return (
    <div className="flex w-[100vw] h-[100vh] items-center justify-center">
      <div>
        <div className="flex gap-2">
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Type something here..."
          />
          <Button disabled={value.trim() === ""} onClick={handleClickAddButton}>
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
  );
}

export default App;
