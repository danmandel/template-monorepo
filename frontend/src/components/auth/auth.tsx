'use client';

import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import { GoogleButton } from '@/components/auth/google-button';
import 'tailwindcss/tailwind.css';
import { useRegisterMutation } from '@/generated/graphql';
import { auth } from '@/lib/firebase';
import { Dialog, DialogContent } from '@radix-ui/react-dialog';

const provider = new GoogleAuthProvider();

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthDialog = ({ isOpen, onClose }: AuthDialogProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [register] = useRegisterMutation();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      console.log('user', user);
      await register({ variables: { idToken: await user.getIdToken() } });
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleGoogleSignIn = async (): Promise<void> => {
    try {
      const { user } = await signInWithPopup(auth, provider);
      await register({ variables: { idToken: await user.getIdToken() } });
      console.log('user', user);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px]'>
        <div className='flex min-h-screen flex-col items-center justify-center bg-gray-100'>
          <div className='w-96 rounded bg-white p-8 shadow-md'>
            <h1 className='mb-8 text-4xl font-bold text-black'>Create an account</h1>
            <form onSubmit={handleRegister}>
              <div className='mb-4'>
                <label htmlFor='email' className='block text-gray-700'>
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='w-full rounded border px-3 py-2 text-black'
                  required
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='password' className='block text-gray-700'>
                  Password
                </label>
                <input
                  type='password'
                  id='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='w-full rounded border px-3 py-2 text-black'
                  required
                />
              </div>
              {error && <p className='mb-4 text-red-500'>{error}</p>}
              <button type='submit' className='w-full rounded bg-blue-500 py-2 text-white'>
                Register
              </button>
            </form>
            <div className='my-4 flex items-center text-center text-gray-500'>
              <hr className='my-2 grow' />
              <span className='mx-2'>Or register with</span>
              <hr className='my-2 grow' />
            </div>

            <GoogleButton onClick={handleGoogleSignIn} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
