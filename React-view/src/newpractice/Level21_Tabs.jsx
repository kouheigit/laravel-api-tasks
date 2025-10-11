import React, { useState } from 'react';

function Level21_Tabs() {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        {
            title: 'プロフィール',
            content: (
                <div>
                    <h3>ユーザープロフィール</h3>
                    <p>名前: 山田太郎</p>
                    <p>年齢: 25歳</p>
                    <p>職業: エンジニア</p>
                </div>
            )
        },
        {
            title: '設定',
            content: (
                <div>
                    <h3>アカウント設定</h3>
                    <label><input type="checkbox" /> メール通知を受け取る</label><br />
                    <label><input type="checkbox" /> ダークモード</label><br />
                    <label><input type="checkbox" /> 自動ログイン</label>
                </div>
            )
        },
        {
            title: '統計',
            content: (
                <div>
                    <h3>利用統計</h3>
                    <p>ログイン回数: 142回</p>
                    <p>投稿数: 58件</p>
                    <p>フォロワー: 234人</p>
                </div>
            )
        },
        {
            title: 'ヘルプ',
            content: (
                <div>
                    <h3>よくある質問</h3>
                    <p><strong>Q:</strong> パスワードを忘れた場合は？</p>
                    <p><strong>A:</strong> ログイン画面から「パスワードを忘れた」をクリックしてください。</p>
                    <p><strong>Q:</strong> アカウントを削除するには？</p>
                    <p><strong>A:</strong> 設定画面から削除できます。</p>
                </div>
            )
        }
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h1>Level 21: タブコンポーネント</h1>
            <div style={{ border: '1px solid #ccc', borderRadius: '5px', overflow: 'hidden' }}>
                <div style={{ display: 'flex', backgroundColor: '#f5f5f5' }}>
                    {tabs.map((tab, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveTab(index)}
                            style={{
                                flex: 1,
                                padding: '15px',
                                border: 'none',
                                backgroundColor: activeTab === index ? 'white' : '#f5f5f5',
                                borderBottom: activeTab === index ? 'none' : '1px solid #ccc',
                                cursor: 'pointer',
                                fontWeight: activeTab === index ? 'bold' : 'normal',
                                borderRight: index < tabs.length - 1 ? '1px solid #ccc' : 'none'
                            }}
                        >
                            {tab.title}
                        </button>
                    ))}
                </div>
                <div style={{ padding: '20px', backgroundColor: 'white' }}>
                    {tabs[activeTab].content}
                </div>
            </div>
        </div>
    );
}

export default Level21_Tabs;

