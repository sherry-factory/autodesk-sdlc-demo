import { useCallback, useEffect, useState } from 'react';
import { addTodo, loadTodos, removeTodo, saveTodos, toggleTodo, type Todo } from './todos.ts';

export interface UseTodos {
  todos: Todo[];
  add: (title: string) => void;
  toggle: (id: string) => void;
  remove: (id: string) => void;
}

export function useTodos(): UseTodos {
  const [todos, setTodos] = useState<Todo[]>(() => loadTodos());

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const add = useCallback((title: string) => setTodos((current) => addTodo(current, title)), []);
  const toggle = useCallback((id: string) => setTodos((current) => toggleTodo(current, id)), []);
  const remove = useCallback((id: string) => setTodos((current) => removeTodo(current, id)), []);

  return { todos, add, toggle, remove };
}
