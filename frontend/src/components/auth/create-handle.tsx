// Allow the user to choose their handle after signup. Each additional step reduces
// the likelihood of them completing onboarding, so this is one way to minimize that.
// Actually, this can be done later in user settings page. At first just default to something random?

import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLoginMutation } from '@/generated/graphql';
import { auth } from '@/lib/firebase';
import { GoogleButton } from './google-button';
const provider = new GoogleAuthProvider();

export const CreateHandle = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [login] = useLoginMutation();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      await login({ variables: { idToken: await user.getIdToken() } });
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
      await login({ variables: { idToken: await user.getIdToken() } });
      // TODO: createAuthEventMutation()
      //   await register({ variables: { idToken: await user.getIdToken() } });
      console.log('user', user);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        // if (error.message.includes('User not found. Please register.')) {
        //   await register({ variables: { idToken: await user.getIdToken() } });
        // }
      }
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
      {/* TODO: Forgot password? */}
      {/* TODO: Remember me btn? */}
      {/* TODO: Not a member? Create an account here */}

      <div className='my-4 flex items-center text-center text-gray-500 dark:text-gray-400'>
        <hr className='my-2 grow' />
        <span className='mx-2'>Or</span>
        <hr className='my-2 grow' />
      </div>
      {/* TODO: What if the user signs in before registering? */}
      <GoogleButton onClick={handleGoogleSignIn} action='signin' />
    </div>
  );
};
