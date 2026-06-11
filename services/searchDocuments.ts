import {
  generateEmbedding,
} from "@/lib/embeddings/generateEmbedding";

import { qdrant }
  from "@/lib/qdrant/client";

export async function
searchDocuments(
  userId: string,
  query: string
) {
  const embedding =
    await generateEmbedding(
      query
    );

  console.log(
    "Embedding dimensions:",
    embedding?.length
  );

  console.log(
    "User ID:",
    userId
  );

  const results =
    await qdrant.search(
      "medical_documents",
      {
        vector: embedding!,
        limit: 5,
      }
    );

  return results;
}