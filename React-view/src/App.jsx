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
import Level3 from './training/Level3';
import TaskNoteList from './component/TaskNoteList';
import TaskNoteForm from './component/TaskNoteForm';
import TaskNoteDetail from './component/TaskNoteDetail';

// Level 2-10
import Level02 from './newpractice/Level02_TodoComplete';
import Level03 from './newpractice/Level03_TodoFilter';
import Level04 from './newpractice/Level04_Counter';
import Level05 from './newpractice/Level05_NotePad';
import Level06 from './newpractice/Level06_Timer';
import Level07 from './newpractice/Level07_Calculator';
import Level08 from './newpractice/Level08_ShoppingList';
import Level09 from './newpractice/Level09_ColorPicker';
import Level10 from './newpractice/Level10_Quiz';

// Level 11-20
import Level11 from './newpractice/Level11_Weather';
import Level12 from './newpractice/Level12_Voting';
import Level13 from './newpractice/Level13_Gallery';
import Level14 from './newpractice/Level14_TaskPriority';
import Level15 from './newpractice/Level15_SearchFilter';
import Level16 from './newpractice/Level16_Countdown';
import Level17 from './newpractice/Level17_FormValidation';
import Level18 from './newpractice/Level18_DragDrop';
import Level19 from './newpractice/Level19_MarkdownPreview';
import Level20 from './newpractice/Level20_Pagination';

// Level 21-30
import Level21 from './newpractice/Level21_Tabs';
import Level22 from './newpractice/Level22_Modal';
import Level23 from './newpractice/Level23_Accordion';
import Level24 from './newpractice/Level24_Carousel';
import Level25 from './newpractice/Level25_Dropdown';
import Level26 from './newpractice/Level26_ProgressBar';
import Level27 from './newpractice/Level27_Toast';
import Level28 from './newpractice/Level28_StepForm';
import Level29 from './newpractice/Level29_DataTable';
import Level30 from './newpractice/Level30_Chat';

// Level 31-40
import Level31 from './newpractice/Level31_FileUpload';
import Level32 from './newpractice/Level32_Calendar';
import Level33 from './newpractice/Level33_Kanban';
import Level34 from './newpractice/Level34_StarRating';
import Level35 from './newpractice/Level35_DarkMode';
import Level36 from './newpractice/Level36_Breadcrumb';
import Level37 from './newpractice/Level37_InfiniteScroll';
import Level38 from './newpractice/Level38_TreeView';
import Level39 from './newpractice/Level39_VirtualKeyboard';
import Level40 from './newpractice/Level40_MusicPlayer';

