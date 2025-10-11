import React, { useState, useRef, useEffect } from 'react';

function Level30_Chat() {
    const [messages, setMessages] = useState([
        { id: 1, user: 'システム', text: 'チャットルームへようこそ！', timestamp: new Date(), isSystem: true }
    ]);
    const [inputText, setInputText] = useState('');
    const [username, setUsername] = useState('ユーザー1');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = () => {
        if (inputText.trim() === '') return;

        const newMessage = {
            id: Date.now(),
            user: username,
            text: inputText,
            timestamp: new Date(),
            isSystem: false
        };

        setMessages([...messages, newMessage]);
        setInputText('');

        // 自動返信のシミュレーション
        setTimeout(() => {
            const botMessage = {
                id: Date.now() + 1,
                user: 'Bot',
                text: `「${inputText}」というメッセージを受け取りました！`,
                timestamp: new Date(),
                isSystem: false,
                isBot: true
            };
            setMessages(msgs => [...msgs, botMessage]);
        }, 1000);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Level 30: リアルタイムチャット</h1>
            
            <div style={{ marginBottom: '10px' }}>
                <label>ユーザー名: </label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ padding: '5px', marginLeft: '10px' }}
                />
            </div>

            <div style={{
                height: '400px',
                backgroundColor: '#f5f5f5',
                border: '1px solid #ccc',
                borderRadius: '10px 10px 0 0',
                overflowY: 'auto',
                padding: '20px'
            }}>
                {messages.map(message => (
                    <div
                        key={message.id}
                        style={{
                            marginBottom: '15px',
                            textAlign: message.isSystem ? 'center' : (message.isBot ? 'left' : 'right')
                        }}
                    >
                        {message.isSystem ? (
                            <div style={{
                                backgroundColor: '#e3f2fd',
                                padding: '5px 10px',
                                borderRadius: '15px',
                                display: 'inline-block',
                                fontSize: '12px',
                                color: '#666'
                            }}>
                                {message.text}
                            </div>
                        ) : (
                            <div style={{
                                display: 'inline-block',
                                maxWidth: '70%',
                                textAlign: 'left'
                            }}>
                                <div style={{ fontSize: '12px', color: '#666', marginBottom: '3px' }}>
                                    {message.user} - {formatTime(message.timestamp)}
                                </div>
                                <div style={{
                                    backgroundColor: message.isBot ? '#fff' : '#2196F3',
                                    color: message.isBot ? '#000' : '#fff',
                                    padding: '10px 15px',
                                    borderRadius: '15px',
                                    wordBreak: 'break-word',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                }}>
                                    {message.text}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div style={{
                display: 'flex',
                backgroundColor: 'white',
                border: '1px solid #ccc',
                borderTop: 'none',
                borderRadius: '0 0 10px 10px',
                padding: '10px'
            }}>
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="メッセージを入力..."
                    style={{
                        flex: 1,
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '20px',
                        marginRight: '10px'
                    }}
                />
                <button
                    onClick={sendMessage}
                    style={{
                        padding: '10px 25px',
                        backgroundColor: '#2196F3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    送信
                </button>
            </div>
        </div>
    );
}

export default Level30_Chat;

