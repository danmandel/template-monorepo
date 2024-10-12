'use client';

import React from 'react';
import { IconType } from 'react-icons';

type CardProps = {
  icon: IconType;
  title: string;
  description: string;
  route: string;
};

export const Card: React.FC<CardProps> = ({ icon: Icon, title, description, route }) => {
  return (
    <div
      className='flex size-64 cursor-pointer flex-col items-center justify-center space-y-4 rounded-lg bg-yellow-500 p-6 shadow-md'
      onClick={() => (window.location.href = route)}
    >
      <Icon className='text-4xl text-gray-800' />
      <h2 className='text-xl font-bold text-gray-800'>{title}</h2>
      <p className='text-gray-600'>{description}</p>
    </div>
  );
};
