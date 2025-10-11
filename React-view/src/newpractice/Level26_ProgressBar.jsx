import React, { useState, useEffect } from 'react';

function Level26_ProgressBar() {
    const [progress, setProgress] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [tasks, setTasks] = useState([
        { id: 1, name: 'データベース設計', completed: false },
        { id: 2, name: 'API開発', completed: false },
        { id: 3, name: 'フロントエンド実装', completed: false },
        { id: 4, name: 'テスト', completed: false },
        { id: 5, name: 'デプロイ', completed: false }
    ]);

    useEffect(() => {
        if (isRunning && progress < 100) {
            const timer = setTimeout(() => {
                setProgress(progress + 1);
            }, 50);
            return () => clearTimeout(timer);
        } else if (progress >= 100) {
            setIsRunning(false);
        }
    }, [isRunning, progress]);

    const startProgress = () => {
        setIsRunning(true);
    };

    const resetProgress = () => {
        setProgress(0);
        setIsRunning(false);
    };

    const toggleTask = (id) => {
        const newTasks = tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        setTasks(newTasks);
    };

    const taskProgress = (tasks.filter(t => t.completed).length / tasks.length) * 100;

    const getProgressColor = (percent) => {
        if (percent < 30) return '#f44336';
        if (percent < 70) return '#ff9800';
        return '#4CAF50';
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h1>Level 26: プログレスバー</h1>
            
            <div style={{ marginBottom: '30px' }}>
                <h3>自動プログレスバー</h3>
                <div style={{
                    width: '100%',
                    height: '30px',
                    backgroundColor: '#e0e0e0',
                    borderRadius: '15px',
                    overflow: 'hidden',
                    position: 'relative'
                }}>
                    <div style={{
                        width: `${progress}%`,
                        height: '100%',
                        backgroundColor: getProgressColor(progress),
                        transition: 'width 0.3s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold'
                    }}>
                        {progress > 5 && `${Math.floor(progress)}%`}
                    </div>
                </div>
                <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                    <button onClick={startProgress} disabled={isRunning} style={{ padding: '10px 20px' }}>
                        開始
                    </button>
                    <button onClick={resetProgress} style={{ padding: '10px 20px' }}>
                        リセット
                    </button>
                </div>
            </div>

            <div style={{ marginTop: '30px' }}>
                <h3>タスク進捗状況</h3>
                <div style={{
                    width: '100%',
                    height: '30px',
                    backgroundColor: '#e0e0e0',
                    borderRadius: '15px',
                    overflow: 'hidden',
                    marginBottom: '20px'
                }}>
                    <div style={{
                        width: `${taskProgress}%`,
                        height: '100%',
                        backgroundColor: '#2196F3',
                        transition: 'width 0.3s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold'
                    }}>
                        {taskProgress > 5 && `${Math.floor(taskProgress)}%`}
                    </div>
                </div>
                <div>
                    {tasks.map(task => (
                        <div key={task.id} style={{ marginBottom: '10px' }}>
                            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => toggleTask(task.id)}
                                    style={{ marginRight: '10px' }}
                                />
                                <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                                    {task.name}
                                </span>
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Level26_ProgressBar;

