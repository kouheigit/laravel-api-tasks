import React, { useState } from 'react';

function Level31_FileUpload() {
    const [files, setFiles] = useState([]);

    const handleFileSelect = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const newFiles = selectedFiles.map(file => ({
            id: Date.now() + Math.random(),
            file,
            preview: URL.createObjectURL(file),
            name: file.name,
            size: file.size,
            type: file.type
        }));
        setFiles([...files, ...newFiles]);
    };

    const removeFile = (id) => {
        setFiles(files.filter(f => f.id !== id));
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    const handleUpload = () => {
        alert(`${files.length}個のファイルをアップロードします！\n\n` + 
            files.map(f => `- ${f.name} (${formatFileSize(f.size)})`).join('\n'));
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Level 31: ファイルアップローダー</h1>
            
            <div style={{
                border: '2px dashed #ccc',
                borderRadius: '10px',
                padding: '40px',
                textAlign: 'center',
                marginTop: '20px',
                backgroundColor: '#f9f9f9'
            }}>
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileSelect}
                    style={{ display: 'none' }}
                    id="fileInput"
                />
                <label htmlFor="fileInput" style={{
                    padding: '15px 30px',
                    backgroundColor: '#2196F3',
                    color: 'white',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    display: 'inline-block'
                }}>
                    📁 ファイルを選択
                </label>
                <p style={{ marginTop: '15px', color: '#666' }}>
                    または、ここにファイルをドラッグ&ドロップ
                </p>
            </div>

            {files.length > 0 && (
                <div style={{ marginTop: '30px' }}>
                    <h3>選択されたファイル ({files.length})</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
                        {files.map(file => (
                            <div key={file.id} style={{
                                border: '1px solid #ccc',
                                borderRadius: '10px',
                                padding: '10px',
                                position: 'relative',
                                backgroundColor: 'white'
                            }}>
                                <button
                                    onClick={() => removeFile(file.id)}
                                    style={{
                                        position: 'absolute',
                                        top: '5px',
                                        right: '5px',
                                        backgroundColor: '#f44336',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '50%',
                                        width: '25px',
                                        height: '25px',
                                        cursor: 'pointer',
                                        fontSize: '16px'
                                    }}
                                >
                                    ×
                                </button>
                                {file.type.startsWith('image/') && (
                                    <img
                                        src={file.preview}
                                        alt={file.name}
                                        style={{
                                            width: '100%',
                                            height: '150px',
                                            objectFit: 'cover',
                                            borderRadius: '5px',
                                            marginBottom: '10px'
                                        }}
                                    />
                                )}
                                <div style={{ fontSize: '12px', wordBreak: 'break-word' }}>
                                    <strong>{file.name}</strong>
                                </div>
                                <div style={{ fontSize: '11px', color: '#666', marginTop: '5px' }}>
                                    {formatFileSize(file.size)}
                                </div>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={handleUpload}
                        style={{
                            marginTop: '20px',
                            padding: '15px 30px',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: 'bold'
                        }}
                    >
                        アップロード
                    </button>
                </div>
            )}
        </div>
    );
}

export default Level31_FileUpload;

