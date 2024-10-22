'use client';

import { ApolloProvider as Provider } from '@apollo/client';
import { ReactNode } from 'react';
import { client } from '../lib/apollo';

export const ApolloProvider = ({ children }: { children: ReactNode }) => (
  <Provider client={client}>{children}</Provider>
);
