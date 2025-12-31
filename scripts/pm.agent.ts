import { createIssues } from "./create-issues";
import { parseSRS } from "./parse-srs";

(async () => {
  console.log("Running PM Agent...");
  const modules = parseSRS();

  if (!modules.length) {
    console.log("No modules found.");
    return;
  }

  await createIssues();
  console.log("PM Agent complete.");
})();
