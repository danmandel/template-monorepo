'use client';

import { FC } from 'react';
import { FcGoogle } from 'react-icons/fc';

interface GoogleButtonProps {
  onClick: () => Promise<void>;
  action: 'signin' | 'register';
}

export const GoogleButton: FC<GoogleButtonProps> = ({ onClick, action }) => {
  const btnText = action === 'signin' ? 'Sign in with Google' : 'Create account with Google';
  return (
    <button
      className='flex w-full items-center justify-center rounded-md bg-white px-4 py-2 text-black shadow-md'
      onClick={onClick}
      aria-label={btnText}
    >
      <FcGoogle className='mr-2' aria-hidden='true' />
      {btnText}
    </button>
  );
};
