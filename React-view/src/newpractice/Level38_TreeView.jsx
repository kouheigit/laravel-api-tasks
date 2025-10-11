import React, { useState } from 'react';

function Level38_TreeView() {
    const [expanded, setExpanded] = useState({});

    const data = {
        name: 'Root',
        children: [
            {
                name: 'フォルダ1',
                children: [
                    { name: 'ファイル1.txt' },
                    { name: 'ファイル2.txt' }
                ]
            },
            {
                name: 'フォルダ2',
                children: [
                    { name: 'ファイル3.txt' },
                    {
                        name: 'サブフォルダ',
                        children: [
                            { name: 'ファイル4.txt' }
                        ]
                    }
                ]
            }
        ]
    };

    const toggleExpand = (path) => {
        setExpanded({ ...expanded, [path]: !expanded[path] });
    };

    const TreeNode = ({ node, path = '' }) => {
        const currentPath = path + '/' + node.name;
        const hasChildren = node.children && node.children.length > 0;
        const isExpanded = expanded[currentPath];

        return (
            <div style={{ marginLeft: path ? '20px' : '0' }}>
                <div
                    onClick={() => hasChildren && toggleExpand(currentPath)}
                    style={{
                        cursor: hasChildren ? 'pointer' : 'default',
                        padding: '5px',
                        marginBottom: '5px'
                    }}
                >
                    {hasChildren && (isExpanded ? '📂' : '📁')}
                    {!hasChildren && '📄'}
                    <span style={{ marginLeft: '5px' }}>{node.name}</span>
                </div>
                {hasChildren && isExpanded && node.children.map((child, index) => (
                    <TreeNode key={index} node={child} path={currentPath} />
                ))}
            </div>
        );
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Level 38: ツリービュー</h1>
            <div style={{ marginTop: '20px', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '10px' }}>
                <TreeNode node={data} />
            </div>
        </div>
    );
}

export default Level38_TreeView;

