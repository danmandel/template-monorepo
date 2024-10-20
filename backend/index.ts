import { start } from './src/algorithms/start';

try {
  await start();
} catch (e) {
  console.error('Server error:', e);
  process.exit(1);
}
