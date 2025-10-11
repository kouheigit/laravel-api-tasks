import React, { useState } from 'react';

function Level23_Accordion() {
    const [openIndex, setOpenIndex] = useState(null);

    const items = [
        {
            title: 'Reactとは何ですか？',
            content: 'Reactは、Facebookが開発したJavaScriptライブラリで、ユーザーインターフェースを構築するために使用されます。コンポーネントベースのアーキテクチャを採用しています。'
        },
        {
            title: 'useStateの使い方は？',
            content: 'useStateは、関数コンポーネントで状態を管理するためのフックです。const [state, setState] = useState(initialValue)のように使用します。'
        },
        {
            title: 'useEffectとは？',
            content: 'useEffectは、副作用を実行するためのフックです。コンポーネントのレンダリング後に実行され、データの取得やDOM操作などに使用されます。'
        },
        {
            title: 'propsとstateの違いは？',
            content: 'propsは親コンポーネントから渡される読み取り専用のデータです。stateはコンポーネント内で管理される変更可能なデータです。'
        },
        {
            title: 'コンポーネントの種類は？',
            content: 'Reactには関数コンポーネントとクラスコンポーネントがあります。現在は関数コンポーネントとフックの使用が推奨されています。'
        }
    ];

    const toggleItem = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Level 23: アコーディオン</h1>
            <div style={{ marginTop: '20px' }}>
                {items.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            marginBottom: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            overflow: 'hidden'
                        }}
                    >
                        <div
                            onClick={() => toggleItem(index)}
                            style={{
                                padding: '15px',
                                backgroundColor: openIndex === index ? '#2196F3' : '#f5f5f5',
                                color: openIndex === index ? 'white' : 'black',
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                fontWeight: 'bold'
                            }}
                        >
                            <span>{item.title}</span>
                            <span style={{ fontSize: '20px' }}>
                                {openIndex === index ? '−' : '+'}
                            </span>
                        </div>
                        {openIndex === index && (
                            <div
                                style={{
                                    padding: '15px',
                                    backgroundColor: 'white',
                                    borderTop: '1px solid #ccc'
                                }}
                            >
                                {item.content}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Level23_Accordion;

