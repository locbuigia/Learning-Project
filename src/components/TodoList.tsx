import { memo, useCallback, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "todos";

function safeStorage() {
  try {
    const test = "__storage_test__";
    window.localStorage.setItem(test, test);
    window.localStorage.removeItem(test);
    return window.localStorage;
  } catch {
    console.log("Local storage is not available. Todos will not be saved.");
    return null;
  }
}

const storage = safeStorage();

const Button = memo(
  ({
    onClick,
    label,
    disabled,
  }: {
    onClick: () => void;
    label: string;
    disabled: boolean;
  }) => {
    console.log("Button render:", label);
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        style={{ padding: "3px", fontSize: "16px" }}
      >
        {label}
      </button>
    );
  }
);

const TodoItem = memo(
  ({
    todo,
    index,
    removeTodo,
  }: {
    todo: string;
    index: number;
    removeTodo: (index: number) => void;
  }) => {
    console.log("TodoItem render:", todo);
    const handleRemove = useCallback(() => {
      removeTodo(index);
    }, []);

    return (
      <>
        {todo}
        <Button onClick={handleRemove} label="Remove" disabled={false} />
      </>
    );
  }
);

const TodoList = () => {
  const [todos, setTodos] = useState<string[]>(() => {
    if (!storage) return [];

    try {
      const stored = storage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      console.log(
        "Failed to parse todos from local storage. Starting with an empty list."
      );
      return [];
    }
  });

  const [input, setInput] = useState<string>("");
  const inputRef = useRef("");

  useEffect(() => {
    if (!storage) return;

    try {
      storage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch {
      console.log("Failed to save todos to local storage.");
    }
  }, [todos]);

  const handleInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    inputRef.current = e.target.value;
    setInput(e.target.value);
  };

  const addTodo = useCallback(() => {
    const value = inputRef.current.trim();
    if (value === "") return;
    setTodos((prev) => [...prev, value]);
    setInput("");
  }, []);

  const removeTodo = useCallback((index: number) => {
    setTodos((prev) => prev.filter((_, i) => i !== index));
  }, []);

  return (
    <div>
      <h2>Todo List</h2>
      <input
        value={input}
        onChange={handleInputChanged}
        placeholder="Add todo"
      />
      <Button onClick={addTodo} label="Add" disabled={false} />

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <TodoItem todo={todo} index={index} removeTodo={removeTodo} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
