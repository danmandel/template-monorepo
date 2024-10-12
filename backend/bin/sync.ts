import { execSync } from "child_process";

const TEMPLATE_REPO_URL = "https://github.com/danmandel/template-monorepo.git";
const TEMPLATE_REMOTE_NAME = "template-monorepo";

try {
  // Get the URL of the 'origin' remote (or another main remote of the repo)
  const originUrl = execSync("git remote get-url origin").toString().trim();

  if (originUrl === TEMPLATE_REPO_URL) {
    console.log("You are in the template repository. Syncing is unnecessary.");
    process.exit(0);
  }
} catch (error) {
  console.error(`Failed to retrieve remote URL: ${error}`);
  process.exit(1); // Exit with error
}

try {
  // Check if the remote 'template' already exists
  execSync(`git remote get-url ${TEMPLATE_REMOTE_NAME}`, { stdio: "ignore" });
  console.log(`Remote '${TEMPLATE_REMOTE_NAME}' already exists.`);
} catch {
  // Add the remote if it doesn't exist
  console.log(`Adding remote '${TEMPLATE_REMOTE_NAME}'.`);
  execSync(`git remote add ${TEMPLATE_REMOTE_NAME} ${TEMPLATE_REPO_URL}`);
}

// Fetch the latest changes from the template repository
console.log(`Fetching updates from '${TEMPLATE_REMOTE_NAME}'...`);
execSync(`git fetch ${TEMPLATE_REMOTE_NAME}`);

// Merge the changes into the current branch, allowing unrelated histories
console.log(
  `Merging changes from '${TEMPLATE_REMOTE_NAME}/main' with --allow-unrelated-histories...`
);
execSync(`git merge ${TEMPLATE_REMOTE_NAME}/main --allow-unrelated-histories`);
