import { useState, type FormEvent } from 'react';
import { countActive } from './todos.ts';
import { useTodos } from './useTodos.ts';

export default function App() {
  const { todos, add, toggle, remove } = useTodos();
  const [draft, setDraft] = useState('');
  const activeCount = countActive(todos);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (draft.trim() === '') {
      return;
    }
    add(draft);
    setDraft('');
  }

  return (
    <main className="app">
      <h1>To-dos</h1>

      <form className="new-todo" onSubmit={handleSubmit}>
        <label htmlFor="new-todo-input" className="visually-hidden">
          New to-do
        </label>
        <input
          id="new-todo-input"
          type="text"
          placeholder="What needs doing?"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          autoComplete="off"
        />
        <button type="submit">Add</button>
      </form>

      {todos.length === 0 ? (
        <p className="empty">Nothing to do yet.</p>
      ) : (
        <ul className="todo-list" aria-label="To-do list">
          {todos.map((todo) => (
            <li key={todo.id} className={todo.completed ? 'todo completed' : 'todo'}>
              <label>
                <input type="checkbox" checked={todo.completed} onChange={() => toggle(todo.id)} />
                <span className="todo-title">{todo.title}</span>
              </label>
              <button type="button" className="delete" aria-label={`Delete ${todo.title}`} onClick={() => remove(todo.id)}>
                ×
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className="summary" role="status">
        {activeCount} {activeCount === 1 ? 'item' : 'items'} left
      </p>
    </main>
  );
}
