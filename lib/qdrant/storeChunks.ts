import { qdrant }
  from "./client";

export async function
storeChunks(
  points: any[]
) {
  await qdrant.upsert(
    "medical_documents",
    {
      wait: true,
      points,
    }
  );
}