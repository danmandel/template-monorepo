'use client';

import { useState } from 'react';
import { PiGearSixDuotone } from 'react-icons/pi';
import { project } from '@/app/project';
import { ThemeToggle } from '../ThemeToggle';

export const Header = () => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <header className='flex items-center justify-between bg-gray-800 p-4 text-white'>
      <div
        className='ml-10 flex cursor-pointer items-center text-lg font-bold'
        onClick={() => (window.location.href = '/')}
      >
        {/* TODO: add logo */}
        <span className='text-xl'>{project.title}</span>
      </div>

      <div className='relative'>
        <button className='mr-8' onClick={() => setShowSettings(!showSettings)}>
          <PiGearSixDuotone size={24} />
        </button>
        {showSettings && (
          <div className='dark absolute right-0 mt-2 w-48 rounded-md bg-white text-black shadow-lg'>
            <ul>
              <li className='cursor-pointer px-4 py-2 hover:bg-gray-200'>Language</li>
              <li className='cursor-pointer px-4 py-2 hover:bg-gray-200'>
                <ThemeToggle />
              </li>
              <li
                className='cursor-pointer px-4 py-2 hover:bg-gray-200'
                onClick={() => (window.location.href = '/login')}
              >
                Login
              </li>
              <li
                className='cursor-pointer px-4 py-2 hover:bg-gray-200'
                onClick={() => (window.location.href = '/register')}
              >
                Register
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};
