import React, { useState } from 'react';

function Level03_TodoFilter() {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');
    const [filter, setFilter] = useState('all');

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

    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });

    return (
        <div style={{ padding: '20px' }}>
            <h1>Level 3: フィルター機能付きTodo</h1>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="新しいタスク"
            />
            <button onClick={addTodo}>追加</button>
            <div style={{ margin: '10px 0' }}>
                <button onClick={() => setFilter('all')}>すべて</button>
                <button onClick={() => setFilter('active')}>未完了</button>
                <button onClick={() => setFilter('completed')}>完了済み</button>
            </div>
            <ul>
                {filteredTodos.map((todo, index) => (
                    <li key={index}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleComplete(todos.indexOf(todo))}
                        />
                        <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                            {todo.text}
                        </span>
                        <button onClick={() => deleteTodo(todos.indexOf(todo))}>削除</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Level03_TodoFilter;

