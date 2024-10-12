'use client';

import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { useState } from 'react';
import { GoogleButton } from '@/components/GoogleButton';
import 'tailwindcss/tailwind.css';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Account created successfully!');
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleGoogleSignIn = async (): Promise<void> => {
    try {
      await signInWithPopup(auth, provider);
      alert('Signed in with Google successfully!');
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
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
  );
};

export default RegisterPage;
