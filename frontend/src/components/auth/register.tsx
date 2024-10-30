import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRegisterMutation } from '@/generated/graphql';
import { auth } from '@/lib/firebase';
import { GoogleButton } from './google-button';

const provider = new GoogleAuthProvider();

export const Register = () => {
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

  const handleGoogleRegister = async (): Promise<void> => {
    try {
      const { user } = await signInWithPopup(auth, provider);
      await register({ variables: { idToken: await user.getIdToken() } });
    } catch (error) {
      setError((error as Error).message);
    }
  };
  return (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <Label htmlFor='register-email' className='text-black dark:text-gray-300'>
          Email
        </Label>
        <Input
          id='register-email'
          type='email'
          placeholder='Enter your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='register-password' className='text-black dark:text-gray-300'>
          Password
        </Label>
        <Input
          id='register-password'
          type='password'
          placeholder='Enter your password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p className='text-sm text-red-500'>{error}</p>}
      <Button className='w-full' onClick={handleRegister}>
        Create Account
      </Button>
      {/* TODO: "Browsewrap Agreement" By clicking 'Create Account' you confirm that you agree to our Terms of Service and Privacy Policy. */}
      {/* TODO: "Clickwrap agreement: checkbox - I agree to the [Terms & Conditions](link)" */}
      <div className='my-4 flex items-center text-center text-gray-500 dark:text-gray-400'>
        <hr className='my-2 grow' />
        <span className='mx-2'>Or</span>
        <hr className='my-2 grow' />
      </div>

      <GoogleButton onClick={handleGoogleRegister} action='register' />
    </div>
  );
};
