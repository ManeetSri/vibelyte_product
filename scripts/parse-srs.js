import fs from "fs";

export function parseSRS() {
  const raw = fs.readFileSync("docs/srs.md", "utf8");
  const modules = raw.match(/##\s(.+)/g)?.map(m => m.replace("## ", "")) || [];

  return modules.map(name => ({
    name,
    features: []
  }));
}
