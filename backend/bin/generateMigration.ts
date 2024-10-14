import { exec } from 'child_process';

const migrationName = process.argv[2];

if (!migrationName) {
  console.error('Please provide a migration name.');
  process.exit(1);
}

exec(
  `bun node_modules/typeorm/cli.js migration:generate src/algorithms/migrations/${migrationName} -d src/algorithms/initializeDb.ts`,
  (error: Error | null, stdout: string, stderr: string) => {
    if (error) {
      console.error(`Error generating migration: ${error.message}`);
      return;
    }

    if (stderr) {
      console.error(`Error: ${stderr}`);
      return;
    }

    console.log(stdout);
  },
);
