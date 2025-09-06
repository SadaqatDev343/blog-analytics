import { useAuth } from '../hooks/useAuth';
import AddPostForm from './Posts/AddPost';
import PostList from './Posts/PostList';

export default function Dashboard() {
  const { logout } = useAuth();

  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Dashboard</h1>
        <button
          onClick={logout}
          className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
        >
          Logout
        </button>
      </div>

      <AddPostForm />
      <PostList />
    </div>
  );
}
