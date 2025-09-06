'use client';

import type React from 'react';

import { useState } from 'react';
import { useLogin } from '../../api/authApi';
import { useAuth } from '../../hooks/useAuth';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginMutation = useLogin();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginMutation.mutateAsync({ email, password });

      login(res.data.token, res.data.user);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='max-w-sm mx-auto mt-10 space-y-4'>
      <h1 className='text-xl font-bold'>Sign In</h1>
      <input
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='w-full p-2 border rounded'
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='w-full p-2 border rounded'
      />
      <button
        type='submit'
        disabled={loginMutation.isPending}
        className='w-full p-2 bg-blue-600 text-white rounded'
      >
        {loginMutation.isPending ? 'Loading...' : 'Sign In'}
      </button>
    </form>
  );
}
