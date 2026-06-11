import { randomUUID }
  from "crypto";

import {
  splitIntoChunks,
} from "@/lib/chunking/splitIntoChunks";

import {
  generateEmbedding,
} from "@/lib/embeddings/generateEmbedding";

import {
  storeChunks,
} from "@/lib/qdrant/storeChunks";

export async function
indexText(
  userId: string,
  documentId: string,
  text: string
) {
  const chunks =
    splitIntoChunks(text);

  const points = [];

  for (
    const chunk of chunks
  ) {

    const embedding =
      await generateEmbedding(
        chunk
      );

    points.push({
      id: randomUUID(),

      vector:
        embedding,

      payload: {
        userId,
        documentId,
        text: chunk,
      },
    });
  }

  await storeChunks(
    points
  );

  return {
    chunks:
      chunks.length,
  };
}