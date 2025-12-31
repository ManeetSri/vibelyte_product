import "dotenv/config";
import { createIssues } from "./create-issues.js";
import { generateAcceptanceCriteria } from "./ai-acceptance.js";

async function run() {
  console.log("🚀 PM Agent Started");

  const issues = await createIssues();

  for (const issue of issues) {
    const acceptance = await generateAcceptanceCriteria(issue);
    console.log(`Acceptance for ${issue.title}:\n${acceptance}`);
  }

  console.log("✅ PM Agent Completed");
}

run();
