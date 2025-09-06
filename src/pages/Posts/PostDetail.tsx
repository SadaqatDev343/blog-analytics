import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../../lib/axios';
import AddComment from './AddComment';
import { useAuth } from '../../hooks/useAuth';
import { useDeleteComment, useUpdateComment } from '../../api/commentApi';

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
  const { user } = useAuth(); // logged-in user

  const {
    data: post,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['postWithComments', id],
    queryFn: () => fetchBlogWithComments(id || ''),
    enabled: !!id,
  });

  const updateComment = useUpdateComment(post?._id || '');
  const deleteComment = useDeleteComment(post?._id || '');

  // state to track editing for each comment
  const [commentStates, setCommentStates] = useState<{
    [key: string]: { isEditing: boolean; editText: string };
  }>({});

  if (isLoading) return <p>Loading post...</p>;
  if (isError || !post) return <p>Post not found</p>;

  const handleEditClick = (c: IComment) => {
    setCommentStates({
      ...commentStates,
      [c._id]: { isEditing: true, editText: c.comment },
    });
  };

  const handleSaveClick = (c: IComment) => {
    updateComment.mutate(
      { id: c._id, comment: commentStates[c._id].editText },
      {
        onSuccess: () => {
          setCommentStates({
            ...commentStates,
            [c._id]: {
              isEditing: false,
              editText: commentStates[c._id].editText,
            },
          });
          refetch();
        },
      }
    );
  };

  const handleCancelClick = (c: IComment) => {
    setCommentStates({
      ...commentStates,
      [c._id]: { isEditing: false, editText: c.comment },
    });
  };

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
        post.comments.map((c) => {
          const state = commentStates[c._id] || {
            isEditing: false,
            editText: c.comment,
          };
          return (
            <div
              key={c._id}
              className='border p-2 rounded mb-2 flex justify-between items-start'
            >
              <div className='flex-1'>
                {state.isEditing ? (
                  <input
                    value={state.editText}
                    onChange={(e) =>
                      setCommentStates({
                        ...commentStates,
                        [c._id]: { ...state, editText: e.target.value },
                      })
                    }
                    className='border px-2 py-1 w-full'
                  />
                ) : (
                  <p>{c.comment}</p>
                )}
                <p className='text-sm text-gray-500'>By {c.commentor.name}</p>
              </div>

              {c.commentor._id && (
                <div className='flex gap-2'>
                  {state.isEditing ? (
                    <>
                      <button
                        onClick={() => handleSaveClick(c)}
                        className='text-blue-500 hover:underline'
                      >
                        Save
                      </button>
                      <button
                        onClick={() => handleCancelClick(c)}
                        className='text-gray-500 hover:underline'
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditClick(c)}
                        className='text-blue-500 hover:underline'
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          if (
                            confirm(
                              'Are you sure you want to delete this comment?'
                            )
                          ) {
                            deleteComment.mutate(c._id, {
                              onSuccess: () => refetch(),
                            });
                          }
                        }}
                        className='text-red-500 hover:underline'
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })
      ) : (
        <p>No comments yet</p>
      )}

      <AddComment postId={post._id} />
    </div>
  );
}
