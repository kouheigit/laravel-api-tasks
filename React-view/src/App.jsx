import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Login from './pages/Login';
import BookList from './pages/BookList';
import HelloPage from './component/HelloPage';
import Todo from './practice/Todo';
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

  const token = localStorage.getItem('token');
  const isAuthenticated = !!user || !!token;

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
      <Route path="/" element={isAuthenticated ? <BookList /> : <Navigate to="/login" />} />
      <Route path="/practice/todo" element={<Todo />} />
      <Route path="/hello" element={isAuthenticated ? <HelloPage /> : <Navigate to="/login" />} />
      <Route path="/task-notes" element={isAuthenticated ? <TaskNoteList /> : <Navigate to="/login" />} />
      <Route path="/task-notes/new" element={isAuthenticated ? <TaskNoteForm /> : <Navigate to="/login" />} />
      <Route path="/task-notes/:id" element={isAuthenticated ? <TaskNoteDetail /> : <Navigate to="/login" />} />
      <Route path="/task-notes/:id/edit" element={isAuthenticated ? <TaskNoteForm /> : <Navigate to="/login" />} />
    </Routes>
  );
};

export default App;