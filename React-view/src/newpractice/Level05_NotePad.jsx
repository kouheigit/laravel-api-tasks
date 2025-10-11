import React, { useState } from 'react';

function Level05_NotePad() {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const addNote = () => {
        if (title.trim() === '' || content.trim() === '') return;
        const newNote = {
            id: Date.now(),
            title,
            content,
            date: new Date().toLocaleString('ja-JP')
        };
        setNotes([newNote, ...notes]);
        setTitle('');
        setContent('');
    };

    const deleteNote = (id) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Level 5: メモ帳アプリ</h1>
            <div>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="タイトル"
                    style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="内容"
                    style={{ width: '100%', height: '100px', padding: '5px' }}
                />
                <button onClick={addNote} style={{ marginTop: '10px' }}>メモを追加</button>
            </div>
            <div style={{ marginTop: '20px' }}>
                {notes.map(note => (
                    <div key={note.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                        <h3>{note.title}</h3>
                        <p>{note.content}</p>
                        <small>{note.date}</small>
                        <button onClick={() => deleteNote(note.id)} style={{ marginLeft: '10px' }}>削除</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Level05_NotePad;

