import { useState } from 'react';
import { useAddPost } from '../../api/postApi';
import { useAuth } from '../../hooks/useAuth';

export default function AddPostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { user } = useAuth();
  const addPost = useAddPost();
  console.log(user, '--------------user');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) {
      alert('You must be logged in to post');
      return;
    }
    addPost.mutate({ title, content, author: user.id });
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className='mb-6'>
      <h2 className='text-xl font-bold mb-4'>Create New Blog</h2>
      <input
        type='text'
        placeholder='Title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className='border rounded w-full p-2 mb-2'
        required
      />
      <textarea
        placeholder='Content'
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className='border rounded w-full p-2 mb-2'
        required
      />
      <button
        type='submit'
        className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
        disabled={addPost.isPending}
      >
        {addPost.isPending ? 'Posting...' : 'Add Post'}
      </button>
    </form>
  );
}
