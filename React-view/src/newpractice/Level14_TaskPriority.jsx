import React, { useState } from 'react';

function Level14_TaskPriority() {
    const [tasks, setTasks] = useState([]);
    const [taskName, setTaskName] = useState('');
    const [priority, setPriority] = useState('medium');

    const addTask = () => {
        if (taskName.trim() === '') return;
        const newTask = {
            id: Date.now(),
            name: taskName,
            priority,
            completed: false,
            date: new Date().toLocaleDateString('ja-JP')
        };
        setTasks([...tasks, newTask]);
        setTaskName('');
    };

    const toggleComplete = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return '#ff4444';
            case 'medium': return '#ffaa00';
            case 'low': return '#44ff44';
            default: return '#ccc';
        }
    };

    const sortedTasks = [...tasks].sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    return (
        <div style={{ padding: '20px' }}>
            <h1>Level 14: タスク管理（優先度付き）</h1>
            <div>
                <input
                    type="text"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    placeholder="タスク名"
                />
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="high">高</option>
                    <option value="medium">中</option>
                    <option value="low">低</option>
                </select>
                <button onClick={addTask}>追加</button>
            </div>
            <div style={{ marginTop: '20px' }}>
                {sortedTasks.map(task => (
                    <div
                        key={task.id}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '10px',
                            marginBottom: '10px',
                            border: `2px solid ${getPriorityColor(task.priority)}`,
                            backgroundColor: task.completed ? '#f0f0f0' : 'white'
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleComplete(task.id)}
                        />
                        <span style={{
                            flex: 1,
                            marginLeft: '10px',
                            textDecoration: task.completed ? 'line-through' : 'none'
                        }}>
                            {task.name} ({task.date})
                        </span>
                        <span style={{
                            padding: '2px 8px',
                            backgroundColor: getPriorityColor(task.priority),
                            color: 'white',
                            borderRadius: '3px',
                            fontSize: '12px',
                            marginRight: '10px'
                        }}>
                            {task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低'}
                        </span>
                        <button onClick={() => deleteTask(task.id)}>削除</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Level14_TaskPriority;

