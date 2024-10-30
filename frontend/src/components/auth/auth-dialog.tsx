'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Login } from './login';
import { Register } from './register';

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthDialog = ({ isOpen, onClose }: AuthDialogProps) => (
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
          <Login />
        </TabsContent>
        <TabsContent value='register' className='space-y-4'>
          <Register />
        </TabsContent>
      </Tabs>
    </DialogContent>
  </Dialog>
);
