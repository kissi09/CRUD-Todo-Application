import React, { useReducer } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import styles from '../styles/App.module.css';

const ACTIONS = {
  ADD: 'add',
  TOGGLE: 'toggle',
  DELETE: 'delete',
  UPDATE: 'update',
};

function reducer(todos, action) {
  switch (action.type) {
    case ACTIONS.ADD:
      return [...todos, action.payload];
    case ACTIONS.TOGGLE:
      return todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case ACTIONS.UPDATE:
      return todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text }
          : todo
      );
    case ACTIONS.DELETE:
      return todos.filter((todo) => todo.id !== action.payload.id);
    default:
      return todos;
  }
}
export default function TodoApp() {
  const [storedTodos, setStoredTodos] = useLocalStorage('todos', []);
  const [todos, dispatch] = useReducer(reducer, storedTodos);
  // Sync reducer state to local storage
  React.useEffect(() => {
    setStoredTodos(todos);
  }, [todos, setStoredTodos]);
  function addTodo(text) {
    dispatch({
      type: ACTIONS.ADD,
      payload: { id: Date.now(), text, completed: false },
    });
  }
  function toggleTodo(id) {
    dispatch({ type: ACTIONS.TOGGLE, payload: { id } });
  }
  function updateTodo(id, text) {
    dispatch({ type: ACTIONS.UPDATE, payload: { id, text } });
  }
  function deleteTodo(id) {
    dispatch({ type: ACTIONS.DELETE, payload: { id } });
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Todo App</h1>
      <TodoForm onAdd={addTodo} />
      <TodoList
        todos={todos}
        onToggle={toggleTodo}
        onUpdate={updateTodo}
        onDelete={deleteTodo}
      />
    </div>
  );
}
