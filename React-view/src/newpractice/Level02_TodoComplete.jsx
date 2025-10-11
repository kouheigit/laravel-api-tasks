import React, { useState } from 'react';

function Level02_TodoComplete() {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');

    const addTodo = () => {
        if (input.trim() === '') return;
        setTodos([...todos, { text: input, completed: false }]);
        setInput('');
    };

    const toggleComplete = (index) => {
        const newTodos = [...todos];
        newTodos[index].completed = !newTodos[index].completed;
        setTodos(newTodos);
    };

    const deleteTodo = (index) => {
        setTodos(todos.filter((_, i) => i !== index));
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Level 2: Todo完了機能</h1>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="新しいタスク"
            />
            <button onClick={addTodo}>追加</button>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleComplete(index)}
                        />
                        <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                            {todo.text}
                        </span>
                        <button onClick={() => deleteTodo(index)}>削除</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Level02_TodoComplete;

