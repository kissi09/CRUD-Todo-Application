import React from 'react';
import TodoApp from './components/TodoApp';
import styles from './styles/App.module.css';
function App() {
  return (
    <div className={styles.container}>
      <h1>Kissi&apos;s Todo App</h1>
      <TodoApp />
    </div>
  );
}
export default App;
