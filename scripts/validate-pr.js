import process from "process";

const prBody = process.env.GITHUB_PR_BODY || "";

if (!prBody.includes("Closes #")) {
  console.error("PR must reference an issue (Closes #ID)");
  process.exit(1);
}

console.log("PR validation passed");
