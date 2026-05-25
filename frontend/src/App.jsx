import { useState, useEffect } from 'react';

const API = '/api/todos';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => { fetchTodos(); }, []);

  async function fetchTodos() {
    const res = await fetch(API);
    setTodos(await res.json());
  }

  async function addTodo(e) {
    e.preventDefault();
    if (!title.trim()) return;
    await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title }) });
    setTitle('');
    fetchTodos();
  }

  async function toggleTodo(id, completed) {
    await fetch(`${API}/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ completed: !completed }) });
    fetchTodos();
  }

  async function deleteTodo(id) {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    fetchTodos();
  }

  return (
    <div className="container">
      <h1>Todo</h1>
      <form onSubmit={addTodo}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Add a todo..." />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'done' : ''}>
            <span onClick={() => toggleTodo(todo.id, todo.completed)}>{todo.title}</span>
            <button onClick={() => deleteTodo(todo.id)}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
