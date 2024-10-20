import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
// import { initializeApp } from 'firebase-admin';
import { initializeDb } from './db';
import { schema } from './api';

export const startServer = async () => {
  await initializeDb();
  // const serviceAccount = await import('../../serviceAccountKey.dev.json');
  // initializeApp({ credential: serviceAccount } as any);

  const server = new ApolloServer({ schema });

  const port = Number(process.env.PORT) || 4000;

  await startStandaloneServer(server, {
    listen: { port },
  });

  return server;
};
