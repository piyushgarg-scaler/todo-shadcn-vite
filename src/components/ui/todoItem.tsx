import React from "react";
import { MdDelete } from "react-icons/md";
import { Todo } from "@/types/todo";
import { Checkbox } from "@/components/ui/checkbox";

interface TodoItemProps {
  item: Todo;
  onMarkComplete?: (id: string) => void;
  onMarkInComplete?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  item,
  onMarkComplete,
  onMarkInComplete,
  onDelete,
}) => {
  return (
    <div className="flex items-center gap-2">
      <Checkbox
        checked={item.isCompleted}
        onCheckedChange={(checked) => {
          if (onMarkComplete && checked) onMarkComplete(item.id);
          else if (onMarkInComplete) onMarkInComplete(item.id);
        }}
      />
      <p className={item.isCompleted ? "line-through" : ""}>{item.title}</p>
      {item.isCompleted && (
        <MdDelete onClick={() => (onDelete ? onDelete(item.id) : null)} />
      )}
    </div>
  );
};

export default TodoItem;
