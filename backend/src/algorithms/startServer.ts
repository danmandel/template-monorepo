import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { schema } from '../api';

export const startServer = async () => {
  const server = new ApolloServer({ schema });

  const port = Number(process.env.PORT) || 4000;

  await startStandaloneServer(server, {
    listen: { port },
  });

  return server;
};
