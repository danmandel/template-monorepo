'use client';

import { Atom } from 'lucide-react';
import { useState } from 'react';
import { PiGearSixDuotone } from 'react-icons/pi';
import { project } from '@/project';
import { ThemeToggle } from '../ThemeToggle';
import { SidebarTrigger } from '../ui/sidebar';

export const Header = () => {
  return (
    <header className='flex bg-gray-800 p-4 pl-6 text-white'>
      <SidebarTrigger />
      <div
        className='flex cursor-pointer items-center text-lg font-bold'
        onClick={() => (window.location.href = '/')}
      >
        <span className='ml-4 text-xl'>{project.title}</span>
      </div>
    </header>
  );
};
