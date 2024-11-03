import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLoginMutation } from '@/generated/graphql';
import { auth } from '@/lib/firebase';
import { GoogleButton } from './google-button';
const provider = new GoogleAuthProvider();

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberUser, setRememberUser] = useState(false);
  const [error, setError] = useState('');
  const [login] = useLoginMutation();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      await login({ variables: { input: { idToken: await user.getIdToken(), rememberUser } } });
      // TODO: createAuthEventMutation()
      // onClose();
    } catch (err) {
      if (err instanceof Error) {
        console.log({ err });
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  const handleGoogleSignIn = async (): Promise<void> => {
    try {
      const { user } = await signInWithPopup(auth, provider);
      await login({ variables: { input: { idToken: await user.getIdToken() } } });
      // TODO: createAuthEventMutation()
    } catch (error) {
      signOut(auth);
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
      {/* <div className='mb-2'> */}
      <div className='space-y-2'>
        <Label htmlFor='email' className='text-black dark:text-gray-300'>
          <strong>Email</strong>
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
          <strong>Password</strong>
        </Label>
        <Input
          id='password'
          type='password'
          placeholder='Enter your password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className='flex items-center justify-between'>
          <label className='flex items-center'>
            <Checkbox
              checked={rememberUser}
              onCheckedChange={(checked) =>
                setRememberUser(checked === 'indeterminate' ? false : !!checked)
              }
            />
            <span className='ml-2 text-sm text-black dark:text-gray-300'>Remember me</span>
          </label>
          <a href='#' className='text-sm text-blue-500 hover:underline'>
            Forgot password?
          </a>
        </div>
      </div>
      {error && (
        <div className='text-sm text-red-500'>
          {error.includes('Please register') ? (
            // <TabsTrigger value='register'>Register here!</TabsTrigger>
            <span className='flex items-center'>
              User not found. Please register or sign in with a different account.
              {/* <a href='#' className='text-blue-500 hover:underline' onClick={console.log}>
                register here
              </a> */}
            </span>
          ) : (
            <p>{error}</p>
          )}
        </div>
      )}
      <Button className='w-full' onClick={handleLogin}>
        Sign In
      </Button>
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
