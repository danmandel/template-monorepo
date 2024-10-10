import { execSync } from "child_process";

const TEMPLATE_REPO_URL = "https://github.com/danmandel/template-next.git";
const TEMPLATE_REMOTE_NAME = "template-next";

try {
  // Check if the remote 'template' already exists.
  execSync(`git remote get-url ${TEMPLATE_REMOTE_NAME}`, { stdio: "ignore" });
  console.log(`Remote '${TEMPLATE_REMOTE_NAME}' already exists.`);
} catch {
  // Add the remote if it doesn't exist.
  console.log(`Adding remote '${TEMPLATE_REMOTE_NAME}'.`);
  execSync(`git remote add ${TEMPLATE_REMOTE_NAME} ${TEMPLATE_REPO_URL}`);
}

// Fetch the latest changes from the template repository.
console.log(`Fetching updates from '${TEMPLATE_REMOTE_NAME}'...`);
execSync(`git fetch ${TEMPLATE_REMOTE_NAME}`);

// Merge the changes into the current branch.
console.log(`Merging changes from '${TEMPLATE_REMOTE_NAME}/main'...`);
execSync(`git merge ${TEMPLATE_REMOTE_NAME}/main`);
