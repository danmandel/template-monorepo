import { exec } from 'child_process';

exec(
  `bun node_modules/typeorm/cli.js migration:run -d src/algorithms/initializeDb.ts`,
  (error: Error | null, stdout: string, stderr: string) => {
    if (stderr) {
      console.error(`Error: ${stderr}`);
      return;
    }

    console.log(stdout);
  },
);
