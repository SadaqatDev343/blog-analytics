import { Routes, Route, Navigate } from 'react-router-dom';
import SignIn from '../pages/Auth/SignIn';
import SignUp from '../pages/Auth/SignUp';
import Dashboard from '../pages/Dashboard';

import AddPost from '../pages/Posts/AddPost';
import ProtectedRoute from './ProtectedRoute';
import PostDetail from '../pages/Posts/PostDetail';

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
        path='/post/:id'
        element={
          <ProtectedRoute>
            <PostDetail />
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
