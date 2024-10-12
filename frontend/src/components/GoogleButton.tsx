'use client';

import { FC } from 'react';
import { FcGoogle } from 'react-icons/fc';

interface GoogleButtonProps {
  onClick: () => Promise<void>;
}

export const GoogleButton: FC<GoogleButtonProps> = ({ onClick }) => {
  return (
    <button
      className="flex w-full items-center justify-center rounded-md bg-white px-4 py-2 text-black shadow-md"
      onClick={onClick}
    >
      <FcGoogle className="mr-2" />
      Google
    </button>
  );
};
