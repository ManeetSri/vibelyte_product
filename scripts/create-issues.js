import { Octokit } from "@octokit/rest";
import { parseSRS } from "./parse-srs.js";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export async function createIssues() {
  const modules = parseSRS();

  for (const mod of modules) {
    await octokit.issues.create({
      owner: "YOUR_ORG",
      repo: "vibelyt-product",
      title: `[${mod.name}] Core Implementation`,
      body: `Auto-generated from SRS\n\nModule: ${mod.name}`,
      labels: ["feature"]
    });
  }
}

createIssues();
