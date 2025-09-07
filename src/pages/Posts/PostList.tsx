import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePosts, useDeletePost, useUpdatePost } from '../../api/postApi';
import { useAuth } from '../../hooks/useAuth';

export default function PostList() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const deletePost = useDeletePost();
  const updatePost = useUpdatePost();
  const { user } = useAuth();

  const [editingPost, setEditingPost] = useState<null | string>(null);
  const [editData, setEditData] = useState({ title: '', content: '' });

  const handleEditClick = (post: any) => {
    setEditingPost(post._id);
    setEditData({ title: post.title, content: post.content });
  };

  const handleSave = (id: string) => {
    updatePost.mutate(
      { id, data: editData },
      {
        onSuccess: () => {
          setEditingPost(null);
        },
      }
    );
  };

  const { data, isLoading, isError } = usePosts(page, search);
  const posts = data?.data || [];
  const currentPage = data?.page || 1;
  const totalPages = data?.totalPages || 1;

  if (isLoading) return <p>Loading blogs...</p>;
  if (isError) return <p>Something went wrong while fetching blogs</p>;

  return (
    <div>
      <h2 className='text-xl font-bold mb-4'>All Blogs</h2>

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
            className='border rounded p-4 mb-2 shadow-sm flex justify-between items-start'
          >
            <div className='flex-1'>
              {editingPost === post._id ? (
                <div className='flex flex-col gap-2'>
                  <input
                    type='text'
                    value={editData.title}
                    onChange={(e) =>
                      setEditData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className='border px-2 py-1 rounded'
                  />
                  <textarea
                    value={editData.content}
                    onChange={(e) =>
                      setEditData((prev) => ({
                        ...prev,
                        content: e.target.value,
                      }))
                    }
                    className='border px-2 py-1 rounded'
                    rows={3}
                  />
                  <div className='flex gap-2'>
                    <button
                      onClick={() => handleSave(post._id)}
                      className='bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600'
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingPost(null)}
                      className='bg-gray-300 px-3 py-1 rounded hover:bg-gray-400'
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
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
                </>
              )}
            </div>

            {post.author?._id === user?.id && (
              <div className='flex flex-col gap-2 ml-4'>
                <button
                  onClick={() => deletePost.mutate(post._id)}
                  className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'
                >
                  Delete
                </button>
                {editingPost !== post._id && (
                  <button
                    onClick={() => handleEditClick(post)}
                    className='bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600'
                  >
                    Edit
                  </button>
                )}
              </div>
            )}
          </div>
        ))
      )}

      <div className='flex justify-between items-center mt-4'>
        <button
          disabled={currentPage <= 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className='px-3 py-1 bg-gray-200 rounded disabled:opacity-50'
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage >= totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          className='px-3 py-1 bg-gray-200 rounded disabled:opacity-50'
        >
          Next
        </button>
      </div>
    </div>
  );
}
