'use client';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { auth } from '@/lib/firebase';

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthDialog = ({ isOpen, onClose }: AuthDialogProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleAuth = async (action: 'signin' | 'register') => {
    try {
      setError('');
      if (action === 'signin') {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      onClose();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='text-black dark:text-gray-300'>Authentication</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue='signin' className='w-full'>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='signin'>Sign In</TabsTrigger>
            <TabsTrigger value='register'>Register</TabsTrigger>
          </TabsList>
          <TabsContent value='signin' className='space-y-4'>
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
              <Button className='w-full' onClick={() => handleAuth('signin')}>
                Sign In
              </Button>
            </div>
          </TabsContent>
          <TabsContent value='register' className='space-y-4'>
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
              <Button className='w-full' onClick={() => handleAuth('register')}>
                Register
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
