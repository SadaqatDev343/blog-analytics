import { useState } from 'react';
import { useAddComment } from '../../api/commentApi';
import { useAuth } from '../../hooks/useAuth'; // assuming you have auth hook

export default function AddComment({ postId }: { postId: string }) {
  const [text, setText] = useState('');
  const { user } = useAuth(); // get current user
  const addComment = useAddComment();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !user) return;

    addComment.mutate({
      blog: postId,
      comment: text,
      commentor: user.id,
    });

    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className='flex gap-2 mt-4'>
      <input
        type='text'
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='Write a comment...'
        className='border px-3 py-2 rounded flex-1'
      />
      <button
        type='submit'
        className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
      >
        Add
      </button>
    </form>
  );
}
