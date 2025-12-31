import fs from "fs";

export function parseSRS() {
  const content = fs.readFileSync("docs/srs.md", "utf8");
  return content

    .split(/\n##\s+/) // Allow multiple spaces
    .slice(1)
    .map(section => {
      const lines = section.split("\n").map(l => l.trim()).filter(l => l); // Trim and remove empty lines
      const title = lines[0];

      const ownerLine = lines.find(l => l.toLowerCase().startsWith("owner:"));
      const owner = ownerLine ? ownerLine.split(":")[1].trim() : "product";

      const descLineIndex = lines.findIndex(l => l.toLowerCase().startsWith("description:"));
      const description = descLineIndex !== -1
        ? lines.slice(descLineIndex).join("\n").replace(/^description:\s*/i, "")
        : "";

      return { title, owner, description };
    });
}
