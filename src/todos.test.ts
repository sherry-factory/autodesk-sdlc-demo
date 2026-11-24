import { describe, expect, it } from 'vitest';
import { STORAGE_KEY, addTodo, countActive, loadTodos, removeTodo, saveTodos, toggleTodo, type Todo } from './todos.ts';

const milk: Todo = { id: 'a', title: 'Buy milk', completed: false, createdAt: 1 };
const walk: Todo = { id: 'b', title: 'Walk the dog', completed: true, createdAt: 2 };

describe('addTodo', () => {
  it('appends a trimmed, active to-do', () => {
    const result = addTodo([milk], '  Write report  ', 3, 'c');
    expect(result).toEqual([milk, { id: 'c', title: 'Write report', completed: false, createdAt: 3 }]);
  });

  it('ignores blank titles', () => {
    expect(addTodo([milk], '   ')).toEqual([milk]);
  });

  it('does not mutate the input list', () => {
    const todos = [milk];
    addTodo(todos, 'Another');
    expect(todos).toEqual([milk]);
  });
});

describe('toggleTodo', () => {
  it('flips only the matching to-do', () => {
    expect(toggleTodo([milk, walk], 'a')).toEqual([{ ...milk, completed: true }, walk]);
    expect(toggleTodo([milk, walk], 'b')).toEqual([milk, { ...walk, completed: false }]);
  });
});

describe('removeTodo', () => {
  it('removes the matching to-do', () => {
    expect(removeTodo([milk, walk], 'a')).toEqual([walk]);
  });
});

describe('countActive', () => {
  it('counts to-dos that are not completed', () => {
    expect(countActive([milk, walk])).toBe(1);
  });
});

describe('localStorage persistence', () => {
  it('round-trips saved to-dos', () => {
    saveTodos([milk, walk]);
    expect(loadTodos()).toEqual([milk, walk]);
  });

  it('returns an empty list when nothing is saved', () => {
    expect(loadTodos()).toEqual([]);
  });

  it('returns an empty list for corrupt JSON', () => {
    window.localStorage.setItem(STORAGE_KEY, '{not json');
    expect(loadTodos()).toEqual([]);
  });

  it('returns an empty list when the saved value is not an array', () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ id: 'a' }));
    expect(loadTodos()).toEqual([]);
  });

  it('drops malformed entries and keeps valid ones', () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([milk, { id: 'x', title: 7 }, null]));
    expect(loadTodos()).toEqual([milk]);
  });
});
