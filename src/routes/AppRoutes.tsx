import { Routes, Route, Navigate } from 'react-router-dom';
import SignIn from '../pages/Auth/SignIn';
import SignUp from '../pages/Auth/SignUp';
import Dashboard from '../pages/Dashboard';
import PostList from '../pages/Posts/PostList';
import AddPost from '../pages/Posts/AddPost';
import ProtectedRoute from './ProtectedRoute';

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path='/signin' element={<SignIn />} />
      <Route path='/signup' element={<SignUp />} />

      {/* Protected Routes */}
      <Route
        path='/dashboard'
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path='/posts'
        element={
          <ProtectedRoute>
            <PostList />
          </ProtectedRoute>
        }
      />
      <Route
        path='/posts/add'
        element={
          <ProtectedRoute>
            <AddPost />
          </ProtectedRoute>
        }
      />

      {/* Default */}
      <Route path='*' element={<Navigate to='/signin' />} />
    </Routes>
  );
}

export default AppRoutes;
