import { startServer } from './startServer';

export const start = async () => {
  console.log('🚀 Starting..');

  const startTime = Date.now();

  await startServer();

  const endTime = Date.now();

  const elapsedTime = endTime - startTime;

  console.log(`✅ System is online. (Elapsed time: ${elapsedTime} ms)`);
  console.log(`🔍 Explore the API at http://localhost:${4000}/graphql`);
};
