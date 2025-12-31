import fs from "fs";
import { openai } from "./openai-client.js";
import { Octokit } from "@octokit/rest";

const diff = fs.readFileSync("diff.txt", "utf-8");
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export async function runAIReview() {
  const prompt = `
You are a senior backend engineer.
Review the following git diff and provide:
- Bugs
- Security issues
- Performance improvements
- Missing tests

Diff:
${diff}
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2
  });

  const review = response.choices[0].message.content;

  const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");
  const pr = process.env.GITHUB_REF.split("/").pop();

  await octokit.issues.createComment({
    owner,
    repo,
    issue_number: pr,
    body: `🤖 **AI Review**\n\n${review}`
  });
}
