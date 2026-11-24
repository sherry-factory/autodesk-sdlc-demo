import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from './App.tsx';
import { STORAGE_KEY, loadTodos } from './todos.ts';

async function addThroughForm(title: string) {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText('New to-do'), title);
  await user.click(screen.getByRole('button', { name: 'Add' }));
  return user;
}

describe('App', () => {
  it('shows an empty state with no to-dos', () => {
    render(<App />);
    expect(screen.getByText('Nothing to do yet.')).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('0 items left');
  });

  it('adds a to-do and clears the input', async () => {
    render(<App />);
    await addThroughForm('Buy milk');

    const list = screen.getByRole('list', { name: 'To-do list' });
    expect(within(list).getByRole('checkbox', { name: 'Buy milk' })).not.toBeChecked();
    expect(screen.getByLabelText('New to-do')).toHaveValue('');
    expect(screen.getByRole('status')).toHaveTextContent('1 item left');
  });

  it('does not add a blank to-do', async () => {
    render(<App />);
    await addThroughForm('   ');
    expect(screen.queryByRole('list', { name: 'To-do list' })).not.toBeInTheDocument();
  });

  it('completes a to-do', async () => {
    render(<App />);
    const user = await addThroughForm('Buy milk');

    await user.click(screen.getByRole('checkbox', { name: 'Buy milk' }));

    expect(screen.getByRole('checkbox', { name: 'Buy milk' })).toBeChecked();
    expect(screen.getByRole('status')).toHaveTextContent('0 items left');
  });

  it('deletes a to-do', async () => {
    render(<App />);
    const user = await addThroughForm('Buy milk');

    await user.click(screen.getByRole('button', { name: 'Delete Buy milk' }));

    expect(screen.queryByRole('checkbox', { name: 'Buy milk' })).not.toBeInTheDocument();
    expect(screen.getByText('Nothing to do yet.')).toBeInTheDocument();
  });

  it('persists to localStorage and restores on the next load', async () => {
    const { unmount } = render(<App />);
    const user = await addThroughForm('Buy milk');
    await user.click(screen.getByRole('checkbox', { name: 'Buy milk' }));

    expect(window.localStorage.getItem(STORAGE_KEY)).not.toBeNull();
    expect(loadTodos()).toMatchObject([{ title: 'Buy milk', completed: true }]);

    unmount();
    render(<App />);
    expect(screen.getByRole('checkbox', { name: 'Buy milk' })).toBeChecked();
  });
});