// Level 41-50
import Level41 from './newpractice/Level41_AutoComplete';
import Level42 from './newpractice/Level42_Stopwatch';
import Level43 from './newpractice/Level43_Graph';
import Level44 from './newpractice/Level44_QRCode';
import Level45 from './newpractice/Level45_Snake';
import Level46 from './newpractice/Level46_Memory';
import Level47 from './newpractice/Level47_TicTacToe';
import Level48 from './newpractice/Level48_Sudoku';
import Level49 from './newpractice/Level49_DrawingApp';
import Level50 from './newpractice/Level50_Dashboard';

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

      {/* Practice Todos */}
      <Route path="/practice/todo" element={<Todo />} />
      <Route path="/practice/todo1" element={<Todo1 />} />
      <Route path="/practice/todo2" element={<Todo2 />} />
      <Route path="/practice/todo3" element={<Todo3 />} />
      <Route path="/practice/todo4" element={<Todo4 />} />
      <Route path="/practice/todo5" element={<Todo5 />} />

      {/* New Practice - Level 1-10 */}
      <Route path="/newpractice/todoapp" element={<TodoApp />} />
      <Route path="/newpractice/level02" element={<Level02 />} />
      <Route path="/newpractice/level03" element={<Level03 />} />
      <Route path="/newpractice/level04" element={<Level04 />} />
      <Route path="/newpractice/level05" element={<Level05 />} />
      <Route path="/newpractice/level06" element={<Level06 />} />
      <Route path="/newpractice/level07" element={<Level07 />} />
      <Route path="/newpractice/level08" element={<Level08 />} />
      <Route path="/newpractice/level09" element={<Level09 />} />
      <Route path="/newpractice/level10" element={<Level10 />} />

      {/* Level 11-20 */}
      <Route path="/newpractice/level11" element={<Level11 />} />
      <Route path="/newpractice/level12" element={<Level12 />} />
      <Route path="/newpractice/level13" element={<Level13 />} />
      <Route path="/newpractice/level14" element={<Level14 />} />
      <Route path="/newpractice/level15" element={<Level15 />} />
      <Route path="/newpractice/level16" element={<Level16 />} />
      <Route path="/newpractice/level17" element={<Level17 />} />
      <Route path="/newpractice/level18" element={<Level18 />} />
      <Route path="/newpractice/level19" element={<Level19 />} />
      <Route path="/newpractice/level20" element={<Level20 />} />

      {/* Level 21-30 */}
      <Route path="/newpractice/level21" element={<Level21 />} />
      <Route path="/newpractice/level22" element={<Level22 />} />
      <Route path="/newpractice/level23" element={<Level23 />} />
      <Route path="/newpractice/level24" element={<Level24 />} />
      <Route path="/newpractice/level25" element={<Level25 />} />
      <Route path="/newpractice/level26" element={<Level26 />} />
      <Route path="/newpractice/level27" element={<Level27 />} />
      <Route path="/newpractice/level28" element={<Level28 />} />
      <Route path="/newpractice/level29" element={<Level29 />} />
      <Route path="/newpractice/level30" element={<Level30 />} />

      {/* Level 31-40 */}
      <Route path="/newpractice/level31" element={<Level31 />} />
      <Route path="/newpractice/level32" element={<Level32 />} />
      <Route path="/newpractice/level33" element={<Level33 />} />
      <Route path="/newpractice/level34" element={<Level34 />} />
      <Route path="/newpractice/level35" element={<Level35 />} />
      <Route path="/newpractice/level36" element={<Level36 />} />
      <Route path="/newpractice/level37" element={<Level37 />} />
      <Route path="/newpractice/level38" element={<Level38 />} />
      <Route path="/newpractice/level39" element={<Level39 />} />
      <Route path="/newpractice/level40" element={<Level40 />} />

      {/* Level 41-50 */}
      <Route path="/newpractice/level41" element={<Level41 />} />
      <Route path="/newpractice/level42" element={<Level42 />} />
      <Route path="/newpractice/level43" element={<Level43 />} />
      <Route path="/newpractice/level44" element={<Level44 />} />
      <Route path="/newpractice/level45" element={<Level45 />} />
      <Route path="/newpractice/level46" element={<Level46 />} />
      <Route path="/newpractice/level47" element={<Level47 />} />
      <Route path="/newpractice/level48" element={<Level48 />} />
      <Route path="/newpractice/level49" element={<Level49 />} />
      <Route path="/newpractice/level50" element={<Level50 />} />

      {/* Other Pages */}
      <Route path="/hello" element={isAuthenticated ? <HelloPage /> : <Navigate to="/login" />} />
      <Route path="/task-notes" element={isAuthenticated ? <TaskNoteList /> : <Navigate to="/login" />} />
      <Route path="/task-notes/new" element={isAuthenticated ? <TaskNoteForm /> : <Navigate to="/login" />} />
      <Route path="/task-notes/:id" element={isAuthenticated ? <TaskNoteDetail /> : <Navigate to="/login" />} />
      <Route path="/task-notes/:id/edit" element={isAuthenticated ? <TaskNoteForm /> : <Navigate to="/login" />} />
        <Route path="/training/Level3" element={<Level3/>} />
    </Routes>
  );
};

export default App;
