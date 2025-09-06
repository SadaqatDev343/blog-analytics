import { useState } from 'react';
import { useSignup } from '../../api/authApi';
import { useAuth } from '../../hooks/useAuth';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const signupMutation = useSignup();
  const { login } = useAuth();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await signupMutation.mutateAsync({ name, email, password });

      login(res.data.token, res.data.user);
    } catch (error) {
      console.error('Signup failed', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='max-w-sm mx-auto mt-10 space-y-4'>
      <h1 className='text-xl font-bold'>Sign Up</h1>

      <input
        type='text'
        placeholder='Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        className='w-full p-2 border rounded'
      />

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
        disabled={signupMutation.isPending}
        className='w-full p-2 bg-green-600 text-white rounded'
      >
        {signupMutation.isPending ? 'Creating Account...' : 'Sign Up'}
      </button>
    </form>
  );
}
