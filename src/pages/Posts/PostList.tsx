import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePosts, useDeletePost } from '../../api/postApi';

export default function PostList() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const deletePost = useDeletePost();

  const { data, isLoading, isError } = usePosts(page, search);
  const posts = data?.data || [];
  const totalPages = Math.ceil((data?.total || 0) / (data?.limit || 5));

  if (isLoading) return <p>Loading blogs...</p>;
  if (isError) return <p>Something went wrong while fetching blogs</p>;
  console.log('post', posts);

  return (
    <div>
      <h2 className='text-xl font-bold mb-4'>All Blogs</h2>

      {/* Search */}
      <input
        type='text'
        placeholder='Search blogs...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='border px-3 py-2 rounded mb-4 w-full'
      />

      {posts.length === 0 ? (
        <p>No blogs yet</p>
      ) : (
        posts.map((post: any) => (
          <div
            key={post._id}
            className='border rounded p-4 mb-2 shadow-sm flex justify-between'
          >
            <div>
              {/* Title as Link to PostDetail */}
              <Link
                to={`/post/${post._id}`}
                className='text-lg font-semibold text-blue-500 hover:underline'
              >
                {post.title}
              </Link>
              <p className='text-gray-600'>{post.content}</p>
              <p className='text-sm text-gray-500 mt-2'>
                By {post.author?.name} ({post.author?.email})
              </p>
            </div>

            <button
              onClick={() => deletePost.mutate(post._id)}
              className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'
            >
              Delete
            </button>
          </div>
        ))
      )}

      {/* Pagination */}
      <div className='flex justify-between items-center mt-4'>
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className='px-3 py-1 bg-gray-200 rounded disabled:opacity-50'
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages || 1}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className='px-3 py-1 bg-gray-200 rounded disabled:opacity-50'
        >
          Next
        </button>
      </div>
    </div>
  );
}
