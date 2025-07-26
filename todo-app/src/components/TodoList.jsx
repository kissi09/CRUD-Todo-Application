import React, { useState } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import styles from '../styles/App.module.css'; 
export default function TodoList({ todos, onToggle, onUpdate, onDelete }) {
const [editingId, setEditingId] = useState(null);
if (todos.length === 0) {
return <p>No tasks yet. Enjoy your free time!</p>;
}
return (
<ul className={styles.todoList}>
  {todos.map(todo =>
    editingId === todo.id ? (
      <li key={todo.id}>
        <TodoForm
          editId={todo.id}
          initialText={todo.text}
          onUpdate={id => {
            onUpdate(id, todo.text);
            setEditingId(null);
          }}
        />
      </li>
    ) : (
      <TodoItem
        key={todo.id}
        todo={todo}
        onToggle={onToggle}
        onDelete={onDelete}
        onEdit={() => setEditingId(todo.id)}
      />
    )
  )}
</ul>
);
}
