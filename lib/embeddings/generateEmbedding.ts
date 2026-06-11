import { gemini }
  from "@/lib/gemini/client";

export async function
generateEmbedding(
  text: string
) {
  const result =
    await gemini.models.embedContent({
      model:
        "gemini-embedding-001",

      contents: text,
    });

  return result.embeddings?.[0]
    ?.values;
}