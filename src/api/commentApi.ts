import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../lib/axios';

export interface ICreateComment {
  blog: string;
  comment: string;
  commentor: string;
}
export interface IUpdateComment {
  comment: string;
}

export const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newComment: ICreateComment) =>
      api.post(`/comment/add-comment`, newComment),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['postWithComments', variables.blog],
      });
    },
  });
};

export const usePostWithComments = (id: string) => {
  return useQuery({
    queryKey: ['postWithComments', id],
    queryFn: async () => {
      const res = await api.get(`/comment/blogs-with-comments`);
      const blog = res.data.data.find((b: any) => b._id === id);
      return blog;
    },
    enabled: !!id,
  });
};

export const useUpdateComment = (postId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, comment }: { id: string; comment: string }) =>
      api.put(`/comment/update-comment/${id}`, { comment }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['postWithComments', postId] });
    },
  });
};

export const useDeleteComment = (postId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) =>
      api.delete(`/comment/delete-comment/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['postWithComments', postId] });
    },
  });
};
