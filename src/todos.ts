export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
}

export const STORAGE_KEY = 'autodesk-sdlc-demo.todos';

export function createTodo(title: string, now: number = Date.now(), id: string = crypto.randomUUID()): Todo {
  return { id, title: title.trim(), completed: false, createdAt: now };
}

/** Appends a to-do. Blank or whitespace-only titles leave the list unchanged. */
export function addTodo(todos: readonly Todo[], title: string, now?: number, id?: string): Todo[] {
  if (title.trim() === '') {
    return [...todos];
  }
  return [...todos, createTodo(title, now, id)];
}

export function toggleTodo(todos: readonly Todo[], id: string): Todo[] {
  return todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
}

export function removeTodo(todos: readonly Todo[], id: string): Todo[] {
  return todos.filter((todo) => todo.id !== id);
}

export function countActive(todos: readonly Todo[]): number {
  return todos.filter((todo) => !todo.completed).length;
}

function isTodo(value: unknown): value is Todo {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.title === 'string' &&
    typeof candidate.completed === 'boolean' &&
    typeof candidate.createdAt === 'number'
  );
}

/**
 * Reads saved to-dos. Missing, corrupt or hand-edited storage yields an empty
 * list (or drops the malformed entries) instead of crashing the app on load.
 */
export function loadTodos(storage: Storage = window.localStorage): Todo[] {
  const raw = storage.getItem(STORAGE_KEY);
  if (raw === null) {
    return [];
  }
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isTodo) : [];
  } catch {
    return [];
  }
}

export function saveTodos(todos: readonly Todo[], storage: Storage = window.localStorage): void {
  storage.setItem(STORAGE_KEY, JSON.stringify(todos));
}
