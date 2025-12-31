import { openai } from "./openai-client.js";

export async function generateAcceptanceCriteria(module) {
  const prompt = `
You are a senior software architect.

Generate detailed acceptance criteria for the following module:

Module: ${module.title}
Description: ${module.description}

Return bullet points.
`;

  const res = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3
  });

  return res.choices[0].message.content;
}
