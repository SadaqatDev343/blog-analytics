import { useQuery } from '@tanstack/react-query';
import api from '../lib/axios';

export const useTopAuthors = () =>
  useQuery({
    queryKey: ['topAuthors'],
    queryFn: async () => {
      const res = await api.get('/analytics/top-authors');
      return res.data.data;
    },
  });

export const useTopCommentedPosts = () =>
  useQuery({
    queryKey: ['topCommentedPosts'],
    queryFn: async () => {
      const res = await api.get('/analytics/top-commented-posts');
      return res.data.data;
    },
  });

export const usePostsPerDay = () =>
  useQuery({
    queryKey: ['postsPerDay'],
    queryFn: async () => {
      const res = await api.get('/analytics/posts-per-day');
      return res.data.data;
    },
  });
