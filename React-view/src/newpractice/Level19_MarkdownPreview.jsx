import React, { useState } from 'react';

function Level19_MarkdownPreview() {
    const [markdown, setMarkdown] = useState('# タイトル\n\nここに**Markdown**を入力してください。\n\n- リスト1\n- リスト2\n\n`コード`も書けます。');

    const convertMarkdown = (text) => {
        let html = text;
        
        // 見出し
        html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
        html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
        html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
        
        // 太字
        html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
        
        // イタリック
        html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');
        
        // コード
        html = html.replace(/`(.*?)`/gim, '<code style="background:#f4f4f4;padding:2px 4px;border-radius:3px">$1</code>');
        
        // リスト
        html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
        html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
        
        // 改行
        html = html.replace(/\n/gim, '<br>');
        
        return html;
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Level 19: Markdownプレビュー</h1>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                    <h3>入力</h3>
                    <textarea
                        value={markdown}
                        onChange={(e) => setMarkdown(e.target.value)}
                        style={{ width: '100%', height: '400px', padding: '10px', fontFamily: 'monospace' }}
                    />
                </div>
                <div>
                    <h3>プレビュー</h3>
                    <div
                        style={{ 
                            border: '1px solid #ccc', 
                            padding: '10px', 
                            minHeight: '400px',
                            backgroundColor: '#f9f9f9'
                        }}
                        dangerouslySetInnerHTML={{ __html: convertMarkdown(markdown) }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Level19_MarkdownPreview;

