import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../../lib/axios';
import AddComment from './AddComment';

interface ICommentor {
  _id: string;
  name: string;
  email: string;
}

interface IComment {
  _id: string;
  comment: string;
  commentor: ICommentor;
  createdAt: string;
  updatedAt: string;
}

interface IBlog {
  _id: string;
  title: string;
  content: string;
  author: string;
  comments: IComment[];
  commentCount: number;
}

const fetchBlogWithComments = async (
  id: string
): Promise<IBlog | undefined> => {
  const res = await api.get('/comment/blogs-with-comments');
  return res.data.data.find((b: IBlog) => b._id === id);
};

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['postWithComments', id],
    queryFn: () => fetchBlogWithComments(id || ''),
    enabled: !!id,
  });

  if (isLoading) return <p>Loading post...</p>;
  if (isError || !post) return <p>Post not found</p>;

  return (
    <div className='p-6'>
      <Link
        to='/dashboard'
        className='text-blue-500 underline mb-4 inline-block'
      >
        ← Back to Dashboard
      </Link>

      <h1 className='text-2xl font-bold mb-2'>{post.title}</h1>
      <p className='text-gray-700 mb-4'>{post.content}</p>
      <p className='text-sm text-gray-500'>Author ID: {post.author}</p>

      <h2 className='text-xl font-semibold mt-6 mb-2'>
        Comments ({post.commentCount})
      </h2>

      {post.comments.length > 0 ? (
        post.comments.map((c) => (
          <div key={c._id} className='border p-2 rounded mb-2'>
            <p>{c.comment}</p>
            <p className='text-sm text-gray-500'>By {c.commentor.name}</p>
          </div>
        ))
      ) : (
        <p>No comments yet</p>
      )}

      <AddComment postId={post._id} />
    </div>
  );
}
