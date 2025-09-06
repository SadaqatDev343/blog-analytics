import { useState } from 'react';
import { usePosts, useDeletePost, useUpdatePost } from '../../api/postApi';

export default function PostList() {
  const { data, isLoading, isError } = usePosts();
  const deletePost = useDeletePost();
  const updatePost = useUpdatePost();

  const [editingPost, setEditingPost] = useState<any | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  if (isLoading) return <p>Loading blogs...</p>;
  if (isError) return <p>Something went wrong while fetching blogs</p>;

  const posts = data?.data || [];

  const handleEdit = (post: any) => {
    setEditingPost(post);
    setTitle(post.title);
    setContent(post.content);
  };

  const handleUpdate = () => {
    if (!editingPost) return;
    updatePost.mutate(
      { id: editingPost._id, data: { title, content } },
      {
        onSuccess: () => {
          setEditingPost(null);
          setTitle('');
          setContent('');
        },
      }
    );
  };

  return (
    <div>
      <h2 className='text-xl font-bold mb-4'>All Blogs</h2>
      {posts.length === 0 ? (
        <p>No blogs yet</p>
      ) : (
        posts.map((post: any) => (
          <div
            key={post._id}
            className='border rounded p-4 mb-2 shadow-sm flex justify-between'
          >
            <div>
              <h3 className='text-lg font-semibold'>{post.title}</h3>
              <p className='text-gray-600'>{post.content}</p>
              <p className='text-sm text-gray-500 mt-2'>
                By {post.author?.name} ({post.author?.email})
              </p>
            </div>

            <div className='flex gap-2'>
              <button
                onClick={() => handleEdit(post)}
                className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600'
              >
                Edit
              </button>
              <button
                onClick={() => deletePost.mutate(post._id)}
                className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}

      {editingPost && (
        <div className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center'>
          <div className='bg-white p-6 rounded shadow-md w-96'>
            <h3 className='text-lg font-bold mb-3'>Edit Post</h3>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='w-full border p-2 mb-3 rounded'
              placeholder='Title'
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className='w-full border p-2 mb-3 rounded'
              placeholder='Content'
              rows={4}
            />
            <div className='flex justify-end gap-2'>
              <button
                onClick={() => setEditingPost(null)}
                className='px-3 py-1 bg-gray-400 text-white rounded'
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className='px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600'
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
