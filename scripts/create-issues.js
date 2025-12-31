import { Octokit } from "@octokit/rest";
import { parseSRS } from "./parse-srs.js";
import { REPOS } from "./repo-map.js";
import { generateSubtasks } from "./generate-subtasks.js";

const defaultOctokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

async function issueExists(client, owner, repo, title) {
  try {
    const issues = await client.issues.listForRepo({ owner, repo, state: "all", per_page: 100 });
    return issues.data.some(i => i.title === title);
  } catch (error) {
    console.error(`Failed to list issues for ${owner}/${repo}:`, error.message);
    return false;
  }
}

export async function createIssues(client = defaultOctokit) {
  console.log("Starting issue creation process...");
  const modules = parseSRS();

  for (const mod of modules) {
    const repo = REPOS[mod.owner];
    if (!repo) {
      console.warn(`Unknown owner: ${mod.owner} for module: ${mod.title}`);
      continue;
    }
    const title = `[${mod.title}] Core Implementation`;

    if (await issueExists(client, repo.owner, repo.repo, title)) {
      console.log(`Skipping existing issue: ${title}`);
    } else {
      try {
        await client.issues.create({
          owner: repo.owner,
          repo: repo.repo,
          title,
          body: `
### Module
${mod.title}

### Description
${mod.description}

### Acceptance Criteria
- API implemented
- Tests written
- Security enforced
              `,
          labels: ["feature", mod.owner]
        });
        console.log(`Created issue: ${title}`);
      } catch (error) {
        console.error(`Failed to create issue ${title}:`, error.message);
      }
    }

    // Subtasks
    for (const sub of generateSubtasks(mod.title)) {
      const subTitle = `${mod.title}: ${sub}`;
      if (await issueExists(client, repo.owner, repo.repo, subTitle)) {
        console.log(`Skipping existing subtask: ${subTitle}`);
        continue;
      }

      try {
        await client.issues.create({
          owner: repo.owner,
          repo: repo.repo,
          title: subTitle,
          body: `Subtask for ${mod.title}`,
          labels: ["subtask"]
        });
        console.log(`Created subtask: ${subTitle}`);
      } catch (error) {
        console.error(`Failed to create subtask ${subTitle}:`, error.message);
      }
    }
  }
}
