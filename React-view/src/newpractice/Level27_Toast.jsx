import React, { useState } from 'react';

function Level27_Toast() {
    const [toasts, setToasts] = useState([]);

    const addToast = (message, type) => {
        const newToast = {
            id: Date.now(),
            message,
            type
        };
        setToasts([...toasts, newToast]);

        setTimeout(() => {
            removeToast(newToast.id);
        }, 3000);
    };

    const removeToast = (id) => {
        setToasts(toasts => toasts.filter(toast => toast.id !== id));
    };

    const getToastStyle = (type) => {
        const baseStyle = {
            padding: '15px 20px',
            marginBottom: '10px',
            borderRadius: '5px',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            minWidth: '300px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            animation: 'slideIn 0.3s ease-out'
        };

        switch (type) {
            case 'success':
                return { ...baseStyle, backgroundColor: '#4CAF50' };
            case 'error':
                return { ...baseStyle, backgroundColor: '#f44336' };
            case 'warning':
                return { ...baseStyle, backgroundColor: '#ff9800' };
            case 'info':
                return { ...baseStyle, backgroundColor: '#2196F3' };
            default:
                return baseStyle;
        }
    };

    const getIcon = (type) => {
        switch (type) {
            case 'success': return '✓';
            case 'error': return '✕';
            case 'warning': return '⚠';
            case 'info': return 'ℹ';
            default: return '';
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Level 27: 通知システム（Toast）</h1>
            
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
                <button
                    onClick={() => addToast('これは成功メッセージです', 'success')}
                    style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}
                >
                    成功通知
                </button>
                <button
                    onClick={() => addToast('エラーが発生しました', 'error')}
                    style={{ padding: '10px 20px', backgroundColor: '#f44336', color: 'white', border: 'none', cursor: 'pointer' }}
                >
                    エラー通知
                </button>
                <button
                    onClick={() => addToast('警告: 注意が必要です', 'warning')}
                    style={{ padding: '10px 20px', backgroundColor: '#ff9800', color: 'white', border: 'none', cursor: 'pointer' }}
                >
                    警告通知
                </button>
                <button
                    onClick={() => addToast('新しい情報があります', 'info')}
                    style={{ padding: '10px 20px', backgroundColor: '#2196F3', color: 'white', border: 'none', cursor: 'pointer' }}
                >
                    情報通知
                </button>
            </div>

            <style>
                {`
                    @keyframes slideIn {
                        from {
                            transform: translateX(100%);
                            opacity: 0;
                        }
                        to {
                            transform: translateX(0);
                            opacity: 1;
                        }
                    }
                `}
            </style>

            <div style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: 9999
            }}>
                {toasts.map(toast => (
                    <div key={toast.id} style={getToastStyle(toast.type)}>
                        <span>
                            <span style={{ marginRight: '10px', fontSize: '20px' }}>{getIcon(toast.type)}</span>
                            {toast.message}
                        </span>
                        <button
                            onClick={() => removeToast(toast.id)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'white',
                                cursor: 'pointer',
                                fontSize: '20px',
                                marginLeft: '15px'
                            }}
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Level27_Toast;

