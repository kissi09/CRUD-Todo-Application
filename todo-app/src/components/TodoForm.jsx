import React, { useState, useEffect } from 'react';
import styles from '../styles/App.module.css'; // ✅ Correct import

export default function TodoForm({
  onAdd,
  editId,
  initialText = '',
  onUpdate,
}) {
  const [text, setText] = useState(initialText);

  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    if (editId) {
      onUpdate(editId, trimmed);
    } else {
      onAdd(trimmed);
    }

    setText('');
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        autoFocus
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        {editId ? 'Update' : 'Add'}
      </button>
    </form>
  );
}
