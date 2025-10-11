import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BookList from './pages/BookList';
import HelloPage from './component/HelloPage';
import Todo from './practice/Todo';
import Todo1 from './practice/Todo1';
import Todo2 from './practice/Todo2';
import Todo3 from './practice/Todo3';
import Todo4 from './practice/Todo4';
import Todo5 from './practice/Todo5';
import TodoApp from './newpractice/TodoApp';
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
      <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <Signup />} />
      <Route path="/" element={isAuthenticated ? <BookList /> : <Navigate to="/login" />} />
      <Route path="/practice/todo" element={<Todo />} />
      <Route path="/practice/todo1" element={<Todo1 />} />
      <Route path="/practice/todo2" element={<Todo2 />} />
      <Route path="/practice/todo3" element={<Todo3 />} />
      <Route path="/practice/todo4" element={<Todo4 />} />
      <Route path="/practice/todo5" element={<Todo5 />} />
        <Route path="/newpractice/todoapp" element={<TodoApp />} />
      <Route path="/hello" element={isAuthenticated ? <HelloPage /> : <Navigate to="/login" />} />
      <Route path="/task-notes" element={isAuthenticated ? <TaskNoteList /> : <Navigate to="/login" />} />
      <Route path="/task-notes/new" element={isAuthenticated ? <TaskNoteForm /> : <Navigate to="/login" />} />
      <Route path="/task-notes/:id" element={isAuthenticated ? <TaskNoteDetail /> : <Navigate to="/login" />} />
      <Route path="/task-notes/:id/edit" element={isAuthenticated ? <TaskNoteForm /> : <Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
