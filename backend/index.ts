import { start } from './src/start';

try {
  await start();
} catch (e) {
  console.error('Server error:', e);
  process.exit(1);
}
