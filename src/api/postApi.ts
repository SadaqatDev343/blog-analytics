import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/axios';

export const usePosts = (page: number, search: string) => {
  return useQuery({
    queryKey: ['posts', page, search],
    queryFn: async () => {
      const res = await api.get(
        `/blog/get-all-blogs?page=${page}&limit=5&search=${search}`
      );
      return res.data;
    },
  });
};

export const useAddPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newPost: { title: string; content: string; author: string }) =>
      api.post('/blog/create-blog', newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/blog/delete-blog/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: { title: string; content: string };
    }) => {
      await api.put(`/blog/update-blog/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export const usePostById = (id: string) => {
  return useQuery({
    queryKey: ['post', id],
    queryFn: async () => {
      const res = await api.get(`/blog/get-specific-blog/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};
