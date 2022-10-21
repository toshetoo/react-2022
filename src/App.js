import './App.scss';
import { Layout } from './components/layout/Layout';
import { Routes, Route } from 'react-router';
import { UsersList } from './components/users/users-list/UsersList';
import { UserForm } from './components/users/user-form/UserForm';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route path="users" element={<UsersList />} />
          <Route path="users/create" element={<UserForm />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
