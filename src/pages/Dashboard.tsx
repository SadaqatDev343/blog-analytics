import { useAuth } from '../hooks/useAuth';
import AddPostForm from './Posts/AddPost';
import PostList from './Posts/PostList';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {
  usePostsPerDay,
  useTopAuthors,
  useTopCommentedPosts,
} from '../api/analyticsApi';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const { logout } = useAuth();

  const { data: authors, isLoading: loadingAuthors } = useTopAuthors();
  const { data: topPosts, isLoading: loadingPosts } = useTopCommentedPosts();
  const { data: postsPerDay, isLoading: loadingPostsPerDay } = usePostsPerDay();

  const chartData = {
    labels: postsPerDay?.map((p: any) => p.date) || [],
    datasets: [
      {
        label: 'Posts per day',
        data: postsPerDay?.map((p: any) => p.count) || [],
        backgroundColor: 'rgba(37, 99, 235, 0.6)',
      },
    ],
  };

  return (
    <div className='p-6 space-y-8'>
      <div>
        <h1 className='text-2xl font-bold'>Dashboard</h1>
        <h2 className='text-xl font-semibold mb-2'>Most Commented Posts</h2>
        {loadingPosts ? (
          <p>Loading top posts...</p>
        ) : (
          <ul className='list-disc pl-5'>
            {topPosts?.map((p: any) => (
              <li key={p._id}>
                {p.title} ({p.commentCount} comments)
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className='space-y-6 mb-2'>
        {/* Top Authors */}
        <div>
          <h2 className='text-xl font-semibold mb-2'>Top Authors</h2>
          {loadingAuthors ? (
            <p>Loading top authors...</p>
          ) : (
            <table className='w-full border-collapse border'>
              <thead>
                <tr>
                  <th className='border px-2 py-1'>#</th>
                  <th className='border px-2 py-1'>Author</th>
                  <th className='border px-2 py-1'>Total Posts</th>
                </tr>
              </thead>
              <tbody>
                {authors?.map((a: any, index: number) => (
                  <tr key={a._id}>
                    <td className='border px-2 py-1'>{index + 1}</td>
                    <td className='border px-2 py-1'>{a.name}</td>
                    <td className='border px-2 py-1'>{a.totalPosts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <div>
        <h2 className='text-xl font-semibold mb-2'>Posts per Day</h2>
        {loadingPostsPerDay ? (
          <p>Loading chart...</p>
        ) : (
          <Bar data={chartData} />
        )}
      </div>

      <AddPostForm />
      <PostList />

      <div className='p-6 space-y-8 px-4 py-2'>
        <button
          onClick={logout}
          className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
        >
          Logout
        </button>
      </div>
    </div>
  );
}
