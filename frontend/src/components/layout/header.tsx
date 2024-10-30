'use client';

import { project } from '@/project';
import { SidebarTrigger } from '../ui/sidebar';

export const Header = () => (
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
