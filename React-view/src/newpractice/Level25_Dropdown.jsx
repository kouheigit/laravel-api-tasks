import React, { useState, useRef, useEffect } from 'react';

function Level25_Dropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const dropdownRef = useRef(null);

    const menuItems = [
        { id: 1, label: 'ホーム', icon: '🏠' },
        { id: 2, label: 'プロフィール', icon: '👤' },
        { id: 3, label: '設定', icon: '⚙️' },
        { id: 4, label: 'メッセージ', icon: '✉️' },
        { id: 5, label: 'お知らせ', icon: '🔔' },
        { id: 6, label: 'ヘルプ', icon: '❓' },
        { id: 7, label: 'ログアウト', icon: '🚪' }
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (item) => {
        setSelectedItem(item);
        setIsOpen(false);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Level 25: ドロップダウンメニュー</h1>
            
            {selectedItem && (
                <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#e3f2fd', borderRadius: '5px' }}>
                    選択されたメニュー: {selectedItem.icon} {selectedItem.label}
                </div>
            )}

            <div style={{ position: 'relative', display: 'inline-block' }} ref={dropdownRef}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#2196F3',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '5px',
                        fontSize: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}
                >
                    <span>メニュー</span>
                    <span style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>
                        ▼
                    </span>
                </button>

                {isOpen && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            marginTop: '5px',
                            backgroundColor: 'white',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                            minWidth: '200px',
                            zIndex: 1000
                        }}
                    >
                        {menuItems.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => handleSelect(item)}
                                style={{
                                    padding: '12px 20px',
                                    cursor: 'pointer',
                                    borderBottom: item.id === menuItems.length ? 'none' : '1px solid #f0f0f0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    backgroundColor: selectedItem?.id === item.id ? '#e3f2fd' : 'white'
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = selectedItem?.id === item.id ? '#e3f2fd' : 'white'}
                            >
                                <span>{item.icon}</span>
                                <span>{item.label}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Level25_Dropdown;

