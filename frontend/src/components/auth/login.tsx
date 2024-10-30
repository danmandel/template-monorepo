import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { auth } from '@/lib/firebase';
import { GoogleButton } from './google-button';

const provider = new GoogleAuthProvider();

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');
      await signInWithEmailAndPassword(auth, email, password);
      // TODO: createAuthEventMutation()
      // onClose();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  const handleGoogleSignIn = async (): Promise<void> => {
    try {
      const { user } = await signInWithPopup(auth, provider);
      // TODO: createAuthEventMutation()
      //   await register({ variables: { idToken: await user.getIdToken() } });
      console.log('user', user);
    } catch (error) {
      setError((error as Error).message);
    }
  };
  return (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <Label htmlFor='email' className='text-black dark:text-gray-300'>
          Email
        </Label>
        <Input
          id='email'
          type='email'
          placeholder='Enter your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='password' className='text-black dark:text-gray-300'>
          Password
        </Label>
        <Input
          id='password'
          type='password'
          placeholder='Enter your password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p className='text-sm text-red-500'>{error}</p>}
      <Button className='w-full' onClick={handleLogin}>
        Sign In
      </Button>
      <div className='my-4 flex items-center text-center text-gray-500 dark:text-gray-400'>
        <hr className='my-2 grow' />
        <span className='mx-2'>Or sign in with</span>
        <hr className='my-2 grow' />
      </div>

      <GoogleButton onClick={handleGoogleSignIn} />
    </div>
  );
};
