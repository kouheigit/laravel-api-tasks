import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Login from './pages/Login';
import BookList from './pages/BookList';
import HelloPage from './component/HelloPage';
import TaskNoteList from './component/TaskNoteList';
import TaskNoteForm from './component/TaskNoteForm';
import TaskNoteDetail from './component/TaskNoteDetail';

const App = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
          <div style={{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5'
      }}>
        <p>読み込み中...</p>
            </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      <Route path="/" element={user ? <BookList /> : <Navigate to="/login" />} />
      <Route path="/hello" element={user ? <HelloPage /> : <Navigate to="/login" />} />
      <Route path="/task-notes" element={user ? <TaskNoteList /> : <Navigate to="/login" />} />
      <Route path="/task-notes/new" element={user ? <TaskNoteForm /> : <Navigate to="/login" />} />
      <Route path="/task-notes/:id" element={user ? <TaskNoteDetail /> : <Navigate to="/login" />} />
      <Route path="/task-notes/:id/edit" element={user ? <TaskNoteForm /> : <Navigate to="/login" />} />
    </Routes>
  );
};

export default App;