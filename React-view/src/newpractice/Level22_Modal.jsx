import React, { useState } from 'react';

function Level22_Modal() {
    const [isOpen, setIsOpen] = useState(false);
    const [modalType, setModalType] = useState('info');

    const openModal = (type) => {
        setModalType(type);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const getModalContent = () => {
        switch (modalType) {
            case 'info':
                return {
                    title: '情報',
                    content: 'これは情報モーダルです。',
                    color: '#2196F3'
                };
            case 'success':
                return {
                    title: '成功',
                    content: '操作が正常に完了しました！',
                    color: '#4CAF50'
                };
            case 'warning':
                return {
                    title: '警告',
                    content: 'この操作には注意が必要です。',
                    color: '#ff9800'
                };
            case 'error':
                return {
                    title: 'エラー',
                    content: 'エラーが発生しました。',
                    color: '#f44336'
                };
            default:
                return { title: '', content: '', color: '#000' };
        }
    };

    const modalContent = getModalContent();

    return (
        <div style={{ padding: '20px' }}>
            <h1>Level 22: モーダルダイアログ</h1>
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button onClick={() => openModal('info')} style={{ padding: '10px 20px', backgroundColor: '#2196F3', color: 'white', border: 'none', cursor: 'pointer' }}>
                    情報モーダル
                </button>
                <button onClick={() => openModal('success')} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
                    成功モーダル
                </button>
                <button onClick={() => openModal('warning')} style={{ padding: '10px 20px', backgroundColor: '#ff9800', color: 'white', border: 'none', cursor: 'pointer' }}>
                    警告モーダル
                </button>
                <button onClick={() => openModal('error')} style={{ padding: '10px 20px', backgroundColor: '#f44336', color: 'white', border: 'none', cursor: 'pointer' }}>
                    エラーモーダル
                </button>
            </div>

            {isOpen && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1000
                    }}
                    onClick={closeModal}
                >
                    <div
                        style={{
                            backgroundColor: 'white',
                            padding: '30px',
                            borderRadius: '10px',
                            maxWidth: '500px',
                            position: 'relative',
                            borderTop: `5px solid ${modalContent.color}`
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 style={{ marginTop: 0, color: modalContent.color }}>{modalContent.title}</h2>
                        <p>{modalContent.content}</p>
                        <div style={{ textAlign: 'right', marginTop: '20px' }}>
                            <button
                                onClick={closeModal}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: modalContent.color,
                                    color: 'white',
                                    border: 'none',
                                    cursor: 'pointer',
                                    borderRadius: '5px'
                                }}
                            >
                                閉じる
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Level22_Modal;

