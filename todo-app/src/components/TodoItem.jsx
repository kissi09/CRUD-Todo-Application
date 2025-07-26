import React from 'react';
import styles from '../styles/App.module.css'; 

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  return (
    <li className={styles.todoItem}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span className={todo.completed ? styles.completed : ''}>
        {todo.text}
      </span>
      <button onClick={onEdit}>Edit</button>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
}
