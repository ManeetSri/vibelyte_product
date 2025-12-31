import fs from "fs";

export function mapTestsToFeatures() {
  const tests = fs.readdirSync("tests");
  const missing = [];

  if (!tests.includes("auth.test.ts")) {
    missing.push("Auth tests missing");
  }

  if (missing.length) {
    console.error("Missing tests:", missing);
    process.exit(1);
  }
}
