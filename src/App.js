import './App.scss';
import { Layout } from './components/layout/Layout';
import { Routes, Route } from 'react-router';
import { UsersList } from './components/users/users-list/UsersList';
import { UserForm } from './components/users/user-form/UserForm';
import { Login } from './components/auth/login/Login';
import { NonAuthenticatedRoute } from './utils/guards/NonAuthenticatedRoute';
import { AuthenticatedRoute } from './utils/guards/AuthenticatedRoute';
import { Register } from './components/auth/register/Register';
import { TaskForm } from './components/tasks/task-form/TaskForm';
import { TasksList } from './components/tasks/tasks-list/TasksList';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<NonAuthenticatedRoute> <Login /> </NonAuthenticatedRoute>} />
        <Route path="/register" element={<NonAuthenticatedRoute> <Register /> </NonAuthenticatedRoute>} />
        <Route path="/" element={<AuthenticatedRoute> <Layout /> </AuthenticatedRoute>} >
          <Route path="users" element={<UsersList />} />
          <Route path="users/create" element={<UserForm />} />
          <Route path="users/edit/:id" element={<UserForm />} />

          <Route path="tasks" element={<TasksList />} />
          <Route path="tasks/create" element={<TaskForm />} />
          <Route path="tasks/edit/:id" element={<TaskForm />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
