import { useMutation } from '@tanstack/react-query';
import api from '../lib/axios';

type LoginData = { email: string; password: string };
type SignupData = { name: string; email: string; password: string };

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginData) => api.post('/user/sign-in', data),
  });
};

export const useSignup = () => {
  return useMutation({
    mutationFn: (data: SignupData) => api.post('/user/sign-up', data),
  });
};
